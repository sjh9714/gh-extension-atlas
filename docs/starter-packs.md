# Starter Packs

These packs are small starting points, not install-everything bundles. Install one extension, try it in a real workflow, then add the next one only if it solves a different problem.

Each command assumes GitHub CLI is installed and authenticated with `gh auth login`.

## Daily Maintainer Triage

Best when you review pull requests, track issues, and keep an eye on notifications from the terminal.

```sh
gh extension install dlvhdr/gh-dash
gh extension install agynio/gh-pr-review
gh extension install meiji163/gh-notify
```

Use `gh-dash` first if you want one dashboard for PRs, issues, and notifications. Add `gh-pr-review` when inline review threads are the pain point. Add `gh-notify` only if browser notifications are the specific workflow you want to replace.

## GitHub Actions Operator

Best when CI debugging, workflow inspection, or migration work shows up repeatedly.

```sh
gh extension install dlvhdr/gh-enhance
gh extension install fchimpan/gh-workflow-stats
gh extension install github/gh-actions-importer
```

Use `gh-enhance` for an interactive Actions TUI. Use `gh-workflow-stats` when you need success-rate and duration data. Use `gh-actions-importer` for CI migration work, not day-to-day workflow browsing.

## Local Repository Cleanup

Best when stale local branches and repository switching slow down daily work.

```sh
gh extension install seachicken/gh-poi
gh extension install mislav/gh-branch
gh extension install redraw/gh-install
```

Use `gh-poi` first for merged branch cleanup. Add `gh-branch` when fuzzy branch switching matters. Add `gh-install` when you often install binaries from GitHub releases.

## Documentation Review

Best when README, issue template, or docs rendering problems are easy to miss before publishing.

```sh
gh extension install yusukebe/gh-markdown-preview
gh extension install thiagokokada/gh-gfm-preview
```

Start with `gh-markdown-preview` for GitHub-like rendering. Use `gh-gfm-preview` when you want a standalone GitHub-flavored Markdown preview path.

## Security And Admin

Best when repository security, SBOM, token, or enterprise migration tasks are part of your role.

```sh
gh extension install advanced-security/gh-sbom
gh extension install Link-/gh-token
gh extension install github/gh-gei
```

Use `gh-sbom` for software bill of materials generation. Use `gh-token` for GitHub App installation tokens. Use `gh-gei` for enterprise migration workflows.

## Search And Discovery

Best when you want faster repository, code, or starred-repository discovery from the terminal.

```sh
gh extension install gennaro-tedesco/gh-s
gh extension install k1LoW/gh-grep
gh extension install LangLangBart/gh-find-code
```

Use `gh-s` first for interactive repository search. Add `gh-grep` when repository content search matters. Add `gh-find-code` when you want interactive code search with fzf-style selection.

## AI And Agents

Best when you are experimenting with GitHub-native agent workflows or model access.

```sh
gh extension install github/gh-aw
gh extension install github/gh-models
gh extension install shuymn/gh-mcp
```

Use `gh-aw` for GitHub agentic workflows. Use `gh-models` for GitHub Models from the terminal. Use `gh-mcp` when you want GitHub MCP Server setup through existing `gh` authentication.

## Choosing A Pack

| If you only know the symptom...           | Start with              |
| ----------------------------------------- | ----------------------- |
| Too many PRs, issues, and notifications   | Daily Maintainer Triage |
| CI failures need faster inspection        | GitHub Actions Operator |
| Local branches keep piling up             | Local Repository Cleanup |
| Markdown looks different after pushing    | Documentation Review    |
| Security or migration work is repetitive  | Security And Admin      |
| Searching GitHub from the browser is slow | Search And Discovery    |
| You are testing GitHub AI workflows       | AI And Agents           |

Prefer the catalog browser when you need filters instead of a starter pack: https://sjh9714.github.io/gh-extension-atlas/
