# Budget Wise — Session 38 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 227 · **Branch:** `main` only · **Method:** the full census + evidence verification (the THIRTY-FIFTH census — the twentieth after the s207 percent-encoding fix, the tenth after the s218 arrow remediation, and the NINTH carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was INTACT for the round (no sandbox reset) — `git pull`
  fast-forwarded `837e126..a177843` (the owner's `docs/session_72.md` transcript
  commit — the repo delta since the s226 ship verified docs-only, one file); the
  standing environment verified rather than rebuilt (bun 1.3.14, the populated
  node_modules, the six-knob `.env` with `DATABASE_URL="file:../db/custom.db"` —
  the mandated contract — plus the seeded `db/` at the repo root with custom.db +
  e2e.db + smoke.db, and the Playwright Chromium headless-shell 1248 present —
  no re-download needed). agent-browser 0.40.0 verified.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.36.0**, `budget-wiser_SKILL.md` **v1.35.0**, `docs/session_71.md`,
  `docs/REMEDIATION-PLAN-SESSION-37.md`, `worklog.md`, and
  `docs/session_72.md` — all re-read and validated against the tree before
  touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-226 ship state, green on the first full pass, with the
  mobile-navigation battery additionally re-verified standalone at **12/12**.
- The local audit per `skills/web-application/SKILL.md` §16/§20: the security
  sweep clean (no `dangerouslySetInnerHTML`, no `eval`/`new Function`, no
  TODO/FIXME, no `any` leaks in `src/`; the three `src/` `console.*` hits
  answered as the documented sanctioned diagnostics — the two server-console
  OTP delivery lines + the dev-only AUTH_SECRET fallback warning),
  `src/middleware.ts` absent + `src/proxy.ts` in place (the s201 seam),
  `skills/` confirmed excluded from all four check/test/compile scopes (tsc
  exclude · eslint ignores · vitest include `src|tests` only · playwright
  testDir `tests/e2e`), the literal-class discipline verified (all 15
  `className={\`...\`}` hits are static-constant compositions over the
  `page-layout.ts` records — the literals statically extractable; the
  GRID_COLS static map the sanctioned pattern), the capital-alias `.jsx`
  stubs verified (the metadata re-exports present on
  Transactions/Budgets/Profile; /Dashboard metadata-less by design), the
  `outputFileTracingExcludes` artifact-hygiene pin verified, and the mandated
  focus areas each swept clean — the **mobile navigation** (the 12-test e2e
  battery green standalone + the live byte-census on BOTH apps) and
  **TailwindCSS v4** (the `@custom-variant hover` unwrap at globals.css:20,
  the `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block — 148
  `color-` pins, the `safe-area-pb` @utility at :405, no config JS, no
  v4-family bugs found). The `.env`/`db` contract verified (six knobs in both
  files with identical knob names, `db/` at the repo root with `custom.db`,
  the seam pinned by `tests/db-path.test.ts`, `.env.example` tracked), the
  Vitest + Playwright suites verified in place with clean config scopes, the
  SEO surfaces verified (sitemap + robots + manifest explicit route handlers,
  the nine-route sitemap with the documented lowercase-loc divergence), the
  docs-count lockstep verified at **420/68/14** live-tense (the s222 guard
  green in the suite), and the neo-crm tech-stack lineage re-confirmed from
  the carried `neo-crm_SKILL.md`.

## 2. The finding

**ZERO code findings — a zero-drift verification round.** No reference
drift on any probed surface (§3); no gate movement; no count movement; no
security, correctness, or convention findings in the local audit (§1). The
round's notable items are evidence-class extensions (N-1: the avatar-jitter
genus's desktop form documented and its boot-to-boot answer stochastic;
N-2: the composite-variance genus answered a same-signature md5 sibling
across boots), methodology not code — the battery's own classification
machinery surfaced both.

## 3. The live re-audit: the THIRTY-FIFTH census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the twentieth census after the
  s207 percent-encoding fix, the tenth after the s218 arrow remediation,
  and the ninth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the TWENTIETH consecutive
  census:** the fresh `%20` probe (`/Curl%20Probe%20227%20Test`) answers the
  DECODED title `Curl Probe 227 Test | Budget Wise` on the reference AND on
  ours identically (ours with the real 404 status, curl-verified); the
  `%2D` path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-227`) answers "Hyphen Probe 227 | Budget Wise" on both;
  the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
  `The page "Curl%20Probe%20227%20Test"` on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  EIGHTEENTH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the never-throw
  raw-segment fallback (curl-verified, title `%E0%A4%A | Budget Wise`).
