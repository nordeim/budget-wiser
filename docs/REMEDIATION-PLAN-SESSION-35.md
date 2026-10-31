# Budget Wise — Session 35 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 224 · **Branch:** `main` only · **Method:** the full census + evidence verification (the THIRTY-SECOND census — the seventeenth after the s207 percent-encoding fix, the seventh after the s218 arrow remediation, and the sixth carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT this round (no reset — the thirteenth
  workspace state is the first un-reset one since s212): `git pull` fast-forwarded
  `0ebb1f3..93cb315` (the owner's `docs/session_66.md` transcript commit, one
  file, docs-only); the standing environment verified in place (bun 1.3.14,
  the populated `node_modules`, the six-knob `.env` with
  `DATABASE_URL="file:../db/custom.db"` — the mandated contract — the seeded
  `db/` at the repo root, and the Chromium headless-shell 1248 present —
  no re-download needed); agent-browser 0.40.0.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.33.0**, `budget-wiser_SKILL.md` **v1.32.0**,
  `docs/session_65.md`, `docs/REMEDIATION-PLAN-SESSION-34.md`,
  `worklog.md`, and `docs/session_66.md` — all re-read and validated
  against the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-223 ship state, green on the first full pass, with the
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
  metadata re-exports present; /Dashboard metadata-less by design), the
  `outputFileTracingExcludes` artifact-hygiene pin verified, and the
  mandated focus areas each swept clean — the **mobile navigation**
  (the 12-test e2e battery green standalone + the live byte-census on BOTH
  apps) and **TailwindCSS v4** (the `@custom-variant hover` unwrap at
  globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the
  v3 palette re-pin block, the `safe-area-pb` @utility at :405, no config
  JS, no v4-family bugs found). The `.env`/`db` contract verified (six
  knobs in both files, `db/` at the repo root, the seam pinned by
  `tests/db-path.test.ts`, `.env.example` tracked with identical knob
  names), the Vitest + Playwright suites verified in place with clean
  config scopes, the SEO surfaces verified (sitemap + robots + manifest
  explicit route handlers), the docs-count lockstep verified at
  **420/68/14** live-tense (the s222 guard green in the suite), and the
  neo-crm tech-stack lineage re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The finding

**ZERO code findings — a zero-drift verification round.** No reference
drift on any probed surface (§3); no gate movement; no count movement; no
security, correctness, or convention findings in the local audit (§1). The
round's one NEW item is an evidence-class extension (N-2: the
genus-form-alternation-across-boots observation on the avatar-jitter
genus), methodology not code — the battery's own classification machinery
surfaced it, both observed forms are documented genus answers, and the
observation is written into the standing discipline.

## 3. The live re-audit: the THIRTY-SECOND census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the seventeenth census after the
  s207 percent-encoding fix, the seventh after the s218 arrow remediation,
  and the sixth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the SEVENTEENTH consecutive
  census:** the fresh `%20` probe (`/Curl%20Probe%224%20Test`) answers the
  DECODED title `Curl Probe 224 Test | Budget Wise` on the reference AND on
  ours identically (ours with the real 404 status, curl-verified); the
  `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-224`) answers "Hyphen Probe 224 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
  `quotesEncoded: true, quotesDecoded: false` on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  FIFTEENTH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the never-throw
  raw-segment fallback (curl-verified).
