# Session 27 — The Sixteenth Verification Round (Task ID 213)

The round opened per the owner's instruction with a RESET workspace
(the sixth reset in the sequence): the fresh-clone bootstrap exercised
live end-to-end — `git clone` at `8f0faef` (the owner's
`docs/session_44.md` transcript commit atop the s212 ship `422371f`;
the repo delta since the ship verified docs-only, one file), then
`bun install` (513 packages), the six-knob `.env` from `.env.example`
with a fresh `AUTH_SECRET`, `db:push` + `db:seed` (custom.db at the
repo root, git-ignored), and the recurring fresh-workspace Chromium
revision step (`bunx playwright install chromium` — the sandbox cache
carried revision 1200; the clone's Playwright pins the 1248 headless
shell, N-2). The five root documents + `docs/session_43.md` +
`docs/REMEDIATION-PLAN-SESSION-23.md` + `worklog.md` +
`docs/session_44.md` were re-read and validated against the tree
before touching anything. The full baseline gate then ran FIRST: lint
0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
(CI=1) — the exact documented session-212 ship state, green on the
first full pass of the fresh environment, with the mobile-navigation
battery additionally re-verified standalone at 12/12.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (the tree's three `console.*`
hits answered as the documented sanctioned diagnostics — the two
in-app OTP delivery lines gated by `NEO_DISABLE_IN_APP_OTP` and the
dev-only AUTH_SECRET fallback warning; the key-pattern mentions
answered as the instructional docs + the wrapper's
`[REDACTED:ssh_private_key]` placeholder only; no
dangerouslySetInnerHTML, no eval/new Function, no TODO/FIXME, no
`any` leaks in `src/`), `src/middleware.ts` absent + `src/proxy.ts` in
place (the s201 seam), the docs-count lockstep verified (414/67/14
live-tense), `skills/` confirmed excluded from all four
check/test/compile scopes (tsc exclude · eslint ignores · vitest
include · playwright testDir), and the mandated focus areas each
swept clean — the mobile navigation (the 12-test e2e battery green
standalone + the live byte-census on BOTH apps during the dual-app
diff) and TailwindCSS v4 (the `@custom-variant hover` unwrap at
globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158,
the v3 palette re-pin block (135 `--color-*` token lines), the
`safe-area-pb` @utility at :405, literal-class discipline — no config
JS, no v4-family bugs found). The `.env`/`db` contract verified (six
knobs, `db/` at the repo root, `.env.example` tracked at HEAD), the
Vitest + Playwright suites verified in place with clean config
scopes, the SEO surfaces verified (sitemap + robots + manifest
explicit route handlers), and the neo-crm tech-stack lineage
re-confirmed from the carried `neo-crm_SKILL.md`.

## The live re-audit: the TWENTY-FIRST census — ZERO code findings

