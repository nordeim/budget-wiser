import { expect, test } from "@playwright/test";

// Session-142 (D-142a1/D-142a6): the LANDING PAGE e2e — the reference's
// new public marketing surface (probe:ref #114's parity event: its
// index-Dc6wvGtA.js bundle). The PUBLIC block opts out of the
// storageState (a fresh, logged-out context pins the no-login-wall
// surface); the AUTHENTICATED block keeps it. Session-144 (F-144c1):
// the marketing family (/ + /About + /Contact) is PUBLIC on the
// reference — walk34 decoded its guest face (the full chrome + "Hi,
// Guest", NOT an empty shell as the s142 comment assumed); the GUEST
// block below pins it.
//
// Pins here: the censused construction (the sections, the pricing tiers,
// the FAQ single-open accordion), the mobile disclosure menu at TRUE 390
// (the reference's own working menu — NOT the CRM shell's standing
// mobile defect, which our drawer fixes), the guest CTA path (Open
// dashboard → the (app) login wall — OUR security posture: the reference
// renders its CRM data pages to guests too [the "Hi, Guest" platform
// face], our server guard is the documented fix-over-defect), and the
// post-login redirect to `/` (the reference's own new behavior,
// live-verified).

test.describe("the public landing (logged-out)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the landing renders its censused anatomy for a GUEST (no login wall)", async ({ page }) => {
    await page.goto("/");
    // the hero
    await expect(page.getByRole("heading", { name: "Every account, contact and deal in one calm workspace" })).toBeVisible();
    await expect(page.getByText("Customer relationship management, simplified")).toBeVisible();
    await expect(page.getByRole("link", { name: "Open the dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "See pricing" })).toBeVisible();
    // the checklist
    await expect(page.getByText("Runs in the browser")).toBeVisible();
    await expect(page.getByText("Private to your account")).toBeVisible();
    await expect(page.getByText("CSV import & export")).toBeVisible();
    // the section anchors
    for (const name of ["Features", "Preview", "Pricing", "FAQ"]) {
      await expect(page.locator("header").getByRole("link", { name, exact: true })).toBeVisible();
    }
    // the mock dashboard chrome (the hero's CSS-built preview)
    await expect(page.getByText("NEO CRM · Dashboard").first()).toBeVisible();
    await expect(page.getByText("Sales pipeline by stage").first()).toBeVisible();
  });

  test("the pricing tiers render the censused cards ($9/$19/$39 + the Pro highlight)", async ({ page }) => {
    await page.goto("/");
    const pricing = page.locator("#pricing");
    await expect(pricing.getByRole("heading", { name: "Simple monthly pricing" })).toBeVisible();
    await expect(pricing.getByRole("heading", { name: "Standard" })).toBeVisible();
    await expect(pricing.getByRole("heading", { name: "Pro" })).toBeVisible();
    await expect(pricing.getByRole("heading", { name: "Advanced" })).toBeVisible();
    await expect(pricing.getByText("Most popular")).toBeVisible();
    await expect(pricing.getByText("$9")).toBeVisible();
    await expect(pricing.getByText("$19")).toBeVisible();
    await expect(pricing.getByText("$39")).toBeVisible();
    // the tier CTAs all point at the dashboard
    await expect(pricing.getByRole("link", { name: "Start with Standard" })).toHaveAttribute("href", "/Dashboard");
    await expect(pricing.getByRole("link", { name: "Start with Pro" })).toHaveAttribute("href", "/Dashboard");
    // the footnote
    await expect(pricing.getByText("Prices are shown for reference while billing is being set up")).toBeVisible();
  });

  test("the FAQ is a SINGLE-OPEN accordion with Q1 open by default", async ({ page }) => {
    await page.goto("/");
    const faq = page.locator("#faq");
    // Q1 open by default (the reference's own default)
    await expect(faq.getByText("No. NEO CRM is a web app — sign in from any modern browser")).toBeVisible();
    // opening Q2 closes Q1 (the single-open mechanism, live-verified on
    // the reference)
    await faq.getByRole("button", { name: "Is my data separate from other customers?" }).click();
    await expect(faq.getByText("Yes. Your accounts, contacts, leads, activities and calendar events")).toBeVisible();
    await expect(faq.getByText("No. NEO CRM is a web app — sign in from any modern browser")).toHaveCount(0);
    // our documented a11y superset: the toggles carry aria-expanded
    await expect(faq.getByRole("button", { name: "Is my data separate from other customers?" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    // the last question's answer (the tier guidance)
    await faq.getByRole("button", { name: "Which tier do I need?" }).click();
    await expect(faq.getByText("Standard covers the day-to-day CRM. Pro adds the pipeline forecast")).toBeVisible();
  });

  test("the mobile disclosure menu opens at 390 and closes on section-link click", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForTimeout(500);
    // the hamburger (the reference's exact aria-label)
    const toggle = page.getByRole("button", { name: "Toggle navigation" });
    await expect(toggle).toBeVisible();
    // the panel is NOT mounted while closed (the reference's mount/unmount
    // construction)
    await expect(page.locator("div.md\\:hidden.border-t")).toHaveCount(0);
    // open: the panel mounts with the 5 links + the w-full CTA
    await toggle.click();
    const panel = page.locator("div.md\\:hidden.border-t");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "Preview" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "FAQ" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "Open dashboard" })).toBeVisible();
    // an in-panel section-link click closes the menu (the live-verified
    // reference behavior) + scrolls to the section
    await panel.getByRole("link", { name: "Features" }).click();
    await expect(page.locator("div.md\\:hidden.border-t")).toHaveCount(0);
    await expect(page).toHaveURL(/#features/);
    // the toggle re-opens (the icon swapped back to the hamburger)
    await toggle.click();
    await expect(page.locator("div.md\\:hidden.border-t")).toBeVisible();
  });

  test("the guest CTA login-walls at the (app) guard (OUR security posture)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Open dashboard" }).first().click();
    await page.waitForURL("**/login");
    await expect(page.getByRole("heading", { name: "Welcome to NEO CRM" })).toBeVisible();
  });

  test("the login flow lands on the landing (the reference's post-login redirect)", async ({ page }) => {
    // The reference's post-login redirect is `/` (live-verified on its
    // new bundle); ours matches — the login card's router.push("/") now
    // lands on the PUBLIC landing instead of the dashboard.
    await page.goto("/login");
    await page.waitForTimeout(1200); // the L-138c3 hydration settle
    await page.fill('input[type="email"]', "sepnetflix2023@outlook.com");
    await page.fill('input[type="password"]', "$Abcd1234");
    await Promise.all([
      page.waitForURL((u) => u.pathname === "/"),
      page.click('button[type="submit"]'),
    ]);
    await expect(
      page.getByRole("heading", { name: "Every account, contact and deal in one calm workspace" }),
    ).toBeVisible();
  });

  test("the footer links + the anchor sections resolve", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("© 2026 NEO CRM")).toBeVisible();
    await expect(footer.getByRole("link", { name: "About" })).toHaveAttribute("href", "/About");
    await expect(footer.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/Contact");
    // the #features anchor scrolls (the scroll-mt-16 offset)
    await page.getByRole("link", { name: "Features" }).first().click();
    await expect(page).toHaveURL(/#features/);
  });
});

