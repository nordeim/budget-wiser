I'll continue the neo-crm session workflow. Per the summary, this is a continuation session — doc references have advanced again (now session_264/265 + session123-reports-export-walk plan), suggesting session 123 shipped and session 124 is next. Let me start with Stage 1: refresh the workspace and verify actual state.
The repo isn't at the expected path. Let me search for it and check the worklog.
Found it at `/home/z/neo-crm`. Let me check git status and pull.
Session 123 has shipped (`5be8f22`). Now let me pull the latest and verify what's new.
Session 123 confirmed shipped; the pull brought `docs/session_265.md` (new intake). Let me set up the session TODO structure, then read the intake and close docs.
Session 123 shipped and pushed; `session_265.md` is the new intake naming the next candidates: **the calendar surfaces** (the last named candidate) or a re-check. Let me read the plan doc and worklog next.
Worklog confirms s123 fully shipped. Now let me read the plan doc and the core docs (strategically, given their size).
CLAUDE.md fully reviewed. Now let me check the key sections of the remaining core docs — AGENTS.md conventions, README status, PAD inventory, and SKILL rotation ledger.
Session 108 was the calendar's last dedicated walk (ours-only seeded mobile). The rotation target for session 124 = the calendar surfaces, two-app. Let me complete Stage 1 validation: PAD inventory, AGENTS Session-123 section, and environment alignment.
Stage 1 doc review complete — s123 records verified across all five docs. Now the calendar surface map (the rotation target) and the census check to complete codebase alignment.
Census MATCH — environment standing. Let me map the calendar surfaces for the walk.
Stage 1 complete — full surface map acquired. The rotation target for session 124: **the calendar family walk (two-app)** — never two-app-walked (s108 was ours-only seeded mobile). Now Stage 2: the baseline gate.
Lint 0/0 · tsc 0 ✓. Now the unit suite.
**110/1980 unit ✓** (exact match). Now build + e2e.
**BASELINE GATE GREEN: lint 0/0 · tsc 0 · 110/1980 · build ✓ · e2e 137/137 (3.3m, zero flakes)** — exact match to the s123 ship. Now Stage 3: mapping the ship delta, then dispatching the parallel audits.
s123 ship delta mapped: 25 files +846/−87, src/ 5 + scripts/ 2. Now dispatching the two parallel audit subagents (the house pattern).
Both audits **GREEN**: 124-a 9/9 verified (zero real findings; 3 record nanos incl. the `csvWithBom` dead-code survivor at csv.ts:51) + the complete calendar inventory; 124-b 9/9 PASS (~82nd standing) with the F-123a1 live-guard proof (battery ran plain, no `env -u`, still EXIT=0). Now Stage 4: live verification.
**probe:ref #96 STABLE** ✓ — bundle md5 exact, demo data ZERO, TRUE-390 defect stands (the reference's own bug). Now the four drift gates.
All four drift gates CLEAN. Now the scandihaven on-pattern check.
scandihaven `d4789c3` ON-PATTERN (unchanged). **Stage 4 complete: probe:ref #96 STABLE · four drift gates CLEAN · census MATCH.** Now Stage 5: the calendar family walk. Let me study the standing walk idiom from the s123 scripts.
The walk idiom is clear. Let me check the orchestration script pattern from s123.
Now let me verify key DOM structures for the walk locators — the EventDialog title and TrendStatCard anatomy.
Let me check the CALENDAR_CELL tokens and the sidebar token color before writing the walk.
All structures verified. Now writing the PASS 1 walk script — the calendar zero-data two-app walk.
A JS scoping bug in the KPI census — `els` is referenced outside its loop scope. Fixing:
Locator-await precedence bug in `boxFor`. Fixing:
The walk ran end-to-end — near-perfect parity (KPI row, month card, grid, today pill, dialog, nav round-trip all byte-equal). Only 2 raw diffs (`mc.nav.census` — our aria-label superset). But the rail census + interactions failed to resolve (`rail.rect 270x24` = the CardTitle row, not the Card; `nobox` = the checkbox locator missed). Let me debug the rail structure live.
Diagnosis complete: the rail resolver stopped at the CardTitle (needs `labels >= 8`), and Playwright's `xpath=parent::*` doesn't resolve relatively — but `xpath=..` does. Fixing both:
The walk is now complete — only the `mc.nav.census` aria-label axis differs (our a11y superset). Let me verify the rail records came back clean:
**PASS 1 COMPLETE — the rail is byte-equal on every axis, including the L-76c5 radio semantics LIVE-verified two-app for the first time** (`tomorrow1=true|tomorrow2=false|thisWeek=true` both apps). The only diff: the month-nav aria-label superset (our a11y genus, adjudicated noise). **PASS 1 = ZERO real parity defects — a pin-only session.**

