# Session 349 — THE TEST-ISOLATION CURE + THE RESET-TOKEN HASH + THE AMORTIZED SWEEP (session-164)

Date: 2026-10-22 · Rotation: 164 · Operator task: audit + validate the
session-163 ship (the auth retrofit + the Zod layer), remediate the
findings TDD-first, align the docs, capture the screenshots, push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## The baseline that named the round

Workspace refreshed to `53089dd` (git pull; `bunx prisma generate` — the
pull brought the s163 schema but the local generated client predates
it). The baseline gate:

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN (after the client regen) |
| unit | **RED 2346/2347** — F-164a |
| build | GREEN (29 routes) |
| e2e | **RED 160/161** — F-164b (load flake) |
| probe:ref #137 | STABLE at the s147-s155 fingerprint — no parity event |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| sitemap + robots | 11 routes / 200 |

## The finding register (all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-164a | The hand-signed session battery is **ambient-env-dependent**: `@prisma/client`'s module init auto-loads the repo `.env` into `process.env` (bisected: `@/lib/password` UNSET → `@/lib/db-path` UNSET → `@/lib/db` SET), so a ≥16-char `AUTH_SECRET` in any workspace's `.env` flips `secret()` off the DEV fallback the tests hard-code. The pre-retrofit acceptance test fails; the three rejection siblings pass **VACUOUSLY**. Fresh clones following the documented first-run setup hit this on day one. | High |
| F-164b | The e2e settings Defaults spec measured `boundingBox()` with no auto-wait — under full-suite load the label subtree can be mid-mount at read time (1-in-1 full-suite; 3/3 isolated). | Medium |
| F-164c | Reset tokens stored **plaintext** — the web-app-foundation skill §12 requires hashed-at-rest; neo-crm hashes the verification CODE (scrypt) but not the reset TOKEN (internally inconsistent; a DB read compromise mints live reset URLs). | Medium |
| F-164d | The amortized limiter sweep (digma S76-G) — s163's WP-7 stretch — deferred without the note; O(n) `sweepRateLimits()` on every auth-route call. | Low |
| F-164e | `bun audit` absent from the documented discipline; 9 advisories (4 high / 4 moderate / 1 low), ALL dev-toolchain transitive, undocumented. | Low |

## The implementation (TDD — every WP RED first)

1. **WP-1 the test-isolation cure**: `tests/auth.test.ts`'s hand-signed
   battery is env-PINNED — `beforeAll` plants a 64-char ambient
   `AUTH_SECRET` on purpose (so the pin is exercised everywhere), the
   `beforeEach` pin deletes it before every hand-signed construction,
   `afterAll` restores. Two regression pins joined: the env-pinning
   invariant + the foreign-key honesty mirror (a token signed with the
   AMBIENT secret must NOT verify inside the pinned battery — the
   rejection tests can never again pass at the wrong layer).
   Mutation-proven: the pin disabled → exactly 3 RED.
2. **WP-2 the reset-token hash**: `hashResetToken` joins the pure seam
   (SHA-256 hex — a FAST hash, correct for a 256-bit-entropy token; the
   code-vs-token asymmetry). The forgot route stores the hash; both
   reset-route lookups key on it; the delivery URL keeps the RAW token;
   the seed's user upserts clear the reset funnel (`tokenVersion`
   deliberately not reset — no demo-session eviction); the schema
   comment documents hashed-at-rest. Migration: a pending plaintext
   token ages out of its 60-min TTL.
3. **WP-3 the e2e starved-read hardening**: visibility pre-waits before
   the two `boundingBox()` reads; E2E held at 161.
4. **WP-4 the amortized sweep (digma S76-G)**: a module-level WATERMARK
   (the earliest live resetAt seen at the last sweep) gates
   `sweepRateLimits()` — pre-crossing calls are O(1) no-ops returning
   the swept count 0; expired keys reset lazily at their own access;
   only un-accessed keys' reclamation waits for the crossing. The pure
   seam `computeWatermark` + the swept-count return are the honest
   observables (per-key behavior identical — the never-weakened
   guarantee).
5. **WP-5 the audit triage**: `bun audit` joined the AGENTS pre-ship
   discipline (periodic, NOT in the offline gate — the probe doctrine);
   the PAD known-issues ledger carries the triage (all 9 advisories
   dev-toolchain transitive; the no-mid-rotation-bump posture — a
   toolchain bump forces the standing pixel baselines' re-derivation,
   its own rotation).

## The TDD ledger

- RED birth: **14 failing** across the four touched batteries (auth +2,
  password-seam +3, auth-reset +4 re-anchors/new pins, rate-limit +6) —
  every failure for the right reason (the seam, the hash call sites, and
  the watermark did not exist).
- GREEN: the implementations above; three in-flight calibration fixes
  (the `computeWatermark` min-seed inversion — live buckets can never
  lower a min seeded at `now`; the integration tests' real-time `now`
  awareness — `rateLimit` mints buckets at `Date.now()`, so the band
  arithmetic rides `sweepRateLimits`' own param and dominant windows;
  the source-pin regex over the nested default-param parens).
- The mutation-proof: the env pin disabled → exactly 3 RED (the
  pre-retrofit acceptance + the regression pin + the honesty mirror) →
  restored → GREEN.

## The count ladder

UNIT 2347 → 2362 (+15) · SUITES 124 held · E2E 161 held · badge
2508 → 2523 · the line-census sites (schema.prisma 257 → 262 · seed.ts
516 → 540) — every live-tense site re-anchored in lockstep
(`count-ladder-164.py` + `skill-head-164.py`, assert-first, idempotent,
unique-anchor) and the pin carriers (docs-counts UNIT + the comment
ladder + the layer-axis pins → the s164 head · dialog-geometry CLAUDE
×4 + the 2347-form negatives).

## The docs

The AGENTS Session-164 section + the `bun audit` pre-ship line · the PAD
session-164 inventory row + the known-issues ledger row + the schema/seed
table rows · the SKILL v1.161.0 (the s164 head layer + §7.4's
hashed-at-rest + amortized-sweep facts + the live line counts) · this
session log · the plan (`docs/plans/2026-10-22-session164-test-isolation-
reset-hash-sweep.md`) · the worklog entry.

## The verification

lint 0/0 · tsc 0 · **124/2362** unit · build (29 routes) · e2e **161/161**
· probe:ref #137 STABLE · the six drift gates CLEAN ×6 · db census MATCH.

## The captures (393-396)

The round's subject surfaces, the seeded remediated codebase, the dev
server live: **393** the `/reset-password` invalid-link card at
390×844 (the public landing — no login) · **394** the set-password form
at 1440×900 (keyed on `?token=`) · **395/396** the settings Defaults
tab at phone + desktop — the hardened spec's own surface, captured
through the same visibility pre-wait the fix installed. Ours-only
surfaces this round (the reference's own reset flow is demo theater —
no page exists to pair against; the s163 fix-over-defect doctrine).
