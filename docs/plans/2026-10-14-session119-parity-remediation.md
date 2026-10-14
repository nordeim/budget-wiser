# Session-119 Parity Remediation Plan (2026-10-14)

## Baseline gate (stepwise)
- lint 0/0 · tsc 0 · **109/1953 unit** · build · **e2e 137/137** (run 1:
  136/137 — ONE failure, the S72-P2 settings-debounce test; root-caused
  by the 119-a audit as **F-119a1, a load-order race — NOT a
  time-bomb**: the DefaultsEditor pending→resolved epoch remount
  (`key={settings ? "resolved" : "pending"}`) races the test's fill;
  reproduced 4/4 by the audit incl. unloaded; passed in isolation +
  the full-suite re-run). The s118 ship state otherwise exactly
  standing (git pull 5f98c77 → 698b869 — the user's session_255.md
  narrative-log addition, docs-only; census MATCH 15/24/10/23/12 + 4
  users on the standing environment).

## The audits
- **119-a (the s118 ship-delta, bb33571..698b869): 7/7 shipped claims
  Verified** (the freeze genuine — ZERO src/ files; the D-118a0 defuse
  verified + LIVE at 00:53 UTC; the D-118a1 batteries' every literal
  seed-verified; the D-118a2 pin +1 it verified; the count ladder
  109/1953/137/2090 exact; the docs realignment measured; the captures
  200-203 4 unique md5s). **F-119a1 (Medium, test-infra)** — the S72-P2
  flake root-caused: NOT parallel workers (workers:1), NOT wall-clock
  (zero Date inputs) — the epoch remount races the fill; the victim
  asserts :2840/:2845; a 1-line epoch-gate before the fill retires the
  9-session flake lineage. Record-only: the month-roller's seed-time vs
  test-time midnight-straddle (the F-118a3 genus, sub-minute).
- **119-b (the standing layers, ~77th consecutive): 9/9 PASS** — SEO
  live 6/6 · drawer battery 10/10 exit 0 · design-tokens 15/15 ·
  vocabulary 6/6 · config zero drift · census MATCH · the Tailwind v4
  layer 137 token lines · the defect ledger 10 blocks + db-path 20/20 ·
  metadata 37/37. Record-only: N-119b2 (the @utility carrier count — 3
  rule carriers + the comment mention) + N-119b3 (the E2E_DATABASE_URL
  line-number variance, no drift).

## The live verification (pre-plan, orchestrator-run)
- **probe:ref — the 90th consecutive STABLE** (bundle md5
  `a70a637fcf1d4291da8e0d965676dc11` exact; demo data ZERO; the
  TRUE-390 mobile-nav defect STANDS — the reference's own bug).
- **The four drift gates CLEAN** — desktop 1440 · phone 390 · tablet
  768 · landscape 1024, each `--fail-on-drift`.
- **census MATCH**. **Scandihaven standing at `d4789c3`** — on-pattern.

## The rotation (119-c) — THE CONTACTS-LIST FAMILY WALK
The s118 close's named candidates (the s27/s31-era derivations' home
surface — the contacts-list family, the s75-era decode 43+ sessions
stale, never live-walked two-app in the s111+ era). Both apps driven
through `/contacts` at 1440×900 + 390×844 with computed-style + census
extraction, login first on both, the zero-data tool on the scratch
walk db (PORT 3141, the s115-s118 precedent). The walk scripts OUTSIDE
the repo (the s118 precedent).

