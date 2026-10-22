# The session-162 plan — the sweep LOGIN CONSOLIDATION (the 162-c rotation)

Date: 2026-10-22 · Rotation: 162-c · probe:ref **#136 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no bundle event; the round's direction (the s160/s161 doctrine's
third application — the audit finding, the worklog Task ID 161's
last-listed candidate): **the four SEPARATE-PROCESS sweep invocations
share ONE cross-process storageState file — the first invocation pays
the login pair, the next three reuse the file's combined state. The
gate:full chain's our-login count drops 4 → 1 on the sweep legs; the
app's own login limiter (the 10-per-IP/15-min security contract) stays
byte-identical.**

## The rationale (the walking family's last per-invocation seam)

The login-consolidation doctrine has landed in the census (s160,
`preflightLoginPair` — one pair per invocation) and the rhythm tool
(s161, `preflightLogin` — one single-app login per invocation). The
walking-tool family's remaining seam lives in `scripts/sweep.ts`:
**each `bun run sweep` invocation is a SEPARATE PROCESS**, and its
main body logs in fresh — `await login(refPage, REF_URL)` +
`await login(ourPage, OUR_URL)` — one our-login per invocation, FOUR
invocations per `gate:full` chain (the 1440×900 · 390×844 · 768×1024 ·
1024×768 sweeps). This round's own 162-b audit burned the four live
(POST count 0→4 before the census leg) — the census (+1) and a single
diagnostic re-run (+1) landed the window at 6/10, the same proximity
to the 429 wall the s158/s159/s160 rounds documented (L-160c3: the
recurring operational cost). The chain's total: sweeps 4 + census 1 +
rhythm ride-along 1 = 6 our-logins; any re-run or scratch check rides
the remainder.

A per-invocation pre-flight (the census form) cannot cure this seam —
each sweep process would still pay its own login. The structural
license is NEW here: the state must cross the process boundary, so
the cure is a **cross-process storageState FILE** — the cached
combined pair state (the ref's Base44 cookie + our stateless
`neo_session`, two origins one jar — the s160 combined form) written
once and reused by every subsequent invocation while fresh.

## The audits (162-a / 162-b)

- **162-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **120/2262**
  (clean exit) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **162-b**: probe:ref **#136 STABLE** · **the SIX drift gates CLEAN
  ×6** (the four viewport sweeps + the fullpage at the exact standing
  values 0.093%/0.316% at equal heights 4990/7259 + the census gate at
  `--parallel 4`: 52 page-axis runs, all zero unexplained, exit 0 —
  the census leg at the 160-c consolidated form, EXACTLY ONE
  our-login per invocation, the dev-log POST-200 delta 4→5 verified
  live; a diagnostic full-output re-run +1) · sitemap 11 routes +
  robots 200 · db census MATCH 15/24/10/23/12 + 4 users · the tree
  clean · zero dep changes. TWO supplemental live checks: the mobile
  drawer verified in-browser at 390×844 (trigger unique · the rail
  hidden · `data-state=open` · 8/8 links · the MAIN-scroller lock ·
  close-on-navigate + the URL change · Escape + the lock release —
  **10/10 PASS**), and the Tailwind v4 state clean (the postcss
  `@tailwindcss/postcss` plugin present · the `@theme` `--shadow-sm` /
  `--blur-sm` re-pins in place · design-tokens 16/16).

## The design (the tool adapts, the app untouched)

**`scripts/sweep-state.ts`** — the cross-process state seam:

- **`SWEEP_STATE_FILE`** = `scripts/.sweep-auth-state.json` — a
  dotfile in the scripts dir, **git-ignored** (the .gitignore line
  added + pinned by test — live session material never enters the
  tree), written with **0600 perms** atomically (tmp + rename).
- **`SWEEP_STATE_TTL_MS`** = 15 min — the login-window semantics: the
  state is reused within one gate chain, never across rounds or dev
  generations. The TTL is the freshness bound; the authenticated
  check below is the real guard (the belt-and-suspenders pair).
- **`loadSweepState()`**: read + JSON-parse + the mtime freshness
  check; a missing, corrupt, or stale file returns null (the pure
  seam — node-testable without a browser).