- **The deeper row-anatomy probe (sixth carry):** the amount-wrapper's
  inner family read on BOTH row surfaces on BOTH apps — the reference
  answers `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (the /Transactions list,
  amount block `flex items-center gap-2` inside the `flex items-center
  gap-4` amount+delete group inside the `gap-4 p-4 hover:bg-slate-50`
  row) and the `font-semibold text-rose-600` recent form (the dashboard
  list, amount block `flex items-center gap-2`); ours answers
  byte-identical classes on both surfaces PLUS the income form
  (`lucide lucide-arrow-up-right w-4 h-4 text-emerald-500` + the emerald
  amounts `+$5,000.00`) the seeded Salary row exercises — the s218
  remediation VERIFIED at the exact depth where the genus lived, for the
  sixth consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0`
  + the outer `min-h-screen bg-slate-50` surface wrapper + the bare
  wrapper div), all four pages (containers 7xl/5xl/5xl/4xl, titles via
  FULL navigations — Dashboard "Budget Wise", the others "X | Budget
  Wise"), the mobile bottom bar byte-identical on every dimension (rect
  top=767 h=77, the row wrapper `flex items-center justify-around py-2`,
  the four anchors' classes, the ink split on the anchor AND its svg, the
  four w-6/h-6 lucide icons, NO aria-current on the reference), the
  scroll-end clearance (764 ≤ 767 measured with the same all-boxes
  lowest-box form at scroll-end on BOTH apps), both dialogs (the expense
  genus with the reference's 8-option family incl. `value="health"`; the
  income family `other/salary/freelance/investment/gift` flipping cleanly
  on tab activation, the submit label flipping to "Add Income"; ours
  answering the documented `healthcare`/`other_income` internal-wire
  genera with the visible LABEL families matching — Food & Dining,
  Transport, Entertainment, Shopping, Bills & Utilities, Healthcare,
  Education, Other — and our Radix Income tab flipping cleanly on a
  synthetic click), the Set Budget dialog (Category/Monthly Limit labels
  + the 0.00 placeholder), the sitemap format + robots.txt
  (curl-verified; the documented capitalized-loc divergence on the
  reference; manifest 302 on the reference vs our 200 functional
  superset), the login card (the 4-button OAuth row: Google, Microsoft,
  Facebook, Apple), and the donut geometry (200×200 `g.recharts-pie` at
  the pinned viewport).
