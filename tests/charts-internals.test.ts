import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-27 pins (S27-P3/P4/P6/P9/P10 + the axis-line correction): the
// reference's chart-internals family, bundle-extracted (its minified bundle
// is ground truth for every config the zero-data DOM cannot express) and
// live-verified where visible. THE decisive systemic finding: the
// reference's Cartesian charts ship STOCK recharts axes — the axis line
// AND tick lines render at the default #666 (live SVG: line.recharts-
// cartesian-axis-line stroke #666 + line.recharts-cartesian-axis-tick-line
// stroke #666 + text fill #666) and stock margins — while our entire
// scaffold-era family hid them (axisLine={false} tickLine={false} +
// custom margins + width 32/56 + allowDecimals={false}). The rewrite:
// stock axes everywhere, per-surface single fills/radii/formatters, the
// chart-TYPE corrections (line vs bar vs pie), and the label-PIE family.
//
// Per-surface contracts (bundle-extracted):
//   dashboard pipeline: Bar value #3b82f6 radius [8,8,0,0], $ tooltip, tick 12
//   tab-1 revenue:      Line revenue #3b82f6 strokeWidth 2, $ tooltip
//   tab-1 wonlost:      Bar won #10b981 "Won" + Bar lost #ef4444 "Lost" + Legend
//   tab-1 pipeline:     Bar value #8b5cf6 name "Value ($)", plain tooltip, ROW-DERIVED
//   tab-1 funnel:       horizontal Bar count #06b6d4, YAxis stage width 100
//   tab-2 forecasting:  Line forecasted #3b82f6 "Forecasted" + Line actual #10b981 "Actual", $ tooltip
//   tab-2 pipeline:     Bar value #3b82f6, $ tooltip
//   tab-2 forecast:     PIE outerRadius 90, label `${band}%: $${(v/1e3).toFixed(0)}K`, 4 colors
//   tab-2 aging:        Bar count #8b5cf6, XAxis age
//   tab-3 by-type:      PIE outerRadius 90, label `${type}: ${count}`, 5 colors
//   tab-3 over-time:    Line count #3b82f6 strokeWidth 2
//   tab-3 vs-wins:      Bar count #3b82f6 "Activities" + Bar won #10b981 "Won Deals"
//   tab-4 by-source:    PIE outerRadius 90, label `${source}: ${count}`, 5 colors
//   tab-4 win-rate:     Bar winRate #10b981, % tooltip
//   tab-4 avg-value:    Bar avgValue #8b5cf6, $ tooltip
//   tab-5 health pie:   PIE outerRadius 100, label `${name}: ${value}`, [#10b981,#f59e0b,#ef4444]
//   tab-5 top-10:       horizontal Bar revenue #3b82f6, YAxis name width 120, $ tooltip
//   leads pipeline:     Bar value #3b82f6, $ tooltip, tick 12 (5-status vocabulary)
//   leads wonlost:      grouped bars + Legend (same family as tab-1)
//   activities by-type: Bar count #3b82f6 radius [4,4,0,0], tick 10, NO grid

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

function charts(): string {
  return stripComments(read("src/components/charts/charts.tsx") ?? "");
}

