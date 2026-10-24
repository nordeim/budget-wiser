// Session-183 (WP-6): the captures 467-470 — THE LEADS-FILTER POPOVER +
// CONTACTS-FILTER-PANEL OPEN-STATE INTERIOR WALK's own evidence faces:
// the leads Filters popover OPEN (the w-80 content with the four field
// labels + the two selects + the two inputs + the Clear/Save View
// footer) ours+ref at desktop, and the contacts filter panel OPEN (the
// D-183a1 post-cure face — the Filters trigger flipped to the DARK
// stock primary) ours+ref at desktop, clipped around each open
// surface's own region.
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

async function capture(page: Page, base: string, popoverShot: string, panelShot: string): Promise<void> {
  // 1) the leads Filters popover's OPEN face (the portal arm)
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  await page.locator('main button', { hasText: "Filters" }).first().click();
  await page.waitForTimeout(700); // the 200ms-in zoom/fade + settle
  const popover = await page
    .locator('[role="dialog"][data-state="open"]')
    .first()
    .boundingBox();
  if (!popover) throw new Error("the leads popover not found");
  await page.screenshot({
    path: popoverShot,
    clip: {
      x: Math.max(0, popover.x - 8),
      y: Math.max(0, popover.y - 8),
      width: popover.width + 16,
      height: popover.height + 16,
    },
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // 2) the contacts filter panel's OPEN face (the in-flow arm — the
  //    FULL panel: the sticky Filters header + the Clear All ghost +
  //    the 5-6 checkbox card groups; keyed on the h3 climbed TWO levels
  //    — h3 → sticky → the panel div — the walk56 panel census form)
  await page.goto(`${base}/contacts`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  await page.locator('main button', { hasText: "Filters" }).first().click();
  await page.waitForTimeout(700);
  const panelBox = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll("h3")).find(
      (h) => (h.textContent ?? "").trim() === "Filters",
    );
    const sticky = h3?.parentElement;
    const panel = sticky?.parentElement;
    if (!panel) return null;
    const r = panel.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: Math.min(r.height, 700) };
  });
  if (!panelBox) throw new Error("the contacts panel not found");
  await page.screenshot({
    path: panelShot,
    clip: {
      x: Math.max(0, panelBox.x - 8),
      y: Math.max(0, panelBox.y - 8),
      width: panelBox.width + 16,
      height: panelBox.height + 16,
    },
  });
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-183] pair state: ready");

    const jobs: Array<[string, string, string]> = [
      [BASE, `${OUT}/467-leads-popover-open-ours-desktop.png`, `${OUT}/469-contacts-panel-open-ours-desktop.png`],
      [REF, `${OUT}/468-leads-popover-open-ref-desktop.png`, `${OUT}/470-contacts-panel-open-ref-desktop.png`],
    ];
    for (const [base, popoverShot, panelShot] of jobs) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      await capture(await ctx.newPage(), base, popoverShot, panelShot);
      await ctx.close();
      console.log(`[captures-183] ${base} -> ${popoverShot} + ${panelShot}`);
    }
    console.log("[captures-183] done — pixel-diff the popover pair; the panel pair carries the D-183a1 post-cure face");
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[captures-183]", e);
  process.exit(1);
});
