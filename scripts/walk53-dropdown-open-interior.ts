// Session-180 (walk53): THE DROPDOWN/SELECT OPEN-STATE INTERIOR WALK —
// the two-app element-level DOM ledger of the OPEN states the standing
// legs never see, the coverage gap the s380 close names first (the
// s379 close's own second arm).
//
// What the standing legs already carry, and what they do NOT:
//   - the e2e battery pins BEHAVIOR (the account-menu role=menu + the
//     Profile/Logout menuitems + the s113 mount-focus freeze, S13-P4/
//     D-113a3) — never the OPEN element ledger;
//   - the s133/s136 lenses spot-checked two family pages' select
//     triggers (accounts density, leads saved-views) — the settings
//     Defaults select OPEN state was never walked (the s137 lens
//     covered the picklist editor + the Defaults resting ink only);
//   - the a11y two-gate scans violations, the captures pin VISUAL,
//     the source pins pin the CONTRACT STRINGS.
// The walk closes that gap: open each surface on both apps, dump the
// OPEN DOMs element-against-element (tag · class · role/aria · text ·
// geometry) + the computed faces of the trigger/content/items RESTING
// and KEYBOARD-HIGHLIGHTED (the REAL key drive — data-highlighted
// fires under real keyboard focus, which no sweep drives), diff the
// ledgers, classify every delta per the genus register (plan §WP-2).
//
// The surfaces (the discovery probe's contract, scripts/discover-180):
//   Phase A — the account-menu: the topbar trigger
//   `button[aria-haspopup="menu"]` (OURS carries the kept aria-label
//   superset; the reference's trigger carries NONE — the same
//   accessible-name genus as the s125/s129 lenses) → the [role="menu"]
//   content → the Profile/Logout menuitems.
//   Phase B — the settings Defaults "Default Calendar View" select:
//   the combobox (OURS #def-calview; the reference id-less — located
//   by its rendered "Month" value, the byte-equal geometry probe) →
//   the [role="listbox"] content → the Month/Week options
//   (the M-72c3-decoded vocabulary).
// Both phases at BOTH axes (1440x900 + 390x844 — both surfaces exist
// at phone width; the s106 settings-mobile + the drawer battery guard
// the closed pages there, the OPEN interiors were never walked).
//
// Run: bun scripts/walk53-dropdown-open-interior.ts
// (reuses the dev server on :3000, DATABASE_URL guarded at the boot
// site; the reference rides the sweep-state storageState pair — ONE
// reference login, reused while fresh, the s162 doctrine.)
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
const OUT_DIR = join(REPO, "scripts", "walk53");

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

