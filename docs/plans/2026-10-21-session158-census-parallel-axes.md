# The session-158 plan — the census PARALLEL-AXES option (the 158-c rotation)

Date: 2026-10-21 · Rotation: 158-c · probe:ref **#132 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no bundle event; the round's direction (my judgment on the session_333
next-round reading, the strongest standing candidate): **the census
runtime optimization — the 52-run gate's wall-clock. The four axis walks
run CONCURRENTLY (`--parallel N`, the logins staggered) instead of
one-at-a-time.**

## The rationale (the gate's most expensive leg)

The s157 login-wall leg completed the surface census arc: 13 surfaces ×
4 axes = **52 page-axis runs in the one standing `gate:full`** — and the
census leg now costs **~25 min of the session's every gate** (the 158-b
fresh run: ~26 min on this 2-core box). Every future surface, every
future session pays it. The Task ID 157 next-round reading named it
twice; the s157 record elevated it ("the census runtime optimization —
the parallel-axes option — the 52-run gate's wall-clock").

## The audits (158-a / 158-b)

- **158-a**: the baseline gate GREEN — lint 0/0 · tsc 0 ·
  **119/2233** (clean exit — the s157 entry-guard fix holds on the
  fresh box) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **158-b**: probe:ref **#132 STABLE** · **the SIX drift gates CLEAN
  ×6** (the four viewport sweeps [one cold-boot calendar flake re-run
  clean — the documented lineage] + the fullpage at the exact standing
  values 0.093%/0.316% at equal heights 4990/7259 + the census gate at
  52 page-axis runs, all zero unexplained, the exact standing values)
  · sitemap 11 routes + robots 200 + the SEO meta · db census MATCH
  15/24/10/23/12 + 4 users · the tree clean · zero dep changes.

## The pre-plan probe (the plan validated BEFORE execution — scratch,
cleaned before ship)

The A/B experiment on this 2-core box, the exact censusPage protocol
(domcontentloaded → the main-visible wait → the 2500ms settle → the
evaluate walk), the zero-data state, the fresh login bucket (the
dev-server restart — L-157c3), 3 risk-class pages (dashboard the
charts-data face · calendar the cold-boot flake face · login the
static-auth leg) × all four axes:

- **A · the SEQUENTIAL control**: 120s — all 12 walks STABLE at the
  exact 158-b standing values (els + mainH Δ0);
- **B · the CONCURRENT run** (4 axes in flight, logins staggered
  4000ms): **44s — 2.7× cut on the subset; all 12 walks STABLE at the
  exact same standing values, mainH Δ0 everywhere**;
- **no jitter**: the 2500ms settle held under 4-way concurrency on 2
  cores — the pairs slowed only ~5-8% (6.5→7.0s median); no
  login-burst trip (4 staggered logins fit the 10/15-min window);
- **the projection**: the full census's walk wall-clock collapses to
  ~the slowest axis + the stagger → the ~26-min gate projects to
  **~7-8 min** (~3×).

## The design (additive — `--parallel N`, default 1)

- **THE DEFAULT IS THE STANDING PROTOCOL**: `--parallel 1` (and the
  no-flag form) walks the axes one-at-a-time — the observable
  behavior (log lines, results order, verdict, exit codes)
  byte-identical to the standing loop. One code path, two modes: the
  run loop becomes **batches** — `planAxisBatches(axes, parallel)`
  partitions `CENSUS_AXES` into consecutive batches of ≤N; each batch
  runs its axes CONCURRENTLY (a per-axis worker = the standing
  per-axis body, extracted verbatim into `walkAxis(axis, staggerMs)`);
  batches run sequentially. `--parallel 1` = one axis per batch = the
  standing semantics.
