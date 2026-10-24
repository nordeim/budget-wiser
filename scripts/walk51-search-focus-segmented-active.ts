// Session-178 (walk51): THE TOPBAR SEARCH FOCUS + SETTINGS
// SEGMENTED-ACTIVE WALK — the two oldest unwalked OPEN/ACTIVE interiors
// the s177 close names, under the ADR-022 interior re-walk doctrine.
//
// What the standing legs already carry, and what they do NOT:
//   - the pixel sweeps carry the topbar's RESTING face on every page
//     (both viewports) — never the FOCUSED search input (focus-visible
//     fires only under REAL keyboard focus; the sweeps never focus it);
//   - the e2e topbar-search battery pins BEHAVIOR (fetch/abort/envelope)
//     — never the focus-state computed styles;
//   - the settings tabs' active pill is s125/s129-cured (the bg-white
//     literal + the retired ring-offset) but the ACTIVE-state element
//     ledger (geometry inside the track, the computed shadow/ink, the
//     click-activated transition) has never been walked in the ADR-022
//     form;
//   - the source pins pin the CONTRACT STRINGS, not the rendered states.
// The walk closes both gaps: dump both apps' focused-search and
// segmented-active DOMs + computed styles, diff, classify every delta
// (parity · documented genus · defect).
//
// Run: bun scripts/walk51-search-focus-segmented-active.ts
// (boots or reuses the dev server on :3000, DATABASE_URL guarded at the
// boot site; the reference rides the sweep-state storageState pair —
// ONE reference login, reused while fresh, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "@playwright/test";

import {
  preflightPairState,
  type SweepPairState,
} from "./sweep-state";

const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url)); // <repo>/scripts
    const root = resolve(here, "..");
    if (existsSync(join(root, "package.json"))) return root;
  } catch {
    /* fall through to the cwd */
  }
  return process.cwd();
})();
const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";
const OUT_DIR = join(REPO, "scripts", "walk51");

/** One ledger row — the element-level face the walk compares. */
interface LedgerRow {
  i: number;
  depth: number;
  tag: string;
  cls: string;
  role: string | null;
  aria: Record<string, string>;
  text: string;
  box: { x: number; y: number; w: number; h: number } | null;
}

/** The computed-style census — the focused/active states' ground truth
 * (the s129 highlighted-state lens form: computed styles, not classes). */
interface StyleCensus {
  boxShadow: string;
  borderColor: string;
  backgroundColor: string;
  color: string;
  caretColor: string;
  outlineWidth: string;
  outlineStyle: string;
  outlineColor: string;
  placeholderColor: string;
  fontWeight: string;
  ariaLabel: string | null;
  value: string;
}

interface SearchFace {
  resting: (StyleCensus & { box: LedgerRow["box"] }) | null;
  focused: (StyleCensus & { box: LedgerRow["box"] }) | null;
  focusOrigin: { tag: string; cls: string; ariaLabel: string | null } | null;
  icon: { cls: string; box: LedgerRow["box"]; color: string } | null;
  tabPresses: number;
  foundByPlaceholder: boolean;
  wrapperCls: string | null;
}

interface TabsFace {
  wrapperCls: string | null;
  tablistCls: string | null;
  tablistComputed: { backgroundColor: string; color: string } | null;
  triggers: Array<{
    cls: string;
    text: string;
    ariaSelected: string | null;
    dataState: string | null;
    tabindex: string | null;
    box: LedgerRow["box"];
    activeStyles: {
      backgroundColor: string;
      boxShadow: string;
      color: string;
      fontWeight: string;
    };
  }>;
  tablistBox: LedgerRow["box"];
  secondActivated: boolean;
}

/** The in-page style census (L-129c7: no outer-scope refs inside — the
 *  selector strings are passed as arguments and everything else is
 *  self-contained). */
