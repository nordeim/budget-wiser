# Session 9 — The Shell-Surface Round (Task ID 195)

The round opened per the owner's instruction: `git pull` to `38578d5` (the
owner's `docs/session_8.md` raw transcript of the session-194 ship, atop
`2fd1bce`), then the five root documents + `docs/session_7.md` +
`docs/REMEDIATION-PLAN-SESSION-5.md` + `worklog.md` + `docs/session_8.md`
re-read and validated against the tree before touching anything. The
environment verified standing (the Prisma client regenerated after the
sandbox's cache hiccup — the local `node_modules/.bin` binary used, not the
stale global bun cache entry; `.env` on the mandated six-knob contract; the
demo month intact at 2 users / 4 transactions / 0 budgets; chromium-1248
present), and the full gate ran FIRST: lint 0/0 · typecheck 0 · 387/387
unit · build · 14/14 smoke · 62/62 e2e — the exact documented session-194
ship state.

The local audit followed `skills/web-application/SKILL.md`'s dimensions:
the security sweep (no `dangerouslySetInnerHTML`, no secrets, no live keys —
only the wrapper script's redacted placeholders), the docs-count lockstep
verified at every claim site, and `skills/` confirmed excluded from all
four check/test/compile scopes (tsc `exclude`, eslint `ignores`, vitest
`include`, playwright `testDir`).

## The find: the reference's THIRD shell restyle — the outer surface wrapper

The live reference re-audit (agent-browser, fresh login with the owner's
credentials after the saved auth state expired, 1512×945 + 390×844) found
exactly one structural delta:

- **F-1 (Medium): the shell gained an outer surface wrapper.** The
  reference's chrome is now `body (white) > DIV('') > [DIV.min-h-screen.
  bg-slate-50 > [NAV(sticky), DIV(bar), MAIN.pb-20 md:pb-0 > DIV.
  min-h-screen.bg-slate-50 > page], DIV(toast viewport)]` — a
  `min-h-screen bg-slate-50` div encloses the whole trio. Ours rendered
  the trio directly in the bare wrapper. The pixel evidence: the
  translucent navbar (`bg-white/80 backdrop-blur-sm`) renders
  **rgb(254,254,255)** on the reference (white/80 over the wrapper's
  slate-50) vs **rgb(255,255,255)** on ours (white/80 over the white
  body) — sampled at y=8/30/57 across the 65px navbar band on both apps'
  captures. The phone scroll-end clearance strip below the inner root's
  box would also differ on short-content pages (slate-50 vs white).

Everything else re-verified UNCHANGED, byte-for-byte where pinned: all
four page trees (the per-page containers, the sm-stacking headers with
`mb-8`, the KPI grid and gradient cards, the filter card, the divide-y
rows with description-first titles, the budgets dark card + empty state,
the profile grid); the bottom bar's anatomy, rect (y=767 h=77), and
active-icon ink; the pb-20 clearance guarantee (lowest main box 764 ≤
barTop 767 on both apps); both dialogs (the stock `border-input` h-9
inputs, the native category select inside the trigger, the "Add a note..."
placeholder, the `#171717` submit); the login card; the sitemap (4
entries) + robots.txt; /About + /Contact still the 404 surface; and the
owner's data state (the one food transaction — data-borne, excluded). The
reference's toast viewport (`fixed top-0 z-[100]…`) is invisible DOM
chrome in both apps — out of parity scope, like the platform's
"Edit with Base44" badge.

## The remediation (TDD per docs/REMEDIATION-PLAN-SESSION-6.md)

- **Phase A (red):** the `SHELL_LAYOUT.outer` record pin + the
  shell-wiring pin (the trio wrapped in `<div
  className={SHELL_LAYOUT.outer}>`) — born RED, exactly the two intended
  failures (the wiring assertion joined the existing bar contract test,
  so +1 test file case, +2 assertions).
- **Phase B (green):** `SHELL_LAYOUT.outer` added to `page-layout.ts`
  (with the session-195 comment citing the live probe); `app-shell.tsx`
  restructured — the bare DIV now contains the outer surface wrapper,
  which contains [BrandNav, BottomTabBar, main > inner root].
- **In-test catch:** a scratch `bun add -d pngjs` for the pixel sampler
  had touched the manifest — removed before commit (the sampler moved to
  the workspace-external scripts dir; the repo manifest stayed surgical).

## The verification

- **Full gate GREEN:** lint 0/0 · tsc 0 · **388/388 unit** (+1 pin) ·
  build · 14/14 smoke · **62/62 e2e** HELD (the wrapper moves no
  geometry — the bar battery and the clearance test pass untouched).
- **Live byte verification:** the shell hierarchy matches the
  reference's form exactly (bare DIV > DIV.min-h-screen.bg-slate-50 >
  [NAV, NAV, MAIN.pb-20 > inner root]); the navbar band re-sampled
  **rgb(254,254,255) on BOTH apps** post-fix; the mobile geometry
  unchanged (bar y=767 h=77, lowest box 764, active svg ink
  byte-identical).
- **VLM side-by-side:** dashboard mobile / budgets mobile / profile
  mobile / dashboard desktop — all **"Structural Differences: None"**.
  The first dashboard-mobile run flagged two items, both disproven by DOM
  probes (the discipline of never trusting a judge without the DOM):
  the "only two tabs" read was the reference's own "Edit with Base44"
  platform badge occluding tabs 3–4 in the capture (elementFromPoint at
  the flagged pixels returned the badge's SPAN/IMG/BUTTON); the
  Balance-card badge absence is data-borne (the reference's savings rate
  is null — zero income transactions — so its conditional badge doesn't
  render; ours renders at 88.5%).
- **The screenshot battery recaptured** (12 images under
  `docs/screenshots/`, all at the established 1512×945 / 390×844 axes).

## The documentation set

README (the shell hierarchy + counts 388/62), AGENTS.md (the shell
bullet's outer-wrapper form), CLAUDE.md (the counts), the PAD **v2.5.0**
(the revision block + ADR-006's s195 amendment), `budget-wiser_SKILL.md`
**v1.4.0** (the reference-state note + Appendix C's session-195 row),
`docs/REMEDIATION-PLAN-SESSION-6.md`, this log, and the worklog entry
(Task ID 195).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
