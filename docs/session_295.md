The workspace exists with neo-crm on `main`. Let me refresh with `git pull` and check for the referenced session files.
`git pull` brought in the new intake `docs/session_293.md`. Now let me read the four key review documents in order.
Session-137 is confirmed **shipped and pushed** (`4c23b0b`), with `session_293.md` as the newest intake (`f01f404` = current HEAD). Now let me read the s137 plan and worklog tail to determine the s138 direction.
The s137 ship is fully confirmed. Now let me verify the environment and core docs state, then check the workspace worklog.
Environment verified. Let me check the workspace worklog tail and run the DB census, then start Stage 2 baseline gates.
Full context confirmed. s137 shipped at `4c23b0b`, HEAD now `f01f404` (session_293 intake). The next rotation is unnamed in the intake — per my judgment, **s138 = the reports chart-interiors fresh-eyes walk** (the remaining substantive two-app fresh-eyes seam, per session_290's close naming reports chart interiors with seeded data; toast surfaces are ours-only, accounts fourth-cycle is the fallback).

Let me set the session plan and start Stage 2 baseline gates.
Census MATCH (15/24/10/23/12 + 4 users). Running the Stage 2 baseline gates — lint and typecheck first.
Lint 0/0 · tsc 0 · **112/2041 exact match**. Now build + e2e.
**Stage 2 baseline gate GREEN — exact match to the s137 ship**: lint 0/0 · tsc 0 · **112/2041** · build ✓ · **e2e 137/137 (3.4m)**.

Now Stage 3: dispatching the two audit subagents in parallel (the house pattern).
Both audits GREEN — **138-a: 9/9 Verified** with the complete reports chart-interiors inventory (TOP risk L-138a1: the seeded chart interiors never walked with data; L-138a2: tooltips never censused on any chart; the s133 retirement's reports arm is the only moved-under carrier), and **138-b: 10/10 PASS** (zero findings).

Before designing the walk, I need to understand the sweep/probe mechanics — what data state each app runs at. Let me read the scripts.
Now the mechanics are clear: **the sweep drives our app to the ZERO-DATA state matching the reference's empty workspace** (picklists kept → the settings genus). The reference has zero entity data — so walk29 = PASS 1 two-app at the zero-data chart interiors + PASS 2 populated ours-only (the seeded SVG census + the maiden tooltip lens).

Stage 4 now: probe:ref #110 + the four drift gates.
probe:ref #110 — the reference **STABLE at the 81-session standing fingerprint** (demo data ZERO, TRUE-390 defect STANDS). Now the four drift gates.
All four drift gates CLEAN ×4, census MATCH. Now the scandihaven on-pattern check.
scandihaven isn't locally cloned — checking its remote state directly (the standing method).
scandihaven at `d4789c3` — **on-pattern, unchanged**. Stage 4 complete: probe:ref #110 stable, drift gates CLEAN ×4, census MATCH.

Now Stage 5 — designing walk29. Let me check the workspace `walks/` directory for prior walk harnesses to reuse.
`walk25-dashboard-charts-recheck.ts` is the closest relative to walk29 (dashboard chart interiors = the same recharts census idiom). Let me study it plus its runner.
I have the complete walk harness idiom. Now let me study the reports page source for precise census locators.
Seed uses relative dates — the quarter KPIs are wall-clock-stable. Now writing walk29. First a quick resolution check for where the script must live.
Now I have the complete anatomy. Let me verify the zero-data tool's scope, then write walk29.
Now writing walk29 — the reports chart-interiors fresh-eyes walk.
Let me verify the walk script is syntactically valid.
tsconfig/eslint include the repo root (the standing convention — walk scripts removed pre-ship). Smoke-testing the script with the no-browser compare phase:
The script runs clean. Now the orchestration runner:
All phases ran — **PASS 1: 849 axes, only 2 diffs**. Let me examine them.
Outstanding results — **PASS 1: 849 axes, 2 diffs** (one unique axis: `pipeline.ch3.gridlineCount` 4 vs 9), and PASS 2 contracts largely holding (KPIs exact, the API chain verified, the round-trip lands, the bar/line tooltips byte-match their formatters). Two open questions need adjudication: the Aging gridline diff and the pie labels/tooltip. Let me dig.
The Aging diff is isolated to grid lines only — axes/ticks/texts byte-equal (7 svg texts both). I need a decisive probe on the grid-line geometry (ours vs ref) plus the pie-label question. Let me check the pie axes first.
All four pies render their sectors (5/4/6/3 ✓) but **zero svg texts — the pie labels may not render**. This needs a decisive probe. First, what do the existing pins/tests say about pie labels?
The pins are source-regex level — the live pie-label rendering was never verified. Time for the decisive probe: the pie DOM structure + the Aging grid-line geometry on both apps.
The server was reaped (the backgrounding subshell issue — the L-127c5 doctrine: server + phases in ONE call). Redoing properly:
Two decisive findings: **P1 — our pie labels don't render at all** (5 bare sectors, zero text nodes), and **P2 — our aging grid renders only a 4-line frame** (2H + 2V at the plot edges) while ticks render fully. Let me get the complete gridline picture across all charts on both apps:
All charts match at zero EXCEPT the Aging Pipeline — and the key insight: pipeline-by-stage (EMPTY data at zero) = 4 on both, while aging (4 zero-value ROWS) diverges: the reference renders the per-tick grid, ours renders frame-only. Let me decompose our grid geometry on the populated bar charts and read the recharts grid internals:
Our grids decompose as: line charts per-tick (5H+2V), vertical bar charts frame-only (2H+2V), horizontal bar charts full (10H+5V) — while the reference renders per-tick (9) on the aging chart with rows present. This smells like a recharts rendering difference. Let me read the grid internals:
The grid's coordinate generator returns per-tick coords + edges, but our vertical bar charts only get edges — the ticks passed to the grid are empty. The hooks `useArbitraryXAxis`/`useYAxisWithFiniteDomainOrRandom` look suspicious. Let me read them:
The mechanism is deep in recharts internals — but the decisive question is what geometry the reference actually renders. Let me probe the reference's aging grid:
The reference's grid = **visible(elided) tick coords + plot edges** (the classic pre-2.15 behavior); ours renders edges-only on vertical bar charts. Before choosing a fix, let me check how recharts computes the tick elision — the generator's feasibility depends on it:
The elision is DOM-text-measurement based (replicable via the same `getTicks` call — the issue is the tick delivery). Before designing the fix, one more empirical gap: our zero-state aging y-tick texts (never compared — the census only recorded texts when populated). Let me probe ours at zero:
Our zero-state texts = "0,1,2,3,4" — **byte-equal to the reference**. The divergence is purely the grid lines: a **real parity defect** (the recharts 2.15.4 tick-delivery genus). Now the fix experiment — explicit axis typing on the dev server with hot reload:
First dev-compile was slow — retrying the probe:
Dev server reproduces the frame-only grid. **Experiment E1a** — explicit `type="category"` on the XAxis:
E1 failed — still frame-only. **E2: instrument the generator** — dump exactly what the context delivers to the grid:
Browser console needs capture in the probe itself — patching probe29 to listen:
The login limiter tripped (10/15min — the N-69a lesson). Restarting the dev server for fresh buckets:
**ROOT CAUSE DECODED — L-138c1**: the context's axis objects carry `tick: undefined` (our charts pass `tick={undefined}` when no tickFontSize) — this nullifies `defaultProps.tick=true` in the generator's spread, so `getTicks` bails on `!tick` → the grid falls back to edges-only. The funnel escapes (no tick prop + explicit types). E1 failed only because the tick-prop confound masked it. Applying both fixes to SingleBarChart:
**BYTE-EXACT MATCH!** Our aging grid now renders 9 lines at the exact reference coordinates. The fix works. Now let me check the other chart families in charts.tsx and the pie label question:
The fix works. Now applying it to GroupedBars + TrendLine, then investigating the pie labels in the recharts source:
The labels gate on animation AND the label item path matters. Reading `renderLabelItem`:
A string-returning label renders properly via `<Text class="recharts-pie-label-text">` — so the animation gate is the suspect. Testing with a long settle:
The dev server runs the zeroed db — pies have no sectors. Re-seeding the walk db and re-probing:
Likely the login limiter again. Restarting the dev server (fresh buckets) and retrying:
**The pie labels DO render** — "referral: 5, call: 4, email: 3, website: 3, partner: 3" — exactly the `${source}: ${value}` contract. The earlier zero was the **animation gate** (labels render only after the ~2s recharts animation — the census settled too early). So:

- **L-138c1** (real defect, FIXED): the grid tick-delivery genus — byte-exact match now
- **L-138c2** (harness lesson): the pie-label animation gate — census settles must exceed the animation

Let me check the remaining chart families (dashboard's RevenueLineChart + ConversionFunnel) for the same tick-prop genus:
The dashboard's `RevenueLineChart` passes `tickFontSize={12}` (tick defined → grid works) but carries the same latent genus — applying the consistent defensive fix, then patching walk29's settle for the pie animation gate:
Now the remediation plan. First, check what's already pinned to avoid duplication:
Writing the s138 pin file — the freeze pins for the reports chart-interiors family:
10/10 GREEN. Now the **stash-proof** — the TDD RED verification:
**Stash-proof PERFECT — exactly 5 RED** at the pre-fix source, 5 GREEN (the untouched families + freeze pins). Now let me check the e2e spec for a live grid pin (the recharts-upgrade guard):
The e2e spec structure is clear. Let me measure the live grid + pie-label numbers at 390 on the fixed dev server (seeded) for the e2e pin:
400 = validation (not 429) — a hydration race on the early fill. Retrying with a settle:
Both measurements land: **aging grid = 9 lines at 390** and **the pie labels render at 390, contained**. Let me read the spec's tail and append the live pin:
The e2e pin is in. Now the full re-verification: kill the dev server, rebuild, re-run the walk:
**PASS 1: 849 axes, 0 diffs — byte-equal on every axis.** Let me verify the PASS 2 record — the pie labels and the populated grids:
The PASS 2 record is complete — all four pie label contracts live-verified in the walk, the grids at their classic counts (aging 9, WonLost 9, Pipeline 11, funnel 15). Now the full gate — unit first:
The docs-counts lockstep is RED at the stale docs — the expected TDD state. Let me read the lockstep test to enumerate the realignment sites:
Updating the lockstep constants first, then the RED list will enumerate every realignment site:
The full RED list — 17 site groups. Let me read the assertion bodies to realign each precisely:
Let me read the e2e-sites assertions to get the exact forms, then write the realignment script:
Now writing the realignment script:
Now the test's layer-axis re-anchor and negatives ladder:
The recent sessions' convention: constants + layer-axis only. Running the lockstep to see remaining REDs:
Two REDs left — both SKILL content layers. Let me see the Appendix B failure detail, then write the session-138 layer:
Now prepending the session-138 layer to the SKILL project_state head:
Lockstep GREEN 21/21. Now the content layers — AGENTS Session-138 section first:
Now the PAD Session-138 inventory row:
Now the plan doc and session record:
Now the captures. Checking the naming convention:
The VLM CLI is available. Writing the captures script:
Captures done. Now the VLM battery on the four captures:
The 280 capture missed the aging chart (below the fold). Re-taking with the card scrolled into view:
VLM 1 VERIFIED — the fixed grid visually confirmed. Continuing the battery:
**VLM battery 4/4 CLEAN** (two below-the-fold framing notes — the DOM census is the authority, the s137 precedent). Now the cleanup + the final gate:
Tree clean of tooling. Running the full final gate:
The CLAUDE carrier pins need their sites re-derived. Reading the assertions:
The carrier test itself needs the lockstep carry-forward (its expectations are at 2041). Reading the e2e carrier it:
Two carrier carry-forwards needed. Applying both:
One more CLAUDE.md site — the unit gate-order line:
**113/2051 GREEN** + build ✓. Now the e2e suite (expecting 138 with the new guard):
The spec passes in isolation — the full-run failure needs diagnosis. Checking the trace:
Passes with related specs — the full-run failure was a timing flake (the fixed 2800ms sleep racing under load). Hardening the guard with `expect.poll` (the deterministic-wait doctrine):
Not a flake — the full-suite context differs (earlier specs mutate the db). Getting the actual error:
The aging poll passes but the pie renders zero sectors — an earlier spec (the reset-flow wipe in crm.spec?) leaves zero leads. Verifying:
The reset test wipes and never re-seeds — later spec files see zero data. The right fix: move the whole guard into crm.spec **before** the reset test (where seeded data is guaranteed), reverting reports-mobile.spec. This keeps the e2e count at 138:
The guard now lives before the wipe. Re-running the lockstep + full e2e:
Passes isolated. The full-run context breaks it — capturing the exact failure from the full run:
The suite's intentional residuals (an email lead left until the reset) shift the values — the exact-value pin can't hold late in the suite. The pin's purpose is the LIVE rendering contracts (grid + labels), not values (those live in the unit pins). Relaxing to format-level:
Re-running the full e2e:
**e2e 138/138 GREEN.** Now the closing drift sweep ×4 + census:
Full gate GREEN. One correction needed — the docs describe the e2e guard as a "reports-mobile" guard but it moved to crm.spec (before the wipe). Fixing the references:
All docs aligned. Now the repo worklog append:
Now the ship. Checking the s137 commit structure for the pattern:
The two-commit pattern confirmed. Committing — first the feat commit:
Both commits landed (`2a55fd2` feat + `b50233d` session log). Now the SSH wrapper push:
The shim is standing. Executing the push sequence — key, sanity check, dry-run:
The remote has moved ahead. Checking:
Remote main = `f01f404` (behind local `b50233d` — a clean fast-forward). The rejection hint is suspicious — let me see the full dry-run output:
The wrapper defaults to the wrong repo (`task-management`). It needs `--remote`:
Dry-run clean — `f01f404..b50233d` fast-forward. The real push:
**Ship complete** — remote main @ `b50233d` verified, key shredded, tree clean. Final worklog append:
**Session 138 shipped and pushed to `main` @ `b50233d`** ✅

The reports chart-interiors fresh-eyes walk (walk29) found the family's first real parity defect: **the L-138c1 recharts 2.15.4 grid tick-delivery genus** — our bar charts rendered 4-line frame grids where the reference renders classic visible-ticks+edges grids (an explicit `tick={undefined}` prop silently kills recharts' grid tick delivery). Fixed byte-exact, plus: the maiden tooltip lens, all four pie label texts live-verified, +10 stash-proven pins, an e2e recharts-upgrade sentinel, and full docs realignment. Count ladder: **113 suites / 2051 unit / 138 e2e / badge 2189**.

**Next intake options**: the toast ours-only surfaces (s131's residual arms), or the fourth cycle (accounts).
