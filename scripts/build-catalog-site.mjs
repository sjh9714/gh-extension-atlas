import fs from "node:fs";
import path from "node:path";

const dataPath = "data/extensions.json";
const schemaPath = "data/extensions.schema.json";
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const checkOnly = process.argv.includes("--check");
const siteUrl = "https://sjh9714.github.io/gh-extension-atlas/";
const socialImageUrl = `${siteUrl}social-card.png`;
const categoryDescriptions = {
  "Actions/CI": "Inspect workflows, summarize CI health, migrate pipelines, and operate GitHub Actions from the terminal.",
  "AI/Agents": "Try agentic, AI-assisted, and model-driven GitHub workflows from the GitHub CLI.",
  "Dashboard/TUI": "Use terminal dashboards and visual interfaces for daily GitHub triage.",
  "Notifications": "Review and reduce GitHub notification noise without opening the browser.",
  "PR & Issues": "Review pull requests, issues, comments, and maintainer queues from the terminal.",
  "Repo & Branch": "Clean branches, manage repositories, and keep local GitHub workflows tidy.",
  "Search": "Search repositories, code, stars, and GitHub resources from the command line.",
  "Security/Admin": "Generate SBOMs, inspect security posture, manage tokens, and support admin workflows.",
};
const workflowGuides = {
  "Dashboard/TUI": {
    title: "GitHub Terminal Dashboard CLI Extension Guide",
    path: "guides/terminal-dashboard-extensions.html",
    sourcePath: "guides/terminal-dashboard-extensions.md",
    summary: "Choose a GitHub terminal dashboard, Markdown preview TUI, or visual contribution tool.",
  },
  "Actions/CI": {
    title: "GitHub Actions CLI extension guide",
    path: "guides/github-actions-extensions.html",
    sourcePath: "guides/github-actions-extensions.md",
    summary: "Choose an Actions TUI, local runner, migration, or workflow health extension.",
  },
  "AI/Agents": {
    title: "GitHub AI And Agent CLI Extension Guide",
    path: "guides/ai-agent-extensions.html",
    sourcePath: "guides/ai-agent-extensions.md",
    summary: "Choose a GitHub agent workflow, Models, standup, or MCP helper.",
  },
  "Repo & Branch": {
    title: "Git Branch Cleanup CLI Extension Guide",
    path: "guides/branch-cleanup-extensions.html",
    sourcePath: "guides/branch-cleanup-extensions.md",
    summary: "Choose a safe local branch cleanup, branch switching, or worktree helper.",
  },
  "Notifications": {
    title: "GitHub Notification Triage CLI Extension Guide",
    path: "guides/notification-triage-extensions.html",
    sourcePath: "guides/notification-triage-extensions.md",
    summary: "Choose a terminal notification viewer, rules helper, cleanup tool, or broader triage dashboard.",
  },
  "PR & Issues": {
    title: "GitHub PR And Issue Triage CLI Extension Guide",
    path: "guides/pr-issue-triage-extensions.html",
    sourcePath: "guides/pr-issue-triage-extensions.md",
    summary: "Choose a PR review, stacked PR, dependency PR, metrics, issue search, or milestone helper.",
  },
  "Search": {
    title: "GitHub Repository Search CLI Extension Guide",
    path: "guides/repository-search-extensions.html",
    sourcePath: "guides/repository-search-extensions.md",
    summary: "Choose a repository search, code search, starred-repository, or local clone helper.",
  },
  "Security/Admin": {
    title: "GitHub Security And Admin CLI Extension Guide",
    path: "guides/security-admin-extensions.html",
    sourcePath: "guides/security-admin-extensions.md",
    summary: "Choose an SBOM, CodeQL, token, webhook, repository config, or migration helper.",
  },
};
const actionsGuideRows = [
  {
    need: "Inspect and manage workflows interactively",
    repo: "dlvhdr/gh-enhance",
    why: "A focused terminal UI for GitHub Actions workflows.",
  },
  {
    need: "Understand workflow health over time",
    repo: "fchimpan/gh-workflow-stats",
    why: "Summarizes workflow and job success rate and execution time.",
  },
  {
    need: "Run project checks before pushing",
    repo: "basecamp/gh-signoff",
    why: "Gives teams a repeatable local signoff step.",
  },
  {
    need: "Test Actions locally",
    repo: "nektos/gh-act",
    why: "Wraps local GitHub Actions execution through the GitHub CLI.",
  },
  {
    need: "Migrate another CI system into Actions",
    repo: "github/gh-actions-importer",
    why: "Built for CI migration planning and automation.",
  },
  {
    need: "Reduce runner cost",
    repo: "fchimpan/gh-slimify",
    why: "Looks for workflows that can move to slimmer GitHub-hosted runners.",
  },
  {
    need: "Check organization-wide Actions status",
    repo: "rsese/gh-actions-status",
    why: "Targets organization-level Actions reporting; verify compatibility because it is stale.",
  },
];
const aiAgentGuideRows = [
  {
    need: "Run GitHub-native agent workflows",
    repo: "github/gh-aw",
    why: "The strongest first stop when the workflow itself is an agent task.",
  },
  {
    need: "Test prompts and models from the terminal",
    repo: "github/gh-models",
    why: "Useful when you want GitHub Models inside an existing gh workflow.",
  },
  {
    need: "Generate an AI-assisted standup report",
    repo: "sgoedecke/gh-standup",
    why: "A focused helper when the repeated task is summarizing GitHub activity.",
  },
  {
    need: "Connect AI tools to GitHub through MCP",
    repo: "shuymn/gh-mcp",
    why: "A practical bridge for running GitHub MCP Server with existing gh authentication.",
  },
];
const dashboardGuideRows = [
  {
    need: "Triage PRs, issues, and notifications daily",
    repo: "dlvhdr/gh-dash",
    why: "The strongest first stop when GitHub work is a queue you review every day.",
  },
  {
    need: "Browse GitHub resources in a compact TUI",
    repo: "gizmo385/gh-lazy",
    why: "A smaller terminal UI when you want exploration rather than a full maintainer cockpit.",
  },
  {
    need: "Preview README or docs before pushing",
    repo: "yusukebe/gh-markdown-preview",
    why: "Useful when the visual state you care about is GitHub-flavored Markdown rendering.",
  },
  {
    need: "Preview GitHub-flavored Markdown with offline-friendly tooling",
    repo: "thiagokokada/gh-gfm-preview",
    why: "A good alternative when you want a standalone Markdown preview path.",
  },
  {
    need: "Explore GitHub profiles and ecosystems",
    repo: "jrnxf/gh-eco",
    why: "Better for discovery and profile context than operational triage.",
  },
  {
    need: "Create a visual contribution-history artifact",
    repo: "github/gh-skyline",
    why: "Best when the output is a visual artifact rather than a productivity dashboard.",
  },
  {
    need: "See contribution graphs in the terminal",
    repo: "kawarimidoll/gh-graph",
    why: "A narrow terminal visualization tool for contribution history.",
  },
];
const branchCleanupGuideRows = [
  {
    need: "Safely remove merged local branches",
    repo: "seachicken/gh-poi",
    why: "A focused cleanup tool and the safest first stop for merged local branches.",
  },
  {
    need: "Fuzzy find, switch, or delete branches manually",
    repo: "mislav/gh-branch",
    why: "Good when you want selection and navigation instead of automatic cleanup.",
  },
  {
    need: "Clean a workspace before a new task",
    repo: "HaywardMorihara/gh-tidy",
    why: "A broader workspace cleanup helper for context switching.",
  },
  {
    need: "Work across multiple branches at once",
    repo: "despreston/gh-worktree",
    why: "Useful when worktrees are already part of your branch workflow.",
  },
  {
    need: "Delete branches with upstream and unpushed checks",
    repo: "davidraviv/gh-clean-branches",
    why: "A specific cleanup approach, but verify compatibility because it is stale.",
  },
  {
    need: "Install release binaries while setting up a repo",
    repo: "redraw/gh-install",
    why: "Not a cleanup tool, but useful in local repo setup workflows.",
  },
];
const notificationGuideRows = [
  {
    need: "See GitHub notifications without opening the browser",
    repo: "meiji163/gh-notify",
    why: "The simplest first stop when visibility is the main problem.",
  },
  {
    need: "Filter or process notifications with rules",
    repo: "nobe4/gh-not",
    why: "Better when your notification workflow needs filtering instead of display only.",
  },
  {
    need: "Remove phantom notifications",
    repo: "emmanuel-ferdman/gh-gonest",
    why: "Focused on stuck notifications from deleted or inaccessible repositories.",
  },
  {
    need: "Work unread issues and PRs from notifications",
    repo: "k1LoW/gh-triage",
    why: "Useful when notifications are the input to issue and PR triage.",
  },
  {
    need: "Fold notifications into maintainer triage",
    repo: "dlvhdr/gh-dash",
    why: "Best when notifications belong beside PR and issue queues in a TUI.",
  },
];
const prIssueGuideRows = [
  {
    need: "Resolve inline PR review threads",
    repo: "agynio/gh-pr-review",
    why: "Best when review comments and replies are the main workflow.",
  },
  {
    need: "Manage stacked pull requests",
    repo: "github/gh-stack",
    why: "Useful when large changes are split into dependent PRs.",
  },
  {
    need: "Review pull requests in a focused terminal flow",
    repo: "kawarimidoll/gh-prism",
    why: "A compact PR review option when you do not need a full dashboard.",
  },
  {
    need: "Process Dependabot pull requests",
    repo: "einride/gh-dependabot",
    why: "Targets the dependency-update review queue directly.",
  },
  {
    need: "Bulk triage dependency update queues",
    repo: "jackchuka/gh-dep",
    why: "A TUI for teams with many Dependabot or Renovate PRs.",
  },
  {
    need: "Measure PR review health",
    repo: "hectcastro/gh-metrics",
    why: "Summarizes PR timing and review metrics instead of individual PR details.",
  },
  {
    need: "Search issues interactively",
    repo: "gennaro-tedesco/gh-i",
    why: "A focused issue search flow; verify fit because it is marked watch.",
  },
  {
    need: "Create branches and PRs from issues",
    repo: "InditexTech/gh-sherpa",
    why: "Good when work starts from a Jira or GitHub issue.",
  },
  {
    need: "Manage milestones from the terminal",
    repo: "valeriobelli/gh-milestone",
    why: "Useful when milestone planning is part of maintainer work.",
  },
  {
    need: "Query GitHub Projects with SQL",
    repo: "KOBA789/gh-sql",
    why: "Powerful for advanced project data queries, but verify compatibility because it is stale.",
  },
];
const searchGuideRows = [
  {
    need: "Search repositories interactively",
    repo: "gennaro-tedesco/gh-s",
    why: "The best first stop when repository discovery is the main job.",
  },
  {
    need: "Search repository content without cloning",
    repo: "k1LoW/gh-grep",
    why: "Good when you want API-backed content search from the terminal.",
  },
  {
    need: "Search GitHub code with fzf",
    repo: "LangLangBart/gh-find-code",
    why: "Useful when interactive code search matters more than repository search.",
  },
  {
    need: "Search your starred repositories",
    repo: "Link-/gh-stars",
    why: "A focused active option for treating stars as a personal knowledge base.",
  },
  {
    need: "Browse a large starred-repository collection",
    repo: "korosuke613/gh-user-stars",
    why: "Useful for personal star libraries, but verify compatibility because it is stale.",
  },
  {
    need: "Search and clone into a local repo workspace",
    repo: "kawarimidoll/gh-q",
    why: "Best when discovery should lead directly into local repository organization.",
  },
  {
    need: "Explore a repository before cloning it",
    repo: "samcoe/gh-repo-explore",
    why: "A narrow explorer workflow, but verify compatibility because it is stale.",
  },
];
const securityAdminGuideRows = [
  {
    need: "Generate an SBOM for release or compliance work",
    repo: "advanced-security/gh-sbom",
    why: "The strongest first stop when the output you need is a software bill of materials.",
  },
  {
    need: "Inspect code scanning findings",
    repo: "advanced-security/gh-code-scanning",
    why: "A focused way to view GitHub code scanning data from the terminal.",
  },
  {
    need: "Run CodeQL workflows",
    repo: "github/gh-codeql",
    why: "Useful for security engineers who need CodeQL commands in their gh workflow.",
  },
  {
    need: "Run CodeQL queries across many repositories",
    repo: "GitHubSecurityLab/gh-mrva",
    why: "Targets multi-repository variant analysis; verify fit because it is marked watch.",
  },
  {
    need: "Work directly with CodeQL databases",
    repo: "GitHubSecurityLab/gh-qldb",
    why: "Useful when CodeQL database management is the task, not general scanning.",
  },
  {
    need: "Create GitHub App installation tokens",
    repo: "Link-/gh-token",
    why: "A practical helper for GitHub App authentication and automation workflows.",
  },
  {
    need: "Manage GitHub infrastructure with YAML",
    repo: "babarot/gh-infra",
    why: "Best when repository and organization settings should be reviewed as code.",
  },
  {
    need: "Standardize repository configuration",
    repo: "twelvelabs/gh-repo-config",
    why: "A focused option for teams that repeatedly adjust repository settings.",
  },
  {
    need: "Test webhook-driven integrations",
    repo: "cli/gh-webhook",
    why: "Useful when local or development webhook workflows are the main problem.",
  },
  {
    need: "Support GitHub Enterprise Importer migrations",
    repo: "github/gh-gei",
    why: "The canonical extension for Enterprise Importer migration workflows.",
  },
  {
    need: "Collect repository inventory for migrations",
    repo: "mona-actions/gh-repo-stats",
    why: "Useful when migration planning starts with repository metadata collection.",
  },
];
const topPickRepos = [
  "dlvhdr/gh-dash",
  "github/gh-aw",
  "github/gh-stack",
  "seachicken/gh-poi",
  "yusukebe/gh-markdown-preview",
  "advanced-security/gh-sbom",
  "gennaro-tedesco/gh-s",
  "meiji163/gh-notify",
  "agynio/gh-pr-review",
  "fchimpan/gh-workflow-stats",
];
const starterPacks = [
  {
    name: "Daily Maintainer Triage",
    summary: "PRs, issues, review threads, and notifications from the terminal.",
    repos: ["dlvhdr/gh-dash", "agynio/gh-pr-review", "meiji163/gh-notify"],
  },
  {
    name: "PR Review And Issue Triage",
    summary: "Inline PR review, stacked PRs, and dependency update queues.",
    repos: ["agynio/gh-pr-review", "github/gh-stack", "einride/gh-dependabot"],
  },
  {
    name: "GitHub Actions Operator",
    summary: "Interactive workflow inspection plus CI health and migration helpers.",
    repos: ["dlvhdr/gh-enhance", "fchimpan/gh-workflow-stats", "github/gh-actions-importer"],
  },
  {
    name: "AI And Agents",
    summary: "GitHub agent workflows, Models, standup summaries, and MCP setup.",
    repos: ["github/gh-aw", "github/gh-models", "shuymn/gh-mcp"],
  },
  {
    name: "Local Repository Cleanup",
    summary: "Safer branch cleanup, fuzzy branch switching, and release binary installs.",
    repos: ["seachicken/gh-poi", "mislav/gh-branch", "redraw/gh-install"],
  },
  {
    name: "Documentation Review",
    summary: "GitHub-flavored Markdown preview before publishing README or docs changes.",
    repos: ["yusukebe/gh-markdown-preview", "thiagokokada/gh-gfm-preview"],
  },
  {
    name: "Search And Discovery",
    summary: "Repository discovery, API-backed grep, and interactive code search.",
    repos: ["gennaro-tedesco/gh-s", "k1LoW/gh-grep", "LangLangBart/gh-find-code"],
  },
  {
    name: "Security And Admin",
    summary: "SBOM generation, GitHub App tokens, and enterprise migration workflows.",
    repos: ["advanced-security/gh-sbom", "Link-/gh-token", "github/gh-gei"],
  },
];

