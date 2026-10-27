# Budget Wise — Session 5 Remediation Plan

**Date:** 2026-10-27 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed (this session)

- Fresh intake: `git clone` at `aa2b051` (the owner's `docs/session_6.md` transcript
  commit on top of `7bd4b72`, the session-193 ship). Environment rebuilt standing:
  `bun install` · `.env` on the mandated six-knob contract
  (`DATABASE_URL="file:../db/custom.db"` + a fresh 64-char `AUTH_SECRET`) ·
  `db:push` + `db:seed` (the demo month intact: 2 users / 4 transactions /
  0 budgets) · the environmental Playwright chromium-1248 install.
- The five root documents + `docs/session_5.md` +
  `docs/REMEDIATION-PLAN-SESSION-4.md` + `worklog.md` + `docs/session_6.md`
  re-read and validated against the tree before touching anything.
- Live reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844): login, all four app pages, both dialogs,
  the 404 surface, sitemap.xml + robots.txt over HTTP, the bottom bar's full
  outerHTML byte-extracted, the full four-page structural census (both apps,
  `scripts/s194-audit/census/`), and a live category-palette round-trip (one
  $1 txn per category added to the reference, chips/icons/donut fills
  censused, then every probe row deleted and the owner's original food
  transaction restored verbatim).

## 2. Findings

