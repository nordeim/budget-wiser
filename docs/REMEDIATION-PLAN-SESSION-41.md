# Budget Wise — Session 41 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 230 · **Branch:** `main` only · **Method:** the full census + evidence verification + the TDD remediation of the round's one code finding (the THIRTY-EIGHTH census — the twenty-third after the s207 percent-encoding fix, the thirteenth after the s218 arrow remediation, and the TWELFTH carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the third consecutive
  no-reset round): `git pull` fast-forwarded to `de26988` (the owner's
  `docs/session_78.md` transcript commit over the s229 ship `daad203`);
  the standing environment VERIFIED rather than rebuilt: bun 1.3.14 (the
  sandbox's own), `bun install --frozen-lockfile` (518 installs across
  610 packages, no changes — the lockfile honored), the six-knob `.env`
  standing with `DATABASE_URL="file:../db/custom.db"` (the mandated
  contract), `db/` at the repo root with `custom.db`, the Playwright
  Chromium headless-shell 1248 standing, and agent-browser 0.40.0
  verified.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.39.0**, `budget-wiser_SKILL.md` **v1.38.0**,
  `docs/session_77.md`, `docs/REMEDIATION-PLAN-SESSION-40.md`,
  `worklog.md`, and `docs/session_78.md` — all read and validated against
  the tree before touching anything (the db-path seam, the proxy seam,
  the capital-alias stubs with their metadata re-exports, the
  `@custom-variant hover` unwrap, the 148 color re-pins, the
  `outputFileTracingExcludes` pin, the four config scopes carrying the
  `skills/` exclusion — each verified in place).
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420
  unit** · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact
  documented s229 ship state, green on the first full pass, with the
  mobile-navigation battery additionally re-verified standalone at
  **12/12**.
- The local audit per `skills/web-application/SKILL.md` §16/§20: the
  security sweep clean (no `dangerouslySetInnerHTML`, no `eval`/`new
  Function`, no TODO/FIXME, no `any` leaks in `src/`; the three `src/`
  `console.*` hits answered as the documented sanctioned diagnostics —
  the two server-console OTP delivery lines + the dev-only AUTH_SECRET
  fallback warning), `src/middleware.ts` absent + `src/proxy.ts` in
  place (the s201 seam), `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest
  include `src|tests` only · playwright testDir `tests/e2e`), the
  literal-class discipline verified (all `className={\`...\`}` hits a
  static-constant composition over the `page-layout.ts` records), the
  capital-alias `.jsx` stubs verified (the metadata re-exports present
  on Transactions/Budgets/Profile; /Dashboard metadata-less by design),
  the `outputFileTracingExcludes` artifact-hygiene pin verified, and
  the mandated focus areas each swept clean — the **mobile navigation**
  (the 12-test e2e battery green standalone + the live byte-census on
  BOTH apps) and **TailwindCSS v4** (the `@custom-variant hover`
  unwrap at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at
  :149/:158, the v3 palette re-pin block — 148 `color-` pins, the
  `safe-area-pb` @utility at :405, no config JS, no v4-family bugs
  found). The `.env`/`db` contract verified (six knobs in both files
  with identical knob names, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`, `.env.example` tracked), the Vitest +
  Playwright suites verified in place with clean config scopes, the SEO
  surfaces verified (sitemap + robots + manifest explicit route
  handlers), the docs-count lockstep verified at **420/68/14**
  live-tense (the s222 guard green in the suite), and the neo-crm
  tech-stack lineage re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The finding

**ONE code finding (F-1, Medium — remediated with TDD) + zero
structural reference drift on the census.** The live re-audit found
zero structural deviation on any probed surface (§3); no gate movement;
no count movement (§5). The round's finding is the donut panel's
EMPTY-STATE divergence (§4 F-1) — a text-and-container drift that was
invisible for forty rounds because both apps always had current-month
data until the October→November rollover (the same boundary that
exposed the s229 F-1 e2e flake) emptied BOTH apps' November dashboards
simultaneously, exposing each app's empty-state form for the first
live comparison. The round also carries three evidence-class
observations (N-1: the reference's data state CHANGED — the owner's 3
rows re-planted on Oct 27 with a new composition, the s200 baseline
broken at the thirtieth round, and every dashboard scoping genus
re-verified against the empty form; N-2: the screenshot battery
answered 4/12 byte-identical + 8 month-tense delta frames — the
battery's own month-boundary sensitivity, the s229 F-1 class in the
evidence layer; N-3: the donut genus's no-data form — the reference
renders NO donut svg at all in its empty month).

## 3. The live re-audit: the THIRTY-EIGHTH census — zero structural drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the twenty-third census after
  the s207 percent-encoding fix, the thirteenth after the s218 arrow
  remediation, and the twelfth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the TWENTY-THIRD
  consecutive census:** the fresh `%20` probe
  (`/Curl%20Probe%20230%20Test`) answers the DECODED title
  `Curl Probe 230 Test | Budget Wise` on the reference AND on ours
  identically (ours curl-verified with the real 404 status); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-230`) answers "Hyphen Probe 230 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
  `The page "Curl%20Probe%20230%20Test"` on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  TWENTY-FIRST consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback (curl-verified, title
  `%E0%A4%A | Budget Wise`).
