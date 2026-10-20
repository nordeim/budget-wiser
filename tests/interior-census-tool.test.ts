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

  it("the 9-page census list: the shell surfaces only — no landing/about/contact/login (they have no internal scroller; other gates own them)", async () => {
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

  it("the s95 poke-out discriminator: only the REFERENCE's past-the-floor widths absorb — an in-container width delta (ours 174 vs the ref's nesting div 294) stays UNEXPLAINED", async () => {
    const m = await import("../scripts/interior-census");
    const events = [
      // the poke-out: the ref card at w=472, past the 358 floor
      { kind: "shift", el: el({ w: 358, cls: "bg-surface rounded-lg shadow" }), ref: el({ w: 472, cls: "bg-white rounded-lg shadow" }), dTop: 0, dLeft: 0, dW: -114, dH: 0 },
      // the in-container width delta: both inside the floor — real drift
      { kind: "shift", el: el({ w: 174, cls: "relative flex-1 max-w-md" }), ref: el({ w: 294, cls: "flex gap-3" }), dTop: 0, dLeft: 0, dW: -120, dH: 0 },
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
  it("the two-axis contract: CENSUS_AXES = phone 390x844 + desktop 1440x900 (the F-151c1 axis; the census gate covers BOTH legs in one command)", async () => {
    const m = await import("../scripts/interior-census");
    const axes = m.CENSUS_AXES as ReadonlyArray<{ name: string; width: number; height: number }>;
    expect(axes.map((a) => [a.name, a.width, a.height])).toEqual([
      ["phone", 390, 844],
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
    expect(all.map((a) => a.name)).toEqual(["phone", "desktop"]);
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

  it("the run loop walks EVERY axis with a fresh context at its viewport; ONE zero-data + ONE seed-restore per invocation (the never-zeroed FINALLY spans both legs); the --json output carries the axis", () => {
    const src = toolSrc();
    // the per-axis context (the walk41 axis + the F-151c1 axis)
    expect(src).toMatch(/for\s*\(const axis of\s+/);
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
