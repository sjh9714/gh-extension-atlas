# GitHub AI And Agent CLI Extension Guide

Use this guide when you want to try GitHub-native agent workflows, GitHub Models, AI-assisted standup reports, or MCP setup from the GitHub CLI.

Readable HTML version: https://sjh9714.github.io/gh-extension-atlas/guides/ai-agent-extensions.html

The short version:

| If you need to... | Start with | Why |
| --- | --- | --- |
| Run GitHub-native agent workflows | [`gh-aw`](https://github.com/github/gh-aw) | It is the strongest first stop when the workflow itself is an agent task. |
| Test prompts and models from the terminal | [`gh-models`](https://github.com/github/gh-models) | It is useful when you want GitHub Models inside an existing `gh` workflow. |
| Generate an AI-assisted standup report | [`gh-standup`](https://github.com/sgoedecke/gh-standup) | It is a focused helper when the repeated task is summarizing GitHub activity. |
| Connect AI tools to GitHub through MCP | [`gh-mcp`](https://github.com/shuymn/gh-mcp) | It is a practical bridge for running GitHub MCP Server with existing `gh` authentication. |

## First Pick

Start with [`gh-aw`](https://github.com/github/gh-aw) when you want to run GitHub-native agent workflows from the terminal.

Install:

```sh
gh extension install github/gh-aw
```

Use [`gh-models`](https://github.com/github/gh-models) when the task is prompt and model experimentation through GitHub Models.

Install:

```sh
gh extension install github/gh-models
```

Use [`gh-mcp`](https://github.com/shuymn/gh-mcp) when another AI client needs GitHub context and you want MCP setup to reuse existing GitHub CLI authentication.

Install:

```sh
gh extension install shuymn/gh-mcp
```

## Activity Summaries

Use [`gh-standup`](https://github.com/sgoedecke/gh-standup) when the repeated job is summarizing GitHub activity into a written standup update.

Install:

```sh
gh extension install sgoedecke/gh-standup
```

This is narrower than an agent workflow runner or model CLI. It is best when the output you want is a human-readable update, not an autonomous workflow.

## Starter Pack

The atlas publishes a small AI and agents starter pack:

```sh
curl -fsSL https://sjh9714.github.io/gh-extension-atlas/install/starter-packs/ai-and-agents.txt
```

Review the commands before installing. Do not pipe install bundles directly into a shell.

The starter pack currently includes:

```sh
gh extension install github/gh-aw
gh extension install github/gh-models
gh extension install shuymn/gh-mcp
```

## Data Endpoints

Use these when you want the AI/Agents subset programmatically:

- [AI/Agents category page](https://sjh9714.github.io/gh-extension-atlas/categories/ai-agents.html)
- [AI/Agents category JSON](https://sjh9714.github.io/gh-extension-atlas/api/categories/ai-agents.json)
- [AI/Agents install commands](https://sjh9714.github.io/gh-extension-atlas/install/categories/ai-agents.txt)
- [Public API Reference](../api-reference.md)

## Selection Notes

The atlas is a reviewed snapshot, not a live ranking. Recheck upstream repositories before adopting an AI or agent extension, especially when the extension can access repository data, call external models, or configure MCP access.

Use agent workflow tools when GitHub is the work surface, Models tools when prompt iteration is the task, and MCP helpers when another AI client needs authenticated GitHub context.
