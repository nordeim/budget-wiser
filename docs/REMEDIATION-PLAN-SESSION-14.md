# Budget Wise — Session 14 Remediation Plan

**Date:** 2026-10-28 · **Task ID:** 203 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift round — zero code findings; the round's two notes are first-observation genus/methodology records, remediated as documentation, not code)

## 1. Audit scope executed (this session)

- Intake: `git pull` on the existing workspace (NOT reset this round) landing at
  `cb5b07d` — the owner's `docs/session_24.md` transcript commit atop `c01077c`,
  the session-202 ship (the tenth-census zero-finding round). The environment
  held: bun 1.3.14 · node_modules in place · `.env` on the mandated six-knob
  contract with `DATABASE_URL="file:../db/custom.db"` · `db/` populated
  (custom.db + e2e.db + smoke.db).
- The five root documents + `docs/session_23.md` +
  `docs/REMEDIATION-PLAN-SESSION-13.md` + `worklog.md` + `docs/session_24.md`
  were re-read and validated against the tree before touching anything; the
  repo delta since the s202 ship was verified docs-only (one file: the owner's
  transcript).
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-202
  ship state.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`, no `any`
  leaks, no eval/new Function), the docs-count lockstep verified at every
  claim site (no stale `409`/`401`-era claims; historical rows keep their
  era's numbers), `skills/` confirmed excluded from all four check/test/compile
  scopes (tsc exclude · eslint ignores · vitest include patterns · playwright
  testDir), and the mandated focus areas each swept clean: the **mobile
  navigation** (the e2e battery green inside the baseline gate's 66/66 + the
  live byte-census on BOTH apps during the dual-app diff) and **TailwindCSS
  v4** (the `@custom-variant hover` unwrap, the `--shadow-sm`/`--blur-sm`
  re-pins, the v3 palette re-pin block, the `safe-area-pb` @utility,
  literal-class discipline, no config JS — no v4-family bugs found). The
  `.env`/`db` contract verified live (the six knobs, `db/` at the repo root,
  the seam pinned by `tests/db-path.test.ts`), the Vitest + Playwright suites
  verified in place with clean config scopes, the SEO surfaces verified
  (sitemap + robots + manifest explicit route handlers, the format matching
  the reference), and the neo-crm tech-stack pattern reference re-confirmed
  (Next 16.4.2 · React 19.3.1 · Tailwind v4.3.3 CSS-first · Vitest 5 ·
  Playwright · Bun).

## 2. The live re-audit: the ELEVENTH consecutive zero-drift census

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 202** — the eleventh consecutive shell census with no new restyle
  wave: the body census answering `[#root → DIV.min-h-screen,
  #base44-edit-badge, recharts span]` exactly as documented, the shell (nav
  classes `sticky top-0 z-50 bg-white border-b border-slate-200
  backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0` byte-identical), all
  four app pages byte-verified (containers 7xl/5xl/5xl/4xl), every page title
  cross-checked on both apps with FULL navigations (the s199 methodology),
  the 404 surface (the interpolated humanized title `Curl Probe 203 Test |
  Budget Wise` answering identically to our s196/s201 implementation, ours
  with the real 404 status), the mobile bottom bar byte-identical on every
  dimension (the `md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white
  border-t border-slate-200 safe-area-pb` DIV, the `flex items-center
  justify-around py-2` row wrapper, item classes, the ink split on the anchor
  AND its svg, rect y=767 h=77), the scroll-end clearance (764 ≤ 767 measured
  per the e2e contract's lowest-box form on BOTH apps), both dialogs (the Add
  Transaction Expense/Income tabs + native category select + the
  Amount/Category/Date/Description labels; the Set Budget Category/Monthly
  Limit labels + the 0.00 placeholder), the sitemap format + robots.txt, the
  login card (the 4-button OAuth row: Google, Microsoft, Facebook, Apple),
  the donut geometry (the 341×280 responsive container, the 200×200 pie
  surface, the 331px recharts-legend-wrapper), and the transaction-row
  anatomy (`flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors` rows).
- **The data state: UNCHANGED from the s200 baseline** — Balance −$2,481.00 /
  Income $0.00 / Expenses $2,481.00 / 3 transactions. The THIRD consecutive
  round with no owner-data movement; the s200 census baseline holds verbatim.
