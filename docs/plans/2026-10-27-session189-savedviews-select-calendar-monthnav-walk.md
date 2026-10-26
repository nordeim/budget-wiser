# The session-189 plan — THE LEADS SAVED-VIEWS SELECT OPEN FACES + THE CALENDAR MONTH-NAV ARMS (walk62)

Date: 2026-10-27 · Rotation: 189 ·
Task: audit + validate the shipped session-188 state (commit `272dcbc` +
the owner's transcript commit `2c2c703` — the session_398/399 transcripts
are this round's rotation trigger), then execute the next-rotation
candidates the s398 close names (the account INSIGHTS dialog + the leads
SAVED-VIEWS select's open faces — the s28/s29-era constructions never
re-walked live under ADR-022 · the calendar month-nav arms — the s27-era
construction, its interactive faces never walked), plus the round-specific
operator asks (env/db placement re-verification · the vitest/playwright
config standing check · the sitemap/SEO re-verification · the
mobile-nav two-app comparison · the Tailwind v4 bug-watch · the
`.env.example` inclusion · the dev-server captures), TDD-first, align
every doc, push to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication) — DONE

The baseline gate at the shipped s188 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2778** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.6m) · probe:ref
STABLE (`46bc2d9c` — the bundle md5 unchanged) · db census MATCH
(15/24/10/23/12 + 4 users at `<repo>/db/custom.db`, the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching
command — the F-123a1 doctrine) · sitemap 11 routes + robots +
manifest 200 (smoke check 12).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s398 close's named candidates**, adjudicated by the discovery probe
(`scripts/discover-189.ts`, the discovery record):

- **The account INSIGHTS dialog (the s398 close's first-named
  candidate) — KILLED**: the reference's zero-data state persists
  (rows=1 the empty-state row alone, rowMenus=0, insightsTriggers=0 on
  /contacts, /leads, /accounts + zero calendar chips — the
  discover-184..189 census, one leg); the Ece dialog rides an account
  row's ⋮ menu, which does not exist there. The candidate stays
  suspended (the day the reference carries rows again is the day it
  returns).
- **The leads SAVED-VIEWS select's open faces (the first-named
  candidate's leads leg) — LIVE, BOTH APPS, rich arms**: the s29-era
  construction (the toolbar's Saved Views select mounts only after a
  view is saved — the NATIVE `prompt("Enter view name:")` flow, the
  localStorage `neo-crm.leads.views` seam): the select's resting face
  byte-equal at `428,443 192x36` (bg transparent, ink
  `rgb(115,115,115)`, border `1px solid rgb(229,229,229)`), the OPEN
  listbox construction byte-equal (radius 6, bg white,
  `items(1)=[Discovery View]` on both — the probe exercised the save
  flow on both apps, the browser context discarding the storage). The
  class chains differ only in the documented genera: OURS'
  `border-line`/`bg-surface text-foreground` token selection (M-81c2)
  vs the reference's `border-input`/`bg-popover text-popover-foreground`
  stock tokens — computed-equal; OURS' 5-slot focus shadow vs the
  reference's 3-slot (the box-shadow slot-count genus, every VISIBLE
  layer byte-equal); the outline sub-forms both zero visible pixels
  (`3px none` vs `2px solid rgba(0,0,0,0)` — the s178 genus). **The
  select's own construction is genuinely unpinned** (the s29 pins hold
  the toolbar row + the `savedViewsSelect` width class, never the
  SelectTrigger call-site chain + the SelectItem rendering) — the
  freeze-pin candidate.
