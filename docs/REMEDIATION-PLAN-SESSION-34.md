# Budget Wise — Session 34 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 223 · **Branch:** `main` only · **Method:** the full census + evidence verification (the THIRTY-FIRST census — the sixteenth after the s207 percent-encoding fix, the sixth after the s218 arrow remediation, and the fifth carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the twelfth reset) — the fresh-clone
  bootstrap exercised live (clone at `2228063`, the owner's
  `docs/session_64.md` transcript commit atop the s222 ship `8853b22`; the
  repo delta since the ship verified docs-only, one file); the standing
  environment rebuilt (bun 1.3.14, the 513-package `node_modules`, the
  six-knob `.env` with `DATABASE_URL="file:../db/custom.db"` — the mandated
  contract — a fresh `AUTH_SECRET`, the seeded `db/` at the repo root, and
  the Chromium revision step: the pinned headless-shell 1248 re-downloaded
  after the reset, agent-browser 0.40.0).
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.32.0**, `budget-wiser_SKILL.md` **v1.31.0`,
  `docs/session_63.md`, `docs/REMEDIATION-PLAN-SESSION-33.md`,
  `worklog.md`, and `docs/session_64.md` — all re-read and validated
  against the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-222 ship state, green on the first full pass, with the
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
  literal-class discipline verified (every `className={\`...\`}` hit is a
  static-constant composition over the `page-layout.ts` records — the
  literals remain statically extractable; the GRID_COLS static map is the
  sanctioned pattern), the capital-alias `.jsx` stubs verified (the
  metadata re-exports present; /Dashboard metadata-less by design), and
  the mandated focus areas each swept clean — the **mobile navigation**
  (the 12-test e2e battery green standalone + the live byte-census on BOTH
  apps) and **TailwindCSS v4** (the `@custom-variant hover` unwrap at
  globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the
  v3 palette re-pin block at :252+, the `safe-area-pb` @utility at :405,
  no config JS, no v4-family bugs found). The `.env`/`db` contract
  verified (six knobs in both files, `db/` at the repo root, the seam
  pinned by `tests/db-path.test.ts`, `.env.example` tracked with identical
  knob names), the Vitest + Playwright suites verified in place with clean
  config scopes, the SEO surfaces verified (sitemap + robots + manifest
  explicit route handlers), the docs-count lockstep verified at
  **420/68/14** live-tense (the s222 guard green in the suite), and the
  neo-crm tech-stack lineage re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The finding

**ZERO code findings — a zero-drift verification round.** No reference
drift on any probed surface (§3); no gate movement; no count movement; no
security, correctness, or convention findings in the local audit (§1). The
round's one NEW item is a capture-state methodology lesson (N-2), not a
code defect — the battery's own classification machinery caught it, the
cure was applied in-round, and it is written into the standing discipline
(SKILL §1 + this plan + the session log).

