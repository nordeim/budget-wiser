// Session-178 (WP-6): the captures 449-452 — THE TOPBAR SEARCH FOCUS +
// SETTINGS SEGMENTED-ACTIVE WALK's own evidence faces: the two apps'
// FOCUSED search inputs at desktop (the parity anchor — the 1px
// near-black focus ring's own face, captured under REAL keyboard Tab
// focus on both apps), the settings segmented tabs' click-activated
// ACTIVE state at desktop (the raised white pill — the transition face),
// and the segmented ACTIVE state at phone (the w-full track geometry).
// Runs against the dev server on :3000; the reference rides the
// sweep-state pair.
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState, type SweepPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** REAL keyboard focus into the search input (the walk51 form: Tab from
 *  the sidebar's neutral origin until the placeholder-located input
 *  holds focus — page.focus() never fires :focus-visible honestly). */
async function keyboardFocusSearch(page: Page): Promise<boolean> {
  await page.mouse.click(12, 450); // the sidebar rail's neutral spot
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const hit = await page.evaluate(() => {
      const el = document.querySelector(
        'input[placeholder="Search Anything..."]',
      );
      return el === document.activeElement;
    });
    if (hit) {
      await page.waitForTimeout(400); // transition-colors settle
      return true;
    }
  }
  return false;
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const state: SweepPairState = await preflightPairState(browser);

  // 449 — OURS: the focused search input at desktop (the ring's own face)
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
    await page.waitForTimeout(1800);
    const focused = await keyboardFocusSearch(page);
    console.log(`[captures-178] ours search focused=${focused}`);
    // the topbar clip — the focused input's ring region
    await page.screenshot({
      path: `${OUT}/449-search-focused-ours-desktop.png`,
      clip: { x: 0, y: 0, width: 1440, height: 120 },
    });
    console.log("CAPTURED 449-search-focused-ours-desktop.png (1440x900, ours)");
    await ctx.close();
  }

  // 450 — THE REFERENCE's own focused search face (the parity counterpart)
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const page = await ctx.newPage();
    await page.goto(`${REF}/Dashboard`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
    await page.waitForTimeout(2500);
    // the sweep's own badge closer (it overlays the bottom-right)
    await page
      .locator('button[aria-label*="close badge" i]')
      .click({ timeout: 2000 })
      .catch(() => undefined);
    await page.waitForTimeout(300);
    const focused = await keyboardFocusSearch(page);
    console.log(`[captures-178] ref search focused=${focused}`);
    await page.screenshot({
      path: `${OUT}/450-search-focused-ref-desktop.png`,
      clip: { x: 0, y: 0, width: 1440, height: 120 },
    });
    console.log("CAPTURED 450-search-focused-ref-desktop.png (1440x900, REFERENCE)");
    await ctx.close();
  }

  // 451 — OURS: the segmented tabs' click-activated ACTIVE state at
  // desktop (the raised white pill on the clicked Defaults tab — the
  // transition face the walk censused)
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
    await page.waitForTimeout(1800);
    await page.locator('[role="tab"]').nth(1).click(); // Defaults — the second tab
    await page.waitForTimeout(400); // transition-all settle
    // the clip over the Tabs region (the track + the activated panel head)
    await page.screenshot({
      path: `${OUT}/451-segmented-active-click-desktop.png`,
      clip: { x: 240, y: 120, width: 1120, height: 300 },
    });
    console.log("CAPTURED 451-segmented-active-click-desktop.png (1440x900, ours)");
    await ctx.close();
  }

  // 452 — OURS: the segmented ACTIVE state at phone (the w-full track)
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      storageState: state,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
    await page.waitForTimeout(1800);
    await page.screenshot({
      path: `${OUT}/452-segmented-active-phone.png`,
      clip: { x: 0, y: 140, width: 390, height: 260 },
    });
    console.log("CAPTURED 452-segmented-active-phone.png (390x844, ours)");
    await ctx.close();
  }

  await browser.close();
  console.log("captures-178: done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
