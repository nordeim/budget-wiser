# Session-116 Parity Remediation Plan (2026-10-13)

Session 116 on `main` @ `60c2de0` (the s115 ship `ee094b1` + the
follow-ups `c2e4d46` [session_246/247] and `60c2de0` [session_248]). The
workspace had been RESET: a fresh clone, the environment REBUILT per the
s113/s115 intake pattern (`.env` from `.env.example` + a fresh
`AUTH_SECRET`, `db:push` + `db:seed`, the census MATCH on the first try,
533 packages; the 116-b environment repair: the cache held chromium
1200/1248 but playwright-core 1.63.0 needs `chromium_headless_shell-1243`
— installed once, left standing). The scandihaven pattern repo re-cloned
at `d4789c3` (on-pattern, nothing new to adopt — the s114/s115 standing
holds). Every op under `env -u DATABASE_URL` (the shell's stray hazard,
re-confirmed at intake: `DATABASE_URL=file:/home/z/my-project/db/custom.db`).
The repo `skills/` folder excluded from checking/testing/compilation
throughout.

## Baseline gate (stepwise)

- lint 0/0 ✓ · tsc 0 ✓ · 109 files / 1950 tests ALL PASSING (15.06s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m, zero flakes) ✓ — exactly the
  s115 ship state.

## The audits

- **116-a (subagent)**: the s115 ship delta (`c4a0fdc..60c2de0`)
  **GENUINE PASS 14/14 — zero real findings**. All 21 delta files mapped
  to the plan hunk-by-hunk (the ee094b1 feat 18 files +876/−35 exact;
  the two docs-only follow-ups; src/ byte-identical — the freeze session
  as planned; the count arithmetic exact at 109/1950/137/2087; both new
  its non-vacuous source-reading pins — the D-115a1 six htmlFor/id pairs
  + the negative, the D-115a4 segmented construction; the e2e census 137
  via `playwright --list` — 8 files incl. auth.setup; zero unaccounted
  files, zero leftover s115-* scripts; the captures 188-191 valid PNGs;
  5 record-only notes [N1 the $0.0M-only value pin, N2 the stripComments
  helper split, N3 the `:not(idden])` display-mangle od-verified, N4 the
  def-follow indexOf anchor scoping, N5 the --list authoritative census]).
- **116-b (subagent)**: the standing-layers audit **9/9 PASS — zero real
  findings** (~73rd consecutive). The SEO/sitemap live check 6/6 on the
  standing standalone build (scratch db, PORT 3127, killed + cleaned:
  sitemap 200/application/xml/9 lowercase URLs/weekly/1.0+0.8 · robots'
  Sitemap line · the manifest JSON + "NEO CRM" · /login's 405-char
  description + the full OG/Twitter set · /accounts' 307 + canonical).
  The drawer battery **10/10 exit 0 at TRUE 390×844** (the trigger
  36×36, the panel 288px, all 8 links, the dual scroll lock, the three
  close paths, the resize release, the reopen re-lock). design-tokens
  15/15 · the vocabulary pair 6/6 · config zero drift (the postcss
  plugin + no tailwind.config + the pinned e2e db `file:../db/e2e.db` +
  the skills/ exclusion in all four configs) · census MATCH · the
  Tailwind v4 layer byte-standing (137 token lines, zero var() chains in
  @theme, the shadow-sm/blur-sm re-pins) · the reference-defect ledger
  unchanged (the mobile-nav spec's 10 checks + the db-path pins 20/20 +
  the http-headers/metadata/pwa-metadata 37/37).

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 87th consecutive**;
  census: demo zero · desktop 256px/8 STANDING · the mobile-nav defect
  STANDS at TRUE 390 (the 37th consecutive — the reference's own bug,
  our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each) + the closing census MATCH (15/24/10/23/12 + 4 users).

## The rotation (116-c) — THE REPORTS-TABLES FAMILY WALK (two-app zero-data + ours-only populated)

The s115 close's single remaining candidate (the un-walked list's last
name). The walk: two throwaway scripts (`scripts/s116-walk{,2}.ts` —
repo-internal, deleted before ship) driving BOTH apps through /reports
at 1440×900 + 390×844 (login first — the s114 pass-3 lesson), plus the
zero-data tool on the scratch walk db (PORT 3141, the s115 precedent):

