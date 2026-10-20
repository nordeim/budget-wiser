# The session-154 plan — the census TABLET legs (the 154-c rotation)

Date: 2026-10-20 · Rotation: 154-c · probe:ref #128 STABLE at the
s147–s153 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no new bundle event; the round's direction (my judgment on the
session_325 next-round reading, the strongest named candidate): **the
census extended to the tablet axes — the 768×1024 + 1024×768 interiors
walked + gated as the census tool's third and fourth legs** (the L-153c1
doctrine: a census axis is cheap, a blind axis is a standing gap).

## The rationale (the last two blind interior axes)

The s153 extension proved the dead zone is PER-AXIS and left the tool
with the axis abstraction (CENSUS_AXES + contentFloor + the --axis
flag + the data-driven axes loop). The pixel sweeps cover FOUR viewport
classes (1920×1080 · 390×844 · 768×1024 · 1024×768) but the interior
census covers only TWO — the 768×1024 and 1024×768 interiors have
NEVER been geometry-censused. Those two axes are the two remaining
layout regimes:

- **tablet 768×1024 — the md BOUNDARY axis**: the sidebar's first
  appearance frame (`hidden md:flex w-64` — page-layout.ts:203). At
  exactly 768 the content column drops from 703px (767, sidebar
  hidden) to 448px (768, the w-64 sidebar in flow) — the floor
  TRAVELS DOWN at the boundary (the L-153c2 seam's boundary face:
  the wider frame floors lower because the sidebar enters flow). The
  448px content regime exists at NO other census axis — narrower
  than the phone floor's 358? No: wider (448 > 358), but with the
  DESKTOP layout tree (sidebar + sm:p-8 root + the lg-visible
  chrome). Grid wrapping, table columns, and chart widths all take
  a regime neither standing leg covers.
- **landscape 1024×768 — the lg-adjacent axis**: the 704px content
  column (1024−256−64) with the full desktop tree at half the
  desktop axis's slack — the th-label-stretch genus's intermediate
  face (between the phone's content-width columns and the 1120px
  stretch) may surface here.

The s95 poke-out genus at the new floors: the reference's bare flex-1
tables poke past the 448/704 floors differently than past 358/1120 —
the discriminator must hold at every axis (the in-container width
delta stays RED).

## The audits (154-a / 154-b)

- **154-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **119/2207**
  · build · **e2e 153/153** — the EXACT s153-ship match.
- **154-b**: probe:ref **#128 STABLE** at the s147–s153 fingerprint ·
  the drawer battery GREEN (inside e2e 153/153 — the mobile-nav
  contract, the user's standing particular-attention item) · **the SIX
  drift gates CLEAN ×6** (the four viewport classes + the fullpage at
  the exact standing values 0.093%/0.316% at equal heights 4990/7259 +
  the census gate all-18 zero unexplained) · sitemap 11 routes +
  robots + the SEO meta · the tree clean · zero dep changes.

## The walk (walk44 — the maiden tablet/landscape census + the mutation-proof)

- **PASS 1 THE MAIDEN TABLET + LANDSCAPE CENSUS**: the 9 app pages at
  **768×1024** and **1024×768**, both apps logged in, ours at the
  matched ZERO-DATA state, the same census evaluate + the same decoder
  seams (alignCensus / alignSettings / attributeGenera /
  censusVerdict) at each axis's contentFloor. Expected decode faces:
  the standing genera reproducing at the new axes — plus whatever the
  448/704 regimes show that neither standing leg did (the
  intermediate th-label-stretch face, the s95 poke-out at the new
  floors, any wrapping/regime drift). Every delta attributes to a
  named genus or it is a REAL defect → remediated, not absorbed.
- **PASS 2 THE TABLET MUTATION-PROOF**: replant the F-151c1 ghost
  (string surgery on the dashboard's Lead Sources CardHeader — the
  s152/s153 idiom) → `census:interior --axis tablet --pages dashboard
  --fail-on-drift` → expect RED (the ghost subtree decoded
  ours-extra at the 768 layout tree) → the string-surgery revert →
  GREEN. The F-151c1 class then fails the gate at ALL FOUR axes
  (phone s152 · desktop s153 · tablet s154).

## The tool design (the axis extension — additive, data-driven)

- `CENSUS_AXES` gains `tablet` 768×1024 + `landscape` 1024×768
  (ascending width: phone · tablet · landscape · desktop). The axes
  loop, the login pair, the report sections, the --axis subsets, and
  the axis-prefixed verdict are ALL data-driven — the implementation
  is the two entries + the header/comment re-anchor. gate:full
  UNCHANGED: `census:interior -- --fail-on-drift` covers all four
  legs internally — the six-gate chain stays six commands.
- `contentFloor` needs NO change: 768→448 and 1024→704 already fall
  out of the standing formula (`≥768` → width−256−64 — the sidebar
  from md, the sm:p-8 root). The md-BOUNDARY face is pinned as the
  doctrine's boundary decode: 767→703 vs 768→448 — the floor drops
  255px at the boundary because the sidebar enters flow (a WIDER
  frame CAN floor lower at a breakpoint — the s153 monotonicity pin
  only spans 390→1440, correctly).

## The remediation (TDD — the pin ledger)

- **D-154a1 the RED pins** (`tests/interior-census-tool.test.ts`):
  the s153 two-axis pins FLIPPED in place (the four-axis
  CENSUS_AXES contract + the parseAxisArg ALL default) + the NEW
  session-154 describe: the landscape floor anchor (1024→704) + the
  md-boundary floor face (767→703 · 768→448 — the sidebar's
  appearance costs 256px of content at exactly md) + the --axis
  tablet/landscape subsets + the four-axis verdict (a tablet-leg RED
  with phone+desktop GREEN fails — no leg masks another) + the
  tablet mutation-proof doctrine pin (the tool header documents
  `--axis tablet --pages dashboard`). **RED at birth → the
  implementation → GREEN.**
- **D-154a2 the implementation**: the two CENSUS_AXES entries + the
  header re-anchor (`scripts/interior-census.ts`, additive — the
  standing phone/desktop behavior byte-identical).
- **D-154a3 the count ladder**: the docs-counts UNIT constant + the
  lockstep sites flipped atomically (assert-first) · the
  CLAUDE-carrier pins · the SKILL **v1.151.0** + the s154 head (the
  s153 layer demoted beneath) + the Appendix B totals.
- **D-154a4 the captures 357-360** (the census surfaces at the new
  axes: the dashboard + contacts tablet/landscape pairs at the
  matched zero-data state) + the VLM battery 2/2.
- **D-154a5 the verification chain**: lint 0/0 · tsc 0 · unit (the new
  ladder) · build · e2e 153/153 · **the drift gates CLEAN** (the four
  viewport + the fullpage + the census gate at ALL FOUR axes) ·
  census MATCH + the two-commit ship via the SSH wrapper.
- **D-154a6 the docs realignment**: the AGENTS Session-154 section ·
  the PAD session-154 row · the session_327 record + the plan
  execution record + the worklog Task ID 154.

## The lessons (recorded at ship)

- **L-154c1 the boundary is an axis**: the md breakpoint (768) is its
  own layout regime — the sidebar's first-appearance frame, where
  the content column drops 255px in one viewport step (703→448).
  A census axis AT the boundary is the only instrument that sees
  the regime on both sides of the flip; the floor "inversion" at
  the boundary is the doctrine's face, not a paradox (a wider frame
  CAN floor lower at a breakpoint).
