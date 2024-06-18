#!/usr/bin/env node

const branchPattern =
  /^(feat|fix|refactor|hotfix|reformat|optimise|enhance|ci|docs)\/[A-Z]{2,4}\/[a-z0-9-]+$/;
const mainBranch = "main";
const developBranch = "develop";

const branchName = process.argv[2];

if (!branchName) {
  console.log("branch name is required");

  process.exit(1);
}

if (branchName === mainBranch || branchName === developBranch) {
  console.log("You cannot push to main or develop branch directly!");
  process.exit(1);
}

if (branchPattern.test(branchName)) {
  process.exit(0);
}

console.log("Wrong branch name!");
console.log("The branch name must have this format:");
console.log("<verb>/<developer-initials>/<what-was-done>");
console.log(
  "Allowed verbs: feat | fix | refactor | hotfix | reformat | optimise | enhance | merge | ci | docs"
);
console.log("Example:");
console.log("feat/JMB/add-new-feature");
console.log("-");
console.log("Your branch name was:");
console.log(branchName);
console.log("-");
console.log("For more information, check script in ./branchlint");
console.log("-");

process.exit(1);
