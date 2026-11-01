# Budget Wise — Session 42 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 231 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ZERO-FINDINGS verification round (the THIRTY-NINTH census — the twenty-fourth after the s207 percent-encoding fix, the fourteenth after the s218 arrow remediation, and the thirteenth carrying the deeper row-anatomy probe as standing methodology; the third zero-drift round after sessions 227/228)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the fourth consecutive
  no-reset round): `git pull` fast-forwarded to `14a58e0` (the
  owner's `docs/session_80.md` transcript commit over the s230 ship
  `2c32436`); the standing environment VERIFIED rather than rebuilt:
  bun 1.3.14 (the sandbox's own), `bun install --frozen-lockfile`
  (518 installs across 610 packages, no changes — the lockfile
  honored), the six-knob `.env` standing with
  `DATABASE_URL="file:../db/custom.db"` (the mandated contract),
  `db/` at the repo root with `custom.db`, the Playwright Chromium
  headless-shell 1248 standing, and agent-browser 0.40.0 verified.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.40.0**, `budget-wiser_SKILL.md` **v1.39.0**,
  `docs/session_79.md`, `docs/REMEDIATION-PLAN-SESSION-41.md`,
  `worklog.md`, and `docs/session_80.md` — all read and validated
  against the tree before touching anything (the db-path seam, the
  proxy seam, the capital-alias stubs with their metadata re-exports,
  the `@custom-variant hover` unwrap, the 148 color re-pins, the
  `outputFileTracingExcludes` pin, the four config scopes carrying
  the `skills/` exclusion — each verified in place).
- The baseline gate ran FIRST and green on the first full pass:
  lint 0/0 · typecheck 0 · **422/422 unit** (the s230 counts) ·
  build · **14/14 smoke** · **68/68 e2e (CI=1)** — with the
  mobile-navigation battery additionally re-verified standalone at
  **12/12**.
- The local audit followed `skills/web-application/SKILL.md`'s
  §16/§20 dimensions: the security sweep clean (no
  dangerouslySetInnerHTML, no eval/new Function, no TODO/FIXME, no
  `any` leaks in `src/`; the three `src/` `console.*` hits answered
  as the documented sanctioned diagnostics — the two server-console
  OTP delivery lines + the dev-only AUTH_SECRET fallback warning),
  `src/middleware.ts` absent + `src/proxy.ts` in place (the s201
  seam), `skills/` confirmed excluded from all four check/test/compile
  scopes (tsc exclude · eslint ignores · vitest include `src|tests`
  only · playwright testDir `tests/e2e`), the literal-class
  discipline verified (all template `className` hits are
  static-constant compositions over the `page-layout.ts` records),
  the capital-alias `.jsx` stubs verified (the metadata re-exports
  present on Transactions/Budgets/Profile; /Dashboard metadata-less
  by design), the `outputFileTracingExcludes` artifact-hygiene pin
  verified, and the mandated focus areas each swept clean — the
  **mobile navigation** (the 12-test e2e battery green standalone +
  the live byte-census on BOTH apps) and **TailwindCSS v4** (the
  `@custom-variant hover` unwrap at globals.css:20, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block —
  148 `color-` pins, the `safe-area-pb` @utility, no config JS, no
  v4-family bugs found). The `.env`/`db` contract verified (six knobs
  in both files with identical knob names, `db/` at the repo root,
  the seam pinned by `tests/db-path.test.ts`, `.env.example`
  tracked), the Vitest + Playwright suites verified in place with
  clean config scopes, the SEO surfaces verified (sitemap + robots +
  manifest explicit route handlers; smoke check 12 green), the
  docs-count lockstep verified at **422/68/14** live-tense, and the
  neo-crm tech-stack lineage re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The round's finding: ZERO code findings — a zero-drift verification round

The census found **zero structural deviation** on any probed
surface, every local audit dimension answered clean, and the
evidence layer (screenshot battery · boot-2 stability · VLM battery)
answered with zero surviving flags. No code was changed this round;
the counts hold at **422/68/14** (the s222 lockstep guard green).

## 3. The live re-audit: the THIRTY-NINTH census — zero structural drift

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

- **The data state: UNCHANGED from s230** (the thirty-first round
  at this state) — the owner's 3 transactions all dated **Oct 27,
  2026** (Bills & Utilities −$1,200.00 · Bills & Utilities −$281.00 ·
  Food & Dining −$1,000.00, total −$2,481.00), so the November
  dashboard answers the EMPTY month (KPIs $0.00 / 0 txns, "This
  month" scope) while Recent Transactions answers the ALL-TIME list
  (the 3 October rows) — the exact scoping genera our implementation
  matches (KPIs month-scoped, recent all-time, week Mon–Sun; each
  re-verified source-side this round).
- The login card: the four-button OAuth row (Google, Microsoft,
  Facebook, Apple) + the OR divider + the email/password form —
  matching.
- The four-page title + container census:
  `/Dashboard` → "Budget Wise" (metadata-less by design) +
  `max-w-7xl`; `/Transactions` → "Transactions | Budget Wise" +
  `max-w-5xl`; `/Budgets` → "Budgets | Budget Wise" + `max-w-5xl`;
  `/Profile` → "Profile | Budget Wise" + `max-w-4xl` — all matching.
- **The s207 percent-decode probes (the round's fresh probe number
  231):** `/Curl%20Probe%20231%20Test` → **"Curl Probe 231 Test |
  Budget Wise"** (decoded); `/foo%2Dbar-probe-231` → **"Foo Bar
  Probe 231 | Budget Wise"** (the %2D decode precedes the hyphen
  split); `/Hyphen-Probe-231` → **"Hyphen Probe 231 | Budget Wise"**
  — all three matching our implementation (the twenty-fourth census
  after the s207 fix).
- **The 404 BODY quotes the raw ENCODED path** on both apps
  (`Curl%20Probe%20231%20Test` verbatim in the reference's body,
  curl-verified on ours with the real 404 status).
- **The 520 malformed-escape face held its TWENTY-SECOND round:**
  `/%E0%A4%A` answers the reference CDN's `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback (title `%E0%A4%A | Budget Wise`).
- **The SEO surfaces:** the reference sitemap carries the 4
  capitalized locs (/, /Budgets, /Profile, /Transactions — weekly,
  1.0/0.8); ours answers the documented 9-loc superset (the
  capitalized locs + the lowercase canonicals + login + signup — the
  documented capitalized-loc divergence); robots.txt identical in
  form on both; the reference's manifest.json answers **302** to the
  platform's API path where ours answers **200** from the explicit
  route handler (the documented manifest genus).
- **The deeper row-anatomy probe carried for the thirteenth census:**
  the reference's first list row answers the icon tile `p-2.5
  rounded-xl bg-red-50 text-red-600` + the lucide-receipt `w-5 h-5`
  svg + the text column `flex-1 min-w-0` with the `font-medium
  text-slate-900 truncate` P + the category badge + the
  `text-sm text-slate-500` date P + the amount+delete group `flex
  items-center gap-4` > the amount block `flex items-center gap-2` >
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` + the
  `SPAN.font-semibold text-lg text-rose-600` span inside the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row —
  ours byte-identical on every compared dimension (the s218
  remediation VERIFIED at the exact depth for the thirteenth
  consecutive census). The one attribute delta — our row svgs carry
  `aria-hidden="true"` where the reference's render bare — is the
  documented N-89c6 library-injected superset (lucide-react 0.525
  injects it on every icon lacking an a11y prop; the reference's
  older lucide does not), an a11y improvement, family-wide,
  LIVE-verified at session 89 and re-read this round.
- **The Add Transaction dialog (the visible-listbox methodology,
  s229 N-2):** the expense family reads the 8 entries (Food &
  Dining, Transport, Entertainment, Shopping, Bills & Utilities,
  Healthcare, Education, Other) and the Income tab — activated by
  REAL keydown dispatch on the reference (the s203 VALUE genus: the
  reference's older tab implementation ignores the synthetic click,
  ours flips on either) — reads the 5-entry income family (Salary,
  Freelance, Investment, Gift, Other) with the submit label flipping
  to "Add Income" — both families byte-identical on labels AND order
  on both apps.
- **The Set Budget dialog (from the Budgets page):** title "Set
  Budget" · fields Category + Monthly Limit · combobox default
  "Select category" · submit "Set Budget" · the category listbox
  carrying the same 8-entry expense family — matching on both apps.
- **The donut panel:** the reference's empty-November form reads
  `<p>No expenses recorded yet</p>` directly inside the content div
  carrying `p-6 pt-0 flex items-center justify-center h-64` — the
  exact form our s230 F-1 fix mirrors (re-verified LIVE on our side
  this round, §3.2).
- **The mobile axis (390×844):** the bottom tab bar byte-identical
  on every compared dimension — the `md:hidden fixed bottom-0
  left-0 right-0 z-50 bg-white border-t border-slate-200
  safe-area-pb` container (rect 390/77, bottom 844), the `flex
  items-center justify-around py-2` row with 4 anchors, the four
  hrefs (/Dashboard, /Transactions, /Budgets, /Profile), the active
  `text-slate-900` ink on the anchor AND its svg with the inactive
  `text-slate-400`, and NO aria-current on the reference (ours the
  documented a11y superset: the NAV landmark labelled "Main
  navigation" + `aria-current="page"` on the active anchor).
- **The scroll-end clearance:** both apps' deepest last content
  element answers bottom 676 against the bar top 767 — the
  clearance 676 ≤ 767 (gap 91px, IDENTICAL on both apps this round)
  with the `pb-20 md:pb-0` contract holding.
- **The logged-out root redirect (both stores cleared, s225 N-5):**
  the reference lands on `/login?from_url=<abs-encoded>` — matching
  our GuestLoginRedirect implementation (e2e-pinned).

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

- The dev server booted on a fresh `.next` (removed pre-boot; no
  reload loops), the demo db re-seeded IN PLACE to the current month
  (November) per the standard posture — the with-data forms
  ($4,424.55 / $5,000.00 / $575.45 / 4 txns + the 88.5% saved badge)
  answering the documented data-borne divergence against the
  reference's empty November (the same class as s230).
- The local probes each matched the reference's genera: the
  four-page titles + containers; the s207 probes (decoded titles +
  the real 404 status + the raw-encoded body quote + the %2D order +
  the designed 404 raw-segment fallback against the reference's CDN
  520); the SEO surfaces (the 9-loc superset + robots + the 200
  manifest); the row anatomy (byte-identical incl. the N-89c6
  superset read); both dialogs' families (the income family flipping
  on the synthetic click — the documented superset posture); the
  donut with-data genus (the 341×280 svg carrying the ~200×200 pie,
  3 sectors, the legend family); the mobile bar byte-identical +
  the superset; the clearance identical (676 ≤ 767, gap 91).
- **The s230 F-1 fix re-verified LIVE this round:** a fresh
  throwaway signup (the in-app OTP funnel: signup → verify → login)
  answered `spendingByCategory: []`, and the browser-read empty
  dashboard rendered the exact reference form —
  `<p>No expenses recorded yet</p>` inside the content div carrying
  `p-6 pt-0 flex items-center justify-center h-64` — with the
  sibling Budget Progress empty ("No budgets set for this month" in
  the h-48 form) intact. The fix holds; the with-data form
  re-verified intact the same session.

### 3.3 The evidence layer

- **THE SCREENSHOT BATTERY (12 canonical frames, all capture
  disciplines applied — the s219 viewport re-pin, the s221
  cursor-neutral + donut settle + the 25s fresh-login settle, the
  s222 default state, the s223 origin surfaces, the s227
  capture-identity, the capture-order):** **11/12 byte-identical to
  the HEAD evidence set** (add-transaction-dialog ec722e4e ·
  budgets-desktop 90f05175 · budgets-mobile 26f59eab ·
  dashboard-desktop 028e0862 · dashboard-mobile c264fdfb ·
  landing-desktop 8ade5170 · login-desktop e504ff9f · profile-mobile
  b0413d45 · set-budget-dialog 10ad7822 · transactions-desktop
  05b594f2 · transactions-mobile 912e5aa0) + **profile-desktop
  answering its documented avatar-jitter genus** (3d5173c8 this
  round on BOTH boots — the other deterministic realization of the
  genus; HEAD carries ed954b46, the s230 realization; the pixel-diff
  against HEAD: bbox (357,255,505,374) = the avatar region, ZERO
  pixels at the visible threshold ≥ 8 — the s227 signature law: the
  md5 is a realization of the variance, the visible content is
  byte-stable). No frame refreshed — every delta is a documented
  genus realization (the s228 precedent for genus-stable frames).
- **THE BOOT-2 STABILITY PROOF:** the dev server stopped, `.next`
  wiped, rebooted, the battery re-captured — **12/13 frames the
  SAME md5 on both boots** (the twelve canonical frames above + the
  bonus not-found-mobile probe frame d4dc6079 × 2) with
  **profile-mobile answering its FIRST RECORDED both-boots genus
  alternation** (boot 1 b0413d45 == HEAD · boot 2 8c6e81e7 — the
  pixel-diff: bbox (84,255,235,377) = the avatar region on mobile,
  ZERO pixels at thresholds ≥ 8 and ≥ 16) — the avatar-jitter genus
  extending to the mobile frame, both realizations deterministic
  within their boot.
- **THE VLM BATTERY (4 pairs, the census JSON format, glm-4.6v):**
  **2/4 None** (transactions-desktop and budgets-desktop fully
  clean) with **zero flags surviving the direct-census
  cross-check** — the dashboard-desktop pair's two "structural"
  flags are the documented data-borne genera (the reference's
  empty-November donut placeholder vs our seeded donut+legend, and
  the "88.5% saved" badge's data-conditional render), each disproven
  by this round's direct DOM census (the empty form verified
  byte-identical live on the throwaway signup; the with-data genus
  verified on both apps); the transactions-mobile pair's two flags
  are the platform FAB covering the reference's bar items 3-4 in the
  frame (the platform-chrome genus — the direct census read all 4
  anchors byte-identical) and the data-borne row-label truncation
  (our seeded "Electricity bill" description vs the reference's
  "bills" — the row anatomy byte-identical). The s204
  coarse-signal-never-a-gate posture held.

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift
  for the twenty-fourth census after the s207 fix.
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
  thirty-first round) — no owner-side change to mirror.

