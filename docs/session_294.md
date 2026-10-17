# Session 294 — the session-138 record (the reports chart-interiors walk + the grid fix)

## The intake

The workspace stood at `/home/z/my-project/neo-crm` — the s137 ship (`4c23b0b`) plus the
session_293 intake commit (`f01f404`); the tree clean throughout. The environment
re-verified: `.env` with DATABASE_URL="file:../db/custom.db" + AUTH_SECRET, census MATCH
15/24/10/23/12 + 4 users, bun node_modules standing, the Playwright chromium present.

The session_292 close's named direction: **the remaining fresh-eyes seams — the reports
tab-content chart interiors with seeded data** (the second of the three candidates; the
toast ours-only surfaces the residual). The 138-a inventory: the family FROZEN
(reports-page.tsx since s123, charts.tsx since s98, the api/reports route since s107) with
the chart INTERIORS only ever walked at the ZERO-DATA state (s98, 39 sessions stale) — the
seeded rendered SVG + the tooltips never censused anywhere. The named risks L-138a1..a9
with the TOP = the seeded chart interiors and L-138a2 = the tooltips (never censused on
ANY chart in ANY family).

## The session as it ran

The baseline gate GREEN — lint 0/0 · tsc 0 · **112/2041 unit** · build · **e2e 137/137
(3.4m)** — exact match to the s137 ship.

The audits dispatched as subagents (the house pattern): **138-a 9/9 Verified** (+ THE
COMPLETE REPORTS CHART-INTERIORS PRE-WALK INVENTORY: the freeze map, the tab map, the
16-chart anatomy with every fill/axis/series, the data flow, the drift carriers [the s133
retirement the ONLY moved-under carrier, code-verified no-op in the live flow], the pin
coverage map, the named risks L-138a1..a9) + **138-b 10/10 PASS** (the ~96th standing
battery, zero findings).

The live verification: **probe:ref #110** — the reference STABLE at the 81-session standing
fingerprint (index-DZ-xbrIm.js · 1,631,071 bytes · a70a637f… — demo data ZERO, the TRUE-390
defect STANDS, the desktop census STANDING). The four drift gates CLEAN ×4 (margin 0.5pct
over the standing baselines). scandihaven `d4789c3` on-pattern (unchanged). census MATCH.

The rotation (138-c): **THE REPORTS CHART-INTERIORS FRESH-EYES WALK** — walk29 (the phased
idiom: one app×viewport per invocation; the walk db ZERO-DATA for PASS 1 [the reference's
own standing state] / pristine-seeded for PASS 2; the reference's storageState persisted +
reused, ONE reference login; PORT 3141; every ours phase logs in fresh in-context; both
apps at 1440×900 + 390×844; ALL FIVE TABS clicked through on both apps with the per-chart
interior census — bar rects, pie sectors, lines, ticks + texts, gridlines, legends, the svg
text census — plus the tables, the KPI row, the filter bar, the tablist, the @390
containment).

