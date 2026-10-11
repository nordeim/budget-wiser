# Session 108 — the fourth-surface seeded mobile walk + the two live finds + the four stale-docs fixes

**Date**: 2026-10-12 · **Base**: `main @ 8cecd4f` (the s107 ship
`c213e6f` + the two docs-only follow-ups) · **Result**: shipped to
`main` (this commit) · **Counts**: 108 Vitest suites / 1932 unit (+5
net) + 136 e2e (+1) · badge 2068 · SKILL v1.105.0.

## The intake

The workspace was RESET — a fresh `git clone` of
`https://github.com/nordeim/neo-crm.git` at `main @ 8cecd4f`. The
environment rebuilt per the house pattern: `bun install` (533
packages); `cp .env.example .env` + `AUTH_SECRET` set (the 3-var
contract standing: `DATABASE_URL="file:../db/custom.db"` +
`NEXT_PUBLIC_SITE_URL` + `AUTH_SECRET`); `env -u DATABASE_URL` on
every op (the shell's stray `DATABASE_URL` hazard); `bun run db:push`
+ `db:seed` — census MATCH (15/24/10/23/12 + 4 users); `bunx
playwright install chromium` (chromium-headless-shell v1243). The
repo `skills/` folder excluded from checking/testing/compilation
throughout. Core docs absorbed: CLAUDE/AGENTS/README/PAD heads, the
session docs (216/217 — the two s107 narrations), the s107 plan + its
execution record, the worklog tails, SKILL v1.104.0 project_state,
the skills catalog (218 skills). The scandihaven tech-stack patterns
re-checked (Next.js 16.3 + React 19 + TS 5.9 strict + Tailwind v4
CSS-first `@theme` literal hex + Radix/shadcn + Zustand +
Vitest/Playwright — on-pattern; its catalog mirrors the neo-crm
families, nothing new to adopt).

**The baseline gate GREEN, stepwise**: lint 0/0 · tsc 0 · 107 files /
1927 tests ALL PASSING (14.8s) · build · 135/135 e2e fresh CI=1
(3.1m) — exactly the s107 ship state.

## The audits (both dispatched in parallel per the house pattern)

- **108-a (subagent)** — the s107 ship delta (`cef1baa..8cecd4f`)
  **GENUINE 9/9**: every claim verified hunk-by-hunk (the reportsKpis
  seam formulas byte-identical; the seeded-reports-kpis suite; the
  F-107a1 Appendix B refresh + pin; the F-107b1 fourth lockstep
  assertion; the count ladder; the probe ordinals; the captures
  164/165 valid PNGs at the right dimensions; the docs realignment;
  the e2e census unchanged). Non-vacuousness reproduced EXACT: the
  mixed-state worktree (the pre-s107 tree + the four new-version test
  files) **19 failed | 46 passed (65)** — all 19 enumerated by name;
  the native pre-s107 **60/60**. FOUR REAL finds: **F-108a1** (the
  SKILL project_state head's LAYER face — the s107 ship bumped the
  counts 1922→1927 but never prepended the session-107 layer; the
  head still described "the session-106 layer"; the F-106a1 pin
  asserted only the counts face, blind to the layer axis) +
  **F-108a2** (SKILL §5.6 "1520 lines; 180 checks" + the PAD
  module-table row vs live 1530/182 — stale since s98, the 95-a fix
  recurred because unpinned) + **F-108a3** (the PAD reports-data row
  "~213" vs live 279 — the s107 seam +66 omitted from the row and its
  purpose text) + **F-108a4** (DEPLOYMENT.md "16 API route handlers"
  vs live 27 + the `./scripts/smoke-test.sh # 30 E2E checks` line —
  the script deleted at e16efb9; the file had ZERO docs-counts pin
  coverage). Record-only: N-108a5-7.
- **108-b (subagent)** — the graduation/standing-layers audit
  **9/9 PASS, ZERO real findings** (~65th consecutive zero
  graduations; `git diff c213e6f..HEAD -- src/` = 0 bytes). The
  ledger 107/1927 ALL PASSING live (the named families 74/74 + the
  seam families 76/76); the CSV census 17 sites zero unguarded zero
  drift; the source-vocabulary byte-identical since s90; the config
  layer verified; the SEO/sitemap layer **46/46 LIVE** on the
  standing build (boot → checks → kill in ONE invocation — the
  first-run-clean construction applying the N-107b2 lesson); the
  mobile-nav contract INTACT (the 10-test battery + MOBILE_NAV_E2E=10
  + all SEVEN phrase sites + the arithmetic 11+111+10+1+1+1=135); the
  globals.css v4 re-pins present; both operator decisions STANDING
  (the 68th — CSV posture (b) + source-vocabulary parity); the probe
  ordinals verified at 78/28th.

## The live verification (pre-plan)

- **probe:ref STABLE — the 79th consecutive** (the bundle
  `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e0d965676dc11`,
  1,631,071 bytes); census #104: demo zero · desktop 256px/8
  STANDING · the TRUE-390 mobile-nav defect STANDS the 29th (the
  reference's own bug; our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; census MATCH
  after each).
- **The drawer battery at TRUE 390×844 FULLY GREEN live — 9/9** (the
  trigger visible · the panel 288px [the w-72 budget] with 8 links ·
  focus inside · the dual body+main scroll lock · the navigate-close
  → /Leads with the full release · Escape-close · the resize-past-md
  auto-close + release).

## The rotation (108-c): the fourth-surface walk + TWO LIVE FINDS

The s107-close suggested next #1 — the calendar (the remaining
un-walked phone surface with the app's tightest grid geometry: 7
tracks in ~326px ≈ 43px cells). **The ANALYZE probes surfaced two
real defects before any guard was written** — the exact genus the
walk family exists to catch, both invisible to every standing gate:

