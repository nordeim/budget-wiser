# Session 359 — THE CLAUDE-DOCTRINE CLOSURE + THE STACK-FACTS LIVE-CENSUS + THE PRODUCTION SECRET GATE (session-169)

Date: 2026-10-23 · Rotation: 169 · Operator task: audit + validate the
session-168 ship (the AGENTS-doctrine closure + the inventory
live-census), remediate the findings TDD-first, align the docs, capture
the screenshots, push to `git@github.com:nordeim/neo-crm.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

## The baseline that named the round

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **129/2520** (the s168 ship state) |
| build | GREEN (29 routes; the compiled CSS carries 293 `color-mix()` calls — the s169 census) |
| e2e | GREEN **161/161** (3.5 m clean run) |
| probe:ref | STABLE (bundle md5 `46bc2d9c…` — the s168 fingerprint; demo zero; the mobile-nav defect the reference's own, standing) |
| drift gates | the desktop + phone sweeps **CLEAN** live this round (0.5pct margin); the remaining four carry the s168 CLEAN ×6 record at this exact tree (the round touches docs + tests + server-only code — no visual source) |
| mobile drawer | **7/7 PASS** live at 390×844 (trigger unique · rail hidden · data-state=open · 8/8 links · the MAIN-scroller lock · close-on-navigate + URL change · Escape + lock release) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored `tw-animate.css` · literal-hex `@theme` tokens) |
| sitemap + robots + manifest | 11 routes / standing / standing (source-verified) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The scandihaven reference round (the tech-stack pattern pass the operator
task prescribes): its five port candidates evaluated live —
**(1) the stack-version lockstep pin → ADOPTED** (the exact drift it
exists to kill was live in this repo: every version carrier still said
16.3.6/1.63) · **(2) the boot fail-fast env validation → adopted in the
server-seam form** (the production secret gate; the full
`instrumentation.ts` boot gate stays a documented next-rotation
candidate) · (3) the stale-chunk self-heal + error boundary → deferred
(its own rotation — a new visual surface) · (4) the axe-core a11y gates
→ deferred (a new devDep — the no-mid-rotation-bump posture) · (5)
fast-check property tests + scoped coverage → deferred (same posture) ·
the response-side Zod validation, DB-backed rate limiting, `@source`,
and `z.input`/`z.infer` colocation → rejected after evaluation
(already-closed or wrong fit for a single-node SQLite app).

## The finding register (all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-169a | CLAUDE.md was the LAST un-flipped doctrine doc — "Hand-rolled validation (`asString`/`asNumber`/`asDate`/enum membership) at every route boundary — no schema library by design" stated as current practice; ZERO zod/parseBody/schemas.ts mentions in the whole file (the named next-rotation candidate from session_358's own close). | Medium |
| F-169p | The production AUTH_SECRET gate was a warn-once fallback, not a fail: `secret()` fell back to `DEV_SECRET` with ONE console.warn on a missing OR short secret in production — forgeable sessions with no hard failure. Fails the web-app-foundation §6.2/§12 checklist ("fails hard in production"). AND `.env.example` misdocumented it: "the hard error an unset value raises" — no hard error existed for either face. | High |
| F-169f | The version carriers drifted at the s163-era dep bump (`04e367c`: next 16.3.6→16.4.2, playwright 1.63.0→1.64.1 — no version-carrier doc updated): README badge + table row + Playwright row · PAD's stack table · SKILL §2's rows. | Medium |
| F-169b | The sitemap stragglers — the F-168i fix's two missed siblings: CLAUDE.md's "nine-route sitemap.xml" + AGENTS.md's "nine-URL `/sitemap.xml`" (live 11 since s142). | Medium |
| F-9 | The pin-entrenched stale literal: DEPLOYMENT's "the 27 API route handlers" (live 29 route files / 41 verb handlers) + the docs-counts pin asserting `toContain("the 27 API route handlers")` under a comment claiming liveness — the L-165c1 genus inside the pin family itself. | Medium |
| F-169k | PAD's own doctrine contradictions: §3.1's "hand-rolled validation at the boundary" + §6.1's PHANTOM `asOneOf` helper (0 matches in src/; the live set: asString/asNumber/asInt/asDate/asFKId). | Medium |
| F-169l | PAD's tree said "auth(6: …)" (live 8 auth route dirs since s163 — contradicts PAD's own §6.1 "8 verbs"). | Medium |
| F-169c/d | CLAUDE's models list carried 8 of 9 (Opportunity missing) + the env table 3 of 6 knobs. | Medium |
| F-5/F-3/F-4 | SKILL §4.1's "(complete)" @theme mirror: FIVE stale tokens (primary #3b82f6 vs live #2563eb — the session-7 re-pin — primary-hover, foreground, line, line-soft) + `--color-line-strong` missing + the false label over a ~30-token block while globals.css carries 127 `--color-*` tokens; §19's primary/primary-hover rows the same two stale primaries. | Medium |
| F-169h/i | README's pre-s142 vintage: the file tree's "(app)/ 📄 page.tsx # Dashboard (/)" (the file removed at s142 — the tree omitted dashboard/, the marketing pair, the landing, reset-password) + the Quick Start's "Visiting `/` redirects to `/login`" and "land on a dashboard". | Medium |
| F-169j/n | README's "gate + the FOUR drift sweeps" (live six) + the Tested row's s98-era "space-y census 110/18" (live 21 files / 117 occurrences). | Low |
| F-169m | PAD ADR-003's "~129 auditable lines" (live 171 — PAD's own §11 row carried 171). | Low |
| F-11/12/13 | AGENTS' stragglers: "the 8 inner wrappers + login + signup consume it" (live 13 primary pages + 10 aliases) · the "596 Vitest checks across 38 suites" clause with no era marker · the "242 color-mix() calls" s25-era count (live 293). | Low |
| F-6/F-19 | SKILL §20's "(3 vars)" cross-reference (live 6) + Appendix B's "~15 s" contradicting the table's "~18 s". | Low |
| F-169e | CLAUDE's enumerations stale-by-omission (~48 of 129 suites; 7 of 10 e2e specs named). | Low |
| F-169s | PAD §7.1's s76/s77 row inversion + the s127-s130 inventory-row gap. | Low |

Out of scope (documented): dependency bumps for the 9 dev-toolchain
advisories (the no-mid-rotation-bump posture); `instrumentation.ts`
boot-gate + `error.tsx`/`global-error.tsx` (the scandihaven ports —
next-rotation candidates, each a new surface); axe-core a11y gates +
fast-check property tests (new devDeps — the same posture); RBAC; the
bundle-event watch (probe:ref STABLE).

## The implementation (TDD — RED 35 + 2 code-face pins → GREEN)

1. **WP-1 the facts live-census battery**:
   `tests/facts-census.test.ts` (the 130th suite, +36) — the L-165c1
   doctrine extended to the STACK-FACTS layer: the version carriers read
   LIVE from node_modules (the scandihaven PAD §1.2 lockstep pattern
   embodied as a pin — next 16.4.2 · playwright 1.64.1 · the whole
   react/tailwind/prisma/zustand/vitest/lucide/recharts lockstep family)
   · CLAUDE.md joins the docs pin family (the doctrine clause + the
   models list + the six-knob env table + the three post-s150 e2e specs
   + the s51-era marker) · the DEPLOYMENT live-census re-anchor (both
   the doc AND the pin-entrenched docs-counts literal — the root cure
   applied to the pin family's own member) · the SKILL §4.1 + §19 color
   mirror read live from globals.css · PAD's doctrine lines + the
   auth(8) tree + the ~184 rationale + the s76-before-s77 row order +
   the s127-s130 footnote · the README tree/Quick-Start/six-gate/space-y
   pins · the AGENTS stragglers (the eleven-URL + the 13-page consumer
   census read live + the era markers) · the production-secret doc
   posture. Mutation-proven at birth (the planted badge regression →
   exactly 1 RED → reverted → GREEN).
2. **WP-2 the production secret gate** (the code leg): `secret()` now
   THROWS in production on a missing OR short AUTH_SECRET — the
   web-app-foundation §6.2 posture (the L-164c3 doctrine: the repo's own
   distilled companion skill is the bar). Dev/test keep the documented
   DEV fallback (the existing hand-signed battery IS that face; the new
   development-fallback pin makes it explicit). The throw rides every
   session op — the first op surfaces the actionable message instead of
   minting forgeable cookies. `.env.example`'s false contrast retired
   for the true posture line; the README/PAD env-table default cells
   flipped. E2E unaffected (the playwright webServer sets a 27-char
   AUTH_SECRET); dev unaffected; the standalone production server now
   refuses the first session op instead of shipping forgeable sessions.
3. **WP-3 the stale-site closure**: the ~24 sites flipped across the
   five docs + DEPLOYMENT, every flip riding its WP-1 pin.
4. **WP-4 the count ladder**: UNIT 2520 → **2559** (+39) · SUITES 129 →
   **130** · E2E 161 held · badge 2681 → **2720** — every live-tense
   site re-anchored atomically (`count-ladder-169.py`, assert-first,
   idempotent, unique-anchor) + the SKILL **v1.166.0** frontmatter + H1
   lockstep + the s169 head layer (the s168 layer comment-demoted).

## The TDD ledger

- RED birth: **35 failing + 1 born-green census anchor** (every failure
  a finding) + the auth battery's **2 production-gate pins RED** (the
  code face) with the development-fallback pin born GREEN (the existing
  behavior). Zero wrong-reason failures after FOUR wrap-normalization
  calibration catches (the s167 line-wrap lesson recurring at birth:
  the doctrine clauses wrap across lines — the pins normalized
  whitespace for the wrapped-clause assertions; the .env.example pin
  strips the comment-continuation `#` prefixes; the PAD tree pin uses
  the first-line fragment — the │ drawing chars never normalize).
