# Session 339 — the session-160 record (the census login consolidation)

## The intake

The workspace had been reset — a fresh clone (the pull path became
`git clone https://github.com/nordeim/neo-crm.git`), the standing
environment rebuilt from the repo's own contracts: `.env` from
`.env.example` (the `file:../db/custom.db` root contract + a fresh
`AUTH_SECRET`) · `db:push` + `db:seed` (census MATCH 15/24/10/23/12 +
4 users) · the Playwright chromium installed · the dev server booted.
The pull state: `3aaf8f5` — the s159 feat `491ae5b` + the
session_337/338 logs (remote main `34d4782`).

## The audits

- **160-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **120/2252**
  (clean exit) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **160-b**: probe:ref **#134 STABLE** at the s147–s155 fingerprint —
  a rotation round · **the SIX drift gates CLEAN ×6** (the four
  viewport sweeps + the fullpage at the exact standing values
  0.093%/0.316% at equal heights 4990/7259 + the census gate at 52
  page-axis runs, all zero unexplained — the settings row 256/249 at
  the standing genera) · sitemap 11 routes + robots 200 · db census
  MATCH · zero dep changes. ONE live decode: **the L-158c3 budget for
  the THIRD consecutive round** — 13 our-logins (4 sweeps + 1
  fullpage + 4 census + 4 census re-run) against the 10-per-IP/15-min
  window (2 × 429 POSTs in the dev log); the dev-server restart + the
  re-run, the doctrine's own operational form. **This recurring
  finding named the round.**

## The rotation decision

The recurring audit finding executed (my judgment — the strongest
candidate was NOT on the s159 next-round list, but the same manual
restart + re-run three rounds running is the decode-the-pain signal):
**the census login consolidation** — the per-axis logins (4
our-logins per invocation) collapse into ONE pre-flight pair, the
combined storageState handed to every axis worker. The gate:full
chain's ours-login count drops 9 → 6; the app's own login limiter — a
deliberate security contract — stays byte-identical. The s159-listed
alternatives weighed and deferred: the next bundle event's
below-fold re-derivation (probe #134 STABLE — no event), the
parallel-form re-measure (the same 2-core box — no different box).
The rhythm map's next observation (the s159 list's strongest
candidate) rode along as the T3 capture instead — the one-command
form, zero extra structure.

## The pre-plan probe (the plan validated BEFORE execution — scratch,
cleaned before ship)

The storageState probe, live against the standing dev server: ONE
login (~3.9s wall-clock) captured the `neo_session` cookie via
`context.storageState()`; a FRESH context at a DIFFERENT viewport
(1440×900) opened with that state read `/dashboard` authenticated —
the URL held (no /login redirect), `main` rendered. **PASS: the
stateless HMAC cookie survives context recreation.** The cookie's
survival across the zero-data phase is structural (the tool's own
header: users + the Setting singleton stay), and the seed restore is
idempotent in place — the cookie's user payload persists through the
whole run.

## The remediation (TDD — the pin ledger)

- **D-160a0 the RED pins** (`tests/interior-census-tool.test.ts`, the
  session-160 describe): the `WALK_STAGGER_MS` re-anchor (the renamed
  constant + the old name's RETIREMENT pinned via
  `not.toHaveProperty("LOGIN_STAGGER_MS")`) + the one-login-per-run
  contract (the walkAxis body LOGIN-FREE + the pre-flight helper's
  pair, source-shape) + the storageState propagation (the app-leg
  context carries the combined state; the public-leg GUEST contexts
  stay bare — the s149 doctrine) + the public-only guard (the
  pre-flight guarded by the app-pages selection) + the
  429-diagnostic (the STDERR budget hint + the fail-fast rethrow) +
  the header doctrine (L-160c1/c2/c3) — **7 RED at birth (the 5 new +
  the 2 s158 stagger re-anchors) → the implementation → GREEN**. Two
  pin defects fixed in flight (the honest TDD record): the
  public-guard pin's slice anchor missed the call site (re-anchored
  to the batches-loop boundary); the STDERR-hint regex's `s` flag
  needs an es2018 target (re-formed with `[\s\S]*?`); the
  `StorageState` type derived from the context method
  (`Awaited<ReturnType<BrowserContext["storageState"]>>`) — the
  namespace member moves between playwright versions.
