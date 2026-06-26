import { expect, test, type Page } from "playwright/test";

const smokeRoutes = [
  "/",
  "/services/",
  "/pricing/",
  "/estimator/",
  "/contact/",
  "/projects/",
  "/blog/",
  "/about/",
  "/services/geo/",
  "/projects/d-media/",
];

const requiredFooterLinks = ["/projects", "/services", "/terms", "/privacy", "/contact"];

async function collectConsoleFailures(page: Page) {
  const failures: string[] = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      failures.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
  return failures;
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    return scrollWidth - width;
  });
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("release smoke", () => {
  for (const route of smokeRoutes) {
    test(`renders ${route}`, async ({ page }) => {
      const consoleFailures = await collectConsoleFailures(page);
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });

      expect(response?.status(), route).toBeLessThan(400);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator("header").first()).toBeVisible();
      await expect(page.locator("footer").first()).toBeVisible();
      await expectNoHorizontalOverflow(page);
      expect(consoleFailures).toEqual([]);
    });
  }

  test("navigation and footer links remain valid", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    for (const path of requiredFooterLinks) {
      const response = await page.request.get(path);
      expect(response.status(), path).toBeLessThan(400);
    }

    const navTargets = new Set(await page.locator("header nav a[href]").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).pathname).filter(Boolean),
    ));
    for (const target of ["/services/", "/pricing/", "/projects/", "/blog/", "/contact/"]) {
      expect(navTargets.has(target), target).toBe(true);
    }
  });

  test("estimator creates a usable generated project description", async ({ page }) => {
    await page.goto("/estimator/", { waitUntil: "domcontentloaded" });

    await page.getByLabel("Нов уебсайт").check();
    await page.getByLabel("Уеб дизайн и разработка").check();
    await page.getByRole("button", { name: "Продължи" }).click();
    await page.getByLabel("Страница за кампания или услуга").check();
    await page.getByRole("button", { name: "Продължи" }).click();
    await page.getByLabel("Стандартен").check();
    await page.getByRole("button", { name: "Продължи" }).click();
    await page.getByLabel("1 месец").check();
    await page.getByLabel("€1,000–€3,000").check();
    await page.getByRole("button", { name: "Продължи" }).click();
    await page.getByRole("button", { name: "Виж ориентировъчната рамка" }).click();

    await expect(page.locator("[data-estimator-result]")).toBeVisible();
    await expect(page.locator("[data-result-price]")).toContainText("€");

    await page.locator("[data-review-link]").click();
    await expect(page.locator("[data-inquiry-form]")).toBeVisible();
    await expect(page.getByText("Подготвено описание на проекта")).toBeVisible();
    await expect(page.locator("[data-brief-services]")).toContainText("Уеб дизайн и разработка");
    await expect(page.locator("[data-brief-recommendations]")).toContainText("SEO и видимост в AI търсене");
    await expect(page.locator('select[name="service"]')).toHaveValue("Web Design & Development");
    await expect(page.locator('textarea[name="message"]').first()).toHaveValue(/Тип проект/);
    await expectNoHorizontalOverflow(page);
  });
});
