# GitHub PR And Issue Triage CLI Extension Guide

Use this guide when maintainer work is split across pull requests, review threads, stacked changes, dependency updates, issue search, and milestones.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/pr-issue-triage-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Resolve inline PR review threads | [`gh-pr-review`](https://github.com/agynio/gh-pr-review) | It is best when review comments and replies are the main workflow. |
| Manage stacked pull requests | [`gh-stack`](https://github.com/github/gh-stack) | It is useful when large changes are split into dependent PRs. |
| Review pull requests in a focused terminal flow | [`gh-prism`](https://github.com/kawarimidoll/gh-prism) | It is a compact PR review option when you do not need a full dashboard. |
| Process Dependabot pull requests | [`gh-dependabot`](https://github.com/einride/gh-dependabot) | It targets the dependency-update review queue directly. |
| Bulk triage dependency update queues | [`gh-dep`](https://github.com/jackchuka/gh-dep) | It is a TUI for teams with many Dependabot or Renovate PRs. |
| Measure PR review health | [`gh-metrics`](https://github.com/hectcastro/gh-metrics) | It summarizes PR timing and review metrics instead of individual PR details. |
| Search issues interactively | [`gh-i`](https://github.com/gennaro-tedesco/gh-i) | It is a focused issue search flow; verify fit because it is marked `watch`. |
| Rank apparently unclaimed contributor issues | [`gh-issue-scout`](https://github.com/Zer0codestuff/gh-issue-scout) | It scores recent issues and filters assignment or recent claim evidence. |
| Create branches and PRs from issues | [`gh-sherpa`](https://github.com/InditexTech/gh-sherpa) | It is good when work starts from a Jira or GitHub issue. |
| Manage milestones from the terminal | [`gh-milestone`](https://github.com/valeriobelli/gh-milestone) | It is useful when milestone planning is part of maintainer work. |
| Query GitHub Projects with SQL | [`gh-sql`](https://github.com/KOBA789/gh-sql) | It is powerful for advanced project data queries, but verify compatibility because it is stale. |

## First Pick

Start with [`gh-pr-review`](https://github.com/agynio/gh-pr-review) when the pain is inline review threads: finding comments, replying, and resolving feedback without opening every PR page.

Install:

```sh
gh extension install agynio/gh-pr-review
```

Use [`gh-stack`](https://github.com/github/gh-stack) when the problem is change shape: dependent pull requests, stacked diffs, and review context across a sequence.

Install:

```sh
gh extension install github/gh-stack
```

Use [`gh-prism`](https://github.com/kawarimidoll/gh-prism) when you want a focused PR review experience rather than a full dashboard.

Install:

```sh
gh extension install kawarimidoll/gh-prism
```

## Dependency PR Queues

Use [`gh-dependabot`](https://github.com/einride/gh-dependabot) when the queue is specifically Dependabot pull requests.

Install:

```sh
gh extension install einride/gh-dependabot
```

Use [`gh-dep`](https://github.com/jackchuka/gh-dep) when dependency update queues need a TUI and you want to process many updates in one place.

Install:

```sh
gh extension install jackchuka/gh-dep
```

## Metrics, Issues, And Planning

Use [`gh-metrics`](https://github.com/hectcastro/gh-metrics) when your question is about review process health rather than one pull request.

Install:

```sh
gh extension install hectcastro/gh-metrics
```

Use [`gh-i`](https://github.com/gennaro-tedesco/gh-i) when issue search is the repeated workflow. The atlas marks it `watch`, so check current fit before depending on it.

Install:

```sh
gh extension install gennaro-tedesco/gh-i
```

Use [`gh-issue-scout`](https://github.com/Zer0codestuff/gh-issue-scout) when you are choosing work across repositories. It ranks recent issues by transparent activity signals and filters assignment or recent claim comments. Use `gh-i` instead when you want an interactive issue search without availability scoring.

Install:

```sh
gh extension install Zer0codestuff/gh-issue-scout
```

Use [`gh-sherpa`](https://github.com/InditexTech/gh-sherpa) when work starts from a Jira or GitHub issue and you want branch and PR creation to follow.

Install:

```sh
gh extension install InditexTech/gh-sherpa
```

Use [`gh-milestone`](https://github.com/valeriobelli/gh-milestone) when milestone planning is part of your maintainer loop.

Install:

```sh
gh extension install valeriobelli/gh-milestone
```

Use [`gh-sql`](https://github.com/KOBA789/gh-sql) only after checking compatibility. It can be powerful for GitHub Projects data, but the atlas marks it `stale`.

Install:

```sh
gh extension install KOBA789/gh-sql
```

## Starter Pack

The atlas publishes a PR review and issue triage starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/pr-review-and-issue-triage.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install agynio/gh-pr-review
gh extension install github/gh-stack
gh extension install einride/gh-dependabot
```

## Data Endpoints

Use these when you want the PR & Issues subset programmatically:

- [PR & Issues category page](https://sjh9714.github.io/gh-extension-atlas/categories/pr-issues.html)
- [PR & Issues category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/pr-issues.json)
- [PR & Issues install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/pr-issues.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a PR or issue tool, especially when it can comment, resolve threads, update pull requests, or query project data.

Use review tools when comments are the work, stack tools when the change shape is the problem, and metrics or milestone tools when you are planning or improving the process.