/** The computed face — the effective-layer style probe (the walk51/52
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

async function faceOf(page: Page, selector: string): Promise<Face | null> {
  return page.evaluate((sel) => {
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
  }, selector);
}

interface PhaseResult {
  triggerResting: Face | null;
  triggerOpen: Face | null;
  content: Face | null;
  rows: Row[] | null;
  itemResting: Face | null;
  itemHighlighted: Face | null;
  activeAfterOpen: string;
  highlightAfterKey: string;
}

/** Phase A — the account-menu OPEN (dropdown proper). */
async function phaseA(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  width: number,
  height: number,
): Promise<PhaseResult> {
  const ctx = await browser.newContext({ viewport: { width, height }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/Dashboard`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const trigger = page.locator('button[aria-haspopup="menu"]');
  const triggerFace = await faceOf(page, 'button[aria-haspopup="menu"]');
  await trigger.click();
  await page.waitForTimeout(700); // the 200ms-in zoom/fade + settle

  const content = await faceOf(page, '[role="menu"]');
  const rows = await dumpLedger(page, '[role="menu"]');
  const activeAfterOpen = await page.evaluate(
    () =>
      `${document.activeElement?.tagName ?? "?"}/${document.activeElement?.getAttribute("role") ?? ""}` +
      `/cls=${(document.activeElement?.getAttribute("class") ?? "").slice(0, 50)}`,
  );

  // the REAL keyboard drive: ArrowDown from the mount-focused content —
  // Radix's highlight rides real keyboard focus (the D-113a3 decoded
  // form; no synthetic hover paints data-highlighted).
  const itemSel = '[role="menuitem"]';
  const firstResting = await faceOf(page, itemSel);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(400);
  const highlighted = await faceOf(page, `${itemSel}[data-highlighted]`);
  const highlightAfterKey = await page.evaluate(() => {
    const el = document.querySelector('[role="menuitem"][data-highlighted]');
    return el ? (el.textContent ?? "").trim() : "NONE";
  });

  const res: PhaseResult = {
    triggerResting: triggerFace,
    triggerOpen: await faceOf(page, 'button[aria-haspopup="menu"]'),
    content,
    rows,
    itemResting: firstResting,
    itemHighlighted: highlighted,
    activeAfterOpen,
    highlightAfterKey,
  };
  console.log(`[walk53] ${label} A@${width} menu rows: ${rows?.length ?? 0} · activeAfterOpen: ${activeAfterOpen} · keyHighlight: ${highlightAfterKey}`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  await ctx.close();
  return res;
}

/** Phase B — the settings Defaults "Default Calendar View" select OPEN. */
async function phaseB(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  width: number,
  height: number,
): Promise<PhaseResult> {
  const ctx = await browser.newContext({ viewport: { width, height }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  await page.getByRole("tab", { name: "Defaults" }).click();
  await page.waitForTimeout(900);

  // OURS carries id=def-calview; the reference is id-less — the FIRST
  // combobox in the Defaults tab locates both (the discovery probe:
  // both apps render calview before firstday at byte-equal geometry).
  // The ATTRIBUTE selector is load-bearing (the walk's own discovery):
  // Playwright's getByRole("combobox") engine STOPS matching the
  // trigger once aria-expanded flips true at open (count 0 while the
  // raw [role="combobox"] attribute stays live) — the attribute
  // selector matches both states.
  const combo = page.locator('[role="combobox"]').first();
  const comboCount = await page.locator('[role="combobox"]').count();
  const faceOfEl = (el: Element) => {
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
  const triggerFace = await combo.evaluate(faceOfEl);
  await combo.click();
  await page.waitForTimeout(700);

  const content = await faceOf(page, '[role="listbox"]');
  const rows = await dumpLedger(page, '[role="listbox"]');
  const activeAfterOpen = await page.evaluate(
    () =>
      `${document.activeElement?.tagName ?? "?"}/${document.activeElement?.getAttribute("role") ?? ""}` +
      `/cls=${(document.activeElement?.getAttribute("class") ?? "").slice(0, 50)}`,
  );
  // the trigger's OPEN face read BEFORE the keyboard drive (Radix
  // re-renders the value span after a committed nav — the walk's own
  // discovery: a hasText-locator on the rendered value went stale).
  const triggerOpenFace = await combo.evaluate(faceOfEl);

  // the REAL keyboard drive: ArrowDown moves the Radix highlight to the
  // next option (Week); the SELECTED option face read before the drive.
  const optSel = '[role="option"]';
  const firstResting = await faceOf(page, optSel);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(400);
  const highlighted = await faceOf(page, `${optSel}[data-highlighted]`);
  const highlightAfterKey = await page.evaluate(() => {
    const el = document.querySelector('[role="option"][data-highlighted]');
    return el ? (el.textContent ?? "").trim() : "NONE";
  });

  const res: PhaseResult = {
    triggerResting: triggerFace,
    triggerOpen: triggerOpenFace,
    content,
    rows,
    itemResting: firstResting,
    itemHighlighted: highlighted,
    activeAfterOpen,
    highlightAfterKey,
  };
  console.log(
    `[walk53] ${label} B@${width} listbox rows: ${rows?.length ?? 0} (comboboxes: ${comboCount}) · activeAfterOpen: ${activeAfterOpen} · keyHighlight: ${highlightAfterKey}`,
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  await ctx.close();
  return res;
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
    console.log("[walk53] reusing the dev server on :3000");
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
    console.log("[walk53] pair state: ready (the s162 guarded form)");

    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    for (const [w, h] of [
      [1440, 900],
      [390, 844],
    ] as const) {
      const oursA = await phaseA(browser, OUR_URL, state, "OURS", w, h);
      const refA = await phaseA(browser, REF_URL, state, "REF ", w, h);
      writeFileSync(join(OUT_DIR, `ours-menu-${w}.json`), JSON.stringify(oursA, null, 2));
      writeFileSync(join(OUT_DIR, `ref-menu-${w}.json`), JSON.stringify(refA, null, 2));

      report.push(`\n===== ACCOUNT-MENU @${w}x${h} =====`);
      report.push(...faceDelta("triggerResting", oursA.triggerResting, refA.triggerResting));
      report.push(...faceDelta("triggerOpen", oursA.triggerOpen, refA.triggerOpen));
      report.push(...faceDelta("content", oursA.content, refA.content));
      report.push(...faceDelta("itemResting", oursA.itemResting, refA.itemResting));
      report.push(...faceDelta("itemHighlighted", oursA.itemHighlighted, refA.itemHighlighted));
      report.push(`activeAfterOpen: OURS ${oursA.activeAfterOpen} | REF ${refA.activeAfterOpen}`);
      report.push(`keyHighlight: OURS ${oursA.highlightAfterKey} | REF ${refA.highlightAfterKey}`);
      report.push(...diffRows("menu", oursA.rows, refA.rows));

      const oursB = await phaseB(browser, OUR_URL, state, "OURS", w, h);
      const refB = await phaseB(browser, REF_URL, state, "REF ", w, h);
      writeFileSync(join(OUT_DIR, `ours-select-${w}.json`), JSON.stringify(oursB, null, 2));
      writeFileSync(join(OUT_DIR, `ref-select-${w}.json`), JSON.stringify(refB, null, 2));

      report.push(`\n===== SELECT(def-calview) @${w}x${h} =====`);
      report.push(...faceDelta("triggerResting", oursB.triggerResting, refB.triggerResting));
      report.push(...faceDelta("triggerOpen", oursB.triggerOpen, refB.triggerOpen));
      report.push(...faceDelta("content", oursB.content, refB.content));
      report.push(...faceDelta("itemResting", oursB.itemResting, refB.itemResting));
      report.push(...faceDelta("itemHighlighted", oursB.itemHighlighted, refB.itemHighlighted));
      report.push(`activeAfterOpen: OURS ${oursB.activeAfterOpen} | REF ${refB.activeAfterOpen}`);
      report.push(`keyHighlight: OURS ${oursB.highlightAfterKey} | REF ${refB.highlightAfterKey}`);
      report.push(...diffRows("listbox", oursB.rows, refB.rows));
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk53] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk53] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk53] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk53]", e);
  process.exit(1);
});
