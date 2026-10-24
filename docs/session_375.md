# Session 375 — THE RECHARTS 3.x MIGRATION (the N-3 retirement) (the session-176 round record)

Date: 2026-10-24 · Rotation: 176 · Agent: main (Z.ai CLI) ·
Plan: `docs/plans/2026-10-24-session176-recharts-3-migration.md`

## The round

The post-175 audit rotation, its trigger THE OWNER'S NEWEST COMMIT
`35f04d5` — the session-374 transcript, whose close names this round
verbatim ("the recharts 2.15 → 3.x migration (N-3, needs its own
baseline re-derivation round) is the largest remaining named candidate");
the session-373 close agrees ("its own rotation: the standing pixel
baselines need re-derivation"). The workspace warm at `35f04d5` (the
s175 round was test-only; the toolchain unchanged).

## The audit (every leg verified live)

The baseline gate GREEN at the exact s175 ship state: lint 0/0 · tsc 0 ·
**138/2726** unit · build · smoke **14/14** · e2e **192/192** (5.4m) ·
probe:ref **STABLE** (bundle md5 `46bc2d9c`) · the desktop + phone
sweeps **CLEAN** · the mobile drawer battery **GREEN** at 390×844 · the
Tailwind v4 state clean · sitemap 11 routes + robots + manifest
standing · census MATCH. **Zero live defects** — the
register-retirement round (the report's N-3 the last named item
touching product code).

## The round proper — THE RECHARTS 3.x MIGRATION

The migration census first (the official 3.0 guide walked against the
repo's NINE chart-type JSX sites — `charts.tsx`'s seven families + the
Sparkline's area/line arms): the min-version rows satisfied (React 19.3
· TS 5.x · ES2017), the removed-props register clean, and exactly ONE
DOM-visible default flip for our usage — **`accessibilityLayer` ships
false in 2.x, TRUE in 3.0+**. The parity cure: the explicit `false` at
all nine sites (the reference's 2.x wrapper DOM is the parity surface;
the enable path documented in ADR-021 as an owner-level decision).

