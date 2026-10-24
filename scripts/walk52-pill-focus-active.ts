// Session-179 (walk52): THE REPORTS PILL-TAB FOCUS-STATE INTERIOR
// RE-WALK — the s129 close's own never-censused list ("the pill-tab
// surfaces' focus states never live-censused"), named first by the
// session-379 close (the external s178's record: "the remaining
// unwalked focus faces … the pill-tab focus states on the reports
// family"). The external s178 walked the SEGMENTED family's active face
// (settings, walk51); the PILL family's focus + active faces are the
// remaining blank — the same ADR-022 doctrine, the family's own turn.
//
// What the standing legs carry, and what they do NOT:
//   - the sweeps carry the reports tab bar's RESTING face (both
//     viewports) — never a FOCUSED pill trigger (focus-visible fires
//     only under REAL keyboard focus);
//   - the e2e crm.spec tab tests pin the aria-selected STATE machine —
//     never the computed focus/active styles;
//   - TABS_PILL is source-pinned (fragments) — the focus-state element
//     ledger was never walked.
//
// DATA-STATE NOTE (the walk's pairing discipline): the reports tab
// bar's page position rides the KPI/chart stack above it — OURS-seeded
// renders that stack 32px taller than the reference's zero-data demo,
// a DATA-STATE genus, never a pill defect (the pill interior geometry
// is byte-equal at zero-data: run scripts/zero-data.ts first for the
// clean two-app PASS — the sweep's own pairing doctrine, the s91 tool).
//
// Run: bun scripts/walk52-pill-focus-active.ts
// (boots or reuses the dev server on :3000, DATABASE_URL guarded at the
// boot site; the reference rides the sweep-state storageState pair —
// ONE reference login, reused while fresh, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "@playwright/test";

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
const OUT_DIR = join(REPO, "scripts", "walk52");

interface StyleCensus {
  boxShadow: string;
  borderColor: string;
  backgroundColor: string;
  color: string;
  outlineWidth: string;
  outlineStyle: string;
  outlineColor: string;
  fontWeight: string;
}

interface TriggerFace {
  text: string;
  cls: string;
  ariaSelected: string | null;
  dataState: string | null;
  tabindex: string | null;
  box: { x: number; y: number; w: number; h: number } | null;
  resting: StyleCensus | null;
}

interface PillFace {
  tablistCls: string;
  tablistComputed: { backgroundColor: string; color: string } | null;
  tablistBox: { x: number; y: number; w: number; h: number } | null;
  triggers: TriggerFace[];
  focused: (StyleCensus & { text: string; focusVisibleMatch: boolean; tabPresses: number }) | null;
  switchedActive: (StyleCensus & { text: string; tabindex: string | null }) | null;
}

const TRIGGER_CENSUS = `(() => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const track = tabs[0] ? tabs[0].parentElement : null;
  const readStyles = (el) => {
    const cs = getComputedStyle(el);
    return {
      boxShadow: cs.boxShadow,
      borderColor: cs.borderColor,
      backgroundColor: cs.backgroundColor,
      color: cs.color,
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      outlineColor: cs.outlineColor,
      fontWeight: cs.fontWeight,
    };
  };
  const tcs = track ? getComputedStyle(track) : null;
  const tb = track ? track.getBoundingClientRect() : null;
  return {
    tablistCls: track ? (track.getAttribute('class') ?? '') : null,
    tablistComputed: tcs ? { backgroundColor: tcs.backgroundColor, color: tcs.color } : null,
    tablistBox: tb ? { x: Math.round(tb.x), y: Math.round(tb.y), w: Math.round(tb.width), h: Math.round(tb.height) } : null,
    triggers: tabs.map((t) => {
      const b = t.getBoundingClientRect();
      return {
        text: t.textContent.trim(),
        cls: t.getAttribute('class') ?? '',
        ariaSelected: t.getAttribute('aria-selected'),
        dataState: t.getAttribute('data-state'),
        tabindex: t.getAttribute('tabindex'),
        box: { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) },
        resting: readStyles(t),
      };
    }),
  };
})()`;

const FOCUSED_CENSUS = `(() => {
  const el = document.activeElement;
  if (!el || el.getAttribute('role') !== 'tab') return null;
  const cs = getComputedStyle(el);
  return {
    text: el.textContent.trim(),
    boxShadow: cs.boxShadow,
    borderColor: cs.borderColor,
    backgroundColor: cs.backgroundColor,
    color: cs.color,
    outlineWidth: cs.outlineWidth,
    outlineStyle: cs.outlineStyle,
    outlineColor: cs.outlineColor,
    fontWeight: cs.fontWeight,
    focusVisibleMatch: el.matches(':focus-visible'),
  };
})()`;

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