### THE ZERO-DATA FACE (two-app) — byte-equal EXCEPT TWO REAL DEFECTS
- **The statcards**: 4 cards byte-equal (Total Contacts · New This
  Month · Top Decision Makers · No Recent Activity — the zero values
  0/0/0/0, the trend "+0" green rgb(22,163,74) on New This Month,
  14px/500 labels rgb(75,85,99) + 30px/700 values rgb(17,24,39), the
  chips bg-blue-500/green-500/amber-500/red-500 rgb-exact 48px with
  white icons, the gradient cards 268×142 @1440 / 326×122 @390, the
  1120px ×4 grid @1440, radius 12px, border #e5e5e5).
- **The toolbar**: byte-equal (the search 448px "Search contacts...",
  the Filters button, Import/Export/New Contact geometry 153×36).
- **The 8 table heads**: byte-equal (Name/Role/Priority/Last
  Activity/Engagement/Company/Source/Actions — 14px/600
  rgb(55,65,81), the cursor-pointer sort affordances on Name + Last
  Activity, the default chevron on Last Activity, the widths
  256/72/106/190/163/126/99/105).
- **The rich empty state**: byte-equal (the CircleUser 48px
  rgb(209,213,219), "No contacts found" 14px/500 rgb(107,114,128),
  "Try adjusting your search or filters" 14px/400, rowH 201 both).
- **The kke filter panel (opened LIVE)**: byte-equal at BOTH widths
  (the 6 cards — Role 5 boxes / Priority 3 / Activity Status 1 /
  Company Size 3 / Source 5 / Engagement Level 3, the labels verbatim,
  position static @1440 w320 h836 shadow-none borderL 1px, Clear All
  12px/500).
- **docScrollW contained** 1440/390 on both apps.
- Noise adjudicated: the v4 oklab gradient serialization (the color
  stops identical — the s112 serialization genus).
- **THE TWO REAL DEFECTS (the session's finds)**:
  - **F-119c1 — the mobile-list EMPTY-STATE branch is INVENTED**: ours
    renders `<p>No contacts found</p>` (16px/400 gray-500 py-32) in the
    lg:hidden container at zero data; the LIVE reference renders the
    EMPTY CONTAINER (class `lg:hidden mt-6 space-y-4`, display:block,
    **childN: 0, text: ""** — the map has NO empty branch). The
    L-75c2-9 "bundle-decoded bare p" reading is wrong at the live
    reference (the s75 lesson #3 genus — a decode claim contradicted
    by the live surface).
  - **F-119c2 — the primary-foreground token genus (SYSTEMIC)**: every
    blue primary on the reference computes text **rgb(250,250,250)**
    (#fafafa — the shadcn stock `hsl(0 0% 98%)`); ours computes
    rgb(255,255,255). Sampled LIVE on New Contact/New Account/New
    Lead/New Event/Filter (accounts+activities) — the bg blue-600
    rgb(37,99,235) byte-equal, ONLY the foreground diverges. Our
    `--color-primary-foreground: #ffffff` (globals.css:39) is the
    wrong pin; the s13 plan's badge record ("fg #fafafa ✓") already
    knew the reference's token value.

### THE POPULATED FACE (ours-only — the reference's zero-data genus)
Healthy on every decoded contract, every value seed-verified
independently off the db (verify-contacts-seed.ts):
- **The statcards 15 / 15 (+15 trend) / 6 / 5** (Total = 15; New This
  Month = all 15 createdAt ≥ month-start — the MONTH-ROLLER: → 0 on
  the 1st; Top Decision Makers = DM 3 + KC 3; No Recent Activity = the
  ≥30d rows 5 — the DAY-ROLLER: 5 today → 6 after +2d → 7 after +5d).
- **The table**: 15 rows · the priority census Key 4 / Standard 7 / At
  Risk 4 · the role census 3×5 (DM/KC/Influencer/EndUser/Other) · the
  source census partner 3 / referral 5 / call 2 / website 2 / email 3
  · the Key amber tint rows 4 (border-l-4 + the gradient) · the ≥30d
  opacity-70 rows 5 · the engagement bars 3/2/1 × 5 each (green-600
  solids) · the first row Khalid Al Mansoori / Chief Procurement
  Officer / Key / Decision Maker / 4 action buttons.
- **The Pke slide-over** (the row click): w500 @1440 / full-bleed 390,
  "Contact Details" 20px/700, the hero (the name/position/priority
  badge/role badge/engagement bars), the Call/Email/WhatsApp outline
  buttons, the Activities/Deals/Notes tabs, the Contact Information
  card (Email/Phone/Company+size/Last Activity "MMM D, YYYY"). One
  walk-script lesson: at 390 the row-click center hits the
  stopPropagation role-select cell — the mobile CARD click is the
  phone UX's intended trigger (healthy).
- **The W7 EntityEditDialog** (the ⋮ → Edit): w672 (max-w-2xl), "Edit
  Contact", the 7 labels (Name*/Email*/Phone/Company/Position/Status/
  Source), the 5 inputs + the Active/Partner selects, the footer
  Cancel/Save Changes, **the mount-focus on Name** ✓.
- docScrollW contained at both widths.

## S119-P0 (the mobile-list empty-state retirement — src)
`src/app/(app)/contacts/contacts-page.tsx:712-717` — the invented
`filtered.length === 0 ? <p>No contacts found</p>` branch RETIRED: the
container renders the map ONLY (the reference's empty-container
contract, live-verified). The L-75c2-9 comment retired with it. The
table's own rich empty stack (:533) is the only zero-data message —
exactly the reference's face. No existing pin breaks (the e2e
`getByText("No contacts found")` asserts are populated-state count-0
checks; account-surfaces' `toContain` reads the table copy which
stays).

## S119-P1 (the primary-foreground token re-pin — src)
`src/app/globals.css:39` — `--color-primary-foreground: #ffffff` →
`#fafafa` (the reference's stock hsl(0 0% 98%), live-computed on every
blue primary). The blast radius: the Button default variant (all blue
primities) + the dialog submits (page-layout:949) + the emerald
quick-log (the default-variant base) — ALL matching the reference's
own mechanism; the badge (text-neutral-50) and the dark buttons
unaffected; the login submit (bg-slate-900 text-white explicit)
unaffected — live-verified white on BOTH apps. **+1 it in
tests/design-tokens.test.ts** (an EXISTING file, the themeToken
helper): the primary-foreground re-pin + the stock-hsl reading. The
SKILL §5 token-table line re-pinned with it.

## S119-P2 (the populated contacts e2e battery — expects INSIDE the
existing `:187` thin test, the census stays 137)
The D-116a1/D-117a1/D-118a1 genus (the contacts e2e is heading + one
name). The battery lands INSIDE "contacts page renders seeded
contacts":
- **The four statcard values** via the label→card→value ladder:
  **15 / 6 exact** (static); **New This Month — the in-test month
  computation** (the D-118a1 calendar-rollover precedent: the test
  computes the expected count from the seed contract — all 15
  createdAt = the seed moment — against `new Date()`, so the month
  roller 15 → 0 on the 1st is pinned EXACT at every run date); **No
  Recent Activity — the BOUNDED 5-7 count** (the day-roller genus at
  day scale — the D-118a0 idiom: toHaveText is exact-only; the seeded
  27d row crosses 30 after +2 days).
