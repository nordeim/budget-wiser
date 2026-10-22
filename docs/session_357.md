# Session 357 — THE AGENTS-DOCTRINE CLOSURE + THE INVENTORY LIVE-CENSUS (session-168)

Date: 2026-10-22 · Rotation: 168 · Operator task: audit + validate the
session-167 ship (the stale-site closure + the schema live-census),
remediate the findings TDD-first, align the docs, capture the
screenshots, push to `git@github.com:nordeim/neo-crm.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

## The baseline that named the round

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **128/2480** (the s167 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** (clean run after the fresh-sandbox chromium install) |
| probe:ref | **#140 STABLE** (bundle md5 `46bc2d9c…` — no event; demo zero; the mobile-nav defect the reference's own, standing) |
| the six drift gates | CLEAN ×6 (the four viewport sweeps · the fullpage at the exact standing values 0.093%/0.316% at equal heights 4990/7259 · the census gate byte-parity, zero unexplained) |
| mobile drawer | **7/7 PASS** live at 390×844 (trigger unique · rail hidden · data-state=open · 8/8 links · the MAIN-scroller lock [main=hidden] · close-on-navigate + URL change · Escape + lock release) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored `tw-animate.css` · literal-hex `@theme` tokens) |
| sitemap + robots + manifest | 11 routes / standing / standing (source-verified) |
| bun audit | the 9-advisory posture unchanged (all dev-toolchain transitive — the s164 triage stands) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

One environment note (sandbox-only, no repo defect — the documented
class): the fresh sandbox re-injects a stale ambient `DATABASE_URL` on
every shell invocation; every DB-touching command this round ran with
the ambient var scrubbed (`unset DATABASE_URL`) and the sandbox root's
stale `.env` residue removed, so the repo's own `.env` + the db-path
seam resolve `<repo>/db/custom.db` — the census PRINT confirms the
resolved file.

## The finding register (all reproduced live)

| # | Finding | Severity |
|---|---------|----------|
| F-168a | AGENTS.md's architecture-facts layer carried the pre-s166 doctrine — "the CRUD family keeps the `asString` guards, the documented incremental adoption path" — the exact clause F-167b eradicated from SKILL §7.4 one round ago; the s165/s166/s167 rounds flipped SKILL/README/PAD/CLAUDE but never AGENTS' own copy. | Medium |
| F-168b | AGENTS.md's conventions bullet carried the pre-s163 doctrine — "No schema library — zod was deliberately pruned" — flatly contradicting the same file's own L74 Zod-seam lines; the exact contradiction class s165 fixed in SKILL §14, never in scope for AGENTS. | Medium |
| F-168c | PAD §11's Key Files Lines column: SEVEN stale rows (api 172/308 · constants 547/549 · rate-limit 51/126 · mobile-nav 215/143 · app-shell 70/94 · globals.css 413/430 · (app)/layout 11/22) — the s109 line-census family pinned thirteen rows + the SKILL headers but never these seven PAD rows (the F-99a1 genus on the column's blind side). | Medium |
| F-168d | SKILL §3.2's layer map carried the era-12 counts — "pages (11) + API route handlers (27)" vs the live 15 pages / 29 route files. | Medium |
| F-168e | SKILL §5.2's inventory carried the era-12 counts — "25 `.tsx` / 19 `use client`" (live 28/22) + the "11 pages" enumeration missing the landing /, /about, /contact, /reset-password (live 15). | Medium |
| F-168f | SKILL §3.1's schema row said "8 models" (live 9 — its own §7.1 heading says "(9)"). | Low |
| F-168g | SKILL §9's Bug #1 line said "7-check e2e suite" (live the 10-check mobile-nav suite — the straggler of the s145→s147 growth + the F-165c sweep). | Low |
| F-168h | SKILL §19's color mirror carried `primary-foreground` `#ffffff` / `255 255 255` (live `#fafafa` / `250 250 250` — globals.css + §4.1's own mirror carry the s119 re-pin). | Low |
| F-168i | README's sitemap claims said "nine-route" at two sites (live 11 routes since s142). | Low |
| F-168j | The repo worklog's tail gap — the last entry is Task ID 165; the s166/s167 rounds recorded in session docs + plans but never appended worklog entries. | Low |

Out of scope (documented): dependency bumps for the 9 dev-toolchain
advisories (the no-mid-rotation-bump posture); RBAC (the
single-workspace Open row); the bundle-event watch (probe:ref #140
STABLE); the scandihaven `z.input`/`z.infer` colocation candidate —
evaluated live this round and CLOSED as already structurally embodied
(`parseBody` returns `z.output<S>`; the routes carry zero hand-written
body interfaces; nothing to port).

## The implementation (TDD — RED 18 → GREEN)

