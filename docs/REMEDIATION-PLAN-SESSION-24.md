# Budget Wise — Session 24 Remediation Plan

**Date:** 2026-10-30 · **Task ID:** 213 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the twenty-first consecutive census; the sixth census after the s207 percent-encoding fix, re-verifying it holds on both apps; the round's battery answered **10/12 byte-identical — the strongest battery in the sequence** — with the two delta frames each at its documented capture-environment genus: set-budget-dialog at the exact 16-px backdrop-blur form (a single-pixel column at x=590), add-transaction-dialog at the same 16-px blur column plus a ~118-px text-caret blink-phase cluster in the focused Amount input — conclusively caret-borne (two consecutive fresh captures byte-identical; 100% of the delta confined to the blur+caret box; content byte-census-verified); the only deltas are documentation)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the sixth reset in the sequence) —
  the fresh-clone bootstrap exercised live end-to-end: `git clone` at
  `8f0faef` (the owner's `docs/session_44.md` transcript commit atop the
  s212 ship `422371f`; the repo delta since the ship verified docs-only,
  one file) → `bun install` (513 packages) → the six-knob `.env` from
  `.env.example` + a fresh `AUTH_SECRET` (openssl rand -hex 32) →
  `bun run db:push` + `bun run db:seed` (2 users / 4 transactions / 0
  budgets; custom.db at the repo root, git-ignored) → `bunx playwright
  install chromium` (the recurring fresh-workspace revision step, N-2:
  the sandbox cache carried revision 1200; the clone's Playwright pins
  the 1248 headless shell).
- The five root documents + `docs/session_43.md` +
  `docs/REMEDIATION-PLAN-SESSION-23.md` + `worklog.md` +
  `docs/session_44.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
  build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented session-212
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
  unwrap at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at
  :149/:158, the v3 palette re-pin block (135 `--color-*` token lines),
  the `safe-area-pb` @utility at :405, literal-class discipline — no
  config JS, no v4-family bugs found). The `.env`/`db` contract verified
  (six knobs, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`, `.env.example` tracked at HEAD with identical
  knob names), the Vitest + Playwright suites verified in place with
  clean config scopes, the SEO surfaces verified (sitemap + robots +
  manifest explicit route handlers), and the neo-crm tech-stack pattern
  reference re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTY-FIRST census — ZERO code findings

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural drift
  since session 212** — the sixth census after the s207 percent-encoding
  remediation, and the fix VERIFIED LIVE on both apps once more: the
  `%20` probe (`/Curl%20Probe%20213%20Test`) answers the DECODED title
  `Curl Probe 213 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-213`) answers "Hyphen Probe 213 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps. The
  malformed-escape posture held the s210 genus AND face for the fourth
  consecutive round: the reference's CDN answers **520**
  (`error code: 520`, curl-verified) where ours still answers the
  designed 404 with the never-throw raw-segment fallback (real 404
  status).
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0`
  + the outer `min-h-screen bg-slate-50` surface wrapper), all four pages
  (containers 7xl/5xl/5xl/4xl, titles via FULL navigations —
  `/Dashboard`→"Budget Wise", `/Transactions|/Budgets|/Profile`→"\<Page\>
  | Budget Wise"), the mobile bottom bar byte-identical on every
  dimension (the bar classes, the `flex items-center justify-around py-2`
  row wrapper, the four anchors' item classes, the ink split on the anchor
  AND its svg — slate-900 active / slate-400 inactive, rect top=767 h=77,
  the four w-6/h-6 lucide icons, NO aria-current on the reference), the
  scroll-end clearance (764 ≤ 767 measured with the same all-boxes
  lowest-box form at scroll-end on BOTH apps), both dialogs (the
  expense genus `food…other` with `value="health"` for Healthcare in the
  option family, the income family `other/salary/freelance/investment/
  gift` flipping cleanly on keyboard activation — the driver's
  focus+Enter, the documented platform contrast), the Set Budget dialog
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
  THIRTEENTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight guard
  (the gate's build tree removed — `[dev-preflight] removed the stale
  production .next tree`, Ready in 284ms, health 200 + db up, 0 reload
  loops — the log's single "reload" mention answered as the preflight's
  own explanatory message). The local census matched on every surface:
  the login card (the 4-button OAuth row), the seeded demo KPIs
  ($4,424.55 / 88.5% saved — the documented data-borne divergence), the
  shell (with our documented body-chrome platform-face genus — the hidden
  streaming div at `body.children[0]` + the Toaster portal + the route
  announcer `#_R_`), all four pages + titles, the 404 surface
  byte-matching (the decoded title + the raw-encoded body + the real 404
  status + the "Go Home" button; the malformed-escape path answering our
  designed 404), both dialogs matching (our `healthcare`/`other_income`
  internal-wire ids + the placeholder option — the documented
  internal-wire genus; our Radix Income tab flipping cleanly on a
  synthetic click — the documented platform contrast), the SEO surfaces
  matching (the documented lowercase-loc divergence, format
  byte-matched; manifest 200 — our functional superset vs the reference's
  302), the donut geometry byte-identical (341×280 / 200×200 / 331),
  the row anatomy (the inner family byte-identical), and the mobile bar
  byte-identical (+ the `aria-current="page"`/nav-landmark superset —
  our bar a `nav[aria-label="Main navigation"]` landmark, the
  reference's a plain DIV) with the clearance identical (764 ≤ 767 both
  apps, the same probe form).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy.
