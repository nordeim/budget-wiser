// Session-184 (walk57): THE ACTIVITIES MORE-FILTERS TOGGLE +
// RAIL-ACTIONS OPEN-STATE INTERIOR WALK — the two-app element-level DOM
// ledger of the activities filter rail's OPEN/HOVER states, the
// coverage the s388 close names second (the variant-flip-family
// candidate: "the activities More-Filters toggle's OPEN face — the same
// variant-flip family the D-183a1 find rode, the one other
// variant-flipping trigger in the app"). The s388 close's first-named
// candidate (the Edit-family dialogs' focus faces) is KILLED BY THE
// DISCOVERY (scripts/discover-184.ts): the reference carries ZERO rows
// on /contacts, /leads, /accounts and ZERO calendar chips — the
// W7/wce/Mke edit dialogs have no trigger there, the two-app ledger
// has no REF arm; documented in the plan §0 with the census.
//
// What the standing legs already carry, and what they do NOT:
//   - the e2e battery pins OUR rail BEHAVIOR (the s125 filtered-basis
//     cascade + the s109 phone-surface rail-absence pin) — never the
//     two-app OPEN/HOVER ledger;
//   - the a11y two-gate scans the CLOSED surfaces — violations only;
//   - the drift sweeps carry PIXELS of the resting rail — never the
//     computed faces, the reveal interior, or the hover state;
//   - walk53/55 froze the Select chrome + walk56 the Popover chrome —
//     the rail's own arms (the expander + the action pair) never;
//   - NO walk has EVER driven the MOUSE-HOVER face (every standing
//     walk drives the REAL keyboard only) — the reference's hover wash
//     rgb(245,245,245)/rgb(23,23,23) first surfaced in the discovery.
// The walk closes the family gap: hover + click the expander on both
// apps at the desktop axis (the rail is display:none below lg — the
// s109 pin; the phone leg the absence census), dump the reveal
// interior element-against-element (tag · class · role/aria · text ·
// geometry) + the computed faces RESTING/HOVER/OPEN + the REAL
// keyboard Tab chain through the closed AND open rails, diff the
// ledgers, classify every delta per the genus register (plan §WP-2).
//
// The discovery probe's contract (scripts/discover-184.ts, the
// calibration): the trigger RESTING byte-equal (`1113,692 270x36`, bg
// white, border 1px rgb(229,229,229)); OURS reveals More Types |
// Task | Note (the functional superset, the s125 fix-over-defect
// doctrine); the reference the DEAD STUB (labels 8 → 8 — the L-125c2
// doctrine re-verified live); OURS stays OUTLINE post-click (no
// variant flip — the D-183a1 same-family check passes on this
// trigger); the Filter primary BYTE-EQUAL BLUE rgb(37,99,235) on both
// (the reference's explicit CTA classes; no defect); the Save All
// ghost byte-equal.
//
// Run: bun scripts/walk57-activities-rail-open.ts
// (reuses the dev server on :3000, DATABASE_URL guarded at the boot
// site; the reference rides the sweep-state storageState pair — ONE
// reference login, reused while fresh, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "@playwright/test";

import { preflightPairState, type SweepPairState } from "./sweep-state";

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
const OUT_DIR = join(REPO, "scripts", "walk57");

// (the walk50 row shape — repeated plainly; structural types keep the
// in-page collector and the Node side in sync)
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

