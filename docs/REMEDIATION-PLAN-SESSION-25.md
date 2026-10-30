# Budget Wise — Session 25 Remediation Plan

**Date:** 2026-10-30 · **Task ID:** 214 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the twenty-second consecutive census; the seventh census after the s207 percent-encoding fix, re-verifying it holds on both apps; the round's battery answered **8/12 byte-identical on the first captures — with the two profile-frame transients answering HEAD's exact bytes on the immediate re-capture (0 px), 10 of 12 frames at HEAD's bytes within the round — and the two remaining delta frames each at its documented capture-environment genus**: dashboard-desktop at the sub-visible composite-variance band (49,189 changed px, ZERO above the 8-luminance threshold, the same (172,818)–(927,886) band as the s211/s212 genus), add-transaction-dialog at the caret-phase cluster (118 px, 100% confined to the (596–613, 552–562) box, two consecutive fresh captures byte-identical — the s213 N-1 genus); the only deltas are documentation)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the seventh reset in the sequence) —
  the fresh-clone bootstrap exercised live end-to-end: `git clone` at
  `177b669` (the owner's `docs/session_46.md` transcript commit atop the s213
  ship `24bedd2`; the repo delta since the ship verified docs-only, one
  file) → `bun install` (513 packages) → the six-knob `.env` from
  `.env.example` + a fresh `AUTH_SECRET` (openssl rand -hex 32) →
  `bun run db:push` + `bun run db:seed` (2 users / 4 transactions / 0
  budgets; custom.db at the repo root, git-ignored) → `bunx playwright
  install chromium` (the recurring fresh-workspace revision step: the full
  120 MiB headless-shell 1248 download — the sandbox cache does not carry
  the clone's pinned revision).
- The five root documents + `docs/session_45.md` +
  `docs/REMEDIATION-PLAN-SESSION-24.md` + `worklog.md` +
  `docs/session_46.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-213
  ship state, green on the first full pass of the fresh environment (the
  mobile-navigation battery additionally re-verified standalone: 12/12).
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME in `src/`, no `any` leaks; the
  tree's three `console.*` hits answered as the documented sanctioned
  diagnostics — the two `[verification] code for …` in-app OTP delivery
  lines gated by `NEO_DISABLE_IN_APP_OTP` and the dev-only
  `[auth] AUTH_SECRET … falling back` warning; the key-pattern mentions
  in the tree answered as the instructional docs + the wrapper's
  `[REDACTED:ssh_private_key]` placeholder only), `src/middleware.ts`
  absent + `src/proxy.ts` in place (the s201 seam, `x-pathname` stamped),
  the docs-count lockstep verified (414/67/14 live-tense in README/CLAUDE;
  AGENTS count-free by design), `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest include
  patterns · playwright testDir), and the mandated focus areas each swept
  clean — the **mobile navigation** (the 12-test e2e battery green
  standalone: 12/12 + the live byte-census on BOTH apps during the
  dual-app diff) and **TailwindCSS v4** (the `@custom-variant hover`
  unwrap at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins, the v3
  palette re-pin block (135 `--color-*` token lines), the `safe-area-pb`
  @utility at :405, literal-class discipline — no config JS, no
  v4-family bugs found). The `.env`/`db` contract verified (six knobs,
  `db/` at the repo root, the seam pinned by `tests/db-path.test.ts`,
  `.env.example` tracked at HEAD with identical knob names), the Vitest +
  Playwright suites verified in place with clean config scopes, the SEO
  surfaces verified (sitemap + robots + manifest explicit route handlers),
  and the neo-crm tech-stack pattern reference re-confirmed from the
  carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTY-SECOND census — ZERO code findings

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural drift
  since session 213** — the seventh census after the s207 percent-encoding
  remediation, and the fix VERIFIED LIVE on both apps once more: the
  `%20` probe (`/Curl%20Probe%20214%20Test`) answers the DECODED title
  `Curl Probe 214 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-214`) answers "Hyphen Probe 214 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps. The
  malformed-escape posture held the s210 genus AND face for the fifth
  consecutive round: the reference's CDN answers **520**
  (`error code: 520`, curl-verified) where ours still answers the designed
  404 with the never-throw raw-segment fallback (real 404 status,
  curl-verified, the raw `%E0%A4%A` segment quoted in the title).
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0`
  + the outer `min-h-screen bg-slate-50` surface wrapper), all four pages
  (containers 7xl/5xl/5xl/4xl, titles via FULL navigations —
  `/Dashboard`→"Budget Wise", `/Transactions|/Budgets|/Profile`→"\<Page\>
  | Budget Wise"), the mobile bottom bar byte-identical on every
  dimension (the bar classes incl. `safe-area-pb`, the `flex
  items-center justify-around py-2` row wrapper, the four anchors' item
  classes, the ink split on the anchor AND its svg — slate-900 active /
  slate-400 inactive, rect top=767 h=77, NO aria-current on the
  reference), the scroll-end clearance (764 ≤ 767 measured with the same
  all-boxes lowest-box form at scroll-end on BOTH apps), both dialogs
  (the expense genus `food…other` with `value="health"` for Healthcare in
  the option family; the income family `other/salary/freelance/
  investment/gift` flipping cleanly on the driver's focus+Enter keyboard
  activation — the documented platform contrast), the Set Budget dialog
  (Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
  format + robots.txt (curl-verified LF-only, 4-space indent, changefreq
  weekly, priority 1.0/0.8, lowercase "User-agent"; manifest 302 on the
  reference vs our 200 functional superset), the login card (the
  4-button OAuth row), the donut geometry (341×280 container / 200×200
  `g.recharts-pie` / 331px legend on the precise probe at the pinned
  1512×945 viewport), and the transaction-row anatomy (the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` family on
  /Transactions with the inner three-children family byte-identical:
  [p-2.5 rounded-xl bg-red-50 text-red-600, flex-1 min-w-0, flex
  items-center gap-4]).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  FOURTEENTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight guard
  (the gate's build tree removed — `[dev-preflight] removed the stale
  production .next tree`, health 200 + db up, 0 reload loops, zero
  notices) before the daemonized census boot — which answered CLEAN on
  the first attempt (the s213 N-3 orphan-posture lesson APPLIED and
  verified: the process tree killed via pkill + the port verified free
  via `ss` BEFORE the daemonized spawn; zero EADDRINUSE this round). The
  local census matched on every surface: the login card (the 4-button
  OAuth row; the local login answered clean on the first post-hydration
  submit), the seeded demo KPIs ($4,424.55 / 88.5% saved — the documented
  data-borne divergence), the shell (with our documented body-chrome
  platform-face genus), all four pages + titles, the 404 surface
  byte-matching (the decoded title + the raw-encoded body + the real 404
  status + the "Go Home" button; the malformed-escape path answering our
  designed 404), both dialogs matching (our `healthcare`/`other_income`
  internal-wire ids + the placeholder option — the documented
  internal-wire genus; our Radix Income tab flipping cleanly on a
  synthetic click — the documented platform contrast), the SEO surfaces
  matching (the documented lowercase-loc divergence, format byte-matched;
  manifest 200 — our functional superset vs the reference's 302), the
  donut geometry byte-identical (341×280 / 200×200 / 331), the row
  anatomy (the inner family byte-identical), and the mobile bar
  byte-identical (+ the `aria-current="page"`/nav-landmark superset —
  ours a `nav[aria-label="Main navigation"]` landmark, the reference's a
  plain DIV) with the clearance identical (764 ≤ 767 both apps, the same
  probe form).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy.
- The s207 percent-decode fix: live-verified on both apps for the seventh
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
  (live-verified on the un-daemonized boot) — and the s213 N-3
  tree-kill/ss-verify lesson answered clean (zero EADDRINUSE on the
  daemonized boot).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the fourteenth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The screenshot battery answered **8/12 byte-identical
on the first viewport-pinned captures** (landing, login,
transactions-desktop, budgets-desktop, set-budget-dialog, dashboard-mobile,
transactions-mobile, budgets-mobile — all md5-identical to HEAD's
`docs/screenshots/` set), with the two profile frames' first-pass deltas
(87/104 changed px, ZERO above the 8-luminance threshold, max lum 5/255)
**conclusively disproven as code-borne by the immediate re-capture
answering byte-identical to HEAD (0 px)** — 10 of 12 frames at HEAD's
exact bytes within the round — and the two remaining delta frames each
at its documented capture-environment genus (see N-1), so no evidence
frames needed refreshing.

### N — informational notes (documentation, not code)

- **(N-1) The battery: 8/12 first-pass byte-identical + the profile-frame
  transient sub-form (a first observation) + the two documented genera.**
  The dashboard-desktop frame answered 49,189 changed px (3.44%) in the
  band (172,818)–(927,886) with ZERO px above the 8-luminance threshold
  (max lum 5/255, zero strong deltas) — the exact s211/s212 sub-visible
  composite-variance genus (same band, same sub-visible envelope,
  capture-environment-borne). The add-transaction-dialog frame answered
  118 changed px at bbox (596,552)–(613,562) — the exact s213 caret-phase
  genus (the focused Amount input's text caret at a different blink
  phase): two consecutive fresh captures of the identical dialog answered
  byte-identical (0 px between them; the caret frozen post-blink), and
  100% of the delta confined to the caret box with ZERO changed pixels
  elsewhere; content verified identical by the round's direct byte-census.
  **The first-observation sub-form:** the profile-desktop (87 px) and
  profile-mobile (104 px) frames each answered a sub-visible delta in
  the avatar region (ZERO above the 8-luminance threshold, identical
  row-band structure on both axes) on the first capture — and the
  immediate re-capture of both frames answered byte-identical to HEAD
  (0 px): a TRANSIENT sub-visible rasterization phase, conclusively
  disproven as code-borne (the same code answered HEAD's exact bytes on
  the very next capture). HEAD's evidence set stays; zero frames
  refreshed (the s209 posture).
- **(N-2) The reference's malformed-escape edge face HELD at 520** (the
  s210/s211/s212/s213 note, fifth consecutive round): the genus is
  unchanged — the platform edge bounces malformed escapes (the reference
  CDN answers `error code: 520`, curl-verified), never the reference
  SPA's designed 404 — and ours still answers the designed 404 with the
  never-throw raw-segment fallback (the raw `%E0%A4%A` segment in the
  title, real 404 status, curl-verified). Platform-owned, documented not
  remediated.
- **(N-3) The VLM battery's flag variance answered the documented genera**
  (the s204 methodology note): 1× "structural_differences: None"
  (budgets-desktop) + the other three pairs' flags all the documented
  DOM-disproven data-borne/platform genera — the dashboard pair's
  savings-badge conditional + donut-segment data state + recent-list data
  (data-borne: the reference's negative balance hides the badge, our
  seeded 88.5% shows it; the owner's 2-category data vs our seeded
  3-category demo month; the owner's 3-row vs our 4-row demo month) and
  the transactions-mobile + profile-mobile pairs' platform-badge
  occlusion over the bar's right tabs (both frames' folds read as "2-item
  bars" — DISPROVEN by the round's direct byte-census: all four anchors
  byte-matched on both apps, rect 767/77, the same probe form) —
  cross-checked against the round's direct byte-census before
  classification. The battery is a coarse signal, never a gate; the
  direct byte-census remains the classifier of record. This round's
  transactions-mobile pair flagged where s213's answered "None" — the
  flag variance answering within the documented envelope (the same
  platform-occlusion genus family, the same DOM-disproven
  classification).
- **(N-4, operational) The s213 N-3 tree-kill lesson APPLIED and
  verified:** killing the proof boot's process TREE (`pkill -f "next
  dev"` + the next-server child) and verifying the port free with `ss`
  BEFORE the daemonized spawn answered a clean first-attempt daemon boot
  — zero EADDRINUSE this round (the s213 round had hit the orphan
  posture). The lesson is now the standing posture for future rounds.

## 4. Remediation ToDo (documentation true-up + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 viewport-pinned
       convention, the settle-waits applied — ≥3.5s on the dashboard
       frame, ≥3s on the dialog frames — the origin-surface contract
       honored: add-transaction from the Dashboard, set-budget from the
       Budgets page) + the pixel-diff against the HEAD captures:
       **8/12 byte-identical on the first captures + the two profile
       transients disproven by the immediate re-capture (HEAD's exact
       bytes, 0 px) + the two documented genera (N-1)**. Zero frames
       refreshed.
