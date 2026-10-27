# Budget Wise — Session 9 Remediation Plan

**Date:** 2026-10-28 · **Branch:** `main` only · **Method:** TDD where code changes; documentation true-up where the finding is informational

## 1. Audit scope executed (this session)

- Intake: `git pull` to `6ab4484` (the owner's `docs/session_14.md` transcript
  commit atop `c027c06`, the s197 ship — the dev-boot guard round). The
  environment stood bootstrapped from the prior session (deps installed,
  `.env` on the mandated six-knob contract with
  `DATABASE_URL="file:../db/custom.db"`, the seeded `db/` at the repo root,
  chromium-1248 present) — the only delta was docs-only, verified by diff.
- The five root documents + `docs/session_13.md` +
  `docs/REMEDIATION-PLAN-SESSION-8.md` + `worklog.md` + `docs/session_14.md`
  were re-read and validated against the tree before touching anything, and
  the full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-197
  ship state.
- The local audit per `skills/web-application/SKILL.md` §16/§20 dimensions:
  the security sweep clean (no `dangerouslySetInnerHTML`, no secrets, no live
  keys, no `console.log`, no TODO/FIXME in `src/`); the docs-count lockstep
  (410/66/14) verified at every claim site; `skills/` confirmed excluded from
  all four check/test/compile scopes (tsc · eslint · vitest include patterns ·
  playwright testDir); the s197 seams re-verified in the tree
  (`scripts/dev-preflight.ts` + the wired `dev` script).
- The mandated focus areas each swept clean: the **mobile navigation** (the
  11-test e2e battery green in the baseline gate + the live byte-census on
  BOTH apps during the dual-app diff — identical bar classes, the `flex
  items-center justify-around py-2` row wrapper, item classes, ink split,
  rect y=767 h=77, plus our documented `aria-current` superset) and
  **TailwindCSS v4** (the `@custom-variant hover` unwrap, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
  `safe-area-pb` @utility, literal-class discipline, no config JS — no
  v4-family bugs found).
- **The dev-boot guard live-verified TWICE more this session** (both
  build→dev sequences: the baseline gate's build, then the prod-HTML probe
  build — each dev boot fired the preflight clean of the production-written
  tree, 0 reload loops, health 200 each time). The s197 remediation holds.
- The live reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844): **ZERO structural drift since session
  197** — the SIXTH consecutive shell census with no new restyle wave: the
  shell (outer surface wrapper form), all four app pages (containers
  7xl/5xl/5xl/4xl, the sm-stacking headers, tracking-tight H1s, action
  buttons), every page title cross-checked (`/`→"Budget Wise",
  `/login`→"Budget Wise", `/Dashboard`→"Budget Wise",
  `/Transactions|/Budgets|/Profile`→"<Page> | Budget Wise"), the 404 surface
  (the interpolated humanized title `Curl Probe 198 | Budget Wise`), the
  mobile bottom bar byte-identical on every dimension, the scroll-end
  clearance (764 ≤ 767 on both apps), both dialogs (`space-y-6 pt-4`, stock
  h-9 `border-input` forms), the sitemap format + robots.txt, the login card
  (the 4-button OAuth row), the donut geometry (200×200 pie, 331px legend),
  the transaction-row anatomy, and the data state unchanged (the single
  −$1,000 food txn — data-borne, the excluded genus).
- The dual-app diff ran the same census on the local dev server: shell
  matching, the mobile bar byte-identical, all page titles curl-verified
  matching (including the 404's interpolated title + real 404 status), both
  dialogs matching, the SEO surfaces matching (sitemap format, robots,
  manifest 200), the donut geometry identical, the row anatomy identical,
  and the clearance identical (764 ≤ 767 both apps).
- The VLM battery: "Structural Differences: None" on dashboard desktop,
  budgets mobile, and profile mobile; the dashboard-mobile pair's two flags
  both the documented s195/s196 genus, DOM-disproven by this session's direct
  byte-census (the platform's "Edit with Base44" badge occluding tabs 3–4 in
  the capture; the data-borne savings-badge conditional — the reference's
  null savings rate with zero income txns). The discipline held: no flag was
  acted on without the DOM counter-proof.
- The screenshot battery recaptured (12 images): **10/12 byte-identical to
  the s197 set** + the two dialog frames within 6 bytes (captured from their
  canonical origin pages — the add-transaction dialog from /Transactions,
  the set-budget dialog from /Budgets — at 0.001% pixel diff). Render
  stability evidence held across the generation.

## 2. Findings

### Informational (a genus note for future censuses — no code defect)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **The body-level framework chrome genus is under-documented.** Every server-rendered page of the local app carries `<div hidden=""><!--$--><!--/$--></div>` as `body.children[0]` — React's streaming-SSR boundary marker (completed `<!--$-->` on resolved pages; pending `<!--$?-->` + `<template>` on the 404). It is invisible (`hidden` = display:none), excluded from the a11y tree, pinned by no test, present identically in dev AND the production standalone build, and structurally impossible on the reference (a client-rendered Vite SPA whose body carries `#root` + the platform's `#base44-edit-badge` + recharts' measurement span instead). The shell census records describe the hierarchy from the app-shell perspective (`body (WHITE) > DIV > DIV.min-h-screen.bg-slate-50 > […]`) — accurate for the shell, but a future session running a body-children census (as this one did) hits the hidden div first, and `children[0]`-style probes fail with "Cannot read properties of undefined" — exactly what happened live this session, costing an investigation before the platform-face classification was proven (dev HTML + prod HTML + reference body census). A one-line genus note in the doc set prevents the next session from re-paying that cost or — worse — mis-classifying it as parity drift. | `curl localhost:3000/login` (dev) and the standalone prod server's `/login` HTML both show `<body …><div hidden=""><!--$--><!--/$--></div><main …>`; the reference's logged-in body census: `[#root DIV → DIV.min-h-screen, #base44-edit-badge, recharts span]` with no hidden div; the live probe failure (`b.children[0]` = the empty hidden div → undefined error); `rg 'div hidden'` over `src/` — zero source-level hits (framework-emitted) |

### Verified clean (no drift — no action)

- Every parity surface (the sixth census): the shell, all four pages, the
  mobile bar, the clearance, both dialogs, all titles (404 + aliases + page
  defaults), the sitemap + robots + manifest, the login card, the donut
  geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 11-test e2e battery green in the baseline gate).
