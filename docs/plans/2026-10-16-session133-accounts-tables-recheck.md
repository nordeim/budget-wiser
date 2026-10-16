# Session 133 — the accounts-list family third-cycle re-check (the one-fix + freeze-pin session)

The 133-c rotation — the session_283 close's named direction: **the s116+ third-cycle
candidates' next member — accounts-list (s117)**, 16 sessions back. The 133-a pre-walk
inventory mapped the drift: the family source FROZEN (accounts-page.tsx since s90 — 43
sessions; the Insights dialog since s84; the Edit dialog since s91) but the SHARED
PRIMITIVES moved under it — the s129 button outline hover-text + destructive alpha, the
s130 ghost hover-text, the s129 TABS_PILL/PANEL_BASE ring-offset retirement, the s125
active-pill bg-white, the s131 toast close-X — and the LENSES sharpened since s117: the
F-126c1 text-content census, the F-127c2 submit-color census, the F-128c1
highlighted-state census, the s132 select OPEN-state lens.

## The walk as executed (walk24, the phased idiom)

PASS 1 (zero-data, TWO-APP, both 1440×900 + 390×844, PORT 3141, the walk db, the
reference's storageState persisted + reused, ONE reference login total): the page +
header census · the KPI row (the five zv stat cards — labels, values, fonts, card
rects) · the header-actions census (the Export CSV outline + the New Account default)
· the toolbar census (the view-switcher + density comboboxes, the More outline, the
search input, the toolbar Export CSV) + **THE OUTLINE HOVER ARMS (L-133a1 — the
toolbar More + the toolbar Export CSV, both apps)** · the rail census (the 320px
aside, the Filters title, the Save All ghost + hover, the three selects, the four
tier checkboxes, the blue Filter button + hover) · the table census (the 8 heads, the
empty state, the card climb) · **THE FULL TEXT-CONTENT census (L-133a3)** · the
select OPEN-state census (L-133a4 — the view switcher's listbox + the highlighted
wash). PASS 2 (populated, OURS-ONLY): the KPI values + the row contracts + the tier /
star / overdue / health censuses + the Key tint + the tier-badge chrome + **THE ROW
MENU + THE EDIT ACCOUNT DIALOG battery (L-133a2 — the wce's first walk: the chrome,
the 8 field labels, the Cancel outline hover, the dark Save Changes submit)** + the
Insights dialog quick census + the Cards view census + the header Export CSV enabled
hover.

## THE VERDICT — 274 two-app axes, 10 raw diffs, ONE REAL PARITY DEFECT

Every diff adjudicated (each decisively):

1. **tb.sel1.color ×2 (both viewports) — F-133c1 THE EMPTY-SELECT PLACEHOLDER INK
   [REAL]**: the dead density select's trigger computes `rgb(115,115,115)` on ours
   vs the reference's `rgb(10,10,10)`. The decisive probe (walk24b): both apps
   render the IDENTICAL structure — an empty `pointer-events:none` span + the
   chevron svg — but OUR trigger sits in Radix's `data-placeholder` state (our
   `value=""` superset) and our `SELECT_TRIGGER.placeholderState`
   (`data-[placeholder]:text-muted-ink`, the s10 re-ink of the shadcn stock arm)
   dims it; the REFERENCE's density select carries the FIXED no-match value
   `"format"` (the N-87c4 decode) so it NEVER enters the placeholder state — its
   trigger inherits the foreground ink. The chevron (`stroke=currentColor` at
   `opacity-50`) PAINTS at the trigger color: ours a lighter gray arrow, theirs
   near-black. The s81 M-81c3 bundle re-derivation already established the
   reference's verbatim trigger construction carries **NO placeholder arm** —
   confirmed live-DOM on the settings ×2 + dashboard ×3 selects then, but never on
   a placeholder-STATE select (all confirmed selects carried values). The only
   placeholder-state select on either app = the density select — the maiden census
   today.
2. **selOpen.shadow — the v4 dead-layer serialization genus**: ours emits 4
   fully-transparent zero-extent layers + the 2 real; the reference 2 + the same
   2 real. Trimmed byte-equal (the normShadowLayers standing form, the s132-recorded
   noise).
3. **page.mainScrollW @390 (ours 390 vs ref 488) — the s95 standing genus**: the
   reference's bare flex-1 lets its 472px table card poke out at phone width; ours
   min-w-0 contains. The documented adjudication (visually equivalent, do NOT
   restructure) — the 38th re-confirmation.
