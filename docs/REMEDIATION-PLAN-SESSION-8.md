# Budget Wise — Session 8 Remediation Plan

**Date:** 2026-10-28 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed (this session)

- Intake: `git pull` to `912ce9b` (the owner's `docs/session_12.md` transcript
  commit atop `72f8e3a`, the s196 docs tick — code HEAD `d6be743`, the
  session-196 ship). The workspace stood bootstrapped (deps, `.env` on the
  mandated six-knob contract with `DATABASE_URL="file:../db/custom.db"`, the
  seeded `db/` at the repo root, chromium-1248 present) — only the docs-only
  delta applied.
- The five root documents + `docs/session_11.md` +
  `docs/REMEDIATION-PLAN-SESSION-7.md` + `worklog.md` + `docs/session_12.md`
  re-read and validated against the tree before touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 401/401 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-196
  ship state.
- The local audit per `skills/web-application/SKILL.md` §16/§20 dimensions:
  the security sweep clean (no `dangerouslySetInnerHTML`, no secrets, no live
  keys, no `console.log`, no TODO/FIXME in `src/`); the docs-count lockstep
  (401/66/14) verified at every claim site; `skills/` confirmed excluded from
  all four check/test/compile scopes (tsc · eslint · vitest include patterns ·
  playwright testDir); the only repo delta since the s196 ship verified
  docs-only; the s196 seams re-verified in the tree (the `x-pathname`
  middleware, the alias metadata re-exports, the pure not-found-title helper,
  the 11-test mobile battery).