- **The deeper row-anatomy probe carried for the ninth census:** the
  amount-wrapper's inner family read on BOTH row surfaces on BOTH apps at
  the list's full nesting depth — the reference's first list row answers
  the icon tile `p-2.5 rounded-xl bg-red-50 text-red-600` + the text
  column `flex-1 min-w-0` (the category block `DIV.flex items-center
  gap-2` + the date `P.text-sm text-slate-500`) + the amount+delete group
  `flex items-center gap-4` > the amount block `flex items-center gap-2` >
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (−$1,200.00) inside the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row, and the
  dashboard recent form answers the `font-semibold text-rose-600` span (no
  text-lg) in the amount block riding the `flex items-center gap-4 p-3
  rounded-xl hover:bg-slate-50 transition-colors` recent row; ours answers
  byte-identical classes on both surfaces plus the income form the seeded
  Salary row exercises (`lucide lucide-arrow-up-right w-4 h-4
  text-emerald-500` + the emerald amounts `+$5,000.00`) — the s218
  remediation VERIFIED at the exact depth where the genus lived, for the
  ninth consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body WHITE),
  the shell (nav `sticky top-0 z-50 bg-white border-b border-slate-200
  backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0` + the outer
  `min-h-screen bg-slate-50` surface wrapper + the bare wrapper div), all
  four pages (containers 7xl/5xl/5xl/4xl, titles via FULL navigations —
  Dashboard "Budget Wise", the others "X | Budget Wise"), the mobile bottom
  bar byte-identical on every dimension (rect top=767 h=77, the row wrapper
  `flex items-center justify-around py-2`, the four anchors' classes, the
  ink split on the anchor AND its svg, the four w-6/h-6 lucide icons, NO
  aria-current on the reference), the scroll-end clearance (764 ≤ 767
  measured with the same all-boxes lowest-box form at scroll-end on BOTH
  apps), both dialogs (the expense genus with the reference's 8-option
  family incl. `value="health"`; the income family `other/salary/
  freelance/investment/gift` flipping cleanly on KEYBOARD activation —
  focus + Enter flipped the family and the submit label to "Add Income";
  ours answering the documented `healthcare`/`other_income` internal-wire
  genera with the visible LABEL families matching and our Radix Income tab
  flipping cleanly on a synthetic click), the Set Budget dialog
  (Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
  format + robots.txt (curl-verified; the documented capitalized-loc
  divergence on the reference — `/`, `/Budgets`, `/Profile`,
  `/Transactions`; manifest 302 on the reference vs our 200 functional
  superset), the login card (the 4-button OAuth row: Google, Microsoft,
  Facebook, Apple), and the donut geometry (200×200 `g.recharts-pie`
  inside the 341×280 svg at the pinned viewport). The reference's
  logged-out `/` face re-confirmed with BOTH stores cleared (the s225 N-5
  dual-store discipline): it redirects to `/login?from_url=<abs>` — the
  reference ships NO public landing (ours is the documented functional
  superset).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-SEVENTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each —
  both clean, zero reload loops, single `GET /login` per boot): every
  local surface matched the documented genera (the login card, the seeded
  demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the "88.5% saved"
  badge — the documented data-borne divergence, the shell with our
  documented body-chrome platform-face genus — the hidden streaming
  marker + the Toaster portal + the route announcer + the recharts
  measurement span, the mobile bar byte-identical + the aria-current/
  nav-landmark superset, the clearance identical at 764 ≤ 767, all titles
  matching, the 404 surface byte-matching with the real 404 status + the
  decoded title + the encoded body + the raw-segment malformed-escape
  fallback, both dialogs matching with our `healthcare`/`other_income`
  internal-wire ids + our Radix Income tab flipping cleanly on a synthetic
  click, the SEO surfaces matching with the documented lowercase-loc
  divergence, the donut geometry byte-identical, the row inner family
  byte-identical on both surfaces).

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
  twenty-seventh consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F — none (zero code findings)

### N — informational notes (methodology, not code)

