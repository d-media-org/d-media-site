#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createReport, fail, nextAction, pass, skip, warn, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runStep } from "./automation-runner.mjs";

const report = createReport("npm run regression");
const baselinePath = path.resolve("reports/baseline/regression-baseline.json");
const distPath = path.resolve("astro/dist");

function walk(directory, predicate) {
  let count = 0;
  if (!fs.existsSync(directory)) return count;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) count += walk(fullPath, predicate);
    else if (predicate(fullPath)) count += 1;
  }
  return count;
}

function directorySize(directory, predicate = () => true) {
  let size = 0;
  if (!fs.existsSync(directory)) return size;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) size += directorySize(fullPath, predicate);
    else if (predicate(fullPath)) size += fs.statSync(fullPath).size;
  }
  return size;
}

function collectMetrics() {
  return {
    buildStatus: "passed",
    htmlPages: walk(distPath, (file) => file.endsWith(".html")),
    markdownPages: walk(path.join(distPath, "markdown-pages"), (file) => file.endsWith(".md")),
    cloudflareValidation: "passed",
    lighthouse: null,
    bundleBytes: directorySize(path.join(distPath, "_astro"), (file) => /\.(js|css)$/i.test(file)),
  };
}

function compareMetrics(current, baseline) {
  const failures = [];
  const warnings = [];

  if (current.buildStatus !== baseline.buildStatus) failures.push(`build status changed: ${baseline.buildStatus} -> ${current.buildStatus}`);
  if (current.cloudflareValidation !== baseline.cloudflareValidation) {
    failures.push(`Cloudflare validation changed: ${baseline.cloudflareValidation} -> ${current.cloudflareValidation}`);
  }
  if (current.htmlPages < baseline.htmlPages) warnings.push(`HTML page count decreased: ${baseline.htmlPages} -> ${current.htmlPages}`);
  if (current.markdownPages < baseline.markdownPages) warnings.push(`Markdown page count decreased: ${baseline.markdownPages} -> ${current.markdownPages}`);
  if (baseline.bundleBytes && current.bundleBytes > baseline.bundleBytes * 1.15) {
    warnings.push(`Bundle bytes increased by more than 15%: ${baseline.bundleBytes} -> ${current.bundleBytes}`);
  }
  if (!baseline.lighthouse || !current.lighthouse) warnings.push("Lighthouse/PageSpeed baseline unavailable locally.");

  return { failures, warnings };
}

try {
  await checkRequiredTools(report, ["node", "npm"]);
  await runStep(report, "Astro build", "npm", ["run", "astro:build"]);
  await runStep(report, "Cloudflare dist validation", "node", ["scripts/validate-cloudflare-dist.mjs"]);

  const current = collectMetrics();
  pass(report, `Regression metrics: ${JSON.stringify(current)}`);

  if (!fs.existsSync(baselinePath)) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.writeFileSync(
      baselinePath,
      `${JSON.stringify({ createdAt: new Date().toISOString(), metrics: current }, null, 2)}\n`,
      "utf8",
    );
    skip(report, `No baseline existed; created local baseline at ${baselinePath}.`);
    nextAction(report, "Review the generated local baseline before using regression as a release gate.");
  } else {
    const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8")).metrics;
    const comparison = compareMetrics(current, baseline);
    for (const item of comparison.failures) fail(report, item);
    for (const item of comparison.warnings) warn(report, item);
    if (!comparison.failures.length) pass(report, "Regression comparison completed without blocking failures.");
    nextAction(report, "Update baseline only after intentional production-relevant changes are accepted.");
  }
} catch (error) {
  fail(report, error.message);
  nextAction(report, "Fix regression failure and rerun npm run regression.");
} finally {
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
