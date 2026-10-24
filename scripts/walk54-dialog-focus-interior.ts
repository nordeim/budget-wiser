// Session-181 (walk54): THE DIALOG-SURFACE FOCUS-STATE INTERIOR WALK —
// the two-app element-level DOM ledger of the New Lead dialog's OPEN +
// FOCUS states, the coverage gap the s380 close names next (the s379
// close's own third arm: "the dialog-surface focus faces").
//
// What the standing legs already carry, and what they do NOT:
//   - s112 walked the family's GEOMETRY (7 dialogs × 2 viewports, the
//     content-box axes) + the mount-focus census (the D1 genus);
//   - s172 walked the named-controls layer (the a11y aria family);
//   - the e2e battery pins OUR behavior (the mount-focus assertions +
//     the phone geometry) — OUR app only, never the two-app face;
//   - NO round ever censused the dialog controls' FOCUS-VISIBLE faces
//     under a REAL keyboard Tab drive (focus-visible fires only under
//     real keyboard focus, which no sweep drives), the Tab-chain
//     census stop-by-stop, or the Tab-wrap focus-trap cycle —
//     element-against-element on both apps.
// The walk closes that gap: open the New Lead dialog on both apps at
// BOTH axes, dump the OPEN spine (tag · class · role/aria · text ·
// geometry), read the computed faces of the chrome + the controls
// RESTING, then drive REAL Tab through the focusable chain — census
// each stop's FOCUSED face + identity, and the wrap past the last
// focusable (the Radix focus trap) — diff the ledgers, classify every
// delta per the genus register (plan §WP-2).
//
// The surfaces (the discovery probe's contract, scripts/discover-181):
//   the /leads "New Lead" trigger (count 1, byte-equal geometry on
//   both apps) → the OPEN [role="dialog"][data-state="open"] (the
//   D-112a4 rule: our permanently-mounted mobile-nav drawer carries
//   role="dialog" with no data-state — CSS dialog selectors MUST key
//   on data-state="open") → the 12-row focusable inventory (5 inputs ·
//   2 select triggers + their hidden native selects · Cancel · the
//   submit · the close X) — byte-equal boxes on both apps at 1440.
//   The mount-focus lands on the FIRST INPUT on both apps (the s112
//   D1 decode re-confirmed), and the mount-focused input already
//   matches :focus-visible on both (the discovery probe's own find —
//   the ring paints on Radix's programmatic mount focus after the
//   click gesture).
//
// Both phases at BOTH axes (1440x900 + 390x844 — the family's
// full-bleed phone form is the s15/s112-pinned geometry).
//
// Run: bun scripts/walk54-dialog-focus-interior.ts
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
const OUT_DIR = join(REPO, "scripts", "walk54");

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

/** The computed face — the effective-layer style probe (the walk51/52/53
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

/** A Tab-drive stop: the focused element's identity + its FOCUSED face. */
interface Stop {
  stop: number;
  tag: string;
  id: string;
  text: string;
  face: Face | null;
  matchesFocusVisible: boolean;
}

interface WalkResult {
  overlay: Face | null;
  content: Face | null;
  title: Face | null;
  closeXResting: Face | null;
  inputResting: Face | null;
  cancelResting: Face | null;
  submitResting: Face | null;
  rows: Row[] | null;
  mountFocus: string;
  mountFace: Face | null;
  mountFocusVisible: boolean;
  tabStops: Stop[];
  wrapFocus: string;
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

async function faceOfActive(page: Page): Promise<{ face: Face | null; matchesFocusVisible: boolean } | null> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      face: {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
      },
      matchesFocusVisible: el.matches(":focus-visible"),
    };
  });
}

async function activeId(page: Page): Promise<string> {
  return page.evaluate(
    () =>
      `${document.activeElement?.tagName ?? "?"}/id=${document.activeElement?.getAttribute("id") ?? ""}` +
      `/text=${(document.activeElement?.textContent ?? "").trim().slice(0, 24)}`,
  );
}

