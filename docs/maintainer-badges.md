# Maintainer Badge Snippets

Each generated extension detail page includes an optional badge snippet for maintainers who want to point users to the atlas comparison context.

This is optional. It is not required for factual corrections, and it should not be treated as an endorsement request. Use a badge only when the atlas listing is accurate enough that you are comfortable linking to it.

## When to use one

Use an atlas badge when:

- Your extension is listed in the atlas.
- The summary, install command, category, and maintenance status look accurate.
- You want users to compare nearby GitHub CLI extensions before installing yours.
- You are comfortable linking to a reviewed snapshot rather than a live ranking.

Do not use one when:

- The listing is wrong or outdated.
- The extension is no longer maintained or installable.
- The badge would imply official GitHub endorsement or maintainer endorsement.
- You only want the badge as a promotional marker without useful comparison context.

## Example

For `dlvhdr/gh-dash`, the generated detail page is:

```text
https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html
```

Markdown:

```md
[![Listed in GitHub CLI Extension Atlas](https://img.shields.io/badge/GitHub%20CLI%20Extension%20Atlas-listed-blue)](https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html)
```

HTML:

```html
<a href="https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html"><img alt="Listed in GitHub CLI Extension Atlas" src="https://img.shields.io/badge/GitHub%20CLI%20Extension%20Atlas-listed-blue"></a>
```

## Finding your page

Use the badge builder to filter the reviewed catalog and copy Markdown or HTML:

```text
https://sjh9714.github.io/gh-extension-atlas/badges.html
```

Open the searchable catalog, choose your extension, and copy the snippet from the `Maintainer Snippet` section:

```text
https://sjh9714.github.io/gh-extension-atlas/
```

Generated detail pages use this pattern:

```text
https://sjh9714.github.io/gh-extension-atlas/extensions/{owner-repo}.html
```

For example:

| Repository | Detail page |
| --- | --- |
| `dlvhdr/gh-dash` | `https://sjh9714.github.io/gh-extension-atlas/extensions/dlvhdr-gh-dash.html` |
| `gennaro-tedesco/gh-s` | `https://sjh9714.github.io/gh-extension-atlas/extensions/gennaro-tedesco-gh-s.html` |
| `meiji163/gh-notify` | `https://sjh9714.github.io/gh-extension-atlas/extensions/meiji163-gh-notify.html` |

## Corrections first

If the listing is inaccurate, please open a correction instead of linking the badge:

- [Fix metadata](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=fix-metadata.yml)
- [Site, API, or install bundle feedback](https://github.com/sjh9714/gh-extension-atlas/issues/new?template=site-api-feedback.yml)

The atlas should stay useful because its descriptions are conservative and correct, not because maintainers feel pressure to add badges.
