---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Budget Wise

<!-- REQUIRED -->
## Core Identity & Purpose

Budget Wise is a production-grade, self-hosted personal finance application — a functional superset of the Budget Wise reference app (budget-wiser.base44.app) with visual parity. It tracks income and expenses, sets per-category monthly budgets, and renders a live dashboard of the user's financial health. Maintained as a single-deployable Next.js standalone app with SQLite persistence.

<!-- REQUIRED -->
## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

1. **ANALYZE** — Mine requirements multi-dimensionally; identify explicit needs, implicit constraints, ambiguities.
2. **PLAN** — Structured execution roadmap; validate before implementing.
3. **VALIDATE** — Checkpoint: does the plan satisfy the acceptance criteria?
4. **IMPLEMENT** — Modular, tested, documented builds.
5. **VERIFY** — Rigorous QA: the full gate chain, parity checks, edge cases, accessibility.
6. **DELIVER** — Handoff with knowledge transfer (worklog, docs).

### Project-Specific Principles

- **Parity with the reference, superset where it is broken.** Visual parity at desktop + phone axes; functional supersets must be invisible to pixels (the mobile drawer) or strictly additive (AI insights, a11y naming).
- **The gate is the only gate.** No hosted CI exists — `bun run gate` (lint → typecheck → test → build → smoke → e2e) must be green before any push.
- **Money math is server-side and unit-tested.** The client renders; it never re-derives.
- **Nothing reaches Prisma unvalidated.** Zod at every boundary; DB-bound checks stay route-side.

<!-- REQUIRED -->
## Implementation Standards

### General Coding Practices

- **Early returns** over nested conditionals; composition over inheritance.
- **Strict TypeScript** — no `any` (use `unknown`); the build IS the type gate (no `ignoreBuildErrors`).
- **Named domain types** in `src/types/index.ts` (the API wire shapes).
- **Pure functions** for domain math (`src/lib/budget-math.ts`) — unit-testable both sides of the wire.

### Language & Framework Guidelines

- **React 19**: no `forwardRef` wrappers needed; adjust-state-during-render for same-component state resets (see `app-shell.tsx`); `key`-based resets otherwise.
- **Zustand** for all server state — one store, selector subscriptions, no prop drilling of server data.
- **Tailwind v4 CSS-first**: tokens in `globals.css` `@theme` only; literal class strings (v4 scans source); static maps for dynamic variants.
- **Radix primitives** for every overlay (Dialog, AlertDialog, Select, Tabs) — never hand-roll focus trapping or dismissal.

<!-- REQUIRED -->
## Development Workflow

### Environment Setup

```bash
bun install
cp .env.example .env        # DATABASE_URL="file:../db/custom.db" + AUTH_SECRET
bun run db:push && bun run db:seed
bun run dev                 # http://localhost:3000
```

Demo login: `sepnetflix2023@outlook.com` / `$Abcd1234`.

### Build Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Development server (port 3000) |
| `bun run build` | Production standalone build (the type gate) |
| `bun run test` | Vitest unit layer |
| `bun run test:e2e` | Playwright against the standalone build |
| `bun run lint` / `bun run typecheck` | ESLint (0 warnings) / tsc |
| `bun run gate` | The full chain — run before every push |

<!-- REQUIRED -->
## Testing Strategy

### Test Pyramid

- **Unit (Vitest, 374 checks)**: domain math, vocabularies, Zod contracts, infra seams (db-path, auth, rate-limit, metadata), chrome contracts.
- **E2E (Playwright, 61 checks)**: real UI against the production standalone server on an isolated port + seeded `db/e2e.db`. Auth rides a saved storageState (the rate limiter forbids per-test logins).
- **Smoke (14 checks)**: the standalone artifact boots, serves, walls, and ships clean.

### Test Rules

