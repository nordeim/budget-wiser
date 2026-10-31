# Budget Wise — Session 33 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 222 · **Branch:** `main` only · **Method:** the full census + evidence verification (the THIRTIETH census — the fifteenth after the s207 percent-encoding fix, the fifth after the s218 arrow remediation, and the fourth to carry the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace SURVIVED a second consecutive round (no reset):
  `git pull` fast-forwarded `182a663..8f9677f` (the owner's
  `docs/session_62.md` transcript commit atop the s221 ship; the repo delta
  since the ship verified docs-only, one file); the standing environment
  verified in place (bun 1.3.14, the 513-package `node_modules`, the
  six-knob `.env` with `DATABASE_URL="file:../db/custom.db"` — the mandated
  contract — the seeded `db/` at the repo root, agent-browser 0.40.0, and
  the pinned Chromium 1248 already cached).
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.31.0**, `budget-wiser_SKILL.md` **v1.30.0`,
  `docs/session_61.md`, `docs/REMEDIATION-PLAN-SESSION-32.md`,
  `worklog.md`, and `docs/session_62.md` — all re-read and validated
  against the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **416/416 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-221 ship state, green on the first full pass, with the
  mobile-navigation battery additionally re-verified standalone at
  **12/12**.
- The local audit per `skills/web-application/SKILL.md` §16/§20: the
  security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME, no `any` leaks in `src/`; the three
  `src/` `console.*` hits answered as the documented sanctioned
  diagnostics — the two server-console OTP delivery lines + the dev-only
  AUTH_SECRET fallback warning), `src/middleware.ts` absent +
  `src/proxy.ts` in place (the s201 seam), `skills/` confirmed excluded
  from all four check/test/compile scopes (tsc exclude · eslint ignores ·
  vitest include `src|tests` only · playwright testDir `tests/e2e`), the
  literal-class discipline verified (the one dynamic-template hit is the
  anti-pattern's own documentation comment in `tabs.tsx`), and the
  mandated focus areas each swept clean — the **mobile navigation** (the
  12-test e2e battery green standalone + the live byte-census on BOTH
  apps) and **TailwindCSS v4** (the `@custom-variant hover` unwrap at
  globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the
  v3 palette re-pin block at :252+, the `safe-area-pb` @utility at :405,
  no config JS, no v4-family bugs found). The `.env`/`db` contract
  verified (six knobs in both files, `db/` at the repo root, the seam
  pinned by `tests/db-path.test.ts`, `.env.example` tracked with
  identical knob names), the Vitest + Playwright suites verified in place
  with clean config scopes, and the SEO surfaces verified (sitemap +
  robots + manifest explicit route handlers).

## 2. THE FINDING (the round's one codebase finding — documentation drift, Medium)

- **(F-1) The PAD's §7 testing-strategy table carried stale counts —
  410 unit / 66 e2e — while the live suites and every other root document
  held 416/68.** Root cause: the counts moved at session 218 (the s218
  arrow remediation added +6 unit/+2 e2e checks) and the PAD's static
  table was never in the lockstep check's scope — six consecutive rounds
  (s218–s221) verified "416/68/14 live-tense across README/CLAUDE/SKILL"
  without the PAD on the list. `git log -S` confirms the table last
  changed at session 197 (when 410/66 was correct).
- **The remediation (TDD, red → green):** the new
  `tests/docs-counts.test.ts` — the docs-count lockstep guard — asserts
  the four root documents agree with each other and with the canonical
  constants, parsing ONLY the live-tense surfaces (the PAD's revision
  block and the SKILL's Appendix C historical rows deliberately keep
  their era's numbers). **The RED state was demonstrated on the actual
  bug**: with the constants at the live 416/68/14, the test failed
  exactly on the PAD's §7 table (410 ≠ 416, 66 ≠ 68) while
  README/CLAUDE/SKILL passed. The GREEN fix updated the PAD table (now
  also naming the docs-count lockstep in the Unit row's "what it proves"
  column). The count then moved 416 → **420** (the guard itself adds 4
  checks) — every live-tense surface updated in the SAME change set
  (README ×2, CLAUDE ×2, PAD §7, SKILL ×3, and the test's own constant),
  exactly the lockstep the guard now enforces mechanically.

## 3. The live re-audit: the THIRTIETH census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the fifteenth census after the
  s207 percent-encoding fix, the fifth after the s218 arrow remediation,
  and the fourth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the FIFTEENTH consecutive
  census:** the fresh `%20` probe (`/Curl%20Probe%222%20Test`) answers
  the DECODED title `Curl Probe 222 Test | Budget Wise` on the reference
  AND on ours identically (ours with the real 404 status, curl-verified);
  the `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-222`) answers "Hyphen Probe 222 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps.
- **The malformed-escape posture: genus AND face HELD at 520 (the
  THIRTEENTH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback.
- **The deeper row-anatomy probe (fourth carry):** the amount-wrapper's
  inner family read on BOTH row surfaces on BOTH apps — the reference
  answers `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (the /Transactions list)
  and the `font-semibold text-rose-600` recent form (the dashboard);
  ours answers byte-identical classes on both surfaces PLUS the income
  form (`lucide lucide-arrow-up-right w-4 h-4 text-emerald-500` + the
  emerald amounts) the seeded Salary row exercises — the s218
  remediation VERIFIED at the exact depth where the genus lived, for the
  fourth consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav classes + `main.pb-20 md:pb-0` + the outer
  `min-h-screen bg-slate-50` surface wrapper), all four pages (containers
  7xl/5xl/5xl/4xl, titles via FULL navigations), the mobile bottom bar
  byte-identical on every dimension (rect top=767 h=77, the row wrapper
  `flex items-center justify-around py-2`, the four anchors' classes,
  the ink split on the anchor AND its svg, the four w-6/h-6 lucide
  icons, NO aria-current on the reference), the scroll-end clearance
  (764 ≤ 767 on BOTH apps), both dialogs (the expense genus with the
  reference's 8-option family incl. `value="health"`; the income family
  `other/salary/freelance/investment/gift` flipping cleanly on keyboard
  activation with the submit label flipping to "Add Income"; ours
  answering the documented `healthcare`/`other_income` internal-wire
  genera with our Radix Income tab flipping on a synthetic click), the
  Set Budget dialog (Category/Monthly Limit labels + the 0.00
  placeholder), the sitemap format + robots.txt (curl-verified; the
  documented capitalized-loc divergence on the reference; manifest 302
  on the reference vs our 200 functional superset), the login card (the
  4-button OAuth row: Google, Microsoft, Facebook, Apple), and the donut
  geometry (341×280 container / 200×200 `g.recharts-pie`).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-SECOND consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each —
  both clean, zero reload loops, single `GET /login` per boot): every
  local surface matched the documented genera (the login card, the
  seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the
  "88.5% saved" badge — the documented data-borne divergence, the shell
  with our documented body-chrome platform-face genus, the mobile bar
  byte-identical + the aria-current/nav-landmark superset, the clearance
  identical, all titles matching, the 404 surface byte-matching with the
  real 404 status, both dialogs matching, the SEO surfaces matching with
  the documented lowercase-loc divergence, the donut geometry
  byte-identical, the row inner family byte-identical on both surfaces).

