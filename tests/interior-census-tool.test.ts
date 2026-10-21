import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

/**
 * Session-152 (the 152-c rotation): the INTERIOR-CENSUS TOOL pins —
 * the walk41 throwaway promoted into the STANDING sixth gate.
 *
 * The L-151c2 lesson: below-every-fold (inside main.overflow-auto,
 * past the 844 phone fold and the ~900 desktop sweep fold) is
 * invisible to ALL five standing gates by construction — the F-151c1
 * ghost buttons lived there for 143 sessions. The full-geometry
 * census is the only instrument that sees the zone; this round it
 * stops being a rotation-memory axis and becomes a one-command gate:
 * `bun run census:interior -- --fail-on-drift` chained into
 * gate:full after sweep:fullpage.
 *
 * The house seams-and-pins doctrine (the fullpage tool at s149): the
 * PURE node seams are what these pins exercise; the browser twin
 * carries the same census evaluate. The mutation-proof doctrine is
 * part of the tool's contract: the replanted F-151c1 ghost must RED
 * the gate (documented in the tool header, executed in walk42).
 */

const TOOL = "scripts/interior-census.ts";
const PKG = "package.json";

const toolSrc = () => readFileSync(TOOL, "utf-8");
const pkgSrc = () => JSON.parse(readFileSync(PKG, "utf-8"));

/** A census-element fixture factory (the walk41 field set). */
const el = (over: Partial<{ top: number; left: number; w: number; h: number; tag: string; cls: string; text: string }>) => ({
  top: 0,
  left: 0,
  w: 100,
  h: 20,
  tag: "DIV",
  cls: "a b",
  text: "",
  ...over,
});

