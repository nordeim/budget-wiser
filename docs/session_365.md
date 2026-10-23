I'll continue the neo-crm session work. Let me start by establishing the workspace state and setting up a task plan.
Workspace has been reset (the repo directory is gone). The worklog shows sessions 166-167 shipped from this sandbox lineage. Now I need to clone fresh and determine the true current state (the task references session_362/363 docs, implying sessions up to 169 were completed elsewhere).
The clone succeeded and reveals important state: **session-170 was already committed and pushed** (`7d3c551` + `ddbbd3b` session log update). Let me examine the full log and read the key documents.
The commit messages are enormous (house convention). Let me extract just the essentials:
State confirmed: **local HEAD == remote main == `ddbbd3b`**, tree clean, all sessions through 170 shipped. Now let me read the core documents to build understanding.
Both session docs confirm: **session-170 shipped** at `7d3c551`, pushed and verified. The gate state is lint 0/0 · tsc 0 · 134/2644 unit · smoke 14/14 · e2e 161/161. This rotation is effectively **session-171** — the post-170 audit round. Named next-rotation candidates: axe-core a11y gates + fast-check property tests. Let me read the worklog and session-170 plan.
I now have full context. Session-170 shipped artifact hygiene + error boundaries + boot gate + smoke leg. **This rotation is session-171** — the post-170 audit round, with named next-rotation candidates: axe-core a11y gates + fast-check property tests. Let me start the environment intake while reading core docs.
While that installs, let me read the core docs — CLAUDE.md first (the newest doctrine doc):
CLAUDE.md is fully current. Now the AGENTS.md head (commands) and Session-170 tail section:
Session-170 fully confirmed. Now completing the environment intake (.env, db push/seed, census):
The documented ambient `DATABASE_URL` shadow is live — scrubbing it on every DB command per house protocol:
Census MATCH. Installing Playwright chromium and starting the baseline gate:
**Baseline gate part 1: lint 0/0 · tsc 0 · 134/2644 GREEN** — exact s170 ship state. Now the build (which includes the smoke-leg prerequisites):
**SMOKE 14/14 PASS** — including boot-gate probe + artifact hygiene. Now e2e (161 checks):
**THE FULL BASELINE GATE IS GREEN**: lint 0/0 · tsc 0 · 134/2644 · build · smoke 14/14 · e2e 161/161 — the exact s170 ship state. Now the standing audit legs — probe:ref + mobile drawer battery:
probe:ref STABLE (bundle md5 `46bc2d9c…`). Now the mobile drawer battery — the operator's particular emphasis:
The ambient `DATABASE_URL` shadow poisoned the dev server boot. Killing and restarting with the scrubbed env:
**DRAWER BATTERY: 7/7 PASS** — mobile menu verified live. Now the drift sweeps (desktop + phone):
All standing legs GREEN. Now loading the repo skills for the audit lenses:
Sitemap/SEO standing (11 routes, byte-exact handler). Now loading the repo skills for the audit:
Audit lenses loaded. Now let me run a live axe-core accessibility scan of our app — this determines the viability of the named next-rotation candidate (a11y gates). First checking availability:
axe-core@4.13.0 is present transitively (via eslint-config-next). This is the s171 candidate: **the axe-core a11y gates**. Following house discipline — run a live probe FIRST to discover the actual violation landscape before planning:
The live probe reveals a rich, real violation landscape — the s171 finding register. Let me investigate each family in the DOM to understand exactly what they are:
The probe shows the flagged nodes need precise identification — let me get axe's exact violating nodes with their full outerHTML:
The violations are now precisely identified: **unnamed Radix Select triggers (role=combobox) + unnamed checkboxes + the funnel trapezoids**. Let me examine the component code:
The contacts Role select DOES have a placeholder. Let me inspect the actual rendered inner DOM of a flagged trigger:
Empty results — let me debug what's happening with the page state:
Elements exist — probe4's wait was too short. Retrying with a longer settle:
The triggers DO have visible text ("Decision Maker", "All Stages") — yet axe flags them. Let me get the complete failure details:
The span is fully visible yet the check fails — let me inspect axe-core's rule implementation directly:
**ROOT CAUSE FOUND**: `role="combobox"` is an ARIA role whose accessible name comes from the AUTHOR (aria-label), not from contents — so axe's name computation ignores the visible span text. This is a real SR-user defect, not an axe artifact. Let me now identify the remaining families — the `.bg-white/10` contrast node and the funnel trapezoids:
All families identified. Now checking the recharts funnel aria seam and our ConversionFunnel component:
The `role="img"` on funnel trapezoids is hardcoded inside recharts (not our markup). The decisive context: what does the **reference app itself** score? Let me scan it with the same probe:
**THE DECISIVE PARITY CONTEXT**: the reference ships ALL THREE families — its own unnamed buttons on every page (2-69 nodes!), the identical `.bg-white/10`/`.bg-emerald-600`/gray-400 palette, and the identical recharts funnel `role="img"` violations. Let me verify one last seam — recharts' event adaptation:
No aria seam in recharts — confirmed library-hardcoded. Now enumerating all unnamed-control surfaces in our code:
The leads page already established the `aria-label` precedent on SelectTriggers. Let me identify the phone-only flagged buttons:
Let me verify the last unidentified node — the phone-dashboard `sm:w-auto` button:
所有违规项均已盘点完毕。在制定计划之前，让我先检查一下针对 `anon-state` 和 `phone-width` 模式的 e2e 规范规范：
The audit is complete with a fully verified finding register. Now writing the session-171 remediation plan (house format):
Plan landed. Now the TDD RED phase — first studying the house source-pin idiom:
Let me check whether the dialog selects are label-wired (scope decision for the census):
Dialog selects share the genus but are closed-surface (unprobed) — documented as the next candidate, out of this round's scope. Now writing the RED-phase unit battery:
**RED birth: 21 failing + 1 born-green** (the leads precedent passes by design). Now writing the e2e two-gate spec:
The off-month chain confirmed (`bg-gray-50 text-gray-400` — the reference's own). Writing the two-gate e2e spec:
RED state honest: 15 failing (the source pins + devDep) + 7 born-green (the spec-contract pins). Now the GREEN phase — the aria-label fixes:
The first MultiEdit apparently partially applied before failing. Let me verify the current state of all fix sites:
Edits 1-3 landed; the Checkboxes need unique context:
Dashboard complete. Now accounts:
The Export CSV button edit was a no-op (identical strings). Fixing it properly:
Now contacts (row select + Scan Card + Import):
Now activities and reports:
All page fixes landed. Now WP-4 — declaring axe-core via the package manager:
**Unit battery 22/22 GREEN**. Now the live verification — re-running the axe probe against the dev server:
**button-name eliminated everywhere** — only the sanctioned families remain. Verifying the residual rule IDs:
Residual landscape is exactly the sanctioned register. Now finding the count-ladder pin sites that the new suite will trip:
3 expected collateral failures. Let me examine each:
Now updating the docs-counts constants (the count ladder's test-side anchors):
Now writing the count-ladder script. First surveying every doc carrier:
I have the full carrier map. Let me get the exact byte forms for the ladder script:
Before writing the ladder, checking the inventory-census coupling (the L-166c3 lesson — PAD §11 rows grow the suite):
Now adding the two §11 inventory rows to PAD (the honest inventory for the new files):
**2668 total** — the §11 row pins grew it +2 after my first derivation (the L-166c3 lesson live again). Updating the constants:
Now writing the count-ladder script (the house assert-first, idempotent form):
The census idiom requires one literal `test(` per registered check — my loop-based spec breaks the sum guard. Rewriting with 25 explicit registrations:
**FULL UNIT SUITE GREEN: 135/2668**. Now the mutation-proof ritual (the house doctrine):
**Mutation proof PASS** (planted badge regression → exactly 1 RED → revert → GREEN). Now the build + full e2e verification:
A regex literal syntax error — the escaped-slash forms. Let me inspect the exact line:
The regex-literal escaping is the trap (`\\/` terminates the literal). Rewriting the sanctioned register with plain string matching — unambiguous:
184/186 — the landing anon scans fail at both widths. Inspecting the exact violations:
The "Most popular" pill (`bg-brand/10 text-brand`) — the landing's own marketing design. Verifying the reference's landing carries the identical violation (the honest citation):
**CONFIRMED**: the reference's landing carries the byte-identical `.self-start` "Most popular" pill violation. Adding it to the sanctioned register:
**A11y two-gate: all 25 checks GREEN** (26 with setup). Now the full e2e suite for the 186 confirmation:
**E2E: 186/186 GREEN** — the ladder verified live. Now the docs lockstep — starting with the SKILL head surgery:
The demoted s170 line may have landed outside a comment wrapper. Inspecting:
The demotion landed inside the s141 wrapper — needs its own standalone wrapper (the corrective-surgery precedent):
Head structure correct. Verifying the pins still hold:
docs-counts 36/36. Now the standing re-verification (attribute-only proof) + remaining docs. Restarting the dev server for the drift legs:
**Attribute-only proof holds**: drawer 7/7, probe:ref STABLE, sweeps CLEAN. Now the AGENTS Session-171 section:
Now the PAD inventory row + ADR-016:
Now the CLAUDE a11y doctrine + README Tested-row mentions:
All green. Now writing session_364.md (the canonical record):
Now the captures (421-424). Studying the house capture pattern:
All 4 captures landed. Quick verification of the capture files:
Now the worklog entry (Task ID 171):
Now the final gate + commit. Checking the change set:
The change set is exactly the session scope. Running the FINAL GATE (one command, the full chain):
**FINAL GATE FULLY GREEN**: lint 0/0 · tsc 0 · 135/2668 · build · smoke 14/14 · e2e 186/186. Now the commit + SSH wrapper push. Reading the runbook:
Now the commit (the house mega-message convention):
Commit `147d3f2` landed on main. Now the SSH wrapper push — materializing the key outside the repo:
The shim works (no-key test correctly fails). Now the wrapper dry-run:
DNS resolves and port 22 is reachable — the earlier failure was transient. Retrying:
Auth works with the explicit IP (GitHub's SSH just doesn't run `echo`). The shim's DNS is flaky — let me add a resolve fallback to the shim:
Transient DNS flakiness confirmed. Adding a retry to the shim, then re-running the wrapper:
The wrapper's exact ssh form needs debugging — simulating its invocation:
**SHIM BUG FOUND**: the option parser mishandles interleaved `-i`/`-o` flags (treats `-o` as the destination). Fixing the parser:
The shim's IO loop exits before in-flight data drains. Rewriting the IO section with buffering:
Still silent. Debugging the shim directly with manual exec:
Manual exec works perfectly — the shim itself has a flow bug. Testing the shim binary directly with debug:
The exit codes were masked by the pipe. Running the real git command with proper capture:
git hangs (timeout 124). Debugging the shim with the exact arg vector:
**THE DEADLOCK**: my buffer-then-flush rewrite broke git's interactive protocol — git never sees the ref advertisement (it's buffered), so it never responds. Reverting to streaming with a settle window:
Still hanging. Adding debug tracing to isolate where:
**ROOT CAUSE**: the shim never pipes stdin or signals EOF — the server waits forever for the client's request. Rewriting as a full-duplex pump:
**The shim works** — `ls-remote` returns the remote ref cleanly. Now the wrapper dry-run:
**Dry-run clean** (fast-forward `ddbbd3b..147d3f2` negotiated). The REAL push:
**PUSH SUCCEEDED** — remote main @ `147d3f2` == local HEAD. Now the key shredding + independent verification:
**Session-171 SHIPPED and verified**: remote main @ `147d3f2` == local HEAD (independent HTTPS check), tree clean, keys shredded, no new branches. Recording the final worklog entry:
**Session-171 is complete and shipped** — commit `147d3f2` pushed to `main` on `git@github.com:nordeim/neo-crm.git` (remote verified, key shredded, no new branches).

**The round in brief:**
- **Baseline**: the s170 ship state reproduced exactly (lint 0 · tsc 0 · 134/2644 · smoke 14/14 · e2e 161/161 · drawer 7/7 · probe:ref STABLE)
- **The audit**: live axe-core probes (ours + the reference's own DOM) found 34 unnamed controls — 19 SelectTrigger comboboxes, 11 inert checkboxes, 4 phone-width icon buttons
- **The fix**: aria-labels on every open-surface control (invisible supersets — zero visual drift, re-proven by drawer 7/7 + STABLE sweeps), plus the §8.3 **two-gate e2e battery** (25 checks: structural-zero + the sanctioned parity-palette citations)
- **Final gate**: lint 0 · tsc 0 · **135/2668** unit · smoke 14/14 · **e2e 186/186** · captures 421-424 · `.env.example` current and committed

**Suggested next steps:** verify the commit on GitHub; the next rotation's named candidates are the fast-check property tests, the dialog-surface select family (closed dialogs weren't probed), or a drawer interior re-walk.
