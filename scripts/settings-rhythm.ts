// scripts/settings-rhythm.ts — THE SETTINGS INTRADAY-RHYTHM MAP (the
// 159-c rotation: the standing OBSERVATION instrument).
//
// The settings page is the ONE censused surface whose reference state
// is LIVE-EDITED INTRADAY by the workspace owner: the picklist row
// counts swing (the s151-era scattered observations span ~150 rows;
// the s158 PASS-1 decode read the reference's settings PRE-MOUNT at
// 97/68 els mid-load, the settled canonical 256/249). The census
// absorbs the swing via the DATA genera (settings-data ·
// settings-data-cascade · live-data) + the L-152c3 mainH SKIP — this
// tool gives that doctrine its EVIDENCE BASE and every future round a
// one-command capture:
//
//   bun scripts/settings-rhythm.ts --app ref --axis phone --json
//
// THE FINGERPRINT: the per-section picklist row counts, classified by
// DOCUMENT ORDER (the card header renders before its rows — the 159-c
// probe) through two exact-token signatures BOTH apps share:
//   • the card TITLE — DIV + {font-semibold, tracking-tight, text-lg}
//     + non-empty leaf text (byte-equal on both apps, the probe's
//     decode; a RESTYLED title stays unmatched — its rows fall to
//     `unassignedRows`, the safety face, never silently misassigned)
//   • the picklist ROW — the census's standing settingsRowSignature
//     token set (SETTINGS_PICKLIST.itemRow, reused verbatim — the
//     reuse-not-duplicate doctrine)
// The LIVE data — the row counts, the section names, mainH, els — is
// the OBSERVATION, never the contract.
//
// THE T1/T2 PROTOCOL (the rhythm map): capture the reference at all
// four axes at T1 (one invocation, ONE pre-flight login — the 161-c
// consolidated form), again at T2; `--diff a.json b.json` reports the
// swing. The null face (no edit inside the window) is a VALID
// finding — the rhythm's baseline observation.
//
// THIS TOOL IS OBSERVATION-ONLY — NEVER in the gate chain (gate:full
// does not name it; it gates nothing, it observes). The browser twin
// REUSES censusPage + its quiescence (the additive exports — every
// read a SETTLED read, the s158 never-weaker guarantee rides along)
// and the sweep's login/waitOnUrl (the s152 precedent).
//
// The login budget (L-160c1, the 161-c consolidation — the s160
// census doctrine applied to the second walking tool): ONE pre-flight
// login per invocation, REGARDLESS of the --axis count (the count is
// the budget's true axis, never the arrival rate; --app ours counts
// against OUR 10-per-IP/15-min window; `--axis all` walks four axes
// on the one pre-flight state). The stateless HMAC cookie survives
// context recreation (the L-160c2 license, proven live at s160); the
// app's own login limiter is a deliberate security contract, never
// touched.
//
// Run: bun scripts/settings-rhythm.ts [--app ref|ours] (default ref —
//      the observation target is the reference's own live edits)
//      [--axis phone|tablet|landscape|desktop|all] (default phone;
//      unknown names fail fast listing the valid ones — the --axis
//      idiom, reused from the census)
//      [--json] (the machine fingerprint — the T1/T2 files)
//      [--diff <t1.json> <t2.json>] (the rhythm diff, no browser)
// Env: OUR_URL / REF_URL / REF_EMAIL / REF_PASSWORD (the sweep contract)
// ---------------------------------------------------------------------------

import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { login, waitOnUrl } from "./sweep";
import {
  CENSUS_AXES,
  parseAxisArg,
  censusPage,
  settingsRowSignature,
  type CensusCapture,
} from "./interior-census";

// -- the card-title signature (the 159-c probe decode) ------------------------

/** The exact-token card-title construction (the loginLogoMarkSignature
 * idiom: order-independent subset matching). The 159-c probe decoded
 * BOTH apps' settings card titles byte-equal: DIV +
 * `font-semibold tracking-tight text-lg` + the leaf text (the five
 * section names in the same order on both sides). The discriminators
 * the probe verified: the segmented tab buttons are BUTTONs (a
 * different class family), the page H1 is `text-3xl font-bold` (no
 * font-semibold), the subtitle P carries no title token. */
export const SETTINGS_TITLE_TOKENS = ["font-semibold", "tracking-tight", "text-lg"] as const;

/** The title detector: tag DIV + every token of SETTINGS_TITLE_TOKENS
 * present + a non-empty leaf text. A RESTYLED title (e.g. text-base
 * replaces text-lg) stays UNMATCHED — its rows count to
 * `unassignedRows` (the safety face: the observation reports the
 * anomaly instead of silently misassigning rows). */
