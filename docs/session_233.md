# Session 233 — Session 112 feat log (the dialog-family LIVE re-walk)

The s111-close's third candidate taken: the DIALOG family — the
largest interactive surface group never walked live at BOTH widths
(the s92 walk was 390-ONLY and 20 sessions of changes ago; the
dialogs' mount-focus behavior — the s111 D1 genus — never measured;
the family spans seven dialogs across six pages). A throwaway walk
script (repo-internal, deleted before ship) drove BOTH apps through
the CREATE-dialog ladder — New Lead · New Account · New Contact ·
Import Contacts · New Event · Log Call · Save Custom Report View —
at 1440×900 + 390×844, our side on the standalone build + a
throwaway walk db, extracting per dialog: the content-box geometry
(w/h/maxW/maxH/overflow/pad/radius/gap/border/bg), the overlay, the
header (align/title/description), the close X, the first field group
(label + control), the footer, the MOUNT-FOCUS state, the child
census, and the document scroll widths — every candidate adjudicated
against the source contracts (`entity-dialogs.tsx`, `ui/dialog.tsx`,
the `DIALOG_FAMILY` in `page-layout.ts`) plus a targeted full-string
re-extraction.

Three walk-script iterations (the s111 three-iteration precedent):
(1) `page.evaluate(STRING)` evaluates the string to a FUNCTION
OBJECT — non-serializable, returns undefined (the ref side read "NO
DATA" while its dialogs were open); (2) the pre-hydration click
swallow on our side (the 900ms settle too short; the retry then
blind-clicked behind the LATE-opened overlay — 30s actionability
hangs; fixed with the xhr-aware settle + short click timeouts + the
late-open round loop); (3) **the D-112a4 find** — our
PERMANENTLY-MOUNTED mobile-nav drawer carries `role="dialog"` with
no data-state: CSS `[role=dialog]` queries match IT first and never
resolve (the real dialog opened while `waitForSelector` hung on the
hidden drawer). `getByRole("dialog")` is safe — Playwright's role
engine excludes hidden elements, which is why the e2e suite never
tripped this. The rule is documented at the source: CSS dialog
selectors must key on `[role="dialog"][data-state="open"]`.

**THE RESULT — the dialog family is in COMPLETE LIVE PARITY**: every
geometry axis PARITY on all 7 dialogs × 2 viewports — the widths
(lead/contact 512 · account/event/activity/savereport 672 · import
448 at 1440; full-bleed 390 at phone), the max-h-[90vh] scroll caps
(contact/event/activity/savereport carry it; lead/account cap-free —
the reference's own inconsistency, mirrored), the pads/radius/gaps,
the header alignment ladders, the titles + description arms, the
close X geometry, the label→control gaps, the footers + submits, the
census structure (`[div,form,button]` + `[div,div,div,button]` for
the formless import/savereport) — AND the mount-focus behavior
IDENTICAL on all seven (the first input on lead/account/event/
savereport · the camera button on contact · the type select trigger
on activity · the Cancel button on import — the dropzone label is
not focusable). The s92 fixes + the s15 pins + 20 sessions of
changes, all verified live at both widths.

The four finds, each a different axis:

- **D-112a1 — the close-X byte-parity re-pin (class-string).** The
  reference's CURRENT stock close carries `ring-offset-background` +
  the two inert `data-[state=open]:bg-accent
  data-[state=open]:text-muted-foreground` arms and NOT
  `disabled:opacity-70`; our s15-era string predates the reference's
  shadcn bump (the bundle itself STABLE — the 83rd consecutive; the
  s15 extraction recorded the then-current form). The two inert arms
  gained (the Radix DialogClose never carries a data-state — inert on
  both apps, the s111 D2/D5 genus: the class strings are the
  contract, even when inert) + `disabled:opacity-70` retired.
  `ring-offset-background` is the COMPUTED-CONTRACT EXCEPTION,
  deliberately absent: the reference's focused-close ring offset
  computes `hsl(0 0% 100%)` = `#fff`; ours computes `#fff` (the v4
  default); the class would set `var(--color-background)` =
  `#f9fafb` — introducing the very divergence it would pin away (the
  s11 computed-gap rule).
- **D-112a2 — the camera aria-label superset pin (a11y).** The
  reference's icon-only camera button is UNNAMED (its own a11y
  defect — the mobile-nav genus); ours carries
  `aria-label="Upload photo"`, everything else on the button
  byte-matching. The superset was correct but UNPINNED — now frozen.
- **D-112a3 — the six mount-focus e2e freezes (behavioral).** The
  dialog focus landing pinned on all the walked dialogs — added
  expects INSIDE existing test() blocks (the s111 D1 precedent; the
  e2e census stays 137): the first input on lead/event, the camera
  on contact, the combobox on activity, the Cancel on import, the
  placeholder input on savereport, plus the lead phone test's input.
  Behavioral parity no class-string pin can see.
- **D-112a4 — the role=dialog shadowing rule (tooling).** Documented
  at the mobile-nav source (the comment) — the permanently-mounted
  drawer shadows CSS `[role=dialog]` queries; key on the open-state
  attribute or use getByRole.

The noise families adjudicated away (each against the source
contracts): the oklab/rgba overlay serialization (v4 `color-mix`);
the transparent-shadow prepends (the focused-input ring
COMPUTED-EQUAL — the identical visible 1px `#0a0a0a` ring +
`shadow-sm` on both apps, LIVE-measured full strings); the labelMb
8px-vs-0 v3/v4 space-y mechanism flip (the visual gap pinned-equal
via `controlMt` since s14/s92); and the `border-input` vs
`border-line` + the activity trigger's `w-full` ordering (the s86
computed-equal mechanism notes).

