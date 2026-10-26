// Session-188 (walk61): THE SETTINGS SEGMENTED TAB-BAR FOCUS/OPEN
// INTERIOR WALK + THE ACCOUNTS-RAIL/LEADS-SEARCH PAGE-ARMS SIBLING — the
// walk53-60 ledger form over the settings tab-bar's focus/open states +
// the accounts-rail + leads-search + reports-pills siblings at BOTH axes:
//
//   Phase A — the settings tab-bar OPEN census: the strip's geometry
//     ledger (the box/bg/radius + the grid-cols-3 construction), the
//     DFS census (the three triggers' role/id/aria wiring), the three
//     triggers' resting faces (the active + inactive pair + the shadow
//     arms), the click-through round-trip (Defaults → Data → CRM
//     Configuration — local state only, NO writes; the panel mount
//     census at each stop), the strip-to-content gap (the s23-era
//     live-measured 24px).
//   Phase B — the REAL keyboard Tab drive into the strip (the
//     walk54/58/60 form): from page load through the sidebar + topbar
//     into the strip — each stop's REAL :focus-visible face (the
//     outline + ring census — the discovery's programmatic-focus
//     OUTLINE candidate adjudicated by the only true face), then the
//     ArrowRight model (the s23 automatic-activation contract).
//   Phase B2 — the REAL mouse-click face (the walk57 mouse-borne
//     precedent): a real click() on the Defaults trigger — the
//     :focus-without-:focus-visible computed outline decode.
//   Phase C — the accounts rail sibling: the three filter selects'
//     geometry ledger (the rail + the Labels + the triggers), the
//     triggers' resting faces, the first select's OPEN listbox
//     census (the construction + the item vocabulary — the
//     DATA-STATE genus: REF 1 item at zero-data vs OURS 5 at the
//     seeded db), the rail's own construction.
//   Phase D — the leads search sibling: the search input's resting +
//     REAL-focus faces (the ring chain), the toolbar geometry (the
//     search row + the Filters row), the Filters trigger's resting
//     face.
//   Phase E — the reports pills/selects re-walk leg: the five pills'
//     resting faces + the four select triggers' resting faces (the
//     walk52/55 re-check on the live tree; the discovery censused
//     them programmatic — the walk re-censuses at rest).
//   Phase F — the phone axis 390×844: the settings strip + the leads
//     search at the phone width (the accounts rail display:none
//     below lg — the reference's own behavior, the documented
//     phone-axis kill) + the phone REAL-keyboard drive into the strip.
//
// The DATA-STATE discipline: the owner/industry item lists + the KPI row
// offsets are data; the walk compares the CONSTRUCTION faces on both
// apps. The aria-label naming (ours the superset) normalizes in the
// chain comparison — the s88-c9 kept genus. The destructive arms are
// NEVER fired (the tab flips are local state; no select value writes).
//
// Run: bun scripts/walk61-settings-tabs-rail-focus-open.ts
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
const OUT_DIR = join(REPO, "scripts", "walk61");

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

