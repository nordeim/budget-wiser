// Session-189 (walk62): THE LEADS SAVED-VIEWS SELECT OPEN FACES + THE
// CALENDAR MONTH-NAV ARMS INTERIOR WALK — the walk53-61 ledger form over
// the two LIVE arms the discover-189 probe adjudicated (the s398 close's
// named candidates: the Insights dialog KILLED — the reference's
// zero-row state persists; the Saved-Views select + the calendar
// month-nav LIVE on BOTH apps), at BOTH axes:
//
//   Phase A — the Saved-Views select OPEN census at the desktop axis:
//     the pre-save absence census (the reference's own pre-save state
//     — no Saved Views combobox), the save-flow ride (the Filters
//     popover → Save View → the NATIVE prompt answered — the
//     localStorage `neo-crm.leads.views` seam, the browser context
//     discarding it), the mounted select's geometry ledger (the
//     box/bg/border/radius + the placeholder face), the DFS ledger,
//     the OPEN listbox census (the construction classes + the radius
//     + the one-item vocabulary — the probe's own seeded view, the
//     IDENTICAL state on both apps), the apply round-trip.
//   Phase B — the REAL keyboard drives into the select (the
//     walk54/58/60/61 form): the Tab chain to the mounted trigger +
//     the REAL :focus-visible face, the ArrowDown open + the
//     highlight form + the Enter apply round-trip (the walk55
//     highlight form; inert — the default filter set saved).
//   Phase C — the calendar month-nav census: the header-row geometry
//     ledger (the heading + the three outline buttons' boxes + the
//     resting faces), the DFS ledger of the header row, the REAL
//     keyboard Tab drive through the three buttons (the REAL
//     :focus-visible faces — the programmatic face is never the true
//     face), the click round-trip (prev → the heading flip; Today →
//     the today-jump back — local state, NO writes), the month-flip
//     grid re-census (the cell count + the heading).
//   Phase D — the phone axis 390×844: the Saved-Views select at the
//     stacked toolbar (w-full below sm) + the month-nav at phone
//     width (the Today button hidden below sm — the s27 live pin) +
//     the phone REAL-keyboard drive into the nav row.
//
// The DATA-STATE discipline: OURS' leads table carries the seeded rows
// (24 inline status comboboxes pre-save — data, never compared); the
// walk seeds its own one-item view on BOTH apps so the select's item
// vocabulary rides the IDENTICAL state. The calendar day-cells carry
// OURS' seeded events vs the reference's zero-data state — the walk
// compares the CONSTRUCTION (the nav row + the grid rhythm), never the
// chip counts. The aria-label naming (ours the superset) normalizes in
// the chain comparison — the s88-c9 kept genus. The destructive arms
// are NEVER fired (the save is a client-side localStorage write inside
// a discardable browser context; the month flips are local state).
//
// Run: bun scripts/walk62-savedviews-calnav-focus-open.ts
// (reuses the dev server on :3000 — the walk57/58 boot-site form; the
// reference rides the sweep-state storageState pair, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

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
const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";
const OUT_DIR = join(REPO, "scripts", "walk62");

interface Row {
  i: number;
  depth: number;
  tag: string;
  cls: string;
  role: string | null;
  aria: Record<string, string>;
  text: string;
  box: { x: number; y: number; w: number; h: number } | null;
}

/** The computed face — the effective-layer style probe (the walk51-61
 * form: the VISIBLE carriers; the zero-width v4 variable-chain shadow
 * slots never enter the comparison). */
interface Face {
  bg: string;
  color: string;
  border: string;
  boxShadow: string;
  borderRadius: string;
  outline: string;
  fontWeight: string;
}

interface SavedViewsCensus {
  found: boolean;
  preSaveComboCount: number;
  preSaveSavedViewsCombos: number;
  saveFlowOk: boolean;
  select: { face: Face | null; cls: string; box: string; aria: string; text: string } | null;
  ledger: Row[] | null;
  openListbox: { cls: string; bg: string; radius: string; box: string; items: string[]; itemCount: number } | null;
  applyRoundTrip: string;
}

interface RealSelectDrive {
  tabStopIndex: number;
  stops: string[];
  focusOutline: string;
  focusRing: string;
  openByArrow: { cls: string; radius: string; highlightCls: string; highlightText: string; itemCount: number } | null;
  enterApply: string;
}

interface NavCensus {
  found: boolean;
  heading: { text: string; box: string; cls: string } | null;
  buttons: Array<{ text: string; aria: string; face: Face | null; cls: string; box: string }>;
  ledger: Row[] | null;
  flipRoundTrip: string[];
  gridAfterFlip: { cellCount: number; heading: string };
}

interface NavRealTab {
  stops: string[];
  landingIndex: number;
  landingFaces: string[];
}

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