- Tailwind v4: no bugs (all pins verified in place).
- The dev-boot guard: fired correctly on both build→dev sequences this
  session (0 reload loops vs the 646 unguarded genus).
- `.env`/`.env.example`: matching the six-knob contract; `db/` at the repo
  root; the db-path seam pinned.
- The Vitest + Playwright suites: in place (410/66), config scopes clean.
- The security sweep, the docs-count lockstep, the skills/ exclusion.

## 3. Remediation ToDo

**Phase A — the documentation true-up (the F-1 action; no code seam exists
to test — the div is framework-emitted, and pinning framework output would
be brittle-by-construction, not a guard)**

1. [x] AGENTS.md — the architecture-facts section gains the body-chrome
       genus line: the census description's "body > DIV" starts at the app
       shell; the body ALSO carries framework chrome (the hidden React
       streaming div first, the Toaster portal, the route announcer) that
       the reference answers with its own platform chrome (`#root`, the
       base44 edit badge, recharts' measurement span) — none of it is a
       parity surface, and `children[0]`-style body probes will hit the
       hidden div first.
2. [x] The PAD — the revision block (v2.8.0) records the sixth census +
       the genus note; the ADR-006 amended-decision hierarchy description
       gains the census caveat.
3. [x] `budget-wiser_SKILL.md` — v1.7.0: the §1 reference-state note
       gains the body-children census caveat; the provenance + Appendix
       C gain the session-198 rows.

**Phase B — the session records**

4. [ ] `docs/session_15.md` (this round's log) + the worklog entry
       (Task ID 198).
5. [ ] This plan ticked + the execution addendum (what the round actually
       verified, including the guard's double live-proof).

**Phase C — evidence**

6. [x] The screenshot battery: the 12 s198 frames copied into
       `docs/screenshots/` (10 byte-identical + 2 dialog frames within 6
       bytes of the s197 set — render-stability evidence across another
       generation).
7. [ ] Full gate re-run: lint 0/0 · typecheck 0 · 410/410 unit · build ·
       14/14 smoke · 66/66 e2e (CI=1) — counts unchanged (a docs-only
       round must move zero counts).

**Phase D — ship**

8. [ ] Commit (atomic, docs-only) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the key.

## 4. Risks and guards

- **No gate weakening, no count movement**: a documentation-only round —
  the 410 unit / 66 e2e / 14 smoke counts must be IDENTICAL before and
  after (any drift means an unintended code change slipped in).
- **The genus note must not over-claim**: the note documents what IS
  (framework chrome on SSR pages), not a behavioral contract — no test pins
  it (pinning framework output is the brittle genus; the s192 dead-script
  guard lesson: pins must target repo-owned surface).
- **The dev server is stopped before the gate's build leg** (the documented
  rule; the preflight guard is the backstop, not an invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.

## 5. Execution addendum (what the plan grew mid-round)

- **The hidden-div investigation path (recorded for the genus note's
  provenance):** the dual-app shell census hit the live
  undefined-property error on the local probe (`b.children[0]` = the
  empty hidden div) while the reference probe had returned the shell —
  the divergence warranted a full classification before any action:
  (1) the dev SSR HTML (`curl :3000/login`) shows the div with completed
  boundary markers; (2) the standalone PRODUCTION server's HTML shows it
  IDENTICALLY (booted on :3299 with a scratch AUTH_SECRET); (3) the
  reference's logged-in body census (fresh session, post-login) answers
  `[#root → DIV.min-h-screen, #base44-edit-badge, recharts span]` — no
  hidden div, structurally impossible on a client-rendered SPA; (4)
  `rg 'div hidden'` over `src/` — zero hits (framework-emitted); (5) the
  404 page carries the pending form (`<!--$?-->` + `<template>`) — the
  streaming genus confirmed. The classification: platform-face, invisible,
  unpinned — documentation, not code.
- **The dialog frames' canonical origin pages discovered:** the s197
  battery's add-transaction dialog was captured from /Transactions and
  the set-budget dialog from /Budgets (the backdrop IS the page behind
  the overlay) — capturing from /Dashboard produced a 36.6%-pixel diff
  (the backdrop), from the canonical pages 0.001%. The battery convention
  is now part of the session record.
- **The dev-boot guard's second and third live proofs:** the round's two
  build→dev sequences (the baseline gate's build and the prod-HTML probe
  build) each fired the preflight clean on boot — 0 reload loops each
  time, health 200 each time. The guard's value compounds with every
  gate-then-dev workflow an agent runs.
