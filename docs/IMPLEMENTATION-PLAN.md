# Budget Wise Clone — Implementation Plan

**Task ID:** 190 · **Date:** 2026-10-27 · **Branch:** `main` only

## 1. Situation

The repository (`nordeim/budget-wiser`) currently hosts **NEO CRM** — a mature,
189-session parity clone of a Base44 *CRM* workspace
(`neo-crm-8ab2c17c.base44.app`). This task targets a **different reference
app**: `https://budget-wiser.base44.app/` ("Budget Wise") — a personal
finance app. The two apps share nothing domain-wise, so this is a **domain
transformation**: keep the repo's production-grade infrastructure as
scaffolding, replace the CRM domain with the Budget Wise domain.

## 2. Reference audit (live, agent-browser, logged in)

Verified against the live reference at 1512×945 and 390×844:

| Surface | Findings |
|---|---|
| **Chrome** | Sticky top navbar (`bg-white/80 backdrop-blur border-b h-16`), gradient slate-900→700 logo tile (lucide `wallet`) + "BudgetWise" wordmark; desktop nav pills `hidden md:flex` (active `bg-slate-900 text-white`; inactive `text-slate-600 hover:bg-slate-100`); capitalized routes `/Dashboard /Transactions /Budgets /Profile`; root `/` = dashboard |
| **Mobile nav** | **The reference ships NO mobile navigation** (links `display:none` below `md`, no hamburger) — a functional gap our superset closes with the repo's Radix-Dialog Sheet drawer (hamburger `< md`) |
| **Dashboard** | H1 + "October 2026 Overview" + Set Budget (outline) / Add Transaction (dark) buttons; 4 KPI cards (Balance + emerald ↑% saved badge; Income emerald-tint; Expenses red-tint; Transactions count "This month"); Spending-by-Category donut (recharts); Budget Progress (per-category bars or empty state); Spend Summary (This Week/This Year tabs, weekly bar chart Mon–Sun); Recent Transactions (7/12); AI Insights (5/12, indigo tint, Generate) |
| **Transactions** | H1 + "Manage your income and expenses" + Add Transaction; Total Income / Total Expenses summary; search box; All Types + All Categories filters; rows with tinted category icon, name, full date, amount, delete (confirmation dialog) |
| **Budgets** | H1 + "October 2026 spending limits" + Set Budget; Overall Budget Usage bar + %; Active / On Track / Over Budget KPI cards; per-category budget cards ("$X of $Y", On Track badge, remaining, delete → alertdialog); empty state with "Set Your First Budget" |
| **Profile** | Avatar (initial/photo + camera upload), username, email, "user" role badge, "Member since …"; Preferences (Currency USD/EUR/GBP/CAD/AUD, About Me 0/120, Monthly Savings Goal, Save); Financial Overview (month/year income-expenses, budget used %, total tx); "2026 Summary" (earned/spent/net saved) |
| **Dialogs** | Add Transaction: Expense/Income tabs, Amount $, Category select, native Date, optional Description, submit disabled-until-valid ("Add Expense"/"Add Income"). Set Budget: Category + Monthly Limit. Delete Budget: alertdialog Cancel/Delete |
| **Categories** | Expense: Food & Dining, Transport, Entertainment, Shopping, Bills & Utilities, Healthcare, Education, Other · Income: Salary, Freelance, Investment, Gift, Other |
| **Auth** | Login card: OAuth buttons (decorative parity) + email/password + Sign in; forgot-password; sign-up link |
| **Design language** | slate palette, system font stack, `bg-slate-50` body, white `rounded-2xl` cards + `border-slate-100` + `shadow-sm`, emerald=income/positive, rose/red=expense, indigo=AI, lucide icons |

## 3. Architecture decisions

- **Keep** (production infrastructure): scrypt/HMAC cookie auth + rate-limit +
  verification/reset funnels (`src/lib/auth*`, `password.ts`, `rate-limit.ts`,
  `verification*.ts`), the SQLite path seam (`db-path.ts`),
  `boot-env`/`instrumentation`, UI primitives (`components/ui/*`), recharts
  wrapper (`components/charts`), the mobile-nav Radix Sheet pattern, Toast,
  vitest + playwright harness, SSH wrapper workflow.
