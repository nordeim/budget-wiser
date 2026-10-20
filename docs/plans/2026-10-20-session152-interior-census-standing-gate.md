# The session-152 plan — the interior census promoted into the STANDING sixth gate (the 152-c rotation)

Date: 2026-10-20 · Rotation: 152-c · probe:ref #126 STABLE at the
s147–s151 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no new bundle event; the round's direction (my judgment on the
session_321 rotation candidates, the strongest named in the
next-round reading): **the walk41 throwaway promoted into a standing
repo tool** — `scripts/interior-census.ts`, the full-geometry census
across the 9 app pages' phone interiors, wired as the SIXTH gate.

## The rationale (the L-151c2 lesson's structural cure)

The five standing gates (the four viewport sweeps + the fullpage
gate) are all pixel instruments that structurally clip at their
capture height — below-every-fold (inside `main.overflow-auto`, past
the 844 phone fold and the ~900 desktop sweep fold) is invisible to
all of them by construction. The walk41 full-geometry census is the
only instrument that saw the F-151c1 dead zone (two stale "+ Add"
ghost buttons, 143 sessions old). It ran as a throwaway probe at the
workspace root — a rotation axis that exists only when a session
remembers to walk it. The structural cure: promote the census into a
repo script with standing baselines + `--fail-on-drift`, and chain it
into `gate:full` — the dead zone becomes continuously guarded by the
one-command gate.

## The audits (152-a / 152-b)

- **152-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **118/2177**
  · build · **e2e 153/153** — the EXACT s151-ship match.
- **152-b**: probe:ref **#126 STABLE** · the drawer battery GREEN
  (inside e2e 153/153 — the mobile-nav contract, the user's standing
  particular-attention item) · **the five drift gates CLEAN ×5** (the
  four viewport classes + the fullpage gate at the exact s151-ship
  values 0.093%/0.316% at equal heights 4990/7259, run on the
  fresh-dev-server house order) · sitemap 11 routes + robots + the
  SEO meta · the test configs (vitest + playwright) in place · the
  tree clean · `.env` untracked with the root-contract `db/` · zero
  dep changes.

## The walk (walk42 — the standing tool's maiden census + the mutation-proof)

- **PASS 1 THE MAIDEN CENSUS**: the tool's first run IS the walk —
  the 9 app pages (dashboard, accounts, contacts, leads, calendar,
  activities, reports, settings, profile — the shell surfaces, NOT
  the marketing/login pages) at 390×844, both apps logged in, ours at
  the matched ZERO-DATA state, every element inside `main` censused
  (content-relative top/left, w, h, tag, class, leaf-text) + mainH
  (`main.scrollHeight`), decoded by the greedy resync-alignment
  classifier (the walk41 decoder, promoted: bounded-window resync —
  index-pairwise alignment saturated on one-sided runs). The expected
  decode: mainH byte-equal on the 8 non-settings pages, the genera
  all attributed (the lucide DOM-composition cls-only family, the
  recharts ≤3px shifts, the chart-no-outline + `p-6 px-0` ours-extra
  wrappers, the settings DATA rows, the zero-size dead stubs), ZERO
  unexplained events per page.
- **PASS 2 THE MUTATION-PROOF** (the structural-cure demonstration):
  replant the F-151c1 ghost (string surgery on the dashboard's Lead
  Sources CardHeader — targeted insertion, never a file-level
  revert), run `census:interior --pages dashboard --fail-on-drift` →
  expect RED with the ghost decoded OURS-EXTRA/unexplained at its
  below-fold y; string-surgery the ghost back out (the s151 lesson —
  never `git checkout` uncommitted work) → rerun GREEN. The exact
  defect class that survived 143 sessions now fails the one-command
  gate.

## The tool design (scripts/interior-census.ts)

- Run: `bun run census:interior [--fail-on-drift] [--json]
  [--pages a,b]` (the sweep idioms: the `--pages` subset filter with
  fail-fast unknown names, `--json` machine output).
- The protocol (sweep.ts's, reused not duplicated in spirit): reuse
  or boot the dev server (the platform `DATABASE_URL` spawn guard) →
  zero our domain data (`scripts/zero-data.ts` with the env var
  DELETED, never set empty) → login BOTH apps (the sweep's login
  idiom) → per page: nav + main-visible wait + settle + the census
  `page.evaluate` → decode → report → **the seed restored ALWAYS**
  (even when gated — the never-zeroed doctrine).
- The PURE seams (the unit-pinned layer): `alignCensus(ours, ref,
  tol=3)` — the greedy resync alignment emitting MATCH / CLS-ONLY
  (geometry byte-equal) / TEXT-ONLY (geometry byte-equal) / SHIFT
  (paired within tol) / OURS-EXTRA / REF-EXTRA;
  `attributeGenera(event, page)` — the documented-genera whitelist
  (cls-only → the token/class-order/lucide family · text-only → the
  live-DATA genus · shift ≤3px → the recharts-internal genus ·
  zero-size extras → the s125/s141 dead-stub genus · ours-extra
  `chart-no-outline` → the pinned focus-suppression wrappers ·
  ours-extra `p-6 px-0` → the s95 min-w-0 table wrappers · the
  settings picklist rows → the DATA genus); `censusVerdict(results)`
  — per page RED on any UNEXPLAINED event or a mainH delta ≠ 0
  (**byte-parity, zero margin — geometry gates have no raster
  floor**), with the settings page's mainH SKIPPED (the DATA genus is
  intraday-volatile in mainH — the L-150c2 lesson; reported, never
  gated) and its DATA rows absorbed by signature (template geometry
  still pairwise-compared when rows align).
