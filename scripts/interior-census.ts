// ---------------------------------------------------------------------------
// scripts/interior-census.ts — the INTERIOR full-geometry census gate (the
// SIXTH gate)
//
// Session-152 (the 152-c rotation): the walk41 throwaway promoted into a
// standing repo tool. The L-151c2 lesson: below-every-fold (inside
// main.overflow-auto, past the 844 phone fold and the ~900 desktop sweep
// fold) is structurally invisible to ALL five standing gates — the pixel
// sweeps clip at their capture height, the fullpage gate sees only public
// long-scroll documents. The F-151c1 ghost buttons (two stale "+ Add"
// constructions the s7 bundle extraction pinned, 143 sessions old) lived
// exactly there; only the full-geometry census saw them. This tool makes
// that census a one-command gate chained into gate:full after
// sweep:fullpage — the dead zone is closed STRUCTURALLY, not by rotation
// memory.
//
// THE MUTATION-PROOF DOCTRINE (walk42 PASS 2, part of this tool's
// contract): replanting the F-151c1 ghost (a "+ Add" button in a dashboard
// card header, below every fold) must RED this gate with the ghost decoded
// as OURS-EXTRA/unexplained — the exact defect class that survived 143
// sessions now fails `bun run census:interior -- --fail-on-drift` in one
// command. Executed and verified at s152; re-execute on any decoder change.
// The s153 extension adds the DESKTOP leg (walk43): the same ghost at the
// desktop axis (`--axis desktop --pages dashboard` — the ghost lived at
// y≈905 @1440, below every desktop sweep fold) must RED the desktop leg
// exactly as the phone leg REDs — the dead zone is PER-AXIS (L-153c1),
// and the census now walks BOTH legs in one invocation.
//
// The protocol (sweep.ts's, reused not duplicated): reuse-or-boot the dev
// server (the platform DATABASE_URL spawn guard) → zero our domain data
// (scripts/zero-data.ts — users + the Setting singleton stay) → login BOTH
// apps → per page: nav + main-visible wait + settle + the census evaluate
// → decode → report → the seed restored in a FINALLY (the never-zeroed
// doctrine — this tool closes the gap sweep.ts leaves when it throws
// mid-run: the restore rides the finally, so the workspace is never left
// zeroed even on a thrown census).
//
// The census (the walk41 idiom): both apps logged in at the CENSUS AXES
// — 390×844 (phone, the walk41 axis) + 1440×900 (desktop, the 153-c
// extension: the F-151c1 axis) — every element inside `main` censused:
// content-relative top/left, w, h, tag, class, leaf-text, plus mainH =
// main.scrollHeight (the internal scroller's content height). The PURE
// decode seams (alignCensus / attributeGenera / censusVerdict /
// contentFloor / parseAxisArg) are what the unit pins exercise. The
// dead zone is PER-AXIS (L-153c1): the phone leg proves the 390 interior,
// the desktop leg the 1440 interior — one viewport never covers the
// other's layout tree.
//
// The verdict is BYTE-PARITY, zero margin: geometry gates have no raster
// floor, so every delta must ATTRIBUTE to a documented genus or it is
// drift. The documented genera (never for mirroring):
//   • token-mirror   — cls-only pairs, geometry byte-equal (the
//                      lucide DOM-composition + v3-compat class-order +
//                      space-y-hazard families, the walk41 decode)
//   • live-data      — text-only pairs, geometry byte-equal (the
//                      reference's intraday workspace data)
//   • recharts-internal — paired shifts with all deltas ≤ 3px (the
//                      3px y-axis top/height drift, version-borne)
//   • dead-stub      — one-sided extras at w=0 AND h=0 (the s125/s141
//                      hidden-stub genus; invisible geometry)
//   • chart-suppression — ours-extra `chart-no-outline` wrappers (the
//                      pinned focus-outline construction, 2+3+4 sites)
//   • s95-wrapper    — ours-extra `px-0` CardContent (our min-w-0
//                      in-box-scroll table fix)
//   • s95-poke-out   — position-aligned width-only shifts where OURS
//                      carries the min-w-0/overflow-x-auto/px-0 clamp
//                      and the REFERENCE pokes wider (its bare flex-1
//                      cards, its own standing defect)
//   • settings-data  — the settings page's picklist rows (the row
//                      signature + bbox-contained subtrees; both sides
//                      render the identical template, counts differ
//                      intraday) + the settings-data-cascade shifts
//                      (the row-count delta displaces everything below)
//
// The ONE margin exception (L-152c3, the L-150c2 doctrine extended): the
// settings page's mainH is SKIPPED and its shift face is REPORT-ONLY —
// the picklist DATA is LIVE-EDITED INTRADAY by the owner, so mainH and
// the below-rows displacement are functions of the row count, not of the
// template. The settings gate face is the EXTRAS census (a new or missing
// element on the page still REDs) + the pairwise row alignment when
// counts match; the pixel sweeps hold the band structure at their own
// settings baseline. Never widened — skipped, and documented.
//
// Run: bun run census:interior [--fail-on-drift] [--json]
//      [--axis phone|desktop|all]  (default all — the gate covers both
//      legs in one command; the mutation-proof runs one axis)
//      [--pages leads,settings]  (the sweep's subset idiom, fail-fast;
//      composes with --axis)
// Env: OUR_URL / REF_URL / REF_EMAIL / REF_PASSWORD (the sweep contract)
// ---------------------------------------------------------------------------

import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { chromium } from "@playwright/test";
import { login, waitOnUrl, parsePagesArg } from "./sweep";

/** Re-exported for the unit pins (the --pages fail-fast is the sweep's
 *  own seam — reused, not duplicated; the s95 idiom). */
export { parsePagesArg };

/** The 9 app pages — the shell surfaces with the internal scroller. The
 *  marketing surfaces (landing/about/contact) and login have no
 *  main.overflow-auto interior; their gates are the viewport sweeps +
 *  the fullpage gate. Lockstep with the sweep's PAGES paths. */
