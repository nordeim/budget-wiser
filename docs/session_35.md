# Session 22 — The Eleventh Verification Round (Task ID 208)

The round opened per the owner's instruction: the workspace had been
RESET (the third reset in the sequence) — a fresh
`git clone https://github.com/nordeim/budget-wiser.git` booted the
round at `0f56732` (the owner's `docs/session_34.md` transcript commit
atop the s207 ship `c716f75`; the repo delta since the ship verified
docs-only, one file). The five root documents + `docs/session_33.md` +
`docs/REMEDIATION-PLAN-SESSION-18.md` + `worklog.md` +
`docs/session_34.md` were re-read and validated against the tree before
touching anything, and the fresh-clone bootstrap exercised end-to-end
per the s204/s205 pattern: `bun install` (513 packages) → the six-knob
`.env` from `.env.example` (+ a fresh `AUTH_SECRET`) → `bun run db:push`
+ `bun run db:seed` (the documented demo month) → the e2e leg's
Chromium (`bunx playwright install chromium` — the fresh sandbox's
browser cache carried the prior persisted workspace's revision 1200
while the fresh clone's Playwright 1.64.1 pins revision 1248, so the
first e2e run fails the executable-revision check until the documented
bootstrap step runs; the README's "the Bun-installed Chromium for e2e"
requirement, recorded as N-2). The full baseline gate then ran FIRST:
lint 0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
(CI=1) — the exact documented session-207 ship state, green on the
first full pass of the fresh environment.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean, `src/middleware.ts` absent +
`src/proxy.ts` in place, the docs-count lockstep verified (414/67/14
live-tense everywhere), `skills/` confirmed excluded from all four
check/test/compile scopes, and the mandated focus areas each swept
clean — the mobile navigation (the 12-test e2e battery green
standalone + the live byte-census on BOTH apps during the dual-app
diff) and TailwindCSS v4 (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
`safe-area-pb` @utility, literal-class discipline, no config JS — no
v4-family bugs found). The `.env`/`db` contract verified (six knobs,
`db/` at the repo root, `.env.example` tracked at HEAD with identical
knob names), the Vitest + Playwright suites verified in place with
clean config scopes, the SEO surfaces verified (sitemap + robots +
manifest explicit route handlers), and the neo-crm tech-stack lineage
re-confirmed from the carried `neo-crm_SKILL.md`.

