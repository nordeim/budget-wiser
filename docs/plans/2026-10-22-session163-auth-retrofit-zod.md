# The session-163 plan — THE AUTH RETROFIT + THE ZOD LAYER (digma as reference)

Date: 2026-10-22 · Rotation: 163 ·
Task: retrofit proper auth mechanics + functionality onto neo-crm using
`https://github.com/nordeim/digma.git` as the reference/sample template,
evaluate + adopt the Zod validation layer, TDD throughout, then align every
relevant doc and push to `git@github.com:nordeim/neo-crm.git` (main only).

## 0. The audit that motivated this round (the gap register)

Both repos were re-pulled and their auth seams read file-by-file. The
comparison (digma = reference, neo-crm = host):

| # | Seam | digma (reference) | neo-crm (current) | Severity |
|---|------|-------------------|-------------------|----------|
| G1 | Session revocation | token `userId.tokenVersion.expiry.hmac`; `getSessionUser` evicts on version mismatch; reset bumps `tokenVersion` (S67-A) | token `b64url(JSON{uid,iat,exp}).hmac` — NO revocation dimension; every minted cookie lives its full 7-day TTL no matter what | **High** |
| G2 | Password reset flow | `POST /api/auth/forgot-password` + `POST /api/auth/reset-password`: no-enumeration 200, `randomBytes(32)` token, 60-min TTL, ATOMIC single-use consumption (`updateMany` with token+live-expiry in the WHERE), `tokenVersion` eviction, P2025-swallow + P2024/P2028→503 (S46/S64/S66/S76/S102/S124) | **Nothing** — the login card's "Forgot password?" swaps reset/sent views from pure client state; no network call fires (the reference app's own demo theater) | **High** |
| G3 | Login timing oracle | `timingEqualizerHash()` — the miss branch burns the SAME scrypt work against a throwaway constant (S72-C) | `!user || !verifyPassword(...)` short-circuits — unknown emails answer measurably faster | Medium |
| G4 | Rate-limit IP keying | LAST XFF hop + deploy-declared `DIGMA_PROXY_HOPS` depth; unparsable depth fails CLOSED to 1; short lists → "unknown" (S62-D/S69-A) | FIRST XFF hop — client-PREPENDABLE, so the 10/IP/15min brute-force budget is evadable by header rotation | **High** |
| G5 | Pure crypto seam | `src/lib/password.ts` (node:crypto ONLY) — the seed script and auth layer share one scrypt parameter set (S70-D) | `hashPassword` lives in `auth.ts` (transitively imports `next/headers` + Prisma), so `prisma/seed.ts` DUPLICATES the scrypt params — a drift in one silently breaks demo login in the other (already bitten once in digma's history) | Medium |
| G6 | Limiter memory hygiene | amortized eviction sweep behind a WeakMap watermark (S76-G) | O(n) `sweepRateLimits()` on every auth call | Low |
| G7 | Self-hosted delivery | register/resend return the OTP in-response (`DIGMA_DISABLE_IN_APP_OTP` knob); forgot returns `resetUrl` (`DIGMA_DISABLE_IN_APP_RESET` knob); the login card renders both hints (ADR-014 family) | OTP console-logged only (never in any response) — the e2e/demo workflow cannot complete a signup-driven flow programmatically | Medium |
| G8 | Validation layer | hand-rolled clamp/normalize seam (`src/lib/validation.ts`, 380 lines) | hand-rolled per-field guards (`asString`/`isBad*` family in `api.ts`) | — (see §Zod) |

## 1. The Zod feasibility evaluation (the honest finding)

**digma itself is Zod-free** — its validation seam (`src/lib/validation.ts`)
is hand-rolled clamps (`clampText`, `normalizeEmail`, `readBoundedJson`,
`resetTokenAlive`, …). The user-facing premise "using repo digma as reference
implementation for the Zod feature" therefore resolves to: **digma is the
architectural reference** (WHERE the validation seam lives — a dedicated
server-only module consumed by every route, pure and unit-testable), while the
family's actual Zod implementation lives in **zero-balance** (`zod ^4.6.5`:
`src/lib/validation.ts` schemas + `parseBody<S>()` in `src/lib/api-helpers.ts`
— declarative per-route schemas, field-level 400 messages, nothing reaches
Prisma unvalidated).

**Feasibility verdict: FEASIBLE and RECOMMENDED, incrementally.**

