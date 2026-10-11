import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { subMonthsClamped } from "@/lib/format";
import { reportsKpis } from "@/lib/reports-data";

// Session-107 pins (S107-P2): the seeded reports KPI-derivations freeze —
// the s106-close suggested next #1, twice deferred behind the mobile
// walks. The reports KPI row (the page's first-viewport ladder: Total
// Leads / Open Leads / Won Deals / Lost Deals / Conversion Rate) derives
// INLINE in the route handler since session-31 — a pure computation on
// the period-filtered arrays with NO seam and NO unit freeze. The s105
// phone captures read its seeded values (Total Leads 18 / Open Leads 6 —
// the QUARTER-filtered derivations, not the dashboard's 24) off the
// pixels, but nothing under the unit gate held the derivation: a seed
// edit that moved a lead's createdAt out of the rolling quarter, or
// flipped a stage, would silently reshape the reports KPI row and no
// test would fail.
//
// S107-P1 first moved the derivation into its pure seam —
// `reportsKpis(leads, wonOpps, lostOpps)` in src/lib/reports-data.ts
// (the house seam doctrine: "pure domain logic lives in src/lib/*
// seams with Vitest coverage; handlers and pages only orchestrate" —
// the route had violated it since s31). These pins then freeze the
// seed→window→seam chain through the REAL imported function, exactly
// the s103 seeded-charts doctrine (source-level seed parsing, no DB
// access under the unit gate; the date-dependent window asserted at a
// synthetic seed-time now).
//
// The quarter semantics: the route's periodStart maps "quarter" to
// subMonthsClamped(now, 3) — the ROLLING three-month window (the s74
// bundle decode, pinned source-level by tests/report-periods.test.ts).
// This suite imports the REAL subMonthsClamped and applies the same
// mapping; the two windows meet at the boundary the seed designs in
// (a 12-day margin — the -95-created lead outside, the -80 the oldest
// inside).
//
// Non-vacuousness: the induced-drift proof — a temporary seed VALUE or
// stage perturbation fails the KPI-row it by name; restored → green.

const root = path.resolve(import.meta.dirname, "..");
const seedSrc = readFileSync(path.join(root, "prisma/seed.ts"), "utf8");
const routeSrc = readFileSync(
  path.join(root, "src/app/api/reports/route.ts"),
  "utf8",
);

// --- the parse layer (source-level, DB-independent — the s103 pattern) -------

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
// (the s103 NOW — the same anchor the seeded-charts suite freezes at,
// so the two suites share one seed-time truth).
const NOW = Date.UTC(2026, 9, 11, 0, 0, 0);
const seedDate = (offsetDays: number) => new Date(NOW + offsetDays * 86_400_000);

const leads = entries(arrayBody("const leadSeed")).map((e) => ({
  stage: unquote(field(e, "stage")),
  createdAt: seedDate(num(field(e, "created"))),
}));
const opps = entries(arrayBody("const oppSeed")).map((e) => ({
  stage: unquote(field(e, "stage")),
  amount: num(field(e, "amount")),
  createdAt: seedDate(num(field(e, "created"))),
}));

// The route's quarter window at the synthetic now: subMonthsClamped
// (Oct 11, 3) = Jul 11 — the ROLLING window, both ends bounded (the
// s74 N-74c6 ld() semantics: rows >= from && rows <= now).
const quarterFrom = subMonthsClamped(new Date(NOW), 3);
const inQuarter = (d: Date) => d >= quarterFrom && d <= new Date(NOW);
const qLeads = leads.filter((l) => inQuarter(l.createdAt));
const qOpps = opps.filter((o) => inQuarter(o.createdAt));
const wonOpps = qOpps.filter((o) => o.stage === "closed_won");
const lostOpps = qOpps.filter((o) => o.stage === "closed_lost");

