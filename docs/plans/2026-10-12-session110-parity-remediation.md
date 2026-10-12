# Session-110 Parity Remediation Plan (2026-10-12)

Session 110 on `main` @ `309c513` (the s109 ship `c64fa81` + the three
session-log follow-ups `9d73ba5`/`41306f6`/`309c513` = session_222.md +
session_223.md + session_224.md). The workspace carried over (no reset):
`git pull` `41306f6..309c513`; the environment standing (bun 1.3.14; the
3-var `.env` contract `DATABASE_URL="file:../db/custom.db"` + AUTH_SECRET +
NEXT_PUBLIC_SITE_URL; `db/` at the repo root with custom.db + e2e.db;
node_modules; chromium v1243/v1248; tree clean). Every op under
`env -u DATABASE_URL` (the shell's stray hazard, re-confirmed at intake).
The repo `skills/` folder excluded from checking/testing/compilation
throughout.

## Baseline gate (stepwise, the s102-s109 lesson)

- lint 0/0 ✓ · tsc 0 ✓ · 108 files / 1934 tests ALL PASSING (14.73s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m) ✓ — exactly the s109 ship state,
  zero flakes this run.

## The audits

- **110-a (subagent)**: the s109 ship delta (`520284f..c64fa81`, the feat
  18 files +1114/−73, src/ = exactly ONE file) **GENUINE 9/9** — the
  M-109c1 fix verified hunk-by-hunk (the four class strings + the label
  span + the comment block); the row pin; the activities-mobile guard with
  every asserted geometry; the F-109a1/a2/a3 fixes + the LIVE-CENSUS it
  (live run 21/21, all 13 doc sites === live `wc -l`); the count ladder;
  the captures 168/169 valid PNGs at exactly 390×844 + 1440×900; the docs
  realignment at every claimed site; the e2e census 137 by direct count.
  Non-vacuousness reproduced EXACT: the mixed state **22 failed | 107
  passed (129)**, all 22 by name; the native pre-s109 **127/127**; HEAD
  **108/1934**. **ZERO real findings** (the LIVE-CENSUS pin holds the
  whole line-count axis — the F-109a genus retired at birth). Notes:
  N-110a1 (the AGENTS §Session-109 109-a parenthetical conflates the
  audit's 27|55(82) with the RED-1's 22|107(129) — dated-history,
  note-only), N-110a2-4 (dated chronicles).
- **110-b (subagent)**: the standing-layers audit **9/9 PASS — ZERO real
  findings** (~67th consecutive; `git diff c64fa81..HEAD -- src/` = 0
  bytes). The ledger live 108/1934 ALL PASSING. The CSV census 17 sites
  ZERO unguarded, ZERO line drift. Source-vocabulary byte-identical since
  s90. The config layer verified (all six configs 0-diff). The SEO/sitemap
  layer **46/46 LIVE first-run clean** (PORT 3126, one invocation,
  boot→checks→kill; + the supplements theme-color #000000 /
  apple-touch-icon / meta description 405 / the /Accounts alias / NO
  lastmod). The mobile-nav contract INTACT (the 10-test battery +
  MOBILE_NAV_E2E=10 + all SEVEN phrase sites + the arithmetic
  11+111+10+1+1+1+1+1=137). The globals.css v4 re-pins PRESENT. Both
  operator decisions STANDING (the 70th). The drawer battery at TRUE
  390×844 **FULLY GREEN live — exit 0**.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 81st consecutive**;
  census #106: demo zero · desktop 256px/8 STANDING · the mobile-nav
  defect STANDS at TRUE 390 (the 31st consecutive — the reference's own
  bug, our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each).
- **The scandihaven patterns re-checked** (d4789c3; Next.js 16 + React 19
  + TS 5.9 strict + Tailwind v4 CSS-first + Radix + Zustand +
  Vitest/Playwright — on-pattern, nothing new to adopt).

## The rotation (110-c) — THE DASHBOARD KPI SEAM UNIFICATION

The s109-close suggested next #1 (twice the candidate, deferred behind
the mobile walks): the dashboard KPI row still derives INLINE in
`src/app/api/dashboard/route.ts` since session-31 (the Eke memo decode) —
the LAST inline KPI derivation, the exact s107-genus the reportsKpis
extraction retired for the reports route. The house seam doctrine
("pure domain logic lives in `src/lib/*` seams with Vitest coverage;
handlers and pages only orchestrate") has been violated by this route for
79 sessions. Three existing pins read the INLINE construction
source-level (opportunity-model ×2, dashboard-family-parity ×1) and one
MIRRORS the formula inside the test body (seeded-charts :200-206 — the
s103-era form; a route formula edit would NOT fail that test, the
mirrored copy would keep passing while the app drifted — the exact
weakness the s107 freeze retired for reports).

The ANALYZE (this session, pre-plan): the route's KPI block is five
members — `totalLeads` (leads.length), `salesTarget` (the reference's
HARDCODED literal 0 — its `V=0` quirk), `salesTargetProgress` (0),
`conversionRate` (the WON-LEAD share of ALL leads, toFixed(1), "0" at
zero — a STRING on the wire), `avgSalesCycleDays` (the average AGE of the
won leads: floor((now − created)/day) per lead, averaged, rounded — NOT
created→closed, the s29 H/U doctrine). The `wonLeads` intermediate
retires with the block (only the seam consumes it); `wonOpps` STAYS (the
revenueOverTime derivation reads it). The seeded values (the s103 census
+ this session's arithmetic): **totalLeads 24 · wonLeads 7 ·
conversionRate "29.2" (7/24) · avgSalesCycleDays 83** (the ages
140+120+95+80+62+45+38 = 580, /7 = 82.857 → round 83 at the synthetic
seed-time NOW).

### S110-P1 (the seam — NEW `src/lib/dashboard-data.ts`)

`dashboardKpis(leads, now)` — extracted behavior-preserving (the formulas
byte-identical, the s107 reportsKpis precedent):

- `DashboardKpiLeadRow { stage: string; createdAt: Date }` (the row shape
  the derivation sees — leads, UNFILTERED);
- `DashboardKpis { totalLeads; salesTarget; salesTargetProgress;
  conversionRate: string; avgSalesCycleDays }` (DashboardData["kpis"],
  structural);
- the function: `totalLeads = leads.length`; `salesTarget = 0` +
  `salesTargetProgress = 0` (the reference's hardcoded V=0 quirk, the
  comment carried); `conversionRate = leads.length > 0 ?
  ((wonLeads.length / leads.length) * 100).toFixed(1) : "0"` (the
  WON-LEAD share — the dashboard's own vocabulary, NEVER the reports'
  won-OPPS share); `avgSalesCycleDays` = the rounded average of the
  per-lead FLOORED ages of the won leads, 0 at zero won (createdAt
  ONLY — closedAt never enters the signature, structural).

### S110-P2 (the route slim — `src/app/api/dashboard/route.ts`)

The KPI block + the `wonLeads` intermediate retire; the route imports
the seam and assigns `kpis: dashboardKpis(leads, now)` inside the
DashboardData literal. `wonOpps` / `revenueOverTime` (REVENUE_LABELS +
the 55k±random target) / `leadSources` / `upcomingActivities` stay
untouched (the s78 slim's members, not this rotation's scope). The
route's comment block gains the s110 note. Behavior-preserving: the API
response is byte-identical (same formulas, same inputs) — the e2e
dashboard golden path + the drift sweeps + the KPI cards all unchanged.

### S110-P3 (the NEW suite `tests/seeded-dashboard-kpis.test.ts` — 4 its)

The s107 seeded-reports-kpis template (the same parse layer, the same
synthetic NOW = Date.UTC(2026, 9, 11) — one seed-time truth shared with
seeded-charts/seeded-reports-kpis):

1. **the seam formula members (synthetic)**: salesTarget 0 +
   salesTargetProgress 0 (the V=0 quirk); the conversion toFixed(1)
   won-LEAD share + the "0" zero-division guard; the avg-cycle =
   per-lead-floored rounded average AGE + the 0 guard; the
   createdAt-ONLY signature (closedAt absent — structural); a known-ages
   synthetic set (e.g. 3 won leads at 10/20/30 days → avg 20; a 364-day
   + 1-day pair → the floor-then-average-then-round order pinned).
2. **the route wiring (source-level)**: the route calls `dashboardKpis(`
   + imports from `@/lib/dashboard-data`; NO inline KPI construction
   survives (`const salesTarget`, `conversionRate:` field literal,
   `avgSalesCycleDays` reduce — the retired constructions never return).
3. **the seeded dashboard KPI row (the freeze)**: the parsed 24-lead
   seed through the REAL seam at the synthetic NOW — **totalLeads 24 ·
   salesTarget 0 · salesTargetProgress 0 · conversionRate "29.2" ·
   avgSalesCycleDays 83** (the all-time face; the s103 pin held the
   24 + "29.2" members through a MIRRORED formula — now through the
   seam, a route edit can no longer drift past it).
4. **the cross-seam contrast (the unification face)**: the SAME seed
   through `reportsKpis`' rolling-quarter window reads totalLeads 18 /
   conversion "66.7" (the s107 freeze) while the dashboard face reads
   24 / "29.2" — the two KPI rows' vocabularies pinned side-by-side:
   the WINDOW axis (all-time vs quarter) AND the NUMERATOR axis
   (won-LEADS vs won-OPPS) — the unification this rotation names.

### S110-P4 (the re-anchors — the four existing pin sites)

- **opportunity-model.test.ts :165** ("the KPI block hardcodes
  salesTarget 0"): re-anchored onto the SEAM source (the s107
  precedent — "the formula itself — read from the SEAM source now") +
  the route-calls-seam assertion.
- **opportunity-model.test.ts :184** ("avgSalesCycle is the average AGE
  of won leads"): same re-anchor — the createdAt-not-closedAt contract
  now pinned at the seam, the route assertion on the call.
- **dashboard-family-parity.test.ts :213** ("the route KEEPS the
  unfiltered members"): the route half re-anchored — keeps
  revenueOverTime/leadSources/upcomingActivities + CALLS the seam; the
  KPI-member constructions live in the seam (asserted there).
- **seeded-charts.test.ts :200** ("the dashboard KPI members on the
  PARSED seed"): the MIRRORED formula retired — the it imports the REAL
  `dashboardKpis` and asserts 24 + "29.2" through it (the s103-era
  mirror was drift-blind by construction).

### S110-P5 (the count ladder + the census pair + the probe ordinals)

`UNIT` 1934 → **1938** (+4 — the new suite's 4 its; the four re-anchors
land in EXISTING its, no net change); `SUITES` 108 → **109** (the new
suite file — the FIRST new unit suite since s108's calendar-grid);
`E2E` **137 unchanged** (no e2e face — the extraction is server-internal,
the golden path already covers the surface); badge 2071 → **2075**
(UNIT+E2E: 1938+137); the README commands suite list gains
**seeded-dashboard-kpis**; the README file-tree lib comment gains
**dashboard-data**; the Appendix B unit-total row 108|1934 → **109|1938**
+ the NEW per-suite row; the line-census gains its FOURTEENTH pair at
birth — **PAD `src/lib/dashboard-data.ts` | <live wc -l>** (the
F-109a1-genus prevention: the row can never go stale, either face fails
the gate); the retired 1934/108/2071 constructions join the negatives
ladders; the dialog-geometry CLAUDE lockstep re-anchored 1934 → 1938
(the F-92a3 carrier); the probe ordinals 80/30th → **81/31st**
(scripts/drift-probe.ts header + the test echo + the it title).

### S110-P6 (the captures + the VLM battery)

The throwaway capture script (the s104-s109 pattern — repo-internal,
deleted after use; a fresh `db:seed` first so the ages are the design
offsets): **170** (the seeded dashboard KPI row at 1440 — the six cards:
Total Leads 24 · Sales Target $0k/0% · Conversion Rate 29.2% · Avg Sales
Cycle 83d + the s78 client-side Deals Closed/Revenue This Month pair)
+ **171** (the KPI ladder at 390×844 — the six stacked cards, gap-16,
the frame at 390). The live probe reads the /api/dashboard envelope
alongside (the kpis member byte-identical to the pre-slim response —
the behavior-preserving proof) + docScrollW/mainScrollW at 390. The VLM
battery per the house protocol, 4 checks per capture: structure ·
content · layout-fit · render quality — with the KPI values (24 · $0k ·
29.2% · 83d) the reads on 170/171.

## The RED plan (TDD)

- **RED-1 (the seam FIRST, then the ladder + the wiring pins)**: create
  `src/lib/dashboard-data.ts` (behavior-preserving, ZERO consumers — the
  route still computes inline) + write the NEW suite (the formula/seeded/
  contrast its PASS against the standing seam; the route-wiring it FAILS
  — the route still inline) + the four re-anchors (the route-assertion
  halves FAIL) + the docs-counts re-anchors (UNIT 1938 + SUITES 109 +
  badge 2075 + the new negatives + the suite-list + the Appendix B
  109|1938 + the FOURTEENTH census pair + the H1/project_state lockstep
  counts+layer faces) + the dialog-geometry lockstep 1938 → run the
  affected suites against the still-inline route + the still-old docs →
  the failures enumerated by name. Expected ≈ 19-21 failed (the ~14-15
  docs-counts count-axis its + the new suite's route-wiring it + the
  opportunity-model ×2 + the dashboard-family-parity ×1 + the
  dialog-geometry lockstep), stash-proven (stash the test files + the
  seam → the pre-s110 state → all green → pop → the RED re-confirmed).
- **GREEN**: the route slim (S110-P2) + the full doc realignment (README
  · AGENTS · CLAUDE · PAD [tree + Total + HEAD + checklist/commands +
  the module-table dashboard-data.ts row + the s110 inventory row] ·
  SKILL v1.107.0 [frontmatter + the H1 + the project_state — the s110
  layer prepended + §16cx + the Appendix B rows + the wall-clock] +
  session_225.md + the plan's execution record) → all green (109 files /
  1938).
- **RED-2 (the induced drift, BOTH faces)**: (A) the seam-formula
  perturbation — `toFixed(1)` → `toFixed(0)` in the seam → the formula
  it + the seeded-row it + the seeded-charts it FAIL by name → restored
  → GREEN. (B) the seed perturbation — a won lead's stage `won` →
  `contacted` → the new suite's seeded-row it (+ the seeded-charts stage
  census) FAIL by name → restored → GREEN. (The s107 both-faces
  doctrine: a seed edit AND a formula edit each fail the gate by name.)

## Blast radius (pre-checked)

- **src/ (TWO files)**: `src/lib/dashboard-data.ts` (NEW — the seam) +
  `src/app/api/dashboard/route.ts` (the slim: the KPI block + wonLeads
  retire, the import + the seam call join; revenueOverTime/leadSources/
  upcomingActivities/wonOpps untouched).
- tests/seeded-dashboard-kpis.test.ts (NEW — 4 its),
  tests/docs-counts.test.ts (the ladder + the census pair + the suite
  list + Appendix B + the H1 lockstep), tests/opportunity-model.test.ts
  (2 its re-anchored), tests/dashboard-family-parity.test.ts (1 it
  re-anchored), tests/seeded-charts.test.ts (1 it re-anchored),
  tests/dialog-geometry-parity.test.ts (the CLAUDE lockstep),
  scripts/drift-probe.ts + tests/drift-probe-tool.test.ts (the
  ordinals), the docs family (README · AGENTS · CLAUDE · PAD · SKILL
  v1.107.0 · session_225.md · this plan · the worklog · screenshots
  170/171 NEW).
- **The e2e compatibility pre-checked**: the extraction is
  behavior-preserving (byte-identical response) — the crm.spec dashboard
  golden path ("Total Leads" visible + the KPI-cards-immediately test +
  the s31 opp-based pins) all keep passing; NO e2e asserts the KPI
  VALUES numerically (label-level only — verified by grep this session);
  the drift sweeps run the same rendered pixels (server-internal change)
  — NO re-baselining.
- **The standing pins compatibility pre-checked**: api-robustness :943
  (the try/catch containment — the route still reads the DB inside try)
  unaffected; dashboard-family-parity :196-211 (the RETIRED-members
  negatives — `const pipeline`/`topReps`/`recentDeals`/
  `dealsClosedValue`/`daysUntil` stay retired) unaffected; :224 (the
  three DB reads inside try) unaffected; :236 (the DashboardData type
  slim) unaffected (the type does not change); opportunity-model :173
  (the page's filteredOpps re-derivation) + :191 (the FIXED Nov..May
  labels — stays in the route) + :196 (the page memos) unaffected.
- The vitest config untouched (the include glob covers the new file);
  the playwright config untouched (no new spec); the gate:full chain
  unchanged; the census contract untouched (the seed is not edited —
  only read).

## The execution record (2026-10-12, session-110)

Executed RED-first, with the plan holding end-to-end (zero in-flight
corrections needed — the plan-validation arithmetic was exact):

- **RED-1 (the seam FIRST + the ladder + the wiring pins)**: the seam
  created (`src/lib/dashboard-data.ts` — zero consumers, the route still
  computing inline) + the NEW suite (the formula/seeded/contrast its
  PASS against the standing seam; the route-wiring it RED) + the four
  re-anchors + the docs-counts re-anchors (UNIT 1938 + SUITES 109 +
  badge 2075 + the new negatives + the suite list + the Appendix B +
  the FOURTEENTH census pair + the H1/project_state lockstep
  counts+layer faces) + the dialog-geometry lockstep → **19 failed |
  97 passed (116)** — the 14 docs-counts count-axis its + the new
  suite's route-wiring it + the opportunity-model ×2 + the
  dashboard-family-parity + the dialog-geometry lockstep, enumerated by
  name (the plan predicted ≈19-21). **Stash-proven**: the nine files
  stashed with -u → **112/112** (the pre-s110 state) → pop → **19 RED**
  re-confirmed.
- **GREEN (the route slim + the realignment)**: the route slim (+19/−33:
  the seam call + the import + the s110 comment block; the KPI block +
  the wonLeads intermediate retired; the five retired-construction
  negatives armed) + the full doc realignment (README badge 2075 + the
  tree lib comment + the commands suite list + the Tested row's s110
  clause · AGENTS commands/gate-order 1938 + the §Session-110 block ·
  CLAUDE the four unit sites at 1938 · PAD tree/Total/HEAD/
  checklist/commands 109|1938 + the module-table dashboard-data.ts row
  (77 lines — the FOURTEENTH census pair) + the s110 inventory row ·
  SKILL v1.107.0 [frontmatter + the H1 + the project_state — the s110
  layer prepended + §16cx + the Appendix B 109|1938 + the per-suite
  row] + session_225.md + this record) → **109 files / 1938 tests ALL
  PASSING** (+4 net). One in-flight fix documented: the opportunity-model
  salesTarget pin's first slice anchored on the INTERFACE member
  (`salesTarget: number` — the type, not the formula); re-anchored on
  the FUNCTION body (`export function dashboardKpis`) — the interface's
  own member is the structural type pin, the body slice the formula
  pin.
- **RED-2 (the induced drift, BOTH faces)**: (A) the seam-formula
  perturbation `toFixed(1)` → `toFixed(0)` → **4 its FAILED by name**
  (the seam formula members + the seeded row + the cross-seam contrast +
  the seeded-charts re-anchored it) → restored → **GREEN (15/15)**. (B)
  the seed stage perturbation (the Annual platform license lead won →
  contacted) → **7 its FAILED by name** across all three seeded suites
  (the seeded-dashboard ×2 + the seeded-charts ×4 [the stage census +
  the value totals + the funnel + the KPI members] + the
  seeded-reports-kpis window-boundary — the −95 lead IS the perturbed
  one) → restored → **GREEN (19/19)**.
- **The e2e phase**: build ✓ + the first full run hit the two documented
  load-sensitive flakes (the S14-P1 settings Defaults-tab at crm:363 +
  the S72-P2 debounce at crm:2477 — both the settings family, untouched
  by this session's dashboard change; both passing in isolation, the
  documented genus) → the re-run **137/137 fresh CI=1 (3.2m)**.
- **S110-P6 (the captures + the VLM battery)**: the throwaway capture
  script (a fresh db:seed → the standing build on PORT 3131 →
  captures → kill; deleted after use). The live `/api/dashboard`
  envelope through the NEW seam: **totalLeads 24 · salesTarget 0 ·
  targetProgress 0 · conversionRate "29.2" · avgSalesCycleDays 82** —
  the invariant members exact; the live avg reads 82, the pre-09:00
  same-day face of the design-83 (the s103-documented seed-hour nuance:
  the seed writes 09:00/15:00 hours, so a same-day render before 09:00
  floors each age one day down — 573/7 → 82; the unit pin freezes the
  DESIGN ages at the midnight-aligned anchor: 580/7 → 83). **170**
  (1440×900 — the six-card KPI row) + **171** (390×844 — the stacked
  ladder, docScrollW 390 + mainScrollW 390). **The VLM battery 4/4 +
  4/4, zero adjudications**: the VLM independently read all six cards
  verbatim off BOTH viewports (Total Leads 24 +5.3% · Deals Closed
  $337.0k · Revenue This Month $126.0k +15% · Sales Target $0k 0% ·
  Conversion Rate 29.2% · Avg. Sales Cycle 82 days) and the full
  containment at 390.
- **GATE (stepwise)**: lint 0/0 · tsc 0 · **1938/1938** unit [109
  suites] · build · **137/137** e2e fresh CI=1 · the four drift sweeps
  CLEAN (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each
  --fail-on-drift — NO re-baselining: the extraction is server-internal,
  the rendered pixels identical). The closing census MATCH
  (15/24/10/23/12 + 4 users). The tree exactly as planned: src/ = the
  TWO files (the NEW seam + the slimmed route); the seven test/script
  files; the docs family; the two captures.
