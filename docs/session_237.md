# Session 113 — Menu/popover-family LIVE re-walk (feat log)

Session 113 on `main` @ `ef06550` (the s112 ship + the session_236
follow-up). The workspace had been RESET (a fresh clone): the
environment rebuilt from `.env.example` + a fresh AUTH_SECRET, the db
pushed + seeded (census MATCH 15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`), the Playwright browser installed fresh, the
scandihaven pattern repo re-cloned. Every op under `env -u
DATABASE_URL` (the stray hazard re-confirmed at intake).

**The baseline gate:** lint 0/0 · tsc 0 · 109 files / 1944 unit ALL
PASSING · build · 137/137 e2e fresh CI=1 (3.2m, zero flakes) — exactly
the s112 ship state.

**The audits (both subagents):** 113-a the s112 ship delta
(`be95db5..3c628b8` + the session_236 follow-up) **GENUINE 10/10, ZERO
real findings** — every hunk, count, literal, and capture verified; the
full-suite 109/1944 reproduced live; the RED-1 arithmetic cross-checked
(244 native + 2 = 246 staged, 16 RED). 113-b the standing layers
**8/8 PASS, ZERO real findings** (~70th consecutive) — the SEO/sitemap
live check 6/6 on a scratch db (the sitemap's 9 lowercase URLs + bare
application/xml, robots' Sitemap line, the manifest JSON, the 405-char
meta description, /login's OG/Twitter set, /accounts' canonical), the
drawer battery 10/10 exit 0 at TRUE 390×844, design-tokens 15/15,
vocabulary 12/12, config zero drift, the Tailwind v4 layer
byte-standing, the reference-defect ledger unchanged.

**The live verification:** probe:ref the bundle `index-DZ-xbrIm.js`
md5 `a70a637f…` **STABLE — the 84th consecutive**; the demo census
zero; the mobile-nav defect STANDS at TRUE 390 (the 34th). The four
drift gates CLEAN (1440 · 390 · 768 · 1024, each --fail-on-drift) +
the closing census MATCH.

**The rotation (113-c):** scout-adjudicated before it was walked. A
two-app probe of the s112-close's three candidates found the topbar
search renders NO dropdown on EITHER app (the s32 dead-decode
confirmed live) and the reports chart tooltips are recharts defaults
on both sides (the s10 doctrine) — **the menu/popover family was the
only walkable candidate**: the s13-era MENU pins were class-string
extractions from 2026-09-30 (thirteen sessions and one reference
shadcn bump ago), the family's mount-focus + keyboard behavior had
never been measured (the s111 D1 genus), and the Filters popover's
field-label TAGS had never been census'd.

**The walk:** two throwaway scripts (deleted before ship) drove BOTH
apps through the account-menu + leads-Filters + leads-row-menu ladder
at 1440×900 + 390×844 — our side on the standing build + a scratch
walk db — extracting trigger censuses, open-panel geometry, computed
styles, popper transforms, item censuses, mount-focus states, the
ArrowDown highlight, and Escape closes.

**THE RESULT — the family is in COMPLETE LIVE PARITY on every computed
axis.** The account menu's geometry is byte-identical at 1440 (x=1280
y=56 w=128 h=74, bottom/end, the popper transform equal on both apps);
the content computes equal everywhere (white / 1px #e5e5e5 / 6px radius
/ shadow-md / 4px pad / #0a0a0a / 128px min-w); the item census
identical ([A/Profile href="/Profile", DIV/Logout] · 118×32); the
mount-focus identical (the content DIV on click-open); the keyboard
model identical (ArrowDown → the first item + the #f5f5f5 highlight).
The Filters popover's geometry byte-identical at BOTH widths (320×398
@304,483 at 1440; the 390 collision flip-up matched) with the census
identical. The row menus ours-only walkable (the reference's zero-data
state — the documented genus; the s73 bundle decode the contract).

**The finds:**

- **D-113a1 (REAL, structural/a11y)**: the reference's Filters popover
  renders FOUR bare `<label>` elements; ours shipped `<span>`s. The
  strict-mirror fix — the four leads-page sites re-tagged; real label
  semantics (the a11y tree + the form-labeling family).
- **D-113a2 (inert class-string — the s112 D-112a1 genus)**: our
  s13-era MENU_CONTENT carried `outline-none`; the reference's CURRENT
  stock content does not. Retired for byte parity — verified INERT live
  on both open paths (the click-open's programmatic focus is not
  :focus-visible; the keyboard-open focuses the first ITEM). The
  token-map arms STAY (the documented s73 computed-equal mechanism,
  live-verified white/#e5e5e5/#0a0a0a on both apps; the s86
  border-input precedent).
- **D-113a3 (behavioral, UNPINNED)**: the menu mount-focus + keyboard
  model frozen as e2e expects INSIDE existing test() blocks (the
  census stays 137) — the account menu's content focus, the ArrowDown
  first-item landing, the row menu's content focus.
- The noise families adjudicated away: the ring-arms' string position
  (s86), the transparent-shadow prepends (s112), the token-map
  mechanism (s73/s86), the topbar @390 arrangement (the s93 standing
  genus — the walk re-confirmed both censuses exactly).

**The count ladder:** UNIT 1944 → 1946 (+2 — the MENU re-pin it + the
labels it, both in page-layout.test.ts) · SUITES 109 UNCHANGED · E2E
137 UNCHANGED · badge 2081 → 2083 · the page-layout census rows 1548 →
1559 + 183 → 185 checks.

**The TDD ladder:** RED-1 **16 failed | 190 passed (206)** at the
still-unfixed src + the still-old docs (the 14 docs-counts count-axis
its + the MENU it + the labels it — enumerated by name; the plan
predicted 15-18), stash-proven (the two staged files → the native
204/204 → pop → 16 RED). GREEN **109 files / 1946 ALL PASSING** after
the src fixes + the docs realignment, with one in-flight correction
(the census literal drafted 1556 landed at 1559 — the comments ran
longer than drafted, the s112 genus) + one lockstep re-anchor discovered
en route (the dialog-geometry CLAUDE carrier + the layer-axis literals).
RED-2 both faces by name (the outline-none re-add → the MENU it; the
Status label reverted to span → the labels it; both restored → full
GREEN).

**The gate (stepwise):** lint 0/0 · tsc 0 · 1946/1946 unit [109
suites] · build · **137/137 e2e** (the two focus expects green on
their first run — the account menu's content focus + ArrowDown
first-item, the row menu's content focus) · the four drift sweeps
CLEAN (no re-baselining — the label re-tag renders identically; the
class retirement is render-inert) · the closing census MATCH.

**The captures:** 180 the account menu OPEN @1440 (w=128 h=74,
focus=DIV/menu, docScrollW=1440) · 181 @390 (the phone face contained,
docScrollW=390) · 182 the leads Filters popover @1440 (w=320 h=398,
labels=4 — the re-tag live, side=bottom) · 183 the leads ⋮ row menu
@1440 (w=188 h=106, [Edit, Convert to Opportunity, Delete],
focus=DIV/menu). **The VLM battery 4/4 × 4, zero adjudications** — the
items read verbatim off every panel (Profile/Logout; Status/Source/Min
Deal Value/Follow-up Date with the labels-above-inputs construction;
Edit/Convert-to-Opportunity/Delete with the red Delete), the white
rounded shadowed styling, and the containment all independently
confirmed off the pixels.

**The ship:** the house-style commit (the TWO src files + the four
test files + the five docs + the plan + the four captures + this log +
the worklog) → the SSH push per the runbook (the operator key OUTSIDE
the repo, the fingerprint VERIFIED, the dry-run, the real push with
`--remote git@github.com:nordeim/neo-crm.git` explicit — the s112
wrapper-default lesson) → the session-log follow-ups (session_238/239)
→ the close-out.