- **The calendar month-nav arms (the second-named candidate) — LIVE,
  BOTH APPS, rich arms**: the s27-era construction (the header row's
  three outline buttons: Previous month / Today / Next month —
  data-independent, reachable at the reference's zero-data state):
  the heading byte-equal (`October 2026`,
  `text-xl sm:text-2xl font-bold text-gray-900` — the CALENDAR_CARD
  title pin re-verified live), the nav row byte-equal (prev
  `877,372 36x36`, border `1px solid rgb(229,229,229)`, radius 6,
  bg white, ink `rgb(10,10,10)`; OURS carries the aria-labels — the
  s88-c9 superset genus, kept), the `.focus()` faces modulo the
  documented slot-count + outline genera, and the click round-trip
  live on BOTH apps (`October 2026` → `September 2026` — local
  state, NO writes). **The three nav buttons' own construction is
  genuinely unpinned** (the s16 pins hold the `navRow` container, the
  s27 pins the CELLS, never the three Button call-sites: the outline
  variant + size="icon" + the hidden-below-sm Today + the
  ChevronLeft/Right pairing) — the freeze-pin candidate.
- **The topbar-search dropdown arm (the standing conditional gate) —
  STILL KILLED**: `populated=0` on BOTH apps at the seeded-term leg
  (the placeholder `Search Anything...` byte-equal; no listbox/popover/
  dropdown renders on either app) — the s392/394/396/398 gate ("if the
  reference's own suggestions ever populate") FAILS; the candidate
  stays suspended with the s32 dead-stub doctrine standing.

## WP-1 — The walk tool

`scripts/walk62-savedviews-calnav-focus-open.ts` (the walk53-61
ledger form over the two LIVE arms at BOTH axes):

- **Phase A — the Saved-Views select OPEN census at the desktop axis
  1440×900**: the pre-save absence census (combobox count 0 — the
  reference's own pre-save state), the save flow ride (the Filters
  popover → Save View → the NATIVE prompt answered — the localStorage
  seam, the browser context discarding it), the mounted select's
  geometry ledger (the box/bg/color/border/radius + the placeholder
  `Saved Views` face), the resting + REAL-focus faces, the OPEN
  listbox census (the construction classes + the radius + the item
  vocabulary `[Discovery View]`), the REAL keyboard drive (the Tab
  into the select + the ArrowDown open + the highlight form + the
  Enter apply round-trip — the walk55 highlight form), the X-close
  round-trip.
- **Phase B — the calendar month-nav census at the desktop axis**: the
  header-row geometry ledger (the heading box + the three buttons'
  boxes), the three buttons' resting faces (the outline family:
  bg/border/radius/shadow), the REAL keyboard Tab drive into the
  three buttons (the mounted focus faces — the walk54/58/60/61
  doctrine: the programmatic face is never the true face), the click
  round-trip on prev/next/Today (local state, NO writes), the
  month-flip grid re-census (the heading flip + the day-cell count).
- **Phase C — the phone axis 390×844**: the Saved-Views select at
  phone width (the toolbar stacks — the s104 form) + the month-nav at
  phone width (the Today button hidden below sm — the s27 live pin)
  + the REAL Tab drives at the phone axis.

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db). The DATA-STATE discipline: the
select's item list is localStorage data (the probe seeds its own view
on both apps — the comparison rides the IDENTICAL one-item state);
the calendar day-cells carry OURS' seeded events (the reference's
zero-data state — the day-cell census rides the CONSTRUCTION, not the
counts). The destructive arms are NEVER fired on either app (the save
is a client-side localStorage write inside a discardable browser
context; the month flips are local state).

## WP-2 — The decode

Every delta root-caused against the standing genus register (the
box-shadow SLOT-COUNT genus — the v4 five-slot variable chain vs the
reference's two/three-slot form, every VISIBLE layer byte-equal · the
outline VERSION FORM + both sub-forms + the color-carrier sub-form
(s178/walk61) · the token-selection genus (the M-81c2 pair —
`border-line`/`bg-surface` vs `border-input`/`bg-popover`,
computed-equal) · the aria-label superset genus (s88-c9, kept) · the
class-order genus · the React useId format genus · the Radix
mount-state offsets) + the DATA-STATE genus (the calendar day-cell
counts at the seeded-vs-zero state) + the v3-semantics lineage
re-check (s11/s96/s98/s123/M-92c1/D-187a3 — the space-y arms at both
surfaces). Target: ZERO live defects, every delta a documented genus
or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178-188 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine) — the pin survey FIRST (the standing
pins: the s29 LEADS_TOOLBAR family + the `savedViewsSelect` width
pin · the s16 CALENDAR_CARD family · the s27 calendar-cells family ·
the s10 INPUT_BASE/SELECT_TRIGGER/BUTTON_BASE pins · the walk53-61
decode freezes):

