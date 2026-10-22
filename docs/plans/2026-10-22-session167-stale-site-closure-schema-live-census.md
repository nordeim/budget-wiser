# The session-167 plan — THE STALE-SITE CLOSURE + THE SCHEMA LIVE-CENSUS

Date: 2026-10-22 · Rotation: 167 ·
Task: audit + validate the session-166 ship (the CRUD-family Zod seam +
the doc-truth carriers), remediate the findings TDD-first, align every
doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `da2455d` (fresh clone; `.env` recreated with a fresh
64-char AUTH_SECRET; `db:push` + `db:seed` census MATCH; the Playwright
chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **127/2454** (the s166 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** (clean first run) |
| probe:ref | **#139 STABLE** at the s147–s155 fingerprint (no bundle event) |
| the SIX drift gates | CLEAN ×6 (the four viewport sweeps · the fullpage at the exact standing values 0.093%/0.316% at equal heights 4990/7259 · the census gate byte-parity, zero unexplained) |
| mobile drawer | 7/7 PASS live at 390×844 (trigger unique · rail hidden · data-state=open · 8/8 links · the MAIN-scroller lock · close-on-navigate + URL change · Escape + lock release) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · design-tokens 16/16 · the vendored `tw-animate.css`) |
| sitemap + robots + manifest | 11 routes / 200 / 200 — standing |
| bun audit | the 9-advisory posture unchanged (all dev-toolchain transitive — the s164 triage stands) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

One environment note (sandbox-only, no repo defect): this sandbox
exports a stale ambient `DATABASE_URL` pointing at a retired sandbox-era
mirror path; every DB-touching command this round ran with the ambient
var scrubbed (`unset DATABASE_URL`) so the repo's own `.env` + the
db-path seam resolve `<repo>/db/custom.db` — the census PRINT confirms
the resolved file. The repo code handled the class correctly
(`src/lib/db-path.ts` documents it); no code change needed or made.

The findings, severity-ranked (every claim reproduced live against the
s166 tree):

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-167a | **The SKILL §11 pre-ship gate block carries the retired unit count**: `bun run test  # 2382/2382` — the s165 number, in live tense, on the very site class s165 called "the worst possible stale site" (the gate block that then carried era-s12 counts). The block is UNPINNED (the docs-counts unit-count negative covers only the Appendix B table form), which is exactly why the genus recurred one round after its last cure — the F-99a1/F-102a2 treadmill. | `neo-crm_SKILL.md:793` | Medium | Verified |
| F-167b | **The SKILL §7.4 auth section carries the pre-s166 doctrine**: "the CRUD family keeps the `asString` guards" — contradicted by §14's completed-adoption line, the head layer's own "the s163 incremental path COMPLETED", and the 12 migrated routes; plus the stale line census "src/lib/schemas.ts (103 lines)" (live: **716** — the file more than sextupled at s166; every sibling line-census in that heading is current). | `neo-crm_SKILL.md:643-644, 623` | Medium | Verified |
| F-167c | **The SKILL head layer's own ladder clause carries the stale FIRST PASS**: "the count ladder 2382 → 2450 (+68: …)" and "badge 2543 → 2611" — L-166c3's documented mis-derivation (the carrier pins grew the suite mid-ladder) shipped INSIDE the head layer prose while the same line's opening count reads 2454. Canonical (AGENTS · PAD row · docs-counts · the plan's own execution record): **2382 → 2454 (+72 … docs-counts +4 …)** and **badge 2543 → 2615**. | `neo-crm_SKILL.md:43` | Medium | Verified |
| F-167d | **The SKILL §15.1 canonical route example teaches the eradicated idiom**: the heading counts "every one of the 27" route handlers (live 29 files / 41 handlers) and the POST body shows `const body = await req.json().catch(() => null); const name = asString(body?.name, 120);` — the pre-s165 bare parse + the pre-s166 hand-rolled guard, both anti-patterns under the doctrine the same file's §7.4/§14 declare. A reader following §15.1 today writes a route that violates the house standard. | `neo-crm_SKILL.md:894-915` | Medium | Verified |
| F-167e | **README's environment table carries 3 knobs** (DATABASE_URL / AUTH_SECRET / NEXT_PUBLIC_SITE_URL) while the live contract is the six-knob family (`.env.example` + PAD §8.2 + SKILL §3.3 — the last two fixed at s165/s166): `NEO_PROXY_HOPS`, `NEO_DISABLE_IN_APP_OTP`, `NEO_DISABLE_IN_APP_RESET` are absent from README entirely — the onboarding doc under-documents the deploy surface for the third consecutive round. | `README.md:179-183` | Medium | Verified |
| F-167f | **README's `bun run test` suite enumeration names 121 suites (live 127)**: missing `bounded-reader`, `crud-zod-seam`, `dashboard-interior-parity`, `fullpage-sweep-tool`, `leading-inert-genus`, `schemas-crud` — the s165/s166 batteries never joined the list (the headline count 2454 IS current). | `README.md:188` | Low | Verified |
| F-167g | **README carries zero Zod/parseBody mention**: the validation architecture (the 20-schema `src/lib/schemas.ts`, the `parseBody` seam, the 12 migrated CRUD routes) is undiscoverable from the onboarding doc; the file-tree root line also omits `neo-crm_SKILL.md` + `worklog.md` (both root-level docs). | `README.md` (grep: 0 hits) | Low | Verified |
| F-167h | **PAD's header date stale**: "Last Updated: 2026-09-29" — three-plus weeks behind the document's own content (the s161 row cites 2026-10-21/22; the s166 row is the last entry). | `Project_Architecture_Document.md:6` | Low | Verified |
| F-167i | **PAD §7.3's coverage doctrine cites "all 7 regression checks"** for the mobile drawer — the live suite is the 10-check form (the s145→s147 growth; MOBILE_NAV_E2E=10 is itself live-census-pinned — the doctrine line is the straggler). | `Project_Architecture_Document.md:1315` | Low | Verified |
| F-167j | **PAD §7.1's session-inventory table is structurally broken**: the **Total row sits mid-table** (the s165 + s166 rows were appended AFTER it at :882/:883, so the table no longer terminates at its total) and **six session rows are orphaned below the table** (s86–s90 at :885–:889 and s91 at :891 — headerless fragments after a blank line, detached from their chronological position between the s85 and s92 rows) + the counting-convention footnote still describes the retired per-session row semantics ("files touched / checks added") while the modern rows carry session-end HEAD totals with the delta in the Category cell. | `Project_Architecture_Document.md:881-891` | Medium | Verified |
| F-167k | **The s166 seam's own census is unpinned**: `src/lib/schemas.ts` (716 lines, 20 exported schemas, the field-builder vocabulary) has NO live-census pin family — nothing fails if a future edit drops a field from a route schema (silently widening the API) or adds an unexpected one (silently narrowing it). The s166 round's own next-round candidate list names the gap: "the e2e-census doctrine's next axis (the schemas' OWN live-census — a schema-field-count pin family, the drift guard for the seam the round built)". | `src/lib/schemas.ts` | Medium | Verified |

