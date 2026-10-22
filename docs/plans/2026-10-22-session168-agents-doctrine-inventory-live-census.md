# The session-168 plan — THE AGENTS-DOCTRINE CLOSURE + THE INVENTORY LIVE-CENSUS

Date: 2026-10-22 · Rotation: 168 ·
Task: audit + validate the session-167 ship (the stale-site closure +
the schema live-census), remediate the findings TDD-first, align every
doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `d57ef8e` (fresh clone; `.env` recreated with a fresh
64-char AUTH_SECRET; the sandbox root's stale `.env` residue removed +
the ambient `DATABASE_URL` scrubbed on every DB-touching command — the
documented sandbox class; `db:push` + `db:seed` census MATCH; the
Playwright chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **128/2480** (the s167 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** (clean run after the fresh-sandbox chromium install) |
| probe:ref | **#140 STABLE** (bundle md5 `46bc2d9c…` — no event; demo zero; the mobile-nav defect the reference's own, standing) |
| the SIX drift gates | CLEAN ×6 (the four viewport sweeps · the fullpage at the exact standing values 0.093%/0.316% at equal heights 4990/7259 · the census gate byte-parity, zero unexplained) |
| mobile drawer | **7/7 PASS** live at 390×844 (trigger unique · rail hidden · data-state=open · 8/8 links · the MAIN-scroller lock [main=hidden] · close-on-navigate + URL change · Escape + lock release) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored `tw-animate.css` · literal-hex `@theme` tokens) |
| sitemap + robots + manifest | 11 routes / standing / standing (source-verified: the ROUTES array + the byte-format route handlers) |
| bun audit | the 9-advisory posture unchanged (all dev-toolchain transitive — the s164 triage stands) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The findings, severity-ranked (every claim reproduced live against the
s168 tree — every line citation re-verified, every count re-derived from
the tree at the audit leg):

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-168a | **AGENTS.md's architecture-facts layer carries the pre-s166 doctrine**: "the CRUD family keeps the `asString` guards, the documented incremental adoption path" — the exact clause F-167b eradicated from SKILL §7.4 one round ago; the s166/s167 rounds flipped SKILL/README/PAD/CLAUDE but never AGENTS' own copy (contradicted by the same file's Session-166 section + the 12 migrated routes). | `AGENTS.md:74-77` | Medium | Verified |
| F-168b | **AGENTS.md's conventions section carries the pre-s163 doctrine**: "Validation is hand-rolled in route handlers… No schema library — zod was deliberately pruned" — flatly contradicted by the same file's L74-75 (the Zod seam: zod ^4, `src/lib/schemas.ts`, 20 schemas / 716 lines, parseBody at every body boundary). The exact contradiction class s165 fixed in SKILL §14 — AGENTS' copy was never in scope. | `AGENTS.md:3083-3085` | Medium | Verified |
| F-168c | **PAD §11's Key Files Lines column: SEVEN stale rows** — `api.ts` 172 (live **308**) · `constants.ts` 547 (live **549**) · `rate-limit.ts` 51 (live **126**) · `mobile-nav.tsx` 215 (live **143**) · `app-shell.tsx` 70 (live **94**) · `globals.css` 413 (live **430**) · `(app)/layout.tsx` 11 (live **22**). The whole column is UNPINNED (the F-99a1 genus) — the other 20 rows verified current. | `Project_Architecture_Document.md:1446,1450,1458,1459,1460,1462,1463` | Medium | Verified |
| F-168d | **SKILL §3.2's layer map carries the era-12 counts**: "pages (11) + API route handlers (27)" — live **15 pages / 29 route files** (the s142 marketing trio + the s163 reset-password page never joined; the 27 predates the s163 auth pair). | `neo-crm_SKILL.md:344` | Medium | Verified |
| F-168e | **SKILL §5.2's inventory carries the era-12 counts**: "25 `.tsx` files under `src/components/`; 19 start with `"use client"`" (live **28/22**) + the "11 pages" enumeration missing `/`, `/about`, `/contact`, `/reset-password` (live **15**). | `neo-crm_SKILL.md:358-360` | Medium | Verified |
| F-168f | **SKILL §3.1's schema row says "8 models"** (live **9** — User, Account, Contact, Lead, Event, Activity, Opportunity, SavedReport, Setting; SKILL §7.1's own heading says "(9)"). | `neo-crm_SKILL.md:203` | Low | Verified |
| F-168g | **SKILL §9's Bug #1 line says "7-check e2e suite"** (live the **10-check** mobile-nav suite — the straggler the s145→s147 growth + the F-165c sweep never reached). | `neo-crm_SKILL.md:698` | Low | Verified |
| F-168h | **SKILL §19's color-mirror row `primary-foreground` carries `#ffffff` / `255 255 255`** (live `#fafafa` / `250 250 250` — globals.css L56 + SKILL §4.1's own L247 carry the s119 re-pin; §19's preamble: "this table is a mirror — fix both if either changes"). | `neo-crm_SKILL.md:6376` | Low | Verified |
| F-168i | **README's sitemap claims say "nine-route"** (two sites — the live sitemap ships **11 routes** since s142 added /about + /contact). | `README.md:50,221` | Low | Verified |
| F-168j | **The repo worklog's tail gap**: `docs/worklog.md`'s last entry is Task ID 165 — the s166/s167 rounds recorded their work in session docs + plans but never appended worklog entries (the file's own convention). | `docs/worklog.md` | Low | Verified |

Out of scope this round (documented, not silently dropped): dependency
bumps for the 9 dev-toolchain advisories (the no-mid-rotation-bump
posture — PAD §10 ledger; a toolchain bump forces the standing pixel
baselines' re-derivation, its own rotation); RBAC (the single-workspace
Open row); the bundle-event watch (probe:ref #140 STABLE — no event to
re-derive against); the scandihaven `z.input`/`z.infer` colocation
candidate (evaluated this round: already structurally embodied —
`parseBody` returns `z.output<S>`, the routes carry zero hand-written
body interfaces; nothing to port).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the inventory live-census battery [F-168c…i]

`tests/inventory-census.test.ts` (the 129th suite) — the L-165c1
live-census doctrine extended from the schema seam (s167) to the DOC
INVENTORY LAYER:

- **The PAD §11 Lines-column live-census**: every count-carrying row's
  number asserted against the file's LIVE line count (read from disk,
  the `\n` count) — the 27-row surface pinned wholesale, so a future
  edit to any key file fails the census the day its doc row drifts.
  RED at birth on the seven stale rows (F-168c), GREEN at the flip.
- **The SKILL inventory live-census** (the tree read live): the models
  count (`grep "^model "` → 9) · the pages count (the `page.tsx` glob →
  15) · the route-file count (the `route.ts` glob → 29) · the component
  `.tsx` + `"use client"` counts (28/22) · the sitemap ROUTES length
  (parsed from `src/app/sitemap.xml/route.ts` → 11) · the mobile-nav
  spec check count (the `test(`/`it(` census → 10).
- **The AGENTS doctrine pins** (F-168a/b): the completed-adoption clause
  present + BOTH retired clauses absent ("keeps the `asString` guards" ·
  "No schema library — zod was deliberately pruned") — AGENTS.md joins
  the docs-counts pin family for the first time (the L-167c1
  root-cure: the file the rotation flips must be the file the gate
  reads).
- **The README sitemap-route pins** (F-168i): the "nine-route" form
  absent + the live-count form present.
- Mutation-proof at birth per the house doctrine: plant a line-count
  change → exactly the PAD row pins go RED → revert → GREEN.

### WP-2 — the stale-site closure [F-168a…i]

The sixteen sites flipped (every flip riding its WP-1 pin):

1. AGENTS.md L74-77: the doctrine clause → the completed-adoption form
   ("the CRUD family joined at session-166 — every body route rides the
   seam"; the query-param GET family keeps the helpers).
2. AGENTS.md L3083-3085: the conventions bullet → the Zod-seam reality
   (`schemas.ts` + `parseBody()` at every body boundary; the
   `asString`/`asDate` helpers surviving on the URL-param surfaces).
3. PAD §11: the seven Lines values → the live counts (172→308 ·
   547→549 · 51→126 · 215→143 · 70→94 · 413→430 · 11→22).
4. SKILL L344: "pages (11) + API route handlers (27)" → "pages (15) +
   API route handlers (29)".
5. SKILL L358: "25 `.tsx` files… 19 start with `"use client"`" → the
   live 28/22 form.
6. SKILL L359-360: the pages enumeration → the live 15 (landing /,
   about, contact, reset-password added).
7. SKILL L203: "8 models" → "9 models".
8. SKILL L698: "7-check e2e suite" → "10-check e2e suite".
9. SKILL L6376: `#ffffff` → `#fafafa` + `255 255 255` → `250 250 250`
   (the §4.1 mirror form).
10. README L50 + L221: "nine-route" → "eleven-route" (both sites).

### WP-3 — the count ladder

Derived AFTER the battery lands (L-166c3): UNIT 2480 → 2480+N ·
SUITES 128 → 129 · E2E 161 held · badge 2641 → 2641+N — every
live-tense site re-anchored atomically (`count-ladder-168.py`,
assert-first, idempotent, unique-anchor; the historicals preserved)
+ the SKILL v1.165.0 frontmatter + H1 lockstep + the s168 head layer
(the s167 layer comment-demoted, the single-key house form — the
skip-check BEFORE the anchor search, the L-167 tooling lesson).

### WP-4 — the docs + the verification

- `docs/session_357.md` (the odd-number canonical session record); the
  plan's own execution record; the repo worklog entry (Task ID 168,
  with the s166/s167 tail gap noted — their records live in
  session_353–356 + the plan files); the AGENTS Session-168 section;
  the PAD session-168 inventory row.
- The verification chain: lint · typecheck · unit (the new totals) ·
  build (29 routes) · e2e 161/161 · db census.

### WP-5 — the captures

The captures 409-412 (the round's subject surfaces — the inventory
layer's own pages: the landing page [the s142 marketing surface the
SKILL enumeration forgot] + the about page at phone + desktop), saved
under `docs/screenshots/`, VLM-verified per the house convention.