- **The ZERO-DATA face — walked TWO-APP, COMPLETE byte-equal parity on
  every computed axis at both widths**: the five tab triggers (texts
  byte-equal; 222×28 14px/500 each @1440 · 174×24 12px/500 @390 — the
  pill grid construction); the ten table heads byte-equal; the ten
  CardTitles byte-equal (incl. "Top Deals by Value" + "Deals at Risk
  (No Activity 14+ Days)"); the ten empty-state copies byte-equal; the
  empty rows 14px/400 rgb(107,114,128) centered, firstRowH 37 on both;
  the card-height family byte-equal (the plain-header tables 167 at
  both widths · the two pipeline tables' export-button headers 189
  @1440 · the phone title-wraps 215 + 247 @390); the chart-card census
  byte-equal (titles + 548/357 widths + 390 heights + the Forecasting
  Accuracy 1120-wide row); docScrollW contained 1440/390 on both.
- **The POPULATED face — walked OURS-ONLY** (the reference's zero-data
  genus, re-confirmed live — every table at its empty state): the ten
  tables' seeded row contracts (Recent Won 4 · Top Deals 10 · Open
  Deals 6 · At Risk Deals 5 · Overdue 13 · By Owner 4 · Leads List 10 ·
  Source Perf 5 · At Risk Accounts 2 · Account Summary 10 — the API
  census at quarter AND all-time identical, all seeded rows in-window);
  the first cells 14px/500 rgb(10,10,10) font-medium; the outline Badge
  census (5 sites: topDeals stage `closed_won` · openDeals `prospecting`
  · overdue type `Meeting` · leadsList status `new` · accountSummary
  status `active` — the STOCK chrome 12px/600, border #e5e5e5, radius
  6px, transparent bg); the red-tint rows (bg-red-50 rgb(254,242,242)
  on exactly 3 tables: dealsAtRisk + overdue + atRiskAccounts); the red
  At Risk badge (bg red-100 rgb(254,226,226) / text red-800
  rgb(153,27,27)); the "18d ago" last-activity text; the overdue date
  "Oct 11, 2026" (MMM d, yyyy); the $87K revenue cell — every measured
  axis healthy against the s27/s31/s74/s85 decoded contracts.
- **Record-only (adjudicated away)**: the reference's zero-data faces
  carry no rows to compare (the standing genus — the populated faces
  verified against the decoded contracts instead, the s113 row-menu
  precedent) · the chart internals (recharts defaults — the s70-p2/
  s85 pins hold them) · the KPI row (the s107 seeded freeze holds it)
  · the populated card heights (row-count-dependent, not a parity axis).

### THE RESULT — zero real parity defects; two freeze finds

The walked family is in complete live parity (the zero-data face,
two-app byte-equal) and healthy against its decoded contracts (the
populated face, ours-only). NO src fix ships this session — both finds
are freezes of measured-standing, unpinned constructions:

- **D-116a1 (the populated-tables e2e battery — measured healthy,
  unpinned)**: NO e2e has EVER asserted the tables' populated rows —
  the crm.spec:97 test switches the tabs and asserts TITLES + the KPI
  row only; the s105 reports-mobile walk asserts the tab triggers +
  KPI cards + containment. The row contracts, the badge texts, and the
  red-tint classes are invisible to every standing gate. FREEZE: the
  expects INSIDE the existing crm.spec:97 test (the census stays 137).
- **D-116a2 (the ten-title + risk-construction census — unpinned)**:
  the ten CardTitles were never title-pinned as a set (only 6 of 10
  ride e2e visibility asserts; "Top Deals by Value" appears in NO test
  assertion); the outline-Badge census (5 sites) + the bg-red-50 row
  census (3 sites) + the red At-Risk badge (1 site) are construction
  facts measured live this session, unpinned at the source layer. THE
  PIN: +1 it in reports-tabcontent-parity.test.ts.

## S116-P1 (the unit pin — ONE new it, in an EXISTING file)

`tests/reports-tabcontent-parity.test.ts` (D-116a2):

1. **+1 it**: the ten CardTitles byte-pinned as a set (Recent Won Deals
   · Top Deals by Value · Open Deals by Stage · Deals at Risk (No
   Activity 14+ Days) · Overdue Activities · Activity Log by Owner ·
   Leads List by Source · Source Performance Summary · At Risk Accounts
   · Account Summary) + the construction census: exactly 5
   `<Badge variant="outline">` sites, exactly 3 `className="bg-red-50"`
   TableRow sites, exactly 1 `bg-red-100 text-red-800` At Risk badge —
   read on the RAW source (the s114 stripComments `/*` lesson: title
   strings carry no comment hazards but the raw read is the house
   default for freeze pins; the walk's live-measured 12px/600 badge
   census + the three risk tables' rgb(254,242,242) noted in the
   comment).

## S116-P2 (the e2e freeze — expects INSIDE the existing test, the census stays 137)

