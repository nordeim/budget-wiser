# The session-171 plan — THE AXE-CORE A11Y TWO-GATE + THE NAMED-CONTROL FAMILY

Date: 2026-10-23 · Rotation: 171 ·
Task: audit + validate the session-170 ship (the error-boundary family +
the boot gate + the smoke leg + the artifact hygiene + the
doctrine-straggler closure), remediate the findings TDD-first, align every
doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `ddbbd3b` (the s170 ship `7d3c551` + its session-log
commit; fresh-clone intake: `bun install` → `.env` with a fresh 64-char
AUTH_SECRET + `file:../db/custom.db` → the ambient `DATABASE_URL` shadow
scrubbed with `env -u` on every DB-touching command → `db:push`/`db:seed`
→ census MATCH 15/24/10/23/12 + 4 users → playwright chromium installed):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **134/2644** (the s170 ship state) |
| build | GREEN (29 routes, the ~151 MB hygienic artifact) |
| smoke | GREEN **14/14** (incl. the boot-gate probe + the artifact-hygiene assertions) |
| e2e | GREEN **161/161** (3.5 m clean run) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c…` — the s168/s169/s170 fingerprint; the reference unchanged) |
| drift gates | the desktop + phone sweeps **CLEAN** live |
| mobile drawer | **7/7 PASS** live at 390×844 (`scripts/drawer-battery-168.ts`) — the operator's particular emphasis, no Tailwind v4 regression |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config) |
| sitemap + robots + manifest | 11 routes / standing / standing (smoke check 12 + source) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract + the boot-gate posture) |

The rotation candidate: the s170-named **axe-core a11y gates** (the
web-app-foundation §8.3 "best-in-class add-on" — the two-gate: structural
violations must be zero; color-contrast nodes must cite the sanctioned
palette). The fast-check property tests stay deferred (their own rotation
— the no-mid-rotation-bump posture holds for BOTH families; this round
adopts exactly one).

### The live axe probes (the executable truth this plan stands on)

Three probe scripts (throwaway, `/home/z/my-project/scripts/axe-*171.ts`)
ran axe-core 4.13.0 against the standing dev server across twelve
surfaces × two widths + the drawer-open state — and a fourth ran the SAME
scan against the REFERENCE app (logged in, the same nine surfaces). The
verified violation landscape:

**Ours**: `button-name` (critical) — 19 unnamed SelectTrigger comboboxes
(dashboard ×2 · accounts ×3 · contacts ×15 row selects · activities ×2 ·
reports ×4) + 11 unnamed inert Checkboxes (the dashboard's two Follow-up
families) + 4 icon-only Buttons unnamed at phone width (the
`hidden sm:inline` label family — display:none at 390px evaporates the
accessible name); `svg-img-alt` (serious) — the 4 funnel trapezoids on
/leads; `color-contrast` (serious) — the parity palette family (the
active-nav chip · the drawer links · the landing preview · the quick-log
emerald · the calendar off-month cells · the muted-ink inactive tabs ·
the accounts badge family).

**The reference (verified on its own DOM)**: `button-name` on EVERY page
(6/5/2/2/4/4/6/69 nodes — its own unnamed `w-9` icon-button family), the
IDENTICAL color-contrast palette (`.bg-white/10 > .font-medium` ·
`.bg-emerald-600` · gray-400 calendar cells · the inactive-tab
muted-ink), and the IDENTICAL 4 funnel `svg-img-alt` violations.

**The root causes (each verified in source)**:

1. `role="combobox"` is an ARIA role whose accessible name comes from the
   AUTHOR (aria-label/aria-labelledby) — NOT from contents. axe's
   `subtreeText` short-circuits on `namedFromContents` (verified in the
   axe 4.13 source: the `subtreeText` guard returns `''` for
   non-name-from-content roles), so the trigger's visible span text
   ("Decision Maker", "All Stages") is INVISIBLE to the name computation.
   A screen reader announces the Select as "combobox, collapsed" — no
   name. Radix's own docs prescribe `aria-label` on the trigger.
2. The dashboard's inert Checkboxes render bare `<Checkbox />` with the
   label as a SIBLING span — the `label` prop (which wires `<label
   htmlFor>`) is unused, and the layout forbids switching to it (the
   label prop renders its own row wrapper — visual drift).
3. The `hidden sm:inline` button labels: `display:none` text contributes
   nothing to the accessible name at phone width.
4. recharts 2.15 HARDCODES `role="img"` on the funnel trapezoid Layer
   (`renderTrapezoidsStatically` in `lib/numberAxis/Funnel.js:111`) —
   no aria seam exists (`adaptEventsOfChild` passes event keys only,
   verified in `lib/util/types.js`). The reference ships the identical
   rendering.

### The code findings (each reproduced live)

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-171a | **19 unnamed SelectTrigger comboboxes on the open surfaces** — every Select announces nameless to screen readers (the combobox naming rule above). The leads-page popover pair already carries the house precedent (`aria-label="Filter by status"` / `"Filter by source"`) — the fix extends it to every open-surface trigger. | dashboard/page.tsx:298,310 · accounts-page.tsx:512,524,536 · contacts-page.tsx:596 (×15 rows) · activities-page.tsx:498,510 · reports-page.tsx:141,155,168,182 | High | Verified |
| F-171b | **11 unnamed inert Checkboxes on the dashboard** (leadSources.slice(0,4) ×4 + the upcomingActivities family ×7 at the seeded state) — bare `<Checkbox />` with sibling-span labels. | dashboard/page.tsx:499,534 | High | Verified |
| F-171c | **4 icon-only Buttons unnamed at phone width** — the `hidden sm:inline` label family: dashboard Filter (281) · contacts Scan Card (386) + Import (389) · accounts Export CSV (220). | 3 page files | High | Verified |
| F-171d | **No axe-core a11y gate** — the §8.3 two-gate never landed (the s170-named next-rotation candidate this round adopts). | tests/e2e/ (absent) | Medium | Verified |
| F-171e | **axe-core rides as an UNDECLARED transitive dep** (4.13.0 via eslint-config-next ← eslint-plugin-jsx-a11y) — an eslint-config bump could silently drop it from under the gate. | package.json | Low | Verified |

### The sanctioned families (pinned, NOT fixed — the parity doctrine)

The reference ships all three families identically (verified live on its
DOM). Per "match the reference, fix its defects":

- **color-contrast — the parity palette**: the `.bg-white/10` active-nav
  chip + the `.text-white/*` drawer family on the navy rail · the
  landing's mini-CRM preview grays · the `.bg-emerald-600` quick-log
  primaries · the calendar's gray-400 off-month cells · the muted-ink
  (#737373, 4.05:1) inactive tabs · the accounts `.bg-danger`/`.bg-blue-100`
  badge family. Fixing them would BREAK visual parity — they are pinned
  as the sanctioned palette with citations.
- **svg-img-alt — the recharts genus**: the funnel trapezoid Layers
  (library-hardcoded `role="img"`, no seam) — the reference's identical
  rendering. Patching recharts internals is not the house style.

The aria-label fixes ARE the remedy for F-171a/b/c: invisible supersets
(zero visual drift — the drawer precedent: the reference ships no mobile
nav, ours does; the reference ships nameless controls, ours name them).

Out of scope this round (documented, not silently dropped): the
fast-check property tests (the other s170-named candidate — its own
rotation); the 9 dev-toolchain advisories (the standing posture); the
reference's OWN button-name family (its defect, not ours to mirror).

## 1. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the a11y-controls source-pin battery (the 135th suite)

`tests/a11y-controls.test.ts` (+~30) — the L-165c1 doctrine extended to
the control-naming family: every fix pinned live-read against the page
sources (the aria-label forms on all five pages' SelectTriggers, the two
Checkbox families, the three icon-only Buttons, the contacts row
context form) + the package.json axe-core devDep pin + the e2e spec's
two-gate contract pins (the sanctioned matcher list + the structural
zero-rule). Mutation-proven at birth (the house ritual).

### WP-2 — the two-gate e2e spec

`tests/e2e/a11y.spec.ts` (+25) — the §8.3 two-gate as a Playwright
battery riding the standing harness (storageState auth, the standalone
server on :3100, the seeded e2e.db):

- 9 CRM pages at desktop (1280×800) + 9 at phone (390×844)
- 3 anon surfaces (login/signup/landing) × both widths
- 1 drawer-open state at phone (the operator's emphasis)
- The GATE: run axe-core (wcag2a/2aa/21a/21aa tags) via `addScriptTag`
  from the DECLARED devDep; assert **structural rules = ZERO
  violations** (button-name, link-name, list, label, etc.); assert every
  `color-contrast` + `svg-img-alt` node matches the SANCTIONED matcher
  list (each matcher carries its citation — the palette family or the
  recharts genus). A new unsanctioned violation REDs the gate.

### WP-3 — the named-control fixes (the GREEN phase)

- The ~19 SelectTriggers gain `aria-label` (the leads precedent form:
  "Filter by stage/source/owner/industry/revenue range/status/period" on
  the filter family; the contacts row selects carry the row context).
- The two inert Checkbox families gain per-row `aria-label` (the sibling
  span's text — "Follow up with {source}" / the activity subject).
- The 4 icon-only Buttons gain `aria-label` matching their desktop label
  ("Filter" · "Scan Card" · "Import" · "Export CSV").
- ZERO className/DOM changes — the fixes are attribute-only (the drift
  gates + probe:ref re-verified post-fix as proof).

### WP-4 — package.json declares the dep

`axe-core` joins devDependencies (`^4.13.0` — the version already
resident via the transitive path, so the lockfile gains only the direct
edge). No other bumps (the no-mid-rotation-bump posture).

### WP-5 — the docs lockstep

The count ladder (UNIT 2644 → the new count · SUITES 134 → 135 · E2E
161 → 186 · the badge) · the AGENTS Session-171 section + the
Commands-table e2e count · the PAD ADR-016 (the a11y two-gate doctrine)
+ the §7.1 inventory row + the §11 lines · the SKILL v1.168.0 frontmatter
+ H1 + the s171 head layer + the §8/§20 surface rows · the CLAUDE
testing-section counts + the a11y doctrine line · the README badge +
Tested row + the a11y gate mention · session_364.md + the plan's
execution record + the worklog entry.

### WP-6 — the captures

Captures 421-424 (the round's surfaces at phone + desktop — the
remediated pages carry no visual delta by design; the captures document
the standing surfaces + the a11y gate's own report form).

## 2. The verification ledger (the final gate)

lint 0/0 → tsc 0 → the unit suite (135 suites / the new count) → build
(the hygienic artifact) → smoke 14/14 → e2e (the 161 + 25 = 186 checks,
the a11y two-gate included) → the drawer battery 7/7 re-run → probe:ref
STABLE re-run → the sweeps CLEAN re-run (the attribute-only proof) → db
census MATCH → the mutation proof → commit `:zap: feat: session-171 …`
→ the SSH-wrapper push to main (the runbook form) → the remote
verification.

---

## The execution record (2026-10-23)

The plan executed TDD-first, in order:

- **WP-1** — `tests/a11y-controls.test.ts` (the 135th suite, +22): RED
  birth 21 failing + 1 born-green (the leads-precedent pin — the leads
  popover pair already carried `aria-label="Filter by status"` /
  `"Filter by source"`); the spec-contract pins born-green with the
  spec. GREEN after WP-3/4.
- **WP-2** — `tests/e2e/a11y.spec.ts` (25 checks): THREE live-caught
  defects at birth — the loop-registered spec broke the Appendix B
  per-spec `test(` census (rewritten to 25 EXPLICIT registrations —
  the census idiom requires one literal test() per check); the
  regex-literal escaping trap in the sanctioned register (`\\/`
  terminates the literal — rewritten to plain substring matchers); the
  `.self-start` landing pill missing from the matchers (caught by the
  e2e run itself, then verified byte-identical on the reference's
  landing DOM before sanctioning it).
- **WP-3** — the named-control fixes: aria-label on the 19 open-surface
  SelectTriggers (the "Filter by X" precedent form; the contacts rows
  carry `Role — ${c.name}`), the two inert Checkbox families (their
  sibling-span text), and the 4 phone-width icon-only Buttons (their
  desktop labels). ZERO className/DOM changes — the attribute-only
  proof re-verified (drawer 7/7 · probe:ref STABLE · the sweeps CLEAN).
- **WP-4** — `axe-core@^4.13.0` declared via `bun add -d` (matching the
  resident transitive — zero lockfile churn beyond the direct edge).
- **WP-5** — the count ladder 2644 → 2668 (+24: a11y-controls +22 +
  inventory-census +2 — the two new §11 rows, the L-166c3 lesson live
  again) · SUITES 134 → 135 · E2E 161 → 186 (+25) · badge 2805 → 2854
  (count-ladder-171.py + skill-head-171.py + skill-head-fix-171.py,
  assert-first, idempotent — the re-runs verified 0-flip no-ops). The
  collateral re-anchors: reports-filter-parity · dead-code-hygiene ·
  dialog-geometry (the CLAUDE 2559 straggler the s170 round missed) ·
  login-family · docs-counts. The docs: the AGENTS Session-171 section
  · the PAD inventory row + ADR-016 + the two §11 rows · the SKILL
  v1.168.0 + the s171 head layer + the Appendix A ADR-016 row + the
  Appendix B a11y row · the CLAUDE e2e bullet · the README Tested row.
- **WP-6** — the captures 421-424 (the round's remediated surfaces at
  phone + desktop — attribute-only by design, the standing surfaces
  documented) + the VLM battery.
- **The verification ledger** — lint 0/0 · tsc 0 · 135/2668 · build
  (the ~151 MB hygienic artifact) · smoke 14/14 · e2e **186/186** (the
  25 a11y checks GREEN) · db census MATCH · the mutation-proof (the
  planted badge regression → exactly 1 RED → reverted → GREEN).
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
