// Session-184 (WP-6): the captures 471-474 — THE ACTIVITIES MORE-FILTERS
// TOGGLE + RAIL-ACTIONS OPEN-STATE INTERIOR WALK's own evidence faces:
// the expander HOVERED (the first mouse-borne face ever walked in the
// battery — the computed-equal wash rgb(245,245,245) + ink rgb(23,23,23))
// ours+ref at desktop, and the rail OPEN (ours: the revealed More Types
// group with the Task/Note checkboxes — the functional superset; ref:
// the dead stub's unchanged face) ours+ref at desktop, clipped around
// the Filters card's own region.
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** The Filters card's clip box — keyed on the "Filters" title climbed to
 *  its Card container (the walk57 rail census form; the repo's CardTitle
 *  renders a DIV not an h3 — key on the exact text, then climb to the
 *  `rounded-xl border` Card signature), extended over the rail's full
 *  height (the expander + the Filter primary included). */
async function railClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const title = Array.from(document.querySelectorAll("main div")).find(
      (d) => (d.textContent ?? "").trim() === "Filters" && d.children.length === 0,
    );
    let card: Element | null = title ?? null;
    for (let i = 0; i < 6 && card?.parentElement; i++) {
      card = card.parentElement;
      if ((card.getAttribute("class") ?? "").includes("rounded-xl border")) break;
    }
    if (!card || !(card.getAttribute("class") ?? "").includes("rounded-xl border")) {
      throw new Error("the Filters card not found");
    }
    const r = card.getBoundingClientRect();
    return {
      x: Math.max(0, r.x - 8),
      y: Math.max(0, r.y - 8),
      width: r.width + 16,
      height: Math.min(r.height + 16, 760),
    };
  });
}

async function capture(page: Page, base: string, hoverShot: string, openShot: string): Promise<void> {
  // 1) the expander's HOVER face (the first-walked mouse-borne face)
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  const trigger = page.locator("main button", { hasText: "More Filters" }).first();
  await trigger.hover();
  await page.waitForTimeout(400); // the transition-colors 150ms + settle
  await page.screenshot({ path: hoverShot, clip: await railClip(page) });

  // 2) the rail's OPEN face (ours: the revealed More Types + Task/Note
  //    group; the reference: the dead stub's unchanged rail)
  await page.mouse.move(700, 250); // unhover first (the wash releases)
  await page.waitForTimeout(400);
  await trigger.click();
  await page.waitForTimeout(700); // the reveal mount + settle
  await page.screenshot({ path: openShot, clip: await railClip(page) });
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-184] pair state: ready");

    const jobs: Array<[string, string, string]> = [
      [BASE, `${OUT}/471-activities-expander-hover-ours-desktop.png`, `${OUT}/473-activities-rail-open-ours-desktop.png`],
      [REF, `${OUT}/472-activities-expander-hover-ref-desktop.png`, `${OUT}/474-activities-rail-open-ref-desktop.png`],
    ];
    for (const [base, hoverShot, openShot] of jobs) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      await capture(await ctx.newPage(), base, hoverShot, openShot);
      await ctx.close();
      console.log(`[captures-184] ${base} -> ${hoverShot} + ${openShot}`);
    }
    console.log("[captures-184] done — the hover pair carries the computed-equal wash; the open pair: ours the revealed superset, ref the dead face");
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[captures-184]", e);
  process.exit(1);
});
