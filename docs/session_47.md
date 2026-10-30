# Session 28 — The Seventeenth Verification Round (Task ID 214)

The round opened per the owner's instruction with a RESET workspace
(the seventh reset in the sequence): the fresh-clone bootstrap exercised
live end-to-end — `git clone` at `177b669` (the owner's
`docs/session_46.md` transcript commit atop the s213 ship `24bedd2`;
the repo delta since the ship verified docs-only, one file), then
`bun install` (513 packages), the six-knob `.env` from `.env.example`
with a fresh `AUTH_SECRET`, `db:push` + `db:seed` (custom.db at the
repo root, git-ignored), and the recurring fresh-workspace Chromium
revision step (`bunx playwright install chromium` — the full 120 MiB
headless-shell 1248 download; the sandbox cache does not carry the
clone's pinned revision). The five root documents + `docs/session_45.md`
+ `docs/REMEDIATION-PLAN-SESSION-24.md` + `worklog.md` +
`docs/session_46.md` were re-read and validated against the tree
before touching anything. The full baseline gate then ran FIRST: lint
0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
(CI=1) — the exact documented session-213 ship state, green on the
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
include · playwright testDir), and the mandated focus areas each swept
clean — the mobile navigation (the 12-test e2e battery green
standalone + the live byte-census on BOTH apps during the dual-app
diff) and TailwindCSS v4 (the `@custom-variant hover` unwrap at
globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins, the v3 palette
re-pin block (135 `--color-*` token lines), the `safe-area-pb`
@utility at :405, literal-class discipline — no config JS, no
v4-family bugs found). The `.env`/`db` contract verified (six knobs,
`db/` at the repo root, `.env.example` tracked at HEAD), the Vitest +
Playwright suites verified in place with clean config scopes, the SEO
surfaces verified (sitemap + robots + manifest explicit route handlers),
and the neo-crm tech-stack lineage re-confirmed from the carried
`neo-crm_SKILL.md`.

## The live re-audit: the TWENTY-SECOND census — ZERO code findings

