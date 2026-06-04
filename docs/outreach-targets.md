# Outreach Targets

This list keeps the first launch push focused and human. Do not mass-post. Start with accuracy checks, then share in places where GitHub CLI users already gather.

## Recommended Sequence

1. Check each target repository for a suitable issue tracker, discussion space, README contact path, or maintainer preference.
2. Send the first two maintainer verification requests.
3. Wait 12-24 hours and review whether the tone, channel fit, and response quality still feel acceptable.
4. Send the next three maintainer verification requests only if the first two feel safe.
5. Keep the remaining Top Picks for a second wave after corrections are handled.
6. Share once in a GitHub CLI community space.
7. Publish a short article only after maintainer corrections are handled.
8. Review article feedback for 24 hours and fix factual corrections first.
9. Post a concise social update only if there is no negative signal or pending correction.

## Top Picks Maintainer Targets

Use the maintainer verification draft or ready messages in [`docs/launch-kit.md`](launch-kit.md). Open an issue only when the repository has a suitable issue tracker and the message is specific to that project. If the repository asks users not to open issues for this kind of contact, use a discussion or documented contact path instead.

| Wave                    | Order | Extension             | Repository                                                                      | Ask                                       |
| ----------------------- | ----- | --------------------- | ------------------------------------------------------------------------------- | ----------------------------------------- |
| First two               | 1     | `gh-markdown-preview` | [yusukebe/gh-markdown-preview](https://github.com/yusukebe/gh-markdown-preview) | Verify Markdown preview wording.          |
| First two               | 2     | `gh-workflow-stats`   | [fchimpan/gh-workflow-stats](https://github.com/fchimpan/gh-workflow-stats)     | Verify CI health wording.                 |
| Next three after 12-24h | 3     | `gh-poi`              | [seachicken/gh-poi](https://github.com/seachicken/gh-poi)                       | Verify branch cleanup safety description. |
| Next three after 12-24h | 4     | `gh-pr-review`        | [agynio/gh-pr-review](https://github.com/agynio/gh-pr-review)                   | Verify inline review workflow wording.    |
| Next three after 12-24h | 5     | `gh-dash`             | [dlvhdr/gh-dash](https://github.com/dlvhdr/gh-dash)                             | Verify dashboard positioning and wording. |

## Second-Wave Maintainer Targets

Hold these until after the first-wave response quality is reviewed.

| Extension   | Repository                                                                | Ask                                           |
| ----------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| `gh-aw`     | [github/gh-aw](https://github.com/github/gh-aw)                           | Verify official agentic workflow description. |
| `gh-stack`  | [github/gh-stack](https://github.com/github/gh-stack)                     | Verify stacked PR wording.                    |
| `gh-sbom`   | [advanced-security/gh-sbom](https://github.com/advanced-security/gh-sbom) | Verify SBOM use case and maintenance status.  |
| `gh-s`      | [gennaro-tedesco/gh-s](https://github.com/gennaro-tedesco/gh-s)           | Verify repository search wording.             |
| `gh-notify` | [meiji163/gh-notify](https://github.com/meiji163/gh-notify)               | Verify notification workflow wording.         |

## Active Community Targets

| Channel                | Fit                                                                                | Draft                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| GitHub CLI Discussions | Highest relevance if there is an appropriate showcase or extension-related thread. | Use the GitHub Discussions draft in [`docs/launch-kit.md`](launch-kit.md). |
| Dev.to or Hashnode     | Good for a fuller explanation and search traffic.                                  | Use the article draft.                                                     |
| X or LinkedIn          | Good for a short launch note and follow-up thread.                                 | Use the short social draft.                                                |

## Parked Community Targets

| Channel       | Status      | Reason                                           |
| ------------- | ----------- | ------------------------------------------------ |
| r/commandline | Not planned | Rules and tone risk; avoid over-promotion.       |
| r/github      | Not planned | Avoid over-posting and generic self-promotion.   |

## Avoid

- Posting the same text everywhere on the same day.
- Asking maintainers only for stars.
- Opening issues in third-party repos without a clear correction request.
- Framing the atlas as complete or official.
- Promising rankings that are not backed by the data.
