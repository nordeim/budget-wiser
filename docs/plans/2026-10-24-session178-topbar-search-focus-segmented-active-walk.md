# The session-178 plan — THE TOPBAR SEARCH FOCUS + SETTINGS SEGMENTED-ACTIVE WALK (walk51)

Date: 2026-10-24 · Rotation: 178 ·
Task: audit + validate the session-177 ship (the drawer interior re-walk),
then execute the two oldest unwalked OPEN/ACTIVE interiors the s177 close
names — the topbar search focus state + the settings segmented tabs' active
state — under the ADR-022 interior re-walk doctrine, TDD-first wherever the
walk surfaces code, align every doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

The workspace re-cloned fresh at `29b7954` (the s177 ship + the owner's
session-376 transcript already in the tree). The intake: `bun install` · a
fresh `.env` (64-char AUTH_SECRET + `file:../db/custom.db`) · the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching command ·
`db:push` + `db:seed` · census MATCH (15/24/10/23/12 + 4 users) · playwright
chromium-1248 (the environmental install — a fresh-sandbox intake step, not
a code defect).

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN (full strictness, tsc 0) |
| unit | GREEN **138/2735** (the s177 ship state, exact) |
| build | GREEN (the type-gate build) |
| smoke | GREEN **14/14** (incl. sitemap + robots + manifest 200) |
| e2e | GREEN **192/192** (5.4m, foreground) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c` — unchanged since the s168 fingerprint) |
| drift gates | the desktop + phone sweeps **CLEAN live** (dashboard 0.01% · reports 0.20% — within the standing floors; settings picklist-data genus + login logo genus the standing explained pair) |
| mobile drawer | the battery **GREEN** at 390×844 (locks engage/release, focus trap, ESC, resize-past-md auto-close) |
| Tailwind v4 state | clean (`@tailwindcss/postcss` ^4.3.3 · CSS-first `@theme`, no JS config, the shadow/blur re-pins standing) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

**Zero live defects** — the audit verdict matches the s177 round's. The
register is clean of named code-level candidates; the round is therefore
the ADR-022 re-walk the s177 close names first.

### 0.1 The rotation trigger

The s177 close (session_377.md): "The next-rotation candidates: the
remaining unwalked OPEN interiors (the account menu + the leads Filters
popover were s113-walked, the dialogs s112/s172 — **the oldest unwalked
OPEN interior is now the topbar search focus state + the settings
segmented tabs' active state, each adjudicated per ADR-022**) · the
fresh-bundle re-derivation the day probe:ref trips (walk50 pairs with it
as the interior face) · the recharts 4.0 `Cell` → `shape` gate when 4.0
ships." The adjudication of the three:

| Candidate | Verdict | Evidence |
|---|---|---|
| **the topbar search focus state + the settings segmented active state** | **THIS ROUND** | The coverage gap is real on both faces. The search input's RESTING construction is pinned three ways — `SEARCH_INPUT.extras` + `INPUT_BASE.focusRing` (source pins, s10/s73), the pixel sweeps (both viewports, every page — the topbar rides all 10 app pages), the e2e topbar-search pins (behavioral: the fetch/abort/envelope family) — but the FOCUSED computed state (does the 1px `focus-visible:ring-ring` fire identically? what does `--color-ring` resolve to on each app? the border/caret/placeholder under focus) has NEVER been live-censused on this surface; the s129 close itself flagged "the pill-tab surfaces' focus states have never been live-censused", and the search is the other never-censused focus face. The settings segmented tabs' ACTIVE state last rode the s114/s125/s129 lens 48+ sessions ago (the bg-white literal + the retired ring-offset are the standing cures); the ADR-022 consequences reset the re-walk list to the longest-unwalked surfaces — the s177 close names exactly these two. |
| the fresh-bundle re-derivation | NOT TRIPPED | probe:ref STABLE (`46bc2d9c`, unchanged since s168) — the reference has shipped no new bundle. |
| the recharts 4.0 gate | NOT RIPE | 3.10.1 is the registry's latest stable; 4.0 is unreleased (the `Cell` → `shape` refactor stays the documented future gate, ADR-021). |

### 0.2 The walk's objects — what "focus state" and "active state" mean here

**The topbar search focus state.** The search input is the STOCK Input
base (`INPUT_BASE`: `text-base md:text-sm bg-transparent text-ink
placeholder:text-muted-ink transition-colors focus-visible:outline-none
focus-visible:ring-1 focus-visible:ring-ring` + the file: latent family)
composed with `SEARCH_INPUT.extras` (`pl-10 bg-gray-50 border-gray-200`).
Focus is KEYBOARD-ONLY (`focus-visible:` — a mouse click fires no ring on
either app, byte-verified at s73 on the Input/Button bases). Never
verified against the live reference: the focused input's computed
`box-shadow` (the 1px ring's exact color — `--color-ring` on our `@theme`
vs the reference's own resolution), the border color under focus, the
`caret-color`, the placeholder ink, and the icon/geometry stasis (the
absolute `Search` glyph at `left-3 top-1/2`). The walk drives REAL
keyboard focus (Tab from a known focus origin, never
`page.focus()` — the honest focus-visible form) on both apps at
1440×900 (the search block is `hidden sm:block`-family — desktop-only)
and dumps the focused element ledger + the computed-style census.

**The settings segmented tabs' active state.** The `/Settings` Tabs
region (`variant="segmented" cols={3}`, the config/defaults/data trio)
rides `TABS_SEGMENTED.track` (`h-9 items-center justify-center rounded-lg
bg-line-soft p-1 text-muted-ink grid w-full`) + `TABS_SEGMENTED.trigger`
(the active arm `data-[state=active]:shadow data-[state=active]:bg-white
data-[state=active]:text-foreground` — the s125 bg-white literal + the
s129 retired ring-offset the standing cures). The ARIA contract (ids,
aria-controls/selected, the roving-tabindex superset) is s23-pinned and
s129-walked; the ACTIVE-state element ledger — the active trigger's
geometry inside the track (the raised white pill's box), its computed
`background-color` (the literal vs the reference's `bg-background`
resolution), its computed `box-shadow` (the bare `shadow` — the family
AGENTS documents as matching both sides), its ink, AND the same census on
a SECOND activated tab (the click-driven `data-state=active` transition —
the active state is a STATE, not a static face) — has never been walked
in the ADR-022 element-ledger form. The walk dumps both apps' ledgers at
1440×900 AND 390×844 (the track is `w-full` — the phone geometry is its
own face), with the default-active tab AND a click-activated tab.

### 0.3 The deferral register (open decisions, resolved with rationale)

| Candidate | Verdict | Rationale |
|---|---|---|
| The walk's data posture | SEEDED (ours) | Both surfaces are data-free constructions (the search input's resting face, the tabs' track) — the seeded dev DB avoids the zero-data reseed cycle; the reference's own surfaces are data-free by construction. The search RESULTS dropdown is OUR documented functional superset (the reference ships no results dropdown — the s7 model) and is therefore NOT a walk face; the walk's search face is the input + icon + focus state only. |
| One tool or two | **ONE TOOL, two phases** | Both surfaces are small DOMs (the search block ~6 elements, the tabs region ~8); one `walk51` script with a phase per surface keeps the standing-scripts register lean (walk50's own precedent: one script, one posture). |
| The reference login posture | STORAGESTATE REUSE | The sweep-state pair (the s162 login consolidation) — ONE reference login, state reused; the login rate-limit wall (L-158c3) never tripped. |
| New e2e | ONLY IF THE WALK FINDS A FIXABLE DEFECT | The standing 192 carries the surfaces' behavioral faces (the e2e topbar-search battery + the settings-mobile walk); an interior fix without a behavioral face adds unit/source pins, not e2e. |
| The pill-tab focus states (the reports family) | NAMED, NOT THIS ROUND | The s129 close's own never-censused list; the round's two faces are the s177 close's named pair — the pill-tab face joins the NEXT re-walk register (recorded in the round's close). |
| The standing-gate productization | DECIDED BY THE WALK'S YIELD | The s177 adjudication form: if the maiden pass surfaces zero unexplained deltas, the two interiors join the documented one-time decode register + the standing legs (sweeps + e2e + source pins) are adjudicated sufficient — no census extension built speculatively. If it surfaces drift, the drift's cure decides the leg's form. |

## 1. The work packages

### WP-1 — the walk51 tool (`scripts/walk51-search-focus-segmented-active.ts`)

The walk50 phased-idiom form, one tool two phases: boot or reuse the dev
server (ours, seeded, `DATABASE_URL` guarded at the boot site); the
reference rides the sweep-state storageState pair (ONE reference login).

- **Phase A — the search focus state** (both apps at 1440×900,
  `/Dashboard`): click a neutral focus origin (the topbar container) to
  establish the tab order, then REAL-keyboard Tab into the search input;
  wait the transition (`transition-colors`); dump (a) the focused input's
  element ledger row (tag · class · aria · box) + the computed-style
  census — `box-shadow`, `border-color`, `background-color`,
  `caret-color`, `color`, the `::placeholder` color, `outline-width` —
  (b) the same census on the RESTING input (pre-focus, the s73
  re-verification face), (c) the `Search` icon's computed face (position,
  size, color), (d) the focus-visible origin check (which element holds
  focus, `document.activeElement`'s tag/aria).
- **Phase B — the segmented active state** (both apps at 1440×900 AND
  390×844, `/Settings`): dump (a) the default state's ledger — the
  wrapper, the tablist track, all three triggers (tag · class · aria ·
  box) + the ACTIVE trigger's computed census (`background-color`,
  `box-shadow`, `color`, `font-weight`), (b) the CLICK-activated second
  tab's ledger + census (the state transition is part of the face), (c)
  the track's own geometry (the `p-1` + `h-9` rhythm, the grid columns).

### WP-2 — the decode + classification

Every delta root-caused against both apps' live DOMs, never guessed:
parity match · documented genus (the kept supersets — the roving
tabindex, the aria-label on the search, the e2e-pinned construction —
each re-verified as invisible) · live defect → the TDD queue. The
expected-but-unverified faces the walk adjudicates: the focused ring's
exact color + width on both apps · the border under focus · the caret
ink · the active pill's `background-color` (the literal-vs-token
resolution) + its `box-shadow` (the bare-shadow family) · the active
ink + weight · the track geometry at both viewports · the ARIA face
(aria-selected/data-state/tabindex — the roving-tabindex superset). The
v4 hazard lens (ADR-022's standing rule): any space-y group inside
either surface's construction (the settings Tabs wrapper is `space-y-6`)
is checked on the COMPUTED rhythm, not the class string.

### WP-3 — the TDD battery (RED first, wherever the walk names a pin)

The decode's contract freezes land in the existing suites (the ADR-017
one-suite doctrine): the search-focus pins extend
`tests/page-layout.test.ts` (the INPUT_BASE/SEARCH_INPUT family) or the
surface's own suite by object; the segmented-active pins extend the
tabs family (`tests/page-layout.test.ts` TABS_SEGMENTED block /
`tests/tabs-aria.test.ts` per the pin's object). RED faces are born
honestly — a pin that freezes a live-defect cure fails before the cure
lands; a contract-freeze pin over working code is born-green (the s173
P-p/P-q precedent). The mutation form: a planted class-string
regression trips exactly the new pin.

### WP-4 — the proofs + the standing re-verification

THE STASH-PROOF (the round's source moves stashed alone → exactly the
round's pins RED → restored → GREEN). The standing legs re-run at the
walked tree (the drawer battery · probe:ref · the desktop + phone
sweeps) — the parity verdict unchanged unless the walk's fixes name a
surface. The drift-gate adjudication per §0.3.

### WP-5 — the docs lockstep

The count ladder 2735 → 2735+N · SUITES 138 **HELD** (the one-suite
doctrine) · E2E 192 **HELD** · badge 2927 → 2927+N
(`count-ladder-178.py`, assert-first, idempotent, unique-anchor). The
docs: the AGENTS Session-178 section · the PAD session-178 inventory row
(+ the §11 re-anchors the live line-count census trips) · the CLAUDE
topbar/settings bullets' extensions if the contract set grows · the
README Tested row + the badge · the SKILL **v1.175.0** + H1 +
`last_updated` lockstep + the s178 head layer (skill-head-178.py,
idempotent) · `session_379.md` + this plan's execution record + the
worklog entry (Task ID 178).

### WP-6 — the captures 449-452 (`docs/screenshots/`)

The walk's own evidence faces: the two apps' FOCUSED search input at
desktop (the parity anchor — the focus ring's own face) · the settings
segmented tabs' ACTIVE state at desktop (the raised white pill) · the
settings segmented ACTIVE state at phone (the w-full track geometry) ·
one more surface at the round's discretion (the click-activated second
tab's transition face). VLM-verify the evidence faces per the house
convention.

## 2. The TDD ledger (to be filled at execution)

- RED birth: the WP-3 pins on the pre-fix tree (the honest faces).
- GREEN: the walk's cures land; the full unit suite at the new count.
- The live parity ledger: the standing legs re-verified at the walked
  tree.

---

## 3. The execution record (filled at ship)

- **WP-1 GREEN** — the walk51 tool landed
  (`scripts/walk51-search-focus-segmented-active.ts`): one tool, two
  phases; both apps' search inputs located by the same
  `placeholder="Search Anything..."` (the s10 decode holding), REAL
  keyboard Tab focus landing on both after the same 9 tabs; the
  settings tablist censused at both viewports with the default AND the
  click-activated second tab.
- **WP-2 GREEN** — every delta root-caused, never guessed:
  **ZERO LIVE DEFECTS**. The visible faces byte-equal everywhere (the
  resting shadow-sm · the focused 1px near-black ring · the active
  white pill + the bare-shadow pair + the ink/weight at both viewports
  · the tablist's computed bg/color — the house token idiom). The new
  documented genus: v4's `outline-none` = `outline-style: none` vs the
  reference's v3-era `2px solid transparent` (zero pixels on both —
  the shadow/blur/space-y rename family's fourth member). The
  box-shadow slot-count genus (v4's 5 slots vs the v3-era's 3, the
  extra slots transparent/clipped). OUR kept supersets re-verified
  live (the search aria-label; the roving tabindex [0,-1,-1] vs the
  reference's [-1,-1,-1]; the s125 literal + the s129 retirement
  standing against the reference's own stock class).
- **WP-3 GREEN** — the TDD battery: all 5 pins born-green over the
  zero-defect decode (the s173 P-p/P-q contract-freeze precedent) —
  the search focus contract · the search aria-label superset · the
  segmented active contract · the roving tabindex · the walk51
  standing-script freeze; all five in the existing page-layout suite
  (the ADR-017 one-suite doctrine).
- **WP-4 GREEN** — MUTATION-PROOFS: three planted regressions (the
  focus-ring ring-2 · the ring-offset-background replant · the tabindex
  flip) → exactly 1 RED each → restored → GREEN. STASH-PROOF: the
  round's test file stashed alone → exactly 138/2735 (the s177 ship
  state) → restored → 138/2740. The standing legs re-verified at the
  audit leg (the drawer battery GREEN · probe:ref STABLE · the desktop
  + phone sweeps CLEAN — the round is test-only, no product code
  touched, the parity verdict carries). The standing-gate
  adjudication (§0.3): the maiden pass surfaced ZERO unexplained
  deltas — no census extension built; the walk tool is the standing
  script.
- **WP-5 GREEN** — the count ladder 23 flips (2735 → 2740 · badge
  2927 → 2932, count-ladder-178.py, the re-run a verified 0-flip
  no-op) · the collateral re-anchors LIVE-CAUGHT by the suite itself
  (the SKILL §5.6 census 212 → 217 checks, the module untouched at
  1695 · the docs-counts lockstep · the F-106a1 layer-axis pin) · the
  SKILL v1.175.0 + the s178 head layer (skill-head-178.py, idempotent)
  · the AGENTS Session-178 section + the v4 register's outline-none
  member · the PAD session-178 inventory row · the CLAUDE v4-bullet
  hazard list · the README Tested row's walk51 clause + the badge ·
  session_379.md + this execution record + the worklog entry (Task ID
  178).
- **WP-6 GREEN** — the captures 449-452 landed; the VLM battery 4/4
  (the focused ring + placeholder + icon on BOTH apps' search shots;
  the Defaults raised-white-pill at desktop; the w-full phone track
  with the CRM Configuration pill active).
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2740 · build
  (the type-gate artifact) · smoke 14/14 · e2e 192/192 · census MATCH
  · probe:ref STABLE · the desktop + phone sweeps CLEAN · the drawer
  battery GREEN · the walk51 visible faces byte-equal.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
