# Session-112 Parity Remediation Plan (2026-10-12)

Session 112 on `main` @ `be95db5` (the s111 ship `00b10c8` + the
session-log follow-ups `a8541ba` [session_230+231] and `be95db5`
[session_232]). The workspace carried over (no reset): `git pull`
`a8541ba..be95db5`; the environment standing (bun 1.3.14; the 3-var
`.env` contract `DATABASE_URL="file:../db/custom.db"` + AUTH_SECRET +
NEXT_PUBLIC_SITE_URL; `db/` at the repo root with custom.db + e2e.db;
node_modules; chromium v1243/v1248; tree clean). Every op under
`env -u DATABASE_URL` (the shell's stray hazard, re-confirmed at intake).
The repo `skills/` folder excluded from checking/testing/compilation
throughout.

## Baseline gate (stepwise)

- lint 0/0 ✓ · tsc 0 ✓ · 109 files / 1942 tests ALL PASSING (14.91s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m, zero flakes) ✓ — exactly the
  s111 ship state.

## The audits

- **112-a (subagent)**: the s111 ship delta (`e131326..00b10c8`, 20 files,
  src/ = exactly TWO files) **GENUINE 9/9** — the five finds + the seven
  test files + the docs family + the captures 172-175, verified
  hunk-by-hunk. Non-vacuousness reproduced EXACT: the mixed state
  **22 failed | 74 passed (96)**, all 22 by name (the record's 20 RED-1
  + the 2 census-axis faces from the GREEN-phase spacey re-anchor — more
  non-vacuousness, not less); the native arithmetic 92 exact; HEAD
  **109/1942**. **ZERO real findings** (N-112a1-4 record-only: the
  records' "seven test files" was six, "six docs" was five — dated-history
  artifacts; the RED-1 20-vs-22 reconciliation; the §S111-P4 census-row
  prediction miss; the brief's own list drift).
- **112-b (subagent)**: the standing-layers audit **9/9 PASS — ZERO real
  findings** (~69th consecutive). The SEO/sitemap **46/46 LIVE first-run
  clean** (PORT 3127, scratch db) **+ 11/11 supplements**. The drawer
  battery **10/10 exit 0 at TRUE 390×844**. design-tokens 15/15 ·
  vocabulary 8/8 · config zero drift · census MATCH (15/24/10/23/12 + 4
  users at `<repo>/db/custom.db`) · the Tailwind v4 layer byte-identical
  since s90 · the reference-defect ledger unchanged.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 83rd consecutive**;
  census: demo zero · desktop 256px/8 STANDING · the mobile-nav defect
  STANDS at TRUE 390 (the 33rd consecutive — the reference's own bug,
  our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each) + the closing census MATCH.
- The scandihaven patterns re-checked (d4789c3, on-pattern).

## The rotation (112-c) — THE DIALOG-FAMILY LIVE RE-WALK

The s111-close suggested three candidates: the probe `--expect` mode
(tooling — the probe already gates via its internal STANDING constants),
the §16 chronicle count-axis adjudication (docs hygiene), and **the
dialog family as the next un-walked LIVE family**. The walk selected —
the highest parity-value play: the s92 walk was **390-ONLY** and **20
sessions of changes ago**; the dialogs' **mount-focus behavior** (the
s111 D1 genus — behavioral parity invisible to every standing gate) was
never measured; the family is the app's largest interactive surface
group (seven dialogs across six pages).

The ANALYZE (this session, pre-plan): a throwaway walk script (repo
internal, `scripts/s112-walk.mjs` — deleted before ship) drove BOTH apps
through the CREATE-dialog ladder — New Lead · New Account · New Contact
· Import Contacts · New Event · Log Call (the quick-log) · Save Custom
Report View — at 1440×900 + 390×844, our side on the standalone build
+ a throwaway walk db (a copy of the seed, deleted after), extracting
per dialog: the content-box geometry (w/h/maxW/maxH/overflow/pad/radius/
gap/border/bg), the overlay, the header (align/title fs/fw/text), the
close X (position/size/opacity/radius), the first field group (label
fs/fw/color/mb + the control h/mt/mb/radius), the footer (direction/
gap/pt/button), the mount-focus state (the D1-genus check), the child
census, and the document scroll widths. Three walk-script iterations
(the s111 three-iteration precedent): (1) `page.evaluate(STRING)` — a
string expression evaluates to the function OBJECT, non-serializable,
returns undefined; (2) the pre-hydration click swallow (the retry then
blind-clicked behind the opened overlay — 30s actionability hangs);
(3) **the D-112a4 find** — our PERMANENTLY-MOUNTED mobile-nav drawer
carries `role="dialog"` (display:none at desktop, NO data-state): CSS
`[role=dialog]` queries match IT first and never resolve. Every
candidate adjudicated against the source contracts
(`entity-dialogs.tsx`, `ui/dialog.tsx`, the `DIALOG_FAMILY` in
`page-layout.ts`) + a targeted full-string re-extraction
(`scripts/s112-walk2.mjs`, deleted before ship).

### THE RESULT — the dialog family is in COMPLETE LIVE PARITY

Every geometry axis PARITY on all 7 dialogs × 2 viewports: the widths
(lead/contact 512 · account/event/activity/savereport 672 · import 448
at 1440; full-bleed 390 at phone), the heights, the max-h-[90vh] scroll
caps (contact/event/activity/savereport carry it; lead/account cap-free
— the reference's own inconsistency, mirrored), the pads/radius/gaps,
the header alignment ladder, the titles + the description arms, the
close X geometry, the label→control gaps, the footers + the submit
buttons, the census structure (`[div,form,button]` + `[div,div,div,
button]` for the formless import/savereport — identical), and **the
mount-focus behavior IDENTICAL on all seven** (lead/account/event/
savereport → the first input · contact → the camera button · activity →
the type select trigger · import → the Cancel button). The s92 fixes
(phantom-mb · the contact sections · the textarea rows) + the s15 pins
+ 20 sessions of changes — all verified live at both widths.

### The finds (adjudicated)

- **D-112a1 (inert class-string — the close X)**: the reference's
  CURRENT stock close carries `ring-offset-background` +
  `data-[state=open]:bg-accent data-[state=open]:text-muted-foreground`
  and NOT `disabled:opacity-70`; our s15-era string predates the
  reference's shadcn bump (the s15 extraction recorded the then-current
  form — the reference redeployed since; the bundle itself is stable,
  the 83rd consecutive). The two `data-[state=open]` arms are INERT on
  both sides (the Radix DialogClose never carries a data-state
  attribute) and `disabled:opacity-70` is inert on ours (the close is
  never disabled) — the s111 D2/D5 byte-parity re-pin genus.
  **`ring-offset-background` is the COMPUTED-CONTRACT EXCEPTION** (the
  s11 lesson: re-derive from the computed value, never copy the class
  string): the reference's focused-close ring offset computes
  `hsl(0 0% 100%)` = `#fff`; ours computes `#fff` (the v4 default);
  adding the class would set `var(--color-background)` = `#f9fafb` —
  INTRODUCING the very divergence it would pin away. Deliberately
  absent, pinned as absent.
- **D-112a2 (the a11y superset, UNPINNED — the contact camera button)**:
  our camera button carries `aria-label="Upload photo"`; the reference's
  icon-only button is UNNAMED (its own a11y defect — the mobile-nav
  genus: our superset). Everything else on the button byte-matches
  (`absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex
  items-center justify-center shadow-md hover:bg-gray-50…`). The
  superset is correct but UNPINNED — freeze it.
- **D-112a3 (behavioral parity, UNPINNED — the mount-focus)**: all
  seven dialogs land focus on the identical element on both apps —
  behavioral parity NO standing gate can see (the s111 D1 lesson: the
  class-string pins read what renders, not what focuses). Freeze it as
  six e2e expects inside EXISTING test blocks (the census stays 137).
- **D-112a4 (the tooling rule — the role=dialog shadowing)**: our
  permanently-mounted mobile-nav drawer carries `role="dialog"` with no
  data-state — CSS `[role=dialog]` selectors match it FIRST (the walk's
  own third iteration: `waitForSelector('[role=dialog]')` hung on the
  hidden drawer while the real dialog was open). `getByRole("dialog")`
  is safe (Playwright excludes hidden elements — why the e2e suite
  never tripped). The rule: CSS dialog selectors in this codebase MUST
  key on `[role=dialog][data-state="open"]`. Document at the source +
  the testing doctrine.
- The noise families adjudicated away: the oklab/rgba overlay
  serialization (v4 `color-mix`); the transparent-shadow prepends (the
  focused-input ring COMPUTED-EQUAL — the identical visible 1px
  `#0a0a0a` ring + `shadow-sm` on both apps); the labelMb 8px-vs-0
  v3/v4 space-y mechanism flip (the visual gap pinned-equal via
  `controlMt` since s14/s92); `border-input` vs `border-line` + the
  activity trigger's `w-full` ordering (the s86 computed-equal mechanism
  notes).

