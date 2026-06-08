# GitHub Notification Triage CLI Extension Guide

Use this guide when GitHub notifications are useful enough to matter, but noisy enough that opening the browser turns into a context switch.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/notification-triage-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| See GitHub notifications without opening the browser | [`gh-notify`](https://github.com/meiji163/gh-notify) | It is the simplest first stop when visibility is the main problem. |
| Filter or process notifications with rules | [`gh-not`](https://github.com/nobe4/gh-not) | It is better when your notification workflow needs filtering instead of display only. |
| Remove phantom notifications | [`gh-gonest`](https://github.com/emmanuel-ferdman/gh-gonest) | It focuses on stuck notifications from deleted or inaccessible repositories. |
| Work unread issues and PRs from notifications | [`gh-triage`](https://github.com/k1LoW/gh-triage) | It is useful when notifications are the input to issue and PR triage. |
| Fold notifications into maintainer triage | [`gh-dash`](https://github.com/dlvhdr/gh-dash) | It is best when notifications belong beside PR and issue queues in a TUI. |

## First Pick

Start with [`gh-notify`](https://github.com/meiji163/gh-notify) when you mainly need notification visibility from the terminal.

Install:

```sh
gh extension install meiji163/gh-notify
```

Use [`gh-not`](https://github.com/nobe4/gh-not) when display is not enough and you need filtering or rule-based handling.

Install:

```sh
gh extension install nobe4/gh-not
```

## Cleanup And Edge Cases

Use [`gh-gonest`](https://github.com/emmanuel-ferdman/gh-gonest) when your problem is stuck or phantom notifications from deleted or inaccessible repositories. It is narrower than a general notification viewer, which is why it can be useful when that exact annoyance appears.

Install:

```sh
gh extension install emmanuel-ferdman/gh-gonest
```

Use [`gh-triage`](https://github.com/k1LoW/gh-triage) when you treat unread notifications as the input queue for issue and pull request triage.

Install:

```sh
gh extension install k1LoW/gh-triage
```

## When To Use A Dashboard

Use [`gh-dash`](https://github.com/dlvhdr/gh-dash) when notifications are not a separate workflow. If your real task is daily maintainer triage across pull requests, issues, and notifications, a broader TUI can be the better first tool.

Install:

```sh
gh extension install dlvhdr/gh-dash
```

Use [`gh-pr-review`](https://github.com/agynio/gh-pr-review) when the notification leads to inline PR review thread work.

Install:

```sh
gh extension install agynio/gh-pr-review
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

Use these when you want the Notifications subset programmatically:

- [Notifications category page](https://sjh9714.github.io/gh-extension-atlas/categories/notifications.html)
- [Notifications category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/notifications.json)
- [Notifications install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/notifications.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a notification tool, especially when the extension can mark items read, process unread queues, or request notification-related scopes.

Prefer active projects for default recommendations. Choose a narrow cleanup tool only when it matches the exact notification problem you are trying to fix.
