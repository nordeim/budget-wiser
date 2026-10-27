# Budget Wise — Session 7 Remediation Plan

**Date:** 2026-10-28 · **Branch:** `main` only · **Method:** TDD (red → green → refactor)

## 1. Audit scope executed (this session)

- Fresh intake: `git clone` at `fe6c4d4` (the owner's `docs/session_10.md`
  transcript commit atop `7670bd7`, the session-195 ship) — the workspace
  had been reset. Environment re-bootstrapped: `bun install` (513
  packages) · `.env` recreated on the mandated six-knob contract
  (`DATABASE_URL="file:../db/custom.db"`, db/ at the repo root, fresh
  64-char `AUTH_SECRET`) · `db:push` + `db:seed` (the demo month intact)
  · Playwright chromium-1248 installed (the e2e leg's browser).
- The five root documents + `docs/session_9.md` +
  `docs/REMEDIATION-PLAN-SESSION-6.md` + `worklog.md` +
  `docs/session_10.md` re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 388/388
  unit · build · 14/14 smoke · 62/62 e2e — the exact documented
  session-195 ship state.
- The local audit (per `skills/web-application/SKILL.md` §16/§20
  dimensions): no `dangerouslySetInnerHTML`, no secrets, no live keys,
  no `console.log`, no TODO/FIXME placeholders in `src/`; `.env.example`
  matching the six-knob contract; docs-count lockstep (388/62/14)
  verified at every claim site; `skills/` confirmed excluded from the
  tsc/eslint/vitest/playwright scopes; the s195 diff reviewed for
  coherence (surgical: one record + one shell restructure + two pins).
- The Tailwind v4 focus sweep (the round's mandated attention): the
  `@custom-variant hover` unwrap, the `--shadow-sm`/`--blur-sm` re-pins,
  the v3 palette re-pin block, the literal-class discipline, the
  `safe-area-pb` @utility, and the no-config-JS rule all verified
  in place — no v4-family bugs found.
- The mobile-navigation focus sweep: the bar byte-census on BOTH apps
  (identical class string, rect y=767 h=77, 4 items, active/inactive
  ink split, row classes), the scroll-end clearance (764 ≤ 767 on both),
  the 11-test e2e battery green, the desktop pill split, no hamburger,
  no scroll lock — the mobile menu works exactly as the reference's.
- Live reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844): the shell (the s195 outer surface
  wrapper form intact — FOURTH consecutive census with no new wave),
  all four app pages (containers 7xl/5xl/5xl/4xl, headers, KPI grid,
  filter card, divide-y rows, dark card, empty state, native select),
  both dialogs (stock `border-input` h-9 forms, native selects,
  `space-y-6 pt-4`), the bottom bar (byte-identical), the clearance,
  the sitemap (4 entries) + robots.txt, every page TITLE (login,
  landing, all four app routes — all matching), the VLM battery
  (dashboard mobile/desktop, budgets mobile, profile mobile — "None"
  ×4 after two first-run flags were DOM-disproven: the platform badge
  occluding tabs 3–4, and the data-borne savings-badge conditional).

## 2. Findings

### Medium (a visible-in-browser-chrome parity break)

| # | Finding | Evidence |
|---|---|---|
| F-1 | **The 404 surface's title + quoted-path form diverge.** The reference's 404 sets its tab title to `<Humanized last non-empty path segment> \| Budget Wise` — the humanize splits hyphens AND camelCase boundaries, capitalizing each token's first letter while preserving the rest — and its body message quotes the unmatched pathname WITHOUT the leading slash. Ours answers every 404 with the static `Budget Wise` title and quotes `"/pathname"` WITH the leading slash. The s191 pin (`title: { absolute: "Budget Wise" }`) captured the reference's SERVED head (its SPA serves the root head under the fallback); the client-side title update that follows is the visible form the user actually sees in the tab. | Live-probed on 9 paths: `/About`→"About \| Budget Wise", `/signup`→"Signup \| Budget Wise" (still the documented 404 — the title is the only change), `/nonexistent-route-xyz`→"Nonexistent Route Xyz \| Budget Wise", `/foo/bar`→"Bar \| Budget Wise" (last segment), `/some-fake-route`→"Some Fake Route \| Budget Wise", `/iPhoneCaseTEST`→"I Phone Case TEST \| Budget Wise" (camelCase split), `/UPPER`→"UPPER \| Budget Wise" (rest-case preserved), `/a-b-c`→"A B C \| Budget Wise", `/foo/`→"Foo \| Budget Wise" + body quotes `"foo/"` (trailing slash kept, leading stripped). Our /fake/deep/route: title "Budget Wise", body quotes `"/fake/deep/route"` |

### Verified clean (no drift — no action)

- The shell: `body (white) > DIV('') > [DIV.min-h-screen.bg-slate-50 > [NAV, bar, MAIN.pb-20 > inner root], toast viewport]` — the s195 outer wrapper intact on both apps; the navbar band pixel-sampled rgb(254,254,255) on BOTH captures (the s195 parity holds).
- All four app pages, both dialogs, the bottom bar (byte-identical
  anatomy + rect + ink), the pb-20 clearance (764 ≤ 767 both apps),
  the login card (4 OAuth buttons), the sitemap format, robots.txt.
- Every page title: `/`→"Budget Wise", `/login`→"Budget Wise",
  `/Dashboard`→"Budget Wise", `/Transactions|/Budgets|/Profile`→"<Name> |
  Budget Wise" — identical on both apps.
- The VLM battery: 3× "Structural Differences: None" + 1 pair (dashboard
  mobile) whose two flags were DOM-disproven (the same s195 genus: the
  platform's "Edit with Base44" badge occluding tabs 3–4; the
  null-savings conditional badge being data-borne).
- The reference's `/Contact` + `/About`: still the 404 surface (our own
  /about /contact marketing pages remain the documented own-IA superset).

