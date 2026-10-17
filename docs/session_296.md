# Session 296 — the session-139 record (the dashboard chart-interiors post-fix re-walk)

## The intake

The workspace had been RESET — re-cloned at `740a191` (the s138 ship `2a55fd2` + the
`b50233d`/`2c5cb4a`/`740a191` session-log commits); the environment re-stood: bun
install 533 pkgs, `.env` with DATABASE_URL="file:../db/custom.db" + AUTH_SECRET,
`env -u` db:push/db:seed, census MATCH 15/24/10/23/12 + 4 users at the repo path,
Playwright chromium-headless-shell 1243 reinstalled to match the lockfile (the
platform cache carried the 1200 build — the standing reset ritual).

The s138 ship verified against the codebase: the grid fix (charts.tsx +35, the
conditional tickProp spread + the explicit axis types across the four grid-bearing
families), the pins (+10 its, reports-family-parity), the e2e LIVE pin (in
crm.spec BEFORE the reset test), the docs at v1.135.0 / 2051 / 138 / badge 2189,
the captures 280-283 with four unique md5s.

## The session as it ran

The baseline gate GREEN — lint 0/0 · tsc 0 · **113/2051 unit** · build · **e2e
138/138 (3.4m)** — the exact s138-ship match. probe:ref **#111** — the reference
STABLE at the 81-session standing fingerprint. The four drift gates CLEAN ×4.
scandihaven `d4789c3` on-pattern. census MATCH.

The audits dispatched as subagents (the house pattern): **139-a 9/9 Verified** (one
footnote: the PAD row + the plan ship-line name `reports-mobile.spec.ts` for the
s138 e2e guard which actually lives in `crm.spec.ts` — a two-site naming slip, zero
functional impact) + THE COMPLETE DASHBOARD CHART-INTERIORS PRE-WALK INVENTORY
(the freeze map: page.tsx s87 · **charts.tsx s138 = the moved-under carrier** ·
page-parts s90 · the capital shim s24 · the api route s110; the chart anatomy: the
pipeline SingleBarChart [tickFontSize 12 → the s138 fix behavior-preserving there]
+ the RevenueLineChart [the two filled areas, the per-request RANDOM target] + the
6 Sparklines [3 recharts — no grid/tooltip/axes, L-138c1-immune + 3 CSS-bar]; no
funnel/pie on the dashboard; the maiden lens census; the pin coverage; the named
risks L-139a1..a9 with the TOP = the post-fix gridline adjudication) + **139-b
10/10 PASS** (the ~97th standing battery, zero findings).

