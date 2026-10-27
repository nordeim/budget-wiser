import { expect, test } from "@playwright/test";

// THE MOBILE NAVIGATION SHEET — our functional superset over the
// reference app (budget-wiser.base44.app ships NO navigation below md:
// its link row is display:none on phones with no hamburger — live-
// verified 2026-10-27 at 390×844). This suite pins the drawer that
// closes that gap: the hamburger, the Radix Sheet, every destination,
// and the kept behavioral supersets (route-change close, resize-past-md
// auto-close, the body scroll lock, Escape + scrim close, the focus
// contract).

test.describe("mobile navigation sheet", () => {
  test("hamburger opens the sheet with every nav destination", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    // The desktop link row is display:none at 390px (the reference's own
    // `hidden md:flex` split) — the pills are unreachable.
    const desktopLinks = page.locator("nav .hidden.md\\:flex");
    await expect(desktopLinks).toBeHidden();

    // OUR trigger — the superset the reference never shipped.
    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await expect(trigger).toBeVisible();

    // Open the sheet — the accessible name is the title "BudgetWise"
    // (the Radix aria-labelledby wiring).
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await expect(dialog).toBeVisible();

    // Every destination is reachable from the sheet.
    for (const label of ["Dashboard", "Transactions", "Budgets", "Profile"]) {
      await expect(dialog.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
  });

  test("tapping a sheet link navigates and closes the sheet", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await dialog.getByRole("link", { name: "Transactions", exact: true }).click();

    // The nav hrefs are the reference's CAPITALIZED paths — the sheet's
    // Transactions link lands on /Transactions (rendered in place, never
    // normalized to the lowercase canonical).
    await page.waitForURL("**/Transactions");
    await expect(page.getByRole("heading", { name: "Transactions" })).toBeVisible();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("Escape closes the sheet; focus returns to the trigger", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // Radix restores focus to the trigger on close.
    await expect(trigger).toBeFocused();
  });

  test("the scrim click closes the sheet", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await expect(dialog).toBeVisible();

    // Click the overlay to the right of the 288px sheet.
    await page.mouse.click(370, 400);
    await expect(dialog).toBeHidden();
  });

  test("body scroll locks while the sheet is open", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await expect(dialog).toBeVisible();

    const locked = await page.evaluate(() => document.body.style.overflow);
    expect(locked).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    const unlocked = await page.evaluate(() => document.body.style.overflow);
    expect(unlocked).not.toBe("hidden");
  });

  test("growing the viewport past md auto-closes the sheet (no stranded locks)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await expect(dialog).toBeVisible();

    // Resize past the md breakpoint (768px) — the sheet must dismiss AND
    // release the scroll lock (the pinned regression class).
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(dialog).toBeHidden();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).not.toBe("hidden");
    // The desktop pills are now reachable.
    await expect(page.getByRole("link", { name: "Transactions", exact: true })).toBeVisible();
  });

  test("browser back closes the sheet (the route-change close)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    await expect(dialog).toBeVisible();

    await page.goBack();
    await expect(dialog).toBeHidden();
  });

  test("the active link carries aria-current in the sheet", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/budgets");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "BudgetWise" });
    const active = dialog.getByRole("link", { name: "Budgets", exact: true });
    await expect(active).toHaveAttribute("aria-current", "page");
  });
});

test.describe("desktop navigation (>= md)", () => {
  test("the pill row renders every destination with the active state", async ({ page }) => {
    await page.setViewportSize({ width: 1512, height: 945 });
    await page.goto("/dashboard");

    // No hamburger at desktop widths.
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeHidden();

    for (const label of ["Dashboard", "Transactions", "Budgets", "Profile"]) {
      await expect(page.locator("nav").getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    const active = page.locator("nav").getByRole("link", { name: "Dashboard", exact: true });
    await expect(active).toHaveAttribute("aria-current", "page");

    // The brand mark routes to the dashboard.
    await page.locator("nav").getByRole("link", { name: "BudgetWise home" }).click();
    await page.waitForURL("**/Dashboard");
  });

  test("the capitalized hrefs render in place (never normalized)", async ({ page }) => {
    await page.setViewportSize({ width: 1512, height: 945 });
    await page.goto("/dashboard");
    await page.locator("nav").getByRole("link", { name: "Budgets", exact: true }).click();
    await page.waitForURL("**/Budgets");
    await expect(page.getByRole("heading", { name: "Budgets", exact: true })).toBeVisible();
  });
});
