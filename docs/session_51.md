# Session 30 — The Nineteenth Verification Round (Task ID 216)

The round opened per the owner's instruction with the workspace refreshed
from a RESET state (the eighth reset in the sequence): the fresh-clone
bootstrap ran end-to-end — `git clone` at `00063b2`, the owner's
`docs/session_50.md` transcript commit atop the s215 ship `a5eb7ce` (the
repo delta since the ship verified docs-only, one file); `bun install`
answered 513 packages; the six-knob `.env` from `.env.example` + a fresh
`AUTH_SECRET`; `db:push` + `db:seed` (the demo month: $4,424.55 / 88.5%
saved); the recurring fresh-workspace Chromium revision step — the full
120 MiB headless-shell 1248 download (the sandbox cache carried revision
1200; the clone's Playwright pins 1248). The five root documents +
`docs/session_49.md` + `docs/REMEDIATION-PLAN-SESSION-26.md` +
`worklog.md` + `docs/session_50.md` were re-read and validated against the
tree before touching anything. The full baseline gate then ran FIRST: lint
0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1)
— the exact documented session-215 ship state, green on the first full
pass, with the mobile-navigation battery additionally re-verified
standalone at 12/12.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (no dangerouslySetInnerHTML, no
eval/new Function, no TODO/FIXME, no `any` leaks in `src/`; the three
`console.*` hits answered as the documented sanctioned diagnostics — the
two in-app OTP delivery lines gated by `NEO_DISABLE_IN_APP_OTP` and the
dev-only AUTH_SECRET fallback warning; the key-pattern mentions answered
as the instructional docs + the wrapper's `[REDACTED:ssh_private_key]`
placeholder only), `src/middleware.ts` absent + `src/proxy.ts` in place
(the s201 seam, `x-pathname` stamped), the docs-count lockstep verified
(414/67/14 live-tense), `skills/` confirmed excluded from all four
check/test/compile scopes (tsc exclude · eslint ignores · vitest include ·
playwright testDir), and the mandated focus areas each swept clean — the
**mobile navigation** (the 12-test e2e battery green standalone + the
live byte-census on BOTH apps during the dual-app diff) and **TailwindCSS
v4** (the `@custom-variant hover` unwrap at globals.css:20, the
`--shadow-sm`/`--blur-sm` re-pins at :149/:158, the v3 palette re-pin
block, the `safe-area-pb` @utility at :405, literal-class discipline — no
config JS, no v4-family bugs found). The `.env`/`db` contract verified
(six knobs, `db/` at the repo root, `DATABASE_URL="file:../db/custom.db"`
— the mandated contract, `.env.example` tracked at HEAD), the Vitest +
Playwright suites verified in place with clean config scopes, the SEO
surfaces verified (sitemap + robots + manifest explicit route handlers),
and the neo-crm tech-stack lineage re-confirmed from the carried
`neo-crm_SKILL.md`.

## The live re-audit: the TWENTY-FOURTH census — ZERO code findings

