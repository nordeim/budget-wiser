import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * Session-159 (the 159-c rotation): the SETTINGS-RHYTHM TOOL pins —
 * the intraday-rhythm observation instrument.
 *
 * The settings page is the ONE censused surface whose reference state
 * is LIVE-EDITED INTRADAY by the workspace owner (the picklist row
 * counts swing ~150 rows; the s158 PASS-1 decode read the reference's
 * settings PRE-MOUNT at 97/68 els mid-load, the settled canonical
 * 256/249). The census absorbs this via the DATA genera + the L-152c3
 * mainH SKIP — but the doctrine rested on SCATTERED incidental
 * observations, never a systematic capture. This round ships the
 * standing instrument: `bun scripts/settings-rhythm.ts` — the
 * per-section picklist fingerprint (the card-title classifier + the
 * settingsRowSignature row counts) + the T1/T2 rhythm diff.
 *
 * THE OBSERVATION-ONLY CONTRACT: the tool is NEVER in the gate chain
 * (gate:full does not name it); it reads the construction both apps
 * share (the exact-token title signature + the standing row signature)
 * and reports the LIVE data (the row counts, the names) — the
 * observation, never the contract.
 *
 * The house seams-and-pins doctrine: the PURE node seams are what
 * these pins exercise; the browser twin reuses censusPage +
 * waitQuiescent (the additive exports — the settled read, the s158
 * never-weaker guarantee rides along). The entry guard ships at birth
 * (L-157c1: a script that runs on import is a test-time bomb).
 */

const CENSUS_TOOL = "scripts/interior-census.ts";
const RHYTHM_TOOL = "scripts/settings-rhythm.ts";
const PKG = "package.json";

const censusSrc = () => readFileSync(CENSUS_TOOL, "utf-8");
const rhythmSrc = () => readFileSync(RHYTHM_TOOL, "utf-8");
const pkgSrc = () => JSON.parse(readFileSync(PKG, "utf-8"));

/** A census-element fixture factory (the walk41 field set). */
function el(p: Partial<{ top: number; left: number; w: number; h: number; tag: string; cls: string; text: string }>) {
  return {
    top: p.top ?? 0,
    left: p.left ?? 0,
    w: p.w ?? 100,
    h: p.h ?? 28,
    tag: p.tag ?? "DIV",
    cls: p.cls ?? "",
    text: p.text ?? "",
  };
}

/** The standing card-title construction (the 159-c probe: byte-equal
 * on BOTH apps — the five section names in the same order). */
const TITLE = "font-semibold tracking-tight text-lg";
/** The standing picklist-row construction (SETTINGS_PICKLIST.itemRow —
 * the census's settingsRowSignature token set). */
const ROW = "flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50";

