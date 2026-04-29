import fs from "node:fs";
import path from "node:path";

import { chromium, devices } from "playwright";

const outDir = path.join(process.cwd(), "tmp", "dark-qa");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const contexts = [
  {
    name: "desktop",
    context: await browser.newContext({
      viewport: { width: 1440, height: 1200 },
      colorScheme: "dark",
    }),
  },
  {
    name: "mobile",
    context: await browser.newContext({
      ...devices["iPhone 13"],
      colorScheme: "dark",
    }),
  },
];

for (const { name, context } of contexts) {
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3004", { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(outDir, `home-${name}.png`),
    fullPage: true,
  });
  await page.close();
  await context.close();
}

await browser.close();
process.stdout.write(`${outDir}\n`);
