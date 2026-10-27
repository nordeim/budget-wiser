# AGENTS.md

Guidance for AI coding agents working in this repository. Every line answers: *would an agent likely miss this without help?* If not, it is not here.

## What this is

**Budget Wise** — a self-hosted personal finance app (Next.js 16 App Router + React 19 + Prisma/SQLite + Tailwind CSS v4), a functional superset of the Budget Wise reference app with visual parity. Four app pages (Dashboard, Transactions, Budgets, Profile), a public marketing landing at `/`, and a hardened email/password auth stack.

## Commands

| Task | Command |
|---|---|
| Install | `bun install` |
| Dev server | `bun run dev` (port 3000) |
| DB push + seed | `bun run db:push && bun run db:seed` |
| Lint (0 warnings allowed) | `bun run lint` |
| Typecheck | `bun run typecheck` |
| Unit tests | `bun run test` (Vitest, `*.test.ts`) |
| E2E tests | `bun run test:e2e` — **requires `bun run build` first** (boots `.next/standalone/server.js`) |
| Full gate | `bun run gate` (lint → typecheck → test → build → smoke → e2e) |
| One unit file | `bunx vitest run tests/budget-math.test.ts` |
| One e2e test | `bunx playwright test tests/e2e/app-flows.spec.ts:10` |

**Run the gate before pushing.** There is no hosted CI — the local gate is the only gate.

**Never run `bun run build` while `bun run dev` is live** — both write `.next/`, and turbopack watching a half-written tree enters an endless full-reload loop (page re-fetches every ~300ms). If it happens: stop both, `rm -rf .next`, restart dev. The gate's own chain is safe (build and e2e run sequentially).

## Architecture facts an agent will guess wrong

