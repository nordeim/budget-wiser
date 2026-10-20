# The session-156 plan — the ABOUT/CONTACT census legs (the 156-c rotation)

Date: 2026-10-20 · Rotation: 156-c · probe:ref **#130 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no new bundle event; the round's direction (my judgment on the
session_329 next-round reading, the first-listed candidate): **the
two remaining never-censused shell surfaces — /about + /contact —
join INTERIOR_PAGES (the 11-page interior list; the census covers 12
surfaces at all four axes)**.

## The rationale (the last two blind interior surfaces)

The s155 landing leg closed the PUBLIC surface gap. Two shell
surfaces remain never-geometry-censused: **/about + /contact** — the
login-walled marketing family (the (marketing) route group renders
them inside AppShell since the s147 posture reversal — `main.overflow-
auto` interiors, exactly the 9 app pages' scroller class). Their
standing gates:

- the four viewport sweeps hold them LOGGED-IN, ABOVE-FOLD only (the
  y≈900 clip — the F-149c3 lesson);
- the s150 hand-walk (walk39-era) proved the phone-state geometry
  equal — /about mainH 1731 · /contact 897, byte-equal both apps —
  but a HAND walk, phone-only, never a standing gate;
- **the tablet/landscape/desktop interiors have NEVER been
  geometry-decoded** (the s150 walk measured phone only; the sweeps
  clip at the fold; no census has ever walked them);
- the 156-c pre-plan probe re-validated the s150 evidence at the
  current #130-stable bundle: /about mainH 1731 (phone) · 1047
  (desktop — never measured before), /contact 897 · 953 — **byte-equal
  both apps**, element counts 46/46 + 33/33 inside main, the
  construction current (the reference's own main `flex-1 overflow-auto
  bg-gray-50` vs ours `bg-background` — the token-mirror face on main
  ITSELF, never censused: the walk covers main's children only).

The s142 construction is 14 sessions old; the s149/s155 doctrine
(pixel margin absorbs real drift between bundle events) applies to
these surfaces exactly as it did to the landing.

## The audits (156-a / 156-b)

- **156-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **119/2225**
  · build · **e2e 153/153** (clean first run) — the EXACT s155-ship
  match.
- **156-b**: probe:ref **#130 STABLE** at the s147–s155 fingerprint ·
  the drawer battery GREEN (inside e2e 153/153 — the mobile-nav
  contract, the user's standing particular-attention item) · **the SIX
  drift gates CLEAN ×6** (the four viewport + the fullpage at the
  exact standing values 0.093%/0.316% at equal heights 4990/7259 +
  the census gate at ALL FOUR axes × 10 surfaces = 40 page-axis runs,
  all zero unexplained) · sitemap 11 routes + robots 200 + the SEO
  meta · db census MATCH 15/24/10/23/12 + 4 users · the tree clean ·
  zero dep changes.

## The legs design (additive — the logged-in protocol byte-identical)

- **THE PROTOCOL**: about/contact are INTERIOR pages — the existing
  `censusPage` collector (the main-anchored walk) works on them
  AS-IS (the probe decode: both apps render them inside
  `main.overflow-auto` logged-in; the s150 evidence + the fresh probe
  agree). The login phase, the zero-data phase, the per-axis contexts,
  the content floor — all standing, all reused. `INTERIOR_PAGES`
  grows 9→11 (about + contact appended after profile; the sweep
  lockstep held — both paths already in the sweep's PAGES).
- **THE LIVE-DATA SCOPE RE-ANCHOR (the 156-c hazard face)**:
  about/contact are STATIC marketing surfaces inside the shell — no
  workspace data. The s155 scoping keyed on `!isPublicPage` — under
  it, the new legs would absorb text-only drift as live-data (a
  changed headline on /about silently absorbed — the exact hazard
  the walk45 decode closed on the landing). The fix: the
  **STATIC_MARKETING_PAGES** scope (`landing` + `about` + `contact`)
  — live-data absorbs text-only pairs on the 9 DATA pages only;
  the static-marketing class stays RED, public or interior.
- **THE HEADER DOCTRINE RE-ANCHOR**: the INTERIOR_PAGES comment's
  "the marketing surfaces (landing/about/contact) and login have no
  main.overflow-auto interior" claim is WRONG for about/contact
  logged-in (the s150 walk + the 156-c probe: they scroll inside
  main; the landing and login are the true no-main surfaces).
- **gate:full UNCHANGED**: the census command covers the new legs
  internally — the six-gate chain stays six commands (the census
  gate grows to 48 page-axis runs).

## The walk (walk46 — the maiden census + the mutation-proof)

- **PASS 1 THE MAIDEN CENSUS**: about + contact at all four axes
  (phone 390×844 · tablet 768×1024 · landscape 1024×768 · desktop
  1440×900), both apps logged-in, the standing decoder seams. The
  expected decode faces: the sm: regimes at tablet/landscape (the
  about cards' `sm:grid-cols-2` · the h1's `sm:text-4xl` · the
  container's `sm:px-8` — never below-fold-decoded at those frames),
  whatever the maiden walk surfaces. Every delta attributes to a
  named genus or it is a REAL defect → remediated, not absorbed.
- **PASS 2 THE MUTATION-PROOF**: plant a ghost element in the about
  cards grid (string surgery on about/page.tsx — the s152/s153/s154/
  s155 idiom) → `census:interior --pages about --fail-on-drift` →
  expect RED (the ghost subtree decoded ours-extra, the failure
  axis-prefixed) → the string-surgery revert → GREEN. The F-151c1
  class then fails the gate on every censused surface — 12 of them.

## The remediation (TDD — the pin ledger)

- **D-156a1 the RED pins** (`tests/interior-census-tool.test.ts`): the
  s152 INTERIOR_PAGES pin RE-ANCHORED to the 11-page contract (about
  + contact, the sweep lockstep) + the CENSUS_ALL_PAGES 12-name
  composition + the STATIC_MARKETING_PAGES scope (about/contact join
  the landing as live-data negatives — the 156-c hazard face) + the
  about/contact verdict (mainH ≠ 0 REDs — no DATA genus, no skip; the
  s150/156-c byte-equal evidence) + the about/contact mutation-proof
  doctrine pin. **RED at birth → the implementation → GREEN.**
- **D-156a2 the implementation**: INTERIOR_PAGES + 2 entries +
  STATIC_MARKETING_PAGES + the live-data scope swap + the header
  doctrine re-anchor (`scripts/interior-census.ts`, additive).
- **D-156a3 the decode-driven pins + fixes** (whatever the maiden walk
  surfaces): each real face pinned RED → remediated/absorbed → GREEN.
- **D-156a4 the count ladder**: the docs-counts UNIT constant + the
  lockstep sites flipped atomically (assert-first) · the
  CLAUDE-carrier pins · the SKILL version + the s156 head (the s155
  layer demoted beneath) + the Appendix B totals + the layer-axis pin.
- **D-156a5 the captures** (the about/contact logged-in pairs at the
  decode zones, scrolled + verified in-frame) + the VLM battery 2/2.
- **D-156a6 the verification chain**: lint 0/0 · tsc 0 · unit (the new
  ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  (the census gate now 48 page-axis runs) · census MATCH + the
  two-commit ship via the SSH wrapper.
- **D-156a7 the docs realignment**: the AGENTS Session-156 section ·
  the PAD session-156 row · the session_331 record + this plan
  execution record + the worklog Task ID 156.

## The lessons (recorded at ship)

- **L-156c1 the surface class, not the route group, names the
  protocol** (about/contact live in the "marketing" route group but
  scroll like app pages — the collector follows the SCROLLER, never
  the label).
- **L-156c2 the hazard scope must name the SURFACE CLASS, not the
  dispatch** (keying live-data on `!isPublicPage` was correct only
  while every interior page carried workspace data — the first static
  interior page would have reopened the walk45 hazard; the
  static-marketing class is the invariant).
- **L-156c3 a clean maiden walk is the construction's own proof**
  (the s142 live-census discipline: pages built from the reference's
  own DOM byte-for-byte need no decoder faces — the census's
  all-MATCH maiden round is what parity looks like when the source
  was never approximated).

## The execution record (filled at ship)

- [x] 156-a / 156-b the audits (the exact s155-ship baseline · probe
      #130 STABLE · six gates CLEAN ×6)
- [x] D-156a1 the RED pins (+4 — 6 RED + 1 born-green at birth; the
      s152 nine-page pin + the s155 composition pins re-anchored)
- [x] D-156a2 the implementation (the two legs — additive; the
      STATIC_MARKETING scope + the header re-anchor)
- [x] PASS 1 the maiden census (ALL FOUR axes born CLEAN — mainH Δ0
      everywhere, 30/30 + 25/25 elements, every one a MATCH, zero
      genera — the first all-MATCH round; no decode needed)
- [x] PASS 2 the mutation-proof (planted → RED [phone: 28 unexplained
      + mainH Δ82 · desktop: 23 + Δ162 · exit 1, axis-prefixed] →
      reverted → GREEN [exit 0, the standing values])
- [x] D-156a3 the decode-driven pins + fixes (none required — the
      maiden walk born clean, L-156c3)
- [x] D-156a4 the count ladder (UNIT 2225→2229 · badge 2378→2382 ·
      the live sites atomically [count-ladder-156.py, assert-first,
      idempotent] · the historicals preserved · the CLAUDE carriers
      grew the 2225 forms · the SKILL v1.153.0 + the s156 head + the
      Appendix B + the layer-axis pin)
- [x] D-156a5 the captures 365-368 + the VLM battery 2/2 (the about
      tablet pair MATCH; the contact phone pair MATCH — the pill the
      documented genus on both adjudications)
- [x] D-156a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      119/2229 · build · e2e 153/153 clean first run · the SIX drift
      gates CLEAN ×6 — the census gate at 48 page-axis runs, all zero
      unexplained · census MATCH)
- [x] D-156a7 the docs realignment (the AGENTS Session-156 section ·
      the PAD session-156 row + the Total row preserved · the
      session_331 record + this execution record + the worklog Task
      ID 156)