**The rotation decision** (the session_294 close left the toast ours-only surfaces
vs the accounts fourth cycle open; the orchestrator superseded both by the
blast-radius doctrine): charts.tsx moved at s138; reports (consumer #1) was
re-walked byte-exact in the s138 session; **the dashboard (consumer #2) was never
re-walked post-fix** — only the zero-data pixel drift gates covered it, and the
maiden gridline + tooltip lenses had never run on the dashboard family. The named
alternatives are strictly lower-yield: the toast surfaces have no reference
contract (the reference's toast system DOM-dead; the chrome pinned at s131); the
accounts family is frozen since s133 with zero moved-under carriers (verified
per-file).

**The walk (139-c) — walk30** (the phased idiom: the walk db ZERO-DATA for PASS 1
/ pristine-seeded for PASS 2; both apps at 1440×900 + 390×844; the reference's
storageState persisted + reused, ONE reference login; PORT 3141; every ours phase
logs in fresh with the L-138c3 hydration settle). The census: the KPI row + the
sparkline INTERIORS (the per-path attribute tuples — the maiden lens) + the
chart-interiors deep census (the H/V grid SPLIT with coordinates — the s138 lens
applied to the second consumer) + **the MAIDEN TOOLTIP LENS** (real pointer moves,
the card-scoped wrapper read, number-masked + raw texts) + the @390 containment +
the PASS 2 round-trips + the API cross-check.

**THE VERDICT — PASS 1: 274 axes, 7 raw diffs → TWO REAL PARITY DEFECTS, both
one-line construction deviations in the s138 fix's blast-radius family:**

- **F-139c1 THE TARGET ROUNDING**: our revenue chart's
  `Math.round(55_000 + Math.random() * 10_000)` rendered integer-only tooltip
  values ("Target : $60,977") where the reference's own formula carries NO
  rounding — the maiden tooltip lens caught the ref's "Target : $57,824.88" and
  the 5-sample decisive probe confirmed the raw-float form ($63,694.472 ·
  $56,795.191 · $62,275.747 · $61,924.288 · $57,941.876 — toLocaleString's
  3-fraction-digit default with trailing-zero trims). The number-masked diff had
  hidden the distinction (the mask erases the decimal form); the raw record
  exposed it.
- **F-139c2 THE AREA-SPARK STROKE-WIDTH**: our Sparkline area arm's explicit
  `strokeWidth={1}` vs the reference's absent attribute — the maiden per-path
  tuple census decoded ours `none|1|#8b5cf6|0.3;#8b5cf6|1|none|0.3` vs the ref
  `none|-|#8b5cf6|0.3;#8b5cf6|-|none|0.3`. The SVG default 1 = the former
  explicit value — zero rendered delta — the s131 zero-delta-retirement
  precedent.

The adjudicated noise (all documented): the text.content ×2 = the L-134c1
text-node-granularity genus (the s134 adjudication re-found identically) · the
ch1.gridlineCount @390 12-vs-11 = the s91 chart-noise genus — the STANDING
pre-fix residual PRESERVED post-fix exactly as reasoned (the s138 explicit types
do not touch the DOM-text-measurement-driven tick elision).

**THE MAIDEN LENSES otherwise CLEAN**: the gridline geometry byte-equal at 1440
on BOTH charts (ch0 H@5,70,135,200,265 + V@65,108,279,365,450,493 · ch1
H@5,64,123,182,241 + V@65,136,208,279,350,422,493 — **the s138 fix's blast
radius on its second consumer verified byte-exact**) · the zero-state y-tick
quirk "0,1,2,3,4" byte-equal (the s138-comparable face) · 5/6 sparkline
interiors byte-equal · the tooltip STRUCTURE byte-equal (the masked forms + the
chrome) · the @390 containment clean · the legend chips + the stock-axes
contracts byte-equal.

**PASS 2 (populated, ours-only) — every seeded contract holds**: the KPI row
24/$337.0k/$126.0k/$0k/29.2%/82 · the pipeline bars 145,84,73,99,258 + the
legend chips · **the populated ch0 tooltip "Prospecting → value : $190,000"**
(the raw-dataKey name face — the maiden decode, byte-consistent with the
s27-era bundle read) · the API cross-check (totalLeads 24 + conversionRate 29.2
matching the rendered row — the L-138a4 chain) · the filter round-trip
restored byte-identical · the search round-trip (the bars unmoved — the
documented genus: the reference's "Stage: Source" input is DEAD, ours filters
the Recent Deals rows only).

## The remediation (the two-fix session)

**D-139a0 THE TARGET-FORM FIX** (F-139c1): the Math.round retired —
`target: 55_000 + Math.random() * 10_000` (the reference's own formula) + the
provenance comment gains the s139 decode note. **D-139a1 THE SPARK STROKE-WIDTH
RETIREMENT** (F-139c2): the explicit `strokeWidth={1}` removed from the area arm
(+ the s139 comment). **D-139a2 THE PINS** (+2 its, dashboard-family-parity.test.ts:
the target-formula pin [the float form + NOT-Math.round + the comment note] + the
spark-area-arm pin [no strokeWidth in the area block + the line arm's
strokeWidth={2} stays pinned]) — **the TDD ladder**: RED (exactly 2 failed | 28
passed at the pre-fix source) → the fixes → GREEN (30/30) → **the stash-proof**
(the two fixes reverted alone → exactly 2 RED alone; restored → 30/30).

**D-139a3 THE DOCS REALIGNMENT**: the lockstep RED 12 sites → the atomic
realignment script → GREEN 21/21 (+ the two CLAUDE carriers re-anchored at
2053 with the retired 2051 form joining the negatives ladder). **SUITES 113 ·
UNIT 2051 → 2053 (+2) · E2E 138 · badge 2189 → 2191**; SKILL v1.136.0 + the
session-139 layer prepended to the project_state head (the layer-axis s139/s138
pair re-anchored) + the AGENTS Session-139 section + the PAD Session-139 row +
this record + the plan's execution record + the repo worklog.

**D-139a4 THE POST-FIX WALK RE-RUN** (the rebuilt standalone): 269 axes, **5
raw diffs — all the adjudicated documented genera**; our tooltip now renders
the float form ("Target : $57,770.366") and the spark tuples are byte-identical
(`none|-|#8b5cf6|0.3;#8b5cf6|-|none|0.3`).

**D-139a5 THE CAPTURES** 284-287 (four unique md5s 4f5f8dd1/b62939add/c9d84deef/
e2c0c090) + **THE VLM BATTERY 4/4 CLEAN**: 284 the KPI row read verbatim
(24/$337.0k/$126.0k/$0k/29.2%/82) + both grids visible + the 5 bars + the stage
labels · 285 **the FIXED tooltip read "Target : $55,164.662"** (the float form
visually confirmed) + the white bg/light-gray border chrome · 286 the pipeline
tooltip read "Won → value : $337,000" (the raw-dataKey face confirmed) · 287
the stacked single-column KPI + the hamburger nav + the full containment, zero
overflow.

## The walk-harness lessons (L-139c1..c4)

- **L-139c1 the card-class locator trap**: the dashboard's Card is `rounded-xl`,
  not `rounded-lg` — class-selector locators silently no-op'd the first run's
  tooltip/round-trip/containment sections. The title-text CLIMB (border+shadow)
  is the class-agnostic finder.
- **L-139c2 the inactive-tooltip-wrapper trap**: every recharts chart keeps its
  tooltip wrapper mounted showing the INITIAL data point's state — a bare
  first-wrapper query reads the wrong chart's stale tooltip. Scope the read to
  the hovered chart's card + the visibility filter.
- **L-139c3 the random-mask discipline**: number-masking tooltip texts hides
  the value-form distinction (integer vs decimal) the raw record exposes —
  record BOTH; the mask proves the structure, the raw carries the form.
- **L-139c4 the trailing-zero trim**: toLocaleString's 3-fraction-digit default
  trims trailing zeros — a 2-decimal display can mask a raw float;
  characterize random faces across N samples before concluding quantization.

**Next:** the fresh-eyes program is exhausted (the toast ours-only surfaces the
residual seam, no reference contract); the rotation returns to the cycle — the
accounts fourth-cycle the stalest two-app candidate (s133+6), or the secondary
surfaces (calendar s124+15 / activities s125+14 — the staler re-checks). Name
one in the next intake.
