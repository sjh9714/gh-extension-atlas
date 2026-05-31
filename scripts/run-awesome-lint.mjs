import {spawnSync} from "node:child_process";

const result = spawnSync("npx", ["--yes", "awesome-lint", "README.md"], {
  encoding: "utf8",
});

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
const allowedLocalOnlyRules = new Set([
  "remark-lint:awesome-github",
  "remark-lint:awesome-git-repo-age",
]);

if (result.status === 0) {
  process.stdout.write(output);
  process.exit(0);
}

const lintFailures = output
  .split("\n")
  .filter((line) => line.includes("✖") && line.includes("remark-lint:"));

const blockingFailures = lintFailures.filter(
  (line) => !Array.from(allowedLocalOnlyRules).some((rule) => line.includes(rule)),
);

if (blockingFailures.length > 0 || lintFailures.length === 0) {
  process.stdout.write(output);
  process.exit(result.status ?? 1);
}

console.log(
  "awesome-lint structural checks passed; suppressed local publish-readiness checks:",
);
for (const line of lintFailures) {
  console.log(line.trim());
}
console.log("Run `npm run lint:awesome:strict` after publishing the GitHub repo.");
