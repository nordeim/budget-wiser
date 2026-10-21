# Session 342 — the session-161 record (the rhythm login consolidation)

## The intake

The workspace had been reset — a fresh clone (the pull path became
`git clone https://github.com/nordeim/neo-crm.git`), the standing
environment rebuilt from the repo's own contracts: `.env` from
`.env.example` (the `file:../db/custom.db` root contract + a fresh
`AUTH_SECRET`) · `db:push` + `db:seed` (census MATCH 15/24/10/23/12 +
4 users) · the Playwright chromium installed · the dev server booted.
The pull state: `fb67568` — the s160 feat `af5aeef` + the
session_339/340 logs (`1e73fcb`) + the session_341 transcript.

## The audits

- **161-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **120/2257**
  (clean exit) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **161-b**: probe:ref **#135 STABLE** at the s147–s155 fingerprint —
  a rotation round · **the SIX drift gates CLEAN ×6** (the four
  viewport sweeps + the fullpage at the exact standing values
  0.093%/0.316% at equal heights 4990/7259 + the census gate at
  `--parallel 4`: 52 page-axis runs, all zero unexplained, exit 0 —
  the census leg at the 160-c consolidated form, EXACTLY ONE
  our-login verified live, the dev-log POST-200 delta 4→5) · sitemap
  11 routes + robots 200 · db census MATCH · the tree clean · zero
  dep changes. ONE supplemental live check: the mobile drawer
  verified in-browser at 390×844 (the trigger unique · the rail
  hidden · `data-state=open` · 8/8 links · the MAIN-scroller lock ·
  close-on-navigate + the URL change · Escape + the lock release —
  PASS; two scratch iterations decoded the tool-side traps — the
  mangled selector + the body-vs-main lock target). And the login
  window itself filled to 10/10 inside the audit (the sweeps + the
  census re-run + the scratch checks) — the budget reality the round
  addresses, demonstrated live in miniature.

## The rotation

The skills catalog reviewed per the mandate (tdd, agent-browser,
clone-app-pat-pro, tailwind-patterns — all embodied in the standing
discipline). The candidates weighed: the bundle event (probe #135
STABLE — dead), the parallel-form re-measure (same box — dead), the
T4 observation (the standing candidate — a ride-along, not a round).
The audit's own finding won: **the rhythm tool's login seam** — the
s160 consolidation cured the census while the settings-rhythm
instrument (the walking-tool family's OTHER member, sharing the same
seams) kept the per-axis login pattern: `await login(page, base)`
inside the `for (const axis of axes)` loop, 4 our-logins per
`--axis all` ours-control, the header still documenting the retired
L-157c3/L-158c3 arrival-rate doctrine. The T-series ride-along is now
a standing every-round feature (T1/T2 at s159, T3 at s160, T4 this
round) — each round's ours control costs 4 logins; the control + the
gate chain = 9 of the 10-per-IP/15-min window, one diagnostic re-run
from the 429 wall — the L-160c3 recurring-cost pattern verbatim.

## The remediation (TDD — the pin ledger)

- **D-161a0 the RED pins** (`tests/settings-rhythm-tool.test.ts`, the
  session-161 describe, +5): the one-login-per-invocation contract
  (the `preflightLogin` helper + the capture loop login-free,
  source-shape) + the storageState propagation (the axis contexts
  carry the state) + the 429-diagnostic (the STDERR budget hint + the
  fail-fast rethrow) + the header re-anchor (the L-160c1 doctrine
  present, the old "one login each"/"never a burst" RETIRED) + the
  reuse/observation-only doctrine — **4 RED at birth → the
  implementation → GREEN** (the 5th born-green by design: it pins
  contracts that already hold and must keep holding).
- **D-161a1 the implementation** (`scripts/settings-rhythm.ts`): the
  `preflightLogin` helper (the s160 census construction, single-app
  form — ONE context → login the target → `storageState()` → close;
  the pair walks both apps because the census does, the rhythm never
  does) + the capture-loop re-wiring (the in-loop login DELETED, the
  state handed to every axis context) + the 429-diagnostic + the
  header re-doc (L-160c1; the parseRhythmAxisArg docstring re-anchored
  with it). tsc 0 + 16/16 in the suite.
