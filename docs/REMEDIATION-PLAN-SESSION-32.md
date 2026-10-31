# Budget Wise — Session 32 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 221 · **Branch:** `main` only · **Method:** the full census + evidence verification (the TWENTY-NINTH census — the fourteenth after the s207 percent-encoding fix, the fourth after the s218 arrow remediation, and the third to carry the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace SURVIVED this round (no reset — unlike the eleven
  prior fresh-clone rounds): `git pull` fast-forwarded `0bb3f87 → 3070588`
  (the owner's `docs/session_60.md` transcript commit atop the s220 ship;
  the repo delta since the ship verified docs-only, one file); the
  workspace state verified in place (513-package `node_modules`, the
  six-knob `.env` with `DATABASE_URL="file:../db/custom.db"` — the
  mandated contract — `db/` at the repo root carrying the seeded
  `custom.db`, and the Playwright Chromium **1248** already cached — no
  fresh-workspace revision step needed this round).
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.30.0**, `budget-wiser_SKILL.md` **v1.29.0`,
  `docs/session_59.md`, `docs/REMEDIATION-PLAN-SESSION-31.md`,
  `worklog.md`, and `docs/session_60.md` — all re-read and validated
  against the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **416/416
  unit** · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact
  documented session-220 ship state, green on the first full pass, with
  the mobile-navigation battery additionally re-verified standalone at
  **12/12**.
- The local audit per `skills/web-application/SKILL.md` §16/§20: the
  security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME, no `any` leaks in `src/`; the
  three `src/` `console.*` hits answered as the documented sanctioned
  diagnostics — the two server-console OTP delivery lines + the dev-only
  AUTH_SECRET fallback warning), `src/middleware.ts` absent +
  `src/proxy.ts` in place (the s201 seam), the docs-count lockstep
  verified (416/68/14 live-tense across README/CLAUDE/SKILL;
  AGENTS.md count-free), `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest
  include `src|tests` only · playwright testDir `tests/e2e`), the
  literal-class discipline verified (the one `grid-cols-${` hit is the
  anti-pattern's own documentation comment in `tabs.tsx`; the
  GRID_COLS static map is the sanctioned pattern), and the mandated
  focus areas each swept clean — the **mobile navigation** (the 12-test
  e2e battery green standalone + the live byte-census on BOTH apps) and
  **TailwindCSS v4** (the `@custom-variant hover` unwrap at
  globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158,
  the v3 palette re-pin block at :252+, the `safe-area-pb` @utility at
  :405, no config JS, no v4-family bugs found). The `.env`/`db`
  contract verified (six knobs in both files, `db/` at the repo root,
  the seam pinned by `tests/db-path.test.ts`, `.env.example` tracked
  with identical knob names), the Vitest + Playwright suites verified
  in place with clean config scopes, the SEO surfaces verified
  (sitemap + robots + manifest explicit route handlers), and the
  neo-crm tech-stack lineage re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTY-NINTH census — ZERO code findings

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the fourteenth census after the
  s207 percent-encoding fix, the fourth after the s218 arrow
  remediation, and the third carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the FOURTEENTH
  consecutive census:** the fresh `%20` probe
  (`/Curl%20Probe%20221%20Test`) answers the DECODED title
  `Curl Probe 221 Test | Budget Wise` on the reference AND on ours
  identically (ours with the real 404 status, curl-verified); the `%2D`
  path answers "Foo Bar | Budget Wise" on both (the
  decode-precedes-hyphen order); the fresh hyphenated probe
  (`/Hyphen-Probe-221`) answers "Hyphen Probe 221 | Budget Wise" on
  both; the 404 BODY quotes the raw ENCODED path on BOTH apps.
- **The malformed-escape posture: genus AND face HELD at 520 (the
  TWELFTH consecutive round)** — with the documented probe form
  `/%E0%A4%A` the reference's CDN answers `error code: 520`
  (curl-verified) where ours answers the designed 404 with the
  never-throw raw-segment fallback (`%E0%A4%A | Budget Wise`, real
  404 status, curl-verified).
