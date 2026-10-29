# Budget Wise — Session 23 Remediation Plan

**Date:** 2026-10-30 · **Task ID:** 212 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the twentieth consecutive census; the fifth census after the s207 percent-encoding fix, re-verifying it holds on both apps; the round's battery answered 9/12 byte-identical with the three delta frames each at its documented capture-environment genus — the same three-frame pattern and the same exact numbers as the s211 battery (16 px on both dialog twins, 49,265 changed px / 3.4% / zero above the 8-luminance threshold on the dashboard band), re-confirming that the genera families are capture-environment-borne, never code-borne; the only deltas are documentation)

## 1. Audit scope executed (this session)

- Intake: the workspace PERSISTED this round (no reset — the seventh
  reset-free intake in the sequence): `git pull` fast-forwarded
  `92300e1..112fb69` (the owner's `docs/session_42.md` transcript
  commit atop the s211 ship `92300e1`; the repo delta since the ship
  verified docs-only, one file). The standing environment re-verified
  against the contract: the `node_modules/` tree standing, the six-knob
  `.env` (DATABASE_URL="file:../db/custom.db" + the standing
  AUTH_SECRET), the seeded `db/` at the repo root (custom.db + e2e.db +
  smoke.db + .gitkeep, git-ignored), `.env.example` tracked at HEAD with
  identical knob names, and the e2e leg's Chromium already at the pinned
  revision (the N-2 bootstrap step NOT re-hit on a standing workspace).
