# Budget Wise — Session 40 Remediation Plan

**Date:** 2026-11-01 · **Task ID:** 229 · **Branch:** `main` only · **Method:** the full census + evidence verification + the TDD remediation of the round's one code finding (the THIRTY-SEVENTH census — the twenty-second after the s207 percent-encoding fix, the twelfth after the s218 arrow remediation, and the ELEVENTH carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT (the second consecutive intact round —
  no sandbox reset): `git pull` fast-forwarded to `0275f01` (the owner's
  `docs/session_76.md` transcript commit over the s228 ship `79bbe67`);
  the standing environment VERIFIED rather than rebuilt: bun 1.3.14
  (the sandbox's own), `bun install --frozen-lockfile` (518 installs
  across 610 packages, no changes — the lockfile honored), the six-knob
  `.env` in place with `DATABASE_URL="file:../db/custom.db"` (the
  mandated contract), `db/` at the repo root with `custom.db` (the
  `e2e.db`/`smoke.db` pair recreated by their own gate legs), the
  Playwright Chromium headless-shell 1248 standing, and agent-browser
  0.40.0 verified.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.38.0**, `budget-wiser_SKILL.md` **v1.37.0**,
  `docs/session_75.md`, `docs/REMEDIATION-PLAN-SESSION-39.md`,
  `worklog.md`, and `docs/session_76.md` — all read and validated against
  the tree before touching anything (the db-path seam, the proxy seam,
  the capital-alias stubs with their metadata re-exports, the
  `@custom-variant hover` unwrap, the 148 color re-pins, the
  `outputFileTracingExcludes` pin, the four config scopes carrying the
  `skills/` exclusion — each verified in place).
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-228 ship state, green on the first full pass, with the
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
  literal-class discipline verified (all 15 `className={\`...\`}` hits a
  static-constant composition over the `page-layout.ts` records — the
  literals statically extractable), the capital-alias `.jsx` stubs
  verified (the metadata re-exports present on
  Transactions/Budgets/Profile; /Dashboard metadata-less by design),
  the `outputFileTracingExcludes` artifact-hygiene pin verified, and the
  mandated focus areas each swept clean — the **mobile navigation**
  (the 12-test e2e battery green standalone + the live byte-census on
  BOTH apps) and **TailwindCSS v4** (the `@custom-variant hover`
  unwrap at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at
  :149/:158, the v3 palette re-pin block — 148 `color-` pins, the
  `safe-area-pb` @utility at :405, no config JS, no v4-family bugs
  found). The `.env`/`db` contract verified (six knobs in both files
  with identical knob names, `db/` at the repo root with `custom.db`,
  the seam pinned by `tests/db-path.test.ts`, `.env.example` tracked),
  the Vitest + Playwright suites verified in place with clean config
  scopes, the SEO surfaces verified (sitemap + robots + manifest
  explicit route handlers, the nine-route sitemap), the docs-count
  lockstep verified at **420/68/14** live-tense (the s222 guard green
  in the suite), and the neo-crm tech-stack lineage re-confirmed from
  the carried `neo-crm_SKILL.md`.

## 2. The finding

**ONE code finding (F-1, Medium — remediated with TDD) + zero reference
drift on the census.** The live re-audit found zero structural deviation
on any probed surface (§3); no gate movement; no count movement (§5).
The round's finding is a genuine month-boundary flake in the e2e suite
(§4 F-1) — caught live when the October→November rollover fired BETWEEN
the round's baseline gate (green, 2026-10-31 23:35) and the
post-documentation gate (RED, 2026-11-01 00:01): the suite's two
row-date assertions hardcoded "Monday, Oct 26, 2026" while the seed
plants the demo month in the CURRENT month (the documented design) —
the assertions RED the suite at every month boundary. Remediated with
TDD (the RED state demonstrated on the actual failure; the GREEN fix
derives the expected date the same way the seed dates the row and the
app renders it — no count movement). The round also carries three
evidence-class observations (N-1: the composite-variance genus answered
its `a5f47a64` sibling form on BOTH boots — the genus's first
same-md5-across-boots answer; N-2: the hidden-a11y-select genus — both
apps' category controls ride an invisible 1×1 native select whose
option order/composition is platform plumbing, and this round read the
VISIBLE listboxes byte-for-byte for the first time: Salary, Freelance,
Investment, Gift, Other on BOTH apps; N-3: the VLM battery answered 2/4
None — its cleanest result yet), methodology and evidence.

