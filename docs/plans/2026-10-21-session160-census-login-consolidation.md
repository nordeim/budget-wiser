# The session-160 plan — the census LOGIN-CONSOLIDATION (the 160-c rotation)

Date: 2026-10-21 · Rotation: 160-c · probe:ref **#134 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no bundle event; the round's direction (my judgment on the recurring
audit finding — three consecutive rounds of the same operational pain):
**the census login consolidation — ONE pre-flight login per app per
invocation, the combined storageState handed to every axis worker. The
gate:full chain's ours-login count drops 9 → 6, the recurring L-158c3
budget exhaustion gets its structural cure, and the app's own login
limiter (the 10-per-IP/15-min security contract) stays byte-identical.**

## The rationale (a recurring operational pain is a standing defect)

The L-158c3 login budget has now exhausted itself live in THREE
consecutive rounds: s158 (the mid-retry login timeout — 4 sweeps + 4
census + 4 re-run logins > the 10/15-min window), s159 (7 × 429s — the
back-to-back census diagnostics burned 12 our-logins), and s160's own
160-b audit (13 logins, 2 × 429 POSTs, the dev-server restart + the
re-run — the doctrine's operational fix, now thrice validated). The
root decode: the census logs into BOTH apps once per AXIS WORKER (4
our-logins per invocation), and the four viewport sweeps + the
fullpage sweep add 5 more — the six-gate chain burns 9 of the 10
logins in the window, so any second census run, any diagnostic re-run,
or any nearby e2e boot blows the budget and costs the manual
restart + re-run every time.

The arrival-rate stagger (L-157c3/L-158c3 — LOGIN_STAGGER_MS) treated
the SYMPTOM (the burst); the COUNT is the budget's true axis. The
auth seam's own shape is the license: the session cookie is a
stateless HMAC-signed token (no server-side session store), and the
census's zero-data phase keeps the users table (the seed restore is
idempotent in place) — so ONE login's cookie serves every axis
worker's fresh context through the whole run. The fix lands at the
TOOL level (the orchestration consolidates its logins); the app's
rate limiter — a deliberate security contract — is never touched.

## The audits (160-a / 160-b)

- **160-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **120/2252**
  (clean exit) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **160-b**: probe:ref **#134 STABLE** · **the SIX drift gates CLEAN
  ×6** (the four viewport sweeps + the fullpage at the exact standing
  values 0.093%/0.316% at equal heights 4990/7259 + the census gate at
  `--parallel 4`: 52 page-axis runs, all zero unexplained, exit 0) ·
  sitemap 11 routes + robots 200 · db census MATCH 15/24/10/23/12 + 4
  users · the tree clean · zero dep changes. ONE live decode: **the
  L-158c3 budget for the THIRD consecutive round** — 13 our-logins
  (4 sweeps + 1 fullpage + 4 census + 4 census re-run) vs the
  10-per-IP/15-min window; 2 × 429 POST /api/auth/login in the dev
  log; the dev-server restart + the single re-run, the doctrine's own
  operational form. This round is that finding's structural cure.

## The pre-plan probe (the plan validated BEFORE execution — scratch,
cleaned before ship)

The storageState probe (scratch, live against the standing dev
server): ONE login (~3.9s wall-clock) captured the `neo_session`
cookie via `context.storageState()`; a FRESH context at a DIFFERENT
viewport (1440×900) opened with that state read `/dashboard`
authenticated — the URL held (no /login redirect), `main` rendered.
**PASS: the stateless cookie survives context recreation — the
consolidation is safe, the read side unchanged.** The cookie's
survival across the zero-data phase is structural (users stay — the
tool's own header documents it), and the seed restore is idempotent
in place (the user rows persist, the HMAC payload stays valid).

## The design (the instrument — the tool adapts, the app untouched)

**`scripts/interior-census.ts`** — the pre-flight form:

- **The pre-flight phase** (in `run()`, after the zero-data step,
  before the batches loop, GUARDED by `pages.length > 0` — the
  standing public-only doctrine transfers): ONE context → login the
  reference → login ours → `storageState()` (the COMBINED state —
  two origins, one cookie jar: the ref's Base44 cookie + our
  `neo_session`) → close the context. Exactly ONE our-login and ONE
  ref-login per invocation, regardless of `--parallel`.
- **The 429-diagnostic** (the DX face of the recurring pain): the
  pre-flight login failure logs the budget hint to **STDERR** (the
  s159 stdout/stderr contract) — "if the dev log shows 429s, the
  10-per-IP/15-min window is exhausted (L-158c3); the doctrine's
  fix: a dev-server restart + a single re-run" — then rethrows (the
  fail-fast idiom, never a silent fall-back).
