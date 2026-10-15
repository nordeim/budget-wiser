# Session 127 — the dialog-family second-cycle re-check + the two-fix session

The 127-c rotation — the session_270/271 close's named direction: **the
second rotation cycle continues — dialogs s112 and menus s113 the
stalest re-checks**, dialogs taken (15 sessions back; the create-dialog
core FROZEN since s92 — entity-dialogs.tsx untouched, entity-edit-dialog
since s91, ui/dialog.tsx since s71 — but the LENSES sharpened since:
the F-126c1 TEXT-CONTENT census, the F-119c2/F-125c1 token-ride census
on every input surface, the L-123c6 scrollHeight census).

## The walk design

The s115-s126 idiom, PHASED (the sandbox reaps background processes at
command end + the 10-min tool cap): the walk script OUTSIDE the repo
(`/home/z/my-project/walks/walk18-dialogs-recheck.ts`), one
app×viewport per invocation, censuses to /tmp JSON, the reference's
auth state persisted + reused (one login total), PORT 3141, the walk
db a SEEDED copy. Both apps at 1440×900 + 390×844 through the s112
CREATE-dialog ladder (New Lead · New Account · New Contact · Import
Contacts · New Event · Log Activity [the Log Call quick-log preset] ·
Save Custom Report View), the JS-click fallback for the reference's
own contacts-header 390 overflow (its phone-defect family — Import at
x=407, New Contact at x=477 in a 390px frame).

## The walk as executed: 1154 axes, 8 raw diffs → 2 REAL defects

1. **F-127c1 THE CONTACT-DIALOG PLACEHOLDER FAMILY (real, 4 fields)**:
   the reference's Create New Contact ships placeholders on
   Email/Phone/Company/Position — `john@company.com` ·
   `+1 (555) 000-0000` · `Acme Inc.` · `Sales Manager` — where ours
   ships none (the Name field's `John Doe` matches on both). The
   s15-era "no invented placeholders" pin allows exactly six
   placeholders repo-wide (the s30 John Doe + the five s76
   bundle-decode additions) — the bundle decode MISSED these four
   (the F-126c1 genus: the DOM text verbatim, not the decoded bundle,
   is the ground truth; never censused before on this surface).
2. **F-127c2 THE IMPORT-SUBMIT COLOR (real)**: the Import Contacts
   dialog's submit computes `rgb(37,99,235)` (blue-600, the default
   Button variant) on ours vs the reference's `rgb(23,23,23)` (the
   bg-neutral-900 DIALOG_SUBMIT family its entity siblings ride).
   Never censused before (the s26 footer pin covers copy + gating,
   not the color class; the s123 BLACK-pair fix covered the
   Save-report dialog, not the import).

The adjudicated noise (record-only): **L-127c3** the contact dialog's
absolute-button radius `3.35544e+07px` vs `9999px` (the L-121c1
rounded-full genus — the walk's own normRadius misses the scientific
notation; the census element is cross-app-consistent) · **L-127c4**
the camera `aria-label="Upload photo"` superset (the D-112a2 a11y
doctrine — ours the named superset over the reference's unnamed
icon-only button, pinned since s112).

**The byte-equal contracts confirmed** (the s112 byte-matches ALL
HOLD): the content rects on all 7 dialogs × 2 viewports · the overlay
black/80 · the titles' text/font/color/tracking/align · the close X ·
THE FULL TEXT CENSUS on 6/7 dialogs (every label, button, dropzone
line, columns box line verbatim — the F-126c1 lens; the contact dialog
differs only on the placeholder family) · every input's computed
bg/border/color/font/rect (the F-125c1 lens — the dialog inputs ride
bg-transparent, CLEAN) · the combobox triggers · the footer buttons on
6/7 dialogs · the tinted boxes (the import dropzone + gray-50 columns
box + the savereport blue-50 summary) · THE SCROLL CENSUS
(scrollHeight/clientHeight on all 7 — the L-123c6 genus CLEAN on the
dialog family) · the MOUNT-FOCUS tags on all 7 (the D-112a3 freezes
hold) · THE TRIGGER CENSUS (the blue CREATE primaries' text color —
the F-119c2 #fafafa carrier computes EQUAL live, the s119 fix
live-confirmed on the dialog surface).

