# Session-113 Parity Remediation Plan (2026-10-12)

Session 113 on `main` @ `ef06550` (the s112 ship `f16f2c3` + the follow-ups
`3c628b8` [session_234+235] and `ef06550` [session_236]). The workspace
RESET (a fresh clone): environment rebuilt from `.env.example` + a fresh
`AUTH_SECRET`; `bun install`; `db:push` + `db:seed`; the Playwright
chromium headless shell v1243 installed fresh; `node_modules` standing.
Every op under `env -u DATABASE_URL` (the shell's stray hazard,
re-confirmed at intake — the sandbox exports `file:/home/z/my-project/db/
custom.db`). The repo `skills/` folder excluded from checking/testing/
compilation throughout. The scandihaven pattern repo re-cloned (d4789c3
precedent docs re-checked — on-pattern).

## Baseline gate (stepwise)

- lint 0/0 ✓ · tsc 0 ✓ · 109 files / 1944 tests ALL PASSING (15.29s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m, zero flakes — after the fresh
  sandbox's browser install) ✓ — exactly the s112 ship state.

## The audits

- **113-a (subagent)**: the s112 ship delta (`be95db5..3c628b8` + the
  session_236 follow-up, 21 files, src/ = exactly TWO files) **GENUINE
  10/10** — the two new its + the six e2e focus expects + the docs ladder
  + the captures 176-179 verified hunk-by-hunk; the non-vacuousness
  arithmetic cross-checked (244 native + 2 = 246 staged; 16 RED); the
  full-suite 109/1944 reproduced live. **ZERO real findings** (six
  record-only notes: briefing-list omissions, draft-time line cites, a
  cosmetic it-title, the enumeration-phrasing genus, the census-literal
  location attribution, the grep-methodology note).
- **113-b (subagent)**: the standing-layers audit **8/8 PASS — ZERO real
  findings** (~70th consecutive). The SEO/sitemap live check 6/6 on a
  scratch db (PORT 3127: the sitemap's 9 lowercase URLs + bare
  application/xml · robots' Sitemap line · the manifest JSON · the
  405-char meta description · /login's OG/Twitter card set · /accounts'
  canonical). The drawer battery **10/10 exit 0 at TRUE 390×844**.
  design-tokens 15/15 · vocabulary 12/12 · config zero drift (the
  postcss plugin + no tailwind.config + the pinned e2e db) · census
  MATCH (15/24/10/23/12 + 4 users) · the Tailwind v4 layer
  byte-standing (the shadow-sm/blur-sm re-pins, 137 token lines, zero
  var() chains) · the reference-defect ledger unchanged.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 84th consecutive**;
  census: demo zero · desktop 256px/8 STANDING · the mobile-nav defect
  STANDS at TRUE 390 (the 34th consecutive — the reference's own bug,
  our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each) + the closing census MATCH.

## The rotation (113-c) — THE MENU/POPOVER FAMILY LIVE RE-WALK

The s112-close suggested three candidates: the topbar search dropdown
family, the account-menu/row-menu popover family, or the reports tabs'
interactive chart family. The scout (a throwaway two-app probe,
`scripts/s113-scout.ts` — deleted before ship) settled it: **the topbar
search renders NO dropdown on EITHER app** (zero popper surfaces on
click and on fill — the s32 dead-decode confirmed live; our functional
superset unchanged), and the chart tooltips are recharts defaults on
both sides (4 wrappers, invisible pre-hover — the s10 doctrine). **The
menu/popover family is the walk**: the s13-era `MENU_CONTENT`/`MENU_ITEM`
pins are class-string level, extracted 2026-09-30 — thirteen sessions
and one reference shadcn bump ago (the s112 D-112a1 genus); the family's
mount-focus + keyboard behavior was never measured (the s111 D1 genus);
the leads Filters popover's field-label TAGS were never census'd.

The ANALYZE (this session, pre-plan): two throwaway walk scripts
(repo-internal, deleted before ship) drove BOTH apps through the menu
ladder — the topbar account menu · the leads Filters popover · (ours
only) the leads ⋮ row menu — at 1440×900 + 390×844, our side on the
standing build + a scratch walk db, extracting per surface: the trigger
census (geometry + full class string), the open panel's geometry
(x/y/w/h/data-side/data-align), the computed styles (bg/border/radius/
shadow/pad/font/color/min-w), the popper wrapper transform, the item
census (tags/texts/hrefs/classes/computed), the MOUNT-FOCUS state, the
ArrowDown highlight (the data-highlighted attr + the computed bg), and
the Escape close.

### THE RESULT — the family is in COMPLETE LIVE PARITY on every computed axis, with one structural find + one inert re-pin

- **The account menu** — geometry byte-identical at 1440 (x=1280 y=56
  w=128 h=74, data-side=bottom, data-align=end, the popper transform
  `matrix(1,0,0,1,1280,56)` on BOTH apps) and at 390 (w=128 h=74,
  bottom/end); the content computed-equal on every axis (bg white ·
  border 1px #e5e5e5 · radius 6px · shadow-md's two visible layers ·
  pad 4px · color #0a0a0a · min-w 128px — the transparent-shadow
  prepends the documented v4 serialization noise); the item census
  identical ([A/Profile href="/Profile", DIV/Logout] · both 118×32 ·
  pad 6px 8px · radius 4px · 14px/400); the mount-focus identical (the
  content DIV holds focus on click-open); the keyboard model identical
  (ArrowDown → the first item focused + data-highlighted + bg #f5f5f5);
  Escape closes on both.
- **The leads Filters popover** — geometry byte-identical at BOTH widths
  (1440: x=304 y=483 w=320 h=398 bottom/start; 390: x=32 y=36 w=320
  h=398 — the collision FLIP-UP to data-side=top matched), the census
  identical (2 selects · 2 inputs · the All Status/All Sources/Clear/
  Save View buttons), the trigger construction computed-equal (the
  outline variant + h-9 px-4 py-2 w-full sm:w-auto; the ring arms'
  position the documented s86 ordering noise).
- **The row menus** — ours-only walkable (the reference's persistent
  zero-data state renders no rows — the documented genus, the s109
  precedent; the s73 bundle decode is the reference contract: five
  stock align:end Yg contents, 13 text-only items). Ours live-measured:
  the leads ⋮ menu 188×106 (bottom/end), the Edit/Convert-to-
  Opportunity/DEAD/Delete census with the red Delete, the content
  mount-focus — all consistent with the stock Menu family.
- **The topbar @390 arrangement** (the account chip right vs the
  reference's accidental left) — ALREADY DOCUMENTED (the s93 standing
  genus at the topbar source: "Do NOT restructure this row"); the walk
  re-confirmed both censuses exactly.

### The finds (adjudicated)

- **D-113a1 (REAL, structural/a11y — the Filters field labels)**: the
  reference renders FOUR `<label>` elements (`text-sm font-medium mb-2
  block` — bare, unassociated) in the leads Filters popover; OURS
  renders the same four as `<span>`s (`leads-page.tsx:491/507/520/539`).
  Real label semantics (the a11y tree + the form-control labeling
  family) — the strict-mirror fix: swap span → label at the four sites,
  the bare-label construction byte-matching the reference (the same
  htmlFor-less form as the reference's own; the codebase precedent:
  login-card's `<label htmlFor>` + activities' footer label).
- **D-113a2 (inert class-string — the MENU_CONTENT outline-none, the
  s112 D-112a1 genus)**: our s13-era `MENU_CONTENT` carries
  `outline-none`; the reference's CURRENT stock menu content does NOT
  (the s13 dump predates the reference's shadcn bump — the same genus
  as the s112 close-X find, re-confirmed against the stable bundle).
  Verified INERT live on both open paths: the click-open's programmatic
  focus is not :focus-visible (no outline on either app), and the
  keyboard-open focuses the first ITEM, never the content. RETIRE the
  class for byte parity. The token-map arms (`border-line`/`bg-surface`
  `/text-foreground` for the reference's `border`/`bg-popover`/
  `text-popover-foreground`) STAY — the documented s73 computed-equal
  mechanism (verified live: white/#e5e5e5/#0a0a0a on both), the s86
  border-input precedent. The ITEM's `outline-none` stays (the
  reference's items DO carry it). The Popover-family `DropdownContent`
  base keeps its own `outline-none` + `min-w-[10rem]` + `overflow-hidden`
  + `z-[60]` (the reference's POPOVER stock carries outline-none; the
  rest are the inert extras of our superset-family base — documented,
  not re-pinned).
- **D-113a3 (behavioral parity, UNPINNED — the mount-focus + keyboard
  model)**: the menu content holds focus on click-open; ArrowDown lands
  the first item with the #f5f5f5 highlight — identical on both apps,
  invisible to every standing gate (the s111 D1 lesson). Freeze as e2e
  expects inside EXISTING test() blocks (the census stays 137, the
  s112 D-112a3 precedent).
- **D-113a4 (record-only)**: the walk's noise families — the ring-arms'
  string position (s86), the transparent-shadow prepends (s112), the
  token-map mechanism (s73/s86), the topbar @390 arrangement (s93) —
  all documented standing; no action.

## S113-P1 (the src fixes — TWO files)

`src/app/(app)/leads/leads-page.tsx` (D-113a1):

1. The four Filters field labels: `<span className=
   {LEADS_FILTERS_POPOVER.fieldLabel}>Status</span>` → `<label …>`
   (and Source / Min Deal Value / Follow-up Date) — bare labels,
   byte-matching the reference's construction; the a11y-labeling
   superset over our own span form. Zero line-count change.

`src/lib/page-layout.ts` (D-113a2):

2. `MENU_CONTENT`: retire ` outline-none` from the string (byte parity
   with the reference's current stock menu content; inert — verified
   live on both open paths).
3. The token's comment gains the s113 walk note: the live-measured
   reference string (no outline-none on the content); the two open
   paths' focus behavior (click → the content's programmatic focus is
   not :focus-visible; keyboard → the first ITEM holds focus); the
   token-map arms' live computed-equal verification (white / #e5e5e5 /
   #0a0a0a on both apps — the s73 mechanism, the s86 precedent).

## S113-P2 (the unit pins — TWO new its, both in page-layout.test.ts)

4. **+1 it (D-113a2)** in the session-13 menu describe: the menu
   content byte-matches the reference's CURRENT stock — `outline-none`
   RETIRED (the negative pin) · the token-map arms present (border-line
   / bg-surface / text-foreground — the documented computed-equal
   mechanism) · the four data-[side] slide arms + the animate arms
   present.
5. **+1 it (D-113a1)**: the leads-page source renders the four Filters
   field labels as `<label className={LEADS_FILTERS_POPOVER.
   fieldLabel}>` (Status / Source / Min Deal Value / Follow-up Date)
   and ZERO span forms (the negative pin).

## S113-P3 (the e2e focus freezes — added expects, the census stays 137)

`tests/e2e/crm.spec.ts` — added expects INSIDE existing test() blocks
(the s112 D-112a3 precedent):

6. The account-menu test (:588): after `toBeVisible()` —
   `await expect(menu).toBeFocused()` (the content DIV holds focus on
   click-open); then `ArrowDown` → `await expect(menu.getByRole(
   "menuitem", { name: "Profile" })).toBeFocused()` (the keyboard model
   — the first item; the walk's #f5f5f5 highlight rides the same
   focus).
7. The leads ⋮ menu test (:2131): after the menu opens — the content
   mount-focus expect (`[role="menu"]` toBeFocused()).

## S113-P4 (the count ladder + the docs realignment)

- **UNIT 1944 → 1946** (+2: both its in page-layout.test.ts) ·
  **SUITES 109 UNCHANGED** · **E2E 137 UNCHANGED** (added expects,
  zero new its) · **badge 2081 → 2083**.
- The four-site pin re-anchors: `page-layout.ts` 1548 → the live count
  (the comment growth) · `page-layout.test.ts` 183 → 185 checks — the
  SKILL §5.6 phrase + the PAD module-table row + the docs-counts
  literals + the negatives ladder gains the retired 1548/183 forms.
- The docs: SKILL v1.110.0 (frontmatter + project_state — the s113
  layer prepended + the H1 lockstep + §16da + the Appendix B unit-total
  row 1946 + the §5.6 phrase) · README badge 2083 + the Tested row's
  s113 clause · AGENTS the commands/gate counts 1944→1946 (two sites) +
  the §Session-113 history block · CLAUDE the unit-count sites
  1944→1946 (four sites) · PAD the s113 inventory row + the
  module-table row + Total/HEAD 109|1946+137.
- The session docs: `docs/session_237.md` (the feat log, in the feat
  commit) + session_238/239 (the summary + narration, the follow-up
  commit).

## S113-P5 (the captures)

Four captures on the standing build + the scratch walk db (the s112
precedent): **180** the account menu OPEN @1440×900 (the 128×74
geometry envelope + the content focus) · **181** the account menu OPEN
@390×844 (the phone face) · **182** the leads Filters popover @1440×900
(the 320×398 envelope + the four LABEL field heads) · **183** the leads
⋮ row menu @1440×900 (the 188×106 envelope + Edit/Convert/Delete). The
VLM battery (4 checks each): the geometry, the items, the highlight,
the containment.

## S113-P6 (the ship)

The house-style commit (the TWO src files + page-layout.test.ts + the
docs-counts re-anchors + the crm.spec expects + the docs family + the
captures + session_237 + the worklog; the scout/walk scripts deleted
before ship) → the SSH push per the runbook (the operator key OUTSIDE
the repo, the fingerprint VERIFIED, the dry-run, the real push —
`--remote git@github.com:nordeim/neo-crm.git` explicitly, the s112
wrapper-default lesson) → the session-log follow-ups (session_238/239)
→ the close-out.

## The TDD ladder (the predictions)

- **RED-1** (the pins + the re-anchors staged against the still-unfixed
  src + the still-old docs): the MENU re-pin it FAILS (outline-none
  still present) + the labels it FAILS (the spans still there) + the
  docs-counts axis FAILS (the UNIT const re-anchor cascading through
  the badge/commands/Tested/AGENTS/PAD/H1/Appendix-B sites + the
  four-site 1548/183 literals vs the still-old docs). **Estimate:
  15-18 failed** (the s112 precedent's 16: two src-dependent + ~14-16
  docs-counts). Stash-proof: the staged files stashed → the native run
  ALL GREEN → pop → the RED re-confirmed.
- **GREEN**: the S113-P1 src edits (the four label swaps + the
  MENU_CONTENT retirement) + the S113-P4 doc realignment → **109 files
  / 1946 ALL PASSING** + lint 0/0 + tsc 0.
- **RED-2 (both faces)**: (A) the class edit — `outline-none` re-added
  to MENU_CONTENT → the MENU it FAILS by name → restored; (B) the
  label edit — one label reverted to span → the labels it FAILS by
  name → restored. Both restored → full GREEN.

## The validation checklist (pre-execution)

- [ ] The leads-page label sites: `src/app/(app)/leads/leads-page.tsx`
      :491/:507/:520/:539 — the ONLY `fieldLabel` consumers (verified
      by grep); the edit is tag-only (span → label), zero line change.
- [ ] The MENU_CONTENT edit site: `src/lib/page-layout.ts:964-966` —
      the string + its comment; `outline-none` appears ONCE in the
      token; the ONLY consumer is `ui/dropdown.tsx:116` (verified);
      NO test pins MENU_CONTENT's outline-none (verified — the
      page-layout.test outline-none hits are BUTTON_BASE /
      SELECT_TRIGGER / DIALOG families).
- [ ] The MENU_ITEM's own `outline-none` UNTOUCHED (the reference's
      items carry it — live-verified).
