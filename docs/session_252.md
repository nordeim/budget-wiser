Session 117 — the continuation log (the third restart; the accounts-list family walk)

The workspace survived this time — the worklog audit records intact (`M worklog.md`), HEAD at `a0bcebb` (the s116 ship + session_250/251). The environment fully standing: .env, db (custom + e2e), node_modules, chromium-1243, the .next/standalone build. No rebuild needed.

Resuming the live verification where the gateway died: the drift sweeps.

All four drift gates CLEAN (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each --fail-on-drift) + scandihaven re-cloned at `d4789c3` (on-pattern, matching the standing record). **LIVE VERIFICATION COMPLETE** — probe:ref 88th STABLE had already landed before the crash.

Now the rotation (117-c): the **accounts-list family** — the stalest un-re-walked family (the s86-era decode, 31 sessions). The seed contract verified independently off the db: 10 accounts · 8 active · 9 Key-tier by the >$1M rule + 1 A · $77.5M summed · 3 accounts with ≥1 past-due scheduled activity (Northwind/Cedar/Al Noor).

The walk scripts (throwaway — the house idiom: the server + walk inside a single Bash call, processes don't survive between tool calls here). Pass 1 — the zero-data face, two-app:

**@1440: COMPLETE byte-equal parity** — the KPI row (5 labels, zero values 0/0/0/$0.0M/0, 12px/400 labels, 30px/700 values, the 211px ×5 grid), the toolbar switcher, the 8 heads, the empty state ("No accounts found", 14px/400 rgb(107,114,128), centered, rowH 85), the rail 320px/hidden-390. The only @390 diff: the toolbar width 326 vs 440 — riding the table-card width diff. The focused re-probe settles the genus numbers: **OURS tableCard 358 / natural 945 / mainScrollW 390-contained vs REF 472 / 488-main-scrolls — the documented s95 genus, re-confirmed live 22 sessions on. Visually equivalent, do NOT restructure.**

Pass 2 — the populated face (ours-only, the reference's zero-data genus): the KPI values **10/8/9/$77.5M/3 exact** · the tier census **9 Key + 1 A** · the health census **Healthy 5 / At Risk 3 / Needs Attention 2** · the overdue **3× "1 Overdue" + 3 red-border rows** · the Key tint **oklab(0.987293 -0.00550365 0.0256573 / 0.3)** · the Cards view geometry. Three probe-design artifacts re-measured clean: the star census **9/9 filled** (my first selector caught all 29 svgs), the name-only predicate verified live (**"Logistics" → 1 row = Sahara Logistics BY NAME — Emirates Global Trading (industry Logistics) NOT matched; "Finance" → the empty state**), the Cards view **3 cols × 240px × 10 cards** (the switch needed settle time). **ZERO real parity defects.**

The freeze finds scoped (the s116 close's pattern): "Total Accounts" in ZERO test assertions (the five KPI labels never pinned as a set — the D-116a2 genus); the accounts e2e test thin (heading + one name + one search — the D-116a1 genus); plus the two 117-a audit findings: F-117a1 (the README Tested row's s116 clause never shipped) and F-117a2 (the "18d ago" literal + the Overdue=13 count are 10:00-local time-bombs — the audit's blast-radius extension).

The plan written (docs/plans/2026-10-13-session117-parity-remediation.md) + pre-validated (the trend/color census hazards: 4 real trend sites + the :239 comment (stripComments neutralizes it); 6 color sites incl. the :368 Avatar hex; the D-116a1 hazard lines :146/:186/:188; the :39 lead's dialog-default stage "new").

RED-1 staged — the four files: docs-counts (UNIT 1952 + the s117 comment + the layer-axis s117-head/s116-second), dialog-geometry (the CLAUDE lockstep 1952 + the 1951 negatives), account-contacts-parity (the D-117a2 five-KPI-label census pin, staging-pass 21/21), crm.spec (the D-117a1 battery INSIDE the :52 accounts test + the D-117a0 defuse: the bounded /^1[89]d ago$/ pattern, the 13-15 Overdue bounds, the card-level Meeting badge, the tab-4 comment correction).

**RED-1 CONFIRMED: 13 failed | 1939 passed (1952)** — inside the plan's 12-15 prediction, enumerated by name (12 docs-counts-family + the CLAUDE carrier). **Stash-proven: the native 1951/1951 GREEN → pop → RED restored.**

GREEN — the docs realignment: README (badge 2089, the three count sites, and the Tested row gains BOTH the s116 clause [closing F-117a1] and the s117 clause — one junction-bracket repair caught and fixed), AGENTS (the two count sites + the §Session-117 block), CLAUDE (the four sites), PAD (the five sites + the s117 inventory row before the Total row), SKILL **v1.114.0** (frontmatter + H1 + the project_state s117 layer prepended via python surgery + Appendix B 1952 + §16de appended). **GREEN: 109/1952 ALL PASSING.**

RED-2 both faces by name: Face A — the "Total Accounts " label edit fails exactly `the five KPI labels + the per-card trend/color pairs (the s117 census pin)` → git checkout restore → 21/21. Face B — the "Active Accounts" expectation 8→9 fails `accounts page lists seeded accounts and supports search` with `expected "9", received "8"` → restored.

The e2e phase: the accounts battery passed FIRST RUN; the reports test tripped a strict-mode violation — my card-level `getByText("Meeting")` resolved to THREE badges (three meeting-type rows — the badge census is genuinely row-independent). The `.first()` fix + the battery clean. **Full suite: 137/137 (3.4m).**

The captures 196-199 (the standing build on PORT 3141, the seeded scratch db): 196 the table rows @1440, 197 the KPI row @1440, 198 the phone @390, 199 the Cards view @1440 — four unique md5s. **The VLM battery 4/4 × 4**: 196 read 6 headers (the Status/⋮ columns ride the documented in-box scroll — the s95 genus; the e2e 8-head pin authoritative) + 8 stars (the targeted re-read settles 9 — the miscount genus; the e2e toHaveCount(9) authoritative); 197 CLEAN (the KPI census verbatim 10/8/9/$77.5M/3); 198 CLEAN (the single-column stack, no rail, contained); 199 CLEAN (the 3-col grid, 10 cards, all names verbatim).

The final gate: lint 0/0 · tsc 0 (after the five throwaway scripts deleted — one tripped a pid-typing error, the cleanup was due anyway) · **109/1952** · 137/137 · **src/ ZERO files changed** (the freeze session) · census MATCH · **the four drift sweeps CLEAN at close**.

The tree: src/ = ZERO files; the four test files; the five docs; the plan; the four captures; the worklog.

**Session 117 shipped end-to-end.** The rotation ledger's oldest name walked: the accounts-list family — the zero-data face two-app in complete byte-equal parity (the 390 overflow the documented s95 genus), the populated face ours-only healthy on every decoded contract. Zero parity defects — three freeze finds shipped via strict TDD (RED 13 → GREEN 109/1952 → RED-2 both faces), the F-117a2 time-bomb defused, F-117a1 closed, captures 196-199 VLM-verified 4/4×4, docs realigned to SKILL v1.114.0.

**Next:** the rotation ledger's next-stalest names — the s74/s85-era surfaces (reports charts re-walked at s116, but the dashboard-charts + leads-statcard families are 30+ sessions stale) — or whatever the next prompt directs.
