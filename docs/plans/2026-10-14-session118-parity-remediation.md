# Session-118 Parity Remediation Plan (2026-10-14)

## Baseline gate (stepwise)
- lint 0/0 · tsc 0 · **109/1952 unit** · build · **e2e 136/137 — ONE
  failure, the F-118a1 wall-clock time-bomb live-reproduced** (the
  accounts battery's Overdue KPI expected "3" received "5" at 23:08
  local — past both seeded joiner hours). The s117 ship state otherwise
  exactly reproduced after the environment rebuild (fresh clone, .env
  from .env.example + fresh AUTH_SECRET, db push + seed, census MATCH
  15/24/10/23/12 + 4 users, 634 top-level packages, the
  chromium-1243/headless-shell repair).

## The audits
- **118-a (the s117 ship-delta, hunk-by-hunk): 7/7 shipped claims
  Verified** (the freeze — ZERO src/ files in a0bcebb..bb33571; the
  D-117a2 pin, the D-117a1 battery, the D-117a0 defuse, the count
  ladder, the captures 196-199, the censuses — every claim measured
  exact). **THREE findings**:
  - **F-118a1 (Critical)** — `crm.spec.ts:76` the accounts battery's
    `kpiCard("Overdue Activities") toHaveText("3")` is the F-117a2
    genus reintroduced ON THE SESSION'S OWN NEW BATTERY: the two `due:0`
    seed rows join after their seeded hours (`dueAt = iso(due, 10 +
    ownerIdx*2)` → "Check-in — patient portal" ownerIdx 0 today 10:00 →
    Oasis Healthcare; "Prepare RFP response" ownerIdx 2 today 14:00 →
    Emirates Global Trading; both accounts distinct from the standing
    three Northwind/Cedar/Al Noor) → the KPI reads 3 only 00:00-10:00,
    4 in [10:00,14:00), 5 after. **Live-reproduced at 23:27** — the
    battery's pass window is 10 of 24 hours (the s117 gate ran inside
    it, 06:55-09:43 UTC).
  - **F-118a2 (Critical)** — `crm.spec.ts:89` the `overdueRows
    toHaveCount(3)` shares the identical flip (each joining account's
    row renders a "1 Overdue" badge + the red border).
  - **F-118a3 (Informational)** — `crm.spec.ts:2927` the CSV filename
    literal computes `today` via `toISOString()` (UTC) where the app's
    `csvFilename` uses the LOCAL calendar date — agree only where TZ=UTC
    (the standing container); zero risk in the standing environment.
  - The full time-bomb enumeration across all 8 e2e specs: the two
    Critical sites above are the ONLY bombed exact asserts; every other
    clock-adjacent assert is already shape/bounds-pinned (the D-117a0
    patterns, the N-66d shape, the s18 MMM d, yyyy pattern, the
    in-test-computed calendar dates).
- **118-b (the standing layers, ~76th consecutive): 9/9 PASS** — SEO
  live 6/6 (sitemap 9 lowercase locs · robots Sitemap: · manifest JSON
  · /login og:×8 + twitter:×5 · /accounts 307→/login), drawer battery
  10/10 exit 0 at TRUE 390×844, design-tokens 15/15, vocabulary 6/6,
  config zero drift, census MATCH, the Tailwind v4 layer 137 token
  lines + the --shadow-sm/--blur-sm re-pins, the defect ledger (10
  mobile-nav test blocks; db-path 20/20), metadata 37/37. Record-only:
  the "twitter:×6" in prior records is ×5 (the N-108b2 double-count
  genus — meta tag + RSC payload).