- **(N-1) The avatar-jitter genus's DESKTOP form documented, and its
  boot-to-boot answer is STOCHASTIC.** profile-desktop answered
  `3d5173c8` on boot 1 (86 changed px, ZERO above the 8-luminance
  threshold, max delta lum 5.2/255, bbox (357,255)–(504,373) — the avatar
  region) — the genus's first recorded DESKTOP form after its mobile form
  (`8c6e81e7`) answered the s224–s226 rounds — and then answered HEAD's
  EXACT bytes on boot 2 (0 changed px). The genus's form set now includes
  the desktop frame, and the boot-to-boot answer (form present vs absent)
  is stochastic — the same pattern the blur-column genus showed at s226.
  profile-mobile answered `8c6e81e7` on BOTH boots (deterministic within
  the round).
- **(N-2) The composite-variance genus answered a same-signature md5
  SIBLING across boots.** dashboard-desktop answered the EXACT documented
  genus md5 `7705f2ca` on boot 1 (49,170 changed px, ZERO above the
  8-luminance threshold, max delta lum 5.3/255, bbox (172,818)–(926,885) —
  the genus's ninth consecutive recorded answer) and `a5f47a64` on boot 2
  (49,057 changed px, ZERO above the threshold, max delta lum 3.1/255,
  SAME bbox (172,818)–(926,885)) — the genus ANSWERED on both boots with
  its documented signature; this round documents its first intra-genus
  md5 variance (the md5 is a realization of the variance, not a fixed
  byte answer). The signature-level determinism (bbox + zero-above-bar +
  sub-threshold max) is what the classification machinery keys on — the
  md5-level determinism documented for s219–s226 now carries the sibling
  caveat.
- **(N-3) The blur-column genus answered the add-transaction-dialog form,
  deterministic within the round.** add-transaction-dialog answered
  `e5dd4c69` on BOTH boots (16 changed px, 100% confined to the single
  x=590 column, bbox (590,381)–(590,396), the dark↔white flip) — the
  s225-documented form, back after s226's absent answer. The genus's
  round-to-round sequence now reads s223 add-transaction → s224
  set-budget → s225 add-transaction → s226 NEITHER → s227 add-transaction
  — consistent with the stochastic-across-boots law documented at s226
  (no schedule, per-form determinism within a round).
- **(N-4) The VLM battery (4 pairs, the census JSON format): zero flags
  survived the cross-check.** One "structural_differences: None" answer
  (transactions-desktop); the dashboard pair's "extra '88.5% saved'
  badge" + chart-legend flags (DATA-BORNE, our seeded demo month vs the
  reference's owner data — disproven by the byte-matching DOM census on
  the same surface); the budgets-desktop pair's missing "Edit with
  Base44" (the platform badge — the reference's platform chrome, not an
  app component); the transactions-mobile pair's "2 additional bar
  items" + missing platform widget flags (the documented platform-badge
  occlusion genus — disproven by this round's direct byte-census: all
  four anchors byte-matched on both apps). The s204 "coarse signal,
  never a gate" posture held (the None-count variance over an unchanged
  DOM — 1/4 this round after 2/4 at s226 — is itself documented).
- **(N-5) A capture-methodology catch, cured in-round by the battery's
  own machinery:** the boot-2 transactions-mobile frame and the
  reference's transactions-mobile VLM frame were each first captured
  WITHOUT the page navigation (the viewport switch rode the previous
  page) — the boot-2 md5 matched HEAD's dashboard-mobile and the VLM
  answered "completely different pages". Both frames were re-captured
  WITH the full navigation and re-classified (the corrected frames at
  their documented genera). The lesson: EVERY capture step re-verifies
  the page identity (title or URL) at capture time — the s222
  tab-state lesson's navigation analogue.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s226 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #35 + the dual-app diff — zero drift,
       the s207 fix verified for the twentieth census, the deeper
       row-anatomy probe carried for the ninth census (§3).
4. [x] The screenshot battery + the TWO-BOOT stability proof — 7/12
       byte-identical + 5 delta frames at documented genera (N-1, N-2,
       N-3); zero frames refreshed.
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
8. [x] `budget-wiser_SKILL.md` → v1.36.0: the frontmatter version bump
        + the provenance gains the session-227 clause + Appendix C gains
        the session-227 row (including the avatar-jitter desktop form,
        the composite-variance sibling md5, and the capture-identity
        lesson). Historical rows keep their era's numbers.
