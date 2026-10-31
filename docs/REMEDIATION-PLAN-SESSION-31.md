# Budget Wise — Session 31 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 220 · **Branch:** `main` only · **Method:** the full census + evidence verification (the TWENTY-EIGHTH census — the thirteenth after the s207 percent-encoding fix, the third after the s218 arrow remediation, and the second to carry the deeper row-anatomy probe as standing methodology)

## 1. Audit scope executed (this session)

- Intake: the workspace was RESET (the ELEVENTH reset in the
  sequence) — the fresh-clone bootstrap exercised live end-to-end:
  `git clone` at `3411a05` (the owner's `docs/session_58.md`
  transcript commit atop the s219 ship `c5e6a4d`; the repo delta
  since the ship verified docs-only, one file); `bun install` 513
  packages → the six-knob `.env` from `.env.example` with
  `DATABASE_URL="file:../db/custom.db"` — the mandated contract —
  plus a fresh `AUTH_SECRET` → `mkdir -p db` + `db:push` +
  `db:seed` (the demo month: 2 users / 4 transactions / 0 budgets)
  → the recurring fresh-workspace Chromium revision step: the full
  120 MiB headless-shell **1248** download (the sandbox cache
  carried revision 1200, the clone's Playwright pins 1248).
- The document review: `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD
  **v2.29.0**, `budget-wiser_SKILL.md` **v1.28.0**,
  `docs/session_57.md`, `docs/REMEDIATION-PLAN-SESSION-30.md`,
  `worklog.md`, and `docs/session_58.md` — all re-read and validated
  against the tree before touching anything.
- The baseline gate ran FIRST: lint 0/0 · typecheck 0 · **416/416
  unit** · build · **14/14 smoke** · **68/68 e2e (CI=1)** — the exact
  documented session-219 ship state, green on the first full pass of
  the fresh environment, with the mobile-navigation battery
  additionally re-verified standalone at **12/12**.
- The local audit per `skills/web-application/SKILL.md` §16/§20:
  the security sweep clean (no `dangerouslySetInnerHTML`, no
  `eval`/`new Function`, no TODO/FIXME, no `any` leaks in `src/`; the
  three `src/` `console.*` hits answered as the documented sanctioned
  diagnostics — the two server-console OTP delivery lines + the
  dev-only AUTH_SECRET fallback warning), `src/middleware.ts` absent
  + `src/proxy.ts` in place (the s201 seam), the docs-count lockstep
  verified (416/68/14 live-tense across README/CLAUDE/SKILL;
  AGENTS.md count-free), `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest
  include `src|tests` only · playwright testDir `tests/e2e`), and the
  mandated focus areas each swept clean — the **mobile navigation**
  (the 12-test e2e battery green standalone + the live byte-census on
  BOTH apps) and **TailwindCSS v4** (the `@custom-variant hover`
  unwrap at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at
  :149/:158, the v3 palette re-pin block at :302+, the `safe-area-pb`
  @utility at :405, literal-class discipline — no config JS, no
  v4-family bugs found). The `.env`/`db` contract verified (six knobs
  in both `.env` and `.env.example`, `db/` at the repo root, the seam
  pinned by `tests/db-path.test.ts`), the Vitest + Playwright suites
  verified in place with clean config scopes, the SEO surfaces
  verified (sitemap + robots + manifest explicit route handlers), and
  the neo-crm tech-stack lineage re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTY-EIGHTH census — ZERO code findings

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural
  deviation on every probed surface** — the thirteenth census after
  the s207 percent-encoding fix, the third after the s218 arrow
  remediation, and the second carrying the deeper row-anatomy probe.
- **The s207 fix VERIFIED LIVE on both apps for the THIRTEENTH
  consecutive census:** the fresh `%20` probe
  (`/Curl%20Probe%220%20Test`) answers the DECODED title
  `Curl Probe 220 Test | Budget Wise` on the reference (served-HTML
  curl-verified) AND on ours identically (ours with the real 404
  status, curl-verified); the `%2D` path answers "Foo Bar | Budget
  Wise" on both (the decode-precedes-hyphen order); the fresh
  hyphenated probe (`/Hyphen-Probe-220`) answers "Hyphen Probe 220 |
  Budget Wise" on both; the 404 BODY quotes the raw ENCODED path on
  BOTH apps.
