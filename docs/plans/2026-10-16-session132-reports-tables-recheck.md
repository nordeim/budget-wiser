# Session 132 — the reports-tables family third-cycle re-check (the freeze-pin session)

The 132-c rotation — the session_281 close's named direction: **the s116+ third-cycle
candidates, reports-tables FIRST** (the stalest never-re-walked two-app surface, 16
sessions back). The 132-a pre-walk inventory mapped the drift: the family source FROZEN
(the tables arm since s98, the export arm since s123) but the SHARED PRIMITIVES moved
under it — the s129 button outline hover-text + destructive alpha, the s130 ghost
hover-text, the s129 TABS_PILL/PANEL_BASE ring-offset retirement, the s125 active-pill
bg-white — and the LENSES sharpened since s116: the F-126c1 text-content census, the
F-127c2 submit-color census, THE F-128c1 highlighted-state computed census.

## The walk as executed (walk23, the phased idiom)

PASS 1 (zero-data, TWO-APP, both 1440×900 + 390×844, PORT 3141, the walk db, the
reference's storageState persisted + reused, ONE reference login total): the page +
header census · the five pill-tab triggers (texts/rects/fonts + the ACTIVE pill family +
**the focus-offset seam** — the resting `--tw-ring-offset-color` + the keyboard-focus
halo) · the filter-bar census (the four select triggers) · **THE NINE OUTLINE-BUTTON
HOVER CENSUS** (L-132a1 — the Saved Reports header, Reset, the bar CSV/PDF, the
per-table quartet) · the per-tab census (the TEXT-CONTENT lens + the ten tables' heads +
the empty rows + the card-height climb) · the pipeline export quartet · the select
OPEN-state census (L-132a6). PASS 2 (populated, OURS-ONLY): the ten row contracts +
the first cells + the badge census + the red-tint rows + the pattern texts.

## THE VERDICT — 461 two-app axes, 11 raw diffs, ZERO REAL PARITY DEFECTS

Every diff adjudicated (each decisively):

1. **tab0.ringOffsetColor ×2** — `#fff` vs `hsl(0 0% 100%)`: FORMAT-ONLY (both pure
   white) — the standing s129 residual (the 6-site family recorded at s129/s130).
2. **tab0.ringColor ×2** — ours `(unset)` vs ref `rgb(59,130,246,.5)` at REST: a
   NON-PAINTING custom-prop eagerness artifact (some base rule on the reference sets
   the var eagerly; v4 sets it only inside the focus-visible rule). **The decisive
   keyboard probe** (walk23b): under REAL Tab-key focus the reference's ring resolves
   `hsl(0 0% 3.9%)` — NEAR-BLACK, byte-equal with ours `#0a0a0a` — and both apps paint
   the identical halo structure (the white ~2px offset disk + the dark ~4px ring
   stroke + the active-pill shadow pair; the 0.97-vs-0.992 alpha deltas are sub-pixel
   rendering noise within the standing fuzzy tolerance). The L-132a2 axis SETTLED
   CLEAN — the s129 ring-offset retirement's sibling surface (the PILL) verified.
3. **tab0.focusVisible ×2** — `true` vs `false`: the programmatic-focus browser
   heuristic. **Plus the discovery (L-132c1)**: the REFERENCE's tab triggers ACTIVATE
   on programmatic focus (their Radix platform behavior; their tabs are tabIndex=-1 —
   the s12 keyboard-unreachable platform defect) where OURS ride the roving-tabindex
   a11y superset and activate on click only. Record-only (the deliberate superset).
4. **tab0.focusOutline ×2** — `rgb(115,115,115) 3px` vs `rgba(10,10,10,0.5) 3px`: the
   L-129c4 invisible-outline genus (ours outline-style:none — the focus-visible
   outline-none applies; the reference's platform-authored outline serializes at
   alpha 0.004 — nothing paints either way; the keyboard probe confirmed).
5. **selOpen.shadow** — the v4 dead-layer serialization genus: ours emits 4
   fully-transparent zero-extent layers + the 2 real; the reference 2 + the same 2
   real. Trimmed byte-equal (the normShadowLayers standing form).

**The harness artifact (L-132c1, resolved)**: the ref-side `btn.barPdf` census
recorded a 124×32 "Export PDF" button where ours recorded `.absent` — root cause: the
walk's block-B focus probe ACTIVATED the reference's pipeline tab (the focus-activation
side effect), so the block-C locator found the pipeline tab's per-table Export PDF.
**The targeted bar-PDF census (barprobe7)**: the REAL bar PDF button — text "PDF",
rect 81×32, font 12px/500, resting rgb(10,10,10)/rgb(255,255,255)/border
rgb(229,229,229)/radius 6px, HOVER rgb(23,23,23)/rgb(245,245,245) — **BYTE-EQUAL both
apps** (the s129 outline hover-text fix live-verified on yet another ride).

### The lenses on their maiden run on this surface — ALL CLEAN

- **L-132a1 (TOP — the nine outline hover rides)**: the bar CSV (the literal blue
  pair, hoverBg rgb(29,78,216)), the bar PDF, Reset, Saved Reports, the per-table
  quartet — every ride byte-equal (hover text rgb(23,23,23) + hover bg rgb(245,245,245)
  + the resting family) — the s129 fix verified on the surface it never touched.
- **L-132a2 (the pill focus halo)**: keyboard-probed byte-equal (above).
- **L-132a3 (the text-content lens)**: the full text-node census — byte-equal BOTH
  viewports (the chart titles, the axis vocabulary, the stage slugs, the heads, the
  empty-state copies).
- **L-132a4 (the geometry family)**: the chart-card census (chartprobe) — byte-equal
  on every axis both viewports: @1440 the half-cards 548×390, the pipeline/sources
  trios 357×390, **the Forecasting Accuracy 1120×434 wide row**, the plain table
  cards 548×167, the export-button headers 548×189; @390 the phone face 358×390
  charts, 358×434 Forecasting, 358×167 plain, **358×215/358×247 the pipeline phone
  title-wraps** — the complete s116 geometry contract re-verified byte-stable across
  16 sessions.
- **L-132a6 (the select OPEN state)**: the content + options + the highlighted wash —
  byte-equal modulo the dead-layer noise.

### PASS 2 (populated, ours-only) — every seeded contract holds

The ten row contracts (Recent Won 4 · Top Deals 10 · Open Deals 6 · At Risk 5 ·
Overdue 13 · By Owner 4 · Leads List 10 · Source Perf 5 · At Risk Accounts 2 ·
Account Summary 10 — byte-exact the s116 records) · the first cells 14px/500
rgb(10,10,10) on all ten · the outline Badge chrome 12px/600, border #e5e5e5, radius
6px, transparent bg — the 5 named sites (closed_won · prospecting · Meeting · new ·
active) · the red-tint rows bg rgb(254,242,242) on EXACTLY the 3 tables (dealsAtRisk
+ overdue + atRiskAccounts) · the red At Risk badge bg rgb(254,226,226) / text
rgb(153,27,27) · the "18d ago" last-activity text + the "Oct 14, 2026" MMM d, yyyy
overdue dates + the $-formatted revenue cells.

## The remediation (ZERO src changes — the s116 freeze-find pattern)

The walk surfaces no defect; the session ships the FREEZE PINS for the contracts the
walk censused that were never pinned (the L-132a4 named gap + the label contract the
bar-PDF investigation surfaced):

- **D-132a0 — THE CHART-CARD FAMILY FREEZE PIN** (+1 it in
  `tests/reports-tabcontent-parity.test.ts`): the SIXTEEN chart-card titles as a SET
  (never pinned — the s85 pins cover the grid split, the s116 pins the ten TABLE
  titles) + the geometry-bearing source family (the two-grid split re-verified, the
  `wide lg:col-span-3` Forecasting escape, the `height={300}` chart containers, the
  gap-6 grids) — read on the RAW source, the comment naming the walk-censused runtime
  rects (548×390 · 357×390 · 1120×434 · 358×390 · the 215/247 phone wraps) as the
  s132 walk record.
- **D-132a1 — THE BAR-TRIO LABEL FREEZE PIN** (+1 it in
  `tests/reports-page-parity.test.ts`): the exact label contract the walk proved —
  the BAR's PDF button label is **"PDF"** (the reference's own 81×32 button, NOT
  "Export PDF") where the PER-TABLE quartet carries the full "Export CSV"/"Export
  PDF" labels; the existing :264 pin is the weak substring form
  (`toContain("PDF")`); the pin freezes the exact per-surface label set.
