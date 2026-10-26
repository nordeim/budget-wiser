// Session-189 (WP-6): the captures 497-506 — THE LEADS SAVED-VIEWS
// SELECT OPEN FACES + THE CALENDAR MONTH-NAV ARMS' own evidence faces:
// the Saved-Views select OPEN ours+ref at the desktop axis (the
// byte-equal 192x36 combobox + its 194x42 radius-6 listbox, the
// probe's own saved view applied), the calendar month-nav ours+ref at
// the desktop axis (the byte-equal heading + the three outline
// buttons), + the standard dev-server page set for the operator's
// record (dashboard, leads, calendar, contacts, accounts, activities,
// reports, settings — the seeded state, the full-page renders).
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

/** The Saved-Views capture: ride the native-prompt save flow, open the
 *  select (the ArrowDown REAL-keyboard form), clip the combobox + the
 *  open listbox (+16px breathing margin). The walk62 evidence face. */
async function captureSavedViewsOpen(page: Page, shot: string): Promise<void> {
  await page.goto(`${page.url().startsWith("http://localhost") ? BASE : REF}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2600);
  // the save flow (the s29 native-prompt contract)
  const filtersTrigger = page.locator('main button[aria-label="Open lead filters"], main button:has-text("Filters")').first();
  await filtersTrigger.click();
  await page.waitForTimeout(900);
  const saveBtn = page.locator('button:has-text("Save View")').first();
  page.once("dialog", (d) => {
    void d.accept("Walk62 View").catch(() => undefined);
  });
  await saveBtn.click();
  await page.waitForTimeout(1400);
  await page.keyboard.press("Escape").catch(() => undefined);
  await page.waitForTimeout(400);
  // open the select + clip
  const selectLoc = page.locator('main [role="combobox"]').filter({ hasText: /Saved Views|Walk62 View/i }).first();
  await selectLoc.click();
  await page.waitForTimeout(800);
  const clip = await page.evaluate(() => {
    const combos = Array.from(document.querySelectorAll('main [role="combobox"]'));
    const el = combos.find((c) => /saved views|walk62 view/i.test((c.getAttribute("aria-label") ?? "") + " " + (c.textContent ?? "")));
    if (!el) throw new Error("the saved-views select not found");
    const r = el.getBoundingClientRect();
    const lb = document.querySelector('[role="listbox"]');
    const lr = lb ? lb.getBoundingClientRect() : null;
    const bottom = lr ? Math.max(r.bottom, lr.bottom) : r.bottom;
    return {
      x: Math.max(0, r.x - 12),
      y: Math.max(0, r.y - 12),
      width: r.width + 24,
      // the bottom margin stays TIGHT (+8): a wide margin catches the
      // underlying table header below the listbox — a DATA-STATE
      // sliver (the seeded vs zero-data rows), never the arm itself
      height: bottom - r.y + 8,
    };
  });
  await page.screenshot({ path: shot, clip });
}

/** The Saved-Views capture at the phone axis: the same save-flow +
 *  open ride, the 390×844 clip (the w-full stacked toolbar). */
async function captureSavedViewsOpenPhone(page: Page, shot: string): Promise<void> {
  await captureSavedViewsOpen(page, shot);
}

/** The calendar month-nav capture: clip the month card's header row
 *  (the heading + the three outline buttons, +16px margin). */
async function captureMonthNav(page: Page, shot: string): Promise<void> {
  await page.goto(`${page.url().startsWith("http://localhost") ? BASE : REF}/calendar`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2600);
  const clip = await page.evaluate(() => {
    const h2 = document.querySelector("main h2");
    if (!h2) throw new Error("the calendar heading not found");
    const r = h2.getBoundingClientRect();
    // the nav row sits right of the heading in the same row band; the
    // button pool is CARD-SCOPED (the month card, the walk62 navPhase
    // form) — an all-main pool catches the filters rail's Clear All on
    // the reference (the rail is a separate column, same y-band);
    // take the RIGHTMOST band button (the next-month arrow — the
    // reference carries no aria-labels, the s88-c9 genus)
    const explicit = document.querySelector('main button[aria-label="Next month"]');
    const card = h2.closest("div")?.parentElement ?? h2.parentElement;
    const bandBtns = Array.from(card?.querySelectorAll("button") ?? []).filter((b) => {
      const br = b.getBoundingClientRect();
      return Math.abs(br.y - r.y) < 14 && br.width <= 80 && br.height <= 40;
    });
    const navBtn = explicit ?? (bandBtns.length ? bandBtns[bandBtns.length - 1] : null);
    const nr = navBtn ? navBtn.getBoundingClientRect() : r;
    return {
      x: Math.max(0, r.x - 16),
      y: Math.max(0, r.y - 16),
      width: (nr.right - r.x) + 32,
      height: r.height + 32,
    };
  });
  await page.screenshot({ path: shot, clip });
}

/** The standard dev-server page set (the operator's record): the
 *  full-page render of the nine CRM pages at the seeded state. */
async function capturePage(page: Page, base: string, route: string, shot: string): Promise<void> {
  await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);
  await page.screenshot({ path: shot, fullPage: false });
}

async function main(): Promise<void> {
  // the boot-site form (the walk57/58 precedent): spawn the dev server
  // if it is not up; kill it at the end (only if WE spawned it).
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${BASE}/login`, 3000)) {
    console.log("[captures-189] reusing the dev server on :3000");
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
    console.log("[captures-189] pair state: ready");

    // the round's ours+ref evidence faces (497-500 + the phone pair)
    const pairJobs: Array<[string, string, (p: Page, s: string) => Promise<void>]> = [
      [BASE, `${OUT}/497-savedviews-open-ours-desktop.png`, captureSavedViewsOpen],
      [REF, `${OUT}/498-savedviews-open-ref-desktop.png`, captureSavedViewsOpen],
      [BASE, `${OUT}/499-calnav-ours-desktop.png`, captureMonthNav],
      [REF, `${OUT}/500-calnav-ref-desktop.png`, captureMonthNav],
      [BASE, `${OUT}/509-savedviews-open-ours-phone.png`, captureSavedViewsOpenPhone],
      [REF, `${OUT}/510-savedviews-open-ref-phone.png`, captureSavedViewsOpenPhone],
    ];
    for (const [origin, shot, fn] of pairJobs) {
      const w = shot.includes("phone") ? 390 : 1440;
      const h = shot.includes("phone") ? 844 : 900;
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
      const page = await ctx.newPage();
      // captureSavedViewsOpen/captureMonthNav read page.url() to pick
      // the base — navigate a dummy route first so the url is right
      await page.goto(`${origin}/leads`, { waitUntil: "domcontentloaded" }).catch(() => undefined);
      await fn(page, shot);
      await ctx.close();
      console.log(`[captures-189] ${shot}`);
    }

    // the standard dev-server page set (501-508, the operator's record)
    const pageJobs: Array<[string, string]> = [
      ["/dashboard", `${OUT}/501-devserver-dashboard.png`],
      ["/leads", `${OUT}/502-devserver-leads.png`],
      ["/calendar", `${OUT}/503-devserver-calendar.png`],
      ["/contacts", `${OUT}/504-devserver-contacts.png`],
      ["/accounts", `${OUT}/505-devserver-accounts.png`],
      ["/activities", `${OUT}/506-devserver-activities.png`],
      ["/reports", `${OUT}/507-devserver-reports.png`],
      ["/settings", `${OUT}/508-devserver-settings.png`],
    ];
    for (const [route, shot] of pageJobs) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      await capturePage(page, BASE, route, shot);
      await ctx.close();
      console.log(`[captures-189] ${shot}`);
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
  console.error("[captures-189]", e);
  process.exit(1);
});
