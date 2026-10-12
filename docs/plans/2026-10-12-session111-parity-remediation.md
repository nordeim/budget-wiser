# Session-111 Parity Remediation Plan (2026-10-12)

Session 111 on `main` @ `e131326` (the s110 ship `98759a4` + the
session-log follow-ups `741d355` [session_226+227] and `e131326`
[session_228]). The workspace carried over (no reset): `git pull`
`741d355..e131326`; the environment standing (bun 1.3.14; the 3-var
`.env` contract `DATABASE_URL="file:../db/custom.db"` + AUTH_SECRET +
NEXT_PUBLIC_SITE_URL; `db/` at the repo root with custom.db + e2e.db;
node_modules; chromium v1243/v1248; tree clean). Every op under
`env -u DATABASE_URL` (the shell's stray hazard, re-confirmed at intake).
The repo `skills/` folder excluded from checking/testing/compilation
throughout.

## Baseline gate (stepwise)

- lint 0/0 ✓ · tsc 0 ✓ · 109 files / 1938 tests ALL PASSING (14.89s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m, zero flakes) ✓ — exactly the
  s110 ship state.

## The audits

- **111-a (subagent)**: the s110 ship delta (`309c513..98759a4`, 20 files
  +1068/−91, src/ = exactly TWO files) **GENUINE 9/9** — the seam + the
  route slim + the NEW suite + the four re-anchors + the count ladder +
  the FOURTEENTH census pair + the captures 170/171 + the docs
  realignment, all verified hunk-by-hunk. Non-vacuousness reproduced
  EXACT: the mixed state **19 failed | 97 passed (116)**, all 19 by name;
  the native **112/112**; HEAD **109/1938**. **ONE REAL FINDING
  F-111a1**: SKILL:6487 — the Appendix B "Full gate wall-clock (the s109
  standing)" line still reads "unit ~15 s (**108 suites**, one worker per
  file)" — stale vs the live 109, internally inconsistent with the
  unit-total row two lines above; last touched at the s109 ship (correct
  then); no pin covers the wall-clock phrase.
- **111-b (subagent)**: the standing-layers audit **9/9 PASS — ZERO real
  findings** (~68th consecutive; `git diff 98759a4..HEAD -- src/` = 0
  bytes; the range = the two docs-only session-log commits). The ledger
  live 109/1938. The CSV census 17 sites zero unguarded zero drift. The
  vocabulary byte-identical since s90. The config layer verified. The
  SEO/sitemap **46/46 LIVE first-run clean** (PORT 3127) **+ 5/5
  supplements**. The mobile-nav contract INTACT (the ten-test battery
  **exit 0 at TRUE 390×844**). The globals v4 re-pins PRESENT
  (design-tokens 15/15). Both operator decisions STANDING (the ~71st).

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 82nd consecutive**;
  census #107: demo zero · desktop 256px/8 STANDING · the mobile-nav
  defect STANDS at TRUE 390 (the 32nd consecutive — the reference's own
  bug, our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each) + the closing census MATCH (15/24/10/23/12 + 4 users).
- The scandihaven patterns re-checked (d4789c3, on-pattern).

## The rotation (111-c) — THE LOGIN-FAMILY LIVE RE-WALK

The s110-close suggested next #3: the first LIVE parity re-walk of a
surface family since s79 — the **login family**: the pre-auth shell is
the ONE surface family the standing probes cannot see. probe:ref tracks
only the POST-LOGIN bundle (`index-DZ-xbrIm.js`; the pre-auth login shell
references different rolldown chunks — zero auth markers exist in the
1.63MB bundle, the s79 finding); the four drift gates sweep only the nine
(app) routes (the auth pages are never swept); the last live walk was s79
— 32 sessions of our changes since, with the reference's platform code
free to change under the untracked chunks. This is exactly the
non-bundle drift the s110-close predicted a re-walk would catch.

