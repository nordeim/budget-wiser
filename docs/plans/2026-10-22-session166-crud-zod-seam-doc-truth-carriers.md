# The session-166 plan — THE CRUD-FAMILY ZOD SEAM + THE DOC-TRUTH CARRIERS

Date: 2026-10-22 · Rotation: 166 ·
Task: audit + validate the session-165 ship (the bounded-reader port +
the content-type CSRF gate + the e2e-census doctrine), remediate the
findings TDD-first, align every doc, capture the screenshots, and push
to `git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

NOTE (the round's own provenance): the session-166 rotation was
EXECUTED once already in a workspace that was reset before its commit
landed — the round is re-executed here from the fresh clone at
`0abf8a3` (the s165 ship + its session log), following the same plan.
Nothing of the interrupted run survived (verified: `git log` tops at
the s165 session-log commit; the working tree clean).

## 0. The audit that motivated this round (the finding register)

Baseline state at `0abf8a3` (fresh clone; `.env` recreated with the
64-char AUTH_SECRET the s164 cure pins against; `bunx prisma
generate` + `db:push` + `db:seed`; playwright chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **125/2382** (the s165 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** |
| db census | seeded (15 accounts / 24 contacts / 10 events / 23 leads / 12 activities + 4 users) |
| sitemap + robots | 11 routes / 200 — standing |
| operator checklist | mobile drawer e2e GREEN · Tailwind v4 pins GREEN · `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current |

The findings, severity-ranked (every claim reproduced live against the
s165 tree):

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-166a | **The CRUD family still rides the handwritten guard family** — the s163 Zod layer's own documented "incremental path" (`schemas.ts`: "the CRUD family keeps the asString/isBad* guards — no double-validation churn; the schemas are the seam future routes adopt"). 12 routes × ~250 guard call-sites (asString/isBadFK/isBadString/isBadNumber/isBadDate/isBadBool/asFKId/asNumber/asInt/asDate) hand-replicate what the auth family declared in schemas since s163. The web-app-foundation skill §7.2 ("zod at every boundary — zero-balance's standard") requires the declarative form at EVERY body boundary; §7.3's standard handler shape (`rateLimit → requireSession → parseBody(zod) → ownership/FK checks (404) → prisma mutation`) names parseBody as the third station. One family-one-seam is also the maintainability case: a new field's guard vocabulary (type-guard message + value-guard message + cap + default/clear semantics) is 4 hand-written pieces per route today vs 1 schema field. | 12 routes: accounts/activities/contacts/events/leads ×[root+[id]] + settings + users | Medium | Verified |
| F-166a2 | **The family-internal ordering inconsistency**: leads/[id] PUT answers 404 BEFORE body validation (its s37-S2 comment records the divergence: "missing-id + malformed-body now answers 400 before 404, matching the four sibling [id] routes" — but leads/[id] kept the OPPOSITE order: the findUnique runs first, the body validation inside the try after it), while the five sibling [id] routes validate the body first. The §7.3 standard shape puts parseBody BEFORE the ownership/FK checks — the migration normalizes leads/[id] onto it (a malformed body + missing record now answers 400, matching its five siblings). | `src/app/api/leads/[id]/route.ts` | Low | Verified |
| F-166a3 | **The silent-truncation survivors**: the CRUD family's asString caps (120/160/200/500/2000…) still TRUNCATE silently (slice-and-accept) — the exact class the s163 auth migration closed for email ("the schema REJECTS with an honest message"; the skill §7.2: "Never truncate-and-accept silently; reject"). A 121-char account name stores its 120-prefix today; a 501-char photoUrl stores 500 (users PATCH slices explicitly). The migration converts every cap to an honest Zod `.max()` reject — new messages of the s163 "must be reasonably sized" family, every EXISTING message preserved verbatim. | 12 routes' asString call-sites | Low | Verified |
| F-166b | **README's route-census carrier stale**: line 118 "27 REST route files, 39 verb handlers (accounts → users)" — the s165 round fixed PAD's route-census carriers (29/41, live-pinned by the docs-counts census) but README's file-tree line was never in that fix's scope. | `README.md:118` | Low | Verified |
| F-166c | **PAD's mermaid route-carrier stale**: the §6.2 deployment diagram's node label "API[/api/* route handlers ×27<br/>force-dynamic · requireSession]" — the ×27 rides the same s163 growth the s165 fix caught elsewhere (live 29). | `Project_Architecture_Document.md:296` | Low | Verified |
| F-166d | **PAD's e2e spec-file census stale**: the file-tree line "e2e/ # global-setup, auth.setup, 9 spec files + setup project — 161 checks" — the s165 round re-censused the Appendix B rows and the HEAD line's 10-file enumeration but not this tree-line (live 10 spec files). | `Project_Architecture_Document.md:399` | Low | Verified |
| F-166e | **PAD §8.2's environment table missing the three s163 knobs**: the table carries 4 rows (DATABASE_URL / AUTH_SECRET / NEXT_PUBLIC_SITE_URL / E2E_PORT) while `.env.example` + SKILL §3.3 (fixed s165 to the six-knob table) carry NEO_PROXY_HOPS / NEO_DISABLE_IN_APP_OTP / NEO_DISABLE_IN_APP_RESET — the two env-contract docs disagree. | `Project_Architecture_Document.md:1347` | Low | Verified |
| F-166f | **The SKILL head layer's appearance drift**: the YAML frontmatter carries TWO `project_state:` keys (a duplicate-key violation — line 13 the stale s141-era layer "2060 unit checks + 138 e2e checks green; the session-141 layer…", line 16 the live s165 layer) separated by a MISLABELED comment (`<!-- session-143 layer (the landing family walk) -->` — the s143-era demotion note that once sat above the retired layer it named; the s165 head bump left it stranded above the wrong layer). A single `project_state:` key with the retired layers comment-demoted is the house form. | `neo-crm_SKILL.md:13-16` | Low | Verified |
| F-166g | **SKILL Appendix A's ADR-007 duplicate row**: the ADR index table carries the ADR-007 row TWICE, verbatim (lines 6510-6511) — a copy-paste artifact invisible to every count pin (the index rows are not censused). | `neo-crm_SKILL.md:6510` | Low | Verified |

