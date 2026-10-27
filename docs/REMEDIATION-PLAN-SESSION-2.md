# Budget Wise — Session 2 Remediation Plan

**Date:** 2026-10-27 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed

- Fresh clone at `98f0fdf` (docs commits by the owner; code HEAD `a435b3f`).
- Full gate run: lint 0/0 · typecheck 0 · **374/374 unit** · build · **14/14 smoke** · **61/61 e2e** (Chromium installed this session).
- Live reference re-audit (agent-browser, logged in with the owner's credentials,
  1512×945 + 390×844): login, dashboard, transactions, budgets, profile, the
  Add Transaction dialog, the in-place signup view, the 404 title, guest-root
  behavior — plus VLM side-by-side on the login page.
- Code census: dead-import sweep over `src/lib/*`, stale-branding sweep
  (`NEO CRM` / `neo-crm`), config review (package.json, next.config.ts,
  vitest/playwright configs), SEO surface review (sitemap.xml, robots.txt,
  manifest.json, metadata factory).

## 2. Findings

### Critical

| # | Finding | Evidence |
|---|---|---|
| F-1 | **404 page title ships CRM branding** — `src/app/not-found.tsx` renders `title: { absolute: "This Page Does Not Exist | NEO CRM" }`. Every 404 answers with the retired product's name in the tab. The reference's 404 title is `Budget Wise` (live-verified on `/nonexistent-route-xyz`). | DOM + source read |

### High (parity gaps)

| # | Finding | Evidence |
|---|---|---|
| F-2 | **Login OAuth row: 1 of 4 buttons.** The reference renders Google, Microsoft, Facebook, Apple (4 stacked buttons, white bg, slate-200 border, brand icons left-aligned). Ours renders only Google. VLM-verified structural difference. | Reference DOM snapshot + VLM comparison |
| F-3 | **package.json identity is the CRM's** — `name: "neo-crm"`, `description: "NEO CRM — Next.js 16 + React 19 + Prisma/SQLite CRM application"`. Ships in every artifact manifest, `bun run` banners, and the standalone package. | package.json read |

### Medium (visual polish)

| # | Finding | Evidence |
|---|---|---|
| F-4 | **Login logo is a bare blue disc** — the reference's logo slot is a white circular badge (h-20 w-20 / sm:h-24, ring-4 ring-white/50, shadow-lg) carrying a blue bar-chart mark + "BUDGET WISE" wordmark image. Ours renders a small solid blue circle inside the correct ring/shadow frame — visually a placeholder. | VLM comparison + reference DOM (supabase-hosted JPEG, unhotlinkable) |
| F-5 | **AI Insights empty-state copy drift** — ours: "Personalized spending analysis — press Generate." Reference: "Get personalized insights based on your spending patterns". | Reference a11y snapshot |

### Low (hygiene)