Now PASS 2: the populated face (ours-only, the reference's zero-data genus). Let me check the seed's event data first.
The seed uses relative dates (start: -7..+10 days from today). Let me check the PASS 2 idiom from the s123 populated walk (db/API verification):
The PASS 2 idiom uses a direct PrismaClient on the walk db. Let me check the seed's `iso()` helper for timezone semantics, then write the populated walk.
Now let me check the EventDialog form fields for the create round-trip:
Now writing the PASS 2 populated walk:
Fixing the broken import line — walk12 used the plain `@prisma/client` import:
Now appending the main body of the populated walk:
Now the PASS 2 orchestration script:
Three fixes needed: oklab normalization for today's `white/20` chips, the broken chip locator in C, and the create round-trip needs a chipless day (today already has 2 chips — the new one would hide behind "+1 more"). Applying:
43/44 — the single FAIL is a walk-script expectation bug (the app renders `account?.name ?? contact?.name` — account-first; my expectation used the contact name). Fixing the walk's expectation:
**PASS 2: 44/44 — PERFECT.** The rotation walk is complete: **PASS 1 zero-data two-app = 0 real parity defects** (only the aria-label a11y superset, adjudicated noise) + **PASS 2 populated 44/44 db-verified**. This is a **pin-only session** (the s120/s122 lineage). Now the remediation plan — pins for the unpinned residue. Let me study the existing calendar test files.
The unpinned residue is clear. Let me check the `csvWithBom` dead-code survivor (N-124a2) before writing the plan:
`csvWithBom` is confirmed dead (zero callers; only the route-negative assertion). Now writing the remediation plan doc:
Now the TDD pins. First the new describe block in activities-calendar-parity.test.ts:
3 pins RED — let me see the exact failures:
Three locator-scope bugs in the pins. Fixing:
The button text sits on its own line — fixing with a whitespace-tolerant regex:
**51/51 GREEN** (41 + 10 new). Now D-124a7 — the `csvWithBom` dead-code retirement + its pin:
The orphaned doc comment needs removal:
Now the csv-contract pin for the retirement:
My own comment mentions the retired name — rewording it:
Line 71 is the legitimate import-side BOM stripper — my blanket negative was too broad. Narrowing the pin:
Both suites GREEN (62/62, +11 pins). Now the **stash-proofs** — each pinned src content reverted alone must RED its pin alone. Running proof 1-3:
**All 10 stash-proofs PASS** (each revert → exactly 1 RED → restore → GREEN). Now the full unit suite:
**110/1991 GREEN** (+11 exact). Now the final gate:
**FINAL GATE GREEN: lint 0/0 · tsc 0 · 110/1991 · build · e2e 137/137.** Now the closing drift sweep — deliberately WITHOUT the `env -u` prefix (the F-123a1 live-guard precedent):
All four closing gates CLEAN (without prefix — the guard live again) + census MATCH. Now the captures 224-227. Let me study the s123 capture idiom:
Now the captures 224-227 script:
Captures 224-227 done (four unique md5s). Now the VLM battery — let me find the standing invocation:
The output needs parsing — let me extract the actual VLM content:
The CLI prefixes log lines before the JSON. Fixing the extraction:
224/226/227 CLEAN. The 225 rail capture needs a rail-specific prompt:
**VLM battery 4/4 × 4 CLEAN** (225 verified: Filters + Clear All + 6 TYPE + 4 DATE rows verbatim). Now the docs realignment — the docs-counts lockstep first:
The lockstep flow: bump the constants → RED → update docs → GREEN. Bumping:
12 stale sites flagged (the lockstep RED). Updating the docs — README first:
Now the README Tested row's s124 clause:
Now the SKILL updates — head, version, §16dl layer, Appendix B:
Now the SKILL updates — head, version, Appendix B, and the new §16dl layer:
Now the §16dl layer at the file's end (after §16dk):
Now AGENTS §Session-124 and the PAD inventory row:
Now the PAD s124 inventory row (before the Total row):
**40/40 GREEN** — all lockstep carriers pass. Now the session record `docs/session_266.md`:
Now the plan's execution record and the worklog append:
Now the final verification — full suite + the delta review:
**110/1991 GREEN.** Let me check the two-commit split pattern from s123:
The two-commit pattern confirmed. Creating the feat commit:
Both commits created (`56ef16d` feat + `f7bcbb7` log). Now the SSH wrapper push — reading the runbook:
The shim exists. Executing the push sequence — key materialization + fingerprint verification:
The dry-run reports the remote has moved. Checking the remote state:
The dry-run pushed to the wrapper's default remote (task-management) — needs the explicit `--remote`:
Dry-run clean (`d7b4f3d..f7bcbb7`). Now the real push:
**PUSHED AND VERIFIED** — remote `main @ f7bcbb7` == local HEAD, tree clean, key shredded. Updating my worklog and completing the session:
**Session 124 is shipped and pushed to `main`** (`56ef16d` feat + `f7bcbb7` session log, remote verified at `f7bcbb7`).

The rotation target was the **calendar family** — the last named candidate, never two-app-walked. The results:

1. **PASS 1 (zero-data, two-app) — ZERO real parity defects**, the third consecutive pin-only session. The single divergent axis was adjudicated noise: our `aria-label` superset over the reference's unnamed icon-only nav buttons. Highlights: the **radio semantics of the date rail LIVE-verified two-app for the first time** (Tomorrow checked → This Week checked → Tomorrow clears, both apps), the complete-weeks grid byte-equal (35 cells matching the in-test expectation on both apps), and the mainScrollH census (1182@1440 / 1750@390 both).
2. **PASS 2 (populated, ours-only) — 44/44**, every value db-verified: the KPI windows (2/12/3/1), the 12 chips with tints, the chip→Edit dialog (the previously unpinned edit arm), the upcoming/agenda row contracts, the filter interactions, and a create/delete round-trip verified directly against the database.
3. **The remediation**: +11 pins (the walk's live-measured contracts) with **10 stash-proofs**, plus one hygiene fix — the `csvWithBom` dead-code survivor the 124-a audit found was retired (the N-124a2 find).
4. **Final gate**: lint 0 · tsc 0 · **110/1991 unit** · build · **137/137 e2e** · the closing drift sweep clean on all four gates *without* the `env -u` prefix (the F-123a1 guard re-verified live) · census MATCH · captures 224-227 + VLM 4/4 × 4 CLEAN.

**Next**: the remaining arms are re-checks of walked families — say the word and session 125 begins.
