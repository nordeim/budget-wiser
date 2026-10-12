I'll continue the multi-phase task on the neo-crm repository. Let me start by setting up a task list and refreshing the workspace.
The workspace exists with a neo-crm clone from a prior session. Let me refresh it with `git pull` and check the current state.
Repo is on main, clean, with session-109 work committed. Now let me pull the latest from the remote.
Pull succeeded — `docs/session_224.md` is new. Now let me review the core docs. First check file sizes to plan reading.
Session 223/224 confirm: **Session 109 is shipped and pushed** (`c64fa81` + follow-ups), and this run is **Session 110**. Suggested rotation: (1) dashboard KPI seam unification, (2) probe `--expect` mode, (3) a new genus. Let me review the core docs now.
CLAUDE.md fully absorbed. Now let me read AGENTS.md (head) and README.md.
Let me check the AGENTS.md tail (recent session history) and README.
Now let me read the session-109 plan and the SKILL.md project_state head.
The s109 plan is fully absorbed. Now let me check the SKILL.md project_state head and AGENTS Session-109 block tail.
Now let me check the workspace worklog tail and the environment state.
Environment is fully standing (`.env` 3-var contract, `db/` at root with both DBs, node_modules, chromium). Let me review the skills catalog and record the intake.
Skills catalog confirmed (218 skills, 10 categories). Let me quickly verify the key skills the task calls out (tdd, tailwind v4) and the scandihaven pattern repo.
Scandihaven re-verified — on-pattern (Next.js 16 + React 19 + TS 5.9 + Tailwind v4 CSS-first + Vitest/Playwright). Now let me record the intake and check the stray DATABASE_URL hazard before the baseline gate.
The stray `DATABASE_URL` hazard is confirmed (points outside the repo). All ops will run under `env -u DATABASE_URL`. Recording the intake, then running the baseline gate.
Lint 0/0 ✓. Now typecheck + unit suite.
108 files / 1934 unit tests ALL PASSING ✓. Now build + e2e.
**BASELINE GATE GREEN** — lint 0/0 · tsc 0 · 108 files / 1934 unit · build · 137/137 e2e fresh CI=1 (3.2m) — exactly the s109 ship state. Now dispatching both audits in parallel (the house pattern).
Both audits are back: **110-a GENUINE 9/9** (non-vacuousness reproduced EXACT: 22 | 107 (129) mixed, 127/127 native; ZERO real findings) and **110-b 9/9 PASS ZERO real findings** (SEO 46/46 LIVE, drawer battery exit 0, ordinals 80/30th standing). Now the live verification — probe:ref + the four drift gates.
**probe:ref STABLE — the 81st consecutive** (bundle md5 exact; demo zero; desktop 256px/8 standing; the mobile-nav defect STANDS at TRUE 390 — the 31st census). Now the four drift gates.
All four drift gates CLEAN. Live verification complete. Now the rotation decision — the s109-close leading candidate: **the dashboard KPI seam unification** (the s107-genus). Let me ANALYZE the dashboard route's inline KPI derivation.
The dashboard route derives its KPI row inline. Let me study the s107 `reportsKpis` seam pattern for the unification.
The s107 pattern is clear. Let me check the existing dashboard-KPI pins in the test suite and the src/lib seam structure.
The pattern is clear. Let me read the s107 `seeded-reports-kpis.test.ts` suite to absorb the seeded-face pattern, and check the seed contract.
The s107 pattern is fully absorbed. Now let me map the remaining pin sites on the dashboard route and compute the seeded values from the seed source.
24 leads, 7 won (value 687k ✓). The seeded dashboard KPI row computes: totalLeads 24 · conversion "29.2" · avgCycle 83. Let me check what `seeded-charts.test.ts` already pins (the "29.2" member).
Key find: `seeded-charts.test.ts:200` **mirrors the route's formula inline** in the test — exactly the weakness the s107 doctrine fixed. Let me check the other two route-source readers.
Now I have the complete pin map. Let me check the `DashboardData` type and the docs-counts census structure for the at-birth pin design.
The PAD module-table row structure is clear. Now let me check the docs-counts constants + README suite list to map every count-ladder site.
The docs-counts structure is fully mapped. Let me check the SKILL §5 layer structure and Appendix B for the doc realignment sites.
Now let me check the README/PAD file trees for src/lib listings and the dashboard page's KPI display, then verify the route row in the PAD module table.
All sites are mapped. Let me check the seeded-charts parse layer (the NOW anchor + lead parsing) that the new suite will mirror.
Let me see the parsed-leads shape in seeded-charts to design the re-anchor precisely.
The stage census confirms won=7/24 → "29.2" ✓. Let me verify the e2e dashboard assertions (behavior-preserving check) before writing the plan.
All pre-checks complete. Now writing the Session-110 remediation plan.
Plan written. Now the **plan validation** pass — verifying the arithmetic, the dialog-geometry carrier, and CLAUDE's four unit sites.
**Plan validated** — arithmetic exact (1938/2075/109/"29.2"/83), all carrier sites confirmed. Now executing **RED-1**. First, the seam (behavior-preserving, zero consumers):
Now the NEW suite — `tests/seeded-dashboard-kpis.test.ts`:
Now the re-anchors — first `opportunity-model.test.ts` (:165 + :184, the seam-source re-anchor per the s107 precedent):
Now the `dashboard-family-parity.test.ts` :213 re-anchor:
Now the `seeded-charts.test.ts` :200 re-anchor (the mirrored formula retires — assert through the REAL seam):
Both seeded-charts edits applied. Now the docs-counts re-anchors — constants, negatives ladder, suite list, census pair, and the layer-axis lockstep:
Now the layer-axis lockstep + the census pair + the header comment update:
The backtick escaping differed. Let me read the exact lines and re-edit:
The MultiEdit was atomic (none applied). Let me verify and apply the two remaining edits:
All docs-counts edits are in place. Now the dialog-geometry CLAUDE lockstep re-anchor:
Now the probe ordinals (80/30th → 81/31st):
RED-1 fully staged. Now the **RED-1 confirmation** — running the affected suites against the still-inline route + still-old docs:
**RED-1 CONFIRMED: 19 failed | 97 passed (116)** — the plan predicted ≈19-21. The 19 enumerated by name: 14 docs-counts + the route-wiring it + the opportunity-model ×2 + the dashboard-family-parity + the dialog-geometry lockstep. Now the **stash-proof**:
**RED-1 stash-proven**: native 112/112 GREEN → pop → 19 RED re-confirmed. Now **GREEN** — first the route slim:
The comment-block text didn't match exactly. Let me apply the edits separately:
The import landed but the KPI block remains. Let me read the exact current state and apply the remaining edits:
Now the route's header comment gains the s110 note:
The route slim is complete. Verifying the src-dependent suites:
The pin anchored on the interface declaration instead of the function body. Fixing the slice anchor:
Only the doc-dependent lockstep remains (expected — the docs half of GREEN). Now the doc realignment, starting with CLAUDE.md:
CLAUDE.md done. Now README.md:
README counts done. Now the Tested row's s110 clause + AGENTS.md:
AGENTS live-tense sites done (the remaining 1934s are the dated §Session-109 history — correct). Now the §Session-110 history block:
Now PAD — finding all the count sites:
Now the PAD module-table row + the s110 inventory row:
PAD complete. Now the SKILL — frontmatter, H1, project_state, §16cx chronicle, Appendix B:
Now the §16cx chronicle — checking where §16cw ends:
All docs realigned. Now the **GREEN confirmation** — the full unit suite:
**GREEN CONFIRMED: 109 files / 1938 tests ALL PASSING** (+4 net). Now **RED-2** — Face A: the seam-formula perturbation:
**RED-2 Face A PROVEN** — 4 its fail by name (the formula + the seeded row + the contrast + the seeded-charts re-anchor). Restore and verify:
Now **RED-2 Face B** — the seed stage perturbation (won → contacted):
**RED-2 Face B PROVEN** — 7 its fail by name across all three seeded suites. Restore and verify:
**RED-2 complete** — both faces proven by name, restored → 19/19 GREEN. Now the build + full e2e run:
Two failures — both the documented load-sensitive flakes (S14-P1 + S72-P2, the settings family — untouched by this session's dashboard change). Verifying in isolation, then re-running:
Both pass in isolation — the known load-sensitive genus. Re-running the full e2e suite:
**137/137 e2e PASSING.** Now **S110-P6 — the captures** (170/171). Let me check the battery-script pattern as a template:
The login redirects to `/` not `/Dashboard`. Let me check the auth setup pattern and fix:
Captures landed: **the live envelope through the NEW seam reads totalLeads 24 / "29.2" / target 0** (avg 82 = the pre-09:00 same-day face of the design-83 — the documented s103 hour nuance), 171 geometry 390/390. Now the VLM battery — loading the skill:
Running the VLM battery on both captures (4 checks each):
**170: 4/4 PASS** — the VLM read all six values verbatim (24 · $0k · 29.2% · 82 days). Now 171:
**171: 4/4 PASS — the VLM battery 4/4 + 4/4, zero adjudications.** Cleaning up the throwaway + re-running lint/tsc on the final state (the src changed since baseline):
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 1938/1938 unit · build · 137/137 e2e · four drift sweeps CLEAN · census MATCH. Verifying the tree:
The tree is exactly as planned (src/ = TWO files: the NEW seam + the slimmed route). Now the session log + the plan's execution record:
Now the plan's execution record:
Now the repo worklog + the workspace worklog records:
Now the ship. Reading the SSH push runbook:
Runbook absorbed. Verifying the tooling state (shim + paramiko), then the house-style commit:
Tooling standing. Creating the house-style commit:
Commit `98759a4` created (20 files, +1068/−91). Now the SSH push — writing the operator key (0600, outside the repo) and verifying the fingerprint:
**Fingerprint VERIFIED** — matches the s104-s109 records. Dry-run, then the real push:
**PUSHED AND VERIFIED: remote main @ `98759a4` == local HEAD.** Now the session-log follow-ups (the s109 three-doc pattern) — session_226 (summary) + session_227 (narration):
Follow-ups pushed (`741d355`). Now shredding the operator key + the final verification:
The key is shredded (correct — the wrapper already verified the remote itself). Verifying via the tracking ref the wrapper synced:
**Session 110 shipped and verified** — remote main @ `741d355` == local HEAD, tree clean, main only. Final close-out — the workspace worklog:
**Session 110 complete — shipped and pushed to `main` @ `741d355`** (feat `98759a4` + session-log follow-ups).

**Delivered:** The dashboard KPI seam unification — the LAST inline KPI derivation extracted into `dashboardKpis()` in `src/lib/dashboard-data.ts` (behavior-preserving, API response byte-identical), the seeded freeze (24 / 0 / "29.2" / 83 through the REAL seam), the cross-seam contrast pinned (dashboard 24/"29.2" vs reports 18/"66.7"), and the s103 drift-blind mirrored formula retired. Both audits clean (110-a GENUINE 9/9, 110-b 9/9 PASS — SEO 46/46 live, drawer battery exit 0). **Gate green: 109 suites / 1938 unit / 137 e2e / badge 2075**, four drift sweeps clean, VLM-verified captures 170/171, docs realigned at SKILL v1.107.0.

**Suggested next (session 111):** the probe `--expect` mode, a new genus, or a fresh LIVE parity re-walk (the reference bundle has been stable 81 sessions — a computed-style re-extraction would catch non-bundle drift). Which shall I take?
