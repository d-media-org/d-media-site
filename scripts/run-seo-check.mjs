#!/usr/bin/env node

import { createReport, fail, nextAction, pass, writeHtmlReport } from "./automation-report.mjs";
import { checkRequiredTools, runStep, startCloudflarePreview } from "./automation-runner.mjs";

const report = createReport("npm run seo-check");
const routes = ["/", "/en/", "/services/", "/en/services/", "/projects/", "/en/projects/", "/blog/", "/en/blog/"];
let preview;

function getTag(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function checkPresence(label, value) {
  if (value) pass(report, label);
  else fail(report, label);
}

function parseJsonLd(html, route) {
  const matches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!matches.length) {
    fail(report, `${route}: missing JSON-LD`);
    return;
  }

  for (const [index, match] of matches.entries()) {
    try {
      JSON.parse(match[1]);
      pass(report, `${route}: JSON-LD ${index + 1} parses`);
    } catch (error) {
      fail(report, `${route}: JSON-LD ${index + 1} parse failed: ${error.message}`);
    }
  }
}

async function checkHtmlRoute(route) {
  const response = await fetch(`${preview.baseUrl}${route}`);
  if (response.status >= 400) {
    fail(report, `${route}: HTTP ${response.status}`);
    return;
  }

  pass(report, `${route}: HTTP ${response.status}`);
  const html = await response.text();

  checkPresence(`${route}: title`, getTag(html, /<title>([\s\S]*?)<\/title>/i));
  checkPresence(`${route}: meta description`, getTag(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i));
  checkPresence(`${route}: canonical`, getTag(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i));
  checkPresence(`${route}: Open Graph title`, getTag(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i));
  checkPresence(`${route}: Open Graph image`, getTag(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i));
  checkPresence(`${route}: Twitter card`, getTag(html, /<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i));

  const hreflangCount = [...html.matchAll(/<link\s+rel=["']alternate["'][^>]+hreflang=["'][^"']+["'][^>]*>/gi)].length;
  if (hreflangCount >= 2) pass(report, `${route}: hreflang links present`);
  else fail(report, `${route}: missing hreflang links`);

  parseJsonLd(html, route);

  const seoResources = [...html.matchAll(/<(?:link|meta)[^>]+(?:href|content)=["']([^"']+\.(?:png|jpg|jpeg|webp|svg|ico|webmanifest))["'][^>]*>/gi)]
    .map((match) => match[1])
    .filter((url) => url.startsWith("/"));
  for (const resource of new Set(seoResources)) {
    const resourceResponse = await fetch(`${preview.baseUrl}${resource}`);
    if (resourceResponse.status >= 400) fail(report, `${route}: SEO resource ${resource} returned ${resourceResponse.status}`);
    else pass(report, `${route}: SEO resource ${resource} returned ${resourceResponse.status}`);
  }
}

async function checkTextFile(path, expected) {
  const response = await fetch(`${preview.baseUrl}${path}`);
  if (response.status >= 400) {
    fail(report, `${path}: HTTP ${response.status}`);
    return "";
  }

  pass(report, `${path}: HTTP ${response.status}`);
  const body = await response.text();
  for (const item of expected) {
    if (body.includes(item)) pass(report, `${path}: contains ${item}`);
    else fail(report, `${path}: missing ${item}`);
  }
  return body;
}

try {
  await checkRequiredTools(report, ["node", "npm", "npx"]);

  await runStep(report, "Astro build", "npm", ["run", "astro:build"]);
  pass(report, "Astro build completed before SEO check");

  preview = await startCloudflarePreview({ port: 8789 });
  pass(report, `Cloudflare preview started at ${preview.baseUrl}`);

  for (const route of routes) {
    await checkHtmlRoute(route);
  }

  await checkTextFile("/sitemap.xml", ["https://www.d-media.org/"]);
  await checkTextFile("/robots.txt", ["Sitemap:", "Content-Signal: search=yes, ai-input=yes, ai-train=no"]);
  await checkTextFile("/llms.txt", ["# d . media", "https://www.d-media.org/"]);

  const markdownResponse = await fetch(`${preview.baseUrl}/`, { headers: { Accept: "text/markdown" } });
  const markdown = await markdownResponse.text();
  if (markdownResponse.status === 200) pass(report, "Markdown negotiation: HTTP 200");
  else fail(report, `Markdown negotiation: HTTP ${markdownResponse.status}`);
  if (markdownResponse.headers.get("content-type")?.startsWith("text/markdown")) pass(report, "Markdown negotiation: Content-Type text/markdown");
  else fail(report, "Markdown negotiation: wrong Content-Type");
  if (markdownResponse.headers.get("content-signal") === "search=yes, ai-input=yes, ai-train=no") pass(report, "Markdown negotiation: Content-Signal header");
  else fail(report, "Markdown negotiation: missing Content-Signal header");
  if (markdown.includes("Canonical: https://www.d-media.org/")) pass(report, "Markdown negotiation: canonical present");
  else fail(report, "Markdown negotiation: canonical missing");

  nextAction(report, "Run seo-check before release and after SEO/GEO/AI-visible changes.");
} catch (error) {
  fail(report, error.message);
  nextAction(report, "Fix SEO check failure and rerun npm run seo-check.");
} finally {
  if (preview) await preview.stop();
  writeHtmlReport(report);
}

if (report.failed.length) process.exit(1);
