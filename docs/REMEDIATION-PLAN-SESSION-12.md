# Budget Wise — Session 12 Remediation Plan

**Date:** 2026-10-28 · **Task ID:** 201 · **Branch:** `main` only · **Method:** TDD for the code change (red → green); documentation true-up + evidence refresh for everything else

## 1. Audit scope executed (this session)

- Intake: `git pull` on the existing workspace (the workspace was NOT reset
  this round) landing at `e91421b` — the owner's `docs/session_20.md`
  transcript commit atop `e3a5265`, the session-200 ship (the
  eighth-census verification round). The environment held from the prior
  round: `bun install` verified (513 packages in place) · `.env` on the
  mandated six-knob contract with `DATABASE_URL="file:../db/custom.db"` ·
  `db/` populated (custom.db + e2e.db + smoke.db) · node_modules present.
- The five root documents + `docs/session_19.md` +
  `docs/REMEDIATION-PLAN-SESSION-11.md` + `worklog.md` +
  `docs/session_20.md` were re-read and validated against the tree before
  touching anything; the repo delta since the s200 ship was verified
  docs-only (one file: the owner's transcript).
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented
  session-200 ship state.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME/lorem in `src/`,
  no `any` leaks), the docs-count lockstep (410/66/14) verified at every
  claim site, `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest include
  patterns · playwright testDir). The mandated focus areas each swept
  clean: the **mobile navigation** (the e2e battery green in the baseline
  gate + the live byte-census on BOTH apps — identical bar classes, the
  `flex items-center justify-around py-2` row wrapper, item classes, the
  ink split on the anchor AND its svg, rect y=767 h=77, the clearance
  764 ≤ 767 measured per the e2e contract on both, plus our documented
  `aria-current` superset) and **TailwindCSS v4** (the `@custom-variant
  hover` unwrap, the `--shadow-sm`/`--blur-sm` re-pins, the v3 palette
  re-pin block, the `safe-area-pb` @utility, literal-class discipline, no
  config JS — no v4-family bugs found). The `.env`/`db` contract verified
  live (the six knobs, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`), the Vitest + Playwright suites verified in
  place with clean config scopes, and the SEO surfaces verified (the
  sitemap + robots + manifest explicit route handlers, the format matching
  the reference byte-for-byte; per-route metadata through the
  `pageMetadata()` factory; og-image + icon file conventions). The
  neo-crm tech-stack pattern reference re-confirmed (the scaffold lineage:
  Next 16.4 · React 19.3 · Prisma 6.19/SQLite · Tailwind v4.3 CSS-first ·
  Vitest 5 · Playwright · Bun — the infra seams carried at s190).