const FACE_JS = `(el => {
  const cs = getComputedStyle(el);
  return {
    bg: cs.backgroundColor, color: cs.color, border: cs.border,
    boxShadow: cs.boxShadow, borderRadius: cs.borderRadius,
    outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor,
    fontWeight: cs.fontWeight,
  };
})`;

/** Phase A/B — the Saved-Views select: the pre-save census, the save
 * flow (the native prompt), the mounted select's ledger, the OPEN
 * listbox, the apply round-trip. */
async function savedViewsPhase(
  browser: import("@playwright/test").Browser,
  base: string,
  state: unknown,
  axis: { w: number; h: number },
): Promise<SavedViewsCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: SavedViewsCensus = {
    found: false,
    preSaveComboCount: -1,
    preSaveSavedViewsCombos: -1,
    saveFlowOk: false,
    select: null,
    ledger: null,
    openListbox: null,
    applyRoundTrip: "",
  };
  try {
    await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);

    // A1 — the pre-save census: the Saved Views combobox must be absent
    const pre = (await page.evaluate(`(() => {
      const combos = Array.from(document.querySelectorAll('main [role="combobox"]'));
      const sv = combos.filter((c) => /saved views/i.test((c.getAttribute("aria-label") ?? "") + " " + (c.textContent ?? "")));
      return { total: combos.length, savedViews: sv.length };
    })()`).catch(() => null)) as { total: number; savedViews: number } | null;
    if (!pre) return result;
    result.found = true;
    result.preSaveComboCount = pre.total;
    result.preSaveSavedViewsCombos = pre.savedViews;

    // A2 — the save flow: Filters → Save View → the native prompt
    const filtersTrigger = page.locator('main button[aria-label="Open lead filters"], main button:has-text("Filters")').first();
    if (!(await filtersTrigger.count())) return result;
    await filtersTrigger.click();
    await page.waitForTimeout(900);
    const saveBtn = page.locator('button:has-text("Save View")').first();
    if (!(await saveBtn.count())) {
      await page.keyboard.press("Escape").catch(() => undefined);
      return result;
    }
    page.once("dialog", (d) => {
      void d.accept("Walk62 View").catch(() => undefined);
    });
    await saveBtn.click();
    await page.waitForTimeout(1400);
    await page.keyboard.press("Escape").catch(() => undefined);
    await page.waitForTimeout(400);

    // A3 — the mounted select's census (locator by the "Walk62 View"
    // item OR the "Saved Views" placeholder — OURS carries 24 seeded
    // row comboboxes, the filter must not touch them)
    const selectLoc = page.locator('main [role="combobox"]').filter({ hasText: /Saved Views|Walk62 View/i }).first();
    if (!(await selectLoc.count())) return result;
    result.saveFlowOk = true;
    const a3 = (await page.evaluate(`(() => {
      const combos = Array.from(document.querySelectorAll('main [role="combobox"]'));
      const el = combos.find((c) => /saved views|walk62 view/i.test((c.getAttribute("aria-label") ?? "") + " " + (c.textContent ?? "")));
      if (!el) return null;
      const rr = el.getBoundingClientRect();
      const ledger = [];
      const collect = (node, depth) => {
        const aria = {};
        for (const attr of Array.from(node.attributes)) {
          if (attr.name.startsWith("aria-") || attr.name === "data-state" || attr.name === "id" || attr.name === "type") aria[attr.name] = attr.value;
        }
        const text = Array.from(node.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join(" ").trim().slice(0, 40);
        const r2 = node.getBoundingClientRect();
        ledger.push({ i: ledger.length, depth, tag: node.tagName.toLowerCase(), cls: (node.getAttribute("class") ?? "").trim(), role: node.getAttribute("role"), aria, text, box: { x: Math.round(r2.x), y: Math.round(r2.y), w: Math.round(r2.width), h: Math.round(r2.height) } });
        for (const child of Array.from(node.children)) collect(child, depth + 1);
      };
      collect(el, 0);
      return {
        face: ${FACE_JS}(el),
        cls: el.getAttribute("class") ?? "",
        box: Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height),
        aria: el.getAttribute("aria-label") ?? "(none)",
        text: (el.textContent ?? "").trim().slice(0, 30),
        ledger,
      };
    })()`).catch(() => null)) as NonNullable<SavedViewsCensus["select"]> & { ledger: Row[] } | null;
    if (!a3) return result;
    result.select = { face: a3.face, cls: a3.cls, box: a3.box, aria: a3.aria, text: a3.text };
    result.ledger = a3.ledger;

    // A4 — the OPEN listbox census
    await selectLoc.click();
    await page.waitForTimeout(800);
    const open = (await page.evaluate(`(() => {
      const lb = document.querySelector('[role="listbox"]');
      if (!lb) return null;
      const cs = getComputedStyle(lb);
      const rr = lb.getBoundingClientRect();
      const items = Array.from(lb.querySelectorAll('[role="option"]'));
      const hl = lb.querySelector('[role="option"][data-highlighted], [role="option"][data-selected]');
      return {
        cls: lb.getAttribute("class") ?? "",
        bg: cs.backgroundColor,
        radius: cs.borderRadius,
        box: Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height),
        items: items.map((o) => (o.textContent ?? "").trim().slice(0, 30)),
        itemCount: items.length,
        highlightCls: hl ? hl.getAttribute("class") ?? "" : "(none)",
        highlightText: hl ? (hl.textContent ?? "").trim().slice(0, 30) : "(none)",
      };
    })()`).catch(() => null)) as NonNullable<SavedViewsCensus["openListbox"]> & { highlightCls: string; highlightText: string } | null;
    if (open) {
      result.openListbox = { cls: open.cls, bg: open.bg, radius: open.radius, box: open.box, items: open.items, itemCount: open.itemCount };
    }
    // A5 — the apply round-trip: Enter on the highlighted item
    await page.keyboard.press("Enter");
    await page.waitForTimeout(900);
    const applied = (await page.evaluate(`(() => {
      const combos = Array.from(document.querySelectorAll('main [role="combobox"]'));
      const el = combos.find((c) => /saved views|walk62 view/i.test((c.getAttribute("aria-label") ?? "") + " " + (c.textContent ?? "")));
      const lb = document.querySelector('[role="listbox"]');
      return { text: el ? (el.textContent ?? "").trim().slice(0, 30) : "(none)", listboxStillOpen: !!lb };
    })()`).catch(() => null)) as { text: string; listboxStillOpen: boolean } | null;
    result.applyRoundTrip = applied
      ? `afterEnter: trigger="${applied.text}" listboxOpen=${applied.listboxStillOpen}`
      : "(probe failed)";
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase B — the REAL keyboard drives into the mounted select: the Tab
 * chain + the ArrowDown open + the highlight + the Enter apply. The
 * programmatic .focus() face is NEVER trusted (the walk54/58/60/61
 * doctrine). */
