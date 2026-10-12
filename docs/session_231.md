# Session 231 — Session 111 narration

The five finds, end to end: this run took the s110-close's suggested
re-walk — the first LIVE parity re-walk of a surface family since s79
— and pointed it at the login family, the one surface the standing
probes structurally cannot see. probe:ref fingerprints only the
POST-LOGIN app-shell bundle (`index-DZ-xbrIm.js`, stable now 82
sessions); the pre-auth login shell rides DIFFERENT rolldown chunks
with zero auth markers in the tracked 1.63MB bundle (the s79 finding).
The four drift gates sweep only the nine (app) routes. Nobody had
compared the auth family live since s79 — 32 sessions of our changes
ago. The prediction: a re-walk would catch non-bundle drift. It did,
three times over.

The walk itself needed three extraction iterations before its
evidence was trustworthy: the byTextMatch first-match rule captured
ancestor containers on one side only (the signupTitle artifact —
"our fs=16px fw=400" was a titleStack div, not the h2); the <60
length guard rejected the sent callout's 84-char text outright; and
the first pass lacked the structural recipes (the stacks, the
census). The fixed extractor — deepest match, 160-char guard, the
`parentOf`/`ancestor`/`censusOf` recipe kinds — produced the clean
data, and every remaining candidate was adjudicated against the
authoritative source contracts rather than raw computed strings,
because the raw diff carries four noise families: the oklab-vs-rgba
serialization (Tailwind v4's `color-mix`), the transparent-shadow
prepends, the default-border-color base-layer difference, and the
zinc-vs-neutral inherited foreground (which never renders — every
visible auth text carries an explicit slate class).

The three real finds, each a different axis of drift:

- **D1 — behavioral.** The reference focuses the first code box when
  the verify view mounts. The evidence: a 2px ring computed on box 1
  only (box 6 rests at `none`), at both viewports, across two
  independent walks — the focus-visible heuristic matching a text
  input under programmatic focus. Ours made keyboard users Tab to box
  1 first. The fix is a `[view]`-keyed effect — `codeRefs.current
  [0]?.focus()`, a DOM focus, never setState — and the e2e verify
  test now asserts `toBeFocused()`, an added expect inside the
  EXISTING test() block so the e2e census stays 137.
- **D3 — structural, and the most instructive.** The reference's
  signup rides a FLAT `space-y-4` stack with the h2 as a DIRECT
  child. Ours inherited the reset view's shared `space-y-4
  sm:space-y-6` — because the s21 author wrote the correct
  `LOGIN_SIGNUP_LAYOUT.viewStack = "space-y-4"` const and then never
  wired it: the implementation collapsed all four non-signin views
  onto the reset view's stack. The const sat in the source, correct,
  unconsumed, for 90 sessions — and no gate could see it, because
  every pin reads what renders, and what rendered was the wrong
  stack. +8px at ≥640 in the title→form gap. The fix: the shared
  stack div went view-conditional, the const finally consumed, and
  the inert titleStack wrapper retired so the h2 sits direct like the
  reference's census.
- **D4 — the v3/v4 margin arithmetic again.** The reference's verify
  back→heading gap computes 16px at ≥640: its `-mb-2` collapses with
  the following sibling's v3 space-y mt 24 (24−8=16). Our verify back
  rode flat `mb-2` — 8px at all widths — while the reset view's back
  already carried the correct `mb-2 sm:mb-4` ladder. The re-walk's
  per-child viewStack census reconciled the card heights to the
  pixel: 480 vs 488 at 1440, and after the one-arm fix, 488 = 488.

And the two inert finds — the verify headingStack (`space-y-3
sm:space-y-4` vs the reference's `space-y-2`) and the sentCallout's
missing `[&>svg]` arms — were the trickiest to adjudicate, because
both sides render identically (the tile's own `mb-3 sm:mb-4`
overrides the heading stack's space-y on both apps; no svg ever
renders on the auth surfaces). They were re-pinned for byte parity
with zero rendered effect — the house doctrine: the class strings are
the contract, even when inert.

The reconciliation is the walk's closing proof: after the fixes, the
post-fix cards byte-match the reference at BOTH widths — the signup
470@1440/422@390, the verify 488@1440/412@390 — verified live by the
capture script's geometry envelope (`firstBoxFocused: true`,
docScrollW 390) and read off the pixels by the VLM battery (4/4 × 4,
zero adjudications): "the first of the six code boxes appears
visually focused with a dark border/ring."

The TDD ladder held end to end: RED-1 at 20 failed | 76 passed (96),
all 20 by name, stash-proven at the native 92/92; GREEN at 109 files
/ 1942 with two documented in-flight re-derivations (the `? (`
slice-anchor discriminator for the two s79-era call-site pins, and
the H1 lockstep's layer-axis literals); RED-2 both faces by name —
including the accidental bonus proof that removing the RESET back's
ladder fails the reset pin too. The plan's own predictions were
corrected twice at validation (the +5→+4 arithmetic; the 8-10→20 RED
estimate) — both recorded in the execution record.

The count ladder closed at 109 files / 1942 unit / 137 e2e / badge
2079; the spacey census re-anchored 110 → 108; the PAD login-reset
census row 279 → 291; the F-111a1 wall-clock phrase fixed AND pinned
(the 111-a audit's one real find — the phrase can never re-stale);
and the docs realigned across six files at SKILL v1.108.0.

The ship: the house-style commit `00b10c8` (20 files) through the SSH
wrapper — the fingerprint VERIFIED against the s104-s110 records, the
dry-run clean, the real push verified (remote main @ 00b10c8 == local
HEAD), the operator key shredded after the follow-up push.

Session 111 complete — shipped and pushed to `main`. The login family
is freshly re-walked and byte-verified at both widths; the next
un-walked LIVE family would be the dialog family. Which shall I take
next?
