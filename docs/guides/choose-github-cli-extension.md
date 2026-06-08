# Which GitHub CLI Extension Should I Install?

Use this decision tree when `gh extension search` gives you a long list and you want a practical first choice instead of a complete directory.

This guide is intentionally conservative. Install one extension for the workflow you have right now, try it on a real repository, then come back only if you need a narrower alternative.

## Start With The Job

| If your problem is... | Start with | Install command | Why this is a good first check |
| --- | --- | --- | --- |
| Daily PR, issue, and notification triage | `gh-dash` | `gh extension install dlvhdr/gh-dash` | One terminal dashboard covers the broad GitHub queue. |
| Interactive GitHub Actions inspection | `gh-enhance` | `gh extension install dlvhdr/gh-enhance` | A focused TUI for Actions workflows before you reach for the web UI. |
| Workflow health and CI duration | `gh-workflow-stats` | `gh extension install fchimpan/gh-workflow-stats` | Summarizes success rate and runtime when CI starts feeling slow or flaky. |
| Safer local branch cleanup | `gh-poi` | `gh extension install seachicken/gh-poi` | Helps remove merged branches without turning cleanup into a manual ref audit. |
| README or docs preview | `gh-markdown-preview` | `gh extension install yusukebe/gh-markdown-preview` | Preview GitHub-flavored Markdown before pushing docs changes. |
| Repository search from the terminal | `gh-s` | `gh extension install gennaro-tedesco/gh-s` | Adds a compact interactive repository search flow. |
| Notification-only triage | `gh-notify` | `gh extension install meiji163/gh-notify` | Useful when you want notification review without a broader dashboard. |

## If Two Choices Look Similar

Use the narrower tool when your workflow is specific:

- Choose `gh-pr-review` over `gh-dash` if you mostly need inline PR review comments.
- Choose `gh-workflow-stats` over `gh-enhance` if you want CI metrics rather than an interactive Actions UI.
- Choose `gh-notify` over `gh-dash` if notifications are the only queue you care about.
- Choose `gh-markdown-preview` over a broader TUI if you only need documentation preview.

Use the broader tool when you do not yet know where the pain is:

- Choose `gh-dash` for mixed PR, issue, and notification triage.
- Choose `gh-enhance` for interactive Actions exploration.
- Choose a starter pack when you want two or three tools to compare for the same workflow.

## When To Avoid Installing Anything

Do not install a new extension just because it appears in a list.

Pause first if:

- the built-in `gh` command already solves the job,
- you only need a command once,
- the repository is archived or poorly documented,
- the extension needs broad permissions you do not understand,
- the workflow is security, release, CI, or admin related and you have not reviewed the upstream repository.

## Safer Install Flow

Before installing:

```sh
gh extension install OWNER/REPO
gh extension list
gh extension remove EXTENSION_NAME
```

Review the upstream README, license, last push date, and open issues before adopting an extension into a repeated workflow.

## Use The Atlas Tools

- Open the chooser: <https://sjh9714.github.io/gh-extension-atlas/chooser.html>
- Compare your installed extensions: <https://sjh9714.github.io/gh-extension-atlas/audit.html>
- Browse workflow recommendations: <https://sjh9714.github.io/gh-extension-atlas/recommendations.html>
- Inspect install bundles: <https://sjh9714.github.io/gh-extension-atlas/install/>
- Fetch the catalog as JSON: <https://sjh9714.github.io/gh-extension-atlas/api/extensions.json>

## Suggest A Missing Extension

If a tool is installable with `gh extension install`, documented, not archived, and useful beyond a narrow one-off workflow, suggest it for review:

<https://github.com/sjh9714/gh-extension-atlas/issues/new?template=add-extension.yml>

Missing from the atlas does not mean bad. It means the extension has not been reviewed against the current selection criteria yet.