test.describe("the marketing app pages for a GUEST (session-144 — F-144c1, the public family)", () => {
  // Session-144 (D-144a1/F-144c1): the reference serves /About + /Contact
  // to GUESTS — rendered-level (walk34: the full content + the app chrome,
  // the "Hi, Guest" topbar + the gray-200 "G" avatar). The s142 build's
  // (app)-group placement login-walled the guest funnel (the landing
  // footer → 307); the (marketing) group is session-optional now.
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the guest /About renders the full page with the app chrome — no login wall", async ({ page }) => {
    await page.goto("/About");
    await expect(page).toHaveURL(/\/About$/);
    // the censused content (byte-identical to the authenticated face)
    await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Accounts & Contacts" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Get in touch with us/ })).toHaveAttribute("href", "/Contact");
    // the app chrome: the "Hi, Guest" topbar (the reference's guest face)
    await expect(page.getByText("Hi, Guest")).toBeVisible();
    // the app-shell footer (the s143 contract) renders for guests too
    await expect(page.getByText("© 2026 NEO CRM")).toBeVisible();
  });

  test("the guest /Contact renders + the lowercase canonicals serve the same faces", async ({ page }) => {
    await page.goto("/Contact");
    await expect(page).toHaveURL(/\/Contact$/);
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Email" })).toBeVisible();
    await expect(page.getByRole("link", { name: "hello@example.com" })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
    await expect(page.getByText("Hi, Guest")).toBeVisible();
    // the dual-casing (the s24 parity) holds in the guest state
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
  });

  test("the guest funnel: the landing footer links reach the marketing pages (no login wall)", async ({ page }) => {
    // the funnel the reference actually ships: public landing → footer →
    // About → Contact — every hop 200 for a sessionless visitor
    await page.goto("/");
    const footer = page.getByRole("contentinfo").first();
    await footer.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/About$/);
    await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();
    // About's own tail link → Contact
    await page.getByRole("link", { name: /Get in touch with us/ }).click();
    await expect(page).toHaveURL(/\/Contact$/);
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
  });
});

test.describe("the marketing app pages (authenticated)", () => {
  test("the About + Contact pages render for the logged-in user with the user's own topbar", async ({ page }) => {
    // Session-144 re-anchor: the pages moved to the PUBLIC (marketing)
    // group (F-144c1) — the logged-in face keeps the same construction;
    // the session-optional layout feeds the session user to the same
    // AppShell chrome (the topbar carries the real user, not Guest).
    await page.goto("/About");
    await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Accounts & Contacts" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Reports" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Get in touch with us/ })).toHaveAttribute("href", "/Contact");

    await page.goto("/Contact");
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Email" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Follow us" })).toBeVisible();
    await expect(page.getByRole("link", { name: "hello@example.com" })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
    // the lowercase canonicals serve the same content (the dual-casing)
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
  });
});
