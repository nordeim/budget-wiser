# Session 148 — The Desktop-Interior Mirror (the F-147c3 family, the 148-c rotation)

**Date**: 2026-10-19 · **Repo**: nordeim/neo-crm · **Branch**: main

## The intake

The workspace re-cloned at `488ef79` (the s147 ship `911a067` + the
session_312 record `0e1a570` + the session_313 transcript `488ef79`).
The sandbox was reset TWICE mid-round — a prior session-148 attempt was
cut off mid-docs-phase with nothing committed, and a second near-complete
pass (unit 115/2153 + build + the e2e interrupted) was also lost; the
final pass re-applied the verified change-set from durable patch scripts.
The environment re-stood each time: bun install · .env from .env.example
with a fresh AUTH_SECRET · db:push + db:seed · census MATCH
15/24/10/23/12 + 4 users · the Playwright chromium re-installed. The
four intake docs read (session_312 + the s147 plan + the repo worklog +
session_313). The baseline gate GREEN — the exact s147-ship match: lint
0/0 · tsc 0 · **114→115/2132 unit** · build · **e2e 151/151**.

## The audits

- **148-a (the s147 ship verification)**: 11/11 spot-verified, zero
  findings — the sweep standing tables (the F-147c3 family values
  reproduce exactly on fresh runs) · the docs-counts ladder
  (2132/151/2283/115, 21/21 GREEN) · SKILL v1.144.0 + the session-147
  layer · `.env` untracked, src/ clean · zero dep changes · the sitemap
  11 routes + robots · the drawer battery GREEN.
- **148-b (the standing battery)**: PASS — the four drift gates CLEAN
  ×4 (the racy reference states seen by the lost attempt had SETTLED —
  deterministic runs across the board).
- **probe:ref #122**: STABLE at the s147 fingerprint
  (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576) — no new parity
  event; the round is the F-147c3 mirror per the session_312 "next"
  hint. The reference's demo data is ZERO rows (volatile workspace
  state, not for mirroring — the s143–s146 precedent).

## The walk (walk38 — the F-147c3 ground-truth decode, 8 census passes)

Re-decoded live against BOTH apps (the lost attempt's decodes re-verified
from scratch — the reference is deterministic this session):

- **THE KPI DELTA-CHIP FAMILY (every core page)**: the reference renders
  NO trend/delta chips anywhere — dashboard (no "+5.3%"/"+15%"),
  accounts (no "+2%"/"+5%"/"+3.6%" — the cards compact to h=102),
  contacts (no "+0" on New This Month, h=122 with the leading icon),
  activities (no "+23%" on Activities Today, no "2h overdue" on
  Overdue — the SUB-TEXTS "Due now"/"+7 today"/"+4 today"/"+1h 12m" are
  KEPT, h=118), calendar (no "+3"/"+34"/"+2"/"+3", h=138).
- **THE ACCOUNTS TOOLBAR TRIO RETIREMENT**: the toolbar is exactly
  [search with its absolute magnifier][Export CSV] — the Table/Cards
  switcher, the empty density select and the More outline button are
  ALL gone (the s147 handoff's "search icon removed" was STALE — the
  magnifier is retained; verified live).
- **THE ACCOUNTS RAIL RETIREMENT (accounts ONLY — asymmetric)**: the
  accounts rail lost its "Save All" ghost button AND its primary
  "Filter" button (the header row = the Filters title alone). The
  ACTIVITIES rail KEEPS its "Save All" + "Filter" + "More Filters (1)"
  — verified live, the F-147c3 removal is accounts-scoped.
