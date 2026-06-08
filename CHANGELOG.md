# Changelog

## v0.2.2

This patch release adds a dedicated public API reference for the generated catalog endpoints.

### Added

- Public API reference at `docs/api-reference.md`.
- Endpoint documentation for JSON catalog files, category JSON files, install command bundles, and starter pack bundles.
- Schema, freshness, and safety notes for using the static Pages API.

### Improved

- README Data section now links to the API reference.
- Data recipes now point readers to the API reference before deeper `curl` and `jq` examples.
- Searchable catalog header now links directly to the API reference.

## v0.2.1

This patch release makes the public catalog endpoints easier to discover and use without cloning the repository.

### Added

- Public API manifest at `https://sjh9714.github.io/gh-extension-atlas/api/index.json`.
- Starter pack install bundles under `https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/`.
- Public API recipes with `curl` and `jq` examples in `docs/data-recipes.md`.

### Improved

- The catalog UI now links to the API manifest and starter pack TXT bundles.
- README Data Recipes copy now mentions both local catalog queries and the public Pages API.

## v0.2.0

This release turns GitHub CLI Extension Atlas from a README-first awesome list into a small reusable catalog product.

### Added

- Searchable GitHub Pages catalog with filters, presets, copyable install commands, and starter packs.
- Static category landing pages for Actions/CI, AI/Agents, Dashboard/TUI, Notifications, PR & Issues, Repo & Branch, Search, and Security/Admin.
- Public JSON endpoints for the full catalog, Top Picks, and each category.
- Public plain-text install bundles for all entries, Top Picks, and each category.
- Social preview image, sitemap, robots.txt, and category pages for better sharing and discovery.
- Explicit GitHub Pages deployment workflow using GitHub Actions.

### Improved

- Catalog count is validated against public copy.
- Link checks now cover generated HTML pages and public Pages endpoints.
- `gh-dash` wording includes PR, issue, and notification triage after maintainer feedback.
- `gh-enhance` was added as an Actions/CI entry after independent candidate review.

### Public Endpoints

- Full catalog JSON: https://sjh9714.github.io/gh-extension-atlas/api/extensions.json
- Top Picks JSON: https://sjh9714.github.io/gh-extension-atlas/api/top-picks.json
- All install commands: https://sjh9714.github.io/gh-extension-atlas/install/all.txt
- Top Picks install commands: https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt

## v0.1.0

Initial public release of GitHub CLI Extension Atlas.

### Added

- 68 reviewed GitHub CLI extension entries.
- Top Picks and workflow-based browsing in the README.
- Comparison guides for dashboards, branch cleanup, notifications, Markdown preview, and Actions/CI.
- Data validation, awesome-list linting, link checks, and weekly summary tooling.
