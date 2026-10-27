# Session 11 — The Title-Surface Round (Task ID 196)

The round opened per the owner's instruction: the workspace had been
reset, so a fresh `git clone` at `fe6c4d4` (the owner's
`docs/session_10.md` transcript commit atop `7670bd7`, the session-195
ship). The environment re-bootstrapped from scratch: `bun install` (513
packages) · `.env` recreated on the mandated six-knob contract
(`DATABASE_URL="file:../db/custom.db"`, the db/ folder at the repo
root, a fresh 64-char `AUTH_SECRET`) · `db:push` + `db:seed` (the demo
month intact) · Playwright chromium-1248 installed (the sandbox's cache
held only the 1200 revision). The five root documents +
`docs/session_9.md` + `docs/REMEDIATION-PLAN-SESSION-6.md` +
`worklog.md` + `docs/session_10.md` re-read and validated against the
tree before touching anything, and the full baseline gate ran FIRST:
lint 0/0 · typecheck 0 · 388/388 unit · build · 14/14 smoke · 62/62
e2e — the exact documented session-195 ship state.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep (no `dangerouslySetInnerHTML`, no
secrets, no live keys, no `console.log`, no TODO placeholders), the
docs-count lockstep verified at every claim site, `skills/` confirmed
excluded from all four check/test/compile scopes, and the s195 diff
reviewed for coherence. The mandated focus areas each swept clean: the
**mobile navigation** (the bar byte-census on BOTH apps — identical
class string, rect y=767 h=77, 4 items, the active/inactive ink split;
the scroll-end clearance 764 ≤ 767 on both; the 11-test e2e battery
green; no hamburger, no scroll lock, the desktop pill split intact) and
**TailwindCSS v4** (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
literal-class discipline, the `safe-area-pb` @utility, no config JS —
no v4-family bugs found).

## The live re-audit: ZERO structural drift — and TWO title-family finds

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **no structural drift since
session 195** — the fourth consecutive shell census with no new
restyle wave: the outer surface wrapper intact, all four app pages
byte-verified (the containers, headers, KPI grid, filter card,
divide-y rows, dark card, empty state, native select), the bottom bar
byte-identical, the clearance (764 ≤ 767), both dialogs (the stock
`border-input` h-9 forms, the native selects, `space-y-6 pt-4`), the
sitemap (4 entries) + robots.txt, the login card. The VLM battery:
"Structural Differences: None" on budgets mobile, profile mobile, and
dashboard desktop; the dashboard-mobile pair's two flags both
DOM-disproven (the platform's "Edit with Base44" badge occluding tabs
3–4 — elementFromPoint returned the badge's IMG/SPAN; the Balance-card
badge absence being data-borne — the reference's null savings rate with
zero income txns) — the same s195 genus, the discipline held.

The **page-title census** (new this round, both apps, served-HTML +
post-hydration) surfaced the finds:

