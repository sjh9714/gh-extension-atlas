# GitHub CLI Extension Cheatsheet

A compact quick reference for choosing a first GitHub CLI extension from the reviewed atlas.

- Repository: https://github.com/sjh9714/gh-extension-atlas
- Searchable catalog: https://sjh9714.github.io/gh-extension-atlas/
- Workflow chooser: https://sjh9714.github.io/gh-extension-atlas/chooser.html
- Reviewed snapshot: 2026-08-29
- Catalog size: 69 extensions

## Pick By Workflow

| If you need... | Try first | Install | Detail |
| --- | --- | --- | --- |
| PRs, issues, and notifications in one place | `dash` | `gh extension install dlvhdr/gh-dash` | [dlvhdr/gh-dash](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html) |
| Inline pull request review threads | `pr-review` | `gh extension install agynio/gh-pr-review` | [agynio/gh-pr-review](https://sjh9714.github.io/gh-extension-atlas/extensions/agynio-gh-pr-review.html) |
| Interactive GitHub Actions inspection | `enhance` | `gh extension install dlvhdr/gh-enhance` | [dlvhdr/gh-enhance](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-enhance.html) |
| Workflow success rate and duration | `workflow-stats` | `gh extension install fchimpan/gh-workflow-stats` | [fchimpan/gh-workflow-stats](https://sjh9714.github.io/gh-extension-atlas/extensions/fchimpan-gh-workflow-stats.html) |
| Safe merged branch cleanup | `poi` | `gh extension install seachicken/gh-poi` | [seachicken/gh-poi](https://sjh9714.github.io/gh-extension-atlas/extensions/seachicken-gh-poi.html) |
| GitHub-flavored Markdown preview | `markdown-preview` | `gh extension install yusukebe/gh-markdown-preview` | [yusukebe/gh-markdown-preview](https://sjh9714.github.io/gh-extension-atlas/extensions/yusukebe-gh-markdown-preview.html) |
| Repository search from the terminal | `s` | `gh extension install gennaro-tedesco/gh-s` | [gennaro-tedesco/gh-s](https://sjh9714.github.io/gh-extension-atlas/extensions/gennaro-tedesco-gh-s.html) |
| Terminal GitHub notification display | `notify` | `gh extension install meiji163/gh-notify` | [meiji163/gh-notify](https://sjh9714.github.io/gh-extension-atlas/extensions/meiji163-gh-notify.html) |
| SBOM generation | `sbom` | `gh extension install advanced-security/gh-sbom` | [advanced-security/gh-sbom](https://sjh9714.github.io/gh-extension-atlas/extensions/advanced-security-gh-sbom.html) |
| Agentic GitHub workflows | `aw` | `gh extension install github/gh-aw` | [github/gh-aw](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-aw.html) |

## Top Picks Install Commands

```sh
gh extension install dlvhdr/gh-dash
gh extension install github/gh-aw
gh extension install github/gh-stack
gh extension install seachicken/gh-poi
gh extension install yusukebe/gh-markdown-preview
gh extension install advanced-security/gh-sbom
gh extension install gennaro-tedesco/gh-s
gh extension install meiji163/gh-notify
gh extension install agynio/gh-pr-review
gh extension install fchimpan/gh-workflow-stats
```

## Starter Pack Bundles

Review each bundle before installing. Do not pipe remote install bundles directly into a shell.

| Workflow | Bundle | First repos |
| --- | --- | --- |
| Daily Maintainer Triage | [daily-maintainer-triage.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/daily-maintainer-triage.txt) | `dlvhdr/gh-dash`, `agynio/gh-pr-review`, `meiji163/gh-notify` |
| PR Review And Issue Triage | [pr-review-and-issue-triage.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/pr-review-and-issue-triage.txt) | `agynio/gh-pr-review`, `github/gh-stack`, `einride/gh-dependabot` |
| GitHub Actions Operator | [github-actions-operator.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/github-actions-operator.txt) | `dlvhdr/gh-enhance`, `fchimpan/gh-workflow-stats`, `github/gh-actions-importer` |
| AI And Agents | [ai-and-agents.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/ai-and-agents.txt) | `github/gh-aw`, `github/gh-models`, `shuymn/gh-mcp` |
| Local Repository Cleanup | [local-repository-cleanup.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/local-repository-cleanup.txt) | `seachicken/gh-poi`, `mislav/gh-branch`, `redraw/gh-install` |
| Documentation Review | [documentation-review.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/documentation-review.txt) | `yusukebe/gh-markdown-preview`, `thiagokokada/gh-gfm-preview` |
| Search And Discovery | [search-and-discovery.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/search-and-discovery.txt) | `gennaro-tedesco/gh-s`, `k1LoW/gh-grep`, `LangLangBart/gh-find-code` |
| Security And Admin | [security-and-admin.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/security-and-admin.txt) | `advanced-security/gh-sbom`, `Link-/gh-token`, `github/gh-gei` |

## API Shortcuts

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/index.json
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/top-picks.json
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/starter-packs.json
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
```

## Guardrails

- This is an independent curated resource, not an official GitHub project.
- Star counts and maintenance status are reviewed snapshots, not live rankings.
- Recheck upstream repositories before adopting extensions for security, compliance, CI, release, or production workflows.
- Open a correction if a summary, category, install command, or maintenance label is wrong: https://github.com/sjh9714/gh-extension-atlas/issues/new/choose
