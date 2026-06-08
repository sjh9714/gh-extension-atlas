import { spawnSync } from "node:child_process";

function run(label, args) {
  console.log("");
  console.log(`## ${label}`);
  const result = spawnSync("npm", args, { stdio: "inherit" });

  if (result.error) {
    console.error(`Failed to run npm ${args.join(" ")}: ${result.error.message}`);
    process.exit(result.status || 1);
  }

  if (result.status !== 0) {
    console.error("");
    console.error(`Stopped: npm ${args.join(" ")} exited with status ${result.status}.`);
    process.exit(result.status || 1);
  }
}

function main() {
  console.log("# Show HN Ready Check");
  console.log("This command records the guarded issue #7 review, then runs preflight.");
  console.log("It does not submit to Hacker News.");

  run("Record second-wave review", ["run", "launch:show-hn:record-review"]);
  run("Run final preflight", ["run", "launch:show-hn:preflight"]);

  console.log("");
  console.log("Ready: open the HN submitlink printed by preflight and submit manually.");
}

main();
