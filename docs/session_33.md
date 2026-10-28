# Session 21 — The Tenth Verification Round + the 404 Percent-Encoding Fix (Task ID 207)

The round opened per the owner's instruction: the workspace had PERSISTED
again — `git pull` sufficed (b43baf0 → c86578b, the owner's
`docs/session_32.md` transcript commit plus the owner's two homepage
captures, `docs/homepage_top.png` + `docs/homepage_middle.png`; the repo
delta since the s206 ship verified docs-only, three files). The two
homepage PNGs were inspected with the VLM and classified before anything
else: captures of OUR OWN shipped landing page — every element answers
`src/components/landing/landing-page.tsx` ("Every dollar in view.",
"Start tracking free", the Features/Preview/Pricing/FAQ nav, the three
feature-card rows, the "budgetwise.app/Dashboard" preview mockup) —
transcript artifacts, not a new design signal. The five root documents +
`docs/session_31.md` + `docs/REMEDIATION-PLAN-SESSION-17.md` +
`worklog.md` + `docs/session_32.md` were re-read and validated against
the tree before touching anything, and the standing environment answered
per the docs (.env on the mandated six-knob contract, `db/` at the repo
root, Chromium installed). The full baseline gate ran FIRST: lint 0/0 ·
typecheck 0 · 410/410 unit · build · 14/14 smoke · 66/66 e2e (CI=1) —
the exact documented session-206 ship state, green on the first pass.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean, `src/middleware.ts` absent +
`src/proxy.ts` in place, `skills/` confirmed excluded from all four
check/test/compile scopes, the docs-count lockstep verified, and the
mandated focus areas each swept clean — the mobile navigation (the
12-test e2e battery green standalone + the live byte-census on BOTH
apps) and TailwindCSS v4 (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
`safe-area-pb` @utility, literal-class discipline, no config JS — no
v4-family bugs found). The `.env`/`db` contract verified (six knobs,
`db/` at the repo root, `.env.example` tracked at HEAD), the Vitest +
Playwright suites verified in place, the SEO surfaces verified, and
the neo-crm tech-stack lineage re-confirmed.