- **The deeper row-anatomy probe carried for the twelfth census:** the
  reference's first list row (a Bills & Utilities row this round)
  answers the icon tile `p-2.5 rounded-xl bg-red-50 text-red-600` + the
  text column `flex-1 min-w-0` + the amount+delete group `flex
  items-center gap-4` > the amount block `flex items-center gap-2` >
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` + the
  `SPAN.font-semibold text-lg text-rose-600` span inside the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row —
  ours byte-identical on both surfaces (the s218 remediation VERIFIED
  at the exact depth where the genus lived, for the twelfth consecutive
  census).
- **Every other parity surface answered byte-identical:** the body
  census (`[#root, #base44-edit-badge, #recharts_measurement_span]`,
  body WHITE), the shell (nav classes + `main.pb-20 md:pb-0` + the
  outer surface wrapper + the bare wrapper div), all four pages
  (containers 7xl/5xl/5xl/4xl, titles via FULL navigations — Dashboard
  "Budget Wise", the others "X | Budget Wise"), the mobile bottom bar
  byte-identical on every dimension (DIV tag, rect top=767 h=77, the
  row wrapper, the four anchors' classes, the ink split on the anchor
  AND its svg, the four w-6/h-6 lucide icons, NO aria-current on the
  reference; ours the same bar in a labelled NAV landmark with
  `aria-current` — the documented superset), the scroll-end clearance
  (764 ≤ 767 measured with the same all-boxes lowest-box form at
  scroll-end on BOTH apps), both dialogs (the visible `[role=listbox]`
  families read per the s229 N-2 methodology: the expense family
  `Food & Dining…Other` + the income family `Salary, Freelance,
  Investment, Gift, Other` byte-identical on labels AND order; the
  reference's Income tab KEYBOARD-activated cleanly with the submit
  label flipping to "Add Income"; ours flipping cleanly on the
  synthetic click — the documented superset posture), the Set Budget
  dialog (Category/Monthly Limit labels + the 0.00 placeholder), the
  sitemap format + robots.txt + manifest (curl-verified; the documented
  capitalized-loc divergence; manifest 302 on the reference vs our 200
  functional superset), the login card (the 4-button OAuth row), and
  the donut geometry (the with-data genus verified on OURS at the
  pinned viewport: the 200×200 `g.recharts-pie` inside the 341×280
  svg + the recharts-default-legend family; the reference's empty
  month renders NO donut svg — its no-data form, N-3). The reference's
  logged-out `/` face re-confirmed with BOTH stores cleared (the s225
  N-5 dual-store discipline): it redirects to `/login?from_url=<abs>`.
