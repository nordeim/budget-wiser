# Session-106 Parity Remediation Plan (2026-10-11)

Session 106 on `main` @ `333bc69` (the s105 ship `c06348f` + two docs-only
session-log follow-ups `9601f1a`/`333bc69` = the worklog append +
session_212.md). The workspace was RESET this run — a fresh `git clone`;
the environment rebuilt: `bun install` (533 packages); `cp .env.example
.env` + `AUTH_SECRET` set (the 3-var contract standing:
`DATABASE_URL="file:../db/custom.db"` + `NEXT_PUBLIC_SITE_URL` +
`AUTH_SECRET`); `bun run db:push` + `db:seed` (census MATCH
15/24/10/23/12 + 4 users); `bunx playwright install chromium`
(chromium-headless-shell v1243 — the session-93 fresh-clone gate repair
precedent). All ops under `env -u DATABASE_URL`. The repo `skills/`
folder excluded from checking/testing/compilation throughout.

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 106 files / 1921 tests ALL PASSING (14.6s) ✓ ·
  build ✓ · 134/134 e2e fresh CI=1 (3.1m — the reports-tabs guard #134
  green inside the run) ✓ — exactly the s105 ship state.

## The audits

- **106-a (subagent)**: the s105 ship delta (`a93eff4..333bc69`, 3
  commits, 16 files, +1022/−32, ZERO src/) **GENUINE 10/10** — every
  claim verified hunk-by-hunk (the docs-counts constants E2E 134 + the
  HEAD "in 4 spec" + the 133 negatives + the F-105a1 five-site
  widening; the reports-mobile guard assertions; the N-79b1 carrier;
  the probe ordinals 76/26th; the F-105a1 CLAUDE/PAD fixes; the
  doc realignments; screenshots 160/161 valid 390×844 PNGs; SKILL
  v1.102.0 frontmatter/§16cs/project_state). Non-vacuousness
  reproduced: the mixed-state checkout **11 failed | 44 passed (55)**
  — the recorded RED-1's 10 failures EXACT, enumerated by name, plus
  the 11th = the widened F-105a1 mobile-nav pin catching the two stale
  9-check sites at `a93eff4` (the +1 independently re-proving F-105a1
  was real; the recorded 10|45 predates the in-flight widening) + the
  native face **55/55** + the RED-2 wrong-bound **1 failed**
  ("Expected: <= 389, Received: 390" verbatim) → restored → GREEN +
  the main-repo sanity 55/55. Findings: **F-106a1 REAL** (docs-only,
  Low — the SKILL H1 NOT bumped: `neo-crm_SKILL.md:16` still reads
  "(SKILL.md v1.101.0)" at HEAD while the frontmatter reads 1.102.0;
  four s105 records falsely claim "the H1" was part of the bump — the
  site is UNPINNED, the F-99a1 genus on a new axis) + N-106a1 (the
  commit-message line-citation treadmill did NOT recur) + N-106a2 (the
  benign "2 passed" phrasing genus) + N-106a3 (session_211.md rides
  the feat commit) + N-106a4 (the 10|45 vs 11|44 pre-widening
  arithmetic, documented).
