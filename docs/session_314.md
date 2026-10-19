# Session 314 — the session-148 record (the desktop-interior mirror)

## The intake

The workspace re-cloned at `488ef79` (the s147 ship `911a067` + the
session_312 record `0e1a570` + the session_313 transcript `488ef79`).
The sandbox was reset TWICE mid-round — a prior session-148 attempt
was cut off mid-docs-phase with nothing committed, and this session's
near-complete pass (unit 115/2153 + build + e2e interrupted) was also
lost; the final pass re-applied the verified change-set from the
durable patch scripts. The environment re-stood each time: bun install
· .env from .env.example with a fresh AUTH_SECRET · db:push + db:seed
· census MATCH 15/24/10/23/12 + 4 users · the Playwright chromium
re-installed. The baseline gate GREEN — the exact s147-ship match:
lint 0/0 · tsc 0 · **115/2132 unit** · build · **e2e 151/151**.

## The audits

- **148-a (the s147 ship verification)**: 11/11 spot-verified, zero
  findings — the sweep standing tables reproduce exactly (the F-147c3
  family values: desktop accounts 1.97/contacts 2.50/activities
  4.52/settings 2.65/landing 7.26 · tablet landing 10.77/activities
  5.13 · phone contacts 5.51/settings 3.63 · landscape landing
  9.38/accounts 3.36/activities 5.73) · the docs-counts ladder
  (2132/151/2283/115, 21/21 GREEN) · SKILL v1.144.0 + the session-147
  layer · `.env` untracked, src/ clean · zero dep changes · the
  sitemap 11 routes + robots · the drawer battery GREEN.
- **148-b (the standing battery)**: PASS — the same set + the four
  drift gates CLEAN ×4. The racy reference states that motivated the
  lost attempt's verify-on-trip design had SETTLED: every page
  deterministic across repeated runs (the earlier racy captures were
  the probe session's own expiry → the guest wall, not a deploy).
- **probe:ref #122**: STABLE at the s147 fingerprint
  (`index-n8TZHw0K.js` · `46bc2d9c…`) — no new parity event; the round
  is the F-147c3 mirror per the session_312 "next" hint. The
  reference's demo data is ZERO rows (volatile workspace state, not
  for mirroring).

## The walk (walk38 — the F-147c3 ground-truth decode, 8 census passes)

- **TWO STALE s147 HANDOFF DECODES CORRECTED** (the L-148c1 lesson):
  the accounts search magnifier is KEPT (only the trio retired) and
  the desktop hero CTA KEEPS its ArrowRight (only the mobile-menu +
  footer CTAs are arrow-less) — both re-decoded live before any
  implementation.
- **TWO s147-MISSED DECODES** (found by the live re-walk): the
  dashboard's Recent-Deals bar retired BOTH its blank middle select
  AND its "More..." dead ghost (walk38k: the reference's bar is
  exactly [Filter][All Stages][All Sources][search]); the activities
  Priority card's plain "More" ghost is gone (its toolbar = the h2
  alone; the Timeline/by-Type "•••" survive).
- **THE KPI DELTA-CHIP FAMILY**: no trend chips on any core page —
  accounts h=102 (compact), contacts h=122, activities h=118 (the
  SUB-texts "Due now"/"+7 today"/"+4 today"/"+1h 12m" KEPT), calendar
  h=138, dashboard (no "+5.3%"/"+15%").
- **THE ASYMMETRIC RAIL REMOVAL** (the L-148c2 lesson): the accounts
  rail lost Save All + Filter; the activities rail KEEPS its pair —
  the removal is accounts-scoped.
- **THE LANDING MOCK MORPH (byte-decoded)**: the three preview mocks
  are content-varied — the Dashboard mock keeps the byte-equal 5-bar
  pipeline; the Accounts mock renders a 4-row micro-table (the
  grid-cols-3 construction verbatim: Northwind Trading/Wholesale/$1.2M
  · Vertex Group/Software/$3.4M · Bluepeak Health/Healthcare/$780k ·
  Harbour & Co/Logistics/$450k; mockH 299); the Reports mock renders
  "Revenue by month" with SEVEN bars [42,64,50,82,60,94,71]%. The
  MIDDLE row flips at lg (`lg:[&>*:first-child]:order-2` — mock RIGHT
  at x=626, text LEFT at x=168). The hero's ≥sm line-heights compute
  the font-size pairings on the reference (h1 48/48 + 60/60, p 18/28)
  while ours computed the leading utilities (51.84/64.8, 29.25) —
  phone identical on both apps (38.88/26); the mirror pins the
  COMPUTED values (`sm:leading-none` + `sm:leading-[28px]`).