4. **tb.sel0/sel1/more rects @390 (ours 326 vs ref 440) — the s95 cascade**: the
   decisive probe shows BOTH apps stack the toolbar children identically
   (`flex-col` below sm; both rows exactly 220px tall, the same five children at
   full-card width) — only the card width differs (ours contained 326, the ref
   poking 440). Byte-equal layout modulo the standing containment genus.
5. **tbl.cardRect/cardRadius/cardShadow @390 — the harness climb-guard artifact**:
   the walk's card climb carried a `width>400` fallback guard that fails at phone
   widths, climbing past the borderless card to the page root. The fixed probe
   (shadow-only climb): the card chrome BYTE-EQUAL both apps (radius 8px + the
   shadow family; ours 358 wide contained vs the ref's 472 poke — the s95 genus).

**The PASS 2 populated record (ours-only — the reference's zero-data genus) — every
seeded contract holds**: the KPI values 10/8/9/$77.5M/3 (30px/700 @1440) · the row
contracts (rowCount 10 · the name 14px/500 rgb(10,10,10) · $8.2M revenue · the 4px
rgb(239,68,68) overdue border-left) · the tier census **9 Key + 1 A** · the star
census **9** (fill rgb(234,179,8)) · the overdue census **3 × "1 Overdue"** + exactly
**3 red-left-border rows** · the health census **5 Healthy / 3 At Risk / 2 Needs
Attention** · the Key tint `rgb(254,252,232,0.3)` (the yellow-50/30) · the Key badge
chrome 12px/600 bg rgb(254,249,195) color rgb(133,77,14) radius 6px · **THE EDIT
ACCOUNT DIALOG (the wce's first walk)**: rect 672×516 (the max-w-2xl), bg white,
radius 8px, the title "Edit Account" 18px/600, the EIGHT field labels
("Account Name *,Industry,Phone,Email,Website,Annual Revenue,Employees,Status"), the
status select "Active", the Cancel outline hover **rgb(23,23,23)/rgb(245,245,245)**
(the s129 fix verified on its FOURTH never-censused ride), the Save Changes submit
**rgb(23,23,23)/rgb(250,250,250)** (the DIALOG_SUBMIT dark, the F-127c2 lens) · the
Insights dialog (the 3 tabs Recent Activities/Contacts/Open Deals) · the Cards view
(10 cards, the 338px phone column) · the row menu (128×106, Edit/View Insights/Delete
with the red rgb(220,38,38) literal, the hover wash rgb(245,245,245)/rgb(23,23,23))
· the select OPEN state (130×74, the Table/Cards options, the highlighted wash
pair) · the header Export CSV ENABLED hover rgb(23,23,23)/rgb(245,245,245) (the
s129 fix, the L-133a1 completion).

**The L-133a lenses on their maiden run here**: L-133a1 the outline hover arms ALL
CLEAN (the More + both Export CSVs + the Edit Cancel — every one the s129
hover-text pair) · L-133a3 the text-content census BYTE-EQUAL both viewports (the
entire visible text of the zero-data page) · L-133a4 the select OPEN state CLEAN
modulo the dead-layer shadow · L-133a7 the rail (space-y-4) CLEAN · L-133a8 the s95
genus re-confirmed.

## THE REMEDIATION (the one-fix + freeze-pin session)

- **D-133a0 THE PLACEHOLDER-INK FIX (F-133c1)**: `page-layout.ts` — retire the
  `SELECT_TRIGGER.placeholderState` arm; `select.tsx` — drop its interpolation from
  the trigger composition. The trigger inherits the #0a0a0a foreground ink in every
  state — the reference's verbatim construction (the s81 M-81c3 doctrine, live-
  confirmed on the density axis both viewports). Exactly ONE call site sits in the
  placeholder state today (the accounts density select) — the fix is precisely
  scoped; the INPUT placeholder family (`placeholder:text-muted-ink`, a DIFFERENT
  mechanism the reference genuinely dims) is untouched.
- **D-133a1 THE PIN RE-ANCHOR**: `tests/page-layout.test.ts` — the placeholderState
  expectation re-anchored IN PLACE to the negative form (the D-129a0 precedent).
  RED-first.
- **D-133a2 THE FREEZE PINS (the L-133a5 gap — the D-117a2/D-132a0 pattern)**:
  (a) the 8-table-heads set pin (`account-contacts-parity.test.ts` — "Account Name"
  appears in ZERO test assertions today; pin the full eight-head sequence as a set);
  (b) the toolbar construction pin (the VIEW_SWITCHER Table/Cards options + the
  density Standard/Detailed pair + the More button + the search placeholder + the
  toolbar Export CSV — the walk-censused construction never pinned).
- **D-133a3 the docs realignment** (SKILL v1.130.0 + the README badge + AGENTS/
  CLAUDE/PAD + session_284.md + this plan's execution record + the repo worklog).

The TDD ladder: the pin RED at the standing source → the fix → GREEN → **the
stash-proof** (the fix reverted alone → the pin REDs alone) → the freeze pins GREEN
at the standing source → their stash-proofs → the post-fix walk re-run (the density
ink byte-equal both apps) → the captures + the VLM battery → the docs-counts
lockstep → the final gate.

## The walk-harness lessons (record-only)

- **L-133c1 — the climb-guard width fallback**: the borderless-card climb's
  `width>400` fallback fails at phone widths (the contained card is 358) — the
  climb escaped to the page root and manufactured three phantom card diffs. The
  shadow-only climb (any DIV with a real box-shadow) is the phone-safe form.
- **L-133c2 — the data-placeholder state asymmetry**: the reference's platform
  avoids Radix's placeholder state via fixed no-match values (the N-87c4 "format"
  decode); OUR functional supersets use `value=""` which ENTERS the state. Any
  computed-ink census on an empty select must account for the state asymmetry —
  the arm itself was the defect.

## The captures (260-263)

260 the populated accounts face @1440 (the KPI row + the tiered table with the Key
tints + the overdue red borders) · 261 the Edit Account dialog @1440 (the wce's
first capture — the 8-field form + the dark submit) · 262 the rail + the select
OPEN state @1440 · 263 the phone face @390 (the stacked toolbar + the KPI 2-col
grid). The VLM battery 4/4.

## The final gate

lint 0/0 · tsc 0 · **111/2023** · build · **137/137** · the closing drift sweep CLEAN
on all four gates · census MATCH. src/ 2 files (page-layout.ts + select.tsx) ·
tests/ 3 files (the re-anchored pin + the two freeze-pin carriers) · docs/ realigned.

## The execution record (as shipped)

The TDD ladder as executed: the D-133a1 pin RED at the standing source (1 failed in
page-layout.test.ts) → the D-133a0 fix (page-layout.ts + select.tsx) → GREEN
(191/191) → **the stash-proof** (the fix stashed alone → 1 RED alone; popped →
GREEN) → the D-133a2 freeze pins GREEN at the standing source (24/24 in
account-contacts-parity.test.ts, +2 its) → **their two stash-proofs** (the "Account
Name" head renamed → 1 RED alone; the More-control aria-label renamed → 1 RED
alone; both restored GREEN) → the rebuild → **the POST-FIX walk re-run** (the ours
PASS 1 phases re-censused against the persisted ref JSONs: 274 axes, **8 adjudicated
diffs ONLY — the tb.sel1.color diff GONE both viewports, the density ink byte-equal**)
→ the captures 260-263 (four unique md5s 434e412e/9fc56016/bcc28d51/dc272c02) + the
VLM battery 4/4 CLEAN → the docs-counts lockstep RED (12 failed) at the stale docs →
the realignment (README badge 2160 + the Tested row + the tree comment; AGENTS the
commands table + the gate-order line + the Session-133 section; CLAUDE the four
sites; PAD the five sites + the suite-table Session-133 row; SKILL v1.130.0 — the
frontmatter + the H1 + the project_state head's s133 layer + the Appendix B total +
the §16du layer; session_284.md; the repo worklog) → GREEN (21/21) → the full unit
gate 111/2023.

The ship: src/ 2 files (page-layout.ts + select.tsx — the placeholderState
retirement) · tests/ 3 files (page-layout.test.ts the re-anchor;
account-contacts-parity.test.ts +2 its; docs-counts.test.ts the UNIT 2023 + the
layer-axis s133/s132 pair) · docs/ realigned + the plan + session_284.md + the
worklog + the captures 260-263.
