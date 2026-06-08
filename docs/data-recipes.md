# Data Recipes

The atlas is meant to be useful as both a README and a small data catalog. These recipes use [`data/extensions.json`](../data/extensions.json) without requiring any external dependencies.

## Query the Catalog

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

## Read the Snapshot Carefully

The catalog is a reviewed snapshot, not a live ranking. Fields such as `stars`, `last_pushed_at`, `status`, and `verified_at` are useful for triage, but they should be checked again before adopting a tool in a production workflow.

Use `active` entries when you want a safer first try. Use `watch` or `stale` entries when the tool solves a specific problem, but verify compatibility before depending on it.
