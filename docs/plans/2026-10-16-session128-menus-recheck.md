# Session 128 — the menu/popover-family second-cycle re-check + the one-fix session

The 128-c rotation — the session_273 close's named direction: **menus s113
is now the stalest re-check** (15 sessions back; the family source FROZEN
since s113 — topbar.tsx since s93, dropdown.tsx since s73, leads-page.tsx
since s113 itself — but the LENSES sharpened since: the F-126c1
TEXT-CONTENT census [proven twice: the apostrophe genus + the placeholder
genus], the F-127c2 SUBMIT-COLOR census on every footer button, the
F-119c2/F-125c1 token-ride census on every input surface).

## The walk design

The s127 PHASED idiom (L-127c5): the walk script OUTSIDE the repo
(`/home/z/my-project/walks/walk19-menus-recheck.ts`), one app×viewport per
invocation, censuses to /tmp JSON, the reference's auth state persisted +
reused (ONE login total), PORT 3141, the walk db a SEEDED copy per ours
phase. Both apps at 1440×900 + 390×844 through the s113 menu ladder: THE
ACCOUNT MENU (the trigger census · the open content geometry + computed
family · the ITEM census [tag/role/text/href/rect/pad/radius/font] · THE
MOUNT-FOCUS · THE KEYBOARD MODEL [ArrowDown → the first item + the
highlight wash] · THE TEXT-CONTENT census · Escape) + THE LEADS FILTERS
POPOVER (the trigger · the panel geometry incl. the @390 collision · the
four LABELs [the D-113a1 fix] · the two select triggers + two inputs
[the F-125c1 token-ride lens + the F-127c1 placeholder lens] · the four
buttons [the F-127c2 SUBMIT-COLOR lens] · THE FULL TEXT-CONTENT census ·
the scroll census · Escape) + THE ROW MENUS ours-only (leads/contacts/
accounts — the `row.` namespace, the reference's zero-data state, the
s73 bundle decode the contract).

## The walk as executed: 298 two-app axes, 4 raw diffs → 1 REAL defect

1. **F-128c1 THE MENU-ITEM HIGHLIGHT INK (real, both viewports)**: the
   keyboard-highlighted menu item computes `rgb(10,10,10)` ink on ours
   (`focus:text-foreground` — our --color-foreground #0a0a0a) where the
   reference's highlighted item computes `rgb(23,23,23)` (its
   accent-foreground #171717). **The M-81c2 genus on the DropdownMenu
   family**: the Select family's items were live-walked at s81 and fixed
   to the pair `focus:bg-line-soft focus:text-neutral-900` (select.tsx:
   113 — the s80 badge precedent for expressing its accent-foreground);
   the menu family's HIGHLIGHTED ink was never censused (the s113
   keyboard census measured only the #f5f5f5 wash bg — which byte-matches
   STILL). The resting ink inherits #0a0a0a on both apps (matched); only
   the focus wash's TEXT arm diverges.
