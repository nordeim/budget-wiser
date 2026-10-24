// Session-182 (WP-6): the captures 463-466 — THE REPORTS-FILTER
// SELECTS OPEN-STATE INTERIOR WALK's own evidence faces: the period
// select's OPEN listbox (the checked "This Quarter" option carrying
// Radix's at-open data-highlighted) + the owner select's OPEN listbox
// (the DATA-STATE face — ours the seeded 4-option list, the reference
// its zero-data All Owners-only list), ours+ref, clipped around each
// open listbox's own region.
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** Open one of the reports filter selects (the ATTRIBUTE selector —
 *  the walk53 discovery: getByRole("combobox") stops matching once
 *  aria-expanded flips true), clip the open listbox's own region. */
async function capture(
  page: Page,
  base: string,
  idx: number,
  periodShot: string,
  ownerShot: string,
): Promise<void> {
  await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);

  // 1) the period select (idx 0) — the canonical member's OPEN face
  await page.locator('main [role="combobox"]').nth(0).click();
  await page.waitForTimeout(700); // the 200ms-in zoom/fade + settle
  const period = await page
    .locator('[role="listbox"]')
    .first()
    .boundingBox();
  if (!period) throw new Error("the period listbox not found");
  await page.screenshot({
    path: periodShot,
    clip: {
      x: Math.max(0, period.x - 8),
      y: Math.max(0, period.y - 8),
      width: period.width + 16,
      height: period.height + 16,
    },
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // 2) the owner select (idx 1) — the DATA-STATE arm's OPEN face
  await page.locator('main [role="combobox"]').nth(1).click();
  await page.waitForTimeout(700);
  const owner = await page
    .locator('[role="listbox"]')
    .first()
    .boundingBox();
  if (!owner) throw new Error("the owner listbox not found");
  await page.screenshot({
    path: ownerShot,
    clip: {
      x: Math.max(0, owner.x - 8),
      y: Math.max(0, owner.y - 8),
      width: owner.width + 16,
      height: owner.height + 16,
    },
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-182] pair state: ready");

    const jobs: Array<[string, string, string]> = [
      [BASE, `${OUT}/463-reports-period-open-ours-desktop.png`, `${OUT}/465-reports-owner-open-ours-desktop.png`],
      [REF, `${OUT}/464-reports-period-open-ref-desktop.png`, `${OUT}/466-reports-owner-open-ref-desktop.png`],
    ];
    for (const [base, periodShot, ownerShot] of jobs) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      await capture(await ctx.newPage(), base, 0, periodShot, ownerShot);
      await ctx.close();
      console.log(`[captures-182] ${base} -> ${periodShot} + ${ownerShot}`);
    }
    console.log("[captures-182] done — pixel-diff the period pair; the owner pair is the DATA-STATE face");
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[captures-182]", e);
  process.exit(1);
});
