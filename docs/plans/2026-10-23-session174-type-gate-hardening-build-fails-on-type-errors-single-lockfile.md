# The session-174 plan — THE TYPE-GATE HARDENING (the build fails on type errors) + THE FULL-STRICT FLIP + THE SINGLE LOCKFILE

Date: 2026-10-23 · Rotation: 174 ·
Task: audit + validate the session-173 ship (the injectable clock seam + the
rate-limit window property family + the Zod round-trip property family),
remediate the findings TDD-first, align every doc, capture the screenshots,
and push to `git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `25f1847` (the s173 ship `44dbec5` + its two session-log
commits; fresh-clone intake: `bun install` → `.env` with a fresh 64-char
AUTH_SECRET + `file:../db/custom.db` → the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command → `db:push`/`db:seed`
→ census MATCH 15/24/10/23/12 + 4 users → playwright chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **137/2712** (the s173 ship state) |
| build | GREEN (29 routes, the ~151 MB hygienic artifact) |
| smoke | GREEN **14/14** (incl. the boot-gate probe + the artifact-hygiene assertions) |
| e2e | GREEN **192/192** |
| probe:ref | **STABLE** (the bundle md5 fingerprint — the reference unchanged since the s168 fingerprint) |
| drift gates | the desktop + phone sweeps **CLEAN** live |
| mobile drawer | **7/7 PASS** live at 390×844 (`scripts/drawer-battery-168.ts`) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored tw-animate) |
| sitemap + robots + manifest | 11 routes / standing / standing |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The rotation trigger this round is THE REPO'S OWN NEWEST ARTIFACTS: commit
`25f1847` (the s173 close's follow-up) added `skills/web-application/SKILL.md`
v1.0.0 — the generalized distillation of the four-sibling family — plus
`skills/web-application/codebase-evaluation-report.md`, the comparative audit
that ranks neo-crm #1 (8.55 weighted) while naming its register of defects.
The report's §9.2 graft list prescribes exactly three neo-crm hardening
moves; its findings register carries them at Medium/Medium/Low severity, all
Verified. The repo's own skill is now the audit lens (the code-wins rule
runs in reverse this round: the CODE disagrees with the repo's own
distilled doctrine — the code is what gets fixed).

The s173 close's named candidates (the drawer interior re-walk · the Zod
response-side round-trip · the fresh-bundle register re-derivation) all
stand covered by the standing legs re-run at this round's audit leg (the
drawer 7/7 · probe:ref STABLE · the sweeps CLEAN). NO new devDep this round
(the no-mid-rotation-bump posture holds trivially: this round bumps NOTHING).

### The findings (each verified live against the source)

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-174a | **`next.config.ts` sets `typescript: { ignoreBuildErrors: true }`** — the build is NOT a type gate; a planted type error compiles GREEN into the deployable artifact (reproduced live at the mutation leg of this round). The type gate rides ONLY on the manual `bun run typecheck` step — a skipped-command hazard the family's own skill now forbids (`skills/web-application/SKILL.md` §2: "do NOT set `ignoreBuildErrors` — the build should be the type gate"; the evaluation report F-5 Medium Verified + §9.2: "From zero-balance: drop `ignoreBuildErrors` and make the build the type gate"). | `next.config.ts` (the `typescript` block + its scaffold-era comment) | Medium | Verified |
| F-174b | **`tsconfig.json` carries `"noImplicitAny": false`** — weakened strict mode (the report F-6 Medium Verified; §9.2: "From digma: enable full TS strictness (drop `noImplicitAny: false`)"). The flip probe surfaced exactly THREE implicit-any stragglers repo-wide — `scripts/sweep.ts:862` (`find = (k)`) + `:873` (`union = (x, y)`) against a bare `new Map()` — the inline twin of the fully-typed PURE seam at line 607. The entire `src/` tree is ALREADY clean under full strictness. | `tsconfig.json` + `scripts/sweep.ts:862,873` + `scripts/sweep.ts:837` (the untyped `cells` Map) | Medium | Verified |
| F-174c | **Two lockfiles committed** (`bun.lock` 162 KB + `package-lock.json` 344 KB) — the s61/s62 §16ba npm-world-parity rule, superseded by the repo's own new skill (Appendix A lesson 14: "Two lockfiles in one repo is a reproducibility bug — one package manager, one lockfile"; the evaluation report N-4 Low Verified). The npm-world path (`scripts/install_packages.sh`) installs by package NAME from the registry — it never consumed package-lock.json (verified: the script is a bare `npm install <tokens>`; the facts-census battery reads node_modules, not the lockfile). | repo root (`package-lock.json`) | Low | Verified |

Out of scope this round (documented, not silently dropped): the standing
dev-toolchain advisories (the 9-advisory posture, PAD-known-issues ledger);
the recharts 2.15 major (N-3 — a deliberate parity decision, ADR-anchored);
the AGENTS/SKILL doc-size findings (N-1 — the archive restructure is its own
future round); the hosted-CI / PostgreSQL / shared-store-limiter /
email-transport items (the §9.3 deploy-time checklist — infrastructure, not
codebase); the 9 capitalized `.jsx` aliases (N-2 — intentional, documented).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — `tests/type-gate.test.ts` (the 138th suite, +~5 checks)

The config source-pin battery (the s171/s172 source-pin doctrine applied to
the TOOLCHAIN layer — the config files are seams too):

- **the build-is-the-type-gate pin**: `next.config.ts` carries NO
  `ignoreBuildErrors` in any form (comment-stripped) — the build must fail
  on type errors (F-174a).
- **the full-strict pin**: `tsconfig.json` carries `strict: true` and NO
  `noImplicitAny` override (comment-stripped) — the digma graft (F-174b).
- **the single-lockfile pin**: the repo root carries `bun.lock` and NOT
  `package-lock.json` — one package manager, one lockfile (F-174c; the
  `outputFileTracingExcludes` entry stays as the defensive tripwire).
- **the typed union-find pin**: `scripts/sweep.ts`'s inline twin declares
  the typed arms (`find = (k: number)` · `union = (x: number, y: number)`
  · the two typed Maps) — the F-174b stragglers can never regress (the
  s93 F-A fresh-clone-tsc precedent: the sweep tool's type posture is
  itself a gate surface).
- **the gate-chain pin**: the `gate` script keeps `typecheck` BEFORE
  `build` (fast gates first — the §15 order doctrine holds even now that
  the build also type-gates: the manual step stays the FASTER signal).

RED at birth: the first three its fail against the current tree (the
ignoreBuildErrors block present · the noImplicitAny override present · the
package-lock present); the sweep pin fails on the untyped arms.

### WP-2 — THE GREEN PHASE (the three config moves + the straggler typing)

- `scripts/sweep.ts`: the union-find inline twin typed to match its PURE
  seam twin — `find = (k: number)` · `union = (x: number, y: number)` ·
  `parent = new Map<number, number>()` · `cells = new Map<number, { px:
  number; x0: number; y0: number; x1: number; y1: number }>()` (the line
  607 form, verbatim).
- `tsconfig.json`: the `"noImplicitAny": false` line RETIRED (strict: true
  now means full strictness) — the s24 .jsx-alias comment above it stays
  (it documents `allowJs`, which stays).
- `next.config.ts`: the whole `typescript: { ignoreBuildErrors: true }`
  block + its scaffold-era comment RETIRED, replaced by the session-174
  doctrine comment (the build IS the type gate — the zero-balance graft
  per the repo's own evaluation report §9.2).
- `git rm package-lock.json` — the single-lockfile doctrine; the
  `outputFileTracingExcludes` entry stays (a defensive tripwire against
  accidental reintroduction shipping in artifacts).

### WP-3 — the proofs

- **THE GATE-PROOF (this round's non-vacuousness — the F-174a evidence
  live)**: plant a type error in a src file → `bun run build` FAILS (the
  new gate working) → then restore ONLY the old `next.config.ts`
  ignoreBuildErrors posture → the SAME plant builds GREEN (the swallowed
  error — the defect demonstrated, not asserted) → restore both → GREEN.
- **THE MUTATION-PROOF** (the house badge ritual): the planted badge
  regression (2909 → 2904) → exactly 1 RED → reverted → GREEN.
- **THE STASH-PROOF**: the three config moves reverted alone (the
  next.config block restored · the tsconfig line restored · the lockfile
  restored) → exactly the WP-1 pins RED → restored → GREEN.

### WP-4 — the docs lockstep

The count ladder (UNIT 2712 → 2717 [+5] · SUITES 137 → 138 · E2E 192 HELD
· badge 2904 → 2909) via the house script form (assert-first, idempotent,
unique-anchor — count-ladder-174.py) · the live-tense flag carriers
re-anchored (AGENTS:46 the gate-order paragraph · PAD:55 the stack-table
strict row · PAD:1509 the pre-ship checklist typecheck line · CLAUDE:81 ·
SKILL:175/234/236 the three config-table rows) · the AGENTS Session-174
section · the PAD ADR-019 (the build-is-the-type-gate doctrine) + the
session-174 inventory row · the SKILL v1.171.0 frontmatter + H1 lockstep +
the s174 head layer (the s173 layer comment-demoted at its ship counts) ·
the CLAUDE gate-order mention · the README Tested row + the lockfile
narrative rows where live-tense · session_371.md + the plan's execution
record + the repo worklog entry.

### WP-5 — the captures

The standing surfaces at desktop + phone (the round is config-only by
design — no component, no page, no className touched; the captures document
the standing surfaces at the new gate posture).

## 2. The verification ledger (the final gate)

lint 0/0 → tsc 0 (now under FULL strictness) → the unit suite (138 suites /
2717) → build (the hygienic artifact — now the type gate TOO, proven by the
gate-proof) → smoke 14/14 → e2e 192/192 → the drawer battery 7/7 re-run →
probe:ref STABLE re-run → the sweeps CLEAN re-run (the config-only proof —
no visual surface touched) → sitemap 11 routes standing → db census MATCH
→ the mutation proof → the stash-proof → the gate-proof → commit `:zap:
feat: session-174 …` → the SSH-wrapper push to main (the runbook form) →
the remote verification.

---

## The execution record (2026-10-23)

The plan executed TDD-first, in order:

- **WP-1** — `tests/type-gate.test.ts` (the 138th suite, +5): RED birth
  4 failing (the three config pins — the ignoreBuildErrors block
  present · the noImplicitAny override present · the package-lock
  present — + the typed-arms pin against the untyped union-find twin) +
  1 born-green (the gate-chain freeze pin). One live-caught pin
  calibration at birth: the typed-arms pin initially asserted the
  no-return-type form; the canonical form (matching the pure seam twin
  verbatim) carries `(k: number): number` — the pin re-anchored to the
  seam's own shape.
- **WP-2** — THE GREEN PHASE: the `ignoreBuildErrors` block RETIRED
  from next.config.ts (the `typescript` key stays UNSET — Next's
  default is the hardened form) · the `noImplicitAny: false` line
  RETIRED from tsconfig.json · the sweep.ts inline union-find twin
  typed verbatim like its pure seam (the typed Map surfaced the
  `parent.get(r)` `number | undefined` arms — cured with the pure
  seam's own non-null assertion form) · `package-lock.json` RETIRED.
  tsc 0 under FULL strictness; the type-gate pins 5/5 GREEN.
- **WP-3** — THE GATE-PROOF: the planted type error (a `const PLANT:
  number = "not a number"` in src/lib/constants.ts) → `bun run build`
  FAILED (RC=1, TS2322) under the hardened posture → the old posture
  restored → the SAME plant built GREEN (RC=0) — the swallowed error
  demonstrated live → both restored. THE MUTATION-PROOF: the planted
  badge regression (2909 → 2904) → exactly 1 RED → reverted → GREEN.
  THE STASH-PROOF: the three config moves reverted alone → exactly the
  4 type-gate pins RED → restored → 5/5 GREEN.
- **WP-4** — the docs lockstep: the count ladder 2712 → 2717 (+5) ·
  SUITES 137 → 138 · E2E 192 HELD · badge 2904 → 2909
  (count-ladder-174.py, 21 flips, assert-first, idempotent — the re-run
  a verified 0-flip no-op + skill-head-174.py, the s174 head layer +
  SKILL v1.171.0 + the H1 lockstep, idempotent). The collateral
  re-anchors: the PAD §11 next.config.ts row (93 → 99 lines — the
  inventory-census live-read catch again) · the dialog-geometry CLAUDE
  lockstep carriers · the docs-counts constants + the F-106a1
  layer-axis pin. The live-tense flag carriers: the AGENTS gate-order
  paragraph · the PAD stack-table strict row + the pre-ship checklist
  line · the CLAUDE TypeScript bullet · the SKILL's three config-table
  rows. The docs: the AGENTS Session-174 section · the PAD ADR-019 +
  the session-174 inventory row · the README Tested row + badge + the
  suite list's type-gate join · session_371.md + this execution record
  + the worklog entry (Task ID 174).
- **WP-5** — the captures 433-436 (the profile surface at desktop —
  the sweep's drift-gate face · the dashboard parity anchor at desktop
  · the drawer-open standing contract at phone · the accounts surface
  at phone; VLM-verified).
- **THE LIVE-CAUGHT ENVIRONMENTAL CATCH** (the L-171/L-172/L-173
  lineage): the desktop sweep's first run — pointed at the standalone
  :3217 server riding db/e2e.db — tripped a profile 1.25% drift;
  investigated live (the VLM comparison isolated the three faces) and
  root-caused as **e2e-suite residue in the e2e.db user row** (the
  profile-save test's name suffix + the photo-upload pair's photoUrl +
  the mutated avatarColor), NOT a code defect. Re-run the STANDING way
  (the dev server on :3000 with the pristine dev DB): both sweeps
  CLEAN. The lesson (L-174c1): the sweep's drift gate is only honest
  against the DB posture it was calibrated on — the zero-data pass
  keeps users by design, so an e2e-db sweep reads test residue as
  drift.
- **The verification ledger** — lint 0/0 · tsc 0 (under FULL
  strictness) · 138/2717 · build (the hygienic artifact — now the type
  gate TOO, gate-proven) · smoke 14/14 · e2e 192/192 · the drawer
  battery 7/7 (against the new hardened artifact) · probe:ref STABLE ·
  the desktop + phone sweeps CLEAN · sitemap 11 routes + robots +
  manifest standing · db census MATCH.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
