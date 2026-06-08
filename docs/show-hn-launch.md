# Show HN Launch Packet

Use this only after the second-wave maintainer guardrail expires and there are no negative replies or pending factual corrections.

Current guardrail:

- Do not submit before `2026-06-10 00:10 KST`.
- Check `gh-notify` first.
- If a maintainer requests a correction, fix and validate before submitting.
- Do not ask for stars, upvotes, reposts, or endorsements.

## Submission

Use a link submission, not a text-only post.

Title:

```text
Show HN: GitHub CLI Extension Atlas - audit and choose gh extensions
```

URL:

```text
https://sjh9714.github.io/gh-extension-atlas/audit.html
```

## Optional First Comment

Post this only if a short explanation feels necessary after submission. Keep it factual and do not mention stars.

```text
I built this because `gh extension search` gives many options, but it can still be hard to decide what is maintained, what fits a workflow, and what overlaps with something already installed.

The linked page is a browser-only audit tool: paste `gh extension list`, and it compares installed extensions against a curated catalog. It shows reviewed installs, unlisted installs, missing Top Picks, and workflow coverage.

The repo also includes comparison guides, install bundles, and a small JSON catalog:
https://github.com/sjh9714/gh-extension-atlas

I am mainly looking for factual corrections, missing useful extensions, and category feedback.
```

## Pre-Submit Checklist

- `gh-notify` has no negative reply or correction request.
- Issue `#7` is updated with the 24-hour review.
- Latest `Validate` workflow is green.
- Public audit page loads and shows `Try sample audit`.
- Repository stars/watchers/forks are recorded.
- No other public post is planned for the same 24-hour window.

## First 24 Hours

Allowed:

- Answer factual questions.
- Record missing-extension suggestions.
- Apply corrections quickly if someone points out inaccurate wording.
- Thank people for specific feedback.

Not allowed:

- Asking for stars, upvotes, shares, or reposts.
- Posting to another public channel the same day.
- Sending more maintainer outreach.
- Turning maintainer thumbs-up reactions into endorsement claims.

## Reply Templates

Missing extension:

```text
Thanks - I will check whether it is installable with `gh extension install`, documented, not archived, maintained enough to list, and broadly useful. If it fits the criteria, I will add it or open a candidate review issue.
```

Correction:

```text
Thanks, that is exactly the kind of correction I am looking for. I will update the wording so it stays factual.
```

Skeptical or promotional concern:

```text
That is fair. My intent is to collect factual corrections and useful missing extensions, not to promote aggressively. I will keep follow-up inside the atlas repo.
```

Positive but no action needed:

```text
Thanks. I am trying to keep it conservative and useful rather than exhaustive.
```

## Tracker Update

After submission, record this in a new or existing tracker issue:

```md
## Show HN share

| Channel | URL | Sent | Response | Change needed |
| --- | --- | --- | --- | --- |
| Hacker News / Show HN | URL_HERE | 2026-06-10 HH:MM KST |  |  |

Guardrail:
- Do not post to another public channel for 24 hours.
- Do not send more maintainer outreach today.
- Respond only to factual feedback, missing-extension suggestions, or correction requests.
```
