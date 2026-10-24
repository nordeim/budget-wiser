# Session 382 — THE DROPDOWN/SELECT OPEN-STATE INTERIOR WALK (walk53) (the session-180 round record)

Date: 2026-10-24 · Rotation: 180 · Agent: main (Z.ai CLI) ·
Plan: `docs/plans/2026-10-24-session180-dropdown-open-interior-rewalk.md`

## The round

The post-179 audit rotation. Its rotation trigger THE OWNER'S NEWEST
COMMITS (`6ff2ba7`/`3b21544` — the session_381 transcript [the s179
round's own execution record] + the `prompt-to-review-3.md` doc — the
operator's round-shaped task book naming this round's deliverables
explicitly). The s380 close's first-named candidate: "the remaining
unwalked focus/OPEN faces — the dropdown/select OPEN states beyond
the s133/s136 lenses (the s379 close's own second arm) · the
account-menu OPEN re-walk under ADR-022". probe:ref STABLE
(`46bc2d9c`) kills the fresh-bundle candidate; the registry's `latest`
3.10.1 (verified live against registry.npmjs.org) kills the recharts
4.0 gate.

## The audit (the baseline + the operator's standing asks)

The baseline gate GREEN at the exact s179 ship state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2744** · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** — with one first-run flake in the
S72-P2/M-72c1 settings-debounce test (the documented F-119a1
epoch-gate lineage — passed in isolation AND on the full re-run; a
machine-load observation, never a live defect). The standing legs:
probe:ref STABLE · the mobile drawer battery GREEN at 390×844 · the
desktop + phone drift sweeps CLEAN (settings 2.65%/3.63% the
documented volatile picklist-data genus — live-edited intraday on the
reference, the walk40 ref-vs-ref doctrine; login 0.28%/0.78% the
documented logo genus) · db census MATCH at `<repo>/db/custom.db` ·
sitemap 11 routes + robots + manifest 200 (smoke check 12).

The operator's round-shaped asks, all verified STANDING: the `.env`
`DATABASE_URL="file:../db/custom.db"` with the `db/` folder at the
repo root (the fresh intake; the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command — the F-123a1
doctrine) · the vitest + playwright config files (138 suites + the
192-check e2e battery re-verified this session; no config churn — the
configs are the family-correct form and a change without a failing
gate would be speculative) · the sitemap + SEO surface (the 11-route
`/sitemap.xml` + `/robots.txt` with its Sitemap line + the
installable `/manifest.json`, all re-verified 200) · the mobile-nav
comparison (probe:ref's TRUE-390 census: the reference's own menu
button STANDING, nav w=0 · 0 links · 1 menu button; OURS the Radix
Sheet superset — the drawer battery GREEN: the trigger, the OPEN
focus-trap, the dual scroll lock, the nav-close, the Escape-close,
the resize-past-md release) · the Tailwind v4 state clean (no new v4
hazard; every walk delta decoded against the standing genus register)
· the `.env.example` verified against the six-knob contract
(DATABASE_URL · AUTH_SECRET · NEXT_PUBLIC_SITE_URL · NEO_PROXY_HOPS ·
NEO_DISABLE_IN_APP_OTP · NEO_DISABLE_IN_APP_RESET) and included in
the round's commit.

## The round proper — THE WALK (walk53)

`scripts/walk53-dropdown-open-interior.ts` (the walk50 ledger form,
the ADR-022 OPEN-interior doctrine): the two-app element ledger of the
OPEN states at BOTH axes (1440×900 + 390×844) — Phase A the
account-menu (the topbar `button[aria-haspopup="menu"]` → the
`[role="menu"]` content → the Profile/Logout menuitems), Phase B the
settings Defaults "Default Calendar View" select (the first combobox
→ the `[role="listbox"]` → the Month/Week options — the M-81c3-decoded
vocabulary); the REAL keyboard ArrowDown drive (data-highlighted fires
only under real keyboard focus, which no sweep drives), the
mount-focus census, the computed faces of the trigger/content/items
RESTING and KEYBOARD-HIGHLIGHTED.

**THE VERDICT: ZERO LIVE DEFECTS** — the menu spine byte-equal on
both axes (3 rows, the same DFS structure, ZERO box deltas,
mount-focus DIV/menu on both apps, ArrowDown → Profile on both); the
listbox spine byte-equal (the Month/Week vocabulary, data-state
checked/unchecked identical, mount-focus DIV/option on both — Radix
focuses the SELECTED option — ArrowDown → Week on both); the VISIBLE
faces byte-equal on every OPEN face (the trigger's shadow-sm, the
content's shadow-md layers, bg/color/border/radius everywhere). The
genera: the outline VERSION FORM (the s178 genus re-met on the OPEN
faces + the NEW alpha-color carrier sub-form: OURS `3px none
rgb(10,10,10)` vs the reference's `3px none rgba(10,10,10,0.5)` on
the triggers — style none paints ZERO pixels on both) · the box-shadow
SLOT-COUNT genus (v4's 5 transparent zero-extent slots vs the
v3-era's 3) · the token-selection genus (MENU_CONTENT's
border-line/bg-surface/text-foreground vs the reference's bare
border/bg-popover/text-popover-foreground + the items'
focus:bg-line-soft/focus:text-neutral-900 vs
focus:bg-accent/focus:text-accent-foreground — computed-equal in BOTH
the resting and the REAL-keyboard-highlighted states, the
M-81c2-decoded #f5f5f5 wash + the #171717 ink shift) · the React useId
format genus (`radix-_R_*` vs `radix-:r*:`) · lucide's aria-hidden
version genus (the option's check svg).

**THE WALK'S OWN DISCOVERY (the harness lesson)**: Playwright's
`getByRole("combobox")` engine STOPS matching the select trigger once
`aria-expanded` flips true at open — count 0 while the raw
`[role="combobox"]` attribute stays live in the DOM. The attribute
selector is the only locator form matching BOTH the resting and open
states; pinned inside the decode freeze.

## The 180-a live find + cure (the mid-round TDD event)

The audit of the shipped s179 state found the EXTERNAL s179 round had
**TRIPLED its PAD §7.1 inventory row** (three near-identical walk52
rows — a single-layer-doctrine violation that shipped through the
gate because no pin held the table's row multiplicity; the
docs-counts suite pinned the TOTAL row, never the per-row
uniqueness). The TDD cure: the new inventory-row uniqueness pin
(`tests/docs-counts.test.ts`) went **RED over the live triplication
first**, the two duplicate rows were then removed (the
first/most-complete row kept), and the pin went **GREEN** — a future
round that doubles its row now fails `bun run test`. The count ladder
therefore ran as a two-pass full-ladder form (pass 1: 2744 → 2749
pre-find; pass 2: → 2750 with the +1 pin).

**The TDD ledger**: 5 born-green walk53 pins (the s173 P-p/P-q
contract-freeze precedent): the walk53 decode freeze (the tool's own
contract, incl. the attribute-selector discovery) · the MENU_CONTENT
FULL-string freeze · the MENU_ITEM FULL-string freeze (the s179
FULL-string precedent upgrading the s13/s63/s113/s128 fragment pins)
· the select.tsx content full-string freeze (the M-81c1 carrier) ·
the select.tsx item full-string freeze (the M-81c2 carrier) — plus
the 1 RED-first uniqueness pin. **MUTATION-PROOF**: the planted
MENU_ITEM disabled-arm order regression → **exactly 1 RED** (the
full-string pin's unique teeth over the fragment pins — the
shadow-md and class-order mutations were tried first, both tripping
the older fragment pins too; the disabled-arm swap isolates the new
pin) → restored → GREEN. **STASH-PROOF**: the round's test file
stashed → exactly **138/2744** (the s179 ship state) → restored →
138/2749 pre-find.

**THE COUNT LADDER**: 2744 → **2750** (+6: 5 the walk53 pins + 1 the
RED-first uniqueness pin) · SUITES 138 HELD · E2E 192 HELD (the round
is test-only — NO product code touched; the PAD dedupe is docs-only)
· badge 2936 → **2942** (count-ladder-180.py: 23 flips, assert-first,
idempotent, the two-pass full-ladder form) + the collateral re-anchors
(the SKILL §5.6 census checks 221 → 226, the module line count 1695
HELD · the F-106a1 layer-axis pin — the s180 layer live, the s179
layer demoted beneath it at 2744/192).

**THE CAPTURES** 455-458 (`docs/screenshots/`): the account-menu
OPEN ours+ref (the keyboard-highlighted Profile wash on both — **the
pair 0.00% pixel-diff, byte-equal**, VLM-verified: "identical in
content, layout, font, and highlighting") + the settings Defaults
select OPEN ours+ref (the Month checkmark + the Week options on both
— **the pair 0.00% pixel-diff**, VLM-verified: "no visible
differences"). The capture decode lesson: the first menu shot over
the DASHBOARD blended its semitransparent shadow-below band with the
KPI chart content beneath (the standing chart-antialiasing genus) —
re-shot over the settings Defaults card's plain surface; the menu's
own faces were byte-equal either way (the walk's computed census is
the proof layer; the capture the evidence face).

## The verification ledger

lint 0/0 · tsc 0 · **138/2750** unit · build (the type-gate artifact)
· smoke **14/14** · e2e **192/192** · db census MATCH · probe:ref
STABLE (`46bc2d9c`) · the walk53 OPEN spines byte-equal on both axes ·
the captures 455-458 both pairs 0.00% pixel-diff.

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the
remaining unwalked OPEN interiors (the dialog-surface focus faces —
the s379 close's third arm · the reports filter selects' OPEN states
beyond the walk53 settings arm · the popover family's OPEN faces under
ADR-022) · the fresh-bundle re-derivation the day probe:ref trips
(walk50 + walk51 + walk52 + walk53 pair as the interior faces) · the
recharts 4.0 `Cell` → `shape` gate when 4.0 ships.
