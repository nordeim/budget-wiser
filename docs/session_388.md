# Session 388 — THE LEADS-FILTER POPOVER + CONTACTS-FILTER-PANEL OPEN-STATE INTERIOR WALK (walk56) (the session-183 round record)

Date: 2026-10-24 · Rotation: 183 · Agent: main (Z.ai) ·
Plan: `docs/plans/2026-10-24-session183-leads-popover-contacts-panel-open-interior-walk.md`

## The round

The post-182 audit rotation. Its rotation trigger THE OWNER'S NEWEST
COMMIT (`bf3acec` — the session_386 transcript, the s182 round's own
execution record). The s386 close's first-named candidate: "the
popover family's OPEN faces under ADR-022 — the leads filter popover
+ the contacts filter panel" (walk53 froze the DropdownMenu + Select
chrome carriers at walk53 — MENU_CONTENT/MENU_ITEM + the select.tsx
content/item strings; the Popover family's own carriers never).
probe:ref STABLE (`46bc2d9c`) kills the fresh-bundle candidate; the
registry's `latest` 3.10.1 (verified live against registry.npmjs.org)
kills the recharts 4.0 gate.

## The audit (the baseline + the operator's standing asks)

The baseline gate GREEN at the exact s182 ship state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2757** · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.6m) · probe:ref
STABLE · the mobile drawer battery GREEN at 390×844 (all stages:
trigger · OPEN focus-trap + dual scroll lock · NAV-CLOSE · ESC-CLOSE
· REOPEN-BEFORE-GROW · RESIZE-PAST-MD release) · the desktop + phone
drift sweeps CLEAN (margin 0.5pct) · db census MATCH (15/24/10/23/12
+ 4 users at `<repo>/db/custom.db`) · sitemap 11 routes + robots +
manifest 200 (smoke check 12) · the Tailwind v4 state clean.

The operator's round-shaped asks, all verified STANDING: the `.env`
`DATABASE_URL="file:../db/custom.db"` with the `db/` folder at the
repo root (the fresh intake; the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command — the F-123a1
doctrine) · the vitest + playwright config files (138/2760 unit + the
192-check e2e battery re-verified this session; no config churn) ·
the sitemap + SEO surface (the 11-route `/sitemap.xml` + `/robots.txt`
with its Sitemap line + the installable `/manifest.json`, all
re-verified 200) · the mobile-nav comparison (probe:ref's TRUE-390
census: the reference's own menu button STANDING; OURS the Radix
Sheet superset — the drawer battery GREEN) · the Tailwind v4 state
clean (no new v4 hazard; every walk delta decoded against the
standing genus register) · the `.env.example` verified against the
six-knob contract and included in the round's commit.

## The round proper — THE WALK (walk56)

`scripts/discover-183.ts` (the throwaway discovery probe): the leads
Filters trigger at byte-equal geometry on both apps (`304,443 108x36`
at 1440×900 · `32,1089 326x36` at 390×844); the OPEN popover
`div[role="dialog"]` at byte-equal boxes (`304,483 320x398` at 1440 ·
the 390 collision FLIP-UP to `data-side=top` at `32,36` on BOTH apps
— the s113-decoded flip re-confirmed); the mount-focus
`BUTTON/combobox` (the first select trigger) on both; the field
labels byte-equal `[Status | Source | Min Deal Value | Follow-up
Date]`; OURS carrying the aria-label supersets (`Open lead filters` ·
`Filter by status/source` · `Minimum deal value` · `Follow-up date`),
the reference's controls carrying NONE; the 1st-Tab landing
byte-equal (the Source select trigger both); the contacts Filters
trigger + the OPEN panel + the Clear All geometry byte-equal at BOTH
axes (`764,351 108x36` + `1350,85 74x32` at 1440 · `234,789 108x36`
+ `300,80 74x32` at 390); the 20 checkbox ids identical; OURS
carrying the `aria-expanded` superset on the panel trigger.

Then `scripts/walk56-leads-popover-open.ts` (the walk53/55 ledger
form over the popover family's TWO OPEN arms at BOTH axes — 1440×900
+ 390×844): Phase A the leads Filters popover (the PORTAL arm — the
trigger RESTING + OPEN faces, the content DFS ledger, the four field
labels' faces, the select/input/footer faces, the REAL keyboard Tab
drive, the Escape close), Phase B the contacts filter panel (the
IN-FLOW arm — the trigger's variant-flipped OPEN face, the sticky
header + Clear All face, the card-group + checkbox-id census, the
panel geometry at both axes).

