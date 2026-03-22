import fs from "node:fs";
import path from "node:path";

import { chromium, devices } from "playwright";

const outDir = path.join(process.cwd(), "tmp", "mobile-qa");
fs.mkdirSync(outDir, { recursive: true });
const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const pages = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
  { path: "/services", name: "services" },
  { path: "/terms", name: "terms" },
  { path: "/privacy", name: "privacy" },
  { path: "/contact", name: "contact" },
];

async function shot(page, url, name) {
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: true,
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...devices["iPhone 13"],
  });
  const page = await context.newPage();

  for (const item of pages) {
    await shot(page, `${baseUrl}${item.path}`, item.name);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