- One in-flight collateral catch: the secret-gate edit grew auth.ts
  171 → 184 lines — the live line-census pins caught it BEFORE the ship
  (the PAD §11 row + the ADR-003 rationale + the SKILL §7.4 heading
  re-derived; the census policing its own round's code change, exactly
  the L-165c1 design).
- One ladder-tooling defect (the L-168c3 class, caught and cured
  in-round again): the head-surgery skip-check split on the wrong `---`
  boundary — a re-run double-applied the demotion. Repaired live + the
  guard rebuilt on the verified-single form (the live head exists
  exactly once + the demoted wrapper exactly once); the re-run verified
  as a 0-flip no-op twice.
- The mutation-proof ritual: the planted README badge regression
  (16.4.2 → 16.3.6) → exactly 1 RED → reverted → GREEN.

## The count ladder

UNIT 2480 → 2520 → **2559** (+39: facts-census +36 [the 130th suite] ·
auth +3 [the production secret-gate pins]) · SUITES 128 → 129 → **130**
· E2E 161 held · badge 2641 → 2681 → **2720** — every live-tense site
re-anchored in lockstep and the pin carriers co-flipped (docs-counts
UNIT/SUITES + the layer-axis pins → the s169 head · dialog-geometry
CLAUDE ×4 positives + the 2520-form negatives · the Appendix B
unit-total row + the wall-clock phrase · the README badge + tree +
commands + the suite enumeration's `facts-census` · the SKILL
**v1.166.0** frontmatter + H1 lockstep).

