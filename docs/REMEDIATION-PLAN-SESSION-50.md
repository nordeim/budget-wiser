# Budget Wise — Session 50 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 239 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ONE-CODE-FINDING round (the FORTY-SEVENTH census — the thirty-second after the s207 percent-encoding fix, the twenty-second after the s218 arrow remediation, and the twenty-first carrying the deeper row-anatomy probe as standing methodology; the first code finding since the s230 donut round, nine rounds back)

## 1. Audit scope executed (this session)

- Intake: the workspace was RESET (the twelfth reset) — the fresh-clone
  bootstrap exercised end-to-end: `git clone` → `bun install` → the
  six-knob `.env` rebuilt from `.env.example` (`DATABASE_URL="file:../db/custom.db"`
  — the mandated contract — plus a generated `AUTH_SECRET`) → `db/`
  re-created at the repo root via `db:push + db:seed` → the Playwright
  Chromium 1248 re-download (the documented fresh-sandbox step, re-hit) →
  agent-browser 0.40.0 verified. The five root documents +
  `docs/session_94.md` + `docs/REMEDIATION-PLAN-SESSION-49.md` +
  `worklog.md` + `docs/session_95.md` were read and validated against the
  tree before touching anything (the proxy seam, the middleware absence,
  the capital-alias `.jsx` stubs with their metadata re-exports, the
  db-path seam, the `@custom-variant hover` unwrap, the v3 palette
  re-pins, the `--shadow-sm`/`--blur-sm` re-pins, the `safe-area-pb`
  @utility, the `outputFileTracingExcludes` pin, the four config scopes
  carrying the `skills/` exclusion, the SEO explicit route handlers —
  each verified in place). The full baseline gate then ran FIRST: lint
  0/0 · typecheck 0 · **422/422 unit** · build · **14/14 smoke** ·
  **68/68 e2e (CI=1)** — the exact documented s238 ship state, green on
  the first full pass, with the mobile-navigation battery additionally
  re-verified standalone at **12/12**.

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
  Transactions/Budgets/Profile; /Dashboard metadata-less by design), the
  `outputFileTracingExcludes` artifact-hygiene pin verified, and the
  mandated focus areas each swept clean — the **mobile navigation** (the
  12-test e2e battery green standalone + the live byte-census on BOTH
  apps, the ink split + the clearance identical) and **TailwindCSS v4**
  (the `@custom-variant hover` unwrap at globals.css:20, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
  `safe-area-pb` @utility, no config JS, no v4-family bugs found). The
  `.env`/`db` contract verified (six knobs in both files with identical
  knob names, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`, `.env.example` tracked), the Vitest +
  Playwright suites verified in place with clean config scopes, the SEO
  surfaces verified (sitemap + robots + manifest explicit route handlers;
  the smoke check 12 green), the docs-count lockstep verified live-tense
  pre-fix at 422/68/14, and the neo-crm tech-stack lineage re-confirmed
  from the carried `neo-crm_SKILL.md`.

## 2. The round's finding: F-239a — the demo member-since pin (Medium)

**Location:** `prisma/seed.ts` (the user `create` blocks) → rendered at
`src/app/(app)/profile/profile-page.tsx:149` ("Member since
{memberSince}").

**Description:** the seed's user `create` blocks left `createdAt` to
Prisma's `now()` default, so the demo account's "Member since" line on
the profile page DRIFTED WITH THE SEED DATE. The reference owner account
renders a FIXED "Member since October 2026" (live-read again this round)
— a value that does not move with the calendar. The standing db had
always dated from October (masking the defect for the eleven consecutive
no-reset rounds s228–s238), but this round's workspace RESET forced the
first genuinely-fresh seed: the demo user's `createdAt` answered
2026-11-01, the profile page rendered "Member since November 2026", and
the screenshot battery RED'd the profile frames against HEAD.

**Evidence:** the boot-1 battery answered 9/12 byte-identical to HEAD
with profile-desktop at `2e356ef7` and profile-mobile at `05aab5df` —
md5s in NEITHER recorded genus pair (desktop `ed954b46 ↔ 3d5173c8`,
mobile `b0413d45 ↔ 8c6e81e7`); the recapture answered the same md5s
(stable, not one-frame transients); the pixel-diff localized the delta
to a 185×10 / 184×10 band at y=450-460 — exactly the
`P.text-xs.text-slate-500` "Member since …" line (DOM-verified at
y=448), NOT the avatar region; 942/915 visible pixels (a text-line
change, not antialiasing); the reference live-read "Member since October
2026"; the fresh db read via the db-path seam answering
`createdAt: 2026-11-01T08:47:17.643Z`. Invisible to every gate: the e2e
asserts only `/Member since/` visibility (app-flows.spec.ts:259,272-273)
and no unit pin existed — the s196 "invisible to every gate" class.

**Impact:** (a) a fresh clone seeded in any month other than October
renders a visible data-borne divergence from the reference on the profile
surface — a fresh-clone parity defect (the §20 pre-ship "fresh-clone
bootstrap verified" dimension); (b) every post-reset census round REDs
the profile battery frames until the db re-dates — a battery
destabilizer; (c) the defect generalizes: any date-rendering line whose
reference value is FIXED must be pinned in the fixture, not left to
seed-time drift (the inverse of the s229/s230 month-tense lesson, where
the reference's data moves with real time and the matchers were made
month-agnostic — here the reference's value is fixed and the fixture
must be too).

**Recommended fix (implemented, TDD):** pin the demo account's creation
date at the DATA layer — `src/lib/demo-fixture.ts` exporting
`DEMO_MEMBER_SINCE` (a fixed `2026-10-15T00:00:00.000Z` — October 2026,
the reference's account-creation month; mid-month by design so no UTC
offset anywhere on Earth shifts the rendered month) + `prisma/seed.ts`
pinning `createdAt: DEMO_MEMBER_SINCE` in BOTH user upserts (the create
blocks so fresh clones answer the pin, AND the update blocks so an
in-place re-seed re-dates a drifted standing db back to the fixture).
Real signups keep their real `createdAt` — only the seeded demo fixture
answers the fixed date (a render-time hardcode was REJECTED: it would
lie about real accounts' ages). Regression pins:
`tests/demo-fixture.test.ts` (3 assertions — the fixture renders
"October 2026" via the profile page's exact locale form; the ISO date is
the timezone-safe mid-month form; the seed wires the fixture into both
upserts' create + update blocks, source-read per the repo's established
idiom).

## 3. The live re-audit: the FORTY-SEVENTH census — zero structural drift (beyond F-239a)

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

- **The data state: UNCHANGED from s230–s238** (the thirty-ninth round
  at this state) — the owner's 3 transactions all dated **Oct 27, 2026**
  (bills −$1,200.00 · bills −$281.00 · food −$1,000.00, total
  −$2,481.00), the November dashboard answering the EMPTY month (KPIs
  $0.00, "November 2026 Overview", "No expenses recorded yet", "No
  budgets set for this month") with Recent Transactions answering the
  ALL-TIME list (the 3 October rows) and the Spend Summary card
  answering **Week Spent $2481.00 / Week Earned $0.00** with the
  Mon–Sun band and the $0–$2600 axis (read by the card-text dump — the
  s237 label-then-number read form).
- **The four-page title census (via FULL navigations):** `/` → "Budget
  Wise" · `/transactions` → "Transactions | Budget Wise" · `/budgets` →
  "Budgets | Budget Wise" · `/profile` → "Profile | Budget Wise" — all
  matching.
- **The s207 percent-decode probes (the round's fresh probe number
  239):** `/Curl%20Probe%20239%20Test` → **"Curl Probe 239 Test |
  Budget Wise"** (decoded); `/foo%2Dbar-probe-239` → **"Foo Bar Probe
  239 | Budget Wise"** (the %2D decode precedes the hyphen split);
  `/Hyphen-Probe-239` → **"Hyphen Probe 239 | Budget Wise"** — all
  three matching our implementation (the thirty-second census after the
  s207 fix; ours curl-verified with the REAL 404 status).
- **The 404 BODY quotes the raw ENCODED path** on both apps — read at
  the probe page directly from the first pass (the s237 pass-3 canon
  applied without re-hitting the loop-page trap):
  `The page "Curl%20Probe%20239%20Test" could not be found in this
  application.`
- **The 520 malformed-escape face held its THIRTIETH round:**
  `/%E0%A4%A` answers the reference CDN's `520` (curl-verified) where
  ours answers the designed 404 with the never-throw raw-segment
  fallback (title `%E0%A4%A | Budget Wise`, curl-verified).
- **The SEO surfaces:** the reference sitemap carries the 4 capitalized
  locs (/, /Budgets, /Profile, /Transactions — weekly, 1.0/0.8); ours
  answers the documented 9-loc superset; robots.txt identical in form
  on both; the reference's manifest.json answers **302** to the
  platform's API path where ours answers **200** from the explicit
  route handler (the documented manifest genus).
- **The deeper row-anatomy probe carried for the twenty-first census:**
  the reference's first list row answers the icon tile `p-2.5
  rounded-xl bg-red-50 text-red-600` + the lucide-receipt `w-5 h-5` svg
  + the text column `flex-1 min-w-0` + the amount+delete group `flex
  items-center gap-4` > the amount block `flex items-center gap-2` >
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` + the
  `SPAN.font-semibold text-lg text-rose-600` span inside the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row —
  ours byte-identical on every compared dimension. Two library-emission
  supersets re-read and re-classified on the delete-button svg: the
  dual-alias `lucide lucide-trash2 lucide-trash-2` class emission and
  the size via the button's `[&_svg]:size-4` (the shadcn icon-button
  idiom) where the reference carries `w-4 h-4` on the svg — the
  computed size identical (16×16) on both (bbox-verified), the same
  N-89c6 library-behavior family, not drift.