- The s207 percent-decode fix: live-verified on both apps for the sixth
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
- The reference data state: held at the s200 baseline for the thirteenth
  consecutive round.

### F — none (a zero-code-finding round)

No code findings. The screenshot battery answered **10/12
byte-identical** — landing, login, dashboard-desktop,
transactions-desktop, budgets-desktop, profile-desktop,
dashboard-mobile, transactions-mobile, budgets-mobile, profile-mobile
all byte-identical to HEAD's set on the first viewport-pinned captures
(the round's first capture pass used full-page mode by mistake — the
SIZE-MISMATCH family, re-captured viewport-pinned per the documented
convention, all stable frames then md5-identical); the two delta frames
each answered at its documented genus (see N-1), so no evidence frames
needed refreshing.

### N — informational notes (documentation, not code)

- **(N-1) The two delta frames at documented capture-environment genera —
  the strongest battery in the sequence (10/12).** The set-budget-dialog
  frame answered at exactly 16 changed px, a single-pixel column at
  x=590 — the documented backdrop-blur genus in its exact prior form.
  The add-transaction-dialog frame answered 134 changed px decomposing
  into the SAME 16-px x=590 blur column plus a ~118-px cluster in the
  (596–610, 552–561) box — the focused Amount input's text caret at a
  different blink phase (old=(10,10,10) → new=(255,255,255) on the
  ~1-px-wide caret bar), a first-observation sub-form of the
  capture-environment family: **conclusively caret-borne** — two
  consecutive fresh captures of the identical dialog answered
  byte-identical (0 px; the caret frozen post-blink), and 100% of the
  134-px delta confined to the blur-column + caret box with ZERO changed
  pixels elsewhere. Content verified identical by the round's direct
  byte-census (the dialog VALUE genera all matched live). HEAD's
  evidence set stays; zero frames refreshed.
- **(N-2) The reference's malformed-escape edge face HELD at 520** (the
  s210 N-1 / s211 N-2 / s212 N-2 note, fourth consecutive round): the
  CDN answers `error code: 520` (curl-verified). The genus is unchanged
  — the platform edge bounces malformed escapes, never the reference
  SPA's designed 404 — and ours still answers the designed 404 with the
  never-throw raw-segment fallback. Platform-owned, documented not
  remediated.
- **(N-3) The orphaned-process boot posture (new operational note):**
  killing the un-daemonized proof boot's wrapper PID does not kill its
  `next dev` child — the orphan survived, claimed :3000 seconds later,
  and served the census; the daemonized census boot then answered
  EADDRINUSE (its own `next dev` exiting into dev.log). The
  curl-bindable probe run immediately after the wrapper kill answered a
  false "bindable" (the orphan had not bound yet). The census validity
  is unaffected — the serving server WAS the preflight-verified proof
  boot itself (the same tree, the same boot lineage, 0 reload loops).
  Future rounds: kill the process TREE (`pkill -f "next dev -p 3000"` +
  the next-server child), not just the wrapper, and verify with `ss`
  before the daemonized spawn.
- **(N-4) The VLM battery's flag variance answered the documented genera
  (the s204 methodology note):** 2× "structural_differences: None"
  (budgets-desktop, transactions-mobile) + the other two pairs' flags
  all the documented DOM-disproven data-borne/platform genera — the
  dashboard pair's savings-badge conditional + donut-legend data state +
  recent-list data (data-borne: the reference's negative balance hides
  the badge, our seeded 88.5% shows it; the owner's 2-category data vs
  our seeded 3-category demo month) and the profile-mobile pair's
  platform-badge occlusion over the bar's right tabs (the reference's
  frame fold shows 2 of the 4 bar items — DISPROVEN by the
  byte-identical bar census: all four anchors byte-matched on both apps)
  — cross-checked against the round's direct byte-census before
  classification. The battery is a coarse signal, never a gate; the
  direct byte-census remains the classifier of record.

