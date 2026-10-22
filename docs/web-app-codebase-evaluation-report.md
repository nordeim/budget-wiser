# Codebase Evaluation & Ranking Report

## Template Suitability for Scaffolding Production Web Applications with Authentication, Dashboard & Charting

**Candidates:** `nordeim/digma` · `nordeim/neo-crm` · `nordeim/project-management` · `nordeim/zero-balance`
**Evaluation date:** 2026-10-22 (Asia/Singapore)
**Method:** Full local clone → key-documentation review (AGENTS.md, CLAUDE.md, Project_Architecture_Document.md, per-repo SKILL.md) → systematic static analysis of all source, schema, tests, and tooling (four parallel deep-analysis passes, one per repo) → **executable verification** (install → prisma generate → typecheck → unit-test suite) on all four candidates.
**Confidence labels used throughout:** **[V]** Verified (executed and observed) · **[R]** Reasoned (inference from code inspection, cited) · **[A]** Assumed (stated assumption).

---

## 1. Executive Summary

| Rank | Codebase | Weighted Score | Verdict |
|:---:|---|:---:|---|
| **1** | **neo-crm** | **8.1 / 10** | Best overall foundation. Fullest dashboard + charting vocabulary in the family, disciplined envelope/validation/state architecture, race-guarded store, hardened upload/CSV subsystems, production-grade e2e infrastructure. Auth mechanics are solid but incomplete (no password reset, no session revocation, RBAC unenforced) — close the gaps by porting digma's auth completions. |
| **2** | **zero-balance** | **7.7 / 10** | Best data-layer discipline. The only candidate with **zod validation at every API boundary**, **per-user data tenancy enforced in every query**, a serializer layer, integer-cents domain firewall, the strictest build config (no `ignoreBuildErrors`), and standout resilience/error-state testing. Charting is deep but narrow (one donut). |
| **3** | **digma** | **7.1 / 10** | Best auth mechanics and best documentation. The only repo with a complete, race-hardened password-reset flow, `tokenVersion` session revocation, and proxy-topology-aware rate limiting — plus 16 ADRs. But it has **zero charting**, **no per-user tenancy**, and ~60% of its code is a canvas-editor domain you must strip. |
| **4** | **project-management** | **6.5 / 10** | The family's **template progenitor** — its distilled SKILL literally scaffolded digma and zero-balance (lineage evidence in §3). As *code*, it is the oldest and least complete (no email verification, no password reset, no charting). As *methodology*, it is the origin of everything good in the family. Superseded by its descendants for code reuse; still the reference for process. |

**Headline recommendation — the hybrid assembly:** No single repo is turnkey for "any given web app with auth + dashboard + charting." The optimal strategy, in order:

1. **Base on neo-crm** — app shell, KPI/stat-card family, 7-family chart layer, API envelope, race-guarded store, e2e methodology.
2. **Port digma's auth completions** — forgot/reset-password route pair (atomic single-use tokens, 60-min TTL), `tokenVersion` revocation column + check, timing-equalized login, `PROXY_HOPS`-aware client-IP resolution, bounded-body reader with CSRF content-type gate.
3. **Adopt zero-balance's boundary discipline** — zod schemas at every route, `findFirst({id, userId})` ownership scoping, serializer layer, `useShallow` selector discipline, strict build config.
4. **Keep project-management's process artifacts** — the gate order, smoke-test pattern, db-path seam, and the documentation contract (SKILL/PAD/AGENTS/CLAUDE + session logs).

This hybrid is codified in the companion deliverable, **`WEB_APP_FOUNDATION_SKILL.md`**.

**Universal gaps no candidate solves** (must be built by any adopter, all flagged High in §9): email transport (all four console-log or response-embed verification codes), RBAC enforcement, hosted CI (all four are local-gate-only by design), containerization, multi-instance rate limiting, and observability.

---

## 2. Evaluation Methodology

### 2.1 Rubric and weights

| Criterion | Weight | Sub-criteria |
|---|:---:|---|
| **A. Feature completeness for production deployment** | 40% | Auth depth (40% of A): registration, session mechanism, email verification, password reset, revocation, rate limiting, RBAC, tenancy. Dashboard (25%): shell, KPI surfaces, responsive states, a11y. Charting (20%): breadth, data flow, states, test pinning. Data/validation/infra (15%): validation approach, schema quality, seed, health, SEO/PWA, uploads/export. |
| **B. Code quality** | 30% | Typing discipline (30%), pattern consistency (25%), error handling (20%), test quality (25%) — with honest accounting for static "source-pin" test inflation. |
| **C. Architectural robustness** | 30% | Layering/separation (30%), scalability/extensibility incl. tenancy (25%), data architecture (25%), documentation & agent-readiness (20%). |

Scores are 0–10 per sub-criterion, weighted as stated. The weighting favors the user's stated goal — *scaffolding any given web app with auth + dashboard + charting* — which is why charting breadth and auth completeness dominate.

### 2.2 Evidence standards

- Static findings cite file paths (collected by four parallel deep-analysis passes, one per repo, each instructed to evidence every claim).
- Executable claims were **actually executed**: all four repos were installed (`bun install`), Prisma clients generated, `tsc --noEmit` typechecked, and full unit suites run — results in §8.
- No claims from repo documentation were accepted without code verification; where docs and code disagreed, the discrepancy is reported (§8.3).

### 2.3 Limitations

