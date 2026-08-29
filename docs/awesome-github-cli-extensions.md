# Awesome GitHub CLI Extensions

A curated field guide to useful GitHub CLI extensions: what to install, when to use them, and which ones are maintained.

- Repository: https://github.com/sjh9714/gh-extension-atlas
- Searchable catalog: https://sjh9714.github.io/gh-extension-atlas/
- Workflow chooser: https://sjh9714.github.io/gh-extension-atlas/chooser.html
- Cheatsheet: https://sjh9714.github.io/gh-extension-atlas/cheatsheet.md
- Agent guide: https://sjh9714.github.io/gh-extension-atlas/agent-guide.md
- Reviewed snapshot: 2026-08-29
- Catalog size: 69 extensions
- Status counts: 50 active, 9 watch, 10 stale

## Start Here

Use this page when `gh extension search` gives too many overlapping options. Pick the workflow that hurts right now, inspect the linked detail pages, and install only the extensions that match your project.

| Workflow | First stop | Why |
| --- | --- | --- |
| Daily PR, issue, and notification triage | [`dash`](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html) | One maintained TUI covers the daily GitHub queue. |
| Interactive GitHub Actions inspection | [`enhance`](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-enhance.html) | A focused terminal interface for GitHub Actions workflows. |
| Workflow health debugging | [`workflow-stats`](https://sjh9714.github.io/gh-extension-atlas/extensions/fchimpan-gh-workflow-stats.html) | Summarizes success rate and duration for workflows and jobs. |
| Safe branch cleanup | [`poi`](https://sjh9714.github.io/gh-extension-atlas/extensions/seachicken-gh-poi.html) | Removes merged branches without making you inspect every ref manually. |
| Markdown preview before publishing | [`markdown-preview`](https://sjh9714.github.io/gh-extension-atlas/extensions/yusukebe-gh-markdown-preview.html) | Shows GitHub-flavored Markdown before you push. |
| Repository search | [`s`](https://sjh9714.github.io/gh-extension-atlas/extensions/gennaro-tedesco-gh-s.html) | Adds a compact interactive repository search flow. |

## Top Picks

| Extension | Best for | Install | Status |
| --- | --- | --- | --- |
| [`dash`](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html) | Maintainers who live in PR, issue, and notification queues. | `gh extension install dlvhdr/gh-dash` | active |
| [`aw`](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-aw.html) | Developers experimenting with GitHub-native agent workflows. | `gh extension install github/gh-aw` | active |
| [`stack`](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-stack.html) | Teams that split large changes into dependent PRs. | `gh extension install github/gh-stack` | active |
| [`poi`](https://sjh9714.github.io/gh-extension-atlas/extensions/seachicken-gh-poi.html) | Developers who want a trustworthy branch cleanup default. | `gh extension install seachicken/gh-poi` | active |
| [`markdown-preview`](https://sjh9714.github.io/gh-extension-atlas/extensions/yusukebe-gh-markdown-preview.html) | README, issue template, and documentation review. | `gh extension install yusukebe/gh-markdown-preview` | active |
| [`sbom`](https://sjh9714.github.io/gh-extension-atlas/extensions/advanced-security-gh-sbom.html) | Teams that need SBOM output during release or compliance work. | `gh extension install advanced-security/gh-sbom` | watch |
| [`s`](https://sjh9714.github.io/gh-extension-atlas/extensions/gennaro-tedesco-gh-s.html) | Finding repositories quickly from a terminal workflow. | `gh extension install gennaro-tedesco/gh-s` | active |
| [`notify`](https://sjh9714.github.io/gh-extension-atlas/extensions/meiji163-gh-notify.html) | Developers who want notification awareness without the browser. | `gh extension install meiji163/gh-notify` | active |
| [`pr-review`](https://sjh9714.github.io/gh-extension-atlas/extensions/agynio-gh-pr-review.html) | Reviewers who want inline PR review workflows in the terminal. | `gh extension install agynio/gh-pr-review` | active |
| [`workflow-stats`](https://sjh9714.github.io/gh-extension-atlas/extensions/fchimpan-gh-workflow-stats.html) | CI owners investigating slow or flaky workflows. | `gh extension install fchimpan/gh-workflow-stats` | active |

## Workflow Guides

| Guide | Use this when... |
| --- | --- |
| [GitHub Terminal Dashboard CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/terminal-dashboard-extensions.html) | Choose a GitHub terminal dashboard, Markdown preview TUI, or visual contribution tool. |
| [GitHub Actions CLI extension guide](https://sjh9714.github.io/gh-extension-atlas/guides/github-actions-extensions.html) | Choose an Actions TUI, local runner, migration, or workflow health extension. |
| [GitHub AI And Agent CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/ai-agent-extensions.html) | Choose a GitHub agent workflow, Models, standup, or MCP helper. |
| [Git Branch Cleanup CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/branch-cleanup-extensions.html) | Choose a safe local branch cleanup, branch switching, or worktree helper. |
| [GitHub Notification Triage CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/notification-triage-extensions.html) | Choose a terminal notification viewer, rules helper, cleanup tool, or broader triage dashboard. |
| [GitHub PR And Issue Triage CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/pr-issue-triage-extensions.html) | Choose a PR review, stacked PR, dependency PR, metrics, issue search, or milestone helper. |
| [GitHub Repository Search CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/repository-search-extensions.html) | Choose a repository search, code search, starred-repository, or local clone helper. |
| [GitHub Security And Admin CLI Extension Guide](https://sjh9714.github.io/gh-extension-atlas/guides/security-admin-extensions.html) | Choose an SBOM, CodeQL, token, webhook, repository config, or migration helper. |

## Starter Packs

Review bundle contents before installing. Do not pipe remote install bundles directly into a shell.

| Starter pack | Install bundle | Repos |
| --- | --- | --- |
| Daily Maintainer Triage | [daily-maintainer-triage.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/daily-maintainer-triage.txt) | `dlvhdr/gh-dash`, `agynio/gh-pr-review`, `meiji163/gh-notify` |
| PR Review And Issue Triage | [pr-review-and-issue-triage.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/pr-review-and-issue-triage.txt) | `agynio/gh-pr-review`, `github/gh-stack`, `einride/gh-dependabot` |
| GitHub Actions Operator | [github-actions-operator.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/github-actions-operator.txt) | `dlvhdr/gh-enhance`, `fchimpan/gh-workflow-stats`, `github/gh-actions-importer` |
| AI And Agents | [ai-and-agents.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/ai-and-agents.txt) | `github/gh-aw`, `github/gh-models`, `shuymn/gh-mcp` |
| Local Repository Cleanup | [local-repository-cleanup.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/local-repository-cleanup.txt) | `seachicken/gh-poi`, `mislav/gh-branch`, `redraw/gh-install` |
| Documentation Review | [documentation-review.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/documentation-review.txt) | `yusukebe/gh-markdown-preview`, `thiagokokada/gh-gfm-preview` |
| Search And Discovery | [search-and-discovery.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/search-and-discovery.txt) | `gennaro-tedesco/gh-s`, `k1LoW/gh-grep`, `LangLangBart/gh-find-code` |
| Security And Admin | [security-and-admin.txt](https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/security-and-admin.txt) | `advanced-security/gh-sbom`, `Link-/gh-token`, `github/gh-gei` |

## Public Data

- API manifest: https://sjh9714.github.io/gh-extension-atlas/api/index.json
- Full catalog JSON: https://sjh9714.github.io/gh-extension-atlas/api/extensions.json
- Top Picks JSON: https://sjh9714.github.io/gh-extension-atlas/api/top-picks.json
- Starter packs JSON: https://sjh9714.github.io/gh-extension-atlas/api/starter-packs.json
- All install commands: https://sjh9714.github.io/gh-extension-atlas/install/all.txt
- Top Picks install commands: https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
- LLM context: https://sjh9714.github.io/gh-extension-atlas/llms.txt

## Guardrails

- This is an independent curated resource, not an official GitHub project.
- The atlas is intentionally curated, not a complete directory of every repository with the `gh-extension` topic.
- Star counts and maintenance labels are reviewed snapshots, not live rankings.
- Recheck upstream repositories before adopting extensions for security, CI, release, compliance, or production workflows.
- Corrections are welcome: https://github.com/sjh9714/gh-extension-atlas/issues/new/choose
