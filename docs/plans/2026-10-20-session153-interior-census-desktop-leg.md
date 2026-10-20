# The session-153 plan — the interior census's DESKTOP leg (the 153-c rotation)

Date: 2026-10-20 · Rotation: 153-c · probe:ref #127 STABLE at the
s147–s152 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no new bundle event; the round's direction (my judgment on the
session_323 next-round reading, the strongest named candidate): **the
census extended past the phone axis — the 1440×900 desktop interiors
walked + gated as the census tool's second leg**.

## The rationale (the F-151c1 axis, still open at desktop)

The s152 census gate closes the PHONE dead zone (390×844, every
element inside `main` censused, byte-parity verdict). But the census
runs at ONE axis: the F-151c1 decode measured the ghost buttons at
**y≈905 @1440** — below the 900px desktop fold, inside
`main.overflow-auto`, structurally invisible to the 1920×1080 and
1024×768 pixel sweeps (they clip at 1080/768) AND to the phone-axis
census (the 390 interior is a different layout tree). The desktop
interiors below the desktop fold have NEVER been full-geometry
censused — the same class of blind spot the phone leg closed, on the
axis where the original defect actually lived. The s148
desktop-interior mirror (the KPI chips family, the toolbar trio) was
decoded above the fold + pixel-swept; the below-fold desktop interior
is the open zone.

## The audits (153-a / 153-b)

- **153-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **119/2199**
  · build · **e2e 153/153** — the EXACT s152-ship match.
