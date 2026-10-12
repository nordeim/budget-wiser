// ---------------------------------------------------------------------------
// Session-110 (S110-P1): the dashboard KPI row — the pure seam. The
// derivation lived INLINE in src/app/api/dashboard/route.ts since
// session-31 (the bundle's Eke memo decode) — the LAST inline KPI
// derivation, the exact s107-genus the reportsKpis extraction retired
// for the reports route. Extracted behavior-preserving (the house seam
// doctrine: "pure domain logic lives in src/lib/* seams with Vitest
// coverage; handlers and pages only orchestrate"): the formulas are
// byte-identical, the route now orchestrates (fetches the arrays, calls
// this seam, assigns to DashboardData["kpis"]).
//
// Pinned by tests/seeded-dashboard-kpis.test.ts: the formula members
// (the synthetic face — the hardcoded V=0 target quirk, the toFixed(1)
// won-LEAD conversion, the per-lead-floored average AGE) + the seeded
// dashboard KPI row (the freeze — totalLeads 24 / conversionRate
// "29.2" / avgSalesCycleDays 83 on the parsed seed at the synthetic
// seed-time NOW) + the route wiring (the seam doctrine, source-level)
// + the cross-seam contrast (the SAME seed through reportsKpis's
// rolling quarter reads 18/"66.7" — the window + numerator axes).
// ---------------------------------------------------------------------------

/** A lead row as the dashboard KPI derivation sees it (UNFILTERED). */
export interface DashboardKpiLeadRow {
  stage: string;
  createdAt: Date;
}

/** The dashboard page's KPI row (DashboardData["kpis"], structural). */
export interface DashboardKpis {
  totalLeads: number;
  salesTarget: number;
  salesTargetProgress: number;
  conversionRate: string;
  avgSalesCycleDays: number;
}

/**
 * The reference's dashboard KPI memo (the Eke memo, bundle-decoded):
 * totalLeads is the RAW lead count; salesTarget is the reference's
 * HARDCODED literal 0 (its `V=0`) with targetProgress 0 — the Sales
 * Target card renders $0k / 0% on both sides; the conversion rate is
 * the WON-LEAD share of ALL leads at one decimal (a string on the wire
 * — the dashboard's own vocabulary, NEVER the reports' won-OPPS
 * share); avgSalesCycleDays is the average AGE of the won leads —
 * floor((now − created)/day) per lead, averaged, rounded (NOT
 * created→closed; the s29 H/U doctrine: createdAt only, closedAt
 * never enters this signature).
 */
export function dashboardKpis(
  leads: ReadonlyArray<DashboardKpiLeadRow>,
  now: Date,
): DashboardKpis {
  const wonLeads = leads.filter((l) => l.stage === "won");
  return {
    totalLeads: leads.length,
    // The reference's HARDCODED zero target (its literal V=0) — the
    // Sales Target card renders $0k / 0% on both sides. Our derived
    // max(50_000, openPipeline/4) model is retired (s31).
    salesTarget: 0,
    salesTargetProgress: 0,
    // Conversion rate: the WON-LEAD share of all leads, one decimal
    // (the reference's toFixed(1) — a string on the wire).
    conversionRate:
      leads.length > 0 ? ((wonLeads.length / leads.length) * 100).toFixed(1) : "0",
    // Avg sales cycle: the average AGE of the won leads — floor((now −
    // created)/day) per lead, averaged, rounded (NOT created→closed).
    avgSalesCycleDays:
      wonLeads.length > 0
        ? Math.round(
            wonLeads.reduce(
              (s, l) => s + Math.floor((now.getTime() - l.createdAt.getTime()) / 86_400_000),
              0,
            ) / wonLeads.length,
          )
        : 0,
  };
}
