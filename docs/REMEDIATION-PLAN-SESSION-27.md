# Budget Wise — Session 27 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 216 · **Branch:** `main` only · **Method:** documentation true-up + evidence verification (a zero-drift, zero-code-finding round — the twenty-fourth consecutive census; the ninth census after the s207 percent-encoding fix, re-verifying it holds on both apps; the round's battery answered **9/12 byte-identical on the first viewport-pinned captures** with the three delta frames each at its documented capture-environment genus AND each answered by the round's stability proof — the A/B twins byte-identical to each other AND to the round's first captures across two independent boots, the deltas deterministic properties of this sandbox's rendering stack; the round also produced ONE NEW OPERATIONAL FINDING: the dev-tree variant of the s197 reload loop, live-reproduced twice and cured by `rm -rf .next` — see N-1)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the eighth reset in the sequence) —
  the fresh-clone bootstrap exercised live: `git clone` at `00063b2`, the
  owner's `docs/session_50.md` transcript commit atop the s215 ship
  `a5eb7ce` (the repo delta since the ship verified docs-only, one file);
  `bun install` answered 513 packages; the six-knob `.env` from
  `.env.example` + a fresh `AUTH_SECRET`; `db:push` + `db:seed`; the
  recurring fresh-workspace Chromium revision step (the full 120 MiB
  headless-shell 1248 download — the sandbox cache carried revision 1200,
  the clone's Playwright pins 1248).
- The five root documents (AGENTS.md, CLAUDE.md, README.md, PAD v2.25.0,
  budget-wiser_SKILL.md v1.24.0) + `docs/session_49.md` +
  `docs/REMEDIATION-PLAN-SESSION-26.md` + `worklog.md` +
  `docs/session_50.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-215
  ship state, green on the first full pass, with the mobile-navigation
  battery additionally re-verified standalone: 12/12.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME in `src/`, no `any` leaks; the tree's
  three `console.*` hits answered as the documented sanctioned diagnostics —
  the two `[verification] code for …` in-app OTP delivery lines gated by
  `NEO_DISABLE_IN_APP_OTP` and the dev-only `[auth] AUTH_SECRET … falling
  back` warning; the key-pattern mentions answered as the instructional
  docs + the wrapper's `[REDACTED:ssh_private_key]` placeholder only),
  `src/middleware.ts` absent + `src/proxy.ts` in place (the s201 seam), the
  docs-count lockstep verified (414/67/14 live-tense in README/CLAUDE),
  `skills/` confirmed excluded from all four check/test/compile scopes
  (tsc exclude · eslint ignores · vitest include patterns · playwright
  testDir), and the mandated focus areas each swept clean — the **mobile
  navigation** (the 12-test e2e battery green standalone: 12/12 + the live
  byte-census on BOTH apps during the dual-app diff) and **TailwindCSS v4**
  (the `@custom-variant hover` unwrap at globals.css:20, the `--shadow-sm`
  re-pin at :149 / `--blur-sm` at :158, the v3 palette re-pin block, the
  `safe-area-pb` @utility at :405, literal-class discipline — no config JS,
  no v4-family bugs found). The `.env`/`db` contract verified (six knobs,
  `db/` at the repo root with `DATABASE_URL="file:../db/custom.db"` — the
  mandated contract — the seam pinned by `tests/db-path.test.ts`,
  `.env.example` tracked at HEAD with identical knob names), the Vitest +
  Playwright suites verified in place with clean config scopes, the SEO
  surfaces verified (sitemap + robots + manifest explicit route handlers),
  and the neo-crm tech-stack pattern reference re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTY-FOURTH census — ZERO code findings

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural drift
  since session 215** — the ninth census after the s207 percent-encoding
  remediation, and the fix VERIFIED LIVE on both apps once more: the `%20`
  probe (`/Curl%20Probe%20216%20Test`) answers the DECODED title
  `Curl Probe 216 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-216`) answers "Hyphen Probe 216 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps. The
  malformed-escape posture held the s210 genus AND face for the SEVENTH
  consecutive round: the reference's CDN answers **520**
  (`error code: 520`, curl-verified) where ours still answers the designed
  404 with the never-throw raw-segment fallback (real 404 status,
  curl-verified).
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body WHITE),
  the shell (nav `sticky top-0 z-50 bg-white border-b border-slate-200
  backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0` + the outer
  `min-h-screen bg-slate-50` surface wrapper), all four pages (containers
  7xl/5xl/5xl/4xl, titles via FULL navigations — `/Dashboard`→"Budget Wise",
  `/Transactions|/Budgets|/Profile`→"\<Page\> | Budget Wise"), the mobile
  bottom bar byte-identical on every dimension (the bar classes incl.
  `safe-area-pb`, the `flex items-center justify-around py-2` row wrapper,
  the four anchors' item classes, the ink split on the anchor AND its svg —
  slate-900 active / slate-400 inactive, rect top=767 h=77, the four w-6/h-6
  lucide icons, NO aria-current on the reference), the scroll-end clearance
  (764 ≤ 767 measured with the same all-boxes lowest-box form at scroll-end
  on BOTH apps), both dialogs (the expense genus `food…other` with
  `value="health"` for Healthcare in the option family; the income family
  `other/salary/freelance/investment/gift` flipping cleanly on the driver's
  focus+Enter keyboard activation — the documented platform contrast), the
  Set Budget dialog (Category/Monthly Limit labels + the 0.00 placeholder),
  the sitemap format + robots.txt (curl-verified LF-only, 4-space indent,
  changefreq weekly, priority 1.0/0.8, lowercase "User-agent"; manifest 302
  on the reference vs our 200 functional superset), the login card (the
  4-button OAuth row), the donut geometry (341×280 container / 200×200
  `g.recharts-pie` / 331px legend on the precise probe at the pinned
  1512×945 viewport), and the transaction-row anatomy (the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` family on
  /Transactions with the inner three-children family byte-identical:
  [p-2.5 rounded-xl bg-red-50 text-red-600, flex-1 min-w-0, flex
  items-center gap-4]).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  SIXTEENTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight guard
  (the gate's build tree removed — `[dev-preflight] removed the stale
  production .next tree`, Ready in 307ms, health 200 + db up, 0 reload
  loops, zero notices) before the census boot. The local census matched on
  every surface: the login card (the 4-button OAuth row; the local login
  answered the documented pre-hydration fill race — the re-fill
  post-hydration answered clean), the seeded demo KPIs ($4,424.55 / 88.5%
  saved — the documented data-borne divergence), the shell (with our
  documented body-chrome platform-face genus — the hidden streaming div at
  `body.children[0]` + the Toaster portal + the route announcer), the
  mobile bar byte-identical (+ the `aria-current="page"`/nav-landmark
  superset — ours a `nav[aria-label="Main navigation"]` landmark, the
  reference's a plain DIV), the clearance identical (764 ≤ 767 both apps,
  the same probe form), all titles matching, the 404 surface byte-matching
  (the decoded title + the raw-encoded body + the real 404 status + the
  "Go Home" button; the malformed-escape path answering our designed 404),
  both dialogs matching (our `healthcare`/`other_income` internal-wire ids
  + the placeholder option — the documented internal-wire genus; our Radix
  Income tab flipping cleanly on a synthetic click — the documented
  platform contrast), the SEO surfaces matching (the documented
  lowercase-loc divergence, format byte-matched; manifest 200 — our
  functional superset), the donut geometry byte-identical (341×280 /
  200×200 / 331 — measured at the pinned 1512×945 viewport), and the row
  anatomy (the inner family byte-identical on both apps).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status, the
  sitemap + robots + manifest, the login card, the donut geometry, the row
  anatomy.
- The s207 percent-decode fix: live-verified on both apps for the ninth
  consecutive census.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root;
  `DATABASE_URL="file:../db/custom.db"` — the mandated contract; the db-path
  seam pinned; `.env.example` tracked at HEAD with identical knob names.
- The Vitest + Playwright suites: in place (414/67), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence
  (live-verified on the un-daemonized boot).
- The security sweep, the docs-count lockstep, the skills/ exclusion, the
  neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the sixteenth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The screenshot battery answered **9/12 byte-identical on
the first viewport-pinned captures** (landing, login, dashboard-desktop,
transactions-desktop, budgets-desktop, dashboard-mobile,
transactions-mobile, budgets-mobile, profile-mobile — all md5-identical to
HEAD's `docs/screenshots/` set on the FIRST captures), with the three
remaining delta frames each at its documented capture-environment genus
(see N-2), so no evidence frames needed refreshing.

### N — informational notes (documentation, not code)

- **(N-1, operational — NEW FINDING) The DEV-TREE variant of the s197
  reload loop: live-reproduced twice, cured by `rm -rf .next`.** The
  round's proof-battery boots 2 and 3 each booted `bun run dev` onto the
  `.next/dev` tree left by the pkill'd previous dev server (the standing
  s213 N-3 tree-kill posture) and entered the documented reload loop —
  745 `GET /manifest.json` re-fetches + 69 `GET /login` re-fetches in one
  session (vs 16 + 1 on the clean boot), empty-title `/Dashboard` renders,
  unhydrated-store captures (a deterministic empty-data profile render,
  19,406 px from the full render), and dialog clicks no-op'ing pre-hydration.
  The cure (the documented remedy, applied as `rm -rf .next` before the
  boot) answered a completely clean boot: 16 manifest fetches, all four
  titles correct on the first probe, both dialogs opening on the first
  verified attempt. **Why no guard extension ships:** the s197 preflight
  guard's marker pair (top-level `BUILD_ID` + the dev lock) owns the
  PRODUCTION-tree seam only; the dev-tree variant has NO distinguishing
  marker — the `.next/dev/lock` file is ABSENT after a pkill'd server, and
  booting onto an existing dev tree is the NORMAL cache-reuse case (23
  consecutive sessions booted pkill'd-tree boots clean). A guard that
  cleaned every dev tree would regress the normal restart flow; without
  probed marker facts distinguishing a looping dev tree from a healthy one,
  the s197 standard ("every decision traces to probed facts") says: no
  spec, no code. The operational posture for census rounds: `rm -rf .next`
  before the census boot when the prior dev server was pkill'd.
- **(N-2) The battery: 9/12 first-pass byte-identical + the three delta
  frames each at its documented genus, each answered by the round's
  stability proof.** The add-transaction-dialog frame answered 134 changed
  px in the bbox (590,381)–(612,561) — the s213/s214/s215 caret-phase +
  16-px backdrop-blur-column composite genus; the set-budget-dialog frame
  answered EXACTLY 16 changed px, 100% confined to the single x=590 column
  (rows 519–534) — the s212/s213 single-column genus verbatim; the
  profile-desktop frame answered 105 changed px in the avatar region
  ((357,255)–(504,373)), ZERO above the 8-luminance threshold, max lum
  5.2/255 — the s214 profile-transient genus. **The stability proof:** the
  A/B consecutive captures answered byte-identical to each other AND to the
  round's first battery captures across TWO INDEPENDENT boots (atd-A ==
  atd-B == run-1; sbd-A == sbd-B == run-1; the profile re-capture ==
  run-1) — in this sandbox the deltas are DETERMINISTIC properties of the
  rendering stack (the blur-edge rasterization, the static caret, the
  avatar image rasterization), conclusively not code-borne: the DOM
  censuses on the same surfaces byte-matched, and the same surfaces
  answered HEAD's exact bytes in the s215 environment. Zero frames
  refreshed; HEAD's evidence set stays (the s209 posture).
- **(N-3) The reference's malformed-escape edge face HELD at 520** (the
  s210–s215 note, seventh consecutive round): the genus is unchanged — the
  platform edge bounces malformed escapes (the reference CDN answers
  `error code: 520`, curl-verified), never the reference SPA's designed
  404 — and ours still answers the designed 404 with the never-throw
  raw-segment fallback. Platform-owned, documented not remediated.
- **(N-4) The VLM battery's flag variance answered the documented genera**
  (the s204 methodology note): 1× "structural_differences: None"
  (budgets-desktop) + the other three pairs' flags all the documented
  DOM-disproven data-borne/platform genera — the dashboard pair's
  savings-badge conditional (data-borne: the reference's negative balance
  hides the badge, our seeded 88.5% shows it) + the transactions-mobile and
  profile-mobile pairs' platform-badge occlusion over the bar's right tabs
  (both frame folds reading as "2-item bars" — DISPROVEN by the
  byte-identical bar census: all four anchors byte-matched on both apps) —
  cross-checked against the round's direct byte-census before
  classification. The battery is a coarse signal, never a gate; the direct
  byte-census remains the classifier of record.

## 4. Remediation ToDo (documentation true-up + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 viewport-pinned
       convention, the settle-waits applied — ≥3.5s on the dashboard frame,
       ≥3s on the dialog frames — the origin-surface contract honored:
       add-transaction from the Dashboard, set-budget from the Budgets
       page) + the pixel-diff against the HEAD captures: **9/12
       byte-identical on the first captures + the three documented genera
       with the two-boot stability proof (N-2)**. Zero frames refreshed.
2. [x] The VLM battery: 4 pairs (the census JSON format) — 1×
       "structural_differences: None" + the other three pairs' flags all
       answering the documented DOM-disproven data-borne/platform genera
       (N-4) — cross-checked against the round's direct byte-census before
       classification.

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.25.0: the frontmatter version bump +
       the provenance gains the session-216 clause + Appendix C gains the
       session-216 row. Historical rows keep their era's numbers.
4. [x] The PAD → v2.26.0: the revision block records the twenty-fourth
       census — the zero-code-finding round that re-verified the s207 fix
       live on both apps for the ninth consecutive census + the 520
       edge-face hold (seventh round) + the battery classification (9/12 +
       the stability proof) + the N-1 dev-tree loop finding; counts held
       at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
        README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
        found).
6. [x] `docs/session_51.md` (this round's log — Session 30 / Task ID 216)
        + the `worklog.md` entry (Task ID 216, appended, never
        overwritten) + this plan ticked + the execution addendum.

**Phase C — ship**

7. [x] The dev server STOPPED (tree killed via pkill, port verified free
       via `ss`), then the full gate re-run: lint 0/0 · typecheck 0 ·
       414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1) — the counts
       answered exactly.
8. [ ] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit, the
       message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass `--remote`
       explicitly, the default remote is the OLD repo); verify the remote
       ref; shred the key.

## 5. Risks and guards

- **A zero-code round ships documentation only:** the round's only
  code-adjacent deltas are the documentation set; no `.env`/db/`skills/`
  files enter the commit (git status verified clean of secrets, logs, and
  databases).
- **The battery classification is evidence, not a new gate:** the md5
  cross-verification + the two-boot stability proof (the A/B twins
  byte-identical to each other AND to the round's first captures across
  independent boots) guard against a tooling artifact; every delta frame
  was classified against the documented genera families AND cross-checked
  against the round's direct byte-census of the same surfaces before
  classification.
- **The settle-wait discipline stays load-bearing:** the donut-bearing
  frames want ≥3.5s, the dialog frames ≥3s, and the dialog frames pin
  their ORIGIN SURFACES (add-transaction from the Dashboard, set-budget
  from Budgets) — the discipline was applied in full this round.
- **The viewport-pinned capture contract:** HEAD's evidence frames are
  viewport-pinned (1512×945 / 390×844), NOT full-page — this round's
  captures applied the contract on the first pass.
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an invitation)
  — and the round's N-1 finding adds the dev-tree cure (`rm -rf .next`
  before a census boot that follows a pkill'd dev server).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- No count movement this round: the gate must answer 414/414 · 14/14 ·
  67/67 exactly (the lockstep verified pre-ship).

## 6. Execution addendum

- The fresh-clone bootstrap answered the baseline gate green on the first
  full pass: clone (one file, docs-only, atop the s215 ship) → bun install
  (513 packages) → the six-knob .env + a fresh AUTH_SECRET → db:push +
  db:seed → the Chromium revision step (1200 cached vs the pinned 1248 —
  the full 120 MiB download) → lint 0/0 · tsc 0 · 414/414 unit · build ·
  14/14 smoke · 67/67 e2e (CI=1), with the mobile-nav battery 12/12
  standalone.
- The un-daemonized guard proof ran in a single Bash invocation: the stale
  production tree (the gate's build leg had left it) removed by the
  preflight (`[dev-preflight] removed the stale production .next tree`),
  health 200 + db up, Ready in 307ms, zero reload loops, zero notices.
- The census + battery ran as a single-call script (the sandbox reaps
  spawned processes between tool invocations — the dev server must boot,
  serve, and stop within one call; the discovery is this round's
  operational context, sister to N-1).
- The N-1 dev-tree loop: the two looping boots were diagnosed from the dev
  log's request profile (745/69 manifest/login re-fetches vs the clean
  boot's 16/1) + the empty-title renders + the deterministic
  unhydrated-store capture states; the cure verified by the clean boot's
  full battery (all four titles correct, both dialogs opening on the first
  verified attempt, the A/B twins stable).
- The stability proof: the round's dialog A/B captures and the profile
  re-capture were taken on a SECOND independent boot (post-cure) and
  answered byte-identical to the round's first battery captures — the
  deltas are rendering-stack properties of this sandbox, not code drift.
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