- **The deeper row-anatomy probe (the s218 N-5 methodology growth,
  third carry):** the amount-wrapper's inner family read on BOTH row
  surfaces on BOTH apps — the reference answers
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (the /Transactions list,
  wrapper `flex items-center gap-4`) and the `font-semibold
  text-rose-600` recent form (the dashboard list, wrapper `flex
  items-center gap-2`); OURS answers byte-identical classes on both
  surfaces PLUS the income form (`lucide lucide-arrow-up-right w-4 h-4
  text-emerald-500` + `font-semibold text-lg text-emerald-600` / the
  recent emerald form) the seeded Salary row exercises — the s218
  remediation VERIFIED at the exact depth where the genus lived, for
  the third consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav classes + `main.pb-20 md:pb-0` + the outer
  `min-h-screen bg-slate-50` surface wrapper inside a class-less
  wrapper DIV), all four pages (containers 7xl/5xl/5xl/4xl, titles via
  FULL navigations — "Transactions | Budget Wise", "Budgets | Budget
  Wise", "Profile | Budget Wise", the metadata-less "Budget Wise" on
  /Dashboard), the mobile bottom bar byte-identical on every dimension
  (the reference's bar is a DIV — ours the documented `nav`-landmark
  superset with identical classes; rect top=767 h=77, the row wrapper
  `flex items-center justify-around py-2`, the four anchors' classes,
  the ink split on the anchor AND its svg — active `text-slate-900` /
  inactive `text-slate-400`, the four w-6/h-6 lucide icons
  layout-dashboard/arrow-left-right/target/user, NO aria-current on
  the reference), the scroll-end clearance (764 ≤ 767 measured with
  the same all-boxes lowest-box form at scroll-end on BOTH apps), both
  dialogs (the expense genus with `value="health"` for Healthcare in
  the reference's option family; the income family
  `other/salary/freelance/investment/gift` flipping cleanly on the
  driver's dispatched-keydown Enter activation, the submit label
  flipping to "Add Income"; ours answering the documented
  `healthcare`/`other_income` internal-wire genera with our Radix
  Income tab flipping on a synthetic click), the Set Budget dialog
  (Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
  format + robots.txt (curl-verified LF-only, 4-space indent,
  changefreq weekly, priority 1.0/0.8, lowercase "User-agent"; the
  documented capitalized-loc divergence on the reference vs our real
  lowercase routes; manifest 302 on the reference vs our 200
  functional superset), the login card (the 4-button OAuth row:
  Google, Microsoft, Facebook, Apple), and the donut geometry
  (341×280 container / 200×200 `g.recharts-pie` / 331px legend at the
  pinned 1512×945 viewport).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  TWENTY-FIRST consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before
  each — both clean, zero reload loops, single `GET /login` per boot):
  every local surface matched the documented genera (the login card,
  the seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns / the
  "88.5% saved" badge — the documented data-borne divergence, the
  shell with our documented body-chrome platform-face genus
  (`body.children[0]` the hidden React streaming div + the Toaster
  portal + the route announcer + recharts' measurement span), the
  mobile bar byte-identical + the aria-current/nav-landmark superset,
  the clearance identical at 764 ≤ 767, all titles matching, the 404
  surface byte-matching with the real 404 status, both dialogs
  matching with our `healthcare`/`other_income` internal-wire ids +
  our Radix Income tab flipping cleanly on a synthetic click, the SEO
  surfaces matching with the documented lowercase-loc divergence + our
  manifest 200 functional superset, the donut geometry byte-identical,
  the row inner family byte-identical on both surfaces).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §2): the shell, all four pages,
  the mobile bar + the clearance, both dialogs, all page titles, the
  404 title+body+status (the s207 fix re-verified live on both apps
  for the fourteenth consecutive census), the 520 malformed-escape
  face (twelfth consecutive round), the sitemap + robots + manifest,
  the login card, the donut geometry, and — via the deeper probe —
  the amount-wrapper inner family (the s218 arrow remediation verified
  at genus depth on both surfaces, both apps, for the third
  consecutive census).
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root;
  `DATABASE_URL="file:../db/custom.db"`; the db-path seam pinned;
  `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place (416/68), config scopes
  clean; the full gate green on the first pass.
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats.
- The security sweep, the docs-count lockstep (416/68/14), the
  `skills/` exclusion, the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the
  twenty-first consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### N — informational notes (methodology, not code)

- **(N-1) The battery: 9/12 byte-identical + the three delta frames
  each at its documented genus, each answered by the round's TWO-BOOT
  stability proof.** dashboard-mobile, budgets-mobile,
  transactions-desktop, budgets-desktop, profile-desktop,
  landing-desktop, login-desktop, add-transaction-dialog, and
  set-budget-dialog all md5-identical to HEAD's `docs/screenshots/`
  set (the set-budget-dialog frame after the round's N-3 viewport
  cure, below; the capture-order discipline held — the
  dashboard-mobile frame captured BEFORE the clearance scroll; the
  viewport re-pinned with `set viewport` before every capture batch
  per the s219 N-4 lesson, `innerWidth` verified in-capture). The
  three delta frames, classified by pixel-diff against HEAD:
  **dashboard-desktop answered the EXACT s219/s220-documented genus
  md5 `7705f2ca`** (55,488 changed px, ZERO above the 8-luminance
  threshold in the composite-variance band once the round's N-2
  parked-cursor hover capture-state was cured) and
  **transactions-mobile the EXACT s219/s220 `296c8736`** (5 changed
  px, max delta lum 1.0/255, ZERO above thresholds — the sub-visible
  genus answering the same md5 for the THIRD consecutive round) —
  both genus-md5-across-environments answers; **profile-mobile
  answered `8c6e81e7`** (120 changed px confined to the avatar region
  (84,255)–(234,376), max delta lum 6.1/255, ZERO above the
  8-luminance threshold — the avatar-jitter genus's mobile-frame form;
  the desktop frame answered HEAD's exact bytes this round, the
  genus's documented one-shot/HEAD-identical dichotomy). ALL THREE
  DETERMINISTIC across this round's TWO independent boots (identical
  md5s, run 1 + run 2; the dashboard-desktop boot-2 capture required
  the chart-settle wait per N-4 below). **Zero frames refreshed;
  HEAD's evidence set stays** (the deltas are rendering-stack
  properties, conclusively not code — the DOM censuses on the same
  surfaces byte-matched).
- **(N-2, methodology — THE ROUND'S FIRST LESSON) THE PARKED-CURSOR
  HOVER CAPTURE GENUS:** the round's first dashboard-desktop capture
  answered a new md5 with 5,948 changed px ABOVE the 8-luminance
  threshold, 100% confined to the Add Transaction button's exact rect
  (1188,111,176×36) — HEAD's slate-900 resting fill vs the capture's
  slate-800 hover fill. The root cause: the dialog census's click
  left the virtual mouse parked ON the button, and the subsequent
  frame captured the rendered `hover:bg-slate-800` state. Cured by
  parking the cursor at a neutral coordinate (`mouse move 5 500`)
  before every capture; the cured frame re-answered the exact genus
  md5 `7705f2ca`. **The discipline grows: park the virtual cursor
  neutral before EVERY frame capture** (a parked cursor renders
  :hover states into headless captures — the third capture-state
  lesson in the battery's history, after the s218 settle-waits and
  the s219 viewport re-pin).
- **(N-3, methodology — THE ROUND'S SECOND LESSON) THE DIALOG-FRAME
  VIEWPORT MISS:** the round's first set-budget-dialog capture
  answered a SIZE MISMATCH (390×844 vs the documented 1512×945 form)
  — the dialog census had run on the mobile axis and the capture was
  taken before the viewport was re-pinned to desktop. Recaptured at
  the pinned 1512×945 viewport, the frame answered HEAD's EXACT bytes
  (`41fd22b1`). The s219 lesson's corollary written down: the
  viewport re-pin applies to EVERY capture regardless of the
  preceding probe's axis — the dialog frames are desktop-form.
- **(N-4, methodology — THE ROUND'S THIRD LESSON) THE FRESH-LOGIN
  DONUT-SETTLE RACE:** the two-boot proof's first boot-2
  dashboard-desktop capture answered a new md5 with 11,480 changed px
  (max delta lum 150.6/255) confined to the donut's 200×200 rect —
  the recharts mount animation still mid-flight at the ~5s
  post-login capture. The settled recapture (the page open ~30s)
  re-answered the exact genus md5 `7705f2ca`. The discipline grows:
  donut-bearing frames captured after a FRESH LOGIN (a client-side
  mount, not a full navigation) wait for the chart's settled state —
  the settle-wait clock starts at mount completion, and a login
  transition mounts later than the navigation event.
- **(N-5) The reference's malformed-escape edge face HELD at 520**
  (twelfth consecutive round, the documented probe form) — the genus
  unchanged, the face platform-owned, documented not remediated.
- **(N-6) The VLM battery: 1× "structural_differences: None"**
  (transactions-desktop — the s218-fixed surface answering clean for
  the third consecutive battery) + the other three pairs' flags all
  the documented DOM-disproven/data-borne/platform genera: the
  dashboard pair's savings-badge conditional + donut data state +
  row data (all DATA-BORNE, our seeded demo month vs the reference's
  owner data — disproven by the byte-matching DOM census on the same
  surface), the budgets-desktop pair's "Edit with Base44" floating
  button (the reference's PLATFORM badge — `#base44-edit-badge` in
  the body census, not app UI), and the transactions-mobile pair's
  "2-item bar" + row-layout flags (the documented platform-badge
  occlusion — disproven by this round's direct byte-census: all four
  anchors byte-matched on both apps — and the data-borne row content,
  disproven by the byte-identical row structure census: rowCls +
  icon-box + flex-1 min-w-0 + the amount wrapper). ZERO flags
  survived the cross-check.