### Issues found

**None.** Zero code findings this round — the third zero-drift
verification round after sessions 227/228.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (pull at `14a58e0` → frozen-lockfile
       install check → six-knob `.env` verified with
       `DATABASE_URL="file:../db/custom.db"` → `db/` verified at the
       repo root → Chromium 1248 + agent-browser 0.40.0 standing) —
       the standing environment confirmed intact.
2. [x] The baseline gate: 422/422 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s230 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #39 + the dual-app diff — zero
       structural drift; the s230 F-1 fix re-verified live; the data
       state unchanged (§3).
5. [x] The screenshot battery — 11/12 byte-identical + the
       profile-desktop avatar-jitter genus realization (zero
       visible-threshold pixels); no refresh needed (the s228
       genus-stable precedent).
6. [x] The boot-2 stability proof — 12/13 same-md5 + the
       profile-mobile first recorded both-boots genus alternation
       (zero visible-threshold pixels).
7. [x] The VLM battery — 2/4 None, zero surviving flags after the
       direct-census cross-check.

**Phase B — the remediation**

8. [x] NONE REQUIRED — zero code findings; no code changed; the
       counts hold at 422/68/14.

**Phase C — the documentation + the ship**

9. [x] This plan (the zero-findings record + the census evidence).
10. [x] The PAD v2.41.0 revision block (the thirty-ninth census —
        the zero-drift verification round; the profile-mobile genus
        extension).
