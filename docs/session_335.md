# Session 335 — the session-158 record (the census parallel-axes leg)

## The intake

The workspace had been reset — a fresh clone (the pull path became
`git clone https://github.com/nordeim/neo-crm.git`), the standing
environment rebuilt from the repo's own contracts: `.env` from
`.env.example` (the `file:../db/custom.db` root contract + a fresh
`AUTH_SECRET`) · `db:push` + `db:seed` (census MATCH 15/24/10/23/12 +
4 users) · the Playwright chromium installed · the dev server booted.
The pull state: `3a2c690` — the s157 feat `54bb1c3` + the
session_333/334 logs.

## The audits

- **158-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **119/2233**
  (clean exit — the s157 fullpage entry-guard fix holds on the fresh
  box) · build · **e2e 153/153** (clean first run — the drawer battery
  inside, the mobile-nav contract).
- **158-b**: probe:ref **#132 STABLE** at the s147–s155 fingerprint —
  a rotation round · **the SIX drift gates CLEAN ×6** (the four
  viewport sweeps [one cold-boot calendar flake re-run clean — the
  documented lineage] + the fullpage at the exact standing values
  0.093%/0.316% at equal heights 4990/7259 + the census gate at 52
  page-axis runs, all zero unexplained, the exact standing values) ·
  sitemap 11 routes + robots 200 + the SEO meta · db census MATCH ·
  zero dep changes.

## The rotation decision

The session_333 next-round reading's strongest candidate executed:
**the census runtime optimization — the 52-run gate's wall-clock** (the
census leg costs ~26 min of every `gate:full`; every future surface and
every future session pays it). The alternatives weighed and deferred:
the settings intraday-rhythm map (observation-only — the DATA genus
already SKIP-gated by doctrine), the bundle-event watch (probe #132
STABLE — no event). The login-budgeting doctrine formalization rode
along as this round's docs face.

## The pre-plan probe (the plan validated BEFORE execution — scratch,
cleaned before ship)

The A/B experiment on this 2-core box, the exact censusPage protocol,
the zero-data state, the fresh login bucket (the dev-server restart —
L-157c3), 3 risk-class pages (dashboard the charts-data face ·
calendar the cold-boot flake face · login the static-auth leg) × all
four axes: **A the sequential control 120s · B the concurrent run
(logins staggered 4000ms) 44s — 2.7× on the subset, all 24 walks
STABLE at the exact 158-b standing values, mainH Δ0 everywhere** — the
4-way design validated; the projection (~3× on the full set) later
confirmed conservative.

## The remediation (TDD — the pin ledger)

- **D-158a0 the RED pins**: the session-158 block
  (`tests/interior-census-tool.test.ts` +6: planAxisBatches' six
  partition forms + LOGIN_STAGGER_MS + parseParallelArg with the
  fail-fast negatives + the input-order contract + the run-loop
  re-anchors [the s153/s154 loop-form pins re-anchored to the batches
  form, the doctrine unchanged] + the gate:full flip + the header
  doctrine) + the `tests/gate-script.test.ts` census-leg re-anchor —
  **9 RED at birth** → the implementation → GREEN.
- **D-158a1 the implementation**: `planAxisBatches` +
  `LOGIN_STAGGER_MS` + `parseParallelArg` + the `walkAxis` extraction
  (the standing per-axis body verbatim, the axis name added to the
  ours-login log line so concurrent workers stay distinguishable) +
  the batches run loop (`Promise.allSettled`, drain-then-rethrow) +
  the `--parallel` CLI + the tool-header doctrine.
- **D-158a2 the gate flip**: `package.json` `gate:full` census leg →
  `--parallel 4` — the six-gate chain stays six commands.
- **PASS 1 the first full parallel census — RED (the real finding)**:
  the read-too-early class the 3-page probe missed — **the [desktop]
  reports recharts tooltip read MID-ENTRANCE (ours w55 h46 vs the
  settled w22 h22 — 3 unexplained, exit 1)** + the reference's settings
  rows read PRE-MOUNT at tablet/landscape/desktop (ref els 97/68 vs
  the settled 249 — the reference renders inside OUR slowed browser).
  **The fixed 2500ms settle does not survive 4-way load on the 2-core
  box** (L-158c1).
