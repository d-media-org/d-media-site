#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const reportsDir = path.resolve("reports");
const dashboardPath = path.join(reportsDir, "dashboard.html");
const dashboardUrl = pathToFileURL(dashboardPath).href;
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
  if (!items.length) return "<li>Няма.</li>";
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function listHtml(items) {
  if (!items.length) return "<li>Няма.</li>";
  return items.map((item) => `<li>${item}</li>`).join("\n");
}

function reportLink(file) {
  if (!file) return "Няма отчет";
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
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DMA Dashboard</title>
  <style>
    @font-face {
      font-family: "PantonLight";
      src: url("../public/fonts/panton-subset/Panton-Light.latin-cyrillic.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "PantonRegular";
      src: url("../public/fonts/panton-subset/Panton-Regular.latin-cyrillic.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "PantonSemiBold";
      src: url("../public/fonts/panton-subset/Panton-SemiBold.latin-cyrillic.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "PantonBold";
      src: url("../public/fonts/panton-subset/Panton-Bold.latin-cyrillic.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "PantonBlack";
      src: url("../public/fonts/panton-subset/Panton-Black.latin-cyrillic.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    :root {
      color-scheme: light dark;
      --font-panton-light: "PantonLight", sans-serif;
      --font-panton-regular: "PantonRegular", sans-serif;
      --font-panton-semibold: "PantonSemiBold", sans-serif;
      --font-panton-bold: "PantonBold", sans-serif;
      --font-panton-black: "PantonBlack", sans-serif;
      --background: #ffffff;
      --foreground: #0a0a0a;
      --text: #0f0f0f;
      --muted: #6b6b6b;
      --line: #e5e5e5;
      --line-strong: #cfcfcf;
      --fog: #f5f5f5;
      --surface: #ffffff;
      --surface-soft: #f3f3f3;
      --text-soft: #4f4f4f;
      --text-faint: #7b7b7b;
      --accent: #0a0a0a;
      --accent-foreground: #ffffff;
      --status-pass: #0f7a42;
      --status-warn: #9a6a00;
      --status-fail: #b00020;
      --container-max: 1248px;
      --shell-pad-inline: 24px;
      --space-8: 8px;
      --space-16: 16px;
      --space-24: 24px;
      --space-32: 32px;
      --space-48: 48px;
      --space-64: 64px;
      --radius-card: 24px;
      --radius-pill: 999px;
      --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.04);
      --transition-base: 240ms ease;
      --type-h1: clamp(34px, 4.2vw, 62px);
      --type-h2: clamp(28px, 3vw, 40px);
      --type-h3: 20px;
      --type-body: 16px;
      --type-small: 12px;
    }
    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) {
        --background: #181818;
        --foreground: #f4f4f4;
        --text: #e8e8e8;
        --muted: #b8b8b8;
        --line: #3c3c3c;
        --line-strong: #545454;
        --fog: #262626;
        --surface: #222222;
        --surface-soft: #2c2c2c;
        --text-soft: #e2e2e2;
        --text-faint: #d0d0d0;
        --accent: #f4f4f4;
        --accent-foreground: #0b0b0b;
        --status-pass: #42d67d;
        --status-warn: #f2c94c;
        --status-fail: #ff6b6b;
        --shadow-card: 0 16px 40px rgba(0, 0, 0, 0.28);
      }
    }
    html[data-theme="dark"] {
      color-scheme: dark;
      --background: #181818;
      --foreground: #f4f4f4;
      --text: #e8e8e8;
      --muted: #b8b8b8;
      --line: #3c3c3c;
      --line-strong: #545454;
      --fog: #262626;
      --surface: #222222;
      --surface-soft: #2c2c2c;
      --text-soft: #e2e2e2;
      --text-faint: #d0d0d0;
      --accent: #f4f4f4;
      --accent-foreground: #0b0b0b;
      --status-pass: #42d67d;
      --status-warn: #f2c94c;
      --status-fail: #ff6b6b;
      --shadow-card: 0 16px 40px rgba(0, 0, 0, 0.28);
    }
    html[data-theme="light"] { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--background);
      color: var(--text);
      font-family: var(--font-panton-regular), sans-serif;
      font-feature-settings: "locl" 1;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    a {
      color: var(--foreground);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.18em;
      text-decoration-color: color-mix(in srgb, var(--muted) 52%, transparent);
      transition: color var(--transition-base), text-decoration-color var(--transition-base);
    }
    a:hover,
    a:focus-visible {
      color: var(--foreground);
      text-decoration-color: currentColor;
    }
    button { font: inherit; }
    .shell {
      width: min(var(--container-max), 100%);
      margin: 0 auto;
      padding: 0 var(--shell-pad-inline) var(--space-48);
    }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      padding: 0 var(--shell-pad-inline);
      background: color-mix(in srgb, var(--background) 97%, transparent);
      backdrop-filter: blur(16px);
    }
    .topbar-inner {
      width: min(var(--container-max), 100%);
      min-height: 78px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-16);
      border-bottom: 1px solid var(--line);
    }
    .brand {
      display: inline-flex;
      align-items: baseline;
      gap: var(--space-8);
      color: var(--foreground);
      text-decoration: none;
    }
    .brand-mark {
      font-family: var(--font-panton-black), sans-serif;
      font-size: 24px;
      line-height: 1;
    }
    .brand-sub {
      color: var(--muted);
      font-size: var(--type-small);
    }
    .header-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: var(--space-8);
      align-items: center;
    }
    .button {
      display: inline-flex;
      min-height: var(--space-48);
      align-items: center;
      justify-content: center;
      padding: 0 var(--space-24);
      border: 1px solid var(--foreground);
      border-radius: var(--radius-pill);
      background: transparent;
      color: var(--foreground);
      font-family: var(--font-panton-semibold), sans-serif;
      font-size: var(--type-small);
      line-height: 1.2;
      text-align: center;
      white-space: normal;
      overflow-wrap: anywhere;
      cursor: pointer;
      text-decoration: none;
      transition:
        background-color var(--transition-base),
        color var(--transition-base),
        border-color var(--transition-base),
        transform var(--transition-base),
        box-shadow var(--transition-base);
    }
    .button:hover,
    .button:focus-visible {
      background: var(--accent);
      color: var(--accent-foreground);
      transform: translateY(-1px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      text-decoration: none;
    }
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      border: 0;
      background: transparent;
    }
    .theme-toggle button {
      appearance: none;
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 1px solid var(--line);
      border-radius: var(--radius-pill);
      background: transparent;
      color: var(--text-faint);
      font-family: var(--font-panton-bold), sans-serif;
      font-size: 11px;
      line-height: 1;
      cursor: pointer;
      transition:
        border-color var(--transition-base),
        color var(--transition-base),
        background-color var(--transition-base);
    }
    .theme-toggle button:hover,
    .theme-toggle button:focus-visible,
    .theme-toggle button.is-active {
      border-color: var(--foreground);
      color: var(--foreground);
      background: color-mix(in srgb, var(--surface-soft) 76%, transparent);
    }
    header.dashboard-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: var(--space-24);
      align-items: end;
      padding: var(--space-64) 0 var(--space-32);
      border-bottom: 1px solid var(--line);
    }
    .eyebrow {
      margin: 0 0 var(--space-16);
      color: var(--muted);
      font-family: var(--font-panton-semibold), sans-serif;
      font-size: var(--type-small);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      max-width: 780px;
      color: var(--foreground);
      font-family: var(--font-panton-black), sans-serif;
      font-size: var(--type-h1);
      line-height: 0.96;
      letter-spacing: 0;
    }
    h2 {
      margin: var(--space-48) 0 var(--space-16);
      color: var(--foreground);
      font-family: var(--font-panton-bold), sans-serif;
      font-size: var(--type-h3);
      letter-spacing: 0;
    }
    .subtitle,
    .meta {
      max-width: 720px;
      margin-top: var(--space-16);
      color: var(--text-soft);
      font-size: var(--type-body);
    }
    .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--space-16); }
    .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-card);
      padding: var(--space-24);
      min-height: 132px;
      box-shadow: var(--shadow-card);
    }
    .card-title {
      margin-bottom: var(--space-16);
      color: var(--muted);
      font-family: var(--font-panton-semibold), sans-serif;
      font-size: var(--type-small);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .metric {
      color: var(--foreground);
      font-family: var(--font-panton-black), sans-serif;
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      line-height: 1;
      letter-spacing: 0;
      overflow-wrap: anywhere;
    }
    .ok { color: var(--status-pass); }
    .warn { color: var(--status-warn); }
    .bad { color: var(--status-fail); }
    .panel {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-card);
      padding: var(--space-24);
      box-shadow: var(--shadow-card);
    }
    ul { margin: 0; padding-left: var(--space-24); }
    li { margin: var(--space-8) 0; color: var(--text-soft); }
    .status-row {
      display: grid;
      grid-template-columns: 160px minmax(0, 1fr) auto;
      gap: var(--space-16);
      align-items: center;
      padding: var(--space-16) 0;
      border-bottom: 1px solid var(--line);
    }
    .status-row:last-child { border-bottom: 0; }
    .pill {
      display: inline-flex;
      min-width: 76px;
      min-height: 32px;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-pill);
      padding: 4px 12px;
      border: 1px solid currentColor;
      font-family: var(--font-panton-bold), sans-serif;
      font-size: var(--type-small);
      line-height: 1.2;
      text-align: center;
      overflow-wrap: anywhere;
    }
    .recommendation { border-color: color-mix(in srgb, var(--status-pass) 40%, var(--line)); }
    .direct-link {
      display: grid;
      gap: var(--space-8);
      margin-top: var(--space-16);
      padding: var(--space-16);
      border: 1px solid var(--line);
      border-radius: var(--space-16);
      background: var(--surface-soft);
      color: var(--text-soft);
      font-size: var(--type-small);
    }
    html[data-theme="dark"] .card,
    html[data-theme="dark"] .panel {
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), var(--shadow-card);
    }
    @media (max-width: 920px) {
      :root { --shell-pad-inline: 16px; }
      .topbar-inner { min-height: auto; padding: var(--space-16) 0; align-items: flex-start; }
      .brand { align-items: flex-start; flex-direction: column; gap: 4px; }
      .header-actions { justify-content: flex-start; }
      header.dashboard-hero { display: block; padding-top: var(--space-48); }
      .grid, .grid-3, .grid-2 { grid-template-columns: 1fr; }
      .status-row { grid-template-columns: 1fr; }
    }
  </style>
  <script>
    (() => {
      const root = document.documentElement;
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const storageKey = "d-media-theme-mode";
      const getStoredMode = () => {
        try {
          return window.localStorage.getItem(storageKey) || "auto";
        } catch {
          return "auto";
        }
      };
      const applyTheme = () => {
        const mode = getStoredMode();
        const resolvedTheme = mode === "auto" ? (media.matches ? "dark" : "light") : mode;
        root.dataset.themeMode = mode;
        root.dataset.theme = resolvedTheme;
      };
      applyTheme();
      media.addEventListener?.("change", applyTheme);
      window.addEventListener("DOMContentLoaded", () => {
        const buttons = [...document.querySelectorAll("[data-theme-choice]")];
        const syncButtons = () => {
          const mode = getStoredMode();
          buttons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.themeChoice === mode);
            button.setAttribute("aria-pressed", String(button.dataset.themeChoice === mode));
          });
        };
        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            try {
              window.localStorage.setItem(storageKey, button.dataset.themeChoice || "auto");
            } catch {}
            applyTheme();
            syncButtons();
          });
        });
        syncButtons();
      });
    })();
  </script>
