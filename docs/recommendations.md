# GitHub CLI Extension Workflow Recommendations

Use this page when you know the workflow, but you do not want to compare the full catalog by hand.

- Repository: https://github.com/sjh9714/gh-extension-atlas
- Searchable catalog: https://sjh9714.github.io/gh-extension-atlas/
- Workflow chooser: https://sjh9714.github.io/gh-extension-atlas/chooser.html
- Recommendations API: https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json
- Recommendations schema: https://sjh9714.github.io/gh-extension-atlas/api/recommendations.schema.json
- Reviewed snapshot: 2026-08-29

These are small starting sets, not endorsements or complete rankings. Review upstream READMEs before adopting extensions for security, CI, release, compliance, or production workflows.

## Daily maintainer triage

Aliases: `maintainer`, `dashboard`, `notifications`, `notify`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `dlvhdr/gh-dash` | Maintainers who live in PR, issue, and notification queues. | You prefer one-off commands over a persistent TUI. | active | `gh extension install dlvhdr/gh-dash` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html) |
| 2 | `agynio/gh-pr-review` | Reviewers who want inline PR review workflows in the terminal. | Your team reviews exclusively in the GitHub web UI. | active | `gh extension install agynio/gh-pr-review` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/agynio-gh-pr-review.html) |
| 3 | `meiji163/gh-notify` | Developers who want notification awareness without the browser. | You already manage notifications through email or mobile. | active | `gh extension install meiji163/gh-notify` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/meiji163-gh-notify.html) |

## PR and issue review

Aliases: `issues`, `review`, `pull-requests`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `agynio/gh-pr-review` | Reviewers who want inline PR review workflows in the terminal. | Your team reviews exclusively in the GitHub web UI. | active | `gh extension install agynio/gh-pr-review` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/agynio-gh-pr-review.html) |
| 2 | `github/gh-stack` | Teams that split large changes into dependent PRs. | Your team avoids stacked changes. | active | `gh extension install github/gh-stack` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-stack.html) |
| 3 | `einride/gh-dependabot` | Teams that process many dependency update pull requests. | You do not use Dependabot. | active | `gh extension install einride/gh-dependabot` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/einride-gh-dependabot.html) |

## GitHub Actions operations

Aliases: `ci`, `workflows`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `dlvhdr/gh-enhance` | Developers who want an interactive terminal UI for GitHub Actions workflows. | You only need basic workflow status output or prefer the GitHub web UI. | active | `gh extension install dlvhdr/gh-enhance` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-enhance.html) |
| 2 | `fchimpan/gh-workflow-stats` | CI owners investigating slow or flaky workflows. | You only need the latest run status. | active | `gh extension install fchimpan/gh-workflow-stats` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/fchimpan-gh-workflow-stats.html) |
| 3 | `github/gh-actions-importer` | Enterprise teams migrating from other CI systems. | Your project is already on GitHub Actions. | active | `gh extension install github/gh-actions-importer` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-actions-importer.html) |

## AI and agent workflows

Aliases: `agents`, `models`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `github/gh-aw` | Developers experimenting with GitHub-native agent workflows. | You are not using agentic automation yet. | active | `gh extension install github/gh-aw` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-aw.html) |
| 2 | `github/gh-models` | Developers testing prompts and models from the terminal. | You do not use GitHub Models. | active | `gh extension install github/gh-models` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-models.html) |
| 3 | `shuymn/gh-mcp` | Users connecting AI tools to GitHub through MCP. | You do not use MCP-compatible clients. | active | `gh extension install shuymn/gh-mcp` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/shuymn-gh-mcp.html) |

## Local branch cleanup

Aliases: `branch`, `cleanup`, `repo-cleanup`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `seachicken/gh-poi` | Developers who want a trustworthy branch cleanup default. | You want to manually inspect every branch before deletion. | active | `gh extension install seachicken/gh-poi` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/seachicken-gh-poi.html) |
| 2 | `mislav/gh-branch` | Developers with many local branches. | You want only automated cleanup rather than manual selection. | watch | `gh extension install mislav/gh-branch` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/mislav-gh-branch.html) |
| 3 | `redraw/gh-install` | Developers who often install tools from GitHub releases. | You already use a package manager for all release binaries. | active | `gh extension install redraw/gh-install` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/redraw-gh-install.html) |

## Documentation review

Aliases: `markdown`, `readme`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `yusukebe/gh-markdown-preview` | README, issue template, and documentation review. | You need fully offline preview support. | active | `gh extension install yusukebe/gh-markdown-preview` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/yusukebe-gh-markdown-preview.html) |
| 2 | `thiagokokada/gh-gfm-preview` | Writers who need Markdown preview without relying on GitHub web UI. | You only need the simplest browser-based preview. | active | `gh extension install thiagokokada/gh-gfm-preview` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/thiagokokada-gh-gfm-preview.html) |

## Search and discovery

Aliases: `discovery`, `code-search`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `gennaro-tedesco/gh-s` | Finding repositories quickly from a terminal workflow. | You need advanced code search rather than repository search. | active | `gh extension install gennaro-tedesco/gh-s` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/gennaro-tedesco-gh-s.html) |
| 2 | `k1LoW/gh-grep` | Searching repository content without cloning. | You need local ripgrep speed across checked-out code. | active | `gh extension install k1LoW/gh-grep` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/k1low-gh-grep.html) |
| 3 | `LangLangBart/gh-find-code` | Developers who want interactive code search from the terminal. | You need local search inside a checked-out repository. | active | `gh extension install LangLangBart/gh-find-code` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/langlangbart-gh-find-code.html) |

## Security and admin

Aliases: `admin`, `compliance`

| Rank | Extension | Best fit | Avoid if | Status | Install | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `advanced-security/gh-sbom` | Teams that need SBOM output during release or compliance work. | Your SBOM workflow is already handled by another build step. | watch | `gh extension install advanced-security/gh-sbom` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/advanced-security-gh-sbom.html) |
| 2 | `Link-/gh-token` | Developers working with GitHub App authentication. | You only use personal access tokens or browser flows. | active | `gh extension install Link-/gh-token` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/link-gh-token.html) |
| 3 | `github/gh-gei` | Enterprise teams migrating repositories to GitHub Enterprise Cloud. | You are not running GitHub migration projects. | active | `gh extension install github/gh-gei` | [detail](https://sjh9714.github.io/gh-extension-atlas/extensions/github-gh-gei.html) |

## Local Usage

```sh
npm --silent run catalog:recommend -- --list
npm --silent run catalog:recommend -- --workflow actions
npm --silent run catalog:recommend -- --workflow notifications --format install
```

## Public API Usage

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/api/recommendations.json \
  | jq -r '.[] | select(.id == "actions") | .entries[].install'
```

## Guardrails

- Install only the extensions that match your workflow.
- Do not pipe remote install bundles directly into a shell.
- Treat star counts and maintenance status as reviewed snapshots, not live guarantees.
- Open a correction if a summary, category, install command, or maintenance label is wrong: https://github.com/sjh9714/gh-extension-atlas/issues/new/choose