- The Tailwind v4 focus sweep: the `@custom-variant hover` unwrap, the
  `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
  `safe-area-pb` @utility, no config JS — no v4-family bugs found.
- The live reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844): **ZERO structural drift since session
  196** — the FIFTH consecutive shell census with no new restyle wave. The
  shell (outer surface wrapper form), all four app pages (containers
  7xl/5xl/5xl/4xl, headers, H1s, tracking-tight, action buttons), the mobile
  bottom bar (byte-identical: bar classes, the `flex items-center
  justify-around py-2` row wrapper, item classes, ink split, rect y=767
  h=77), the scroll-end clearance (732 ≤ 767 on both), both dialogs
  (`space-y-6 pt-4`, stock h-9 `border-input` forms, native selects), the
  404 surface (the interpolated humanized title + the slash-less quoted
  path), the sitemap format + robots.txt, the login card (4 OAuth buttons),
  the data state (the single −$1,000 food txn — data-borne, the excluded
  genus).
- The dual-app diff (local dev server vs reference): shell byte-identical,
  mobile bar byte-identical on every dimension, all page titles curl-verified
  matching, the 404 surface matching (served title + browser title + real
  404 status), both dialogs matching, SEO surfaces matching, the donut
  geometry identical (200×200 pie, 331px legend), the transaction-row anatomy
  identical (`flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors`, description-first titles).
- The VLM battery: "Structural Differences: None" on dashboard desktop,
  budgets mobile, and profile mobile; the dashboard-mobile pair's two flags
  both the documented s195/s196 genus, DOM-disproven by this session's direct
  byte-census (the platform's "Edit with Base44" badge occluding tabs 3–4;
  the data-borne savings-badge conditional).
- The screenshot battery recaptured (12 images): **11 of 12 byte-identical
  in size to the s196 set** — render-stability evidence.

## 2. Findings

### Medium (a live-hit reliability hazard, under-documented + unguarded)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **The dev-boot-after-build `.next` race — hit LIVE this session, through a trigger the docs under-specify.** After the baseline gate's `next build` completed cleanly (no concurrency, no killed process — build exit 0, smoke + e2e green on the standalone artifact), booting `bun run dev` entered the documented infinite reload loop: 646 `GET /login` re-fetches, the window marker gone within 2s, login form fills wiped by the reload. The cure (stop dev, `rm -rf .next`, restart dev) restored a stable server (0 loops) — the genus is confirmed. The gap is two-fold: (a) the README/AGENTS wording describes the trigger as "a `next build` ran **concurrently with** (or was killed half-into) `next dev`" — the sequence case (a COMPLETED build, then a dev boot onto the production-written tree) triggers the same loop and is the natural agent workflow (run the gate, then boot dev to iterate); (b) nothing PREVENTS the boot — the hazard is prose-only, re-hit by exactly the workflow the docs' own gate-then-iterate cycle invites. The marker facts (probed live this session): the production build writes top-level `.next/BUILD_ID`; dev turbopack writes `.next/dev/` with a `lock` JSON (`{pid, port}`) — the two states are programmatically distinguishable at dev-boot time. | `/tmp/dev-server.log` (646 GET /login over the looping boot vs 0 after the cure); the window-marker probe (`window.__m197` gone after 2s); `ls .next/` during dev shows `dev/` only with no top-level BUILD_ID; the documented cure verified live; README Troubleshooting + AGENTS.md current wording |

### Verified clean (no drift — no action)

- Every parity surface (the fifth census): the shell, all four pages, the
  mobile bar, the clearance, both dialogs, all titles (404 + aliases +
  page defaults), the sitemap + robots + manifest, the login card.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 11-test e2e battery green in the baseline gate).
- Tailwind v4: no bugs (all pins verified in place).
- `.env`/`.env.example`: matching the six-knob contract; `db/` at the repo
  root; the db-path seam pinned.
- The Vitest + Playwright suites: in place (401/66), config scopes clean.
- The security sweep, the docs-count lockstep, the skills/ exclusion.

## 3. Remediation ToDo (TDD)

**Phase A — red tests first**

1. [x] `tests/dev-preflight.test.ts` (new): the decision-function pins —
       fresh tree → none; dev-only tree (no BUILD_ID) → none; production
       tree + no lock → clean (the live-hit genus); production tree + dead
       lock pid → clean; production tree + LIVE lock pid → pass-through
       (never clean under a live server); the lock parser (valid/malformed);
       the pid-liveness helper (own pid live; ESRCH dead); the package.json
       wiring pin (the dev script runs the preflight before `next dev`).
       Born RED (the module does not exist yet).
2. [x] Verify RED: the import fails — the suite fails for the intended
       reason.

**Phase B — the fix (green)**

3. [x] `scripts/dev-preflight.ts` (new): the dev-boot guard, mirroring
       `scripts/prisma-env.ts`'s script pattern (a `main()` gated by
       invoked-as-script so the Vitest suite can import the pure parts).
       The decision function is pure and unit-tested; `main()` reads the
       real fs state (`.next/BUILD_ID` as the production marker, the
       `.next/dev/lock` pid for liveness), cleans the stale production
       tree (`.next` is a regenerable build cache) with a one-line
       explanation, and exits 0 in every pass-through case so `next dev`
       boots. No prompts (agents cannot answer them); no response
       mutation; it never removes a tree a live dev server owns.
4. [x] `package.json` `dev` script: `bun scripts/dev-preflight.ts && next
       dev -p 3000 2>&1 | tee dev.log` (shell precedence: the `&&` binds
       looser than the `|` — the preflight completes before the pipe).
       Edited via `npm pkg set` (the package-manager discipline; the
       s192 precedent used `npm pkg delete` for the same class of edit).

**Phase C — evidence**

5. [x] Live genus reproduction + cure proof: run `bun run build`, then boot
       `bun run dev` — the guard's clean fires (the log line observed), the
       server boots stable (0 reload loops, page marker survives), health
       200.
6. [x] Normal-boot regression: on a dev-written tree (no BUILD_ID) the
       guard passes through with no clean (the log line absent, boot
       unchanged).
7. [x] The screenshot battery: the 12 frames (11/12 byte-identical to the
       s196 set) copied into `docs/screenshots/` — the guard changes zero
       pixels.
8. [x] Full gate: lint 0/0 · typecheck 0 · **410 unit** (+9) · build ·
       14/14 smoke · 66/66 e2e — counts lockstepped across the doc set in
       the same commit.

**Phase D — docs + ship**

9. [x] Documentation alignment: README (the Troubleshooting entry
       broadened to the full genus — any build→dev mode switch on the same
       tree — + the guard mention), AGENTS.md (the race bullet broadened +
       the new dev-preflight architecture fact + the testing map's file
       list), CLAUDE.md (counts), the PAD **v2.7.0** (the revision block),
       `budget-wiser_SKILL.md` **v1.6.0** (§16's debugging row, §1's
       reference-state note, Appendix C's session-197 row, the counts +
       provenance), `docs/REMEDIATION-PLAN-SESSION-8.md` (this plan,
       ticked), `docs/session_13.md` (this round's log), the worklog entry
       (Task ID 197).
10. [ ] Commit (atomic) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the
        key.

## 4. Risks and guards

## 5. Execution addendum (what the plan grew mid-round)

- **The mutation proof executed on the wiring, not the logic**: reverting
  the `dev` script to its unguarded form → exactly 1 RED (the wiring pin,
  failing for exactly the intended reason — the guard reference absent);
  restored → 9/9 green. The decision function's own pins were born
  green-by-construction against the implemented matrix (the RED phase
  covered the import-level failure).
- **The pass-through branch live-proven with a planted marker**: with dev
  live, `touch .next/BUILD_ID` + running the preflight → the stderr
  warning fired, the tree stayed INTACT, the server stayed healthy — the
  guard's own guard (never clean under a live server) verified end-to-end,
  not just unit-pinned.
- **The screenshot battery: 10/12 byte-identical across THREE
  generations** (s196 → this session's first capture → the remediated
  capture) — the two profile frames differ by 26/27 bytes (sub-pixel
  avatar rasterization jitter, the documented genus). Render-stability
  evidence strengthened, not just reproduced.



- **The guard must never fire under a live dev server** — the lock-pid
  liveness check is the guard's own guard; pinned by the unit battery
  (the live-pid → pass-through case). A clean under a live server would
  corrupt the running turbopack state — the exact class the guard exists
  to prevent.
- **`.next` is a regenerable cache** — removing it costs one recompile;
  Next's own docs treat the directory as disposable. The seed DB, `.env`,
  and source are never touched.
- **No gate weakening**: the new pins are additive; the existing 401 stay
  green untouched; the gate chain itself is unchanged (the guard rides
  the `dev` script only — `build`, `smoke`, and `e2e` boot paths are
  unaffected).
- **The dev-vs-build race's OTHER direction (build while dev is live)**
  is documented and was NOT hit this session — a build-side guard is
  deliberately out of scope (no speculative scaffolding; Appendix B's
  surgical-change rule). The prose true-up covers both directions.
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
