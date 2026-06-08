import fs from "node:fs";

const dataPath = "data/extensions.json";
const outputPath = "docs/index.html";
const checkOnly = process.argv.includes("--check");

const entries = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const html = renderCatalog(entries);

if (checkOnly) {
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (current !== html) {
    console.error(`${outputPath} is out of date. Run \`npm run site:build\`.`);
    process.exit(1);
  }

  console.log(`${outputPath} is up to date.`);
} else {
  fs.writeFileSync(outputPath, html);
  console.log(`Wrote ${outputPath}.`);
}

function renderCatalog(items) {
  const categories = unique(items.map((entry) => entry.category));
  const statuses = ["active", "watch", "stale"];
  const generatedAt = latestVerifiedAt(items);
  const dataJson = JSON.stringify(items).replaceAll("<", "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GitHub CLI Extension Atlas</title>
  <meta name="description" content="Search and filter a curated catalog of GitHub CLI extensions.">
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
      grid-template-columns: minmax(220px, 1.5fr) repeat(4, minmax(130px, 1fr));
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
    select {
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
    select:focus {
      outline: 2px solid var(--accent-soft);
      border-color: var(--accent);
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
          Sort
          <select id="sort">
            <option value="stars">Stars</option>
            <option value="name">Name</option>
            <option value="pushed">Last pushed</option>
          </select>
        </label>
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
  <script>
    const entries = JSON.parse(document.getElementById("catalog-data").textContent);
    const controls = {
      category: document.getElementById("category"),
      ownership: document.getElementById("ownership"),
      rows: document.getElementById("rows"),
      search: document.getElementById("search"),
      sort: document.getElementById("sort"),
      status: document.getElementById("status"),
      summary: document.getElementById("summary"),
      empty: document.getElementById("empty"),
    };

    for (const control of [controls.category, controls.ownership, controls.search, controls.sort, controls.status]) {
      control.addEventListener("input", render);
    }

    render();

    function render() {
      const search = controls.search.value.trim().toLowerCase();
      const category = controls.category.value;
      const status = controls.status.value;
      const ownership = controls.ownership.value;
      const sort = controls.sort.value;

      const filtered = entries
        .filter((entry) => !category || entry.category === category)
        .filter((entry) => !status || entry.status === status)
        .filter((entry) => ownership !== "official" || entry.official)
        .filter((entry) => ownership !== "community" || !entry.official)
        .filter((entry) => !search || searchableText(entry).includes(search))
        .sort(sortEntries(sort));

      controls.summary.innerHTML = [
        pill(\`\${filtered.length} shown\`),
        pill(\`\${entries.length} total\`),
        pill(\`\${countBy(filtered, "active")} active\`),
        pill(\`\${countBy(filtered, "watch")} watch\`),
        pill(\`\${countBy(filtered, "stale")} stale\`),
      ].join("");

      controls.rows.innerHTML = filtered.map(rowHtml).join("");
      controls.empty.hidden = filtered.length > 0;
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
      return \`<tr>
        <td><a class="repo" href="https://github.com/\${escapeAttribute(entry.repo)}">\${escapeHtml(entry.repo)}</a><br><span>\${escapeHtml(entry.summary)}</span></td>
        <td>\${escapeHtml(entry.category)}</td>
        <td>\${escapeHtml(entry.best_for)}</td>
        <td><span class="status \${entry.status}">\${entry.status}</span></td>
        <td>\${entry.stars.toLocaleString()}</td>
        <td class="install"><code>\${escapeHtml(entry.install)}</code></td>
      </tr>\`;
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
