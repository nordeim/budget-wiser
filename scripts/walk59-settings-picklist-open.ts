// Session-186 (walk59): THE SETTINGS PICKLIST-EDITOR OPEN-STATE
// INTERIOR WALK + DEFAULTS-TAB SELECTS SIBLING — the walk53-58 ledger
// form over the settings family's OPEN/focus states at BOTH axes (the
// settings family is reachable at phone, like the dialog family):
//
//   Phase A — the picklist OPEN census: the first card's (Contact
//     Sources) first row RESTING face → the Pencil CLICK → the
//     swapped row's interior DFS ledger (the row + the Input + the
//     Save/X pair), the mount-focus census (the SAVE-button landing —
//     the DOM-reuse retention), the rename Input's resting + focus
//     ring census (the FULL untruncated slot chains — the discovery's
//     100-char cuts hid the shadow-sm arm; the walk decodes it), the
//     X close round-trip (the reference's destructive arms are NEVER
//     fired — the delete/save writes ride OURS only; the X/Escape
//     cancels are the safe two-app round-trips), the ADD row census
//     (the Input's placeholder/border/focus ring + the dark Add
//     button's face + its hover), the row + Trash2 HOVER faces (the
//     walk57 mouse-borne precedent).
//   Phase B — the REAL keyboard Tab drive through the swapped row
//     (the walk54/58 focus form, now two-app): the mount-focus (Save)
//     → Shift-Tab (the Input) → Tab (Save) → Tab (X) — the fixed
//     3-stop chain, each stop's focused face — then the ESCAPE probe
//     (our ListEditor wires Enter only; the reference's Escape
//     behavior is an open discovery question — the walk answers it).
//   Phase C — the phone axis 390×844: the same picklist OPEN census
//     (the s106 settings-family-at-phone form).
//   Phase D — the Defaults tab decode (the sibling arms): the two
//     comboboxes' (Default Calendar View Month/Week — the s72 M-72c3
//     decode · First Day of Week Monday/Sunday) OPEN faces — the
//     listbox vocabularies, the highlighted-item faces, the trigger
//     faces + the Escape round-trip — + the four inputs' (AED/new/B/3)
//     resting faces.
//
// The DATA-STATE discipline: the picklist VALUES/counts are data (ours
// the seed 8/7/6/3/8, the reference its own defaults 5/6/6/4/10); the
// walk compares the CONSTRUCTION faces on each app's first-card
// first-row. The aria-label naming (ours the superset) normalizes in
// the chain comparison — the s88-c9 kept genus.
//
// Run: bun scripts/walk59-settings-picklist-open.ts
// (reuses the dev server on :3000 — the walk57/58 boot-site form; the
// reference rides the sweep-state storageState pair, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "@playwright/test";

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
const OUT_DIR = join(REPO, "scripts", "walk59");

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

/** The computed face — the effective-layer style probe (the walk51-58
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

interface PicklistCensus {
  found: boolean;
  rowResting: { face: Face | null; cls: string; box: string; ledger: Row[] | null };
  pencilFace: Face | null;
  pencilAria: string;
  trashFace: Face | null;
  trashAria: string;
  trashHoverColor: string | null;
  rowHoverBg: string | null;
  svgSizes: string[];
  swap: {
    swapped: boolean;
    rowFace: Face | null;
    rowCls: string;
    mountFocus: string;
    mountFocusFace: Face | null;
    inputFace: Face | null;
    inputCls: string;
    inputValue: string;
    inputFocusRing: string;
    saveFace: Face | null;
    saveAria: string;
    xFace: Face | null;
    xAria: string;
    ledger: Row[] | null;
    xRoundTrip: boolean;
    escapeCloses: boolean | null;
  } | null;
  addRow: {
    placeholder: string;
    inputFace: Face | null;
    inputCls: string;
    inputFocusRing: string;
    addFace: Face | null;
    addAria: string;
    addHoverFace: Face | null;
  } | null;
}

interface SwapTabResult {
  stops: string[];
  escapeClosed: boolean;
}

interface DefaultsCensus {
  found: boolean;
  cardTitle: string;
  subtitle: string;
  labels: string[];
  inputs: Array<{ value: string; type: string; placeholder: string; face: Face | null; cls: string }>;
  combos: Array<{
    triggerText: string;
    triggerFace: Face | null;
    triggerCls: string;
    openVocab: string[];
    contentFace: Face | null;
    highlightedFace: Face | null;
    highlightedText: string;
    escapeClosed: boolean;
  }>;
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

async function faceOfLocator(loc: import("@playwright/test").Locator): Promise<Face | null> {
  return loc
    .evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
      };
    })
    .catch(() => null);
}

/** The first-card root + first-row selectors, resolved INSIDE the page
 * (the CardTitle-renders-a-div calibration, the M-185-p0 walk-up form). */
