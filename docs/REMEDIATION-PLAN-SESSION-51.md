# Budget Wise — Session 51 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 240 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ZERO-FINDINGS verification round (the FORTY-EIGHTH census — the thirty-third after the s207 percent-decode fix, the twenty-third after the s218 arrow remediation, and the twenty-second carrying the deeper row-anatomy probe as standing methodology; the ELEVENTH zero-drift round after sessions 227/228/231/232/233/234/235/236/237/238), plus the round that live-verified the F-239a member-since pin on BOTH apps through its first post-fix intact round.

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the first round after the twelfth
  reset) — `git pull` fast-forwarded to `214c250` (the owner's
  `docs/session_97.md` transcript commit over the s239 ship `0aa1473`).
  The five root documents + `docs/session_96.md` +
  `docs/REMEDIATION-PLAN-SESSION-50.md` + `worklog.md` +
  `docs/session_97.md` were read and validated against the tree before
  touching anything (the proxy seam, the middleware absence, the
  capital-alias `.jsx` stubs with their metadata re-exports, the db-path
  seam, the `@custom-variant hover` unwrap, the v3 palette re-pins, the
  `--shadow-sm`/`--blur-sm` re-pins, the `safe-area-pb` @utility, the
  `outputFileTracingExcludes` pin, the four config scopes carrying the
  `skills/` exclusion, the SEO explicit route handlers, and — new this
  round's regression surface — the F-239a pin: `src/lib/demo-fixture.ts`
  exporting `DEMO_MEMBER_SINCE` (2026-10-15T00:00:00.000Z), the seed's
  four `createdAt` pins (both user upserts × create + update), the three
  demo-fixture test pins, and the docs-count constant at 425/68/14).
  The standing environment was VERIFIED rather than rebuilt (bun 1.3.14,
  the six-knob `.env` with `DATABASE_URL="file:../db/custom.db"`, `db/`
  at the repo root, agent-browser 0.40.0); the standing rows confirmed
  both users pinned at 2026-10-15 and the in-place re-seed exercised
  green (the update-path pin — a drifted standing db re-dates back to
  the fixture). The full baseline gate then ran FIRST: lint 0/0 ·
  typecheck 0 · **425/425 unit** · build · **14/14 smoke** · **68/68
  e2e (CI=1)** — the exact documented s239 ship state, green on the
  first full pass, plus the mobile-navigation battery **12/12**
  standalone.
- The local audit (§16/§20 of skills/web-application/SKILL.md): every
  dimension clean — the security sweep (no
  dangerouslySetInnerHTML/eval/new Function/TODO/FIXME/`any` leaks; the
  three `console.*` hits the documented sanctioned diagnostics — the
  auth warn + the two in-app OTP delivery info logs), `src/middleware.ts`
  absent + `src/proxy.ts` in place, `skills/` excluded from all four
  scopes (eslint + tsconfig explicit; vitest's include and playwright's
  testDir by-construction), the literal-class discipline, the
  capital-alias stubs with metadata re-exports, the
  `outputFileTracingExcludes` pin, the Tailwind v4 blocks (the hover
  unwrap, the v3 palette re-pins, the shadow/blur re-pins, safe-area-pb,
  no config JS), the `.env`/`.env.example` six-knob contract, the SEO
  surfaces (the explicit `sitemap.xml`/`robots.txt`/`manifest.json`
  route handlers), the docs-count lockstep verified live-tense at
  **425/68/14** (README + CLAUDE + PAD §7 + SKILL), and the known-issues
  register swept (every row documented/accepted/deferred — none falsely
  open).

## 2. The round's finding: ZERO code findings — the eleventh zero-drift verification round

The census found **zero structural deviation** on any probed
surface, every local audit dimension answered clean, the F-239a pin
answered its live regression check on BOTH apps, and the evidence
layer (screenshot battery · boot-2 stability · VLM battery) answered
with zero surviving flags. No code was changed this round; the counts
hold at **425/68/14** (the s222 lockstep guard green).

## 3. The live re-audit: the FORTY-EIGHTH census — zero structural drift

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