const entries = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const categories = unique(entries.map((entry) => entry.category));
const categoryPageFiles = categories.map((category) => ({
  path: `docs/${categoryPagePath(category)}`,
  content: renderCategoryPage(category, entries.filter((entry) => entry.category === category)),
}));
const guidePageFiles = Object.entries(workflowGuides).map(([category, guide]) => ({
  path: `docs/${guide.path}`,
  content: renderWorkflowGuidePage(category, guide, entries.filter((entry) => entry.category === category)),
}));
const endpointFiles = [
  { path: "docs/api/index.json", content: renderJson(renderApiIndex(entries)) },
  { path: "docs/api/extensions.json", content: renderJson(stableEntries(entries)) },
  { path: "docs/api/extensions.schema.json", content: renderJson(schema) },
  { path: "docs/api/top-picks.json", content: renderJson(getTopPickEntries(entries)) },
  { path: "docs/install/all.txt", content: renderInstallCommands(stableEntries(entries)) },
  { path: "docs/install/top-picks.txt", content: renderInstallCommands(getTopPickEntries(entries)) },
  ...starterPacks.map((pack) => ({
    path: `docs/install/starter-packs/${starterPackSlug(pack)}.txt`,
    content: renderInstallCommands(getStarterPackEntries(pack, entries)),
  })),
  ...categories.flatMap((category) => {
    const categoryEntries = entries.filter((entry) => entry.category === category).sort(categorySort);
    const slug = categorySlug(category);
    return [
      { path: `docs/api/categories/${slug}.json`, content: renderJson(categoryEntries) },
      { path: `docs/install/categories/${slug}.txt`, content: renderInstallCommands(categoryEntries) },
    ];
  }),
];
const generatedFiles = [
  { path: "docs/index.html", content: renderCatalog(entries) },
  { path: "docs/robots.txt", content: renderRobotsTxt() },
  { path: "docs/sitemap.xml", content: renderSitemapXml(entries) },
  { path: "docs/social-card.svg", content: renderSocialCard(entries) },
  ...categoryPageFiles,
  ...guidePageFiles,
  ...endpointFiles,
];