- The dual-app diff ran the same census on the local dev server (booted via
  the `dev` script — the s197 preflight guard fired clean on the gate's build
  tree: Ready in 273ms, health 200 + db up, zero reload loops, zero
  deprecation notices, and the `proxy.ts` leg visible in the request traces —
  the s201 rename live-verified again): the shell matching, the mobile bar
  byte-identical (+ the aria-current/nav-landmark superset), all page titles
  matching, the 404's interpolated title WITH the real 404 status, both
  dialogs matching, the SEO surfaces matching (sitemap format, robots,
  manifest 200), the donut geometry byte-identical (341×280 / 200×200 / 331
  both), and the clearance identical (764 ≤ 767 both apps).
- The VLM battery: **3× "Structural Differences: None"** (dashboard desktop,
  budgets mobile, profile mobile) + the dashboard-mobile pair's three flags
  all the documented DOM-disproven genera (the savings-badge conditional
  [the reference's negative balance + $0 income hides it; our seeded 88.5%
  shows it — the KPI card classes byte-identical on both], the
  platform-badge occlusion over the bar's right tabs, and the platform badge
  itself). Every flag disproven by the round's direct byte-census; the
  discipline held.
- The screenshot battery: 12 images recaptured from the live dev server at
  the documented 1512×945 + 390×844 convention — **8/12 byte-identical to
  the s202 set** (the render-stability ladder: s198 10/12 → s199 10/12 →
  s200 11/12 → s201 8/12+2 genus → s202 9/12 → s203 8/12; the
  dashboard-desktop frame byte-identical on the FIRST capture — the s201
  settle-wait lesson applied at capture time), the profile-desktop frame at
  the documented avatar-jitter genus (87 px, bbox (357,255)–(505,374),
  ≤0.0001%), the profile-mobile frame at the avatar-jitter genus in its
  EXACT s202 form (104 px, bbox (84,255)–(235,377), 0.0002% — the
  deterministic genus confirmed), and the two dialog frames at the documented
  backdrop-blur compositing genus — **the card interiors proven unchanged
  this round by the exact-rect crop diff**: the live-measured
  `[role=dialog]` bounds (byte-identical to the s202 measurements:
  532,202,448×542 and 532,316,448×314) crop-diffed against the s202 set —
  16/242,368 px on the Add Transaction card (0.0066%) and 16/140,224 px on
  the Set Budget card (0.0114%), both a 2×17px antialiasing sliver at the
  same in-card x — content byte-identical, the wide-area delta entirely in
  the blurred backdrop (the same capture-environment genus s201/s202
  classified; deterministic per sandbox).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (the eleventh census): the shell, all four pages, the
  mobile bar, the clearance, both dialogs, all titles (404 + aliases + page
  defaults), the sitemap + robots + manifest, the login card, the donut
  geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the e2e battery green in the baseline gate).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: matching the six-knob contract; `db/` at the
  repo root; the db-path seam pinned. `.env.example` tracked at HEAD and
  matching the codebase (no env surface changed this round).
- The Vitest + Playwright suites: in place (410/66), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and matching
  the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence (no
  loops, no deprecation output — the proxy rename live-verified in the
  request traces).
- The security sweep, the docs-count lockstep (incl. the stale-number
  hunt), the skills/ exclusion, the neo-crm stack-pattern lineage.

### F-1 — the raw option-value genus (first observation, informational — documentation remediation)

This round's dialog census upgraded the probe to read the selects' `<option
value>` attributes (prior censuses compared the visible labels, the tab
lists, and the option COUNTS, never the raw value ids). It observed: the
reference's expense select carries `value="health"` for Healthcare, and the
income select REUSES `value="other"` for its Other; ours carries
`value="healthcare"` and disambiguates income-Other as `value="other_income"`.
Classification, investigated before recording:
- **Not a new restyle wave** — the visible surfaces (the labels
  "Healthcare"/"Other", the option counts, the tab swap behavior) are
  byte-identical on both apps; the value attribute is an internal wire id
  invisible to pixels and users.
