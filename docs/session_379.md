# Session 379 — THE TOPBAR SEARCH FOCUS + SETTINGS SEGMENTED-ACTIVE WALK (walk51) (the session-178 round record)

Date: 2026-10-24 · Rotation: 178 · Agent: main (Z.ai CLI) ·
Plan: `docs/plans/2026-10-24-session178-topbar-search-focus-segmented-active-walk.md`

## The round

The post-177 audit rotation, its rotation trigger the s177 close
(session_377.md): "the remaining unwalked OPEN interiors (the account
menu + the leads Filters popover were s113-walked, the dialogs
s112/s172 — the oldest unwalked OPEN interior is now the topbar search
focus state + the settings segmented tabs' active state, each
adjudicated per ADR-022)". The adjudication of the three candidates:
probe:ref STABLE (`46bc2d9c`, unchanged since s168) kills the
fresh-bundle re-derivation; 4.0 unreleased (3.10.1 the registry's
latest stable) kills the recharts gate — **the two named interiors are
the round**, the ADR-022 doctrine's first maiden application since the
ADR itself.

## The audit (every leg verified live, on a fresh clone)

The intake: `bun install` · a fresh `.env` (64-char AUTH_SECRET +
`file:../db/custom.db`) · the ambient `DATABASE_URL` shadow scrubbed
with `env -u` on every DB-touching command · `db:push` + `db:seed` ·
census MATCH (15/24/10/23/12 + 4 users) · the environmental playwright
chromium-1248 install (a fresh-sandbox intake step, not a code defect).
The baseline gate GREEN at the exact s177 ship state: lint 0/0 · tsc 0 ·
**138/2735** unit · build · smoke **14/14** · e2e **192/192** (5.4m,
foreground) · probe:ref **STABLE** · the desktop + phone sweeps
**CLEAN** (dashboard 0.01% · reports 0.20% — within the standing
floors; the settings picklist-data genus + the login logo genus the
standing explained pair) · the mobile drawer battery **GREEN** at
390×844 · the Tailwind v4 state clean · sitemap 11 routes + robots +
manifest standing · census MATCH. **Zero live defects.**

## The round proper — THE WALK (walk51)

**The coverage gaps were real on both faces**: the pixel sweeps carry
the topbar's RESTING face only (focus-visible fires under REAL keyboard
focus, which no sweep drives); the e2e topbar-search battery pins the
fetch/abort/envelope BEHAVIOR; the s125/s129 cures are source-pinned
but the ACTIVE-state element ledger was never walked in the ADR-022
form. `scripts/walk51-search-focus-segmented-active.ts` — one tool,
two phases: **Phase A** the search focus state (both apps at 1440×900,
REAL keyboard Tab focus — 9 tabs on both apps, the same
`placeholder="Search Anything..."` locator — the resting + focused
computed census: box-shadow · border · bg · caret · the outline triplet
· placeholder · the icon) + **Phase B** the settings segmented active
state (both apps at 1440×900 AND 390×844, the default-active AND the
click-activated second tab: the track + all three triggers'
tag/class/aria/geometry + the active pill's computed
bg/shadow/ink/weight).

**THE DECODE: ZERO LIVE DEFECTS** — every delta a documented genus or
a kept superset, every VISIBLE face byte-equal: the resting
`shadow-sm` re-pin · the focused 1px near-black ring `rgb(10,10,10)
0px 0px 0px 1px` over the same shadow on both apps · the active white
pill `rgb(255,255,255)` + the bare-shadow pair + ink `rgb(10,10,10)` +
weight 500 at BOTH viewports (371px desktop / 117px phone columns,
byte-equal geometry) · the tablist's computed bg/color byte-equal (the
house token idiom `bg-line-soft`/`text-muted-ink` computing exactly
the reference's `bg-muted`/`text-muted-foreground`).

