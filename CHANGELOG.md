# Changelog

## v0.2.18

This patch release adds machine-readable starter pack JSON endpoints.

### Added

- `/api/starter-packs.json` with all workflow starter packs, entries, install commands, and detail links.
- `/api/starter-packs/{slug}.json` files for each individual starter pack.

### Improved

- API manifest entries now include each starter pack's JSON endpoint.
- README, API reference, and LLM context files now link to starter pack JSON.

## v0.2.17

This patch release adds a generated catalog health snapshot for readers and API consumers.

### Added

- `docs/health.md` with counts, freshness, category health, and guardrails.
- `/api/health.json` with machine-readable catalog health, generated asset links, Top Picks metadata, and freshness signals.

### Improved

- README, API reference, API manifest, and LLM context files now link to the health snapshot.

## v0.2.16

This patch release adds LLM-friendly plain-text context files for AI coding tools and documentation indexers.

### Added

- `llms.txt` with concise atlas context, core pages, workflow guides, public data endpoints, and category counts.
- `llms-full.txt` with workflow, starter pack, API, and catalog entry context.

### Improved

- README and API reference now link to the LLM context files.
- Public API manifest now lists the LLM context endpoints.

## v0.2.15

This patch release adds optional maintainer badge snippets to generated extension detail pages.

### Added

- Maintainer snippet section on every generated extension detail page.
- Markdown and HTML badge snippets that link back to the reviewed atlas detail page.

### Improved

- README maintainer guidance now explains that badge snippets are optional and not required for factual corrections.

## v0.2.14

This patch release adds a workflow-first chooser page for picking GitHub CLI extensions faster.

### Added

- GitHub CLI Extension Chooser at `chooser.html`.
- Chooser links from the README, searchable catalog, awesome overview, sitemap, and API manifest.

### Improved

- New visitors can start from a workflow, inspect a starter pack, and open generated extension detail pages before installing anything.

## v0.2.13

This patch release adds generated detail pages for every cataloged GitHub CLI extension.

### Added

- Individual extension pages under `extensions/`, one page per catalog entry.
- Extension detail links from the searchable catalog, category pages, workflow guides, and awesome overview.
- Sitemap entries for all generated extension detail pages.

### Improved

- Public API manifest now documents the extension page URL template.
- README Catalog Browser section now points to a generated extension detail page example.

## v0.2.12

This patch release adds a shareable SEO landing page for awesome GitHub CLI extensions.

### Added

- Awesome GitHub CLI Extensions landing page at `awesome-github-cli-extensions.html`.

### Improved

- Searchable catalog header now links to the awesome overview.
- Generated sitemap now includes the awesome overview page.
- README Start Here now links to the shareable overview.

## v0.2.11

This patch release adds a Start Here router near the top of the README.

### Improved

- README now routes common workflows directly to the matching workflow guide and starter pack.
- README now shows an example `curl -fsSL` starter pack inspection command before the longer catalog sections.

## v0.2.10

This patch release makes workflow guide starter packs easier to find and inspect.

### Improved

- Workflow guide pages now show their starter pack directly after the Start Here section.
- Workflow guide starter pack panels now include the public `curl -fsSL` TXT bundle command.
- Starter pack safety copy now tells readers to inspect bundles and avoid piping install bundles directly into a shell.

## v0.2.9

This patch release adds a generated Documentation Review starter pack for README and docs preview workflows.

### Added

- Documentation Review starter pack TXT bundle.

### Improved

- Public API manifest now includes the Documentation Review starter pack.
- API reference starter pack slug list now matches the generated manifest.

## v0.2.8

This patch release adds an AI and agent workflow guide for GitHub CLI extensions.

### Added

- GitHub AI And Agent CLI Extension Guide with a public HTML landing page.
- AI And Agents starter pack TXT bundle.

### Improved

- AI/Agents category page now links to its workflow guide.
- README Workflow Guides now includes AI and agent workflows as a first-class entry point.
- Public API manifest now includes the AI And Agents starter pack.

## v0.2.7

This patch release adds a security and admin workflow guide for GitHub CLI extensions.

### Added

- GitHub Security And Admin CLI Extension Guide with a public HTML landing page.

### Improved

- Security/Admin category page now links to its workflow guide.
- README Workflow Guides now includes security and admin workflows as a first-class entry point.
- Generated sitemap now includes the security and admin guide landing page.

## v0.2.6

This patch release adds a PR and issue triage workflow guide for GitHub CLI extensions.

### Added

- GitHub PR And Issue Triage CLI Extension Guide with a public HTML landing page.
- PR Review And Issue Triage starter pack TXT bundle.

### Improved

- PR & Issues category page now links to its workflow guide.
- README Workflow Guides now includes PR and issue triage as a first-class entry point.
- Public API manifest now includes the PR Review And Issue Triage starter pack.

## v0.2.5

This patch release adds a terminal dashboard workflow guide for GitHub CLI extensions.

### Added

- GitHub Terminal Dashboard CLI Extension Guide with a public HTML landing page.

### Improved

- Dashboard/TUI category page now links to its workflow guide.
- README Workflow Guides now includes terminal dashboard and Markdown preview tooling.
- Workflow guide coverage now includes Dashboard/TUI, Actions/CI, Repo & Branch, Notifications, and Search.

## v0.2.4

This patch release adds a repository search workflow guide and a generated search starter pack.

### Added

- GitHub Repository Search CLI Extension Guide with a public HTML landing page.
- Search And Discovery starter pack TXT bundle.

### Improved

- Search category page now links to its workflow guide.
- README Workflow Guides now includes repository search as a first-class entry point.
- Search starter pack now favors active repository/code search tools over stale starred-repository browsing.

## v0.2.3

This patch release adds workflow-specific guide landing pages that are easier to share than the full catalog.

### Added

- GitHub Actions CLI extension guide with a public HTML landing page.
- Git branch cleanup CLI extension guide with a public HTML landing page.
- GitHub notification triage CLI extension guide with a public HTML landing page.

### Improved

- Workflow Guides are linked from the README and relevant category pages.
- Generated sitemap now includes workflow guide landing pages.
- Site generation now supports multiple workflow guide pages from one reusable template.

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
