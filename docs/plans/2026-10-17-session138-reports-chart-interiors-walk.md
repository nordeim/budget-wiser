# Session 138 — the reports chart-interiors family fresh-eyes walk (the grid-fix session)

The 138-c rotation — the session_292 close's named direction: **the remaining fresh-eyes
seams — the reports tab-content chart interiors with seeded data** (the second of the three
named candidates: settings s137, reports s138, the toast ours-only surfaces the residual).
The 138-a pre-walk inventory named the risks L-138a1..a9 with the TOP = the seeded chart
interiors (charts.tsx:91-298 + the five tab bodies: source-pinned configs, rendered output
never verified with data) and L-138a2 = the tooltip interaction (never censused on ANY chart,
ANY family).

## The walk as executed (walk29, the phased idiom)

PASS 1 (two-app, ZERO-DATA — the reference's own standing state, both 1440×900 + 390×844,
PORT 3141, the walk db zeroed via the standing zero-data tool; the reference's storageState
persisted + reused, ONE reference login total; every ours phase logs in fresh in-context):
the shell census (h1/subtitle/docScrollW + the Saved Reports outline) · the KPI row (the 5
CircleStatCards at zeros + the 4 static sparks) · the filter bar (the 4 selects + Reset +
Export CSV + PDF — the L-138a3 s133-arm resting-ink census) · the pill tablist (5 triggers +
the active state) · ALL FIVE TABS clicked through on BOTH apps with the per-chart interior
census (titles, card/svg geometry, bar rect counts, line/area counts, pie sector counts,
x/y tick counts + texts, gridline counts, legend items, the svg text census) + the ten
tables (heads/rowCount/empty literals) · the @390 containment (docScrollW, card widths, the
tab wrap).

**THE VERDICT — PASS 1: 849 axes compared, ONE pre-fix divergence: the aging chart's
`gridlineCount` ours 4 vs the reference 9 (at BOTH viewports).** Every other axis byte-equal
— the ticks, the tick texts, the bars, the pies, the funnel's 15-line grid, the legends, the
sparks. The decisive geometry probes: ours rendered the 4-line plot FRAME
(H@5/H@265 + V@65/V@302 — edges only) where the reference rendered the classic
visible-ticks+edges grid (H@5/70/135/200/265 + V@65/154/272/302 — the 5 y-tick lines + the
2 elided x-tick centers + the 2 edges).

**THE ROOT CAUSE — L-138c1 THE GRID TICK-DELIVERY GENUS**: recharts 2.15.4's CartesianGrid
coordinate generators spread the CONTEXT axis object over `CartesianAxis.defaultProps`
(`{...defaultProps, ...axis, ticks: getTicksOfAxis(axis, true)}`); our chart families passed
`tick={tick}` where `tick === undefined` whenever no `tickFontSize` is requested — an
EXPLICIT `tick: undefined` key on the context axis object overrides `defaultProps.tick`, so
the inner `getTicks()` bails on `!tick` and returns `[]`, and `getCoordinatesOfGrid([], min,
max, false)` degenerates to `[min, max]` — the frame. The HorizontalBar family (the funnel)
was immune (explicit `type=` on both axes + no tick prop); the LineChart's H grid worked
(its implicit numeric Y still delivered niceTicks) but its V grid carried the same edges-only
face (the implicitly-typed categorical X delivering nothing).

## The fix (D-138a0)

`src/components/charts/charts.tsx`:
1. **The conditional tickProp spread** — `const tickProp = tick ? { tick } : {};` spread onto
   the axes ONLY when the prop carries a value (SingleBarChart, GroupedBarsChart,
   RevenueLineChart — the three tickFontSize families);
2. **The explicit axis types** — `type="category"` on the XAxis + `type="number"` on the
   YAxis of all four grid-bearing families (SingleBar, GroupedBars, TrendLine,
   RevenueLine), matching the funnel's already-immune standing shape.

**Live-verified BYTE-EXACT**: the post-fix aging grid renders H@5/70/135/200/265 +
V@65/154/272/302 — all nine lines at the reference's exact coordinates, at both viewports.
The post-fix PASS 1 re-run: **849 axes, 0 diffs — byte-equal on every compared axis.**

## PASS 2 (populated, ours-only — the walk db pristine-seeded)

Every seeded contract holds:
- **The KPI row** 18 / 6 / "4 $337.0K" / "2"+"$92K" / "66.7%" — matching the in-page
  /api/reports cross-check fetch (the L-138a4 aggregation→rendered-value chain) and the
  138-a inventory's expectations;
