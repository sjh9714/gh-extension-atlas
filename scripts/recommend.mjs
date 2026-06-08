import fs from "node:fs";

const entries = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const workflows = JSON.parse(fs.readFileSync("data/recommendations.json", "utf8"));
const options = parseArgs(process.argv.slice(2));

const workflowIndex = new Map();

for (const workflow of workflows) {
  workflowIndex.set(workflow.id, workflow);

  for (const alias of workflow.aliases) {
    workflowIndex.set(alias, workflow);
  }
}

if (options.help) {
  printHelp();
  process.exit(0);
}

if (options.list) {
  printWorkflowList();
  process.exit(0);
}

const workflow = workflowIndex.get(options.workflow);

if (!workflow) {
  fail(`Unknown workflow: ${options.workflow || "(missing)"}`);
}

const recommended = workflow.repos.map((repo, index) => {
  const entry = entries.find((candidate) => candidate.repo === repo);

  if (!entry) {
    fail(`${repo}: workflow recommendation is missing from data/extensions.json.`);
  }

  return {
    rank: index + 1,
    workflow: workflow.id,
    workflow_label: workflow.label,
    ...entry,
  };
});

if (options.format === "json") {
  console.log(JSON.stringify(recommended, null, 2));
} else if (options.format === "install") {
  for (const entry of recommended) {
    console.log(entry.install);
  }
} else {
  printMarkdown(workflow, recommended);
}

function parseArgs(args) {
  const parsed = {
    format: "markdown",
    help: false,
    list: false,
    workflow: "",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--list") {
      parsed.list = true;
    } else if (arg === "--workflow" || arg === "-w") {
      parsed.workflow = readValue(args, index, arg).toLowerCase();
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

  return parsed;
}

function readValue(args, index, flag) {
  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    fail(`${flag} requires a value.`);
  }

  return value;
}

function fail(message) {
  console.error(message);
  console.error("Run `npm run catalog:recommend -- --help` for usage.");
  process.exit(1);
}

function printWorkflowList() {
  console.log("Available recommendation workflows:");
  console.log();
  console.log("| Workflow | Aliases | Focus |");
  console.log("| --- | --- | --- |");

  for (const workflow of workflows) {
    console.log(`| ${workflow.id} | ${workflow.aliases.join(", ")} | ${workflow.label} |`);
  }
}

function printMarkdown(workflow, items) {
  console.log(`Recommended GitHub CLI extensions for ${workflow.label}:`);
  console.log();
  console.log("| # | Extension | Best fit | Status | Avoid if | Install |");
  console.log("| --- | --- | --- | --- | --- | --- |");

  for (const entry of items) {
    console.log(
      `| ${entry.rank} | ${escapeCell(entry.repo)} | ${escapeCell(entry.best_for)} | ${entry.status} | ${escapeCell(entry.avoid_if)} | \`${entry.install}\` |`,
    );
  }

  console.log();
  console.log("Review upstream READMEs before adopting extensions for security, CI, release, compliance, or production workflows.");
}

function printHelp() {
  console.log(`Recommend a small GitHub CLI extension set for a workflow.

Usage:
  npm run catalog:recommend -- --workflow <name> [options]

Options:
  --workflow, -w <name>  Workflow or alias to recommend for.
  --format <format>     markdown, json, or install. Default: markdown.
  --list                Show available workflows and aliases.
  --help, -h            Show this help.

Examples:
  npm --silent run catalog:recommend -- --list
  npm --silent run catalog:recommend -- --workflow actions
  npm --silent run catalog:recommend -- --workflow notifications --format install
  npm --silent run catalog:recommend -- --workflow security --format json
`);
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|");
}