### High (visible-pixels parity breaks)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **The shell's `main` lacked the reference's bar-clearing padding** — its `<main>` carries `pb-20 md:pb-0` (80px below md clearing the 77px fixed bar). OURS rendered class-less: content boxes sat BEHIND the bar at phone-axis scroll-end (measured +20px behind on dashboard/profile). The s193 round mirrored the bar itself but not its clearance. **[REMEDIATED]** | agent-browser live extraction both apps; pixel scans on file |
| F-2 | **The reference's ACTIVE bottom-bar item carries the ink on its SVG too** (`w-6 h-6 text-slate-900`; inactive bare — same computed color through currentColor). **[REMEDIATED]** | Full outerHTML byte-extraction |
| F-3 | **The reference's shell hierarchy restructured**: `body (white) > DIV('') > [NAV(sticky), DIV(bar), MAIN.pb-20 > DIV.min-h-screen.bg-slate-50 > page]`. Ours: the min-h-screen root OUTSIDE main (slate-50 painted behind the translucent navbar and inside the clearance strip) + the bar AFTER main. **[REMEDIATED]** | Live DOM probe of the reference's wrapper children + body computed bg |
| F-4 | **The reference REDESIGNED its entire page-surface system onto stock shadcn/ui** — the same owner wave that brought the bottom bar. The full delta map (live-censused, trees under `scripts/s194-audit/census/`): per-page containers (7xl/5xl/5xl/4xl); sm-stacking headers with tracking-tight H1s and DIRECT action buttons; the shadcn Button/Card/Input/Select/Badge/Tabs forms; gradient KPI + summary cards; divide-y transaction rows with category badges; the gradient budgets dark card (4xl value, no percent, emerald gradient track) + gradient-strip budget cards; the restyled Profile (h-20 gradient header, w-20 border-4 avatar, native currency select, pastel overview cells); the dialog true-ups (border-input, bg-muted, space-y-2, w-full triggers, no description paragraphs); the --primary token → the stock neutral #171717. **[REMEDIATED]** | The four census trees + the targeted extractions in the session log |
| F-5 | **The reference's category palette re-tinted in the wave** — every tile/icon/donut fill changed (food orange→emerald+Utensils, shopping pink→amber, entertainment purple→violet+Film, bills rose→red+Receipt, healthcare emerald→cyan+Heart, education cyan→lime, salary emerald→indigo, freelance indigo→purple+Wallet; Other → slate-50/600 + Ellipsis; the donut fills re-pinned). **[REMEDIATED]** | The live round-trip probe (13 categories censused; the owner's data restored verbatim) |
| F-6 | **The transaction row title is the DESCRIPTION when present** (the reference's food row reads "food"), the category riding the badge; ours always showed the category. **[REMEDIATED]** | Live row census |
| F-7 | **The chart geometry re-tuned**: the donut at height 280 directly in the card content (outer 100 / inner 60, the default 14px rect legend icon); the weekly bars at height 200 in the tabpanel with BOTH grid directions and 12px ticks. **[REMEDIATED]** | Live chart probes both apps |

### Verified clean (no drift — no action)

- The login card: 4 OAuth buttons, welcome copy, structure.
- The top navbar (sticky white/80, hidden md:flex pills), the bottom bar's own
  anatomy (class string, rect y=767 h=77, items, icons, ink, hrefs).
- The 404 surface, sitemap format, robots.txt. /About + /Contact still 404 on
  the reference (our documented own-IA superset stands).
- The reference's data state: the one food transaction (−$1,000) — data-borne,
  the excluded genus; our seed keeps the original demo month.

## 3. Remediation ToDo (executed TDD)

**Phase A — red tests first**

1. [x] `tests/app-chrome.test.ts`: the `SHELL_LAYOUT.main` clearance pins
       (`pb-20` + `md:pb-0`) — born RED.
2. [x] `tests/app-chrome.test.ts`: the `BOTTOM_NAV.iconActive` pin + the
       shell-wiring pin (`cn(BOTTOM_NAV.icon, active && BOTTOM_NAV.iconActive)` +
       `<main className={SHELL_LAYOUT.main}>`) — born RED.
3. [x] `tests/e2e/mobile-navigation.spec.ts`: the scroll-end clearance test
       (all four pages, the pb-20 guarantee) — born RED on the occlusion.

**Phase B — the fixes (green)**

4. [x] `src/lib/page-layout.ts`: `SHELL_LAYOUT.main`, `BOTTOM_NAV.iconActive`,
       the restyled record families (PAGE_ROOT wide/content/narrow, PAGE_HEADER
       sm-stack, KPI_CARD gradients+chips, PANEL shadcn Card, HEADER_BUTTONS
       stock forms, SUMMARY_CARD, TXN_LIST, DARK_CARD, EMPTY_STATE, RECENT_ROW,
       BUDGET_CARD, INPUT_BASE/SELECT_TRIGGER/DIALOG_TEXTAREA/TABS_SEGMENTED
       stock-token forms).
5. [x] `src/app/globals.css`: the stock shadcn token set (--card/--input/
       --muted/--accent/--primary #171717/…), --color-background → white, the
       text-muted → text-muted-foreground migration (8 consumers).
6. [x] `src/components/layout/app-shell.tsx`: the reference's exact hierarchy
       (bare wrapper > NAV + bar + MAIN.pb-20 > min-h-screen).
7. [x] The four pages restructured (dashboard grid + KPI + panels + recent
       rows + AI insights; transactions summary + filter card + divide-y rows;
       budgets gradient dark card + empty state + budget cards; profile
       identity/preferences/native select/overview/summary).
8. [x] `src/lib/categories.ts`: the re-pinned palette (tiles/icons/colors).
9. [x] `src/components/charts/budget-charts.tsx`: the re-tuned geometry.
10. [x] The dialog true-ups (titles, spacing, field forms, text-only submits,
        the "Add a note..." placeholder).

**Phase C — evidence**

11. [x] The census re-run: budgets/transactions/profile/dashboard structurally
        clean at the desktop axis (the residual deltas are the documented
        SECTION-vs-DIV a11y supersets + data-borne rows).
12. [x] The screenshot battery recaptured (12 images).
13. [x] VLM side-by-side: dashboard / budgets / profile / login — all
        **"Structural Differences: None"**.
14. [x] Live verification: the bar byte-identical modulo the 3 documented
        supersets; the clearance guarantee at 390×844; the shell hierarchy
        byte-matched.

**Phase D — docs + ship**

15. [x] Documentation alignment (count lockstep 381 → 387 unit, 61 → 62 e2e):
        README, AGENTS.md, CLAUDE.md, PAD v2.4.0, budget-wiser_SKILL.md v1.3.0,
        `docs/session_7.md`, the worklog entry (Task ID 194).
16. [x] Full gate: lint 0/0 · typecheck 0 · 387/387 unit · build · 14/14
        smoke · 62/62 e2e.
17. [ ] Commit (atomic) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the key.

## 4. Risks and guards

- **The palette round-trip touched the owner's reference data** — the probe
  rows were all deleted and the owner's food transaction re-created verbatim
  ($1,000, description "food", Oct 27) — verified restored post-probe.
- **The e2e suite's selectors rode the old semantics** (h4 row titles, the
  Radix currency select, the heading card titles) — updated to the reference's
  current forms (p titles, the native select, text assertions); the a11y
  sanctioned register extended for the reference's own counter + bar-label
  inks (new matcher entries, no suppressions).
- **No gate weakening**: every retired pin was replaced by its restyled twin
  in the same change set; the count lockstep lands in the same commit.
- **The dev-vs-build race hazard**: the dev server stays down for the gate's
  build leg (screenshots captured BEFORE the gate, dev stopped after).