- The five root documents + `docs/session_41.md` +
  `docs/REMEDIATION-PLAN-SESSION-22.md` + `worklog.md` +
  `docs/session_42.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-211
  ship state, green on the first full pass of the standing environment
  (the mobile-navigation battery additionally re-verified standalone:
  12/12).
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME in `src/`, no `any` leaks; the
  tree's three `console.*` hits answered as the documented sanctioned
  diagnostics — the two `[verification] code for …` in-app OTP delivery
  lines gated by `NEO_DISABLE_IN_APP_OTP` and the dev-only
  `[auth] AUTH_SECRET … falling back` warning; the key-pattern mentions
  in the tree answered as the wrapper's
  `[REDACTED:ssh_private_key]` placeholder only), `src/middleware.ts`
  absent + `src/proxy.ts` in place (the s201 seam, `x-pathname` stamped),
  the docs-count lockstep verified (414/67/14 live-tense in README/CLAUDE;
  AGENTS count-free by design), `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest include
  patterns · playwright testDir), and the mandated focus areas each swept
  clean — the **mobile navigation** (the 12-test e2e battery green
  standalone: 12/12 + the live byte-census on BOTH apps during the
  dual-app diff) and **TailwindCSS v4** (the `@custom-variant hover`
  unwrap at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at
  :149/:158, the v3 palette re-pin block (135 `--color-*` token lines),
  the `safe-area-pb` @utility at :405, literal-class discipline — the
  single template-class hit in `src/` is the explanatory comment in
  `tabs.tsx` — no config JS, no v4-family bugs found). The `.env`/`db`
  contract verified (six knobs, `db/` at the repo root, the seam pinned
  by `tests/db-path.test.ts`), the Vitest + Playwright suites verified in
  place with clean config scopes, the SEO surfaces verified (sitemap +
  robots + manifest explicit route handlers), and the neo-crm tech-stack
  pattern reference re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTIETH census — ZERO code findings

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 211** — the fifth census after the s207 percent-encoding
  remediation, and the fix VERIFIED LIVE on both apps once more: the
  `%20` probe (`/Curl%20Probe%212%20Test`) answers the DECODED title
  `Curl Probe 212 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-212`) answers "Hyphen Probe 212 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps. The
  malformed-escape posture held the s210 genus AND face for the third
  consecutive round: the reference's CDN answers **520**
  (`error code: 520`, curl-verified) where ours still answers the
  designed 404 with the never-throw raw-segment fallback
  (`%E0%A4%A | Budget Wise`, real 404 status).
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`), the shell
  (nav classes + `main.pb-20 md:pb-0` + the outer `min-h-screen
  bg-slate-50` surface wrapper), all four pages (containers
  7xl/5xl/5xl/4xl, titles via FULL navigations — `/Dashboard`→"Budget
  Wise", `/Transactions|/Budgets|/Profile`→"\<Page\> | Budget Wise"), the
  mobile bottom bar byte-identical on every dimension (the bar classes,
  the `flex items-center justify-around py-2` row wrapper, the four
  anchors' item classes, the ink split on the anchor AND its svg AND its
  label — slate-900 active / slate-400 inactive, rect top=767 h=77, the
  four w-6/h-6 lucide icons, NO aria-current on the reference), the
  scroll-end clearance (764 ≤ 767 measured with the same all-boxes
  lowest-box form at scroll-end on BOTH apps), both dialogs (the
  expense genus `food…other` with `value="health"` for Healthcare in
  the option family, the income family
  `other/salary/freelance/investment/gift` flipping cleanly on keyboard
  activation), the Set Budget dialog (Category/Monthly Limit labels +
  the 0.00 placeholder), the sitemap format + robots.txt
  (curl-verified LF-only, 4-space indent, changefreq weekly, priority
  1.0/0.8; lowercase "User-agent"; manifest 302 on the reference vs our
  200 functional superset), the login card (the 4-button OAuth row), the
  donut geometry (341×280 container / 200×200 `g.recharts-pie` / 331px
  legend on the precise probe — the legend-item 14×14 mini-svg DOM-order
  artifact answered again exactly as documented at
  REMEDIATION-PLAN-SESSION-14: our side's first-match catches the
  legend-item icons, the reference's first-match is the donut, the
  hasPie-filtered probe answers the identical trio on both), and the
  transaction-row anatomy (`flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors` on /Transactions, the inner three-children family
  byte-identical on both apps; the `p-3 rounded-xl` family on the
  Dashboard's recent list).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWELFTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight guard
  (the gate's build tree removed — `[dev-preflight] removed the stale
  production .next tree`, Ready in 289ms, health 200 + db up, 0 reload
  loops, zero notices) before the daemonized census boot (the s211 N-3
  TIME_WAIT posture applied: the port verified bindable — waited out —
  before the detached spawn; the boot answered Ready clean, health 200).
  The local census matched on every surface: the shell (with our
  documented body-chrome platform-face genus — the hidden streaming div
  at `body.children[0]` + the Toaster portal + the route announcer),
  the mobile bar byte-identical (+ the `aria-current="page"`/nav-landmark
  superset — our bar is a `nav[aria-label="Main navigation"]` landmark,
  the reference's a plain DIV, the documented a11y superset), the
  clearance identical (764 ≤ 767 both apps, same probe form), all titles
  matching, the 404 surface byte-matching (the decoded title + the
  raw-encoded body + the real 404 status + the "Go Home" button; the
  malformed-escape path answering our designed 404), both dialogs
  matching (our `healthcare`/`other_income` internal-wire ids + the
  placeholder option — the documented internal-wire genus; our Radix
  Income tab flipping cleanly on a synthetic click — the documented
  platform contrast, where the reference's tab needs real keyboard
  activation), the SEO surfaces matching (the documented lowercase-loc
  divergence, format byte-matched; manifest 200 — our functional superset
  vs the reference's 302), the donut geometry byte-identical (341×280 /
  200×200 / 331 — measured at the pinned 1512×945 desktop viewport), the
  row anatomy (the `p-4` family on /Transactions, inner children
  byte-identical), and the profile card (the avatar family + the
  role-badge family byte-identical — the VLM flag disproven). The dev log
  carried zero errors/warnings/deprecations across the whole census (the
  SIGTERM notice from the round's own shutdown aside).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy, the profile card avatar family.
- The s207 percent-decode fix: live-verified on both apps for the fifth
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
  (live-verified on the un-daemonized boot, Ready in 289ms).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the twelfth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The screenshot battery answered **9/12
byte-identical** — landing, login, transactions-desktop, budgets-desktop,
profile-desktop, dashboard-mobile, transactions-mobile, budgets-mobile,
profile-mobile all byte-identical to HEAD's set on the first captures;
the three delta frames each answered at its documented genus (see N-1),
so no evidence frames needed refreshing.

### N — informational notes (documentation, not code)

- **(N-1) The three delta frames all at documented capture-environment
  genera — the same exact numbers as the s211 battery.** The two dialog
  frames (add-transaction, set-budget) answered at exactly 16 changed px
  each, a single-pixel column at x≈590, 16 px above the 64-luminance
  threshold — the documented backdrop-blur genus in its exact prior
  form. The dashboard-desktop frame answered 49,265 changed px (3.4%) in
  the band (172,818)–(927,886) with ZERO px above the 8-luminance
  threshold — the sub-visible class of the documented avatar-jitter
  genus family (capture-environment compositing variance over the Spend
  Summary band; content verified identical by the round's direct
  byte-census + the live donut-geometry probe). The identical counts on
  the same frames across two consecutive capture environments is the
  strongest datum yet that the genera families are
  capture-environment-borne, never code-borne; their firing or absence
  is an environment datum, not a code signal. HEAD's evidence set stays;
  zero frames refreshed.
- **(N-2) The reference's malformed-escape edge face HELD at 520** (the
  s210 N-1 / s211 N-2 note, third consecutive round): the CDN answers
  `error code: 520` (curl-verified). The genus is unchanged — the
  platform edge bounces malformed escapes, never the reference SPA's
  designed 404 — and ours still answers the designed 404 with the
  never-throw raw-segment fallback. Platform-owned, documented not
  remediated.
- **(N-3) The cookie-jar scope of `agent-browser cookies clear`** (new
  operational note): the round's reference-frame capture ran
  `cookies clear` to reset the local app's auth state — which cleared
  the shared cookie jar for BOTH origins (localhost and the reference),
  silently killing the reference session mid-battery. The subsequent
  cross-check probes on both apps re-logged-in cleanly. Future rounds:
  treat `cookies clear` as jar-wide; re-login before the next
  origin-bound probe rather than assuming per-origin state.
- **(N-4) The VLM battery's flag variance re-confirmed at the same
  documented genera** (the s204 methodology note): 1× "None"
  (budgets-desktop) + seven flags across the other three pairs, every
  one cross-checked against the round's direct byte-census before
  classification — the dashboard pair's savings-badge conditional +
  donut-legend data state (data-borne: the reference's negative balance
  hides the badge; the owner's 2-category data vs our seeded 3-category
  demo month, geometry byte-identical) + the recent-list fold-crop
  (data-borne: the frame's fold shows a different number of rows of
  different data); the transactions-mobile pair's platform-badge
  occlusion over the bar's right tabs + the badge-position and
  icon-difference misreads (both DISPROVEN by the byte-identical row
  census: the row family, the inner three-children family, and the
  badge+title family all byte-identical on both apps — the flags are
  data-variant misreads); the profile-mobile pair's avatar-icon misread
  (DISPROVEN by the byte-identical avatar-family census) + the
  bar-occlusion genus. The battery is a coarse signal, never a gate;
  the direct byte-census remains the classifier of record.

## 4. Remediation ToDo (documentation true-up + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 convention, the
       settle-waits applied — ≥3.5s on the dashboard frame, ≥3s on the
       dialog frames — the origin-surface contract honored:
       add-transaction from the Dashboard, set-budget from the Budgets
       page) + the pixel-diff against the HEAD captures: **9/12
       byte-identical** + the three delta frames at their documented
       capture-environment genera (N-1, the same exact numbers as the
       s211 battery). Zero frames refreshed — HEAD's evidence set
       already answers at this round's capture bytes for the nine
       stable frames, and the three delta frames' genera are
       environment-borne.
2. [x] The VLM battery: 4 pairs (the census JSON format) — 1×
       "structural_differences: None" (budgets-desktop) + the other
       three pairs' flags all answering the documented DOM-disproven
       data-borne/platform genera (N-4) — cross-checked against the
       round's direct byte-census before classification.

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.21.0: the frontmatter version bump +
       the provenance gains the session-212 clause + Appendix C gains
       the session-212 row + the Source sessions list gains the 212
       entry. Historical rows keep their era's numbers.
4. [x] The PAD → v2.22.0: the revision block records the twentieth
       census — the zero-code-finding round that re-verified the s207
       fix live on both apps for the fifth consecutive census + the
       520 edge-face hold + the 9/12 battery at documented genera with
       the s211-identical delta numbers; counts held at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
        README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
        found).
6. [x] `docs/session_43.md` (this round's log — Session 26 /
        Task ID 212) + the `worklog.md` entry (Task ID 212, appended,
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
- **The 9/12 battery + the three genera are evidence, not a new gate:**
  the md5 cross-verification + the content spot-check guard against a
  tooling artifact; the three delta frames were classified against the
  documented genera families (backdrop-blur at the exact 16-px form;
  sub-visible composite variance at zero above-8-lumen px) AND
  cross-checked against the round's direct byte-census of the same
  surfaces before classification.
- **The settle-wait discipline stays load-bearing:** the donut-bearing
  frames want ≥3.5s, the dialog frames ≥3s, and the dialog frames pin
  their ORIGIN SURFACES (add-transaction from the Dashboard, set-budget
  from Budgets) — the discipline was applied in full this round.
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an
  invitation) — and the s211 N-3 TIME_WAIT posture applied: the port
  verified bindable before the daemonized boot.
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- No count movement this round: the gate must answer 414/414 · 14/14 ·
  67/67 exactly (the lockstep verified pre-ship).

## 6. Execution addendum

- The standing environment answered the baseline gate green on the first
  full pass (no reset, no Chromium bootstrap): lint 0/0 · tsc 0 ·
  414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1), with the
  mobile-nav battery 12/12 standalone.
- The un-daemonized guard proof ran in a single Bash invocation (the
  sandbox reaps process trees between calls): the stale production tree
  (the gate's e2e leg had just built it) removed by the preflight, Ready
  in 289ms, health 200 + db up, zero reload loops, zero notices.
- The daemonized census boot applied the s211 N-3 posture: the port
  waited out and verified bindable (curl 000) before the detached
  spawn — the boot answered clean on the first attempt (no EADDRINUSE).
- The N-3 cookie-jar sequence: `cookies clear` before the reference-frame
  capture reset both origins' sessions; the mid-battery cross-check
  probes re-logged-in cleanly on both apps (the local probe answered the
  guest-redirect form at /login?from_url=… before the re-login). The
  row-structure and avatar-family cross-checks then answered
  byte-identical.
- The VLM battery's tooling: no VLM tooling persisted in the workspace
  this round — the battery script re-created per the standing argv
  convention (`<refDir> <localDir>`, the census JSON prompt format, the
  z-ai CLI underneath); the four pairs answered 1× "None" + the seven
  documented DOM-disproven data-borne/platform flags.
- The battery's md5 cross-check: the nine stable frames' hashes matched
  HEAD's docs/screenshots/ exactly; the three delta frames classified at
  their documented genera before the zero-refresh decision (the s209
  posture: delta frames at documented capture-environment genera do not
  refresh HEAD's evidence set).
- The dev log carried zero errors/warnings/deprecations across the whole
  census (the round's own SIGTERM shutdown notice aside); the dev server
  was stopped and the browser closed before the documentation phase;
  `git status` answered clean (only gitignored `.env`/`db/*.db`/`dev.log`
  outside the commit).
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