- **`walkAxis`**: the app-leg context gains
  `storageState: <the combined pair state>`; the in-worker logins
  DELETED (the login call sites collapse into the pre-flight). The
  public-leg GUEST contexts stay bare — no storageState (the s149
  fullpage doctrine: the landing renders to guests, the reference's
  Base44 pill and all).
- **The stagger re-anchor**: `LOGIN_STAGGER_MS` → **`WALK_STAGGER_MS`**
  (the honest name) — the value holds at 4000, the role transfers:
  worker i of a batch delays its START (spreading the 4-way walk
  load — the first censusPage reads), no longer a login arrival.
  The no-burst doctrine's spirit rides on; its letter (the login
  count) moves to the pre-flight.
- **The byte-parity guarantee**: the report, the genera attribution,
  and the `--json` shape are auth-provenance-independent — the
  census reads the same DOM either way. The never-weaker quiescence
  guarantee (s158b) rides along untouched.

## The walk (walk50 — the live proofs)

- **PASS 1 the budget proof**: the consolidated census run burns
  EXACTLY ONE our-login — the dev log's POST /api/auth/login 200
  count deltas by exactly 1 across the run (was 4), zero 429s.
- **PASS 2 the byte-parity proof**: the consolidated run reports the
  standing values byte-for-byte (login 43/43, landing 364/364,
  settings SKIPPED at the DATA genus, zero unexplained, exit 0) —
  the read side provably unchanged.
- **PASS 3 the public-only guard**: `--pages landing` runs guest-only
  — zero logins (the pre-flight guarded; the s149 doctrine held).
- **PASS 4 the sequential form**: `--parallel 1` (the default
  standing protocol) also logs in exactly once — the no-flag form
  byte-identical.
- **PASS 5 the wall-clock**: the login phases drop 4 → 1 per run
  (~12s of login wall-clock saved per census invocation).

## The remediation (TDD — the pin ledger)

- **D-160a0 the RED pins** (`tests/interior-census-tool.test.ts`, the
  session-160 describe): `WALK_STAGGER_MS` (the renamed constant, the
  4000 value, the worker-START doctrine + the old name RETIRED) + the
  one-login-per-run contract (the walkAxis body login-free + the
  pre-flight helper's pair — source-shape) + the storageState
  propagation (the app-leg context carries it, the guest contexts
  stay bare) + the public-only guard (the pre-flight guarded by the
  app-pages selection) + the 429-diagnostic (the STDERR hint present
  + fail-fast) + the header doctrine (the L-160 lessons) — **RED at
  birth → the implementation → GREEN**. The two s158 stagger pins
  re-anchor (the LOGIN_STAGGER_MS constant pin becomes the
  WALK_STAGGER_MS pin; the collection-order pin's source regex
  follows the rename).
- **D-160a1 the implementation**: the preflight helper + the walkAxis
  signature + the run() wiring + the rename + the header re-doc.
- **D-160a2 the live proofs** (PASS 1-5 above).
- **D-160a3 the count ladder**: UNIT 2252 → 2252+N · SUITES 120 held
  · badge 2405 → 2405+N (the live lockstep sites flipped atomically,
  count-ladder-160.py, assert-first, idempotent, unique-anchor
  replacements; the historicals preserved) · the CLAUDE-carrier
  negatives ladders grow the 2252 forms (all four carrier families) ·
  the SKILL **v1.157.0** + the s160 head (the s159 layer demoted
  beneath) + the Appendix B totals.
- **D-160a4 the captures 381-384** (the login-wall pair at phone +
  desktop — the round's subject surface: the consolidated login's own
  wall; the seeded remediated codebase, settled + verified in-frame)
  + the VLM battery 2/2.
- **D-160a5 the T3 rhythm ride-along** (the standing instrument's
  first CROSS-SESSION observation): the T2 reconstruction from the
  s159-documented byte-exact values (ref 31 rows [5/6/6/4/10], els
  249, mainH 2973/2135/2099/2099; ours 32 rows [8/7/6/3/8], els 256,
  mainH 3059) → the fresh T3 capture → the axis-by-axis diff — the
  map's window extends ~45 min → multi-hour. The null face extended,
  or the swing window finally caught — documented either way
  (L-159c3: never assumed).
- **D-160a6 the docs realignment**: the AGENTS Session-160 section +
  the login-budget doctrine's structural-cure update · the PAD
  session-160 row + the Total row preserved · the SKILL s160 head +
  v1.157.0 · the session_339 record + this execution record + the
  worklog Task ID 160.
- **D-160a7 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  (the census leg at the consolidated form).

## The lessons (recorded at ship)

- **L-160c1** the login COUNT is the budget's true axis (the
  arrival-rate stagger treated the symptom; the orchestration must
  shrink the count itself — and never by weakening the app's
  limiter, a deliberate security contract).