async function selectRealDrivePhase(
  browser: import("@playwright/test").Browser,
  base: string,
  state: unknown,
  axis: { w: number; h: number },
): Promise<RealSelectDrive> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const stops: string[] = [];
  const out: RealSelectDrive = { tabStopIndex: -1, stops, focusOutline: "", focusRing: "", openByArrow: null, enterApply: "" };
  try {
    await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);
    // seed the view first (the native prompt ride) — NO RELOAD: the
    // reference keeps its view list IN MEMORY ONLY (the s29
    // live-verified contract; ours persists to localStorage — the
    // kept superset), so a reload would kill the REF's select while
    // OURS' re-mounts. The drive runs in the SAME session, from a
    // neutral blur anchor (the page h1 — not focusable).
    const filtersTrigger = page.locator('main button[aria-label="Open lead filters"], main button:has-text("Filters")').first();
    await filtersTrigger.click().catch(() => undefined);
    await page.waitForTimeout(900);
    const saveBtn = page.locator('button:has-text("Save View")').first();
    page.once("dialog", (d) => {
      void d.accept("Walk62 View").catch(() => undefined);
    });
    await saveBtn.click().catch(() => undefined);
    await page.waitForTimeout(1400);
    await page.keyboard.press("Escape").catch(() => undefined);
    await page.waitForTimeout(400);
    // the neutral anchor: click the page title (h1) to blur the Filters
    // trigger so the Tab chain starts from the page top on BOTH apps
    await page.locator("main h1").first().click().catch(() => undefined);
    await page.waitForTimeout(300);

    const describe = (): Promise<string> =>
      page.evaluate(`(() => {
        const ae = document.activeElement;
        if (!ae) return "(none)";
        const cs = getComputedStyle(ae);
        const name = (ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 28) || "(no text)";
        return ae.tagName.toLowerCase() + "[" + name + "] outline=" + cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor + " ring=" + cs.boxShadow.slice(0, 130);
      })()`) as Promise<string>;
    // drive up to 18 REAL Tab presses to reach the select trigger
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(220);
      const s = await describe();
      stops.push(`tab${i + 1}:${s}`);
      if (/saved views|walk62 view/i.test(s)) {
        out.tabStopIndex = i + 1;
        break;
      }
    }
    if (out.tabStopIndex > 0) {
      const face = (await page.evaluate(`(() => {
        const ae = document.activeElement;
        const cs = getComputedStyle(ae);
        return { outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, ring: cs.boxShadow };
      })()`)) as { outline: string; ring: string };
      out.focusOutline = face.outline;
      out.focusRing = face.ring;
      // the ArrowDown open + the highlight
      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(700);
      const open = (await page.evaluate(`(() => {
        const lb = document.querySelector('[role="listbox"]');
        if (!lb) return null;
        const items = Array.from(lb.querySelectorAll('[role="option"]'));
        const hl = lb.querySelector('[role="option"][data-highlighted], [role="option"][data-selected]');
        return {
          cls: lb.getAttribute("class") ?? "",
          radius: getComputedStyle(lb).borderRadius,
          itemCount: items.length,
          highlightCls: hl ? hl.getAttribute("class") ?? "" : "(none)",
          highlightText: hl ? (hl.textContent ?? "").trim().slice(0, 30) : "(none)",
        };
      })()`).catch(() => null)) as NonNullable<RealSelectDrive["openByArrow"]> | null;
      out.openByArrow = open;
      await page.keyboard.press("Enter");
      await page.waitForTimeout(800);
      out.enterApply = await describe();
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return out;
}

