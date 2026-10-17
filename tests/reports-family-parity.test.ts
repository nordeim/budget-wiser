import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// ---------------------------------------------------------------------------
// Session-138 (the 138-c rotation — THE REPORTS CHART-INTERIORS FRESH-EYES
// WALK): the family pins. The walk29 verdict — PASS 1 two-app zero-data
// byte-equal on 849 axes EXCEPT ONE: pipeline.ch3.gridlineCount ours 4 vs
// the reference 9 — THE L-138c1 GRID TICK-DELIVERY GENUS (recharts 2.15.4:
// an explicit tick={undefined} prop nullifies CartesianAxis.defaultProps.tick
// in the grid generators' spread, so getTicks() bails and the CartesianGrid
// falls back to the 4-line plot FRAME where the reference's recharts renders
// the visible-ticks+edges grid). The D-138a0 fix: the conditional tickProp
// spread + explicit axis types across the grid-bearing families —
// dev-live-verified BYTE-EXACT against the reference's aging chart
// (H@5/70/135/200/265 + V@65/154/272/302 — all nine lines). These pins
// freeze: the fix's source shape (any regression REDs), the KPI-label
// ordered set (the L-138a6 gap), the tab-label ordered set, and the four
// pie labelFor contracts (the L-138c2 live-verified label texts).
// ---------------------------------------------------------------------------

const here = path.dirname(new URL(import.meta.url).pathname);
const repo = path.resolve(here, "..");

