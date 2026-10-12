# Session 111 — the login-family LIVE re-walk + the five finds

**State on intake:** `main` @ `e131326` (the s110 ship `98759a4` + the
session-log follow-ups `741d355` [session_226+227] and `e131326`
[session_228]). The s110-close suggested next: the probe `--expect`
mode / a new genus / **the first LIVE parity re-walk of a surface
family since s90** — the re-walk taken, targeted at the LOGIN family:
the one surface family the standing probes cannot see (probe:ref
tracks only the POST-LOGIN bundle `index-DZ-xbrIm.js` — the pre-auth
shell rides DIFFERENT rolldown chunks, zero auth markers in the 1.63MB
bundle [the s79 finding]; the four drift gates sweep only the nine
(app) routes; the last live walk was s79 — 32 sessions of our changes
since). This is exactly the non-bundle drift the s110-close predicted
a re-walk would catch — and it did.

**The baseline gate (stepwise):** lint 0/0 · tsc 0 · 109 files / 1938
unit · build · 137/137 e2e fresh CI=1 (3.2m, zero flakes) — exactly
the s110 ship state.

**The audits:** **111-a GENUINE 9/9** (the s110 ship delta verified
hunk-by-hunk; the non-vacuousness reproduced EXACT: the mixed state 19
failed | 97 passed (116), all 19 by name; the native 112/112; HEAD
109/1938) — **ONE REAL FINDING F-111a1**: the SKILL Appendix B
wall-clock prose line still read "108 suites" (stale vs the live 109,
internally inconsistent with the unit-total row two lines above).
**111-b 9/9 PASS zero real findings** (~68th; the SEO/sitemap 46/46
LIVE first-run + 5/5 supplements; the drawer battery 10/10 exit 0 at
TRUE 390×844; design-tokens 15/15; the vocabulary 6/6).

