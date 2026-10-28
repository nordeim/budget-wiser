# Budget Wise — Session 15 Remediation Plan

**Date:** 2026-10-28 · **Task ID:** 204 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the twelfth consecutive census with no new restyle wave; the round's notes are evidence/verification records, remediated as documentation, not code)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET — a fresh `git clone
  https://github.com/nordeim/budget-wiser.git` landing at `5302826` (the
  owner's `docs/session_26.md` transcript commit atop `d670f03`, the
  session-203 ship — the eleventh-census zero-code-finding round). The
  repo delta since the s203 ship verified docs-only (one file: the
  owner's transcript). The full fresh-clone bootstrap was exercised live
  this round: `bun install` (513 packages) · `cp .env.example .env` +
  a fresh 64-char `AUTH_SECRET` · `bun run db:push && bun run db:seed`
  (2 users / 4 transactions / 0 budgets — the documented demo month) ·
  `bunx playwright install chromium` (the README's documented e2e
  requirement; the fresh sandbox lacked the browser).
- The five root documents + `docs/session_25.md` +
  `docs/REMEDIATION-PLAN-SESSION-14.md` + `worklog.md` +
  `docs/session_26.md` were re-read and validated against the tree
  before touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-203
  ship state.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`, no `any`
  leaks, no eval/new Function), the docs-count lockstep verified at every
  claim site (the two old-era numbers in the tree are the PAD's dated
  historical revision rows — correct per the lockstep discipline),
  `skills/` confirmed excluded from all four check/test/compile scopes
  (tsc exclude · eslint ignores · vitest include patterns · playwright
  testDir), and the mandated focus areas each swept clean: the **mobile
  navigation** (the 12-test e2e battery re-run green standalone + the live
  byte-census on BOTH apps during the dual-app diff) and **TailwindCSS v4**
  (the `@custom-variant hover` unwrap, the `--shadow-sm`/`--blur-sm`
  re-pins, the v3 palette re-pin block, the `safe-area-pb` @utility,
  literal-class discipline, no config JS — no v4-family bugs found). The
  `.env`/`db` contract verified live (the six knobs, `db/` at the repo
  root, the seam pinned by `tests/db-path.test.ts`, `.env.example` tracked
  at HEAD with identical knob names), the Vitest + Playwright suites
  verified in place with clean config scopes, the SEO surfaces verified
  (sitemap + robots + manifest explicit route handlers, the format matching
  the reference), and the neo-crm tech-stack pattern reference re-confirmed
  from the carried `neo-crm_SKILL.md` (v1.186.0: Next.js 16.4.2 · React 19
  · Tailwind v4 CSS-first · Vitest · Playwright · Bun).

## 2. The live re-audit: the TWELFTH consecutive zero-drift census

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 203**: the body census answering `[#root → DIV.min-h-screen,
  #base44-edit-badge, recharts span]` exactly as documented, the shell
  (nav classes `sticky top-0 z-50 bg-white border-b border-slate-200
  backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0` byte-identical),
  all four app pages byte-verified (containers 7xl/5xl/5xl/4xl, titles
  via FULL navigations: /Dashboard→"Budget Wise",
  /Transactions|/Budgets|/Profile→"<Page> | Budget Wise"), the 404
  surface (the interpolated humanized title `Curl Probe 204 Test |
  Budget Wise` on this round's fresh probe path + the quoted slash-less
  body + the "Go Home" button — answering identically to our s196/s201
  implementation, ours with the real 404 status), the mobile bottom bar
  byte-identical on every dimension (the bar DIV classes, the `flex
  items-center justify-around py-2` row wrapper, item classes, the ink
  split on the anchor AND its svg, rect y=767 h=77, the four lucide
  icons, NO aria-current — the reference ships without), the scroll-end
  clearance (764 ≤ 767 measured per the e2e contract's lowest-box form
  on BOTH apps), both dialogs (the Add Transaction Expense/Income tabs +
  the Amount/Category/Date/Description labels + the native category
  select + this round's VALUE-attribute probe answering the documented
  s203 genera verbatim: the reference's `value="health"` for Healthcare
  and income-`value="other"` reuse vs our `healthcare`/`other_income`;
  the reference's Income tab keyboard-activated cleanly with the
  documented family swap — the F-2 methodology note re-verified), the
  Set Budget dialog (Category/Monthly Limit labels + the 0.00
  placeholder), the sitemap format + robots.txt, the login card (the
  4-button OAuth row: Google, Microsoft, Facebook, Apple), the donut
  geometry (341×280 responsive container / 200×200 g.recharts-pie /
  331px legend on the precise probe), and the transaction-row anatomy
  (`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors`
  rows on /Transactions).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  FOURTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  dev-boot sequence fired the preflight guard cleanly on the `bun run
  dev` boot (the stale production tree from the gate's build leg
  removed — the s197 guard live-verified again), Ready in 327ms, health
  200 + db up, zero reload loops, zero deprecation notices, the
  `proxy.ts` leg visible in the request traces (the s201 rename verified
  live again). The local census matched on every surface: the shell
  (with our documented body-chrome platform-face genus), the mobile bar
  byte-identical (+ the `aria-current="page"` and nav-landmark
  superset), the clearance identical (764 ≤ 767), all titles matching,
  the 404's interpolated title WITH the real 404 status, both dialogs
  matching (our `healthcare`/`other_income` ids + the placeholder
  option — the documented internal-wire genus; our Income tab swaps on
  click per the Radix contract), the SEO surfaces matching (the
  documented lowercase-loc divergence, format byte-matched; manifest
  200), and the donut geometry byte-identical (341×280 / 200×200 / 331
  on the precise probe; the naive closest-div probe caught the
  documented legend mini-svg DOM-order artifact).
- The VLM battery (4 pairs, the census-201 JSON format): 0× "Structural
  Differences: None" this battery — every one of the four pairs' flags
  answering the documented DOM-disproven genera, cross-checked against
  the round's direct byte-census: the savings-badge conditional
  (data-borne: the reference's negative balance + $0 income hides the
  badge; our seeded 88.5% shows it — the KPI card classes
  byte-identical on both), the platform-badge occlusion over the bar's
  right tabs (the byte-census shows all four items on BOTH apps), the
  platform badge itself (the reference's edit overlay), and the
  avatar-content genus on the profile pair (the reference's owner
  avatar vs our seeded default — the same family as the avatar-jitter
  genus). The VLM battery's flag counts vary run-to-run (3× None at
  s203, 0× this round); the direct byte-census remains the ground
  truth, and every flag this round is a documented genus — the
  discipline held.
- The screenshot battery: 12 images captured from the live dev server
  at the documented 1512×945 + 390×844 convention — **11/12
  byte-identical to the s203 set**, the strongest render-stability
  signal in the ladder's history (s198 10/12 → s199 10/12 → s200 11/12
  → s201 8/12+2 genus → s202 9/12 → s203 8/12 → s204 11/12, tying the
  s200 peak): the dashboard-desktop frame byte-identical (the s201
  settle-wait lesson applied at capture time), **both dialog frames
  byte-identical — the backdrop-blur compositing genus did NOT fire in
  this fresh sandbox** (the genus is deterministic per sandbox, as the
  s201/s202 documentation records; first zero-genus dialog capture
  since s200), and the single delta frame the profile-mobile frame at
  the documented avatar-jitter genus in its EXACT s202/s203 form
  (104 px, bbox (84,255)–(235,377), 0.0316% — the deterministic genus
  confirmed a third time).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (the twelfth census): the shell, all four pages,
  the mobile bar, the clearance, both dialogs, all titles (404 +
  aliases + page defaults), the sitemap + robots + manifest, the login
  card, the donut geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  db-path seam pinned; `.env.example` tracked at HEAD with identical
  knob names.
- The Vitest + Playwright suites: in place (410/66), config scopes
  clean.
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence.
- The security sweep, the docs-count lockstep (the stale-number hunt —
  the tree's only old-era numbers are the PAD's dated historical
  revision rows), the skills/ exclusion, the neo-crm stack-pattern
  lineage.
- The fresh-clone bootstrap: exercised end-to-end this round (the
  workspace had been reset) and answered per the docs — `bun install`
  → `.env` from `.env.example` + a fresh AUTH_SECRET → `db:push` +
  `db:seed` → the full gate green. The e2e leg's Chromium requirement
  is documented in the README's quickstart banner.

### N-1 — the VLM battery's run-to-run flag variance (informational, methodology)

This battery answered 0× "Structural Differences: None" where s203
answered 3× — with ZERO change in the underlying DOM (the byte-census
is identical round-over-round). Every flag this round is one of the
documented DOM-disproven genera (the savings-badge conditional, the
platform-badge occlusion, the platform badge, the avatar-content
genus). Classification: the VLM battery is a coarse parity SIGNAL,
not a parity gate — its flags are cross-checked against the direct
byte-census before classification (the discipline every round since
s195 has applied). The flag-count variance across rounds with an
unchanged DOM is itself evidence for that posture. No action; recorded
in the SKILL's §1 census-notes so a future round reading "0× None"
does not mis-read it as regression.

### N-2 — the zero-genus dialog capture (informational, evidence)

Both dialog frames answered byte-identical this round — the
backdrop-blur compositing genus (documented s201–s203) did not fire in
this fresh sandbox's capture environment. This confirms the documented
classification (capture-environment genus, deterministic per sandbox —
never structural drift): the genus moved with the sandbox, not with
the code. The exact-rect crop-diff ladder is not needed this round
(zero delta to crop-diff). No action.

### N-3 — the sandbox process-reaper footnote (session-environment, informational)

This round's sandbox reaps backgrounded process trees between agent
tool invocations (a plain `nohup`/`setsid` dev server died at each
call boundary; only properly daemonized processes survive). The
dual-app diff's dev server was therefore booted via a double-fork
daemonizer OUTSIDE the repo tree. The `dev` script's own preflight
guard fired correctly on the un-daemonized `bun run dev` boot (the
s197 guard live-verified). No codebase action — a session-environment
note for future rounds in this sandbox class.

### F — none else (a zero-drift, zero-code-finding round)

No code findings. No new genera (the round's observations are the
documented capture-environment + data-borne genera: the avatar-jitter
frame in its exact s202/s203 form; the reference's owner data vs our
seeded demo month). The dev log carried only the documented
s202-class sandbox's allowedDevOrigins notices (classified
sandbox-infrastructure noise, not a codebase issue).

