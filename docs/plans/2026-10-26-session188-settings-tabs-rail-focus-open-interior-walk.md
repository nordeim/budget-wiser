# The session-188 plan — THE SETTINGS SEGMENTED TAB-BAR FOCUS/OPEN INTERIOR WALK + THE ACCOUNTS-RAIL/LEADS-SEARCH PAGE-ARMS SIBLING (walk61)

Date: 2026-10-26 · Rotation: 188 ·
Task: audit + validate the shipped session-187 state (commit `c36c5f4` +
the owner's transcript commit `f1a0a8a` — the session_396/397 transcripts
are this round's rotation trigger), then execute the next-rotation
candidates the s396 close names (the settings Data-tab's OWN deeper
focus faces — the tab-bar segmented focus faces never walked · the
account/leads/reports page-level interactive arms under ADR-022 — the
s18/s25-era constructions never re-walked live), plus the round-specific
operator asks (env/db placement re-verification · the vitest/playwright
config standing check · the sitemap/SEO re-verification · the
mobile-nav two-app comparison · the Tailwind v4 bug-watch · the
`.env.example` inclusion · the dev-server captures), TDD-first, align
every doc, push to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication) — DONE

The baseline gate at the shipped s187 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2773** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.7m) · probe:ref
STABLE (`46bc2d9c` — the bundle md5 unchanged) · db census MATCH
(15/24/10/23/12 + 4 users at `<repo>/db/custom.db`, the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching
command — the F-123a1 doctrine) · sitemap 11 routes + robots +
manifest 200 (smoke check 12).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s396 close's named candidates**, adjudicated by the discovery probe
(`scripts/discover-188.ts` + the micro-probe
`scripts/probe-leads-search-and-tab-outline.ts`, the discovery record):

- **The settings segmented tab-bar's focus faces (the s396 close's
  FIRST-named candidate) — LIVE, BOTH APPS, rich arms**: the /settings
  strip (CRM Configuration | Defaults | Data — the s23-era
  construction, `TABS_SEGMENTED` pinned at its class strings since
  s12/s125/s129) byte-equal on every resting face (strip `288,189
  1120x36` bg `rgb(245,245,245)` radius 8 both; the three triggers
  byte-equal at `292,193 371x28` / `663,193 371x28` / `1033,193
  371x28`; the active face bg `rgb(255,255,255)` + ink `rgb(10,10,10)`
  byte-equal; the inactive ink `rgb(115,115,115)` byte-equal).
  **ONE CANDIDATE LIVE FIND — the FOCUS OUTLINE**: at programmatic
  `.focus()` the reference paints `outline: 3px solid
  rgba(10,10,10,0.5)` on ALL THREE triggers where OURS paints `3px
  none` — the walk's REAL-keyboard drive (the walk54/58/60 doctrine:
  the programmatic face is never the true face) + the REAL mouse-click
  face (the walk57 mouse-borne precedent) must adjudicate whether
  this is a genuine live find (a visible face delta) or a
  programmatic-artifact genus. The full class chains: REF carries
  `ring-offset-background` + `data-[state=active]:bg-background` +
  the trailing `data-[state=active]:shadow`; OURS the s129-retired
  offset arm + the F-125c1 literal `bg-white` + the leading shadow —
  all documented genera; the computed resting faces byte-equal.
- **The accounts rail's three filter selects (the SECOND-named
  candidate's accounts leg) — LIVE, BOTH APPS**: the s28-era
  construction (Filter by owner/industry/revenue range, each
  `SelectTrigger w-full` under a Label) — resting faces byte-equal
  (`270x36` at `1113,376`, border `1px solid rgb(229,229,229)` on
  all three), the `.focus()` ring visible-layers byte-equal (the
  ring-offset white zero-extent slot the standing s129 genus), the
  OPEN listbox construction byte-equal (radius 6, popper `272px`
  wide) with the DATA-STATE item-count genus (REF `items(1)=[All
  Owners]` at its zero-data state vs OURS `items(5)` on the seeded db
  — the walk compares the CONSTRUCTION, the owner lists are data).
  OURS carries the aria-labels + the REF does not (the s88-c9
  superset genus, kept — the axe battery requires them).
- **The leads toolbar search (the SECOND-named candidate's leads leg)
  — LIVE, BOTH APPS**: the s29-era construction, confirmed by the
  loose-census micro-probe (the reference's input carries NO
  aria-label — the strict discovery locator missed it; the
  placeholder `Search leads...` byte-equal, the class chain
  `border-input` vs `border-line` the token genus + OURS'
  `md:text-sm text-ink` arms needing the full-chain decode). The
  search input's focus face never walked (walk56 covered the Filters
  popover OPEN; the toolbar search never). The REF's toolbar
  buttons (Export / New Lead / Filters) carry no aria-labels (the
  s88-c9 superset genus).