## The live re-audit: the FIFTEENTH census — ONE code finding

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **one title-surface genus since
session 206**; every other parity surface answered byte-identical: the
body census (`[#root, #base44-edit-badge, #recharts_measurement_span]`),
the shell (nav classes `sticky top-0 z-50 bg-white border-b
border-slate-200 backdrop-blur-sm bg-white/80` + `main.pb-20 md:pb-0`
+ the outer surface wrapper), all four app pages (containers
7xl/5xl/5xl/4xl, titles via FULL navigations — `/Dashboard`→"Budget
Wise", `/Transactions|/Budgets|/Profile`→"<Page> | Budget Wise"), the
mobile bottom bar byte-identical on every dimension (the bar classes,
the `flex items-center justify-around py-2` row wrapper, item classes,
the ink split on the anchor AND its svg, rect y=767 h=77, the four
w-6/h-6 lucide icons, no aria-current), the scroll-end clearance
(764 ≤ 767 measured per the e2e contract's lowest-box form at
scroll-end on BOTH apps), both dialogs (the VALUE-attribute probe
answering the s203 genera verbatim — `value="health"` for Healthcare,
the income-`other` reuse; the reference's Income tab keyboard-activated
cleanly with the documented family swap), the Set Budget dialog
(Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
format + robots.txt, the login card (the 4-button OAuth row), the donut
geometry (341×280 container / 200×200 `g.recharts-pie` / 331px legend
on the precise probe), and the transaction-row anatomy.

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
SEVENTH consecutive round with no owner-data movement.

### F-1 — the 404 title's percent-encoding genus (HIGH, remediated)

This round's 404 probe used a `%20` path for the first time
(`/Curl%20Probe%20207%20Test` — every prior census used hyphenated
probe paths), and the two apps answered DIFFERENTLY. The reference:
`<title>Curl Probe 207 Test | Budget Wise</title>` — its platform
DECODES the pathname before interpolating (served-HTML curl-verified;
the og:title meta interpolates identically). Ours:
`<title>Curl%20Probe%20207%20Test | Budget Wise</title>` — the proxy's
`x-pathname` stamp (Next's NextURL.pathname) preserves the escapes and
`notFoundTitle()` humanized the raw segment. The full evidence battery
(live-probed on the reference): `/About%20Us` → "About Us | Budget
Wise"; `/foo%2Dbar` → "Foo Bar | Budget Wise" (the decode PRECEDES the
hyphen split); the 404 BODY quotes the raw encoded path on BOTH apps
(the decode is title-path-only); malformed escapes (`/bad%zz%20path`)
bounce off the reference's CDN with a bare 400 Bad Request while ours
answers the designed 404 (the kept posture — the fix's never-throw
guard owns the input class). The nine s196-pinned cases were all
unencoded — the genus was invisible to the pins, to every prior census's
probe form, and to every gate: green tests masking drift, the s196
genus, fourteenth time round.

The dual-app diff ran the same census on the local dev server (the
un-daemonized boot live-verified the s197 preflight guard — the stale
production tree removed, Ready in 300ms, health 200 + db up, zero
reload loops — before the daemonized census boot; the daemonizer patched
to take its log path from argv per the s206 N-1 convention). The local
census matched on every surface: the shell (with our documented
body-chrome platform-face genus), the mobile bar byte-identical (+ the
aria-current/nav-landmark superset), the clearance identical, all
titles matching, both dialogs matching (our `healthcare`/`other_income`
ids + the placeholder option — the documented internal-wire genus; our
Income tab swaps on click per the Radix contract), the SEO surfaces
matching (the documented lowercase-loc divergence, format byte-matched;
manifest 200 — our functional superset), and the donut geometry
byte-identical.

## The remediation (TDD: RED → GREEN → verify)

1. **RED:** the percent-decode describe added to
   `tests/not-found-title.test.ts` — four pins: the `%20` decode
   (`/Curl%20Probe%20207%20Test` → "Curl Probe 207 Test | Budget
   Wise", `/About%20Us` → "About Us | Budget Wise"), the
   decode-precedes-hyphen-split order (`/foo%2Dbar` → "Foo Bar | Budget
   Wise"), the last-segment rule on encoded paths, and the
   malformed-escape raw fallback (`/bad%zz%20path` → "Bad%zz%20path |
   Budget Wise" — never throw). Run: exactly the three decode pins RED
   (the malformed-escape pin guards the fallback through the fix).
2. **GREEN:** `decodeSegment()` implemented in
   `src/lib/not-found-title.ts` (decodeURIComponent inside try/catch,
   the raw-segment fallback) consumed by `notFoundTitle()` at the
   last-segment level — `notFoundQuotedPath()` UNTOUCHED (the body
   keeps the raw encoded form on both apps). Run: 13/13 green.
3. **e2e regression:** one case added to the 404-surface describe in
   `tests/e2e/app-flows.spec.ts` — the `%20` title assertion + the
   raw-encoded body sibling. Counts moved 410→414 unit / 66→67 e2e —
   the first count movement since the s201 pin growth.
4. **Live verification on the dev server:** the `%20` path answers
   `<title>Curl Probe 207 Test | Budget Wise</title>` + the real 404
   status (byte-matching the reference); the `%2D` path answers "Foo
   Bar"; the malformed path answers the designed 404 with no throw; the
   unencoded census paths unchanged; the body still quotes the raw
   encoded path.

## The verification

- **The screenshot battery at 9/12 byte-identical** — nine frames
  byte-identical (budgets at both axes, dashboard at both axes, the
  landing, the login, transactions at both axes, and profile-DESKTOP)
  and the three delta frames each at its documented genus: the
  profile-MOBILE frame at the avatar-jitter genus in its EXACT
  s202/s203/s205 form (104 px, bbox (84,255)–(235,377)) while
  profile-DESKTOP answered byte-identical this round (the genus moving
  with the capture environment, not the code — the s206 observation
  confirmed once more), and both dialog frames at the
  backdrop-blur/antialiasing genus with the card crops at 37/242,368 px
  and 66/140,224 px — the VISIBLE sliver at exactly the s203 counts
  (16 px above the 64-luminance threshold in BOTH frames, proven by the
  depth-check), the remainder sub-visible blur noise this capture
  environment adds.
- **The VLM battery: 0× "Structural Differences: None" — the FOURTH
  consecutive battery at 0×**, every one of the four pairs' flags
  answering the documented DOM-disproven genera, cross-checked against
  the round's direct byte-census before classification: the
  savings-badge conditional (data-borne — the reference's negative
  balance + $0 income hides the badge; our seeded 88.5% shows it), the
  donut-segment content (data-borne — the geometry byte-identical), the
  platform-badge occlusion over the bar's right tabs (the byte-census
  shows all four items present on BOTH apps), and the avatar-content
  genus on the profile pair. The s204 flag-variance methodology note
  re-confirmed: the VLM battery is a coarse parity signal, never a gate.
- **The dev-boot guard's live proof:** the round's build→dev sequence
  fired the preflight clean on the un-daemonized boot — the stale
  production tree removed, Ready in 300ms, health 200, db up, no
  reload loop, zero notices.
- The dev log carried zero errors/warnings/deprecations.

## The informational notes

- **(N-1) The og:title platform-templating genus:** the reference's 404
  head interpolates og:title from its platform's templating; ours serves
  the root layout's static `og:title` ("Budget Wise"). A 404 carries the
  real 404 status on ours (de-indexed; unfurlers on dead links are the
  only consumer) — the static brand default is the kept posture;
  documented, not remediated.
- **(N-2) The malformed-escape posture genus:** the reference's CDN
  bounces malformed escapes with a bare 400 Bad Request; ours answers
  the designed 404 surface — the more graceful production posture, kept,
  with the never-throw fallback guard absorbing the input class.
- **(N-3) The owner's homepage captures:** verified against the tree —
  captures of our own shipped landing. No action.
- **(N-4) The daemonizer argv true-up:** the workspace-level
  `daemon-dev.py` carried the s206 hardcoded log path — patched to take
  the log path from argv (the third consecutive captures-consumer
  tooling true-up; the standing convention now covers the daemonizer).
  The VLM battery tool was likewise parameterized (REF/LOC/OUT from
  argv).

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-18.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.17.0** (the revision block),
`budget-wiser_SKILL.md` **v1.16.0** (the provenance + Appendix C's
session-207 row + the Source sessions 207 entry + the 404-title
contract's decode clause), this log, and the worklog entry (Task ID
207). The README, AGENTS.md, and CLAUDE.md count sites moved with the
lockstep (414 unit / 67 e2e / 14 smoke); AGENTS.md's proxy-seam
architecture fact gained the decode clause.

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