/** The computed face — the effective-layer style probe (the walk51-56
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

interface ExpanderResult {
  resting: Face | null;
  hovered: Face | null;
  hoveredBox: string;
  unhovered: Face | null;
  postClick: Face | null;
  ariaExpanded: string;
  revealedLabels: string[];
  preLabels: string[];
  revealInterior: Row[] | null;
  toggleBackLabels: number;
  deadStub: boolean;
}

interface TabResult {
  closedStops: string[];
  openStops: string[];
}

interface RailResult {
  saveAllFace: Face | null;
  saveAllBox: string;
  filterFace: Face | null;
  filterBox: string;
  ownerTriggerFace: Face | null;
  statusTriggerFace: Face | null;
  ownerOptions: string[];
  statusOptions: string[];
}

interface PhoneResult {
  railButtons: number;
  moreFilters: number;
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

async function faceOf(page: Page, selector: string): Promise<Face | null> {
  return page.evaluate(
    (sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
      };
    },
    selector,
  );
}

async function dumpLedger(page: Page, rootSelector: string): Promise<Row[] | null> {
  return page.evaluate(
    ({ sel }) => {
      const root = document.querySelector(sel);
      if (!root) return null;
      const rows: Array<{
        i: number; depth: number; tag: string; cls: string;
        role: string | null; aria: Record<string, string>; text: string;
        box: { x: number; y: number; w: number; h: number } | null;
      }> = [];
      const collect = (el: Element, depth: number) => {
        const aria: Record<string, string> = {};
        for (const attr of Array.from(el.attributes)) {
          if (
            attr.name.startsWith("aria-") ||
            attr.name === "data-state" ||
            attr.name === "data-highlighted" ||
            attr.name === "data-radix-collection-item"
          ) {
            aria[attr.name] = attr.value;
          }
        }
        const text = Array.from(el.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => (n.textContent ?? "").trim())
          .join(" ")
          .trim()
          .slice(0, 60);
        const r = el.getBoundingClientRect();
        rows.push({
          i: rows.length,
          depth,
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute("class") ?? "").trim(),
          role: el.getAttribute("role"),
          aria,
          text,
          box: {
            x: Math.round(r.x),
            y: Math.round(r.y),
            w: Math.round(r.width),
            h: Math.round(r.height),
          },
        });
        for (const child of Array.from(el.children)) collect(child, depth + 1);
      };
      collect(root, 0);
      return rows;
    },
    { sel: rootSelector },
  );
}

/** Phase A — the More-Filters expander: RESTING → HOVER (the genuine
 * first-walk mouse-borne face) → unhover → CLICK (the reveal) →
 * interior ledger → toggle-back. The reference's arm: the same drive
 * (the dead stub re-verification — the click must do NOTHING). */
