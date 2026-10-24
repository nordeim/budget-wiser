# The session-181 plan — THE DIALOG-SURFACE FOCUS-STATE INTERIOR WALK (walk54)

Date: 2026-10-24 · Rotation: 181 ·
Task: audit + validate the shipped session-180 state (commit `e4e39ef` +
the owner's transcript commits `b8e740d`/`c4a5c4e` + the merge `144f2dd` —
the session_383 transcript is this round's rotation trigger), then
execute the remaining-unwalked-interior round the s380 close names next,
plus the round-specific operator asks (env/db placement re-verification ·
the vitest/playwright config standing check · the sitemap/SEO
re-verification · the mobile-nav two-app comparison · the `.env.example`
inclusion · the dev-server captures), TDD-first, align every doc, push
to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication)

The baseline gate at the shipped s180 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2750** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run) · probe:ref STABLE
(`46bc2d9c`) · the mobile drawer battery GREEN at 390×844 (all stages:
trigger · OPEN focus-trap + dual scroll lock · NAV-CLOSE · ESC-CLOSE ·
REOPEN-BEFORE-GROW · RESIZE-PAST-MD release) · the desktop + phone
drift sweeps CLEAN · db census MATCH (15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`) · sitemap 11 routes + robots + manifest 200
(smoke check 12) · the Tailwind v4 state clean (the postcss plugin ·
CSS-first `@theme` · the vendored tw-animate).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s380 close's remaining named candidate: the dialog-surface focus
faces (the s379 close's own third arm) — walk53 consumed the
dropdown/select OPEN arm, walk54 takes the dialog family's focus
interior.** No round ever ran the walk50-form two-app computed ledger
over a dialog's FOCUS faces: s112 walked the family's GEOMETRY + the
mount-focus census (its own ladder — 7 dialogs × 2 viewports, the
content-box axes), s172 walked the named-controls (the a11y
aria-label/labels-or-aria layer), the e2e battery pins OUR behavior
(the mount-focus assertions + the geometry at phone) — but the
focus-visible faces of the dialog's interactive controls under a REAL
keyboard Tab drive (the walk51 form), the Tab-chain census stop-by-stop,
and the Tab-wrap focus-trap cycle were never walked element-against-
element on both apps.

## WP-1 — The walk tool

`scripts/discover-181.ts` (the throwaway discovery probe): locate the
New Lead trigger on both apps' `/leads` (`button` "New Lead"), open the
dialog, dump the OPEN dialog's focusable inventory (the button/input/
combobox census in DOM order) + the mount-focus state — the calibration
the walk's locators stand on.

`scripts/walk54-dialog-focus-interior.ts` (the walk50 ledger form, the
focus-interior doctrine): the two-app element ledger of the New Lead
dialog's OPEN + FOCUS states at BOTH axes (1440×900 + 390×844 — the
family's full-bleed phone form is the s15/s112-pinned geometry):

- **Phase A — the OPEN dialog spine + faces**: open the New Lead
  dialog on both apps; dump the DFS element ledger of
  `[role="dialog"][data-state="open"]` (the D-112a4 rule — our
  permanently-mounted mobile-nav drawer carries `role="dialog"` with
  no data-state; CSS `[role=dialog]` selectors MUST key on
  `data-state="open"`); read the computed faces (the walk53 Face
  probe: bg · color · border · boxShadow · radius · outline · weight)
  of the overlay, the content, the title, the close X, the first
  input (RESTING), the footer's Cancel + submit (RESTING).
- **Phase B — the REAL keyboard Tab drive**: from the mount-focused
  first input (the s112-decoded D1 genus — Radix focuses the first
  focusable), Tab through the dialog's focusable chain stop-by-stop;
  at each stop census the FOCUSED control's computed face (the
  effective-layer ring/outline form — focus-visible fires only under
  REAL keyboard focus, which no sweep drives) + the activeElement
  identity; drive Tab past the LAST focusable (the close X) to the
  wrap (the Radix focus-trap cycle — the first focusable regains
  focus); census the mount-focused input's own ring face (the
  programmatic-focus question: whether Radix's mount focus() paints
  the ring — the maiden pass's own decode).

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db — both apps compared in their DEFAULT
data states per the s179 DATA-STATE genus discipline; the dialog is
app-borne, never data-borne, so the OPEN interior is data-state-
independent).

## WP-2 — The decode

Every delta root-caused against the standing genus register (F-129c1
ring-offset-background retirement · the token-selection genus · the
class-order genus · the outline VERSION FORM (s178) + its s180
alpha-color carrier sub-form · the box-shadow slot-count genus · the
shadow-sm rename family · the space-y margin-BOTTOM family · the React
useId format genus · lucide's aria-hidden genus) + the kept-superset
register (our aria-labels the reference's own surfaces lack · our
focus-visible rings). Target: ZERO live defects, every delta a
documented genus or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178/s179/s180 continuation), all in the existing page-layout suite
(the ADR-017 one-suite doctrine) — the pin survey FIRST (the s180
lesson: the s113 fragment pins found, the full-string upgrades the
genuine gaps):

1. the walk54 decode freeze (the tool's own contract — the two-app
   dialog focus ledger + the REAL keyboard Tab drive + the
   `[role="dialog"][data-state="open"]` root rule + the both-axes
   form);
2. the DIALOG_CONTENT.base FULL-string freeze (the s179 FULL-string
   precedent over the s15 fragment pins — any token swap, class-order
   drift, or animation-arm change REDs here);
3. the DIALOG_CLOSE FULL-string freeze (the focus-ring carrier — the
   walk's own focus face, over the s15/s112 fragment pins);
4. any NEW decode knowledge the maiden pass surfaces (born-green over
   the zero-defect decode, or honest-RED-first over a live find).

## WP-4 — Proofs

MUTATION-PROOF (a planted class-string regression on a walked contract
→ exactly 1 RED → restored → GREEN) · STASH-PROOF (the round's test
block stashed alone → exactly 138/2750 → restored → 138/2750+N) · the
walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2750 → 2750+N (the walk54 pins) · badge 2942 → 2942+N
(count-ladder-181.py: the house assert-first idempotent form) · the
collateral re-anchors (the SKILL §5.6 census checks 226 → 226+N · the
F-106a1 layer-axis pin — the s181 layer live, the s180 layer demoted
beneath it at 2750/192) · the docs lockstep (the AGENTS Session-181
section · the PAD session-181 inventory row · the CLAUDE page-layout
bullet's walk54 tail · the README Tested row's walk54 clause + the
badge · the SKILL **v1.178.0** + the s181 head layer
[skill-head-181.py, idempotent] · session_384.md + this plan's
execution record + the worklog entry [Task ID 181]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref FOCUS-state
  faces (the focused dialog input under REAL keyboard focus + the
  focused footer button — the ring's own face) + the standard
  dev-server page set re-capture for the operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: the 200s · the
  11 routes + the robots Sitemap line + the per-route OG/Twitter
  factory).
- The mobile-nav comparison: the drawer battery + probe:ref + the
  walk50 spine carry the verdict (ours the Radix Sheet superset, the
  reference's own menu button STANDING at TRUE-390) — documented in
  the session record.

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2750 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING + drawer battery GREEN |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-24, session-181)

- **The audit GREEN** — the baseline gate at the shipped s180 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2750 · build · smoke 14/14 ·
  e2e 192/192 (clean first run) · probe:ref STABLE (46bc2d9c) · the
  drawer battery GREEN (all stages: trigger · OPEN focus-trap + dual
  scroll lock · NAV-CLOSE · ESC-CLOSE · REOPEN-BEFORE-GROW ·
  RESIZE-PAST-MD release) · the desktop + phone sweeps CLEAN · census
  MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes + robots +
  manifest 200 · the Tailwind v4 state clean · the operator's standing
  asks verified (env/db placement · the vitest/playwright configs ·
  sitemap/SEO · mobile-nav · `.env.example`).
- **WP-1 GREEN** — `scripts/discover-181.ts` (the discovery probe:
  the New Lead trigger count 1 at byte-equal geometry on both apps;
  the OPEN dialog's 12-row focusable inventory at IDENTICAL boxes;
  the mount-focus on the first input with :focus-visible TRUE on both
  — the programmatic-focus question answered at calibration) then
  `scripts/walk54-dialog-focus-interior.ts` (the walk50 ledger form,
  both phases at both axes; one locator calibration mid-maiden — the
  overlay probe: [data-radix-dialog-overlay] matches nothing on
  either app, the portal mounts overlay + content as BODY-level
  siblings, the selector re-keyed on
  [data-state="open"]:not([role="dialog"])).
- **WP-2 GREEN** — the decode COMPLETE: ZERO LIVE DEFECTS. The
  51-row spine byte-equal on both axes (identical tag census, ZERO
  box deltas; 39 rows byte-equal outright, the 12 divergent rows all
  documented genera); the Tab chain position-identical on every stop
  + the WRAP to the first input on both apps; every VISIBLE focus
  face byte-equal (the input ring · the select-trigger ring · the
  Cancel ring · the submit ring + shadow pair · the close X's DOUBLE
  ring). Every delta a documented genus: the outline VERSION FORM +
  alpha-color sub-form · the box-shadow slot-count · the v4
  color-serialization (oklab/rgba on the overlay) · the
  token-selection · the class-order · the space-y margin-BOTTOM
  family · the s133 placeholderState retirement · the F-129c1
  ring-offset retirement · the id-name superset · the aria-label
  supersets · the useId format · lucide's aria-hidden. THE NEW GENUS:
  the DANGLING aria-describedby (the reference's own dead pointer —
  live-probed "NO SUCH ELEMENT"; ours the clean no-attribute form).
- **WP-3 GREEN** — the pin survey first (INPUT_BASE/BUTTON_BASE
  focus rings already full-pinned s9/s10 · DIALOG_FOOTER/HEADER s15 ·
  the no-description doctrine s15), then 4 born-green pins: the
  walk54 decode freeze · the DIALOG_CONTENT.base FULL-string freeze ·
  the DIALOG_CLOSE FULL-string freeze · the DIALOG_OVERLAY
  FULL-string freeze.
- **WP-4 GREEN** — MUTATION-PROOF (the planted
  focus:ring-offset-2 → focus:ring-offset-4 regression → exactly 1
  RED — the full-string pin's unique teeth, the offset arm no
  fragment pin holds → restored → GREEN) · STASH-PROOF (the round's
  test file stashed → exactly 138/2750 → restored → 138/2754).
- **WP-5 GREEN** — count-ladder-181.py: 23 flips (2750 → 2754 [+4] ·
  badge 2942 → 2946, idempotent — the re-run a verified 0-flip
  no-op) · skill-head-181.py (the SKILL v1.178.0, the s180 layer
  demoted at its ship counts 2750/192, idempotent) · the F-106a1
  layer-axis + census pins re-anchored (the SKILL §5.6 checks 226 →
  230) · the docs lockstep (the AGENTS Session-181 section · the PAD
  s181 inventory row · the CLAUDE page-layout bullet's walk54 tail ·
  the README Tested row's walk54 clause + the badge · session_384.md
  · this execution record · the worklog entry [Task ID 181]).
- **WP-6 GREEN** — the captures 459-462 (the mount-focused input
  ours+ref + the REAL-keyboard-focused close X ours+ref; BOTH pairs
  0.00% pixel-diff — byte-identical, the same md5 — VLM-verified
  content: the thin near-black ring on the input, the rounded-square
  double-ring enclosure on the X) + the operator asks all verified
  standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2754 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk54 focus faces byte-equal on both axes · the captures both
  pairs 0.00% (byte-identical).
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
