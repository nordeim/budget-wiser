# Budget Wise — Session 58 Remediation Plan

**Date:** 2026-11-02 · **Task ID:** 247 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ZERO-FINDINGS verification round (the FIFTY-FIFTH census — the fortieth after the s207 percent-decode fix, the thirtieth after the s218 arrow remediation, and the twenty-ninth carrying the deeper row-anatomy probe as standing methodology; the first round after the census-54 F-246a remediation ship), a RESET round (the sandbox recycled between sessions — the fifteenth-reset family) whose fresh-clone bootstrap ran green end-to-end and whose one census event was the F-246a fix's first post-ship live verification on BOTH apps.

## 1. Audit scope executed (this session)

- Intake: the workspace was RESET (the sandbox recycled; no standing
  tree) — `git clone https://github.com/nordeim/budget-wiser.git`
  landed at `dab7acb` (the owner's `docs/session_111.md` transcript
  commit over the census-54 F-246a ship `88e07b2`), and the environment
  was REBUILT per the fresh-clone bootstrap: `bun install` (513
  packages) · the six-knob `.env` regenerated with
  `DATABASE_URL="file:../db/custom.db"` and a fresh
  `AUTH_SECRET` (`openssl rand -hex 32`) · `bun run db:push && bun run
  db:seed` (the F-239a CREATE-path pin confirmed in SQLite on the first
  seed — both demo users at 2026-10-15) · Playwright Chromium 1248 ·
  agent-browser 0.40.0. The five root documents
  (AGENTS/CLAUDE/README/PAD/SKILL) + `docs/session_110.md` +
  `docs/REMEDIATION-PLAN-SESSION-57.md` + `worklog.md` +
  `docs/session_111.md` were read and validated against the codebase
  (structure, seams, pins — every dimension answered the documented
  ship state).
- The baseline gate: GREEN on the FIRST full pass — lint 0/0 · tsc 0 ·
  **427/427 unit** · build · 14/14 smoke · 68/68 e2e (CI=1) — the exact
  documented census-54 ship state; the mobile-navigation battery 12/12
  standalone.
- The local audit (the §16/§20 dimensions of
  `skills/web-application/SKILL.md`): every dimension clean — the
  security sweep (no dangerouslySetInnerHTML/eval/new Function; no
  TODO/FIXME; the three console.* hits the documented sanctioned
  diagnostics), `src/middleware.ts` absent + `src/proxy.ts` in place,
  `skills/` excluded from all four scopes (eslint + tsconfig explicit;
  vitest include + playwright testDir by-construction), the
  literal-class discipline (the GRID_COLS static-map pattern re-read),
  the capital-alias stubs with metadata re-exports
  (Transactions/Budgets/Profile; /Dashboard metadata-less by design),
  the `outputFileTracingExcludes` pin, the Tailwind v4 blocks (the
  hover unwrap, the v3 palette re-pins, the shadow/blur re-pins,
  safe-area-pb, no config JS), the `.env`/`.env.example` six-knob
  contract (identical knob names), the SEO surfaces (the explicit
  sitemap.xml/robots.txt/manifest.json route handlers), the docs-count
  lockstep **427/68/14** (the s222 guard green in the suite), the
  known-issues register swept (all five rows
  documented/accepted/deferred).

## 2. The round's mandate and posture

The round's mandated focus areas (the user instruction set): the
workspace refresh, the five-document read + validation, the plan review
(session_110 + REMEDIATION-PLAN-SESSION-57 + worklog + session_111),
the §16/§20 audit, the reference parity iteration, the mobile
navigation (the Tailwind v4 bug class), the `.env`/`db` contract, the
vitest + playwright suites, the sitemap/SEO surfaces, the remediation
plan + TDD, the screenshots under `docs/screenshots/`, the
`.env.example` contract, the documentation alignment, and the main-only
push via the SSH wrapper. Every area executed; the round answered ZERO
code findings (the census's standing record: the codebase at the
census-54 ship state, verified against the live reference on every
probed surface).

## 3. The live re-audit: the FIFTY-FIFTH census

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

Logged in (the owner account). The data state UNCHANGED a forty-seventh
round: 3 October txns (bills −$1,200 · bills −$281 · food −$1,000 —
−$2,481.00 total), the November empty month (all-zero KPIs), the year
band at $0. The rolled week band's FOURTH round at rest (the same-day
census: rounds 52/53/54/55 all on 2026-11-02): Week Spent $0.00 / Week
Earned $0.00.

- The four-page titles via full navigations: "Budget Wise" ·
  "Transactions | Budget Wise" · "Budgets | Budget Wise" ·
  "Profile | Budget Wise".
