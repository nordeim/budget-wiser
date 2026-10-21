# The session-159 plan — the settings INTRADAY-RHYTHM map (the 159-c rotation)

Date: 2026-10-21 · Rotation: 159-c · probe:ref **#133 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no bundle event; the round's direction (my judgment on the session_335
next-round reading, the strongest standing candidate): **the settings
intraday-rhythm map — the standing observation instrument + the T1/T2
double capture at four axes. The census's settings SKIP doctrine gets
its evidence base, and future rounds get a standing rhythm tool.**

## The rationale (the census's largest standing unknown)

The settings page is the ONE censused surface whose reference state is
LIVE-EDITED INTRADAY by the workspace owner: the picklist row counts
swing (the s158 PASS-1 decode read the reference's settings PRE-MOUNT
at 97/68 els mid-load; the settled canonical state 256/249; the
standing doctrine's own observations span ~150 rows). The census absorbs
this via the DATA genera (settings-data · settings-data-cascade ·
live-data) + the L-152c3 mainH SKIP — but the doctrine rests on
SCATTERED incidental observations, never a systematic capture. The
s158 record named this round: "the settings intraday-rhythm map (the
morning/afternoon double capture at four axes, observation-only; this
round's PASS-1 decode makes it cheaper — the reference's settings state
is now known to swing by ~150 rows intraday)."

## The audits (159-a / 159-b)

- **159-a**: the baseline gate GREEN — lint 0/0 · tsc 0 ·
  **119/2241** (clean exit) · build · **e2e 153/153** (clean first run
  — the drawer battery inside, the mobile-nav contract).
- **159-b**: probe:ref **#133 STABLE** · **the SIX drift gates CLEAN
  ×6** (the four viewport sweeps + the fullpage at the exact standing
  values 0.093%/0.316% at equal heights 4990/7259 + the census gate at
  `--parallel 4`: 52 page-axis runs, all zero unexplained, exit 0) ·
  sitemap 11 routes + robots 200 · db census MATCH 15/24/10/23/12 + 4
  users · the tree clean · zero dep changes. ONE live decode: the
  L-158c3 budget again (my back-to-back census diagnostics burned 12
  our-logins against the 10/15-min window — 7 × 429s; the dev-server
  restart + the re-run, the doctrine's own operational form, twice
  validated live now).

## The pre-plan probe (the plan validated BEFORE execution — scratch,
cleaned before ship)