async function expanderPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
): Promise<ExpanderResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const trigger = page.locator("main button", { hasText: "More Filters" }).first();
  const resting = await faceOfLocator(trigger);
  const restingAria = await trigger.getAttribute("aria-expanded").catch(() => null);

  // THE HOVER — the mouse-borne face, settle 400ms (the transition-
  // colors 150ms + the discovery's live-verified wash)
  await trigger.hover();
  await page.waitForTimeout(400);
  const hovered = await faceOfLocator(trigger);
  const hoveredBox = await trigger.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
  });

  // unhover — mouse far away (the topbar's dead search field zone)
  await page.mouse.move(700, 20);
  await page.waitForTimeout(400);
  const unhovered = await faceOfLocator(trigger);

  // pre-click label census
  const preLabels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main label"))
      .map((l) => (l.textContent ?? "").trim())
      .filter(Boolean)
      .slice(0, 24),
  );

  // THE CLICK — ours reveals the Task/Note group; the reference's
  // dead stub does nothing
  await trigger.click();
  await page.waitForTimeout(700);
  const postClick = await faceOfLocator(trigger);
  const ariaExpanded = (await trigger.getAttribute("aria-expanded").catch(() => null)) ?? "(none)";

  // the reveal census: the label ledger + the revealed group's
  // interior (locate the "More Types" label's field div)
  const revealedLabels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main label"))
      .map((l) => (l.textContent ?? "").trim())
      .filter(Boolean)
      .slice(0, 24),
  );
  const revealInterior: Row[] | null = await page.evaluate(() => {
    const label = Array.from(document.querySelectorAll("main label")).find((l) =>
      (l.textContent ?? "").trim() === "More Types",
    );
    if (!label) return null;
    let group: Element = label;
    for (let i = 0; i < 2 && group.parentElement; i++) group = group.parentElement;
    const rows: Array<{
      i: number; depth: number; tag: string; cls: string;
      role: string | null; aria: Record<string, string>; text: string;
      box: { x: number; y: number; w: number; h: number } | null;
    }> = [];
    const collect = (el: Element, depth: number) => {
      const aria: Record<string, string> = {};
      for (const attr of Array.from(el.attributes)) {
        if (
          attr.name.startsWith("aria-") ||
          attr.name === "data-state" ||
          attr.name === "data-highlighted" ||
          attr.name === "data-radix-collection-item"
        ) {
          aria[attr.name] = attr.value;
        }
      }
      const text = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => (n.textContent ?? "").trim())
        .join(" ")
        .trim()
        .slice(0, 60);
      const r = el.getBoundingClientRect();
      rows.push({
        i: rows.length,
        depth,
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute("class") ?? "").trim(),
        role: el.getAttribute("role"),
        aria,
        text,
        box: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
      });
      for (const child of Array.from(el.children)) collect(child, depth + 1);
    };
    collect(group, 0);
    return rows;
  });

  // toggle-back on ours (the functional round-trip)
  await trigger.click().catch(() => undefined);
  await page.waitForTimeout(400);
  const backLabels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main label"))
      .map((l) => (l.textContent ?? "").trim())
      .filter(Boolean).length,
  );

  console.log(
    `[walk57] ${label} expander: hovered ${hovered ? `bg=${hovered.bg}` : "MISSING"} · post-click expanded=${ariaExpanded} · labels ${preLabels.length}->${revealedLabels.length} · back=${backLabels}`,
  );
  await ctx.close();
  return {
    resting,
    hovered,
    hoveredBox,
    unhovered,
    postClick,
    ariaExpanded,
    preLabels,
    revealedLabels,
    revealInterior: revealInterior as Row[] | null,
    toggleBackLabels: backLabels,
    deadStub: revealedLabels.length === preLabels.length,
  };
}

/** Phase B — the REAL keyboard Tab drive: the CLOSED-rail chain on
 * both apps, then OURS-OPEN chain (the Task/Note checkboxes enter the
 * order on ours; the reference's rail is static — its dead expander
 * never changes the chain). */
async function tabPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  openRail: boolean,
): Promise<TabResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  if (openRail) {
    await page.locator("main button", { hasText: "More Filters" }).first().click();
    await page.waitForTimeout(500);
    // reset the sequential-navigation starting point — blur() is NOT
    // enough: Chromium's Tab drive starts from the last-focused
    // element's position even after the blur (the debug-proved
    // starting-point rule; the walk's own discovery); the blank-spot
    // click at (700,250) — the KPI area — moves the starting point
    // ahead of the rail so the forward walk covers the full chain
    // (the pre-rail stops carry the DATA-STATE genus — the seeded
    // timeline toggles ours carries, the zero-data reference's none —
    // the rail-scope slice handles the comparison)
    await page.mouse.click(700, 250);
    await page.waitForTimeout(200);
  }

  // drive the chain from the page body with successive Tabs,
  // capturing every stop's tag + text (+ the in-rail ring slot
  // count); the rail scope: from its first control (Save All)
  const driveChain = async (maxTabs: number): Promise<string[]> => {
    const stops: string[] = [];
    for (let t = 0; t < maxTabs; t++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(180);
      const stop = await page.evaluate(() => {
        const ae = document.activeElement;
        if (!ae) return "?";
        const inRail = !!ae.closest('div[class*="space-y-4"]');
        const cs = getComputedStyle(ae as HTMLElement);
        const face = inRail
          ? ` bg=${cs.backgroundColor} ring=${cs.boxShadow.split("rgba").length - 1}slots`
          : "";
        return `${ae.tagName}/${(ae.textContent ?? "").trim().slice(0, 18) || ae.getAttribute("aria-label") || "(no text)"}${face}`;
      });
      stops.push(stop);
      if (stop.startsWith("BUTTON") && /Filter\b/.test(stop) && !/More/.test(stop)) {
        // the Filter primary is the rail's LAST stop — the chain end
        break;
      }
    }
    return stops;
  };

  const stops = await driveChain(90);
  // NOTE: the chain runs from the page start; keep only the stops at/
  // after the rail's own first control (Save All) for the census
  const saveAllIdx = stops.findIndex((s) => s.includes("Save All"));
  const railStops = saveAllIdx >= 0 ? stops.slice(saveAllIdx) : stops;
  console.log(
    `[walk57] ${label} tab-chain${openRail ? " (OPEN)" : ""}: ${railStops.length} rail stops [${railStops.map((s) => s.split(" bg=")[0]).join(" → ")}]`,
  );
  await ctx.close();
  return { closedStops: railStops, openStops: [] };
}

