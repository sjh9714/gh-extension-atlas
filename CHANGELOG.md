# Changelog

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