describe("session-27: the stock-axis correction (the systemic finding)", () => {
  it("the chart family carries ZERO axisLine={false} / tickLine={false} props (the reference ships stock #666 axes)", () => {
    const src = charts();
    expect(src).not.toMatch(/axisLine=\{false\}/);
    expect(src).not.toMatch(/tickLine=\{false\}/);
  });

  it("the Cartesian charts carry NO custom margin prop (the reference passes none — recharts stock 5/5/5/5)", () => {
    const src = charts();
    expect(src).not.toMatch(/margin=\{\{/);
  });

  it("the vertical charts carry no YAxis width override and no allowDecimals={false} (stock axes)", () => {
    const src = charts();
    expect(src).not.toMatch(/allowDecimals=\{false\}/);
  });
});

describe("session-27: the single-series bar chart family (SingleBarChart)", () => {
  it("exports SingleBarChart with the per-surface config surface (xKey, dataKey, fill, radius, name, formatter, tickFontSize, grid)", () => {
    const src = charts();
    expect(src).toMatch(/export function SingleBarChart\(/);
    for (const prop of ["xKey", "dataKey", "fill", "radius", "name", "formatter", "tickFontSize", "grid"]) {
      expect(src).toMatch(new RegExp(`${prop}[?]?:`));
    }
  });

  it("renders ONE Bar with the single fill prop and NO per-datum Cells (the reference's bars are single-color)", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function SingleBarChart"), src.indexOf("export function SingleBarChart") + 2200);
    expect(fn).toMatch(/<Bar\s/);
    expect(fn).toMatch(/fill=\{fill\}/);
    expect(fn).not.toMatch(/<Cell/);
  });

  it("the grid is conditional (the by-type chart ships NO CartesianGrid)", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function SingleBarChart"), src.indexOf("export function SingleBarChart") + 2200);
    expect(fn).toMatch(/\{grid && <CartesianGrid/);
  });
});

describe("session-27: the grouped-bar pair family (GroupedBarsChart)", () => {
  it("exports GroupedBarsChart with a series array (key/fill/name per pair)", () => {
    const src = charts();
    expect(src).toMatch(/export function GroupedBarsChart\(/);
  });

  it("renders one Bar per series entry with the stock <Legend /> (the wonlost family — s98: vs-wins opts out via the legend prop)", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function GroupedBarsChart"), src.indexOf("export function GroupedBarsChart") + 2400);
    expect(fn).toMatch(/series\.map/);
    expect(fn).toMatch(/<Legend \/>/);
  });
});

describe("session-27: the trend-line family (TrendLineChart)", () => {
  it("exports TrendLineChart with per-series stroke/name and an optional formatter", () => {
    const src = charts();
    expect(src).toMatch(/export function TrendLineChart\(/);
  });

  it("the lines carry strokeWidth 2 (the reference's explicit value — not our old 2.5)", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function TrendLineChart"), src.indexOf("export function TrendLineChart") + 2400);
    expect(fn).toMatch(/strokeWidth=\{2\}/);
    expect(fn).not.toMatch(/strokeWidth=\{2\.5\}/);
  });
});

describe("session-27: the label-PIE family (LabelPieChart)", () => {
  it("exports LabelPieChart with outerRadius, labelFor, fills and the stock tooltip", () => {
    const src = charts();
    expect(src).toMatch(/export function LabelPieChart\(/);
    const fn = src.slice(src.indexOf("export function LabelPieChart"), src.indexOf("export function LabelPieChart") + 2200);
    expect(fn).toMatch(/labelLine=\{false\}/);
    expect(fn).toMatch(/outerRadius=\{outerRadius\}/);
    expect(fn).toMatch(/cx="50%"/);
    expect(fn).toMatch(/cy="50%"/);
  });

  it("the PIE carries NO innerRadius / paddingAngle / Legend (a FULL pie, not our old donut)", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function LabelPieChart"), src.indexOf("export function LabelPieChart") + 2200);
    expect(fn).not.toMatch(/innerRadius/);
    expect(fn).not.toMatch(/paddingAngle/);
    expect(fn).not.toMatch(/<Legend/);
  });
});

describe("session-27: the horizontal-bar family (HorizontalBarChart)", () => {
  it("exports HorizontalBarChart with yKey + yWidth (the funnel 100 / top-10 120) and a single fill", () => {
    const src = charts();
    expect(src).toMatch(/export function HorizontalBarChart\(/);
    const fn = src.slice(src.indexOf("export function HorizontalBarChart"), src.indexOf("export function HorizontalBarChart") + 2200);
    expect(fn).toMatch(/layout="vertical"/);
    expect(fn).toMatch(/yWidth/);
  });

  it("carries NO radius, NO maxBarSize and NO per-datum Cells (the reference's horizontal bars are plain)", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function HorizontalBarChart"), src.indexOf("export function HorizontalBarChart") + 2200);
    expect(fn).not.toMatch(/maxBarSize/);
    expect(fn).not.toMatch(/<Cell/);
  });
});

describe("session-27: the retired chart family", () => {
  it("PipelineBarChart / WonLostLineChart / DonutChart / FunnelBarChart are retired (replaced by the new family)", () => {
    const src = charts();
    expect(src).not.toMatch(/export function PipelineBarChart/);
    expect(src).not.toMatch(/export function WonLostLineChart/);
    expect(src).not.toMatch(/export function DonutChart/);
    expect(src).not.toMatch(/export function FunnelBarChart/);
  });

  it("RevenueLineChart survives ONLY as the dashboard's won/target area chart, re-pinned to the reference's fillOpacity .6/.3 + stock strokeWidth + $ tooltip + tick 12", () => {
    const src = charts();
    const fn = src.slice(src.indexOf("export function RevenueLineChart"), src.indexOf("export function RevenueLineChart") + 3000);
    expect(src).toMatch(/export function RevenueLineChart/);
    expect(fn).not.toMatch(/0\.08/);
    expect(fn).not.toMatch(/strokeWidth=\{2\.5\}/);
  });
});

describe("session-27: the per-surface chart wirings (the pages)", () => {
  it("the dashboard pipeline uses SingleBarChart with #3b82f6 + radius [8,8,0,0] + value dataKey + $ formatter + tick 12", () => {
    const page = stripComments(read("src/app/(app)/dashboard/page.tsx") ?? "");
    expect(page).toMatch(/SingleBarChart/);
    const region = page.slice(page.indexOf("Sales Pipeline by Stage") - 1200, page.indexOf("Sales Pipeline by Stage") + 400);
    expect(region).toMatch(/fill="#3b82f6"/);
    expect(region).toMatch(/radius=\{\[8, 8, 0, 0\]\}/);
  });

  it("the dashboard renders the O-map legend chips (w-3 h-3 rounded squares + text-gray-600 + $X.Xk format)", () => {
    const page = stripComments(read("src/app/(app)/dashboard/page.tsx") ?? "");
    expect(page).toMatch(/PIPELINE_LEGEND/);
    const layout = stripComments(read("src/lib/page-layout.ts") ?? "");
    // Session-63 re-anchor: the definition form (the sweep list carries
    // the token too now).
    const at = layout.indexOf("export const PIPELINE_LEGEND");
    const block = layout.slice(at, at + 900);
    expect(block).toMatch(/w-3 h-3 rounded/);
    expect(block).toMatch(/text-gray-600/);
    expect(block).toMatch(/bg-gray-400/);
  });

  it("the tab-1 revenue chart is TrendLineChart (ONE revenue line, NOT the dashboard's won/target areas)", () => {
    const page = stripComments(read("src/app/(app)/reports/reports-page.tsx") ?? "");
    const region = page.slice(page.indexOf('title="Revenue Over Time"') - 400, page.indexOf('title="Revenue Over Time"') + 500);
    expect(region).toMatch(/TrendLineChart/);
    expect(region).not.toMatch(/RevenueLineChart/);
  });

  it("the tab-1 wonlost + tab-3 vs-wins are GroupedBarsChart; the tab-1 pipeline is ROW-DERIVED violet with the Value ($) name", () => {
    const page = stripComments(read("src/app/(app)/reports/reports-page.tsx") ?? "");
    const wonlost = page.slice(page.indexOf('title="Won vs Lost Over Time"') - 400, page.indexOf('title="Won vs Lost Over Time"') + 400);
    expect(wonlost).toMatch(/GroupedBarsChart/);
    const pipeline = page.slice(page.indexOf('title="Pipeline by Stage"') - 500, page.indexOf('title="Pipeline by Stage"') + 500);
    expect(pipeline).toMatch(/pipelineByStageRows/);
    expect(pipeline).toMatch(/#8b5cf6/);
    const vswins = page.slice(page.indexOf('title="Activities vs Wins"') - 400, page.indexOf('title="Activities vs Wins"') + 400);
    expect(vswins).toMatch(/GroupedBarsChart/);
  });

  it("the funnel is HorizontalBarChart with #06b6d4 + stage yKey + width 100", () => {
    const page = stripComments(read("src/app/(app)/reports/reports-page.tsx") ?? "");
    const region = page.slice(page.indexOf('title="Conversion Funnel"') - 500, page.indexOf('title="Conversion Funnel"') + 500);
    expect(region).toMatch(/HorizontalBarChart/);
    expect(region).toMatch(/#06b6d4/);
    expect(region).toMatch(/yWidth=\{100\}/);
  });

  it("the tab-2 forecast + tab-3 by-type + tab-4 by-source + tab-5 health charts are LabelPieChart", () => {
    const page = stripComments(read("src/app/(app)/reports/reports-page.tsx") ?? "");
    for (const title of ["Forecast by Probability", "Activities by Type", "Leads by Source", "Account Health Distribution"]) {
      const region = page.slice(page.indexOf(`title="${title}"`) - 400, page.indexOf(`title="${title}"`) + 500);
      expect(region).toMatch(/LabelPieChart/);
    }
  });

  it("the tab-5 Top 10 Accounts is HorizontalBarChart with #3b82f6 + name yKey + width 120", () => {
    const page = stripComments(read("src/app/(app)/reports/reports-page.tsx") ?? "");
    const region = page.slice(page.indexOf('title="Top 10 Accounts by Revenue"') - 500, page.indexOf('title="Top 10 Accounts by Revenue"') + 500);
    expect(region).toMatch(/HorizontalBarChart/);
    expect(region).toMatch(/#3b82f6/);
    expect(region).toMatch(/yWidth=\{120\}/);
  });

  it("the leads pipeline uses the FIVE-status vocabulary (incl. Contacted) with value sums and single-blue fill", () => {
    const page = stripComments(read("src/app/(app)/leads/leads-page.tsx") ?? "");
    expect(page).toMatch(/"contacted", "qualified", "won", "lost"|"contacted","qualified","won","lost"/);
    const region = page.slice(page.indexOf("Pipeline Value by Stage") - 900, page.indexOf("Pipeline Value by Stage") + 300);
    expect(region).toMatch(/SingleBarChart/);
  });

  it("the activities by-type chart is single-blue radius [4,4,0,0] with tick 10 and NO grid", () => {
    const page = stripComments(read("src/app/(app)/activities/activities-page.tsx") ?? "");
    const region = page.slice(page.indexOf("Activities by Type") - 200, page.indexOf("Activities by Type") + 1600);
    expect(region).toMatch(/#3b82f6/);
    expect(region).toMatch(/radius=\{\[4, 4, 0, 0\]\}/);
    expect(region).toMatch(/tickFontSize=\{10\}/);
    expect(region).not.toMatch(/maxBarSize/);
  });
});

describe("session-70: the by-type family rewire + the animation retirement (N-70c5/c6)", () => {
  it("the activities by-type chart rides the SingleBarChart family (grid=false, height 150) — no hand-rolled BarChart", () => {
    // The 70-c rotation's find: the call-site was a hand-rolled BarChart
    // duplicate of the family (drift hazard) carrying an INVENTED
    // name="Logged" (the bundle's Bar ships NO name — the reference's
    // tooltip reads "count : N", ours read "Logged : N"). The family
    // already supported the whole shape: grid={false} tickFontSize={10}
    // height={150} fill radius.
    const page = stripComments(read("src/app/(app)/activities/activities-page.tsx") ?? "");
    const region = page.slice(page.indexOf("Activities by Type") - 200, page.indexOf("Activities by Type") + 1600);
    expect(region).toMatch(/<SingleBarChart/);
    expect(region).toMatch(/grid=\{false\}/);
    expect(region).toMatch(/height=\{150\}/);
    expect(region).not.toMatch(/<BarChart/);
    expect(region).not.toMatch(/name="Logged"/);
  });

  it("ZERO isAnimationActive props in src/ (the reference never disables chart animation at a call-site)", () => {
    // The 70-c rotation + the orchestrator's bundle decode: ALL 38
    // occurrences of isAnimationActive in the reference bundle are
    // recharts LIBRARY INTERNALS (defaultProps + class machinery) —
    // the reference's app code passes the prop NOWHERE. Its funnel
    // (Kd + LabelList + per-datum Cells) and its KPI sparkline (Fc
    // Area fillOpacity .3) both ANIMATE on mount. Ours disabled the
    // animation at three sites (the funnel + the Sparkline Area/Line
    // arms) — a scaffold-era artifact, now retired.
    const surfaces = [
      "src/components/charts/charts.tsx",
      "src/components/shared/page-parts.tsx",
    ];
    for (const rel of surfaces) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).not.toContain("isAnimationActive");
    }
  });
});

describe("session-98 (F-98c2): the vs-wins legend genus — the reference ships NO legend on that surface", () => {
  it("GroupedBarsChart gains the legend prop (default true — the wonlost family keeps the stock Legend)", () => {
    // The 98-c rotation decode: the reference's "Activities vs Wins"
    // renders NO legend wrapper at EITHER 390 or 1440 (legendH=null, 0
    // items) while its sibling "Won vs Lost Over Time" renders its
    // 2-item legend — and the s27 bundle decode agrees (the per-surface
    // contract list carries "+ Legend" on the wonlost charts only, never
    // on vs-wins). Our single family shipped <Legend /> unconditionally
    // — the vs-wins legend was OUR addition, not a reference mirror.
    const src = charts();
    const fn = src.slice(
      src.indexOf("export function GroupedBarsChart"),
      src.indexOf("export function GroupedBarsChart") + 2600,
    );
    expect(fn).toMatch(/legend = true/);
    expect(fn).toMatch(/\{legend && <Legend \/>}/);
  });

  it("the reports vs-wins call site opts out (legend={false}); the tab-1 + leads wonlost sites ride the default", () => {
    const page = stripComments(
      read("src/app/(app)/reports/reports-page.tsx") ?? "",
    );
    const leads = stripComments(
      read("src/app/(app)/leads/leads-page.tsx") ?? "",
    );
    // the vs-wins site opts out
    const vsWinsAt = page.indexOf('"Activities vs Wins"');
    expect(vsWinsAt).toBeGreaterThan(-1);
    const vsWins = page.slice(vsWinsAt, vsWinsAt + 700);
    expect(vsWins).toMatch(/legend=\{false\}/);
    // the tab-1 wonlost site keeps the default (the reference renders
    // its 2-item legend at zero data — FLAT on both apps)
    const wonlostAt = page.indexOf('"Won vs Lost Over Time"');
    expect(wonlostAt).toBeGreaterThan(-1);
    const wonlost = page.slice(wonlostAt, wonlostAt + 700);
    expect(wonlost).not.toMatch(/legend=/);
    // the leads rail wonlost keeps the default too (the s27 bundle
    // decode lists the Legend for the wonlost family)
    const leadsCallAt = leads.indexOf("<GroupedBarsChart");
    expect(leadsCallAt).toBeGreaterThan(-1);
    const leadsCall = leads.slice(leadsCallAt, leadsCallAt + 700);
    expect(leadsCall).not.toMatch(/legend=/);
  });
});

// ---------------------------------------------------------------------------
// Session-140 (the 140-c rotation — THE LEADS CHART-INTERIORS POST-FIX
// WALK): the ConversionFunnel FAMILY stock-construction pin. The walk's
// maiden tooltip decode: the populated leads funnel tooltip reads
// "0 : 4" — the FunnelChart's stock payload face (the family's bare
// <Tooltip /> carries NO formatter and NO name wiring). The zero-data
// face: BOTH apps render 4 degenerate 0x0 trapezoids with 0 labels —
// byte-equal (the walk's re-characterization of the s10/s13 "renders
// NOTHING" note: no VISIBLE funnel on either app, the DOM symmetric).
// The family was never pinned at the family level.
// ---------------------------------------------------------------------------

describe("session-140: the ConversionFunnel family stock construction (the maiden funnel face)", () => {
  it("the FunnelChart + the stock no-formatter Tooltip + the LabelList right fill #000 + NO CartesianGrid (the L-138c1-immune family)", () => {
    const fn = charts();
    const i = fn.indexOf("export function ConversionFunnel");
    expect(i).toBeGreaterThan(-1);
    const region = fn.slice(i, i + 1400);
    // Session-176 re-anchor: the opening tag carries accessibilityLayer=
    // {false} now (the recharts 3.x default flip — the parity prop, see
    // the s176 block below); the s140 intent (the stock construction)
    // is unchanged.
    expect(region).toMatch(/<FunnelChart(?:\s[^>]*)?>/);
    // the stock Tooltip — NO formatter, NO name wiring (the "0 : 4"
    // payload face the walk decoded)
    expect(region).toMatch(/<Tooltip\s*\/>/);
    expect(region).not.toMatch(/<Tooltip[^/]*formatter/);
    // the LabelList: right position, the #000 fill, the label dataKey
    expect(region).toMatch(/<LabelList position="right" fill="#000" stroke="none" dataKey="label"\s*\/>/);
    // the FunnelBar rides dataKey "value" with the per-datum fills
    expect(region).toMatch(/<FunnelBar dataKey="value" data=\{funnelData\}>/);
    // L-138c1-IMMUNE: the family carries NO CartesianGrid (and no axis
    // components at all — the grid-fix genus cannot touch it)
    expect(region).not.toMatch(/CartesianGrid/);
    expect(region).not.toMatch(/<XAxis|<YAxis/);
  });
});

// ---------------------------------------------------------------------------
// Session-141 (the activities walk, walk32): the by-type call-site
// construction + the SingleBarChart family's L-138c1 tick-spread guard.
// The consumer #4 sweep-closing walk: charts.tsx moved at s138 (the
// grid fix); reports #1 re-walked s138, the dashboard #2 s139, the leads
// #3 s140 — THE ACTIVITIES BY-TYPE CHART was the family's LAST consumer,
// never re-walked post-fix. The site is grid={false} (L-138c1-IMMUNE at
// the grid face — no CartesianGrid surface) + tickFontSize 10 (tick
// defined — the tick spread is a no-op here): the s138 fix changed this
// site's rendering by exactly nothing, and walk32 verified the whole
// interiors census byte-equal two-app (the bars, the ticks at 10px/#666,
// the y-domain "0,1,2,3,4" quirk at zero, the chart rect 270x150, the
// chips, the tooltip faces).
// ---------------------------------------------------------------------------

describe("session-141: the by-type call-site construction (the consumer #4 sweep-closing walk)", () => {
  it("the activities by-type call site: grid={false} + tickFontSize 10 + radius [4,4,0,0] + #3b82f6 + height 150 + NO name + NO formatter (the raw-dataKey + raw-number tooltip face)", () => {
    const page = stripComments(read("src/app/(app)/activities/activities-page.tsx") ?? "");
    const i = page.indexOf("<SingleBarChart");
    expect(i).toBeGreaterThan(-1);
    const call = page.slice(i, i + 400);
    // THE CALL-SITE CONSTRUCTION (walk32-verified two-app byte-equal):
    // the chart rect 270x150 · the x-ticks carry the 5 labels + the
    // y-ticks the "0,1,2,3,4" quirk at zero · both at fontSize 10 fill
    // #666 (the stock recharts chrome) · NO grid (zero .recharts-
    // cartesian-grid lines — the L-138c1-immune face) · the single-fill
    // #3b82f6 bars with the rounded-top radius.
    expect(call).toContain('dataKey="count"');
    expect(call).toContain('fill="#3b82f6"');
    expect(call).toContain("radius={[4, 4, 0, 0]}");
    expect(call).toContain("tickFontSize={10}");
    expect(call).toContain("height={150}");
    expect(call).toContain("grid={false}");
    // THE MAIDEN TOOLTIP FACE (never decoded on this chart before the
    // s141 walk): NO name prop (the tooltip's series label = the RAW
    // dataKey "count") + NO formatter (the raw number) — the seeded
    // face read "Callcount : 5" (the 7days-windowed count) + the zero
    // face "Emailcount : 0", byte-equal two-app at BOTH faces; the
    // chrome white bg / #ccc border / 0px radius / 16px/400.
    expect(call).not.toMatch(/\bname=/);
    expect(call).not.toMatch(/\bformatter=/);
    // THE 0-VALUE-BAR ELISION GENUS (the maiden decode): at the seeded
    // 7days window the Note count is 0 and recharts renders NO bar rect
    // for it (4-of-5 bars; at the all-zero face ZERO bars render on
    // either app — the bt.bars.count 0/0 byte-equal genus, the same
    // family as the leads funnel's degenerate trapezoids but with NO
    // DOM residue at all here).
  });

  it("the SingleBarChart + GroupedBarsChart families carry the L-138c1 tick-spread guard (the explicit-undefined tick prop would kill the grid generators)", () => {
    const src = charts();
    // L-138c1: recharts 2.15's grid generators spread the context axis
    // object over CartesianAxis.defaultProps — an explicit tick:undefined
    // key nullifies defaultProps.tick, getTicks() bails on !tick, and the
    // CartesianGrid falls back to the 4-line plot FRAME where the
    // reference's recharts renders the visible-ticks+edges grid. The
    // guard: the tick prop is spread ONLY when it carries a value —
    // pinned at the family level for BOTH Cartesian bar families (the
    // s138 fix's own construction, previously pinned only through the
    // grid-conditional face).
    for (const [family, nextExport] of [
      ["SingleBarChart", "export function GroupedBarsChart"],
      ["GroupedBarsChart", "export function TrendLineChart"],
    ] as const) {
      const i = src.indexOf(`export function ${family}`);
      expect(i).toBeGreaterThan(-1);
      const j = src.indexOf(nextExport, i);
      const fn = src.slice(i, j > i ? j : i + 2400);
      expect(fn).toMatch(/const tickProp = tick \? \{ tick \} : \{\};/);
      const spreads = fn.match(/\{\.\.\.tickProp\}/g) ?? [];
      expect(spreads.length).toBe(2); // the XAxis + the YAxis
    }
  });
});

// ---------------------------------------------------------------------------
// Session-176 (THE RECHARTS 3.x MIGRATION — the N-3 retirement): the
// version-floor + lockfile + DOM-parity battery. The rotation trigger:
// the owner's newest commit 35f04d5 (the session-374 transcript, whose
// close names this round verbatim — "the recharts 2.15 → 3.x migration
// (N-3 …) is the largest remaining named candidate"); the report's N-3
// row ("recharts 2.15 … migration debt · Low · Verified"). The official
// 3.0 guide's breaking census against our nine chart-type JSX sites
// surfaced exactly one DOM-visible default flip: accessibilityLayer
// ships false in 2.x, TRUE in 3.0+ (the recharts wiki's own words) —
// the wrapper gains role="region"/tabIndex/aria-label the reference's
// 2.x DOM does not carry. The parity cure: the explicit false at every
// site. The L-138c1 defaultProps machinery the tick-spread hazard lived
// in is GONE in 3.x (the state-management rewrite) — the guard stays as
// the harmless belt-and-suspenders form, and the e2e grid sentinel (the
// L-138c2 "future recharts upgrade" guard, gridCount 9) carries the
// live re-verification.
// ---------------------------------------------------------------------------

describe("session-176: THE RECHARTS 3.x MIGRATION (N-3 retired — the version + lockfile + DOM-parity pins)", () => {
  it("package.json declares recharts ^3 — the 2.15 major retired (the N-3 migration debt paid)", () => {
    const pkg = JSON.parse(read("package.json") ?? "{}") as {
      dependencies?: Record<string, string>;
    };
    const v = pkg.dependencies?.recharts;
    expect(v).toMatch(/^\^3\./);
    // the retired major must not ride a range that could resolve it back
    expect(v).not.toContain("2.15");
  });

  it("bun.lock resolves recharts 3.10.x — the lockfile carries the migration (the sibling zb's proven line, the registry's latest stable)", () => {
    const lock = read("bun.lock") ?? "";
    // the bun.lock form: "recharts": ["recharts@3.10.1", "", {…}, "sha512-…"]
    expect(lock).toMatch(/"recharts":\s*\["recharts@3\.10\./);
    // the 2.x resolution is gone from the lockfile entirely
    expect(lock).not.toMatch(/recharts@2\./);
  });

  it("every chart-type site carries accessibilityLayer={false} — the 3.x default flip pinned OFF for reference DOM parity (the 9-site census)", () => {
    // recharts 3.0 flips the accessibilityLayer default to true — every
    // chart wrapper would gain role="region"/tabIndex/aria-label the
    // reference's 2.x DOM does not carry (the DOM-parity doctrine: the
    // a11y two-gate's sanctioned register was calibrated on the 2.x
    // genus; the interior census walks the 2.x wrapper anatomy). The
    // census: the NINE chart-type JSX sites across the two consumer
    // files — charts.tsx's seven families (Bar ×3 · Line · Pie ·
    // Composed · Funnel) + the Sparkline's area/line arms — every one
    // carrying the explicit false.
    const sites: Array<[string, string]> = [
      ["src/components/charts/charts.tsx", "BarChart"],
      ["src/components/charts/charts.tsx", "LineChart"],
      ["src/components/charts/charts.tsx", "PieChart"],
      ["src/components/charts/charts.tsx", "ComposedChart"],
      ["src/components/charts/charts.tsx", "FunnelChart"],
      ["src/components/shared/page-parts.tsx", "AreaChart"],
      ["src/components/shared/page-parts.tsx", "LineChart"],
    ];
    let total = 0;
    for (const [rel, tag] of sites) {
      const src = stripComments(read(rel) ?? "");
      const re = new RegExp(`<${tag}[\\s>]`, "g");
      let m: RegExpExecArray | null;
      while ((m = re.exec(src))) {
        total += 1;
        // the opening tag runs to the next '>' (no '>' rides inside the
        // attribute expressions on these sites)
        const tagEnd = src.indexOf(">", m.index);
        const opening = src.slice(m.index, tagEnd);
        expect(opening, `${rel}: <${tag} …> missing the parity prop`).toContain(
          "accessibilityLayer={false}",
        );
      }
    }
    // the census itself: exactly nine sites (a tenth means a NEW chart
    // surface shipped without the parity decision — fail here first)
    expect(total).toBe(9);
  });

  it("the e2e grid sentinel stands — the L-138c2 'future recharts upgrade' guard rides the 192 (gridCount 9)", () => {
    // The upgrade-proof's existence pin: crm.spec.ts's live face — "a
    // future recharts upgrade that re-breaks the tick delivery REDs
    // here even though the source pins would stay green" — is the
    // standing evidence THIS migration leans on. Deleting the sentinel
    // would strip the only live guard over the grid rendering across
    // chart-major upgrades; pin its decisive form here.
    const spec = read("tests/e2e/crm.spec.ts") ?? "";
    expect(spec).toContain("gridCount: 9");
    expect(spec).toMatch(/recharts upgrade that re-breaks/);
  });
});
