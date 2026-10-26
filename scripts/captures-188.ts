// Session-188 (WP-6): the captures 491-496 — THE SETTINGS SEGMENTED
// TAB-BAR FOCUS/OPEN INTERIOR WALK + ACCOUNTS-RAIL/LEADS-SEARCH
// PAGE-ARMS SIBLING's own evidence faces: the settings tab-bar
// ours+ref at the desktop axis (the byte-equal strip: the 1120x36
// track + the three 371x28 triggers + the 24px content gap), the same
// strip ours+ref at the phone axis, + the accounts rail's three filter
// selects ours+ref at the desktop axis (the byte-equal 270x36
// comboboxes under their Labels).
import { spawn } from "node:child_process";
import { chromium, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { preflightPairState } from "./sweep-state";

const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const root = resolve(here, "..");
    if (existsSync(join(root, "package.json"))) return root;
  } catch {
    /* fall through to the cwd */
  }
  return process.cwd();
})();
const BASE = "http://localhost:3000";
const REF = "https://neo-crm-8ab2c17c.base44.app";
const OUT = "docs/screenshots";

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

/** The settings tab-bar strip's clip box: the tablist + the active
 * panel's first 120px (+12px breathing margin) — the strip byte-equal
 * on both apps at `288,189 1120x36`. */
async function stripClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const tablist = document.querySelector('main [role="tablist"]');
    if (!tablist) throw new Error("the settings tablist not found");
    const r = tablist.getBoundingClientRect();
    const panel = document.querySelector('main [role="tabpanel"][data-state="active"]');
    const ph = panel ? Math.min(120, panel.getBoundingClientRect().height) : 0;
    return {
      x: Math.max(0, r.x - 12),
      y: Math.max(0, r.y - 12),
      width: r.width + 24,
      height: r.height + ph + 24,
    };
  });
}

/** The accounts rail's clip box: the hidden lg:block w-80 rail card
 * holding the three filter selects (+12px breathing margin). */
async function railClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const combos = Array.from(document.querySelectorAll('main [role="combobox"]'));
    if (!combos.length) throw new Error("the rail comboboxes not found");
    let top = Infinity;
    let bottom = -Infinity;
    let left = Infinity;
    let right = -Infinity;
    for (const c of combos) {
      const r = c.getBoundingClientRect();
      if (r.width === 0) continue;
      top = Math.min(top, r.top);
      bottom = Math.max(bottom, r.bottom);
      left = Math.min(left, r.left);
      right = Math.max(right, r.right);
    }
    // include the paired Labels (60px above the first combobox)
    top = Math.max(0, top - 60);
    return {
      x: Math.max(0, left - 12),
      y: top,
      width: right - left + 24,
      height: bottom - top + 24,
    };
  });
}

async function captureSettingsStrip(page: Page, base: string, w: number, h: number, shot: string): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2600);
  const clip = await stripClip(page);
  await page.screenshot({ path: shot, clip });
}

async function captureRail(page: Page, base: string, w: number, h: number, shot: string): Promise<void> {
  await page.goto(`${base}/accounts`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);
  const clip = await railClip(page);
  await page.screenshot({ path: shot, clip });
}

async function main(): Promise<void> {
  // the boot-site form (the walk57/58 precedent): spawn the dev server
  // if it is not up; kill it at the end (only if WE spawned it).
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${BASE}/login`, 3000)) {
    console.log("[captures-188] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${BASE}/login`, 90000))) process.exit(1);
  }
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[captures-188] pair state: ready");

    const jobs: Array<[string, number, number, string]> = [
      [BASE, 1440, 900, `${OUT}/491-settings-tabs-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/492-settings-tabs-ref-desktop.png`],
      [BASE, 390, 844, `${OUT}/493-settings-tabs-ours-phone.png`],
      [REF, 390, 844, `${OUT}/494-settings-tabs-ref-phone.png`],
      [BASE, 1440, 900, `${OUT}/495-accounts-rail-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/496-accounts-rail-ref-desktop.png`],
    ];
    for (const [origin, w, h, shot] of jobs) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      const page = await ctx.newPage();
      if (shot.includes("settings-tabs")) {
        await captureSettingsStrip(page, origin, w, h, shot);
      } else {
        await captureRail(page, origin, w, h, shot);
      }
      await ctx.close();
      console.log(`[captures-188] ${shot} (w=${w})`);
    }
  } finally {
    await browser.close().catch(() => undefined);
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
}

main().catch((e) => {
  console.error("[captures-188]", e);
  process.exit(1);
});
