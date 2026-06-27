#!/usr/bin/env node

import { createReport, fail, nextAction, pass, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runStep } from "./automation-runner.mjs";

const report = createReport("npm run release");

try {
  await checkRequiredTools(report, ["node", "npm"]);
  await runStep(report, "Smart QA", "npm", ["run", "smart-qa"]);
  await runStep(report, "Regression", "npm", ["run", "regression"]);
  await runStep(report, "Release check", "npm", ["run", "release-check"]);
  pass(report, "READY");
  nextAction(report, "READY: request explicit Project Owner approval before deploy.");
  console.log("\nREADY");
} catch (error) {
  fail(report, error.message);
  nextAction(report, "NOT READY: fix the failed release step and rerun npm run release.");
  console.log("\nNOT READY");
  console.log(error.message);
} finally {
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
