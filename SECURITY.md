# Security Policy

GitHub CLI Extension Atlas is a curated catalog and static website. It does not publish executable installers, tokens, or package artifacts. The main security risk is inaccurate catalog data that could send readers toward a risky repository, stale maintenance signal, or misleading install command.

## Supported scope

Security-relevant reports for this project include:

- A listed extension repository is archived, compromised, renamed, or no longer installable.
- An install command points to the wrong repository.
- A security/admin entry is categorized or described in a misleading way.
- A generated install bundle, JSON endpoint, or detail page contains stale or unsafe guidance.
- Project documentation accidentally exposes a secret, token, private URL, or sensitive personal information.

Reports outside this scope, such as vulnerabilities in a listed third-party extension, should usually be reported to that extension's upstream repository first. The atlas can still update metadata or add warnings after the upstream status is clear.

## Reporting

For public catalog corrections, use the most specific issue form:

- [Fix metadata](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=fix-metadata.yml)
- [Site, API, or install bundle feedback](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=site-api-feedback.yml)

If the report includes a secret, credential, private repository URL, or other sensitive detail, do not paste it into a public issue. Open a minimal public issue saying that a sensitive security report is needed, without including the secret itself, so a maintainer can choose a safer follow-up path.

## Install bundle safety

Install bundles in this repository are plain-text convenience files. Review commands before running them, and install only the extensions that fit your workflow.

Avoid piping install bundles directly into a shell:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt | sh
```

Inspect first instead:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/top-picks.txt
```

## Maintenance response

Security-relevant catalog corrections are handled before new outreach or promotion. Accepted fixes should update the relevant catalog data, README table, generated page, comparison guide, or install bundle, then pass `npm test`.