function chartsSrc(): string {
  const p = path.join(repo, "src/components/charts/charts.tsx");
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function reportsPage(): string {
  const p = path.join(repo, "src/app/(app)/reports/reports-page.tsx");
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function constants(): string {
  const p = path.join(repo, "src/lib/constants.ts");
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

/** Slice a function body out of a source file by its export name. */
function fnBody(src: string, name: string): string {
  const i = src.indexOf(`export function ${name}`);
  if (i < 0) return "";
  // the next top-level export bounds the body
  const j = src.indexOf("export function", i + 10);
  return src.slice(i, j < 0 ? undefined : j);
}

describe("session-138: the L-138c1 grid tick-delivery fix (the D-138a0 remedy)", () => {
  it("NO bare tick={tick} anywhere — every tick-carrying family spreads the conditional tickProp", () => {
    // The genus mechanism: an explicit tick={undefined} prop puts a
    // tick:undefined KEY on the context axis object, which overrides
    // CartesianAxis.defaultProps.tick in the grid generators' spread —
    // getTicks() bails on !tick and the grid renders the 4-line frame.
    // The remedy: const tickProp = tick ? { tick } : {}; spread ONLY when
    // the prop carries a value. A regression to a bare tick={tick} on ANY
    // axis re-arms the genus (the recharts version would then decide the
    // grid's face).
    const src = chartsSrc();
    expect(src).not.toMatch(/tick=\{tick\}/);
    // the conditional idiom itself, present in the three tickFontSize
    // families (SingleBarChart / GroupedBarsChart / RevenueLineChart)
    expect(src.match(/const tickProp = tick \? \{ tick \} : \{\};/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
  });

  it("SingleBarChart: XAxis type=category + YAxis type=number (explicit axis typing)", () => {
    const fn = fnBody(chartsSrc(), "SingleBarChart");
    expect(fn).toMatch(/<XAxis dataKey=\{xKey\} type="category" \{\.\.\.tickProp\} \/>/);
    expect(fn).toMatch(/<YAxis type="number" \{\.\.\.tickProp\} \/>/);
  });

  it("GroupedBarsChart: XAxis type=category + YAxis type=number (explicit axis typing)", () => {
    const fn = fnBody(chartsSrc(), "GroupedBarsChart");
    expect(fn).toMatch(/<XAxis dataKey=\{xKey\} type="category" \{\.\.\.tickProp\} \/>/);
    expect(fn).toMatch(/<YAxis type="number" \{\.\.\.tickProp\} \/>/);
  });

  it("TrendLineChart: XAxis type=category + YAxis type=number (the implicit-categorical V genus)", () => {
    // The line family never carried the tick prop — its H grid worked —
    // but its implicitly-typed categorical X delivered no ticks to the
    // vertical generator (the edges-only V face). Typing both axes
    // explicitly restores the visible-ticks+edges grid.
    const fn = fnBody(chartsSrc(), "TrendLineChart");
    expect(fn).toMatch(/<XAxis dataKey=\{xKey\} type="category" \/>/);
    expect(fn).toMatch(/<YAxis type="number" \/>/);
  });

  it("RevenueLineChart: XAxis type=category + YAxis type=number (the defensive arm — the dashboard always passes 12)", () => {
    const fn = fnBody(chartsSrc(), "RevenueLineChart");
    expect(fn).toMatch(/<XAxis dataKey="month" type="category" \{\.\.\.tickProp\} \/>/);
    expect(fn).toMatch(/<YAxis type="number" \{\.\.\.tickProp\} \/>/);
  });

  it("HorizontalBarChart: the explicit axes STAND (type=number X + type=category Y — the family that never broke)", () => {
    // The funnel family was already immune (explicit types, no tick prop)
    // and its grids byte-matched the reference at every walked state —
    // 15 lines both apps. This pin freezes that standing shape.
    const fn = fnBody(chartsSrc(), "HorizontalBarChart");
    expect(fn).toMatch(/<XAxis type="number" \/>/);
    expect(fn).toMatch(/<YAxis type="category" dataKey=\{yKey\} width=\{yWidth\} \/>/);
    expect(fn).not.toMatch(/tick=\{tick\}/);
  });
});

describe("session-138: the freeze pins (the L-138a6 gap + the live-verified contracts)", () => {
  it("the 5 KPI card labels as an ORDERED SET (the walk's KPI-row census)", () => {
    // The walk's two-app census: the KPI row renders exactly 5
    // CircleStatCards — Total Leads / Open Leads / Won Deals / Lost
    // Deals / Conversion Rate — byte-equal both apps (labels, values at
    // zero, the 4 static sparks, the Lost-Deals no-spark split). The
    // labels ride the CircleStatCard `label` props in document order;
    // zero ordered-set assertions existed before this pin.
    const src = reportsPage();
    const i = src.indexOf("PAGE_KPI_GRIDS.reports");
    expect(i).toBeGreaterThan(-1);
    const j = src.indexOf("</Tabs>", i);
    expect(j).toBeGreaterThan(i);
    const kpiRow = src.slice(i, j);
    const labels = ["Total Leads", "Open Leads", "Won Deals", "Lost Deals", "Conversion Rate"];
    let cursor = -1;
    for (const t of labels) {
      const at = kpiRow.indexOf(`label="${t}"`, cursor + 1);
      expect(at, `the label "${t}" in document order after #${labels.indexOf(t)}`).toBeGreaterThan(cursor);
      cursor = at;
    }
    expect(kpiRow.split("<CircleStatCard").length - 1, "exactly 5 CircleStatCard call sites").toBe(5);
  });

  it("the Lost Deals card carries NO sparkline (the reference's own won-inline/lost-subtitle split)", () => {
    // The walk's census: 4 sparks + the Lost-Deals bare card (the
    // reference's own split — S12-P6/S27-P5). The pin: the Lost Deals
    // card block between its label and the next CircleStatCard contains
    // no Sparkline call.
    const src = reportsPage();
    const i = src.indexOf('label="Lost Deals"');
    expect(i).toBeGreaterThan(-1);
    const j = src.indexOf('label="Conversion Rate"');
    expect(j).toBeGreaterThan(i);
    const lostBlock = src.slice(i, j);
    expect(lostBlock).not.toMatch(/<Sparkline/);
  });

  it("the 5 report tab labels as an ORDERED SET (REPORT_TABS — the walk's tablist census)", () => {
    // The walk's two-app census: the pill tablist renders exactly 5
    // triggers — Sales Overview / Pipeline & Forecast / Activity &
    // Productivity / Lead Sources / Account Health — byte-equal both
    // apps (texts, rects, fonts, the active pill). The labels ride
    // REPORT_TABS in constants.ts in document order.
    const src = constants();
    const i = src.indexOf("export const REPORT_TABS");
    expect(i).toBeGreaterThan(-1);
    const j = src.indexOf("] as const", i);
    expect(j).toBeGreaterThan(i);
    const tabs = src.slice(i, j);
    const labels = ["Sales Overview", "Pipeline & Forecast", "Activity & Productivity", "Lead Sources", "Account Health"];
    let cursor = -1;
    for (const t of labels) {
      const at = tabs.indexOf(`label: "${t}"`, cursor + 1);
      expect(at, `the tab "${t}" in REPORT_TABS order`).toBeGreaterThan(cursor);
      cursor = at;
    }
    expect(tabs.split("{ id:").length - 1, "exactly 5 tab entries").toBe(5);
  });

  it("the four pie labelFor contracts (the L-138c2 live-verified label texts)", () => {
    // The walk's live probe (the animation-gate lesson: the labels render
    // only after the ~2s recharts mount animation): the four pies carry
    // their label callbacks in the reference's own formats — the forecast
    // `${band}%: $…K`, by-type `${type}: ${value}`, by-source
    // `${source}: ${value}`, health `${name}: ${value}` — live-verified
    // rendering "referral: 5, call: 4, email: 3, website: 3, partner: 3".
    const src = reportsPage();
    expect(src).toMatch(/labelFor=\{\(e\) => `\$\{e\.band\}%: \$\$\{\(Number\(e\.value \?\? 0\) \/ 1e3\)\.toFixed\(0\)\}K`\}/);
    expect(src).toMatch(/labelFor=\{\(e\) => `\$\{e\.type\}: \$\{e\.value\}`\}/);
    expect(src).toMatch(/labelFor=\{\(e\) => `\$\{e\.source\}: \$\{e\.value\}`\}/);
    expect(src).toMatch(/labelFor=\{\(e\) => `\$\{e\.name\}: \$\{e\.value\}`\}/);
    expect(src.match(/labelFor=/g)?.length ?? 0, "exactly 4 labelFor sites").toBe(4);
  });
});
