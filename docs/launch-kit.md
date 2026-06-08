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
- Best for: `Daily GitHub triage`
- Description: `Turns PRs, issues, and notifications into a fast terminal dashboard.`
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

## Parked / Not Planned: Reddit

```text
Reddit is not planned for this launch loop.

Reason: rules and tone risk; avoid over-promotion.
```

## Day 3 Article: Dev.to or Hashnode

```text
Title: A Field Guide for Choosing GitHub CLI Extensions

GitHub CLI has a healthy extension ecosystem, but choosing between extensions can still be surprisingly slow.

`gh extension search` helps you find candidates. What it does not tell you is whether two extensions solve the same problem, which one fits your workflow, which projects are still maintained, or which extension to try first when you just want a useful default.

That is the problem I wanted to make easier, so I put together the GitHub CLI Extension Atlas:

https://github.com/sjh9714/gh-extension-atlas

It is a curated field guide for GitHub CLI extensions. The goal is not to mirror every repository with a `gh-extension` topic. The goal is to help GitHub CLI users make a faster, more informed first choice.

## Why `gh extension search` was not enough

Search is useful when you already know what you want. It is less helpful when your question is more like:

- Which terminal dashboard should I try first?
- Which branch cleanup extension is safer for my workflow?
- Which tool helps with Markdown previews before I push docs?
- Which Actions/CI extension is for migration, local runs, or workflow health?

Those questions need context, not just a list of repositories.

## What the atlas includes

The first version of the atlas includes:

- 68 curated extensions
- Top Picks for broad daily value
- use-case based navigation
- comparison guides for dashboards, branch cleanup, notifications, Markdown preview, and Actions/CI
- maintenance labels: active, watch, and stale
- a small JSON catalog for validation and automation

The README is the main interface, and `data/extensions.json` is kept as a small public data contract for people who want to inspect or automate against the catalog.

## A few Top Picks

These are examples of how the atlas tries to describe extensions by use case instead of only listing names.

- `gh-dash` - a terminal dashboard for daily PR, issue, and notification triage.
- `gh-poi` - branch cleanup when you want a safer default for removing merged branches.
- `gh-markdown-preview` - GitHub-flavored Markdown preview before publishing README or docs changes.
- `gh-pr-review` - inline PR review work from the terminal.
- `gh-workflow-stats` - workflow success rate and duration summaries for CI debugging.

Each entry includes the install command, best-fit use case, short rationale, and maintenance status.

## Why comparison guides matter

Some categories are hard to choose from because the tools look similar at first glance.

The atlas includes comparison guides for:

- Dashboard/TUI tools: https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/comparisons/dashboards.md
- Branch cleanup tools: https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/comparisons/branch-cleanup.md
- Actions and CI tools: https://github.com/sjh9714/gh-extension-atlas/blob/main/docs/comparisons/actions-ci.md

The branch cleanup guide is a good example. `gh-poi`, `gh-branch`, `gh-clean-branches`, `gh-tidy`, and `gh-worktree` can all sound related, but they fit different habits and risk profiles.

## Trust signals

The project is intentionally conservative:

- archived repositories are excluded
- status labels are visible
- Top Picks are manually install-checked
- stars, last pushed dates, and status labels are treated as reviewed snapshots
- `verified_at` is available in `data/extensions.json`

The atlas is not a live ranking system and it is not a claim that every listed extension is right for every team. It is a starting point for choosing what to try.

## What feedback would help

I am looking for factual corrections more than promotion.

Helpful feedback would be:

- an inaccurate description
- a wrong category
- a misleading maintenance label
- a better comparison between overlapping tools
- a useful GitHub CLI extension I missed

If you maintain a GitHub CLI extension and the atlas describes it poorly, a short correction is enough. Issues and pull requests are welcome too:

https://github.com/sjh9714/gh-extension-atlas

Note: I used AI assistance while organizing the launch plan, but the project metadata and article were reviewed before publishing.
```

## Hashnode Publish Checklist

```text
Primary channel: Hashnode

Tags:
- github
- cli
- opensource
- terminal

Before publishing:
- Avoid "ultimate", "official", and "complete" in title or promotional framing.
- Do not ask for stars.
- Do not claim maintainer endorsement from thumbs-up reactions.
- Keep the article framed as curated, conservative, and community-correctable.
- Review every extension example and comparison link.
- Keep the AI assistance note at the end.
```

## X Single Post

```text
I made a curated field guide for GitHub CLI extensions:

https://github.com/sjh9714/gh-extension-atlas

68 curated extensions, Top Picks, comparison guides, maintenance labels, and a JSON catalog.

Useful when `gh extension search` gives too many options. Corrections welcome.
```

## Show HN

Use [`docs/show-hn-launch.md`](show-hn-launch.md) after the second-wave maintainer guardrail expires and there are no negative replies or pending corrections. Lead with the browser audit tool, not the README.

## Correction Ask

```text
If a description, category, maintenance label, or comparison is misleading, a correction would help keep the atlas useful.
```
