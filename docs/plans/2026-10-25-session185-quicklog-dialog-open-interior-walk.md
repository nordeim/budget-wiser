# The session-185 plan — THE QUICK-LOG DIALOG OPEN-STATE INTERIOR WALK + BY-TYPE FOOTER RE-WALK (walk58)

Date: 2026-10-25 · Rotation: 185 ·
Task: audit + validate the shipped session-184 state (commit `2c35e49` +
the owner's transcript commit `8e48c3d` — the session_390/391 transcripts
are this round's rotation trigger), then execute the next-rotation
candidates the s390 close names (the remaining unwalked OPEN/focus
interiors), plus the round-specific operator asks (env/db placement
re-verification · the vitest/playwright config standing check · the
sitemap/SEO re-verification · the mobile-nav two-app comparison · the
`.env.example` inclusion · the dev-server captures), TDD-first, align
every doc, push to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication) — DONE

The baseline gate at the shipped s184 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2763** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.5m) · probe:ref
STABLE (`46bc2d9c` — the bundle md5 unchanged) · db census MATCH
(15/24/10/23/12 + 4 users at `<repo>/db/custom.db`, the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching
command — the F-123a1 doctrine) · sitemap 11 routes + robots +
manifest 200 (smoke check 12).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s390 close's named candidates**, adjudicated by the discovery probe
(`scripts/discover-185.ts`, the discovery record):

- **The quick-log quartet's OPEN-dialog faces — the Log Activity
  dialog's create-focus arm (the s390 close's FIRST-NAMED candidate) —
  LIVE, BOTH ARMS, byte-equal geometry**: the reference's quartet is
  FUNCTIONAL (the L-125c2 dead-stub doctrine does NOT reach this
  family — the s76 Mce decode's `onSubmit: N => mutate({...N, type:
  i || N.type})` predicted it, the live census proves it): BOTH `Log
  Call` and `Log WhatsApp` open the Log Activity dialog on BOTH apps at
  `384,237 672x426`, bg white, border `1px solid rgb(229,229,229)`,
  radius 8px; the label vocabulary byte-equal (`Activity Type * | Date &
  Time * | Description * | Related To (Type) | Related To (Name)`);
  the footer pair byte-equal (`Cancel | Log Activity`); the textarea
  `Enter activity details...` rows=4 + the datetime-local input
  byte-equal; the CANCEL round-trip functional on both. **The genuine
  deltas the walk must decode**: the dialog SHADOW (ours carries the v4
  variable-chain zero slots — the walk54 slot-count genus, the visible
  layers need the full census), the mount-focus naming (both arms land
  on the FIRST combobox; OURS carries the aria-label superset
  `Activity Type`, the reference's trigger is unnamed — the s88-c9 kept
  genus), and the combobox token selection (OURS `border-line bg-t…`
  vs the reference's `border-in…` — computed-EQUAL at the discovery's
  border census, the M-81c2 genus).
- **The by-type card's checkbox-footer + ••• face (the s390 close's
  second-named candidate) — LIVE, byte-equal on every computed face**:
  the card `1088,821 320x375` IDENTICAL; the checkbox `1113,1151
  16x16`, `checked=true`, the dark `rgb(23,23,23)` checked fill,
  `1px solid rgb(23, 23, 23)`, radius 4px IDENTICAL (the s17 stock
  doctrine); the ••• `1355,846 28x24` transparent bg, ink
  `rgb(156,163,175)` IDENTICAL (OURS carries the `aria-label="More
  actions"` superset, the reference's unnamed); the label
  `text-sm font-medium cursor-pointer` IDENTICAL. The s13 construction
  re-walked under ADR-022 — the discovery's census already byte-equal.
- **The Edit-family dialogs' focus faces (the standing re-check) —
  STILL KILLED**: the reference carries ZERO rows on /contacts,
  /leads, /accounts (the empty-state rows alone, zero row-menu
  triggers) and ZERO calendar chips — the W7/wce/Mke edit dialogs have
  no trigger there; the candidate stays suspended (the discover-184/185
  census is the standing re-check; it returns the day the reference
  carries rows).

## WP-1 — The walk tool

`scripts/walk58-quicklog-dialog-open.ts` (the walk53-57 ledger form
over the dialog family's OPEN states at BOTH axes — the dialog family
is reachable at phone, unlike the rail):

- **Phase A — the dialog OPEN census at the desktop axis 1440×900**:
  the Log Call trigger's RESTING face → the CLICK → the OPEN interior
  DFS ledger (the root + overlay + close X + header + the field
  constructions + the footer pair), the chrome faces (the
  walk54-decoded carriers, now TWO-APP), the mount-focus census, the
  combobox triggers' faces + vocabularies (the type select's FIVE
  options — Call/Email/Meeting/Task/Note, WhatsApp NEVER listed, the
  L-76c6 doctrine; the related-type select's options), the CANCEL
  round-trip.
