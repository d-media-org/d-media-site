#!/usr/bin/env node

import { chromium } from "playwright";
import { createReport, fail, nextAction, pass, warn, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runStep, startCloudflarePreview } from "./automation-runner.mjs";

const report = createReport("npm run browser-qa");
const routes = [
  "/",
  "/services/",
  "/projects/",
  "/pricing/",
  "/estimator/",
  "/contact/",
  "/blog/",
  "/about/",
  "/en/",
  "/en/services/",
  "/en/projects/",
  "/projects/support-account/",
  "/projects/syanka-ot-minaloto/",
  "/en/projects/support-account/",
  "/en/projects/syanka-ot-minaloto/",
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

let preview;
let browser;

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    return scrollWidth - width;
  });
  if (overflow > 1) fail(report, `${label}: horizontal overflow ${overflow}px`);
  else pass(report, `${label}: no horizontal overflow`);
}

async function collectLayoutShift(page) {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      window.setTimeout(() => {
        observer.disconnect();
        resolve(cls);
      }, 600);
    });
  });
}

async function checkRoute(context, route, viewportName) {
  const page = await context.newPage();
  const consoleFailures = [];
  const networkFailures = [];
  const label = `${viewportName} ${route}`;

  page.on("console", (message) => {
    const text = message.text();
    if (
      text.includes("[Cloudflare Turnstile] Error: 110200") ||
      text === "Failed to load resource: the server responded with a status of 400 ()"
    ) {
      warn(report, `${label}: local Turnstile challenge warning ignored`);
      return;
    }
    if (message.type() === "error") consoleFailures.push(text);
  });
  page.on("pageerror", (error) => {
    if (error.message.includes("[Cloudflare Turnstile] Error: 110200")) {
      warn(report, `${label}: local Turnstile pageerror warning ignored`);
      return;
    }
    consoleFailures.push(error.message);
  });
  page.on("response", (response) => {
    const status = response.status();
    if (status >= 400 && response.url().startsWith(preview.baseUrl)) networkFailures.push(`${status} ${response.url()}`);
  });

  let response;
  try {
    response = await page.goto(`${preview.baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(500);
  } catch (error) {
    fail(report, `${label}: navigation failed: ${error.message}`);
    await page.close();
    return;
  }
  if (!response || response.status() >= 400) fail(report, `${label}: HTTP ${response?.status() ?? "no response"}`);
  else pass(report, `${label}: HTTP ${response.status()}`);

  const h1Count = await page.locator("h1").count();
  if (h1Count < 1) fail(report, `${label}: missing h1`);
  else pass(report, `${label}: h1 present`);

  await assertNoHorizontalOverflow(page, label);

  const cls = await collectLayoutShift(page);
  if (cls > 0.1) fail(report, `${label}: layout shift ${cls.toFixed(4)}`);
  else pass(report, `${label}: layout shift ${cls.toFixed(4)}`);

  if (consoleFailures.length) fail(report, `${label}: console errors: ${consoleFailures.join(" | ")}`);
  else pass(report, `${label}: no console errors`);

  if (networkFailures.length) fail(report, `${label}: network failures: ${networkFailures.join(" | ")}`);
  else pass(report, `${label}: no 4xx/5xx network responses`);

  if (route.includes("projects/support-account") || route.includes("projects/syanka-ot-minaloto")) {
    const videos = await page.locator("video").evaluateAll((nodes) =>
      nodes.map((video) => ({ poster: video.getAttribute("poster"), src: video.currentSrc || video.getAttribute("src") })),
    );
    if (!videos.length) {
      warn(report, `${label}: no video elements found`);
    }
    for (const video of videos) {
      if (!video.poster) {
        fail(report, `${label}: video without poster`);
        continue;
      }
      const posterUrl = new URL(video.poster, preview.baseUrl).toString();
      const posterResponse = await page.request.get(posterUrl);
      if (posterResponse.status() >= 400) fail(report, `${label}: poster ${video.poster} returned ${posterResponse.status()}`);
      else pass(report, `${label}: poster loaded ${posterResponse.status()}`);
    }
  }

  await page.close();
}

try {
  await checkRequiredTools(report, ["node", "npm", "npx"]);

  await runStep(report, "Astro build", "npm", ["run", "astro:build"]);
  pass(report, "Astro build completed before browser QA");

  preview = await startCloudflarePreview({ port: 8788 });
  pass(report, `Cloudflare preview started at ${preview.baseUrl}`);

  browser = await chromium.launch({ headless: true });
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.name === "desktop" ? 1 : 2,
    });

    for (const route of routes) {
      await checkRoute(context, route, viewport.name);
    }

    if (viewport.name === "desktop") {
      const page = await context.newPage();
      await page.goto(`${preview.baseUrl}/`, { waitUntil: "domcontentloaded" });
      for (const path of ["/services/", "/projects/", "/pricing/", "/blog/", "/contact/"]) {
        const response = await page.request.get(`${preview.baseUrl}${path}`);
        if (response.status() >= 400) fail(report, `navigation target ${path}: HTTP ${response.status()}`);
        else pass(report, `navigation target ${path}: HTTP ${response.status()}`);
      }
      await page.close();
    }

    await context.close();
  }

  nextAction(report, "Run browser QA again before deploy when visual or route behavior changes.");
} catch (error) {
  fail(report, error.message);
  nextAction(report, "Fix browser QA failure and rerun npm run browser-qa.");
} finally {
  if (browser) await browser.close();
  if (preview) await preview.stop();
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
