// Session-185 (WP-6): the captures 475-478 — THE QUICK-LOG DIALOG
// OPEN-STATE INTERIOR WALK's own evidence faces: the Log Activity
// dialog OPEN (clicked open via the quartet's first member — the
// reference's quartet FUNCTIONAL, the walk's own discovery) ours+ref
// at the desktop axis, and the same OPEN dialog ours+ref at the
// phone axis — clipped to the dialog's own region (the byte-equal
// geometry 384,237 672x426 desktop / 0,201 390x442 phone the walk
// census froze).
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** The dialog's clip box — the [role=dialog][data-state=open] root
 * (the D-112a4 open-state attribute rule; the walk58's own root
 * census: 384,237 672x426 desktop / 0,201 390x442 phone). */
async function dialogClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    if (!dlg) throw new Error("the OPEN dialog not found");
    const r = dlg.getBoundingClientRect();
    return {
      x: Math.max(0, r.x - 12),
      y: Math.max(0, r.y - 12),
      width: r.width + 24,
      height: r.height + 24,
    };
  });
}

async function capture(
  page: Page,
  base: string,
  w: number,
  h: number,
  shot: string,
): Promise<void> {
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  // the quartet's first member opens the create-focus arm (the walk's
  // own drive; the reference's button FUNCTIONAL — the discovery)
  await page.locator("main button", { hasText: "Log Call" }).first().click();
  await page.waitForTimeout(900); // the mount + the mount-focus settle
  await page.screenshot({ path: shot, clip: await dialogClip(page) });
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-185] pair state: ready");

    const jobs: Array<[string, number, number, string]> = [
      [BASE, 1440, 900, `${OUT}/475-log-activity-dialog-open-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/476-log-activity-dialog-open-ref-desktop.png`],
      [BASE, 390, 844, `${OUT}/477-log-activity-dialog-open-ours-phone.png`],
      [REF, 390, 844, `${OUT}/478-log-activity-dialog-open-ref-phone.png`],
    ];
    for (const [base, w, h, shot] of jobs) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      await capture(await ctx.newPage(), base, w, h, shot);
      await ctx.close();
      console.log(`[captures-185] ${base}@${w} -> ${shot}`);
    }
    console.log("[captures-185] done — the four OPEN faces; the desktop pair the byte-equal geometry, the phone pair the phone-axis census");
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[captures-185]", e);
  process.exit(1);
});