1. the walk62 decode freeze (the tool's own contract — the two-arm
   OPEN ledger at both axes + the REAL Tab/Arrow drives + the save
   flow + the month-flip round-trips);
2. the Saved-Views select call-site construction freeze (the genuine
   battery gap: the s29 pins hold the toolbar row + the width class,
   never the SelectTrigger call-site's own chain — the trigger + the
   SelectValue + the SelectItem map + the conditional mount);
3. the calendar month-nav call-site construction freeze (the genuine
   gap: the s16 pins hold the navRow container + the s27 pins the
   cells, never the three Button call-sites — the outline variant +
   size="icon" + the aria-labels + the hidden-below-sm Today + the
   Chevron pairing) —
   + THE CURE PINS (RED-first: exactly N RED at birth → the cures →
   GREEN) for every live find the walk decodes.

## WP-4 — Proofs

MUTATION-PROOF (a planted construction regression on a walked
contract → exactly 1 RED → restored → GREEN) · STASH-PROOF (the
round's test block stashed alone → exactly 138/2778 → restored →
138/2778+N) · the walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2778 → 2778+N (the walk62 pins) · badge 2970 → 2970+N
(count-ladder-189.py: the house assert-first idempotent form, the
s187/s188 lessons applied — the head surgery runs BEFORE the ladder,
no retired-block carrier form in the old-forms, both intermediate
forms accepted) · the collateral re-anchors (the SKILL §5.6 census
checks · the F-106a1 layer-axis pin — the s189 layer live, the s188
demoted beneath it at 2778/192 · the s188-era live-tense RED-first
arithmetic site re-anchored) · the docs lockstep (the AGENTS
Session-189 section · the PAD session-189 inventory row · the CLAUDE
page-layout bullet's walk62 tail · the README Tested row's walk62
clause + the badge · the SKILL head surgery [skill-head-189.py,
idempotent] · session_400.md + this plan's execution record + the
worklog entry [Task ID 189]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref faces (the
  Saved-Views select OPEN ours+ref at the desktop axis + the
  calendar month-nav ours+ref pair) + the standard dev-server page
  set for the operator's record.
- The `.env.example` verified against the codebase contract (the
  six-knob family; committed as-is, included in this round's commit
  per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: the 200s ·
  the 11 routes + the robots Sitemap line + the per-route OG/Twitter
  factory).
- The mobile-nav comparison: probe:ref TRUE-390 STANDING (the
  reference's own menu button live — this session's probe re-verified
  it) + the drawer battery GREEN carry the verdict — documented in
  the session record.
- The Tailwind v4 state (the bug-watch): every walk delta decoded
  against the standing genus register — the v3-semantics lineage
  (s11/s96/s98/s123/M-92c1/D-187a3) checked at every arm.

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2778 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING (this session's run) |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-27, session-189)

- **The audit GREEN** — the baseline gate at the shipped s188 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2778 · build · smoke 14/14 ·
  e2e 192/192 (clean first run, 5.6m) · probe:ref STABLE (46bc2d9c) ·
  census MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes + robots
  + manifest 200 · the Tailwind v4 state clean · the operator's
  standing asks verified (env/db placement · the vitest/playwright
  configs · sitemap/SEO · mobile-nav · `.env.example`).
- **The rotation adjudication** — probe:ref STABLE kills the
  fresh-bundle candidate; recharts latest 3.10.1 kills the 4.0 gate;
  the s398 close's named candidates adjudicated by the discovery
  (`scripts/discover-189.ts`): the INSIGHTS arm KILLED (the
  reference's zero-row state persists — rows=1/rowMenus=0/
  insightsTriggers=0, zero calendar chips); the SAVED-VIEWS select +
  the MONTH-NAV LIVE on BOTH apps with every censused face byte-equal
  modulo the documented genera; the topbar-search gate KILLED again
  (populated=0); the plan landed + validated against the codebase,
  executed TDD.
- **WP-1 GREEN** — `scripts/walk62-savedviews-calnav-focus-open.ts`
  (Phase A the Saved-Views select OPEN census — the pre-save absence
  census + the native-prompt save-flow ride + the mounted select's
  geometry ledger + the OPEN listbox census + the apply round-trip;
  Phase B the REAL keyboard drive into the mounted select — the
  SAME-SESSION form [the reference's memory-only view list decoded
  live], the chain STRUCTURALLY IDENTICAL at stop 5 on BOTH + the
  ArrowDown open + the Enter apply; Phase C the calendar month-nav
  census — the header-row geometry + the click round-trips identical;
  Phase C2 the REAL Tab drive through the three nav buttons — landing
  at stop 15 on BOTH, the REAL :focus-visible faces byte-equal on the
  VISIBLE layers; Phase D the phone axis — the select w-full stack
  byte-equal, the Today button hidden below sm on BOTH); the walk
  re-run STABLE (the delta report byte-identical).
- **WP-2 GREEN** — the decode COMPLETE: **ZERO LIVE FINDS** — every
  delta a documented genus (the box-shadow slot-count with every
  VISIBLE layer byte-equal · the ring-offset white zero-extent slot
  [s129] · the outline VERSION FORM + both sub-forms + the
  COLOR-CARRIER sub-form [zero visible pixels on both] · the
  token-selection M-81c2 pairs · the class-order family · our
  aria-label supersets [s88-c9, kept] · our aria-hidden svg superset ·
  the React useId format · the DATA-STATE genera).
- **WP-3 GREEN** — the pin survey first (the s29/s16/s27/s10 pin
  families), then 3 born-green pins in the page-layout battery (the
  walk62 decode freeze · the Saved-Views select call-site
  construction freeze · the calendar month-nav call-site construction
  freeze) — all BORN GREEN, no cure pins, the zero-fix round.
- **WP-4 GREEN** — MUTATION-PROOF (the planted "Prev month" regression
  → exactly 1 RED → restored → GREEN, no residual) · STASH-PROOF (the
  round's test block stashed → exactly 138/2778 [the s188 ship state]
  → restored → 138/2781) · the walk re-run STABLE.
- **WP-5 GREEN** — skill-head-189.py ran FIRST (the SKILL v1.186.0,
  the s188 layer demoted at its ship counts 2778/192, the s189 layer
  live, idempotent; the retired s188 ship line PINNED by the
  generalized D-188a1 doctrine's next member in docs-counts) ·
  count-ladder-189.py (2778 → 2781 [+3 — verified directly at the
  full-suite count, no intermediate form] · badge 2970 → 2973; the
  re-run a verified 0-flip no-op) · the docs lockstep (the AGENTS
  Session-189 section · the PAD s189 inventory row · the CLAUDE
  page-layout bullet's walk62 tail · the README Tested row's walk62
  clause + the badge · session_400.md + this execution record + the
  worklog entry [Task ID 189]).
- **WP-6** — the captures (docs/screenshots/: the Saved-Views select
  OPEN ours+ref at the desktop axis + the calendar month-nav ours+ref
  pair + the standard dev-server page set) + the operator asks all
  verified standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2781 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk62 arms byte-equal on both axes · the REAL Tab chains
  structurally identical (stop 5 both / stop 15 both).
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
