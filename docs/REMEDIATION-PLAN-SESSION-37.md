# Budget Wise — Session 37 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 226 · **Branch:** `main` only · **Method:** the full census + evidence verification (the THIRTY-FOURTH census — the nineteenth after the s207 percent-encoding fix, the ninth after the s218 arrow remediation, and the EIGHTH carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was RESET (a fresh sandbox) — `git clone
  https://github.com/nordeim/budget-wiser.git` at `24c69ec` (the owner's
  `docs/session_70.md` transcript commit — the repo delta since the s225
  ship verified docs-only, one file); the environment REBUILT from
  first principles: `bun install` (513 packages), the six-knob `.env`
  created from the contract (`DATABASE_URL="file:../db/custom.db"` — the
  mandated form — plus a fresh 64-char `AUTH_SECRET`), `db:push` +
  `db:seed` (2 users / 4 transactions / 0 budgets — the reference demo
  month), and the Playwright Chromium headless-shell 1248 re-downloaded
  (the sandbox cache carried only 1200). agent-browser 0.40.0 verified.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.35.0**, `budget-wiser_SKILL.md` **v1.34.0**,
  `docs/session_69.md`, `docs/REMEDIATION-PLAN-SESSION-36.md`,
  `worklog.md`, and `docs/session_70.md` — all re-read and validated
  against the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-225 ship state, green on the first full pass, with the
  mobile-navigation battery additionally re-verified standalone at
  **12/12**.
- The local audit per `skills/web-application/SKILL.md` §16/§20: the
  security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME, no `any` leaks in `src/`; the
  three `src/` `console.*` hits answered as the documented sanctioned
  diagnostics — the two server-console OTP delivery lines + the dev-only
  AUTH_SECRET fallback warning), `src/middleware.ts` absent +
  `src/proxy.ts` in place (the s201 seam), `skills/` confirmed excluded
  from all four check/test/compile scopes (tsc exclude · eslint ignores ·
  vitest include `src|tests` only · playwright testDir `tests/e2e`), the
  literal-class discipline verified (all 15 `className={\`...\`}` hits are
  static-constant compositions over the `page-layout.ts` records — the
  literals statically extractable; the GRID_COLS static map the
  sanctioned pattern), the capital-alias `.jsx` stubs verified (the
  metadata re-exports present on Transactions/Budgets/Profile;
  /Dashboard metadata-less by design), the `outputFileTracingExcludes`
  artifact-hygiene pin verified, and the mandated focus areas each swept
  clean — the **mobile navigation** (the 12-test e2e battery green
  standalone + the live byte-census on BOTH apps) and **TailwindCSS v4**
  (the `@custom-variant hover` unwrap at globals.css:20, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block — 148
  `color-` pins, the `safe-area-pb` @utility, no config JS, no
  v4-family bugs found). The `.env`/`db` contract verified (six knobs in
  both files with identical knob names, `db/` at the repo root with
  `custom.db`, the seam pinned by `tests/db-path.test.ts`, `.env.example`
  tracked), the Vitest + Playwright suites verified in place with clean
  config scopes, the SEO surfaces verified (sitemap + robots + manifest
  explicit route handlers, the nine-route sitemap with the documented
  lowercase-loc divergence), the docs-count lockstep verified at
  **420/68/14** live-tense (the s222 guard green in the suite), and the
  neo-crm tech-stack lineage re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The finding

**ZERO code findings — a zero-drift verification round.** No reference
drift on any probed surface (§3); no gate movement; no count movement; no
security, correctness, or convention findings in the local audit (§1). The
round's one notable item is an evidence-class extension (N-2: the
blur-column genus answered NEITHER dialog frame — both dialog frames
byte-identical to HEAD across both boots, a third documented form of the
genus's alternation after the s223/s224/s225 period-2 pattern),
methodology not code — the battery's own classification machinery
surfaced it.

## 3. The live re-audit: the THIRTY-FOURTH census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the nineteenth census after the
  s207 percent-encoding fix, the ninth after the s218 arrow remediation,
  and the eighth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the NINETEENTH consecutive
  census:** the fresh `%20` probe (`/Curl%20Probe%20226%20Test`) answers
  the DECODED title `Curl Probe 226 Test | Budget Wise` on the reference
  AND on ours identically (ours with the real 404 status, curl-verified);
  the `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-226`) answers "Hyphen Probe 226 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
  `The page "Curl%20Probe%20226%20Test"` on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  SEVENTEENTH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback (curl-verified, title `%E0%A4%A |
  Budget Wise`).