## 4. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero reference drift.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  seam pinned; `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place with clean config scopes.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The security sweep, the `skills/` exclusion, the neo-crm stack-pattern
  lineage.
- The reference data state: held at the s200 baseline for the
  twenty-second consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F-1 — the PAD §7 count drift (Medium, documentation) — remediated

See §2. The table fixed; the docs-count lockstep guard born
(`tests/docs-counts.test.ts`, RED demonstrated on the bug, then GREEN);
the counts moved 416 → 420 with every live-tense surface updated in the
same change set.

### N — informational notes (methodology, not code)

- **(N-1) The battery: 9/12 byte-identical + the three delta frames each
  at its documented genus, each answered by the round's TWO-BOOT
  stability proof.** budgets-desktop, budgets-mobile, dashboard-mobile,
  landing-desktop, login-desktop, profile-desktop, profile-mobile,
  set-budget-dialog, and transactions-desktop all md5-identical to
  HEAD's `docs/screenshots/` set. The three delta frames, classified by
  pixel-diff against HEAD: **dashboard-desktop answered the EXACT
  s219/s220/s221-documented genus md5 `7705f2ca`** (49,248 changed px,
  ZERO above the 8-luminance threshold, max delta lum 5.3/255, the
  composite-variance band (172,818)–(926,885) — the genus answering for
  the FOURTH consecutive round) and **transactions-mobile the EXACT
  `296c8736`** (5 changed px, max delta lum 1.0/255, ZERO above
  thresholds — the sub-visible genus, also the fourth consecutive round)
  — both genus-md5-across-environments answers; **add-transaction-dialog
  answered `e5dd4c69`** (16 changed px, 100% confined to the single
  x=590 column, bbox (590,381)–(590,396) — the s212/s213/s220 blur-column
  genus at s220's exact capture-state form). **profile-mobile answered
  HEAD's EXACT bytes this round** (the avatar-jitter genus's documented
  one-shot/HEAD-identical dichotomy — the mobile form `8c6e81e7` answered
  at s221, HEAD-identical this round). ALL THREE DELTA FRAMES
  DETERMINISTIC across this round's TWO independent boots (identical
  md5s, run 1 + run 2; the boot-2 dashboard-desktop captured settled per
  the s221 donut-settle discipline — no race form this round). **Zero
  frames refreshed; HEAD's evidence set stays** (the deltas are
  rendering-stack properties, conclusively not code — the DOM censuses on
  the same surfaces byte-matched).