The live decode on BOTH apps at phone (390×844), the exact censusPage
walk: **the card-title construction is byte-equal both apps** — `DIV`
+ `font-semibold tracking-tight text-lg` + the leaf text (the five
section names in the same order: Contact Sources · Lead Stages ·
Activity Types · Account Tiers · Industries) — and the picklist rows
carry the standing `settingsRowSignature` token set on both sides
(`flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50`).
**The document order holds: every title precedes its card's rows in
the walk** (the header renders before the content) — the classifier
can assign rows to sections by ORDER, no geometry needed. The
discriminators: the tab buttons are `BUTTON`s (different class
family), the H1 is `text-3xl font-bold` (no `font-semibold`), the
subtitle `P` carries no title token — all excluded by the exact-token
title signature. The T1 phone evidence: **reference 31 rows · mainH
2973 · 249 els** vs **ours-seeded 32 rows · mainH 3059 · 256 els**
(the census's standing 256/249 values reproduced exactly).

## The design (the instrument — observation-only, NEVER in the gate)

**`scripts/settings-rhythm.ts`** — the standing observation tool:

- **The pure seams** (exported, pinned):
  - `SETTINGS_TITLE_TOKENS` + `settingsTitleSignature(tag, cls, text)`
    — the exact-token title detector (the loginLogoMarkSignature
    idiom: tag DIV + {font-semibold, tracking-tight, text-lg} ⊆ cls +
    non-empty leaf text; a restyled title stays UNMATCHED — the rows
    fall to `unassignedRows`, the safety face, never silently wrong).
  - `settingsFingerprint(capture)` — the document-order classifier:
    the sections in walk order (title + row count each), `totalRows`,
    `unassignedRows`, `els`, `mainH` — the JSON-able state snapshot.
  - `diffFingerprints(a, b)` — the rhythm diff: per-section row
    deltas (title-keyed), added/removed sections, the totalRows
    swing, the els/mainH deltas.
- **The CLI** (the --axis idiom, fail-fast): `--app ref|ours`
  (default ref — the observation target is the reference's own live
  edits; ours = the seeded control) · `--axis phone|tablet|landscape|
  desktop` (default phone; the four-axis map runs four sequential
  invocations — the L-158c3 no-burst form, one login each) · `--json`
  (machine output, the T1/T2 files) · `--diff <a.json> <b.json>` (the
  rhythm diff, no browser).
- **The reuse** (the reuse-not-duplicate doctrine): `login` +
  `waitOnUrl` from `./sweep` · `CENSUS_AXES` + `CensusEl` +
  `settingsRowSignature` + `censusPage` + `waitQuiescent` from
  `./interior-census` — **the last three become ADDITIVE EXPORTS**
  (zero behavior change; the s152 precedent: `login`/`waitOnUrl` were
  exported for the census the same way). The `censusPage` reuse gives
  the instrument the SETTLED read (the s158 quiescence) for free —
  the never-weaker guarantee rides along.
- **The entry guard** (L-157c1): the direct-execution guard ships at
  birth — a script that runs on import is a test-time bomb.

## The T1/T2 protocol (the rhythm map)

- **T1** (post-instrument, the session's first capture): the
  reference at ALL FOUR axes (four sequential invocations) + ours at
  phone (the seeded control) — the JSON fingerprints saved.
- **T2** (pre-ship, after the verification chain): the reference at
  ALL FOUR axes again. The session's own wall-clock (~1.5-2h) is the
  intraday window — the honest window the session can give.
- **The map**: `diffFingerprints(T1, T2)` per axis + the cross-axis
  row-count invariance check (the row COUNTS are expected
  axis-invariant — the cascade geometry is the axis-varying face) +
  the ours-control match (the instrument reads the same construction
  both apps share — the seeded 32-row state as the standing control).
- The null face is a valid finding: if the owner does not edit inside
  the window, the map documents the STABLE window (the rhythm's
  baseline observation — the swing windows are the exception, not the
  rule).

## The walk (walk49 — the live proofs)

- **PASS 1 the axis-invariance proof**: the T1 reference captures at
  four axes — the per-section row counts identical across axes (the
  same data renders at every viewport; only the cascade geometry
  varies).
- **PASS 2 the control proof**: ours at phone — the fingerprint
  reproduces the seeded state (32 rows, the five sections, mainH
  3059, els 256 — the standing census values).
- **PASS 3 the sensitivity proof**: `diffFingerprints` on two REAL
  captures that differ (the reference T1 vs the ours control — the
  row-count deltas + the mainH delta reported) + the unit-pin
  fixtures (a planted row delta must REPORT — the observation
  instrument's mutation-proof form: the diff never silently absorbs).

## The remediation (TDD — the pin ledger)

- **D-159a0 the additive exports**: `settingsRowSignature` +
  `censusPage` + `waitQuiescent` exported from
  `scripts/interior-census.ts` (the header docs grow the re-export
  note) — the pins import them (the unit form; the strongest pin).
- **D-159a1 the RED pins** (`tests/settings-rhythm-tool.test.ts`,
  the session-159 describe): the title signature (the standing
  construction + the negatives: the tab BUTTON, the H1, a restyled
  `text-base` title, an empty-text DIV) + the fingerprint classifier
  (the two-section fixture + the rows-before-any-title unassigned
  face + the empty-section face + the els/mainH passthrough) + the
  diff seam (the row delta + the added/removed sections + the
  totals) + the CLI parse (--app fail-fast + the --diff arity) + the
  entry guard — **RED at birth → the implementation → GREEN**.
- **D-159a2 the implementation**: `scripts/settings-rhythm.ts` (the
  pure seams + the CLI + the collector via censusPage + the guard).
- **D-159a3 the count ladder**: UNIT 2241 → 2241+N · SUITES 119
  held → 120 (the new test file) · badge 2394 → 2394+N (the live
  lockstep sites flipped atomically, count-ladder-159.py,
  assert-first, idempotent; the historicals preserved) · the
  CLAUDE-carrier negatives ladders · the SKILL **v1.156.0** + the
  s159 head (the s158 layer demoted beneath) + the Appendix B totals.
- **D-159a4 the captures 377-380** (the settings pair at phone +
  desktop — the rhythm round's subject surface, the picklist-card
  zone, the seeded remediated codebase, settled + verified in-frame)
  + the VLM battery 2/2.
- **D-159a5 the docs realignment**: the AGENTS Session-159 section +
  **THE SETTINGS-RHYTHM DOCTRINE** (the SKIP genus's evidence base +
  the standing instrument) · the PAD session-159 row + the Total row
  preserved · the session_337 record + this execution record + the
  worklog Task ID 159.
- **D-159a6 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  · the T1/T2 rhythm map diffed + documented.

## The lessons (recorded at ship)

- **L-159c1** an observation doctrine needs a STANDING instrument,
  not a one-off probe (the scattered s151–s158 settings observations
  never composed into a rhythm; the tool makes the next observation
  a one-command capture).
- **L-159c2** the classifier pins to the CONSTRUCTION, not the
  content (the exact-token title signature + the row signature read
  the template both apps share; the live data — the row counts, the
  names — is the OBSERVATION, never the contract).
- **L-159c3** the null face is a finding (a stable window documents
  the rhythm's baseline; the swing windows stay the exception —
  documented either way, never assumed).

## The execution record (filled at ship)

- [x] 159-a / 159-b the audits (the baseline gate GREEN · probe #133
      STABLE · six gates CLEAN ×6 · the L-158c3 budget live again —
      7 × 429s, the dev-server restart + the re-run)
- [x] the pre-plan probe (both apps' title/row constructions
      byte-equal · the document-order layout · T1 phone evidence:
      ref 31 rows/2973/249 vs ours-seeded 32/3059/256)
- [x] D-159a0 the additive exports (settingsRowSignature + censusPage
      + waitQuiescent + CensusCapture — the pins GREEN, born-green)
- [x] D-159a1 the RED pins (9 RED at birth + 1 born-green) → D-159a2
      the implementation → GREEN (one pin-fixture correction: the
      extra-token row moved above the empty section — the
      implementation was right, the fixture contradicted its intent)
      → THE PASS-3 FIND (the stdout/stderr contract — 1 RED at birth)
      → the fix (diagnostics → STDERR, data → STDOUT, the --json
      ARRAY form, the axis-by-axis diff pairing) → GREEN (11/11)
- [x] PASS 1-3 the live proofs (the axis invariance: 5/6/6/4/10 = 31
      rows at every axis, els 249, mainH 2973→2099 · the control
      match: 32 rows/256/3059 the standing values · the sensitivity:
      every delta reported + the unpaired-axes contract)
- [x] the T1 capture (the reference ×4 axes + the ours control,
      02:30Z) + the T2 capture (03:15Z — a ~45-minute intraday window)
      + THE RHYTHM MAP: **the null face — byte-identical on every
      axis, zero swing on every section** (L-159c3: the stable window
      IS the baseline observation; the s151–s158 "swing" readings
      decode largely as pre-settle read-time artifacts)
- [x] D-159a3 the count ladder (2241→2252 +11 · SUITES 119→120 ·
      badge 2394→2405 · the lockstep sites atomically · the CLAUDE
      carriers · the SKILL v1.156.0 + the s159 head + the Appendix B
      totals)
- [x] D-159a4 the captures 377-380 (the settings picklist-card pair
      at phone + desktop) + the VLM battery 2/2 (both MATCH — the
      Base44 pill + the live-data row counts the documented genera)
- [x] D-159a5 the docs realignment (AGENTS + the rhythm-map doctrine ·
      PAD · SKILL · session_337 + this record + the worklog Task ID
      159)
- [x] D-159a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      120/2252 · build · e2e 153/153 · the SIX drift gates CLEAN ×6
      with the census leg at --parallel 4 · the SSH wrapper, the
      two-commit pattern, the --remote override)
