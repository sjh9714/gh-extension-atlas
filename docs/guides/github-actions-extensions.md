# GitHub Actions CLI Extension Guide

Use this guide when `gh workflow list`, `gh run list`, or the GitHub Actions web UI tells you what happened, but you still need a faster way to choose the right terminal workflow.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/github-actions-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Inspect and manage workflows interactively | [`gh-enhance`](https://github.com/dlvhdr/gh-enhance) | It is a focused terminal UI for GitHub Actions. |
| Understand workflow health over time | [`gh-workflow-stats`](https://github.com/fchimpan/gh-workflow-stats) | It summarizes workflow and job success rate and execution time. |
| Run project checks before pushing | [`gh-signoff`](https://github.com/basecamp/gh-signoff) | It gives teams a repeatable local signoff step. |
| Test Actions locally | [`gh-act`](https://github.com/nektos/gh-act) | It wraps local GitHub Actions execution through the GitHub CLI. |
| Migrate another CI system into Actions | [`gh-actions-importer`](https://github.com/github/gh-actions-importer) | It is built for CI migration planning and automation. |
| Reduce runner cost | [`gh-slimify`](https://github.com/fchimpan/gh-slimify) | It looks for workflows that can move to slimmer GitHub-hosted runners. |
| Check organization-wide Actions status | [`gh-actions-status`](https://github.com/rsese/gh-actions-status) | It targets organization-level Actions reporting, but verify compatibility because the project is stale. |

## First Pick

Start with [`gh-enhance`](https://github.com/dlvhdr/gh-enhance) when you want a terminal UI for GitHub Actions workflows. It is the best first stop when your problem is navigation: finding workflow runs, inspecting status, and staying out of the browser while you triage.

Install:

```sh
gh extension install dlvhdr/gh-enhance
```

Use [`gh-workflow-stats`](https://github.com/fchimpan/gh-workflow-stats) when your problem is not one run, but a pattern across runs. It is better for questions like "which workflow is slow?" or "how often does this job fail?"

Install:

```sh
gh extension install fchimpan/gh-workflow-stats
```

## Local Checks

Use [`gh-signoff`](https://github.com/basecamp/gh-signoff) when a project has a known local verification path and you want a repeatable pre-merge check before CI spends time on the branch.

Install:

```sh
gh extension install basecamp/gh-signoff
```

Use [`gh-act`](https://github.com/nektos/gh-act) when you want local GitHub Actions execution. Treat local runs as a fast feedback loop, not as a perfect replacement for GitHub-hosted runners. Runner images, secrets, network access, permissions, and service containers can still differ.

Install:

```sh
gh extension install nektos/gh-act
```

## Migration And Operations

Use [`gh-actions-importer`](https://github.com/github/gh-actions-importer) when the job is migration from another CI system into GitHub Actions. It is heavyweight for day-to-day triage, but it is the right category of tool when migration is the problem.

Install:

```sh
gh extension install github/gh-actions-importer
```

Use [`gh-slimify`](https://github.com/fchimpan/gh-slimify) when GitHub-hosted runner cost or runner sizing is the question.

Install:

```sh
gh extension install fchimpan/gh-slimify
```

Use [`gh-actions-status`](https://github.com/rsese/gh-actions-status) only after checking current compatibility. It remains useful as an organization-level reporting idea, but the atlas marks it `stale`.

Install:

```sh
gh extension install rsese/gh-actions-status
```

## Starter Pack

The atlas publishes a small GitHub Actions starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/github-actions-operator.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install dlvhdr/gh-enhance
gh extension install fchimpan/gh-workflow-stats
gh extension install github/gh-actions-importer
```

## Data Endpoints

Use these when you want the Actions/CI subset programmatically:

- [Actions/CI category page](https://sjh9714.github.io/gh-extension-atlas/categories/actions-ci.html)
- [Actions/CI category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/actions-ci.json)
- [Actions/CI install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/actions-ci.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a tool for production workflows, especially when the extension will touch CI secrets, workflow permissions, or release automation.

Prefer active projects for default recommendations. Keep stale projects in view only when they solve a specific problem and you have time to verify them.