- **D-132a2 — the docs realignment** (SKILL v1.129.0 + the README badge 2157 +
  AGENTS/CLAUDE/PAD + the session_282.md record + this plan's execution record + the
  repo worklog).

The count ladder: UNIT 2018 → 2020 (+2 its) · SUITES 111 UNCHANGED · E2E 137
UNCHANGED · badge 2155 → 2157.

## The TDD ladder

RED-first: the 2 new its FAIL at the standing source (the 16-title set has never been
asserted as a set — the negative form catches any title drift; the bar-trio label pin
RED against the current :264 weak form by asserting the EXACT set including the
negative "Export PDF"-NOT-on-the-bar) → GREEN after writing the pins (no src changes —
the pins freeze the STANDING source) → the stash-proof (each pin file reverted alone →
its it REDs alone).

## The walk-harness lessons (record-only)

- **L-132c1 — the focus-activation side effect**: programmatic `el.focus()` on the
  REFERENCE's tab triggers ACTIVATES the tab (their Radix platform behavior; their
  tabs are tabIndex=-1) — a census that focuses a tab MUST census every
  panel-dependent axis BEFORE the focus probe, or the panel state silently switches
  mid-census (the btn.barPdf artifact's root cause). Corollary: Playwright's
  `:has-text()` is case-INSENSITIVE substring — a text-is() is the exact form.
- **L-132c2 — the evaluate-arg discipline** (the L-129c7 re-learn): the populated
  flag must ride the evaluate ARGS (a module-level closure reference throws at
  serialization).
- **L-132c3 — the bar-PDF label census discipline**: the bar's PDF button label is
  "PDF" (81×32) — distinct from the per-table "Export PDF" — a
  `has-text("Export PDF")` locator NEVER finds the bar's button; use `text-is("PDF")`.

## The captures (256-259)

256 the zero-data reports face @1440 (the pill tab family + the filter bar + the empty
tables) · 257 the chart-card family @1440 (the sales tab's two-grid split + the
Forecasting wide row) · 258 the populated tables face @1440 (the badges + the red
rows) · 259 the phone face @390 (the pill grid 358×82 + the wrapped pipeline titles).
The VLM battery 4/4.

## The final gate

lint 0/0 · tsc 0 · **111/2020** · build · **137/137** · the closing drift sweep CLEAN
on all four gates · census MATCH. src/ ZERO files · tests/ 2 files changed (the two
pin files) · docs/ realigned.
