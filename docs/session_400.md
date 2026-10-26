# Session 400 — THE LEADS SAVED-VIEWS SELECT OPEN FACES + THE CALENDAR MONTH-NAV ARMS (walk62) (the session-189 round record)

Date: 2026-10-27 · Rotation: 189 · Agent: main (Z.ai) ·
Plan: `docs/plans/2026-10-27-session189-savedviews-select-calendar-monthnav-walk.md`

## The round

The post-188 audit rotation. Its rotation trigger THE OWNER'S NEWEST
COMMIT (`2c2c703` — the session_398/399 transcripts, the s188 round's
own execution record). The s398 close's named next-rotation candidates,
adjudicated by the discovery probe (`scripts/discover-189.ts`): the
account INSIGHTS dialog **KILLED** (the reference's zero-row state
persists — rows=1 the empty-state row alone, rowMenus=0,
insightsTriggers=0 on /contacts, /leads, /accounts + zero calendar
chips; the Ece dialog rides an account row's ⋮ menu that does not
exist there; the candidate STAYS suspended); the leads SAVED-VIEWS
select's open faces **LIVE on BOTH apps** (the s29-era construction:
the conditionally-mounted select, the NATIVE `prompt("Enter view
name:")` save flow, the localStorage `neo-crm.leads.views` seam —
the select byte-equal at `428,443 192x36` desktop + `32,482 326x36`
phone, the OPEN listbox byte-equal at `428,483 194x42` radius 6 with
the one-item vocabulary identical, the apply round-trip identical);
the calendar MONTH-NAV arms **LIVE on BOTH apps** (the s27-era
construction, data-independent, reachable at the reference's
zero-data state — the heading byte-equal at `313,374 183x32`, the
three outline buttons byte-equal at `877/921/1003,372
36x36/75x36/36x36`, the flip round-trips identical); the
topbar-search gate KILLED again (`populated=0` on both); the probe
STABLE at `46bc2d9c` kills the fresh-bundle candidate; the registry's
`latest` 3.10.1 (verified live) kills the recharts 4.0 gate.

## The audit (the baseline + the operator's standing asks)