- **The table census**: 15 rows · the priority badge census Key 4 /
  Standard 7 / At Risk 4 · the first-row contract (Khalid Al Mansoori
  + the Key amber tint + the border-l-4).
- **The slide-over**: the first row's NAME cell click → "Contact
  Details" + the Activities/Deals/Notes tabs + the Call/Email/
  WhatsApp buttons + the Contact Information card.
- **The W7 edit dialog**: the ⋮ (aria-label "Actions for Khalid Al
  Mansoori") → Edit → "Edit Contact" + the 7 labels + the first input
  focused + Cancel/Save Changes + Escape close.

## S119-P3 (the four-label + adjacency census pin — ONE new it, in an
EXISTING file)
`tests/contacts-family-parity.test.ts` (the s88/s89 stat-card suite,
the natural host): the labels as an ordered set (Total Contacts · New
This Month · Top Decision Makers · No Recent Activity — in NO unit
label-set assertion before, the D-117a2/D-118a2 genus) + the per-card
icon/iconColor adjacency (Users-bg-blue-500 · TrendingUp-bg-green-500
· Award-bg-amber-500 · CircleAlert-bg-red-500) + the trend row on
exactly New This Month + the gradient flag ×4 + **the S119-P0
retirement pin** (the mobile-list block renders the map only — no
`length === 0` empty branch) + the arm census (iconColor= ×4 on the
raw source — a fifth site is a parity event, not a growth). UNIT
1953 → 1955 (+2: design-tokens +1, contacts-family-parity +1); SUITES
stays 109.