export function settingsTitleSignature(tag: string, cls: string, text: string): boolean {
  if (tag !== "DIV") return false;
  if (!text) return false;
  const tokens = new Set(cls.split(/\s+/));
  return SETTINGS_TITLE_TOKENS.every((t) => tokens.has(t));
}

// -- the fingerprint (the document-order classifier) --------------------------

export interface SettingsSection {
  title: string;
  rows: number;
}

export interface SettingsFingerprint {
  /** The sections in WALK order (the card header renders before its
   * rows — the document order is the assignment). */
  sections: SettingsSection[];
  totalRows: number;
  /** Rows the classifier could not assign (before any title, or under
   * a restyled/unmatched title) — never silently dropped. */
  unassignedRows: number;
  els: number;
  mainH: number;
}

/** Classify one settings-page capture into the per-section fingerprint.
 * The document order carries the assignment: each matched TITLE opens
 * a section; every picklist ROW (the standing settingsRowSignature
 * contract) beneath it counts to that section until the next title. */
export function settingsFingerprint(capture: CensusCapture): SettingsFingerprint {
  const sections: SettingsSection[] = [];
  let current: SettingsSection | null = null;
  let totalRows = 0;
  let unassignedRows = 0;
  for (const e of capture.els) {
    if (settingsTitleSignature(e.tag, e.cls, e.text)) {
      current = { title: e.text, rows: 0 };
      sections.push(current);
      continue;
    }
    if (settingsRowSignature(e.cls)) {
      totalRows++;
      if (current) current.rows++;
      else unassignedRows++;
    }
  }
  return {
    sections,
    totalRows,
    unassignedRows,
    els: capture.els.length,
    mainH: capture.mainH,
  };
}

// -- the rhythm diff (the T1/T2 map) ------------------------------------------

export interface SettingsSwing {
  from: number;
  to: number;
  delta: number;
}

export interface SettingsRhythmDiff {
  /** The sections present at BOTH captures (a's order first), with
   * their row-count swing — delta 0 included (the complete map). */
  perSection: Array<{ title: string; from: number; to: number; delta: number }>;
  /** Sections only in b (b's order). */
  added: string[];
  /** Sections only in a (a's order). */
  removed: string[];
  totalRows: SettingsSwing;
  els: SettingsSwing;
  mainH: SettingsSwing;
}

/** The T1/T2 rhythm diff: the per-section row-count swings, the added
 * + removed sections (the owner's own edits — the observation, never
 * the contract), and the totalRows/els/mainH swings. */
export function diffFingerprints(a: SettingsFingerprint, b: SettingsFingerprint): SettingsRhythmDiff {
  const aMap = new Map(a.sections.map((s) => [s.title, s.rows]));
  const bMap = new Map(b.sections.map((s) => [s.title, s.rows]));
  const perSection: Array<{ title: string; from: number; to: number; delta: number }> = [];
  for (const s of a.sections) {
    if (bMap.has(s.title)) {
      const to = bMap.get(s.title)!;
      perSection.push({ title: s.title, from: s.rows, to, delta: to - s.rows });
    }
  }
  return {
    perSection,
    added: b.sections.filter((s) => !aMap.has(s.title)).map((s) => s.title),
    removed: a.sections.filter((s) => !bMap.has(s.title)).map((s) => s.title),
    totalRows: { from: a.totalRows, to: b.totalRows, delta: b.totalRows - a.totalRows },
    els: { from: a.els, to: b.els, delta: b.els - a.els },
    mainH: { from: a.mainH, to: b.mainH, delta: b.mainH - a.mainH },
  };
}

// -- the CLI seams (the --axis idiom) ------------------------------------------

/** The --app seam: default ref (the observation target is the
 * REFERENCE's own live edits; `ours` = the seeded control). The
 * fail-fast negatives mirror --axis: never a silent fall-back on a
 * typo. */
export function parseAppArg(argv: string[]): "ref" | "ours" {
  const i = argv.indexOf("--app");
  if (i === -1) return "ref";
  const wanted = argv[i + 1];
  if (wanted !== "ref" && wanted !== "ours") {
    if (wanted === undefined) {
      throw new Error(`invalid --app "" — valid: ref, ours`);
    }
    throw new Error(`unknown --app "${wanted}" — valid: ref, ours`);
  }
  return wanted;
}

/** The --diff seam: null when absent (the capture mode); the exactly-2
 * file paths when present. An arity violation fails fast — never a
 * silent partial diff. */
