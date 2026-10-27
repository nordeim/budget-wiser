# Session 5 — The Mobile-Parity Round (Task ID 193)

The round opened per the owner's instruction: fresh clone at `42826cc` (the owner's
`docs/session_4.md` transcript commit; code HEAD `a4128fd`, the session-192 ship),
then the five root documents + `docs/session_3.md` +
`docs/REMEDIATION-PLAN-SESSION-3.md` + `worklog.md` + `docs/session_4.md` re-read
and validated against the tree before touching anything.

The environment was rebuilt standing (bun install · `.env` on the mandated
`DATABASE_URL="file:../db/custom.db"` contract + a fresh `AUTH_SECRET` · db:push +
db:seed — the demo month intact at 2 users / 4 transactions / 0 budgets), and the
full gate ran FIRST: lint 0/0 · typecheck 0 · 382/382 unit · build (all routes,
both casings) · 14/14 smoke · 61/61 e2e (1.2m, first run — after the environmental
Playwright chromium-1248 install).

## The find: the reference's FIRST structural drift

The live reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found the platform's owner had REDESIGNED the
reference since session 192:

- **The mobile bottom tab bar (F-1, High).** A `md:hidden fixed bottom-0 left-0
  right-0 z-50 bg-white border-t border-slate-200 safe-area-pb` bar (76–77px at
  390×844) with `flex items-center justify-around py-2` items — `flex flex-col
  items-center gap-1 px-4 py-2 rounded-xl transition-all`, active
  `text-slate-900` / inactive `text-slate-400`, lucide icons `w-6 h-6`
  (LayoutDashboard / ArrowLeftRight / Target / lucide-user), labels `text-xs
  font-medium`, CAPITALIZED hrefs. On all four app pages; NOT on login; hidden
  ≥768px; no `aria-current`. The sessions-190–192 finding "the reference ships NO
  mobile navigation" was STALE — and our Radix drawer + hamburger (the documented
  superset) had become visible-pixel divergences.
- **No footer on the app surface (F-2, High).** No `footer` element on any app
  page, both axes — our `APP_FOOTER` rendered pixels the reference no longer
  ships.
- **/About + /Contact removed (F-3, Medium).** Both now 404 on the reference, and
  its sitemap lists only `/`, `/Budgets`, `/Profile`, `/Transactions`
  (capitalized). Our own marketing pages + landing-footer links STAY (our
  public-site IA — the landing is the documented superset surface); the stale
  D-142a3 reference-parity comments were corrected (sitemap route + tests).
- **The Profile icon unified (folded into F-1).** The reference carries
  `lucide-user` for Profile on BOTH navs now — our CircleUser (the s190
  extraction) trued up to User.
- **Data drift (F-4, informational).** One "food" transaction (−$1,000) —
  data-borne, the documented excluded genus; our seed keeps the original demo
  month.

Everything else re-verified unchanged: the login card (4 OAuth buttons), the top
navbar, the desktop axis, both dialogs, the Profile structure, the 404 surface,
the sitemap FORMAT, robots.txt.

## The remediation (TDD per docs/REMEDIATION-PLAN-SESSION-4.md, validated against
the seams first)

- **Phase A (red):** the `BOTTOM_NAV` contract pins in `tests/app-chrome.test.ts`
  (bar / row / item / ink / icon+label / the safe-area utility) + the
  no-hamburger/no-drawer/no-footer wiring pins + the nav-icon pin — 9 RED. The
  e2e battery rewritten for the bottom bar, RED against the still-drawered shell.
- **Phase B (green):** the `BOTTOM_NAV` record in `page-layout.ts`
  (byte-extracted classes); `app-shell.tsx` rewritten — the drawer, hamburger,
  matchMedia auto-close, scroll lock, and footer all retired; the bottom tab bar
  added (the reference's exact classes + our kept a11y superset:
  `aria-current="page"` and the labelled nav landmark); the `safe-area-pb` v4
  `@utility` in globals.css (the reference's own class name, made real); the
  nav-config icon true-up (CircleUser → User); the layouts' unused `user` prop
  dropped from the shell signature; the sitemap comment corrected.
- **The in-test catches:** two e2e fixes after the first run — the scroll test
  now waits for hydration before asserting the document scrolls (the
  fill-vs-hydration race's scroll twin), and the a11y two-gate's sanctioned
  register gained the bottom bar's inactive-item citation (the reference's own
  slate-400-on-white ink; the flagged label span inherits the anchor's color, so
  the matcher cites the anchor's `.gap-1.rounded-xl` chain).

## The verification

- **Full gate GREEN:** lint 0/0 · tsc 0 · **381/381 unit** (−11 retired
  drawer/footer pins + 10 born-green bottom-bar pins + 1 icon pin = −1, lockstepped
  across README/CLAUDE/PAD/SKILL) · build · 14/14 smoke · **61/61 e2e HELD**
  (the drawer battery replaced test-for-test: 10 old → 10 new).
- **Byte parity verified live:** the local bar's class string, bounding rect
  (y=767 h=77 at 390×844), item classes, icon set, and ink split are IDENTICAL to
  the reference's; the hamburger and footer are gone.
- **VLM side-by-side:** mobile dashboard / mobile login / mobile budgets all
  **"Structural Differences: None"**.
- **The screenshot battery recaptured** (12 images under `docs/screenshots/` —
  landing, login, all four pages at desktop + mobile with the bar, both dialogs;
  the drawer-open frame retired with the drawer).

## The documentation set

README (the Mobile Navigation section rewritten + counts), AGENTS.md (the
bottom-bar bullet replacing the drawer bullet), CLAUDE.md (principles + counts +
the React-19 note), the PAD **v2.3.0** (the revision block + ADR-006 superseded
in place), `budget-wiser_SKILL.md` **v1.2.0** (frontmatter, §1 reference-state
notes, §5.6, §10, §12, §16, §22, the ADR index, Appendix C's session-193 row),
this log, and the worklog entry (Task ID 193).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
