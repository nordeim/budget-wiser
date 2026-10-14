# Session-122 Parity Remediation Plan (2026-10-15)

The rotation target: the **settings family — the Danger Zone arm + the
account-card arm** (the session_261 close's named candidate; the s26-era
data-tab surfaces ~96 sessions since the decode + the s72-era picklists
~50 sessions + the profile right-column cards never walked as a set).

## Baseline gate (stepwise)

- lint 0/0 · tsc 0 ✓ (fresh clone at `b15522c`; bun install 533 pkgs;
  `db:push` + `db:seed` + census MATCH 15/24/10/23/12 + 4 users;
  Playwright chromium 153 reinstalled after the workspace reset)
- 110/1964 unit ✓ · build ✓ · e2e 137/137 (3.4m; one first-run S72-P2
  flake, clean on the re-run — the known lineage)

## The audits

- **122-a (the s121 ship-delta + the settings pre-walk inventory)**:
  9/9 shipped claims Verified, ZERO real findings — the delta EXACTLY
  the s121 ship (863ac61 feat 18 files +790 + the two docs-only session
  logs); the counts 110/1964/137/badge 2101 coherent; the captures
  212-215 md5s exact; the D-121a0/a1/a2/a3 pins standing. The pre-walk
  inventory: the Danger Zone + exports + templates deeply e2e-pinned
  (S14-P2/P3, S26-P2/P3/P4) with the UNPINNED residue enumerated (the
  AlertCircle icon, the reset-confirm wiring, the "Export Data" title,
  CSV_TEMPLATE_MIME, the zero-row EMPTY-export face, the chip label
  set, the h3/email literals, the Add-button wiring).
- **122-b (the standing layers, ~80th consecutive)**: 9/9 PASS — SEO
  live 6/6 · the drawer battery exit 0 (the D-121a1 REPO derivation
  working via its own spawn path) · design-tokens 16/16 · vocabulary
  6/6 · config zero drift · census MATCH · the Tailwind v4 layer · the
  defect ledger · metadata 37/37. Record-only: N-122b1 the standalone
  .env citation nano, N-122b2 the e2e.db md5 walk-window genus,
  N-122b3 the @theme counting-methodology continuation.

## The live verification (orchestrator-run)

probe:ref the **94th** consecutive STABLE (bundle md5 exact; demo data
ZERO; the TRUE-390 mobile-nav defect STANDS — the reference's own bug) ·
**the four drift gates CLEAN** (1440/390/768/1024) · scandihaven
re-cloned and standing at `d4789c3` on-pattern.

## The rotation (122-c) — THE SETTINGS FAMILY WALK

Both apps driven at 1440×900 + 390×844 through the two surfaces (the
/settings Data tab + the /profile account-card arm, the Config tab as
the secondary), with computed-style + census extraction, login first on
both, the walk scripts OUTSIDE the repo (PORT 3141, the s115-s121
precedent). The walk db rides BOTH zeroes: the standing zero-data tool
(entities wiped, users + settings kept) PLUS the 5 picklist arrays
emptied — matching the reference's OWN settings state (live-diagnosed:
its config tab renders "No items yet" ×5 after an 8.5s settle; its
defaults ride the fallback values, equal to our seeded defaults).

### PASS 1 (zero-data + zero-settings, two-app): ZERO PARITY DEFECTS

**0 diffs @1440 + 0 diffs @390** — byte-equal on every compared axis:

- The /settings shell: the h1 (text/font/rect) + the subtitle + the
  tablist + the three triggers (labels, rects, fonts, colors, states)