## The remediation (the two-fix session)

- **D-127a0**: THE CONTACT PLACEHOLDER FIX (entity-dialogs.tsx ×4 —
  `placeholder="john@company.com"` on ct-email, `placeholder="+1 (555)
  000-0000"` on ct-phone, `placeholder="Acme Inc."` on ct-company,
  `placeholder="Sales Manager"` on ct-position).
- **D-127a1**: THE IMPORT-SUBMIT NEUTRAL FIX (contacts-page.tsx — the
  Import button gains `className={DIALOG_SUBMIT.button}` + the
  DIALOG_SUBMIT import; the reference's own dark neutral, the family
  its entity siblings ride).
- **D-127a2**: THE PINS (RED-first: the page-layout placeholder pin
  re-anchored six → TEN in place; +1 it in import-dialog.test.ts — the
  Import submit carries the DIALOG_SUBMIT family).
- **D-127a3**: the POST-FIX walk re-run (the two defects byte-equal,
  zero new diffs) + the captures 236-239 + the VLM battery.
- **D-127a4**: the docs realignment + the session records.

## The verification ladder

RED-first (the placeholder pin REDs on the 6-list; the submit pin REDs
on the bare Button) → the two fixes → GREEN → the stash-proofs (each
fix reverted alone → its pin REDs alone) → the full suite → the final
gate (lint 0/0 · tsc 0 · unit · build · e2e 137/137 · the closing
drift sweep · census MATCH) → the POST-FIX walk re-run → the captures
+ the VLM battery → the commit + the SSH-wrapper push.

## The count ladder (as planned)

UNIT 2003 → 2004 (+1 it in import-dialog — the placeholder pin is an
in-place re-anchor); SUITES 110 UNCHANGED; E2E 137 UNCHANGED; badge
2140 → 2141.

## The walk-harness lessons (record-only)

- **L-127c5** the sandbox process-reaping: background processes die at
  Bash-command end AND the 10-min tool cap bounds one invocation —
  long walks must run PHASED (one app×viewport per invocation, the
  censuses persisted to /tmp JSON, the reference's storageState
  persisted + reused — which also conserves its login rate limit).
- **L-127c6** the reference's contacts-header 390 overflow: its action
  row (Export CSV · Scan Card · Import · New Contact) lays out
  nowrap — Import at x=407 and New Contact at x=477 sit OFF-SCREEN in
  a 390px frame; the Playwright actionability click hangs — the
  JS-click fallback (el.click()) drives the census (the reference's
  own phone-defect family, the fix-over-defect doctrine; our header
  wraps — the e2e zero-overflow proof).
- **L-127c3** the normRadius scientific notation: `3.35544e+07px`
  defeats the `^([\d.]+)px$` regex — the L-121c1 genus must
  parseFloat, not regex.

## The execution record (as shipped)

- **D-127a0 shipped**: the 4 placeholders on the ContactForm fields
  (ct-email/ct-phone/ct-company/ct-position).
- **D-127a1 shipped**: the Import submit + DIALOG_SUBMIT (the
  className + the import line).
- **D-127a2 shipped**: the placeholder pin ten-list + the
  import-submit it (RED-first verified).
- **D-127a3 shipped**: the POST-FIX walk re-run — F-127c1/F-127c2
  byte-equal, the residual 4 adjudicated diffs only (the L-127c3
  radius pair + the L-127c4 aria pair — ZERO real defects); the
  captures 236-239; the VLM battery 4/4 × 4 CLEAN.
- **The count ladder as shipped**: UNIT 2003→2004 · SUITES 110
  UNCHANGED · E2E 137 UNCHANGED · badge 2140→2141.
- **The gate**: lint 0/0 · tsc 0 · 110/2004 · build · 137/137 · the
  closing drift sweep CLEAN on all four gates · census MATCH.