**THE VERDICT — PASS 1 (two-app, zero-data): 849 axes compared, ONE pre-fix divergence:
the aging chart's gridlineCount ours 4 vs the reference 9.** The decisive geometry probes
followed: ours rendered the 4-line plot FRAME (edges only) where the reference rendered the
classic visible-ticks+edges grid — and every OTHER axis byte-equal (the ticks, the texts,
the bars, the funnel's 15-line grid, the pies).

**THE ROOT CAUSE — L-138c1 THE GRID TICK-DELIVERY GENUS**: recharts 2.15.4's CartesianGrid
generators spread the CONTEXT axis object over `CartesianAxis.defaultProps`; our families
passed `tick={undefined}` (whenever no tickFontSize) — the explicit-undefined KEY
nullifies `defaultProps.tick`, `getTicks()` bails on `!tick`, and the grid degenerates to
the frame. The funnel immune (explicit types, no tick prop); the line charts' V grids
carried the same face (the implicitly-typed categorical X delivering nothing). The genus
was invisible to every prior walk (gridline counts never censused — the maiden lens found
it on its first run) and contributed the "chart noise" share of the standing reports
~0.7% drift.

**THE FIX (D-138a0)**: the conditional `tickProp` spread + the explicit axis types
(`type="category"` X + `type="number"` Y) across the four grid-bearing families in
charts.tsx — **live-verified BYTE-EXACT** (the aging grid's all nine lines at the
reference's exact coordinates, both viewports). **The post-fix PASS 1 re-run: 849 axes,
0 diffs — byte-equal on every compared axis.**

**PASS 2 (populated, ours-only) — every seeded contract holds**: the KPI row
18/6/"4 $337.0K"/"2"+"$92K"/"66.7%" matching the in-page /api/reports cross-check (the
L-138a4 chain) · the ten tables (4/10 · 6/5 · 13/4 · 10/5 · 2/10 …) · the chart interiors
(bars/pies/lines/ticks/legends/sparks — the funnel's 8, the open-stage 4 with the
#8b5cf6 fills, the WonLost pairs + the 2-item legend, the 4 KPI sparks at pathLen 191) ·
**THE FOUR PIE LABEL TEXTS live-verified** (the L-138c2 animation-gate lesson — the labels
render only after the ~2s recharts mount animation; the walk's first census recorded zero,
the timing artifact: "0-25%: $190K, 26-50%: $110K, 51-75%: $225K, 76-100%: $0K" +
"Call: 6, Email: 4, Meeting: 3, Task: 1, WhatsApp: 1, Note: 1" + "referral: 5, call: 4,
email: 3, website: 3, partner: 3" + "Healthy: 5, Needs Attention: 3, At Risk: 2") ·
**THE MAIDEN TOOLTIP LENS** (the bar "prospecting → Value ($): 190,000" + the line
"Oct 2026 → revenue: $126,000" + the pie's stock name-index quirk) · **the period
round-trip** (quarter 18 → All Time 24 → Reset 18).

The remediation: **D-138a1 THE PINS** (+10 its, tests/reports-family-parity.test.ts — the
5 stash-proven L-138c1 source pins [exactly 5 RED at the pre-fix source] + the KPI 5-label
ordered set [the L-138a6 gap] + the Lost-Deals no-spark split + the 5 tab labels + the four
labelFor contracts) + **the e2e LIVE pin** (+1 — in crm.spec BEFORE the reset test [the
wipe leaves zero leads for every later spec file]: the aging chart's 9-line classic grid +
the source pie's 5 format-verified labels at 390, the recharts-upgrade sentinel) +
**D-138a2 the docs realignment** (the lockstep RED 16 sites → GREEN 21/21;
SUITES 112→113 · UNIT 2041→2051 · E2E 137→138 · badge 2178→2189; SKILL v1.135.0 + the
session-138 layer + the AGENTS Session-138 section + the PAD Session-138 row).

The walk-harness lessons (L-138c1..c3): **the grid tick-delivery genus** (never pass
`tick={undefined}` — spread conditionally; the maiden gridline census found what every
prior walk missed) · **the pie-animation gate** (settle > 2s before censusing pie label
texts — the labels render only post-animation) · **the login hydration race** (an early
fill resets on hydration and the POST 400s — settle before filling).

**What happened this session:**

1. **The fresh-eyes walk of the reports chart interiors found the family's first REAL
   parity defect**: the recharts 2.15.4 grid tick-delivery genus — our vertical bar
   charts rendered 4-line frame grids where the reference renders the classic
   visible-ticks+edges grids. The fix (the conditional tickProp spread + explicit axis
   types) restored byte-exact grids — verified at both viewports, the post-fix walk
   re-run byte-equal on all 849 compared axes.
2. **The maiden tooltip lens** verified the bar/line/pie tooltip contracts byte-level
   (the series names + the formatters), and the pie-label animation gate was diagnosed
   (the labels render post-animation with the reference's own decoded formats — all four
   live-verified).
3. **The pins**: +10 stash-proven unit its (the freeze-pin genus extended to the reports
   family) + the e2e recharts-upgrade sentinel. The count ladder **113 files / 2051 unit /
   138 e2e / badge 2189**.

**Next:** the fresh-eyes seam set narrows to the toast ours-only surfaces (the s131
record's residual arms) — or the fourth cycle (accounts, s133+5). Name one in the next
intake.