- **Phase B — the REAL keyboard Tab drive through the OPEN dialog**
  (the walk54 focus form, now two-app): the chain from the mount-focus
  stop through the selects/textarea/inputs/footer, each stop's focused
  face (the ring carrier), the Escape close round-trip.
- **Phase C — the phone axis 390×844**: the same dialog OPEN census
  (the dialog family is reachable at phone — the quick-log quartet
  wraps 2×2 at phone, the s109 e2e pin) — the OPEN geometry + the
  interior census at the phone axis.
- **Phase D — the by-type footer decode** (the s13 construction
  re-walked under ADR-022, the second-named candidate): the
  checkbox-footer + ••• faces byte-equal per the discovery — the walk
  freezes the census into the decode ledger (desktop axis; the rail is
  display:none below lg — the s109 pin).

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db — the DATA-STATE discipline: the type
select's FIXED five-option vocabulary is the walk-able arm; the
related-name freeform input carries no data-borne comparison).

## WP-2 — The decode

Every delta root-caused against the standing genus register (the
box-shadow SLOT-COUNT genus — the v4 variable-chain zero slots, every
VISIBLE layer byte-equal · the outline VERSION FORM + both sub-forms
(s178) · the token-selection genus (the M-81c2 pair — the select
triggers' `border-line/bg-surface` vs the reference's
`border-input/bg-background`, computed-equal on every face) · the
class-order genus (`h-9` base-first vs `w-full` position · the s178
fingerprint) · the v4 `[&_svg]` base arms · the aria-label superset
genus (s88-c9, kept — the combobox naming + the ••• dots) · the React
useId format genus · lucide's aria-hidden version genus · the s133
placeholderState retirement — the placeholder IS walked this time, on
both arms byte-equal) + the kept-superset register (our aria-labels on
the combobox triggers + the ••• dots over the reference's unnamed
controls — the a11y gate's own doctrine). Target: ZERO live defects,
every delta a documented genus or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178–s184 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine) — the pin survey FIRST (the standing
pins: the s125 quartet/KPI-sextet/by-type-vocabulary/preset-rides-
submit/toggle pins · the s141 chips-palette/subtitle pins · the s76
footerRow pin · the s13/s17 footer class-token pins in page-layout ·
the walk54 DIALOG_CONTENT.base/DIALOG_CLOSE/DIALOG_OVERLAY
full-string freezes · the s15 ACTIVITY_DIALOG.content/form/pair
contracts · the dialog-mount-contract useOpenEpoch family · the
create-dialog-single-mode dual-mode ternary):

1. the walk58 decode freeze (the tool's own contract — the two-app
   OPEN ledger at both axes, the mount-focus census, the REAL Tab
   drive through the dialog, the preset arm, the by-type footer
   decode, the phone-axis census);
2. the quick-log trigger→dialog construction freeze (the genuine gap:
   NO pin holds the PAGE side — the QUICK_LOG quartet's
   type/label/icon members in order + the onClick wiring
   `setEditing(null); setDefaultType(q.type); setDialogOpen(true)` +
   the `<ActivityDialog … defaultType={defaultType} activity={editing}/>`
   call-site props; the s125 pin holds the FORM side only);
3. the by-type footer pair freeze (the genuine gap: the s76/s13 pins
   hold the CLASS tokens, never the PAIR construction — the
   `defaultChecked` checkbox + the htmlFor label + the ••• with the
   `aria-label="More actions"` superset).

## WP-4 — Proofs

MUTATION-PROOF (a planted class-string/wiring regression on a walked
contract → exactly 1 RED → restored → GREEN) · STASH-PROOF (the
round's test block stashed alone → exactly 138/2763 → restored →
138/2763+N) · the walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2763 → 2763+N (the walk58 pins) · badge 2955 → 2955+N
(count-ladder-185.py: the house assert-first idempotent form) · the
collateral re-anchors (the SKILL §5.6 census checks 239 → 239+N · the
F-106a1 layer-axis pin — the s185 layer live, the s184 layer demoted
beneath it at 2763/192 · the s184-era live-tense RED-first arithmetic
site re-anchored 255 → 255+N) · the docs lockstep (the AGENTS
Session-185 section · the PAD session-185 inventory row · the CLAUDE
page-layout bullet's walk58 tail · the README Tested row's walk58
clause + the badge · the SKILL **v1.182.0** + the s185 head layer
[skill-head-185.py, idempotent] · session_392.md + this plan's
execution record + the worklog entry [Task ID 185]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref faces (the
  dialog OPEN ours+ref at the desktop axis — the pair decode — + the
  phone-axis pair) + the standard dev-server page set for the
  operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: the 200s · the
  11 routes + the robots Sitemap line + the per-route OG/Twitter
  factory).