## S112-P1 (the src fixes — TWO files)

`src/lib/page-layout.ts` (the DIALOG_CLOSE re-pin + the walk comment):

1. `DIALOG_CLOSE`: `…opacity-70 transition-opacity hover:opacity-100
   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
   disabled:pointer-events-none disabled:opacity-70` → `…opacity-70
   transition-opacity hover:opacity-100 focus:outline-none focus:ring-2
   focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none
   data-[state=open]:bg-accent data-[state=open]:text-muted-foreground`
   (D-112a1 — the two inert arms gained, the inert `disabled:opacity-70`
   retired; byte-parity with the reference's current stock close).
2. The token's comment gains the s112 walk note: the live-measured
   reference string; the `ring-offset-background` computed-contract
   exception (the ref's `hsl(0 0% 100%)` = our `#fff` default; the
   class would set `#f9fafb` — the s11 computed-gap rule); the two
   `data-[state=open]` arms inert on both sides (the Radix DialogClose
   never carries data-state).

`src/components/layout/mobile-nav.tsx` (the D-112a4 documentation):

3. The `role="dialog"` line gains the shadowing-hazard comment: the
   drawer is PERMANENTLY MOUNTED with `role="dialog"` and no
   `data-state`; CSS `[role=dialog]` selectors match it first — key on
   `[role=dialog][data-state="open"]` (the Radix dialogs) or use
   `getByRole` (excludes hidden); the s112 walk's third iteration.

## S112-P2 (the unit pins — TWO new its)

`tests/page-layout.test.ts` (the Session-112 section under the s15
dialog chrome describe):

4. **+1 it (D-112a1)**: the close X byte-matches the reference's
   CURRENT stock string: the two `data-[state=open]` arms present ·
   `disabled:opacity-70` RETIRED · `ring-offset-background`
   DELIBERATELY ABSENT (the computed-contract exception — the negative
   pin with the s11-rule comment).

`tests/contact-photo.test.ts` (the camera section):

5. **+1 it (D-112a2)**: the camera button carries
   `aria-label="Upload photo"` — the reference's icon-only button is
   UNNAMED (its own a11y defect; ours the documented superset — the
   mobile-nav genus).

## S112-P3 (the e2e mount-focus freeze — six added expects)

`tests/e2e/crm.spec.ts` — added expects INSIDE existing test() blocks
(the e2e census STAYS 137; the s111 D1 precedent):

6. The New Lead phone-geometry test (:665): after `toBeVisible()` —
   `dialog.locator("input").first()` `toBeFocused()` (the first input =
   the Name field).
7. The New Contact avatar test (:705): the camera button (the existing
   `svg.lucide-camera` locator hoisted to a const)
   `toBeFocused()` — BEFORE the Ada Lovelace fill (which moves focus).
8. The New Event wide-family test (:727):
   `dialog.locator("input").first()` `toBeFocused()`.
9. The Log Activity quick-create test (:2396):
   `dialog.getByRole("combobox")` `toBeFocused()` (the type select
   trigger — the first focusable in the ActivityForm).
10. The Import Contacts structure test (:1656):
    `dlg.getByRole("button", { name: "Cancel" })` `toBeFocused()` (the
    dropzone label is NOT focusable — the footer Cancel is the first
    focusable; LIVE-measured on both apps).
11. The Save Custom Report View round-trip (:1463):
    `page.getByPlaceholder("e.g., Q1 Won Deals by Region")`
    `toBeFocused()` (the name input — the first focusable).

## S112-P4 (the count ladder + the docs realignment)

- **UNIT 1942 → 1944** (+2: the close-X it + the camera it) ·
  **SUITES 109 UNCHANGED** (both its land in EXISTING files) ·
  **E2E 137 UNCHANGED** (six added expects, zero new its) ·
  **badge 2079 → 2081**.
- The line-census re-anchors: `page-layout.ts` 1530 → the live count
  (the comment growth; BOTH faces — the SKILL §5.6 phrase `1530 lines;
  tests/page-layout.test.ts, 182 checks` → the new line count + `183
  checks`, and the PAD module-table row) · `mobile-nav.tsx` 206 → the
  live count (the comment growth; the PAD:1359 row + the SKILL:341
  phrase). The docs-counts four-site pin re-anchored (the 1530/182
  literals + the negatives ladder gains the retired forms).
- The docs: SKILL v1.109.0 (frontmatter + project_state — the s112
  layer prepended + the H1 lockstep layer-axis literals + §16cz + the
  Appendix B unit-total row 1944) · README badge 2081 + the Tested
  row's s112 clause · AGENTS the commands/gate counts 1942→1944 (two
  sites) + the §Session-112 history block · CLAUDE the unit-count
  sites 1942→1944 (four sites) + the dialog-geometry lockstep · PAD
  the s112 inventory row + the module-table rows + Total/HEAD
  109|1944+137.