- **(N-2, methodology — THE ROUND'S ONE NEW CAPTURE-STATE LESSON) THE
  TAB-STATE CAPTURE MISS:** the round's first add-transaction-dialog
  capture answered a new md5 with 13,937 changed px (12,144 ABOVE the
  8-luminance threshold, bbox (558,289)–(953,708) spread across 396
  columns) — NOT a rendering genus. The root cause: the Income-tab census
  (the keyboard-activation probe) had run BEFORE the capture, and the
  frame captured the INCOME form state (different select family +
  submit label) instead of the default expense genus. Recaptured from a
  freshly-opened dialog in the default state, the frame answered the
  exact blur-column genus md5 `e5dd4c69`. **The discipline grows:
  state-probing (tab flips, filter changes, form fills) runs AFTER the
  frame capture, never before — or re-open the surface fresh before the
  capture.** The fourth capture-state lesson in the battery's history
  (after the s218 settle-waits, the s219 viewport re-pin, and the s221
  parked-cursor/viewport/donut family) — caught again by the battery's
  own classification machinery (the above-threshold count + the
  multi-column spread disproved a rendering genus), cured in-round.
- **(N-3) The reference's malformed-escape edge face HELD at 520**
  (thirteenth consecutive round, the documented probe form) — the genus
  unchanged, the face platform-owned, documented not remediated.
- **(N-4) The VLM battery: 2× "structural_differences: None"**
  (transactions-desktop — the s218-fixed surface answering clean for the
  fourth consecutive battery; budgets-desktop) + the other two pairs'
  flags all the documented DOM-disproven/data-borne/platform genera: the
  dashboard pair's savings-badge conditional ("88.5% saved" on ours,
  absent on the reference — DATA-BORNE, our seeded demo month vs the
  reference's owner data, disproven by the byte-matching DOM census on
  the same surface), and the transactions-mobile pair's "2-item bar" +
  row-layout flags (the documented platform-badge occlusion — disproven
  by this round's direct byte-census: all four anchors byte-matched on
  both apps — and the row-layout claim disproven by a fresh direct DOM
  cross-check: both apps answer the byte-identical row inner family
  `flex-1 min-w-0` > `div.flex.items-center.gap-2` > `p.font-medium
  text-slate-900 truncate` + the category badge; only the DATA differs).
  ZERO flags survived the cross-check this round.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The baseline gate: 416/416 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s221 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #30 + the dual-app diff — zero drift,
       the s207 fix verified for the fifteenth census, the deeper
       row-anatomy probe carried for the fourth census (§3).
4. [x] The screenshot battery + the TWO-BOOT stability proof — 9/12
       byte-identical + 3 delta frames at documented genera (N-1); zero
       frames refreshed; the tab-state capture lesson (N-2) identified,
       cured in-round, and written into the standing discipline.
5. [x] The VLM battery — 2× None + all other flags the documented
       DOM-disproven/data-borne/platform genera, zero surviving the
       cross-check (N-4).

**Phase B — the finding's remediation (TDD)**

6. [x] RED: `tests/docs-counts.test.ts` written with the canonical
       constants at the live 416/68/14 — failed exactly on the PAD's §7
       table (410 ≠ 416, 66 ≠ 68) while README/CLAUDE/SKILL passed —
       the regression test failing on the actual bug.