## S119-P4 (the F-119a1 epoch-gate — the 1-line e2e hardening)
`tests/e2e/crm.spec.ts` the S72-P2 test (~:2831): `await
expect(input).toHaveValue("AED")` BEFORE the fill — the epoch-gate
that retires the 9-session flake lineage (the 119-a root-cause: the
pending→resolved remount races the fill). A test-only change; the
census stays 137.

## S119-P5 (the count ladder + the docs realignment)
- **UNIT 1953 → 1955** · SUITES 109 unchanged · E2E 137 unchanged ·
  badge 2090 → 2092.
- docs-counts: the UNIT const + the s119 comment + the layer-axis
  block.
- dialog-geometry: the CLAUDE lockstep carry (1955 + the 1954
  negatives).
- README: badge 2092 + the Tested row's s119 clause + the 1955 count.
- AGENTS: the two count sites + the §Session-119 block.
- CLAUDE: the four count sites.
- PAD: the five count sites + the s119 inventory row (before the
  Total row).
- SKILL: v1.115.0 → v1.116.0 (frontmatter + H1) + the project_state
  s119 layer prepended + Appendix B 1955 + §16dg appended + the §5
  token-table primary-foreground re-pin.
- session_256.md (the session log) + this plan's execution record +
  the worklog append.

## S119-P6 (the captures)
204–207 under docs/screenshots/ (the standing build on PORT 3141 +
the seeded scratch walk db): **204** the contacts statcards @1440
(the four populated values + the chips) · **205** the contacts table
@1440 (the 15 rows + the Key amber tints + the engagement bars) ·
**206** the slide-over @1440 (the hero + the tabs + the Contact
Information card) · **207** the contacts phone face @390 (the mobile
cards + the contained table). Unique md5s; verified against the
e2e-pinned contracts.

## S119-P7 (the ship)
The house-style commit (feat: session-119 …) + the SSH-wrapper push
to `git@github.com:nordeim/neo-crm.git` (main only) + session_256.md
+ this plan's execution record + the worklog append.

