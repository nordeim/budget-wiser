# Session 355 — THE STALE-SITE CLOSURE + THE SCHEMA LIVE-CENSUS (session-167)

Date: 2026-10-22 · Rotation: 167 · Operator task: audit + validate the
session-166 ship (the CRUD-family Zod seam + the doc-truth carriers),
remediate the findings TDD-first, align the docs, capture the
screenshots, push to `git@github.com:nordeim/neo-crm.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

## The baseline that named the round

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **127/2454** (the s166 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** (clean first run) |
| probe:ref | **#139 STABLE** at the s147–s155 fingerprint (no bundle event) |
| the six drift gates | CLEAN ×6 (the four viewport sweeps · the fullpage at the exact standing values 0.093%/0.316% at equal heights 4990/7259 · the census gate byte-parity, zero unexplained) |
| mobile drawer | **7/7 PASS** live at 390×844 (trigger unique · rail hidden · data-state=open · 8/8 links · the MAIN-scroller lock [main=hidden] · close-on-navigate + URL change · Escape + lock release) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · design-tokens 16/16 · the vendored `tw-animate.css`) |
| sitemap + robots + manifest | 11 routes / 200 / 200 — standing |
| bun audit | the 9-advisory posture unchanged (all dev-toolchain transitive — the s164 triage stands) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

One environment note (sandbox-only, no repo defect): this sandbox
exports a stale ambient `DATABASE_URL` pointing at a retired
sandbox-era mirror path; every DB-touching command this round ran with
the ambient var scrubbed (`unset DATABASE_URL`) so the repo's own
`.env` + the db-path seam resolve `<repo>/db/custom.db` — the census
PRINT confirms the resolved file. The repo code handles the class
correctly (`src/lib/db-path.ts` documents it); no code change needed
or made.

## The finding register (all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-167a | SKILL §11's pre-ship gate block carried the retired `2382/2382` — the exact site class s165 called "the worst possible stale site", recurred ONE ROUND after its cure because the block rode no pin (the F-99a1/F-102a2 genus). | Medium |
| F-167b | SKILL §7.4's auth doctrine still said "the CRUD family keeps the `asString` guards" (the pre-s166 incremental-path form, contradicting §14 + the head layer) + the heading's `schemas.ts (103 lines)` line census vs the live **716**. | Medium |
| F-167c | The SKILL head layer's OWN ladder clause carried L-166c3's stale first pass ("2382 → 2450 (+68…)" · "badge 2543 → 2611") — the mis-derivation shipped inside the prose while the same line's opening count read 2454. | Medium |
| F-167d | SKILL §15.1's canonical route example counted "every one of the 27" (live 29/41) and taught the bare `req.json()` + `asString` idiom — the anti-pattern the s165/s166 rounds eradicated, in the doc a reader copies first. | Medium |
| F-167e | README's env table carried 3 knobs vs the live six-knob contract (`.env.example` + PAD §8.2 + SKILL §3.3) — the onboarding doc under-documenting the deploy surface for the third consecutive round. | Medium |
| F-167f | README's `bun run test` suite enumeration named 121 suites (live 127): `bounded-reader`, `crud-zod-seam`, `dashboard-interior-parity`, `fullpage-sweep-tool`, `leading-inert-genus`, `schemas-crud` absent. | Low |
| F-167g | README carried zero Zod/parseBody mention — the validation architecture undiscoverable from the onboarding doc; the file-tree root line omitted `neo-crm_SKILL.md` + `worklog.md`. | Low |
| F-167h | PAD's header "Last Updated: 2026-09-29" — three-plus weeks behind its own content. | Low |
| F-167i | PAD §7.3's coverage doctrine cited "all 7 regression checks" vs the live 10-check mobile-nav suite. | Low |
| F-167j | PAD §7.1's inventory table structurally broken: the **Total row mid-table** (s165/s166 rows appended after it) + **six session rows (s86–s91) orphaned below** as headerless fragments + the footnote describing only the retired row semantics. | Medium |
| F-167k | The s166 seam's own census unpinned — `schemas.ts` (716 lines, 20 exported schemas) had no live-census pin family; the s166 round's own next-round candidate list named the gap. | Medium |

Out of scope (documented): dependency bumps for the 9 dev-toolchain
advisories (the no-mid-rotation-bump posture); RBAC (the
single-workspace Open row); the bundle-event watch (probe:ref #139
STABLE — no event to re-derive against).

## The implementation (TDD — RED 6 → GREEN)

1. **WP-1 the schema live-census battery**: `tests/schemas-census.test.ts`
   (the 128th suite, +21) — the field-inventory pins
   (`Object.keys(schema.shape)` for every exported object schema, in
   the route-guard order — the drift guard against a silent field drop
   [API widening] or add [API narrowing]) + the exported-schema census
   (the 20 members read live from source) + the line-census carrier
   pin (SKILL §7.4's `schemas.ts` line count read LIVE from disk — RED
   at birth on the stale 103, GREEN at the live 716). Mutation-proven:
   a planted `nickname` field → exactly 3 RED → reverted → GREEN. One
   calibration catch: the leads PUT ladder orders `accountId` BEFORE
   `ownerId` (the route's own guard order, unlike the create form) —
   the census pinned the TRUE order, not the assumed symmetry.
2. **WP-2 the stale-site closure**: the ten sites flipped (the §11
   gate block → the live form · the §7.4 doctrine clause → the
   completed-adoption form + the line census → 716 · the head layer's
   ladder numbers → the canonical +72/2615 forms · the §15.1 example →
   the `parseBody(req, accountCreateSchema)` canonical idiom + the 29
   count · the README env table → the six-knob contract · the suite
   enumeration → + the six missing batteries · the README file tree →
   the Zod seam named + the root line's two omitted docs · the PAD
   header date → 2026-10-22 · the §7.3 doctrine → 10 checks · the
   §7.1 surgery [the s86–s91 rows re-seated chronologically between
   s85 and s92, the Total row terminating the table again below the
   s166 row, the footnote documenting BOTH row forms — guarded by
   structure assertions before and after]).
3. **WP-3 the pin extension** (the recurrence root-cure, +5 in
   docs-counts): five previously-UNPINNED live-tense sites join the
   pin family — the §11 gate-block form, the §7.4 doctrine line, the
   §15.1 example idiom + route count, the README env table, the PAD
   §7.3 count — the sites that had to be fixed by hand at
   s99/s102/s106/s165/s166 now fail the gate the day they drift.

## The TDD ledger

- RED birth: **6 failing** (the line-census carrier pin + the five
  docs-counts carrier pins — every one a stale-site finding); the
  inventory pins born-green as live census (the §13.5 drift-net form,
  mutation-proven at birth).
- GREEN with three ladder co-flip catches live-caught by the suite
  itself: the first ladder census missed three dialog-geometry CLAUDE
  forms (the test-pyramid line, the commands table, the gate-order
  line, the closing line — ×4 with the co-flipped positive) and the
  Appendix B wall-clock phrase — the pin family policing its own
  ladder, exactly the L-165c1 design.
- One ladder-tooling catch: the head-layer surgery's idempotency check
  ran AFTER the anchor search — the demoted s166 copy inside the
  retired block matched the anchor and a second run double-applied;
  repaired live, the skip-check moved before the search (the artifact
  corrected before ship).

## The count ladder

UNIT 2454 → **2480** (+26: schemas-census +21 [the 128th suite] ·
docs-counts +5 [the carrier pins]) · SUITES 127 → **128** · E2E 161
held · badge 2615 → **2641** — every live-tense site re-anchored
atomically (`count-ladder-167.py`, assert-first, idempotent,
unique-anchor) and the pin carriers co-flipped (docs-counts
UNIT/SUITES + the head-layer pins → the s167 head [the s166 layer
comment-demoted, the single-key house form] · dialog-geometry CLAUDE
×4 + the 2454-form negatives · the Appendix B unit-total row +
wall-clock phrase · the SKILL **v1.164.0** frontmatter + H1
lockstep).

## The verification

lint 0/0 · tsc 0 · **128/2480** unit · build (29 routes) · e2e
**161/161** · db census MATCH · the six drift gates CLEAN ×6 at the
audit leg (the round touches docs + tests only — no visual source
changed, the standing parity verdict carries to the ship state).

## The captures (405-408)

The round's subject surfaces — the schema family's own pages: **405/
406** the settings page (the quartet schema's surface) at phone +
desktop · **407/408** the profile page (the profileUpdate schema's
surface) at phone + desktop.

## The lessons

L-167c1 an unpinned live-tense site is a scheduled recurrence — the
§11 gate block had been hand-fixed at s165 and re-staled within one
round because no pin read it; the cure is never "remember to flip it"
but "make forgetting fail" · L-167c2 the ladder's own pin carriers
police the ladder — the first ladder pass missed three CLAUDE forms
and the wall-clock phrase, and the suite caught each on the next run
(the ladder is done when the SUITE is green, not when the script
exits) · L-167c3 a census pin must pin the TRUE order, not the
assumed symmetry (the leads PUT ladder's accountId-before-ownerId
caught the assumption the moment the battery ran).