## 4. Remediation ToDo (a zero-finding round — the documentation true-up + the ship)

**Phase A — the verification (no code changes; all answers above)**

1. [x] The baseline gate: 416/416 unit · 68/68 e2e · 14/14 smoke ·
       lint 0/0 · tsc 0 — the exact documented s220 ship state, first
       full pass green; the mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #29 + the dual-app diff — zero
       drift, the s207 fix verified for the fourteenth census, the
       deeper row-anatomy probe carried for the third census (§2).
4. [x] The screenshot battery + the TWO-BOOT stability proof —
       9/12 byte-identical + 3 delta frames at documented genera
       (N-1); zero frames refreshed; the three capture-state lessons
       (N-2/N-3/N-4) identified, cured in-round, and written into the
       standing discipline.
5. [x] The VLM battery — 1× None + all other flags the documented
       DOM-disproven/data-borne/platform genera (N-6).

**Phase B — the documentation set + the ship**

6. [x] The docs-count lockstep VERIFIED (no movement — 416/68/14
       live-tense across README/CLAUDE/SKILL; AGENTS.md count-free;
       no stale counts in the tree).
7. [x] `budget-wiser_SKILL.md` → v1.30.0: the frontmatter version
       bump + the provenance gains the session-221 clause + Appendix
       C gains the session-221 row (including the three capture-state
       lessons). Historical rows keep their era's numbers.
