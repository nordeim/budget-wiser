// Session-183 (walk56): THE LEADS-FILTER POPOVER + CONTACTS-FILTER-PANEL
// OPEN-STATE INTERIOR WALK — the two-app element-level DOM ledger of the
// popover family's OPEN states, the coverage gap the s386 close names
// first ("the popover family's OPEN faces under ADR-022 — the leads
// filter popover + the contacts filter panel").
//
// What the standing legs already carry, and what they do NOT:
//   - the e2e battery pins OUR filters BEHAVIOR (the S25-P8 save-view
//     round-trip + the s29 inline editing + the s72 filters rows) —
//     never the two-app OPEN ledger;
//   - the a11y two-gate scans the CLOSED surfaces (desktop + phone) —
//     violations only, never the OPEN interior;
//   - the s113 menu/popover re-walk measured the family pre-doctrine
//     (geometry + census, 26 sessions ago) — the element-level DFS
//     ledger, the REAL keyboard Tab drive, and the computed OPEN
//     faces were never walked in the ADR-022 form;
//   - walk53 froze the DropdownMenu + Select chrome carriers
//     (MENU_CONTENT/MENU_ITEM + the select.tsx content/item strings)
//     — the Popover family's own chrome carrier (dropdown.tsx) never.
// The walk closes the family gap: open each arm on both apps at BOTH
// axes, dump the OPEN DOMs element-against-element (tag · class ·
// role/aria · text · geometry) + the computed faces of the
// trigger/content/fields RESTING and the REAL-keyboard-driven (the Tab
// chain the mount-focus rides — data-highlighted's Popover analogue),
// diff the ledgers, classify every delta per the genus register
// (plan §WP-2).
//
// The surfaces (the discovery probe's contract, scripts/discover-183):
//   Phase A — the leads Filters popover (the PORTAL arm): the
//             `main button` hasText "Filters" (OURS aria-label
//             "Open lead filters" — the kept superset) → the OPEN
//             `[role="dialog"][data-state="open"]` content (byte-equal
//             320x398 @304,483 at 1440x900; the 390 collision FLIP-UP
//             to data-side=top on BOTH apps) → the four field labels +
//             two selects + two inputs + the Clear/Save View footer.
//   Phase B — the contacts filter panel (the IN-FLOW arm): the
//             `main button` hasText "Filters" (OURS the aria-expanded
//             superset; no trap on either app) → the slide-in panel
//             (the s75-decoded kke construction: the sticky Filters
//             header + Clear All ghost + the 5 checkbox card groups).
//
// Run: bun scripts/walk56-leads-popover-open.ts
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
const OUT_DIR = join(REPO, "scripts", "walk56");

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

interface PopoverResult {
  triggerResting: Face | null;
  triggerOpen: Face | null;
  content: Face | null;
  rows: Row[] | null;
  labelFaces: (Face | null)[];
  selectFace: Face | null;
  inputFace: Face | null;
  footerBtnFace: Face | null;
  mountFocus: string;
  tab1Landing: string;
  contentBox: string;
  dataSide: string;
  escapeClosed: boolean;
}

