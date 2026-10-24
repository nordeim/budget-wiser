// Session-180 (WP-6): the captures 455-458 — THE DROPDOWN/SELECT
// OPEN-STATE INTERIOR WALK's own evidence faces: the account-menu OPEN
// + the settings Defaults select OPEN, ours+ref (the walk53 surfaces'
// own OPEN faces, captured mid-interaction on both apps — the menu
// with the ArrowDown-highlighted Profile item, the listbox with the
// highlighted Week option).
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** Open the account menu, ArrowDown once (the highlighted Profile),
 *  and clip the menu's own region. */
async function captureMenuOpen(page: Page, base: string, path: string): Promise<void> {
  // The /settings Defaults surface (NOT /Dashboard): the account menu
  // opens over the settings Card's plain white header — the dashboard
  // variant's shadow-below band blended with the KPI chart content
  // beneath (the standing chart-antialiasing genus), which is a
  // content-beneath artifact, never a menu-face delta; the plain card
  // isolates the menu's own faces.
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  await page.getByRole("tab", { name: "Defaults" }).click().catch(() => undefined);
  await page.waitForTimeout(600);
  await page.locator('button[aria-haspopup="menu"]').click();
  await page.waitForTimeout(500);
  // the REAL keyboard drive (the walk53 form): the highlight moves to
  // the first item — the data-highlighted wash only fires under real
  // keyboard focus
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(400);
  const menu = page.locator('[role="menu"]');
  const box = await menu.boundingBox();
  if (!box) throw new Error("the account menu not found");
  await page.screenshot({
    path,
    clip: {
      x: Math.max(0, box.x - 16),
      y: Math.max(0, box.y - 12),
      width: box.width + 32,
      height: box.height + 24,
    },
  });
}

/** Open the Defaults "Default Calendar View" select (the first
 *  combobox), ArrowDown once (the highlighted Week option), and clip
 *  the listbox's own region. */
async function captureSelectOpen(page: Page, base: string, path: string): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  await page.getByRole("tab", { name: "Defaults" }).click();
  await page.waitForTimeout(700);
  // the ATTRIBUTE selector (the walk53 discovery: getByRole("combobox")
  // stops matching the trigger once aria-expanded flips true)
  await page.locator('[role="combobox"]').first().click();
  await page.waitForTimeout(500);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(400);
  const listbox = page.locator('[role="listbox"]');
  const box = await listbox.boundingBox();
  if (!box) throw new Error("the listbox not found");
  await page.screenshot({
    path,
    clip: {
      x: Math.max(0, box.x - 16),
      y: Math.max(0, box.y - 12),
      width: box.width + 32,
      height: box.height + 24,
    },
  });
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const state = await preflightPairState(browser);

  const jobs = [
    ["OURS", BASE, "455-menu-open-ours-desktop.png", "457-select-open-ours-desktop.png"],
    ["REF ", REF, "456-menu-open-ref-desktop.png", "458-select-open-ref-desktop.png"],
  ] as const;
  for (const [label, base, menuShot, selectShot] of jobs) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const page = await ctx.newPage();
    await captureMenuOpen(page, base, `${OUT}/${menuShot}`);
    console.log(`[captures-180] ${label} ${menuShot}`);
    await captureSelectOpen(page, base, `${OUT}/${selectShot}`);
    console.log(`[captures-180] ${label} ${selectShot}`);
    await ctx.close();
  }

  await browser.close();
  console.log("captures-180: done.");
}

main().catch((e) => {
  console.error("[captures-180]", e);
  process.exit(1);
});
