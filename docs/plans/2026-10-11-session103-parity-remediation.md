# Session-103 Parity Remediation Plan (2026-10-11)

Session 103 on `main` @ `f9d9086` (the s102 ship `590079b` + the docs-only
follow-ups `4118382` [the repo worklog 102-close append] + `f9d9086`
[session_206.md +96 — the s102 transcript — + the worklog append +15]). The
workspace was NOT reset this run — `git pull` fast-forwarded `4118382..f9d9086`;
the s102 environment stood (`.env` verified: `DATABASE_URL="file:../db/custom.db"`
+ `NEXT_PUBLIC_SITE_URL` + `AUTH_SECRET` — the 3-var contract; census MATCH
15/24/10/23/12 + 4 users). All ops under `env -u DATABASE_URL`. The repo
`skills/` folder excluded from checking/testing/compilation throughout.

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 105 files / 1903 tests ALL PASSING (14.0s) ✓ — exactly
  the s102 ship state.

## The audits

- **103-a (subagent)**: the s102 ship delta (`590079b..f9d9086`, 2 files,
  +111, ZERO src/) GENUINE — docs-only confirmed (session_206.md +96 + the
  worklog append +15; `git diff 590079b..f9d9086 -- src/ tests/ scripts/
  package.json` EMPTY); session_206.md cross-checked hunk-by-hunk against
  session_205.md + the s102 plan execution record — every count/hash/test
  number consistent; the worklog append matches the house template. The ship
  commit 590079b contents verified (a–e): docs-counts EXACTLY 11 its
  (enumerated), the lockstep anchored at 1903, all count sites live
  (README:8/:125/:178/:55 · AGENTS:20/:29 · CLAUDE ×4 · PAD:358/:783/:796/
  :1218/:1288), the probe ordinals 73/23rd, screenshots 154/155 valid PNGs
  (414×896 + 390×844). Non-vacuousness re-proven: the a0e52ca checkout of the
  four doc files → **12 failed | 18 passed (30)** (all 11 docs-counts + 1
  lockstep, enumerated by name) → restored → **30/30**, tree clean. Live unit
  105/1903; e2e static census 132. **Findings**:
  **F-103a1 REAL (docs, Low)** — the F-102a1 "76/76" at-birth error survives
  uncorrected at **PAD:781** (the s101 per-session inventory row — "stash-proven:
  stash the four source files → 13 failed → pop → **76/76**]"), a **7th site
  missed by both the 102-a enumeration and the S102-P0 correction** (the
  a0e52ca..590079b diff proves the row was never touched); the AGENTS:4043
  doctrine ("at-birth ERROR corrections — a record corrected to match what
  actually happened") sanctions the fix; not pinnable (an event record, not a
  count site) — audit-caught · **N-103a1** — the docs-counts it-name line
  citations self-drifted +1 (the s102 PAD inventory-row insertion shifted the
  Total to :783, HEAD to :796, checklist to :1218, commands to :1288; the
  it-names still cite :782/:795/:1217/:1287) — optional re-anchor at the next
  suite touch · **N-103a2** — session_206.md:59 "floor 0.45–0.55" vs
  session_205.md:124 "floor 0.45–0.49 (accounts 0.55)" (transcript paraphrase
  conflation, record-only) · N-103a3 (.next/standalone stale doc copies —
  gitignored build artifacts, no action).
