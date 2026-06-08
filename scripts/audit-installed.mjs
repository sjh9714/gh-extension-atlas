import { execFileSync } from "node:child_process";
import fs from "node:fs";

const entries = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const topPicks = JSON.parse(fs.readFileSync("docs/api/top-picks.json", "utf8"));
const workflows = JSON.parse(fs.readFileSync("data/recommendations.json", "utf8"));
const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

const installed = parseExtensionList(readInstalledExtensions(options));
const audit = buildAudit(installed);

if (options.format === "json") {
  console.log(JSON.stringify(audit, null, 2));
} else if (options.format === "install") {
  for (const entry of audit.missing_top_picks) {
    console.log(entry.install);
  }
} else {
  printMarkdown(audit);
}

function parseArgs(args) {
  const parsed = {
    demo: false,
    format: "markdown",
    help: false,
    input: "",
    stdin: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--demo") {
      parsed.demo = true;
    } else if (arg === "--stdin") {
      parsed.stdin = true;
    } else if (arg === "--input") {
      parsed.input = readValue(args, index, arg);
      index += 1;
    } else if (arg === "--format") {
      parsed.format = readValue(args, index, arg).toLowerCase();
      index += 1;
    } else {
      fail(`Unknown option: ${arg}`);
    }
  }

  if (!["markdown", "json", "install"].includes(parsed.format)) {
    fail("--format must be markdown, json, or install.");
  }

  const sourceCount = [parsed.demo, Boolean(parsed.input), parsed.stdin].filter(Boolean).length;
  if (sourceCount > 1) {
    fail("Use only one input source: --demo, --input, or --stdin.");
  }

  return parsed;
}

function readValue(args, index, flag) {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    fail(`${flag} requires a value.`);
  }
  return value;
}

function readInstalledExtensions({ demo, input, stdin }) {
  if (demo) {
    return [
      "gh dash\tdlvhdr/gh-dash\tv4.8.0",
      "gh s\tgennaro-tedesco/gh-s\tv0.7.0",
      "gh unknown\texample/gh-unknown\tv1.0.0",
    ].join("\n");
  }

  if (input) {
    return fs.readFileSync(input, "utf8");
  }

  if (stdin) {
    return fs.readFileSync(0, "utf8");
  }

  try {
    return execFileSync("gh", ["extension", "list"], { encoding: "utf8" });
  } catch (error) {
    fail(`Could not run \`gh extension list\`: ${error.message}`);
  }
}

function parseExtensionList(text) {
  const seen = new Set();
  const parsed = [];

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const repoMatch = trimmed.match(/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/);
    if (!repoMatch) {
      continue;
    }

    const repo = repoMatch[1];
    const key = repo.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    const versionMatch = trimmed.match(/\b(v?\d+\.\d+(?:\.\d+)?[^\s]*)\b/);
    parsed.push({
      repo,
      version: versionMatch ? versionMatch[1] : "",
      raw: trimmed,
    });
  }

  return parsed.sort((a, b) => a.repo.localeCompare(b.repo));
}

function buildAudit(installed) {
  const entriesByRepo = new Map(entries.map((entry) => [entry.repo.toLowerCase(), entry]));
  const installedSet = new Set(installed.map((item) => item.repo.toLowerCase()));

  const reviewed = [];
  const unlisted = [];

  for (const item of installed) {
    const entry = entriesByRepo.get(item.repo.toLowerCase());
    if (entry) {
      reviewed.push({
        repo: entry.repo,
        name: entry.name,
        category: entry.category,
        status: entry.status,
        best_for: entry.best_for,
        install: entry.install,
        version: item.version,
      });
    } else {
      unlisted.push(item);
    }
  }

  const missingTopPicks = topPicks.filter((entry) => !installedSet.has(entry.repo.toLowerCase()));
  const workflowCoverage = workflows.map((workflow) => {
    const installedRepos = workflow.repos.filter((repo) => installedSet.has(repo.toLowerCase()));
    const missingRepos = workflow.repos.filter((repo) => !installedSet.has(repo.toLowerCase()));
    return {
      id: workflow.id,
      label: workflow.label,
      installed: installedRepos,
      missing: missingRepos,
      coverage: `${installedRepos.length}/${workflow.repos.length}`,
    };
  });

  return {
    installed_count: installed.length,
    reviewed_count: reviewed.length,
    unlisted_count: unlisted.length,
    missing_top_picks_count: missingTopPicks.length,
    reviewed,
    unlisted,
    missing_top_picks: missingTopPicks.map(({ repo, name, category, status, best_for, install }) => ({
      repo,
      name,
      category,
      status,
      best_for,
      install,
    })),
    workflow_coverage: workflowCoverage,
  };
}