| # | Finding | Evidence |
|---|---|---|
| F-6 | **Dead modules + dead dependencies**: `src/lib/pdf-export.ts` (sole importer of `jspdf` + `html2canvas-pro`), `src/lib/download.ts`, `src/lib/format.ts` — zero consumers each (format.ts's comment cites a nonexistent `tests/format.test.ts`). | rg census over src/tests/prisma/scripts |
| F-7 | **Stale CRM comments** in live files: vitest.config.ts ("seams of the CRM… CSV codec"), `src/app/page.tsx` (root head "title 'NEO CRM'"), `src/app/manifest.json/route.ts`, `src/app/globals.css` header, `scripts/smoke-test.sh`, `next.config.ts` excludes list. Comments only — no behavior. | grep sweep |
| F-8 | **next.config.ts artifact excludes** must gain `budget-wiser_SKILL.md` (the file this round creates at the repo root — without the exclude it rides into the standalone artifact; smoke check 14's class). | next.config.ts read |

### Verified clean (no action)

- `.env` contract honored: `DATABASE_URL="file:../db/custom.db"`, `db/` at the repo root, `db-path` seam resolves for CLI/build/server (db:push + db:seed + smoke + e2e all green this session).
- Vitest + Playwright suites present and green (see §1); configs match the web-application skill's contract (`*.test.ts` only; standalone webServer on its own port + own `db/e2e.db`; storageState auth).
- Sitemap + robots + manifest: explicit route handlers, correct content types, capitalized-vs-lowercase route decision documented.
- SEO: title template, per-route canonical/OG/Twitter via `pageMetadata()`, PWA metas, `og-image.png` — pinned by `tests/metadata.test.ts` + `tests/pwa-metadata.test.ts`.
- **Mobile navigation battery re-verified live this session**: hamburger opens the drawer, nav-click closes + routes, Escape closes, resize-past-md auto-closes, no stranded body scroll-lock. The reference still ships NO phone navigation (links `display:none`, no hamburger — re-confirmed at 390×844) so our drawer remains the documented functional superset.
- Tailwind v4 discipline intact: CSS-first `@theme` only, v3 palette re-pins, `@custom-variant hover` unwrap, `--shadow-sm`/`--blur-sm` re-pins, vendored `tw-animate.css`, literal-class-only source.
- The reference's demo data was **reset to empty** since session 190 ($0.00 balance, no transactions). Our seed keeps the original demo month (README-documented) — a data-state note, not a divergence.
- Reference serves app HTML to guests; ours keeps the public landing + server-side `(app)` guard — the documented production-grade posture (PAD ADR-001).

## 3. Remediation ToDo (execution order, TDD)

**Phase A — red tests first**

1. [ ] `tests/metadata.test.ts`: pin the not-found route's absolute title as `Budget Wise` (regex over `src/app/not-found.tsx` source — fails against `| NEO CRM`).
2. [ ] `tests/login-views.test.ts`: extend the OAuth pin — the login card source must carry `Continue with Google`, `Continue with Microsoft`, `Continue with Facebook`, `Continue with Apple`, each wired to the not-configured `toast.info` fallback family.
3. [ ] `tests/app-chrome.test.ts` (or the dashboard's nearest pin file): pin the AI Insights empty-state copy `Get personalized insights based on your spending patterns` (regex over `dashboard-page.tsx`).
4. [ ] `tests/gate-script.test.ts` consumer list + a new identity pin: package.json `name` = `budget-wise` (the count-lockstep/identity seam).

**Phase B — fixes (green)**

5. [ ] `src/app/not-found.tsx`: absolute title → `Budget Wise` (reference-parity); refresh the stale comment.
6. [ ] `src/components/layout/login-card.tsx` + `src/lib/page-layout.ts` (`LOGIN_LAYOUT`): render the full 4-button OAuth row (Google, Microsoft, Facebook, Apple) — same white/slate-200 button anatomy, inline brand SVG icons, the shared not-configured `toast.info` fallback ("Microsoft sign-in not configured" family). Keep the existing `space-y-3` wrap structure the login-views regex pins.
7. [ ] Login logo: replace the bare blue disc with an inline-SVG brand mark (blue bar-chart glyph + "BUDGET WISE" micro-wordmark, white badge, ring/shadow frame unchanged) — visually mirrors the reference's image slot without hotlinking its supabase JPEG.
8. [ ] `src/app/(app)/dashboard/dashboard-page.tsx`: AI Insights empty-state copy → the reference's sentence.
9. [ ] package.json identity → `name: "budget-wise"`, description "Budget Wise — Next.js 16 + React 19 + Prisma/SQLite personal finance application" (via `npm pkg set`, never hand-editing dependency blocks).
10. [ ] Remove dead modules `src/lib/pdf-export.ts`, `src/lib/download.ts`, `src/lib/format.ts`; `bun remove jspdf html2canvas-pro` (package-manager-only removal).
11. [ ] Stale-comment cleanup: vitest.config.ts, `src/app/page.tsx`, `src/app/manifest.json/route.ts`, `src/app/globals.css` header, `scripts/smoke-test.sh`, `next.config.ts`.
12. [ ] `next.config.ts` excludes += `budget-wiser_SKILL.md` (+ keep `neo-crm_SKILL.md` — it remains at the root as the lineage reference).

**Phase C — the skill document**

13. [ ] Create `budget-wiser_SKILL.md` at the repo root per `skills/to-distill-project-into-skill/SKILL.md` (six-phase process, ~20 sections, codebase-verified: versions, tokens, route map, anti-patterns, debugging guide, pre-ship checklist, lessons from both the transformation round and this remediation round).

**Phase D — evidence + docs**

14. [ ] Recapture the screenshot battery from the remediated dev server → `docs/screenshots/` (login with the 4-button row, all four pages desktop + mobile, drawer open, both dialogs, landing).
15. [ ] VLM side-by-side re-verification of the login page vs the reference (the round's headline fix).
16. [ ] Documentation alignment: README (features/testing counts if changed), AGENTS.md (commands unchanged; note the identity fix), CLAUDE.md, PAD (remediation-round revision entry + known-debt updates), `worklog.md` (session record), `.env.example` (verified matching — no env changes this round).
17. [ ] Full gate: `bun run gate` (lint → typecheck → test → build → smoke → e2e).

**Phase E — ship**

18. [ ] Commit 1 (code + tests): the remediation. Commit 2 (docs): screenshots + SKILL.md + doc updates. Conventional Commits, why-focused messages.
19. [ ] Push `HEAD:refs/heads/main` via `docs/ssh_git_wrapper_v3.py` (runbook: `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`); verify the remote ref; shred the key afterward.

## 4. Risks and guards

- **The login-views structure regex (line ~353)** pins `[w-full + space-y-3 wrap] → Continue with Google → divider → form`. The 4-button row stays inside the same wrap → regex stays green by construction; verified against the regex text before editing.
- **The `toast.error/success` zero-toast pin** — new OAuth buttons reuse `toast.info` only → unaffected.
- **e2e a11y two-gate** — new brand SVGs need `aria-hidden` (decorative, the button text carries the name); icon-only controls keep labels.
- **Count lockstep** — unit-test count will grow (4 new pins); update README/AGENTS/CLAUDE numbers in the same commit as the test change.
- **No gate weakening** — every fix is additive or a copy-true-up; no suppressed assertions.