- **The malformed-escape posture: genus AND face HELD at 520 (the
  ELEVENTH consecutive round)** — with the documented probe form
  `/%E0%A4%A` the reference's CDN answers `error code: 520`
  (curl-verified) where ours still answers the designed 404 with the
  never-throw raw-segment fallback (`%E0%A4%A | Budget Wise`, real
  404 status, curl-verified).
- **The deeper row-anatomy probe (the s218 N-5 methodology growth,
  second carry):** the amount-wrapper's inner family read on BOTH row
  surfaces on BOTH apps — the reference answers
  `svg.lucide lucide-arrow-down-left w-4 h-4 text-rose-500` +
  `SPAN.font-semibold text-lg text-rose-600` (the /Transactions list)
  and the `font-semibold text-rose-600` recent form (the dashboard
  list); OURS answers byte-identical classes on both surfaces PLUS
  the income form (`lucide lucide-arrow-up-right w-4 h-4
  text-emerald-500` + `font-semibold text-lg text-emerald-600` /
  `font-semibold text-emerald-600`) the seeded Salary row exercises —
  the s218 remediation VERIFIED at the exact depth where the genus
  lived, for the second consecutive census.
- Every other parity surface answered byte-identical: the body census
  (`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
  WHITE), the shell (nav classes + `main.pb-20 md:pb-0` + the outer
  `min-h-screen bg-slate-50` surface wrapper inside a class-less
  wrapper DIV), all four pages (containers 7xl/5xl/5xl/4xl, titles
  via FULL navigations — "Transactions | Budget Wise", "Budgets |
  Budget Wise", "Profile | Budget Wise", the metadata-less
  "Budget Wise" on /Dashboard), the mobile bottom bar byte-identical
  on every dimension (the reference's bar is a DIV — ours the
  documented `nav`-landmark superset with identical classes; rect
  top=767 h=77, the row wrapper `flex items-center justify-around
  py-2`, the four anchors' classes, the ink split on the anchor AND
  its svg — active `text-slate-900` / inactive `text-slate-400`, the
  four w-6/h-6 lucide icons layout-dashboard/arrow-left-right/
  target/user, NO aria-current on the reference), the scroll-end
  clearance (764 ≤ 767 measured with the same all-boxes lowest-box
  form at scroll-end on BOTH apps), both dialogs (the expense genus
  with `value="health"` for Healthcare in the reference's option
  family; the income family `other/salary/freelance/investment/gift`
  flipping cleanly on the driver's dispatched-keydown Enter
  activation; ours answering the documented `healthcare` /
  `other_income` internal-wire genera with our Radix Income tab
  flipping on a synthetic click), the Set Budget dialog
  (Category/Monthly Limit labels + the 0.00 placeholder), the
  sitemap format + robots.txt (curl-verified LF-only, 4-space indent,
  changefreq weekly, priority 1.0/0.8, lowercase "User-agent"; the
  documented capitalized-loc divergence on the reference vs our real
  lowercase routes; manifest 302 on the reference vs our 200
  functional superset), the login card (the 4-button OAuth row:
  Google, Microsoft, Facebook, Apple), and the donut geometry
  (341×280 container / 200×200 `g.recharts-pie` / 331px legend).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions.
  The TWENTIETH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (two
  single-call boots, the `rm -rf .next` N-1 posture applied before
  each — both clean, zero reload loops): every local surface matched
  the documented genera (the login card, the seeded demo KPIs
  $4,424.55 / $5,000.00 / $575.45 / 4 txns — the documented
  data-borne divergence, the shell with our documented body-chrome
  platform-face genus — `body.children[0]` the hidden React
  streaming div + the route announcer + recharts' measurement span,
  the mobile bar byte-identical + the aria-current/nav-landmark
  superset, the clearance identical, all titles matching, the 404
  surface byte-matching with the real 404 status, both dialogs
  matching with our `healthcare`/`other_income` internal-wire ids,
  the SEO surfaces matching with the documented lowercase-loc
  divergence, the donut geometry byte-identical, the row inner
  family byte-identical).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §2): the shell, all four pages,
  the mobile bar + the clearance, both dialogs, all page titles, the
  404 title+body+status (the s207 fix re-verified live on both apps
  for the thirteenth consecutive census), the 520 malformed-escape
  face (eleventh consecutive round), the sitemap + robots + manifest,
  the login card, the donut geometry, and — via the deeper probe —
  the amount-wrapper inner family (the s218 arrow remediation
  verified at genus depth on both surfaces, both apps, for the second
  consecutive census).
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root;
  `DATABASE_URL="file:../db/custom.db"`; the db-path seam pinned;
  `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: in place (416/68), config scopes
  clean; the full gate green on the fresh environment's first pass.
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats.
- The security sweep, the docs-count lockstep (416/68/14), the
  `skills/` exclusion, the neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the
  twentieth consecutive round.
- The dev boots: both census boots clean (the N-1 posture applied).

### N — informational notes (documentation, not code)

- **(N-1) The battery: 8/12 byte-identical + the four delta frames
  each at its documented genus, each answered by the round's TWO-BOOT
  stability proof.** dashboard-mobile, transactions-desktop,
  budgets-desktop, budgets-mobile, profile-mobile, landing-desktop,
  login-desktop, and set-budget-dialog all md5-identical to HEAD's
  `docs/screenshots/` set on the first captures (the capture-order
  discipline held — the dashboard-mobile frame captured BEFORE the
  clearance scroll; the viewport re-pinned with `set viewport` before
  every capture batch per the s219 N-4 lesson, `innerWidth` verified
  in-capture). The four delta frames, classified by pixel-diff
  against HEAD: **dashboard-desktop answered the EXACT s219-documented
  genus md5 `7705f2ca`** (48,952 changed px in the (172,818)–(926,885)
  band, ZERO above the 8-luminance threshold, max delta lum 5.3/255 —
  the composite-variance genus) and **transactions-mobile the EXACT
  s219 `296c8736`** (sub-visible: zero changed px above the >2-channel
  threshold — the sub-visible genus on the refreshed baseline) and
  **profile-desktop the EXACT cross-round-stable `3d5173c8`** (2
  changed px in the avatar region at this round's capture, max delta
  lum 5.2/255, ZERO above threshold — the avatar-jitter genus's
  sparse form) — all three answering the same md5s the s219 round
  recorded for them; **add-transaction-dialog answered `e5dd4c69`**
  (16 changed px, 100% confined to the single x=590 column, bbox
  (590,381)–(590,396) — the s212/s213 blur-column genus, the same
  genus family as set-budget-dialog's documented `e428c8e8`, answering
  on this frame's backdrop at this round's capture state; s218 had
  recorded the wider 137px form `4b99aa86` for this frame — the
  genus's capture-state-dependent extent, the column confinement the
  constant). ALL FOUR DETERMINISTIC across this round's TWO
  independent boots (byte-identical md5s, run 1 + run 2). **Zero
  frames refreshed; HEAD's evidence set stays** (the deltas are
  rendering-stack properties, conclusively not code — the DOM
  censuses on the same surfaces byte-matched).
