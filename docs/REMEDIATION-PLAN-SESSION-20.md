# Budget Wise — Session 20 Remediation Plan

**Date:** 2026-10-29 · **Task ID:** 209 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the seventeenth consecutive census with no new restyle wave; the second census after the s207 percent-encoding fix, re-verifying the fix holds on both apps; the round's only deltas are the already-documented capture-environment genera, remediated as evidence refresh, not code)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the fourth reset in the sequence) —
  a fresh `git clone` booted the round; the repo delta since the s208 ship
  verified docs-only (one file: the owner's `docs/session_36.md` transcript
  commit `a9019ed` atop the s208 ship `33e6c31`). The fresh-clone bootstrap
  exercised end-to-end per the s204/s205/s208 pattern: `bun install`
  (513 packages) → `cp .env.example .env` + a fresh `AUTH_SECRET` →
  `bun run db:push` + `bun run db:seed` (the documented demo month) → the
  e2e leg's Chromium (`bunx playwright install chromium` — the fresh
  sandbox's browser cache carried the PRIOR persisted workspace's revision
  1200; the fresh clone's Playwright 1.64.1 pins revision 1248, so the
  first e2e run of a fresh workspace fails the executable-revision check
  until the documented bootstrap step runs; the s208 N-2 note, re-hit).