**The live verification:** probe:ref STABLE the **82nd** (the bundle
md5 exact; demo zero; desktop 256px/8; the mobile-nav defect STANDS
the **32nd** — the reference's own bug, our drawer the superset). The
four drift gates CLEAN; the closing census MATCH.

**The rotation (111-c) + the ANALYZE:** a throwaway walk script
(repo-internal, deleted before ship) drove BOTH apps — the live
reference and our dev server on a throwaway walk db — through the
full auth view ladder (signin, the failed-login callout, reset, sent,
signup with a real POST through to verify) at 1440×900 + 390×844,
extracting computed styles per element + a per-child viewStack census;
three extraction iterations (the byTextMatch first-match depth bug;
the <60 length guard; the missing structural recipes); every candidate
adjudicated against the authoritative source contracts. **Five
finds — three real + two inert:**

- **D1 (behavioral, verify)**: the reference AUTO-FOCUSES the first
  code box on verify mount — live-measured as the 2px ring on box 1
  only (box 6 rests at none), reproduced twice at both viewports.
- **D3 (structural, signup)**: the reference's signup rides a FLAT
  `space-y-4` stack with the h2 as a DIRECT child; ours inherited the
  reset view's shared `space-y-4 sm:space-y-6` — the s21-authored
  `LOGIN_SIGNUP_LAYOUT.viewStack = "space-y-4"` const was correct but
  NEVER WIRED (+8px at ≥640 in the title→form gap; the signup card
  478 vs the reference's 470 @1440, equal @390).
- **D4 (structural, verify)**: the reference's verify back→heading gap
  computes 16 at ≥640 (its `-mb-2` collapses with the v3 stack's mt
  24); our verify back rode flat `mb-2` (the reset view's back already
  had the ladder; the verify card 480 vs 488 @1440, equal @390).
- **D2 (inert, verify)** + **D5 (inert, sent)**: the verify
  headingStack (`text-center space-y-3 sm:space-y-4` vs the
  reference's `text-center space-y-2` — the tile's own `mb-3 sm:mb-4`
  always overrides the stack's space-y on both apps, the heading
  heights 168/144 identical) + the sentCallout's `[&>svg]` arm family
  — re-pinned for byte parity, zero rendered effect.

**The fixes (S111-P1, two src files):** `LOGIN_VERIFY_LAYOUT.back`
gains the `sm:mb-4` arm; the headingStack re-pinned to
`text-center space-y-2`; the sentCallout gains the reference's inert
svg arms; the login-card's shared viewStack div went view-conditional
(the signup rides `LOGIN_SIGNUP_LAYOUT.viewStack` at last); the
signup's inert titleStack wrapper retired (the h2 a DIRECT stack
child, the reference's census structure); the verify-mount focus
effect added (`codeRefs.current[0]?.focus()` keyed on `[view]` — a
DOM focus, never setState).

**The pins (S111-P2/P3):** four new its in login-family-parity
(D1/D2/D3a/D3b) + the D4 re-anchor in-place (:123) + the D5 re-anchor
in-place (login-reset :127) + the D1 e2e expect inside the EXISTING
verify test (`toBeFocused()` — the e2e census stays 137) + the
F-111a1 wall-clock phrase pin + the count ladder 1938 → 1942 (+4) ·
SUITES 109 UNCHANGED · E2E 137 UNCHANGED · badge 2075 → 2079 · the
dialog-geometry CLAUDE lockstep 1942 · the spacey census 110 → 108
(the wrapper's space-y-2 + the headingStack's sm: arm — net −2) · the
PAD login-reset.ts census row 279 → 291 · the two slice-anchor
re-derivations in login-family-parity (the `? (` discriminator — the
D1 effect + the D3a conditional introduced earlier `view ===`
occurrences, breaking the two s79-era call-site pins).

**RED-1:** 20 failed | 76 passed (96) at the still-unfixed src + the
still-old docs (13 docs-counts + the H1 lockstep + the Appendix B
[the F-111a1 wall-clock] + the dialog-geometry lockstep + the
D4/D1/D2/D3a/D3b five + the D5 re-anchor — enumerated by name; the
plan predicted 8-10, under-counting the docs-counts axis — the s110
precedent's 19 was the better guide), stash-proven (the five files
stashed → the native 92/92 → pop → 20 RED re-confirmed).

**RED-2 (both faces):** (A) the class edit — the verify back's
`sm:mb-4` removed → the D4 it FAILED by name (an accidental first
occurrence also proved the RESET back's pin: its sm:mb-4 removal
failed the reset it by name) → restored. (B) the render edit — the
titleStack wrapper re-added → the D3b it FAILED by name → restored.

**The reconciliation + the captures:** the post-fix cards byte-match
the reference at BOTH widths — the signup **470@1440 / 422@390**, the
verify **488@1440 / 412@390** (the capture script's live geometry
envelope: the signup card 422 + the verify card 412 + docScrollW 390 +
`firstBoxFocused: true` — the D1 focus-entry verified live on our
app). **172** (the verify view @1440) + **173** (@390) + **174** (the
signup view @1440) + **175** (@390) — **the VLM battery 4/4 × 4, zero
adjudications**: the VLM independently read "Verify your email" +
"Verify email" + the email line verbatim + **"the first of the six
code boxes appears visually focused with a dark border/ring"** off
both verify captures, and "Create your account" + "Create account"
off both signup captures, with the full containment at 390.

**GATE (stepwise):** lint 0/0 · tsc 0 · 1942/1942 unit [109 suites]
· build · 137/137 e2e (3.1m — the D1-strengthened verify test green
live) · the four drift sweeps CLEAN (the auth pages' in-place swaps
are not in the sweep page loads; the login PAGE sweep is the signin
view — untouched by these fixes; no re-baselining) · the closing
census MATCH (15/24/10/23/12 + 4 users). Docs at SKILL v1.108.0
[§16cy + project_state + the H1 + Appendix B + the F-111a1 wall-clock
fix] + README badge 2079 + AGENTS/CLAUDE/PAD at 1942+137 + this log
(session_229) + the s111 plan + its execution record + the worklogs +
the captures 172-175.

**Session 111 SHIPPED** — the login family re-walked LIVE for the
first time since s79; the reference's verify focus-entry restored, the
signup's flat stack wired, the verify back's ladder corrected, and the
two inert divergences re-pinned byte-exact; the count ladder at 109
files / 1942 unit / 137 e2e / badge 2079.

**Suggested next (session 112):** the probe `--expect` mode (the
remaining s110-close candidate), the §16 chronicle count-axis
adjudication (the N-111a1 carry-forward), or a fresh genus — the
reference bundle has now been stable 82 sessions and the login family
is freshly re-walked; the next un-walked LIVE family would be the
dialog family (the entity dialogs' computed styles vs the reference).
Which shall I take?