- **The deeper row-anatomy probe carried for the eighth census:** the
  amount-wrapper's inner family read on BOTH row surfaces on BOTH apps at
  the list's full nesting depth — the reference's first list row answers
  the icon tile `p-2.5 rounded-xl bg-red-50 text-red-600` + the text
  column `flex-1 min-w-0` (the description `font-medium text-slate-900
  truncate` + the date `P.text-sm text-slate-500`) + the amount+delete
  group `flex items-center gap-4` > the amount block `flex items-center
  gap-2` > `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (−$1,200.00) inside the
  `flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row,
  and the dashboard recent form answers the `font-semibold
  text-rose-600` span (no text-lg) in the amount block `flex
  items-center gap-2` riding the `flex items-center gap-4 p-3
  rounded-xl hover:bg-slate-50 transition-colors` recent row; ours
  answers byte-identical classes on both surfaces plus the income form
  the seeded Salary row exercises — the s218 remediation VERIFIED at the
  exact depth where the genus lived, for the eighth consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0`
  + the outer `min-h-screen bg-slate-50` surface wrapper + the bare
  wrapper div), all four pages (containers 7xl/5xl/5xl/4xl, titles via
  FULL navigations — Dashboard "Budget Wise", the others "X | Budget
  Wise"), the mobile bottom bar byte-identical on every dimension (rect
  top=767 h=77, the row wrapper `flex items-center justify-around py-2`,
  the four anchors' classes `flex flex-col items-center gap-1 px-4 py-2
  rounded-xl transition-all text-slate-900|text-slate-400`, the ink
  split on the anchor AND its svg, the four w-6/h-6 lucide icons, NO
  aria-current on the reference), the scroll-end clearance (764 ≤ 767
  measured with the same all-boxes lowest-box form at scroll-end on BOTH
  apps), both dialogs (the expense genus with the reference's 8-option
  family incl. `value="health"`; the income family `other/salary/
  freelance/investment/gift` flipping cleanly on KEYBOARD activation —
  focus + Enter flipped the family and the submit label to "Add Income";
  ours answering the documented `healthcare`/`other_income`
  internal-wire genera with the visible LABEL families matching and our
  Radix Income tab flipping cleanly on a synthetic click), the Set
  Budget dialog (Category/Monthly Limit labels + the 0.00 placeholder),
  the sitemap format + robots.txt (curl-verified; the documented
  capitalized-loc divergence on the reference — `/`, `/Budgets`,
  `/Profile`, `/Transactions`; manifest 302 on the reference vs our 200
  functional superset), the login card (the 4-button OAuth row: Google,
  Microsoft, Facebook, Apple), and the donut geometry (200×200
  `g.recharts-pie` inside the 341×280 svg at the pinned viewport).
- **The reference's logged-out `/` face re-confirmed:** with the session
  cleared (cookies AND localStorage — the platform's dual-store token),
  the reference's `/` redirects to `/login?from_url=<abs>` — the
  reference ships NO public landing (ours is the documented functional
  superset).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-SIXTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each —
  both clean, zero reload loops, single `GET /login` per boot): every
  local surface matched the documented genera (the login card, the
  seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the "88.5%
  saved" badge — the documented data-borne divergence, the shell with
  our documented body-chrome platform-face genus — the hidden streaming
  marker + the surface wrapper + the Toaster portal + the route
  announcer, the mobile bar byte-identical + the aria-current/
  nav-landmark superset, the clearance identical at 764 ≤ 767, all
  titles matching, the 404 surface byte-matching with the real 404
  status + the decoded title + the encoded body + the raw-segment
  malformed-escape fallback, both dialogs matching with our
  `healthcare`/`other_income` internal-wire ids + our Radix Income tab
  flipping cleanly on a synthetic click, the SEO surfaces matching with
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
- The security sweep, the `skills/` exclusion, the capital-alias stubs
  (with the metadata re-exports), the `outputFileTracingExcludes`
  artifact-hygiene pin, the docs-count lockstep (the s222 guard green at
  420/68/14), the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the
  twenty-sixth consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F — none (zero code findings)

### N — informational notes (methodology, not code)

- **(N-1) The battery: 9/12 byte-identical + the three delta frames each
  at its documented genus, answered by the round's TWO-BOOT stability
  proof.** budgets-desktop, budgets-mobile, dashboard-mobile,
  landing-desktop, login-desktop, profile-desktop, set-budget-dialog,
  transactions-desktop, AND add-transaction-dialog all md5-identical to
  HEAD's `docs/screenshots/` set (the s219 viewport lesson applied —
  `set viewport` re-pinned before every capture batch; the s221 cursor
  discipline applied — `mouse move 5 500` before every frame; the s222
  tab-state lesson applied — every frame captured in its DEFAULT state
  before any state-flipping probe; the s223 origin-surface lesson
  applied — the add-transaction-dialog frame opened from the DASHBOARD's
  button, the set-budget-dialog frame from the BUDGETS page; the
  capture-order discipline held — the dashboard-mobile frame captured
  BEFORE the clearance scroll; the s221 donut-settle discipline applied —
  the 25s fresh-login settle-wait on both boots' dashboard-desktop
  frames). The three delta frames, classified by pixel-diff against
  HEAD: **dashboard-desktop answered the EXACT s219–s225-documented
  genus md5 `7705f2ca`** (49,170 changed px, ZERO above the
  8-luminance threshold, max delta lum 5.4/255, bbox (172,818)–(926,885)
  — the composite-variance genus answering for the EIGHTH consecutive
  round) and **transactions-mobile the EXACT `296c8736`** (5 changed px,
  max delta lum 1.0/255 — the sub-visible genus, also the eighth
  consecutive round); **profile-mobile answered `8c6e81e7`** (104
  changed px, ZERO above the threshold, max delta lum 6.2/255, bbox
  (84,255)–(234,376) — the avatar-jitter genus's mobile form, answered
  on BOTH boots this round). ALL THREE DETERMINISTIC across this round's
  TWO independent boots (identical md5s, run 1 + run 2). **Zero frames
  refreshed; HEAD's evidence set stays.**
- **(N-2) The evidence-class extension (the round's one notable
  observation): the blur-column genus answered NEITHER dialog frame.**
  Both dialog frames — add-transaction-dialog (md5 `458d7e5d`) AND
  set-budget-dialog (md5 `41fd22b1`) — answered HEAD's EXACT bytes on
  BOTH boots this round (set-budget-dialog re-verified at 0 changed px
  by pixel-diff). After the s223/s224/s225 period-2 frame-swap pattern
  (add-transaction → set-budget → add-transaction), the s226 round
  shows the genus's documented form set includes the ABSENT answer: on
  any given boot the genus answers one of its documented forms — the
  x=590 column on add-transaction-dialog, on set-budget-dialog, or on
  NEITHER frame. The per-FORM determinism discipline (s224's N-2) holds
  (whichever form answers is stable within the round across boots); the
  two-round-period prediction is refuted as a law — the alternation is
  stochastic across boots, not scheduled across rounds. The
  distinguishing signature stays what it was: the genus form is
  sub-threshold or single-column where a state difference answers tens
  of thousands of above-threshold px spread across hundreds of columns.
- **(N-3) The reference's malformed-escape edge face HELD at 520**
  (seventeenth consecutive round, the documented probe form) — the genus
  unchanged, the face platform-owned, documented not remediated.
- **(N-4) The VLM battery (4 pairs, the census JSON format): zero flags
  survived the cross-check.** Two "structural_differences: None" answers
  (transactions-desktop, budgets-desktop); the dashboard pair's
  "extra '88.5% saved' label" flag (DATA-BORNE, our seeded demo month
  vs the reference's owner data — the savings badge is a conditional
  render on data, disproven by the byte-matching DOM census on the same
  surface); the transactions-mobile pair's "5 vs 2 bar items" +
  transaction-layout flags (the documented platform-badge occlusion
  genus + data-borne row content — disproven by this round's direct
  byte-census: all four anchors byte-matched on both apps, the row inner
  family byte-identical). The s204 "coarse signal, never a gate"
  posture held (the None-count variance over an unchanged DOM — 2/4 this
  round after 1/4 at s225 — is itself documented).
- **(N-5) The reference's dual-store session note (carried from s225):**
  its token rides localStorage AND cookies — logged-out-surface probes
  on the reference clear BOTH stores (ours is the documented cookie-only
  HMAC seam).

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s225 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #34 + the dual-app diff — zero drift,
       the s207 fix verified for the nineteenth census, the deeper
       row-anatomy probe carried for the eighth census (§3).
4. [x] The screenshot battery + the TWO-BOOT stability proof — 9/12
       byte-identical + 3 delta frames at documented genera (N-1); zero
       frames refreshed; the blur-column genus answered NEITHER dialog
       frame (N-2).
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
8. [x] `budget-wiser_SKILL.md` → v1.35.0: the frontmatter version bump
        + the provenance gains the session-226 clause + Appendix C gains
        the session-226 row (including the blur-column genus's
        absent-form extension). Historical rows keep their era's
        numbers.
9. [x] The PAD → v2.36.0: the revision block records the thirty-fourth
        census — the zero-drift verification, the battery's two-boot
        proof, and the N-2 evidence-class extension.
10. [x] `docs/session_71.md` (this round's log — Task ID 226) + the
        `worklog.md` entry (Task ID 226, appended, never overwritten) +
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
- **The genus-form-alternation discipline (s224 N-2) extended (this
  round's N-2):** the blur-column genus's documented form set now
  includes the ABSENT answer (neither dialog frame carries the x=590
  column) — the alternation is stochastic across boots, not scheduled
  across rounds (the two-round period is refuted as a law); the
  per-FORM determinism within a round holds; the sub-threshold
  signature (zero above the 8-luminance bar, confined bbox, no
  multi-column spread) remains what distinguishes a genus answer from a
  state difference.
- **The settle-wait + capture-order + viewport-re-pin + cursor-neutral +
  default-state + origin-surface disciplines stay load-bearing** on every
  capture (≥3.5s the donut-bearing frames after a settled mount, ≥3s the
  dialogs, the 25s fresh-login settle-wait on dashboard-desktop frames,
  the dashboard-mobile frame BEFORE any scroll probe, `set viewport`
  before every capture batch, `mouse move` to a neutral coordinate
  before every frame, the frame in the surface's DEFAULT state before
  any state-flipping probe, and the dialog opened from its documented
  ORIGIN surface).
- **The reference's dual-store session (N-5):** logged-out-surface probes
  on the reference clear cookies AND localStorage.
- **The battery's delta frames answered the cross-round-recorded genus
  md5s** (7705f2ca dashboard-desktop, 296c8736 transactions-mobile —
  both eighth consecutive round; 8c6e81e7 profile-mobile mobile-jitter
  form) — the NEXT round's HEAD comparison classifies against these
  (all three deterministic across this round's two boots).
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

- The reset-workspace intake (the sandbox was recycled): `git clone` at
  `24c69ec`; the environment rebuilt (bun install 513 packages, the
  six-knob `.env` with a fresh `AUTH_SECRET`, `db:push` + `db:seed`
  — the demo month verified live by the KPI census $4,424.55 /
  $5,000.00 / $575.45 / 4 txns / "88.5% saved"; the Playwright Chromium
  headless-shell 1248 re-downloaded after the first e2e leg failed on
  the missing executable — the sandbox cache carried only 1200; the
  leg then re-ran green 68/68).
- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login with the 25s settle-wait) re-captured the
  four candidate delta frames — dashboard-desktop `7705f2ca` × 2 (the
  settled form), transactions-mobile `296c8736` × 2, profile-mobile
  `8c6e81e7` × 2, add-transaction-dialog `458d7e5d` × 2 (HEAD's exact
  bytes) — plus set-budget-dialog `41fd22b1` × 2 (HEAD's exact bytes,
  0 changed px by pixel-diff). ALL frames deterministic across the two
  independent boots.
- The blur-column genus's absent-form answer: BOTH dialog frames
  byte-identical to HEAD on both boots — after s223 (add-transaction),
  s224 (set-budget), and s225 (add-transaction), the s226 round answers
  NEITHER; the genus's form set now documents three forms (the column
  on either dialog frame, or absent), and the round-to-round alternation
  is stochastic, not scheduled.
- The reference's Income-tab probe required KEYBOARD activation again
  this round (focus + Enter) — the synthetic click stays inert on the
  reference's tab control (the documented s203 methodology footnote);
  our Radix Income tab flipped cleanly on the synthetic click (the
  documented superset posture).
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); every pair's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check.
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the held counts.
- The documentation set shipped: this plan (ticked + this addendum), the
  PAD v2.36.0 (the revision block), `budget-wiser_SKILL.md` v1.35.0
  (the frontmatter + the provenance's session-226 clause + Appendix
  C's session-226 row), `docs/session_71.md`, and the worklog entry
  (Task ID 226); the counts verified live-tense at **420/68/14**.