if (checkOnly) {
  let hasStaleFile = false;

  for (const file of generatedFiles) {
    const current = fs.existsSync(file.path) ? fs.readFileSync(file.path, "utf8") : "";
    if (current !== file.content) {
      console.error(`${file.path} is out of date. Run \`npm run site:build\`.`);
      hasStaleFile = true;
    }
  }

  if (hasStaleFile) {
    process.exit(1);
  }

  console.log("Generated site files are up to date.");
} else {
  for (const file of generatedFiles) {
    fs.mkdirSync(path.dirname(file.path), { recursive: true });
    fs.writeFileSync(file.path, file.content);
    console.log(`Wrote ${file.path}.`);
  }
}

function renderCatalog(items) {
  const categories = unique(items.map((entry) => entry.category));
  const statuses = ["active", "watch", "stale"];
  const generatedAt = latestVerifiedAt(items);
  const dataJson = JSON.stringify(items).replaceAll("<", "\\u003c");
  const topPickJson = JSON.stringify(topPickRepos).replaceAll("<", "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GitHub CLI Extension Atlas</title>
  <meta name="description" content="Search and filter a curated catalog of GitHub CLI extensions.">
  <meta property="og:title" content="GitHub CLI Extension Atlas">
  <meta property="og:description" content="Search ${items.length} curated GitHub CLI extensions by workflow, maintenance status, ownership, and install command.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${siteUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="GitHub CLI Extension Atlas social preview card">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="GitHub CLI Extension Atlas">
  <meta name="twitter:description" content="Search ${items.length} curated GitHub CLI extensions by workflow, maintenance status, ownership, and install command.">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${siteUrl}">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230969da'/%3E%3Cpath d='M18 33h28M30 21l12 12-12 12' fill='none' stroke='white' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f8fa;
      --panel: #ffffff;
      --text: #1f2328;
      --muted: #656d76;
      --border: #d0d7de;
      --accent: #0969da;
      --accent-soft: #ddf4ff;
      --good: #1a7f37;
      --warn: #9a6700;
      --stale: #8250df;
      --shadow: 0 1px 2px rgba(31, 35, 40, 0.08);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    header {
      background: var(--panel);
      border-bottom: 1px solid var(--border);
    }

    .wrap {
      width: min(1180px, calc(100vw - 32px));
      margin: 0 auto;
    }

    .header-inner {
      display: grid;
      gap: 14px;
      padding: 28px 0 22px;
    }

    h1 {
      margin: 0;
      font-size: clamp(28px, 4vw, 42px);
      line-height: 1.1;
      letter-spacing: 0;
    }

    .lead {
      max-width: 780px;
      margin: 0;
      color: var(--muted);
      font-size: 17px;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      color: var(--muted);
      font-size: 13px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 10px;
      background: var(--panel);
      color: var(--muted);
      white-space: nowrap;
    }

    main {
      padding: 20px 0 42px;
    }

    .chooser {
      display: grid;
      gap: 12px;
      margin-bottom: 14px;
      padding: 14px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .chooser-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }

    .choice-card {
      display: grid;
      gap: 5px;
      min-height: 86px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 11px;
      background: var(--panel);
      color: var(--text);
      text-align: left;
      text-decoration: none;
      box-shadow: var(--shadow);
    }

    button.choice-card {
      width: 100%;
      font-weight: 400;
    }

    .choice-card strong {
      font-size: 14px;
      line-height: 1.25;
    }

    .choice-card span {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.35;
    }

    .choice-card:hover {
      border-color: var(--accent);
      color: var(--text);
      text-decoration: none;
    }

    .choice-card:hover strong {
      color: var(--accent);
    }

    .toolbar {
      display: grid;
      gap: 12px;
      padding: 14px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .filters {
      display: grid;
      grid-template-columns: minmax(220px, 1.4fr) repeat(5, minmax(120px, 1fr));
      gap: 10px;
    }

    label {
      display: grid;
      gap: 5px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 600;
    }

    input,
    select,
    button {
      width: 100%;
      min-height: 38px;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 7px 9px;
      background: var(--panel);
      color: var(--text);
      font: inherit;
    }

    input:focus,
    select:focus,
    button:focus {
      outline: 2px solid var(--accent-soft);
      border-color: var(--accent);
    }

    button {
      cursor: pointer;
      font-weight: 600;
    }

    button:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    button:disabled {
      cursor: not-allowed;
      border-color: var(--border);
      color: var(--muted);
      opacity: 0.62;
    }

    .presets,
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .presets button,
    .actions button,
    .copy-button {
      width: auto;
      min-height: 32px;
      font-size: 13px;
    }

    .actions {
      justify-content: space-between;
    }

    .action-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .hint {
      color: var(--muted);
      font-size: 13px;
    }

    .summary {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      color: var(--muted);
      font-size: 13px;
    }

    .packs {
      margin-top: 14px;
      display: grid;
      gap: 12px;
    }

    .category-pages {
      margin-top: 14px;
      display: grid;
      gap: 12px;
    }

    .section-heading {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: baseline;
      justify-content: space-between;
    }

    .section-heading h2 {
      margin: 0;
      font-size: 18px;
      line-height: 1.3;
      letter-spacing: 0;
    }

    .section-heading p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
    }

    .pack-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }

    .pack-card,
    .category-card {
      display: grid;
      gap: 9px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .category-card {
      color: var(--text);
    }

    .pack-card h3 {
      margin: 0;
      font-size: 15px;
      line-height: 1.3;
      letter-spacing: 0;
    }

    .pack-card p,
    .category-card span {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
    }

    .pack-card pre {
      margin: 0;
      overflow: auto;
      border-radius: 6px;
      padding: 8px;
      background: #f6f8fa;
    }

    .table-wrap {
      margin-top: 14px;
      overflow: auto;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    table {
      width: 100%;
      min-width: 980px;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 11px 12px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }

    th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: #f6f8fa;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    code {
      font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .repo {
      font-weight: 700;
      white-space: nowrap;
    }

    .top-pick {
      display: inline-flex;
      margin-left: 6px;
      border-radius: 999px;
      padding: 1px 7px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      vertical-align: 1px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .status.active {
      background: #dafbe1;
      color: var(--good);
    }

    .status.watch {
      background: #fff8c5;
      color: var(--warn);
    }

    .status.stale {
      background: #fbefff;
      color: var(--stale);
    }

    .install {
      white-space: nowrap;
    }

    .install-wrap {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }

    .empty {
      padding: 26px;
      color: var(--muted);
      text-align: center;
    }

    footer {
      padding: 20px 0 34px;
      color: var(--muted);
      font-size: 13px;
    }

    @media (max-width: 860px) {
      .filters {
        grid-template-columns: 1fr 1fr;
      }

      .pack-grid {
        grid-template-columns: 1fr 1fr;
      }

      .chooser-grid {
        grid-template-columns: 1fr 1fr;
      }

      .category-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 560px) {
      .wrap {
        width: min(100vw - 20px, 1180px);
      }

      .filters {
        grid-template-columns: 1fr;
      }

      .pack-grid {
        grid-template-columns: 1fr;
      }

      .chooser-grid {
        grid-template-columns: 1fr;
      }

      .category-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>GitHub CLI Extension Atlas</h1>
      <p class="lead">Search ${items.length} curated GitHub CLI extensions by workflow, maintenance status, ownership, and install command.</p>
      <div class="meta">
        <span class="pill">Generated ${escapeHtml(generatedAt)}</span>
        <span class="pill">Reviewed snapshot</span>
        <span class="pill">API index: <a href="api/index.json">index.json</a></span>
        <span class="pill">API: <a href="api/extensions.json">extensions.json</a></span>
        <span class="pill">API docs: <a href="api-reference.md">api-reference.md</a></span>
        <span class="pill">Install bundle: <a href="install/all.txt">all.txt</a></span>
        <span class="pill"><a href="https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/starter-packs.md">Starter Packs</a></span>
        <span class="pill"><a href="https://github.com/sjh9714/gh-extension-atlas#readme">README</a></span>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="chooser" aria-label="Fast workflow chooser">
      <div class="section-heading">
        <div>
          <h2>Pick in 30 Seconds</h2>
          <p>Start from the workflow that hurts right now, then narrow the catalog with filters.</p>
        </div>
      </div>
      <div class="chooser-grid">
        <button class="choice-card" type="button" data-preset="top">
          <strong>Not sure yet</strong>
          <span>Start with the Top Picks shortlist.</span>
        </button>
        <button class="choice-card" type="button" data-preset="actions">
          <strong>Actions workflows</strong>
          <span>Inspect GitHub Actions and CI health from the terminal.</span>
        </button>
        <button class="choice-card" type="button" data-preset="notifications">
          <strong>Daily triage</strong>
          <span>Compare GitHub notification and inbox tools.</span>
        </button>
        <button class="choice-card" type="button" data-preset="branches">
          <strong>Branch cleanup</strong>
          <span>Find safer local branch cleanup workflows.</span>
        </button>
        <button class="choice-card" type="button" data-preset="docs">
          <strong>Docs preview</strong>
          <span>Preview README and GitHub-flavored Markdown changes.</span>
        </button>
        <button class="choice-card" type="button" data-preset="search">
          <strong>Search and discovery</strong>
          <span>Find repositories, code, stars, and GitHub resources.</span>
        </button>
        <button class="choice-card" type="button" data-preset="security">
          <strong>Security and admin</strong>
          <span>Review SBOM, token, migration, and admin tools.</span>
        </button>
        <a class="choice-card" href="api-reference.md">
          <strong>Reusable data</strong>
          <span>Open the public API reference and schema notes.</span>
        </a>
      </div>
    </section>

    <section class="toolbar" aria-label="Catalog filters">
      <div class="filters">
        <label>
          Search
          <input id="search" type="search" placeholder="dashboard, notifications, Actions, SBOM">
        </label>
        <label>
          Category
          <select id="category">
            <option value="">All categories</option>
            ${categories.map((category) => `<option value="${escapeAttribute(category)}">${escapeHtml(category)}</option>`).join("\n            ")}
          </select>
        </label>
        <label>
          Status
          <select id="status">
            <option value="">All statuses</option>
            ${statuses.map((status) => `<option value="${status}">${status}</option>`).join("\n            ")}
          </select>
        </label>
        <label>
          Ownership
          <select id="ownership">
            <option value="">All projects</option>
            <option value="official">Official GitHub</option>
            <option value="community">Community</option>
          </select>
        </label>
        <label>
          Featured
          <select id="featured">
            <option value="">All entries</option>
            <option value="top">Top Picks only</option>
          </select>
        </label>
        <label>
          Sort
          <select id="sort">
            <option value="stars">Stars</option>
            <option value="name">Name</option>
            <option value="pushed">Last pushed</option>
          </select>
        </label>
      </div>
      <div class="presets" aria-label="Common starting points">
        <button type="button" data-preset="top">Top Picks</button>
        <button type="button" data-preset="actions">Actions TUI</button>
        <button type="button" data-preset="notifications">Notifications</button>
        <button type="button" data-preset="branches">Branch cleanup</button>
        <button type="button" data-preset="security">Security/Admin</button>
      </div>
      <div class="actions">
        <div class="action-buttons">
          <button type="button" id="copy-visible-installs">Copy shown install commands</button>
          <button type="button" id="copy-link">Copy current view link</button>
          <button type="button" id="reset">Reset filters</button>
        </div>
        <span class="hint" id="copy-feedback" aria-live="polite"></span>
      </div>
      <div class="summary" id="summary"></div>
    </section>

    <section class="packs" aria-label="Starter packs">
      <div class="section-heading">
        <div>
          <h2>Starter Packs</h2>
          <p>Copy a small install sequence for a common GitHub CLI workflow.</p>
        </div>
        <a href="https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/starter-packs.md">Full starter pack guide</a>
      </div>
      <div class="pack-grid">
        ${starterPacks.map(renderPackCard).join("\n        ")}
      </div>
    </section>

    <section class="category-pages" aria-label="Category landing pages">
      <div class="section-heading">
        <div>
          <h2>Category Guides</h2>
          <p>Static entry points for focused GitHub CLI extension workflows.</p>
        </div>
      </div>
      <div class="category-grid">
        ${categories.map((category) => renderCategoryLinkCard(category, items)).join("\n        ")}
      </div>
    </section>

    <section class="table-wrap" aria-live="polite">
      <table>
        <thead>
          <tr>
            <th>Extension</th>
            <th>Category</th>
            <th>Best for</th>
            <th>Status</th>
            <th>Stars</th>
            <th>Install</th>
          </tr>
        </thead>
        <tbody id="rows"></tbody>
      </table>
      <div class="empty" id="empty" hidden>No extensions match these filters.</div>
    </section>
  </main>

  <footer class="wrap">
    Stars, pushed dates, and status labels are reviewed snapshots. Check the upstream repository before adopting an extension in production.
  </footer>

  <script type="application/json" id="catalog-data">${dataJson}</script>
  <script type="application/json" id="top-pick-data">${topPickJson}</script>
  <script>
    const entries = JSON.parse(document.getElementById("catalog-data").textContent);
    const topPickRepos = new Set(JSON.parse(document.getElementById("top-pick-data").textContent));
    const presets = {
      top: { featured: "top", sort: "stars" },
      actions: { category: "Actions/CI", status: "active", search: "workflow", sort: "stars" },
      notifications: { category: "Notifications", status: "active", search: "" },
      branches: { category: "Repo & Branch", status: "active", search: "branch cleanup" },
      docs: { category: "Dashboard/TUI", status: "active", search: "markdown", sort: "stars" },
      search: { category: "Search", status: "active", search: "repository", sort: "stars" },
      security: { category: "Security/Admin", status: "active", search: "" },
    };
    const controls = {
      category: document.getElementById("category"),
      copyFeedback: document.getElementById("copy-feedback"),
      copyLink: document.getElementById("copy-link"),
      copyVisibleInstalls: document.getElementById("copy-visible-installs"),
      empty: document.getElementById("empty"),
      featured: document.getElementById("featured"),
      ownership: document.getElementById("ownership"),
      reset: document.getElementById("reset"),
      rows: document.getElementById("rows"),
      search: document.getElementById("search"),
      sort: document.getElementById("sort"),
      status: document.getElementById("status"),
      summary: document.getElementById("summary"),
    };
    let currentFiltered = [];

    loadStateFromUrl();

    for (const control of [controls.category, controls.featured, controls.ownership, controls.search, controls.sort, controls.status]) {
      control.addEventListener("input", render);
    }

    document.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        applyPreset(button.dataset.preset);
      });
    });

    controls.copyLink.addEventListener("click", async () => {
      updateUrl();
      await copyText(location.href);
      showFeedback("Copied current view link.");
    });

    controls.copyVisibleInstalls.addEventListener("click", async () => {
      const commands = currentFiltered.map((entry) => entry.install).join("\\n");
      await copyText(commands);
      showFeedback(\`Copied \${currentFiltered.length} install command\${currentFiltered.length === 1 ? "" : "s"}.\`);
    });

    controls.reset.addEventListener("click", () => {
      resetFilters();
      render();
    });

    controls.rows.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-install]");
      if (!button) {
        return;
      }

      await copyText(button.dataset.install);
      showFeedback("Copied install command.");
    });

    document.querySelectorAll("[data-pack-install]").forEach((button) => {
      button.addEventListener("click", async () => {
        await copyText(button.dataset.packInstall);
        showFeedback("Copied starter pack commands.");
      });
    });

    render({ replace: true });

    function render(options = {}) {
      const search = controls.search.value.trim().toLowerCase();
      const category = controls.category.value;
      const featured = controls.featured.value;
      const status = controls.status.value;
      const ownership = controls.ownership.value;
      const sort = controls.sort.value;

      const filtered = entries
        .filter((entry) => !category || entry.category === category)
        .filter((entry) => featured !== "top" || isTopPick(entry))
        .filter((entry) => !status || entry.status === status)
        .filter((entry) => ownership !== "official" || entry.official)
        .filter((entry) => ownership !== "community" || !entry.official)
        .filter((entry) => !search || searchableText(entry).includes(search))
        .sort(sortEntries(sort));
      currentFiltered = filtered;
      controls.copyVisibleInstalls.disabled = filtered.length === 0;

      controls.summary.innerHTML = [
        pill(\`\${filtered.length} shown\`),
        pill(\`\${entries.length} total\`),
        pill(\`\${filtered.filter(isTopPick).length} Top Picks\`),
        pill(\`\${countBy(filtered, "active")} active\`),
        pill(\`\${countBy(filtered, "watch")} watch\`),
        pill(\`\${countBy(filtered, "stale")} stale\`),
      ].join("");

      controls.rows.innerHTML = filtered.map(rowHtml).join("");
      controls.empty.hidden = filtered.length > 0;
      updateUrl(options.replace ?? true);
    }

    function searchableText(entry) {
      return [
        entry.repo,
        entry.name,
        entry.category,
        entry.summary,
        entry.best_for,
        entry.avoid_if,
        entry.license,
        entry.status,
        isTopPick(entry) ? "top pick featured" : "",
      ].join(" ").toLowerCase();
    }

    function sortEntries(sort) {
      return (a, b) => {
        if (sort === "name") {
          return a.repo.localeCompare(b.repo);
        }

        if (sort === "pushed") {
          return new Date(b.last_pushed_at) - new Date(a.last_pushed_at) || a.repo.localeCompare(b.repo);
        }

        return b.stars - a.stars || a.repo.localeCompare(b.repo);
      };
    }

    function rowHtml(entry) {
      const topPickBadge = isTopPick(entry) ? '<span class="top-pick">Top Pick</span>' : "";
      return \`<tr>
        <td><a class="repo" href="https://github.com/\${escapeAttribute(entry.repo)}">\${escapeHtml(entry.repo)}</a>\${topPickBadge}<br><span>\${escapeHtml(entry.summary)}</span></td>
        <td>\${escapeHtml(entry.category)}</td>
        <td>\${escapeHtml(entry.best_for)}</td>
        <td><span class="status \${entry.status}">\${entry.status}</span></td>
        <td>\${entry.stars.toLocaleString()}</td>
        <td class="install"><span class="install-wrap"><code>\${escapeHtml(entry.install)}</code><button class="copy-button" type="button" data-install="\${escapeAttribute(entry.install)}">Copy</button></span></td>
      </tr>\`;
    }

    function applyPreset(name) {
      setFilters({
        category: "",
        featured: "",
        ownership: "",
        search: "",
        sort: "stars",
        status: "",
        ...(presets[name] || {}),
      });
      render();
    }

    function resetFilters() {
      setFilters({
        category: "",
        featured: "",
        ownership: "",
        search: "",
        sort: "stars",
        status: "",
      });
    }

    function setFilters(values) {
      controls.category.value = values.category ?? controls.category.value;
      controls.featured.value = values.featured ?? controls.featured.value;
      controls.ownership.value = values.ownership ?? controls.ownership.value;
      controls.search.value = values.search ?? controls.search.value;
      controls.sort.value = values.sort ?? controls.sort.value;
      controls.status.value = values.status ?? controls.status.value;
    }

    function loadStateFromUrl() {
      const params = new URLSearchParams(location.search);
      controls.search.value = params.get("q") || "";
      setSelect(controls.category, params.get("category"));
      setSelect(controls.status, params.get("status"));
      setSelect(controls.ownership, params.get("ownership"));
      setSelect(controls.featured, params.get("featured"));
      setSelect(controls.sort, params.get("sort") || "stars");
    }

    function setSelect(control, value) {
      if (!value) {
        control.value = "";
        return;
      }

      if ([...control.options].some((option) => option.value === value)) {
        control.value = value;
      }
    }

    function updateUrl(replace = true) {
      const params = new URLSearchParams();
      if (controls.search.value.trim()) {
        params.set("q", controls.search.value.trim());
      }
      if (controls.category.value) {
        params.set("category", controls.category.value);
      }
      if (controls.status.value) {
        params.set("status", controls.status.value);
      }
      if (controls.ownership.value) {
        params.set("ownership", controls.ownership.value);
      }
      if (controls.featured.value) {
        params.set("featured", controls.featured.value);
      }
      if (controls.sort.value && controls.sort.value !== "stars") {
        params.set("sort", controls.sort.value);
      }

      const nextUrl = params.toString() ? \`\${location.pathname}?\${params.toString()}\` : location.pathname;
      const method = replace ? "replaceState" : "pushState";
      history[method](null, "", nextUrl);
    }

    async function copyText(text) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    function showFeedback(message) {
      controls.copyFeedback.textContent = message;
      window.clearTimeout(showFeedback.timeout);
      showFeedback.timeout = window.setTimeout(() => {
        controls.copyFeedback.textContent = "";
      }, 2400);
    }

    function isTopPick(entry) {
      return topPickRepos.has(entry.repo);
    }

    function countBy(items, status) {
      return items.filter((entry) => entry.status === status).length;
    }

    function pill(text) {
      return \`<span class="pill">\${escapeHtml(text)}</span>\`;
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    }

    function escapeAttribute(value) {
      return escapeHtml(value).replaceAll("'", "&#39;");
    }
  </script>
</body>
</html>
`;
}

function renderRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}sitemap.xml
`;
}

function renderPackCard(pack) {
  const commands = pack.repos.map((repo) => `gh extension install ${repo}`).join("\n");
  const repos = pack.repos.map((repo) => `<code>${escapeHtml(repo)}</code>`).join(", ");
  const bundlePath = `install/starter-packs/${starterPackSlug(pack)}.txt`;

  return `<article class="pack-card">
          <h3>${escapeHtml(pack.name)}</h3>
          <p>${escapeHtml(pack.summary)}</p>
          <p>${repos}</p>
          <pre><code>${escapeHtml(commands)}</code></pre>
          <div class="actions">
            <button type="button" data-pack-install="${escapeAttribute(commands).replaceAll("\n", "&#10;")}">Copy commands</button>
            <a href="${escapeAttribute(bundlePath)}">TXT bundle</a>
          </div>
        </article>`;
}

function renderCategoryLinkCard(category, items) {
  const categoryItems = items.filter((entry) => entry.category === category);
  const activeCount = categoryItems.filter((entry) => entry.status === "active").length;

  return `<a class="category-card" href="${categoryPagePath(category)}">
          <strong>${escapeHtml(category)}</strong>
          <span>${categoryItems.length} extensions · ${activeCount} active</span>
        </a>`;
}

function renderCategoryPage(category, items) {
  const sortedItems = [...items].sort(categorySort);
  const generatedAt = latestVerifiedAt(sortedItems);
  const description = categoryDescriptions[category] || `Curated GitHub CLI extensions in the ${category} category.`;
  const pagePath = categoryPagePath(category);
  const pageUrl = `${siteUrl}${pagePath}`;
  const catalogUrl = `${siteUrl}?category=${encodeURIComponent(category)}`;
  const slug = categorySlug(category);
  const commands = sortedItems.map((entry) => entry.install).join("\n");
  const guide = workflowGuides[category];
  const guidePath = guide ? `../${guide.path}` : "";
  const guideHeaderLink = guide ? `
        <a href="${escapeAttribute(guidePath)}">Workflow guide</a>` : "";
  const guidePanel = guide
    ? `
    <section class="panel">
      <strong>${escapeHtml(guide.title)}</strong>
      <p>${escapeHtml(guide.summary)}</p>
      <div class="actions">
        <a href="${escapeAttribute(guidePath)}">Read the workflow guide</a>
      </div>
    </section>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(category)} GitHub CLI Extensions | GitHub CLI Extension Atlas</title>
  <meta name="description" content="${escapeAttribute(description)}">
  <meta property="og:title" content="${escapeAttribute(category)} GitHub CLI Extensions">
  <meta property="og:description" content="${escapeAttribute(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttribute(category)} GitHub CLI Extensions">
  <meta name="twitter:description" content="${escapeAttribute(description)}">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${pageUrl}">
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f8fa;
      --panel: #ffffff;
      --text: #1f2328;
      --muted: #656d76;
      --border: #d0d7de;
      --accent: #0969da;
      --accent-soft: #ddf4ff;
      --good: #1a7f37;
      --warn: #9a6700;
      --stale: #8250df;
      --shadow: 0 1px 2px rgba(31, 35, 40, 0.08);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    header {
      background: var(--panel);
      border-bottom: 1px solid var(--border);
    }

    .wrap {
      width: min(1080px, calc(100vw - 32px));
      margin: 0 auto;
    }

    .header-inner {
      display: grid;
      gap: 13px;
      padding: 28px 0 22px;
    }

    h1 {
      margin: 0;
      font-size: clamp(28px, 4vw, 42px);
      line-height: 1.1;
      letter-spacing: 0;
    }

    .lead {
      max-width: 780px;
      margin: 0;
      color: var(--muted);
      font-size: 17px;
    }

    .meta,
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 10px;
      background: var(--panel);
      color: var(--muted);
      font-size: 13px;
      white-space: nowrap;
    }

    main {
      display: grid;
      gap: 14px;
      padding: 20px 0 42px;
    }

    .panel,
    .table-wrap {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .panel {
      display: grid;
      gap: 10px;
      padding: 14px;
    }

    .panel p {
      margin: 0;
      color: var(--muted);
    }

    .table-wrap {
      overflow: auto;
    }

    table {
      width: 100%;
      min-width: 900px;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 11px 12px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #f6f8fa;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    button {
      min-height: 34px;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 7px 10px;
      background: var(--panel);
      color: var(--text);
      cursor: pointer;
      font: inherit;
      font-weight: 600;
    }

    button:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    code {
      font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .repo {
      font-weight: 700;
      white-space: nowrap;
    }

    .status {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .status.active {
      background: #dafbe1;
      color: var(--good);
    }

    .status.watch {
      background: #fff8c5;
      color: var(--warn);
    }

    .status.stale {
      background: #fbefff;
      color: var(--stale);
    }

    .hint {
      color: var(--muted);
      font-size: 13px;
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>${escapeHtml(category)} GitHub CLI Extensions</h1>
      <p class="lead">${escapeHtml(description)}</p>
      <div class="meta">
        <span class="pill">${sortedItems.length} extensions</span>
        <span class="pill">${sortedItems.filter((entry) => entry.status === "active").length} active</span>
        <span class="pill">Reviewed ${escapeHtml(generatedAt)}</span>
      </div>
      <div class="actions">
        <a href="../">Searchable catalog</a>
        <a href="${escapeAttribute(catalogUrl)}">Open this category with filters</a>
        <a href="../api/categories/${escapeAttribute(slug)}.json">Category JSON</a>
        <a href="../install/categories/${escapeAttribute(slug)}.txt">Install commands TXT</a>${guideHeaderLink}
        <a href="https://github.com/sjh9714/gh-extension-atlas#readme">README</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="panel">
      <p>Use this page when you want a focused entry point for the ${escapeHtml(category)} category. The full catalog can filter the same entries by status, ownership, search text, and Top Picks.</p>
      <div class="actions">
        <button type="button" id="copy-category-installs" data-install-all="${escapeAttribute(commands).replaceAll("\n", "&#10;")}">Copy all ${sortedItems.length} install commands</button>
        <span class="hint" id="copy-feedback" aria-live="polite"></span>
      </div>
    </section>${guidePanel}

    <section class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Extension</th>
            <th>Best for</th>
            <th>Status</th>
            <th>Stars</th>
            <th>Install</th>
          </tr>
        </thead>
        <tbody>
          ${sortedItems.map(categoryRowHtml).join("\n          ")}
        </tbody>
      </table>
    </section>
  </main>

  <script>
    const button = document.getElementById("copy-category-installs");
    const feedback = document.getElementById("copy-feedback");

    button.addEventListener("click", async () => {
      await copyText(button.dataset.installAll);
      feedback.textContent = "Copied ${sortedItems.length} install commands.";
      window.clearTimeout(feedback.timeout);
      feedback.timeout = window.setTimeout(() => {
        feedback.textContent = "";
      }, 2400);
    });

    async function copyText(text) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  </script>
</body>
</html>
`;
}

function renderWorkflowGuidePage(category, guide, items) {
  const sortedItems = [...items].sort(categorySort);
  const generatedAt = latestVerifiedAt(sortedItems);
  const pageUrl = `${siteUrl}${guide.path}`;
  const categoryUrl = `${siteUrl}${categoryPagePath(category)}`;
  const catalogUrl = `${siteUrl}?category=${encodeURIComponent(category)}`;
  const categorySlugValue = categorySlug(category);
  let guideRows = actionsGuideRows;
  let starterPackName = "GitHub Actions Operator";
  let guideLead = "Choose a GitHub Actions TUI, local runner, migration helper, workflow health reporter, or runner cost tool without installing every extension first.";
  let startHereCopy = "Use the table as a quick chooser. The goal is not to rank every Actions extension; it is to pick the first useful tool for the specific CI problem in front of you.";
  let firstCards = [
    ["dlvhdr/gh-enhance", "Interactive workflow triage"],
    ["fchimpan/gh-workflow-stats", "Workflow health patterns"],
    ["basecamp/gh-signoff", "Local signoff before CI"],
  ];
  let secondCards = [
    ["nektos/gh-act", "Local Actions runs"],
    ["github/gh-actions-importer", "CI migration projects"],
    ["fchimpan/gh-slimify", "Runner cost review"],
  ];
  let secondSectionTitle = "Local Checks And Operations";
  let secondSectionCopy = "Use local runners for fast feedback, not as a perfect replacement for GitHub-hosted runners. Runner images, permissions, secrets, service containers, and network access can still differ.";
  let freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a tool for production workflows, especially when the extension can change local branches, CI workflows, repository state, or release automation.";

  if (category === "AI/Agents") {
    guideRows = aiAgentGuideRows;
    starterPackName = "AI And Agents";
    guideLead = "Choose a GitHub-native agent workflow, Models helper, standup summarizer, or MCP bridge without installing every AI-adjacent gh extension first.";
    startHereCopy = "Use the table as a quick chooser. The goal is to separate agent workflow execution, model experimentation, activity summarization, and MCP setup.";
    firstCards = [
      ["github/gh-aw", "Agent workflows"],
      ["github/gh-models", "GitHub Models"],
      ["shuymn/gh-mcp", "MCP setup"],
    ];
    secondCards = [
      ["sgoedecke/gh-standup", "AI standup reports"],
    ];
    secondSectionTitle = "AI Workflow Fit";
    secondSectionCopy = "Use agent workflow tools when GitHub is the work surface, Models tools when prompt iteration is the task, and MCP helpers when another AI client needs authenticated GitHub context.";
    freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting an AI or agent extension, especially when the extension can access repository data, call external models, or configure MCP access.";
  } else if (category === "Dashboard/TUI") {
    guideRows = dashboardGuideRows;
    starterPackName = "Daily Maintainer Triage";
    guideLead = "Choose a GitHub terminal dashboard, Markdown preview TUI, or visual contribution tool without installing every interface first.";
    startHereCopy = "Use the table as a quick chooser. The goal is to separate daily operational dashboards from preview, profile, and contribution-visualization tools.";
    firstCards = [
      ["dlvhdr/gh-dash", "Daily maintainer cockpit"],
      ["gizmo385/gh-lazy", "Compact GitHub TUI"],
      ["yusukebe/gh-markdown-preview", "GitHub Markdown preview"],
    ];
    secondCards = [
      ["thiagokokada/gh-gfm-preview", "Offline-friendly Markdown preview"],
      ["github/gh-skyline", "Contribution skyline artifact"],
      ["kawarimidoll/gh-graph", "Terminal contribution graph"],
    ];
    secondSectionTitle = "Interface Fit";
    secondSectionCopy = "Use a dashboard when GitHub work is an operational queue. Use Markdown preview or contribution visualization tools when the output itself is the thing you need to inspect.";
    freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a TUI, especially when the extension opens persistent dashboards, requests broad repository access, or depends on local terminal UI behavior.";
  } else if (category === "Repo & Branch") {
    guideRows = branchCleanupGuideRows;
    starterPackName = "Local Repository Cleanup";
    guideLead = "Choose a safe branch cleanup, branch switching, worktree, or local repository setup helper without risking unmerged work.";
    startHereCopy = "Use the table as a quick chooser. The goal is not to automate deletion blindly; it is to pick the safest first tool for the branch cleanup or repository workflow in front of you.";
    firstCards = [
      ["seachicken/gh-poi", "Safe merged branch cleanup"],
      ["mislav/gh-branch", "Fuzzy branch selection"],
      ["HaywardMorihara/gh-tidy", "Workspace cleanup"],
    ];
    secondCards = [
      ["despreston/gh-worktree", "Parallel branch work"],
      ["davidraviv/gh-clean-branches", "Upstream-aware cleanup"],
      ["redraw/gh-install", "Release binary installs"],
    ];
    secondSectionTitle = "Safety Checks And Workflow Fit";
    secondSectionCopy = "Prefer tools that make deletion explicit, show what will be removed, and help you avoid unmerged or unpushed work. Verify stale tools before trusting them with cleanup.";
  } else if (category === "Notifications") {
    guideRows = notificationGuideRows;
    starterPackName = "Daily Maintainer Triage";
    guideLead = "Choose a terminal notification viewer, rules helper, cleanup tool, or broader maintainer triage dashboard without opening every GitHub inbox first.";
    startHereCopy = "Use the table as a quick chooser. The goal is not to replace every notification setting; it is to pick the first terminal workflow that reduces the noise in front of you.";
    firstCards = [
      ["meiji163/gh-notify", "Notification visibility"],
      ["nobe4/gh-not", "Rule-based notification handling"],
      ["emmanuel-ferdman/gh-gonest", "Phantom notification cleanup"],
    ];
    secondCards = [
      ["dlvhdr/gh-dash", "PR, issue, and notification triage"],
      ["k1LoW/gh-triage", "Unread issue and PR processing"],
      ["agynio/gh-pr-review", "Review thread follow-up"],
    ];
    secondSectionTitle = "Triage Fit";
    secondSectionCopy = "Use a notification-only tool when visibility is enough. Use a broader dashboard when notifications are just one part of a daily PR and issue review queue.";
    freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a notification tool, especially when the extension can mark items read, process unread queues, or request notification-related scopes.";
  } else if (category === "PR & Issues") {
    guideRows = prIssueGuideRows;
    starterPackName = "PR Review And Issue Triage";
    guideLead = "Choose a PR review, stacked PR, dependency PR, metrics, issue search, or milestone helper without trying every maintainer tool first.";
    startHereCopy = "Use the table as a quick chooser. The goal is to separate review-thread work, stacked changes, dependency queues, metrics, and planning tools.";
    firstCards = [
      ["agynio/gh-pr-review", "Inline review threads"],
      ["github/gh-stack", "Stacked pull requests"],
      ["kawarimidoll/gh-prism", "Focused PR review"],
    ];
    secondCards = [
      ["einride/gh-dependabot", "Dependabot PR review"],
      ["jackchuka/gh-dep", "Dependency PR queue TUI"],
      ["hectcastro/gh-metrics", "PR review metrics"],
    ];
    secondSectionTitle = "Maintainer Workflow Fit";
    secondSectionCopy = "Use review tools when comments are the work, stack tools when the change shape is the problem, and metrics or milestone tools when you are planning or improving the process.";
    freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a PR or issue tool, especially when it can comment, resolve threads, update pull requests, or query project data.";
  } else if (category === "Search") {
    guideRows = searchGuideRows;
    starterPackName = "Search And Discovery";
    guideLead = "Choose a repository search, code search, starred-repository, or local clone helper without bouncing between browser tabs.";
    startHereCopy = "Use the table as a quick chooser. The goal is not to replace GitHub search; it is to pick the first terminal workflow for the thing you are trying to find.";
    firstCards = [
      ["gennaro-tedesco/gh-s", "Interactive repository search"],
      ["k1LoW/gh-grep", "API-backed repository grep"],
      ["LangLangBart/gh-find-code", "Interactive code search"],
    ];
    secondCards = [
      ["Link-/gh-stars", "Starred repository search"],
      ["kawarimidoll/gh-q", "Search plus local cloning"],
      ["gennaro-tedesco/gh-f", "Compact fuzzy GitHub workflow"],
    ];
    secondSectionTitle = "Search Fit";
    secondSectionCopy = "Use repository search when you need a project, code search when you need a line, and starred-repository search when you are mining your own saved tools.";
    freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a search extension, especially when it depends on fzf, ghq, GitHub API rate limits, or older search endpoints.";
  } else if (category === "Security/Admin") {
    guideRows = securityAdminGuideRows;
    starterPackName = "Security And Admin";
    guideLead = "Choose an SBOM, CodeQL, token, webhook, repository configuration, or migration helper without mixing security review with general repository tooling.";
    startHereCopy = "Use the table as a quick chooser. The goal is to separate evidence generation, security analysis, authentication, repository administration, and migration workflows.";
    firstCards = [
      ["advanced-security/gh-sbom", "SBOM generation"],
      ["advanced-security/gh-code-scanning", "Code scanning findings"],
      ["Link-/gh-token", "GitHub App tokens"],
    ];
    secondCards = [
      ["github/gh-gei", "Enterprise migrations"],
      ["babarot/gh-infra", "Infrastructure as code"],
      ["cli/gh-webhook", "Webhook workflows"],
    ];
    secondSectionTitle = "Security And Admin Fit";
    secondSectionCopy = "Use security tools when you need evidence or analysis. Use admin tools when the work is repository configuration, GitHub App authentication, webhooks, or migration support.";
    freshnessCopy = "The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a security or admin extension, especially when it can create tokens, inspect private security findings, manage repository settings, or support enterprise migrations.";
  }

  const starterPack = starterPacks.find((pack) => pack.name === starterPackName);
  const starterPackPath = `install/starter-packs/${starterPackSlug(starterPack)}.txt`;
  const starterPackUrl = `${siteUrl}${starterPackPath}`;
  const starterPackCommands = getStarterPackEntries(starterPack, entries)
    .map((entry) => entry.install)
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(guide.title)} | GitHub CLI Extension Atlas</title>
  <meta name="description" content="${escapeAttribute(guide.summary)}">
  <meta property="og:title" content="${escapeAttribute(guide.title)}">
  <meta property="og:description" content="${escapeAttribute(guide.summary)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttribute(guide.title)}">
  <meta name="twitter:description" content="${escapeAttribute(guide.summary)}">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${pageUrl}">
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f8fa;
      --panel: #ffffff;
      --text: #1f2328;
      --muted: #656d76;
      --border: #d0d7de;
      --accent: #0969da;
      --accent-soft: #ddf4ff;
      --good: #1a7f37;
      --warn: #9a6700;
      --stale: #8250df;
      --shadow: 0 1px 2px rgba(31, 35, 40, 0.08);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    header {
      background: var(--panel);
      border-bottom: 1px solid var(--border);
    }

    .wrap {
      width: min(1080px, calc(100vw - 32px));
      margin: 0 auto;
    }

    .header-inner {
      display: grid;
      gap: 13px;
      padding: 30px 0 24px;
    }

    h1 {
      margin: 0;
      font-size: clamp(30px, 4vw, 44px);
      line-height: 1.1;
      letter-spacing: 0;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      line-height: 1.25;
      letter-spacing: 0;
    }

    p {
      margin: 0;
    }

    .lead {
      max-width: 800px;
      color: var(--muted);
      font-size: 17px;
    }

    .meta,
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 10px;
      background: var(--panel);
      color: var(--muted);
      font-size: 13px;
      white-space: nowrap;
    }

    main {
      display: grid;
      gap: 14px;
      padding: 20px 0 42px;
    }

    .panel,
    .table-wrap {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .panel {
      display: grid;
      gap: 11px;
      padding: 16px;
    }

    .panel p,
    .muted {
      color: var(--muted);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .tool-card {
      display: grid;
      gap: 7px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      background: var(--panel);
    }

    .table-wrap {
      overflow: auto;
    }

    table {
      width: 100%;
      min-width: 900px;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 11px 12px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #f6f8fa;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    code {
      font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    pre {
      margin: 0;
      overflow: auto;
      border-radius: 6px;
      padding: 10px;
      background: #f6f8fa;
    }

    .repo {
      font-weight: 700;
      white-space: nowrap;
    }

    .status {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .status.active {
      background: #dafbe1;
      color: var(--good);
    }

    .status.watch {
      background: #fff8c5;
      color: var(--warn);
    }

    .status.stale {
      background: #fbefff;
      color: var(--stale);
    }

    @media (max-width: 760px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>${escapeHtml(guide.title)}</h1>
      <p class="lead">${escapeHtml(guideLead)}</p>
      <div class="meta">
        <span class="pill">${sortedItems.length} ${escapeHtml(category)} extensions</span>
        <span class="pill">${sortedItems.filter((entry) => entry.status === "active").length} active</span>
        <span class="pill">Reviewed ${escapeHtml(generatedAt)}</span>
      </div>
      <div class="actions">
        <a href="../">Searchable catalog</a>
        <a href="../categories/${categorySlugValue}.html">${escapeHtml(category)} category</a>
        <a href="../api/categories/${categorySlugValue}.json">Category JSON</a>
        <a href="../${escapeAttribute(guide.sourcePath)}">Markdown source</a>
        <a href="https://github.com/sjh9714/gh-extension-atlas#readme">README</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="panel">
      <h2>Start Here</h2>
      <p class="muted">${escapeHtml(startHereCopy)}</p>
    </section>

    <section class="panel">
      <h2>Starter Pack</h2>
      <p class="muted">Inspect the workflow-specific install bundle, then install only the extensions that match your workflow. Do not pipe install bundles directly into a shell.</p>
      <pre><code>curl -fsSL ${escapeHtml(starterPackUrl)}</code></pre>
      <pre><code>${escapeHtml(starterPackCommands)}</code></pre>
      <div class="actions">
        <a href="../${escapeAttribute(starterPackPath)}">Starter pack TXT</a>
        <a href="${escapeAttribute(categoryUrl)}">${escapeHtml(category)} page</a>
        <a href="${escapeAttribute(catalogUrl)}">Open filtered catalog</a>
      </div>
    </section>

    <section class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>If you need to...</th>
            <th>Start with</th>
            <th>Why</th>
            <th>Status</th>
            <th>Install</th>
          </tr>
        </thead>
        <tbody>
          ${guideRows.map((row) => workflowGuideRowHtml(row)).join("\n          ")}
        </tbody>
      </table>
    </section>

    <section class="panel">
      <h2>First Picks</h2>
      <div class="grid">
        ${firstCards.map(([repo, label]) => toolCard(repo, label)).join("\n        ")}
      </div>
    </section>

    <section class="panel">
      <h2>${escapeHtml(secondSectionTitle)}</h2>
      <p class="muted">${escapeHtml(secondSectionCopy)}</p>
      <div class="grid">
        ${secondCards.map(([repo, label]) => toolCard(repo, label)).join("\n        ")}
      </div>
    </section>

    <section class="panel">
      <h2>Freshness Notes</h2>
      <p class="muted">${escapeHtml(freshnessCopy)}</p>
    </section>
  </main>
</body>
</html>
`;
}

function renderSitemapXml(items) {
  const lastmod = latestVerifiedAt(items);
  const guideUrls = Object.values(workflowGuides)
    .map((guide) => `  <url>
    <loc>${siteUrl}${guide.path}</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join("\n");
  const categoryUrls = unique(items.map((entry) => entry.category))
    .map((category) => `  <url>
    <loc>${siteUrl}${categoryPagePath(category)}</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${categoryUrls}
${guideUrls}
</urlset>
`;
}

function renderSocialCard(items) {
  const activeCount = items.filter((entry) => entry.status === "active").length;
  const categoryCount = unique(items.map((entry) => entry.category)).length;
  const generatedAt = latestVerifiedAt(items);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">GitHub CLI Extension Atlas</title>
  <desc id="desc">A curated catalog of ${items.length} GitHub CLI extensions.</desc>
  <rect width="1200" height="630" fill="#f6f8fa"/>
  <rect x="64" y="64" width="1072" height="502" rx="28" fill="#ffffff" stroke="#d0d7de" stroke-width="2"/>
  <rect x="64" y="64" width="1072" height="108" rx="28" fill="#0969da"/>
  <path d="M64 144h1072v28H64z" fill="#0969da"/>
  <text x="112" y="132" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="42" font-weight="700">GitHub CLI Extension Atlas</text>
  <text x="112" y="236" fill="#1f2328" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="58" font-weight="800">Choose a useful gh extension faster.</text>
  <text x="112" y="298" fill="#57606a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="30">Curated field guide, comparison docs, starter packs, and a searchable catalog.</text>
  ${socialMetric(112, 374, items.length, "curated extensions")}
  ${socialMetric(386, 374, activeCount, "active")}
  ${socialMetric(620, 374, topPickRepos.length, "Top Picks")}
  ${socialMetric(824, 374, categoryCount, "categories")}
  <rect x="112" y="488" width="456" height="46" rx="23" fill="#ddf4ff"/>
  <text x="140" y="520" fill="#0969da" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="22">sjh9714.github.io/gh-extension-atlas</text>
  <text x="812" y="520" fill="#57606a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="22">Reviewed snapshot: ${escapeHtml(generatedAt)}</text>
</svg>
`;
}

function socialMetric(x, y, value, label) {
  return `<g>
    <text x="${x}" y="${y}" fill="#1f2328" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="48" font-weight="800">${value}</text>
    <text x="${x}" y="${y + 38}" fill="#57606a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="22">${escapeHtml(label)}</text>
  </g>`;
}

function workflowGuideRowHtml(row) {
  const entry = getEntryByRepo(row.repo);
  return `<tr>
            <td>${escapeHtml(row.need)}</td>
            <td><a class="repo" href="https://github.com/${escapeAttribute(entry.repo)}">${escapeHtml(entry.name)}</a><br><span class="muted">${escapeHtml(entry.summary)}</span></td>
            <td>${escapeHtml(row.why)}</td>
            <td><span class="status ${entry.status}">${entry.status}</span></td>
            <td><code>${escapeHtml(entry.install)}</code></td>
          </tr>`;
}

function toolCard(repo, label) {
  const entry = getEntryByRepo(repo);
  return `<article class="tool-card">
          <strong><a href="https://github.com/${escapeAttribute(entry.repo)}">${escapeHtml(entry.name)}</a></strong>
          <span class="muted">${escapeHtml(label)}</span>
          <span>${escapeHtml(entry.best_for)}</span>
          <code>${escapeHtml(entry.install)}</code>
        </article>`;
}

function categoryRowHtml(entry) {
  return `<tr>
            <td><a class="repo" href="https://github.com/${escapeAttribute(entry.repo)}">${escapeHtml(entry.repo)}</a><br><span>${escapeHtml(entry.summary)}</span></td>
            <td>${escapeHtml(entry.best_for)}</td>
            <td><span class="status ${entry.status}">${entry.status}</span></td>
            <td>${entry.stars.toLocaleString()}</td>
            <td><code>${escapeHtml(entry.install)}</code></td>
          </tr>`;
}

function getEntryByRepo(repo) {
  const entry = entries.find((candidate) => candidate.repo === repo);
  if (!entry) {
    throw new Error(`Missing catalog entry for ${repo}`);
  }

  return entry;
}

function categorySort(a, b) {
  const statusRank = { active: 0, watch: 1, stale: 2 };
  return statusRank[a.status] - statusRank[b.status] || b.stars - a.stars || a.repo.localeCompare(b.repo);
}

function stableEntries(items) {
  return [...items].sort((a, b) => a.category.localeCompare(b.category) || categorySort(a, b));
}

function getTopPickEntries(items) {
  const entriesByRepo = new Map(items.map((entry) => [entry.repo, entry]));
  return topPickRepos.map((repo) => entriesByRepo.get(repo)).filter(Boolean);
}

function getStarterPackEntries(pack, items) {
  const entriesByRepo = new Map(items.map((entry) => [entry.repo, entry]));
  return pack.repos.map((repo) => entriesByRepo.get(repo)).filter(Boolean);
}

function renderApiIndex(items) {
  const generatedAt = latestVerifiedAt(items);

  return {
    name: packageJson.name,
    version: packageJson.version,
    generated_at: generatedAt,
    source: "https://github.com/sjh9714/gh-extension-atlas",
    homepage: siteUrl,
    counts: {
      extensions: items.length,
      top_picks: getTopPickEntries(items).length,
      categories: categories.length,
      starter_packs: starterPacks.length,
      active: items.filter((entry) => entry.status === "active").length,
      watch: items.filter((entry) => entry.status === "watch").length,
      stale: items.filter((entry) => entry.status === "stale").length,
    },
    endpoints: {
      catalog: `${siteUrl}api/extensions.json`,
      schema: `${siteUrl}api/extensions.schema.json`,
      top_picks: `${siteUrl}api/top-picks.json`,
      all_install_commands: `${siteUrl}install/all.txt`,
      top_pick_install_commands: `${siteUrl}install/top-picks.txt`,
    },
    categories: categories.map((category) => {
      const categoryItems = items.filter((entry) => entry.category === category);
      const slug = categorySlug(category);
      return {
        name: category,
        slug,
        count: categoryItems.length,
        active: categoryItems.filter((entry) => entry.status === "active").length,
        page: `${siteUrl}${categoryPagePath(category)}`,
        json: `${siteUrl}api/categories/${slug}.json`,
        install_commands: `${siteUrl}install/categories/${slug}.txt`,
      };
    }),
    starter_packs: starterPacks.map((pack) => {
      const slug = starterPackSlug(pack);
      return {
        name: pack.name,
        slug,
        summary: pack.summary,
        repos: pack.repos,
        install_commands: `${siteUrl}install/starter-packs/${slug}.txt`,
      };
    }),
  };
}

function renderJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function renderInstallCommands(items) {
  return `${items.map((entry) => entry.install).join("\n")}\n`;
}

function categoryPagePath(category) {
  return `categories/${categorySlug(category)}.html`;
}

function categorySlug(category) {
  return category
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function starterPackSlug(pack) {
  return categorySlug(pack.name);
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function latestVerifiedAt(items) {
  return items
    .map((entry) => entry.verified_at)
    .filter(Boolean)
    .sort()
    .at(-1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}
