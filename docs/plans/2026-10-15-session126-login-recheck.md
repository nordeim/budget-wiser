# Session 126 — the login-family second-cycle re-check + the three-fix session

The 126-c rotation — the session_269 close's named direction: **the
second rotation cycle begins — re-checks of the earlier walks (login
s111, dialogs s112, menus s113 the stalest)**. The login family chosen
(the stalest, 15 sessions back; the source FROZEN since s111 but the
LENSES sharpened since: the F-119c2/F-125c1 inverted-token genus, the
L-123c6 scrollHeight census, the live timings).

## The walk design

The s115-s125 idiom: the walk script OUTSIDE the repo
(`/home/z/my-project/walks/walk17-login-recheck.ts`), PORT 3141, the
walk db a SEEDED copy (the authed-visitor check needs the demo user),
both apps at 1440×900 + 390×844 through the five-view ladder (signin →
reset → sent → signup → verify) with computed-style + text censuses,
the wrong-password callout (1 attempt), the mismatch guard, the
wrong-code rung (1 attempt), the authed-visitor card service (S23-P2),
and PASS 2 ours-only (the info-callout auto-dismiss timing + the db
round-trip).

## The walk as executed: 330 axes, 24 raw diffs → 3 REAL defects

1. **F-126c1 THE APOSTROPHE GENUS (real, 4 source sites)**: ours ships
   typographic `’` (`&rsquo;`) where the reference ships straight ASCII
   `'` — live-confirmed on three censused sites (the reset description
   "we'll", the sent view "We've", the verify email line "We've") + the
   fourth source site (the resend line "Didn't"). Never text-pinned
   before (the e2e assertions rode OUR curly forms — the reference's
   DOM never compared).
2. **F-126c2 THE AUTH-INPUT TEXT COLOR (real, 5 censused sites)**: the
   signin/reset/signup inputs compute `rgb(15,23,42)` on ours (the
   s7-era `text-slate-900`) vs `rgb(9,9,11)` on the reference (its own
   zinc-950-ish ink). Never censused before (the s79/s111 lenses
   measured fonts/rings/rects, not the typed-text color).