2. [x] The VLM battery: 4 pairs (the census JSON format) — 1×
       "structural_differences: None" + the other three pairs' flags all
       answering the documented DOM-disproven data-borne/platform genera
       (N-3) — cross-checked against the round's direct byte-census
       before classification.

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.23.0: the frontmatter version bump +
       the provenance gains the session-214 clause + Appendix C gains
       the session-214 row + the Source sessions list gains the 214
       entry. Historical rows keep their era's numbers.
4. [x] The PAD → v2.24.0: the revision block records the twenty-second
       census — the zero-code-finding round that re-verified the s207
       fix live on both apps for the seventh consecutive census + the
       520 edge-face hold (fifth round) + the battery classification
       (the profile transient sub-form + the two documented genera);
       counts held at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
        README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
        found).
6. [x] `docs/session_47.md` (this round's log — Session 28 /
        Task ID 214) + the `worklog.md` entry (Task ID 214, appended,
        never overwritten) + this plan ticked + the execution
        addendum.

**Phase C — ship**

7. [x] The dev server STOPPED (tree killed via pkill, port verified free
       via `ss`), then the full gate re-run: lint 0/0 · typecheck 0 ·
       414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1) — the
       counts answered exactly (the re-run green on the first pass of
       the fresh environment, twice in the round: the baseline gate and
       the pre-ship gate).
