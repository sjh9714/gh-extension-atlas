import { execFileSync } from "node:child_process";

const repo = "sjh9714/gh-extension-atlas";
const guardrailAt = new Date("2026-06-09T15:10:00Z");
const showHnUrl = "https://sjh9714.github.io/gh-extension-atlas/audit.html?demo=1";
const showHnTitle = "Show HN: Audit your installed GitHub CLI extensions";
const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const parsed = {
    post: false,
  };

  for (const arg of argv) {
    if (arg === "--post") {
      parsed.post = true;
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
  npm run launch:show-hn:review
  npm run launch:show-hn:record-review

Generates the second-wave 24h review required by Show HN preflight.
By default it only prints Markdown. Use --post, or the record-review npm script,
to comment on sjh9714/gh-extension-atlas#7 after the guardrail expires.`);
}

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

function issue7HasCompletedReview() {
  const issue = readGhJson(["issue", "view", "7", "--repo", repo, "--json", "body,comments"]);
  const commentText = Array.isArray(issue.comments)
    ? issue.comments.map((comment) => comment.body || "").join("\n")
    : "";
  const reviewText = `${issue.body || ""}\n${commentText}`.toLowerCase();

  return reviewText.includes("## second-wave 24h review")
    && reviewText.includes("gh-notify")
    && reviewText.includes("ok to run `npm run launch:show-hn:preflight`");
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

function latestValidateRun() {
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

  return runs[0] || null;
}

function commentCount(issue) {
  return Array.isArray(issue.comments) ? issue.comments.length : Number(issue.comments || 0);
}

function hasMaintainerCorrection(issue) {
  const text = Array.isArray(issue.comments)
    ? issue.comments
      .filter((comment) => comment.author?.login !== "sjh9714")
      .map((comment) => `${comment.author?.login || ""}: ${comment.body || ""}`)
      .join("\n")
    : "";
  return /\b(wrong|incorrect|change|correction|not accurate|inaccurate|fix)\b/i.test(text);
}

function responseSummary({ label, issue, expectedNoResponse = false }) {
  const count = commentCount(issue);
  const correction = hasMaintainerCorrection(issue);

  if (correction) {
    return `${label}: comments present; manual review required before Show HN.`;
  }

  if (expectedNoResponse && count === 0) {
    return `${label}: no response after ~24h; no negative signal; no correction requested.`;
  }

  if (count === 0) {
    return `${label}: no response; no negative signal.`;
  }

  return `${label}: maintainer response recorded; no correction needed.`;
}

function renderReview(snapshot) {
  const validate = snapshot.validate;
  const lines = [
    "## Second-wave 24h review",
    "",
    `- Checked at: ${snapshot.checkedAtKst} KST`,
    `- Guardrail: ${snapshot.guardrailExpired ? "complete" : `waiting until 2026-06-10 00:10 KST`}`,
    `- Latest Validate: ${validate ? `${validate.conclusion || "none"} on ${validate.headSha.slice(0, 7)} (${validate.url})` : "missing"}`,
    `- Stars/watchers/forks: ${snapshot.metrics.stargazerCount}/${snapshot.metrics.watchers.totalCount}/${snapshot.metrics.forkCount}`,
    "",
    "### Second-wave maintainer status",
    "",
    `- ${responseSummary({ label: "gh-s", issue: snapshot.ghS })}`,
    `- ${responseSummary({ label: "gh-notify", issue: snapshot.ghNotify, expectedNoResponse: snapshot.guardrailExpired })}`,
    "",
    "### Decision",
    "",
  ];

  if (!snapshot.guardrailExpired) {
    lines.push("Not ready yet. Do not submit to Show HN until the second-wave guardrail expires.");
  } else if (snapshot.requiresManualReview) {
    lines.push("Hold Show HN. A maintainer response or possible correction needs manual review before public sharing.");
  } else if (!validate || validate.status !== "completed" || validate.conclusion !== "success") {
    lines.push("Hold Show HN. Latest Validate is not green.");
  } else {
    lines.push(`No pending correction and no negative signal. OK to run \`npm run launch:show-hn:preflight\` and proceed with the Show HN submission if it passes.`);
    lines.push("");
    lines.push(`- Title: \`${showHnTitle}\``);
    lines.push(`- URL: ${showHnUrl}`);
  }

  return lines.join("\n");
}

function canPostReview(snapshot) {
  const validate = snapshot.validate;

  if (!snapshot.guardrailExpired) {
    return "Second-wave guardrail has not expired.";
  }

  if (snapshot.requiresManualReview) {
    return "Maintainer response or possible correction requires manual review.";
  }

  if (!validate || validate.status !== "completed" || validate.conclusion !== "success") {
    return "Latest Validate is not green.";
  }

  return "";
}

function postReview(review, snapshot) {
  const blocker = canPostReview(snapshot);
  if (blocker) {
    console.error(`Not posting issue #7 review: ${blocker}`);
    process.exitCode = 1;
    return;
  }

  if (issue7HasCompletedReview()) {
    console.log("Issue #7 already contains a completed second-wave 24h review.");
    return;
  }

  const url = runGh(["issue", "comment", "7", "--repo", repo, "--body", review]);
  console.log(`Posted issue #7 review: ${url}`);
}

function main() {
  const now = new Date();
  const ghS = readGhJson(["issue", "view", "33", "--repo", "gennaro-tedesco/gh-s", "--json", "state,url,title,comments,updatedAt"]);
  const ghNotify = readGhJson(["issue", "view", "105", "--repo", "meiji163/gh-notify", "--json", "state,url,title,comments,updatedAt"]);
  const metrics = readGhJson(["repo", "view", repo, "--json", "stargazerCount,watchers,forkCount,url"]);
  const validate = latestValidateRun();
  const requiresManualReview = hasMaintainerCorrection(ghS) || hasMaintainerCorrection(ghNotify) || commentCount(ghNotify) > 0;

  const snapshot = {
    checkedAtKst: formatKst(now),
    guardrailExpired: now >= guardrailAt,
    ghS,
    ghNotify,
    metrics,
    validate,
    requiresManualReview,
  };

  const review = renderReview(snapshot);
  console.log(review);

  if (args.post) {
    console.log("");
    postReview(review, snapshot);
  }
}

main();