- The session docs: `docs/session_233.md` (the feat log, in the feat
  commit) + session_234/235 (the summary + narration, the follow-up
  commit).

## S112-P5 (the captures)

Four captures on the standing build + a scratch db (the s111 capture
precedent): **176** the New Lead dialog @1440×900 (the stock max-w-lg
family) · **177** the New Lead dialog @390×844 (the full-bleed phone
face + the centered header) · **178** the New Contact dialog @1440×900
(the avatar section + the camera button + the focused camera ring) ·
**179** the New Event dialog @390×844 (the wide family full-bleed).
The VLM battery (4 checks each): the dialog geometry, the title, the
close X, the focus ring.

## S112-P6 (the ship)

The house-style commit (the TWO src files + the TWO test files + the
crm.spec six expects + the docs family + the captures + session_233 +
the worklog) → the SSH push per the runbook (the operator key OUTSIDE
the repo, the fingerprint VERIFIED, the dry-run, the real push) → the
session-log follow-ups (session_234/235) → the close-out.

## The TDD ladder (the predictions)

- **RED-1** (the pins + the re-anchors staged against the still-unfixed
  src + the still-old docs): the close-X it FAILS (the arms absent +
  the retired arm present) + the camera it PASSES (a freeze pin — the
  aria-label already stands; the s103 seeded-charts precedent) + the
  six e2e expects PASS at staging (the behavior already stands — freeze
  pins) + the docs-counts axis FAILS (the count-ladder re-anchors: the
  unit-total rows + the four-site pin's 1530/182 literals vs the
  still-old docs + the line-census rows vs the still-uncommented src).
  **Estimate: 12-16 failed** (the docs-counts axis dominates — the s111
  precedent's 13 count-axis its + the four-site pin + the line-census
  rows + the close-X it). Stash-proof: the staged files stashed → the
  native run ALL GREEN → pop → the RED re-confirmed.
