# The session-161 plan — the rhythm LOGIN-CONSOLIDATION (the 161-c rotation)

Date: 2026-10-22 · Rotation: 161-c · probe:ref **#135 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no bundle event; the round's direction (the s160 doctrine's second
application — the audit finding): **the settings-rhythm instrument
gets the same login consolidation the census received at 160-c — ONE
pre-flight login per invocation, the storageState shared by every axis
context in the loop. The ours control's login count drops 4 → 1 per
invocation; the app's own login limiter (the 10-per-IP/15-min security
contract) stays byte-identical.**

## The rationale (the doctrine's uncovered member)

The s160 consolidation (L-160c1: the login COUNT is the budget's true
axis) landed in ONE walking tool — `scripts/interior-census.ts`. The
walking-tool family has a SECOND member: `scripts/settings-rhythm.ts`,
and its capture loop still logs in PER AXIS — `await login(page, base)`
inside the `for (const axis of axes)` loop, a fresh context per axis,
one login each. The `--axis all` form burns FOUR our-logins per
invocation (the ours control) or four ref-logins (the observation —
free against our budget). The header still documents the OLD
L-157c3/L-158c3 arrival-rate language ("never a burst") — the very
symptom-axis doctrine s160 retired.

The T-series ride-along is now a STANDING feature of every round
(s159 T1/T2, s160 T3, this round T4) — each rhythm round's ours
control costs 4 our-logins. The gate:full chain costs 5 (four sweeps +
one consolidated census). A rhythm round therefore lands at 9 of the
10-per-IP/15-min window — ONE diagnostic re-run from the 429 wall, the
L-160c3 recurring-operational-cost pattern verbatim. The 161-b audit
demonstrated the budget live in miniature: the discretionary scratch
checks + the census re-run filled the window to 10/10 within minutes.

The structural license is unchanged (L-160c2): the stateless HMAC
cookie survives context recreation (the s160 probe proved it live;
the s160 pins hold it); the rhythm tool already reuses
`censusPage` + its quiescence — the storageState rides the same
settled-read guarantee.

## The audits (161-a / 161-b)

- **161-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **120/2257**
  (clean exit) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **161-b**: probe:ref **#135 STABLE** · **the SIX drift gates CLEAN
  ×6** (the four viewport sweeps + the fullpage at the exact standing
  values 0.093%/0.316% at equal heights 4990/7259 + the census gate at
  `--parallel 4`: 52 page-axis runs, all zero unexplained, exit 0 —
  the census leg at the 160-c consolidated form, EXACTLY ONE
  our-login per invocation, the dev-log POST-200 delta 4→5 verified
  live) · sitemap 11 routes + robots 200 · db census MATCH
  15/24/10/23/12 + 4 users · the tree clean · zero dep changes. ONE
  supplemental live check: the mobile drawer verified in-browser at
  390×844 (trigger unique · the rail hidden · `data-state=open` · 8/8
  links · the MAIN-scroller lock · close-on-navigate + the URL change
  · Escape + the lock release — PASS), and the login window itself
  filled to 10/10 inside the audit — the budget reality the round
  addresses.

## The design (the instrument — the tool adapts, the app untouched)

**`scripts/settings-rhythm.ts`** — the pre-flight form (the s160
construction, single-app — the rhythm tool walks ONE app per
invocation):

- **`preflightLogin(browser, app, base)`**: ONE context → login the
  target app → `storageState()` → close. Exactly ONE login per
  invocation, regardless of `--axis` count. The single-app form of the
  census's `preflightLoginPair` — the pair walks both apps because the
  census does; the rhythm never does, so the helper takes the target
  as its parameter (no shared export needed — the orchestration is
  tool-specific, the reusable seams [login, censusPage,
  settingsRowSignature] already imported).
- **The 429-diagnostic** (the census form adapted): on pre-flight
  failure the budget hint logs to **STDERR** (the s159 stdout/stderr
  contract) — then rethrows (fail-fast, never a silent fall-back).
