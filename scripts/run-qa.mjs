#!/usr/bin/env node

import { createReport, fail, nextAction, pass, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runStep } from "./automation-runner.mjs";

const checks = [
  { label: "Lint", command: "npm", args: ["run", "lint"] },
  { label: "Astro build", command: "npm", args: ["run", "astro:build"] },
  {
    label: "Cloudflare dist validation",
    command: "node",
    args: ["scripts/validate-cloudflare-dist.mjs"],
  },
];

const report = createReport("npm run qa");

try {
  await checkRequiredTools(report, ["node", "npm"]);

  for (const check of checks) {
    await runStep(report, check.label, check.command, check.args);
  }

  pass(report, "All QA checks passed");
  console.log("\n[QA] Всички проверки минаха успешно.");
} catch (error) {
  fail(report, error.message);
  nextAction(report, "Fix the failing QA step and rerun npm run qa.");
  console.error(`\n[QA] ${error.message}`);
} finally {
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