/** Phase C — the rail's action pair + the select triggers' faces. */
async function railPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
): Promise<RailResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const census = await page.evaluate(() => {
    const face = (el: Element) => {
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
    };
    const box = (el: Element) => {
      const r = el.getBoundingClientRect();
      return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
    };
    const saveAll = Array.from(document.querySelectorAll("main button")).find((b) =>
      (b.textContent ?? "").trim() === "Save All",
    );
    const filter = Array.from(document.querySelectorAll("main button")).find((b) =>
      (b.textContent ?? "").trim() === "Filter",
    );
    const triggers = Array.from(document.querySelectorAll('main button[role="combobox"]'));
    const ownerTrigger = triggers[0] ?? null;
    const statusTrigger = triggers[1] ?? null;
    return {
      saveAllFace: saveAll ? face(saveAll) : null,
      saveAllBox: saveAll ? box(saveAll) : "MISSING",
      filterFace: filter ? face(filter) : null,
      filterBox: filter ? box(filter) : "MISSING",
      ownerTriggerFace: ownerTrigger ? face(ownerTrigger) : null,
      statusTriggerFace: statusTrigger ? face(statusTrigger) : null,
    };
  });

  // the select VOCABULARIES (the data-borne arm — ours: All Owners +
  // the 3 users; the reference: All Owners alone at zero-data)
  const ownerOptions = await page
    .locator('main button[role="combobox"]')
    .nth(0)
    .click()
    .then(() => page.waitForTimeout(600))
    .then(() =>
      page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim()),
      ),
    )
    .catch(() => [] as string[]);
  await page.keyboard.press("Escape").catch(() => undefined);
  await page.waitForTimeout(300);
  const statusOptions = await page
    .locator('main button[role="combobox"]')
    .nth(1)
    .click()
    .then(() => page.waitForTimeout(600))
    .then(() =>
      page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim()),
      ),
    )
    .catch(() => [] as string[]);
  await page.keyboard.press("Escape").catch(() => undefined);

  console.log(
    `[walk57] ${label} rail: SaveAll ${census.saveAllBox} · Filter ${census.filterBox} bg=${census.filterFace?.bg ?? "?"} · owner opts [${ownerOptions.join("/")}] · status opts [${statusOptions.join("/")}]`,
  );
  await ctx.close();
  return { ...census, ownerOptions, statusOptions };
}

/** The phone-axis absence census — the rail is display:none below lg
 * (the s109 pin): the walk re-verifies the absence on both apps. */
async function phonePhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
): Promise<PhoneResult> {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("main button"));
    const more = buttons.filter((b) => (b.textContent ?? "").includes("More Filters"));
    const moreVisible = more.filter((b) => {
      const cs = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return cs.display !== "none" && cs.visibility !== "hidden" && r.width > 0 && r.height > 0;
    });
    const visible = buttons.filter((b) => {
      const cs = getComputedStyle(b);
      return cs.display !== "none" && cs.visibility !== "hidden" && b.getBoundingClientRect().width > 0;
    });
    return { railButtons: visible.length, moreFilters: moreVisible.length };
  });
  console.log(`[walk57] ${label} phone@390: visible buttons=${census.railButtons} more-filters=${census.moreFilters}`);
  await ctx.close();
  return census;
}

