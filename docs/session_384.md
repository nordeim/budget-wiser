# Session 384 — THE DIALOG-SURFACE FOCUS-STATE INTERIOR WALK (walk54) (the session-181 round record)

Date: 2026-10-24 · Rotation: 181 · Agent: main (Z.ai) ·
Plan: `docs/plans/2026-10-24-session181-dialog-focus-interior-walk.md`

## The round

The post-180 audit rotation. Its rotation trigger THE OWNER'S NEWEST
COMMITS (`b8e740d`/`c4a5c4e` — the session_383 transcript [the s180
round's own execution record] + the merge `144f2dd`). The s380 close's
remaining named candidate: "the dialog-surface focus faces" (the s379
close's own third arm — walk53 consumed the dropdown/select OPEN arm,
walk54 takes the dialog family's focus interior). probe:ref STABLE
(`46bc2d9c`) kills the fresh-bundle candidate; the registry's `latest`
3.10.1 (verified live against registry.npmjs.org) kills the recharts
4.0 gate.

## The audit (the baseline + the operator's standing asks)

The baseline gate GREEN at the exact s180 ship state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2750** · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run) · probe:ref
STABLE · the mobile drawer battery GREEN at 390×844 (all stages:
trigger · OPEN focus-trap + dual scroll lock · NAV-CLOSE · ESC-CLOSE ·
REOPEN-BEFORE-GROW · RESIZE-PAST-MD release) · the desktop + phone
drift sweeps CLEAN · db census MATCH (15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`) · sitemap 11 routes + robots + manifest 200
(smoke check 12) · the Tailwind v4 state clean.

The operator's round-shaped asks, all verified STANDING: the `.env`
`DATABASE_URL="file:../db/custom.db"` with the `db/` folder at the
repo root (the fresh intake; the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command — the F-123a1
doctrine) · the vitest + playwright config files (138/2750 unit + the
192-check e2e battery re-verified this session; no config churn) ·
the sitemap + SEO surface (the 11-route `/sitemap.xml` + `/robots.txt`
with its Sitemap line + the installable `/manifest.json`, all
re-verified 200) · the mobile-nav comparison (probe:ref's TRUE-390
census: the reference's own menu button STANDING; OURS the Radix
Sheet superset — the drawer battery GREEN) · the Tailwind v4 state
clean (no new v4 hazard; every walk delta decoded against the
standing genus register) · the `.env.example` verified against the
six-knob contract and included in the round's commit.

## The round proper — THE WALK (walk54)

`scripts/walk54-dialog-focus-interior.ts` (the walk50 ledger form,
the focus-interior doctrine): the two-app element ledger of the New
Lead dialog's OPEN + FOCUS states at BOTH axes (1440×900 + 390×844) —
Phase A the OPEN spine (the 51-row DFS ledger of
`[role="dialog"][data-state="open"]`, the D-112a4 rule, + the
computed faces of the overlay/content/title/close-X/inputs/footer
RESTING), Phase B the REAL keyboard Tab drive (10 stops from the
mount-focused first input through the whole focusable chain — 5
inputs · Status · Source · Cancel · Create Lead · the close X — with
each stop's FOCUSED face censused, then the wrap past the last
focusable: the Radix focus-trap cycle).

**THE VERDICT: ZERO LIVE DEFECTS** — the 51-row spine byte-equal on
both axes (identical tag census: 12 div · 8 option · 7 label · 5
input · 5 button · 4 path · 3 span · 3 svg · 2 select · 1 h2 · 1
form; ZERO box deltas); the Tab chain position-identical on every
stop (ld-email → phone → company → value → Status(New) →
Source(Email) → Cancel → Create Lead → Close → **the WRAP to
ld-name on both apps**); the mount-focus on the first input with
`:focus-visible` TRUE on both (Radix's programmatic mount focus
paints the ring); every VISIBLE focus face byte-equal — the inputs'/
triggers'/Cancel's ring `rgb(10,10,10) 0px 0px 0px 1px` + the
shadow-sm layer, the submit's ring + its shadow pair, and the close
X's DOUBLE ring `rgb(255,255,255) 0px 0px 0px 2px` +
`rgb(10,10,10) 0px 0px 0px 4px` (the ring-2 + ring-offset-2 form) —
on BOTH axes. The genera: the outline VERSION FORM (the s178 genus
re-met on every dialog face + the alpha-color carrier sub-form) ·
the box-shadow SLOT-COUNT genus (3-vs-1 on the input ring, 4-vs-2 on
the content, 2-vs-0 on the close-X double ring — every VISIBLE layer
byte-equal) · **the v4 color-serialization genus (the overlay's
bg-black/80 computing `oklab(0 0 0 / 0.8)` vs `rgba(0,0,0,0.8)` —
the SAME visual color, the s28 canvas-readback precedent)** · the
token-selection genus (computed-equal on every face) · the
class-order genus · the space-y margin-BOTTOM family (our `mt-2 mb-0`
vs the v3-era's implicit — computed geometry byte-equal) · the s133
placeholderState retirement · the F-129c1 ring-offset-background
retirement · the id-name superset (our `ld-` prefixes) · our
aria-label supersets (the Status/Source triggers) · the React useId
format genus · lucide's aria-hidden version genus.

**THE WALK'S OWN DISCOVERY (the NEW genus)**: the DANGLING
`aria-describedby` — the reference's OPEN dialog declares
`aria-describedby="radix-:r8:"` pointing at a NON-EXISTENT node (its
own platform's dead pointer, live-probed: "NO SUCH ELEMENT"); OURS
carries no attribute at all (the clean form — the s15-P4
no-description doctrine; a dangling ARIA reference is the
reference's own defect, NOT mirrored per the s23 platform-defect
precedent). Also the overlay-selector finding: the portal mounts
overlay + content as BODY-level siblings —
`[data-radix-dialog-overlay]` matches nothing on either app; the
walk's overlay probe keys on `[data-state="open"]:not([role="dialog"])`.

**The TDD ledger**: 4 born-green pins (the s173 P-p/P-q
contract-freeze family, the pin survey first — INPUT_BASE/BUTTON_BASE
focus rings already full-pinned at s9/s10, DIALOG_FOOTER/HEADER at
s15): the walk54 decode freeze (the tool's own contract, incl. the
D-112a4 root rule + the overlay-selector finding) · the
DIALOG_CONTENT.base FULL-string freeze (over the s15 fragment pins) ·
the DIALOG_CLOSE FULL-string freeze (the focused DOUBLE-ring carrier,
over the s15/s112 fragment pins) · the DIALOG_OVERLAY FULL-string
freeze (the oklab/rgba serialization genus's class carrier).
**MUTATION-PROOF**: the planted `focus:ring-offset-2` →
`focus:ring-offset-4` regression → **exactly 1 RED** (the
full-string pin's unique teeth — the offset arm no fragment pin
holds) → restored → GREEN. **STASH-PROOF**: the round's test file
stashed → exactly **138/2750** (the s180 ship state) → restored →
**138/2754**.

**THE COUNT LADDER**: 2750 → **2754** (+4, all in the existing
page-layout suite — the ADR-017 one-suite doctrine) · SUITES 138
HELD · E2E 192 HELD (the round is test-only — NO product code
touched) · badge 2942 → **2946** (count-ladder-181.py: 23 flips,
assert-first, idempotent, the re-run a verified 0-flip no-op) + the
collateral re-anchors (the SKILL §5.6 census checks 226 → 230, the
module line count 1695 HELD — page-layout.ts untouched · the F-106a1
layer-axis pin — the s181 layer live, the s180 layer demoted beneath
it at 2750/192).

**THE CAPTURES** 459-462 (`docs/screenshots/`): the dialog's
mount-focused Name input ours+ref (**the pair 0.00% pixel-diff,
BYTE-IDENTICAL — the same md5**) + the REAL-keyboard-focused close X
ours+ref (**the pair 0.00% pixel-diff, BYTE-IDENTICAL — the same
md5**; VLM-verified: the empty rounded input carrying the thin
near-black ring on both, the X icon enclosed in its rounded-square
double-ring enclosure on both). The byte-identical md5s make the
parity proof mathematical.

## The verification ledger

lint 0/0 · tsc 0 · **138/2754** unit · build (the type-gate artifact)
· smoke **14/14** · e2e **192/192** · db census MATCH · probe:ref
STABLE (`46bc2d9c`) · the walk54 focus faces byte-equal on both axes
· the captures 459-462 both pairs 0.00% (byte-identical).

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the
remaining unwalked OPEN/focus interiors (the reports filter selects'
OPEN states beyond the walk53 settings arm · the popover family's
OPEN faces under ADR-022 · the Edit-family dialogs' focus faces —
the walk54 arm covered the CREATE family's canonical member) · the
fresh-bundle re-derivation the day probe:ref trips (walk50 + walk51
+ walk52 + walk53 + walk54 pair as the interior faces) · the
recharts 4.0 `Cell` → `shape` gate when 4.0 ships.
