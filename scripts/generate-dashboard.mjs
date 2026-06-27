#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const reportsDir = path.resolve("reports");
const dashboardPath = path.join(reportsDir, "dashboard.html");
const commandSlugs = {
  qa: "npm-run-qa",
  browserQa: "npm-run-browser-qa",
  seoCheck: "npm-run-seo-check",
  regression: "npm-run-regression",
  release: "npm-run-release",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function runGit(args, fallback = "Unknown") {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim() || fallback;
  } catch {
    return fallback;
  }
}

function readFileIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function listReportFiles() {
  if (!fs.existsSync(reportsDir)) return [];
  return fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith(".html") && file !== "dashboard.html")
    .sort();
}

function latestReport(slug) {
  const file = listReportFiles()
    .filter((name) => name.includes(slug))
    .at(-1);

  if (!file) {
    return { status: "unknown", file: null, html: "", warnings: [], failures: [] };
  }

  const html = readFileIfExists(path.join(reportsDir, file));
  const status = html.match(/<span class="status ([^"]+)">([^<]+)<\/span>/)?.[2] ?? "unknown";
  return {
    status,
    file,
    html,
    warnings: extractListSection(html, "Warnings"),
    failures: extractListSection(html, "Failed"),
  };
}

function extractListSection(html, heading) {
  const pattern = new RegExp(`<h2>${heading}</h2>\\s*<ul>([\\s\\S]*?)<\\/ul>`, "i");
  const body = html.match(pattern)?.[1] ?? "";
  return [...body.matchAll(/<li>([\s\S]*?)<\/li>/g)]
    .map((match) => stripTags(match[1]).trim())
    .filter((item) => item && item !== "None");
}

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, "");
}

function labelStatus(status) {
  if (status === "passed") return "PASS";
  if (status === "failed") return "FAIL";
  return "UNKNOWN";
}

function statusClass(status) {
  if (status === "passed" || status === "PASS" || status === "READY" || status === "clean") return "ok";
  if (status === "failed" || status === "FAIL" || status === "NOT READY" || status === "dirty") return "bad";
  return "warn";
}

function checkText(html, patterns) {
  return patterns.some((pattern) => html.toLowerCase().includes(pattern.toLowerCase())) ? "PASS" : "FAIL";
}

function latestJsonReport() {
  const reportPath = path.join(reportsDir, "report.json");
  if (!fs.existsSync(reportPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(reportPath, "utf8"));
  } catch {
    return null;
  }
}

function extractPerformance() {
  const readme = readFileIfExists(path.resolve("README.md"));
  const mobile = readme.match(/Mobile Performance:\s*`?(\d+)/i)?.[1] ?? "N/A";
  const desktop = readme.match(/Desktop Performance:\s*`?(\d+)/i)?.[1] ?? "N/A";
  return { mobile, desktop };
}

function versionSummary() {
  const dma = readFileIfExists(path.resolve("DMA.md"));
  return {
    aios: "AIOS 1.0 Professional",
    automation: "Automation 2.0",
    dma: dma.includes("DMA означава") ? "DMA 1.0" : "Unknown",
  };
}

function gitSummary() {
  const branch = runGit(["branch", "--show-current"]);
  const commit = runGit(["log", "-1", "--oneline"]);
  const status = runGit(["status", "--short"], "");
  return {
    branch,
    commit,
    hasChanges: status.length > 0,
    statusText: status.length > 0 ? "dirty" : "clean",
    changes: status.split("\n").filter(Boolean),
  };
}

function recommendations({ releaseStatus, git, warnings, failures, regressionStatus, browserStatus }) {
  if (failures.length) return "Има failures. Поправи грешките и изпълни Automation проверките отново.";
  if (regressionStatus === "failed") return "Има регресия. Прегледай regression отчета.";
  if (browserStatus !== "passed") return "Препоръчва се browser QA.";
  if (releaseStatus === "READY" && !git.hasChanges) return "Сайтът е готов за production след изрично одобрение от Project Owner.";
  if (releaseStatus === "READY" && git.hasChanges) return "Проверките са READY, но има локални промени. Прегледай diff преди commit/deploy.";
  if (warnings.length) return "Има warnings. Прегледай ги преди production решение.";
  return "Няма нужда от действия.";
}

