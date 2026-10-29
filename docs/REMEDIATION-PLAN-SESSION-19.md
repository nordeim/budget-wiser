# Budget Wise — Session 19 Remediation Plan

**Date:** 2026-10-29 · **Task ID:** 208 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the sixteenth consecutive census with no new restyle wave; the first census after the s207 percent-encoding fix, verifying the fix held on both apps; the round's only deltas are the already-documented capture-environment genera, remediated as evidence refresh, not code)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the third reset in the sequence) —
  a fresh `git clone` booted the round; the repo delta since the s207 ship
  verified docs-only (one file: the owner's `docs/session_34.md` transcript
  commit atop the c716f75 ship). The fresh-clone bootstrap exercised
  end-to-end per the s204/s205 pattern: `bun install` (513 packages) →
  `cp .env.example .env` + a fresh `AUTH_SECRET` → `bun run db:push` +
  `bun run db:seed` (the documented demo month) → the e2e leg's Chromium
  (`bunx playwright install chromium` — the fresh sandbox's browser cache
  carried the PRIOR persisted workspace's revision 1200; the fresh clone's
  Playwright 1.64.1 pins revision 1248, so the first e2e run of a fresh
  workspace fails the revision check until the documented bootstrap step
  runs; recorded as N-2).
- The five root documents + `docs/session_33.md` +
  `docs/REMEDIATION-PLAN-SESSION-18.md` + `worklog.md` +
  `docs/session_34.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-207
  ship state, green on the first full pass of the fresh environment.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`, no
  `any` leaks, no eval/new Function), `src/middleware.ts` absent +
  `src/proxy.ts` in place (the s201 seam), the docs-count lockstep
  verified, `skills/` confirmed excluded from all four check/test/compile
  scopes (tsc exclude · eslint ignores · vitest include patterns ·
  playwright testDir), and the mandated focus areas each swept clean: the
  **mobile navigation** (the 12-test e2e battery green standalone + the
  live byte-census on BOTH apps during the dual-app diff) and
  **TailwindCSS v4** (the `@custom-variant hover` unwrap, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
  `safe-area-pb` @utility, literal-class discipline, no config JS — no
  v4-family bugs found). The `.env`/`db` contract verified (the six knobs,
  `db/` at the repo root, the seam pinned by `tests/db-path.test.ts`,
  `.env.example` tracked at HEAD with identical knob names), the Vitest +
  Playwright suites verified in place with clean config scopes, the SEO
  surfaces verified (sitemap + robots + manifest explicit route handlers),
  and the neo-crm tech-stack pattern reference re-confirmed from the
  carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the SIXTEENTH census — ZERO code findings

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 207**: the body census answering exactly the documented form
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`), the shell
  byte-identical (nav classes `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0` +
  the outer plain DIV > `DIV.min-h-screen.bg-slate-50` surface wrapper),
  all four pages (containers 7xl/5xl/5xl/4xl, titles via FULL navigations
  — `/Dashboard`→"Budget Wise", `/Transactions|/Budgets|/Profile`→"\<Page\>
  | Budget Wise"), the mobile bottom bar byte-identical on every dimension
  (the bar classes, the `flex items-center justify-around py-2` row
  wrapper, item classes, the ink split on the anchor AND its svg,
  rect top=767 h=77, the four w-6/h-6 lucide icons, NO aria-current), the
  scroll-end clearance (764 ≤ 767 measured per the e2e contract's
  lowest-box form at scroll-end on BOTH apps), both dialogs (the
  VALUE-attribute probe answering the s203 genera verbatim —
  `value="health"` for Healthcare, the income-`other` reuse; the
  reference's Income tab keyboard-activated cleanly with the documented
  family swap), the Set Budget dialog (Category/Monthly Limit labels +
  the 0.00 placeholder), the sitemap format + robots.txt, the login card
  (the 4-button OAuth row), the donut geometry (341×280 container /
  200×200 `g.recharts-pie` / 331px legend on the precise probe), and the
  transaction-row anatomy (`flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors` on /Transactions; the `p-3 rounded-xl` family on the
  Dashboard's recent list).
- **The s207 fix VERIFIED LIVE on both apps** — the first census after the
  remediation: the `%20` probe (`/Curl%20Probe%20208%20Test`) answers the
  DECODED title `Curl Probe 208 Test | Budget Wise` on the reference and
  on ours identically, ours with the real 404 status; the `%2D` path
  answers "Foo Bar | Budget Wise" on both (the decode-precedes-hyphen
  order); the 404 BODY quotes the raw encoded path on BOTH apps
  (`The page "Curl%20Probe%20208%20Test" could not be found…`); the
  malformed-escape posture held (ours answers the designed 404, the
  reference's CDN bounces a bare 400 — the kept genus); the fresh
  hyphenated probe path answered identically on both. The census lesson
  from s207 (probe a %20 path at least once per census) applied from its
  first round.
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  EIGHTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight
  guard (the gate's build tree removed — `[dev-preflight] removed the
  stale production .next tree`, Ready in 285ms, health 200 + db up, 0
  reload loops, zero notices) before the daemonized census boot (the
  s204 process-reaper posture; the daemonizer re-created per the standing
  argv convention — the workspace reset had retired the s207 tooling,
  recorded as N-3). The local census matched on every surface: the shell
  (with our documented body-chrome platform-face genus), the mobile bar
  byte-identical (+ the `aria-current="page"`/nav-landmark superset), the
  clearance identical (764 ≤ 767 both apps), all page titles matching,
  the 404 surface byte-matching (the decoded title + the raw-encoded
  body + the real 404 status + the "Go Home" button), both dialogs
  matching (our `healthcare`/`other_income` ids + the placeholder option
  — the documented internal-wire genus), the SEO surfaces matching (the
  documented lowercase-loc divergence, format byte-matched; manifest 200
  — our functional superset vs the reference's 302), and the donut
  geometry byte-identical (341×280 / 200×200 / 331).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy.
- The s207 percent-decode fix: live-verified on both apps (the round's
  headline verification).
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  db-path seam pinned; `.env.example` tracked at HEAD with identical
  knob names.
- The Vitest + Playwright suites: in place (414/67), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence
  (live-verified on the un-daemonized boot, Ready in 285ms).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the eighth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The three screenshot-battery delta frames are the
documented capture-environment genera (§4), not drift — proven by the
settled re-captures and the card-interior crop diffs.

### N — informational notes (documentation, not code)

- **(N-1) The donut settle-wait observation:** the screenshot battery's
  dashboard-DESKTOP frame answered DELTA on the first capture (495 px
  above the visible threshold spread across the 201×200 donut region) —
  the recharts donut's entry animation caught mid-flight; the
  networkidle + 1.2s wait is inside the animation window. The settled
  re-capture (a 3.5s wait) answered byte-identical to HEAD. The
  settle-wait discipline ("settle-waits on the charts", the s201/s202
  lesson) is confirmed load-bearing for the donut-bearing frames: the
  battery's dashboard frame wants the ≥3s settle (or the retry form)
  this environment's animation timing asks for.
- **(N-2) The fresh-workspace Chromium bootstrap note:** the sandbox's
  Playwright browser cache carried the PRIOR persisted workspace's
  chromium revision 1200; the fresh clone's Playwright 1.64.1 pins
  revision 1248, so the first `test:e2e` of a fresh workspace fails the
  executable-revision check (auth.setup: "Executable doesn't exist …
  chromium_headless_shell-1248"). `bunx playwright install chromium` is
  the bootstrap step (the README's "the Bun-installed Chromium for e2e"
  requirement, now with the observed failure mode). After the install:
  the full e2e suite green on the first pass.
- **(N-3) The tooling re-creation note:** the workspace reset retired the
  s206/s207 capture-consumer tooling (the pixel-diff, the dialog
  interior diff, the daemonizer); all re-created this round per the
  standing argv convention (every captures/log consumer takes its paths
  from argv) — the convention held through a workspace reset, the
  fourth consecutive round of the true-up class.
- **(N-4) The fresh-vs-fresh stability check on the dialog frames:** two
  consecutive captures of the identical set-budget dialog (a 1.2s-wait
  frame vs a 2.5s-wait frame) differ by 26,784 visible px in the card
  interior — the backdrop-blur/animation settle window spans the shorter
  wait; the settled frame answers HEAD at the exact documented genus
  (16 px above the 64-luminance threshold). The dialog frames want the
  ≥2.5s settle in this capture environment; the first-capture transient
  is a capture-timing artifact, never drift — the settled re-capture is
  the evidence frame.

## 4. Remediation ToDo (evidence refresh + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 convention) +
       the pixel-diff against the HEAD captures: **9/12 byte-identical**
       (dashboard-desktop on the settled capture, budgets at both axes,
       dashboard-mobile, the landing, the login, transactions at both
       axes, profile-mobile), the three delta frames each at its
       documented genus: profile-DESKTOP at the avatar-jitter genus in
       its exact s201/s203/s206 desktop form (bbox (357,255)–(505,374))
       — SUB-VISIBLE this round (0 px above the 8-luminance threshold)
       while profile-MOBILE answered byte-identical (the genus moving
       with the capture environment, confirmed the third consecutive
       round); add-transaction-dialog at 46 px visible above the
       64-luminance threshold (within the documented 16–66 blur-family
       range); set-budget-dialog at 16 px visible (the exact
       s203/s205/s206 count) — both card interiors otherwise unchanged,
       proven by the fresh-vs-fresh stability check + the settled
       re-captures.
2. [x] The VLM battery: 4 pairs (the census-201 JSON format) — 3×
       "Structural Differences: None" (budgets-desktop,
       transactions-mobile, profile-mobile) + the dashboard-desktop
       pair's 2 flags both answering the documented DOM-disproven
       genera (the savings-badge conditional — data-borne, the
       reference's negative balance hides it while our seeded 88.5%
       shows it; the donut-legend data state — data-borne, the geometry
       byte-identical per the direct census) — the FIFTH consecutive
       battery at zero structural flags, cross-checked against the
       round's direct byte-census before classification.

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.17.0: the frontmatter version bump +
       the provenance gains the session-208 clause + Appendix C gains
       the session-208 row + the Source sessions list gains the 208
       entry. Historical rows keep their era's numbers.
4. [x] The PAD → v2.18.0: the revision block records the sixteenth
       census — the zero-code-finding round that verified the s207 fix
       live on both apps; counts held at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
       README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
       found).
6. [x] `docs/session_35.md` (this round's log — Session 22 /
        Task ID 208) + the `worklog.md` entry (Task ID 208, appended,
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

- **A zero-code round ships evidence + documentation only:** the three
  screenshot-battery deltas are the documented capture-environment
  genera (the avatar-jitter + backdrop-blur families + the donut
  settle-wait observation), classified against the settled re-captures
  and the direct byte-census — never the VLM alone.
- **The settle-wait discipline is load-bearing for the battery:** the
  donut-bearing dashboard frame wants ≥3s, the dialog frames ≥2.5s in
  this capture environment; the settled frames are the evidence frames
  (the first-capture transients are capture-timing artifacts).
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
  in 285ms, health 200 + db up, zero reload loops; the daemonized census
  boot followed per the s204 posture.
- The screenshot battery's first dashboard-desktop capture answered
  DELTA at the donut (495 px spread across the 201×200 pie region — the
  entry animation caught mid-flight); the settled re-capture
  byte-identical to HEAD — the N-1 observation. The dialog frames'
  first captures answered the same transient genus; the settled
  re-captures answered at 46 px (add-transaction) and 16 px
  (set-budget) — the exact documented families — with the
  fresh-vs-fresh stability check (26,784 px between the 1.2s and 2.5s
  waits) proving the settle window, and the card interiors otherwise
  unchanged.
- The VLM battery's dashboard pair raised the two documented data-borne
  flags (the savings badge + the donut legend); the other three pairs
  answered clean. The s204 flag-variance methodology note re-confirmed:
  the battery is a coarse signal, never a gate.
- The dev log carried zero errors/warnings/deprecations; the reference
  census left no console errors on either app.
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