3. **F-126c3 THE CODE-INPUT BG (real, the F-125c1 genus on the login
   surface)**: the verify code inputs ride `bg-background` — ours
   resolves to the page-bg `#f9fafb` (rgb 249,250,251) vs the
   reference's stock white (rgb 255,255,255). The exact F-125c1
   inverted-token genus, invisible to every prior gate (the login
   surface is PRE-AUTH: invisible to probe:ref's post-login bundle AND
   to the drift gates' authenticated screenshots).

The adjudicated noise (record-only): **L-126c4** the code inputs'
aria-label superset (ours "Digit N" over the reference's unnamed
inputs — the L-124c1 a11y doctrine genus, fixed in ours, never
reverted) · **L-126c5** the body-bg invisible axis (ours #f9fafb vs
the reference's white — the F-119c2 token semantics under a
full-cover gradient wrapper, never visible) · **L-126c6** the 1-unit
ring/ink residue (ours #0a0a0a vs the reference's #09090b on the
code-input family — within the standing fuzzy-2 tolerance, the
reference's own explicit zinc-950 construction).

**The byte-equal contracts confirmed** (the s111 byte-matches all
HOLD): the card chrome (rect/radius/bg-white-95/shadow/blur) · the
accent strip · the logo circle · the title/subtitle · the Google
button · the or-divider · the labels (inline) · the inputs' rects/
fonts/borders/bg-slate-50-50/placeholders/icons · the submits · the
footer links · the reset/sent/signup/verify views' full censuses (the
card heights 470/422 · 488/412 byte-equal at both widths) · the
mismatch guard · the wrong-code rung · the error callout (bg/border/
text after the oklab normalization) · the sent callout · the
containment (doc scrollH/W both apps both widths) · THE AUTHED-VISITOR
CARD SERVICE (S23-P2 first two-app live confirmation) · PASS 2: the
info-callout dismiss ~3.4s + the db round-trip (4 seeded + 3 walk
signups = 7 users in the walk db).

## The remediation (the three-fix session)

- **D-126a0**: THE APOSTROPHE FIX (login-card.tsx ×4 — `&rsquo;` →
  `'`; the 3 e2e assertions updated in place, the s123 BOM precedent).
- **D-126a1**: THE AUTH-INPUT TEXT-COLOR FIX (retire `text-slate-900`
  from the 3 INPUT records — LOGIN_LAYOUT.input, LOGIN_RESET_LAYOUT.
  input, LOGIN_SIGNUP_LAYOUT.input — the inputs inherit our
  --color-foreground #0a0a0a, within the standing fuzzy-2 tolerance of
  the reference's computed ink; the TITLES keep text-slate-900 — the
  reference's own titles ARE slate-900, live-confirmed).
- **D-126a2**: THE CODE-INPUT BG FIX (login-card.tsx — `bg-background`
  → `bg-white`, the D-125a0 F-119c2 literal doctrine; byte-equal
  post-fix).
- **D-126a3**: THE PINS (RED-first, +3 its in login-family-parity —
  the apostrophe pin [the 4 straight literals + the zero-rsquo
  negative] + the input-record pin [the 3 records carry no
  text-slate-900] + the code-input re-anchor [bg-white + the
  not-bg-background negative, the D-125a1 doctrine]).
- **D-126a4**: the docs realignment + the captures 232-235 + the
  session records.

## The verification ladder

RED-first (the 3 pins against the standing source) → the three fixes →
GREEN → the stash-proofs (each src change reverted alone → its pin
REDs alone) → the full suite → the final gate (lint 0/0 · tsc 0 · unit
· build · e2e 137/137 · the closing drift sweep · census MATCH) → the
POST-FIX walk re-run (the three defects byte-equal/fuzzy-clean, zero
new diffs) → the captures + the VLM battery → the commit + the
SSH-wrapper push.

## The count ladder (as planned)

UNIT 2000 → 2003 (+3, all in EXISTING files — login-family-parity);
SUITES 110 UNCHANGED; E2E 137 UNCHANGED (3 assertions updated in
place); badge 2137 → 2140.

## The walk-harness lessons (record-only)

- **L-126c7** the pydantic reserved-TLD rejection: the reference's
  signup rejects `.test` emails ("special-use or reserved name") —
  walk emails must use plausible domains.
- **L-126c8** the oklab inverse: the cube goes AFTER the linear
  transform (the inverse yields cube-rooted LMS coords — cubing first
  produced phantom 5-unit color diffs that masqueraded as defects).
- **L-126c9** the via-stop 50% serialization: v4 serializes the
  explicit `50%`, v3 omits it — normalize in gradient compares.
- **L-126c10** the zero-extent shadow layers: drop any
  `0px 0px 0px 0px` layer regardless of color (the reference's own v3
  serialization carries a dead white one).

## The execution record (as shipped)

- **D-126a0 shipped**: the 4 apostrophe sites straightened in
  login-card.tsx + the 3 e2e assertions updated in place
  (auth.spec.ts :53/:75/:150, the s123 BOM precedent).
- **D-126a1 shipped**: `text-slate-900` retired from the 3 INPUT
  records (LOGIN_LAYOUT.input in page-layout.ts; LOGIN_RESET_LAYOUT.
  resetInput + LOGIN_SIGNUP_LAYOUT.input in login-reset.ts) — the
  typed ink inherits `--color-foreground` `#0a0a0a`.
- **D-126a2 shipped**: the code input `bg-background` → `bg-white`
  in login-card.tsx (the D-125a0 literal doctrine).
- **D-126a3 shipped**: the 3 RED-first pins in
  login-family-parity.test.ts (the apostrophe pin + the input-record
  pin + the code-input pin) + the s79 code-arm pin re-anchored in
  place (the D-125a1 doctrine).
- **The stash-proofs**: the apostrophe revert → its pin REDs alone;
  the bg revert → both bg pins RED (the expected pair); the
  input-record revert → its pin REDs alone.
- **The POST-FIX walk re-run**: 4 adjudicated diffs ONLY (body-bg ×2
  + aria-label ×2) — ZERO real defects; the three fixes
  live-verified.
- **The count ladder as shipped**: UNIT 2000→2003 (+3, all in
  EXISTING files) · SUITES 110 UNCHANGED · E2E 137 UNCHANGED ·
  badge 2137→2140.
- **The gate**: lint 0/0 · tsc 0 · 110/2003 · build · 137/137 (the
  S72-P2 first-run flake clean on the re-run) · the closing drift
  sweep CLEAN on all four gates · census MATCH.