### WP-6 — the commit + the push

- `git commit` on main (the session mega-message, the house
  convention).
- The push via `docs/ssh_git_wrapper_v3.py` (the runbook:
  `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`) — operator key
  materialized to a 0600 file outside the repo, shredded after;
  remote-ref verification; NO new branches.

## 2. The validation of this plan against the codebase

- Every finding's line citation re-verified live at `d57ef8e` (the
  sed-quoted byte forms in the register; the seven PAD rows' live
  counts via `wc -l` — the other 20 rows verified current in the same
  pass; the models/pages/routes/components counts re-derived from the
  tree this round; the §4.1 mirror form at L247 confirmed `#fafafa`).
- The pin surface censused: docs-counts' existing pins cover
  README/PAD/SKILL/CLAUDE count carriers — the AGENTS doctrine sites,
  the PAD §11 Lines column, and the SKILL inventory layer are all
  UNPINNED today (the root cause of F-168a…i); WP-1 closes each with a
  live-census or carrier pin.
- The PAD §11 table read directly at :1440-1473 — the seven stale rows
  sit among 27 count-carrying rows; the site-form pins anchor on row
  TEXT (string containment), so the value flips are pin-safe (no
  existing docs-counts pin reads the Lines column).
- The mobile-nav 7/7 live check, the Tailwind v4 posture, the sitemap/
  robots/manifest sources, the drift-gate chain, and the bun-audit
  posture all ran THIS round at the audit leg (the table in §0) — no
  environment work, no visual-source change (the round touches docs +
  tests only, so the six drift gates' CLEAN ×6 verdict stands for the
  ship state; the verification chain re-runs the code gates).