- **`saveSweepState(state)`**: the atomic 0600 write (tmp + rename).
- **`preflightPairState(browser)`**: the cross-process pre-flight —
  (a) a fresh cached file is probed: ONE throwaway context with the
  state, an authenticated check per app (goto `/dashboard`
  domcontentloaded + a settle beat, the URL must NOT have redirected
  to `/login` — both apps redirect unauthenticated visits there, the
  shared `login()` helper's own `waitForURL` idiom inverted); both
  pass → the state returns, ZERO logins this invocation. (b) any miss
  (no file · stale · either app's check failed) → the census's
  `preflightLoginPair` construction: ONE context → login the
  reference → login ours → `storageState()` → close → the file saved
  → the state returns. The self-heal: a cached state that fails the
  check is simply re-derived — the failure modes (rotated AUTH_SECRET
  · the 7-day cookie TTL · the ref platform session loss · a corrupt
  file) all surface identically as the redirect, and ONE guard covers
  them all.
- **The 429-diagnostic** (the s159/s160/s161 contract): on the
  pre-flight login-pair failure the budget hint logs to **STDERR**
  (restart the dev server to clear the in-memory window, or wait it
  out — L-158c3/L-160c1) — then rethrows (fail-fast, never a silent
  fall-back).

**`scripts/sweep.ts`** — the re-wiring:

- The main body's two in-loop logins (`await login(refPage…)` +
  `await login(ourPage…)`) are **DELETED**; the single capture context
  gains `storageState: <the pre-flight state>`; both pages ride the
  combined jar (the s160 proven form — the stateless cookie survives
  context recreation, L-160c2; the zero-data phase keeps the users
  table, so the cookie survives every sweep's zeroing).
- The read side (captureAll · the diff seam · the gate semantics) is
  untouched — byte-parity pinned by the live proofs.
- Mid-run invalidation (between page captures, after the pre-flight
  check) remains backstopped by the drift gate itself: a login-wall
  screenshot is a catastrophic diff — the gate fails LOUDLY, never
  silently. The pre-flight check converts the confusing failure into
  the early diagnostic.
- The header re-doc: the login-budget paragraph re-anchored to the
  162-c form — the cross-process state file, the TTL + authenticated
  check pair, the self-heal, the zero-logins-on-reuse contract.

## The walk (the live proofs)

- **PASS 1 the budget proof**: the dev server restarted (the clean
  in-memory window), the four sweeps run serially (the gate:full
  form) — the dev log's `POST /api/auth/login` 200 count deltas by
  **exactly 1** across all four (was 4); the reference's login count
  likewise 1 (was 4 — the pair state carries both apps).
- **PASS 2 the byte-parity proof**: the four sweep gates CLEAN at the
  standing margins — the read side provably unchanged.
- **PASS 3 the self-heal proof**: the state file TAMPERED (a bogus
  cookie), one sweep re-run — the authenticated check fails → the
  fresh login pair fires (POST delta exactly 1) → the file rewritten
  valid → the sweep CLEAN.
- **PASS 4 the cross-process reuse proof**: the state file's mtime
  unchanged across invocations 2–4 (no rewrite — the reuse, not a
  re-derivation) — carried by PASS 1's single POST delta.

## The remediation (TDD — the pin ledger)

- **D-162a0 the RED pins** (`tests/sweep-tool.test.ts`, the
  session-162 describe + the state-module seam tests): the state
  module present (the file path · the TTL · the three functions) ·
  the one-login-per-chain contract (the sweep main's capture path
  login-free, the pre-flight call present, the context carries the
  state) · the self-heal guard (the authenticated probe + the
  fall-back pair + the rewrite) · the 429-diagnostic (STDERR +
  rethrow) · the security pin (the .gitignore line covering the state
  file) · the freshness pure-seam behavior (fresh loaded · stale
  rejected · corrupt rejected · missing null) — **RED at birth → the
  implementation → GREEN**.
- **D-162a1 the implementation**: `scripts/sweep-state.ts` + the
  sweep main re-wiring + the .gitignore line + the header re-doc.
- **D-162a2 the live proofs** (PASS 1–4 above).
- **D-162a3 the count ladder**: UNIT 2262 → 2262+N · SUITES 120 held
  · badge 2415 → 2415+N (the live lockstep sites flipped atomically,
  count-ladder-162.py, assert-first, idempotent, unique-anchor
  replacements; the historicals preserved) · the SKILL **v1.159.0** +
  the s162 head (the s161 layer demoted beneath) + the Appendix B
  totals.
- **D-162a4 the captures 389-392** (a sweep-family surface pair at
  phone + desktop — the round's subject surface; the seeded
  remediated codebase, settled + verified in-frame) + the VLM
  battery 2/2.
- **D-162a5 the docs realignment**: the AGENTS Session-162 section +
  the PAD session-162 row + the SKILL s162 head + the session_345
  record + this execution record + the worklog Task ID 162.
- **D-162a6 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  (the sweep legs at the 162-c form — ONE our-login for the whole
  four-sweep chain).

## The lessons (recorded at ship)

- **L-162c1** the process boundary is the last consolidation axis —
  when the per-invocation logins are already collapsed, the remaining
  multiplier is the INVOCOCATION COUNT itself; a shared file beats a
  per-process pre-flight wherever the processes run serially against
  one budget.
- **L-162c2** a cached credential's guard is VALIDATION-BY-USE, not
  trust — the TTL bounds the cache's lifetime, but the authenticated
  probe is what makes reuse safe: every failure mode surfaces as the
  same redirect, and one check converts them all into the self-heal.
- **L-162c3** session material on disk follows the database-binary
  discipline — git-ignored, 0600, TTL-bounded, never in the tree (the
  `db/*.db` precedent extended to auth state).

## The execution record (filled at ship)

- [x] 162-a / 162-b the audits (the baseline gate GREEN — lint 0/0 ·
      tsc 0 · 120/2262 · build · e2e 153/153 · probe #136 STABLE · six
      gates CLEAN ×6 · sitemap 11 · robots 200 · db MATCH · the mobile
      drawer live-checked 10/10 PASS · the Tailwind v4 state clean)
- [x] D-162a0 the RED pins (**8 RED at birth** + the seed pin born RED
      with the live decode) → D-162a1 the implementation
      (scripts/sweep-state.ts + the sweep main re-wiring + the .gitignore
      line + the header re-doc + THE SEED FIX — the users upsert) →
      **GREEN** (tsc 0 + 66/66 in-suite)
- [x] PASS 1-4 the live proofs (the budget: POST 0→1 across the whole
      four-sweep chain, was 4, zero 429s · the byte-parity: all four
      gates CLEAN · the self-heal: the tampered state detected,
      re-derived (+1), CLEAN, rewritten · the cross-process reuse:
      sweeps 2-4 ZERO-logins, the mtime unchanged; the FIFTH process —
      the captures driver — POST delta 0)
- [x] D-162a3 the count ladder (**2262→2271 (+9) · SUITES 120 held ·
      badge 2415→2424**; count-ladder-162.py, assert-first, idempotent,
      unique-anchor; the SKILL v1.159.0 + the s162 head; the seed
      line-count site 466 → 516 — the docs-counts LIVE-CENSUS catch)
- [x] D-162a4 the captures 389-392 (the zero-data dashboard pair at
      phone + desktop — the sweep family's own subject surface; mainH
      byte-equal [2851/2851 · 1274/1274], in-frame verified, the state
      file reused by the driver) + the VLM battery 2/2 (both pairs
      MATCH — **zero differences decoded**, the cleanest battery yet)
- [x] D-162a5 the docs realignment (AGENTS Session-162 · the PAD
      session-162 row · the SKILL s162 head + v1.159.0 · session_345 +
      this record + the worklog Task ID 162)
- [x] D-162a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      120/2271 · build · e2e 153/153 · the six drift gates CLEAN ×6 at
      the 162-c sweep form · the two-commit push remote-verified)

## The mid-round addendum — the LIVE DECODE (the PASS-1 root cause)

The first proof run FAILED its budget expectation: sweep 2's probe
rejected sweep 1's state (`ours=false`) and the self-heal re-logged-in
— the consolidation saved nothing. Decoded live (the dev.log's
`GET /dashboard 200` + `GET /login?from_url=…` pair → the
GuestLoginRedirect shim → the orphaned uid): **`prisma/seed.ts`'s
users block was `db.user.deleteMany()` + recreate — every `db:seed`
rotated ALL user cuids, and each sweep's END-OF-RUN seed restore
orphaned the state file's cookie uid.** The cure (in-round, pinned):
the users block rebuilt as **UPSERT-BY-EMAIL** — the ids stable across
re-seeds, the "idempotent in place" claim true in the strong sense,
the domain tables keeping their wipe+recreate. The measurement lesson
recorded with it: never pipe a long-running tool through `head` — the
early-close orphans the process (bun survives SIGPIPE), the shell
returns early, and the gate verdict is lost to the broken pipe.
