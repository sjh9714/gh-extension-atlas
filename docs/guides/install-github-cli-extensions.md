# Install GitHub CLI Extensions Safely

Use this guide when you want to install, update, list, or remove a GitHub CLI extension without treating every `gh-extension` topic result as equally safe.

GitHub CLI extensions are not verified, signed, or endorsed by GitHub. When you install or upgrade an extension, you are trusting its publisher. Review the upstream repository before adding an extension to a repeated workflow.

## Before You Install

Check four things first:

- the repository is not archived,
- the README explains what the extension does,
- the install command uses the expected `OWNER/REPO` path,
- the extension still looks maintained enough for your use case.

The atlas records these review notes in `data/extensions.json`, including `archived`, `status`, `last_pushed_at`, and `verified_at`.

## Install One Extension

Use `OWNER/REPO` format:

```sh
gh extension install dlvhdr/gh-dash
```

You can also install from a full repository URL when the extension is hosted outside `github.com`:

```sh
gh extension install https://my.ghes.example.com/owner/gh-extension
```

## List Installed Extensions

```sh
gh extension list
```

To compare your installed extensions with the atlas, use the browser audit page:

```text
https://sjh9714.github.io/gh-extension-atlas/audit.html
```

Or run the local audit script from this repository:

```sh
gh extension list | npm --silent run catalog:audit-installed -- --stdin
```

## Update Extensions

Check what would update first:

```sh
gh extension upgrade --all --dry-run
```

Upgrade everything installed:

```sh
gh extension upgrade --all
```

Upgrade one extension:

```sh
gh extension upgrade gh-dash
```

## Remove An Extension

```sh
gh extension remove gh-dash
```

Then confirm it is gone:

```sh
gh extension list
```

## Pin A Version

Use `--pin` when you need a specific release tag or commit ref:

```sh
gh extension install OWNER/REPO --pin v1.2.3
```

Pinned installs can be useful for reproducible team setup, but they also mean you need to decide when to upgrade.

## Pick A First Extension

If you do not know which extension to install, start with the decision tree:

```text
https://sjh9714.github.io/gh-extension-atlas/guides/choose-github-cli-extension.html
```

For workflow bundles, inspect the install bundle first and copy only what you understand:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/github-actions-operator.txt
```

Do not pipe install bundles directly into a shell.

## Good Defaults

- Install one extension at a time.
- Prefer active, documented repositories.
- Use `gh extension upgrade --all --dry-run` before broad updates.
- Remove tools that you tried once and no longer use.
- Recheck upstream repositories before adopting tools that can modify branches, CI, releases, security findings, tokens, or repository settings.
