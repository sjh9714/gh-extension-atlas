import { execFileSync } from "node:child_process";

const repo = "sjh9714/gh-extension-atlas";
const guardrailAt = new Date("2026-06-09T15:10:00Z");
const auditUrl = "https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1";
const submissionTitle = "Show HN: Audit your installed GitHub CLI extensions";
const hnSearchBaseUrl = "https://hn.algolia.com/api/v1/search";

const failures = [];
const warnings = [];

function runGh(args) {
  try {
    return execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch (error) {
    const detail = error.stderr?.toString().trim() || error.message;
    throw new Error(`gh ${args.join(" ")} failed: ${detail}`);
  }
}

function readGhJson(args) {
  return JSON.parse(runGh(args));
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function hnSubmitUrl() {
  const url = new URL("https://news.ycombinator.com/submitlink");
  url.searchParams.set("u", auditUrl);
  url.searchParams.set("t", submissionTitle);
  return url.toString();
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

async function checkAuditPage() {
  const response = await fetch(auditUrl);
  if (!response.ok) {
    fail(`Audit page returned HTTP ${response.status}.`);
    return;
  }

  const html = await response.text();
  for (const marker of ["Audit Your GitHub CLI Extensions", "Try sample audit", "Open demo audit", "Copy command", "Copy audit summary", "Next Actions", "GitHub repo"]) {
    if (!html.includes(marker)) {
      fail(`Audit page is missing marker: ${marker}`);
    }
  }
}

async function searchHn(query) {
  const url = new URL(hnSearchBaseUrl);
  url.searchParams.set("query", query);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "5");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HN search returned HTTP ${response.status}`);
  }

  return response.json();
}

async function checkHnDuplicate() {
  try {
    const [urlSearch, titleSearch] = await Promise.all([
      searchHn(auditUrl),
      searchHn("GitHub CLI Extension Atlas"),
    ]);

    const urlHits = urlSearch.hits.filter((hit) => hit.url === auditUrl);
    const titleHits = titleSearch.hits.filter((hit) => /github cli extension atlas/i.test(hit.title || ""));

    if (urlHits.length) {
      fail(`HN already has a story for the audit URL: https://news.ycombinator.com/item?id=${urlHits[0].objectID}`);
    }

    if (titleHits.length) {
      warn(`HN search found a similar title: https://news.ycombinator.com/item?id=${titleHits[0].objectID}`);
    }

    console.log(`HN duplicate check: ${urlHits.length} exact URL hit(s), ${titleHits.length} similar title hit(s)`);
  } catch (error) {
    warn(`HN duplicate check could not complete: ${error.message}`);
  }
}

function checkGuardrail(now) {
  if (now < guardrailAt) {
    fail(`Second-wave guardrail has not expired. Wait until 2026-06-10 00:10 KST. Current KST: ${formatKst(now)}.`);
  }
}

function checkValidateRun() {
  const runs = readGhJson([
    "run",
    "list",
    "--repo",
    repo,
    "--workflow",
    "Validate",
    "--branch",
    "main",
    "--limit",
    "1",
    "--json",
    "databaseId,headSha,status,conclusion,url",
  ]);

  const latest = runs[0];
  if (!latest) {
    fail("No Validate workflow run found.");
    return;
  }

  if (latest.status !== "completed" || latest.conclusion !== "success") {
    fail(`Latest Validate is not green: ${latest.status}/${latest.conclusion || "none"} (${latest.url}).`);
    return;
  }

  console.log(`Validate: success on ${latest.headSha.slice(0, 7)} (${latest.url})`);
}

function checkRepoMetrics() {
  const metrics = readGhJson(["repo", "view", repo, "--json", "stargazerCount,watchers,forkCount,url"]);
  console.log(`Repo: ${metrics.url}`);
  console.log(`Stars/watchers/forks: ${metrics.stargazerCount}/${metrics.watchers.totalCount}/${metrics.forkCount}`);
}

function checkTrackerIssues() {
  const issue7 = readGhJson(["issue", "view", "7", "--repo", repo, "--json", "state,url,body,comments"]);
  const issue8 = readGhJson(["issue", "view", "8", "--repo", repo, "--json", "state,url"]);

  if (issue7.state !== "OPEN") {
    warn(`Issue #7 is ${issue7.state}; confirm the 24h review is recorded: ${issue7.url}`);
  }

  if (issue8.state !== "OPEN") {
    fail(`Show HN tracker issue #8 is not open: ${issue8.url}`);
  }

  console.log(`Tracker #7: ${issue7.url}`);
  console.log(`Tracker #8: ${issue8.url}`);
  checkSecondWaveReview(issue7);
}

function checkSecondWaveReview(issue7) {
  const commentText = Array.isArray(issue7.comments)
    ? issue7.comments.map((comment) => comment.body || "").join("\n")
    : "";
  const reviewText = `${issue7.body || ""}\n${commentText}`.toLowerCase();
  const hasReviewHeading = reviewText.includes("24h review") || reviewText.includes("24-hour review");
  const mentionsGhNotify = reviewText.includes("gh-notify");
  const hasDecision = reviewText.includes("show hn") || reviewText.includes("no negative signal") || reviewText.includes("no pending correction");

  if (!hasReviewHeading || !mentionsGhNotify || !hasDecision) {
    fail("Issue #7 is missing a second-wave 24h review with gh-notify status and a clear Show HN/no-negative-signal decision.");
    return;
  }

  console.log("Second-wave review: recorded in issue #7");
}

function checkGhNotify() {
  const issue = readGhJson([
    "issue",
    "view",
    "105",
    "--repo",
    "meiji163/gh-notify",
    "--json",
    "state,comments,updatedAt,url",
  ]);

  const commentCount = Array.isArray(issue.comments) ? issue.comments.length : Number(issue.comments ?? 0);

  console.log(`gh-notify accuracy check: ${issue.url}`);
  console.log(`gh-notify state/comments: ${issue.state}/${commentCount}`);

  if (commentCount > 0) {
    fail("gh-notify has comments. Review manually for corrections or negative signal before Show HN.");
  }
}

async function main() {
  console.log("# Show HN Preflight");
  console.log(`Current KST: ${formatKst(new Date())}`);
  console.log("");

  checkGuardrail(new Date());
  checkValidateRun();
  checkRepoMetrics();
  checkTrackerIssues();
  checkGhNotify();
  await checkAuditPage();
  await checkHnDuplicate();

  console.log("");
  console.log("Submission title:");
  console.log(submissionTitle);
  console.log("");
  console.log("Submission URL:");
  console.log(auditUrl);
  console.log("");
  console.log("HN submitlink:");
  console.log(hnSubmitUrl());

  if (warnings.length) {
    console.log("");
    console.log("Warnings:");
    for (const message of warnings) {
      console.log(`- ${message}`);
    }
  }

  if (failures.length) {
    console.log("");
    console.log("Preflight failed:");
    for (const message of failures) {
      console.log(`- ${message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("");
  console.log("Preflight passed. Submit once to Show HN, then update issue #8.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
