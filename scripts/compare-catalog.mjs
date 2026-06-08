import fs from "node:fs";

const entries = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

if (options.terms.length < 2) {
  fail("Provide at least two extension names or repositories to compare.");
}

const selected = options.terms.map((term) => resolveEntry(term));

if (options.format === "json") {
  console.log(JSON.stringify(selected, null, 2));
} else if (options.format === "install") {
  for (const entry of selected) {
    console.log(entry.install);
  }
} else {
  printMarkdown(selected);
}

function parseArgs(args) {
  const parsed = {
    format: "markdown",
    help: false,
    terms: [],
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--format") {
      parsed.format = readValue(args, index, arg).toLowerCase();
      index += 1;
    } else if (arg.startsWith("--")) {
      fail(`Unknown option: ${arg}`);
    } else {
      parsed.terms.push(arg);
    }
  }

  if (!["markdown", "json", "install"].includes(parsed.format)) {
    fail("--format must be markdown, json, or install.");
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

function resolveEntry(term) {
  const normalized = normalize(term);
  const matches = entries.filter((entry) => {
    const repo = normalize(entry.repo);
    const ownerlessRepo = normalize(entry.repo.split("/").at(-1));
    const name = normalize(entry.name);
    const ghName = normalize(`gh-${entry.name}`);

    return [repo, ownerlessRepo, name, ghName].includes(normalized);
  });

  if (matches.length === 1) {
    return matches[0];
  }

  if (matches.length > 1) {
    const repos = matches.map((entry) => entry.repo).join(", ");
    fail(`${term}: ambiguous match. Use the full OWNER/REPO form. Matches: ${repos}`);
  }

  const fuzzyMatches = entries.filter((entry) =>
    [entry.repo, entry.name, entry.summary, entry.best_for]
      .join(" ")
      .toLowerCase()
      .includes(term.toLowerCase()),
  );

  if (fuzzyMatches.length > 0) {
    const suggestions = fuzzyMatches
      .slice(0, 5)
      .map((entry) => entry.repo)
      .join(", ");
    fail(`${term}: no exact match. Did you mean one of: ${suggestions}?`);
  }

  fail(`${term}: no catalog entry found.`);
}

function normalize(value) {
  return String(value).toLowerCase().replace(/^gh-/, "");
}

function fail(message) {
  console.error(message);
  console.error("Run `npm run catalog:compare -- --help` for usage.");
  process.exit(1);
}

function printMarkdown(items) {
  console.log(`Comparing ${items.length} GitHub CLI extensions.`);
  console.log();
  console.log("| Extension | Category | Status | Best for | Avoid if | Install |");
  console.log("| --- | --- | --- | --- | --- | --- |");

  for (const entry of items) {
    console.log(
      `| ${escapeCell(entry.repo)} | ${escapeCell(entry.category)} | ${entry.status} | ${escapeCell(entry.best_for)} | ${escapeCell(entry.avoid_if)} | \`${entry.install}\` |`,
    );
  }

  console.log();
  console.log("Review upstream READMEs before installing extensions that affect branches, CI, repository settings, security, or admin workflows.");
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|");
}

function printHelp() {
  console.log(`Compare GitHub CLI extensions from the local atlas catalog.

Usage:
  npm run catalog:compare -- <extension...> [options]

Arguments:
  <extension...>       Two or more extension names or repositories.
                      Accepts names such as gh-dash, dash, or dlvhdr/gh-dash.

Options:
  --format <format>   markdown, json, or install. Default: markdown.
  --help, -h          Show this help.

Examples:
  npm --silent run catalog:compare -- gh-dash gh-notify gh-pr-review
  npm --silent run catalog:compare -- dlvhdr/gh-enhance fchimpan/gh-workflow-stats
  npm --silent run catalog:compare -- gh-s gh-grep gh-find-code --format json
  npm --silent run catalog:compare -- gh-poi gh-branch --format install
`);
}
