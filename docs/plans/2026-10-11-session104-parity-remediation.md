# Session-104 Parity Remediation Plan (2026-10-11)

Session 104 on `main` @ `104f756` (the s103 ship `c20e28b` + two docs-only
session-log follow-ups `23e6d3a`/`104f756` = session_207.md + session_208.md
+ the worklog append). The workspace was NOT reset this run — `git pull`
fast-forwarded `23e6d3a..104f756`; the s103 environment stood (`.env`
verified: `DATABASE_URL="file:../db/custom.db"` + `NEXT_PUBLIC_SITE_URL` +
`AUTH_SECRET` — the 3-var contract; census MATCH 15/24/10/23/12 + 4 users).
All ops under `env -u DATABASE_URL`. The repo `skills/` folder excluded from
checking/testing/compilation throughout.

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 106 files / 1915 tests ALL PASSING (15.0s) ✓ — exactly
  the s103 ship state.

## The audits

- **104-a (subagent)**: the s103 ship delta (`f9d9086..104f756`, 3 commits,
  18 files, +1092/−38) **GENUINE 12/12** — every claim verified against the
  diff (the seeded-charts 11 its reading prisma/seed.ts source with no DB
  access; the sweep maiden fix phone.login=1.4 + the floor pin; the
  docs-counts re-anchor + the site-form it-names; the lockstep at 1915; the
  probe ordinals 74/24th; the docs family at badge 2047; screenshots 156/157
  valid PNGs at 1904×1077). Non-vacuousness re-proven TWICE: the mixed-state
  checkout **12 failed | 75 passed (87)** (the recorded RED-1 11 + RED-3 1,
  both reproduced) + the induced-drift reproduction **3 failed | 8 passed
  (11)** → restored → 98/98, tree clean. Live unit 106/1915; e2e static
  census 132. **Findings**: **F-104a1 REAL (docs, Low)** — session_207.md:41
  + the s103 plan:32 record the 103-a live census as "Live unit 105/1892";
  the tests half is stale by one session (the true s103-baseline count is
  **105/1903** — session_207.md:25's own baseline line; 1892 is the s101
  count carried from the 102-a template) — fixable per the AGENTS:4043
  at-birth-error doctrine, not pinnable (event records) · N-104a1 (the
  s103 plan's phase-time PAD line cites — record-only) · N-104a2 (the
  commit-message ":1287→:1287+1" rendering — immutable, record-only).
- **104-b (subagent)**: the graduation audit **13/13 GENUINE — ZERO
  graduations** (~61st consecutive; `git diff c20e28b..HEAD -- src/`
  EMPTY). The ledger families **402/402** across 14 files. The CSV census
  **17 sites ZERO unguarded**. The source-vocabulary clean (constants.ts @
  3a89508 since s90). The config layer verified (vitest isolation ·
  playwright e2e.db pin + CI=1 + workers:1 · the 3-var .env.example ·
  probe:ref outside gate/gate:full). The SEO/sitemap layer **39/39 live +
  18 static wirings** (the 57-check layer). The mobile-nav contract INTACT
  (the md-breakpoint pin + the e2e battery). The globals.css v4 re-pins
  PRESENT (143 hex, zero var() chains, no tailwind.config.js). Findings:
  N-104b1/N-104b2 (record-only).

## The operator decisions (64th re-affirmation)