- **Pre-existing** — the divergence was present in every prior era; this is
  the first round that probed it. Our ids are the documented DB contract
  ("Raw values are stored in the DB; labels/tints/icons are presentation
  only" — `src/lib/categories.ts`), pinned by the Zod schemas, the unit
  suites, and the seeded data.
- **Deliberate divergence, kept** — our expense/income families must not
  collide (`other` vs `other_income`; the reference's own API may namespace
  them per-type, ours validates a union so the raw ids disambiguate
  themselves). Renaming our ids to mirror the reference's would break the
  stored data contract and the pinned tests with ZERO visible gain.
- Remediation: record the genus in `budget-wiser_SKILL.md` §1 (the census
  notes) so a future census compares VALUE attributes knowing the expected
  difference, and does not mis-read it as drift.

### F-2 — the tab keyboard-activation methodology note (probe artifact, informational)

The reference's Add-Transaction Income tab did NOT activate on synthetic
CLICKS this round (aria-selected stayed "false" across three settled
attempts) — while OUR clone's tab activates on the same click. Keyboard
activation (focus + Enter) flipped the reference's tab cleanly and the list
swapped to the income family exactly per the documented contract — proving
the behavior intact and the inert click a probe artifact (the platform's tab
binding does not take synthetic pointer events on the tab node; the
interaction pattern differs from Radix's). Same family as the s199 pushstate
title-read note: a census-methodology footnote — when a reference control
appears inert under a synthetic click, verify via keyboard activation before
classifying functional drift. Recorded in the SKILL §1 alongside the s199
note.

### F-3 — none else (a zero-drift, zero-code-finding round)

No code findings. The round's only other observations are the
capture-environment genera already documented (the backdrop-blur compositing
genus on the dialog frames, the avatar-jitter genus on the profile frames —
the profile-mobile bbox answering its EXACT s202 form) and the data-borne
genera excluded by convention (the reference's owner data vs our seeded
demo month). The dev log carried NO notices this round (not even the s202
sandbox's allowedDevOrigins block).

## 4. Remediation ToDo (documentation true-up + ship — the s200/s202 pattern)

**Phase A — the documentation set**

1. [x] `budget-wiser_SKILL.md` → v1.12.0: the frontmatter version bump +
       the provenance gains the session-203 line (the eleventh census, the
       8/12 battery, the data state holding, the two notes) + §1 gains the
       F-1 raw option-value genus note + the F-2 keyboard-activation
       methodology footnote + Appendix C gains the session-203 row.
       Historical rows keep their era's numbers.
2. [x] The PAD → v2.13.0: the revision block records the eleventh census +
       the zero-code-finding round + the two informational notes + the
       render-stability ladder reading.
3. [x] `docs/session_25.md` (this round's log — Session 17 / Task ID 203)
       + the `worklog.md` entry (Task ID 203, appended, never overwritten).
4. [x] This plan ticked + the execution addendum.
5. [x] README + AGENTS + CLAUDE: **no changes needed** — the counts held
       (410/66/14), no new user-facing contracts, no new architecture
       facts (a zero-drift round; the two notes are census-methodology
       records living in the SKILL where the s199 note lives). Verified by
       the lockstep sweep.

**Phase B — ship**

6. [x] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
       typecheck 0 · 410/410 unit HELD · build · 14/14 smoke · 66/66 e2e
       (CI=1) — all three counts must hold (a docs-only round moves zero
       counts).
7. [x] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit, the
       message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — the wrapper's
       default remote is the OLD task-management repo, so pass `--remote`
       explicitly); verify the remote ref; shred the key.

## 5. Risks and guards

- **No code changes this round** — the gate's three counts must answer
  exactly 410/66/14 (the docs-only invariant).
- The dev server is stopped before the gate's build leg (the documented
  rule; the preflight guard is the backstop, not an invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- The docs lockstep moves in the same commit as the session records (the
  s192/s197 discipline); the SKILL's historical rows + the PAD's dated
  revision blocks keep their era's numbers.

## 6. Execution addendum

- The F-1 genus was investigated to classification before recording: both
  apps' option lists probed on BOTH dialogs and BOTH tabs (the reference's
  expense + income selects; ours the same), the reference's Income tab
  proven functional via keyboard activation after the synthetic clicks
  appeared inert (the F-2 note), and our income family's `other_income`
  disambiguation confirmed against the Zod union contract.
- The donut-geometry probe was upgraded mid-round to the
  `.recharts-responsive-container` form after the naive closest-div probe
  caught a legend-item's 14×14 mini-svg on our side (DOM-order artifact);
  the precise probe answers 341×280 / 200×200 / 331 on BOTH apps —
  byte-identical.
- The local bar census initially targeted `nav` elements only and found
  the reference's bar absent — the reference ships its bar as a plain DIV
  (the documented no-nav-landmark form); our NAV carries the documented
  superset. The corrected probe verified both forms byte-identical.
- The screenshot battery's four delta frames are all the documented genera
  (verified: the dialog card interiors ≤0.0114% via the exact-rect crop;
  the profile-mobile bbox answering its exact s202 form) — the eight
  byte-identical frames produced no git delta (the atomic change set is
  docs + the 4 genus frames).
