// Session-181 (WP-6): the captures 459-462 — THE DIALOG-SURFACE
// FOCUS-STATE INTERIOR WALK's own evidence faces: the New Lead
// dialog's mount-focused Name input (the ring's own face, captured
// under the REAL mount focus on both apps) + the REAL-keyboard-focused
// close X (the DOUBLE ring — ring-2 + ring-offset-2), ours+ref.
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** Open the New Lead dialog (the mount focus lands on the Name input),
 *  then Tab 9 stops to the close X — clip each focused element's own
 *  region. */
async function capture(
  page: Page,
  base: string,
  inputShot: string,
  closeShot: string,
): Promise<void> {
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  await page.getByRole("button", { name: "New Lead" }).first().click();
  await page.waitForTimeout(900); // the 200ms enter animation + settle

  const DIALOG = '[role="dialog"][data-state="open"]';

  // 1) the mount-focused first input (the ring paints — :focus-visible
  //    TRUE under Radix's programmatic mount focus after the click
  //    gesture, the walk54 discovery-probe find)
  const input = page.locator(`${DIALOG} input`).first();
  await input.focus(); // re-assert (the settle wait may have moved it)
  await page.waitForTimeout(300);
  const ibox = await input.boundingBox();
  if (!ibox) throw new Error("the focused input not found");
  await page.screenshot({
    path: inputShot,
    clip: {
      x: Math.max(0, ibox.x - 12),
      y: Math.max(0, ibox.y - 10),
      width: ibox.width + 24,
      height: ibox.height + 20,
    },
  });

  // 2) the REAL keyboard Tab drive to the close X (9 stops: the 4
  //    remaining inputs · the 2 select triggers · Cancel · the submit
  //    · the close X) — the DOUBLE ring's own face
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(200);
  }
  const close = page.locator(`${DIALOG} button`).last();
  const cbox = await close.boundingBox();
  if (!cbox) throw new Error("the focused close X not found");
  await page.screenshot({
    path: closeShot,
    clip: {
      x: Math.max(0, cbox.x - 14),
      y: Math.max(0, cbox.y - 14),
      width: cbox.width + 28,
      height: cbox.height + 28,
    },
  });
  await page.keyboard.press("Escape");
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-181] pair state: ready");

    const jobs: Array<[string, string, string]> = [
      [BASE, `${OUT}/459-dialog-input-focus-ours-desktop.png`, `${OUT}/461-dialog-close-focus-ours-desktop.png`],
      [REF, `${OUT}/460-dialog-input-focus-ref-desktop.png`, `${OUT}/462-dialog-close-focus-ref-desktop.png`],
    ];
    for (const [base, inputShot, closeShot] of jobs) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      await capture(await ctx.newPage(), base, inputShot, closeShot);
      await ctx.close();
      console.log(`[captures-181] ${base} -> ${inputShot} + ${closeShot}`);
    }
    console.log("[captures-181] done — pixel-diff the pairs");
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[captures-181]", e);
  process.exit(1);
});
