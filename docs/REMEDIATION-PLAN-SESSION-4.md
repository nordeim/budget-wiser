# Budget Wise — Session 4 Remediation Plan

**Date:** 2026-10-27 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed (this session)

- Fresh intake: `git clone` at `42826cc` (the owner's `docs/session_4.md` transcript
  commit; code HEAD `a4128fd`, the session-192 ship state).
- Full gate run FIRST: lint 0/0 · typecheck 0 · **382/382 unit** · build (clean, all
  routes, both casings) · **14/14 smoke** · **61/61 e2e** (1.2m, first run — after the
  environmental Playwright chromium-1248 install).
- Local audit: dev server booted, demo login, dashboard census (the seeded demo month
  rendering exactly as documented — $4,424.55 balance, 88.5% saved), the mobile drawer
  battery live (open/nav/scroll-lock/Escape-close/resize-auto-close all holding),
  sitemap.xml + robots.txt + manifest.json + guest wall verified live, `.env`
  recreated on the mandated six-knob contract (`DATABASE_URL="file:../db/custom.db"`,
  the seeded `db/` at the repo root), Tailwind v4 discipline verified (CSS-first
  `@theme`, no config JS, hover unwrap, shadow/blur re-pins).
- Live reference re-audit (agent-browser, fresh login with the owner's credentials,
  1512×945 + 390×844): login, all four app pages, both dialogs, the 404 surface, the
  sitemap/robots fetched over HTTP.

## 2. Findings — THE REFERENCE HAS DRIFTED (its first structural change since s190)

### High (visible-pixels parity breaks)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **The reference now ships a MOBILE BOTTOM TAB BAR.** A `md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-pb` bar (76px tall at 390×844) with `flex items-center justify-around py-2` items: `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all` + active `text-slate-900` / inactive `text-slate-400`, lucide icons `w-6 h-6` (LayoutDashboard, ArrowLeftRight, Target, User), labels `text-xs font-medium`, hrefs CAPITALIZED. Present on all four app pages (NOT on login); hidden at ≥768px; no `aria-current` on the reference. The prior documented finding "the reference ships NO mobile navigation" (sessions 190/191/192) is STALE — the platform's owner redesigned the mobile nav. Our hamburger + Radix drawer is now a visible-pixel DIVERGENCE (the reference's navbar carries no hamburger). | agent-browser live DOM extraction at 390×844 (bar rect y=767 h=77); desktop `display:none` verified; byte-extracted outerHTML on file |
| F-2 | **The reference app pages ship NO footer.** No `footer` element anywhere on the app surface (body ends with the AI Insights panel + the platform badge). Our `APP_FOOTER` (border-t bar, "© 2026 BudgetWise", About/Contact links) renders visible pixels the reference doesn't ship — part of the same reference redesign. | `document.querySelector('footer')` → NOT FOUND on every app page, both axes |

### Medium (URL surface / SEO)

