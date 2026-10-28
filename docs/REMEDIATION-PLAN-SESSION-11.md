# Budget Wise — Session 11 Remediation Plan

**Date:** 2026-10-28 · **Task ID:** 200 · **Branch:** `main` only · **Method:** TDD where code changes; documentation true-up where the finding is informational

## 1. Audit scope executed (this session)

- Intake: fresh `git clone` (the workspace had been reset) landing at `cfd089f`
  (the owner's `docs/session_18.md` transcript commit atop `49de043`, the
  session-199 ship — the seventh-census verification round). The environment
  was rebuilt from scratch: `bun install` (513 packages) · `.env` recreated on
  the mandated six-knob contract with `DATABASE_URL="file:../db/custom.db"` +
  a fresh 64-char `AUTH_SECRET` · `db:push` + `db:seed` (the demo month intact:
  2 users / 4 transactions / 0 budgets) · the Playwright chromium-1248 install
  (the cache held only 1200). The five root documents + `docs/session_17.md` +
  `docs/REMEDIATION-PLAN-SESSION-10.md` + `worklog.md` + `docs/session_18.md`
  were re-read and validated against the tree before touching anything, and the
  full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit · build ·
  14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-199 ship state.
  The repo delta since the s199 ship was verified docs-only (one file: the
  owner's transcript).
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`), the
  docs-count lockstep (410/66/14) verified at every claim site, `skills/`
  confirmed excluded from all four check/test/compile scopes (tsc · eslint ·
  vitest include patterns · playwright testDir), and the s197 seams re-verified
  in the tree (`scripts/dev-preflight.ts` + the wired `dev` script). The
  mandated focus areas each swept clean: the **mobile navigation** (the
  e2e battery green in the baseline gate + the live byte-census on BOTH apps
  during the dual-app diff — identical bar classes, the `flex items-center
  justify-around py-2` row wrapper, item classes, ink split, rect y=767 h=77,
  plus our documented `aria-current` superset) and **TailwindCSS v4** (the
  `@custom-variant hover` unwrap, the `--shadow-sm`/`--blur-sm` re-pins, the
  v3 palette re-pin block, the `safe-area-pb` @utility, literal-class
  discipline, no config JS — no v4-family bugs found).
- The `.env`/`db` contract verified live: `DATABASE_URL="file:../db/custom.db"`
  in `.env`, `db/` at the repo root, `db:push` + `db:seed` landing the demo
  month there, the seam pinned by `tests/db-path.test.ts`. The Vitest +
  Playwright suites verified in place (410/66) with clean config scopes. The
  SEO surfaces verified (sitemap.xml + robots.txt + manifest.json explicit
  route handlers, LF-only 4-space-indent sitemap, "User-agent: *" lowercase,
  per-route metadata through the `pageMetadata()` factory).

## 2. The live re-audit: the EIGHTH consecutive zero-drift census

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 199** — the eighth consecutive shell census with no new restyle
  wave: the body census answering `[#root → DIV.min-h-screen,
  #base44-edit-badge, recharts span]` exactly as documented, all four app
  pages byte-verified (containers 7xl/5xl/5xl/4xl, the sm-stacking headers,
  tracking-tight H1s), every page title cross-checked on both apps with FULL
  navigations (per the s199 methodology note — `/`→"Budget Wise",
  `/login`→"Budget Wise", `/Dashboard`→"Budget Wise",
  `/Transactions|/Budgets|/Profile`→"<Page> | Budget Wise"), the 404 surface
  (the interpolated humanized title `Curl Probe 200 Test | Budget Wise` —
  answering identically to our s196 implementation), the mobile bottom bar
  byte-identical on every dimension (bar classes, the row wrapper, item
  classes, ink split, rect y=767 h=77), the scroll-end clearance (764 ≤ 767
  measured per the e2e contract on BOTH apps), both dialogs (the
  `space-y-6 pt-4` forms, the native selects), the sitemap format +
  robots.txt, the login card (the 4-button OAuth row), the donut geometry
  (200×200 pie, 331px legend), and the transaction-row anatomy (divide-y rows,
  `flex items-center gap-4 p-4 hover:bg-slate-50`, description-first titles,
  tinted category badges).
- **The data-state note (data-borne, the excluded genus):** the reference's
  demo data moved on from the s193–s199 single food txn (−$1,000): the
  dashboard now answers Balance −$2,481.00 / Income $0.00 / Expenses
  $2,481.00 / 3 transactions (a Bills & Utilities row first among them).
  Owner-data churn on the live reference is the documented excluded genus —
  structural parity unaffected; our seed keeps the README-documented demo
  month ($5,000 Salary + $575.45 expenses, balance $4,424.55).
- The dual-app diff ran the same census on the local dev server: the shell
  matching (nav classes identical, `body (WHITE) > DIV > DIV.min-h-screen`
  + our documented platform-face body chrome), the mobile bar byte-identical
  (+ the aria-current superset), all page titles curl-verified matching (the
  404's interpolated title WITH the real 404 status + the alias titles + the
  dashboard/login defaults), both dialogs matching, the SEO surfaces matching
  (sitemap format, robots, manifest 200), the donut geometry identical, the
  row anatomy identical, and the clearance identical (764 ≤ 767 both apps).
- The VLM battery: **4/4 "Structural Differences: None"** (dashboard desktop,
  dashboard mobile, budgets mobile, profile mobile) — the cleanest battery in
  the project's history (the prior rounds' dashboard pairs flagged the
  data-borne genus; this round's pairs answered clean even with the
  reference's new 3-txn data).
- The dev-boot guard live-verified on the round's build→dev sequence: the
  server healthy (health 200), no reload loop (1 GET /login after the probe
  curl vs the 646-refix unguarded genus), the boot clean on the gate's
  build-written `.next` tree.

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (the eighth census): the shell, all four pages, the
  mobile bar, the clearance, both dialogs, all titles (404 + aliases + page
  defaults), the sitemap + robots + manifest, the login card, the donut
  geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both apps (the
  byte-census + the e2e battery green in the baseline gate).
- Tailwind v4: no bugs (all pins verified in place).
- The dev-boot guard: fired correctly on this session's build→dev sequence.
- `.env`/`.env.example`: matching the six-knob contract; `db/` at the repo
  root; the db-path seam pinned.
- The Vitest + Playwright suites: in place (410/66), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and matching.
- The security sweep, the docs-count lockstep, the skills/ exclusion.

**No code findings this round — a verification round.** The one informational
observation (the reference's demo data grew to 3 transactions / −$2,481.00)
is data-borne owner churn — the documented excluded genus — recorded in the
SKILL §1 reference-state note so the next census compares against the fresh
baseline.

## 4. Remediation ToDo

**Phase A — the evidence refresh**

1. [x] The screenshot battery recaptured from the dev server (12 images, at
       the documented viewport convention 1512×945 + 390×844):
       **11/12 pixel-identical to the s199 set** + the profile-mobile frame
       at 0.0004% pixel diff (bbox 84,255–235,377 — the sub-pixel avatar
       jitter genus documented since s197). The strongest render-stability
       signal of the battery's history. Copied into `docs/screenshots/`.

**Phase B — the session records**

2. [x] `docs/session_19.md` (this round's log) + the worklog entry
       (Task ID 200).
3. [x] This plan ticked + the execution addendum.

**Phase C — the documentation true-up**

4. [x] `budget-wiser_SKILL.md` — v1.9.0: the provenance + Appendix C gain
       the session-200 rows; the §1 reference-state note gains the
       eighth-census line + the fresh data-state baseline (3 txns /
       −$2,481.00, superseding the single-food-txn record).
5. [x] The PAD — v2.10.0: the revision block records the eighth census +
       the verification round.
6. [x] The README and AGENTS.md needed no changes — the counts held
       (410/66/14) and the round carries no new user-facing or
       agent-facing behavior contracts.

**Phase D — ship**

7. [x] Full gate re-run: lint 0/0 · typecheck 0 · 410/410 unit · build ·
       14/14 smoke · 66/66 e2e (CI=1) — counts unchanged (an
       evidence-and-documentation round must move zero counts).
8. [x] Commit (atomic) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the key.

## 5. Risks and guards

- **No gate weakening, no count movement**: an evidence-and-documentation
  round — the 410 unit / 66 e2e / 14 smoke counts must be IDENTICAL before
  and after (any drift means an unintended code change slipped in).
- **The dev server is stopped before the gate's build leg** (the documented
  rule; the preflight guard is the backstop, not an invitation).
- `skills/` stays excluded from every check/test/compile scope (re-verified
  this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.

## 6. Execution addendum (what the plan grew mid-round)

- **The reference's fresh data baseline:** the demo data grew from the
  s193–s199 single food txn (−$1,000) to 3 transactions / −$2,481.00
  (Balance −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 txns, a
  Bills & Utilities row first). Data-borne owner churn — the excluded
  genus; recorded in the SKILL §1 so the next census compares against
  the fresh numbers instead of re-deriving the classification.
- **The VLM battery's first fully-clean run:** 4/4 "Structural
  Differences: None" — the prior rounds' dashboard pairs always flagged
  the data-borne genus (the savings-badge conditional, the donut
  segments, the row counts) even after the DOM counter-proofs; this
  round's pairs answered clean on the first read, the reference's new
  3-txn data notwithstanding.
- **The battery's strongest stability signal:** 11/12 pixel-identical
  (vs 10/12 in s198/s199) + the one differing frame (profile-mobile) at
  0.0004% pixel diff — the sub-pixel avatar jitter genus documented
  since s197, now the only non-identical frame in the set.
- **The guard's fifth live proof:** the round's single build→dev
  sequence (the baseline gate's build → the dual-app dev boot) fired
  the preflight clean — health 200, db up, no reload loop. The guard's
  value compounds with every gate-then-dev workflow.