async function censusStyles(
  page: Page,
  selector: string,
): Promise<(StyleCensus & { box: LedgerRow["box"] }) | null> {
  return page.evaluate(
    (sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return null;
      const cs = getComputedStyle(el);
      const ph = getComputedStyle(el, "::placeholder");
      const r = el.getBoundingClientRect();
      return {
        boxShadow: cs.boxShadow,
        borderColor: cs.borderColor,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        caretColor: cs.caretColor,
        outlineWidth: cs.outlineWidth,
        outlineStyle: cs.outlineStyle,
        outlineColor: cs.outlineColor,
        placeholderColor: ph.color,
        fontWeight: cs.fontWeight,
        ariaLabel: el.getAttribute("aria-label"),
        value: (el as HTMLInputElement).value ?? "",
        box: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
      };
    },
    selector,
  );
}

/** Phase A — the search focus state at 1440x900 (the search block is
 *  desktop-only). REAL keyboard focus: Tab from the page's natural tab
 *  origin until the search input holds focus (the honest focus-visible
 *  form — page.focus() would fire focus without :focus-visible on some
 *  engines and is never the walk's instrument). */
async function walkSearch(
  browser: Browser,
  base: string,
  storageState: SweepPairState,
  label: string,
): Promise<SearchFace> {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState,
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(2000);

  // Locate the search input: the s10-decoded placeholder first, the
  // header's text input as the construction-independent fallback.
  const byPlaceholder = await page
    .locator('input[placeholder="Search Anything..."]')
    .count();
  const foundByPlaceholder = byPlaceholder > 0;
  const inputSel = foundByPlaceholder
    ? 'input[placeholder="Search Anything..."]'
    : "header input[type='text'], header input:not([type])";
  if (!(await page.locator(inputSel).first().isVisible().catch(() => false))) {
    console.log(`[walk51] ${label} search input NOT FOUND — decoding required`);
    await ctx.close();
    return {
      resting: null,
      focused: null,
      focusOrigin: null,
      icon: null,
      tabPresses: -1,
      foundByPlaceholder,
      wrapperCls: null,
    };
  }

  const wrapperCls = await page.evaluate(
    (sel) => {
      const el = document.querySelector(sel);
      return el?.parentElement?.getAttribute("class") ?? null;
    },
    inputSel,
  );

  // The resting census (pre-focus — the s73 re-verification face).
  const resting = await censusStyles(page, inputSel);

  // The icon census (the absolute Search glyph).
  const icon = await page.evaluate(
    (sel) => {
      const wrap = document.querySelector(sel)?.parentElement;
      const svg = wrap?.querySelector("svg") ?? null;
      if (!svg) return null;
      const r = svg.getBoundingClientRect();
      return {
        cls: svg.getAttribute("class") ?? "",
        box: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        color: getComputedStyle(svg).color,
      };
    },
    inputSel,
  );

  // REAL keyboard focus: click the sidebar's neutral area first (a
  // known origin), then Tab until the search input holds focus.
  await page.mouse.click(12, 450); // the sidebar rail's neutral spot
  let tabPresses = 0;
  let focused = false;
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    tabPresses++;
    const isTarget = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el === document.activeElement;
    }, inputSel);
    if (isTarget) {
      focused = true;
      break;
    }
  }
  if (!focused) {
    console.log(
      `[walk51] ${label} search input never gained keyboard focus after ${tabPresses} tabs`,
    );
  }
  // transition-colors settle (150ms default) + the focus paint.
  await page.waitForTimeout(400);

  const focusOrigin = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const active = document.activeElement;
    return {
      tag: active?.tagName?.toLowerCase() ?? "?",
      cls: active?.getAttribute("class") ?? "",
      ariaLabel:
        el && el === active ? el.getAttribute("aria-label") : null,
    };
  }, inputSel);

  const focusedCensus = focused ? await censusStyles(page, inputSel) : null;

  console.log(
    `[walk51] ${label} search: placeholder=${foundByPlaceholder} tabs=${tabPresses} focused=${focused}`,
  );
  const face: SearchFace = {
    resting,
    focused: focusedCensus,
    focusOrigin,
    icon,
    tabPresses,
    foundByPlaceholder,
    wrapperCls,
  };
  await ctx.close();
  return face;
}

