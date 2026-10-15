import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-74 parity suite (the 74-c reports-page family rotation): every
// pin mirrors a BUNDLE-DECODED reference fact (the fresh-fetched
// index-DZ-xbrIm.js, md5 a70a637… — the 45th consecutive stable bundle).
//
// The reference facts pinned here (all decoded this session):
// - the `lCe` filter bar's stage select ships `closed_won → "Closed Won"`
//   and `closed_lost → "Closed Lost"` (the six-item list decoded verbatim).
// - the period resolution (the SINGLE resolution site, the shared `g`
//   memo): thisWeek → `Zu(O)` = date-fns startOfWeek with the DEFAULT
//   weekStartsOn (the ??0 chain → SUNDAY); quarter → `bK(O,3)` =
//   subMonths(now, 3) — a ROLLING 3-month window (day + time preserved,
//   end-of-month clamped via the cK algorithm); the `ld` filter is
//   inclusive BOTH ends (future rows excluded from finite periods).
// - the t3e Leads List by Source renders `e.slice(0,10)` + the Status
//   cell as `zn variant:"outline"` with the RAW `o.status`.
// - the per-table dB export data carries `$${(amount||0).toLocaleString()}`
//   (the CSV side stays raw — both reference functions decoded); the
//   at-risk PDF title is the SHORT "Deals at Risk".
// - the n3e save dialog: body `space-y-6 py-4` > a `space-y-4` section
//   (Input mt-1; columns `grid grid-cols-2 gap-3`; the Current-Filters
//   `bg-blue-50 border border-blue-200 rounded-lg p-3` box with
//   `text-sm text-blue-800`) + the Save Report button's Save icon; the
//   dialog state PERSISTS across opens (no reset-on-open; the name
//   clears only after a successful save).
// - the lCe Reset button is the LAST CHILD of the selects cluster.
// - the `ay` KPI card: the icon color map carries the -600 TEXT classes
//   (text-blue-600 #2563eb — the sparkline strokes stay -500); the
//   spark slot is the BARE `flex-1 h-12 mr-2` (no max-width); the value
//   is a single template string on a PLAIN `text-2xl font-bold
//   text-gray-900` div.
// - the cCe/e3e trend lines (Revenue Over Time + Activities Over Time)
//   ship NO name (the raw dataKey in the tooltip); the tab-1 Pipeline
//   tooltip formatter is the plain `p.toLocaleString()`.
// - the table cells: `font-medium` (primary) / BARE (secondary) /
//   `text-right` (amounts) — no text-foreground/text-muted/font-semibold.
// - the per-table export button icons: `w-4 h-4 mr-2`.
// - the ZEe forecast bands accumulate RAW (no Math.round).
// - the y header-CSV passes the RAW close_date string.