describe("session-152: the interior-census tool (the dead-zone standing gate)", () => {
  it("the tool exists", () => {
    expect(existsSync(TOOL)).toBe(true);
  });

  it("the package wiring: `bun run census:interior` + the SIXTH gate in gate:full (appended after sweep:fullpage)", () => {
    const pkg = pkgSrc();
    expect(pkg.scripts["census:interior"]).toBe("bun scripts/interior-census.ts");
    const gate = pkg.scripts["gate:full"] as string;
    expect(gate).toMatch(/census:interior -- --fail-on-drift/);
    // the sixth position: AFTER the s149 fullpage gate (the chain order
    // is load-bearing — the pixel gates first, the geometry gate last)
    expect(gate.indexOf("census:interior")).toBeGreaterThan(gate.indexOf("sweep:fullpage"));
  });

  it("the 12-page census list: the shell surfaces + the login-walled marketing interiors + the login wall (the 156-c about/contact pair + the 157-c login leg — about/contact: the (marketing) group renders AppShell, main.overflow-auto interiors, byte-equal both apps; login: main on both apps, the 157-c probe byte-equal, GUEST and LOGGED-IN identical; the landing stays the PUBLIC leg below)", async () => {
    const m = await import("../scripts/interior-census");
    const pages = m.INTERIOR_PAGES as ReadonlyArray<{ name: string; path: string }>;
    expect(pages.map((p) => p.name)).toEqual([
      "dashboard",
      "accounts",
      "contacts",
      "leads",
      "calendar",
      "activities",
      "reports",
      "settings",
      "profile",
      "about",
      "contact",
      "login",
    ]);
    // lockstep with the sweep's PAGES: the same paths, so the census
    // never drifts from the standing page map (the S68-P4 class)
    const sweep = await import("../scripts/sweep");
    for (const p of pages) {
      const s = (sweep.PAGES as ReadonlyArray<{ name: string; path: string }>).find(
        (x) => x.name === p.name,
      );
      expect(s).toBeDefined();
      expect(s!.path).toBe(p.path);
    }
  });

  it("alignCensus: byte-equal twins pair — match / cls-only / text-only (the geometry-byte-equal doctrine)", async () => {
    const m = await import("../scripts/interior-census");
    const ours = [el({}), el({}), el({ top: 40, text: "x" })];
    const ref = [el({}), el({ cls: "a c" }), el({ top: 40, text: "y" })];
    const ev = m.alignCensus(ours, ref) as Array<{ kind: string }>;
    expect(ev.map((e) => e.kind)).toEqual(["match", "cls-only", "text-only"]);
  });

  it("alignCensus: position-aligned geometry deltas pair as SHIFT (the ≤3px recharts genus) — position-misaligned elements do NOT (they are the offset-cascade face)", async () => {
    const m = await import("../scripts/interior-census");
    // the walk41 recharts decode: ours top 1832 h 267 vs ref top 1829 h 270
    const ev = m.alignCensus([el({ top: 1832, h: 267 })], [el({ top: 1829, h: 270 })]) as Array<{
      kind: string;
      dTop?: number;
    }>;
    expect(ev).toHaveLength(1);
    expect(ev[0].kind).toBe("shift");
    expect(ev[0].dTop).toBe(3);
    // a position-misaligned element (Δtop 20 > the resync pairing
    // window) is NOT a shift — the cascade face goes one-sided
    const ev2 = m.alignCensus([el({ top: 100 })], [el({ top: 120 })]) as Array<{ kind: string }>;
    expect(ev2.map((e) => e.kind)).toEqual(["ours-extra", "ref-extra"]);
  });

  it("alignCensus: the greedy resync — a one-sided ghost subtree emits WITHOUT index cascade; the displaced tail re-pairs at its constant offset (the walk41 lesson)", async () => {
    const m = await import("../scripts/interior-census");
    // the F-151c1 mutation shape: ours carries a 2-node ghost at
    // y=0 (REALISTIC geometry — 75×32 button + a 16×16 svg, never
    // byte-equal to the ref's P, or the tag-swap relaxation would
    // rightly pair them); the tail below is displaced +8px
    const tail = (t: number) => [
      el({ top: t, tag: "P", text: "a", w: 100, h: 20 }),
      el({ top: t + 20, tag: "P", text: "b", w: 100, h: 20 }),
      el({ top: t + 40, tag: "P", text: "c", w: 100, h: 20 }),
    ];
    const ours = [
      el({ top: 4, left: 254, w: 75, h: 32, tag: "BUTTON", cls: "ghost" }),
      el({ top: 12, left: 262, w: 16, h: 16, tag: "SVG", cls: "lucide" }),
      ...tail(8),
    ];
    const ref = [...tail(0)];
    const ev = m.alignCensus(ours, ref) as Array<{ kind: string; dTop?: number }>;
    const kinds: Record<string, number> = {};
    for (const e of ev) kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
    // the ghost subtree: exactly 2 one-sided events — NO cascade
    expect(kinds["ours-extra"]).toBe(2);
    // the displaced tail re-paired at the constant +8 offset
    expect(kinds["shift"]).toBe(3);
    expect(ev.filter((e) => e.kind === "shift").every((e) => e.dTop === 8)).toBe(true);
    // nothing else fired
    expect(kinds["ref-extra"] ?? 0).toBe(0);
  });

  it("attributeGenera: the documented genera absorbed — dead-stub · chart-suppression · s95-wrapper · s95-poke-out · settings-data (+ subtree) · token-mirror · live-data · recharts", async () => {
    const m = await import("../scripts/interior-census");
    const g = (kind: string, over: Record<string, unknown>) => ({ kind, ...over }) as never;
    const events = [
      // the s125/s141 dead-stub genus: the hidden w=0 h=0 stub
      g("ours-extra", { el: el({ w: 0, h: 0, text: "More Filters (1)" }) }),
      // the pinned chart focus-suppression wrapper (ours-extra)
      g("ours-extra", { el: el({ cls: "chart-no-outline" }) }),
      // the s95 table wrapper (ours-extra, the min-w-0 clamp fix)
      g("ours-extra", { el: el({ cls: "p-6 px-0 py-0" }) }),
      // the s95 poke-out: position-aligned width-only shift, ours the
      // clamped side (the reference's bare flex-1 pokes wider)
      g("shift", { el: el({ w: 358, cls: "flex-1 min-w-0" }), ref: el({ w: 472 }), dW: -114 }),
      // the settings DATA rows: the picklist row signature (ours side)…
      g("ours-extra", { el: el({ top: 500, h: 62, w: 330, cls: "flex items-center gap-2 p-2 border rounded-lg" }) }),
      // …and its subtree child (bbox-contained) absorbed with it
      g("ours-extra", { el: el({ top: 510, left: 10, w: 16, h: 16, tag: "SVG" }) }),
      // the token-mirror family: cls-only with byte-equal geometry
      g("cls-only", { el: el({}), ref: el({ cls: "b a" }) }),
      // the live-data genus: text-only
      g("text-only", { el: el({ text: "x" }), ref: el({ text: "y" }) }),
      // the recharts-internal genus: all deltas ≤ 3
      g("shift", { el: el({ top: 103, h: 267 }), ref: el({ top: 100, h: 270 }), dTop: 3, dH: -3 }),
    ];
    const r = m.attributeGenera(events, "settings") as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.unexplained).toEqual([]);
    expect(r.explained.map((e) => e.genus)).toEqual([
      "dead-stub",
      "chart-suppression",
      "s95-wrapper",
      "s95-poke-out",
      "settings-data",
      "settings-data",
      "token-mirror",
      "live-data",
      "recharts-internal",
    ]);
  });

  it("attributeGenera: an unlisted extra is UNEXPLAINED — the F-151c1 ghost class REDs the gate", async () => {
    const m = await import("../scripts/interior-census");
    // the exact retired ghost construction (75x32 h-8 px-3 text-xs
    // text-primary) — the class the s7 bundle extraction pinned
    const ghost = { kind: "ours-extra", el: el({ w: 75, h: 32, tag: "BUTTON", cls: "h-8 px-3 text-xs text-primary" }) } as never;
    const r = m.attributeGenera([ghost, { kind: "ref-extra", el: el({ tag: "BUTTON" }) } as never], "dashboard") as {
      unexplained: unknown[];
    };
    // BOTH sides: an unlisted element on a strict page is drift, ours
    // or the reference's — the census judges both directions
    expect(r.unexplained).toHaveLength(2);
  });

  it("censusVerdict: the byte-parity contract — unexplained or mainH ≠ 0 REDs with ZERO margin; the settings mainH is SKIPPED (the L-150c2 DATA genus)", async () => {
    const m = await import("../scripts/interior-census");
    type PR = { page: string; mainHDelta: number | null; unexplained: unknown[] };
    const v = m.censusVerdict as (rs: PR[]) => { ok: boolean; failures: string[] };
    // clean
    expect(v([{ page: "dashboard", mainHDelta: 0, unexplained: [] }]).ok).toBe(true);
    // the F-151c1 arithmetic: the +16px mainH delta REDs on its own
    expect(v([{ page: "dashboard", mainHDelta: 16, unexplained: [] }]).ok).toBe(false);
    // any unexplained event REDs (zero margin — geometry gates have
    // no raster floor; every delta must ATTRIBUTE)
    expect(v([{ page: "leads", mainHDelta: 0, unexplained: [{}] }]).ok).toBe(false);
    // the settings mainH is skipped: the picklist DATA rows are
    // intraday-volatile in mainH (the L-150c2 lesson — reported,
    // never gated, never widened)
    expect(v([{ page: "settings", mainHDelta: null, unexplained: [] }]).ok).toBe(true);
    expect(v([{ page: "settings", mainHDelta: 86, unexplained: [] }]).ok).toBe(true);
    // …but the settings EXTRAS face still gates
    expect(v([{ page: "settings", mainHDelta: null, unexplained: [{}] }]).ok).toBe(false);
  });

  it("the settings shift face is REPORT-ONLY (the data cascade makes strict shift-gating structurally flaky — the L-150c2 doctrine, documented as the tool's one margin exception)", async () => {
    const m = await import("../scripts/interior-census");
    // a settings shift cascade (rows displaced by the row-count
    // delta): reported with its offset, never a verdict input
    const r = m.attributeGenera(
      [{ kind: "shift", el: el({ top: 824, tag: "P" }), ref: el({ top: 700 }), dTop: 124 } as never],
      "settings",
    ) as { explained: Array<{ genus: string }>; unexplained: unknown[] };
    expect(r.explained.map((e) => e.genus)).toEqual(["settings-data-cascade"]);
    expect(r.unexplained).toEqual([]);
    // the SAME event on a strict page is unexplained — only settings
    // carries the report-only face
    const r2 = m.attributeGenera(
      [{ kind: "shift", el: el({ top: 824, tag: "P" }), ref: el({ top: 700 }), dTop: 124 } as never],
      "dashboard",
    ) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(1);
  });

  it("the never-zeroed doctrine: the zero-data spawn DELETES DATABASE_URL (the s123 F-A guard) + the seed is restored in a FINALLY (the workspace is never left zeroed, even when the census throws)", () => {
    const src = toolSrc();
    // the platform DATABASE_URL override hazard: DELETE the env var,
    // never set it empty (Prisma rejects an empty URL)
    expect(src).toMatch(/delete\s+\w+Env\.DATABASE_URL/);
    expect(src).toMatch(/zero-data\.ts/);
    // the restore rides the finally — BEFORE any gate verdict and
    // even on a thrown census (sweep.ts restores inside the try; this
    // tool closes that gap — the never-zeroed doctrine, properly)
    expect(src).toMatch(/finally\s*\{[\s\S]*db:seed/);
  });

  it("the --pages fail-fast: unknown names throw listing the valid names (the s95 idiom, reused from sweep.ts)", async () => {
    const m = await import("../scripts/interior-census");
    expect(() => m.parsePagesArg(["--pages", "dashboard,bogus"], m.INTERIOR_PAGES)).toThrow(
      /bogus/,
    );
    // the happy path: the subset resolves in the INTERIOR_PAGES order
    // (the deterministic-sequence doctrine — the capture loop shares
    // one fixed sequence; wanted-order is not preserved, the s95 idiom)
    const subset = m.parsePagesArg(["--pages", "leads,dashboard"], m.INTERIOR_PAGES) as Array<{
      name: string;
    }>;
    expect(subset.map((p) => p.name)).toEqual(["dashboard", "leads"]);
  });

  it("alignCensus: the PIECEWISE cascade re-anchor (the settings shape — each card boundary shifts the displacement; the decoder re-anchors at the direct top-delta, never loses sync)", async () => {
    const m = await import("../scripts/interior-census");
    // the settings cascade shape: rows pair at offset 0, ours carries an
    // extra row, then the next card's content is displaced by a NEW
    // offset (the row height) — the boundary must re-anchor directly
    const P = (top: number) => el({ top, tag: "P", text: "r" });
    const card = (top: number) => [
      el({ top, tag: "DIV", left: 16, w: 358, h: 518, cls: "card" }),
      el({ top: top + 20, tag: "DIV", left: 41, w: 308, h: 28, cls: "head" }),
      el({ top: top + 40, tag: "INPUT", left: 41, w: 252, h: 36, cls: "in" }),
    ];
    const ours = [P(0), P(20), P(40), el({ top: 60, tag: "DIV", cls: "row", h: 44, w: 330 }), ...card(300)];
    const ref = [P(0), P(20), P(40), ...card(244)];
    const ev = m.alignCensus(ours, ref) as Array<{ kind: string; dTop?: number }>;
    const kinds: Record<string, number> = {};
    for (const e of ev) kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
    // the extra row emits ONE-SIDED — and the displaced card re-anchors
    // at the direct delta (300-244=56): pairs, NOT a cascade of extras
    expect(kinds["ours-extra"]).toBe(1);
    expect(kinds["ref-extra"] ?? 0).toBe(0);
    expect(kinds["shift"]).toBe(3);
    expect(ev.filter((e) => e.kind === "shift").every((e) => e.dTop === 56)).toBe(true);
  });

  it("the census EXCLUDES the svg glyph interiors — the shape vocabulary never enters the alignment (the icon/chart BOX is censused; the version-borne interior cannot sustain a false resync — the walk42 settings decode)", () => {
    const src = toolSrc();
    // the collector's exclusion set + the skip
    expect(src).toMatch(/SVG_SHAPES = new Set\(\["path", "polyline", "line", "circle", "rect"\]\)/);
    expect(src).toMatch(/SVG_SHAPES\.has\(child\.tagName\)/);
    // the lucide-interior absorption rule is RETIRED with the exclusion
    // (the genus never enters the census; the icon pairs at the svg
    // level as token-mirror cls-only)
    expect(src).not.toMatch(/lucide-interior/);
  });

  it("attributeGenera: the recharts-interior genus — the recharts DOM face (extra wrapper divs by class + extras inside paired chart boxes) absorbed; the settings card-cascade shifts absorbed", async () => {
    const m = await import("../scripts/interior-census");
    const events = [
      // ours' extra recharts wrapper (version drift, the class carries it)
      { kind: "ours-extra", el: el({ tag: "DIV", cls: "recharts-wrapper", w: 308, h: 300 }) },
      // a PAIRED chart container (both sides' responsive container)
      { kind: "match", el: el({ tag: "DIV", top: 1800, cls: "recharts-responsive-container", w: 308, h: 300 }), ref: el({ tag: "DIV", top: 1800, cls: "recharts-responsive-container", w: 308, h: 300 }) },
      // ours' axis line inside the chart box + the ref's tooltip div
      { kind: "ours-extra", el: el({ tag: "line", top: 1820, left: 36, w: 0, h: 260, cls: "" }) },
      { kind: "ref-extra", ref: el({ tag: "DIV", top: 1900, left: 40, w: 308, h: 52, cls: "space-y-3" }) },
      // the settings card-cascade shift (the re-anchored displaced card)
      { kind: "shift", el: el({ tag: "DIV", left: 16, w: 358, h: 580, cls: "card" }), ref: el({ tag: "DIV", left: 16, w: 358, h: 518, cls: "card" }), dTop: 56, dH: 62 },
    ] as never;
    const r = m.attributeGenera(events, "settings") as { explained: Array<{ genus: string }> };
    expect(r.explained.map((e) => e.genus)).toEqual([
      "recharts-interior",
      "recharts-interior",
      "recharts-interior",
      "settings-data-cascade",
    ]);
  });

  it("alignCensus: the tag-swap pairing — byte-equal-relative geometry pairs ACROSS a tag difference (the s76 zone keeps the walk in sync; the -206 card misalignment the maiden decode caught is structurally impossible)", async () => {
    const m = await import("../scripts/interior-census");
    // the calendar shape: ours SPAN / ref DIV at byte-equal boxes,
    // then the grid + cards continue at offset 0 — the tag-mismatched
    // zone must NOT block the walk
    const ours = [
      el({ tag: "SPAN", top: 1250, left: 38, w: 33, h: 0, cls: "space-y-0.5" }),
      el({ tag: "DIV", top: 1346, left: 16, w: 358, h: 182, cls: "card" }),
      el({ tag: "H3", top: 1371, left: 41, w: 308, h: 28, cls: "mb-4 text-lg font-semibold" }),
    ];
    const ref = [
      el({ tag: "DIV", top: 1250, left: 38, w: 33, h: 0, cls: "space-y-0.5" }),
      el({ tag: "DIV", top: 1346, left: 16, w: 358, h: 182, cls: "card" }),
      el({ tag: "H3", top: 1371, left: 41, w: 308, h: 28, cls: "text-lg font-semibold mb-4" }),
    ];
    const ev = m.alignCensus(ours, ref) as Array<{ kind: string }>;
    // the SPAN/DIV pair is a tag-swap EVENT (not a lost-sync zone),
    // the cards pair at offset 0, the H3's class order is cls-only
    expect(ev.map((e) => e.kind)).toEqual(["tag-swap", "match", "cls-only"]);
  });

  it("attributeGenera: the tag-swap genus — ours-extra + ref-extra twins at BYTE-EQUAL geometry absorbed (the s76 calendar day cells: our BUTTON/SPAN vs the reference's DIV, the documented clickable superset)", async () => {
    const m = await import("../scripts/interior-census");
    const events = [
      { kind: "ours-extra", el: el({ tag: "BUTTON", top: 889, left: 33, w: 43, h: 80, cls: "flex min-h-20" }) },
      { kind: "ref-extra", ref: el({ tag: "DIV", top: 889, left: 33, w: 43, h: 80, cls: "min-h-20 sm:min-h-24" }) },
      // a NEAR-twin (one dimension off by 1px) is NOT a tag-swap —
      // geometry must be byte-equal, or it is real drift
      { kind: "ours-extra", el: el({ tag: "SPAN", top: 100, left: 0, w: 33, h: 16 }) },
      { kind: "ref-extra", ref: el({ tag: "DIV", top: 100, left: 0, w: 33, h: 17 }) },
    ] as never;
    const r = m.attributeGenera(events, "calendar") as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained.map((e) => e.genus)).toEqual(["tag-swap", "tag-swap"]);
    expect(r.unexplained).toHaveLength(2); // the near-twin pair stays unexplained
  });

  it("alignCensus: the byte-equal-cls preference — a nesting wrapper on one side never steals its twin's pair (the walk42 mispair decode)", async () => {
    const m = await import("../scripts/interior-census");
    // the contacts shape: the reference nests [flex gap-3] around the
    // same searchWrap ours renders bare — the wrapper is pairable with
    // our twin (same tag/position) but the TRUE twin (byte-equal cls +
    // geometry) sits one step ahead
    const twin = () => el({ tag: "DIV", top: 100, left: 48, w: 174, h: 36, cls: "relative flex-1 max-w-md" });
    const ours = [twin(), el({ top: 140, tag: "INPUT", cls: "in" })];
    const ref = [
      el({ tag: "DIV", top: 100, left: 48, w: 294, h: 36, cls: "flex gap-3" }),
      twin(),
      el({ top: 140, tag: "INPUT", cls: "in" }),
    ];
    const ev = m.alignCensus(ours, ref) as Array<{ kind: string }>;
    // the wrapper goes ref-extra and the twin pairs as a MATCH — never
    // a mispair shift (the Δw=-120 artifact the maiden decode caught)
    expect(ev.map((e) => e.kind)).toEqual(["ref-extra", "match", "match"]);
  });

  it("attributeGenera: the wrapper-twin genus — an extra byte-equal to a PAIRED box absorbs (the reference's space-y-3 nesting wrapper around the paired empty-state P)", async () => {
    const m = await import("../scripts/interior-census");
    const events = [
      {
        kind: "match",
        el: el({ tag: "P", top: 2526, left: 41, w: 308, h: 52, cls: "text-sm text-gray-500 text-center py-4" }),
        ref: el({ tag: "P", top: 2526, left: 41, w: 308, h: 52, cls: "text-sm text-gray-500 text-center py-4" }),
      },
      { kind: "ref-extra", ref: el({ tag: "DIV", top: 2526, left: 41, w: 308, h: 52, cls: "space-y-3" }) },
    ] as never;
    const r = m.attributeGenera(events, "dashboard") as { explained: Array<{ genus: string }> };
    expect(r.explained.map((e) => e.genus)).toEqual(["wrapper-twin"]);
  });

  it("the s95 poke-out discriminator: only the REFERENCE's past-the-floor widths absorb — an in-container width delta (ours 174 vs the ref's nesting div 294) OUTSIDE any poke cascade stays UNEXPLAINED (the walk44 re-anchor: the pair moved below the poked card's box — the s154 cascade pass absorbs the width-only shifts INSIDE a registered poke box, so the negative now pins the outside-the-cascade face)", async () => {
    const m = await import("../scripts/interior-census");
    const events = [
      // the poke-out: the ref card at w=472, past the 358 floor
      { kind: "shift", el: el({ w: 358, cls: "bg-surface rounded-lg shadow" }), ref: el({ w: 472, cls: "bg-white rounded-lg shadow" }), dTop: 0, dLeft: 0, dW: -114, dH: 0 },
      // the in-container width delta OUTSIDE the poked card's box
      // (top 200, below the card) — real drift
      { kind: "shift", el: el({ top: 200, w: 174, cls: "relative flex-1 max-w-md" }), ref: el({ top: 200, w: 294, cls: "flex gap-3" }), dTop: 0, dLeft: 0, dW: -120, dH: 0 },
    ] as never;
    const r = m.attributeGenera(events, "contacts") as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained.map((e) => e.genus)).toEqual(["s95-poke-out"]);
    expect(r.unexplained).toHaveLength(1);
  });

  it("alignSettings: the card segmentation — the row-count delta stays INSIDE its card; the cross-card backward resync (-162, ours card1 rows pairing the reference's card2 rows) is structurally impossible", async () => {
    const m = await import("../scripts/interior-census");
    // the live shape: card1 with a row-count delta + card2 below — the
    // add-row subtree (DIV+INPUT+BUTTON) sustains the re-anchor
    const card = (top: number, rows: number, cls: string) => {
      const els = [
        el({ tag: "DIV", top, left: 16, w: 358, h: 100, cls: `rounded-xl border ${cls}` }),
        el({ tag: "DIV", top: top + 25, left: 41, w: 308, h: 28, cls: "font-semibold tracking-tight text-lg" }),
      ];
      let y = top + 62;
      for (let i = 0; i < rows; i++) {
        els.push(el({ tag: "DIV", top: y, left: 41, w: 308, h: 44, cls: "flex items-center gap-2 p-2 border rounded-lg" }));
        y += 62;
      }
      const addY = top + 70 + rows * 62;
      els.push(el({ tag: "DIV", top: addY, left: 41, w: 308, h: 36, cls: "flex gap-2" }));
      els.push(el({ tag: "INPUT", top: addY, left: 41, w: 252, h: 36, cls: "flex h-9 w-full" }));
      els.push(el({ tag: "BUTTON", top: addY, left: 301, w: 48, h: 36, cls: "inline-flex items-center" }));
      return els;
    };
    // ours card1: 3 rows; the ref card1: 1 row — ours card2 and the
    // ref card2 identical (the cross-card contamination test)
    const ours = [...card(100, 3, "bg-surface"), ...card(600, 1, "bg-surface")];
    const ref = [...card(100, 1, "bg-card"), ...card(400, 1, "bg-card")];
    const ev = m.alignSettings(ours, ref) as Array<{ kind: string; el?: { top: number; tag: string }; ref?: { top: number; tag: string } }>;
    // the 2 extra card1 rows are ours-extra (the row signature absorbs
    // them at attribution) — and NOTHING ELSE is one-sided (card2's
    // add-row subtree and the ref's card1 add-row all pair)
    const oursEx = ev.filter((e) => e.kind === "ours-extra");
    const refEx = ev.filter((e) => e.kind === "ref-extra");
    expect(oursEx.length).toBe(2);
    expect(refEx.length).toBe(0);
    // card2's BUTTON pairs with the ref's card2 BUTTON — never crossed
    // with card1's content (the -162 artifact)
    const card2Btn = ev.find(
      (e) => e.kind !== "ours-extra" && e.kind !== "ref-extra" && e.el?.top === 732 && e.el?.tag === "BUTTON",
    );
    expect(card2Btn).toBeDefined();
    expect(card2Btn!.ref?.top).toBe(532);
  });

  it("the mutation-proof doctrine is part of the tool's documented contract (the replanted F-151c1 ghost → RED; the L-151c2 dead zone closed structurally)", () => {
    const src = toolSrc();
    expect(src).toMatch(/F-151c1/);
    expect(src).toMatch(/L-151c2/);
  });
});

