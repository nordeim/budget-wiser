// Session-187 (WP-6): the captures 485-490 — THE PROFILE
// PHOTO-UPLOAD FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS DATA-TAB
// SIBLING's own evidence faces: the Personal Information card
// ours+ref at the desktop axis (the D-187a1/a2 cured construction: the
// stock DIV avatar fallback + the on-svg color, the hidden input's id),
// the same card ours+ref at the phone axis, + the Data-tab Import
// Templates card ours+ref at the desktop axis (the D-187a3 cured
// rhythm — the button row byte-equal post-cure at 313,348).
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
    /* fall through */
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

/** The Personal Information card's clip box (+12px breathing margin). */
async function piCardClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div")).find(
      (el) =>
        (el.textContent ?? "").trim() === "Personal Information" &&
        !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Personal Information")),
    );
    if (!h) throw new Error("the Personal Information title not found");
    let card: Element = h;
    for (let i = 0; i < 10; i++) {
      const p = card.parentElement;
      if (!p) break;
      const cs = getComputedStyle(p);
      if (cs.borderStyle !== "none" && cs.borderRadius !== "0px" && p.querySelector("form")) {
        card = p;
        break;
      }
      card = p;
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

/** The Import Templates card's clip box (the Data tab). */
async function importCardClip(page: Page): Promise<{ x: number; y: number; width: number; height: number }> {
  return page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div")).find(
      (el) =>
        (el.textContent ?? "").trim() === "Import Templates" &&
        !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Import Templates")),
    );
    if (!h) throw new Error("the Import Templates title not found");
    let card: Element = h;
    for (let i = 0; i < 10; i++) {
      const p = card.parentElement;
      if (!p) break;
      const cs = getComputedStyle(p);
      if (cs.borderStyle !== "none" && cs.borderRadius !== "0px" && p.querySelector("button")) {
        card = p;
        break;
      }
      card = p;
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

/** THE PHONE INNER-SCROLLER (the walk40 403-scroller model): at 390 the
 * shell scrolls INSIDE the body (the document height == the viewport),
 * so a card taller than the frame clips mid-card when the body never
 * scrolls. Scroll the inner container so the whole card sits inside
 * the frame before the clip read (idempotent when the card fits). */
async function scrollCardIntoFrame(page: Page, title: string): Promise<void> {
  await page
    .evaluate((t) => {
      const h = Array.from(document.querySelectorAll("main div")).find(
        (el) =>
          (el.textContent ?? "").trim() === t &&
          !Array.from(el.children).some((c) => (c.textContent ?? "").includes(t)),
      );
      if (!h) return;
      let card: Element = h;
      for (let i = 0; i < 10; i++) {
        const p = card.parentElement;
        if (!p) break;
        const cs = getComputedStyle(p);
        if (cs.borderStyle !== "none" && cs.borderRadius !== "0px") {
          card = p;
          break;
        }
        card = p;
      }
      const r = card.getBoundingClientRect();
      const overshoot = r.bottom - window.innerHeight + 24;
      if (overshoot > 0 && r.top - 100 > 0) {
        let el: Element | null = card;
        while (el && el.scrollHeight <= el.clientHeight + 1) el = el.parentElement;
        if (el) (el as HTMLElement).scrollTop += Math.min(overshoot, r.top - 100);
      }
    }, title)
    .catch(() => undefined);
}

async function captureProfile(page: Page, base: string, w: number, h: number, shot: string): Promise<void> {
  await page.goto(`${base}/profile`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2600);
  if (w === 390) {
    await scrollCardIntoFrame(page, "Personal Information");
    await page.waitForTimeout(400);
  }
  const clip = await piCardClip(page);
  await page.screenshot({ path: shot, clip });
}

async function captureDataTab(page: Page, base: string, w: number, h: number, shot: string): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2400);
  await page.locator('main [role="tab"]').filter({ hasText: "Data" }).first().click();
  await page.waitForTimeout(1100);
  const clip = await importCardClip(page);
  await page.screenshot({ path: shot, clip });
}

async function main(): Promise<void> {
  // the boot-site form (the walk57/58 precedent): spawn the dev server
  // if it is not up; kill it at the end (only if WE spawned it).
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${BASE}/login`, 3000)) {
    console.log("[captures-187] reusing the dev server on :3000");
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
    console.log("[captures-187] pair state: ready");

    const profileJobs: Array<[string, number, number, string]> = [
      [BASE, 1440, 900, `${OUT}/485-profile-pi-card-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/486-profile-pi-card-ref-desktop.png`],
      [BASE, 390, 844, `${OUT}/487-profile-pi-card-ours-phone.png`],
      [REF, 390, 844, `${OUT}/488-profile-pi-card-ref-phone.png`],
    ];
    for (const [base, w, h, shot] of profileJobs) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      const page = await ctx.newPage();
      await captureProfile(page, base, w, h, shot);
      console.log(`[captures-187] ${shot}`);
      await ctx.close();
    }

    const dataJobs: Array<[string, number, number, string]> = [
      [BASE, 1440, 900, `${OUT}/489-datatab-import-card-ours-desktop.png`],
      [REF, 1440, 900, `${OUT}/490-datatab-import-card-ref-desktop.png`],
    ];
    for (const [base, w, h, shot] of dataJobs) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      const page = await ctx.newPage();
      await captureDataTab(page, base, w, h, shot);
      console.log(`[captures-187] ${shot}`);
      await ctx.close();
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
  console.error("[captures-187]", e);
  process.exit(1);
});