- **106-b (subagent)**: the graduation audit **9/9 PASS — ZERO
  graduations** (~63rd consecutive; `git diff c06348f..HEAD -- src/`
  EMPTY). The ledger families live **106/1921 ALL PASSING** (the named
  six families 74/74 targeted). The CSV census **17 sites ZERO
  unguarded** (13 live builders + 1 server-owned fetch + 3 static
  templates by design). Source-vocabulary byte-identical since s90
  (3a89508). The config layer verified (vitest isolation · playwright
  e2e.db pin + CI=1 + workers:1 · the 3-var .env.example). The
  SEO/sitemap layer **13/13 LIVE** on the standing build (PORT 3123,
  server killed after): sitemap.xml 9 urls · 1×1.0 + 8×0.8 · weekly ·
  application/xml; robots.txt the exact 3-line body; manifest.json +
  the 405-char description; /login `<title>NEO CRM</title>` + the
  OG/Twitter/PWA metas; all 9 app routes 200 with the per-route
  `"<Page> | NEO CRM"` pageMetadata() family. The mobile-nav contract
  INTACT (the md-breakpoint pin + the 10-test e2e battery +
  MOBILE_NAV_E2E=10 + all five phrase sites). The globals.css v4
  re-pins PRESENT. Findings: **F-106b1 REAL** (the F-99a1 stale-count
  genus at a SIXTH unguarded site — `AGENTS.md:168` live-tense prose
  still reads the stale 9-check form while the spec has 10 tests;
  s69-vintage, missed by both the s104 realignment and the s105
  F-105a1 five-site widening — the pin covers README×2 + PAD×2 +
  CLAUDE×1, no AGENTS mobile-nav site) + **the F-106b1 SECOND FACE,
  found in-flight during this plan's validation**: `neo-crm_SKILL.md:359`
  carries the SAME stale 9-check construction (a seventh site, the
  same genus) + N-106b1 (citation nanos) + N-106b2 (the seeded demo
  password is `Demo1234!`) + N-106b3 (the sandbox reaps backgrounded
  servers — the 13/13 run succeeded inside one script invocation).

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 77th consecutive**;
  census #102: demo zero · desktop 256px/8 STANDING · the mobile-nav
  defect STANDS at TRUE 390 (the 27th consecutive — the reference's
  own bug, our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each — census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live** (trigger ·
  panel · 8 links · focus inside · dual body+main lock ·
  navigate-close → /Leads with the full release · Escape-close ·
  reopen-before-grow · resize-past-md release).
- **The S106 ANALYZE probe** (throwaway, deleted): the SEEDED settings
  surface at TRUE 390×844 — docScrollW **390 exact** · the segmented
  tab bar ONE row of THREE equal tracks (`116.65px × 3`), **3
  triggers** ["CRM Configuration", "Defaults", "Data"], active "CRM
  Configuration" (data-state=active) · the picklist grid
  (SETTINGS_GRID `grid grid-cols-1 md:grid-cols-2 gap-4` — the
  md:grid-cols-2 arm inactive at 390) **ONE track (358px) × 5 cards,
  gap 16px** · the REAL tab switch to "Data" works (the active tab
  moves, the panel swaps to **3 cards @ 358px** [h 240/284/268],
  docScrollW stays 390) · the Defaults tab also holds 390.

## The rotation (106-c)

**THE SEEDED-STATE MOBILE WALK OF THE THIRD SURFACE FAMILY (the
settings tabs at 390 — the s105-close suggested next #2: the picklist
genus is the largest phone share at 7.7; the seeded settings capture
has never been walked at phone width, and no e2e pin holds the
settings geometry at 390) + THE TWO AUDIT FINDS (F-106a1 the SKILL H1
lockstep + F-106b1 the stale 9-check sites, both faces).** The probe
`--expect` mode stays on the backlog (the reference stable the 77th
consecutive session); the reports KPI-derivations unit freeze stays
the s107 candidate.

- **S106-P0 (the probe ordinals)**: drift-probe.ts header "76" →
  **"77"** + "the 26th" → **"the 27th"** + the drift-probe-tool.test.ts
  header echo + the it title — comments/titles only (the wiring pin
  asserts no ordinals — re-verified before the edit).
- **S106-P1 (the count ladder)**: `E2E` 134 → **135** (the new
  settings-mobile guard); `UNIT` 1921 → **1922** (+1 — the NEW
  F-106a1 H1-lockstep it in docs-counts); `SUITES` stays **106**; `
  MOBILE_NAV_E2E` stays **10** (the new guard lives in a NEW spec
  file); badge 2055 → **2057** (= 1922 + 135). The retired **134
  constructions** join the negatives ladders (docs-counts + the
  N-79b1 carrier): the badge `tests-2055%20checks` · `# Playwright
  (134 checks)` · `# 134 Playwright checks on` · `Browser E2E (134
  checks)` · `Playwright E2E (134 checks,` · `**E2E (Playwright, 134
  checks)**` · the PAD checklist `` `bun run test:e2e` — 134/134 `` ·
  `| 134 browser checks |`. The HEAD-line template "in 4 spec" →
  **"in 5 spec"** (the spec-family census: auth, crm,
  mobile-navigation, reports-mobile, settings-mobile). The
  dialog-geometry CLAUDE unit lockstep re-anchors 1921 → 1922
  (`Unit (Vitest, 1921 checks)` + `(currently 1921)`).
- **S106-P2 (the settings-tabs e2e guard — the NEW
  tests/e2e/settings-mobile.spec.ts)**: at 390×844 (the SEEDED
  e2e.db), /settings asserts (a) `documentElement.scrollWidth <= 390`
  (the seeded-data overflow contract — the picklist DATA is the
  largest phone-diff share, 7.7); (b) the segmented tab bar **3
  triggers · THREE equal grid tracks (grid-cols-3 — ONE row; the
  settings Tabs carry no responsive variant) · the active tab "CRM
  Configuration"**; (c) the picklist grid (the FIRST
  `.grid.grid-cols-1` in main — the SETTINGS_GRID root, the 5-card
  count proving the walk) **5 cards · ONE grid track · gap 16px** (the
  md:grid-cols-2 arm inactive at 390); (d) the REAL tab switch at
  phone width — click "Data" → the active tab moves, its panel renders
  **3 cards**, docScrollW stays ≤ 390. Non-vacuousness by the
  wrong-bound perturbation: the docScrollW assertion temporarily
  `<= 389` → the test FAILS live (the real scrollW is exactly 390) →
  restored → GREEN. E2e census 134 → **135** (setup 1 + auth 11 + crm
  111 + mobile 10 + reports-mobile 1 + settings-mobile 1).