- **The capture loop**: each axis context gains
  `storageState: <the pre-flight state>`; the in-loop
  `await login(page, base)` DELETED. The settled-read guarantee
  (censusPage's quiescence) rides along untouched — the read side
  never changes.
- **The header re-doc**: the login-budget paragraph re-anchored to
  L-160c1 — ONE login per invocation (the count, never the arrival
  rate); the old "one login each [per axis] / never a burst" language
  retired; the `parseRhythmAxisArg` docstring's "one login each"
  re-anchored with it.

## The walk (the live proofs)

- **PASS 1 the budget proof**: `--app ours --axis all` burns EXACTLY
  ONE our-login — the dev log's POST /api/auth/login 200 count deltas
  by exactly 1 across the invocation (was 4).
- **PASS 2 the byte-parity proof**: the ours control at the standing
  form reproduces the standing values byte-for-byte (phone: 32 rows
  [8/7/6/3/8], els 256, mainH 3059) — the read side provably
  unchanged.
- **PASS 3 the T4 rhythm ride-along** (the standing instrument's
  cross-session observation): the T3 reconstruction from the
  s160-documented byte-exact values (ref 31 rows [5/6/6/4/10], els
  249, mainH 2973/2135/2099/2099) → the fresh T4 capture
  (`--app ref --axis all`) → the axis-by-axis diff — the null face
  extends (multi-session now), or the swing window finally caught —
  documented either way (L-159c3: never assumed).
- **PASS 4 the diff-mode guard**: `--diff` unchanged — no browser, no
  login (the pure seam over two files; the standing pins hold).

## The remediation (TDD — the pin ledger)

- **D-161a0 the RED pins** (`tests/settings-rhythm-tool.test.ts`, the
  session-161 describe): the pre-flight helper present + the
  one-login-per-invocation contract (the capture loop login-free,
  source-shape) + the storageState propagation (the axis contexts
  carry it) + the 429-diagnostic (the STDERR hint + the fail-fast
  rethrow) + the header re-anchor (the L-160c1 doctrine present, the
  old per-axis login language RETIRED) — **RED at birth → the
  implementation → GREEN**.
- **D-161a1 the implementation**: the preflightLogin helper + the
  capture-loop re-wiring + the 429-diagnostic + the header re-doc.
- **D-161a2 the live proofs** (PASS 1-4 above).
- **D-161a3 the count ladder**: UNIT 2257 → 2257+N · SUITES 120 held
  · badge 2410 → 2410+N (the live lockstep sites flipped atomically,
  count-ladder-161.py, assert-first, idempotent, unique-anchor
  replacements; the historicals preserved) · the CLAUDE-carrier
  negatives ladders grow the 2257 forms (all four carrier families) ·
  the SKILL **v1.158.0** + the s161 head (the s160 layer demoted
  beneath) + the Appendix B totals.
- **D-161a4 the captures 385-388** (the settings pair at phone +
  desktop — the round's subject surface: the rhythm instrument's own
  page; the seeded remediated codebase, settled + verified in-frame)
  + the VLM battery 2/2.
- **D-161a5 the docs realignment**: the AGENTS Session-161 section +
  the PAD session-161 row (the Total row preserved) + the SKILL s161
  head + the session_342 record + this execution record + the worklog
  Task ID 161.
- **D-161a6 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN ×6**
  (the census leg at the 160-c form, the rhythm tool at the 161-c
  form).

## The lessons (recorded at ship)

- **L-161c1** a doctrine lands in a FAMILY, not a file (the s160
  consolidation cured the census's logins while the rhythm tool —
  the same walking-tool family, sharing the same seams — kept the
  per-axis pattern; when a structural cure lands, enumerate the
  family members that share the seam).
- **L-161c2** the standing ride-along is a standing COST (the moment
  an observation becomes a every-round feature, its budget cost
  recurs every round — the cost must be structurally minimized, not
  just tolerated once).

## The execution record (filled at ship)

- [x] 161-a / 161-b the audits (the baseline gate GREEN — lint 0/0 ·
      tsc 0 · 120/2257 · build · e2e 153/153 · probe #135 STABLE · six
      gates CLEAN ×6 — the census at the 160-c form, ONE login
      verified live · sitemap 11 · robots 200 · db MATCH · the mobile
      drawer live-checked PASS; the login window filled to 10/10
      inside the audit — the budget reality the round addresses)
- [x] D-161a0 the RED pins (**4 RED at birth** — the 5 new, the 5th
      born-green by design) → D-161a1 the implementation
      (preflightLogin [single-app form] + the loop re-wiring + the
      429-diagnostic + the header re-doc) → **GREEN** (tsc 0 + 16/16)
- [x] PASS 1-4 the live proofs (the budget: delta 0→1, was 4, zero
      429s · the byte-parity: 32 rows [8/7/6/3/8], els 256, mainH
      3059 + the first multi-axis ours baseline 2147/2123/2123 · the
      T4 ride-along: byte-identical to T3, +0 everywhere — the null
      face ~20.5h ACROSS DAYS · the diff mode: browser-free,
      login-free, unchanged)
- [x] D-161a3 the count ladder (**2257→2262 +5 · SUITES 120 held ·
      badge 2410→2415**; 16 site-groups + the carriers' negatives +
      the layer-axis re-anchors + the SKILL v1.158.0 head splice; the
      docs-counts pins caught the SKILL H1 site live — joined the
      ladder script)
- [x] D-161a4 the captures 385-388 (the settings pair at phone +
      desktop, in-frame at the standing mainH values) + the VLM
      battery 2/2 (both MATCH — the live-data genus + the Base44
      pill; the VLM's row counts CONFIRM the rhythm fingerprints)
- [x] D-161a5 the docs realignment (AGENTS Session-161 · the PAD
      session-161 row · the SKILL s161 head · session_342 + this
      record + the worklog Task ID 161)
- [x] D-161a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      120/2262 · build · e2e 153/153 · the six drift gates CLEAN ×6 ·
      the two-commit push remote-verified)