export const INTERIOR_PAGES = [
  { name: "dashboard", path: "/dashboard" },
  { name: "accounts", path: "/accounts" },
  { name: "contacts", path: "/contacts" },
  { name: "leads", path: "/leads" },
  { name: "calendar", path: "/calendar" },
  { name: "activities", path: "/activities" },
  { name: "reports", path: "/reports" },
  { name: "settings", path: "/settings" },
  { name: "profile", path: "/Profile" },
] as const;

export type InteriorPage = (typeof INTERIOR_PAGES)[number];

/** The walk41 census element (the geometry floor is integer px). */
export interface CensusEl {
  top: number;
  left: number;
  w: number;
  h: number;
  tag: string;
  cls: string;
  text: string;
}

export type CensusEventKind =
  | "match"
  | "cls-only"
  | "text-only"
  | "shift"
  | "tag-swap"
  | "ours-extra"
  | "ref-extra";

export interface CensusEvent {
  kind: CensusEventKind;
  el?: CensusEl;
  ref?: CensusEl;
  dTop?: number;
  dLeft?: number;
  dW?: number;
  dH?: number;
}

/** The recharts-internal genus bound: paired shifts with every delta
 *  ≤ this are version drift below the pixel floor (walk41: the 3px
 *  y-axis top/height shift). Anything larger must attribute elsewhere. */
export const RECHARTS_TOL = 3;

/** The 390×844 frame's content-column floor (the walk41 decode: main's
 *  p-4 padding leaves 358px). The s95 poke-out discriminator: the
 *  REFERENCE's bare flex-1 tables poke past it (w=472); a width delta
 *  between two in-container boxes is NOT the poke-out. */
export const PHONE_CONTENT_FLOOR = 358;

// -- the census axes (the 153-c extension) -------------------------------

export interface CensusAxis {
  name: string;
  width: number;
  height: number;
}

/** The two census legs (the L-153c1 doctrine: the dead zone is PER-AXIS).
 *  Phone 390×844 — the walk41 axis, the s152 gate. Desktop 1440×900 —
 *  the F-151c1 axis: the ghost buttons lived at y≈905 @1440, below the
 *  1024×768 sweep fold (768) and inside the internal scroller the
 *  1920×1080 sweep structurally cannot see past (1080); the desktop
 *  interiors had never been geometry-censused before s153. */
