# Data Recipes

The atlas is meant to be useful as both a README and a small data catalog. Local recipes use [`data/extensions.json`](../data/extensions.json) without requiring any external dependencies. Public endpoint recipes use the generated Pages API.

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

Inspect the catalog entry schema:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/extensions.schema.json
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
