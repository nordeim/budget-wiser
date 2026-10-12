I'll continue with the multi-phase neo-crm remediation task. The
workspace carried over — `git pull` brought in `e131326`
(session_228.md, the s110 close-out summary). This run is **Session
111** (session_225/226/227/228 all taken by the s110 records).

The core docs re-absorbed (AGENTS head + the §Session-110 tail, CLAUDE
full, README, the PAD count sites, the SKILL v1.107.0 project_state),
the session docs read (session_227 narration + session_228 close-out +
the s110 plan + its execution record + the worklogs), the skills
catalog re-checked (218 skills), scandihaven re-verified (d4789c3,
on-pattern). The environment standing: the 3-var `.env` contract,
`db/` at the root, deps + chromium, tree clean at `e131326`. The
stray `DATABASE_URL` hazard re-confirmed — all ops under
`env -u DATABASE_URL`.

**The baseline gate stepwise**: lint 0/0 · tsc 0 · 109 files / 1938
unit · build · 137/137 e2e fresh CI=1 (3.2m, zero flakes) — exactly
the s110 ship state.

**The audits dispatched in parallel** (the house pattern):

- **111-a** (the s110 ship delta): GENUINE 9/9 — the seam + the route
  slim + the NEW suite + the four re-anchors + the count ladder + the
  captures 170/171 + the docs realignment, all verified
  hunk-by-hunk; the non-vacuousness reproduced EXACT (the mixed state
  19 failed | 97 passed (116), all 19 by name; the native 112/112;
  HEAD 109/1938). **ONE REAL FINDING F-111a1**: the SKILL Appendix B
  wall-clock prose line still read "108 suites" — stale vs the live
  109, internally inconsistent with the unit-total row two lines
  above; no pin covered the phrase.
- **111-b** (the standing layers): 9/9 PASS zero real findings (~68th)
  — the SEO/sitemap 46/46 LIVE first-run + 5/5 supplements; the drawer
  battery 10/10 exit 0 at TRUE 390×844; design-tokens 15/15; the
  vocabulary 6/6; both operator decisions standing (~71st).

**The live verification**: probe:ref STABLE the **82nd** (the bundle
md5 exact; demo zero; desktop 256px/8; the mobile-nav defect STANDS
the **32nd** — the reference's own bug, our drawer the superset). The
four drift gates CLEAN; the closing census MATCH.

**The rotation (111-c)**: the s110-close suggested next #3 — the
first LIVE parity re-walk of a surface family since s79, taken at the
LOGIN family: the one surface the standing probes cannot see
(probe:ref tracks only the POST-LOGIN bundle — the pre-auth shell
rides different rolldown chunks; the four drift gates sweep only the
nine (app) routes; the last live walk was s79 — 32 sessions of our
changes since). This is exactly the non-bundle drift the s110-close
predicted a re-walk would catch.

**The ANALYZE**: a throwaway walk script (repo-internal, deleted
before ship) drove BOTH apps — the live reference and our dev server
on a throwaway walk db — through the full auth view ladder (signin,
the failed-login callout, reset, sent, signup with a real POST
through to verify) at 1440×900 + 390×844, extracting computed styles
per element + a per-child viewStack census; three extraction
iterations (the byTextMatch first-match depth bug; the <60 length
guard; the missing structural recipes); every candidate adjudicated
against the authoritative source contracts.

**The five finds — three real + two inert:**

- **D1 (behavioral, verify)**: the reference AUTO-FOCUSES the first
  code box on verify mount — live-measured as the 2px ring on box 1
  only (box 6 rests at none), reproduced twice at both viewports.
- **D3 (structural, signup)**: the reference's signup rides a FLAT
  `space-y-4` stack with the h2 as a DIRECT child; ours inherited the
  reset view's shared `space-y-4 sm:space-y-6` — the s21-authored
  `LOGIN_SIGNUP_LAYOUT.viewStack` const was correct but NEVER WIRED
  (+8px at ≥640; the signup card 478 vs 470 @1440, equal @390).
- **D4 (structural, verify)**: the reference's verify back→heading gap
  computes 16 at ≥640 (its `-mb-2` collapses with the v3 mt 24); our
  verify back rode flat `mb-2` (the reset view's back already had the
  ladder; the verify card 480 vs 488 @1440, equal @390).
- **D2 (inert, verify)** + **D5 (inert, sent)**: the verify
  headingStack (`text-center space-y-3 sm:space-y-4` vs the
  reference's `text-center space-y-2` — the tile's own `mb-3 sm:mb-4`
  always overrides the stack's space-y on both apps, the heading
  heights 168/144 identical) + the sentCallout's `[&>svg]` arm family
  — re-pinned for byte parity, zero rendered effect.

**The plan written + validated** (two corrections documented: the
count arithmetic +5→+4 [1942/2079, the D4/D5 land as in-place
re-anchors]; the RED estimate 8-10→20 [the docs-counts axis is 13 its
alone]) — then **RED-1**: the four new its + the D4/D5 re-anchors +
the count ladder + the F-111a1 wall-clock pin → **20 failed | 76
passed (96)**, all 20 by name, stash-proven (the five files → the
native **92/92** → pop → 20 RED).

**GREEN**: the src fixes (login-reset ×3 in-string: the sm:mb-4 arm +
the headingStack space-y-2 + the sentCallout svg arms; login-card ×3:
the view-conditional stack + the wrapper retirement + the focus
effect) + the full doc realignment → **109 files / 1942 ALL PASSING**
(+4 net). Two in-flight fixes documented: the two s79-era call-site
pins' slice anchors re-derived with the `? (` discriminator (the D1
effect + the D3a conditional introduced earlier `view ===`
occurrences), and the H1 lockstep's layer-axis literals advanced. The
spacey census re-anchored 110 → 108 (LIVE-verified 18 files / 108).

