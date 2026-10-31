# Budget Wise — Session 39 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 228 · **Branch:** `main` only · **Method:** the full census + evidence verification (the THIRTY-SIXTH census — the twenty-first after the s207 percent-encoding fix, the eleventh after the s218 arrow remediation, and the TENTH carrying the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was RESET (no standing clone) — `git clone
  https://github.com/nordeim/budget-wiser.git` at `2653316` (the owner's
  `docs/session_74.md` transcript commit on top of the s227 ship `fb8cb9b`);
  the standing environment REBUILT rather than verified: bun 1.3.14 (the
  sandbox's own), `bun install` (513 packages, the lockfile honored), the
  six-knob `.env` recreated with `DATABASE_URL="file:../db/custom.db"` —
  the mandated contract — plus a fresh `AUTH_SECRET`, `db/` recreated at
  the repo root and pushed + seeded (`custom.db`; the `e2e.db`/`smoke.db`
  pair created by their own gate legs), and the Playwright Chromium
  headless-shell 1248 downloaded (the cache carried 1200 only).
  agent-browser 0.40.0 verified.
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.37.0**, `budget-wiser_SKILL.md` **v1.36.0**,
  `docs/session_73.md`, `docs/REMEDIATION-PLAN-SESSION-38.md`,
  `worklog.md`, and `docs/session_74.md` — all read and validated against
  the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **420/420 unit**
  · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact documented
  session-227 ship state, green on the first full pass (on the rebuilt
  environment), with the mobile-navigation battery additionally
  re-verified standalone at **12/12**.
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
  literals statically extractable; the GRID_COLS static map the
  sanctioned pattern), the capital-alias `.jsx` stubs verified (the
  metadata re-exports present on Transactions/Budgets/Profile;
  /Dashboard metadata-less by design), the `outputFileTracingExcludes`
  artifact-hygiene pin verified, and the mandated focus areas each swept
  clean — the **mobile navigation** (the 12-test e2e battery green
  standalone + the live byte-census on BOTH apps) and **TailwindCSS v4**
  (the `@custom-variant hover` unwrap at globals.css:20, the
  `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the v3 palette re-pin
  block — 148 `color-` pins, the `safe-area-pb` @utility at :405, no
  config JS, no v4-family bugs found). The `.env`/`db` contract verified
  (six knobs in both files with identical knob names, `db/` at the repo
  root with `custom.db`, the seam pinned by `tests/db-path.test.ts`,
  `.env.example` tracked), the Vitest + Playwright suites verified in
  place with clean config scopes, the SEO surfaces verified (sitemap +
  robots + manifest explicit route handlers, the nine-route sitemap),
  the docs-count lockstep verified at **420/68/14** live-tense (the s222
  guard green in the suite), and the neo-crm tech-stack lineage
  re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The finding

**ZERO code findings — a zero-drift verification round.** No reference
drift on any probed surface (§3); no gate movement; no count movement;
no security, correctness, or convention findings in the local audit
(§1). The round's notable item is one evidence-class observation
(N-1: the avatar-jitter genus's desktop form answered BOTH boots this
round after its s227 boot-1-only debut — the stochastic-across-boots
law holding with per-form determinism within the round), methodology
not code.

## 3. The live re-audit: the THIRTY-SIXTH census — zero reference drift

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the twenty-first census after
  the s207 percent-encoding fix, the eleventh after the s218 arrow
  remediation, and the tenth carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the TWENTY-FIRST
  consecutive census:** the fresh `%20` probe
  (`/Curl%20Probe%20228%20Test`) answers the DECODED title
  `Curl Probe 228 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-228`) answers "Hyphen Probe 228 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
  `The page "Curl%20Probe%20228%20Test"` on both).
- **The malformed-escape posture: genus AND face HELD at 520 (the
  NINETEENTH consecutive round)** — the documented probe form
  (`/%E0%A4%A`) answers the reference's CDN `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback (curl-verified, title
  `%E0%A4%A | Budget Wise`).
- **The deeper row-anatomy probe carried for the tenth census:** the
  amount-wrapper's inner family read on BOTH row surfaces on BOTH apps
  at the list's full nesting depth — the reference's first list row
  answers the icon tile `p-2.5 rounded-xl bg-red-50 text-red-600` + the
  text column `flex-1 min-w-0` + the amount+delete group `flex
  items-center gap-4` > the amount block `flex items-center gap-2` >
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` inside the `flex
  items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row, and
  the dashboard recent form answers the `font-semibold text-rose-600`
  span (no text-lg) in the amount block riding the `flex items-center
  gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors` recent row;
  ours answers byte-identical classes on both surfaces plus the income
  form (`lucide lucide-arrow-up-right w-4 h-4 text-emerald-500` + the
  emerald amounts `+$5,000.00`) the seeded Salary row exercises — the
  s218 remediation VERIFIED at the exact depth where the genus lived,
  for the tenth consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav `sticky top-0 z-50 bg-white border-b
  border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20
  md:pb-0` + the outer `min-h-screen bg-slate-50` surface wrapper + the
  bare wrapper div), all four pages (containers 7xl/5xl/5xl/4xl, titles
  via FULL navigations — Dashboard "Budget Wise", the others
  "X | Budget Wise"), the mobile bottom bar byte-identical on every
  dimension (rect top=767 h=77, the row wrapper `flex items-center
  justify-around py-2`, the four anchors' classes, the ink split on the
  anchor AND its svg, the four w-6/h-6 lucide icons, NO aria-current on
  the reference), the scroll-end clearance (764 ≤ 767 measured with the
  same all-boxes lowest-box form at scroll-end on BOTH apps), both
  dialogs (the expense genus with the reference's 8-option family incl.
  `value="health"`; the income family `other/salary/freelance/
  investment/gift` flipping cleanly on KEYBOARD activation — focus +
  Enter — with the submit label flipping to "Add Income"; ours answering
  the documented `healthcare`/`other_income` internal-wire genera with
  the visible LABEL families matching and our Radix Income tab
  flipping cleanly on a synthetic click), the Set Budget dialog
  (Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
  format + robots.txt (curl-verified; the documented capitalized-loc
  divergence on the reference — `/`, `/Budgets`, `/Profile`,
  `/Transactions`; manifest 302 on the reference vs our 200 functional
  superset), the login card (the 4-button OAuth row: Google, Microsoft,
  Facebook, Apple), and the donut geometry (200×200 `g.recharts-pie`
  inside the 341×280 svg at the pinned viewport). The reference's
  logged-out `/` face re-confirmed with BOTH stores cleared (the s225
  N-5 dual-store discipline): it redirects to
  `/login?from_url=<abs>` — the reference ships NO public landing
  (ours is the documented functional superset).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-EIGHTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before each
  — both clean, zero reload loops, the health probe 200 on each): every
  local surface matched the documented genera (the login card, the
  seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the
  "88.5% saved" badge — the documented data-borne divergence, the shell
  with our documented body-chrome platform-face genus, the mobile bar
  byte-identical + the aria-current/nav-landmark superset, the clearance
  identical at 764 ≤ 767, all titles matching, the 404 surface
  byte-matching with the real 404 status + the decoded title + the
  encoded body + the raw-segment malformed-escape fallback, both
  dialogs matching with our `healthcare`/`other_income` internal-wire
  ids + our Radix Income tab flipping cleanly on a synthetic click, the
  SEO surfaces matching with the documented lowercase-loc divergence,
  the donut geometry byte-identical, the row inner family byte-identical
  on both surfaces).

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
  twenty-eighth consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### F — none (zero code findings)

