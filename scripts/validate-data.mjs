import fs from "node:fs";

const file = "data/extensions.json";
const schemaFile = "data/extensions.schema.json";
const recommendationsFile = "data/recommendations.json";
const recommendationsSchemaFile = "data/recommendations.schema.json";
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
const schema = JSON.parse(fs.readFileSync(schemaFile, "utf8"));
const recommendations = JSON.parse(fs.readFileSync(recommendationsFile, "utf8"));
const recommendationsSchema = JSON.parse(fs.readFileSync(recommendationsSchemaFile, "utf8"));
const errors = [];

validateSchemaContract();
validateRecommendationsSchemaContract();

function readText(path) {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (error) {
    errors.push(`${path}: unable to read for count validation (${error.message}).`);
    return "";
  }
}

function validateSchemaContract() {
  const itemSchema = schema.items;
  const schemaRequired = itemSchema?.required ?? [];
  const schemaProperties = itemSchema?.properties ?? {};
  const schemaCategories = schemaProperties.category?.enum ?? [];
  const schemaStatuses = schemaProperties.status?.enum ?? [];

  if (schema.type !== "array") {
    errors.push(`${schemaFile}: root schema type must be array.`);
  }

  if (schema.minItems !== 50) {
    errors.push(`${schemaFile}: minItems must be 50.`);
  }

  if (itemSchema?.additionalProperties !== false) {
    errors.push(`${schemaFile}: item schema must set additionalProperties to false.`);
  }

  if (!sameSet(schemaRequired, required)) {
    errors.push(`${schemaFile}: required fields must match validator required fields.`);
  }

  if (!sameSet(Object.keys(schemaProperties), required)) {
    errors.push(`${schemaFile}: properties must match validator required fields.`);
  }

  if (!sameSet(schemaCategories, Array.from(allowedCategories))) {
    errors.push(`${schemaFile}: category enum must match validator categories.`);
  }

  if (!sameSet(schemaStatuses, Array.from(allowedStatuses))) {
    errors.push(`${schemaFile}: status enum must match validator statuses.`);
  }
}

function validateRecommendationsSchemaContract() {
  const itemSchema = recommendationsSchema.items;
  const schemaRequired = itemSchema?.required ?? [];
  const schemaProperties = itemSchema?.properties ?? {};
  const recommendationRequired = ["id", "label", "aliases", "repos"];

  if (recommendationsSchema.type !== "array") {
    errors.push(`${recommendationsSchemaFile}: root schema type must be array.`);
  }

  if (recommendationsSchema.minItems !== 1) {
    errors.push(`${recommendationsSchemaFile}: minItems must be 1.`);
  }

  if (itemSchema?.additionalProperties !== false) {
    errors.push(`${recommendationsSchemaFile}: item schema must set additionalProperties to false.`);
  }

  if (!sameSet(schemaRequired, recommendationRequired)) {
    errors.push(`${recommendationsSchemaFile}: required fields must match validator recommendation fields.`);
  }

  if (!sameSet(Object.keys(schemaProperties), recommendationRequired)) {
    errors.push(`${recommendationsSchemaFile}: properties must match validator recommendation fields.`);
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
const validRepos = new Set();

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
    validRepos.add(entry.repo);
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

validateRecommendations();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${entries.length} GitHub CLI extensions and ${recommendations.length} recommendation workflows.`);

function validateRecommendations() {
  if (!Array.isArray(recommendations)) {
    errors.push(`${recommendationsFile} must contain a JSON array.`);
    return;
  }

  const seenIds = new Set();
  const seenAliases = new Set();

  for (const [index, recommendation] of recommendations.entries()) {
    const label = recommendation?.id || `recommendation ${index + 1}`;

    if (!recommendation || typeof recommendation !== "object" || Array.isArray(recommendation)) {
      errors.push(`${label}: recommendation must be an object.`);
      continue;
    }

    for (const key of ["id", "label", "aliases", "repos"]) {
      if (!(key in recommendation)) {
        errors.push(`${label}: missing required field "${key}".`);
      }
    }

    for (const key of Object.keys(recommendation)) {
      if (!["id", "label", "aliases", "repos"].includes(key)) {
        errors.push(`${label}: unknown field "${key}".`);
      }
    }

    if (typeof recommendation.id !== "string" || !/^[a-z][a-z0-9-]*$/.test(recommendation.id)) {
      errors.push(`${label}: id must be a lowercase slug.`);
    } else if (seenIds.has(recommendation.id) || seenAliases.has(recommendation.id)) {
      errors.push(`${label}: duplicate recommendation id or alias collision.`);
    } else {
      seenIds.add(recommendation.id);
    }

    if (typeof recommendation.label !== "string" || recommendation.label.trim().length === 0) {
      errors.push(`${label}: label must be a non-empty string.`);
    }

    if (!Array.isArray(recommendation.aliases) || recommendation.aliases.length === 0) {
      errors.push(`${label}: aliases must be a non-empty array.`);
    } else {
      for (const alias of recommendation.aliases) {
        if (typeof alias !== "string" || !/^[a-z][a-z0-9-]*$/.test(alias)) {
          errors.push(`${label}: alias "${alias}" must be a lowercase slug.`);
          continue;
        }

        if (seenIds.has(alias) || seenAliases.has(alias)) {
          errors.push(`${label}: alias "${alias}" collides with another id or alias.`);
        }

        seenAliases.add(alias);
      }
    }

    if (!Array.isArray(recommendation.repos) || recommendation.repos.length === 0) {
      errors.push(`${label}: repos must be a non-empty array.`);
    } else {
      const seenRecommendationRepos = new Set();
      for (const repo of recommendation.repos) {
        if (typeof repo !== "string" || !validRepos.has(repo)) {
          errors.push(`${label}: repo "${repo}" must exist in ${file}.`);
          continue;
        }

        if (seenRecommendationRepos.has(repo)) {
          errors.push(`${label}: duplicate repo "${repo}".`);
        }

        seenRecommendationRepos.add(repo);
      }
    }
  }
}

function sameSet(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}
