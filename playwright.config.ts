import { defineConfig, devices } from "playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 8788);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `npm run astro:cf:validate && cd astro && npx wrangler pages dev dist --ip 127.0.0.1 --port ${port}`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 180_000,
      },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"], browserName: "chromium" },
    },
  ],
});