8. [x] The PAD → v2.31.0: the revision block records the
       twenty-ninth census — the zero-finding round, the deeper
       row-anatomy probe's third carry, the battery's two-boot
       stability proof, and the three capture-state methodology
       lessons (the parked-cursor hover genus, the dialog-frame
       viewport miss, the fresh-login donut-settle race).
9. [x] `docs/session_61.md` (this round's log — Task ID 221) + the
       `worklog.md` entry (Task ID 221, appended, never overwritten)
       + this plan ticked with the addendum.
10. [x] The dev server STOPPED + the browser CLOSED before the
        documentation phase; the full gate re-ran green (lint 0/0 ·
        typecheck 0 · 416/416 unit · build · 14/14 smoke · 68/68
        e2e, CI=1) — the counts answered exactly.
11. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, logs,
        `test-results/` staged) → commit (atomic, Conventional
        Commit, the message explains why) → push `HEAD:refs/heads/main`
        via `docs/ssh_git_wrapper_v3.py` (the runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
        `--remote` explicitly, the default remote is the OLD repo);
        verify the remote ref; shred the key.

## 5. Risks and guards

- **A zero-finding round ships documentation only:** no code, no
  gate movement, no count movement — the risk surface is the
  documentation set itself; every claim in it traces to this round's
  live probes (the census commands' outputs recorded in the session
  log).