## 3. The live re-audit: the THIRTY-SEVENTH census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the twenty-second census after
  the s207 percent-encoding fix, the twelfth after the s218 arrow
  remediation, and the eleventh carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the TWENTY-SECOND
  consecutive census:** the fresh `%20` probe
  (`/Curl%20Probe%20229%20Test`) answers the DECODED title
  `Curl Probe 229 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-229`) answers "Hyphen Probe 229 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
  `The page "Curl%20Probe%20229%20Test"` on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  TWENTIETH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback (curl-verified, title
  `%E0%A4%A | Budget Wise`).
- **The deeper row-anatomy probe carried for the eleventh census:** the
  amount-wrapper's inner family read on BOTH row surfaces on BOTH apps
  at the list's full nesting depth — the reference's first list row
  answers the icon tile `p-2.5 rounded-xl bg-red-50 text-red-600` + the
  text column `flex-1 min-w-0` + the amount+delete group `flex
  items-center gap-4` > the amount block `flex items-center gap-2` >
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` + the
  `SPAN.font-semibold text-lg text-rose-600` span inside the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row, and
  the dashboard recent form answers the `font-semibold text-rose-600`
  span (no text-lg) in the amount block riding the `flex items-center
  gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors` recent row;
  ours answers byte-identical classes on both surfaces plus the income
  form (`lucide lucide-arrow-up-right w-4 h-4 text-emerald-500` + the
  emerald amounts `+$5,000.00`) the seeded Salary row exercises — the
  s218 remediation VERIFIED at the exact depth where the genus lived,
  for the eleventh consecutive census.
- **Every other parity surface answered byte-identical:** the body
  census (`[#root, #base44-edit-badge, #recharts_measurement_span]`,
  body WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20
  md:pb-0` + the outer `min-h-screen bg-slate-50` surface wrapper + the
  bare wrapper div), all four pages (containers 7xl/5xl/5xl/4xl, titles
  via FULL navigations — Dashboard "Budget Wise", the others
  "X | Budget Wise"), the mobile bottom bar byte-identical on every
  dimension (DIV tag, rect top=767 h=77, the row wrapper `flex
  items-center justify-around py-2`, the four anchors' classes, the ink
  split on the anchor AND its svg, the four w-6/h-6 lucide icons, NO
  aria-current on the reference), the scroll-end clearance (764 ≤ 767
  measured with the same all-boxes lowest-box form at scroll-end on
  BOTH apps), both dialogs (the expense genus with the reference's
  8-option family incl. `value="health"`; the income family flipping
  cleanly on KEYBOARD activation — focus + Enter — with the submit
  label flipping to "Add Income"; ours answering the documented
  `healthcare`/`other_income` internal-wire genera with the visible
  LABEL families matching and our Radix Income tab flipping cleanly on
  a synthetic click), the Set Budget dialog (Category/Monthly Limit
  labels + the 0.00 placeholder), the sitemap format + robots.txt
  (curl-verified; the documented capitalized-loc divergence on the
  reference — `/`, `/Budgets`, `/Profile`, `/Transactions`; manifest
  302 on the reference vs our 200 functional superset), the login card
  (the 4-button OAuth row: Google, Microsoft, Facebook, Apple), and
  the donut geometry (200×200 `g.recharts-pie` inside the 341×280 svg
  at the pinned viewport). The reference's logged-out `/` face
  re-confirmed with BOTH stores cleared (the s225 N-5 dual-store
  discipline): it redirects to `/login?from_url=<abs>` — the reference
  ships NO public landing (ours is the documented functional
  superset).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-NINTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each
  — both clean, zero reload loops, the health probe 200 on each): every
  local surface matched the documented genera (the login card, the
  seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the
  "88.5% saved" badge — the documented data-borne divergence, the shell
  with our documented body-chrome platform-face genus, the mobile bar
  byte-identical + the NAV-landmark/aria-current superset, the
  clearance identical at 764 ≤ 767, all titles matching, the 404
  surface byte-matching with the real 404 status + the decoded title +
  the encoded body + the raw-segment malformed-escape fallback, both
  dialogs matching with our `healthcare`/`other_income` internal-wire
  ids + our Radix Income tab flipping cleanly on a synthetic click, the
  SEO surfaces matching with the documented lowercase-loc divergence,
  the donut geometry byte-identical, the row inner family byte-identical
  on both surfaces).
- **The hidden-a11y-select genus surfaced and resolved in-round (N-2):**
  the first dialog probes read `document.querySelectorAll('select')` on
  BOTH apps and returned each app's HIDDEN 1×1 a11y select (the
  reference's answers className="" size 1×1; ours the Radix form-value
  carrier) — whose option composition is platform plumbing, NOT the
  parity surface (the reference's hidden income order reads
  other-first where its VISIBLE listbox reads Salary-first; ours carries
  a leading placeholder option). The census then read the VISIBLE
  listboxes directly for the first time at this depth: the reference's
  opened combobox answers `Food & Dining, Transport, Entertainment,
  Shopping, Bills & Utilities, Healthcare, Education, Other` (expense)
  and `Salary, Freelance, Investment, Gift, Other` (income) — ours
  byte-identical on labels AND order (the `categories.ts` label map +
  the pinned unit-test order). Zero drift; a new methodology note
  recorded (read `[role=listbox]`, never the hidden select).

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero reference drift.
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
- The reference data state: held at the s200 baseline for the
  twenty-ninth consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F — findings (one)

- **(F-1, Medium — test-suite flake) The e2e row-date assertions
  hardcoded the seeded month's October dates; the seed plants the demo
  month in the CURRENT month — the assertions RED the suite at every
  month boundary.** Location: `tests/e2e/app-flows.spec.ts:62,70`
  ("renders the summary cards and the seeded rows" + "the search box
  filters rows"). Evidence: the baseline gate ran green at 2026-10-31
  23:35 (the October dates still matching the October seed); the
  post-documentation gate RED'd at 2026-11-01 00:01 —
  `expect(getByText(/Monday, Oct 26, 2026/)).toBeVisible()` timed out
  because the November re-seed had planted the Electricity-bill row at
  Nov 26. The seed's current-month rule is the documented design
  ("CURRENT month so a re-seed any time keeps the dashboard
  non-empty") — the assertions were the wrong side. Impact: every e2e
  gate run in a new month fails until the pin is updated — a genuine
  flake, first caught live at this boundary (no prior round ever ran
  the gate across a month rollover). Confidence: Verified (reproduced,
  isolated, fixed, re-verified).
- **Remediation (TDD):** the RED state demonstrated on the actual
  failure (the failing run above); the GREEN fix derives the expected
  date string from the seed's own rule — the 26th of the current
  month — rendered through the app's own `formatFullDate` options
  (`toLocaleDateString("en-US", { weekday: "long", month: "short",
  day: "numeric", year: "numeric" })`), replacing both hardcoded
  regexes with the derived `seededRowDate` matcher (same assertion
  strength: the full weekday-dated row form, now month-agnostic). The
  affected spec re-verified green 23/23; the full gate re-ran green
  post-remediation. No count movement (the fix modifies assertions
  inside existing tests — 420/68/14 held).

### N — informational notes (evidence and methodology, not code)

- **(N-1) The composite-variance genus answered its `a5f47a64` sibling
  form on BOTH boots — the genus's first same-md5-across-boots
  answer.** The s227 round documented the md5 PAIR (`7705f2ca` boot 1 +
  `a5f47a64` boot 2); the s228 round answered the pair again; this
  round BOTH boots realized the SIBLING form (the 49,212-changed-px /
  zero-above-bar / max 3.1/255 / bbox (172,818)–(926,885) signature —
  the documented sibling signature). The stochastic-across-boots law
  holds: no schedule across boots or rounds; per-form determinism
  within the round; the md5 is a realization of the variance, and the
  signature-level determinism (bbox + zero-above-bar + sub-threshold
  max) remains what the classification machinery keys on.
- **(N-2) The hidden-a11y-select genus — a platform-face observation +
  a new methodology note.** Both apps' Add-Transaction category controls
  ride an invisible 1×1 native `<select>` (the a11y carrier) behind a
  custom visible combobox. The hidden selects differ in platform
  plumbing (the reference's income options order other-first with no
  placeholder entry; ours order salary-first with a leading placeholder
  option) — invisible to pixels, the same class as the s198
  body-chrome genus. The census's first reads picked these hidden
  selects up on BOTH apps; the resolved probe read the VISIBLE
  listboxes and found them byte-identical on labels AND order —
  `Salary, Freelance, Investment, Gift, Other` (income) and the
  8-entry expense family `Food & Dining…Other` on both apps. The
  methodology note: dialog-select parity probes must read
  `[role=listbox]` (the visible listbox), never `select` (the hidden
  carrier).
- **(N-3) The VLM battery answered 2/4 None — its cleanest result
  yet.** Transactions-desktop AND budgets-desktop both answered
  "structural_differences: None" (the budgets-desktop pair classified
  the platform edit badge as a note rather than a flag this round). The
  two flagged pairs carried only the documented genera: the dashboard
  pair's data-borne trio (the "88.5% saved" badge, the donut
  data/legend, the recent-list content — our seeded demo month vs the
  reference's owner data, disproven by the byte-matching DOM census on
  the same surface) and the transactions-mobile pair's platform-badge
  occlusion + row-layout flags (disproven by this round's direct
  byte-census: all four anchors byte-matched, the row inner family
  byte-identical at full nesting depth). The s204 "coarse signal, never
  a gate" posture held; zero flags survived the cross-check.
- **(N-4) The two-boot stability proof extended the per-form
  determinism evidence:** all FOUR delta frames answered the SAME md5
  on both boots this round (`e5dd4c69`, `a5f47a64`, `3d5173c8`,
  `296c8736` × 2 each) — every genus deterministic within the round,
  the avatar-jitter desktop form now answering both boots for the
  SECOND consecutive round, and the blur-column genus answering the
  add-transaction-dialog form for the THIRD consecutive round
  (s227 → s228 → s229).
- **(N-5) The intact-workspace intake verified:** the second
  consecutive no-reset round — `git pull` + the frozen-lockfile install
  check + the standing db/Chromium environment landed the documented
  ship state with the gate green on the FIRST full pass (the
  environment-verification path — the lighter half of the s228
  N-5 bootstrap proof).

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (pull at `0275f01` → frozen-lockfile
       install check → six-knob `.env` verified with
       `DATABASE_URL="file:../db/custom.db"` → `db/` verified at the
       repo root → Chromium 1248 + agent-browser 0.40.0 standing) —
       the standing environment confirmed intact.
2. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s228 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #37 + the dual-app diff — zero drift,
       the s207 fix verified for the twenty-second census, the deeper
       row-anatomy probe carried for the eleventh census, the
       hidden-a11y-select genus surfaced and resolved with the visible
       listboxes read byte-identical (§3, N-2).
5. [x] The screenshot battery + the TWO-BOOT stability proof — 8/12
       byte-identical + 4 delta frames each at its EXACT documented
       genus md5, all four deterministic across both boots (N-1, N-4);
       zero frames refreshed.
6. [x] The VLM battery — 2/4 None (the cleanest yet); all flags the
       documented DOM-disproven/data-borne/platform genera, zero
       surviving the cross-check (N-3).

**Phase B — the round's finding (one: the month-boundary e2e flake)**

7. [x] F-1 remediated with TDD: the RED state demonstrated live (the
       post-doc gate failing at the Oct→Nov rollover); the GREEN fix
       derives the two row-date assertions from the seed's
       current-month rule + the app's date format (the seededRowDate
       matcher); the affected spec green 23/23; the full gate green
       post-remediation; no count movement (420/68/14 held, the s222
       lockstep guard green).

**Phase C — the documentation set + the ship**

8. [x] The docs-count lockstep verified at **420/68/14** live-tense
        across README/CLAUDE/PAD/SKILL (the guard enforces it);
        AGENTS.md verified count-free.
9. [x] `budget-wiser_SKILL.md` → v1.38.0: the frontmatter version bump
        + the provenance gains the session-229 clause + Appendix C
        gains the session-229 row. Historical rows keep their era's
        numbers.
10. [x] The PAD → v2.39.0: the revision block records the
        thirty-seventh census — the zero-drift verification, the
        battery's same-md5-across-boots answer, the hidden-a11y-select
        genus note, and the cleanest VLM battery.
11. [x] `docs/session_77.md` (this round's log — Task ID 229) + the
        `worklog.md` entry (Task ID 229, appended, never overwritten) +
        this plan ticked with the addendum.
12. [x] The dev server STOPPED + the browser CLOSED before the
        documentation phase; the full gate re-ran green post-
        remediation (lint 0/0 · typecheck 0 · **420/420 unit** · build ·
        14/14 smoke · 68/68 e2e, CI=1) — the ship state at the held
        counts.
13. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) → commit (atomic, Conventional Commit,
        the message explains why) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py` (the runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
        `--remote` explicitly, the default remote is the OLD repo);
        verify the remote ref; shred the key.

## 6. Risks and guards

- **No count movement this round** (420/68/14 held): the s222 docs-count
  lockstep guard stays green — a future drift REDs it by design.
- **The composite-variance genus's md5 set now carries THREE documented
  realizations** (`7705f2ca`, `a5f47a64` — and this round's
  same-md5-across-boots sibling answer): the NEXT round's HEAD
  comparison classifies against the SIGNATURE first (bbox + zero
  above the 8-luminance bar + sub-threshold max), the md5 second —
  the s227 law, re-proven by N-1.
- **The hidden-a11y-select methodology guard (N-2) enters the canon:**
  dialog-select parity probes read `[role=listbox]`, never the hidden
  1×1 carrier `select` — whose option order/composition is platform
  plumbing on both apps (the reference's own hidden carrier orders
  income other-first while its visible listbox reads Salary-first).
- **The capture-identity discipline (s227 N-5) stays load-bearing:**
  every capture step re-verifies the page identity (title or URL) at
  capture time — applied on every mobile-axis and viewport-switch
  capture this round (identity verified on each).
- **The settle-wait + capture-order + viewport-re-pin + cursor-neutral +
  default-state + origin-surface disciplines stay load-bearing** on
  every capture (≥3.5s the donut-bearing frames after a settled mount,
  ≥3s the dialogs, the 25s fresh-login settle-wait on
  dashboard-desktop frames, the dashboard-mobile frame BEFORE any
  scroll probe, `set viewport` before every capture batch, `mouse
  move` to a neutral coordinate before every frame, the frame in the
  surface's DEFAULT state before any state-flipping probe, and the
  dialog opened from its documented ORIGIN surface).
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

- The intact-workspace intake: `git pull` at `0275f01` (the owner's
  transcript commit over the s228 ship), `bun install
  --frozen-lockfile` verified the standing 518-install tree (no
  changes), the six-knob `.env` + `db/custom.db` + Chromium 1248 all
  standing; the gate green on the first full pass — the
  environment-verification path verified end-to-end (the lighter half
  of the s228 N-5 proof: verify-not-rebuild on a standing clone).
- **The F-1 timeline (the month-boundary flake, caught live):** the
  baseline gate ran green 2026-10-31 23:35 (lint 0/0 · tsc 0 · 420/420
  · build · 14/14 smoke · 68/68 e2e — the October seed still matching
  the October pins); the documentation phase completed; the
  post-documentation gate RED'd at 2026-11-01 00:01 on
  `app-flows.spec.ts:62` — the only failure, `getByText(/Monday, Oct
  26, 2026/)` timing out on the November-seeded rows. The isolation:
  the failing spec re-run alone reproduced exactly the one failure;
  the seed source read confirmed the current-month rule
  (`prisma/seed.ts:38-96`); the test tree swept for further
  month-sensitive pins (the budget-math unit tests use explicit
  year/month inputs — boundary-safe; the two app-flows pins were the
  only ones). The GREEN fix (the `seededRowDate` derivation) applied
  to both pins; the spec green 23/23; the full gate re-ran green
  post-remediation. No count movement.
- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login with the 25s settle-wait) re-captured the
  four delta frames — every genus answered the SAME md5 on both boots
  (add-transaction-dialog `e5dd4c69` × 2; dashboard-desktop
  `a5f47a64` × 2 — the sibling form, N-1; profile-desktop `3d5173c8`
  × 2; transactions-mobile `296c8736` × 2). Every capture re-verified
  the page identity at capture time.
- The reference's Income-tab probe required KEYBOARD activation again
  (focus + Enter) — the synthetic click stays inert on the reference's
  tab control (the documented s203 methodology footnote); our Radix
  Income tab flipped cleanly on the synthetic click (the documented
  superset posture).
- The hidden-a11y-select genus was surfaced by the round's own first
  probe form and resolved in-round: the census read the visible
  `[role=listbox]` on both apps (labels AND order byte-identical) and
  reclassified the hidden `select` carriers as platform plumbing (N-2)
  — no code finding; the methodology note enters the canon.
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); every pair's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check and
  2/4 pairs answering None outright.
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the held counts.
- The documentation set shipped: this plan (ticked + this addendum),
  the PAD v2.39.0 (the revision block), `budget-wiser_SKILL.md` v1.38.0
  (the frontmatter + the provenance's session-229 clause + Appendix
  C's session-229 row), `docs/session_77.md`, and the worklog entry
  (Task ID 229); the counts verified live-tense at **420/68/14**.