- **GREEN**: the S112-P1 src edits (the DIALOG_CLOSE re-pin + the
  mobile-nav comment) + the S112-P4 doc realignment → **109 files /
  1944 ALL PASSING** + lint 0/0 + tsc 0.
- **RED-2 (both faces)**: (A) the class edit — one `data-[state=open]`
  arm removed → the close-X it FAILS by name → restored; (B) the
  superset edit — the camera `aria-label` removed → the camera it FAILS
  by name → restored. Both restored → full GREEN.

## The validation checklist (pre-execution)

- [ ] The DIALOG_CLOSE edit site: `src/lib/page-layout.ts:810-816` —
      the token + its comment; NO other consumer of the retired arm
      (`rg "disabled:opacity-70" src/` — only the close token).
- [ ] The ui/dialog.tsx close render unchanged (the token is the only
      source of the class string).
- [ ] The mobile-nav comment site: the `role="dialog"` line (:143).
- [ ] The page-layout.test.ts close it (:648-660 area) — the existing
      assertions UNTOUCHED (the new it is additive).
- [ ] The contact-photo camera section (:94) — the existing its
      UNTOUCHED.
- [ ] The six crm.spec sites: the exact line numbers verified against
      the current file; the contact camera locator hoist is the ONLY
      structural change (a const extraction, zero semantic drift).