- **D-161a2 the live proofs**: **PASS 1 the budget** — `--app ours
  --axis all` burns EXACTLY ONE our-login (the dev-log POST-200 delta
  0→1, was 4; zero 429s; the dev-server restart cleared the window
  per the doctrine's own operational form); **PASS 2 the byte-parity**
  — the ours control at the standing values byte-for-byte (phone 32
  rows [8/7/6/3/8], els 256, mainH 3059) plus the FIRST documented
  multi-axis ours baseline (tablet mainH 2147 · landscape 2123 ·
  desktop 2123); **PASS 3 the T4 ride-along** — the T3 reconstruction
  from the s160-documented byte-exact values + the fresh T4 capture
  (23:00Z) + the axis-by-axis diff: BYTE-IDENTICAL on every axis (31
  rows [5/6/6/4/10], els 249, mainH 2973/2135/2099/2099, +0
  everywhere) — the null face extends ~45 min → **~20.5h ACROSS
  DAYS** (T1 02:30Z 2026-10-21 → T4 23:00Z 2026-10-22, four
  observations, three maintenance rounds); **PASS 4 the diff mode** —
  browser-free, login-free, unchanged.
- **D-161a3 the count ladder**: UNIT 2257 → **2262** (+5) · SUITES
  120 held · badge 2410 → **2415** — 16 live-tense site-groups flipped
  atomically (count-ladder-161.py, assert-first, idempotent,
  unique-anchor; the historicals preserved) · the CLAUDE-carrier
  negatives grew the 2257 forms (all four families) · the docs-counts
  layer-axis pins re-anchored (the first layer s161, the second
  s160) · the SKILL **v1.158.0** + the s161 head (the s160 layer
  demoted beneath) + the H1 + the Appendix B totals. ONE live catch:
  the docs-counts pins caught the SKILL H1 version site un-flipped
  on the first ladder run — the assert-first doctrine working as
  designed; the site joined the ladder script.
- **D-161a4 the captures 385-388** (the settings pair at phone +
  desktop — the round's subject surface: the rhythm instrument's own
  page; the seeded remediated codebase, the settled protocol, all
  in-frame verified at the standing mainH values 3059/2973 +
  2123/2099) + **the VLM battery 2/2** (both pairs MATCH — the
  live-data genus [the reference's own intraday picklist edits; the
  VLM's row counts independently CONFIRMING the rhythm fingerprints:
  ours 8/7 contact/lead-stages vs ref 5/6] + the Base44 pill the only
  differences, both documented genera, never mirrored).

## The lessons

- **L-161c1 a doctrine lands in a FAMILY, not a file** — the s160
  cure healed the census while the rhythm tool (the same family, the
  same seams) kept the per-axis pattern; when a structural cure
  lands, enumerate the family members sharing the seam.
- **L-161c2 the standing ride-along is a standing COST** — the moment
  an observation becomes an every-round feature, its budget cost
  recurs every round; minimize it structurally, never just tolerate
  it once.

## The verification

lint 0/0 · tsc 0 · **120/2262** · build · e2e **153/153** · **the SIX
drift gates CLEAN ×6** (the census leg at the 160-c form, the rhythm
tool at the 161-c form) · census MATCH · db census MATCH · the VLM
battery 2/2 · the captures 385-388. The two-commit ship (the feat +
the session logs) pushed via the SSH wrapper, remote-verified.

## Suggested next round

Watch for the next reference bundle event (probe #135 still STABLE —
the watch continues), take the rhythm map's next observation (the T4
values in this record are the one-command reconstruction baseline),
or spend the round on the next standing audit finding (the sweeps'
four separate-process logins are the walking family's last
per-invocation seam — the four viewport sweeps burn 4 our-logins per
gate:full; a cross-process storageState file is the candidate design,
with its own invalidation/security questions to decode first).