describe("session-107 (S107-P2): the seeded reports KPI-derivations freeze — the seed→rolling-quarter→seam chain pinned", () => {
  it("the seam formula members — openLeads = new+contacted STRICTLY · the toFixed(1) conversion · the zero-division guard · the null-safe sums", () => {
    // a synthetic set with one lead per stage: openLeads counts
    // new+contacted ONLY (the route comment's s31 contract — a
    // qualified lead is NOT open; the leads KPI's own "Open = new+
    // contacted+qualified" is the LEADS PAGE's row, a different
    // derivation).
    const syntheticLeads = ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"].map(
      (stage) => ({ stage }),
    );
    const syntheticWon = [
      { amount: 87_000 },
      { amount: 145_000 },
      { amount: 39_000 },
      { amount: 66_000 },
    ];
    const syntheticLost = [
      { amount: 64_000 },
      { amount: 28_000 },
    ];
    const kpis = reportsKpis(syntheticLeads, syntheticWon, syntheticLost);
    expect(kpis.totalLeads).toBe(7);
    expect(kpis.openLeads).toBe(2);
    expect(kpis.wonDeals).toBe(4);
    expect(kpis.wonValue).toBe(337_000);
    expect(kpis.lostDeals).toBe(2);
    expect(kpis.lostValue).toBe(92_000);
    expect(kpis.conversionRate).toBe("66.7");
    // the zero-division guard: no closed opps → "0" (never NaN)
    const zero = reportsKpis([], [], []);
    expect(zero.totalLeads).toBe(0);
    expect(zero.openLeads).toBe(0);
    expect(zero.conversionRate).toBe("0");
    // the empty-open face: leads but no closed opps still guards
    expect(reportsKpis([{ stage: "new" }], [], []).conversionRate).toBe("0");
  });

  it("the route wiring — the handler orchestrates, the seam derives (no inline openLeads construction survives)", () => {
    // the seam doctrine pin (the report-periods/opportunity-model
    // source-level pattern): the route CALLS the seam and carries NO
    // inline KPI derivation of its own.
    expect(routeSrc).toMatch(/reportsKpis\(/);
    expect(routeSrc).toMatch(/from "@\/lib\/reports-data"/);
    // the retired inline construction (the s31-era `openLeads:` field
    // literal) must never return to the route — the derivation lives
    // in the seam now.
    expect(routeSrc).not.toMatch(/openLeads:\s*leads\.filter/);
    expect(routeSrc).not.toMatch(/conversionRate:\s*wonOpps\.length/);
  });

  it("the seeded rolling-quarter KPI row — Total Leads 18 · Open Leads 6 · Won 4 $337.0K · Lost 2 $92.0K · Conversion 66.7% (the values the s105 phone capture read live)", () => {
    // the window membership first (the derivation's inputs)
    expect(leads.length).toBe(24);
    expect(qLeads.length).toBe(18);
    expect(qOpps.length).toBe(12);
    expect(wonOpps.length).toBe(4);
    expect(lostOpps.length).toBe(2);
    // the KPI row through the REAL seam — the freeze
    const kpis = reportsKpis(qLeads, wonOpps, lostOpps);
    expect(kpis.totalLeads).toBe(18);
    expect(kpis.openLeads).toBe(6);
    expect(kpis.wonDeals).toBe(4);
    expect(kpis.wonValue).toBe(337_000);
    expect(kpis.lostDeals).toBe(2);
    expect(kpis.lostValue).toBe(92_000);
    expect(kpis.conversionRate).toBe("66.7");
  });

  it("the window boundary + the all-time contrast — the −95 lead outside [Jul 8 < Jul 11] · the −80 the oldest inside (a 12-day margin) · all-time 24 vs quarter 18", () => {
    // the boundary: the nearest-outside lead sits 3 days before the
    // window (Jul 8 vs Jul 11); the oldest inside member has a 12-day
    // margin — the seed's design keeps the membership stable against
    // small clock drift (the e2e reseeds before every run).
    const outside = leads.filter((l) => !inQuarter(l.createdAt));
    expect(outside.length).toBe(6);
    const nearestOutside = Math.max(...outside.map((l) => l.createdAt.getTime()));
    expect(Math.round((nearestOutside - NOW) / 86_400_000)).toBe(-95);
    const oldestInside = Math.min(...qLeads.map((l) => l.createdAt.getTime()));
    expect(Math.round((oldestInside - NOW) / 86_400_000)).toBe(-80);
    expect(quarterFrom.getTime() - nearestOutside).toBe(3 * 86_400_000);
    // the all-time contrast: the SAME seed through the period="all"
    // sentinel (periodStart maps it to new Date(0)) — 24 total vs the
    // quarter's 18; the dashboard's s103 pin (totalLeads 24) is the
    // all-time face of the SAME seed, this suite holds the quarter face.
    const allTime = reportsKpis(
      leads,
      opps.filter((o) => o.stage === "closed_won"),
      opps.filter((o) => o.stage === "closed_lost"),
    );
    expect(allTime.totalLeads).toBe(24);
    expect(allTime.openLeads).toBe(6); // every open lead already sits inside the quarter
    expect(allTime.wonValue).toBe(337_000); // every closed opp already sits inside
    expect(allTime.conversionRate).toBe("66.7");
  });
});