The reference re-audit (agent-browser 0.40.0, fresh login with the
owner's credentials, 1512×945 + 390×844) found **zero structural
drift since session 212** — the sixth census after the s207
percent-encoding remediation, and the fix VERIFIED LIVE on both apps
once more: the `%20` probe (`/Curl%20Probe%20213%20Test`) answers the
DECODED title `Curl Probe 213 Test | Budget Wise` on the reference AND
on ours identically (ours with the real 404 status, curl-verified);
the `%2D` path answers "Foo Bar | Budget Wise" on both (the
decode-precedes-hyphen order); the fresh hyphenated probe
(`/Hyphen-Probe-213`) answers "Hyphen Probe 213 | Budget Wise" on
both; the 404 BODY quotes the raw ENCODED path on BOTH apps. The
malformed-escape posture held the s210 genus AND face for the fourth
consecutive round: the reference's CDN answers **520** (`error code:
520`, curl-verified) where ours still answers the designed 404 with
the never-throw raw-segment fallback (real 404 status). Every other
parity surface answered byte-identical: the body census
(`[#root, #base44-edit-badge, #recharts_measurement_span]`, body
WHITE), the shell (nav classes + `main.pb-20 md:pb-0` + the outer
surface wrapper), all four pages (containers 7xl/5xl/5xl/4xl, titles
via FULL navigations), the mobile bottom bar byte-identical on every
dimension (the bar classes, the `flex items-center justify-around
py-2` row wrapper, the four anchors' classes, the ink split on the
anchor AND its svg — slate-900 active / slate-400 inactive, rect
top=767 h=77, the four w-6/h-6 lucide icons, NO aria-current on the
reference), the scroll-end clearance (764 ≤ 767 measured with the
same all-boxes lowest-box form at scroll-end on BOTH apps), both
dialogs (the expense genus with `value="health"` for Healthcare in
the option family; the income family
`other/salary/freelance/investment/gift` flipping cleanly on the
driver's focus+Enter keyboard activation — the documented platform
contrast), the Set Budget dialog (Category/Monthly Limit labels +
the 0.00 placeholder), the sitemap format + robots.txt
(curl-verified LF-only, 4-space indent, changefreq weekly, priority
1.0/0.8, lowercase "User-agent"; manifest 302 on the reference vs
our 200 functional superset), the login card (the 4-button OAuth
row), the donut geometry (341×280 container / 200×200
`g.recharts-pie` / 331px legend on the precise probe at the pinned
1512×945 viewport), and the transaction-row anatomy (the
`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors`
family on /Transactions with the inner three-children family
byte-identical on both apps).

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
THIRTEENTH consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight
guard (the gate's build tree removed — `[dev-preflight] removed the
stale production .next tree`, Ready in 284ms, health 200 + db up, 0
reload loops, zero notices) before the daemonized census boot —
which EADDRINUSE'd against the proof boot's surviving `next dev`
child (the N-3 orphan posture: the wrapper kill had not reaped the
child; the orphan itself served the whole census cleanly, being the
same preflight-verified boot; the tree was killed via pkill and the
port verified free via `ss` before the documentation phase). The
local census matched on every surface: the login card, the seeded
demo KPIs ($4,424.55 / 88.5% saved — the documented data-borne
divergence), the shell (with our documented body-chrome platform-face
genus — the hidden streaming div at `body.children[0]` + the Toaster
portal + the route announcer), the mobile bar byte-identical (+ the
`aria-current="page"`/nav-landmark superset — ours a
`nav[aria-label="Main navigation"]` landmark, the reference's a
plain DIV), the clearance identical (764 ≤ 767 both apps, the same
probe form), all titles matching, the 404 surface byte-matching
(the decoded title + the raw-encoded body + the real 404 status +
the "Go Home" button; the malformed-escape path answering our
designed 404), both dialogs matching (our `healthcare`/
`other_income` internal-wire ids + the placeholder option — the
documented internal-wire genus; our Radix Income tab flipping
cleanly on a synthetic click — the documented platform contrast),
the SEO surfaces matching (the documented lowercase-loc divergence,
format byte-matched; manifest 200 — our functional superset vs the
reference's 302), the donut geometry byte-identical (341×280 /
200×200 / 331 — measured at the pinned 1512×945 viewport), and the
row anatomy (the inner family byte-identical on both apps).

## The verification

- **The screenshot battery at 10/12 byte-identical — the strongest
  battery in the sequence:** landing, login, dashboard-desktop,
  transactions-desktop, budgets-desktop, profile-desktop,
  dashboard-mobile, transactions-mobile, budgets-mobile, and
  profile-mobile all answered md5-identical to HEAD's
  `docs/screenshots/` set on the first viewport-pinned captures (the
  round's first pass used full-page mode by mistake — the
  SIZE-MISMATCH family — and was re-captured per the documented
  viewport-pinned convention; the settle-wait discipline (≥3.5s
  dashboard, ≥3s dialogs) and the origin-surface contract
  (add-transaction from the Dashboard, set-budget from the Budgets
  page) were applied in full). The two delta frames each answered at
  its documented capture-environment genus (N-1): set-budget-dialog
  at the exact 16-px backdrop-blur form (a single-pixel column at
  x=590), add-transaction-dialog at 134 px decomposing into the same
  16-px blur column plus a ~118-px caret blink-phase cluster in the
  focused Amount input — conclusively caret-borne (two consecutive
  fresh captures byte-identical; 100% of the delta confined to the
  blur+caret box; content byte-census-verified). Zero frames needed
  refreshing; HEAD's evidence set stays.
- **The VLM battery: 2× "structural_differences: None"**
  (budgets-desktop, transactions-mobile) + the other two pairs'
  flags all documented DOM-disproven data-borne/platform genera (the
  dashboard pair's savings-badge conditional + donut-legend data
  state + recent-list data — data-borne: the reference's negative
  balance hides the badge, our seeded 88.5% shows it; the owner's
  2-category data vs our seeded 3-category demo month; the
  profile-mobile pair's platform-badge occlusion over the bar's
  right tabs — the frame fold shows 2 of the 4 bar items, DISPROVEN
  by the byte-identical bar census) — cross-checked against the
  round's direct byte-census before classification (the s204
  flag-variance methodology note re-confirmed: the battery is a
  coarse signal, never a gate).
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, Ready in 284ms, health 200 + db up, no
  reload loop, zero notices.
- The dev log carried zero errors/warnings/deprecations across the
  whole census (the EADDRINUSE line from the doomed daemonized
  attempt being the N-3 operational note itself, and the round's own
  shutdown notices aside).

## The informational notes

- **(N-1) The two delta frames at documented capture-environment
  genera — 10/12, the strongest battery in the sequence.** The
  set-budget-dialog frame at the exact 16-px backdrop-blur genus (a
  single-pixel column at x=590); the add-transaction-dialog frame at
  134 changed px = the SAME 16-px blur column + a ~118-px text-caret
  blink-phase cluster in the focused Amount input ((596–610, 552–561),
  old=(10,10,10) → new=(255,255,255) on the ~1-px caret bar) — a
  first-observation sub-form, conclusively caret-borne: two
  consecutive fresh captures of the identical dialog answered
  byte-identical (the caret frozen post-blink), and 100% of the
  delta confined to the blur+caret box with ZERO changed pixels
  elsewhere. The genera families are capture-environment-borne,
  never code-borne. HEAD's evidence set stays.
- **(N-2) The reference's malformed-escape edge face HELD at 520**
  (the s210/s211/s212 note, fourth consecutive round): the genus
  unchanged (the platform edge bounces malformed escapes; ours
  answers the designed 404), the face platform-owned, documented not
  remediated.
- **(N-3) The orphaned-process boot posture (new operational note):**
  killing the un-daemonized proof boot's wrapper PID does not kill
  its `next dev` child — the orphan survived, claimed :3000 seconds
  later, and served the census; the daemonized census boot then
  answered EADDRINUSE. The curl-bindable probe immediately after the
  wrapper kill answered a false "bindable" (the orphan had not bound
  yet). Census validity unaffected (the serving server was the
  preflight-verified proof boot itself; 0 reload loops). Future
  rounds: kill the process TREE (pkill on `next dev -p 3000` + the
  next-server child), verify with `ss`, then spawn the daemon.
- **(N-4) The VLM battery's flag variance answered the documented
  genera** (the s204 methodology note): 2× "None" + the other two
  pairs' flags all cross-checked and DOM-disproven by the round's
  direct byte-census (the bar family, the row family, the donut
  geometry all byte-identical on both apps) — the coarse signal
  answered within its designed envelope, and the direct byte-census
  remains the classifier of record.

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-24.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.23.0** (the revision block),
`budget-wiser_SKILL.md` **v1.22.0** (the provenance + Appendix C's
session-213 row + the Source sessions 213 entry), this log, and the
worklog entry (Task ID 213). The README, AGENTS.md, and CLAUDE.md
needed no changes (the counts held at 414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