The reference re-audit (agent-browser 0.40.0, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 215** — the ninth census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps once more: the `%20`
probe (`/Curl%20Probe%20216%20Test`) answers the DECODED title `Curl
Probe 216 Test | Budget Wise` on the reference AND on ours identically
(ours with the real 404 status, curl-verified); the `%2D` path answers
"Foo Bar | Budget Wise" on both (the decode-precedes-hyphen order); the
fresh hyphenated probe (`/Hyphen-Probe-216`) answers "Hyphen Probe 216 |
Budget Wise" on both; the 404 BODY quotes the raw ENCODED path on BOTH
apps. The malformed-escape posture held the s210 genus AND face for the
SEVENTH consecutive round: the reference's CDN answers **520** (`error
code: 520`, curl-verified) where ours still answers the designed 404 with
the never-throw raw-segment fallback (real 404 status, curl-verified).
Every other parity surface answered byte-identical: the body census
(`[#root, #base44-edit-badge, #recharts_measurement_span]`, body WHITE),
the shell (nav classes + `main.pb-20 md:pb-0` + the outer surface
wrapper), all four pages (containers 7xl/5xl/5xl/4xl, titles via FULL
navigations), the mobile bottom bar byte-identical on every dimension
(the bar classes, the `flex items-center justify-around py-2` row wrapper,
the four anchors' classes, the ink split on the anchor AND its svg —
slate-900 active / slate-400 inactive, rect top=767 h=77, the four w-6/h-6
lucide icons, NO aria-current on the reference), the scroll-end clearance
(764 ≤ 767 measured with the same all-boxes lowest-box form at scroll-end
on BOTH apps), both dialogs (the expense genus with `value="health"` for
Healthcare in the option family; the income family
`other/salary/freelance/investment/gift` flipping cleanly on the driver's
focus+Enter keyboard activation — the documented platform contrast), the
Set Budget dialog (Category/Monthly Limit labels + the 0.00 placeholder),
the sitemap format + robots.txt (curl-verified LF-only, 4-space indent,
changefreq weekly, priority 1.0/0.8, lowercase "User-agent"; manifest 302
on the reference vs our 200 functional superset), the login card (the
4-button OAuth row), the donut geometry (341×280 container / 200×200
`g.recharts-pie` / 331px legend on the precise probe at the pinned
1512×945 viewport), and the transaction-row anatomy (the `flex
items-center gap-4 p-4 hover:bg-slate-50 transition-colors` family on
/Transactions with the inner three-children family byte-identical on both
apps).

**The data state: UNCHANGED from the s200 baseline** — Balance −$2,481.00
/ Income $0.00 / Expenses $2,481.00 / 3 transactions. The SIXTEENTH
consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight guard
(the gate's build tree removed — `[dev-preflight] removed the stale
production .next tree`, Ready in 307ms, health 200 + db up, 0 reload
loops, zero notices). The local census matched on every surface: the
login card (the 4-button OAuth row; the local login answered the
documented pre-hydration fill race — the re-fill post-hydration answered
clean), the seeded demo KPIs ($4,424.55 / 88.5% saved — the documented
data-borne divergence), the shell (with our documented body-chrome
platform-face genus — the hidden streaming div at `body.children[0]` +
the Toaster portal + the route announcer), the mobile bar byte-identical
(+ the `aria-current="page"`/nav-landmark superset — ours a
`nav[aria-label="Main navigation"]` landmark, the reference's a plain
DIV), the clearance identical (764 ≤ 767 both apps, the same probe form),
all titles matching, the 404 surface byte-matching (the decoded title +
the raw-encoded body + the real 404 status + the "Go Home" button; the
malformed-escape path answering our designed 404), both dialogs matching
(our `healthcare`/`other_income` internal-wire ids + the placeholder
option — the documented internal-wire genus; our Radix Income tab
flipping cleanly on a synthetic click — the documented platform
contrast), the SEO surfaces matching (the documented lowercase-loc
divergence, format byte-matched; manifest 200 — our functional superset),
the donut geometry byte-identical (341×280 / 200×200 / 331 — measured at
the pinned 1512×945 viewport), and the row anatomy (the inner family
byte-identical on both apps).

## The verification

- **The screenshot battery: 9/12 byte-identical on the FIRST
  viewport-pinned captures + the three delta frames each at its documented
  genus, each answered by the round's two-boot stability proof.** Landing,
  login, dashboard-desktop, transactions-desktop, budgets-desktop,
  dashboard-mobile, transactions-mobile, budgets-mobile, and profile-mobile
  all answered md5-identical to HEAD's `docs/screenshots/` set on the
  first captures (the settle-wait discipline — ≥3.5s dashboard, ≥3s
  dialogs — and the origin-surface contract — add-transaction from the
  Dashboard, set-budget from the Budgets page — applied in full; the
  viewport-pinned convention held on the first pass; the
  dashboard-desktop frame answered 0 changed px — not even the sub-visible
  band this round). The three delta frames each answered at its documented
  genus: add-transaction-dialog at 134 changed px in the bbox
  (590,381)–(612,561) — the s213–s215 caret-phase + 16-px backdrop-blur
  column composite; set-budget-dialog at EXACTLY 16 changed px, 100%
  confined to the single x=590 column (rows 519–534) — the s212/s213
  single-column genus verbatim; profile-desktop at 105 changed px in the
  avatar region ((357,255)–(504,373)), ZERO above the 8-luminance
  threshold, max lum 5.2/255 — the s214 profile-transient genus. The
  stability proof: the A/B consecutive captures on a SECOND independent
  boot answered byte-identical to each other AND to the round's first
  battery captures (atd-A == atd-B == run-1; sbd-A == sbd-B == run-1; the
  profile re-capture == run-1) — in this sandbox the deltas are
  deterministic properties of the rendering stack, conclusively not
  code-borne (the DOM censuses on the same surfaces byte-matched; the same
  surfaces answered HEAD's exact bytes in the s215 environment). Zero
  frames refreshed; HEAD's evidence set stays.
- **The VLM battery: 1× "structural_differences: None"** (budgets-desktop)
  + the other three pairs' flags all documented DOM-disproven
  data-borne/platform genera (the dashboard pair's savings-badge
  conditional — data-borne: the reference's negative balance hides the
  badge, our seeded 88.5% shows it; the transactions-mobile and
  profile-mobile pairs' platform-badge occlusion over the bar's right tabs
  — both frame folds reading as "2-item bars", DISPROVEN by the
  byte-identical bar census: all four anchors byte-matched on both apps) —
  cross-checked against the round's direct byte-census before
  classification (the s204 flag-variance methodology note re-confirmed:
  the battery is a coarse signal, never a gate; the direct byte-census
  remains the classifier of record).
- **The dev-boot guard's live proof:** the round's build→dev sequence fired
  the preflight clean on the un-daemonized boot — the stale production
  tree removed, Ready in 307ms, health 200 + db up, no reload loop, zero
  notices.

## The informational notes

- **(N-1, operational — NEW FINDING) The DEV-TREE variant of the s197
  reload loop: live-reproduced twice, cured by `rm -rf .next`.** The
  round's proof-battery boots 2 and 3 each booted `bun run dev` onto the
  `.next/dev` tree left by the pkill'd previous dev server and entered the
  documented reload loop — 745 `GET /manifest.json` re-fetches + 69
  `GET /login` re-fetches in one session (vs 16 + 1 on the clean boot),
  empty-title `/Dashboard` renders, unhydrated-store captures (a
  deterministic empty-data profile render, 19,406 px from the full
  render), and dialog clicks no-op'ing pre-hydration. The cure (the
  documented remedy, `rm -rf .next` before the boot) answered a completely
  clean boot. No guard extension ships: the s197 marker pair (BUILD_ID +
  the dev lock) owns the production-tree seam only; the dev-tree variant
  has NO distinguishing marker (the `.next/dev/lock` file is ABSENT after
  a pkill'd server, and booting onto an existing dev tree is the NORMAL
  cache-reuse case — 23 consecutive sessions booted pkill'd-tree boots
  clean), so a guard that cleaned every dev tree would regress the normal
  restart flow. The operational posture: `rm -rf .next` before a census
  boot that follows a pkill'd dev server.
- **(N-2) The battery: 9/12 first-pass byte-identical + the stability
  proof** (the details in the verification section above). HEAD's evidence
  set stays.
- **(N-3) The reference's malformed-escape edge face HELD at 520** (the
  s210–s215 note, seventh consecutive round): the genus unchanged (the
  platform edge bounces malformed escapes; ours answers the designed 404
  with the never-throw raw-segment fallback), the face platform-owned,
  documented not remediated.
- **(N-4) The VLM battery's flag variance answered the documented genera**
  (the s204 methodology note): 1× "None" + the other three pairs' flags all
  cross-checked and DOM-disproven by the round's direct byte-census — the
  coarse signal answered within its designed envelope, and the direct
  byte-census remains the classifier of record.

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-27.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.26.0** (the revision block),
`budget-wiser_SKILL.md` **v1.25.0** (the provenance + Appendix C's
session-216 row), this log, and the worklog entry (Task ID 216). The
README, AGENTS.md, and CLAUDE.md needed no changes (the counts held at
414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
