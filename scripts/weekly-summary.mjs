import fs from "node:fs";

const entries = JSON.parse(fs.readFileSync("data/extensions.json", "utf8"));
const readme = fs.readFileSync("README.md", "utf8");

const statusCounts = countBy(entries, "status");
const categoryCounts = countBy(entries, "category");
const topPickInstalls = extractTopPickInstallCommands(readme);

console.log("# Weekly Atlas Summary");
console.log();
console.log(`Total extensions: ${entries.length}`);
console.log();
console.log("Status counts:");
for (const status of ["active", "watch", "stale"]) {
  console.log(`- ${status}: ${statusCounts.get(status) ?? 0}`);
}
console.log();
console.log("Category counts:");
for (const [category, count] of [...categoryCounts.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`- ${category}: ${count}`);
}
console.log();
console.log("Top Picks install commands:");
for (const command of topPickInstalls) {
  console.log(`- ${command}`);
}

function countBy(items, key) {
  const counts = new Map();
  for (const item of items) {
    counts.set(item[key], (counts.get(item[key]) ?? 0) + 1);
  }
  return counts;
}

function extractTopPickInstallCommands(markdown) {
  const section = markdown.match(/## Top Picks\n\n[\s\S]*?\n## Find by Use Case/);
  if (!section) {
    throw new Error("Could not find the Top Picks section in README.md.");
  }

  const commands = [];
  for (const line of section[0].split("\n")) {
    if (!line.startsWith("| `")) {
      continue;
    }

    const cells = line.split("|").map((cell) => cell.trim());
    const installCell = cells[2] ?? "";
    const match = installCell.match(/`(gh extension install [^`]+)`/);
    if (match) {
      commands.push(match[1]);
    }
  }

  if (commands.length === 0) {
    throw new Error("Could not find Top Picks install commands in README.md.");
  }

  return commands;
}