- The Data tab: the panel + the 3 cards (Import Templates 3 buttons ·
  Export Data 4 buttons · the Danger Zone) — every axis byte-equal
  (the card chrome incl. the red-200 border + the red-50 bg, the title
  rows incl. the AlertCircle icon, the red-600 desc, the RESET label +
  input (placeholder/mt/maxW/border/bg), the disabled destructive
  button (bg #ef4444/fg/opacity/pointerEvents), the per-button margins
  and cursors, the Download icons)
- The Config tab EMPTY face: the grid + the 5 panel titles byte-equal +
  **"No items yet" ×5 byte-equal on BOTH apps** (the reference's own
  live state — never two-app-compared before) + the add-inputs'
  placeholders + rects
- The account-card arm: the 80×80 avatar (circle@40px verdict both,
  the L-121c1 radius genus), the blue-100 fallback + icon, the h3 name,
  the email p, the role badge (text "user" + bg rgb(23,23,23) +
  capitalize — verified equal on both), the three info chips (labels +
  values + the hex pairs + the chip geometry)
- **The download contracts byte-equal**: the 3 CSV templates (107/138/
  112 bytes — filenames AND content byte-exact) + the 4 EMPTY exports
  (0 bytes, the singular_ISO filenames byte-exact on both apps)
- docScrollW contained at 390

**The adjudicated noise genera (record-only):**
- L-121c1 the radius genus (standing): `3.35544e+07px` vs `9999px`,
  identical boxes, the same circle@40px verdict.
- **L-122c1 the disabled-button cursor genus (NEW)**: ours computes
  `cursor: pointer` on DISABLED buttons (the S10-1 global
  `button { cursor: pointer }` base), the reference `default`; BOTH
  ship `disabled:pointer-events-none` so the computed cursor NEVER
  RENDERS (the hover passes through to the card beneath — the arrow on
  both). Enabled buttons: `pointer` on BOTH (the S10-1 contract
  stands). Rendered-identical — adjudicated noise.

### PASS 2 (populated, ours-only — the reference's zero-data +
empty-settings genus): 51/51 checks, every value seed-verified off the
db first + every mutation verified back onto it

- The picklist populated face: the 5 panels' row counts == the db
  arrays (8/7/6/3/8) · the bordered-row class + the 2 icon buttons +
  the item span · the aria superset · the delete red pair
- The picklist CRUD round-trips: ADD (the db gains the item, the row
  renders, the input clears) · RENAME (the inline input carries the
  current name; Enter saves; the db + the row update) · DELETE (the db
  back to seed, the row gone)
- The populated exports: the 4 filenames (singular_ISO) + the row
  counts (15/10/24/23 + header) + the UNQUOTED first-row-keys header +
  every value double-quoted
- The account-card populated face: the name/email/role == the db user ·
  the badge capitalize (the raw role + CSS) · Yes/Protected · the
  Account Type capitalize
- The Danger Zone flow: the disabled gate at zero-typed · the wrong
  text keeps it · RESET enables (cursor/opacity flip) · the DECLINED
  confirm (the 118-char message EXACT + the db UNCHANGED) · the
  ACCEPTED reset (the alert EXACT + the 7-table wipe verified on the db
  + users + settings SURVIVE + the input cleared + the button
  re-disabled) · the post-reset export EMPTY (0 bytes)

**ZERO real parity defects — the pin-only session (the s120 lineage).**

## The remediation (the walk's unpinned residue → the pins)

### D-122a0 — THE ACCOUNT-CARD ARM PINS [tests/profile-family-parity.test.ts +3 its]

(a) The chip label trio: "Account Type" / "Email Verified" / "Security"
on the `text-sm text-muted` p's (the 122-a gap: 2 of 3 labels carried
ZERO test hits); (b) the value literals "Yes" / "Protected" + the type
value riding the capitalize-carried `{user.role}` (the walk's C1/C2
contract: the textContent is the raw role + CSS capitalize); (c) the
identity pair: the `text-lg font-semibold` h3 name + the
`text-sm text-muted` email p (the literals pinned nowhere).

### D-122a1 — THE DANGER-ZONE SURFACE PINS [tests/settings-data-tab.test.ts +2 its]

(a) The AlertCircle title icon at `w-5 h-5` + aria-hidden (ZERO test
hits — the 122-a gap); (b) the reset-confirm wiring: `id="reset-confirm"`
+ `placeholder="RESET"` + the label/input aria pairing via
SETTINGS_DANGER.label + `disabled={resetText !== "RESET"}` pinned AS
THE BUTTON'S PROP (the reset-flow test used the string only as a region
marker; the gate itself was e2e-behavioral only).

### D-122a2 — THE EXPORT MIME + TITLE + EMPTY-FACE PINS [+2 its]

