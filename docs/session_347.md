# Session 347 — THE AUTH RETROFIT + THE ZOD LAYER (session-163, the digma-reference port)

Date: 2026-10-22 · Rotation: 163 · Operator task: retrofit proper auth
mechanics + functionality onto neo-crm using `https://github.com/nordeim/digma.git`
as the reference/sample template; evaluate + adopt the Zod feature; TDD;
align the docs; push to `git@github.com:nordeim/neo-crm.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

## The audit (the gap register)

Both repos re-pulled and their auth seams read file-by-file. The gaps,
severity-ranked:

| # | Gap | digma reference | Severity |
|---|-----|-----------------|----------|
| G1 | No session revocation — the token carried no version dimension | S67-A `tokenVersion` | High |
| G2 | NO password-reset flow — the login card's "Forgot password?" was CLIENT-SIDE THEATER since s11 (no network call) | S46/S64/S66/S76-A/S102-B/S124-A | High |
| G3 | Login timing oracle — the miss branch short-circuited the scrypt | S72-C `timingEqualizerHash` | Medium |
| G4 | FIRST-hop XFF trust — the limiter key was client-suppliable | S62-D/S69-A last-hop + declared depth | High |
| G5 | The seed script DUPLICATED the scrypt parameter set | S70-D the pure `password.ts` seam | Medium |
| G7 | OTP console-logged only (no in-response delivery) | ADR-014 the in-app delivery family | Medium |

## The Zod feasibility evaluation (the honest finding)

**digma itself is Zod-free** — its validation seam (`src/lib/validation.ts`)
is hand-rolled clamps. The family's actual Zod reference is **zero-balance**
(zod ^4.6.5: `src/lib/validation.ts` schemas + `parseBody<S>()`). The
resolution: digma is the ARCHITECTURAL reference (where the seam lives), 
zero-balance the PATTERN donor (declarative per-route schemas, field-level
messages). Verdict: **FEASIBLE + RECOMMENDED incrementally** — the auth
family (the routes this retrofit touches anyway) migrated this session; the
CRUD family keeps the `asString` guards (the documented adoption path).
Server-only dependency → zero client-bundle impact.

## The implementation (TDD — every work package RED first)

1. **WP-1 the pure password seam**: `src/lib/password.ts` (node:crypto
   only) — `hashPassword`/`verifyPassword` moved, `timingEqualizerHash` +
   `generateVerifyCode` joined; `auth.ts` re-exports; `seed.ts` imports the
   seam (the duplicated params die).
2. **WP-2 the revocation dimension**: `SessionPayload` gains `v`;
   `signSession(uid, tokenVersion = 0, now)`; the parse rejects
   non-integer/fractional/negative `v`; a MISSING `v` reads as 0 (no forced
   fleet re-login); `getSessionUser` evicts on version mismatch; login and
   verify mint with the live row's version.
3. **WP-3 the reset funnel**: `resetToken`/`resetTokenExpiresAt` columns;
   `POST /api/auth/forgot-password` (the no-enumeration 200 verbatim,
   `randomBytes(32)`, 60-min TTL, the RELATIVE `resetUrl` behind
   `NEO_DISABLE_IN_APP_RESET`, P2025-swallow + P2024/P2028→503) and
   `POST /api/auth/reset-password` (token-first ordering, the ATOMIC
   conditional `updateMany` consumption — count 0 → the invalid-token 400 —
   `tokenVersion` increment, single-use clearing); the login card's
   `onSendResetLink` wired to the real endpoint (the theater retired); the
   sent card renders the in-app link when present; the `/reset-password`
   landing page (invalid-link card vs set-password form, keyed on `?token=`).
4. **WP-4 the timing equalizer**: the login miss branch burns
   `verifyPassword(password, timingEqualizerHash())`; the 401 envelope
   stays byte-identical.
5. **WP-5 the proxy-depth IP**: `clientKey` re-keys onto the LAST XFF hop;
   `NEO_PROXY_HOPS` (unset=1 · 0=direct/"unknown" · N≥2 Nth-from-last ·
   unparsable fails CLOSED); single-value headers (the e2e isolation form)
   unaffected.
6. **WP-6 the Zod layer**: `zod ^4.6.7`; `src/lib/schemas.ts` (every
   message the current route string — zero drift; the N-63i 160-cap rides
   the login schema; >160 now REJECTS honestly where asString truncated
   silently); `parseBody()` composes the declared-size pre-gate + safeParse
   + the first-issue → BAD_REQUEST envelope; signup/resend answer
   `verificationCode` behind `NEO_DISABLE_IN_APP_OTP` (the ADR-014 port —
   also what makes the e2e scratch funnel possible); the verify view
   renders the demo code hint when present.

## The TDD ledger

- RED birth: **31 failing** across the six new/extended unit batteries
  (password-seam, schemas, parse-body, auth-reset, auth versioning,
  rate-limit depth) — every failure for the right reason (the modules and
  routes did not exist).
- GREEN: the implementation above; three real defects caught by the tests
  on the way (the dropped `timingSafeEqual` import in the seam extraction;
  two over-specific source pins recalibrated).
- The collateral re-anchors: api-robustness S38-P1/S39-P4 (the name
  contract moved onto the schema), auth-contract S67-P2 (the pre-gate
  composed into parseBody), dead-code-hygiene N-62a (deps 19→20 with zod)
  + N-63i (the 160 family rides the schema), route-case N-66e (the token
  read joins the from_url exclusion class), the space-y census 20 files/
  114 → 21/117, the login-family e2e carrier 153→161.
- e2e: `tests/e2e/reset-password.spec.ts` NEW +8 — the landing cards, the
  form guards, the invalid-token alert, the FULL ROUND-TRIP on a dedicated
  scratch account (its own XFF bucket; signup → verify through the in-app
  OTP → forgot → the sent card carries the link → reset → the old password
  dead → the new password live → /me resolves), and the BEHAVIORAL
  EVICTION pin (a pre-reset session dies at the version comparison; the
  consumed token's replay answers 400).

## The verification

lint 0/0 · tsc 0 · **124/2347** unit (the full gate) · build (29 routes,
`/reset-password` live) · e2e **161/161** (the reset round-trip + the
eviction green on the first run).

## The count ladder

UNIT 2271 → 2347 (+76) · SUITES 120 → 124 · E2E 153 → 161 (+8) · badge
2424 → 2508 · routes 27 → 29 files / 39 → 41 handlers — every live-tense
site re-anchored in lockstep (README ×6 + Tested row + badge · AGENTS ×3 +
the auth bullet + the Session-163 section · CLAUDE ×6 · PAD ×8 + ADR-003 +
the inventory row · SKILL v1.160.0 + the s163 head layer + §7.4 + the dep
list + Appendix B) and the pin carriers (docs-counts UNIT/E2E/SUITES/
layer-axis/Appendix-B · dialog-geometry CLAUDE ×4 + the space-y census ·
login-family e2e 153→161).

## The docs

`.env.example` (+`NEO_PROXY_HOPS` +`NEO_DISABLE_IN_APP_OTP`
+`NEO_DISABLE_IN_APP_RESET`), the schema comments, this session log, the
plan (`docs/plans/2026-10-22-session163-auth-retrofit-zod.md`), the AGENTS
Session-163 section, the PAD ADR-003 + inventory row, the SKILL sections,
and the worklog entry.
