import fs from "node:fs";
import path from "node:path";

const dataPath = "data/extensions.json";
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
    name: "GitHub Actions Operator",
    summary: "Interactive workflow inspection plus CI health and migration helpers.",
    repos: ["dlvhdr/gh-enhance", "fchimpan/gh-workflow-stats", "github/gh-actions-importer"],
  },
  {
    name: "Local Repository Cleanup",
    summary: "Safer branch cleanup, fuzzy branch switching, and release binary installs.",
    repos: ["seachicken/gh-poi", "mislav/gh-branch", "redraw/gh-install"],
  },
  {
    name: "Security And Admin",
    summary: "SBOM generation, GitHub App tokens, and enterprise migration workflows.",
    repos: ["advanced-security/gh-sbom", "Link-/gh-token", "github/gh-gei"],
  },
];

const entries = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const categories = unique(entries.map((entry) => entry.category));
const categoryPageFiles = categories.map((category) => ({
  path: `docs/${categoryPagePath(category)}`,
  content: renderCategoryPage(category, entries.filter((entry) => entry.category === category)),
}));
const endpointFiles = [
  { path: "docs/api/extensions.json", content: renderJson(stableEntries(entries)) },
  { path: "docs/api/top-picks.json", content: renderJson(getTopPickEntries(entries)) },
  { path: "docs/install/all.txt", content: renderInstallCommands(stableEntries(entries)) },
  { path: "docs/install/top-picks.txt", content: renderInstallCommands(getTopPickEntries(entries)) },
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
        <span class="pill">API: <a href="api/extensions.json">extensions.json</a></span>
        <span class="pill">Install bundle: <a href="install/all.txt">all.txt</a></span>
        <span class="pill"><a href="https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/starter-packs.md">Starter Packs</a></span>
        <span class="pill"><a href="https://github.com/sjh9714/gh-extension-atlas#readme">README</a></span>
      </div>
    </div>
  </header>

  <main class="wrap">
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

  return `<article class="pack-card">
          <h3>${escapeHtml(pack.name)}</h3>
          <p>${escapeHtml(pack.summary)}</p>
          <p>${repos}</p>
          <pre><code>${escapeHtml(commands)}</code></pre>
          <button type="button" data-pack-install="${escapeAttribute(commands).replaceAll("\n", "&#10;")}">Copy commands</button>
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
        <a href="../install/categories/${escapeAttribute(slug)}.txt">Install commands TXT</a>
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
    </section>

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

function renderSitemapXml(items) {
  const lastmod = latestVerifiedAt(items);
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

function categoryRowHtml(entry) {
  return `<tr>
            <td><a class="repo" href="https://github.com/${escapeAttribute(entry.repo)}">${escapeHtml(entry.repo)}</a><br><span>${escapeHtml(entry.summary)}</span></td>
            <td>${escapeHtml(entry.best_for)}</td>
            <td><span class="status ${entry.status}">${entry.status}</span></td>
            <td>${entry.stars.toLocaleString()}</td>
            <td><code>${escapeHtml(entry.install)}</code></td>
          </tr>`;
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