2. `tests/e2e/crm.spec.ts` (D-116a1): INSIDE the existing "reports page
   loads analytics tabs with seeded data" test (:97) — BEFORE the
   All-Time switch (the default quarter, matching the walk): the
   default-tab tables' titles + row counts ("Recent Won Deals" 4 ·
   "Top Deals by Value" 10, the tbody tr census scoped per card). After
   the existing per-tab title asserts: the row counts (Open Deals 6 ·
   Deals at Risk 5 · Overdue 13 · By Owner 4 · Leads List 10 · Source
   Perf 5 · At Risk Accounts 2 · Account Summary 10) + the battery:
   the outline-Badge texts on the first rows (`prospecting` ·
   `Meeting` · `new` · `active` — class-scoped, the s115 strict-mode
   lesson), the bg-red-50 class on the three risk tables' first rows,
   the red "At Risk" badge, and the "18d ago" last-activity cell
   (exact-match, the substring genus).

## S116-P3 (the count ladder + the docs realignment)

- **UNIT 1950 → 1951** (+1: the D-116a2 it, in an EXISTING file) ·
  **SUITES 109 UNCHANGED** · **E2E 137 UNCHANGED** (added expects, zero
  new its) · **badge 2087 → 2088**.
- The docs: SKILL v1.113.0 (frontmatter + project_state — the s116
  layer prepended + the H1 lockstep + §16dd + the Appendix B unit total
  1951) · README badge 2088 + the Tested row's s116 clause · AGENTS the
  commands/gate counts 1950→1951 (two sites) + the §Session-116 history
  block · CLAUDE the unit-count sites 1950→1951 (four sites) · PAD the
  count sites + the s116 inventory row + Total/HEAD 109|1951+137.
- The session docs: `docs/session_249.md` (the feat log, in the feat
  commit) + session_250/251 (the summary + narration, the follow-up
  commit).

## S116-P4 (the captures)

Four captures on the standing build + the scratch walk db (the s112/
s113/s114/s115 precedent): **192** the reports Sales Overview tab's
tables @1440×900 (the Recent Won Deals + Top Deals by Value populated
cards) · **193** the Pipeline & Forecast tab @1440×900 (the Open Deals
+ Deals at Risk populated cards with the export buttons + the red-tint
rows) · **194** the Activity & Productivity tab @390×844 (the phone
face — the Overdue Activities red-tint rows + the badges) · **195** the
Account Health tab @1440×900 (the At Risk Accounts red rows + the red
badge + the Account Summary outline badges). The VLM battery (4 checks
each): the geometry, the census, the fonts, the containment.

## S116-P5 (the ship)

The house-style commit (the reports-tabcontent-parity pin + the
crm.spec expects + the docs family + the captures + session_249 + the
s116 plan + its execution record + the worklog; the walk scripts deleted
before ship) → the SSH push per the runbook (the operator key OUTSIDE
the repo, the fingerprint VERIFIED, the dry-run, the real push —
`--remote git@github.com:nordeim/neo-crm.git` explicitly, the s112
wrapper-default lesson) → the session-log follow-ups (session_250/251)
→ the close-out.

## The TDD ladder (the predictions)

- **RED-1** (the pin + the re-anchors staged against the still-old
  docs): the UNIT const re-anchor (1950→1951) cascading through the
  docs-counts family (the README badge/file-tree/commands/Tested its +
  the AGENTS commands/gate-order its + the PAD file-tree/Total/HEAD/
  checklist its + the H1/project_state lockstep + the Appendix B —
  ~12-15 failed); the D-116a2 it STAGING-PASSES (the construction
  stands — the s112 camera precedent; a freeze pin of a
  measured-standing construction). Stash-proof: the staged files
  stashed → the native run ALL GREEN → pop → the RED re-confirmed.
- **GREEN**: the S116-P3 doc realignment → **109 files / 1951 ALL
  PASSING** + lint 0/0 + tsc 0.
- **RED-2 (both faces)**: (A) the title edit — one CardTitle string
  edited in reports-page.tsx → the D-116a2 it FAILS by name →
  restored; (B) the tint edit — one `bg-red-50` dropped from a risk
  TableRow → the D-116a2 it FAILS by name → restored. Both restored →
  full GREEN.

## The validation checklist (pre-execution)

- [ ] The D-116a2 it's edit sites: the ten CardTitles live ONLY in
      `reports-page.tsx` (:503/:541/:691/:733/:832/:869/:956/:996/:1068/
      :1101 — verified by read); the outline-Badge sites = 5, the
      bg-red-50 row sites = 3 (:761/:850/:1086), the red badge = 1
      (:1090) — verified by grep; no existing test title-pins the set
      (verified — rg finds the titles only in comments + the 6 e2e
      visibility asserts).
- [ ] The e2e site: crm.spec.ts:97 — the existing assertions UNTOUCHED
      (the battery additive, the default-tab block BEFORE :114's
      All-Time switch; the per-tab blocks AFTER each existing title
      assert); the row-count locators scoped per card (the strict-mode
      genus); "18d ago" exact-matched.
