import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-25 CSV export pins (S25-P5): the reference's CSVs are
// client-side blobs downloading as prefix_YYYY-MM-DD.csv — the files
// captured live from the reference's downloads on 2026-10-01:
//
//   leads_2026-10-01.csv        Name,Email,Phone,Company,Value,Status,Source,Next Follow-up
//   crm_report_2026-10-01.csv   Deal Name,Account,Amount,Stage,Source,Owner,Close Date
//   open_deals_2026-10-01.csv   Deal,Stage,Amount
//   deals_at_risk_2026-10-01.csv Deal,Account,Amount   (19B blob spy)
//
// Note the naming inconsistencies that are the reference's OWN: the CSV
// is SINGULAR "crm_report" while the canvas PDF is PLURAL
// "crm_reports". Our clone shipped prefix-YYYYMMDD.csv, a different
// leads column set (Lead Name,…,Expected Close,Created), and the
// reports page's THREE CSV buttons were ALL wired to
// /api/export?type=leads (the leads dataset + the leads filename).
//
// The accounts/contacts header CSVs are DISABLED on the reference at
// zero data (data-gated — 21 sessions; their column sets are
// unknowable, ours stay as-is + documented). The accounts toolbar CSV
// is a no-op there; ours exports (data-gated divergence, documented).

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

describe("session-25: the CSV filename convention (S25-P5)", () => {
  it("csvFilename() emits prefix_YYYY-MM-DD.csv (underscore + ISO date)", () => {
    const code = stripComments(read("src/lib/csv.ts")!);
    // The reference: leads_2026-10-01.csv — NOT leads-20261001.csv.
    expect(code).not.toMatch(/`\$\{prefix\}-\$\{d\.getFullYear\(\)\}/);
    expect(code).toMatch(/pad\(d\.getMonth\(\) \+ 1\)/);
    expect(code).toMatch(
      /`\$\{prefix\}_\$\{d\.getFullYear\(\)\}-\$\{pad\(d\.getMonth\(\) \+ 1\)\}-\$\{pad\(d\.getDate\(\)\)\}\.cs/,
    );
  });
});

describe("session-25/29: the leads CSV column set (S25-P5, re-scoped S29-P5)", () => {
  it("the page's CLIENT-SIDE export ships the reference's 8 columns in order", () => {
    // Session-29 (S29-P5, the U bundle extract): the Export button builds
    // a client-side blob from the FILTERED rows — the header array lives
    // in the page's onExport; the route's leads branch is RETIRED.
    const code = stripComments(read("src/app/(app)/leads/leads-page.tsx")!);
    const exportBlock = code.slice(code.indexOf("function onExport"), code.indexOf("function onExport") + 700);
    expect(exportBlock).toMatch(/"Name", "Email", "Phone", "Company", "Value", "Status", "Source", "Next Follow-up"/);
    // The invented/differing columns retire (scoped to the header array —
    // the SortHead's label="Lead Name" prop is a different surface).
    const headerLine = exportBlock.match(/const header = \[[^\]]*\]/)?.[0] ?? "";
    expect(headerLine).not.toMatch(/"Lead Name"/);
    expect(headerLine).not.toMatch(/"Expected Close"/);
    expect(headerLine).not.toMatch(/"Created"/);
    expect(headerLine).not.toMatch(/"Stage"/);
    // The blob path: unquotedHeaderCsv + downloadBlob + the leads_ prefix.
    expect(exportBlock).toMatch(/unquotedHeaderCsv\(header, rows\)/);
    expect(exportBlock).toMatch(/downloadBlob\(/);
    expect(exportBlock).toMatch(/entityExportFilename\("Leads"\)/);
  });

  it("the export route serves type=report ONLY (the leads branch retired)", () => {
    const code = stripComments(read("src/app/api/export/route.ts")!);
    expect(code).toMatch(/if \(type !== "report"\) return ERR\.BAD_REQUEST\("Invalid type"\)/);
    expect(code).not.toMatch(/type === "leads"/);
  });
});