const CARD_JS = `(() => {
  const h = Array.from(document.querySelectorAll("main div")).find(
    (el) => (el.textContent ?? "").trim() === "Contact Sources" &&
      !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Contact Sources")),
  );
  if (!h) return null;
  let card = h;
  for (let i = 0; i < 8; i++) {
    if (card.parentElement &&
        card.parentElement.querySelector('div.flex.items-center.gap-2.p-2.border')) {
      card = card.parentElement;
      break;
    }
    if (!card.parentElement) break;
    card = card.parentElement;
  }
  return card;
})()`;

async function picklistPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string, axis: { w: number; h: number }): Promise<PicklistCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: PicklistCensus = {
    found: false,
    rowResting: { face: null, cls: "", box: "", ledger: null },
    pencilFace: null,
    pencilAria: "(none)",
    trashFace: null,
    trashAria: "(none)",
    trashHoverColor: null,
    rowHoverBg: null,
    svgSizes: [],
    swap: null,
    addRow: null,
  };
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);

    // A1 — the first row's RESTING census
    const a1 = (await page.evaluate(`(() => {
      const card = ${CARD_JS};
      if (!card) return null;
      const row = card.querySelector('div.flex.items-center.gap-2.p-2.border');
      if (!row) return null;
      const cs = getComputedStyle(row);
      const r = row.getBoundingClientRect();
      const face = { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, fontWeight: cs.fontWeight };
      const btns = Array.from(row.querySelectorAll("button"));
      const btnFace = (b) => {
        const bcs = getComputedStyle(b);
        return { bg: bcs.backgroundColor, color: bcs.color, border: bcs.border, boxShadow: bcs.boxShadow, borderRadius: bcs.borderRadius, outline: bcs.outlineWidth + " " + bcs.outlineStyle + " " + bcs.outlineColor, fontWeight: bcs.fontWeight };
      };
      const svgs = Array.from(row.querySelectorAll("svg")).map((s) => Math.round(s.getBoundingClientRect().width) + "x" + Math.round(s.getBoundingClientRect().height));
      const ledger = [];
      const collect = (el, depth) => {
        const aria = {};
        for (const attr of Array.from(el.attributes)) {
          if (attr.name.startsWith("aria-") || attr.name === "data-state") aria[attr.name] = attr.value;
        }
        const text = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join(" ").trim().slice(0, 40);
        const rr = el.getBoundingClientRect();
        ledger.push({ i: ledger.length, depth, tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class") ?? "").trim(), role: el.getAttribute("role"), aria, text, box: { x: Math.round(rr.x), y: Math.round(rr.y), w: Math.round(rr.width), h: Math.round(rr.height) } });
        for (const child of Array.from(el.children)) collect(child, depth + 1);
      };
      collect(row, 0);
      return {
        rowFace: face, rowCls: row.getAttribute("class") ?? "",
        rowBox: Math.round(r.x) + "," + Math.round(r.y) + " " + Math.round(r.width) + "x" + Math.round(r.height),
        ledger,
        firstBtn: btns[0] ? { face: btnFace(btns[0]), aria: btns[0].getAttribute("aria-label") ?? "(none)" } : null,
        lastBtn: btns[1] ? { face: btnFace(btns[1]), aria: btns[1].getAttribute("aria-label") ?? "(none)" } : null,
        svgs,
      };
    })()`).catch(() => null)) as {
      rowFace?: Face | null; rowCls?: string; rowBox?: string; ledger?: Row[] | null;
      firstBtn?: { face: Face | null; aria: string } | null;
      lastBtn?: { face: Face | null; aria: string } | null;
      svgs?: string[];
    } | null;
    if (!a1) return result;
    result.found = true;
    result.rowResting = { face: a1.rowFace ?? null, cls: a1.rowCls ?? "", box: a1.rowBox ?? "", ledger: a1.ledger ?? null };
    if (a1.firstBtn) { result.pencilFace = a1.firstBtn.face; result.pencilAria = a1.firstBtn.aria; }
    if (a1.lastBtn) { result.trashFace = a1.lastBtn.face; result.trashAria = a1.lastBtn.aria; }
    result.svgSizes = a1.svgs ?? [];

    // The hover faces (the walk57 mouse-borne precedent)
    const rowLoc = page.locator("main div.flex.items-center.gap-2.p-2.border").first();
    const trashLoc = page.locator("main div.flex.items-center.gap-2.p-2.border button").nth(1);
    await trashLoc.hover().catch(() => undefined);
    await page.waitForTimeout(350);
    result.trashHoverColor = await trashLoc.evaluate((el) => getComputedStyle(el as HTMLElement).color).catch(() => null);
    await rowLoc.hover({ position: { x: 8, y: 8 } }).catch(() => undefined);
    await page.waitForTimeout(350);
    result.rowHoverBg = await rowLoc.evaluate((el) => getComputedStyle(el as HTMLElement).backgroundColor).catch(() => null);

    // A2 — the Pencil CLICK → the swapped row census
    const pencilLoc = page.locator("main div.flex.items-center.gap-2.p-2.border button").first();
    await pencilLoc.click();
    await page.waitForTimeout(900);
    const a2 = (await page.evaluate(`(() => {
      const rowWithInput = Array.from(document.querySelectorAll('main div.flex.items-center.gap-2.p-2.border')).find((d) => d.querySelector("input"));
      if (!rowWithInput) return null;
      const ae = document.activeElement;
      const rcs = getComputedStyle(rowWithInput);
      const rowFace = { bg: rcs.backgroundColor, color: rcs.color, border: rcs.border, boxShadow: rcs.boxShadow, borderRadius: rcs.borderRadius, outline: rcs.outlineWidth + " " + rcs.outlineStyle + " " + rcs.outlineColor, fontWeight: rcs.fontWeight };
      const input = rowWithInput.querySelector("input");
      let inputFace = null, inputCls = "", inputValue = "", inputFocusRing = "";
      if (input) {
        const cs = getComputedStyle(input);
        inputFace = { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, fontWeight: cs.fontWeight };
        inputCls = input.getAttribute("class") ?? "";
        inputValue = input.value;
        input.focus();
        inputFocusRing = getComputedStyle(input).boxShadow;
      }
      const btns = Array.from(rowWithInput.querySelectorAll("button"));
      const btnFace = (b) => {
        const bcs = getComputedStyle(b);
        const br = b.getBoundingClientRect();
        return { bg: bcs.backgroundColor, color: bcs.color, border: bcs.border, boxShadow: bcs.boxShadow, borderRadius: bcs.borderRadius, outline: bcs.outlineWidth + " " + bcs.outlineStyle + " " + bcs.outlineColor, fontWeight: bcs.fontWeight, box: Math.round(br.x) + "," + Math.round(br.y) + " " + Math.round(br.width) + "x" + Math.round(br.height) };
      };
      const ledger = [];
      const collect = (el, depth) => {
        const aria = {};
        for (const attr of Array.from(el.attributes)) {
          if (attr.name.startsWith("aria-") || attr.name === "data-state") aria[attr.name] = attr.value;
        }
        const text = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join(" ").trim().slice(0, 40);
        const rr = el.getBoundingClientRect();
        ledger.push({ i: ledger.length, depth, tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class") ?? "").trim(), role: el.getAttribute("role"), aria, text, box: { x: Math.round(rr.x), y: Math.round(rr.y), w: Math.round(rr.width), h: Math.round(rr.height) } });
        for (const child of Array.from(el.children)) collect(child, depth + 1);
      };
      collect(rowWithInput, 0);
      const mountFace = ae ? (() => { const c = getComputedStyle(ae); return { bg: c.backgroundColor, color: c.color, border: c.border, boxShadow: c.boxShadow, borderRadius: c.borderRadius, outline: c.outlineWidth + " " + c.outlineStyle + " " + c.outlineColor, fontWeight: c.fontWeight }; })() : null;
      const nameOf = (el) => el ? el.tagName + "[" + ((el.getAttribute("aria-label") ?? el.getAttribute("placeholder") ?? el.textContent ?? "").trim().slice(0, 28) || "(no text)") + "]" : "(none)";
      return {
        rowFace, rowCls: rowWithInput.getAttribute("class") ?? "",
        mountFocus: nameOf(ae), mountFocusFace: mountFace,
        inputFace, inputCls, inputValue, inputFocusRing,
        save: btns[0] ? { face: btnFace(btns[0]), aria: btns[0].getAttribute("aria-label") ?? "(none)" } : null,
        x: btns[1] ? { face: btnFace(btns[1]), aria: btns[1].getAttribute("aria-label") ?? "(none)" } : null,
        ledger,
      };
    })()`).catch(() => null)) as {
      rowFace?: Face | null; rowCls?: string; mountFocus?: string; mountFocusFace?: Face | null;
      inputFace?: Face | null; inputCls?: string; inputValue?: string; inputFocusRing?: string;
      save?: { face: Face | null; aria: string; box?: string } | null;
      x?: { face: Face | null; aria: string; box?: string } | null;
      ledger?: Row[] | null;
    } | null;
    if (a2) {
      result.swap = {
        swapped: true,
        rowFace: a2.rowFace ?? null,
        rowCls: a2.rowCls ?? "",
        mountFocus: a2.mountFocus ?? "(none)",
        mountFocusFace: a2.mountFocusFace ?? null,
        inputFace: a2.inputFace ?? null,
        inputCls: a2.inputCls ?? "",
        inputValue: a2.inputValue ?? "",
        inputFocusRing: a2.inputFocusRing ?? "",
        saveFace: a2.save?.face ?? null,
        saveAria: a2.save?.aria ?? "(none)",
        xFace: a2.x?.face ?? null,
        xAria: a2.x?.aria ?? "(none)",
        ledger: a2.ledger ?? null,
        xRoundTrip: false,
        escapeCloses: null,
      };
    }

    // The X round-trip (the LAST button in the swapped row — the safe cancel)
    const xLoc = page.locator('main div.flex.items-center.gap-2.p-2.border:has(input) button').last();
    if (await xLoc.count()) {
      await xLoc.click();
      await page.waitForTimeout(700);
      result.swap!.xRoundTrip = (await page.evaluate(`!document.querySelector('main div.flex.items-center.gap-2.p-2.border input')`)) as boolean;
    }

    // A3 — the ADD row census
    const a3 = (await page.evaluate(`(() => {
      const card = ${CARD_JS};
      if (!card) return null;
      const addInput = Array.from(card.querySelectorAll("input")).find((i) => (i.getAttribute("placeholder") ?? "").startsWith("Add new"));
      if (!addInput) return null;
      const cs = getComputedStyle(addInput);
      const face = { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, fontWeight: cs.fontWeight };
      addInput.focus();
      const focusRing = getComputedStyle(addInput).boxShadow;
      const addBtn = addInput.parentElement ? Array.from(addInput.parentElement.querySelectorAll("button")).find((b) => b.querySelector("svg")) : null;
      let addFace = null, addAria = "(none)";
      if (addBtn) {
        const bcs = getComputedStyle(addBtn);
        addFace = { bg: bcs.backgroundColor, color: bcs.color, border: bcs.border, boxShadow: bcs.boxShadow, borderRadius: bcs.borderRadius, outline: bcs.outlineWidth + " " + bcs.outlineStyle + " " + bcs.outlineColor, fontWeight: bcs.fontWeight };
        addAria = addBtn.getAttribute("aria-label") ?? "(none)";
      }
      return { placeholder: addInput.getAttribute("placeholder"), inputFace: face, inputCls: addInput.getAttribute("class") ?? "", focusRing, addFace, addAria };
    })()`).catch(() => null)) as {
      placeholder?: string;
      inputFace?: Face | null;
      inputCls?: string;
      focusRing?: string;
      addFace?: Face | null;
      addAria?: string;
    } | null;
    if (a3) {
      const addRow: NonNullable<PicklistCensus["addRow"]> = {
        placeholder: a3.placeholder ?? "",
        inputFace: a3.inputFace ?? null,
        inputCls: a3.inputCls ?? "",
        inputFocusRing: a3.focusRing ?? "",
        addFace: a3.addFace ?? null,
        addAria: a3.addAria ?? "(none)",
        addHoverFace: null,
      };
      result.addRow = addRow;
      // the Add button's hover face
      const addBtnLoc = page.locator('main input[placeholder^="Add new"] ~ button').first();
      if (await addBtnLoc.count()) {
        await addBtnLoc.hover().catch(() => undefined);
        await page.waitForTimeout(350);
        addRow.addHoverFace = await addBtnLoc.evaluate((el) => {
          const c = getComputedStyle(el as HTMLElement);
          return { bg: c.backgroundColor, color: c.color, border: c.border, boxShadow: c.boxShadow, borderRadius: c.borderRadius, outline: `${c.outlineWidth} ${c.outlineStyle} ${c.outlineColor}`, fontWeight: c.fontWeight };
        }).catch(() => null);
      }
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase B — the REAL keyboard Tab drive through the swapped row (the
 * fixed 3-stop chain: the Input → Save → X) + the ESCAPE probe. */
async function swapTabPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string): Promise<SwapTabResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state as never });
  const page = await ctx.newPage();
  const stops: string[] = [];
  let escapeClosed = false;
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);
    const pencilLoc = page.locator("main div.flex.items-center.gap-2.p-2.border button").first();
    await pencilLoc.click();
    await page.waitForTimeout(900);

    const describe = () =>
      page.evaluate(() => {
        const ae = document.activeElement as HTMLElement | null;
        if (!ae) return "(none)";
        const cs = getComputedStyle(ae);
        const name = (ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 28) || "(no text)";
        return `${ae.tagName.toLowerCase()}[${name}] ring=${cs.boxShadow.slice(0, 120)}`;
      });

    stops.push(`mount:${await describe()}`);
    await page.keyboard.press("Shift+Tab");
    await page.waitForTimeout(250);
    stops.push(`input:${await describe()}`);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(250);
    stops.push(`save:${await describe()}`);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(250);
    stops.push(`x:${await describe()}`);

    // The ESCAPE probe (non-destructive): does Escape cancel the swap?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
    escapeClosed = (await page.evaluate(`!document.querySelector('main div.flex.items-center.gap-2.p-2.border input')`)) as boolean;
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return { stops, escapeClosed };
}