The TDD ladder held end to end: **RED-1 at 16 failed | 230 passed
(246)** — the 14 docs-counts count-axis its + the dialog-geometry
CLAUDE lockstep + the close-X it, all enumerated by name (the camera
it a freeze pin passing at staging, the s103 seeded-charts
precedent); the plan predicted 12-16. Stash-proven: the four staged
files stashed → the native **244/244** → pop → 16 RED re-confirmed
(244 + the 2 new its = 246 exact). **GREEN at 109 files / 1944 ALL
PASSING** with one documented in-flight correction (the census
literals — the plan's 1543/212 drafts vs the actual 1548/215; the
comments ran longer than drafted). **RED-2 both faces by name**:
(A) the `data-[state=open]:bg-accent` arm removed → the close-X it
FAILED by name; (B) the camera `aria-label` removed → the camera it
FAILED by name; both restored → full GREEN.

The count ladder: UNIT 1942 → 1944 (+2) · SUITES 109 UNCHANGED ·
E2E 137 UNCHANGED · badge 2079 → 2081 · the page-layout census rows
1530 → 1548 + 182 → 183 checks · the mobile-nav census row 206 → 215
(both LIVE-CENSUS re-anchored at the same edits).

**GATE (stepwise):** lint 0/0 · tsc 0 · 1944/1944 unit [109 suites]
· build · **137/137 e2e (3.2m, zero flakes — the six new focus
expects green live on their first run)** · the four drift sweeps
CLEAN (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each
--fail-on-drift — NO re-baselining: the class-string re-pin is
render-inert by design) · the closing census MATCH (15/24/10/23/12
+ 4 users).

The captures 176–179 (the standing build + a scratch db, the live
geometry envelope byte-matching the walk: 512/640 · 390/676 ·
512/810 + camera-focus · 390/646): the VLM battery 4/4 × 4 with ONE
adjudication (the 179 Title-input focus ring — too subtle at 1x;
the 3x-zoomed re-read confirmed the darker/heavier border). The VLM
independently read the focused Name input's dark ring off 176, the
full-bleed centered phone face off 177, and the camera button's
BLUE focus ring off 178 — the D-112a3 evidence, off the pixels.

Docs realigned: SKILL v1.109.0 [frontmatter + the H1 + project_state
— the s112 layer prepended + §16cz + Appendix B + the §5.6 phrase +
the mobile-nav line count] · README badge 2081 + the Tested row's
s112 clause · AGENTS/CLAUDE/PAD at 1944+137 [the AGENTS §Session-112
history block + the PAD s112 inventory row + the module-table rows]
+ this session log + the s112 plan + its execution record + the
worklog.