- **S106-P3 (the seeded-state mobile captures + the VLM battery)**: the
  throwaway capture script (the s104/s105 pattern — repo-internal for
  module resolution, deleted after use) captures **162** (the SEEDED
  settings CONFIG tab at 390×844 — the segmented tab bar + the 5
  picklist cards with their bordered list rows, the genus surface) +
  **163** (the SEEDED settings DATA tab at 390×844 — the switched tab,
  the three Data cards). The VLM battery per the house protocol, 4
  checks per capture: structure · content · layout-fit · render
  quality — with the tab-bar + picklist-row read on 162 and the
  tab-swap + 3-card read on 163.
- **S106-P4 (the F-106a1 fix + the H1/project_state lockstep pin)**: the
  SKILL H1 `:16` "(SKILL.md v1.101.0)" → **"(SKILL.md v1.103.0)"** (riding
  this session's version bump) + the NEW docs-counts it pinning the
  H1↔frontmatter↔project_state lockstep — the it reads the frontmatter
  `version:` and asserts the H1 carries exactly it, AND asserts the
  project_state head carries the live counts
  (`project_state: ${UNIT} unit checks + ${E2E} e2e checks green`)
  (a DERIVED pin: it never goes stale; any future bump that forgets
  the H1 or the project_state counts fails `bun run test`).
- **S106-P5 (the F-106b1 fix + the pin widening — both faces)**: the
  AGENTS `:168` site + the SKILL `:359` site both fixed to the 10-check
  form + the mobile-nav suite-count pin's scope WIDENED to **seven
  sites** (the AGENTS spec-line site + the SKILL spec-line site join
  the five) + the retired 9-check SITE-FORM negatives on both files
  (the anchor "` (9 checks, 390/700px" — a session-history row quoting
  the forms cannot match them; this plan and the s106 history block
  quote the genus by name, never the construction).
- **S106-P5b (the F-106c1 fix — the in-flight plan-validation find)**:
  `CLAUDE.md:114` ("Vitest unit suites (1921 checks)") is an UNPINNED
  live-tense unit-count site — the F-99a1 genus on the CLAUDE
  commands-table axis, missed by the s102/s104 locksteps (they pinned
  the AGENTS commands form + CLAUDE's pyramid/gate-order/seam sites
  but never the CLAUDE commands table's unit row). Fix: the site joins
  the dialog-geometry CLAUDE unit lockstep carrier (the third
  assertion beside `Unit (Vitest, 1921 checks)` + `(currently 1921)`;
  +0 net its).
- **S106-P6 (the docs)**: session_213.md (the session-106 formal log) +
  this plan's execution record + the worklog appends + README (the
  badge 2057 + the tree "5 spec files" + the commands 135 + the Tested
  row's s106 clause) + AGENTS (the commands table + gate-order at
  1922/135 + the §Session-106 history block) + CLAUDE (the commands +
  gate-order + pyramid listing gaining settings-mobile + the two 1921
  sites + the e2e sites at 135) + PAD (the tree "5 spec files" +
  Total + HEAD "in 5 spec" + checklist + commands + the census-table
  settings-mobile row + the s106 inventory row) + SKILL v1.103.0
  (§16ct + project_state + **the H1 — actually bumped this time**).

## The RED plan (TDD)

- **RED-1 (the count ladder + the two finds)**: the docs-counts
  constants re-anchored FIRST (`UNIT` 1922 + `E2E` 135 + the HEAD
  template "in 5 spec") + the new 134 negatives in the e2e stale-forms
  ladder + the N-79b1 carrier re-anchored (134 → 135, the retired form
  joining its negatives) + the dialog-geometry lockstep re-anchored
  (1921 → 1922) + the mobile-nav pin widened to seven sites + the NEW
  H1 lockstep it → run the three suites against the still-old docs →
  **expected 19 failed** (the 17 docs-counts its: the README badge ·
  the README tree · the README commands · the README Tested row · the
  AGENTS commands · the AGENTS gate-order · the PAD tree · the PAD
  Total · the PAD HEAD · the PAD checklist/commands [all ten tripped
  by the UNIT+E2E realignment] + the AGENTS/CLAUDE/README/PAD e2e
  sites ×4 + the e2e stale-forms [the new 134 negatives tripping on
  the docs' live-tense 134 forms] + the widened mobile-nav it [the
  AGENTS+SKILL sites still 9-check] + the NEW H1 it [frontmatter
  1.102.0 vs the H1 v1.101.0] + the 1 N-79b1 carrier in
  login-family-parity + the 1 dialog-geometry lockstep), enumerated by
  name — **19 expected** (17 docs-counts + 2 carriers). The unit stale-forms it stays green (the 103/1880 negatives
  untouched). The dialog-geometry lockstep it carries the F-106c1
  third assertion (the CLAUDE:114 site) from the start.
- **Non-vacuousness (stash-proven)**: stash the three test files → the
  pre-fix state → all green → pop → the RED re-confirmed. Then the
  GREEN realignment → all green.
- **RED-2 (the e2e guard's non-vacuousness)**: the wrong-bound
  perturbation — the docScrollW assertion temporarily `<= 389` → the
  targeted run FAILS live (the real scrollW is exactly 390) → restored
  → GREEN.

## Blast radius (pre-checked)

- tests/docs-counts.test.ts (the constants + the HEAD template + the
  134 negatives + the widened seven-site mobile-nav pin + the NEW
  H1/project_state lockstep it + the ladder comment), tests/login-family-parity.test.ts (the
  N-79b1 carrier), tests/dialog-geometry-parity.test.ts (the CLAUDE
  unit lockstep + the F-106c1 third assertion), scripts/drift-probe.ts + tests/drift-probe-tool.
  test.ts (the ordinals — comments/titles only), tests/e2e/
  settings-mobile.spec.ts (NEW — 1 test), the docs family (README ·
  AGENTS · CLAUDE · PAD · SKILL v1.103.0 incl. the H1 fix + the :359
  9-check fix · session_213.md NEW · this plan's execution record ·
  the worklog · screenshots 162/163 NEW).
- ZERO src/ changes — a tooling + tests + docs session (the s104/s105
  pattern; the parity surfaces stand; the seed untouched).
- The vitest config untouched; the playwright config untouched (the
  testDir glob picks up the new spec); the gate:full chain unchanged
  (probe:ref stays outside the offline gate).
- The e2e static census 134 → 135 (the new guard); the live e2e run
  verifies it.
- The gate re-run decides everything else (the one-gate discipline).

## The execution record (2026-10-11, session-106)

(To be appended after execution.)

## The execution record (2026-10-11, session-106)

Executed RED-first, with the plan's predictions holding EXACT:

- **RED-1 (the count ladder + the three finds)**: the docs-counts
  constants re-anchored first (UNIT 1922 + E2E 135 + the HEAD template
  "in 5 spec") + the new 134 negatives in the e2e stale-forms ladder +
  the N-79b1 carrier re-anchored (134 → 135, the retired form joining
  its negatives) + the dialog-geometry lockstep re-anchored (1921 →
  1922, the F-106c1 third assertion joined from the start) + the
  mobile-nav pin widened to seven sites + the NEW H1/project_state
  lockstep it → **19 failed | 56 passed (75)** at the pre-realignment
  docs — the 17 docs-counts its (the 10 unit-axis realignment pins +
  the 4 e2e-site pins + the e2e stale-forms [the new 134 negatives] +
  the widened mobile-nav seven-site it + the NEW H1 it) + the 1
  N-79b1 carrier + the 1 dialog-geometry lockstep, the failures
  enumerated by name. **The plan's expected 19 EXACT.**
- **Non-vacuousness (stash-proven)**: the three test files stashed →
  **74/74** (the s105-ship state) → pop → **19 RED** re-confirmed →
  the GREEN realignment → green.
- **GREEN (the realignment)**: README (badge 2057 + tree 1922/135 +
  commands + the Tested row's s106 clause), AGENTS (commands +
  gate-order + the F-106b1 :168 site + the §Session-106 history
  block), CLAUDE (commands + gate-order + pyramid + the listing
  gaining settings-mobile + the two 1921 sites + the F-106c1 :114
  site + the e2e sites at 135), PAD (tree "5 spec files" + Total +
  HEAD "in 5 spec" + the spec-family list + checklist + commands +
  the census-table settings-mobile row + the s106 inventory row),
  SKILL v1.103.0 (frontmatter + project_state + **the H1 — actually
  bumped this time, the F-106a1 fix** + the :359 9-check fix + §16ct).
  The three-suite scoped run: **75/75 GREEN.**
- **S106-P2 (the settings-tabs guard)**: the NEW settings-mobile.
  spec.ts → **2 passed (the setup + the guard)** on the standing build
  (green-by-design, as planned) → **RED-2**: the wrong-bound
  perturbation (docScrollW ≤ 389 temporarily) → the targeted run **1
  failed** ("Expected: <= 389, Received: 390" — the probe genuinely
  reads the layout) → restored → GREEN (2 passed).
- **The full unit suite: 106 files / 1922 tests ALL PASSING** (+1 net
  — the H1/project_state lockstep it; the F-106b1/F-106c1 asserts
  joined existing its).
- **S106-P3 (the captures + the VLM battery)**: the throwaway capture
  script (the tab bar scrolled into view — the s105 lesson). Screenshots
  **162** (the settings CONFIG tab at 390×844 — the segmented tab bar +
  the "Contact Sources" picklist card with its bordered rows) + **163**
  (the DATA tab — the switched tab, the Import Templates + Export Data
  cards) — **VLM 4/4 + 4/4, zero adjudications**: the VLM independently
  read all 3 tab names verbatim, "CRM Configuration" active, the seeded
  picklist rows (Email/Phone/Website/Referral/Event/Social Media/Cold
  Call/Advertisement) with their pencil/trash icons, then the SWITCHED
  state ("Data" active with its white background, the "Import
  Templates" + "Export Data" cards with the verbatim button labels
  "Download Contacts Template" / "Export Contacts" / "Export
  Activities" etc.); both captures clean on layout-fit (nothing cut
  off, single-column stacks) and render quality. The throwaway script
  deleted after use.
- **The probe ordinals (S106-P0)**: 76/26th → 77/27th (the
  drift-probe.ts header + the test echo + the it title).
- **GATE**: lint 0/0 · tsc 0 · 1922/1922 unit · build · **135/135 e2e**
  fresh CI=1 (+1: the settings-tabs guard) + the four drift sweeps
  CLEAN inside gate:full. The closing census MATCH; `.env.example`
  3 active vars standing.
