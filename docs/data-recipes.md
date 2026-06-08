# Data Recipes

The atlas is meant to be useful as both a README and a small data catalog. Local recipes use [`data/extensions.json`](../data/extensions.json) without requiring any external dependencies. Public endpoint recipes use the generated Pages API. See the [Public API Reference](api-reference.md) for endpoint docs, schema notes, and freshness rules.

## Query the Local Catalog

List active Actions/CI extensions:

```sh
npm run catalog:query -- --category "Actions/CI" --status active
```

Find notification-related tools and print install commands:

```sh
npm run catalog:query -- --search notifications --format install
```

Show official GitHub-owned entries as JSON:

```sh
npm run catalog:query -- --official --format json
```

Find community-maintained search tools:

```sh
npm run catalog:query -- --category Search --community
```

Limit output when you only want a quick sample:

```sh
npm run catalog:query -- --status watch --limit 5
```

## Recommend a Workflow Starter Set

Use `catalog:recommend` when you know the workflow but do not want to compare the full category by hand.

Show supported workflows and aliases:

```sh
npm --silent run catalog:recommend -- --list
```

Recommend a small Actions/CI set:

```sh
npm --silent run catalog:recommend -- --workflow actions
```

Print only install commands for notification triage:

```sh
npm --silent run catalog:recommend -- --workflow notifications --format install
```

Return structured JSON for security and admin recommendations:

```sh
npm --silent run catalog:recommend -- --workflow security --format json
```

The recommendation helper is intentionally small. It points to a few reviewed starting options, then leaves the final install decision to you.

The same workflow sets are published as a human-readable [Workflow Recommendations](recommendations.html) page and as JSON for automation.

## Compare Overlapping Extensions

Use `catalog:compare` when you have a short list but need to decide which extension fits the workflow.

Compare daily triage options:

```sh
npm --silent run catalog:compare -- gh-dash gh-notify gh-pr-review
```

Compare Actions/CI tools:

```sh
npm --silent run catalog:compare -- dlvhdr/gh-enhance fchimpan/gh-workflow-stats
```

Print only install commands after choosing a pair:

```sh
npm --silent run catalog:compare -- gh-poi gh-branch --format install
```

Return structured JSON for another tool:

```sh
npm --silent run catalog:compare -- gh-s gh-grep gh-find-code --format json
```

## Audit Installed Extensions

Use `catalog:audit-installed` when you want to compare your current `gh extension list` output with the atlas.

Prefer a browser tool? Open the [Installed Extension Audit](https://sjh9714.github.io/gh-extension-atlas/audit.html) page and paste `gh extension list` output there.

For a fuller walkthrough, read the [installed extension audit guide](guides/audit-installed-gh-extensions.md).

Audit locally installed extensions:

```sh
npm --silent run catalog:audit-installed
```

Pipe saved or live extension output into the audit:

```sh
gh extension list | npm --silent run catalog:audit-installed -- --stdin
```

Print install commands for missing Top Picks from a demo list:

```sh
npm --silent run catalog:audit-installed -- --demo --format install
```

## Use the Public API

Inspect the endpoint manifest:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json
```

List category endpoint URLs with `jq`:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json \
  | jq -r '.categories[] | [.name, .count, .json] | @tsv'
```

Fetch the complete reviewed catalog:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/extensions.json
```

Fetch the catalog as CSV for spreadsheet tools:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/extensions.csv
```

Inspect the catalog entry schema:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/extensions.schema.json
```

Search lightweight index records without downloading the full catalog:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/search-index.json \
  | jq -r '.[] | select(.keywords[]? == "actions") | [.repo, .category, .install] | @tsv'
```

Fetch workflow-first recommendations:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json \
  | jq -r '.[] | [.id, .label, (.entries | length)] | @tsv'
```

Inspect the workflow recommendation schema:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.schema.json
```

Print install commands for one recommendation workflow:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json \
  | jq -r '.[] | select(.id == "actions") | .entries[].install'
```

Print active community-maintained Actions/CI install commands:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/categories/actions-ci.json \
  | jq -r '.[] | select(.status == "active" and .official == false) | .install'
```

Review Top Picks install commands without cloning the repository:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
```

Review a starter pack install bundle:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/github-actions-operator.txt
```

Avoid piping these bundles directly into a shell. Review the commands first, then install only the extensions that fit your workflow.

## Read the Snapshot Carefully

The catalog is a reviewed snapshot, not a live ranking. Fields such as `stars`, `last_pushed_at`, `status`, and `verified_at` are useful for triage, but they should be checked again before adopting a tool in a production workflow.

Use `active` entries when you want a safer first try. Use `watch` or `stale` entries when the tool solves a specific problem, but verify compatibility before depending on it.
