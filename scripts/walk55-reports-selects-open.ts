// Session-182 (walk55): THE REPORTS-FILTER SELECTS OPEN-STATE INTERIOR
// WALK — the two-app element-level DOM ledger of the reports filter
// bar's FOUR selects' OPEN states, the coverage gap the s384 close
// names first (walk53's Phase B consumed the settings Defaults arm;
// the reports page's own select instances were never walked).
//
// What the standing legs already carry, and what they do NOT:
//   - the e2e battery pins OUR period-select option vocabulary
//     (S25-P6: the 6 REPORT_PERIODS) — behavior on OURS only, never
//     the two-app OPEN ledger;
//   - the a11y two-gate scans the CLOSED reports surfaces (desktop +
//     phone) — violations only, never the OPEN interior;
//   - the s133/s136 lenses spot-checked OTHER pages' select triggers
//     (accounts density, leads saved-views) — the reports family's
//     own instances never;
//   - walk53's phases froze the select CHROME carriers (MENU_CONTENT/
//     MENU_ITEM + the select.tsx content/item inline strings) over the
//     account-menu + settings arms.
// The walk closes the family gap: open each of the four selects on
// both apps at BOTH axes, dump the OPEN DOMs element-against-element
// (tag · class · role/aria · text · geometry) + the computed faces of
// the trigger/content/options RESTING and KEYBOARD-HIGHLIGHTED (the
// REAL key drive — data-highlighted fires under real keyboard focus,
// which no sweep drives), diff the ledgers, classify every delta per
// the genus register (plan §WP-2).
//
// The surfaces (the discovery probe's contract, scripts/discover-182):
//   Phase A — the period select  (the canonical member: 6 options,
//             the checked "This Quarter" highlighted at open)
//   Phase B — the owner select   (the DATA-STATE arm: our seeded
//             DISTINCT opp owners vs the reference's live zero-data
//             "All Owners"-only list — the s179 DATA-STATE genus)
//   Phase C — the stage select   (7 options, the OPP vocabulary)
//   Phase D — the status select  (4 options, the shared REPORT_STATUSES)
//
// Run: bun scripts/walk55-reports-selects-open.ts
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
const OUT_DIR = join(REPO, "scripts", "walk55");

const PHASES = [
  { key: "period", idx: 0 },
  { key: "owner", idx: 1 },
  { key: "stage", idx: 2 },
  { key: "status", idx: 3 },
] as const;

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

interface PhaseResult {
  triggerResting: Face | null;
  triggerOpen: Face | null;
  content: Face | null;
  rows: Row[] | null;
  optionTexts: string[];
  checkedText: string;
  checkedFace: Face | null;
  itemResting: Face | null;
  itemHighlighted: Face | null;
  activeAfterOpen: string;
  highlightAfterKey: string;
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

/** One select's OPEN phase — the walk53 form, parameterized by the
 * filter bar's combobox index (the ATTRIBUTE selector is
 * load-bearing: Playwright's getByRole("combobox") engine STOPS
 * matching the trigger once aria-expanded flips true at open). */
async function phase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  width: number,
  height: number,
  idx: number,
): Promise<PhaseResult> {
  const ctx = await browser.newContext({ viewport: { width, height }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const combo = page.locator('main [role="combobox"]').nth(idx);
  const triggerFace = await combo.evaluate((el) => {
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
  });
  await combo.click();
  await page.waitForTimeout(700); // the 200ms-in zoom/fade + settle

  const content = await faceOf(page, '[role="listbox"]');
  const rows = await dumpLedger(page, '[role="listbox"]');
  const activeAfterOpen = await page.evaluate(
    () =>
      `${document.activeElement?.tagName ?? "?"}/${document.activeElement?.getAttribute("role") ?? ""}` +
      `/cls=${(document.activeElement?.getAttribute("class") ?? "").slice(0, 50)}`,
  );
  // the trigger's OPEN face read BEFORE the keyboard drive (Radix
  // re-renders the value span after a committed nav — the walk53
  // discovery: a hasText-locator on the rendered value went stale).
  const triggerOpenFace = await combo.evaluate((el) => {
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
  });

  // the OPEN census: the option texts + the checked option's own
  // HIGHLIGHTED face (Radix highlights the selected item at open —
  // the walk53 mount-focus form).
  const optSel = '[role="option"]';
  const census = await page.evaluate((sel) => {
    const opts = Array.from(document.querySelectorAll(sel));
    return {
      texts: opts.map((o) => (o.textContent ?? "").trim()),
      checked: opts.findIndex((o) => o.getAttribute("data-state") === "checked"),
    };
  }, optSel);
  const firstResting = await faceOf(page, optSel);
  const checkedFace =
    census.checked >= 0 ? await faceOf(page, `${optSel}[data-state="checked"]`) : null;

  // the REAL keyboard drive: ArrowDown moves the Radix highlight to
  // the next option; the highlight rides REAL keyboard focus (no
  // synthetic hover paints data-highlighted).
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
    optionTexts: census.texts,
    checkedText: census.checked >= 0 ? census.texts[census.checked] : "(none)",
    checkedFace,
    itemResting: firstResting,
    itemHighlighted: highlighted,
    activeAfterOpen,
    highlightAfterKey,
  };
  console.log(
    `[walk55] ${label} #${idx}@${width} listbox rows: ${rows?.length ?? 0} (options: ${census.texts.length}, checked: ${res.checkedText}) · activeAfterOpen: ${activeAfterOpen} · keyHighlight: ${highlightAfterKey}`,
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
    console.log("[walk55] reusing the dev server on :3000");
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
    console.log("[walk55] pair state: ready (the s162 guarded form)");

    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    for (const [w, h] of [
      [1440, 900],
      [390, 844],
    ] as const) {
      for (const p of PHASES) {
        const ours = await phase(browser, OUR_URL, state, "OURS", w, h, p.idx);
        const ref = await phase(browser, REF_URL, state, "REF ", w, h, p.idx);
        writeFileSync(join(OUT_DIR, `ours-${p.key}-${w}.json`), JSON.stringify(ours, null, 2));
        writeFileSync(join(OUT_DIR, `ref-${p.key}-${w}.json`), JSON.stringify(ref, null, 2));

        report.push(`\n===== SELECT(${p.key}) @${w}x${h} =====`);
        report.push(...faceDelta("triggerResting", ours.triggerResting, ref.triggerResting));
        report.push(...faceDelta("triggerOpen", ours.triggerOpen, ref.triggerOpen));
        report.push(...faceDelta("content", ours.content, ref.content));
        report.push(...faceDelta("checkedFace", ours.checkedFace, ref.checkedFace));
        report.push(...faceDelta("itemResting", ours.itemResting, ref.itemResting));
        report.push(...faceDelta("itemHighlighted", ours.itemHighlighted, ref.itemHighlighted));
        report.push(`activeAfterOpen: OURS ${ours.activeAfterOpen} | REF ${ref.activeAfterOpen}`);
        report.push(`keyHighlight: OURS ${ours.highlightAfterKey} | REF ${ref.highlightAfterKey}`);
        report.push(
          `optionTexts: OURS [${ours.optionTexts.join(" | ")}] | REF [${ref.optionTexts.join(" | ")}]`,
        );
        report.push(`checkedText: OURS ${ours.checkedText} | REF ${ref.checkedText}`);
        report.push(...diffRows("listbox", ours.rows, ref.rows));
      }
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk55] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk55] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk55] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk55]", e);
  process.exit(1);
});
