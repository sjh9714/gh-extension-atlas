# Git Branch Cleanup CLI Extension Guide

Use this guide when your local repository has too many old branches and you want a safer way to clean up, switch branches, or work across parallel branches from the terminal.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/branch-cleanup-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Safely remove merged local branches | [`gh-poi`](https://github.com/seachicken/gh-poi) | It is a focused cleanup tool and the safest first stop for merged local branches. |
| Fuzzy find, switch, or delete branches manually | [`gh-branch`](https://github.com/mislav/gh-branch) | It is good when you want selection and navigation instead of automatic cleanup. |
| Clean a workspace before a new task | [`gh-tidy`](https://github.com/HaywardMorihara/gh-tidy) | It is a broader workspace cleanup helper for context switching. |
| Work across multiple branches at once | [`gh-worktree`](https://github.com/despreston/gh-worktree) | It is useful when worktrees are already part of your branch workflow. |
| Delete branches with upstream and unpushed checks | [`gh-clean-branches`](https://github.com/davidraviv/gh-clean-branches) | It is a specific cleanup approach, but verify compatibility because the project is stale. |
| Install release binaries while setting up a repo | [`gh-install`](https://github.com/redraw/gh-install) | It is not a cleanup tool, but it is useful in local repository setup workflows. |

## First Pick

Start with [`gh-poi`](https://github.com/seachicken/gh-poi) when your goal is branch cleanup. It is the best first stop because branch cleanup is exactly the problem it is trying to solve.

Install:

```sh
gh extension install seachicken/gh-poi
```

Use [`gh-branch`](https://github.com/mislav/gh-branch) when your problem is branch navigation or manual selection. It is better when you want to see branches, switch between them, and decide what to delete yourself.

Install:

```sh
gh extension install mislav/gh-branch
```

## Safety Notes

Prefer tools that make deletion explicit. Branch cleanup is not the place for blind automation.

Before deleting branches, check:

- Whether the branch is merged.
- Whether it has unpushed commits.
- Whether another worktree is using it.
- Whether the upstream branch still matters to an open pull request.
- Whether the extension is currently maintained enough for your workflow.

Use [`gh-clean-branches`](https://github.com/davidraviv/gh-clean-branches) only after checking current compatibility. The atlas marks it `stale`, so it is useful as a specific cleanup idea rather than a default recommendation.

Install:

```sh
gh extension install davidraviv/gh-clean-branches
```

## Workspace And Worktree Helpers

Use [`gh-tidy`](https://github.com/HaywardMorihara/gh-tidy) when you want a broader workspace cleanup helper before starting a new task.

Install:

```sh
gh extension install HaywardMorihara/gh-tidy
```

Use [`gh-worktree`](https://github.com/despreston/gh-worktree) when your workflow already uses Git worktrees and you need terminal help managing parallel branches.

Install:

```sh
gh extension install despreston/gh-worktree
```

Use [`gh-install`](https://github.com/redraw/gh-install) when you are setting up a repository and need to install release binaries from GitHub. It is not a cleanup tool, but it fits local repository setup workflows.

Install:

```sh
gh extension install redraw/gh-install
```

## Starter Pack

The atlas publishes a small local repository cleanup starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/local-repository-cleanup.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install seachicken/gh-poi
gh extension install mislav/gh-branch
gh extension install redraw/gh-install
```

## Data Endpoints

Use these when you want the Repo & Branch subset programmatically:

- [Repo & Branch category page](https://sjh9714.github.io/gh-extension-atlas/categories/repo-branch.html)
- [Repo & Branch category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/repo-branch.json)
- [Repo & Branch install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/repo-branch.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a tool that can delete branches, change local repository state, or touch release automation.

Prefer active projects for default recommendations. Keep stale projects in view only when they solve a specific problem and you have time to verify them.