The ANALYZE (this session, pre-plan): a throwaway walk script (repo
internal, `scripts/s111-walk.mjs` — deleted before ship) drove BOTH apps
through the full auth view ladder — signin, the failed-login callout,
reset, sent, signup (a real POST through to verify) — at 1440×900 and
390×844, on a throwaway walk db (a copy of the seed, deleted after),
extracting computed styles per element + a per-child viewStack census;
three extraction iterations (the byTextMatch first-match depth bug; the
<60 length guard; the missing structural recipes). Every candidate
adjudicated against the authoritative source contracts
(`src/lib/login-reset.ts`, `LOGIN_LAYOUT` in `page-layout.ts`).

### The finds (adjudicated)

- **D1 (REAL, behavioral — verify)**: the reference AUTO-FOCUSES the
  first code box when the verify view mounts — live-measured as the 2px
  slate-400-family ring on box 1 only (box 6 rests at `none`),
  reproduced twice at both viewports; ours makes keyboard users Tab to
  box 1 first. The reference's own OTP nicety, not a defect.
- **D3 (REAL, structural — signup)**: the reference's signup rides a
  FLAT `space-y-4` stack with the h2 as a DIRECT child (census:
  `stack='space-y-4'`, `[BUTTON, H2, FORM]`); ours inherited the reset
  view's shared `space-y-4 sm:space-y-6` — the s21-authored
  `LOGIN_SIGNUP_LAYOUT.viewStack = "space-y-4"` const was correct but
  NEVER WIRED in login-card (the implementation collapsed all four
  non-signin views onto the reset view's stack). The drift: +8px at ≥640
  in the title→form gap (signup card 478 vs the reference's 470 @1440;
  equal 422 @390).
- **D4 (REAL, structural — verify)**: the reference's verify
  back→heading gap computes **16px at ≥640** (its `-mb-2` collapses with
  the v3 stack's mt 24: 24−8=16) and 8px at <640 (16−8); our verify back
  rides flat `mb-2` (8px at all widths) — the reset view's back already
  rides the `mb-2 sm:mb-4` ladder; the verify back needs the same arm
  (verify card 480 vs the reference's 488 @1440; equal 412 @390).
- **D2 (inert, class-string — verify)**: our verify headingStack reads
  `text-center space-y-3 sm:space-y-4` (the s21 "the sent view's family"
  misread); the reference's reads `text-center space-y-2`. INERT on both
  apps — the tile's own `mb-3 sm:mb-4` always overrides the stack's
  space-y (own-class specificity vs v4 `:where()`; margin-collapse
  max(16,8) under v3) — the heading heights measure 168/144 identical on
  both. Re-pinned for byte parity.
- **D5 (inert, class-string — sent)**: our `sentCallout` drops the
  `[&>svg]` arm family the reference's callout carries (the error/info
  callouts already have them; the s11 extraction's asymmetry). No svg
  ever renders on the auth surfaces — INERT. Re-pinned for byte parity.
- Everything else **FULL PARITY**: the signin view (inputs 44/48px,
  submit 48px, radius 12px, the py-2-vs-h-11 height mechanism computing
  equal at both widths; the v3/v4 space-y margin flips computing equal
  gaps), the reset + sent views (cards 374/310 + 398/354 equal), the
  error callout (byte-identical classes), the six code inputs
  (44×40/8px/14-16px), the ShieldCheck tile, the hint, the icons, the
  mobile spacer (byte-identical). The oklab-vs-rgba serialization
  (Tailwind v4 `color-mix`), the transparent-shadow prepends, the
  zinc-vs-neutral inherited foreground (never renders — every visible
  text carries an explicit slate class), and the default-border-color
  base-layer difference are noise.

The reconciliation: after D3+D4 the signup card reads **470@1440 /
422@390** and the verify card **488@1440 / 412@390** — byte-matching the
reference at BOTH widths.

### S111-P1 (the src fixes — TWO files)

`src/lib/login-reset.ts` (three in-string edits, line count unchanged —
the census row stays 279):

1. `LOGIN_VERIFY_LAYOUT.back`: `…transition-colors mb-2` →
   `…transition-colors mb-2 sm:mb-4` (D4 — the reset view's ladder).
2. `LOGIN_VERIFY_LAYOUT.headingStack`: `text-center space-y-3
   sm:space-y-4` → `text-center space-y-2` (D2, inert — byte parity).
3. `LOGIN_RESET_LAYOUT.sentCallout`: gains the reference's inert arm
   family: `relative w-full border p-4 [&>svg~*]:pl-7
   [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4
   [&>svg]:top-4 [&>svg]:text-foreground text-foreground
   bg-green-50/70 border-green-200 rounded-xl` (D5, inert — the
   error/info callout form with the green colors).

`src/components/layout/login-card.tsx` (three edits):

4. The shared viewStack div goes view-conditional: the signup view rides
   `LOGIN_SIGNUP_LAYOUT.viewStack` (`"space-y-4"` — the s21 const finally
   WIRED); reset/sent/verify keep `LOGIN_RESET_LAYOUT.viewStack` (D3).
5. The signup titleStack wrapper retires — the h2 becomes a DIRECT child
   of the stack (the reference's census structure; the wrapper was inert
   single-child `text-center space-y-2`) (D3, byte parity).
6. The verify-mount focus effect (D1): `React.useEffect(() => { if
   (view === "verify") codeRefs.current[0]?.focus(); }, [view])` — a DOM
   focus, never setState; fires only on view transitions INTO verify.

### S111-P2 (the pins — the existing suites extended)

`tests/login-family-parity.test.ts` gains a Session-111 section (the
suite header chronicle extended):

- **+1 it (D4)**: the verify back button is the responsive
  `mb-2 sm:mb-4` ladder (8px <640, 16px ≥640 — the reference's collapsed
  24−8=16, LIVE-measured s111) — RE-ANCHORING the existing :123 it in
  place (the weak `toContain("mb-2")` form retires).
- **+1 it (D2)**: the verify headingStack is `text-center space-y-2`
  (the s21 "the sent view's family" misread retired; inert — the tile's
  own `mb-3 sm:mb-4` overrides on both apps).
- **+1 it (D3a)**: the signup view rides
  `LOGIN_SIGNUP_LAYOUT.viewStack` (`"space-y-4"` flat) — the s21 const
  finally wired in login-card (render-source pin).
- **+1 it (D3b)**: the signup h2 is a DIRECT child of the stack — the
  inert titleStack wrapper retired (render-source pin: no
  `text-center space-y-2` wrapper in the signup branch).
- **+1 it (D1)**: the verify view auto-focuses the first code box on
  mount (render-source pin: the focus effect wired to
  `view === "verify"`).

`tests/login-reset.test.ts` (the D5 re-anchor — one existing it):

- **:127 re-anchored**: `LOGIN_RESET_LAYOUT.sentCallout` === the full
  svg-arm form (the short form retires). No net it change.

`tests/e2e/auth.spec.ts` (the D1 behavioral pin — an added expect
inside the EXISTING :133 test, NOT a new test() block):

- After the verify-view heading assertion:
  `await expect(page.locator('input[inputmode="numeric"]').first()).toBeFocused()`
  — the e2e count stays 137; the census arithmetic untouched.

### S111-P3 (the count ladder + the F-111a1 fix)

`UNIT` 1938 → **1943** (+5: the five new its; the D5 re-anchor lands in
an existing it); `SUITES` 109 **unchanged** (both extensions land in
EXISTING files); `E2E` **137 unchanged** (the strengthened expect, no new
test() block); badge 2075 → **2080** (1943+137). The README commands list
+ the AGENTS/CLAUDE/PAD count sites re-anchored 1938→1943; the
Appendix B unit-total 109|1938 → 109|1943 + the per-suite row; the
dialog-geometry CLAUDE lockstep 1938 → 1943; **the F-111a1 fix**: SKILL
:6487 the wall-clock line "108 suites" → "109 suites" + a NEW
docs-counts assertion on the wall-clock phrase (the Appendix B it gains
the phrase pin — an existing it, no net change). The retired 1938/2075
constructions join the negatives ladders.

### S111-P4 (the docs realignment)

README badge 2080 + the Tested row's s111 clause; AGENTS commands/gate
1943 + the §Session-111 history block; CLAUDE the four unit sites 1943;
PAD tree/Total/HEAD/checklist/commands 109|1943 + the s111 inventory row
(the module-table login-reset.ts row stays 279 — the in-string edits
don't move lines); SKILL v1.108.0 [frontmatter + the H1 + the
project_state — the s111 layer prepended + §16cy + the Appendix B rows +
the F-111a1 wall-clock fix]; session_229.md (the feat log) + this plan's
execution record + the worklogs.

### S111-P5 (the captures + the VLM battery)

The throwaway capture script (the s104-s110 pattern — repo-internal,
deleted after): the standing build + a fresh seed on a scratch port; the
FOUR captures — **172** the verify view at 1440 (post-D4: the card 488,
the back→heading gap 16, the auto-focused box 1 carrying the ring),
**173** the verify view at 390 (the card 412, the stacked ladder),
**174** the signup view at 1440 (post-D3: the card 470, the flat 16px
stack gaps), **175** the signup view at 390 (the card 422). The VLM
battery per the house protocol (4 checks each: structure · content ·
layout-fit · render quality), the reads anchored on the fixed geometry
(the 16px back→heading gap, the focused first box, the flat stack).

## The RED plan (TDD)

- **RED-1**: write the five new its + the two re-anchors (the D4 :123
  in-place re-anchor; the D5 :127 re-anchor) + the F-111a1 wall-clock
  phrase pin + the count-ladder re-anchors (README/AGENTS/CLAUDE/PAD/
  SKILL 1943 + Appendix B + the negatives) — then run the affected
  suites against the still-unfixed src + the still-old docs. Expected
  ≈8-10 failed: the five new its (D4/D2/D3a/D3b/D1) + the D5 re-anchor +
  the wall-clock phrase pin + the docs-counts count-axis its + the
  dialog-geometry lockstep — enumerated by name. Stash-proven (stash the
  test edits → the native suites green → pop → the RED re-confirmed).
- **GREEN**: the S111-P1 src fixes (login-reset.ts ×3 in-string +
  login-card ×3) + the full doc realignment → all green (109 files /
  1943).
- **RED-2 (the induced drift, BOTH faces)**: (A) the D4 perturbation —
  remove the `sm:mb-4` arm from the seam → the D4 it + the D3b/D1
  neighbors FAIL by name → restored → GREEN. (B) the render perturbation
  — re-add the titleStack wrapper in login-card → the D3b it FAILS by
  name → restored → GREEN. (The house doctrine: a class edit AND a
  render edit each fail the gate by name.)

## Blast radius (pre-checked)

- **src/ (TWO files)**: `src/lib/login-reset.ts` (three in-string edits,
  line count unchanged — the census row stays 279) +
  `src/components/layout/login-card.tsx` (the conditional stack + the
  wrapper retirement + the focus effect).
- tests/login-family-parity.test.ts (+5 its + the :123 re-anchor),
  tests/login-reset.test.ts (the :127 re-anchor),
  tests/e2e/auth.spec.ts (the strengthened expect), tests/docs-counts
  .test.ts (the count ladder + the Appendix B + the wall-clock phrase +
  the negatives), tests/dialog-geometry-parity.test.ts (the CLAUDE
  lockstep), the docs family (README · AGENTS · CLAUDE · PAD · SKILL
  v1.108.0 · session_229.md · this plan · the worklogs), the captures
  172-175 NEW.
- **The standing pins pre-checked**: login-views.test.ts :168/:179/:187
  (the SIGNUP back + viewStack const pins — untouched: the const was
  already `"space-y-4"`; the signup back stays mb-2 flat);
  login-family-parity :117 (the signup back — untouched);
  :230 (the verify viewStack — stays `space-y-4 sm:space-y-6`);
  login-reset :149/:150 (the reset viewStack + the SENT headingStack —
  untouched); the s79 text-ladder/focus-ring/code-input pins —
  untouched by these edits. The e2e auth.spec selectors are role/text
  based (getByRole heading) — robust to the wrapper retirement; the
  crm.spec golden path never visits the auth views post-login.
- The vitest config untouched; the playwright config untouched; the
  gate:full chain unchanged; the drift baselines untouched (the auth
  pages are not in the sweep routes — no re-baselining); the census
  contract untouched (the seed is not edited; login-reset.ts's line
  count is unchanged by in-string edits).

## The execution record (2026-10-12, session-111)

Executed RED-first, with two documented plan-validation corrections
and two in-flight fixes:

- **Plan-validation corrections:** (1) the count arithmetic — the plan
  said +5 its / 1943 / 2080; the D4 lands as the :123 IN-PLACE
  re-anchor and the D5 as the :127 in-place re-anchor, so the new its
  are FOUR (D1/D2/D3a/D3b): **1942 / badge 2079** — corrected at plan
  validation. (2) the RED estimate — the plan predicted ≈8-10; the
  actual **20 failed | 76 passed (96)** (the docs-counts axis is 13
  its on its own — the s110 precedent's 19 was the better guide).
- **RED-1:** 20 failed | 76 passed (96) — the 13 docs-counts (10
  count-axis + the H1 lockstep + the Appendix B [the F-111a1
  wall-clock]) + the dialog-geometry lockstep + the D4/D1/D2/D3a/D3b
  five + the D5 re-anchor, all enumerated by name. Stash-proven: the
  five test files stashed → the native **92/92** → pop → 20 RED
  re-confirmed (92 + the 4 new its = 96 exact).
- **GREEN:** the S111-P1 src fixes (login-reset ×3 in-string +
  login-card ×3) + the full doc realignment (README badge 2079 + tree
  + commands + the Tested row's s111 clause; AGENTS commands/gate
  1942 + the §Session-111 block; CLAUDE the four unit sites; PAD
  tree/Total/HEAD/checklist/commands + the login-reset census row
  279→291 + the s111 inventory row; SKILL v1.108.0 [frontmatter + the
  H1 + project_state — the s111 layer prepended with the beneath-it
  transition + §16cy + Appendix B + the F-111a1 wall-clock]) → **109
  files / 1942 ALL PASSING**. Two in-flight fixes documented: (a) the
  two s79-era call-site pins' slice anchors re-derived with the
  `? (` discriminator (the D1 effect + the D3a conditional introduced
  earlier `view ===` occurrences — the F-92a3 genus on the anchor
  axis); (b) the H1 lockstep's layer-axis literals advanced
  (session-110 → session-111 + the second-layer beneath-it form). The
  spacey census re-anchored 110 → 108 (the wrapper's space-y-2 + the
  headingStack's sm: arm — net −2, LIVE-verified 18 files / 108).
- **RED-2 (both faces):** (A) the class edit — the verify back's
  `sm:mb-4` removed → the D4 it FAILED by name (the first accidental
  occurrence also proved the RESET back's pin: its sm:mb-4 removal
  failed the reset it by name — both restored); (B) the render edit —
  the titleStack wrapper re-added → the D3b it FAILED by name →
  restored. Both restored → full GREEN.
- **The e2e phase:** build ✓ + **137/137 (3.1m)** — the D1-strengthened
  verify test green live (`toBeFocused()` passing in the real browser).
- **S111-P5 (the captures):** the throwaway capture script (the
  standing build on PORT 3131 + a scratch db copy, deleted after).
  The live geometry envelope: the signup card **422** + the verify
  card **412** + docScrollW 390 + **firstBoxFocused: true** at 390.
  **172/173** (the verify view @1440/@390) + **174/175** (the signup
  view @1440/@390). **The VLM battery 4/4 × 4, zero adjudications** —
  the VLM independently read the focus ring on box 1 off both verify
  captures + the full containment at 390.
- **GATE (stepwise):** lint 0/0 · tsc 0 · **1942/1942** [109 suites]
  · build · **137/137** e2e · the four drift sweeps CLEAN · the
  closing census MATCH. The tree exactly as planned: src/ = the TWO
  files; the seven test files; the docs family; the four captures.
