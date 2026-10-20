# The session-155 plan — the LANDING interior census (the 155-c rotation)

Date: 2026-10-20 · Rotation: 155-c · probe:ref **#129 STABLE** at the
s147–s154 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no new bundle event; the round's direction (my judgment on the
session_327 next-round reading, the strongest named candidate): **the
census extended past the 9 auth'd app pages to the PUBLIC MARKETING
LANDING at `/` — the landing walked + gated as the census tool's
PUBLIC leg at ALL FOUR axes** (the L-153c1 doctrine's surface face:
a blind axis is a standing gap, and the landing is the last
never-geometry-walked surface).

## The rationale (the last blind surface)

The s153/s154 rounds closed the AXIS gaps (phone · tablet · landscape
· desktop — the sweep-viewport classes and the census axes now
coincide). The SURFACE gap remains: the census covers the 9 shell
pages; the marketing landing at `/` — the biggest composed surface in
the app (the sticky header + the hero's CSS mock dashboard + the 6
feature cards + the 3 pricing tiers + the 6 FAQ items + the footer,
s142-built, 719 lines) — has NEVER been geometry-censused at any
axis. Its standing gates:

- the four viewport sweeps hold the landing LOGGED-IN, ABOVE-FOLD
  only (the y≈900 clip — the F-149c3 lesson);
- the fullpage gate holds the landing GUEST-side at DESKTOP + PHONE
  only, at **pixel margin** (0.093%/0.316% — the guest pill + the
  raster floor, STANDING_EXPLAINED) — a pixel gate carries margin by
  construction (the L-152c2 doctrine); the landing's interior has
  never been decoded face-by-face;
- **the tablet 768×1024 + landscape 1024×768 landing interiors are
  FULLY blind** — no gate at all covers them (the fullpage gate runs
  two classes; the sweeps clip at the fold), and the landing's
  md:/lg: grid regimes (the pricing tiers, the mock dashboard's
  lg: columns, the hero split) take construction at exactly those
  frames.

The s142 build is 13 sessions old; the s149 walk39 decode (the
repriced tiers · the Advanced card's sixth feature · the preview rows'
≥sm leading) proves drift ACCUMULATES on this surface between bundle
events. The census protocol (the byte-parity zero-margin instrument)
is the standing cure.

## The audits (155-a / 155-b)

- **155-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **119/2217**
  · build · **e2e 153/153** (clean first run) — the EXACT s154-ship
  match.