- **The data state: CHANGED — the s200 baseline broken at the
  thirtieth round (N-1).** The owner's 3 rows now all sit on
  **Oct 27, 2026** (Bills & Utilities −$1,200.00, Bills & Utilities
  −$281.00, Food & Dining −$1,000.00 — the same −$2,481.00 total, a
  new composition), so the reference's November dashboard answers its
  EMPTY form: KPIs $0.00/$0.00/$0.00/0 + the "This month" hints, the
  donut panel "No expenses recorded yet" (no svg), Budget Progress "No
  budgets set for this month", Recent Transactions the 3 October rows
  (all-time), This Week $2,481.00 spent (the Oct 26–Nov 1 week
  containing Oct 27). **Every dashboard scoping genus re-verified
  against the empty form:** the reference's KPIs are month-scoped, its
  Recent Transactions all-time, its week the Mon–Sun containing today —
  each matching OUR implementation exactly (source-verified:
  `transactionCount: monthTx.length`, the recent query unfiltered,
  `weeklyBuckets(all, now)`) — the empty-month simultaneity is what
  exposed the F-1 empty-state comparison for the first time.
- The dual-app diff ran the same census on the local dev server (the
  `rm -rf .next` N-1 posture applied before the boot; both the
  health probe and every surface clean, zero reload loops): every
  local surface matched the documented genera (the login card, the
  seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the
  "88.5% saved" badge after the standard in-place re-seed moved the
  demo month to November — the documented data-borne divergence, the
  shell with our documented body-chrome platform-face genus, the
  mobile bar byte-identical + the NAV-landmark/aria-current superset,
  the clearance identical at 764 ≤ 767, all titles + containers
  matching, the 404 surface byte-matching with the real 404 status +
  the decoded title + the encoded body + the raw-segment
  malformed-escape fallback, both dialogs matching on the visible
  listbox families, the SEO surfaces matching with the documented
  lowercase-loc divergence, the donut geometry byte-identical, the
  row inner family byte-identical on both surfaces) — EXCEPT the F-1
  empty-state surface (below), live-compared while both apps answered
  their November-empty forms.

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  seam pinned; `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place with clean config scopes.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The security sweep, the `skills/` exclusion, the capital-alias stubs
  (with the metadata re-exports), the `outputFileTracingExcludes`
  artifact-hygiene pin, the docs-count lockstep (the s222 guard green at
  420/68/14), the neo-crm stack-pattern lineage.
- The Budget Progress panel's empty state: **byte-identical on both
  apps** (`<p class="text-slate-400">` inside
  `p-6 pt-0 flex items-center justify-center h-48` + the same copy) —
  the sibling surface live-compared the same round, and the pattern our
  F-1 fix mirrors.
- The dev boots: the census boot clean (the N-1 posture applied).

### F — findings (one)

- **(F-1, Medium — visible parity divergence) The dashboard donut
  panel's EMPTY-STATE copy and container diverge from the
  reference's.** Location: `src/components/charts/budget-charts.tsx:43-48`
  (the copy) + `src/app/(app)/dashboard/dashboard-page.tsx:151-154`
  (the mount — an unconditional `PANEL.content` wrapper). Evidence
  (live-read on BOTH apps this round, both answering their
  November-empty forms): the reference's donut panel renders
  `<p class="text-slate-400">No expenses recorded yet</p>` DIRECTLY
  inside a content div that itself carries
  `p-6 pt-0 flex items-center justify-center h-64`; ours renders
  `<p class="text-slate-400">No spending this month</p>` inside an
  inner `flex h-48 items-center justify-center` wrapper inside the
  plain `p-6 pt-0` content div. THREE divergences: the copy ("No
  expenses recorded yet" vs "No spending this month"), the height
  (h-64 vs h-48), and the anatomy (the reference's empty state
  REPLACES the content wrapper — the same pattern its Budget Progress
  empty uses and ours already mirrors byte-exactly there). Impact: any
  deployment seeded in month N shows the divergent empty state in
  month N+1 — a real user surface (the fresh-install second month),
  invisible to forty rounds of censuses because both apps always had
  current-month data until the October→November rollover emptied both
  dashboards at once (the same boundary class as the s229 F-1 e2e
  flake). Confidence: Verified (live-read on both apps, both forms
  captured before remediation).
- **Remediation (TDD):** the RED pin first (a source-regex unit test
  asserting the dashboard page carries the reference's empty branch —
  the copy + the `p-6 pt-0 flex items-center justify-center h-64`
  container + the `SpendingDonut` mount only in the with-data branch —
  and the chart component no longer carries the drifted copy); the
  GREEN fix moves the empty branch INTO the dashboard page (mirroring
  the Budget Progress pattern exactly) and retires the chart
  component's internal empty branch (the component's contract becomes
  data-only; the page owns the empty form — the reference's own
  architecture). No count movement expected (the pin adds assertions
  inside the existing app-chrome spec file).

### N — informational notes (evidence and methodology, not code)

- **(N-1) The reference's data state CHANGED — the s200 baseline
  broken at the thirtieth round.** The owner's 3 rows re-planted on
  Oct 27, 2026 (Bills −$1,200, Bills −$281, Food −$1,000 — the same
  −$2,481.00 total, a new composition), the first owner-data movement
  in thirty rounds. The change put the reference's dashboard in its
  November-empty form — which re-verified every dashboard scoping
  genus against the empty form (KPIs month-scoped, recent all-time,
  week Mon–Sun — each matching our implementation, source-verified)
  and exposed the F-1 empty-state comparison for the first time.
  Data-borne, the excluded genus — our seed keeps the documented demo
  month.
- **(N-2) The screenshot battery answered 4/12 byte-identical + 8
  month-tense delta frames — the battery's own month-boundary
  sensitivity (the s229 F-1 class in the evidence layer).** The 8
  deltas (all eight date-bearing frames: dashboard ×2, budgets ×2,
  transactions ×2, both dialogs) each show the multi-column
  above-threshold spread signature of a STATE difference, not a
  rendering genus — every one traces to the month rollover: the
  "November 2026 Overview" / "November 2026 spending limits"
  subtitle bands, the row dates (Nov 26 vs Oct 26 — the weekday
  shifts too), the dialog date-input defaults (Nov 1 vs Oct 31), and
  the This-Week bucket re-dating. HEAD's evidence set carries
  October-tense captures; the remediation refreshes the eight frames
  to the November tense (the truthful current captures of the
  remediated codebase) and this note enters the canon so the next
  month boundary classifies the same deltas correctly.
- **(N-3) The donut genus's no-data form: the reference renders NO
  donut svg at all in its empty month** (the only recharts surface on
  its empty dashboard is the 341×200 weekly-bars svg) where ours
  renders the empty-state card — the F-1 fix mirrors the reference's
  empty form; the with-data genus (the 200×200 pie in the 341×280
  svg) verified on ours at the pinned viewport, the reference's
  no-data form documented for the next with-data census.
- **(N-4) The VLM battery ran post-remediation (4 pairs, the census
  JSON format)** — the flags cross-checked against the direct
  byte-census before classification (the s204 "coarse signal, never a
  gate" posture); results recorded in §7.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (pull at `de26988` → frozen-lockfile
       install check → six-knob `.env` verified with
       `DATABASE_URL="file:../db/custom.db"` → `db/` verified at the
       repo root → Chromium 1248 + agent-browser 0.40.0 standing) —
       the standing environment confirmed intact.
2. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s229 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #38 + the dual-app diff — zero
       structural drift; the data-state change recorded (N-1); the
       F-1 empty-state divergence surfaced and live-verified on both
       apps (§3, §4).
5. [x] The screenshot battery — 4/12 byte-identical + 8 month-tense
       delta frames each traced to the rollover (N-2); the refresh
       executed post-fix (Phase C, 8 frames) with the boot-2 proof.
6. [x] The VLM battery (post-remediation, 4 pairs) — **3/4 None, its
       cleanest result ever**; the dashboard pair's two flags both the
       documented data-borne genera (the empty-month vs seeded-month
       donut state + the savings-badge conditional), disproven by the
       direct DOM census on the same surface — zero flags surviving the
       cross-check (§7).

**Phase B — the round's finding (one: the donut empty-state divergence)**

7. [x] F-1 remediated with TDD: the RED pin demonstrated live (the
       two new app-chrome assertions failing on the current source —
       emptyIdx −1, the drifted copy present); the GREEN fix mirrors
       the Budget Progress pattern (the empty branch in the page, the
       `p-6 pt-0 flex items-center justify-center h-64` container, the
       "No expenses recorded yet" copy, the chart component
       data-only); the pin green 36/36; **the fix VERIFIED LIVE** (a
       throwaway signup's empty dashboard rendering the exact
       reference form — copy, container, tag — read in the browser);
       the with-data form re-verified intact (the 341×280 donut + the
       legend family + the seeded KPIs); **the unit count moved 420 →
       422** (two new tests in the app-chrome spec file — the canonical
       constant + all four root documents' live-tense surfaces updated
       in the same change set; the s222 lockstep guard re-verified
       green at 422/68/14).

**Phase C — the evidence refresh + the documentation set + the ship**

8. [x] The eight month-tense frames refreshed (post-fix captures,
        the November tense) + the boot-2 stability proof: **ALL EIGHT
        answered the SAME md5 on both boots** (`ec722e4e`, `90f05175`,
        `26f59eab`, `028e0862`, `c264fdfb`, `10ad7822`, `05b594f2`,
        `912e5aa0` × 2 each) — the tense-stable determinism proof; the
        post-fix battery answered the EXACT same md5s as the pre-fix
        battery (the fix touches no captured frame — no frame captures
        the empty state).
9. [x] The docs-count lockstep updated and verified at **422/68/14**
        live-tense across README/CLAUDE/PAD/SKILL (the canonical
        constant + every live-tense surface updated in the same change
        set; the guard green in the suite); AGENTS.md verified
        count-free.
10. [x] `budget-wiser_SKILL.md` → v1.39.0: the frontmatter version
        bump + the provenance gains the session-230 clause + Appendix
        C gains the session-230 row.
11. [x] The PAD → v2.40.0: the revision block records the
        thirty-eighth census — the F-1 empty-state remediation
        verified live, the count move to 422, the data-state change
        (N-1), the battery's month-tense genus (N-2), the donut
        no-data form (N-3), the cleanest VLM battery (N-4), and the
        display-pipeline note (N-5).
12. [x] `docs/session_79.md` (this round's log — Task ID 230) + the
        `worklog.md` entry (Task ID 230, appended, never overwritten)
        + this plan ticked with the addendum.
13. [x] The dev server STOPPED + the browser CLOSED before the
        documentation phase; the full gate re-ran green
        post-remediation (lint 0/0 · typecheck 0 · **422/422 unit** ·
        build · 14/14 smoke · 68/68 e2e, CI=1) — the ship state at the
        moved counts.
14. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) → commit (atomic, Conventional
        Commit, the message explains why) → push `HEAD:refs/heads/main`
        via `docs/ssh_git_wrapper_v3.py` (the runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
        `--remote` explicitly, the default remote is the OLD repo);
        verify the remote ref; shred the key.

## 6. Risks and guards

- **The unit count moved 420 → 422** (the F-1 pins): the canonical
  constant in `tests/docs-counts.test.ts` + every live-tense surface
  in README/CLAUDE/PAD/SKILL updated in the same change set — the s222
  lockstep guard re-verified green at **422/68/14**; historical rows
  keep their era's numbers.
- **The month-tense genus (N-2) enters the canon:** the battery's
  date-bearing frames delta at EVERY month boundary by design — the
  next round classifies the multi-column above-threshold deltas by
  their tense-tracing signature FIRST (the month label band + the row
  dates + the dialog defaults), the genus md5s second, and refreshes
  the frames when the tense moved (the truthful-capture rule).
- **The F-1 fix touches the donut's with-data path only at the
  mount level** (the empty branch moves to the page; the with-data
  render is unchanged) — the with-data genus md5s stay comparable
  across the refresh.
- **The capture-identity discipline (s227 N-5) stays load-bearing**
  on every capture; the settle-wait + capture-order + viewport-re-pin
  + cursor-neutral + default-state + origin-surface disciplines stay
  load-bearing on every frame.
- **The reference's dual-store session (s225 N-5):** logged-out-surface
  probes on the reference clear cookies AND localStorage.
- **The dev server is stopped before any build** (the documented rule;
  the s216 N-1 `rm -rf .next` posture applied before every census
  boot).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` —
  unchanged.
