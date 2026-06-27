#!/usr/bin/env node

import path from "node:path";
import { createReport, fail, nextAction, pass, skip, warn, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runCommand, runStep } from "./automation-runner.mjs";

const report = createReport("npm run smart-qa");

function normalizeStatusLine(line) {
  return line.replace(/^\s*(?:[ MADRCU?!]{1,2})\s+/, "").trim();
}

function getArea(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".md") return "docs";
  if (file.startsWith("astro/src/components/") || file.endsWith(".astro")) return "astro";
  if (file.includes("seo") || file.includes("robots") || file.includes("sitemap") || file.includes("llms") || file.includes("schema")) return "seo";
  if (file.startsWith("public/") || file.includes("assets/") || /\.(png|jpe?g|webp|svg|ico|mp4|webm|pdf|woff2?)$/i.test(file)) return "assets";
  if (file.toLowerCase().includes("video") || file.toLowerCase().includes("motion") || file.toLowerCase().includes("poster")) return "video";
  if (file === "package.json" || file.startsWith("scripts/") || file.startsWith("astro/")) return "code";
  return "other";
}

function unique(values) {
  return [...new Set(values)];
}

async function getChangedFiles() {
  const { stdout } = await runCommand("git", ["status", "--short"], { stdio: "pipe" });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(normalizeStatusLine)
    .filter((file) => !file.startsWith("reports/") && file !== "reports")
    .map((file) => file.split(" -> ").at(-1));
}

function selectChecks(files) {
  const areas = new Set(files.map(getArea));
  const checks = [];

  if (!files.length) return { areas, checks };

  if (areas.size === 1 && areas.has("docs")) {
    checks.push({ label: "Lint", command: "npm", args: ["run", "lint"], reason: "documentation-only change" });
    checks.push({ label: "Documentation check", command: "node", args: ["scripts/validate-docs.mjs"], reason: "documentation-only change" });
    return { areas, checks };
  }

  if (areas.has("seo")) {
    checks.push({ label: "QA", command: "npm", args: ["run", "qa"], reason: "SEO-related files changed" });
    checks.push({ label: "SEO check", command: "npm", args: ["run", "seo-check"], reason: "SEO-related files changed" });
  }

  if (areas.has("astro") || areas.has("assets") || areas.has("video")) {
    checks.push({ label: "QA", command: "npm", args: ["run", "qa"], reason: `${[...areas].join(", ")} change` });
    checks.push({ label: "Browser QA", command: "npm", args: ["run", "browser-qa"], reason: `${[...areas].join(", ")} change` });
  }

  if (areas.has("code") || areas.has("other")) {
    checks.push({ label: "QA", command: "npm", args: ["run", "qa"], reason: "code or automation change" });
  }

  return {
    areas,
    checks: unique(checks.map((check) => JSON.stringify(check))).map((value) => JSON.parse(value)),
  };
}

try {
  await checkRequiredTools(report, ["git", "node", "npm"]);

  const changedFiles = await getChangedFiles();
  if (!changedFiles.length) {
    skip(report, "No repository changes detected; no QA checks were required.");
    nextAction(report, "No action required.");
    console.log("[Smart QA] Няма промени. Не са стартирани проверки.");
    writeHtmlReport(report);
    process.exit(0);
  }

  pass(report, `Detected changed files: ${changedFiles.join(", ")}`);
  const { areas, checks } = selectChecks(changedFiles);
  pass(report, `Detected change areas: ${[...areas].join(", ")}`);

  if (!checks.length) {
    warn(report, "No matching check set found; defaulting to npm run qa.");
    checks.push({ label: "QA", command: "npm", args: ["run", "qa"], reason: "fallback" });
  }

  for (const check of checks) {
    pass(report, `Selected ${check.label}: ${check.reason}`);
    await runStep(report, check.label, check.command, check.args);
  }

  nextAction(report, "Use npm run release before deploy approval.");
} catch (error) {
  fail(report, error.message);
  nextAction(report, "Fix smart-qa failure and rerun npm run smart-qa.");
} finally {
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
