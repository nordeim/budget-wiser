# The session-140 plan — the leads chart-interiors post-fix walk (the pin-only session)

## The intake

The workspace re-cloned at `f59e3ce` (the s139 ship `7ce4de6`/`ce5122d` + the
session_297 transcript commit); the environment re-stood (bun install 533
pkgs, `.env` with DATABASE_URL="file:../db/custom.db" + AUTH_SECRET,
`env -u` db:push/db:seed, census MATCH 15/24/10/23/12 + 4 users, the
Playwright chromium-headless-shell 1243 present in the cache). The four
intake docs read (session_296 + the s139 plan + the repo worklog +
session_297) — the s139 ship verified end-to-end.

The rotation decision (the session_296 close named the accounts fourth
cycle / the calendar / the activities re-checks; the orchestrator
superseded by the blast-radius doctrine, the s139 precedent): **charts.tsx
moved at s138 (the L-138c1 grid fix); consumer #1 (reports) re-walked
byte-exact at s138; consumer #2 (the dashboard) re-walked at s139 — and
the walk STILL found two real construction deviations via the maiden
lenses; CONSUMER #3 = THE LEADS PAGE (the SingleBarChart "Pipeline Value
by Stage" + the GroupedBarsChart "Won vs Lost Over Time" — both
GRID-BEARING fixed-family sites — plus the ConversionFunnel) was NEVER
re-walked post-fix.** The maiden lenses (the tooltip lens, the H/V
gridline split with coordinates) never ran on the leads charts; the last
chart census was s118 (shallow: titles/fonts/widths/SVG heights only, 22
sessions ago, PRE-fix); the s136 walk was the TABLE family only (and
pre-dated the fix anyway). The named alternatives are strictly
lower-yield: the accounts fourth cycle (+7, zero functional carriers —
page-parts' s139 move is the Sparkline arm, which accounts does not
render); the calendar (+16, zero recharts charts — no grid/tooltip lens
yield at all); the activities (+15, one chart site with `grid={false}` —
no grid face). The 140-a audit CONFIRMED the rotation with the per-file
freeze map (leads-page.tsx itself frozen since s113 — 26 sessions).

## The baseline gate

lint 0/0 · tsc 0 · **113/2053 unit** · build · **e2e 138/138 (3.4m)** —
the exact s139-ship match. probe:ref **#112** — the reference STABLE at
the 81-session standing fingerprint (index-DZ-xbrIm.js · a70a637f… ·
1,631,071 bytes · demo data ZERO · the TRUE-390 defect STANDS). The four
drift gates CLEAN ×4 (margin 0.5pct). scandihaven `d4789c3` on-pattern.
census MATCH.

## The audits