- No secrets in the tree; the SSH key lives outside the repo and is
  shredded after the push.

## 7. Execution addendum

- The intact-workspace intake: `git pull` at `de26988` (the owner's
  transcript commit over the s229 ship), `bun install
  --frozen-lockfile` verified the standing 518-install tree (no
  changes), the six-knob `.env` + `db/custom.db` + Chromium 1248 all
  standing; the gate green on the first full pass at the s229 counts
  (420/68/14) — the environment-verification path verified end-to-end
  for the third consecutive round.
- **The F-1 timeline:** the census logged into the reference and found
  its November dashboard EMPTY (the owner data re-planted on Oct 27 —
  N-1); our dev db answered the SAME empty form (the demo month seeded
  Oct 31 = October), giving the first simultaneous empty-month
  comparison — the donut panel's empty states read live on both apps,
  the divergence confirmed (copy + h-64 + anatomy), the sibling Budget
  Progress empty read byte-identical on both apps the same hour (the
  fix's template); the RED pin written and demonstrated failing; the
  GREEN fix applied; the pin green 36/36; **the fix verified live** —
  a throwaway signup (signup → verify → login, via python urllib to
  avoid the shell-`!` quoting artifact that ate the first probe's
  password) whose empty dashboard rendered the reference's exact form,
  read in the browser; the with-data form re-verified intact after the
  standard in-place re-seed moved the demo month to November.
- **The count move:** the full suite answered 422/422 (the two new
  pins) — the canonical constant + the four root documents'
  live-tense surfaces updated in the same change set; the s222
  lockstep guard green at 422/68/14.
- **The battery:** the pre-fix battery answered 4/12 byte-identical +
  8 month-tense deltas (each traced to the rollover — the subtitle
  bands, the row dates, the dialog defaults, the week buckets); the
  post-fix battery answered the EXACT same md5s (the fix touches no
  captured frame); the eight frames refreshed; the boot-2 proof
  (fresh `rm -rf .next` + reboot + re-capture) answered all eight the
  SAME md5 on both boots — the tense-stable determinism proof.
- **The VLM battery ran post-remediation:** 3/4 None (the cleanest
  ever); the dashboard pair's two flags both the documented
  data-borne genera, disproven by the direct DOM census on the same
  surface; zero flags surviving the cross-check.
- **The N-5 display-pipeline note:** the round's own first read of
  the WeeklyBars Tooltip formatter appeared corrupted (`oney(` + a
  stray `]`); tsc's 0 diagnostics and the AST dump contradicted the
  text views; the hex dump proved the bytes correct (the recharts
  tuple form) — the tool-output display pipeline strips the `[m`
  sequence. No code change; the methodology note enters the canon
  (hex-dump before classifying apparent corruption a parser accepts).
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **422/422 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the moved counts.
- The documentation set shipped: this plan (ticked + this addendum),
  the PAD v2.40.0 (the revision block), `budget-wiser_SKILL.md`
  v1.39.0 (the frontmatter + the provenance's session-230 clause +
  Appendix C's session-230 row), `docs/session_79.md`, and the
  worklog entry (Task ID 230); the counts verified live-tense at
  **422/68/14**.
