import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  agingCounts,
  forecastAccuracySeries,
  pipelineStageCounts,
  revenueByMonth,
  wonLostByMonth,
} from "@/lib/reports-data";

// Session-103 pins (S103-P1): the seeded-state chart-geometry freeze —
// the s98 suggested next #3, twice deferred. The drift sweep runs the
// ZERO-DATA state by design (the reference's demo data has been zero
// since the s3 wipe), so the SEEDED chart surfaces — the pipeline bars,
// the funnel split, the won/lost months, the revenue areas, the aging
// bands, the by-source distribution, the KPI ladder — were never under
// the unit gate as a frozen seed derivation. The census pins the seed's
// row COUNTS (15/24/10/23/12) and the e2e pins one era anchor ("4
// $337.0K"), but nothing froze the chart-relevant AGGREGATES: a seed
// edit that reshaped a value distribution would silently reshape every
// chart and no test would fail.
//
// These pins read prisma/seed.ts SOURCE (the opportunity-model /
// docs-counts precedent — no DB access under the unit gate), parse the
// leadSeed / oppSeed / LEAD_SOURCE_MAP literals, and freeze the
// seed→derivation→chart-input chain through the REAL imported
// functions from src/lib/reports-data.ts. The date-dependent members
// (month keys, aging bands as calendar time passes) are asserted via
// their DATE-INDEPENDENT invariants (totals) or at a synthetic
// seed-time now (the exact offsets the seed writes). Non-vacuousness:
// the induced-drift proof — a temporary 87_000→88_000 perturbation of
// the seed fails the 337_000 anchors by name; restored → green.

const root = path.resolve(import.meta.dirname, "..");
const seedSrc = readFileSync(path.join(root, "prisma/seed.ts"), "utf8");

// --- the parse layer (source-level, DB-independent) --------------------------

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

const leadRows = entries(arrayBody("const leadSeed"));
const oppRows = entries(arrayBody("const oppSeed"));