- The mobile-nav comparison: probe:ref TRUE-390 STANDING (the
  reference's own menu button live) + the drawer battery GREEN carry
  the verdict — documented in the session record.
- The Tailwind v4 state clean (every walk delta decoded against the
  standing genus register).

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2766 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING + the s109 rail-absence pin |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-25, session-185)

- **The audit GREEN** — the baseline gate at the shipped s184 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2763 · build · smoke 14/14 ·
  e2e 192/192 (clean first run, 5.5m) · probe:ref STABLE (46bc2d9c) ·
  census MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes + robots
  + manifest 200 · the Tailwind v4 state clean · the operator's
  standing asks verified (env/db placement · the vitest/playwright
  configs · sitemap/SEO · mobile-nav · `.env.example`).
- **The rotation adjudication** — probe:ref STABLE kills the
  fresh-bundle candidate; recharts latest 3.10.1 kills the 4.0 gate;
  the s390 close's named candidates adjudicated by the discovery
  (`scripts/discover-185.ts`): the FIRST-named (the quick-log
  quartet's OPEN-dialog faces) LIVE, BOTH ARMS (the reference's
  quartet FUNCTIONAL — the dialog opens at byte-equal geometry on
  both apps at both axes; the labels/footer/vocabularies byte-equal);
  the second-named (the by-type card's checkbox-footer/••• face)
  byte-equal on every computed face; the standing Edit-family re-check
  (the reference still zero-row — the candidate stays suspended).
- **WP-1 GREEN** — `scripts/discover-185.ts` (the discovery probe: the
  quick-log CLICK census — the reference's Log Call AND Log WhatsApp
  both open the functional dialog; the by-type card census keyed on
  the first checkbox-bearing ancestor after the CardTitle-renders-a-
  div calibration, M-185-p0) then
  `scripts/walk58-quicklog-dialog-open.ts` (the walk53-57 ledger form
  over the dialog family's OPEN states at BOTH axes: Phase A the OPEN
  census — the chrome faces + the interior ledger + the mount-focus +
  the vocabularies + the footer pair + the CANCEL round-trip; Phase B
  the REAL keyboard Tab drive through the OPEN dialog, 17 stops
  structurally IDENTICAL on both apps; Phase C the phone-axis census;
  Phase D the by-type footer decode); the walk re-run STABLE post-cure
  (the delta census identical modulo the cured face).
- **WP-2 GREEN** — the decode COMPLETE: **ONE LIVE FIND CURED
  (D-185a1)**, every remaining delta a documented genus (the
  box-shadow slot-count with every VISIBLE layer byte-equal · the
  outline VERSION FORM + both sub-forms · the oklab/rgba overlay
  serialization · the token-selection M-81c2 pairs · the class-order
  position · our aria-label supersets · the React useId format ·
  lucide's aria-hidden X · the Radix SelectContent mount-state
  offset); the D-183a1 same-family check on the dialog submit CLEAN
  (bg rgb(23,23,23) byte-equal on both apps at both axes).
- **WP-3 GREEN** — the pin survey first (the s125/s141/s76/s13/s17
  pins + the walk54 chrome freezes + the s15 contracts + the
  dialog-mount-contract family; the PAGE-side wiring + the footer
  PAIR never pinned), then 3 born-green pins: the walk58 decode
  freeze · the quick-log trigger→dialog construction freeze · the
  by-type footer pair freeze — + THE D-185a1 CURE PIN (RED-first:
  exactly 1 RED at birth → the cure → GREEN; the s133 pin block
  re-anchored with the walk58 evidence).
- **WP-4 GREEN** — MUTATION-PROOF (the planted `setDefaultType("call")`
  wiring regression → exactly 1 RED — the full-string pin's unique
  teeth → restored → GREEN, no residual diff) · STASH-PROOF (the
  round's test block stashed → exactly 138/2763 → restored →
  138/2766).
- **WP-5 GREEN** — count-ladder-185.py (2763 → 2766 [+3] · badge 2955
  → 2958, idempotent — the re-run a verified 0-flip no-op) ·
  skill-head-185.py (the SKILL v1.182.0, the s184 layer demoted at its
  ship counts 2763/192, idempotent) · the F-106a1 layer-axis +
  census pins re-anchored (the SKILL §5.6 checks 239 → 242 with the
  negatives-ladder extended; the MODULE lines 1695 → 1701 with the PAD
  §11 row + the negatives ladder; the live-tense RED-first arithmetic
  site re-anchored 255 → 258) · the docs lockstep (the AGENTS
  Session-185 section · the PAD s185 inventory row · the CLAUDE
  page-layout bullet's walk58 tail · the README Tested row's walk58
  clause + the badge · session_392.md · this execution record · the
  worklog entry [Task ID 185]).
- **WP-6 GREEN** — the captures (the dialog OPEN ours+ref at the
  desktop axis + the phone-axis pair, VLM-verified) + the operator
  asks all verified standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2766 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk58 dialog OPEN interiors byte-equal (post-cure) · the
  D-183a1 same-family check CLEAN.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