## 3. The live re-audit: the THIRTY-FIRST census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the sixteenth census after the
  s207 percent-encoding fix, the sixth after the s218 arrow remediation,
  and the fifth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the SIXTEENTH consecutive
  census:** the fresh `%20` probe (`/Curl%20Probe%20223%20Test`) answers
  the DECODED title `Curl Probe 223 Test | Budget Wise` on the reference
  AND on ours identically (ours with the real 404 status, curl-verified);
  the `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-223`) answers "Hyphen Probe 223 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps
  (`quotesEncoded: true, quotesDecoded: false` probed on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  FOURTEENTH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the never-throw
  raw-segment fallback (curl-verified).
- **The deeper row-anatomy probe (fifth carry):** the amount-wrapper's
  inner family read on BOTH row surfaces on BOTH apps — the reference
  answers `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (the /Transactions list,
  wrapper `flex items-center gap-4`) and the `font-semibold
  text-rose-600` recent form (the dashboard list, wrapper `flex
  items-center gap-2`); ours answers byte-identical classes on both
  surfaces PLUS the income form (`lucide lucide-arrow-up-right w-4 h-4
  text-emerald-500` + the emerald amounts) the seeded Salary row
  exercises — the s218 remediation VERIFIED at the exact depth where the
  genus lived, for the fifth consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0`
  + the outer `min-h-screen bg-slate-50` surface wrapper + the bare
  wrapper div), all four pages (containers 7xl/5xl/5xl/4xl, titles via
  FULL navigations — Dashboard "Budget Wise", the others "X | Budget
  Wise"), the mobile bottom bar byte-identical on every dimension (rect
  top=767 h=77, the row wrapper `flex items-center justify-around py-2`,
  the four anchors' classes, the ink split on the anchor AND its svg,
  the four w-6/h-6 lucide icons, NO aria-current on the reference), the
  scroll-end clearance (764 ≤ 767 measured with the same all-boxes
  lowest-box form at scroll-end on BOTH apps), both dialogs (the expense
  genus with the reference's 8-option family incl. `value="health"`; the
  income family `other/salary/freelance/investment/gift` flipping cleanly
  on keyboard activation, the submit label flipping to "Add Income"; ours
  answering the documented `healthcare`/`other_income` internal-wire
  genera with our Radix Income tab flipping cleanly on a synthetic
  click), the Set Budget dialog (Category/Monthly Limit labels + the
  0.00 placeholder), the sitemap format + robots.txt (curl-verified; the
  documented capitalized-loc divergence on the reference; manifest 302
  on the reference vs our 200 functional superset), the login card (the
  4-button OAuth row: Google, Microsoft, Facebook, Apple), and the donut
  geometry (341×280 container / 200×200 `g.recharts-pie`).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-THIRD consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each —
  both clean, zero reload loops, single `GET /login` per boot): every
  local surface matched the documented genera (the login card, the
  seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the
  "88.5% saved" badge — the documented data-borne divergence, the shell
  with our documented body-chrome platform-face genus (the hidden
  streaming div + the Toaster portal + the route announcer +
  `#recharts_measurement_span`), the mobile bar byte-identical + the
  aria-current/nav-landmark superset, the clearance identical, all
  titles matching, the 404 surface byte-matching with the real 404
  status, both dialogs matching, the SEO surfaces matching with the
  documented lowercase-loc divergence, the donut geometry
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
- The security sweep, the `skills/` exclusion, the capital-alias stubs
  (with the metadata re-exports), the `outputFileTracingExcludes`
  artifact-hygiene pin, the docs-count lockstep (the s222 guard green at
  420/68/14), the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the
  twenty-third consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F — none (zero code findings)

### N — informational notes (methodology, not code)

- **(N-1) The battery: 8/12 byte-identical + the four delta frames each
  at its documented genus, each answered by the round's TWO-BOOT
  stability proof.** budgets-desktop, budgets-mobile, dashboard-mobile,
  landing-desktop, login-desktop, profile-desktop, set-budget-dialog,
  and transactions-desktop all md5-identical to HEAD's
  `docs/screenshots/` set. The four delta frames, classified by
  pixel-diff against HEAD: **dashboard-desktop answered the EXACT
  s219–s222-recorded genus md5 `7705f2ca`** (the composite-variance
  genus answering for the FIFTH consecutive round) and
  **transactions-mobile the EXACT `296c8736`** (the sub-visible genus,
  also the fifth consecutive round) — both genus-md5-across-environments
  answers; **add-transaction-dialog answered `e5dd4c69`** (16 changed
  px, 100% confined to the single x=590 column, bbox (590,381)–(590,396)
  — the s212/s213/s220/s222 blur-column genus at the Dashboard-origin
  capture state); **profile-mobile answered `8c6e81e7`** (120 changed
  px, ZERO above the 8-luminance threshold, max delta lum 6.0/255 — the
  avatar-jitter genus's mobile form; the genus's documented
  one-shot/HEAD-identical dichotomy answering the mobile form this
  round, HEAD's exact bytes at s222 — the round-to-round alternation the
  genus documents). ALL FOUR DELTA FRAMES DETERMINISTIC across this
  round's TWO independent boots (identical md5s, run 1 + run 2; the
  boot-2 dashboard-desktop captured settled per the s221 donut-settle
  discipline — the 25s fresh-login settle-wait applied, no race form
  this round). **Zero frames refreshed; HEAD's evidence set stays.**