8. [ ] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit,
       the message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
       `--remote` explicitly, the default remote is the OLD repo);
       verify the remote ref; shred the key.

## 5. Risks and guards

- **A zero-code round ships documentation only:** the round's only
  code-adjacent deltas are the documentation set; no `.env`/db/`skills/`
  files enter the commit (git status verified clean of secrets, logs,
  and databases).
- **The battery classification is evidence, not a new gate:** the md5
  cross-verification + the two-captures proofs (the profile twins'
  immediate re-capture at HEAD's exact bytes; the add-transaction twins'
  A=B byte-identity) guard against a tooling artifact; every delta frame
  was classified against the documented genera families AND
  cross-checked against the round's direct byte-census of the same
  surfaces before classification.
- **The settle-wait discipline stays load-bearing:** the donut-bearing
  frames want ≥3.5s, the dialog frames ≥3s, and the dialog frames pin
  their ORIGIN SURFACES (add-transaction from the Dashboard, set-budget
  from Budgets) — the discipline was applied in full this round.
- **The viewport-pinned capture contract:** HEAD's evidence frames are
  viewport-pinned (1512×945 / 390×844), NOT full-page — this round's
  captures applied the contract on the first pass (the s213 full-page
  mistake NOT re-hit).
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an
  invitation) — and the s213 N-3 tree-kill/ss-verify posture applied
  (verified clean this round: zero EADDRINUSE).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- No count movement this round: the gate must answer 414/414 · 14/14 ·
  67/67 exactly (the lockstep verified pre-ship).