import { subMonthsClamped } from "@/lib/format";

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function stripComments(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const page = () => stripComments(read("src/app/(app)/reports/reports-page.tsx"));
const route = () => stripComments(read("src/app/api/reports/route.ts"));
const exportRoute = () => stripComments(read("src/app/api/export/route.ts"));
const dialog = () => stripComments(read("src/components/shared/save-report-dialog.tsx"));
const parts = () => stripComments(read("src/components/shared/page-parts.tsx"));
const charts = () => stripComments(read("src/components/charts/charts.tsx"));
const layout = () => stripComments(read("src/lib/page-layout.ts"));
const constants = () => stripComments(read("src/lib/constants.ts"));

// ---------------------------------------------------------------------------
// S74-P1 — the stage-select labels (M-74c1)
// ---------------------------------------------------------------------------

describe("session-74: the stage select's Closed Won/Closed Lost labels (M-74c1)", () => {
  it("OPP_STAGE_META labels the closed stages Closed Won/Closed Lost (the reference's lCe list)", () => {
    const src = constants();
    expect(src).toMatch(/closed_won:\s*\{[^}]*label:\s*"Closed Won"/);
    expect(src).toMatch(/closed_lost:\s*\{[^}]*label:\s*"Closed Lost"/);
  });

  it("the reports stage select renders the labels (not raw slugs)", () => {
    const src = page();
    expect(src).toContain("OPP_STAGE_META[s].label");
  });
});

// ---------------------------------------------------------------------------
// S74-P2 — the period-semantics pair (M-74c2/c3 + N-74c6)
// ---------------------------------------------------------------------------

describe("session-74: the period semantics — Sunday weeks + rolling quarters (M-74c2/c3)", () => {
  const periodStarts = [
    ["src/app/api/reports/route.ts", route()],
    ["src/app/api/export/route.ts", exportRoute()],
  ] as const;

  for (const [name, src] of periodStarts) {
    it(`${name}: thisWeek resolves to the SUNDAY startOfWeek (the date-fns default)`, () => {
      const at = src.indexOf('case "thisWeek"');
      expect(at).toBeGreaterThanOrEqual(0);
      const arm = src.slice(at, at + 140);
      expect(arm).toMatch(/startOfWeek\(now,\s*"sunday"\)/);
      expect(arm).not.toMatch(/"monday"/);
    });

    it(`${name}: quarter resolves to subMonthsClamped(now, 3) — the ROLLING window, not the calendar quarter`, () => {
      const at = src.indexOf('case "quarter"');
      expect(at).toBeGreaterThanOrEqual(0);
      const arm = src.slice(at, at + 140);
      expect(arm).toMatch(/subMonthsClamped\(now,\s*3\)/);
      expect(arm).not.toMatch(/startOfQuarter/);
      expect(src).not.toMatch(/startOfQuarter/);
    });

    it(`${name}: the finite-period where clauses bound BOTH ends (the reference's inclusive ld)`, () => {
      expect(src).toMatch(/gte:\s*from,\s*lte:\s*now/);
    });
  }

  it("subMonthsClamped: the plain month-back preserves day + time-of-day", () => {
    const d = subMonthsClamped(new Date(2026, 9, 6, 7, 30, 15), 3); // Oct 6 -> Jul 6
    expect(d.getTime()).toBe(new Date(2026, 6, 6, 7, 30, 15).getTime());
  });

  it("subMonthsClamped: the month-end CLAMPS (May 31 -> Feb 28; Jul 31 -> Apr 30)", () => {
    expect(subMonthsClamped(new Date(2026, 4, 31), 3).getTime()).toBe(new Date(2026, 1, 28).getTime());
    expect(subMonthsClamped(new Date(2024, 4, 31), 3).getTime()).toBe(new Date(2024, 1, 29).getTime()); // leap
    expect(subMonthsClamped(new Date(2026, 6, 31), 3).getTime()).toBe(new Date(2026, 3, 30).getTime());
  });

  it("subMonthsClamped: zero months is the same instant; the input is never mutated", () => {
    const d = new Date(2026, 0, 15, 10, 0, 0);
    const snapshot = d.getTime();
    expect(subMonthsClamped(d, 0).getTime()).toBe(snapshot);
    expect(d.getTime()).toBe(snapshot);
  });
});

// ---------------------------------------------------------------------------
// S74-P3 — the leads-list slice + the raw-status cell (M-74c4/c5)
// ---------------------------------------------------------------------------

describe("session-74: the Leads List by Source — 10 rows + the raw outline Status (M-74c4/c5)", () => {
  it("the leads-list slice is 10 (the reference's e.slice(0,10))", () => {
    const src = page();
    const region = src.slice(src.indexOf("Leads List by Source"));
    expect(region).toMatch(/slice\(0,\s*10\)/);
    expect(region).not.toMatch(/slice\(0,\s*8\)/);
  });

  it("the Status cell is the outline Badge with the RAW stage (the source-vocabulary form)", () => {
    const src = page();
    const region = src.slice(src.indexOf("Leads List by Source"), src.indexOf("Source Performance Summary"));
    expect(region).toMatch(/<Badge variant="outline">\{l\.stage\}<\/Badge>/);
    expect(region).not.toMatch(/STAGE_META/);
  });
});

// ---------------------------------------------------------------------------
// S74-P4 — the per-table PDF amounts + the short at-risk title (M-74c6)
// ---------------------------------------------------------------------------

describe("session-74: the per-table PDF rows carry formatted amounts (M-74c6)", () => {
  it("both DealsTables call sites split the CSV (raw) from the PDF ($ toLocaleString) rows", () => {
    const src = page();
    expect(src).toMatch(/openPdfRows/);
    expect(src).toMatch(/riskPdfRows/);
    // The formatted amount form — the reference's `$${(amount||0).toLocaleString()}`.
    expect(src).toMatch(/\$\$\{\(d\.amount \|\| 0\)\.toLocaleString\(\)\}/);
  });

  it("the at-risk PDF title is the SHORT 'Deals at Risk'", () => {
    const src = page();
    const at = src.indexOf("deals_at_risk");
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at - 100, at + 900);
    expect(region).toMatch(/exportTablePdf\(\s*"Deals at Risk"/);
    expect(region).not.toMatch(/exportTablePdf\(\s*"Deals at Risk \(No Activity 14\+ Days\)"/);
  });
});

// ---------------------------------------------------------------------------
// S74-P5 — the save-dialog restructure (L-74c7/c8)
// ---------------------------------------------------------------------------

describe("session-74: the SaveReportDialog anatomy (L-74c7)", () => {
  it("the body is the reference's space-y-6 py-4 wrapper over a space-y-4 section", () => {
    const src = dialog();
    expect(src).toMatch(/className="space-y-6 py-4"/);
    expect(src).toMatch(/className="space-y-4"/);
    expect(src).not.toMatch(/className="grid gap-4"/);
  });

  it("the name field's Input carries mt-1 (not a grid gap)", () => {
    const src = dialog();
    const at = src.indexOf('id="reportName"');
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at - 200, at + 400);
    expect(region).toMatch(/className="mt-1"/);
    expect(region).not.toMatch(/grid gap-2/);
  });

  it("the columns are the 2-COLUMN grid (grid grid-cols-2 gap-3)", () => {
    const src = dialog();
    expect(src).toMatch(/className="grid grid-cols-2 gap-3"/);
    expect(src).not.toMatch(/className="grid gap-2"/);
  });

  it("the Current Filters summary is the blue box", () => {
    const src = dialog();
    expect(src).toMatch(/bg-blue-50 border border-blue-200 rounded-lg p-3/);
    expect(src).toMatch(/text-sm text-blue-800/);
    expect(src).not.toMatch(/className="text-sm text-muted"/);
  });

  it("the Save Report button carries the Save icon", () => {
    const src = dialog();
    const at = src.indexOf("Save Report");
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at - 400, at + 100);
    expect(region).toMatch(/<Save\b|Save className/);
  });
});