/** Phase C — the calendar month-nav census: the header-row geometry +
 * the three buttons' resting faces + the DFS ledger + the click
 * round-trip (local state, NO writes). */
async function navPhase(
  browser: import("@playwright/test").Browser,
  base: string,
  state: unknown,
  axis: { w: number; h: number },
): Promise<NavCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: NavCensus = { found: false, heading: null, buttons: [], ledger: null, flipRoundTrip: [], gridAfterFlip: { cellCount: -1, heading: "" } };
  try {
    await page.goto(`${base}/calendar`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);

    const a1 = (await page.evaluate(`(() => {
      const h2 = document.querySelector("main h2");
      if (!h2) return null;
      const rr = h2.getBoundingClientRect();
      const band = rr.y;
      const card = h2.closest("div")?.parentElement ?? h2.parentElement;
      const pool = Array.from(card?.querySelectorAll("button") ?? []);
      const nav = pool.filter((b) => Math.abs(b.getBoundingClientRect().y - band) < 14);
      const buttons = nav.map((b) => {
        const r2 = b.getBoundingClientRect();
        return {
          text: (b.textContent ?? "").trim() || "(icon)",
          aria: b.getAttribute("aria-label") ?? "(none)",
          face: ${FACE_JS}(b),
          cls: b.getAttribute("class") ?? "",
          box: Math.round(r2.x) + "," + Math.round(r2.y) + " " + Math.round(r2.width) + "x" + Math.round(r2.height),
        };
      });
      const row = nav[0]?.parentElement;
      const ledger = [];
      if (row) {
        const collect = (node, depth) => {
          const aria = {};
          for (const attr of Array.from(node.attributes)) {
            if (attr.name.startsWith("aria-") || attr.name === "data-state" || attr.name === "id" || attr.name === "type") aria[attr.name] = attr.value;
          }
          const text = Array.from(node.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join(" ").trim().slice(0, 40);
          const r3 = node.getBoundingClientRect();
          ledger.push({ i: ledger.length, depth, tag: node.tagName.toLowerCase(), cls: (node.getAttribute("class") ?? "").trim(), role: node.getAttribute("role"), aria, text, box: { x: Math.round(r3.x), y: Math.round(r3.y), w: Math.round(r3.width), h: Math.round(r3.height) } });
          for (const child of Array.from(node.children)) collect(child, depth + 1);
        };
        collect(row, 0);
      }
      return {
        heading: { text: (h2.textContent ?? "").trim(), box: Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height), cls: h2.getAttribute("class") ?? "" },
        buttons,
        ledger,
      };
    })()`).catch(() => null)) as { heading: NonNullable<NavCensus["heading"]>; buttons: NavCensus["buttons"]; ledger: Row[] } | null;
    if (!a1) return result;
    result.found = true;
    result.heading = a1.heading;
    result.buttons = a1.buttons;
    result.ledger = a1.ledger;

    // the click round-trip: prev (the flip) → Today (the today-jump back)
    const prevLoc = page.locator('main button[aria-label="Previous month"]').first();
    const prevFallback = page
      .locator("main h2")
      .locator("xpath=following-sibling::div//button | ../following-sibling::div//button")
      .first();
    const prev = (await prevLoc.count()) ? prevLoc : prevFallback;
    const headingText = (): Promise<string> =>
      page.evaluate(`(() => (document.querySelector("main h2")?.textContent ?? "").trim())()`) as Promise<string>;
    if (await prev.count()) {
      await prev.click();
      await page.waitForTimeout(900);
      const afterPrev = await headingText();
      result.flipRoundTrip.push(`prev-> "${afterPrev}"`);
      // the Today click only rides the VISIBLE button — at the phone
      // axis the Today button is hidden below sm (the s27 live pin),
      // so the click is visibility-guarded (the phone flip is the
      // prev-only round-trip).
      const todayLoc = page.locator('main button:has-text("Today")').first();
      if ((await todayLoc.count()) && (await todayLoc.isVisible().catch(() => false))) {
        await todayLoc.click();
        await page.waitForTimeout(900);
        const afterToday = await headingText();
        result.flipRoundTrip.push(`today-> "${afterToday}"`);
      } else {
        result.flipRoundTrip.push("today-> (hidden below sm — the phone-axis kill)");
      }
      const grid = (await page.evaluate(`(() => {
        const h2 = document.querySelector("main h2");
        const card = h2?.closest("div")?.parentElement;
        const cells = card ? Array.from(card.querySelectorAll("button")).filter((b) => {
          const r = b.getBoundingClientRect();
          return r.height >= 60 && r.width >= 60;
        }) : [];
        return { cellCount: cells.length, heading: (h2?.textContent ?? "").trim() };
      })()`).catch(() => null)) as NavCensus["gridAfterFlip"] | null;
      if (grid) result.gridAfterFlip = grid;
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase C2 — the REAL keyboard Tab drive through the three nav buttons
 * (the REAL :focus-visible faces, the walk54/58/60/61 doctrine). */
async function navRealTabPhase(
  browser: import("@playwright/test").Browser,
  base: string,
  state: unknown,
  axis: { w: number; h: number },
): Promise<NavRealTab> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const stops: string[] = [];
  const out: NavRealTab = { stops, landingIndex: -1, landingFaces: [] };
  try {
    await page.goto(`${base}/calendar`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);
    const describe = (): Promise<string> =>
      page.evaluate(`(() => {
        const ae = document.activeElement;
        if (!ae) return "(none)";
        const cs = getComputedStyle(ae);
        const r = ae.getBoundingClientRect();
        const name = (ae.getAttribute("aria-label") ?? ae.textContent ?? "").trim().slice(0, 28) || "(no text)";
        return ae.tagName.toLowerCase() + "[" + name + "]@" + Math.round(r.x) + "," + Math.round(r.y) + " " + Math.round(r.width) + "x" + Math.round(r.height) + " outline=" + cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor + " ring=" + cs.boxShadow.slice(0, 130);
      })()`) as Promise<string>;
    const inHeaderRow = (): Promise<boolean> =>
      page.evaluate(`(() => {
        const ae = document.activeElement;
        const h2 = document.querySelector("main h2");
        if (!ae || !h2 || ae.tagName !== "BUTTON") return false;
        return Math.abs(ae.getBoundingClientRect().y - h2.getBoundingClientRect().y) < 14;
      })()`) as Promise<boolean>;
    // drive up to 18 REAL Tab presses to reach the nav row
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(220);
      const s = await describe();
      stops.push(`tab${i + 1}:${s}`);
      if (await inHeaderRow()) {
        out.landingIndex = i + 1;
        break;
      }
    }
    if (out.landingIndex > 0) {
      // census the three buttons' REAL :focus-visible faces in sequence
      for (let k = 0; k < 3; k++) {
        if (k > 0) {
          await page.keyboard.press("Tab");
          await page.waitForTimeout(220);
        }
        const inRow = await inHeaderRow();
        const face = await describe();
        out.landingFaces.push(`stop${k + 1}${inRow ? "" : "(left the row)"}: ${face}`);
        if (!inRow) break;
      }
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return out;
}

function faceDelta(name: string, a: Face | null | undefined, b: Face | null | undefined): string[] {
  const out: string[] = [];
  if (!a || !b) {
    if (a || b) out.push(`${name}: presence OURS=${!!a} REF=${!!b}`);
    return out;
  }
  for (const k of Object.keys(a) as Array<keyof Face>) {
    if (a[k] !== b[k]) out.push(`${name}.${k}: OURS "${String(a[k]).slice(0, 200)}" | REF "${String(b[k]).slice(0, 200)}"`);
  }
  return out;
}

/** The token/aria/class normalization for the structural diffs (the
 * s88-c9 aria superset + the M-81c2 token pair + the lucide size-order
 * genera — normalized, never compared raw). */
function normCls(cls: string): string {
  return cls
    .replace(/\bborder-line\b/g, "border-TOKEN")
    .replace(/\bborder-input\b/g, "border-TOKEN")
    .replace(/\btext-ink\b/g, "text-TOKEN")
    .replace(/\btext-foreground\b/g, "text-TOKEN")
    .replace(/\bbg-surface\b/g, "bg-POPTOKEN")
    .replace(/\bbg-popover\b/g, "bg-POPTOKEN")
    .replace(/\btext-muted-ink\b/g, "text-TRACKTOKEN")
    .replace(/\btext-muted-foreground\b/g, "text-TRACKTOKEN")
    .replace(/\bring-offset-background\b/g, "")
    .replace(/\b(h-4 w-4|w-4 h-4)\b/g, "SIZE4")
    .replace(/\s+/g, " ")
    .trim();
}

function diffRows(name: string, ours: Row[] | null, ref: Row[] | null): string[] {
  const out: string[] = [];
  if (!ours || !ref) {
    out.push(`${name}: presence OURS=${!!ours} REF=${!!ref}`);
    return out;
  }
  const norm = (r: Row) => ({ ...r, cls: normCls(r.cls) });
  const o = ours.map(norm);
  const r = ref.map(norm);
  const max = Math.max(o.length, r.length);
  let structural = 0;
  for (let i = 0; i < max; i++) {
    const a = o[i];
    const b = r[i];
    if (!a || !b) { out.push(`${name}[${i}]: presence OURS=${!!a} REF=${!!b}`); structural++; continue; }
    if (a.depth !== b.depth || a.tag !== b.tag || a.cls !== b.cls) {
      out.push(`${name}[${i}] d${a.depth}/${b.depth} <${a.tag}>/<${b.tag}>: cls OURS "${a.cls.slice(0, 90)}" | REF "${b.cls.slice(0, 90)}"`);
      structural++;
    }
    const ja = JSON.stringify(a.aria, Object.keys(a.aria).sort());
    const jb = JSON.stringify(b.aria, Object.keys(b.aria).sort());
    if (ja !== jb) out.push(`${name}[${i}] <${a.tag}> aria: OURS ${ja} | REF ${jb}`);
  }
  if (!structural) out.push(`${name}: rows STRUCTURALLY IDENTICAL (${o.length} rows) modulo the aria/data naming`);
  return out;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk62] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[walk62] pair state: ready (the s162 guarded form)");
    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    // ===== Phase A — the Saved-Views select census at BOTH axes =====
    const oursSv = await savedViewsPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refSv = await savedViewsPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    const oursSvp = await savedViewsPhase(browser, OUR_URL, state, { w: 390, h: 844 });
    const refSvp = await savedViewsPhase(browser, REF_URL, state, { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-savedviews-desktop.json"), JSON.stringify(oursSv, null, 2));
    writeFileSync(join(OUT_DIR, "ref-savedviews-desktop.json"), JSON.stringify(refSv, null, 2));
    writeFileSync(join(OUT_DIR, "ours-savedviews-phone.json"), JSON.stringify(oursSvp, null, 2));
    writeFileSync(join(OUT_DIR, "ref-savedviews-phone.json"), JSON.stringify(refSvp, null, 2));

    report.push("\n===== SAVED-VIEWS SELECT @1440x900 =====");
    report.push(`found: OURS ${oursSv.found} | REF ${refSv.found}`);
    report.push(`preSaveCombos: OURS ${oursSv.preSaveComboCount} (savedViews ${oursSv.preSaveSavedViewsCombos}) | REF ${refSv.preSaveComboCount} (savedViews ${refSv.preSaveSavedViewsCombos}) — the DATA-STATE genus: OURS' 24 inline row selects at the seeded db`);
    report.push(`saveFlow: OURS ${oursSv.saveFlowOk} | REF ${refSv.saveFlowOk}`);
    if (oursSv.select && refSv.select) {
      report.push(`select.box: OURS ${oursSv.select.box} | REF ${refSv.select.box}`);
      report.push(`select.aria: OURS "${oursSv.select.aria}" | REF "${refSv.select.aria}" (the s88-c9 superset genus, kept)`);
      report.push(`select.text: OURS "${oursSv.select.text}" | REF "${refSv.select.text}"`);
      report.push(`select.cls: OURS "${oursSv.select.cls}"`);
      report.push(`             REF  "${refSv.select.cls}"`);
      report.push(...faceDelta("select.face", oursSv.select.face, refSv.select.face));
    }
    if (oursSv.openListbox && refSv.openListbox) {
      report.push(`open.box: OURS ${oursSv.openListbox.box} | REF ${refSv.openListbox.box}`);
      report.push(`open.items: OURS (${oursSv.openListbox.itemCount}) [${oursSv.openListbox.items.join(" | ")}] | REF (${refSv.openListbox.itemCount}) [${refSv.openListbox.items.join(" | ")}]`);
      report.push(`open.cls: OURS "${oursSv.openListbox.cls}"`);
      report.push(`          REF  "${refSv.openListbox.cls}"`);
    }
    report.push(`applyRoundTrip: OURS ${oursSv.applyRoundTrip}`);
    report.push(`                REF  ${refSv.applyRoundTrip}`);
    report.push(...diffRows("selectLedger", oursSv.ledger, refSv.ledger));

    report.push("\n===== SAVED-VIEWS SELECT @390x844 =====");
    report.push(`found: OURS ${oursSvp.found} | REF ${refSvp.found}`);
    if (oursSvp.select && refSvp.select) {
      report.push(`phone select.box: OURS ${oursSvp.select.box} | REF ${refSvp.select.box}`);
      report.push(...faceDelta("phone select.face", oursSvp.select.face, refSvp.select.face));
    }

    // ===== Phase B — the REAL keyboard drives into the select =====
    const oursRd = await selectRealDrivePhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refRd = await selectRealDrivePhase(browser, REF_URL, state, { w: 1440, h: 900 });
    writeFileSync(join(OUT_DIR, "ours-realdrive.json"), JSON.stringify(oursRd, null, 2));
    writeFileSync(join(OUT_DIR, "ref-realdrive.json"), JSON.stringify(refRd, null, 2));
    report.push("\n===== SAVED-VIEWS REAL-TAB CHAIN @1440x900 =====");
    report.push(`OURS tabStopIndex=${oursRd.tabStopIndex} | REF ${refRd.tabStopIndex}`);
    // The s88-c9 naming genus normalized: OURS' controls carry the
    // aria-labels the reference lacks (the topbar search's
    // "Search accounts, contacts and leads" superset; the toolbar
    // labels), so the CHAIN equality rides the tag sequence only —
    // the names report separately (the kept superset).
    const tagOf = (s: string) => s.split(":")[1]?.split("[")[0] ?? s;
    const oursTags = oursRd.stops.map(tagOf);
    const refTags = refRd.stops.map(tagOf);
    if (JSON.stringify(oursTags) !== JSON.stringify(refTags)) {
      report.push(`CHAIN DELTA: OURS [${oursTags.join(" → ")}]`);
      report.push(`            REF  [${refTags.join(" → ")}]`);
    } else {
      report.push(`CHAIN: STRUCTURALLY IDENTICAL (${oursTags.length} stops — the tag sequence byte-equal; the ring/outline-form + s88-c9 naming genera normalized)`);
    }
    report.push(`OURS chain: [${oursRd.stops.map((s) => s.split(" outline=")[0]).join(" → ")}]`);
    report.push(`REF  chain: [${refRd.stops.map((s) => s.split(" outline=")[0]).join(" → ")}]`);
    report.push(`REAL FOCUS-VISIBLE on the select: OURS outline="${oursRd.focusOutline}"`);
    report.push(`                             REF  outline="${refRd.focusOutline}"`);
    report.push(`REAL FOCUS-VISIBLE ring: OURS "${oursRd.focusRing.slice(0, 200)}"`);
    report.push(`                        REF  "${refRd.focusRing.slice(0, 200)}"`);
    report.push(`ArrowDown OPEN: OURS ${oursRd.openByArrow ? `cls="${oursRd.openByArrow.cls.slice(0, 100)}" radius=${oursRd.openByArrow.radius} items=${oursRd.openByArrow.itemCount} highlight="${oursRd.openByArrow.highlightText}"` : "(no listbox)"}`);
    report.push(`                 REF  ${refRd.openByArrow ? `cls="${refRd.openByArrow.cls.slice(0, 100)}" radius=${refRd.openByArrow.radius} items=${refRd.openByArrow.itemCount} highlight="${refRd.openByArrow.highlightText}"` : "(no listbox)"}`);
    report.push(`Enter apply: OURS ${oursRd.enterApply}`);
    report.push(`             REF  ${refRd.enterApply}`);

    // ===== Phase C — the calendar month-nav census at BOTH axes =====
    const oursNav = await navPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refNav = await navPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    const oursNavp = await navPhase(browser, OUR_URL, state, { w: 390, h: 844 });
    const refNavp = await navPhase(browser, REF_URL, state, { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-nav-desktop.json"), JSON.stringify(oursNav, null, 2));
    writeFileSync(join(OUT_DIR, "ref-nav-desktop.json"), JSON.stringify(refNav, null, 2));
    writeFileSync(join(OUT_DIR, "ours-nav-phone.json"), JSON.stringify(oursNavp, null, 2));
    writeFileSync(join(OUT_DIR, "ref-nav-phone.json"), JSON.stringify(refNavp, null, 2));

    report.push("\n===== CALENDAR MONTH-NAV @1440x900 =====");
    report.push(`found: OURS ${oursNav.found} | REF ${refNav.found}`);
    if (oursNav.heading && refNav.heading) {
      report.push(`heading.text: OURS "${oursNav.heading.text}" | REF "${refNav.heading.text}"`);
      report.push(`heading.box: OURS ${oursNav.heading.box} | REF ${refNav.heading.box}`);
      report.push(`heading.cls: OURS "${oursNav.heading.cls}" | REF "${refNav.heading.cls}"`);
    }
    for (let i = 0; i < Math.max(oursNav.buttons.length, refNav.buttons.length); i++) {
      const a = oursNav.buttons[i];
      const b = refNav.buttons[i];
      if (!a || !b) { report.push(`navButton[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`navButton[${i}] "${a.text}": box OURS ${a.box} | REF ${b.box}`);
      report.push(`  aria: OURS "${a.aria}" | REF "${b.aria}" (the s88-c9 superset genus, kept)`);
      report.push(`  cls: OURS "${a.cls}"`);
      report.push(`       REF  "${b.cls}"`);
      report.push(...faceDelta(`navButton[${i}].face`, a.face, b.face).map((l) => `  ${l}`));
    }
    report.push(`flipRoundTrip: OURS [${oursNav.flipRoundTrip.join(" ; ")}]`);
    report.push(`                REF  [${refNav.flipRoundTrip.join(" ; ")}]`);
    report.push(`gridAfterFlip: OURS ${oursNav.gridAfterFlip.cellCount} cells @ "${oursNav.gridAfterFlip.heading}" | REF ${refNav.gridAfterFlip.cellCount} cells @ "${refNav.gridAfterFlip.heading}" (the buttons-only census rides OURS' day-cell superset — the s27-pinned clickable cells; the reference's zero-data grid kills the buttons-only filter — the DATA-STATE genus, never a defect claim)`);
    report.push(...diffRows("navLedger", oursNav.ledger, refNav.ledger));

    report.push("\n===== CALENDAR MONTH-NAV @390x844 =====");
    report.push(`found: OURS ${oursNavp.found} | REF ${refNavp.found}`);
    if (oursNavp.heading && refNavp.heading) {
      report.push(`phone heading: OURS "${oursNavp.heading.text}" ${oursNavp.heading.box} | REF "${refNavp.heading.text}" ${refNavp.heading.box}`);
    }
    report.push(`phone navButtons: OURS ${oursNavp.buttons.length} [${oursNavp.buttons.map((b) => `"${b.text}"@${b.box}`).join(" ")}]`);
    report.push(`                   REF  ${refNavp.buttons.length} [${refNavp.buttons.map((b) => `"${b.text}"@${b.box}`).join(" ")}] (the Today button hidden below sm — the s27 live pin)`);
    for (let i = 0; i < Math.max(oursNavp.buttons.length, refNavp.buttons.length); i++) {
      const a = oursNavp.buttons[i];
      const b = refNavp.buttons[i];
      if (!a || !b) continue;
      report.push(...faceDelta(`phoneNav[${i}].face`, a.face, b.face));
    }

    // ===== Phase C2 — the REAL keyboard Tab drives through the nav row =====
    const oursRt = await navRealTabPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refRt = await navRealTabPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    writeFileSync(join(OUT_DIR, "ours-nav-realtab.json"), JSON.stringify(oursRt, null, 2));
    writeFileSync(join(OUT_DIR, "ref-nav-realtab.json"), JSON.stringify(refRt, null, 2));
    report.push("\n===== CALENDAR NAV REAL-TAB CHAIN @1440x900 =====");
    report.push(`OURS landingIndex=${oursRt.landingIndex} | REF ${refRt.landingIndex}`);
    // The s88-c9 naming genus normalized (the tag+geometry sequence is
    // the STRUCTURE; the names — ours the aria-label superset — report
    // separately in the landing faces below).
    const navTagOf = (s: string) => {
      const t = s.split(":")[1] ?? s;
      return t.split("[")[0] + "@" + (t.match(/@\d+,\d+ \d+x\d+/)?.[0] ?? "");
    };
    const oursNavTags = oursRt.stops.map(navTagOf);
    const refNavTags = refRt.stops.map(navTagOf);
    if (JSON.stringify(oursNavTags) !== JSON.stringify(refNavTags)) {
      report.push(`CHAIN DELTA: OURS [${oursNavTags.join(" → ")}]`);
      report.push(`            REF  [${refNavTags.join(" → ")}]`);
    } else {
      report.push(`CHAIN: STRUCTURALLY IDENTICAL (${oursNavTags.length} stops — the tag+geometry sequence byte-equal; the s88-c9 naming genus normalized)`);
    }
    for (let i = 0; i < Math.max(oursRt.landingFaces.length, refRt.landingFaces.length); i++) {
      const a = oursRt.landingFaces[i] ?? "(none)";
      const b = refRt.landingFaces[i] ?? "(none)";
      report.push(`landing[${i + 1}] OURS ${a}`);
      report.push(`            REF  ${b}`);
    }

    writeFileSync(join(OUT_DIR, "delta-report.txt"), report.join("\n"));
    console.log(report.join("\n"));
    console.log("\n[walk62] the ledgers + the delta report -> scripts/walk62/");
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
  console.error("[walk62]", e);
  process.exit(1);
});
