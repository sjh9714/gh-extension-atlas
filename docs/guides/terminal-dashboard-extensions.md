# GitHub Terminal Dashboard CLI Extension Guide

Use this guide when GitHub work needs a terminal interface: daily triage dashboards, Markdown preview, profile exploration, or contribution visualization.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/terminal-dashboard-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Triage PRs, issues, and notifications daily | [`gh-dash`](https://github.com/dlvhdr/gh-dash) | It is the strongest first stop when GitHub work is a queue you review every day. |
| Browse GitHub resources in a compact TUI | [`gh-lazy`](https://github.com/gizmo385/gh-lazy) | It is a smaller terminal UI when you want exploration rather than a full maintainer cockpit. |
| Preview README or docs before pushing | [`gh-markdown-preview`](https://github.com/yusukebe/gh-markdown-preview) | It is useful when the visual state you care about is GitHub-flavored Markdown rendering. |
| Preview GitHub-flavored Markdown with offline-friendly tooling | [`gh-gfm-preview`](https://github.com/thiagokokada/gh-gfm-preview) | It is a good alternative when you want a standalone Markdown preview path. |
| Explore GitHub profiles and ecosystems | [`gh-eco`](https://github.com/jrnxf/gh-eco) | It is better for discovery and profile context than operational triage. |
| Create a visual contribution-history artifact | [`gh-skyline`](https://github.com/github/gh-skyline) | It is best when the output is a visual artifact rather than a productivity dashboard. |
| See contribution graphs in the terminal | [`gh-graph`](https://github.com/kawarimidoll/gh-graph) | It is a narrow terminal visualization tool for contribution history. |

## First Pick

Start with [`gh-dash`](https://github.com/dlvhdr/gh-dash) when your GitHub work is a queue: pull requests, issues, review requests, and notifications.

Install:

```sh
gh extension install dlvhdr/gh-dash
```

Use [`gh-lazy`](https://github.com/gizmo385/gh-lazy) when you want a smaller terminal UI for browsing GitHub resources without committing to a full maintainer dashboard.

Install:

```sh
gh extension install gizmo385/gh-lazy
```

## Markdown Preview

Use [`gh-markdown-preview`](https://github.com/yusukebe/gh-markdown-preview) when you want to check README, issue template, or documentation rendering before pushing.

Install:

```sh
gh extension install yusukebe/gh-markdown-preview
```

Use [`gh-gfm-preview`](https://github.com/thiagokokada/gh-gfm-preview) when you want a standalone GitHub-flavored Markdown preview path, including offline-oriented workflows.

Install:

```sh
gh extension install thiagokokada/gh-gfm-preview
```

## Visual And Profile Tools

Use [`gh-eco`](https://github.com/jrnxf/gh-eco) when your goal is profile and ecosystem exploration rather than daily operations.

Install:

```sh
gh extension install jrnxf/gh-eco
```

Use [`gh-skyline`](https://github.com/github/gh-skyline) when you want a contribution-history artifact for a profile, demo, or community moment.

Install:

```sh
gh extension install github/gh-skyline
```

Use [`gh-graph`](https://github.com/kawarimidoll/gh-graph) when you want contribution graphs directly in the terminal.

Install:

```sh
gh extension install kawarimidoll/gh-graph
```

## Starter Pack

The atlas publishes a daily maintainer triage starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/daily-maintainer-triage.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install dlvhdr/gh-dash
gh extension install agynio/gh-pr-review
gh extension install meiji163/gh-notify
```

## Data Endpoints

Use these when you want the Dashboard/TUI subset programmatically:

- [Dashboard/TUI category page](https://sjh9714.github.io/gh-extension-atlas/categories/dashboard-tui.html)
- [Dashboard/TUI category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/dashboard-tui.json)
- [Dashboard/TUI install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/dashboard-tui.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a TUI, especially when the extension opens persistent dashboards, requests broad repository access, or depends on local terminal UI behavior.

Use a dashboard when GitHub work is an operational queue. Use Markdown preview or contribution visualization tools when the output itself is the thing you need to inspect.