describe("session-74: the save-dialog state contract (L-74c8)", () => {
  it("NO reset-on-open — the typed name persists across a cancel-reopen (the reference's n3e)", () => {
    const src = dialog();
    expect(src).not.toMatch(/prevOpen/);
    expect(src).not.toMatch(/setColumns\(DEFAULT_SAVED_COLUMNS\)/);
  });

  it("the dialog clears its OWN name after a successful save (the reference's post-save s())", () => {
    const src = dialog();
    const at = src.indexOf("onSave(");
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at - 300, at + 400);
    expect(region).toMatch(/setName\(""\)/);
  });
});

// ---------------------------------------------------------------------------
// S74-P6 — the Reset placement (L-74c9)
// ---------------------------------------------------------------------------

describe("session-74: the Reset button is the selects cluster's last child (L-74c9)", () => {
  it("the Reset button renders INSIDE the selectsWrap, after the status select", () => {
    const src = page();
    const wrapAt = src.indexOf("REPORTS_FILTER_BAR.selectsWrap");
    expect(wrapAt).toBeGreaterThanOrEqual(0);
    // The selectsWrap region runs from its opening to the actions div.
    const actionsAt = src.indexOf("REPORTS_FILTER_BAR.actions");
    expect(actionsAt).toBeGreaterThan(wrapAt);
    const region = src.slice(wrapAt, actionsAt);
    expect(region).toContain("Reset");
    expect(region).toMatch(/setStatus\("all"\)/);
  });

  it("the actions cluster carries ONLY the exports", () => {
    const src = page();
    const actionsAt = src.indexOf("REPORTS_FILTER_BAR.actions");
    // Session-123: the window widened 2400 → 3200 — the F-123a5 className
    // addition on the Export CSV button pushed the button texts past the
    // old span (the N-46c position-fragility genus; the Reset guard stays
    // sound: no "Reset" occurs anywhere after the anchor in the stripped
    // source).
    const region = src.slice(actionsAt, actionsAt + 3200);
    expect(region).toContain("Export CSV");
    expect(region).toContain("PDF");
    expect(region).not.toContain("Reset");
  });
});

// ---------------------------------------------------------------------------
// S74-P7 — the KPI trio (L-74c10/c11/c15)
// ---------------------------------------------------------------------------

