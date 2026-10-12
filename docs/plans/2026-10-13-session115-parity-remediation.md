# Session-115 Parity Remediation Plan (2026-10-13)

Session 115 on `main` @ `c4a0fdc` (the s114 ship `e516027` + the follow-ups
`121402f` [session_242/243] and `c4a0fdc` [session_244, upstream]). The
workspace had been RESET: a fresh clone, the environment REBUILT per the
s113 intake pattern (`.env` from `.env.example` + a fresh `AUTH_SECRET`,
`db:push` + `db:seed`, the census MATCH on the first try, 533 packages,
the Playwright browsers — with the 115-b environment repair: the cache
held revisions 1200/1248 but playwright-core 1.63.0 needs 1243, installed
once and left standing). The scandihaven pattern repo re-cloned at
`d4789c3` (on-pattern, nothing new to adopt — the s114 standing holds).
Every op under `env -u DATABASE_URL` (the shell's stray hazard,
re-confirmed at intake: `DATABASE_URL=file:/home/z/my-project/db/custom.db`).
The repo `skills/` folder excluded from checking/testing/compilation
throughout.

## Baseline gate (stepwise)

- lint 0/0 ✓ · tsc 0 ✓ · 109 files / 1948 tests ALL PASSING (14.59s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m, zero flakes) ✓ — exactly the
  s114 ship state.

## The audits

- **115-a (subagent)**: the s114 ship delta (`0470815..c4a0fdc`) **GENUINE
  10/10 — zero real findings**. All 22 delta files mapped to the plan
  hunk-by-hunk (the two src fixes real + complete; the five test files —
  the fifth, dialog-geometry-parity, the planned CLAUDE lockstep carrier;
  the count arithmetic exact: 109/1948/137/2085/1566/185; both new its
  non-vacuous source-reading pins — one revert-failing, one the documented
  staging-passing freeze; the e2e cleanup seam at crm.spec:469-475 exact;
  the four captures valid PNGs; zero unaccounted files, zero leftover
  s114-* scripts; 7 record-only notes).
