I'll start executing this comprehensive multi-phase task. Let me first check the workspace state and refresh the repository.
工作区已存在，位于 `/home/z/my-project/neo-crm` 的 `neo-crm` 仓库。让我先读取共享的工作日志，检查 `git` 状态，并刷新仓库。
The workspace shows Session 108 was completed and pushed at `e508db3`. The task now references `session_219.md`, the `session108` plan, and `session_220.md`. Let me refresh the repo and check the current state.
`git pull` brought in `520284f` which adds `docs/session_220.md`. Now let me set up the task plan and read the core documents.
The session docs are the key context. Let me read them plus the skills catalog first.
`session_219.md` and `session_220.md` are both Session 108 records — Session 108 is complete and pushed (`2f0798a` + `e508db3` + `520284f`). This run is **Session 109**. Now let me review the core docs per the task instructions.
Let me read the docs in smaller chunks to avoid output persistence issues.
CLAUDE.md fully absorbed. Now the s108 plan and skills catalog:
Now the skills catalog and the repo worklog tail:
The skills catalog structure is known (218 skills, 10 categories — same as prior sessions; key skills: agent-browser, clone-app-pat-pro, tdd, Tailwind v4 families). Now let me read the remaining core docs — AGENTS.md head, worklog tail, and SKILL.md state:
Full Session 108 context absorbed. The state: `main @ 520284f`, counts 108 files/1932 unit/136 e2e/badge 2068, SKILL v1.105.0, probe ordinals 79/29. This run is **Session 109** — the suggested rotation: (1) the fifth-surface seeded walk (activities @ 390 — the last un-walked phone surface), (2) dashboard KPI seam unification, (3) probe --expect mode.

Let me validate the current state against the codebase and check the environment:
Environment verified: 3-var contract standing, `db/` at root with both DBs, deps + chromium present, tree clean. The known stray `DATABASE_URL` hazard is confirmed — all ops will run under `env -u DATABASE_URL`. Now let me verify the current doc state (SKILL head, AGENTS Session-108 block, README):
SKILL v1.105.0 with the session-108 layer confirmed — the doc state matches the records. Now let me run the baseline gate stepwise (the s102-s107 lesson), starting with lint + typecheck + unit:
Lint 0/0 ✓ · tsc 0 ✓. Now the unit suite:
108 files / 1932 tests ALL PASSING ✓ — exactly the s108 ship state. Now the build + e2e:
One e2e failure at `crm.spec.ts:2477` (the settings debounce test — S72-P2). The s108 ship recorded 136/136, so let me check if this is flake or real:
Passes in isolation — timing-sensitive flake under full-suite load. Let me inspect the test's timing structure, then re-run the full suite:
The test uses fixed wall-clock waits (1200ms) — load-sensitive. Re-running the full e2e suite to confirm the baseline:
**BASELINE GATE GREEN** — lint 0/0 · tsc 0 · 108 files/1932 unit · build · 136/136 e2e fresh CI=1 (3.1m; one load-sensitive flake on the S72-P2 debounce test, passed on re-run + in isolation) — exactly the s108 ship state. Let me record the intake and dispatch both audits in parallel:
Now dispatching both audits in parallel — 109-a (the s108 ship delta) and 109-b (the standing layers), following the house pattern:
Both audits complete: **109-a GENUINE 9/9** (non-vacuousness reproduced EXACT: 27 failed | 55 passed; native 77/77) with **3 REAL findings** (F-109a1 PAD format.ts row 336→350, F-109a2 the SKILL header cluster of 7 stale line-counts, F-109a3 PAD login-reset 275→279); **109-b 9/9 PASS zero real findings** (all standing layers verified, SEO 46/46 LIVE, mobile-nav INTACT, probe ordinals 79/29th standing).

