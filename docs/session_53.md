# Session 31 — The Twenty-Fifth Verification Round (Task ID 217)

The round opened per the owner's instruction with the workspace refreshed
from a RESET state (the ninth reset in the sequence): the fresh-clone
bootstrap ran end-to-end — `git clone` at `89a3441`, the owner's
`docs/session_52.md` transcript commit atop the s216 ship `9a17e14` (the
repo delta since the ship verified docs-only, one file); `bun install`
answered 513 packages; the six-knob `.env` from `.env.example` + a fresh
`AUTH_SECRET`; `db:push` + `db:seed` (the demo month: $4,424.55 / 88.5%
saved); the recurring fresh-workspace Chromium revision step — the full
120 MiB headless-shell 1248 download (the sandbox cache carried revision
1200; the clone's Playwright pins 1248). The five root documents +
`docs/session_51.md` + `docs/REMEDIATION-PLAN-SESSION-27.md` +
`worklog.md` + `docs/session_52.md` were re-read and validated against the
tree before touching anything. The full baseline gate then ran FIRST: lint
0/0 · typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e (CI=1)
— the exact documented session-216 ship state, green on the first full
pass, with the mobile-navigation battery additionally re-verified
standalone at 12/12.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (no dangerouslySetInnerHTML, no
eval/new Function, no TODO/FIXME, no `any` leaks in `src/`; the three
`src/` `console.*` hits answered as the documented sanctioned diagnostics —
the two in-app OTP delivery lines gated by `NEO_DISABLE_IN_APP_OTP` and
the dev-only AUTH_SECRET fallback warning; the key-pattern mentions
answered as the instructional docs + the wrapper's
`[REDACTED:ssh_private_key]` placeholder only), `src/middleware.ts`
absent + `src/proxy.ts` in place (the s201 seam, `x-pathname` stamped),
the docs-count lockstep verified (414/67/14 live-tense), `skills/`
confirmed excluded from all four check/test/compile scopes (tsc exclude ·
eslint ignores · vitest include · playwright testDir), and the mandated
focus areas each swept clean — the **mobile navigation** (the 12-test e2e
battery green standalone + the live byte-census on BOTH apps during the
dual-app diff) and **TailwindCSS v4** (the `@custom-variant hover` unwrap
at globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158, the
v3 palette re-pin block, the `safe-area-pb` @utility at :405,
literal-class discipline — no config JS, no v4-family bugs found). The
`.env`/`db` contract verified (six knobs, `db/` at the repo root,
`DATABASE_URL="file:../db/custom.db"` — the mandated contract,
`.env.example` tracked at HEAD), the Vitest + Playwright suites verified
in place with clean config scopes, the SEO surfaces verified (sitemap +
robots + manifest explicit route handlers), and the neo-crm tech-stack
lineage re-confirmed from the carried `neo-crm_SKILL.md`.

## The live re-audit: the TWENTY-FIFTH census — ZERO code findings

The reference re-audit (agent-browser 0.40.0, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 216** — the tenth census after the s207 percent-encoding
remediation, and the fix VERIFIED LIVE on both apps once more: the `%20`
probe (`/Curl%20Probe%20217%20Test`) answers the DECODED title `Curl
Probe 217 Test | Budget Wise` on the reference AND on ours identically
(ours with the real 404 status, curl-verified); the `%2D` path answers
"Foo Bar | Budget Wise" on both (the decode-precedes-hyphen order); the
fresh hyphenated probe (`/Hyphen-Probe-217`) answers "Hyphen Probe 217 |
Budget Wise" on both; the 404 BODY quotes the raw ENCODED path on BOTH
apps. The malformed-escape posture held the s210 genus AND face for the
EIGHTH consecutive round: the reference's CDN answers **520** (`error
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
dispatched-keydown Enter activation — the documented platform contrast),
the Set Budget dialog (Category/Monthly Limit labels + the 0.00
placeholder), the sitemap format + robots.txt (curl-verified LF-only,
4-space indent, changefreq weekly, priority 1.0/0.8, lowercase
"User-agent"; manifest 302 on the reference vs our 200 functional
superset), the login card (the 4-button OAuth row), the donut geometry
(341×280 container / 200×200 `g.recharts-pie` / 331px legend on the
precise probe at the pinned 1512×945 viewport), and the transaction-row
anatomy (the `flex items-center gap-4 p-4 hover:bg-slate-50
transition-colors` family on /Transactions with the inner three-children
family byte-identical on both apps).

**The data state: UNCHANGED from the s200 baseline** — Balance −$2,481.00
/ Income $0.00 / Expenses $2,481.00 / 3 transactions. The SEVENTEENTH
consecutive round with no owner-data movement.

The dual-app diff ran the same census on the local dev server across
three single-call boots (the documented sandbox posture — the s216 N-1
`rm -rf .next` cure applied before every boot, all three answering the
clean request profile: manifest=1 · login=3 · zero notices, zero reload
loops). The local census matched on every surface: the login card (the
4-button OAuth row; the documented pre-hydration fill race answered by
the re-fill), the seeded demo KPIs ($4,424.55 / $5,000.00 / $575.45 /
88.5% saved — the documented data-borne divergence), the shell (with our
documented body-chrome platform-face genus), the mobile bar
byte-identical (+ the `aria-current="page"`/nav-landmark superset), the
clearance identical (764 ≤ 767 both apps, the same probe form), all
titles matching, the 404 surface byte-matching (the decoded title + the
raw-encoded body + the real 404 status + the "Go Home" button), both
dialogs matching (our `healthcare`/`other_income` internal-wire ids +
the placeholder option — the documented internal-wire genus; our Radix
Income tab flipping cleanly on a synthetic click), the SEO surfaces
matching (the documented lowercase-loc divergence, format byte-matched;
manifest 200 — our functional superset), the donut geometry
byte-identical (341×280 / 200×200 / 331), and the row anatomy (the inner
family byte-identical on both apps).

## The verification

- **The screenshot battery: 7/12 byte-identical on the first
  corrected-order captures + the five delta frames each at its documented
  genus, each answered by the round's three-boot stability proof.**
  Landing, login, transactions-desktop, budgets-desktop,
  dashboard-mobile, budgets-mobile, and profile-mobile all answered
  md5-identical to HEAD's `docs/screenshots/` set on the first
  corrected-order captures (the settle-wait discipline — ≥3.5s dashboard,
  ≥3s dialogs — and the origin-surface contract — add-transaction from
  the Dashboard, set-budget from the Budgets page — applied in full; the
  viewport-pinned convention held). The five delta frames each answered
  at its documented genus: dashboard-desktop at 49,265 changed px in the
  (172,818)–(927,886) band, ZERO above the 8-luminance threshold, max
  lum 5.4/255 — the s211–s215 sub-visible composite-variance genus
  (environment-borne, returning with this sandbox's font rasterization
  after s216's 0-px pass); transactions-mobile at EXACTLY 5 changed px,
  max lum 1.0/255 — a first observation of the sub-visible genus on this
  frame (five pixels at 0.4% luminance — invisible); profile-desktop at
  105 changed px in the avatar region ((357,255)–(505,374)), ZERO above
  the 8-luminance threshold, max lum 5.3/255 — the s214
  profile-transient genus; add-transaction-dialog at 137 changed px in
  the (590,381)–(613,562) box — the s213–s215 caret-phase + 16-px
  backdrop-blur column composite; set-budget-dialog at EXACTLY 16 changed
  px, 100% confined to the single x=590 column (rows 519–535) — the
  s212/s213 single-column genus verbatim. **The stability proof:** all
  five delta md5s answered byte-identical across THREE independent boots
  (`ceab7754`/`3d5173c8`/`caf463eb`/`4b99aa86`/`e428c8e8`, each × 3) —
  the deltas are DETERMINISTIC properties of the rendering stack,
  conclusively not code-borne (the DOM censuses on the same surfaces
  byte-matched; the profile-mobile frame answered HEAD's exact bytes in
  runs 2 and 3 after a one-shot run-1 delta — the profile-transient
  genus's one-shot character). Zero frames refreshed; HEAD's evidence set
  stays.
- **The VLM battery: 2× "structural_differences: None"**
  (transactions-desktop, budgets-desktop) + the other two pairs' flags
  all documented DOM-disproven data-borne/platform genera (the dashboard
  pair's savings-badge conditional + legend-category + icon-family flags
  — all data-borne: the reference's negative balance hides the badge and
  shrinks the legend, our seeded demo shows it; the transactions-mobile
  pair's platform-badge occlusion over the bar's right tabs reading as a
  "2-item bar" — DISPROVEN by the byte-identical bar census: all four
  anchors byte-matched on both apps) — cross-checked against the round's
  direct byte-census before classification (the s204 flag-variance
  methodology note re-confirmed: the battery is a coarse signal, never a
  gate; the direct byte-census remains the classifier of record).
- **The dev-boot posture: all three census boots clean** — the s216 N-1
  cure (`rm -rf .next` before a census boot that follows a killed dev
  server) applied on every boot, each answering manifest=1 · login=3 in
  the request profile, zero reload loops, zero notices.

## The informational notes

- **(N-1, operational — NEW FINDING) The CAPTURE-ORDER discipline: a
  screenshot taken AFTER a scroll probe on the same surface misclassifies
  as a delta.** The round's first battery script captured the
  dashboard-mobile frame AFTER the scroll-to-bottom clearance probe on
  the same page — the frame answered a 220,795-px whole-frame delta (max
  lum 245, the content visibly shifted: HEAD's dark-text pixels answered
  white in the run frame) against HEAD's scroll-top frame. The corrected
  script (the screenshot moved BEFORE the scroll probe) answered HEAD's
  exact bytes on the very next boot — the "delta" was the scroll
  position, not the pixels. The discipline joins the standing
  methodology: on any surface that carries a scroll probe, capture the
  evidence frame BEFORE scrolling.
- **(N-2) The battery: 7/12 first-pass byte-identical + the five delta
  frames each at its documented genus, each answered by the three-boot
  stability proof** (the details in the verification section above — the
  proof extended to three boots this round, the strongest form in the
  sequence to date). HEAD's evidence set stays.
- **(N-3) The reference's malformed-escape edge face HELD at 520** (the
  s210–s216 note, eighth consecutive round): the genus unchanged (the
  platform edge bounces malformed escapes; ours answers the designed 404
  with the never-throw raw-segment fallback), the face platform-owned,
  documented not remediated.
- **(N-4) The VLM battery's flag variance answered the documented genera**
  (the s204 methodology note): 2× "None" + the other two pairs' flags all
  cross-checked and DOM-disproven by the round's direct byte-census — the
  coarse signal answered within its designed envelope, and the direct
  byte-census remains the classifier of record.

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-28.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.27.0** (the revision block),
`budget-wiser_SKILL.md` **v1.26.0** (the provenance + Appendix C's
session-217 row), this log, and the worklog entry (Task ID 217). The
README, AGENTS.md, and CLAUDE.md needed no changes (the counts held at
414/67/14, no new contracts).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