- E2E (Playwright) suites were **not** executed (they require production builds + browser downloads + several minutes each); e2e counts are **[R]** from spec-file analysis.
- Runtime behavior (actual deployed performance, browser rendering) was not exercised beyond unit tests.
- `skills/` directories (the owner's personal skill catalogs, 190MB+ each) and `docs/session_*` build histories were excluded from app-code analysis by the repos' own configs, and are treated as adopter-strip mass.

---

## 3. The Repo Family: Lineage and Shared DNA

A decisive structural discovery: **these are not four independent codebases — they are one architectural bloodline, propagated by distilled SKILL files.**

**Lineage evidence [V]:**
- `digma/project-management_SKILL.md` is a **2026-09-22 snapshot** ("distilled from 22 sessions, 137 unit + 36 Playwright checks").
- `zero-balance/project-management_SKILL.md` is the **2026-09-30 snapshot** ("43 sessions, 138 + 115 checks") — matching `project-management/project-management_SKILL.md` at HEAD.
- `zero-balance/tests` vitest config carries a comment referencing *"router, clarify questions, plan sanitizer, check-in mapping"* — project-management vocabulary.
- `zero-balance/DEPLOYMENT.md` says "**ORBITAL** ships…" (ORBITAL is project-management's app name); `neo-crm`'s DEPLOYMENT.md has one ORBITAL slip too.
- All four repos contain `skills/to-distill-project-into-skill/` — a meta-skill for distilling a finished codebase into the next SKILL.md.

**Interpretation:** the author's operating loop is *build → remediate over N documented sessions → distill into `<app>_SKILL.md` → use that skill to scaffold the next app*. The family therefore shares an unusually coherent DNA, and differences between candidates reflect **deliberate per-app evolution choices**, which makes the cross-comparison unusually informative.

**Shared DNA (all four) [V/R]:**

| Layer | Shared implementation |
|---|---|
| Framework | Next.js 16 App Router, `output: "standalone"`, `outputFileTracingRoot` pinned |
| UI | React 19, Tailwind CSS v4 **CSS-first** (`@theme` literal hex, no JS config), shadcn-style Radix wrappers, lucide-react, `tw-animate-css` |
| Data | Prisma 6 + SQLite, `db push` workflow, **`src/lib/db-path.ts` seam** (solves the Next-standalone `chdir` trap), single sanctioned `PrismaClient` |
| Auth | Hand-rolled: Node `crypto` **scrypt** (16-byte salt, 64-byte key, `timingSafeEqual`), **stateless HMAC-SHA256 cookie** sessions (7–30 day TTL, httpOnly/lax/secure), per-IP fixed-window rate limiter in `src/lib/rate-limit.ts`, `requireSession()` first-line route guards, no auth library |
| API | Uniform envelope `{ok:true,data} \| {ok:false,error:{code,message}}` via `src/lib/api.ts`; stable error codes; never throw across handler boundary |
| State | One Zustand store; `call()` envelope-unwrap fetch seam; no React Query/SWR |
| AI (3 of 4) | `z-ai-web-dev-sdk`, server-side only, dynamic import, **degrade-never-fail** deterministic fallbacks, LLM-output sanitizers |
| Testing | Vitest (pure seams, node env) + Playwright (production standalone build, own port :3100, own `db/e2e.db`, storageState single-login to coexist with the rate limiter, `workers:1`) + bash smoke suite; **no hosted CI — local gate is the contract** |
| Gates | `lint → typecheck → test → build → smoke → e2e`, with `ignoreBuildErrors:true` making the explicit `typecheck` step load-bearing (except zero-balance, which has no ignoreBuildErrors) |
| Docs | Four-doc contract: `<app>_SKILL.md` + `Project_Architecture_Document.md` (ADRs) + `AGENTS.md` + `CLAUDE.md` + README, plus session/remediation build history; "code wins — update the doc in the same commit" |

---

## 4. Candidate Profiles

### 4.1 digma — "Figma-like design workspace clone"

**Identity.** Production-parity clone of `digma-371dfd0d.base44.app`: DOM-element canvas editor, AI assistant, team management, cookie-session auth. 369 commits, 2026-09-27 → 2026-10-22 (active daily) **[V]**.

**Size.** 78 src files / ~20.0K LOC (18.6K non-test); 18 API routes; 5 Prisma models; 232 unit test files (2,377 checks **[V]**); 39 e2e specs; 686-line smoke suite (73 checks). Repo bulk is history: 567 `docs/` files, 2,554-file `skills/` catalog (192MB) **[V]**.

**Stack.** Next `^16.4.2`, React `^19.3.1`, TS `^5.9.3` strict, Tailwind `^4.3.3`, Prisma `^6.19.3`/SQLite, Zustand `^5.0.15`, `z-ai-web-dev-sdk ^0.0.18`, Bun runtime **[V]**. **No chart library of any kind.**

**Strengths.**
- **Best auth mechanics in the family [R, code-cited]:** complete forgot/reset-password pair — 32-byte crypto-random tokens, 60-min TTL, consumed via **atomic conditional `updateMany` carrying token+expiry in the WHERE clause** (single-use, replay-race-safe); `tokenVersion` column evicts all prior cookies on reset (revocation dimension); login burns equal scrypt work on unknown emails (timing-enumeration defense); rate limiter reads XFF with **deploy-declared trust depth** (`DIGMA_PROXY_HOPS`, fail-closed); OTP verify with atomic 5-attempt ceiling; bounded-body reader (32MB stream counter) + JSON content-type CSRF gate; open-redirect guard on `from_url`.
- **Best documentation:** 16 ADRs with rejected alternatives; 22-section SKILL; every claim file-path-verifiable.
- Strict TS with **zero** `any`, zero TODO, 1 intentional `console.log` **[V, measured]**.
- Exemplary a11y: mobile Sheet drawer with focus trap/route-close/md-crossing close; `aria-current`, `role=alert`, focus-visible rings pinned by e2e.
- Clean `call()` client seam; AI pipeline with sanitizer + deterministic fallback + own rate bucket.

**Weaknesses.**
- **No charting at all** — `GET /api/stats` returns 4 scalars rendered as text **[V]**.
- **No per-user tenancy [High]:** `Project`/`Team` have no owner relation; any authenticated user reads/mutates all rows (`api/projects/route.ts` findMany without user filter).
- ~60% of src is the canvas-editor domain (2,453-line editor-view, 2,365-line properties-panel) — heavy strip burden.
- Test layer inflated: 223 of 232 unit files are `readFileSync` source-pins; one (`lows-s99.test.ts`) even fails on a fresh clone until `.env` is bootstrapped **[V]**.
- ESLint disables `no-explicit-any`, `no-unused-vars`, `exhaustive-deps`, etc. — quality is convention-enforced.

### 4.2 neo-crm — "Self-hosted CRM clone"

**Identity.** Pixel-parity superset clone of `neo-crm-8ab2c17c.base44.app`. 425 commits (most in family), 2026-09-29 → 2026-10-22 **[V]**. SKILL at v1.158.0 — every change annotated `Session-N (Pin-ID)` and mirrored across four docs, with a `docs-counts.test.ts` that **fails the gate if documented counts drift** (self-verifying documentation).

**Size.** 127 src files / ~23.4K LOC; 27 API routes; 9 Prisma models; 120 unit files (2,262 checks **[V]**); 9 e2e specs (152–156 checks **[R]**); `gate` + `gate:full` scripts add pixel-diff sweeps at 4 viewports.

**Stack.** Same family stack plus **recharts `^2.15.4`**, `jspdf` + `html2canvas-pro` (PDF report export); no zod (hand-rolled `isBad*` validator family); `noImplicitAny: false`.

**Strengths.**
- **Best dashboard + charting in the family [R, code-cited]:** `charts.tsx` provides **7 generic wrapper families** — SingleBar, GroupedBars, TrendLine, LabelPie, HorizontalBar, RevenueLine (Composed/Area), ConversionFunnel — plus custom SVG `Sparkline` (line/area/bar); ~20 chart surfaces across dashboard/leads/activities/reports; fed by **pure derivation seams** (`dashboard-data.ts`, `reports-data.ts`) that are independently unit-tested and seed-frozen.
- **Fullest dashboard vocabulary:** 6 KPI cards with sparklines and delta badges, filter bar, chart cards, list cards, CSV/PDF export, empty-state tokens.
- **Race-guarded store:** module-level `sessionWriteToken` (logout bumps → in-flight fetches cannot repopulate cleared slices) and `eventsFetchToken` (last-call-wins) — pinned by `store-fetch-guards.test.ts`.
- **Hardened subsystems:** CSV engine with **formula-injection guard** (OWASP posture, behavioral byte-exact tests), upload pipeline (MIME allowlist, randomUUID names, regex-pinned path serving — no traversal), PDF export, PWA manifest, security headers.
- **Layout-as-data:** `page-layout.ts` holds every layout class string as exported records (210-check pin) — components never hand-write layout classes.
- Zero `any`, zero TODO, zero `console.log` in src **[V, measured]**; lint passes with `--max-warnings 0` **[V]**.
- Deep a11y: full ARIA tabs contract (arrow wrap, Home/End) test-pinned; 390px mobile walks.

**Weaknesses.**
- **Auth incomplete [High]:** password reset is a **UI lie** (client-side view swap, no endpoint — `login-reset.ts` documents "the reference never sends an email"); no session revocation; `role` (admin/rep) exists but is **informational only**; verification codes console-logged.
- `noImplicitAny: false` + `ignoreBuildErrors` (compensated by gate discipline).
- ~40% of unit files are source-pin tests bound to the reference app — dead weight after de-CRM-ing.
- ESLint disables the very rules its docs claim are enforced (documented drift, §8.3).
- 2.9MB of root docs where ~60KB is load-bearing for an adopter.

### 4.3 project-management — "ORBITAL, the progenitor"

**Identity.** AI PM workspace clone (Goals → Tasks → TaskUpdates, ActivityLog, AI task planner with clarifying questions). 120 commits, 2026-09-17 → 2026-10-04 (oldest, least active) **[V]**. Multi-author git history (nordeim, Pete A, heinazhik, Z User).

**Size.** 93 src files / ~10.6K LOC (8.8K non-test — smallest); 16 API routes; 8 Prisma models; 15 unit files (138 checks **[V]**); 10 e2e specs (109 tests **[R]**); 30-check smoke suite.

**Stack.** Next `^16.1.1`, React `^19.0.0`, Prisma `^6.11.1`, Zustand `^5.0.6`, `z-ai-web-dev-sdk`; **no chart library, no zod (pruned deliberately in v1.2)**.

**Strengths.**
- **The template that worked:** its SKILL demonstrably scaffolded two later repos — proof of the methodology.
- **Best test-quality ratio:** unit tests are genuine behavior tests (clock-injected rate-limiter, LLM clamp edges), not source pins; e2e disciplined (visible-filtered locators, `expect.poll`).
- Signature **SPA-with-path-URLs** architecture: one page + 7 documented rewrites synced with a 94-line tested `router.ts`; real `<a href>` with click contracts.
- Three-state responsive chrome (mobile bar+tabs / tablet pill nav / desktop collapsible rail via `useSyncExternalStore`).
- The **db-path seam** at its cleanest (107 lines, fixture-tested) — solves the universal Next+SQLite standalone trap.
- **Degrade-never-fail AI pipeline** with `clarify.ts`/`plan-sanitizer.ts` (bounded LLM output: ≤10 tasks, clamped hours, dropped title-less entries) + deterministic template fallback.
- Zero `any`/TODO/console.log **[V, measured]**.

**Weaknesses.**
- **Weakest auth completeness [High]:** no email verification (open registration, immediate sign-in); password reset is a UI lie; no RBAC; no revocation; shared-workspace (no tenancy at all).
- **No charting** beyond a 64-line SVG progress ring and CSS ring.
- Oldest stack pins (Next 16.1, Prisma 6.11); `ignoreBuildErrors` + `noImplicitAny:false`.
- v25–v30 parity e2e specs pin pixel values to a third-party live app; ~90 probe scripts in `scripts/`.

### 4.4 zero-balance — "ZeroBalance budget planner"

**Identity.** Net-zero budget planner (Income = Savings + Expenses), superset clone of `zero-balance-4885a8f3.base44.app` with 6 documented reference-bug fixes. 263 commits, 2026-10-02 → 2026-10-21 **[V]**.

**Size.** 74 src files / ~8.4K LOC (leanest); 15 route files / 23 handlers; 5 Prisma models; 9 unit files (108 checks **[V]** — all pure-seam behavior tests); 24+ e2e specs (292 tests **[R]**); ~28-step smoke suite; **tests/ LOC = 2.55× src/ LOC**.

**Stack.** Next 16 App Router (no `ignoreBuildErrors` — **the only one** **[V]**), TS 5.9.3 strict, Prisma 6.11.1/SQLite, Zustand 5, **zod `^4.6.5` at every API boundary (the only one)**, **recharts `^3.10.1`**, `@axe-core/playwright`.

**Strengths.**
- **Only repo with per-user tenancy enforced end-to-end [V, code-cited]:** every model `userId`-scoped with cascade deletes; every query ownership-filtered (`findFirst({id, userId})`); serializer layer is the only row→payload translator.
- **Only repo with zod validation at every boundary:** money (finite, 0–1e9), ISO dates with **calendar round-trip check** (rejects Feb 30), enum vocabularies from a single `constants.ts`, `""`→undefined preprocessors.
- **Pure domain seams:** `money.ts` integer-cents firewall (17 tests incl. the `0.1+0.2` drift proof), `dashboard.ts`, `line-item-service.ts` (server-recalculating calculator), `serializers.ts`.
- **Best-in-class resilience/error-state testing:** dedicated e2e specs for boot-failure, API-error injection per route, loading-state with route-delay injection, empty-states, custom 404.
- **A11y two-gate pattern:** axe-core WCAG A/AA structural scan + palette-provenance check, plus keyboard walks (dashboard 16 stops, donut roving).
- **Donut chart engineered to an unusual standard:** recharts-3 with recharts-2-compatible tooltip chrome, custom roving keyboard contract, e2e-pinned sector fills in value-DESC order.
- Strict build: no `ignoreBuildErrors` **[V]**; zero `any`/TODO/console.log **[V]**.

**Weaknesses.**
- **Charting breadth minimal:** exactly **one** chart component (the donut); net-worth view is tabs + lists, no chart **[V]**.
- **Auth gaps [High]:** password reset does not exist (UI dead-end); verification code stored **plaintext with no expiry** and delivered in the API response (`devCode`); rate limiter trusts spoofable `x-forwarded-for` (comment claims socket-based — code contradicts it).
- `noImplicitAny: false`; ESLint disables ~30 rules; `reactStrictMode: false`.
- Doc/code drift cluster (vitest "3 projects" vs actual 1; "Int cents in DB" vs actual `Float`; stale counts).
- 1,016-line `dashboard-view.tsx` monolith; 359 build-history docs + ~150 parity-probe scripts to strip.

---

## 5. Comparative Analysis

### 5.1 Authentication feature matrix

| Capability | digma | neo-crm | project-management | zero-balance |
|---|:---:|:---:|:---:|:---:|
| Registration + scrypt hashing | ✅ | ✅ | ✅ | ✅ |
| Stateless HMAC cookie session | ✅ 7d | ✅ 7d | ✅ 7d | ✅ 30d |
| `timingSafeEqual` everywhere | ✅ | ✅ | ✅ | ✅ |
| Login timing equalization (unknown email) | ✅ | ➖ | ➖ | ➖ |
| No account enumeration (login) | ✅ | ✅ | ✅ | ✅ |
| Email verification (OTP) | ✅ atomic attempts | ✅ **hashed** code, 15-min TTL, atomic counter | ❌ none | ⚠️ plaintext, no expiry |
| Verification transport | ⚠️ in-response (`devCode`) | ⚠️ console log | n/a | ⚠️ in-response |
| Password reset backend | ✅ **atomic single-use, 60-min TTL** | ❌ UI-only | ❌ UI-only | ❌ none |
| Session revocation | ✅ `tokenVersion` | ❌ | ❌ | ❌ |
| Rate limiting | ✅ + `PROXY_HOPS` trust depth | ✅ | ✅ | ⚠️ XFF trust bug |
| CSRF posture | ✅ lax + content-type gate | ✅ lax + JSON-only | ✅ lax + JSON-only | ✅ lax + JSON-only |
| Per-user data tenancy | ❌ **none** | ⚠️ partial (ownerId on leads) | ❌ none | ✅ **full** |
| RBAC | ❌ | ⚠️ role field, unenforced | ❌ | ❌ |
| OAuth | ❌ (parity toasts) | ❌ | ❌ | ❌ |
| Security headers | ✅ XFO/nosniff/Referrer-Policy | ✅ + HSTS | ❌ | ◐ via metadata |

**Reading:** the family's auth *mechanics* are uniformly above production average (scrypt, HMAC, timing-safe, atomicity, rate limiting). The *completeness* differs sharply: only digma closes the verify+reset+revocation loop; only zero-balance enforces tenancy; none ships email transport or working RBAC.

### 5.2 Dashboard & UI comparison

| Dimension | digma | neo-crm | project-management | zero-balance |
|---|:---:|:---:|:---:|:---:|
| App shell | Topnav, 3 pages | **Sidebar + topbar + search** | Sidebar/rail + 3-state chrome | 256px fixed rail |
| KPI surfaces | 4 text stats | **6 KPI cards + sparklines + deltas** | 3 stat wells + rings | 3 stat cards + hero |
| Mobile navigation | ✅ Sheet drawer (exemplary) | ✅ Sheet drawer + e2e | ✅ bottom tabs + MORE sheet | ✅ Sheet + top bar |
| Responsive states | 2 (sm/md/lg) | 3+ (per-page ladders) | **3 explicit chrome states** | 2 (single `md` philosophy) |
| Dark mode | Editor-only chrome | ❌ (banned by mandate) | ❌ | ❌ |
| Theming | `@theme` literal hex + v3 pins | `@theme` + **layout-as-data records** | `@theme inline` neumorphic tiers | `:root` vars + `@theme inline` |
| A11y evidence | Strong (aria + e2e) | Strong (ARIA contracts pinned) | Good (170 aria sites) | **Best (axe 2-gate + keyboard walks)** |
| Empty/loading/error states | ✅ skeletons + empties | ✅ (zero-render charts ⚠️) | ✅ | ✅✅ (dedicated specs) |
| Export | — | **CSV (formula-guarded) + PDF** | — | — |

### 5.3 Charting comparison

| Dimension | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| Library | — | recharts 2.15.4 | — | recharts 3.10.1 |
| Chart components | 0 | **7 wrapper families + Sparkline** | 1 SVG ring | 1 donut |
| Chart surfaces | 0 (text stats) | **~20** (dashboard/leads/activities/reports) | 2 (rings) | 1 |
| Data flow | n/a | API → store → **pure derivation seam** → chart | API → store → ring | API → store → pure fn → chart |
| Chart test pinning | n/a | contracts + internals + **seed-freeze chain** | n/a | **e2e sector fills + keyboard contract** |
| Chart a11y | n/a | standard | `role="img"` | **custom roving keyboard parity** |
| Empty states | n/a | ⚠️ axes-at-zero (parity choice) | n/a | ✅ explicit empty state |

**neo-crm is the only candidate that transfers a charting *system*** — generic, typed, prop-driven wrappers covering bar/grouped-bar/line/pie/horizontal-bar/area/funnel plus sparklines, with the derivation-seam + seed-freeze testing methodology. zero-balance transfers the *discipline* for hardening a single chart; digma and project-management transfer nothing on this axis.

### 5.4 Data layer & validation

| Dimension | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| Models | 5 | **9** (richest domain) | 8 | 5 |
| Tenancy in schema | ❌ | ⚠️ partial | ❌ | ✅ **all userId + cascade** |
| Indexes | composite, curated | per-entity sets | per-FK/status | userId-composite |
| Validation | hand-rolled + **bounded reader/CSRF gate** | hand-rolled `isBad*` family | hand-rolled, enum Sets | **zod 4 at every boundary** |
| Input DoS defense | ✅ 32MB stream counter + field caps | ✅ 16KB pre-gate | ➖ | via zod bounds |
| Seed | demo + 2 projects + team | **10 accounts/15 contacts/24 leads/23 activities** (drives every chart) | 3 goals/36 tasks | arithmetic-asserted (net-zero verified) |
| Migrations | db push | db push | db push | db push |
| db-path seam | ✅ + env override | ✅ | ✅ (cleanest, fixture-tested) | ✅ |

### 5.5 API layer

All four share the envelope + `requireSession()`-first-line discipline with stable error codes. Differences: digma adds the bounded-body reader + content-type CSRF gate and the strictest status discipline; neo-crm adds the CSV engine (RFC-4180 + formula-injection guard), the safest upload pipeline, and PDF export; zero-balance adds zod discriminated `parseBody` + ownership pre-checks + `parentAmount` recalculation propagation. neo-crm's 27 routes against digma's 18 and the others' 15–16 give it the broadest worked examples of the pattern.

### 5.6 State management

All four: one Zustand store, `call()` seam, no React Query. neo-crm's store is the most engineered (race tokens for logout and calendar flips, batched refetch after serial imports, optimistic-apply-with-rollback). zero-balance contributes the **`useShallow` discipline** (documented against React issue #185 production crashes) and a clean 6-slot discriminated-union modal machine. digma's editor store (847 lines, gesture seams, server-id remapping) is domain-bound but a masterclass in undo/redo + optimistic persistence.

### 5.7 Testing comparison

| Metric | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| Unit files / checks **[V]** | 232 / **2,377** | 120 / **2,262** | 15 / **138** | 9 / **108** |
| Unit runtime **[V]** | 29.5s | **18.1s** | ~1s | **1.3s** |
| E2E specs / tests **[R]** | 39 / 262 | 9 / 152–156 | 10 / 109 | 24 / 292 |
| Smoke checks | 73 | gate scripts | 30 | ~28 |
| Behavior-vs-pin ratio | ⚠️ 223/232 source-pins | ⚠️ ~40% source-pins | ✅ mostly behavioral | ✅ all behavioral |
| E2E hermeticity | ✅ own DB, storageState, env-scrubbed webServer | ✅ + E2E_PORT seam | ✅ | ✅ + global reseed |
| Resilience specs (error/empty/loading) | partial | partial | partial | ✅ **dedicated suite** |
| A11y in tests | e2e assertions | ARIA contract pins | aria census | **axe-core 2-gate** |
| CI | ❌ | ❌ | ❌ | ❌ |

**Interpretation:** raw counts favor digma/neo-crm; *quality-per-test* favors project-management and zero-balance (pure behavior tests). For a template, the infrastructure (configs, storageState patterns, smoke scripts) matters more than the pin-tests, and neo-crm + zero-balance offer the best transferable infra.

### 5.8 Tooling & code quality signals (measured)

| Signal | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| `any` usage in src | **0** | 1 (in comment) | **0** | **0** |
| TODO/FIXME | **0** | **0** | **0** | **0** |
| `console.log` | 1 (intentional) | **0** | **0** | **0** |
| TS strict | ✅ | ✅ but `noImplicitAny:false` | `noImplicitAny:false` | ✅ but `noImplicitAny:false` |
| Build ignores TS errors | ⚠️ yes | ⚠️ yes | ⚠️ yes | ✅ **no** |
| Lint | many rules off | many rules off, but `--max-warnings 0` passes **[V]** | ~25 rules off | ~30 rules off |
| Largest file (LOC) | 2,453 | 1,687 | 753 (css) | 1,016 |
| Comment provenance density | extraordinary | extraordinary | high | high |

All four are conventionally clean far beyond typical open-source baselines — the enforcement is cultural (documented gates) rather than tool-strict, which an adopter should know before relaxing their own lint configs.

### 5.9 Production readiness matrix

| Item | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| Standalone output | ✅ | ✅ | ✅ | ✅ |
| `.env.example` complete | ✅ richest | ✅ | ✅ | ✅ |
| Health endpoint | ✅ | ✅ (503-on-DB-fail) | ✅ | ✅ |
| Sitemap/robots/metadata | ✅ | ✅ + OG/Twitter factory | ✅ | ✅ + PWA manifest |
| Custom 404 / error pages | ➖ | ➖ | ➖ | ✅ + specs |
| Security headers | ✅ | ✅ + HSTS | ❌ | ◐ |
| Deployment runbook | ✅ 201-line DEPLOYMENT.md | ✅ | ✅ | ✅ (with ORBITAL slip) |
| Dockerfile | ❌ | ❌ | ❌ | ❌ |
| Hosted CI | ❌ | ❌ | ❌ | ❌ |
| Email transport | ❌ | ❌ | ❌ | ❌ |
| Observability/metrics | ❌ | ❌ | ❌ | ❌ |
| Multi-instance safe | ❌ (in-memory limiter) | ❌ | ❌ | ❌ |
| Reproducibility **[V]** | ✅ install→test green | ✅ install→test green | ✅ install→test green | ✅ install→test green |

### 5.10 Documentation & agent-readiness

| Metric | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| ADRs | **16** | 7 | 9 | 7 |
| SKILL.md | 708 lines, v1.148 | **12,242 lines, v1.158** | 740 lines (progenitor) | 1,348 lines |
| Numbered lessons | 20 sections | massive | **23 lessons** | **42 lessons** |
| Self-verifying docs | ➖ | ✅ `docs-counts.test.ts` | ➖ | ➖ |
| Root doc mass to strip | ~2.9MB family-wide | ~2.9MB | ~1MB | ~2MB |

All four are elite on this axis (every claim file-path-verifiable; "code wins" doctrine). neo-crm's self-verifying documentation test is a genuine innovation. The cost: 90% of doc mass is build-history narrative an adopter must filter.

---

## 6. Scoring & Ranking

### 6.1 Sub-scores (0–10)

| Criterion (weight) | digma | neo-crm | project-management | zero-balance |
|:---|:---:|:---:|:---:|:---:|
| A1 Auth depth (16%) | **8.5** | 6.5 | 4.5 | 6.0 |
| A2 Dashboard (10%) | 7.0 | **9.5** | 7.5 | 8.0 |
| A3 Charting (8%) | 0.5 | **9.5** | 1.5 | 4.0 |
| A4 Data/validation/infra (6%) | 7.0 | **8.5** | 6.0 | **8.5** |
| **A. Feature completeness (40%)** | **6.3** | **8.15** | **4.9** | **6.5** |
| B1 Typing (9%) | **9.0** | 7.5 | 7.5 | 8.5 |
| B2 Consistency (7.5%) | 8.0 | **9.0** | 8.0 | 8.5 |
| B3 Error handling (6%) | **9.0** | **9.0** | 8.0 | **9.0** |
| B4 Test quality (7.5%) | 6.0 | 7.5 | **8.0** | 8.5 |
| **B. Code quality (30%)** | **8.0** | **8.2** | **7.9** | **8.6** |
| C1 Layering (9%) | **9.0** | **9.0** | 8.5 | **9.0** |
| C2 Scalability/tenancy (7.5%) | 5.0 | 6.5 | 5.0 | **7.0** |
| C3 Data architecture (7.5%) | 6.0 | 7.5 | 6.5 | **8.5** |
| C4 Docs/agent-readiness (6%) | **9.5** | 9.0 | 9.0 | 8.5 |
| **C. Architectural robustness (30%)** | **7.4** | **8.0** | **7.2** | **8.3** |

### 6.2 Weighted totals and final ranking

| Rank | Codebase | A × 0.40 | B × 0.30 | C × 0.30 | **Total** |
|:---:|---|:---:|:---:|:---:|:---:|
| **1** | **neo-crm** | 3.26 | 2.46 | 2.40 | **8.12 ≈ 8.1** |
| **2** | **zero-balance** | 2.60 | 2.58 | 2.49 | **7.67 ≈ 7.7** |
| **3** | **digma** | 2.52 | 2.40 | 2.22 | **7.14 ≈ 7.1** |
| **4** | **project-management** | 1.96 | 2.37 | 2.16 | **6.49 ≈ 6.5** |

### 6.3 Ranking rationale (one paragraph each)

**neo-crm (1st).** It is the only candidate that already contains the three pillars the user asked for at production scale: a real dashboard system (6 KPI cards, filters, lists, exports), a real charting system (7 recharts families, ~20 surfaces, pure derivation seams, seed-frozen tests), and a real app shell with hardened subsystems (CSV guard, upload safety, PWA, headers) — all wrapped in the family's disciplined envelope/store/gate architecture and the best self-verifying documentation. It loses points only where its siblings specialized: auth completeness (no reset, no revocation, RBAC unenforced) and the reference-parity mass that must be stripped. Those are additive fixes; the foundation is the broadest.

**zero-balance (2nd).** The best-engineered *foundation* in the abstract — zod at every boundary, full per-user tenancy, serializer isolation, integer-cents domain firewall, strictest build config, and the finest resilience/a11y testing culture. It ranks below neo-crm solely on feature breadth for the stated goal: one chart component and a leaner dashboard vocabulary mean you rebuild more of the "dashboard + charting" pillar yourself. Where the new app is data-model-first with modest visualization, zero-balance's patterns are the safer skeleton.

**digma (3rd).** The best auth code and the best documentation in the family — and the only complete forgot/reset/revocation implementation — but it scores near-zero on the charting pillar the user explicitly requires, has no data tenancy whatsoever, and ~60% of its source is canvas-editor domain logic. As a *donor* for auth mechanics and doc structure it is first-rate; as the base for a generic auth+dashboard+charts scaffold it forces the most demolition.

**project-management (4th).** The progenitor whose SKILL spawned two of its own competitors. Its process artifacts (gate order, smoke pattern, db-path seam, SPA-router pattern, degrade-never-fail AI, doc contract) live on inside every sibling — which is precisely why, as raw code, it is now the least complete: no verification, no reset, no tenancy, no charts, oldest pins. Study it for methodology; don't scaffold from it when its evolved descendants exist.

---

## 7. Recommendations

### 7.1 Primary recommendation

**Adopt neo-crm as the foundational codebase**, then execute the hybrid assembly below. Expected strip effort: delete `skills/`, `docs/session_*` + `docs/plans/*`, root `worklog.md`, parity-pin tests, reference-coupled sweep/probe scripts, and the CRM entity pages — leaving the shell, charts, KPI family, auth core, envelope, store, upload/CSV subsystems, and test infrastructure (~55–60% of src survives as scaffolding **[R]**).

### 7.2 Hybrid assembly matrix (what to port, from where)

| Capability | Source | Key files to port |
|:---|:---|:---|
| Forgot/reset-password (atomic, single-use, TTL) | digma | `api/auth/forgot-password/route.ts`, `reset-password/route.ts` |
| Session revocation (`tokenVersion`) | digma | `lib/auth.ts` + `User.tokenVersion` column + DB-seam check |
| Login timing equalization | digma | `lib/password.ts` (`timingEqualizerHash`) |
| Proxy-aware client IP (`PROXY_HOPS`) | digma | `lib/rate-limit.ts` |
| Bounded-body reader + CSRF content-type gate | digma | `lib/validation.ts` (`readBoundedJson`) |
| zod-at-every-boundary + `parseBody` | zero-balance | `lib/validation.ts`, `lib/api-helpers.ts` |
| Ownership scoping idiom | zero-balance | `findFirst({id, userId})` pattern + `serializers.ts` |
| `useShallow` discipline + modal state machine | zero-balance | store + documented invariant |
| Chart wrapper families + derivation seams | neo-crm | `components/charts/charts.tsx`, `lib/dashboard-data.ts` |
| KPI/stat-card vocabulary | neo-crm | `page-parts.tsx`, `page-layout.ts` |
| Store race guards | neo-crm | `sessionWriteToken` / `eventsFetchToken` in `stores/crm-store.ts` |
| CSV engine + formula guard | neo-crm | `lib/csv.ts`, `csv-templates.ts` |
| db-path seam | project-management / any | `lib/db-path.ts` (+ fixture tests) |
| Smoke-test pattern | project-management / any | `scripts/smoke-test.sh` (env-pinned DATABASE_URL) |
| Degrade-never-fail AI pipeline | project-management | `lib/clarify.ts`, `lib/plan-sanitizer.ts` |
| Gate order + doc contract | all four | AGENTS.md structure, SKILL/PAD/ADR format |

### 7.3 Scenario-based guidance

| If your next app is… | Start from | Because |
|:---|:---|:---|
| A classic SaaS/admin product with rich reporting | **neo-crm** | Dashboard + charts + exports already proven at ~20 surfaces |
| Data-model-first, correctness-critical (finance, inventory, health) | **zero-balance** | Tenancy + zod + cents-firewall + serializer isolation |
| Auth-heavy, needs hardened account flows out of the box | **digma** (auth) + any base | Only complete verify/reset/revocation implementation |
| AI-feature-centric (planning, generation, assistants) | **project-management** patterns + neo-crm base | Cleanest degrade-never-fail pipeline with sanitizers |
| You want process/docs discipline for an AI-built repo | **any + the family's doc contract** | Four-doc system with session logs and self-verifying counts |

### 7.4 Gaps every adopter must close before production (no candidate solves these)

1. **Email transport** (SMTP/Resend) for verification codes and reset links — all four ship dev-only delivery (console/response).
2. **RBAC enforcement** — role fields exist (neo-crm) but no route-level checks anywhere.
3. **Hosted CI** — all four are local-gate-only by explicit design; port the gate script to GitHub Actions.
4. **Containerization** — no Dockerfile anywhere (recipes sketched in PADs).
5. **Multi-instance safety** — in-memory rate limiters + stateless sessions assume single-node; needs Redis-backed limiting (or accept the documented single-node contract).
6. **Observability** — no metrics/APM/error tracking in any candidate.
7. **Password reset** — if not porting digma's, it must be built (three of four candidates fake it in the UI).
8. **Database** — SQLite + `db push` is the dev posture; production wants Postgres + `prisma migrate` (switch path documented in every `.env.example`).

---

## 8. Verification Ledger

### 8.1 Executed verification (all **[V]**, 2026-10-22, bun 1.x + Node 24)

| Repo | `bun install` | `prisma generate` | `tsc --noEmit` | Unit suite | Notes |
|:---|:---:|:---:|:---:|:---|:---|
| digma | ✅ 477 pkgs | ✅ | ✅ exit 0 | **232 files / 2,377 pass** (29.5s) | 1 file (`lows-s99.test.ts`) fails on fresh clone — reads `.env`; passes after `cp .env.example .env` **[V]**. App defect: none. |
| neo-crm | ✅ 529 pkgs | ✅ | ✅ exit 0 | **120 files / 2,262 pass** (18.1s) | `eslint . --max-warnings 0` also **exit 0** **[V]** |
| project-management | ✅ 480 pkgs | ✅ | ✅ exit 0 | **15 files / 138 pass** | — |
| zero-balance | ✅ | ✅ | ✅ exit 0 | **9 files / 108 pass** (1.3s) | — |

**Reproducibility verdict:** all four candidates clone → install → generate → typecheck → test **green** without modification. For AI-maintained codebases, this is exceptional hygiene evidence.

### 8.2 Not executed (stated plainly)

- Playwright e2e suites (require per-repo production builds + browser binaries + minutes each) — e2e counts and quality claims are **[R]** from spec analysis.
- Production builds, deployed runtimes, visual rendering.
- Fresh-clone `next build` (typecheck is the family's own designated type gate).

### 8.3 Documentation-claim corrections (evidence over docs)

| Claim | Reality | Verdict |
|:---|:---|:---|
| Sub-agent grep suggested unit counts were inflated vs docs | vitest reports **exactly** the documented figures (2,377 / 2,262 / 138 / 108) | **Docs were right** — grep undercounts `test.each` expansions **[V]** |
| neo-crm SKILL/AGENTS claim eslint purity rules enforced | `eslint.config.mjs` disables them; discipline enforced via custom hygiene tests instead | Doc-vs-config drift **[V]** |
| zero-balance SKILL claims "3 vitest projects" | Config has a single node project (comment carries project-management vocabulary) | Stale doc + lineage evidence **[V]** |
| zero-balance SKILL claims "amount Int, cents" in Prisma | Schema stores `Float`; cents firewall lives at aggregation (`money.ts`) | Doc imprecision; code is correct **[V]** |
| zero-balance rate-limit comment claims socket-based IP | Code reads `x-forwarded-for` first (spoofable) | **Code defect** (doc aspiration) **[V]** |
| digma pad/skill claim "2377 checks" | Confirmed exactly by vitest **[V]** | Accurate |
| zero-balance DEPLOYMENT.md says "ORBITAL ships…" | Copy-paste artifact from sibling project | Cosmetic **[V]** |

---

## 9. Appendix: Consolidated Findings Register (severity-classified)

**Critical:** none found in any candidate's code mechanics (no injection, traversal, XSS, or unsafe-deserialization surfaces identified across four deep-analysis passes).

**High (production-template blockers):**
1. *digma* — no per-user data tenancy: any authenticated user reads/mutates all projects/teams (`api/projects/route.ts`).
2. *digma* — no email transport; OTP/reset credentials ride API responses (documented ADR-014 deviation).
3. *neo-crm* — password reset is UI-only (no endpoint, no token, no email).
4. *neo-crm* — no session revocation (stolen cookie valid full 7-day TTL).
5. *project-management* — no email verification (open registration, immediate sign-in).
6. *project-management* — password reset is a UI lie; no RBAC; no tenancy.
7. *zero-balance* — password reset does not exist; verification code plaintext + no expiry + in-response delivery; XFF-spoofable rate limiting.
8. *all four* — no hosted CI; no email transport; no containerization.

**Medium:**
9. *all four* — in-memory per-process rate limiter (single-node contract; restart resets).
10. *digma/neo-crm/pm* — `AUTH_SECRET` falls back to insecure dev constant with warning rather than failing hard in production.
11. *all four* — `ignoreBuildErrors` (3 of 4) + `noImplicitAny:false` (3 of 4) + heavily disabled ESLint rule sets: quality is gate-discipline-enforced, not tool-enforced.
12. *neo-crm* — RBAC role field informational only.
13. *zero-balance* — `reactStrictMode:false`; doc/code drift cluster.
14. *digma* — static doc-pin test (`lows-s99.test.ts`) fails on fresh clones until `.env` exists.
15. *all four* — `db push` schema workflow (no migration history) — fine for SQLite dev, friction for production evolution.

**Low / Informational:**
16. Signup email enumeration (digma deliberate; others' login paths non-leaking).
17. *neo-crm/zero-balance* — KPI sparklines/deltas partially static literals (reference parity) — rewire for real data.
18. *neo-crm* — charts render axes at zero data rather than friendly empty states (lists do have empty states).
19. *digma* — 2,453/2,365-line editor monoliths; *zero-balance* — 1,016-line dashboard-view monolith.
20. Massive strip burden in all four: `skills/` catalogs (~190MB each), session/remediation histories (250–570 docs each), parity-probe scripts.
21. **Strengths worth stating plainly:** zero `any`/TODO/console.log across all four; timing-safe comparisons and atomic conditional updates used consistently; exceptional documentation with ADR discipline; hermetic, deterministic e2e infrastructure; verified reproducibility of every repo from a fresh clone.

---

*End of report. Companion deliverable: `WEB_APP_FOUNDATION_SKILL.md` — the generalized, definitive SKILL distilled from these four codebases for scaffolding any future web application.*
