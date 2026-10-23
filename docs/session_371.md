# Session-174 — THE TYPE-GATE HARDENING + THE FULL-STRICT FLIP + THE SINGLE LOCKFILE

2026-10-23 · the post-173 audit round · shipped as the `:zap: feat:
session-174` commit on main.

## The rotation trigger

The repo's OWN newest artifacts: commit `25f1847` (the s173 close's
follow-up) added `skills/web-application/SKILL.md` v1.0.0 — the
generalized distillation of the four-sibling family (digma, neo-crm,
project-management, zero-balance; 1,226 combined commits of
build-and-remediate history) — plus
`skills/web-application/codebase-evaluation-report.md`, the comparative
audit that ranks neo-crm #1 (8.55 weighted) while naming its defect
register. The report's §9.2 graft list prescribes exactly the three
moves this round lands. The code-wins rule runs in reverse this round:
the CODE disagreed with the repo's own distilled doctrine — so the code
is what got fixed.

## The baseline (the exact s173 ship state, verified live this round)

lint 0/0 · tsc 0 · **137/2712** unit · build (the ~151 MB hygienic
artifact) · smoke **14/14** · e2e **192/192** · probe:ref STABLE (the
bundle md5 `46bc2d9c`, the sanctioned-register citations hold) · the
desktop + phone sweeps CLEAN live · the mobile drawer **7/7 PASS** at
390×844 · the Tailwind v4 state clean (the postcss plugin
`@tailwindcss/postcss` · CSS-first, no JS config · the vendored
tw-animate) · sitemap 11 routes + robots + manifest standing · db census
MATCH (15/24/10/23/12 + 4 users).

## The findings (each verified live against the source)

- **F-174a** — `next.config.ts` set `typescript: { ignoreBuildErrors:
  true }`: the build was NOT a type gate; a planted type error compiled
  GREEN into the deployable artifact. The type gate rode only on the
  manual `bun run typecheck` step — a skipped-command hazard. The repo's
  own skill §2 forbids it; the report §9.2 grafts the zero-balance form.
- **F-174b** — `tsconfig.json` carried `"noImplicitAny": false`:
  weakened strict mode. The flip probe surfaced exactly THREE
  implicit-any stragglers repo-wide — `scripts/sweep.ts:862` (`find =
  (k)`) + `:873` (`union = (x, y)`) against a bare `new Map()` — the
  inline twin of the FULLY-TYPED pure seam at line 607. The entire
  `src/` tree was already clean under full strictness.