export function parseDiffArg(argv: string[]): string[] | null {
  const i = argv.indexOf("--diff");
  if (i === -1) return null;
  const files = argv.slice(i + 1).filter((a) => !a.startsWith("--"));
  if (files.length !== 2) {
    throw new Error(`--diff needs exactly 2 file paths (t1.json t2.json) — got ${files.length}`);
  }
  return files;
}

/** The --axis seam: the census's parseAxisArg fail-fast idiom, but the
 * DEFAULT is the phone leg alone; `--axis all` walks the four axes
 * sequentially on the ONE pre-flight state (the 161-c consolidation
 * — the axis count never multiplies the login count). */
function parseRhythmAxisArg(argv: string[]): ReadonlyArray<(typeof CENSUS_AXES)[number]> {
  if (!argv.includes("--axis")) return [CENSUS_AXES[0]];
  return parseAxisArg(argv);
}

// -- the capture + the report ---------------------------------------------------

// THE STDOUT/STDERR CONTRACT: the diagnostics ([rhythm] logging into…)
// log to STDERR; the DATA — the JSON fingerprint, the human
// fingerprint/diff lines — prints to STDOUT. The --json output is
// pipeable and parseable, never interleaved with the log lines (the
// PASS-3 find: the first diff run choked on a log-prefixed T1 file).

const REPO = process.cwd();
const OUR_URL = process.env.OUR_URL ?? "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

/** The diagnostics — STDERR ALWAYS (the data paths print to stdout). */
const log = (s: string) => console.error(`[rhythm] ${s}`);

/** One capture record — the JSON-able unit of a rhythm file. */
interface CaptureRecord {
  app: string;
  axis: string;
  fingerprint: SettingsFingerprint;
}

/** Read a T1/T2 JSON file: the capture mode ALWAYS writes a JSON ARRAY
 * of capture records (one per axis walked); the reader is TOLERANT —
 * a bare single record, or even a bare fingerprint object, reads too
 * (the file's own shape is not the contract, the fingerprint is). */
function readCaptureRecords(p: string): CaptureRecord[] {
  const raw = JSON.parse(readFileSync(p, "utf-8"));
  if (Array.isArray(raw)) return raw as CaptureRecord[];
  if (raw && typeof raw === "object" && "fingerprint" in raw) return [raw as CaptureRecord];
  return [{ app: "?", axis: "?", fingerprint: raw as SettingsFingerprint }];
}

function printFingerprint(fp: SettingsFingerprint, app: string, axisName: string) {
  const out = (s: string) => console.log(s);
  for (const s of fp.sections) {
    out(`${axisName} [${app}] ${s.title}: ${s.rows} rows`);
  }
  out(
    `${axisName} [${app}] totals — rows ${fp.totalRows} · unassigned ${fp.unassignedRows} · els ${fp.els} · mainH ${fp.mainH}`,
  );
}

function printDiff(d: ReturnType<typeof diffFingerprints>, label: string) {
  const out = (s: string) => console.log(s);
  if (label) out(`--- ${label} ---`);
  for (const s of d.perSection) {
    out(`${s.title}: ${s.from} -> ${s.to} rows (${s.delta >= 0 ? "+" : ""}${s.delta})`);
  }
  if (d.added.length) out(`ADDED sections: ${d.added.join(", ")}`);
  if (d.removed.length) out(`REMOVED sections: ${d.removed.join(", ")}`);
  out(
    `the swing — totalRows ${d.totalRows.from} -> ${d.totalRows.to} (${d.totalRows.delta >= 0 ? "+" : ""}${d.totalRows.delta}) · els ${d.els.delta >= 0 ? "+" : ""}${d.els.delta} · mainH ${d.mainH.delta >= 0 ? "+" : ""}${d.mainH.delta}`,
  );
}

// -- the pre-flight login (the 161-c consolidation) ---------------------------

type AuthState = Awaited<ReturnType<import("@playwright/test").BrowserContext["storageState"]>>;

/** The pre-flight login (the 161-c consolidation — the s160 census
 *  construction, single-app form: the rhythm tool walks ONE app per
 *  invocation, so the pre-flight takes the TARGET as its parameter —
 *  the pair walks both apps because the census does; this never does):
 *  ONE context → login the target app → storageState() → close.
 *  Exactly ONE login per invocation, REGARDLESS of the --axis count —
 *  the count is the budget's true axis (L-160c1); the stateless HMAC
 *  cookie survives context recreation (the L-160c2 license, proven
 *  live by the s160 probe). The 429-diagnostic mirrors the census
 *  form: the budget hint to STDERR, then the rethrow — fail-fast. */