- **(N-2, methodology — THE ROUND'S ONE NEW CAPTURE-STATE LESSON) THE
  ORIGIN-SURFACE CAPTURE MISS:** the round's first add-transaction-dialog
  capture answered a new md5 with 523,672 changed px (72,315 ABOVE the
  8-luminance threshold, bbox (149,14)–(1363,942) spread across 939
  columns) — NOT a rendering genus. The root cause: the dialog had been
  opened from the TRANSACTIONS page, while HEAD's frame is a
  DASHBOARD-origin capture (the s218 refresh note documents the frame's
  blurred DASHBOARD backdrop) — the dimmed page content behind the dialog
  differs by origin, so a wrong-origin capture diffs the whole backdrop
  region (the dialog's own white span verified identical, x 532..979 in
  both). Re-captured with the dialog opened from the Dashboard's "Add
  Transaction" button, the frame answered the exact blur-column genus
  md5 `e5dd4c69` (16 px, the single x=590 column). **The discipline
  grows: the ORIGIN SURFACE is part of a dialog frame's capture state —
  pin it to the documented origin (the add-transaction-dialog frame is
  Dashboard-origin; the set-budget-dialog frame is Budgets-origin), or
  classify the backdrop region before trusting a whole-frame delta.** The
  fifth capture-state lesson family member (after the s218 settle-waits,
  the s219 viewport re-pin, the s221 parked-cursor/viewport/donut
  family, and the s222 tab-state miss) — caught again by the battery's
  own classification machinery (the above-threshold count + the
  multi-column spread pattern is the state-difference signature),
  cured in-round.
- **(N-3) The reference's malformed-escape edge face HELD at 520**
  (fourteenth consecutive round, the documented probe form) — the genus
  unchanged, the face platform-owned, documented not remediated.
- **(N-4) The VLM battery (4 pairs, the census JSON format): pairs 2/3
  answered platform-badge flags and pairs 1/4 platform/data-borne flags —
  zero "None" answers this round, ZERO flags surviving the cross-check.**
  The dashboard pair's savings-badge conditional + donut-segment flags
  (DATA-BORNE — our seeded demo month vs the reference's owner data,
  disproven by the byte-matching DOM census on the same surface); the
  transactions-desktop and budgets-desktop pairs' "Edit with Base44"
  floating-widget flags (the reference's PLATFORM badge,
  `#base44-edit-badge` in the body census, not app UI); the
  transactions-mobile pair's bar-occlusion + category-label flags (the
  documented platform-badge occlusion — disproven by this round's direct
  byte-census: all four anchors byte-matched on both apps — and the
  data-borne row content, disproven by the byte-identical row inner
  family census; only the DATA differs). The s204 "coarse signal, never
  a gate" posture held.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s222 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #31 + the dual-app diff — zero drift,
       the s207 fix verified for the sixteenth census, the deeper
       row-anatomy probe carried for the fifth census (§3).
4. [x] The screenshot battery + the TWO-BOOT stability proof — 8/12
       byte-identical + 4 delta frames at documented genera (N-1); zero
       frames refreshed; the origin-surface capture lesson (N-2)
       identified, cured in-round, and written into the standing
       discipline.
5. [x] The VLM battery — all flags the documented DOM-disproven/
       data-borne/platform genera, zero surviving the cross-check (N-4).

**Phase B — the round's finding (none: a zero-code-finding round)**

6. [x] No code remediation required — zero code findings; no gate
       movement; no count movement (the counts hold at 420/68/14, the
       s222 lockstep guard green in the suite).

**Phase C — the documentation set + the ship**

7. [x] The docs-count lockstep verified at **420/68/14** live-tense
       across README/CLAUDE/PAD/SKILL (the guard enforces it);
       AGENTS.md verified count-free.
8. [x] `budget-wiser_SKILL.md` → v1.32.0: the frontmatter version bump
        + the provenance gains the session-223 clause + Appendix C gains
        the session-223 row (including the origin-surface capture
        lesson). Historical rows keep their era's numbers.