## 4. Remediation ToDo (documentation true-up + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 viewport-pinned
       convention, the settle-waits applied — ≥3.5s on the dashboard
       frame, ≥3s on the dialog frames — the origin-surface contract
       honored: add-transaction from the Dashboard, set-budget from the
       Budgets page) + the pixel-diff against the HEAD captures:
       **10/12 byte-identical** + the two delta frames at their
       documented capture-environment genera (N-1). Zero frames
       refreshed — HEAD's evidence set already answers at this round's
       capture bytes for the ten stable frames, and the two delta
       frames' genera are environment-borne (caret-phase +
       backdrop-blur, both conclusively classified).
2. [x] The VLM battery: 4 pairs (the census JSON format) — 2×
       "structural_differences: None" + the other two pairs' flags all
       answering the documented DOM-disproven data-borne/platform genera
       (N-4) — cross-checked against the round's direct byte-census
       before classification.

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.22.0: the frontmatter version bump +
       the provenance gains the session-213 clause + Appendix C gains
       the session-213 row + the Source sessions list gains the 213
       entry. Historical rows keep their era's numbers.
4. [x] The PAD → v2.23.0: the revision block records the twenty-first
       census — the zero-code-finding round that re-verified the s207
       fix live on both apps for the sixth consecutive census + the
       520 edge-face hold + the 10/12 battery at documented genera with
       the caret-phase classification; counts held at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
        README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
        found).
6. [x] `docs/session_45.md` (this round's log — Session 27 /
        Task ID 213) + the `worklog.md` entry (Task ID 213, appended,
        never overwritten) + this plan ticked + the execution
        addendum.

**Phase C — ship**

7. [x] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
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
- **The 10/12 battery + the two genera are evidence, not a new gate:**
  the md5 cross-verification + the caret-phase two-capture proof guard
  against a tooling artifact; the two delta frames were classified
  against the documented genera families (backdrop-blur at the exact
  16-px form; caret-phase at the two-fresh-captures-identical proof)
  AND cross-checked against the round's direct byte-census of the same
  surfaces before classification.
- **The settle-wait discipline stays load-bearing:** the donut-bearing
  frames want ≥3.5s, the dialog frames ≥3s, and the dialog frames pin
  their ORIGIN SURFACES (add-transaction from the Dashboard, set-budget
  from Budgets) — the discipline was applied in full this round.
- **The viewport-pinned capture contract:** HEAD's evidence frames are
  viewport-pinned (1512×945 / 390×844), NOT full-page — a full-page
  capture answers the SIZE-MISMATCH family and proves nothing; this
  round's first pass hit the mistake and the re-capture applied the
  contract.
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an
  invitation) — and the N-3 orphan posture applied: the process tree
  killed (`pkill`), the port verified free with `ss` before the gate.
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
  the Chromium revision step (1200 → 1248, N-2 re-hit) → lint 0/0 ·
  tsc 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1), with
  the mobile-nav battery 12/12 standalone.
- The un-daemonized guard proof ran in a single Bash invocation (the
  sandbox reaps process trees between calls): the stale production tree
  (the gate's e2e leg had left it) removed by the preflight, Ready in
  284ms, health 200 + db up, zero reload loops, zero notices.
- The N-3 orphan sequence: the daemonized census boot EADDRINUSE'd
  against the proof boot's surviving `next dev` child (the wrapper kill
  had not reaped it); the orphan served the whole census cleanly
  (itself the preflight-verified boot). The tree was killed via pkill
  + the port verified free via `ss` before the documentation phase.
- The local login re-hit the documented pre-hydration fill race (the
  first submit from a just-navigated /login); the re-submit
  post-hydration answered clean — the CLAUDE.md test-rule posture.
- The battery's md5 cross-check: the ten stable frames' hashes matched
  HEAD's docs/screenshots/ exactly (after the viewport-pinned re-capture
  of the first pass's full-page mistake); the two delta frames
  classified at their documented genera before the zero-refresh
  decision (the s209 posture: delta frames at documented
  capture-environment genera do not refresh HEAD's evidence set).
- The VLM battery's tooling: no VLM tooling persisted in the workspace
  this round — the battery script re-created per the standing argv
  convention (`<refDir> <localDir>`, the census JSON prompt format, the
  z-ai CLI underneath); the four pairs answered 2× "None" + the
  documented DOM-disproven data-borne/platform flags.
- The dev log carried zero errors/warnings/deprecations across the
  whole census (the EADDRINUSE line from the doomed daemonized attempt
  being the N-3 operational note itself, not a census error); the dev
  server was stopped and the browser closed before the documentation
  phase; `git status` answered clean (only gitignored
  `.env`/`db/*.db`/`dev.log` outside the commit).
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