- **The data state: UNCHANGED** (the fortieth round at this state) —
  the owner's 3 transactions all dated **Oct 27, 2026** (bills
  −$1,200.00 · bills −$281.00 · food −$1,000.00, total −$2,481.00), so
  the November dashboard answers the EMPTY month (KPIs $0.00, count 0,
  "November 2026 Overview", "No expenses recorded yet", "No budgets set
  for this month", the donut empty state) while Recent Transactions
  answers the ALL-TIME list (the 3 October rows) and the Spend Summary
  card answers **Week Spent $2481.00 / Week Earned $0.00** with the
  Mon–Sun band and the $0–$2600 axis — the exact scoping genera our
  implementation matches (KPIs month-scoped, recent all-time, week
  Mon–Sun).
- **The four-page title + container census (via FULL navigations):**
  `/` → "Budget Wise" · `/transactions` → "Transactions | Budget
  Wise" · `/budgets` → "Budgets | Budget Wise" · `/profile` →
  "Profile | Budget Wise" — all matching.
- **The s207 percent-decode probes (the round's fresh probe number
  240):** `/Curl%20Probe%20240%20Test` → **"Curl Probe 240 Test |
  Budget Wise"** (decoded); `/foo%2Dbar-probe-240` → **"Foo Bar
  Probe 240 | Budget Wise"** (the %2D decode precedes the hyphen
  split); `/Hyphen-Probe-240` → **"Hyphen Probe 240 | Budget
  Wise"** — all three matching our implementation (the thirty-third
  census after the s207 fix; ours curl-verified with the REAL 404
  status).
- **The 404 BODY quotes the raw ENCODED path** on both apps — read
  at the probe page directly from the first pass (the canon applied
  from the start; the loop-page trap not hit): `The page
  "Curl%20Probe%20240%20Test" could not be found in this
  application.`
- **The 520 malformed-escape face held its THIRTY-FIRST round:**
  `/%2` answers the reference CDN's `520` (curl-verified) where ours
  answers the designed 404 with the never-throw raw-segment fallback
  (curl-verified at `/%2` and `/foo%bar`; the reference's laxer
  single-percent face answered 200 at `/foo%bar` — the platform's
  artifact, ours the designed 404 form).
- **The row-anatomy probe (the deeper, full-nesting form):** the
  first list row byte-matches the recorded genus on every nesting
  level — row `flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors` · icon tile `p-2.5 rounded-xl bg-red-50
  text-red-600` with `lucide-receipt w-5 h-5` · text column
  `flex-1 min-w-0` (P `font-medium text-slate-900 truncate` + the
  category badge + P `text-sm text-slate-500`) · amount block
  `flex items-center gap-2` with `lucide-arrow-down-left w-4 h-4
  text-rose-500` + `SPAN.font-semibold text-lg text-rose-600` · the
  delete button's `lucide-trash2 w-4 h-4`.
- **Both dialogs byte-identical on labels AND order** — the fresh Add
  Transaction dialog (title "Add Transaction", submit "Add Expense",
  Expense selected, trigger "Select category"); the expense family 8
  (Food & Dining · Transport · Entertainment · Shopping · Bills &
  Utilities · Healthcare · Education · Other); the Income tab flipping
  on the real Enter keydown (aria-selected flip + submit "Add
  Income"); the income family 5 (Salary · Freelance · Investment ·
  Gift · Other); the Set Budget dialog matching on all fields (title,
  trigger, placeholder "0.00", submit).
- **The mobile axis (390×844):** the bottom bar byte-identical on
  every dimension (classes `md:hidden fixed bottom-0 left-0 right-0
  z-50 bg-white border-t border-slate-200 safe-area-pb` · rect
  390×77 at y=767 · row `flex items-center justify-around py-2` ·
  4 capitalized hrefs · the ink split on the anchor AND its svg ·
  no aria-current on the reference — its bar a bare DIV) and the
  scroll-end clearance **764 ≤ 767, gap 3** (the scrolled-to-end
  canon).
- **The SEO surfaces:** the reference sitemap carries the 4
  capitalized locs (/, /Budgets, /Profile, /Transactions — weekly,
  1.0/0.8); ours answers the documented 9-loc superset; robots.txt
  identical in form on both; the reference's manifest 302 (the
  platform's api redirect) vs ours 200 (the explicit route handler).
- **The logged-out root redirect (both stores cleared):**
  `/login?from_url=<abs-encoded>` — the wall-form genus.
- **The reference member-since line (the F-239a live re-read):**
  the owner profile answers **"Member since October 2026"** — the
  fixed form our pinned fixture matches.

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