- **F-1 (Medium): the 404 surface's title + quoted-path form.** The
  reference's 404 answers `<Humanized last non-empty path segment> |
  Budget Wise` — served directly in its HTML head (curl-verified:
  `<title>Curl Probe Route | Budget Wise</title>`); the humanize splits
  hyphens AND camelCase boundaries, capitalizing each token's first
  letter while preserving the rest (9 live-probed cases:
  `/iPhoneCaseTEST` → "I Phone Case TEST", `/foo/bar` → "Bar",
  `/foo/` → "Foo", `/UPPER` → "UPPER", `/a-b-c` → "A B C"…). Its body
  message quotes the pathname WITHOUT the leading slash
  (`The page "fake/deep/route" could not…`). Ours answered the static
  s191 "Budget Wise" and quoted `"/pathname"` WITH the slash.
- **F-2 (Medium, found during F-1's live verification): the
  capital-alias title drop.** The `.jsx` alias stubs re-exported ONLY
  the default export — `/Transactions`, `/Budgets`, `/Profile` (the
  reference's own nav-href forms, the links every navbar click follows)
  silently served the layout default "Budget Wise" instead of
  "<Page> | Budget Wise". Invisible to every prior gate: the unit pins
  read the lowercase files; no e2e asserted titles — green tests
  masking the drift, the s192 dead-scripts genus.

## The remediation (TDD per docs/REMEDIATION-PLAN-SESSION-7.md)

- **Phase A (red):** `tests/not-found-title.test.ts` born RED at the
  import (the helper module did not exist); the e2e 404 tests born RED
  against the static title (verified by direct observation — our
  /fake/deep/route title was "Budget Wise").
- **The implementation pivot (probed, not guessed):** the planned
  client `document.title` effect ran but LOST — the metadata
  reconciliation re-applies the static title over it during hydration
  (observed with a window-marker probe: "effect-ran" set, title
  reverted). The curl of the reference's served HTML then proved the
  interpolation is server-side in the reference itself. The fix moved
  server-side: **`src/middleware.ts` (NEW)** stamps `x-pathname` onto
  every routed request (probed: the 404 render's headers carry only
  host + x-forwarded-* — no path header exists otherwise), and
  `not-found.tsx`'s **generateMetadata** interpolates through the pure
  **`src/lib/not-found-title.ts`** (the probed humanize + the
  quoted-path strip). The 404 still answers a REAL 404 status (the
  reference's 200-everything is its SPA platform's face — our real
  status is the kept production-grade posture).
- **The alias fix:** the three stubs now `export { metadata } from` the
  lowercase pages; /Dashboard stays metadata-less BY DESIGN (both apps
  title the dashboard "Budget Wise" — probed on both).
- **The pins:** +13 unit (the 9 not-found-title tests — the humanize
  matrix, the quoted-path strip, the wiring: generateMetadata +
  x-pathname + no document.title) and the 4 alias-metadata pins in
  `tests/metadata.test.ts` (the s191 404 pin re-formed for
  generateMetadata; the brand-purge purpose unchanged). +4 e2e (the
  three 404-surface tests — title post-hydration, the quoted path, the
  Go Home round-trip with the title restore — and the
  capitalized-route titles test). **Mutation-proofed:** a reverted
  Profile stub → exactly 1 RED (the alias pin); restored → green.
  An in-test catch: the alias pin's first regex missed the import's
  quotes — born broken-RED for the wrong reason, fixed with the
  `["']` quote allowance before the mutation proof.

## The verification

- **Full gate GREEN:** lint 0/0 · tsc 0 · **401/401 unit** (+13) ·
  build (the middleware compiled — "ƒ Proxy (Middleware)") · 14/14
  smoke · **66/66 e2e** (+4).
- **Live verification:** the 404 titles on 9 probed paths + the
  nested `/Dashboard/fake-nested` ("Fake Nested | Budget Wise" — the
  bare 404 surface, no app shell); the alias titles curl-verified on
  all four routes (/Dashboard "Budget Wise", the other three
  "<Page> | Budget Wise"); the real 404 status preserved; the
  login/landing/sitemap/robots/health/auth surfaces all unaffected by
  the middleware; the guest wall intact.
- **The screenshot battery recaptured** (12 images under
  `docs/screenshots/`, at the established 1512×945 / 390×844 axes;
  several byte-identical in size to the s195 set — render-stability
  evidence).
- **VLM:** the four parity pairs (dashboard mobile/desktop, budgets
  mobile, profile mobile) + the dialog spot-check — all "Structural
  Differences: None".

## The documentation set

README (counts 401/66), AGENTS.md (the two new architecture-fact
bullets: the alias metadata re-export requirement + the middleware
title seam; the testing map's file list), CLAUDE.md (counts), the PAD
**v2.6.0** (the revision block), `budget-wiser_SKILL.md` **v1.5.0**
(frontmatter/provenance, the §1 reference-state note, the counts,
Appendix C's session-196 row), `docs/REMEDIATION-PLAN-SESSION-7.md`
(ticked + the execution addendum), this log, and the worklog entry
(Task ID 196).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
