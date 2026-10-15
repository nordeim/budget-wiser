# Session 124 — the calendar family walk + the pin-only remediation

The 124-c rotation — the session_265 close's named candidate: the
**calendar surfaces** (never two-app-walked; s108 was the ours-only
seeded 390 e2e walk; the drift gates screenshot /calendar at four
viewports every session but zero-data PIXELS only — the interactive
rail contracts were never two-app-compared).

## The walk design

The s115-s123 idiom: the walk scripts OUTSIDE the repo
(`/home/z/my-project/walks/walk13-calendar-zero.ts` PASS 1 +
`walk14-calendar-populated.ts` PASS 2), PORT 3141, login first on both
apps, both apps at 1440×900 + 390×844 with computed-style + census
extraction, the walk db riding the standing zero-data tool (PASS 1) then
the pristine seeded copy (PASS 2).

- **PASS 1 (zero-data, two-app)**: the shell (the h1 + subtitle + the
  header search + the New Event toolbar button); the KPI row (the 4
  TrendStatCards — labels + values + trends + icon boxes + chrome);
  the month card (the h2 + the nav trio + the 7-label DOW grid + the
  COMPLETE-WEEKS grid — the in-test cell-count expectation + the today
  pill + the out-of-month faces + the cell pitch); the Upcoming +
  Agenda cards (the h3 pair + the empty states); THE FILTER RAIL (the
  320×430 card + Filters + the Clear All blue link + the Type/Date
  groups + the 10 checkbox census + **THE RADIO SEMANTICS
  INTERACTION — the L-76c5 decode LIVE-verified two-app for the first
  time** + the type-multi + the Clear All reset); the New Event dialog
  (the wide family census + Escape); the month-nav round-trip; the
  containment (docScrollW + mainScrollW + **mainScrollH — the L-123c5
  scroll-extent axis**); the 390 face (the rail hidden + the Today nav
  hidden).