interface PanelResult {
  triggerResting: Face | null;
  triggerOpen: Face | null;
  stickyFace: Face | null;
  clearAllFace: Face | null;
  clearAllBox: string;
  cardTitles: string[];
  checkboxIds: string[];
  panelBox: string;
  panelCls: string;
  mountFocus: string;
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

/** Phase A — the leads Filters popover's OPEN state (the walk53 form
 * over the Popover family's portal arm). The trigger locator is
 * text-keyed: OURS carries the kept aria-label superset, the
 * reference's trigger carries NONE — the hasText form matches both. */
async function popoverPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  width: number,
  height: number,
): Promise<PopoverResult> {
  const ctx = await browser.newContext({ viewport: { width, height }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const trigger = page.locator('main button', { hasText: "Filters" }).first();
  const triggerResting = await trigger.evaluate((el) => {
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
  await trigger.click();
  await page.waitForTimeout(700); // the 200ms-in zoom/fade + settle

  // the OPEN content — the [role=dialog][data-state=open] selector (the
  // walk54 D-112a4 root rule; the Popover portal mounts at body level)
  const contentSel = '[role="dialog"][data-state="open"]';
  const content = await faceOf(page, contentSel);
  const rows = await dumpLedger(page, contentSel);
  const meta = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { box: "MISSING", side: "MISSING" };
    const r = el.getBoundingClientRect();
    return {
      box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      side: el.getAttribute("data-side") ?? "(none)",
    };
  }, contentSel);
  const mountFocus = await page.evaluate(() => {
    const ae = document.activeElement;
    return `${ae?.tagName ?? "?"}/${ae?.getAttribute("role") ?? ""}/label=${ae?.getAttribute("aria-label") ?? "(none)"}/cls=${(ae?.getAttribute("class") ?? "").slice(0, 40)}`;
  });

  // the field faces — the four labels (each lives in its own field div,
  // so nth-of-type is parent-relative and useless here — census all
  // labels' faces in DOM order) + the first select trigger + the number
  // input + the Clear footer button (the walk53 per-face form)
  const labelFaces: (Face | null)[] = await page.evaluate((sel) => {
    const face = (el: Element) => {
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
    };
    return Array.from(document.querySelectorAll(`${sel} label`)).map((l) => face(l));
  }, contentSel);
  const selectFace = await faceOf(page, `${contentSel} [role="combobox"]`);
  const inputFace = await faceOf(page, `${contentSel} input`);
  // the Clear footer button — text-keyed (the footer's own buttons live
  // in a sibling div to the select triggers; nth-of-type is useless)
  const footerBtnFace = await page
    .locator(`${contentSel} button`, { hasText: "Clear" })
    .first()
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

  // the REAL keyboard drive — the Tab chain: the mount-focus rides the
  // first select trigger (the discovery's census); the 1st Tab lands
  // on the Source select on both apps.
  await page.keyboard.press("Tab");
  await page.waitForTimeout(350);
  const tab1Landing = await page.evaluate(() => {
    const ae = document.activeElement;
    return `${ae?.tagName ?? "?"}/${(ae?.textContent ?? "").trim().slice(0, 22)}/label=${ae?.getAttribute("aria-label") ?? "(none)"}`;
  });
  const triggerOpenFace = await trigger.evaluate((el) => {
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

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const escapeClosed = await page.evaluate(
    () => document.querySelectorAll('[role="dialog"][data-state="open"]').length === 0,
  );

  console.log(
    `[walk56] ${label} popover@${width} content ${meta.box} side=${meta.side} · rows: ${rows?.length ?? 0} · mount: ${mountFocus.slice(0, 60)} · tab1: ${tab1Landing.slice(0, 40)} · esc: ${escapeClosed}`,
  );
  await ctx.close();
  return {
    triggerResting,
    triggerOpen: triggerOpenFace,
    content,
    rows,
    labelFaces,
    selectFace,
    inputFace,
    footerBtnFace,
    mountFocus,
    tab1Landing,
    contentBox: meta.box,
    dataSide: meta.side,
    escapeClosed,
  };
}

/** Phase B — the contacts filter panel's OPEN state (the in-flow arm —
 * the s75-decoded kke construction: the sticky Filters header + the
 * Clear All ghost + the checkbox card groups; no portal, no trap on
 * either app). */
async function panelPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  width: number,
  height: number,
): Promise<PanelResult> {
  const ctx = await browser.newContext({ viewport: { width, height }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/contacts`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const trigger = page.locator('main button', { hasText: "Filters" }).first();
  const triggerResting = await trigger.evaluate((el) => {
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
  await trigger.click(); // open the panel (the variant flip)
  await page.waitForTimeout(700);

  const triggerOpenFace = await trigger.evaluate((el) => {
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

  // the panel — keyed on the h3 "Filters" header, climbed two levels
  // (h3 → div.sticky → the panel div the s75 construction documents)
  const census = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll("h3")).find(
      (h) => (h.textContent ?? "").trim() === "Filters",
    );
    if (!h3) return null;
    const sticky = h3.parentElement;
    const panel = sticky?.parentElement;
    if (!sticky || !panel) return null;
    const face = (el: Element) => {
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
    };
    const clearAll = Array.from(panel.querySelectorAll("button")).find(
      (b) => (b.textContent ?? "").trim() === "Clear All",
    );
    const cards = Array.from(panel.querySelectorAll("h3")).map((h) =>
      (h.textContent ?? "").trim() === "Filters" ? "Filters(header)" : (h.textContent ?? "").trim(),
    );
    const boxes = Array.from(panel.querySelectorAll('button[role="checkbox"], input[type="checkbox"]')).map(
      (el) => el.getAttribute("id") ?? "(none)",
    );
    const r = panel.getBoundingClientRect();
    const ae = document.activeElement;
    return {
      stickyFace: face(sticky),
      clearAllFace: clearAll ? face(clearAll) : null,
      clearAllBox: clearAll
        ? `${Math.round(clearAll.getBoundingClientRect().x)},${Math.round(clearAll.getBoundingClientRect().y)} ${Math.round(clearAll.getBoundingClientRect().width)}x${Math.round(clearAll.getBoundingClientRect().height)}`
        : "MISSING",
      cardTitles: cards,
      checkboxIds: boxes,
      panelBox: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      panelCls: (panel.getAttribute("class") ?? "").slice(0, 90),
      mountFocus: `${ae?.tagName ?? "?"}/${(ae?.textContent ?? "").trim().slice(0, 18)}`,
    };
  });

  console.log(
    `[walk56] ${label} panel@${width} ${census ? census.panelBox : "PANEL MISSING"} · cards: ${census?.cardTitles.length ?? 0} · boxes: ${census?.checkboxIds.length ?? 0} · clearAll ${census?.clearAllBox ?? "?"}`,
  );
  await ctx.close();
  return {
    triggerResting,
    triggerOpen: triggerOpenFace,
    stickyFace: census?.stickyFace ?? null,
    clearAllFace: census?.clearAllFace ?? null,
    clearAllBox: census?.clearAllBox ?? "MISSING",
    cardTitles: census?.cardTitles ?? [],
    checkboxIds: census?.checkboxIds ?? [],
    panelBox: census?.panelBox ?? "MISSING",
    panelCls: census?.panelCls ?? "MISSING",
    mountFocus: census?.mountFocus ?? "?",
  };
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
    console.log("[walk56] reusing the dev server on :3000");
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
    console.log("[walk56] pair state: ready (the s162 guarded form)");

    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    for (const [w, h] of [
      [1440, 900],
      [390, 844],
    ] as const) {
      // Phase A — the leads popover
      const ours = await popoverPhase(browser, OUR_URL, state, "OURS", w, h);
      const ref = await popoverPhase(browser, REF_URL, state, "REF ", w, h);
      writeFileSync(join(OUT_DIR, `ours-popover-${w}.json`), JSON.stringify(ours, null, 2));
      writeFileSync(join(OUT_DIR, `ref-popover-${w}.json`), JSON.stringify(ref, null, 2));

      report.push(`\n===== POPOVER(leads) @${w}x${h} =====`);
      report.push(`contentBox: OURS ${ours.contentBox} | REF ${ref.contentBox}`);
      report.push(`dataSide: OURS ${ours.dataSide} | REF ${ref.dataSide}`);
      report.push(`mountFocus: OURS ${ours.mountFocus} | REF ${ref.mountFocus}`);
      report.push(`tab1Landing: OURS ${ours.tab1Landing} | REF ${ref.tab1Landing}`);
      report.push(`escapeClosed: OURS ${ours.escapeClosed} | REF ${ref.escapeClosed}`);
      report.push(...faceDelta("triggerResting", ours.triggerResting, ref.triggerResting));
      report.push(...faceDelta("triggerOpen", ours.triggerOpen, ref.triggerOpen));
      report.push(...faceDelta("content", ours.content, ref.content));
      for (let i = 0; i < 4; i++) {
        report.push(...faceDelta(`labelFace[${i}]`, ours.labelFaces[i] ?? null, ref.labelFaces[i] ?? null));
      }
      report.push(...faceDelta("selectFace", ours.selectFace, ref.selectFace));
      report.push(...faceDelta("inputFace", ours.inputFace, ref.inputFace));
      report.push(...faceDelta("footerBtnFace", ours.footerBtnFace, ref.footerBtnFace));
      report.push(...diffRows("popover", ours.rows, ref.rows));

      // Phase B — the contacts panel
      const o2 = await panelPhase(browser, OUR_URL, state, "OURS", w, h);
      const r2 = await panelPhase(browser, REF_URL, state, "REF ", w, h);
      writeFileSync(join(OUT_DIR, `ours-panel-${w}.json`), JSON.stringify(o2, null, 2));
      writeFileSync(join(OUT_DIR, `ref-panel-${w}.json`), JSON.stringify(r2, null, 2));

      report.push(`\n===== PANEL(contacts) @${w}x${h} =====`);
      report.push(`panelBox: OURS ${o2.panelBox} | REF ${r2.panelBox}`);
      report.push(`panelCls: OURS ${o2.panelCls} | REF ${r2.panelCls}`);
      report.push(`clearAllBox: OURS ${o2.clearAllBox} | REF ${r2.clearAllBox}`);
      report.push(`cardTitles: OURS [${o2.cardTitles.join(" | ")}] | REF [${r2.cardTitles.join(" | ")}]`);
      report.push(
        `checkboxIds: OURS [${o2.checkboxIds.join(",")}] | REF [${r2.checkboxIds.join(",")}]`,
      );
      report.push(`mountFocus: OURS ${o2.mountFocus} | REF ${r2.mountFocus}`);
      report.push(...faceDelta("panelTriggerResting", o2.triggerResting, r2.triggerResting));
      report.push(...faceDelta("panelTriggerOpen", o2.triggerOpen, r2.triggerOpen));
      report.push(...faceDelta("stickyFace", o2.stickyFace, r2.stickyFace));
      report.push(...faceDelta("clearAllFace", o2.clearAllFace, r2.clearAllFace));
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk56] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk56] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk56] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk56]", e);
  process.exit(1);
});
