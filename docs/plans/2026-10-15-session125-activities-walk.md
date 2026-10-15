# Session 125 — the activities family walk + the active-pill fix

The 125-c rotation — the session_267 close's open decision resolved by
the staleness map: **the activities-list family** — the LAST
never-two-app-walked interactive family (the s124-calendar genus: s109
was the ours-only seeded 390 mobile walk; the drift gates screenshot
/activities at four viewports every session but zero-data PIXELS only;
the interactive rail/tab/quick-log contracts were never
two-app-compared; the reference was last live-probed at the s6-s13-era
DOM audits ~116 sessions ago + the s23 tab-strip measurement ~102
sessions).

## The walk design

The s115-s124 idiom: the walk scripts OUTSIDE the repo
(`/home/z/my-project/walks/walk15-activities-zero.ts` PASS 1 +
`walk16-activities-populated.ts` PASS 2), PORT 3141, login first on
both apps, both apps at 1440×900 + 390×844 with computed-style +
census extraction, the walk db riding the standing zero-data tool
(PASS 1) then the pristine seeded copy (PASS 2).

- **PASS 1 (zero-data, two-app)**: the shell (the h1 + the quick-log
  quartet — outline ×3 + the emerald Log WhatsApp); the KPI row (the 6
  BarStatCards — labels + zero values + the static
  trends/subValues/bars + the color map + the chrome + the 6-col
  grid); the Priority card (the h2 + the ghost More + the SEGMENTED
  TAB STRIP — the 4 tabs + the track + the active pill + the Overdue
  count badge ABSENT at zero + the four EMPTY STATES + the tab-switch
  semantics LIVE); the Timeline (the h2 + the ••• + the empty state);
  THE RAIL at 1440 (the Filters card: Filters + Save All + the
  Activity Type group + the 4 checkboxes + the Owner/Status selects +
  the More Filters (1) expander + the Filter button; the by-type
  card: the title + ••• + the STATIC "Last 2 days" subtitle + the
  5-bar chart + the 5 count chips + the footer checkbox family); THE
  INTERACTIONS (the type checkbox + the Save All reset + the expander
  + the Filter click); the quick-log dialog (the wide family + the
  label census + the type-select "Call" + the datetime-local + the
  Description textarea + the Log Activity submit + Cancel + Escape);
  the containment (docScrollW + mainScrollW + mainScrollH — the
  L-123c5 axis); the 390 face (the rail display:none + the KPI
  single-track + the tab strip + the quick-log wrap).
