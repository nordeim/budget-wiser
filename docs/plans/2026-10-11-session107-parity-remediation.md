# Session-107 Parity Remediation Plan (2026-10-11)

Session 107 on `main` @ `cef1baa` (the s106 ship `672f5dc` + two docs-only
session-log follow-ups `e3369fb`/`cef1baa` = the worklog append +
session_214.md). The workspace was RESET this run — a fresh `git clone`;
the environment rebuilt: `bun install` (533 packages); `cp .env.example
.env` + `AUTH_SECRET` set (the 3-var contract standing:
`DATABASE_URL="file:../db/custom.db"` + `NEXT_PUBLIC_SITE_URL` +
`AUTH_SECRET`); `bun run db:push` + `db:seed` (census MATCH
15/24/10/23/12 + 4 users); `bunx playwright install chromium`
(chromium-headless-shell v1243). All ops under `env -u DATABASE_URL`. The
repo `skills/` folder excluded from checking/testing/compilation
throughout. The scandihaven tech-stack patterns re-checked (Next.js 16 +
React 19 + TS 5.9 strict + Tailwind v4 CSS-first `@theme` literal hex +
Radix/shadcn + Zustand + Vitest/Playwright — neo-crm on-pattern, the
single-app shape the deliberate difference).

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 106 files / 1922 tests ALL PASSING (14.5s) ✓ ·
  build ✓ · 135/135 e2e fresh CI=1 (3.2m — the settings-tabs guard #135
  green inside the run) ✓ — exactly the s106 ship state.

## The audits

- **107-a (subagent)**: the s106 ship delta (`c06348f..cef1baa`, 3
  commits, 16+2 files, ZERO src/) **GENUINE 10/10** — every claim
  verified hunk-by-hunk (the docs-counts constants E2E 135/UNIT 1922/
  SUITES 106 + the HEAD "in 5 spec" + the 134 negatives + the seven-site
  mobile-nav pin + the NEW H1/project_state lockstep it; the
  settings-mobile guard assertions; the N-79b1 carrier; the probe
  ordinals 77/27th; the F-106b1/F-106c1 fixes; the doc realignments;
  screenshots 162/163 valid 390×844 PNGs; SKILL v1.103.0
  frontmatter/§16ct/project_state/H1). Non-vacuousness reproduced: the
  mixed-state checkout **19 failed | 56 passed (75) — the recorded RED-1
  EXACT**, all 19 enumerated by name + the native face **75/75**. Findings:
  **F-107a1 REAL** (docs-only, Low — SKILL **Appendix B "Test Inventory &
  Runtime Costs"** (`neo-crm_SKILL.md:6447-6474`) is a stale s12 snapshot:
  the mobile-nav row reads "7" (live 10), the e2e total "4 files | 28"
  (live 5 spec + setup | 135), the unit total "12 files | 206" (live
  106 | 1922) — untouched since 652511b (s12), never enumerated by any
  widening — the F-99a1 genus at an **eighth site**, invisible to the
  seven-site spec-line pin) + N-107a1-4 record-only (the commit-message
  line citations accurate; the "~95" PAD census approximation;
  session_213.md riding the feat; the "2 passed" phrasing genus).