- The .env / .env.example six-knob contract verified current (the
  operator checklist item).

---

## 3. The execution record (the TDD ledger)

Executed 2026-10-22, from the fresh clone at `d57ef8e` (the s167 ship
+ its session-log commit). The gate chain at ship: lint 0/0 · tsc 0 ·
**128/2480** unit · build (29 routes) · e2e **161/161**.

| WP | RED | GREEN | Notes |
|---|---|---|---|
| WP-1 the inventory live-census | 18 failing (7 PAD rows + 6 SKILL sites + 4 AGENTS pins + 1 README site — every one a finding; zero wrong-reason failures) | the 129th suite, +40 | Mutation-proven at birth (the planted csv.ts line → exactly +1 RED → reverted → GREEN). Three calibration catches live-caught at the battery's first runs: the pages census 23→15 (the ROUTE-entry definition — the `*-page.tsx` client parts + the capitalized `.jsx` aliases excluded, documented at the assertion); the routes census 32→29 (the `src/app/api/**` scope — the three SEO handlers excluded); the README article form ("an" eleven-route). |
| WP-2 the stale-site closure | (rides WP-1's pins) | the sixteen sites flipped | The AGENTS clauses rewrapped so the pin anchors read contiguously (the s167 house lesson). |
| WP-3 the count ladder | (the ladder) | 129/2520 lockstep GREEN | 28 site-group flips + the head surgery (the s167 layer comment-demoted, the s168 head inserted; SKILL v1.165.0 frontmatter + H1 lockstep). ONE live-caught tooling defect: the insertion pairs (the dialog-geometry negatives) lacked idempotency guards — a re-run double-applied (a third run tripled); repaired live (deduplicated to 1×) + the guards moved FIRST; the re-run verified as a 0-flip no-op (the L-167 class, caught and cured in-round). |

The captures 409-412 (the landing + about pages at phone + desktop —
the s142 marketing surfaces the SKILL enumeration forgot) +
`session_357.md` + the worklog entry (Task ID 168, the s166/s167 tail
gap noted) + the AGENTS Session-168 section + the PAD session-168
inventory row closed the round. The verification chain at ship: lint
0/0 · tsc 0 · **129/2520** · build (29 routes) · e2e **161/161** · db
census MATCH.