- [ ] The count arithmetic: 1950 + 1 = 1951; 1951 + 137 = 2088; the
      badge formula UNIT+E2E.
- [ ] The captures' geometry envelopes match the walk's live
      measurements (the populated cards 548 wide @1440 / 358 @390; the
      red-tint rows rgb(254,242,242); the badges 12px/600).

## The execution record (2026-10-13, session-116)

- **RED-1:** 13 failed | 45 passed (58) — the 12 docs-counts-family its
  (the README badge/file-tree/commands/Tested + the AGENTS
  commands/gate-order + the PAD file-tree/Total/HEAD/checklist + the
  H1/layer-axis lockstep + the Appendix B) + the CLAUDE lockstep
  carrier (the dialog-geometry suite), all enumerated by name. The plan
  predicted 12-15 — 13 landed inside it. Stash-proven: the four staged
  files stashed → the native **57/57** → pop → 13 RED re-confirmed
  (57 + the 1 new it = 58 exact). The D-116a2 it staging-passed as
  predicted (the s112 camera precedent).
- **GREEN:** the S116-P3 doc realignment (README badge 2088 + the
  Tested row + the tree + the commands comment; AGENTS the two count
  sites + the §Session-116 block; CLAUDE the four sites; PAD the five
  count sites + the s116 inventory row; SKILL v1.113.0 [frontmatter +
  the H1 + the project_state s116 layer prepended + §16dd + the
  Appendix B unit total]) → **109 files / 1951 ALL PASSING**. NO
  in-flight line-census re-anchor: the crm.spec growth is outside the
  thirteen-census set (the pin covers settings-mobile/
  mobile-navigation/reports-mobile specs only — verified by read).
- **RED-2 (both faces):** (A) the title edit — "Top Deals by Value" →
  "Top Deals" in the source → the D-116a2 it FAILED by name → restored
  → 18/18; (B) the tint edit — the bg-red-50 dropped from the
  at-risk DEALS row → the D-116a2 it FAILED by name → restored. One
  in-flight lesson on the restore: the first `replace(…, 1)` hit the
  FILE's first `key={d.id}` row (the recentWonDeals row at :524), not
  the dealsAtRisk row at :761 — the swap kept the census totals at 3
  (both rows wrong, the count right), so the census pin held while the
  site was wrong; the restore went through `git checkout --` for a
  byte-identical src (the freeze session's zero-src-change proof rides
  the git tree, not the patch arithmetic).
- **The e2e phase:** the single-test verification passed FIRST RUN
  (the battery's scoped locators clean — the s115 strict-mode lessons
  pre-applied). The first full run **136/137** — the S72-P2 debounce
  test failing (the documented s114 flake genus, NOT the battery: the
  battery is read-only — tab switches + visibility/count/class
  asserts, zero mutations); the isolated re-run PASSed, then the full
  re-run **137/137 (3.3m)** with the populated battery (the row
  contracts + the badge texts + the red-tint classes + 18d ago + the
  MMM d, yyyy pattern) green in the full-run context.
- **GATE (stepwise):** lint 0/0 (the throwaway walk/capture scripts
  deleted BEFORE the gate) · tsc 0 · **1951/1951** unit [109 suites,
  +1 net] · build · **137/137** e2e (re-run against the fresh build —
  the gate-order rule) · the four drift sweeps CLEAN (desktop 1440 ·
  phone 390 · tablet 768 · landscape 1024, each --fail-on-drift — NO
  re-baselining; zero src changes render byte-identical) · the closing
  census MATCH (15/24/10/23/12 + 4 users). The tree: src/ = ZERO
  files changed; the four test files; the five docs; the s116 plan;
  the four captures; the worklog.
- **S116-P4 (the captures):** the throwaway capture script (the
  standing build on PORT 3141 + the scratch walk db, deleted after).
  **192** the Sales Overview tables @1440 · **193** the Pipeline tab
  @1440 (the red-tint rows + the export buttons) · **194** the
  Activity tab @390 (the phone face) · **195** the Account Health tab
  @1440 (the red badge + the outline badges). **The VLM battery 4/4 ×
  4** — the row contracts read verbatim (192's 4-row won table · 193's
  6/5 · 195's 2/10), the export buttons on both pipeline headers, the
  red tints, the badges (closed_won/prospecting/Meeting/active), the
  18d ago cell, the MMM d, yyyy format, and the 390 containment.
  **One adjudication:** the first 192 read "11" rows on the Top Deals
  table vs the e2e-pinned 10 — the header-row miscount genus; the e2e
  `toHaveCount(10)` is the authoritative pin and passed 137/137
  throughout.
