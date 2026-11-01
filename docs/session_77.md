# Session 40 — The Thirty-Seventh Census (Task ID 229)

The round opened with the workspace INTACT (the second consecutive
no-reset round): `git pull` fast-forwarded to `0275f01` (the owner's
`docs/session_76.md` transcript commit over the s228 ship `79bbe67`),
and the standing environment was VERIFIED rather than rebuilt: bun
1.3.14 (the sandbox's own), `bun install --frozen-lockfile` (518
installs across 610 packages, no changes — the lockfile honored), the
six-knob `.env` standing with `DATABASE_URL="file:../db/custom.db"`
(the mandated contract), `db/` at the repo root with `custom.db` (the
`e2e.db`/`smoke.db` pair recreated by their own gate legs), the
Playwright Chromium headless-shell 1248 standing, and agent-browser
0.40.0 verified. The five root documents + `docs/session_75.md` +
`docs/REMEDIATION-PLAN-SESSION-39.md` + `worklog.md` +
`docs/session_76.md` were read and validated against the tree before
touching anything (the db-path seam, the proxy seam, the capital-alias
stubs with their metadata re-exports, the `@custom-variant hover`
unwrap, the 148 color re-pins, the `outputFileTracingExcludes` pin,
the four config scopes carrying the `skills/` exclusion — each verified
in place). The full baseline gate then ran FIRST: lint 0/0 ·
typecheck 0 · **420/420 unit** · build · **14/14 smoke** · **68/68 e2e
(CI=1)** — the exact documented session-228 ship state, green on the
first full pass, with the mobile-navigation battery additionally
re-verified standalone at 12/12.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (no dangerouslySetInnerHTML, no
eval/new Function, no TODO/FIXME, no `any` leaks in `src/`; the three
`src/` `console.*` hits answered as the documented sanctioned
diagnostics — the two server-console OTP delivery lines + the dev-only
AUTH_SECRET fallback warning), `src/middleware.ts` absent +
`src/proxy.ts` in place (the s201 seam), `skills/` confirmed excluded
from all four check/test/compile scopes (tsc exclude · eslint ignores ·
vitest include `src|tests` only · playwright testDir `tests/e2e`), the
literal-class discipline verified (all 15 `className={\`...\`}` hits a
static-constant composition over the `page-layout.ts` records — the
literals statically extractable), the capital-alias `.jsx` stubs
verified (the metadata re-exports present on Transactions/Budgets/
Profile; /Dashboard metadata-less by design), the
`outputFileTracingExcludes` artifact-hygiene pin verified, and the
mandated focus areas each swept clean — the **mobile navigation** (the
12-test e2e battery green standalone + the live byte-census on BOTH
apps) and **TailwindCSS v4** (the `@custom-variant hover` unwrap at
globals.css:20, the `--shadow-sm`/`--blur-sm` re-pins at :149/:158,
the v3 palette re-pin block — 148 `color-` pins, the `safe-area-pb`
@utility at :405, no config JS, no v4-family bugs found). The `.env`/`db`
contract verified (six knobs in both files with identical knob names,
`db/` at the repo root, the seam pinned by `tests/db-path.test.ts`,
`.env.example` tracked), the Vitest + Playwright suites verified in
place with clean config scopes, the SEO surfaces verified (sitemap +
robots + manifest explicit route handlers, the nine-route sitemap),
the docs-count lockstep verified at **420/68/14** live-tense (the s222
guard green in the suite), and the neo-crm tech-stack lineage
re-confirmed from the carried `neo-crm_SKILL.md`.

## The finding: ONE code finding (the month-boundary e2e flake — remediated with TDD) + zero reference drift

