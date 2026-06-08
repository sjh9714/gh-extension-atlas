# Awesome GitHub CLI Extension Atlas [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![Validate](https://github.com/sjh9714/gh-extension-atlas/actions/workflows/validate.yml/badge.svg)](https://github.com/sjh9714/gh-extension-atlas/actions/workflows/validate.yml)
[![Release](https://img.shields.io/github/v/release/sjh9714/gh-extension-atlas?sort=semver)](https://github.com/sjh9714/gh-extension-atlas/releases/tag/v0.1.0)
[![License: CC0-1.0](https://img.shields.io/badge/license-CC0--1.0-lightgrey.svg)](LICENSE)
![Extensions: 68](https://img.shields.io/badge/extensions-68-blue.svg)

> A curated field guide to GitHub CLI extensions: what to install, when to use them, and which ones are actively maintained.

GitHub CLI has hundreds of public extensions. This atlas helps you choose the right one quickly by combining human recommendations with a small machine-readable catalog.

If `gh extension search` gives you too many options, start here.

## Contents

- [Quick Start](#quick-start)
- [Start Here](#start-here)
- [Starter Packs](#starter-packs)
- [Who should use this](#who-should-use-this)
- [Why this exists](#why-this-exists)
- [Selection Criteria](#selection-criteria)
- [Top Picks](#top-picks)
- [Find by Use Case](#find-by-use-case)
- [Comparison Guides](#comparison-guides)
- [Catalog Browser](#catalog-browser)
- [Dashboard/TUI](#dashboardtui)
- [PR & Issues](#pr--issues)
- [Actions/CI](#actionsci)
- [Repo & Branch](#repo--branch)
- [Search](#search)
- [Notifications](#notifications)
- [Security/Admin](#securityadmin)
- [AI/Agents](#aiagents)
- [Data](#data)
- [Data Recipes](#data-recipes)
- [Metadata Refresh](#metadata-refresh)
- [Feedback](#feedback)
- [For Extension Maintainers](#for-extension-maintainers)

## Quick Start

Install the GitHub CLI, authenticate with `gh auth login`, then install any extension with:

```sh
gh extension install OWNER/REPO
```

This list favors extensions that are installable, documented, not archived, and useful for repeated terminal workflows.

Prefer browsing first? The catalog browser supports filters and bulk command copy, and starter packs provide small workflow-specific install sequences.

## Start Here

If you only have a few minutes, start from the workflow that hurts right now.

| If you need to...                     | Try first             | Why this is the first stop                                              |
| ------------------------------------- | --------------------- | ----------------------------------------------------------------------- |
| Triage PRs, issues, and notifications | `gh-dash`             | One maintained TUI covers the daily GitHub queue.                       |
| Review PR threads in the terminal     | `gh-pr-review`        | Focuses on inline review comments instead of a full dashboard.          |
| Inspect GitHub Actions interactively  | `gh-enhance`          | Gives Actions workflows a focused terminal interface.                   |
| Measure workflow health               | `gh-workflow-stats`   | Summarizes success rates and run duration for CI debugging.             |
| Clean local merged branches           | `gh-poi`              | Removes merged branches without making you inspect every ref manually.  |
| Preview README or docs rendering      | `gh-markdown-preview` | Shows GitHub-flavored Markdown before you publish.                      |
| Search repositories from the terminal | `gh-s`                | Adds a compact interactive repository search flow.                      |

## Starter Packs

Use the [starter packs](docs/starter-packs.md) when you want a small install sequence for a specific workflow instead of browsing the full catalog.

| Workflow                  | First extensions to compare                              |
| ------------------------- | -------------------------------------------------------- |
| Daily maintainer triage   | `gh-dash`, `gh-pr-review`, `gh-notify`                   |
| GitHub Actions operations | `gh-enhance`, `gh-workflow-stats`, `gh-actions-importer` |
| Local repository cleanup  | `gh-poi`, `gh-branch`, `gh-install`                      |
| Documentation review      | `gh-markdown-preview`, `gh-gfm-preview`                  |
| Security and admin        | `gh-sbom`, `gh-token`, `gh-gei`                          |
| Search and discovery      | `gh-s`, `gh-grep`, `gh-user-stars`                       |
| AI and agents             | `gh-aw`, `gh-models`, `gh-mcp`                           |

## Who should use this

Use this atlas when you know GitHub CLI can probably help, but you do not want to install five overlapping extensions to find the right one.

| You are...                      | Start here                                                                  |
| ------------------------------- | --------------------------------------------------------------------------- |
| A daily `gh` user               | Try Top Picks and the dashboard, branch cleanup, and search categories.     |
| An open source maintainer       | Start with PR review, notifications, milestone, and triage tools.           |
| A security or platform engineer | Review SBOM, CodeQL, repository configuration, token, and migration tools.  |
| Exploring AI and agents         | Compare `gh-aw`, `gh-models`, `gh-standup`, and `gh-mcp`.                   |
| Maintaining an extension        | Check your listing and open a correction if the category or wording is off. |

## Why this exists

`gh extension search` is useful when you already know what to look for. This atlas is for the harder moment before that: choosing which extension is worth installing, comparing overlapping tools, and checking whether a project still looks maintained.

The goal is not to list every repository with the `gh-extension` topic. The goal is to make the first useful choice faster.

## Selection Criteria

Every listed extension should be:

| Signal                    | Requirement                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| Installable               | The repository name starts with `gh-` and supports `gh extension install OWNER/REPO`.             |
| Publicly useful           | The extension solves a repeatable workflow for more than one project or team.                     |
| Not archived              | Archived repositories are excluded from the atlas.                                                |
| Documented                | The README or release notes explain what the extension does.                                      |
| Maintained status labeled | `active`, `watch`, or `stale` is shown so readers can decide how much risk to accept.             |
| Manually reviewed         | Top Picks are installed with isolated `GH_CONFIG_DIR` and `XDG_DATA_HOME` paths before promotion. |

## Top Picks

These are the first extensions to evaluate if you want broad value fast.

| Extension             | Install                                             | Best for                  | Why it matters                                                               | Status |
| --------------------- | --------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------- | ------ |
| `gh-dash`             | `gh extension install dlvhdr/gh-dash`               | Daily GitHub triage       | Turns PRs, issues, and notifications into a fast terminal dashboard.         | active |
| `gh-aw`               | `gh extension install github/gh-aw`                 | Agentic workflows         | Official GitHub project for running agent workflows from the CLI.            | active |
| `gh-stack`            | `gh extension install github/gh-stack`              | Stacked pull requests     | Gives teams a GitHub-native way to manage dependent PRs.                     | active |
| `gh-poi`              | `gh extension install seachicken/gh-poi`            | Branch cleanup            | Safely removes merged branches without making you inspect every ref by hand. | active |
| `gh-markdown-preview` | `gh extension install yusukebe/gh-markdown-preview` | README and docs review    | Previews Markdown the way GitHub renders it before you push.                 | active |
| `gh-sbom`             | `gh extension install advanced-security/gh-sbom`    | SBOM generation           | Creates software bills of materials from the terminal.                       | watch  |
| `gh-s`                | `gh extension install gennaro-tedesco/gh-s`         | Repository search         | Provides an interactive repository search flow in the terminal.              | active |
| `gh-notify`           | `gh extension install meiji163/gh-notify`           | Notifications             | Makes GitHub notifications visible without opening the browser.              | active |
| `gh-pr-review`        | `gh extension install agynio/gh-pr-review`          | Inline PR review          | Lets reviewers navigate and resolve PR review threads from the terminal.     | active |
| `gh-workflow-stats`   | `gh extension install fchimpan/gh-workflow-stats`   | CI health                 | Summarizes workflow success rate and duration for operational debugging.     | active |

## Find by Use Case

| If you need to...                     | Start with                                             |
| ------------------------------------- | ------------------------------------------------------ |
| See all your review work in one place | `gh-dash`, `gh-pr-review`, `gh-stack`                  |
| Clean local Git state                 | `gh-poi`, `gh-branch`, `gh-tidy`                       |
| Inspect CI and Actions usage          | `gh-signoff`, `gh-workflow-stats`, `gh-act`            |
| Search repositories, code, or stars   | `gh-s`, `gh-grep`, `gh-find-code`                      |
| Reduce notification noise             | `gh-dash`, `gh-notify`, `gh-not`, `gh-gonest`          |
| Check security or admin posture       | `gh-sbom`, `gh-token`, `gh-codeql`                     |
| Try AI and agent workflows            | `gh-aw`, `gh-models`, `gh-mcp`                         |

## Comparison Guides

| Guide                                                               | Best for                                                       |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| [Dashboard and TUI extensions](docs/comparisons/dashboards.md)      | Choosing a terminal dashboard or visual interface.             |
| [Branch cleanup extensions](docs/comparisons/branch-cleanup.md)     | Choosing a safe local branch cleanup workflow.                 |
| [Notification extensions](docs/comparisons/notifications.md)        | Reducing notification noise from the terminal.                 |
| [Markdown preview extensions](docs/comparisons/markdown-preview.md) | Previewing README and docs changes.                            |
| [Actions and CI extensions](docs/comparisons/actions-ci.md)         | Understanding CI migration, local checks, and workflow health. |

## Catalog Browser

Open the [searchable catalog browser](https://sjh9714.github.io/gh-extension-atlas/) to filter the same reviewed data by category, status, ownership, and search text. You can copy one install command, a starter pack, or every install command shown by the current filters.

Quick entry points:

| Start here                                                                           | Use this when...                                        |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [Top Picks][catalog-top-picks]                                                       | You want the shortest list of broadly useful choices.   |
| [Actions TUI][catalog-actions]                                                       | You want to inspect GitHub Actions from the terminal.   |
| [Notifications][catalog-notifications]                                               | You want GitHub notification tools without the browser. |
| [Branch cleanup][catalog-branches]                                                   | You want safer local branch cleanup options.            |
| [Security/Admin][catalog-security]                                                   | You want SBOM, CodeQL, token, or admin tooling.         |

[catalog-top-picks]: https://sjh9714.github.io/gh-extension-atlas/?featured=top
[catalog-actions]: https://sjh9714.github.io/gh-extension-atlas/?q=workflow&category=Actions%2FCI&status=active
[catalog-notifications]: https://sjh9714.github.io/gh-extension-atlas/?category=Notifications&status=active
[catalog-branches]: https://sjh9714.github.io/gh-extension-atlas/?q=branch+cleanup&category=Repo+%26+Branch&status=active
[catalog-security]: https://sjh9714.github.io/gh-extension-atlas/?category=Security%2FAdmin&status=active

Static category pages:

| Page                                                           | Use this when...                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------ |
| [Actions/CI extensions][category-actions-ci]                   | You want a focused page for GitHub Actions and CI tools.     |
| [AI/Agents extensions][category-ai-agents]                     | You want AI-assisted and agentic GitHub CLI workflows.       |
| [Dashboard/TUI extensions][category-dashboard-tui]             | You want terminal dashboards and visual interfaces.          |
| [Notification extensions][category-notifications]              | You want notification triage options without the browser.    |
| [PR & Issues extensions][category-pr-issues]                   | You want pull request, review, issue, and maintainer tools.  |
| [Repo & Branch extensions][category-repo-branch]               | You want branch cleanup and repository workflow helpers.     |
| [Search extensions][category-search]                           | You want repository, code, star, or user discovery tools.    |
| [Security/Admin extensions][category-security-admin]           | You want SBOM, CodeQL, token, migration, or admin tooling.   |

[category-actions-ci]: https://sjh9714.github.io/gh-extension-atlas/categories/actions-ci.html
[category-ai-agents]: https://sjh9714.github.io/gh-extension-atlas/categories/ai-agents.html
[category-dashboard-tui]: https://sjh9714.github.io/gh-extension-atlas/categories/dashboard-tui.html
[category-notifications]: https://sjh9714.github.io/gh-extension-atlas/categories/notifications.html
[category-pr-issues]: https://sjh9714.github.io/gh-extension-atlas/categories/pr-issues.html
[category-repo-branch]: https://sjh9714.github.io/gh-extension-atlas/categories/repo-branch.html
[category-search]: https://sjh9714.github.io/gh-extension-atlas/categories/search.html
[category-security-admin]: https://sjh9714.github.io/gh-extension-atlas/categories/security-admin.html

The generated source lives at [`docs/index.html`](docs/index.html).

Regenerate it after catalog changes with:

```sh
npm run site:build
```

## Dashboard/TUI

| Extension                                                              | Install                                             | Best for                               | Why it matters                                                       | Status |
| ---------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------- | ------ |
| [gh-dash](https://github.com/dlvhdr/gh-dash)                           | `gh extension install dlvhdr/gh-dash`               | PR, issue, and notification dashboards | Gives maintainers a fast terminal cockpit for GitHub triage queues.  | active |
| [gh-skyline](https://github.com/github/gh-skyline)                     | `gh extension install github/gh-skyline`            | Contribution visualization             | Creates a 3D model of contribution history for demos and profiles.   | active |
| [gh-markdown-preview](https://github.com/yusukebe/gh-markdown-preview) | `gh extension install yusukebe/gh-markdown-preview` | GitHub-flavored Markdown previews      | Catches README rendering issues before publishing.                   | active |
| [gh-eco](https://github.com/jrnxf/gh-eco)                              | `gh extension install jrnxf/gh-eco`                 | Ecosystem exploration                  | Provides an exploratory view of GitHub profiles and projects.        | watch  |
| [gh-lazy](https://github.com/gizmo385/gh-lazy)                         | `gh extension install gizmo385/gh-lazy`             | Terminal GitHub browsing               | Offers a TUI for interacting with GitHub resources.                  | active |
| [gh-graph](https://github.com/kawarimidoll/gh-graph)                   | `gh extension install kawarimidoll/gh-graph`        | Contribution graph views               | Brings contribution graph feedback into the terminal.                | active |
| [gh-contrib](https://github.com/mislav/gh-contrib)                     | `gh extension install mislav/gh-contrib`            | Lightweight contribution graphs        | Renders contribution history without a browser.                      | active |
| [gh-gfm-preview](https://github.com/thiagokokada/gh-gfm-preview)       | `gh extension install thiagokokada/gh-gfm-preview`  | Offline Markdown preview               | Provides a standalone GitHub-flavored Markdown preview path.         | active |

## PR & Issues

| Extension                                                    | Install                                          | Best for                 | Why it matters                                                    | Status |
| ------------------------------------------------------------ | ------------------------------------------------ | ------------------------ | ----------------------------------------------------------------- | ------ |
| [gh-stack](https://github.com/github/gh-stack)               | `gh extension install github/gh-stack`           | Stacked PRs              | Helps teams ship dependent changes without losing review context. | active |
| [gh-pr-review](https://github.com/agynio/gh-pr-review)       | `gh extension install agynio/gh-pr-review`       | Inline review threads    | Keeps PR review work inside the terminal.                         | active |
| [gh-dependabot](https://github.com/einride/gh-dependabot)    | `gh extension install einride/gh-dependabot`     | Dependency update review | Makes Dependabot review work faster and more focused.             | active |
| [gh-i](https://github.com/gennaro-tedesco/gh-i)              | `gh extension install gennaro-tedesco/gh-i`      | Issue search             | Adds an interactive issue search flow.                            | watch  |
| [gh-metrics](https://github.com/hectcastro/gh-metrics)       | `gh extension install hectcastro/gh-metrics`     | Pull request metrics     | Summarizes PR timing and review health.                           | active |
| [gh-sherpa](https://github.com/InditexTech/gh-sherpa)        | `gh extension install InditexTech/gh-sherpa`     | Branch and PR creation   | Streamlines daily work from Jira or GitHub issues.                | active |
| [gh-dep](https://github.com/jackchuka/gh-dep)                | `gh extension install jackchuka/gh-dep`          | Bulk dependency PRs      | Gives teams a TUI for dependency update queues.                   | active |
| [gh-prism](https://github.com/kawarimidoll/gh-prism)         | `gh extension install kawarimidoll/gh-prism`     | PR review                | Provides a focused PR review experience.                          | active |
| [gh-sql](https://github.com/KOBA789/gh-sql)                  | `gh extension install KOBA789/gh-sql`            | GitHub Projects queries  | Lets advanced users query project data with SQL.                  | stale  |
| [gh-triage](https://github.com/samcoe/gh-triage)             | `gh extension install samcoe/gh-triage`          | Issue triage             | Helps maintainers process issue queues.                           | stale  |
| [gh-milestone](https://github.com/valeriobelli/gh-milestone) | `gh extension install valeriobelli/gh-milestone` | Milestone management     | Adds terminal workflows for project planning.                     | active |

## Actions/CI

| Extension                                                            | Install                                           | Best for                    | Why it matters                                           | Status |
| -------------------------------------------------------------------- | ------------------------------------------------- | --------------------------- | -------------------------------------------------------- | ------ |
| [gh-actions-importer](https://github.com/github/gh-actions-importer) | `gh extension install github/gh-actions-importer` | CI migration                | Helps plan and automate migrations into GitHub Actions.  | active |
| [gh-enhance](https://github.com/dlvhdr/gh-enhance)                   | `gh extension install dlvhdr/gh-enhance`          | Interactive Actions TUI     | Gives Actions workflows a fast terminal interface.       | active |
| [gh-signoff](https://github.com/basecamp/gh-signoff)                 | `gh extension install basecamp/gh-signoff`        | Local signoff               | Runs local checks before you hand work to CI.            | active |
| [gh-workflow-stats](https://github.com/fchimpan/gh-workflow-stats)   | `gh extension install fchimpan/gh-workflow-stats` | Workflow health             | Tracks success rate and duration for workflows and jobs. | active |
| [gh-slimify](https://github.com/fchimpan/gh-slimify)                 | `gh extension install fchimpan/gh-slimify`        | Runner cost reduction       | Detects workflows that can move to slimmer runners.      | active |
| [gh-act](https://github.com/nektos/gh-act)                           | `gh extension install nektos/gh-act`              | Local Actions runs          | Wraps local GitHub Actions execution through the CLI.    | active |
| [gh-actions-status](https://github.com/rsese/gh-actions-status)      | `gh extension install rsese/gh-actions-status`    | Organization Actions health | Summarizes Actions health across an organization.        | stale  |

## Repo & Branch

| Extension                                                            | Install                                             | Best for             | Why it matters                                             | Status |
| -------------------------------------------------------------------- | --------------------------------------------------- | -------------------- | ---------------------------------------------------------- | ------ |
| [gh-poi](https://github.com/seachicken/gh-poi)                       | `gh extension install seachicken/gh-poi`            | Safe branch cleanup  | Removes merged branches without reckless deletion.         | active |
| [gh-install](https://github.com/redraw/gh-install)                   | `gh extension install redraw/gh-install`            | Release binaries     | Installs GitHub release binaries interactively.            | active |
| [gh-branch](https://github.com/mislav/gh-branch)                     | `gh extension install mislav/gh-branch`             | Branch switching     | Adds fuzzy branch finding and deletion.                    | watch  |
| [gh-clean-branches](https://github.com/davidraviv/gh-clean-branches) | `gh extension install davidraviv/gh-clean-branches` | Local branch cleanup | Deletes branches with no upstream and no unpushed commits. | stale  |
| [gh-clone-org](https://github.com/matt-bartel/gh-clone-org)          | `gh extension install matt-bartel/gh-clone-org`     | Organization cloning | Clones many organization repos with topic filtering.       | stale  |
| [gh-cp](https://github.com/mislav/gh-cp)                             | `gh extension install mislav/gh-cp`                 | Copying repo files   | Copies a file from GitHub without cloning the repository.  | stale  |
| [gh-download](https://github.com/yuler/gh-download)                  | `gh extension install yuler/gh-download`            | Downloading paths    | Downloads folders or files without a full clone.           | stale  |
| [gh-bump](https://github.com/johnmanjiro13/gh-bump)                  | `gh extension install johnmanjiro13/gh-bump`        | Version bumps        | Helps bump repository versions from the CLI.               | active |
| [gh-tidy](https://github.com/HaywardMorihara/gh-tidy)                | `gh extension install HaywardMorihara/gh-tidy`      | Workspace cleanup    | Gets a Git workspace ready for the next task.              | active |
| [gh-worktree](https://github.com/despreston/gh-worktree)             | `gh extension install despreston/gh-worktree`       | Worktree workflows   | Makes Git worktree usage smoother with GitHub context.     | active |

## Search

| Extension                                                     | Install                                          | Best for              | Why it matters                                             | Status |
| ------------------------------------------------------------- | ------------------------------------------------ | --------------------- | ---------------------------------------------------------- | ------ |
| [gh-s](https://github.com/gennaro-tedesco/gh-s)               | `gh extension install gennaro-tedesco/gh-s`      | Repository search     | Adds a compact interactive repository search interface.    | active |
| [gh-f](https://github.com/gennaro-tedesco/gh-f)               | `gh extension install gennaro-tedesco/gh-f`      | Fuzzy GitHub search   | Provides a compact fzf-powered GitHub workflow.            | active |
| [gh-grep](https://github.com/k1LoW/gh-grep)                   | `gh extension install k1LoW/gh-grep`             | API-backed grep       | Searches repository content through GitHub APIs.           | active |
| [gh-user-stars](https://github.com/korosuke613/gh-user-stars) | `gh extension install korosuke613/gh-user-stars` | Starred repo browsing | Makes personal starred repositories searchable.            | stale  |
| [gh-find-code](https://github.com/LangLangBart/gh-find-code)  | `gh extension install LangLangBart/gh-find-code` | Code search           | Uses fzf for GitHub code searching.                        | active |
| [gh-repo-explore](https://github.com/samcoe/gh-repo-explore)  | `gh extension install samcoe/gh-repo-explore`    | Repo exploration      | Explores repositories without cloning.                     | stale  |
| [gh-stars](https://github.com/Link-/gh-stars)                 | `gh extension install Link-/gh-stars`            | Star search           | Searches starred repositories from the terminal.           | active |
| [gh-q](https://github.com/kawarimidoll/gh-q)                  | `gh extension install kawarimidoll/gh-q`         | fzf and ghq cloning   | Combines GitHub search with local repository organization. | active |
| [gh-fzf](https://github.com/benelan/gh-fzf)                   | `gh extension install benelan/gh-fzf`            | fzf workflows         | Wraps GitHub CLI commands in fzf interactions.             | active |

## Notifications

| Extension                                                  | Install                                           | Best for                 | Why it matters                                                | Status |
| ---------------------------------------------------------- | ------------------------------------------------- | ------------------------ | ------------------------------------------------------------- | ------ |
| [gh-notify](https://github.com/meiji163/gh-notify)         | `gh extension install meiji163/gh-notify`         | Notification display     | Brings GitHub notifications into the terminal.                | active |
| [gh-gonest](https://github.com/emmanuel-ferdman/gh-gonest) | `gh extension install emmanuel-ferdman/gh-gonest` | Notification cleanup     | Removes phantom notifications from inaccessible repositories. | active |
| [gh-not](https://github.com/nobe4/gh-not)                  | `gh extension install nobe4/gh-not`               | Rule-based notifications | Adds filtering and rules to GitHub notification workflows.    | active |
| [gh-triage](https://github.com/k1LoW/gh-triage)            | `gh extension install k1LoW/gh-triage`            | Unread triage            | Processes issues and PRs through unread notifications.        | active |

## Security/Admin

| Extension                                                                 | Install                                                   | Best for                  | Why it matters                                      | Status |
| ------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------- | --------------------------------------------------- | ------ |
| [gh-token](https://github.com/Link-/gh-token)                             | `gh extension install Link-/gh-token`                     | GitHub App tokens         | Creates installation access tokens for GitHub Apps. | active |
| [gh-sbom](https://github.com/advanced-security/gh-sbom)                   | `gh extension install advanced-security/gh-sbom`          | SBOM generation           | Generates software bills of materials from the CLI. | watch  |
| [gh-gei](https://github.com/github/gh-gei)                                | `gh extension install github/gh-gei`                      | Enterprise migration      | Supports GitHub-to-GitHub migration workflows.      | active |
| [gh-repo-stats](https://github.com/mona-actions/gh-repo-stats)            | `gh extension install mona-actions/gh-repo-stats`         | Migration metadata        | Pulls repository metadata for migration planning.   | active |
| [gh-classroom](https://github.com/github/gh-classroom)                    | `gh extension install github/gh-classroom`                | Education administration  | Manages GitHub Classroom workflows.                 | active |
| [gh-codeql](https://github.com/github/gh-codeql)                          | `gh extension install github/gh-codeql`                   | CodeQL workflows          | Adds CodeQL tasks to the GitHub CLI.                | watch  |
| [gh-mrva](https://github.com/GitHubSecurityLab/gh-mrva)                   | `gh extension install GitHubSecurityLab/gh-mrva`          | Multi-repository analysis | Runs CodeQL variant analysis across repositories.   | watch  |
| [gh-code-scanning](https://github.com/advanced-security/gh-code-scanning) | `gh extension install advanced-security/gh-code-scanning` | Code scanning             | Helps inspect GitHub code scanning data.            | active |
| [gh-repo-config](https://github.com/twelvelabs/gh-repo-config)            | `gh extension install twelvelabs/gh-repo-config`          | Repository settings       | Manages repository configuration from the terminal. | active |

## AI/Agents

| Extension                                             | Install                                     | Best for          | Why it matters                                                | Status |
| ----------------------------------------------------- | ------------------------------------------- | ----------------- | ------------------------------------------------------------- | ------ |
| [gh-aw](https://github.com/github/gh-aw)              | `gh extension install github/gh-aw`         | Agentic workflows | Brings agent workflow execution to GitHub CLI.                | active |
| [gh-models](https://github.com/github/gh-models)      | `gh extension install github/gh-models`     | GitHub Models     | Provides terminal access to the GitHub Models service.        | active |
| [gh-standup](https://github.com/sgoedecke/gh-standup) | `gh extension install sgoedecke/gh-standup` | AI standups       | Generates AI-assisted standup summaries from GitHub activity. | active |
| [gh-mcp](https://github.com/shuymn/gh-mcp)            | `gh extension install shuymn/gh-mcp`        | MCP setup         | Runs GitHub MCP Server through existing `gh` authentication.  | active |

## Data

The curated catalog lives in [`data/extensions.json`](data/extensions.json). It is intentionally small enough to review by hand and structured enough to validate in CI.

Metadata such as stars, last pushed date, and maintenance status is a reviewed snapshot, not a live ranking. Each entry includes a `verified_at` date.

Published Pages endpoints:

| Endpoint                                      | Use this when...                                        |
| --------------------------------------------- | ------------------------------------------------------- |
| [API index][api-index]                        | You want a manifest of every public catalog endpoint.   |
| [Full catalog JSON][api-extensions]           | You want the complete reviewed catalog for automation.  |
| [Catalog JSON Schema][api-schema]             | You want the public data contract for catalog entries.  |
| [Top Picks JSON][api-top-picks]               | You want only the first-pass recommendations.           |
| [All install commands][install-all]           | You want a plain-text command bundle for every entry.   |
| [Top Picks install commands][install-top]     | You want a plain-text install bundle for Top Picks.     |
| [Starter pack install bundles][install-packs] | You want workflow-specific plain-text install bundles.  |

[api-index]: https://sjh9714.github.io/gh-extension-atlas/api/index.json
[api-extensions]: https://sjh9714.github.io/gh-extension-atlas/api/extensions.json
[api-schema]: https://sjh9714.github.io/gh-extension-atlas/api/extensions.schema.json
[api-top-picks]: https://sjh9714.github.io/gh-extension-atlas/api/top-picks.json
[install-all]: https://sjh9714.github.io/gh-extension-atlas/install/all.txt
[install-top]: https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
[install-packs]: https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/daily-maintainer-triage.txt

Statuses mean:

| Status   | Meaning                                                         |
| -------- | --------------------------------------------------------------- |
| `active` | Useful and pushed within roughly the last year.                 |
| `watch`  | Useful, but maintenance should be checked before adopting.      |
| `stale`  | Still notable, but verify compatibility before depending on it. |

Recommended repository topics after publishing: `awesome`, `awesome-list`, `github-cli`, `gh-extension`, `cli`, `terminal`, `developer-tools`, `open-source`.

## Data Recipes

Use [`docs/data-recipes.md`](docs/data-recipes.md) for copy-paste examples that query the local catalog and public Pages API by category, maintenance status, search term, and official/community ownership.

For example:

```sh
npm run catalog:query -- --category "Actions/CI" --status active
```

## Metadata Refresh

Use [`docs/metadata-refresh.md`](docs/metadata-refresh.md) to audit live GitHub metadata and refresh mechanical fields such as stars, license, last pushed date, and verification date.

```sh
npm run metadata:audit
```

## Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

## Feedback

Use issues when the change is specific:

- [Add an extension](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=add-extension.yml)
- [Fix metadata](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=fix-metadata.yml)
- [Improve a comparison guide](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=comparison-feedback.yml)

Use the [feedback discussion](https://github.com/sjh9714/gh-extension-atlas/discussions/5) for questions, rough ideas, and lightweight feedback that is not yet a concrete issue.

## For Extension Maintainers

If your extension is listed here, corrections are welcome. Open an issue or pull request when a summary, install command, category, comparison, or maintenance status is off.

Good correction requests include the repository name, the field that should change, and a short reason. The atlas is intentionally conservative: a clearer description beats a louder one.

If this helped you choose an extension, a star helps other `gh` users find it too.
