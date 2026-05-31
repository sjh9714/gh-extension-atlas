# Maintenance Playbook

This playbook keeps the atlas useful after launch. The bias is toward trust: factual descriptions, visible maintenance status, and conservative promotion.

## Weekly Update

1. Run `git pull --ff-only`.
2. Run `npm test`.
3. Run `npm run summary:weekly`.
4. Check the open issues for extension suggestions or metadata fixes.
5. Re-check Top Picks that changed recently or received correction requests.
6. Commit any accepted metadata, README, or comparison-guide updates.

## Extension Status

Use these labels consistently:

| Status   | Meaning                                                         |
| -------- | --------------------------------------------------------------- |
| `active` | Useful and pushed within roughly the last year.                 |
| `watch`  | Useful, but maintenance should be checked before adopting.      |
| `stale`  | Still notable, but verify compatibility before depending on it. |

Archived repositories should be removed instead of marked stale. If a project is replaced by another maintained extension, note the replacement in the relevant comparison guide.

## Top Picks Review

Before promoting an extension to Top Picks:

1. Confirm the repository is not archived.
2. Confirm the repo name starts with `gh-`.
3. Install it with isolated paths:

```sh
tmp="$(mktemp -d)"
GH_CONFIG_DIR="$tmp/config" XDG_DATA_HOME="$tmp/data" gh extension install OWNER/REPO
rm -rf "$tmp"
```

4. Confirm the README explains the use case.
5. Confirm the atlas description is specific and not promotional.

## 30-Day Awesome Readiness

After the repository is at least 30 days old:

1. Run `npm run lint:awesome:strict`.
2. Confirm topics include `awesome` and `awesome-list`.
3. Confirm the license is detected as `CC0-1.0`.
4. Confirm the list is not a duplicate of another awesome list; the atlas must keep its comparison and maintenance-angle differentiation.
5. Prepare a short explanation of why this list is curated rather than a raw topic scrape.

## Handling Suggestions

Accept an extension when it is installable, documented, broadly useful, and fits an existing category or clearly justifies a new one.

Ask for more detail when a suggestion only says that a project is "awesome" without explaining the workflow it solves.

Decline or defer entries that are archived, not installable through `gh extension install`, undocumented, purely personal demos, or mainly promotional.
