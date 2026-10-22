# The session-169 plan — THE CLAUDE-DOCTRINE CLOSURE + THE STACK-FACTS LIVE-CENSUS + THE PRODUCTION SECRET GATE

Date: 2026-10-23 · Rotation: 169 ·
Task: audit + validate the session-168 ship (the AGENTS-doctrine closure +
the inventory live-census), remediate the findings TDD-first, align every
doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `a7ea4c3` (the s168 ship `1525be5` + its session-log
commit; `.env` current — `file:../db/custom.db` with `db/` at the repo
root, a fresh 64-char AUTH_SECRET; the ambient `DATABASE_URL` scrubbed on
every DB-touching command — the documented sandbox class; census MATCH):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **129/2520** (the s168 ship state) |
| build | GREEN (29 routes; compiled CSS 293 `color-mix()` calls) |
| e2e | GREEN **161/161** (3.5 m clean run) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c…` — the s168 fingerprint; demo zero; the mobile-nav defect the reference's own, standing) |
| drift gates | desktop + phone sweeps **CLEAN** live this round (0.5pct margin); the remaining four carry the s168 CLEAN ×6 record at this exact tree (the round touches docs + tests + server-only code — no visual source) |
| mobile drawer | **7/7 PASS** live at 390×844 (`scripts/drawer-battery-168.ts`: trigger unique · rail hidden · data-state=open · 8/8 links · the MAIN-scroller lock · close-on-navigate + URL change · Escape + lock release) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored `tw-animate.css` · literal-hex `@theme` tokens) |
| sitemap + robots + manifest | 11 routes / standing / standing (source-verified: the ROUTES array + the byte-format route handlers) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The scandihaven reference round: its five port candidates evaluated —
**(1) the boot fail-fast env validation → adopted in the server-seam form
(WP-2: the production secret gate; the full `instrumentation.ts` boot
gate stays a next-rotation candidate, documented)** · **(2) the
stack-version lockstep pin → adopted (WP-1a: the version-carrier
live-census — the exact drift it exists to kill is live in this repo
today)** · (3) the stale-chunk self-heal + error boundary → deferred
(its own rotation: a new visual surface) · (4) the axe-core a11y gates →
deferred (a new devDep — the no-mid-rotation-bump posture) · (5)
fast-check property tests + scoped coverage → deferred (same posture) ·
the response-side Zod validation, DB-backed rate limiting, `@source`,
and `z.input`/`z.infer` colocation → rejected (already evaluated/closed
or wrong fit).

The findings, severity-ranked (every claim reproduced live against the
s169 tree — every line citation re-verified, every count re-derived from
the tree at the audit leg):

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-169a | **CLAUDE.md is the last un-flipped doctrine doc**: "Hand-rolled validation (`asString` / `asNumber` / `asDate` / enum membership) at every route boundary — no schema library by design" — the pre-s163/s166 position stated as current practice; the file carries ZERO occurrences of zod/parseBody/schemas.ts. The s165/s166/s167/s168 rounds flipped AGENTS, SKILL, README, PAD-ADR-003 — CLAUDE alone was never in scope (the named next-rotation candidate). | `CLAUDE.md:69-70` | Medium | Verified |
| F-169p | **The production AUTH_SECRET gate is a warn-once fallback, not a fail**: `secret()` falls back to `DEV_SECRET` with ONE console.warn when the secret is missing OR shorter than 16 chars in production — forgeable sessions with no hard failure. The web-app-foundation skill §6.2/§12 prescribes fail-hard ("A console.warn + insecure fallback ships forgeable sessions silently — this skill hardens that posture"); §12's checklist item "`AUTH_SECRET` present, ≥ 32 hex chars, fails hard in production" FAILS on this tree. **AND `.env.example` misdocuments it**: "a shorter value falls back to the insecure dev-only constant … rather than the hard error an unset value raises" — no hard error exists for EITHER face (unset falls back too). The L-164c3 doctrine: the repo's own distilled companion skill is the bar. | `src/lib/auth.ts:31-43` + `.env.example:33-36` | High | Verified |
| F-169f | **The version carriers drifted at the s163-era dep bump** (`04e367c`: next 16.3.6→16.4.2, playwright 1.63.0→1.64.1 — no version-carrier doc updated): README badge `Next.js-16.3.6` + table row `16.3.6` + Playwright row `1.63`; PAD stack-table rows `16.3.6` + `1.63`; SKILL §2 rows `` `16.3.6` `` + `` `1.63.x` ``. Live: next **16.4.2**, @playwright/test **1.64.1** (package.json + node_modules + the build banner all agree). | README:3,71,82 · PAD:53,65 · SKILL:141,153 | Medium | Verified |
| F-169b | **The sitemap stragglers — the F-168i fix's two missed siblings**: CLAUDE.md's "the nine-route sitemap.xml" + AGENTS.md's "a nine-URL `/sitemap.xml`" (live 11 routes since s142; s168 pinned README only). | `CLAUDE.md:343` · `AGENTS.md:767` | Medium | Verified |
| F-9 | **The pin-entrenched stale literal**: `docs/DEPLOYMENT.md` "the build compiles the page shell and the **27 API route handlers**" (live 29 route files / 41 verb handlers since s163) — AND the docs-counts pin at `tests/docs-counts.test.ts:1451-1455` asserts `toContain("the 27 API route handlers")` under the comment "must carry the live handler count (F-108a4)": **the pin itself entrenches the drift** — the L-165c1 genus ("a pin that checks doc-consistency with a constant never checks the constant against the thing it claims to census") alive inside the pin family. | `docs/DEPLOYMENT.md:14` + `tests/docs-counts.test.ts:1451-1455` | Medium | Verified |
| F-169k | **PAD's own doctrine contradictions**: §3.1 Layer-2 rule "hand-rolled validation at the boundary" (contradicts PAD's own ADR-003 L145-146: "The auth family validates through the Zod seam") + §6.1 rule 7 cites "`asString/asNumber/asDate/asOneOf`" — **`asOneOf` is a phantom helper** (0 matches in `src/`; the live set: `asString/asNumber/asInt/asDate/asFKId` + the `isBad*` predicates). | `PAD:336,661` | Medium | Verified |
| F-169l | **PAD's route tree says "auth(6: login signup logout me verify resend)"** (live 8 auth route files — `forgot-password` + `reset-password` joined at s163; contradicts PAD's own §6.1 "the public auth family's 8 verbs"). | `PAD:369-370` | Medium | Verified |
| F-169c | **CLAUDE.md's models list carries 8 of 9** — Opportunity (session-31) missing; every other doc says 9 (SKILL's row pinned by inventory-census). | `CLAUDE.md:478-479` | Medium | Verified |
| F-169d | **CLAUDE.md's env table carries 3 knobs** (live 6 — the s163 `NEO_PROXY_HOPS` + `NEO_DISABLE_IN_APP_OTP/RESET` family absent; README/PAD §8.2/SKILL §3.3/.env.example all carry them, pinned). | `CLAUDE.md:483-487` | Medium | Verified |
| F-5/F-3/F-4 | **SKILL §4.1's "@theme block (complete)" carries five stale tokens + a false label**: `--color-primary: #3b82f6` (live **#2563eb** — the session-7 re-pin), `--color-primary-hover: #2563eb` (live **#1d4ed8**), `--color-foreground: #111827` (live **#0a0a0a**), `--color-line: #e5e7eb` (live **#e5e5e5**), `--color-line-soft: #f3f4f6` (live **#f5f5f5**) + `--color-line-strong` missing entirely + the "(complete)" label over a ~30-token block while globals.css carries **127 `--color-*` tokens** (the s88 V3-PALETTE literal families never joined). **SKILL §19's mirror rows carry the same two stale primaries** (`primary #3b82f6` / `primary-hover #2563eb` — §19's own preamble: "fix both if either changes"; only the primary-FOREGROUND row is pinned). | `SKILL:242-301,6380-6381` | Medium | Verified |
| F-169h | **README's file tree is pre-s142 vintage**: "`(app)/ 📄 page.tsx  # Dashboard (/)`" — the file does not exist (removed s142; `/` is the public landing `src/app/page.tsx`; the dashboard lives at `(app)/dashboard/page.tsx`); the Hierarchy block omits `dashboard/`, `(marketing)/about|contact`, `src/app/page.tsx`, `reset-password/`. | `README:111-141` | Medium | Verified |
| F-169i | **README's Quick Start narrates the pre-s142 reality**: "Visiting `/` redirects to `/login`" (false — `/` serves the landing) + "Sign in … and land on a dashboard" (the post-login redirect is `fromUrl ?? "/"` — the landing, not the dashboard). Contradicts README's own Overview. | `README:170,172-173` | Medium | Verified |
| F-6 | **SKILL §20's cross-reference says "Environment interface (3 vars)"** (live 6 — §3.3's own heading, pinned, says 6; the s165 fix updated the heading, missed this mirror). | `SKILL:6530` | Low | Verified |
| F-169j | **README's gate line says "gate + the FOUR drift sweeps"** (live `gate:full` chains SIX drift gates — 4 viewport sweeps + `sweep:fullpage` + `census:interior`; the six-gate form pinned only against package.json). | `README:196` | Low | Verified |
| F-169m | **PAD ADR-003's rationale says "~129 auditable lines"** for auth.ts (live **171** — PAD's own §11 row, pinned by inventory-census, carries 171). | `PAD:147` | Low | Verified |
| F-13 | **AGENTS' pdf-export doctrine says "carries 242 `color-mix()` calls"** (the s25-era compiled-CSS count; the live compiled stylesheet carries **293** — verified against `.next/static/chunks/*.css` this round). The count is inherently build-dependent (unpinnable in the unit gate — no build before unit) → reframe to the count-free form. | `AGENTS.md:1028` | Low | Verified |
| F-11 | **AGENTS' metadata doctrine says "(the 8 inner wrappers + login + signup consume it; the dashboard inherits the root layout)"** (live: 13 primary pages consume `pageMetadata` — the 8 inner + login + signup + the marketing about/contact pair + reset-password; plus the 10 capitalized aliases). | `AGENTS.md:813-814` | Low | Verified |
| F-169n | **README's Tested row embeds the s98-era "space-y census re-anchored 110/18"** (live 21 files / 117 occurrences — pinned by dialog-geometry-parity:198). | `README:65` | Low | Verified |
| F-19 | **SKILL Appendix B's runtime prose is internally inconsistent**: the table says "unit … ~18 s" while the wall-clock paragraph says "unit ~15 s" (live ~19 s). | `SKILL:6582 vs 6597` | Low | Verified |
| F-12 | **AGENTS' unit-test doctrine bullet narrates "596 Vitest checks across 38 suites" in the live-tense layer** (live 129/2520; the sentence narrates the s13-s22 accretion but carries no era marker — ambiguous classification). | `AGENTS.md:468-469` | Low | Verified |
| F-169e | **CLAUDE's enumerations are stale-by-omission inside pinned-count carriers**: the unit enumeration names ~48 of 129 suites (ends at the s51-era + nav-config); the e2e enumeration names 8 of 10 spec files (missing `landing.spec.ts`, `marketing-mobile.spec.ts`, `reset-password.spec.ts`). | `CLAUDE.md:127-300,301-372` | Low | Verified |
| F-169s | **PAD §7.1 inventory-table structure**: the session-77 row sits BEFORE the session-76 rows (an inversion the s167 re-seating never touched) + the table jumps s126 → s131 with no rows for s127-s130. | `PAD:800-802,852-853` | Low | Verified |