**140-a 9/9 Verified** (one footnote: the "two CLAUDE carriers" wording —
login-family's carrier is the e2e axis, zero functional impact) + THE
COMPLETE LEADS CHART-INTERIORS PRE-WALK INVENTORY: the freeze map
(leads-page s113 · **charts.tsx s138 = THE ONLY functional carrier since
s136** — page-parts' s139 move is the Sparkline arm, inert on leads ·
select/page-layout s133 · entity-dialogs s127 · toast s131 · button
s130) · the chart anatomy (the pipeline SingleBarChart [pipelineByStage
= the 5-STATUS vocabulary with VALUE sums, NO name prop → the
raw-dataKey "value" tooltip face, NO radius, tickFontSize 12, height
250] + the GroupedBarsChart wonVsLost [the created-date month buckets in
the table's insertion order, EMPTY at zero, the series Won #10b981/Lost
#ef4444 with names, the family's stock no-formatter Tooltip → the
RAW-NUMBER tooltip face] + the ConversionFunnel [LEADS_FUNNEL 4 stages
with STATUS-CUMULATIVE counts — non-monotonic by construction, the
FunnelChart + the stock Tooltip + the LabelList right #000, NO
CartesianGrid — L-138c1-immune] + the 6 IconStatCards [Total/Open/Won/
Dropped/Conversion/Avg-Cycle — EVERYTHING deriving from the FILTERED
set]) · the maiden lens census (the tooltip lens NEVER run on the leads
charts — three tooltip-bearing charts; the H/V grid split NEVER run; the
per-path/interior geometry last censused s118 shallow) · the pin
coverage (the source call sites pinned at charts-internals :244-249/
:316-339 + the leads-charts/leads-family batteries; the LIVE interiors
— grids/tooltips/geometry — entirely unpinned) · the named risks
L-140a1..a9 with the TOP = the post-fix gridline adjudication.
**140-b 11/11 PASS** (the ~98th standing battery, zero findings — the
drawer battery 11 PLAIN, the Tailwind v4 census clean [zero oklab
classes, zero config files, 32 rounded-full class sites, the literal-hex
@theme], the SEO census 9/11/13, the space-y census 107 exact, the
db-path contract 20/20 + census MATCH, the rate limits 10/10/5/20/20,
the auth stack standing, the envelope + exactly 8 raw-fetch sites, the
gate chain verbatim, the focused ladder 294/294, the strays clean).

## The walk (140-c) — walk31

**walk31** (the phased idiom: one app×viewport per invocation; the
censuses persisted to /tmp JSON; the reference's storageState persisted
+ reused, ONE reference login; PORT 3141; the walk dbs at the repo db/
folder — walk31-zero.db [the seeded copy zeroed via the absolute-override
zero-data] for PASS 1 / walk31-seed.db [the pristine seeded copy] for
PASS 2; the standalone server booted with the absolute DATABASE_URL
override per the db-path seam's intentional-override contract; both apps
at 1440×900 + 390×844; every ours phase logging in fresh with the
L-138c3 hydration settle). The census: the 6 statcards (the labels/
values/fonts/subValues/chip rects/bg/icon colors) · THE CHART-INTERIORS
DEEP CENSUS (the bars with per-rect fills + the ticks/texts + THE GRID
H/V SPLIT with coordinates + the dash/stroke chrome + the legend + the
axis lines · the funnel trapezoids/labels) · **THE MAIDEN TOOLTIP LENS**
on all three charts (the card-scoped wrapper read + the masked/raw dual
records) · the @390 containment · the PASS 2 API cross-check +
the filter round-trip + the search round-trip + the export download.

**THE VERDICT — PASS 1 (two-app, zero-data): 245 axes, ZERO diffs** —
COMPLETE byte-equal parity on every compared axis at BOTH viewports:

- THE GRIDS (L-140a1, the TOP risk — the s38 fix's consumer #3): the
  H/V geometry byte-equal on both grid-bearing charts at 1440 AND 390
  (ch0 H@5,58,110,163,215 + V@65,136,231,278,302 — the 10-line classic
  grid; ch1 the empty-state 2-H grid) — **the s38 explicit-types fix's
  third consumer verified byte-exact, NO residual** (no 12-vs-11-style
  V-elision drift on the leads charts).
- The zero-state y-tick quirk "0,1,2,3,4" byte-equal (the
  s134/s139-comparable face).
- The statcards byte-equal (the s118 contracts hold: the 6 labels, the
  zero values, the "$0" full-currency subValues, the chip tones).
- The x-tick elision byte-equal ("Contacted" elides at the 331px card —
  4 of 5 ticks render at BOTH viewports on both apps).
- The funnel zero-face byte-equal: **BOTH apps render 4 degenerate
  0x0 trapezoids + 0 labels** — the AGENTS "the reference's leads funnel
  renders NOTHING at zero" note re-characterized (no VISIBLE funnel on
  either app; the DOM carries the 4 zero-value entries on both —
  byte-equal, the genus symmetric after all).
- The wonlost empty face byte-equal (no bars, no month ticks, the 2-item
  stock Legend rendering even at zero — the F-98c2 contract).
- The tooltip untriggerable faces identical (zero-bars / no-surface /
  zero-bars — the height-based detection, mechanism-independent).
- The @390 containment clean (docScrollW 390 both apps).

**PASS 2 (populated, ours-only) — every seeded contract holds**: the
statcards 24/9/7($687,000)/4($226,000)/29.2%/82 days — the API
cross-check exact on every axis (total 24 · open 9 · won 7 · lost 4 ·
conversion 29.2 · wonSum $687,000 · lostSum $226,000 · pipelineSums
319000,60000,241000,687000,226000 · funnelCounts 4,12,10,7 — the
STATUS-CUMULATIVE construction) · the pipeline bars 84,16,63,180,59 at
the 0..800000 domain (the heights proportional to the API sums) · the
wonlost 10 bars (5 months × 2 series, the reverse-chrono month order —
the M-77c2 construction) · **THE THREE MAIDEN TOOLTIP FACES DECODED**:
ch0 "New value : $319,000" (the raw-dataKey "value" + the
dollarFormatter — the same genus as the dashboard's pipeline) · ch1
"Sep 2026 / Won : 2 / Lost : 0" (the RAW-NUMBER face — the family's
stock no-formatter Tooltip, never decoded on ANY family before) · ch2
"0 : 4" (the funnel's stock payload face) — the chrome byte-consistent
(white bg, #ccc border, 16px/400, radius 0) · the filter round-trip
(the status filter → the bars 209,0,0,0,0 + rowCount 4 + the trigger
"Filters (Active)" → Clear → restored byte-identical 84,16,63,180,59 +
rowCount 24 + "Filters") · the search round-trip ("No leads found" +
rowCount 1 → cleared → restored byte-identical) · the export download
fired (leads_2026-10-17.csv) · the day-counter 82 days (the F-118a1
shape genus — the day form, never a literal).

**THE WALK VERDICT: ZERO REAL PARITY DEFECTS — a clean walk** (the
s134/s136 zero-fix pattern). The s38 grid-fix's consumer #3 verified
byte-exact; the maiden lenses found the three tooltip faces exactly as
the construction predicts (no deviation); every seeded contract holds.

**The harness repair mid-run (L-140c1)**: the first PASS 2 run silently
hit the STALE ZERO SERVER — `kill $SPID` killed the nohup wrapper, not
the bun child (EADDRINUSE on the re-boot; the pop phases censused the
zero face). Re-killed the child pid + re-ran. **L-140c1 the dead raw
mouse.move**: the raw `page.mouse.move(t.x, t.y)` does NOT activate
recharts' tooltip in this chromium-headless-shell 1243 build (diag'd
A-vs-B on the same page: the raw move leaves the wrapper
visibility:hidden at the INITIAL payload; the LOCATOR hover activates
it) — the tooltipCensus patched to the `[data-walk31-tip]`-scoped
locator hover (which also keeps the hover + the read on the same chart —
the L-139c2 discipline refined). **L-140c2 the wrapper-kill trap**: a
nohup'd `bun server.js &` dies with the bash call — the server + its
phases must ride ONE invocation (the L-127c5 doctrine re-learned the
hard way); `pkill -f server.js` (not `kill $SPID`) is the reliable
cleanup, else the child survives EADDRINUSE-blocked re-boots.

## The remediation (the pin-only session)

- **D-140a0 THE FREEZE PINS** (+3 its, tests/leads-family-parity.test.ts
  + +1 it, tests/charts-internals.test.ts): the pipeline call site's
  tooltip construction (the formatter + tickFontSize 12 + NO name prop —
  the raw-dataKey face + NO radius — the plain-rect construction) · the
  wonlost call site's series construction (the Won/Lost names + the
  #10b981/#ef4444 fills + xKey month + tickFontSize 12 + height 250 —
  the raw-number tooltip face's construction) · the funnel call site
  (`<ConversionFunnel data={funnel} height={250}` — the stock face) ·
  the ConversionFunnel FAMILY stock construction (charts-internals: the
  FunnelChart + the stock no-formatter Tooltip + the LabelList right
  fill #000 dataKey label + NO CartesianGrid — the L-138c1-immune
  family, never pinned at the family level). GREEN-at-birth (the
  freeze-pin pattern — the pins document the walk-verified
  constructions; any future drift REDs exactly one assertion).
- **D-140a1 THE DOCS REALIGNMENT**: the lockstep RED → GREEN; SUITES
  113 UNCHANGED · UNIT 2053 → 2057 (+4) · E2E 138 UNCHANGED · badge
  2191 → 2195; SKILL v1.137.0 + the session-140 layer + the AGENTS
  Session-140 section + the PAD rows + session_298.md + this plan's
  execution record + the repo worklog.
- **D-140a2 THE CAPTURES** (288-291) + THE VLM BATTERY: the seeded
  leads @1440 (the statcards + the three charts) · the pipeline tooltip
  face (the raw-dataKey + $ formatter) · the funnel populated face ·
  the @390 phone face (the stacked charts + the hamburger nav).
- **D-140a3 THE FINAL GATE**: lint · tsc · 113/2057 · build · 138/138 ·
  the closing drift sweep ×4 · census MATCH.

## The ship

The two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim, the dry-run then the real push; remote-verified; the
keys shredded).

## The execution record (appended post-execution)

The rotation ran exactly as planned — **a clean walk, the pin-only session**.

**THE WALK (walk31, 1027 lines, the phased idiom)**: the walk dbs prepared
at the repo db/ folder (walk31-zero.db = the seeded copy zeroed via the
absolute-override zero-data; walk31-seed.db = the pristine seeded copy);
the standalone server booted per pass with the absolute DATABASE_URL
override (the db-path seam's intentional-override contract — the zero
pass served the zero face correctly, proving the override).

**Two harness incidents mid-run, both repaired + both now lessons**:
- The first PASS 2 silently censused the STALE ZERO SERVER — `kill $SPID`
  killed the nohup wrapper, not the bun child; the re-boot EADDRINUSE'd
  and the pop phases talked to the still-running zero server (all-zero
  records the tell). Re-killed the child + re-ran. → **L-140c2 the
  wrapper-kill trap** (pkill -f server.js, never kill $SPID; the server +
  its phases ride ONE bash invocation — the L-127c5 doctrine re-learned).
- The first tooltip lens at populated read `absent` on all three charts —
  the raw `page.mouse.move` does NOT activate recharts' tooltip in this
  chromium-headless-shell 1243 build (diag'd A-vs-B on the same page: the
  raw move leaves the wrapper visibility:hidden at the INITIAL payload;
  the LOCATOR hover activates it). The tooltipCensus patched to the
  `[data-walk31-tip]`-scoped locator hover. → **L-140c1 the dead raw
  mouse.move** (also the capture script's mechanism).

**THE VERDICT**: PASS 1 two-app zero-data — **245 axes, ZERO diffs** (the
grids H/V byte-equal on both grid-bearing charts at both viewports — the
s38 fix's consumer #3 verified, NO residual; the statcards byte-equal;
the Contacted-elision byte-equal; the funnel zero-face byte-equal — both
apps render 4 degenerate 0x0 trapezoids, the "renders NOTHING" note
re-characterized; the wonlost empty face + the 2-item stock Legend
byte-equal; the tooltips untriggerable identically; the @390 containment
clean). PASS 2 populated ours-only — every seeded contract holds (the
statcards + the API cross-check exact on every axis; the pipeline bars
proportional to the API sums; the wonlost 10 bars; **the three maiden
tooltip faces decoded**: ch0 "New value : $319,000" + ch1 "Sep 2026 /
Won : 2 / Lost : 0" + ch2 "0 : 4"; the filter + search round-trips
restored byte-identical; the export download fired; the day-counter 82
days).

**THE PINS (D-140a0)**: +3 its in leads-family-parity (45 total — the
pipeline call-site tooltip-construction pin [the dollarFormatter +
tickFontSize 12 + NO name prop + NO radius]; the wonlost series-
construction pin [the Won/Lost names + the paired fills + xKey month];
the funnel call-site pin [the stock ConversionFunnel + the
STATUS-CUMULATIVE memo]) + +1 it in charts-internals (30 total — the
ConversionFunnel FAMILY stock-construction pin [the FunnelChart + the
bare no-formatter Tooltip + the LabelList right fill #000 + NO
CartesianGrid]). **The mutation-proof**: the name-prop drift on the
pipeline call + the formatter drift on the funnel family Tooltip →
exactly 2 RED alone, zero collateral; reverted → 75/75 GREEN.

**THE DOCS REALIGNMENT (D-140a1)**: the atomic script (24 patches + the
AGENTS section + the PAD row + the SKILL H1 re-anchor — one precision
repair mid-flight: the F-106a1 lockstep caught the H1's v1.136.0 before
the final GREEN). SUITES 113 UNCHANGED · UNIT 2053 → 2057 (+4) · E2E 138
UNCHANGED · badge 2191 → 2195; SKILL v1.137.0 + the session-140 layer +
the AGENTS Session-140 section + the PAD Session-140 row + the two
CLAUDE carriers re-anchored (the four sites at 2057 + the retired 2053
joining the negatives ladder). The lockstep GREEN 40/40 (docs-counts 21 +
dialog-geometry 19); the full suite **113/2057**.

**THE CAPTURES (D-140a2)** 288-291 (four unique md5s 77bcacc3/08f54333/
25930bf2/4c67e8eb): 288 the seeded leads @1440 (the statcards + the
table + the blue sidebar — the app shell scrolls internally so the
charts ride their own captures) · 289 the pipeline tooltip (the
raw-dataKey face) · 290 the funnel + its stock tooltip · 291 the @390
phone face. **THE VLM BATTERY 4/4 CLEAN**: the statcards read verbatim
(24/9/7 $687,000/4 $226,000/29.2%/82 days) + the blue sidebar; the
tooltip read "New / value : $319,000" + the dashed gridlines + the 4
x-labels (Contacted elided); the funnel read "0 : 4" + the 4 sections
blue/purple/teal/green + the labels + the decreasing widths (the colors
render despite the empty fill attributes — the layer-carried fills); the
phone face hamburger + the stacked single-column statcards + zero
horizontal overflow.

**THE FINAL GATE (D-140a3)**: lint 0/0 · tsc 0 · **113/2057** · build ·
**e2e 138/138 (3.4m)** · the closing drift sweep CLEAN ×4 · census MATCH
· tree carrying exactly the s140 ship set (tests 2 + the docs realignment
+ the plan + the captures + session_298.md + the worklog).

**The ship**: the two-commit pattern (the feat + the session log) pushed
to git@github.com:nordeim/neo-crm.git main via the SSH wrapper.