- **L-160c2** the stateless cookie is the consolidation license (the
  HMAC-signed stateless session + the zero-data-keeps-users contract
  are what make cross-context reuse safe; a server-side session store
  would break the whole design — the seam's shape is the tool's
  enabling contract).
- **L-160c3** a recurring operational fix is a standing defect (the
  same manual restart + re-run three rounds running is the signal to
  spend a round on the structural cure — the decode-the-pain doctrine
  applied to the tooling itself).

## The execution record (filled at ship)

- [x] 160-a / 160-b the audits (the baseline gate GREEN · probe #134
      STABLE · six gates CLEAN ×6 · the L-158c3 budget live AGAIN —
      13 logins, 2 × 429s, the restart + the re-run — the finding
      that named this round)
- [x] the pre-plan probe (ONE login ~3.9s · the `neo_session` cookie
      survives context recreation · a state-reused fresh context at
      1440×900 reads /dashboard authenticated — PASS)
- [x] D-160a0 the RED pins (**7 RED at birth** — the 5 new + the 2 s158
      stagger re-anchors; two pin defects fixed in flight: the
      public-guard slice anchor + the s-flag regex) → D-160a1 the
      implementation → **GREEN** (tsc 0 + 68/68 in the suite)
- [x] PASS 1-5 the live proofs (the budget: dev-log POST-200 delta
      5→6 — EXACTLY ONE our-login, zero 429s · the byte-parity: the gate
      clean, 52 runs zero unexplained, the standing values · the
      public-only guard: delta 0, no pre-flight · the sequential
      default: one login, the standing values · the wall-clock 2m29.8s
      — the walk dominates, the budget the true subject)
- [x] D-160a3 the count ladder (**2252→2257 +5 · SUITES 120 held ·
      badge 2405→2410**; the three PAD sites the docs-counts pins
      caught live joined the ladder script) + the carriers + the SKILL
      **v1.157.0**
- [x] D-160a4 the captures 381-384 (the login-wall pair at phone +
      desktop) + the VLM battery 2/2 (both MATCH — the 3D-logo genus +
      the Base44 pill the only differences, both documented)
- [x] D-160a5 the T3 rhythm ride-along (05:35Z — **byte-identical to
      the T2 reconstruction on every axis: 31 rows (5/6/6/4/10), els
      249, mainH 2973/2135/2099/2099, +0 everywhere**; the ours control
      32/256/3059; the window extends ~45 min → ~3h05m across two
      maintenance rounds — the null face extends across sessions)
- [x] D-160a6 the docs realignment
- [x] D-160a7 the verification chain + the ship