- **THE DASHBOARD RECENT-DEALS BAR**: exactly 2 comboboxes ("All
  Stages" + "All Sources") — the blank middle view-switcher select AND
  the dead "More..." ghost are BOTH gone (walk38k — the s147 handoff
  missed the More... entirely).
- **THE ACTIVITIES PRIORITY-CARD "More"**: gone (its toolbar = the h2
  alone); the Timeline card's "•••" and the by-Type card's "•••" are
  KEPT.
- **THE LANDING MOCK MORPH (byte-decoded)**: the three "See the app
  itself" mocks are content-varied — the Dashboard mock keeps the
  byte-equal 5-bar pipeline; the Accounts mock renders a 4-ROW
  MICRO-TABLE (the grid-cols-3 construction verbatim; Northwind
  Trading/Wholesale/$1.2M · Vertex Group/Software/$3.4M · Bluepeak
  Health/Healthcare/$780k · Harbour & Co/Logistics/$450k; mockH 299);
  the Reports mock renders "Revenue by month" with SEVEN bars
  [42,64,50,82,60,94,71]%. The MIDDLE preview row is FLIPPED at lg
  (`lg:[&>*:first-child]:order-2` — mock RIGHT, text LEFT). The hero
  CTA decode CORRECTED: the desktop hero CTA KEEPS its ArrowRight —
  only the mobile-menu and footer CTAs are arrow-less (ours already
  matches all three).
- **THE LANDING LINE-HEIGHT GENUS (the ≥sm asymmetry)**: the reference
  renders the FONT-SIZE'S OWN DEFAULT PAIRINGS at ≥sm — h1 48/48 at
  sm, 60/60 at lg; hero p 18/28 — while ours computes its leading
  utilities (h1 51.84/64.8, p 29.25). At phone width BOTH apps compute
  identically (h1 36/38.88, p 16/26). The mirror pins the COMPUTED
  values: `sm:leading-none` on the h1 + `sm:leading-[28px]` on the
  hero p.

## The remediation (TDD)

- **D-148a0 THE KPI DELTA RETIREMENT**: `KPI_STATICS.deltas` · the
  `ACTIVITY_KPI_STATICS` delta fields (the subs/bars kept) ·
  `CALENDAR_KPI_STATICS` retired from page-layout.ts; every call site
  drops its trend/trendValue/delta prop.
- **D-148a1 THE ACCOUNTS TRIO + RAIL**: the toolbar trio removed; the
  `view` state + the Cards branch retired; the rail's Save All +
  Filter removed (the FILTER_RAIL contracts stay — the activities rail
  still renders them).
- **D-148a2 THE DASHBOARD BAR**: the Recent-Deals middle select + the
  More... ghost + the `dealsView` state + the "Cards" branch retired;
  `VIEW_SWITCHER` + `TABLE_TOOLBAR.select`/`densityOptions` retired.
- **D-148a3 THE PRIORITY-CARD "More"**: removed from the activities
  Priority toolbar.
- **D-148a4 THE LANDING MORPH**: the Accounts micro-table + the Reports
  7-bar card + the middle-row flip + the sm: leading pins.
- **D-148a5 THE SWEEP RE-DERIVATION**: the family baselines collapse;
  the standingExplained lines re-derived; the pins re-anchored; the
  mutation-proof ×3; the four drift gates CLEAN ×4.
- **D-148a6 THE CAPTURES + THE VLM BATTERY**: the mirrored surfaces.
- **D-148a7 THE DOCS REALIGNMENT**: the count ladder · the line-census
  sites · SKILL v1.145.0 + the session-148 layer · the AGENTS
  Session-148 section · the PAD row · the session_314/315 records.

## The walk-harness lessons (L-148c1..c2)

- **L-148c1 the stale handoff decode**: the s147 handoff's two landing
  decodes ("the magnifier removed" + "the CTA arrow removed") were both
  wrong at the live re-walk — the F-147c3 notes were decoded from
  sweep-crop attributions, not DOM ground truth. The next round's
  mirror must re-decode every handoff finding live before implementing.
- **L-148c2 the asymmetric removal**: the accounts rail lost its
  buttons while the activities rail kept them — a same-family element
  (the FILTER_RAIL construction) with DIFFERENT removal outcomes. The
  per-page scope check ("does the sibling page still render it?") is
  part of the decode, not an optional confirmation.

## The execution record (filled at ship)

- D-148a0 ✓ the constants retirement (KPI_STATICS.deltas · the
  ACTIVITY delta fields · CALENDAR_KPI_STATICS) + the ten call-site
  drops (dashboard ×2 · accounts ×4 · contacts ×1 · activities ×2 ·
  calendar ×4)
- D-148a1 ✓ the accounts trio + the Cards branch + the view state +
  the rail buttons retired (the magnifier + Export kept byte-equal —
  walk38j-verified classes)
- D-148a2 ✓ the dashboard middle select + the More... ghost + the
  dealsView branch retired; VIEW_SWITCHER + TABLE_TOOLBAR's
  select/densityOptions retired from page-layout.ts
- D-148a3 ✓ the Priority "More" retired (the Timeline/by-Type "•••"
  kept)
- D-148a4 ✓ the landing morph (the micro-table + the 7-bar card + the
  `lg:[&>*:first-child]:order-2` flip + `sm:leading-none` +
  `sm:leading-[28px]`)
- D-148a5 ✓ the four-class re-measurement (the family COLLAPSED to
  0.00-0.01 at every class; landscape accounts 1.67 = the PURE s95
  overflow genus) + the baseline re-anchors + the standingExplained
  re-derivation + the sweep-tool pin re-anchors + the mutation-proof
  ×3 + the four drift gates GREEN
- D-148a6 ✓ the captures 326-334 + the VLM battery 3/3 clean (the
  accounts pair · the preview family pair · the dashboard pair) + the
  live two-app construction smoke byte-equal
- D-148a7 ✓ the count ladder (2153/152/2305/115) + the page-layout
  line census (1687/210) + SKILL v1.145.0 + the session-148 layer +
  the AGENTS Session-148 section + the PAD row + the session_314
  record + this execution record + the worklog
- The final gate ✓ lint 0/0 · tsc 0 · 115/2153 (+21) · build · e2e
  152/152 (+1) · the four drift gates CLEAN ×4 · census MATCH + the
  two-commit ship via the SSH wrapper