- **115-b (subagent)**: the standing-layers audit **9/9 PASS — zero real
  findings** (~72nd consecutive). The SEO/sitemap live check 6/6 on the
  standing standalone build (scratch db, PORT 3127, killed + cleaned:
  sitemap 200/application/xml/9 lowercase URLs/weekly/1.0+0.8 · robots'
  Sitemap line · the manifest JSON + "NEO CRM" · /login's 405-char
  description + the full OG/Twitter set · /accounts' canonical). The
  drawer battery **10/10 exit 0 at TRUE 390×844** (the trigger 36×36, the
  panel 288px, all 8 links, the dual scroll lock, the three close paths,
  the resize release, the reopen re-lock). design-tokens 15/15 · the
  vocabulary pair 6/6 · config zero drift (the postcss plugin + no
  tailwind.config + the pinned e2e db + the skills/ exclusion in all four
  configs) · census MATCH · the Tailwind v4 layer byte-standing (137
  token lines, zero var() chains in @theme, the shadow-sm/blur-sm
  re-pins) · the reference-defect ledger unchanged (the mobile-nav spec's
  10 checks + the contract sites + the CLAUDE anti-pattern) · the
  db-path hazard pins 20/20.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 86th consecutive**;
  census: demo zero · desktop 256px/8 STANDING · the mobile-nav defect
  STANDS at TRUE 390 (the 36th consecutive — the reference's own bug,
  our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each) + the closing census MATCH (15/24/10/23/12 + 4 users).

## The rotation (115-c) — THE SETTINGS DEFAULTS-TAB RE-WALK (two-app) + THE ACCOUNTS-DETAIL INSIGHTS-DIALOG FAMILY LIVE WALK (ours-only)

The s114 close (session_243) offered three candidates: the settings
Defaults tab's editors, the accounts detail surfaces, the reports tables.
The scout adjudication (three throwaway walk scripts, `scripts/s115-
walk{,2,3}.ts` — repo-internal, deleted before ship):

- **The settings Defaults-tab editors — walked TWO-APP** (the first
  re-walk since s81, 34 sessions of changes on top of the s14/s72/s81
  pins; the s114 close listed it as un-walked, the s81 suite header the
  correction — the family WAS walked once, which makes this the
  re-verification face). BOTH apps driven through /settings → the
  Defaults tab at 1440×900 + 390×844 (login first on both — the s114
  pass-3 lesson): **COMPLETE live parity on every computed axis**. The
  tab trigger 371×28 @663,193 @1440 · 117×28 @137,201 @390 — identical.
  The card 1120×604 @288,249 · 358×604 @16,257 — identical (white / 1px
  #e5e5e5 / 12px / the two visible shadow layers). The header 1118×90 /
  356×90 — identical (the title DIV `font-semibold leading-none
  tracking-tight` 16px/600/#0a0a0a 1070×16/308×16 + the subtitle DIV
  "Set default values for new records" 14px/20px/rgb(115,115,115)
  1070×20/308×20 — the muted-ink token = the reference's
  text-muted-foreground, byte-equal). The six groups — identical (the
  label census byte-equal `text-sm font-medium leading-none
  peer-disabled:cursor-not-allowed peer-disabled:opacity-70`; the
  label→control gap 12 + the control marginTop 8 on BOTH — the s14
  controlMt compensator live-validated for the first time since s81; the
  four inputs + two combobox triggers 1070×36 @313 / 308×36 @41 with the
  values AED/new/B/3 + the placeholders AED/new/B; the body gap 16 ×5;
  the number input min/max-free — the L-81c4 quirk re-verified). The
  select dropdown census — identical (the content 1072×74 @313,748
  white/1px #e5e5e5/6px/the visible shadow layers; the two options
  Month/Week 1062×32). The interaction battery — identical (choose
  "Week" → the trigger text swaps to "Week" on both; the save round-trip
  ours PUT /api/settings 200 vs the reference's POST+GET+PUT+GET
  entity dance — the documented s72 platform equivalent; the reference's
  settings restored after the probe). docScrollW contained 1440/390 on
  both.
- **The accounts detail surfaces — walked OURS-ONLY** (the reference at
  its zero-data state renders "No accounts found" — re-confirmed live at
  1440; the insights dialog is un-openable there, the documented s73
  genus; the s113 row-menu precedent: ours-only walks verify against the
  decoded contract). The FIRST-EVER live walk of the Account Insights
  dialog (`Ece`, `src/components/accounts/account-insights-dialog.tsx`):
  the row click opens the dialog; the chrome rides the s112-verified
  stock family (the content 768 wide @1440 = max-w-3xl, full-bleed 390
  at phone with p-6 children 340 @x=25; max-h-[80vh] overflow-y-auto);
  the header (the title "Al Noor Manufacturing" text-xl 20px/600
  245×28 + the industry "Manufacturing" 245×20 + the status badge
  "active" 63×22 green-100 rgb(220,252,231)/green-800 rgb(22,101,52));
  the three stat cards 229×114 each (the grid-cols-3 gap-4 at 718 inner:
  3×229 + 2×16) with the three icons (trending-up blue-600 / target
  green-600 / users purple-600, w-6 h-6) + the values $0.0M/0/2 + the
  labels; the segmented tabs 237×28 ×3 @1440 · 111×28 ×3 @390 (Recent
  Activities active); the activities rows 718×66 with the 40×40
  rounded-lg (8px) icon boxes — the purple-100 rgb(243,232,255) meeting
  tint + the green-100 rgb(220,252,231) call tint, the s28 decoded
  contract; the battery: the Contacts switch (2 rows, the avatar circles
  40×40 blue-100 rgb(219,234,254)/blue-600 rgb(37,99,235), the initials
  TN/YH via the verbatim split/map/join formula) + the Open Deals switch
  (the "No open deals" empty state) + the Escape close — healthy at
  BOTH widths; the mount-focus the close-X button (the Radix default —
  no reference comparison possible, the ours-only genus).
- **The reports tables — DEFERRED to session 116** (the populated face
  is ours-only at the reference's zero-data state — the same genus; the
  s10 e2e structure tests + the s105 reports-mobile walk already hold
  the family's structure; the next session's candidate).

### THE RESULT — zero real parity defects; four freeze finds

The two walked families are in complete live parity with the reference
(the Defaults tab, two-app) and with their decoded contracts (the
insights dialog, ours-only). NO src fix ships this session — the finds
are freezes + one documented superset:

- **D-115a1 (the Defaults label htmlFor/id ASSOCIATION SUPERSET)**:
  OURS wires the six `htmlFor="def-currency|def-stage|def-tier|
  def-follow|def-calview|def-firstday"` + the matching `id` pairs; the
  reference's six labels are BARE UNASSOCIATED `<label>` elements (live
  walk: `for=None` on all six). OURS is the a11y superset — the s112
  D-112a2 camera-aria-label genus + the s114 Danger-confirm-label
  precedent (both KEPT + documented). VERIFIED UNPINNED: `rg
  'def-currency|def-stage|htmlFor="def' tests/` finds ZERO pins — the
  association family has no freeze. THE PIN: +1 it in
  settings-defaults-parity.test.ts (the six pairs + the negative: no
  unassociated labels in the DefaultsEditor body).
- **D-115a2 (the Defaults interaction battery — measured identical,
  unpinned)**: the Defaults tab switch + the six-group live census + the
  select round-trip (open → Month/Week census → choose → the trigger
  text swap → the PUT /api/settings 200 → restore) — invisible to every
  standing gate (the e2e settings-mobile walk switches to Data only;
  the unit suites read source). FREEZE: the e2e expects INSIDE the
  existing settings-mobile test (the census stays 137).
- **D-115a3 (the insights dialog battery — measured healthy, unpinned)**:
  the row-click open + the stat-cards census + the two tab switches +
  the Escape close — the dialog has NEVER been opened by any e2e test
  (the ⋮ menu test asserts the menu items only). FREEZE: the e2e expects
  INSIDE the existing accounts ⋮ menu test (crm.spec:2096; the census
  stays 137).
- **D-115a4 (the insights tabs segmented-variant construction —
  unpinned)**: the walk measured the segmented triggers (237×28/111×28);
  the account-surfaces pins cover the tab NAMES + the empty states but
  NOT the `variant="segmented" cols={3}` construction. THE PIN: +1 it
  in account-surfaces.test.ts.
- **Record-only (adjudicated away)**: the header mechanism (the
  reference's `space-y-1.5` vs our `[&>*+*]:mt-1.5` — the documented v4
  house pattern, computed-equal 1118×90) · the token-maps
  (border-input→border-line, text-muted-foreground→text-muted-ink —
  s73/s86) · the input class ordering (`md:text-sm` position — s86) ·
  the select-content shadow transparent prepends (s112) · the avatar
  border-radius 3.35544e+07px vs 9999px (the v4 rounded-full genus,
  s114) · the save platform difference (the s72 equivalent) · the
  mount-focus (the Radix default, no reference face) · the reference's
  zero-data accounts face ("No accounts found" — the standing genus).

## S115-P1 (the unit pins — TWO new its, both in EXISTING files)

`tests/settings-defaults-parity.test.ts` (D-115a1):

1. **+1 it**: the DefaultsEditor wires the six htmlFor/id pairs —
   `htmlFor="def-currency"` + `id="def-currency"` … through
   `def-firstday` — asserting the six labels + the six controls by
   attribute (read on the RAW source, the s114 stripComments `/*`
   lesson: the DefaultsEditor body carries no attribute-literal hazards
   but the raw read is the house default for freeze pins) + the NEGATIVE
   (the D-115a1 superset note: the reference's labels are bare
   unassociated; ours the a11y superset, the s112 D-112a2 genus — the
   comment documents WHY the association stays).

`tests/account-surfaces.test.ts` (D-115a4):

2. **+1 it**: the insights dialog's Tabs ride the reference's segmented
   construction — `variant="segmented"` + `cols={3}` + the
   `className="w-full"` wrapper (the walk's live-measured 237×28/111×28
   triggers; the s115 walk note at the source comment).

## S115-P2 (the e2e freezes — expects INSIDE existing tests, the census stays 137)

3. `tests/e2e/settings-mobile.spec.ts` (D-115a2): INSIDE the existing
   settings test (:23), after the Data-tab block — the Defaults-tab
   block at 390: switch to "Defaults" (the active tab moves), the
   six-group census (6 labels with the exact texts, 4 text/number
   inputs + 2 combobox triggers, the trigger texts Month/Monday), the
   frame containment (docScrollW <= 390), and the select round-trip
   (open the calendar-view trigger → the Month/Week option census →
   choose "Week" → the trigger text swaps → the PUT /api/settings
   response 200 via waitForResponse → restore "Month" via the same
   seam, the s114 state-pollution lesson: ALWAYS restore).
4. `tests/e2e/crm.spec.ts` (D-115a3): INSIDE the existing accounts ⋮
   menu test (:2096), after the menu assertions — the insights block at
   1440: close the menu (Escape), click the first row (the row click
   opens the dialog — the D-112a4 rule: select `[data-state="open"]`),
   the title + the three stat-card labels (Total Revenue / Open Deals /
   Contacts), the three tab triggers (Recent Activities / Contacts /
   Open Deals), a REAL tab switch (Contacts active + its panel visible),
   and the Escape close (the dialog unmounts). Structural assertions
   only where the seeded data varies (the card VALUES assert the
   formulas' outputs on the first seeded account — $0.0M / 0 / 2 per
   the walk, stable on the reseeded e2e db).

## S115-P3 (the count ladder + the docs realignment)

- **UNIT 1948 → 1950** (+2: the D-115a1 it + the D-115a4 it, both in
  EXISTING files) · **SUITES 109 UNCHANGED** · **E2E 137 UNCHANGED**
  (added expects, zero new its) · **badge 2085 → 2087**.
- The docs: SKILL v1.112.0 (frontmatter + project_state — the s115
  layer prepended + the H1 lockstep + §16dc + the Appendix B unit total
  1950) · README badge 2087 + the Tested row's s115 clause · AGENTS the
  commands/gate counts 1948→1950 (two sites) + the §Session-115 history
  block · CLAUDE the unit-count sites 1948→1950 (four sites) · PAD the
  count sites + the s115 inventory row + Total/HEAD 109|1950+137.
- The session docs: `docs/session_245.md` (the feat log, in the feat
  commit) + session_246/247 (the summary + narration, the follow-up
  commit).

## S115-P4 (the captures)

Four captures on the standing build + the scratch walk db (the s112/
s113/s114 precedent): **188** the settings Defaults tab @1440×900 (the
Default Values card + the six groups + the subtitle) · **189** the
settings Defaults tab @390×844 (the phone face — the stacked groups +
the selects) · **190** the Account Insights dialog @1440×900 (the
header + the three stat cards + the activities rows) · **191** the
Account Insights dialog @390×844 (the phone face — the 103px stat cards
+ the segmented tabs). The VLM battery (4 checks each): the geometry,
the census, the fonts, the containment.

## S115-P5 (the ship)

The house-style commit (the settings-defaults-parity + account-surfaces
pins + the settings-mobile + crm.spec expects + the docs family + the
captures + session_245 + the s115 plan + its execution record + the
worklog; the walk scripts deleted before ship) → the SSH push per the
runbook (the operator key OUTSIDE the repo, the fingerprint VERIFIED,
the dry-run, the real push — `--remote git@github.com:nordeim/neo-crm.git`
explicitly, the s112 wrapper-default lesson) → the session-log
follow-ups (session_246/247) → the close-out.

## The TDD ladder (the predictions)

- **RED-1** (the pins + the re-anchors staged against the still-old
  docs): the UNIT const re-anchor (1948→1950) cascading through the
  docs-counts family (the README badge/file-tree/commands/Tested its +
  the AGENTS commands/gate-order its + the PAD file-tree/Total/HEAD/
  checklist its + the H1/project_state lockstep + the Appendix B —
  **~12-15 failed**); the two freeze its STAGING-PASS (the wiring
  stands — the s112 camera precedent; both are freeze pins of
  measured-standing constructions). Stash-proof: the staged files
  stashed → the native run ALL GREEN → pop → the RED re-confirmed.
- **GREEN**: the S115-P3 doc realignment → **109 files / 1950 ALL
  PASSING** + lint 0/0 + tsc 0.
- **RED-2 (both faces)**: (A) the association edit — one `htmlFor`
  dropped from the DefaultsEditor → the D-115a1 it FAILS by name →
  restored; (B) the variant edit — `segmented` → `pill` in the insights
  dialog → the D-115a4 it FAILS by name → restored. Both restored →
  full GREEN.

## The validation checklist (pre-execution)

- [ ] The D-115a1 it's edit sites: the six htmlFor/id pairs live ONLY
      in `settings-page.tsx:570-636` (the DefaultsEditor body —
      verified by read); zero `def-` ids elsewhere in src/ (verified by
      rg); no existing test pins the family (verified — rg finds zero).
- [ ] The D-115a4 it's edit site: `variant="segmented"` + `cols={3}`
      appear once in account-insights-dialog.tsx:129-130 (verified by
      read); no existing pin covers the variant (verified — the
      account-surfaces tabs it pins names + empty states only).
- [ ] The e2e sites: settings-mobile.spec.ts:23 — the existing (a)-(d)
      assertions UNTOUCHED (the Defaults block additive, AFTER :105);
      crm.spec.ts:2096 — the existing menu assertions UNTOUCHED (the
      insights block additive, AFTER :2115, with the menu closed first);
      the dialog selects use `[data-state="open"]` (the D-112a4 rule);
      the select round-trip restores Month (the s114 state-pollution
      lesson).
- [ ] The count arithmetic: 1948 + 2 = 1950; 1950 + 137 = 2087; the
      badge formula UNIT+E2E.
- [ ] The captures' geometry envelopes match the walk's live
      measurements (the Defaults card 1120×604/358×604; the insights
      content 768/full-bleed 390; the stat cards 229×114/103×130).

## The execution record (2026-10-13, session-115)

Executed RED-first, zero src changes (the freeze session), with one
in-flight re-anchor + two e2e strict-mode lessons + one capture
adjudication:

- **RED-1:** 14 failed | 73 passed (87) — the 13 docs-counts-family
  its (the README badge/file-tree/commands/Tested + the AGENTS
  commands/gate-order + the PAD file-tree/Total/HEAD/checklist + the
  H1/layer-axis lockstep + the Appendix B + the thirteen line-census)
  + the CLAUDE lockstep carrier (the dialog-geometry suite), all
  enumerated by name. The plan predicted 12-15 — 14 landed inside it.
  Stash-proven: the six staged files stashed → the native **85/85** →
  pop → 14 RED re-confirmed (85 + the 2 new its = 87 exact). Both
  freeze its staging-passed as predicted (the s112 camera precedent).
- **GREEN:** the S115-P3 doc realignment (README badge 2087 + the
  Tested row's s115 clause + the tree + the commands comment; AGENTS
  the two count sites + the §Session-115 block; CLAUDE the four
  sites; PAD the five count sites + the s115 inventory row + the
  settings-mobile line-census row; SKILL v1.112.0 [frontmatter + the
  H1 + the project_state s115 layer prepended + §16dc + the Appendix
  B unit total]) → **109 files / 1950 ALL PASSING**.
- **One in-flight re-anchor discovered the honest way:** the first
  GREEN run surfaced the PAD's settings-mobile line-census row
  (106 → the live 185 — the D-115a2 Defaults block's growth); the
  LIVE-CENSUS pin caught it exactly as designed (the F-109a1
  either-face doctrine).
- **RED-2 (both faces):** (A) the association edit — the def-currency
  htmlFor dropped from the DefaultsEditor → the D-115a1 it FAILED by
  name → restored → 24/24; (B) the variant edit — `segmented` →
  `pill` in the insights dialog → the D-115a4 it FAILED by name →
  restored → 47/47 (the two suites). Both restored → full GREEN.
- **The e2e phase (two strict-mode lessons):** the first run 136/137
  — the new insights block failing on `getByText("Manufacturing")`
  resolving to BOTH the title ("Al Noor **Manufacturing**") and the
  industry (the substring-match genus); fixed with `{ exact: true }`.
  The second run 136/137 — `getByText("Open Deals")` resolving to
  THREE elements (the stat label + the tab trigger + the "No open
  deals" empty state); fixed by scoping the two duplicated label
  asserts to the cards' own `div.text-xs.text-gray-500` class. The
  single-test verification passed, then the full re-run **137/137
  (3.3m)** with the Defaults round-trip (the Month→Week→PUT→restore)
  and the insights battery (open/census/switch/Escape) green in the
  full-run context on their first passing run.
- **GATE (stepwise):** lint 0/0 (the throwaway walk/capture scripts
  deleted BEFORE the gate) · tsc 0 · **1950/1950** unit [109 suites,
  +2 net] · build · **137/137** e2e · the four drift sweeps CLEAN
  (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each
  --fail-on-drift — NO re-baselining; zero src changes render
  byte-identical) · the closing census MATCH (15/24/10/23/12 + 4
  users). The tree: src/ = ZERO files changed; the six test files;
  the five docs; the s115 plan; the four captures; session_245 + the
  worklog.
- **S115-P4 (the captures):** the throwaway capture script (the
  standing build on PORT 3141 + the scratch walk db, deleted after).
  **188** the Defaults tab @1440 (the Default Values card + the six
  groups + the subtitle) · **189** the Defaults tab @390 (the stacked
  single column + the full-width selects) · **190** the insights
  dialog @1440 (the header + the three stat cards + the activities
  rows) · **191** the insights dialog @390 (the 103px stat cards +
  the segmented tabs + the dark overlay). **The VLM battery 4/4 × 4**
  — all six labels + the 4/2 input split read verbatim (188), the
  single column + Month/Monday + the title/subtitle + the containment
  (189), the header + the exact stat values $0.0M/0/2 + the three
  tabs (190), and the phone face contained with the overlay (191).
  **One adjudication:** the first 189 read "Week" in the calendar
  select — the s115-walk battery's restore rode a silent `.catch()`
  and left `calendarView: "week"` on the THROWAWAY walk db; the
  setting restored through the seam, the capture retaken, the second
  VLM read confirmed Month (the reconstruction independently reading
  `selected>Month`). The e2e freeze — with its response-asserted
  restore — is the authoritative pin and passed 137/137 throughout.