9. [x] The PAD → v2.33.0: the revision block records the thirty-first
        census — the zero-drift verification, the battery's two-boot
        proof, and the origin-surface capture lesson.
10. [x] `docs/session_65.md` (this round's log — Task ID 223) + the
        `worklog.md` entry (Task ID 223, appended, never overwritten) +
        this plan ticked with the addendum.
11. [x] The dev server STOPPED + the browser CLOSED before the
        documentation phase; the full gate re-ran green (lint 0/0 ·
        typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68
        e2e, CI=1).
12. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) → commit (atomic, Conventional Commit,
        the message explains why) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py` (the runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
        `--remote` explicitly, the default remote is the OLD repo);
        verify the remote ref; shred the key.

## 6. Risks and guards

- **No count movement this round** (420/68/14 held): the s222 docs-count
  lockstep guard stays green — a future drift REDs it by design.
- **The origin-surface lesson joins the standing discipline** (N-2): the
  dialog frames' ORIGIN SURFACES are pinned (add-transaction-dialog is
  Dashboard-origin — its blurred backdrop is the Dashboard; the
  set-budget-dialog frame is Budgets-origin); a wrong-origin capture
  answers a whole-backdrop state difference, and the classification
  machinery (above-threshold count + multi-column spread) is the guard
  that catches it.
- **The settle-wait + capture-order + viewport-re-pin + cursor-neutral +
  default-state + origin-surface disciplines stay load-bearing** on every
  capture (≥3.5s the donut-bearing frames after a settled mount, ≥3s the
  dialogs, the dashboard-mobile frame BEFORE any scroll probe, `set
  viewport` before every capture batch with `innerWidth` verified
  in-capture, `mouse move` to a neutral coordinate before every frame,
  the frame in the surface's DEFAULT state before any state-flipping
  probe, and the dialog opened from its documented ORIGIN surface).
- **The battery's delta frames answered the cross-round-recorded genus
  md5s** (7705f2ca dashboard-desktop, 296c8736 transactions-mobile,
  e5dd4c69 add-transaction-dialog, 8c6e81e7 profile-mobile) — the NEXT
  round's HEAD comparison classifies against these (all deterministic
  across this round's two boots).
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

- The fresh-clone bootstrap (the twelfth reset): clone at `2228063`,
  bun install (513 packages), the six-knob `.env` written with a fresh
  `AUTH_SECRET` (`openssl rand -hex 32`), `db:push` + `db:seed` (the
  seeded demo month: 4 txns, balance $4,424.55), and the Chromium
  headless-shell 1248 re-downloaded after the reset cleared
  `~/.cache/ms-playwright` (the first e2e attempt failed on the missing
  executable — the revision step is part of the fresh-workspace
  posture).
- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login) re-captured the four delta frames —
  dashboard-desktop `7705f2ca` × 2 (the settled form; the 25s
  fresh-login settle-wait applied, no race form this round),
  transactions-mobile `296c8736` × 2, profile-mobile `8c6e81e7` × 2,
  add-transaction-dialog `e5dd4c69` × 2 (ALL DETERMINISTIC across the
  two independent boots).
- The origin-surface cure verified in-round: the Transactions-origin
  add-transaction-dialog capture (523,672 changed px, 72,315 above
  threshold, 939 columns — the dialog's own white span identical at
  x 532..979, the diff concentrated in the dimmed backdrop bands x
  200–500 and x 1000–1300 where the origin pages' content differs)
  re-answered the exact blur-column genus md5 `e5dd4c69` (16 px, the
  single x=590 column) after the Dashboard-origin recapture.
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); every pair's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check.
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the held counts.
- The documentation set shipped: this plan (ticked + this addendum), the
  PAD v2.33.0 (the revision block), `budget-wiser_SKILL.md` v1.32.0
  (the frontmatter + the provenance's session-223 clause + Appendix C's
  session-223 row + §1's origin-surface discipline),
  `docs/session_65.md`, and the worklog entry (Task ID 223); the counts
  verified live-tense at **420/68/14**.
