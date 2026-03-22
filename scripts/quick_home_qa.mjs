import { chromium } from "playwright";
const views = [
  { name: "desktop-light", viewport: { width: 1440, height: 1600 }, colorScheme: "light" },
  { name: "desktop-dark", viewport: { width: 1440, height: 1600 }, colorScheme: "dark" },
];
const browser = await chromium.launch({ headless: true });
for (const view of views) {
  const context = await browser.newContext({ viewport: view.viewport, colorScheme: view.colorScheme, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto("https://www.d-media.org", { waitUntil: "networkidle" });
  await page.screenshot({ path: "/Users/m.dragoev/d . media - site/.qa/home-" + view.name + "-final.png", fullPage: true });
  await context.close();
}
await browser.close();