**THE NEW DOCUMENTED GENUS** — v4's `outline-none` is
`outline-style: none` where the reference's v3-era `outline-none` is
`outline: 2px solid transparent`: OURS paints nothing (style none),
the REFERENCE paints nothing visible (transparent) — zero pixels on
both, the shadow/blur/space-y rename family's FOURTH member (the
focused computed triplet 1px/none vs 2px/solid is the genus's own
fingerprint), documented in the AGENTS architecture-facts register +
the CLAUDE v4 bullet. **The box-shadow slot-count genus**: v4 composes
5 slots where the v3-era composes 3 — the extra OURS slots fully
transparent, the reference's zero-extent white slot
`rgb(255,255,255) 0px 0px 0px 0px` clipped inside the border box, the
VISIBLE layers byte-equal in every state. **OUR kept supersets
re-verified live**: the search input's
`aria-label="Search accounts, contacts and leads"` (the reference's
field carries NONE) · the roving tabindex (OURS `[0,-1,-1]` at default
where the reference's is `[-1,-1,-1]` — the s23 accessible fix over its
keyboard-unreachable platform defect) · the s125 `bg-white` literal +
the s129 retired `ring-offset-background` (the reference's own stock
class still carries it — its ride computes `#ffffff`; ours stays
retired).

**The standing-gate adjudication (the plan's §0.3)**: the maiden pass
surfaced ZERO unexplained deltas — the two interiors join the
documented one-time decode register, the standing legs (sweeps + e2e +
source pins) are adjudicated sufficient, **no census extension built**
(the walk tool itself is the standing script, the walk50 pairing form).

**The TDD ledger**: all 5 pins born-green over the zero-defect decode —
the s173 P-p/P-q contract-freeze precedent (the search focus contract —
the 1px keyboard-only ring + no ring-offset · the search aria-label
superset · the segmented active contract — the s125 literal + the s129
retirement re-verified · the roving tabindex · the walk51
standing-script existence freeze). **MUTATION-PROOFS**: three planted
regressions (the focus-ring `ring-1`→`ring-2` · the
`ring-offset-background` replant · the `tabIndex={isActive ? 0 : -1}`
flip) → **exactly 1 RED each** → restored → GREEN. **STASH-PROOF**: the
round's test file stashed alone → exactly **138/2735** (the s177 ship
state) → restored → **138/2740**.

**THE COUNT LADDER**: 2735 → **2740** (+5, all five pins in the
existing page-layout suite — the ADR-017 one-suite doctrine) · SUITES
138 **HELD** · E2E 192 **HELD** (the round is test-only — NO product
code touched; the standing legs re-verified at the audit leg carry the
parity verdict) · badge 2927 → **2932** (count-ladder-178.py: 23 flips,
assert-first, idempotent — the re-run a verified 0-flip no-op) + the
collateral re-anchors LIVE-CAUGHT by the suite itself (the SKILL §5.6
census 212 → 217 checks, the module UNTOUCHED at 1695 · the
docs-counts lockstep · the F-106a1 layer-axis pin — the census policing
the census).

**THE DOCS LEG**: the AGENTS Session-178 section + the v4
architecture-facts register's outline-none member · the PAD session-178
inventory row · the CLAUDE v4-bullet hazard list · the README Tested
row's walk51 clause + the badge · the SKILL **v1.175.0** + H1 +
`last_updated` lockstep + the s178 head layer (skill-head-178.py,
idempotent; the s177 layer comment-demoted at its ship counts 2735/192)
· this record + the plan's execution record + the worklog entry (Task
ID 178).

**THE CAPTURES** 449-452 (`docs/screenshots/`): the two apps' FOCUSED
search inputs at desktop (the parity anchor — the ring's own face,
captured under REAL keyboard focus on both apps, VLM-verified: the thin
dark ring + the "Search Anything..." placeholder + the magnifying
glass icon on BOTH) · the segmented click-activated ACTIVE state at
desktop (VLM-verified: the Defaults tab the raised white pill on the
light gray track) · the segmented ACTIVE state at phone (VLM-verified:
the w-full track, the CRM Configuration pill active).

## The verification ledger

lint 0/0 · tsc 0 · **138/2740** unit · build (the type-gate artifact)
· smoke **14/14** · e2e **192/192** · db census MATCH (15/24/10/23/12
+ 4 users) · probe:ref STABLE (`46bc2d9c`) · the desktop + phone
sweeps CLEAN · the drawer battery GREEN · the walk51 visible faces
byte-equal.

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the
remaining unwalked focus faces (the s129 close's own never-censused
list — the pill-tab focus states on the reports family, plus the
dropdown/select OPEN states beyond the s133/s136 lenses) · the
fresh-bundle re-derivation the day probe:ref trips (walk50 + walk51
pair as the interior face) · the recharts 4.0 `Cell` → `shape` gate
when 4.0 ships.