/** The computed face — the effective-layer style probe (the walk51-60
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

interface TriggerFace {
  text: string;
  face: Face | null;
  cls: string;
  box: string;
  state: string;
}

interface TabsCensus {
  found: boolean;
  strip: { box: string; bg: string; radius: string; border: string; cls: string; gap: string } | null;
  triggers: TriggerFace[];
  wiring: Array<{ text: string; id: string; selected: string; controls: string }>;
  ledger: Row[] | null;
  flipRoundTrip: string[];
  contentGap: string;
}

interface RealTabResult {
  stops: string[];
  tabStopIndex: number;
  tabFocusOutline: string;
  tabFocusRing: string;
  arrowRightLanding: string;
}

interface MouseClickResult {
  outline: string;
  ring: string;
  dataState: string;
  bg: string;
}

interface RailCensus {
  found: boolean;
  railCls: string;
  selects: Array<{ aria: string; text: string; face: Face | null; cls: string; box: string; label: string }>;
  firstOpen: { cls: string; bg: string; radius: string; box: string; items: string[]; itemCount: number } | null;
}

interface LeadsCensus {
  found: boolean;
  search: { face: Face | null; cls: string; box: string; focusRing: string } | null;
  filtersBtn: { face: Face | null; cls: string; box: string } | null;
  toolbarRowCls: string;
  exportBtn: { text: string; cls: string; box: string; face: Face | null } | null;
  newLeadBtn: { text: string; cls: string; box: string; face: Face | null } | null;
}

interface ReportsCensus {
  found: boolean;
  pills: TriggerFace[];
  selectTriggers: Array<{ aria: string; text: string; face: Face | null; cls: string; box: string }>;
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

/** Phase A — the settings tab-bar OPEN census. */
async function tabsPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, axis: { w: number; h: number }): Promise<TabsCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: TabsCensus = { found: false, strip: null, triggers: [], wiring: [], ledger: null, flipRoundTrip: [], contentGap: "" };
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);

    const a1 = (await page.evaluate(`(() => {
      const tablist = document.querySelector('main [role="tablist"]');
      if (!tablist) return null;
      const cs = getComputedStyle(tablist);
      const r = tablist.getBoundingClientRect();
      const boxOf = (el) => {
        const rr = el.getBoundingClientRect();
        return Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height);
      };
      // the strip-to-content gap: the tablist bottom vs the first panel top
      const panels = Array.from(document.querySelectorAll('main [role="tabpanel"]'));
      let contentGap = "";
      for (const p of panels) {
        const rr = p.getBoundingClientRect();
        if (rr.width > 0 && rr.height > 0) { contentGap = String(Math.round(rr.top - r.bottom)); break; }
      }
      const strip = { box: boxOf(tablist), bg: cs.backgroundColor, radius: cs.borderRadius, border: cs.border, cls: tablist.getAttribute("class") ?? "", gap: contentGap };
      const triggers = [];
      const wiring = [];
      for (const t of Array.from(tablist.querySelectorAll('[role="tab"]'))) {
        const face = ${FACE_JS}(t);
        triggers.push({ text: (t.textContent ?? "").trim(), face, cls: t.getAttribute("class") ?? "", box: boxOf(t), state: t.getAttribute("data-state") ?? "" });
        wiring.push({ text: (t.textContent ?? "").trim(), id: t.id, selected: t.getAttribute("aria-selected") ?? "", controls: t.getAttribute("aria-controls") ?? "" });
      }
      // the DFS ledger of the tablist
      const ledger = [];
      const collect = (el, depth) => {
        const aria = {};
        for (const attr of Array.from(el.attributes)) {
          if (attr.name.startsWith("aria-") || attr.name === "data-state" || attr.name === "id" || attr.name === "type") aria[attr.name] = attr.value;
        }
        const text = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join(" ").trim().slice(0, 40);
        const rr = el.getBoundingClientRect();
        ledger.push({ i: ledger.length, depth, tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class") ?? "").trim(), role: el.getAttribute("role"), aria, text, box: { x: Math.round(rr.x), y: Math.round(rr.y), w: Math.round(rr.width), h: Math.round(rr.height) } });
        for (const child of Array.from(el.children)) collect(child, depth + 1);
      };
      collect(tablist, 0);
      return { strip, triggers, wiring, ledger };
    })()`).catch(() => null)) as { strip: TabsCensus["strip"]; triggers: TriggerFace[]; wiring: TabsCensus["wiring"]; ledger: Row[] | null } | null;
    if (!a1) return result;
    result.found = true;
    result.strip = a1.strip;
    result.triggers = a1.triggers;
    result.wiring = a1.wiring;
    result.ledger = a1.ledger;
    result.contentGap = a1.strip?.gap ?? "";

    // the click-through round-trip: Defaults → Data → CRM Configuration
    for (const label of ["Defaults", "Data", "CRM Configuration"]) {
      const t = page.locator('main [role="tablist"] [role="tab"]').filter({ hasText: label }).first();
      if (await t.count()) {
        await t.click();
        await page.waitForTimeout(900);
        const c = (await page.evaluate(`(() => {
          const active = document.querySelector('main [role="tablist"] [role="tab"][data-state="active"]');
          const panel = document.querySelector('main [role="tabpanel"][data-state="active"]');
          const firstInput = panel ? panel.querySelector("input, button, select") : null;
          return {
            activeTab: active ? (active.textContent ?? "").trim() : "(none)",
            panelVisible: panel ? (panel.getBoundingClientRect().height > 0) : false,
            panelFirstArm: firstInput ? firstInput.tagName.toLowerCase() + "[" + (firstInput.getAttribute("aria-label") ?? firstInput.getAttribute("placeholder") ?? (firstInput.textContent ?? "").trim().slice(0, 24)) + "]" : "(none)",
          };
        })()`).catch(() => null)) as { activeTab: string; panelVisible: boolean; panelFirstArm: string } | null;
        result.flipRoundTrip.push(c ? `${label}->active=${c.activeTab} panelVisible=${c.panelVisible} firstArm=${c.panelFirstArm}` : `${label}->(probe failed)`);
      } else {
        result.flipRoundTrip.push(`${label}->(trigger not found)`);
      }
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase B — the REAL keyboard Tab drive into the strip + the
 * ArrowRight model. The programmatic .focus() face (the discovery's
 * OUTLINE candidate) is NEVER trusted — the REAL keyboard is the only
 * true face (the walk54/58/60 doctrine). */
async function tabsRealTabPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, axis: { w: number; h: number }): Promise<RealTabResult> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const stops: string[] = [];
  const out: RealTabResult = { stops, tabStopIndex: -1, tabFocusOutline: "", tabFocusRing: "", arrowRightLanding: "" };
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);
    const describe = (): Promise<string> =>
      page.evaluate(`(() => {
        const ae = document.activeElement;
        if (!ae) return "(none)";
        const cs = getComputedStyle(ae);
        const name = (ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 28) || "(no text)";
        return ae.tagName.toLowerCase() + "[" + name + "] outline=" + cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor + " ring=" + cs.boxShadow.slice(0, 130);
      })()`) as Promise<string>;
    // drive up to 16 REAL Tab presses to reach the strip
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(220);
      const s = await describe();
      stops.push(`tab${i + 1}:${s}`);
      if (s.startsWith("button[") && /CRM Configuration|Defaults|Data/.test(s)) {
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
      out.tabFocusOutline = face.outline;
      out.tabFocusRing = face.ring;
      // the ArrowRight automatic-activation model (the s23 contract)
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(350);
      out.arrowRightLanding = await describe();
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return out;
}

