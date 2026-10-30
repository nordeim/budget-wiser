# Session 29 — The Eighteenth Verification Round (Task ID 215)

The round opened per the owner's instruction with the workspace
refreshed in place (the git-pull-only intake — the third time the
sequence exercised the standing environment): `git pull` answered a
fast-forward `de848b4..f46ec6e`, one file — the owner's
`docs/session_48.md` transcript drop atop the s214 ship `de848b4`
(the repo delta since the ship verified docs-only). `bun install`
answered 518 installs checked across 610 packages (no changes), and
the Chromium revision step was NOT needed this round (the sandbox
cache already carried the clone's pinned headless-shell 1248 — the
second standing-environment pass without the 120 MiB download). The
five root documents + `docs/session_47.md` +
`docs/REMEDIATION-PLAN-SESSION-25.md` + `worklog.md` +
`docs/session_48.md` were re-read and validated against the tree
before touching anything. The full baseline gate then ran FIRST: lint
0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
(CI=1) — the exact documented session-214 ship state, green on the
first full pass, with the mobile-navigation battery additionally
re-verified standalone at 12/12.

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
globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158,
the v3 palette re-pin block, the `safe-area-pb` @utility at :405,
literal-class discipline — no config JS, no v4-family bugs found). The
`.env`/`db` contract verified (six knobs, `db/` at the repo root,
`.env.example` tracked at HEAD), the Vitest + Playwright suites
verified in place with clean config scopes, the SEO surfaces verified
(sitemap + robots + manifest explicit route handlers), and the
neo-crm tech-stack lineage re-confirmed from the carried
`neo-crm_SKILL.md`.

## The live re-audit: the TWENTY-THIRD census — ZERO code findings

