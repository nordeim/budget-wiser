# Budget Wise — Session 6 Remediation Plan

**Date:** 2026-10-27 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed (this session)

- Fresh intake: `git pull` to `38578d5` (the owner's `docs/session_8.md` transcript
  commit atop `2fd1bce`, the session-194 ship). Environment verified standing:
  the Prisma client regenerated, `.env` on the mandated six-knob contract
  (`DATABASE_URL="file:../db/custom.db"`), the demo month intact (2 users /
  4 transactions / 0 budgets), the environmental Playwright chromium-1248
  present.
- The five root documents + `docs/session_7.md` +
  `docs/REMEDIATION-PLAN-SESSION-5.md` + `worklog.md` + `docs/session_8.md`
  re-read and validated against the tree before touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 387/387 unit ·
  build · 14/14 smoke · 62/62 e2e — the exact documented session-194 ship
  state.
- The local audit (per `skills/web-application/SKILL.md` §16 dimensions):
  no `dangerouslySetInnerHTML`, no secrets in the tree, `.env.example`
  matching the six-knob contract, docs-count lockstep verified at every
  claim site, `skills/` confirmed excluded from the tsc/eslint/vitest/
  playwright scopes, working tree clean.
- Live reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844): login card, all four app pages (full
  structural trees), both dialogs (field sets + the stock input forms + the
  #171717 submit), the transaction row byte-extraction, the bottom bar's
  anatomy + active-icon ink + the scroll-end clearance (764 ≤ 767),
  sitemap.xml + robots.txt over HTTP, the /About + /Contact 404s.

## 2. Findings

### Medium (a visible-pixels parity break of the established genus)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **The shell gained an outer surface wrapper.** The reference's chrome is now `body (white) > DIV('') > [DIV.min-h-screen.bg-slate-50 > [NAV(sticky), DIV(bar), MAIN.pb-20 md:pb-0 > DIV.min-h-screen.bg-slate-50 > page], DIV(toast viewport)]` — a `min-h-screen bg-slate-50` wrapper encloses the whole [NAV, bar, MAIN] trio (a THIRD structural restyle of the shell; s193 brought the bar, s194 restructured the hierarchy, this adds the outer surface). Ours renders the trio directly in the bare DIV. Pixel evidence: the translucent navbar (`bg-white/80 backdrop-blur-sm`) renders `rgb(254,254,255)` on the reference (white/80 over the wrapper's slate-50) vs `rgb(255,255,255)` on ours (white/80 over the white body) — a full-band delta across the 65px navbar, both axes. The phone scroll-end clearance strip below the inner root's box would also differ (slate-50 vs white) on short-content pages. | Live DOM probe of the reference's wrapper children both axes; computed styles (`wrapperBg rgb(248,250,252)`); pixel sampling of the navbar band in both apps' captures (254,254,255 vs 255,255,255 at y=8/30/57) |

### Verified clean (no drift — no action)

- All four app pages: the per-page containers (7xl/5xl/5xl/4xl), the
  sm-stacking headers with `mb-8`, the KPI grid (`grid-cols-1
  sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8`, 4 cards), the gradient KPI and
  summary cards, the filter card, the divide-y rows (`flex items-center
  gap-4 p-4 hover:bg-slate-50 transition-colors` — byte-identical, the
  description-first title + badge + p-2.5 chip + text-lg amount), the
  budgets gradient dark card + p-12 empty state, the profile 4xl + 1/3 grid.
- The bottom bar: byte-identical class string, rect y=767 h=77, the
  active/inactive ink split (the active svg carries `text-slate-900`), the
  pb-20 clearance guarantee (lowest main box 764 ≤ 767).
- Both dialogs: titles without description paragraphs, `space-y-6 pt-4`
  forms, the stock `border-input` h-9 inputs, the "Add a note..."
  placeholder, the native category select (8 options) inside the trigger,
  the `#171717` submit.
- The login card (4 OAuth buttons, welcome copy), the top navbar's own
  class string, the 404 surface, the sitemap format (4 entries), robots.txt.
- The reference's data state: the one food transaction (−$1,000) —
  data-borne, the excluded genus.
- The reference's toast viewport (`fixed top-0 z-[100] flex max-h-screen
  w-full flex-col-reverse p-4`) — invisible DOM chrome in both apps (ours
  ships the same z-[100] viewport as a body-level portal; zero visible
  pixels when no toast fires). Out of parity scope, like the platform's
  "Edit with Base44" badge.

## 3. Remediation ToDo (executed TDD)

**Phase A — red tests first**

1. [x] `tests/app-chrome.test.ts`: the `SHELL_LAYOUT.outer` record pin
       (`min-h-screen bg-slate-50` — the outer surface wrapper) — born RED.
2. [x] `tests/app-chrome.test.ts`: the shell-wiring pin (the trio wrapped
       in `<div className={SHELL_LAYOUT.outer}>` inside the bare wrapper) —
       born RED.

**Phase B — the fix (green)**

3. [x] `src/lib/page-layout.ts`: `SHELL_LAYOUT.outer` added (the record +
       the session-195 comment citing the live probe).
4. [x] `src/components/layout/app-shell.tsx`: the trio wrapped in the outer
       surface div; the hierarchy comment updated to the reference's current
       byte-extracted form.

**Phase C — evidence**

5. [x] Live verification: the shell hierarchy byte-matched on the dev
       server; the navbar band re-sampled (254,254,255 both apps); the
       mobile bar geometry + clearance unchanged (764 ≤ 767).
6. [x] The screenshot battery recaptured (12 images).
7. [x] VLM side-by-side parity check.
8. [x] Full gate: lint 0/0 · typecheck 0 · 388/388 unit (+1 test: the
       outer record pin; the wiring assertion joined the existing bar
       contract test) · build · 14/14 smoke · 62/62 e2e HELD.

**Phase D — docs + ship**

9. [x] Documentation alignment (count lockstep 387 → 388 unit): README,
       AGENTS.md, CLAUDE.md, PAD v2.5.0, budget-wiser_SKILL.md v1.4.0,
       `docs/session_9.md`, the worklog entry (Task ID 195).
10. [ ] Commit (atomic) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the key.

## 4. Risks and guards

- **The wrapper is invisible chrome on tall pages** (the inner
  min-h-screen covers the viewport below the navbar) — the measurable
  delta is the navbar band; the fix mirrors the reference's byte form
  regardless, per the established genus (the s194 F-2 ink class rode the
  same zero-to-subtle visual band).
- **No gate weakening**: the two new pins are additive; the e2e battery is
  untouched (the clearance + bar tests assert the same geometry — the
  wrapper does not move the bar or the inner root).
- **The dev-vs-build race hazard**: the dev server stays down for the
  gate's build leg (screenshots captured BEFORE the gate, dev stopped
  after).
- `skills/` stays excluded from every check/test/compile scope (verified
  this session: tsc `exclude`, eslint `ignores`, vitest `include`,
  playwright `testDir`).