## 3. Remediation ToDo (executed TDD)

**Phase A — red tests first**

1. [x] `tests/not-found-title.test.ts` (new): the pure helper's pins —
       the 9 live-probed title cases + the empty-segment fallback +
       the quoted-path leading-slash strip. Born RED (the helper module
       does not exist yet).
2. [x] `tests/e2e/app-flows.spec.ts`: the 404-surface e2e (title
       post-hydration + the quoted path without the leading slash +
       the Go Home round-trip). Born RED against the static title.

**Phase B — the fix (green)**

3. [x] `src/lib/not-found-title.ts` (new): `notFoundTitle(pathname)` —
       last non-empty segment → hyphen + camelCase split →
       first-letter capitalize (rest preserved) → `"<Humanized> |
       Budget Wise"` (fallback: plain "Budget Wise" when the humanized
       form is empty); `notFoundQuotedPath(pathname)` — strip the
       leading slash only.
4. [x] `src/app/not-found-body.tsx`: the message quotes
       `notFoundQuotedPath(pathname)`; a `document.title` effect sets
       `notFoundTitle(pathname)` post-hydration (mirroring the
       reference's SPA behavior — its served head carries the root
       title, its client updates the tab). The SSR metadata stays the
       s191 absolute "Budget Wise" (the served-HTML pin is unchanged —
       the reference's own served head answers the same).

**Phase C — evidence**

5. [x] Live verification on the dev server: the probed paths render the
       reference's exact title + quoted form; navigating away (Go Home)
       restores the landing title.
6. [x] The screenshot battery recaptured (12 images under
       `docs/screenshots/`).
7. [x] VLM spot-check on the unchanged surfaces (parity held).
8. [x] Full gate: lint 0/0 · typecheck 0 · **401 unit** (+13: the 9
       not-found-title pins + the 4 alias-metadata pins; the s191 404 pin
       re-formed for generateMetadata) · build · 14/14 smoke · **66 e2e**
       (+4: the three 404-surface tests + the capitalized-route titles
       test) — counts lockstepped across the doc set in the same commit.

**Phase D — docs + ship**

9. [x] Documentation alignment: README (counts), CLAUDE.md (counts),
       PAD v2.6.0 (revision block), budget-wiser_SKILL.md v1.5.0
       (reference-state note + Appendix C's session-196 row),
       `docs/session_11.md`, the worklog entry (Task ID 196).
10. [ ] Commit (atomic) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the
        key.

## 4. Risks and guards

- **The SSR-vs-client title seam**: the served HTML keeps the absolute
  "Budget Wise" (the s191 metadata pin — the reference's own served
  head answers the same), and the client effect updates the tab
  post-hydration. The e2e test waits for hydration before asserting
  the title (the fill-vs-hydration race family's twin).
- **No gate weakening**: the metadata.test.ts s191 pin stays green (the
  shipped metadata is unchanged); the new pins are additive.
- **The humanize edge cases** (all-caps preservation, camelCase splits,
  trailing slashes) are pinned by the 9 live-probed cases — the helper
  is pure and unit-tested on both sides of the wire.
- **The dev-vs-build race hazard**: the dev server stays down for the
  gate's build leg (screenshots captured BEFORE the gate, dev stopped
  after).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).

## 5. Execution addendum (what the plan grew mid-round)

- **F-2 (found during F-1's live verification): the capital-alias title
  drop.** The .jsx alias stubs re-exported ONLY the default export —
  /Transactions, /Budgets, /Profile (the reference's own nav-href forms)
  silently served the layout default "Budget Wise" instead of
  "<Page> | Budget Wise". Fixed with the metadata re-export
  (`export { metadata } from "../transactions/page"`); /Dashboard stays
  metadata-less BY DESIGN (both apps title the dashboard "Budget Wise").
  Mutation-proofed: a reverted stub → exactly 1 RED, restored → green.
  The genus: green tests masking drift — the unit pins read the
  lowercase files; no e2e asserted titles.
- **The F-1 implementation pivoted from the planned client effect to a
  server-side generateMetadata.** The plan's Phase B sketched a
  document.title effect; probed live, the metadata reconciliation
  re-applies the static title over the effect during hydration (the
  fight was observed and discarded). The curl of the reference's SERVED
  HTML then proved the interpolation is server-side in the reference
  itself (<title>Curl Probe Route | Budget Wise</title>) — so the fix
  moved server-side: `src/middleware.ts` stamps `x-pathname` (probed:
  no path header exists otherwise) and `not-found.tsx`'s generateMetadata
  interpolates. The 404 still answers a REAL 404 status.
- The nested-unmatched-route form verified (/Dashboard/fake-nested →
  "Fake Nested | Budget Wise", the bare 404 surface).
