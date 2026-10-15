# Session 123 — the reports export/PDF family walk + the six-fix remediation

The 123-c rotation — the session_263 close's first-named candidate: the
reports **export/PDF arm** (the s25/s74-era surfaces ~98 sessions since the
single-app live probe; s85 walked the tab-content, s105 the mobile face,
s116 the tables — the export CLICK contracts and the saved-reports flow
were never two-app-walked).

## The walk design

The s115-s122 idiom: the walk scripts OUTSIDE the repo
(`/home/z/my-project/walks/walk11-reports-zero.ts`), PORT 3141, login
first on both, both apps at 1440×900 + 390×844 with computed-style +
census extraction, the walk db riding the standing zero-data tool
(entities wiped, users + settings kept — matching the reference's OWN
zero-data genus, probe:ref #95).

- **PASS 1 (zero-data, two-app)**: the /reports shell (the h1 + subtitle
  + the "Saved Reports (0)" button); the sticky filter bar (the 4 selects
  + Reset + the Export CSV/PDF duo); the tablist (the 5 triggers); THE
  DOWNLOAD CONTRACTS (the filter-bar CSV + PDF clicks + the Pipeline tab's
  per-table quartet — filenames date-normalized, CSV bytes/content, PDF
  structural contracts: magic/pages/sizeBand/title-found — never md5, the
  /CreationDate + raster nondeterminism); the Save Custom Report View
  dialog (title + name field + the 6 checkboxes + the Current Filters box
  + the footer pair); the 390 face + docScrollW.
- **PASS 2 (populated, ours-only — the reference's zero-data genus)**: the
  populated export contracts (the filter-bar CSV's row count vs the db +
  the per-table CSVs/PDFs' rows) + the saved-reports round-trip (save →
  the localStorage seam → the count label → reopen → Load applies the
  filters), every mutation db-verified.

## PASS 1 as walked (the standing tree): 12 raw diffs → 6 REAL findings

1. **F-123a1 (pre-walk, tooling)**: the platform shell env carries
   `DATABASE_URL=file:/home/z/my-project/db/custom.db` (a stale absolute
   path — the workspace relocated; the target does not exist). The sweep's
   zero-data spawn guards it (Session-93 F-A `delete zEnv.DATABASE_URL`)
   but the DEV-SERVER spawns (`scripts/sweep.ts` boot + 
   `scripts/drawer-battery-390.ts` boot) inherit it raw → the absolute
   URL matches neither bun-absolutization signature → the db-path seam
   treats it as an intentional override → every db route 500s (login
   included) → the drift sweeps/batteries fail at OUR login. Reproduced
   live; `env -u DATABASE_URL` restores everything.
2. **F-123a2 (the BOM)**: the reports header CSV's download face ships
   `\uFEFF` (57 bytes at zero rows); the reference's own client-side
   artifact is BOM-less (54 bytes, the content otherwise byte-identical).
   The s25 convention ("BOM keeps Excel happy") was OUR route's choice —
   never a decoded reference fact; the live artifact is the authority.
3. **F-123a3 (the per-table PDF geometry family)**: the reference's text
   PDFs decode to mm-anchored constants — title **Helvetica-normal** 16pt
   at (14mm, 15mm) [ours: bold at (40pt, 40pt)], Generated normal 10pt at
   (14, 22) [ours 62pt], column headers **bold 9pt** at x = 14 + i×60mm,
   y = 32mm [ours bold 10pt, span-derived columns], flat 60mm column
   spacing [ours span/3], **no header rule at zero rows** [ours draws
   unconditionally], line width = jsPDF's unit-mm default flush
   (`0.567pt` — never setLineWidth). VERIFIED: the mm-unit candidate's
   content stream is BYTE-EQUAL to the reference's zero-row artifact
   (modulo the same-day date).
4. **F-123a4 (the dialog Save button pair)**: the reference's "Save
   Report" computes bg rgb(23,23,23) + #fafafa — the DIALOG_SUBMIT black
   pair our entity dialogs already ship ("Create Contact" verified
   byte-equal). Ours rides the default blue variant.
5. **F-123a5 (the bar Export CSV's literal pair)**: the reference's
   filter-bar Export CSV carries literal `bg-blue-600 hover:bg-blue-700
   text-white` (bg byte-equal; the text computes #ffffff vs our token
   #fafafa). The reference's own mixed usage: toolbars ride the token
   pair (s119), the reports bar rides literals.
6. **F-123a6 (the v4 space-y trailing-margin genus)**: Tailwind v4's
   `space-y-6` emits margin-bottom (all-but-last); the reference's v3-style
   emits margin-top. Visually identical (collapse), but our trailing
   mb=24 extends the scroll extent: main scrollHeight **1545 vs the
   reference's 1521** at zero-data (the +24 confirmed by section-walk:
   all children/margins arithmetic sums to 1521; the trailing margin is
   the only excess). Visible only in the scroll extent + the PDF capture
   height — the drift gates' viewport shots stay clean.

**The adjudicated noise genera (record-only)**: L-123c1 the raster-PDF
bytes (the html2canvas captures can never byte-compare — same capture
logic verified: scale-2, A4 portrait, 1 page at zero-data, the image dims
exactly 2× the content region on both apps); L-123c2 the jsPDF metadata
(/CreationDate + /Producer "jsPDF 4.2.1" vs the reference's "4.0.0" —
same length, never byte-comparable); L-122c1 the disabled-cursor genus
(standing — the dialog Save button at zero-typed).

**The byte-equal contracts confirmed**: the per-table CSVs (17/19 bytes
exact, both apps), the download filenames (all 6, date-normalized), the
dialog census (byte-equal on every axis incl. the 6 checkbox labels and
the Current Filters text), the filter-bar/tablist/shell census at both
widths, the per-table PDF titles + Generated lines + column headers (the
text content byte-equal in the streams).

## The remediation (TDD: pins RED-first → fixes → GREEN → stash-proofs)

- **D-123a0** (F-123a1): the dev-server spawns in sweep.ts +
  drawer-battery-390.ts construct a guarded env (DATABASE_URL deleted —
  the Session-93 F-A rule extended to the boot sites). Pins: the sweep +
  drawer-battery tool tests.
- **D-123a1** (F-123a2): the route serves the CSV artifact VERBATIM on
  both faces (the `download` branch's csvWithBom retired; the import
  cleanup); the e2e BOM assertion updated to the BOM-less contract; the
  page's fetch→blob comment realigned. Pin: the csv-contract retirement
  it.
- **D-123a2** (F-123a3): exportTablePdf rewritten to the reference's
  mm-anchored geometry (unit "mm"; margin 14; title normal-16 at (14,15);
  Generated normal-10 at (14,22); headers bold-9 at 14+i×60, y=32; the
  rule gated on rows.length > 0; no setLineWidth; the row ladder
  rowHeight 8mm; the 27-char clip + the page-break carried over). Pins:
  the pdf-export geometry its.
- **D-123a3** (F-123a4): the Save Report button carries
  DIALOG_SUBMIT.button (the black pair). Pin: the reports-page-parity
  dialog it.
- **D-123a4** (F-123a5): the bar Export CSV button carries the literal
  `bg-blue-600 hover:bg-blue-700 text-white` pair. Pin: the
  reports-page-parity bar it.
- **D-123a5** (F-123a6): the reports Tabs wrapper drops `space-y-6`; the
  panels' `mt-2` → `mt-6` (the reference's computed mt=24 geometry; no
  trailing margin → the scroll extent matches). Pin: the
  reports-page-parity wrapper it.
- **D-123a6**: the docs realignment + the captures 220-223 + the session
  records + the .env.example verify.

## The verification ladder

The unit pins GREEN → the 6 stash-proofs (each pinned content reverted
alone → its pin REDs alone) → the full suite → the rebuild → **PASS 1
re-run on the fixed build** (expect: only the adjudicated noise genera
left — the raster bytes + the PDF byte-count axis) → **PASS 2 populated
ours-only** (the post-fix export contracts + the saved-reports
round-trip, db-verified) → the final gate (lint 0/0 · tsc 0 · unit ·
build · e2e 137/137 · the closing drift sweep · census MATCH) → the
captures 220-223 + the VLM battery → the commit + the SSH-wrapper push.

## The count ladder (as planned)

UNIT 1972 → 1972 + N (the pins below, all in EXISTING files); SUITES 110
UNCHANGED; E2E 137 UNCHANGED (the BOM assertion is an in-place update);
badge 2109 → 2109 + N.

## The execution record (as shipped)

- **D-123a0 shipped**: the sweep + drawer-battery dev-spawn guards (the
  `delete devEnv.DATABASE_URL` env construction at both boot sites; the
  battery's runbook `env -u` prefix retired). Pins: +2 its
  (sweep-tool.test.ts). Stash-proofs: each reverted alone → its pin REDs
  alone (1|48 each).
- **D-123a1 shipped**: the route serves the csv artifact VERBATIM on
  both faces (the `csvWithBom` import retired); the e2e BOM assertion
  updated in place (`startsWith("Deal Name,…")`); the page's two
  fetch→blob comments realigned. Pin: +1 it (csv-contract). Stash-proof:
  1|9.
- **D-123a2 shipped**: exportTablePdf rewritten to the verified mm
  geometry (unit "mm"; margin 14; title normal-16 at (14,15); Generated
  normal-10 at (14,22); headers bold-9 at margin+i×60, y=32; NO
  setLineWidth — the default flush emits the reference's exact operator;
  the rule gated on rows.length > 0; the row ladder rowHeight 8mm + the
  27-char clip + the page-break redraw). Pins: +2 its (pdf-export).
  Stash-proof: 2|10.
- **D-123a3 shipped**: the Save Report button carries
  DIALOG_SUBMIT.button (the black pair). Pin: +1 it
  (reports-page-parity). Stash-proof: 1|41.
- **D-123a4 shipped**: the bar Export CSV button carries the literal
  `bg-blue-600 hover:bg-blue-700 text-white` (through cn/twMerge).
- **D-123a5 shipped**: the reports Tabs wrapper's `space-y-6` retired;
  the five TabsPanel classNames `mt-2` → `mt-6`. Pins: +2 its
  (reports-page-parity, the bar pair + the wrapper model). Stash-proof:
  2|40. Collateral: the dialog-geometry space-y census re-anchored
  108 → 107; the s74 actions-cluster pin's window widened 2400 → 3200
  (the N-46c genus).
- **D-123a6 shipped**: session_264.md + this record + the worklog +
  SKILL v1.120.0 (the §16dk layer + the project_state s123 head + the
  H1 + the Appendix B 1980) + the README badge 2117 + the Tested row's
  s123 clause + the AGENTS §Session-123 + the CLAUDE 4 sites + the PAD
  5 sites + the s123 inventory row + the captures 220-223 + the VLM
  battery 4/4 × 4 CLEAN.
- **The count ladder as shipped**: UNIT 1972→1980 (+8, all in EXISTING
  files) · SUITES 110 UNCHANGED · E2E 137 UNCHANGED (the BOM assertion
  is an in-place update) · badge 2109→2117.
- **The gate**: lint 0/0 · tsc 0 · 110/1980 · build · 137/137 · the
  closing drift sweep CLEAN on all four gates · census MATCH · src/ 5
  files + scripts/ 2 files changed (the six-fix session).
- **The live verification ladder**: the POST-FIX PASS 1 re-run (two-app,
  the remediated build) 0 diffs @1440 + 0 @390 with the download
  contracts BYTE-EQUAL (the barCsv 54/54 BOM-less + the per-table CSVs
  byte-exact + the text PDFs SIZE-EXACT 3563/3559) · PASS 2 the
  populated face ours-only 42/42 (the export contracts db/API-verified
  + the saved-reports round-trip).