- **D-160a1 the implementation**: `scripts/interior-census.ts` — the
  `preflightLoginPair` phase (ONE context → login the reference →
  login ours → `storageState()` → close; the 429 hint to STDERR on
  failure, rethrow; the try/finally closes the context) + the
  walkAxis signature gains the `authState` param (the app-leg
  `newContext({ viewport, storageState })`; the in-worker logins
  DELETED) + the run() wiring (the pre-flight call after the browser
  launch, guarded by `pages.length > 0`) + the rename
  `LOGIN_STAGGER_MS` → `WALK_STAGGER_MS` (the value 4000 held; the
  batch log message re-anchored) + the header re-doc (the L-160
  lessons + the one-login-per-run contract).
- **D-160a2 the live proofs (walk50)**: **PASS 1 the budget** — the
  consolidated run burns EXACTLY ONE our-login (the dev log's POST
  200 delta 5→6, was 4; zero 429s); **PASS 2 the byte-parity** — the
  gate clean at the standing values (settings 256/249 SKIPPED at the
  DATA genus, login 43/43, landing 364/364, all 52 page-axis runs
  zero unexplained, exit 0); **PASS 3 the public-only guard** —
  `--pages landing` runs guest-only, login delta 0, no pre-flight;
  **PASS 4 the sequential default form** — `--pages login --axis
  phone`, exactly one login, the standing values (43/43, Δ0, match
  23); **PASS 5 the wall-clock** — 2m29.8s for the full 4-axis
  parallel run (the walk dominates the concurrent form; the login
  savings were absorbed by the overlapped batch — the BUDGET is the
  true subject; the sequential form saves the serial login pairs).
- **D-160a3 the count ladder**: UNIT **2252→2257 (+5)** · SUITES
  **120 held** · badge **2405→2410** · the live lockstep sites
  flipped atomically (count-ladder-160.py + skill-head-160.py,
  assert-first, idempotent, unique-anchor replacements; the
  historicals preserved) — the three PAD sites the docs-counts pins
  caught live on the first ladder run (the HEAD line, the
  checklist, the commands table) joined the ladder script · the
  CLAUDE-carrier negatives ladders grew the 2252 forms (all four
  carrier families) · the SKILL **v1.157.0** + the s160 head (the
  s159 layer demoted beneath) + the Appendix B totals · the
  docs-counts layer-axis pins re-anchored (the first layer s160, the
  second s159).
- **D-160a4 the captures 381-384** (the login-wall pair at phone +
  desktop — the round's subject surface: the consolidated login's
  own wall; the seeded remediated codebase, the settled protocol,
  verified in-frame) + **the VLM battery 2/2** (both pairs MATCH —
  the 3D-logo genus + the Base44 pill the only differences, both
  documented genera, never mirrored).
- **D-160a5 the T3 rhythm ride-along** (the standing instrument's
  first CROSS-SESSION observation): the T2 reconstruction from the
  s159-documented byte-exact values → the fresh T3 capture (05:35Z)
  → the axis-by-axis diff — **byte-identical on every axis: 31 rows
  (5/6/6/4/10), els 249, mainH 2973/2135/2099/2099, +0 on every
  section**; the ours control at the standing seeded values (32 rows
  [8/7/6/3/8], els 256, mainH 3059). **The window extends ~45 min →
  ~3h05m (T1 02:30Z → T3 05:35Z, two maintenance rounds) — L-159c3's
  null face extends across sessions.**

## The ship

The docs realignment (the AGENTS Session-160 section + the
login-budget doctrine's structural-cure update · the PAD
session-160 row + the Total row preserved · the SKILL s160 head +
v1.157.0 · this record + the plan execution record + the worklog Task
ID 160) · the scratch cleanup (the probe, the captures driver, the
ladder scripts, the T2/T3 rhythm files — the values documented
byte-exact in this record, the s159 reconstruction precedent). The
two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
`--remote` override; the dry-run then the real push; remote-verified;
the key shredded).

**Next**: the standing rotation candidates — the next bundle event's
below-fold re-derivation (probe #134 still STABLE — the watch
continues; the consolidated census makes the gate chain cheaper
still), the rhythm map's next observation (the T3 values above are
the reconstruction baseline — a one-command capture diffed against
them), or the parallel-form hardening pass (still needs a different
box).