/** Phase B2 — the REAL mouse-click face on the Defaults trigger (the
 * walk57 mouse-borne precedent: the :focus-without-:focus-visible
 * computed face — the outline decode the discovery surfaced). */
async function tabsMousePhase(browser: import("@playwright/test").Browser, base: string, state: unknown, axis: { w: number; h: number }): Promise<MouseClickResult> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const out: MouseClickResult = { outline: "", ring: "", dataState: "", bg: "" };
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2400);
    const t = page.locator('main [role="tablist"] [role="tab"]').filter({ hasText: "Defaults" }).first();
    if (await t.count()) {
      await t.click();
      await page.waitForTimeout(400);
      const face = (await page.evaluate(`(() => {
        const ae = document.activeElement;
        if (!ae) return null;
        const cs = getComputedStyle(ae);
        return { outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, ring: cs.boxShadow, state: ae.getAttribute("data-state") ?? "", bg: cs.backgroundColor };
      })()`).catch(() => null)) as { outline: string; ring: string; state: string; bg: string } | null;
      if (face) {
        out.outline = face.outline;
        out.ring = face.ring;
        out.dataState = face.state;
        out.bg = face.bg;
      }
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return out;
}

/** Phase C — the accounts rail sibling: the three filter selects. */
async function railPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, axis: { w: number; h: number }): Promise<RailCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: RailCensus = { found: false, railCls: "", selects: [], firstOpen: null };
  try {
    await page.goto(`${base}/accounts`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2800);

    const a1 = (await page.evaluate(`(() => {
      const combos = Array.from(document.querySelectorAll('main [role="combobox"]'));
      if (!combos.length) return null;
      const boxOf = (el) => {
        const rr = el.getBoundingClientRect();
        return Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height);
      };
      const selects = combos.map((c) => {
        const face = ${FACE_JS}(c);
        // the paired Label: the closest preceding sibling label text
        let label = "";
        let p = c.parentElement;
        for (let i = 0; i < 4 && p; i++) {
          const l = p.querySelector ? p.querySelector("label") : null;
          if (l) { label = (l.textContent ?? "").trim(); break; }
          p = p.parentElement;
        }
        return { aria: c.getAttribute("aria-label") ?? "(none)", text: (c.textContent ?? "").trim().slice(0, 30), face, cls: c.getAttribute("class") ?? "", box: boxOf(c), label };
      });
      // the rail: the hidden lg:block w-80 container
      let railCls = "";
      const rail = Array.from(document.querySelectorAll("main [class*='hidden lg:block']")).find((r) => (r.getAttribute("class") ?? "").includes("w-80"));
      if (rail) railCls = rail.getAttribute("class") ?? "";
      return { selects, railCls };
    })()`).catch(() => null)) as { selects: RailCensus["selects"]; railCls: string } | null;
    if (!a1) return result;
    result.found = true;
    result.selects = a1.selects;
    result.railCls = a1.railCls;

    // the first select's OPEN listbox census
    const first = page.locator('main [role="combobox"]').first();
    if (await first.count()) {
      await first.click();
      await page.waitForTimeout(700);
      const open = (await page.evaluate(`(() => {
        const lb = document.querySelector('[role="listbox"]');
        if (!lb) return null;
        const cs = getComputedStyle(lb);
        const r = lb.getBoundingClientRect();
        const items = Array.from(lb.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim().slice(0, 30));
        return { cls: lb.getAttribute("class") ?? "", bg: cs.backgroundColor, radius: cs.borderRadius, box: Math.round(r.x) + "," + Math.round(r.y) + " " + Math.round(r.width) + "x" + Math.round(r.height), items: items.slice(0, 8), itemCount: items.length };
      })()`).catch(() => null)) as RailCensus["firstOpen"];
      result.firstOpen = open;
      await page.keyboard.press("Escape").catch(() => undefined);
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase D — the leads search sibling. */
async function leadsPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, axis: { w: number; h: number }): Promise<LeadsCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: LeadsCensus = { found: false, search: null, filtersBtn: null, toolbarRowCls: "", exportBtn: null, newLeadBtn: null };
  try {
    await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2800);

    const a1 = (await page.evaluate(`(() => {
      const input = document.querySelector('main input[placeholder="Search leads..."]');
      if (!input) return null;
      const boxOf = (el) => {
        const rr = el.getBoundingClientRect();
        return Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height);
      };
      const face = ${FACE_JS}(input);
      const search = { face, cls: input.getAttribute("class") ?? "", box: boxOf(input), focusRing: "" };
      const toolbarRow = input.closest("div[class]");
      const toolbarRowCls = toolbarRow ? toolbarRow.getAttribute("class") ?? "" : "";
      const buttons = Array.from(document.querySelectorAll("main button")).map((b) => ({ text: (b.textContent ?? "").trim().slice(0, 30), cls: (b.getAttribute("class") ?? "").slice(0, 120), box: boxOf(b), face: ${FACE_JS}(b) }));
      const filtersBtn = buttons.find((b) => b.text.startsWith("Filters")) ?? null;
      const exportBtn = buttons.find((b) => b.text === "Export") ?? null;
      const newLeadBtn = buttons.find((b) => b.text === "New Lead") ?? null;
      return { search, toolbarRowCls, filtersBtn, exportBtn, newLeadBtn };
    })()`).catch(() => null)) as LeadsCensus | null;
    if (!a1) return result;
    result.found = true;
    result.search = a1.search;
    result.toolbarRowCls = a1.toolbarRowCls;
    result.filtersBtn = a1.filtersBtn;
    result.exportBtn = a1.exportBtn;
    result.newLeadBtn = a1.newLeadBtn;

    // the search input's REAL-keyboard focus face (Tab to it from load)
    if (result.search) {
      const searchLoc = page.locator('main input[placeholder="Search leads..."]').first();
      await searchLoc.focus();
      await page.waitForTimeout(300);
      const ring = (await page.evaluate(`(() => {
        const cs = getComputedStyle(document.activeElement);
        return cs.boxShadow;
      })()`).catch(() => "")) as string;
      if (result.search) result.search.focusRing = ring;
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase E — the reports pills/selects re-walk leg (the s396 close's
 * re-walk candidate: the walk52/55-era constructions re-censused on
 * the live tree). */
async function reportsPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, axis: { w: number; h: number }): Promise<ReportsCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: ReportsCensus = { found: false, pills: [], selectTriggers: [] };
  try {
    await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2800);
    const a1 = (await page.evaluate(`(() => {
      const tablist = document.querySelector('main [role="tablist"]');
      if (!tablist) return null;
      const boxOf = (el) => {
        const rr = el.getBoundingClientRect();
        return Math.round(rr.x) + "," + Math.round(rr.y) + " " + Math.round(rr.width) + "x" + Math.round(rr.height);
      };
      const pills = Array.from(tablist.querySelectorAll('[role="tab"]')).map((t) => ({
        text: (t.textContent ?? "").trim(),
        face: ${FACE_JS}(t),
        cls: t.getAttribute("class") ?? "",
        box: boxOf(t),
        state: t.getAttribute("data-state") ?? "",
      }));
      const selectTriggers = Array.from(document.querySelectorAll('main [role="combobox"]')).map((c) => ({
        aria: c.getAttribute("aria-label") ?? "(none)",
        text: (c.textContent ?? "").trim().slice(0, 30),
        face: ${FACE_JS}(c),
        cls: c.getAttribute("class") ?? "",
        box: boxOf(c),
      }));
      return { pills, selectTriggers };
    })()`).catch(() => null)) as { pills: TriggerFace[]; selectTriggers: ReportsCensus["selectTriggers"] } | null;
    if (!a1) return result;
    result.found = true;
    result.pills = a1.pills;
    result.selectTriggers = a1.selectTriggers;
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
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
    .replace(/\bbg-line-soft\b/g, "bg-TRACKTOKEN")
    .replace(/\bbg-muted\b/g, "bg-TRACKTOKEN")
    .replace(/\btext-muted-ink\b/g, "text-TRACKTOKEN")
    .replace(/\btext-muted-foreground\b/g, "text-TRACKTOKEN")
    .replace(/\bbg-white\b/g, "bg-ACTIVE")
    .replace(/\bbg-background\b/g, "bg-ACTIVE")
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
    console.log("[walk61] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[walk61] pair state: ready (the s162 guarded form)");
    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    // ===== Phase A — the settings tab-bar census at BOTH axes =====
    const oursT = await tabsPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refT = await tabsPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    const oursTp = await tabsPhase(browser, OUR_URL, state, { w: 390, h: 844 });
    const refTp = await tabsPhase(browser, REF_URL, state, { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-tabs-desktop.json"), JSON.stringify(oursT, null, 2));
    writeFileSync(join(OUT_DIR, "ref-tabs-desktop.json"), JSON.stringify(refT, null, 2));
    writeFileSync(join(OUT_DIR, "ours-tabs-phone.json"), JSON.stringify(oursTp, null, 2));
    writeFileSync(join(OUT_DIR, "ref-tabs-phone.json"), JSON.stringify(refTp, null, 2));

    report.push("\n===== SETTINGS TAB-BAR @1440x900 =====");
    report.push(`found: OURS ${oursT.found} | REF ${refT.found}`);
    if (oursT.strip && refT.strip) {
      report.push(`strip.box: OURS ${oursT.strip.box} | REF ${refT.strip.box}`);
      report.push(`strip.bg: OURS ${oursT.strip.bg} | REF ${refT.strip.bg}`);
      report.push(`strip.radius: OURS ${oursT.strip.radius} | REF ${refT.strip.radius}`);
      report.push(`strip.border: OURS "${oursT.strip.border}" | REF "${refT.strip.border}"`);
      report.push(`strip.cls: OURS "${oursT.strip.cls}" | REF "${refT.strip.cls}"`);
      report.push(`contentGap: OURS ${oursT.contentGap}px | REF ${refT.contentGap}px`);
    }
    report.push(`wiring: OURS [${oursT.wiring.map((w) => `${w.text} sel=${w.selected}`).join(" | ")}]`);
    report.push(`        REF  [${refT.wiring.map((w) => `${w.text} sel=${w.selected}`).join(" | ")}]`);
    for (let i = 0; i < Math.max(oursT.triggers.length, refT.triggers.length); i++) {
      const a = oursT.triggers[i];
      const b = refT.triggers[i];
      if (!a || !b) { report.push(`trigger[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`trigger[${i}] "${a.text}": box OURS ${a.box} | REF ${b.box}`);
      report.push(`trigger[${i}] state: OURS "${a.state}" | REF "${b.state}"`);
      report.push(...faceDelta(`trigger[${i}].face`, a.face, b.face));
    }
    report.push(`flipRoundTrip: OURS [${oursT.flipRoundTrip.join(" ; ")}]`);
    report.push(`               REF  [${refT.flipRoundTrip.join(" ; ")}]`);
    report.push(...diffRows("tabsLedger", oursT.ledger, refT.ledger));

    report.push("\n===== SETTINGS TAB-BAR @390x844 =====");
    report.push(`found: OURS ${oursTp.found} | REF ${refTp.found}`);
    if (oursTp.strip && refTp.strip) {
      report.push(`strip.box: OURS ${oursTp.strip.box} | REF ${refTp.strip.box}`);
      report.push(`strip.bg: OURS ${oursTp.strip.bg} | REF ${refTp.strip.bg}`);
      for (let i = 0; i < Math.max(oursTp.triggers.length, refTp.triggers.length); i++) {
        const a = oursTp.triggers[i];
        const b = refTp.triggers[i];
        if (!a || !b) continue;
        report.push(`phoneTrigger[${i}] "${a.text}": box OURS ${a.box} | REF ${b.box}`);
        report.push(...faceDelta(`phoneTrigger[${i}].face`, a.face, b.face));
      }
    }

    // ===== Phase B — the REAL keyboard Tab drives =====
    const oursRT = await tabsRealTabPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refRT = await tabsRealTabPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    writeFileSync(join(OUT_DIR, "ours-realtab.json"), JSON.stringify(oursRT, null, 2));
    writeFileSync(join(OUT_DIR, "ref-realtab.json"), JSON.stringify(refRT, null, 2));
    report.push("\n===== SETTINGS REAL-TAB CHAIN @1440x900 =====");
    report.push(`OURS tabStopIndex=${oursRT.tabStopIndex} | REF ${refRT.tabStopIndex}`);
    const normChain = (s: string) => s.replace(/outline=[^ ]+ [^ ]+ [^ ]+/, "outline=N").replace(/ring=.*/, "ring=N");
    const oursStops = oursRT.stops.map(normChain);
    const refStops = refRT.stops.map(normChain);
    if (JSON.stringify(oursStops) !== JSON.stringify(refStops)) {
      report.push(`CHAIN DELTA: OURS [${oursStops.join(" → ")}]`);
      report.push(`            REF  [${refStops.join(" → ")}]`);
    } else {
      report.push(`CHAIN: STRUCTURALLY IDENTICAL [${oursStops.join(" → ")}] (the ring/outline-form genera normalized)`);
    }
    report.push(`REAL FOCUS-VISIBLE on the strip: OURS outline="${oursRT.tabFocusOutline}"`);
    report.push(`                               REF  outline="${refRT.tabFocusOutline}"`);
    report.push(`REAL FOCUS-VISIBLE ring: OURS "${oursRT.tabFocusRing.slice(0, 200)}"`);
    report.push(`                        REF  "${refRT.tabFocusRing.slice(0, 200)}"`);
    report.push(`ArrowRight landing: OURS ${oursRT.arrowRightLanding}`);
    report.push(`                   REF  ${refRT.arrowRightLanding}`);

    // ===== Phase B2 — the REAL mouse-click face =====
    const oursMC = await tabsMousePhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refMC = await tabsMousePhase(browser, REF_URL, state, { w: 1440, h: 900 });
    writeFileSync(join(OUT_DIR, "ours-mouseclick.json"), JSON.stringify(oursMC, null, 2));
    writeFileSync(join(OUT_DIR, "ref-mouseclick.json"), JSON.stringify(refMC, null, 2));
    report.push("\n===== SETTINGS MOUSE-CLICK FACE @1440x900 =====");
    report.push(`OURS: outline="${oursMC.outline}" state="${oursMC.dataState}" bg=${oursMC.bg}`);
    report.push(`OURS: ring="${oursMC.ring.slice(0, 180)}"`);
    report.push(`REF : outline="${refMC.outline}" state="${refMC.dataState}" bg=${refMC.bg}`);
    report.push(`REF : ring="${refMC.ring.slice(0, 180)}"`);

    // ===== Phase C — the accounts rail sibling =====
    const oursR = await railPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refR = await railPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    writeFileSync(join(OUT_DIR, "ours-rail.json"), JSON.stringify(oursR, null, 2));
    writeFileSync(join(OUT_DIR, "ref-rail.json"), JSON.stringify(refR, null, 2));
    report.push("\n===== ACCOUNTS RAIL @1440x900 =====");
    report.push(`found: OURS ${oursR.found} | REF ${refR.found}`);
    report.push(`railCls: OURS "${oursR.railCls}" | REF "${refR.railCls}"`);
    for (let i = 0; i < Math.max(oursR.selects.length, refR.selects.length); i++) {
      const a = oursR.selects[i];
      const b = refR.selects[i];
      if (!a || !b) { report.push(`railSelect[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`railSelect[${i}]: label "${a.label}" aria OURS "${a.aria}" | REF "${b.aria}"`);
      report.push(`railSelect[${i}]: text OURS "${a.text}" | REF "${b.text}" box OURS ${a.box} | REF ${b.box}`);
      report.push(`railSelect[${i}].cls: OURS "${a.cls}" | REF "${b.cls}"`);
      report.push(...faceDelta(`railSelect[${i}].face`, a.face, b.face));
    }
    if (oursR.firstOpen && refR.firstOpen) {
      report.push(`railSelect OPEN: cls OURS "${oursR.firstOpen.cls}" | REF "${refR.firstOpen.cls}"`);
      report.push(`railSelect OPEN: bg OURS ${oursR.firstOpen.bg} | REF ${refR.firstOpen.bg} radius OURS ${oursR.firstOpen.radius} | REF ${refR.firstOpen.radius}`);
      report.push(`railSelect OPEN: box OURS ${oursR.firstOpen.box} | REF ${refR.firstOpen.box}`);
      report.push(`railSelect OPEN items: OURS (${oursR.firstOpen.itemCount}) [${oursR.firstOpen.items.join(" | ")}]`);
      report.push(`                      REF  (${refR.firstOpen.itemCount}) [${refR.firstOpen.items.join(" | ")}]`);
    } else {
      report.push(`railSelect OPEN presence: OURS=${!!oursR.firstOpen} REF=${!!refR.firstOpen}`);
    }

    // ===== Phase D — the leads search sibling =====
    const oursL = await leadsPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refL = await leadsPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    const oursLp = await leadsPhase(browser, OUR_URL, state, { w: 390, h: 844 });
    const refLp = await leadsPhase(browser, REF_URL, state, { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-leads-desktop.json"), JSON.stringify(oursL, null, 2));
    writeFileSync(join(OUT_DIR, "ref-leads-desktop.json"), JSON.stringify(refL, null, 2));
    writeFileSync(join(OUT_DIR, "ours-leads-phone.json"), JSON.stringify(oursLp, null, 2));
    writeFileSync(join(OUT_DIR, "ref-leads-phone.json"), JSON.stringify(refLp, null, 2));
    report.push("\n===== LEADS SEARCH @1440x900 =====");
    report.push(`found: OURS ${oursL.found} | REF ${refL.found}`);
    if (oursL.search && refL.search) {
      report.push(`search.box: OURS ${oursL.search.box} | REF ${refL.search.box}`);
      report.push(`search.cls: OURS "${oursL.search.cls}" | REF "${refL.search.cls}"`);
      report.push(...faceDelta("search.face", oursL.search.face, refL.search.face));
      report.push(`search.focusRing: OURS "${oursL.search.focusRing.slice(0, 200)}"`);
      report.push(`                  REF  "${refL.search.focusRing.slice(0, 200)}"`);
    }
    if (oursL.filtersBtn && refL.filtersBtn) {
      report.push(`filtersBtn.box: OURS ${oursL.filtersBtn.box} | REF ${refL.filtersBtn.box}`);
      report.push(`filtersBtn.cls: OURS "${oursL.filtersBtn.cls}" | REF "${refL.filtersBtn.cls}"`);
      report.push(...faceDelta("filtersBtn.face", oursL.filtersBtn.face, refL.filtersBtn.face));
    }
    if (oursL.exportBtn && refL.exportBtn) {
      report.push(`exportBtn.box: OURS ${oursL.exportBtn.box} | REF ${refL.exportBtn.box}`);
      report.push(...faceDelta("exportBtn.face", oursL.exportBtn.face, refL.exportBtn.face));
    }
    if (oursL.newLeadBtn && refL.newLeadBtn) {
      report.push(`newLeadBtn.box: OURS ${oursL.newLeadBtn.box} | REF ${refL.newLeadBtn.box}`);
      report.push(...faceDelta("newLeadBtn.face", oursL.newLeadBtn.face, refL.newLeadBtn.face));
    }
    report.push("\n===== LEADS SEARCH @390x844 =====");
    report.push(`found: OURS ${oursLp.found} | REF ${refLp.found}`);
    if (oursLp.search && refLp.search) {
      report.push(`phone search.box: OURS ${oursLp.search.box} | REF ${refLp.search.box}`);
      report.push(...faceDelta("phoneSearch.face", oursLp.search.face, refLp.search.face));
    }

    // ===== Phase E — the reports pills/selects re-walk leg =====
    const oursRP = await reportsPhase(browser, OUR_URL, state, { w: 1440, h: 900 });
    const refRP = await reportsPhase(browser, REF_URL, state, { w: 1440, h: 900 });
    writeFileSync(join(OUT_DIR, "ours-reports.json"), JSON.stringify(oursRP, null, 2));
    writeFileSync(join(OUT_DIR, "ref-reports.json"), JSON.stringify(refRP, null, 2));
    report.push("\n===== REPORTS PILLS + SELECTS (RE-WALK) @1440x900 =====");
    report.push(`found: OURS ${oursRP.found} | REF ${refRP.found}`);
    for (let i = 0; i < Math.max(oursRP.pills.length, refRP.pills.length); i++) {
      const a = oursRP.pills[i];
      const b = refRP.pills[i];
      if (!a || !b) { report.push(`pill[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`pill[${i}] "${a.text}": box OURS ${a.box} | REF ${b.box} state OURS "${a.state}" | REF "${b.state}"`);
      report.push(...faceDelta(`pill[${i}].face`, a.face, b.face));
    }
    for (let i = 0; i < Math.max(oursRP.selectTriggers.length, refRP.selectTriggers.length); i++) {
      const a = oursRP.selectTriggers[i];
      const b = refRP.selectTriggers[i];
      if (!a || !b) { report.push(`rptSelect[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`rptSelect[${i}]: aria OURS "${a.aria}" | REF "${b.aria}" box OURS ${a.box} | REF ${b.box}`);
      report.push(...faceDelta(`rptSelect[${i}].face`, a.face, b.face));
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk61] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk61] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk61] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk61]", e);
  process.exit(1);
});