- **The migration**: `bun add recharts@^3.10.1` (the sibling zb's
  proven 3.10 line, the registry's latest stable); the nine parity
  props; the type seam closed at the family boundary — the
  `tooltipFormatter` adapter over the `Formatter<ValueType, NameType>`
  contravariance (the family's formatters stay `(v: number) => string`;
  `Number()` is the identity on the numeric aggregates) + the Pie label
  bridge (the documented double-cast against the closed
  `PieLabelRenderProps` view — recharts' own "we spread the data
  object" note licenses the open-record param). The L-138c1 tickProp
  guard RETAINED as the harmless belt-and-suspenders form.
- **The live 3.x faces decoded** (each root-caused against the rendered
  DOM): the tick-label TEXTS moved out of the axis wrappers into
  per-axis z-index layers (`recharts-yAxis-tick-labels`) — the e2e
  funnel re-anchor; recharts 3.x **elides the zero-value bar
  rectangles** (2.15 rendered five degenerate zero-height wrappers at
  the wiped dashboard — visually identical, zero-height was never a
  visible pixel; the e2e reset re-anchor pins the aliveness face: the
  wrapper + the y-domain ticks + the stage labels — the s10 contract
  holds); the x-tick elision at narrow cards is width-borne (the same
  genus the leads pipeline documents at 331px).
- **THE UPGRADE-PROOF**: the e2e grid sentinel — the L-138c2 "future
  recharts upgrade that re-breaks the tick delivery REDs here" guard —
  passed live on 3.10.1 (the 9-line classic grid, y-ticks 0/2/4/6/8).
- **THE CENSUS DECODER EXTENSION + THE COLLECTOR EXCLUSION**: the
  signature-matched `recharts3-restructure` genus (both sides
  g-elements carrying recharts classes with one side carrying a 3.x
  structural token, or the collapsed same-class tick; the r3Boxes
  containment cascade — the s95 poke-cascade precedent; the negatives
  pinned: a DIV pair and a real-drift same-class tick stay RED) + the
  **chart-interior collector exclusion** (the walk42 glyph doctrine
  extended to the chart svg): the tablet-dashboard decode found the
  version-borne interiors sustaining FALSE resync offsets — the ref
  pointer stalled inside the Pipeline chart's 2.x interiors while ours
  advanced, the card-level tail re-pairing across cards at a phantom
  +581px — while a direct probe proved both apps **byte-equal at every
  card position** (mainH 2301/2301 at tablet, 2851/2851 at phone; the
  Lead Sources card h102/h102 on both — the reference itself renders no
  chart there at zero-data). The recharts svg BOX stays censused (the
  chart's layout face, with the wrapper divs); the interior never
  enters the alignment — the chart visual + DOM parity rides the pixel
  sweeps + the e2e chart pins.

**The TDD ledger**: 3 RED faces at birth (the version floor · the
lockfile resolution · the accessibilityLayer 9-site census — the honest
migration REDs on the 2.15.4 tree) + 4 born-green freeze pins (the
sentinel existence · the genus attribution with negatives · the
collector exclusion · the decoder source).

**THE MUTATION-PROOFS**: the planted version regression (`^3.10.1` →
`^2.15.4`) → exactly 1 RED; the planted parity regression (the prop
removed from the TrendLine family) → exactly 1 RED; both reverted →
GREEN. **THE STASH-PROOF**: the round's five source files stashed alone
→ exactly 6 RED (the round's pins); restored → **138/2733** GREEN.

**THE COUNT LADDER**: 2726 → **2733** (+7: charts-internals +4 +
census-tool +3) · SUITES 138 **HELD** · E2E 192 **HELD** · badge 2918 →
**2925** (count-ladder-176.py: 23 flips, assert-first, idempotent — the
re-run a verified 0-flip no-op) + the collateral re-anchors (the PAD
stack-table recharts row 2.15.4 → 3.10.1 · the facts-census
installed-stack row · the s140 funnel pin + the reports-filter spark
pin — the opening-tag forms gaining the parity prop · the F-106a1
layer-axis pin).

**THE DRIFT-GATE LEDGER** — the six gates re-run in full at the
migrated tree: the desktop + phone + tablet + landscape sweeps CLEAN
(dashboard 0.07% · reports 0.21% — within the standing floors), the
fullpage CLEAN (docH byte-equal 4990/4990 · 7259/7259), the interior
census CLEAN at all four axes (52 page-axis runs, zero unexplained).
**The migration is render-identical — the s373 close's predicted
baseline re-derivation was NOT needed; the standing baselines hold.**

**THE DOCS LEG**: the AGENTS Session-176 section · the PAD **ADR-021**
(the chart-major migration doctrine) + the session-176 inventory row +
the stack-table row · the CLAUDE recharts bullet extension · the README
Tested row's migration mention + the badge · the SKILL **v1.173.0** +
H1 + the s176 head layer (the s175 layer comment-demoted at its ship
counts 2726/192; skill-head-176.py, idempotent) · this record + the
plan's execution record + the worklog entry (Task ID 176).

**THE CAPTURES** 441-444 (`docs/screenshots/`): the dashboard (the
revenue areas + the pipeline bars + the KPI sparks) at desktop,
VLM-verified (bars + axes + tick labels + filled area + sparklines, no
blank panels) · the reports aging-grid face (the sentinel's own chart)
at desktop, VLM-verified (the dashed grid both axes, the y-ticks
0/2/4/6/8) · the drawer-open standing contract at phone · the leads
surface (the funnel + the pipeline bars) at phone.

## The verification ledger

lint 0/0 · tsc 0 (full strictness under the 3.x types) · **138/2733**
unit · build (the type-gate artifact) · smoke **14/14** · e2e
**192/192** · db census MATCH (15/24/10/23/12 + 4 users) · probe:ref
STABLE (`46bc2d9c`) · the six drift gates CLEAN · the drawer battery
GREEN.

## Suggested next steps

Verify the commit on GitHub. The register is now clean of the named
code-level candidates — the next-rotation candidates: the drawer
interior re-walk · the fresh-bundle register re-derivation when the
reference next ships a new bundle (the probe will trip it) · the
recharts 4.0 gate (the `Cell` → `shape` refactor, already named in
ADR-021) · the hosted-CI port the day the owner signals the
production-deployment milestone.