describe("session-74: the KPI icon -600 text classes (L-74c10 — re-anchored at s90)", () => {
  it("the -600 glyph classes ride the color-KEY pair maps (the hex-keyed map retired)", () => {
    // Session-90 (L-90c5, bundle-decoded from the reference's ay): the
    // icon glyph classes ride the REPORT_CHIP pair map — the same
    // -600 text classes the s74 decode found (one step darker than
    // the -500 sparkline strokes), keyed by the reference's own color
    // strings instead of the series hexes (the hex-keyed map retired
    // with zero consumers).
    const src = parts();
    const map = src.slice(src.indexOf("REPORT_CHIP"), src.indexOf("REPORT_CHIP") + 600);
    expect(map).toContain('blue: { bg: "bg-blue-50", text: "text-blue-600" }');
    expect(map).toContain('green: { bg: "bg-green-50", text: "text-green-600" }');
    expect(map).toContain('red: { bg: "bg-red-50", text: "text-red-600" }');
    expect(map).toContain('purple: { bg: "bg-purple-50", text: "text-purple-600" }');
    expect(map).toContain('orange: { bg: "bg-orange-50", text: "text-orange-600" }');
  });

  it("the chip renders the icon DIRECTLY with the pair classes (the icon span + inline style retired)", () => {
    // Session-90 (L-90c5): the reference's ay applies `w-5 h-5
    // ${f.text}` to the icon itself — our chip renders the icon
    // component directly, no wrapper span, no inline color style.
    const src = parts();
    const block = src.slice(src.indexOf("export function CircleStatCard"));
    expect(block).toMatch(/<Icon className=\{`w-5 h-5 \$\{pair\.text\}`\} \/>/);
    expect(block).not.toMatch(/style=\{\{ backgroundColor/);
    expect(block).not.toMatch(/icon span|chipIcon/);
  });
});

describe("session-74: the KPI spark slot + value forms (L-74c11/c15)", () => {
  it("the reportsMaxWidth record is RETIRED (the reference's slot is the bare flex-1)", () => {
    const src = layout();
    expect(src).not.toMatch(/reportsMaxWidth/);
    const partsSrc = parts();
    expect(partsSrc).not.toMatch(/reportsMaxWidth/);
  });

  it("the value renders on a PLAIN div (the flex-wrap gap family retired)", () => {
    const src = parts();
    expect(src).not.toMatch(/flex flex-wrap items-baseline gap-1\.5/);
    expect(src).toMatch(/text-2xl font-bold/);
  });

  it("the Won Deals value is the single template string (no leading space fragment)", () => {
    const src = page();
    const at = src.indexOf('label="Won Deals"');
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at, at + 700);
    expect(region).not.toMatch(/\{" "\}/);
    expect(region).toMatch(/k\?\.wonDeals \?\? 0\} \$\{/);
  });
});

// ---------------------------------------------------------------------------
// S74-P8 — the chart hygiene quartet (L-74c12/c13 + N-74c1/c2)
// ---------------------------------------------------------------------------

describe("session-74: the trend lines without names + the pipeline formatter (L-74c12/c13)", () => {
  it("TrendLineChart's series name is OPTIONAL (the unnamed lines render the raw dataKey)", () => {
    const src = charts();
    const at = src.indexOf("export function TrendLineChart");
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at, at + 2000);
    expect(region).toMatch(/name\?:/);
  });

  it("the Revenue Over Time line carries NO name", () => {
    const src = page();
    const at = src.indexOf('title="Revenue Over Time"');
    const region = src.slice(at, at + 600);
    expect(region).not.toMatch(/name: "Revenue"/);
  });

  it("the Activities Over Time line carries NO name", () => {
    const src = page();
    const at = src.indexOf('title="Activities Over Time"');
    // Scope to the TrendLineChart block only — the adjacent vs-wins bars
    // legitimately keep their "Activities"/"Won Deals" names.
    const trendAt = src.indexOf("<TrendLineChart", at);
    const end = src.indexOf("/>", trendAt);
    const region = src.slice(trendAt, end);
    expect(region).not.toMatch(/name:/);
  });

  it("the tab-1 Pipeline by Stage gains the plain toLocaleString tooltip formatter", () => {
    const src = page();
    const at = src.indexOf('title="Pipeline by Stage"');
    // The FIRST Pipeline by Stage is the tab-1 card (the violet bars).
    const region = src.slice(at, at + 600);
    expect(region).toMatch(/formatter=\{numberFormatter\}/);
    expect(region).toMatch(/name="Value \(\$\)"/);
  });

  it("charts.tsx exports numberFormatter (the plain toLocaleString mirror)", () => {
    const src = charts();
    expect(src).toMatch(/export function numberFormatter/);
    expect(src).toMatch(/v\.toLocaleString\(\)/);
  });
});

