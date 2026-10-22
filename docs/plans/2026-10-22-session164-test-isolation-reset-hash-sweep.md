# The session-164 plan — THE TEST-ISOLATION CURE + THE RESET-TOKEN HASH + THE AMORTIZED SWEEP

Date: 2026-10-22 · Rotation: 164 ·
Task: audit + validate the session-163 ship (the auth retrofit + the Zod
layer), remediate the findings TDD-first, align every doc, capture the
screenshots, and push to `git@github.com:nordeim/neo-crm.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `53089dd` (post-pull, workspace env refreshed: `bunx
prisma generate` — the pull brought session-163's schema but the local
generated client predates it):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN (after the client regen — workspace-only, no code defect) |
| unit | **RED 2346/2347** — the ambient-env test-isolation defect (F-164a) |
| build | GREEN (29 routes) |
| e2e | **RED 160/161** — one load-flake (F-164b) |
| probe:ref #137 | STABLE at the s147-s155 fingerprint — no parity event |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| sitemap + robots | 11 routes / 200 — standing |

The findings, severity-ranked (every claim reproduced live):

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-164a | **The hand-signed session battery is ambient-env-dependent**: `@prisma/client`'s module init auto-loads the repo `.env` into `process.env`, so any workspace whose `.env` carries a ≥16-char `AUTH_SECRET` flips `secret()` off the DEV fallback the tests hard-code — the pre-retrofit acceptance test FAILS (the baseline RED), and the three sibling rejection tests (non-integer/fractional/negative `v`) pass **VACUOUSLY** (the signature gate rejects before the version shape guard ever runs — they do not test what they claim). A fresh clone following the documented first-run setup hits this on its first `bun run test`. Bisected live: `@/lib/password` UNSET → `@/lib/db-path` UNSET → `@/lib/db` SET → the Prisma client import is the loader. | `tests/auth.test.ts` (session-163 describe) + `src/lib/auth.ts` `secret()` | **High** | Verified |
| F-164b | The e2e settings Defaults spec measures `boundingBox()` immediately after the card's `toBeVisible()` — under full-suite load the label subtree can be unrendered at read time (1-in-1 full-suite failure here; 3/3 green isolated — the s158 starved-read class). | `tests/e2e/crm.spec.ts` "single-column layout" | Medium | Verified |
| F-164c | **Reset tokens stored PLAINTEXT**: the web-app-foundation skill's §12 checklist requires "verification + reset tokens stored hashed" — and neo-crm is internally inconsistent (the verification CODE is scrypt-hashed; the reset TOKEN is not). digma parity is not the bar: the repo's own distilled companion skill is. A DB read compromise mints live reset URLs for every pending row. | `src/app/api/auth/forgot-password/route.ts` (the `user.update`), `reset-password/route.ts` (both lookups) | Medium | Verified |
| F-164d | The **amortized limiter sweep** (digma S76-G — the watermark-gated sweep) was session-163's WP-7 STRETCH, deferred without the documented note; `sweepRateLimits()` stays O(n) on every auth-route call (the rotated-key O(n²) burst family digma cured). | `src/lib/rate-limit.ts` | Low | Verified |
| F-164e | `bun audit` is absent from the documented discipline (the skill's §14 gate order includes it). Current state: 9 advisories (4 high / 4 moderate / 1 low), ALL in the dev/build toolchain (braces via eslint-config-next · deepmerge-ts via the prisma CLI config · vite via vitest · source-map-js via postcss) — zero runtime request-path exposure. Triage undocumented. | tooling/docs | Low | Verified |

Out of scope this round (documented, not silently dropped): dependency
bumps for the audit advisories — a toolchain bump (postcss/tailwind/vite
family) risks the standing pixel baselines; the drift-gate re-derivation
that a bump forces is its own rotation. The runtime-clean triage is the
deliverable.

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the ambient-env test-isolation cure (F-164a, the baseline RED)
- RED: `tests/auth.test.ts` gains a session-164 describe — the
  env-pinning contract: with `process.env.AUTH_SECRET` forced to a long
  fake value (the ambient condition the Prisma import creates), a
  DEV-secret-signed pre-retrofit token STILL verifies as `v=0`; the
  hand-signed rejection tests still reject for the VERSION reason (the
  battery must be honest, not vacuously green).
- GREEN: `beforeEach`/`afterEach` env save/delete/restore scoped to the
  hand-signed battery (delete AUTH_SECRET for the hand-signed
  constructions; restore after). The round-trip tests stay
  secret-agnostic (both sides call `secret()`).
- The root cause documented in-file: the `@prisma/client` .env auto-load
  note (the L-164c1 lesson — a test that hard-codes a fallback constant
  inherits every ambient env leak of its import graph).

### WP-2 — the reset-token hash (F-164c, the skill §12 compliance)
- RED: `tests/password-seam.test.ts` — the `hashResetToken` seam
  (SHA-256 hex: deterministic; distinct tokens → distinct hashes; format
  stability). A FAST hash is correct for a 32-byte crypto-random token
  (256-bit entropy — no brute-force surface; scrypt would burn ~100ms
  per lookup for zero security gain — the code-vs-token asymmetry: the
  CODE is user-chosen 6-digit entropy so it needs the slow hash).
- RED: `tests/auth-reset.test.ts` re-anchors + new pins — the forgot
  route STORES `resetToken: hashResetToken(token)`; the reset route's
  `findFirst` AND the atomic `updateMany` WHERE key on the HASH; the
  in-app `resetUrl` keeps the RAW token (the delivery is unchanged);
  the schema comment documents hashed-at-rest.
- GREEN: `hashResetToken` joins the pure seam; both routes re-key onto
  it; `prisma/schema.prisma` comment re-anchored.
- Migration note (documented): a pending PLAINTEXT token at swap time
  becomes unfindable and simply ages out of its 60-min TTL — the
  dev/demo posture, no fleet impact.
- Seed hygiene companion: the seed's user upserts CLEAR the reset funnel
  (`resetToken: null`, `resetTokenExpiresAt: null`) — the same posture
  the update blocks already apply to the verification fields
  (`verificationCodeHash: null`); a stale pending token otherwise
  survives re-seeds. `tokenVersion` deliberately NOT reset (no demo
  session eviction — the sweep-state contract).

### WP-3 — the e2e starved-read hardening (F-164b)
- The settings Defaults spec gains visibility pre-waits before the two
  `boundingBox()` reads (`await expect(...).toBeVisible()` on each
  label). E2E count held (161) — hardening, not new coverage.

### WP-4 — the amortized sweep port (F-164d, digma S76-G)
- RED: `tests/rate-limit.test.ts` — the `computeWatermark` pure seam
  (empty map → now; live-only min; expired excluded) + the amortization
  observable (`sweepRateLimits` RETURNS the swept count; an immediate
  second call sweeps 0 — the watermark holds; the earliest live expiry
  crossing re-opens the sweep) + the O(1)-until-crossing source pin.
- GREEN: a module-level watermark inside `sweepRateLimits` (the digma
  S76-G construction adapted to the module Map form); `rateLimit`'s
  lazy per-key reset unchanged; the return type widens void → number
  (additive — every route call site ignores it).
- The deferred-WP-7 note lands in the docs (the s163 plan's own
  "deferred with a note" clause finally honored).

### WP-5 — the audit triage documented (F-164e)
- AGENTS: the pre-ship checklist gains the `bun audit` step (periodic,
  NOT in the offline gate — the probe doctrine: the gate must stay
  offline-runnable).
- PAD: the known-issues ledger row — the 9 advisories triaged
  dev-toolchain-only, the no-mid-rotation-bump posture, the
  bump-requires-baseline-re-derivation rule.

### WP-6 — the count ladder + docs realignment
- Every live-tense site re-anchored in lockstep (UNIT +N · SUITES 124
  held · E2E 161 held · badge) — README, AGENTS (commands table +
  Session-164 section), CLAUDE carriers, PAD (session row + ledger),
  SKILL v1.161.0 (the s164 head layer + the lessons + Appendix B), the
  docs-counts pin carriers, `docs/session_349.md`, this plan's
  execution record, the worklog entry.

### WP-7 — the verification chain + the captures + the push
- `bun run gate` full (lint → tsc → unit → build → e2e) — no hosted CI,
  the local gate is the only gate.
- The six drift gates CLEAN ×6 (the four viewport sweeps + the fullpage
  + the census at --parallel 4; the sweep family rides the s162
  cross-process state file — ONE login per chain).
- The captures (393+): the round's subject surfaces — the
  /reset-password landing pair + the settings Defaults pair, phone +
  desktop, saved under `docs/screenshots/`.
- The push: conventional commit on `main` (no new branches), then the
  field-tested SSH wrapper sequence — key → 0600 `/tmp` file → the
  paramiko shim on PATH (`/home/z/my-project/bin/ssh`) → `--dry-run`
  → the real push with `--remote git@github.com:nordeim/neo-crm.git`
  → remote-ref verification → shred the operator key.

## 2. Risk register

| Risk | Mitigation |
|------|------------|
| The env-pinning hooks leak state across the file's tests | save/restore in afterEach; the round-trip tests are secret-agnostic (verified by reasoning + the full-suite run) |
| The token hash breaks the e2e round-trip | the URL carries the RAW token end-to-end; only the DB keys change — the e2e spec is untouched and must stay green |
| The watermark gate starves a real sweep | the watermark is the MIN live expiry — the sweep re-opens exactly when the earliest bucket dies (pinned by test) |
| The docs-counts census trips mid-ladder | the count sites flip atomically in one pass, the docs-counts test re-run in the same step |
| A dep bump sneaks in with the audit work | zero package.json changes this round — the triage is documentation only |

## 3. The execution record (2026-10-22)

Executed as planned, TDD throughout. The RED ledger: **14 failing at
birth** (auth +2 · password-seam +3 · auth-reset +4 · rate-limit +6 —
wait: the auth battery's own baseline RED was the pre-retrofit
acceptance test, already failing before any edit; the new-birth REDs
were the 14) → GREEN with three in-flight calibration fixes (the
`computeWatermark` min-seed inversion; the integration tests'
real-time-`now` awareness — `rateLimit` mints buckets at `Date.now()`,
so the band arithmetic rides `sweepRateLimits`' own param with dominant
windows; the source-pin regex over the nested default-param parens).
The mutation-proof: the env pin disabled → exactly 3 RED.

The verification: lint 0/0 · tsc 0 · **124/2362** unit · build (29
routes) · e2e **161/161** · probe:ref #137 STABLE · the six drift gates
CLEAN ×6 · db census MATCH. The count ladder: UNIT 2347 → 2362 (+15) ·
SUITES 124 held · E2E 161 held · badge 2508 → 2523 · schema 257 → 262 ·
seed 516 → 540. The docs: the AGENTS Session-164 section + the audit
pre-ship line · the PAD session-164 row + the known-issues ledger row ·
the SKILL v1.161.0 + the s164 head layer · session_349.md · the worklog
entry · this record.
