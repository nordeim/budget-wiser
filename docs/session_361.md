# Session 361 — THE ERROR-BOUNDARY FAMILY + THE BOOT GATE + THE SMOKE LEG + THE ARTIFACT HYGIENE + THE DOCTRINE-STRAGGLER CLOSURE (session-170)

Date: 2026-10-23 · Rotation: 170 · Operator task: audit + validate the
session-169 ship (the CLAUDE-doctrine closure + the stack-facts
live-census + the production secret gate), remediate the findings
TDD-first, align the docs, capture the screenshots, push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## The baseline that named the round

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **130/2559** (the s169 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** (3.6 m clean run) |
| probe:ref | STABLE (bundle md5 `46bc2d9c…` — the s168/s169 fingerprint; every standing layer verified) |
| drift gates | the desktop + phone sweeps **CLEAN** live this round (0.5pct margin) |
| mobile drawer | **7/7 PASS** live at 390×844 — the operator's particular emphasis, live-verified, no Tailwind v4 regression |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored `tw-animate.css` · literal-hex `@theme` tokens) |
| sitemap + robots + manifest | 11 routes / standing / standing (source-verified) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The scandihaven reference round: the s169-deferred ports ADOPTED (the
`instrumentation.ts` boot gate + the `error.tsx`/`global-error.tsx`
boundary family + the stale-chunk self-heal — "its own rotation: a new
visual surface", this one) + the web-app-foundation §13.4/§14 smoke leg
ADOPTED (the gate-order step the repo never had); the axe-core a11y
gates + fast-check property tests still deferred (new devDeps — the
no-mid-rotation-bump posture holds).

## The finding register (twenty-one, all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-170a | **The standalone production artifact shipped the repo's private content**: `.env` (the real AUTH_SECRET + DATABASE_URL), `.git/` (171 MB — the full history), `db/` (the dev SQLite with user rows + scrypt hashes), `uploads/`, `skills/` (194 MB — the 248-skill bank), `docs/` (49 MB), `dev.log`, `worklog.md`, `test-results/`, the five engineering docs, `scripts/`, `tests/` — ~550 MB where ~151 MB suffices. ROOT CAUSE: the upload family's runtime-computed fs paths make `@vercel/nft` trace the whole `outputFileTracingRoot` (2715 skills files in the upload route's nft.json alone); `.env` rides TWICE (the trace + Next's own `writeStandaloneDirectory` `loadedEnvFiles` copy — immune to excludes). | **Critical** |
| F-170b | Zero error boundaries in `src/` — an uncaught render error shipped Next's stock crash page (no brand, no recovery, no digest, no stale-chunk self-heal). | High |
| F-170c | No boot gate — the s169 secret gate is a runtime seam (the first session op); a misconfigured production boot failed late or never signaled (the §6.2 posture prescribes fail-fast AT BOOT). | High |
| F-170d | No smoke leg — the §13.4/§14 gate order's missing step (nothing boots the artifact and asserts the 401/400/429/health/page contracts between build and e2e). | Medium |
| F-170e | AGENTS' live-tense reports-pipeline doctrine cited the RETIRED `REPORTS_PIPELINE_SLUGS` + the nonexistent `reportsBucketCounts` + the retired merged-list quirk as current practice. | High (doc) |
| F-170f | PAD §5.2's "DEFINITIVE" color table: four stale hexes + the missing line-strong + the mis-attributed placeholders row + the `#111827` contrast sentence (the LAST un-flipped color carrier). | High (doc) |
| F-170g | The session-gating counts wrong in three places (PAD §3.1's phantom "search's public shell" · PAD §6.1's "19 sessioned / 10 sessionless [8 verbs]" · SKILL §5.2's "all session-gated"). LIVE: 19 gated / 10 ungated. | Medium |
| F-170h/i/j | The AGENTS straggler family: the retired FUNNEL_STAGES labels · the s13-era chart-component claims (PipelineBarChart/WonLostLineChart/FunnelBarChart in the present tense) · the singular `neo-crm.leads.view` key. | Medium |
| F-170k | The AGENTS Commands table omitted seven package.json scripts (the drift-gate family it elsewhere calls doctrine). | Medium |
| F-170l | README's stale $9/$19/$39 pricing (live $8/$14/$20 since the s149 repricing). | Medium |
| F-170m/n/o/p/q | The PAD/SKILL carriers: the retired SavedReport listed + the live Opportunity missing (§4.2) · the stale CHART_COLORS note (§19) · §20's missing Opportunity interface · Appendix A's ADR-007 contradiction · §5.1's 12px-uppercase table-header claim. | Medium |
| F-170r/s/t/u | The small carriers: the radix ^1-for-all-6 row · the "with empty states" tree annotation · the #111827 contrast + the 16.3.6 literals · the MIT license claim with NO LICENSE file. | Low |

Out of scope (documented): axe-core a11y gates + fast-check property
tests (new devDeps); the 9 dev-toolchain advisories (the same posture);
RBAC; e2e specs that force the error boundaries (no honest trigger
without a debug affordance — the boundary contracts ride unit
source-pins + the live captures).

## The three experiments (verified live BEFORE the plan landed)

1. **The boot gate is real on this stack**: a minimal
   `src/instrumentation.ts` whose `register()` throws on production +
   missing AUTH_SECRET — Next 16.4.2 picks the file up, traces it into
   the standalone output, and the throw produces `Failed to prepare
   server Error: … loading instrumentation hook` — the server NEVER
   serves; the `phase-production-build` guard keeps `next build`
   secretless.
2. **The artifact-hygiene fix works**: `outputFileTracingExcludes`
   dropped the artifact from ~550 MB to ~151 MB carrying only
   `server.js` + `.next/` + `node_modules/` + `package.json` + `prisma/`
   + `public/` + `src/` + `next.config.ts` — and the photo-e2e pair ran
   GREEN against the clean artifact.
3. **The `.env` double-cure**: the exclude removes it from the trace;
   the build script's `rm -f .next/standalone/.env` removes Next's
   explicit copy. All experimental edits reverted before the TDD
   execution — the round re-landed them RED-first.

## The implementation (TDD — RED birth → GREEN, mutation-proven)

1. **WP-1 `tests/doctrine-census.test.ts`** (the 131st suite, +30): every
   doc finding pinned live-read — the constants, the types barrel, the
   globals.css tokens, the package.json scripts (the Commands-table
   completeness pin), the requireSession CALL-form grep, the landing
   price fields, the node_modules versions, the LICENSE file.
2. **WP-2 `src/lib/chunk-recovery.ts` + `tests/chunk-recovery.test.ts`**
   (the 132nd, +12): the scandihaven stale-chunk self-heal in the house
   pure-seam form — the message family, the injectable-clock cooldown,
   the guarded reload (unavailable storage DISABLES; the flag written
   BEFORE the reload).
3. **WP-3 `src/lib/boot-env.ts` + `src/instrumentation.ts` +
   `tests/boot-env.test.ts`** (the 133rd, +20): the pure
   boot-validation seam (the six-knob contract, warn-throw discipline)
   + the register() hook (the edge + build-phase skips) — production
   AUTH_SECRET missing/short THROWS AT BOOT; the site-url/NEO_*
   misconfigs warn; dev/test boot soft.
4. **WP-4 `src/app/error.tsx` + `src/app/global-error.tsx` +
   `tests/error-boundaries.test.ts`** (the 134th, +17): the boundary
   pair — the house-styled card on the not-found idiom, the digest ref,
   the reset() Try-again, the self-heal wiring; global-error renders its
   own html/body + imports its own globals.css; ZERO component-tree
   imports beyond the recovery seam.
5. **WP-5 `scripts/smoke-test.sh` + the gate wiring**: the §13.4/§14
   smoke leg — the standalone boot on :3210 with `db/smoke.db` + a
   dedicated throwaway secret; the 14-check ladder (health · the unauth
   401s · the login round-trip + the neo_session cookie · the sessioned
   envelope · the Zod 400 · the valid create · the logout data:null
   face · the 11th-login 429 · the page titles · the
   sitemap/robots/manifest family · THE BOOT-GATE PROBE · THE
   ARTIFACT-HYGIENE assertions); `package.json`'s `smoke` script + the
   `gate`/`gate:full` chains insert it between build and e2e;
   `next.config.ts`'s `outputFileTracingExcludes` + the build script's
   `rm -f` (the artifact-hygiene double-cure).
6. **WP-6 the ~21 doc flips**: every flip riding its WP-1 pin (the
   AGENTS doctrine bullets + the Commands table's 8 new rows + the
   gate-order smoke step · the PAD §5.2/§5.1/§3.1/§6.1/§4.2 + ADR-015 +
   the §11 rows + the session-170 inventory row · the SKILL v1.167.0 +
   the s170 head layer + the radix/§5.2/§8/§19/§20/AppA/AppB fixes ·
   CLAUDE's build-table smoke row + the Error Handling section ·
   README's pricing + the tree's four new surfaces + the LICENSE file ·
   `.env.example`'s boot-gate posture line).
7. **WP-7 the count ladder**: UNIT 2559 → **2644** (+85: the four batteries +79 + the inventory-census's six new §11-row pins) · SUITES 130 →
   **134** · E2E 161 held · badge 2720 → **2805** — every live-tense
   site re-anchored atomically (`count-ladder-170.py` +
   `skill-head-170.py`/`skill-head-fix-170.py`, assert-first,
   idempotent — the re-runs verified as 0-flip no-ops) + the collateral
   re-anchors (the gate-script chain pins, the docs-counts constants,
   the space-y census 21/117 → 23/123, the inventory-census
   next.config.ts row 47 → 93, the Appendix B totals + the ~21 s
   wall-clock).

## The TDD ledger

- RED birth: doctrine-census **26 failing + 4 born-green census
  anchors** (every failure a finding); chunk-recovery / boot-env /
  error-boundaries failing at the missing surfaces. THREE live-caught
  calibration catches at birth (the pin-form/flip mismatches — the
  L-169c1 lesson applied to this round's OWN pins; the commands-table
  `bun run <key>` documentation form; the **census-overcount trap**: the
  bare-name requireSession grep counted me/route.ts's "NOT gated"
  COMMENT — the CALL form `await requireSession(` is the truth: 19
  gated / 10 ungated, the L-168c2 lesson recurring at birth).
- TWO live-caught smoke-script defects at the live run: check 09's
  contact status vocabulary ("new" is a LEAD status — contacts ride
  active/inactive); check 10's `/api/auth/me` expectation (the route is
  the by-design data:null face, session-41 — NOT a 401).
- ONE head-surgery tooling defect (the first-pass script landed the
  live line in the wrong position — the corrective script re-seated it;
  both idempotent) + ONE live-caught process lesson at the captures
  (`pkill -f server.js` never matches the RENAMED `next-server`
  process — the L-128b1 lesson, live again) + ONE capture-pass
  discovery (a root-layout throw ABORTS the build at the static
  prerender — the NEXT_PHASE guard is the capture form).
- The mutation-proof: the planted badge regression (2805 → 2720) →
  exactly 1 RED → reverted → GREEN.

## The verification

lint 0/0 · tsc 0 · **134/2644** unit · build (29 routes, the ~151 MB
hygienic artifact) · **SMOKE 14/14** (the new leg — the boot-gate
refusal probe + the artifact-hygiene assertions included) · e2e
**161/161** · db census MATCH · the drift-gate argument carries (the
round's visual surfaces are failure-path-only — the boundaries render
nowhere on the happy path; the sweeps + probe:ref + the drawer battery
re-verified at the audit leg).

## The captures (417-420)

The round's subject surfaces — the boundary pair, captured LIVE against
the PRODUCTION build via temporary uncommitted throw patches (reverted
immediately after; the committed tree carries no debug affordance):
**417/418** the route-segment boundary (a client render error in the
login card) at phone + desktop · **419/420** the root boundary (a
root-layout error, the NEXT_PHASE-guarded capture form) at phone +
desktop. The VLM battery 4/4: the house-styled card, the copy
vocabulary, and the global pair's digest ref (`(ref: 411594…)`) all
verified on the rendered surfaces.

## The lessons

L-170c1 the census-overcount trap has a comment-match genus — a
bare-name grep counts "NOT gated by design" comments as gated; the CALL
form (`await requireSession(`) is the truth (the L-168c2 lesson's
string-shape corollary) · L-170c2 the artifact is a deliverable —
anything the tracer over-includes SHIPS (the excludes + the smoke
leg's hygiene assertions police it forever; the ~400 MB of accidental
content was invisible for 169 sessions because no gate ever looked INSIDE
the artifact) · L-170c3 a root-layout throw aborts the build at the
static prerender — the NEXT_PHASE guard is both the capture form AND
the reason the boot gate skips the build workers · L-170c4 the renamed
`next-server` process survives `pkill -f server.js` — kill by the
`next-server` comm (the L-128b1 lesson, live again at the capture leg).