Out of scope this round (documented, not silently dropped): dependency
bumps for the 9 dev-toolchain advisories (the no-mid-rotation-bump
posture); `instrumentation.ts` boot-gate + `error.tsx`/`global-error.tsx`
(the scandihaven ports — next-rotation candidates, each a new surface);
axe-core a11y gates + fast-check property tests (new devDeps — the same
posture); RBAC (the single-workspace Open row); the bundle-event watch
(probe:ref STABLE).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the facts live-census battery (the 130th suite)

`tests/facts-census.test.ts` — the L-165c1 doctrine extended to the
STACK-FACTS layer (the versions, the doctrine stragglers, the phantom
helper, the tree counts, the color mirror's unpinned rows):

- **(a) The version-carrier live-census (F-169f)**: the installed
  versions read LIVE from `node_modules/<pkg>/package.json` (next,
  @playwright/test, react, tailwindcss, prisma, zustand, vitest) — each
  doc's stack-table row asserted to carry the installed major.minor
  (README badge + table, PAD's stack table, SKILL §2's rows) + the
  retired forms absent (16.3.6, the 1.63 family). The next bump fails
  the census the day the docs drift.
- **(b) The CLAUDE doctrine pins (F-169a)**: the retired hand-rolled
  clause absent + the Zod-seam clause present — CLAUDE.md joins the
  docs pin family (the L-167c1 root-cure; the last doctrine doc
  unpinned).
- **(c) The sitemap stragglers (F-169b)**: CLAUDE's "eleven-route" +
  AGENTS' "eleven-URL" forms present (the ROUTES census read live) +
  both nine-forms absent.
- **(d) The CLAUDE facts pins (F-169c/d/e)**: the models list carries
  the 9-model family + Opportunity (the schema census read live) · the
  env table carries the six knobs (the NEO_* rows) · the e2e
  enumeration carries the three post-s150 specs.
- **(e) The PAD doctrine/tree pins (F-169k/l/m/s)**: §3.1's retired
  rule absent + the seam form present · §6.1's `asOneOf` absent + the
  live helper set present (asFKId) · the route tree's "auth(8" form
  (the live auth-route census) + "auth(6" absent · ADR-003's ~171 form
  (the live auth.ts line count) · the s76-before-s77 row order + the
  s127-s130 gap footnote present.
- **(f) The DEPLOYMENT re-anchor (F-9)**: "the 29 API route files" (the
  live route-file census read from the tree) + "the 27 API route
  handlers" absent — AND the docs-counts pin itself re-anchored from
  the stale constant to the live-read form (the L-165c1 root-cure
  applied to the pin family's own member).
- **(g) The SKILL color/facts mirror (F-5/F-3/F-4/F-6/F-19)**: §19's
  primary + primary-hover rows asserted against the LIVE globals.css
  tokens (the F-168h idiom extended to the two unpinned rows) · §4.1's
  five re-pinned tokens + `--color-line-strong` present, live-read ·
  the "(complete)" label retired for the scoped form · §20's "(6 vars"
  present / "(3 vars" absent · Appendix B's runtime prose consistent.
- **(h) The README quick-start/tree/gates pins (F-169h/i/j/n)**: the
  flipped tree form (the dashboard + marketing + reset-password
  entries present; the stale `(app)/ 📄 page.tsx # Dashboard` absent) ·
  the landing-reality Quick Start form + "redirects to /login" absent ·
  the six-gate form + "FOUR drift sweeps" absent · the Tested row's
  live space-y census (21/117, live-read with the dialog-geometry
  idiom).
- **(i) The AGENTS straggler pins (F-1/F-11/F-12/F-13)**: the
  eleven-URL form · the 13-primary-page consumer clause · the
  era-marked "596/38" form · the count-free color-mix clause.
- **(j) The production-secret doc pins (F-169p's doc face)**:
  `.env.example` carries the production fail-hard line + the retired
  false contrast absent; the README/PAD env-table default cells carry
  the production-fail note.
- Mutation-proof at birth per the house doctrine: plant a doc-value
  change → exactly the carrying pins go RED → revert → GREEN.

### WP-2 — the production secret gate (F-169p — the code leg)

`src/lib/auth.ts` `secret()`: production + (missing OR shorter than 16
chars) → **throw** the actionable error (the web-app-foundation §6.2
posture: fail hard, never ship forgeable sessions silently); dev/test
keep the DEV fallback (the warn-once preserved for dev only — the DX
story unchanged). RED first in `tests/auth.test.ts` (the s164
env-pinned battery idiom — beforeAll plants, beforeEach deletes,
afterAll restores): "production + missing → signSession throws" ·
"production + short → signSession throws" · "test-env + missing → the
DEV fallback verifies (the existing battery face, made explicit)".
Collateral: `.env.example`'s AUTH_SECRET comment + the README/PAD
env-table default cells flip to the true posture; e2e unaffected (the
playwright webServer sets a 27-char AUTH_SECRET); dev unaffected
(NODE_ENV=development); the standalone production server now refuses
the first session op with the actionable message instead of minting
forgeable cookies — the documented posture change.

### WP-3 — the stale-site closure (the GREEN phase)

The ~24 stale sites flipped (every flip riding its WP-1 pin): the
CLAUDE doctrine clause + models list + env table + e2e enumeration +
the era-marker on the unit enumeration · the README badge + table
versions + Playwright row + the file tree re-derivation + the Quick
Start reality + the six-gate line + the space-y clause · the PAD
stack-table versions + §3.1 rule + §6.1 helper set + the auth(8) tree +
the ~171 rationale + the s76/s77 row swap + the s127-s130 gap
footnote · the SKILL §2 versions + §4.1's five tokens + line-strong +
the scoped heading + §19's two rows + §20's 6-vars + Appendix B's ~18 s
· the AGENTS eleven-URL + the 13-page consumer clause + the era-marked
596/38 + the count-free color-mix clause · the DEPLOYMENT 29-route
form + the docs-counts pin's own live-read re-anchor.

### WP-4 — the count ladder

Derived AFTER the battery lands (L-166c3): UNIT 2520 → 2520+N ·
SUITES 129 → **130** · E2E 161 held (docs + server-seam only — the
standing e2e suite is the parity proof) · badge 2681 → 2681+N — every
live-tense site re-anchored atomically (`count-ladder-169.py`,
assert-first, idempotent, unique-anchor, the insertion guards FIRST —
the L-167/L-168 tooling lessons) + the SKILL **v1.166.0** frontmatter +
H1 lockstep + the s169 head layer (the s168 layer comment-demoted, the
single-key house form).

### WP-5 — the docs + the verification

`docs/session_359.md` (the odd-number canonical session record); the
plan's own execution record; the repo worklog entry (Task ID 169); the
AGENTS Session-169 section; the PAD session-169 inventory row. The
verification chain: lint · typecheck · unit (the new totals) · build
(29 routes) · e2e 161/161 · db census.

### WP-6 — the captures

The captures 413-416 (the round's subject surfaces — the auth pair the
secret gate hardens: the login + signup pages at phone + desktop),
saved under `docs/screenshots/`, VLM-verified per the house convention.

### WP-7 — the commit + the push

`git commit` on main (the session mega-message, the house convention).
The push via `docs/ssh_git_wrapper_v3.py` (the runbook:
`docs/how-to-git-push-using-ssh-wrapper_SKILL.md`) — operator key
materialized to a 0600 file outside the repo, shredded after;
remote-ref verification; NO new branches.

## 2. The validation of this plan against the codebase

- Every finding's line citation re-verified live at `a7ea4c3` (the
  byte forms quoted in the register; the version census via
  node_modules + package.json + the build banner — three agreeing
  sources; the color tokens via globals.css L37/38/66/85/86/92; the
  compiled color-mix count via `.next/static/chunks/*.css` = 293; the
  auth-route census = 8 dirs; the pageMetadata consumer census = 13
  primary pages + 10 aliases; the space-y census = 21 files / 117
  comment-stripped occurrences — the dialog-geometry idiom).
- The pin surface censused: the inventory-census family covers the PAD
  §11 Lines column + the SKILL inventory layer + the AGENTS doctrine
  pair + the README sitemap claims — the version carriers, CLAUDE's
  whole surface, the DEPLOYMENT line (and its own docs-counts pin),
  the §19 primary/primary-hover rows, the §4.1 block, the PAD doctrine
  lines, and the README tree/Quick-Start are all UNPINNED today (the
  root cause of the register); WP-1 closes each with a live-census or
  carrier pin.
- The auth battery's env-pinning pattern verified current in
  tests/auth.test.ts (the s164 construction — beforeAll/beforeEach/
  afterAll with the ambient AUTH_SECRET planted then deleted); the new
  production-gate pins extend the same battery (no new env-leak
  surface — the pins restore NODE_ENV in afterAll).
- The `secret()` seam's call surface censused: every session op
  (signSession, verifySessionToken, setSessionCookie/clear) rides it —
  the throw propagates through the typed catch → the 500 envelope;
  e2e sets AUTH_SECRET (playwright.config.ts:79, 27 chars ≥ 16); dev
  runs NODE_ENV=development — neither gate leg breaks.
- The round touches docs + tests + `src/lib/auth.ts` (server-only, zero
  visual surface) — the drift-gate argument from s164/s168 carries:
  the standing parity verdict holds (desktop + phone sweeps re-verified
  CLEAN live this round; the reference probe STABLE).
- The `.env` / `.env.example` six-knob contract verified current (the
  operator checklist item); `.env.example` is committed in the round's
  change set.

---

## 3. The execution record (the TDD ledger)

Executed 2026-10-23, from the pulled tree at `a7ea4c3` (the s168 ship
`1525be5` + its session-log commit). The gate chain at the audit leg:
lint 0/0 · tsc 0 · **129/2520** unit · build (29 routes) · e2e
**161/161** · probe:ref STABLE · the desktop + phone sweeps CLEAN live ·
the mobile drawer 7/7 at 390×844 · census MATCH.

| WP | RED | GREEN | Notes |
|---|---|---|---|
| WP-1 the facts live-census | 35 failing + 1 born-green census anchor (every failure a finding) | the 130th suite, +36 | Mutation-proven at birth (the planted badge regression → exactly 1 RED → reverted → GREEN). FOUR wrap-normalization calibration catches live-caught at the battery's first runs (the doctrine clauses wrap across lines — the s167 lesson applied at birth: the claudeNorm/padNorm/agentsNorm views + the .env.example `#`-prefix strip + the PAD tree's first-line fragment). |
| WP-2 the production secret gate | 2 code-face pins RED (production + missing → throws · production + short → throws) + the development-fallback pin born GREEN | secret() throws in production; dev/test keep the DEV fallback; .env.example + the env-table default cells flipped | One in-flight collateral catch: the auth.ts edit grew the file 171 → 184 — the live line-census pins caught it before the ship (the PAD §11 row + ADR-003 + the SKILL §7.4 heading re-derived). |
| WP-3 the stale-site closure | (rides WP-1's pins) | the ~24 sites flipped across CLAUDE/README/PAD/SKILL/AGENTS/DEPLOYMENT + the docs-counts pin's own live-read re-anchor | The PAD surgery scripted (pad-surgery-169.py, assert-first, idempotent — the s76/s77 swap + the s127-s130 footnote). |
| WP-4 the count ladder | (the ladder) | 130/2559 lockstep GREEN | ONE live-caught tooling defect (the L-168c3 class): the head-surgery skip-check split on the wrong `---` boundary — a re-run double-applied the demotion; repaired live + the guard rebuilt on the verified-single form; the re-run verified as a 0-flip no-op twice. |

The captures 413-416 (the login + signup pages — the auth pair the
secret gate hardens — at phone + desktop) + `session_359.md` + the
worklog entry (Task ID 169) + the AGENTS Session-169 section + the PAD
session-169 inventory row closed the round. The verification chain at
ship: lint 0/0 · tsc 0 · **130/2559** · build (29 routes) · e2e
**161/161** · db census MATCH.