- **The reports pills + selects (the s396 close's re-walk candidate) —
  LIVE, byte-equal modulo the documented genera** (the discovery
  censused all five pills + four select triggers: the resting faces
  byte-equal incl. the active blue `rgb(239,246,255)`/`rgb(29,78,216)`
  pair; the y-offset `538` vs `506` the walk52-documented DATA-STATE
  genus — OURS' seeded KPI rows; the ring-offset white slot + the
  box-shadow slot-count + the aria-label supersets the standing
  genera). The re-walk rides the walk's Phase E leg.
- **The density selects — KILLED**: the reference's accounts toolbar
  density select + Table/Cards switcher RETIRED upstream (F-147c3,
  walk38) — the toolbar is [search + Export CSV] only; the candidate
  is dead construction.
- **The standing Edit-family re-check — STILL KILLED**: the reference
  carries ZERO rows on /contacts, /leads, /accounts (rows=1 — the
  empty-state row alone, rowMenus=0) + ZERO calendar chips — the
  W7/wce/Mke edit dialogs have no trigger there; the candidate stays
  suspended (the discover-184/185/186/187/188 census is the standing
  re-check; it returns the day the reference carries rows).
- **The topbar-search dropdown arm (the standing conditional gate) —
  STILL KILLED**: `populated=0` on BOTH apps at the seeded-term leg
  (the placeholder `Search Anything...` byte-equal; no listbox/popover/
  dropdown renders on either app) — the s392/394/396 gate ("if the
  reference's own suggestions ever populate") FAILS; the candidate
  stays suspended with the s32 dead-stub doctrine standing.

## WP-1 — The walk tool

`scripts/walk61-settings-tabs-rail-focus-open.ts` (the walk53-60
ledger form over the settings tab-bar's focus/open states + the
accounts-rail/leads-search siblings at BOTH axes):

- **Phase A — the settings tab-bar OPEN census at the desktop axis
  1440×900**: the strip's geometry ledger (the box/bg/radius/border
  + the grid-cols-3 construction), the DFS census (the three
  triggers' role/id/aria-selected/aria-controls wiring), the three
  triggers' resting faces (bg/color/box/cls — the active + inactive
  pair), the ACTIVE data-state arm census (the shadow pair + the
  literal bg-white), the click-through round-trip (Defaults → Data →
  CRM Configuration — safe local state, no writes; the panel mount
  census at each stop), the strip-to-content gap measurement (the
  s23-era live-measured 24px).
- **Phase B — the REAL keyboard Tab drive** (the walk54/58/60 form):
  from page load through the sidebar (8 stops) + the topbar into the
  strip — each stop's REAL `:focus-visible` face (the mounted ring
  census: the outline + the ring box-shadow chain), the drive
  reaching ALL THREE triggers, the ArrowLeft/Right keyboard model
  (the s23 tabs-aria contract: the automatic activation + wrap).
- **Phase B2 — the REAL mouse-click face** (the walk57 mouse-borne
  precedent): a real `click()` on the Defaults trigger on BOTH apps —
  the `:focus`-without-`:focus-visible` computed face — the outline
  decode (does the reference paint the 3px outline on a real click?
  ours?) + the click's data-state flip census.