async function walkPill(
  browser: Browser,
  base: string,
  storageState: object,
  label: string,
  width: number,
  height: number,
): Promise<PillFace> {
  const ctx = await browser.newContext({
    viewport: { width, height },
    storageState: storageState as never,
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
  await page.locator('[role="tab"]').first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(2000);

  const initial = (await page.evaluate(TRIGGER_CENSUS)) as Record<string, unknown>;

  // REAL keyboard focus on the ACTIVE pill trigger: click the page's
  // neutral header area (a known origin), then Tab until a tab trigger
  // holds focus (the walk51 form — focus-visible fires only under real
  // keyboard focus).
  await page.mouse.click(width / 2, 40);
  let tabPresses = 0;
  let focused = false;
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    tabPresses++;
    const isTab = await page.evaluate(() => {
      const el = document.activeElement;
      return !!el && el.getAttribute("role") === "tab";
    });
    if (isTab) {
      focused = true;
      break;
    }
  }
  await page.waitForTimeout(400);
  const focusedCensus = focused ? ((await page.evaluate(FOCUSED_CENSUS)) as Record<string, unknown> | null) : null;

  // the REAL tab switch (the active face's move, walk51 Phase B form)
  await page.locator('[role="tab"]').nth(1).click();
  await page.waitForTimeout(400);
  const switched = (await page.evaluate(FOCUSED_CENSUS.replace("document.activeElement", "document.querySelector('[data-state=\"active\"]')"))) as Record<string, unknown> | null;
  // NOTE: FOCUSED_CENSUS reads activeElement; for the switched face we
  // re-read via the data-state selector below instead (cleaner form):
  const switchedFace = (await page.evaluate(`(() => {
    const el = document.querySelector('[role="tab"][data-state="active"]');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: el.textContent.trim(),
      tabindex: el.getAttribute('tabindex'),
      boxShadow: cs.boxShadow,
      borderColor: cs.borderColor,
      backgroundColor: cs.backgroundColor,
      color: cs.color,
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      outlineColor: cs.outlineColor,
      fontWeight: cs.fontWeight,
    };
  })()`)) as Record<string, unknown> | null;
  void switched;

  const face: PillFace = {
    tablistCls: initial.tablistCls as string,
    tablistComputed: initial.tablistComputed as PillFace["tablistComputed"],
    tablistBox: initial.tablistBox as PillFace["tablistBox"],
    triggers: (initial.triggers as Array<Record<string, unknown>>).map((t) => ({
      text: t.text as string,
      cls: t.cls as string,
      ariaSelected: (t.ariaSelected as string | null) ?? null,
      dataState: (t.dataState as string | null) ?? null,
      tabindex: (t.tabindex as string | null) ?? null,
      box: t.box as TriggerFace["box"],
      resting: t.resting as StyleCensus,
    })),
    focused: focusedCensus
      ? {
          ...(focusedCensus as unknown as StyleCensus),
          text: focusedCensus.text as string,
          focusVisibleMatch: focusedCensus.focusVisibleMatch as boolean,
          tabPresses,
        }
      : null,
    switchedActive: switchedFace
      ? {
          ...(switchedFace as unknown as StyleCensus),
          text: switchedFace.text as string,
          tabindex: (switchedFace.tabindex as string | null) ?? null,
        }
      : null,
  };

  console.log(
    `[walk52] ${label} @${width}: tabs=${face.triggers.length} focused=${focused ? face.focused?.text : "NO"} (tabs=${tabPresses}, fv=${face.focused?.focusVisibleMatch}) switched=${face.switchedActive?.text ?? "?"}`,
  );
  await ctx.close();
  return face;
}

/** The effective-layer shadow parser (the walk50/walk51 doctrine: the
 * zero-width v4 variable-chain layers never enter the alignment). */
function effectiveLayers(raw: string): string {
  if (!raw || raw === "none") return "none";
  const layers: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of raw) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      layers.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) layers.push(cur.trim());
  return layers
    .filter((l) => !/0px 0px 0px 0px/.test(l))
    .join(" | ");
}

