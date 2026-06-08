import { execFileSync } from "node:child_process";

const repo = "sjh9714/gh-extension-atlas";
const issueNumber = "8";
const auditUrl = "https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1";
const hnSearchBaseUrl = "https://hn.algolia.com/api/v1/search";
const hnItemBaseUrl = "https://hacker-news.firebaseio.com/v0/item";
const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const parsed = {
    dryRun: false,
    story: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      parsed.dryRun = true;
    } else if (arg === "--story") {
      parsed.story = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage:
  npm run launch:show-hn:record-share
  npm run launch:show-hn:record-share -- --story https://news.ycombinator.com/item?id=123
  npm run launch:show-hn:record-share -- --story 123 --dry-run

Records an existing Show HN story in sjh9714/gh-extension-atlas#8.
It never submits to Hacker News.`);
}

function runGh(argsForGh) {
  try {
    return execFileSync("gh", argsForGh, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch (error) {
    const detail = error.stderr?.toString().trim() || error.message;
    throw new Error(`gh ${argsForGh.join(" ")} failed: ${detail}`);
  }
}

function readGhJson(argsForGh) {
  return JSON.parse(runGh(argsForGh));
}

function storyIdFrom(value) {
  if (!value) {
    return "";
  }

  if (/^\d+$/.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);
    return url.searchParams.get("id") || "";
  } catch {
    return "";
  }
}

function formatKst(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date).replace(",", "");
}

async function findStory() {
  const explicitId = storyIdFrom(args.story);
  if (explicitId) {
    return fetchStoryById(explicitId);
  }

  const url = new URL(hnSearchBaseUrl);
  url.searchParams.set("query", auditUrl);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "5");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HN search returned HTTP ${response.status}`);
  }

  const search = await response.json();
  const hit = (search.hits || []).find((item) => item.url === auditUrl);
  if (!hit?.objectID) {
    return null;
  }

  return fetchStoryById(hit.objectID);
}

async function fetchStoryById(id) {
  const response = await fetch(`${hnItemBaseUrl}/${encodeURIComponent(id)}.json`);
  if (!response.ok) {
    throw new Error(`HN item ${id} returned HTTP ${response.status}`);
  }

  return response.json();
}

function storyUrl(story) {
  return `https://news.ycombinator.com/item?id=${story.id}`;
}

function assertStoryMatches(story) {
  if (!story) {
    throw new Error("No Hacker News story found for the audit URL. Pass --story after submitting.");
  }

  if (story.deleted || story.dead) {
    throw new Error(`HN story appears deleted or dead: ${storyUrl(story)}`);
  }

  if (story.url !== auditUrl) {
    throw new Error(`HN story target mismatch. Expected ${auditUrl}, got ${story.url || "(none)"}.`);
  }

  if (!/^show hn:/i.test(story.title || "")) {
    throw new Error(`HN story title does not look like Show HN: ${story.title || "(untitled)"}`);
  }
}

function readRepoMetrics() {
  return readGhJson(["repo", "view", repo, "--json", "stargazerCount,watchers,forkCount,url"]);
}

function issueText() {
  const issue = readGhJson(["issue", "view", issueNumber, "--repo", repo, "--json", "body,comments"]);
  const comments = Array.isArray(issue.comments)
    ? issue.comments.map((comment) => comment.body || "").join("\n")
    : "";
  return `${issue.body || ""}\n${comments}`;
}

function renderComment(story, metrics) {
  const url = storyUrl(story);
  const checkedAtKst = formatKst(new Date());

  return `## Show HN share recorded

| Channel | URL | Sent | Response | Change needed |
| --- | --- | --- | --- | --- |
| Hacker News / Show HN | ${url} | ${checkedAtKst} KST |  |  |

Initial snapshot:
- Title: ${story.title || "(untitled)"}
- Submission target: ${story.url || "(none)"}
- HN score/comments: ${story.score ?? 0}/${story.descendants ?? 0}
- Repo stars/watchers/forks: ${metrics.stargazerCount}/${metrics.watchers.totalCount}/${metrics.forkCount}

Guardrail:
- Do not post to another public channel for 24 hours.
- Do not send more maintainer outreach today.
- Respond only to factual feedback, missing-extension suggestions, or correction requests.

Next monitor command:

\`\`\`sh
npm run launch:show-hn:monitor -- --story ${url}
\`\`\``;
}

async function main() {
  const story = await findStory();
  assertStoryMatches(story);

  const url = storyUrl(story);
  const metrics = readRepoMetrics();
  const comment = renderComment(story, metrics);

  console.log(comment);

  if (issueText().includes(url)) {
    console.log("");
    console.log(`Issue #${issueNumber} already records ${url}.`);
    return;
  }

  if (args.dryRun) {
    console.log("");
    console.log("Dry run: not posting to issue #8.");
    return;
  }

  const commentUrl = runGh(["issue", "comment", issueNumber, "--repo", repo, "--body", comment]);
  console.log("");
  console.log(`Recorded Show HN share in issue #${issueNumber}: ${commentUrl}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
