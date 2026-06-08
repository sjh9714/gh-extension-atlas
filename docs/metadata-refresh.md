# Metadata Refresh

The atlas uses reviewed snapshot metadata. Refreshing it should be mechanical for fields GitHub already knows, and deliberate for fields that require judgment.

## Audit Live Metadata

Run a dry-run audit:

```sh
npm run metadata:audit
```

The audit checks each listed repository through the GitHub API and reports drift for:

- `stars`
- `license`
- `last_pushed_at`
- `archived`
- `verified_at`

It does not change category, summary, `best_for`, `avoid_if`, official ownership, or status labels.

## Apply A Mechanical Refresh

When the dry run looks reasonable:

```sh
npm run metadata:audit -- --write
npm test
npm run summary:weekly
```

Review the diff before committing. A large star-count diff is normal after time passes. A license, archive, or pushed-date change deserves a closer look.

## Archived Repository Guardrail

Archived repositories should not stay in the atlas. If the audit finds one, the script fails instead of silently writing it. Remove the entry or open a candidate replacement review before continuing.

## Human Review Still Matters

Do not use the audit as an automatic promotion tool. These fields remain curated:

- `category`
- `summary`
- `best_for`
- `avoid_if`
- `official`
- `status`

Update those only after reading the upstream README, release notes, or maintainer feedback.
