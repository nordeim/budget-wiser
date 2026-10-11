# Session-108 Parity Remediation Plan (2026-10-12)

Session 108 on `main` @ `8cecd4f` (the s107 ship `c213e6f` + the two docs-only
session-log follow-ups `f8f0a8d`/`8cecd4f` = session_216.md + worklog +
session_217.md). The workspace was RESET this run — a fresh `git clone`; the
environment rebuilt: `bun install` (533 packages); `cp .env.example .env` +
`AUTH_SECRET` set (the 3-var contract standing); `env -u DATABASE_URL` on
every op (the shell's stray `DATABASE_URL` hazard); `bun run db:push` +
`db:seed` (census MATCH 15/24/10/23/12 + 4 users); `bunx playwright install
chromium` (chromium-headless-shell v1243). The repo `skills/` folder excluded
from checking/testing/compilation throughout. The scandihaven tech-stack
patterns re-checked (Next.js 16 + React 19 + TS 5.9 strict + Tailwind v4
CSS-first `@theme` literal hex + Radix/shadcn + Zustand + Vitest/Playwright —
on-pattern; the 218-skill catalog mirrors the neo-crm families, nothing new
to adopt).

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 107 files / 1927 tests ALL PASSING (14.8s) ✓ ·
  build ✓ · 135/135 e2e fresh CI=1 (3.1m) ✓ — exactly the s107 ship state.

## The audits

- **108-a (subagent)**: the s107 ship delta (`cef1baa..8cecd4f`, 3 commits,
  20 files, src/ = the seam extraction only) **GENUINE 9/9** — every claim
  verified hunk-by-hunk (the reportsKpis seam formulas byte-identical; the
  seeded-reports-kpis suite; the F-107a1 Appendix B refresh + pin; the
  F-107b1 fourth lockstep assertion; the count ladder; the probe ordinals;
  the captures 164/165 valid 390×844 + 1440×900 PNGs; the docs realignment;
  the e2e census 135 unchanged). Non-vacuousness reproduced EXACT: the
  mixed-state worktree **19 failed | 46 passed (65)** — all 19 enumerated by
  name, matching the plan's enumeration; the native pre-s107 **60/60**.
  Findings: **F-108a1 REAL** (SKILL:13 project_state — the head counts
  bumped 1922→1927 but the head still describes "the session-106 layer";
  the s107 layer never prepended + "beneath it 1922 + 135" never inserted —
  the F-106a1 pin asserts only the counts face, blind to the layer axis) +
  **F-108a2 REAL** (SKILL:388 "1520 lines; 180 checks" + PAD:1349 "1520" vs
  live **1530 / 182** — the 95-a fix recurred, unpinned) + **F-108a3 REAL**
  (PAD:1348 reports-data "~213" vs live **279** — the s107 seam +66 omitted;
  the purpose text predates the seam) + **F-108a4 REAL** (DEPLOYMENT.md:14
  "16 API route handlers" vs live **27** + :98 `./scripts/smoke-test.sh # 30
  E2E checks` — the script deleted at e16efb9, the census 135; the file has
  ZERO docs-counts pin coverage) + N-108a5-7 record-only (PAD §11 nanos; the
  "FIRST src/ change since s90" claim — accurate form "since the s98 ship
  f96c0a9"; the Appendix B blockquote scope).
- **108-b (subagent)**: the graduation/standing-layers audit **9/9 PASS —
  ZERO graduations** (~65th consecutive; `git diff c213e6f..HEAD -- src/` =
  0 bytes). The ledger live **107/1927 ALL PASSING** (the named families
  74/74 + the seam families 76/76). The CSV census **17 sites ZERO
  unguarded, ZERO line drift**. Source-vocabulary byte-identical since s90.
  The config layer verified. The SEO/sitemap layer **46/46 LIVE** on the
  standing build (PORT 3123, boot→checks→kill in ONE invocation, first-run
  clean — the N-107b2 lesson applied at construction). The mobile-nav
  contract INTACT (the 10-test battery + MOBILE_NAV_E2E=10 + all SEVEN
  phrase sites + the arithmetic 11+111+10+1+1+1=135). The globals.css v4
  re-pins PRESENT. Both operator decisions STANDING (the 68th). The probe
  ordinals verified at 78/28th. Record-only: N-108b1-4.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 79th consecutive**;
  census #104: demo zero · desktop 256px/8 STANDING · the mobile-nav defect
  STANDS at TRUE 390 (the 29th consecutive — the reference's own bug, our
  drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each — census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live — 9/9** (the
  trigger visible at 390 · the panel 288px [the w-72 budget] with 8 links ·
  focus inside · the dual body+main scroll lock · the navigate-close →
  /Leads with the full release · Escape-close · the resize-past-md
  auto-close + release; `bun scripts/drawer-battery-390.ts`, the dev server
  killed after).

## The rotation (108-c) — THE FOURTH-SURFACE SEEDED MOBILE WALK + TWO LIVE FINDS

The s107-close suggested next #1 (the fourth-surface seeded walk — the
calendar, the remaining un-walked phone surface with the app's tightest
grid geometry). **The ANALYZE probe surfaced TWO REAL FINDS before any
walk was written** — the exact genus the walk family exists to catch:

### M-108c1 — the event chips render at CONTENT width (truncate never engages)

LIVE-measured on the seeded build: the chip spans in the month grid carry
`truncate` but are **INLINE boxes** — `overflow: hidden` + `text-overflow`
never constrain an inline element, so every chip renders at full content
width inside its cell: **93–177px chips inside 43px cells at 390** (2 chips
push `main.scrollWidth` to **496** — a horizontally-swipeable main at
/calendar) and **134–203px chips inside 97px cells at 1440** (7+ chips
visibly overlap the neighboring cells' content). The `+N more` span has the
same genus. **Invisible to every standing gate**: the drift sweeps run the
ZERO-DATA state (no events → no chips) and the ten-route overflow sweep
asserts `docScrollW` only (the document never overflows — main is the
scroller). The reference's own construction (the s76 L-76c9 bundle decode:
the plain `space-y-0.5` stack + the `cursor-pointer truncate rounded px-1
py-0.5 text-xs` span) carries the same latent defect — un-live-verifiable
at its zero-data state; ours is the **documented superset** (the mobile-nav
doctrine): `block` on the chip + `+N more` spans makes `truncate` engage,
constraining every chip to its cell at every width.

### M-108c2 — the 42-cell grid vs the reference's COMPLETE-WEEKS grid

The s76 M-76c8 decode gloss ("the grid is ALWAYS the UNTRIMMED 42 cells —
6 constant rows") is a **misdecode**: LIVE-probed on the reference at five
months — **Oct 2026 = 35 cells (Sep 27→Oct 31) · Nov 2026 = 35 (Nov 1→Dec
5) · Jan 2027 = 42 (Dec 27→Feb 6 — the 6-week month) · Apr 2027 = 35 · Jul
2026 = 35** — the reference renders the **complete-weeks grid**
(`eachDayOfInterval(Sunday-before-the-1st, Saturday-on-or-after-the-last)`:
28/35/42 as the month demands — exactly the s51-era model the s76 change
retired, and exactly what the s51 test comments describe: "the trimmed
render for Nov 2026: lead 0 + 30 days → 5 weeks → Dec 5"). Ours renders
always-42 (Oct 2026 = 42 vs the reference's 35). **Invisible to every
standing gate**: the extra 6th row sits BELOW the 900px sweep fold on both
apps (VLM-verified off the sweep screenshots: rows [27..3][4..10][11..17]
[18..24-cut] — the 0.01% desktop diff is fold-below), the e2e asserts no
cell count (≥35 holds for October), and the S16-P7 `monthKids ≥ 35`
assertion is only fragile in a 28-cell February (Feb 2026 starts Sunday —
re-anchored to the complete-weeks floor `≥ 28`).

**The fixes (both src/, the seam doctrine):**

- **S108-P1 (M-108c2)**: `calendarGrid` in `src/lib/format.ts` — the
  leading branch produces **complete weeks**: `total = leading ?
  Math.ceil((offset + daysInMonth) / 7) * 7 : daysInMonth`. The page call
  `calendarGrid(year, month, "sunday", true)` stays byte-identical (the
  s76 GUARD source pin keeps passing). `calendarFetchBounds` follows
  automatically (its `to` = the rendered grid's last cell — the N-51a
  contract now EXACT: Oct 2026 → Oct 31, Nov 2026 → Dec 5, Jan 2027 → Feb
  6; the trailing-cell coverage floor holds with equality). The
  calendar-page comment re-anchored to the complete-weeks decode.
- **S108-P2 (M-108c1)**: the chip span `cursor-pointer truncate rounded
  px-1 py-0.5 text-xs` gains **`block`**; the `+N more` span gains
  **`block truncate`**. Truncation engages at every width; the cell's
  `aria-label`/click/chip-tint contracts unchanged.

### S108-P3 (the NEW tests/calendar-grid.test.ts — 3 its, the unit freeze)

(a) **the complete-weeks members through the REAL `calendarGrid`**: the
LIVE-verified table — Feb 2026 (Sunday-start, 28d) = **28** [Feb 1..Feb
28] · Oct 2026 (Thu-start) = **35** [Sep 27..Oct 31] · Nov 2026 (Sun-start)
= **35** [Nov 1..Dec 5] · Jan 2027 (Fri-start) = **42** [Dec 27..Feb 6] ·
Jul 2026 = **35** [Jun 28..Aug 1] · Apr 2027 = **35** [Mar 28..May 1]; (b)
**the structural invariants**: the count is a multiple of 7 · the first
cell is a Sunday · the last is a Saturday · the count ===
`ceil((offset + daysInMonth)/7)*7` · the dates are contiguous daily steps;
(c) **the fetch-bounds alignment**: `calendarFetchBounds(2026, 9).to` ===
endOfDay(Oct 31 2026) · `(2026, 10).to` === endOfDay(Dec 5 2026) ·
`(2027, 0).to` === endOfDay(Feb 6 2027) — the window's last day === the
rendered grid's last cell (the N-51a contract exact).

### S108-P4 (the chip pins — tests/calendar-cells.test.ts +1 it)

The source-level pin (the suite's region idiom): the chip region carries
`block cursor-pointer truncate` + the `+N more` region carries
`block truncate` — the M-108c1 fix pinned (an inline chip fails the pin).

### S108-P5 (the NEW tests/e2e/calendar-mobile.spec.ts — the walk, +1 e2e)

On the SEEDED e2e.db at 390×844 (the s105/s106 pattern, one test block):
`/calendar` asserts docScrollW ≤ 390 · **mainScrollW ≤ 390 (the NEW
inner-overflow assertion — the M-108c1 catcher; the s105/s106 walks assert
docScrollW only)** · the KPI grid (the first `.grid.grid-cols-1` in main —
the PAGE_KPI_GRIDS.calendar root) 4 cards · ONE track · gap 16px · the DOW
grid 7 labels · 7 tracks · gap 4px (gap-1; sm:gap-2 inactive at 390) · the
month grid: the COMPLETE-WEEKS cell count for the current month (computed
in-test via the same ceil math — never hardcoded) · 7 tracks · cells ≥
40px wide · **every chip's right edge ≤ its cell's right edge + 1px (the
truncation-engaged guard)** · a REAL `Next month` click that increments the
title month and keeps the frame at 390 · the Upcoming/Agenda grid ONE
track (grid-cols-1; lg:grid-cols-2 inactive) with its 2 children.
Non-vacuousness by the wrong-bound perturbation — mainScrollW ≤ 389 →
FAILED live → restored → GREEN.

### S108-P6 (the four audit finds)

- **F-108a1**: the SKILL project_state head — the MISSING s107 layer
  inserted ("beneath it 1922 + 135; the session-107 layer [the 107-c
  rotation — THE REPORTS KPI-DERIVATIONS UNIT FREEZE …]") between the head
  and the s106 layer, then the s108 layer prepended on top at GREEN; the
  H1/project_state lockstep it gains the **layer-axis assertion** (the
  head's first two layer tokens === the last two sessions) — the genus
  structurally retired (+0 net its, joins the existing it).
- **F-108a2**: SKILL:388 "(1520 lines; `tests/page-layout.test.ts`, 180
  checks)" → "**1530 lines**; …, **182 checks** (the s108 snapshot)" +
  PAD:1349 "1520" → **1530**.
- **F-108a3**: PAD:1348 reports-data "~213" → **279** + the purpose text
  gains the s107 clause ("+ the s107 `reportsKpis` seam — the quarter-
  filtered KPI row, `tests/seeded-reports-kpis.test.ts`").
- **F-108a4**: DEPLOYMENT.md:14 "16 API route handlers" → **27**; the
  `./scripts/smoke-test.sh # 30 E2E checks` line → `bun run gate  # lint →
  typecheck → test → build → e2e (the one-command gate)`.
- **The pin**: the NEW docs-counts it (the four-site forms — SKILL:388's
  line/check counts · PAD:1349 · PAD:1348 · DEPLOYMENT:14/:98 — the
  site-form anchors; the next staleness fails `bun run test`).

### S108-P7 (the count ladder + the probe ordinals)

`UNIT` 1927 → **1932** (+3 calendar-grid + 1 calendar-cells + 1
docs-counts); `SUITES` 107 → **108** (the new suite file); `E2E` 135 →
**136** (the calendar-mobile guard — a NEW spec file, the mobile-nav
battery count stays 10); badge 2062 → **2068**; the HEAD-line template
"in 5 spec" → **"in 6 spec"** (the spec-family census gains calendar-mobile
— auth, crm, mobile-navigation, reports-mobile, settings-mobile,
calendar-mobile); the e2e arithmetic 11+111+10+1+1+**1**+1 = 136; the
retired 1927/107/2062/135/"in 5 spec" constructions join the negatives
ladders; the README commands suite list gains calendar-grid; the S16-P7
e2e `monthKids ≥ 35` re-anchored to `≥ 28` (the complete-weeks floor);
the probe ordinals 78/28th → **79/29th** (the drift-probe.ts header + the
test echo + the it title).

### S108-P8 (the captures + the VLM battery)

The throwaway capture script (the s104–s107 pattern — repo-internal,
deleted after use): **166** (the SEEDED calendar at 390×844 — the KPI
ladder + the month-grid top with the truncated chips) + **167** (the
SEEDED calendar at desktop 1440 — the complete-weeks grid + the truncated
chips + the Filters rail). The VLM battery per the house protocol, 4
checks per capture: structure · content · layout-fit · render quality —
with the month title (October 2026), the 5-row complete-weeks grid, and
the truncated chip ellipses the reads on 166/167.

## The RED plan (TDD)

- **RED-1 (the count ladder + the two fixes' pins)**: the docs-counts
  constants re-anchored FIRST (UNIT 1932 + SUITES 108 + E2E 136 + badge
  2068 + the HEAD "in 6 spec" + the spec-family census + the e2e
  arithmetic + the new negatives + the NEW four-site it) + the H1/
  project_state lockstep re-anchored (the counts face + the NEW layer
  face) + the NEW calendar-grid suite (3 its, RED against the still-42
  grid) + the calendar-cells chip it (RED against the still-inline chips)
  + the calendar-fetch-bounds re-anchors (the `to` values + the GUARD
  source form, RED against the still-42 seam) → run the affected suites
  against the still-old src/docs → the failures enumerated by name.
  Expected ≈ 23-24 failed (the 10 docs-counts unit-axis pins + the
  stale-forms negatives it + the e2e-axis/HEAD pins + the NEW four-site
  it + the H1 lockstep + the 3 calendar-grid its + the chip it + the 3
  fetch-bounds re-anchors), stash-proven (stash the five test files → the
  pre-fix state → all green → pop → the RED re-confirmed).
- **GREEN**: the two src/ fixes (S108-P1 the complete-weeks seam +
  S108-P2 the block chips) + the S16-P7 `≥ 28` re-anchor + the doc
  realignment (README · AGENTS · CLAUDE · PAD [tree + Total + HEAD +
  checklist + commands + the s108 inventory row + the F-108a2/a3 rows] ·
  SKILL v1.105.0 [frontmatter + the H1 + the project_state — the s108
  layer prepended + the missing s107 layer inserted + §16cv + the
  F-108a2 fix] · DEPLOYMENT [F-108a4] · session_218.md + the plan's
  execution record) → all green.
- **RED-2 (both fixes' induced drift)**: (a) the grid perturbation —
  `calendarGrid` temporarily reverted to always-42 → the calendar-grid
  its + the fetch-bounds its FAIL by name → restored → GREEN; (b) the
  chip perturbation — `block` removed from the chip span → the
  calendar-cells pin FAILS → restored → GREEN.

## Blast radius (pre-checked)

- **src/ (two files, both the seam doctrine)**: `src/lib/format.ts`
  (calendarGrid's total — 4 lines + the decode comment) +
  `src/app/(app)/calendar/calendar-page.tsx` (the chip + `+N more` class
  strings + the M-76c8 comment re-anchored).
- tests/calendar-grid.test.ts (NEW — 3 its), tests/calendar-cells.test.ts
  (+1 it), tests/calendar-fetch-bounds.test.ts (3 re-anchors, +0 net),
  tests/docs-counts.test.ts (the ladder + the four-site it), tests/e2e/
  calendar-mobile.spec.ts (NEW — 1 test), tests/e2e/crm.spec.ts (the
  S16-P7 `≥ 28` re-anchor), scripts/drift-probe.ts +
  tests/drift-probe-tool.test.ts (the ordinals), the docs family
  (README · AGENTS · CLAUDE · PAD · SKILL v1.105.0 · DEPLOYMENT ·
  session_218.md · this plan · the worklog · screenshots 166/167 NEW).
- **The e2e compatibility pre-checked**: :68 (headings — unaffected) ·
  :824 (the split grids — `≥ 28` holds for every complete-weeks month) ·
  :1839 (the chips open the edit dialog — `block` keeps the onClick) ·
  :2315 (the S54-P6 trailing-cell round-trip — WRITTEN against the
  complete-weeks model [the "same last-day rule the grid trim uses"
  comment]; the picked month always renders its trailing cells; the
  fetch window covers them exactly) · :2683 (the December-January
  rollover — title-only).
- **The drift gates**: both fixes can only DECREASE ours-vs-reference
  diffs (the 6th row disappears — below the fold anyway; the chips are
  invisible at the zero-data sweep state) — NO re-baselining; the four
  sweeps re-run inside gate:full.
- The vitest config untouched (the include glob picks up the new suite);
  the playwright config untouched (the setup project feeds the new spec);
  the gate:full chain unchanged; the census contract untouched.

## The execution record (2026-10-12, session-108)

Executed RED-first, with the plan holding (one in-flight guard fix +
one lockstep site, both documented):

- **RED-1 (the count ladder + the two fixes' pins)**: the docs-counts
  constants re-anchored (UNIT 1932 + SUITES 108 + E2E 136 + badge 2068
  + the HEAD "in 6 spec" + the spec-family census + the e2e
  arithmetic + the new 1927/107/2062/135 negatives + the NEW four-site
  it) + the H1/project_state lockstep re-anchored (the counts face +
  the NEW layer face — the F-108a1 fix) + the NEW calendar-grid suite
  (3 its, RED against the still-42 grid) + the calendar-cells chip it
  (RED against the still-inline chips) + the calendar-fetch-bounds
  re-anchors (the two `to` values + the GUARD source form) + the
  N-79b1 carrier re-anchor → **27 failed | 55 passed (82)** at the
  pre-realignment docs + the still-42 grid + the still-inline chips —
  the 19 docs-counts + the N-79b1 carrier + the 3 calendar-grid + the
  chip pin + the 3 fetch-bounds re-anchors, enumerated by name (the
  plan predicted ≈23-24; the +3 = the e2e-axis its the plan's estimate
  under-counted — the N-107a4-class arithmetic note, documented here).
  **Stash-proven**: the seven files stashed (with `-u` — the two new
  files untracked) → **77/77** (the s107-ship state) → pop → **27
  RED** re-confirmed → the GREEN.
- **GREEN (the two fixes + the realignment)**: the calendarGrid
  complete-weeks seam (`total = leading ? Math.ceil((offset +
  daysInMonth) / 7) * 7 : daysInMonth` + the decode-comment
  re-anchor) + the block chips (`block cursor-pointer truncate…` +
  the `+N more` `block truncate`) + the full doc realignment (README
  badge 2068 + tree 108/1932/136 + commands + the Tested row's s108
  clause · AGENTS commands + gate-order + the §Session-108 history
  block · CLAUDE all four unit sites + the e2e sites + the
  calendar-mobile pyramid clause · PAD tree + Total + HEAD "in 6
  spec" + checklist + commands + the s108 inventory row + the
  F-108a2/a3 module-table rows · SKILL v1.105.0 [frontmatter + the H1
  + the project_state — the s108 layer prepended + the MISSING s107
  layer inserted + §16cv + the §5.6 fix + the Appendix B rows (6 spec
  files | 136 + the calendar-mobile row) + the wall-clock] ·
  DEPLOYMENT [F-108a4]) + the dialog-geometry CLAUDE lockstep
  re-anchor (the in-flight site the plan missed — the F-92a3 carrier
  carries a FOURTH live-tense 1927 site; found at the full-suite run,
  re-anchored 1927→1932 + the negatives) + the four-site pin's
  site-form fixed in-flight (the "ONE test-pinned module" line-wrap —
  the anchor re-derived off the actual §5.6 bytes) → the full suite
  **108 files / 1932 tests ALL PASSING** (+5 net).
- **RED-2 (both fixes' induced drift)**: the grid perturbation
  (calendarGrid temporarily reverted to always-42) → **6 failed by
  name** (the 3 calendar-grid its + the 2 fetch-bounds `to` its + the
  GUARD source form) → restored → GREEN (8/8); the chip perturbation
  (`block` removed from the chip span) → **1 failed by name** (the
  chip pin) → restored → GREEN (19/19).
- **The e2e guard's own non-vacuousness (the wrong-bound proof)**:
  mainScrollW ≤ 389 → **FAILED live ("Expected: <= 389, Received:
  390")** → restored → GREEN. ONE in-flight guard fix before it: the
  first run measured the chips BEFORE the events fetch resolved (the
  static shell paints ahead of fetchEvents — the heading-wait was
  insufficient for FETCHED data); the guard now waits networkidle +
  the first chip visible before measuring (the S54-P6-era
  events-on-load contract; the 135 standing e2e including the
  chip-dialog tests had proven the data lands — the wait was the bug,
  not the seed).
- **S108-P7 (the captures + the VLM battery)**: the throwaway capture
  script (boot → captures → kill in one invocation; PORT 3126). The
  captures **166** (the seeded calendar at 390×844, the month card
  scrolled into view — the 4 stacked KPI cards push it below the
  fold) + **167** (the desktop 1440) — the live geometry read off the
  captures' own probes: 166 = docScrollW 390 + **mainScrollW 390**
  (pre-fix 496 — the M-108c1 fix verified live) · 167 = **35 cells**
  (pre-fix 42 — the M-108c2 fix verified live) + **12/12 chips
  truncated** + maxChipW 79 ≤ cellW 97. **The VLM battery 4/4 + 4/4,
  zero adjudications**: the VLM independently read October 2026, the
  complete-weeks grid (the last row 25-31 — no November row), the
  DOW labels, the contained chips with visible ellipses ("Weekly
  …", "Intro m…", "Product…", …), and clean render quality off BOTH
  viewports' pixels.
- **GATE**: lint 0/0 · tsc 0 · 1932/1932 unit [108 suites, +5 net] ·
  build · **136/136 e2e fresh CI=1 (3.3m, +1: the calendar-mobile
  guard green inside the run)** + the FOUR drift sweeps CLEAN
  (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each
  --fail-on-drift — **no re-baselining**: both fixes only DECREASE
  ours-vs-reference diffs, exactly as the plan predicted). The
  closing census MATCH (15/24/10/23/12 + 4 users); `.env.example`
  tracked, the 3 active vars standing; the tree exactly as planned
  (17 modified + 5 new; src/ = the two fixes only).