- **F-174c** — two lockfiles committed (`bun.lock` 162 KB +
  `package-lock.json` 344 KB): the s61/s62 §16ba npm-world-parity rule,
  superseded by the repo's own new skill's Appendix A lesson 14 ("Two
  lockfiles in one repo is a reproducibility bug — one package manager,
  one lockfile"). The npm-world path (`install_packages.sh`) installs by
  package NAME from the registry — it never consumed the lockfile
  (verified: the script is a bare `npm install <tokens>`; the
  facts-census battery reads node_modules).

## The cure (TDD — RED birth 4 failing + 1 born-green → GREEN)

- **THE TYPE-GATE HARDENING**: the `ignoreBuildErrors` block RETIRED
  from `next.config.ts` (the `typescript` key stays UNSET — Next's
  default, `ignoreBuildErrors: false`, is the hardened form itself). The
  build IS the type gate now. The explicit `typecheck` script stays in
  the gate chain as the FASTER signal (the §15 fast-gates-first order
  holds).
- **THE FULL-STRICT FLIP**: `"noImplicitAny": false` RETIRED from
  `tsconfig.json`; the sweep tool's inline union-find twin typed
  verbatim like its pure seam (`find = (k: number): number` · `union =
  (x: number, y: number)` · `new Map<number, number>()` + the typed
  cells Map — the line-607 form).
- **THE SINGLE LOCKFILE**: `package-lock.json` RETIRED (`git rm`);
  `bun.lock` stands alone; the `outputFileTracingExcludes` entry STAYS
  as the defensive tripwire (an accidental reintroduction still never
  ships in an artifact).
- **The source-pin battery** — `tests/type-gate.test.ts`, **the 138th
  suite** (+5): the build-is-the-type-gate pin (no `ignoreBuildErrors`
  in any form, comment-stripped) · the full-strict pin (strict true, no
  `noImplicitAny` override) · the typed union-find pin (the s93 F-A
  family — the sweep tool's type posture is itself a fresh-clone gate
  surface) · the single-lockfile pin · the gate-chain freeze pin
  (typecheck stays BEFORE build).

## The proofs

- **THE GATE-PROOF** (this round's own non-vacuousness — the F-174a
  evidence live): a planted type error (`const PLANT: number = "not a
  number"` in `src/lib/constants.ts`) → `bun run build` **FAILED**
  (RC=1, `TS2322: Type 'string' is not assignable to type 'number'`)
  under the hardened posture → the OLD posture restored
  (`ignoreBuildErrors: true` back) → the SAME plant built **GREEN**
  (RC=0, "Compiled successfully") — the swallowed error demonstrated,
  not asserted → both restored → GREEN.
- **THE MUTATION-PROOF** (the house badge ritual): the planted badge
  regression (2909 → 2904) → exactly 1 RED → reverted → GREEN (36/36).
- **THE STASH-PROOF**: the three config moves reverted alone (the
  next.config block · the tsconfig line · the sweep typing + the
  lockfile restored) → exactly the 4 type-gate pins RED → restored →
  GREEN (5/5).

## The live-caught environmental catch (the L-171/L-172/L-173 lineage)

The desktop sweep's first run (pointed at the standalone :3217 server
riding `db/e2e.db`) tripped a **profile 1.25% drift** — investigated
live: NOT a code defect but **e2e-suite residue in the e2e.db user row**
(the profile-save e2e test's `" P"` name suffix + the photo-upload
pair's `photoUrl` + the mutated `avatarColor`), surfacing because the
sweep was pointed at the e2e-db server instead of the standing dev-db
posture. The VLM comparison isolated the three faces (the avatar letter
" P" vs "S" · the uploaded photo vs the fallback · the name suffix); the
dev DB queried pristine (`name: "sepnetflix2023"`, `photoUrl: null` —
the seed contract). Re-run the STANDING way (the dev server on :3000
with the pristine dev DB): **both sweeps CLEAN**. The lesson (L-174c1):
the sweep's drift gate is only honest against the DB posture it was
calibrated on — the e2e db accumulates user-row mutations the zero-data
pass never clears (it keeps users by design), so a sweep pointed at the
e2e-db server reads test residue as drift.

## The count ladder + the docs lockstep

UNIT 2712 → **2717** (+5) · SUITES 137 → **138** · E2E **192 HELD** ·
badge 2904 → **2909** — count-ladder-174.py (21 flips, assert-first,
idempotent — the re-run a verified 0-flip no-op) + skill-head-174.py
(the s174 head layer live, the s173 layer comment-demoted at its ship
counts 2712/192; SKILL v1.171.0 + the H1 lockstep). The collateral
re-anchors: the PAD §11 `next.config.ts` row re-censused 93 → 99 lines
(the inventory-census live-read catch again) · the dialog-geometry
CLAUDE lockstep carriers (the retired 2712 forms joining the negatives
ladder) · the docs-counts constants + the two lineage comments + the
F-106a1 layer-axis pin. The live-tense flag carriers re-anchored:
AGENTS's gate-order paragraph · PAD's stack-table strict row + the
pre-ship checklist line · CLAUDE's TypeScript bullet · SKILL's three
config-table rows (§2 stack + §3.2 next.config + §3.2 tsconfig). The
docs leg: the AGENTS Session-174 section · the PAD **ADR-019** (the
build-is-the-type-gate doctrine) + the session-174 inventory row · the
README Tested row + the badge + the suite list's type-gate join · the
plan doc `docs/plans/2026-10-23-session174-type-gate-hardening-build-
fails-on-type-errors-single-lockfile.md` + its execution record · this
session record · the repo worklog entry (Task ID 174).

## The verification ledger (the final gate)

lint 0/0 · tsc 0 (**under FULL strictness**) · unit **138/2717** ·
build (the hygienic artifact — **now the type gate TOO**, gate-proven) ·
smoke **14/14** · e2e **192/192** · the drawer battery **7/7 PASS** at
390×844 (against the new hardened artifact) · probe:ref **STABLE** ·
the desktop + phone sweeps **CLEAN** · sitemap 11 routes + robots +
manifest standing · db census MATCH. THE CONFIG-ONLY PROOF: the round
touched no component, no page, no className — the standing legs carry
the parity verdict unchanged (the reference unchanged since the s168
fingerprint).

## The captures

433-436 (`docs/screenshots/`): the profile surface at desktop (the
sweep's drift-gate face — the pristine demo user; VLM-verified: the
name reads `sepnetflix2023`, the page renders clean) · the dashboard
parity anchor at desktop · the drawer-open standing contract at 390×844
(VLM-verified: open with all 8 nav links) · the accounts surface at
phone.

## Suggested next steps

Verify the commit on GitHub. The next rotation candidates: the §9.3
hardening checklist's codebase-side items (the hosted-CI workflow port
of the local gate — the report's #2) · the doc-size restructure (N-1:
the AGENTS/SKILL session-history archives — the report's own doc-budget
rule) · the Zod response-side round-trip family (the READ half, the
s173 close's named candidate still unclaimed).