function printMarkdown(audit) {
  console.log("# Installed GitHub CLI Extension Audit");
  console.log();
  console.log(`Installed extensions parsed: ${audit.installed_count}`);
  console.log(`Reviewed by atlas: ${audit.reviewed_count}`);
  console.log(`Installed but not listed: ${audit.unlisted_count}`);
  console.log(`Missing Top Picks: ${audit.missing_top_picks_count}`);
  console.log();

  if (audit.reviewed.length) {
    console.log("## Installed And Reviewed");
    console.log();
    console.log("| Extension | Category | Status | Best for | Installed version |");
    console.log("| --- | --- | --- | --- | --- |");
    for (const entry of audit.reviewed) {
      console.log(
        `| ${escapeCell(entry.repo)} | ${escapeCell(entry.category)} | ${entry.status} | ${escapeCell(entry.best_for)} | ${entry.version || "unknown"} |`,
      );
    }
    console.log();
  }

  if (audit.unlisted.length) {
    console.log("## Installed But Not In Atlas");
    console.log();
    console.log("| Repository | Installed version |");
    console.log("| --- | --- |");
    for (const entry of audit.unlisted) {
      console.log(`| ${escapeCell(entry.repo)} | ${entry.version || "unknown"} |`);
    }
    console.log();
  }

  if (audit.missing_top_picks.length) {
    console.log("## Missing Top Picks");
    console.log();
    console.log("| Extension | Category | Best for | Install |");
    console.log("| --- | --- | --- | --- |");
    for (const entry of audit.missing_top_picks) {
      console.log(`| ${escapeCell(entry.repo)} | ${escapeCell(entry.category)} | ${escapeCell(entry.best_for)} | \`${entry.install}\` |`);
    }
    console.log();
  }

  console.log("## Workflow Coverage");
  console.log();
  console.log("| Workflow | Coverage | Missing recommended repos |");
  console.log("| --- | --- | --- |");
  for (const workflow of audit.workflow_coverage) {
    console.log(`| ${escapeCell(workflow.label)} | ${workflow.coverage} | ${workflow.missing.map((repo) => `\`${repo}\``).join(", ") || "None"} |`);
  }
  console.log();
  console.log("Review upstream READMEs before installing extensions that can affect branches, CI, releases, security, or repository state.");
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|");
}

function fail(message) {
  console.error(message);
  console.error("Run `npm run catalog:audit-installed -- --help` for usage.");
  process.exit(1);
}

function printHelp() {
  console.log(`Audit installed GitHub CLI extensions against the atlas catalog.

Usage:
  npm run catalog:audit-installed -- [options]

Options:
  --demo              Use a built-in sample gh extension list.
  --input <path>      Read saved gh extension list output from a file.
  --stdin             Read gh extension list output from stdin.
  --format <format>   markdown, json, or install. Default: markdown.
  --help, -h          Show this help.

Examples:
  npm run catalog:audit-installed
  gh extension list | npm run catalog:audit-installed -- --stdin
  npm run catalog:audit-installed -- --demo --format json
  npm run catalog:audit-installed -- --demo --format install
`);
}