11. [x] `budget-wiser_SKILL.md` v1.40.0 (the frontmatter bump + the
        provenance's session-231 clause + Appendix C's session-231
        row).
12. [x] `docs/session_81.md` + the worklog entry (Task ID 231).
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
- The avatar-jitter genus now has BOTH frame forms recorded across
  boots (desktop ed954b46 ↔ 3d5173c8 · mobile b0413d45 ↔ 8c6e81e7,
  each realization boot-deterministic) — the evidence-set comparison
  rule for future rounds: a genus frame's md5 may alternate between
  its recorded realizations with ZERO visible-threshold pixels; only
  a visible-threshold delta or a NEW bbox is drift.
- The reference's data state has sat at 3 October txns since round
  30 (the s200 baseline break) — a future owner-side re-plant will
  surface as new data-borne divergence, not structural drift (the
  standing classification rule).
- The month-tense sensitivity (the s229/s230 lesson) — the December
  rollover will re-date the seeded demo month's rows; the
  e2e seededRowDate matcher is month-agnostic by design (the s229
  fix), and the in-place re-seed posture keeps the dev db in the
  current month.

## 7. Execution addendum

- The census executed per §3 on 2026-11-01: the reference leg (the
  owner login, the desktop probes, the mobile axis, the s207/520
  probes, the SEO curl set), the local leg (the N-1 dev boot, the
  in-place re-seed, the full probe mirror, the throwaway-signup
  empty-state verification), the evidence layer (the 12-frame
  battery + the boot-2 proof + the 4-pair VLM battery).
- Zero code findings → zero code changes → the counts hold at
  **422/68/14** (the s222 lockstep guard green in the suite).
- The documentation set shipped: this plan, the PAD v2.41.0 (the
  revision block), `budget-wiser_SKILL.md` v1.40.0 (the frontmatter
  + the provenance's session-231 clause + Appendix C's session-231
  row), `docs/session_81.md`, and the worklog entry (Task ID 231);
  no screenshot refreshed (every frame byte-identical or at its
  documented genus realization — the s228 precedent).
- The full gate re-ran green after the documentation work (lint 0/0
  · typecheck 0 · **422/422 unit** · build · 14/14 smoke · 68/68
  e2e CI=1) — the ship state unchanged.
