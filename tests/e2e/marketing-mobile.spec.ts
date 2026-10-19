import { expect, test } from "@playwright/test";

// Session-150 (walk40, D-150a2): the marketing phone-state walk — the
// full-page axis extended past the landing (the only PUBLIC long-scroll
// surface) to the two remaining marketing pages. walk40's L-150c1
// decode: at phone width the /About + /Contact content scrolls INSIDE
// the shell's `main.overflow-auto` (the h-screen flex-shell contract)
// — the DOCUMENT never grows (scrollH === the viewport), so a fullPage
// capture structurally cannot see these surfaces' below-the-fold. The
// walk's full-geometry census (every element's top+height on BOTH
// apps) verified the interiors byte-equal (about main.scrollHeight
// 1731 = both · contact 897 = both · 0 geometry diffs) — this spec
// freezes the SCROLL MODEL + the census so a future construction
// regression REDs here exactly.
//
// This runs with the shared storageState (the pages are login-gated
// for guests — the s147 F-147c2 posture; the e2e user is signed in).
// The pinned values are CLASS-DERIVED (the h-screen shell, the
// overflow-auto main) or COUNT-DERIVED (the s142 censused copy) —
// never text-rasterized pixel sums (the s106 idiom: a layout-value pin
// must not depend on font metrics).
test("the marketing pages hold the 390px phone contract (the walk40 internal-scroller model + census)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  // ---- /About -----------------------------------------------------------
  await page.goto("/about");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "About NEO CRM" })).toBeVisible();

  const about = await page.evaluate(() => {
    const main = document.querySelector("main");
    const intro = Array.from(document.querySelectorAll("main .space-y-4 > p"));
    const cards = Array.from(document.querySelectorAll("main .bg-white.border.rounded-xl"));
    const link = document.querySelector('main a[href="/Contact"]');
    return {
      docScrollW: document.documentElement.scrollWidth,
      docScrollH: document.documentElement.scrollHeight,
      mainScrollH: main?.scrollHeight ?? 0,
      introCount: intro.length,
      cardCount: cards.length,
      hasGetInTouch: (link?.textContent ?? "").includes("Get in touch with us"),
    };
  });

  // (a) the frame contract: nothing overflows the 390px viewport
  expect(about.docScrollW).toBe(390);
  // (b) the walk40 scroll model: the DOCUMENT never scrolls (the
  // h-screen shell) — the below-fold content lives INSIDE main's
  // scroller, the surface a fullPage capture cannot see
  expect(about.docScrollH).toBe(844);
  expect(about.mainScrollH).toBeGreaterThan(844);
  // (c) the s142 censused census: 3 intro paragraphs + 4 icon cards +
  // the get-in-touch link (the walk40 PASS 2 verified every element's
  // geometry byte-equal on both apps)
  expect(about.introCount).toBe(3);
  expect(about.cardCount).toBe(4);
  expect(about.hasGetInTouch).toBe(true);

  // ---- /Contact ---------------------------------------------------------
  await page.goto("/contact");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();

  const contact = await page.evaluate(() => {
    const main = document.querySelector("main");
    const socials = Array.from(document.querySelectorAll('main a[target="_blank"][rel="noopener noreferrer"]'));
    const email = document.querySelector('main a[href="mailto:hello@example.com"]');
    const cards = Array.from(document.querySelectorAll("main .bg-white.border.rounded-xl"));
    return {
      docScrollW: document.documentElement.scrollWidth,
      docScrollH: document.documentElement.scrollHeight,
      mainScrollH: main?.scrollHeight ?? 0,
      socialCount: socials.length,
      socialHrefs: socials.map((a) => (a as HTMLAnchorElement).href),
      hasEmail: email !== null,
      cardCount: cards.length,
    };
  });

  // (a) the frame contract
  expect(contact.docScrollW).toBe(390);
  // (b) the walk40 scroll model (contact main.scrollHeight 897 at the
  // walk — the content scrolls internally here too)
  expect(contact.docScrollH).toBe(844);
  expect(contact.mainScrollH).toBeGreaterThan(844);
  // (c) the s142 censused census: the Email card + the Follow-us card
  // with the three socials
  expect(contact.cardCount).toBe(2);
  expect(contact.hasEmail).toBe(true);
  expect(contact.socialCount).toBe(3);
  expect(contact.socialHrefs).toEqual([
    "https://www.linkedin.com/",
    "https://x.com/",
    "https://github.com/",
  ]);
});