## 4. Remediation ToDo (documentation true-up + ship — the s202/s203 pattern)

**Phase A — the documentation set**

1. [x] `budget-wiser_SKILL.md` → v1.13.0: the frontmatter version bump +
       the provenance gains the session-204 line (the twelfth census,
       the 11/12 battery tying the ladder peak, the zero-genus dialog
       capture, the data state holding, the three informational notes) +
       §1 gains the N-1 VLM-flag-variance census note (beside the s199
       pushstate + s203 keyboard-activation methodology notes) +
       Appendix C gains the session-204 row. Historical rows keep their
       era's numbers.
2. [x] The PAD → v2.14.0: the revision block records the twelfth census +
       the zero-code-finding round + the three informational notes + the
       render-stability ladder reading (11/12, tying s200).
3. [x] `docs/session_27.md` (this round's log — Session 18 / Task ID 204)
       + the `worklog.md` entry (Task ID 204, appended, never
       overwritten).
4. [x] This plan ticked + the execution addendum.
5. [ ] README + AGENTS + CLAUDE: **no changes needed** — the counts held
       (410/66/14), no new user-facing contracts, no new architecture
       facts (a zero-drift round; the notes are census-methodology
       records living in the SKILL). Verified by the lockstep sweep.

**Phase B — ship**

6. [x] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
       typecheck 0 · 410/410 unit HELD · build · 14/14 smoke · 66/66 e2e
       (CI=1) — all three counts must hold (a docs-only round moves zero
       counts).
7. [ ] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit,
       the message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — the wrapper's
       default remote is the OLD task-management repo, so pass `--remote`
       explicitly); verify the remote ref; shred the key.

