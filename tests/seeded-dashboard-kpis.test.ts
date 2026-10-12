import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { dashboardKpis } from "@/lib/dashboard-data";
import { reportsKpis } from "@/lib/reports-data";
import { subMonthsClamped } from "@/lib/format";

// Session-110 pins (S110-P3): the dashboard KPI-derivations freeze —
// the s109-close suggested next #1, twice deferred behind the mobile
// walks. The dashboard KPI row (the page's first-viewport ladder:
// Total Leads / Sales Target / Conversion Rate / Avg Sales Cycle — plus
// the two s78 CLIENT-side members the page derives from the filtered
// opps) derived INLINE in the route handler since session-31 (the
// bundle's Eke memo decode) — a pure computation on the fetched arrays
// with NO seam and NO unit freeze, the LAST inline KPI derivation (the
// exact s107-genus the reportsKpis extraction retired for the reports
// route). The s103 seeded-charts suite held two of its members
// (totalLeads 24 + conversionRate "29.2") through a MIRRORED formula
// inside the test body — a route formula edit would NOT have failed
// that test (the mirrored copy keeps passing while the app drifts).
//
// S110-P1 first moved the derivation into its pure seam —
// `dashboardKpis(leads, now)` in src/lib/dashboard-data.ts (the house
// seam doctrine: "pure domain logic lives in src/lib/* seams with
// Vitest coverage; handlers and pages only orchestrate" — the route had
// violated it since s31, the s107 precedent applied to the last
// offender). These pins then freeze the seed→seam chain through the
// REAL imported function, exactly the s103/s107 doctrine (source-level
// seed parsing, no DB access under the unit gate; the date-dependent
// avg-cycle asserted at a synthetic seed-time now — the SAME anchor
// seeded-charts and seeded-reports-kpis freeze at, one seed-time
// truth).
//
// The vocabulary contrast (the unification face): the dashboard row is
// the ALL-TIME face (every lead, no window) with the WON-LEAD
// conversion numerator; the reports row (reportsKpis, s107) is the
// ROLLING-QUARTER face with the WON-OPP numerator. The same seed reads
// 24/"29.2" through this seam and 18/"66.7" through that one — both
// frozen side-by-side in the fourth it.
//
// Non-vacuousness: the induced-drift proof — a temporary seed stage
// perturbation (won → contacted) fails the seeded-row it by name; a
// seam formula perturbation (toFixed(1) → toFixed(0)) fails the
// formula + seeded + seeded-charts its by name; restored → green.

const root = path.resolve(import.meta.dirname, "..");
const seedSrc = readFileSync(path.join(root, "prisma/seed.ts"), "utf8");
const routeSrc = readFileSync(
  path.join(root, "src/app/api/dashboard/route.ts"),
  "utf8",
);

// --- the parse layer (source-level, DB-independent — the s103/s107 pattern) ---

/** The array-literal body after `const <marker> … = [` up to `];`. */
function arrayBody(marker: string): string {
  const mi = seedSrc.indexOf(marker);
  if (mi < 0) throw new Error(`seed marker not found: ${marker}`);
  const start = seedSrc.indexOf("= [", mi);
  const end = seedSrc.indexOf("];", start);
  return seedSrc.slice(start + 3, end);
}

/** Each seed row is a flat object literal — no nested braces. */
function entries(body: string): string[] {
  return (body.match(/\{[^{}]+\}/g) ?? []).filter((e) => e.includes("name:"));
}

function field(entry: string, key: string): string | null {
  const m = entry.match(new RegExp(`${key}: ("[^"]*"|[\\w.]+|null|-?\\d+)`));
  return m ? m[1]! : null;
}
const unquote = (v: string | null) => (v ?? "").replace(/^"|"$/g, "");
const num = (v: string | null) => Number(unquote(v).replace(/_/g, ""));

// The seed's date construction: iso(offsetDays, hour) — a Date at
// now + offset days. The synthetic epoch mirrors it MIDNIGHT-ALIGNED
// (the s103/s107 NOW — the same anchor the seeded-charts +
// seeded-reports-kpis suites freeze at, so all three suites share one
// seed-time truth; the avg-cycle sees the exact integer day-offsets
// the seed writes).
const NOW = Date.UTC(2026, 9, 11, 0, 0, 0);
const seedDate = (offsetDays: number) => new Date(NOW + offsetDays * 86_400_000);

const leads = entries(arrayBody("const leadSeed")).map((e) => ({
  stage: unquote(field(e, "stage")),
  createdAt: seedDate(num(field(e, "created"))),
}));

