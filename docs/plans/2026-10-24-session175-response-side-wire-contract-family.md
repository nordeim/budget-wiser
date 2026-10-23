# The session-175 plan — THE RESPONSE-SIDE WIRE-CONTRACT FAMILY (the READ half)

Date: 2026-10-24 · Rotation: 175 ·
Task: audit + validate the session-174 ship (the type-gate hardening + the
full-strict flip + the single lockfile), remediate the findings TDD-first,
align every doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `f5f96d6` (the s174 ship `483ecad` + the owner's three
follow-up commits: `066f9e5` session_372 — the s174 close-out transcript ·
`f9bc1bf` the skills expansion · `f5f96d6` the re-validated evaluation
report + the web-application v1.1.0 + the NEW web-application-engineering
sibling; fresh-clone intake: `bun install` → `.env` with a fresh 32-char
AUTH_SECRET + `file:../db/custom.db` → `db:push`/`db:seed` → census MATCH
15/24/10/23/12 + 4 users → playwright chromium 1248 installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN (full strictness — the s174 flip standing) |
| unit | GREEN **138/2717** (the s174 ship state) |
| build | GREEN (the type-gate build — 29 routes, the hygienic artifact) |
| smoke | GREEN **14/14** (incl. the boot-gate probe + the artifact-hygiene assertions) |
| e2e | GREEN **192/192** (after the environmental chromium-1248 install — the sandbox cache carried 1200; a fresh-sandbox intake step, not a code defect) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c` — the reference unchanged since the s168 fingerprint) |
| drift gates | the desktop + phone sweeps **CLEAN** live (margin 0.5pct over the standing baselines, the STANDING way — dev server :3000 + the pristine dev DB) |
| mobile drawer | the battery **GREEN** at 390×844 (the locks engage/release; the 10-check e2e mobile-nav suite rides the 192) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored tw-animate) |
| sitemap + robots + manifest | 11 routes / standing / standing |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |
| types↔wire agreement | verified across all six list entities + the auth/me carrier (see §0.2) |

### 0.1 The rotation trigger

The owner's newest commits. `f5f96d6` re-validated the comparative
evaluation report against the four repo HEADs: neo-crm stays **#1 at 8.70**
(the quality score 8.0 → 8.5 — "the three flagged costs were all retired by
session-174 within hours of the original evaluation, exactly the §9.2 graft
list"), and the updated `skills/web-application/SKILL.md` v1.1.0 + the NEW
`skills/web-application-engineering/SKILL.md` v1.1.0 carry the re-validation
lessons (the empirically load-bearing `env -u` discipline · the seed-through-
the-seam rule · the build-time NEXT_PUBLIC_SITE_URL note).

The session-371 close's named candidates for this rotation:
1. the hosted-CI workflow port (the report §9.3 #2),
2. the doc-size restructure (N-1),
3. **the Zod response-side round-trip family (the READ half — the s173
   close's named candidate still unclaimed)**.

### 0.2 The deferral register (open decisions, resolved with rationale)

| Candidate | Verdict | Rationale |
|---|---|---|
| The hosted-CI port (§9.3 #2, High) | **DEFERRED** | Two independent grounds. (1) The owner's own newest doctrine — `skills/web-application-engineering/SKILL.md` v1.1.0 §1 leads with "**The Local Gate is the Only Gate:** No hosted CI is trusted"; shipping a CI workflow against the repo's just-updated expressed posture would override the owner's own latest word on an OLDER recommendation (the report keeps CI on the "before any production deployment" checklist — a deployment milestone, not a repo defect). (2) The honest-evidence discipline: GitHub-runner execution is unobservable from this sandbox (a workflow file shipped "green" here would be a Verified-shaped claim without verification; a red first run on main is worse than the documented no-CI posture). Revisit when the owner signals the production-deployment milestone. |
| The doc-size restructure (N-1, Medium) | **DEFERRED** | Owner-level decision: the AGENTS/SKILL session-history archives ARE the repo's append-only rotation convention (174 sessions of count-ladder/docs-counts pins ride them). Condensing 12k SKILL lines to the family's ~1.3k doc budget is a deliberate destructive act, not an agent remediation. |
| Postgres / Redis rate-limit store / email transport / observability / Docker (§9.3 #3–#5, #7, #9) | **OUT OF SCOPE** | Deployment infrastructure requiring external runtimes/credentials unavailable in this environment; the repo documents the single-node SQLite posture as its design boundary. |
| Hash OTP codes at rest (§9.3 #6, Medium) | **ALREADY SATISFIED** | Verified live against the source: `verificationCodeHash` (scrypt, session-21) + `resetToken` storing `hashResetToken(token)` SHA-256 (session-164). The report's parenthetical ("neo-crm already hashes reset tokens") understated the repo's actual posture — BOTH secrets are hashed at rest. Nothing to fix. |
| recharts 2.15 → 3.x (N-3, Low) | **DEFERRED** | Major-version chart migration touching every visual surface; the standing pixel baselines would need re-derivation (its own rotation, like the toolchain-bump rule). The report marks it Low / "migration debt". |
| RBAC enforcement (§9.3 #8, Medium) | **DEFERRED (documented open)** | The PAD known-issues ledger already carries it: "single-workspace clone by design"; the reference app exposes no role-gated surface to mirror. Enforcing checks the domain does not require would be speculative. |

### 0.3 The chosen round

**THE RESPONSE-SIDE WIRE-CONTRACT FAMILY — the READ half.** The request
side got its Zod seam (s163/166: 12 routes, `parseBody` + the create/update
schemas) and its property family (s173: P-h…P-m — the create-defaults
quadrant, the enum membership, the PUT three-state). The READ side — what
`ok(rows)` actually ships to the client store — has NO battery: the wire
shapes (the routes' include select sets · the orderBy contracts · the
envelope's passthrough discipline · the Date→ISO serialization the client's
format family consumes · the null-preservation the `?? fallback` chains
depend on) ride entirely on the e2e's RENDERED output. A wire-shape
regression that keeps the UI rendering (e.g. a dropped joined field the
current seed never exercises as null) would land silently.

The audit's READ-side census (each verified against the source):

| Route | orderBy | include (the joined wire shapes) | envelope |
|---|---|---|---|
| `contacts` GET | `name asc` | `account{id,name}` + `owner{id,name,avatarColor}` | `ok(rows)` |
| `leads` GET | `createdAt desc` | `account{id,name}` + `owner{id,name,avatarColor}` | `ok(rows)` |
| `accounts` GET | `name asc` | `owner{id,name,avatarColor}` | `ok(rows)` |
| `activities` GET | `dueAt asc, createdAt desc` | `account{id,name}` + `contact{id,name}` + `owner{id,name,avatarColor}` | `ok(rows)` |
| `events` GET | `startAt desc` (+ the from/to window) | `account{id,name}` + `contact{id,name}` + `owner{id,name,avatarColor}` | `ok(rows)` |
| `opportunities` GET | `createdAt desc` | **none — raw rows** (the s31 second-deal-model: `owner` is a NAME string, not a relation) | `ok(rows)` |
| `auth/me` GET | — | the FULL `SessionUser` (`photoUrl` included — the canonical user carrier; the login response's slim 5-field shape has ZERO consumers — the login card reads only `body.ok`, documented divergence, not a defect) | `ok(user \| null)` |

The types↔wire agreement holds across every entity (`src/types/index.ts`
"API wire shapes" — the declared client shapes match the routes' include
select sets field-for-field). **Zero live defects found.** The round is
therefore a CONTRACT-FREEZE round (the s173 P-p/P-q born-green precedent +
the s174 config-freeze precedent): the family states the READ-side
invariants as named properties + source pins, and the mutation/stash proofs
carry the non-vacuousness.

## 1. The work packages

### WP-1 — the property family grows (P-r + P-s; `tests/property.test.ts`, the ADR-017 one-suite doctrine, the P-lettering continues)

- **P-r — the entity wire round-trip (the READ half of the s166 quadrant).**
  For every one of the six entities, a generated ROUTE-EXACT row (the
  vocabulary scalars from the s173 generator forms · in-range Dates as
  `Date` objects · nulls where the schema allows · the joined include
  shapes exactly as the routes declare them) → the wire serialization
  (`JSON.stringify` — the exact algorithm `Response.json` applies) → the
  parsed client-visible row:
  - every scalar survives verbatim;
  - every `Date` field lands as its **exact `toISOString()` form** (the
    client's format family consumes ISO strings);
  - every null stays **present-as-null** (the `?? fallback` chains);
  - the key set is **exact** — no field dropped (the undefined-drop hazard);
  - the joined include shapes survive intact.
- **P-s — the envelope pair contract.** `ok(payload)`'s wire form (driven
  through the REAL helper — `tests/parse-body.test.ts` proves the
  `@/lib/api` import chain works in vitest): `{ok: true, data}` — the
  two-key shape, the payload passed through UNTOUCHED beyond JSON's own
  canonicalization. `fail(code, message)`'s wire form: `{ok: false,
  error: {code, message}}` — the code and message verbatim (the toast's
  message survives the wire). The s35/s42 envelope doctrine stated as a
  property.

### WP-2 — the READ-half source pins (`tests/crud-zod-seam.test.ts` grows — the ROUTE-side suite's other half)

- the five include-carrying routes ship their **exact include select sets**
  (the wire contract the client templates render against);
- the six list routes' **orderBy contracts** (the sort orders the client's
  rendering order depends on);
- every GET answers **through the envelope** (`return ok(…)` — the s42
  doctrine: no raw reads);
- opportunities ships **raw rows — NO include** (the s31 second-deal-model);
- `auth/me` ships the **full SessionUser shape** (`photoUrl` included — the
  canonical user carrier).

### WP-3 — the proofs

- **THE MUTATION-PROOF** — plant a wire regression (an include select
  edited in a route's source → the source pin RED; a serialization mutation
  inside the property's expectation → the property RED); revert; GREEN.
- **THE STASH-PROOF** — the round's pins reverted alone → exactly the new
  checks RED; restored → GREEN.
- The standing legs re-run at the audit leg (already GREEN this session:
  probe:ref STABLE · the drawer · the sweeps — re-verified after the test
  changes for the closing ledger).

### WP-4 — the docs lockstep

The count ladder 2717 → 2717+N · SUITES 138 **HELD** (the one-suite
doctrine) · E2E 192 **HELD** (test-only round — no visual surface touched) ·
badge 2909 → 2909+N (`count-ladder-175.py` + `skill-head-175.py`,
assert-first, idempotent). The collateral re-anchors as censused. The docs:
the AGENTS Session-175 section · the PAD ADR-020 (the wire-contract
doctrine) + the session-175 inventory row · the CLAUDE property-pyramid
extension (the READ-half join) · the README Tested row · the SKILL v1.172.0
head layer · `session_373.md` + this plan's execution record + the worklog
entry (Task ID 175).

### WP-5 — the captures 437-440 (`docs/screenshots/`)

The standing evidence faces for a test-only round: the dashboard parity
anchor at desktop · the contacts surface (the include-rich wire's own face
— the joined account/owner columns) at desktop · the drawer-open standing
contract at phone · the leads surface at phone.

## 2. The TDD ledger (to be filled at execution)

- RED birth: the family is a **contract freeze over working code** (the
  s173 P-p/P-q born-green precedent) — the honest ledger records the
  born-green count and leans the non-vacuousness on the mutation + stash
  proofs.
- GREEN: the full unit suite at the new count; the gate chain re-run
  (lint · tsc · build · smoke · e2e) — the round touches NO product code,
  so the build/e2e legs prove the no-behavior-change claim.

---

## 3. The execution record (filled at ship)

- **WP-1 GREEN** — P-r (2 its: the round-trip deep-equal + the key-set
  over the six entities; the explicit Date-ISO contract per entity) +
  P-s (2 its: the ok() passthrough + the fail() verbatim arm, driven
  through the real helpers via `fc.asyncProperty`). 1 RED face at birth:
  the `fc.jsonObject` → `fc.jsonValue` fast-check 4.x API calibration
  catch; 8 born-green freeze pins (as planned — the s173 P-p/P-q
  precedent).
- **WP-2 GREEN** — the crud-zod-seam READ-half source pins landed as 5
  its (the include select sets · the orderBy contracts · the
  envelope-read pairs · the opportunities raw-row contract · the me
  SessionUser carrier).
- **WP-3 GREEN** — MUTATION-A (the contacts owner select lost
  avatarColor): exactly 1 RED, the include pin. MUTATION-B (ok()'s wire
  form grew a third key): exactly 1 RED, the P-s key-set pin. Both
  reverted → GREEN. THE STASH-PROOF: the round's two test files stashed
  alone → 138/2717; restored → 138/2726. The standing legs re-verified
  at the audit leg (probe:ref STABLE · the drawer · the sweeps CLEAN).
- **WP-4 GREEN** — the count ladder 21 flips (2717 → 2726 · badge 2909 →
  2918, count-ladder-175.py, the re-run a verified 0-flip no-op) · the
  collateral re-anchors LIVE-CAUGHT by the suite itself at the full-unit
  run (the PAD §11 property row 723 → 998 · the F-106a1 layer-axis pin
  · the F-92a3 hard-coded gate-order form — three pin-of-pins catches,
  the census policing the census) · the SKILL v1.172.0 + the s175 head
  layer (skill-head-175.py, idempotent) · the AGENTS Session-175 section
  · the PAD ADR-020 + the inventory row · the CLAUDE property-pyramid
  extension (25 → 29) · the README Tested row + badge · session_373.md ·
  the worklog entry.
- **WP-5** — the captures 437-440 landed + verified.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2726 · build (the
  type-gate artifact) · smoke 14/14 · e2e 192/192 · census MATCH ·
  probe:ref STABLE · the sweeps CLEAN · the drawer battery GREEN.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
