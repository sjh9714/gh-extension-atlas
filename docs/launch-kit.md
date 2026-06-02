# Launch Kit

Use these drafts to share the atlas without sounding like a billboard. Lead with the problem, keep the ask small, and invite corrections.

## Maintainer Verification

Use this only when the target project has a suitable issue tracker, discussion space, or contact path. Personalize every message and include the exact atlas wording so the maintainer can answer quickly.

```text
Title: Accuracy check: {extension_name} description in GitHub CLI Extension Atlas

Hi! I included `{repo}` in the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

I am doing a small accuracy pass before sharing the atlas more widely. Current wording:

- Category: `{category}`
- Best for: `{best_for}`
- Description: `{description}`
- Maintenance label: `{status}`

Could you sanity-check whether this is accurate?

No action needed if it looks fine. If something is off, a short correction here is enough, or an issue/PR in the atlas repo also works.

I am asking only for factual correction, not for stars or promotion.
```

Guardrails:

- Contact only the first-wave maintainers before broad sharing.
- Do not send identical messages to all projects at once.
- Do not ask maintainers for stars.
- Do not open an issue if the project asks users not to use issues for this kind of contact.

## First-Wave Ready Messages

Send the first two messages first, wait 12-24 hours, then continue with the next three only if the tone and channel fit still feel acceptable.

### gh-markdown-preview

```text
Title: Accuracy check: gh-markdown-preview description in GitHub CLI Extension Atlas

Hi! I included `yusukebe/gh-markdown-preview` in the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

I am doing a small accuracy pass before sharing the atlas more widely. Current wording:

- Category: `Dashboard/TUI`
- Best for: `README and docs review`
- Description: `Previews Markdown the way GitHub renders it before you push.`
- Maintenance label: `active`

Could you sanity-check whether this is accurate?

No action needed if it looks fine. If something is off, a short correction here is enough, or an issue/PR in the atlas repo also works.

I am asking only for factual correction, not for stars or promotion.
```

### gh-workflow-stats

```text
Title: Accuracy check: gh-workflow-stats description in GitHub CLI Extension Atlas

Hi! I included `fchimpan/gh-workflow-stats` in the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

I am doing a small accuracy pass before sharing the atlas more widely. Current wording:

- Category: `Actions/CI`
- Best for: `CI health`
- Description: `Summarizes workflow success rate and duration for operational debugging.`
- Install command listed in the atlas: `gh extension install fchimpan/gh-workflow-stats`
- Maintenance label: `active`

Could you sanity-check whether this is accurate, including the install command?

No action needed if it looks fine. If something is off, a short correction here is enough, or an issue/PR in the atlas repo also works.

I am asking only for factual correction, not for stars or promotion.
```

### gh-poi

```text
Title: Accuracy check: gh-poi description in GitHub CLI Extension Atlas

Hi! I included `seachicken/gh-poi` in the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

I am doing a small accuracy pass before sharing the atlas more widely. Current wording:

- Category: `Repo & Branch`
- Best for: `Branch cleanup`
- Description: `Safely removes merged branches without making you inspect every ref by hand.`
- Maintenance label: `active`

Could you sanity-check whether this is accurate, especially the branch-cleanup safety wording?

No action needed if it looks fine. If something is off, a short correction here is enough, or an issue/PR in the atlas repo also works.

I am asking only for factual correction, not for stars or promotion.
```

### gh-pr-review

```text
Title: Accuracy check: gh-pr-review description in GitHub CLI Extension Atlas

Hi! I included `agynio/gh-pr-review` in the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

I am doing a small accuracy pass before sharing the atlas more widely. Current wording:

- Category: `PR & Issues`
- Best for: `Inline PR review`
- Description: `Lets reviewers navigate and resolve PR review threads from the terminal.`
- Maintenance label: `active`

Could you sanity-check whether this is accurate?

No action needed if it looks fine. If something is off, a short correction here is enough, or an issue/PR in the atlas repo also works.

I am asking only for factual correction, not for stars or promotion.
```

### gh-dash

```text
Title: Accuracy check: gh-dash description in GitHub CLI Extension Atlas

Hi! I included `dlvhdr/gh-dash` in the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

I am doing a small accuracy pass before sharing the atlas more widely. Current wording:

- Category: `Dashboard/TUI`
- Best for: `Daily PR and issue triage`
- Description: `Turns scattered GitHub work into a fast terminal dashboard.`
- Maintenance label: `active`

Could you sanity-check whether this is accurate?

No action needed if it looks fine. If something is off, a short correction here is enough, or an issue/PR in the atlas repo also works.

I am asking only for factual correction, not for stars or promotion.
```

## GitHub Discussions

```text
I made a curated field guide for GitHub CLI extensions:

https://github.com/sjh9714/gh-extension-atlas

It is meant for the moment when `gh extension search` gives you many options, but you still need to decide what is actually worth installing. The repo includes Top Picks, comparison guides, maintenance labels, and a small JSON catalog.

Feedback on missing extensions, inaccurate descriptions, or better categories would be very welcome.
```

## Reddit

```text
Title: I made a curated field guide for GitHub CLI extensions

I made a curated field guide for GitHub CLI extensions:

https://github.com/sjh9714/gh-extension-atlas

It is meant for the moment when `gh extension search` gives you many options, but you still need to decide what is actually worth installing.

The first version includes 67 curated extensions, Top Picks, use-case navigation, comparison guides, maintenance labels, and a small JSON catalog.

The goal is not to list every repository with the `gh-extension` topic. It is to help people choose a useful extension faster.

I am collecting factual corrections and missing-extension suggestions. Feedback on inaccurate descriptions, better categories, or useful extensions I missed would be welcome.
```

## Dev.to or Hashnode

```text
Title: I made a field guide for GitHub CLI extensions

GitHub CLI has hundreds of public extensions, but choosing between them can be surprisingly hard. `gh extension search` helps you find candidates, but it does not explain which tools overlap, which ones are maintained, or which one to try first for a specific workflow.

I put together the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

The first version includes:

- 67 curated extensions
- Top Picks for broad daily value
- use-case based navigation
- comparison guides for dashboards, branch cleanup, notifications, Markdown preview, and Actions/CI
- a small JSON catalog for validation and automation

The project is intentionally conservative: archived repositories are excluded, status labels are visible, and Top Picks are manually install-checked. If you maintain a GitHub CLI extension or know one that belongs here, corrections and PRs are welcome.
```

## X or LinkedIn

```text
I made a curated field guide for GitHub CLI extensions:

https://github.com/sjh9714/gh-extension-atlas

67 extensions, Top Picks, maintenance labels, comparison guides, and a tiny JSON catalog.

Useful if `gh extension search` gives you options but not a clear first pick.
```

## Short Ask

```text
If this saves you a few minutes choosing a GitHub CLI extension, a star helps other `gh` users find it too.
```
