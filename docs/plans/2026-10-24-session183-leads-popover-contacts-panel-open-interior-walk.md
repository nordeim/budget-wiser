# The session-183 plan — THE LEADS-FILTER POPOVER + CONTACTS-FILTER-PANEL OPEN-STATE INTERIOR WALK (walk56)

Date: 2026-10-24 · Rotation: 183 ·
Task: audit + validate the shipped session-182 state (commit `39a3a69` +
the owner's transcript commit `bf3acec` — the session_386/387 transcripts
are this round's rotation trigger), then execute the next-rotation
candidate the s386 close names first (the popover family's OPEN faces
under ADR-022 — the leads filter popover + the contacts filter panel),
plus the round-specific operator asks (env/db placement re-verification ·
the vitest/playwright config standing check · the sitemap/SEO
re-verification · the mobile-nav two-app comparison · the `.env.example`
inclusion · the dev-server captures), TDD-first, align every doc, push
to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication)

The baseline gate at the shipped s182 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2757** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run) · probe:ref STABLE
(`46bc2d9c`) · the mobile drawer battery GREEN at 390×844 (all stages:
trigger · OPEN focus-trap + dual scroll lock · NAV-CLOSE · ESC-CLOSE ·
REOPEN-BEFORE-GROW · RESIZE-PAST-MD release) · the desktop + phone
drift sweeps CLEAN · db census MATCH (15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`) · sitemap 11 routes + robots + manifest 200
(smoke check 12) · the Tailwind v4 state clean.

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s386 close's first-named candidate: the popover family's OPEN faces
under ADR-022** — the leads filter popover (a true Radix Popover portal
via the shared `Dropdown` wrapper, `src/components/ui/dropdown.tsx`) +
the contacts filter panel (the in-flow slide-in, the s75-decoded `kke`
construction). The standing legs' coverage: the e2e battery pins OUR
filters BEHAVIOR (the S25-P8 save-view round-trip + the s29 inline
editing) — never the two-app OPEN ledger; the a11y two-gate scans the
CLOSED surfaces; the s113 walk measured the family pre-doctrine
(geometry + census, 26 sessions ago) — the element-level DFS ledger, the
REAL keyboard Tab drive, the computed OPEN faces, and the contract
carriers' full-string freezes remain unwalked in the ADR-022 form.
walk53 froze the DropdownMenu + Select chrome (MENU_CONTENT/MENU_ITEM +
select.tsx content/item); the **Popover family's own chrome never**
(dropdown.tsx's content string, the trigger/content inline classes).

## WP-1 — The walk tool

`scripts/discover-183.ts` (the throwaway discovery probe — DONE, the
calibration): the leads Filters trigger at byte-equal geometry on both
apps (`304,443 108x36` at 1440×900 · `32,1089 326x36` at 390×844);
the OPEN popover `div[role="dialog"]` at byte-equal boxes
(`304,483 320x398` at 1440 · the 390 collision FLIP-UP to `data-side=top`
at `32,36` on BOTH apps — the s113-decoded flip re-confirmed); the
mount-focus `BUTTON/combobox` (the first select trigger) on both; the
field labels byte-equal `[Status | Source | Min Deal Value | Follow-up
Date]`; the same inputs (number placeholder "0" · date) + the same
footer buttons (Clear · Save View); OURS carrying the aria-label
supersets (`Open lead filters` · `Filter by status/source` · `Minimum
deal value` · `Follow-up date`), the reference's controls carrying NONE;
the 1st-Tab landing byte-equal (the Source select trigger both); the
contacts Filters trigger + the OPEN panel + the Clear All geometry
byte-equal at BOTH axes (`764,351 108x36` + `1350,85 74x32` at 1440 ·
`234,789 108x36` + `300,80 74x32` at 390); the 20 checkboxes with the
same id family on both; OURS carrying the `aria-expanded` superset on
the panel trigger (the reference's carries none).

`scripts/walk56-leads-popover-open.ts` (the walk53/55 ledger form over
the popover family's TWO OPEN states at BOTH axes — 1440×900 + 390×844):

- **Phase A — the leads Filters popover** (the portal arm): the trigger
  RESTING + OPEN faces, the content chrome face, the content DFS ledger,
  the four field-label faces, the two select triggers + two inputs +
  two footer buttons' faces + geometry, then the REAL keyboard drive
  (the 1st-Tab census — the mount-focus lands on the first select
  trigger on both apps) + the Escape close.
- **Phase B — the contacts filter panel** (the in-flow arm): the
  trigger's variant-flipped OPEN face, the panel's sticky header +
  Clear All face, the card-group census (the h3 titles + the checkbox
  id family), the panel geometry at both axes (the fixed right-0
  slide-in at phone · the lg:static in-flow rail at desktop), the
  mount-focus census (stays on the trigger — no trap on either app).

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db — the DATA-STATE discipline: both apps
render the same seeded/demo-empty surfaces here; the leads popover's
vocabularies are FIXED on both — no data-borne arm on this family).

## WP-2 — The decode

Every delta root-caused against the standing genus register (the
aria-label superset genus · the outline VERSION FORM (s178) + both its
sub-forms · the box-shadow slot-count genus · the token-selection genus
(the popover's border-line/bg-surface/text-foreground + the call-site
rounded-md shadow-md w-80 p-4 vs the reference's z-50 rounded-md
border bg-popover p-4 text-popover-foreground shadow-md — the M-81c2
pair's Popover member) · the class-order genus · the React useId format
genus · lucide's aria-hidden version genus · the v4 color-serialization
genus (the s28 oklab precedent)) + the kept-superset register (our
aria-labels · the aria-expanded on the panel trigger). Target: ZERO
live defects, every delta a documented genus or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178–s182 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine) — the pin survey FIRST (the standing pins:
LEADS_FILTERS_POPOVER's eleven source tokens at s578-592 · the
vocabularies at s594 · the s113 D-113a1 label-tag pins in
leads-family-parity · the kke card-group order in
contacts-family-parity):

1. the walk56 decode freeze (the tool's own contract — the two-arm
   OPEN form + the attribute-selector rules + the mount-focus census +
   the REAL Tab drive + the phone-axis flip);
2. the POPOVER content chrome FULL-string freeze (dropdown.tsx's
   content class string — the genuine walk53-battery gap: the
   DropdownMenu + Select chrome was full-frozen at walk53, the
   Popover family's own carrier never);
3. any NEW decode knowledge the maiden pass surfaces (born-green over
   the zero-defect decode, or honest-RED-first over a live find).

## WP-4 — Proofs

MUTATION-PROOF (a planted class-string regression on a walked
contract → exactly 1 RED → restored → GREEN) · STASH-PROOF (the
round's test block stashed alone → exactly 138/2757 → restored →
138/2757+N) · the walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2757 → 2757+N (the walk56 pins) · badge 2949 → 2949+N
(count-ladder-183.py: the house assert-first idempotent form) · the
collateral re-anchors (the SKILL §5.6 census checks 233 → 233+N · the
F-106a1 layer-axis pin — the s183 layer live, the s182 layer demoted
beneath it at 2757/192) · the docs lockstep (the AGENTS Session-183
section · the PAD session-183 inventory row · the CLAUDE page-layout
bullet's walk56 tail · the README Tested row's walk56 clause + the
badge · the SKILL **v1.180.0** + the s183 head layer
[skill-head-183.py, idempotent] · session_388.md + this plan's
execution record + the worklog entry [Task ID 183]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref OPEN faces
  (the leads popover OPEN at desktop + the phone-axis FLIP-UP face +
  the contacts panel OPEN at both axes) + the standard dev-server page
  set re-capture for the operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: the 200s · the
  11 routes + the robots Sitemap line + the per-route OG/Twitter
  factory).
- The mobile-nav comparison: the drawer battery + probe:ref + the
  phone-axis walk legs carry the verdict (ours the Radix Sheet
  superset, the reference's own menu button STANDING at TRUE-390) —
  documented in the session record.
- The Tailwind v4 state clean (every walk delta decoded against the
  standing genus register).

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2757 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING + drawer battery GREEN |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-24, session-183)

- **The audit GREEN** — the baseline gate at the shipped s182 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2757 · build · smoke 14/14 ·
  e2e 192/192 (clean first run, 5.6m) · probe:ref STABLE (46bc2d9c) ·
  the drawer battery GREEN (all stages) · the desktop + phone sweeps
  CLEAN · census MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes +
  robots + manifest 200 · the Tailwind v4 state clean · the
  operator's standing asks verified (env/db placement · the
  vitest/playwright configs · sitemap/SEO · mobile-nav ·
  `.env.example`).

- **WP-1 GREEN** — `scripts/discover-183.ts` (the discovery probe:
  the leads Filters trigger + the OPEN popover div[role=dialog] at
  byte-equal geometry on both apps; the mount-focus BUTTON/combobox
  (the first select trigger) on both; the field labels byte-equal;
  OURS carrying the aria-label supersets; the 1st-Tab landing
  byte-equal; the contacts Filters trigger + the OPEN panel + the
  Clear All geometry byte-equal at BOTH axes; the 20 checkbox ids
  identical) then `scripts/walk56-leads-popover-open.ts` (the
  walk53/55 ledger form, both arms at both axes; the walk re-run
  post-cure STABLE — the delta census byte-identical modulo the
  cured face).
- **WP-2 GREEN** — the decode COMPLETE: the **D-183a1 LIVE FIND**
  (the contacts Filters trigger's OPEN variant-flip — OURS the blue
  default rgb(37,99,235) vs the reference's DARK stock primary
  #171717 rgb(23,23,23), its global --primary token; the CLOSED
  outline face byte-equal, the OPEN face never walked) + THE CURE
  (the variant ternary STAYS + the neutral literal pair
  bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 via
  tailwind-merge — the profile S13-P2/M-80c1 precedent) + **the
  re-walk PROOF: the OPEN face byte-equal on both axes**; every
  remaining delta a documented genus (the outline VERSION FORM +
  both sub-forms · the box-shadow slot-count · the token-selection
  M-81c2 Popover member · the s133 placeholderState retirement ·
  the useId format · lucide's aria-hidden · the class-order · the
  aria-label supersets).
- **WP-3 GREEN** — the pin survey first (LEADS_FILTERS_POPOVER's
  tokens + vocabularies pinned at s578-594 · the D-113a1 label pins
  · the kke card-group pin; the popover content chrome the genuine
  gap), then 3 pins: the walk56 decode freeze (born-green) · the
  POPOVER content chrome FULL-string freeze (born-green, the
  genuine walk53-battery gap) · the D-183a1 OPEN-face cure pin
  (RED-first — exactly 1 RED at birth → the cure → GREEN).
- **WP-4 GREEN** — MUTATION-PROOF (the planted rounded-lg →
  rounded-xl content-chrome regression → exactly 1 RED — the new
  full-string pin's unique teeth, no fragment pin holds the
  Popover content chrome construction → restored → GREEN) ·
  STASH-PROOF (the round's test block stashed → exactly 138/2757
  → restored → 138/2760).
- **WP-5 GREEN** — count-ladder-183.py: 31 flips (2757 → 2760 [+3] ·
  badge 2949 → 2952, idempotent — the re-run a verified 0-flip
  no-op) · skill-head-183.py (the SKILL v1.180.0, the s182 layer
  demoted at its ship counts 2757/192, idempotent) · the F-106a1
  layer-axis + census pins re-anchored (the SKILL §5.6 checks 233 →
  236 with the negatives-ladder extended; the live-tense RED-first
  arithmetic site re-anchored 249 → 252) · the docs lockstep (the
  AGENTS Session-183 section · the PAD s183 inventory row · the
  CLAUDE page-layout bullet's walk56 tail · the README Tested row's
  walk56 clause + the badge · session_388.md · this execution
  record · the worklog entry [Task ID 183]).
- **WP-6 GREEN** — the captures 467-470 (the leads popover OPEN
  ours+ref — the pair 1.69% pixel-diff, the scattered text-band
  antialiasing, VLM-verified ZERO structural differences, both
  showing the four labels + two selects + number/date inputs +
  Clear/Save View footer; the contacts panel OPEN ours+ref — the
  FULL panel, the pair 0.00% pixel-diff BYTE-IDENTICAL with the
  same md5, the D-183a1 post-cure face, VLM-verified identical
  content) + the operator asks all verified standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2760 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk56 popover + panel OPEN interiors byte-equal on both axes
  (post-cure) · the captures: the panel pair 0.00% (byte-identical).
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