/** Phase B — the settings segmented tabs' active state, both viewports.
 *  The default-active tab AND the click-activated second tab (the
 *  active state is a STATE, not a static face). */
async function walkTabs(
  browser: Browser,
  base: string,
  storageState: SweepPairState,
  label: string,
  width: number,
  height: number,
): Promise<TabsFace> {
  const ctx = await browser.newContext({
    viewport: { width, height },
    storageState,
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(2000);

  const dump = async (): Promise<TabsFace> =>
    page.evaluate(() => {
      const tablist = document.querySelector('[role="tablist"]');
      if (!tablist) {
        return {
          wrapperCls: null,
          tablistCls: null,
          tablistComputed: null,
          triggers: [],
          tablistBox: null,
          secondActivated: false,
        };
      }
      const wrapperCls = tablist.parentElement?.getAttribute("class") ?? null;
      const lcs = getComputedStyle(tablist);
      const tablistComputed = {
        backgroundColor: lcs.backgroundColor,
        color: lcs.color,
      };
      const lr = tablist.getBoundingClientRect();
      const triggers = Array.from(
        tablist.querySelectorAll('[role="tab"]'),
      ).map((t) => {
        const el = t as HTMLElement;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          cls: el.getAttribute("class") ?? "",
          text: (el.textContent ?? "").trim(),
          ariaSelected: el.getAttribute("aria-selected"),
          dataState: el.getAttribute("data-state"),
          tabindex: el.getAttribute("tabindex"),
          box: {
            x: Math.round(r.x),
            y: Math.round(r.y),
            w: Math.round(r.width),
            h: Math.round(r.height),
          },
          activeStyles: {
            backgroundColor: cs.backgroundColor,
            boxShadow: cs.boxShadow,
            color: cs.color,
            fontWeight: cs.fontWeight,
          },
        };
      });
      return {
        wrapperCls,
        tablistCls: tablist.getAttribute("class") ?? "",
        tablistComputed,
        triggers,
        tablistBox: {
          x: Math.round(lr.x),
          y: Math.round(lr.y),
          w: Math.round(lr.width),
          h: Math.round(lr.height),
        },
        secondActivated: false,
      };
    });

  const before = await dump();
  // The DEFAULT state's tabindex face rides the ledger too (the s23
  // roving-tabindex superset is a DEFAULT-state face — the pre-click
  // census is the walk's own evidence, never discarded).

  // Click the SECOND trigger (the state transition is part of the face).
  const second = page.locator('[role="tab"]').nth(1);
  let secondActivated = false;
  if (await second.isVisible().catch(() => false)) {
    await second.click();
    await page.waitForTimeout(400); // transition-all settle
    secondActivated = true;
  }
  const after = await dump();

  console.log(
    `[walk51] ${label} tabs@${width}: triggers=${after.triggers.length} secondActivated=${secondActivated} defaultTabIndex=[${before.triggers.map((t) => t.tabindex).join(",")}]`,
  );
  const face: TabsFace = { ...after, secondActivated };
  await ctx.close();
  return face;
}

/** The diff reporters — face-against-face, both phases. */
function diffSearch(ours: SearchFace, ref: SearchFace): string[] {
  const lines: string[] = [];
  const cmp = (
    a: StyleCensus & { box: LedgerRow["box"] } | null,
    b: StyleCensus & { box: LedgerRow["box"] } | null,
    phase: string,
  ) => {
    if (!a || !b) {
      lines.push(`SEARCH ${phase}: presence ${a ? "OURS-only" : "REF-only"}`);
      return;
    }
    for (const k of [
      "boxShadow",
      "borderColor",
      "backgroundColor",
      "color",
      "caretColor",
      "outlineWidth",
      "outlineStyle",
      "outlineColor",
      "placeholderColor",
      "fontWeight",
    ] as const) {
      if (a[k] !== b[k]) {
        lines.push(`SEARCH ${phase}.${k}: OURS "${a[k]}" vs REF "${b[k]}"`);
      }
    }
    if (a.ariaLabel !== b.ariaLabel) {
      lines.push(`SEARCH ${phase}.ariaLabel: OURS "${a.ariaLabel}" vs REF "${b.ariaLabel}"`);
    }
    if (a.box && b.box && (a.box.w !== b.box.w || a.box.h !== b.box.h || Math.abs(a.box.y - b.box.y) > 1)) {
      lines.push(`SEARCH ${phase}.box: OURS ${JSON.stringify(a.box)} vs REF ${JSON.stringify(b.box)}`);
    }
  };
  cmp(ours.resting, ref.resting, "resting");
  cmp(ours.focused, ref.focused, "focused");
  if (ours.icon && ref.icon) {
    if (ours.icon.color !== ref.icon.color) {
      lines.push(`SEARCH icon.color: OURS "${ours.icon.color}" vs REF "${ref.icon.color}"`);
    }
    const oi = ours.icon.box;
    const ri = ref.icon.box;
    if (oi && ri && (oi.w !== ri.w || oi.h !== ri.h)) {
      lines.push(`SEARCH icon.box: OURS ${JSON.stringify(oi)} vs REF ${JSON.stringify(ri)}`);
    }
  } else {
    lines.push(`SEARCH icon: presence ${ours.icon ? "OURS-only" : "REF-only"}`);
  }
  if (ours.foundByPlaceholder !== ref.foundByPlaceholder) {
    lines.push(
      `SEARCH locator: OURS foundByPlaceholder=${ours.foundByPlaceholder} vs REF ${ref.foundByPlaceholder}`,
    );
  }
  if (ours.wrapperCls && ref.wrapperCls && ours.wrapperCls !== ref.wrapperCls) {
    lines.push(`SEARCH wrapperCls: OURS "${ours.wrapperCls}" vs REF "${ref.wrapperCls}"`);
  }
  return lines;
}

function diffTabs(ours: TabsFace, ref: TabsFace, axis: string): string[] {
  const lines: string[] = [];
  if (ours.tablistCls !== ref.tablistCls) {
    lines.push(`TABS ${axis}.tablistCls: OURS "${ours.tablistCls}" vs REF "${ref.tablistCls}"`);
  }
  const oc = ours.tablistComputed;
  const rc = ref.tablistComputed;
  if (oc && rc && (oc.backgroundColor !== rc.backgroundColor || oc.color !== rc.color)) {
    lines.push(
      `TABS ${axis}.tablistComputed: OURS ${JSON.stringify(oc)} vs REF ${JSON.stringify(rc)}`,
    );
  }
  if (ours.wrapperCls !== ref.wrapperCls) {
    lines.push(`TABS ${axis}.wrapperCls: OURS "${ours.wrapperCls}" vs REF "${ref.wrapperCls}"`);
  }
  const ob = ours.tablistBox;
  const rb = ref.tablistBox;
  if (ob && rb && (ob.h !== rb.h || ob.w !== rb.w)) {
    lines.push(`TABS ${axis}.tablistBox: OURS ${JSON.stringify(ob)} vs REF ${JSON.stringify(rb)}`);
  }
  const n = Math.max(ours.triggers.length, ref.triggers.length);
  for (let i = 0; i < n; i++) {
    const a = ours.triggers[i];
    const b = ref.triggers[i];
    if (!a || !b) {
      lines.push(`TABS ${axis} trigger ${i}: only ${a ? "OURS" : "REF"}`);
      continue;
    }
    if (a.text !== b.text) lines.push(`TABS ${axis} trigger ${i}.text: "${a.text}" vs "${b.text}"`);
    if (a.cls !== b.cls) {
      lines.push(`TABS ${axis} trigger ${i}.CLASS:`);
      lines.push(`    OURS cls: ${a.cls}`);
      lines.push(`    REF  cls: ${b.cls}`);
    }
    if (a.ariaSelected !== b.ariaSelected)
      lines.push(`TABS ${axis} trigger ${i}.aria-selected: ${a.ariaSelected} vs ${b.ariaSelected}`);
    if (a.dataState !== b.dataState)
      lines.push(`TABS ${axis} trigger ${i}.data-state: ${a.dataState} vs ${b.dataState}`);
    if (a.tabindex !== b.tabindex)
      lines.push(`TABS ${axis} trigger ${i}.tabindex: ${a.tabindex} vs ${b.tabindex}`);
    const da = a.dataState === "active" ? a : null;
    const db = b.dataState === "active" ? b : null;
    if (da && db) {
      for (const k of ["backgroundColor", "boxShadow", "color", "fontWeight"] as const) {
        if (da.activeStyles[k] !== db.activeStyles[k]) {
          lines.push(
            `TABS ${axis} trigger ${i}.active.${k}: OURS "${da.activeStyles[k]}" vs REF "${db.activeStyles[k]}"`,
          );
        }
      }
    }
    if (a.box && b.box && (a.box.w !== b.box.w || a.box.h !== b.box.h || Math.abs(a.box.y - b.box.y) > 1)) {
      lines.push(`TABS ${axis} trigger ${i}.box: OURS ${JSON.stringify(a.box)} vs REF ${JSON.stringify(b.box)}`);
    }
  }
  return lines;
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

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk51] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], {
      cwd: REPO,
      env: devEnv,
      stdio: "ignore",
      detached: true,
    });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    // the pair state (the s162 login consolidation): ONE reference
    // login, reused while fresh — preflightPairState is the guarded
    // self-heal (cached-fresh probe → reuse; any miss → the login
    // pair, re-derived and saved)
    const storageState = await preflightPairState(browser);
    console.log("[walk51] pair state: ready (the s162 guarded form)");

    console.log("[walk51] === PHASE A: the topbar search focus state ===");
    const oursSearch = await walkSearch(browser, OUR_URL, storageState, "OURS");
    const refSearch = await walkSearch(browser, REF_URL, storageState, "REF ");

    console.log("[walk51] === PHASE B: the settings segmented active state ===");
    const oursTabsD = await walkTabs(browser, OUR_URL, storageState, "OURS", 1440, 900);
    const refTabsD = await walkTabs(browser, REF_URL, storageState, "REF ", 1440, 900);
    const oursTabsP = await walkTabs(browser, OUR_URL, storageState, "OURS", 390, 844);
    const refTabsP = await walkTabs(browser, REF_URL, storageState, "REF ", 390, 844);

    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(
      join(OUT_DIR, "ours-search-ledger.json"),
      JSON.stringify(oursSearch, null, 2),
    );
    writeFileSync(
      join(OUT_DIR, "ref-search-ledger.json"),
      JSON.stringify(refSearch, null, 2),
    );
    writeFileSync(
      join(OUT_DIR, "ours-tabs-ledger.json"),
      JSON.stringify({ desktop: oursTabsD, phone: oursTabsP }, null, 2),
    );
    writeFileSync(
      join(OUT_DIR, "ref-tabs-ledger.json"),
      JSON.stringify({ desktop: refTabsD, phone: refTabsP }, null, 2),
    );

    const deltas = [
      ...diffSearch(oursSearch, refSearch),
      ...diffTabs(oursTabsD, refTabsD, "desktop"),
      ...diffTabs(oursTabsP, refTabsP, "phone"),
    ];
    console.log(`\n[walk51] DELTA CENSUS: ${deltas.length} faces disagree`);
    for (const line of deltas) console.log(line);
    console.log(
      `\n[walk51] ledgers saved: ${join(OUT_DIR, "{ours,ref}-{search,tabs}-ledger.json")}`,
    );
    console.log("[walk51] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk51]", e);
  process.exit(1);
});
