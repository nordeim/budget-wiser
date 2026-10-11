# Session-105 Parity Remediation Plan (2026-10-11)

Session 105 on `main` @ `a93eff4` (the s104 ship `a2d4582` + two docs-only
session-log follow-ups `176f613`/`a93eff4` = session_209.md + session_210.md
+ the worklog appends). The workspace was RESET this run — a fresh
`git clone`; the environment rebuilt: `bun install` (533 packages); `cp
.env.example .env` + `AUTH_SECRET` set (the 3-var contract standing:
`DATABASE_URL="file:../db/custom.db"` + `NEXT_PUBLIC_SITE_URL` +
`AUTH_SECRET`); `bun run db:push` + `db:seed` (census MATCH
15/24/10/23/12 + 4 users); `bunx playwright install chromium`
(chromium-headless-shell v1243 — the session-93 fresh-clone gate repair
precedent). All ops under `env -u DATABASE_URL`. The repo `skills/`
folder excluded from checking/testing/compilation throughout.

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 106 files / 1921 tests ALL PASSING (14.8s) ✓ ·
  build ✓ · 133/133 e2e fresh CI=1 (3.1m — the drawer-OPEN guard #133
  green inside the run) ✓ — exactly the s104 ship state.

## The audits

- **105-a (subagent)**: the s104 ship delta (`104f756..a93eff4`, 3
  commits, 19 files, +962/−42, ZERO src/) **GENUINE 10/10** — every
  claim verified hunk-by-hunk (the 6 docs-counts e2e-site pins verbatim
  incl. the WIDENED-guard full-site-form anchors; the drawer-OPEN guard
  assertions; the N-79b1 carrier; the probe ordinals; the F-104a1 fix;
  the 27-site doc realignment; screenshots 158/159 valid 390×844 PNGs;
  SKILL v1.101.0). Non-vacuousness reproduced EXACTLY: the mixed-state
  checkout **17 failed | 19 passed (36)** (the recorded RED-1) + the
  three-file scope **18 | 56** + the full-suite **18 failed | 1903
  passed (1921)** (RED-1 + the N-79b1 carrier) + the RED-2 wrong-bound
  **1 failed** (docScrollW ≤ 389 vs the real 390) → restored → GREEN.
  Findings: NONE real; N-105a1/2/3 record-only (the commit-message PAD
  line-citation treadmill; the 11/11 vs 10/10 phrasing; session_209
  rides the feat commit).