- **D-158a3 the quiescence extension (the cure)**: **2 RED at birth**
  (the session-158b block — the constants + the both-collectors pair
  pin + the header doctrine) → the implementation: every census read
  a SETTLED read — the geometry fingerprint (main.scrollHeight + the
  descendant count + the rounded geometry accumulation over every
  main descendant — catches mid-animation SIZE transitions) polled
  until QUIESCENCE_STABLE_SAMPLES consecutive samples agree, capped
  by QUIESCENCE_CEILING_MS — **THE NEVER-WEAKER GUARANTEE: the
  standing settle stays the FLOOR, the ceiling is the exact standing
  fallback, only ever MORE settled** → GREEN (the suite at
  **119/2241**).
- **THE GATE-TAIL HARDENING (the second decode)**: the standalone
  PASS-1 ran clean at 2×150ms/6s, but the full `gate:full` chain's
  load tail re-surfaced both faces — the starved [desktop] reports
  entrance stalled past the window + the ceiling (the tooltip read
  MID-ENTRANCE again) and the starved settings mount read ours
  pre-mount (34 ref-extra) — **the window widened to 3×400ms (a 1.2s
  no-change span) + the ceiling doubled to 12s**; a mid-retry login
  timeout decoded as the **L-158c3 budget** live (the chain's sweeps
  4 logins + the failed census 4 + the re-run 4 > the 10/15-min
  bucket — the dev-server restart + the re-run, the doctrine's own
  operational form); the re-run then **CLEAN — 52 runs, all zero
  unexplained, exit 0, the 48 stable rows byte-identical, 2m29s**.
- **PASS 1 the live proof (re-run)**: the cold parallel census — **52
  page-axis runs, ALL ZERO unexplained, exit 0, the 48 stable rows
  BYTE-IDENTICAL to the standing sequential values** (the settings
  rows absorbed by the standing LIVE-DATA SKIP doctrine — the
  reference's picklist rows LIVE-EDITED INTRADAY, its own face) —
  **wall-clock ~26 min → 2m29s** (the hardened constants' honest
  cost).
- **PASS 2 the sequential-form sanity**: `--pages login --axis phone`
  (the default `--parallel 1` path, the mutation-proof form) — GREEN
  at the exact standing values (43/43, Δ0).
- **PASS 3 the parallel mutation-proof**: the ghost div planted in the
  calendar KPI grid → `--pages calendar --fail-on-drift --parallel 4`
  → **RED at ALL FOUR axes simultaneously** (els 222/221, mainH Δ40,
  unexplained 35/36/79/79, the failures axis-prefixed — **no axis
  masks another, the L-153c1 doctrine held under concurrency**) → the
  string-surgery revert (zero src diff) → GREEN (the calendar rows at
  their standing values inside the live proof).
- **D-158a4 the count ladder**: UNIT **2233→2241 (+8)** · SUITES 119
  held · badge **2386→2394** · the live lockstep sites flipped
  atomically (count-ladder-158.py, assert-first, idempotent; the
  historicals preserved — the AGENTS/PAD s157 records, the session
  records, the plans, the worklog) · the CLAUDE-carrier negatives
  ladders grew the 2233 forms (all four carrier families) · the SKILL
  **v1.155.0** + the s158 head (the s157 layer demoted beneath) + the
  Appendix B totals + the layer-axis pin. (One ladder-script lesson
  from s157's ledger avoided: no append-style comment edits — every
  flip a unique-anchor replacement.)
- **D-158a5 the captures 373-376** (the dashboard pair at phone +
  desktop — the census's heaviest surface, the round's subject matter;
  the seeded remediated codebase, the settled protocol, verified
  in-frame) + **the VLM battery 2/2** (both pairs MATCH — the
  brand-blue fix-over-defect genus [ours the intended blue, the
  reference's build dropped its brand-blue utilities], the demo-data
  state [ours seeded / the reference's workspace empty — the standing
  probe's ZERO], and the Base44 pill the only differences, all
  documented, never mirrored).

## The ship

The docs realignment (the AGENTS Session-158 section + the
gate-cadence login-budget doctrine · the PAD session-158 row + the
Total row preserved · the SKILL s158 head + v1.155.0 · this record +
the plan execution record + the worklog Task ID 158). The two-commit
pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim; the dry-run then the real push; remote-verified; the
key shredded).

**Next**: the standing rotation candidates — the settings
intraday-rhythm map (the morning/afternoon double capture at four
axes, observation-only; this round's PASS-1 decode makes it cheaper —
the reference's settings state is now known to swing by ~150 rows
intraday), the next bundle event's below-fold re-derivation (the
L-151c1 doctrine — the census automates its discovery on every
censused surface; the quiescence makes the parallel gate the cheap
form), or a parallel-form hardening pass (the stagger/ceiling knobs
re-measured on a different box).
