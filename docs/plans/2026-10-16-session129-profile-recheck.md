# Session 129 — the profile/Settings-Data family second-cycle re-check + the three-fix session

The 129-c rotation — the session_275 close's named direction: **the s114
profile + settings Data-tab family is now the stalest re-check** (15 sessions
back; the family source FROZEN since s114 — profile-page.tsx/settings-page.tsx
untouched, the page-layout.ts hunks since confined to OTHER constants — but
the LENSES sharpened since: the F-126c1 TEXT-CONTENT census [proven thrice],
the F-127c2 SUBMIT-COLOR census, the F-119c2/F-125c1 token-ride census, and
**THE NEW F-128c1 HIGHLIGHTED-STATE computed census** — the focus/active/
data-highlighted states, not just the resting family — carried per the
session_275 close).

## The walk design

The s127/s128 PHASED idiom (L-127c5): the walk script OUTSIDE the repo
(`/home/z/my-project/walks/walk20-profile-recheck.ts`), one app×viewport per
invocation, censuses to /tmp JSON, the reference's auth state persisted +
reused (ONE login total), PORT 3141, the walk db a SEEDED copy per ours-phase.
Both apps at 1440×900 + 390×844 through the s114 ladder: **THE /PROFILE
LADDER** (the header + the grid geometry + the personal card family + the
avatar/fallback/glyph + the camera button + the form fields incl. the
D-114a2 bare email/role ids + the placeholder census + the side cards + the
badge + THE FULL TEXT-CONTENT census + THE HIGHLIGHTED-STATE census [the Save
hover:/90 alpha + focus-visible ring · the Upload Photo hover + ring · the
disabled states] + the interaction battery [the filechooser + the upload POST
+ the preview swap + the toast — no Save on the reference; the full
PATCH+reload round-trip ours-only]) + **THE SETTINGS DATA-TAB LADDER** (the
segmented tablist + the three triggers resting + THE ACTIVE PILL [the s125
bg-white literal re-verified] + **THE FOCUS-VISIBLE RING CENSUS — the
ring-offset-color genus** + the tablist→panel gap + the Import/Export cards +
the seven-button census + the D-114a1 desc re-check + the Danger Zone
[the chrome · the disabled→enabled→hover trio on the destructive reset —
NEVER clicked] + THE FULL TEXT-CONTENT census + THE DOWNLOAD CONTRACTS [the
three CSV templates md5 both apps; the zero-data exports EMPTY on the
reference — the s26-P4 platform contract, the `dlx.` namespace]).

## The walk as executed: 700 two-app axes, 30 raw diffs → 3 REAL defects

1. **F-129c1 THE SEGMENTED RING-OFFSET INK (real, both viewports)**:
   `TABS_SEGMENTED.trigger`'s `ring-offset-background` resolves to OUR
   `--color-background` **#f9fafb** where the reference's resolves to ITS
   stock white **#ffffff** (hsl(0 0% 100%)) — live-confirmed TWICE: the
   resting `--tw-ring-offset-color` custom property AND the real
   focus-visible halo layer (`rgba(249,250,251,1) 0px 0px 0px 2px` vs
   `rgb(255,255,255) 0px 0px 0px 2px` inside the focus boxShadow). **The
   F-119c2 inverted-token genus's THIRD arm** (after the s119
   primary-foreground and the s125 active-pill bg arms): our theme
   deliberately redefined `--color-background` to the page-bg #f9fafb, and
   every `ring-offset-background` ride with a NONZERO offset width inherits
   the divergence. Never censused before — the offset halo renders only in
   the focus-visible state, invisible to every resting-state walk and drift
   gate. Exactly what the F-128c1 highlighted-state lens exists to catch.
   The visible-ride census: `TABS_PILL.trigger` + `TABS_SEGMENTED.trigger`
   (both `focus-visible:ring-offset-2`) + the tabs `PANEL_BASE` — the
   `SELECT_TRIGGER.base` ride is the **offset-0 no-op** (zero-extent layer,
   invisible — the documented M-81c3 note; untouched).
