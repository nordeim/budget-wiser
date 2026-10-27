import { expect, test } from "@playwright/test";

// The LANDING PAGE e2e — the public marketing surface at `/`. The PUBLIC
// block opts out of the storageState (a fresh, logged-out context pins
// the no-login-wall surface).
//
// Pins: the hero, the section anchors, the mobile disclosure menu at
// 390px, the FAQ single-open accordion, and the CTA path to /login.

test.describe("the public landing (logged-out)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the landing renders its anatomy for a GUEST (no login wall)", async ({ page }) => {
    await page.goto("/");
    // the hero
    await expect(page.getByRole("heading", { name: "Every dollar in view." })).toBeVisible();
    await expect(page.getByText("Nothing slips through.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Start tracking free/ })).toBeVisible();
    // the section anchors
    for (const name of ["Features", "Preview", "Pricing", "FAQ"]) {
      await expect(page.locator("header").getByRole("link", { name, exact: true })).toBeVisible();
    }
    // the sign-in CTA
    await expect(page.locator("header").getByRole("link", { name: "Sign in" })).toBeVisible();
  });

  test("the mobile disclosure menu opens and closes at 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    const panel = page.locator("header").getByRole("link", { name: "Pricing" }).last();
    await expect(panel).toBeVisible();

    // The menu closes on toggle.
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.locator("header").getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("the FAQ accordion is single-open", async ({ page }) => {
    await page.goto("/#faq");
    const first = page.getByRole("button", { name: "Is Budget Wise really free?" });
    const second = page.getByRole("button", { name: "Where does my data live?" });

    // The first panel starts OPEN on mount — open the second, which must
    // close the first (the single-open contract).
    await second.click();
    await expect(page.getByText(/Your transactions and budgets live in your own deployment/)).toBeVisible();
    await expect(page.getByText(/Yes — every feature on the dashboard is free/)).toBeHidden();

    // Re-open the first — the second closes.
    await first.click();
    await expect(page.getByText(/Yes — every feature on the dashboard is free/)).toBeVisible();
    await expect(page.getByText(/Your transactions and budgets live in your own deployment/)).toBeHidden();
  });

  test("the Sign in CTA routes to /login", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Sign in" }).click();
    await page.waitForURL("**/login");
    await expect(page.getByRole("heading", { name: "Welcome to Budget Wise" })).toBeVisible();
  });

  test("the SEO family serves (sitemap, robots, manifest)", async ({ page }) => {
    for (const path of ["/sitemap.xml", "/robots.txt", "/manifest.json"]) {
      const res = await page.request.get(path);
      expect(res.status(), path).toBe(200);
    }
    const body = await (await page.request.get("/sitemap.xml")).text();
    expect(body).toContain("/dashboard");
    expect(body).toContain("/transactions");
  });
});
