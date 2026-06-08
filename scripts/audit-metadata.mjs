import fs from "node:fs";
import { execFileSync } from "node:child_process";

const dataPath = "data/extensions.json";
const options = parseArgs(process.argv.slice(2));
const entries = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const githubToken = getGitHubToken();

if (options.help) {
  printHelp();
  process.exit(0);
}

const remoteRepos = await mapLimit(entries, 6, fetchRepoMetadata);
const today = new Date().toISOString().slice(0, 10);
const changes = [];
const archived = [];

for (const [index, entry] of entries.entries()) {
  const remote = remoteRepos[index];
  const next = {
    stars: remote.stargazers_count,
    license: remote.license?.spdx_id || "NOASSERTION",
    last_pushed_at: remote.pushed_at,
    archived: remote.archived,
    verified_at: today,
  };

  if (next.archived) {
    archived.push(entry.repo);
  }

  for (const [field, value] of Object.entries(next)) {
    if (entry[field] !== value) {
      changes.push({
        repo: entry.repo,
        field,
        before: entry[field],
        after: value,
      });
    }
  }

  if (options.write) {
    Object.assign(entry, next);
  }
}

printSummary(changes, archived);

if (archived.length > 0) {
  console.error("Archived repositories must be removed or explicitly deferred before writing metadata.");
  process.exit(1);
}

if (options.write) {
  fs.writeFileSync(dataPath, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`Updated ${dataPath}.`);
} else {
  console.log("Dry run only. Re-run with `--write` to update mechanical metadata fields.");
}

function parseArgs(args) {
  const parsed = {
    help: false,
    write: false,
  };

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--write") {
      parsed.write = true;
    } else {
      fail(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function fail(message) {
  console.error(message);
  console.error("Run `npm run metadata:audit -- --help` for usage.");
  process.exit(1);
}

async function fetchRepoMetadata(entry) {
  const url = `https://api.github.com/repos/${entry.repo}`;
  const response = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": "gh-extension-atlas-metadata-auditor",
      ...(githubToken ? { authorization: `Bearer ${githubToken}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`${entry.repo}: GitHub API returned HTTP ${response.status}.`);
  }

  return response.json();
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function printSummary(changes, archived) {
  console.log(`Checked ${entries.length} repositories.`);
  console.log(`Metadata changes found: ${changes.length}.`);

  if (archived.length > 0) {
    console.log();
    console.log("Archived repositories found:");
    for (const repo of archived) {
      console.log(`- ${repo}`);
    }
  }

  if (changes.length === 0) {
    return;
  }

  console.log();
  console.log("| Repository | Field | Before | After |");
  console.log("| --- | --- | --- | --- |");

  for (const change of changes) {
    console.log(
      `| ${escapeCell(change.repo)} | ${escapeCell(change.field)} | ${escapeCell(formatValue(change.before))} | ${escapeCell(
        formatValue(change.after),
      )} |`,
    );
  }
}

function formatValue(value) {
  return value === undefined ? "" : String(value);
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|");
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

function printHelp() {
  console.log(`Audit live GitHub repository metadata for the atlas catalog.

Usage:
  npm run metadata:audit
  npm run metadata:audit -- --write

Options:
  --write       Update stars, license, last_pushed_at, archived, and verified_at.
  --help, -h    Show this help.

Notes:
  This script does not change categories, summaries, best_for, avoid_if, official, or status.
  Archived repositories fail the audit so they can be removed or deferred deliberately.
`);
}