- **105-b (subagent)**: the graduation audit **9/9 PASS — ZERO
  graduations** (~62nd consecutive; `git diff a2d4582..HEAD -- src/`
  EMPTY). The ledger families live **106/1921 ALL PASSING**. The CSV
  census **17 sites ZERO unguarded**. Source-vocabulary byte-identical
  since s90. The config layer verified (vitest isolation · playwright
  e2e.db pin + CI=1 + workers:1 · the 3-var .env.example). The
  SEO/sitemap layer **13/13 LIVE** (sitemap.xml 9 urls 1.0/0.8 weekly ·
  robots.txt exact · manifest.json · /login metadata + all 9 routes'
  per-route titles on the standing build, PORT 3123, server killed
  after). The mobile-nav contract INTACT (the md-breakpoint pin + the
  10-test e2e battery + MOBILE_NAV_E2E=10). The globals.css v4 re-pins
  PRESENT. Findings: NONE; both operator decisions STAND (65th).

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637…` (1,631,071
  bytes) **STABLE — the 76th consecutive**; census #101: demo zero ·
  desktop 256px/8 STANDING · the mobile-nav defect STANDS at TRUE 390
  (the 26th consecutive — the reference's own bug, our drawer the
  superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each — census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live** (trigger ·
  panel · 8 links · focus inside · dual body+main lock ·
  navigate-close → /Leads with the full release · Escape-close ·
  reopen-before-grow · resize-past-md release).
- **The S105 ANALYZE probe** (throwaway, deleted): the SEEDED reports
  surface at TRUE 390×844 — docScrollW **390 exact** · the KPI row ONE
  track (`358px`) × **5 cards** @358px, gap 16px · the pill tab bar TWO
  tracks (`174px 174px`), **5 triggers**, 82px tall (3 rows at
  grid-cols-2) · the sales panel **4 charts @ exactly 300px**, gap
  24px, single track · the REAL tab switch works (Pipeline & Forecast
  active, its panel 4 charts @300, docScrollW stays 390).

## The rotation (105-c)

**THE SEEDED-STATE MOBILE WALK OF THE SECOND SURFACE FAMILY (the
reports analytics tabs at 390 — the s104-close suggested next #2: the
s103 157 capture is desktop-only, the tab charts never walked at phone
width with data, and no e2e pin holds the reports geometry at 390) +
THE TABLET-BAND LOGIN MAIDEN RE-CHECK (the s104-close suggested next
#3 — the class-ceiling semantics applied to the second class, at a
second walked width).** The probe `--expect` mode stays on the backlog
(the reference stable the 76th consecutive session).

- **S105-P0 (the probe ordinals)**: drift-probe.ts header "75" →
  **"76"** + "the 25th" → **"the 26th"** + the drift-probe-tool.test.ts
  header echo (:6) + the it title (:41) — comments/titles only (the
  wiring pin asserts no ordinals — re-verified before the edit).
- **S105-P1 (the count ladder)**: `E2E` 133 → **134** (the new
  reports-mobile guard); `UNIT` stays **1921** (no new unit its);
  `SUITES` stays **106**; `MOBILE_NAV_E2E` stays **10** (the new guard
  lives in a NEW spec file — the mobile-nav battery file untouched);
  badge 2054 → **2055** (= 1921 + 134). The retired **133
  constructions** join the negatives ladders (docs-counts + the N-79b1
  carrier): the badge `tests-2054%20checks` · `# Playwright (133
  checks)` · `# 133 Playwright checks on` · `Browser E2E (133 checks)` ·
  `Playwright E2E (133 checks,` · `**E2E (Playwright, 133 checks)**` ·
  the PAD checklist `` `bun run test:e2e` — 133/133 `` (the
  backtick-command SITE-FORM anchor) · `| 133 browser checks |`. The
  HEAD-line template "in 3 spec" → **"in 4 spec"** (the spec-family
  census: auth, crm, mobile-navigation, reports-mobile).
- **S105-P2 (the reports-tabs e2e guard — the NEW
  tests/e2e/reports-mobile.spec.ts)**: at 390×844 (the SEEDED e2e.db),
  /reports asserts (a) `documentElement.scrollWidth <= 390` (the
  seeded-data overflow contract); (b) the KPI row (the FIRST
  `.grid.grid-cols-1` in main — the PAGE_KPI_GRIDS.reports root,
  empirically the KPI row, proven by the card count) **5 cards · ONE
  grid track · gap 16px**; (c) the pill tab bar **5 triggers · TWO
  grid tracks (grid-cols-2 at 390) · the active tab "Sales
  Overview"**; (d) the sales panel **4 charts at exactly 300px · grid
  gap 24px · single track**; (e) the REAL tab switch at phone width —
  click "Pipeline & Forecast" → the active tab moves, its panel
  renders **4 charts @300**, docScrollW stays ≤ 390. Non-vacuousness
  by the wrong-bound perturbation: the docScrollW assertion temporarily
  `<= 389` → the test FAILS live (the real scrollW is exactly 390) →
  restored → GREEN. E2e census 133 → **134** (setup 1 + auth 11 + crm
  111 + mobile 10 + reports-mobile 1).
- **S105-P3 (the seeded-state mobile captures + the VLM battery)**: the
  throwaway capture script (the s104 pattern — repo-internal for module
  resolution, deleted after use) captures **160** (the SEEDED reports
  SALES tab at 390×844 — the KPI ladder + the 2-col pill tab bar + the
  first charts) + **161** (the SEEDED reports PIPELINE tab at 390×844 —
  the switched tab, the forecast family). The VLM battery per the house
  protocol, 4 checks per capture: structure · content · layout-fit ·
  render quality — with the seeded-value read on 160 (the KPI values
  readable at phone width) and the tab-swap + panel-geometry read on
  161.