- The s207 percent-decode probes (the fresh round number 247):
  `/Curl%20Probe%20247%20Test` → "Curl Probe 247 Test | Budget Wise";
  `/foo%2Dbar-probe-247` → "Foo Bar Probe 247 | Budget Wise" (the %2D
  decode-precedes-hyphen order); `/Hyphen-Probe-247` → "Hyphen Probe
  247 | Budget Wise" — all on the reference's SPA shell (200 + the
  client-rendered 404 title).
- The 520 malformed-escape face a thirty-eighth round: `/%2` → the
  CDN 520 title; `/foo%bar` → 200 with the garbled-decode title;
  `/%E0%A4/A` → 200 — the platform artifact varying within its
  documented family (520/200/200 this round).
- The two-surface 404 read exact: the `/%E0%A4/A` title "A | Budget
  Wise" (the last-segment rule) + the 404 BODY quoting the raw encoded
  path `"%E0%A4/A"`.
- The row anatomy at full nesting depth: the row class, the icon tile,
  the inner title-row wrapper (`flex items-center gap-2` > the truncate
  P + the shadcn badge DIV), the date P, the amount arm — the recorded
  genus.
- The Add Transaction dialog (the full-header read, the census-54
  forward rule): single H2 "Add Transaction"
  (tracking-tight text-xl font-semibold), NO description line; the
  expense family 8 in the visible listbox ("Food & Dining | Transport
  | Entertainment | Shopping | Bills & Utilities | Healthcare |
  Education | Other", none selected); the trigger at the placeholder
  state "Select category"; the date default 2026-11-02; the Income tab
  flipping on the real Enter keydown; the income family 5 ("Salary |
  Freelance | Investment | Gift | Other"); the submit flipping "Add
  Expense" → "Add Income"; the empty-form submit DISABLED on both apps.
- The Set Budget dialog (the canonical Budgets-page origin, the
  full-header read): H2 "Set Budget" + **the description line `<P
  class="text-sm text-slate-500">Set a monthly spending limit for
  November 2026</P>`** + the food/0.00 fields + the "Set Budget"
  submit — the F-246a surface confirmed standing on the reference.
- The mobile axis (390×844): the bottom bar DIV
  `md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t
  border-slate-200 safe-area-pb` at rect 390×77@y767; the four
  capitalized hrefs; the ink split on the anchor AND its svg (active
  slate-900 / inactive slate-400); NO aria-current on the reference.
- The scroll-end clearance canon: deepest main content-bottom 764 ≤
  bar top 767 (gap 3; the main content-box form, 844 − 80px pb-20).
- The SEO genera: the 4-cap-loc reference sitemap; the robots form
  identical; the manifest 302 → the platform's app-manifests redirect.
- The member-since line: "Member since October 2026" (the F-239a
  regression surface).
- The logged-out root redirect: `/login?from_url=<abs-encoded>`.
- Four reference frames captured for the VLM battery
  (dashboard-desktop, transactions-desktop, budgets-desktop,
  transactions-mobile).

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

The F-239a pin through BOTH seed paths: the fresh-clone CREATE path
(the first seed pinned both demo users at 2026-10-15 — confirmed in
SQLite) + the in-place re-seed UPDATE path (the second seed kept the
pins; throwaway247 keeping its real createdAt 2026-11-02T04:55:57).
The dev server daemonized (the double-fork posture, PPID=1;
next-server owning :3000 via the socket table; health 200/db up) on a
clean `.next` ×2 boots, the tree-sweep stop verified at both stops
(three pids swept each, the port verified free before each reboot).

- The with-data KPI mirror: $4,424.55 / $5,000.00 / $575.45 / 4 · the
  88.5% saved badge — and the Week Spent $0.00 / Week Earned $0.00
  (the same-day rolled band, the fourth round at rest on both apps).
- The four-page titles via full navigations: identical.
- The s207 probes via curl (the real statuses): all three 404 with the
  decoded titles — "Curl Probe 247 Test | Budget Wise", "Foo Bar Probe
  247 | Budget Wise", "Hyphen Probe 247 | Budget Wise".
- The 520 face via curl: `/%2` → 404 "%2 | Budget Wise" · `/foo%bar`
  → 404 "Foo%bar | Budget Wise" · `/%E0%A4/A` → 404 "A | Budget Wise"
  — the designed never-throw raw-segment fallback on all three.
- The two-surface 404 read: the title "A | Budget Wise" + the body
  quoting `&quot;%E0%A4/A&quot;` — the raw encoded form.
- The row anatomy: the row class + the inner title-row wrapper + the
  shadcn badge DIV + the trash2 dual-alias
  (`lucide lucide-trash2 lucide-trash-2`) + the N-89c6 aria-hidden
  superset (3 aria-hidden svgs) — the documented genus.
- The Add Transaction dialog (the DASHBOARD origin, the full-header
  read): single H2, no description, the expense family 8 in the
  visible listbox (labels AND order byte-identical), the placeholder
  trigger, the date default 2026-11-02, the Income Enter-flip, the
  income family 5 (byte-identical), the submit flip, the disabled
  empty-form submit — **plus the NEW census dimension: the hidden
  native-select shim read** (below).
- The Set Budget dialog (the BUDGETS origin): **the F-246a fix verified
  live** — our dialog carries `<P class="text-sm text-slate-500">Set a
  monthly spending limit for November 2026</P>` — the textContent,
  the tag, the ink, and the position byte-matching the reference's
  form (the fix's first post-ship live verification).
- The mobile axis: the bottom bar NAV (our a11y superset) with the
  byte-identical class string at rect 390×77@y767, the four
  capitalized hrefs, the ink split on the anchor AND its svg, and OUR
  `aria-current="page"` superset on the active item — every dimension
  matching the reference's DIV bar.
- The clearance canon: 764 ≤ 767, gap 3 — IDENTICAL on both apps.
- The SEO genera: our 9-loc superset sitemap (the real lowercase
  routes + about/contact); the robots form identical; the manifest
  200 (vs the reference's 302 platform redirect — the documented
  genus).
- The guest wall: the F-147c2 shim served to the guest (zero
  app-content markers in the HTML payload) + the live in-browser wall
  at `/login?from_url=http%3A%2F%2Flocalhost%3A3000%2FDashboard`.
- The member-since line: "Member since October 2026".
- The s230 F-1 fix re-verified LIVE through the OTP funnel:
  throwaway247-ui-1@test.local — the signup with the confirm-password
  field → the 6-digit code **824597** read from the page's "Demo
  code:" line directly (the OTP code-read guard honored) → the six
  per-digit inputs filled by REAL KEYSTROKES — all six landing in
  their exact positions ["8","2","4","5","9","7"], the focus advanced
  to the last input — GREEN ON THE FIRST PASS (the EIGHTH consecutive
  round the canon holds) → Verify email → auto-login: the empty
  dashboard rendering the exact reference form (the text-slate-400 P
  "No expenses recorded yet" a DIRECT child of the p-6 pt-0 flex
  items-center justify-center h-64 content div, no svg sibling) + the
  dashboard API confirming the exact empty aggregate (balance 0 ·
  income 0 · expenses 0 · transactionCount 0 · savingsPercent null ·
  spendingByCategory [] · budgets [] · overallBudget null · month 11 ·
  the week's all-zero buckets) + the with-data form intact
  ($4,424.55 · the 88.5% saved badge).

### 3.3 The evidence layer

- The screenshot battery (boot-1, the daemonized dev server, the
  viewport reset before each desktop frame, the dialog frames at the
  canonical origins with the caret-ON delay): **10/12 byte-identical
  to HEAD** + TWO delta frames each at its RECORDED genus realization
  — dashboard-desktop at the settle-form **033ab000** (the pixel-diff
  answering the EXACT documented signature: 49,260 px, max 7, ZERO at
  ≥ 32, bbox (172,818,926,885) — the donut antialias band; the
  manifest's settle/direct genus pair cc31e6a1 ↔ 033ab000) and
  profile-desktop at the avatar-jitter alternate **3d5173c8** (105 px,
  max 6, ZERO at ≥ 32, bbox (357,255,504,373) — the avatar bbox). NO
  frame refreshed (every delta a recorded genus, the s228 precedent).
  The ten byte-identical: add-transaction-dialog f5a00f64 ·
  budgets-desktop 90f05175 · budgets-mobile 26f59eab ·
  transactions-desktop 05b594f2 · transactions-mobile 912e5aa0 ·
  landing-desktop 8ade5170 · login-desktop e504ff9f · profile-mobile
  b0413d45 · dashboard-mobile c264fdfb · set-budget-dialog 8343af1f
  (the F-246a refreshed form holding a second round).
- The boot-2 stability proof: **12/12 stable across both boots** —
  11/12 byte-identical boot-1 ↔ boot-2 + dashboard-desktop answering
  HEAD's direct-form cc31e6a1 on boot-2 at the 0-px diff (the
  settle/direct pair's both members realized across the two boots, the
  documented possibility) — the daemon-stop tree sweep verified at
  both stops (the port verified free before the reboot; boot-2's
  next-server verified owning :3000 via the socket table).
- The VLM battery (4 pairs, the census JSON format): **1/4 clean with
  ZERO surviving flags** — transactions-desktop clean ({}); the
  dashboard pair's three flags ALL the documented data-borne genera
  (the empty-vs-seeded donut, the savings-badge conditional, the
  recent-transactions row count); the budgets-desktop pair's single
  flag the reference's platform edit badge (the platform-face genus);
  the transactions-mobile pair's two flags the platform badge's
  occlusion of the reference's bottom bar (disproven by the direct
  4-href byte-census — both bars carrying the identical class string
  at rect 390×77@y767) + the platform badge itself; the s204
  coarse-signal-never-a-gate posture held.

## 4. Findings

### Issues found and fixed (this round)

NONE — zero code findings. The codebase answered the census-54 ship
state on every probed surface; the F-246a remediation's surface
verified live on both apps for the first post-ship round.

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift for
  the fortieth census after the s207 fix.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census at 390×844 + the 12/12 e2e battery green
  standalone; the clearance identical at 764 ≤ 767, gap 3). The
  Tailwind v4 mobile-nav bug class stayed retired.
- Tailwind v4: no bugs (all pins verified in place).
- The `.env`/`db` contract: the six knobs;
  `DATABASE_URL="file:../db/custom.db"`; `db/` at the repo root (the
  F-239a pin through both seed paths); `.env.example` tracked with
  identical knob names.
- The Vitest + Playwright suites: 427/68/14 all green; `workers: 1`
  and the CI=1 knob intact.
- The SEO surfaces: matching the reference formats (the documented
  superset genera).
- The s230 F-1 fix: re-verified live (the funnel first-pass green an
  eighth consecutive round).
- The F-239a fix: live on both apps through both seed paths.
- The F-246a fix: verified live on BOTH apps (the round's one census
  event).
- The security sweep, the `skills/` exclusion, the capital-alias
  stubs, the `outputFileTracingExcludes` pin, the known-issues
  register, the neo-crm stack-pattern lineage.
- The reference data state: unchanged at 3 txns / −$2,481.00 (the
  forty-seventh round).

### New census dimensions and lessons (recorded, no code implication)

1. **The hidden native-select shim read (a new standing census
   dimension):** both apps' dialog category pickers carry the SAME
   architecture — a visible combobox BUTTON (role=combobox, the
   Radix-style trigger at the placeholder state) + a hidden 1×1-px
   `aria-hidden` tabIndex=-1 native `<select>` carrying
   `required` (the validation shim). The shim's INTERNAL vocabulary
   differs: ours renders a leading EMPTY option (the unset state) +
   the values `healthcare`/`other_income`; the reference's renders no
   empty option + the values `health`/`other`. CLASSIFICATION:
   below-parity-surface implementation detail — the shim is
   aria-hidden, 1×1-px, tabIndex=-1, never rendered; the VISIBLE
   surfaces (the trigger text, the open listbox's labels AND order,
   the submit semantics, the disabled states) are byte-identical on
   both apps; our value vocabulary is our own wire contract (pinned
   across schema/API/unit suites — internally consistent). Genus: the
   aria-hidden implementation-detail family (the N-89c6 precedent).
   The forward rule: the dialog census records the shim read WITH the
   visible reads, classified by the visible-surface equality.
2. **The cross-origin probe-confirmation rule (probe hygiene):** the
   agent-browser session can hold both origins' pages across a census
   (the reference SPA and the local dev server), and a relative-URL
   probe (`location.pathname === "/Dashboard"`) CANNOT distinguish
   them — a div-only bottom-bar filter silently answered the
   REFERENCE's bar (a DIV) while the local bar (a NAV — our a11y
   superset) sat unprobed. The discipline: every local-leg probe
   asserts the absolute origin (`location.href` starts with
   `http://localhost:3000`) BEFORE reading the DOM, and the bar
   census queries `nav` elements (ours) alongside `div` (the
   reference's).

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (RESET — the fresh clone at `dab7acb`;
       the bootstrap green end-to-end: install → six-knob `.env` → db
       push+seed → Chromium 1248 → agent-browser 0.40.0).
2. [x] The baseline gate: 427/427 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented census-54 ship state,
       first full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #55 + the dual-app diff — ZERO
       structural drift; the F-246a fix's first post-ship live
       verification on both apps; the F-239a regression check through
       both seed paths; the s230 F-1 fix re-verified live (the OTP
       funnel first-pass green); the data state unchanged (§3).
5. [x] The screenshot battery — 10/12 byte-identical to HEAD + the
       two recorded genus realizations (the settle-form + the
       avatar-jitter alternate, both at the exact documented
       signatures); NO frame refreshed.
6. [x] The boot-2 stability proof — 12/12 stable across both boots
       (the settle/direct pair's both members realized across the
       boots; 11/12 byte-identical boot-1 ↔ boot-2).
7. [x] The VLM battery — 1/4 clean, zero surviving flags after the
       direct-census cross-check.

**Phase B — the remediation**

8. [x] NONE — zero code findings; no code changed this round (the
       counts hold at 427/68/14).

**Phase C — the documentation + the ship**

9. [x] This plan (the zero-findings record + the census evidence +
       the two new census dimensions/lessons).
10. [x] The PAD v2.57.0 revision block (the fifty-fifth census — the
        F-246a post-ship verification round).
11. [x] `budget-wiser_SKILL.md` v1.56.0 (the frontmatter bump + the
        provenance's session-247 clause + Appendix C's session-247
        row).
12. [x] `docs/session_112.md` + the worklog entry (Task ID 247) +
        `.gitignore`'s walk247 entry.
13. [x] The post-documentation gate re-run (the ship discipline)
        before the atomic commit.
14. [x] The git sweep (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/`, `scripts/walk247/` staged — the walk247
        folder git-ignored per the established pattern) + the atomic
        commit on main + the push via `docs/ssh_git_wrapper_v3.py`
        (the runbook: keys never live inside the repo; the key
        shredded post-push; the wrapper's `--remote` flag — the
        census-53 lesson — targeting `git@github.com:nordeim/budget-wiser.git`).

## 6. Risks and guards

- **The zero-findings posture is not a pass-by-inertia:** the census
  probed every standing surface (the reference leg, the local leg,
  the battery, the VLM) AND added one new dimension (the shim read) —
  the round's only code-adjacent observation classified
  below-parity-surface with the visible-surface equality as the
  evidence.
- **The week-band guard at rest:** the band held $0.00/$0.00 on both
  apps for its fourth round (the same-day census); the next band-form
  event lands at the Mon Nov 9 rollover (or any owner-side data
  plant) — the s244 guard's classification rules standing.
- **The avatar-jitter pairs unchanged:** desktop ed954b46 ↔ 3d5173c8
  (the alternate realized on BOTH boots this round) · mobile
  b0413d45 ↔ 8c6e81e7 (HEAD realized on boot-1; boot-2 mobile frames
  byte-identical to boot-1's).
- **The settle/direct dashboard pair:** cc31e6a1 (the direct form,
  HEAD's manifest) realized on boot-2 at the 0-px diff; 033ab000 (the
  settle form) realized on boot-1 at the exact documented signature —
  the pair's both members realized across the two boots, the
  documented possibility.
- **The OTP code-read guard honored this round** (the code 824597 read
  from the "Demo code:" line directly — no devtools-payload hit).
- **The daemon-stop tree sweep (s244 guard) verified live at both
  stops** (three pids swept each, the port verified free before each
  reboot, boot-2's next-server verified owning :3000 via the socket
  table).
- **The reset-round posture:** the fresh-clone bootstrap is itself a
  verified path (the s241/s242 precedent — install → six-knob `.env`
  → db push+seed → Chromium → the gate green on the first full
  pass); the standing workspace artifacts (the daemonizer, the
  pixel-diff, the walk folders) were regenerated outside the repo
  tree this round.
- The reference's data state has sat at 3 October txns since round 30
  — a future owner-side re-plant will surface as new data-borne
  divergence, not structural drift (the standing classification rule).

## 7. Execution addendum

- The census executed per §3 on 2026-11-02: the reference leg (the
  owner login, the desktop probes via full navigations, the mobile
  axis, the s207/520 probes, the SEO curl set, the member-since
  re-read), the local leg (the N-1 dev boot ×2, the in-place re-seed,
  the full probe mirror, the throwaway-signup empty-state
  verification), the evidence layer (the 12-frame battery + the
  boot-2 proof + the 4-pair VLM battery).
- ZERO code findings — the counts hold at **427/68/14** (the s222
  lockstep guard green in the suite).
- The evidence: ten frames byte-identical; two delta frames at the
  recorded genus realizations; the VLM battery zero surviving flags.
- The documentation set shipped: this plan, the PAD v2.57.0 (the
  revision block), `budget-wiser_SKILL.md` v1.56.0 (the frontmatter +
  the provenance's session-247 clause + Appendix C's session-247
  row), `docs/session_112.md`, the worklog entry (Task ID 247), and
  the `.gitignore` walk247 entry.
- The full gate re-ran green after the documentation work (**427/427**
  unit · build · 14/14 smoke · 68/68 e2e CI=1) — the ship state.
