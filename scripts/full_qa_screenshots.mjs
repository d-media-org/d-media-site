import { chromium } from "playwright";

const pages = ["/", "/projects", "/services", "/about", "/terms", "/privacy", "/contact"];
const views = [
  { name: "desktop-light", viewport: { width: 1440, height: 1600 }, colorScheme: "light" },
  { name: "desktop-dark", viewport: { width: 1440, height: 1600 }, colorScheme: "dark" },
  { name: "mobile-light", viewport: { width: 390, height: 1200 }, colorScheme: "light" },
  { name: "mobile-dark", viewport: { width: 390, height: 1200 }, colorScheme: "dark" },
];

const browser = await chromium.launch({ headless: true });
for (const view of views) {
  const context = await browser.newContext({ viewport: view.viewport, colorScheme: view.colorScheme, deviceScaleFactor: 2 });
  const page = await context.newPage();
  for (const route of pages) {
    const url = "https://www.d-media.org" + route;
    await page.goto(url, { waitUntil: "networkidle" });
    const file = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
    await page.screenshot({ path: "/Users/m.dragoev/d . media - site/.qa/" + file + "-" + view.name + ".png", fullPage: true });
  }
  await context.close();
}
await browser.close();