**THE VERDICT: the D-183a1 LIVE FIND + CURE** — the contacts Filters
trigger's OPEN variant-flip: OURS rendered OUR blue default
(`bg-primary` rgb(37,99,235) — our `--color-primary` is deliberately
the blue the reference's CTAs use, per the s10-family re-pin) where
the reference's own default variant renders its **DARK stock
primary** (#171717, rgb(23,23,23) — its global `--primary` token;
its blue CTAs carry explicit classes). The CLOSED outline face was
byte-equal (every prior walk's face); the OPEN face was never walked
before. THE CURE (pinned): the variant ternary STAYS (the s75
mechanism pin) + the neutral literal pair (`bg-neutral-900
text-neutral-50 hover:bg-neutral-900/90` — the s80-computed hover
alpha) overrides the blue default via tailwind-merge — the profile
save-button precedent (S13-P2/M-80c1, the reference's PAGE-LOCAL
primary doctrine). **The re-walk PROVES the OPEN face byte-equal on
both axes** (the `panelTriggerOpen.bg` delta GONE from the census).

Every remaining delta a documented genus: the outline VERSION FORM
re-met on every face + BOTH its sub-forms (the alpha-color carrier
on the triggers/labels/inputs: OURS `3px none rgb(10,10,10)` vs the
reference's `3px none rgba(10,10,10,0.5)` — style none paints ZERO
pixels on both · the transparent-solid carrier on the content + the
select triggers: OURS `3px none rgb(10,10,10)` vs the reference's
`2px solid rgba(0,0,0,0)` — the s178 fingerprint) · the box-shadow
SLOT-COUNT genus (5-vs-3 on the triggers/inputs/footer, 6-vs-4 on the
content — every VISIBLE layer byte-equal) · the token-selection
genus (the popover's `border-line bg-surface text-foreground` + the
call-site `rounded-md shadow-md w-80 p-4` vs the reference's `z-50
rounded-md border bg-popover p-4 text-popover-foreground shadow-md` —
the M-81c2 pair's Popover member, computed-equal on every face) ·
the s133 placeholderState retirement (the reference's stock select
trigger still carries `data-[placeholder]:text-muted-foreground`) ·
the React useId format genus (radix-_r_* vs radix-:r*:) · lucide's
aria-hidden version genus (the X/Save svgs) · the class-order genus
(`h-4 w-4` vs `w-4 h-4`) · the aria-label superset genus (our trigger
+ field labels + the panel trigger's aria-expanded).

**The TDD ledger**: the pin survey first (LEADS_FILTERS_POPOVER's
eleven source tokens + the vocabularies pinned at s578-594 · the s113
D-113a1 label-tag pins · the kke card-group order pin — the
popover content chrome was the genuine gap, no pin holds
dropdown.tsx's content string): 3 pins — the walk56 decode freeze
(born-green: the tool's own contract — the two-arm OPEN ledger, the
`[role="dialog"][data-state="open"]` root rule over the portal, the
mount-focus census, the REAL Tab drive, BOTH axes) · the POPOVER
content chrome FULL-string freeze (born-green — the genuine
walk53-battery gap: the shared `Dropdown` wrapper's content class
string, every popover surface's only chrome carrier, never
full-frozen before) · the D-183a1 OPEN-face cure pin (**RED-first**
over the live find — exactly 1 RED at birth, the cure applied,
GREEN). **MUTATION-PROOF**: the planted `rounded-lg` → `rounded-xl`
content-chrome regression → **exactly 1 RED** (the new full-string
pin's unique teeth — no fragment pin holds the Popover content
chrome construction) → restored → GREEN. **STASH-PROOF**: the
round's test block stashed → exactly **138/2757** (the s182 ship
state) → restored → **138/2760**.

**THE COUNT LADDER**: 2757 → **2760** (+3, all in the existing
page-layout suite — the ADR-017 one-suite doctrine) · SUITES 138
HELD · E2E 192 HELD (the round's one product-code touch: the D-183a1
call-site pair in contacts-page.tsx; the final gate re-verifies) ·
badge 2949 → **2952** (count-ladder-183.py: 31 flips, assert-first,
idempotent, the re-run a verified 0-flip no-op) + the collateral
re-anchors (the SKILL §5.6 census checks 233 → 236, the module line
count 1695 HELD — page-layout.ts untouched · the F-106a1 layer-axis
pin — the s183 layer live, the s182 layer demoted beneath it at
2757/192 · the s182-introduced live-tense RED-first arithmetic site
re-anchored 249 → 252).

**THE CAPTURES** 467-470 (`docs/screenshots/`): the leads popover
OPEN ours+ref (the pair 1.69% pixel-diff — the scattered text-band
antialiasing, the reference's own font raster; VLM-verified content:
BOTH show the four labels + the two selects + the number/date inputs
+ the Clear/Save View footer, ZERO structural differences) + the
contacts panel OPEN ours+ref (the FULL panel: the sticky Filters
header + Clear All + the Role/Priority/Activity Status/Company Size
card groups — **the pair 0.00% pixel-diff, BYTE-IDENTICAL, the same
md5**, the D-183a1 post-cure face; VLM-verified: identical content,
identical order).

## The verification ledger

lint 0/0 · tsc 0 · **138/2760** unit · build (the type-gate artifact)
· smoke **14/14** · e2e **192/192** · db census MATCH · probe:ref
STABLE (`46bc2d9c`) · the walk56 popover + panel OPEN interiors
byte-equal on both axes (post-cure) · the captures: the panel pair
0.00% (byte-identical), the popover pair the antialias genus
(VLM-clean).

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the
remaining unwalked OPEN/focus interiors (the Edit-family dialogs'
focus faces — the walk54 arm covered the CREATE family's canonical
member · the activities More-Filters toggle's OPEN face — the same
variant-flip family the D-183a1 find rode, the one other
variant-flipping trigger in the app) · the fresh-bundle
re-derivation the day probe:ref trips (walk50 + walk51 + walk52 +
walk53 + walk54 + walk55 + walk56 pair as the interior faces) · the
recharts 4.0 `Cell` → `shape` gate when 4.0 ships.