Out of scope this round (documented, not silently dropped): dependency
bumps for the 9 dev-toolchain advisories (the no-mid-rotation-bump
posture — PAD §10 ledger; a toolchain bump forces the standing pixel
baselines' re-derivation, its own rotation); RBAC (the single-workspace
Open row); the bundle-event watch (probe:ref #139 STABLE — no event to
re-derive against).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the schema live-census battery [F-167k]

`tests/schemas-census.test.ts` (the 128th suite) — the L-165c1
live-census doctrine extended to the seam the s166 round built:

- **The field-inventory pins**: `Object.keys(schema.shape)` for every
  exported object schema — the 12 CRUD family members
  (account/activity/contact/event/lead × create+update), the settings
  quartet schema, the profile schema, and the auth family's object
  schemas (login/signup/verify/resend/forgot/reset) — each asserted
  against its exact field list in the route-guard order. A future edit
  that drops, renames, or reorders a field fails the census — the
  drift guard for silent API widening/narrowing.
- **The exported-schema census**: the `export const …Schema` names read
  live from the source (20 members — the battery fails if a schema is
  silently un-exported or a new one lands uncensused).
- **The line-census carrier pin**: SKILL §7.4's
  `src/lib/schemas.ts (N lines)` heading must carry the LIVE line count
  (read from disk) — **RED at birth** (the doc says 103; the file is
  716) → GREEN when WP-2 flips it. This is the root-cure pairing for
  F-167b's line-census half: the count can never drift again because
  the pin reads the file.
