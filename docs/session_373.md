# Session 373 — THE RESPONSE-SIDE WIRE-CONTRACT FAMILY (the session-175 round record)

Date: 2026-10-24 · Rotation: 175 · Agent: main (Z.ai CLI) ·
Plan: `docs/plans/2026-10-24-session175-response-side-wire-contract-family.md`

## The round

The post-174 audit rotation, its trigger THE OWNER'S NEWEST COMMITS
(`f5f96d6` — the re-validated evaluation report + the web-application
SKILL v1.1.0 + the NEW web-application-engineering sibling; `066f9e5` —
the session-372 transcript; `f9bc1bf` — the skills expansion). The
workspace was RESET (the sandbox restored a stale snapshot); the repo
re-cloned fresh at `f5f96d6`, the environment rebuilt from scratch
(`bun install` → `.env` + root `db/` → `db:push`/`db:seed` → census
MATCH 15/24/10/23/12 + 4 users → playwright chromium **1248** installed —
the sandbox cache carried 1200; the fresh-sandbox intake step the first
e2e run surfaced as the setup failure, root-caused and cured before the
baseline stood).

## The audit (every leg verified live on the fresh clone)

The baseline gate GREEN at the exact s174 ship state: lint 0/0 · tsc 0 ·
**138/2717** unit · build (the type-gate artifact, 29 routes) · smoke
**14/14** · e2e **192/192** · probe:ref **STABLE** (bundle md5
`46bc2d9c` — the reference unchanged since the s168 fingerprint) · the
desktop + phone sweeps **CLEAN** live (margin 0.5pct over the standing
baselines, the STANDING way — dev server :3000 + the pristine dev DB) ·
the mobile drawer battery **GREEN** at 390×844 (the locks
engage/release; the 10-check e2e mobile-nav suite rides the 192) · the
Tailwind v4 state clean · sitemap **11 routes** + robots + manifest
standing (verified against the standalone artifact) · census MATCH.