- **The store is Zustand, not React Query/SWR.** One client store (`src/stores/budget-store.ts`) holds session user, transactions, budgets, dashboard aggregates, and profile. Actions call the API envelope then refresh the affected slices. `call()` (inside the store) is the only sanctioned JSON client.
- **Money math lives server-side.** `/api/dashboard` computes every number the dashboard renders; the client never re-derives it. Pure helpers (rounding, buckets, ranges) live in `src/lib/budget-math.ts` — unit-tested, importable both sides.
- **Routes are BOTH casings.** Nav hrefs are capitalized (`/Dashboard`, `/Transactions`, `/Budgets`, `/Profile`) — the reference's own form. Lowercase folders carry the implementation; the capital aliases are `.jsx` re-export stubs. **Never make the alias a `.ts`/`.tsx` file** — TS1149 fires on same-program paths differing only in casing. **The stubs MUST re-export the lowercase page's `metadata`** (`export { metadata } from "../transactions/page"`) — without it the alias route silently serves the layout-default tab title (found live in s196; /Dashboard is metadata-less by design — both apps title the dashboard "Budget Wise").
- **The root not-found's title interpolates the path via middleware.** `src/middleware.ts` stamps `x-pathname` on every routed request (the only way an unmatched path reaches the render — no path header exists otherwise); `not-found.tsx`'s generateMetadata humanizes it through `src/lib/not-found-title.ts` (the reference's probed form: `<Humanized last segment> | Budget Wise`, hyphens + camelCase split). Do not "simplify" the middleware away — a static title or a client document.title effect both lose (the effect gets re-applied over by the metadata reconciliation during hydration — probed).
- **The (app) route group guards server-side.** A guest never receives app-page HTML — `GuestLoginRedirect` lands them on `/login?from_url=<abs>`. The landing at `/` is public and outside the group.
- **`main` scrolls at the window level.** Sticky navbar + document flow — there is no shell overflow gymnastics, and NO scroll locks anywhere (the drawer's body lock was retired with the drawer).
- **The mobile nav is the reference's bottom tab bar** (a `md:hidden fixed bottom-0` white bar, byte-mirrored — live-extracted when the reference redesigned its phone nav, session 193; the active item's ink rides its svg too, session 194). It is plain fixed chrome, NOT an overlay: no portal, no focus trap, no scroll lock, no matchMedia. The shell rides the reference's exact hierarchy — `body (WHITE) > DIV > DIV.min-h-screen.bg-slate-50 > [NAV, bar, MAIN.pb-20 md:pb-0 > DIV.min-h-screen.bg-slate-50 > page]` — the outer surface wrapper (session 195) puts slate-50 behind the translucent navbar (its white/80 backdrop renders rgb(254,254,255), not pure white), and the pb-20 clearance guarantees scrolled-to-end content clears the fixed bar below md. Keep its battery green in `tests/e2e/mobile-navigation.spec.ts`. The reference's app surface ships NO footer — do not add one to the app shell (the landing keeps its own).
- **The surface family is stock shadcn** (session-194 re-mirror): the cards are `rounded-xl bg-card border-0 shadow-sm` + the p-6 pb-2 header + tracking-tight DIV titles; the header buttons are the h-9 shadcn forms; the pages stack their headers below sm with per-page containers (7xl/5xl/5xl/4xl); the category palette is the round-trip-probed set (food emerald+Utensils, shopping amber, bills red+Receipt…). The record families live in `page-layout.ts` — new surfaces add a record, never inline strings.

## Tailwind CSS v4 — read this before writing classes

The config is **CSS-first**: every token lives in `src/app/globals.css` `@theme`. **There is no `tailwind.config.js` and there must never be one.**

- **The v3 palette is re-pinned.** Tailwind v4's default palette is NOT v3's — `globals.css` re-pins the v3 hex values for every literal (family, step) pair used in `src/` (slate, emerald, rose, indigo, amber…). Do not "clean these up" — removing them drifts every chromatic surface.
- **`shadow-sm` and `blur-sm` are re-pinned** to v3's computed values (v4 renamed the scales one step). Same rule: leave them.
- **`hover:` is unwrapped** via `@custom-variant hover (&:hover)` — hovers must work on touch. Do not remove this.
- **Never fight display utilities with the `hidden` attribute** — mount/unmount instead.
- **Radix animations** ride the vendored `src/app/vendor/tw-animate.css` (`data-[state=open]:animate-in` family). Tailwind v4 does not ship these by default.
- **Literal class strings only in source** — v4 scans for literals; dynamic `` `grid-cols-${n}` `` templates never compile (see `GRID_COLS` in `tabs.tsx` for the static-map pattern).

## Database seam — the one true path

`DATABASE_URL="file:../db/custom.db"` (the mandated contract). The path is **relative to `prisma/schema.prisma`**, and `src/lib/db-path.ts` normalizes it for every consumer (CLI, build, standalone server) so nobody ever lands on a parent-of-repo database. Never write an absolute dev path; production deployments are the documented exception (absolute, `docs/DEPLOYMENT.md` §4). The contract is pinned by `tests/db-path.test.ts`.

## Conventions that differ from defaults

- **API envelope, always**: `{ ok: true, data } | { ok: false, error: { code, message } }` — `ok()`/`ERR` from `src/lib/api.ts`. Zod schemas (`src/lib/schemas.ts`) parse every body via `parseBody` (bounded reader + CSRF content-type gate). DB-bound checks (ownership, FK existence) stay route-side.
- **Ownership scoping answers 404, not 403** — a foreign id must not leak existence.
- **Error messages are pinned strings.** The unit + e2e suites assert exact user-facing words; changing one REDs tests by design. Update the pin and the string together.
- **Class contracts live in `src/lib/page-layout.ts`** — pages consume the exported records (`SITE_NAV`, `KPI_CARD`, `PANEL`, …) instead of hand-writing class strings; `tests/app-chrome.test.ts` pins them. New surfaces add a record, not inline strings.
- **Comments explain WHY, cite sessions/evidence.** The codebase's institutional memory lives in targeted comments (the parity findings, the bug classes). Preserve them when editing.
- **Conventional Commits, atomic units.** Commit messages explain why, not just what.

## Testing map

| Layer | Files | What it proves |
|---|---|---|
| Domain unit | `tests/{categories,budget-math,currency,domain-schemas}.test.ts` | vocabularies, money math, Zod contracts |
| Chrome contracts | `tests/app-chrome.test.ts`, `tests/landing-page.test.ts` | layout records, nav config, shell wiring |
| Infra seams | `tests/{db-path,auth,auth-contract,auth-reset,rate-limit,login-reset,login-views,metadata,pwa-metadata,http-headers,boot-env,password-seam,upload-api,uploads-path,error-boundaries,gate-script,type-gate,body-pregate,reset-flow,avatar,not-found-title}.test.ts` | the scaffold's hardened seams + the 404 title helpers + the alias metadata pins |
| E2E | `tests/e2e/*.spec.ts` | real UI against the production standalone build |

The e2e suite shares one seeded SQLite file (`db/e2e.db`) — `workers: 1` is load-bearing. The auth endpoints are rate-limited per IP/15min; **repeated local e2e runs can trip the limiter** — export `CI=1` (forces a fresh server = fresh in-memory buckets) or wait out the window.

## Do-not-touch list

- `src/lib/db-path.ts` — the seam that keeps every consumer on the right database.
- The `@theme` re-pin blocks in `globals.css` (palette, shadow, blur, hover variant).
- `scripts/smoke-test.sh`'s assertion ladder — it is the ship gate's smoke leg.
- The `.jsx` capital-route aliases (the TS1149 guard).
- `next.config.ts`'s `outputFileTracingExcludes` — the artifact-hygiene cure (a bloated artifact once shipped .env + .git + db inside).

## Git

- **main only.** No feature branches. Push via `docs/ssh_git_wrapper_v3.py` (the runbook: `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`) — keys never live inside the repo.
- Push AFTER the gate is green and commits are on main.