- **The reference's logged-out `/` face re-confirmed:** with the session
  cleared, the reference's `/` redirects to
  `/login?from_url=<abs>` — the reference ships NO public landing (ours
  is the documented functional superset; our landing frame is
  battery-verified against our own HEAD evidence set).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-FOURTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each —
  both clean, zero reload loops, single `GET /login` per boot): every
  local surface matched the documented genera (the login card, the seeded
  demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the "88.5% saved"
  badge — the documented data-borne divergence, the shell with our
  documented body-chrome platform-face genus, the mobile bar
  byte-identical + the aria-current/nav-landmark superset, the clearance
  identical at 764 ≤ 767, all titles matching, the 404 surface
  byte-matching with the real 404 status, both dialogs matching with our
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
  twenty-fourth consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F — none (zero code findings)

### N — informational notes (methodology, not code)

- **(N-1) The battery: 7/12 byte-identical + the five delta frames each
  at a documented genus, answered by the round's TWO-BOOT stability
  proof.** add-transaction-dialog, budgets-desktop, budgets-mobile,
  dashboard-mobile, landing-desktop, login-desktop, and
  transactions-desktop all md5-identical to HEAD's `docs/screenshots/`
  set (the s219 viewport lesson applied — `set viewport` re-pinned before
  every capture batch, `innerWidth` verified in-capture; the s221 cursor
  discipline applied — `mouse move 5 500` before every frame; the s222
  tab-state lesson applied — every frame captured in its DEFAULT state
  before any state-flipping probe; the s223 origin-surface lesson applied
  — the add-transaction-dialog frame opened from the DASHBOARD's button,
  the set-budget-dialog frame from the BUDGETS page; the capture-order
  discipline held — the dashboard-mobile frame captured BEFORE the
  clearance scroll). The five delta frames, classified by pixel-diff
  against HEAD: **dashboard-desktop answered the EXACT
  s219–s223-documented genus md5 `7705f2ca`** (49,248 changed px, ZERO
  above the 8-luminance threshold, max delta lum 5.4/255, bbox
  (172,818)–(926,885) — the composite-variance genus answering for the
  SIXTH consecutive round) and **transactions-mobile the EXACT
  `296c8736`** (5 changed px, max delta lum 1.0/255, ZERO above
  thresholds — the sub-visible genus, also the sixth consecutive round);
  **profile-desktop answered `3d5173c8`** (105 changed px, ZERO above
  the 8-luminance threshold, max delta lum 4.9/255, bbox
  (357,255)–(504,373) — the avatar-jitter genus's DESKTOP form; the
  genus's documented one-shot/HEAD-identical dichotomy — HEAD's exact
  bytes at s222/s223, the desktop jitter form this round);
  **profile-mobile answered `8c6e81e7` on boot 1** (120 changed px,
  ZERO above the 8-luminance threshold, max delta lum 6.2/255, bbox
  (84,255)–(234,376) — the avatar-jitter genus's mobile form) **and
  HEAD's EXACT BYTES on boot 2** (zero changed px — see N-2);
  **set-budget-dialog answered `e428c8e8`** (16 changed px, 100%
  confined to the single x=590 column, bbox (590,519)–(590,534), the
  dark(10,10,10)↔white(255,255,255) flip — the blur-column genus at the
  Set Budget dialog's y-offset; the genus previously documented only on
  the add-transaction-dialog frame, which itself answered HEAD's EXACT
  bytes this round — the two dialog frames alternate the genus form
  round-to-round). FOUR of the five delta frames DETERMINISTIC across
  this round's TWO independent boots (identical md5s, run 1 + run 2; the
  boot-2 dashboard-desktop captured settled per the s221 donut-settle
  discipline — the 25s fresh-login settle-wait applied, no race form
  this round); the fifth (profile-mobile) answered the genus's two
  documented FORMS across the two boots (N-2). **Zero frames refreshed;
  HEAD's evidence set stays.**
- **(N-2, methodology — THE ROUND'S ONE NEW OBSERVATION) THE
  GENUS-FORM ALTERNATION OBSERVED ACROSS BOOTS WITHIN ONE ROUND:** the
  avatar-jitter genus's documented one-shot/HEAD-identical dichotomy had
  only ever been observed ROUND-TO-ROUND (HEAD's exact bytes at s222,
  the mobile form at s223); this round's two-boot proof caught it
  BOOT-TO-BOOT inside a single round — profile-mobile answered the
  jitter mobile form `8c6e81e7` on boot 1 and HEAD's EXACT bytes (zero
  changed px) on boot 2, both forms sub-threshold and confined to the
  avatar bbox ((84,255)–(234,376) mobile / (357,255)–(504,373)
  desktop). **The discipline refines: a delta frame's two-boot
  determinism claim holds per-FORM — the avatar-jitter genus is
  deterministic in that it answers ONE OF ITS TWO DOCUMENTED FORMS on
  any given boot (the jitter render or HEAD's exact bytes); a boot-pair
  that answers different forms is the genus's own dichotomy, NOT a
  capture-state miss — distinguish it from a state difference by the
  sub-threshold signature (zero above the 8-luminance bar, confined
  bbox, no multi-column spread).** The blur-column genus answered the
  same alternation ACROSS FRAMES this round (set-budget-dialog carried
  the 16-px x=590 column where add-transaction-dialog carried HEAD's
  bytes — s223 answered the mirror image), extending the
  genus-md5-across-environments evidence class with a second
  frame-swapped pair.
- **(N-3) The reference's malformed-escape edge face HELD at 520**
  (fifteenth consecutive round, the documented probe form) — the genus
  unchanged, the face platform-owned, documented not remediated.
- **(N-4) The VLM battery (4 pairs, the census JSON format): two
  "structural_differences: None" answers (transactions-desktop,
  budgets-desktop) + the other two pairs' flags all the documented
  data-borne/platform genera.** The dashboard pair's savings-badge +
  donut-segment flags (DATA-BORNE — our seeded demo month vs the
  reference's owner data, disproven by the byte-matching DOM census on
  the same surface); the transactions-mobile pair's bar-occlusion +
  row-content flags (the documented platform-badge occlusion —
  disproven by this round's direct byte-census: all four anchors
  byte-matched on both apps — and the data-borne row content,
  disproven by the byte-identical row inner family census; only the
  DATA differs). The s204 "coarse signal, never a gate" posture held.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s223 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #32 + the dual-app diff — zero drift,
       the s207 fix verified for the seventeenth census, the deeper
       row-anatomy probe carried for the sixth census (§3).
4. [x] The screenshot battery + the TWO-BOOT stability proof — 7/12
       byte-identical + 5 delta frames at documented genera (N-1); zero
       frames refreshed; the genus-form-alternation-across-boots
       observation (N-2) recorded into the standing discipline.
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
8. [x] `budget-wiser_SKILL.md` → v1.33.0: the frontmatter version bump
        + the provenance gains the session-224 clause + Appendix C gains
        the session-224 row (including the genus-form-alternation
        observation). Historical rows keep their era's numbers.
9. [x] The PAD → v2.34.0: the revision block records the thirty-second
        census — the zero-drift verification, the battery's two-boot
        proof, and the genus-form-alternation observation.
10. [x] `docs/session_67.md` (this round's log — Task ID 224) + the
        `worklog.md` entry (Task ID 224, appended, never overwritten) +
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
- **The genus-form-alternation refinement joins the standing discipline**
  (N-2): the avatar-jitter genus answers one of its two documented forms
  per boot (the jitter render or HEAD's exact bytes) — a boot-pair
  answering different forms is the genus's dichotomy, not a
  capture-state miss; the sub-threshold signature (zero above the
  8-luminance bar, confined bbox, no multi-column spread) is what
  distinguishes it from a state difference. The blur-column genus
  alternates the same way ACROSS the two dialog frames (the frame that
  carries the 16-px x=590 column can be either dialog; the other
  answers HEAD's bytes).
- **The settle-wait + capture-order + viewport-re-pin + cursor-neutral +
  default-state + origin-surface disciplines stay load-bearing** on every
  capture (≥3.5s the donut-bearing frames after a settled mount, ≥3s the
  dialogs, the dashboard-mobile frame BEFORE any scroll probe, `set
  viewport` before every capture batch with `innerWidth` verified
  in-capture, `mouse move` to a neutral coordinate before every frame,
  the frame in the surface's DEFAULT state before any state-flipping
  probe, and the dialog opened from its documented ORIGIN surface).
- **The battery's delta frames answered the cross-round-recorded genus
  md5s** (7705f2ca dashboard-desktop, 296c8736 transactions-mobile —
  both sixth consecutive round; 3d5173c8 profile-desktop desktop-jitter
  form; 8c6e81e7 profile-mobile mobile-jitter form; e428c8e8
  set-budget-dialog blur-column form) — the NEXT round's HEAD comparison
  classifies against these (the first four deterministic across this
  round's two boots; profile-mobile's pair answered the two documented
  genus forms).
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

- The intact-workspace intake (the first un-reset round since s212):
  `git pull` fast-forward `0ebb1f3..93cb315` (docs-only, one file); the
  environment verified rather than rebuilt (bun 1.3.14, node_modules,
  the six-knob `.env`, the seeded `db/custom.db` + `db/e2e.db` +
  `db/smoke.db`, Chromium headless-shell 1248 present); no
  re-download, no re-seed needed — the db:seed state verified live by
  the KPI census ($4,424.55 / $5,000.00 / $575.45 / 4 txns / "88.5%
  saved").
- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login with the 25s settle-wait) re-captured the
  five delta frames — dashboard-desktop `7705f2ca` × 2 (the settled
  form; the 25s fresh-login settle-wait applied, no race form this
  round), transactions-mobile `296c8736` × 2, profile-desktop
  `3d5173c8` × 2, set-budget-dialog `e428c8e8` × 2 (FOUR deterministic
  across the two independent boots), and profile-mobile `8c6e81e7`
  (boot 1) → HEAD's exact bytes (boot 2, zero changed px) — the
  avatar-jitter genus's dichotomy observed boot-to-boot for the first
  time, both forms sub-threshold and avatar-bbox-confined.
- The blur-column genus's frame-swap verified: set-budget-dialog
  answered the 16-px x=590 dark↔white column (bbox
  (590,519)–(590,534)) where add-transaction-dialog answered HEAD's
  exact bytes — the mirror image of s223 (which answered e5dd4c69 on
  add-transaction-dialog and HEAD's bytes on set-budget-dialog); the
  genus is a property of the dialog-input rendering stack (the same
  x=590 column), not of a specific dialog frame.
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); every pair's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check.
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the held counts.
- The documentation set shipped: this plan (ticked + this addendum), the
  PAD v2.34.0 (the revision block), `budget-wiser_SKILL.md` v1.33.0
  (the frontmatter + the provenance's session-224 clause + Appendix
  C's session-224 row), `docs/session_67.md`, and the worklog entry
  (Task ID 224); the counts verified live-tense at **420/68/14**.
