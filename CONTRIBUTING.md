# Contributing

Thanks for helping improve the GitHub CLI Extension Atlas.

## What belongs here

Add an extension when it is useful to more than one project, installable with `gh extension install OWNER/REPO`, and documented well enough that readers can evaluate it quickly.

The atlas excludes archived repositories, unclear demos, one-off internal tools, and entries whose main value is promotion rather than practical utility.

## Entry requirements

Every entry in `data/extensions.json` must include:

- `repo`: GitHub repository in `OWNER/REPO` form.
- `name`: Extension command name without the `gh ` prefix.
- `category`: One of the categories already used in the atlas.
- `summary`: One short sentence.
- `install`: The exact `gh extension install OWNER/REPO` command.
- `best_for`: The practical situation where this extension is useful.
- `avoid_if`: A short reason someone might skip it.
- `stars`: Current GitHub star count when verified.
- `license`: SPDX identifier or `NOASSERTION`.
- `last_pushed_at`: Repository `pushed_at` timestamp from GitHub.
- `archived`: Must be `false`.
- `official`: `true` only for GitHub-owned or GitHub-maintained projects.
- `verified_at`: Date in `YYYY-MM-DD` format.
- `status`: `active`, `watch`, or `stale`.

## Status guide

- `active`: The repo was pushed within roughly the last year and appears installable.
- `watch`: The repo is useful, but maintenance activity is limited.
- `stale`: The repo is notable, but users should verify compatibility before adopting it.

## Pull request checklist

- Run `npm test`.
- Run `npm run lint:awesome:strict` after the GitHub repository is published and at least 30 days old.
- Keep descriptions factual and specific.
- Do not add archived repositories.
- Do not add paid placement.
- If two tools solve the same problem, explain the difference in the relevant comparison guide.

## Manual verification

For top-pick candidates, test installation with an isolated GitHub CLI config directory:

```sh
tmp="$(mktemp -d)"
GH_CONFIG_DIR="$tmp/config" XDG_DATA_HOME="$tmp/data" gh extension install OWNER/REPO
rm -rf "$tmp"
```

Only promote an extension to the README Top Picks section when the docs, install path, and use case are clear.