2. **L-128c2 the s93 standing genus (adjudicated noise, record-only)**:
   the @390 account trigger x=290 (ours, RIGHT — beside our deliberate
   hamburger) vs the reference's x=16 (its search wrapper `display:none`
   at 390 leaves its right group the SOLE flex item → flex-START → LEFT —
   an accident of its own construction), and consequently the open menu
   x=246 (ours, align=end under the right trigger) vs x=0 (the
   reference's, clamp-shifted under its left trigger). Both triggers
   84×36; both menus 128×74 at y=56. The s93 record's standing
   instruction: "do NOT restructure to chase the accidental
   left-placement."

**The byte-equal contracts confirmed (the s113 byte-matches ALL HOLD)**:
the account-menu content geometry @1440 (128×74 at y=56, bottom/end) ·
the content computed family (white bg / #e5e5e5 border / 6px radius /
shadow-md / 4px pad / #0a0a0a ink / 128px min-w) · the ITEM census
([A/Profile href="/Profile", DIV/Logout] · rects · pads · fonts) · the
mount-focus (the content DIV) · the #f5f5f5 highlight BG · Escape · THE
FILTERS POPOVER FAMILY COMPLETE (the trigger · the panel geometry +
computed family · the four LABEL tags + fonts + margins · the two select
triggers' computed token-rides · the two inputs' placeholders ["All
Status"/"All Sources"/"0"/none] + computed · THE FOUR BUTTONS' colors —
the F-127c2 lens CLEAN, the footer pair both outline family · THE FULL
TEXT-CONTENT census · the scroll census · Escape) · the row-menu
ours-only contract (90 axes recorded: the leads trio [Edit / the DEAD
Convert to Opportunity / the text-red-600 Delete] + the contacts trio
[Edit / Log Activity / Delete] + the accounts trio [Edit / View
Insights / Delete], the content computed family byte-equal to the
account menu's across all three surfaces).

**The two new lenses both applied and CLEAN on this family**: the
TEXT-CONTENT census (zero typographic characters; the placeholder set
byte-equal) + the SUBMIT-COLOR census (the footer pair CLEAN — no bare
default Button anywhere; the F-127c2 genus absent).

## The remediation (the one-fix session)

- **D-128a0 THE HIGHLIGHT-INK FIX**: src/lib/page-layout.ts:986 —
  MENU_ITEM `focus:text-foreground` → `focus:text-neutral-900` (the
  M-81c2/s80 badge precedent: the reference's accent-foreground
  #171717 expressed as our neutral-900 literal; the select.tsx sibling
  already rides the pair).
- **D-128a1 THE PIN (RED-first)**: tests/page-layout.test.ts +1 it —
  the focus-wash TEXT arm pinned (`focus:text-neutral-900` positive +
  the `focus:text-foreground` negative). RED at the standing source →
  the fix → GREEN → the stash-proof (the fix reverted alone → the pin
  REDs alone).
- **D-128a2** the POST-FIX walk re-run (the two ours phases re-censused
  against the persisted reference JSONs — the reference unchanged, its
  login conserved) + the captures 240-243 + the VLM battery.
- **D-128a3** the docs realignment (SKILL v1.125.0 + the README badge
  2142 + AGENTS/CLAUDE/PAD + session_274.md + the worklog).

The count ladder: UNIT 2004 → 2005 (+1 it) · SUITES 110 UNCHANGED ·
E2E 137 UNCHANGED · badge 2141 → 2142.

## The execution record (appended post-execution)

The TDD ladder ran exactly as planned: RED (the new pin failed alone at
the standing source, the 2004 neighbors green) → the one-line fix →
GREEN (the file's full battery 187/187) → the stash-proof (the fix
reverted alone → the pin REDs alone, re-applied) → 110/2005 (the
docs-counts lockstep realigned across its 12 live-tense sites + the
F-108a2 line-census family — the pre-existing s125/s126 drift on the
page-layout rows corrected to the live 1583/187 in the same stroke).
The POST-FIX walk re-run: 298 axes, 2 raw diffs ONLY — the L-128c2
s93-genus position pair (@390 trigger + content x-offsets), ZERO real
defects; the highlight-ink axis byte-equal at BOTH viewports
(rgb(23,23,23) on both apps). The captures 240-243 (four unique md5s)
+ the VLM battery 4/4 × 4 CLEAN (240 reading the account menu open
with the highlighted Profile item — the F-128c1 fix visibly confirmed;
241 the Filters popover with the four labels + placeholders verbatim;
242 the row menu with the red Delete; 243 the 390 right-aligned
arrangement beside the hamburger). The final gate: lint 0/0 · tsc 0 ·
110/2005 · build · 137/137 e2e · the closing drift sweep CLEAN on all
four gates · census MATCH. src/ 1 file + tests/ 2 files changed (the
fix + the pin + the lockstep carriers). The walk-harness lesson
recorded: L-128c3 the Playwright hasText regex whitespace genus (the
regex form never matches icon-bearing buttons' leading whitespace —
STRING hasText is the cross-app idiom).