9. [x] The PAD → v2.37.0: the revision block records the thirty-fifth
        census — the zero-drift verification, the battery's two-boot
        proof, and the N-1/N-2 evidence-class extensions.
10. [x] `docs/session_73.md` (this round's log — Task ID 227) + the
        `worklog.md` entry (Task ID 227, appended, never overwritten) +
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
- **The genus-form-alternation discipline (s224/s226 N-2) extended
  (this round's N-1/N-2):** the avatar-jitter genus's form set now
  includes the DESKTOP frame (and its boot-to-boot answer is stochastic
  — form present on boot 1, absent on boot 2); the composite-variance
  genus's md5 carries the sibling caveat (same signature, different md5
  across boots — the md5 is a realization of the variance); the
  blur-column genus's sequence reads stochastic, no schedule. The
  sub-threshold signature (zero above the 8-luminance bar, confined
  bbox, no multi-column spread) remains what distinguishes a genus
  answer from a state difference.
- **The capture-identity discipline (this round's N-5) joins the
  standing set:** every capture step re-verifies the page identity
  (title or URL) at capture time — a viewport switch without a
  navigation captures the WRONG page silently.
- **The settle-wait + capture-order + viewport-re-pin + cursor-neutral +
  default-state + origin-surface disciplines stay load-bearing** on every
  capture (≥3.5s the donut-bearing frames after a settled mount, ≥3s the
  dialogs, the 25s fresh-login settle-wait on dashboard-desktop frames,
  the dashboard-mobile frame BEFORE any scroll probe, `set viewport`
  before every capture batch, `mouse move` to a neutral coordinate
  before every frame, the frame in the surface's DEFAULT state before
  any state-flipping probe, and the dialog opened from its documented
  ORIGIN surface).
- **The reference's dual-store session (s225 N-5):** logged-out-surface
  probes on the reference clear cookies AND localStorage.
- **The battery's delta frames answered the cross-round-recorded genus
  md5s and siblings** (7705f2ca + a5f47a64 dashboard-desktop;
  296c8736 transactions-mobile; 8c6e81e7 profile-mobile; 3d5173c8
  profile-desktop's new desktop form; e5dd4c69 add-transaction-dialog)
  — the NEXT round's HEAD comparison classifies against these (the
  signature first, the md5 second).
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

- The intact-workspace intake: `git pull` fast-forwarded
  `837e126..a177843` (docs-only, one file — the owner's
  `docs/session_72.md` transcript); the standing environment verified
  rather than rebuilt (bun 1.3.14, the populated node_modules, the
  six-knob `.env`, the seeded `db/` trio, the Chromium headless-shell
  1248 present).
- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login with the 25s settle-wait) re-captured the
  five candidate delta frames — add-transaction-dialog `e5dd4c69` × 2
  (the blur-column genus add-transaction form), transactions-mobile
  `296c8736` × 2 (the sub-visible genus), profile-mobile `8c6e81e7` × 2
  (the avatar-jitter mobile form), dashboard-desktop `7705f2ca` (boot 1,
  the documented genus md5) + `a5f47a64` (boot 2 — the same-signature
  sibling, N-2), profile-desktop `3d5173c8` (boot 1 — the avatar-jitter
  genus's desktop form, N-1) + HEAD's exact bytes (boot 2, 0 changed
  px). The boot-2 transactions-mobile frame was first captured without
  its navigation (caught by its md5 matching HEAD's dashboard-mobile),
  re-captured WITH the navigation, and re-classified at the documented
  genus (N-5).
- The reference's Income-tab probe required KEYBOARD activation again
  this round (focus + Enter) — the synthetic click stays inert on the
  reference's tab control (the documented s203 methodology footnote);
  our Radix Income tab flipped cleanly on the synthetic click (the
  documented superset posture).
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); every pair's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check. The
  reference's transactions-mobile VLM frame was first captured without
  its navigation (caught by the VLM's "completely different pages"
  answer), re-captured WITH the navigation, and re-run (the corrected
  pair classified at the documented platform-badge genera).
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the held counts.
- The documentation set shipped: this plan (ticked + this addendum), the
  PAD v2.37.0 (the revision block), `budget-wiser_SKILL.md` v1.36.0
  (the frontmatter + the provenance's session-227 clause + Appendix
  C's session-227 row), `docs/session_73.md`, and the worklog entry
  (Task ID 227); the counts verified live-tense at **420/68/14**.
