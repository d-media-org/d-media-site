#!/usr/bin/env node

import { createReport, fail, nextAction, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runStep } from "./automation-runner.mjs";

const report = createReport("npm run release-check");

try {
  await checkRequiredTools(report, ["node", "npm", "npx"]);

  await runStep(report, "QA", "npm", ["run", "qa"]);

  await runStep(report, "Browser QA", "npm", ["run", "browser-qa"]);

  await runStep(report, "SEO check", "npm", ["run", "seo-check"]);

  nextAction(report, "Request explicit Project Owner approval before deploy.");
} catch (error) {
  fail(report, error.message);
  nextAction(report, "Fix the failing release-check step and rerun npm run release-check.");
} finally {
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