- Fit: neo-crm's 8 auth-family routes (6 existing + 2 new) each hand-roll the
  same email/password/code field guards — exactly the shape zero-balance's
  `registerSchema`/`loginSchema`/`verifyEmailSchema` family already encodes.
- Constraint: the envelope (`{ ok, data } | { ok, error: { code, message } }`)
  and the EXACT user-facing message strings are pinned by unit + e2e tests —
  the schemas must carry the same strings (zod `message:` per-rule), and the
  helper must map issues onto `ERR.BAD_REQUEST`-shaped envelopes.
- Risk: server-only dependency (route handlers) → zero client-bundle impact;
  zod 4 is ESM/tree-shakeable; the CRUD family (13 routes) is NOT migrated
  this round (documented adoption path — the `asString` family stays for
  them, no double-validation churn).
- Decision: `bun add zod@^4` (matching zero-balance's major), new
  `src/lib/schemas.ts` + `parseBody` in `api.ts`, retrofitted onto the auth
  family only.

## 2. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the pure password crypto seam (digma S70-D)
- NEW `src/lib/password.ts`: `hashPassword`, `verifyPassword` (moved
  verbatim from `auth.ts` — the `scrypt:salt:hash` format is pinned by 4
  unit tests + every seeded row), + `timingEqualizerHash` (lazy memoized),
  + `generateVerificationCode` (moved from `verification-server.ts`).
- `auth.ts` re-exports the trio (the routes' import surface survives).
- `prisma/seed.ts` imports the seam — the duplicated scrypt params die.
- RED: `tests/password-seam.test.ts` (round-trip, format, pure-import
  contract: the module imports NO next/prisma symbols).

### WP-2 — session revocation via tokenVersion (digma S67-A)
- Schema: `tokenVersion Int @default(0)` on `User`.
- `SessionPayload` gains `v`; `signSession(uid, tokenVersion?, now?)`;
  `verifySessionToken` rejects non-integer/negative `v`, accepts a MISSING
  `v` as `0` (pre-retrofit cookies of version-0 users survive — no forced
  fleet re-login); `getSessionUser` evicts on `user.tokenVersion !== v`.
- Login mints with the live `user.tokenVersion`.
- RED: `tests/auth.test.ts` additions (version round-trip, mismatch
  eviction, non-integer v rejected, missing v → 0).

### WP-3 — the forgot/reset flow (digma S46/S64/S66/S67-A/S76-A/S102-B/S124-A)
- Schema: `resetToken String?`, `resetTokenExpiresAt DateTime?`.
- `POST /api/auth/forgot-password` — `forgot:` bucket 10/15min, body
  pre-gate, zod email validation, the no-enumeration 200 (same body/message
  known+unknown), `randomBytes(32)` token, 60-min TTL, P2025-swallow +
  P2024/P2028→503, `resetUrl` in-response behind `NEO_DISABLE_IN_APP_RESET`.
- `POST /api/auth/reset-password` — `reset:` bucket 10/15min, token-first
  ordering, atomic `updateMany` conditional consumption (token + live expiry
  in WHERE; count 0 → invalid-token 400), password 8..200, `tokenVersion`
  increment, P2024/P2028→503.
- Client: `onSendResetLink` POSTs and swaps to sent on 2xx; the sent card
  renders the in-app `resetUrl` link when the field is a string (graceful
  degrade). NEW `/reset-password` page + `ResetPasswordScreen` (token via
  `?token=`, password+confirm, mismatch guard, success card → /login).
- RED: `tests/auth-reset.test.ts` (token lifecycle pure seams + route
  contract pins) + `tests/e2e/reset-password.spec.ts` (the digma spec's
  shape: own storageState opt-out, own XFF bucket, scratch account,
  full round-trip, old-password-dead + new-password-live).

### WP-4 — the login timing equalizer (digma S72-C)
- `timingEqualizerHash()` in `password.ts`; login's miss branch burns
  `verifyPassword(password, timingEqualizerHash())` before the 401.
- RED: contract pins (the burn exists on the miss branch; the 401 envelope
  byte-identical) — timing itself is not assertable portably.

### WP-5 — proxy-depth-aware client IP (digma S62-D/S69-A)
- `NEO_PROXY_HOPS`: unset → 1; 0 → direct exposure ("unknown"); N≥2 →
  Nth-from-last hop; unparsable/negative → fail CLOSED to 1.
- `clientKey(req)` re-keyed onto the LAST hop (single-value XFF — the e2e
  form — is unaffected: first == last).
- RED: rewrite `tests/rate-limit.test.ts`'s clientKey block first (last-hop,
  depth cases, short-list → unknown, x-real-ip only at depth ≥ 1).

### WP-6 — the Zod layer (zero-balance pattern, digma seam placement)
- `bun add zod@^4`.
- NEW `src/lib/schemas.ts`: `emailSchema` (trim/lower/max 160), `passwordSchema`
  (min 8), `loginSchema`, `signupSchema` (optional name ≤ 80), `verifySchema`
  (email + 6-digit), `resendSchema`, `forgotPasswordSchema`,
  `resetPasswordSchema` (`reset_token` + `new_password` 8..200) — every
  message EXACTLY the current route strings.
- `parseBody<S>(req, schema)` in `api.ts`: declared-size pre-gate → JSON
  parse → `safeParse` → first-issue message onto the BAD_REQUEST envelope.
- Retrofit the 8 auth routes; signup additionally returns
  `verificationCode` behind `NEO_DISABLE_IN_APP_OTP` (digma's ADR-014 —
  this is also what makes the e2e scratch flow possible), resend mirrors it.
- RED: `tests/schemas.test.ts` (accept/reject matrices, exact messages,
  boundary lengths) + `tests/parse-body.test.ts` (bad JSON, oversize,
  issue-mapping, passthrough of parsed data).

### WP-7 — amortized limiter sweep (digma S76-G) — STRETCH
- Watermark-gated sweep INSIDE `rateLimit` (signature unchanged);
  `sweepRateLimits()` stays exported (tests pin it) and becomes idempotent
  hygiene. Lands only if the gate stays clean; else deferred with a note.

### WP-8 — docs alignment (the count-ladder lockstep)
- `prisma/schema.prisma` (new fields, commented), `.env.example`
  (+`NEO_PROXY_HOPS`, +`NEO_DISABLE_IN_APP_OTP`, +`NEO_DISABLE_IN_APP_RESET`).
- AGENTS.md (commands table counts, the auth architecture-facts bullet,
  Session-163 section), CLAUDE.md (×4 count sites), README.md (badge, file
  tree, commands), `neo-crm_SKILL.md` (auth mechanics sections, env table,
  dep table, Appendix B totals, version bump), PAD (schema tables, route
  inventory 27→29, security section, session row).
- `tests/docs-counts.test.ts` + the dialog-geometry lockstep carriers
  re-anchored onto the new counts (UNIT/SUITES/E2E/badge).
- `docs/session_347.md` (the session log) + this plan's execution record +
  the worklog entry.

### WP-9 — the verification gate + the push
- `bun run gate` (lint 0/0 → tsc 0 → unit → build → e2e) — no hosted CI,
  the local gate is the only gate.
- Conventional commit on `main` (no new branches), then the SSH wrapper:
  key → 0600 `/tmp` file → `--dry-run` → real push with
  `--remote git@github.com:nordeim/neo-crm.git` → remote-ref verification →
  shred the operator key.

## 3. Test-budget arithmetic (the e2e limiter constraint)

Per-IP/15min: login 10 · signup 10 · resend 5 · verify 20 · NEW forgot 10 ·
NEW reset 10. The reset spec opts out of the shared storageState and declares
its own XFF identity (single-value — unaffected by the last-hop re-key), so
its calls (signup 1 + verify 1 + forgot 1 + reset 1 + old-login 1 +
new-login 1 + one invalid-token reset 1) live in a fresh bucket and never
touch the demo budget. The demo login (setup project, 1 call) is unchanged.

## 4. Risk register

| Risk | Mitigation |
|------|------------|
| Cookie format change breaks the 2271-check suite | additive `v` field; missing-`v` reads as 0; every existing token test re-run in the RED phase |
| Message drift breaks pinned e2e/unit strings | zod schemas carry the exact current strings; accept/reject matrices pin them |
| Resetting the DEMO user mid-e2e evicts the shared storageState | the round-trip runs on a DEDICATED scratch account (digma S67-A's own lesson) |
| Schema change orphans seeded ids | `db push` is additive (3 new columns); the seed's upsert-by-email id-stability contract is untouched |
| Docs counts re-stale | the docs-counts pins are updated in the SAME commit; the gate fails otherwise |
| ssh binary absent in the push environment | wrapper preflight exits 1 with the runbook pointer — provision openssh-client or the paramiko shim BEFORE the push step |
