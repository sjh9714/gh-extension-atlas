# Notification Extensions

GitHub notifications become useful when they can be filtered, cleared, and treated as a work queue.

| Extension                                                  | Pick it when                                                       | Tradeoff                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| [gh-notify](https://github.com/meiji163/gh-notify)         | You mainly need to display notifications in the terminal.          | It is a viewer, not a full rule engine.                         |
| [gh-not](https://github.com/nobe4/gh-not)                  | You want rule-based notification management.                       | More setup than a simple notification viewer.                   |
| [gh-dash](https://github.com/dlvhdr/gh-dash)               | You want notifications alongside PR and issue triage in one TUI.   | Heavier than a focused notification viewer.                     |
| [gh-gonest](https://github.com/emmanuel-ferdman/gh-gonest) | You have phantom notifications from deleted or inaccessible repos. | Narrowly focused on one annoying edge case.                     |
| [gh-triage](https://github.com/k1LoW/gh-triage)            | You triage issues and PRs through unread notifications.            | Best for maintainers who already use notifications as an inbox. |

## Recommendation

Use [gh-notify](https://github.com/meiji163/gh-notify) for simple visibility, [gh-not](https://github.com/nobe4/gh-not) for rules, [gh-dash](https://github.com/dlvhdr/gh-dash) when notifications are part of a broader PR and issue triage workflow, and [gh-gonest](https://github.com/emmanuel-ferdman/gh-gonest) when your notification inbox has stuck items.
