# Budget Wise — Session 3 Remediation Plan

**Date:** 2026-10-27 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed (this session)

- Fresh intake: `git pull` to `17c9cce` (the owner's `docs/session_2.md` log commit; code
  HEAD `fc163f6`, the session-191 ship state).
- Full gate run FIRST: lint 0/0 · typecheck 0 · **382/382 unit** · build (clean, all
  routes) · **14/14 smoke** · **61/61 e2e** (1.2m, first run).
- Live reference re-audit (agent-browser, saved auth state still valid, 1512×945 +
  390×844): login (4 OAuth buttons, title "Budget Wise"), all four app pages censused,
  mobile axis re-confirmed (0 hamburgers, link row `display:none`), demo data still in
  the reset/empty state — **zero reference drift since session 191**.
- Local parity audit: dev server booted, demo login, all four pages + both dialogs +
  drawer censused; mobile-nav battery spot-checked live (open → Escape close → no
  stranded scroll lock; the full 11-test e2e battery already green); guest-redirect
  wall verified (`/Dashboard` → `/login?from_url=…`); sitemap.xml + robots.txt +
  manifest.json + per-route metadata verified live; `.env`/`.env.example` verified
  matching the six-knob contract; Tailwind v4 discipline verified (CSS-first `@theme`,
  no config JS, hover unwrap, shadow/blur re-pins, 149 literal palette values).
- VLM side-by-side: login page → **"Structural Differences: None"** (the logo's
  inline-SVG-vs-hosted-JPEG note is the documented s191 boundary); dashboard →
  **"Structural Differences: None"** (empty-vs-seeded data states excluded per the
  documented genus).
- Screenshot battery recaptured (13 images); 8 of 13 byte-identical to the s191 set —
  the 5 differing images are recharts-animation/dialog-animation capture frames (donut
  verified present in the live DOM: 3 sectors + legend; more colored pixels than the
  old capture, not fewer).

## 2. Findings

### Medium (broken tooling, green-masked)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **Dead package.json script targets — the CRM scaffold's drift-gate family.** `db:census` → `scripts/census.ts`, `sweep` → `scripts/sweep.ts`, `probe:ref` → `scripts/drift-probe.ts`, `sweep:fullpage` → `scripts/fullpage-sweep.ts`, `census:interior` → `scripts/interior-census.ts` — all five targets were removed by the s190 transformation (~60 CRM scripts) but their package.json entries survived. `gate:full` chains six of the dead legs, so `bun run gate:full` fails on its first drift gate. Worse: the session-97 describe block in `tests/gate-script.test.ts` PINS the `gate:full` composition green — the tests read the script STRINGS and never check that the referenced files exist (green tests masking dead infrastructure, the exact class s191 cured for modules). | `ls scripts/` census + git grep; `bun run sweep` fails: `TS2307: Cannot find module 'scripts/sweep.ts'`-class error (file absent) |

### Low (docs)

| # | Finding | Evidence |
|---|---|---|
| F-2 | **The dev-vs-build `.next/` race hazard is undocumented.** A `next build` launched concurrently with (or killed half-into) a running `next dev` corrupts turbopack's dev state and produces a sustained HMR full-reload loop (~4 reloads/sec; the browser ping-pongs `/Dashboard ↔ /login?from_url=`, session dropped mid-login). Hit this session (background build + dev server); session 191's log hit the same class ("Session dropped after the HMR rebuild"). The app code is NOT at fault — the guest wall, login card, and dev server were re-verified stable once the dev server ran against a clean `.next/`. The A/B: `tee dev.log` is NOT a loop driver (12 requests over 35s idle-with-browser-open with tee active); the loop only reproduced after the concurrent build. | dev.log request census (2,260 requests in the looped run; 12 in the clean run); console showed continuous `[Fast Refresh] rebuilding` |

### Verified clean (no action)

- The full gate chain (all six legs green, first run, no retries).
- Reference drift: none — structure, OAuth row, 404 title, empty data state all unchanged.
- Mobile navigation: the reference still ships NO phone nav; our drawer superset battery
  green (live spot-check + the 11-test e2e battery).
