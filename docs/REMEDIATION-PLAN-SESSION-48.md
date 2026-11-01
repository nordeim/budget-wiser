# Budget Wise — Session 48 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 237 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ZERO-FINDINGS verification round (the FORTY-FIFTH census — the thirtieth after the s207 percent-encoding fix, the twentieth after the s218 arrow remediation, and the nineteenth carrying the deeper row-anatomy probe as standing methodology; the NINTH zero-drift round after sessions 227/228/231/232/233/234/235/236)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the tenth consecutive
  no-reset round): `git pull` fast-forwarded to `9af6328` (the owner's
  `docs/session_91.md` transcript commit over the s236 ship `56391d2`),
  and the standing environment was VERIFIED rather than rebuilt: bun
  1.3.14 (the sandbox's own), the six-knob `.env` standing with
  `DATABASE_URL="file:../db/custom.db"` (the mandated contract), `db/`
  at the repo root with `custom.db` + `e2e.db` + `smoke.db`, and
  agent-browser 0.40.0 verified. The five root documents +
  `docs/session_90.md` + `docs/REMEDIATION-PLAN-SESSION-47.md` +
  `worklog.md` + `docs/session_91.md` were read and validated against
  the tree before touching anything (the db-path seam, the proxy
  seam, the capital-alias stubs with their metadata re-exports, the
  `@custom-variant hover` unwrap, the v3 palette re-pins, the
  `outputFileTracingExcludes` pin, the four config scopes carrying
  the `skills/` exclusion — each verified in place). The full
  baseline gate then ran FIRST: lint 0/0 · typecheck 0 · **422/422
  unit** · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact
  documented s236 ship state, green on the first full pass, with the
  mobile-navigation battery additionally re-verified standalone at
  **12/12**.

- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no dangerouslySetInnerHTML, no
  eval/new Function, no TODO/FIXME, no `any` leaks in `src/`; the three
  `src/` `console.*` hits answered as the documented sanctioned
  diagnostics — the two server-console OTP delivery lines + the dev-only
  AUTH_SECRET fallback warning), `src/middleware.ts` absent +
  `src/proxy.ts` in place (the s201 seam), `skills/` confirmed excluded
  from all four check/test/compile scopes (tsc exclude · eslint ignores
  · vitest include `src|tests` only · playwright testDir `tests/e2e`),
  the literal-class discipline verified (all template `className` hits
  are static-constant compositions or complete-literal ternary
  branches over the `page-layout.ts` records), the capital-alias
  `.jsx` stubs verified (the metadata re-exports present on
  Transactions/Budgets/Profile; /Dashboard metadata-less by design),
  the `outputFileTracingExcludes` artifact-hygiene pin verified, and
  the mandated focus areas each swept clean — the **mobile
  navigation** (the 12-test e2e battery green standalone + the live
  byte-census on BOTH apps) and **TailwindCSS v4** (the
  `@custom-variant hover` unwrap at globals.css:20, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
  `safe-area-pb` @utility, no config JS, no v4-family bugs found).
  The `.env`/`db` contract verified (six knobs in both files with
  identical knob names, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`, `.env.example` tracked), the Vitest +
  Playwright suites verified in place with clean config scopes, the
  SEO surfaces verified (sitemap + robots + manifest explicit route
  handlers; smoke check 12 green), the docs-count lockstep verified at
  **422/68/14** live-tense (the s222 guard green), and the neo-crm
  tech-stack lineage re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The round's finding: ZERO code findings — the ninth zero-drift verification round

The census found **zero structural deviation** on any probed
surface, every local audit dimension answered clean, and the evidence
layer (screenshot battery · boot-2 stability · VLM battery) answered
with zero surviving flags. No code was changed this round; the counts
hold at **422/68/14** (the s222 lockstep guard green).

## 3. The live re-audit: the FORTY-FIFTH census — zero structural drift

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

- **The data state: UNCHANGED from s230–s236** (the thirty-seventh
  round at this state) — the owner's 3 transactions all dated **Oct
  27, 2026** (bills −$1,200.00 · bills −$281.00 · food −$1,000.00,
  total −$2,481.00), so the November dashboard answers the EMPTY
  month (KPIs $0.00, "November 2026 Overview", "No expenses recorded
  yet", "No budgets set for this month") while Recent Transactions
  answers the ALL-TIME list (the 3 October rows) and the Spend
  Summary card answers **Week Spent $2481.00 / Week Earned $0.00**
  with the Mon–Sun band and the $0–$2600 axis (read this round by the
  card-text dump — the text-node ancestor walk — after the
  number-then-label regex form proved wrong for the card's
  label-then-number layout; the numbers themselves identical to the
  s236 reading) — the exact scoping genera our implementation
  matches (KPIs month-scoped, recent all-time, week Mon–Sun).
- **The four-page title + container census (via FULL navigations):**
  `/` → "Budget Wise" · `/transactions` → "Transactions | Budget
  Wise" · `/budgets` → "Budgets | Budget Wise" · `/profile` →
  "Profile | Budget Wise" — all matching.
- **The s207 percent-decode probes (the round's fresh probe number
  237):** `/Curl%20Probe%20237%20Test` → **"Curl Probe 237 Test |
  Budget Wise"** (decoded); `/foo%2Dbar-probe-237` → **"Foo Bar
  Probe 237 | Budget Wise"** (the %2D decode precedes the hyphen
  split); `/Hyphen-Probe-237` → **"Hyphen Probe 237 | Budget
  Wise"** — all three matching our implementation (the thirtieth
  census after the s207 fix; ours curl-verified with the REAL 404
  status).
- **The 404 BODY quotes the raw ENCODED path** on both apps
  (`Curl%20Probe%20237%20Test` verbatim in the reference's body,
  read at the probe page directly this round: `The page
  "Curl%20Probe%20237%20Test" could not be found in this
  application.`).
- **The 520 malformed-escape face held its TWENTY-EIGHTH round:**
  `/%E0%A4%A` answers the reference CDN's `520` (curl-verified) where
  ours answers the designed 404 with the never-throw raw-segment
  fallback (title `%E0%A4%A | Budget Wise`, curl-verified).
- **The SEO surfaces:** the reference sitemap carries the 4
  capitalized locs (/, /Budgets, /Profile, /Transactions — weekly,
  1.0/0.8); ours answers the documented 9-loc superset (the real
  lowercase routes our case-sensitive router serves + login +
  signup); robots.txt identical in form on both; the reference's
  manifest.json answers **302** to the platform's API path where
  ours answers **200** from the explicit route handler (the
  documented manifest genus).
- **The deeper row-anatomy probe carried for the nineteenth census:**
  the reference's first list row answers the icon tile `p-2.5
  rounded-xl bg-red-50 text-red-600` + the lucide-receipt `w-5 h-5`
  svg + the text column `flex-1 min-w-0` + the amount+delete group
  `flex items-center gap-4` > the amount block `flex items-center
  gap-2` > `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500`
  + the `SPAN.font-semibold text-lg text-rose-600` span inside the
  `flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors`
  row — ours byte-identical on every compared dimension (the N-89c6
  library-injected `aria-hidden` superset on our row svgs re-read and
  re-classified — the documented lucide-react 0.525 behavior, not
  drift).
- **The Add Transaction dialog (the visible-listbox methodology,
  s229 N-2):** the expense family reads the 8 entries (Food &
  Dining, Transport, Entertainment, Shopping, Bills & Utilities,
  Healthcare, Education, Other) and the Income tab — activated by
  REAL keyboard dispatch on the reference (Enter keydown after
  focus; the s233-refined s203 VALUE genus activation key
  re-confirmed: the tab's aria-selected flipping true and the
  submit label flipping to "Add Income") — reads the 5-entry income
  family (Salary, Freelance, Investment, Gift, Other) — both
  families byte-identical on labels AND order on both apps. **A
  methodology guard entered the canon this round:** when the
  combobox popup is opened and dismissed (Escape) BEFORE the tab
  focus, Radix's focus restoration can race the programmatic tab
  focus() — the pass-3 combined-sequence read answered the flip
  NOT taking effect while the isolated fresh-dialog read (no
  combobox step before the tab focus) answered the flip perfectly
  on BOTH apps; the fresh-dialog form is the reliable probe (the
  s236 pass-4 canon standing).
- **The Set Budget dialog (from the Budgets page):** title "Set
  Budget" · combobox default "Select category" · the Monthly Limit
  number input with the `0.00` placeholder · submit "Set Budget" —
  matching on both apps.
- **The mobile axis (390×844):** the bottom tab bar byte-identical
  on every compared dimension — the `md:hidden fixed bottom-0
  left-0 right-0 z-50 bg-white border-t border-slate-200
  safe-area-pb` container (rect 390×77, y 767, bottom 844), the
  `flex items-center justify-around py-2` row with 4 anchors, the
  four hrefs (/Dashboard, /Transactions, /Budgets, /Profile), the
  active `text-slate-900` ink on the anchor AND its svg with the
  inactive `text-slate-400`, and NO aria-current on the reference
  (ours the documented a11y superset: the NAV landmark labelled
  "Main navigation" + `aria-current="page"` on the active anchor —
  the reference's bar a bare DIV).
- **The scroll-end clearance (the main-content walk form):** both
  apps answer the IDENTICAL numbers — the deepest main content
  element at bottom **764** against the bar top **767** (gap 3,
  clears on both) — the `pb-20 md:pb-0` contract holding with the
  same arithmetic on both apps this round.
- **The logged-out root redirect (both stores cleared):** the
  reference lands on `/login?from_url=<abs-encoded>` — the same
  wall form our GuestLoginRedirect produces (e2e-pinned; our
  app-page wall verified live this round at the same from_url form;
  our `/` serves the PUBLIC landing — the D-142a parity event,
  pinned by the green auth.spec.ts:38 test).

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

- The dev server booted on a fresh `.next` (removed pre-boot; no
  reload loops) with the demo db re-seeded IN PLACE to the current
  month (November) per the standard posture — the with-data forms
  ($4,424.55 / $5,000.00 / $575.45 / 4 txns + the "88.5% saved"
  badge, donut legend Bills & Utilities / Other / Transport, Week
  Spent $0.00 / Week Earned $5,000.00 — the Nov 1 salary inside the
  Mon–Sun week, the same scoping genus as the reference's Oct 27
  reading) answering the documented data-borne divergence against
  the reference's empty November.
- The local probes each matched the reference's genera: the
  four-page titles (Budget Wise / Transactions / Budgets / Profile);
  the s207 probes (the decoded titles + the real 404 status + the
  raw-encoded body quote + the %2D order + the designed 404
  raw-segment fallback against the reference's CDN 520); the SEO
  surfaces (the 9-loc superset + robots + the 200 manifest); the row
  anatomy byte-identical incl. the N-89c6 superset read; both
  dialogs' families (the income family flipping on the Enter
  keydown on ours too — the s233 activation key working on both
  apps); the Spend Summary card structure byte-matching the
  reference's form; the mobile bar byte-identical + the superset;
  the clearance identical (764 ≤ 767, gap 3 — the same numbers as
  the reference this round).
- **The s230 F-1 fix re-verified LIVE this round:** a fresh throwaway
  signup (`throwaway237-*@test.local` through the in-app OTP funnel:
  signup → the 6-digit code delivered in-app (read from the page) →
  the six per-digit inputs filled (the native value-setter dispatch
  — the probe script corrected this round: the React setter is the
  descriptor's `.set`, not `.setter`) → verify → login) answered an
  empty dashboard, and the browser-read form rendered the exact
  reference structure — the `text-slate-400` P ("No expenses
  recorded yet") directly inside the content div carrying `p-6 pt-0
  flex items-center justify-center h-64` (no svg sibling) — with the
  sibling Budget Progress empty ("No budgets set for this month")
  and Recent Transactions empty ("No transactions yet") intact, the
  dashboard API confirming the empty aggregate (balance 0 · income
  0 · expenses 0 · transactionCount 0 · spendingByCategory [] ·
  overallBudget null · month "November 2026"), and the with-data
  form re-verified intact the same session (balance $4,424.55 · the
  88.5% saved badge · the 341×280 donut svg). The fix holds.

### 3.3 The evidence layer

- **THE SCREENSHOT BATTERY (12 canonical frames, all capture
  disciplines applied — the s219 viewport pins, the s221 25s
  fresh-login settle + donut settle, the s222 default state, the
  s223 origin surfaces, the s232 capture-origin canon for the dialog
  frames, the s227 capture-identity, the s227 capture-order
  discipline):** **12/12 GENUS-STABLE — 10/12 byte-identical to the
  HEAD evidence set + BOTH avatar-jitter genus frames at their
  documented ALTERNATE realizations** (add-transaction-dialog
  `ec722e4e` · budgets-desktop `90f05175` · budgets-mobile
  `26f59eab` · dashboard-desktop `028e0862` · dashboard-mobile
  `c264fdfb` · landing-desktop `8ade5170` · login-desktop `e504ff9f`
  · set-budget-dialog `10ad7822` · transactions-desktop `05b594f2` ·
  transactions-mobile `912e5aa0` — all ten byte-identical; profile-
  desktop answering `3d5173c8` and profile-mobile answering
  `8c6e81e7`, the recorded alternates of the two genus pairs) — each
  genus frame pixel-diff classified within its recorded bound:
  desktop ONE pixel at the ≥ 16 threshold (max channel-sum 16, ZERO
  at ≥ 32) confined to the avatar bbox (357,255,504,373); mobile 3
  pixels > 16 (max 18, ZERO at ≥ 32) confined to the avatar bbox
  (84,255,234,376) — same bboxes, same bounds as the s232–s236
  recordings; no frame refreshed (the s228 genus-stable precedent).
- **THE BOOT-2 STABILITY PROOF:** the dev server stopped, `.next`
  wiped, rebooted, the battery re-captured — **11/12 canonical
  frames the SAME md5 on both boots** + one genus-family answer:
  profile-mobile answered the WITHIN-ROUND alternation (boot 1 the
  alternate `8c6e81e7` · boot 2 the HEAD `b0413d45` — byte-identical
  to HEAD on boot 2, zero diff) while profile-desktop answered the
  alternate `3d5173c8` deterministically on BOTH boots (the s233
  precedent of a both-boots alternate realization — every observed
  realization a recorded genus-pair member, the desktop pair now
  recorded answering alternates on both boots (s233), HEAD on both
  boots (s236), and within-round alternation (s234/s235)); the ten
  non-genus frames byte-identical to HEAD on BOTH boots;
  dashboard-desktop answered the HEAD md5 `028e0862` byte-identical
  on both boots with NO settle-state interlude — the FOURTH
  consecutive absent round (after the s233 reproduction),
  consistent with the timing-dependent settle-race classification.
- **THE VLM BATTERY (4 pairs, the census JSON format):** **1/4
  None** (transactions-desktop fully clean) with **zero flags
  surviving the direct-census cross-check** — the dashboard-desktop
  pair's three flags are the documented data-borne genera (the
  reference's empty-November donut vs our seeded donut+legend, the
  week-bars' different demo data, and the "88.5% saved" badge's
  data-conditional render), each disproven by this round's live
  verification (the empty form verified byte-identical live on the
  throwaway signup; the with-data genus verified on both apps); the
  budgets-desktop pair's one flag is the platform's "Edit with
  Base44" floating badge (platform chrome injected on the reference
  only — not an app surface); the transactions-mobile pair's two
  flags are the platform badge partially obscuring the reference's
  bottom bar in the frame (the direct census read all 4 anchors
  byte-identical on both apps) + a coarse spatial claim about the
  row-internal label position (disproven by the byte-identical
  row-anatomy census — the same class structure on both apps). The
  s204 coarse-signal-never-a-gate posture held.

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift
  for the thirtieth census after the s207 fix.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root;
  the seam pinned; `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place with clean config scopes
  (422/68/14, all green this round).
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats (the documented superset genera).
- The s230 F-1 fix (the donut empty state): re-verified LIVE on a
  fresh throwaway signup — byte-identical to the reference's form.
- The security sweep, the `skills/` exclusion, the capital-alias
  stubs (with the metadata re-exports), the
  `outputFileTracingExcludes` artifact-hygiene pin, the docs-count
  lockstep (the s222 guard green at 422/68/14), the neo-crm
  stack-pattern lineage.
- The reference data state: unchanged at 3 txns / −$2,481.00 (the
  thirty-seventh round) — no owner-side change to mirror.

### Issues found

**None.** Zero code findings this round — the NINTH zero-drift
verification round after sessions 227/228/231/232/233/234/235/236.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (pull at `9af6328` → six-knob `.env`
       verified with `DATABASE_URL="file:../db/custom.db"` → `db/`
       verified at the repo root → agent-browser 0.40.0 standing) —
       the standing environment confirmed intact.
2. [x] The baseline gate: 422/422 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s236 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #45 + the dual-app diff — zero
       structural drift; the s230 F-1 fix re-verified live; the data
       state unchanged (§3).
5. [x] The screenshot battery — 12/12 genus-stable (10/12
       byte-identical + both genus frames at the recorded alternate
       realizations, each pixel-diff classified within its bound); no
       refresh needed (the s228 genus-stable precedent).
6. [x] The boot-2 stability proof — 11/12 same-md5 across both boots
       + profile-mobile's within-round alternation + profile-desktop's
       deterministic both-boots alternate (every realization a
       recorded genus member).
7. [x] The VLM battery — 1/4 None, zero surviving flags after the
       direct-census cross-check.

**Phase B — the remediation**

8. [x] NONE REQUIRED — zero code findings; no code changed; the
       counts hold at 422/68/14.

**Phase C — the documentation + the ship**

9. [x] This plan (the zero-findings record + the census evidence +
       the both-alternates battery note + the two methodology guards
       — the combobox-focus race and the Spend Summary card read
       form).
10. [x] The PAD v2.47.0 revision block (the forty-fifth census —
        the zero-drift verification round).
11. [x] `budget-wiser_SKILL.md` v1.46.0 (the frontmatter bump + the
        provenance's session-237 clause + Appendix C's session-237
        row).
12. [x] `docs/session_92.md` + the worklog entry (Task ID 237).
13. [x] The post-documentation gate re-run (the ship discipline:
        lint 0/0 · typecheck 0 · 422/422 unit · build · 14/14 smoke
        · 68/68 e2e CI=1) before the atomic commit.
14. [x] The git sweep (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) + the atomic commit on main + the
        push via `docs/ssh_git_wrapper_v3.py` (the runbook: keys
        never live inside the repo; the key shredded post-push).

## 6. Risks and guards

- **No code changed this round** — the regression surface is empty
  by construction; the ship risk is documentation-only (the counts
  lockstep guarded by the s222 pin, green at 422/68/14).
- The avatar-jitter genus family carries its recorded variance
  observations across both pairs (desktop `ed954b46` ↔ `3d5173c8` ·
  mobile `b0413d45` ↔ `8c6e81e7`); this round recorded both pairs
  answering the ALTERNATE realizations on boot 1 with the mobile
  pair alternating within the round and the desktop pair holding
  the alternate across both boots — every realization a recorded
  genus member; the evidence-set comparison rule stands (same bbox +
  recorded md5 pair = genus; only a visible-threshold delta or a
  NEW bbox is drift).
- **The dialog-probe focus race (new guard this round):** when the
  category combobox popup is opened and dismissed before the Income
  tab focus, Radix's focus restoration can race the programmatic
  focus() — the combined-sequence probe may answer the flip not
  taking effect while the isolated fresh-dialog probe answers it
  perfectly on both apps. The fresh-dialog form is the canon.
- **The Spend Summary card read form:** the card's layout is
  label-then-number ("Week Spent | $2,481.00") — number-then-label
  regexes (`\$X spent`) fail against it; the card-text dump (the
  text-node ancestor walk) is the reliable read.
- The dashboard-desktop first-frame settle state (327d785a) has now
  been absent for four consecutive rounds (s234–s237) after the
  s233 reproduction — the timing-dependent settle-race
  classification stands; future rounds encountering the transient
  form should recapture before classifying (the s232 canon).
- The reference's data state has sat at 3 October txns since round
  30 (the s200 baseline break) — a future owner-side re-plant will
  surface as new data-borne divergence, not structural drift (the
  standing classification rule).
- The month-tense sensitivity (the s229/s230 lesson) — a monthly
  rollover re-dates the seeded demo month's rows; the e2e
  seededRowDate matcher is month-agnostic by design (the s229 fix),
  and the in-place re-seed posture keeps the dev db in the current
  month.

## 7. Execution addendum

- The census executed per §3 on 2026-11-01: the reference leg (the
  owner login, the desktop probes via full navigations, the mobile
  axis, the s207/520 probes, the SEO curl set), the local leg (the
  N-1 dev boot, the in-place re-seed, the full probe mirror, the
  throwaway-signup empty-state verification), the evidence layer
  (the 12-frame battery + the boot-2 proof + the 4-pair VLM
  battery).
- Zero code findings → zero code changes → the counts hold at
  **422/68/14** (the s222 lockstep guard green in the suite).
- The documentation set shipped: this plan, the PAD v2.47.0 (the
  revision block), `budget-wiser_SKILL.md` v1.46.0 (the frontmatter
  + the provenance's session-237 clause + Appendix C's session-237
  row), `docs/session_92.md`, and the worklog entry (Task ID 237);
  no screenshot refreshed (every frame either byte-identical or at
  a recorded genus realization — the s228 precedent).
- The full gate re-ran green after the documentation work (lint 0/0
  · typecheck 0 · **422/422 unit** · build · 14/14 smoke · 68/68
  e2e CI=1) — the ship state unchanged.