Both STAND, evidence re-verified live by 104-b: **CSV posture (b)**
(guardFormulaPrefix + qq; the 17-site census, ZERO unguarded) and
**source-vocabulary parity** (raw storage, no vocabulary introduced since s90).

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e0d965676dc11`
  (1,631,071 bytes) **STABLE — the 75th consecutive**; census #100: demo data
  ZERO · desktop 256px/8 STANDING · **the mobile-nav defect STANDS at TRUE 390
  (the 25th consecutive; the reference's own bug, our drawer the superset)**.
  The probe header ordinals (74/24th) are now stale by this run — the
  standing rotation candidate.
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 · tablet
  768 · landscape 1024, each --fail-on-drift; the seed restored after each —
  census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live** (trigger · panel ·
  8 links · focus inside · dual body+main lock · navigate-close → /Leads with
  the full release · Escape-close · reopen-before-grow · resize-past-md
  release).
- **The S104 ANALYZE probe** (throwaway, deleted): the drawer-OPEN geometry
  on the SEEDED dashboard at 390×844 — docScrollW 390 · bodyOverflow hidden ·
  panel clientW 288 === scrollW 288 (zero internal overflow) · rectW 288
  (w-72; max-w 331.5px = 85vw inactive at 390) · 8 links; the seeded KPI
  text readable at phone width ("Total Leads 24 +5.3% · Deals Closed
  $337.0k · Revenue This Month $126.0k · Conversion Rate 29.2% · Avg. Sales
  Cycle 82 days").

## The rotation (104-c)

**THE E2E-COUNT LOCKSTEP EXTENSION (the F-99a1/F-102a2 stale-count genus on
the E2E axis — this session changes the e2e count for the first time since
s102 built the lockstep, and TEN live-tense e2e sites are unpinned) + THE
SEEDED-STATE MOBILE WALK AT 390 (the s103-close suggested next #2 — the
156/157 captures are desktop-only, and the drawer-OPEN 390px contract is
unpinned: the ten-route overflow sweep runs drawer-CLOSED by its own
documented design) + THE 375×812 LOGIN MAIDEN RE-CHECK UNDER THE 1.4 CEILING
(the s103-close suggested next #3).** The probe `--expect` mode stays on the
backlog (the reference stable for the 75th consecutive session; the
re-anchor tooling has no live consumer).

- **S104-P0 (F-104a1)**: session_207.md:41 + the s103 plan:32 "Live unit
  105/1892" → **"105/1903"** (the at-birth-error doctrine; the 103-a audit's
  live census re-transcribed to the true s103-baseline count).
- **S104-P1 (the e2e-count lockstep — the NEW docs-counts its, 6)**: every
  unpinned live-tense e2e-count site under the unit gate:
  (1) the AGENTS e2e sites — the commands table `Browser E2E (133 checks)`
  + the gate-order e2e half "`bun run test:e2e` (133)";
  (2) the CLAUDE e2e sites — the commands table `Playwright E2E (133
  checks, needs build first)` + the gate-order e2e half + the pyramid line
  `**E2E (Playwright, 133 checks)**`;
  (3) the README e2e sites — the file tree `# Playwright (133 checks)` +
  the commands comment `# 133 Playwright checks on :3100`;
  (4) the PAD e2e sites — the file tree `+ setup project — 133 checks` +
  the checklist `` `bun run test:e2e` — 133/133 `` + the commands table
  `| 133 browser checks (build first) |`;
  (5) the scoped e2e stale-form negatives — the retired site forms
  (`Browser E2E (132 checks)` · `Playwright E2E (132 checks` · `**E2E
  (Playwright, 132 checks)**` · `# Playwright (132 checks)` · `# 132
  Playwright checks on` · the PAD checklist/commands forms · the badge
  `tests-2047%20checks`) never return to the live-tense sites;
  (6) the mobile-nav suite count stays live — the README Tested-row phrase
  `a 10-check mobile-nav regression suite` + the README testing-section
  phrase `the 10-check` + the PAD suite line `(10 checks, 390/700px
  viewports)`.
  Constants: `E2E` 132 → **133** · `UNIT` 1915 → **1921** (+6 its) · badge
  2047 → **2054** (= 1921 + 133).
- **S104-P2 (the drawer-OPEN seeded-state e2e guard — the NEW
  mobile-navigation.spec.ts test)**: at 390×844 (the SEEDED e2e.db), open
  the drawer on the dashboard and assert (a) `documentElement.scrollWidth
  <= 390` with the drawer OPEN; (b) the panel (`div.h-dvh.w-72` inside the
  dialog — the s94 exact-selector protocol) exists with `scrollWidth <=
  clientWidth` (zero internal horizontal overflow); (c) the panel rect
  width === **288** (w-72, the design width; max-w-[85vw]=331.5 inactive at
  390); (d) the 8 destination links visible. Non-vacuousness by the
  wrong-bound perturbation proof: the scrollW assertion temporarily
  `<= 389` → the test FAILS live (proving the probe reads the real layout)
  → restored → GREEN. E2e census 132 → **133**.
- **S104-P3 (the seeded-state mobile captures + the VLM battery)**: the
  throwaway capture script (the drawer-battery pattern — repo-internal for
  module resolution, deleted after use) captures **158** (the SEEDED
  dashboard at 390×844 — the KPI ladder + the pipeline chart at phone
  width) + **159** (the SEEDED drawer OPEN at 390×844 — the 8-link panel +
  the dimmed seeded dashboard behind). The VLM battery per the house
  protocol, 4 checks per capture: structure · content · layout-fit ·
  render quality — with the seeded-value read on 158 (the VLM must read
  "24 / $337.0k / 29.2%" off the phone-width capture, the freeze pins'
  values visible in the pixels) and the 8-destination + overlay read on
  159.