- **153-b**: probe:ref **#127 STABLE** at the s147–s152 fingerprint ·
  the drawer battery GREEN (inside e2e 153/153 — the mobile-nav
  contract, the user's standing particular-attention item) · **the SIX
  drift gates CLEAN ×6** (the four viewport classes + the fullpage at
  the exact standing values 0.093%/0.316% at equal heights 4990/7259 +
  the census gate all-nine zero unexplained, the fresh-dev-server
  house order) · sitemap 11 routes + robots + the SEO meta · the tree
  clean · zero dep changes.
- **The standing gap found by the audit itself**: the repo worklog
  ends at Task ID 151 — the s152 ship's worklog record was lost to a
  session interruption (the s149-gap pattern). Filled FIRST this
  round, reconstructed verbatim from session_323.md (the s150
  precedent).

## The walk (walk43 — the maiden DESKTOP census + the mutation-proof)

- **PASS 1 THE MAIDEN DESKTOP CENSUS**: the 9 app pages at **1440×900**
  (the F-151c1 axis), both apps logged in, ours at the matched
  ZERO-DATA state, the same census evaluate (content-relative
  top/left, w, h, tag, class, leaf-text + mainH), the same decoder
  seams (alignCensus / alignSettings / attributeGenera /
  censusVerdict) with the axis's content floor. Expected decode faces:
  the standing genera (token-mirror, live-data, recharts-internal,
  dead-stub, chart-suppression, s95-wrapper, settings-data,
  tag-swap, wrapper-twin, composition-split) — plus whatever the
  desktop tree shows that the phone tree did not (the below-900px
  desktop interior is uncharted). Every delta attributes to a named
  genus or it is a REAL defect → remediated, not absorbed.
- **PASS 2 THE DESKTOP MUTATION-PROOF**: replant the F-151c1 ghost
  (string surgery on the dashboard's Lead Sources CardHeader — the
  s152 idiom) → `census:interior --axis desktop --pages dashboard
  --fail-on-drift` → expect RED with the ghost decoded
  OURS-EXTRA/unexplained at its below-900px desktop y (the exact zone
  this leg exists for) → the string-surgery revert → GREEN. The
  F-151c1 class now fails at BOTH axes.

## The tool design (the axis extension — additive)

- `CENSUS_AXES` (exported): `phone` 390×844 + `desktop` 1440×900 —
  the two-frame census contract (the s153 extension; the F-151c1
  axis). The CLI gains `--axis phone|desktop|all` (default `all`) —
  the mutation-proof runs one axis; `--pages` composes as standing.
- The run loop: ONE zero-data + ONE seed-restore per invocation (the
  never-zeroed FINALLY unchanged); per axis: a fresh browser context
  at its viewport + both logins + the per-page census + the decode.
- **The floor seam**: `contentFloor(width)` (exported, PURE) — the
  content-column floor at a census axis: `<768` (sidebar hidden) →
  `width − 32` (the p-4 page root: 390→358, the walk41 anchor);
  `≥768` (the w-64 sidebar in flow) → `width − 256 − 64` (the sm:p-8
  page root: 1440→1120). `attributeGenera(events, page, floor)` gains
  the optional floor parameter (default `PHONE_CONTENT_FLOOR` — the
  standing pins unchanged); the s95-poke-out discriminator uses the
  axis's floor: only the REFERENCE's past-the-floor widths absorb, an
  in-container width delta stays RED at BOTH axes.
- The verdict spans BOTH axes (axis-prefixed failures); settings
  mainH stays SKIPPED on both (the L-150c2 doctrine, never widened).
- **gate:full UNCHANGED**: `census:interior -- --fail-on-drift` now
  covers both axes internally — the six-gate chain stays six commands
  (no gate-script composite churn; the census gate's coverage doubles).

## The remediation (TDD — the pin ledger)

- **D-153a0 the worklog gap**: the Task ID 152 record appended
  (reconstructed from session_323.md, the s150 precedent).
- **D-153a1 the RED pins** (`tests/interior-census-tool.test.ts`
  extended): the two-axis list contract (phone + desktop, the
  1440×900 values) · `contentFloor` pure seam (390→358 · 1440→1120 ·
  the mid-band → a negative) · the `--axis` flag parsing (all default ·
  one-axis · unknown fail-fast) · the desktop poke-out discriminator
  (a past-the-1120-floor ref shift absorbs; an in-container width
  delta REDs) · the two-axis verdict (a desktop-leg failure REDs the
  gate; the phone leg GREEN alone does not mask it) · the axis in the
  `--json` output contract. **RED at birth → the implementation →
  GREEN.**
- **D-153a2 the implementation**: the axis loop + the floor seam +
  the `--axis` flag in `scripts/interior-census.ts` (additive — the
  standing phone behavior byte-identical; the header re-anchored).
- **D-153a3 the maiden anchors**: the desktop leg's per-page verdict
  documented from the PASS 1 decode (unexplained 0 per page; mainH 0
  on the 8, settings skipped; the genera attribution counts in the
  anchor comment).
- **D-153a4 the legacy flips**: the docs-counts ladder (UNIT
  2199 → the live count · SUITES 119 held · badge 2352 → the new
  arithmetic · the lockstep sites flipped atomically) · the
  CLAUDE-carrier pins · the SKILL **v1.150.0** + the s153 head (the
  s152 layer demoted beneath) + the Appendix B totals.
- **D-153a5 the captures 353-356** (the census surfaces: the
  dashboard desktop pair at the F-151c1 zone + the phone pair — the
  two-axis evidence) + the VLM battery 2/2.
- **D-153a6 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the drift gates CLEAN** (the
  four viewport + the fullpage + the census gate at BOTH axes) ·
  census MATCH + the two-commit ship via the SSH wrapper.

## The lessons (recorded at ship)

- **L-153c1 the dead zone is per-axis**: a geometry gate at one
  viewport proves that viewport only — the F-151c1 class lived at
  BOTH the phone interior (y≈2356 @390) and the desktop interior
  (y≈905 @1440), and only the axis-pair covers both. A census axis
  is cheap (the tool exists); a blind axis is a standing gap.
- **L-153c2 the floor travels with the frame**: the s95 poke-out
  discriminator's floor is a function of the census axis (the
  content column: sidebar + page padding), never a constant — the
  phone's 358 and the desktop's 1120 are the same rule at two frames.

## The execution record (filled at ship)

- [x] D-153a0 the worklog Task ID 152 gap filled
- [x] PASS 1 the maiden desktop census (ALL 18 page-axis runs at ZERO
      unexplained — 7 of 9 pages CLEAN at birth; the two real decodes:
      F-153c1 the contacts mb-6 [the margin-collapse unmasking — the
      lg:hidden stub's mt-6 collapsed max(24,24)=24 at phone, masking
      the +24px page-tail delta 147 sessions] + the th-label-stretch
      genus [the s29 th>button superset's desktop face — the UA
      fit-content BUTTON vs the stretched DIV, absorbed as tag-swap])
- [x] PASS 2 the desktop mutation-proof (planted → RED (5 unexplained,
      axis-prefixed [desktop] — the catch rides the geometry, mainH
      stays Δ0 at desktop) → reverted → GREEN)
- [x] D-153a1 the RED pins (+8 — RED at birth) → the implementation →
      GREEN (the mid-red tsc fixture fix)
- [x] D-153a2 the axis extension implemented (CENSUS_AXES + contentFloor
      + the --axis flag + the axes loop + the axis-prefixed verdict +
      the --json axis; the contacts source fix)
- [x] D-153a3 the maiden anchors documented (the verdict IS the baseline:
      byte-parity zero margin at BOTH axes)
- [x] D-153a4 the legacy flips (UNIT 2199→2207 · SUITES held 119 ·
      badge 2352→2360 · the 12 lockstep sites atomically · the CLAUDE
      carriers · the SKILL v1.150.0 + the s153 head + the Appendix B +
      the layer-axis pin) + the docs realignment
- [x] D-153a5 the captures 353-356 (the dashboard + contacts desktop
      pairs at the matched zero-data state) + the VLM battery 2/2 (both
      pairs MATCH)
- [x] D-153a6 the verification chain (lint 0/0 · tsc 0 · 119/2207 ·
      build · e2e 153/153 · the SIX drift gates CLEAN ×6 — the census
      gate at BOTH axes in the one command · census MATCH) + the ship
