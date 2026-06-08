# Public API Reference

GitHub CLI Extension Atlas publishes a small static API for people who want to inspect, filter, or reuse the reviewed catalog without cloning the repository.

Base URL:

```text
https://sjh9714.github.io/gh-extension-atlas/
```

The API is a reviewed snapshot, not a live ranking. Fields such as `stars`, `last_pushed_at`, `status`, and `verified_at` are refreshed during maintenance passes and should be rechecked before adopting a tool in a production workflow.

## Endpoints

| Endpoint | Format | Use this when... |
| --- | --- | --- |
| [`/api/index.json`](https://sjh9714.github.io/gh-extension-atlas/api/index.json) | JSON object | You want a manifest of all generated endpoints, counts, categories, and starter packs. |
| [`/api/health.json`](https://sjh9714.github.io/gh-extension-atlas/api/health.json) | JSON object | You want catalog counts, freshness, category health, generated asset links, and guardrails. |
| [`/api/extensions.json`](https://sjh9714.github.io/gh-extension-atlas/api/extensions.json) | JSON array | You want the complete reviewed extension catalog. |
| [`/api/extensions.schema.json`](https://sjh9714.github.io/gh-extension-atlas/api/extensions.schema.json) | JSON Schema | You want the public data contract for catalog entries. |
| [`/api/top-picks.json`](https://sjh9714.github.io/gh-extension-atlas/api/top-picks.json) | JSON array | You want the first-pass recommendations from the README Top Picks table. |
| [`/api/search-index.json`](https://sjh9714.github.io/gh-extension-atlas/api/search-index.json) | JSON array | You want lightweight records for client-side search, docs indexing, or small tools. |
| [`/api/recommendations.json`](https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json) | JSON array | You want workflow-first recommendations with install commands and avoid-if notes. |
| [`/api/recommendations.schema.json`](https://sjh9714.github.io/gh-extension-atlas/api/recommendations.schema.json) | JSON Schema | You want the public data contract for workflow recommendation source data. |
| `/api/categories/{slug}.json` | JSON array | You want entries from one category, such as `actions-ci` or `dashboard-tui`. |
| [`/api/starter-packs.json`](https://sjh9714.github.io/gh-extension-atlas/api/starter-packs.json) | JSON array | You want all workflow starter packs with entries and install commands. |
| `/api/starter-packs/{slug}.json` | JSON object | You want one workflow starter pack as structured data. |
| [`/awesome-github-cli-extensions.md`](https://sjh9714.github.io/gh-extension-atlas/awesome-github-cli-extensions.md) | Markdown | You want a shareable markdown overview of Top Picks, workflow guides, and starter packs. |
| [`/cheatsheet.md`](https://sjh9714.github.io/gh-extension-atlas/cheatsheet.md) | Markdown | You want a compact workflow and install-command quick reference. |
| [`/recommendations.html`](https://sjh9714.github.io/gh-extension-atlas/recommendations.html) | HTML | You want browser-friendly workflow-first picks with install commands and avoid-if notes. |
| [`/recommendations.md`](https://sjh9714.github.io/gh-extension-atlas/recommendations.md) | Markdown | You want workflow recommendations as copyable markdown. |
| [`/agent-guide.md`](https://sjh9714.github.io/gh-extension-atlas/agent-guide.md) | Markdown | You want prompt and JSON recipes for AI coding assistants. |
| [`/llms.txt`](https://sjh9714.github.io/gh-extension-atlas/llms.txt) | Plain text | You want a concise plain-text map for AI coding tools and documentation indexers. |
| [`/llms-full.txt`](https://sjh9714.github.io/gh-extension-atlas/llms-full.txt) | Plain text | You want workflow, API, starter pack, and catalog context in one plain-text file. |
| [`/install/all.txt`](https://sjh9714.github.io/gh-extension-atlas/install/all.txt) | Plain text | You want every reviewed install command in one file. |
| [`/install/top-picks.txt`](https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt) | Plain text | You want install commands for the Top Picks only. |
| `/install/categories/{slug}.txt` | Plain text | You want install commands for one category. |
| `/install/starter-packs/{slug}.txt` | Plain text | You want install commands for a small workflow-specific starter pack. |

Current category slugs:

```text
actions-ci
ai-agents
dashboard-tui
notifications
pr-issues
repo-branch
search
security-admin
```

Current starter pack slugs:

```text
daily-maintainer-triage
pr-review-and-issue-triage
github-actions-operator
ai-and-agents
local-repository-cleanup
documentation-review
search-and-discovery
security-and-admin
```

## Manifest

Use the manifest when you want to discover endpoints programmatically:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json
```

Print category endpoints:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json \
  | jq -r '.categories[] | [.name, .count, .json] | @tsv'
```

Print starter pack install bundles:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json \
  | jq -r '.starter_packs[] | [.name, .install_commands] | @tsv'
```

Print starter pack JSON endpoints:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json \
  | jq -r '.starter_packs[] | [.name, .json] | @tsv'
```

Print workflow recommendation ids and aliases:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json \
  | jq -r '.[] | [.id, .label, (.aliases | join(", "))] | @tsv'
```

Print the current health snapshot:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/health.json \
  | jq '.counts, .freshness'
```

## Catalog Schema

The full catalog is an array of extension entries. Each entry must include these fields:

```text
repo
name
category
summary
install
best_for
avoid_if
stars
license
last_pushed_at
archived
official
verified_at
status
```

The schema is published at:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/extensions.schema.json
```

The v1 data contract keeps field names stable. If a future release needs breaking field changes, it should be handled as a major version change rather than a silent schema drift.

Workflow recommendation source data is also schema-backed:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.schema.json
```

## Common Queries

Fetch the complete catalog:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/extensions.json
```

Print active community-maintained Actions/CI tools:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/categories/actions-ci.json \
  | jq -r '.[] | select(.status == "active" and .official == false) | [.name, .repo, .install] | @tsv'
```

Print Top Picks as install commands:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
```

Search lightweight index records:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/search-index.json \
  | jq -r '.[] | select(.keywords[]? == "notifications") | [.repo, .install] | @tsv'
```

Print install commands for the Actions recommendation set:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json \
  | jq -r '.[] | select(.id == "actions") | .entries[].install'
```

Fetch LLM-friendly atlas context:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/llms.txt
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/llms-full.txt
```

Open markdown overview pages:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/awesome-github-cli-extensions.md
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/cheatsheet.md
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/recommendations.html
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/recommendations.md
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/agent-guide.md
```

Review a starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/github-actions-operator.txt
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/starter-packs/github-actions-operator.json
```

## Safety Notes

Install bundles are plain-text convenience files. Review the commands before running them, and install only the extensions that fit your workflow.

Do not pipe install bundles directly into a shell:

```sh
# Avoid this pattern.
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt | sh
```

Instead, inspect first:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
```

## Freshness

The generated API includes metadata from the latest reviewed snapshot. The `generated_at` value in `/api/index.json` comes from the newest `verified_at` date in the catalog.

Use `verified_at`, `last_pushed_at`, and `status` as triage signals, not absolute guarantees. Recheck critical tools directly on GitHub before adopting them for security, compliance, or production workflows.