The READ-side census (the round's own audit lens): the six GET list
routes' include select sets + orderBy contracts walked against
`src/types/index.ts` ("API wire shapes") — the types↔wire agreement
holds field-for-field across every entity; the me/login user carriers
verified (`getSessionUser` projects cleanly to the 6-field SessionUser —
no leak; the login response's slim 5-field shape has ZERO consumers —
the login card reads only `body.ok`). **Zero live defects found.**

The deferral register (the s371 close's candidates, resolved with
rationale): the hosted-CI port (§9.3 #2) DEFERRED — the owner's own
newest doctrine (`web-application-engineering` v1.1.0 §1: "**The Local
Gate is the Only Gate:** No hosted CI is trusted") + runner-side
execution unobservable from this sandbox (the honest-evidence
discipline); the doc-size restructure (N-1) owner-level; the
OTP-at-rest item (§9.3 #6) ALREADY SATISFIED (`verificationCodeHash`
scrypt [s21] + `resetToken` SHA-256 [s164] — the report's parenthetical
understated the repo's actual posture); recharts 3.x (N-3) its own
rotation; RBAC documented open (the PAD ledger's single-workspace
design).

## The round proper — THE RESPONSE-SIDE WIRE-CONTRACT FAMILY (the READ half)

The s371 close's named candidate, the s173 close's named candidate still
unclaimed. The request side got its Zod seam (s163/166) + property
family (s173 P-h…P-m); the READ side — what `ok(rows)` actually ships to
the client store — had NO battery: the wire shapes rode entirely on the
e2e's RENDERED output, so a wire-shape regression that keeps the UI
rendering would land silently.

- **P-r — the entity wire round-trip** (`tests/property.test.ts`): for
  every one of the six entities, a ROUTE-EXACT row (the include shapes
  the GET list routes declare · in-range Dates as `Date` objects · nulls
  where the schema allows · the vocabulary scalars from the s173
  generator forms) survives the wire serialization verbatim — scalars
  unchanged, every Date as its exact `toISOString()` form, nulls PRESENT
  (the `??` fallback chains), the key set exact (no field dropped), the
  joined shapes intact.
- **P-s — the envelope pair contract**: `ok()`'s wire form is exactly
  `{ok: true, data}` with the payload passed through UNTOUCHED beyond
  JSON's own canonicalization; `fail()`'s wire form carries `{ok: false,
  error: {code, message}}` verbatim (the toast's message survives the
  wire) — the s35/s42 envelope doctrine as a property, driven through
  the REAL helpers (`tests/parse-body.test.ts` proves the `@/lib/api`
  import chain works in vitest).
- **The READ-half source pins** (`tests/crud-zod-seam.test.ts` +5 — the
  ROUTE-side suite's other half): the five include-carrying routes'
  exact include select sets · the six list routes' orderBy contracts ·
  every GET answers through the envelope (the s42 doctrine) ·
  opportunities ships RAW rows, no include (the s31 second-deal-model) ·
  `auth/me` ships the full SessionUser shape (photoUrl included — the
  canonical user carrier).

**The TDD ledger**: 1 RED face at birth (the `fc.jsonObject` →
`fc.jsonValue` fast-check 4.x API calibration catch — the s172/s173
live-caught lineage) + 8 born-green (the contract-freeze pins over
working code — the s173 P-p/P-q precedent).

**THE MUTATION-PROOFS** (the non-vacuousness for a born-green family):
the planted include regression (the contacts owner select lost
`avatarColor`) → **exactly 1 RED** (the include pin); the planted
envelope regression (`ok()`'s wire form grew a third key) → **exactly 1
RED** (the P-s key-set pin, caught on the FIRST property run); both
reverted → GREEN. **THE STASH-PROOF**: the round's test files stashed
alone → the suite returns to exactly **138/2717**; restored → **138/2726**.

**THE COUNT LADDER**: 2717 → **2726** (+9: property +4 + crud-zod-seam
+5) · SUITES 138 **HELD** (the ADR-017 one-suite doctrine) · E2E 192
**HELD** (test-only — NO product code touched) · badge 2909 → **2918**
(count-ladder-175.py: 21 flips, assert-first, idempotent, unique-anchor
— the re-run a verified 0-flip no-op).

**THE COLLATERAL RE-ANCHORS** (each live-caught by the suite itself at
the full-unit run — the pins policing the pins): the PAD §11
`property.test.ts` row re-censused 723 → **998** lines (the
inventory-census live-read catch again) · the F-106a1 layer-axis pin
(the s175 layer live, the s174 layer beneath) · the dialog-geometry
CLAUDE lockstep carriers + the F-92a3 hard-coded gate-order form (2717
→ 2726, the retired forms joining the negatives ladder) · the
docs-counts constants + the lineage comment.

**THE DOCS LEG**: the AGENTS Session-175 section · the PAD **ADR-020**
(the wire-contract doctrine: "the READ half is a stated contract, not a
rendering coincidence") + the session-175 inventory row + the §11
re-anchor · the CLAUDE property-pyramid extension (25 → 29 checks, the
READ-half join) · the README Tested row's s175 wire-contract mention +
the badge · the SKILL **v1.172.0** + H1 lockstep + the s175 head layer
(the s174 layer comment-demoted at its ship counts 2717/192;
skill-head-175.py, idempotent).

**THE TEST-ONLY PROOF**: the round touched no component, no page, no
className, no route, no config — the standing legs re-verified at the
audit leg carry the parity verdict unchanged (the drawer · probe:ref
STABLE · the sweeps CLEAN; the reference unchanged since the s168
fingerprint).

**THE CAPTURES** 437-440 (`docs/screenshots/`): the dashboard parity
anchor at desktop · the contacts surface (the include-rich wire's own
face — the joined account/owner columns) at desktop · the drawer-open
standing contract at phone · the leads surface at phone.

## The verification ledger

lint 0/0 · tsc 0 (full strictness standing) · **138/2726** unit · build
(the type-gate artifact) · smoke **14/14** · e2e **192/192** · db census
MATCH (15/24/10/23/12 + 4 users) · probe:ref STABLE · the desktop +
phone sweeps CLEAN · the mobile drawer battery GREEN · sitemap 11 routes
+ robots + manifest standing.

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the recharts
2.15 → 3.x migration (N-3 — its own rotation: the standing pixel
baselines need re-derivation) · the drawer interior re-walk · the
fresh-bundle register re-derivation when the reference next ships a new
bundle · the hosted-CI port the day the owner signals the
production-deployment milestone (the deferral rationale lives in the
plan doc §0.2).