describe("session-74: the export-button icons + the forecast bands (N-74c1/c2)", () => {
  it("the four per-table export button icons are h-4 w-4 mr-2 (the reference's per-surface class)", () => {
    const src = page();
    expect(src).not.toMatch(/h-3\.5 w-3\.5/);
    // The two table CSV buttons + the two table PDF buttons (the bar's
    // Export CSV rides REPORTS_FILTER_BAR.barBtnIcon — the same h-4 w-4
    // family through the record). Session-82 (M-82c1b) re-anchor: the
    // svgs carry their own mr-2 (the reference's per-surface class)
    // after the iconGap base retirement.
    const downloads = (src.match(/<Download className="h-4 w-4 mr-2" \/>/g) ?? []).length;
    const files = (src.match(/<FileText className="h-4 w-4 mr-2" \/>/g) ?? []).length;
    expect(downloads).toBeGreaterThanOrEqual(2);
    expect(files).toBeGreaterThanOrEqual(2);
  });

  it("the forecast bands accumulate RAW (no Math.round)", () => {
    const src = route();
    const at = src.indexOf("forecastByProbability");
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at - 400, at + 900);
    expect(region).not.toMatch(/Math\.round/);
  });
});

// ---------------------------------------------------------------------------
// S74-P9 — the table cell-class family (L-74c14)
// ---------------------------------------------------------------------------

describe("session-74: the reports table cells are the bare family (L-74c14)", () => {
  it("no text-foreground/text-muted/font-semibold chrome on the reports page's table cells", () => {
    const src = page();
    expect(src).not.toMatch(/className="font-medium text-foreground"/);
    expect(src).not.toMatch(/className="text-muted"/);
    expect(src).not.toMatch(/text-right font-semibold text-foreground/);
    expect(src).not.toMatch(/text-right text-muted/);
  });

  it("the amount cells are the bare text-right family", () => {
    const src = page();
    expect(src).toMatch(/className="text-right"\>\$\{/);
  });
});

// ---------------------------------------------------------------------------
// S74-P10 — the export Close Date (N-74c5)
// ---------------------------------------------------------------------------

describe("session-74: the export CSV's Close Date is the RAW value (N-74c5)", () => {
  it("the Close Date column passes the ISO string, not formatDate", () => {
    const src = exportRoute();
    const at = src.indexOf('"Close Date"');
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(at, at + 200);
    expect(region).toMatch(/toISOString/);
    expect(region).not.toMatch(/formatDate/);
  });
});

// ---------------------------------------------------------------------------
// Session-123 (the 123-c live walk): the export-arm button pairs + the
// Tabs wrapper's mt-model — three live-measured reference facts
// ---------------------------------------------------------------------------

describe("session-123: the export-arm button pairs + the wrapper margin model (the 123-c walk)", () => {
  it("the bar Export CSV carries the reference's LITERAL pair — bg-blue-600 hover:bg-blue-700 text-white (F-123a5)", () => {
    // Live-walked: the reference's filter-bar Export CSV computes
    // bg rgb(37,99,235) + text rgb(255,255,255) — its class string is the
    // literal bg-blue-600 hover:bg-blue-700 text-white (NOT the token
    // pair: its toolbars ride the s119 #fafafa primary-foreground, this
    // bar rides literals — the reference's own mixed usage).
    expect(page()).toMatch(/bg-blue-600 hover:bg-blue-700 text-white/);
  });

  it("the Save Report button carries DIALOG_SUBMIT.button — the reference's black pair, bg rgb(23,23,23) (F-123a4)", () => {
    // Live-walked: the reference's dialog Save computes bg rgb(23,23,23) +
    // #fafafa — the SAME black pair its entity dialogs ride (its
    // "Create Contact" verified byte-equal to our DIALOG_SUBMIT family).
    // Ours rode the default blue variant — a visible divergence.
    expect(dialog()).toMatch(/DIALOG_SUBMIT\.button/);
  });

  it("the Tabs wrapper carries NO space-y — the panels ride mt-6 (the v4 mb-model's trailing margin retired, F-123a6)", () => {
    // Live-walked: Tailwind v4's space-y emits margin-BOTTOM (all-but-last)
    // where the reference's v3-style emits margin-TOP. Visually identical
    // (collapse), but our trailing mb=24 extended main's scrollHeight to
    // 1545 vs the reference's 1521 at zero-data (the PDF capture height +
    // the scroll extent). The wrapper drops space-y-6; the panels' mt-2
    // becomes mt-6 — the reference's computed mt=24 geometry, no trailing
    // margin. (The tab-content wrappers' own space-y-6 are interior —
    // their trailing margins never reach the scroll edge.)
    expect(page()).toMatch(/<Tabs variant="pill" cols=\{5\} value=\{tab\}/);
    expect(page()).not.toMatch(/<Tabs variant="pill"[^>]*className="space-y-6"/);
    expect(page()).toMatch(/TabsPanel tab="sales" className="mt-6"/);
    expect(page()).toMatch(/TabsPanel tab="accounts" className="mt-6"/);
  });
});