/** Phase D — the Defaults tab decode: the two comboboxes' OPEN faces +
 * the four inputs' resting faces. */
async function defaultsPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string, axis: { w: number; h: number }): Promise<DefaultsCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: DefaultsCensus = { found: false, cardTitle: "", subtitle: "", labels: [], inputs: [], combos: [] };
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2200);
    const tab = page.locator('main [role="tab"]').filter({ hasText: "Defaults" }).first();
    if (!(await tab.count())) return result;
    await tab.click();
    await page.waitForTimeout(1100);

    const d1 = (await page.evaluate(`(() => {
      const titleEl = Array.from(document.querySelectorAll("main div")).find(
        (el) => (el.textContent ?? "").trim() === "Default Values" &&
          !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Default Values")),
      );
      if (!titleEl) return null;
      let card = titleEl;
      for (let i = 0; i < 8; i++) {
        if (card.parentElement && card.parentElement.querySelector("input")) { card = card.parentElement; break; }
        if (!card.parentElement) break;
        card = card.parentElement;
      }
      const labels = Array.from(card.querySelectorAll("label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
      const subtitle = Array.from(card.querySelectorAll("div")).map((d) => (d.textContent ?? "").trim()).find((t) => t === "Set default values for new records") ?? "";
      const inputs = Array.from(card.querySelectorAll("input")).map((i) => {
        const cs = getComputedStyle(i);
        return {
          value: i.value, type: i.type, placeholder: i.getAttribute("placeholder") ?? "(none)",
          cls: i.getAttribute("class") ?? "",
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, fontWeight: cs.fontWeight },
        };
      });
      const combos = Array.from(card.querySelectorAll('button[role="combobox"]')).map((b) => {
        const cs = getComputedStyle(b);
        return {
          triggerText: (b.textContent ?? "").trim(),
          triggerCls: b.getAttribute("class") ?? "",
          triggerFace: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, fontWeight: cs.fontWeight },
        };
      });
      return { labels, subtitle, inputs, combos };
    })()`).catch(() => null)) as {
      subtitle?: string;
      labels?: string[];
      inputs?: Array<{ value: string; type: string; placeholder: string; face: Face | null; cls: string }>;
      combos?: Array<{ triggerText: string; triggerCls: string; triggerFace: Face | null }>;
    } | null;
    if (!d1) return result;
    result.found = true;
    result.cardTitle = "Default Values";
    result.subtitle = d1.subtitle ?? "";
    result.labels = d1.labels ?? [];
    result.inputs = d1.inputs ?? [];

    // The two comboboxes' OPEN faces
    const comboLocs = page.locator('main button[role="combobox"]');
    const n = await comboLocs.count();
    for (let ci = 0; ci < Math.min(n, 2); ci++) {
      const loc = comboLocs.nth(ci);
      const resting = (d1.combos ?? [])[ci];
      await loc.click();
      await page.waitForTimeout(800);
      const open = (await page.evaluate(`(() => {
        const content = document.querySelector('[role="listbox"]');
        if (!content) return null;
        const ccs = getComputedStyle(content);
        const contentFace = { bg: ccs.backgroundColor, color: ccs.color, border: ccs.border, boxShadow: ccs.boxShadow, borderRadius: ccs.borderRadius, outline: ccs.outlineWidth + " " + ccs.outlineStyle + " " + ccs.outlineColor, fontWeight: ccs.fontWeight };
        const options = Array.from(content.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim());
        const hl = content.querySelector('[data-highlighted], [data-highlighted="true"]');
        let highlightedFace = null, highlightedText = "";
        if (hl) {
          const hcs = getComputedStyle(hl);
          highlightedFace = { bg: hcs.backgroundColor, color: hcs.color, border: hcs.border, boxShadow: hcs.boxShadow, borderRadius: hcs.borderRadius, outline: hcs.outlineWidth + " " + hcs.outlineStyle + " " + hcs.outlineColor, fontWeight: hcs.fontWeight };
          highlightedText = (hl.textContent ?? "").trim();
        }
        return { options, contentFace, highlightedFace, highlightedText };
      })()`).catch(() => null)) as { options?: string[]; contentFace?: Face | null; highlightedFace?: Face | null; highlightedText?: string } | null;
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
      const escClosed = (await page.evaluate(`!document.querySelector('[role="listbox"]')`)) as boolean;
      result.combos.push({
        triggerText: resting?.triggerText ?? "",
        triggerFace: resting?.triggerFace ?? null,
        triggerCls: resting?.triggerCls ?? "",
        openVocab: open?.options ?? [],
        contentFace: open?.contentFace ?? null,
        highlightedFace: open?.highlightedFace ?? null,
        highlightedText: open?.highlightedText ?? "",
        escapeClosed: escClosed,
      });
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

function faceDelta(name: string, a: Face | null, b: Face | null): string[] {
  const out: string[] = [];
  if (!a || !b) {
    if (!!a !== !!b) out.push(`${name}: presence OURS=${!!a} REF=${!!b}`);
    return out;
  }
  for (const k of Object.keys(a) as Array<keyof Face>) {
    if (a[k] !== b[k]) out.push(`${name}.${k}: OURS "${String(a[k]).slice(0, 160)}" | REF "${String(b[k]).slice(0, 160)}"`);
  }
  return out;
}

function diffRows(name: string, ours: Row[] | null, ref: Row[] | null): string[] {
  const out: string[] = [];
  if (!ours || !ref) {
    out.push(`${name}: presence OURS=${!!ours} REF=${!!ref}`);
    return out;
  }
  // the aria-label texts are data-borne (the item name) — normalize them
  const norm = (r: Row) => ({ ...r, aria: Object.fromEntries(Object.entries(r.aria).map(([k, v]) => [k, v.replace(/^Rename .*/, "Rename *").replace(/^Delete .*/, "Delete *")])) });
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
    const ja = JSON.stringify(a.aria);
    const jb = JSON.stringify(b.aria);
    if (ja !== jb) out.push(`${name}[${i}] <${a.tag}> aria: OURS ${ja} | REF ${jb}`);
  }
  if (!structural) out.push(`${name}: rows STRUCTURALLY IDENTICAL (${o.length} rows) modulo the aria naming`);
  return out;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk59] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[walk59] pair state: ready (the s162 guarded form)");
    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    // Phase A — the picklist OPEN census at BOTH axes
    const oursD = await picklistPhase(browser, OUR_URL, state, "OURS", { w: 1440, h: 900 });
    const refD = await picklistPhase(browser, REF_URL, state, "REF ", { w: 1440, h: 900 });
    const oursP = await picklistPhase(browser, OUR_URL, state, "OURS", { w: 390, h: 844 });
    const refP = await picklistPhase(browser, REF_URL, state, "REF ", { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-picklist-desktop.json"), JSON.stringify(oursD, null, 2));
    writeFileSync(join(OUT_DIR, "ref-picklist-desktop.json"), JSON.stringify(refD, null, 2));
    writeFileSync(join(OUT_DIR, "ours-picklist-phone.json"), JSON.stringify(oursP, null, 2));
    writeFileSync(join(OUT_DIR, "ref-picklist-phone.json"), JSON.stringify(refP, null, 2));

    report.push("\n===== PICKLIST(row1) RESTING @1440x900 =====");
    report.push(`found: OURS ${oursD.found} | REF ${refD.found}`);
    report.push(`rowBox: OURS ${oursD.rowResting.box} | REF ${refD.rowResting.box}`);
    report.push(`rowCls: OURS "${oursD.rowResting.cls}" | REF "${refD.rowResting.cls}"`);
    report.push(`pencilAria: OURS "${oursD.pencilAria}" | REF "${refD.pencilAria}"`);
    report.push(`trashAria: OURS "${oursD.trashAria}" | REF "${refD.trashAria}"`);
    report.push(`svgSizes: OURS [${oursD.svgSizes.join(" ")}] | REF [${refD.svgSizes.join(" ")}]`);
    report.push(`trashHoverColor: OURS ${oursD.trashHoverColor} | REF ${refD.trashHoverColor}`);
    report.push(`rowHoverBg: OURS ${oursD.rowHoverBg} | REF ${refD.rowHoverBg}`);
    report.push(...faceDelta("rowResting", oursD.rowResting.face, refD.rowResting.face));
    report.push(...faceDelta("pencilFace", oursD.pencilFace, refD.pencilFace));
    report.push(...faceDelta("trashFace", oursD.trashFace, refD.trashFace));
    report.push(...diffRows("rowLedger", oursD.rowResting.ledger, refD.rowResting.ledger));

    report.push("\n===== PICKLIST(RENAME SWAP) OPEN @1440x900 =====");
    const so = oursD.swap;
    const sr = refD.swap;
    if (so && sr) {
      report.push(`swapped: OURS ${so.swapped} | REF ${sr.swapped}`);
      report.push(`mountFocus: OURS ${so.mountFocus} | REF ${sr.mountFocus}`);
      report.push(`inputValue(data-state): OURS "${so.inputValue}" | REF "${sr.inputValue}"`);
      report.push(`saveAria: OURS "${so.saveAria}" | REF "${sr.saveAria}"`);
      report.push(`xAria: OURS "${so.xAria}" | REF "${sr.xAria}"`);
      report.push(`xRoundTrip: OURS ${so.xRoundTrip} | REF ${sr.xRoundTrip}`);
      report.push(`inputCls: OURS "${so.inputCls}"`);
      report.push(`inputCls: REF  "${sr.inputCls}"`);
      report.push(`inputFocusRing: OURS "${so.inputFocusRing}"`);
      report.push(`inputFocusRing: REF  "${sr.inputFocusRing}"`);
      report.push(...faceDelta("swapRowFace", so.rowFace, sr.rowFace));
      report.push(...faceDelta("swapInputFace", so.inputFace, sr.inputFace));
      report.push(...faceDelta("saveFace", so.saveFace, sr.saveFace));
      report.push(...faceDelta("xFace", so.xFace, sr.xFace));
      report.push(...faceDelta("mountFocusFace", so.mountFocusFace, sr.mountFocusFace));
      report.push(...diffRows("swapLedger", so.ledger, sr.ledger));
    } else {
      report.push(`swap presence: OURS=${!!so} REF=${!!sr}`);
    }

    report.push("\n===== PICKLIST(ADD ROW) @1440x900 =====");
    const ao = oursD.addRow;
    const ar = refD.addRow;
    if (ao && ar) {
      report.push(`placeholder: OURS "${ao.placeholder}" | REF "${ar.placeholder}"`);
      report.push(`addAria: OURS "${ao.addAria}" | REF "${ar.addAria}"`);
      report.push(...faceDelta("addInputFace", ao.inputFace, ar.inputFace));
      report.push(...faceDelta("addBtnFace", ao.addFace, ar.addFace));
      report.push(...faceDelta("addBtnHoverFace", ao.addHoverFace, ar.addHoverFace));
    } else {
      report.push(`addRow presence: OURS=${!!ao} REF=${!!ar}`);
    }

    report.push("\n===== PICKLIST(RENAME SWAP) @390x844 =====");
    if (oursP.swap && refP.swap) {
      report.push(`swapped: OURS ${oursP.swap.swapped} | REF ${refP.swap.swapped}`);
      report.push(`mountFocus: OURS ${oursP.swap.mountFocus} | REF ${refP.swap.mountFocus}`);
      report.push(`xRoundTrip: OURS ${oursP.swap.xRoundTrip} | REF ${refP.swap.xRoundTrip}`);
      report.push(...faceDelta("phoneSwapRowFace", oursP.swap.rowFace, refP.swap.rowFace));
      report.push(...faceDelta("phoneSwapInputFace", oursP.swap.inputFace, refP.swap.inputFace));
    } else {
      report.push(`phone swap presence: OURS=${!!oursP.swap} REF=${!!refP.swap}`);
    }

    // Phase B — the REAL keyboard Tab chains through the swapped row
    const oursT = await swapTabPhase(browser, OUR_URL, state, "OURS");
    const refT = await swapTabPhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-swap-tab.json"), JSON.stringify(oursT, null, 2));
    writeFileSync(join(OUT_DIR, "ref-swap-tab.json"), JSON.stringify(refT, null, 2));
    report.push("\n===== SWAP TAB-CHAIN @1440x900 =====");
    const stripRing = (s: string) => s.replace(/ ring=.*/, "").replace(/Rename [^\]]*/, "Rename *");
    const oT = oursT.stops.map(stripRing);
    const rT = refT.stops.map(stripRing);
    if (JSON.stringify(oT) !== JSON.stringify(rT)) {
      report.push(`CHAIN DELTA: OURS [${oT.join(" → ")}] | REF [${rT.join(" → ")}]`);
    } else {
      report.push(`CHAIN: IDENTICAL [${oT.join(" → ")}]`);
    }
    report.push(`escapeClosed: OURS ${oursT.escapeClosed} | REF ${refT.escapeClosed}`);

    // Phase D — the Defaults tab decode at BOTH axes
    const oursDef = await defaultsPhase(browser, OUR_URL, state, "OURS", { w: 1440, h: 900 });
    const refDef = await defaultsPhase(browser, REF_URL, state, "REF ", { w: 1440, h: 900 });
    const oursDefP = await defaultsPhase(browser, OUR_URL, state, "OURS", { w: 390, h: 844 });
    const refDefP = await defaultsPhase(browser, REF_URL, state, "REF ", { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-defaults-desktop.json"), JSON.stringify(oursDef, null, 2));
    writeFileSync(join(OUT_DIR, "ref-defaults-desktop.json"), JSON.stringify(refDef, null, 2));
    writeFileSync(join(OUT_DIR, "ours-defaults-phone.json"), JSON.stringify(oursDefP, null, 2));
    writeFileSync(join(OUT_DIR, "ref-defaults-phone.json"), JSON.stringify(refDefP, null, 2));
    report.push("\n===== DEFAULTS TAB @1440x900 =====");
    report.push(`found: OURS ${oursDef.found} | REF ${refDef.found}`);
    report.push(`subtitle: OURS "${oursDef.subtitle}" | REF "${refDef.subtitle}"`);
    report.push(`labels: OURS [${oursDef.labels.join(" | ")}]`);
    report.push(`        REF  [${refDef.labels.join(" | ")}]`);
    for (let i = 0; i < Math.max(oursDef.combos.length, refDef.combos.length); i++) {
      const a = oursDef.combos[i];
      const b = refDef.combos[i];
      if (!a || !b) { report.push(`combo[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`combo[${i}] trigger "${a.triggerText}"/"${b.triggerText}" vocab OURS [${a.openVocab.join("/")}] | REF [${b.openVocab.join("/")}]`);
      report.push(`combo[${i}] highlighted "${a.highlightedText}"/"${b.highlightedText}" escapeClosed OURS ${a.escapeClosed} REF ${b.escapeClosed}`);
      report.push(...faceDelta(`combo[${i}].triggerFace`, a.triggerFace, b.triggerFace));
      report.push(...faceDelta(`combo[${i}].contentFace`, a.contentFace, b.contentFace));
      report.push(...faceDelta(`combo[${i}].highlightedFace`, a.highlightedFace, b.highlightedFace));
    }
    for (let i = 0; i < Math.max(oursDef.inputs.length, refDef.inputs.length); i++) {
      const a = oursDef.inputs[i];
      const b = refDef.inputs[i];
      if (!a || !b) { report.push(`defInput[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`defInput[${i}] "${a.placeholder}"(OURS)/"${b.placeholder}"(REF) value OURS "${a.value}" | REF "${b.value}"`);
      report.push(...faceDelta(`defInput[${i}]`, a.face, b.face));
    }
    report.push("\n===== DEFAULTS TAB @390x844 =====");
    report.push(`found: OURS ${oursDefP.found} | REF ${refDefP.found}`);
    for (let i = 0; i < Math.max(oursDefP.combos.length, refDefP.combos.length); i++) {
      const a = oursDefP.combos[i];
      const b = refDefP.combos[i];
      if (!a || !b) { report.push(`phoneCombo[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`phoneCombo[${i}] trigger "${a.triggerText}" vocab [${a.openVocab.join("/")}] | REF [${b.openVocab.join("/")}]`);
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk59] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk59] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk59] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk59]", e);
  process.exit(1);
});