The reference re-audit (agent-browser 0.40.0, fresh login with the
owner's credentials, 1512×945 + 390×844) found **zero structural drift
since session 213** — the seventh census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps once more: the
`%20` probe (`/Curl%20Probe%20214%20Test`) answers the DECODED title
`Curl Probe 214 Test | Budget Wise` on the reference AND on ours
identically (ours with the real 404 status, curl-verified); the `%2D`
path answers "Foo Bar | Budget Wise" on both (the
decode-precedes-hyphen order); the fresh hyphenated probe
(`/Hyphen-Probe-214`) answers "Hyphen Probe 214 | Budget Wise" on both;
the 404 BODY quotes the raw ENCODED path on BOTH apps. The
malformed-escape posture held the s210 genus AND face for the fifth
consecutive round: the reference's CDN answers **520** (`error code:
520`, curl-verified) where ours still answers the designed 404 with
the never-throw raw-segment fallback (the raw `%E0%A4%A` segment in
the title, real 404 status, curl-verified). Every other parity surface
answered byte-identical: the body census (`[#root,
#base44-edit-badge, #recharts_measurement_span]`, body WHITE), the
shell (nav classes + `main.pb-20 md:pb-0` + the outer surface wrapper),
all four pages (containers 7xl/5xl/5xl/4xl, titles via FULL
navigations), the mobile bottom bar byte-identical on every dimension
(the bar classes, the `flex items-center justify-around py-2` row
wrapper, the four anchors' classes, the ink split on the anchor AND
its svg — slate-900 active / slate-400 inactive, rect top=767 h=77,
the four w-6/h-6 lucide icons, NO aria-current on the reference), the
scroll-end clearance (764 ≤ 767 measured with the same all-boxes
lowest-box form at scroll-end on BOTH apps), both dialogs (the expense
genus with `value="health"` for Healthcare in the option family; the
income family `other/salary/freelance/investment/gift` flipping
cleanly on the driver's focus+Enter keyboard activation — the
documented platform contrast), the Set Budget dialog (Category/Monthly
Limit labels + the 0.00 placeholder), the sitemap format + robots.txt
(curl-verified LF-only, 4-space indent, changefreq weekly, priority
1.0/0.8, lowercase "User-agent"; manifest 302 on the reference vs our
200 functional superset), the login card (the 4-button OAuth row), the
donut geometry (341×280 container / 200×200 `g.recharts-pie` / 331px
legend on the precise probe at the pinned 1512×945 viewport), and the
transaction-row anatomy (the `flex items-center gap-4 p-4
hover:bg-slate-50 transition-colors` family on /Transactions with the
inner three-children family byte-identical on both apps).

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
FOURTEENTH consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight
guard (the gate's build tree removed — `[dev-preflight] removed the
stale production .next tree`, health 200 + db up, 0 reload loops,
zero notices) before the daemonized census boot — which answered
CLEAN on the first attempt (the s213 N-3 orphan-posture lesson APPLIED
and verified: the process tree killed via pkill + the port verified
free via `ss` BEFORE the daemonized spawn; zero EADDRINUSE this round).
The local census matched on every surface: the login card (the 4-button
OAuth row; the first post-hydration submit answered clean), the seeded
demo KPIs ($4,424.55 / 88.5% saved — the documented data-borne
divergence), the shell (with our documented body-chrome platform-face
genus — the hidden streaming div at `body.children[0]` + the Toaster
portal + the route announcer), the mobile bar byte-identical (+ the
`aria-current="page"`/nav-landmark superset — ours a
`nav[aria-label="Main navigation"]` landmark, the reference's a plain
DIV), the clearance identical (764 ≤ 767 both apps, the same probe
form), all titles matching, the 404 surface byte-matching (the decoded
title + the raw-encoded body + the real 404 status + the "Go Home"
button; the malformed-escape path answering our designed 404), both
dialogs matching (our `healthcare`/`other_income` internal-wire ids +
the placeholder option — the documented internal-wire genus; our
Radix Income tab flipping cleanly on a synthetic click — the
documented platform contrast), the SEO surfaces matching (the
documented lowercase-loc divergence, format byte-matched; manifest 200
— our functional superset vs the reference's 302), the donut geometry
byte-identical (341×280 / 200×200 / 331 — measured at the pinned
1512×945 viewport), and the row anatomy (the inner family
byte-identical on both apps).

## The verification

- **The screenshot battery: 8/12 byte-identical on the first
  viewport-pinned captures + the profile-frame transients disproven —
  10 of 12 frames at HEAD's exact bytes within the round:** landing,
  login, transactions-desktop, budgets-desktop, set-budget-dialog,
  dashboard-mobile, transactions-mobile, and budgets-mobile all
  answered md5-identical to HEAD's `docs/screenshots/` set on the first
  captures (the settle-wait discipline — ≥3.5s dashboard, ≥3s dialogs
  — and the origin-surface contract — add-transaction from the
  Dashboard, set-budget from the Budgets page — applied in full; the
  viewport-pinned convention held on the first pass, the s213 full-page
  mistake not re-hit). The two profile frames answered a first-pass
  sub-visible delta (87 px desktop / 104 px mobile, ZERO above the
  8-luminance threshold, max lum 5/255, identical row-band structure
  on both axes) — **and the immediate re-capture of both answered
  byte-identical to HEAD (0 px): a TRANSIENT sub-visible rasterization
  phase, conclusively disproven as code-borne** (a first-observation
  sub-form of the capture-environment family; the same code answered
  HEAD's exact bytes on the very next capture). The two remaining
  delta frames each answered at its documented genus (N-1):
  dashboard-desktop at the exact sub-visible composite-variance band
  (49,189 changed px, 3.44%, the (172,818)–(927,886) band, ZERO above
  the 8-luminance threshold — the s211/s212 genus), and
  add-transaction-dialog at 118 changed px confined 100% to the
  (596,552)–(613,562) caret box — the exact s213 caret-phase genus,
  proven by the two-fresh-captures byte-identity (A=B, 0 px; the caret
  frozen post-blink) with ZERO changed pixels elsewhere. Zero frames
  needed refreshing; HEAD's evidence set stays.
- **The VLM battery: 1× "structural_differences: None"**
  (budgets-desktop) + the other three pairs' flags all documented
  DOM-disproven data-borne/platform genera (the dashboard pair's
  savings-badge conditional + donut-segment data state + recent-list
  data — data-borne: the reference's negative balance hides the badge,
  our seeded 88.5% shows it; the owner's 2-category/3-row data vs our
  seeded 3-category/4-row demo month; the transactions-mobile +
  profile-mobile pairs' platform-badge occlusion over the bar's right
  tabs — both frames' folds read as "2-item bars", DISPROVEN by the
  byte-identical bar census: all four anchors byte-matched on both
  apps) — cross-checked against the round's direct byte-census before
  classification (the s204 flag-variance methodology note re-confirmed:
  the battery is a coarse signal, never a gate; this round's
  transactions-mobile pair flagged where s213's answered "None" — the
  variance within the documented envelope, the same DOM-disproven
  genus family).
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, health 200 + db up, no reload loop, zero
  notices — and the s213 N-3 tree-kill/ss-verify lesson answered its
  first post-adoption proof (a clean first-attempt daemonized boot,
  zero EADDRINUSE).
- The dev log carried zero errors/warnings/deprecations across the
  whole census (zero EADDRINUSE lines, zero reload mentions); the dev
  server was stopped and the browser closed before the documentation
  phase.

## The informational notes

- **(N-1) The battery: 8/12 first-pass byte-identical + the profile
  transient sub-form (a first observation) + the two documented
  genera.** The dashboard-desktop frame at the exact s211/s212
  sub-visible composite-variance genus (49,189 changed px, 3.44%, the
  (172,818)–(927,886) band, ZERO above the 8-luminance threshold, max
  lum 5/255); the add-transaction-dialog frame at the exact s213
  caret-phase genus (118 px, 100% confined to the (596,552)–(613,562)
  box, two consecutive fresh captures byte-identical); the
  profile-desktop/profile-mobile frames at a first-observation
  TRANSIENT sub-visible rasterization phase in the avatar region
  (87/104 px, ZERO above the 8-luminance threshold) — conclusively
  disproven as code-borne by the immediate re-capture answering HEAD's
  exact bytes (0 px). The genera families are capture-environment-borne,
  never code-borne; HEAD's evidence set stays.
- **(N-2) The reference's malformed-escape edge face HELD at 520**
  (the s210/s211/s212/s213 note, fifth consecutive round): the genus
  unchanged (the platform edge bounces malformed escapes; ours answers
  the designed 404 with the never-throw raw-segment fallback — the raw
  `%E0%A4%A` segment in the title, real 404 status), the face
  platform-owned, documented not remediated.
- **(N-3) The VLM battery's flag variance answered the documented
  genera** (the s204 methodology note): 1× "None" (budgets-desktop) +
  the other three pairs' flags all cross-checked and DOM-disproven by
  the round's direct byte-census (the bar family, the row family, the
  donut geometry all byte-identical on both apps) — the coarse signal
  answered within its designed envelope, and the direct byte-census
  remains the classifier of record.
- **(N-4, operational) The s213 N-3 tree-kill lesson APPLIED and
  verified:** the process tree killed via pkill + the port verified
  free via `ss` BEFORE the daemonized spawn — the daemonized census
  boot answered CLEAN on the first attempt (zero EADDRINUSE). The
  lesson is now the standing posture; future rounds keep it.

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-25.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.24.0** (the revision block),
`budget-wiser_SKILL.md` **v1.23.0** (the provenance + Appendix C's
session-214 row + the Source sessions 214 entry), this log, and the
worklog entry (Task ID 214). The README, AGENTS.md, and CLAUDE.md
needed no changes (the counts held at 414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
