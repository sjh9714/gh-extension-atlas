# Branch Cleanup Extensions

Branch cleanup tools look similar until you care about safety. Prefer tools that make it hard to delete unmerged or unpushed work.

| Extension                                                            | Pick it when                                                    | Tradeoff                                                 |
| -------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| [gh-poi](https://github.com/seachicken/gh-poi)                       | You want the safest default for removing merged local branches. | Focused mostly on cleanup, not branch navigation.        |
| [gh-branch](https://github.com/mislav/gh-branch)                     | You want fuzzy branch switching and manual branch deletion.     | Maintenance is slower than gh-poi.                       |
| [gh-clean-branches](https://github.com/davidraviv/gh-clean-branches) | You want cleanup based on upstream and unpushed-commit checks.  | The repository is stale, so verify before relying on it. |
| [gh-tidy](https://github.com/HaywardMorihara/gh-tidy)                | You want a broader workspace cleanup helper.                    | Less specialized than gh-poi.                            |
| [gh-worktree](https://github.com/despreston/gh-worktree)             | Your branch workflow depends on Git worktrees.                  | Only useful if worktrees are already part of your setup. |

## Recommendation

Start with [gh-poi](https://github.com/seachicken/gh-poi) for branch cleanup. Add [gh-branch](https://github.com/mislav/gh-branch) if fuzzy branch selection matters, and use [gh-worktree](https://github.com/despreston/gh-worktree) for parallel branch work.
