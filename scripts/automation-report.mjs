#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function listItems(items) {
  if (!items.length) return "<li>None</li>";
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

export function createReport(command) {
  return {
    command,
    startedAt: new Date(),
    status: "running",
    checks: [],
    passed: [],
    failed: [],
    warnings: [],
    skipped: [],
    nextActions: [],
  };
}

export function pass(report, message) {
  report.checks.push({ status: "passed", message });
  report.passed.push(message);
}

export function fail(report, message) {
  report.checks.push({ status: "failed", message });
  report.failed.push(message);
}

export function warn(report, message) {
  report.checks.push({ status: "warning", message });
  report.warnings.push(message);
}

export function skip(report, message) {
  report.checks.push({ status: "skipped", message });
  report.skipped.push(message);
}

export function nextAction(report, message) {
  report.nextActions.push(message);
}

export function completeReport(report) {
  report.finishedAt = new Date();
  report.durationMs = report.finishedAt.getTime() - report.startedAt.getTime();
  report.status = report.failed.length ? "failed" : "passed";
}

function buildJsonReport(report) {
  return {
    timestamp: report.finishedAt.toISOString(),
    executedCommand: report.command,
    overallStatus: report.status,
    passed: report.passed,
    failed: report.failed,
    warnings: report.warnings,
    skipped: report.skipped,
    executedChecks: report.checks,
    duration: {
      ms: report.durationMs,
      seconds: Number((report.durationMs / 1000).toFixed(3)),
    },
    recommendedNextAction: report.nextActions,
  };
}

export function writeReports(report) {
  completeReport(report);

  const reportsDir = path.resolve("reports");
  fs.mkdirSync(reportsDir, { recursive: true });

  const timestamp = report.startedAt.toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const safeCommand = report.command.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  const filePath = path.join(reportsDir, `${timestamp}-${safeCommand}.html`);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(report.command)} report</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 980px; margin: 40px auto; padding: 0 20px; line-height: 1.5; color: #111; }
    h1, h2 { line-height: 1.2; }
    code { background: #f3f3f3; padding: 2px 5px; border-radius: 4px; }
    .status { display: inline-block; padding: 4px 8px; border-radius: 4px; font-weight: 700; }
    .passed { background: #d8f5df; color: #145523; }
    .failed { background: #ffe0df; color: #7a1410; }
    .warning { background: #fff1c2; color: #694700; }
    li { margin: 4px 0; }
  </style>
</head>
<body>
  <h1>${escapeHtml(report.command)} report</h1>
  <p><strong>Status:</strong> <span class="status ${escapeHtml(report.status)}">${escapeHtml(report.status)}</span></p>
  <p><strong>Started:</strong> ${escapeHtml(report.startedAt.toISOString())}</p>
  <p><strong>Finished:</strong> ${escapeHtml(report.finishedAt.toISOString())}</p>
  <p><strong>Command:</strong> <code>${escapeHtml(report.command)}</code></p>

  <h2>Executed Checks</h2>
  <ul>${listItems(report.checks.map((check) => `${check.status}: ${check.message}`))}</ul>

  <h2>Passed</h2>
  <ul>${listItems(report.passed)}</ul>

  <h2>Failed</h2>
  <ul>${listItems(report.failed)}</ul>

  <h2>Warnings</h2>
  <ul>${listItems(report.warnings)}</ul>

  <h2>Recommended Next Actions</h2>
  <ul>${listItems(report.nextActions)}</ul>
</body>
</html>
`;

  fs.writeFileSync(filePath, html, "utf8");
  fs.writeFileSync(path.join(reportsDir, "report.json"), `${JSON.stringify(buildJsonReport(report), null, 2)}\n`, "utf8");
  console.log(`[Report] ${filePath}`);
  console.log(`[Report] ${path.join(reportsDir, "report.json")}`);
  return filePath;
}

export const writeHtmlReport = writeReports;