function card(title, value, status = "unknown", meta = "") {
  return `<section class="card">
    <div class="card-title">${escapeHtml(title)}</div>
    <div class="metric ${statusClass(status)}">${escapeHtml(value)}</div>
    ${meta ? `<div class="meta">${escapeHtml(meta)}</div>` : ""}
  </section>`;
}

function list(items) {
  if (!items.length) return "<li>None</li>";
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function listHtml(items) {
  if (!items.length) return "<li>None</li>";
  return items.map((item) => `<li>${item}</li>`).join("\n");
}

function reportLink(file) {
  if (!file) return "No report";
  return `<a href="./${escapeHtml(file)}">${escapeHtml(file)}</a>`;
}

const reports = {
  qa: latestReport(commandSlugs.qa),
  browserQa: latestReport(commandSlugs.browserQa),
  seoCheck: latestReport(commandSlugs.seoCheck),
  regression: latestReport(commandSlugs.regression),
  release: latestReport(commandSlugs.release),
};
const jsonReport = latestJsonReport();
const releaseReady = reports.release.html.includes("READY") || jsonReport?.passed?.includes("READY");
const releaseStatus = releaseReady && reports.release.status !== "failed" ? "READY" : "NOT READY";
const git = gitSummary();
const versions = versionSummary();
const performance = extractPerformance();
const allWarnings = Object.values(reports).flatMap((report) => report.warnings);
const allFailures = Object.values(reports).flatMap((report) => report.failures);
const recentReports = listReportFiles().slice(-12).reverse();
const nextRecommendation = recommendations({
  releaseStatus,
  git,
  warnings: allWarnings,
  failures: allFailures,
  regressionStatus: reports.regression.status,
  browserStatus: reports.browserQa.status,
});

const seoChecks = {
  sitemap: checkText(reports.seoCheck.html, ["sitemap.xml"]),
  robots: checkText(reports.seoCheck.html, ["robots.txt"]),
  llms: checkText(reports.seoCheck.html, ["llms.txt"]),
  schema: checkText(reports.seoCheck.html, ["JSON-LD"]),
};
const browserChecks = {
  desktop: checkText(reports.browserQa.html, ["desktop /"]),
  tablet: checkText(reports.browserQa.html, ["tablet /"]),
  mobile: checkText(reports.browserQa.html, ["mobile /"]),
};
const generatedAt = new Date().toISOString();

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DMA Dashboard</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #0d0f12;
      --panel: #151922;
      --panel-2: #10141b;
      --text: #eef2f7;
      --muted: #9aa5b1;
      --line: #273142;
      --green: #42d67d;
      --yellow: #f2c94c;
      --red: #ff5d5d;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.45;
    }
    a { color: #8bb8ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .shell { max-width: 1280px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; margin-bottom: 24px; }
    h1 { margin: 0 0 6px; font-size: 32px; letter-spacing: 0; }
    h2 { margin: 28px 0 12px; font-size: 18px; letter-spacing: 0; }
    .subtitle, .meta { color: var(--muted); font-size: 13px; }
    .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .card {
      background: linear-gradient(180deg, var(--panel), var(--panel-2));
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      min-height: 110px;
    }
    .card-title { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 10px; }
    .metric { font-size: 28px; font-weight: 750; letter-spacing: 0; overflow-wrap: anywhere; }
    .ok { color: var(--green); }
    .warn { color: var(--yellow); }
    .bad { color: var(--red); }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
    }
    ul { margin: 0; padding-left: 18px; }
    li { margin: 6px 0; color: var(--muted); }
    .status-row { display: grid; grid-template-columns: 160px 1fr auto; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--line); }
    .status-row:last-child { border-bottom: 0; }
    .pill { display: inline-flex; align-items: center; justify-content: center; min-width: 76px; border-radius: 999px; padding: 4px 10px; border: 1px solid currentColor; font-weight: 700; font-size: 12px; }
    .recommendation { border-color: color-mix(in srgb, var(--green) 40%, var(--line)); }
    @media (max-width: 920px) {
      body { padding: 18px; }
      header { display: block; }
      .grid, .grid-3, .grid-2 { grid-template-columns: 1fr; }
      .status-row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <div>
        <h1>DMA Dashboard</h1>
        <div class="subtitle">Local Project Owner dashboard. Generated ${escapeHtml(generatedAt)}.</div>
      </div>
      <div class="pill ${statusClass(releaseStatus)}">${escapeHtml(releaseStatus)}</div>
    </header>

    <section class="grid grid-3">
      ${card("AIOS version", versions.aios, "PASS")}
      ${card("Automation version", versions.automation, "PASS")}
      ${card("DMA version", versions.dma, versions.dma === "DMA 1.0" ? "PASS" : "UNKNOWN")}
    </section>

    <h2>Git</h2>
    <section class="grid grid-3">
      ${card("Branch", git.branch, "PASS")}
      ${card("Last commit", git.commit, "PASS")}
      ${card("Working tree", git.statusText, git.statusText)}
    </section>

    <h2>Build, QA и Release</h2>
    <section class="grid">
      ${card("Build", labelStatus(reports.qa.status), reports.qa.status, reportLink(reports.qa.file).replace(/<[^>]+>/g, ""))}
      ${card("QA", labelStatus(reports.qa.status), reports.qa.status)}
      ${card("Browser QA", labelStatus(reports.browserQa.status), reports.browserQa.status)}
      ${card("SEO Check", labelStatus(reports.seoCheck.status), reports.seoCheck.status)}
      ${card("Regression", reports.regression.status === "passed" ? "NO REGRESSIONS" : "REGRESSION", reports.regression.status)}
      ${card("Release", releaseStatus, releaseStatus)}
      ${card("Mobile Performance", performance.mobile, performance.mobile === "N/A" ? "UNKNOWN" : "PASS")}
      ${card("Desktop Performance", performance.desktop, performance.desktop === "N/A" ? "UNKNOWN" : "PASS")}
    </section>

    <h2>SEO</h2>
    <section class="grid">
      ${card("sitemap", seoChecks.sitemap, seoChecks.sitemap)}
      ${card("robots", seoChecks.robots, seoChecks.robots)}
      ${card("llms", seoChecks.llms, seoChecks.llms)}
      ${card("schema", seoChecks.schema, seoChecks.schema)}
    </section>

    <h2>Browser QA</h2>
    <section class="grid grid-3">
      ${card("Desktop", browserChecks.desktop, browserChecks.desktop)}
      ${card("Tablet", browserChecks.tablet, browserChecks.tablet)}
      ${card("Mobile", browserChecks.mobile, browserChecks.mobile)}
    </section>

    <h2>Command Reports</h2>
    <section class="panel">
      ${Object.entries(reports)
        .map(([name, report]) => `<div class="status-row"><strong>${escapeHtml(name)}</strong><span>${reportLink(report.file)}</span><span class="pill ${statusClass(report.status)}">${escapeHtml(labelStatus(report.status))}</span></div>`)
        .join("\n")}
    </section>

    <h2>Latest HTML Reports</h2>
    <section class="panel">
      <ul>${listHtml(recentReports.map((file) => `<a href="./${escapeHtml(file)}">${escapeHtml(file)}</a>`))}</ul>
    </section>

    <h2>Warnings</h2>
    <section class="panel">
      <ul>${list(allWarnings)}</ul>
    </section>

    <h2>Errors</h2>
    <section class="panel">
      <ul>${list(allFailures)}</ul>
    </section>

    <h2>Next Recommendation</h2>
    <section class="panel recommendation">
      <div class="metric ${allFailures.length ? "bad" : allWarnings.length ? "warn" : "ok"}">${escapeHtml(nextRecommendation)}</div>
    </section>
  </main>
</body>
</html>
`;

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(dashboardPath, html, "utf8");
console.log(`[Dashboard] ${dashboardPath}`);
