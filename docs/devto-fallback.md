# DEV Fallback Launch Packet

Use this only if the Hacker News submission remains blocked and there are no pending factual corrections.

Current context:

- Hacker News blocked the manual Show HN submission with `Sorry, your account isn't able to submit this site.`
- The HN moderator email has been sent.
- Do not retry HN until the account restriction is lifted or moderators respond.
- Do not ask for stars, upvotes, reposts, or endorsements.

## Channel

Primary fallback: DEV Community.

Why this channel:

- DEV supports long-form technical posts.
- Tags can surface posts outside an existing follower base.
- The article can stand alone instead of acting as a bare backlink.

Policy guardrails:

- Include substantial technical content, not just a link.
- Disclose AI assistance.
- Do not make the post primarily about promotion, clout, backlinks, or stars.
- Do not use generated comments when replying.

References:

- [DEV AI-assisted article guidelines](https://dev.to/guidelines-for-ai-assisted-articles-on-dev)
- [DEV Terms: Content Policy](https://dev.to/terms)

## Title

```text
Auditing GitHub CLI extensions before installing more
```

## Tags

```text
github
cli
opensource
terminal
```

## Article Draft

````markdown
GitHub CLI extensions are useful, but extension discovery has a small practical problem: it is easy to find *more* extensions before you understand whether your current setup already covers the workflows you care about.

I built a small browser-only audit page for that problem:

https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1

It opens with a sample result loaded. If you want to check your own setup, run:

```sh
gh extension list
```

Then paste the output into the page.

The audit runs locally in the browser. There is no sign-in, no analytics script, and no remote audit API. The pasted extension list is not uploaded.

## What the audit checks

The page compares installed GitHub CLI extensions against the GitHub CLI Extension Atlas catalog:

https://github.com/sjh9714/gh-extension-atlas

It shows:

- installed extensions that are already reviewed in the atlas
- installed extensions that are not listed yet
- missing Top Picks
- workflow coverage gaps
- copyable install commands for missing workflow recommendations

The goal is not to install every recommended extension. The goal is to make the next install decision smaller and easier to review.

## Why not just use `gh extension search`?

`gh extension search` is useful when you already know what you are looking for.

It is less useful when the question is:

- Which terminal dashboard should I try first?
- Do I need a notification tool if I already use a broader dashboard?
- Which extension is for GitHub Actions operations versus workflow statistics?
- Is this branch cleanup tool the right fit for my risk tolerance?

Those are comparison questions, not search questions.

The atlas tries to answer them with a reviewed catalog, Top Picks, comparison guides, and workflow recommendations.

## A few examples

For daily GitHub triage, the atlas points to `gh-dash` first because it covers PRs, issues, and notifications in one terminal dashboard.

For GitHub Actions, it separates different jobs:

- `gh-enhance` for an interactive Actions TUI
- `gh-workflow-stats` for success rate and duration summaries
- `gh-act` for local workflow runs
- `gh-actions-importer` for migration work

For branch cleanup, it compares tools like `gh-poi`, `gh-branch`, `gh-clean-branches`, `gh-tidy`, and `gh-worktree` because they sound related but solve different habits and risk profiles.

## The data contract

The catalog is also available as JSON:

https://sjh9714.github.io/gh-extension-atlas/api/extensions.json

Each entry includes fields such as:

- repository
- category
- install command
- best-fit use case
- avoid-if note
- license
- archived status
- maintenance status
- verification date

That makes it usable by scripts, documentation tools, or coding agents that need current extension metadata instead of stale memory.

## What feedback would help

I am mainly looking for factual corrections and missing-extension suggestions:

- inaccurate descriptions
- wrong categories
- misleading maintenance labels
- better comparisons between overlapping tools
- useful GitHub CLI extensions that are missing from the catalog

If you maintain a GitHub CLI extension and the atlas describes it poorly, a short correction is enough.

Note: I used AI assistance while organizing the launch plan and editing this post, but the project metadata, examples, and claims were reviewed before publishing.
````

## Before Publishing

- Confirm there are no pending corrections in the atlas issue tracker.
- Confirm the public audit demo still loads.
- Keep only one primary link near the top: the audit demo.
- Keep the GitHub repo link inside the article body, not as a star request.
- Do not cross-post the same day to Reddit, X, LinkedIn, or HN.

## After Publishing

Record the post in issue `#8`:

```md
## DEV fallback article

| Channel | URL | Sent | Response | Change needed |
| --- | --- | --- | --- | --- |
| DEV Community | URL_HERE | 2026-06-__ __:__ KST |  |  |

Guardrail:
- Do not ask for stars, reposts, or endorsements.
- Do not publish another public post for 24 hours.
- Reply only to factual feedback, missing-extension suggestions, or direct questions.
```
