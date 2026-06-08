# FAQ

## Is this an official GitHub project?

No. GitHub CLI Extension Atlas is an independent curated resource. Official GitHub-owned extensions are marked with `official: true` in the catalog, but the atlas itself is not an official GitHub project.

## Is this a complete list of every GitHub CLI extension?

No. The atlas is intentionally curated. It excludes archived repositories, unclear demos, one-off internal tools, and entries that do not appear broadly useful or installable through `gh extension install OWNER/REPO`.

## Why not rank everything by stars?

Stars are useful context, but they are not enough to choose a tool. The atlas emphasizes workflow fit, installability, maintenance status, documentation clarity, and nearby alternatives. Star counts are stored as reviewed snapshots, not live rankings.

## How do I choose a first extension?

Start from the workflow that hurts right now:

- PR, issue, and notification triage: `gh-dash`
- Inline pull request review: `gh-pr-review`
- GitHub Actions TUI: `gh-enhance`
- Workflow health stats: `gh-workflow-stats`
- Branch cleanup: `gh-poi`
- Markdown preview: `gh-markdown-preview`
- Repository search: `gh-s`

Use the [workflow chooser](https://sjh9714.github.io/gh-extension-atlas/chooser.html) when you want a guided starting point.

## Are install bundles safe to run?

Install bundles are plain-text convenience files. Review them first, then install only the extensions that match your workflow.

Avoid piping bundles directly into a shell:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt | sh
```

Inspect first instead:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
```

## How fresh is the catalog?

Each entry includes `verified_at`, `last_pushed_at`, `stars`, and `status`. These fields are refreshed during maintenance passes and checked by validation scripts. Recheck upstream repositories before adopting tools for security, CI, release, compliance, or production workflows.

## How do I suggest a missing extension?

Use the [Add extension issue form](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=add-extension.yml). A good suggestion includes the repository, install command, category, and the repeated workflow it solves.

## How do I fix a wrong description or category?

Use the [Fix metadata issue form](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=fix-metadata.yml). Include the repository name, the field that should change, and a short reason.

## Can maintainers link to their atlas page?

Yes, if the listing is accurate and the maintainer wants to point users to comparison context. Each generated extension detail page includes an optional badge snippet. See [maintainer badge snippets](maintainer-badges.md).

## When should I star the repository?

If the atlas helped you choose a GitHub CLI extension, avoid a bad install, or find a better workflow guide, a star helps other `gh` users discover it too. No star is required for corrections or suggestions.