function faceDelta(name: string, a: Face | null, b: Face | null): string[] {
  const out: string[] = [];
  if (!a || !b) {
    out.push(`${name}: presence ${JSON.stringify(!!a)}/${JSON.stringify(!!b)}`);
    return out;
  }
  for (const k of Object.keys(a) as Array<keyof Face>) {
    if (a[k] !== b[k]) out.push(`${name}.${k}: OURS ${a[k]} | REF ${b[k]}`);
  }
  return out;
}

function diffRows(name: string, ours: Row[] | null, ref: Row[] | null): string[] {
  const lines: string[] = [];
  if (!ours || !ref) {
    lines.push(`${name}: ledger presence OURS ${ours?.length ?? "null"} / REF ${ref?.length ?? "null"}`);
    return lines;
  }
  const n = Math.max(ours.length, ref.length);
  for (let i = 0; i < n; i++) {
    const a = ours[i];
    const b = ref[i];
    if (!a || !b) {
      lines.push(`${name} ROW ${i}: only ${a ? "OURS" : "REF"} — ${JSON.stringify(a ?? b)}`);
      continue;
    }
    const tags: string[] = [];
    if (a.tag !== b.tag) tags.push(`tag ${a.tag}/${b.tag}`);
    if (a.cls !== b.cls) tags.push("CLASS");
    if ((a.role ?? "") !== (b.role ?? "")) tags.push(`role ${a.role}/${b.role}`);
    const aAria = JSON.stringify(a.aria);
    const bAria = JSON.stringify(b.aria);
    if (aAria !== bAria) tags.push("ARIA");
    if (a.text !== b.text) tags.push(`text "${a.text}"/"${b.text}"`);
    if (a.box && b.box) {
      const dw = Math.abs(a.box.w - b.box.w);
      const dh = Math.abs(a.box.h - b.box.h);
      const dy = Math.abs(a.box.y - b.box.y);
      if (dw > 1 || dh > 1 || dy > 1) tags.push(`box ${JSON.stringify(a.box)}/${JSON.stringify(b.box)}`);
    } else if (!!a.box !== !!b.box) {
      tags.push("box presence");
    }
    if (tags.length) {
      lines.push(
        `${name} ROW ${i} (depth ${a.depth} ${a.tag}${a.role ? ` role=${a.role}` : ""}): ${tags.join(" | ")}`,
      );
      if (tags.includes("CLASS")) {
        lines.push(`    OURS cls: ${a.cls}`);
        lines.push(`    REF  cls: ${b.cls}`);
      }
      if (tags.includes("ARIA")) {
        lines.push(`    OURS aria: ${aAria}`);
        lines.push(`    REF  aria: ${bAria}`);
      }
    }
  }
  return lines;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk57] reusing the dev server on :3000");
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
    const state = await preflightPairState(browser);
    console.log("[walk57] pair state: ready (the s162 guarded form)");

    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    // Phase A — the expander (hover + click + reveal)
    const oursA = await expanderPhase(browser, OUR_URL, state, "OURS");
    const refA = await expanderPhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-expander.json"), JSON.stringify(oursA, null, 2));
    writeFileSync(join(OUT_DIR, "ref-expander.json"), JSON.stringify(refA, null, 2));
    report.push("\n===== EXPANDER(more-filters) @1440x900 =====");
    report.push(`hoveredBox: OURS ${oursA.hoveredBox} | REF ${refA.hoveredBox}`);
    report.push(`ariaExpanded(post-click): OURS ${oursA.ariaExpanded} | REF ${refA.ariaExpanded}`);
    report.push(
      `labels: OURS ${oursA.preLabels.length} -> ${oursA.revealedLabels.length} (dead=${oursA.deadStub}) | REF ${refA.preLabels.length} -> ${refA.revealedLabels.length} (dead=${refA.deadStub})`,
    );
    report.push(`OURS revealed: [${oursA.revealedLabels.filter((l) => !oursA.preLabels.includes(l)).join(", ")}]`);
    report.push(`REF revealed: [${refA.revealedLabels.filter((l) => !refA.preLabels.includes(l)).join(", ")}]`);
    report.push(`OURS toggle-back labels: ${oursA.toggleBackLabels}`);
    report.push(...faceDelta("resting", oursA.resting, refA.resting));
    report.push(...faceDelta("HOVERED", oursA.hovered, refA.hovered));
    report.push(...faceDelta("unhovered", oursA.unhovered, refA.unhovered));
    report.push(...faceDelta("postClick", oursA.postClick, refA.postClick));

    // Phase B — the REAL keyboard Tab chains (closed on both; open on ours)
    const oursClosed = await tabPhase(browser, OUR_URL, state, "OURS", false);
    const refClosed = await tabPhase(browser, REF_URL, state, "REF ", false);
    const oursOpen = await tabPhase(browser, OUR_URL, state, "OURS", true);
    writeFileSync(join(OUT_DIR, "ours-tab.json"), JSON.stringify({ oursClosed, oursOpen }, null, 2));
    writeFileSync(join(OUT_DIR, "ref-tab.json"), JSON.stringify({ refClosed }, null, 2));
    report.push("\n===== TAB-CHAIN @1440x900 =====");
    report.push(
      `closed: OURS ${oursClosed.closedStops.length} stops | REF ${refClosed.closedStops.length} stops`,
    );
    report.push(
      `ours-open: ${oursOpen.closedStops.length} stops (the Task/Note checkboxes enter the order)`,
    );
    const norm = (s: string[]) => s.map((x) => x.split(" bg=")[0]);
    const oC = norm(oursClosed.closedStops);
    const rC = norm(refClosed.closedStops);
    if (JSON.stringify(oC) !== JSON.stringify(rC)) {
      report.push(`CHAIN DELTA (closed): OURS [${oC.join(" → ")}] | REF [${rC.join(" → ")}]`);
    } else {
      report.push(`CHAIN (closed): IDENTICAL [${oC.join(" → ")}]`);
    }
    const oO = norm(oursOpen.closedStops);
    report.push(`OURS OPEN chain: [${oO.join(" → ")}]`);

    // Phase C — the rail's action pair + selects
    const oursC = await railPhase(browser, OUR_URL, state, "OURS");
    const refC = await railPhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-rail.json"), JSON.stringify(oursC, null, 2));
    writeFileSync(join(OUT_DIR, "ref-rail.json"), JSON.stringify(refC, null, 2));
    report.push("\n===== RAIL(actions+selects) @1440x900 =====");
    report.push(`saveAllBox: OURS ${oursC.saveAllBox} | REF ${refC.saveAllBox}`);
    report.push(`filterBox: OURS ${oursC.filterBox} | REF ${refC.filterBox}`);
    report.push(`ownerOptions: OURS [${oursC.ownerOptions.join("/")}] | REF [${refC.ownerOptions.join("/")}]`);
    report.push(`statusOptions: OURS [${oursC.statusOptions.join("/")}] | REF [${refC.statusOptions.join("/")}]`);
    report.push(...faceDelta("saveAllFace", oursC.saveAllFace, refC.saveAllFace));
    report.push(...faceDelta("filterFace", oursC.filterFace, refC.filterFace));
    report.push(...faceDelta("ownerTriggerFace", oursC.ownerTriggerFace, refC.ownerTriggerFace));
    report.push(...faceDelta("statusTriggerFace", oursC.statusTriggerFace, refC.statusTriggerFace));

    // Phase D — the phone-axis absence census
    const oursP = await phonePhase(browser, OUR_URL, state, "OURS");
    const refP = await phonePhase(browser, REF_URL, state, "REF ");
    report.push("\n===== PHONE(absence) @390x844 =====");
    report.push(`more-filters: OURS ${oursP.moreFilters} | REF ${refP.moreFilters} (rail display:none below lg)`);

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk57] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk57] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk57] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk57]", e);
  process.exit(1);
});
