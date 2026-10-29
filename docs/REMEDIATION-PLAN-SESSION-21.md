# Budget Wise — Session 21 Remediation Plan

**Date:** 2026-10-30 · **Task ID:** 210 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the eighteenth consecutive census with no new restyle wave; the third census after the s207 percent-encoding fix, re-verifying the fix holds on both apps; the round's battery answered 12/12 byte-identical — the first round in the sequence where ZERO frames answered delta, so no evidence frames needed refreshing; the only deltas are documentation)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the fifth reset in the sequence) —
  a fresh `git clone` booted the round at `0def27b` (the owner's
  `docs/session_38.md` transcript commit atop the s209 ship `b0f2d27`;
  the repo delta since the ship verified docs-only, one file). The
  fresh-clone bootstrap exercised end-to-end per the s204/s205/s208/s209
  pattern: `bun install` (513 packages) → the six-knob `.env` from
  `.env.example` (+ a fresh `AUTH_SECRET`) → `bun run db:push` +
  `bun run db:seed` (the documented demo month: 2 users, 4 transactions,
  0 budgets) → the e2e leg's Chromium (`bunx playwright install
  chromium` — the fresh sandbox's browser cache carried the prior
  persisted workspace's revision 1200 while the fresh clone's Playwright
  1.64.1 pins revision 1248, so the first e2e run fails the
  executable-revision check until the documented bootstrap step runs;
  the s208/s209 N-2 note, re-hit).
- The five root documents + `docs/session_37.md` +
  `docs/REMEDIATION-PLAN-SESSION-20.md` + `worklog.md` +
  `docs/session_38.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-209
  ship state, green on the first full pass of the fresh environment.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME in `src/`, no `any` leaks, no live
  keys — the tree's three `console.*` hits answered as the documented
  sanctioned diagnostics: the two `[verification] code for …` in-app OTP
  delivery lines gated by `NEO_DISABLE_IN_APP_OTP`, and the dev-only
  `[auth] AUTH_SECRET … falling back` warning; the key-pattern mentions in
  the tree answered as instructional text + the wrapper's
  `[REDACTED:ssh_private_key]` placeholder only), `src/middleware.ts`
  absent + `src/proxy.ts` in place (the s201 seam), the docs-count lockstep
  verified (414/67/14 live-tense in README/AGENTS/CLAUDE), `skills/`
  confirmed excluded from all four check/test/compile scopes (tsc exclude ·
  eslint ignores · vitest include patterns · playwright testDir), and the
  mandated focus areas each swept clean: the **mobile navigation** (the
  12-test e2e battery green standalone: 12/12 + the live byte-census on
  BOTH apps during the dual-app diff) and **TailwindCSS v4** (the
  `@custom-variant hover` unwrap at globals.css:20, the
  `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the 26-entry v3 palette
  re-pin block, the `safe-area-pb` @utility at :405, literal-class
  discipline — the single template-class hit in `src/` is the explanatory
  comment in `tabs.tsx` — and no config JS — no v4-family bugs found).
  The `.env`/`db` contract verified (six knobs, `db/` at the repo root,
  the seam pinned by `tests/db-path.test.ts`, `.env.example` tracked at
  HEAD with identical knob names), the Vitest + Playwright suites verified
  in place with clean config scopes, the SEO surfaces verified (sitemap +
  robots + manifest explicit route handlers), and the neo-crm tech-stack
  pattern reference re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the EIGHTEENTH census — ZERO code findings

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 209**: the body census answering exactly the documented form
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
- **The s207 fix VERIFIED LIVE on both apps — the THIRD consecutive
  census**: the `%20` probe (`/Curl%20Probe%20210%20Test`) answers the
  DECODED title `Curl Probe 210 Test | Budget Wise` on the reference and
  on ours identically, ours with the real 404 status (curl-verified); the
  `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-210`) answers "Hyphen Probe 210 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps. The census lesson
  from s207 (probe a %20 path at least once per census) applied in its
  third round.
- **The malformed-escape posture: genus held, edge face changed (N-1).**
  The reference's edge now answers **520** (`onrender.com | 520: Web
  server is returning an unknown error` — curl-verified twice) where every
  prior census documented the **bare 400** from the reference's CDN. The
  genus is unchanged — the reference's platform edge bounces malformed
  escapes with an error page, never the SPA's designed 404 — but the
  edge's status code drifted at the CDN layer (400 → 520), a
  platform-face change outside the reference app's own code. Ours still
  answers the designed 404 with the never-throw raw-segment fallback —
  the kept genus on our side.
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TENTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight guard
  (the gate's build tree removed — `[dev-preflight] removed the stale
  production .next tree`, Ready in 284ms, health 200 + db up, 0 reload
  loops, zero notices; the one error-pattern grep hit answered as the
  invocation's own SIGTERM line) before the daemonized census boot (the
  s204 process-reaper posture; the daemonizer re-created per the standing
  argv convention — the workspace reset had retired the s209 tooling,
  recorded as N-3). The local census matched on every surface: the shell
  (with our documented body-chrome platform-face genus — the hidden
  streaming div at `body.children[0]` + the Toaster portal + the route
  announcer), the mobile bar byte-identical (+ the
  `aria-current="page"`/nav-landmark superset), the clearance identical
  (764 ≤ 767 both apps, measured with the e2e contract's exact
  lowest-box-at-scroll-end form), all titles matching, the 404 surface
  byte-matching (the decoded title + the raw-encoded body + the real 404
  status + the "Go Home" button; the malformed-escape path answering our
  designed 404), both dialogs matching (our `healthcare`/`other_income`
  ids + the placeholder option — the documented internal-wire genus; our
  Radix Income tab flipping cleanly on a synthetic click — the documented
  platform contrast), the SEO surfaces matching (the documented
  lowercase-loc divergence, format byte-matched; manifest 200 — our
  functional superset vs the reference's 302), the donut geometry
  byte-identical (341.33×280 / 200×200 / 331 — after re-measuring at the
  desktop viewport; the first reading at 390×844 was the census's own
  viewport artifact, re-taken like-for-like), and the row anatomy (the
  `p-4` family on /Transactions).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy.
- The s207 percent-decode fix: live-verified on both apps for the third
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
  (live-verified on the un-daemonized boot, Ready in 284ms).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the tenth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The screenshot battery answered **12/12
byte-identical** — the first round in the sequence where ZERO frames
answered delta — so no evidence frames needed refreshing and no genera
required classification (the prior rounds' four delta-frame genera — the
avatar-jitter family + the backdrop-blur family — did NOT fire this
round; see N-4).

### N — informational notes (documentation, not code)

- **(N-1) The reference's malformed-escape edge face drifted 400 → 520:**
  the reference's CDN now bounces malformed escapes with an onrender.com
  520 error page (curl-verified twice) where every prior census documented
  the bare 400. The genus held — the platform edge answers an error,
  never the reference SPA's designed 404 — and ours still answers the
  designed 404 (the kept production-grade posture). The status-code face
  is platform-owned (the reference's hosting layer, not its app code);
  documented, not remediated. Future censuses should record whichever
  edge face the reference's CDN answers.
- **(N-2) The fresh-workspace Chromium bootstrap note (recurring):** the
  sandbox's Playwright browser cache carried the prior persisted
  workspace's chromium revision 1200; the fresh clone's Playwright 1.64.1
  pins revision 1248, so the first `test:e2e` of a fresh workspace fails
  the executable-revision check until `bunx playwright install chromium`
  runs — the s208 observation, re-hit on this reset (the third
  consecutive reset it has fired on). After the install: the full e2e
  suite green on the first pass.
- **(N-3) The tooling re-creation note (recurring):** the workspace reset
  retired the s209 capture-consumer tooling (the pixel-diff, the
  daemonizer); all re-created per the standing argv convention (every
  captures/log consumer takes its paths from argv) — the convention held
  through a workspace reset, the sixth consecutive round of the
  captures-consumer true-up class.
- **(N-4) The 12/12 byte-identical battery — the cleanest in the
  sequence:** every prior round's battery answered at least one delta
  frame (8/12 at s209, 9/12 at s208, 9/12 at s207); this round answered
  all twelve frames byte-identical to HEAD on the first captures — the
  md5 hashes verified across both directories. The zero-delta result is
  the expected face when (a) the intake delta is docs-only (zero app
  changes since the s209 ship) and (b) the capture stack answers at the
  same byte level as the prior round's environment. The genus families
  (avatar jitter, backdrop blur) are capture-environment-borne, never
  code-borne — their absence this round is an environment datum, not a
  code signal; the settle-wait discipline was still applied in full
  (≥3.5s on the dashboard frame, ≥3s on the dialog frames) and the
  origin-surface contract honored (add-transaction captured from the
  Dashboard, set-budget from the Budgets page).

## 4. Remediation ToDo (documentation true-up + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 convention, the
       settle-waits applied, the origin-surface contract honored) + the
       pixel-diff against the HEAD captures: **12/12 byte-identical**
       (md5-verified across both directories; the spot-check confirmed
       real content — 4977 unique colors on the dashboard frame at the
       exact 1512×945/390×844 viewports). Zero frames refreshed —
       HEAD's evidence set already answers at this round's capture
       bytes.
2. [x] The VLM battery: 4 pairs (the census-201 JSON format) — 1×
       "Structural Differences: None" (budgets-desktop) + the other
       three pairs' flags all answering the documented DOM-disproven
       data-borne genera: the dashboard pair's savings-badge conditional
       (the reference's negative balance hides it, our seeded 88.5%
       shows it) + the donut-legend/y-axis data states (the owner's
       data vs the seeded demo month — the geometry byte-identical per
       the direct census); the transactions-mobile pair's platform-badge
       occlusion over the bar's right tabs + the per-category badge/icon
       data genera (all four bar items present on both apps per the
       round's direct byte-census; the row family byte-identical on
       both); the profile-mobile pair's platform-badge occlusion —
       cross-checked against the round's direct byte-census before
       classification (the s204 flag-variance methodology note
       re-confirmed: the battery is a coarse signal, never a gate).

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.19.0: the frontmatter version bump +
       the provenance gains the session-210 clause + Appendix C gains
       the session-210 row + the Source sessions list gains the 210
       entry. Historical rows keep their era's numbers.
4. [x] The PAD → v2.20.0: the revision block records the eighteenth
       census — the zero-code-finding round that re-verified the s207
       fix live on both apps for the third consecutive census + the
       520 edge-face note + the 12/12 battery; counts held at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
       README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
       found).
6. [x] `docs/session_39.md` (this round's log — Session 24 /
        Task ID 210) + the `worklog.md` entry (Task ID 210, appended,
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

- **A zero-code round ships documentation only:** the round's only
  code-adjacent deltas are the documentation set; no `.env`/db/`skills/`
  files enter the commit (git status verified clean of secrets, logs,
  and databases).
- **The 12/12 battery is evidence, not a new gate:** the md5
  cross-verification + the content spot-check guard against a tooling
  artifact (a self-diff or a blank-frame diff would answer byte-identical
  too); the frames were verified as distinct files in two directories
  with real content at the exact viewports.
- **The settle-wait discipline stays load-bearing even in a zero-delta
  round:** the donut-bearing frames want ≥3s, the dialog frames ≥2.5s,
  and the dialog frames pin their ORIGIN SURFACES (add-transaction from
  the Dashboard, set-budget from Budgets) — the discipline was applied
  in full this round; its reward was the zero-delta battery.
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
  the documented Chromium step (N-2): install 4.32s → the six-knob .env
  (+ fresh AUTH_SECRET) → db push+seed (2 users, 4 transactions, 0
  budgets — the documented demo month) → lint 0/0 · tsc 0 · 414/414
  unit · build · 14/14 smoke · 67/67 e2e (CI=1).
- The un-daemonized guard proof ran in a single Bash invocation (the
  sandbox reaps process trees between calls): the stale production tree
  (the gate's e2e leg had just built it) removed by the preflight, Ready
  in 284ms, health 200 + db up, zero reload loops, zero notices; the
  daemonized census boot followed per the s204 posture.
- The donut geometry's first local reading (310×280/300 legend) answered
  at the wrong viewport — the census browser still sat at 390×844 from
  the mobile-axis reference census; the like-for-like re-measure at
  1512×945 answered 341.33×280 / 200×200 / 331 — byte-identical to the
  reference's probe. Recorded as a census-methodology datum: geometry
  probes must re-pin the viewport before reading.
- The battery's md5 cross-check: all twelve frames' hashes matched
  HEAD's docs/screenshots/ exactly (e.g. dashboard-desktop fd76777bb47c,
  profile-desktop ed954b463ad9, add-transaction-dialog 0ff9f963397f,
  set-budget-dialog 41fd22b17653); git log confirmed HEAD's set shipped
  at b0f2d27 (the s209 round) — this round's capture stack reproduces
  the s209 environment's bytes, the first round where the environment
  answered fully byte-stable against the prior ship.
- The VLM battery's four pairs: budgets-desktop "None"; the dashboard
  pair's savings-badge + donut-legend + y-axis flags (all data-borne);
  the transactions-mobile pair's bar-occlusion + badge/icon-data flags;
  the profile-mobile pair's bar-occlusion flag — all the documented
  DOM-disproven data-borne genera, cross-checked against the round's
  direct byte-census before classification.
- The dev log carried zero errors/warnings/deprecations (the single
  grep hit answered as the invocation's own SIGTERM line); the reference
  census left no console errors on either app.
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