The census itself found **zero reference drift** on any probed surface
and every local audit dimension answered clean. The round's code
finding (F-1, Medium) is a genuine month-boundary flake in the e2e
suite, caught live when the October→November rollover fired BETWEEN
the round's baseline gate (green, 2026-10-31 23:35) and the
post-documentation gate (RED, 2026-11-01 00:01):
`tests/e2e/app-flows.spec.ts:62,70` hardcoded "Monday, Oct 26, 2026"
while `prisma/seed.ts` plants the demo month in the CURRENT month (the
documented design — "CURRENT month so a re-seed any time keeps the
dashboard non-empty"), so the two row-date assertions RED the suite at
every month boundary. No prior round ever ran the gate across a month
rollover — the pin shipped at session 190 and survived thirty-nine
rounds of October-only gate runs. Remediated with TDD: the RED state
demonstrated on the actual failing run; the GREEN fix derives the
expected date from the seed's own current-month rule (the 26th)
rendered through the app's own `formatFullDate` options
(`toLocaleDateString("en-US", { weekday: "long", month: "short",
day: "numeric", year: "numeric" })`) — the `seededRowDate` matcher,
month-agnostic with the same assertion strength; the affected spec
green 23/23; no count movement (the fix modifies assertions inside
existing tests). The round also carries three evidence-class
observations (N-1: the composite-variance genus answered its `a5f47a64`
sibling form on BOTH boots — the genus's first same-md5-across-boots
answer; N-2: the hidden-a11y-select genus — both apps' category dialogs
ride an invisible 1×1 native select whose option order/composition is
platform plumbing, and this round read the VISIBLE listboxes
byte-for-byte for the first time; N-3: the VLM battery answered 2/4
None — its cleanest result yet), methodology and evidence.

## The live re-audit: the THIRTY-SEVENTH census — zero reference drift

The reference re-audit (agent-browser 0.40.0, fresh login with the
owner's credentials, 1512×945 + 390×844) found **zero structural
deviation on every probed surface** — the twenty-second census after
the s207 percent-encoding fix, the twelfth after the s218 arrow
remediation, and the eleventh carrying the deeper row-anatomy probe as
standing methodology. The s207 fix VERIFIED LIVE on both apps once
more: the fresh `%20` probe (`/Curl%20Probe%20229%20Test`) answers the
DECODED title `Curl Probe 229 Test | Budget Wise` on the reference AND
on ours identically (ours with the real 404 status, curl-verified); the
`%2D` path answers "Foo Bar | Budget Wise" on both (the
decode-precedes-hyphen order); the fresh hyphenated probe
(`/Hyphen-Probe-229`) answers "Hyphen Probe 229 | Budget Wise" on
both; the 404 BODY quotes the raw ENCODED path on BOTH apps (probed
`The page "Curl%20Probe%20229%20Test"` on both). **The malformed-escape
posture held the s210 genus AND face for the TWENTIETH consecutive
round:** the documented probe form (`/%E0%A4%A`) answers the reference's
CDN **520** (`error code: 520`, curl-verified) where ours answers the
designed 404 with the never-throw raw-segment fallback (curl-verified,
title `%E0%A4%A | Budget Wise`). **The deeper row-anatomy probe carried
for the eleventh census:** the amount-wrapper's inner family read on
BOTH row surfaces on BOTH apps at the list's full nesting depth — the
reference's first list row answers the icon tile `p-2.5 rounded-xl
bg-red-50 text-red-600` + the text column `flex-1 min-w-0` + the
amount+delete group `flex items-center gap-4` > the amount block `flex
items-center gap-2` > `svg.lucide lucide-arrow-down-left w-4 h-4
text-rose-500` + `SPAN.font-semibold text-lg text-rose-600` inside the
`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors` row,
and the dashboard recent form answers the `font-semibold text-rose-600`
span (no text-lg) in the amount block riding the `flex items-center
gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors` recent row;
ours answers byte-identical classes on both surfaces plus the income
form (`lucide lucide-arrow-up-right w-4 h-4 text-emerald-500` + the
emerald amounts `+$5,000.00`) the seeded Salary row exercises — the
s218 remediation VERIFIED at the exact depth where the genus lived,
for the eleventh consecutive census. Every other parity surface
answered byte-identical: the body census (`[#root,
#base44-edit-badge, #recharts_measurement_span]`, body WHITE), the
shell (nav classes + `main.pb-20 md:pb-0` + the outer surface wrapper
+ the bare wrapper div), all four pages (containers 7xl/5xl/5xl/4xl,
titles via FULL navigations — Dashboard "Budget Wise", the others
"X | Budget Wise"), the mobile bottom bar byte-identical on every
dimension (DIV tag, rect top=767 h=77, the row wrapper `flex
items-center justify-around py-2`, the four anchors' classes, the ink
split on the anchor AND its svg, the four w-6/h-6 lucide icons, NO
aria-current on the reference), the scroll-end clearance (764 ≤ 767
measured with the same all-boxes lowest-box form at scroll-end on BOTH
apps), both dialogs (the expense genus with the reference's 8-option
family incl. `value="health"`; the income family flipping cleanly on
KEYBOARD activation — focus + Enter — with the submit label flipping
to "Add Income"; ours answering the documented
`healthcare`/`other_income` internal-wire genera with the visible
LABEL families matching and our Radix Income tab flipping cleanly on
a synthetic click), the Set Budget dialog (Category/Monthly Limit
labels + the 0.00 placeholder), the sitemap format + robots.txt
(curl-verified; the documented capitalized-loc divergence — the
reference lists `/`, `/Budgets`, `/Profile`, `/Transactions`; manifest
302 on the reference vs our 200 functional superset), the login card
(the 4-button OAuth row: Google, Microsoft, Facebook, Apple), and the
donut geometry (200×200 `g.recharts-pie` inside the 341×280 svg at the
pinned viewport). The reference's logged-out `/` face re-confirmed with
BOTH stores cleared (the s225 N-5 dual-store discipline): it redirects
to `/login?from_url=<abs>` — the reference ships NO public landing
(ours is the documented functional superset).

**The data state: UNCHANGED from the s200 baseline** — Balance
−$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
TWENTY-NINTH consecutive round with no owner-data movement.

**The hidden-a11y-select genus surfaced and resolved in-round (N-2):**
the round's first dialog probes read `document.querySelectorAll('select')`
on BOTH apps and returned each app's HIDDEN 1×1 a11y select (the
reference's answers className="" size 1×1; ours the Radix form-value
carrier) — whose option composition is platform plumbing, NOT the
parity surface (the reference's hidden income order reads other-first
where its VISIBLE listbox reads Salary-first; ours carries a leading
placeholder entry). The census then read the VISIBLE listboxes directly
for the first time at this depth: the reference's opened combobox
answers `Food & Dining, Transport, Entertainment, Shopping, Bills &
Utilities, Healthcare, Education, Other` (expense) and `Salary,
Freelance, Investment, Gift, Other` (income) — ours byte-identical on
labels AND order (the `categories.ts` label map + the pinned unit-test
order). Zero drift; the methodology note enters the canon
(dialog-select parity probes read `[role=listbox]`, never the hidden
carrier).

The dual-app diff ran the same census on the local dev server (two
single-call boots, the `rm -rf .next` N-1 posture applied before each —
both clean, zero reload loops, the health probe 200 on each): every
local surface matched the documented genera (the login card, the
seeded demo KPIs $4,424.55 / $5,000.00 / $575.45 / 4 txns + the
"88.5% saved" badge — the documented data-borne divergence, the shell
with our documented body-chrome platform-face genus, the mobile bar
byte-identical + the NAV-landmark/aria-current superset, the clearance
identical at 764 ≤ 767, all titles matching, the 404 surface
byte-matching with the real 404 status + the decoded title + the
encoded body + the raw-segment malformed-escape fallback, both dialogs
matching with our `healthcare`/`other_income` internal-wire ids + our
Radix Income tab flipping cleanly on a synthetic click, the SEO
surfaces matching with the documented lowercase-loc divergence, the
donut geometry byte-identical, the row inner family byte-identical on
both surfaces).

## The verification

- **The screenshot battery: 8/12 byte-identical + the four delta frames
  each at its EXACT documented genus md5, ALL FOUR deterministic across
  the round's two boots.** budgets-desktop, budgets-mobile,
  dashboard-mobile, landing-desktop, login-desktop, profile-mobile,
  set-budget-dialog, and transactions-desktop all md5-identical to
  HEAD's `docs/screenshots/` set (the s219 viewport lesson applied —
  `set viewport` re-pinned before every capture batch; the s221 cursor
  discipline applied — `mouse move 5 500` before every frame; the s222
  tab-state lesson applied — every frame captured in its DEFAULT state
  before any state-flipping probe; the s223 origin-surface lesson
  applied — the add-transaction-dialog frame opened from the
  DASHBOARD's button, the set-budget-dialog frame from the BUDGETS
  page; the capture-order discipline held — the dashboard-mobile frame
  captured BEFORE any clearance scroll; the s221 donut-settle
  discipline applied — the 25s fresh-login settle-wait on both boots'
  dashboard-desktop frames; the s227 capture-identity lesson applied —
  the page identity re-verified at every capture step). The four delta
  frames, classified by pixel-diff against HEAD: **add-transaction-dialog
  the EXACT `e5dd4c69` × 2 boots** (16 changed px, 100% confined to the
  single x=590 column, bbox (590,381)–(590,396), the dark↔white flip —
  the blur-column genus, its third consecutive round); **dashboard-desktop
  the EXACT `a5f47a64` × 2 boots** (49,212 changed px, ZERO above the
  8-luminance threshold, max delta lum 3.1/255, bbox (172,818)–(926,885)
  — the composite-variance genus's SIBLING form answering BOTH boots,
  the genus's first same-md5-across-boots answer, the exact s227-documented
  sibling signature); **profile-desktop the EXACT `3d5173c8` × 2 boots**
  (105 changed px, ZERO above the threshold, max delta lum 5.2/255, bbox
  (357,255)–(504,373) — the avatar-jitter genus's desktop form, its
  second consecutive both-boots answer); **transactions-mobile the EXACT
  `296c8736` × 2 boots** (5 changed px, max delta lum 1.0/255 — the
  sub-visible genus). **Zero frames refreshed; HEAD's evidence set
  stays.**
- **ONE EVIDENCE-CLASS OBSERVATION (N-1): the composite-variance genus
  answered its `a5f47a64` sibling form on BOTH boots.** The s227 round
  documented the md5 PAIR (`7705f2ca` + `a5f47a64`); s228 answered the
  pair again (one md5 per boot); this round BOTH boots realized the
  SIBLING — the genus's first same-md5-across-boots answer. The
  stochastic-across-boots law holds (no schedule), the per-form
  determinism within the round holds, and the signature-level
  determinism (bbox + zero-above-bar + sub-threshold max) remains what
  the classification machinery keys on — the md5 is a realization of
  the variance.
- **The VLM battery (4 pairs, the census JSON format): 2/4 None — the
  cleanest result yet — with zero flags surviving the cross-check.**
  Transactions-desktop AND budgets-desktop both answered
  "structural_differences: None" (the budgets-desktop pair classified
  the platform edit badge as a note rather than a flag this round).
  The two flagged pairs carried only the documented genera: the
  dashboard pair's data-borne trio (the "88.5% saved" badge, the donut
  data/legend, the recent-list content — our seeded demo month vs the
  reference's owner data, disproven by the byte-matching DOM census on
  the same surface) and the transactions-mobile pair's platform-badge
  occlusion + row-layout flags (disproven by this round's direct
  byte-census: all four anchors byte-matched on both apps, the row
  inner family byte-identical at full nesting depth). The s204 "coarse
  signal, never a gate" posture held.