Out of scope this round (documented, not silently dropped): dependency
bumps for the 9 dev-toolchain advisories (the no-mid-rotation-bump
posture — PAD §10 ledger); RBAC (the single-workspace Open row); the
9 remaining bun-audit advisories (all dev-toolchain transitive — the
s164 triage stands).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the CRUD-family Zod migration [F-166a + F-166a2 + F-166a3]

The message-preservation contract (the s165 zero-message-drift
doctrine, extended to the whole family): every 400 message the
routes answer today is answered VERBATIM by the schema form —
including the two divergent siblings (users PATCH's "Invalid JSON
body" null-body message — preserved via the route-local
readBoundedJson + safeParse form, NOT parseBody whose null branch
answers "Invalid request body"; reset's 'Type "RESET" to confirm'
null-body fallthrough — the route keeps its custom form entirely).
Schema field order matches each route's guard order (parseBody
answers the FIRST zod issue — single-error behavior is
message-identical; multi-error precedence shifts only where DB-side
FK-existence checks previously interleaved the type guards, the §7.3
normalization: parseBody → FK checks → mutation).

- RED: `tests/schemas-crud.test.ts` NEW (the 126th suite) — the
  schema contract battery: every field's quadrant matrix
  (absent/null/`""`/whitespace/garbage-type/over-cap/valid), the
  default/clear semantics per family (the create-default enums —
  status "active", health "Healthy", stage "new", type "call"/
  "meeting", priority "normal"/"Standard"; the three-state PUT
  fields — absent no-change, null-clear, value-set), the contacts
  priority legacy mapping (hot/warm/cold → Key/Standard/At Risk),
  the settings quartet's absent→undefined (no-write) vs null→default
  semantics, the followUpDays int-truncation + 0-90 band, the
  photoUrl prefix contracts, the users name ≥2 rule, and the
  message-exactness of every rejection (the route's current strings).
- RED: `tests/crud-zod-seam.test.ts` NEW (the 127th suite) — the
  seam-adoption pins: the 12 migrated routes call
  `parseBody(req, <entity><verb>Schema)` (users: the route-local
  readBoundedJson + safeParse form with its divergent message); the
  guard-family imports retired from the migrated routes (asString/
  isBadFK/isBadString/isBadNumber/isBadDate/isBadBool/asFKId/
  asNumber/asInt gone — asString/asDate stay only where query-param
  GETs still use them: events from/to, reports/export/search period+q);
  reset keeps its custom confirm form; the FK-existence checks stay
  route-side (§7.3); the events merged-record invariant stays
  route-side; leads/[id] normalizes to parseBody-before-404; the
  "Request body too large" + "Invalid request body" 400 vocabulary
  rides parseBody (api.ts) for the 11 asString-family routes.
- GREEN-1: `src/lib/schemas.ts` gains the CRUD family — the field
  builders recasting the guard semantics (requiredString,
  clearableString, defaultedEnum, requiredOnPresentEnum, optionalEnum,
  fkId, clearableNumber, clearableDate, requiredDate, boolField, the
  settings listField + defaultable quartet, photoUrl) + the 13
  per-route schemas (accountCreate/Update, activityCreate/Update,
  contactCreate/Update, eventCreate/Update, leadCreate/Update,
  settingsUpdate, profileUpdate) — every message the route's current
  string, every default/clear quadrant the route's current semantics,
  every cap an honest `.max()` reject (F-166a3 — the new
  "must be reasonably sized" vocabulary, the s163 email precedent).
- GREEN-2: the 12 routes swap their guard ladders for
  `const parsed = await parseBody(req, XSchema); if (!parsed.ok)
  return parsed.response;` + the flat `if (body.X !== undefined)
  data.X = body.X;` patch writes (the three-state fields' null
  output IS the clear); the FK-existence fetches, the merged-record
  invariants (events end≥start, leads stage/closedAt), the settings
  range check (`days < 0 || days > 90` — the pinned literal), the
  derived-field logic (leads closed/status, activities completedAt)
  stay route-side; reset untouched; users PATCH keeps its divergent
  null-body message via the route-local seam form.
- Collateral re-anchors (expected, enumerated): the guard-form pins
  in `tests/api-robustness.test.ts` (the S37-P3 FK_SITES table, the
  S38-P2 photoUrl pins, the S40-P2/P3/P4 guard sweeps, the S41-P1
  lenient-create table, the S42-P2/P3/P4 forms, the S43-P1/P3
  forms, the S44-P1/P2 forms — the table ROWS keep their
  route+field+message triples; the assertion bodies re-anchor from
  the route's guard-call forms to the schema-seam forms: the route
  consumes the schema + the schema field carries the message), the
  `tests/body-pregate.test.ts` pins (the parseBody form replaces the
  readBoundedJson+tooLarge literals; the ordering pins re-anchor onto
  parseBody-before-DB), the `tests/source-vocabulary.test.ts`
  source pins (the free-form source contract re-anchored onto the
  schema's no-membership form), the dead-?? negatives (green-by-
  construction when the asString call retires), and the
  `src/lib/api.ts` hand-rolled-guard comment block (the adoption
  path completed — the helpers stay for the query-param GET family
  + their behavior battery, coercion-guards.test.ts).

### WP-2 — the doc-truth carriers + the live-census pins [F-166b/c/d/e]

- GREEN: README:118 → "29 REST route files, 41 verb handlers";
  PAD:296 mermaid ×27 → ×29; PAD:399 "9 spec files" → "10 spec
  files"; PAD §8.2 gains the three NEO_* rows (matching the
  `.env.example` + SKILL §3.3 six-knob contract).
