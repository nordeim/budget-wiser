# Session 353 — THE CRUD-FAMILY ZOD SEAM + THE DOC-TRUTH CARRIERS (session-166)

Date: 2026-10-22 · Rotation: 166 · Operator task: audit + validate the
session-165 ship (the bounded-reader port + the content-type CSRF gate +
the e2e-census doctrine), remediate the findings TDD-first, align the
docs, capture the screenshots, push to `git@github.com:nordeim/neo-crm.git`
(main only, via `docs/ssh_git_wrapper_v3.py`).

**Provenance**: this rotation was executed once already in a workspace
that was reset before its commit landed — re-executed here from the
fresh clone at `0abf8a3` following the same plan; nothing of the
interrupted run survived (verified: the clone's HEAD topped at the s165
session-log commit, the tree clean).

## The baseline that named the round

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **125/2382** (the s165 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** |
| db census | seeded (15/24/10/23/12 + 4 users) |
| sitemap + robots | 11 routes / 200 — standing |
| operator checklist | mobile drawer e2e GREEN · Tailwind v4 pins GREEN · `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current |

## The finding register (all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-166a | The CRUD family still rode the handwritten guard family — the s163 Zod layer's own documented "incremental path"; 12 routes × ~250 guard call-sites hand-replicating what the auth family declared in schemas since s163; the web-app-foundation skill §7.2 requires "zod at every boundary" and §7.3 names parseBody as the handler's third station. | Medium |
| F-166a2 | The family-internal ordering inconsistency: leads/[id] answered 404 BEFORE body validation (its s37 comment records the divergence) while its five siblings validate first — the migration normalizes onto the §7.3 shape. | Low |
| F-166a3 | The silent-truncation survivors: the CRUD asString caps still truncated silently (slice-and-accept) — the exact class the s163 auth migration closed for email; the skill §7.2: "Never truncate-and-accept silently; reject". | Low |
| F-166b | README:118's route-census carrier stale ("27 REST route files, 39 verb handlers" — live 29/41; the s165 fix covered PAD's carriers, not README's file tree). | Low |
| F-166c | PAD's mermaid route-node stale ("×27" — the same s163 growth the s165 fix caught elsewhere). | Low |
| F-166d | PAD's file-tree e2e census stale ("9 spec files" — live 10; the s165 round re-censused the Appendix B rows + the HEAD line, not this tree line). | Low |
| F-166e | PAD §8.2's env table missing the three s163 knobs — the two env-contract docs disagreed with `.env.example` + SKILL §3.3's six-knob table. | Low |
| F-166f | The SKILL head layer's appearance drift: TWO `project_state:` YAML keys (the stale s141 layer + the live s165 layer) + a mislabeled s143 comment + the head-bump-orphaned s143 tail (keyless prose inside the frontmatter). | Low |
| F-166g | SKILL Appendix A's ADR-007 duplicate row (verbatim pair). | Low |

Out of scope (documented): dependency bumps for the 9 dev-toolchain
advisories (the no-mid-rotation-bump posture); RBAC (the
single-workspace Open row).

## The implementation (TDD — RED 69 → GREEN)

1. **WP-1 the CRUD-family Zod seam**: `src/lib/schemas.ts` gained the
   field-builder vocabulary (nullable/clearable/required-on-present/
   defaulted-enum/fkId/date/bool/photoUrl + the settings quartet) —
   every asString/isBad* guard quadrant recast (the create defaults,
   the PUT three-state absent-clear-value semantics, the legacy
   hot/warm/cold priority mapping, the settings quartet's
   absent-no-write/null-default split), every 400 message the route's
   own string, the field ORDER matching each route's guard ladder
   (parseBody answers the FIRST issue — the single-error message
   equivalence). The TWELVE routes swapped: eleven through
   `parseBody(req, schema)`; users PATCH through the route-local
   readBoundedJson + safeParse form (its divergent "Invalid JSON body"
   null-body message); reset keeps its custom confirm form entirely.
   leads/[id] normalized to parseBody-before-404 (§7.3). The asString
   caps converted to honest `.max()` rejects (the "must be reasonably
   sized" family). The FK-existence checks + the merged-record
   invariants stayed route-side. The guard helpers stayed exported for
   the query-param GET family + their behavior battery.
2. **WP-2 the doc-truth carriers**: the four carriers flipped (README
   29/41 · PAD mermaid ×29 · PAD 10 spec files · PAD §8.2's six-knob
   table) + four LIVE-CENSUS pins in docs-counts (the L-165c1 doctrine
   extended — every carrier read from the source tree).
3. **WP-3 the SKILL appearance fixes**: the duplicate `project_state:`
   key retired (the s141 layer comment-demoted + the orphaned s143
   tail folded — the single-key house form) + the ADR-007 dedup.
4. **WP-4 the count ladder**: UNIT 2382 → 2454 (+72) · SUITES 125 →
   127 · E2E 161 held · badge 2543 → 2615 — every live-tense site +
   pin carrier re-anchored atomically; the SKILL v1.163.0 + the s166
   head layer (the s165 layer comment-demoted).

## The TDD ledger

- RED birth: **69 failing** across the two NEW batteries (schemas-crud
  38 — every field's quadrant matrix; crud-zod-seam 31 — the
  seam-adoption pins; 6 current-state pins green at birth: the reset
  custom form, the helper exports, the query-param consumers).
- GREEN with the in-flight calibration catches:
  - **The Zod 4 optin rule (L-166c1)**: an absent object key
    short-circuits past `.optional()` fields BEFORE any preprocess
    runs — the create normalization (absent → null) had to live in
    NON-OPTIONAL nullable cores, not wrappers (the probe caught it:
    the wrapped field returned undefined inside the object while the
    bare field returned null).
  - **The null-routing trap (L-166c2)**: the hand-rolled guards answer
    null through their own coercion chain (isBadString(null)=false +
    the non-optional asString(null)="" + !x fires) — the schema port
    must trace the null path through the whole chain (the
    firstDayOfWeek two-message vocabulary caught it: null rides the
    VALUE message, not the type message).
  - **The count re-census mid-ladder (L-166c3)**: the round's own four
    carrier pins grew the suite AFTER the first ladder pass (2450 was
    stale before it shipped) — re-derived to 2454 before the lockstep.
- The collateral re-anchors: 108 guard-form pins across api-robustness
  (the S37-S44 tables kept their route+field+message triples; the
  assertion bodies flipped to the schema-seam census + the
  parsed-field consumption forms — the s163 precedent), body-pregate
  (the parseBody form; the F-69a3 ordering pin consolidated into the
  parseBody-before-DB pin), source-vocabulary (the free-form source
  contract re-anchored onto the schema's no-membership fields).

## The verification

lint 0/0 · tsc 0 · **127/2454** unit · build (29 routes) · e2e
**161/161** (the migration's parity proof — the CRUD round-trips, the
oversized-body probe, the settings flows all green through the Zod
seam) · db census MATCH.

## The captures (401-404)

The round's subject surfaces — the CRUD family the schemas now guard,
the seeded remediated codebase, the dev server live: **401/402** the
accounts page at phone + desktop · **403/404** the contacts page at
phone + desktop (the VLM battery confirmed the signed-in data surfaces
— the accounts table with its seeded rows).

## The lessons

L-166c1 the Zod 4 optin rule — an absent object key short-circuits
every `.optional()` field before its preprocess runs; an absent→value
mapping must live in a non-optional core · L-166c2 the null-routing
trap — a hand-rolled guard family answers null through its own
coercion chain, and the schema port must trace that whole chain, not
just the type predicate · L-166c3 the count ladder must be derived
AFTER the battery lands — the round's own carrier pins grew the suite
mid-ladder, and the first pass was stale before it shipped.