- **S105-P4 (the tablet-band login maiden re-check)**: `bun run sweep
  -- --width 834 --height 1112 --fail-on-drift` — the second walked
  tablet width (the iPad Pro 10.5 portrait; the maiden walked
  768×1024 at s97), judged by the tablet class table (768 ≤ 834 <
  1024): login allowed 0.5 + 0.5 = 1.0 (the 768 maiden measured 0.44 —
  the constant-absolute logo genus ~2,500px; the LARGER frame shrinks
  the share, the s103 denominator arithmetic); settings 5.5 + 0.5 =
  6.0; the floor family holding. A ONE-OFF re-check, NOT a fifth
  standing sweep; `gate:full` unchanged.
- **S105-P5 (the docs)**: session_211.md (the session-105 formal log) +
  this plan's execution record + the worklog append + README (the badge
  2055 + the Tested row's s105 clause) + AGENTS (the §Session-105
  history block) + CLAUDE (the pyramid listing gains reports-mobile) +
  PAD (the s105 inventory row + the Total/HEAD/checklist/commands at
  134 + the tree's "4 spec files") + SKILL v1.102.0 (§16cs +
  project_state + the H1).

## The RED plan (TDD)

- **RED-1 (the count ladder)**: the docs-counts constants re-anchored
  FIRST (`E2E` 134 + the HEAD template "in 4 spec") + the new 133
  negatives in the e2e stale-forms ladder + the N-79b1 carrier
  re-anchored (133 → 134, the retired form joining its negatives) → run
  the two suites against the still-old docs → **expected 10 failed**
  (the 9 docs-counts e2e-reading pins: the README badge · the README
  Tested row · the PAD Total · the PAD HEAD · the AGENTS e2e sites ·
  the CLAUDE e2e sites · the README e2e sites · the PAD e2e sites · the
  e2e stale-forms [the new 133 negatives trip on the docs' live-tense
  133 forms] + the 1 carrier in login-family-parity), enumerated by
  name. The unit-count pins stay green (UNIT unchanged); the
  dialog-geometry CLAUDE lockstep stays green.
- **Non-vacuousness (stash-proven)**: stash the two test files → the
  pre-fix state → all green → pop → the RED re-confirmed. Then the
  GREEN realignment → all green.
