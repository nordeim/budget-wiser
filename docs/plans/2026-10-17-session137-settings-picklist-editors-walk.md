# Session 137 — the settings picklist-editor family fresh-eyes walk (the pin-only session)

The 137-c rotation — the session_290 close's named direction: **the fresh-eyes sweep
of the never-walked seams — the settings picklist editors FIRST** (the stalest of
the three named candidates: settings-page.tsx frozen since s82 — 55 sessions —
while the shared primitives moved under it: the s129/s130 hover-text arms, the
s125 TABS_SEGMENTED active-pill, the s133 placeholderState retirement, the s135
Input stock-stack). The 137-a pre-walk inventory named the risks L-137a1..a9 with
the TOP = the ghost hover arms on the picklist rows (the s130 fix never censused
on any settings surface) and L-137a6 = settings as the freeze-pin genus's LAST
unpinned family.

## The walk as executed (walk28, the phased idiom)

PASS 1 (zero-config, TWO-APP, both 1440×900 + 390×844, PORT 3141, the walk db
zeroed to the both-zeroes idiom — the 5 picklist arrays EMPTIED, the defaults row
kept, matching the reference's wiped config; the reference's storageState
persisted + reused, ONE reference login total; every ours phase logs in fresh
in-context): the shell census (h1/subtitle/column/docScrollW) · the segmented
tablist (3 triggers + the track + the active pill) · THE CONFIG TAB (5 cards:
titles/card chrome/empty states/add-inputs incl. the ::placeholder ink/add
buttons incl. the DISABLED face + the grid geometry 552×2 @1440 / 358 @390) ·
THE DEFAULTS TAB (the 6 labels + 4 inputs + 2 select triggers + the select OPEN
state [Month checked / Week unchecked + the wash]) · THE DATA TAB @1440 (3 cards
+ 7 outline buttons + the Danger Zone ladder) · the phone faces (docScrollW 390
contained, single-col grid, both apps).

PASS 2 (populated, OURS-ONLY, the walk db re-seeded 8/7/6/3/8): the row anatomy
(bordered rows 54px, the span, the Pencil/Trash2 icon buttons 36×36) · **THE
HOVER ARMS (L-137a1 TOP — real pointer moves)**: the row's hover:bg-gray-50
rgb(249,250,251) · the Pencil ghost pair rgb(245,245,245)/rgb(23,23,23) · the
Trash2 red pair rgb(220,38,38) → hover rgb(185,28,28) + the wash rgb(245,245,245)
· the rename row's Save/X ghost pair · **THE RENAME STATE (L-137a3)**: the row
swaps to the Input flex-1 396×36 + Save 36×36 + X 36×36, the Enter-save round-
trip landing (the row text re-renders from the store) · **THE ADD ROUND-TRIP
(L-137a4)**: the fill enables the button (disabled false, opacity 1) · the hover
alpha (oklab … / 0.9 = rgba(23,23,23,0.9)) · the click lands the row (8→9) ·
**THE DELETE ROUND-TRIP**: the Trash2 removes it (9→8) · **THE DEFAULTS SELECT
ROUND-TRIPS**: Week (PUT) → Month restored (PUT) · the @390 populated face
(docScrollW 390, 358px single-col, the phone hover arms identical).

THE REFERENCE INTERACTIVE DRIVE (the maiden L-137a3/a1 attempt, with restore):
the reference's add-input filled ("walkprobe" — their button ENABLED, disabled
false) · the add-button family censused TWO-APP: **48×36 · bg rgb(23,23,23) ·
color rgb(250,250,250) · radius 6px · cursor pointer · the hover bg
rgba(23,23,23,0.9) — BYTE-EQUAL with ours (ours' oklab serialization = their
rgba form of the same color)** · then their Add click fired **NO NETWORK CALL AT
ALL** (the netlog: only the 4 GETs) — **THE REFERENCE'S ADD FLOW IS A NO-OP
TODAY** (their own quirk: the wiped config is un-repopulatable from their own
UI) — the two-app row/rename/hover census is therefore IMPOSSIBLE on the
reference (documented as the reference's broken-add genus; ours is the working
superset) · the reference restored to wiped (rowCount 0, "No items yet" — ZERO
residue).

## THE VERDICT — ZERO REAL PARITY DEFECTS

PASS 1: 27 raw diffs @1440 + 6 @390 — every one adjudicated:
- 15 shadow serializations — the v4 dead-layer genus (normalized byte-equal);
- 5 add-button cursor — the L-122c1 disabled-cursor genus (rendered-identical,
  both ship disabled:pointer-events-none);