// LEAD_SOURCE_MAP: keys are bare words (`Referral:`) or quoted phrases
// (`"Social Media":`) — trim-safe parsing, both forms.
const mapBody = seedSrc.match(/const LEAD_SOURCE_MAP[^{]*\{([\s\S]*?)\};/)?.[1] ?? "";
const LEAD_SOURCE_MAP: Record<string, string> = {};
for (const m of mapBody.matchAll(/(?:"([^"]+)"|([A-Za-z]+))\s*:\s*"(\w+)"/g)) {
  LEAD_SOURCE_MAP[m[1] ?? m[2]!] = m[3]!;
}

// The seed's date construction: iso(offsetDays, hour) — a Date at
// now + offset days. The synthetic epoch mirrors it MIDNIGHT-ALIGNED
// so every derivation below sees the exact integer day-offsets the
// seed writes — the seed's DESIGN ages. (The real seed writes 09:00/
// 15:00 hours; those are irrelevant to the month-key derivations —
// every offset lands mid-month — and the aging pin freezes the design
// ages, where the -60 offset sits exactly on the 60-day band edge: a
// same-day render after 09:00 sees 59.x and the lower band, the
// boundary nuance the comment at the aging it documents.)
const NOW = Date.UTC(2026, 9, 11, 0, 0, 0);
const seedDate = (offsetDays: number) => new Date(NOW + offsetDays * 86_400_000);

const leads = leadRows.map((e) => ({
  stage: unquote(field(e, "stage")),
  source: unquote(field(e, "source")),
  value: num(field(e, "value")),
  createdAt: seedDate(num(field(e, "created"))),
}));

const opps = oppRows.map((e) => ({
  stage: unquote(field(e, "stage")),
  amount: num(field(e, "amount")),
  probability: num(field(e, "probability")),
  closeDate: field(e, "close") === "null" ? null : seedDate(num(field(e, "close"))),
  createdAt: seedDate(num(field(e, "created"))),
}));

describe("session-103 (S103-P1): the seeded-state chart-geometry freeze — the seed→derivation→chart-input chain pinned", () => {
  it("the leads stage census — the 24-row distribution every leads chart derives from (new=4 · contacted=2 · qualified=3 · negotiation=2 · proposal=2 · won=7 · lost=4)", () => {
    const census: Record<string, number> = {};
    for (const l of leads) census[l.stage] = (census[l.stage] ?? 0) + 1;
    expect(census).toEqual({
      new: 4,
      contacted: 2,
      qualified: 3,
      negotiation: 2,
      proposal: 2,
      won: 7,
      lost: 4,
    });
    expect(leads.length).toBe(24); // the census contract
  });

  it("the leads value totals — the won-lead $687,000 full-form anchor + the 2,086,000 book total", () => {
    const won = leads.filter((l) => l.stage === "won");
    expect(won.reduce((s, l) => s + l.value, 0)).toBe(687_000);
    expect(leads.reduce((s, l) => s + l.value, 0)).toBe(2_086_000);
  });

  it("the lead source distribution POST-LEAD_SOURCE_MAP — the raw vocabulary the dashboard by-source chart renders (referral=6 · partner=6 · call=5 · email=4 · website=3)", () => {
    const census: Record<string, number> = {};
    for (const l of leads) {
      const raw = LEAD_SOURCE_MAP[l.source] ?? l.source;
      census[raw] = (census[raw] ?? 0) + 1;
    }
    expect(census).toEqual({ referral: 6, partner: 6, call: 5, email: 4, website: 3 });
  });

  it("the opportunities stage census — the 12-row distribution (closed_won=4 · closed_lost=2 · prospecting=2 · qualification=1 · proposal=1 · negotiation=2)", () => {
    const census: Record<string, number> = {};
    for (const o of opps) census[o.stage] = (census[o.stage] ?? 0) + 1;
    expect(census).toEqual({
      closed_won: 4,
      closed_lost: 2,
      prospecting: 2,
      qualification: 1,
      proposal: 1,
      negotiation: 2,
    });
    expect(opps.length).toBe(12);
  });

  it("the opportunities amount totals — the $337.0K era anchor (won) · $92.0K lost · $525K open pipeline", () => {
    const by = (s: string) => opps.filter((o) => o.stage === s).reduce((s, o) => s + o.amount, 0);
    expect(by("closed_won")).toBe(337_000); // the e2e's "4 $337.0K" All-Time pin, unit-side
    expect(by("closed_lost")).toBe(92_000);
    expect(opps.filter((o) => !o.stage.startsWith("closed_")).reduce((s, o) => s + o.amount, 0)).toBe(525_000);
  });

  it("pipelineStageCounts on the PARSED seed — the 8-slug funnel split end-to-end (4/2/3 + 2/1/1/2/4)", () => {
    const split = pipelineStageCounts(
      leads.map((l) => ({ stage: l.stage })),
      opps.map((o) => ({ stage: o.stage })),
    );
    expect(split).toEqual([
      { slug: "new", count: 4 },
      { slug: "contacted", count: 2 },
      { slug: "qualified", count: 3 },
      { slug: "prospecting", count: 2 },
      { slug: "qualification", count: 1 },
      { slug: "proposal", count: 1 },
      { slug: "negotiation", count: 2 },
      { slug: "closed_won", count: 4 },
    ]);
  });

  it("revenueByMonth on the PARSED won opps — the 337,000 TOTAL invariant (month keys shift with the calendar; the total never does)", () => {
    const series = revenueByMonth(opps.filter((o) => o.stage === "closed_won"));
    expect(series.reduce((s, m) => s + m.revenue, 0)).toBe(337_000);
    expect(series.length).toBeGreaterThan(0);
    for (const m of series) expect(m.month).toMatch(/^[A-Z][a-z]{2} \d{4}$/); // "MMM yyyy"
  });

  it("wonLostByMonth on the PARSED closed opps — the 4-won / 2-lost totals the grouped bars carry", () => {
    const closed = opps.filter((o) => o.closeDate !== null);
    const series = wonLostByMonth(closed);
    expect(series.reduce((s, m) => s + m.won, 0)).toBe(4);
    expect(series.reduce((s, m) => s + m.lost, 0)).toBe(2);
  });

  it("forecastAccuracySeries on the PARSED closed opps — actual 337,000 / forecasted 316,250 (87k×.90 + 145k×.85 + 39k×.80 + 66k×.75 + 64k×.40 + 28k×.30)", () => {
    const closed = opps.filter((o) => o.closeDate !== null);
    const { points } = forecastAccuracySeries(closed);
    expect(points.reduce((s, p) => s + p.actual, 0)).toBe(337_000);
    expect(points.reduce((s, p) => s + p.forecasted, 0)).toBe(316_250);
  });

  it("agingCounts at the synthetic seed-time now — the [6,3,3,0] design band spread (ages 45/60/38/55/70/80/5/3/8/21/16/12 across the four buckets)", () => {
    // The -60 offset sits EXACTLY on the 60-day band edge — the design
    // census reads it in [60,90). The real seed's 09:00 hour means a
    // same-day render after 09:00 sees 59.x (the lower band); this pin
    // freezes the DESIGN ages, so a seed edit moving any opp across a
    // band boundary fails here.
    const bands = agingCounts(opps.map((o) => ({ createdAt: o.createdAt })), NOW);
    expect(bands.map((b) => b.count)).toEqual([6, 3, 3, 0]);
    expect(bands.map((b) => b.label)).toEqual(["<30 days", "30-60 days", "60-90 days", ">90 days"]);
  });

  it("the dashboard KPI members on the PARSED seed — totalLeads 24 + conversionRate \"29.2\" (the route's toFixed(1) formula mirrored)", () => {
    const totalLeads = leads.length;
    const wonLeads = leads.filter((l) => l.stage === "won").length;
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";
    expect(totalLeads).toBe(24);
    expect(conversionRate).toBe("29.2"); // 7/24 — src/app/api/dashboard/route.ts's formula
  });
});