- **S104-P4 (the 375×812 login maiden re-check)**: `bun run sweep --
  --width 375 --height 812 --fail-on-drift` — the second walked width
  re-verified under the class-ceiling semantics (the s101 maiden measured
  login 0.82 there; the allowed is now 1.4 + 0.5 = 1.9 — the maiden
  expectation CLEAN, the class margin holds at every walked width).
- **S104-P5 (the probe ordinals)**: drift-probe.ts header "74" → **"75"**
  + "the 24th" → **"the 25th"** + the drift-probe-tool.test.ts header echo
  + the it title (comments/titles only; the wiring pin asserts no
  ordinals — re-verified before the edit).
- **S104-P6 (the count ladder realignment)**: the docs family — the unit
  sites 1915 → **1921** (README:55/:125/:178 · AGENTS:20/:29 · CLAUDE ×4
  :38/:114/:125/:371 · PAD:358/:784/:797/:1219/:1289) · the e2e sites 132 →
  **133** (AGENTS:21/:29 · CLAUDE:38/:115/:299 · README:55/:126/:180 ·
  PAD:359/:784/:797/:1221/:1290) · the badge 2047 → **2054** (README:8) ·
  the mobile-nav phrases 9-check → **10-check** (README:55/:997 + the new
  pin in the parenthetical contents list · PAD:207) · the CLAUDE-count
  lockstep re-anchor 1915 → **1921** + the retired forms join the
  negatives ladder (`1915 checks` / `currently 1915`).
- **S104-P7 (the docs)**: session_209.md (the session-104 formal log) +
  this plan's execution record + the worklog append + the narrative
  realignment (README badge 2054 + the Tested row's s104 clause; AGENTS the
  §Session-104 history block; PAD the s104 inventory row + the Total
  106/1921 + 133; SKILL v1.101.0 §16cr + project_state + the H1).

## The RED plan (TDD)

- **RED-1 (the count ladder + the e2e lockstep)**: the docs-counts
  constants re-anchored FIRST (UNIT 1921 · E2E 133) + the 6 new its + the
  CLAUDE-count lockstep re-anchor (1921) + the new stale forms in the
  negatives ladders → run the two suites against the still-old docs →
  **expected 17 failed** (the 10 re-anchored existing docs-counts pins +
  the 6 new e2e-site pins + the 1 lockstep; the s103-era stale-form
  negatives pin PASSES at the s103-state docs — they carry 1915/132 forms,
  not the banned older forms), the failures enumerated by name.
- **Non-vacuousness (stash-proven)**: stash the two test files → the
  pre-fix state (the s103-ship tests × the s103-ship docs) → all green →
  pop → the RED re-confirmed. Then the GREEN realignment → all green.