- The demo db re-seeded in place to November (the standard posture —
  $4,424.55 · 88.5% saved · 4 txns, the documented data-borne
  divergence against the reference's empty November); the dev server
  booted fresh (`rm -rf .next` + `bun run dev`, health 200, db up) at
  the N-1 posture.
- Every local probe mirrored and matched: the with-data KPIs
  ($4,424.55 / $5,000.00 / $575.45 / 4 · the 88.5% saved badge · the
  donut legend), the four-page titles, the s207 set with the REAL 404
  statuses, the raw-encoded 404 body read at the probe page directly,
  the designed 520-face fallback (`/%2` → 404, `/%E0%A4%A` → 404 with
  title `%E0%A4%A | Budget Wise`), the row anatomy at full nesting
  depth (with the N-89c6 library-injected aria-hidden superset on our
  row svgs + the trash2 dual-alias/`[&_svg]:size-4` idiom — computed
  16×16 identical on both), both dialogs (the expense family 8 · the
  Income Enter-flip · the income family 5 · the Set Budget fields),
  the Spend Summary card byte-matching the reference's structure with
  our seeded Week Spent $0.00 / Week Earned $5,000.00 (the Nov 1
  salary inside the Mon–Sun week — the same scoping genus as the
  reference's Oct 27 reading), the mobile bar (the NAV-landmark +
  aria-current superset re-read via the class-only selector after the
  bare-DIV form answered "NO BAR" — the documented guard) with the
  identical 764 ≤ 767 gap-3 clearance, the SEO surfaces (the 9-loc
  superset · robots identical · manifest 200), the app-page guest
  wall `/login?from_url=<abs-encoded>` (with the cookie-clear settle
  honored), and our `/` the public landing (the D-142a parity event).
- **The dual-app diff: zero structural drift.**

### 3.3 The evidence layer

- **The screenshot battery (boot-1): 10/12 byte-identical to HEAD**
  (add-transaction-dialog ec722e4e captured per the s232
  capture-origin canon from the Dashboard's button · budgets-desktop
  90f05175 · budgets-mobile 26f59eab · dashboard-mobile c264fdfb ·
  landing-desktop 8ade5170 · login-desktop e504ff9f · profile-desktop
  ed954b46 · set-budget-dialog 10ad7822 · transactions-desktop
  05b594f2 · transactions-mobile 912e5aa0) **+ the two delta frames
  at RECORDED genus realizations:** dashboard-desktop the settle
  state **327d785a** — the SECOND consecutive settle-form round
  (s239 + this round), stable across the boot-1 capture, the
  recapture, AND both boots, all 49,260 delta px sub-threshold in the
  donut antialias band (max 7, ZERO at ≥ 32, bbox (172,818,927,886))
  — the timing-dependent settle-race classification standing;
  profile-mobile the avatar-jitter alternate **8c6e81e7** on boot-1
  (120 px, max 7, ZERO at ≥ 32, the avatar bbox (84,255,235,377))
  with the recapture answering HEAD's exact **b0413d45**
  byte-identical — the within-round alternation, the documented
  possibility. NO frame refreshed (every delta a recorded genus —
  the s228 precedent).
- **The boot-2 stability proof: 12/12 stable across both boots**
  (the server stopped, `.next` cleared, rebooted, the full battery
  recaptured): boot-2 answered the same ten byte-identical +
  dashboard-desktop the same settle-state md5 (deterministic across
  both boots) + profile-desktop the recorded alternate **3d5173c8**
  (105 px, max 6, ZERO at ≥ 32, the avatar bbox (357,255,505,374)) +
  profile-mobile back at HEAD's b0413d45; zero visible-threshold
  deltas, zero new bboxes; every observed realization a recorded
  genus-pair member.
- **The VLM battery (4 pairs, the census JSON format): 2/4 None with
  ZERO surviving flags** — the dashboard pair's four flags the
  documented data-borne genera (the empty-vs-seeded donut, the
  week-bars' demo data + Y-axis scale, the savings-badge conditional,
  the row data — each disproven by the throwaway-signup live
  verification); the budgets-desktop and transactions-desktop pairs
  clean (None); the transactions-mobile pair's two flags the platform
  badge partially obscuring the reference's bottom bar + a coarse
  row-badge spatial claim (disproven by the byte-identical full
  row-anatomy census). The s204 coarse-signal-never-a-gate posture
  held.
- **The s230 F-1 fix re-verified LIVE** on a fresh throwaway signup
  (`throwaway240-ui-*@test.local` through the in-app OTP funnel:
  signup with the confirm-password field → the 6-digit code read from
  the page → the six per-digit inputs filled by REAL KEYSTROKES —
  all six landing in their exact positions ["4","5","4","4","6","5"]
  → Verify email → login): the empty dashboard rendering the exact
  reference form (the `text-slate-400` P "No expenses recorded yet"
  directly inside the `p-6 pt-0 flex items-center justify-center h-64`
  content div, no svg sibling) + the Budget Progress empty + the
  Recent Transactions empty + the dashboard API confirming the exact
  empty aggregate (balance 0 · income 0 · expenses 0 ·
  **transactionCount 0** · spendingByCategory [] · budgets [] ·
  overallBudget null · month 11 · week all-zero buckets ·
  recentTransactions []) + the with-data form intact ($4,424.55 · the
  88.5% saved badge) + the member-since line reading "Member since
  October 2026".
- **The F-239a regression check live on BOTH apps:** our demo profile
  "Member since October 2026" and the reference owner account
  re-read live at the identical line — the pinned fixture
  byte-matching the reference's current form through its first
  post-fix intact round.

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift for
  the thirty-third census after the s207 fix.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone; the
  clearance identical at 764 ≤ 767, gap 3).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root;
  the seam pinned; `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place with clean config scopes
  (**425**/68/14, all green this round).
- The SEO surfaces: the explicit sitemap/robots/manifest route
  handlers implemented and matching the reference formats (the
  documented superset genera).
- The s230 F-1 fix (the donut empty state): re-verified LIVE on a
  fresh throwaway signup — byte-identical to the reference's form.
- The F-239a fix (the demo member-since pin): live-verified on BOTH
  apps this round; the standing rows pinned; the update-path pin
  exercised green via the in-place re-seed.
- The security sweep, the `skills/` exclusion, the capital-alias
  stubs (with the metadata re-exports), the `outputFileTracingExcludes`
  artifact-hygiene pin, the docs-count lockstep (the s222 guard green
  at 425/68/14), the known-issues register, the neo-crm stack-pattern
  lineage.
- The reference data state: unchanged at 3 txns / −$2,481.00 (the
  fortieth round) — no owner-side change to mirror.

### Issues found

**None.** Zero code findings this round — the ELEVENTH zero-drift
verification round after sessions
227/228/231/232/233/234/235/236/237/238.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (pull at `214c250` — the owner's
       `docs/session_97.md` transcript commit; the standing
       environment verified, not rebuilt) + the F-239a pin confirmed
       in the standing rows + the in-place re-seed green (the
       update-path pin).
2. [x] The baseline gate: 425/425 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s239 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #48 + the dual-app diff — zero
       structural drift; the F-239a regression check live on both
       apps; the s230 F-1 fix re-verified live (UI + API probes);
       the data state unchanged (§3).
5. [x] The screenshot battery — 10/12 byte-identical to HEAD + the
       two delta frames at recorded genus realizations (the settle
       state + the avatar alternate), each recaptured and
       pixel-diff classified; NO frame refreshed.
6. [x] The boot-2 stability proof — 12/12 stable across both boots
       (zero visible deltas, zero new bboxes; profile-desktop at its
       recorded alternate on boot-2).
7. [x] The VLM battery — 2/4 None, zero surviving flags after the
       direct-census cross-check.

**Phase B — the remediation**

8. [x] NONE REQUIRED — zero code findings; no code changed; the
       counts hold at 425/68/14.

**Phase C — the documentation + the ship**

9. [x] This plan (the zero-findings record + the census evidence +
       the three probe-methodology guards + the persistence-claim
       counter-example — §6).
10. [x] The PAD v2.50.0 revision block (the forty-eighth census —
        the zero-drift verification round + the F-239a both-apps
        live check).
11. [x] `budget-wiser_SKILL.md` v1.49.0 (the frontmatter bump + the
        provenance's session-240 clause + Appendix C's session-240
        row).
12. [x] `docs/session_98.md` + the worklog entry (Task ID 240).
13. [x] The post-documentation gate re-run (the ship discipline:
        lint 0/0 · typecheck 0 · 425/425 unit · build · 14/14 smoke
        · 68/68 e2e CI=1) before the atomic commit.
14. [x] The git sweep (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) + the atomic commit on main + the
        push via `docs/ssh_git_wrapper_v3.py` (the runbook: keys
        never live inside the repo; the key shredded post-push).

## 6. Risks and guards

- **No code changed this round** — the regression surface is empty
  by construction; the ship risk is documentation-only (the counts
  lockstep guarded by the s222 pin, green at 425/68/14).
- **The F-239a pin's standing posture:** the fixture (October 2026)
  byte-matched the reference's live line this round on both apps; a
  future reference-side account re-creation (the owner re-signing
  up) would re-date the reference's line — the census catches it
  live and the fixture moves with the live-read (the test pin
  updates in the same change set). The pin's regression surface is
  now exercised at every fresh clone (the seed) AND every in-place
  re-seed (the update block).
- **The dashboard-desktop settle state (`327d785a`) answered
  deterministically on BOTH boots for the second consecutive round**
  (s239 + this round) after the five-absent streak — the
  timing-dependent settle-race classification stands; the
  all-sub-threshold signature (49,260 px ≤ 16, max 7, ZERO at ≥ 32,
  the donut antialias band) is the recorded form; future rounds
  encountering it should recapture before classifying (the s232
  canon).
- The avatar-jitter genus family carries its recorded variance
  observations across both pairs (desktop `ed954b46 ↔ 3d5173c8` ·
  mobile `b0413d45 ↔ 8c6e81e7`); this round both pairs answered
  the within-round alternation (mobile: boot-1 the alternate, the
  recapture HEAD; desktop: boot-1 HEAD, boot-2 the alternate) —
  every observed realization a genus-pair member, all sub-threshold,
  the avatar bboxes; the evidence-set comparison rule stands (same
  bbox + recorded md5 pair = genus; only a visible-threshold delta
  or a NEW bbox is drift).
- **THREE probe-methodology guards entered the canon this round
  (genuinely persisted in the census240 scripts):** (1) the OTP code
  extraction must strip the eval wrapper's JSON quotes
  (`tr -d '"'`) — the quote-wrapped code shifted every keystroke
  one position and the first funnel run failed five-of-six; (2) the
  Add Transaction dialog's store-managed form state SURVIVES
  close/reopen (the tab selection + the picked category persist
  across a close→reopen cycle) — only a FULL page navigation resets
  it, so the census "fresh dialog" means fresh-after-navigation;
  (3) the Income-tab flip must PRECEDE the combobox popup open —
  Enter with the popup open selects the focused option into the
  trigger instead of flipping the focused tab (the probe-order
  trap).
- **The save-it-back rule, re-confirmed with a live counter-example:**
  the s239 session's claim that the real-keystroke digit-fill was
  "persisted in the census239 script" had NOT taken — the `.set`
  form was still in the file, and this round's first funnel adapted
  from it inherited the stale form. This round's census240 funnel
  now genuinely carries the keystroke + quote-strip form, and the
  save was re-read post-write to verify it took. Ad-hoc probe fixes
  made during a session MUST be saved back into the script AND the
  save verified by re-reading the file.
- The reference's data state has sat at 3 October txns since round 30
  (the s200 baseline break) — a future owner-side re-plant will
  surface as new data-borne divergence, not structural drift (the
  standing classification rule).
- The month-tense sensitivity (the s229/s230 lesson) — the e2e
  seededRowDate matcher is month-agnostic by design; the in-place
  re-seed posture keeps the dev db in the current month; and the
  member-since line is FIXED (the s239 pin) — the two date-sensitive
  surfaces answer their correct parity postures.

## 7. Execution addendum

- The census executed per §3 on 2026-11-01: the reference leg (the
  owner login, the desktop probes via full navigations, the mobile
  axis, the s207/520 probes, the SEO curl set, the member-since
  re-read), the local leg (the N-1 dev boot, the in-place re-seed,
  the full probe mirror, the throwaway-signup empty-state
  verification), the evidence layer (the 12-frame battery + the
  recapture classification + the boot-2 proof + the 4-pair VLM
  battery).
- ZERO code findings → no remediation executed; the counts held at
  **425/68/14** (the s222 lockstep guard green in the suite).
- The documentation set shipped: this plan, the PAD v2.50.0 (the
  revision block), `budget-wiser_SKILL.md` v1.49.0 (the frontmatter +
  the provenance's session-240 clause + Appendix C's session-240
  row), `docs/session_98.md`, and the worklog entry (Task ID 240);
  no screenshot refreshed (every delta a recorded genus).
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **425/425 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state.
