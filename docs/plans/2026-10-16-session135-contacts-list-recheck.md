# Session 135 — the contacts-list family third-cycle re-check (the one-fix + freeze-pin session)

The 135-c rotation — the session_287 close's named direction: **the s116+ third-cycle
candidates' next member — contacts-list (s119)**, 16 sessions back. The 135-a pre-walk
inventory mapped the drift: the family source MOSTLY frozen (contacts/page.tsx since
s19 — 116 sessions; contact-detail-panel.tsx since s82; entity-edit-dialog.tsx since
s91; globals.css since the s119 ship itself) but contacts-page.tsx + entity-dialogs.tsx
moved at s127 (the F-127c2 Import-submit fix + the +4 Contact placeholders — each
two-app-walked on its own dialog surface; the page-level composition never re-walked),
and the SHARED PRIMITIVES moved under it: the s129 button outline hover-text, the s130
ghost hover-text, the s128 MENU_ITEM focus arm, the s125 TABS_SEGMENTED active-pill
bg-white, the s133 placeholderState retirement (the per-row role select — the
L-135a1 TOP risk, the 134-a record's explicitly-deferred "contacts role ?? ''" edge).

## The walk as executed (walk26, the phased idiom)

PASS 1 (zero-data, TWO-APP, both 1440×900 + 390×844, PORT 3141, the walk db, the
reference's storageState persisted + reused, ONE reference login total): the page +
header census (the h1, docScrollW, the main containment) · the 4-button action row
(the Export CSV [disabled at zero data], the Scan Card outline, the Import outline,
the New Contact primary — resting inks + rects + the disabled state) · the 4
IconStatCards (labels, values, fonts, colors, card rects, the -500 chips, the grid
cols) · the toolbar (the search + the Filters outline button + the toolbar card) ·
the 8-head table (the font-semibold text-gray-700 family + the bordered rounded-xl
shadow-sm card chrome + the rich empty state) · **THE HOVER ARMS (L-135a2 — the
Export/Scan/Import/New/Filters quintet)** · **THE TEXT-CONTENT census (L-135a6, the
L-134c1 joined-text lesson)** · **THE DIALOG BATTERY (the Scan Card dialog + the
Import dialog + the Create New Contact dialog)** · **THE FILTERS PANEL (the kke rail
— the sticky header + the Clear All ghost + its hover + the 6 card groups + the
checkbox census)** · the @390 genera (the header action rects + the mobile-card
empty container [the F-119c1 genus] + docScrollW). PASS 2 (populated, OURS-ONLY,
the James Whitfield NULL-ROLE seed — the L-135a1 target): the KPI values + the row
anatomy (the avatar/role-select/badge/bars/company/source/ghost-quartet) + **THE
L-135a1 MAIDEN (the placeholder-state select)** + the Key-row genus + the ghost-trio
custom hovers + **THE ROW MENU OPEN (the real Radix [role=menu] — the L-134c2
inverse)** + **THE ROLE-SELECT OPEN (L-135a4)** + **THE SLIDE-OVER (L-135a5's third
segmented ride)** + **THE W7 EDIT DIALOG (L-135a7)** + the @390 populated face.

The decisive adjudication probe (walk26b): **THE COMPLETE SCAN-DIALOG ANATOMY** —
every element's rect/padding/margin/font dumped two-app at both viewports, the genus
of every diff read directly, never inferred.

## THE VERDICT

**12 raw PASS 1 diffs — THREE REAL PARITY DEFECTS, all in the Scan Business Card
dialog (one file, one site):**

- **F-135c1 THE SCAN-SUBMIT COLOR**: ours the bare default Button (bg-primary
  blue-600, rgb(37,99,235)) where the reference renders **rgb(23,23,23)** — the
  bg-neutral-900 DIALOG_SUBMIT family. The F-127c2 genus' MISSED SIBLING: the s127
  fix re-inked the Import submit but never censused the Scan dialog's own submit.
  Both viewports; the foreground #fafafa already byte-equal.
- **F-135c2 THE FILE-INPUT TYPOGRAPHY**: ours the browser-default **16px/24px
  line-height, zero padding** (rect 320x24) where the reference computes
  **14px/400, 20px line-height, 4px/12px padding** (rect 320x36) — the text-sm +
  py-1 px-3 stack. The 12px height delta cascades: the dropzone 192-vs-204, the
  dialog 328-vs-340 @1440.
- **F-135c3 THE FILE-INPUT WIDTH FLUIDITY**: ours `max-w-xs mx-auto` — the file
  input's intrinsic min-content (320) forces the dropzone to 388 at 390 — **the
  dialog content escapes its p-6 padding at phone width** (the header/dz/footer
  render 388 wide; the reference's fluid input shrinks to 272 inside the properly
  inset 340 dropzone, its copy wrapping to two lines). The @390 dz 388x192-vs-
  340x224 + dialog 328-vs-360.

The adjudicated noise (the documented genera):

- **tb.cardShadow + table.cardShadow ×4 (both viewports)** — the v4 dead-layer
  shadow genus: ours serializes 4 leading `rgba(0,0,0,0) 0px 0px 0px 0px` layers
  where the reference serializes 2; the REAL layers byte-equal after trim (the
  toolbar card's standing `shadow` md family + THE S11-P9 table-card `shadow-sm`
  contract, `rgba(0,0,0,0.05) 0px 1px 2px 0px` byte-equal).
- **text.content ×2** — the L-134c1 text-node-granularity genus: ours renders the
  icon-label inter-element whitespace ("contacts Export") where the reference's
  platform emits no whitespace ("contactsExport"); the WORDS byte-equal.
- **dz.mar (ours margin-bottom 16px vs ref 0)** — the space-y v4 margin-direction
  genus (v4: margin-bottom on not-last-child; v3: margin-top on +siblings): the
  16px dz→footer gap IDENTICAL both apps, only the carrier element differs.

**THE LENSES ON THEIR MAIDEN RUN — ALL CLEAN:**

- **L-135a1 [TOP] THE S133 RETIREMENT'S CONTACTS ARM**: the null-role seed's select
  (James Whitfield) sits IN Radix's data-placeholder state (data-placeholder=true —
  the L-133c2 asymmetry standing as documented) and computes the trigger ink
  **rgb(10,10,10)** + the chevron **rgb(10,10,10)** — the placeholderState
  retirement live-verified on the per-row role select, the exact fix's intent; the
  134-a record's deferred edge CLOSED. The value-carrying sibling clean too
  (rgb(10,10,10) + the custom border-gray-300 rgb(209,213,219) + hover:border-
  blue-400).
- **L-135a2 the hover arms**: the quintet byte-equal (the s129 outline pair on the
  Scan/Import/Filters trio; the primary New Contact pair; the Export disabled) +
  the PASS 2 custom ghost-trio hovers byte-clean (green-700/green-100, purple-700/
  purple-100, blue-700/blue-100) + the ⋮ partial ride (gray-100 bg + the s130
  hover:text arm rgb(23,23,23)) + the Clear All ghost pair + the slide-over trio
  pair rgb(23,23,23)/rgb(245,245,245).
- **L-135a3 the row-menu wash on the REAL Radix menus**: the [role=menu] census
  two-app-capable by construction (the L-134c2 inverse — ours-only in practice at
  the reference's zero-data): Edit|Log Activity|Delete + the s128 wash
  rgb(245,245,245) + the Delete red rgb(220,38,38).
- **L-135a4 the select OPEN states**: the role-select listbox 5 options (Decision
  Maker|Key Contact|Influencer|End User|Other) + the SelectItem wash
  rgb(245,245,245).
- **L-135a5 the s125 active-pill's third segmented ride**: the slide-over's
  Activities/Deals/Notes tabs — the active bg-white + the bare shadow + the
  inactive muted-ink rgb(115,115,115) + the track rgb(245,245,245).
- **L-135a6 the text census**: byte-equal modulo the granularity genus.
- **L-135a7 the W7's post-s127 state**: the 672 chrome + the 7 labels + the Cancel
  outline pair + the dark Save Changes rgb(23,23,23) — and the Scan submit's
  #fafafa foreground byte-equal (the carrier's BG the F-135c1 defect).
- **L-135a8 the @390 genera**: the mobile-card empty container (the F-119c1 genus
  byte-equal) + the populated 15-card rail + **the L-127c6 pre-classification MOOT
  — the reference's contacts header renders BYTE-EQUAL ours today** (the action
  quartet rects identical: 145x36@-53..91 / 58x36 / 58x36 / 153x36@243..397, the
  docScrollW 390 both) — the s127-era reference overflow no longer manifests.
- **L-135a9 the unpinned ordered sets** — the freeze-pin targets below.

**PASS 2 (populated, ours-only — the reference's zero-data genus) — every seeded
contract holds**: the KPI values **15 / 15 / +15 / 6 / 5** · the 15 rows + the 15
mobile cards · the row anatomy byte-clean (the avatar 44x44 FULL-radius gradient,
the name/position fonts, the priority Badge, the last-activity icon/text, the
engagement bars, the company stack, the source Badge outline-blue) · the Key-row
genus (the amber gradient + the border-l-4 + the Award overlay).

## The remediation

- **D-135a0 THE SCAN-DIALOG FIX** (contacts-page.tsx, the NAe contract, 2 sites):
  1. The submit: `<Button className={DIALOG_SUBMIT.button} disabled={...}>` — the
     s127 F-127c2 idiom, the Import submit's sibling (F-135c1);
  2. The file input: `className="w-full max-w-xs mx-auto text-sm py-1 px-3"` — the
     reference's computed stack (fluid width capped 320 + 14px/20px + 4px/12px;
     F-135c2 + F-135c3).
- **D-135a1 THE PINS** (+6 its, contacts-family-parity.test.ts — the contacts-family
  pin home):
  1. The Scan submit's DIALOG_SUBMIT family (RED at the standing source — the fix
     pin) + the negative (no bare default);
  2. The Scan file input's fluid/typography stack (RED at the standing source — the
     fix pin);
  3. The 8 table heads as an ORDERED SET (the freeze pin — in ZERO ordered-set
     assertions);
  4. The 6 filter-panel card groups as an ordered set (the freeze pin);
  5. The row-menu items as an ordered set (Edit|Log Activity|Delete — the freeze
     pin);
  6. The W7's 7 field labels as an ordered set (the freeze pin — individually
     pinned since s91, never ordered).