1. **WP-1 the inventory live-census battery**:
   `tests/inventory-census.test.ts` (the 129th suite, +40) — the
   L-165c1 doctrine extended from the schema seam (s167) to the DOC
   INVENTORY LAYER: the PAD §11 Lines-column live-census (ALL 27
   count-carrying rows asserted against their files' live line counts
   + the row-surface census pin — a row silently added or dropped
   fails the census first) · the SKILL inventory live-census (the
   models count from the schema · the layer-map page/route counts from
   the tree [the census definitions documented in the battery: the
   route `page.tsx` entries minus the `*-page.tsx` client parts minus
   the capitalized `page.jsx` aliases; the API routes under
   `src/app/api/**` only, the three SEO handlers excluded] · the
   component `.tsx` + `"use client"` counts · the sitemap ROUTES
   length number-to-word mapped · the mobile-nav spec check count ·
   the §19 color hex read from globals.css) · the AGENTS doctrine pins
   (the completed-adoption clause present + BOTH retired clauses
   absent — AGENTS.md joins the docs pin family for the first time) ·
   the README eleven-route pins. Mutation-proven at birth: a planted
   line in `csv.ts` → exactly +1 RED (the csv row pin) → reverted →
   GREEN.
2. **WP-2 the stale-site closure**: the sixteen sites flipped — the two
   AGENTS doctrine clauses (rewrapped so the pin anchors read
   contiguously, the s167 house lesson) · the seven PAD §11 values ·
   the five SKILL inventory sites · the two README nine-route claims.
3. **WP-3 the count ladder**: 28 site-group flips + the head surgery —
   UNIT 2480 → **2520** (+40) · SUITES 128 → **129** · E2E 161 held ·
   badge 2641 → **2681** — every live-tense site re-anchored atomically
   (`count-ladder-168.py`, assert-first, idempotent, unique-anchor)
   with the SKILL **v1.165.0** frontmatter + H1 lockstep + the s168
   head layer (the s167 layer comment-demoted).

## The TDD ledger

- RED birth: **18 failing** (7 PAD rows + 6 SKILL sites + 4 AGENTS
  pins + 1 README site — every one a finding; zero wrong-reason
  failures; the census pins [27 rows / 9 models / 15 pages / 29 routes
  / 28/22 components / 10 checks / 11 routes] born-green as live
  census, mutation-proven at birth).
- GREEN with three calibration catches live-caught at the battery's
  own first runs: the pages census initially counted 23 (the
  `*-page.tsx` client parts + the capitalized `.jsx` aliases — the
  census definition narrowed to ROUTE `page.tsx` entries, documented
  in the battery); the route census initially counted 32 (the three
  SEO route handlers — scoped to `src/app/api/**`); the README
  article form ("a" vs "an" eleven-route — the pin fixed to the
  grammatical form).
- One ladder-tooling catch (the L-167 class recurred and was caught
  THE SAME ROUND): the insertion pairs (the dialog-geometry negatives)
  had no idempotency guards — a second run double-applied them (a
  third run tripled); repaired live (deduplicated to 1× each) + the
  guards moved FIRST (the skip-check now reads the insertion markers
  before any anchor search). The re-run is now a verified no-op
  (0 flips).

## The count ladder

UNIT 2454 → 2480 → **2520** (+40: inventory-census +40 [the 129th
suite]) · SUITES 128 → **129** · E2E 161 held · badge 2641 → **2681**
— every live-tense site re-anchored in lockstep and the pin carriers
co-flipped (docs-counts UNIT/SUITES + the head-layer pins → the s168
head · the dialog-geometry CLAUDE ×4 positives + the 2480-form
negatives · the Appendix B unit-total row + the wall-clock phrase · the
README badge + the suite enumeration's `inventory-census` · the SKILL
**v1.165.0** frontmatter + H1 lockstep).

## The verification

lint 0/0 · tsc 0 · **129/2520** unit · build (29 routes) · e2e
**161/161** · db census MATCH · the six drift gates CLEAN ×6 at the
audit leg (the round touches docs + tests only — no visual source
changed, the standing parity verdict carries to the ship state).

## The captures (409-412)

The round's subject surfaces — the inventory layer's own pages: **409/
410** the landing page (the s142 marketing surface the SKILL
enumeration forgot) at phone + desktop · **411/412** the about page
(the s142 marketing pair's other face) at phone + desktop.

## The lessons

L-168c1 the rotation's blind spot is the doc it never audits — three
consecutive rounds flipped the doctrine in SKILL/README/PAD/CLAUDE
while AGENTS.md (the file every agent reads FIRST) carried the
eradicated clauses; the cure is not "remember AGENTS" but "AGENTS
joins the pin family" · L-168c2 a census definition must match the
claim's semantics, not its string shape — "pages" means ROUTE entries
(the client parts and the alias files are not pages), "API route
handlers" means `src/app/api/**` (the SEO handlers are not API) — the
battery documents both definitions at the assertion · L-168c3 an
insertion is not a flip — the ladder's insertion pairs (negatives
appended after standing anchors) need their OWN idempotency guards,
else every re-run re-appends (the L-167 class, caught and cured
in-round this time).
