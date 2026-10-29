# Session 23 — The Twelfth Verification Round (Task ID 209)

The round opened per the owner's instruction: the workspace had been
RESET (the fourth reset in the sequence) — a fresh
`git clone https://github.com/nordeim/budget-wiser.git` booted the
round at `a9019ed` (the owner's `docs/session_36.md` transcript commit
atop the s208 ship `33e6c31`; the repo delta since the ship verified
docs-only, one file). The five root documents + `docs/session_35.md` +
`docs/REMEDIATION-PLAN-SESSION-19.md` + `worklog.md` +
`docs/session_36.md` were re-read and validated against the tree before
touching anything, and the fresh-clone bootstrap exercised end-to-end
per the s204/s205/s208 pattern: `bun install` (513 packages) → the
six-knob `.env` from `.env.example` (+ a fresh `AUTH_SECRET`) →
`bun run db:push` + `bun run db:seed` (the documented demo month) → the
e2e leg's Chromium (`bunx playwright install chromium` — the fresh
sandbox's browser cache carried the prior persisted workspace's revision
1200 while the fresh clone's Playwright 1.64.1 pins revision 1248, so
the first e2e run fails the executable-revision check until the
documented bootstrap step runs; the s208 N-2 note, re-hit). The full
baseline gate then ran FIRST: lint 0/0 · typecheck 0 · 414/414 unit ·
build · 14/14 smoke · 67/67 e2e (CI=1) — the exact documented
session-208 ship state, green on the first full pass of the fresh
environment.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean, `src/middleware.ts` absent +
`src/proxy.ts` in place, the docs-count lockstep verified (414/67/14
live-tense everywhere), `skills/` confirmed excluded from all four
check/test/compile scopes, and the mandated focus areas each swept
clean — the mobile navigation (the 12-test e2e battery green standalone
+ the live byte-census on BOTH apps during the dual-app diff) and
TailwindCSS v4 (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
`safe-area-pb` @utility, literal-class discipline, no config JS — no
v4-family bugs found). The `.env`/`db` contract verified (six knobs,
`db/` at the repo root, `.env.example` tracked at HEAD with identical
knob names), the Vitest + Playwright suites verified in place with
clean config scopes, the SEO surfaces verified (sitemap + robots +
manifest explicit route handlers), and the neo-crm tech-stack lineage
re-confirmed from the carried `neo-crm_SKILL.md`.

