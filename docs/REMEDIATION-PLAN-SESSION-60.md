# Budget Wise — Session 60 Remediation Plan

**Date:** 2026-11-02 · **Task ID:** 249 · **Branch:** `main` only · **Method:** the full census + evidence verification — a ZERO-FINDINGS verification round (the FIFTY-SEVENTH census — the forty-second after the s207 percent-decode fix, the thirty-second after the s218 arrow remediation, and the thirty-first carrying the deeper row-anatomy probe as standing methodology; the third round after the census-54 F-246a remediation ship), a RESET round (the sandbox workspace recycled between rounds — a fresh `git clone` at `c18a764`, the owner's `docs/session_115.md` transcript commit over the census-56 zero-findings ship `673f31a`) whose fresh-clone bootstrap ran green end-to-end (install → six-knob `.env` → db push+seed → Chromium 1248 → the gate green on the first full pass) and whose battery answered its cleanest possible boot-1 for the SECOND consecutive round (12/12 byte-identical to HEAD — no frame refreshed, no genus realized).

## 1. Audit scope executed (this session)

- Intake: the workspace was RESET (the recycled sandbox — the empty `budget-wiser/` tree) — `git clone https://github.com/nordeim/budget-wiser.git` landed at `c18a764` (the owner's `docs/session_115.md` transcript commit atop the census-56 docs ship `673f31a`). The environment was rebuilt from zero: `bun install` (513 packages) · `.env` recreated on the mandated six-knob contract (`DATABASE_URL="file:../db/custom.db"` + a fresh 64-char `AUTH_SECRET`) · `bun run db:push && bun run db:seed` (the demo month intact: 2 users / 4 transactions / 0 budgets — the F-239a CREATE-path pins confirmed on the first seed: both demo users at 2026-10-15) · the Playwright Chromium 1248 install (the cache held 1200 only) · agent-browser 0.40.0 standing. The five root documents (AGENTS/CLAUDE/README/PAD v2.58.0/SKILL v1.57.0) + `docs/session_114.md` + `docs/REMEDIATION-PLAN-SESSION-59.md` + `worklog.md` (Task 248) + `docs/session_115.md` were read and validated against the codebase (structure, seams, pins — every dimension answered the documented census-56 ship state).
- The baseline gate: GREEN on the FIRST full pass — lint 0/0 · tsc 0 · **427/427 unit** · build · 14/14 smoke · 68/68 e2e (CI=1) — the exact documented census-54/55/56 ship state; the mobile-navigation battery 12/12 standalone.
- The local audit (the §16/§20 dimensions of `skills/web-application/SKILL.md`): every dimension clean — the security sweep (no dangerouslySetInnerHTML/eval/new Function; no TODO/FIXME; the three console.* hits the documented sanctioned diagnostics: resend + signup verification lines + the auth warn), `src/middleware.ts` absent + `src/proxy.ts` in place, `skills/` excluded from all four scopes (eslint ignores + tsconfig exclude explicit; vitest include + playwright testDir by-construction), the literal-class discipline (the GRID_COLS static-map pattern re-read), the capital-alias stubs with metadata re-exports (Transactions/Budgets/Profile; /Dashboard metadata-less by design), the `outputFileTracingExcludes` pin, the Tailwind v4 blocks (the hover unwrap, the v3 palette re-pins, the shadow/blur re-pins, safe-area-pb, no config JS), the `.env`/`.env.example` six-knob contract (identical knob names), the SEO surfaces (the explicit sitemap.xml/robots.txt/manifest.json route handlers), the docs-count lockstep **427/68/14** (the s222 guard green in the suite), the known-issues register swept (all five rows documented/accepted/deferred), the working tree clean.

## 2. The round's mandate and posture

The round's mandated focus areas (the user instruction set): the workspace refresh (the clone — the reset form), the five-document read + validation, the plan review (session_114 + REMEDIATION-PLAN-SESSION-59 + worklog + session_115), the §16/§20 audit, the reference parity iteration, the mobile navigation (the Tailwind v4 bug class), the `.env`/`db` contract, the vitest + playwright suites, the sitemap/SEO surfaces, the remediation plan + TDD, the screenshots under `docs/screenshots/`, the `.env.example` contract, the documentation alignment, and the main-only push via the SSH wrapper. Every area executed; the round answered ZERO code findings (the census's standing record: the codebase at the census-54 ship state, verified against the live reference on every probed surface, the F-246a fix's third post-ship round).

## 3. The live re-audit: the FIFTY-SEVENTH census

### 3.1 The reference leg (budget-wiser.base44.app, desktop 1512×945)

Logged in (the owner account). The data state UNCHANGED a forty-ninth round: 3 October txns (bills −$1,200 · bills −$281 · food −$1,000 — −$2,481.00 total; the November empty month with all-zero KPIs and "No expenses recorded yet"; the year band at $0 earned / $2,481 spent). The rolled week band's SIXTH round at rest (the same-day census: rounds 52–57 all on 2026-11-02): Week Spent $0.00 / Week Earned $0.00.

- The four-page titles via full navigations: "Budget Wise" · "Transactions | Budget Wise" · "Budgets | Budget Wise" · "Profile | Budget Wise".
- The s207 percent-decode probes (the fresh round number 249): `/Curl%20Probe%20249%20Test` → "Curl Probe 249 Test | Budget Wise"; `/foo%2Dbar-probe-249` → "Foo Bar Probe 249 | Budget Wise" (the %2D decode-precedes-hyphen order); `/Hyphen-Probe-249` → "Hyphen Probe 249 | Budget Wise" — all on the reference's SPA shell.
- The 520 malformed-escape face a fortieth round: `/%2` → the CDN 520 title; `/foo%bar` → 200 with the garbled-decode title; `/%E0%A4/A` → 200 — the platform artifact varying within its documented family (520/200/200 this round).
- The two-surface 404 read exact: the `/%E0%A4/A` title "A | Budget Wise" (the last-segment rule) + the 404 BODY quoting the raw encoded path `"%E0%A4/A"`.
- The row anatomy at full nesting depth: the row class (`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors`), the mid wrapper (`flex-1 min-w-0` > the inner title-row wrapper `flex items-center gap-2` > the truncate P + the shadcn badge DIV), 3 rows — the recorded genus.
- The Add Transaction dialog (the full-header read, the census-54 forward rule): single H2 "Add Transaction" (tracking-tight text-xl font-semibold), NO description line; the expense family 8 in the visible listbox ("Food & Dining | Transport | Entertainment | Shopping | Bills & Utilities | Healthcare | Education | Other", none selected); the trigger at the placeholder state "Select category"; the date default 2026-11-02; the Income tab flipping on the real Enter keydown; the income family 5 ("Salary | Freelance | Investment | Gift | Other"); the submit flipping "Add Expense" → "Add Income"; the empty-form submit DISABLED.
- The Set Budget dialog (the canonical Budgets-page origin, the full-header read): H2 "Set Budget" + the description line `<P class="text-sm text-slate-500">Set a monthly spending limit for November 2026</P>` + the 0.00 field + the "Set Budget" submit — the F-246a surface confirmed standing on the reference a third consecutive round.
- The mobile axis (390×844): the bottom bar DIV `md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-pb` at rect 390×77@y767; the four capitalized hrefs; the ink split on the anchor AND its svg (active slate-900 / inactive slate-400); NO aria-current on the reference.
- The scroll-end clearance canon: main content-box bottom 764 ≤ bar top 767 (gap 3; the 844 − 80px pb-20 form).
- The SEO genera: the 4-cap-loc reference sitemap (/, /Budgets, /Profile, /Transactions); the robots form identical; the manifest 302 → the platform's app-manifests redirect.
- The member-since line: "Member since October 2026" (the F-239a regression surface).
- The logged-out root redirect (the session cleared in-browser): `/login?from_url=https%3A%2F%2Fbudget-wiser.base44.app%2FDashboard` — the wall-form genus.
- Four reference frames captured for the VLM battery (dashboard-desktop, transactions-desktop, budgets-desktop, transactions-mobile).

### 3.2 The local leg (the dual-app diff, dev server at the N-1 posture)

The F-239a pin through the UPDATE path: the in-place re-seed kept both demo users pinned at 2026-10-15. The dev server daemonized (the double-fork posture, PPID=1; next-server owning :3000 via the socket table; health 200/db up) on the preflight-guarded `.next` (the stale production tree from the gate's build removed by `scripts/dev-preflight.ts` before `next dev` booted) ×2 boots, the tree-sweep stop verified at both stops (the port verified free before each reboot).

- The with-data KPI mirror: $4,424.55 / $5,000.00 / $575.45 / 4 · the 88.5% saved badge — and the Week Spent $0.00 / Week Earned $0.00 (the same-day rolled band, the sixth round at rest on both apps).
- The four-page titles via full navigations: identical.
- The s207 probes via curl (the real statuses): all three 404 with the decoded titles — "Curl Probe 249 Test | Budget Wise", "Foo Bar Probe 249 | Budget Wise", "Hyphen Probe 249 | Budget Wise".
- The 520 face via curl: `/%2` → 404 "%2 | Budget Wise" · `/foo%bar` → 404 "Foo%bar | Budget Wise" · `/%E0%A4/A` → 404 "A | Budget Wise" — the designed never-throw raw-segment fallback on all three.
- The two-surface 404 read: the title "A | Budget Wise" + the body quoting `&quot;<!-- -->%E0%A4/A<!-- -->&quot;` — the raw encoded form.
- The row anatomy: the row class + the mid wrapper + the inner title-row wrapper + the shadcn badge DIV + the trash2 dual-alias (`lucide lucide-trash2 lucide-trash-2`) + the N-89c6 aria-hidden superset (3 aria-hidden svgs) — the documented genus, 4 rows (the seeded November data).
- The Add Transaction dialog (the DASHBOARD origin, the full-header read): single H2, no description, the expense family 8 in the visible listbox (labels AND order byte-identical), the placeholder trigger, the date default 2026-11-02, the Income Enter-flip, the income family 5 (byte-identical), the submit flip, the disabled empty-form submit — plus the standing shim read: the hidden 1×1 aria-hidden tabIndex=-1 native select carrying the income-side form after the flip (the leading empty + salary/freelance/investment/gift/other_income) — the documented below-parity-surface form (the N-89c6 family), the visible surfaces byte-identical on both apps.
- The Set Budget dialog (the BUDGETS origin): **the F-246a fix verified live a third post-ship round** — our dialog carries `<P class="text-sm text-slate-500">Set a monthly spending limit for November 2026</P>` positioned directly after the H2 — the textContent, the tag, the ink, and the position byte-matching the reference's form.
- The mobile axis: the bottom bar NAV (our a11y superset, probed with the census-55 origin-assertion + nav-selector rule) with the byte-identical class string at rect 390×77@y767, the four capitalized hrefs, the ink split on the anchor AND its svg, and OUR `aria-current="page"` superset on the active item — every dimension matching the reference's DIV bar.
- The clearance canon: 764 ≤ 767, gap 3 — IDENTICAL on both apps.
- The SEO genera: our 9-loc superset sitemap (the real lowercase routes + about/contact/login/signup); the robots form identical; the manifest 200 (vs the reference's 302 platform redirect — the documented genus).
- The guest wall: the F-147c2 shim served to the guest (zero app-content markers in the 20,455-byte HTML payload — the exact documented size).
- The member-since line: "Member since October 2026".
- The s230 F-1 fix re-verified LIVE through the OTP funnel: throwaway249-ui-1@test.local — the signup with the confirm-password field → the 6-digit code **068587** read from the page's "Demo code:" line directly (the OTP code-read guard honored) → the six per-digit inputs filled by REAL KEYSTROKES — all six landing in their exact positions ["0","6","8","5","8","7"], the focus advanced to the last input ("Digit 6") — GREEN ON THE FIRST PASS (the TENTH consecutive round the canon holds) → Verify email → auto-login: the empty dashboard rendering the exact reference form (the text-slate-400 P "No expenses recorded yet" a DIRECT child of the h-64 content div, no svg sibling) + the dashboard API confirming the exact empty aggregate (balance 0 · income 0 · expenses 0 · transactionCount 0 · savingsPercent null · spendingByCategory [] · budgets [] · overallBudget null · month 11 · the week's all-zero buckets · recentTransactions [] · totalTransactions 0) + the with-data form intact ($4,424.55 · the 88.5% saved badge) + throwaway249 keeping its real createdAt 2026-11-02T08:00:50 (the fixture pins only the seeded demo accounts).

### 3.3 The evidence layer

- The screenshot battery (boot-1, the daemonized dev server, the viewport reset before each desktop frame, the chart-ready assertion before each chart-bearing frame — the s248 rule carried forward, the dialog frames at the canonical origins with the caret-ON delay): **12/12 byte-identical to HEAD — the battery's cleanest possible boot-1 answer for the SECOND consecutive round** (NO frame refreshed, NO genus realized: dashboard-desktop at HEAD's direct-form cc31e6a1 · profile-desktop at HEAD's ed954b46 · profile-mobile at HEAD's b0413d45 · set-budget-dialog at the F-246a form 8343af1f a fourth round · add-transaction-dialog at the caret-ON form f5a00f64 · the other seven at their standing HEAD values).
- The boot-2 stability proof: **12/12 stable across both boots** — 11/12 byte-identical boot-1 ↔ boot-2 + ONE avatar-jitter genus realization (profile-desktop at the alternate: 105 px, max 6, ZERO at ≥ 32, bbox (357,255,504,373) — the EXACT documented signature 3d5173c8) + dashboard-desktop byte-identical across BOTH boots at HEAD's direct form cc31e6a1 (the chart-settle assertion honored on both boots — the s248 rule's first full-battery carry-forward). The daemon-stop tree sweep verified at both stops (the port verified free before the reboot; boot-2's next-server verified owning :3000 via the socket table).
- The VLM battery (4 pairs, the census JSON format): **1/4 clean with ZERO surviving flags** — transactions-desktop clean ({}); the dashboard pair's three flags ALL the documented data-borne genera (the empty-vs-seeded donut, the recent-transactions row count, the savings-badge conditional); the budgets-desktop pair's single flag the reference's platform edit badge (the platform-face genus); the transactions-mobile pair's two flags the platform badge + its occlusion of the reference's bottom bar (disproven by the direct 4-href byte-census — both bars carrying the identical class string at rect 390×77@y767); the s204 coarse-signal-never-a-gate posture held.

## 4. Findings

### Issues found and fixed (this round)

NONE — zero code findings. The codebase answered the census-54 ship state on every probed surface; the F-246a remediation's surface verified live on both apps for the third post-ship round.

### Verified clean (no drift — no action)

- Every parity surface (enumerated in §3) — zero structural drift for the forty-second census after the s207 fix.
- The mobile navigation: working exactly as the reference's on both apps (the byte-census at 390×844 + the 12/12 e2e battery green standalone; the clearance identical at 764 ≤ 767, gap 3). The Tailwind v4 mobile-nav bug class stayed retired.
- Tailwind v4: no bugs (all pins verified in place).
- The `.env`/`db` contract: the six knobs; `DATABASE_URL="file:../db/custom.db"`; `db/` at the repo root; `.env.example` tracked with identical knob names.
- The Vitest + Playwright suites: 427/68/14 all green; `workers: 1` and the CI=1 knob intact.
- The SEO surfaces: matching the reference formats (the documented superset genera).
- The s230 F-1 fix: re-verified live (the funnel first-pass green a tenth consecutive round).
- The F-239a fix: live on both apps through BOTH seed paths (the fresh-clone CREATE pins + the in-place UPDATE pins).
- The F-246a fix: verified live on BOTH apps (the third post-ship round).
- The security sweep, the `skills/` exclusion, the capital-alias stubs, the `outputFileTracingExcludes` pin, the known-issues register, the neo-crm stack-pattern lineage.
- The reference data state: unchanged at 3 txns / −$2,481.00 (the forty-ninth round).

### New census dimensions and lessons (recorded, no code implication)

1. **The reset-round bootstrap is now the twice-verified standing path alongside the warm-workspace posture:** the fresh clone → install → six-knob `.env` → db push+seed → Chromium 1248 → gate-green-on-first-pass chain ran end-to-end this round (the census-50 fourteenth-reset precedent repeating) — both intake forms (reset and warm) are standing green paths, and the round's provenance records which one it rode.
2. **The chart-settle capture rule's first full-battery carry-forward (the s248 rule):** every chart-bearing frame (both dashboard axes on both boots) waited for the chart-ready assertion (`svg.recharts-surface` present + the 3 pie sectors counted) BEFORE the shot — zero mid-mount captures this round, the boot-1 and boot-2 dashboard frames byte-identical across both boots at HEAD's direct form. The rule born last round now has its first clean carry-forward.

## 5. Remediation ToDo

**Phase A — the verification (the census legs)**

1. [x] The workspace refresh (RESET — the fresh clone at `c18a764`; the environment rebuilt end-to-end).
2. [x] The baseline gate: 427/427 unit · 68/68 e2e · 14/14 smoke · lint 0/0 · tsc 0 — the exact documented census-54/55/56 ship state, first full pass green; the mobile-nav battery 12/12 standalone.
3. [x] The local audit per §16/§20 — every dimension clean (§1).
4. [x] The live reference census #57 + the dual-app diff — ZERO structural drift; the F-246a fix's third post-ship live verification on both apps; the F-239a regression check through BOTH seed paths; the s230 F-1 fix re-verified live (the OTP funnel first-pass green); the data state unchanged (§3).
5. [x] The screenshot battery — **12/12 byte-identical to HEAD** (the cleanest possible boot-1, the second consecutive round; NO frame refreshed, NO genus realized).
6. [x] The boot-2 stability proof — 12/12 stable across both boots (the one avatar-jitter genus realization at the exact documented signature; dashboard-desktop byte-identical across both boots at the direct form under the chart-settle rule).
7. [x] The VLM battery — 1/4 clean, zero surviving flags after the direct-census cross-check.

**Phase B — the remediation**

8. [x] NONE — zero code findings; no code changed this round (the counts hold at 427/68/14).

**Phase C — the documentation + the ship**

9. [x] This plan (the zero-findings record + the census evidence + the two new census dimensions/lessons).
10. [x] The PAD v2.59.0 revision block (the fifty-seventh census — the second consecutive cleanest-boot-1 round).
11. [x] `budget-wiser_SKILL.md` v1.58.0 (the frontmatter bump + the provenance's session-249 clause + Appendix C's session-249 row).
12. [x] `docs/session_116.md` + the worklog entry (Task ID 249) + `.gitignore`'s walk249 entry.
13. [x] The post-documentation gate re-run (the ship discipline) before the atomic commit.
14. [x] The git sweep (no `.env`, `*.key`, `db/*.db`, logs, `test-results/`, `scripts/walk249/` staged — the walk249 folder git-ignored per the established pattern) + the atomic commit on main + the push via `docs/ssh_git_wrapper_v3.py` (the runbook: keys never live inside the repo; the key shredded post-push; the wrapper's `--remote` flag — the census-53 lesson — targeting `git@github.com:nordeim/budget-wiser.git`).

## 6. Risks and guards

- **The zero-findings posture is not a pass-by-inertia:** the census probed every standing surface (the reference leg, the local leg, the battery, the VLM) AND carried both new standing dimensions forward (the chart-settle rule's first full-battery carry-forward + the reset-round bootstrap's second verification) — the round realized zero unclassified deltas.
- **The week-band guard at rest:** the band held $0.00/$0.00 on both apps for its sixth round (the same-day census); the next band-form event lands at the Mon Nov 9 rollover (or any owner-side data plant) — the s244 guard's classification rules standing.
- **The avatar-jitter pairs unchanged:** desktop ed954b46 ↔ 3d5173c8 (HEAD realized on boot-1; the alternate on boot-2 — this round's realization) · mobile b0413d45 ↔ 8c6e81e7 (HEAD realized on BOTH boots this round) — the documented realization pattern.
- **The settle/direct dashboard pair:** cc31e6a1 (the direct form, HEAD's manifest) realized on BOTH boots this round (the chart-settle assertion honored) — the pair's both-members-across-boots possibility's third realization, this time without any re-capture.
- **The OTP code-read guard honored this round** (the code 068587 read from the "Demo code:" line directly — no devtools-payload hit).
- **The daemon-stop tree sweep (s244 guard) verified live at both stops** (the port verified free before the reboot; boot-2's next-server verified owning :3000 via the socket table).
- The reference's data state has sat at 3 October txns since round 30 — a future owner-side re-plant will surface as new data-borne divergence, not structural drift (the standing classification rule).

## 7. Execution addendum

- The census executed per §3 on 2026-11-02: the reference leg (the owner login, the desktop probes via full navigations, the mobile axis, the s207/520 probes, the SEO curl set, the member-since re-read, the in-browser logged-out wall), the local leg (the N-1 dev boot ×2, the in-place re-seed, the full probe mirror, the throwaway-signup empty-state verification), the evidence layer (the 12-frame battery + the boot-2 proof + the 4-pair VLM battery).
- ZERO code findings — the counts hold at **427/68/14** (the s222 lockstep guard green in the suite).
- The evidence: twelve frames byte-identical on boot-1; one avatar-jitter genus realization on boot-2; the VLM battery zero surviving flags.
- The documentation set shipped: this plan, the PAD v2.59.0 (the revision block), `budget-wiser_SKILL.md` v1.58.0 (the frontmatter + the provenance's session-249 clause + Appendix C's session-249 row), `docs/session_116.md`, the worklog entry (Task ID 249), and the `.gitignore` walk249 entry.
- The full gate re-ran green after the documentation work (**427/427** unit · build · 14/14 smoke · 68/68 e2e CI=1) — the ship state.