Now the live verification phase. Let me check the drift-probe tool:
**probe:ref STABLE — the 80th consecutive** (bundle md5 exact; demo zero; desktop 256px/8 STANDING; the mobile-nav defect STANDS at TRUE 390 — the 30th census). Now the four drift gates — let me check the sweep tool:
The four drift sweeps (desktop 1440 · phone 390 · tablet 768 · landscape 1024, each `--fail-on-drift`). Running the desktop sweep first:
Desktop sweep CLEAN (margin 0.5pct). Now the phone-width sweep:
All four drift gates CLEAN. Now the drawer battery at TRUE 390×844 — the mobile-nav verification the task brief emphasizes:
Battery "done" — all checks green (focus trap, dual scroll-lock, navigate-close → /Leads with full release, Escape, resize-past-md). Let me confirm the census + verify the live-verification record, then the scandihaven re-check:
Census MATCH + battery exit=0 (fully green). Live verification complete: **probe:ref STABLE 80th · four drift gates CLEAN · drawer battery 9/9 at TRUE 390**. Now the scandihaven pattern re-check:
Scandihaven on-pattern confirmed (Next.js 16.3 + React 19.2 + TS 5.9 + Tailwind v4 CSS-first + Radix + Zustand + Vitest/Playwright; same 10-category skill families — nothing new to adopt). 

