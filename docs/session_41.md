# Session 25 — The Fourteenth Verification Round (Task ID 211)

The round opened per the owner's instruction with a PERSISTED workspace
(the sixth reset-free intake in the sequence): `git pull`
fast-forwarded `4b6470c..c22b1d6` (the owner's `docs/session_40.md`
transcript commit atop the s210 ship `4b6470c`; the repo delta since
the ship verified docs-only, one file). The five root documents +
`docs/session_39.md` + `docs/REMEDIATION-PLAN-SESSION-21.md` +
`worklog.md` + `docs/session_40.md` were re-read and validated against
the tree before touching anything, and the standing environment
re-verified against the contract (the 513-package `node_modules/`, the
six-knob `.env` with the standing AUTH_SECRET, the seeded `db/` at the
repo root, `.env.example` tracked with identical knob names, the e2e
Chromium already at the pinned revision — the N-2 bootstrap step not
re-hit on a standing workspace). The full baseline gate then ran
FIRST: lint 0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke ·
67/67 e2e (CI=1) — the exact documented session-210 ship state, green
on the first full pass, with the mobile-navigation battery
additionally re-verified standalone at 12/12.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (the tree's three `console.*`
hits answered as the documented sanctioned diagnostics — the two
in-app OTP delivery lines gated by `NEO_DISABLE_IN_APP_OTP` and the
dev-only AUTH_SECRET fallback warning; the key-pattern mentions
answered as instructional text + the wrapper's
`[REDACTED:ssh_private_key]` placeholder only), `src/middleware.ts`
absent + `src/proxy.ts` in place, the docs-count lockstep verified
(414/67/14 live-tense), `skills/` confirmed excluded from all four
check/test/compile scopes, and the mandated focus areas each swept
clean — the mobile navigation (the 12-test e2e battery green
standalone + the live byte-census on BOTH apps during the dual-app
diff) and TailwindCSS v4 (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
`safe-area-pb` @utility, literal-class discipline — no config JS, no
v4-family bugs found). The `.env`/`db` contract verified (six knobs,
`db/` at the repo root, `.env.example` tracked at HEAD), the Vitest +
Playwright suites verified in place with clean config scopes, the SEO
surfaces verified (sitemap + robots + manifest explicit route
handlers), and the neo-crm tech-stack lineage re-confirmed from the
carried `neo-crm_SKILL.md`.