describe("session-153: the census DESKTOP leg (the F-151c1 axis — the dead zone is PER-AXIS, the 153-c rotation)", () => {
  it("the four-axis contract: CENSUS_AXES = phone 390x844 + tablet 768x1024 + landscape 1024x768 + desktop 1440x900 (the s154 extension: the last two blind interior axes — the sweep viewport classes and the census axes now coincide; the census gate covers ALL FOUR legs in one command)", async () => {
    const m = await import("../scripts/interior-census");
    const axes = m.CENSUS_AXES as ReadonlyArray<{ name: string; width: number; height: number }>;
    expect(axes.map((a) => [a.name, a.width, a.height])).toEqual([
      ["phone", 390, 844],
      ["tablet", 768, 1024],
      ["landscape", 1024, 768],
      ["desktop", 1440, 900],
    ]);
  });

  it("contentFloor: the axis floor is a PURE function of the frame — the sidebar + page-root arithmetic (the L-153c2 seam: 390→358 the walk41 anchor · 1440→1120 the F-151c1 axis · the sm mid-band)", async () => {
    const m = await import("../scripts/interior-census");
    // <640: the sidebar hidden, the p-4 page root — the walk41 anchor
    expect(m.contentFloor(390)).toBe(358);
    expect(m.contentFloor(390)).toBe(m.PHONE_CONTENT_FLOOR);
    // ≥768: the w-64 sidebar in flow + the sm:p-8 page root
    expect(m.contentFloor(1440)).toBe(1120);
    expect(m.contentFloor(768)).toBe(448);
    // 640-767: the sidebar still hidden, the sm:p-8 page root
    expect(m.contentFloor(640)).toBe(576);
    // the floor never inverts (a wider frame never floors lower)
    expect(m.contentFloor(1440)).toBeGreaterThan(m.contentFloor(390));
  });

  it("the --axis flag: default ALL (both legs) · one-axis subsets · unknown fail-fast (the --pages idiom, composed)", async () => {
    const m = await import("../scripts/interior-census");
    const all = m.parseAxisArg([]) as ReadonlyArray<{ name: string }>;
    expect(all.map((a) => a.name)).toEqual(["phone", "tablet", "landscape", "desktop"]);
    const phone = m.parseAxisArg(["--axis", "phone"]) as ReadonlyArray<{ name: string }>;
    expect(phone.map((a) => a.name)).toEqual(["phone"]);
    const desktop = m.parseAxisArg(["--axis", "desktop"]) as ReadonlyArray<{ name: string }>;
    expect(desktop.map((a) => a.name)).toEqual(["desktop"]);
    expect(() => m.parseAxisArg(["--axis", "bogus"])).toThrow(/bogus/);
  });

  it("attributeGenera: the s95 poke-out discriminates at the AXIS floor — the desktop past-the-floor shift absorbs; the in-container width delta stays RED; the standing 2-arg phone form unchanged", async () => {
    const m = await import("../scripts/interior-census");
    // the desktop poke-out shape: the reference's bare flex-1 table past
    // the 1120 content floor, position-aligned, width-only
    const r = m.attributeGenera(
      [{ kind: "shift", el: el({ w: 1120, cls: "flex-1 min-w-0" }), ref: el({ w: 1300 }), dW: -180 } as never],
      "accounts",
      1120,
    ) as { explained: Array<{ genus: string }>; unexplained: unknown[] };
    expect(r.explained.map((e) => e.genus)).toEqual(["s95-poke-out"]);
    expect(r.unexplained).toEqual([]);
    // the in-container width delta (ref w=900 INSIDE the 1120 floor) is
    // a REAL regression — RED at the desktop axis exactly as at phone
    const r2 = m.attributeGenera(
      [{ kind: "shift", el: el({ w: 720, cls: "x" }), ref: el({ w: 900 }), dW: -180 } as never],
      "accounts",
      1120,
    ) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(1);
    // the standing 2-arg form keeps the phone floor (back-compat — the
    // s152 pins call attributeGenera(events, page) and stay green)
    const r3 = m.attributeGenera(
      [{ kind: "shift", el: el({ w: 358, cls: "flex-1 min-w-0" }), ref: el({ w: 472 }), dW: -114 } as never],
      "accounts",
    ) as { explained: Array<{ genus: string }> };
    expect(r3.explained.map((e) => e.genus)).toEqual(["s95-poke-out"]);
  });

  it("censusVerdict: the failures carry the AXIS — a desktop-leg defect REDs the gate with the axis named (a phone GREEN never masks a desktop RED); the axis-less standing form stays unprefixed", async () => {
    const m = await import("../scripts/interior-census");
    type PR = { page: string; axis?: string; mainHDelta: number | null; unexplained: unknown[] };
    const v = m.censusVerdict as (rs: PR[]) => { ok: boolean; failures: string[] };
    // phone clean + desktop RED: the gate fails, the failure names the axis
    const verdict = v([
      { page: "dashboard", axis: "phone", mainHDelta: 0, unexplained: [] },
      { page: "dashboard", axis: "desktop", mainHDelta: 0, unexplained: [{}] },
    ]);
    expect(verdict.ok).toBe(false);
    expect(verdict.failures.some((f) => f.includes("desktop") && f.includes("dashboard"))).toBe(true);
    // both axes clean: GREEN
    expect(
      v([
        { page: "dashboard", axis: "phone", mainHDelta: 0, unexplained: [] },
        { page: "dashboard", axis: "desktop", mainHDelta: 0, unexplained: [] },
      ]).ok,
    ).toBe(true);
    // the settings skip holds per-axis (the L-150c2 doctrine, both legs)
    expect(
      v([
        { page: "settings", axis: "desktop", mainHDelta: 86, unexplained: [] },
      ]).ok,
    ).toBe(true);
    // the axis-less standing form: unprefixed (back-compat with the s152 pins)
    const bare = v([{ page: "leads", mainHDelta: 0, unexplained: [{}] }]);
    expect(bare.ok).toBe(false);
    expect(bare.failures[0].startsWith("leads")).toBe(true);
  });

  it("the run loop walks EVERY axis with a fresh context at its viewport; ONE zero-data + ONE seed-restore per invocation (the never-zeroed FINALLY spans both legs); the --json output carries the axis (the s158 re-anchor: the flat axes loop became the BATCHES loop + the walkAxis worker — the doctrine unchanged: every CENSUS_AXES entry, a fresh context at its own viewport, no axis special-cased)", () => {
    const src = toolSrc();
    // the per-axis context (the walk41 axis + the F-151c1 axis) — since
    // s158 inside walkAxis, the s153/s154 loop-form pins re-anchored
    expect(src).toMatch(/for\s*\(const batch of\s+/);
    expect(src).toMatch(/viewport:\s*\{\s*width:\s*axis\.width,\s*height:\s*axis\.height\s*\}/);
    // the json machine contract gains the axis field
    expect(src).toMatch(/axis:\s*r\.axis/);
    // the mutation-proof at the desktop axis is part of the documented
    // contract (the F-151c1 ghost lived at y≈905 @1440 — this leg's
    // reason to exist; executed at s153)
    expect(src).toMatch(/--axis desktop --pages dashboard/);
  });

  it("attributeGenera: the th-label-stretch face (the walk43 desktop decode) — the s29 th>button accessible superset at the desktop axis: our BUTTON keeps the UA fit-content sizing while the reference's DIV stretches to the TH content box (at phone the columns are content-width and the pair is byte-equal — the s152 tag-swap face); same top/left/h + cls + leaf-text, ours.w ≤ ref.w → tag-swap; an ours-width OVERFLOW or a different label NEVER pairs", async () => {
    const m = await import("../scripts/interior-census");
    const btn = (over: Partial<{ w: number; text: string }> = {}) =>
      el({ tag: "BUTTON", top: 437, left: 40, w: 103, h: 20, cls: "flex items-center gap-2", text: "Lead Name", ...over });
    const div = (over: Partial<{ w: number; text: string }> = {}) =>
      el({ tag: "DIV", top: 437, left: 40, w: 177, h: 20, cls: "flex items-center gap-2", text: "Lead Name", ...over });
    // the desktop stretch pair absorbs as tag-swap (the composition genus)
    const r = m.attributeGenera(
      [
        { kind: "ours-extra", el: btn() },
        { kind: "ref-extra", ref: div() },
      ] as never,
      "leads",
    ) as { explained: Array<{ genus: string }>; unexplained: unknown[] };
    expect(r.explained.filter((x) => x.genus === "tag-swap")).toHaveLength(2);
    expect(r.unexplained).toEqual([]);
    // ours WIDER than the reference's container box (the overflow face)
    // never pairs — real drift on both sides
    const r2 = m.attributeGenera(
      [
        { kind: "ours-extra", el: btn({ w: 200 }) },
        { kind: "ref-extra", ref: div() },
      ] as never,
      "leads",
    ) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(2);
    // a different label never pairs (the mispair guard)
    const r3 = m.attributeGenera(
      [
        { kind: "ours-extra", el: btn({ text: "Email" }) },
        { kind: "ref-extra", ref: div() },
      ] as never,
      "leads",
    ) as { unexplained: unknown[] };
    expect(r3.unexplained).toHaveLength(2);
  });

  it("F-153c1 the contacts card's mb-6 RETIRED (the walk43 desktop decode: the session-6 spacing pin was masked at phone by the lg:hidden stub's mt-6 — the adjacent margins collapsed to max(24,24)=24 on BOTH apps; at desktop the stub is display:none and our mb-6 was a standing +24px page-tail delta invisible to every pixel gate — mainH unchanged at both axes, the delta lived in the white space below the last content; the reference's card carries NO margin, live-decoded at 1440; the FILTER BAR keeps its mb-6 — the reference's does carry it)", () => {
    const src = readFileSync("src/app/(app)/contacts/contacts-page.tsx", "utf-8");
    // the card: no margin (the reference's construction, live-decoded)
    expect(src).toMatch(/<Card className="overflow-hidden shadow-sm border-line-strong">/);
    expect(src).not.toMatch(/<Card className="mb-6/);
    // the filter bar keeps its mb-6 (the reference's filter bar DOES
    // carry it — the live decode's control)
    expect(src).toMatch(/cn\(TABLE_CARD\.card, "mb-6"\)/);
  });
});

describe("session-154: the census TABLET legs (the md-boundary axis 768x1024 + the lg-adjacent axis 1024x768 — the 154-c rotation)", () => {
  it("contentFloor at the new axes: the landscape anchor 1024→704 (the w-64 sidebar from md + the sm:p-8 root, the standing ≥768 formula) + the md-BOUNDARY face — 767→703 vs 768→448, the floor DROPS 255px at exactly md because the sidebar enters flow (L-154c1: a wider frame CAN floor lower at a breakpoint; the s153 monotonicity pin spans 390→1440 only, correctly)", async () => {
    const m = await import("../scripts/interior-census");
    // the landscape axis: 1024 − 256 − 64 (the standing formula)
    expect(m.contentFloor(1024)).toBe(704);
    // the md boundary: the sidebar's first-appearance frame
    // (hidden md:flex w-64 — page-layout.ts:203)
    expect(m.contentFloor(767)).toBe(703);
    expect(m.contentFloor(768)).toBe(448);
    // the boundary drop IS the doctrine: the 256px sidebar enters
    // flow at exactly md — the tablet axis's 448px content regime
    // exists at NO other census axis
    expect(m.contentFloor(767) - m.contentFloor(768)).toBe(255);
  });

  it("the --axis flag at the new names: the tablet + landscape one-axis subsets compose (the mutation-proof runs); unknown fail-fast lists all four legs", async () => {
    const m = await import("../scripts/interior-census");
    const tablet = m.parseAxisArg(["--axis", "tablet"]) as ReadonlyArray<{ name: string; width: number }>;
    expect(tablet.map((a) => a.name)).toEqual(["tablet"]);
    expect(tablet[0].width).toBe(768);
    const landscape = m.parseAxisArg(["--axis", "landscape"]) as ReadonlyArray<{ name: string; width: number }>;
    expect(landscape.map((a) => a.name)).toEqual(["landscape"]);
    expect(landscape[0].width).toBe(1024);
    expect(() => m.parseAxisArg(["--axis", "bogus"])).toThrow(/bogus/);
  });

  it("censusVerdict at four axes: a TABLET-leg RED with phone+desktop GREEN fails the gate with the axis named — NO leg masks another (the L-153c1 doctrine at four legs); all-four clean GREEN; the settings skip holds at the new axes (the L-150c2 doctrine)", async () => {
    const m = await import("../scripts/interior-census");
    type PR = { page: string; axis?: string; mainHDelta: number | null; unexplained: unknown[] };
    const v = m.censusVerdict as (rs: PR[]) => { ok: boolean; failures: string[] };
    // phone + desktop clean, tablet RED: the gate fails, the failure
    // names the tablet axis
    const verdict = v([
      { page: "dashboard", axis: "phone", mainHDelta: 0, unexplained: [] },
      { page: "dashboard", axis: "desktop", mainHDelta: 0, unexplained: [] },
      { page: "dashboard", axis: "tablet", mainHDelta: 0, unexplained: [{}] },
      { page: "dashboard", axis: "landscape", mainHDelta: 0, unexplained: [] },
    ]);
    expect(verdict.ok).toBe(false);
    expect(verdict.failures.some((f) => f.includes("tablet") && f.includes("dashboard"))).toBe(true);
    // all four clean: GREEN
    expect(
      v([
        { page: "dashboard", axis: "phone", mainHDelta: 0, unexplained: [] },
        { page: "dashboard", axis: "tablet", mainHDelta: 0, unexplained: [] },
        { page: "dashboard", axis: "landscape", mainHDelta: 0, unexplained: [] },
        { page: "dashboard", axis: "desktop", mainHDelta: 0, unexplained: [] },
      ]).ok,
    ).toBe(true);
    // the settings mainH skip holds at the new axes (the DATA genus)
    expect(
      v([
        { page: "settings", axis: "tablet", mainHDelta: 60, unexplained: [] },
        { page: "settings", axis: "landscape", mainHDelta: 24, unexplained: [] },
      ]).ok,
    ).toBe(true);
  });

  it("the run loop stays DATA-DRIVEN at four legs — the axes loop carries every CENSUS_AXES entry at its own viewport (no axis is special-cased); the tablet mutation-proof is part of the documented contract (--axis tablet --pages dashboard — the F-151c1 class fails at ALL FOUR axes; the s158 re-anchor: the loop feeds planAxisBatches, the batches carry the same data-driven doctrine)", () => {
    const src = toolSrc();
    // the data-driven loop (the s153 seam — unchanged by the s154
    // extension and by the s158 batches re-anchor: the parsed axes feed
    // planAxisBatches and every entry gets its own worker + viewport)
    expect(src).toMatch(/for\s*\(const batch of\s+/);
    expect(src).toMatch(/planAxisBatches\(axes/);
    expect(src).toMatch(/viewport:\s*\{\s*width:\s*axis\.width,\s*height:\s*axis\.height\s*\}/);
    // the tablet mutation-proof doctrine (walk44 PASS 2)
    expect(src).toMatch(/--axis tablet --pages dashboard/);
  });

  it("F-154c1 the dashboard's two header ellipsis buttons render the PX-LESS icon face (the walk44 landscape decode: size=\"sm\" carries the CVA's px-3 text-xs — the s7-era ghost vocabulary the reference's construction lacks; at the tight 1024 title row the px-3 inflates our min-content past w-8, BLOCKING the flex-yield the reference's bare h-8 w-8 performs — title zone 137 vs 150, 3-line vs 2-line wrap, +28px header, +1px mainH; the per-row site's own size=\"icon\" construction is the in-house px-less precedent)", () => {
    const src = readFileSync("src/app/(app)/dashboard/page.tsx", "utf-8");
    // the two header sites: the px-less icon face (h-9 w-9 overridden
    // to h-8 w-8 by the className — the same construction as the
    // per-row ghost at the L-78c3 site)
    expect(src.match(/size="icon" className=\{DASHBOARD_CARD\.ellipsisBtn\}/g) ?? []).toHaveLength(2);
    // the stale sm form retired at BOTH header sites
    expect(src).not.toMatch(/size="sm" className=\{DASHBOARD_CARD\.ellipsisBtn\}/);
    // the CVA contract: the icon size carries NO padding token (the
    // flex-yield's precondition — padding would floor the min-content)
    const btn = readFileSync("src/components/ui/button.tsx", "utf-8");
    expect(btn).toMatch(/icon:\s*"h-9 w-9"/);
    expect(btn).not.toMatch(/icon:[^\n]*px-/);
  });

  it("the s95-poke-out LG face (the walk44 landscape decode): the construction-signature form — ours [flex-1 min-w-0] vs the ref's bare [flex-1], position-aligned, ours narrower by the poke — absorbs WITHOUT the floor test (at 1024 the ref's 472 table does NOT poke past the 704 content floor; its min-content eats the flex row's fair share instead, squeezing its own w-80 rail); the standing floor form holds (the s153 pin); a bare-vs-bare width regression NEVER absorbs", async () => {
    const m = await import("../scripts/interior-census");
    // the lg construction pair: ours clamped to the share (360), the
    // ref poked to its min-content (472) — floor 704 < ref.w, so only
    // the cls signature carries the attribution
    const r = m.attributeGenera(
      [{ kind: "shift", el: el({ w: 360, cls: "flex-1 min-w-0" }), ref: el({ w: 472, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -112, dH: 0 } as never],
      "accounts",
      704,
    ) as { explained: Array<{ genus: string }>; unexplained: unknown[] };
    expect(r.explained.map((e) => e.genus)).toEqual(["s95-poke-out"]);
    expect(r.unexplained).toEqual([]);
    // a bare-vs-bare width regression (no construction signature —
    // a REAL ours defect on an unclamped pair) stays RED
    const r2 = m.attributeGenera(
      [{ kind: "shift", el: el({ w: 360, cls: "flex-1" }), ref: el({ w: 472, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -112, dH: 0 } as never],
      "accounts",
      704,
    ) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(1);
    // ours WIDER than the ref never absorbs (the poke direction is
    // one-way: the ref's bare flex-1 is always the wide side)
    const r3 = m.attributeGenera(
      [{ kind: "shift", el: el({ w: 472, cls: "flex-1 min-w-0" }), ref: el({ w: 360, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: 112, dH: 0 } as never],
      "accounts",
      704,
    ) as { unexplained: unknown[] };
    expect(r3.unexplained).toHaveLength(1);
  });

  it("the s95-poke-out CASCADE face (the walk44 tablet decode): the poke's descendants — a width-only shift whose REF element sits INSIDE a registered poke-out box (the search row 440 + the input 335 inside the ref's poked 472 card) — and the DISPLACED TWIN (the Export CSV pair: byte-equal cls/w/h/text at the same top, the ref twin inside the poke box, ours displaced left by the cascade) both absorb as s95-poke-out; a twin OUTSIDE any poke box (no poke present) and a different-text twin stay RED", async () => {
    const m = await import("../scripts/interior-census");
    // the tablet shape: the card pokes past the 448 floor (absorbed,
    // registers the poke box), then the cascade + the twin ride it
    const events = [
      { kind: "shift", el: el({ top: 454, left: 32, w: 448, cls: "flex-1 min-w-0" }), ref: el({ top: 454, left: 32, w: 472, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -24, dH: 0 },
      { kind: "shift", el: el({ top: 470, left: 48, w: 416, cls: "flex flex-col sm:flex-row gap-3" }), ref: el({ top: 470, left: 48, w: 440, cls: "flex flex-col sm:flex-row gap-3" }), dTop: 0, dLeft: 0, dW: -24, dH: 0 },
      { kind: "ours-extra", el: el({ top: 470, left: 371, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Export CSV" }) },
      { kind: "ref-extra", ref: el({ top: 470, left: 395, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Export CSV" }) },
    ] as never;
    const r = m.attributeGenera(events, "accounts", 448) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained.filter((e) => e.genus === "s95-poke-out")).toHaveLength(4);
    expect(r.unexplained).toEqual([]);
    // NEGATIVE 1: no poke present (the first shift's ref inside the
    // floor) — the cascade shift + the displaced twin stay RED
    const events2 = [
      { kind: "shift", el: el({ top: 454, left: 32, w: 448, cls: "flex-1 min-w-0" }), ref: el({ top: 454, left: 32, w: 440, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: 8, dH: 0 },
      { kind: "shift", el: el({ top: 470, left: 48, w: 416, cls: "flex flex-col sm:flex-row gap-3" }), ref: el({ top: 470, left: 48, w: 440, cls: "flex flex-col sm:flex-row gap-3" }), dTop: 0, dLeft: 0, dW: -24, dH: 0 },
      { kind: "ours-extra", el: el({ top: 470, left: 371, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Export CSV" }) },
      { kind: "ref-extra", ref: el({ top: 470, left: 395, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Export CSV" }) },
    ] as never;
    const r2 = m.attributeGenera(events2, "accounts", 448) as { unexplained: unknown[] };
    expect(r2.unexplained.length).toBeGreaterThanOrEqual(3);
    // NEGATIVE 2: a different-text twin never pairs even inside a poke
    const events3 = [
      { kind: "shift", el: el({ top: 454, left: 32, w: 448, cls: "flex-1 min-w-0" }), ref: el({ top: 454, left: 32, w: 472, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -24, dH: 0 },
      { kind: "ours-extra", el: el({ top: 470, left: 371, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Export CSV" }) },
      { kind: "ref-extra", ref: el({ top: 470, left: 395, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Import CSV" }) },
    ] as never;
    const r3 = m.attributeGenera(events3, "accounts", 448) as { unexplained: unknown[] };
    expect(r3.unexplained.length).toBeGreaterThanOrEqual(2);
    // the real pair carries the token-mirror vocabulary (border-line vs
    // border-input, bg-surface vs bg-background, the hover pairs) — the
    // cls differences absorb exactly as they do on aligned token-mirror
    // pairs; the TAG is the guard (a LINK never pairs with a BUTTON)
    const events4 = [
      { kind: "shift", el: el({ top: 454, left: 32, w: 448, cls: "flex-1 min-w-0" }), ref: el({ top: 454, left: 32, w: 472, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -24, dH: 0 },
      { kind: "ours-extra", el: el({ top: 470, left: 371, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex border border-line bg-surface hover:bg-line-soft h-8 px-3 text-xs", text: "Export CSV" }) },
      { kind: "ref-extra", ref: el({ top: 470, left: 395, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex border border-input bg-background hover:bg-accent h-8 px-3 text-xs", text: "Export CSV" }) },
    ] as never;
    const r4 = m.attributeGenera(events4, "accounts", 448) as { unexplained: unknown[] };
    expect(r4.unexplained).toEqual([]);
    // a different TAG never pairs (the LINK-vs-BUTTON guard)
    const events5 = [
      { kind: "shift", el: el({ top: 454, left: 32, w: 448, cls: "flex-1 min-w-0" }), ref: el({ top: 454, left: 32, w: 472, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -24, dH: 0 },
      { kind: "ours-extra", el: el({ top: 470, left: 371, w: 93, h: 32, tag: "BUTTON", cls: "inline-flex font-medium", text: "Export CSV" }) },
      { kind: "ref-extra", ref: el({ top: 470, left: 395, w: 93, h: 32, tag: "A", cls: "inline-flex font-medium", text: "Export CSV" }) },
    ] as never;
    const r5 = m.attributeGenera(events5, "accounts", 448) as { unexplained: unknown[] };
    expect(r5.unexplained.length).toBeGreaterThanOrEqual(2);
  });

  it("the s95 RAIL-SQUEEZE face (the walk44 landscape decode): at lg the ref's poked table squeezes its own byte-equal-cls w-80 rail — the pair lands as DISPLACED TWINS (the aligner's windows can't pair a 112px horizontal shift) with the RIGHT EDGES COINCIDENT (ref.left + ref.w === ours.left + ours.w: 528+208 === 416+320 — the flex row's right boundary) and the displacement EQUAL TO the poke delta — the twins absorb and register BOTH rail boxes; the squeezed subtree (shifts or extras with either side contained in its side's rail box) absorbs as the cascade; the same twins WITHOUT a matching poke (no right-edge squeeze downstream) stay RED", async () => {
    const m = await import("../scripts/interior-census");
    // the full landscape shape: the poke pair (the cls-form root) + the
    // rail twins + two cascade children (a paired shift inside the
    // rails + an ours-only extra inside our rail)
    const events = [
      { kind: "shift", el: el({ top: 234, left: 32, w: 360, h: 462, cls: "flex-1 min-w-0" }), ref: el({ top: 234, left: 32, w: 472, h: 462, cls: "flex-1" }), dTop: 0, dLeft: 0, dW: -112, dH: 0 },
      { kind: "ours-extra", el: el({ top: 234, left: 416, w: 320, h: 462, cls: "hidden lg:block w-80" }) },
      { kind: "ref-extra", ref: el({ top: 234, left: 528, w: 208, h: 462, cls: "hidden lg:block w-80" }) },
      { kind: "shift", el: el({ top: 235, left: 417, w: 318, h: 60, cls: "flex flex-col space-y-1.5 p-6 pb-3" }), ref: el({ top: 235, left: 529, w: 206, h: 60, cls: "flex flex-col space-y-1.5 p-6 pb-3" }), dTop: 0, dLeft: -112, dW: 112, dH: 0 },
      { kind: "ours-extra", el: el({ top: 259, left: 441, w: 270, h: 24, cls: "flex justify-between items-center" }) },
    ] as never;
    const r = m.attributeGenera(events, "accounts", 704) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained.filter((e) => e.genus === "s95-poke-out")).toHaveLength(5);
    expect(r.unexplained).toEqual([]);
    // NEGATIVE: the same rail twins WITHOUT the right-edge coincidence
    // (ref 528+218 = 746 ≠ 416+320 = 736 — a plain displacement, not the
    // flex-boundary squeeze) and WITHOUT the poke present — the twins
    // + the subtree stay RED
    const events2 = [
      { kind: "ours-extra", el: el({ top: 234, left: 416, w: 320, h: 462, cls: "hidden lg:block w-80" }) },
      { kind: "ref-extra", ref: el({ top: 234, left: 528, w: 218, h: 462, cls: "hidden lg:block w-80" }) },
    ] as never;
    const r2 = m.attributeGenera(events2, "accounts", 704) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(2);
  });

  it("the settings row-boxes register from EVERY signature event (the walk44 tablet decode: the DATA genus's tight-frame face — the picklist rows are byte-equal 166x54 both sides [the labels' slack ran out at 768; the different LIVE-intraday label texts drive different flex cascades] so the rows pair as MATCHES, invisible to the decoder, and the squeezed buttons/svgs/labels inside fall out; the row boxes from ALL events — matches included — restore the containment), and the contained cascade absorbs as settings-data; an extra OUTSIDE any row box stays RED", async () => {
    const m = await import("../scripts/interior-census");
    // the tablet shape: the row is a MATCH (byte-equal box + the row
    // signature cls); the pencil button inside lands as an ours-extra
    // at a different left than any ref twin (the label squeeze)
    const rowCls = "flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50";
    const events = [
      { kind: "match", el: el({ top: 443, left: 289, w: 166, h: 54, cls: rowCls }), ref: el({ top: 443, left: 289, w: 166, h: 54, cls: rowCls }) },
      { kind: "ours-extra", el: el({ top: 452, left: 375, w: 32, h: 36, tag: "BUTTON", cls: "inline-flex rounded-md text-sm h-9 w-9" }) },
    ] as never;
    const r = m.attributeGenera(events, "settings", 448) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained.filter((e) => e.genus === "settings-data").length).toBeGreaterThanOrEqual(1);
    expect(r.unexplained).toEqual([]);
    // NEGATIVE: an extra OUTSIDE the row box (a different zone) stays
    // RED — the containment is box-bounded
    const events2 = [
      { kind: "match", el: el({ top: 443, left: 289, w: 166, h: 54, cls: rowCls }), ref: el({ top: 443, left: 289, w: 166, h: 54, cls: rowCls }) },
      { kind: "ours-extra", el: el({ top: 900, left: 375, w: 32, h: 36, tag: "BUTTON", cls: "inline-flex rounded-md text-sm h-9 w-9" }) },
    ] as never;
    const r2 = m.attributeGenera(events2, "settings", 448) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(1);
  });

  it("the settings VERTICAL displaced-twin face (the walk44 tablet decode): the DATA genus's row-count cascade displaces whole constructions VERTICALLY past the aligner's windows — the add-row twins (ours DIV+INPUT+BUTTON @1977 vs the ref's @1989, the dTop 12: the accumulated intraday row-height delta) and the footer twins (riding the page's mainH delta) — same tag + same leaf-text + same w/h + same LEFT + |dTop| ≤ 96 (the displaced-tail scale) absorbs as settings-data on BOTH sides; a pair displaced beyond the cascade bound (300px — a planted duplicate) and a different-text pair stay RED", async () => {
    const m = await import("../scripts/interior-census");
    // the tablet shape: the add-row twins + the footer twins, both
    // displaced 12px by the row-count cascade
    const events = [
      { kind: "ours-extra", el: el({ top: 1977, left: 57, w: 166, h: 36, cls: "flex gap-2", text: "" }) },
      { kind: "ref-extra", ref: el({ top: 1989, left: 57, w: 166, h: 36, cls: "flex gap-2", text: "" }) },
      { kind: "ours-extra", el: el({ top: 1977, left: 175, w: 48, h: 36, tag: "BUTTON", cls: "inline-flex rounded-md text-sm", text: "" }) },
      { kind: "ref-extra", ref: el({ top: 1989, left: 175, w: 48, h: 36, tag: "BUTTON", cls: "inline-flex rounded-md text-sm", text: "" }) },
      { kind: "ours-extra", el: el({ top: 2094, left: 0, w: 512, h: 53, tag: "FOOTER", cls: "border-t bg-white px-4 py-4", text: "" }) },
      { kind: "ref-extra", ref: el({ top: 2082, left: 0, w: 512, h: 53, tag: "FOOTER", cls: "border-t bg-white px-4 py-4", text: "" }) },
    ] as never;
    const r = m.attributeGenera(events, "settings", 448) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained.filter((e) => e.genus === "settings-data")).toHaveLength(6);
    expect(r.unexplained).toEqual([]);
    // NEGATIVE 1: the same-shape pair displaced 300px (beyond the
    // cascade bound — a planted duplicate construction) stays RED
    const events2 = [
      { kind: "ours-extra", el: el({ top: 100, left: 57, w: 166, h: 36, cls: "flex gap-2", text: "" }) },
      { kind: "ref-extra", ref: el({ top: 400, left: 57, w: 166, h: 36, cls: "flex gap-2", text: "" }) },
    ] as never;
    const r2 = m.attributeGenera(events2, "settings", 448) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(2);
    // NEGATIVE 2: a different leaf-text pair never absorbs (two
    // different same-sized rows at the same left)
    const events3 = [
      { kind: "ours-extra", el: el({ top: 100, left: 57, w: 166, h: 36, tag: "DIV", cls: "flex gap-2", text: "Industries" }) },
      { kind: "ref-extra", ref: el({ top: 112, left: 57, w: 166, h: 36, tag: "DIV", cls: "flex gap-2", text: "Stages" }) },
    ] as never;
    const r3 = m.attributeGenera(events3, "settings", 448) as { unexplained: unknown[] };
    expect(r3.unexplained).toHaveLength(2);
  });
});

describe("session-155: the census LANDING public leg (the last blind surface — the 155-c rotation)", () => {
  it("the PUBLIC_PAGES contract: the landing at '/' joins the census as the PUBLIC leg — GUEST contexts (the s149 fullpage doctrine: no login, no storageState; the reference renders its 'Edit with Base 44' pill to guests, ours never has it); about/contact left this pin's INTERIOR-list re-anchored at s156, login at s157 (the 157-c leg — the login wall IS a main interior: the 157-c probe decoded main on BOTH apps, byte-equal classes; the s155-era 'no main interior' claim RETIRED)", async () => {
    const m = await import("../scripts/interior-census");
    const pub = m.PUBLIC_PAGES as ReadonlyArray<{ name: string; path: string }>;
    expect(pub.map((p) => [p.name, p.path])).toEqual([["landing", "/"]]);
    // the 12 interior pages (the 156-c about/contact pair + the 157-c
    // login leg — the logged-in protocol byte-identical)
    expect(
      (m.INTERIOR_PAGES as ReadonlyArray<{ name: string }>).map((p) => p.name),
    ).toEqual([
      "dashboard",
      "accounts",
      "contacts",
      "leads",
      "calendar",
      "activities",
      "reports",
      "settings",
      "profile",
      "about",
      "contact",
      "login",
    ]);
    // the combined filter list: all 13 names, the interior pages first
    expect(
      (m.CENSUS_ALL_PAGES as ReadonlyArray<{ name: string }>).map((p) => p.name),
    ).toEqual([
      "dashboard",
      "accounts",
      "contacts",
      "leads",
      "calendar",
      "activities",
      "reports",
      "settings",
      "profile",
      "about",
      "contact",
      "login",
      "landing",
    ]);
    // the landing path lockstep with the sweep's own landing entry
    const sweep = await import("../scripts/sweep");
    const sLanding = (sweep.PAGES as ReadonlyArray<{ name: string; path: string }>).find(
      (x) => x.name === "landing",
    );
    expect(sLanding).toBeDefined();
    expect(sLanding!.path).toBe("/");
    // the dispatch: isPublicPage by name
    expect(m.isPublicPage({ name: "landing" })).toBe(true);
    expect(m.isPublicPage({ name: "dashboard" })).toBe(false);
  });

  it("the anchor seam (the walk45 probe decode): the public-leg collector anchors at div.min-h-screen.bg-white (ours id=top at body level; the reference's #root first child — querySelector's first document-order match on BOTH apps) so the guest pill (the body-level div#base44-edit-badge sibling, position:fixed) and the shadcn Toaster portal sit OUTSIDE the anchor and never enter the census; the height seam is documentElement.scrollHeight (the landing scrolls the DOCUMENT — no main.overflow-auto); the public floor is the VIEWPORT column (the s95 discriminator travels with the frame)", () => {
    const src = toolSrc();
    // the anchor selector (both apps' landing root)
    expect(src).toMatch(/div\.min-h-screen\.bg-white/);
    // the pill's exclusion is DOCUMENTED in the tool (never censused,
    // never mirrored — the genus stays in the fullpage STANDING_EXPLAINED)
    expect(src).toMatch(/base44-edit-badge/);
    // the document-scroller height seam
    expect(src).toMatch(/documentElement\.scrollHeight/);
    // the public collector: its own function (the main-anchor
    // protocol untouched)
    expect(src).toMatch(/async function censusPublicPage/);
    // the public leg's floor: the viewport width (the document column)
    expect(src).toMatch(/attributeGenera\(events,\s*p\.name,\s*axis\.width\)/);
  });

  it("the --pages filter composes across BOTH legs (the s95 idiom, the combined list): no flag runs all 13 (the 12 interior + the landing); '--pages landing' selects ONLY the public leg (the mutation-proof idiom); '--pages about,contact' selects the 156-c marketing legs; '--pages login' selects the 157-c login leg (the logged-in phase); mixed selections compose; unknown names fail-fast listing the 13 valid names", async () => {
    const m = await import("../scripts/interior-census");
    const all = m.parsePagesArg([], m.CENSUS_ALL_PAGES) as ReadonlyArray<{ name: string }>;
    expect(all).toHaveLength(13);
    const loginLeg = m.parsePagesArg(["--pages", "login"], m.CENSUS_ALL_PAGES) as ReadonlyArray<{
      name: string;
    }>;
    expect(loginLeg.map((p) => p.name)).toEqual(["login"]);
    const landing = m.parsePagesArg(["--pages", "landing"], m.CENSUS_ALL_PAGES) as ReadonlyArray<{
      name: string;
    }>;
    expect(landing.map((p) => p.name)).toEqual(["landing"]);
    const legs = m.parsePagesArg(["--pages", "contact,about"], m.CENSUS_ALL_PAGES) as ReadonlyArray<{
      name: string;
    }>;
    expect(legs.map((p) => p.name)).toEqual(["about", "contact"]);
    const mixed = m.parsePagesArg(["--pages", "dashboard,landing"], m.CENSUS_ALL_PAGES) as ReadonlyArray<{
      name: string;
    }>;
    expect(mixed.map((p) => p.name)).toEqual(["dashboard", "landing"]);
    expect(() => m.parsePagesArg(["--pages", "nope"], m.CENSUS_ALL_PAGES)).toThrow(/landing/);
  });

  it("the run loop: a fresh GUEST context per axis for the public leg (NO login — the s149 fullpage doctrine; the app-pages login phase GUARDED so a public-only run never logs in; a public-empty selection never opens guest contexts); ONE zero-data + ONE seed-restore per invocation (the never-zeroed FINALLY spans both legs)", () => {
    const src = toolSrc();
    // the per-axis guest contexts (inside the axes loop)
    expect(src).toMatch(/guestCtx/);
    // the login-phase guard (an app-empty selection skips the login)
    expect(src).toMatch(/pages\.length > 0/);
    // the public-phase guard (a public-empty selection skips the guests)
    expect(src).toMatch(/publicPages\.length > 0/);
  });

  it("censusVerdict covers the LANDING rows: docH ≠ 0 REDs (the landing is NEVER skipped — no DATA genus on a static marketing surface); a landing RED at one axis fails with the axis named — no leg masks another (the L-153c1 doctrine at the public leg); the settings skip holds untouched (the L-150c2 doctrine)", async () => {
    const m = await import("../scripts/interior-census");
    // the row factory (the file's `as never` fixture idiom — the
    // dynamic-import namespace is a value, not a type namespace)
    const row = (
      over: Partial<{ axis: string; mainHDelta: number | null; unexplained: unknown[] }>,
    ) =>
      ({
        page: "landing",
        axis: "tablet",
        mainHDelta: 0,
        oursEls: 400,
        refEls: 400,
        matches: 400,
        explained: [],
        unexplained: [],
        ...over,
      }) as never;
    // all-clean at all four legs GREEN
    const clean = m.censusVerdict([
      row({ axis: "phone" }),
      row({ axis: "tablet" }),
      row({ axis: "landscape" }),
      row({ axis: "desktop" }),
    ]);
    expect(clean.ok).toBe(true);
    // a landing docH delta at ONE axis REDs with the axis named
    const bad = m.censusVerdict([
      row({ axis: "phone" }),
      row({ axis: "tablet", mainHDelta: 12 }),
      row({ axis: "landscape" }),
      row({ axis: "desktop" }),
    ]);
    expect(bad.ok).toBe(false);
    expect(bad.failures.some((f) => f.includes("[tablet] landing") && f.includes("12"))).toBe(true);
    // an unexplained landing event REDs (the ghost class)
    const ghost = m.censusVerdict([
      row({
        axis: "phone",
        unexplained: [{ kind: "ours-extra", el: el({ top: 100, tag: "DIV", cls: "ghost" }) }] as never,
      }),
    ]);
    expect(ghost.ok).toBe(false);
    expect(ghost.failures[0]).toContain("[phone] landing");
    // the settings skip untouched (the standing doctrine)
    const settings = m.censusVerdict([
      { page: "settings", axis: "phone", mainHDelta: 86, oursEls: 1, refEls: 1, matches: 0, explained: [], unexplained: [] },
    ]);
    expect(settings.ok).toBe(true);
  });

  it("the landing mutation-proof doctrine is part of the tool's documented contract (the planted ghost in landing-page.tsx → '--pages landing --fail-on-drift' → RED at ALL FOUR axes → the revert → GREEN — the F-151c1 class now fails the gate on the 9 app pages AND the public leg; the L-155c1 surface closure)", () => {
    const src = toolSrc();
    expect(src).toMatch(/--pages landing/);
    // the public leg is pinned in the tool header's doctrine (the
    // GUEST + pill-exclusion contract, the s149 idiom)
    expect(src).toMatch(/GUEST/);
  });

  it("the TEXT-NODE CARDINALITY face (the walk45 landing decode): a text-only pair whose whitespace-stripped texts are byte-equal absorbs as COMPOSITION-SPLIT — the census's leaf-text join(\" \") between DIRECT text nodes reads ours [TEXT(\"$8\")] as \"$8\" where the reference's [TEXT(\"$\"), TEXT(\"8\")] reads \"$ 8\" (textContent byte-equal on both apps, live-verified; ours MERGES what the reference SPLITS — the composition-split genus's TEXT face, the walk42 cls-merge twin; page-agnostic — at byte-equal boxes a real rendered space would widen the box and pair as geometry, so only the join artifact reaches this face); a text-only pair differing BEYOND whitespace never absorbs", async () => {
    const m = await import("../scripts/interior-census");
    // the pricing shape: ours "$8" (one text node) vs the ref "$ 8"
    // (two — the join artifact), byte-equal boxes both sides
    const cardinality = [
      { kind: "text-only", el: el({ text: "$8", tag: "SPAN" }), ref: el({ text: "$ 8", tag: "SPAN" }) },
    ] as never;
    const r = m.attributeGenera(cardinality, "landing", 390) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained[0]?.genus).toBe("composition-split");
    expect(r.unexplained).toEqual([]);
    // NEGATIVE: the texts differ beyond whitespace (a REAL content
    // change — e.g. a repriced tier) never absorbs as composition-split
    // — AND the negative pins the LATENT PASS-2 SELF-MATCH defect (the
    // walk45 decode): pairedOpposite scanned pairedEvents INCLUDING the
    // event itself, and a paired event's own box trivially contains
    // its own element + its own cls tokens are a subset of themselves
    // — masked for three sessions because pass 1 absorbed every paired
    // kind; the landing's workspace-scoped fall-through was the first
    // paired event to ever reach the lookup (it self-absorbed as
    // composition-split until the p === e exclusion)
    const real = [
      { kind: "text-only", el: el({ text: "$8", tag: "SPAN" }), ref: el({ text: "$9", tag: "SPAN" }) },
    ] as never;
    const r2 = m.attributeGenera(real, "landing", 390) as { unexplained: unknown[] };
    expect(r2.unexplained).toHaveLength(1);
  });

  it("the live-data genus is WORKSPACE-SCOPED (the walk45 hazard decode): text-only pairs beyond the cardinality face absorb as live-data on the APP pages (the reference's intraday workspace data — the standing behavior unchanged); on the LANDING — a static marketing surface with NO workspace data — the same pair stays RED (the maiden census had absorbed the landing's pricing pairs as live-data; a future reprice would have been silently absorbed with them)", async () => {
    const m = await import("../scripts/interior-census");
    // the app-page positive: the standing behavior held (a real
    // workspace-text diff on the contacts page)
    const app = [
      { kind: "text-only", el: el({ text: "Acme" }), ref: el({ text: "Acme Corp" }) },
    ] as never;
    const rApp = m.attributeGenera(app, "contacts", 358) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(rApp.explained[0]?.genus).toBe("live-data");
    expect(rApp.unexplained).toEqual([]);
    // the landing negative: the SAME shape stays RED on the static
    // marketing surface (no workspace data — real content drift)
    const landing = [
      { kind: "text-only", el: el({ text: "Acme" }), ref: el({ text: "Acme Corp" }) },
    ] as never;
    const rLanding = m.attributeGenera(landing, "landing", 390) as { unexplained: unknown[] };
    expect(rLanding.unexplained).toHaveLength(1);
  });
});

describe("session-156: the census ABOUT/CONTACT legs (the last two blind interior surfaces — the 156-c rotation)", () => {
  it("the legs contract: about + contact join INTERIOR_PAGES as the login-walled main-interior class (the (marketing) group renders AppShell — main.overflow-auto, the s150 walk + the 156-c probe agree: /about mainH 1731 phone · 1047 desktop · /contact 897 · 953, byte-equal both apps, els 46/46 + 33/33); the paths lockstep with the sweep's own entries; the tool header's stale 'no main.overflow-auto interior' claim retired (the LANDING alone is the true no-main surface — login joined the interiors at s157)", async () => {
    const m = await import("../scripts/interior-census");
    const pages = m.INTERIOR_PAGES as ReadonlyArray<{ name: string; path: string }>;
    // the two legs land after profile (the interior order; login lands
    // after them — the 157-c leg, re-anchored here)
    expect(pages.slice(-3).map((p) => [p.name, p.path])).toEqual([
      ["about", "/about"],
      ["contact", "/contact"],
      ["login", "/login"],
    ]);
    // the sweep lockstep (both entries are standing sweep PAGES — the
    // s144 pair, now censused too)
    const sweep = await import("../scripts/sweep");
    for (const name of ["about", "contact"] as const) {
      const p = pages.find((x) => x.name === name)!;
      const s = (sweep.PAGES as ReadonlyArray<{ name: string; path: string }>).find(
        (x) => x.name === name,
      );
      expect(s).toBeDefined();
      expect(s!.path).toBe(p.path);
    }
    // the header doctrine re-anchored: the 12 shell-interior pages (the
    // stale "marketing surfaces (landing/about/contact) … no
    // main.overflow-auto interior" claim RETIRED at s156; the s156
    // header's own "and login have no main interior" claim RETIRED at
    // s157 — login IS a main interior)
    const src = toolSrc();
    expect(src).toMatch(/12 shell-interior pages/);
    expect(src).not.toMatch(/landing\/about\/contact/);
  });

  it("the scope keys on the POSITIVE DATA class (the 157-c hazard face — L-156c2 taken to the invariant): live-data is a WORKSPACE-SURFACE genus — text-only pairs absorb ONLY on the 9 CENSUS_DATA_PAGES (the reference's intraday workspace data, the standing behavior); every other surface — landing, about, contact, the LOGIN wall, and any future surface — stays RED BY DEFAULT (a changed 'Sign in' headline on /login or a headline on /about is REAL content drift; the s156 NEGATIVE keying — absorb unless on the static list — would have reopened the walk45 hazard on the login leg exactly as !isPublicPage did on about/contact: the DEFAULT is the hazard's next face, so the scope flips to absorb-only-on-members)", async () => {
    const m = await import("../scripts/interior-census");
    // the positive class: the 9 DATA pages by name
    expect(m.CENSUS_DATA_PAGES).toEqual([
      "dashboard",
      "accounts",
      "contacts",
      "leads",
      "calendar",
      "activities",
      "reports",
      "settings",
      "profile",
    ]);
    // the predicate: the DATA members absorb, everything else REDs
    for (const name of [
      "dashboard",
      "accounts",
      "contacts",
      "leads",
      "calendar",
      "activities",
      "reports",
      "settings",
      "profile",
    ] as const) {
      expect(m.isCensusDataPage({ name })).toBe(true);
    }
    for (const name of ["landing", "about", "contact", "login"] as const) {
      expect(m.isCensusDataPage({ name })).toBe(false);
    }
    // the s156 negative keying RETIRED (the exports + the dispatch form)
    expect((m as Record<string, unknown>).STATIC_MARKETING_PAGES).toBeUndefined();
    expect((m as Record<string, unknown>).isStaticMarketingPage).toBeUndefined();
    const src = toolSrc();
    expect(src).toMatch(/isCensusDataPage\(\{ name: page \}\)/);
    expect(src).not.toMatch(/isStaticMarketingPage/);
    // the fixture: a text-only pair stays RED on the login wall (the
    // 157-c leg — the walk45 hazard's auth face) and on the standing
    // static surfaces
    const pair = [
      { kind: "text-only", el: el({ text: "Sign in to continue" }), ref: el({ text: "Welcome back" }) },
    ] as never;
    const rLogin = m.attributeGenera(pair, "login", 358) as { unexplained: unknown[] };
    expect(rLogin.unexplained).toHaveLength(1);
    const rAbout = m.attributeGenera(pair, "about", 358) as { unexplained: unknown[] };
    expect(rAbout.unexplained).toHaveLength(1);
    const rLanding = m.attributeGenera(pair, "landing", 390) as { unexplained: unknown[] };
    expect(rLanding.unexplained).toHaveLength(1);
    // the fixture positive: the same pair still absorbs as live-data on
    // the DATA pages (the contacts page, the s155/s156 standing form)
    const rContacts = m.attributeGenera(pair, "contacts", 358) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(rContacts.explained[0]?.genus).toBe("live-data");
    expect(rContacts.unexplained).toEqual([]);
  });

  it("censusVerdict covers the about/contact rows: mainH ≠ 0 REDs (the static legs are NEVER skipped — no DATA genus); a leg RED at one axis fails with the axis named — no leg masks another (the L-153c1 doctrine at the new legs); the settings skip holds untouched (the L-150c2 doctrine)", async () => {
    const m = await import("../scripts/interior-census");
    const row = (
      page: string,
      over: Partial<{ axis: string; mainHDelta: number | null; unexplained: unknown[] }>,
    ) =>
      ({
        page,
        axis: "phone",
        mainHDelta: 0,
        oursEls: 46,
        refEls: 46,
        matches: 46,
        explained: [],
        unexplained: [],
        ...over,
      }) as never;
    // all-clean at all four axes GREEN (both legs)
    const clean = m.censusVerdict([
      row("about", { axis: "phone" }),
      row("about", { axis: "tablet" }),
      row("about", { axis: "landscape" }),
      row("about", { axis: "desktop" }),
      row("contact", { axis: "phone" }),
      row("contact", { axis: "desktop" }),
    ]);
    expect(clean.ok).toBe(true);
    // an about mainH delta at ONE axis REDs with the axis named
    const bad = m.censusVerdict([
      row("about", { axis: "phone" }),
      row("about", { axis: "tablet", mainHDelta: 12 }),
      row("contact", { axis: "phone" }),
    ]);
    expect(bad.ok).toBe(false);
    expect(bad.failures.some((f) => f.includes("[tablet] about") && f.includes("12"))).toBe(true);
    // the LOGIN rows ride the same verdict (the 157-c leg — surface-agnostic,
    // born-green like the s155/s156 legs): all-four-axes clean GREENs, a
    // mainH delta at one axis REDs axis-prefixed, an unexplained ghost REDs
    const loginClean = m.censusVerdict([
      row("login", { axis: "phone" }),
      row("login", { axis: "tablet" }),
      row("login", { axis: "landscape" }),
      row("login", { axis: "desktop" }),
    ]);
    expect(loginClean.ok).toBe(true);
    const loginBad = m.censusVerdict([
      row("login", { axis: "phone", mainHDelta: 44 }),
      row("login", { axis: "desktop" }),
    ]);
    expect(loginBad.ok).toBe(false);
    expect(loginBad.failures[0]).toContain("[phone] login");
    // a contact ghost REDs (the F-151c1 class)
    const ghost = m.censusVerdict([
      row("contact", {
        axis: "phone",
        unexplained: [{ kind: "ours-extra", el: el({ top: 100, tag: "DIV", cls: "ghost" }) }] as never,
      }),
    ]);
    expect(ghost.ok).toBe(false);
    expect(ghost.failures[0]).toContain("[phone] contact");
    // the settings skip untouched (the standing doctrine)
    const settings = m.censusVerdict([
      { page: "settings", axis: "phone", mainHDelta: 86, oursEls: 1, refEls: 1, matches: 0, explained: [], unexplained: [] },
    ]);
    expect(settings.ok).toBe(true);
  });

  it("the about/contact mutation-proof doctrine is part of the tool's documented contract (the planted ghost in about/page.tsx → '--pages about --fail-on-drift' → RED → the revert → GREEN — the F-151c1 class now fails the gate on all TWELVE censused surfaces; the header's --pages examples name the new legs)", () => {
    const src = toolSrc();
    // the header's --pages example list carries the new legs
    expect(src).toMatch(/--pages leads,settings,about/);
    // the run-loop comment: the combined list is the 13-name census
    expect(src).toMatch(/no flag runs all 13/);
  });
});

describe("session-157: the census LOGIN-WALL leg (the last never-censused rendered surface — the 157-c rotation)", () => {
  it("the leg contract: login joins INTERIOR_PAGES as the STATIC-AUTH main-interior class (the 157-c probe: both apps render /login inside main — byte-equal classes 'min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4', mainH 844 phone · 900 desktop byte-equal, els 51/51, GUEST and LOGGED-IN identical — the S23-P2 card-to-authed-visitors evidence re-validated); the path locksteps with the sweep's own login entry (the S96 capture); the censusPage collector works AS-IS (main-anchored)", async () => {
    const m = await import("../scripts/interior-census");
    const pages = m.INTERIOR_PAGES as ReadonlyArray<{ name: string; path: string }>;
    const leg = pages.find((p) => p.name === "login")!;
    expect(leg.path).toBe("/login");
    // the sweep lockstep (login is a standing sweep PAGES path since S96)
    const sweep = await import("../scripts/sweep");
    const s = (sweep.PAGES as ReadonlyArray<{ name: string; path: string }>).find(
      (x) => x.name === "login",
    );
    expect(s).toBeDefined();
    expect(s!.path).toBe(leg.path);
    // the login leg is NOT public (the logged-in protocol — the census
    // login phase already runs; the probe proved the authed card
    // byte-equal to the guest card)
    expect(m.isPublicPage({ name: "login" })).toBe(false);
  });

  it("the login mutation-proof doctrine is part of the tool's documented contract: the header names '--pages login' (the 157-c mutation-proof idiom — the logged-in phase, no guest contexts); the tool header documents the login leg's protocol (the static-auth surface — no workspace data, the text-only RED default)", () => {
    const src = toolSrc();
    // the header's --pages docs name the login leg
    expect(src).toMatch(/--pages login/);
    // the header names the static-auth class (the scope's newest member)
    expect(src).toMatch(/login wall/);
  });

  it("the LOGIN-LOGO-MARK genus (the walk47 decode): our CSS brand mark — the ours-extra SPAN with the h-10/sm:h-12 rounded-full bg-sidebar token family — is the standing face at every axis (the reference's ring loads the WORKSPACE OWNER'S UPLOADED LOGO instead: a Base44-prod storage img, the owner's own 'Screenshot2026-02-05' upload — LIVE BRANDING DATA, the Base44-pill genus class, never mirrored; the ring boxes pair byte-equal as cls-only token-mirrors and the ref img absorbs as the ring's wrapper-twin; only OUR mark is extra); the genus absorbs ONLY the exact standing signature — a different tag, a restyled token set, or the same shape on another page stays RED (the mutation-proof guard)", async () => {
    const m = await import("../scripts/interior-census");
    const mark = [
      {
        kind: "ours-extra",
        el: el({ tag: "SPAN", cls: "flex h-10 w-10 items-center justify-center rounded-full bg-sidebar sm:h-12 sm:w-12" }),
      },
    ] as never;
    const r = m.attributeGenera(mark, "login", 358) as {
      explained: Array<{ genus: string }>;
      unexplained: unknown[];
    };
    expect(r.explained[0]?.genus).toBe("login-logo-mark");
    expect(r.unexplained).toEqual([]);
    // NEGATIVE: a different tag never absorbs (the ghost-plant guard)
    const divMark = [
      {
        kind: "ours-extra",
        el: el({ tag: "DIV", cls: "flex h-10 w-10 items-center justify-center rounded-full bg-sidebar sm:h-12 sm:w-12" }),
      },
    ] as never;
    expect((m.attributeGenera(divMark, "login", 358) as { unexplained: unknown[] }).unexplained).toHaveLength(1);
    // NEGATIVE: a restyled mark (a changed token set) stays RED — the
    // face re-derives when the construction changes
    const restyled = [
      {
        kind: "ours-extra",
        el: el({ tag: "SPAN", cls: "flex h-12 w-12 items-center justify-center rounded-full bg-sidebar" }),
      },
    ] as never;
    expect((m.attributeGenera(restyled, "login", 358) as { unexplained: unknown[] }).unexplained).toHaveLength(1);
    // NEGATIVE: the same shape on ANOTHER page stays RED (the genus is
    // page-keyed — the settings-data precedent)
    const onAbout = [
      {
        kind: "ours-extra",
        el: el({ tag: "SPAN", cls: "flex h-10 w-10 items-center justify-center rounded-full bg-sidebar sm:h-12 sm:w-12" }),
      },
    ] as never;
    expect((m.attributeGenera(onAbout, "about", 358) as { unexplained: unknown[] }).unexplained).toHaveLength(1);
    // the src pins: the genus named in the documented-genera header + the
    // exported signature (the settingsRowSignature idiom)
    const src = toolSrc();
    expect(src).toMatch(/login-logo-mark/);
    expect(src).toMatch(/loginLogoMarkSignature/);
  });
});

describe("session-158: the census PARALLEL-AXES option (the 158-c rotation)", () => {
  it("planAxisBatches: the pure partition seam — the default (1) is the standing sequential semantics (one axis per batch, walked in order); parallel 4 = ONE batch of 4 (the gate:full form); 2 = two waves; capped at the axes count (no empty workers); order-preserving; the single-axis mutation-proof runs cap naturally; empty input", async () => {
    const m = await import("../scripts/interior-census");
    const A = m.CENSUS_AXES as ReadonlyArray<{ name: string; width: number; height: number }>;
    const names = (xs: ReadonlyArray<{ name: string }>) => xs.map((x) => x.name);
    // parallel 1 — the standing sequential semantics
    const one = m.planAxisBatches(A, 1);
    expect(one).toHaveLength(4);
    for (const b of one) expect(b).toHaveLength(1);
    expect(names(one.flat())).toEqual(names(A));
    // parallel 4 — the gate:full form: ONE batch of 4
    const four = m.planAxisBatches(A, 4);
    expect(four).toHaveLength(1);
    expect(four[0]).toHaveLength(4);
    expect(names(four.flat())).toEqual(names(A));
    // parallel 2 — two waves
    const two = m.planAxisBatches(A, 2);
    expect(two).toHaveLength(2);
    expect(two[0]).toHaveLength(2);
    expect(two[1]).toHaveLength(2);
    expect(names(two.flat())).toEqual(names(A));
    // capped — no empty workers at any width
    const capped = m.planAxisBatches(A, 99);
    expect(capped).toHaveLength(1);
    expect(capped[0]).toHaveLength(4);
    // the single-axis mutation-proof runs (--axis phone --pages login)
    // cap naturally — a 4-way flag on one axis is one worker
    const single = m.planAxisBatches(A.slice(0, 1), 4);
    expect(single).toHaveLength(1);
    expect(single[0]).toHaveLength(1);
    // empty input — no batches, no workers
    expect(m.planAxisBatches([], 4)).toEqual([]);
  });

  it("LOGIN_STAGGER_MS: the no-burst constant (4000ms — worker i of a batch delays its login phase by i×4000, the four our-logins spread over ~12s; L-157c3 the census's own logins are a scarce resource: the login limiter is 10-per-IP/15-min fixed-window and 429s also increment; parallelism multiplies the ARRIVAL RATE, not the LOGIN COUNT)", async () => {
    const m = await import("../scripts/interior-census");
    expect(m.LOGIN_STAGGER_MS).toBe(4000);
  });

  it("parseParallelArg: default 1 (the standing sequential protocol — the no-flag form byte-identical); --parallel N parses; the fail-fast negatives (the --axis idiom — never a silent fall-back on a typo)", async () => {
    const m = await import("../scripts/interior-census");
    expect(m.parseParallelArg([])).toBe(1);
    expect(m.parseParallelArg(["--fail-on-drift"])).toBe(1);
    expect(m.parseParallelArg(["--json"])).toBe(1);
    expect(m.parseParallelArg(["--parallel", "4"])).toBe(4);
    expect(m.parseParallelArg(["--fail-on-drift", "--parallel", "2"])).toBe(2);
    // NEGATIVE: < 1 never parses (zero/negative = no workers)
    expect(() => m.parseParallelArg(["--parallel", "0"])).toThrow();
    expect(() => m.parseParallelArg(["--parallel", "-1"])).toThrow();
    // NEGATIVE: non-numeric throws
    expect(() => m.parseParallelArg(["--parallel", "four"])).toThrow();
    // NEGATIVE: the missing value throws (never a silent 1)
    expect(() => m.parseParallelArg(["--parallel"])).toThrow();
  });

  it("the concurrent collection is INPUT-ORDER deterministic: each batch gathers through Promise.allSettled (resolves in input order, NEVER completion order) so the report + the --json shape stay byte-identical under concurrency; a rejected worker DRAINS the batch then rethrows (the never-zeroed FINALLY unchanged — the seed restore rides the same try)", () => {
    const src = toolSrc();
    expect(src).toMatch(/Promise\.allSettled/);
    // the batches loop replaces the flat axes loop (the s158 form)
    expect(src).toMatch(/for\s*\(const batch of\s+/);
    // the per-axis worker (the extracted standing per-axis body) carries
    // the fresh context at its viewport
    expect(src).toMatch(/walkAxis/);
    expect(src).toMatch(/viewport:\s*\{\s*width:\s*axis\.width,\s*height:\s*axis\.height\s*\}/);
    // the stagger is applied inside the worker (the login-phase delay)
    expect(src).toMatch(/LOGIN_STAGGER_MS/);
    // one zero-data + one seed-restore per invocation — OUTSIDE the
    // batches (the never-zeroed doctrine spans every batch)
    expect(src).toMatch(/delete\s+\w+Env\.DATABASE_URL/);
    expect(src).toMatch(/finally\s*\{[\s\S]*db:seed/);
  });

  it("the tool header documents the parallel option + the login-budget doctrine (L-157c3 formalized: the axes walk CONCURRENTLY, each worker logs in ONCE, the stagger spreads the arrivals; the probe-validated 4-way form named for gate:full)", () => {
    const src = toolSrc();
    expect(src).toMatch(/--parallel/);
    expect(src).toMatch(/stagger/i);
  });

  it("the gate:full census leg runs the proven concurrency: `census:interior -- --fail-on-drift --parallel 4` (the probe-validated form on the standing 2-core box — the ~26-min gate projects to ~7-8 min; the SIX-GATE CHAIN STAYS SIX COMMANDS; --fail-on-drift still the verdict; the sixth position after sweep:fullpage unchanged)", () => {
    const pkg = pkgSrc();
    const gate = pkg.scripts["gate:full"] as string;
    expect(gate).toMatch(/census:interior -- --fail-on-drift --parallel 4/);
    expect(gate.indexOf("census:interior")).toBeGreaterThan(gate.indexOf("sweep:fullpage"));
  });
});

describe("session-158b: the QUIESCENCE extension (the PASS-1 decode — the fixed settle does not survive concurrent load)", () => {
  it("the read is a SETTLED read: BOTH collectors extend the standing 2500ms settle with a quiescence poll — a geometry fingerprint sampled until QUIESCENCE_STABLE_SAMPLES consecutive samples agree (QUIESCENCE_INTERVAL_MS apart), capped by QUIESCENCE_CEILING_MS (the read-never-weaker guarantee: the ceiling falls back to the standing behavior, the floor is never skipped); the s58 constants exported for the pins — the GATE-TAIL hardening (the gate:full census leg caught what the standalone PASS-1 missed: under the chain's load tail a starved recharts entrance stalled past the 2x150ms window + the 6s ceiling [the [desktop] reports tooltip read MID-ENTRANCE] and a starved settings mount landed in a >300ms gap [ours pre-mount read as 34 ref-extra] — the window widens to 3x400ms and the ceiling to 12s)", async () => {
    const m = await import("../scripts/interior-census");
    expect(m.QUIESCENCE_STABLE_SAMPLES).toBe(3);
    expect(m.QUIESCENCE_INTERVAL_MS).toBe(400);
    expect(m.QUIESCENCE_CEILING_MS).toBe(12000);
    const src = toolSrc();
    // BOTH collectors carry the extension (the app leg + the public leg —
    // the read-too-early class hit ours AND the reference inside our
    // slowed browser alike: [desktop] reports' recharts tooltip read
    // mid-entrance [ours w55 h46 vs the settled w22 h22]; the reference's
    // settings rows read pre-mount at tablet/landscape/desktop)
    const pair = src.match(
      /await page\.waitForTimeout\(2500\);\s*await waitQuiescent\(page\);/g,
    ) ?? [];
    expect(pair).toHaveLength(2);
    // the geometry fingerprint: scrollHeight + element count + a rounded
    // geometry accumulation over every main descendant (catches the
    // mid-animation tooltip's SIZE transition, not just DOM mutation)
    expect(src).toMatch(/scrollHeight/);
  });

  it("the PASS-1 doctrine is part of the tool's documented contract: the header names the quiescence extension (the 158-c decode — the fixed 2500ms settle does not survive 4-way load on the 2-core box; the poll is the cure, the ceiling the never-weaker guarantee)", () => {
    const src = toolSrc();
    expect(src).toMatch(/quiescence/i);
    expect(src).toMatch(/read-too-early|pre-mount|mid-entrance/i);
  });
});
