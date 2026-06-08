import fs from "node:fs";

const file = "data/extensions.json";
const allowedCategories = new Set([
  "Dashboard/TUI",
  "PR & Issues",
  "Actions/CI",
  "Repo & Branch",
  "Search",
  "Notifications",
  "Security/Admin",
  "AI/Agents",
]);
const allowedStatuses = new Set(["active", "watch", "stale"]);
const required = [
  "repo",
  "name",
  "category",
  "summary",
  "install",
  "best_for",
  "avoid_if",
  "stars",
  "license",
  "last_pushed_at",
  "archived",
  "official",
  "verified_at",
  "status",
];

const raw = fs.readFileSync(file, "utf8");
const entries = JSON.parse(raw);
const errors = [];

function readText(path) {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (error) {
    errors.push(`${path}: unable to read for count validation (${error.message}).`);
    return "";
  }
}

function validateReferencedCounts(expectedCount) {
  const readme = readText("README.md");
  const badgeMatches = [
    ...readme.matchAll(/!\[Extensions:\s*(\d+)\]\(https:\/\/img\.shields\.io\/badge\/extensions-(\d+)-blue\.svg\)/g),
  ];

  if (badgeMatches.length === 0) {
    errors.push("README.md: missing extensions badge count.");
  }

  for (const match of badgeMatches) {
    const altCount = Number.parseInt(match[1], 10);
    const badgeUrlCount = Number.parseInt(match[2], 10);

    if (altCount !== expectedCount) {
      errors.push(`README.md: extensions badge alt text says ${altCount}, expected ${expectedCount}.`);
    }

    if (badgeUrlCount !== expectedCount) {
      errors.push(`README.md: extensions badge URL says ${badgeUrlCount}, expected ${expectedCount}.`);
    }
  }

  const launchKit = readText("docs/launch-kit.md");
  const launchKitMatches = [...launchKit.matchAll(/\b(\d+)\s+curated extensions\b/g)];

  if (launchKitMatches.length === 0) {
    errors.push("docs/launch-kit.md: missing curated extensions count.");
  }

  for (const match of launchKitMatches) {
    const launchKitCount = Number.parseInt(match[1], 10);

    if (launchKitCount !== expectedCount) {
      errors.push(`docs/launch-kit.md: curated extensions copy says ${launchKitCount}, expected ${expectedCount}.`);
    }
  }
}

if (!Array.isArray(entries)) {
  errors.push(`${file} must contain a JSON array.`);
} else if (entries.length < 50) {
  errors.push(`${file} must contain at least 50 verified extensions.`);
} else {
  validateReferencedCounts(entries.length);
}

const seenRepos = new Set();

for (const [index, entry] of entries.entries()) {
  const label = entry && entry.repo ? entry.repo : `entry ${index + 1}`;

  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push(`${label}: must be an object.`);
    continue;
  }

  for (const key of required) {
    if (!(key in entry)) {
      errors.push(`${label}: missing required field "${key}".`);
    }
  }

  for (const key of Object.keys(entry)) {
    if (!required.includes(key)) {
      errors.push(`${label}: unknown field "${key}".`);
    }
  }

  if (typeof entry.repo !== "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(entry.repo)) {
    errors.push(`${label}: repo must be in OWNER/REPO form.`);
  } else if (seenRepos.has(entry.repo.toLowerCase())) {
    errors.push(`${label}: duplicate repo.`);
  } else {
    const repoName = entry.repo.split("/")[1];
    if (!repoName.toLowerCase().startsWith("gh-")) {
      errors.push(`${label}: GitHub CLI extension repository names must start with "gh-".`);
    }
    seenRepos.add(entry.repo.toLowerCase());
  }

  for (const key of ["name", "summary", "best_for", "avoid_if", "license"]) {
    if (typeof entry[key] !== "string" || entry[key].trim().length === 0) {
      errors.push(`${label}: ${key} must be a non-empty string.`);
    }
  }

  if (!allowedCategories.has(entry.category)) {
    errors.push(`${label}: category must be one of ${Array.from(allowedCategories).join(", ")}.`);
  }

  if (entry.install !== `gh extension install ${entry.repo}`) {
    errors.push(`${label}: install must equal "gh extension install ${entry.repo}".`);
  }

  if (!Number.isInteger(entry.stars) || entry.stars < 0) {
    errors.push(`${label}: stars must be a non-negative integer.`);
  }

  if (typeof entry.last_pushed_at !== "string" || Number.isNaN(Date.parse(entry.last_pushed_at))) {
    errors.push(`${label}: last_pushed_at must be an ISO timestamp.`);
  }

  if (entry.archived !== false) {
    errors.push(`${label}: archived repositories are excluded from the atlas.`);
  }

  if (typeof entry.official !== "boolean") {
    errors.push(`${label}: official must be a boolean.`);
  }

  if (typeof entry.verified_at !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(entry.verified_at)) {
    errors.push(`${label}: verified_at must use YYYY-MM-DD.`);
  }

  if (!allowedStatuses.has(entry.status)) {
    errors.push(`${label}: status must be active, watch, or stale.`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${entries.length} GitHub CLI extensions.`);