describe("session-159: the settings-rhythm tool (the intraday-rhythm observation instrument)", () => {
  it("the additive exports: the census module ships settingsRowSignature + censusPage + waitQuiescent + CensusCapture for the instrument (the reuse-not-duplicate doctrine — the s152 login/waitOnUrl precedent; additive, zero behavior)", async () => {
    const m = await import("../scripts/interior-census");
    expect(typeof m.settingsRowSignature).toBe("function");
    expect(typeof m.censusPage).toBe("function");
    expect(typeof m.waitQuiescent).toBe("function");
    // the census header documents the re-export contract
    expect(censusSrc()).toMatch(/Session-159: waitQuiescent \+ censusPage \+ settingsRowSignature are/);
    // the row contract is the STANDING one (the tool must not fork it)
    expect(m.settingsRowSignature(ROW)).toBe(true);
    expect(m.settingsRowSignature("flex items-center gap-2 p-2 border rounded-xl")).toBe(false);
  });

  it("settingsTitleSignature: the exact-token title detector — the standing construction (DIV + font-semibold tracking-tight text-lg + non-empty leaf text), extra tokens tolerated (order-independent), the token constant exported", async () => {
    const m = await import("../scripts/settings-rhythm");
    expect([...m.SETTINGS_TITLE_TOKENS].sort()).toEqual(["font-semibold", "text-lg", "tracking-tight"]);
    // the standing construction — positive
    expect(m.settingsTitleSignature("DIV", TITLE, "Contact Sources")).toBe(true);
    // extra tokens tolerated, order-independent (the v3-compat class-order
    // immunity — the settingsRowSignature idiom)
    expect(m.settingsTitleSignature("DIV", "text-lg font-semibold tracking-tight", "Industries")).toBe(true);
    expect(m.settingsTitleSignature("DIV", `${TITLE} text-gray-900`, "Lead Stages")).toBe(true);
  });

  it("settingsTitleSignature: the negatives — the tab BUTTON, the H1, the subtitle P, a restyled title, an empty text, a wrong tag all stay UNMATCHED (a restyle never silently matches — the rows fall to unassigned, the safety face)", async () => {
    const m = await import("../scripts/settings-rhythm");
    // the segmented tab button — a BUTTON with the inline-flex family
    expect(
      m.settingsTitleSignature("BUTTON", "inline-flex items-center justify-center rounded-md px-3 py-1 text-sm", "CRM Configuration"),
    ).toBe(false);
    // the page H1 — font-bold, no font-semibold
    expect(m.settingsTitleSignature("H1", "text-3xl font-bold text-gray-900", "Settings")).toBe(false);
    // the subtitle P
    expect(m.settingsTitleSignature("P", "text-gray-500 mt-1", "Configure your CRM preferences and defaults")).toBe(false);
    // a RESTYLED title — the exact-token set is the contract (text-base
    // drops text-lg: UNMATCHED — the future restyle REDs the observation
    // rather than silently misassigning rows)
    expect(m.settingsTitleSignature("DIV", "font-semibold tracking-tight text-base", "Contact Sources")).toBe(false);
    // empty leaf text — never a section
    expect(m.settingsTitleSignature("DIV", TITLE, "")).toBe(false);
    // wrong tag
    expect(m.settingsTitleSignature("SPAN", TITLE, "Contact Sources")).toBe(false);
  });

  it("settingsFingerprint: the document-order classifier — the title opens a section, the rows beneath it count to it (the header renders before the content — the 159-c probe); the sections in WALK order; els + mainH pass through", async () => {
    const m = await import("../scripts/settings-rhythm");
    const capture = {
      mainH: 3059,
      els: [
        el({ tag: "H1", cls: "text-3xl font-bold text-gray-900", text: "Settings" }),
        el({ tag: "BUTTON", cls: "inline-flex items-center", text: "CRM Configuration" }),
        el({ cls: TITLE, text: "Contact Sources", top: 213 }),
        el({ cls: ROW, top: 265 }),
        el({ cls: ROW, top: 327 }),
        el({ cls: ROW, top: 389 }),
        el({ cls: TITLE, text: "Lead Stages", top: 685 }),
        el({ cls: ROW, top: 737 }),
        el({ cls: ROW, top: 799 }),
        el({ tag: "SPAN", cls: "flex-1", text: "Call", top: 280 }),
      ],
    };
    const fp = m.settingsFingerprint(capture);
    expect(fp.sections).toEqual([
      { title: "Contact Sources", rows: 3 },
      { title: "Lead Stages", rows: 2 },
    ]);
    expect(fp.totalRows).toBe(5);
    expect(fp.unassignedRows).toBe(0);
    expect(fp.els).toBe(10);
    expect(fp.mainH).toBe(3059);
  });

  it("settingsFingerprint: the safety faces — rows BEFORE any title count unassigned (never silently dropped), a title with zero rows keeps its empty section (the reference's 'No items yet' state), and the rows are counted via the STANDING settingsRowSignature contract (extra tokens tolerated, a missing token is not a row)", async () => {
    const m = await import("../scripts/settings-rhythm");
    const fp = m.settingsFingerprint({
      mainH: 1000,
      els: [
        // a row before ANY title — unassigned (the classifier never
        // silently assigns it to a section it cannot see)
        el({ cls: ROW, top: 100 }),
        el({ cls: TITLE, text: "Contact Sources" }),
        el({ cls: ROW, top: 265 }),
        // a row with EXTRA tokens still counts (token-subset)
        el({ cls: `${ROW} extra-token`, top: 500 }),
        // an EMPTY section — the reference's own zero-row state
        el({ cls: TITLE, text: "Lead Stages" }),
        // a NEAR-row missing rounded-lg is NOT a row
        el({ cls: "flex items-center gap-2 p-2 border extra", top: 600 }),
      ],
    });
    expect(fp.sections).toEqual([
      { title: "Contact Sources", rows: 2 },
      { title: "Lead Stages", rows: 0 },
    ]);
    expect(fp.totalRows).toBe(3);
    expect(fp.unassignedRows).toBe(1);
  });

  it("diffFingerprints: the rhythm diff — the per-section deltas (title-keyed), the added + removed sections, the totalRows/els/mainH swings", async () => {
    const m = await import("../scripts/settings-rhythm");
    const t1 = {
      sections: [
        { title: "Contact Sources", rows: 5 },
        { title: "Lead Stages", rows: 4 },
        { title: "Activity Types", rows: 8 },
      ],
      totalRows: 17,
      unassignedRows: 0,
      els: 249,
      mainH: 2973,
    };
    const t2 = {
      sections: [
        { title: "Contact Sources", rows: 3 },
        { title: "Lead Stages", rows: 4 },
        { title: "Account Tiers", rows: 6 },
      ],
      totalRows: 13,
      unassignedRows: 0,
      els: 211,
      mainH: 2600,
    };
    const d = m.diffFingerprints(t1, t2);
    expect(d.perSection).toEqual([
      { title: "Contact Sources", from: 5, to: 3, delta: -2 },
      { title: "Lead Stages", from: 4, to: 4, delta: 0 },
    ]);
    expect(d.removed).toEqual(["Activity Types"]);
    expect(d.added).toEqual(["Account Tiers"]);
    expect(d.totalRows).toEqual({ from: 17, to: 13, delta: -4 });
    expect(d.els).toEqual({ from: 249, to: 211, delta: -38 });
    expect(d.mainH).toEqual({ from: 2973, to: 2600, delta: -373 });
  });

  it("parseAppArg: the --app CLI seam (the --axis idiom) — default ref (the observation target is the reference's own live edits), ours valid, a typo/missing value fails fast listing the valid ones", async () => {
    const m = await import("../scripts/settings-rhythm");
    expect(m.parseAppArg([])).toBe("ref");
    expect(m.parseAppArg(["--axis", "phone"])).toBe("ref");
    expect(m.parseAppArg(["--app", "ref"])).toBe("ref");
    expect(m.parseAppArg(["--app", "ours"])).toBe("ours");
    expect(() => m.parseAppArg(["--app", "reference"])).toThrow(/unknown --app "reference" — valid: ref, ours/);
    expect(() => m.parseAppArg(["--app"])).toThrow(/invalid --app ""/);
  });

  it("parseDiffArg: the --diff CLI seam — null when absent (the capture mode), the two file paths when present, an arity violation fails fast (never a silent partial diff)", async () => {
    const m = await import("../scripts/settings-rhythm");
    expect(m.parseDiffArg([])).toBe(null);
    expect(m.parseDiffArg(["--app", "ref", "--axis", "phone"])).toBe(null);
    expect(m.parseDiffArg(["--diff", "/tmp/t1.json", "/tmp/t2.json"])).toEqual(["/tmp/t1.json", "/tmp/t2.json"]);
    expect(() => m.parseDiffArg(["--diff", "/tmp/t1.json"])).toThrow(/--diff needs exactly 2/);
    expect(() => m.parseDiffArg(["--diff", "a", "b", "c"])).toThrow(/--diff needs exactly 2/);
    expect(() => m.parseDiffArg(["--diff"])).toThrow(/--diff needs exactly 2/);
  });

  it("the entry guard ships at birth (L-157c1: a script that runs on import is a test-time bomb — the sweep.ts/interior-census.ts direct-execution guard idiom; the vitest import of this module never boots a browser)", async () => {
    const src = rhythmSrc();
    expect(src).toMatch(/process\.argv\[1\]\.endsWith\("settings-rhythm\.ts"\)/);
    // the guard wraps the run — the guarded call shape
    expect(src).toMatch(/run\(\)\.catch/);
  });

  it("the stdout/stderr contract: the diagnostics log to STDERR, the data (the JSON fingerprint / the diff) to STDOUT — the --json output is pipeable and parseable, NEVER interleaved with the log lines (the PASS-3 find: the diff mode choked on a log-prefixed T1 file)", async () => {
    const src = rhythmSrc();
    // the diagnostics ([rhythm] logging into…) — stderr ALWAYS
    expect(src).toMatch(/const log = \(s: string\) => console\.error/);
    // the data paths — stdout ALWAYS (the --json object + the human
    // fingerprint/diff lines)
    expect(src).toMatch(/console\.log\(JSON\.stringify/);
  });

  it("the observation-only doctrine: the tool is NEVER in the gate chain (gate:full does not name it) + the reuse imports are the standing seams (login/waitOnUrl from sweep · censusPage/waitQuiescent/settingsRowSignature from interior-census — reuse, not duplicate) + the header documents the T1/T2 protocol", async () => {
    const pkg = pkgSrc();
    const gate: string = pkg.scripts["gate:full"];
    expect(gate).not.toContain("settings-rhythm");
    const src = rhythmSrc();
    // the reuse imports — the standing seams
    expect(src).toMatch(/import \{[^}]*login[^}]*\} from "\.\/sweep"/);
    expect(src).toMatch(/import \{[^}]*censusPage[^}]*\} from "\.\/interior-census"/);
    // the header documents the observation-only contract
    expect(src).toMatch(/observation-only/i);
    expect(src).toMatch(/NEVER in the gate/i);
    // the census export note rides in the census header too (already
    // pinned above via censusSrc — the pair contract)
    expect(censusSrc()).toContain("settings-rhythm.ts");
  });
});

