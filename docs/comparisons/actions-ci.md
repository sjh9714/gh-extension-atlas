# Actions and CI Extensions

These extensions help with migration, local verification, workflow performance, and runner cost.

| Extension                                                            | Pick it when                                                | Tradeoff                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| [gh-actions-importer](https://github.com/github/gh-actions-importer) | You are migrating from another CI system to GitHub Actions. | Heavyweight if you already use Actions.               |
| [gh-enhance](https://github.com/dlvhdr/gh-enhance)                   | You want an interactive terminal UI for Actions workflows.  | Focused on Actions rather than general GitHub triage. |
| [gh-signoff](https://github.com/basecamp/gh-signoff)                 | You want local checks before asking CI to run.              | Depends on each project having useful local commands. |
| [gh-workflow-stats](https://github.com/fchimpan/gh-workflow-stats)   | You want workflow success rate and timing data.             | Reports health; it does not fix workflows.            |
| [gh-slimify](https://github.com/fchimpan/gh-slimify)                 | You want to find workflows that can use slimmer runners.    | Useful mainly for GitHub-hosted runner cost work.     |
| [gh-act](https://github.com/nektos/gh-act)                           | You want to run Actions locally.                            | Local behavior may differ from GitHub-hosted runners. |
| [gh-actions-status](https://github.com/rsese/gh-actions-status)      | You need organization-level Actions status.                 | The project is stale, so verify before adoption.      |

## Recommendation

Use [gh-signoff](https://github.com/basecamp/gh-signoff) for developer workflow quality, [gh-enhance](https://github.com/dlvhdr/gh-enhance) for interactive Actions triage, [gh-workflow-stats](https://github.com/fchimpan/gh-workflow-stats) for operational visibility, and [gh-actions-importer](https://github.com/github/gh-actions-importer) for migration projects.