The baseline gate GREEN at the exact s188 ship state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2778** · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.6m) · probe:ref
STABLE · db census MATCH (15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`, the ambient `DATABASE_URL` shadow scrubbed with
`env -u` on every DB-touching command — the F-123a1 doctrine) ·
sitemap 11 routes + robots + manifest 200 (smoke check 12).

The operator's round-shaped asks, all verified STANDING: the `.env`
`DATABASE_URL="file:../db/custom.db"` with the `db/` folder at the
repo root (the fresh intake) · the vitest + playwright config files
(138/2781 unit + the 192-check e2e battery re-verified this session)
· the sitemap + SEO surface (the 11-route `/sitemap.xml` +
`/robots.txt` with its Sitemap line + the installable
`/manifest.json`, all re-verified 200) · the mobile-nav comparison
(probe:ref's TRUE-390 census STANDING — the reference's own menu
button live; OURS the Radix Sheet superset) · **the Tailwind v4 state
— the walk62 decode CLEAN on every arm** (every delta root-caused
against the standing genus register; the v3-semantics lineage
[s11/s96/s98/s123/M-92c1/D-187a3] re-checked at both arms — all
byte-equal) · the `.env.example` verified against the six-knob
contract and included in the round's commit.

## The round proper — THE WALK (walk62)

The walk (`scripts/walk62-savedviews-calnav-focus-open.ts`, the
walk53-61 ledger form over the two LIVE arms at BOTH axes): Phase A
the Saved-Views select OPEN census — the pre-save absence census (REF
0 comboboxes at its zero-data state vs OURS 24 inline row selects at
the seeded db — the DATA-STATE genus) + the save-flow ride (the
Filters popover → Save View → the NATIVE prompt answered — the s29
live-verified contract, the browser context discarding the storage) +
the mounted select's geometry ledger + the OPEN listbox census + the
apply round-trip (the trigger text `Walk62 View` on both,
listbox-closed on both); Phase B the REAL keyboard drive into the
mounted select — the SAME-SESSION form (NO reload: the reference
keeps its view list IN MEMORY ONLY — ours persists to localStorage,
the kept superset; a reload kills the REF's select while OURS'
re-mounts) — the chain **STRUCTURALLY IDENTICAL (5 stops: Export →
New Lead → search → Filters → the select, reached at stop 5 on BOTH)**
+ the ArrowDown open (radius 6, items 1, highlight `Walk62 View`
both) + the Enter apply; Phase C the calendar month-nav census — the
header-row geometry ledger + the three buttons' resting faces + the
DFS ledger + the click round-trip (prev → `September 2026`; today →
`October 2026` — local state, NO writes, identical both) + the
month-flip grid re-census; Phase C2 the REAL keyboard Tab drive
through the three nav buttons (**landing at stop 15 on BOTH**, the
tag+geometry sequences STRUCTURALLY IDENTICAL, the REAL
`:focus-visible` faces byte-equal on the VISIBLE layers — the 1px
near-black ring + shadow-sm); Phase D the phone axis 390×844 (the
select w-full stack byte-equal at `32,482 326x36`; the Today button
hidden below sm on BOTH — the s27 live pin, 2 nav buttons on each).
The walk re-run STABLE (the delta report byte-identical).

**ZERO LIVE FINDS** — every delta a documented genus (the box-shadow
SLOT-COUNT with every VISIBLE layer byte-equal · the ring-offset white
zero-extent slot [s129] · the outline VERSION FORM + both sub-forms +
the COLOR-CARRIER sub-form [zero visible pixels on both] · the
token-selection M-81c2 pairs [border-line/bg-surface vs
border-input/bg-popover, computed-equal] · the class-order family
[the outline-button ring-position pair] · our aria-label supersets
[s88-c9, kept — the select trigger + both nav icons] · our
aria-hidden svg superset · the React useId format · the DATA-STATE
genera). The round: the second consecutive zero-fix freeze-pin
session (the s134/s188 precedent) — no cure pins, the battery
entirely born-green.

**The TDD ledger**: the pin survey first (the s29 LEADS_TOOLBAR
family + the `savedViewsSelect` width pin · the s16 CALENDAR_CARD
family · the s27 calendar-cells family · the s10 INPUT_BASE/
SELECT_TRIGGER/BUTTON_BASE pins), then 3 born-green pins in the
page-layout battery — the walk62 decode freeze · the Saved-Views
select call-site construction freeze (the genuine battery gap: the
s29 pins hold the toolbar row + the width class, never the
SelectTrigger call-site's own chain) · the calendar month-nav
call-site construction freeze (the genuine gap: the s16 pins hold
the navRow container + the s27 pins the day cells, never the three
Button call-sites).

**MUTATION-PROOF**: the planted "Prev month" regression → **exactly
1 RED** → restored → GREEN, no residual. **STASH-PROOF**: the
round's test block stashed → exactly **138/2778** (the s188 ship
state) → restored → **138/2781**.

**The count ladder**: 2778 → **2781** (+3 — verified directly at the
full-suite count, no intermediate form) · SUITES 138 HELD · E2E 192
re-verified (the round: ZERO product-code touches — the MODULE line
count 1718 HELD) · badge 2970 → **2973** + skill-head-189.py (the
SKILL **v1.186.0**, the s188 layer demoted at its ship counts
2778/192, the s189 layer live, idempotent — the head surgery ran
BEFORE the ladder, the retired blocks untouched and now the retired
s188 ship line PINNED by the generalized D-188a1 doctrine's next
member; count-ladder-189.py: assert-first, idempotent, the re-run a
verified 0-flip no-op).

## The verification ledger

lint 0/0 · tsc 0 · **138/2781** unit · build (the type-gate artifact)
· smoke **14/14** · e2e **192/192** · db census MATCH · probe:ref
STABLE (`46bc2d9c`) · the walk62 Saved-Views + month-nav arms
byte-equal on both axes · the REAL Tab chains structurally identical
(the select at stop 5 both; the nav at stop 15 both) · the month-flip
round-trips identical · the captures: the round's ours+ref faces.

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the
remaining unwalked interiors at the reference's zero-data state (the
**reports SAVE-CUSTOM-VIEW dialog** — the s25-era construction, its
open faces never walked under ADR-022 · the **dashboard
follow-up-rows checkbox arms** — the s27-era construction, its
interactive faces never walked · the **activities Completed-tab's
row-action buttons** — the s109-era mobile-guard construction never
re-walked at the desktop axis) · the standing conditional gates (the
Insights dialog + the Edit-family dialogs the day the reference
carries rows again — the discover-189 census is the standing
re-check, one probe leg · the topbar search's dropdown arm the day
the reference's own suggestions populate · the fresh-bundle
re-derivation the day probe:ref trips · the recharts 4.0 gate when
4.0 ships).