## The remediation (TDD)

- **D-148a0 THE KPI DELTA RETIREMENT**: `KPI_STATICS.deltas` · the
  `ACTIVITY_KPI_STATICS` delta fields (the subs/bars kept) ·
  `CALENDAR_KPI_STATICS` retired; every call site drops its
  trend/trendValue/delta prop (dashboard ×2, accounts ×4, contacts ×1,
  activities ×2, calendar ×4).
- **D-148a1 THE ACCOUNTS TRIO + RAIL**: the toolbar's switcher +
  density + More retired (the search+magnifier and Export CSV kept
  byte-equal); the `view` state + the Cards branch retired; the rail's
  Save All + Filter retired.
- **D-148a2 THE DASHBOARD BAR**: the middle view-switcher + the
  More... ghost + the `dealsView` state + the "Cards" deals branch
  retired; `VIEW_SWITCHER` + `TABLE_TOOLBAR.select`/`densityOptions`
  retired from page-layout.ts (`row`/`moreBtn` stay — the Export's
  class).
- **D-148a3 THE PRIORITY "More"**: retired from the activities toolbar.
- **D-148a4 THE LANDING MORPH**: the Accounts micro-table + the
  Reports 7-bar card + the middle-row flip + the sm: leading pins.
- **D-148a5 THE SWEEP RE-DERIVATION**: the family COLLAPSED (every
  class 0.00-0.01; landscape accounts 3.36 → 1.67 = the PURE s95
  overflow genus); the four baseline tables + the standingExplained
  lines + the sweep-tool pins re-anchored; the mutation-proof ×3; the
  four drift gates CLEAN ×4.
- **D-148a6 THE CAPTURES 326-334 + THE VLM BATTERY 3/3 CLEAN** (the
  accounts pair — the trimmed toolbar/rail/chips all PASS; the preview
  family pair — the three mocks, the table + 7 bars, the flip all
  PASS; the dashboard pair — the bar + the chip-free KPIs PASS).
- **D-148a7 THE DOCS REALIGNMENT**: the count ladder (2132 → 2153 ·
  E2E 151 → 152 · badge 2283 → 2305) · the page-layout line census
  (1698/205 → 1687/210) · SKILL v1.145.0 + the session-148 layer · the
  AGENTS Session-148 section · the PAD row · this record + the plan
  execution record + the worklog.

## The walk-harness lessons (L-148c1..c2)

- **L-148c1 the stale handoff decode**: the s147 handoff's two landing
  decodes ("the magnifier removed" + "the CTA arrow removed") were
  both wrong at the live re-walk — they were decoded from sweep-crop
  attributions, not DOM ground truth. The next round's mirror must
  re-decode every handoff finding live before implementing.
- **L-148c2 the asymmetric removal**: the accounts rail lost its
  buttons while the activities rail kept them — a same-family element
  (the FILTER_RAIL construction) with DIFFERENT removal outcomes. The
  per-page scope check is part of the decode, not an optional
  confirmation.

## The ship

The final gate: lint 0/0 · tsc 0 · **115/2153** · build · **e2e
152/152** · the four drift gates CLEAN ×4 · probe:ref STABLE · census
MATCH · the VLM battery 3/3. The two-commit pattern (the feat + the
session log) pushed to git@github.com:nordeim/neo-crm.git main via the
SSH wrapper (the paramiko shim; the dry-run then the real push;
remote-verified; the key shredded).

**Next**: the standing genera left are the settings picklist-DATA
genus (volatile workspace data — not for mirroring), the login logo
genus (constant-absolute px), and the s95 landscape accounts overflow
genus (the reference's own table poke-out). Otherwise: the rotation
candidates — the settings picklist family's phone state, or the
standing-defects ledger's remaining entries re-verified live.