## 2. The live re-audit: the NINTH consecutive zero-drift census

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 200** — the ninth consecutive shell census with no new restyle
  wave: the body census answering `[#root → DIV.min-h-screen,
  #base44-edit-badge, recharts span]` exactly as documented, the shell
  (nav classes + the outer surface wrapper hierarchy byte-identical), all
  four app pages byte-verified (containers 7xl/5xl/5xl/4xl), every page
  title cross-checked on both apps with FULL navigations (the s199
  methodology note applied — `/`→"Budget Wise", `/login`→"Budget Wise",
  `/Dashboard`→"Budget Wise", `/Transactions|/Budgets|/Profile`→"<Page> |
  Budget Wise"), the 404 surface (the interpolated humanized title `Curl
  Probe 201 Test | Budget Wise` answering identically to our s196
  implementation), the mobile bottom bar byte-identical on every
  dimension (bar classes, the row wrapper, item classes, ink split, rect
  y=767 h=77), the scroll-end clearance (764 ≤ 767 measured per the e2e
  contract's lowest-box form on BOTH apps), both dialogs (the Add
  Transaction tabs + native select; the Set Budget labels + 0.00
  placeholder), the sitemap format + robots.txt, the login card (the
  4-button OAuth row), the donut geometry (the 341×280 wrapper, the
  200×200 pie surface, the 331px legend), and the transaction-row anatomy
  (divide-y rows, `flex items-center gap-4 p-4 hover:bg-slate-50`,
  description-first titles, tinted category badges).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions (a
  Bills & Utilities row first). No owner-data churn this round; the s200
  census baseline holds verbatim.
- The dual-app diff ran the same census on the local dev server: the
  shell matching (nav classes identical, `body (WHITE) > DIV('') >
  DIV.min-h-screen.bg-slate-50` + our documented platform-face body
  chrome), the mobile bar byte-identical (+ the aria-current superset),
  all page titles curl-verified matching (the 404's interpolated title
  WITH the real 404 status + the alias titles + the dashboard/login
  defaults), both dialogs matching, the SEO surfaces matching (sitemap
  format, robots, manifest 200), the donut geometry identical (341×280
  wrapper + 331 legend), and the clearance identical (764 ≤ 767 both
  apps).
- The VLM battery: **4/4 "Structural Differences: None"** (dashboard
  desktop, dashboard mobile, budgets mobile, profile mobile) — the second
  consecutive fully-clean battery.
- The dev-boot guard live-verified on the round's build→dev sequence (the
  baseline gate's build → the dual-app dev boot): health 200, no reload
  loop (0 page re-fetches vs the 646-refix unguarded genus).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (the ninth census): the shell, all four pages, the
  mobile bar, the clearance, both dialogs, all titles (404 + aliases +
  page defaults), the sitemap + robots + manifest, the login card, the
  donut geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the e2e battery green in the baseline gate).
- Tailwind v4: no bugs (all pins verified in place).
- The `.env`/`db` contract: matching the six-knob contract; `db/` at the
  repo root; the db-path seam pinned. `.env.example` tracked at HEAD and
  matching the codebase (no env surface changed this round).
- The Vitest + Playwright suites: in place (410/66), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The security sweep, the docs-count lockstep, the skills/ exclusion, the
  neo-crm stack-pattern lineage.

### F-1 — the Next.js 16.4 `middleware`→`proxy` file-convention deprecation (remediate this round)

- **Location:** `src/middleware.ts` (the s196 x-pathname stamp seam) + the
  dev server boot log.
- **Description:** the dev log now emits, on every boot: *"The 'middleware'
  file convention is deprecated. Please use 'proxy' instead."* Next.js
  16.4 renamed the file convention: `src/proxy.ts` with an exported
  function named `proxy` (or a default export) replaces `src/middleware.ts`
  with `export function middleware`. The middleware still WORKS in 16.4.2
  (deprecated, not removed — the build output already labels the leg
  "Proxy (Middleware)"), but a future Next upgrade can drop the deprecated
  form, and the project's production-grade posture keeps the boot log
  clean.
- **Evidence:** the dev-boot log of this round's dual-app diff (Ready in
  285ms, then the deprecation block); the installed 16.4.2 sources
  (`node_modules/next/dist/lib/constants.js`: `PROXY_FILENAME = 'proxy'`,
  `PROXY_LOCATION_REGEXP = (?:src/)?proxy`; the template's resolution
  error names the `proxy` export contract).
- **Impact:** none today (the seam works — the 404 title interpolates
  correctly, curl-verified this round on both apps); a forward-compatibility
  deprecation that compounds with every Next upgrade.
- **Severity:** Low (deprecation-class; no user-visible behavior).
- **Recommended fix:** the surgical rename — `git mv src/middleware.ts
  src/proxy.ts` + `export function middleware` → `export function proxy`
  + the institutional-memory comment updated; the matcher config
  byte-identical. The behavior net holds it: the unit pin
  (`tests/not-found-title.test.ts` — updated to read `src/proxy.ts`),
  the e2e 404-surface battery (3 tests) + the capitalized-route titles
  test, and the live curl of the 404 title.
- **Confidence:** Verified (the deprecation observed live; the proxy
  convention confirmed in the installed 16.4.2 sources; the behavior
  contracts all green in this round's baseline gate).

### F-2 — the stale `401` unit-count claims in the SKILL (documentation true-up)

- **Location:** `budget-wiser_SKILL.md` §13 (line ~473: `bun run test # full
  unit suite (401)`) + Appendix B (line ~749: `test (401) → …`).
- **Description:** the SKILL's quality-gate block + pre-ship checklist still
  claim the s196-era 401 unit count. The s197 round moved the count
  401 → 410 and the count-lockstep rule mandates `rg "<old number>"` across
  the doc set — but `rg "401"` is a noisy search (the HTTP-401 envelope is a
  legitimate, frequent string), and the two stale spellings survived four
  subsequent rounds (s197–s200) whose lockstep checks verified the "410"
  claim sites rather than re-hunting the old spelling. Found this round by
  the plan-validation sweep (enumerating every count claim before writing
  the count-change plan).
- **Impact:** documentation drift only — the living contract in the SKILL
  disagrees with the shipped suite (the §12 tier table says 410; the §13
  block two sections later says 401 — an internal contradiction inside one
  document).
- **Severity:** Low (docs-class).
- **Recommended fix:** both sites updated to the live count (410 — the
  count holds this round; the F-1 pin growth is assertion-level inside an
  existing test, not test-level), plus the plan-validation note recorded
  so the genus is documented: when a count changes, hunt BOTH the old
  number AND the sites that cite any older number still in the tree.
- **Confidence:** Verified (the two stale sites read verbatim above; the
  suite answered 410/410 in this round's baseline gate).

## 4. Remediation ToDo

**Phase A — the F-1 remediation (TDD: red → green)**

1. [x] RED: update `tests/not-found-title.test.ts`'s wiring pin — read
       `src/proxy.ts` (not `src/middleware.ts`), assert the
       `export function proxy` convention + the two existing x-pathname
       behavior pins, and add the absence guard (`src/middleware.ts` must
       NOT exist — the deprecated convention must not sneak back). Run the
       file → exactly the wiring test RED (the proxy file does not exist
       yet).
2. [x] GREEN: `git mv src/middleware.ts src/proxy.ts`; rename the export
       (`middleware` → `proxy`); update the file's header comment (the
       institutional memory preserved, the s201 rename note added). Run
       the file → green; run the full unit suite → 410/410 HELD (the pin
       block grows +2 ASSERTIONS inside the existing `it` — the
       export-convention pin + the absence guard — which moves zero
       test counts; vitest counts `it` blocks, not expects).
3. [x] Live verification: reboot the dev server → the deprecation notice
       GONE from the boot log; curl the 404 → the interpolated title
       intact with the real 404 status; curl the alias routes → the
       per-page titles intact.
4. [x] The count lockstep (the count HOLDS at 410 — the F-1 pin growth
       is assertion-level inside an existing `it`, not test-level; the
       F-2 stale-401 sites read 410): the enumerated claim sites —
       README.md (the tier table + the testing block), CLAUDE.md
       (§Test Pyramid + §Success Metrics), `budget-wiser_SKILL.md` (§12
       Tier 1, §13 the stale `(401)`, Appendix B the stale `test (401)`,
       Appendix C's session-201 row), the PAD (§7 the testing matrix + the
       new revision block) — every current-contract site correct in the
       same commit. Historical records (dated revision blocks, the
       provenance string, Appendix C's s196–s200 rows) keep their era's
       numbers.

**Phase B — the evidence refresh**

5. [x] The comment/doc lockstep for the rename: `src/app/not-found.tsx`
       (the `src/middleware.ts` citation), `src/app/not-found-body.tsx`
       (the middleware mention), `tests/metadata.test.ts` (the comment),
       `AGENTS.md` (the architecture-fact bullet), `budget-wiser_SKILL.md`
       §1 (the current-contract line — the historical Appendix C rows and
       the PAD's dated revision blocks keep their s196 wording as history).
6. [x] The screenshot battery recaptured from the remediated dev server
       (12 images, at the documented 1512×945 + 390×844 convention),
       pixel-diffed against the s200 set (the render-stability ladder:
       s198 10/12 → s199 10/12 → s200 11/12).

**Phase C — the session records + documentation true-up**

7. [x] `budget-wiser_SKILL.md` → v2.0.0: the frontmatter version +
   provenance gains the session-201 line; §1's x-pathname bullet cites
       `src/proxy.ts`; Appendix C gains the session-201 row.
8. [x] The PAD → v2.11.0: the revision block records the ninth census +
       the F-1 deprecation remediation.
9. [x] `docs/session_21.md` (this round's log — Session 15 / Task ID 201)
       + the worklog entry.
10. [x] This plan ticked + the execution addendum.

**Phase D — ship**

11. [x] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
       typecheck 0 · 410/410 unit HELD · build · 14/14 smoke · 66/66 e2e
       (CI=1) — all three counts must hold (the F-1 pin growth is
       assertion-level; the e2e + smoke legs are untouched by the
       rename).
12. [x] Commit (atomic, Conventional Commit, the message explains why) →
       push `HEAD:refs/heads/main` via `docs/ssh_git_wrapper_v3.py`
       (the runbook: `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` —
       the wrapper's default remote is the OLD task-management repo, so
       pass `--remote` explicitly); verify the remote ref; shred the key.

## 5. Risks and guards

- **The seam's behavior must not move:** the matcher config stays
  byte-identical; the x-pathname stamp stays the file's ONLY effect (no
  redirects, no rewrites, no response mutation). The e2e 404 battery +
  the live curl are the proof.
- **No gate weakening, no assertion deletion:** the pin block is EXTENDED
  (the two behavior pins survive verbatim), not replaced.
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an
  invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- The count lockstep moves in the same commit as the code change (the
  s192/s197 discipline).

## 6. Execution addendum (what the plan grew mid-round)

- **The count semantics correction (planned as 412, executed as 410
  HELD):** the plan initially projected +2 test counts for the pin growth —
  executed, the growth is +2 ASSERTIONS inside the existing `it` (the
  wiring test), and vitest counts `it` blocks, not expects. The plan's
  count-lockstep items were corrected mid-round (before any doc edits):
  the count HOLDS at 410, and the F-2 stale-401 sites read 410. The lesson
  joins the count-lockstep canon: name the metric (tests vs assertions)
  before projecting a count change.
- **The RED/GREEN/mutation evidence:** the re-pointed pin answered exactly
  1 RED pre-rename; `git mv` + the export rename → 9/9 green + the full
  suite 410/410 HELD; a recreated `src/middleware.ts` → exactly 1 RED (the
  absence guard); removed → green. The live proofs: the deprecation notice
  GONE from the dev boot log; the 404 title interpolating (`Curl Probe
  201 Test | Budget Wise`) with the real 404 status; all alias titles
  intact through the proxy.
- **The screenshot battery's three capture findings, all investigated
  before classification:**
  1. *The dashboard-desktop mid-animation genus* — the first capture
     differed at the donut's 200×200 pie region (the recharts default
     sweep animation caught mid-flight; `isAnimationActive` is not
     disabled by design). Re-captured after a 3s settle → **byte-identical
     to the s200 set**. The lesson: settle-wait the charts before
     capturing.
  2. *The avatar-jitter genus (documented since s197)* — the two profile
     frames at 87/104 changed pixels (≤0.0002%), bbox identical to the
     documented (84,255)–(235,377) form.
  3. *The backdrop-blur compositing genus (NEW)* — the two dialog frames
     at wide-area diff, deterministic across two captures (byte-identical
     recaptures), concentrated in the blurred backdrop (77% of the
     backdrop area changed vs 5.6% of the card crop); the dialog card
     DEEP INTERIOR **0/93,000 px changed** — content byte-identical; the
     same page's no-overlay frame byte-identical. Classified
     capture-environment (this sandbox's headless rasterization of the
     Radix `backdrop-blur-sm` overlay vs the s200 sandbox's), NOT drift —
     the e2e suite + the live DOM census carry the dialog parity.
- **A battery-tooling bug found and fixed in the harness (not the app):**
  the first pixel-diff pass reported a constant 0.3922% on every differing
  frame — a `sum(histogram)` formula bug (the histogram counts PIXELS per
  bin, so its sum is always w×h; the correct delta metric is
  `sum(i × hist[i])`). The corrected metric produced the real numbers
  (87 px, 104 px, the dialog-region analysis). The diff harness lives
  outside the repo (the workspace scripts/); the formula fix noted here so
  a future round does not re-derive the phantom-constant.
- **The final battery verdict:** 8/12 byte-identical + 2 profile frames at
  the avatar-jitter genus + 2 dialog frames at the backdrop-blur compositing
  genus — with 10 of 12 frames at ≤0.0002% or byte-identical, and the two
  dialog frames' deltas proven backdrop-only. The render-stability signal
  holds (s200: 11/12 + 0.0004%; s201: 8/12 + 0.0002%, the dialog pair
  environment-classified).
- **The repo delta note:** the round's census found the reference's data
  state UNCHANGED from the s200 baseline (3 txns / −$2,481.00) — the first
  round since s193 with no owner-data movement; the s200 baseline stands
  as the next census's comparison point.