## The live re-audit: the SIXTEENTH census — ZERO code findings

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 207** — the first census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps: the `%20` probe
(`/Curl%20Probe%20208%20Test`) answers the DECODED title `Curl Probe
208 Test | Budget Wise` on the reference AND on ours identically (ours
with the real 404 status, curl-verified); the `%2D` path answers "Foo
Bar | Budget Wise" on both (the decode-precedes-hyphen order); the 404
BODY quotes the raw encoded path on BOTH apps; the malformed-escape
posture held (ours answers the designed 404, the reference's CDN
bounces a bare 400 — the kept genus). The census lesson from s207
(probe a %20 path at least once per census) applied from its first
round. Every other parity surface answered byte-identical: the body
census (`[#root, #base44-edit-badge, #recharts_measurement_span]`),
the shell (nav classes + `main.pb-20 md:pb-0` + the outer surface
wrapper), all four pages (containers 7xl/5xl/5xl/4xl, titles via FULL
navigations), the mobile bottom bar byte-identical on every dimension
(the bar classes, the `flex items-center justify-around py-2` row
wrapper, item classes, the ink split on the anchor AND its svg, rect
top=767 h=77, the four w-6/h-6 lucide icons, NO aria-current), the
scroll-end clearance (764 ≤ 767 measured per the e2e contract's
lowest-box form at scroll-end on BOTH apps), both dialogs (the
VALUE-attribute probe answering the s203 genera verbatim —
`value="health"` for Healthcare, the income-`other` reuse; the
reference's Income tab keyboard-activated cleanly with the documented
family swap), the Set Budget dialog (Category/Monthly Limit labels +
the 0.00 placeholder), the sitemap format + robots.txt, the login card
(the 4-button OAuth row), the donut geometry (341×280 container /
200×200 `g.recharts-pie` / 331px legend on the precise probe), and
the transaction-row anatomy.

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
EIGHTH consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight
guard (the gate's build tree removed — `[dev-preflight] removed the
stale production .next tree`, Ready in 285ms, health 200 + db up, 0
reload loops, zero notices) before the daemonized census boot (the
s204 process-reaper posture; the daemonizer re-created per the
standing argv convention — the workspace reset had retired the s207
tooling, recorded as N-3). The local census matched on every surface:
the shell (with our documented body-chrome platform-face genus), the
mobile bar byte-identical (+ the `aria-current="page"`/nav-landmark
superset), the clearance identical (764 ≤ 767 both apps), all titles
matching, the 404 surface byte-matching (the decoded title + the
raw-encoded body + the real 404 status + the "Go Home" button), both
dialogs matching (our `healthcare`/`other_income` ids + the
placeholder option — the documented internal-wire genus), the SEO
surfaces matching (the documented lowercase-loc divergence, format
byte-matched; manifest 200 — our functional superset vs the
reference's 302), and the donut geometry byte-identical.

## The verification

- **The screenshot battery at 9/12 byte-identical** — nine frames
  byte-identical (dashboard-desktop on the settled capture, budgets at
  both axes, dashboard-mobile, the landing, the login, transactions at
  both axes, profile-mobile) and the three delta frames each at its
  documented genus: the profile-DESKTOP frame at the avatar-jitter
  genus in its exact s201/s203/s206 desktop form (bbox
  (357,255)–(505,374)) — SUB-VISIBLE this round (0 px above the
  8-luminance threshold) while profile-MOBILE answered byte-identical
  (the genus moving with the capture environment, the third consecutive
  confirmation); and both dialog frames at the backdrop-blur genus —
  add-transaction at 46 px visible above the 64-luminance threshold
  (within the documented 16–66 family range) and set-budget at 16 px
  (the exact s203/s205/s206 count), the card interiors otherwise
  unchanged, proven by the settled re-captures + the fresh-vs-fresh
  stability check (26,784 px between a 1.2s-wait and a 2.5s-wait
  capture of the identical dialog — the settle window owns the delta,
  N-4).
- **(N-1) The donut settle-wait observation:** the dashboard-DESKTOP
  frame answered DELTA on the first capture (495 px above the visible
  threshold spread across the 201×200 donut region) — the recharts
  donut's entry animation caught mid-flight inside the
  networkidle+1.2s wait; the settled re-capture (3.5s) answered
  byte-identical to HEAD. The settle-wait discipline is confirmed
  load-bearing for the donut-bearing frames: the battery wants ≥3s on
  the dashboard frame and ≥2.5s on the dialog frames in this capture
  environment.
- **The VLM battery: 3× "Structural Differences: None" + the
  dashboard pair's 2 flags both documented DOM-disproven genera** —
  the FIFTH consecutive battery at zero structural flags (the
  savings-badge conditional and the donut-legend data state, both
  data-borne, cross-checked against the round's direct byte-census
  before classification; the s204 flag-variance methodology note
  re-confirmed — the battery is a coarse signal, never a gate).
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, Ready in 285ms, health 200 + db up, no
  reload loop, zero notices.
- The dev log carried zero errors/warnings/deprecations.

## The informational notes

- **(N-2) The fresh-workspace Chromium bootstrap note:** the sandbox's
  Playwright browser cache carried the prior persisted workspace's
  chromium revision 1200; the fresh clone's Playwright 1.64.1 pins
  revision 1248, so the first `test:e2e` of a fresh workspace fails
  the executable-revision check (auth.setup: "Executable doesn't
  exist … chromium_headless_shell-1248") until `bunx playwright
  install chromium` runs — the README's documented requirement, now
  with the observed failure mode.
- **(N-3) The tooling re-creation note:** the workspace reset retired
  the s206/s207 capture-consumer tooling (the pixel-diff, the dialog
  interior diff, the daemonizer); all re-created per the standing
  argv convention — the convention held through a workspace reset, the
  fourth consecutive round of the captures-consumer true-up class.
- **(N-4) The dialog settle-window proof:** the fresh-vs-fresh
  stability check on the identical set-budget dialog — the 1.2s-wait
  frame vs the 2.5s-wait frame differ by 26,784 visible px in the
  card interior while the settled frame answers HEAD at exactly 16 px
  — the settle window (the backdrop-blur re-render + the open
  animation) owns the first-capture delta; the settled re-capture is
  the evidence frame, the transient is never drift.

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-19.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.18.0** (the revision block),
`budget-wiser_SKILL.md` **v1.17.0** (the provenance + Appendix C's
session-208 row + the Source sessions 208 entry), this log, and the
worklog entry (Task ID 208). The README, AGENTS.md, and CLAUDE.md
needed no changes (the counts held at 414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
