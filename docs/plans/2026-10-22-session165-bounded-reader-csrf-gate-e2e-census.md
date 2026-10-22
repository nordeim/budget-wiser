# The session-165 plan — THE BOUNDED-READER PORT + THE CONTENT-TYPE CSRF GATE + THE E2E-CENSUS DOCTRINE

Date: 2026-10-22 · Rotation: 165 ·
Task: audit + validate the session-164 ship (the test-isolation cure +
the reset-token hash + the amortized sweep), remediate the findings
TDD-first, align every doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `021fb74` (post-pull; the workspace env standing —
`.env` carries the 64-char AUTH_SECRET that F-164a's cure now pins
against; `bunx prisma generate` re-run out of caution):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **124/2362** (the s164 cure holds in the ambient workspace) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** |
| probe:ref #138 | STABLE at the s147-s155 fingerprint (index-n8TZHw0K.js, md5 46bc2d9c…) — no parity event |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| sitemap + robots | 11 routes / 200 — standing |
| operator checklist | mobile drawer e2e GREEN · Tailwind v4 pins GREEN · `.env` DATABASE_URL `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current |

The findings, severity-ranked (every claim reproduced live):

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-165a | **The content-type CSRF gate is absent at every JSON parse site**: `req.json()` parses regardless of Content-Type, so a cross-site `<form method="POST" enctype="text/plain">` posting a JSON-shaped body reaches the auth family's cookie-MINTING POSTs (login/signup/verify) — the login-CSRF class. SameSite=Lax gates cookie SENDING on cross-site POSTs, never cookie SETTING (the exact asymmetry digma's S148-A documents). digma closed it at its own seam (the `readBoundedJson` content-type gate); the web-app-foundation skill §7.2 requires "reject non-JSON content types on mutating routes". First-party census (lead-verified): every JSON body consumer — the store's `call()` seam, the five login-card fetches, the reset screen, the e2e in-page fetches, Playwright's object-data default, the sweep's UI-form login — already sends `application/json`; the gate lands with ZERO first-party breakage. | `src/lib/api.ts` parseBody + the 13 CRUD `req.json()` sites | Medium | Verified |
| F-165b | **The chunked-body bypass**: `isBodyTooLarge` checks only the DECLARED Content-Length; a `Transfer-Encoding: chunked` request carries none, so the 16KB cap passes and `req.json()` buffers the whole body unbounded (digma S75-B's exact finding, closed there with the stream counter; the skill §7.2: "count streamed chunks"). api.ts's own comment documents the gap as an accepted backstop ("a chunked body without a Content-Length header bypasses this check") — the digma port retires it. | `src/lib/api.ts` isBodyTooLarge + the 14 parse sites | Medium | Verified |
| F-165c | **The mobile-nav e2e-count carriers**: `MOBILE_NAV_E2E = 11` and its SEVEN pinned doc sites (README Tested-row phrase + testing-section phrase · PAD suite line + census-table row · CLAUDE pyramid site · AGENTS architecture-facts spec line · SKILL §5.4 spec line) + the Appendix B live-tense row all carry **11 for a 10-test spec** — the s147 miscount (git-verified: landing.spec gained the round's +1 e2e while the mobile-nav constant got the bump; the spec has carried exactly 10 `test(` declarations since s104, through s147's pure drawer→sheet renames). No live-census pin exists on this axis — the pin family checks doc-consistency with the CONSTANT, never the constant against the spec file (the schema.prisma/seed.ts LIVE-CENSUS precedent). | `tests/docs-counts.test.ts:607` + 7 doc sites | Low | Verified |
| F-165d | **The Appendix B e2e per-suite rows drifted while the total stayed pinned**: landing row 12 (live 14 — the s147 +1 and a later +1 never landed in the table), crm row 111 (live 112 — stale since at least s147), and the reset-password spec (8 checks, born s163) is ABSENT from the Test Inventory table entirely. The F-107a1 genus recurring on the e2e axis: the totals were re-anchored at s163 but the rows were not; the doctrine note's "session-12 snapshot" umbrella mislabels the e2e rows' actual mixed vintage (the landing row did not exist at s12 — landing.spec was born s142). | `neo-crm_SKILL.md` Appendix B | Low | Verified |
| F-165e | **PAD's route-census carriers stale**: §6.1 row 1 "grep-verified across all 27 files" (live 29 route files); the ADR-004 context "All 39 API handlers" (live 41 — the SAME paragraph's own parenthetical carries the live "29 route files / 41 verb handlers, the count the audit censuses carry"). | `Project_Architecture_Document.md:627`, `:170` | Low | Verified |
| F-165f | **SKILL stale live-tense spots**: §3.3 "Environment variables (3 — count them, 3)" (live 6 — the three s163 knobs NEO_PROXY_HOPS / NEO_DISABLE_IN_APP_OTP / NEO_DISABLE_IN_APP_RESET absent from the table); §11's pre-ship gate block "65/65" unit / "20/20" e2e (era-s12; live 2362/161); §14's "no schema library by design" (contradicts the s163 Zod layer the SKILL's own head layer records — the auth family moved to the Zod seam; the CRUD family keeps asString as the documented incremental path). | `neo-crm_SKILL.md:188`, `:769-771`, `:849` | Low | Verified |
| F-165g | **ADR-014 (the in-app OTP/reset delivery knobs) is referenced but never written**: the s163 records cite "THE ADR-014 IN-APP DELIVERIES" (the PAD §7.1 session row + the SKILL head layer) while PAD §1.3's ADR list and SKILL Appendix A's index stop at ADR-007 — the only referenced-but-never-written ADR. | PAD §1.3 + SKILL Appendix A | Low | Verified |

Out of scope this round (documented, not silently dropped): the
CRUD-family Zod migration — the documented incremental path (the
schemas.ts seam comment: "the schemas are the seam future routes
adopt"); a 13-route × zero-message-drift surface is its own rotation.
Dependency bumps for the 9 dev-toolchain advisories — the
no-mid-rotation-bump posture (PAD §10 ledger; a toolchain bump forces
the standing pixel baselines' re-derivation). RBAC — the
single-workspace Open ledger row.

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — `readBoundedJson` (the digma S148-A + S75-B port) [F-165a + F-165b]
- RED: `tests/bounded-reader.test.ts` NEW — the seam's contract battery:
  the content-type gate (a `text/plain` body carrying VALID JSON →
  unparseable-by-policy, `value: null`; `application/json` +
  `; charset=utf-8` tolerated; case-insensitive; an absent content-type
  → null — the body-less GET-shaped case never reaches these sites but
  the seam stays honest); the declared fast path (Content-Length over
  `MAX_AUTH_BODY_BYTES` → `tooLarge: true` — the N-67d contract
  unchanged); **the stream counter** (a body WITHOUT Content-Length —
  the chunked family — over the cap → `tooLarge: true`, rejected
  mid-read; under the cap → parsed); the decode+parse tail (valid JSON
  → the value; garbage → null); the 16KB ceiling stays the auth
  family's own constant (not digma's 32MB — the honest bodies are
  tiny).
- RED: `tests/parse-body.test.ts` +2 — parseBody composes the seam: a
  `text/plain` request carrying a VALID login body → 400 "Invalid
  request body" (the CSRF-class pin); a `text/plain` body NEVER reaches
  the schema (the parse seam rejects by policy before safeParse).
- RED: `tests/body-pregate.test.ts` re-anchors — the 13 sessioned
  sites' pins flip from the `isBodyTooLarge(req)` + `req.json()` form
  to the `readBoundedJson` seam form, ORDERING-aware exactly as before
  (the seam call before any DB work — the F-69a3 cheap-rejection
  contract preserved; the "Request body too large" + "Invalid request
  body" 400 forms preserved verbatim).
- GREEN: `src/lib/api.ts` gains `readBoundedJson` (the digma
  construction adapted: the content-type gate FIRST — the stream
  cancelled; the declared fast path; the body-less pass-through; the
  stream counter with mid-read cancel; the merged-decode parse tail
  with the null-on-unparseable contract). `parseBody` consumes it; the
  13 CRUD route sites swap their two-line pattern for the seam's
  three-line form. `isBodyTooLarge` stays exported (parseBody's
  documented pre-gate lineage + the upload route's own gate) — the
  seam composes it rather than replacing it.
- e2e: `tests/e2e/auth.spec.ts`'s API-level trio gains a FOURTH probe
  (+1 check): POST `/api/auth/login` with Content-Type `text/plain`
  and a valid JSON body → 400 "Invalid request body" — the login-CSRF
  gate's live pin. E2E 161 → 162.

### WP-2 — the mobile-nav count cure + the e2e live-census doctrine [F-165c + F-165d]
- RED: `tests/docs-counts.test.ts` — **the LIVE-CENSUS pin on the e2e
  axis** (the schema.prisma/seed.ts precedent extended): read
  `tests/e2e/mobile-navigation.spec.ts`, count the `^\s*test\(`
  declarations, assert the count equals `MOBILE_NAV_E2E`. RED at birth
  (11 ≠ 10) — the root-cause cure: the constant can never again drift
  from the spec file it claims to census.
- GREEN: `MOBILE_NAV_E2E` 11 → 10 + the SEVEN doc-site carriers flip
  (README ×2 · PAD ×2 · CLAUDE ×1 · AGENTS ×1 · SKILL ×1) + the
  Appendix B mobile-nav row (rides the constant's existing pin) + the
  retired 11-check-form negatives join the 9-check negatives (the
  convention).
- RED: the Appendix B **e2e per-suite row census pins** — every e2e
  row's check count read live from its spec file (10 files, one
  `test(`-count each) and asserted against the table row. RED at birth
  (landing 12≠14 · crm 111≠112 · the reset-password row absent).
- GREEN: the rows re-censused (landing 14 · auth 11 · crm 112 ·
  mobile-nav 10 · the five 1-check walks · **the NEW reset-password
  row 8**); the doctrine note narrows the "session-12 snapshot"
  umbrella to the unit rows and declares the e2e rows live-tense
  (they are only 10 — all pinned); the stale-form negatives (the
  retired 12-landing / 111-crm forms never return).

### WP-3 — the stale PAD/SKILL carriers + the ADR-014 entry [F-165e + F-165f + F-165g]
- PAD §6.1 row 1: "27 files" → 29 (the grep-verified claim re-verified
  live across the 29 route files).
- PAD ADR-004 context: "All 39 API handlers" → 41.
- SKILL §3.3: the env-var table grows the three s163 knobs (6 — count
  them, 6); the header count re-anchored.
- SKILL §11's gate block: 65/65 → the live unit form; 20/20 → the live
  e2e form (the block's own "the counts are pinned under the unit
  gate" doctrine — a stale count in the PRE-SHIP CHECKLIST is the
  worst possible stale site).
- SKILL §14: "no schema library by design" → the s163 reality (the
  auth family's Zod seam at schemas.ts/parseBody; the CRUD family's
  documented incremental path).
- PAD §1.3 + SKILL Appendix A: **the ADR-014 entry** (Context: the
  self-hosted demo posture ships in-app deliveries — signup/resend
  answer verificationCode, forgot answers resetUrl; Decision: both
  behind NEO_DISABLE_IN_APP_OTP / NEO_DISABLE_IN_APP_RESET so a real
  mail transport deployment knobs them off; Rationale: the
  no-enumeration 200 is unchanged either way — the demo UX stays
  honest while production closes the channel; Consequences: the env
  contract grows two knobs — §3.3's table carries them).
- Pins: every touched live-tense site joins the docs-counts pin family
  (the F-99a1 doctrine — an unpinned site re-stales).

### WP-4 — the count ladder + the docs lockstep
- The ladder (estimated): UNIT 2362 → ~2385 · SUITES 124 → 125 (the
  bounded-reader suite) · E2E 161 → 162 · badge 2523 → ~2547 — every
  live-tense site re-anchored in lockstep via the count-ladder script
  convention (assert-first, idempotent, unique-anchor; the
  historicals preserved).
- The SKILL v1.161.0 → v1.162.0 + the s165 head layer + §7.4's
  bounded-reader facts + the Appendix B re-census; the AGENTS
  Session-165 section; the PAD session-165 row + the carrier fixes;
  `docs/session_351.md`; this plan's execution record; the worklog
  entry.

### WP-5 — the verification chain + the captures + the push
- `bun run gate` full (lint → tsc → unit → build → e2e) — no hosted CI,
  the local gate is the only gate.
- The six drift gates CLEAN ×6 (the four viewport sweeps + the fullpage
  + the census at --parallel 4; the sweep family rides the s162
  cross-process state file — ONE login per chain).
- `bun audit` re-run (the pre-ship discipline; the triage posture
  unchanged — dev-toolchain transitive only).
- The captures (397+): the round's subject surfaces — the login card +
  the reset-password landing pair at phone + desktop (the auth-family
  surfaces the bounded reader hardens), the seeded remediated
  codebase, the dev server live, saved under `docs/screenshots/`.
- The push: conventional commit on `main` (no new branches), then the
  field-tested SSH wrapper sequence — key → 0600 `/tmp` file → the
  paramiko shim on PATH → `--dry-run` → the real push with
  `--remote git@github.com:nordeim/neo-crm.git` → remote-ref
  verification → shred the operator key.

## 2. Risk register

| Risk | Mitigation |
|------|------------|
| The content-type gate breaks a first-party consumer | the lead-verified census: every JSON consumer already sends application/json (the call() seam, the login-card fetches, the reset screen, the e2e object-data + in-page fetch headers, the sweep's UI-form login); the full e2e suite is the backstop |
| The stream counter changes parse behavior for honest bodies | the tail keeps the null-on-unparseable contract; the merged-decode path is byte-identical to req.json() for every parseable body; the parse-body + coercion-guards suites re-run in the unit gate |
| A JSON body of literal `null` now answers "Invalid request body" instead of a zod type-error message | the value-null union is the digma-documented contract (unparseable-by-policy); no unit or e2e pin exists on the bare-null body; the new pins document the behavior |
| The 13-route swap breaks the F-69a3 cheap-rejection ordering | the body-pregate pins are ORDERING-aware and re-anchor to the seam form; the gate-before-DB assertion preserved verbatim |
| The count-ladder census trips mid-ladder | the sites flip atomically in one pass; docs-counts re-run in the same step; the Appendix B row census lands WITH the row flips |
| The six drift gates drift from the route-source changes | zero UI-surface changes this round (the seam is request-layer only); the standing baselines re-verified in WP-5 |

## 3. The execution record (2026-10-22)

Executed as planned, TDD throughout. The RED ledger: **20 failing at
birth** (bounded-reader 11 · parse-body +2 · the body-pregate seam
re-anchors · the docs-counts live-census pair) → GREEN with three
in-flight calibration fixes (the users route's divergent "Invalid JSON
body" message caught by the message-preservation pin before it could
be normalized mid-port; the CSRF probe's own XFF rate-limit bucket —
the login route buckets BEFORE it parses; the PAD HEAD pin itself
carried the stale 9-spec form and rode the re-anchor). **The
vacuous-pin catch**: the row-census pin's first draft rode a
`new RegExp` template whose `\|` escapes collapsed to alternation —
the pin matched EVERYTHING; caught live by the arithmetic not adding
up, replaced with the toContain filename-cell form, mutation-proven
(planted 12 → exactly 1 RED → reverted → GREEN).

The count ladder: UNIT 2362 → 2382 (+20: bounded-reader +11 [the
125th suite] · parse-body +2 · body-pregate +1 · docs-counts +6) ·
SUITES 124 → 125 · E2E 161 held (the CSRF probe rides the existing
4xx-negatives test — the API trio became the quartet) · badge
2523 → 2543. The docs: the AGENTS Session-165 section · the PAD
session-165 inventory row + the carrier fixes + the ADR-014 entry ·
the SKILL v1.162.0 (the s165 head layer + §7.4's bounded-reader facts
+ the §3.3 six-knob table + the §11 live gate-block + the §14 Zod
reality + the Appendix A/B re-census) · session_351.md · this record ·
the worklog entry.

The verification: lint 0/0 · tsc 0 · **125/2382** · build (29 routes)
· e2e **161/161** · probe:ref #138 STABLE · the six drift gates CLEAN
×6 · db census MATCH.