### N — informational notes (methodology, not code)

- **(N-1) The avatar-jitter genus's desktop form answered BOTH boots
  this round (`3d5173c8` × 2).** The form debuted at s227 answering
  boot 1 only (HEAD's exact bytes on boot 2); this round it answered
  both boots deterministically — the stochastic-across-boots law
  holding exactly as documented (no schedule across boots; per-form
  determinism within a round). The sub-threshold signature (87 changed
  px, ZERO above the 8-luminance bar, max delta lum 5/255, bbox
  (357,255)–(505,374) — the avatar region) matches the documented
  form's signature.
- **(N-2) The composite-variance genus answered its documented md5 PAIR
  across the two boots** — `7705f2ca` on boot 1 (49,170 changed px,
  ZERO above the 8-luminance threshold, max delta lum 5/255, bbox
  (172,818)–(927,886)) and the same-signature sibling `a5f47a64` on
  boot 2 (49,057 changed px, ZERO above the bar, max 3/255, the SAME
  bbox) — the exact pair the s227 round documented; the md5 is a
  realization of the variance, and the signature-level determinism
  (bbox + zero-above-bar + sub-threshold max) is what the
  classification machinery keys on.
- **(N-3) The blur-column genus answered the add-transaction-dialog
  form (`e5dd4c69` × 2 boots)** — 16 changed px, 100% confined to the
  single x=590 column, bbox (590,381)–(591,397), the dark↔white flip;
  the round-to-round sequence now reads s223 → s224 → s225 → s226
  (neither) → s227 → s228, consistent with the
  stochastic-across-boots law.
- **(N-4) The VLM battery (4 pairs, the census JSON format): zero flags
  survived the cross-check.** One "structural_differences: none" answer
  (transactions-desktop — 1/4 None, same as s227); the dashboard pair's
  "extra '88.5% saved' badge" + chart-legend flags (DATA-BORNE, our
  seeded demo month vs the reference's owner data — disproven by the
  byte-matching DOM census on the same surface); the budgets-desktop
  pair's missing "Edit with Base44" (the platform badge — the
  reference's platform chrome, not an app component); the
  transactions-mobile pair's "2 additional bar items" + row-layout
  flags (the documented platform-badge occlusion genus — disproven by
  this round's direct byte-census: all four anchors byte-matched on
  both apps, and the row inner family byte-identical at full nesting
  depth). The s204 "coarse signal, never a gate" posture held.
- **(N-5) The environment-rebuild intake verified.** The first
  reset-workspace round since the s212 era: the fresh-clone bootstrap
  (install → six-knob .env → db push + seed → Chromium 1248) landed the
  documented standing environment with the gate green on the FIRST
  full pass — the README quick-start (the fresh-clone path) is the
  load-bearing proof, exactly as the s222 docs-count lockstep intends.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace rebuild (reset → clone at `2653316` → install →
       six-knob `.env` with `DATABASE_URL="file:../db/custom.db"` →
       `db/` pushed + seeded → Chromium 1248) — the standing
       environment restored.
2. [x] The baseline gate: 420/420 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s227 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #36 + the dual-app diff — zero drift,
       the s207 fix verified for the twenty-first census, the deeper
       row-anatomy probe carried for the tenth census (§3).
5. [x] The screenshot battery + the TWO-BOOT stability proof — 8/12
       byte-identical + 4 delta frames each at its EXACT documented
       genus md5 (N-1, N-2, N-3); zero frames refreshed.
6. [x] The VLM battery — all flags the documented DOM-disproven/
       data-borne/platform genera, zero surviving the cross-check
       (N-4).

**Phase B — the round's finding (none: a zero-code-finding round)**

7. [x] No code remediation required — zero code findings; no gate
       movement; no count movement (the counts hold at 420/68/14, the
       s222 lockstep guard green in the suite). No TDD leg: nothing to
       fix, nothing to regress.

**Phase C — the documentation set + the ship**

8. [x] The docs-count lockstep verified at **420/68/14** live-tense
        across README/CLAUDE/PAD/SKILL (the guard enforces it);
        AGENTS.md verified count-free.
9. [x] `budget-wiser_SKILL.md` → v1.37.0: the frontmatter version bump
        + the provenance gains the session-228 clause + Appendix C
        gains the session-228 row. Historical rows keep their era's
        numbers.
10. [x] The PAD → v2.38.0: the revision block records the
        thirty-sixth census — the zero-drift verification, the
        battery's two-boot proof, and the N-1 evidence-class
        observation.
11. [x] `docs/session_75.md` (this round's log — Task ID 228) + the
        `worklog.md` entry (Task ID 228, appended, never overwritten) +
        this plan ticked with the addendum.
12. [x] The dev server STOPPED + the browser CLOSED before the
        documentation phase; the full gate re-ran green (lint 0/0 ·
        typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68
        e2e, CI=1).
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
- **The genus-form-alternation discipline (s224/s226 N-2, s227 N-1/N-2)
  extended by this round's N-1:** the avatar-jitter genus's desktop
  form answered BOTH boots (`3d5173c8` × 2) after its boot-1-only s227
  debut — per-form determinism within a round, stochastic across
  boots, no schedule. The sub-threshold signature (zero above the
  8-luminance bar, confined bbox, no multi-column spread) remains what
  distinguishes a genus answer from a state difference.
- **The composite-variance genus's md5-pair law (s227 N-2) re-answered
  exactly:** `7705f2ca` + `a5f47a64` across the two boots, the same
  signature and bbox — the NEXT round's HEAD comparison classifies
  against the signature first, the md5 second.
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

- The reset-workspace intake: `git clone` at `2653316` (the owner's
  `docs/session_74.md` transcript commit over the s227 ship `fb8cb9b`);
  the environment rebuilt (bun 1.3.14 standing, 513 packages installed,
  the six-knob `.env` with a fresh `AUTH_SECRET`, `db/custom.db`
  pushed + seeded, Chromium headless-shell 1248 downloaded); the gate
  green on the first full pass — the fresh-clone bootstrap path (the
  README quick-start) verified end-to-end.
- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login with the 25s settle-wait) re-captured the
  four delta frames — dashboard-desktop `7705f2ca` (boot 1) +
  `a5f47a64` (boot 2, the same-signature sibling, N-2);
  transactions-mobile `296c8736` × 2; profile-desktop `3d5173c8` × 2
  (N-1); add-transaction-dialog `e5dd4c69` × 2 (N-3). Every mobile-axis
  and dialog capture re-verified the page identity at capture time.
- The reference's Income-tab probe required KEYBOARD activation again
  (focus + Enter) — the synthetic click stays inert on the reference's
  tab control (the documented s203 methodology footnote); our Radix
  Income tab flipped cleanly on the synthetic click (the documented
  superset posture).
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); every pair's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check.
- The full gate re-ran green after the documentation work (lint 0/0 ·
  typecheck 0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e
  CI=1) — the ship state at the held counts.
- The documentation set shipped: this plan (ticked + this addendum),
  the PAD v2.38.0 (the revision block), `budget-wiser_SKILL.md` v1.37.0
  (the frontmatter + the provenance's session-228 clause + Appendix
  C's session-228 row), `docs/session_75.md`, and the worklog entry
  (Task ID 228); the counts verified live-tense at **420/68/14**.
