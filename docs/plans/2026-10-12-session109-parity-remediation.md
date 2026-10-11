# Session-109 Parity Remediation Plan (2026-10-12)

Session 109 on `main` @ `520284f` (the s108 ship `2f0798a` + the two
session-log follow-ups `e508db3`/`520284f` = session_219.md +
session_220.md). The workspace carried over (no reset): `git pull`
`e508db3..520284f`; the environment standing (bun install 533 pkgs; the
3-var `.env` contract `DATABASE_URL="file:../db/custom.db"` +
AUTH_SECRET + NEXT_PUBLIC_SITE_URL; census MATCH 15/24/10/23/12 + 4
users; chromium v1243). Every op under `env -u DATABASE_URL` (the
shell's stray hazard, re-confirmed). The repo `skills/` folder excluded
from checking/testing/compilation throughout.

## Baseline gate

- lint 0/0 ✓ · tsc 0 ✓ · 108 files / 1932 tests ALL PASSING (15.0s) ✓ ·
  build ✓ · 136/136 e2e fresh CI=1 (3.1m) ✓ — exactly the s108 ship
  state. ONE load-sensitive flake en route: the S72-P2 debounce test
  (crm.spec.ts:2477) failed on the first full-suite run, passed in
  isolation + on the re-run — the 1200ms settle window's known variance
  genus (recorded, no code change; the standing construction is the
  s72-annotated contract).

## The audits

- **109-a (subagent)**: the s108 ship delta (`8cecd4f..520284f`, 3
  commits, 23 files +1443/−94 in the feat) **GENUINE 9/9** — the two
  src/ fixes verified hunk-by-hunk (the complete-weeks seam
  `total = leading ? Math.ceil((offset + daysInMonth) / 7) * 7 :
  daysInMonth` + the block chips); the calendar-grid suite (3 its) +
  the chip pin + the fetch-bounds re-anchors; the calendar-mobile guard
  (the NEW mainScrollW inner-overflow assertion); the four audit finds
  (F-108a1 the layer chain s98→s108 consecutive, no layer missing; the
  F-108a2/a3/a4 doc sites); the count ladder; the captures 166/167
  valid PNGs; the docs realignment; the e2e census 136. Non-vacuousness
  reproduced EXACT: the mixed state **27 failed | 55 passed (82)** —
  the recorded RED-1, all 27 by name; the native pre-s108 **77/77**.
  Findings: **F-109a1 REAL** (PAD:1345 the format.ts row "336" vs live
  **350** — the M-108c2 seam edit itself; the ship fixed the
  page-layout/reports-data rows but not the row of the very file it
  modified — the F-108a3 genus recurring at birth, the module-table
  still unpinned) + **F-109a2 REAL** (the SKILL header cluster, 7
  pre-existing stale line-count sites, all unchanged at 8cecd4f —
  newly surfaced: :194 globals.css "171" vs live **413** · :325
  entity-dialogs "1081" vs **1222** · :341 mobile-nav "170" vs **206**
  · :539 schema.prisma "242" vs **244** · :553 seed.ts "468" vs **466**
  · :581 auth.ts "133" vs **153** · :6312 types/index.ts "277" vs
  **276**) + **F-109a3 REAL** (PAD:1348 login-reset "275" vs live
  **279** — N-108a5's face, unfixed + unpinned) + N-109a4-6
  record-only (PAD:1362 settings-mobile "~95" vs live **106** — the
  at-birth undercount; the Appendix B past-tense parenthetical; the
  dated-history matches).
- **109-b (subagent)**: the standing-layers audit **9/9 PASS — ZERO
  graduations** (~66th consecutive; `git diff 2f0798a..HEAD -- src/` =
  0 bytes). The ledger live 108/1932 ALL PASSING. The CSV census 17
  sites ZERO unguarded, ZERO line drift. Source-vocabulary
  byte-identical since s90. The config layer verified (all six configs
  0-byte diff; vitest include + the playwright setup/chromium + port
  3100 + CI=1 fresh boot + `reuseExistingServer: !CI`). The SEO/sitemap
  layer **46/46 LIVE first-run clean** (standing build PORT 3124, one
  invocation, boot→checks→kill; sitemap 9 urls 1.0/0.8 weekly · robots
  exact · manifest · og-image 1200×630 · all 9 routes' per-route
  titles; N-109b2: the served sitemap carries NO lastmod element — the
  s18 byte-verified reference format). The mobile-nav contract INTACT
  (the 10-test battery + MOBILE_NAV_E2E=10 + all SEVEN phrase sites +
  the arithmetic 11+111+10+1+1+1+1=136, zero weakened assertions). The
  globals.css v4 re-pins PRESENT (literal-hex @theme, @utility family,
  zero @layer utilities, the vendored tw-animate.css import). Both
  operator decisions STANDING (the 69th). The probe ordinals verified
  at 79/29th.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 80th consecutive**;
  census #105: demo zero · desktop 256px/8 STANDING · the mobile-nav
  defect STANDS at TRUE 390 (the 30th consecutive — the reference's own
  bug, our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each — census MATCH).
- **The drawer battery at TRUE 390×844 FULLY GREEN live — exit 0** (the
  trigger · panel w-72 · 8 links · focus inside · the dual body+main
  scroll lock · navigate-close → /Leads with the full release · Escape ·
  the resize-past-md auto-close + release; `bun scripts/drawer-battery-390.ts`).
- **The scandihaven patterns re-checked** (Next.js 16.3 + React 19.2 +
  TS 5.9 strict + Tailwind v4 CSS-first `@theme` literal hex + Radix +
  Zustand + Vitest/Playwright — on-pattern; the 218-skill catalog
  mirrors the neo-crm families, nothing new to adopt).

## The rotation (109-c) — THE FIFTH-SURFACE SEEDED MOBILE WALK + THE LIVE FIND

The s108-close suggested next #1 (the fifth-surface seeded walk — the
activities, the LAST un-walked phone surface; the spec-family census
today: auth, crm, mobile-navigation, reports-mobile, settings-mobile,
calendar-mobile). The ANALYZE probes (throwaways
`scripts/analyze-activities-390.ts` + `analyze-bytype-390.ts` +
`analyze-quicklog-390.ts` + `analyze-fixtest-390.ts`, deleted after
use) mapped the seeded activities at 390×844 on the standing build
(PORT 3126-3129) and surfaced ONE REAL FIND + two resolved mysteries:

### M-109c1 — the priority row's right cluster overflows the 390px frame

LIVE-measured on the seeded build: the Priority Activities rows carry
an un-shrinkable right cluster — the time span (40px) + the ghost
"Check as completed" text button (174px at min-content) + the 20px
iconSm edit button + two 8px gaps = **249px min-content** — inside the
326px panel (content box 302 after `p-3`): the left cluster
(`flex-1`, min-content 182) + the right cluster (249) = 431 > 302, so
the right cluster lays out past the row's edge to **right=475** —
**98px past the viewport, `main.scrollWidth` = 488** (a
horizontally-swipeable main at /activities, the M-108c1 genus exactly).
Invisible to every standing gate: the drift sweeps run the ZERO-DATA
state (no activities → no rows), the ten-route overflow sweep asserts
`docScrollW` only (the document never overflows — main is the
scroller), and the existing e2e activities tests run at desktop
widths. The reference's own construction (the s76 `vx` bundle decode)
carries the same latent defect — un-live-verifiable at its zero-data
state; ours the **documented superset** (the mobile-nav doctrine): the
row's clusters become shrinkable and the button label truncates, so
the row fits at every width.

**The fix (one file, `src/app/(app)/activities/activities-page.tsx`,
the PriorityRows function — the M-108c1 doctrine generalized to
flex):**
- the left cluster `flex items-center gap-3 flex-1` gains **`min-w-0`**
  (its inner text block `flex-1` gains **`min-w-0`** — the
  name/subject wrap vertically instead of forcing the line);
- the right cluster `flex items-center gap-2` gains **`min-w-0`**;
- the check button `className="text-xs"` gains **`min-w-0`** and its
  raw text label becomes **`<span className="min-w-0 truncate">Check
  as completed</span>`** (the truncate-engages doctrine — a raw text
  node cannot shrink; the span can, and the button's `aria-label`
  already covers the truncated read).

**VALIDATED LIVE by class injection before planning**: BEFORE
mainScrollW 488 → AFTER **mainScrollW 390** (rowRight 358; the cluster
relaxed to 274 with the button at its natural 174 — the left block's
new shrinkability absorbs the constraint; the truncate engages only on
longer rows). Desktop (1440) unchanged — the classes are inert without
constraint; the drift sweeps run zero-data (no rows) so both faces are
invisible to them — NO re-baselining.

### The two resolved mysteries (recorded so no future session re-hunts them)

- **The by-type chart "w=0" at 390 is NOT a defect**: the whole rail
  (the Filters card + the Activities-by-Type card) is `hidden lg:block`
  — display:none below lg, on BOTH apps (the reference's own
  desktop-only model, live-verified at 390 on both). At 1440: the
  chart container 270×150, 5 bars, byte-identical both apps.
- **The quick-log row is SAFE at 390**: the four buttons wrap 2×2
  (h=72, right ≤ 374 < 390) — no header offender exists.

### The parity baseline mapped (both apps, 390×844)

The KPI ladder: 6 cards ONE track gap-16 cardW 358 (identical
construction strings on both apps); the segmented tab strip: 4
triggers 4 tracks w=326 (the reference's Overdue tab carries no badge
at its zero data — ours reads the live seeded count 3, the N-66d >0
guard); the timeline: the LONG-WEEKDAY h3 headers (12 on the seed) +
the Card p-4 rows (310 wide, body 220 — fits); docScrollW 390 on both.

### S109-P1 (the src fix — one file, four class strings + the span)

As characterized above. The `aria-label`s, the tint maps, the click
contracts unchanged. The `Check as completed` string stays (the span's
text) — the existing pins keep passing.

### S109-P2 (the unit pin — +1 it in tests/activities-calendar-parity.test.ts)

The source-level pin (the suite's region idiom, the s108 chip-pin
pattern): the left cluster carries `flex items-center gap-3 flex-1
min-w-0` + the inner text block `flex-1 min-w-0`; the right cluster
carries `flex items-center gap-2 min-w-0`; the check button carries
`className="text-xs min-w-0"` and its label the `<span className=
"min-w-0 truncate">Check as completed</span>` form; the retired
raw-label negative (the bare text after the CircleCheck icon never
returns). The M-109c1 fix pinned (an unshrinkable cluster fails the
pin).

### S109-P3 (the NEW tests/e2e/activities-mobile.spec.ts — the walk, +1 e2e)

On the SEEDED e2e.db at 390×844 (the s105-s108 pattern, one test
block, the s106/s108 spec template): `/activities` asserts docScrollW
≤ 390 · **mainScrollW ≤ 390 (the M-109c1 catcher — the s108
inner-overflow assertion family)** · the KPI grid (the first `.grid` in
main — the PAGE_KPI_GRIDS root) 6 cards · ONE track · gap 16px · the
segmented tab strip 4 triggers · 4 tracks · the Overdue tab's badge
=== the active panel's row count (self-consistent, never hardcoded)
· **every priority row's right edge ≤ the panel's right edge + 1px
(the truncation-engaged guard, the s108 chip-guard analog)** · the
timeline: ≥ 1 LONG-WEEKDAY h3 + single-column rows · the rail
display:none at 390 (the `hidden lg:block` filters + by-type cards —
the reference's own model) · the quick-log row: 4 buttons, none past
390 · a REAL tab switch (Overdue → Completed) that swaps the panel and
keeps the frame at 390. The guard waits networkidle + the first
timeline row visible before measuring (the s108 events-fetch-wait
lesson). Non-vacuousness by the wrong-bound perturbation — mainScrollW
≤ 389 → FAILED live → restored → GREEN.

### S109-P4 (the audit finds + the NEW line-census pin)

- **F-109a1**: PAD:1345 `| \`src/lib/format.ts\` | 336 |` → **350**.
- **F-109a3**: PAD:1348 `| \`src/lib/login-reset.ts\` | 275 |` → **279**.
- **N-109a4 exact-ification**: PAD:1362 settings-mobile "~95" → **106**;
  the tilde forms exact-ified: PAD entity-dialogs "~1222" → **1222**,
  PAD mobile-nav spec "~277" → **277**, PAD reports-mobile "~110" →
  **110** (all values already live; the tilde is the F-108a3 "~213"
  genus — approximate forms drift).
- **F-109a2**: the SKILL header cluster — :194 "(171 lines)" → **(413
  lines)** · :325 "(1081 lines)" → **(1222 lines)** · :341 "(170
  lines)" → **(206 lines)** · :539 "(242 lines)" → **(244 lines)** ·
  :553 "(468 lines)" → **(466 lines)** · :581 "(133 lines)" → **(153
  lines)** · :6312 "(277 lines)" → **(276 lines)**.
- **The pin (the NEW docs-counts line-census it — the LIVE-CENSUS
  design, stronger than the four-site form)**: for each of the 13
  sites the it reads the SOURCE file live (readFileSync + line count)
  and asserts the doc's stated number === the live count — the next
  staleness (either face: a doc edit OR a source growth) fails `bun
  run test`. The census pairs: PAD format.ts 350 · PAD login-reset 279
  · PAD settings-mobile spec 106 · PAD entity-dialogs 1222 · PAD
  mobile-nav spec 277 · PAD reports-mobile spec 110 · SKILL globals.css
  413 · SKILL entity-dialogs 1222 · SKILL mobile-nav 206 · SKILL
  schema.prisma 244 · SKILL seed.ts 466 · SKILL auth.ts 153 · SKILL
  types/index.ts 276.

### S109-P5 (the count ladder + the probe ordinals)

`UNIT` 1932 → **1934** (+1 the activities-calendar-parity row pin + 1
the docs-counts census it); `SUITES` **108 unchanged** (both pins land
in EXISTING files — no new suite); `E2E` 136 → **137** (the
activities-mobile guard in a NEW spec file — the mobile-nav battery
stays 10); badge 2068 → **2071** (the badge formula UNIT+E2E: 1934+137 —
validated at plan time; the first draft's 2074 was an arithmetic slip,
corrected before RED-1); the HEAD-line template "in 6 spec" →
**"in 7 spec"** (the spec-family census gains activities-mobile —
auth, crm, mobile-navigation, reports-mobile, settings-mobile,
calendar-mobile, activities-mobile); the e2e arithmetic
11+111+10+1+1+1+1+**1** = 137; the retired 1932/136/2068/"in 6 spec"
constructions join the negatives ladders; the N-79b1 carrier gains the
"**E2E (Playwright, 136 checks)**" negative; the dialog-geometry CLAUDE
lockstep re-anchored 1932 → **1934** (the F-92a3 carrier's three sites
+ the s104-s108 carry-forward comment); the probe ordinals 79/29th →
**80/30th** (scripts/drift-probe.ts header + the test echo + the it
title).

### S109-P6 (the captures + the VLM battery)

The throwaway capture script (the s104-s108 pattern — repo-internal,
deleted after use): **168** (the SEEDED activities at 390×844 — the
KPI ladder + the wrapped quick-log row + the priority rows with the
fitting right cluster) + **169** (the desktop 1440 — the two-column
lg:block rail + the by-type chart + the untruncated rows). The VLM
battery per the house protocol, 4 checks per capture: structure ·
content · layout-fit · render quality — with the wrapped quick-log
row, the contained priority rows (no horizontal swipe), and the
right-column rail the reads on 168/169.

## The RED plan (TDD)

- **RED-1 (the count ladder + the fix's pins + the census)**: the
  docs-counts constants re-anchored FIRST (UNIT 1934 + E2E 137 + badge
  2071 + the HEAD "in 7 spec" + the spec-family census + the e2e
  arithmetic + the new 1932/136/2068/"in 6 spec" negatives + the NEW
  line-census it) + the H1/project_state lockstep re-anchored (the
  counts face 1934+137 — the layer face asserts the s109 layer once
  prepended at GREEN) + the NEW activities-calendar-parity row pin
  (RED against the still-unshrinkable clusters) + the N-79b1 carrier's
  new negative + the dialog-geometry lockstep re-anchor → run the
  affected suites against the still-old src/docs → the failures
  enumerated by name. Expected ≈ 21-24 failed (the ~17 docs-counts
  unit-axis pins + the stale-forms negatives it + the H1 lockstep +
  the NEW census it [the docs still stale] + the NEW row pin + the
  dialog-geometry lockstep), stash-proven (stash the test files → the
  pre-fix state → all green → pop → the RED re-confirmed).
- **GREEN**: the one src/ fix (S109-P1) + the doc realignment (README ·
  AGENTS · CLAUDE · PAD [the module-table rows + the tree/Total/HEAD
  "in 7 spec" + the s109 inventory row] · SKILL v1.106.0 [frontmatter
  + the H1 + the project_state — the s109 layer prepended + §16cw +
  the Appendix B rows (7 spec files | 137 + the activities-mobile row +
  the wall-clock)] + session_221.md + the plan's execution record) →
  all green.
- **RED-2 (the fix's induced drift)**: the perturbation — `min-w-0`
  removed from the right cluster (the pre-fix form restored) → the row
  pin FAILS by name → restored → GREEN. (The e2e face: the guard's
  wrong-bound perturbation mainScrollW ≤ 389 → FAILED live → restored
  → GREEN.)

## Blast radius (pre-checked)

- **src/ (ONE file)**: `src/app/(app)/activities/activities-page.tsx`
  (the PriorityRows function — four class strings + the label span;
  the M-108c1 doctrine).
- tests/activities-calendar-parity.test.ts (+1 it),
  tests/docs-counts.test.ts (the ladder + the census it),
  tests/login-family-parity.test.ts (the N-79b1 negative),
  tests/dialog-geometry-parity.test.ts (the lockstep re-anchor),
  tests/e2e/activities-mobile.spec.ts (NEW — 1 test),
  scripts/drift-probe.ts + tests/drift-probe-tool.test.ts (the
  ordinals), the docs family (README · AGENTS · CLAUDE · PAD · SKILL
  v1.106.0 · session_221.md · this plan · the worklog · screenshots
  168/169 NEW).
- **The e2e compatibility pre-checked**: the existing crm.spec
  activities tests (the by-type family, the timeline, the
  quick-log margins) run at DESKTOP widths — the fix is inert without
  constraint; the s76 parity suite's row pins
  (`hover:bg-gray-50 rounded-lg border-b`, `p-3`, the avatar box, the
  destructive badge, "Check as completed") all keep passing — the fix
  only ADDS classes; the S16-P7-class monthKids assertions unaffected
  (calendar untouched this session).
- **The drift gates**: the fix is invisible at the zero-data sweep
  state (no rows render) — the four sweeps re-run inside gate:full,
  NO re-baselining.
- The vitest config untouched (the include glob covers the existing
  files); the playwright config untouched (the setup project feeds the
  new spec); the gate:full chain unchanged; the census contract
  untouched.

## The execution record (2026-10-12, session-109)

Executed RED-first, with the plan holding (one in-flight addition, documented):

- **RED-1 (the count ladder + the fix's pins + the census)**: the
  docs-counts constants re-anchored (UNIT 1934 + E2E 137 + badge 2071
  [the arithmetic slip 2074 caught and corrected at plan validation] +
  the HEAD "in 7 spec" + the spec-family census + the e2e arithmetic +
  the new 1932/136/2068/"in 6 spec" negatives + the NEW line-census
  it) + the H1/project_state lockstep re-anchored (the counts face +
  the layer face: FIRST=s109, SECOND=s108) + the NEW
  activities-calendar-parity row pin + the N-79b1 carrier negative +
  the dialog-geometry lockstep re-anchor → **22 failed | 107 passed
  (129)** at the pre-realignment docs + the still-unshrinkable
  clusters — the 19 docs-counts (16 count-axis + the H1 lockstep + the
  Appendix B [the in-flight addition: the Appendix B e2e-total pin
  needed the 6→7 spec files re-anchor, missed in the first RED pass])
  + the N-79b1 carrier + the dialog-geometry lockstep + the row pin,
  enumerated by name (the plan predicted ≈21-24). **Stash-proven**:
  the seven files stashed (with -u) → **127/127** (the s108-ship
  state) → pop → **22 RED** re-confirmed → the GREEN.
- **GREEN (the fix + the realignment)**: the one src/ fix (the
  PriorityRows clusters: `flex items-center gap-3 flex-1 min-w-0` +
  the inner `"flex-1 min-w-0"` + `flex items-center gap-2 min-w-0` +
  the `className="text-xs min-w-0"` button + the `<span className=
  "min-w-0 truncate">Check as completed</span>` label + the M-109c1
  comment block) + the full doc realignment (README badge 2071 + the
  tree/commands/Tested [the s109 clause] · AGENTS commands/gate-order
  + the §Session-109 history block · CLAUDE the four unit sites + the
  e2e sites + the pyramid clause · PAD tree/Total/HEAD "in 7 spec" +
  checklist/commands + the footnote spec-family list + the s109
  inventory row + the module-table census rows [format.ts 350 ·
  login-reset 279 · settings-mobile 106 · the tilde forms
  exact-ified] · SKILL v1.106.0 [frontmatter + the H1 + the
  project_state — the s109 layer prepended + the seven header-cluster
  sites + §16cw + the Appendix B rows + the wall-clock] · session_221
  + this plan) → the full suite **108 files / 1934 tests ALL PASSING**
  (+2 net).
- **RED-2 (the fix's induced drift)**: the perturbation — `min-w-0`
  removed from the right cluster (the pre-fix form restored) → the
  row pin **FAILED by name** (1 failed | 40 passed) → restored →
  **GREEN (41/41)**. The src/ diff exactly as planned (ONE file,
  +21/−6).
- **The e2e guard's own non-vacuousness (the wrong-bound proof)**:
  mainScrollW ≤ 389 → **FAILED live ("Expected: <= 389, Received:
  390")** → restored → GREEN. The full e2e run: **137/137 fresh CI=1
  (3.1m, +1: the activities-mobile guard green inside the run — on
  its FIRST run, no in-flight fix needed; the s108 events-fetch-wait
  lesson applied at construction)**.
- **S109-P6 (the captures + the VLM battery)**: the throwaway capture
  script (boot → captures → kill in one invocation; PORT 3130). The
  captures **168** (the seeded activities at 390×844, the
  priority-rows region scrolled into view — the 6 stacked KPI cards
  push it below the fold) + **169** (the desktop 1440) — the live
  geometry read off the captures' own probes: 168 = docScrollW 390 +
  **mainScrollW 390** (pre-fix 488 — the M-109c1 fix verified live) +
  the KPI ladder 6 cards + the quick-log 4 buttons + the priority rows
  3 with **rowClusterMaxRight 346** (pre-fix 475 — the clusters
  contained) + the rail display:none · 169 = the rail display:block +
  the by-type chart 270 wide with 5 bars. **The VLM battery 4/4 +
  4/4, zero adjudications**: the VLM independently read the
  truncation ellipses ("pricing call-back…", "follow-up:…",
  "proposal revision v3…"), the per-row time + "Check as completed" +
  edit icon, the full containment at 390 ("nothing is horizontally
  cut off"), and off the desktop pixels the two-column rail (the
  Filters card with its checkboxes/selects + the by-type chart with
  the live chip counts Call 5 · Email 3 · Meeting 3 · WhatsApp 2).
- **GATE**: lint 0/0 · tsc 0 · 1934/1934 unit [108 suites, +2 net] ·
  build · **137/137 e2e fresh CI=1 (3.1m)** + the four drift sweeps
  CLEAN (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each
  --fail-on-drift — NO re-baselining: the fix is invisible at the
  zero-data sweep state, no rows render). The closing census MATCH;
  `.env.example` tracked, the 3 active vars standing; the tree
  exactly as planned (src/ = the ONE fix file; the seven test/script
  files; the docs family; the two captures).