2. **F-129c2 THE DESTRUCTIVE HOVER (real, both viewports)**: the Danger
   Zone's destructive reset hovers to solid **rgb(220,38,38)** on ours
   (`hover:bg-red-600` — the darker solid step) where the reference computes
   **rgba(239,68,68,0.9)** — its destructive at 90% ALPHA. **The M-80c1
   genus on the destructive variant**: the reference's hovers are the ALPHA
   form (`hover:bg-<token>/90`, the s80 Save-button precedent
   `hover:bg-neutral-900/90`); our destructive shipped the solid
   red-600 step. The resting bg byte-matches (#ef4444 both); only the hover
   arm diverges — never censused before (the first hover-bg census on the
   variant).
3. **F-129c3 THE OUTLINE HOVER TEXT (real, both viewports, both censused
   surfaces)**: the outline buttons' hover text computes **rgb(10,10,10)**
   on ours (no hover:text arm — the text stays at `text-foreground`
   #0a0a0a) where the reference computes **rgb(23,23,23)** — its stock
   outline variant's `hover:text-accent-foreground` (#171717). The F-128c1
   value pair shipped REAL last session (the menu-item ink); the outline
   variant's hover arm is the same genus on the Button family. Live-walked
   on BOTH censused outline surfaces (the Data-tab Download Contacts
   Template button + the profile Upload Photo) — the shared variant, not a
   page-local class. The s82-era bundle decode missed the hover:text arm —
   the F-127c1 doctrine again: the live DOM is the ground truth.

**The adjudicated noise (record-only)**: **L-129c4 the invisible outline
axis** (ours `1px none` vs the reference's `2px solid rgba(0,0,0,0)` /
`rgba(10,10,10,0.004)` — both non-rendering; the visible focus indicator is
the RING, which byte-matches outside the F-129c1 halo) · **L-129c5 the
disabled-cursor axis** (the destructive reset's `cursor: pointer` vs
`default` on a `pointer-events-none` element — rendering-equal via different
mechanisms, the s86 genus family) · **L-129c6 the s73 span-vs-div chip
genus** (the reference's side-card 48px chips are DIVs — the walk's
span-only locator read empty on its side; the s114 computed-equal record
stands, our chip values byte-match the documented hex pairs).

**The byte-equal contracts confirmed (the s114 byte-matches ALL HOLD)**: the
/Profile geometry (the grid 896×594/358-wide · the personal card 589×594 ·
the avatar 96/80 + the blue-100 fallback + the stroke-2 glyph · the camera
button · the nameGap 12 [the s91 compensator] · the four side cards
283×224/98/98/98) + the computed family on every axis + the D-114a2 bare
email/role ids + the disabled gray-50 washes + the placeholder set
("Enter your full name" byte-equal) + the Save resting family
(#171717/#fafafa — the F-127c2 lens CLEAN) + THE FULL TEXT-CONTENT census
on both surfaces (the F-126c1 lens CLEAN — zero typographic characters) +
the segmented ACTIVE PILL (the s125 `bg-white` literal re-verified live) +
the tablist→panel gap 24 + the Data cards 1120×160/1120×160/1120×240 + the
seven-button resting census + the D-114a1 desc (14px/20px red-600) + the
Danger chrome (red-50 bg / #fecdd3 border / red-700 title) + the
disabled→enabled reset semantics + THE DOWNLOAD CONTRACTS (the three CSV
templates **md5-IDENTICAL** on both apps; the reference's zero-data exports
EMPTY — the s26-P4 platform contract) + the interaction battery (the
filechooser on both · the upload POST + the preview swap + the toast on
both · the PATCH 200 + the 500ms reload + the persisted img ours-only).

## The remediation (the three-fix session)

- **D-129a0 THE RING-OFFSET-INK FIX**: `src/lib/page-layout.ts`
  TABS_PILL.trigger + TABS_SEGMENTED.trigger + `src/components/ui/tabs.tsx`
  PANEL_BASE — `ring-offset-background` RETIRED at the three visible-offset
  rides (the **DIALOG_CLOSE s11 computed-contract precedent**: the v4
  default `--tw-ring-offset-color` is #fff, byte-equal to the reference's
  hsl(0 0% 100%); the class would set var(--color-background) #f9fafb —
  "introducing the very divergence it would pin away"). The
  SELECT_TRIGGER's offset-0 no-op ride stays (bundle-verbatim, invisible).
- **D-129a1 THE DESTRUCTIVE-HOVER FIX**: `src/components/ui/button.tsx`
  destructive variant — `hover:bg-red-600` → `hover:bg-danger/90` (the
  M-80c1 alpha-hover genus; computes rgba(239,68,68,0.9) byte-equal).
- **D-129a2 THE OUTLINE-HOVER-TEXT FIX**: `src/components/ui/button.tsx`
  outline variant — gains `hover:text-neutral-900` (the reference's
  hover:text-accent-foreground #171717 expressed as our neutral-900
  literal — the s80 badge precedent, the F-128c1 value pair).
- **D-129a3 THE PINS (RED-first)**: tests/page-layout.test.ts — the two
  standing TABS pins RE-ANCHORED in place to the negative form
  (`not.toContain("ring-offset-background")` — the DIALOG_CLOSE pin
  idiom) + THREE NEW its (the tabs PANEL_BASE retirement + the destructive
  alpha hover + the outline hover-text arm, each with its negative).
  RED at the standing source → the three fixes → GREEN → the stash-proofs
  (each fix reverted alone → its pin REDs alone).
- **D-129a4** the POST-FIX walk re-run (the two ours phases re-censused
  against the persisted reference JSONs — the reference unchanged, its
  login conserved) + the captures 244-247 + the VLM battery. The
  walk-harness fix folded in first: `ia.saveDisabledBefore` re-namespaced
  to `ia2.` (the ours-only axis — the phase-3 harness slip).
- **D-129a5** the docs realignment (SKILL v1.126.0 + the README badge 2145
  + AGENTS/CLAUDE/PAD + session_276.md + this plan's execution record +
  the repo worklog's Session-128 record gap repair — the s128 ship
  recorded its worklog entry in the WORKSPACE worklog only).

The count ladder: UNIT 2005 → 2008 (+3 its) · SUITES 110 UNCHANGED · E2E
137 UNCHANGED · badge 2142 → 2145.

## The walk-harness lessons (record-only)

- **L-129c7 the evaluate-closure trap**: Playwright `evaluate` callbacks
  are serialized — an outer-scope helper referenced inside the callback
  throws at runtime (the `normCssSpacesInPage` slip). Normalize in the
  driver, never inside the callback.
- **L-129c8 the hidden-panel locator**: `[role="tabpanel"]` resolves to
  the FIRST (hidden, config) panel — all three ship in the DOM; filter
  `[data-state="active"]`.
- **L-129c9 the ancestor-climb bounds**: text-anchored climbs need a
  terminal condition (the bordered+shadowed card for cards; the
  display:grid element for grids; the EXACT text match for titles) or the
  climb escapes to the page root (the Danger card 0,0 1440x900 slip).

## The execution record (appended post-execution)

The TDD ladder ran exactly as planned: RED (the 2 TABS re-anchors + the
3 new its failed alone at the standing source — 5 failed | 185 passed;
the 2005 neighbors green) → the three fixes (page-layout.ts +
button.tsx + tabs.tsx) → GREEN (293/293 across the fix-adjacent battery;
the file battery 190/190) → **the 3 stash-proofs** (the ring-offset
revert alone → its 3 pins RED alone; the button revert alone → its 2
pins RED alone; re-applied clean) → **110/2008** (the docs-counts
lockstep realigned across its 14 stale sites + the dialog-geometry CLAUDE
carry-forward + the F-108a2 line-census family 1583/187 → 1600/190 —
the live `wc -l` + it-count re-derived).

The POST-FIX walk re-run: 698 axes, **21 adjudicated diffs ONLY — ZERO
real defects** — the F-129c1 halo byte-equal `rgb(255,255,255)` on both
apps at both viewports (the residual pair: the `#fff` vs `hsl(0 0%
100%)` FORMAT-ONLY serialization + a 0.0002px @390 fractional-width
rounding); the F-129c2 axis GONE (the destructive hover byte-equal
rgba(239,68,68,0.9)); the F-129c3 axes GONE (the hover text byte-equal
rgb(23,23,23) on both censused surfaces). The walk-harness fix folded
in first (the `ia.saveDisabledBefore` re-namespacing to `ia2.`).

The captures 244-247 (four unique md5s 619ae301/43c2d540/b0ce2cec/
807d7535, the standing build on PORT 3141 + the seeded walk db): 244
the /Profile family @1440 · 245 the Settings Data tab @1440 · 246 the
FOCUSED Data trigger with the pure-white halo (the F-129c1 fix visibly
confirmed) · 247 the 390 Data face. The VLM battery 4/4 × 4 CLEAN.

The final gate: lint 0/0 · tsc 0 · 110/2008 · build · 137/137 e2e ·
the closing drift sweep CLEAN on all four gates · census MATCH. src/ 3
files + tests/ 3 files changed (page-layout.ts + button.tsx + tabs.tsx;
page-layout.test.ts + docs-counts.test.ts + dialog-geometry-parity.
test.ts). The walk-harness lessons recorded: L-129c7 the
evaluate-closure trap · L-129c8 the hidden-panel locator · L-129c9 the
ancestor-climb bounds.