- **107-b (subagent)**: the graduation/standing-layers audit **9/9 PASS —
  ZERO graduations** (~64th consecutive; `git diff 672f5dc..HEAD -- src/`
  EMPTY). The ledger live **106/1922 ALL PASSING** (the named six
  families 74/74). The CSV census **17 sites ZERO unguarded, ZERO line
  drift**. Source-vocabulary byte-identical since s90 (3a89508). The
  config layer verified (vitest isolation · playwright e2e.db pin +
  CI=1 + workers:1 · the 3-var .env.example · gate/gate:full/sweep/
  probe:ref intact). The SEO/sitemap layer **46/46 LIVE** on the
  standing build (PORT 3123, server killed after): sitemap 9 urls/
  weekly/1.0+0.8/application/xml · robots the s18 byte body · manifest +
  the 405-char description · /login OG/Twitter/PWA metas + og-image
  1200×630 live off the IHDR · all 9 app routes 200 with the per-route
  `"<Page> | NEO CRM"` family. The mobile-nav contract INTACT (the
  md-breakpoint pin + the 10-test battery + MOBILE_NAV_E2E=10 + all
  SEVEN phrase sites + the arithmetic 11+111+10+1+1+1=135). The
  globals.css v4 re-pins PRESENT (137 @theme tokens, zero var() inside,
  no tailwind.config). Both operator decisions STANDING (the 67th). The
  probe ordinals verified at 77/27th. Record-only: N-107b1-4.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 78th consecutive**;
  census #103: demo zero · desktop 256px/8 STANDING · the mobile-nav
  defect STANDS at TRUE 390 (the 28th consecutive — the reference's own
  bug, our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each — census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live — 9/9** (the
  trigger visible at 390 · the panel 288px [the w-72 budget] with 8
  links · focus inside the panel · the body scroll lock · the
  navigate-close → /Leads with the full release · Escape-close · the
  reopen-before-grow → resize-past-md auto-close + release; the
  agent-browser battery inside one script invocation, PORT 3124, server
  killed after — the sandbox-reaps lesson).

## The rotation (107-c)

**THE REPORTS KPI-DERIVATIONS UNIT FREEZE (the s106-close suggested
next #1 — "the s107 candidate": the quarter-filtered 18/6 family read
off the phone pixels at s105 derives INLINE in the route handler, no
pure seam, no unit freeze) + THE F-107a1 APPENDIX B REFRESH + THE
F-107b1 IN-FLIGHT PIN.** The fourth-surface seeded walk stays the s108
candidate; the probe `--expect` mode stays on the backlog (the
reference stable the 78th consecutive).

- **S107-P0 (the probe ordinals)**: drift-probe.ts header "77" →
  **"78"** + "the 27th" → **"the 28th"** + the drift-probe-tool.test.ts
  header echo + the it title — comments/titles only (the wiring pin
  asserts no ordinals — re-verified before the edit).
- **S107-P1 (the seam extraction — a src/ change, the first since s90,
  justified by the house seam doctrine: "pure domain logic lives in
  `src/lib/*` seams with Vitest coverage; handlers and pages only
  orchestrate" — the reports KPI row currently violates it)**: the
  inline KPI derivation at `src/app/api/reports/route.ts:182-196` moves
  to a pure `reportsKpis(leads, wonOpps, lostOpps)` in
  `src/lib/reports-data.ts` (behavior-preserving, the formulas
  byte-identical incl. the `(o.amount || 0)` guards and the
  toFixed(1) conversion; the route calls the seam and assigns to
  `ReportsData["kpis"]`). The `periodStart` stays in the route (the
  report-periods source pin holds it).
- **S107-P2 (the NEW tests/seeded-reports-kpis.test.ts — 4 its)**:
  (a) **the seam formula members** (synthetic arrays): openLeads =
  new+contacted STRICTLY (a qualified lead excluded — the route
  comment's contract); conversionRate `((won/(won+lost))*100).toFixed(1)`
  = "66.7" at 4/6; the zero-division guard "0" at 0/0; wonValue/
  lostValue the null-safe sums; (b) **the route wiring pin**
  (source-level, the report-periods/opportunity-model pattern): the
  route calls `reportsKpis(` and carries NO inline `openLeads:`
  construction — the seam doctrine pinned; (c) **the seeded
  rolling-quarter KPI row** (the s103 parse pattern): the parsed
  leadSeed/oppSeed + the REAL `subMonthsClamped(NOW, 3)` window (the
  same quarter mapping report-periods pins at the route source) → the
  filtered **18 leads / 12 opps** → the REAL seam → **totalLeads 18 ·
  openLeads 6 · wonDeals 4 · wonValue 337_000 · lostDeals 2 ·
  lostValue 92_000 · conversionRate "66.7"** (the values the s105
  phone capture read live); (d) **the window boundary + the all-time
  contrast**: the boundary members (the −95-created lead OUTSIDE [Jul 8
  < Jul 11], the −80 the oldest INSIDE — a 12-day margin) + the
  all-time contrast (24 total — the s103 dashboard pin — vs the
  quarter's 18: the SAME seed, two windows) + the period="all" sentinel
  maps to `new Date(0)` (the whole set). Non-vacuousness by the
  induced-drift proof (the s103 doctrine): a temporary seed VALUE/stage
  perturbation fails the freeze by name → restored → GREEN.
- **S107-P3 (the count ladder)**: `UNIT` 1922 → **1927** (+4 the KPI
  suite + 1 the Appendix B docs-counts it); `SUITES` 106 → **107** (the
  new suite file); `E2E` stays **135**; `MOBILE_NAV_E2E` stays **10**;
  badge 2057 → **2062** (= 1927 + 135). The retired **1922/106/2057
  constructions** join the negatives ladders (docs-counts + the
  dialog-geometry CLAUDE unit lockstep negatives). The README commands
  comment's suite list gains `seeded-reports-kpis` (the
  three-newest-names assertion extended). The HEAD-line template stays
  "in 5 spec" (no new e2e spec).
- **S107-P4 (the F-107a1 Appendix B refresh + the pin)**: the SKILL
  Appendix B table dated as an s12 snapshot for its per-suite rows (the
  F-100a2 doctrine — historical rows stay historical) + the THREE
  live-tense total sites refreshed (the unit-total row `${SUITES} files
  | ${UNIT}` · the e2e-total row `5 spec files + the setup project |
  ${E2E}` · the mobile-nav row `${MOBILE_NAV_E2E}`) + the NEW
  docs-counts it pinning all three constructions against the SKILL
  source (the site-form anchor — an inventory/history row quoting the
  retired forms cannot match; the genus structurally retired at the
  eighth site).
- **S107-P5 (the F-107b1 fix — the in-flight plan-validation find)**:
  `CLAUDE.md:38`'s gate-order unit half ("`bun run test` (1922)") is an
  UNPINNED live-tense unit-count site (the docs-counts AGENTS gate-order
  pin covers only AGENTS; CLAUDE:38's e2e half IS pinned — the
  asymmetry). Fix: the FOURTH assertion joins the dialog-geometry
  CLAUDE unit lockstep carrier (the F-106c1 precedent); +0 net its.
- **S107-P6 (the docs)**: session_215.md (the session-107 formal log) +
  this plan's execution record + the worklog appends + README (the
  badge 2062 + the tree 107 suites + the commands comment + the Tested
  row's s107 clause) + AGENTS (the commands table + gate-order at
  1927/135 + the §Session-107 history block) + CLAUDE (the commands
  table + gate-order + pyramid + "(currently 1927)" + the F-107b1 site
  realigned) + PAD (the tree + Total + HEAD + checklist + commands +
  the s107 inventory row) + SKILL v1.104.0 (§16cu + project_state +
  the H1 + the Appendix B refresh).
- **S107-P7 (the captures + the VLM battery)**: the throwaway capture
  script (the s104/s105/s106 pattern — repo-internal for module
  resolution, deleted after use) captures **164** (the SEEDED reports
  KPI row at 390×844, FIRST viewport — the 18/6 values readable off
  the phone pixels, the frozen surface) + **165** (the SEEDED reports
  page at desktop 1440 — the full 5-card KPI row + the quarter filter
  bar). The VLM battery per the house protocol, 4 checks per capture:
  structure · content · layout-fit · render quality — with the KPI
  values (Total Leads 18 · Open Leads 6 · Won Deals 4 $337.0K · Lost
  Deals 2 $92.0K · Conversion Rate 66.7%) the read on 164 and the full
  row + filter on 165.

## The RED plan (TDD)

- **RED-1 (the count ladder + the seam + the two finds)**: the
  docs-counts constants re-anchored FIRST (`UNIT` 1927 + `SUITES` 107 +
  the badge arithmetic + the suite-list extension) + the NEW Appendix B
  it + the N-79b1 carrier UNTOUCHED (E2E unchanged — stays green) + the
  dialog-geometry CLAUE unit lockstep re-anchored (1922 → 1927 + the
  F-107b1 fourth assertion from the start + the 1922 negative joined)
  + the NEW seeded-reports-kpis suite written + the opportunity-model
  KPI it re-anchored (the route-calls-the-seam construction) → run the
  four suites against the still-old docs + the still-inline route →
  **expected 18 failed** (the 10 docs-counts unit-axis its [the README
  badge · the README tree · the README commands · the README Tested
  row · the AGENTS commands · the AGENTS gate-order · the PAD tree ·
  the PAD Total · the PAD HEAD · the PAD checklist/commands] + the
  H1/project_state lockstep counts face [project_state still 1922] +
  the NEW Appendix B it [the totals still s12-stale] + the
  dialog-geometry lockstep [CLAUDE still 1922 ×4 assertions, 1 it] +
  the 4 KPI-suite its [the seam does not exist — the import errors] +
  the opportunity-model KPI it [the route still derives inline]),
  enumerated by name. The e2e-site pins + the mobile-nav seven-site it
  + the stale-form negatives stay green (E2E/MOBILE_NAV unchanged).
- **Non-vacuousness (stash-proven)**: stash the four test files → the
  pre-fix state → all green → pop → the RED re-confirmed. Then the
  GREEN: the seam extraction (S107-P1) + the doc realignment +
  SKILL v1.104.0 + the Appendix B refresh → all green.
- **RED-2 (the freeze's non-vacuousness)**: the induced-drift proof —
  a temporary seed perturbation (a lead VALUE or stage edit, the s103
  doctrine) → the KPI-row it FAILS by name → restored → GREEN. Plus
  the seam-formula face: the qualified-exclusion assertion temporarily
  inverted → FAILS → restored → GREEN.

## Blast radius (pre-checked)

- **src/ (the first change since s90 — the seam doctrine)**:
  `src/lib/reports-data.ts` (+reportsKpis, the formulas
  byte-identical) + `src/app/api/reports/route.ts` (the inline block →
  the seam call; behavior-preserving — the e2e era anchor "4 $337.0K"
  and every filter path byte-identical).
- tests/docs-counts.test.ts (the constants + the suite-list extension +
  the NEW Appendix B it + the 1922/2057 negatives), tests/dialog-
  geometry-parity.test.ts (the CLAUDE unit lockstep re-anchor + the
  F-107b1 fourth assertion), tests/seeded-reports-kpis.test.ts (NEW —
  4 its), tests/opportunity-model.test.ts (the KPI it re-anchored to
  the seam construction, +0 net), scripts/drift-probe.ts +
  tests/drift-probe-tool.test.ts (the ordinals — comments/titles
  only), the docs family (README · AGENTS · CLAUDE · PAD · SKILL
  v1.104.0 incl. the Appendix B refresh · session_215.md NEW · this
  plan's execution record · the worklog · screenshots 164/165 NEW).
- The vitest config untouched (the include glob picks up the new
  suite); the playwright config untouched (no new e2e spec); the
  gate:full chain unchanged (probe:ref stays outside the offline
  gate).
- The e2e static census stays 135; the live e2e run verifies it (the
  seam is behavior-preserving — no re-baselining, no drift).
- The gate re-run decides everything else (the one-gate discipline).

## The execution record (2026-10-11, session-107)

Executed RED-first, with the plan holding (one documented +1):

- **RED-1 (the count ladder + the seam + the two finds)**: the
  docs-counts constants re-anchored first (UNIT 1927 + SUITES 107 +
  the badge arithmetic + the suite-list extension + the new
  1922/106/2057 negatives + the NEW Appendix B it) + the
  dialog-geometry CLAUDE unit lockstep re-anchored (1922 → 1927 + the
  F-107b1 fourth assertion from the start + the 1922 negatives) + the
  NEW seeded-reports-kpis suite written + the opportunity-model KPI
  it re-anchored onto the seam construction → **19 failed | 46 passed
  (65)** at the pre-realignment docs + the still-inline route — the
  10 unit-axis docs-counts pins + the stale-forms negatives it
  (tripping on the still-live old forms — the negatives working as
  designed at RED) + the H1/project_state counts face + the NEW
  Appendix B it + the dialog-geometry lockstep + the 4 KPI-suite its
  (the seam not yet born) + the opportunity-model re-anchor, the
  failures enumerated by name. **The plan predicted 18; the actual 19
  — the +1 the stale-forms it** (the s106 plan had counted its e2e
  analog among its 17; this plan's enumeration missed the unit-axis
  face — the N-107a4-class arithmetic note, documented here).
- **Non-vacuousness (stash-proven)**: the four test files stashed
  (with `-u` — the new suite is untracked) → **60/60** (the s106-ship
  state) → pop → **19 RED** re-confirmed → the GREEN.
- **GREEN (S107-P1 the seam + the realignment)**: the seam extraction
  — `reportsKpis(leads, wonOpps, lostOpps)` in src/lib/reports-data.ts
  (the formulas byte-identical; the route calls the seam and assigns
  to ReportsData["kpis"]; the FIRST src/ change since s90, the house
  seam doctrine) — + the README realignment (badge 2062 + tree
  107/1927 + commands + the suite list + the Tested row's s107
  clause) + AGENTS (commands + gate-order + the §Session-107 history
  block) + CLAUDE (all four unit sites at 1927) + PAD (tree + Total +
  HEAD + checklist + commands + the s107 inventory row) + SKILL
  v1.104.0 (frontmatter + the H1 + project_state + the Appendix B
  refresh [the dated-snapshot header + the three live totals + the
  updated e2e rows] + §16cu). The four-suite scoped run: **65/65
  GREEN.**
- **RED-2 (both induced-drift faces)**: the seed stage perturbation
  (the −45 lead won→contacted) → **2 failed by name** (the
  KPI-row it + the boundary it's all-time openLeads face) → restored
  → GREEN; the seam-formula perturbation (qualified joined to
  openLeads) → **4 failed** (the opportunity-model strictness pin +
  the seam-formula it + both seeded its) → restored → **GREEN
  (27/27)**.
- **The full unit suite: 107 files / 1927 tests ALL PASSING** (+5 net
  — the 4 freeze its + the Appendix B pin; the F-107b1 assertion
  joined the existing lockstep it; the opportunity-model re-anchor +0
  net).
- **S107-P7 (the captures + the VLM battery)**: the throwaway capture
  script (boot → captures → kill in one invocation; two in-flight
  fixes — the PORT env var + the post-login waitForURL glob). The
  captures **164** (the seeded reports KPI row at 390×844, FIRST
  viewport — the 18/6 ladder readable) + **165** (the desktop 1440
  full 5-card row + the "This Quarter" filter) — **VLM 4/4 + 4/4,
  zero adjudications**: the VLM independently read ALL five frozen
  values verbatim (Total Leads 18 · Open Leads 6 · Won Deals 4
  $337.0K · Lost Deals 2 $92K · Conversion Rate 66.7%) plus the
  period filter off BOTH viewports' pixels; both captures clean on
  layout-fit and render quality. The throwaway script deleted after
  use.
- **The probe ordinals (S107-P0)**: 77/27th → 78/28th (the
  drift-probe.ts header + the test echo + the it title).
- **GATE**: lint 0/0 · tsc 0 · 1927/1927 unit (107 suites, +5 net) ·
  build · **135/135 e2e fresh CI=1** (the seam behavior-preserving —
  the e2e census unchanged, no re-baselining) + the four drift sweeps
  CLEAN inside gate:full. The closing census MATCH; `.env.example`
  3 active vars standing.