## The TDD ladder (the predictions)
- **RED-1** (the pins staged BEFORE the src fixes — the four files:
  design-tokens +1 it, contacts-family-parity +1 it, the crm.spec
  battery + the epoch-gate, the docs-counts re-anchor + the
  dialog-geometry lockstep): the docs-counts family (12) + the CLAUDE
  lockstep (1) + the new design-tokens it (the token still #ffffff) +
  the new census it (the empty branch still present + the labels
  unpinned) — predicted **14–16 failed | 1939–1941 passed (1955)**;
  then the stash-proof (stash → native 1953/1953 GREEN → pop → RED
  restored).
- **GREEN**: the two src fixes (the token re-pin + the empty-state
  retirement) + the docs realignment → **109/1955**.
- **RED-2** (three faces, by name): Face A — the token edit (#fafafa →
  #ffffff) fails the design-tokens pin by name; Face B — a label edit
  ("Top Decision Makers" → "Top Decision Makers ") fails the census
  pin; Face C — an e2e expectation edit (the "15" → "16") fails the
  battery. Restore via targeted `git checkout -p` or re-edit (the
  s118 Face-B lesson: a whole-file checkout wipes the staging —
  re-verify the full staged state after any restore).
- The e2e phase: the contacts battery single-test first run → the
  S72-P2 epoch-gate single-test run → the full suite 137/137.

## The validation checklist (pre-execution)
- [x] The F-119c1 mechanics live-verified (the reference's empty
      container childN 0 — probe-ref-mobile2 at BOTH widths)
- [x] The F-119c2 systemic sweep live-verified (6 primary buttons on
      the reference, all #fafafa; the login submit white on BOTH)
- [x] The seed contract 15/15/6/5 + the censuses 4/7/4 · 3×5 ·
      partner3/referral5/call2/website2/email3 — db-verified
- [x] "Top Decision Makers"/"No Recent Activity" in ZERO unit
      label-set assertions (grep-verified); iconColor= ×4 on the raw
      source
- [x] The month-roller mechanics (all createdAt = the seed moment;
      the in-test computation derives from `new Date()`)
- [x] The day-roller bounds (the seeded 27d row crosses 30 at +2d;
      5 ≤ value ≤ 7 at every future run date)
- [x] The :187 contacts test insertion point + the :2831 S72-P2
      epoch-gate site
- [x] No existing pin breaks (the e2e count-0 checks are
      populated-state; account-surfaces' toContain reads the table
      copy which stays)

## The execution record (2026-10-14, session-119)

- **The intake:** `git pull` 5f98c77 → 698b869 (the user's session_255.md
  narrative-log addition, docs-only); the environment standing (.env +
  db/custom.db at the repo root, census MATCH first check — no rebuild
  needed).
- **The baseline gate:** lint 0/0 · tsc 0 · 109/1953 · build · e2e run 1
  136/137 (ONE flake — the S72-P2 settings-debounce test; passed in
  isolation + the re-run 137/137).
- **The audits (both as subagents, records appended to the worklog):
  119-a 7/7 shipped claims Verified + F-119a1 (Medium, test-infra — the
  S72-P2 flake root-caused as the pending→resolved epoch remount racing
  the fill; NOT workers, NOT wall-clock; the 1-line epoch-gate the
  fix) + the time-bomb spot check CLEAN; 119-b 9/9 PASS (~77th
  standing; record-only N-119b2/N-119b3).**
- **The live verification:** probe:ref the 90th STABLE · the four drift
  gates CLEAN · scandihaven d4789c3 on-pattern · census MATCH.
- **The walk (119-c):** the contacts-list family — PASS 1 the zero-data
  face TWO-APP (byte-equal everywhere + the oklab gradient noise; TWO
  REAL DEFECTS: F-119c1 the invented mobile-list empty branch, the
  reference's live EMPTY container probe-verified at both widths +
  F-119c2 the primary-foreground token genus, every reference blue
  primary #fafafa, the six-button live sweep); PASS 2 the populated
  face OURS-ONLY (15/15(+15)/6/5 + every census seed-verified off the
  db + the slide-over + the W7 edit dialog healthy); PASS 3 the 390
  slide-over re-walk via the mobile card click (the walk-script
  artifact resolved).
- **The TDD:** RED-1 15|1941(1956) stash-proven (native 1953/1953 → pop
  → 15 RED; the 15 enumerated: the 12 docs-counts-family + the CLAUDE
  lockstep + the design-tokens it + the retirement it) → GREEN 109/1956
  (the two src fixes + the docs realignment; two in-flight corrections
  — the count-ladder arithmetic +3 (1956, the docs-counts family
  caught the plan's +2 error exactly as designed) + the line-census
  re-anchor globals.css 413→420 + the s75-era bare-p pin flipped to
  the retirement contract) → RED-2 three faces by name (the token edit
  / the label edit / the e2e value edit each failing exactly its pin)
  → the e2e phase (one locator lesson: the slide-over opens from the
  row-CENTER click — the Name cell itself carries stopPropagation) →
  **the full suite 137/137 (3.4m, zero flakes).**
- **The final gate:** lint 0/0 · tsc 0 · 109/1956 · build · 137/137 ·
  the closing drift sweep CLEAN · census MATCH · src/ 2 files changed
  (globals.css + contacts-page.tsx — the fix session).
- **The captures 204-207** (four unique md5s) + **the VLM battery
  4/4 × 4 CLEAN** (the four statcards verbatim + the chip order; the
  table + the amber rows + the 8 headers; the slide-over verbatim; the
  phone face with the hamburger trigger + the statcards verbatim +
  containment).
- **The ship:** session_256.md + this execution record + the worklog
  append + the house-style commits pushed to main via the SSH wrapper.
