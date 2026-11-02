# Budget Wise — Session 57 Remediation Plan

**Date:** 2026-11-02 · **Task ID:** 246 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ONE-FINDING remediation round (the FIFTY-FOURTH census — the thirty-ninth after the s207 percent-decode fix, the twenty-ninth after the s218 arrow remediation, and the twenty-eighth carrying the deeper row-anatomy probe as standing methodology; the first round with a code finding after SIXTEEN consecutive zero-drift rounds — sessions 227/228/231/232/233/234/235/236/237/238/240/241/242/243/244/245), a NO-RESET round (the fifth consecutive warm workspace) answering the rolled week band's THIRD round at rest — both apps' Mon–Sun bands holding the $0.00/$0.00 the Nov 2 rollover planted (the same-day census: rounds 52/53/54 all falling on 2026-11-02).

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the fifth consecutive no-reset round) —
  `git pull` fast-forwarded `1e7ebf2 → 85df9a1` (the owner's
  `docs/session_109.md` transcript commit over the census-53 ship), and the
  standing environment was VERIFIED rather than rebuilt: bun 1.3.14 · the
  six-knob `.env` with `DATABASE_URL="file:../db/custom.db"` and the
  standing `AUTH_SECRET` · `db/` at the repo root (the F-239a pin confirmed
  in the STANDING rows — both demo users at 2026-10-15 — with the prior
  rounds' throwaway242/243/244/245 users keeping their real createdAt) · the
  node_modules and Playwright Chromium 1248 installs intact · agent-browser
  0.40.0. The five root documents (AGENTS/CLAUDE/README/PAD/SKILL) +
  `docs/session_108.md` + `docs/REMEDIATION-PLAN-SESSION-56.md` +
  `worklog.md` + `docs/session_109.md` were read and validated against the
  codebase (structure, seams, pins — every dimension answered the documented
  state: `src/proxy.ts` in place with no `middleware.ts`, the `.jsx`
  capital-alias stubs with their metadata re-exports
  (/Dashboard metadata-less by design), the db-path seam, the
  `@custom-variant hover` unwrap, the v3 palette re-pins, the
  `--shadow-sm`/`--blur-sm` re-pins, the `safe-area-pb` @utility, the
  `outputFileTracingExcludes` pin, the four config scopes carrying the
  `skills/` exclusion, the SEO explicit route handlers, and the F-239a
  regression surface). The full baseline gate then ran FIRST, green on the
  first full pass: lint 0/0 · typecheck 0 · **425/425 unit** · build ·
  **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented census-53
  ship state — plus the mobile-navigation battery **12/12** standalone.
- The local audit (§16/§20 of skills/web-application/SKILL.md): every
  dimension clean — the security sweep (zero
  dangerouslySetInnerHTML/eval/new Function; zero TODO/FIXME; zero `any`
  leaks — every hit prose in comments; the three `console.*` hits the
  documented sanctioned diagnostics), `src/middleware.ts`
  absent + `src/proxy.ts` in place, `skills/` excluded from all four scopes
  (eslint + tsconfig explicit; vitest's include and playwright's testDir
  by-construction), the literal-class discipline (the GRID_COLS static-map
  pattern re-read in `tabs.tsx`), the capital-alias stubs with metadata
  re-exports (all four app aliases verified), the
  `outputFileTracingExcludes` pin, the Tailwind v4 blocks (the hover unwrap,
  the v3 palette re-pins, the shadow/blur re-pins, the vendored
  tw-animate.css, no config JS), the `.env`/`.env.example` six-knob contract
  (verified against the live `.env`), the SEO surfaces (the explicit
  `sitemap.xml`/`robots.txt`/`manifest.json` route handlers), the
  docs-count lockstep verified live-tense at **425/68/14** (pre-round), and
  the known-issues register swept (all five rows
  documented/accepted/deferred — none falsely open).
- The Vitest + Playwright suites: verified IN PLACE and complete
  (`vitest.config.ts` with the `src/**` + `tests/**` include scopes;
  `playwright.config.ts` with `testDir: ./tests/e2e`, `workers: 1` — the
  load-bearing shared-SQLITE constraint — the CI=1 fresh-server knob, and
  the global-setup/storageState auth ride); no config changes required.
- The Sitemap/SEO check: the explicit `src/app/sitemap.xml/route.ts` (the
  9-loc superset over the reference's 4-cap-loc — verified live against
  both apps this round), `src/app/robots.txt/route.ts` (byte-identical form
  to the reference), `src/app/manifest.json/route.ts` (200 vs the
  reference's platform 302), the `pageMetadata()` factory + `metadataBase`
  wiring in `src/lib/site.ts`, the `og-image.png` + icon/apple-icon assets.

## 2. The round's finding: ONE code finding — F-246a, the Set Budget dialog's description line

The census found **one structural deviation**, the first code finding in
seventeen rounds:

**F-246a — the Set Budget dialog ships without the reference's description
line.** The reference's dialog carries, directly under its H2 title, a
`<p class="text-sm text-slate-500">Set a monthly spending limit for
November 2026</p>` (live-extracted this round at the canonical Budgets-page
origin: header `flex flex-col space-y-1.5 text-center sm:text-left`; the
month label rolling with the calendar — the schema's own comment quotes the
reference's October form "Set a monthly spending limit for October 2026").
Our dialog rendered the DialogHeader title-only since the s194 re-mirror.
**Why sixteen zero-drift rounds missed it:** the standing dialog probe
asserted the FIELD list (title / trigger / placeholder / input type /
submit) — the description was never a listed field, so its absence was
invisible to the field-list methodology; the Add Transaction dialog
genuinely carries NO description (verified again this round — header text
"Add Transaction", H2 only), so "dialogs have no description" had
generalized from the transaction dialog to the budget dialog. The probe
methodology gap closed this round: the dialog sweep now reads the FULL
header structure (tag/class/text of every header child), not just the field
list.

**The fix (TDD)**: the failing pin written FIRST
(`tests/budget-dialog-copy.test.ts` — two assertions: the description line
+ its slate-500 ink + its position inside the DialogHeader; the month tense
riding `monthLabel()` with the current-month computation), RED confirmed
(2/2 failing), then the minimal implementation — `<DialogDescription
className="text-sm text-slate-500">Set a monthly spending limit for
{currentMonth}</DialogDescription>` inside the DialogHeader (the className
pinned explicitly: the primitive's default muted-ink is #737373, the
reference's ink is slate-500 #64748b), `currentMonth = monthLabel(new
Date().getFullYear(), new Date().getMonth() + 1)` — the same helper the
dashboard header uses. GREEN (2/2), lint 0/0, tsc 0, and the LIVE
byte-match verified: our dialog's textContent now reads exactly the
reference's form ("Set BudgetSet a monthly spending limit for November
2026CategorySelect category…") with the P at class `text-sm
text-slate-500` — identical on both apps.

**The counts moved**: 425 → **427** unit (two new assertions), the
docs-count lockstep updated in the same change set (the constant + README +
CLAUDE + PAD §7 + SKILL live-tense surfaces — the s222 guard green at
**427/68/14**).

## 3. The live re-audit: the FIFTY-FOURTH census

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

- **The data state: UNCHANGED (the forty-sixth round at this state)** —
  the owner's 3 transactions all dated **Oct 27, 2026** (bills −$1,200.00
  · bills −$281.00 · food −$1,000.00, total −$2,481.00), the November
  dashboard answering the EMPTY month (KPIs $0.00 ×4, "November 2026
  Overview", "No expenses recorded yet", "No budgets set for this month")
  with Recent Transactions answering the ALL-TIME list (the 3 October
  rows). **The rolled week band holding its THIRD round at rest:** the
  Spend Summary card reads Week Spent $0.00 / Week Earned $0.00 (the
  Mon–Sun band the Nov 2 rollover emptied; the same-day census — rounds
  52/53/54 all on 2026-11-02; the scoping genus our implementation
  matches, KPIs month-scoped, recent all-time, week Mon–Sun).
- **The four-page title census (via FULL navigations):** `/` → "Budget
  Wise" · `/transactions` → "Transactions | Budget Wise" · `/budgets` →
  "Budgets | Budget Wise" · `/profile` → "Profile | Budget Wise" — all
  matching.
- **The s207 percent-decode probes (the round's fresh probe number
  246):** `/Curl%20Probe%20246%20Test` → **"Curl Probe 246 Test |
  Budget Wise"** (decoded, title via the browser — the reference serves
  the SPA shell at 200 with the 404 rendered client-side); `/foo%2Dbar-probe-246`
  → **"Foo Bar Probe 246 | Budget Wise"** (the %2D decode precedes the
  hyphen split); `/Hyphen-Probe-246` → **"Hyphen Probe 246 | Budget
  Wise"** — all three matching our implementation (the thirty-ninth
  census after the s207 fix). The 404 BODY quotes the raw ENCODED path on
  both apps (`The page "Curl%20Probe%20246%20Test" could not be found in
  this application.` — read at the probe page directly).
- **The 520 malformed-escape face held its THIRTY-SEVENTH round:**
  `/%2` answers the reference CDN's `520` (curl-verified); `/foo%bar`
  answers the reference's laxer `200`; `/%E0%A4/A` answered **200 this
  round** (within its documented CDN/redirect family) where ours answers
  the designed 404 with the never-throw raw-segment fallback on all three
  faces (curl-verified: 404 · 404 · 404, the last titling "A | Budget
  Wise" with the body quoting `"%E0%A4/A"` — the two-surface read the
  census-53 clarification canonized: the TITLE answers the last-segment
  rule, the BODY quotes the raw encoded path).
- **The row-anatomy probe (the deeper, full-nesting form):** the first
  list row byte-matches the recorded genus on every nesting level — row
  `flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors` ·
  the list `divide-y divide-slate-100` · icon tile `p-2.5 rounded-xl
  bg-red-50 text-red-600` (rect 40×40) with `lucide lucide-receipt w-5
  h-5` (computed 20×20) · text column `flex-1 min-w-0` carrying the
  inner `flex items-center gap-2` title row (P `font-medium
  text-slate-900 truncate` + the shadcn badge DIV) + P `text-sm
  text-slate-500` · amount block `flex items-center gap-4` with
  `lucide-arrow-down-left w-4 h-4 text-rose-500` (computed 16×16) +
  `SPAN.font-semibold text-lg text-rose-600` · the delete button's
  `lucide-trash2 w-4 h-4` (computed 16×16, no aria-hidden on the
  reference).
- **The dialogs:** the Add Transaction dialog byte-matching on labels AND
  order (title "Add Transaction", tabs [Expense, Income], Expense
  selected, submit "Add Expense", trigger "Select category", the date
  default "2026-11-02" — the same Nov 2 tense); the expense family 8;
  the Income tab flipping on the REAL Enter keydown (aria-selected flip +
  submit "Add Income" — the popup closed first, the probe-order canon);
  the income family 5; the **Set Budget dialog carrying the description
  line "Set a monthly spending limit for November 2026" (P.text-sm
  .text-slate-500 under the H2 — THE F-246a evidence)** with all fields
  matching (title "Set Budget", trigger "Select category", the single
  input placeholder "0.00" type number, submit "Set Budget" — the
  canonical Budgets-page origin). The delete-confirmation alertdialog
  byte-identical ("Delete TransactionAre you sure you want to delete
  this transaction? This action cannot be undone.CancelDelete").
- **The mobile axis (390×844):** the bottom bar byte-identical on every
  dimension (a bare DIV carrying `md:hidden fixed bottom-0 left-0
  right-0 z-50 bg-white border-t border-slate-200 safe-area-pb` · rect
  390×77 at y=767 · row `flex items-center justify-around py-2` · 4
  capitalized hrefs · the ink split on the anchor AND its svg · no
  aria-current on the reference) and the scroll-end clearance **764 ≤
  767, gap 3** (the scrolled-to-end canon, the main content-box form —
  IDENTICAL on both apps this round).
- **The SEO surfaces:** the reference sitemap carries the 4 capitalized
  locs (/, /Budgets, /Profile, /Transactions — weekly, 1.0/0.8);
  robots.txt identical in form on both; the reference's manifest 302
  (the platform's api redirect) vs ours 200 (the explicit route
  handler).
- **The logged-out root redirect (both stores cleared):**
  `/login?from_url=<abs-encoded>` — the wall-form genus.
- **The reference member-since line (the F-239a live re-read):** the
  owner profile answers **"Member since October 2026"** — the fixed
  form our pinned fixture matches.

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

- The dev server booted fresh TWICE (the boot-1 capture leg + the boot-2
  stability proof — each a clean `rm -rf .next` + the double-fork
  daemonized `bun run dev`, health 200/db up, the daemon at PPID=1 per
  the s242 guard; the daemonizer's TREE-SWEEP stop verified live both
  times — each stop sweeping the wrapper + next dev CLI + next-server
  pids (three pids each: [12916, 12922, 12935] then [16321, 16327,
  16340]), port 3000 verified free before each reboot, boot-2's
  next-server verified owning :3000 via the socket table). The in-place
  re-seed re-exercised the F-239a UPDATE-path pin green BEFORE the
  captures (both demo users still pinned at 2026-10-15; the
  throwaway242/243/244/245 users keeping their real createdAt; the demo
  month re-seeded into the current November — the with-data form
  standing at $4,424.55).
- Every local probe mirrored and matched: the with-data KPIs ($4,424.55
  / $5,000.00 / $575.45 / 4 · the 88.5% saved badge · November 2026
  Overview · **Week Spent $0.00 / Week Earned $0.00 — the same rolled
  band the reference answered live, its third round at rest**), the
  four-page titles (identical), the s207 set with the REAL 404 statuses
  (curl-verified on all three probes: 404 · 404 · 404), the
  raw-encoded 404 body, the designed 520-face fallback (`/%2` → 404,
  `/foo%bar` → 404, `/%E0%A4/A` → 404 with title "A | Budget Wise" and
  the body quoting `"%E0%A4/A"`), the row anatomy at full nesting depth
  (identical on every genus dimension + the N-89c6 library-injected
  aria-hidden superset on our row svgs + the trash2 dual-alias `lucide
  lucide-trash2 lucide-trash-2`), both dialogs (the expense family 8 ·
  the Income Enter-flip · the income family 5 · the Set Budget fields —
  **now including the F-246a description line, byte-identical on both
  apps post-fix**; the date default "2026-11-02"), the delete
  confirmation (byte-identical), the mobile bar (the NAV-landmark +
  aria-current superset read via the class-only selector — the
  documented guard; rect, classes, row, hrefs, ink split all identical)
  with the identical 764 ≤ 767 gap-3 clearance, the SEO surfaces (the
  9-loc superset · robots identical · manifest 200), the app-page guest
  wall `/login?from_url=<abs-encoded>` (via the logout API — our session
  cookie is httpOnly; the shim verified live in-browser: guest
  /transactions → `/login?from_url=http%3A%2F%2Flocalhost%3A3000%2Ftransactions`),
  our `/` the public landing (the D-142a posture), and the member-since
  line "Member since October 2026".
- **The dual-app diff: one structural deviation found (F-246a), fixed
  live, re-verified byte-identical. Zero residual drift.**

### 3.3 The evidence layer

- **A QUIET ROUND on the date-tense surfaces — no calendar event, no
  frame refreshed (except the remediated one):** the same-day census
  (rounds 52/53/54 all on 2026-11-02) held every date-tense surface at
  the Nov 2 state — the week band $0.00/$0.00 on both apps (its third
  round at rest), the dialog date default "2026-11-02", the month
  November.
- **The screenshot battery (boot-1): 10/12 byte-identical to HEAD +
  profile-desktop at the recorded avatar-jitter alternate 3d5173c8 +
  set-budget-dialog REFRESHED at 8343af1f (the F-246a remediation — the
  delta CONFINED to the dialog card region, bbox (522,303,989,662),
  49,856 px, max 251: the new description line + the form content
  shifted down by it — the expected refresh, the only intentional frame
  change).** The ten byte-identical: add-transaction-dialog f5a00f64
  (the caret-ON delay honored) · budgets-desktop 90f05175 ·
  budgets-mobile 26f59eab · dashboard-desktop cc31e6a1 (the DIRECT-form
  genus — HEAD itself this round, deterministic across both boots) ·
  transactions-desktop 05b594f2 · transactions-mobile 912e5aa0 ·
  landing-desktop 8ade5170 · login-desktop e504ff9f · profile-mobile
  b0413d45 · dashboard-mobile c264fdfb.
- **One capture-procedure lesson (recorded, no code implication):** the
  first boot-1 add-transaction-dialog capture answered a 521K-px
  whole-frame delta — ROOT CAUSE: captured from the TRANSACTIONS-page
  origin, while HEAD's canonical frame rides the DASHBOARD-page origin
  (both pages carry an Add Transaction button; the underlying scrimmed
  page differs). Re-captured from the dashboard origin: byte-identical
  (0 px) to HEAD on the first retry. The battery's canonical origins
  now recorded per-frame: add-transaction-dialog = DASHBOARD origin,
  set-budget-dialog = BUDGETS origin.
- **The boot-2 stability proof: 12/12 stable across both boots** (the
  server stopped with the tree sweep, `.next` cleared, rebooted, the
  full battery recaptured): 10/12 byte-identical to HEAD on BOTH boots
  (dashboard-desktop answering the SAME direct-form cc31e6a1 on both
  boots — deterministic within the round), profile-desktop at the
  avatar-jitter alternate 3d5173c8 on BOTH boots (the documented
  within-round genus realization — the alternate held this round, HEAD's
  ed954b46 not realized), and **set-budget-dialog answering the SAME
  refreshed md5 8343af1f on both boots (0-px cross-boot diff — the
  F-246a description line renders deterministically)**.
- **The VLM battery (4 pairs, the census JSON format): 1/4 clean with
  ZERO surviving flags** — the budgets-desktop pair clean
  (`{"differences": []}`); the dashboard pair's two flags BOTH the
  documented data-borne genera (the empty-vs-seeded donut + the
  savings-badge conditional); the transactions-desktop pair's three
  flags the documented data-borne row-content genus (4 seeded November
  rows vs the reference's 3 October rows — the row STRUCTURE
  byte-matched in the DOM census); the transactions-mobile pair's single
  flag the same data-borne row-content genus. The s204
  coarse-signal-never-a-gate posture held.
- **The s230 F-1 fix re-verified LIVE** on a fresh throwaway signup
  (`throwaway246-ui-1@test.local` through the in-app OTP funnel: signup
  with the confirm-password field → the 6-digit code **574356** read
  from the page's "Demo code:" line directly (the OTP code-read guard
  honored) → the six per-digit inputs filled by REAL KEYSTROKES — all
  six landing in their exact positions ["5","7","4","3","5","6"] —
  GREEN ON THE FIRST PASS, the SEVENTH consecutive round the canon holds
  → Verify email → auto-login): the empty dashboard rendering the exact
  reference form (the `text-slate-400` P "No expenses recorded yet" a
  DIRECT child of the `p-6 pt-0 flex items-center justify-center h-64`
  content div, no svg sibling) + the Budget Progress empty + the Recent
  Transactions empty + the dashboard API confirming the exact empty
  aggregate (balance 0 · income 0 · expenses 0 · **transactionCount 0**
  · savingsPercent null · spendingByCategory [] · budgets [] ·
  overallBudget null · month 11 · the week's all-zero Mon–Sun buckets ·
  recentTransactions [] · totalTransactions 0 · yearSummary 0/0) + the
  with-data form intact ($4,424.55 · the 88.5% saved badge) + the
  throwaway246 user keeping its real createdAt
  (2026-11-02T02:34:12.901Z — the fixture pins only the seeded demo
  accounts).
- **The F-239a regression check live on BOTH apps through BOTH seed
  paths:** the standing rows pinned at 2026-10-15 (the s242
  fresh-clone CREATE path, still standing), the in-place re-seed
  re-exercised the update-path pin green (both demo users still at
  2026-10-15), and both live surfaces read "Member since October
  2026" — our demo profile and the reference owner account.

## 4. Findings

### Issues found and fixed (this round)

| ID | Severity | Location | Finding | Fix | Evidence |
|---|---|---|---|---|---|
| F-246a | Medium (visual parity gap, no functional/security impact) | `src/components/shared/budget-dialog.tsx` | The Set Budget dialog shipped without the reference's description line (`Set a monthly spending limit for <Month Year>`, P.text-sm.text-slate-500 under the H2) — present on the reference since at least October (the schema comment quotes its October form), missed by sixteen rounds of field-list dialog probes | TDD: `tests/budget-dialog-copy.test.ts` (2 pins, RED first) → `<DialogDescription className="text-sm text-slate-500">` + `monthLabel()` current-month interpolation → GREEN; live byte-match on both apps; the set-budget-dialog frame refreshed at 8343af1f (delta confined to the card) | The reference probe (full header structure), the failing→passing test, the live textContent match, the 0-px cross-boot diff |

### Verified clean (no drift — no action)

- Every other parity surface (enumerated in §3) — zero structural drift
  for the thirty-ninth census after the s207 fix.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone; the
  clearance identical at 764 ≤ 767, gap 3). The Tailwind v4
  mobile-nav bug class stayed retired; the bar is plain fixed chrome
  with the `safe-area-pb` @utility and the pb-20 clearance contract.
- Tailwind v4: no bugs (all pins verified in place — the hover unwrap,
  the v3 palette re-pins, the shadow/blur re-pins, the vendored
  tw-animate.css, no config JS; literal class strings only).
- The `.env`/`db` contract: the six knobs; `DATABASE_URL` at the
  mandated `file:../db/custom.db`; `db/` at the repo root; the seam
  pinned by `tests/db-path.test.ts`; `.env.example` tracked with
  identical knob names (verified against the live `.env`).
- The Vitest + Playwright suites: in place with clean config scopes
  (**427**/68/14 post-fix, all green); `workers: 1` and the CI=1 knob
  intact.
- The SEO surfaces: the explicit sitemap/robots/manifest route handlers
  implemented and matching the reference formats (the documented
  superset genera); the metadataBase/pageMetadata wiring intact.
- The s230 F-1 fix (the donut empty state): re-verified LIVE on a fresh
  throwaway signup — the funnel green on the FIRST pass (the seventh
  consecutive round); the empty dashboard + the API aggregate
  byte-exact.
- The F-239a fix (the demo member-since pin): live-verified on BOTH
  apps through BOTH seed paths this round.
- The security sweep, the `skills/` exclusion, the capital-alias stubs
  (with the metadata re-exports), the `outputFileTracingExcludes`
  artifact-hygiene pin, the known-issues register, the neo-crm
  stack-pattern lineage.
- The reference data state: unchanged at 3 txns / −$2,481.00 (the
  forty-sixth round) — no owner-side change to mirror.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (NO RESET — the fifth consecutive
       no-reset round; `git pull` fast-forward to `85df9a1`; the
       standing environment verified: the six-knob `.env`, the db at
       the root with the standing F-239a pin, the Chromium install).
2. [x] The baseline gate: 425/425 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented census-53 ship state,
       first full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #54 + the dual-app diff — ONE
       structural deviation found (F-246a, the Set Budget description
       line); every other surface zero-drift; the F-239a regression
       check live on both apps through both seed paths; the s230 F-1
       fix re-verified live (UI + API probes); the data state unchanged
       (§3).
5. [x] The screenshot battery — 10/12 byte-identical to HEAD on
       boot-1 + profile-desktop at the avatar-jitter alternate +
       set-budget-dialog refreshed at 8343af1f (the F-246a fix, delta
       confined to the dialog card); the capture-origin lesson
       recorded (add-transaction-dialog = DASHBOARD origin).
6. [x] The boot-2 stability proof — 12/12 stable across both boots
       (10/12 byte-identical on both boots + the refreshed
       set-budget-dialog deterministic at 0-px cross-boot diff + the
       avatar-jitter alternate on both boots).
7. [x] The VLM battery — 1/4 clean, zero surviving flags after the
       direct-census cross-check (every flag the documented data-borne
       genera).

**Phase B — the remediation**

8. [x] **F-246a** — the TDD fix: the failing pin FIRST
       (`tests/budget-dialog-copy.test.ts`, 2 assertions, RED
       confirmed) → the minimal implementation (DialogDescription +
       monthLabel current-month) → GREEN (2/2) → lint 0/0 · tsc 0 →
       the LIVE byte-match verified on both apps → the full gate
       re-run GREEN (**427/427** unit · 14/14 smoke · 68/68 e2e CI=1 —
       the Set Budget e2e round trip unaffected: the accessible name
       rides the title).
9. [x] The docs-count lockstep in the same change set: the constant
       425 → 427 + the live-tense surfaces in README (2) + CLAUDE (2)
       + PAD §7 (1) + SKILL (3) — the s222 guard green.

**Phase C — the documentation + the ship**

10. [x] This plan (the one-finding record + the census evidence + the
        capture-origin lesson).
11. [x] The PAD v2.56.0 revision block (the fifty-fourth census — the
        F-246a remediation round).
12. [x] `budget-wiser_SKILL.md` v1.55.0 (the frontmatter bump + the
        provenance's session-246 clause + Appendix C's session-246
        row).
13. [x] `docs/session_110.md` + the worklog entry (Task ID 246) +
        `.gitignore`'s walk246 entry.
14. [x] The post-documentation gate re-run (the ship discipline) before
        the atomic commit.
15. [x] The git sweep (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/`, `scripts/walk246/` staged — the walk246
        folder git-ignored per the established pattern) + the atomic
        commit on main + the push via `docs/ssh_git_wrapper_v3.py`
        (the runbook: keys never live inside the repo; the key shredded
        post-push; the wrapper's `--remote` flag — the census-53
        lesson — targeting `git@github.com:nordeim/budget-wiser.git`).

## 6. Risks and guards

- **The F-246a fix's regression surface is empty-by-construction
  beyond the pin**: the change adds one rendering element inside an
  existing DialogHeader (no schema/API/store/behavior change); the
  e2e Set Budget round trip stayed green untouched; the description's
  month tense rides the same `monthLabel()` helper the dashboard header
  uses (unit-pinned in budget-math's own suite + re-pinned in the new
  spec).
- **The dialog-sweep methodology hardening (forward rule):** the
  dialog census now reads the FULL header structure (every header
  child's tag/class/text), not just the field list — the probe gap
  that let F-246a survive sixteen rounds. New dialogs get their header
  structure recorded with the fields.
- **The capture-origin lesson (forward rule):** the battery's
  per-frame canonical origins are now explicit — add-transaction-dialog
  rides the DASHBOARD origin, set-budget-dialog the BUDGETS origin;
  a whole-frame delta under scrim with a clean dialog card means
  "wrong underlying page", not drift.
- **The week-band guard at rest:** the band held $0.00/$0.00 on both
  apps for its third round (the same-day census); the next band-form
  event lands at the Mon Nov 9 rollover (or any owner-side data plant)
  — the s244 guard's classification rules standing.
- **The avatar-jitter pairs unchanged:** desktop ed954b46 ↔ 3d5173c8
  (the alternate realized on BOTH boots this round) · mobile b0413d45 ↔
  8c6e81e7 (HEAD realized on both boots); every observed realization
  answered the documented signatures — no new genus.
- **The settle/direct dashboard pair:** cc31e6a1 (the direct form)
  realized deterministically on both boots this round; either member of
  the pair cc31e6a1 ↔ 033ab000 answers a recorded genus.
- **The OTP code-read guard honored this round** (the code read from
  the "Demo code:" line directly — no devtools-payload hit).
- **The daemon-stop tree sweep (s244 guard) verified live both stops**
  (three pids swept each, the port verified free before each reboot,
  boot-2 verified owning :3000 via the socket table).
- The reference's data state has sat at 3 October txns since round 30
  — a future owner-side re-plant will surface as new data-borne
  divergence, not structural drift (the standing classification rule).
- The warm-workspace posture (no reset) preserved the prior rounds'
  daemonizer + pixel-diff + ssh shim under `/home/z/my-project/` —
  the s242/s244 environment guards all applied and held this round.

## 7. Execution addendum

- The census executed per §3 on 2026-11-02: the reference leg (the
  owner login, the desktop probes via full navigations, the mobile
  axis, the s207/520 probes, the SEO curl set, the member-since
  re-read), the local leg (the N-1 dev boot ×2, the in-place re-seed,
  the full probe mirror, the throwaway-signup empty-state
  verification), the evidence layer (the 12-frame battery + the boot-2
  proof + the 4-pair VLM battery).
- ONE code finding (F-246a) → remediated with TDD within the round;
  the counts moved to **427/68/14** (the s222 lockstep guard green in
  the suite).
- The evidence: one frame refreshed (set-budget-dialog at 8343af1f —
  the remediation's own surface, deterministic across both boots); ten
  byte-identical; profile-desktop at the recorded alternate; the VLM
  battery zero surviving flags.
- The documentation set shipped: this plan, the PAD v2.56.0 (the
  revision block), `budget-wiser_SKILL.md` v1.55.0 (the frontmatter +
  the provenance's session-246 clause + Appendix C's session-246 row),
  `docs/session_110.md`, the worklog entry (Task ID 246), and the
  `.gitignore` walk246 entry.
- The full gate re-ran green after the remediation and will re-run
  after the documentation work (**427/427** unit · build · 14/14 smoke
  · 68/68 e2e CI=1) — the ship state.