**RED-2 both faces**: the `sm:mb-4` removal → the D4 it FAILED by
name (an accidental first occurrence also proved the RESET back's
pin); the wrapper re-add → the D3b it FAILED by name; both restored →
GREEN.

The e2e: **137/137 (3.1m)** — the D1-strengthened verify test green
live (`toBeFocused()` passing in the real browser).

**The captures**: the standing build on PORT 3131 + a scratch db
(deleted after). The live geometry envelope: the signup card **422**
+ the verify card **412** + docScrollW 390 + **firstBoxFocused: true**
at 390 — the D1 focus-entry verified live on our app. **172/173**
(the verify view @1440/@390) + **174/175** (the signup view @1440/@390).
**The VLM battery 4/4 × 4, zero adjudications** — the VLM
independently read the focus ring on box 1 off both verify captures
("the first of the six code boxes appears visually focused with a
dark border/ring") + the full containment at 390.

**GATE stepwise**: lint 0/0 · tsc 0 · 1942/1942 · build · 137/137 e2e
· the four drift sweeps CLEAN (the auth pages' in-place swaps are not
in the sweep page loads; the login PAGE sweep is the signin view —
untouched; no re-baselining) · the closing census MATCH.

The ship: the house-style commit `00b10c8` (20 files) → the operator
key 0600 outside the repo, the fingerprint VERIFIED
(SHA256:3ddaNlFhMz1JXiGEDgVEaRsUzI4Ev0IpGEEB7NnU4PU — matches the
s104-s110 records) → the dry-run clean → **the real push: remote
main @ 00b10c8 == local HEAD, verified**. This summary (session_230)
+ the narration follow-up (session_231) + the operator-key shred
complete the session.

**Session 111 SHIPPED AND PUSHED to `main`** — the login family
re-walked LIVE for the first time since s79: the reference's verify
focus-entry restored, the signup's flat stack wired (the s21 const
finally consumed), the verify back's ladder corrected, and the two
inert divergences re-pinned byte-exact; the count ladder at 109 files
/ 1942 unit / 137 e2e / badge 2079; the post-fix cards byte-match the
reference at both widths (the signup 470@1440/422@390, the verify
488@1440/412@390).

**Suggested next (session 112):** the probe `--expect` mode (the
remaining s110-close candidate), the §16 chronicle count-axis
adjudication (the N-111a1 carry-forward), or a fresh genus — the next
un-walked LIVE family would be the dialog family (the entity dialogs'
computed styles vs the reference). Which shall I take?
