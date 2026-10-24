// Session-177 (walk50): THE DRAWER INTERIOR RE-WALK — the two-app
// element-level DOM ledger of the drawer-OPEN state, the coverage gap
// the last six closes named and no round ever ran as its own rotation.
//
// What the standing legs already carry, and what they do NOT:
//   - the drawer battery (scripts/drawer-battery-390.ts) pins BEHAVIOR
//     (locks, focus, ESC, resize) — never the element ledger;
//   - the a11y two-gate's drawer-open state scans axe violations only;
//   - captures 443/445 pin VISUAL; the source pins pin the CONTRACT
//     STRINGS;
//   - scripts/interior-census.ts carries ZERO drawer references (52
//     page-axis runs, all drawer-CLOSED).
// The walk closes that gap: dump both apps' drawer-open DOMs
// element-against-element (tag · class · role/aria · text · geometry),
// diff the ledgers, classify every delta (parity · documented genus ·
// defect). The walk37 decode (s147) derived the contracts; walk50
// re-verifies the RENDERED agreement 30 sessions later.
//
// Run: bun scripts/walk50-drawer-interior.ts
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
const OUT_DIR = join(REPO, "scripts", "walk50");

/** One ledger row — the element-level face the walk compares. */
interface LedgerRow {
  i: number; // DFS order within the drawer
  depth: number;
  tag: string;
  cls: string;
  role: string | null;
  aria: Record<string, string>;
  text: string; // DIRECT text children only (trimmed, 60 chars)
  box: { x: number; y: number; w: number; h: number } | null;
}

/** The in-page collector: the drawer root → DFS descendant ledger.
 * Mirrors the battery's own panel selector (the s94/s147 form:
 * `[role="dialog"][data-state="open"]` IS the sheet content). */
async function dumpDrawerLedger(page: Page): Promise<LedgerRow[]> {
  return page.evaluate(() => {
    const root = document.querySelector(
      '[role="dialog"][data-state="open"]',
    ) as HTMLElement | null;
    if (!root) return [];

    // The OVERLAY is a sibling of the content inside the portal —
    // collected separately (the walk's row 0 convention: overlay first,
    // the content tree after, so both apps align on the same spine).
    const portalHost = root.parentElement?.parentElement ?? null;
    const overlay = portalHost
      ? (portalHost.querySelector(
          '[data-radix-dialog-overlay], .fixed.inset-0, [data-state="open"][style*="pointer-events"]',
        ) as HTMLElement | null)
      : null;

    const rows: Array<{
      i: number;
      depth: number;
      tag: string;
      cls: string;
      role: string | null;
      aria: Record<string, string>;
      text: string;
      box: { x: number; y: number; w: number; h: number } | null;
    }> = [];

    const collect = (el: Element, depth: number) => {
      const aria: Record<string, string> = {};
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith("aria-") || attr.name === "data-state" || attr.name === "data-radix-collection-item") {
          aria[attr.name] = attr.value;
        }
      }
      // direct text children only — nested element text belongs to the
      // nested rows
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

    if (overlay) collect(overlay, 0);
    collect(root, 0);
    return rows;
  });
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

/** Open the drawer at TRUE 390x844 and dump the ledger. */
async function openAndDump(
  browser: Browser,
  base: string,
  storageState: SweepPairState,
  label: string,
): Promise<LedgerRow[]> {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState,
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/Dashboard`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(2000);

  const trigger = page.locator('button[aria-label="Open navigation"]');
  const tBox = await trigger.boundingBox();
  console.log(`[walk50] ${label} trigger:`, JSON.stringify(tBox));
  await trigger.click();
  // the 500ms slide-in + settle (the battery's own wait form)
  await page.waitForTimeout(700);

  const rows = await dumpDrawerLedger(page);
  console.log(`[walk50] ${label} ledger rows: ${rows.length}`);
  await ctx.close();
  return rows;
}

/** The diff: element-against-element, the aligned spine. Deltas are
 * classified by the caller (the human decode) — this function reports
 * raw disagreements only. */
function diffLedgers(ours: LedgerRow[], ref: LedgerRow[]): string[] {
  const lines: string[] = [];
  const n = Math.max(ours.length, ref.length);
  for (let i = 0; i < n; i++) {
    const a = ours[i];
    const b = ref[i];
    if (!a || !b) {
      lines.push(`ROW ${i}: only ${a ? "OURS" : "REF"} — ${JSON.stringify(a ?? b)}`);
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
      if (dw > 1 || dh > 1 || dy > 1)
        tags.push(`box ${JSON.stringify(a.box)}/${JSON.stringify(b.box)}`);
    } else if (!!a.box !== !!b.box) {
      tags.push("box presence");
    }
    if (tags.length) {
      lines.push(
        `ROW ${i} (depth ${a.depth} ${a.tag}${a.cls ? ` .${a.cls.split(" ").slice(0, 4).join(".")}` : ""}): ${tags.join(" | ")}`,
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
    console.log("[walk50] reusing the dev server on :3000");
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
    console.log("[walk50] pair state: ready (the s162 guarded form)");

    const ours = await openAndDump(
      browser,
      OUR_URL,
      storageState,
      "OURS",
    );
    const ref = await openAndDump(
      browser,
      REF_URL,
      storageState,
      "REF ",
    );

    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(
      join(OUT_DIR, "ours-drawer-ledger.json"),
      JSON.stringify(ours, null, 2),
    );
    writeFileSync(
      join(OUT_DIR, "ref-drawer-ledger.json"),
      JSON.stringify(ref, null, 2),
    );

    const deltas = diffLedgers(ours, ref);
    console.log(`\n[walk50] DELTA CENSUS: ${deltas.length} rows disagree`);
    for (const line of deltas) console.log(line);
    console.log(
      `\n[walk50] ledgers saved: ${join(OUT_DIR, "{ours,ref}-drawer-ledger.json")}`,
    );
    console.log("[walk50] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk50]", e);
  process.exit(1);
});