describe("session-110 (S110-P3): the seeded dashboard KPI-derivations freeze — the seed→seam chain pinned", () => {
  it("the seam formula members — the hardcoded salesTarget 0 + progress 0 (the V=0 quirk) · the toFixed(1) won-LEAD conversion + the zero-division guard · the per-lead-floored rounded average AGE + the 0 guard (createdAt only — closedAt never enters the signature)", () => {
    // a synthetic set: 4 leads (one per arm) at known ages — the won
    // pair at 10 and 31 days pins the FLOOR-then-average-then-ROUND
    // order (10 + 30.5 would give 20.25 → 20; the per-lead floor of
    // the .5-day member lands BEFORE the average).
    const syntheticLeads = [
      { stage: "new", createdAt: new Date(NOW - 5 * 86_400_000) },
      { stage: "contacted", createdAt: new Date(NOW - 3 * 86_400_000) },
      { stage: "won", createdAt: new Date(NOW - 10 * 86_400_000 - 12 * 3_600_000) },
      { stage: "won", createdAt: new Date(NOW - 30 * 86_400_000 - 12 * 3_600_000) },
    ];
    const kpis = dashboardKpis(syntheticLeads, new Date(NOW));
    expect(kpis.totalLeads).toBe(4);
    // the reference's HARDCODED zero target (its literal V=0)
    expect(kpis.salesTarget).toBe(0);
    expect(kpis.salesTargetProgress).toBe(0);
    // the WON-LEAD share: 2/4 = 50.0 — toFixed(1), a STRING on the wire
    expect(kpis.conversionRate).toBe("50.0");
    // the ages: floor(10.5) = 10 + floor(30.5) = 30 → avg 20 → round 20
    // (a non-floored average would read 20.5 → 21 — the order pinned)
    expect(kpis.avgSalesCycleDays).toBe(20);
    // the zero-division guards: no leads → "0" (never NaN); leads but
    // no won → the cycle guards at 0 while the conversion still reads
    const zero = dashboardKpis([], new Date(NOW));
    expect(zero.totalLeads).toBe(0);
    expect(zero.conversionRate).toBe("0");
    expect(zero.avgSalesCycleDays).toBe(0);
    const noWon = dashboardKpis(
      [{ stage: "new", createdAt: new Date(NOW - 90 * 86_400_000) }],
      new Date(NOW),
    );
    expect(noWon.conversionRate).toBe("0.0");
    expect(noWon.avgSalesCycleDays).toBe(0);
  });

  it("the route wiring — the handler orchestrates, the seam derives (no inline KPI construction survives the route slim)", () => {
    // the seam doctrine pin (the s107 seeded-reports-kpis source-level
    // pattern): the route CALLS the seam and carries NO inline KPI
    // derivation of its own.
    expect(routeSrc).toMatch(/dashboardKpis\(/);
    expect(routeSrc).toMatch(/from "@\/lib\/dashboard-data"/);
    // the retired inline constructions (the s31-era block) must never
    // return to the route — the derivation lives in the seam now.
    expect(routeSrc).not.toMatch(/const salesTarget\s*=\s*0/);
    expect(routeSrc).not.toMatch(/const salesTargetProgress\s*=\s*0/);
    expect(routeSrc).not.toMatch(/conversionRate\s*=\s*leads\.length/);
    expect(routeSrc).not.toMatch(/const avgSalesCycleDays/);
    expect(routeSrc).not.toMatch(/const wonLeads\b/);
  });

  it("the seeded dashboard KPI row — totalLeads 24 · salesTarget 0 · progress 0 · conversionRate \"29.2\" · avgSalesCycleDays 83 (the all-time face, now through the REAL seam — the s103 mirror retired)", () => {
    // the window membership first (the derivation's inputs): the
    // dashboard reads EVERY lead — the all-time face (the reports
    // quarter holds 18 of these 24, the fourth it's contrast).
    expect(leads.length).toBe(24);
    expect(leads.filter((l) => l.stage === "won").length).toBe(7);
    // the KPI row through the REAL seam — the freeze (the ages
    // 140+120+95+80+62+45+38 = 580, /7 = 82.857 → round 83 at the
    // synthetic seed-time NOW)
    const kpis = dashboardKpis(leads, new Date(NOW));
    expect(kpis.totalLeads).toBe(24);
    expect(kpis.salesTarget).toBe(0);
    expect(kpis.salesTargetProgress).toBe(0);
    expect(kpis.conversionRate).toBe("29.2"); // 7/24
    expect(kpis.avgSalesCycleDays).toBe(83);
  });

  it("the cross-seam contrast — the SAME seed through reportsKpis's rolling quarter reads 18/\"66.7\" while the dashboard face reads 24/\"29.2\" (the window axis + the numerator axis: won-LEADS vs won-OPPS — the unification face)", () => {
    // the two KPI rows' vocabularies pinned side-by-side on the one
    // seed: the dashboard row is ALL-TIME with the WON-LEAD numerator;
    // the reports row (the s107 freeze) is subMonthsClamped(now, 3)
    // with the WON-OPP numerator. A future edit that points the
    // dashboard route at reportsKpis (or vice versa) fails BOTH its.
    const quarterFrom = subMonthsClamped(new Date(NOW), 3);
    const inQuarter = (d: Date) => d >= quarterFrom && d <= new Date(NOW);
    const qLeads = leads.filter((l) => inQuarter(l.createdAt));
    const reports = reportsKpis(
      qLeads,
      [{ amount: 87_000 }, { amount: 145_000 }, { amount: 39_000 }, { amount: 66_000 }],
      [{ amount: 64_000 }, { amount: 28_000 }],
    );
    expect(reports.totalLeads).toBe(18); // the s107 freeze, held here too
    expect(reports.conversionRate).toBe("66.7"); // 4/(4+2) — the WON-OPP share
    const dashboard = dashboardKpis(leads, new Date(NOW));
    expect(dashboard.totalLeads).toBe(24); // ALL-TIME — the window axis
    expect(dashboard.conversionRate).toBe("29.2"); // 7/24 — the WON-LEAD axis
    // the quarter holds 18 of the 24; the 6 outside are the −95..−150
    // tail (the s107 boundary: the −95 lead 3 days before Jul 11)
    expect(24 - qLeads.length).toBe(6);
  });
});