- 1 bodyBg — the F-119c2 inverted-token genus (occluded behind the page div);
- 20 data-tab y-offsets — the harness artifact (our inner scroll container
  moved 69px mid-census; the decisive geo probe: BOTH apps' cards at doc-y 249,
  panelToCard 0) + the residual +8 gapDescToBtn = **the documented v3/v4 space-y
  margin-direction genus' maiden line-box face** (the reference's v3-style
  `* + *` mt-8 on the later inline buttons extends the line box's ascent 8px,
  dropping the whole row; ours' v4 mb-8 extends the same 44px line box downward
  — the same 160px cards, the 8px on opposite sides);
- 2 card.text joins — the L-134c1 inter-element whitespace genus.

PASS 2: every seeded contract holds (the KPI rows 8/7/6/3/8 · all hover arms ·
all round-trips · the defaults restorations) — the maiden lenses ALL CLEAN
including the L-137a1 TOP (the s130 ghost hover-text live-verified on the
picklist rows) and L-137a2 (the Defaults selects' resting ink — the s133
retirement's settings arm, code-verified no-op: no data-placeholder state
reachable, the live census confirming the neutral trigger ink).

## The walk-harness lessons (L-137c1..c4)

- **L-137c1 the inner-container scroll**: the app shell scrolls in
  `main.overflow-auto`, NOT the window — `window.scrollY` stays 0 and doc-
  absolute rects lie mid-census. Reset the inner container (or probe fresh)
  before geometry censuses.
- **L-137c2 the synthetic-hover trap**: CSS `:hover` needs REAL pointer moves —
  synthetic `mouseover` dispatches never trigger Tailwind hover arms. Only
  `locator.hover()` censuses them.
- **L-137c3 the React controlled-input trap**: direct `.value` assignment +
  synthetic `input` events do not reach React state (the value tracker); only
  `locator.fill()` does. The add-button enabling is the tell.
- **L-137c4 the quote-collapse selector trap**: building
  `querySelector('…[aria-label="X"]…')` by string-replacing `"` → `'` collapses
  the quoting and silently breaks the selector (a SyntaxError inside evaluate).
  Compose double-quoted JS strings with single-quoted attributes.

## The remediation (the pin-only session)

- **D-137a0 THE FREEZE PINS** (+5 its, tests/settings-family-parity.test.ts —
  the settings family pin home, the L-137a6 gap closed on the genus's LAST
  family: accounts s133, dashboard s134, contacts s135, leads s136,
  **settings s137**):
  1. The 5 picklist panel titles as an ORDERED SET (Contact Sources / Lead
     Stages / Activity Types / Account Tiers / Industries — the ConfigEditor's
     ListEditor title props in document order);
  2. The 3 settings tab labels as an ordered set (CRM Configuration / Defaults
     / Data);
  3. The 5 add-input placeholders as an ordered set (incl. the Industries typo
     "Add new industrie" — the typo pinned at s72, the SET never);
  4. The Defaults 6 field labels as an ordered set (the W-7 genus's settings
     face — e2e-only until now);
  5. The picklist interactive chrome (the walk-verified contracts): the
     SETTINGS_PICKLIST.addButton dark family (bg-neutral-900 +
     hover:bg-neutral-900/90 + h-9) · the deleteBtn red pair (text-red-600 +
     hover:text-red-700) · the itemRow's hover:bg-gray-50 · the "No items yet"
     literal.
- **D-137a1 THE DOCS REALIGNMENT** (SUITES 111 → 112 [the new pin file] · UNIT
  2036 → 2041 (+5 its) · E2E 137 · badge 2173 → 2178; SKILL v1.134.0 + the
  layer-axis s137/s136 + the §16dy layer + session_292.md + this plan's
  execution record + the repo worklog + AGENTS/CLAUDE/PAD).

## The TDD ladder (as planned)

1. The pins written at the standing source: all five GREEN (the freeze pins —
   the family is in verified live parity, nothing to fix).
2. **The stash-proofs**: each pin target mutated alone → exactly 1 RED alone;
   restored → GREEN.
3. The docs-counts lockstep RED (at the stale docs) → the realignment → GREEN.
4. The captures (the dev server at the walked states) + the VLM battery.
5. The final gate: lint 0/0 · tsc 0 · 112/2041 · build · 137/137 · the closing
   drift sweep CLEAN ×4 (modulo the two documented genera) · census MATCH.

## The ship

tests/ 1 new file (settings-family-parity.test.ts +5 its · the docs-counts
lockstep carriers) · docs/ realigned + the plan + session_292.md + the worklog
+ the captures · src/ 0 files (THE PIN-ONLY SESSION — zero real parity defects,
the reference's broken-add genus documented, not ours to fix).