export const CENSUS_AXES: ReadonlyArray<CensusAxis> = [
  { name: "phone", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

/** The content-column floor at a frame width (the L-153c2 seam: the
 *  floor travels with the frame, never a constant): <640 the sidebar is
 *  hidden and the page root pads p-4 (390→358, the walk41 anchor);
 *  640-767 the sidebar still hidden, the sm:p-8 root (640→576); ≥768
 *  the w-64 sidebar is in flow AND the sm:p-8 root (1440→1120, the
 *  F-151c1 axis). The s95 poke-out discriminator reads the AXIS's
 *  floor — a past-the-floor reference width absorbs, an in-container
 *  width delta stays RED at both axes. */
export function contentFloor(width: number): number {
  if (width < 640) return width - 32;
  if (width < 768) return width - 64;
  return width - 256 - 64;
}

/** The --axis CLI seam (the --pages idiom): default ALL legs (the
 *  standing gate command covers both); one-axis subsets for the
 *  targeted mutation-proof runs; unknown names fail fast listing the
 *  valid ones. */
export function parseAxisArg(argv: string[]): ReadonlyArray<CensusAxis> {
  const i = argv.indexOf("--axis");
  if (i === -1) return CENSUS_AXES;
  const wanted = argv[i + 1];
  if (wanted === "all") return CENSUS_AXES;
  const axis = CENSUS_AXES.find((a) => a.name === wanted);
  if (!axis) {
    throw new Error(
      `unknown --axis "${wanted}" — valid: all, ${CENSUS_AXES.map((a) => a.name).join(", ")}`,
    );
  }
  return [axis];
}

// -- the pure decoder -------------------------------------------------------

/** Position-alignment window for pairing (the greedy pass 1). */
const POS_TOL = 4;
/** The constant-offset window for the displaced-tail resync (pass 2). */
const OFFSET_TOL = 2;
/** The diagonal resync bound (mixed ours/ref skips). */
const RESYNC_WINDOW = 12;
/** The pure one-sided run bound (a settings row subtree is ~6 nodes per
 *  row; several rows plus chart internals fit well inside this). */
const PURE_RUN_MAX = 256;
/** The offset-candidate scan windows (ours-side deep — the row subtree
 *  runs; ref-side shallow). */
const OFFSET_M_MAX = 96;
const OFFSET_N_MAX = 16;
/** A displacement offset is accepted only if it yields this many
 *  consecutive pairs — a single coincidental alignment is NOT a
 *  displaced tail, it is the one-sided face (extras). */
const SUSTAINED = 3;

/** Pairing at a running offset: same tag + the position delta within
 *  POS_TOL of the offset. Width/height are UNCONSTRAINED at pairing —
 *  a position-aligned geometry delta is a SHIFT event (reported with
 *  its deltas), never a cascade.
 *  THE TAG-SWAP RELAXATION (the walk42 calendar decode): when tags
 *  differ but the geometry is byte-equal RELATIVE to the running
 *  offset — (a.top - b.top === offset) && lefts equal && w/h equal —
 *  the pair is the s76 composition genus (our SPAN/BUTTON vs its DIV
 *  at the identical box). Without this, a tag-mismatched zone blocks
 *  EVERY resync scan (the tags gate them all) and the walk loses sync
 *  — the maiden decode's -206 card misalignment came exactly from a
 *  7-element SPAN/DIV zone. The strictness (byte-equal, not
 *  near-equal) keeps a planted ghost (75×32 vs a 24px title row)
 *  one-sided. */
function pairableAt(a: CensusEl, b: CensusEl, offset: number): boolean {
  if (a.tag === b.tag) {
    return (
      Math.abs(a.top - b.top - offset) <= POS_TOL &&
      Math.abs(a.left - b.left) <= POS_TOL
    );
  }
  // the walk42 debug decoded a standing -1px running offset (subpixel
  // rounding drift, absorbed by the recharts ≤3px rule on the same-tag
  // face) — an EXACT a.top-b.top === offset check broke the entire cell
  // zone. The window form keeps the strictness where it matters: w/h
  // byte-equal (a NEAR-twin is never paired), position within the
  // pairing window relative to the running offset.
  return (
    Math.abs(a.top - b.top - offset) <= POS_TOL &&
    Math.abs(a.left - b.left) <= POS_TOL &&
    a.w === b.w &&
    a.h === b.h
  );
}

function byteEqualGeometry(a: CensusEl, b: CensusEl): boolean {
  return a.top === b.top && a.left === b.left && a.w === b.w && a.h === b.h;
}

/**
 * The greedy resync-alignment decoder (the walk41 lesson, promoted:
 * index-pairwise alignment saturates on one-sided runs — the diff cap
 * cascaded; the greedy resync skips to the next pairable element).
 *
 * Two passes, one state machine:
 *  - pass 1 pairs at the RUNNING OFFSET (0 at page top). A paired event
 *    with byte-equal geometry is match/cls-only/text-only; anything else
 *    is a SHIFT carrying its four deltas.
 *  - on divergence the resync tries, in order: a pure ours-run, a pure
 *    ref-run, then CONSTANT-OFFSET candidates (the displaced tail — the
 *    F-151c1 signature: an in-flow extra element displaces everything
 *    below by its height; the tail re-pairs at the new offset and the
 *    extras stay one-sided). An offset is accepted only when it yields
 *    SUSTAINED consecutive pairs — a single coincidental alignment is
 *    the one-sided face, not a displacement.
 *  - when nothing resyncs, the current pair goes one-sided BOTH ways
 *    (an ours-extra + a ref-extra) and the walk advances — no rest-dump,
 *    no cascade.
 */
export function alignCensus(ours: CensusEl[], ref: CensusEl[]): CensusEvent[] {
  const events: CensusEvent[] = [];
  let i = 0;
  let j = 0;
  let offset = 0;

  const pushPair = (a: CensusEl, b: CensusEl) => {
    if (a.tag !== b.tag) {
      // the tag-swap composition genus — byte-equal-relative geometry,
      // different DOM composition (the s76 calendar cells)
      events.push({
        kind: "tag-swap",
        el: a,
        ref: b,
        dTop: a.top - b.top,
        dLeft: a.left - b.left,
        dW: a.w - b.w,
        dH: a.h - b.h,
      });
      return;
    }
    if (byteEqualGeometry(a, b)) {
      if (a.cls !== b.cls) {
        events.push({ kind: "cls-only", el: a, ref: b });
      } else if (a.text !== b.text) {
        events.push({ kind: "text-only", el: a, ref: b });
      } else {
        events.push({ kind: "match", el: a, ref: b });
      }
    } else {
      events.push({
        kind: "shift",
        el: a,
        ref: b,
        dTop: a.top - b.top,
        dLeft: a.left - b.left,
        dW: a.w - b.w,
        dH: a.h - b.h,
      });
    }
  };

  const pureRun = (side: "ours" | "ref", o: number): number => {
    for (let d = 1; d <= PURE_RUN_MAX; d++) {
      const ik = side === "ours" ? i + d : i;
      const jl = side === "ours" ? j : j + d;
      if (ik >= ours.length || jl >= ref.length) break;
      if (pairableAt(ours[ik], ref[jl], o)) return d;
    }
    return -1;
  };

  /** Count consecutive pairs at (k, l) under offset o. */
  const sustainedFrom = (k: number, l: number, o: number): number => {
    let n = 0;
    while (i + k + n < ours.length && j + l + n < ref.length && pairableAt(ours[i + k + n], ref[j + l + n], o)) {
      n++;
    }
    return n;
  };

  /** A resync run is acceptable when it yields SUSTAINED pairs OR it is
   *  a real tail run (>= 2 pairs reaching a list end — a SINGLE pair at
   *  the end is indistinguishable from a coincidence and never
   *  anchors). The maiden-census decode (walk42): without the sustained
   *  face, a pure run grabs a COINCIDENTAL single pair at a stale
   *  offset (the settings piecewise cascade — each card boundary shifts
   *  the displacement; the first same-tag element at the old offset is
   *  a false anchor and the alignment loses sync card by card). */
  const runAcceptable = (k: number, l: number, o: number): boolean => {
    const n = sustainedFrom(k, l, o);
    return (
      n >= SUSTAINED ||
      (n >= 2 && (i + k + n >= ours.length || j + l + n >= ref.length))
    );
  };

  while (i < ours.length || j < ref.length) {
    // the exhausted tails: one-sided, no cascade
    if (i >= ours.length) {
      for (; j < ref.length; j++) events.push({ kind: "ref-extra", ref: ref[j] });
      break;
    }
    if (j >= ref.length) {
      for (; i < ours.length; i++) events.push({ kind: "ours-extra", el: ours[i] });
      break;
    }
    // pass 1: pair at the running offset
    if (pairableAt(ours[i], ref[j], offset)) {
      // THE BYTE-EQUAL-CLS PREFERENCE (the walk42 mispair decode): a
      // pairable-but-class-different immediate pair can be a MISPAIR
      // — a nesting wrapper on one side (ours' merged toolbar div vs
      // the reference's p-4 > flex gap-3 pair; our px-0 CardContent
      // wrapping the same empty-state div the reference renders
      // bare). When a STRICT twin — byte-equal geometry AND equal
      // class — sits within 2 on either side, pair the twins; the
      // skipped nesting wrappers go one-sided to the absorption
      // passes. The strictness keeps the ghost path untouched (a
      // planted ours-only BUTTON never pairs, so this never fires).
      if (ours[i].cls !== ref[j].cls) {
        let prefer = false;
        for (let k = 1; k <= 2 && !prefer && j + k < ref.length; k++) {
          if (
            pairableAt(ours[i], ref[j + k], offset) &&
            ours[i].cls === ref[j + k].cls &&
            byteEqualGeometry(ours[i], ref[j + k])
          ) {
            for (let y = 0; y < k; y++) events.push({ kind: "ref-extra", ref: ref[j + y] });
            j += k;
            prefer = true;
          }
        }
        for (let k = 1; k <= 2 && !prefer && i + k < ours.length; k++) {
          if (
            pairableAt(ours[i + k], ref[j], offset) &&
            ours[i + k].cls === ref[j].cls &&
            byteEqualGeometry(ours[i + k], ref[j])
          ) {
            for (let x = 0; x < k; x++) events.push({ kind: "ours-extra", el: ours[i + x] });
            i += k;
            prefer = true;
          }
        }
      }
      pushPair(ours[i], ref[j]);
      i++;
      j++;
      continue;
    }
    // resync 0 — THE DIRECT RE-ANCHOR (the piecewise cascade): when the
    // next two elements are the same family at a NEW constant offset
    // (a settings card boundary: the row-count delta changes the
    // displacement in 62px quanta), re-anchor at the direct top delta
    // instead of scanning — the sustained guard keeps coincidences out
    if (
      ours[i].tag === ref[j].tag &&
      Math.abs(ours[i].left - ref[j].left) <= POS_TOL
    ) {
      const oDirect = ours[i].top - ref[j].top;
      if (oDirect !== offset && runAcceptable(0, 0, oDirect)) {
        offset = oDirect;
        continue;
      }
    }
    // resync A: a pure one-sided run at the CURRENT offset (the
    // sustained/end guard — a coincidental single pair at a stale
    // offset must never steal the resync)
    const kA = pureRun("ours", offset);
    const lA = pureRun("ref", offset);
    const kOk = kA > 0 && runAcceptable(kA, 0, offset);
    const lOk = lA > 0 && runAcceptable(0, lA, offset);
    if (kOk && (!lOk || kA <= lA)) {
      for (let d = 0; d < kA; d++) events.push({ kind: "ours-extra", el: ours[i + d] });
      i += kA;
      continue;
    }
    if (lOk) {
      for (let d = 0; d < lA; d++) events.push({ kind: "ref-extra", ref: ref[j + d] });
      j += lA;
      continue;
    }
    // resync B: CONSTANT-OFFSET candidates (the displaced tail)
    const cand = new Set<number>();
    for (let m = 0; m <= OFFSET_M_MAX && i + m < ours.length; m++) {
      for (let n = 0; n <= OFFSET_N_MAX && j + n < ref.length; n++) {
        if (ours[i + m].tag === ref[j + n].tag) {
          cand.add(ours[i + m].top - ref[j + n].top);
        }
      }
    }
    let resynced = false;
    for (const o of [...cand].sort((a, b) => Math.abs(a) - Math.abs(b))) {
      if (Math.abs(o) <= 0) continue; // offset 0 already failed above
      // diagonal first (small mixed skips), then pure runs at o
      for (let d = 1; d <= RESYNC_WINDOW && !resynced; d++) {
        for (let k = 0; k <= d && !resynced; k++) {
          const l = d - k;
          if (sustainedFrom(k, l, o) >= SUSTAINED) {
            for (let x = 0; x < k; x++) events.push({ kind: "ours-extra", el: ours[i + x] });
            for (let y = 0; y < l; y++) events.push({ kind: "ref-extra", ref: ref[j + y] });
            i += k;
            j += l;
            offset = o;
            resynced = true;
          }
        }
      }
      if (resynced) break;
      const kO = pureRun("ours", o);
      if (kO > 0 && runAcceptable(kO, 0, o)) {
        for (let x = 0; x < kO; x++) events.push({ kind: "ours-extra", el: ours[i + x] });
        i += kO;
        offset = o;
        resynced = true;
        break;
      }
      const lO = pureRun("ref", o);
      if (lO > 0 && runAcceptable(0, lO, o)) {
        for (let y = 0; y < lO; y++) events.push({ kind: "ref-extra", ref: ref[j + y] });
        j += lO;
        offset = o;
        resynced = true;
        break;
      }
    }
    if (resynced) continue;
    // resync C: nothing re-pairs — the current pair is genuinely
    // one-sided BOTH ways; advance without a rest-dump
    events.push({ kind: "ours-extra", el: ours[i] });
    events.push({ kind: "ref-extra", ref: ref[j] });
    i++;
    j++;
  }
  return events;
}

// -- the settings segmentation -----------------------------------------------

/**
 * THE SETTINGS CARD SEGMENTATION (the walk42 settings decode, the third
 * instrument lesson): the settings page's picklist DATA is
 * LIVE-EDITED INTRADAY (the L-150c2 genus) — the row counts differ per
 * card, and each card's delta displaces everything below it
 * (piecewise offsets in 62px quanta). On ONE continuous walk, the
 * resync's offset candidates include CROSS-CARD pairs — ours card1's
 * rows against the reference's card2 rows (rows look like rows: the
 * same class, the same subtree shape, a sustained 9+ run at a NEGATIVE
 * offset) — and the backward resync loses the walk's sync card by card
 * (the live decode: offset -162 consuming the reference's add-row +
 * card2 head as phantom extras, 61 unexplained).
 *
 * The picklist cards are a FIXED TEMPLATE (the same card count and
 * order on both sides — Sources/Industries/Activity Types…): the card
 * is the alignment UNIT. Segment both censuses at the card containers
 * and align card k against card k — the row-count deltas stay INSIDE
 * their segment, the per-segment walk re-anchors at one delta per
 * card (bounded by the segment), and a cross-card pairing is
 * structurally impossible. A template change (a card count delta)
 * falls out as one-sided card subtrees — unexplained, RED, correctly.
 */
export function alignSettings(ours: CensusEl[], ref: CensusEl[]): CensusEvent[] {
  const isCard = (e: CensusEl) => /rounded-xl border/.test(e.cls) && e.w >= 300;
  const split = (els: CensusEl[]): Array<CensusEl[]> => {
    const segs: Array<CensusEl[]> = [[]];
    for (const e of els) {
      if (isCard(e)) segs.push([e]);
      else segs[segs.length - 1].push(e);
    }
    return segs;
  };
  const oSegs = split(ours);
  const rSegs = split(ref);
  const events: CensusEvent[] = [];
  // segment 0: the fixed head (the shell + the tabs + the Defaults
  // zone above the first card) — pairs at offset 0
  const n = Math.max(oSegs.length, rSegs.length);
  for (let k = 0; k < n; k++) {
    const o = oSegs[k] ?? [];
    const r = rSegs[k] ?? [];
    if (o.length === 0) {
      for (const e of r) events.push({ kind: "ref-extra", ref: e });
      continue;
    }
    if (r.length === 0) {
      for (const e of o) events.push({ kind: "ours-extra", el: e });
      continue;
    }
    events.push(...alignCensus(o, r));
  }
  return events;
}

// -- the genera attribution ---------------------------------------------------

export interface AttributedEvent {
  event: CensusEvent;
  genus: string;
}

export interface AttributionResult {
  matches: number;
  explained: AttributedEvent[];
  unexplained: CensusEvent[];
}

/** The settings picklist-row signature (SETTINGS_PICKLIST.itemRow, the
 *  bundle-decoded bordered row): token-SUBSET so the reference's
 *  class-order variance still matches. */
const SETTINGS_ROW_TOKENS = ["items-center", "gap-2", "p-2", "border", "rounded-lg"];

function settingsRowSignature(cls: string): boolean {
  const tokens = new Set(cls.split(/\s+/));
  return SETTINGS_ROW_TOKENS.every((t) => tokens.has(t));
}

function containedIn(el: CensusEl, boxes: Array<{ top: number; left: number; w: number; h: number }>): boolean {
  return boxes.some(
    (b) =>
      el.top >= b.top &&
      el.top <= b.top + b.h &&
      el.left >= b.left &&
      el.left <= b.left + b.w,
  );
}

/** Token-subset: every token of `sub` appears in `sup` (the merged-div
 *  signature — order-free, the v3-compat class-order immunity). */
function tokenSubset(sub: string, sup: string): boolean {
  const supTokens = new Set(sup.split(/\s+/));
  return sub.split(/\s+/).every((t) => supTokens.has(t));
}

/**
 * Attribute every census event to a documented genus or leave it
 * UNEXPLAINED. The one page-scoped exception: the settings DATA face
 * (rows + subtrees + the displacement cascade) — the L-150c2 doctrine.
 */
export function attributeGenera(
  events: CensusEvent[],
  page: string,
  floor: number = PHONE_CONTENT_FLOOR,
): AttributionResult {
  const matches = events.filter((e) => e.kind === "match").length;
  // the attribution map — the EXPLAINED list is emitted in EVENT ORDER
  // (the decode report reads as the page reads)
  const genusOf = new Map<CensusEvent, string>();
  const unexplained: CensusEvent[] = [];
  // the containment boxes, collected during pass 1:
  //   • the absorbed settings-row boxes (the subtree containment)
  //   • the PAIRED chart-family boxes (recharts/chart-no-outline — the
  //     version-drift interiors absorb inside them)
  //   • the PAIRED svg boxes (the lucide icon carriers — the interior
  //     shape vocabulary absorbs inside them)
  //   • the absorbed chart-wrapper boxes (ours' extra wrappers carry
  //     the same interiors)
  const rowBoxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  const chartBoxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  const boxOf = (el: CensusEl) => ({ top: el.top, left: el.left, w: el.w, h: el.h });
  const chartFamily = (cls: string) => /recharts|chart-no-outline/.test(cls);
  // the pending extras (pass 2 + pass 3 candidates, kept in order)
  const pending: CensusEvent[] = [];

  // -- pass 1: the direct genus rules -------------------------------------
  for (const e of events) {
    // the paired events record their chart boxes (the recharts DOM
    // face's containment — the wrapper divs + the tooltip divs)
    if (e.kind !== "ours-extra" && e.kind !== "ref-extra") {
      if (e.el !== undefined && chartFamily(e.el.cls)) chartBoxes.push(boxOf(e.el));
      if (e.ref !== undefined && chartFamily(e.ref.cls)) chartBoxes.push(boxOf(e.ref));
    }
    if (e.kind === "match") continue;
    if (e.kind === "tag-swap") {
      genusOf.set(e, "tag-swap");
      continue;
    }
    if (e.kind === "cls-only") {
      genusOf.set(e, "token-mirror");
      continue;
    }
    if (e.kind === "text-only") {
      genusOf.set(e, "live-data");
      continue;
    }
    if (e.kind === "shift") {
      const dt = Math.abs(e.dTop ?? 0);
      const dl = Math.abs(e.dLeft ?? 0);
      const dw = e.dW ?? 0;
      const dh = Math.abs(e.dH ?? 0);
      if (dt <= RECHARTS_TOL && dl <= RECHARTS_TOL && Math.abs(dw) <= RECHARTS_TOL && dh <= RECHARTS_TOL) {
        genusOf.set(e, "recharts-internal");
        continue;
      }
      // the s95 poke-out: position-aligned, width-only, and the
      // REFERENCE wider than the axis's content floor (the L-153c2
      // seam: the floor travels with the frame — 358 at the phone
      // axis, 1120 at the desktop axis). Its bare flex-1 cards poke
      // past the container (its own standing defect, the walk41
      // decode: w=472 inside the 358 phone container). The FLOOR is
      // the discriminator: a real ours width regression (both sides
      // inside the container) shows ref.w ≤ floor and stays
      // UNEXPLAINED — only the poke-out absorbs.
      if (
        dw < -RECHARTS_TOL &&
        dt <= RECHARTS_TOL &&
        dl <= RECHARTS_TOL &&
        dh <= RECHARTS_TOL &&
        e.ref !== undefined &&
        e.ref.w > floor
      ) {
        genusOf.set(e, "s95-poke-out");
        continue;
      }
      if (page === "settings") {
        genusOf.set(e, "settings-data-cascade");
        continue;
      }
      continue; // the ordered emission decides unexplained
    }
    // the extras (ours-extra / ref-extra)
    const el = e.kind === "ours-extra" ? e.el : e.ref;
    if (el === undefined) {
      continue; // the ordered emission decides unexplained
    }
    if (el.w === 0 && el.h === 0) {
      genusOf.set(e, "dead-stub");
      continue;
    }
    // the recharts DOM face: version drift renders extra wrapper divs —
    // the class carries the attribution (both sides)
    if (/recharts/.test(el.cls)) {
      genusOf.set(e, "recharts-interior");
      chartBoxes.push(boxOf(el));
      continue;
    }
    if (e.kind === "ours-extra" && el.cls.includes("chart-no-outline")) {
      genusOf.set(e, "chart-suppression");
      chartBoxes.push(boxOf(el));
      continue;
    }
    if (e.kind === "ours-extra" && (el.cls.includes("px-0") || el.cls.includes("relative w-full overflow-auto"))) {
      genusOf.set(e, "s95-wrapper");
      continue;
    }
    if (page === "settings" && settingsRowSignature(el.cls)) {
      rowBoxes.push(boxOf(el));
      genusOf.set(e, "settings-data");
      continue;
    }
    // no direct rule: defer to the containment + twin passes
    pending.push(e);
  }

  // -- pass 2: the containment faces ---------------------------------------
  // the recharts DOM face: extras inside a paired chart box (the
  // version-drift wrapper divs + the tooltip divs — both directions).
  // (The svg glyph interiors never enter the census — the exclusion
  // at the collector; the lucide genus is absorbed at the svg level
  // as token-mirror cls-only pairs.)
  const still: CensusEvent[] = [];
  // the composition-split lookup: the paired (non-match) events'
  // opposite-side elements
  const pairedEvents = events.filter(
    (p) => p.kind !== "ours-extra" && p.kind !== "ref-extra" && p.kind !== "match",
  );
  const pairedOpposite = (e: CensusEvent, extra: CensusEl): boolean => {
    const side: "el" | "ref" = e.kind === "ref-extra" ? "el" : "ref";
    for (const p of pairedEvents) {
      const el2 = p[side];
      if (el2 === undefined) continue;
      if (containedIn(extra, [boxOf(el2)]) && tokenSubset(extra.cls, el2.cls)) {
        return true;
      }
    }
    return false;
  };
  for (const e of pending) {
    const el = (e.kind === "ours-extra" ? e.el : e.ref) as CensusEl;
    if (containedIn(el, chartBoxes)) {
      genusOf.set(e, "recharts-interior");
      continue;
    }
    if (page === "settings" && containedIn(el, rowBoxes)) {
      genusOf.set(e, "settings-data");
      continue;
    }
    // THE COMPOSITION-SPLIT GENUS (the walk42 contacts decode): the
    // reference nests [p-4 border-b] > [flex gap-3] where ours MERGES
    // both onto one div — the extra (the ref's inner nesting div) is
    // contained in the box of the PAIRED event's opposite-side element
    // AND that element's class tokens are a SUPERSET of the extra's
    // (ours' merged "p-4 border-b flex gap-3" ⊇ its "flex gap-3").
    // The containment + the token superset together prove the merge —
    // a planted element inside the same box without the token
    // superset stays unexplained.
    if (pairedOpposite(e, el)) {
      genusOf.set(e, "composition-split");
      continue;
    }
    still.push(e);
  }

  // -- pass 3: the wrapper-twin + tag-swap faces ---------------------------
  // the paired boxes (every match/cls-only/text-only/shift event's
  // both sides): an extra whose box is BYTE-EQUAL to a paired box is
  // a nesting wrapper twin — the same box already renders on both
  // sides (the reference's space-y-3 tooltip wrapper around the
  // paired empty-state P; our stock shadcn Table container around a
  // paired bare table). Zero new ink by construction.
  const pairedBoxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  for (const e of events) {
    if (e.kind === "ours-extra" || e.kind === "ref-extra") continue;
    if (e.el !== undefined) pairedBoxes.push(boxOf(e.el));
    if (e.ref !== undefined) pairedBoxes.push(boxOf(e.ref));
  }
  const twins: CensusEvent[] = [];
  for (const e of still) {
    const el = (e.kind === "ours-extra" ? e.el : e.ref) as CensusEl;
    if (
      pairedBoxes.some(
        (b) => el.top === b.top && el.left === b.left && el.w === b.w && el.h === b.h,
      )
    ) {
      genusOf.set(e, "wrapper-twin");
      continue;
    }
    twins.push(e);
  }
  // the tag-swap twins: ours-extra + ref-extra at BYTE-EQUAL geometry
  // (the same box drawn with a different DOM composition — the s76
  // calendar day cells: our BUTTON/SPAN clickable superset vs the
  // reference's DIV; the profile avatar wrappers). Geometry-equal =
  // pixel-equal, the walk39 doctrine; a NEAR-twin (any dimension off)
  // is real drift and stays unexplained.
  const matchedRef = new Set<number>();
  for (const e of twins) {
    if (e.kind !== "ours-extra" || e.el === undefined) continue;
    const idx = twins.findIndex(
      (r, k) =>
        r.kind === "ref-extra" &&
        r.ref !== undefined &&
        !matchedRef.has(k) &&
        byteEqualGeometry(e.el as CensusEl, r.ref),
    );
    if (idx !== -1) {
      matchedRef.add(idx);
      genusOf.set(e, "tag-swap");
      genusOf.set(twins[idx], "tag-swap");
    }
  }
  // the TH-LABEL-STRETCH face (the walk43 desktop decode): ours'
  // sortable-header label containers are BUTTONs (the s29 th>button
  // accessible superset) where the reference's are DIVs. At the phone
  // axis the columns are content-width and the pair is byte-equal (the
  // tag-swap face above); at desktop the 1120px slack stretches the
  // reference's block-level DIV to the TH content box while our BUTTON
  // keeps the UA fit-content sizing. Same top/left/h + byte-equal cls
  // + the same leaf-text label, ours.w ≤ ref.w — the content pixels
  // identical, only the invisible box stretch differs. A width
  // OVERFLOW (ours wider than the container) or a different label
  // never pairs — real drift, both sides unexplained.
  for (const e of twins) {
    if (e.kind !== "ours-extra" || e.el === undefined || genusOf.has(e)) continue;
    const a = e.el;
    if (a.tag !== "BUTTON") continue;
    const idx = twins.findIndex(
      (r, k) =>
        r.kind === "ref-extra" &&
        r.ref !== undefined &&
        !matchedRef.has(k) &&
        !genusOf.has(r) &&
        r.ref.tag === "DIV" &&
        a.top === r.ref.top &&
        a.left === r.ref.left &&
        a.h === r.ref.h &&
        a.w <= r.ref.w &&
        a.cls === r.ref.cls &&
        a.text === r.ref.text,
    );
    if (idx !== -1) {
      matchedRef.add(idx);
      genusOf.set(e, "tag-swap");
      genusOf.set(twins[idx], "tag-swap");
    }
  }

  // -- the ordered emission (event order, the decode-report order) -------
  const explained: AttributedEvent[] = [];
  for (const e of events) {
    if (e.kind === "match") continue;
    const g = genusOf.get(e);
    if (g !== undefined) {
      explained.push({ event: e, genus: g });
    } else {
      unexplained.push(e);
    }
  }
  return { matches, explained, unexplained };
}

// -- the verdict ---------------------------------------------------------------

export interface CensusPageResult {
  page: string;
  /** The 153-c extension: the census leg this result walked (phone /
   *  desktop). Undefined = the axis-less standing form (the s152 pins
   * call the verdict seam directly without an axis). */
  axis?: string;
  mainHDelta: number | null;
  oursEls: number;
  refEls: number;
  matches: number;
  explained: AttributedEvent[];
  unexplained: CensusEvent[];
}

export interface CensusVerdict {
  ok: boolean;
  failures: string[];
}

/**
 * The byte-parity verdict, ZERO margin (the L-152c2 doctrine: geometry
 * gates have no raster floor). RED on any UNEXPLAINED event, or on a
 * mainH delta ≠ 0 — the ONE exception is the settings page, whose mainH
 * is SKIPPED (the L-150c2 DATA genus: the picklist row count is
 * intraday-volatile; reported, never gated, never widened).
 */
export function censusVerdict(results: CensusPageResult[]): CensusVerdict {
  const failures: string[] = [];
  for (const r of results) {
    // the 153-c extension: the failure names its AXIS — a phone GREEN
    // never masks a desktop RED (and the axis-less standing form stays
    // unprefixed, back-compat with the s152 pins)
    const where = r.axis !== undefined ? `[${r.axis}] ${r.page}` : r.page;
    if (r.unexplained.length > 0) {
      failures.push(
        `${where}: ${r.unexplained.length} unexplained event(s) — first: ` +
          `${r.unexplained[0].kind} ` +
          `${r.unexplained[0].el ? `ours ${r.unexplained[0].el.tag}@${r.unexplained[0].el.top} [${r.unexplained[0].el.cls}]` : ""}` +
          `${r.unexplained[0].ref ? `ref ${r.unexplained[0].ref.tag}@${r.unexplained[0].ref.top} [${r.unexplained[0].ref.cls}]` : ""}`,
      );
    }
    if (r.page !== "settings" && r.mainHDelta !== null && r.mainHDelta !== 0) {
      failures.push(`${where}: mainH delta ${r.mainHDelta} ≠ 0 (byte-parity, zero margin)`);
    }
  }
  return { ok: failures.length === 0, failures };
}

// -- the browser twin (the census evaluate) ------------------------------------

interface CensusCapture {
  mainH: number;
  els: CensusEl[];
}

async function censusPage(
  page: import("@playwright/test").Page,
  base: string,
  route: string,
): Promise<CensusCapture> {
  await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
  await page
    .locator("main")
    .first()
    .waitFor({ state: "visible", timeout: 15000 })
    .catch(() => undefined);
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) throw new Error(`no main on ${location.pathname}`);
    const mrect = main.getBoundingClientRect();
    // THE GLYPH-INTERIOR EXCLUSION (the walk42 settings decode): the
    // census is a LAYOUT-tree instrument — the svg element itself is
    // censused (its box guards the icon/chart), but its interior
    // shape vocabulary (path/polyline/line/circle/rect) is
    // version-borne rendering detail (our lucide-react 0.525
    // path-normalized sets vs the reference's mixed sets — the walk41
    // lucide genus; the recharts axis curves ditto) and NEVER enters
    // the alignment. The maiden decode caught the hazard: three
    // coincidentally-aligned icon paths can sustain a FALSE resync
    // offset and lose the walk's sync (the settings card cascade).
    const SVG_SHAPES = new Set(["path", "polyline", "line", "circle", "rect"]);
    const els: Array<{ top: number; left: number; w: number; h: number; tag: string; cls: string; text: string }> = [];
    const walk = (node: Element) => {
      for (const child of Array.from(node.children)) {
        if (SVG_SHAPES.has(child.tagName)) continue; // the glyph interior
        const r = child.getBoundingClientRect();
        const leafText = Array.from(child.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent ?? "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 48);
        els.push({
          top: Math.round(r.top - mrect.top + (main as HTMLElement).scrollTop),
          left: Math.round(r.left - mrect.left),
          w: Math.round(r.width),
          h: Math.round(r.height),
          tag: child.tagName,
          cls: child.getAttribute("class") ?? "",
          text: leafText,
        });
        walk(child);
      }
    };
    walk(main);
    return { mainH: main.scrollHeight, els };
  });
}

