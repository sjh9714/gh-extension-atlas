import fs from "node:fs";

const entries = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

const results = entries
  .filter((entry) => matchesCategory(entry, options.category))
  .filter((entry) => matchesStatus(entry, options.status))
  .filter((entry) => matchesOfficial(entry, options.official))
  .filter((entry) => matchesSearch(entry, options.search))
  .sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo))
  .slice(0, options.limit);

if (options.format === "json") {
  console.log(JSON.stringify(results, null, 2));
} else if (options.format === "install") {
  for (const entry of results) {
    console.log(entry.install);
  }
} else {
  printMarkdown(results);
}

function parseArgs(args) {
  const parsed = {
    category: "",
    format: "markdown",
    help: false,
    limit: Number.POSITIVE_INFINITY,
    official: undefined,
    search: "",
    status: "",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--category") {
      parsed.category = readValue(args, index, arg);
      index += 1;
    } else if (arg === "--status") {
      parsed.status = readValue(args, index, arg).toLowerCase();
      index += 1;
    } else if (arg === "--search") {
      parsed.search = readValue(args, index, arg).toLowerCase();
      index += 1;
    } else if (arg === "--format") {
      parsed.format = readValue(args, index, arg).toLowerCase();
      index += 1;
    } else if (arg === "--limit") {
      parsed.limit = parseLimit(readValue(args, index, arg));
      index += 1;
    } else if (arg === "--official") {
      parsed.official = true;
    } else if (arg === "--community") {
      parsed.official = false;
    } else {
      fail(`Unknown option: ${arg}`);
    }
  }

  if (!["markdown", "json", "install"].includes(parsed.format)) {
    fail("--format must be markdown, json, or install.");
  }

  if (parsed.status && !["active", "watch", "stale"].includes(parsed.status)) {
    fail("--status must be active, watch, or stale.");
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

function parseLimit(value) {
  const limit = Number.parseInt(value, 10);
  if (!Number.isInteger(limit) || limit < 1) {
    fail("--limit must be a positive integer.");
  }
  return limit;
}

function fail(message) {
  console.error(message);
  console.error("Run `npm run catalog:query -- --help` for usage.");
  process.exit(1);
}

function matchesCategory(entry, category) {
  return !category || entry.category.toLowerCase() === category.toLowerCase();
}

function matchesStatus(entry, status) {
  return !status || entry.status === status;
}

function matchesOfficial(entry, official) {
  return official === undefined || entry.official === official;
}

function matchesSearch(entry, search) {
  if (!search) {
    return true;
  }

  const haystack = [
    entry.repo,
    entry.name,
    entry.category,
    entry.summary,
    entry.best_for,
    entry.avoid_if,
    entry.license,
    entry.status,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

function printMarkdown(items) {
  console.log(`Found ${items.length} extension${items.length === 1 ? "" : "s"}.`);
  console.log();
  console.log("| Extension | Category | Best for | Status | Install |");
  console.log("| --- | --- | --- | --- | --- |");

  for (const entry of items) {
    console.log(
      `| ${escapeCell(entry.repo)} | ${escapeCell(entry.category)} | ${escapeCell(entry.best_for)} | ${entry.status} | \`${entry.install}\` |`,
    );
  }
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|");
}

function printHelp() {
  console.log(`Query the GitHub CLI Extension Atlas catalog.

Usage:
  npm run catalog:query -- [options]

Options:
  --category <name>     Filter by atlas category, such as "Actions/CI".
  --status <status>     Filter by active, watch, or stale.
  --search <text>       Search repo, category, summary, best_for, and avoid_if.
  --official            Show only official GitHub-owned entries.
  --community           Show only community entries.
  --format <format>     markdown, json, or install. Default: markdown.
  --limit <number>      Limit result count.
  --help, -h            Show this help.

Examples:
  npm run catalog:query -- --category "Actions/CI" --status active
  npm run catalog:query -- --search notifications --format install
  npm run catalog:query -- --official --format json
`);
}