- The package wiring: `census:interior` + the SIXTH gate appended to
  `gate:full` (`bun run census:interior -- --fail-on-drift` after
  `sweep:fullpage`) + the gate-script composite re-anchored (the
  s152 expected blast radius).

## The remediation (TDD — the pin ledger)

- **D-152a1** `tests/interior-census-tool.test.ts` (NEW): the
  tool-exists + package-wiring pins (the script + the SIXTH gate) ·
  the 9-page census list contract (the shell-only surfaces — no
  landing/about/contact/login) · the alignCensus pure-seam pins
  (byte-equal twins pair; ≤3px shifts pair; one-sided runs resync
  without index cascade — the walk41 lesson) · the genera-whitelist
  pins (each documented genus absorbed; an unlisted extra =
  unexplained) · the verdict seam (settings mainH skipped; zero
  margin; the never-zeroed seed-restore doctrine; the `--pages`
  fail-fast) · the mutation-proof documented. **RED at birth** → the
  implementation → GREEN.
- **D-152a2 the implementation**: `scripts/interior-census.ts` + the
  package.json wiring + the gate:full sixth gate.
- **D-152a3 the maiden anchors**: the standing per-page baselines
  documented in the tool from the PASS 1 decode (unexplained 0 per
  page; mainH 0 on the 8, skipped on settings; the genera
  attribution counts in the anchor comment).
- **D-152a4 the legacy flips**: gate-script.test.ts (the five-gate
  composite → the SIX-gate chain + the every-gate-carries-flag
  census) · the docs-counts ladder (UNIT 2177 → the live count ·
  SUITES 118 → 119 · badge 2330 → the new arithmetic · the 12-site
  lockstep flipped atomically) · the CLAUDE-carrier pins · the SKILL
  **v1.149.0** + the s152 head (the s151 layer demoted beneath) + the
  Appendix B totals.
- **D-152a5 the captures 349-352** (the census surfaces as evidence:
  the dashboard phone pair — the F-151c1 fix zone re-verified — and
  the settings phone pair — the DATA-genus page) + the VLM battery
  2/2 on the pairs.
- **D-152a6 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  (the five standing + the census gate's maiden `--fail-on-drift`
  pass) · census MATCH + the two-commit ship via the SSH wrapper.

## The lessons (recorded at ship)

- **L-152c1 the dead zone closed structurally**: the interior census
  as a standing gate converts the L-151c2 blind spot from a
  rotation-memory axis into a one-command gate — the F-151c1 class
  (a below-fold ours-only element) now REDs `gate:full` directly.
- **L-152c2 geometry gates carry no margin**: pixel gates need
  baselines + a raster-floor margin; the geometry census is
  byte-parity — every delta must ATTRIBUTE to a documented genus or
  it is drift. The one exception is intraday DATA (the settings
  mainH), which is skipped by the L-150c2 doctrine, never widened.

## The execution record (filled at ship)

- [x] PASS 1 the maiden census (ALL 9 PAGES AT ZERO UNEXPLAINED —
      mainH byte-equal on the 8, settings Δ+86 the DATA genus skipped;
      five decoder rounds: the glyph-interior exclusion, the recharts
      DOM face, the tag-swap pairing (the -1px offset decode), the
      wrapper-twin, the composition-split, the s95 floor, the cls
      preference, the piecewise re-anchor, the settings card
      segmentation (the -162 backward-resync decode))
- [x] PASS 2 the mutation-proof (the replanted F-151c1 ghost → RED
      [mainH Δ+8 + 39 unexplained] → the string-surgery revert → GREEN
      [mainH Δ0 · 0 unexplained])
- [x] D-152a1 the interior-census-tool test file (+22 its — RED at
      birth (13) → GREEN; the mid-red fixture refinements per the s26
      precedent)
- [x] D-152a2 the implementation (scripts/interior-census.ts + the
      census:interior script + the gate:full sixth gate; login/
      waitOnUrl/parsePagesArg exported from sweep.ts — additive)
- [x] D-152a3 the maiden anchors (the verdict IS the baseline:
      byte-parity zero margin — unexplained>0 or mainH≠0 REDs, the
      settings DATA face the one skip)
- [x] D-152a4 the legacy flips (the gate-script SIX-gate composite ·
      docs-counts 2199/119 · the 12 lockstep sites atomically · the
      CLAUDE carriers ×4 · SKILL v1.148.0 → v1.149.0 + the s152 head
      + the Appendix B + the wall-clock)
- [x] D-152a5 the captures 349-352 (the dashboard + settings phone
      pairs at the matched zero-data state) + the VLM battery 2/2 (the
      dashboard pair: an identical card stack, the fix zone
      title-only both apps; the settings pair: the row template
      identical, the diffs the LIVE-DATA genus)
- [x] D-152a6 the verification chain (lint 0/0 · tsc 0 · 119/2199 ·
      build · e2e 153/153 · the SIX drift gates CLEAN ×6 — the census
      gate's maiden --fail-on-drift pass at all-zero · census MATCH) +
      the two-commit ship via the SSH wrapper
