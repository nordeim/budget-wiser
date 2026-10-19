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

  test("the preview mocks are content-varied (F-147c3 — the Accounts micro-table + the Reports 7-bar card)", async ({ page }) => {
    // s148: the reference content-varied its three "See the app itself"
    // mocks — the Dashboard mock keeps the 5-bar pipeline; the Accounts
    // mock renders a 4-row micro table; the Reports mock renders
    // "Revenue by month" with 7 bars (walk38d/f byte-decoded).
    await page.goto("/");
    const preview = page.locator("#preview");
    await expect(preview.getByText("Sales pipeline by stage").first()).toBeVisible();
    await expect(preview.getByText("Northwind Trading").first()).toBeVisible();
    await expect(preview.getByText("Vertex Group").first()).toBeVisible();
    await expect(preview.getByText("Bluepeak Health").first()).toBeVisible();
    await expect(preview.getByText("Harbour & Co").first()).toBeVisible();
    await expect(preview.getByText("$1.2M").first()).toBeVisible();
    await expect(preview.getByText("$3.4M").first()).toBeVisible();
    await expect(preview.getByText("Revenue by month").first()).toBeVisible();
  });

  test("the pricing tiers render the censused cards ($8/$14/$20 + the Pro highlight + the 6-li Advanced)", async ({ page }) => {
    await page.goto("/");
    const pricing = page.locator("#pricing");
    await expect(pricing.getByRole("heading", { name: "Simple monthly pricing" })).toBeVisible();
    await expect(pricing.getByRole("heading", { name: "Standard" })).toBeVisible();
    await expect(pricing.getByRole("heading", { name: "Pro" })).toBeVisible();
    await expect(pricing.getByRole("heading", { name: "Advanced" })).toBeVisible();
    await expect(pricing.getByText("Most popular")).toBeVisible();
    // s149 (F-149c1/c2, walk39): the reference repriced the tiers and
    // grew the Advanced card's list — the live census $8/$14/$20 + the
    // sixth feature row.
    await expect(pricing.getByText("$8")).toBeVisible();
    await expect(pricing.getByText("$14")).toBeVisible();
    await expect(pricing.getByText("$20")).toBeVisible();
    await expect(pricing.getByText("Data tools, templates and guarded reset")).toBeVisible();
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

  test("the guest CTA login-walls with the from_url round-trip (the s147 mirror of the reference's client guard)", async ({ page }) => {
    // Session-147 (F-147c2): the reference's new bundle login-walls
    // guests behind /login?from_url=<abs> (walk37) — OUR mirror: the
    // landing's "Open dashboard" CTA enters the (app) group, the
    // GuestLoginRedirect shim lands on the wall, and a login RETURNS
    // to the CTA's target.
    await page.goto("/");
    await page.getByRole("link", { name: "Open dashboard" }).first().click();
    await page.waitForURL(/\/login\?from_url=/);
    await expect(page.getByRole("heading", { name: "Welcome to NEO CRM" })).toBeVisible();
    // the round-trip: log in from the wall → land on the aimed page
    await page.fill('input[type="email"]', "sepnetflix2023@outlook.com");
    await page.fill('input[type="password"]', "$Abcd1234");
    await page.click('button[type="submit"]');
    await page.waitForURL((u) => !u.pathname.includes("login"), { timeout: 30000 });
    await expect(page.locator("aside").first()).toBeVisible();
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

test.describe("the marketing app pages for a GUEST (session-144 → session-147 — the wall, the posture REVERSED upstream)", () => {
  // Session-144 (F-144c1) built the guest-serving (marketing) group
  // because the reference then served /About + /Contact to guests
  // (walk34). Session-147 (F-147c2): the reference's parity-event
  // bundle REVERSED that — its marketing pages now login-wall guests
  // behind /login?from_url=<absolute-url> (a client-side guard,
  // walk37), returning them post-login. OUR mirror: the
  // GuestLoginRedirect shim (the session decision stays server-side —
  // the guest never receives the page's HTML).
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the guest /About login-walls with the from_url round-trip (the reference's new posture)", async ({ page }) => {
    await page.goto("/About");
    await page.waitForURL(/\/login\?from_url=/);
    await expect(page.getByRole("heading", { name: "Welcome to NEO CRM" })).toBeVisible();
    // the from_url carries the absolute URL (the reference's own form)
    const from = new URL(page.url()).searchParams.get("from_url");
    expect(from).toBeTruthy();
    expect(from!.endsWith("/About")).toBe(true);
    // the round-trip: log in → back to /About with the app shell
    await page.fill('input[type="email"]', "sepnetflix2023@outlook.com");
    await page.fill('input[type="password"]', "$Abcd1234");
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/About$/);
    await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();
    await expect(page.locator("aside").first()).toBeVisible();
  });

  test("the guest /Contact + the lowercase canonicals wall the same way", async ({ page }) => {
    await page.goto("/Contact");
    await page.waitForURL(/\/login\?from_url=/);
    await page.goto("/about");
    await page.waitForURL(/\/login\?from_url=/);
    await page.goto("/contact");
    await page.waitForURL(/\/login\?from_url=/);
  });

  test("the guest funnel: the landing footer links reach the wall (the s144 no-wall funnel retired)", async ({ page }) => {
    // the funnel the reference now ships: public landing → footer →
    // About → the login wall (the s144 guest funnel's terminal hop
    // changed from the content page to the wall)
    await page.goto("/");
    const footer = page.getByRole("contentinfo").first();
    await footer.getByRole("link", { name: "About" }).click();
    await page.waitForURL(/\/login\?from_url=/);
    await expect(page.getByRole("heading", { name: "Welcome to NEO CRM" })).toBeVisible();
  });

  test("the from_url OPEN-REDIRECT guard: a foreign-origin param falls back to the landing", async ({ page }) => {
    // the security-critical negative: the param is untrusted query
    // input — a foreign origin never navigates cross-site post-login
    await page.goto("/login?from_url=https%3A%2F%2Fevil.example.net%2Fphish");
    await page.fill('input[type="email"]', "sepnetflix2023@outlook.com");
    await page.fill('input[type="password"]', "$Abcd1234");
    await page.click('button[type="submit"]');
    await page.waitForURL((u) => !u.pathname.includes("login"), { timeout: 30000 });
    // the guarded target: the plain landing, never the foreign origin
    await expect(page).toHaveURL(/\/$/);
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

// Session-145 (walk35 — the auth-transition family): the guest marketing
// pages at PHONE width. The maiden 390 census: the reference's guest
// /About at 390 renders NO navigation affordance at all (its sidebar
// hidden, NO hamburger — only the "G" account button + the content + the
// footer: the standing CRM-shell mobile defect extends to its
// guest-served app pages). OURS mounts the AppShell drawer — the
// headline fix-over-defect extends to the guest marketing family (the
// s144 (marketing)-group decision). The test pins the drawer's presence
// + its full link set for a sessionless visitor.
test.describe("the guest marketing pages at 390 (session-145 → session-147 — the wall at phone width)", () => {
  // Session-145 walked the guest /About at 390 with the drawer working
  // (the s144 fix-over-defect extending to the guest family). Session-
  // 147 (F-147c2): the reference's parity-event bundle login-walls its
  // marketing pages — the guest phone face is the WALL now (the drawer
  // surface retired with the guest chrome).
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the guest /About at 390: the login wall (the reference's reversed posture)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/About");
    await page.waitForURL(/\/login\?from_url=/);
    // the login card's phone face (the s96 family): the card renders
    // clean, nothing overflows
    await expect(page.getByRole("heading", { name: "Welcome to NEO CRM" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
  });
});