- [ ] The e2e focus expects: each target verified against the walk's
      LIVE focus measurements (lead→input · contact→camera ·
      event→input · activity→combobox · import→Cancel ·
      savereport→the placeholder input).
- [ ] The count arithmetic: 1942 + 2 = 1944; 1944 + 137 = 2081; the
      badge formula UNIT+E2E.
- [ ] The line-census: `wc -l` on the two src files AFTER the edits →
      the doc rows + the four-site literals re-anchored to the exact
      live values.

## The execution record (2026-10-12, session-112)

Executed RED-first, with one documented in-flight correction:

- **RED-1:** 16 failed | 230 passed (246) — the 14 docs-counts
  count-axis its (the UNIT const re-anchor cascading through the
  badge/tree/commands/Tested/AGENTS/PAD/H1/Appendix-B/four-site
  sites) + the dialog-geometry CLAUDE lockstep + the close-X it
  (D-112a1, against the still-unfixed src), all enumerated by name.
  The camera it (D-112a2) PASSED at staging — a freeze pin (the
  aria-label already stands; the s103 seeded-charts precedent),
  exactly as the plan predicted. The six e2e focus expects staged
  (freeze pins; the e2e phase runs post-GREEN). Stash-proven: the
  four staged files stashed → the native **244/244** → pop → 16 RED
  re-confirmed (244 + the 2 new its = 246 exact).
- **GREEN:** the S112-P1 src fixes (the DIALOG_CLOSE re-pin + the
  walk comment in page-layout.ts; the shadowing-rule comment in
  mobile-nav.tsx) + the full doc realignment (README badge 2081 +
  the Tested row's s112 clause; AGENTS commands/gate 1944 + the
  §Session-112 block; CLAUDE the four sites; PAD the module-table
  rows + the s112 inventory row + Total/HEAD; SKILL v1.109.0
  [frontmatter + the H1 + project_state — the s112 layer prepended
  + §16cz + Appendix B + the §5.6 phrase + the mobile-nav line
  count]) → **109 files / 1944 ALL PASSING**.
- **One in-flight correction:** the census literals — the plan
  drafted 1543/212 (the comment line estimates); the actual live
  counts landed at **1548/215** (the comments ran longer than
  drafted). The docs-counts four-site literals + the doc rows
  corrected at the GREEN phase, before any full-suite run.
- **RED-2 (both faces):** (A) the class edit — the
  `data-[state=open]:bg-accent` arm removed → the close-X it FAILED
  by name → restored; (B) the superset edit — the camera
  `aria-label="Upload photo"` removed → the camera it FAILED by
  name → restored. Both restored → full GREEN.
- **The e2e phase:** build ✓ + **137/137 (3.2m, zero flakes)** —
  the six mount-focus expects green live on their FIRST run (the
  lead phone test's input, the contact camera, the event input, the
  activity combobox, the import Cancel, the savereport placeholder
  input).
- **S112-P5 (the captures):** the throwaway capture script (the
  standing build on PORT 3135 + a scratch db copy, deleted after).
  The live geometry envelope byte-matching the walk: **176** the
  New Lead dialog @1440 (w=512 h=640, focus=input) · **177** @390
  (w=390 h=676, focus=input, docScrollW=390) · **178** the New
  Contact dialog @1440 (w=512 h=810, focus=button:Upload photo) ·
  **179** the New Event dialog @390 (w=390 h=646, focus=input).
  **The VLM battery 4/4 × 4, one adjudication**: the 179
  Title-input focus ring read as "light border" at 1x — the 3x-zoom
  re-read confirmed the darker/heavier border (the 1px #0a0a0a ring
  beyond the VLM's 1x resolution). The VLM independently read the
  focused Name input's dark ring off 176 + the camera button's BLUE
  focus ring off 178 — the D-112a3 evidence, off the pixels.
- **GATE (stepwise):** lint 0/0 · tsc 0 · **1944/1944** [109
  suites] · build · **137/137** e2e · the four drift sweeps CLEAN
  (NO re-baselining — the class-string re-pin is render-inert by
  design) · the closing census MATCH. The tree: src/ = the TWO
  files; the five test files; the six docs; the s112 plan; the four
  captures; session_233 + the worklog.