The reference re-audit (agent-browser 0.40.0, fresh login with the
owner's credentials, 1512×945 + 390×844) found **zero structural drift
since session 214** — the eighth census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps once more: the
`%20` probe (`/Curl%20Probe%20215%20Test`) answers the DECODED title
`Curl Probe 215 Test | Budget Wise` on the reference AND on ours
identically (ours with the real 404 status, curl-verified); the `%2D`
path answers "Foo Bar | Budget Wise" on both (the
decode-precedes-hyphen order); the fresh hyphenated probe
(`/Hyphen-Probe-215`) answers "Hyphen Probe 215 | Budget Wise" on both;
the 404 BODY quotes the raw ENCODED path on BOTH apps. The
malformed-escape posture held the s210 genus AND face for the SIXTH
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
FIFTEENTH consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server: the
un-daemonized `bun run dev` boot live-verified the s197 preflight
guard (the gate's build tree removed — `[dev-preflight] removed the
stale production .next tree`, Ready in 297ms, health 200 + db up, 0
reload loops, zero notices) before the daemonized census boot — which
answered CLEAN on the first attempt (the standing s213 N-3
tree-kill/ss-verify posture applied: the process tree killed via
pkill + the port verified free via `ss` BEFORE the daemonized spawn;
zero EADDRINUSE this round). The local census matched on every
surface: the login card (the 4-button OAuth row; the local login
answered the documented pre-hydration fill race — the re-submit
post-hydration answered clean), the seeded demo KPIs ($4,424.55 /
88.5% saved — the documented data-borne divergence), the shell (with
our documented body-chrome platform-face genus — the hidden streaming
div at `body.children[0]` + the Toaster portal + the route announcer),
the mobile bar byte-identical (+ the `aria-current="page"`/
nav-landmark superset — ours a `nav[aria-label="Main navigation"]`
landmark, the reference's a plain DIV), the clearance identical
(764 ≤ 767 both apps, the same probe form), all titles matching, the
404 surface byte-matching (the decoded title + the raw-encoded body +
the real 404 status + the "Go Home" button; the malformed-escape path
answering our designed 404), both dialogs matching (our
`healthcare`/`other_income` internal-wire ids + the placeholder option
— the documented internal-wire genus; our Radix Income tab flipping
cleanly on a synthetic click — the documented platform contrast), the
SEO surfaces matching (the documented lowercase-loc divergence, format
byte-matched; manifest 200 — our functional superset), the donut
geometry byte-identical (341×280 / 200×200 / 331 — measured at the
pinned 1512×945 viewport), and the row anatomy (the inner family
byte-identical on both apps).

## The verification

- **The screenshot battery: 10/12 byte-identical on the FIRST
  viewport-pinned captures — the strongest first-pass battery in the
  sequence.** Landing, login, transactions-desktop, budgets-desktop,
  profile-desktop, set-budget-dialog, dashboard-mobile,
  transactions-mobile, budgets-mobile, and profile-mobile all
  answered md5-identical to HEAD's `docs/screenshots/` set on the
  first captures (the settle-wait discipline — ≥3.5s dashboard, ≥3s
  dialogs — and the origin-surface contract — add-transaction from the
  Dashboard, set-budget from the Budgets page — applied in full; the
  viewport-pinned convention held on the first pass). The s214
  profile-frame transient did NOT re-appear — both profile frames
  answered HEAD's exact bytes on the first capture, consistent with
  its s214 classification as a one-shot capture-environment
  rasterization phase. The two delta frames each answered at its
  documented genus: dashboard-desktop at the exact sub-visible
  composite-variance band (49,265 changed px, 3.45%, the
  (172,818)–(926,885) band, ZERO above the 8-luminance threshold, max
  lum 7/255 — the s211–s214 genus), and add-transaction-dialog at 118
  changed px confined 100% to the (596,552)–(612,561) caret box — the
  exact s213/s214 caret-phase genus, with the A/B proof answering the
  exact 16-px backdrop-blur column at x=590 between two consecutive
  fresh captures (the s213 genus family) and ZERO changed pixels
  elsewhere. Zero frames needed refreshing; HEAD's evidence set stays.
- **The VLM battery: 1× "structural_differences: None"**
  (budgets-desktop) + the other three pairs' flags all documented
  DOM-disproven data-borne/platform genera (the dashboard pair's
  savings-badge conditional — data-borne: the reference's negative
  balance hides the badge, our seeded 88.5% shows it; the
  transactions-mobile pair's platform-badge occlusion over the bar's
  right tabs — the fold reading as a "2-item bar", DISPROVEN by the
  byte-identical bar census; the profile-mobile pair's occlusion
  family with hallucinated fold details — a "Goals" tab + a floating
  action button, DISPROVEN by the direct DOM probe on the reference:
  all four anchors present, no Goals text anywhere, fabCount=0) —
  cross-checked against the round's direct byte-census before
  classification (the s204 flag-variance methodology note re-confirmed:
  the battery is a coarse signal, never a gate; the direct byte-census
  remains the classifier of record).
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, Ready in 297ms, health 200 + db up, no
  reload loop, zero notices — and the standing tree-kill/ss-verify
  posture answered its proof again (a clean first-attempt daemonized
  boot, zero EADDRINUSE).
- The dev log carried zero errors/warnings/deprecations across the
  whole census (zero EADDRINUSE lines, zero reload mentions); the dev
  server was stopped and the browser closed before the documentation
  phase.

## The informational notes

- **(N-1) The battery: 10/12 first-pass byte-identical — the strongest
  first-pass result in the sequence.** The dashboard-desktop frame at
  the exact s211–s214 sub-visible composite-variance genus (49,265
  changed px, 3.45%, the (172,818)–(926,885) band, ZERO above the
  8-luminance threshold, max lum 7/255 — the counts answering within
  0.15% of the s212/s213 rounds' identical 49,265 and the s214 round's
  49,189, the fourth consecutive environment answering the same band);
  the add-transaction-dialog frame at the exact s213/s214 caret-phase
  genus (118 px, 100% confined to the (596,552)–(612,561) box, the A/B
  proof answering the exact 16-px backdrop-blur column at x=590 —
  both capture-environment families, conclusively environment-borne);
  the s214 profile transient sub-form NOT re-hit (both profile frames
  at HEAD's exact bytes on the first capture). HEAD's evidence set
  stays.
- **(N-2) The reference's malformed-escape edge face HELD at 520**
  (the s210–s214 note, sixth consecutive round): the genus unchanged
  (the platform edge bounces malformed escapes; ours answers the
  designed 404 with the never-throw raw-segment fallback — the raw
  `%E0%A4%A` segment in the title, real 404 status), the face
  platform-owned, documented not remediated.
- **(N-3) The VLM battery's flag variance answered the documented
  genera** (the s204 methodology note): 1× "None" (budgets-desktop) +
  the other three pairs' flags all cross-checked and DOM-disproven by
  the round's direct byte-census (the bar family, the row family, the
  donut geometry all byte-identical on both apps; the profile-mobile
  pair's hallucinated "Goals tab + FAB" additionally disproven by the
  direct DOM probe) — the coarse signal answered within its designed
  envelope, and the direct byte-census remains the classifier of
  record.
- **(N-4, operational) The standing-environment intake answered its
  second full pass without the Chromium revision step:** the sandbox
  cache already carried the clone's pinned headless-shell 1248 — a
  persisted workspace answers the gate + census with no bootstrap
  beyond the git pull and the install check. The s213 N-3
  tree-kill/ss-verify lesson remains the standing posture (applied
  again this round: clean first-attempt daemonized boot, zero
  EADDRINUSE).

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-26.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.25.0** (the revision block),
`budget-wiser_SKILL.md` **v1.24.0** (the provenance + Appendix C's
session-215 row), this log, and the worklog entry (Task ID 215). The
README, AGENTS.md, and CLAUDE.md needed no changes (the counts held at
414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