- [ ] The DropdownContent (Popover family) base UNTOUCHED (its
      outline-none matches the reference's POPOVER stock; the
      min-w/overflow-hidden/z-[60] are the documented superset-family
      extras).
- [ ] The e2e sites: the account-menu test (:588) + the leads ⋮ test
      (:2131) — the existing assertions UNTOUCHED (the new expects
      additive; the Profile click still follows the ArrowDown focus).
- [ ] The count arithmetic: 1944 + 2 = 1946; 1946 + 137 = 2083; the
      badge formula UNIT+E2E; page-layout.test.ts 183 + 2 = 185.
- [ ] The line-census: `wc -l` on page-layout.ts AFTER the edit → the
      four-site literals re-anchored to the exact live value.
- [ ] The captures' geometry envelopes match the walk's live
      measurements (128×74 @1280,56 · 320×398 @304,483 · 188×106).

## The execution record (2026-10-12, session-113)

Executed RED-first, with one in-flight correction + one lockstep
re-anchor discovered en route:

- **RED-1:** 16 failed | 190 passed (206) — the 14 docs-counts
  count-axis its (the UNIT const re-anchor cascading through the
  badge/tree/commands/Tested/AGENTS/PAD/H1/Appendix-B/four-site sites)
  + the MENU re-pin it (D-113a2, against the still-unfixed src) + the
  labels it (D-113a1, the spans still there), all enumerated by name.
  The plan predicted 15-18 — the s112 precedent's 16 landed exact.
  Stash-proven: the two staged files stashed → the native **204/204**
  → pop → 16 RED re-confirmed (204 + the 2 new its = 206 exact).