### M-108c1 — the event chips render at CONTENT width

The chip spans in the month grid are INLINE boxes — `truncate`
(overflow:hidden + ellipsis + nowrap) never constrains an inline
element. LIVE-measured on the seeded build: **93-177px chips inside
43px cells at 390** (two pushing `main.scrollWidth` to **496** — a
horizontally-swipeable main at /calendar) and **134-203px chips
inside 97px cells at 1440** (7+ chips visibly overlapping the
neighboring cells' content); the `+N more` span the same genus.
Invisible to every gate: the drift sweeps run the ZERO-DATA state (no
events → no chips) and the ten-route overflow sweep asserts
`docScrollW` only (the document never overflows — main is the
scroller). The reference's own construction (the s76 L-76c9 bundle
decode) carries the same latent defect — un-live-verifiable at its
zero-data state; ours the documented superset (the mobile-nav
doctrine): **`block` on the chip + `+N more` spans makes the
truncation engage at every width**.

### M-108c2 — the 42-cell grid vs the reference's COMPLETE-WEEKS grid

The s76 M-76c8 decode gloss ("the grid is ALWAYS the UNTRIMMED 42
cells — 6 constant rows") is a MISDECODE. LIVE-probed on the
reference at five months: **Oct 2026 = 35 [Sep 27..Oct 31] · Nov 2026
= 35 [Nov 1..Dec 5] · Jan 2027 = 42 [Dec 27..Feb 6 — the 6-week
month] · Apr 2027 = 35 [Mar 28..May 1] · Jul 2026 = 35 [Jun 28..Aug
1]** — the COMPLETE-WEEKS model (eachDayOfInterval from the Sunday
before the 1st to the Saturday on-or-after the last: 28/35/42 as the
month demands), exactly the s51-era "trimmed render" the s51 test
comments describe. Ours rendered always-42 (Oct 2026 = 42 vs the
reference's 35). Invisible to every gate: the extra 6th row sits
BELOW the 900px sweep fold on both apps (VLM-verified off the sweep
screenshots — rows [27..3][4..10][11..17][18..24-cut]; the 0.01%
desktop calendar diff is fold-below) and no e2e pinned a cell count.
**The fix**: `calendarGrid`'s leading branch ceils to whole weeks
(`total = leading ? Math.ceil((offset + daysInMonth) / 7) * 7 :
daysInMonth`) — the page call byte-identical (the s76 GUARD source
pin keeps passing), `calendarFetchBounds` follows exactly (the N-51a
contract now with EQUALITY: Oct → Oct 31 · Nov → Dec 5 · Jan 2027 →
Feb 6 — the s51-era values returning as the bounds themselves).

## The ship (RED-first, stash-proven, induced-drift-proven)

- **The NEW tests/calendar-grid.test.ts** (3 its): the LIVE-verified
  members table (Feb 2026 = 28 · Oct/Nov 2026 = 35 · Jan 2027 = 42 ·
  Jul 2026/Apr 2027 = 35, each with its first/last cell + the
  not-42-for-October negative) · the structural invariants (whole
  weeks · Sunday-anchored · contiguous daily steps · the ceil formula
  · the 1st rendered — every month of 2026-2027) · the fetch-bounds
  alignment (the window's last day IS the rendered grid's last cell +
  the seam source form).
- **The calendar-cells chip pin** (+1 it): the block/truncate
  constructions + the retired inline-form negative.
- **The NEW tests/e2e/calendar-mobile.spec.ts** (the fourth-surface
  walk, +1 e2e): on the SEEDED e2e.db at 390×844 — docScrollW ≤ 390
  AND **mainScrollW ≤ 390 (the NEW inner-overflow assertion — the
  M-108c1 catcher; the s105/s106 walks assert docScrollW only)** ·
  the KPI ladder 4 cards ONE track gap-16 · the DOW grid 7 labels
  7-track gap-4 · the month grid the COMPLETE-WEEKS cell count
  computed in-test (never hardcoded) with 7 tracks and cells ≥ 40px ·
  **zero chips past their cell's right edge (the M-108c1 guard)** ·
  the Upcoming/Agenda single-track stack · a REAL Next-month click
  that increments the title and keeps the frame at 390.
  Non-vacuousness: the wrong-bound perturbation (mainScrollW ≤ 389 →
  FAILED live "Expected: <= 389, Received: 390" → restored → GREEN);
  one in-flight fix — the guard now waits for the events fetch
  (networkidle + the first chip visible) before measuring (the static
  shell paints ahead of fetchEvents).
- **The four audit finds fixed + pinned**: F-108a1 (the missing s107
  layer inserted into the project_state head + the H1 lockstep it
  gains the layer-axis assertions — the head's first two layers ===
  the last two sessions; the genus structurally retired) · F-108a2
  (SKILL §5.6 1530 lines / 182 checks + the PAD module-table row) ·
  F-108a3 (the reports-data row 279 + the reportsKpis purpose
  clause) · F-108a4 (DEPLOYMENT 27 handlers + the smoke-test.sh line
  → `bun run gate`) — all held by the NEW docs-counts four-site pin.
- **The count ladder**: E2E 135 → 136 · UNIT 1927 → 1932 (+3 +1 +1) ·
  SUITES 107 → 108 · badge 2062 → 2068 · the HEAD-line template "in 5
  spec" → "in 6 spec" (the spec-family census gains calendar-mobile)
  · the S16-P7 e2e `monthKids ≥ 35` re-anchored to `≥ 28` (the
  complete-weeks floor — a 28-cell February would have failed the old
  bound) · the probe ordinals 78/28th → 79/29th. In-flight: the
  dialog-geometry CLAUDE lockstep re-anchored (a FOURTH live-tense
  1927 site the plan missed — found at the full-suite run; the F-92a3
  carrier, +0 net).
- **RED-1**: **27 failed | 55 passed (82)** at the pre-realignment
  docs + the still-42 grid + the still-inline chips (the 19
  docs-counts + the N-79b1 carrier + the 3 calendar-grid + the chip
  pin + the 3 fetch-bounds re-anchors — enumerated by name; the plan
  predicted ≈23-24, the +3 the e2e-axis under-count), stash-proven
  (the seven files stashed → 77/77 → pop → 27 RED).
- **RED-2 (both induced-drift faces)**: the always-42 reversion → 6
  failed by name → restored → GREEN; the block removal → 1 failed by
  name → restored → GREEN.
- **The captures 166/167 + the VLM battery 4/4 + 4/4, zero
  adjudications**: 166 (the seeded calendar at 390×844 — docScrollW
  390 + mainScrollW 390 [pre-fix 496]) + 167 (the desktop 1440 — 35
  cells [pre-fix 42] + 12/12 chips truncated + maxChipW 79 ≤ cellW
  97). The VLM independently read October 2026, the complete-weeks
  grid (the last row 25-31 — no November row), the DOW labels, the
  contained chips with visible ellipses ("Weekly …", "Intro m…",
  "Product…", …), and clean render quality off BOTH viewports'
  pixels.

## The gate

lint 0/0 · tsc 0 · **1932/1932 unit (108 suites, +5 net)** · build ·
**136/136 e2e fresh CI=1 (3.3m, +1: the calendar-mobile guard green
inside the run)** · **the FOUR drift sweeps CLEAN** (desktop 1440 ·
phone 390 · tablet 768 · landscape 1024, each --fail-on-drift — no
re-baselining: both fixes only DECREASE ours-vs-reference diffs,
exactly as planned). The closing census MATCH (15/24/10/23/12 + 4
users); `.env.example` tracked, the 3 active vars standing; the tree
exactly as planned (17 modified + 5 new; src/ = the two fixes only).

Docs: README badge 2068 + the Tested row's s108 clause · AGENTS the
§Session-108 history block · PAD the s108 inventory row + the
F-108a2/a3 module-table rows · CLAUDE at 1932/136 + the
calendar-mobile pyramid clause · SKILL v1.105.0 (§16cv + project_state
[the s108 layer prepended + the missing s107 layer inserted] + the H1
+ the §5.6 fix + the Appendix B rows) · DEPLOYMENT (F-108a4) · this
log (session_218.md) + the s108 plan + its execution record + the
worklog.
