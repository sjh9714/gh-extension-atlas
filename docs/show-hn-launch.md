# Show HN Launch Packet

Use this only after the second-wave maintainer guardrail expires and there are no negative replies or pending factual corrections.

Current guardrail:

- Do not submit before `2026-06-10 00:10 KST`.
- Check `gh-notify` first.
- If a maintainer requests a correction, fix and validate before submitting.
- Do not ask for stars, upvotes, reposts, or endorsements.

## Second-Wave Review

After `2026-06-10 00:10 KST`, generate the issue `#7` review:

```sh
npm run launch:show-hn:review
```

Paste the output into issue `#7` before running the final preflight. If the review says to hold, do not submit to Show HN.

To record the review directly in issue `#7`, use the guarded posting command:

```sh
npm run launch:show-hn:record-review
```

This command only comments on the atlas tracker issue. It does not submit to Hacker News, and it refuses to post before the guardrail expires or when manual review is required.

For the final launch moment, use the combined ready check:

```sh
npm run launch:show-hn:ready
```

It runs the guarded review posting step first, then runs the final preflight. It prints the HN submitlink when all gates pass, but it still does not submit to Hacker News.

## Submission

Use a link submission, not a text-only post.

After the preflight passes, open the `HN submitlink` URL printed by `npm run launch:show-hn:preflight`. It pre-fills the URL and title, but still requires a manual final submit.

After Hacker News creates the item, record the story in issue `#8`:

```sh
npm run launch:show-hn:record-share -- --story STORY_URL
```

If you do not have the story URL handy, run the same command without `--story`; it searches Hacker News for the configured audit URL. The command only comments on the atlas tracker issue and refuses to record a story that points somewhere else.

Title:

```text
Show HN: Audit your installed GitHub CLI extensions
```

URL:

```text
https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1
```

This URL opens the audit page with a sample result already loaded, so first-time visitors can see the output before pasting their own `gh extension list`.

## Optional First Comment

Avoid a first comment unless a short explanation feels necessary after submission. [Hacker News guidelines](https://news.ycombinator.com/newsguidelines.html) say not to post generated or AI-edited text in comments, so write any comment yourself in your own words. Keep it factual and do not mention stars.

To print a factual note list for your own drafting:

```sh
npm run launch:show-hn:first-comment
```

## Pre-Submit Checklist

- Run `npm run launch:show-hn:ready`, or run the next two steps manually.
- Run `npm run launch:show-hn:review` and paste the completed review into issue `#7`, or run `npm run launch:show-hn:record-review`.
- Run `npm run launch:show-hn:preflight`.
- `gh-notify` has no negative reply or correction request.
- Issue `#7` is updated with the 24-hour review.
- Preflight confirms issue `#7` includes the second-wave 24-hour review, `gh-notify` status, and a no-negative-signal decision.
- Latest `Validate` workflow is green.
- Public audit page loads and shows `15-second audit flow`, `Try sample audit`, `Open demo audit`, and `Copy audit summary`.
- Repository stars/watchers/forks are recorded.
- No other public post is planned for the same 24-hour window.

## First 24 Hours

Allowed:

- Answer factual questions.
- Record missing-extension suggestions.
- Apply corrections quickly if someone points out inaccurate wording.
- Thank people for specific feedback.
- Run `npm run launch:show-hn:monitor -- --story STORY_URL` and paste snapshots into the tracker.

Not allowed:

- Asking for stars, upvotes, shares, or reposts.
- Posting to another public channel the same day.
- Sending more maintainer outreach.
- Turning maintainer thumbs-up reactions into endorsement claims.

## Response Monitoring

After the HN item exists, capture a factual snapshot:

```sh
npm run launch:show-hn:monitor -- --story STORY_URL
```

If you do not have the story URL handy, the monitor searches Hacker News for the audit URL:

```sh
npm run launch:show-hn:monitor
```

The output is Markdown-ready and includes:

- HN story URL, score, and comment count.
- GitHub stars/watchers/forks.
- GitHub traffic views, clones, referrers, and popular paths when the API allows access.
- The 24-hour guardrail reminder.

Use `--json` if you need a machine-readable snapshot.

After the first 24 hours, generate the review for issue `#8`:

```sh
npm run launch:show-hn:review-24h -- --story STORY_URL
```

To post it directly to issue `#8` after the 24-hour window has elapsed:

```sh
npm run launch:show-hn:review-24h -- --story STORY_URL --post
```

The review records HN score/comments, repository stars/watchers/forks, traffic, detected concern keywords in top-level comments, and a conservative decision. It refuses to post before the item is 24 hours old.

## Reply Notes

Do not copy generated reply text into Hacker News. Reply in your own words and keep comments short, factual, and specific to what the other person said.

Response principles:

- Missing extension: say you will check installability, docs, archived status, maintenance, and fit with the atlas criteria.
- Correction: thank them for the specific correction and say you will update the wording or metadata.
- Skeptical or promotional concern: acknowledge it, clarify that the goal is factual correction and useful missing-extension suggestions, and stop expanding the launch.
- Positive but no action needed: thank them briefly without asking for stars, upvotes, or sharing.

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
