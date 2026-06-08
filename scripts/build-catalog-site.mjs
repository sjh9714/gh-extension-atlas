import fs from "node:fs";
import path from "node:path";

const dataPath = "data/extensions.json";
const schemaPath = "data/extensions.schema.json";
const recommendationsPath = "data/recommendations.json";
const recommendationsSchemaPath = "data/recommendations.schema.json";
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const checkOnly = process.argv.includes("--check");
const siteUrl = "https://sjh9714.github.io/gh-extension-atlas/";
const repoUrl = "https://github.com/sjh9714/gh-extension-atlas";
const repoReadmeUrl = `${repoUrl}#readme`;
const repoIssueChooserUrl = `${repoUrl}/issues/new/choose`;
const socialImageUrl = `${siteUrl}social-card.png`;
const socialImagePath = "docs/social-card.png";
const expectedSocialImageSize = { width: 1200, height: 630 };
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
const recommendations = JSON.parse(fs.readFileSync(recommendationsPath, "utf8"));
const recommendationsSchema = JSON.parse(fs.readFileSync(recommendationsSchemaPath, "utf8"));
const categories = unique(entries.map((entry) => entry.category));
const categoryPageFiles = categories.map((category) => ({
  path: `docs/${categoryPagePath(category)}`,
  content: renderCategoryPage(category, entries.filter((entry) => entry.category === category)),
}));
const guidePageFiles = Object.entries(workflowGuides).map(([category, guide]) => ({
  path: `docs/${guide.path}`,
  content: renderWorkflowGuidePage(category, guide, entries.filter((entry) => entry.category === category)),
}));
const extensionPageFiles = stableEntries(entries).map((entry) => ({
  path: `docs/${extensionPagePath(entry)}`,
  content: renderExtensionPage(entry),
}));
const endpointFiles = [
  { path: "docs/api/index.json", content: renderJson(renderApiIndex(entries)) },
  { path: "docs/api/health.json", content: renderJson(renderHealthSnapshot(entries)) },
  { path: "docs/api/extensions.json", content: renderJson(stableEntries(entries)) },
  { path: "docs/api/extensions.schema.json", content: renderJson(schema) },
  { path: "docs/api/top-picks.json", content: renderJson(getTopPickEntries(entries)) },
  { path: "docs/api/search-index.json", content: renderJson(renderSearchIndex(entries)) },
  { path: "docs/api/recommendations.json", content: renderJson(renderRecommendations(entries)) },
  { path: "docs/api/recommendations.schema.json", content: renderJson(recommendationsSchema) },
  { path: "docs/api/starter-packs.json", content: renderJson(renderStarterPackIndex(entries)) },
  { path: "docs/cheatsheet.md", content: renderCheatsheetMarkdown(entries) },
  { path: "docs/recommendations.md", content: renderRecommendationsMarkdown(entries) },
  { path: "docs/health.md", content: renderHealthMarkdown(entries) },
  { path: "docs/llms.txt", content: renderLlmsTxt(entries) },
  { path: "docs/llms-full.txt", content: renderLlmsFullTxt(entries) },
  { path: "docs/install/all.txt", content: renderInstallCommands(stableEntries(entries)) },
  { path: "docs/install/top-picks.txt", content: renderInstallCommands(getTopPickEntries(entries)) },
  ...starterPacks.map((pack) => ({
    path: `docs/install/starter-packs/${starterPackSlug(pack)}.txt`,
    content: renderInstallCommands(getStarterPackEntries(pack, entries)),
  })),
  ...starterPacks.map((pack) => ({
    path: `docs/api/starter-packs/${starterPackSlug(pack)}.json`,
    content: renderJson(renderStarterPack(pack, entries)),
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
  { path: "docs/chooser.html", content: renderChooserPage(entries) },
  { path: "docs/recommendations.html", content: renderRecommendationsPage(entries) },
  { path: "docs/awesome-github-cli-extensions.html", content: renderAwesomeLandingPage(entries) },
  { path: "docs/awesome-github-cli-extensions.md", content: renderAwesomeMarkdown(entries) },
  { path: "docs/robots.txt", content: renderRobotsTxt() },
  { path: "docs/sitemap.xml", content: renderSitemapXml(entries) },
  { path: "docs/social-card.svg", content: renderSocialCard(entries) },
  ...categoryPageFiles,
  ...guidePageFiles,
  ...extensionPageFiles,
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

  for (const error of validateSocialPreviewAssets()) {
    console.error(error);
    hasStaleFile = true;
  }

  for (const error of validateStructuredDataFiles(generatedFiles)) {
    console.error(error);
    hasStaleFile = true;
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

function validateSocialPreviewAssets() {
  const errors = [];

  if (!fs.existsSync(socialImagePath)) {
    errors.push(`${socialImagePath} is missing. Social preview meta tags point to ${socialImageUrl}.`);
    return errors;
  }

  const size = readPngSize(socialImagePath);

  if (!size) {
    errors.push(`${socialImagePath} must be a PNG image.`);
  } else if (size.width !== expectedSocialImageSize.width || size.height !== expectedSocialImageSize.height) {
    errors.push(
      `${socialImagePath} must be ${expectedSocialImageSize.width}x${expectedSocialImageSize.height}; found ${size.width}x${size.height}.`,
    );
  }

  return errors;
}

function validateStructuredDataFiles(files) {
  const errors = [];

  for (const file of files.filter((candidate) => candidate.path.endsWith(".html"))) {
    const scripts = [...file.content.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];

    if (requiresStructuredData(file.path) && scripts.length === 0) {
      errors.push(`${file.path} must include schema.org JSON-LD structured data.`);
      continue;
    }

    for (const [index, script] of scripts.entries()) {
      try {
        const parsed = JSON.parse(script[1]);
        const items = Array.isArray(parsed) ? parsed : [parsed];

        if (items.length === 0) {
          errors.push(`${file.path} JSON-LD script #${index + 1} must not be an empty array.`);
          continue;
        }

        for (const [itemIndex, item] of items.entries()) {
          if (!item || typeof item !== "object" || Array.isArray(item)) {
            errors.push(`${file.path} JSON-LD script #${index + 1} item #${itemIndex + 1} must be an object.`);
          } else if (!item["@type"]) {
            errors.push(`${file.path} JSON-LD script #${index + 1} item #${itemIndex + 1} is missing @type.`);
          }
        }
      } catch (error) {
        errors.push(`${file.path} JSON-LD script #${index + 1} is invalid JSON: ${error.message}`);
      }
    }
  }

  return errors;
}

function requiresStructuredData(filePath) {
  return [
    "docs/index.html",
    "docs/chooser.html",
    "docs/recommendations.html",
    "docs/awesome-github-cli-extensions.html",
  ].includes(filePath) || filePath.startsWith("docs/extensions/");
}

function readPngSize(filePath) {
  const pngSignature = "89504e470d0a1a0a";
  const buffer = fs.readFileSync(filePath);

  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function renderJsonLd(data) {
  return `<script type="application/ld+json">
${JSON.stringify(data, null, 2).replaceAll("<", "\\u003c")}
  </script>`;
}

function atlasDatasetJsonLd(items) {
  return {
    "@type": "Dataset",
    name: "GitHub CLI Extension Atlas",
    description:
      "A curated catalog of GitHub CLI extensions with install commands, categories, maintenance labels, and workflow recommendations.",
    url: siteUrl,
    license: `${repoUrl}/blob/main/LICENSE`,
    isAccessibleForFree: true,
    dateModified: latestVerifiedAt(items),
    keywords: [
      "GitHub CLI",
      "gh extension",
      "GitHub CLI extensions",
      "awesome list",
      "developer tools",
      "terminal",
      "open source",
    ],
    creator: {
      "@type": "Person",
      name: "JinHyuk Sung",
      url: "https://github.com/sjh9714",
    },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${siteUrl}api/extensions.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/schema+json",
        contentUrl: `${siteUrl}api/schema.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/plain",
        contentUrl: `${siteUrl}install/all.txt`,
      },
    ],
    variableMeasured: [
      "install command",
      "category",
      "best use case",
      "avoid-if note",
      "license",
      "maintenance status",
      "last pushed date",
      "verified date",
    ],
  };
}

function catalogPageJsonLd(items) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "GitHub CLI Extension Atlas",
      description: `Search and filter ${items.length} curated GitHub CLI extensions by workflow, maintenance status, ownership, and install command.`,
      url: siteUrl,
      image: socialImageUrl,
      mainEntity: {
        "@id": `${siteUrl}#dataset`,
      },
    },
    {
      "@context": "https://schema.org",
      "@id": `${siteUrl}#dataset`,
      ...atlasDatasetJsonLd(items),
    },
  ];
}

function awesomePageJsonLd(items, topPicks, pageUrl) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Awesome GitHub CLI Extensions",
      description:
        "A curated awesome-style guide to useful GitHub CLI extensions, Top Picks, workflow guides, starter packs, and maintained install commands.",
      url: pageUrl,
      image: socialImageUrl,
      mainEntity: {
        "@type": "ItemList",
        name: "Top GitHub CLI extension picks",
        numberOfItems: topPicks.length,
        itemListElement: topPicks.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.name,
          description: entry.summary,
          url: `${siteUrl}extensions/${entry.repo.replace("/", "--")}.html`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@id": `${siteUrl}#dataset`,
      ...atlasDatasetJsonLd(items),
    },
  ];
}

function recommendationsPageJsonLd(items, pageUrl) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "GitHub CLI Extension Workflow Recommendations",
      description:
        "Workflow-first GitHub CLI extension recommendations with install commands, avoid-if notes, status labels, and detail links.",
      url: pageUrl,
      image: socialImageUrl,
      mainEntity: {
        "@type": "ItemList",
        name: "GitHub CLI extension workflow recommendations",
        numberOfItems: recommendations.length,
        itemListElement: recommendations.map((recommendation, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: recommendation.label,
          description: recommendation.summary,
          url: `${pageUrl}#${recommendation.id}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@id": `${siteUrl}#dataset`,
      ...atlasDatasetJsonLd(items),
    },
  ];
}

function chooserPageJsonLd(items, choices, pageUrl) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "GitHub CLI Extension Chooser",
      description:
        "A workflow-first chooser for finding the right GitHub CLI extension faster.",
      url: pageUrl,
      image: socialImageUrl,
      mainEntity: {
        "@type": "ItemList",
        name: "GitHub CLI extension workflow starting points",
        numberOfItems: choices.length,
        itemListElement: choices.map((choice, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: choice.title,
          description: choice.question,
          url: `${pageUrl}#${categorySlug(choice.title)}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@id": `${siteUrl}#dataset`,
      ...atlasDatasetJsonLd(items),
    },
  ];
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
  ${renderJsonLd(catalogPageJsonLd(items))}
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
      font-size: 40px;
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
        <span class="pill"><a href="faq.md">FAQ</a></span>
        <span class="pill"><a href="cheatsheet.md">Cheatsheet</a></span>
        <span class="pill"><a href="recommendations.html">Recommendations</a></span>
        <span class="pill"><a href="agent-guide.md">Agent guide</a></span>
        <span class="pill">Install bundle: <a href="install/all.txt">all.txt</a></span>
        <span class="pill"><a href="chooser.html">Chooser</a></span>
        <span class="pill"><a href="awesome-github-cli-extensions.html">Awesome overview</a></span>
        <span class="pill"><a href="https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/starter-packs.md">Starter Packs</a></span>
        <span class="pill"><a href="${repoReadmeUrl}">README</a></span>
        <span class="pill"><a href="${repoUrl}">Star on GitHub</a></span>
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
        <td><a class="repo" href="\${extensionDetailHref(entry)}">\${escapeHtml(entry.repo)}</a>\${topPickBadge}<br><span>\${escapeHtml(entry.summary)}</span></td>
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

    function extensionDetailHref(entry) {
      return \`extensions/\${slugify(entry.repo)}.html\`;
    }

    function slugify(value) {
      return String(value)
        .toLowerCase()
        .replace(/&/g, " ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
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
      font-size: 40px;
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
        <a href="${repoReadmeUrl}">README</a>
        <a href="${repoUrl}">Star on GitHub</a>
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
      font-size: 40px;
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
        <a href="${repoReadmeUrl}">README</a>
        <a href="${repoUrl}">Star on GitHub</a>
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

function renderAwesomeLandingPage(items) {
  const sortedItems = stableEntries(items);
  const topPicks = getTopPickEntries(items);
  const activeCount = items.filter((entry) => entry.status === "active").length;
  const generatedAt = latestVerifiedAt(items);
  const pageUrl = `${siteUrl}awesome-github-cli-extensions.html`;
  const workflowGuideCards = Object.entries(workflowGuides).map(([category, guide]) => {
    const categoryItems = items.filter((entry) => entry.category === category);
    return {
      category,
      guide,
      count: categoryItems.length,
      active: categoryItems.filter((entry) => entry.status === "active").length,
    };
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Awesome GitHub CLI Extensions | GitHub CLI Extension Atlas</title>
  <meta name="description" content="A curated awesome-style guide to GitHub CLI extensions, Top Picks, workflow guides, starter packs, and maintained install commands.">
  <meta property="og:title" content="Awesome GitHub CLI Extensions">
  <meta property="og:description" content="Choose useful GitHub CLI extensions faster with Top Picks, workflow guides, starter packs, and a reviewed catalog.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Awesome GitHub CLI Extensions">
  <meta name="twitter:description" content="Top Picks, workflow guides, starter packs, and a reviewed catalog for GitHub CLI extensions.">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${pageUrl}">
  ${renderJsonLd(awesomePageJsonLd(items, topPicks, pageUrl))}
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
      width: min(1120px, calc(100vw - 32px));
      margin: 0 auto;
    }

    .header-inner {
      display: grid;
      gap: 14px;
      padding: 30px 0 24px;
    }

    h1 {
      margin: 0;
      font-size: 42px;
      line-height: 1.08;
      letter-spacing: 0;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      line-height: 1.25;
      letter-spacing: 0;
    }

    h3,
    p {
      margin: 0;
    }

    .lead {
      max-width: 820px;
      color: var(--muted);
      font-size: 18px;
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
      gap: 12px;
      padding: 16px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }

    .card {
      display: grid;
      gap: 8px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      background: var(--panel);
      color: var(--text);
      text-decoration: none;
    }

    .card:hover {
      border-color: var(--accent);
      text-decoration: none;
    }

    .card span,
    .muted {
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

    @media (max-width: 860px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 560px) {
      .wrap {
        width: min(100vw - 20px, 1120px);
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>Awesome GitHub CLI Extensions</h1>
      <p class="lead">A curated awesome-style guide to useful GitHub CLI extensions: Top Picks, workflow guides, starter packs, maintenance labels, and machine-readable install bundles.</p>
      <div class="meta">
        <span class="pill">${items.length} curated extensions</span>
        <span class="pill">${activeCount} active</span>
        <span class="pill">${topPicks.length} Top Picks</span>
        <span class="pill">${starterPacks.length} starter packs</span>
        <span class="pill">Reviewed ${escapeHtml(generatedAt)}</span>
      </div>
      <div class="actions">
        <a href="chooser.html">Open the chooser</a>
        <a href="./">Searchable catalog</a>
        <a href="cheatsheet.md">Cheatsheet</a>
        <a href="agent-guide.md">Agent guide</a>
        <a href="${repoReadmeUrl}">README</a>
        <a href="${repoUrl}">Star on GitHub</a>
        <a href="${repoIssueChooserUrl}">Suggest a correction</a>
        <a href="faq.md">FAQ</a>
        <a href="api/index.json">API manifest</a>
        <a href="install/all.txt">All install commands</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="panel">
      <h2>Start Here</h2>
      <p class="muted">Pick the workflow that hurts right now. Each guide includes a starter pack near the top so you can inspect commands before installing anything.</p>
      <div class="grid">
        ${workflowGuideCards.map(({ category, guide, count, active }) => `<a class="card" href="${escapeAttribute(guide.path)}">
          <strong>${escapeHtml(guide.title)}</strong>
          <span>${escapeHtml(guide.summary)}</span>
          <code>${count} entries, ${active} active</code>
        </a>`).join("\n        ")}
      </div>
    </section>

    <section class="panel">
      <h2>Starter Packs</h2>
      <p class="muted">Small install-command bundles for common GitHub CLI workflows. Review bundle contents before installing.</p>
      <div class="grid">
        ${starterPacks.map((pack) => `<a class="card" href="install/starter-packs/${starterPackSlug(pack)}.txt">
          <strong>${escapeHtml(pack.name)}</strong>
          <span>${escapeHtml(pack.summary)}</span>
          <code>curl -fsSL ${escapeHtml(siteUrl)}install/starter-packs/${starterPackSlug(pack)}.txt</code>
        </a>`).join("\n        ")}
      </div>
    </section>

    <section class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Top Pick</th>
            <th>Workflow</th>
            <th>Why it matters</th>
            <th>Status</th>
            <th>Install</th>
          </tr>
        </thead>
        <tbody>
          ${topPicks.map((entry) => `<tr>
            <td><a href="${escapeAttribute(extensionPagePath(entry))}"><strong>${escapeHtml(entry.name)}</strong></a><br><span class="muted">${escapeHtml(entry.summary)}</span></td>
            <td>${escapeHtml(entry.best_for)}</td>
            <td>${escapeHtml(entry.avoid_if)}</td>
            <td>${escapeHtml(entry.status)}</td>
            <td><code>${escapeHtml(entry.install)}</code></td>
          </tr>`).join("\n          ")}
        </tbody>
      </table>
    </section>

    <section class="panel">
      <h2>Reusable Data</h2>
      <p class="muted">The atlas publishes the same reviewed snapshot as JSON and plain-text install bundles.</p>
      <div class="actions">
        <a href="api/extensions.json">Full catalog JSON</a>
        <a href="api/extensions.schema.json">JSON schema</a>
        <a href="install/top-picks.txt">Top Picks install bundle</a>
        <a href="api-reference.md">API reference</a>
      </div>
    </section>
  </main>
</body>
</html>
`;
}

function renderAwesomeMarkdown(items) {
  const generatedAt = latestVerifiedAt(items);
  const activeCount = items.filter((entry) => entry.status === "active").length;
  const watchCount = items.filter((entry) => entry.status === "watch").length;
  const staleCount = items.filter((entry) => entry.status === "stale").length;
  const topPicks = getTopPickEntries(items);
  const quickRows = [
    ["Daily PR, issue, and notification triage", "dlvhdr/gh-dash", "One maintained TUI covers the daily GitHub queue."],
    ["Interactive GitHub Actions inspection", "dlvhdr/gh-enhance", "A focused terminal interface for GitHub Actions workflows."],
    ["Workflow health debugging", "fchimpan/gh-workflow-stats", "Summarizes success rate and duration for workflows and jobs."],
    ["Safe branch cleanup", "seachicken/gh-poi", "Removes merged branches without making you inspect every ref manually."],
    ["Markdown preview before publishing", "yusukebe/gh-markdown-preview", "Shows GitHub-flavored Markdown before you push."],
    ["Repository search", "gennaro-tedesco/gh-s", "Adds a compact interactive repository search flow."],
  ];

  return `# Awesome GitHub CLI Extensions

A curated field guide to useful GitHub CLI extensions: what to install, when to use them, and which ones are maintained.

- Repository: ${repoUrl}
- Searchable catalog: ${siteUrl}
- Workflow chooser: ${siteUrl}chooser.html
- Cheatsheet: ${siteUrl}cheatsheet.md
- Agent guide: ${siteUrl}agent-guide.md
- Reviewed snapshot: ${generatedAt}
- Catalog size: ${items.length} extensions
- Status counts: ${activeCount} active, ${watchCount} watch, ${staleCount} stale

## Start Here

Use this page when \`gh extension search\` gives too many overlapping options. Pick the workflow that hurts right now, inspect the linked detail pages, and install only the extensions that match your project.

| Workflow | First stop | Why |
| --- | --- | --- |
${quickRows
  .map(([workflow, repo, why]) => {
    const entry = getEntryByRepo(repo);
    return `| ${workflow} | [\`${entry.name}\`](${siteUrl}${extensionPagePath(entry)}) | ${why} |`;
  })
  .join("\n")}

## Top Picks

| Extension | Best for | Install | Status |
| --- | --- | --- | --- |
${topPicks
  .map((entry) => `| [\`${entry.name}\`](${siteUrl}${extensionPagePath(entry)}) | ${entry.best_for} | \`${entry.install}\` | ${entry.status} |`)
  .join("\n")}

## Workflow Guides

| Guide | Use this when... |
| --- | --- |
${Object.values(workflowGuides)
  .map((guide) => `| [${guide.title}](${siteUrl}${guide.path}) | ${guide.summary} |`)
  .join("\n")}

## Starter Packs

Review bundle contents before installing. Do not pipe remote install bundles directly into a shell.

| Starter pack | Install bundle | Repos |
| --- | --- | --- |
${starterPacks
  .map((pack) => {
    const slug = starterPackSlug(pack);
    return `| ${pack.name} | [${slug}.txt](${siteUrl}install/starter-packs/${slug}.txt) | ${pack.repos.map((repo) => `\`${repo}\``).join(", ")} |`;
  })
  .join("\n")}

## Public Data

- API manifest: ${siteUrl}api/index.json
- Full catalog JSON: ${siteUrl}api/extensions.json
- Top Picks JSON: ${siteUrl}api/top-picks.json
- Starter packs JSON: ${siteUrl}api/starter-packs.json
- All install commands: ${siteUrl}install/all.txt
- Top Picks install commands: ${siteUrl}install/top-picks.txt
- LLM context: ${siteUrl}llms.txt

## Guardrails

- This is an independent curated resource, not an official GitHub project.
- The atlas is intentionally curated, not a complete directory of every repository with the \`gh-extension\` topic.
- Star counts and maintenance labels are reviewed snapshots, not live rankings.
- Recheck upstream repositories before adopting extensions for security, CI, release, compliance, or production workflows.
- Corrections are welcome: ${repoIssueChooserUrl}
`;
}

function renderRecommendationsMarkdown(items) {
  const generatedAt = latestVerifiedAt(items);

  return `# GitHub CLI Extension Workflow Recommendations

Use this page when you know the workflow, but you do not want to compare the full catalog by hand.

- Repository: ${repoUrl}
- Searchable catalog: ${siteUrl}
- Workflow chooser: ${siteUrl}chooser.html
- Recommendations API: ${siteUrl}api/recommendations.json
- Recommendations schema: ${siteUrl}api/recommendations.schema.json
- Reviewed snapshot: ${generatedAt}

These are small starting sets, not endorsements or complete rankings. Review upstream READMEs before adopting extensions for security, CI, release, compliance, or production workflows.

${recommendations
  .map((recommendation) => renderRecommendationMarkdownSection(recommendation, items))
  .join("\n\n")}

## Local Usage

\`\`\`sh
npm --silent run catalog:recommend -- --list
npm --silent run catalog:recommend -- --workflow actions
npm --silent run catalog:recommend -- --workflow notifications --format install
\`\`\`

## Public API Usage

\`\`\`sh
curl -fsSL ${siteUrl}api/recommendations.json \\
  | jq -r '.[] | select(.id == "actions") | .entries[].install'
\`\`\`

## Guardrails

- Install only the extensions that match your workflow.
- Do not pipe remote install bundles directly into a shell.
- Treat star counts and maintenance status as reviewed snapshots, not live guarantees.
- Open a correction if a summary, category, install command, or maintenance label is wrong: ${repoIssueChooserUrl}
`;
}

function renderRecommendationsPage(items) {
  const generatedAt = latestVerifiedAt(items);
  const pageUrl = `${siteUrl}recommendations.html`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Workflow Recommendations - GitHub CLI Extension Atlas</title>
  <meta name="description" content="Workflow-first GitHub CLI extension recommendations with install commands, avoid-if notes, status labels, and detail links.">
  <meta property="og:title" content="GitHub CLI Extension Workflow Recommendations">
  <meta property="og:description" content="Choose a small starting set of GitHub CLI extensions by workflow.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="GitHub CLI Extension Workflow Recommendations">
  <meta name="twitter:description" content="Choose a small starting set of GitHub CLI extensions by workflow.">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${pageUrl}">
  ${renderJsonLd(recommendationsPageJsonLd(items, pageUrl))}
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
      gap: 12px;
      padding: 28px 0 22px;
    }

    h1 {
      margin: 0;
      font-size: 40px;
      line-height: 1.1;
      letter-spacing: 0;
    }

    .lead {
      max-width: 800px;
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
      gap: 16px;
      padding: 20px 0 42px;
    }

    .workflow {
      display: grid;
      gap: 12px;
      padding: 16px 0 4px;
      border-top: 1px solid var(--border);
    }

    .workflow-head {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 12px;
      align-items: baseline;
      justify-content: space-between;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      line-height: 1.25;
      letter-spacing: 0;
    }

    .aliases {
      color: var(--muted);
      font-size: 13px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .card {
      display: grid;
      gap: 9px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      background: var(--panel);
    }

    .card-top {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
    }

    .rank {
      color: var(--muted);
      font-size: 13px;
      font-weight: 700;
    }

    .repo {
      color: var(--accent);
      font-weight: 700;
      overflow-wrap: anywhere;
    }

    .status {
      display: inline-flex;
      min-height: 24px;
      border-radius: 999px;
      padding: 2px 8px;
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

    p {
      margin: 0;
    }

    .muted {
      color: var(--muted);
    }

    code {
      font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow-wrap: anywhere;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .install {
      border-radius: 6px;
      padding: 8px;
      background: #f6f8fa;
    }

    @media (max-width: 900px) {
      .cards {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 620px) {
      .wrap {
        width: min(100vw - 20px, 1180px);
      }

      h1 {
        font-size: 32px;
      }

      .cards {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>Workflow Recommendations</h1>
      <p class="lead">Pick a workflow and compare a small reviewed starting set before installing anything.</p>
      <div class="meta">
        <span class="pill">Generated ${escapeHtml(generatedAt)}</span>
        <span class="pill">${recommendations.length} workflows</span>
        <span class="pill"><a href="recommendations.md">Markdown version</a></span>
        <span class="pill"><a href="api/recommendations.json">JSON API</a></span>
        <span class="pill"><a href="chooser.html">Chooser</a></span>
        <span class="pill"><a href="./">Catalog</a></span>
        <span class="pill"><a href="${repoReadmeUrl}">README</a></span>
      </div>
    </div>
  </header>
  <main class="wrap">
    ${recommendations.map((recommendation) => renderRecommendationHtmlSection(recommendation, items)).join("\n    ")}
  </main>
</body>
</html>
`;
}

function renderRecommendationHtmlSection(recommendation, items) {
  const recommendationEntries = getRecommendationEntries(recommendation, items);

  return `<section class="workflow" id="${escapeAttribute(recommendation.id)}">
      <div class="workflow-head">
        <h2>${escapeHtml(recommendation.label)}</h2>
        <div class="aliases">Aliases: ${recommendation.aliases.map((alias) => `<code>${escapeHtml(alias)}</code>`).join(", ")}</div>
      </div>
      <div class="cards">
        ${recommendationEntries.map((entry, index) => renderRecommendationCard(entry, index)).join("\n        ")}
      </div>
    </section>`;
}

function renderRecommendationCard(entry, index) {
  return `<article class="card">
          <div class="card-top">
            <span class="rank">#${index + 1}</span>
            <span class="status ${escapeAttribute(entry.status)}">${escapeHtml(entry.status)}</span>
          </div>
          <a class="repo" href="${escapeAttribute(extensionPagePath(entry))}">${escapeHtml(entry.repo)}</a>
          <p>${escapeHtml(entry.best_for)}</p>
          <p class="muted">Avoid if: ${escapeHtml(entry.avoid_if)}</p>
          <div class="install"><code>${escapeHtml(entry.install)}</code></div>
        </article>`;
}

function renderRecommendationMarkdownSection(recommendation, items) {
  const recommendationEntries = getRecommendationEntries(recommendation, items);

  return `## ${recommendation.label}

Aliases: ${recommendation.aliases.map((alias) => `\`${alias}\``).join(", ")}

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
${recommendationEntries
  .map(
    (entry, index) =>
      `| ${index + 1} | \`${entry.repo}\` | ${entry.best_for} | ${entry.avoid_if} | ${entry.status} | \`${entry.install}\` | [detail](${siteUrl}${extensionPagePath(entry)}) |`,
  )
  .join("\n")}`;
}

function renderChooserPage(items) {
  const generatedAt = latestVerifiedAt(items);
  const pageUrl = `${siteUrl}chooser.html`;
  const choices = [
    {
      title: "Daily maintainer triage",
      question: "I need to keep up with PRs, issues, review threads, and notifications.",
      category: "Dashboard/TUI",
      starterPack: "Daily Maintainer Triage",
      repos: ["dlvhdr/gh-dash", "agynio/gh-pr-review", "meiji163/gh-notify"],
      note: "Start with a dashboard when the work is a queue. Add focused review or notification tools only if the dashboard is not enough.",
    },
    {
      title: "GitHub Actions operations",
      question: "I need to inspect workflows, understand CI health, or migrate pipelines.",
      category: "Actions/CI",
      starterPack: "GitHub Actions Operator",
      repos: ["dlvhdr/gh-enhance", "fchimpan/gh-workflow-stats", "github/gh-actions-importer"],
      note: "Use a TUI for daily workflow inspection, stats for operational debugging, and importer tooling for migration projects.",
    },
    {
      title: "Local repository cleanup",
      question: "I need safer branch cleanup, branch switching, or local setup help.",
      category: "Repo & Branch",
      starterPack: "Local Repository Cleanup",
      repos: ["seachicken/gh-poi", "mislav/gh-branch", "HaywardMorihara/gh-tidy"],
      note: "Prefer tools that make deletion explicit and keep unmerged or unpushed work visible.",
    },
    {
      title: "Documentation review",
      question: "I need to preview README or GitHub-flavored Markdown before publishing.",
      category: "Dashboard/TUI",
      starterPack: "Documentation Review",
      repos: ["yusukebe/gh-markdown-preview", "thiagokokada/gh-gfm-preview"],
      note: "Choose Markdown preview tools when the rendered document is the thing you need to inspect.",
    },
    {
      title: "Search and discovery",
      question: "I need to find repositories, code, stars, or saved tools from the terminal.",
      category: "Search",
      starterPack: "Search And Discovery",
      repos: ["gennaro-tedesco/gh-s", "k1LoW/gh-grep", "LangLangBart/gh-find-code"],
      note: "Use repository search when you need a project, code search when you need a line, and starred-repository tools when mining saved references.",
    },
    {
      title: "Security and admin",
      question: "I need SBOMs, CodeQL, tokens, webhooks, repository config, or migration support.",
      category: "Security/Admin",
      starterPack: "Security And Admin",
      repos: ["advanced-security/gh-sbom", "Link-/gh-token", "github/gh-gei"],
      note: "Treat security and admin extensions as operational tools: inspect scopes, output, and repository impact before adopting them.",
    },
    {
      title: "AI and agents",
      question: "I need GitHub-native agent workflows, Models, standup summaries, or MCP setup.",
      category: "AI/Agents",
      starterPack: "AI And Agents",
      repos: ["github/gh-aw", "github/gh-models", "shuymn/gh-mcp"],
      note: "Use agent workflow tools when GitHub is the work surface, Models tools for prompt iteration, and MCP helpers for authenticated AI clients.",
    },
    {
      title: "Reusable catalog data",
      question: "I want JSON, schema, install bundles, or automation-friendly catalog data.",
      category: "",
      starterPack: "",
      repos: ["dlvhdr/gh-dash", "gennaro-tedesco/gh-s", "advanced-security/gh-sbom"],
      note: "Use the API manifest and schema when the atlas is input to another tool, report, or documentation workflow.",
      dataOnly: true,
    },
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GitHub CLI Extension Chooser | GitHub CLI Extension Atlas</title>
  <meta name="description" content="Choose a GitHub CLI extension by workflow: maintainer triage, Actions, branch cleanup, docs preview, search, security, AI, or reusable catalog data.">
  <meta property="og:title" content="GitHub CLI Extension Chooser">
  <meta property="og:description" content="A workflow-first chooser for finding the right GitHub CLI extension faster.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="GitHub CLI Extension Chooser">
  <meta name="twitter:description" content="Pick a GitHub CLI extension by workflow, then inspect commands before installing.">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${pageUrl}">
  ${renderJsonLd(chooserPageJsonLd(items, choices, pageUrl))}
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
      width: min(1120px, calc(100vw - 32px));
      margin: 0 auto;
    }

    .header-inner {
      display: grid;
      gap: 14px;
      padding: 30px 0 24px;
    }

    h1 {
      margin: 0;
      font-size: 40px;
      line-height: 1.08;
      letter-spacing: 0;
    }

    h2,
    h3,
    p {
      margin: 0;
    }

    h2 {
      font-size: 20px;
      line-height: 1.25;
      letter-spacing: 0;
    }

    .lead {
      max-width: 820px;
      color: var(--muted);
      font-size: 18px;
    }

    .meta,
    .actions,
    .tool-list {
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
    .choice {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .panel {
      display: grid;
      gap: 12px;
      padding: 16px;
    }

    .choice-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .choice {
      display: grid;
      gap: 11px;
      padding: 15px;
    }

    .muted,
    .choice p,
    .choice span {
      color: var(--muted);
    }

    .tool {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 10px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      white-space: nowrap;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover,
    .tool:hover {
      text-decoration: underline;
    }

    code {
      font: 13px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow-wrap: anywhere;
    }

    pre {
      margin: 0;
      overflow: auto;
      border-radius: 6px;
      padding: 10px;
      background: #f6f8fa;
    }

    @media (max-width: 760px) {
      .choice-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 560px) {
      .wrap {
        width: min(100vw - 20px, 1120px);
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>GitHub CLI Extension Chooser</h1>
      <p class="lead">Start with the workflow that hurts, then inspect a small starter pack instead of installing overlapping GitHub CLI extensions blindly.</p>
      <div class="meta">
        <span class="pill">${items.length} curated extensions</span>
        <span class="pill">${starterPacks.length} starter packs</span>
        <span class="pill">${Object.keys(workflowGuides).length} workflow guides</span>
        <span class="pill">Reviewed ${escapeHtml(generatedAt)}</span>
      </div>
      <div class="actions">
        <a href="./">Searchable catalog</a>
        <a href="awesome-github-cli-extensions.html">Awesome overview</a>
        <a href="api/index.json">API manifest</a>
        <a href="faq.md">FAQ</a>
        <a href="cheatsheet.md">Cheatsheet</a>
        <a href="agent-guide.md">Agent guide</a>
        <a href="${repoReadmeUrl}">README</a>
        <a href="${repoUrl}">Star on GitHub</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="panel">
      <h2>Pick A Starting Point</h2>
      <p class="muted">Each path gives you a short first choice, nearby alternatives, a workflow guide, and an install bundle you can inspect before running anything.</p>
    </section>

    <section class="choice-grid">
      ${choices.map((choice) => renderChooserChoice(choice)).join("\n      ")}
    </section>
  </main>
</body>
</html>
`;
}

function renderExtensionPage(entry) {
  const pagePath = extensionPagePath(entry);
  const pageUrl = `${siteUrl}${pagePath}`;
  const categoryPath = categoryPagePath(entry.category);
  const guide = workflowGuides[entry.category];
  const guidePath = guide?.path || "";
  const topPick = topPickRepos.includes(entry.repo);
  const relatedEntries = entries
    .filter((candidate) => candidate.category === entry.category && candidate.repo !== entry.repo)
    .sort(categorySort)
    .slice(0, 5);
  const title = `${entry.repo} GitHub CLI Extension`;
  const description = `${entry.summary} Install with ${entry.install}. Reviewed status: ${entry.status}.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: entry.name,
    codeRepository: `https://github.com/${entry.repo}`,
    license: entry.license,
    description: entry.summary,
    url: pageUrl,
  };
  const jsonLdScript = JSON.stringify(jsonLd).replaceAll("<", "\\u003c");
  const atlasBadgeMarkdown = `[![Listed in GitHub CLI Extension Atlas](https://img.shields.io/badge/GitHub%20CLI%20Extension%20Atlas-listed-blue)](${pageUrl})`;
  const atlasBadgeHtml = `<a href="${pageUrl}"><img alt="Listed in GitHub CLI Extension Atlas" src="https://img.shields.io/badge/GitHub%20CLI%20Extension%20Atlas-listed-blue"></a>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | GitHub CLI Extension Atlas</title>
  <meta name="description" content="${escapeAttribute(description)}">
  <meta property="og:title" content="${escapeAttribute(title)}">
  <meta property="og:description" content="${escapeAttribute(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttribute(title)}">
  <meta name="twitter:description" content="${escapeAttribute(description)}">
  <meta name="twitter:image" content="${socialImageUrl}">
  <link rel="canonical" href="${pageUrl}">
  <script type="application/ld+json">${jsonLdScript}</script>
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
      width: min(1040px, calc(100vw - 32px));
      margin: 0 auto;
    }

    .header-inner {
      display: grid;
      gap: 13px;
      padding: 30px 0 24px;
    }

    h1 {
      margin: 0;
      font-size: 40px;
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

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .metric {
      display: grid;
      gap: 3px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      background: #f6f8fa;
    }

    .metric strong {
      font-size: 22px;
      line-height: 1.2;
    }

    .muted,
    .metric span {
      color: var(--muted);
    }

    .table-wrap {
      overflow: auto;
    }

    table {
      width: 100%;
      min-width: 760px;
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
      width: 180px;
      background: #f6f8fa;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    tr:last-child td,
    tr:last-child th {
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
      overflow-wrap: anywhere;
    }

    pre {
      margin: 0;
      overflow: auto;
      border-radius: 6px;
      padding: 10px;
      background: #f6f8fa;
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

    @media (max-width: 640px) {
      .wrap {
        width: min(100vw - 20px, 1040px);
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap header-inner">
      <h1>${escapeHtml(entry.repo)}</h1>
      <p class="lead">${escapeHtml(entry.summary)}</p>
      <div class="meta">
        <span class="pill">${escapeHtml(entry.category)}</span>
        <span class="pill"><span class="status ${entry.status}">${escapeHtml(entry.status)}</span></span>
        <span class="pill">${entry.stars.toLocaleString()} stars snapshot</span>
        <span class="pill">Verified ${escapeHtml(entry.verified_at)}</span>
        ${topPick ? '<span class="pill">Top Pick</span>' : ""}
      </div>
      <div class="actions">
        <a href="../">Searchable catalog</a>
        <a href="../${escapeAttribute(categoryPath)}">${escapeHtml(entry.category)} category</a>
        ${guidePath ? `<a href="../${escapeAttribute(guidePath)}">Workflow guide</a>` : ""}
        <a href="https://github.com/${escapeAttribute(entry.repo)}">Upstream repository</a>
        <a href="${repoReadmeUrl}">Atlas README</a>
        <a href="${repoUrl}">Star atlas on GitHub</a>
        <a href="${repoIssueChooserUrl}">Suggest a correction</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="panel">
      <h2>Install</h2>
      <pre><code>${escapeHtml(entry.install)}</code></pre>
      <div class="actions">
        <button type="button" id="copy-install" data-install="${escapeAttribute(entry.install)}">Copy install command</button>
        <span class="muted" id="copy-feedback" aria-live="polite"></span>
      </div>
    </section>

    <section class="grid" aria-label="Extension summary">
      <div class="metric">
        <span>Best for</span>
        <strong>${escapeHtml(entry.best_for)}</strong>
      </div>
      <div class="metric">
        <span>Avoid if</span>
        <strong>${escapeHtml(entry.avoid_if)}</strong>
      </div>
      <div class="metric">
        <span>License</span>
        <strong>${escapeHtml(entry.license)}</strong>
      </div>
      <div class="metric">
        <span>Last pushed</span>
        <strong>${escapeHtml(entry.last_pushed_at.slice(0, 10))}</strong>
      </div>
    </section>

    <section class="table-wrap">
      <table>
        <tbody>
          <tr>
            <th>Repository</th>
            <td><a href="https://github.com/${escapeAttribute(entry.repo)}">${escapeHtml(entry.repo)}</a></td>
          </tr>
          <tr>
            <th>Atlas category</th>
            <td><a href="../${escapeAttribute(categoryPath)}">${escapeHtml(entry.category)}</a></td>
          </tr>
          <tr>
            <th>Maintenance status</th>
            <td><span class="status ${entry.status}">${escapeHtml(entry.status)}</span></td>
          </tr>
          <tr>
            <th>Official GitHub project</th>
            <td>${entry.official ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Archived</th>
            <td>${entry.archived ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Reviewed snapshot</th>
            <td>Stars, last pushed date, and status were last reviewed on ${escapeHtml(entry.verified_at)}.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="panel">
      <h2>Related ${escapeHtml(entry.category)} Extensions</h2>
      <p class="muted">Use these as nearby alternatives before installing a tool into your daily GitHub CLI workflow.</p>
      <div class="actions">
        ${relatedEntries.map((candidate) => `<a href="../${escapeAttribute(extensionPagePath(candidate))}">${escapeHtml(candidate.repo)}</a>`).join("\n        ")}
      </div>
    </section>

    <section class="panel">
      <h2>Maintainer Snippet</h2>
      <p class="muted">If this listing is accurate and you want to point users to the atlas comparison context, these optional snippets link to this reviewed detail page. They are not required for corrections.</p>
      <p><strong>Markdown</strong></p>
      <pre><code>${escapeHtml(atlasBadgeMarkdown)}</code></pre>
      <p><strong>HTML</strong></p>
      <pre><code>${escapeHtml(atlasBadgeHtml)}</code></pre>
    </section>

    <section class="panel">
      <h2>Reusable Data</h2>
      <p class="muted">This page is generated from the public atlas catalog. Use the API when you need the full machine-readable snapshot.</p>
      <div class="actions">
        <a href="../api/extensions.json">Full catalog JSON</a>
        <a href="../api/extensions.schema.json">JSON schema</a>
        <a href="../install/all.txt">All install commands</a>
      </div>
    </section>
  </main>

  <script>
    const button = document.getElementById("copy-install");
    const feedback = document.getElementById("copy-feedback");

    button.addEventListener("click", async () => {
      await copyText(button.dataset.install);
      feedback.textContent = "Copied install command.";
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

function renderSitemapXml(items) {
  const lastmod = latestVerifiedAt(items);
  const chooserUrl = `  <url>
    <loc>${siteUrl}chooser.html</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>`;
  const awesomeUrl = `  <url>
    <loc>${siteUrl}awesome-github-cli-extensions.html</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  const awesomeMarkdownUrl = `  <url>
    <loc>${siteUrl}awesome-github-cli-extensions.md</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  const cheatsheetUrl = `  <url>
    <loc>${siteUrl}cheatsheet.md</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  const recommendationsUrl = `  <url>
    <loc>${siteUrl}recommendations.html</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  const recommendationsMarkdownUrl = `  <url>
    <loc>${siteUrl}recommendations.md</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  const agentGuideUrl = `  <url>
    <loc>${siteUrl}agent-guide.md</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
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
  const extensionUrls = stableEntries(items)
    .map((entry) => `  <url>
    <loc>${siteUrl}${extensionPagePath(entry)}</loc>
    <lastmod>${escapeHtml(entry.verified_at || lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
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
${chooserUrl}
${awesomeUrl}
${awesomeMarkdownUrl}
${cheatsheetUrl}
${recommendationsUrl}
${recommendationsMarkdownUrl}
${agentGuideUrl}
${categoryUrls}
${guideUrls}
${extensionUrls}
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
            <td><a class="repo" href="../${escapeAttribute(extensionPagePath(entry))}">${escapeHtml(entry.name)}</a><br><span class="muted">${escapeHtml(entry.summary)}</span></td>
            <td>${escapeHtml(row.why)}</td>
            <td><span class="status ${entry.status}">${entry.status}</span></td>
            <td><code>${escapeHtml(entry.install)}</code></td>
          </tr>`;
}

function toolCard(repo, label) {
  const entry = getEntryByRepo(repo);
  return `<article class="tool-card">
          <strong><a href="../${escapeAttribute(extensionPagePath(entry))}">${escapeHtml(entry.name)}</a></strong>
          <span class="muted">${escapeHtml(label)}</span>
          <span>${escapeHtml(entry.best_for)}</span>
          <code>${escapeHtml(entry.install)}</code>
        </article>`;
}

function renderChooserChoice(choice) {
  const pack = choice.starterPack ? starterPacks.find((candidate) => candidate.name === choice.starterPack) : null;
  const guide = choice.category ? workflowGuides[choice.category] : null;
  const packPath = pack ? `install/starter-packs/${starterPackSlug(pack)}.txt` : "";
  const commands = choice.dataOnly
    ? "curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json"
    : getStarterPackEntries(pack, entries)
        .map((entry) => entry.install)
        .join("\n");
  const tools = choice.repos
    .map((repo) => getEntryByRepo(repo))
    .map((entry) => `<a class="tool" href="${escapeAttribute(extensionPagePath(entry))}">${escapeHtml(entry.repo)}</a>`)
    .join("\n          ");

  return `<article class="choice" id="${escapeAttribute(categorySlug(choice.title))}">
        <h3>${escapeHtml(choice.title)}</h3>
        <p>${escapeHtml(choice.question)}</p>
        <div class="tool-list">
          ${tools}
        </div>
        <pre><code>${escapeHtml(commands)}</code></pre>
        <p>${escapeHtml(choice.note)}</p>
        <div class="actions">
          ${guide ? `<a href="${escapeAttribute(guide.path)}">Workflow guide</a>` : '<a href="api-reference.md">API reference</a>'}
          ${packPath ? `<a href="${escapeAttribute(packPath)}">Starter pack TXT</a>` : '<a href="api/extensions.json">Catalog JSON</a>'}
          ${choice.category ? `<a href="${escapeAttribute(categoryPagePath(choice.category))}">${escapeHtml(choice.category)} category</a>` : '<a href="data-recipes.md">Data recipes</a>'}
        </div>
      </article>`;
}

function categoryRowHtml(entry) {
  return `<tr>
            <td><a class="repo" href="../${escapeAttribute(extensionPagePath(entry))}">${escapeHtml(entry.repo)}</a><br><span>${escapeHtml(entry.summary)}</span></td>
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

function getRecommendationEntries(recommendation, items) {
  const entriesByRepo = new Map(items.map((entry) => [entry.repo, entry]));
  return recommendation.repos.map((repo) => entriesByRepo.get(repo)).filter(Boolean);
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
      recommendations: recommendations.length,
      active: items.filter((entry) => entry.status === "active").length,
      watch: items.filter((entry) => entry.status === "watch").length,
      stale: items.filter((entry) => entry.status === "stale").length,
    },
    endpoints: {
      health: `${siteUrl}api/health.json`,
      catalog: `${siteUrl}api/extensions.json`,
      schema: `${siteUrl}api/extensions.schema.json`,
      top_picks: `${siteUrl}api/top-picks.json`,
      search_index: `${siteUrl}api/search-index.json`,
      recommendations: `${siteUrl}api/recommendations.json`,
      recommendations_schema: `${siteUrl}api/recommendations.schema.json`,
      starter_packs: `${siteUrl}api/starter-packs.json`,
      chooser: `${siteUrl}chooser.html`,
      awesome_markdown: `${siteUrl}awesome-github-cli-extensions.md`,
      cheatsheet: `${siteUrl}cheatsheet.md`,
      workflow_recommendations: `${siteUrl}recommendations.html`,
      workflow_recommendations_markdown: `${siteUrl}recommendations.md`,
      agent_guide: `${siteUrl}agent-guide.md`,
      faq: `${siteUrl}faq.md`,
      llms: `${siteUrl}llms.txt`,
      llms_full: `${siteUrl}llms-full.txt`,
      extension_page_template: `${siteUrl}extensions/{owner-repo}.html`,
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
        json: `${siteUrl}api/starter-packs/${slug}.json`,
        install_commands: `${siteUrl}install/starter-packs/${slug}.txt`,
      };
    }),
    recommendations: recommendations.map((recommendation) => ({
      id: recommendation.id,
      label: recommendation.label,
      aliases: recommendation.aliases,
      repos: recommendation.repos,
      endpoint: `${siteUrl}api/recommendations.json`,
    })),
  };
}

function renderRecommendations(items) {
  return recommendations.map((recommendation) => {
    const recommendationEntries = getRecommendationEntries(recommendation, items);

    return {
      id: recommendation.id,
      label: recommendation.label,
      aliases: recommendation.aliases,
      repos: recommendation.repos,
      entries: recommendationEntries.map((entry, index) => ({
        rank: index + 1,
        repo: entry.repo,
        name: entry.name,
        category: entry.category,
        status: entry.status,
        summary: entry.summary,
        best_for: entry.best_for,
        avoid_if: entry.avoid_if,
        install: entry.install,
        detail: `${siteUrl}${extensionPagePath(entry)}`,
      })),
    };
  });
}

function renderStarterPackIndex(items) {
  return starterPacks.map((pack) => renderStarterPack(pack, items));
}

function renderStarterPack(pack, items) {
  const slug = starterPackSlug(pack);
  const packEntries = getStarterPackEntries(pack, items);

  return {
    name: pack.name,
    slug,
    summary: pack.summary,
    repos: pack.repos,
    install_commands_url: `${siteUrl}install/starter-packs/${slug}.txt`,
    entries: packEntries.map((entry) => ({
      repo: entry.repo,
      name: entry.name,
      category: entry.category,
      status: entry.status,
      summary: entry.summary,
      best_for: entry.best_for,
      install: entry.install,
      detail: `${siteUrl}${extensionPagePath(entry)}`,
    })),
  };
}

function renderSearchIndex(items) {
  const starterPacksByRepo = new Map();
  for (const pack of starterPacks) {
    for (const repo of pack.repos) {
      const packs = starterPacksByRepo.get(repo) || [];
      packs.push(pack.name);
      starterPacksByRepo.set(repo, packs);
    }
  }

  return stableEntries(items).map((entry) => {
    const ownership = entry.official ? "official" : "community";
    const workflowGuide = workflowGuides[entry.category];
    const starterPackNames = starterPacksByRepo.get(entry.repo) || [];
    const searchTextParts = [
      entry.repo,
      entry.name,
      entry.category,
      entry.summary,
      entry.best_for,
      entry.avoid_if,
      entry.status,
      ownership,
      ...starterPackNames,
    ];

    return {
      id: categorySlug(entry.repo),
      repo: entry.repo,
      name: entry.name,
      category: entry.category,
      status: entry.status,
      ownership,
      install: entry.install,
      summary: entry.summary,
      best_for: entry.best_for,
      avoid_if: entry.avoid_if,
      detail: `${siteUrl}${extensionPagePath(entry)}`,
      upstream: `https://github.com/${entry.repo}`,
      workflow_guide: workflowGuide ? `${siteUrl}${workflowGuide.path}` : null,
      starter_packs: starterPackNames,
      keywords: searchKeywords(searchTextParts),
      search_text: searchTextParts.join(" "),
    };
  });
}

function renderHealthSnapshot(items) {
  const generatedAt = latestVerifiedAt(items);
  const sortedItems = stableEntries(items);
  const statusCounts = Object.fromEntries(["active", "watch", "stale"].map((status) => [status, items.filter((entry) => entry.status === status).length]));
  const categorySummaries = categories.map((category) => {
    const categoryItems = items.filter((entry) => entry.category === category);
    return {
      name: category,
      slug: categorySlug(category),
      count: categoryItems.length,
      active: categoryItems.filter((entry) => entry.status === "active").length,
      watch: categoryItems.filter((entry) => entry.status === "watch").length,
      stale: categoryItems.filter((entry) => entry.status === "stale").length,
      page: `${siteUrl}${categoryPagePath(category)}`,
    };
  });
  const verifiedDates = sortedItems.map((entry) => entry.verified_at).filter(Boolean).sort();
  const pushedDates = sortedItems.map((entry) => entry.last_pushed_at).filter(Boolean).sort();

  return {
    name: packageJson.name,
    version: packageJson.version,
    generated_at: generatedAt,
    source: "https://github.com/sjh9714/gh-extension-atlas",
    homepage: siteUrl,
    counts: {
      extensions: items.length,
      active: statusCounts.active,
      watch: statusCounts.watch,
      stale: statusCounts.stale,
      categories: categories.length,
      top_picks: getTopPickEntries(items).length,
      starter_packs: starterPacks.length,
      recommendations: recommendations.length,
      workflow_guides: Object.keys(workflowGuides).length,
      extension_pages: sortedItems.length,
    },
    freshness: {
      latest_verified_at: verifiedDates.at(-1),
      oldest_verified_at: verifiedDates[0],
      latest_last_pushed_at: pushedDates.at(-1),
      oldest_last_pushed_at: pushedDates[0],
    },
    status_counts: statusCounts,
    categories: categorySummaries,
    top_picks: getTopPickEntries(items).map((entry) => ({
      repo: entry.repo,
      name: entry.name,
      category: entry.category,
      status: entry.status,
      verified_at: entry.verified_at,
      install: entry.install,
      detail: `${siteUrl}${extensionPagePath(entry)}`,
    })),
    generated_assets: {
      catalog: siteUrl,
      chooser: `${siteUrl}chooser.html`,
      awesome_overview: `${siteUrl}awesome-github-cli-extensions.html`,
      awesome_markdown: `${siteUrl}awesome-github-cli-extensions.md`,
      cheatsheet: `${siteUrl}cheatsheet.md`,
      workflow_recommendations: `${siteUrl}recommendations.html`,
      workflow_recommendations_markdown: `${siteUrl}recommendations.md`,
      agent_guide: `${siteUrl}agent-guide.md`,
      faq: `${siteUrl}faq.md`,
      health: `${siteUrl}health.md`,
      health_json: `${siteUrl}api/health.json`,
      api_manifest: `${siteUrl}api/index.json`,
      search_index: `${siteUrl}api/search-index.json`,
      recommendations: `${siteUrl}api/recommendations.json`,
      recommendations_schema: `${siteUrl}api/recommendations.schema.json`,
      llms: `${siteUrl}llms.txt`,
      llms_full: `${siteUrl}llms-full.txt`,
    },
    guardrails: [
      "Archived repositories are excluded.",
      "Top Picks are manually curated and not promoted automatically from star count.",
      "Metadata is a reviewed snapshot, not a live ranking.",
      "Install bundles are plain text and should be inspected before use.",
    ],
  };
}

function renderHealthMarkdown(items) {
  const health = renderHealthSnapshot(items);

  return `# Atlas Health Snapshot

GitHub CLI Extension Atlas is a reviewed snapshot, not a live ranking. This page summarizes the current generated catalog state.

## Counts

| Signal | Value |
| --- | ---: |
| Extensions | ${health.counts.extensions} |
| Active | ${health.counts.active} |
| Watch | ${health.counts.watch} |
| Stale | ${health.counts.stale} |
| Categories | ${health.counts.categories} |
| Top Picks | ${health.counts.top_picks} |
| Starter packs | ${health.counts.starter_packs} |
| Recommendations | ${health.counts.recommendations} |
| Workflow guides | ${health.counts.workflow_guides} |
| Generated extension pages | ${health.counts.extension_pages} |

## Freshness

| Signal | Value |
| --- | --- |
| Latest verified date | ${health.freshness.latest_verified_at} |
| Oldest verified date | ${health.freshness.oldest_verified_at} |
| Latest upstream push snapshot | ${health.freshness.latest_last_pushed_at} |
| Oldest upstream push snapshot | ${health.freshness.oldest_last_pushed_at} |

## Category Health

| Category | Count | Active | Watch | Stale |
| --- | ---: | ---: | ---: | ---: |
${health.categories.map((category) => `| [${category.name}](${category.page}) | ${category.count} | ${category.active} | ${category.watch} | ${category.stale} |`).join("\n")}

## Guardrails

${health.guardrails.map((guardrail) => `- ${guardrail}`).join("\n")}

## Machine-Readable Snapshot

The same health snapshot is published as JSON:

\`\`\`sh
curl -fsSL ${siteUrl}api/health.json
\`\`\`
`;
}

function renderCheatsheetMarkdown(items) {
  const generatedAt = latestVerifiedAt(items);
  const topPicks = getTopPickEntries(items);
  const workflowRows = [
    ["PRs, issues, and notifications in one place", "dlvhdr/gh-dash"],
    ["Inline pull request review threads", "agynio/gh-pr-review"],
    ["Interactive GitHub Actions inspection", "dlvhdr/gh-enhance"],
    ["Workflow success rate and duration", "fchimpan/gh-workflow-stats"],
    ["Safe merged branch cleanup", "seachicken/gh-poi"],
    ["GitHub-flavored Markdown preview", "yusukebe/gh-markdown-preview"],
    ["Repository search from the terminal", "gennaro-tedesco/gh-s"],
    ["Terminal GitHub notification display", "meiji163/gh-notify"],
    ["SBOM generation", "advanced-security/gh-sbom"],
    ["Agentic GitHub workflows", "github/gh-aw"],
  ];

  return `# GitHub CLI Extension Cheatsheet

A compact quick reference for choosing a first GitHub CLI extension from the reviewed atlas.

- Repository: ${repoUrl}
- Searchable catalog: ${siteUrl}
- Workflow chooser: ${siteUrl}chooser.html
- Reviewed snapshot: ${generatedAt}
- Catalog size: ${items.length} extensions

## Pick By Workflow

| If you need... | Try first | Install | Detail |
| --- | --- | --- | --- |
${workflowRows
  .map(([need, repo]) => {
    const entry = getEntryByRepo(repo);
    return `| ${need} | \`${entry.name}\` | \`${entry.install}\` | [${entry.repo}](${siteUrl}${extensionPagePath(entry)}) |`;
  })
  .join("\n")}

## Top Picks Install Commands

\`\`\`sh
${topPicks.map((entry) => entry.install).join("\n")}
\`\`\`

## Starter Pack Bundles

Review each bundle before installing. Do not pipe remote install bundles directly into a shell.

| Workflow | Bundle | First repos |
| --- | --- | --- |
${starterPacks
  .map((pack) => {
    const slug = starterPackSlug(pack);
    return `| ${pack.name} | [${slug}.txt](${siteUrl}install/starter-packs/${slug}.txt) | ${pack.repos.map((repo) => `\`${repo}\``).join(", ")} |`;
  })
  .join("\n")}

## API Shortcuts

\`\`\`sh
curl -fsSL ${siteUrl}api/index.json
curl -fsSL ${siteUrl}api/top-picks.json
curl -fsSL ${siteUrl}api/starter-packs.json
curl -fsSL ${siteUrl}install/top-picks.txt
\`\`\`

## Guardrails

- This is an independent curated resource, not an official GitHub project.
- Star counts and maintenance status are reviewed snapshots, not live rankings.
- Recheck upstream repositories before adopting extensions for security, compliance, CI, release, or production workflows.
- Open a correction if a summary, category, install command, or maintenance label is wrong: ${repoIssueChooserUrl}
`;
}

function renderLlmsTxt(items) {
  const generatedAt = latestVerifiedAt(items);

  return `# GitHub CLI Extension Atlas

> Curated field guide to GitHub CLI extensions: what to install, when to use them, and which ones are maintained.

- Repository: https://github.com/sjh9714/gh-extension-atlas
- Website: ${siteUrl}
- Searchable catalog: ${siteUrl}
- Workflow chooser: ${siteUrl}chooser.html
- Awesome overview: ${siteUrl}awesome-github-cli-extensions.html
- Cheatsheet: ${siteUrl}cheatsheet.md
- Workflow recommendations: ${siteUrl}recommendations.html
- Agent guide: ${siteUrl}agent-guide.md
- FAQ: ${siteUrl}faq.md
- API manifest: ${siteUrl}api/index.json
- Full LLM context: ${siteUrl}llms-full.txt
- Reviewed snapshot: ${generatedAt}

## What This Is

GitHub CLI Extension Atlas helps users choose a useful \`gh\` extension faster when \`gh extension search\` returns too many overlapping options. It is a curated snapshot, not an official GitHub project, exhaustive directory, or live ranking.

## Core Pages

- Workflow chooser: ${siteUrl}chooser.html
- Searchable catalog: ${siteUrl}
- Awesome overview: ${siteUrl}awesome-github-cli-extensions.html
- Cheatsheet: ${siteUrl}cheatsheet.md
- Workflow recommendations: ${siteUrl}recommendations.html
- Agent guide: ${siteUrl}agent-guide.md
- Health snapshot: ${siteUrl}health.md
- FAQ: ${siteUrl}faq.md
- API reference: ${siteUrl}api-reference.md
- Data recipes: ${siteUrl}data-recipes.md
- Starter packs: ${siteUrl}starter-packs.md

## Workflow Guides

${Object.values(workflowGuides)
  .map((guide) => `- ${guide.title}: ${siteUrl}${guide.path}`)
  .join("\n")}

## Public Data

- Full catalog JSON: ${siteUrl}api/extensions.json
- Catalog health JSON: ${siteUrl}api/health.json
- Catalog schema: ${siteUrl}api/extensions.schema.json
- Search index JSON: ${siteUrl}api/search-index.json
- Workflow recommendations JSON: ${siteUrl}api/recommendations.json
- Workflow recommendations schema: ${siteUrl}api/recommendations.schema.json
- Top Picks JSON: ${siteUrl}api/top-picks.json
- Starter packs JSON: ${siteUrl}api/starter-packs.json
- All install commands: ${siteUrl}install/all.txt
- Top Picks install commands: ${siteUrl}install/top-picks.txt

## Categories

${categories
  .map((category) => {
    const categoryItems = items.filter((entry) => entry.category === category);
    return `- ${category}: ${categoryItems.length} extensions, ${categoryItems.filter((entry) => entry.status === "active").length} active - ${siteUrl}${categoryPagePath(category)}`;
  })
  .join("\n")}
`;
}

function renderLlmsFullTxt(items) {
  const generatedAt = latestVerifiedAt(items);
  const sortedItems = stableEntries(items);
  const activeCount = items.filter((entry) => entry.status === "active").length;
  const watchCount = items.filter((entry) => entry.status === "watch").length;
  const staleCount = items.filter((entry) => entry.status === "stale").length;

  return `# GitHub CLI Extension Atlas

> Curated field guide to GitHub CLI extensions: what to install, when to use them, and which ones are maintained.

Repository: https://github.com/sjh9714/gh-extension-atlas
Website: ${siteUrl}
Reviewed snapshot: ${generatedAt}
Catalog size: ${items.length} extensions
Status counts: ${activeCount} active, ${watchCount} watch, ${staleCount} stale

## Purpose

Use this atlas when \`gh extension search\` gives too many options and you need a faster first choice. The project combines human curation, comparison guides, starter packs, generated extension detail pages, and a small public JSON catalog.

This is not an official GitHub project, complete directory, endorsement list, or live ranking. Recheck upstream repositories before adopting a tool for security, compliance, CI, release, or production workflows.

## Primary Entry Points

- Workflow chooser: ${siteUrl}chooser.html
- Searchable catalog: ${siteUrl}
- Awesome overview: ${siteUrl}awesome-github-cli-extensions.html
- Cheatsheet: ${siteUrl}cheatsheet.md
- Workflow recommendations: ${siteUrl}recommendations.html
- Agent guide: ${siteUrl}agent-guide.md
- Health snapshot: ${siteUrl}health.md
- FAQ: ${siteUrl}faq.md
- API reference: ${siteUrl}api-reference.md
- Data recipes: ${siteUrl}data-recipes.md
- Starter packs: ${siteUrl}starter-packs.md
- Full catalog JSON: ${siteUrl}api/extensions.json
- Catalog schema: ${siteUrl}api/extensions.schema.json
- API manifest: ${siteUrl}api/index.json
- Catalog health JSON: ${siteUrl}api/health.json
- Workflow recommendations JSON: ${siteUrl}api/recommendations.json
- Workflow recommendations schema: ${siteUrl}api/recommendations.schema.json

## Top Picks

${getTopPickEntries(items)
  .map((entry) => `- ${entry.name} (${entry.repo}) - ${entry.best_for} Install: \`${entry.install}\`. Detail: ${siteUrl}${extensionPagePath(entry)}`)
  .join("\n")}

## Starter Packs

${starterPacks
  .map((pack) => `- ${pack.name}: ${pack.summary} Install bundle: ${siteUrl}install/starter-packs/${starterPackSlug(pack)}.txt Repos: ${pack.repos.join(", ")}`)
  .join("\n")}

## Workflow Guides

${Object.entries(workflowGuides)
  .map(([category, guide]) => `- ${category}: ${guide.summary} Guide: ${siteUrl}${guide.path} Category page: ${siteUrl}${categoryPagePath(category)} Category JSON: ${siteUrl}api/categories/${categorySlug(category)}.json`)
  .join("\n")}

## Public API And Plain Text Endpoints

- API manifest: ${siteUrl}api/index.json
- Catalog health JSON: ${siteUrl}api/health.json
- Full catalog JSON: ${siteUrl}api/extensions.json
- Catalog JSON Schema: ${siteUrl}api/extensions.schema.json
- Search index JSON: ${siteUrl}api/search-index.json
- Workflow recommendations JSON: ${siteUrl}api/recommendations.json
- Workflow recommendations schema: ${siteUrl}api/recommendations.schema.json
- Top Picks JSON: ${siteUrl}api/top-picks.json
- Starter packs JSON: ${siteUrl}api/starter-packs.json
- All install commands: ${siteUrl}install/all.txt
- Top Picks install commands: ${siteUrl}install/top-picks.txt
- LLM summary: ${siteUrl}llms.txt
- LLM full context: ${siteUrl}llms-full.txt

## Catalog Entries

${sortedItems
  .map((entry) => `- ${entry.repo} - category: ${entry.category}; status: ${entry.status}; stars snapshot: ${entry.stars}; license: ${entry.license}; verified_at: ${entry.verified_at}; install: \`${entry.install}\`; summary: ${entry.summary}; best_for: ${entry.best_for}; avoid_if: ${entry.avoid_if}; detail: ${siteUrl}${extensionPagePath(entry)}`)
  .join("\n")}
`;
}

function renderJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function searchKeywords(parts) {
  const stopWords = new Set(["and", "for", "from", "into", "only", "that", "the", "this", "with", "without", "your"]);
  const tokens = parts
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));

  return unique(tokens).sort();
}

function renderInstallCommands(items) {
  return `${items.map((entry) => entry.install).join("\n")}\n`;
}

function categoryPagePath(category) {
  return `categories/${categorySlug(category)}.html`;
}

function extensionPagePath(entry) {
  return `extensions/${categorySlug(entry.repo)}.html`;
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
