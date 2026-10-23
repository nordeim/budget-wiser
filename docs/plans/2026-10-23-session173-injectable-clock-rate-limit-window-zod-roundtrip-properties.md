# The session-173 plan — THE INJECTABLE CLOCK SEAM + THE RATE-LIMIT WINDOW PROPERTY FAMILY + THE ZOD ROUND-TRIP PROPERTY FAMILY

Date: 2026-10-23 · Rotation: 173 ·
Task: audit + validate the session-172 ship (the dialog-surface named-control
closure + the fast-check property family), remediate the findings TDD-first,
align every doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `cfa9506` (the s172 ship `c6c2e94` + its session-log
commit; fresh-clone intake: `bun install` → `.env` with a fresh 64-char
AUTH_SECRET + `file:../db/custom.db` → the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command → `db:push`/`db:seed`
→ census MATCH 15/24/10/23/12 + 4 users → playwright chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **137/2697** (the s172 ship state) |
| build | GREEN (29 routes, the ~151 MB hygienic artifact) |
| smoke | GREEN **14/14** (incl. the boot-gate probe + the artifact-hygiene assertions) |
| e2e | GREEN **192/192** |
| probe:ref | **STABLE** (the bundle md5 fingerprint — the fresh reference probe, the candidate #3 re-verification) |
| drift gates | the desktop + phone sweeps **CLEAN** live |
| mobile drawer | **7/7 PASS** live at 390×844 (`scripts/drawer-battery-168.ts` — the candidate #1 re-walk) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored tw-animate) |
| sitemap + robots + manifest | 11 routes / standing / standing |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The rotation candidates (the s172 close's named list): the drawer interior
re-walk (covered by the 7/7 battery + the 8/8 link census re-verified at
the audit leg) · **a deeper property family — the schemas.ts Zod
round-trips + the rate-limit window arithmetic (the latter needs an
injectable clock seam)** · the s171-sanctioned register's re-verification
against a fresh reference probe (covered by the probe:ref re-run). This
round adopts the SECOND: the deeper property family. NO new devDep
(fast-check ^4.10.2 rides the s172 declaration — the no-mid-rotation-bump
posture holds trivially: this round bumps NOTHING).

### The seam findings (each verified live against the source)

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-173a | **`rateLimit()` reads `Date.now()` internally** — the fixed-window arithmetic (the reset crossing · the retryAfter ceiling · the remaining monotonicity) is NOT property-testable: a generator cannot drive the clock, so the window semantics live only under the example-based battery's wall-clock accidents. The s164 sweep ALREADY takes `now = Date.now()` (`sweepRateLimits` + the pure `computeWatermark` seam) — the rateLimit path never joined its own module's injectable form. | `src/lib/rate-limit.ts:33-34` | Medium | Verified |
| F-173b | **The rate-limit window invariants are unpinned as properties** — the fixed-window contract (a blocked key resets at the crossing · `retryAfterSec` ∈ [1, ceil(windowMs/1000)] · `remaining` decrements exactly once per allowed call and never moves while blocked · a fresh key's first call is always allowed) has no generated-input proof. | `tests/property.test.ts` (absent) | Medium | Verified |
| F-173c | **The Zod schema round-trip properties never landed** (the other half of the s172-named deeper family) — the s166 seam's field vocabulary (the create-defaults quadrant · the enum membership · the email trim/lowercase contract · the PUT three-state · the required-name quadrant · the contacts legacy priority mapping) carries only example-based pins; the ADR-017 doctrine ("new pure seams ship with a property pin") applies to the seam's OWN invariants. | `tests/property.test.ts` (absent) | Medium | Verified |

Out of scope this round (documented, not silently dropped): the drawer
interior re-walk (covered: the 7/7 battery + 8/8 link census re-run at the
audit leg); the sanctioned register's re-verification (covered: the
probe:ref STABLE re-run — the reference unchanged since the s168
fingerprint); the 9 dev-toolchain advisories (the standing posture).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the property battery extension (the family grows in place)

`tests/property.test.ts` (+~10 checks, the P-lettering continues) — one
property per invariant, every generator respecting the seam's OWN domain
contracts (the L-172c3 doctrine):

- **P-h the create-defaults round-trip**: an input carrying ONLY the
  required field(s) parses SUCCESS for every CREATE schema
  (account/activity/contact/event/lead) and the output carries the
  documented defaults (status "active" · health "Healthy" · type "call" ·
  status "scheduled" · priority "normal" · stage "new" · allDay false ·
  priority "Standard" — the s166 quadrant table).
- **P-i the enum membership invariant**: a value drawn from the live
  vocabulary parses to its trimmed self; a value OUTSIDE the vocabulary
  rejects (the membership refine).
- **P-j the email contract**: `loginSchema`/`signupSchema` parse a
  generated `  USER@Example.COM  ` form to the trimmed + lowercased
  address (the shared emailField seam).
- **P-k the PUT three-state round-trip**: for a clearable field, absent →
  the key is ABSENT from the output (no write); null → null (the
  explicit clear); a valid value → the trimmed value.
- **P-l the required-name quadrant**: null/""/whitespace-only names
  reject with the route's exact message for every CREATE schema.
- **P-m the contacts legacy priority mapping**: hot/warm/cold map to
  Key/Standard/At Risk; the direct vocabulary passes verbatim.
- **P-n the fixed-window reset invariant** (RED at birth — F-173a): with
  the injected clock, a key blocked at t₀ is allowed again at
  t₀ + windowMs with a FRESH count (the crossing resets the bucket).
- **P-o the retryAfterSec bounds** (RED at birth): when blocked,
  1 ≤ retryAfterSec ≤ ceil(windowMs/1000); when allowed, 0.
- **P-p the remaining monotonicity**: each allowed call decrements
  `remaining` by exactly 1; blocked calls return 0 and change NOTHING
  (the count never moves while blocked).
- **P-q the first-call + default-clock equivalence**: a fresh key's
  first call is always allowed with `remaining = limit - 1`; the
  4-arg call at `Date.now()` matches the 3-arg default form.

The Zod family (P-h…P-m) lands as born-green freeze pins (the s172
P-b…P-g precedent — the seam's contracts stated as invariants); the
rate-limit family (P-n…P-q) REDs at birth against the unfixed seam
(the 4th argument is IGNORED at runtime, so the injected clock has no
effect — the window properties fail against the wall-clock truth).

### WP-2 — the rate-limit clock-seam examples (the seam's own suite)

`tests/rate-limit.test.ts` (+~3): the injectable `now` drives the window
(the crossing resets the count — the example the wall-clock battery
could never state); the default form equivalence (the 3-arg call === the
4-arg call at `Date.now()`); the blocked key's retryAfter ceiling. RED at
birth (the extra argument ignored → the crossing never observed).

### WP-3 — THE INJECTABLE CLOCK SEAM (the GREEN phase)

`src/lib/rate-limit.ts`: `rateLimit(key, limit, windowMs, now =
Date.now())` — the s164 `sweepRateLimits` form extended to the rateLimit
path (the module's OWN injectable precedent). PURELY ADDITIVE: the
default keeps `Date.now()`, all 7 call sites (login/signup/resend/
verify/forgot/reset-password/upload) ride UNCHANGED, zero behavior
change on the wire. The module doc gains the s173 clause.

### WP-4 — the docs lockstep

The count ladder (UNIT 2697 → the new count · SUITES 137 HELD · E2E 192
HELD · badge 2889 → the new count) via the house script form
(assert-first, idempotent, unique-anchor — count-ladder-173.py) · the
§11 re-anchors (`tests/property.test.ts` 316 → the live count ·
`src/lib/rate-limit.ts` 126 → the live count — the inventory-census
live-read catches both) · the AGENTS Session-173 section · the PAD
ADR-018 (the injectable-clock doctrine) + the session-173 inventory row
· the SKILL v1.170.0 frontmatter + H1 + the s173 head layer · the CLAUDE
property-family mention · the README Tested row · session_368.md + the
plan's execution record + the worklog entry.

### WP-5 — the captures

The standing surfaces at phone + desktop (the property battery's report
form + the rate-limit seam's green run) — the round is seam-only by
design; the captures document the standing surfaces.

## 2. The verification ledger (the final gate)

lint 0/0 → tsc 0 → the unit suite (137 suites / the new count) → build
(the hygienic artifact) → smoke 14/14 → e2e 192/192 → the drawer battery
7/7 re-run → probe:ref STABLE re-run → the sweeps CLEAN re-run (the
seam-only proof — no visual surface touched) → db census MATCH → the
mutation proof (the planted badge regression → exactly 1 RED → reverted
→ GREEN) → the stash-proof (the seam revert → its pins RED alone) →
commit `:zap: feat: session-173 …` → the SSH-wrapper push to main (the
runbook form) → the remote verification.

---

## The execution record (2026-10-23)

The plan executed TDD-first, in order:

- **WP-1** — `tests/property.test.ts` (+12, the P-lettering continues):
  RED birth 5 failing (P-n + P-o — the clock seam absent, the 4th
  argument ignored at runtime, the injected clock had no effect, the
  crossing never observed) + the Zod family (P-h…P-m) + P-p/P-q
  born-green freeze pins. FOUR live-caught calibration catches at RED
  birth (the L-172c3 doctrine live again): the P-k trimmed-output
  contract (the generator's raw value may carry its own whitespace —
  assert against the TRIMMED form) · the fc.date NaN edge (an INVALID
  Date hands toISOString() a throw before the schema ever sees the
  input — the integer-timestamp generator is deterministic and
  always in-range) · THE STATEFUL-SEAM KEY COLLISION (fc's
  short-string generator COLLIDES within 150 runs — the module-level
  bucket map persists across runs, a second run on a colliding key
  inherits the first run's count; the per-run monotonic run id is the
  cure: uniqueness is a property of the RUN, not of the generated
  input) · the P-p/P-q born-green ledger (the collision was their only
  RED face).
- **WP-2** — `tests/rate-limit.test.ts` (+3): the crossing example ·
  the retryAfter ceiling · the default-form equivalence + the additive
  signature source pin. RED at birth (the extra argument ignored).
- **WP-3** — THE INJECTABLE CLOCK SEAM: `rateLimit(key: string, limit:
  number, windowMs: number, now = Date.now())` — the s164
  sweepRateLimits form extended to the rateLimit path. PURELY
  ADDITIVE: the default keeps `Date.now()`, all 7 call sites ride
  UNCHANGED, zero behavior change on the wire. The module doc gains
  the s173 clause; the s164-era stale comment in the test file updated.
  The three-run stability re-verification: 47/47 × 3 consecutive
  runs.
- **WP-4** — the docs lockstep: the count ladder 2697 → 2712 (+15) ·
  SUITES 137 HELD · E2E 192 HELD · badge 2889 → 2904
  (count-ladder-173.py + skill-head-173.py, assert-first, idempotent —
  the re-runs verified 0-flip no-ops). The collateral re-anchors: the
  N-67b signature pin · the dialog-geometry CLAUDE lockstep carriers
  (the retired 2697 forms joining the negatives ladder) · the
  inventory-census (property.test.ts 316 → 723 · rate-limit.ts 126 →
  133 — the §11 rows live-censused) · the docs-counts constants + the
  lineage comment + the F-106a1 layer-axis pin. The docs: the AGENTS
  Session-173 section · the PAD ADR-018 (the injectable-clock
  doctrine) + the session-173 inventory row + the two §11 re-anchors ·
  the CLAUDE property-pyramid extension (13 → 25 checks) · the README
  Tested row's s173 property mentions · the SKILL v1.170.0 + H1
  lockstep + the s173 head layer (the s172 layer comment-demoted at
  its ship counts).
- **WP-5** — the captures 429-432 (the login funnel surface at
  desktop · the drawer-open standing contract at phone · the dashboard
  parity anchor at desktop · the leads CRUD schema surface at phone).
- **The verification ledger** — lint 0/0 · tsc 0 · 137/2712 · build
  (the hygienic artifact) · smoke 14/14 · e2e 192/192 · db census
  MATCH · the mutation proof (the planted badge regression 2904 →
  2889 → exactly 1 RED → reverted → GREEN) · THE STASH-PROOF (the
  seam reverted alone → exactly the 5 clock-seam pins RED → restored
  → 47/47 GREEN) · THE SEAM-ONLY PROOF (the standing legs re-verified
  at the audit leg: the drawer 7/7 · probe:ref STABLE · the sweeps
  CLEAN — the round's diff carries no visual surface).
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