async function walk(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  width: number,
  height: number,
): Promise<WalkResult> {
  const ctx = await browser.newContext({ viewport: { width, height }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  await page.getByRole("button", { name: "New Lead" }).first().click();
  await page.waitForTimeout(900); // the 200ms enter animation + settle

  // the D-112a4 rule: the OPEN dialog keys on data-state="open" (our
  // permanently-mounted mobile-nav drawer carries role="dialog" with
  // no data-state and would shadow the CSS selector)
  const DIALOG = '[role="dialog"][data-state="open"]';
  // the overlay: the ONE non-dialog [data-state=open] node (the portal
  // mounts overlay + content as BODY-level siblings — the decode
  // probe's finding; [data-radix-dialog-overlay] matches nothing on
  // either app)
  const overlaySel = '[data-state="open"]:not([role="dialog"])';

  const overlay = await faceOf(page, overlaySel);
  const content = await faceOf(page, DIALOG);
  const title = await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    const h = root?.querySelector("h2");
    if (!h) return null;
    const cs = getComputedStyle(h);
    return {
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      boxShadow: cs.boxShadow,
      borderRadius: cs.borderRadius,
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      fontWeight: cs.fontWeight,
    };
  }, DIALOG);
  // the close X: the absolutely-positioned DialogClose (the last
  // button in the content's DOM — carries the X svg + sr-only "Close")
  const closeXResting = await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    const btns = root?.querySelectorAll<HTMLButtonElement>("button");
    if (!btns || !btns.length) return null;
    const el = btns[btns.length - 1];
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
  }, DIALOG);
  const inputResting = await faceOf(page, `${DIALOG} input`);
  // the footer pair: Cancel (type=button) + the submit (type=submit)
  const cancelResting = await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    const el = root?.querySelector<HTMLButtonElement>('button[type="button"]');
    // the FIRST type=button in the DOM is the Status select trigger —
    // the footer Cancel is the one whose text is "Cancel"
    const btns = Array.from(root?.querySelectorAll<HTMLButtonElement>('button[type="button"]') ?? []);
    const cancel = btns.find((b) => (b.textContent ?? "").trim() === "Cancel") ?? el ?? null;
    if (!cancel) return null;
    const cs = getComputedStyle(cancel);
    return {
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      boxShadow: cs.boxShadow,
      borderRadius: cs.borderRadius,
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      fontWeight: cs.fontWeight,
    };
  }, DIALOG);
  const submitResting = await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    const el = root?.querySelector<HTMLButtonElement>('button[type="submit"]');
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
  }, DIALOG);

  const rows = await dumpLedger(page, DIALOG);

  // the mount-focus census (the s112 D1 decode) + the mount face
  const mountFocus = await activeId(page);
  const mountFaceRes = await faceOfActive(page);
  const mountFace = mountFaceRes?.face ?? null;
  const mountFocusVisible = mountFaceRes?.matchesFocusVisible ?? false;

  // the REAL keyboard Tab drive: from the mount-focused first input,
  // Tab through the focusable chain — census each stop's FOCUSED face
  // + identity (focus-visible fires only under REAL keyboard focus).
  // The chain (the discovery probe): input x5 · Status · Source ·
  // Cancel · submit · close X = 10 stops, then the wrap.
  const tabStops: Stop[] = [];
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(280);
    const id = await activeId(page);
    const faceRes = await faceOfActive(page);
    tabStops.push({
      stop: i + 1,
      tag: id.split("/")[0],
      id: id.split("/")[1]?.replace("id=", "") ?? "",
      text: id.split("/")[2]?.replace("text=", "") ?? "",
      face: faceRes?.face ?? null,
      matchesFocusVisible: faceRes?.matchesFocusVisible ?? false,
    });
  }

  // the wrap: one more Tab past the last stop (the close X) — the
  // Radix focus trap returns focus to the FIRST focusable
  await page.keyboard.press("Tab");
  await page.waitForTimeout(280);
  const wrapFocus = await activeId(page);

  console.log(
    `[walk54] ${label} @${width} rows: ${rows?.length ?? 0} · mount: ${mountFocus.slice(0, 40)} fv=${mountFocusVisible} · stops: ${tabStops.map((s) => `${s.tag}:${s.id || s.text}`).join(" > ").slice(0, 160)} · wrap: ${wrapFocus.slice(0, 40)}`,
  );

  const res: WalkResult = {
    overlay,
    content,
    title,
    closeXResting,
    inputResting,
    cancelResting,
    submitResting,
    rows,
    mountFocus,
    mountFace,
    mountFocusVisible,
    tabStops,
    wrapFocus,
  };
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

