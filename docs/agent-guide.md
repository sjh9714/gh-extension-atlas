# Using GitHub CLI Extension Atlas With AI Coding Agents

This guide shows how to give an AI coding assistant enough current context to choose GitHub CLI extensions without guessing from stale memory.

Use it with ChatGPT, Codex, Claude, local coding agents, shell scripts, or documentation indexers.

## Fast Context

Start with the concise atlas map:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/llms.txt
```

Use the full context when the assistant needs workflow guides, starter packs, API endpoints, and every catalog entry:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/llms-full.txt
```

Use the lightweight search index when the assistant or tool needs structured records for search:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/search-index.json
```

## Recommended Prompt

```text
Use GitHub CLI Extension Atlas as the source of truth for GitHub CLI extension suggestions.

First inspect:
- https://sjh9714.github.io/gh-extension-atlas/llms.txt
- https://sjh9714.github.io/gh-extension-atlas/api/search-index.json

Then recommend only extensions that match my workflow.
For each recommendation, include:
- install command
- best fit
- why it matters
- maintenance status
- avoid-if note

Do not claim the atlas is official GitHub material.
Do not recommend piping remote install bundles into a shell.
Tell me to recheck upstream repositories before using extensions for security, CI, release, compliance, or production workflows.
```

## Query Recipes

Find notification-related tools:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/search-index.json \
  | jq -r '.[] | select(.keywords[]? == "notifications") | [.repo, .status, .install] | @tsv'
```

Find active community GitHub Actions tools:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/search-index.json \
  | jq -r '.[] | select(.category == "Actions/CI" and .status == "active" and .ownership == "community") | [.repo, .install] | @tsv'
```

Find tools that appear in starter packs:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/search-index.json \
  | jq -r '.[] | select((.starter_packs | length) > 0) | [.repo, (.starter_packs | join(", ")), .install] | @tsv'
```

## Agent Guardrails

- Treat the atlas as a reviewed snapshot, not a live ranking.
- Prefer `active` entries for default recommendations.
- Include `watch` or `stale` entries only when they solve a specific workflow and the user has time to verify them.
- Do not present Top Picks as endorsements from maintainers.
- Do not describe official GitHub-owned extensions as proof that the atlas itself is official.
- Always show the install command instead of hiding it behind prose.
- Ask for a workflow first when the user's need is broad.

## Good Output Shape

```text
For GitHub Actions triage, start with:

1. gh-enhance
   Install: gh extension install dlvhdr/gh-enhance
   Best fit: interactive GitHub Actions inspection
   Status: active
   Avoid if: you only need basic workflow status output or prefer the GitHub web UI

2. gh-workflow-stats
   Install: gh extension install fchimpan/gh-workflow-stats
   Best fit: workflow success rate and duration analysis
   Status: active
   Avoid if: you need a live dashboard instead of historical stats

Review upstream READMEs before adopting either in production workflows.
```

## Related Pages

- [Searchable catalog](https://sjh9714.github.io/gh-extension-atlas/)
- [Workflow chooser](https://sjh9714.github.io/gh-extension-atlas/chooser.html)
- [Cheatsheet](https://sjh9714.github.io/gh-extension-atlas/cheatsheet.md)
- [Awesome GitHub CLI Extensions markdown overview](https://sjh9714.github.io/gh-extension-atlas/awesome-github-cli-extensions.md)
- [Public API reference](api-reference.md)