describe("session-25: the reports CSV wiring (S25-P5)", () => {
  it("the export route handles type=report with the reference's 7 deal columns", () => {
    const code = stripComments(read("src/app/api/export/route.ts")!);
    // S29: the report branch is the ONLY branch (guarded by the
    // `type !== "report"` early return).
    expect(code).toMatch(/type !== "report"/);
    const reportBlock = code.slice(code.indexOf("const period"));
    expect(reportBlock).toMatch(/"Deal Name"/);
    expect(reportBlock).toMatch(/"Close Date"/);
    // The report CSV is filter-aware (the same period/owner/stage/status
    // params as /api/reports).
    expect(code).toMatch(/searchParams\.get\("period"\)/);
  });

  it("the reports page's header Export CSV targets type=report (NOT leads)", () => {
    const code = stripComments(read("src/app/(app)/reports/reports-page.tsx")!);
    expect(code).not.toMatch(/\/api\/export\?type=leads/);
    expect(code).toMatch(/type=report/);
    // Filter params ride the URL (the current filter state).
    expect(code).toMatch(/period=|period: |\$\{period\}/);
  });

  it("the per-table CSVs are client-side blobs from the in-memory rows", () => {
    const code = stripComments(read("src/app/(app)/reports/reports-page.tsx")!);
    // The tables' own data flows into a client-side toCsv + downloadBlob
    // (the reference's model — blob: text/csv captured by the spy).
    expect(code).toMatch(/toCsv\(/);
    expect(code).toMatch(/downloadBlob\(/);
  });

  it("the per-table CSVs use the reference's SHORTER prefixes (its own inconsistency)", () => {
    const code = stripComments(read("src/app/(app)/reports/reports-page.tsx")!);
    // The reference's CSV filenames are SHORTER than its PDF slugs —
    // both captured live: open_deals_2026-10-01.csv (vs the PDF's
    // open_deals_by_stage_…) and deals_at_risk_2026-10-01.csv. The
    // prefixes are explicit per-button literals.
    expect(code).toMatch(/exportTableCsv\("open_deals"/);
    expect(code).toMatch(/exportTableCsv\("deals_at_risk"/);
    // The PDF keeps the title-derived slug family.
    expect(stripComments(read("src/lib/pdf-export.ts")!)).toMatch(/tableSlug/);
  });

  it("download.ts exports downloadBlob() for the client-side artifact family", () => {
    const code = stripComments(read("src/lib/download.ts")!);
    expect(code).toMatch(/export function downloadBlob/);
    // Blob + object URL + anchor click + revoke — the standard client
    // download construction (what the reference's spies observed).
    expect(code).toMatch(/createObjectURL/);
    expect(code).toMatch(/revokeObjectURL/);
  });
});

describe("session-122: the zero-row EMPTY-export face (the 122-c walk — D-122a2b)", () => {
  it("entityDumpCsv([]) === \"\" — no rows → no header → an EMPTY artifact (the walk's D6 live-verified genus)", async () => {
    // Live-walked on BOTH apps (the 122-c PASS 1): at zero data all four
    // export buttons download 0-BYTE artifacts — the header IS the first
    // row's own keys, so no rows means no header. The post-reset face
    // (the PASS 2 D6 check) rides the same contract. The reference's own
    // bundle decode (s26): "at zero data — EMPTY blob bodies, because
    // the header row is the FIRST ROW's own keys".
    const { entityDumpCsv } = await import("@/lib/entity-export");
    expect(entityDumpCsv([])).toBe("");
    // and the populated shape: the unquoted first-row-keys header + the
    // quoted values (the walk's B1-B4 live contract)
    const csv = entityDumpCsv([{ id: "x1", name: "Ada" }]);
    expect(csv).toBe('id,name\n"x1","Ada"');
  });
});

// ---------------------------------------------------------------------------
// Session-123 (F-123a2, D-123a1): the reports CSV artifact serves VERBATIM
// ---------------------------------------------------------------------------

describe("session-123: the reports CSV download face is BOM-less (the 123-c live walk)", () => {
  it("the export route serves the SAME csv body on both faces — csvWithBom retired (the reference's own artifact is BOM-less)", () => {
    const src = read("src/app/api/export/route.ts");
    // Live-walked on BOTH apps (the 123-c PASS 1): the reference's own
    // client-side crm_report_ artifact at zero rows is 54 bytes — the
    // 7-column header, NO BOM (ours: 57 = the 3-byte \uFEFF prefix; the
    // content otherwise byte-identical). The s25 "BOM keeps Excel happy"
    // convention was OUR route's choice, never a decoded reference fact.
    // The route now serves the artifact verbatim on both the download and
    // the preview face.
    expect(src).not.toContain("csvWithBom");
    // the single verbatim body — no download-branch body construction
    expect(src).toMatch(/return new Response\(csv,/);
  });
});

// ---------------------------------------------------------------------------
// Session-124 (D-124a7, the N-124a2 find): the dead definition retired
// ---------------------------------------------------------------------------

describe("session-124: the csvWithBom dead-code retirement", () => {
  it("the definition is gone from src/lib/csv.ts — no BOM wrapper remains on the EXPORT side (the s48/s49 lineage)", () => {
    const csvSrc = read("src/lib/csv.ts");
    // The s123 D-123a1 retired the route's import; the definition
    // survived as src-dead until this session (the 124-a audit's
    // N-124a2). The IMPORT-side BOM stripper (parseCsv's leading-
    // \uFEFF strip, :71) is legitimate and stays — only the export-side
    // wrapper is retired (the reference's own artifacts are BOM-less,
    // the 123-c live walk).
    expect(csvSrc).not.toContain("csvWithBom");
    expect(csvSrc).not.toMatch(/export function \w*[Bb]om/);
  });
});