- **155-b**: probe:ref **#129 STABLE** at the s147–s154 fingerprint ·
  the drawer battery GREEN (inside e2e 153/153 — the mobile-nav
  contract, the user's standing particular-attention item) · **the SIX
  drift gates CLEAN ×6** (the four viewport + the fullpage at the
  exact standing values 0.093%/0.316% at equal heights 4990/7259 +
  the census gate all-36 zero unexplained) · sitemap 11 routes +
  robots + the SEO meta · db census MATCH 15/24/10/23/12 + 4 users ·
  the tree clean · zero dep changes.

## The public-leg design (additive — the app-pages protocol untouched)

- **GUEST contexts** (the s149 fullpage doctrine): the landing is the
  public marketing surface; NO login, NO storageState on either app —
  a fresh GUEST context per axis (the reference renders its
  "Edit with Base 44" pill to guests; ours never has it).
- **THE ANCHOR** (the walk45 probe decode): both apps' landing root is
  `div.min-h-screen.bg-white` (ours carries `id="top"` at body level;
  the reference's is `#root`'s first child). The collector anchors
  there — the pill (a body-level `div#base44-edit-badge` sibling,
  position:fixed) and the shadcn Toaster portal sit OUTSIDE the anchor
  on both apps and never enter the census. The pill genus stays in
  STANDING_EXPLAINED (the fullpage gate's floor), never mirrored,
  never censused.
- **THE HEIGHT SEAM**: the landing scrolls the DOCUMENT (no
  main.overflow-auto) — the public leg's height is
  `docH = document.documentElement.scrollHeight` (byte-equal standing:
  4990 desktop · 7259 phone, the fullpage gate's equal heights); the
  geometry is anchor-relative (`r.top − anchorRect.top` —
  scroll-independent, no scroll pass needed: no lazy-render patterns on
  either landing).
- **THE FLOOR**: the s95 poke-out discriminator travels with the
  frame — the public leg's floor is the VIEWPORT width (the document
  column; a box wider than the viewport is the poke-out face).
- **`PUBLIC_PAGES = [{ name: "landing", path: "/" }]`** — a separate
  list (the 9 INTERIOR_PAGES untouched); the combined `--pages`
  filter (the s95 idiom) selects across both lists — `--pages landing`
  runs the public leg alone at all four axes (the mutation-proof
  idiom); the app-pages login phase is GUARDED (an app-empty
  selection skips the login; a public-empty selection skips the guest
  contexts); ONE zero-data + ONE seed-restore per invocation (the
  never-zeroed FINALLY spans both legs).
- **gate:full UNCHANGED**: `census:interior -- --fail-on-drift`
  covers the public leg internally — the six-gate chain stays six
  commands.

## The walk (walk45 — the maiden landing census + the mutation-proof)

- **PASS 1 THE MAIDEN LANDING CENSUS**: the landing at `/` on both
  apps as GUESTS, at all four axes (phone 390×844 · tablet 768×1024 ·
  landscape 1024×768 · desktop 1440×900), the same census evaluate +
  the same decoder seams (alignCensus / attributeGenera /
  censusVerdict) at the viewport floor. Expected decode faces: the
  md-grid regimes at tablet/landscape (the pricing tiers · the mock
  dashboard's lg: columns · the hero split — never compared below-fold
  at those frames), the s142 documented deviations (the truncate ·
  the FAQ aria superset · the working-blue brand — all
  geometry-invisible or cls-mirror faces), whatever the maiden walk
  surfaces. Every delta attributes to a named genus or it is a REAL
  defect → remediated, not absorbed.
- **PASS 2 THE LANDING MUTATION-PROOF**: plant a ghost element in the
  landing (string surgery on landing-page.tsx — the s152/s153/s154
  idiom) → `census:interior --pages landing --fail-on-drift` → expect
  RED (the ghost subtree decoded ours-extra at all four axes — the
  failure axis-prefixed) → the string-surgery revert → GREEN. The
  ghost class then fails the gate on the PUBLIC leg at ALL FOUR axes.

## The remediation (TDD — the pin ledger)

- **D-155a1 the RED pins** (`tests/interior-census-tool.test.ts`): the
  s152 nine-page pin RE-ANCHORED (the 9 app pages + the landing PUBLIC
  leg; about/contact/login stay out) + the PUBLIC_PAGES contract +
  the combined --pages filter (landing composes · `--pages landing`
  alone · unknown fail-fast lists all 10) + the run-loop src pin (the
  per-axis GUEST contexts · the empty-list guards · the ONE
  zero-data/seed-restore) + the anchor seam src pin (the
  `div.min-h-screen.bg-white` anchor · the pill/Toaster exclusion ·
  the documentElement.scrollHeight height) + the landing verdict
  (docH ≠ 0 REDs — the landing is NEVER skipped; no DATA genus) + the
  landing mutation-proof doctrine pin. **RED at birth → the
  implementation → GREEN.**
- **D-155a2 the implementation**: PUBLIC_PAGES + censusPublicPage +
  the guest contexts in the axes loop + the combined --pages filter +
  the report re-anchor (`scripts/interior-census.ts`, additive — the
  9-page protocol byte-identical).
- **D-155a3 the decode-driven pins + fixes** (whatever the maiden walk
  surfaces): each real face pinned RED → remediated/absorbed → GREEN.
- **D-155a4 the count ladder**: the docs-counts UNIT constant + the
  lockstep sites flipped atomically (assert-first) · the
  CLAUDE-carrier pins · the SKILL **v1.152.0** + the s155 head (the
  s154 layer demoted beneath) + the Appendix B totals + the
  layer-axis pin.
- **D-155a5 the captures 361-364** (the landing guest pairs at the
  decode zones, scrolled + verified in-frame) + the VLM battery 2/2.
- **D-155a6 the verification chain**: lint 0/0 · tsc 0 · unit (the new
  ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  (the census gate now 40 page-axis runs — the 36 standing + the
  landing × 4) · census MATCH + the two-commit ship via the SSH
  wrapper.
- **D-155a7 the docs realignment**: the AGENTS Session-155 section ·
  the PAD session-155 row · the session_329 record + this plan
  execution record + the worklog Task ID 155.

## The lessons (recorded at ship)

- **L-155c1 a blind surface is a standing gap** (the axis doctrine's
  surface face): the axis pair s153/s154 closed the viewport gaps;
  the SURFACE gap is the same lesson at 90° — a page the census
  never walks is held only at pixel margin, and pixel margin absorbs
  real drift by construction (the s149 walk39 proof: three decodes
  accumulated on the landing between bundle events).
- **L-155c2 the context class follows the surface** (the guest
  doctrine): the public leg censuses GUESTS — the logged-in protocol
  (login + zero-data + the app chrome) is the WRONG instrument for a
  public marketing surface; the anchor + the height seam + the floor
  travel with the surface's own scroller (the document), never
  one-size-fits-all.
- **L-155c3 the decoder's passes are only as tested as their
  reachable inputs**: two self-match paths sat dead for three
  sessions because no paired event could ever reach them — a new
  surface class exercised the dead code and the negatives caught
  it; the mutation-proof doctrine extends to the decoder itself.

## The execution record (filled at ship)

- [x] 155-a / 155-b the audits (the exact s154-ship baseline · probe
      #129 STABLE · six gates CLEAN ×6)
- [x] D-155a1 the RED pins (+8 — 5 RED + 2 RED at birth; the s152
      nine-page pin's title re-anchored)
- [x] D-155a2 the implementation (the public leg — additive; the
      mid-red fixture fix)
- [x] PASS 1 the maiden landing census (ALL FOUR axes born CLEAN —
      docH byte-equal Δ0 everywhere, 364/364 elements; the decode
      ledger: the TEXT-NODE CARDINALITY face [the pricing pairs,
      live-data mis-bucketed → composition-split + live-data
      WORKSPACE-SCOPED] + TWO LATENT DECODER SELF-MATCH DEFECTS
      closed [pairedOpposite + the wrapper-twin pass])
- [x] PASS 2 the landing mutation-proof (planted → RED [320
      unexplained + docH Δ44 at phone · 7 at tablet/landscape ·
      exit 1, axis-prefixed] → reverted → GREEN [exit 0])
- [x] D-155a3 the decode-driven pins + fixes (the cardinality face +
      the live-data scoping + the two self-match exclusions — all
      RED at birth → GREEN)
- [x] D-155a4 the count ladder (UNIT 2217→2225 · badge 2370→2378 ·
      the 19 sites atomically [17 live + 2 s154-audit RESTORES] ·
      the CLAUDE carriers · the SKILL v1.152.0 + the s155 head +
      the Appendix B + the layer-axis pin)
- [x] D-155a5 the captures 361-364 + the VLM battery 2/2 (the
      pricing pair MATCH; the hero pair — every element identical
      per the VLM, the guest pill the documented genus on both
      adjudications)
- [x] D-155a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      119/2225 · build · e2e 153/153 the definitive run [the
      M-72c1 cold-isolation face documented] · the SIX drift gates
      CLEAN ×6 — the census gate at 40 page-axis runs, all zero
      unexplained · census MATCH)
- [x] D-155a7 the docs realignment (the AGENTS Session-155 section ·
      the PAD session-155 row + the Total row restored · the
      session_329 record + this execution record + the worklog Task
      ID 155)