- Mutation-proof at birth per the house doctrine: plant a field change
  → exactly the inventory pins go RED → revert → GREEN.

### WP-2 — the doc-truth closure [F-167a…j]

The ten stale sites flipped (every flip riding its WP-1/WP-3 pin):

1. SKILL §11's gate block: `2382/2382` → `2454/2454`.
2. SKILL §7.4's doctrine clause: "the CRUD family keeps the `asString`
   guards" → the completed-adoption form ("the CRUD family since
   session-166 — the twelve body routes ride the seam"); the heading's
   `schemas.ts (103 lines)` → the live `716 lines`.
3. SKILL head layer's ladder clause: `2382 → 2450 (+68: …)` →
   `2382 → 2454 (+72: … · docs-counts +4 …)`; `badge 2543 → 2611` →
   `badge 2543 → 2615` (the L-166c3 first-pass numbers retired from the
   shipped prose).
4. SKILL §15.1: the heading's "every one of the 27" → "every one of
   the 29"; the POST body rewritten to the CURRENT canonical idiom
   (`parseBody(req, accountCreateSchema)` + `isGuarded` + the
   FK-check-stays-route-side note) — the example the doc teaches must
   be the example the code ships.
5. README's env table: + the three s163 knobs
   (`NEO_PROXY_HOPS` / `NEO_DISABLE_IN_APP_OTP` /
   `NEO_DISABLE_IN_APP_RESET`) — the six-knob family complete in the
   onboarding doc.
6. README's suite enumeration: + the six missing names.
7. README: the Zod seam surfaces (the `lib/` file-tree line gains
   `schemas` — the Zod layer; the root line gains
   `neo-crm_SKILL.md · worklog.md`).
8. PAD's header: `Last Updated: 2026-09-29` → `2026-10-22`.
9. PAD §7.3: "all 7 regression checks" → "all 10 regression checks".
10. PAD §7.1 surgery: the s86–s91 rows re-seated at their chronological
    position (between s85 and s92); the Total row moved to terminate
    the table (below the s166 row); the counting-convention footnote
    updated to describe BOTH row forms (the historical files-touched
    rows and the modern HEAD-total rows). The site-form pins
    (docs-counts) anchor on row TEXT, not line numbers — the surgery
    is pin-safe by construction.

### WP-3 — the pin extension (the recurrence root-cure) [the F-99a1/F-102a2 genus]

`tests/docs-counts.test.ts` grows carrier pins for the previously
UNPINNED sites (the root cause of F-167a's recurrence):

- the SKILL §11 gate-block unit-count form (`bun run test  # N/N` in
  the pre-ship checklist) — live-tense, pinned to the UNIT constant;
- the SKILL §7.4 completed-adoption doctrine line (the
  "CRUD family since session-166" form must be present; the retired
  "keeps the asString guards" form must be absent from the live-tense
  section);
- the README env-table six-knob form (all three `NEO_*` names present
  in the table rows);
- the PAD §7.3 ten-check doctrine form.

**RED at birth** (the sites are still stale) → GREEN when WP-2 flips
them. The pairing is the point: a site this family has had to fix by
hand at s99, s102, s106, s165, and s166 now fails the gate the day it
drifts.

### WP-4 — the count ladder

Derived AFTER the battery lands (L-166c3): UNIT 2454 → 2454+N ·
SUITES 127 → 128 · E2E 161 held · badge 2615 → 2615+N — every
live-tense site re-anchored atomically (`count-ladder-167.py`,
assert-first, idempotent, unique-anchor; the historicals preserved)
+ the SKILL v1.164.0 + the s167 head layer (the s166 layer
comment-demoted).

### WP-5 — the docs + the verification + the captures

- `docs/session_355.md` (the odd-number canonical session record); the
  plan's own execution record; the repo worklog entry; the AGENTS
  Session-167 section; the PAD session-167 inventory row.
- The verification chain: lint · typecheck · unit (the new totals) ·
  build (29 routes) · e2e 161/161 · db census.
- The captures 405–408 (the round's subject surfaces — the schema
  family's own pages: the settings page [the quartet schema's surface]
  + the profile page [the profileUpdate schema's surface] at phone +
  desktop), saved under `docs/screenshots/`.

### WP-6 — the commit + the push

- `git commit` on main (the session mega-message, the house
  convention).
- The push via `docs/ssh_git_wrapper_v3.py` (the runbook:
  `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`) — operator key
  materialized to a 0600 file outside the repo, shredded after;
  remote-ref verification; NO new branches.

## 2. The validation of this plan against the codebase

- Every finding's line citation re-verified live at `da2455d` (the
  greps quoted in the finding register; the schemas.ts line count
  716 via `wc -l`; the README suite enumeration diff-derived: 121
  named vs 127 live, the six missing listed; the PAD table structure
  read directly at :878–:904).