- **The Add Transaction dialog (the visible-listbox methodology, s229
  N-2):** the fresh dialog answers title "Add Transaction" · the
  Expense tab aria-selected · the combobox trigger "Select category" ·
  the amount input `0.00` placeholder · the submit "Add Expense"; the
  expense family reads the 8 entries (Food & Dining, Transport,
  Entertainment, Shopping, Bills & Utilities, Healthcare, Education,
  Other — combobox OPEN) and the Income tab — activated by the REAL
  Enter keydown on the FRESH dialog (the s236/s237 canon form applied
  directly) — flips aria-selected true + the submit label to "Add
  Income" and reads the 5-entry income family (Salary, Freelance,
  Investment, Gift, Other) — both families byte-identical on labels AND
  order on both apps.
- **The Set Budget dialog (from the Budgets page):** title "Set Budget"
  · combobox default "Select category" · the Monthly Limit number input
  with the `0.00` placeholder · submit "Set Budget" · the 8-entry
  category family — matching on both apps.
- **The mobile axis (390×844):** the bottom tab bar byte-identical on
  every compared dimension — the `md:hidden fixed bottom-0 left-0
  right-0 z-50 bg-white border-t border-slate-200 safe-area-pb`
  container (rect 390×77, y 767, bottom 844), the `flex items-center
  justify-around py-2` row with 4 anchors, the four hrefs (/Dashboard,
  /Transactions, /Budgets, /Profile), the active `text-slate-900` ink on
  the anchor AND its svg with the inactive `text-slate-400`, and NO
  aria-current on the reference (ours the documented a11y superset: the
  NAV landmark labelled "Main navigation" + `aria-current="page"` on
  the active anchor — the reference's bar a bare DIV).
- **The scroll-end clearance (the main-content walk form):** both apps
  answer the IDENTICAL numbers — the deepest main content element at
  bottom **764** against the bar top **767** (gap 3, clears on both) —
  the `pb-20 md:pb-0` contract holding with the same arithmetic on
  both apps (the scrolled-to-end form, per the s237 pass-3 canon).
- **The logged-out root redirect (both stores cleared):** the reference
  lands on `/login?from_url=<abs-encoded>` — the same wall form our
  GuestLoginRedirect produces (re-verified cleanly after a first
  cookie-clear race answered a stale-session form); our `/` serves the
  PUBLIC landing — the D-142a parity event, pinned by the green
  auth.spec.ts:38 test.

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

- The dev server booted on a fresh `.next` (removed pre-boot; no reload
  loops) with the demo db re-seeded IN PLACE to the current month
  (November) per the standard posture — the with-data forms ($4,424.55
  / $5,000.00 / $575.45 / 4 txns + the "88.5% saved" badge, donut
  legend Bills & Utilities / Other / Transport, Week Spent $0.00 / Week
  Earned $5,000.00 — the Nov 1 salary inside the Mon–Sun week, the
  same scoping genus as the reference's Oct 27 reading) answering the
  documented data-borne divergence against the reference's empty
  November.
- The local probes each matched the reference's genera: the four-page
  titles; the s207 probes (the decoded titles + the real 404 status +
  the raw-encoded body quote + the %2D order + the designed 404
  raw-segment fallback against the reference's CDN 520); the SEO
  surfaces (the 9-loc superset + robots + the 200 manifest); the row
  anatomy byte-identical incl. the supersets; both dialogs' families
  (the income family flipping on the Enter keydown on ours too); the
  Spend Summary card structure byte-matching the reference's form; the
  mobile bar byte-identical + the superset; the clearance identical
  (764 ≤ 767, gap 3 — the same numbers as the reference this round).
- **The s230 F-1 fix re-verified LIVE this round:** a fresh throwaway
  signup (`throwaway239-ui-*@test.local` through the in-app OTP funnel:
  signup with the confirm-password field → the 6-digit code read from
  the page → the six per-digit inputs filled → Verify email → login)
  answered an empty dashboard rendering the exact reference structure —
  the `text-slate-400` P ("No expenses recorded yet") directly inside
  the content div carrying `p-6 pt-0 flex items-center justify-center
  h-64` (no svg sibling) — with the sibling Budget Progress empty ("No
  budgets set for this month") and Recent Transactions empty ("No
  transactions yet") intact, the dashboard API confirming the empty
  aggregate (balance 0 · income 0 · expenses 0 · **transactionCount 0**
  · spendingByCategory [] · overallBudget null · budgets [] · month 11
  · week all-zero buckets · recentTransactions []), and the with-data
  form re-verified intact the same session (balance $4,424.55 · the
  88.5% saved badge). **A methodology upgrade persisted this round:**
  the descriptor-based digit fill (`.set` + the input event) answered a
  one-position SHIFT under the OTP component's auto-advance (the values
  `["","1","2","6","2","9"]` — the first input empty, the code shifted
  right); the REAL-KEYSTROKE form (focus the first input, then
  `keyboard type` the code) fills reliably — now the canon, saved in
  the census239 script. **The API probe's `txnCount` field-name debt
  FIXED** in the persisted script (the field is `transactionCount` —
  the probe now reads it correctly; the s237/s238 false "UNEXPECTED
  DATA" artifact is retired).

### 3.3 The evidence layer

- **THE SCREENSHOT BATTERY (12 canonical frames, all capture
  disciplines applied — the s219 viewport pins, the s221 25s
  fresh-login settle + donut settle, the s222 default state, the s223
  origin surfaces, the s232 capture-origin canon for the dialog frames,
  the s227 capture-identity + capture-order discipline):** **boot-1
  answered 9/12 byte-identical to HEAD with THREE flagged frames —
  the round's finding and its two evidence-class companions.** The two
  profile frames answered md5s in NEITHER recorded genus pair
  (desktop `2e356ef7`, mobile `05aab5df`) — the pixel-diff localizing
  the delta to exactly the member-since P (the F-239a event, §2) —
  and dashboard-desktop answered the RECORDED settle-state `327d785a`
  (the s232/s233 transient, all 49,260 delta px sub-threshold in the
  donut antialias band — the first settle-form round since s233, the
  five-absent-round streak ending exactly as the timing-dependent
  settle-race classification predicts). **Post-fix (F-239a cured +
  re-seeded): the profile frames re-answered HEAD's exact bytes**
  (desktop `ed954b46`, mobile `b0413d45` — byte-identical, zero diff)
  with the desktop frame first passing through its recorded alternate
  `3d5173c8` (the genus pair's other member — the alternation
  documented). **NO frame refreshed** (every delta a recorded genus
  realization; the s228 precedent).
- **THE BOOT-2 STABILITY PROOF:** the dev server stopped, `.next`
  wiped, rebooted, the battery re-captured — **12/12 canonical frames
  the SAME md5-or-recorded-genus on both boots** (9/12 byte-identical
  to HEAD on both boots; dashboard-desktop answering the settle-state
  `327d785a` deterministically on BOTH boots this session — the
  fresh-workspace cold-cache rhythm; both profile frames within their
  recorded genus pairs: desktop at the alternate `3d5173c8`, mobile at
  the alternate `8c6e81e7`, the alternation a documented possibility
  not an obligation). The pixel-diff classification: zero visible
  pixels (>16) on ANY of the three delta frames; zero NEW bboxes
  (dashboard's (172,818,927,886) the donut band; the profile frames'
  (357,255,505,374)/(84,255,235,377) the documented avatar-bbox genus
  forms, 105/120 px all sub-threshold).
- **THE VLM BATTERY (4 pairs, the census JSON format):** **2/4 None**
  (budgets-desktop + transactions-desktop fully clean) with **zero
  flags surviving the direct-census cross-check** — the
  dashboard-desktop pair's three flags are the documented data-borne
  genera (the reference's empty-November donut vs our seeded
  donut+legend, the week-bars' different demo data and Y-axis scale,
  and the "88.5% saved" badge's data-conditional render), each
  disproven by this round's live verification (the empty form verified
  byte-identical live on the throwaway signup; the with-data genus
  verified on both apps); the transactions-mobile pair's two flags are
  a coarse row-badge spatial claim (disproven by the byte-identical
  row-anatomy census — the badge answers the same `flex items-center
  gap-2` position inside the text column on both apps) and a
  "two additional navigation items" claim (disproven by the direct
  4-anchor byte-census of the reference's bar — the platform's "Edit
  with Base44" floating badge occludes the right side of the
  reference's bar in the frame, the documented platform-chrome genus).
  The s204 coarse-signal-never-a-gate posture held.

## 4. Findings

### Issues found

**F-239a (Medium — fresh-clone parity): the demo member-since pin.**
The seed's user `create` blocks left `createdAt` to Prisma's now()
default so the demo account's "Member since" line drifted with the seed
date where the reference owner account renders the fixed "October 2026"
— exposed by the workspace reset's first genuinely-fresh seed (eleven
consecutive no-reset rounds had masked it); invisible to every gate;
pixel-localized by the battery to the member-since line. Remediated
with TDD this round (§2 + §5); verified live byte-matching the
reference; the profile frames re-answered HEAD's exact bytes post-fix.

### Verified clean (no drift — no action)

- Every OTHER parity surface (enumerated in §3) — zero structural
  drift for the thirty-second census after the s207 fix.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone; the
  clearance identical at 764 ≤ 767, gap 3).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  seam pinned; `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place with clean config scopes
  (**425**/68/14 post-fix, all green this round).
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats (the documented superset genera).
- The s230 F-1 fix (the donut empty state): re-verified LIVE on a
  fresh throwaway signup — byte-identical to the reference's form.
- The security sweep, the `skills/` exclusion, the capital-alias stubs
  (with the metadata re-exports), the `outputFileTracingExcludes`
  artifact-hygiene pin, the docs-count lockstep (the s222 guard green
  at 425/68/14 post-fix), the neo-crm stack-pattern lineage.
- The reference data state: unchanged at 3 txns / −$2,481.00 (the
  thirty-ninth round) — no owner-side change to mirror.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (RESET — the twelfth: fresh clone →
       install → six-knob `.env` with `DATABASE_URL="file:../db/custom.db"`
       → `db/` re-created at the repo root → Chromium 1248 →
       agent-browser 0.40.0) — the fresh-clone bootstrap verified
       end-to-end, green on the first full pass.
2. [x] The baseline gate: 422/422 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s238 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #47 + the dual-app diff — zero
       structural drift beyond F-239a; the s230 F-1 fix re-verified
       live (UI + API probes); the data state unchanged (§3).
5. [x] The screenshot battery — the boot-1 RED on the profile frames
       pixel-localized to the member-since line (the F-239a evidence);
       post-fix the profile frames re-answered HEAD's exact bytes; 9/12
       byte-identical on both boots + the three delta frames at
       recorded genus realizations; NO frame refreshed.
6. [x] The boot-2 stability proof — 12/12 same-md5-or-recorded-genus
       across both boots (zero visible deltas, zero new bboxes).
7. [x] The VLM battery — 2/4 None, zero surviving flags after the
       direct-census cross-check.

**Phase B — the remediation (TDD)**

8. [x] **F-239a** — RED: `tests/demo-fixture.test.ts` written first,
       failing on the missing `@/lib/demo-fixture` module (3
       assertions: the fixture renders "October 2026" via the profile
       page's exact locale form; the ISO date is the timezone-safe
       mid-month form; the seed wires the fixture into both user
       upserts' create + update blocks).
9. [x] **F-239a** — GREEN: `src/lib/demo-fixture.ts` created
       (`DEMO_MEMBER_SINCE = new Date("2026-10-15T00:00:00.000Z")`,
       the why documented at the fixture) + `prisma/seed.ts` pinning
       `createdAt: DEMO_MEMBER_SINCE` in both user upserts (create AND
       update — the in-place re-seed re-dates a drifted standing db
       back to the fixture); real signups untouched.
10. [x] **F-239a** — verification: the re-seeded db answering
        `2026-10-15T00:00:00.000Z` (read via the db-path seam); the
        profile page live-reading "Member since October 2026"
        byte-matching the reference; the profile battery frames
        re-answering HEAD's exact bytes; the e2e suite green (the
        visibility-only assertions unaffected).
11. [x] The count lockstep: the unit count 422 → 425 (the three
        demo-fixture pins) with `tests/docs-counts.test.ts`'s canonical
        constant + README + CLAUDE + PAD §7 + SKILL updated in the SAME
        change set (the s222 guard green at 425/68/14).
12. [x] The carried debt: the API probe script's `txnCount` field-name
        bug FIXED in the persisted census239 script (reads
        `transactionCount`; the false "UNEXPECTED DATA" artifact
        retired).

**Phase C — the documentation + the ship**

13. [x] This plan (the F-239a record + the census evidence + the four
        methodology guards — the class-only mobile-bar selector (the
        NAV superset), the signup confirm-password field, the
        real-keystroke OTP digit fill, the cookie-clear settle race).
14. [x] The PAD v2.49.0 revision block (the forty-seventh census —
        the F-239a round).
15. [x] `budget-wiser_SKILL.md` v1.48.0 (the frontmatter bump + the
        provenance's session-239 clause + Appendix C's session-239
        row).
16. [x] `docs/session_96.md` + the worklog entry (Task ID 239).
17. [x] The post-documentation gate re-run (the ship discipline: lint
        0/0 · typecheck 0 · 425/425 unit · build · 14/14 smoke · 68/68
        e2e CI=1) before the atomic commit.
18. [x] The git sweep (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) + the atomic `fix:` commit on main +
        the push via `docs/ssh_git_wrapper_v3.py` (the runbook: keys
        never live inside the repo; the key shredded post-push).

## 6. Risks and guards

- **The F-239a fix's regression surface:** the pin lives at the data
  layer (the seed) — the demo fixture's "Member since" is now stable
  across fresh clones AND in-place re-seeds; the three demo-fixture
  assertions RED if the pin is removed from either upsert or the
  fixture date drifts out of October 2026. A future reference-side
  account re-creation (the owner re-signing up) would re-date the
  reference's line — the census catches it live and the fixture moves
  with the live-read (the test pin updates in the same change set).
- The dashboard-desktop settle state (`327d785a`) answered
  DETERMINISTICALLY on both boots this session (the first settle-form
  round since s233, after five absent rounds) — the timing-dependent
  settle-race classification stands; the all-sub-threshold signature
  (49,260 px ≤ 16, the donut antialias band) is the recorded form;
  future rounds encountering it should recapture before classifying
  (the s232 canon) and expect the fresh-workspace cold-cache rhythm to
  favor it.
- The avatar-jitter genus family carries its recorded variance
  observations across both pairs (desktop `ed954b46 ↔ 3d5173c8` ·
  mobile `b0413d45 ↔ 8c6e81e7`); this round both pairs alternated
  within the recorded realizations across boots (every realization a
  genus-pair member, all sub-threshold, the avatar bbox); the
  evidence-set comparison rule stands (same bbox + recorded md5 pair =
  genus; only a visible-threshold delta or a NEW bbox is drift —
  F-239a was caught precisely because its delta failed BOTH tests).
- **The four new probe-methodology guards (persisted in the census239
  scripts):** (1) the mobile-bar probe must use the class-only
  selector — our bar is the NAV-landmark superset, not a bare DIV (the
  `div.md:hidden` form silently answers "NO BAR"); (2) the signup
  funnel carries a confirm-password field — without it the
  Create-account submit never fires; (3) the OTP digit-fill canon is
  the REAL-KEYSTROKE form — the descriptor fill shifts one position
  under the auto-advance; (4) the cookie-clear must settle before a
  wall-form probe reads its URL (a raced read answers a stale-session
  form).
- The reference's data state has sat at 3 October txns since round 30
  (the s200 baseline break) — a future owner-side re-plant will
  surface as new data-borne divergence, not structural drift (the
  standing classification rule).
- The month-tense sensitivity (the s229/s230 lesson) — the e2e
  seededRowDate matcher is month-agnostic by design; the in-place
  re-seed posture keeps the dev db in the current month; and now the
  member-since line is FIXED (the s239 pin) — the two date-sensitive
  surfaces answer their correct parity postures (moving matcher for
  moving data; pinned fixture for fixed data).

## 7. Execution addendum

- The census executed per §3 on 2026-11-01: the reference leg (the
  owner login, the desktop probes via full navigations, the mobile
  axis, the s207/520 probes, the SEO curl set), the local leg (the N-1
  dev boot, the in-place re-seed, the full probe mirror, the
  throwaway-signup empty-state verification), the evidence layer (the
  12-frame battery + the boot-2 proof + the 4-pair VLM battery).
- ONE code finding (F-239a) → the TDD remediation (§5 items 8-11) →
  the counts moved to **425/68/14** (the s222 lockstep guard green in
  the suite).
- The documentation set shipped: this plan, the PAD v2.49.0 (the
  revision block), `budget-wiser_SKILL.md` v1.48.0 (the frontmatter +
  the provenance's session-239 clause + Appendix C's session-239 row),
  `docs/session_96.md`, and the worklog entry (Task ID 239); no
  screenshot refreshed (every delta a recorded genus — the profile
  frames re-answered HEAD's exact bytes post-fix).
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **425/425 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state.
