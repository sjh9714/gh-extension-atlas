# GitHub Repository Search CLI Extension Guide

Use this guide when GitHub search is useful, but switching back to the browser interrupts the terminal workflow you are already in.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/repository-search-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Search repositories interactively | [`gh-s`](https://github.com/gennaro-tedesco/gh-s) | It is the best first stop when repository discovery is the main job. |
| Search repository content without cloning | [`gh-grep`](https://github.com/k1LoW/gh-grep) | It is good when you want API-backed content search from the terminal. |
| Search GitHub code with fzf | [`gh-find-code`](https://github.com/LangLangBart/gh-find-code) | It is useful when interactive code search matters more than repository search. |
| Search your starred repositories | [`gh-stars`](https://github.com/Link-/gh-stars) | It is a focused active option for treating stars as a personal knowledge base. |
| Browse a large starred-repository collection | [`gh-user-stars`](https://github.com/korosuke613/gh-user-stars) | It is useful for personal star libraries, but verify compatibility because the project is stale. |
| Search and clone into a local repo workspace | [`gh-q`](https://github.com/kawarimidoll/gh-q) | It is best when discovery should lead directly into local repository organization. |
| Explore a repository before cloning it | [`gh-repo-explore`](https://github.com/samcoe/gh-repo-explore) | It is a narrow explorer workflow, but verify compatibility because the project is stale. |

## First Pick

Start with [`gh-s`](https://github.com/gennaro-tedesco/gh-s) when the job is repository discovery. It is the simplest first tool when you know the topic or keyword but do not know which repository to open.

Install:

```sh
gh extension install gennaro-tedesco/gh-s
```

Use [`gh-grep`](https://github.com/k1LoW/gh-grep) when you need matching lines from repository content without cloning first.

Install:

```sh
gh extension install k1LoW/gh-grep
```

Use [`gh-find-code`](https://github.com/LangLangBart/gh-find-code) when you want interactive code search with fzf-style selection.

Install:

```sh
gh extension install LangLangBart/gh-find-code
```

## Starred Repository Search

Use [`gh-stars`](https://github.com/Link-/gh-stars) when your GitHub stars are a personal toolbox and you need to search them from the terminal.

Install:

```sh
gh extension install Link-/gh-stars
```

Use [`gh-user-stars`](https://github.com/korosuke613/gh-user-stars) when you want an interactive starred-repository browser. The atlas marks it `stale`, so check current compatibility before depending on it.

Install:

```sh
gh extension install korosuke613/gh-user-stars
```

## Local Workspace Flow

Use [`gh-q`](https://github.com/kawarimidoll/gh-q) when search should connect to local repository organization through `ghq`.

Install:

```sh
gh extension install kawarimidoll/gh-q
```

Use [`gh-f`](https://github.com/gennaro-tedesco/gh-f) when you want a compact fuzzy GitHub workflow and already like fzf-style terminal selection.

Install:

```sh
gh extension install gennaro-tedesco/gh-f
```

Use [`gh-repo-explore`](https://github.com/samcoe/gh-repo-explore) only after checking current compatibility. It can be useful for inspecting unfamiliar repositories before cloning, but the atlas marks it `stale`.

Install:

```sh
gh extension install samcoe/gh-repo-explore
```

## Starter Pack

The atlas publishes a search and discovery starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/search-and-discovery.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install gennaro-tedesco/gh-s
gh extension install k1LoW/gh-grep
gh extension install LangLangBart/gh-find-code
```

## Data Endpoints

Use these when you want the Search subset programmatically:

- [Search category page](https://sjh9714.github.io/gh-extension-atlas/categories/search.html)
- [Search category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/search.json)
- [Search install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/search.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting a search extension, especially when it depends on fzf, ghq, GitHub API rate limits, or older search endpoints.

Prefer active projects for default recommendations. Keep stale projects in view only when they solve a specific search workflow and you have time to verify them.