Now the **rotation decision**. Per the s108-close: the fifth-surface seeded walk (activities @ 390 — the last un-walked phone surface) is the leading candidate. Let me ANALYZE the activities page construction first:
Let me see the remaining structure (header, KPI cards, tabs, quick-log):
Now I'll write the ANALYZE probe (the s108 pattern — throwaway, mapping the seeded activities surface at 390×844 before any guard is written). First, the boot idiom:
Now writing the ANALYZE probe — the s108 pattern (standing build on a spare port, boot → probe → kill in one invocation):
**MAJOR FIND** — the ANALYZE probe surfaced a real defect: `mainScrollW 488` at 390 (98px horizontal overflow), offenders clustered around a 249px `DIV.flex.items-center.gap-2` with a 174px button in the priority rows. Plus `chart.w=0` needs investigation. Let me see the PriorityRows construction and the reference's numbers:
The overflow culprit is in the priority row's right cluster. Let me see the rest:
**M-109c1 characterized**: the priority row's right cluster — `[time span] + ["Check as completed" text button (174px, at min-content)] + [20px iconSm edit button]` = 249px un-shrinkable min-content, overflowing the 326px panel to right=475 (mainScrollW 488 at 390). Same genus as M-108c1 (invisible to the zero-data sweeps + docScrollW-only assertions). Let me get the reference's numbers and check the chart-w=0 question:
The reference: same KPI ladder/tabs geometry, NO offenders (zero-data — the row construction unverifiable there, the documented-superset doctrine applies). But `chart.w=0` on BOTH apps needs resolution — measurement artifact or a real zero-width chart at 390? Let me probe with scroll-into-view + ancestor chain + screenshots:
The by-type chart question is **resolved — NOT a defect**: the rail (filters + by-type card) is `hidden lg:block` on BOTH apps (the reference's own desktop-only model — parity correct). My probe-1 "rail stacked below" assumption was wrong. The real at-390 surface: KPI ladder + tabs + priority rows + timeline (no rail). **M-109c1 stands as the find.** Let me verify the quick-log header row geometry at 390:
The overflow hunt found no header offenders, but the probe's `headerButtons: []` was a blind spot. Let me screenshot the actual surface at 390 to verify visually (top region + priority rows):
The quick-log row is **SAFE** (wraps 2×2, h=72, right ≤ 374 — no offender). The priority row confirmed: left cluster 182 + right cluster **249 un-shrinkable** (40px time + 174px text button + 20px icon + gaps) = 431 > 302 available → right=475. Let me empirically validate the fix design (inject the classes live, measure):
**THE FIX DESIGN IS VALIDATED LIVE**: BEFORE mainScrollW 488 → AFTER injection **mainScrollW 390** ✓ (rowRight 358, cluster relaxed to 274 with the button at natural 174 — the left text block's shrinkability absorbs the constraint; truncate engages only when needed). Both drift sweeps run zero-data so the fix is invisible to them — CLEAN, no re-baselining.

Now let me census the unit-pin placement for the row construction:
The pin home: `tests/activities-calendar-parity.test.ts` (already pins the row's right side at :166). Let me read its idiom:
The suite idiom is clear — the M-109c1 pin goes as +1 it in `activities-calendar-parity.test.ts`. Now the pre-plan validation: the live line counts for the F-109a1/a2/a3 census + the doc sites:
Live census complete. Now the remaining pre-plan validations — the SKILL stale sites, reports-mobile count, and the docs-counts structure:
All validations complete. Now writing the Session 109 remediation plan:
Plan written. Now validating it against the codebase — the e2e spec template (s108's calendar-mobile) + the H1 lockstep form:
Template absorbed. **VALIDATION CATCH**: I wrote badge **2074** in the plan — but the badge formula is UNIT+E2E = 1934+137 = **2071**. Fixing the plan before execution (this is why plans get validated):
Plan corrected and validated. Now recording the plan stage and executing **RED-1**. First, mapping every re-anchor site:
The structure is elegant — most pins use `UNIT`/`E2E` constants in template literals, so the constants re-anchor flips them all to RED until the docs are realigned. Let me read the H1 lockstep it before editing:
Now executing **RED-1** — the docs-counts re-anchors first (constants, ladder history, HEAD line, negatives, layer-axis, the NEW census it):
Now appending the NEW line-census it (the LIVE-CENSUS design) after the four-site pin:
docs-counts complete. Now the row pin in activities-calendar-parity + the remaining carriers:
Now the N-79b1 carrier + dialog-geometry lockstep + probe ordinals:
The existing live-tense assertion at :366 needs re-anchoring to 137:
Now the probe ordinals (79/29th → 80/30th):
Now the last RED-1 piece — the NEW e2e guard `tests/e2e/activities-mobile.spec.ts`:
All RED-1 files in place. Now the **RED-1 confirmation** — running the affected suites against the still-old src/docs:
RED-1: **22 failed | 107 passed (129)**. Let me get the full enumeration:
22 failures enumerated: 19 docs-counts (16 count-axis + H1 lockstep + Appendix B + the NEW census it) + the N-79b1 carrier + the dialog-geometry lockstep + the row pin. The **Appendix B pin needs re-anchoring** (I missed it — it asserts "6 spec files | 136"). Let me fix it:
Now the **stash-proof** — stash the seven test files → native state → all green → pop → RED re-confirmed:
Native state: **127/127 GREEN** ✓. Pop restored. Re-confirming the RED:
**RED-1 COMPLETE**: 22 failed | 107 passed, stash-proven (native 127/127 → pop → 22 RED). Now **GREEN** — first the src fix (S109-P1) with precise context targeting:
The src fix applied. Verifying the src-dependent suites:
234/234 green — the src fix works. Now the doc realignment (GREEN phase's doc half). README first:
README done. Now AGENTS.md:
AGENTS done. Now CLAUDE.md:
CLAUDE done. Now PAD:
Two more PAD sites: the footnote spec-family list + the s109 inventory row:
The footnote is fixed. Now the s109 inventory row (the earlier MultiEdit was atomic — both failed; applying the row now):
PAD complete (s109 row at :789, footnote fixed). Now the SKILL — the frontmatter/H1/project_state/§16cw/Appendix B/header cluster:
Now the SKILL edits — the project_state head prepend, frontmatter, H1, Appendix B:
The frontmatter edit created a duplicate version block — fixing:
Frontmatter + H1 + Appendix B done. Now the header cluster (7 sites) + §16cw:
SKILL fully realigned. Now the **GREEN confirmation** — the full unit suite:
**GREEN CONFIRMED: 108 files / 1934 tests ALL PASSING** (+2 net). Now **RED-2** — the induced-drift proof (perturb the src, expect the row pin to fail by name):
**RED-2 PROVEN** — 1 failed by name (the row pin). Restore and verify:
RED-2 complete (restored → 41/41 GREEN; src/ = exactly one file +21/−6). Now the e2e phase — build + the full e2e run with the new guard:
**137/137 e2e fresh CI=1 (3.1m)** — the new guard green inside the run. Now the guard's **wrong-bound perturbation proof**:
**Wrong-bound PROVEN** — "Expected: <= 389, Received: 390". Restore and verify:
Guard restored → GREEN. Now the **captures (S109-P6)** — 168 (390×844) + 169 (1440), the throwaway capture script pattern:
Both captures saved with live geometry verified (168: mainScrollW 390 pre-fix 488, clusters contained at 346; 169: the rail block + chart 270×5 bars). Now the **VLM battery** — loading the VLM skill:
VLM skill loaded. Running the battery on both captures (4 checks each: structure · content · layout-fit · render quality):
168: **4/4 PASS** — the rows show time + "Check as completed" + edit icon, visible truncation ellipses, fully contained in 390 (the M-109c1 fix's visual proof), clean render. Now 169 (desktop):
**VLM battery: 4/4 + 4/4, zero adjudications** — the VLM read the truncation ellipses + containment at 390 and the desktop rail + live chip counts (Call 5, Email 3, Meeting 3, WhatsApp 2) off the pixels. Now the docs phase — the plan's execution record:
Now the **FULL GATE** (one invocation, the one-gate discipline):
The gate hit another load-sensitive flake at `crm.spec.ts:363` (settings Defaults tab — untouched by this session's fix; the e2e already passed 137/137 twice standalone). Verify in isolation, then re-run the gate:
The gate output exceeded the frame limit — re-running with output redirection:
The house pattern for this is **stepwise** (the s102-s107 lesson) — run each gate step individually. Checking for leftover state first:
The killed run got deep into the 4th sweep. Cleaning up leftovers, then running the sweeps stepwise:
The killed gate run shows: unit 1934/1934 ✓ · e2e **137 passed (3.2m)** ✓ · sweeps 1-3 CLEAN — killed mid-sweep-4. Running the landscape sweep to complete the gate:
**Landscape sweep CLEAN — the FULL GATE is green** (lint 0/0 · tsc 0 · 1934/1934 · build · 137/137 e2e CI=1 · four sweeps CLEAN, no re-baselining). Now the closing census + tree verification + throwaway cleanup:
Census MATCH + tree exactly as planned (12 modified + 4 new). Now the formal session log — session_221.md:
Now the worklog records (repo + workspace):
Now the ship. Reading the SSH runbook + checking the tooling state:
Tooling carried over (shim + python3.13). Verifying paramiko, then the house-style commit:
Commit created. Now the SSH push — the operator key (0600, outside the repo), fingerprint verification:
**Fingerprint VERIFIED** — SHA256:3ddaNlFhMz1JXiGEDgVEaRsUzI4Ev0IpGEEB7NnU4PU matches the s104-s108 records. Commit `c64fa81` (18 files, +1114/−73). Now the dry-run:
Dry-run clean (`520284f..c64fa81` fast-forward). The real push:
**PUSHED AND VERIFIED: remote main @ c64fa81 == local HEAD** — tracking ref synced, temp key shredded by the wrapper. Now the session-log follow-ups (the s108 three-doc pattern — session_222 summary + session_223 narration):
Now session_223 — the narration follow-up:
**Session 109 SHIPPED AND PUSHED** — `c64fa81` (feat) + `9d73ba5` (session_222) + `41306f6` (session_223), remote verified, operator key shredded, tree clean. Final close-out — the workspace worklog + verification:
**Session 109 complete — shipped and pushed to `main` @ `41306f6`** (feat `c64fa81` + session-log follow-ups `9d73ba5`/`41306f6`, remote verified, keys shredded, no new branches).

**What this session delivered:**

1. **The fifth-surface seeded mobile walk** (activities @ 390 — the LAST un-walked phone surface; the walk family is now COMPLETE). The ANALYZE probes surfaced one real live find first: **M-109c1** — the priority row's right cluster (time span + "Check as completed" text button + edit icon) was a 249px un-shrinkable min-content overflowing the 390px frame by 98px (`main.scrollWidth` 488). Fixed TDD-style: `min-w-0` on both clusters + the label in a `min-w-0 truncate` span — validated live by class injection *before* the plan (488 → 390).
2. **All three audit finds fixed + a stronger pin**: the LIVE-CENSUS design reads each source file live and asserts the docs' counts match — the next staleness (either a doc edit or source growth) fails the gate.
3. **Full gate green**: lint 0/0 · tsc 0 · **1934 unit** · build · **137 e2e** · badge 2071 · four drift sweeps clean (no re-baselining) · mobile nav fully working (drawer battery 9/9) · probe:ref stable the 80th.

**Suggested next (session 110):** the dashboard KPI seam unification (the last inline KPI derivation — the s107-genus), the probe `--expect` mode if the reference ever changes, or a new genus entirely. Which shall I take?