- **The dev-boot posture: both census boots clean** — the s216 N-1 cure
  (`rm -rf .next` before a census boot) applied on every boot, zero
  reload loops, the health probe 200 on each.
- **The full gate re-ran green post-remediation:** lint 0/0 · typecheck
  0 · **420/420 unit** · build · 14/14 smoke · 68/68 e2e (CI=1) — the
  ship state at the held counts. (The first post-documentation e2e leg
  RED'd on the F-1 month-boundary flake — the finding's live catch —
  and re-ran green after the TDD fix.)

## The informational notes

- **(F-1 — the round's code finding) The month-boundary e2e flake,
  caught live at the October→November rollover.** The seed's
  current-month rule (the documented design) and the suite's two
  hardcoded "Monday, Oct 26, 2026" row-date assertions disagree at
  every month boundary; no prior round ever ran the gate across a
  rollover, so the pin survived thirty-nine rounds. The isolation: the
  failing spec re-run alone reproduced exactly the one failure; the
  seed source read confirmed the rule; the test tree swept clean of
  further month-sensitive pins (the budget-math unit tests use explicit
  year/month inputs — boundary-safe). The GREEN fix (the
  `seededRowDate` derivation — the seed's rule + the app's format)
  applied to both pins; the spec green 23/23; the full gate green
  post-remediation; no count movement.
- **(N-1) The composite-variance genus answered its sibling form on both
  boots (`a5f47a64` × 2)** — the genus's first same-md5-across-boots
  answer, after the s227 pair documentation and s228's one-per-boot
  answer. The signature (49,212 changed px, zero above the
  8-luminance bar, max 3.1/255, bbox (172,818)–(926,885)) matches the
  documented sibling signature; the md5 set stays {`7705f2ca`,
  `a5f47a64`} with both realizations now observed in every combination.
- **(N-2) The hidden-a11y-select genus — a platform-face observation +
  a new methodology note.** Both apps' Add-Transaction category controls
  ride an invisible 1×1 native `<select>` behind a custom visible
  combobox. The hidden carriers differ in platform plumbing (the
  reference's income options order other-first with no placeholder
  entry; ours salary-first with a leading placeholder option) —
  invisible to pixels, the same class as the s198 body-chrome genus.
  The census's first reads picked these carriers up on BOTH apps; the
  resolved probe read the VISIBLE listboxes and found them
  byte-identical on labels AND order. The methodology guard enters the
  canon: dialog-select parity probes read `[role=listbox]`, never the
  hidden 1×1 carrier.
- **(N-3) The VLM battery answered 2/4 None — its cleanest result
  yet.** Transactions-desktop and budgets-desktop both answered None;
  every surviving flag the documented data-borne/platform-badge genera,
  each disproven by the direct byte-census on the same surface.
- **(N-4) The two-boot stability proof extended the per-form
  determinism evidence:** all four delta frames answered the same md5
  on both boots (`e5dd4c69`, `a5f47a64`, `3d5173c8`, `296c8736` × 2
  each) — the avatar-jitter desktop form now answering both boots for
  the second consecutive round, the blur-column genus answering the
  add-transaction-dialog form for the third consecutive round.
- **(N-5) The intact-workspace intake verified:** the second consecutive
  no-reset round — `git pull` + the frozen-lockfile install check + the
  standing db/Chromium environment landed the documented ship state
  with the gate green on the FIRST full pass (the
  environment-verification path — the lighter half of the s228 N-5
  bootstrap proof: verify-not-rebuild on a standing clone).

## The documentation set

`docs/REMEDIATION-PLAN-SESSION-40.md` (the round's plan, ticked + the
execution addendum), the PAD **v2.39.0** (the revision block records
the thirty-seventh census — the one-code-finding round: the
month-boundary e2e flake caught live and remediated with TDD, the
battery's same-md5-across-boots answer, the hidden-a11y-select genus
note, and the cleanest VLM battery), and `budget-wiser_SKILL.md`
**v1.38.0** (the frontmatter version bump + the provenance gains the
session-229 clause + Appendix C gains the session-229 row), this log,
and the worklog entry (Task ID 229). The counts verified live-tense at
**420/68/14** (held; the s222 lockstep guard green in the suite);
AGENTS.md verified count-free.

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