- **D-135a2 THE DOCS REALIGNMENT** (the count ladder UNIT 2026 → 2032 (+6 its) ·
  SUITES 111 · E2E 137 · badge 2163 → 2169; SKILL v1.132.0; AGENTS/CLAUDE/PAD;
  session_288.md; the plan's execution record; the repo worklog).

## The TDD ladder (as planned)

1. The pins written at the standing source: the two fix pins RED, the four freeze
   pins GREEN.
2. **The fix** (D-135a0) → all six GREEN.
3. **The stash-proofs**: the fix reverted alone → exactly the two fix pins RED
   alone; each freeze target mutated alone → exactly 1 RED alone; restored → GREEN.
4. **The post-fix walk re-run** (the scan-dialog axes byte-equal two-app).
5. The captures 268-271 (the four unique md5s) + the VLM battery.
6. The docs-counts lockstep RED (at the stale docs) → the realignment → GREEN.
7. The final gate: lint 0/0 · tsc 0 · 111/2032 · build · 137/137 · the closing
   drift sweep CLEAN ×4 · census MATCH.

## The ship

tests/ 1 file (contacts-family-parity.test.ts +6 its · the docs-counts lockstep
carriers) · src/ 1 file (contacts-page.tsx — the 2-site scan-dialog fix) · docs/
realigned + the plan + session_288.md + the worklog + the captures 268-271.

## The execution record (as shipped)

- **The TDD ladder**: the pins written at the standing source (the 2 fix pins
  RED, the 4 freeze pins GREEN) → **the fix** (D-135a0: the submit rides
  `className={DIALOG_SUBMIT.button}` — the s127 idiom; the file input rides
  the Input component + `className="max-w-xs mx-auto"` — the
  byte-parity-verified stock stack) → 25/25 GREEN → **the stash-proofs**
  (the fix reverted alone → exactly the 2 fix pins RED alone; the Engagement
  head mutated alone → 1 RED alone; the Company Size panel card mutated
  alone → 1 RED alone; the Delete item renamed alone → 1 RED alone; the W7
  Position/Status swapped alone → 1 RED alone; each restored → 25/25) →
  the docs-counts lockstep RED (**13 failed** at the stale docs: the UNIT
  2032 constant + the layer-axis s135/s134 + the CLAUDE carrier with the
  widened negatives) → the realignment → **GREEN 40/40**.
- **The post-fix walk re-run**: 6 raw diffs, ZERO REAL PARITY DEFECTS — the
  scan-dialog axes ALL byte-equal (walk26b: the dialog rects + the dropzone
  + the input's font/padding/height/fluid width + the submit color; the
  walk26 full re-run: the PASS 1 census byte-equal modulo the two noise
  genera). The sole residual: the space-y v4 margin-direction carrier (the
  16px gap identical both apps) — the documented genus.
- **The captures 268-271** (four unique md5s) + **the VLM battery 4/4 CLEAN**
  (269 reads the DARK/GREY submit — the F-135c1 fix visually verified).
- **The final gate**: lint 0/0 · tsc 0 · **111/2032** · build · **137/137** ·
  the closing drift sweep CLEAN ×4 · census MATCH.
- **The ship**: src/ 1 file (contacts-page.tsx — the 2-site scan-dialog fix)
  · tests/ 1 file (contacts-family-parity.test.ts +6 its; the docs-counts +
  dialog-geometry lockstep carriers) · docs/ realigned + the plan +
  session_288.md + the worklog + the captures 268-271.