- RED→GREEN: `tests/docs-counts.test.ts` +N — the L-165c1 root cure
  (the live-census doctrine): the four carriers pinned against the
  LIVE source tree (the route-file/handler census re-used; the e2e
  spec-file census read from tests/e2e/*.spec.ts; the README + PAD
  carrier forms asserted + the retired forms negated), so the next
  staleness on ANY face fails `bun run test`.

### WP-3 — the SKILL appearance fixes [F-166f + F-166g]

- GREEN: the head layer's duplicate `project_state:` key retired —
  the stale s141 layer comment-demoted beneath the live s165 layer
  (the house form: ONE YAML key, the retired layers as HTML
  comments); the mislabeled `<!-- session-143 layer -->` comment
  re-seated above the layer it actually names (the retired s141
  block), ending the stranded-comment drift.
- GREEN: SKILL Appendix A's ADR-007 duplicate row removed (the
  index re-read; no count pin rides the ADR rows).

### WP-4 — the count ladder + the version layer

- `tests/docs-counts.test.ts` constants: UNIT 2382 → 2432 (+50:
  schemas-crud +39 · crud-zod-seam +11) · SUITES 125 → 127 (the two
  NEW suite files) · E2E 161 held (no new e2e checks — the migration
  is behavior-preserving, the standing e2e suite IS the parity
  proof) · badge 2543 → 2593.
- Every live-tense count site re-anchored atomically (the
  count-ladder script, assert-first, idempotent, unique-anchor):
  README badge + Tested row + the testing-section phrase · AGENTS
  the gate-line + the Session-166 section · CLAUDE the four
  dialog-geometry carriers + the pyramid sites · PAD Total + HEAD +
  the session-166 inventory row · SKILL v1.162.0 → v1.163.0 + the
  s166 head layer (the s165 layer comment-demoted) + §14's Zod
  reality line (the CRUD family migrated — the "incremental path"
  note retired) + Appendix B's unit-total row.
- The negatives ladders grow: the retired 2382/125/2543/v1.162.0
  forms join the stale-form negatives (the convention).

### WP-5 — the docs + the verification + the captures

- `docs/session_353.md` (the odd-number canonical session record);
  the plan's own execution record (the TDD ledger + the count
  ladder + the in-flight calibration fixes); the repo worklog entry;
  AGENTS Session-166 section; PAD session-166 inventory row.
- The verification chain: lint · typecheck · unit (127/2432) ·
  build (29 routes) · e2e 161/161 (the migration's parity proof)
  · db census.
- The captures 401-404 (the round's subject surfaces — the CRUD
  family the schemas now guard: the accounts list + the account
  create dialog at phone + desktop), saved under
  `docs/screenshots/`.

### WP-6 — the commit + the push

- `git commit` on main (the Conventional Commit + the session
  mega-message, the house convention).
- The push via `docs/ssh_git_wrapper_v3.py` (the runbook:
  `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`) — operator key
  materialized to a 0600 file, shredded after; remote-ref
  verification; NO new branches.

## 2. The validation of this plan against the codebase

- All 13 routes read in full (the guard ladders, the check orders,
  the message vocabulary, the three-state patch semantics — the
  census this plan's schema design rides).
- The pin batteries censused: api-robustness (the 110 guard-form
  references across the S37-S44 describe blocks), body-pregate (the
  13-route seam pins + the F-69a3 ordering proof), source-vocabulary
  (the leads/contacts source literal pins), settings-defaults-parity
  (the `days < 0 || days > 90` route-side literal — kept route-side),
  settings-profile-parity (the users readBoundedJson form), the
  coercion-guards pure battery (stays valid — the helpers stay
  exported), activities-calendar-parity (the GET orderBy literal —
  preserved byte-exact in the swap), accounts-rail-parity (negative
  forms — unaffected).
- The e2e surface censused: the oversized-body probe hits
  /api/settings with an UNKNOWN key ("note") under the cap —
  z.object's default strip (not strict) keeps the honest 200; the
  too-large probe rides parseBody's tooLarge branch (same message).
- The Zod 4.6.7 semantics probed live (scripts/zod-probe-s166.ts):
  `z.string({ message })` type errors carry the message; unions
  take `{ error }`; issue order follows field order; object-level
  `{ error }` covers the non-object body case; trim-before-checks;
  preprocess+optional three-state outputs.
- The db path, `.env`, `.env.example`, vitest + playwright configs:
  standing at the s165 ship state (the operator checklist) — no
  environment work this round.

---

## 3. The execution record (the TDD ledger)

Executed 2026-10-22, from the fresh clone at `0abf8a3` (the
interrupted first execution's provenance note in §0). The gate chain
at ship: lint 0/0 · tsc 0 · **127/2454** unit · build (29 routes) ·
e2e **161/161** (the migration's parity proof).

| WP | RED | GREEN | Notes |
|---|---|---|---|
| WP-1 | 69 failing across the two NEW batteries (schemas-crud 38 + crud-zod-seam 31; 6 current-state pins green at birth) | the schemas + the 12 route swaps + the api.ts comment re-anchor | The in-flight calibration catches: the Zod 4 optin rule (the create normalization moved into non-optional nullable cores — an absent key short-circuits `.optional()` fields before any preprocess); the required-on-present enum's null routing (null rides the VALUE message — the guard chain's own coercion, not the type predicate); the create-field absent → null fill (the PUT three-state stays undefined). |
| WP-1 collateral | 108 failing (the expected re-anchor face) | api-robustness 212/212 · body-pregate 5/5 · source-vocabulary 4/4 | The table ROWS kept their route+field+message triples; the assertion bodies flipped to the schema-seam census + the parsed-field consumption forms (the s163 precedent — the strongest behavioral pins live in schemas-crud, the wiring pins in crud-zod-seam). |
| WP-2 | 4 failing (the carrier pins) | the four carriers flipped + the live-census pins GREEN | The SITE-FORM anchor doctrine applied: history rows may QUOTE the retired forms in arrow phrasing, never the carrier constructions themselves. |
| WP-3 | (appearance fixes — no battery) | the single-key frontmatter + the ADR-007 dedup | The s141 layer comment-demoted; the orphaned s143 tail folded under its re-seated comment; the s165 layer demoted beneath the s166 head at WP-4. |
| WP-4 | (the ladder) | 127/2454 lockstep GREEN | The count re-census mid-ladder: the four carrier pins grew the suite AFTER the first pass (2450 → 2454, badge 2611 → 2615) — L-166c3. The head-layer pin co-flips: the H1 version site, the §14 Zod-reality pin (the completed-adoption form), the PAD commands row, the "beneath it" layer-axis phrase. |

The captures 401-404 (the accounts + contacts pages at phone +
desktop, the VLM battery confirming the signed-in data surfaces) +
`session_353.md` + the worklog entry + the AGENTS Session-166 section
+ the PAD session-166 inventory row closed the round.