- Session-191 headline fixes standing: the 404 title `Budget Wise` (live-verified on
  `/nonexistent-route-xyz`), the four-button OAuth row, the AI Insights copy
  (`Get personalized insights based on your spending patterns`), `package.json`
  identity `budget-wise`.
- Tailwind v4 discipline, SEO surface, `.env`/`.env.example`, vitest + playwright
  configs (the `*.test.ts`-only contract; standalone webServer on its own port + own
  `db/e2e.db`; storageState auth; `workers: 1`).
- 8/13 screenshots byte-identical across sessions — render stability evidence.

## 3. Remediation ToDo (execution order, TDD)

**Phase A — red tests first**

1. [ ] `tests/gate-script.test.ts`: add the **dead-script guard** — for every
       `package.json` script whose command references a repo-local file target
       (`./*.ts`, `./scripts/*`, `prisma/*`), that file must exist on disk. RED now:
       five scripts reference missing files (`db:census`, `sweep`, `probe:ref`,
       `sweep:fullpage`, `census:interior`).

**Phase B — fixes (green)**

2. [ ] Retire the session-97 `gate:full` pins (3 tests: "ships a gate:full script",
       "gate:full = the standing gate chain + SIX drift gates", "every drift gate
       carries --fail-on-drift") — they pin removed infrastructure; KEEP the
       plain-`gate` chain pin (still true). The describe block's comment gains the
       retirement note citing this session.
3. [ ] Remove the six dead script entries via the package manager
       (`npm pkg delete scripts.db:census scripts.sweep scripts.probe:ref
       scripts.sweep:fullpage scripts.census:interior scripts.gate:full`) —
       never hand-editing the manifest.
4. [ ] README + AGENTS.md: add the **dev-vs-build race** troubleshooting row/note
       (never run `bun run build` while `bun run dev` is live on the same tree; if a
       reload loop appears, stop both, `rm -rf .next`, restart dev — the loop is
       turbopack watching a half-written `.next/`, not an app bug).

**Phase C — evidence + docs**

5. [ ] Recapture the screenshot battery from the remediated dev server (done this
       session — 13 images under `docs/screenshots/`; animation-sensitive frames
       refreshed).
6. [ ] Documentation alignment: unit count **382 HELD** (−3 retired pins + 3
       born-green guards: the file-existence guard, the `bun run` resolution
       guard, and the drift-gate tombstone) — README + CLAUDE.md counts stay
       at 382 (verified at the full-suite run); PAD revision block v2.1.0 →
       **v2.2.0** with this round's entry; `budget-wiser_SKILL.md` — audit
       history + the pre-ship checklist gains the dead-script guard lesson;
       AGENTS.md count-free (verified).
7. [ ] Full gate: `bun run gate` (lint → typecheck → test → build → smoke → e2e).

**Phase D — ship**

8. [ ] `docs/session_3.md` (the session log) + `worklog.md` (Task ID 192).
9. [ ] Commit (atomic: the remediation + docs) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`); verify the remote ref;
       shred the key afterward.

## 4. Risks and guards

- **No test deletion beyond the dead-infra pins**: the three retired tests pin a
  script that ceases to exist; keeping them would RED the suite against the fixed
  state. The replacement guard makes the whole class (script → missing file)
  structurally un-reintroducible — the general form subsumes the specific pins.
- **`gate:full` removal is the documented correct behavior**: the drift-gate family
  was CRM-specific tooling (walking CRM pages against the CRM reference); the Budget
  Wise parity workflow is agent-browser + VLM (this session's method). The standing
  `gate` chain (lint → typecheck → test → build → smoke → e2e) is unaffected and
  remains THE gate.
- **Count lockstep**: −3 +1 = 380; update README/CLAUDE in the same commit as the
  test change.
- **No gate weakening**: the guard ADDS an assertion class; nothing is suppressed.