## The live re-audit: the SEVENTEENTH census — ZERO code findings

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 208** — the second census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps once more: the
`%20` probe (`/Curl%20Probe%20209%20Test`) answers the DECODED title
`Curl Probe 209 Test | Budget Wise` on the reference AND on ours
identically (ours with the real 404 status, curl-verified); the `%2D`
path answers "Foo Bar | Budget Wise" on both (the
decode-precedes-hyphen order); the fresh hyphenated probe
(`/Hyphen-Probe-209`) answers "Hyphen Probe 209 | Budget Wise" on both;
the 404 BODY quotes the raw ENCODED path on BOTH apps; the
malformed-escape posture held (ours answers the designed 404, the
reference's CDN bounces a bare 400 — the kept genus). Every other parity
surface answered byte-identical: the body census (`[#root,
#base44-edit-badge, #recharts_measurement_span]`), the shell (nav
classes + `main.pb-20 md:pb-0` + the outer surface wrapper), all four
pages (containers 7xl/5xl/5xl/4xl, titles via FULL navigations), the
mobile bottom bar byte-identical on every dimension (the bar classes,
the `flex items-center justify-around py-2` row wrapper, the four
anchors' classes, the ink split on the anchor AND its svg, rect top=767
h=77, the four w-6/h-6 lucide icons, NO aria-current), the scroll-end
clearance (764 ≤ 767 measured per the e2e contract's lowest-box form at
scroll-end on BOTH apps), both dialogs (the VALUE-attribute probe
answering the s203 genera verbatim — `value="health"` for Healthcare,
the income-`other` reuse; the reference's Income tab keyboard-activated
cleanly with the documented family swap), the Set Budget dialog
(Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
format + robots.txt (curl-verified), the login card (the 4-button
OAuth row), the donut geometry (341×280 container / 200×200
`g.recharts-pie` / 331px legend on the precise probe), and the
transaction-row anatomy (`p-4` family on /Transactions; the `p-3
rounded-xl` family on the Dashboard's recent list).

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
NINTH consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight guard
(the gate's build tree removed — `[dev-preflight] removed the stale
production .next tree`, Ready in 282ms, health 200 + db up, 0 reload
loops, zero notices) before the daemonized census boot (the s204
process-reaper posture; the daemonizer re-created per the standing argv
convention — the workspace reset had retired the s208 tooling, recorded
as N-3). The local census matched on every surface: the shell (with our
documented body-chrome platform-face genus), the mobile bar
byte-identical (+ the `aria-current="page"`/nav-landmark superset), the
clearance identical (764 ≤ 767 both apps), all titles matching, the 404
surface byte-matching (the decoded title + the raw-encoded body + the
real 404 status + the "Go Home" button), both dialogs matching (our
`healthcare`/`other_income` ids + the placeholder option — the
documented internal-wire genus; our Radix Income tab flipping cleanly
on a synthetic click), the SEO surfaces matching (the documented
lowercase-loc divergence, format byte-matched; manifest 200 — our
functional superset vs the reference's 302), the donut geometry
byte-identical, and the row anatomy.

## The verification

- **The screenshot battery at 8/12 byte-identical** — eight frames
  byte-identical (dashboard-desktop on the settled capture, budgets at
  both axes, dashboard-mobile, the landing, the login, transactions at
  both axes) and the four delta frames each at its documented genus:
  BOTH profile frames at the avatar-jitter genus in the same round —
  profile-DESKTOP at 105 px, bbox (357,255)–(505,374), the exact
  s201/s203/s206/s208 desktop form, and profile-MOBILE at 120 px, bbox
  (84,255)–(235,377), the s202/s203/s205 form — both SUB-VISIBLE (0 px
  above the 8-luminance threshold; the genus on both axes at once,
  N-4); and both dialog frames at the backdrop-blur genus —
  set-budget at 16 px visible above the 64-luminance threshold on the
  first capture (the exact s203/s205/s206/s208 count) and
  add-transaction at 16 px on the Dashboard-origin re-capture (the
  first /Transactions-origin capture had answered a 36.6% full-frame
  delta — the origin-surface artifact N-1: the HEAD frame carries the
  dialog opened from the DASHBOARD; VLM-identified, the dialog card
  itself identical, the blurred backdrop the only difference).
- **(N-1) The dialog origin-surface census lesson:** the battery's
  dialog frames pin their ORIGIN SURFACE as part of the capture
  contract — add-transaction opens from the Dashboard (the blurred
  backdrop = the KPI row + donut + recent list), set-budget from the
  Budgets page. A capture from the wrong origin answers a full-frame
  procedural delta that is never drift; the same-origin re-capture
  answers at the exact documented 16-px genus.
- **The VLM battery: 1× "Structural Differences: None" + the other
  three pairs' flags all documented DOM-disproven genera** — the
  dashboard pair's savings-badge conditional (data-borne: the
  reference's negative balance hides it, our seeded 88.5% shows it),
  the transactions-mobile + profile-mobile pairs' platform-badge
  occlusion over the bar's right tabs (all four items present on both
  apps per the round's direct byte-census), and the profile pair's
  avatar-content genus (the owner's uploaded photo vs our seeded
  default — data-borne) — cross-checked against the round's direct
  byte-census before classification; the s204 flag-variance methodology
  note re-confirmed (the battery is a coarse signal, never a gate; the
  "None" count varies with the battery's token-level reading of the
  same unchanged DOM).
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, Ready in 282ms, health 200 + db up, no
  reload loop, zero notices.
- The dev log carried zero errors/warnings/deprecations.

## The informational notes

- **(N-2) The fresh-workspace Chromium bootstrap note (recurring):** the
  sandbox's Playwright browser cache carried the prior persisted
  workspace's chromium revision 1200; the fresh clone's Playwright 1.64.1
  pins revision 1248, so the first `test:e2e` of a fresh workspace fails
  the executable-revision check (auth.setup: "Executable doesn't exist
  … chromium_headless_shell-1248") until `bunx playwright install
  chromium` runs — the s208 observation, re-hit on this reset. After
  the install: the full e2e suite green on the first pass.
- **(N-3) The tooling re-creation note (recurring):** the workspace
  reset retired the s208 capture-consumer tooling (the pixel-diff, the
  daemonizer); all re-created per the standing argv convention (every
  captures/log consumer takes its paths from argv) — the convention
  held through a workspace reset, the fifth consecutive round of the
  captures-consumer true-up class.
- **(N-4) The avatar-jitter genus on both axes:** both profile frames
  answered the genus in the same round (desktop 105 px + mobile 120 px,
  both sub-visible) — the genus moves with the capture environment and
  can fire on both axes at once; the axis that answers byte-identical
  is the environment's coin flip, never a code signal (the s206/s208
  observation confirmed with both faces together).

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-20.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.19.0** (the revision block),
`budget-wiser_SKILL.md` **v1.18.0** (the provenance + Appendix C's
session-209 row + the Source sessions 209 entry), this log, and the
worklog entry (Task ID 209). The README, AGENTS.md, and CLAUDE.md
needed no changes (the counts held at 414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