(a) [settings-data-tab] The "Export Data" title literal (only "Import
Templates" was pinned) + CSV_TEMPLATE_MIME wired at the three template
call sites; (b) [csv-contract] `entityDumpCsv([]) === ""` — the
zero-row EMPTY-export face (the walk's D6 live-verified genus: no rows
→ no header → an empty artifact).

### D-122a3 — THE PICKLIST ADD-BUTTON PIN [tests/settings-profile-parity.test.ts +1 it]

The Add button: icon-only `<Plus className="h-4 w-4" />` +
`aria-label="Add item"` + `disabled={!value.trim()}` (the e2e-only gap —
the walk's A3 contract: the input gate + the icon-only chrome).

### D-122a4 — THE DOCS REALIGNMENT + THE WALK RECORD

session_262.md + this plan's execution record + the worklog + SKILL
v1.119.0 (§16dj + the project_state s122 layer + the H1 + Appendix B)
+ the README badge + the Tested row's s122 clause + the AGENTS
§Session-122 + the CLAUDE/PAD sites + the captures 216-219 + the VLM
battery.

## The TDD protocol

GREEN-first on the standing tree (the pins encode the LIVE-verified
contracts) → the **stash-proof per fix family** (the pinned src content
reverted alone → the new pins RED ALONE → restored → GREEN) → the full
suite → the e2e census unchanged (137 — the pins are unit-only, no e2e
additions this session) → the closing drift sweep on all four gates →
census MATCH.

## The count ladder

UNIT 1964 → 1972 (+8: D-122a0 +3 · D-122a1 +2 · D-122a2 +2 · D-122a3 +1 —
all in EXISTING files); SUITES 110 UNCHANGED; E2E 137 UNCHANGED;
badge 2101 → 2109.

## The execution record (as shipped)

- **D-122a0** shipped: the account-card arm pins (+3 its, profile-family-parity 20/20) — the chip label trio on the `text-sm text-muted` p's, the Yes/Protected literals + the capitalize-carried role values (the badge div + the type p both riding `{user.role}` + CSS capitalize), the h3/email identity literals. Stash-proof: the "Account Type" label reverted alone → the label pin REDs alone (1 failed | 19 passed) → restored GREEN.
- **D-122a1** shipped: the Danger-Zone surface pins (+2 its, settings-data-tab) — the AlertCircle title icon (the icon + import identity + the titleIcon class + aria-hidden) + the reset-confirm wiring (the Label htmlFor pair, the id, the RESET placeholder, the aria-label pairing, the inputCls/controlMt construction, the `disabled={resetText !== "RESET"}` gate AS the button's prop). Stash-proof: the gate reverted to `resetText.length > 4` alone → the wiring pin REDs alone (1 | 12) → restored GREEN.
- **D-122a2** shipped: the export title/MIME pin (+1 it, settings-data-tab — the "Export Data" literal + the importTitle + the 4 CSV_TEMPLATE_MIME occurrences [1 import + 3 call sites]) + the zero-row EMPTY-export face pin (+1 it, csv-contract — `entityDumpCsv([]) === ""` + the populated shape `id,name\n"x1","Ada"`). Stash-proofs: the title reverted alone → the title pin REDs alone (1 | 12); the zero-row return reverted alone → the EMPTY-face pin REDs alone (1 | 8) → both restored GREEN.
- **D-122a3** shipped: the picklist Add-button pin (+1 it, settings-profile-parity 27/27) — the icon-only `<Plus className="h-4 w-4" />` + `aria-label="Add item"` + `disabled={!value.trim()}` + the SETTINGS_PICKLIST.addButton chrome. Stash-proof: the aria reverted alone → the pin REDs alone (1 | 26) → restored GREEN.
- **D-122a4** shipped: session_262.md + this record + the worklog + SKILL v1.119.0 (the §16dj layer + the project_state s122 head + the beneath-it transition + the H1 + the Appendix B 1972) + the README badge 2109 + the Tested row's s122 clause + the AGENTS §Session-122 + the CLAUDE 4 sites + the PAD 5 sites + the s122 inventory row + the captures 216-219 + the VLM battery 4/4 × 4 CLEAN.
- **The count ladder as shipped**: UNIT 1964→1972 (+8, all in EXISTING files) · SUITES 110 UNCHANGED · E2E 137 UNCHANGED · badge 2101→2109. The docs-counts layer-axis templates bumped to session-122/121; the wall-clock lockstep rides the SUITES constant.
- **The gate**: lint 0/0 · tsc 0 · 110/1972 · build · 137/137 · the closing drift sweep CLEAN on all four gates · census MATCH · src/ 0 files changed (the pin-only session).
- **The captures**: 216-219 re-taken at the tall viewports (1440×1750 / 390×1700 — the s120 internal-main-scroll workaround; the first 900px-tall pass cut the Config tab's lower panels) — four unique md5s (2e8ef6c7 / ba31bd48 / 71677a69 / dd2911e8).
