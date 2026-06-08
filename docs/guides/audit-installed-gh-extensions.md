# Audit Installed GitHub CLI Extensions

Use this guide when you already have GitHub CLI extensions installed and want to compare them with the reviewed atlas catalog.

The audit is useful for:

- finding installed extensions that are already listed in the atlas,
- spotting installed extensions that may be missing from the atlas,
- checking which Top Picks are not installed,
- seeing workflow coverage across triage, Actions, docs, search, security, and AI helpers.

## Browser Audit

Open the browser audit page:

```text
https://sjh9714.github.io/gh-extension-atlas/audit.html
```

Then run:

```sh
gh extension list
```

Paste the output into the page and choose `Run audit`.

The browser page runs locally in your browser. It does not submit pasted extension output to a server.

## Local Audit

From a clone of this repository, run:

```sh
npm --silent run catalog:audit-installed
```

Or pipe saved/live output:

```sh
gh extension list | npm --silent run catalog:audit-installed -- --stdin
```

Use JSON output for scripts:

```sh
gh extension list | npm --silent run catalog:audit-installed -- --stdin --format json
```

Print install commands for missing Top Picks:

```sh
gh extension list | npm --silent run catalog:audit-installed -- --stdin --format install
```

## Reading The Output

`Installed And Reviewed` means the extension appears in `data/extensions.json`.

`Installed But Not In Atlas` means the extension may be a candidate for review. It does not mean the extension is bad or unsupported.

`Missing Top Picks` means a Top Pick is absent from the pasted list. Review each command before installing; do not install every missing item blindly.

`Workflow Coverage` shows whether your installed extensions overlap with the atlas starter recommendations for common workflows.

## Suggesting Missing Extensions

If an installed extension looks broadly useful, documented, installable with `gh extension install`, and not archived, open an add-extension request:

```text
https://github.com/sjh9714/gh-extension-atlas/issues/new?template=add-extension.yml
```

The atlas is intentionally conservative. A missing extension should be reviewed before it is added, even if it appears in your local install list.