- **RED-2 (the e2e guard's non-vacuousness)**: the wrong-bound
  perturbation — the docScrollW assertion temporarily `<= 389` → the
  targeted run FAILS live (the real scrollW is exactly 390) → restored
  → GREEN.

## Blast radius (pre-checked)

- tests/docs-counts.test.ts (the constants + the HEAD template + the
  widened negatives + the ladder comment), tests/login-family-parity.
  test.ts (the N-79b1 carrier), scripts/drift-probe.ts +
  tests/drift-probe-tool.test.ts (the ordinals — comments/titles only),
  tests/e2e/reports-mobile.spec.ts (NEW — 1 test), the docs family
  (README · AGENTS · CLAUDE · PAD · SKILL v1.102.0 · session_211.md NEW
  · this plan's execution record · the worklog · screenshots 160/161
  NEW).
- ZERO src/ changes — a tooling + tests + docs session (the s104
  pattern; the parity surfaces stand; the seed untouched).
- The vitest config untouched; the playwright config untouched (the
  testDir glob picks up the new spec); the gate:full chain unchanged
  (the 834 maiden is a one-off re-check, NOT a fifth sweep; probe:ref
  stays outside the offline gate).
- The e2e static census 133 → 134 (the new guard); the live e2e run
  verifies it.
- The gate re-run decides everything else (the one-gate discipline).

## The execution record (2026-10-11, session-105)

Executed RED-first, with ONE in-flight discovery (F-105a1 — below):

- **RED-1 (the count ladder)**: the docs-counts constants re-anchored
  first (E2E 134 + the HEAD template "in 4 spec") + the new 133
  negatives in the e2e stale-forms ladder + the N-79b1 carrier
  re-anchored (133 → 134, the retired form joining its negatives) →
  **10 failed | 45 passed (55)** at the pre-realignment docs — the 9
  docs-counts e2e-reading pins (the README badge · the README Tested
  row · the PAD Total · the PAD HEAD · the AGENTS e2e sites · the
  CLAUDE e2e sites · the README e2e sites · the PAD e2e sites · the
  e2e stale-forms [the new 133 negatives tripping on the docs'
  live-tense 133 forms]) + the 1 carrier (login-family-parity), the
  failures enumerated by name; the unit-count pins and the
  dialog-geometry CLAUDE lockstep stayed green (UNIT unchanged).
  **The plan's expected 10 EXACT.**
- **Non-vacuousness (stash-proven)**: the two test files stashed →
  **55/55** (the s104-ship state) → pop → **10 RED** re-confirmed →
  the GREEN realignment → green.
- **GREEN (the realignment)**: the doc-site edits (README badge 2055 +
  tree + commands + Tested row; AGENTS commands table + gate-order;
  CLAUDE gate-order + commands + pyramid + the listing gaining
  reports-mobile; PAD tree "4 spec files" + Total + HEAD "in 4 spec"
  + checklist + commands + the census-table row).
- **THE F-105a1 IN-FLIGHT DISCOVERY** (found during the GREEN
  realignment, before any history row was written): the F-99a1 genus
  recurring on the mobile-nav suite-count axis — the s104
  realignment updated the README/PAD-suite phrases (README:55/:997 +
  PAD:207) but TWO more sites the pin never covered still read the
  stale 9-check: CLAUDE's pyramid listing + the PAD census-table row.
  Both fixed (10-check) + the mobile-nav suite-count pin's scope
  WIDENED to all five sites + the retired 9-check SITE-FORM negatives
  (the WIDENED-guard doctrine — a session-history row quoting the
  forms cannot match them; the pin sanity run after the docs phase
  re-proven 17/17 green).
- **GREEN (S105-P0)**: the probe ordinals 75/25th → 76/26th
  (drift-probe.ts header + the test echo + the it title).
- **S105-P2 (the reports-tabs guard)**: the NEW reports-mobile.spec.ts
  → **2 passed (the setup + the guard) on the standing build**
  (green-by-design, as planned) → **RED-2**: the wrong-bound
  perturbation (docScrollW ≤ 389 temporarily) → the targeted run
  **1 failed** ("Expected: <= 389, Received: 390" — the probe genuinely
  reads the layout) → restored → GREEN (2 passed).
- **The full unit suite: 106 files / 1921 tests ALL PASSING** (+0 net
  — the widened asserts joined the existing mobile-nav it).
- **S105-P3 (the captures + the VLM battery)**: the throwaway capture
  script; the FIRST-viewport capture caught the tab bar below the fold
  (the 5 stacked KPI cards are tall at phone width) — the captures
  REDESIGNED in-flight to scroll the TABLIST into view. Screenshots
  **160** (the reports SALES tab at 390×844) + **161** (the PIPELINE
  tab) — **VLM 4/4 + 4/4, zero adjudications**: the VLM read the 2×3
  tab grid ("5 tabs arranged in a 2x3 grid, 2 columns, 3 rows, last
  cell empty"), all 5 tab names verbatim, "Sales Overview" active, the
  Revenue chart y-axis, then the SWITCHED state ("Pipeline & Forecast"
  active, the "Forecasting Accuracy" card with its two-series 0-300,000
  chart); the first-viewport capture had read the seeded reports KPI
  values (Total Leads 18 / Open Leads 6 — the quarter-filtered reports
  derivations) off the phone pixels. The throwaway scripts (the
  ANALYZE probe + the capture script) deleted after use.
- **S105-P4 (the 834×1112 tablet maiden)**: **CLEAN** — the drift gate
  clean at margin 0.5pct over the standing baselines; the standing
  explained line pre-printed the tablet genera (accounts ~0.7% the s95
  overflow genus · settings ~5.2% picklist-data · login ~0.44% logo
  genus); the seed restored (census MATCH).
- **S105-P5 (the docs)**: session_211.md + this record + the AGENTS
  §Session-105 history block + the PAD s105 inventory row + the README
  Tested row's s105 clause + SKILL v1.102.0 (§16cs + project_state +
  the H1) + the worklog append.
- **GATE**: lint 0/0 · tsc 0 · 1921/1921 unit · build · **134/134 e2e**
  fresh CI=1 (+1: the reports-tabs guard) + the four drift sweeps
  CLEAN inside gate:full. The closing census MATCH; `.env.example`
  3 active vars standing.
