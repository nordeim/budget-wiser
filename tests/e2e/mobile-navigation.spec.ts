import { expect, test } from "@playwright/test";

// THE MOBILE BOTTOM TAB BAR — the reference's redesigned phone navigation
// (live-extracted 2026-10-27 at 390×844: a `md:hidden fixed bottom-0
// left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-pb`
// bar, items `flex flex-col items-center gap-1 px-4 py-2 rounded-xl
// transition-all`, active text-slate-900 / inactive text-slate-400, lucide
// icons w-6 h-6, labels text-xs font-medium).
//
// History: sessions 190–192 shipped a Radix drawer + hamburger as our
// documented SUPERSET because the reference had NO phone navigation
// (its link row was display:none below md with no trigger). The
// reference's redesign shipped its own bottom bar — making our drawer a
// visible-pixel divergence — so the drawer was retired (session 193) and
// this battery now pins the parity surface: visibility below md, the four
// destinations, navigation, the active item, and the kept a11y superset
// (aria-current — the reference ships none).

test.describe("mobile bottom tab bar", () => {
  test("the bar renders on every app page below md with all four destinations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/dashboard", "/transactions", "/budgets", "/profile"]) {
      await page.goto(route);
      const bar = page.getByRole("navigation", { name: "Main navigation" });
      await expect(bar).toBeVisible();
      for (const label of ["Dashboard", "Transactions", "Budgets", "Profile"]) {
        await expect(bar.getByRole("link", { name: label, exact: true })).toBeVisible();
      }
    }
  });

  test("the bar is anchored to the bottom of the viewport (fixed)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    const bar = page.getByRole("navigation", { name: "Main navigation" });
    const box = await bar.boundingBox();
    expect(box).toBeTruthy();
    // Fixed to the bottom: the bar's bottom edge IS the viewport's.
    expect(box!.y + box!.height).toBeCloseTo(844, 0);

    // It stays anchored while the document scrolls (fixed, not absolute).
    await page.evaluate(() => window.scrollTo(0, 800));
    const box2 = await bar.boundingBox();
    expect(box2!.y + box2!.height).toBeCloseTo(844, 0);
  });

  test("tapping a bar link navigates (the capitalized hrefs render in place)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    const bar = page.getByRole("navigation", { name: "Main navigation" });
    await bar.getByRole("link", { name: "Transactions", exact: true }).click();

    // The nav hrefs are the reference's CAPITALIZED paths — the bar's
    // Transactions link lands on /Transactions (rendered in place, never
    // normalized to the lowercase canonical).
    await page.waitForURL("**/Transactions");
    await expect(page.getByRole("heading", { name: "Transactions", exact: true })).toBeVisible();

    // The bar persists across navigation (it is chrome, not a overlay).
    await expect(bar).toBeVisible();
  });

  test("the active item follows the route (the ink + OUR aria-current superset)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/budgets");

    const bar = page.getByRole("navigation", { name: "Main navigation" });
    const active = bar.getByRole("link", { name: "Budgets", exact: true });
    await expect(active).toHaveAttribute("aria-current", "page");

    // The reference's visual split: active slate-900, inactive slate-400.
    await expect(active).toHaveClass(/text-slate-900/);
    const inactive = bar.getByRole("link", { name: "Profile", exact: true });
    await expect(inactive).toHaveClass(/text-slate-400/);
    await expect(inactive).not.toHaveAttribute("aria-current");
  });

  test("the desktop pill row stays hidden at 390px (the reference's split)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    // The reference's own `hidden md:flex` split — the pills are
    // unreachable on phones; the bottom bar is THE phone navigation.
    const desktopLinks = page.locator("nav .hidden.md\\:flex");
    await expect(desktopLinks).toBeHidden();
  });

  test("the body scroll is never locked (the bar is not an overlay)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    // Wait for the hydrated content (the async store fetch) so the
    // document is tall enough to scroll — the fill-vs-hydration race's
    // scroll twin.
    await expect(page.getByRole("region", { name: "Balance" })).toBeVisible();

    // The retired drawer's scroll-lock class of bugs: an overlay nav can
    // strand a body overflow lock. The bottom bar never locks — assert
    // the document scrolls freely with the bar present.
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).not.toBe("hidden");
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrolled = await page.evaluate(() => window.scrollY);
    expect(scrolled).toBeGreaterThan(0);
  });

  test("no hamburger on the navbar (the reference's redesigned chrome)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    // The reference's navbar carries no menu trigger — ours must not
    // either (the drawer's trigger was retired with the redesign).
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toHaveCount(0);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("the bar does not render on the login page (app chrome only)", async ({ page }) => {
    // The reference mounts its bottom bar in the APP shell — the login
    // card (outside the app group) ships no bar (live-verified
    // 2026-10-27). Ours must match: the bar is app chrome, not global.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/login");

    await expect(page.getByRole("navigation", { name: "Main navigation" })).toHaveCount(0);
  });

  test("scrolled-to-end content clears the bar (the pb-20 md:pb-0 clearance)", async ({ page }) => {
    // Session-194: the reference's shell <main> carries `pb-20 md:pb-0`
    // — 80px of bottom padding below md so the LAST content clears the
    // 77px fixed bar (live-verified on all four reference pages). Without
    // it, content boxes sit BEHIND the bar at scroll-end (ours measured
    // +20px behind on dashboard/profile before the fix).
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/dashboard", "/transactions", "/budgets", "/profile"]) {
      await page.goto(route);

      // Wait for the hydrated content first (the fill-vs-hydration race
      // doctrine — the store fetch renders the page's real height). The
      // budgets page's seeded 0-budget state renders identically pre and
      // post fetch, so it rides networkidle alone.
      if (route === "/budgets") {
        await page.waitForLoadState("networkidle");
      } else if (route === "/profile") {
        await expect(page.getByText("sepnetflix2023@outlook.com")).toBeVisible();
      } else {
        await expect(page.getByText("$5,000.00").first()).toBeVisible();
      }

      await page.evaluate(() => window.scrollTo(0, Number.MAX_SAFE_INTEGER));
      const clearance = await page.evaluate<
        { missing: true } | { missing: false; barTop: number; lowest: number }
      >(() => {
        const main = document.querySelector("main");
        const bar = document.querySelector("nav[class*='fixed'][class*='bottom-0']");
        if (!main || !bar) return { missing: true };
        const barTop = bar.getBoundingClientRect().top;
        // The lowest content box inside main (every in-flow element with
        // a nonzero box — the pb-20 padding must clear them all).
        const elements = [...main.querySelectorAll("*")].filter((el): el is HTMLElement => {
          if (!(el instanceof HTMLElement)) return false;
          return el.offsetParent !== null && el.getBoundingClientRect().height > 0;
        });
        let lowest = 0;
        for (const el of elements) {
          const bottom = el.getBoundingClientRect().bottom;
          if (bottom > lowest) lowest = bottom;
        }
        return { barTop: Math.round(barTop), lowest: Math.round(lowest), missing: false };
      });

      // The pb-20 guarantee: the lowest content box clears the bar's top
      // edge (with a 1px rounding allowance).
      if (clearance.missing) throw new Error("main or bottom bar missing on " + route);
      expect(clearance.lowest).toBeLessThanOrEqual(clearance.barTop + 1);
    }
  });
});

test.describe("desktop navigation (>= md)", () => {
  test("the bar is hidden at md and above; the pill row carries the nav", async ({ page }) => {
    await page.setViewportSize({ width: 1512, height: 945 });
    await page.goto("/dashboard");

    // The bottom bar is display:none at desktop (the md:hidden split).
    const bar = page.getByRole("navigation", { name: "Main navigation" });
    await expect(bar).toBeHidden();

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