## The verification

lint 0/0 · tsc 0 · **130/2559** unit · build (29 routes) · e2e
**161/161** · db census MATCH · the drift-gate argument from s164/s168
carries (the round touches docs + tests + `src/lib/auth.ts` —
server-only, zero visual surface; the desktop + phone sweeps
re-verified CLEAN live at the audit leg; the standing parity verdict
holds to the ship state).

## The captures (413-416)

The round's subject surfaces — the auth pair the secret gate hardens:
**413/414** the login page (the card the HMAC secret signs into) at
phone + desktop · **415/416** the signup page (the verification
ladder's entry) at phone + desktop.

## The lessons

L-169c1 the line-wrap lesson has a general form — any pin anchoring on
prose must either normalize whitespace or anchor on the wrap-proof
fragment; FOUR pins were born vacuous-or-wrong-reason before the
normalization (the s167 lesson now applied at BIRTH, not after the
flip) · L-169c2 a pin family must audit its OWN members — the
DEPLOYMENT pin had claimed liveness for 6 sessions while entrenching a
stale constant (the root cure is the live-read re-anchor, not the
constant bump) · L-169c3 the ladder's head surgery needs a
verified-single guard, not a boundary split (the `---` split matched
the wrong region; the marker-count form catches both the missing AND
the double-applied states).