- The pin surface censused: docs-counts' PAD pins are site-form
  anchors (string containment, not line numbers — the N-103a1
  treadmill lesson) → the §7.1 table surgery is pin-safe. The
  unit-count negative family covers the Appendix B / gate-block forms
  it names — the §11 gate-block form joins them at WP-3.
- The schema export surface censused: 20 `export const` schemas
  (8 auth-family + 12 CRUD/settings/profile); every shape's field
  inventory read in full from the source (the field lists WP-1 pins).
- The mobile-nav 7/7 live check, the Tailwind v4 posture, the sitemap/
  robots/manifest responses, the drift-gate chain, and the bun-audit
  posture all ran THIS round at the audit leg (the table in §0) — no
  environment work, no visual-source change (the round touches docs +
  tests only, so the six drift gates' CLEAN ×6 verdict stands for the
  ship state; the verification chain re-runs the code gates).
- The .env / .env.example six-knob contract verified current (the
  operator checklist item) — README's env-table flip (WP-2.5) aligns
  the last doc to it.

---

## 3. The execution record (the TDD ledger)

Executed 2026-10-22, from the fresh clone at `da2455d` (the s166 ship
+ its session-log commit). The gate chain at ship: lint 0/0 · tsc 0 ·
**128/2480** unit · build (29 routes) · e2e **161/161**.

| WP | RED | GREEN | Notes |
|---|---|---|---|
| WP-1 the schema live-census | 1 failing (the line-census carrier pin — the doc's 103 vs the live 716) | the 128th suite, +21 | Mutation-proven: the planted `nickname` field → 3 RED → reverted → GREEN. The calibration catch: the leads PUT ladder orders accountId BEFORE ownerId (the route's own guard order) — the census pinned the TRUE order, not the assumed symmetry (L-167c3). |
| WP-2 the stale-site closure | (rides WP-1/WP-3's pins) | the ten sites flipped | The §7.1 surgery guarded by structure assertions before and after (the s86-s91 rows re-seated chronologically, the Total row terminating, the footnote's dual row-forms). The §7.4 clause rewrapped so the pin anchor reads contiguously. |
| WP-3 the pin extension | 5 failing (the carrier pins — the sites stale) | docs-counts +5 | The five previously-unpinned sites: the §11 gate block · the §7.4 doctrine line · the §15.1 example idiom + route count · the README env table · the PAD §7.3 count. |
| WP-4 the count ladder | (the ladder) | 128/2480 lockstep GREEN | Three co-flip catches live-caught by the suite (the dialog-geometry CLAUDE ×4 forms + the Appendix B wall-clock phrase — the first ladder census missed them; the pin family policed its own ladder, L-167c2). One tooling catch: the head-surgery idempotency check ran after the anchor search — a second run double-applied against the demoted copy; repaired live, the skip-check moved first. |

The captures 405-408 (the settings + profile pages at phone + desktop
— the schema family's own surfaces) + `session_355.md` + the worklog
entry + the AGENTS Session-167 section + the PAD session-167 inventory
row closed the round.