function census(ours: PillFace, ref: PillFace, axis: string): string[] {
  const lines: string[] = [];
  const push = (s: string) => lines.push(s);
  push(`PILL.${axis} tablistCls ours="${ours.tablistCls}" ref="${ref.tablistCls}"`);
  if (ours.tablistComputed && ref.tablistComputed) {
    if (ours.tablistComputed.backgroundColor !== ref.tablistComputed.backgroundColor)
      push(`PILL.${axis} track bg ours=${ours.tablistComputed.backgroundColor} ref=${ref.tablistComputed.backgroundColor}`);
    if (ours.tablistComputed.color !== ref.tablistComputed.color)
      push(`PILL.${axis} track color ours=${ours.tablistComputed.color} ref=${ref.tablistComputed.color}`);
  }
  for (let i = 0; i < Math.max(ours.triggers.length, ref.triggers.length); i++) {
    const a = ours.triggers[i];
    const b = ref.triggers[i];
    if (!a || !b) {
      push(`PILL.${axis} trigger[${i}] only ${a ? "OURS" : "REF"}`);
      continue;
    }
    const tags: string[] = [];
    if (a.text !== b.text) tags.push(`text "${a.text}"/"${b.text}"`);
    if (a.ariaSelected !== b.ariaSelected) tags.push(`aria-selected ${a.ariaSelected}/${b.ariaSelected}`);
    if (a.dataState !== b.dataState) tags.push(`data-state ${a.dataState}/${b.dataState}`);
    if (a.tabindex !== b.tabindex) tags.push(`tabindex ${a.tabindex}/${b.tabindex}`);
    if (a.resting && b.resting) {
      if (a.resting.backgroundColor !== b.resting.backgroundColor) tags.push(`bg ${a.resting.backgroundColor}/${b.resting.backgroundColor}`);
      if (a.resting.color !== b.resting.color) tags.push(`color ${a.resting.color}/${b.resting.color}`);
      if (a.resting.fontWeight !== b.resting.fontWeight) tags.push(`weight ${a.resting.fontWeight}/${b.resting.fontWeight}`);
      const shA = effectiveLayers(a.resting.boxShadow);
      const shR = effectiveLayers(b.resting.boxShadow);
      if (shA !== shR) tags.push(`shadow [${shA}]/[${shR}]`);
    }
    if (a.box && b.box && (a.box.h !== b.box.h || Math.abs(a.box.w - b.box.w) > 1 || Math.abs(a.box.y - b.box.y) > 1))
      tags.push(`box ${JSON.stringify(a.box)}/${JSON.stringify(b.box)}`);
    if (a.cls !== b.cls) tags.push("CLASS");
    if (tags.length) {
      push(`PILL.${axis} trigger[${i}] "${a.text}": ${tags.join(" | ")}`);
      if (tags.includes("CLASS")) push(`    OURS cls: ${a.cls}\n    REF  cls: ${b.cls}`);
    }
  }
  // the FOCUSED face (the round's core)
  const fo = ours.focused;
  const fr = ref.focused;
  push(`PILL.${axis} focused: ours=${fo ? `${fo.text} (fv=${fo.focusVisibleMatch}, tabs=${fo.tabPresses})` : "NONE"} ref=${fr ? `${fr.text} (fv=${fr.focusVisibleMatch}, tabs=${fr.tabPresses})` : "NONE"}`);
  if (fo && fr) {
    const shO = effectiveLayers(fo.boxShadow);
    const shR = effectiveLayers(fr.boxShadow);
    push(`PILL.${axis} focused ring ours=[${shO}] ref=[${shR}] ${shO === shR ? "BYTE-EQUAL" : "DIFF"}`);
    if (fo.outlineStyle !== fr.outlineStyle || fo.outlineWidth !== fr.outlineWidth)
      push(`PILL.${axis} focused outline ours="${fo.outlineStyle} ${fo.outlineWidth} ${fo.outlineColor}" ref="${fr.outlineStyle} ${fr.outlineWidth} ${fr.outlineColor}"`);
    if (fo.backgroundColor !== fr.backgroundColor) push(`PILL.${axis} focused bg ours=${fo.backgroundColor} ref=${fr.backgroundColor}`);
    if (fo.color !== fr.color) push(`PILL.${axis} focused color ours=${fo.color} ref=${fr.color}`);
  }
  // the SWITCHED active face
  const so = ours.switchedActive;
  const sr = ref.switchedActive;
  push(`PILL.${axis} switched: ours=${so ? `${so.text} (tabindex=${so.tabindex})` : "NONE"} ref=${sr ? `${sr.text} (tabindex=${sr.tabindex})` : "NONE"}`);
  if (so && sr) {
    if (so.backgroundColor !== sr.backgroundColor) push(`PILL.${axis} switched bg ours=${so.backgroundColor} ref=${sr.backgroundColor}`);
    if (so.color !== sr.color) push(`PILL.${axis} switched color ours=${so.color} ref=${sr.color}`);
    const shO = effectiveLayers(so.boxShadow);
    const shR = effectiveLayers(sr.boxShadow);
    if (shO !== shR) push(`PILL.${axis} switched shadow [${shO}]/[${shR}]`);
  }
  return lines;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk52] reusing the dev server on :3000");
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
    const storageState = await preflightPairState(browser);
    console.log("[walk52] pair state: ready (the s162 guarded form)");

    const results: Record<string, { ours: PillFace; ref: PillFace }> = {};
    for (const [axis, w, h] of [
      ["desktop", 1440, 900],
      ["phone", 390, 844],
    ] as const) {
      const ours = await walkPill(browser, OUR_URL, storageState, "OURS", w, h);
      const ref = await walkPill(browser, REF_URL, storageState, "REF ", w, h);
      results[axis] = { ours, ref };
    }

    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(join(OUT_DIR, "ours-pill-ledger.json"), JSON.stringify(results, null, 2));
    writeFileSync(join(OUT_DIR, "ref-pill-ledger.json"), JSON.stringify(results, null, 2));

    for (const axis of ["desktop", "phone"]) {
      const deltas = census(results[axis].ours, results[axis].ref, axis);
      console.log(`\n[walk52] DELTA CENSUS .${axis} (${deltas.length} lines):`);
      for (const line of deltas) console.log(line);
    }
    console.log(`\n[walk52] ledgers saved: ${join(OUT_DIR, "{ours,ref}-pill-ledger.json")}`);
    console.log("[walk52] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk52]", e);
  process.exit(1);
});
