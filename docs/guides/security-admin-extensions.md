# GitHub Security And Admin CLI Extension Guide

Use this guide when security, repository administration, token, webhook, or migration work is part of your GitHub CLI workflow.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/security-admin-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Generate an SBOM for release or compliance work | [`gh-sbom`](https://github.com/advanced-security/gh-sbom) | It is the strongest first stop when the output you need is a software bill of materials. |
| Inspect code scanning findings | [`gh-code-scanning`](https://github.com/advanced-security/gh-code-scanning) | It is a focused way to view GitHub code scanning data from the terminal. |
| Run CodeQL workflows | [`gh-codeql`](https://github.com/github/gh-codeql) | It is useful for security engineers who need CodeQL commands in their `gh` workflow. |
| Run CodeQL queries across many repositories | [`gh-mrva`](https://github.com/GitHubSecurityLab/gh-mrva) | It targets multi-repository variant analysis; verify fit because it is marked `watch`. |
| Work directly with CodeQL databases | [`gh-qldb`](https://github.com/GitHubSecurityLab/gh-qldb) | It is useful when CodeQL database management is the task, not general scanning. |
| Create GitHub App installation tokens | [`gh-token`](https://github.com/Link-/gh-token) | It is a practical helper for GitHub App authentication and automation workflows. |
| Manage GitHub infrastructure with YAML | [`gh-infra`](https://github.com/babarot/gh-infra) | It is best when repository and organization settings should be reviewed as code. |
| Standardize repository configuration | [`gh-repo-config`](https://github.com/twelvelabs/gh-repo-config) | It is a focused option for teams that repeatedly adjust repository settings. |
| Test webhook-driven integrations | [`gh-webhook`](https://github.com/cli/gh-webhook) | It is useful when local or development webhook workflows are the main problem. |
| Support GitHub Enterprise Importer migrations | [`gh-gei`](https://github.com/github/gh-gei) | It is the canonical extension for Enterprise Importer migration workflows. |
| Collect repository inventory for migrations | [`gh-repo-stats`](https://github.com/mona-actions/gh-repo-stats) | It is useful when migration planning starts with repository metadata collection. |

## First Pick

Start with [`gh-sbom`](https://github.com/advanced-security/gh-sbom) when the task is evidence generation: producing a software bill of materials for release, audit, or compliance workflows.

Install:

```sh
gh extension install advanced-security/gh-sbom
```

Use [`gh-code-scanning`](https://github.com/advanced-security/gh-code-scanning) when you need quick access to GitHub code scanning findings from the terminal.

Install:

```sh
gh extension install advanced-security/gh-code-scanning
```

Use [`gh-token`](https://github.com/Link-/gh-token) when automation depends on GitHub App installation access tokens.

Install:

```sh
gh extension install Link-/gh-token
```

## CodeQL And Security Analysis

Use [`gh-codeql`](https://github.com/github/gh-codeql) when you want CodeQL commands to sit inside your GitHub CLI workflow.

Install:

```sh
gh extension install github/gh-codeql
```

Use [`gh-mrva`](https://github.com/GitHubSecurityLab/gh-mrva) when the job is multi-repository variant analysis. The atlas marks it `watch`, so check current project fit before depending on it.

Install:

```sh
gh extension install GitHubSecurityLab/gh-mrva
```

Use [`gh-qldb`](https://github.com/GitHubSecurityLab/gh-qldb) when you need to manage CodeQL databases directly. The atlas marks it `watch`, so verify compatibility first.

Install:

```sh
gh extension install GitHubSecurityLab/gh-qldb
```

## Admin, Webhooks, And Migration

Use [`gh-infra`](https://github.com/babarot/gh-infra) when repository and organization settings should be represented in YAML and reviewed as code.

Install:

```sh
gh extension install babarot/gh-infra
```

Use [`gh-repo-config`](https://github.com/twelvelabs/gh-repo-config) when the repeated work is repository configuration standardization.

Install:

```sh
gh extension install twelvelabs/gh-repo-config
```

Use [`gh-webhook`](https://github.com/cli/gh-webhook) when you are testing webhook-driven integrations and want the workflow close to `gh`.

Install:

```sh
gh extension install cli/gh-webhook
```

Use [`gh-gei`](https://github.com/github/gh-gei) when the project is a GitHub Enterprise Importer migration.

Install:

```sh
gh extension install github/gh-gei
```

Use [`gh-repo-stats`](https://github.com/mona-actions/gh-repo-stats) when migration planning starts with repository metadata and inventory collection.

Install:

```sh
gh extension install mona-actions/gh-repo-stats
```

## Starter Pack

The atlas publishes a small security and admin starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/security-and-admin.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install advanced-security/gh-sbom
gh extension install Link-/gh-token
gh extension install github/gh-gei
```

## Data Endpoints

Use these when you want the Security/Admin subset programmatically:

- [Security/Admin category page](https://sjh9714.github.io/gh-extension-atlas/categories/security-admin.html)
- [Security/Admin category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/security-admin.json)
- [Security/Admin install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/security-admin.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a security or admin extension, especially when it can create tokens, inspect private security findings, manage repository settings, or support enterprise migrations.

Use security tools when you need evidence or analysis. Use admin tools when the work is repository configuration, GitHub App authentication, webhooks, or migration support.
