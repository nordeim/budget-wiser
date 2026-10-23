# The session-172 plan — THE DIALOG-SURFACE NAMED-CONTROL CLOSURE + THE FAST-CHECK PROPERTY FAMILY

Date: 2026-10-23 · Rotation: 172 ·
Task: audit + validate the session-171 ship (the axe-core a11y two-gate +
the named-control family), remediate the findings TDD-first, align every
doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `48158d5` (the s171 ship `147d3f2` + its session-log
commit; fresh-clone intake: `bun install` → `.env` with a fresh 64-char
AUTH_SECRET + `file:../db/custom.db` → the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command → `db:push`/`db:seed`
→ census MATCH 15/24/10/23/12 + 4 users → playwright chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **135/2668** (the s171 ship state) |
| build | GREEN (29 routes, the ~151 MB hygienic artifact) |
| smoke | GREEN **14/14** |
| e2e | GREEN **186/186** (4.7 m clean run) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c…` — the s168/s169/s170/s171 fingerprint) |
| drift gates | the desktop + phone sweeps **CLEAN** live |
| mobile drawer | **7/7 PASS** live at 390×844 (`scripts/drawer-battery-168.ts`) |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config) |
| sitemap + robots + manifest | 11 routes / standing / standing |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The rotation candidates (the s171 close's named list): the fast-check
property tests (the other s170-named family — its own devDep bump) · the
dialog-surface select family (the closed-by-default genus the probes
never reached — each dialog deserves its own open-state walk) · the
drawer interior re-walk (covered: the drawer battery 7/7 + the 8/8 link
census re-verified at the audit leg). This round adopts the FIRST TWO:
the dialog genus needs NO devDep (attribute-only fixes — the s171 cure
extended), fast-check is the round's ONE devDep bump (the
no-mid-rotation-bump posture holds: s171 bumped axe-core, s172 bumps
fast-check).

### The live dialog probes (the executable truth this plan stands on)

The s171 round's twelve-surface scan never reached the dialogs — a Radix
Dialog's content is absent from the DOM while closed, so the closed-by-
default genus was invisible to every open-surface probe AND to the a11y
two-gate (which scans pages + the drawer-open state only). This round's
probe (`/home/z/my-project/scripts/dialog-probe-172.ts`, throwaway,
outside the repo) drove the standing dev server through the five CREATE
dialogs + the contact EDIT dialog, running axe-core 4.13 on each OPEN
state — and a second probe ran the SAME scan against the REFERENCE's own
open dialogs (the parity citation).

**Ours (each verified live)**:

| Dialog | button-name | label |
|---|---|---|
| Lead (create) | 2 — Status + Source | 0 (inputs wired `htmlFor`) |
| Account (create) | 1 — Status | 0 |
| Contact (create) | 1 — How did you meet? | 0 |
| Event (create) | 3 — Event Type + Status + Related To | 0 |
| Activity (create) | 2 — Activity Type + Related To | 0 |
| Contact (edit — entity-edit-dialog) | 2 — Status + Source | **5 — Name/Email/Phone/Company/Position** |

**The reference (verified on its own open DOM — the parity citation)**:
Lead 2 · Account 1 · Contact 1 (+ its own unnamed photo button) ·
Event 3 **+ 4 unlabeled inputs** · Activity 2 + 1 unlabeled input — the
IDENTICAL nameless-combobox family on every dialog, PLUS its own label
violations. Our fixes are invisible supersets under the s171 doctrine
(the reference's nameless controls are its defect, ours name them; its
event dialog ships bare inputs, ours wire `htmlFor`).

**The root causes** (the s171 combobox rule, extended):
1. The 9 create-dialog `SelectTrigger` sites render bare triggers with
   SIBLING `<Label>` text — `role="combobox"` names come from author
   attributes only, so the sibling label is invisible to the accessible
   name computation (the F-171a genus, closed-surface arm).
2. The entity-edit-dialog renders `<Label>{f.label}</Label>` with NO
   `htmlFor` and its `Input`s carry NO `id` — the label association
   never forms, so axe flags both the combobox naming AND the input
   labeling. (The reference's own event dialog ships the same defect —
   ours is the invisible superset.)

### The code findings (each reproduced live)

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-172a | **9 unnamed create-dialog SelectTriggers** (Lead 2 · Account 1 · Contact 1 · Event 3 · Activity 2) — every dialog Select announces nameless to screen readers; the two-gate never sees them (closed surfaces). | entity-dialogs.tsx:309,592,770,781,944,955,987,1162,1198 | High | Verified |
| F-172b | **The entity-edit-dialog family: 5 nameless config-driven SelectTriggers** (Contact Status+Source · Lead Status+Source · Account Status) **+ 17 unlabeled Inputs** — the bare `<Label>{f.label}</Label>` renders no `htmlFor`, the Inputs no `id`. | entity-edit-dialog.tsx:283,290,302 | High | Verified |
| F-172c | **No dialog-open coverage in the a11y two-gate** — the s171 spec scans 9 CRM pages + 3 anon surfaces + the drawer-open state, never an open dialog; the genus was invisible to the gate by construction. | tests/e2e/a11y.spec.ts | Medium | Verified |
| F-172d | **The fast-check property family never landed** (the other s170-named candidate) — the pure seams carry only example-based tests; the round-trip/invariant properties (csv escape/parse · lead-views encode/decode · saved-reports normalization idempotence · formatter robustness · initials invariants · guard idempotence) are unpinned. fast-check@4.10.2 verified to install cleanly + integrate with vitest (live smoke test GREEN). | tests/ (absent) · package.json | Medium | Verified |
| F-172e | **`parseCsv` normalizes line endings GLOBALLY (outside AND inside quoted cells)** — `src.replace(/\r\n/g,"\n").replace(/\r/g,"\n")` runs before the state machine, so a quoted cell containing `\r\n` or a lone `\r` silently mutates on import (RFC 4180: CRLF inside a quoted field is field data). The toCsv→parseCsv round-trip breaks exactly there. | src/lib/csv.ts:66 | Medium | Verified (round-trip probe) |

### The sanctioned families (unchanged from s171 — re-verified live this round)

The open-dialog scans see the SAME residual landscape as the page scans:
the active-nav `.bg-white/10` chip + the calendar off-month cells (both
ALREADY in the sanctioned register — they sit behind the open dialog)
plus nothing new. The dialog cards themselves are clean white surfaces.
No register additions needed.

Out of scope this round (documented, not silently dropped): the drawer
interior re-walk (covered by the 7/7 battery + 8/8 link census re-run);
the 9 dev-toolchain advisories (the standing posture); the reference's
OWN dialog defects (its defect, not ours to mirror).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the dialog-controls source-pin battery (the 136th suite)

`tests/dialog-controls.test.ts` (+~25) — the L-165c1 doctrine extended to
the closed-surface family: every fix pinned live-read against the two
dialog sources (the 9 create-dialog `aria-label` forms with their exact
sibling-label texts · the edit-dialog `htmlFor`/`id` wiring + the
config-driven `aria-label={f.label}` · the per-dialog trigger census —
no bare `<SelectTrigger` without `aria-label` in either file · the
photo-button pair's standing labels stay). RED birth: every pin fails
against the unfixed sources; mutation-proven at birth (the house ritual).

### WP-2 — the property battery (the 137th suite) + the fast-check devDep

`tests/property.test.ts` (+~10) — the fast-check family, one property
per seam, every property a named invariant:

- **P-a csv round-trip**: `parseCsv(toCsv(rows))` recovers the rows
  through `guardFormulaPrefix` for ARBITRARY cell strings (commas,
  quotes, newlines, formula prefixes, unicode). RED on the F-172e
  parser defect (lone `\r` / `\r\n` inside quoted cells) → GREEN via
  WP-3's parser fix.
- **P-b guard idempotence**: `guardFormulaPrefix(guard(s)) === guard(s)`
  for any string (the OWASP prefix lands exactly once).
- **P-c lead-views round-trip**: `decode(encode(views)) === views` for
  generated valid SavedLeadView lists (the Save View localStorage seam).
- **P-d saved-reports total + idempotent**: `decode` is a total function
  (any string → list or null, never throws) and
  `decode(encode(decode(raw))) === decode(raw)` (the normalize-on-decode
  is idempotent — the legacy-id migration converges in one pass).
- **P-e formatter robustness**: the format family never throws on any
  input (NaN/±Infinity/±0/huge/arbitrary strings/null) and always
  returns strings.
- **P-f initials invariants**: `initialsOf` never throws, never returns
  empty, and for ASCII names returns "?" or 1–2 uppercase letters.
- **P-g csvFilename convention**: the `prefix_YYYY-MM-DD.csv` regex
  holds for any sane prefix.

`fast-check` joins devDependencies (`^4.10.2`, declared via
`bun add -d` — the round's ONE devDep bump; the dead-code-hygiene
devDep-count pin re-anchors 12 → 13).

### WP-3 — the named-control + label-wiring fixes (the GREEN phase)

- The 9 create-dialog SelectTriggers gain `aria-label` = their sibling
  Label's exact text ("Status" · "Source" · "How did you meet?" ·
  "Event Type" · "Related To" · "Activity Type" · "Related To (Type)").
- The entity-edit-dialog wires the association: `Label htmlFor=
  {"edit-" + f.key}` + `Input id={"edit-" + f.key}` +
  `SelectTrigger aria-label={f.label}` (ids are collision-safe — only
  one dialog is open at a time; Radix unmounts closed content).
- The `parseCsv` fix (F-172e): the `\r\n`/`\r` → `\n` normalization
  moves INSIDE the state machine (applies only outside quoted cells —
  the RFC 4180 form); quoted CRLF stays field data.
- ZERO className/DOM changes beyond the attributes + the parser
  internals — the drift gates + probe:ref re-verified post-fix as proof.

### WP-4 — the dialog-open e2e scans (the two-gate extended)

`tests/e2e/a11y.spec.ts` +6 EXPLICIT registrations (the census form —
one literal `test()` per check): the five CREATE dialogs (open →
`scanTwoGate` → Escape) + the contact EDIT dialog (row ⋮ menu → Edit →
scan → Escape). E2E 186 → 192. The sanctioned register rides unchanged
(the open-dialog landscape verified live: nothing new behind the
dialogs).

### WP-5 — the docs lockstep

The count ladder (UNIT 2668 → the new count · SUITES 135 → 137 · E2E
186 → 192 · the badge) via the house script form (assert-first,
idempotent, unique-anchor — count-ladder-172.py) · the AGENTS
Session-172 section + the Commands-table counts · the PAD ADR-017 (the
closed-surface naming doctrine + the property-family doctrine) + the §11
inventory rows for the two new suites · the SKILL frontmatter + H1 + the
s172 head layer · the CLAUDE testing-section counts + the dialog/property
doctrine lines · the README badge + Tested row · session_366.md + the
plan's execution record + the worklog entry.

### WP-6 — the captures

Captures 425-428 (the round's surfaces at phone + desktop — the
attribute-only fixes carry no visual delta by design; the captures
document the standing dialog surfaces + the property battery's report
form).

## 2. The verification ledger (the final gate)

lint 0/0 → tsc 0 → the unit suite (137 suites / the new count) → build
(the hygienic artifact) → smoke 14/14 → e2e (the 186 + 6 = 192 checks,
the dialog-open scans GREEN) → the drawer battery 7/7 re-run → probe:ref
STABLE re-run → the sweeps CLEAN re-run (the attribute-only proof) → db
census MATCH → the mutation proof → commit `:zap: feat: session-172 …`
→ the SSH-wrapper push to main (the runbook form) → the remote
verification.

---

## The execution record (2026-10-23)

The plan executed TDD-first, in order:

- **WP-1** — `tests/dialog-controls.test.ts` (the 136th suite, +14):
  RED birth 6 failing + 8 born-green (the census counts, the photo
  pair, the configs, the spec contracts born-green with the spec, the
  devDep pins born-green with the bun add).
- **WP-2** — `tests/property.test.ts` (the 137th suite, +13): RED
  birth 2 failing (the P-a csv round-trip — the F-172e parser defect
  caught by the property AT BIRTH, the shrunk counterexamples leading
  straight to the quoted-CRLF mutation) + 11 born-green freeze pins.
  THREE live-caught property-calibration catches at RED birth (each a
  seam contract the generator must respect): the "unqualified"
  vocabulary intrusion (the EDIT dialog's word is NOT the filter
  vocabulary — `LEAD_FILTER_STATUS_OPTIONS` is the truth) · the
  undefined minValue (the seam contract is raw strings, "" = unset) ·
  the ragged-row normalization (the toCsv model renders fixed-width
  column sets — and the parsed csv ALWAYS leads with the header row).
- **WP-3** — the GREEN phase: the 9 create-dialog aria-labels (the
  sibling Label's exact text) + the edit-dialog htmlFor/id wiring
  (`edit-${f.key}`) + `aria-label={f.label}` on the config-driven
  trigger + THE PARSER FIX (F-172e: the line-ending normalization
  moved INSIDE the state machine, outside quotes only — RFC 4180
  §2.6; the pinned s26 mixed-endings test stays green) + fast-check
  ^4.10.2 DECLARED (the 13th devDep).
- **WP-4** — the two-gate extension: `tests/e2e/a11y.spec.ts` +6
  EXPLICIT registrations (the five create dialogs + the contact edit
  dialog — open → scanTwoGate → Escape; the sanctioned register rides
  UNCHANGED, the open-dialog landscape verified live). E2E 186 → 192.
- **WP-5** — the count ladder 2668 → 2697 (+29) · SUITES 135 → 137 ·
  E2E 186 → 192 (+6) · badge 2854 → 2889 (count-ladder-172.py +
  skill-head-172.py, assert-first, idempotent — the re-runs verified
  0-flip no-ops). The collateral re-anchors: dialog-geometry (the
  bare-cell pin rides the aria-label form) · dead-code-hygiene (the
  13th devDep) · inventory-census (the 37-row surface) · docs-counts
  (the constants + the Appendix B a11y row 25 → 31 + the layer-axis
  pin) · login-family + the dialog-geometry CLAUDE lockstep carriers
  (2668/186 → 2697/192) · README (the commands list + the Tested row).
  The docs: the AGENTS Session-172 section · the PAD ADR-017 + the
  session-172 inventory row + the two §11 rows · the SKILL v1.169.0 +
  the s172 head layer (the s171 layer demoted at its ship counts) ·
  the CLAUDE property-pyramid section + the a11y dialog bullet · the
  README Tested row's s172 mentions.
- **WP-6** — the captures 425-428 (the open dialog surfaces at
  desktop + phone).
- **The verification ledger** — lint 0/0 · tsc 0 · 137/2697 · build
  (the ~151 MB hygienic artifact) · smoke 14/14 · e2e **192/192** (the
  6 dialog-open scans GREEN, verified standalone 32/32 on the a11y
  spec) · db census MATCH · the mutation-proof (the planted badge
  regression 2889 → 2854 → exactly 1 RED → reverted → GREEN) · THE
  ATTRIBUTE-ONLY PROOF: the drawer 7/7 + probe:ref STABLE + the
  sweeps CLEAN re-run post-fix.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