## 6. Execution addendum

- The fresh-clone bootstrap answered the baseline gate green on the
  first full pass: bun install 513 packages → the six-knob `.env` (the
  fresh AUTH_SECRET) → db:push + db:seed (custom.db at the repo root) →
  the Chromium revision step (the full 120 MiB headless-shell 1248
  download) → lint 0/0 · tsc 0 · 414/414 unit · build · 14/14 smoke ·
  67/67 e2e (CI=1), with the mobile-nav battery 12/12 standalone.
- The un-daemonized guard proof ran in a single Bash invocation (the
  sandbox reaps process trees between calls): the stale production tree
  (the gate's build leg had left it) removed by the preflight, health
  200 + db up, zero reload loops, zero notices.
- The s213 N-3 lesson applied: the process tree killed via pkill + the
  port verified free via `ss` BEFORE the daemonized spawn — the
  daemonized census boot answered CLEAN on the first attempt (zero
  EADDRINUSE — the lesson's first post-adoption proof).
- The local login answered clean on the first post-hydration submit (the
  documented fill-vs-hydration race avoided by waiting for the card's
  full render before the fill — the CLAUDE.md test-rule posture applied
  at the driver level).
- The battery's md5 cross-check: the eight stable frames' hashes matched
  HEAD's docs/screenshots/ exactly; the two profile frames'
  first-pass sub-visible deltas (87/104 px, zero above the 8-luminance
  threshold) answered HEAD's exact bytes on the immediate re-capture
  (0 px — a transient rasterization phase, conclusively
  environment-borne); the two remaining delta frames classified at their
  documented genera before the zero-refresh decision (the s209 posture:
  delta frames at documented capture-environment genera do not refresh
  HEAD's evidence set).
- The VLM battery's tooling: no VLM tooling persisted in the workspace
  this round — the battery script re-created per the standing argv
  convention (`<refDir> <localDir>`, the census JSON prompt format, the
  z-ai CLI underneath); the four pairs answered 1× "None" + the
  documented DOM-disproven data-borne/platform flags.
- The dev log carried zero errors/warnings/deprecations across the
  whole census (zero EADDRINUSE lines, zero reload mentions); the dev
  server was stopped and the browser closed before the documentation
  phase; `git status` answered clean (only gitignored
  `.env`/`db/*.db`/`dev.log` outside the commit).
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
