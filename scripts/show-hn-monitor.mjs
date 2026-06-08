import { execFileSync } from "node:child_process";

const repo = "sjh9714/gh-extension-atlas";
const auditUrl = "https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1";
const hnSearchBaseUrl = "https://hn.algolia.com/api/v1/search";
const hnItemBaseUrl = "https://hacker-news.firebaseio.com/v0/item";
const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const parsed = {
    json: false,
    story: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") {
      parsed.json = true;
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
  npm run launch:show-hn:monitor
  npm run launch:show-hn:monitor -- --story https://news.ycombinator.com/item?id=123
  npm run launch:show-hn:monitor -- --json

Checks Hacker News, GitHub repo metrics, and GitHub traffic for the Show HN launch.
If --story is omitted, the script searches for the configured audit URL.`);
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

  const story = await response.json();
  if (!story) {
    return null;
  }

  return story;
}

function readRepoMetrics() {
  return readGhJson(["repo", "view", repo, "--json", "stargazerCount,watchers,forkCount,url,description,homepageUrl"]);
}

function readTraffic() {
  return {
    views: tryReadGhJson(["api", `repos/${repo}/traffic/views`]),
    clones: tryReadGhJson(["api", `repos/${repo}/traffic/clones`]),
    referrers: tryReadGhJson(["api", `repos/${repo}/traffic/popular/referrers`]),
    paths: tryReadGhJson(["api", `repos/${repo}/traffic/popular/paths`]),
  };
}

function normalizeTraffic(traffic) {
  return {
    views: traffic.views.ok ? traffic.views.value : { error: traffic.views.error },
    clones: traffic.clones.ok ? traffic.clones.value : { error: traffic.clones.error },
    referrers: traffic.referrers.ok ? traffic.referrers.value : { error: traffic.referrers.error },
    paths: traffic.paths.ok ? traffic.paths.value : { error: traffic.paths.error },
  };
}

function storyUrl(story) {
  return story ? `https://news.ycombinator.com/item?id=${story.id}` : "";
}

function renderMarkdown(snapshot) {
  const story = snapshot.hackerNews.story;
  const repoMetrics = snapshot.github.repo;
  const traffic = snapshot.github.traffic;
  const lines = [
    "# Show HN Response Snapshot",
    "",
    `- Checked at: ${snapshot.checked_at_kst} KST`,
    `- Submission URL: ${auditUrl}`,
    "",
    "## Hacker News",
  ];

  if (story) {
    lines.push(
      `- Story: ${storyUrl(story)}`,
      `- Title: ${story.title || "(untitled)"}`,
      `- Score: ${story.score ?? 0}`,
      `- Comments: ${story.descendants ?? 0}`,
      `- HN URL target: ${story.url || "(none)"}`,
    );
  } else {
    lines.push("- Story: not found for the audit URL yet.");
  }

  lines.push(
    "",
    "## GitHub Repo",
    `- Repo: ${repoMetrics.url}`,
    `- Stars/watchers/forks: ${repoMetrics.stargazerCount}/${repoMetrics.watchers.totalCount}/${repoMetrics.forkCount}`,
    `- Homepage: ${repoMetrics.homepageUrl || "(none)"}`,
    "",
    "## GitHub Traffic",
    `- Views: ${trafficSummary(traffic.views)}`,
    `- Clones: ${trafficSummary(traffic.clones)}`,
    `- Referrers: ${topItems(traffic.referrers, "referrer")}`,
    `- Paths: ${topItems(traffic.paths, "path")}`,
    "",
    "## Guardrail",
    "- Do not cross-post during the first 24 hours.",
    "- Reply only to factual corrections, missing-extension suggestions, or direct questions.",
    "- If a correction request appears, fix and validate before any next public action.",
  );

  return lines.join("\n");
}

function trafficSummary(value) {
  if (value.error) {
    return `unavailable (${value.error})`;
  }

  const count = value.count ?? 0;
  const uniques = value.uniques ?? 0;
  return `${count} / ${uniques} uniques`;
}

function topItems(value, key) {
  if (value.error) {
    return `unavailable (${value.error})`;
  }

  if (!Array.isArray(value) || !value.length) {
    return "none";
  }

  return value
    .slice(0, 5)
    .map((item) => `${item[key]} (${item.count}/${item.uniques} uniques)`)
    .join(", ");
}

async function main() {
  const story = await findStory();
  const snapshot = {
    checked_at_kst: formatKst(new Date()),
    submission_url: auditUrl,
    hackerNews: {
      story,
      story_url: storyUrl(story),
    },
    github: {
      repo: readRepoMetrics(),
      traffic: normalizeTraffic(readTraffic()),
    },
  };

  if (args.json) {
    console.log(JSON.stringify(snapshot, null, 2));
    return;
  }

  console.log(renderMarkdown(snapshot));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