// -- the CLI ----------------------------------------------------------------

const REPO = path.resolve(import.meta.dirname, "..");
const OUR_URL = process.env.OUR_URL ?? "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

const log = (s: string) => console.log(`[census] ${s}`);

async function run() {
  const argv = process.argv.slice(2);
  const failOnDriftFlag = argv.includes("--fail-on-drift");
  const json = argv.includes("--json");
  const pages = parsePagesArg(argv, INTERIOR_PAGES);
  const axes = parseAxisArg(argv);

  // 1. the dev server: reuse :3000 or boot one (the s123 F-A guard —
  //    the platform shell exports a STALE absolute DATABASE_URL; an
  //    absolute URL matches neither bun-absolutization signature, so
  //    the db-path seam treats it as an intentional override and every
  //    db route 500s. DELETE the variable, never set it empty.)
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    log(`reusing the dev server on ${OUR_URL}`);
  } else {
    log("booting the dev server (bun run dev)…");
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], {
      cwd: REPO,
      env: devEnv,
      stdio: "ignore",
      detached: true,
    });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) {
      console.error("[census] the dev server never came up on :3000");
      process.exit(1);
    }
    log("dev server up");
  }

  let drifted = false;
  let results: CensusPageResult[] = [];
  try {
    // 2. the ZERO-DATA state on OUR side (users + settings kept; the
    //    same F-A env guard — Prisma rejects an empty URL).
    log("zeroing our domain data (scripts/zero-data.ts)…");
    const zEnv = { ...process.env };
    delete zEnv.DATABASE_URL;
    const z = spawnSync("bun", ["scripts/zero-data.ts"], {
      cwd: REPO,
      env: zEnv,
      stdio: "inherit",
    });
    if (z.status !== 0) throw new Error("zero-data.ts failed");

    // 3. the AXES loop (the 153-c extension): one zero-data + one
    //    browser per invocation; a fresh context (with both logins) at
    //    each axis's viewport — the dead zone is PER-AXIS, the census
    //    walks every leg (--axis subsets for the mutation-proof runs)
    const browser = await chromium.launch({
      headless: process.env.HEADLESS === "0" ? false : true,
    });
    results = [];
    for (const axis of axes) {
      const ctx = await browser.newContext({ viewport: { width: axis.width, height: axis.height } });
      const refPage = await ctx.newPage();
      log(`logging into the reference ${REF_URL} (${axis.name} ${axis.width}x${axis.height})…`);
      await login(refPage, REF_URL);
      const ourPage = await ctx.newPage();
      log(`logging into ours ${OUR_URL}…`);
      await login(ourPage, OUR_URL);

      // 4. the census per page + the decode, at the axis's content
      //    floor (the L-153c2 seam — the s95 poke-out discriminator
      //    travels with the frame)
      const floor = contentFloor(axis.width);
      for (const p of pages) {
        const ref = await censusPage(refPage, REF_URL, p.path);
        const ours = await censusPage(ourPage, OUR_URL, p.path);
        // the settings page aligns through the card segmentation (the
        // LIVE-DATA page — the L-150c2 doctrine, the walk42 decode)
        const events =
          p.name === "settings" ? alignSettings(ours.els, ref.els) : alignCensus(ours.els, ref.els);
        const att = attributeGenera(events, p.name, floor);
        const mainHDelta = ours.mainH - ref.mainH;
        results.push({
          page: p.name,
          axis: axis.name,
          mainHDelta,
          oursEls: ours.els.length,
          refEls: ref.els.length,
          matches: att.matches,
          explained: att.explained,
          unexplained: att.unexplained,
        });
      }
      await ctx.close();
    }
    await browser.close();

    // 5. the report — a section per axis (the decode reads per leg)
    if (!json) {
      for (const axis of axes) {
        console.log(`\n[census] === the interior geometry census — ${axis.name} ${axis.width}x${axis.height} (both apps logged in, ours at the matched zero-data state) ===`);
        for (const r of results.filter((x) => x.axis === axis.name)) {
          const genera: Record<string, number> = {};
          for (const a of r.explained) genera[a.genus] = (genera[a.genus] ?? 0) + 1;
          const generaLine =
            Object.entries(genera)
              .map(([g, n]) => `${g} ${n}`)
              .join(", ") || "none";
          const mainHLine =
            r.page === "settings"
              ? `mainH Δ${r.mainHDelta} SKIPPED (the DATA genus)`
              : `mainH Δ${r.mainHDelta}`;
          console.log(
            `  ${r.page.padEnd(11)} ${mainHLine} · els ${r.oursEls}/${r.refEls} · match ${r.matches} · genera: ${generaLine} · unexplained ${r.unexplained.length}`,
          );
          for (const u of r.unexplained.slice(0, 5)) {
            const side = u.el ? `ours ${u.el.tag}@${u.el.top} w${u.el.w} h${u.el.h} [${u.el.cls}]` : "";
            const sideRef = u.ref ? `ref ${u.ref.tag}@${u.ref.top} w${u.ref.w} h${u.ref.h} [${u.ref.cls}]` : "";
            console.log(`    UNEXPLAINED ${u.kind} ${side}${sideRef}`);
          }
        }
      }
    }
    const verdict = censusVerdict(results);
    drifted = !verdict.ok;
    if (json) {
      console.log(
        JSON.stringify({
          tool: "interior-census",
          results: results.map((r) => ({
            axis: r.axis,
            page: r.page,
            mainHDelta: r.mainHDelta,
            oursEls: r.oursEls,
            refEls: r.refEls,
            matches: r.matches,
            explained: r.explained.length,
            unexplained: r.unexplained.length,
          })),
          drifted,
        }),
      );
    } else if (!verdict.ok) {
      for (const f of verdict.failures) console.error(`[census] DRIFT: ${f}`);
    } else {
      log(`census gate clean (byte-parity, zero margin — every delta attributed)`);
    }
  } finally {
    // the never-zeroed doctrine: the seed restore rides the FINALLY —
    // the workspace is never left zeroed, even when the census throws
    // (sweep.ts restores inside the try; this gate closes that gap).
    const sEnv = { ...process.env };
    delete sEnv.DATABASE_URL;
    const s = spawnSync("bun", ["run", "db:seed"], { cwd: REPO, env: sEnv, stdio: "inherit" });
    if (s.status !== 0) {
      console.error("[census] db:seed failed — run it manually: bun run db:seed");
    } else {
      log("seed restored (verify: bun run db:census)");
    }
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }

  if (failOnDriftFlag && drifted) {
    console.error("[census] drift gate FAILED (unexplained geometry or a mainH delta — the dead zone sees it)");
    process.exit(1);
  }
}

// run only when executed directly (bun scripts/interior-census.ts / bun run
// census:interior), never on the vitest import (the unit pins)
if (process.argv[1] && process.argv[1].endsWith("interior-census.ts")) {
  run().catch((e) => {
    console.error("[census]", e);
    process.exit(1);
  });
}