- **GREEN:** the S113-P1 src fixes (the four label re-tags in
  leads-page.tsx + the MENU_CONTENT outline-none retirement + the walk
  comment in page-layout.ts) + the full doc realignment (README badge
  2083 + the Tested row's s113 clause; AGENTS commands/gate 1946 + the
  §Session-113 block; CLAUDE the four sites; PAD the module-table row
  1559 + the s113 inventory row + Total/HEAD; SKILL v1.110.0
  [frontmatter + the H1 + project_state — the s113 layer prepended +
  §16da + the §5.6 phrase + the Appendix B unit total]) → **109 files
  / 1946 ALL PASSING**.
- **One in-flight correction:** the census literal — the plan drafted
  1556 (the comment line estimate); the actual live count landed at
  **1559** (the comments ran longer than drafted — the s112 genus).
  The docs-counts four-site literal corrected at the GREEN phase,
  before the full-suite run.
- **One lockstep re-anchor discovered en route:** the first GREEN run
  surfaced two re-anchor sites the plan's checklist missed — the
  dialog-geometry CLAUDE lockstep carrier (the 1944 forms → 1946, the
  s113 carry-forward comment) + the docs-counts layer-axis literals
  (the FIRST layer now "the session-113 layer", the SECOND "the
  session-112 layer (the 112-c rotation — THE DIALOG-FAMILY…"). Both
  re-anchored; the four affected suites then 243/243.
- **RED-2 (both faces):** (A) the class edit — `outline-none`
  re-added to MENU_CONTENT → the MENU it FAILED by name → restored;
  (B) the label edit — the Status label reverted to span → the labels
  it FAILED by name → restored. Both restored → 185/185 → full GREEN.
- **The e2e phase:** build ✓ + **137/137 (3.2m, zero flakes)** — the
  two focus expects green live on their FIRST run (the account-menu
  test's content focus + ArrowDown first-item landing; the ⋮ menu
  test's content focus), verified by name in the run output.
- **S113-P5 (the captures):** the throwaway capture script (the
  standing build on PORT 3141 + the scratch walk db, deleted after;
  one EADDRINUSE en route — a stale pre-fix server held the port,
  killed and re-booted on the fresh build). The live geometry envelope
  byte-matching the walk: **180** the account menu @1440 (w=128 h=74,
  focus=DIV/menu, docScrollW=1440) · **181** @390 (w=128 h=74,
  focus=DIV/menu, docScrollW=390) · **182** the Filters popover @1440
  (w=320 h=398, **labels=4** — the re-tag live, side=bottom) · **183**
  the leads ⋮ row menu @1440 (w=188 h=106, [Edit, Convert to
  Opportunity, Delete], focus=DIV/menu). **The VLM battery 4/4 × 4,
  zero adjudications** — the items read verbatim off every panel, the
  white rounded shadowed styling, and the containment all
  independently confirmed off the pixels (the 182 read even describes
  "labels positioned above each input field" — the D-113a1 fix
  visible).
- **GATE (stepwise):** lint 0/0 (one throwaway-script warning fixed en
  route — the unused eslint-disable in the scout, deleted with the
  throwaways) · tsc 0 · **1946/1946** [109 suites] · build ·
  **137/137** e2e · the four drift sweeps CLEAN (NO re-baselining —
  the label re-tag renders identically, the class retirement is
  render-inert) · the closing census MATCH (15/24/10/23/12 + 4 users).
  The tree: src/ = the TWO files; the four test files; the five docs;
  the s113 plan; the four captures; session_237 + the worklog.
