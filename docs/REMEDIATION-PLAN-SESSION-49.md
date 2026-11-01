# Budget Wise — Session 49 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 238 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ZERO-FINDINGS verification round (the FORTY-SIXTH census — the thirty-first after the s207 percent-encoding fix, the twenty-first after the s218 arrow remediation, and the twentieth carrying the deeper row-anatomy probe as standing methodology; the TENTH zero-drift round after sessions 227/228/231/232/233/234/235/236/237)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the eleventh consecutive
  no-reset round): `git pull` fast-forwarded to `871d5ae` (the owner's
  `docs/session_93.md` transcript commit over the s237 ship `7ab5e49`),
  and the standing environment was VERIFIED rather than rebuilt: bun
  1.3.14 (the sandbox's own), the six-knob `.env` standing with
  `DATABASE_URL="file:../db/custom.db"` (the mandated contract), `db/`
  at the repo root with `custom.db` + `e2e.db` + `smoke.db`, and
  agent-browser 0.40.0 verified. The five root documents +
  `docs/session_92.md` + `docs/REMEDIATION-PLAN-SESSION-48.md` +
  `worklog.md` + `docs/session_93.md` were read and validated against
  the tree before touching anything (the db-path seam, the proxy seam,
  the capital-alias stubs with their metadata re-exports, the
  `@custom-variant hover` unwrap, the v3 palette re-pins, the
  `outputFileTracingExcludes` pin, the four config scopes carrying
  the `skills/` exclusion — each verified in place). The full baseline
  gate then ran FIRST: lint 0/0 · typecheck 0 · **422/422 unit** ·
  build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact
  documented s237 ship state, green on the first full pass, with the
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
  the literal-class discipline standing, the capital-alias `.jsx` stubs
  verified (the metadata re-exports present on
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

## 2. The round's finding: ZERO code findings — the tenth zero-drift verification round

The census found **zero structural deviation** on any probed
surface, every local audit dimension answered clean, and the evidence
layer (screenshot battery · boot-2 stability · VLM battery) answered
with zero surviving flags. No code was changed this round; the counts
hold at **422/68/14** (the s222 lockstep guard green).

## 3. The live re-audit: the FORTY-SIXTH census — zero structural drift

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

- **The data state: UNCHANGED from s230–s237** (the thirty-eighth
  round at this state) — the owner's 3 transactions all dated **Oct
  27, 2026** (bills −$1,200.00 · bills −$281.00 · food −$1,000.00,
  total −$2,481.00), so the November dashboard answers the EMPTY
  month (KPIs $0.00, "November 2026 Overview", "No expenses recorded
  yet", "No budgets set for this month") while Recent Transactions
  answers the ALL-TIME list (the 3 October rows) and the Spend
  Summary card answers **Week Spent $2481.00 / Week Earned $0.00**
  with the Mon–Sun band and the $0–$2600 axis (read by the card-text
  dump — the s237 label-then-number read form, applied directly this
  round) — the exact scoping genera our implementation matches (KPIs
  month-scoped, recent all-time, week Mon–Sun).
- **The four-page title + container census (via FULL navigations):**
  `/` → "Budget Wise" · `/transactions` → "Transactions | Budget
  Wise" · `/budgets` → "Budgets | Budget Wise" · `/profile` →
  "Profile | Budget Wise" — all matching.
- **The s207 percent-decode probes (the round's fresh probe number
  238):** `/Curl%20Probe%20238%20Test` → **"Curl Probe 238 Test |
  Budget Wise"** (decoded); `/foo%2Dbar-probe-238` → **"Foo Bar
  Probe 238 | Budget Wise"** (the %2D decode precedes the hyphen
  split); `/Hyphen-Probe-238` → **"Hyphen Probe 238 | Budget
  Wise"** — all three matching our implementation (the thirty-first
  census after the s207 fix; ours curl-verified with the REAL 404
  status).
- **The 404 BODY quotes the raw ENCODED path** on both apps — read
  at the probe page directly this round (pass 2, after the pass-1
  loop-page trap re-hit the known s237 form): `The page
  "Curl%20Probe%20238%20Test" could not be found in this
  application.`
- **The 520 malformed-escape face held its TWENTY-NINTH round:**
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
- **The deeper row-anatomy probe carried for the twentieth census:**
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
  REAL keyboard dispatch on the reference (the Enter keydown on the
  FRESH dialog; the s236/s237 canon form applied directly this
  round, the combobox-then-tab focus race never even encountered)
  — reads the 5-entry income family (Salary, Freelance, Investment,
  Gift, Other), with the tab's aria-selected flipping true and the
  submit label flipping to "Add Income" — both families
  byte-identical on labels AND order on both apps.
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
  same arithmetic on both apps this round. (The pass-1 unscrolled
  walk measured 2465 at scroll 0 — not comparable; the
  scrolled-to-end form is the canon, per the s237 pass-3 note.)
- **The logged-out root redirect (both stores cleared):** the
  reference lands on `/login?from_url=<abs-encoded>` — the same
  wall form our GuestLoginRedirect produces (e2e-pinned); our `/`
  serves the PUBLIC landing — the D-142a parity event, pinned by
  the green auth.spec.ts:38 test.

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
  keydown on ours too); the Spend Summary card structure
  byte-matching the reference's form; the mobile bar byte-identical
  + the superset; the clearance identical (764 ≤ 767, gap 3 — the
  same numbers as the reference this round).