- **L-154c2 the poke's energy has three destinations**: the s95
  genus pokes past the content column at narrow frames (the walk41
  face), past its fair share of the flex row at lg frames (the
  sibling-squeeze face — the ref's own rail deforms), and cascades
  into its descendants at every frame (the row/input/twin faces).
  A genus decoder must absorb the ROOT and the CASCADE — the floor
  test alone only ever caught the first destination.
- **L-154c3 the hidden token has no geometry until the frame is
  tight**: the stale px-3 text-xs survived 147 sessions of census
  GREEN because w-8 dominated at every standing axis — the token
  only bites when the flex row runs out of slack (1024's 137px vs
  150px title zone). A new axis is a NEW CONSTRAINT SOLVER: every
  cls token re-arbitrates at a new frame.

## The execution record (filled at ship)

- [x] 154-a / 154-b the audits (the exact s153-ship baseline · probe
      #128 STABLE · six gates CLEAN ×6)
- [x] PASS 1 the maiden tablet + landscape census (ALL 36 page-axis
      runs at ZERO unexplained; FOUR real decodes — F-154c1 the
      px-less ellipsis icon face [size=sm → size=icon, the landscape
      dashboard leg CLEAN on the fix alone] + the s95 genus's three
      new faces [the tablet cascade · the lg sibling-squeeze · the
      displaced twins] + the settings DATA genus's two tight-frame
      faces [the row-boxes-from-matches · the vertical twins])
- [x] PASS 2 the tablet mutation-proof (planted → RED [38
      unexplained + mainH Δ4, axis-prefixed [tablet]] → reverted →
      GREEN — the F-151c1 class fails at ALL FOUR axes)
- [x] D-154a1 the RED pins (+10 — RED at birth) → the implementation
      → GREEN (the s152 poke-out negative re-anchored to the
      outside-the-poke-cascade form)
- [x] D-154a2 the two-axis entries + the decoder passes + the
      dashboard source fix
- [x] D-154a3 the count ladder (UNIT 2207→2217 · SUITES held 119 ·
      badge 2360→2370 · the 12 lockstep sites atomically · the
      historical clauses restored · the CLAUDE carriers · the SKILL
      v1.151.0 + the s154 head + the Appendix B + the layer-axis pin)
- [x] D-154a4 the captures 357-360 + the VLM battery 2/2 (both pairs
      MATCH — the accounts pair confirms the ref's own squeezed rail)
- [x] D-154a5 the verification chain (lint 0/0 · tsc 0 · 119/2217 ·
      build · e2e 153/153 the definitive run · the SIX drift gates
      CLEAN ×6 — the census gate at ALL FOUR axes · census MATCH)
- [x] D-154a6 the docs realignment + the ship
