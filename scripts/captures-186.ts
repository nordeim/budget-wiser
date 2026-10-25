// Session-186 (WP-6): the captures 479-484 — THE SETTINGS
// PICKLIST-EDITOR OPEN-STATE INTERIOR WALK's own evidence faces: the
// picklist RENAME-OPEN arm (the Pen-click swap — the D-186a1 cured
// glyph) ours+ref at the desktop axis, the same swapped row ours+ref
// at the phone axis — clipped to the first card's own region (the
// walk59 census: the row chrome + the swapped construction byte-equal
// post-cure) — + the Defaults tab's Default Values card ours+ref at
// the desktop axis (the Month/Monday combobox pair + the AED/new/B/3
// fallback family byte-equal).
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

/** The first picklist card's clip box (the Contact Sources card —
 * the walk59 first-card census region, +12px breathing margin). */
async function firstCardClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div")).find(
      (el) =>
        (el.textContent ?? "").trim() === "Contact Sources" &&
        !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Contact Sources")),
    );
    if (!h) throw new Error("the Contact Sources card title not found");
    let card: Element = h;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector('div.flex.items-center.gap-2.p-2.border')) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const r = card.getBoundingClientRect();
    return {
      x: Math.max(0, r.x - 12),
      y: Math.max(0, r.y - 12),
      width: r.width + 24,
      height: r.height + 24,
    };
  });
}

/** The Default Values card's clip box (the Defaults tab). */
async function defaultsCardClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div")).find(
      (el) =>
        (el.textContent ?? "").trim() === "Default Values" &&
        !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Default Values")),
    );
    if (!h) throw new Error("the Default Values card title not found");
    let card: Element = h;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector("input")) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const r = card.getBoundingClientRect();
    return {
      x: Math.max(0, r.x - 12),
      y: Math.max(0, r.y - 12),
      width: r.width + 24,
      height: r.height + 24,
    };
  });
}

async function captureRename(page: Page, base: string, w: number, h: number, shot: string): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2600);
  // the Pen click opens the rename arm (the walk59 drive; the swap is
  // client-state only — the reference's destructive arms never fired)
  await page.locator("main div.flex.items-center.gap-2.p-2.border button").first().click();
  await page.waitForTimeout(900); // the swap + the mount-focus settle
  // THE PHONE INNER-SCROLLER (the walk40 403-scroller model): at 390 the
  // shell scrolls INSIDE the body (the document height == the viewport),
  // so a card taller than the frame clips mid-card when the body never
  // scrolls. Scroll the inner container so the whole card sits inside
  // the frame before the clip read (idempotent when the card fits).
  await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll("main div")).find(
      (el) =>
        (el.textContent ?? "").trim() === "Contact Sources" &&
        !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Contact Sources")),
    );
    if (!h2) return;
    let card: Element = h2;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector('div.flex.items-center.gap-2.p-2.border')) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const r = card.getBoundingClientRect();
    const overshoot = r.bottom - window.innerHeight + 24;
    if (overshoot > 0 && r.top - 100 > 0) {
      // find the scrolling container: the nearest ancestor whose scroll
      // height exceeds its client height (the shell's inner scroller)
      let el: Element | null = card;
      while (el && el.scrollHeight <= el.clientHeight + 1) el = el.parentElement;
      if (el) (el as HTMLElement).scrollTop += Math.min(overshoot, r.top - 100);
    }
  }).catch(() => undefined);
  await page.waitForTimeout(400); // the scroll settle
  await page.screenshot({ path: shot, clip: await firstCardClip(page) });
}

async function captureDefaults(page: Page, base: string, w: number, h: number, shot: string): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  await page.locator('main [role="tab"]').filter({ hasText: "Defaults" }).first().click();
  await page.waitForTimeout(1100);
  await page.screenshot({ path: shot, clip: await defaultsCardClip(page) });
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-186] pair state: ready");

    const renameJobs: Array<[string, number, number, string]> = [
      [BASE, 1440, 900, `${OUT}/479-picklist-rename-open-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/480-picklist-rename-open-ref-desktop.png`],
      [BASE, 390, 844, `${OUT}/481-picklist-rename-open-ours-phone.png`],
      [REF, 390, 844, `${OUT}/482-picklist-rename-open-ref-phone.png`],
    ];
    for (const [base, w, h, shot] of renameJobs) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      await captureRename(await ctx.newPage(), base, w, h, shot);
      await ctx.close();
      console.log(`[captures-186] rename ${base}@${w} -> ${shot}`);
    }

    const defaultsJobs: Array<[string, number, number, string]> = [
      [BASE, 1440, 900, `${OUT}/483-defaults-tab-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/484-defaults-tab-ref-desktop.png`],
    ];
    for (const [base, w, h, shot] of defaultsJobs) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      await captureDefaults(await ctx.newPage(), base, w, h, shot);
      await ctx.close();
      console.log(`[captures-186] defaults ${base}@${w} -> ${shot}`);
    }
    console.log("[captures-186] done — the six faces; the rename pairs the post-cure glyph decode, the defaults pair the vocabulary fallback family");
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[captures-186]", e);
  process.exit(1);
});