- **The chart interiors with data**: the funnel's 8 bars + the 8 slug ticks · the
  open-stage bars (4, fills #8b5cf6) · the WonLost pairs + the 2-item legend (the
  F-98c2 contract, fills #10b981/#ef4444) · the forecast pie's 4 sectors + the Aging
  4-band bars · the vs-wins no-legend pair · the WinRate/AvgValue bars · the Top-10
  horizontal bars with the account-name ticks · the 4 KPI sparks (the static
  [65,72,68,85,78,92] line — pathLen 191 byte-equal across all four);
- **THE FOUR PIE LABEL TEXTS live-verified** (the L-138c2 lesson): "0-25%: $190K,
  26-50%: $110K, 51-75%: $225K, 76-100%: $0K" (forecast) · "Call: 6, Email: 4,
  Meeting: 3, Task: 1, WhatsApp: 1, Note: 1" (by-type) · "referral: 5, call: 4,
  email: 3, website: 3, partner: 3" (by-source) · "Healthy: 5, Needs Attention: 3,
  At Risk: 2" (health) — all four in the reference's own decoded formats;
- **THE MAIDEN TOOLTIP LENS (L-138a2)** — never censused on any chart, any family:
  the bar tooltip (label "prospecting", item "Value ($) : 190,000" — the name + the
  plain toLocaleString formatter byte-verified) · the line tooltip (label "Oct 2026",
  item "revenue : $126,000" — the raw-dataKey name + the dollarFormatter, the value
  matching the API's own revenue0) · the pie tooltip (the stock recharts name-index
  quirk "0 : 5" — identical on both apps given the same unnamed data shape);
- **The period round-trip**: quarter (18 leads) → All Time (24) → Reset (18 back) —
  the data flow end-to-end through the store's re-fetch;
- **The ten tables**: the row contracts (Recent Won 4 / Top Deals 10 / Open by Stage 6 /
  At Risk 5 / Overdue 15 / By Owner 4 / Leads List 10 / Source Summary 5 / At Risk
  Accounts 2 / Account Summary 10).

## The walk-harness lessons (L-138c1..c3)

- **L-138c1 the grid tick-delivery genus**: NEVER pass `tick={undefined}` to a recharts
  axis — the explicit-undefined key nullifies `CartesianAxis.defaultProps.tick` inside
  the grid generators' spread, and `getTicks()` bails on `!tick`. Spread the prop
  conditionally. (The genus was invisible to every prior walk — gridline counts were
  never censused; the maiden lens found it on its first run. It also contributed the
  "chart noise" share of the standing reports ~0.7% drift.)
- **L-138c2 the pie-animation gate**: recharts' pie labels render only AFTER the ~2s
  mount animation completes (`renderLabels` gates on `isAnimationFinished`) — a census
  settle under ~2s records zero labels (the walk's first PASS 2 run did exactly that;
  the 10s poll proved the labels render with the exact `${x}: ${y}` texts).
- **L-138c3 the login hydration race**: filling the login form before React hydration
  completes silently resets the input values on hydration — the POST then 400s on
  validation. Settle (~1s) before filling.

## The remediation

- **D-138a0 THE GRID FIX** (charts.tsx — the conditional tickProp + the explicit types,
  live-verified byte-exact; the funnel untouched — already immune).
- **D-138a1 THE PINS** (+10 its, tests/reports-family-parity.test.ts):
  1. The 5 L-138c1 source pins — NO bare `tick={tick}` anywhere + the conditional
     tickProp idiom + the explicit axis types per family + the funnel's standing
     shape (stash-proven: exactly 5 RED at the pre-fix source, the 5 untouched
     pins GREEN);
  2. The KPI 5-label ordered set (the L-138a6 gap — Total Leads / Open Leads /
     Won Deals / Lost Deals / Conversion Rate in document order);
  3. The Lost-Deals no-spark split (the reference's own won-inline/lost-subtitle
     anatomy);
  4. The 5 tab labels ordered set (REPORT_TABS);
  5. The four pie labelFor contracts (the live-verified formats).
- **The e2e LIVE pin** (+1, in crm.spec BEFORE the reset test — the wipe leaves zero
  leads for every later spec file): the aging chart's 9-line classic grid + the source
  pie's 5 format-verified labels at 390 — the recharts-upgrade sentinel (a future
  recharts bump that re-breaks the tick delivery REDs here even though the source pins
  stay green; both halves polled, the s49 deterministic-wait doctrine — the exact pie
  values are the unit pins' domain, the suite's intentional residuals shift them).
- **D-138a2 THE DOCS REALIGNMENT** (SUITES 112→113 · UNIT 2041→2051 (+10) · E2E
  137→138 · badge 2178→2189; SKILL v1.135.0 + the session-138 layer + the AGENTS
  Session-138 section + the PAD Session-138 inventory row + session_294.md + this
  plan + the repo worklog).

## The TDD ladder (as executed)

1. The grid fix dev-live-verified (the probe: 4-line frame → 9-line classic grid,
   byte-equal the reference's coordinates).
2. The pins written at the fixed source: 10/10 GREEN.
3. **The stash-proof**: the charts.tsx fix stashed alone → exactly 5 RED (the five
   L-138c1 pins) → popped → 10/10 GREEN.
4. The e2e live pin measured first (the aging 9 + the pie labels at 390), written,
   then the full gate.
5. The docs-counts lockstep RED (16 sites at the stale docs) → the realignment →
   GREEN 21/21.
6. The post-fix walk re-run: PASS 1 849 axes, 0 diffs.

## The ship

src/ 1 file (charts.tsx — the grid fix) · tests/ 1 new file
(reports-family-parity.test.ts +10 its) + 1 extended e2e spec (reports-mobile.spec.ts
+1 guard) + the docs-counts lockstep carriers · docs/ realigned + the plan +
session_294.md + the worklog + the captures.