- **103-b (subagent)**: the graduation audit **13/13 GENUINE — ZERO
  graduations** (~60th consecutive; `git diff 590079b..HEAD -- src/` EMPTY).
  The ledger families **402/402** across 14 files. The CSV census **17 sites
  ZERO unguarded** (26/26 convention trio + 70/70 superset live); the
  source-vocabulary clean (constants.ts @ 3a89508 since s90); the config layer
  verified (vitest isolation · playwright e2e.db pin + CI=1 + workers:1 · the
  3-var .env.example · probe:ref outside gate/gate:full); the SEO/sitemap
  layer **57/57 live** + the implementation review zero gaps; the mobile-nav
  contract INTACT; the globals.css v4 re-pins PRESENT (143 hex occurrences,
  zero var() chains, no tailwind.config.js). **Both operator decisions
  re-affirmed (63rd): CSV posture (b) + source-vocabulary parity.** Findings:
  N-103b1 (the carried vitest isolate-hint tooling note) · N-103b2 (the
  "70 literal hex values" phrasing in the 102-b record is a counting-method
  artifact — 143 full-block occurrences at HEAD; record-only).

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e0d965676dc11`
  (1,631,071 bytes) **STABLE — the 74th consecutive**; census #99: demo data
  ZERO · desktop 256px/8 STANDING · **the mobile-nav defect STANDS at TRUE 390
  (the 24th consecutive; the reference's own bug, our drawer the superset)**.
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 · tablet
  768 · landscape 1024, each --fail-on-drift; the seed restored after each —
  census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live** (trigger · panel ·
  8 links · focus inside · dual body+main lock · navigate-close → /Leads with
  the full release · Escape-close · reopen-before-grow · resize-past-md
  release).

## The operator decisions (63rd re-affirmation)

Both STAND, evidence re-verified live by 103-b: **CSV posture (b)**
(guardFormulaPrefix + qq; the 17-site census, ZERO unguarded) and
**source-vocabulary parity** (raw storage, no vocabulary introduced since s90).

## The rotation (103-c)

**THE SEEDED-STATE CHART-GEOMETRY FREEZE PINS (the s98 suggested next #3,
twice deferred — the chart inputs the zero-data sweep cannot see) + THE
F-103a1 SEVENTH-SITE FIX + THE 320×568 PHONE-FLOOR MAIDEN SPOT-CHECK (the
class-band floor, the fourth walked phone width) + THE PROBE ORDINAL REFRESH
(73→74 / 23rd→24th).** The s102-close suggested next #1 (the seeded-state
chart walk) is the headline: the drift sweep runs the ZERO-DATA state by
design (the reference's demo data has been zero since the s3 wipe), so our
SEEDED chart surfaces — the pipeline bars, the funnel split, the won/lost
months, the revenue areas, the aging bands, the by-source distribution, the
KPI ladder — have NEVER been under the unit gate as a *frozen seed
derivation*. The census pins the seed's row COUNTS (15/24/10/23/12) and the
e2e pins one era anchor ("4 $337.0K"), but nothing freezes the seed's
chart-relevant AGGREGATES: if a seed edit reshaped a value distribution, every
chart would silently reshape with it and no test would fail. The probe
`--expect` mode (suggested next #2) stays on the backlog — the reference has
been stable for 74 consecutive sessions; the re-anchor tooling has no live
consumer yet.

- **S103-P0 (F-103a1)**: PAD:781 "76/76" → **"75/75"** (the 7th F-102a1
  site — the s101 inventory row's at-birth error, corrected per the
  AGENTS:4043 at-birth-error doctrine; the 1017a5b commit message stays
  immutable, record-only).
- **S103-P1 (the headline — the NEW `tests/seeded-charts.test.ts`, 11 its)**:
  the suite reads `prisma/seed.ts` SOURCE (the opportunity-model/docs-counts
  precedent — no DB access under the unit gate), parses the `leadSeed` +
  `oppSeed` + `LEAD_SOURCE_MAP` literals, and freezes the seed→derivation→
  chart-input chain through the REAL imported functions:
  (1) the leads stage census — new=4 · contacted=2 · qualified=3 ·
  negotiation=2 · proposal=2 · won=7 · lost=4 (total 24 = the census
  contract); (2) the leads value totals — the won sum **687_000** (the
  `$687,000` full-form leads anchor) + the total 2_086_000; (3) the lead
  source distribution POST-`LEAD_SOURCE_MAP` — referral=6 · partner=6 ·
  call=5 · email=4 · website=3 (the dashboard by-source chart's raw input);
  (4) the opps stage census — closed_won=4 · closed_lost=2 · prospecting=2 ·
  qualification=1 · proposal=1 · negotiation=2 (total 12); (5) the opps
  amount totals — won **337_000** (the `$337.0K` era anchor) · lost 92_000 ·
  open pipeline 525_000; (6) `pipelineStageCounts` on the PARSED seed — the
  8-slug funnel split (4/2/3 + 2/1/1/2/4); (7) `revenueByMonth` on the parsed
  won opps — the **337_000 total invariant** (month keys shift with the
  calendar; the total never does); (8) `wonLostByMonth` on the parsed closed
  opps — won=4 / lost=2 totals; (9) `forecastAccuracySeries` — actual
  **337_000** / forecasted **316_250** totals (87k×.90 + 145k×.85 + 39k×.80 +
  66k×.75 + 64k×.40 + 28k×.30); (10) `agingCounts` at a synthetic seed-time
  now — the **[6,3,3,0]** band spread (ages 45/60/38/55/70/80/5/3/8/21/16/12
  → <30: 6 · 30-60: 3 · 60-90: 3 · >90: 0); (11) the dashboard KPI members on
  the parsed seed — totalLeads=24 + conversionRate **"29.2"** (7/24, the
  route's toFixed(1) formula mirrored).
- **S103-P2 (the count ladder + the N-103a1 re-anchors)**: the docs-counts
  constants re-anchor (UNIT 1903 → **1914**, SUITES 105 → **106**, badge
  2035 → **2046**) + the suite-list pin gains `seeded-charts` + the it-name
  line-citation re-anchors (:795 → :796, :1217 → :1218, :1287 → :1288 —
  N-103a1) + the CLAUDE-count lockstep re-anchor (1903 → 1914) + the GREEN
  doc realignment: README:8/:55/:125/:178 (badge 2046 · tree "106 Vitest
  suites (1914 checks)" · commands "1914 Vitest unit checks" + the suite list
  carrying drift-probe-tool, docs-counts AND seeded-charts · the Tested row)
  · AGENTS:20/:29 · CLAUDE ×4 (:38/:114/:125/:371) · PAD:358/:783/:796/:1218/
  :1288. **Expected RED: 12 failed** (11 docs-counts + 1 lockstep) at the
  pre-realignment docs — the standing ladder RED.
- **S103-P3 (the probe ordinals)**: drift-probe.ts header "73 consecutive
  sessions" → **"74"** (:10) + "the 23rd consecutive census" → **"the 24th"**
  (:17) + the drift-probe-tool.test.ts echo (:7) + the it title (:41) —
  comments/titles only (the wiring pin asserts no ordinals, verified at s102
  and re-verified before the edit).
- **S103-P4 (the 320×568 PHONE-FLOOR MAIDEN SPOT-CHECK)**: `bun run sweep --
  --width 320 --height 568 --fail-on-drift` — the class-band floor (the
  fourth walked phone width: 390 → 375 → 414 → 320; the `<768 → phone`
  banding already covers it; the s96/s101/s102 prediction: the standing
  genera hold — floor ~0.5 · settings the picklist genus near its phone-band
  ceiling · login ~0.7). A one-off maiden, NOT a fifth sweep — gate:full
  unchanged.
- **S103-P5 (the seeded-state visual walk + the screenshots)**: the drift
  sweep only ever sees the zero-data state — this phase walks the SEEDED
  surfaces against the reference's own data-bearing era screenshot
  (`docs/neo-crm-dashboard.png`, 1904×1077): (a) capture our SEEDED dashboard
  at 1904×1077 (the era-comparable viewport); (b) the VLM battery per the
  house protocol — 4 checks per capture + the era comparison (the KPI ladder,
  the pipeline bars, the won/target areas, the O-map legend, the recent-deals
  table); (c) screenshot 156 (the seeded dashboard, era-compared) + 157 (the
  seeded reports analytics view — the funnel + won/lost the zero-data sweep
  cannot see). The throwaway capture script deleted after use.
- **S103-P6 (the docs)**: session_207.md (the session-103 formal log) + this
  plan's execution record + the worklog append + the narrative realignment
  (README badge 2046 + the Tested row's s103 clause; AGENTS the §Session-103
  history block; PAD the s103 inventory row + the Total 106/1914; SKILL
  v1.100.0 §16cq + project_state + the H1).

## The RED plan (TDD)

- **RED-1 (the count ladder)**: re-anchor the docs-counts constants + the
  lockstep FIRST → run the two suites against the still-old docs → **12
  failed** (11 docs-counts + 1 dialog-geometry lockstep), the failures
  enumerated by name (the standing s102 pattern).
- **RED-2 (the freeze pins' non-vacuousness — the induced-drift proof)**:
  the seeded-charts pins assert the CURRENT seed (freeze pins — there is no
  pre-fix state to check out), so non-vacuousness is proven by INDUCED DRIFT:
  temporarily perturb `prisma/seed.ts` (one won opp amount 87_000 → 88_000)
  → the seeded-charts pins fail BY NAME (the 337_000 anchors + the
  revenueByMonth + forecastAccuracySeries chain + the amount totals) →
  `git checkout -- prisma/seed.ts` → green again. The proof demonstrates the
  pins genuinely READ the seed and fail on value drift — the exact hazard the
  suite exists to catch (a row-count change already fails the census; a
  VALUE-distribution change now fails this suite).
- **GREEN**: the doc realignment + the F-103a1 fix + the probe ordinals → the
  full unit suite **106 files / 1914 tests ALL PASSING** (+11 net).

## Blast radius (pre-checked)

- tests/seeded-charts.test.ts (NEW, 11 its), tests/docs-counts.test.ts (the
  constants + the suite-list pin + the it-name re-anchors — no new its),
  tests/dialog-geometry-parity.test.ts (the lockstep re-anchor), 
  scripts/drift-probe.ts (header comments only), tests/drift-probe-tool.test.ts
  (the header comment + it title only), the docs family (README:8/:55/:125/
  :178 · AGENTS:20/:29 + the §Session-103 block · CLAUDE ×4 · PAD:358/:781
  [the F-103a1 fix] /:783/:796/:1218/:1288 + the s103 inventory row · SKILL
  v1.100.0 · session_207.md NEW · this plan's execution record · the worklog
  · screenshots 156/157).
- ZERO src/ changes — a tooling + docs session (the parity surfaces stand;
  the seed file itself is UNTOUCHED — the RED-2 perturbation is temporary and
  restored).
- The e2e tree untouched (132 standing); the vitest config untouched
  (tests/**/*.test.ts picks up the new suite).
- The gate:full chain unchanged (probe:ref stays outside the offline gate;
  the 320 maiden is a one-off, NOT a fifth sweep).
- The gate re-run decides everything else (the one-gate discipline).

## The execution record (2026-10-11, session-103)

Executed RED-first, with ONE mid-flight amendment (the maiden trip —
see RED-3):

- **RED-1 (the count ladder)**: the docs-counts constants + the
  CLAUDE-count lockstep re-anchored first → **11 failed | 19 passed
  (30)** at the pre-realignment docs — 10 docs-counts + 1 lockstep,
  the failures enumerated by name. (The plan predicted 12; the
  stale-form negatives pin PASSES at the s102-state docs — they carry
  the old counts, not the banned retired forms — the TRUE RED
  transcribed live, never re-derived: the F-102a1 lesson applied
  in-flight.)
- **S103-P1 (the headline)**: the NEW tests/seeded-charts.test.ts (11
  its) written with the validator-computed expectations (the plan's
  numbers empirically confirmed against prisma/seed.ts source before
  writing: leads 7/4/2/2/3/2/4 · won 687,000 · opps 4/2/2/1/1/2 ·
  337,000/92,000/525,000 · funnel 4/2/3+2/1/1/2/4 · forecast
  337,000/316,250 · aging [6,3,3,0] · "29.2") — **11/11 at HEAD** (one
  in-flight fix: the aging pin's first construction carried the seed's
  09:00 hour, pushing the exactly-60-day offset to 59.625 and the
  lower band — the construction re-anchored MIDNIGHT-ALIGNED so the
  offsets read as the exact integer design ages, the boundary nuance
  documented in the it).
- **RED-2 (the induced-drift proof)**: prisma/seed.ts perturbed
  (87_000 → 88_000 on one won opp) → **3 failed BY NAME** (the opps
  amount totals · revenueByMonth · forecastAccuracySeries — exactly
  the pins carrying the affected aggregates; the 8 unaffected pins
  green) → restored → **11/11**. The pins genuinely read the seed and
  fail on VALUE drift — the hazard the suite exists to catch.
- **GREEN (S103-P0)**: PAD:781 "76/76" → "75/75" (the 7th F-102a1
  site, the at-birth-error doctrine honored).
- **GREEN (S103-P2, first realign)**: the count realignment to 106
  suites / 1914 unit / badge 2046 across README:8/:55/:125/:178 (+ the
  suite list gaining seeded-charts) · AGENTS:20/:29 · CLAUDE ×4 ·
  PAD:358/:783/:796/:1218/:1288 + the N-103a1 it-name re-anchors
  (:783/:796/:1218/:1288).
- **GREEN (S103-P3)**: the probe ordinals 73/23rd → 74/24th (the
  drift-probe.ts header + the drift-probe-tool.test.ts echo + the it
  title; the wiring pin asserts no ordinals — re-verified before the
  edit; one sed near-miss caught: the first replacement pattern missed
  the "s" in "rides). 73" — the assert-guarded python retry landed
  it).
- **S103-P4 (THE MAIDEN TRIPPED — the first maiden ever to)**: the
  320×568 phone-floor spot-check ran → **DRIFT: login 1.39% > baseline
  0.8 + margin 0.5 (allowed 1.30%)** — the other nine pages HELD
  (0.92–0.97% vs the 0.75/0.8-family baselines; settings 5.91 well
  inside 7.7). The diagnosis chain: (a) the --clusters decode —
  **92.6% of the login diff in ONE bucket [x 120..199, y 64..111]
  2341px** (the logo block, top-center); (b) the VLM comparison of the
  cropped region — the reference's complex 3D "NEC-CRM" hotlinked
  screenshot vs our CSS brand-mark circle (the documented s7/s96
  genus: the reference HOTLINKS a screenshot asset; ours draws the
  white-circle/blue-dot shape); (c) the denominator arithmetic — the
  genus is **constant-ABSOLUTE** (~2,470px at 390, ~2,527px at 320;
  the mobile-nav floor genus likewise ~1,650px constant-absolute but
  with headroom), so its SHARE scales inversely with the frame: 0.75%
  at 390×844 (329,160px) · 0.82% at 375×812 · 0.67% at 414×896 ·
  **1.39% at the 320×568 floor (181,760px — the frame 45% smaller, the
  genus unchanged)**. The resolution (the s97/s99 maiden doctrine —
  the class entry rides the class's measured ceiling):
  `STANDING_BASELINES.phone.login` 0.8 → **1.4** with the
  floor-arithmetic comment (the share-based cost documented: the 390
  ceiling loosens to ~1.9 — a real login regression stacks pixels ON
  TOP of the constant genus and still trips).
- **RED-3 (the maiden pin, RED-first)**: the NEW sweep-tool it written
  FIRST ("the phone login entry rides the CLASS CEILING — the 320×568
  floor walk": `standingBaseline(320).login >= 1.39` + the
  one-table-for-the-class assertions [320 === 390 === 375]) → **1
  failed | 46 passed (47)** at the 0.8 table → the entry raised →
  **47/47** + the maiden re-run **CLEAN**.
- **THE MID-FLIGHT AMENDMENT (the count ladder)**: RED-3's pin made
  the planned 1914 a never-shipped in-flight intermediate — the final
  counts **106 suites · 1915 unit · badge 2047**; the docs-counts
  constants + the lockstep + all the doc sites re-realigned (the
  ladder comment documents the intermediate; no 1914 ban needed — it
  never shipped, and the positive pins fail any live site carrying
  it).
- **The full unit suite: 106 files / 1915 tests ALL PASSING** (+12
  net).
- **The LIVE verification (S103-P4 continued + the standing layers)**:
  the four standing drift gates CLEAN (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024 — each re-run inside the plan's
  verification pass); the 320 maiden re-run CLEAN post-fix; the drawer
  battery at TRUE 390 FULLY GREEN; probe:ref all standing layers
  reproduced (bundle STABLE the 74th · census #99 demo zero · desktop
  256/8 · the mobile-nav defect STANDS the 24th).
- **S103-P5**: screenshots 156 (the seeded dashboard at 1904×1077 —
  the reference era screenshot's EXACT viewport) + 157 (the seeded
  reports analytics view) — **VLM 4/4 + 4/4, zero adjudications**; the
  era comparison confirms the exact layout-family parity with our seed
  populating what the reference renders empty (the VLM independently
  read "24 leads · $337.0k · 29.2%" — the freeze pins' values visible
  in the capture); the throwaway capture script deleted.
- **S103-P6**: the docs — session_207.md + this record + the worklog
  append + the narrative realignment (README badge 2047 + the Tested
  row's s103 clause; AGENTS the §Session-103 history block; PAD the
  s103 inventory row + the Total 106/1915; SKILL v1.100.0 §16cq +
  project_state + the H1).
- **GATE**: lint 0/0 · tsc 0 · unit (106 suites, +12 net → 1915) ·
  build clean · e2e fresh CI=1 (132/132) + the four drift sweeps
  CLEAN inside gate:full. The closing census MATCH; `.env.example`
  3 vars standing.
