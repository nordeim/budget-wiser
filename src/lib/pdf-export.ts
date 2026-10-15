"use client";

// Session-25 (S25-P2): the Reports PDF export contract — the reference's
// exports are REAL client-side PDFs, live-verified on 2026-10-01 by
// clicking every button and examining the downloaded artifacts:
//
//  (a) the header "PDF" button renders the CONTENT area (no sidebar)
//      through html2canvas and assembles it via jsPDF into A4 portrait
//      pages split across the content height — downloading as
//      crm_reports_YYYY-MM-DD.pdf (the artifact's /Producer string read
//      "jsPDF 4.0.0"; the reference's 19MB two-page capture).
//
//  (b) the tab-2 per-table "Export PDF" buttons generate TEXT jsPDFs
//      (3.5KB): the card title (the parenthetical TRUNCATED — "Deals at
//      Risk (No Activity 14+ Days)" → "Deals at Risk"), a
//      "Generated: M/D/YYYY" line, the table's column headers, and the
//      rows — downloading as <slug>_YYYY-MM-DD.pdf.
//
// html2canvas-PRO (not the classic 1.4.1 the reference ships): our
// Tailwind v4 compiled stylesheet carries 242 color-mix() calls (the
// opacity-modifier family) that the classic parser cannot read; the pro
// fork handles the modern color functions. Zero oklch in our CSS (the
// literal-hex token rule), but color-mix alone requires the fork.
//
// The previous implementation was a window.print() + an invented toast —
// retired with the s24 click-contract lesson (a class-level pin recorded
// the buttons' looks, never their behavior).

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

/** The reference's ISO-date filename suffix: `_2026-10-01`. */
export function isoDateSuffix(d = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** The reference's "Generated:" date format: `10/1/2026` (M/D/YYYY). */
export function generatedDate(d = new Date()): string {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

/**
 * The reference's table-artifact slug: the card title TRUNCATED at the
 * parenthetical, lowercased, non-alphanumerics folded to underscores.
 * Live-verified pairs:
 *   "Open Deals by Stage"                     → open_deals_by_stage
 *   "Deals at Risk (No Activity 14+ Days)"    → deals_at_risk
 */
export function tableSlug(title: string): string {
  return title
    .split("(")[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * (a) The header PDF — the full-content canvas capture. The element is
 * the app's `main` scroll container; html2canvas-pro renders its full
 * scrollHeight (the whole report content, sidebar excluded — matching
 * the reference's capture), then jsPDF slices it across A4 portrait
 * pages at full width.
 */
export async function exportReportsPdf(): Promise<void> {
  const el = document.querySelector<HTMLElement>("main");
  if (!el) return;
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#f9fafb",
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
    height: el.scrollHeight,
    width: el.scrollWidth,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  heightLeft -= pdfHeight;
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
  }
  pdf.save(`crm_reports_${isoDateSuffix()}.pdf`);
}

/**
 * (b) The per-table PDF — the TEXT layout the reference's 3.5KB
 * artifacts carry: title, "Generated: M/D/YYYY", the column headers,
 * and the rows as a simple ruled table.
 *
 * Session-123 (F-123a3, D-123a2): the geometry re-anchored on the
 * reference's OWN artifact — stream-decoded from its live zero-row PDF
 * and byte-equal-verified through the jsPDF mm probe. The constants are
 * MM-anchored (the constructor rides unit "mm"; the reference's stream
 * floats are mm conversions — 39.685039… = 14mm etc.): margin 14mm,
 * the title Helvetica-NORMAL 16pt at (14, 15) [/F1 16 Tf — F1 is
 * Helvetica, F2 Helvetica-Bold in both apps' resource dicts; ours was
 * bold], the Generated line normal 10pt at (14, 22), the column headers
 * BOLD 9pt at x = 14 + i*60, y = 32 (the FLAT 60mm column spacing, not
 * span-derived), the line width = jsPDF's unit-mm DEFAULT flush
 * (0.567pt — never setLineWidth; an explicit call emits a SECOND,
 * differently-rounded operator), and NO header rule at zero rows (the
 * reference's zero-row artifact carries no line operators — the rule is
 * gated on rows existing; its populated-rule geometry stays ours, the
 * unknowable face). The row ladder keeps our structure in the mm frame:
 * rowHeight 8mm, the 27-char clip, the page-break redraw.
 */
export function exportTablePdf(title: string, columns: string[], rows: string[][]): void {
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 14;
  const rowHeight = 8;
  let y = 32; // the headers' baseline (title 15 + generated 22 above)

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "normal");
  pdf.text(title, margin, 15);
  pdf.setFontSize(10);
  pdf.text(`Generated: ${generatedDate()}`, margin, 22);

  const drawHeader = (withRule: boolean) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    columns.forEach((c, i) => pdf.text(c, margin + i * 60, 32));
    y = 32;
    if (withRule) {
      // the reference draws NO rule at zero rows — the rule is a
      // populated-face affordance (its populated geometry unknowable;
      // ours: 2mm under the headers, the 200-gray stroke)
      y += 2;
      pdf.setDrawColor(200);
      pdf.line(margin, y, pageWidth - margin, y);
      y += rowHeight - 2;
    } else {
      y += rowHeight;
    }
    pdf.setFont("helvetica", "normal");
  };
  drawHeader(rows.length > 0);

  for (const row of rows) {
    if (y > pageHeight - margin) {
      pdf.addPage();
      drawHeader(true);
    }
    row.forEach((cell, i) => {
      const text = String(cell ?? "");
      // Clip long cells to their column span (single-line rows).
      pdf.text(text.length > 28 ? `${text.slice(0, 27)}…` : text, margin + i * 60, y);
    });
    y += rowHeight;
  }

  pdf.save(`${tableSlug(title)}_${isoDateSuffix()}.pdf`);
}