## The live verification (pre-plan, orchestrator-run)
- **probe:ref — the 89th consecutive STABLE** (bundle md5
  `a70a637fcf1d4291da8e0d965676dc11` exact; the TRUE-390 mobile-nav
  defect STANDS — the reference's own bug; demo data ZERO).
- **The four drift gates CLEAN** — desktop 1440 · phone 390 · tablet
  768 · landscape 1024, each `--fail-on-drift` (no re-baselining).
- **census MATCH**. **Scandihaven re-cloned at `d4789c3`** — on-pattern.

## The rotation (118-c) — THE DASHBOARD-CHARTS + LEADS-STATCARD FAMILY WALK
The s117 close's named candidates (the s74/s85-era surfaces, 30+
sessions stale — the rotation ledger's next-stalest names). Both
surfaces walked in one interlocked pass: the walk scripts drove OUR app
(standalone build, scratch walk db, PORT 3141) + the reference through
`/` and `/leads` at 1440×900 + 390×844 with computed-style + census
extraction, login first on both.

### THE ZERO-DATA FACE (two-app) — COMPLETE byte-equal parity
- **The dashboard KPI row**: 6 cards byte-equal (Total Leads · Deals
  Closed · Revenue This Month · Sales Target · Conversion Rate · Avg.
  Sales Cycle), the zero values (0/$0.0k/$0.0k/$0k/0%/0), 14px/400
  labels + 30px/700 values @1440, 12px/400 + 24px/700 @390 (the
  sm:text-3xl/text-2xl breakpoints), the 173.3px ×6 grid @1440 /
  358px single column @390, cards 173×174 @1440 / 358×130 @390.
- **The dashboard chart cards**: all 6 byte-equal (Sales Pipeline by
  Stage · Revenue Over Time · Top Performing Sales Reps · Lead Sources
  · Upcoming Activities · Recent Deals), 18px/600 titles, widths
  548/548/357/357/357/1120 @1440, SVG heights 300/300/16/16/16/16, the
  zero-data bar/path/line/text censuses byte-equal (the REAL chart at
  zero data — bars=1 both sides).
- **The Recent Deals table**: the 8 heads byte-equal (Lead · Company ·
  Deal Value · Status · Owner · Close Date · the second Status · the
  ⋮ head) — zero rows on both.
- **The leads statcards**: 6 cards byte-equal (Total Leads · Open Leads
  · Won Deals · Dropped Deals · Conversion Rate · Avg. Sales Cycle),
  the zero values (0/0/0/0/0%/0 days), 14px/400 labels + 24px/700
  values @1440 / 12px + 20px/700 @390, cards 173×154 / 358×102-122,
  **the chip backgrounds byte-equal** (blue-50/orange-50/green-50/
  red-50/purple-50/cyan-50), the chip widths byte-equal (40/40/40/34/
  32/32 @1440; 32 uniform @390).
- **The leads table**: the 9 heads byte-equal at both widths; docScrollW
  contained 1440/390 on both apps on both surfaces.
- One diff adjudicated as the **documented s91 chart-noise genus**:
  Revenue Over Time @390 lines=26 (ours) vs 25 (ref) — a gridline
  count difference at the 358px card width; the drift gate's phone
  face (dashboard within the ~0.5% mobile floor) is authoritative —
  chart noise, not a parity defect.

### THE POPULATED FACE (ours-only — the reference's zero-data genus)
Every axis healthy against the s27/s31/s74/s78/s85/s89/s110 decoded
contracts (every value seed-verified independently off the db):
- **The dashboard KPI values: 24 / $337.0k / $126.0k / $0k+0% / 29.2% /
  83** — Total Leads 24 raw · Deals Closed $337.0k (the 4 won opps
  87k+145k+39k+66k) · Revenue This Month $126.0k (the two -1-day
  updatedAt opps 87k+39k, month 9) · the hardcoded V=0 Sales Target ·
  Conversion 29.2% (7 won leads / 24, toFixed(1)) · Avg Cycle 83 (the
  average age of the won leads).
- **The chart populated censuses**: the pipeline 5 stage labels +
  the $-axis · the FIXED Nov..May revenue labels · the Recent Deals 5
  rows (the slice-5 contract, first row "LMS migration" $39,000 Won
  Lena Fischer) — the constructions healthy.
- **The leads statcard values: 24 / 9 / 7 / 4 / 29.2% / 83 days** —
  Open = new+contacted+qualified (4+2+3) · Dropped = lost STRICTLY (4)
  · the subValues **$687,000 (won) / $226,000 (lost)** · the table 24
  rows @1440 · the same KPI values at 390 with docScrollW contained.

### THE RESULT — zero real parity defects; three freeze finds
- **D-118a0 (the F-118a1/F-118a2 defuse)** — the accounts battery's
  two exact "3" asserts are the only bombed exact asserts in the
  suite (the 118-a enumeration) — the defuse is the session's ONE
  Critical-path change.
- **D-118a1 (the e2e batteries)** — the leads e2e test (:27) is THIN
  (heading + 3 chart titles + one name — the exact D-116a1/D-117a1
  genus: ZERO statcard value contracts); the dashboard e2e (:6) pins
  the labels + "24" only — the populated values ($337.0k, 29.2%, the
  month-roller) unpinned.
- **D-118a2 (the unit pin)** — the six leads statcard labels never
  pinned as a set ("Open Leads" in ZERO unit assertions as a label-set
  member; the D-117a2 genus) — and the chip-tone/icon adjacency
  (blue-TrendingUp · orange-Target · green-CircleCheckBig ·
  red-CircleX · purple-Percent · cyan-Calendar) unpinned as a census.

## S118-P0 (the defuse — the F-118a1/F-118a2 remediation, INSIDE the existing accounts test)
1. **The KPI** `:76` — the `toHaveText("3")` → the bounded manual read
   + `toBeGreaterThanOrEqual(3)` / `toBeLessThanOrEqual(5)` (the
   D-117a0 idiom: toHaveText/toHaveCount are exact-only; 3 before
   10:00 · 4 in [10:00,14:00) · 5 after — the two due:0 joiners).
2. **The rows** `:89` — the `toHaveCount(3)` → the same bounded manual
   count over the "1 Overdue" row filter.
3. The comment documents the joiner mechanics (the ownerIdx*2 hour
   pinning) so the bounds stay derivable.

## S118-P1 (the unit pin — ONE new it, in an EXISTING file)
`tests/leads-statcard-parity.test.ts` (the s89 stat-card suite, 9
its — the natural host): **the six-label + adjacency census pin** —
the labels as an ordered set (Total Leads · Open Leads · Won Deals ·
Dropped Deals · Conversion Rate · Avg. Sales Cycle) + the per-card
chipTone adjacency (blue/orange/green/red/purple/cyan) + the icon
identities (TrendingUp/Target/CircleCheckBig/CircleX/Percent/
Calendar) on the RAW source; the arm census (chipTone= ×6, exactly —
a seventh site is a parity event, not a growth). UNIT 1952 → 1953
(+1); SUITES stays 109.

## S118-P2 (the e2e freezes — expects INSIDE the existing tests, the census stays 137)
INSIDE the `:27` leads test, after the existing chart-title asserts:
- The six statcard values via the label→card→value ladder: **24 / 9 /
  7 / 4 / 29.2%** exact + **the Avg Cycle SHAPE** `/^\d+ days$/` (the
  average-age day-counter +1s daily — a literal would be the F-118a1
  genus at day scale; the s110 seam already freezes the exact 83 at
  the synthetic anchor).
- The two subValues: **$687,000 (Won) / $226,000 (Dropped)**.

INSIDE the `:6` dashboard test, after the existing "24" assert:
- **Deals Closed $337.0k** exact (static — the 4-won-opp sum).
- **Conversion Rate 29.2%** exact (static — 7/24).
- **Revenue This Month — the in-test month computation** (the
  calendar-rollover precedent): the test computes the expected subset
  sum from the seed contract's four won-opp updatedAt day-offsets
  (−1/−20/−1/−33 → 87k/145k/39k/66k) against `new Date()` — the
  month-roller ($126.0k → $271k from the 21st → $0k next month)
  pinned EXACT at every run date without a mirrored app formula (the
  app derives from the db; the test derives from the seed constants —
  an app-side derivation drift fails the pin).
- **Avg. Sales Cycle — the SHAPE** `/^\d+$/` (the same day-counter
  genus).

## S118-P3 (the count ladder + the docs realignment)
- **UNIT 1952 → 1953** · SUITES 109 unchanged · E2E 137 unchanged ·
  badge 2089 → 2090.
- docs-counts: the UNIT const + the s118 comment + the layer-axis
  block (the s118 head over the s117 second layer).
- dialog-geometry: the CLAUDE lockstep 4-site carry (1953 + the 1952
  negatives).
- README: badge 2090 + the Tested row's s118 clause + the 1953 count.
- AGENTS: the two count sites + the §Session-118 block.
- CLAUDE: the four count sites.
- PAD: the five count sites + the s118 inventory row (before the Total
  row).
- SKILL: v1.114.0 → v1.115.0 (frontmatter + H1) + the project_state
  s118 layer prepended + Appendix B 1953 + §16df appended.
- The 118-b record-only note: the "twitter:×6" lineage corrected to ×5
  where the s118 docs touch it.

## S118-P4 (the captures)
200–203 under docs/screenshots/ (the standing build on PORT 3141 +
the seeded scratch walk db): **200** the leads statcards @1440 (the
six cards + the chips + the subValues) · **201** the dashboard KPI row
@1440 (the six populated values) · **202** the dashboard charts @1440
(the pipeline + revenue charts) · **203** the leads phone face @390
(the stacked statcards + the contained table). Unique md5s; verified
against the e2e-pinned contracts.

## S118-P5 (the ship)
The house-style commit (feat: session-118 …) + the SSH-wrapper push to
`git@github.com:nordeim/neo-crm.git` (main only) + session_254.md (the
session log) + this plan's execution record + the worklog append.

## The TDD ladder (the predictions)
- **RED-1**: the defused accounts test runs GREEN live at the current
  post-14:00 wall clock (the live RED was the baseline gate's 136/137
  failure — the time-bomb reproduced BEFORE the fix, the strongest
  possible RED). The unit RED: the four staged files (docs-counts +
  dialog-geometry + leads-statcard-parity + crm.spec) against the
  still-old docs — the docs-counts family + the CLAUDE lockstep
  carrier — predicted **12–15 failed | 1940–1943 passed** (1953
  total); then the stash-proof (stash → native 1952/1952 GREEN → pop
  → RED restored).
- **GREEN**: the docs realignment → **109/1953**.
- **RED-2** (both faces, by name): Face A — a unit label edit on the
  leads page ("Total Leads" → "Total Leads ") fails the D-118a2 pin
  by name; Face B — an e2e value edit (the "Open Leads" expectation
  9 → 10) fails the D-118a1 battery by name. Restore via git checkout.
- The e2e phase: the single-test first runs (the accounts battery
  GREEN at the post-14:00 clock — the defuse proven; the leads +
  dashboard batteries) then the full suite 137/137.

## The validation checklist (pre-execution)
- [x] The F-118a1/F-118a2 sites verified (crm.spec :76/:89 — the live
      136/137 repro + the 118-a audit's derived confirmation)
- [x] The joiner accounts distinct from the standing three
      (Oasis Healthcare + Emirates Global Trading — db-verified)
- [x] The seed contract 24/9/7/4/29.2%/83 days + $687,000/$226,000 +
      $337.0k/$126.0k — db-verified independently
- [x] "Open Leads" in ZERO unit label-set assertions (grep-verified);
      chipTone= ×6 sites on the leads page (the raw census)
- [x] The :27 leads test + the :6 dashboard test — the insertion
      points after the existing asserts
- [x] The month-roller mechanics (the −1/−20/−1/−33 updatedAt offsets,
      hour 16 — month-membership day-scale only, no hour sensitivity)
- [x] The line-census set does not cover the two edit targets
      (leads-statcard-parity + crm.spec's leads/dashboard/accounts
      tests) — no in-flight re-anchor (the s116/s117 precedent)

## The execution record (2026-10-14, session-118)

- **The intake:** fresh clone at `bb33571` (the s117 ship + session_252/
  253); the environment rebuilt (.env from .env.example + a fresh
  AUTH_SECRET, db push + seed, census MATCH 15/24/10/23/12 + 4 users,
  634 top-level packages, the chromium_headless_shell-1243 repair).
- **The baseline gate:** lint 0/0 · tsc 0 · 109/1952 · build · **e2e
  136/137 — the F-118a1 time-bomb live-reproduced** (the accounts
  battery's Overdue KPI expected "3" received "5" at 23:08 local —
  past both seeded joiner hours; the live RED before any fix).
- **The audits:** 118-a 7/7 shipped claims Verified + F-118a1/F-118a2
  (Critical — the two bombed exact asserts) + F-118a3 (Informational —
  the CSV-filename UTC/local genus) + the full 8-spec time-bomb
  enumeration (the two Critical sites the ONLY bombed exact asserts);
  118-b 9/9 PASS (~76th standing — one record-only note: the
  "twitter:×6" lineage corrected to ×5, the N-108b2 double-count
  genus). Both records appended to the repo worklog.
- **The live verification:** probe:ref the 89th STABLE · the four
  drift gates CLEAN · census MATCH · scandihaven re-cloned at
  `d4789c3` on-pattern.
- **S118-P0 (the defuse):** both landed — the KPI's bounded 3-5 manual
  read + the overdueRows' bounded 3-5 manual count, the D-117a0 idiom
  applied to the s117 battery's own blind spot, the joiner mechanics
  documented in the comments (the `10 + ownerIdx * 2` hour pinning).
- **S118-P1 (D-118a2):** the six-label + adjacency census pin staged
  clean (10/10 in the suite, +1 it) — the ordered label set + the
  per-card icon/chipTone/subValue adjacency + the six-chipTone arm
  census + the two subValue formula pins on the RAW source.
- **S118-P2 (D-118a1):** the batteries INSIDE the existing tests —
  the leads six values + the two subValues + the Avg-Cycle SHAPE; the
  dashboard KPIs + the Revenue-This-Month in-test month computation.
  Two e2e lessons en route: the dashboard KPI value is a SPAN (the
  accounts BarStatCard div idiom doesn't transfer — the
  `span[class*="text-3xl"]` locator); the RED-2 Face B restore via
  `git checkout` wiped the whole crm.spec staging (re-applied +
  re-verified — the restore hazard's sibling, documented).
- **S118-P3 (the count ladder):** UNIT 1952→1953 · SUITES 109 · E2E
  137 · badge 2089→2090 — README (badge + the three count sites + the
  Tested row's s118 clause), AGENTS (2 sites + §Session-118), CLAUDE
  (4 sites), PAD (5 sites + the s118 inventory row), SKILL v1.115.0
  (frontmatter + H1 + the project_state s118 layer + Appendix B +
  §16df). One in-flight fix: the "beneath it" continuation's stray
  `project_state:` prefix — caught by the layer-axis pin exactly as
  designed.
- **S118-P4 (the captures):** 200-203 (the standing build on PORT
  3141, the seeded scratch walk db) — four unique md5s; one retake
  (the 202 framing re-anchored on the Sales Pipeline card's bounding
  box). **The VLM battery 4/4 × 4 CLEAN** — 200 the six statcards
  verbatim + the chip order + contained; 201 the six KPIs verbatim +
  the sidebar + contained; 202 the two chart cards + the 5 bars + the
  Won/Target lines + the FIXED Nov..May labels; 203 the single-column
  stack + 24/9 + contained + the sidebar hidden.
- **The TDD ladder as executed:** the live RED (the baseline 136/137)
  → RED-1 13|1940(1953) stash-proven (the native 49/49 → pop → 13 RED
  restored) → GREEN 109/1953 → RED-2 both faces by name → the three
  batteries clean → **the full suite 137/137 (3.4m, zero flakes)**.
- **The gate (final):** lint 0/0 · tsc 0 · 109/1953 · build standing ·
  137/137 · **src/ ZERO files changed** (the freeze session) · census
  MATCH.
- **The tree:** src/ = ZERO files; the four test files; the five docs
  (README/AGENTS/CLAUDE/PAD/SKILL); the plan; session_254.md; the four
  captures; the worklog.