- **(N-2) The reference's malformed-escape edge face HELD at 520**
  (eleventh consecutive round, with the documented probe form
  `/%E0%A4%A`): the genus unchanged, the face platform-owned,
  documented not remediated.
- **(N-3) The VLM battery: 2× "structural_differences: None"**
  (transactions-desktop — "the transaction list structure identical";
  budgets-desktop — "a perfect structural match") + the other two
  pairs' flags all the documented DOM-disproven/data-borne genera:
  the dashboard pair's savings-badge conditional ("88.5% saved" on
  ours, absent on the reference — DATA-BORNE, our seeded demo month
  vs the reference's owner data), the transactions-mobile pair's
  "2-item bar" flag (the documented platform-badge occlusion —
  disproven by this round's direct byte-census: all four anchors
  byte-matched on both apps). ZERO flags survived the cross-check.
- **(N-4, methodology) The deeper row-anatomy probe carried for the
  second consecutive census and answered clean** — the standing
  methodology holds; the s218 remediation verified at genus depth on
  both surfaces, both apps, with the income form live-verified on our
  seeded Salary row.

## 4. Remediation ToDo (a zero-finding round — the documentation true-up + the ship)

**Phase A — the verification (no code changes; all answers above)**

1. [x] The baseline gate on the fresh environment: 416/416 unit ·
       68/68 e2e · 14/14 smoke · lint 0/0 · tsc 0 — the exact
       documented s219 ship state, first full pass green; the
       mobile-nav battery 12/12 standalone.
