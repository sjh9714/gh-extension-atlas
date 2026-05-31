import fs from "node:fs";
import path from "node:path";

const markdownFiles = listFiles(".", (file) => file.endsWith(".md"));
const data = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const links = new Map();
const errors = [];

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const link of extractMarkdownLinks(content)) {
    addLink(link, file);
  }
}

for (const entry of data) {
  addLink(`https://github.com/${entry.repo}`, "data/extensions.json");
}

for (const [link, sources] of links) {
  if (isIgnored(link)) {
    continue;
  }

  if (isRelative(link)) {
    const source = sources[0];
    const base = path.dirname(source);
    const withoutHash = link.split("#")[0];
    const target = path.normalize(path.join(base, withoutHash));
    if (withoutHash && !fs.existsSync(target)) {
      errors.push(`${link} referenced from ${source} does not exist.`);
    }
  }
}

const remoteLinks = Array.from(links.keys()).filter((link) => !isIgnored(link) && !isRelative(link));
const failures = await checkRemoteLinks(remoteLinks);
errors.push(...failures);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Checked ${links.size} unique links.`);

function listFiles(dir, predicate, output = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(item.name)) {
      continue;
    }

    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      listFiles(fullPath, predicate, output);
    } else if (predicate(fullPath)) {
      output.push(fullPath);
    }
  }

  return output;
}

function extractMarkdownLinks(content) {
  const links = [];
  const inlineLinkPattern = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const referenceLinkPattern = /^\[[^\]]+]:\s*(\S+)/gm;
  let match;

  while ((match = inlineLinkPattern.exec(content)) !== null) {
    links.push(stripAngleBrackets(match[1]));
  }

  while ((match = referenceLinkPattern.exec(content)) !== null) {
    links.push(stripAngleBrackets(match[1]));
  }

  return links;
}

function stripAngleBrackets(value) {
  return value.replace(/^</, "").replace(/>$/, "");
}

function addLink(link, source) {
  const normalized = link.trim();
  if (!normalized) {
    return;
  }

  const sources = links.get(normalized) ?? [];
  sources.push(source);
  links.set(normalized, sources);
}

function isIgnored(link) {
  return link.startsWith("#") || link.startsWith("mailto:");
}

function isRelative(link) {
  return !/^https?:\/\//.test(link);
}

async function checkRemoteLinks(remoteLinks) {
  const failures = [];
  const concurrency = 6;
  let index = 0;

  async function worker() {
    while (index < remoteLinks.length) {
      const link = remoteLinks[index++];
      const url = link.split("#")[0];
      try {
        const response = await fetchWithTimeout(url);
        if (response.status >= 400) {
          failures.push(`${link} returned HTTP ${response.status}.`);
        }
      } catch (error) {
        failures.push(`${link} failed: ${error.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return failures;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "gh-extension-atlas-link-checker",
      },
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}
