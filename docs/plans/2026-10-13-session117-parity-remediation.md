# Session-117 Parity Remediation Plan (2026-10-13)

## Baseline gate (stepwise)
- lint 0/0 · tsc 0 · **109/1951 unit** · build · **137/137 e2e (3.3m, zero
  flakes)** — exactly the s116 ship state (a0bcebb), re-verified after the
  environment rebuild (fresh clone, .env, db push + seed, census MATCH
  15/24/10/23/12 + 4 users, the chromium-1243 repair).

## The audits
- **117-a (the s116 ship-delta, hunk-by-hunk): 8/10 clean — the delta
  GENUINE** (16 files +740/−27, src/ byte-identical, every census/count/
  docs claim measured exact). **Two REAL findings**:
  - **F-117a1** — the README Tested row (:55) tail is byte-identical
    pre/post the s116 ship: the s110–s115 clauses present, the s116
    clause ABSENT (the convention demonstrably held at the s115 ship —
    README is the only doc missing it).
  - **F-117a2** — the D-116a1 battery's wall-clock hazards, genus
    measured and extended by the audit: (a) `crm.spec.ts:146`
    `getByText("18d ago", { exact: true })` — the seed's `d()` helper
    pins every timestamp to 10:00 LOCAL, so Al Noor's `d(-19)`
    lastActivityAt reads daysSince 18 before 10:00 / 19 after — the
    literal flips at 10:00 daily; (b) **the Overdue=13 count shares the
    bomb** — the two `due: 0` seed activities ("Check-in — patient
    portal" at 10:00, "Prepare RFP response" at 14:00) join the overdue
    set after their seeded hours (→14 after 10:00, →15 after 14:00),
    and the first-row "Meeting" badge reorders with them (the
    createdAt-desc order puts the joiners FIRST).
  - Record-only: the tab-4 e2e comment calls the Leads List
    "OPPORTUNITY-derived / immune to the :39 lead" but the route reads
    `db.lead` — the :39 lead IS row 1; the asserts hold via the slice
    cap + the dialog's default stage "new".
- **117-b (the standing layers, ~75th consecutive): 9/9 PASS** — SEO
  live 6/6 (sitemap 9 lowercase locs · robots · manifest · og family ·
  the /login auth head · 307s), drawer 10/10, design-tokens 15/15,
  vocabulary 6/6, config zero drift, census MATCH, Tailwind 137 token
  lines, the ledger unchanged (10 test blocks; db-path 20/20), metadata
  37/37. Both records appended to worklog.md.

## The live verification (pre-plan, orchestrator-run)
- **probe:ref — the 88th consecutive STABLE** (bundle md5
  `a70a637fcf1d4291da8e0d965676dc11` exact; the TRUE-390 mobile-nav
  defect STANDS — the reference's own bug, 38th confirmation; demo data
  ZERO — the reference's zero-data genus re-confirmed).
- **The four drift gates CLEAN** — desktop 1440 · phone 390 · tablet
  768 · landscape 1024, each `--fail-on-drift` (no re-baselining).
- **census MATCH** (15/24/10/23/12 + 4 users). **Scandihaven re-cloned
  at `d4789c3`** — matching the standing record exactly (on-pattern,
  nothing new to adopt).

## The rotation (117-c) — THE ACCOUNTS-LIST FAMILY WALK (two-app zero-data + ours-only populated)
The stalest un-re-walked family (the s86-era decode, 31 sessions; the
rotation ledger names it — the plans are the authoritative walk ledger).
The walk: both apps driven through /accounts at 1440×900 + 390×844 with
computed-style + census extraction, login first on both, the zero-data
tool on the scratch walk db (PORT 3141, the s115/s116 precedent; the
server + walk inside a single Bash call — processes don't survive
between tool calls in this environment).

### THE ZERO-DATA FACE (two-app) — COMPLETE byte-equal parity
- The KPI row: **5 labels byte-equal** (Total Accounts · Active
  Accounts · Key Accounts · Total Revenue · Overdue Activities), the
  zero values (0/0/0/$0.0M/0), the 12px/400 labels + 30px/700 values
  @1440 (24px/700 @390 — the sm:text-3xl breakpoint), the grid columns
  byte-equal (211px ×5 @1440).
- The toolbar: the Table/Cards switcher ("Table"), byte-equal @1440.
- The table: **the 8 heads byte-equal** (Account Name · Industry ·
  Revenue · Tier · Owner · Last Activity · Status · the w-12 ⋮ head);
  the empty state byte-equal ("No accounts found", 14px/400
  rgb(107,114,128), centered, firstRowH 85).
- The rail: 320px @1440 / display:none @390 — byte-equal both widths.
- **The 390 overflow face = the documented s95 genus, re-confirmed
  live 22 sessions on**: the reference's bare `flex-1` content column
  lets its 472px table card poke out (toolbar 440) and MAIN h-scrolls
  (mainScrollW 488); ours' `min-w-0` contains the card at 358 (toolbar
  326) with the table scrolling INSIDE its own box (natural 945 vs card
  358, mainScrollW 390-contained). The standing adjudication holds:
  visually equivalent, do NOT restructure.

### THE POPULATED FACE (ours-only — the reference's zero-data genus)
Every axis healthy against the s28/s75/s86 decoded contracts:
- The KPI values **10 / 8 / 9 / $77.5M / 3** (seed-verified
  independently: 10 accounts · 8 active · 9 Key-tier by the
  >$1M revenue rule + 1 A · $77.5M summed · 3 accounts with ≥1
  past-due scheduled activity — Northwind/Cedar/Al Noor).
- The tier census **9 Key + 1 A**; **the star census 9** (the
  lucide-star fill-yellow-500 on exactly the Key rows); the health
  census **Healthy 5 / At Risk 3 / Needs Attention 2**.
- The overdue rows: **3 × "1 Overdue"** destructive badges + the 4px
  red left borders on exactly 3 rows; the Key tint computes
  **oklab(0.987293 -0.00550365 0.0256573 / 0.3)** (the v4
  bg-yellow-50/30).
- **The name-only search predicate verified LIVE**: "Logistics" → 1
  row = Sahara Logistics BY NAME (Emirates Global Trading, industry
  Logistics, NOT matched); "Finance" → the empty state (Meridian
  "Financial" lacks the substring); "Manufacturing" → Al Noor BY NAME.
- The Cards view: the switcher swaps the table for the card grid —
  **3 cols × 240px × 10 cards** @1440, hasTable=false after the
  switch.

### THE RESULT — zero real parity defects; three freeze finds
The s116 close's pattern: the walk surfaces no parity defect (the
family's constructions byte-equal/healthy), but the audit + the pin-gap
analysis surface the freezes:
- **D-117a0 (the F-117a2 defuse)** — the reports battery's three
  wall-clock hazards + the comment error.
- **D-117a1 (the e2e battery)** — the accounts e2e test is THIN
  (heading + one name + one search query; zero populated-row
  contracts — the exact D-116a1 genus).
- **D-117a2 (the unit pin)** — the five accounts KPI labels never
  pinned as a set: "Total Accounts" appears in ZERO test assertions
  (the exact D-116a2 genus).

## S117-P0 (the defuse — the F-117a2 remediation, INSIDE the existing reports test)
1. **The "18d ago" literal → the bounded pattern** `/^1[89]d ago$/`
   (the seed anchor d(-19) @ 10:00 → daysSince 18 before 10:00, 19
   after; the e2e currently passes only because the suite runs before
   the 10:00 flip).
2. **The Overdue count → the bounded 13–15** (13 before 10:00 · 14
   after 10:00 · 15 after 14:00 — the two due:0 joiners; manual count +
   the toBeWithin bounds, Playwright's toHaveCount is exact-only).
3. **The first-row "Meeting" → the card-level badge** (the joiners
   reorder the first row via createdAt-desc; the badge census is
   row-independent at the card level).
4. **The tab-4 comment correction** (the Leads List is LEAD-derived;
   the :39 lead IS row 1 — the asserts hold via the slice cap + the
   dialog's default stage "new").

## S117-P1 (the unit pin — ONE new it, in an EXISTING file)
`tests/account-contacts-parity.test.ts` (the accounts/contacts
table-family parity suite, s75, 20 its — already carrying the accounts
KPI family): **the five-KPI-label census pin** — the labels as an
ordered set + the per-card trend/color adjacency (trend="up" on the
first four, NONE on Overdue; blue/green/cyan/purple/red) + the arm
census on the comment-stripped source (trend="up" ×4 · color= ×6, the
sixth the Cards-view Avatar's hex — a seventh color site is a parity
event, not a growth). UNIT 1951 → 1952 (+1); SUITES stays 109.

## S117-P2 (the e2e freeze — expects INSIDE the existing test, the census stays 137)
INSIDE the `:52` accounts test, after the existing search asserts:
- The five KPI values (10 / 8 / 9 / $77.5M / 3) via the
  label→card→value ladder.
- The tier census (9 Key + 1 A) + the star census (9) on the table.
- The 3 overdue rows (the "1 Overdue" badges + the border-l-4 class).
- The Cards view switch (3×240×10, the table gone).
- The name-only predicate is already pinned live (the existing
  "Meridian" query + the count-0 negative).

## S117-P3 (the count ladder + the docs realignment)
- **UNIT 1951 → 1952** · SUITES 109 unchanged · E2E 137 unchanged ·
  badge 2088 → 2089.
- docs-counts: the UNIT const + the s117 comment + the layer-axis
  block (the s117 head over the s116 second layer).
- dialog-geometry: the CLAUDE lockstep 4-site carry (1952 + the 1951
  negatives).
- README: badge 2089 + the Tested row **gains BOTH the s116 clause
  (closing F-117a1) and the s117 clause** + the 1952 count.
- AGENTS: the two count sites + the §Session-117 block.
- CLAUDE: the four count sites.
- PAD: the five count sites + the s117 inventory row (before the Total
  row).
- SKILL: v1.113.0 → v1.114.0 (frontmatter + H1) + the project_state
  s117 layer prepended + Appendix B 1952 + §16de appended.

## S117-P4 (the captures)
196–199 under docs/screenshots/ (the standing build on PORT 3141 + the
scratch walk db): **196** the accounts table rows @1440 (the tier
badges + stars + the red overdue borders) · **197** the page top @1440
(the KPI row) · **198** the phone face @390 · **199** the Cards view
@1440. The VLM battery: 4 checks × 4 captures (geometry · census ·
fonts · containment).

## S117-P5 (the ship)
The house-style commit (feat: session-117 …) + the SSH-wrapper push to
`git@github.com:nordeim/neo-crm.git` (main only) + session_252.md (the
feat log) + this plan's execution record + the worklog append.

## The TDD ladder (the predictions)
- **RED-1**: the four staged files against the still-old docs — the
  docs-counts family (13 tests, the 1952 const vs the 2088 badge +
  every doc site) + the CLAUDE lockstep carrier — predicted
  **12–15 failed | 1937–1940 passed**; then the stash-proof (stash →
  native 1951/1951 GREEN → pop → RED restored).
- **GREEN**: the docs realignment → **109/1952**.
- **RED-2** (both faces, by name): Face A — a unit label edit on the
  accounts page ("Total Accounts" → "Total Accounts ") fails the
  D-117a2 pin by name; Face B — an e2e-predicate edit (the "Active
  Accounts" KPI value 8 → 9 expectation) fails the D-117a1 battery by
  name. Restore via git checkout (the s116 replace-first-match lesson).
- The e2e phase: the single-test first run (the D-117a1 + D-117a0
  files) then the full suite 137/137 (the S72-P2 debounce flake
  documented — isolate + re-run).

## The validation checklist (pre-execution)
- [x] "Total Accounts" in ZERO test assertions (grep-verified)
- [x] trend="up" ×4 real sites + the :239 comment (stripComments
      neutralizes it in the host); color= ×6 (5 KPI + the :368 Avatar
      hex — present in stripped source)
- [x] The seed contract 10/8/9/$77.5M/3 + 9 Key/1 A + 3 overdue
      (Northwind/Cedar/Al Noor) — db-verified
- [x] The D-116a1 hazards: "18d ago" :146 · Overdue=13 :186 · the
      first-row "Meeting" :188 · the tab-4 comment :203
- [x] The crm.spec :52 accounts test — the insertion point after the
      existing search asserts
- [x] The BarStatCard DOM (Card > CardContent.p-4 > span.text-xs label
      + div.text-2xl value) — the e2e ladder
- [x] The line-census set does NOT cover the two edit targets
      (account-contacts-parity + crm.spec's accounts test) — no
      in-flight re-anchor (the s116 precedent)

## The execution record (2026-10-13, session-117)

- **The intake:** the third restart — but this time the workspace
  SURVIVED (the worklog audit records intact, HEAD a0bcebb, the
  environment fully standing: .env, db, deps, chromium-1243, the
  .next/standalone build — no rebuild needed). The live verification
  resumed at the drift sweeps.
- **The gate (final):** lint 0/0 · tsc 0 (after the five throwaway
  scripts deleted — one tripped a pid-typing error) · **109/1952** ·
  build standing · **137/137 e2e (3.4m)** · **src/ ZERO files changed**
  (the freeze session) · census MATCH · **the four drift sweeps CLEAN
  at close** (desktop 1440 · phone 390 · tablet 768 · landscape 1024,
  each --fail-on-drift, no re-baselining).
- **S117-P0 (the defuse):** all four landed — the `/^1[89]d ago$/`
  bounded pattern at the At Risk card; the Overdue 13-15 bounds with
  the manual count; the card-level Meeting badge (one strict-mode
  lesson mid-run: three meeting-type rows exist — the `.first()`
  scoping, the badge census genuinely row-independent); the tab-4
  comment corrected (LEAD-derived, the :39 lead IS row 1).
- **S117-P1 (D-117a2):** the five-KPI-label census pin staged
  clean (21/21), the per-card adjacency + the arm census
  (trend="up" ×4 · color= ×6) — RED-2 Face A failed it BY NAME with
  the "Total Accounts " label edit, restored via git checkout.
- **S117-P2 (D-117a1):** the battery INSIDE the :52 accounts test —
  the five KPI values (the label→card→value ladder), the tier census
  (9 bg-yellow-100 + 1 bg-green-100 on the Tier column), the star
  census 9, the three overdue rows with the border-l-4 classes, the
  Cards-view switch (the table gone, 10 cards). RED-2 Face B failed
  it BY NAME (the "Active Accounts" 8→9 edit, expected "9" received
  "8"), restored. The battery passed FIRST RUN after the restore
  (after the reports-test strict-mode fix); the full suite 137/137.
- **S117-P3 (the count ladder):** UNIT 1951→1952 · SUITES 109 · E2E
  137 · badge 2088→2089 — README (badge + the three count sites + the
  Tested row's s116 [F-117a1 CLOSED] + s117 clauses, one
  junction-bracket repair), AGENTS (2 sites + §Session-117), CLAUDE
  (4 sites), PAD (5 sites + the s117 inventory row), SKILL v1.114.0
  (frontmatter + H1 + the project_state s117 layer + Appendix B +
  §16de).
- **S117-P4 (the captures):** 196-199 (the standing build on PORT
  3141, the seeded scratch db) — four unique md5s. **The VLM battery
  4/4 × 4** with two adjudications: 196's 6 visible headers (the
  Status/⋮ columns ride the documented in-box scroll, the s95 genus;
  the e2e 8-head pin authoritative) + 196's 8-star first read (the
  targeted re-read settles 9; the e2e toHaveCount(9) authoritative).
  197/198/199 CLEAN (the KPI census verbatim · the phone stack + no
  rail + containment · the 3×240×10 cards view with all 10 names).
- **The TDD ladder as executed:** RED-1 13 failed | 1939 passed (1952)
  — inside the 12-15 prediction, enumerated by name, stash-proven
  (the native 1951/1951 → pop → RED restored) → GREEN 109/1952 →
  RED-2 both faces by name → the batteries first-run clean → the full
  suite 137/137.
- **The tree:** src/ = ZERO files; the four test files; the five
  docs; the plan; the four captures; session_252.md; the worklog.

