# The session-180 plan — THE DROPDOWN/SELECT OPEN-STATE INTERIOR WALK (walk53)

Date: 2026-10-24 · Rotation: 180 ·
Task: audit + validate the shipped session-179 state (commit `d799411` +
the owner's two transcript commits `6ff2ba7`/`3b21544` — the session_381
transcript is this round's rotation trigger), then execute the
remaining-unwalked-OPEN-interior round the s380 close names first, plus
the round-specific operator asks (env/db placement re-verification ·
the vitest/playwright config standing check · the sitemap/SEO
re-verification · the mobile-nav two-app comparison · the `.env.example`
inclusion · the dev-server captures), TDD-first, align every doc, push
to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication)

The baseline gate at the shipped s179 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2744** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (one first-run flake in the
S72-P2/M-72c1 settings-debounce test — the documented F-119a1
epoch-gate lineage — passed in isolation AND on the full re-run; a
machine-load observation, not a live defect) · probe:ref STABLE
(`46bc2d9c`) · the mobile drawer battery GREEN at 390×844 · the
desktop + phone drift sweeps CLEAN (settings 2.65%/3.63% = the
documented volatile picklist-data genus, live-edited intraday on the
reference — walk40's ref-vs-ref doctrine; login 0.28%/0.78% = the
documented logo genus) · db census MATCH (15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`) · sitemap 11 routes + robots + manifest 200
(smoke check 12).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s380 close's first-named candidate: the remaining unwalked
focus/OPEN faces — the dropdown/select OPEN states beyond the s133/s136
lenses (the s379 close's own second arm), the account-menu OPEN
re-walk under ADR-022.** No round ever ran the walk50-form two-app
element ledger over an OPEN DropdownMenu or an OPEN Select listbox:
the e2e battery pins BEHAVIOR (role=menu + menuitems + the mount-focus
freeze, S13-P4/D-113a3), the s133/s136 lenses spot-checked two family
pages' select triggers, the a11y gate scans violations — none ever
walked the OPEN DOM element-against-element with computed faces.

## WP-1 — The walk tool

`scripts/walk53-dropdown-open-interior.ts` (the walk50 ledger form, the
OPEN-interior doctrine): the two-app element ledger of the OPEN states
at BOTH axes (1440×900 + 390×844 — both surfaces are topbar/tab-panel
borne and both exist at phone width):

- **Phase A — the account-menu OPEN** (the dropdown proper: the topbar
  `Account menu` trigger → the `[role="menu"]` content → the Profile +
  Logout menuitems): tag/cls/role/aria/text/geometry per row (the DFS
  spine), the trigger's resting face, the content's computed
  bg/border/shadow/radius, each menuitem's computed face — RESTING and
  KEYBOARD-HIGHLIGHTED (ArrowDown from the mount-focused content, the
  D-113a3 decoded focus form — focus/highlight under REAL keyboard
  drive, no synthetic hover), plus the post-interaction roving state.
- **Phase B — the settings Defaults "Default Lead Stage" select OPEN**
  (the listbox family: the `def-stage` trigger → the
  `[role="listbox"]` content → the option items): the trigger's resting
  + open faces, the content's computed faces, the selected item's
  highlighted face (the data-highlighted + data-state=checked pair),
  the item-count + the geometry spine.

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db — both apps compared in their DEFAULT
data states per the s179 DATA-STATE genus discipline: the reference's
zero-data settings Defaults select opens its full vocabulary listbox —
the vocabularies are APP-borne, not data-borne, so the OPEN listbox is
data-state-independent; any page-offset delta is adjudicated against
the s179 data-state genus, never against the walk's interior).

## WP-2 — The decode

Every delta root-caused against the standing genus register (F-129c1
ring-offset-background retirement · the token-selection genus · the
class-order genus · the outline VERSION FORM (s178) · the box-shadow
slot-count genus · the shadow-sm rename family · the space-y
margin-BOTTOM family) + the kept-superset register (our aria-labels
the reference's own surfaces lack · our focus-visible rings). Target:
ZERO live defects, every delta a documented genus or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178/s179 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine):

1. the walk53 decode freeze (the tool's own contract — the walk form:
   the two-app OPEN ledger + the REAL keyboard drive + the both-axes
   form);
2. the account-menu OPEN contract freeze (the MENU_CONTENT /
   MENU_ITEM full-string carriers — the s179 FULL-string-freeze
   precedent upgrading the register-level fragment pins);
3. the select OPEN contract freeze (the select content's full-string
   carrier — the M-81c1-decoded z-50/max-h-96/rounded-md/shadow-md
   family);
4. any NEW decode knowledge the maiden pass surfaces (born-green over
   the zero-defect decode, or honest-RED-first over a live find).

## WP-4 — Proofs

MUTATION-PROOF (a planted class-string regression on a walked contract
→ exactly 1 RED → restored → GREEN) · STASH-PROOF (the round's test
block stashed alone → exactly 138/2744 → restored → 138/2744+N) · the
walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2744 → 2750 (+6: 5 the walk53 pins + 1 the RED-first
inventory-uniqueness pin) · badge 2936 → 2942 (count-ladder-180.py: the
23-flip form, assert-first, idempotent, the two-pass full-ladder form)
· the collateral re-anchors (the SKILL §5.6 census checks 221 → 226 ·
the F-106a1 layer-axis pin — the s180 layer live, the s179 layer
demoted beneath it at 2744/192) · the docs lockstep (the AGENTS
Session-180 section · the PAD session-180 inventory row · the CLAUDE
page-layout bullet's walk53 tail · the README Tested row's walk53
clause + the badge · the SKILL **v1.177.0** + the s180 head layer
[skill-head-180.py, idempotent] · session_382.md + this plan's
execution record + the worklog entry [Task ID 180]).

## WP-5b — The 180-a live find + cure (mid-round)

The audit of the shipped s179 state found the external s179 round had
TRIPLED its PAD §7.1 inventory row (three near-identical walk52 rows —
a single-layer-doctrine violation that shipped through the gate; no
pin held the table's row multiplicity). The TDD cure: the new
inventory-row uniqueness pin (tests/docs-counts.test.ts) went RED over
the live triplication FIRST, the two duplicate rows were removed (the
first/most-complete kept), the pin went GREEN — the +1 in the ladder
and the one-time mid-round pass-2 re-flip.

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref OPEN-state
  faces (the account-menu OPEN + the select OPEN) + the standard
  dev-server page set re-capture for the operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: 200s · the 11
  routes + the capitalized-alias decision · the robots Sitemap line ·
  the per-route OG/Twitter factory).
- The mobile-nav comparison: the drawer battery + probe:ref + the
  walk50 spine carry the verdict (ours the Radix Sheet superset, the
  reference's own menu button STANDING at TRUE-390 — the S8-P1/locks/
  route-change supersets e2e-pinned) — documented in the session record.

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2744 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING + drawer battery GREEN |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-24, session-180)

- **The audit GREEN** — the baseline gate at the shipped s179 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2744 · build · smoke 14/14 ·
  e2e 192/192 (one first-run flake in the S72-P2/M-72c1
  settings-debounce test — the documented F-119a1 epoch-gate lineage —
  passed in isolation AND on the full re-run) · probe:ref STABLE · the
  drawer battery GREEN · the desktop + phone sweeps CLEAN (the
  settings picklist-data + login logo genera within floors) · census
  MATCH · the operator's standing asks verified (env/db placement ·
  the vitest/playwright configs · sitemap/SEO · mobile-nav · Tailwind
  v4 state · `.env.example`).
- **WP-1 GREEN** — `scripts/discover-180.ts` (the discovery probe: the
  account-menu trigger locator `button[aria-haspopup="menu"]` — the
  reference's trigger carries NO aria-label, ours the kept superset;
  the Defaults combobox pair at byte-equal geometry) then
  `scripts/walk53-dropdown-open-interior.ts` (the walk50 ledger form,
  both phases at both axes); one locator calibration mid-maiden (the
  attribute-selector discovery — Playwright's getByRole("combobox")
  engine stops matching the trigger once aria-expanded flips true at
  open; the raw attribute selector is the only form matching both
  states, documented + pinned).
- **WP-2 GREEN** — the decode COMPLETE: ZERO LIVE DEFECTS. The menu
  spine byte-equal on both axes (3 rows · zero box deltas ·
  mount-focus DIV/menu both · ArrowDown → Profile both); the listbox
  spine byte-equal (Month/Week · checked/unchecked identical ·
  mount-focus DIV/option both · ArrowDown → Week both); every VISIBLE
  OPEN face byte-equal. Every delta a documented genus: the outline
  VERSION FORM (re-met + the NEW alpha-color carrier sub-form) · the
  box-shadow slot-count · the token-selection (computed-equal resting
  AND highlighted) · the useId format · lucide aria-hidden.
- **WP-3 GREEN** — 5 born-green pins (the walk53 decode freeze · the
  MENU_CONTENT + MENU_ITEM FULL-string freezes · the select.tsx
  content/item full-string freezes) + the pin survey first (the
  s113/s128 fragment pins found, the FULL-string upgrades the s179
  precedent).
- **The 180-a live find + cure GREEN** — the external s179 ship's PAD
  §7.1 inventory row found TRIPLED (a single-layer-doctrine violation
  no pin held); the new inventory-row uniqueness pin RED-first over
  the live triplication → the two duplicates removed (the most-complete
  row kept) → GREEN. The +1 pin in the ladder.
- **WP-4 GREEN** — MUTATION-PROOF (the planted MENU_ITEM disabled-arm
  order swap → exactly 1 RED — the full-string pin's unique teeth; the
  shadow-md + class-order mutations tripped the older fragment pins
  too, both documented) · STASH-PROOF (the round's test file stashed →
  exactly 138/2744 → restored → 138/2749 pre-find).
- **WP-5 GREEN** — count-ladder-180.py: the two-pass full-ladder form
  (23 flips; 2744 → 2750 [+6] · badge 2936 → 2942, idempotent) ·
  skill-head-180.py (the SKILL v1.177.0, the s179 layer demoted at its
  ship counts 2744/192, idempotent) · the F-106a1 layer-axis + census
  pins re-anchored (the SKILL §5.6 checks 221 → 226) · the docs
  lockstep (the AGENTS Session-180 section · the PAD s180 inventory
  row + the tripled-row dedupe · the CLAUDE page-layout bullet's
  walk53 tail · the README Tested row's walk53 clause + the badge ·
  session_382.md · this execution record · the worklog entry [Task ID
  180]).
- **WP-6 GREEN** — the captures 455-458 (the account-menu OPEN
  ours+ref + the select OPEN ours+ref; BOTH pairs 0.00% pixel-diff,
  byte-equal, VLM-verified: the highlighted Profile wash + the Month
  checkmark on both, zero visible differences) + the capture decode
  lesson (the dashboard-variant shadow-below band blended with the KPI
  chart content beneath — the standing chart genus; re-shot over the
  settings Defaults card).
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2750 · build ·
  smoke 14/14 · e2e 192/192 · census MATCH · probe:ref STABLE · the
  walk53 OPEN spines byte-equal on both axes · the captures both pairs
  0.00%.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
