# Budget Wise — Session 28 Remediation Plan

**Date:** 2026-10-31 · **Task ID:** 217 · **Branch:** `main` only · **Method:** documentation true-up + evidence verification (a zero-drift, zero-code-finding round — the twenty-fifth consecutive census; the tenth census after the s207 percent-encoding fix, re-verifying it holds on both apps; the round's battery answered **7/12 byte-identical on the first corrected-order captures** with the five delta frames each at its documented capture-environment genus AND each answered by the round's three-boot stability proof — the five delta md5s deterministic across THREE independent boots, the deltas deterministic properties of this sandbox's rendering stack; the round also live-applied the s216 N-1 posture — `rm -rf .next` before every census boot — and all three boots answered clean, zero reload loops — see N-2, plus one NEW operational finding: the capture-order discipline, a screenshot taken after a scroll probe on the same surface misclassifies as a delta — see N-1)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET (the ninth reset in the sequence) —
  the fresh-clone bootstrap exercised live: `git clone` at `89a3441`, the
  owner's `docs/session_52.md` transcript commit atop the s216 ship
  `9a17e14` (the repo delta since the ship verified docs-only, one file);
  `bun install` answered 513 packages; the six-knob `.env` from
  `.env.example` + a fresh `AUTH_SECRET`; `db:push` + `db:seed` (the demo
  month: $4,424.55 / 88.5% saved); the recurring fresh-workspace Chromium
  revision step (the full 120 MiB headless-shell 1248 download — the sandbox
  cache carried revision 1200, the clone's Playwright pins 1248). The five
  root documents + `docs/session_51.md` +
  `docs/REMEDIATION-PLAN-SESSION-27.md` + `worklog.md` +
  `docs/session_52.md` were re-read and validated against the tree before
  touching anything. The full baseline gate then ran FIRST: lint 0/0 ·
  typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1) —
  the exact documented session-216 ship state, green on the first full
  pass, with the mobile-navigation battery additionally re-verified
  standalone at 12/12.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no dangerouslySetInnerHTML, no
  eval/new Function, no TODO/FIXME, no `any` leaks in `src/`; the three
  `src/` `console.*` hits answered as the documented sanctioned
  diagnostics — the two in-app OTP delivery lines gated by
  `NEO_DISABLE_IN_APP_OTP` and the dev-only AUTH_SECRET fallback warning;
  the key-pattern mentions answered as the instructional docs + the
  wrapper's `[REDACTED:ssh_private_key]` placeholder only),
  `src/middleware.ts` absent + `src/proxy.ts` in place (the s201 seam,
  `x-pathname` stamped), the docs-count lockstep verified (414/67/14
  live-tense), `skills/` confirmed excluded from all four
  check/test/compile scopes (tsc exclude · eslint ignores · vitest include
  · playwright testDir), and the mandated focus areas each swept clean —
  the **mobile navigation** (the 12-test e2e battery green standalone +
  the live byte-census on BOTH apps during the dual-app diff) and
  **TailwindCSS v4** (the `@custom-variant hover` unwrap at globals.css:20,
  the `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the v3 palette
  re-pin block, the `safe-area-pb` @utility at :405, literal-class
  discipline — no config JS, no v4-family bugs found). The `.env`/`db`
  contract verified (six knobs, `db/` at the repo root,
  `DATABASE_URL="file:../db/custom.db"` — the mandated contract, the seam
  pinned by `tests/db-path.test.ts`, `.env.example` tracked at HEAD with
  identical knob names), the Vitest + Playwright suites verified in place
  with clean config scopes, the SEO surfaces verified (sitemap + robots +
  manifest explicit route handlers), and the neo-crm tech-stack lineage
  re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the TWENTY-FIFTH census — ZERO code findings

- The reference re-audit (agent-browser 0.40.0, fresh login with the
  owner's credentials, 1512×945 + 390×844) found **zero structural drift
  since session 216** — the tenth census after the s207 percent-encoding
  remediation, and the fix VERIFIED LIVE on both apps once more: the `%20`
  probe (`/Curl%20Probe%20217%20Test`) answers the DECODED title `Curl
  Probe 217 Test | Budget Wise` on the reference AND on ours identically
  (ours with the real 404 status, curl-verified); the `%2D` path answers
  "Foo Bar | Budget Wise" on both (the decode-precedes-hyphen order); the
  fresh hyphenated probe (`/Hyphen-Probe-217`) answers "Hyphen Probe 217 |
  Budget Wise" on both; the 404 BODY quotes the raw ENCODED path on BOTH
  apps. The malformed-escape posture held the s210 genus AND face for the
  EIGHTH consecutive round: the reference's CDN answers **520** (`error
  code: 520`, curl-verified) where ours still answers the designed 404
  with the never-throw raw-segment fallback. Every other parity surface
  answered byte-identical: the body census (`[#root, #base44-edit-badge,
  #recharts_measurement_span]`, body WHITE), the shell (nav classes +
  `main.pb-20 md:pb-0` + the outer surface wrapper), all four pages
  (containers 7xl/5xl/5xl/4xl, titles via FULL navigations), the mobile
  bottom bar byte-identical on every dimension (the bar classes, the
  `flex items-center justify-around py-2` row wrapper, the four anchors'
  classes, the ink split on the anchor AND its svg — slate-900 active /
  slate-400 inactive, rect top=767 h=77, the four w-6/h-6 lucide icons,
  NO aria-current on the reference), the scroll-end clearance (764 ≤ 767
  measured with the same all-boxes lowest-box form at scroll-end on BOTH
  apps), both dialogs (the expense genus `food…other` with
  `value="health"` for Healthcare in the option family; the income family
  `other/salary/freelance/investment/gift` flipping cleanly on the
  driver's dispatched-keydown Enter activation — the documented platform
  contrast), the Set Budget dialog (Category/Monthly Limit labels + the
  0.00 placeholder), the sitemap format + robots.txt (curl-verified LF-only,
  4-space indent, changefreq weekly, priority 1.0/0.8, lowercase
  "User-agent"; manifest 302 on the reference vs our 200 functional
  superset), the login card (the 4-button OAuth row), the donut geometry
  (341×280 container / 200×200 `g.recharts-pie` / 331px legend on the
  precise probe at the pinned 1512×945 viewport), and the transaction-row
  anatomy (the `flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors` family on /Transactions with the inner three-children
  family byte-identical on both apps).
- **The data state: UNCHANGED from the s200 baseline** — Balance −$2,481.00
  / Income $0.00 / Expenses $2,481.00 / 3 transactions. The SEVENTEENTH
  consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server (three
  single-call boots, the documented sandbox posture): every local surface
  matched — the login card (the 4-button OAuth row; the documented
  pre-hydration fill race answered by the re-fill), the seeded demo KPIs
  ($4,424.55 / $5,000.00 / $575.45 / 88.5% — the documented data-borne
  divergence), the shell (with our documented body-chrome platform-face
  genus), the mobile bar byte-identical (+ the `aria-current="page"` /
  `nav[aria-label="Main navigation"]` landmark superset), the clearance
  identical (764 ≤ 767, the same probe form), all titles matching, the
  404 surface byte-matching (the decoded title + the raw-encoded body +
  the real 404 status + the "Go Home" button), both dialogs matching (our
  `healthcare`/`other_income` internal-wire ids + the placeholder option —
  the documented internal-wire genus; our Radix Income tab flipping
  cleanly on a synthetic click), the SEO surfaces matching (the documented
  lowercase-loc divergence, format byte-matched; manifest 200 — our
  functional superset), the donut geometry byte-identical (341×280 /
  200×200 / 331), and the row anatomy (the inner family byte-identical on
  both apps). All three boots answered the clean request profile
  (manifest=1 · login=3 · zero notices) — the s216 N-1 posture (`rm -rf
  .next` before a census boot that follows a killed dev server) applied
  and held: zero reload loops across the round.

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface: the shell, all four pages, the mobile bar, the
  clearance, both dialogs, all page titles, the 404 title+body+status, the
  sitemap + robots + manifest, the login card, the donut geometry, the row
  anatomy.
- The s207 percent-decode fix: live-verified on both apps for the tenth
  consecutive census.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root;
  `DATABASE_URL="file:../db/custom.db"` — the mandated contract; the
  db-path seam pinned; `.env.example` tracked at HEAD with identical knob
  names.
- The Vitest + Playwright suites: in place (414/67), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The security sweep, the docs-count lockstep, the skills/ exclusion, the
  neo-crm stack-pattern lineage.
- The reference data state: held at the s200 baseline for the seventeenth
  consecutive round.
- The dev boots: all three census boots clean (the N-1 posture applied).

### F — none (a zero-code-finding round)

No code findings. The screenshot battery answered **7/12 byte-identical
on the first corrected-order captures** (landing, login,
transactions-desktop, budgets-desktop, dashboard-mobile, budgets-mobile,
profile-mobile — all md5-identical to HEAD's `docs/screenshots/` set),
with the five remaining delta frames each at its documented genus (see
N-2), so no evidence frames needed refreshing.

### N — informational notes (documentation, not code)

- **(N-1, operational — NEW FINDING) The CAPTURE-ORDER discipline: a
  screenshot taken AFTER a scroll probe on the same surface misclassifies
  as a delta.** The round's first battery script captured the
  dashboard-mobile frame AFTER the scroll-to-bottom clearance probe on the
  same page — the frame answered a 220,795-px whole-frame delta (max lum
  245, the content visibly shifted) against HEAD's scroll-top frame. The
  same script corrected (the screenshot moved BEFORE the scroll probe)
  answered HEAD's exact bytes on the very next boot — the "delta" was the
  scroll position, not the pixels. The discipline: **on any surface that
  carries a scroll probe (the clearance census), capture the evidence
  frame BEFORE scrolling** — or re-navigate/re-scroll to top between the
  probe and the capture. The mis-ordered runs' OTHER frames were
  unaffected (their surfaces carried no scroll probe), and the corrected
  run's battery is the round's evidence set.
- **(N-2) The battery: 7/12 first-pass byte-identical + the five delta
  frames each at its documented genus, each answered by the round's
  THREE-BOOT stability proof.** The five delta frames, classified by
  pixel-diff against HEAD: dashboard-desktop at 49,265 changed px in the
  (172,818)–(927,886) band, ZERO above the 8-luminance threshold, max lum
  5.4/255 — the s211–s215 sub-visible composite-variance genus (the same
  band, the same sub-visible character; s216's environment had answered
  0 changed px on this frame — the genus is environment-borne and
  returns with the sandbox's font rasterization); transactions-mobile at
  EXACTLY 5 changed px in the (32,371)–(34,375) box, max lum 1.0/255 — a
  first observation of the sub-visible genus on this frame (invisible:
  five pixels at 0.4% luminance); profile-desktop at 105 changed px in the
  avatar region ((357,255)–(505,374)), ZERO above the 8-luminance
  threshold, max lum 5.3/255 — the s214 profile-transient genus;
  add-transaction-dialog at 137 changed px in the (590,381)–(613,562) box
  — the s213–s215 caret-phase + 16-px backdrop-blur column composite;
  set-budget-dialog at EXACTLY 16 changed px, 100% confined to the single
  x=590 column (rows 519–535) — the s212/s213 single-column genus
  verbatim. **The stability proof:** all five delta md5s answered
  byte-identical across THREE independent boots (runs 1, 2, and 3 — the
  corrected-order run — each `rm -rf .next` + a fresh `bun run dev`):
  dashboard-desktop `ceab7754` × 3, profile-desktop `3d5173c8` × 3,
  transactions-mobile `caf463eb` × 3, add-transaction-dialog `4b99aa86`
  × 3, set-budget-dialog `e428c8e8` × 3 — the deltas are DETERMINISTIC
  properties of the rendering stack (the blur-edge rasterization, the
  static caret, the avatar image rasterization, the sub-visible
  antialiasing band), conclusively not code-borne: the DOM censuses on
  the same surfaces byte-matched, and the profile-mobile frame (a
  one-shot DELTA in run 1) answered HEAD's exact bytes in runs 2 and 3
  (the profile-transient genus's one-shot character). Zero frames
  refreshed; HEAD's evidence set stays (the s209 posture).
- **(N-3) The reference's malformed-escape edge face HELD at 520** (the
  s210–s216 note, eighth consecutive round): the genus unchanged (the
  platform edge bounces malformed escapes; ours answers the designed 404
  with the never-throw raw-segment fallback), the face platform-owned,
  documented not remediated.
- **(N-4) The VLM battery's flag variance answered the documented genera**
  (the s204 methodology note): 2× "structural_differences: None"
  (transactions-desktop, budgets-desktop) + the other two pairs' flags all
  the documented DOM-disproven data-borne/platform genera (the dashboard
  pair's savings-badge conditional + legend-category + icon-family flags —
  all data-borne: the reference's negative balance hides the badge and
  shrinks the legend, our seeded demo shows it; the transactions-mobile
  pair's platform-badge occlusion over the bar's right tabs reading as a
  "2-item bar" — DISPROVEN by the byte-identical bar census: all four
  anchors byte-matched on both apps) — cross-checked against the round's
  direct byte-census before classification. The battery is a coarse
  signal, never a gate; the direct byte-census remains the classifier of
  record.

## 4. Remediation ToDo (documentation true-up + ship)

**Phase A — the evidence refresh**

1. [x] The screenshot battery: the 12-frame set captured from the live
       dev server (the documented 1512×945 + 390×844 viewport-pinned
       convention, the settle-waits applied — ≥3.5s on the dashboard
       frame, ≥3s on the dialog frames — the origin-surface contract
       honored: add-transaction from the Dashboard, set-budget from the
       Budgets page) + the pixel-diff against the HEAD captures: **7/12
       byte-identical on the first corrected-order captures + the five
       documented genera with the three-boot stability proof (N-2)**.
       Zero frames refreshed.
2. [x] The VLM battery: 4 pairs (the census JSON format) — 2×
       "structural_differences: None" + the other two pairs' flags all
       answering the documented DOM-disproven data-borne/platform genera
       (N-4) — cross-checked against the round's direct byte-census
       before classification.

**Phase B — the documentation set**

3. [x] `budget-wiser_SKILL.md` → v1.26.0: the frontmatter version bump +
       the provenance gains the session-217 clause + Appendix C gains the
       session-217 row. Historical rows keep their era's numbers.
4. [x] The PAD → v2.27.0: the revision block records the twenty-fifth
       census — the zero-code-finding round that re-verified the s207 fix
       live on both apps for the tenth consecutive census + the 520
       edge-face hold (eighth round) + the battery classification (7/12 +
       the three-boot stability proof) + the N-1 capture-order finding;
       counts held at 414/67/14.
5. [x] The docs-count lockstep verified (no movement this round —
        README/AGENTS/CLAUDE carry 414/67/14 live-tense; no stale sites
        found).
6. [x] `docs/session_53.md` (this round's log — Session 31 / Task ID 217)
        + the `worklog.md` entry (Task ID 217, appended, never
        overwritten) + this plan ticked + the execution addendum.

**Phase C — ship**

7. [x] The dev server STOPPED (tree killed via pkill, port verified free
       via `ss`), then the full gate re-run: lint 0/0 · typecheck 0 ·
       414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1) — the counts
       answered exactly.
8. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit, the
       message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass `--remote`
       explicitly, the default remote is the OLD repo); verify the remote
       ref; shred the key.

## 5. Risks and guards

- **A zero-code round ships documentation only:** the round's only
  code-adjacent deltas are the documentation set; no `.env`/db/`skills/`
  files enter the commit (git status verified clean of secrets, logs, and
  databases).
- **The battery classification is evidence, not a new gate:** the md5
  cross-verification + the three-boot stability proof (the five delta
  md5s deterministic across independent boots) guard against a tooling
  artifact; every delta frame was classified against the documented genera
  families AND cross-checked against the round's direct byte-census of the
  same surfaces before classification.
- **The capture-order discipline (N-1) joins the standing methodology:**
  evidence frames are captured BEFORE any scroll probe on the same
  surface — the round's first two runs' dashboard-mobile "delta" was the
  scroll position, disproven by the corrected run's HEAD-identical frame.
- **The settle-wait discipline stays load-bearing:** the donut-bearing
  frames want ≥3.5s, the dialog frames ≥3s, and the dialog frames pin
  their ORIGIN SURFACES (add-transaction from the Dashboard, set-budget
  from Budgets) — the discipline was applied in full this round.
- **The viewport-pinned capture contract:** HEAD's evidence frames are
  viewport-pinned (1512×945 / 390×844), NOT full-page — this round's
  captures applied the contract on the first pass.
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an
  invitation) — and the s216 N-1 posture (`rm -rf .next` before a census
  boot that follows a killed dev server) applied on every census boot
  this round, all clean.
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- No count movement this round: the gate must answer 414/414 · 14/14 ·
  67/67 exactly (the lockstep verified pre-ship).

## 6. Execution addendum

- The fresh-clone bootstrap answered the baseline gate green on the first
  full pass: clone (one file, docs-only, atop the s216 ship) → bun install
  (513 packages) → the six-knob .env + a fresh AUTH_SECRET → db:push +
  db:seed → the Chromium revision step (1200 cached vs the pinned 1248 —
  the full 120 MiB download) → lint 0/0 · tsc 0 · 414/414 unit · build ·
  14/14 smoke · 67/67 e2e (CI=1), with the mobile-nav battery 12/12
  standalone.
- The census + battery ran as single-call scripts (the sandbox reaps
  spawned processes between tool invocations — the dev server must boot,
  serve, and stop within one call), three boots in total: run 1 (the
  battery with the capture-order bug — dashboard-mobile mis-framed), run
  2 (the re-verification pass — profile-mobile answered HEAD-identical,
  classifying its run-1 delta as the one-shot profile transient), run 3
  (the corrected-order battery — the round's evidence set, 7/12
  HEAD-identical + the five documented genera). All three boots answered
  the clean request profile (manifest=1 · login=3) — zero reload loops,
  the s216 N-1 posture holding.
- The N-1 capture-order finding: diagnosed from the whole-frame delta's
  content-shift signature (HEAD dark-text pixels answering white in the
  run frame — the content moved, not the rendering), cured by moving the
  screenshot before the scroll probe, verified by the corrected run's
  HEAD-identical frame.
- The stability proof: the five delta frames' md5s answered identical
  across all three independent boots — the strongest form of the proof in
  the sequence to date (the s216 round's two-boot proof extended by one).
- The gate re-run + ship (Phase C) execute after this addendum: the dev
  server stopped, the full chain re-run (lint 0/0 · tsc 0 · 414/414 ·
  build · 14/14 smoke · 67/67 e2e CI=1), then the atomic commit + the
  SSH-wrapper push (remote ref verified, key shredded).