- **Phase C — the accounts rail sibling**: the three selects'
  geometry ledger (the rail stack + the Labels + the triggers' boxes),
  the triggers' resting + REAL-focus faces, the OPEN listbox census
  (the construction classes + the radius + the item vocabulary — the
  DATA-STATE genus documented: REF 1 item vs OURS 5 at the seeded db),
  the REAL-keyboard open drive (the walk55 highlight form on the
  first select), the X-close round-trip. The rail's own construction
  (`hidden lg:block w-80` + the stack).
- **Phase D — the leads search sibling**: the search input's resting
  + REAL-focus faces (the ring chain) + the toolbar geometry (the
  search row + the Filters row) + the Filters trigger's resting face
  (walk56's OPEN face re-censused at rest), the Export/New Lead row.
- **Phase E — the reports pills/selects re-walk leg**: the five pills'
  resting + REAL-focus faces + the four select triggers' resting +
  REAL-focus faces (the walk52/55 re-check on the live tree — the
  discovery censused them programmatic; the walk re-drives the REAL
  keyboard through the first pill + the first select).
- **Phase F — the phone axis 390×844**: the settings strip (the
  s106-seeded form — the strip + the grid) + the leads search (the
  toolbar stacks) + the accounts rail absence (display:none below lg
  — the reference's own behavior, the documented phone-axis kill) +
  the phone REAL-keyboard drive into the strip.

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db). The DATA-STATE discipline: the
owner/industry item lists + the KPI row offsets are data; the walk
compares the CONSTRUCTION faces on both apps. The destructive arms
are NEVER fired on either app (the tab flips are local state; the
rail selects' value writes ride OURS only; the leads search input's
fill/clear is inert).

## WP-2 — The decode

Every delta root-caused against the standing genus register (the
box-shadow SLOT-COUNT genus — the v4 five-slot variable chain vs the
reference's two/three-slot form, every VISIBLE layer byte-equal · the
outline VERSION FORM + both sub-forms (s178) · the token-selection
genus (the M-81c2 pair — `border-line`/`text-ink` vs
`border-input`/`text-foreground`, computed-equal) · the ring-offset
genus (the s129 retirement — ours stays retired, the reference's
zero-extent white slot rides its own stock class) · the class-order
genus (the lucide `h-4 w-4`/`w-4 h-4` order · the strip's
`grid w-full`/`w-full grid` position · the trigger's shadow/arm
order) · the aria-label superset genus (s88-c9, kept) · the React
useId format genus · the Radix mount-state offsets) + the DATA-STATE
genus (the owner lists + the KPI row offsets) + the focus-outline
candidate (the Phase B/B2 adjudication: a genuine live find cured, or
a programmatic-artifact genus documented). Target: ZERO live defects,
every delta a documented genus or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178-s187 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine) — the pin survey FIRST (the standing
pins: the s12/s125/s129 TABS_SEGMENTED family · the s23 tabs-aria
wiring · the s28 account-surfaces rail row · the s29 LEADS_TOOLBAR
pl-10 · the s10 INPUT_BASE/BUTTON_BASE pins · the walk53-60 decode
freezes):

1. the walk61 decode freeze (the tool's own contract — the two-app
   settings tab-bar OPEN ledger at both axes + the REAL Tab/Arrow
   drives + the mouse-click face + the rail/leads/reports siblings'
   decode);
2. the settings tab-bar call-site construction freeze (the genuine
   battery gap: the s23 pins hold the WIRING + the s12 constant the
   class strings, never the settings page's OWN segmented call-site
   — the variant + cols + the three ids + the space-y-6 wrapper);
3. the accounts rail-selects construction freeze (the genuine gap:
   the s28 pins hold the row/rail geometry, never the three
   SelectTrigger sites' construction + the Label pairing) —
   + the leads-search construction freeze (the genuine gap: the
   s29 pins hold the pl-10 arm, never the input's OWN call-site
   construction) —
   + THE CURE PINS (RED-first: exactly N RED at birth → the cures →
   GREEN) for every live find the walk decodes.

## WP-4 — Proofs

MUTATION-PROOF (a planted construction regression on a walked
contract → exactly 1 RED → restored → GREEN) · STASH-PROOF (the
round's test block stashed alone → exactly 138/2773 → restored →
138/2773+N) · the walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2773 → 2773+N (the walk61 pins) · badge 2965 → 2965+N
(count-ladder-188.py: the house assert-first idempotent form) · the
collateral re-anchors (the SKILL §5.6 census checks · the F-106a1
layer-axis pin — the s188 layer live, the s187 demoted beneath it at
2773/192 · the s187-era live-tense RED-first arithmetic site
re-anchored) · the docs lockstep (the AGENTS Session-188 section ·
the PAD session-188 inventory row · the CLAUDE page-layout bullet's
walk61 tail · the README Tested row's walk61 clause + the badge ·
the SKILL head surgery [skill-head-188.py, idempotent] ·
session_398.md + this plan's execution record + the worklog entry
[Task ID 188]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref faces (the
  settings tab-bar ours+ref at the desktop axis — the pair decode —
  + the phone-axis pair + the accounts rail pair) + the standard
  dev-server page set for the operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
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
| vitest + playwright suites via the config files | STANDING (verified) | 138/2773 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING (this session's run) |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-26, session-188)

- **The audit GREEN** — the baseline gate at the shipped s187 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2773 · build · smoke 14/14 ·
  e2e 192/192 (clean first run, 5.7m) · probe:ref STABLE (46bc2d9c) ·
  census MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes + robots
  + manifest 200 · the Tailwind v4 state clean · the operator's
  standing asks verified (env/db placement · the vitest/playwright
  configs · sitemap/SEO · mobile-nav · `.env.example`).
- **The rotation adjudication** — probe:ref STABLE kills the
  fresh-bundle candidate; recharts latest 3.10.1 kills the 4.0 gate;
  the s396 close's named candidates adjudicated by the discovery
  (`scripts/discover-188.ts` + the micro-probe
  `scripts/probe-leads-search-and-tab-outline.ts`): the FIRST-named
  (the settings tab-bar focus faces) LIVE on BOTH apps with the
  construction byte-equal on the resting faces; the SECOND-named (the
  accounts rail selects + the leads search + the reports re-walk)
  LIVE with every censused face byte-equal modulo the documented
  genera; the density-selects arm KILLED (F-147c3); the topbar-search
  gate KILLED again (populated=0); the Edit-family re-check still
  zero-row (suspended); the plan landed + validated against the
  codebase, executed TDD.
- **WP-1 GREEN** — `scripts/walk61-settings-tabs-rail-focus-open.ts`
  (Phase A the settings tab-bar OPEN census; Phase B the REAL keyboard
  Tab drive into the strip — 13 stops BOTH apps STRUCTURALLY IDENTICAL
  + the ArrowRight landing byte-equal + the REAL :focus-visible ring
  byte-equal on the visible layers; Phase B2 the REAL mouse-click face
  — 3px none on BOTH; Phase C the accounts rail sibling; Phase D the
  leads search sibling; Phase E the reports pills/selects re-walk leg;
  Phase F the phone axis); the walk re-run STABLE (the delta report
  byte-identical).
- **WP-2 GREEN** — the decode COMPLETE: **ZERO LIVE FINDS on the
  walked surfaces** — every delta a documented genus (the box-shadow
  slot-count with every VISIBLE layer byte-equal · the ring-offset
  white zero-extent slot [s129] · the outline VERSION FORM + both
  sub-forms + the NEW COLOR-CARRIER sub-form the decode adds to the
  register (zero visible pixels on both — currentColor on OURS vs the
  reference's platform rgba(10,10,10,0.5)) · the token-selection
  M-81c2 pairs (border-line/text-ink vs border-input/inherited — the
  S10-2 deliberate carrier) · the class-order family · our aria-label
  supersets [s88-c9, kept] · the React useId format · the DATA-STATE
  genera [the rail item counts + the reports y-offset]).
- **WP-3 GREEN** — the pin survey first (the s12/s125/s129
  TABS_SEGMENTED family · the s23 tabs-aria wiring · the s28
  account-surfaces rail · the s29 LEADS_TOOLBAR pl-10 · the s10
  INPUT_BASE; the settings page's OWN call-site, the three rail
  SelectTrigger sites, and the leads search call-site never pinned),
  then 4 born-green pins in the page-layout battery (the walk61 decode
  freeze · the settings tab-bar call-site construction freeze · the
  accounts rail-selects construction freeze · the leads-search
  call-site construction freeze) + **THE D-188a1 CURE PIN (RED-first:
  exactly 1 RED at birth → the cure → GREEN — the round's ONE live
  find a DOCS head defect: the retired session-186 SKILL-head block's
  corrupted ship line, the s187 first-pass residue that shipped
  undetected at c36c5f4/f1a0a8a; the s171-fix doctrine restored +
  PINNED + GENERALIZED to the retired s187 block after the
  count-ladder re-run's own corruption was caught by the extended
  pin — the ladder's retired-block carrier form then REMOVED from the
  accepted old-forms)**.
- **WP-4 GREEN** — MUTATION-PROOF (the planted D-188a1 replant →
  exactly 1 RED → restored → GREEN, no residual) · STASH-PROOF (the
  round's test block stashed → exactly 138/2773 [the s187 ship state]
  → restored → 138/2778) · the walk re-run STABLE.
- **WP-5 GREEN** — count-ladder-188.py (2773 → 2778 [+5: the 4 walk61
  pins + the NEW D-188a1 pin — the first pass carried +4 before the
  +5 truth was caught at the full-suite count, the s187 lesson
  repeating; the corrected script accepts both intermediate forms,
  the docs land on 2778/2970, the re-run a verified 0-flip no-op
  across a triple run) · badge 2965 → 2970 + skill-head-188.py (the
  SKILL v1.185.0, the s187 layer demoted at its ship counts 2773/192,
  the s188 layer live, idempotent; the s187 lesson applied: the head
  surgery ran BEFORE the ladder — the demotion a verbatim move, the
  ladder's SKILL-head flip a no-op, the retired blocks untouched and
  now PINNED) · the docs lockstep (the AGENTS Session-188 section ·
  the PAD s188 inventory row · the CLAUDE page-layout bullet's walk61
  tail · the README Tested row's walk61 clause + the badge ·
  session_398.md + this execution record + the worklog entry [Task ID
  188]).
- **WP-6** — the captures (docs/screenshots/: the settings tab-bar
  ours+ref at the desktop axis + the phone-axis pair + the accounts
  rail pair) + the operator asks all verified standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2778 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk61 settings + rail/leads + reports arms byte-equal on both
  axes · the REAL Tab chains structurally identical (13 stops both) ·
  the captures VLM-verified.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