- **PASS 2 (populated, ours-only — the reference's zero-data genus)**:
  the KPI sextet == the db-derived windows (through OUR semantics: the
  7d createdAt range + the type/owner filters — the wall-clock
  discipline, expectations computed IN-TEST); the Overdue tab (the
  rows == the db overdue set in the API order + the initials avatar +
  the "Xh/Xd overdue" destructive badges + the red time + the count
  badge); the tab caps (NO cap on overdue/dueToday, slice(0,5) on
  upcoming/completed + the un-complete arm); the Timeline (the
  LONG-WEEKDAY groups + the tinted squares + the Related-to line +
  the owner + the type badge); the by-type chart + the 5 chips; THE
  FILTERED-BASIS CASCADE (the KPI values MOVE under the type filter —
  the OPPOSITE of the calendar's RAW doctrine); the Save All restore;
  THE TOGGLE ROUND-TRIP (the db-verified status flip + restore); THE
  QUICK-LOG CREATE ROUND-TRIP (the preset rides the submit — the db
  +1 whatsapp + the KPI flip + the timeline today-group + the delete
  restore).

## PASS 1 as walked (the standing tree): 3 raw diffs → 1 REAL finding

1. **F-125c1 — THE SEGMENTED ACTIVE-PILL BG (a real parity defect,
   BOTH surfaces, both widths)**: the active tab computes
   `rgb(249,250,251)` on ours vs `rgb(255,255,255)` on the reference
   — live-scoped by the four-way probe (ours + reference ×
   /activities + /settings): the tracks match (`rgb(245,245,245)`,
   h36), the inactive tabs match (transparent + `#737373`), the
   geometry matches — ONLY the active pill diverges. The root cause:
   the reference's own construction rides
   `data-[state=active]:bg-background`, which resolves to ITS stock
   shadcn zinc background `#ffffff`; our theme deliberately redefined
   `--color-background: #f9fafb` (the app's page bg — the visual
   spec), so the token ride silently drifted 6 rgb units — **the
   F-119c2 inverted-token-mapping genus** (the reference's `--primary`
   dark vs our blue; the token SEMANTICS diverge while the literal
   surfaces must match). Invisible to every prior gate: the pixel
   sweeps' 0.5% margin swallows a 6-rgb-unit pill on a 36px track,
   and no prior walk ever censused the active pill's computed bg (the
   s106/s115 settings walks measured the strip geometry + the trigger
   texts). The fix: the LITERAL `data-[state=active]:bg-white` (the
   F-119c2 doctrine — express the reference's computed value through
   the literal, never the divergent token).
2. **L-125c2 (adjudicated noise): the More Filters (1) expander** —
   ours EXPANDS (revealing the Task/Note group — the functional
   superset over the reference's documented dead stub; the
   fix-over-defect doctrine, the same genus as the dead Owner/Status
   selects ours also makes functional). Recorded, never reverted.

**The byte-equal contracts confirmed**: the shell (the h1 30px/700 +
the header geometry) · the quick-log quartet (all four buttons —
texts/rects/fonts/colors/bgs/borders/cursors/icons incl. the emerald
`rgb(5,150,105)` WhatsApp pair + the outline trio) · **the KPI row
(all 6 cards — labels/values 0/the static trends `+23%` up +
`2h overdue` down/the subValues "Due now"/"+7 today"/"+4 today"/"+1h
12m"/the 6-bar strips with the exact color map blue/red/cyan/green/
GRAY-for-purple/green + the heights + the card chrome + the 6col-16px
grid)** · the Priority card (the h2 + the ghost More + the card
chrome) · the tab strip (the 4 tabs — texts/rects/fonts/colors incl.
the active `#0a0a0a` text + the inactive `#737373` + the track
`rgb(245,245,245)` h-36 p-1 + the badge ABSENT at zero) · the four
empty states + the tab-switch semantics LIVE (all four panels swap +
the restore) · the Timeline (the h2 + the ••• + "No activities
found") · **the rail (the Filters card census — Filters + the ghost
Save All + the "Activity Type" group label + all 4 checkboxes
byte-equal with the 16×16 boxes unchecked + the Owner "All Owners" +
the Status "Last 7 Days" + the More Filters (1) + the Filter
button)** · the by-type card (the title + ••• + the STATIC "Last 2
days" + the chart + the 5 chips "Call 0"... + the footer checkbox +
the Activities label) · the quick-log dialog (the title "Log
Activity"/the rect/the label census incl. "Activity Type *" + "Date &
Time *" + "Description *" + the Related To pair/the type select
"Call"/the datetime-local/the textarea/the blue Log Activity
submit/Cancel/Escape-close) · the interactions (the checkbox check +
the Save All + the Filter click — no crashes, the empty states hold)
· the containment (docScrollW 1440/390 · mainScrollW · mainScrollH
both apps) · the 390 face (the rail display:none + the KPI
single-track grid + the tab strip + the quick-log wrap).

## PASS 2 as walked (ours-only): 49/49, every value db-verified

The KPI sextet (2/3/3/5/4/2 == the db-derived windows through the 7d
range) · the Overdue tab (the count badge "Overdue3" + the 3 rows in
the API order + the Tomas Novak initials + the "3d overdue"
destructive `rgb(239,68,68)` badge + the red `rgb(220,38,38)` time +
the subject + the toggle) · the tab caps (dueToday 2 · upcoming
min(5,7)=5 · completed min(5,5)=5 + the un-complete arm) · the
Timeline (13 groups == the db + the task tint gray + the subject +
the owner Sara Chen + the Task badge) · the by-type chips (Call 5 /
Email 3 / Meeting 4 / Task 3 / Note 0 == the db + the bar scale) ·
**THE FILTERED-BASIS CASCADE (the Call checkbox → the KPI quartet
moves — 1/0/0/0/5 + the overdue badge 2 + the chips follow + the
Save All restore)** · **THE TOGGLE ROUND-TRIP (the db flips
overdue 3→2 completed 5→6 + the KPI flip + the row leaves + the
un-toggle restores 3/5)** · **THE QUICK-LOG CREATE (the dialog + the
visible type stays "Call" + the db +1 whatsapp with the preset riding
the submit + the KPI flip 2→3 + the timeline gains the today group +
the delete restores)**.

## The remediation (the active-pill fix + the walk pins)

- **D-125a0**: THE SEGMENTED ACTIVE-PILL FIX (src/lib/page-layout.ts
  TABS_SEGMENTED.trigger — `data-[state=active]:bg-background` →
  `data-[state=active]:bg-white`, the F-119c2 literal doctrine; fixes
  BOTH segmented surfaces: /activities + /settings).
- **D-125a1**: THE ACTIVE-PILL PIN (page-layout.test.ts — the
  s12 trigger pin re-anchored to the literal + the retired
  token-ride negative; RED-first against the standing source).
- **D-125a2**: THE TAB-LABEL + EMPTY-STATE QUARTET PINS (+1 it,
  activities-calendar-parity — the four tab labels in order + the
  four empty-state literals in order, never pinned as sets).
- **D-125a3**: THE KPI LABEL-SEXTET + FILTERED-BASIS PIN (+1 it —
  the six labels in order [the D-117a2/D-118a1 genus] + the KPI
  derivations reading baseFiltered [the OPPOSITE-of-calendar
  doctrine: the filters MOVE the KPI values] + the range fold-in).
- **D-125a4**: THE API-ORDER PIN (+1 it — the activities route's
  `orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }]`, the render
  order the PASS 2 rows verified against).
- **D-125a5**: THE QUICK-LOG PRESET + TOGGLE-ARM PINS (+1 it — the
  `type: activity ? form.type : (defaultType || form.type)` submit
  construction [the preset rides the submit] + the toggleComplete
  scheduled↔completed flip + the un-complete arm label).
- **D-125a6**: THE BY-TYPE VOCABULARY PIN (+1 it — the
  BY_TYPE_CATEGORIES quintet [call/email/meeting/task/note] with
  WhatsApp NEVER a chart series).
- **D-125a7**: the docs realignment + the captures 228-231 + the
  session records.

## The verification ladder

RED-first (the a1 pin against the standing source) → the fix → GREEN
→ **the stash-proofs** (the src change reverted alone → its pin REDs
alone; each walk pin's guarded content reverted alone → its pin REDs
alone) → the full suite → the final gate (lint 0/0 · tsc 0 · unit ·
build · e2e 137/137 · the closing drift sweep · census MATCH) → the
POST-FIX PASS 1 re-run (the active-pill byte-equal) → the captures +
the VLM battery → the commit + the SSH-wrapper push.

## The count ladder (as planned)

UNIT 1991 → 2000 (+9: +1 page-layout [the F-125c1
re-anchor] + +8 activities-calendar-parity [the walk pins]); SUITES
110 UNCHANGED; E2E 137 UNCHANGED; badge 2128 → 2137.

## The execution record (as shipped)

- **D-125a0 shipped**: the TABS_SEGMENTED.trigger active arm
  `bg-background` → `bg-white` (the F-119c2 literal doctrine — the
  reference's token resolves to ITS stock white; ours redefined the
  token to the page bg, the literal restores the computed parity on
  both segmented surfaces).
- **D-125a1 shipped**: the s12 trigger pin re-anchored (the literal +
  the `not bg-background` negative on the active arm) — RED-first
  verified (1 failed at the standing source), GREEN post-fix.
- **D-125a2 shipped**: the tab-label quartet + empty-state quartet pins
  (+2 its).
- **D-125a3 shipped**: the KPI label-sextet pin + the filtered-basis
  doctrine pin (+2 its).
- **D-125a4 shipped**: the activities API-order pin (+1 it).
- **D-125a5 shipped**: the quick-log preset pin + the toggle-arm pin
  (+2 its).
- **D-125a6 shipped**: the by-type vocabulary pin (+1 it).
- **D-125a7 shipped**: session_268.md + this record + the worklog +
  the SKILL/README/AGENTS/CLAUDE/PAD realignment + the captures
  228-231 + the VLM battery.
- **The count ladder as shipped**: UNIT 1991→2000 (+9, all in
  EXISTING files) · SUITES 110 UNCHANGED · E2E 137 UNCHANGED ·
  badge 2128→2137.
- **The stash-proofs**: the src fix reverted alone → its pin REDs
  alone; the walk pins' guarded content reverted alone → each REDs
  alone.
- **The gate**: lint 0/0 · tsc 0 · 110/2000 · build · 137/137 · the
  closing drift sweep CLEAN on all four gates · census MATCH.
- **The live verification ladder**: the POST-FIX PASS 1 re-run — the
  active pill byte-equal `rgb(255,255,255)` both apps both surfaces ·
  PASS 2 populated ours-only 49/49 db-verified · the VLM battery 4/4
  × 4 CLEAN.
