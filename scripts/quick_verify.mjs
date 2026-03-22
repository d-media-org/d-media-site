import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
for (const [name, colorScheme] of [["light","light"],["dark","dark"]]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1600 }, colorScheme, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto("https://www.d-media.org", { waitUntil: "networkidle" });
  await page.screenshot({ path: "/Users/m.dragoev/d . media - site/.qa/home-verify-" + name + ".png", fullPage: true });
  await context.close();
}
await browser.close();