## 5. Risks and guards

- **No code changes this round** — the gate's three counts must answer
  exactly 410/66/14 (the docs-only invariant).
- The dev server is stopped before the gate's build leg (the documented
  rule; the preflight guard is the backstop, not an invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- The docs lockstep moves in the same commit as the session records (the
  s192/s197 discipline); the SKILL's historical rows + the PAD's dated
  revision blocks keep their era's numbers.
- The screenshot battery's single genus frame (profile-mobile) is the
  round's only binary delta — the atomic change set is docs + that one
  frame.

## 6. Execution addendum

- The fresh-clone bootstrap (the workspace reset) exercised the full
  README quickstart path live: install → env → db → gate, all green on
  the first pass. The e2e leg's `bunx playwright install chromium` is
  the README's documented requirement, not a gap.
- The dual-app census scripts (bar/clearance/donut/dialogs) probe BOTH
  forms where the apps differ by documented superset or genus: the
  bar probe matches `div, nav` (the reference ships a DIV; ours the
  documented NAV landmark), the donut probe targets
  `.recharts-responsive-container` + `g.recharts-pie` (the naive
  closest-div probe catches the legend mini-svg — the s203 artifact),
  and the dialog probes read VALUE attributes (the s203 upgrade) with
  keyboard activation for the reference's tabs (the s203 F-2 note).
- The VLM pairs were re-verified against the direct byte-census before
  classification; every flag answered a documented genus (the
  platform-badge occlusion disproven by the bar's four-item
  byte-census on both apps this round).