- **RED-2 (the e2e guard's non-vacuousness)**: the wrong-bound
  perturbation — the scrollW assertion temporarily `<= 389` → the targeted
  e2e run (`--grep "drawer OPEN"`) FAILS live (the probe genuinely reads
  the layout: the real scrollW is exactly 390) → restored → GREEN (10/10
  in the mobile suite).

## Blast radius (pre-checked)

- tests/docs-counts.test.ts (the constants + 6 NEW its + the widened
  negatives), tests/dialog-geometry-parity.test.ts (the lockstep re-anchor
  + the ladder), tests/e2e/mobile-navigation.spec.ts (1 NEW test),
  scripts/drift-probe.ts (header comments only),
  tests/drift-probe-tool.test.ts (the header echo + the it title only),
  the docs family (README · AGENTS · CLAUDE · PAD · SKILL v1.101.0 ·
  session_209.md NEW · this plan's execution record · the worklog ·
  screenshots 158/159 NEW).
- ZERO src/ changes — a tooling + tests + docs session (the parity
  surfaces stand; the seed untouched).
- The vitest config untouched (tests/**/*.test.ts picks up the docs-counts
  growth); the playwright config untouched; the gate:full chain unchanged
  (the 375 maiden is a one-off re-check, NOT a fifth sweep; probe:ref
  stays outside the offline gate).
- The e2e static census 132 → 133 (the new guard); the live e2e run
  verifies it.
- The gate re-run decides everything else (the one-gate discipline).

## The execution record (2026-10-11, session-104)

Executed RED-first, with ONE in-flight discovery (the N-79b1 hidden
carrier — below):

- **RED-1 (the count ladder + the e2e lockstep)**: the docs-counts
  constants re-anchored first (UNIT 1921 · E2E 133 · badge 2054) + the
  6 new e2e-site its + the CLAUDE-count lockstep re-anchor (1915 →
  1921) + the widened negatives ladders → **17 failed | 19 passed
  (36)** at the pre-realignment docs — 10 re-anchored docs-counts pins
  + 6 new e2e-site pins + 1 lockstep, enumerated by name; the s103-era
  stale-form negatives pin PASSED at the s103-state docs (they carry
  1915/132 forms, not the banned older forms). **The plan's expected
  17 EXACT.**
- **Non-vacuousness (stash-proven)**: the two test files stashed →
  **30/30** (the s103-ship state) → pop → **17 RED** re-confirmed.
- **GREEN (the realignment)**: 27 assert-guarded doc edits (each
  exactly-once) across README (badge 2054 · the unit/e2e tree +
  commands + Tested-row counts · the 9-check → 10-check phrases ×2 +
  the guard item in the contents list) · AGENTS (the commands table +
  gate-order, unit + e2e halves) · CLAUDE (the gate-order + commands
  table + pyramid + coverage lines) · PAD (the tree ×2 + Total + HEAD
  + checklist + commands rows + the suite line).
- **GREEN (S104-P0)**: the F-104a1 at-birth fix — session_207.md:41 +
  the s103 plan:32 "105/1892" → **"105/1903"**.
- **GREEN (S104-P5)**: the probe ordinals 74/24th → **75/25th**
  (drift-probe.ts header + the test echo + the it title; the wiring
  pin asserts no ordinals — re-verified before the edit).
- **S104-P2 (the drawer-OPEN guard)**: the NEW mobile spec test →
  **11/11** on the standing build (green-by-design, as planned) →
  **RED-2**: the wrong-bound perturbation (scrollW ≤ 389 temporarily)
  → the targeted run **1 failed** (the probe genuinely reads the
  layout — the real scrollW is exactly 390) → restored → GREEN.
- **The N-79b1 IN-FLIGHT DISCOVERY**: the first full-suite run after
  the realignment tripped a hidden pin — the s79 e2e-count carrier in
  login-family-parity asserts CLAUDE's pyramid line `**E2E (Playwright,
  132 checks)**`. The lockstep working as designed (an unmapped carrier
  caught the change live): the carrier re-anchored 132 → 133 with the
  retired form joining its negatives (+0 net its — the count stays
  1921).
- **The WIDENED-GUARD IN-FLIGHT REFINEMENT** (the s102 pattern
  repeating): the docs-phase pin sanity run tripped the new e2e
  stale-form negatives — the s104 PAD inventory row QUOTES "— 132/132"
  free-standing while documenting the ban, and the bare-form negative
  matched the quote. Re-anchored to the full SITE-FORM construction
  (`` `bun run test:e2e` — 132/132 `` — the backtick command prefix a
  quoted mention cannot match), re-proven green 84/84. An inventory
  row quoting a banned form documents the ban; it does not reinstate
  it.
- **The full unit suite: 106 files / 1921 tests ALL PASSING** (+6 net).
- **S104-P3**: screenshots 158 (the seeded dashboard at 390×844) + 159
  (the seeded drawer OPEN at 390×844) — **VLM 4/4 + 4/4, zero
  adjudications** (the KPI-value read: "Total Leads 24 (+5.3%) · Deals
  Closed $337.0k · Conversion Rate 29.2%" — the freeze pins' values in
  the phone pixels; the drawer: the 8 links + the brand + the X + the
  dimmed seeded dashboard behind); the throwaway capture script
  deleted.
- **S104-P4 (the 375 maiden re-check)**: **CLEAN** — login 0.82% vs
  the allowed 1.9% (the 1.4 class ceiling + margin) · settings 7.52 vs
  7.7+0.5 · the floor family holding; the seed restored (census
  MATCH).
- **S104-P7**: session_209.md + this record + the README Tested-row
  s104 clause + the AGENTS §Session-104 history block + the PAD s104
  inventory row (Files = 1: docs-counts the only file gaining NEW its)
  + SKILL v1.101.0 (§16cr + project_state + the H1) + the worklog
  append.
- **GATE**: lint 0/0 · tsc 0 · 1921/1921 unit [106 suites, +6 net] ·
  build · 133/133 e2e fresh CI=1 (+1: the drawer-OPEN guard) + the
  four drift sweeps CLEAN inside gate:full. The closing census MATCH;
  `.env.example` 3 active vars standing.