function diffStops(ours: Stop[], ref: Stop[]): string[] {
  const lines: string[] = [];
  const n = Math.max(ours.length, ref.length);
  for (let i = 0; i < n; i++) {
    const a = ours[i];
    const b = ref[i];
    if (!a || !b) {
      lines.push(`tab stop ${i}: only ${a ? "OURS" : "REF"} — ${JSON.stringify(a ?? b)}`);
      continue;
    }
    // the identity comparison: the id carries our ld- prefix superset
    // (the id-name genus) — compare the POSITION + the tag + the text
    if (a.tag !== b.tag) lines.push(`tab stop ${a.stop} TAG: OURS ${a.tag} | REF ${b.tag}`);
    const aId = a.id.replace(/^ld-/, "");
    const bId = b.id.replace(/^ld-/, "");
    if (aId !== bId) lines.push(`tab stop ${a.stop} ID: OURS ${a.id} | REF ${b.id}`);
    if (a.text !== b.text) lines.push(`tab stop ${a.stop} TEXT: OURS ${a.text} | REF ${b.text}`);
    if (a.matchesFocusVisible !== b.matchesFocusVisible) {
      lines.push(`tab stop ${a.stop} FOCUS-VISIBLE: OURS ${a.matchesFocusVisible} | REF ${b.matchesFocusVisible}`);
    }
    if (a.face && b.face) {
      for (const k of Object.keys(a.face) as Array<keyof Face>) {
        if (a.face[k] !== b.face[k]) {
          lines.push(`tab stop ${a.stop} (${a.id || a.text}) face.${k}: OURS ${a.face[k]} | REF ${b.face[k]}`);
        }
      }
    } else {
      lines.push(`tab stop ${a.stop} face presence: OURS ${!!a.face} | REF ${!!b.face}`);
    }
  }
  return lines;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk54] reusing the dev server on :3000");
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
    console.log("[walk54] pair state: ready (the s162 guarded form)");

    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    for (const [w, h] of [
      [1440, 900],
      [390, 844],
    ] as const) {
      const ours = await walk(browser, OUR_URL, state, "OURS", w, h);
      const ref = await walk(browser, REF_URL, state, "REF ", w, h);
      writeFileSync(join(OUT_DIR, `ours-${w}.json`), JSON.stringify(ours, null, 2));
      writeFileSync(join(OUT_DIR, `ref-${w}.json`), JSON.stringify(ref, null, 2));

      report.push(`\n===== NEW-LEAD-DIALOG @${w}x${h} =====`);
      report.push(`mountFocus: OURS ${ours.mountFocus} | REF ${ref.mountFocus}`);
      report.push(`mountFocusVisible: OURS ${ours.mountFocusVisible} | REF ${ref.mountFocusVisible}`);
      report.push(...faceDelta("mountFace", ours.mountFace, ref.mountFace));
      report.push(...faceDelta("overlay", ours.overlay, ref.overlay));
      report.push(...faceDelta("content", ours.content, ref.content));
      report.push(...faceDelta("title", ours.title, ref.title));
      report.push(...faceDelta("closeXResting", ours.closeXResting, ref.closeXResting));
      report.push(...faceDelta("inputResting", ours.inputResting, ref.inputResting));
      report.push(...faceDelta("cancelResting", ours.cancelResting, ref.cancelResting));
      report.push(...faceDelta("submitResting", ours.submitResting, ref.submitResting));
      report.push(`wrapFocus: OURS ${ours.wrapFocus} | REF ${ref.wrapFocus}`);
      report.push(...diffStops(ours.tabStops, ref.tabStops));
      report.push(...diffRows("dialog", ours.rows, ref.rows));
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk54] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk54] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk54] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk54]", e);
  process.exit(1);
});