- Bug fixes require a regression test that fails before and passes after.
- Never weaken a gate (lint rules, type strictness, assertions) to make a pass.
- E2E tests that fill forms fed by async fetches must **wait for hydration first** (the fill-vs-hydration race appends instead of replaces on controlled inputs).
- The e2e suite shares one SQLite file — `workers: 1` is load-bearing.

<!-- REQUIRED -->
## Code Quality Standards

### Linting & Formatting

```bash
bun run lint        # eslint . --max-warnings 0
bun run typecheck   # tsc --noEmit
```

<!-- REQUIRED -->
## Git & Version Control

### Branching Strategy

**main only** — no feature branches. The SSH wrapper (`docs/ssh_git_wrapper_v3.py`) pushes `HEAD:refs/heads/main` and verifies the remote ref.

### Commit Standards

- Conventional Commits, atomic units — the message explains why.
- Never commit secrets, keys, or `db/` content (git-ignored).

<!-- REQUIRED -->
## Error Handling & Debugging

- API errors answer the envelope with pinned, user-facing strings — never a raw 500 body.
- Client actions surface `Result<T, string>` errors in the dialog (role=alert), never silently.
- Reproduce before fixing; fix root causes; add the regression test. The debugging playbook's hard lessons are distilled in comments at the seams they protect.

<!-- REQUIRED -->
## Communication & Documentation

- Comments explain WHY with evidence (live-probed findings, session citations); delete stale ones when the code they describe changes.
- `worklog.md` records every working session — append, never overwrite.
- The four root documents divide cleanly: README (users), AGENTS.md (agents), CLAUDE.md (this file), PAD (architecture).

<!-- REQUIRED -->
## Project-Specific Standards

### Architecture

- **Route groups**: `(app)` = server-side session-guarded app; `(marketing)` = auth-gated marketing pages; root `/` = public landing.
- **Capitalized route aliases**: the reference's nav hrefs (`/Dashboard` etc.) are `.jsx` re-export stubs over lowercase folders — never `.ts` (TS1149).
- **One JSON client**: the store's `call()` — every fetch rides the envelope.

### API Design

| Route | Methods | Notes |
|---|---|---|
| `/api/transactions` | GET, POST | day-precision dates; type-scoped categories |
| `/api/transactions/[id]` | DELETE | ownership-scoped 404 |
| `/api/budgets` | GET, POST | GET pre-joins spent; POST upserts (user, category, month, year) |
| `/api/budgets/[id]` | PATCH, DELETE | limit updates + the confirm-delete |
| `/api/dashboard` | GET | every dashboard number, computed server-side |
| `/api/profile` | GET, PATCH | identity + preferences + overview rollups |
| `/api/auth/*` | — | login, signup, logout, me, verify, resend, forgot/reset |
| `/api/health` | GET | the boot + db round-trip probe |

### Database / Data Layer

Prisma + SQLite. Three models: `User` (auth + preferences), `Transaction` (type/amount/category/day/description), `Budget` (category/monthlyLimit/month/year, unique per user+category+month+year). The relative `DATABASE_URL` resolves through `src/lib/db-path.ts` — the one true path seam.

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | SQLite location (schema-relative) | `file:../db/custom.db` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (build-inlined) | `http://localhost:3000` |
| `AUTH_SECRET` | Session HMAC key (required in prod) | `openssl rand -hex 32` |
| `NEO_PROXY_HOPS` | Rate-limit IP trust depth | `""` (default 1) |
| `NEO_DISABLE_IN_APP_OTP` | Hide verification codes in responses | `""` / `"1"` |
| `NEO_DISABLE_IN_APP_RESET` | Hide reset links in responses | `""` / `"1"` |

<!-- OPTIONAL -->
## Success Metrics

You are successful when:

- The full gate is green (374 unit + 61 e2e + 14 smoke) and stays green.
- Visual parity holds against the reference at both axes (VLM-verified structural parity).
- The mobile superset battery never regresses.
- No new lint suppressions, no weakened assertions, no secrets in the tree.
