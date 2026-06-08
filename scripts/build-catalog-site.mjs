import fs from "node:fs";

const dataPath = "data/extensions.json";
const checkOnly = process.argv.includes("--check");
const siteUrl = "https://sjh9714.github.io/gh-extension-atlas/";
const socialImageUrl = `${siteUrl}social-card.svg`;
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

const entries = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const generatedFiles = [
  { path: "docs/index.html", content: renderCatalog(entries) },
  { path: "docs/robots.txt", content: renderRobotsTxt() },
  { path: "docs/sitemap.xml", content: renderSitemapXml(entries) },
  { path: "docs/social-card.svg", content: renderSocialCard(entries) },
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
  <meta property="og:image:type" content="image/svg+xml">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
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
    }

    @media (max-width: 560px) {
      .wrap {
        width: min(100vw - 20px, 1180px);
      }

      .filters {
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
        <span class="pill">Data: <a href="https://github.com/sjh9714/gh-extension-atlas/blob/main/data/extensions.json">extensions.json</a></span>
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
          <button type="button" id="copy-link">Copy current view link</button>
          <button type="button" id="reset">Reset filters</button>
        </div>
        <span class="hint" id="copy-feedback" aria-live="polite"></span>
      </div>
      <div class="summary" id="summary"></div>
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

function renderSitemapXml(items) {
  const lastmod = latestVerifiedAt(items);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
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