7. [x] GREEN: the PAD §7 table fixed (416/68 + the lockstep named in
       the Unit row's "what it proves" column) — the test green at
       416/68/14.
8. [x] The count movement: the guard adds 4 checks → the suite answers
       **420**; every live-tense surface updated in the SAME change set
       (README ×2, CLAUDE ×2, PAD §7, SKILL ×3, the test's own
       constant) — the suite verified 420/420 green; the lockstep is now
       mechanical (a future drift REDs the guard by design).

**Phase C — the documentation set + the ship**

9. [x] The docs-count lockstep verified at **420/68/14** live-tense
       across README/CLAUDE/PAD/SKILL (the guard now enforces it);
       AGENTS.md verified count-free.
10. [x] `budget-wiser_SKILL.md` → v1.31.0: the frontmatter version bump
        + the provenance gains the session-222 clause + Appendix C gains
        the session-222 row (including the tab-state capture lesson and
        the docs-count lockstep guard). Historical rows keep their era's
        numbers.
11. [x] The PAD → v2.32.0: the revision block records the thirtieth
        census — the docs-count finding + the lockstep guard, the
        zero-drift verification, the battery's two-boot proof, and the
        tab-state capture lesson.
12. [x] `docs/session_63.md` (this round's log — Task ID 222) + the
        `worklog.md` entry (Task ID 222, appended, never overwritten) +
        this plan ticked with the addendum.
13. [x] The dev server STOPPED + the browser CLOSED before the
        documentation phase; the full gate re-ran green (lint 0/0 ·
        typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68
        e2e, CI=1).
14. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) → commit (atomic, Conventional Commit,
        the message explains why) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py` (the runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
        `--remote` explicitly, the default remote is the OLD repo);
        verify the remote ref; shred the key.

## 6. Risks and guards

- **The count moved 416 → 420** (the lockstep guard itself adds 4
  checks): every live-tense surface updated in the same change set; the
  guard REDs on any future drift by design. The historical surfaces
  (the PAD's revision block, the SKILL's Appendix C, the session logs)
  deliberately keep their era's numbers — the guard parses only the
  live-tense claims.
- **The tab-state capture lesson joins the standing discipline** (N-2):
  state-probing runs AFTER the frame capture, never before — or re-open
  the surface fresh. Caught by the battery's own classification
  machinery (the above-threshold count + the multi-column spread), cured
  in-round — the machinery is the guard.
- **The settle-wait + capture-order + viewport-re-pin + cursor-neutral +
  default-state disciplines stay load-bearing** on every capture (≥3.5s
  the donut-bearing frames after a settled mount, ≥3s the dialogs, the
  dialog frames' ORIGIN SURFACES, the dashboard-mobile frame BEFORE any
  scroll probe, `set viewport` before every capture batch with
  `innerWidth` verified in-capture, `mouse move` to a neutral coordinate
  before every frame, and now: the frame captured in the surface's
  DEFAULT state before any state-flipping probe).
- **The battery's delta frames answered the cross-round-recorded genus
  md5s** (7705f2ca dashboard-desktop, 296c8736 transactions-mobile,
  e5dd4c69 add-transaction-dialog) — the NEXT round's HEAD comparison
  classifies against these (all deterministic across this round's two
  boots).
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

- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login) re-captured the three delta frames —
  dashboard-desktop `7705f2ca` × 2 (the settled form; the 25s
  fresh-login settle-wait applied, no race form this round),
  transactions-mobile `296c8736` × 2, add-transaction-dialog `e5dd4c69`
  × 2 (ALL DETERMINISTIC across the two independent boots).
- The tab-state cure verified in-round: the Income-tab-contaminated
  capture (13,937 changed px, 12,144 above threshold, 396 columns)
  re-answered the exact blur-column genus md5 `e5dd4c69` (16 px, the
  single x=590 column) after the fresh-default-state recapture.
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); pairs 2/3 (transactions-desktop, budgets-desktop) answered
  "None"; pairs 1/4's flags cross-checked against this round's direct
  byte-census + a fresh row-DOM cross-check before classification —
  the s204 "coarse signal, never a gate" posture held, with zero flags
  surviving the cross-check.
- The full gate re-ran green after the remediation + documentation work
  (lint 0/0 · typecheck 0 · **420/420 unit** · build · 14/14 smoke ·
  68/68 e2e CI=1) — the ship state at the new documented counts.
- The documentation set shipped: this plan (ticked + this addendum),
  the PAD v2.32.0 (the revision block), `budget-wiser_SKILL.md` v1.31.0
  (the frontmatter + the provenance's session-222 clause + Appendix C's
  session-222 row), `docs/session_63.md`, and the worklog entry (Task
  ID 222); the counts verified live-tense at **420/68/14** (the
  lockstep movement recorded in the same change set).