- **THE STAGGER**: worker *i* of a batch delays its login phase by
  `i × LOGIN_STAGGER_MS` (4000, the exported constant) — the four
  our-logins spread over ~12s (no burst: the login limiter is
  10-per-IP/15-min fixed-window, 429s also increment — L-157c3; the
  reference's limiter likewise untripped). `--parallel 1` workers are
  always worker 0 — zero added delay.
- **THE ORDER CONTRACT**: the concurrent batch collects through
  `Promise.allSettled` — which resolves in INPUT order, not
  completion order — so the results array stays byte-identical under
  concurrency (batches in axis order, within a batch in the batch's
  axis order). The report (which filters by axis) and the `--json`
  shape never see interleaving. A rejected worker drains the batch,
  then rethrows (the never-zeroed FINALLY rides the same try — the
  seed restore unchanged).
- **THE PINNED SEAMS**: `planAxisBatches` (the pure partition:
  1→one-per-batch · 4→one batch · 2→two batches · capped at the axes
  count — no empty workers · order-preserving) +
  `LOGIN_STAGGER_MS` + `parseParallelArg` (default 1; non-numeric /
  `<1` / missing value → fail-fast, the `--axis` idiom).
- **gate:full FLIPS ITS CENSUS LEG** to `--parallel 4` (the proven
  concurrency on the standing 2-core box) — **the six-gate chain
  stays six commands**; the `tests/gate-script.test.ts` census-leg
  pin re-anchored; the s153/s154 run-loop src pins re-anchored to the
  batches form (the doctrine unchanged: every CENSUS_AXES entry, a
  fresh context at its viewport, no special-casing).

## The walk (walk48 — the live proofs)

- **PASS 1 THE COLD PARALLEL REPRODUCTION**: the full census at
  `--parallel 4 --fail-on-drift` against a freshly restarted dev
  server (the cold path — what `gate:full` experiences: the first
  axis's requests pay the page compiles; the staggered workers ride
  them) — **must reproduce the EXACT standing values**: 52 page-axis
  runs, mainH Δ0 (settings Δ24 SKIPPED), the exact els counts + genera
  + zero unexplained, exit 0, the seed restored.
- **PASS 2 THE SEQUENTIAL-FORM SANITY**: `--pages login --axis phone`
  (the default `--parallel 1` path, the single-axis mutation-proof
  form) — GREEN at the exact standing values.
- **PASS 3 THE PARALLEL MUTATION-PROOF**: the ghost div planted in the
  calendar body (the string-surgery idiom) → `--pages calendar
  --fail-on-drift --parallel 4` → **RED at all four axes** (the
  verdict aggregates across concurrent workers, the failures
  axis-prefixed) → the revert (zero src diff) → **GREEN** (exit 0).
  The F-151c1 class fails the gate in the PARALLEL form exactly as it
  does in the sequential one.

## The remediation (TDD — the pin ledger)

- **D-158a0 the RED pins** (`tests/interior-census-tool.test.ts` +N,
  the session-158 describe): the `planAxisBatches` contract (all six
  partition cases + the order preservation) + `LOGIN_STAGGER_MS` +
  `parseParallelArg` (the default / the valid / the fail-fast
  negatives) + the order contract (the `allSettled` input-order
  doctrine, the src pin) + the run-loop re-anchors (the batches loop +
  `walkAxis` carries the viewport + every-axis data-driven + the
  one-zero-data/one-seed-restore contract held) — **RED at birth →
  the implementation → GREEN**.
- **D-158a1 the implementation**: `scripts/interior-census.ts` —
  `planAxisBatches` + `LOGIN_STAGGER_MS` + `parseParallelArg` + the
  `walkAxis` extraction (the per-axis body verbatim: the app leg + the
  public leg + the fresh context at its viewport) + the batches run
  loop (`allSettled`, drain-then-rethrow) + the `--parallel` CLI.
- **D-158a2 the gate flip**: `package.json` gate:full census leg →
  `--parallel 4`; the `tests/gate-script.test.ts` pin re-anchored.
- **D-158a3 the count ladder**: UNIT 2233→2238 · SUITES 119 held ·
  badge 2386→2391 (the live lockstep sites flipped atomically,
  assert-first, idempotent; the historicals preserved) · the
  CLAUDE-carrier negatives ladders · the SKILL **v1.155.0** + the s158
  head + the Appendix B totals + the layer-axis pin.
- **D-158a4 the captures 373-376** (the round's subject matter: the
  census's heaviest surface — the dashboard pair at phone + desktop,
  the dev server running the remediated codebase, scrolled + verified
  in-frame) + the VLM battery 2/2.
- **D-158a5 the docs realignment**: the AGENTS Session-158 section +
  **THE GATE-CADENCE LOGIN-BUDGET DOCTRINE (L-157c3 formalized)** —
  the budget arithmetic (4 logins/invocation, one per axis worker,
  staggered; the 10-per-IP/15-min fixed window; 429s increment; the
  dev-server restart clears the per-process bucket; parallelism does
  NOT change the login count) · the PAD session-158 row · the
  session_335 record + this execution record + the worklog Task ID
  158.
- **D-158a6 the verification chain**: lint 0/0 · tsc 0 · unit (the new
  ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6 — the
  census leg now ~7-8 min at `--parallel 4`** · census MATCH · the
  sequential-form sanity · the parallel mutation-proof · the VLM
  battery.

## The lessons (recorded at ship)

- **L-158c1 the concurrency is a MEASUREMENT question, never an
  assumption** (the probe decided 4-way on a 2-core box because the
  reads reproduced the standing values byte-for-byte — the settle
  window held; a slower box or a heavier page re-measures, the flag
  documents the dial).
- **L-158c2 the collection order must be INPUT order, not completion
  order** (`allSettled` — the concurrent gate's report and --json stay
  byte-identical to the sequential one; a completion-order collection
  would make the gate output nondeterministic).
- **L-158c3 parallelism multiplies the LOGINS' arrival rate, not
  their count** (the stagger is the whole budget story: 4 logins fit
  any window; 4 logins in one burst is the one shape the reference's
  unknown limiter could punish — the stagger is cheap, the burst is
  not).

## The execution record (filled at ship)

- [x] 158-a / 158-b the audits (the baseline gate GREEN · probe #132
      STABLE · six gates CLEAN ×6)
- [x] the pre-plan probe (A/B — the 2.7× subset cut, all 24 walks
      STABLE at the standing values)
- [x] D-158a0 the RED pins (planAxisBatches + the stagger + the CLI +
      the order contract + the re-anchors — 9 RED at birth)
- [x] D-158a1 the implementation (walkAxis + the batches loop +
      allSettled)
- [x] D-158a2 the gate:full flip (`--parallel 4` + the pin re-anchor)
- [x] PASS 1 the cold parallel reproduction — the FIRST run RED (the
      real finding: the reports tooltip MID-ENTRANCE + the reference's
      settings PRE-MOUNT — the fixed settle does not survive 4-way
      load; L-158c1) → THE QUIESCENCE EXTENSION (2 RED pins at birth →
      the settled-read implementation → GREEN) → THE GATE-TAIL HARDENING
      (the full chain's load tail re-surfaced both faces at 2×150ms/6s —
      the window widened to 3×400ms + the ceiling doubled to 12s; the
      re-run CLEAN, and a mid-retry login timeout decoded as L-158c3
      live — the sweeps' 4 + the failed census's 4 + the re-run's 4 >
      the 10/15-min bucket; the dev-server restart + the re-run) → the re-run: 52 runs,
      ALL ZERO unexplained, exit 0, the 48 stable rows BYTE-IDENTICAL,
      ~26 min → 2m29s at the hardened constants
- [x] PASS 2 the sequential-form sanity (the default path unchanged —
      --pages login --axis phone GREEN at the standing values)
- [x] PASS 3 the parallel mutation-proof (planted → RED ×4 axes
      simultaneously [els 222/221, mainH Δ40, axis-prefixed — the
      L-153c1 doctrine held under concurrency] → reverted → GREEN)
- [x] D-158a3 the count ladder (UNIT 2233→2241 +8 · SUITES 119 held ·
      badge 2386→2394 · the lockstep sites atomically · the CLAUDE
      carriers · the SKILL v1.155.0 + the s158 head)
- [x] D-158a4 the captures 373-376 (the dashboard pair at phone +
      desktop) + the VLM battery 2/2 (both MATCH — the brand-blue
      fix-over-defect + the demo-data state + the Base44 pill the
      documented genera)
- [x] D-158a5 the docs realignment (AGENTS + the login-budget doctrine
      · PAD · SKILL · session_335 · the worklog Task ID 158)
- [x] D-158a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      119/2241 · build · e2e 153/153 · the SIX drift gates ×6 with the
      census leg at --parallel 4 · census MATCH · the SSH wrapper, the
      two-commit pattern)
- The lessons recorded: **L-158c1** the concurrency is a MEASUREMENT
  question, never an assumption (the 3-page probe said stable; the
  full-set PASS-1 found what the probe missed — the quiescence is what
  made it stick) · **L-158c2** the collection order must be INPUT order,
  not completion order (allSettled — the concurrent gate's output stays
  byte-identical) · **L-158c3** parallelism multiplies the logins'
  ARRIVAL RATE, never their COUNT (the stagger is the whole budget
  story)