- **Replace**: Prisma domain models, all app pages, domain API routes, the
  client store, the app shell (sidebar → top navbar), nav-config, seed.
- **Mobile nav (superset):** hamburger button visible `< md` opening the Radix
  Sheet drawer with the 4 Budget Wise links; auto-close past `md`; scroll lock;
  route-change close — the repo's session-147 pattern, re-skinned.
- **Routes:** capitalized paths per reference (`/Dashboard`, `/Transactions`,
  `/Budgets`, `/Profile`) with lowercase redirects for canonical safety; root
  `/` serves the dashboard when authed, landing when not.
- **Data model:**
  - `User` — auth columns (kept) + `currency`, `aboutMe`, `savingsGoal`,
    `photoUrl`, `name`, `role`.
  - `Transaction` — `type` (income|expense), `amount`, `category`,
    `date` (DateTime, day precision), `description?`, `userId`.
  - `Budget` — `category`, `monthlyLimit`, `month`, `year`, `userId`,
    unique `(userId, category, month, year)`.
- **Tailwind v4 discipline** (per `docs/Tailwind-V4-Validation-Report.md` +
  repo skill): CSS-first `@theme` only (no config JS), literal hex tokens, the
  vendored `tw-animate.css` for Radix `data-[state]` animations, no `hidden`
  attribute fighting display utilities, the v3-palette re-pin block retained
  (slate/emerald/rose/indigo families needed by Budget Wise), `@custom-variant
  hover` unwrap retained, `--shadow-sm`/`--blur-sm` re-pins retained.

## 4. Build order (TDD where logic is non-visual)

1. `.env` with `DATABASE_URL="file:../db/custom.db"` (db/ at repo root) — done.
2. Prisma schema swap + `db:push` + new seed (demo user matching the reference
   login + October 2026 transactions mirroring the reference data).
3. Domain libs: `categories.ts` (both vocabularies + icon/color maps),
   `currency.ts` (USD/EUR/GBP/CAD/AUD symbols), `budget-math.ts` (spent,
   remaining, pct, on-track), `dashboard-data.ts` (aggregations). Unit tests
   for each (vitest).
4. API routes: `transactions` (+ `[id]` delete), `budgets` (+ `[id]`), `dashboard`,
   `profile` (GET/PATCH). Zod schemas. Keep `auth/*`, `health`, `uploads`.
5. Shell rewrite: `topbar` → `site-nav` (sticky navbar + hamburger), mobile
   Sheet drawer, footer. Page layout contracts updated.
6. Pages: Dashboard, Transactions, Budgets, Profile (+ dialogs). Charts wired
   to recharts.
7. Landing/login/signup/reset branding → "Budget Wise" slate identity.
8. CRM removal: old pages, API routes, store, CRM-only scripts/tests,
   archived skill tarballs.
9. Test suite: vitest unit (new domain) + playwright e2e (auth, pages,
   dialogs, **mobile navigation spec**, a11y smoke). Configs updated.
10. Gate: lint → typecheck → test → build → smoke → e2e.
11. Visual parity check vs reference screenshots (agent-browser side-by-side).
12. Screenshots → `docs/screenshots/`.
13. Docs: README, AGENTS.md, CLAUDE.md, Project_Architecture_Document.md
    (per the four repo skills), worklog.md.
14. Commit + push via `docs/ssh_git_wrapper_v3.py` (main only).

## 5. Verification gate

`bun run lint && bun run typecheck && bun run test && bun run build &&
./scripts/smoke-test.sh && CI=1 bun run test:e2e` — plus the agent-browser
mobile-nav battery (open/close/escape/scrim/route-change/resize auto-close)
and side-by-side visual comparison on all four pages at desktop + phone axes.

## 6. Open questions resolved by recommendation

- **OAuth buttons on login:** render as visual parity elements that route to a
  "social login not configured on the self-hosted clone" notice (the reference
  uses hosted Base44 auth; email/password is the self-hosted path).
- **AI Insights "Generate":** deterministic, offline insights generator
  (top-category call-outs, savings-rate, budget warnings) — no external LLM
  dependency, keeping the production build hermetic.
- **Spend Summary "This Year":** yearly aggregation of the same series.
- **Currency preference:** display-layer formatting only (USD default).