| # | Finding | Evidence |
|---|---|---|
| F-3 | **The reference's /About and /Contact now 404** ("The page 'About' could not be found in this application. Go Home"), and its sitemap dropped them: the reference's sitemap.xml now lists only `/`, `/Budgets`, `/Profile`, `/Transactions` (capitalized, no /dashboard /login /signup). The D-142a3 rationale for our `/about` `/contact` sitemap entries ("the reference's two new marketing-layer app pages") is void. Our (marketing) pages remain OUR OWN public-marketing surface (linked from the landing's own footer — the landing itself is the documented superset), so the pages stay; the sitemap entries stay (they list our real crawlable routes per the s14 doctrine) but the stale reference-parity COMMENT must be corrected. | HTTP 200 + 404 body on /About /Contact; `curl sitemap.xml` diff |
| F-4 | **The reference's demo data changed** (one "food" transaction, −$1,000, Oct 27 — balance −$1000.00, 1 transaction, Food & Dining donut sector). Data-borne, the documented excluded genus — our seed keeps the original demo month. No action. | Reference dashboard census |

### Verified clean (no drift — no action)

- The login card: 4 OAuth buttons (Google, Microsoft, Facebook, Apple), welcome copy,
  structure — unchanged.
- The top navbar: sticky `top-0 z-50 bg-white border-b border-slate-200 backdrop-blur-sm
  bg-white/80`, logo row, `hidden md:flex` pill row (display:none below md) — unchanged.
- The desktop axis: pill row visible, no bottom bar — unchanged.
- Add Transaction dialog (tabs, amount, category, date trio, description, disabled
  submit) and Set Budget dialog (category, limit, disabled submit) — unchanged.
- The Profile page structure (identity card, preferences, financial overview, 2026
  summary) — unchanged.
- The 404 surface: `<Route> | Budget Wise` title, "404 Page Not Found", Go Home —
  unchanged. `/signup` still 404s on the reference (our documented superset stands).
- Sitemap FORMAT (4-space indent, changefreq weekly, LF-only) and robots.txt — unchanged.

## 3. Remediation ToDo (execution order, TDD)

**Phase A — red tests first**

1. [ ] `tests/app-chrome.test.ts`: the **`BOTTOM_NAV` contract pins** — the bar record
       (`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t
       border-slate-200`), the item base (`flex flex-col items-center gap-1 px-4 py-2
       rounded-xl transition-all`), the active/inactive ink (`text-slate-900` /
       `text-slate-400`), the label (`text-xs font-medium`), the icon (`w-6 h-6`), the
       safe-area utility. RED: the record does not exist yet.
2. [ ] `tests/e2e/mobile-navigation.spec.ts`: the battery REWRITTEN for the bottom
       bar — visible at 390×844 on every app page, hidden at ≥768px, all four
       destinations, navigation round-trip (capitalized hrefs), the active item
       follows the route, the desktop pill row still hidden at 390px, the body scroll
       NEVER locked (no overlay), no hamburger on the navbar. RED: the bar does not
       exist; the hamburger still does.

**Phase B — the fixes (green)**

3. [ ] `src/lib/page-layout.ts`: add the `BOTTOM_NAV` record; retire
       `MOBILE_NAV_LAYOUT`, `MOBILE_NAV_SHEET`, `APP_FOOTER`, and `SITE_NAV.hamburger`
       (the drawer family — the reference's redesign makes them parity breaks).
4. [ ] `src/components/layout/app-shell.tsx`: remove the Radix drawer, the hamburger
       trigger, the matchMedia auto-close, the scroll lock, and the footer; add the
       bottom tab bar — the reference's exact classes, the four lucide icons
       (LayoutDashboard, ArrowLeftRight, Target, User), the active/inactive ink, the
       capitalized hrefs, plus our kept a11y superset (`aria-current="page"` +
       `aria-label` on the nav landmark — invisible to pixels).
5. [ ] `src/app/globals.css`: define the `safe-area-pb` utility
       (`padding-bottom: env(safe-area-inset-bottom)`) — the reference's own class
       name, made real (inert on desktop; the CSS-first v4 way: a plain utility
       class, not a config token).
6. [ ] `src/app/sitemap.xml/route.ts`: correct the stale D-142a3 comment — /about +
       /contact are now OUR OWN public-marketing surface (linked from the landing
       footer), the reference having removed its own pages at this audit.
7. [ ] `tests/app-chrome.test.ts`: retire the sheet/hamburger/footer pins; keep the
       SITE_NAV pins; update the shell-wiring pins (no matchMedia, no footer render).
8. [ ] `tests/metadata.test.ts`: refresh the sitemap-entry comments to the new
       rationale (route set unchanged — ours lists our real routes).

**Phase C — evidence**

9. [ ] Screenshot battery recaptured under `docs/screenshots/` from the remediated
       dev server (landing, login, all four pages at desktop + mobile with the new
       bottom bar, both dialogs).
10. [ ] VLM side-by-side: mobile Dashboard ours-vs-reference (the bottom bar now the
        parity surface); login pair re-verified.

**Phase D — docs + ship**

11. [ ] Documentation alignment: README (the "Mobile Navigation Superset" section →
        the bottom tab bar parity story + the footer removal), AGENTS.md (the drawer
        bullet → the bottom bar), CLAUDE.md (the mobile-nav mentions), the PAD
        revision block v2.2.0 → **v2.3.0** + the mobile-superset ADR superseded,
        `budget-wiser_SKILL.md` v1.1.0 → v1.2.0 (the audit history row + every
        drawer/superset section), the count lockstep wherever the e2e/unit numbers
        change.
12. [ ] `docs/session_5.md` (this round's curated log — `session_4.md` being the
        owner's round-3 transcript) + `worklog.md` (Task ID 193).
13. [ ] Full gate: `bun run gate` (lint → typecheck → test → build → smoke → e2e).
14. [ ] Commit (atomic: the remediation + docs + screenshots) → push
        `HEAD:refs/heads/main` via `docs/ssh_git_wrapper_v3.py` (runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`); verify the remote ref;
        shred the key afterward.

## 4. Risks and guards

- **The drawer retirement removes a documented superset** — but supersets live only
  while invisible-to-pixels. The reference's redesign puts a bottom bar (and no
  hamburger) on the phone surface, so the drawer + trigger are now visible
  divergences. The behavioral battery that protected the drawer is replaced by the
  bottom-bar battery; nothing is silently deleted (the worklog records the
  retirement).
- **The footer removal also removes the app-chrome links to /About /Contact** — the
  marketing pages stay reachable from the LANDING's own footer (our public-site IA,
  the documented landing superset). The sitemap keeps listing them as OUR real
  routes (the s14 doctrine: our sitemap lists the routes our router serves).
- **No gate weakening**: the retired e2e tests are replaced test-for-test by the
  bottom-bar battery; the unit pins retired with the drawer family are replaced by
  the BOTTOM_NAV pins. Count lockstep in the same commit.
- **The dev-vs-build race hazard** (documented s192): the dev server stays down for
  the gate's build leg; screenshots are recaptured BEFORE the gate, dev stopped
  after.
