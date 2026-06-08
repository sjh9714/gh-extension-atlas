import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const markdownFiles = listFiles(".", (file) => file.endsWith(".md"));
const htmlFiles = listFiles("docs", (file) => file.endsWith(".html"));
const data = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const links = new Map();
const errors = [];
const retryableStatusCodes = new Set([408, 425, 429, 500, 502, 503, 504]);
const maxAttempts = 3;
const retryBackoffMs = [500, 1000, 2000];
const githubToken = getGitHubToken();

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const link of extractMarkdownLinks(content)) {
    addLink(link, file);
  }
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const link of extractHtmlLinks(content)) {
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
  } else if (isOwnSiteLink(link)) {
    const target = getOwnSiteTarget(link);
    if (!fs.existsSync(target)) {
      errors.push(`${link} referenced from ${sources[0]} maps to missing ${target}.`);
    }
  }
}

const remoteLinks = Array.from(links.keys()).filter((link) => !isIgnored(link) && !isRelative(link) && !isOwnSiteLink(link));
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

function extractHtmlLinks(content) {
  const links = [];
  const staticHtml = content.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  const htmlLinkPattern = /\b(?:href|src)="([^"]+)"/g;
  let match;

  while ((match = htmlLinkPattern.exec(staticHtml)) !== null) {
    links.push(match[1]);
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
  return link.startsWith("#") || link.startsWith("mailto:") || link.startsWith("data:") || link.startsWith("javascript:");
}

function isRelative(link) {
  return !/^https?:\/\//.test(link);
}

function isOwnSiteLink(link) {
  return link.startsWith("https://sjh9714.github.io/gh-extension-atlas/");
}

function getOwnSiteTarget(link) {
  const parsed = new URL(link);
  const relativePath = parsed.pathname.replace(/^\/gh-extension-atlas\/?/, "") || "index.html";
  return path.join("docs", relativePath.endsWith("/") ? `${relativePath}index.html` : relativePath);
}

async function checkRemoteLinks(remoteLinks) {
  const failures = [];
  const concurrency = 6;
  let index = 0;

  async function worker() {
    while (index < remoteLinks.length) {
      const link = remoteLinks[index++];
      const url = link.split("#")[0];
      const failure = await checkRemoteLink(url, link);
      if (failure) {
        failures.push(failure);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return failures;
}

async function checkRemoteLink(url, link) {
  let lastError;
  let lastStatus;
  const validationUrl = getValidationUrl(url);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchWithTimeout(validationUrl);

      if (response.status < 400) {
        return null;
      }

      if (!isRetryableStatus(response.status)) {
        return `${link} returned HTTP ${response.status}.`;
      }

      lastStatus = response.status;
    } catch (error) {
      if (!isRetryableError(error)) {
        return `${link} failed: ${error.message}`;
      }

      lastError = error;
    }

    if (attempt < maxAttempts) {
      await sleep(retryBackoffMs[attempt - 1]);
    }
  }

  if (lastStatus) {
    return `${link} returned HTTP ${lastStatus} after ${maxAttempts} attempts.`;
  }

  return `${link} failed after ${maxAttempts} attempts: ${lastError.message}`;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "gh-extension-atlas-link-checker",
  };

  if (githubToken && isGitHubUrl(url)) {
    headers.authorization = `Bearer ${githubToken}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers,
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function getValidationUrl(url) {
  const githubApiUrl = getGitHubApiValidationUrl(url);
  return githubApiUrl ?? url;
}

function getGitHubApiValidationUrl(url) {
  const parsed = new URL(url);
  if (parsed.hostname !== "github.com") {
    return null;
  }

  const [owner, repo, ...rest] = parsed.pathname.split("/").filter(Boolean);
  if (!owner || !repo) {
    return null;
  }

  if (rest.length === 0) {
    return `https://api.github.com/repos/${owner}/${repo}`;
  }

  if (rest[0] === "discussions") {
    return `https://api.github.com/repos/${owner}/${repo}`;
  }

  if (rest[0] === "issues" && rest[1] === "new") {
    return `https://api.github.com/repos/${owner}/${repo}`;
  }

  if (rest[0] === "actions" && rest[1] === "workflows" && rest[2] && rest[3] === "badge.svg") {
    return `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${rest[2]}`;
  }

  return null;
}

function isRetryableStatus(status) {
  return retryableStatusCodes.has(status);
}

function isRetryableError(error) {
  return error.name === "AbortError" || /fetch|network|timeout|aborted/i.test(error.message);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getGitHubToken() {
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }

  if (process.env.GH_TOKEN) {
    return process.env.GH_TOKEN;
  }

  try {
    return execFileSync("gh", ["auth", "token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function isGitHubUrl(url) {
  const parsed = new URL(url);
  return parsed.hostname === "github.com" || parsed.hostname === "api.github.com";
}
