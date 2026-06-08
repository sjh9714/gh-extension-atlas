import { execFileSync } from "node:child_process";

const repo = "sjh9714/gh-extension-atlas";
const issueNumber = "8";
const auditUrl = "https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1";
const hnSearchBaseUrl = "https://hn.algolia.com/api/v1/search";
const hnItemBaseUrl = "https://hacker-news.firebaseio.com/v0/item";
const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const parsed = {
    post: false,
    story: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--post") {
      parsed.post = true;
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
  npm run launch:show-hn:review-24h
  npm run launch:show-hn:review-24h -- --story https://news.ycombinator.com/item?id=123
  npm run launch:show-hn:review-24h -- --story 123 --post

Generates the Show HN 24h review for sjh9714/gh-extension-atlas#8.
Use --post to comment on the tracker issue after the 24h window has elapsed.`);
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

function tryReadGhJson(argsForGh) {
  try {
    return { ok: true, value: readGhJson(argsForGh) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
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

async function fetchTopComments(story, limit = 12) {
  const ids = Array.isArray(story?.kids) ? story.kids.slice(0, limit) : [];
  const comments = [];

  for (const id of ids) {
    const comment = await fetchStoryById(id);
    if (comment && !comment.deleted && !comment.dead) {
      comments.push(comment);
    }
  }

  return comments;
}

function storyUrl(story) {
  return `https://news.ycombinator.com/item?id=${story.id}`;
}

function assertStoryMatches(story) {
  if (!story) {
    throw new Error("No Hacker News story found for the audit URL. Pass --story after submitting.");
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

function readTraffic() {
  return {
    views: tryReadGhJson(["api", `repos/${repo}/traffic/views`]),
    clones: tryReadGhJson(["api", `repos/${repo}/traffic/clones`]),
    referrers: tryReadGhJson(["api", `repos/${repo}/traffic/popular/referrers`]),
    paths: tryReadGhJson(["api", `repos/${repo}/traffic/popular/paths`]),
  };
}

function trafficSummary(result) {
  if (!result.ok) {
    return `unavailable (${result.error})`;
  }

  return `${result.value.count ?? 0} / ${result.value.uniques ?? 0} uniques`;
}

function topItems(result, key) {
  if (!result.ok) {
    return `unavailable (${result.error})`;
  }

  if (!Array.isArray(result.value) || !result.value.length) {
    return "none";
  }

  return result.value
    .slice(0, 5)
    .map((item) => `${item[key]} (${item.count}/${item.uniques} uniques)`)
    .join(", ");
}

function issueText() {
  const issue = readGhJson(["issue", "view", issueNumber, "--repo", repo, "--json", "body,comments"]);
  const comments = Array.isArray(issue.comments)
    ? issue.comments.map((comment) => comment.body || "").join("\n")
    : "";
  return `${issue.body || ""}\n${comments}`;
}

function hasConcern(comments) {
  const text = comments.map((comment) => stripHtml(comment.text || "")).join("\n");
  return /\b(wrong|incorrect|inaccurate|misleading|spam|promotional|broken|doesn't work|does not work|privacy|tracking|upload)\b/i.test(text);
}

function stripHtml(text) {
  return text
    .replace(/<p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .trim();
}

function decision({ story, metrics, comments, elapsedHours }) {
  if (story.dead || story.deleted) {
    return "Pause public sharing and review whether the HN item was flagged, dead, or deleted.";
  }

  if (hasConcern(comments)) {
    return "Pause public sharing and handle feedback before any next launch action.";
  }

  if (metrics.stargazerCount >= 16) {
    return "Verify Starstruck threshold reached and close the launch goal.";
  }

  if (elapsedHours < 24) {
    return "Keep first-24h guardrail active; do not cross-post yet.";
  }

  if ((story.score ?? 0) >= 8 || (story.descendants ?? 0) >= 3) {
    return "Keep launch activity paused and respond to inbound HN feedback before planning any next channel.";
  }

  return "Keep launch activity paused; wait for meaningful inbound signal before another public share.";
}

function renderReview({ story, metrics, traffic, comments, now }) {
  const submittedAt = new Date((story.time || 0) * 1000);
  const elapsedHours = story.time ? (now.getTime() - submittedAt.getTime()) / 3600000 : 0;
  const storyComments = story.descendants ?? 0;
  const commentConcern = hasConcern(comments);

  return `## Show HN 24h review

- Checked at: ${formatKst(now)} KST
- Story: ${storyUrl(story)}
- Submitted at: ${story.time ? `${formatKst(submittedAt)} KST` : "unknown"}
- Elapsed: ${elapsedHours.toFixed(1)} hours
- HN response:
  - Score: ${story.score ?? 0}
  - Comments: ${storyComments}
  - Dead/deleted: ${story.dead || story.deleted ? "yes" : "no"}
  - Top-comment concern keywords: ${commentConcern ? "yes - review manually" : "no"}
- Corrections requested: ${commentConcern ? "Review HN comments manually before next action." : "none detected from top-level comment scan"}
- Corrections applied: none in this review
- Missing-extension suggestions: ${storyComments ? "Review HN comments manually and open candidate issues when specific suggestions appear." : "none detected"}
- Stars: ${metrics.stargazerCount}
- Watchers: ${metrics.watchers.totalCount}
- Forks: ${metrics.forkCount}
- Traffic notes:
  - Views: ${trafficSummary(traffic.views)}
  - Clones: ${trafficSummary(traffic.clones)}
  - Referrers: ${topItems(traffic.referrers, "referrer")}
  - Paths: ${topItems(traffic.paths, "path")}
- Decision: ${decision({ story, metrics, comments, elapsedHours })}
`;
}

function canPostReview(review, story) {
  if (!story.time) {
    return "HN story submission time is missing.";
  }

  const elapsedMs = Date.now() - story.time * 1000;
  if (elapsedMs < 24 * 60 * 60 * 1000) {
    return "The Show HN item is less than 24 hours old.";
  }

  if (issueText().includes("## Show HN 24h review")) {
    return "Issue #8 already contains a Show HN 24h review.";
  }

  if (!review.includes(storyUrl(story))) {
    return "Review text does not include the HN story URL.";
  }

  return "";
}

async function main() {
  const story = await findStory();
  assertStoryMatches(story);

  const comments = await fetchTopComments(story);
  const metrics = readRepoMetrics();
  const traffic = readTraffic();
  const review = renderReview({ story, metrics, traffic, comments, now: new Date() });

  console.log(review);

  if (args.post) {
    const blocker = canPostReview(review, story);
    if (blocker) {
      console.error(`Not posting issue #8 review: ${blocker}`);
      process.exitCode = 1;
      return;
    }

    const commentUrl = runGh(["issue", "comment", issueNumber, "--repo", repo, "--body", review]);
    console.log(`Posted issue #8 24h review: ${commentUrl}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