2. [x] The local audit per §16/§20 — every dimension clean (§1).
3. [x] The live reference census #28 + the dual-app diff — zero
       drift, the s207 fix verified for the thirteenth census, the
       deeper row-anatomy probe carried for the second census (§2).
4. [x] The screenshot battery + the TWO-BOOT stability proof —
       8/12 byte-identical + 4 delta frames at documented genera
       (N-1); zero frames refreshed.
5. [x] The VLM battery — 2× None + all other flags the documented
       DOM-disproven/data-borne genera (N-3).

**Phase B — the documentation set + the ship**

6. [x] The docs-count lockstep VERIFIED (no movement — 416/68/14
       live-tense across README/CLAUDE/SKILL; AGENTS.md count-free;
       no stale counts in the tree).
7. [x] `budget-wiser_SKILL.md` → v1.29.0: the frontmatter version
       bump + the provenance gains the session-220 clause + Appendix
       C gains the session-220 row. Historical rows keep their era's
       numbers.
8. [x] The PAD → v2.30.0: the revision block records the
       twenty-eighth census — the zero-finding round, the deeper
       row-anatomy probe's second carry, the battery's two-boot
       stability proof, and the add-transaction-dialog blur-column
       genus's capture-state note.
9. [x] `docs/session_59.md` (this round's log — Session 34 /
       Task ID 220) + the `worklog.md` entry (Task ID 220, appended,
       never overwritten) + this plan ticked with the addendum.
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
- **The deeper row-anatomy probe stays part of the standing
  methodology** (its second carry this round): the census form keeps
  reading the amount-wrapper's inner family; the next census grows
  the form where the next genus lives.
- **The battery's delta frames answered the s219-recorded genus
  md5s** (7705f2ca, 296c8736, 3d5173c8) + the add-transaction-dialog
  blur-column form (e5dd4c69, the x=590-column genus at this round's
  capture state) — the NEXT round's HEAD comparison classifies
  against these (all deterministic across this round's two boots).
- **The settle-wait + capture-order + viewport-re-pin disciplines
  stay load-bearing** on every capture (≥3.5s the donut-bearing
  frames, ≥3s the dialogs, the dialog frames' ORIGIN SURFACES, the
  dashboard-mobile frame BEFORE any scroll probe, `set viewport`
  before every capture batch with `innerWidth` verified in-capture).
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
  seeded db + a fresh login) re-captured the four delta frames —
  dashboard-desktop `7705f2ca` × 2, transactions-mobile `296c8736`
  × 2, profile-desktop `3d5173c8` × 2, add-transaction-dialog
  `e5dd4c69` × 2 (ALL DETERMINISTIC across the two independent
  boots).
- The viewport discipline applied throughout per the s219 N-4 lesson:
  `set viewport` re-pinned before every capture batch (390×844 for
  the mobile frames, 1512×945 for the desktop frames), `innerWidth`
  verified in the capture's own eval — zero bogus-md5 misclassifications
  this round.
- The VLM battery ran in the census JSON format (4 pairs, reference
  first); pairs 2/3 (transactions-desktop, budgets-desktop) answered
  "None"; pairs 1/4's flags cross-checked against this round's direct
  byte-census before classification — the s204 "coarse signal, never
  a gate" posture held, with zero flags surviving the cross-check.
- The full gate re-ran green after the census + battery work (lint
  0/0 · typecheck 0 · 416/416 unit · build · 14/14 smoke · 68/68
  e2e CI=1) — the ship state at exactly the documented counts.
- The documentation set shipped: this plan (ticked + this addendum),
  the PAD v2.30.0 (the revision block), `budget-wiser_SKILL.md`
  v1.29.0 (the frontmatter + the provenance's session-220 clause +
  Appendix C's session-220 row), `docs/session_59.md`, and the
  worklog entry (Task ID 220); the counts verified live-tense at
  416/68/14 (no lockstep movement — a zero-finding round).