describe("session-161: the rhythm LOGIN CONSOLIDATION (the 161-c rotation — the s160 doctrine's second application, the walking-tool family's other member)", () => {
  it("the ONE-LOGIN-PER-INVOCATION contract: the login lives in ONE pre-flight phase (preflightLogin — ONE context, login the target app, storageState(), close), exactly one login per invocation regardless of the --axis count — the capture loop is LOGIN-FREE (the ours control burned 4 our-logins per --axis all invocation, one per axis context; the count is the budget's true axis — L-160c1 applied to the second walking tool)", async () => {
    const src = rhythmSrc();
    // the pre-flight helper: ONE context, the target login, the state
    // capture, the close
    expect(src).toMatch(/preflightLogin/);
    expect(src).toMatch(/storageState\(\)/);
    // the capture loop body: NO login call (the per-axis call site
    // retired; the loop only opens state-carrying contexts)
    const loopBody = src.slice(src.indexOf("for (const axis of axes)"));
    const loopSlice = loopBody.slice(0, loopBody.indexOf("// THE JSON CONTRACT"));
    expect(loopSlice).not.toMatch(/await login\(/);
  });

  it("the STORAGE-STATE PROPAGATION contract: every axis context in the capture loop carries the pre-flight state (the stateless HMAC cookie survives context recreation — the L-160c2 license, proven live by the s160 probe; the settled-read guarantee rides along untouched — censusPage's quiescence, the read side never changes)", async () => {
    const src = rhythmSrc();
    // the axis context gains the state
    expect(src).toMatch(/storageState:\s*\w+/);
    // the loop slice carries it
    const loopBody = src.slice(src.indexOf("for (const axis of axes)"));
    const loopSlice = loopBody.slice(0, loopBody.indexOf("// THE JSON CONTRACT"));
    expect(loopSlice).toMatch(/storageState/);
  });

  it("the 429-DIAGNOSTIC transfers: the pre-flight login failure logs the budget hint to STDERR (the s159 stdout/stderr contract — the --json stdout NEVER interleaved) then RETHROWS (fail-fast, never a silent fall-back; the census form adapted to the single-app rhythm context)", async () => {
    const src = rhythmSrc();
    // the hint names the budget + the doctrine
    expect(src).toMatch(/10-per-IP\/15-min/);
    expect(src).toMatch(/L-160c1/);
    // the hint goes to STDERR (console.error), inside the pre-flight's
    // catch — then the error rethrows
    expect(src).toMatch(/console\.error\([\s\S]*?10-per-IP\/15-min/);
    const helperBody = src.slice(src.indexOf("function preflightLogin"));
    const helperSlice = helperBody.slice(0, helperBody.indexOf("\nasync function ") > 0 ? helperBody.indexOf("\nasync function ") : undefined);
    expect(helperSlice).toMatch(/throw e/);
  });

  it("the HEADER RE-ANCHOR: the login-budget paragraph now documents the L-160c1 count doctrine (ONE login per invocation, the count — never the arrival rate); the OLD per-axis language RETIRED — 'one login each' and 'never a burst' both gone (the arrival-rate stagger treated the symptom; s160 retired the doctrine, 161 retires its letter in the second tool)", async () => {
    const src = rhythmSrc();
    // the new doctrine tokens
    expect(src).toMatch(/L-160c1/);
    expect(src).toMatch(/161-c/);
    // the old language retired
    expect(src).not.toMatch(/one login each/);
    expect(src).not.toMatch(/never a burst/);
  });

  it("the REUSE + OBSERVATION-ONLY doctrines held: login still imported from ./sweep (the pre-flight's own seam — reuse, not duplicate), censusPage still the read engine, and the tool still NEVER in the gate chain (gate:full does not name it)", async () => {
    const src = rhythmSrc();
    expect(src).toMatch(/import \{[^}]*login[^}]*\} from "\.\/sweep"/);
    expect(src).toMatch(/import \{[^}]*censusPage[^}]*\} from "\.\/interior-census"/);
    const gate: string = pkgSrc().scripts["gate:full"];
    expect(gate).not.toContain("settings-rhythm");
  });
});