</head>
<body>
  <div class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="./dashboard.html" aria-label="DMA Dashboard">
        <span class="brand-mark">d . media</span>
        <span class="brand-sub">DMA Dashboard</span>
      </a>
      <div class="header-actions">
        <a class="button" href="${escapeHtml(dashboardUrl)}">Отвори dashboard</a>
        <div class="theme-toggle" aria-label="Избор на тема">
          <button type="button" data-theme-choice="light" aria-label="Светла тема">L</button>
          <button type="button" data-theme-choice="dark" aria-label="Тъмна тема">D</button>
          <button type="button" data-theme-choice="auto" aria-label="Автоматична тема">A</button>
        </div>
      </div>
    </div>
  </div>
  <main class="shell">
    <header class="dashboard-hero">
      <div>
        <p class="eyebrow">Локален инструмент за Project Owner</p>
        <h1>DMA Dashboard</h1>
        <div class="subtitle">Обобщава последните Automation отчети, git състоянието и release readiness сигнала. Генериран: ${escapeHtml(generatedAt)}.</div>
        <div class="direct-link">
          <strong>Директен линк за отваряне</strong>
          <a href="${escapeHtml(dashboardUrl)}">${escapeHtml(dashboardUrl)}</a>
        </div>
      </div>
      <div class="pill ${statusClass(releaseStatus)}">${escapeHtml(releaseStatus)}</div>
    </header>

    <section class="grid grid-3">
      ${card("AIOS версия", versions.aios, "PASS")}
      ${card("Automation версия", versions.automation, "PASS")}
      ${card("DMA версия", versions.dma, versions.dma === "DMA 1.0" ? "PASS" : "UNKNOWN")}
    </section>

    <h2>Git</h2>
    <section class="grid grid-3">
      ${card("Branch", git.branch, "PASS")}
      ${card("Последен commit", git.commit, "PASS")}
      ${card("Работно дърво", git.statusText, git.statusText)}
    </section>

    <h2>Build, QA и Release</h2>
    <section class="grid">
      ${card("Build", labelStatus(reports.qa.status), reports.qa.status, reportLink(reports.qa.file).replace(/<[^>]+>/g, ""))}
      ${card("QA", labelStatus(reports.qa.status), reports.qa.status)}
      ${card("Browser QA", labelStatus(reports.browserQa.status), reports.browserQa.status)}
      ${card("SEO Check", labelStatus(reports.seoCheck.status), reports.seoCheck.status)}
      ${card("Regression", reports.regression.status === "passed" ? "NO REGRESSIONS" : "REGRESSION", reports.regression.status)}
      ${card("Release", releaseStatus, releaseStatus)}
      ${card("Mobile performance", performance.mobile, performance.mobile === "N/A" ? "UNKNOWN" : "PASS")}
      ${card("Desktop performance", performance.desktop, performance.desktop === "N/A" ? "UNKNOWN" : "PASS")}
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

    <h2>Командни отчети</h2>
    <section class="panel">
      ${Object.entries(reports)
        .map(([name, report]) => `<div class="status-row"><strong>${escapeHtml(name)}</strong><span>${reportLink(report.file)}</span><span class="pill ${statusClass(report.status)}">${escapeHtml(labelStatus(report.status))}</span></div>`)
        .join("\n")}
    </section>

    <h2>Последни HTML отчети</h2>
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

    <h2>Следваща препоръка</h2>
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
console.log(`[Dashboard URL] ${dashboardUrl}`);
