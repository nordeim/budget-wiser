# Session 351 — THE BOUNDED-READER PORT + THE CONTENT-TYPE CSRF GATE + THE E2E-CENSUS DOCTRINE (session-165)

Date: 2026-10-22 · Rotation: 165 · Operator task: audit + validate the
session-164 ship (the test-isolation cure + the reset-token hash + the
amortized sweep), remediate the findings TDD-first, align the docs,
capture the screenshots, push to `git@github.com:nordeim/neo-crm.git`
(main only, via `docs/ssh_git_wrapper_v3.py`).

## The baseline that named the round

Workspace refreshed to `021fb74` (git pull; `bunx prisma generate`
re-run out of caution — the client was current). The baseline gate:

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **124/2362** (the s164 test-isolation cure holding in the ambient workspace — the workspace's own `.env` carries the 64-char AUTH_SECRET the cure pins against) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** |
| probe:ref #138 | STABLE at the s147-s155 fingerprint — no parity event |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| sitemap + robots | 11 routes / 200 — standing |
| operator checklist | mobile drawer GREEN · Tailwind v4 pins GREEN · `.env` `file:../db/custom.db` + `db/` at the root · vitest + playwright standing · `.env.example` current |

## The finding register (all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-165a | **The content-type CSRF gate absent at every JSON parse site**: `req.json()` parses regardless of Content-Type, so a cross-site `<form enctype="text/plain">` posting a JSON-shaped body reaches the auth family's cookie-MINTING POSTs — the login-CSRF class (SameSite=Lax gates cookie SENDING on cross-site POSTs, never cookie SETTING). digma closed it at S148-A; the web-app-foundation skill §7.2 requires it. First-party census: every JSON consumer already sends `application/json` — zero first-party breakage. | Medium |
| F-165b | **The chunked-body bypass**: `isBodyTooLarge` checked only the DECLARED Content-Length; a Transfer-Encoding: chunked request carries none → `req.json()` buffered unbounded (digma S75-B's exact finding; api.ts documented the gap as an accepted backstop). | Medium |
| F-165c | **The mobile-nav e2e-count miscount**: `MOBILE_NAV_E2E = 11` for a 10-test spec since s147 (landing.spec gained that round's +1 while the constant got the bump — git-verified); seven pinned doc sites carried the wrong number for 17 sessions; no live-census pin on the axis. | Low |
| F-165d | **The Appendix B e2e rows drifted** while the total stayed pinned: landing 12 vs live 14 · crm 111 vs live 112 · the s163 reset-password spec (8 checks) absent from the Test Inventory since birth — the F-107a1 genus on the e2e axis. | Low |
| F-165e | PAD's route-census carriers stale: "27 files" / "39 API handlers" (live 29/41) + the HEAD line's 9-spec enumeration (live 10). | Low |
| F-165f | SKILL stale spots: §3.3 "3 — count them, 3" env table (live 6) · §11's era-s12 65/65 + 20/20 gate block · §14's no-schema-library contradiction of the s163 Zod layer. | Low |
| F-165g | ADR-014 referenced by the s163 records twice, never written up (PAD §1.3 + both indexes stop at ADR-007). | Low |

Out of scope (documented): the CRUD-family Zod migration (the
documented incremental path — its own rotation); dependency bumps for
the 9 dev-toolchain advisories (the no-mid-rotation-bump posture);
RBAC (the single-workspace Open row).

## The implementation (TDD — RED 20 → GREEN)

1. **WP-1 the bounded reader (the digma S148-A/S75-B port)**:
   `readBoundedJson` joins `src/lib/api.ts` — the content-type CSRF
   gate first (the stream cancelled), the declared-length fast path
   (`isBodyTooLarge` composed, not replaced — the N-67d lineage), the
   body-less pass-through, the stream counter with mid-read producer
   cancel, the merged-decode parse tail on the null-on-unparseable
   contract. `parseBody` composes the seam (the auth family inherits
   both gates); the THIRTEEN sessioned CRUD sites swapped via the
   assert-first `crud-seam-swap-165.py` — every 400 message preserved
   VERBATIM (incl. the divergent siblings: users' "Invalid JSON body",
   reset's 'Type "RESET" to confirm' null-body fallthrough), the
   F-69a3 gate-before-DB ordering carried onto the seam form. The e2e
   CSRF probe joined the auth spec's 4xx battery (the trio became the
   quartet — the probe rides its own XFF bucket; E2E held at 161).
2. **WP-2 the e2e-census doctrine**: the mobile-nav constant flipped
   to 10 + the seven doc carriers + **the LIVE-CENSUS pin** (the count
   read FROM the spec file — the schema/seed line-count doctrine
   extended to the e2e axis); the Appendix B e2e rows re-censused
   (landing 14 · crm 112 · the NEW reset-password row 8) + the
   doctrine note narrowed (the UNIT rows stay the s12 snapshot; the
   e2e rows are live-tense, ALL pinned) + **the sum guard** (the rows
   + setup must sum to the E2E constant).
3. **WP-3 the docs-truth carriers**: PAD's route census → the LIVE
   29/41 (the census itself read live from the source tree by the
   pin); the HEAD line's 10-spec enumeration; SKILL §3.3's six-knob
   table; §11's live gate-block counts; §14's Zod reality; **ADR-014
   formalized** (PAD §1.3's full Context/Decision/Rationale/
   Consequences/Alternatives entry + both indexes).
4. **WP-4 the count ladder**: UNIT 2362 → 2382 (+20: bounded-reader
   +11 [the 125th suite] · parse-body +2 · body-pregate +1 ·
   docs-counts +6) · SUITES 124 → 125 · E2E 161 held · badge
   2523 → 2543 — every live-tense site + pin carrier re-anchored
   atomically (`count-ladder-165.py`).

## The TDD ledger

- RED birth: **20 failing** (bounded-reader 11 — the seam did not
  exist; parse-body +2 — the CSRF gate and the chunked bound through
  the composed seam; body-pregate re-anchors — the routes still rode
  the old two-line form; docs-counts live-census +2 — 11 ≠ 10 and the
  stale rows).
- GREEN: the implementations above; one collateral pin re-anchored
  (settings-profile-parity's s72 users-route gate pin); the in-flight
  calibration fixes: the users route's divergent "Invalid JSON body"
  message caught by the message-preservation pin before it could be
  normalized mid-port; the CSRF probe's XFF bucket (the login route
  buckets BEFORE it parses — a rejected probe still spends the shared
  localhost budget otherwise).
- **THE VACUOUS-PIN CATCH**: the row-census pin's first draft rode a
  `new RegExp` template whose `\|` escapes collapsed to alternation —
  the pin matched EVERYTHING (the auth row said 12 while the spec said
  11 and the pin passed). Caught live by the arithmetic not adding up,
  replaced with the toContain filename-cell form, mutation-proven: a
  planted 12 → exactly 1 RED → reverted → GREEN.

## The verification

lint 0/0 · tsc 0 · **125/2382** unit · build (29 routes) · e2e
**161/161** · probe:ref #138 STABLE · the six drift gates CLEAN ×6 ·
db census MATCH.

## The captures (397-400)

The round's subject surfaces, the seeded remediated codebase, the dev
server live: **397/398** the login card at phone + desktop (the
auth-family surface the bounded reader hardens) · **399/400** the
reset-password landing pair at phone + desktop (the parse seam's other
public surface).

## The lessons

L-165c1 a pin that checks doc-consistency with a constant never checks
the constant against the thing it claims to census — the live-census
doctrine (read the source) is the only root cure for count drift ·
L-165c2 the RegExp-from-template escaping trap (`"\|"` is alternation,
not a pipe) — a regex pin must be mutation-proven at birth or it
matches nothing (or everything) · L-165c3 the e2e rows are only 10 —
the "too many rows to pin" excuse that left them a stale snapshot dies
at that scale.