## The live re-audit: the NINETEENTH census — ZERO code findings

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 210** — the fourth census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps once more: the
`%20` probe (`/Curl%20Probe%20211%20Test`) answers the DECODED title
`Curl Probe 211 Test | Budget Wise` on the reference AND on ours
identically (ours with the real 404 status, curl-verified); the `%2D`
path answers "Foo Bar | Budget Wise" on both (the
decode-precedes-hyphen order); the fresh hyphenated probe
(`/Hyphen-Probe-211`) answers "Hyphen Probe 211 | Budget Wise" on
both; the 404 BODY quotes the raw ENCODED path on BOTH apps. The
malformed-escape posture held the s210 genus AND face: the reference's
CDN answers **520** (`error code: 520`, curl-verified) where ours still
answers the designed 404 with the never-throw raw-segment fallback
(`%E0%A4%A | Budget Wise`, real 404 status). Every other parity
surface answered byte-identical: the body census
(`[#root, #base44-edit-badge, #recharts_measurement_span]`), the shell
(nav classes + `main.pb-20 md:pb-0` + the outer surface wrapper), all
four pages (containers 7xl/5xl/5xl/4xl, titles via FULL navigations),
the mobile bottom bar byte-identical on every dimension (the bar
classes, the `flex items-center justify-around py-2` row wrapper, the
four anchors' classes, the ink split on the anchor AND its svg AND its
label, rect top=767 h=77, the four w-6/h-6 lucide icons, NO
aria-current), the scroll-end clearance (764 ≤ 767 measured per the
e2e contract's lowest-box form at scroll-end on BOTH apps), both
dialogs (the VALUE-attribute probe answering the s203 genera verbatim —
`value="health"` for Healthcare; the income family
`other/salary/freelance/investment/gift` flipping cleanly on keyboard
activation), the Set Budget dialog (Category/Monthly Limit labels + the
0.00 placeholder), the sitemap format + robots.txt (curl-verified),
the login card (the 4-button OAuth row), the donut geometry (341×280
container / 200×200 `g.recharts-pie` / 331px legend on the precise
probe), and the transaction-row anatomy (`p-4` family on
/Transactions; the `p-3 rounded-xl` family on the Dashboard's recent
list).

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
ELEVENTH consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight guard
(the gate's build tree removed — `[dev-preflight] removed the stale
production .next tree`, Ready in 272ms, health 200 + db up, 0 reload
loops, zero notices) before the daemonized census boot (the N-3
TIME_WAIT sequence: the first daemonized attempt answered EADDRINUSE
against the reaped proof boot's lingering socket; the standard detached
spawn re-fired clean once the socket cleared). The local census
matched on every surface: the shell (with our documented body-chrome
platform-face genus), the mobile bar byte-identical (+ the
`aria-current="page"`/nav-landmark superset), the clearance identical
(764 ≤ 767 both apps), all titles matching, the 404 surface
byte-matching (the decoded title + the raw-encoded body + the real 404
status + the "Go Home" button; the malformed-escape path answering our
designed 404), both dialogs matching (our `healthcare`/`other_income`
ids + the placeholder option — the documented internal-wire genus; our
Radix Income tab flipping cleanly on a synthetic click — the
documented platform contrast, where the reference's tab needs real
keyboard activation), the SEO surfaces matching (the documented
lowercase-loc divergence, format byte-matched; manifest 200 — our
functional superset vs the reference's 302), the donut geometry
byte-identical (341×280 / 200×200 / 331 — measured at the pinned
1512×945 desktop viewport, the s210 methodology lesson applied), and
the row anatomy.

## The verification

- **The screenshot battery at 9/12 byte-identical + the three delta
  frames each at its documented capture-environment genus:** the nine
  stable frames (landing, login, transactions-desktop,
  budgets-desktop, profile-desktop, dashboard-mobile,
  transactions-mobile, budgets-mobile, profile-mobile) answered
  md5-identical to HEAD's `docs/screenshots/` set (shipped at
  b0f2d27, the s209 round) on the first captures; the two dialog
  frames answered at the exact 16-px backdrop-blur genus (a
  single-pixel column at x≈590, 16 px above the 64-luminance
  threshold); the dashboard-desktop frame answered 49,265 changed px
  (3.4%) with ZERO px above the 8-luminance threshold — sampled pixels
  show (248,250,252)-vs-(255,255,255) composite deltas, the sub-visible
  class of the documented avatar-jitter genus family (content verified
  identical by the round's direct byte-census + the live
  donut-geometry probe; 5107 unique colors on the fresh frame at the
  exact viewports). After s210's 12/12 zero-delta battery, the same
  captures re-fire the genera — the datum re-confirms the s210 N-4
  reading: the genera families are capture-environment-borne, never
  code-borne. Zero frames needed refreshing; the settle-wait
  discipline (≥3.5s dashboard, ≥3s dialogs) and the origin-surface
  contract (add-transaction from the Dashboard, set-budget from the
  Budgets page) were applied in full regardless.
- **The VLM battery: 1× "structural_differences: None"
  (budgets-desktop) + the other three pairs' flags all documented
  DOM-disproven data-borne/platform genera** — the dashboard pair's
  savings-badge conditional (data-borne: the reference's negative
  balance hides it, our seeded 88.5% shows it) + the donut-legend data
  state (the owner's 2-category data vs our seeded 3-category demo
  month; the geometry byte-identical per the direct census), and the
  transactions-mobile + profile-mobile pairs' platform-badge occlusion
  over the bar's right tabs + the per-category badge/icon data genera
  (all four items present on both apps per the round's direct
  byte-census) — cross-checked against the round's direct byte-census
  before classification; the s204 flag-variance methodology note
  re-confirmed (the battery is a coarse signal, never a gate).
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, Ready in 272ms, health 200 + db up, no
  reload loop, zero notices.
- The dev log carried zero errors/warnings/deprecations across the
  whole census (the telemetry notice lines aside).

## The informational notes

- **(N-1) The three delta frames at documented genera — the
  variance pattern re-confirms the s209/s210 classification:** the
  two dialog frames at the exact 16-px backdrop-blur genus + the
  dashboard-desktop frame at the sub-visible composite-variance genus
  (zero px above the 8-luminance threshold). The firing after s210's
  zero-delta battery is an environment datum, not a code signal;
  HEAD's evidence set stays.
- **(N-2) The reference's malformed-escape edge face HELD at 520**
  (the s210 N-1 note, second consecutive round): the genus unchanged
  (the platform edge bounces malformed escapes; ours answers the
  designed 404), the face platform-owned, documented not remediated.
- **(N-3) The port-3000 TIME_WAIT operational note (new):** the
  un-daemonized preflight-proof boot reaped the `bun` parent at its
  timeout but the child's listen socket lingered in TIME_WAIT, so the
  first daemonized census boot answered EADDRINUSE while the port
  simultaneously refused connections. The census boot waited out the
  socket and re-fired clean on the standard detached spawn. Future
  rounds: after the un-daemonized proof, verify the port is bindable
  before assuming a daemon failure.
- **(N-4) The navigation-omitted probe error (census-methodology
  datum, the same class as the s210 viewport lesson):** the round's
  first per-page container enumeration read `main div` four times
  without navigating — the browser sat on /Profile and answered
  `max-w-4xl` four times, briefly resembling a container-family
  drift. The re-probe WITH navigation answered the documented
  7xl/5xl/5xl/4xl exactly. A repeated identical answer across "pages"
  is the tell of an omitted navigation.

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-22.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.21.0** (the revision block),
`budget-wiser_SKILL.md` **v1.20.0** (the provenance + Appendix C's
session-211 row + the Source sessions 211 entry), this log, and the
worklog entry (Task ID 211). The README, AGENTS.md, and CLAUDE.md
needed no changes (the counts held at 414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
