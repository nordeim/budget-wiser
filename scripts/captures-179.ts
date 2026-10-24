// Session-179 (WP-6): the captures 453-454 — THE REPORTS PILL-TAB
// FOCUS-STATE RE-WALK's own evidence faces: the focused reports pill
// trigger ours+ref (the ring-2 + offset-2 focus-visible form's own
// face, captured under REAL keyboard focus on both apps).
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

async function capturePillFocus(page: Page, base: string, path: string): Promise<void> {
  await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
  await page.locator('[role="tab"]').first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  // REAL keyboard focus (the walk52 form): click the page header's
  // neutral spot (a known origin), then Tab until a tab trigger holds
  await page.mouse.click(1440 / 2, 40);
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const isTab = await page.evaluate(() => {
      const el = document.activeElement;
      return !!el && el.getAttribute("role") === "tab";
    });
    if (isTab) break;
  }
  await page.waitForTimeout(400);
  const track = page.locator('[role="tablist"]').first();
  const tbox = await track.boundingBox();
  if (!tbox) throw new Error("the tablist not found");
  await page.screenshot({
    path,
    clip: {
      x: Math.max(0, tbox.x - 24),
      y: Math.max(0, tbox.y - 20),
      width: tbox.width + 48,
      height: tbox.height + 40,
    },
  });
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const state = await preflightPairState(browser);

  for (const [label, base, name] of [
    ["OURS", BASE, "453-pill-focus-ours-desktop.png"],
    ["REF ", REF, "454-pill-focus-ref-desktop.png"],
  ] as const) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const page = await ctx.newPage();
    if (base === REF) {
      // the sweep's own badge closer
      await page.goto(`${REF}/reports`, { waitUntil: "domcontentloaded" });
      await page
        .locator('button[aria-label*="close badge" i]')
        .click({ timeout: 2000 })
        .catch(() => undefined);
      await page.waitForTimeout(300);
    }
    await capturePillFocus(page, base, `${OUT}/${name}`);
    console.log(`CAPTURED ${name} (1440x900, ${label.trim()})`);
    await ctx.close();
  }

  await browser.close();
  console.log("captures-179: done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