- **The s230 F-1 fix re-verified LIVE this round:** a fresh throwaway
  signup (`throwaway238-ui-*@test.local` through the in-app OTP
  funnel: signup → the 6-digit code 113394 delivered in-app (read
  from the page) → the six per-digit inputs filled (the native
  value-setter dispatch — the descriptor's `.set`) → verify → login)
  answered an empty dashboard, and the browser-read form rendered
  the exact reference structure — the `text-slate-400` P ("No
  expenses recorded yet") directly inside the content div carrying
  `p-6 pt-0 flex items-center justify-center h-64` (no svg sibling)
  — with the sibling Budget Progress empty ("No budgets set for
  this month") and Recent Transactions empty ("No transactions
  yet") intact, the dashboard API confirming the empty aggregate
  (balance 0 · income 0 · expenses 0 · transactionCount 0 ·
  spendingByCategory [] · overallBudget null · budgets [] · month
  "November 2026" · week all-zero buckets · recentTransactions []),
  and the with-data form re-verified intact the same session
  (balance $4,424.55 · the 88.5% saved badge · November 2026). The
  fix holds. **A probe-script guard persisted this round:** the
  first funnel run failed on the saved v3 script's stale `.setter`
  call (the s237 session had fixed this ad-hoc without saving it
  back — the descriptor property is `.set`); the corrected form is
  now saved in the census238 script. The API probe's own
  `txnCount` field-name bug (the actual field is `transactionCount`)
  was re-noted — a script artifact, never an app finding.

### 3.3 The evidence layer

- **THE SCREENSHOT BATTERY (12 canonical frames, all capture
  disciplines applied — the s219 viewport pins, the s221 25s
  fresh-login settle + donut settle, the s222 default state, the
  s223 origin surfaces, the s232 capture-origin canon for the dialog
  frames, the s227 capture-identity, the s227 capture-order
  discipline):** **12/12 BYTE-IDENTICAL TO HEAD — the battery's
  cleanest possible answer** (add-transaction-dialog `ec722e4e` ·
  budgets-desktop `90f05175` · budgets-mobile `26f59eab` ·
  dashboard-desktop `028e0862` · dashboard-mobile `c264fdfb` ·
  landing-desktop `8ade5170` · login-desktop `e504ff9f` ·
  profile-desktop `ed954b46` · profile-mobile `b0413d45` ·
  set-budget-dialog `10ad7822` · transactions-desktop `05b594f2` ·
  transactions-mobile `912e5aa0` — both avatar-jitter genus frames
  at the HEAD realizations, no settle-state interlude, no frame
  refreshed, no genus classification even required; the s234/s236
  precedent repeated). No frame refreshed (the s228
  genus-stable precedent subsumed — the battery answered HEAD
  outright).
- **THE BOOT-2 STABILITY PROOF:** the dev server stopped, `.next`
  wiped, rebooted, the battery re-captured — **12/12 canonical
  frames the SAME md5 on both boots — the proof's cleanest-ever
  recorded answer, the second consecutive round at 12/12** (every
  frame byte-identical to HEAD on BOTH boots; both avatar-jitter
  genus pairs — desktop `ed954b46` ↔ `3d5173c8`, mobile `b0413d45`
  ↔ `8c6e81e7` — answered the HEAD realizations on both boots, no
  within-round alternation this round: the alternation a documented
  possibility (s231/s232/s234/s235/s237), not an obligation);
  dashboard-desktop answered HEAD byte-identical on both boots with
  NO settle-state interlude — the FIFTH consecutive absent round
  after the s233 reproduction, consistent with the
  timing-dependent settle-race classification.
- **THE VLM BATTERY (4 pairs, the census JSON format):** **1/4
  None** (transactions-desktop fully clean) with **zero flags
  surviving the direct-census cross-check** — the dashboard-desktop
  pair's four flags are the documented data-borne genera (the
  reference's empty-November donut vs our seeded donut+legend, the
  week-bars' different demo data (the Sun-vs-Tue bar claim) and
  Y-axis scale, and the "88.5% saved" badge's data-conditional
  render), each disproven by this round's live verification (the
  empty form verified byte-identical live on the throwaway signup;
  the with-data genus verified on both apps); the budgets-desktop
  pair's one flag is the platform's "Edit with Base44" floating
  badge (platform chrome injected on the reference only — not an
  app surface); the transactions-mobile pair's flags are the
  platform badge partially obscuring the reference's bottom bar in
  the frame (the direct census read all 4 anchors byte-identical on
  both apps) + coarse spatial claims about row-internal date/label
  formats (disproven by the byte-identical row-anatomy census — the
  same class structure on both apps; the date-value difference is
  the known data-borne October-vs-November row content). The s204
  coarse-signal-never-a-gate posture held.

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift
  for the thirty-first census after the s207 fix.
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
  thirty-eighth round) — no owner-side change to mirror.

### Issues found

**None.** Zero code findings this round — the TENTH zero-drift
verification round after sessions
227/228/231/232/233/234/235/236/237.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (pull at `871d5ae` → six-knob `.env`
       verified with `DATABASE_URL="file:../db/custom.db"` → `db/`
       verified at the repo root → agent-browser 0.40.0 standing) —
       the standing environment confirmed intact.
2. [x] The baseline gate: 422/422 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s237 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #46 + the dual-app diff — zero
       structural drift; the s230 F-1 fix re-verified live (UI + API
       probes); the data state unchanged (§3).
5. [x] The screenshot battery — 12/12 byte-identical to HEAD (the
       battery's cleanest possible answer; no refresh needed).
6. [x] The boot-2 stability proof — 12/12 same-md5 across both boots
       (the proof's cleanest answer, the second consecutive round).
7. [x] The VLM battery — 1/4 None, zero surviving flags after the
       direct-census cross-check.

**Phase B — the remediation**

8. [x] NONE REQUIRED — zero code findings; no code changed; the
       counts hold at 422/68/14.

**Phase C — the documentation + the ship**

9. [x] This plan (the zero-findings record + the census evidence +
       the cleanest-battery note + the persisted probe-script guard
       — the s230f1 `.setter`→`.set` fix saved into the script, and
       the API probe's `transactionCount` field-name note).
10. [x] The PAD v2.48.0 revision block (the forty-sixth census —
        the zero-drift verification round).
11. [x] `budget-wiser_SKILL.md` v1.47.0 (the frontmatter bump + the
        provenance's session-238 clause + Appendix C's session-238
        row).
12. [x] `docs/session_94.md` + the worklog entry (Task ID 238).
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
  mobile `b0413d45` ↔ `8c6e81e7`); this round both pairs answered
  the HEAD realizations on BOTH boots (no alternation observed —
  the s236 form, now recorded twice consecutively); every recorded
  realization remains a genus-pair member; the evidence-set
  comparison rule stands (same bbox + recorded md5 pair = genus;
  only a visible-threshold delta or a NEW bbox is drift).
- **The 404-body probe-page trap (re-hit this round, pass 1):** the
  body-quote check must run at the `%20` probe page DIRECTLY, not on
  the last probe of the s207 loop — the loop's final page answers a
  different body. The pass-2 direct read is the canon (the s237
  pass-3 note, now twice-confirmed).
- **The scrolled-to-end clearance form:** the main-content walk must
  run AFTER `window.scrollTo(0, scrollHeight)` — the unscrolled walk
  answers viewport-relative bottoms (2465 at scroll 0 this round)
  that are not comparable across apps; the scrolled form answered
  the documented 764 ≤ 767, gap 3 on both apps.
- **The probe-script persistence guard (new this round):** ad-hoc
  probe fixes made during a session MUST be saved back into the
  script — the s237 `.setter`→`.set` fix lived only in the session,
  and the saved v3 script re-failed this round until re-corrected.
  The census238 s230f1 script now carries the fix. The API probe's
  `txnCount` field-name bug (the field is `transactionCount`)
  remains a script artifact to correct next reuse.
- The dashboard-desktop first-frame settle state (327d785a) has now
  been absent for five consecutive rounds (s234–s238) after the
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
- The documentation set shipped: this plan, the PAD v2.48.0 (the
  revision block), `budget-wiser_SKILL.md` v1.47.0 (the frontmatter
  + the provenance's session-238 clause + Appendix C's session-238
  row), `docs/session_94.md`, and the worklog entry (Task ID 238);
  no screenshot refreshed (every frame byte-identical to HEAD — the
  s234/s236 precedent).
- The full gate re-ran green after the documentation work (lint 0/0
  · typecheck 0 · **422/422 unit** · build · 14/14 smoke · 68/68
  e2e CI=1) — the ship state unchanged.