- **PASS 2 (populated, ours-only — the reference's zero-data genus)**:
  the KPI values == the db-derived windows (today/total/meetings-week/
  calls-week); the month-grid chips (count/tint/dot/title per day ==
  the db + the block-truncate + today's white/20 + no "+N more" in the
  seed); THE CHIP → EDIT DIALOG (the unpinned edit arm — the dialog
  opens with the event's title prefilled + the Update Event submit);
  the Upcoming rows == the db's [now,+7d) scheduled desc slice(0,5)
  (the tall-bar + the MMM d, h:mm a time + the account-first related
  line + the ghost trio with the Phone-on-call conditional); the
  Agenda rows == the desc slice(0,10) (the weekday-bullet time + the
  40×40 tinted square + the menu); THE FILTERING INTERACTIONS (the
  Calls type filter → the agenda + the grid chips filter + the KPI
  raw-basis under filters; the This Week radio; Clear All; the
  search); THE CREATE/DELETE ROUND-TRIP (db-verified mutations + the
  KPI flip + the chip on its chipless day); the month-nav with data.

## PASS 1 as walked (the standing tree): 2 raw diffs → 0 REAL findings

1. **mc.nav.census (both widths)**: ours carries
   `aria-label="Previous month"` / `"Next month"` on the icon-only nav
   buttons; the reference's compute EMPTY accessible names. Geometry
   byte-equal everywhere (36×36 flex white both; Today 75×36 at 1440,
   0×0/none at 390 — identical behavior on both apps). **L-124c1
   (adjudicated noise): the month-nav aria-label superset — ours the
   a11y superset over the reference's unnamed icon-only buttons (the
   mobile-nav doctrine genus: the reference's own a11y defect, fixed
   in ours, never copied).**

**The byte-equal contracts confirmed**: the KPI row (all four cards —
labels / values 0 / the static trends +3/+34/+2/+3 / the 20×20 icons
with the exact hexes / the iconBoxes / cardRects 268×138 / the card
chrome / the 4col-16px grid) · the month card (the h2 "October 2026"
24px/700 · cardRect 776×666 · cardPad 24px · the DOW labels +
14px/600 · **the complete-weeks grid 35 cells == the in-test
expectation on BOTH apps** · the first/last cell faces · the today
pill idx 18 "15" rgb(37,99,235) · the midCell · cellRect 97×96 ·
radius 8px · gap 8px) · the shell (the h1/subtitle/search/New Event)
· the empty-state pair · **the rail (all 10 checkboxes byte-equal —
labels in order + 16×16 boxes + unchecked + transparent bg; the
Type/Date groups 14px/600; the Clear All #2563eb 12px link; the rail
card 320×430; the wrap 320×872)** · **the radio semantics LIVE
(tomorrow1=true → tomorrow2=false + thisWeek=true — BOTH apps)** ·
the type-multi (true|true both) · the Clear All reset (false|false
both) · the New Event dialog (the title/rect 672×634/the label census
incl. "Title *" + "Event Type *" + the datetime-local pair/the Create
Event blue submit 123×36/Cancel/Escape-close) · the month-nav
round-trip (November 2026 → October 2026 both) · the containment
(docScrollW 1440/390 · mainScrollW · **mainScrollH 1182@1440 +
1750@390 — both apps, the L-123c5 axis**).

## PASS 2 as walked (ours-only): 44/44, every value db-verified

The KPI quartet (2/12/3/1 == the db windows) · the 12 chips for the
12 current-month events + no extras + the tint map + today's
white/20 + the block-truncate + no "+N more" · the chip → Edit Event
dialog with the prefilled title + the Update Event submit · the
Upcoming 5 == the db window slice(0,5) + the tall-bar bg/dot +
8×48 + the MMM d, h:mm a + the account-first related line + the ghost
trio + the Phone-on-call · the Agenda 10 == the desc slice(0,10) +
the weekday-bullet time + the 40×40 square/dot + the menu Edit,Delete
· the Calls filter (agenda 3 == the db calls + the chips filter + the
KPI raw-basis) · the This Week radio (agenda 5 == the db window) ·
the Clear All restore · the search "demo" (1 == the db match) · the
create round-trip (db +1 + KPI 13 + the chip on its chipless day) +
the delete restore (db 0 + KPI 12) · the month-nav (November
chipless → back 12 chips).

## The remediation (pin-only + one hygiene retirement)

- **D-124a0**: THE RAIL VOCABULARY PINS (+2 its,
  activities-calendar-parity) — the six TYPE_FILTERS pairs +
  the four DATE_FILTERS pairs verbatim.
- **D-124a1**: THE CLEAR ALL + EMPTY-STATE PINS (+2 its) — the blue
  text-link construction + the dual reset (setFilters({}) +
  setDateRange(null)); the "No upcoming events" / "No events found"
  pair + the text-center text-gray-500 py-8 construction.
- **D-124a2**: THE HEADER SEARCH PIN (+1 it) — the "Search events..."
  placeholder + aria-label + the h-9 pl-9 construction.
- **D-124a3**: THE KPI WEEK-WINDOW PIN (+1 it) — the
  meetingsThisWeek/callsThisWeek typed [weekStart, weekEnd)
  derivations (the raw-basis pin covers the array, not the windows).
- **D-124a4**: THE NAV TRIO A11Y-SUPERSET PIN (+1 it) — the
  aria-label pair + the Today hidden-below-sm + the outline icon
  buttons (pins OUR superset deliberately — the L-124c1 adjudication
  made standing).
- **D-124a5**: THE RELATED-LINE + PHONE-GHOST PINS (+2 its) — the
  account-first `e.account?.name ?? e.contact?.name` chain + the
  `e.relatedType ?? "Contact"` prefix; the `e.type === "call"`
  Phone-ghost conditional.
- **D-124a6**: THE CHIP EDIT ROUND-TRIP PIN (+1 it) — the chip
  onClick trio setEditing(e) + setDefaultStart(null) +
  setDialogOpen(true).
- **D-124a7**: THE csvWithBom DEAD-CODE RETIREMENT (src/lib/csv.ts —
  the N-124a2 find: the definition survived the s123 D-123a1 import
  retirement with zero callers; retired the s48/s49 way) + the
  csv-contract pin extended to assert the definition's absence
  (+1 it).
- **D-124a8**: the docs realignment + the captures 224-227 + the
  session records.

## The verification ladder

GREEN-first (the pins written against the walk's live-measured
contracts — the s122 pin-only pattern) → **the stash-proofs** (each
pinned src content reverted alone → its pin REDs alone; the
csvWithBom retirement reverted alone → its pin REDs alone) → the full
suite → the final gate (lint 0/0 · tsc 0 · unit · build · e2e 137/137
· the closing drift sweep · census MATCH) → the captures + the VLM
battery → the commit + the SSH-wrapper push.

## The count ladder (as planned)

UNIT 1980 → 1991 (+11, all in EXISTING files: +10
activities-calendar-parity + +1 csv-contract); SUITES 110 UNCHANGED;
E2E 137 UNCHANGED; badge 2117 → 2128.

## The execution record (as shipped)

- **D-124a0 shipped**: the rail TYPE/DATE vocabulary pins (+2 its,
  activities-calendar-parity — the six + four pairs verbatim, the
  block-slice bounded by the DATE_FILTERS anchor).
- **D-124a1 shipped**: the Clear All dual-reset pin (+ the
  clearAllLink literal `text-xs text-blue-600 hover:text-blue-700
  font-normal` in page-layout) + the empty-state pair pin (the two
  texts + the text-center text-gray-500 py-8 construction).
- **D-124a2 shipped**: the header search pin (the placeholder + the
  aria-label + the h-9 pl-9 + the wrapper classes).
- **D-124a3 shipped**: the KPI week-window pin (the typed
  [weekStart, weekEnd) derivations off the RAW array, both windows
  + the not-visible guards).
- **D-124a4 shipped**: the nav-trio a11y-superset pin (the
  aria-label pair + the hidden sm:flex Today + the outline icon
  buttons — the L-124c1 adjudication made standing).
- **D-124a5 shipped**: the account-first related-line pin + the
  Phone-ghost conditional pin.
- **D-124a6 shipped**: the chip edit round-trip trio pin (the
  setEditing + setDefaultStart(null) + setDialogOpen sequence).
- **D-124a7 shipped**: the csvWithBom dead-code retirement (the
  definition + its orphaned doc comment removed from src/lib/csv.ts,
  the s48/s49 way; the import-side parseCsv BOM stripper stays) +
  the csv-contract retirement pin (+1 it — no BOM wrapper on the
  export side).
- **D-124a8 shipped**: session_266.md + this record + the worklog +
  SKILL v1.121.0 (the §16dl layer + the project_state s124 head +
  the H1 + the Appendix B 1991) + the README badge 2128 + the Tested
  row's s124 clause + the AGENTS §Session-124 + the CLAUDE 4 sites +
  the PAD 5 sites + the s124 inventory row + the captures 224-227 +
  the VLM battery 4/4 × 4 CLEAN.
- **The count ladder as shipped**: UNIT 1980→1991 (+11, all in
  EXISTING files) · SUITES 110 UNCHANGED · E2E 137 UNCHANGED ·
  badge 2117→2128.
- **The stash-proofs**: the 10 reverts each RED its pin alone
  (1|50 ×9 + 1|10 for the csv retirement); restored → GREEN.
- **The gate**: lint 0/0 · tsc 0 · 110/1991 · build · 137/137 ·
  the closing drift sweep CLEAN on all four gates WITHOUT the
  prefix · census MATCH · src/ 1 file + tests/ 3 files changed.
- **The live verification ladder**: PASS 1 two-app ZERO real parity
  defects (the L-124c1 aria superset the only divergence,
  adjudicated noise) · PASS 2 populated ours-only 44/44
  db-verified · the VLM battery 4/4 × 4 CLEAN.