- The five root documents + `docs/session_35.md` +
  `docs/REMEDIATION-PLAN-SESSION-19.md` + `worklog.md` +
  `docs/session_36.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-208
  ship state, green on the first full pass of the fresh environment.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`, no
  `any` leaks, no eval/new Function; the key-pattern mentions in the tree
  answered as instructional text + the wrapper's redacted placeholder
  only), `src/middleware.ts` absent + `src/proxy.ts` in place (the s201
  seam), the docs-count lockstep verified (414/67/14 live-tense), `skills/`
  confirmed excluded from all four check/test/compile scopes (tsc exclude ·
  eslint ignores · vitest include patterns · playwright testDir), and the
  mandated focus areas each swept clean: the **mobile navigation** (the
  12-test e2e battery green standalone + the live byte-census on BOTH apps
  during the dual-app diff) and **TailwindCSS v4** (the `@custom-variant
  hover` unwrap, the `--shadow-sm`/`--blur-sm` re-pins, the v3 palette
  re-pin block, the `safe-area-pb` @utility, literal-class discipline, no
  config JS — no v4-family bugs found). The `.env`/`db` contract verified
  (the six knobs, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`, `.env.example` tracked at HEAD with identical
  knob names), the Vitest + Playwright suites verified in place with clean
  config scopes, the SEO surfaces verified (sitemap + robots + manifest
  explicit route handlers), and the neo-crm tech-stack pattern reference
  re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the SEVENTEENTH census — ZERO code findings

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 208**: the body census answering exactly the documented form
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`), the shell
  byte-identical (nav classes `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0` +
  the outer `DIV.min-h-screen.bg-slate-50` surface wrapper), all four
  pages (containers 7xl/5xl/5xl/4xl, titles via FULL navigations —
  `/Dashboard`→"Budget Wise", `/Transactions|/Budgets|/Profile`→"\<Page\>
  | Budget Wise"), the mobile bottom bar byte-identical on every dimension
  (the bar classes, the `flex items-center justify-around py-2` row
  wrapper, the four anchors' item classes, the ink split on the anchor AND
  its svg, rect top=767 h=77, the four w-6/h-6 lucide icons, NO
  aria-current), the scroll-end clearance (764 ≤ 767 measured per the e2e
  contract's lowest-box form at scroll-end on BOTH apps), both dialogs
  (the VALUE-attribute probe answering the s203 genera verbatim —
  `value="health"` for Healthcare, the income-`other` reuse; the
  reference's Income tab keyboard-activated cleanly with the documented
  family swap), the Set Budget dialog (Category/Monthly Limit labels +
  the 0.00 placeholder), the sitemap format + robots.txt (curl-verified
  LF-only, 4-space indent, changefreq weekly, priority 1.0/0.8; lowercase
  "User-agent"), the login card (the 4-button OAuth row), the donut
  geometry (341×280 container / 200×200 `g.recharts-pie` / 331px legend
  on the precise probe), and the transaction-row anatomy (`flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` on
  /Transactions; the `p-3 rounded-xl` family on the Dashboard's recent
  list).
- **The s207 fix VERIFIED LIVE on both apps — the second consecutive
  census**: the `%20` probe (`/Curl%20Probe%20209%20Test`) answers the
  DECODED title `Curl Probe 209 Test | Budget Wise` on the reference and
  on ours identically, ours with the real 404 status (curl-verified); the
  `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-209`) answers "Hyphen Probe 209 | Budget Wise" on both;
  the 404 BODY quotes the raw encoded path on BOTH apps; the
  malformed-escape posture held (ours answers the designed 404, the
  reference's CDN bounces a bare 400 — the kept genus). The census lesson
  from s207 (probe a %20 path at least once per census) applied in its
  second round.
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  NINTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight guard
  (the gate's build tree removed — `[dev-preflight] removed the stale
  production .next tree`, Ready in 282ms, health 200 + db up, 0 reload
  loops, zero notices) before the daemonized census boot (the s204
  process-reaper posture; the daemonizer re-created per the standing argv
  convention — the workspace reset had retired the s208 tooling, recorded
  as N-3). The local census matched on every surface: the shell (with our
  documented body-chrome platform-face genus — the hidden React streaming
  div at body.children[0] + the Toaster portal + the route announcer), the
  mobile bar byte-identical (+ the `aria-current="page"`/nav-landmark
  superset), the clearance identical (764 ≤ 767 both apps), all titles
  matching, the 404 surface byte-matching (the decoded title + the
  raw-encoded body + the real 404 status + the "Go Home" button), both
  dialogs matching (our `healthcare`/`other_income` ids + the placeholder
  option — the documented internal-wire genus; our Radix Income tab
  flipping cleanly on a synthetic click — the documented platform
  contrast), the SEO surfaces matching (the documented lowercase-loc
  divergence, format byte-matched; manifest 200 — our functional superset
  vs the reference's 302), the donut geometry byte-identical
  (341×280 / 200×200 / 331), and the row anatomy (`p-4` family on
  /Transactions).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy.
- The s207 percent-decode fix: live-verified on both apps for the second
  consecutive census.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  db-path seam pinned; `.env.example` tracked at HEAD with identical
  knob names.
- The Vitest + Playwright suites: in place (414/67), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence
  (live-verified on the un-daemonized boot, Ready in 282ms).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the ninth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The four screenshot-battery delta frames are the
documented capture-environment genera (§4), not drift — proven by the
settled re-captures, the origin-surface re-capture, and this round's
direct byte-census on both apps.

### N — informational notes (documentation, not code)

- **(N-1) The dialog frame's ORIGIN-SURFACE census lesson:** the
  screenshot battery's add-transaction frame answered DELTA at 36.6%
  (523,556 px) when the dialog was opened from **/Transactions** — the
  HEAD baseline frame carries the dialog opened from the **DASHBOARD**
  (the blurred backdrop is the Dashboard's surface: the KPI row + the
  donut + the recent list, VLM-identified). The re-capture from the
  Dashboard origin answered at the exact documented backdrop-blur genus
  (16 px above the 64-luminance threshold, bbox (590,381)–(591,397)) —
  the card interior otherwise unchanged. The battery's dialog frames pin
  their ORIGIN SURFACE as part of the capture contract: add-transaction
  opens from the Dashboard, set-budget from the Budgets page (the
  set-budget frame answered at the exact 16-px genus on the first capture
  — its origin already matched).
- **(N-2) The fresh-workspace Chromium bootstrap note (recurring):** the
  sandbox's Playwright browser cache carried the prior persisted
  workspace's chromium revision 1200; the fresh clone's Playwright 1.64.1
  pins revision 1248, so the first `test:e2e` of a fresh workspace fails
  the executable-revision check until `bunx playwright install chromium`
  runs — the s208 N-2 observation, re-hit on this workspace reset. After
  the install: the full e2e suite green on the first pass.
- **(N-3) The tooling re-creation note (recurring):** the workspace reset
  retired the s208 capture-consumer tooling (the pixel-diff, the
  daemonizer); all re-created per the standing argv convention (every
  captures/log consumer takes its paths from argv) — the convention held
  through a workspace reset, the fifth consecutive round of the true-up
  class.
- **(N-4) The avatar-jitter genus on BOTH axes simultaneously:** both
  profile frames answered the avatar-jitter genus in the same round —
  profile-DESKTOP at 105 px (bbox (357,255)–(505,374), the exact
  s201/s203/s206/s208 desktop form) and profile-MOBILE at 120 px (bbox
  (84,255)–(235,377), the s202/s203/s205 form) — both SUB-VISIBLE (0 px
  above the 8-luminance threshold). The genus moves with the capture
  environment and can fire on both axes in one round — the axis that
  answers byte-identical is the environment's coin flip, never a code
  signal (the s206/s208 observation confirmed with both faces at once).

## 4. Remediation ToDo (evidence refresh + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 convention, the
       settle-waits applied — ≥3.5s on the dashboard frame, ≥3s on the
       dialog frames) + the pixel-diff against the HEAD captures:
       **8/12 byte-identical** (dashboard-desktop on the settled capture,
       budgets at both axes, dashboard-mobile, the landing, the login,
       transactions at both axes), the four delta frames each at its
       documented genus: profile-DESKTOP at the avatar-jitter genus in
       its exact s201/s203/s206/s208 desktop form (105 px, bbox
       (357,255)–(505,374) — SUB-VISIBLE, 0 px above the 8-luminance
       threshold) AND profile-MOBILE at the genus in its s202/s203/s205
       form (120 px, bbox (84,255)–(235,377) — SUB-VISIBLE, the fourth
       consecutive confirmation, both axes in one round); both dialog
       frames at the backdrop-blur genus — add-transaction at 16 px
       visible above the 64-luminance threshold on the Dashboard-origin
       capture (the exact s203/s205/s206/s208 count; the first
       /Transactions-origin capture answered the origin-surface artifact
       N-1, re-captured from the documented origin) and set-budget at
       16 px (the exact s203/s205/s206/s208 count, the first capture) —
       both card interiors otherwise unchanged.
2. [x] The VLM battery: 4 pairs (the census-201 JSON format) — 1×
       "Structural Differences: None" (budgets-desktop, the platform's
       edit-badge noted) + the other three pairs' flags all answering
       the documented DOM-disproven genera (the dashboard pair's
       savings-badge conditional — data-borne, the reference's negative
       balance hides it while our seeded 88.5% shows it; the
       transactions-mobile + profile-mobile pairs' platform-badge
       occlusion over the bar's right tabs — all four items present on
       both apps per the round's direct byte-census; the profile pair's
       avatar-content genus — the owner's uploaded photo vs our seeded
       default, data-borne) — cross-checked against the round's direct
       byte-census before classification (the s204 flag-variance
       methodology note re-confirmed: the battery is a coarse signal,
       never a gate; the "None" count varies with the battery's
       token-level reading of the same unchanged DOM).

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.18.0: the frontmatter version bump +
       the provenance gains the session-209 clause + Appendix C gains
       the session-209 row + the Source sessions list gains the 209
       entry. Historical rows keep their era's numbers.
4. [x] The PAD → v2.19.0: the revision block records the seventeenth
       census — the zero-code-finding round that re-verified the s207 fix
       live on both apps + the origin-surface census lesson; counts held
       at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
       README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
       found).
6. [x] `docs/session_37.md` (this round's log — Session 23 /
        Task ID 209) + the `worklog.md` entry (Task ID 209, appended,
        never overwritten) + this plan ticked + the execution
        addendum.

**Phase C — ship**

7. [ ] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
       typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
       (CI=1) — the counts must answer exactly.
8. [ ] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit,
       the message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
       `--remote` explicitly, the default remote is the OLD repo);
       verify the remote ref; shred the key.

## 5. Risks and guards

- **A zero-code round ships evidence + documentation only:** the four
  screenshot-battery deltas are the documented capture-environment genera
  (the avatar-jitter family + the backdrop-blur family + the
  origin-surface artifact), classified against the settled re-captures,
  the origin re-capture, and the direct byte-census — never the VLM
  alone.
- **The settle-wait discipline is load-bearing for the battery:** the
  donut-bearing dashboard frame wants ≥3s, the dialog frames ≥2.5s, and
  the dialog frames pin their ORIGIN SURFACES (add-transaction from the
  Dashboard, set-budget from Budgets) in this capture environment; the
  settled frames are the evidence frames.
- The dev server is stopped before the gate's build leg (the documented
  rule; the preflight guard is the backstop, not an invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- No count movement this round: the gate must answer 414/414 · 14/14 ·
  67/67 exactly (the lockstep verified pre-ship).

## 6. Execution addendum

- The fresh-clone bootstrap answered green on the first full pass after
  the documented Chromium step (N-2): install 4.19s → the six-knob .env →
  db push+seed (4 transactions, 0 budgets, the documented demo month) →
  lint 0/0 · tsc 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
  (CI=1).
- The un-daemonized guard proof ran in a single Bash invocation (the
  sandbox reaps process trees between calls): the stale production tree
  (the gate's e2e leg had just built it) removed by the preflight, Ready
  in 282ms, health 200 + db up, zero reload loops; the daemonized census
  boot followed per the s204 posture.
- The screenshot battery's add-transaction frame answered DELTA at 36.6%
  (523,556 px) on the first capture — the dialog opened from
  /Transactions while the HEAD frame carries it opened from the
  Dashboard (VLM-identified: the blurred backdrop is the Dashboard's
  surface in HEAD, the Transactions page in the first capture; the dialog
  card itself identical in both). The Dashboard-origin re-capture
  answered at 16 px above the 64-luminance threshold (bbox
  (590,381)–(591,397)) — the exact documented genus; the origin-surface
  contract recorded as N-1. The set-budget frame answered at the exact
  16-px genus on the first capture (its Budgets origin already matched
  HEAD's).
- The VLM battery's four pairs: budgets-desktop "None"; the dashboard
  pair's savings-badge flag + the transactions-mobile/profile-mobile
  pairs' platform-badge occlusion + the profile pair's avatar-content
  genus — all the documented DOM-disproven data-borne genera,
  cross-checked against the round's direct byte-census (all four bar
  items present on both apps; the avatar element present on both apps)
  before classification.
- The dev log carried zero errors/warnings/deprecations; the reference
  census left no console errors on either app.
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