- **The three capture-state lessons join the standing discipline**
  (N-2/N-3/N-4): park the virtual cursor neutral before every frame
  capture; re-pin the viewport before EVERY capture regardless of the
  preceding probe's axis; wait for the chart's settled state after a
  fresh login. All three were caught by the battery's own
  classification machinery (the md5 pattern + the pixel-diff
  thresholds) and cured in-round — the machinery is the guard.
- **The deeper row-anatomy probe stays part of the standing
  methodology** (its third carry this round): the census form keeps
  reading the amount-wrapper's inner family; the next census grows
  the form where the next genus lives.
- **The battery's delta frames answered the s219/s220-recorded genus
  md5s** (7705f2ca dashboard-desktop, 296c8736 transactions-mobile)
  + the avatar-jitter mobile form (8c6e81e7) — the NEXT round's HEAD
  comparison classifies against these (all deterministic across this
  round's two boots).
- **The settle-wait + capture-order + viewport-re-pin +
  cursor-neutral disciplines stay load-bearing** on every capture
  (≥3.5s the donut-bearing frames after a settled mount, ≥3s the
  dialogs, the dialog frames' ORIGIN SURFACES, the dashboard-mobile
  frame BEFORE any scroll probe, `set viewport` before every capture
  batch with `innerWidth` verified in-capture, `mouse move` to a
  neutral coordinate before every frame).
- **The dev server is stopped before any build** (the documented
  rule; the s216 N-1 `rm -rf .next` posture applied before every
  census boot).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` —
  unchanged.
- No secrets in the tree; the SSH key lives outside the repo and is
  shredded after the push.

## 6. Execution addendum

- The two-boot stability proof: boot 1 (the census pass) captured the
  12-frame battery; boot 2 (fresh `rm -rf .next` + reboot, the same
  seeded db + a fresh login) re-captured the three delta frames —
  dashboard-desktop `7705f2ca` × 2 (the settled form; the boot-2
  first capture answered the donut-settle race form and was
  re-captured settled per N-4), transactions-mobile `296c8736` × 2,
  profile-mobile `8c6e81e7` × 2 (ALL DETERMINISTIC across the two
  independent boots).
- The three capture-state cures verified in-round: the
  dashboard-desktop hover-state capture re-answered the exact genus
  md5 after the cursor-neutral park (the pixel-diff's above-threshold
  count dropped from 5,948 to ZERO with the bbox collapsing to the
  composite-variance band); the set-budget-dialog frame answered
  HEAD's exact bytes after the desktop re-pin; the boot-2
  dashboard-desktop answered the genus md5 after the chart settle.
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); pair 2 (transactions-desktop) answered "None"; pairs 1/3/4's
  flags cross-checked against this round's direct byte-census + row
  DOM census before classification — the s204 "coarse signal, never a
  gate" posture held, with zero flags surviving the cross-check.
- The full gate re-ran green after the census + battery work (lint
  0/0 · typecheck 0 · 416/416 unit · build · 14/14 smoke · 68/68
  e2e CI=1) — the ship state at exactly the documented counts.
- The documentation set shipped: this plan (ticked + this addendum),
  the PAD v2.31.0 (the revision block), `budget-wiser_SKILL.md`
  v1.30.0 (the frontmatter + the provenance's session-221 clause +
  Appendix C's session-221 row), `docs/session_61.md`, and the
  worklog entry (Task ID 221); the counts verified live-tense at
  416/68/14 (no lockstep movement — a zero-finding round).