async function preflightLogin(
  browser: import("@playwright/test").Browser,
  app: "ref" | "ours",
  base: string,
): Promise<AuthState> {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  try {
    const page = await ctx.newPage();
    log(`the pre-flight login: ${app === "ours" ? "ours " + OUR_URL : "the reference " + REF_URL}…`);
    await login(page, base);
    const state = await ctx.storageState();
    log("the pre-flight state captured (ONE login per invocation — the 161-c consolidation)");
    return state;
  } catch (e) {
    console.error(
      `[rhythm] the pre-flight login FAILED — if the dev log shows 429s, the\n` +
        `10-per-IP/15-min login window is exhausted (the L-158c3/L-160c1 budget\n` +
        `doctrine); the fix: a dev-server restart, then a single re-run.\n` +
        `The app's own login limiter is a deliberate security contract — never\n` +
        `weakened; the rhythm tool consolidates its logins instead (one per run).`,
    );
    throw e;
  } finally {
    await ctx.close();
  }
}

async function run() {
  const argv = process.argv.slice(2);
  const asJson = argv.includes("--json");

  // the diff mode — no browser, no login (the pure seam over two
  // files). The records pair AXIS-BY-AXIS (the four-axis rhythm map:
  // phone T1 vs phone T2, tablet vs tablet, …); a bare-fingerprint
  // file pairs as the single unlabeled diff.
  const diffFiles = parseDiffArg(argv);
  if (diffFiles) {
    const aRecs = readCaptureRecords(diffFiles[0]);
    const bRecs = readCaptureRecords(diffFiles[1]);
    const bByAxis = new Map(bRecs.map((r) => [r.axis, r]));
    const diffs: Array<{ axis: string; diff: ReturnType<typeof diffFingerprints> }> = [];
    const unpaired: string[] = [];
    for (const r of aRecs) {
      const b = r.axis === "?" ? bRecs[0] : bByAxis.get(r.axis);
      if (!b) {
        unpaired.push(r.axis);
        continue;
      }
      diffs.push({ axis: r.axis, diff: diffFingerprints(r.fingerprint, b.fingerprint) });
    }
    for (const r of bRecs) {
      if (!aRecs.some((x) => x.axis === r.axis)) unpaired.push(r.axis);
    }
    if (asJson) {
      console.log(JSON.stringify({ diffs, unpaired }, null, 2));
    } else {
      for (const d of diffs) printDiff(d.diff, aRecs.length > 1 || bRecs.length > 1 ? d.axis : "");
      if (unpaired.length) console.log(`unpaired axes (no counterpart): ${[...new Set(unpaired)].join(", ")}`);
    }
    return;
  }

  // the capture mode
  const app = parseAppArg(argv);
  const base = app === "ours" ? OUR_URL : REF_URL;
  const axes = parseRhythmAxisArg(argv);

  if (app === "ours" && !(await waitOnUrl(`${OUR_URL}/login`, 3000))) {
    log(`the dev server is not up on ${OUR_URL} — bun run dev first (or --app ref)`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  try {
    // the pre-flight login (the 161-c consolidation): ONE login per
    // invocation, the storageState shared by every axis context below
    const authState = await preflightLogin(browser, app, base);
    const records: CaptureRecord[] = [];
    for (const axis of axes) {
      const ctx = await browser.newContext({
        viewport: { width: axis.width, height: axis.height },
        storageState: authState,
      });
      const page = await ctx.newPage();
      log(`walking ${axis.name} ${axis.width}x${axis.height} on the pre-flight state (the 161-c consolidation)…`);
      const capture = await censusPage(page, base, "/settings");
      const fp = settingsFingerprint(capture);
      records.push({ app, axis: axis.name, fingerprint: fp });
      if (!asJson) printFingerprint(fp, app, axis.name);
      await ctx.close();
    }
    // THE JSON CONTRACT: one ARRAY per invocation, one record per axis
    // walked — pipeable, parseable, the diff pairs axis-by-axis.
    if (asJson) console.log(JSON.stringify(records, null, 2));
  } finally {
    await browser.close();
  }
}

// run only when executed directly (bun scripts/settings-rhythm.ts), never on
// the vitest import (the unit pins) — the L-157c1 entry-guard idiom.
if (process.argv[1] && process.argv[1].endsWith("settings-rhythm.ts")) {
  run().catch((e) => {
    console.error("[rhythm]", e);
    process.exit(1);
  });
}
