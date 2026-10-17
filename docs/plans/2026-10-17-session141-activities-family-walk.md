# The session-141 plan — the activities family walk (the charts.tsx consumer #4 + the four-lens session)

## The intake

The workspace re-cloned at `bf5c627` (the s140 ship `32438be` + `5f89ac5` + the
session_299 transcript commit); the environment re-stood (bun install 533
pkgs, `.env` with DATABASE_URL="file:../db/custom.db" + AUTH_SECRET,
`env -u` db:push/db:seed, census MATCH 15/24/10/23/12 + 4 users, the
Playwright chromium-headless-shell 1243 reinstalled after the reset). The
four intake docs read (session_298 + the s140 plan + the repo worklog +
session_299) — the s140 ship verified end-to-end by the 141-a audit (9/9
Verified; one record-only footnote: the s140 record set carries the prose
typo "s38" for "s138" in ~30 doc sites, a cleanup candidate for this
session's docs pass).

The rotation decision (the session_299 close named the accounts fourth
cycle s133+7 / the calendar s124+16 / the activities s125+15 / the
charts.tsx consumer #4 — none explicitly; the orchestrator decides per the
blast-radius doctrine): **THE ACTIVITIES FAMILY WALK, subsuming the
charts.tsx consumer #4** (the by-type chart IS the activities page's own
chart — the same walk covers both). The 141-a freeze map:

- **The richest carrier stack of the candidates** (~6 rendering-relevant
  carriers since the s125 walk: entity-dialogs s127 [the ActivityDialog],
  tabs + TABS_PILL s129 [the segmented strip — live-walked at s129 only on
  the profile/settings sibling], button s129/s130 [the hover arms], toast
  s131, select s133, charts.tsx s138 [the by-type call site]) — the s139
  precedent found TWO real defects on a 2-carrier surface; this is a
  6-carrier surface.
- **The only candidate with chart-interior yield** — completing the s138
  grid-fix consumer sweep #1–#4 (reports s138 · dashboard s139 · leads s140
  · **activities s141 — the sweep's last consumer**).
- **Four lens generations never ran on the surface**: the F-126c1 text
  census, the F-127c2 submit-color (the ActivityDialog), the F-128c1/s132
  select-OPEN states, and **the by-type tooltip face** (the raw-dataKey +
  raw-number face — decoded on the leads wonlost at s140, never on THIS
  chart).
- Staleness +15 (one behind calendar +16 — whose extra staleness buys ZERO
  chart yield; the carrier-rich-over-staler doctrine). Accounts re-
  adjudicated zero-yield a THIRD time (page-parts' s139 move is the
  Sparkline arm, un-consumed by accounts; charts s138 un-consumed).

## The baseline gate

lint 0/0 · tsc 0 · **113/2057 unit** · build · **e2e 138/138 (3.4m)** —
the exact s140-ship match. probe:ref **#113** — the reference STABLE at
the 81-session standing fingerprint (index-DZ-xbrIm.js · a70a637f… ·
1,631,071 bytes · demo data ZERO · the TRUE-390 defect STANDS). The four
drift gates CLEAN ×4. scandihaven `d4789c3` on-pattern. census MATCH.

## The audits

**141-a 9/9 Verified** (the footnote above) + THE COMPLETE ACTIVITIES
PRE-WALK INVENTORY: the freeze map (activities-page.tsx frozen since s109
[c64fa81] — 32 sessions; the carriers as above; the by-type chart call
site :569 — grid={false} tickFontSize 10 radius [4,4,0,0] height 150 fill
#3b82f6, NO name, NO formatter — the s138 fix CONFIRMED fix-inert at
source [no CartesianGrid surface; the tick spread is a no-op when tick is
defined] — the walk's yield is the maiden lenses + the never-run DOM
census, not the grid adjudication) · the chart anatomy (the 5-series
vocabulary call/email/meeting/task/note — WhatsApp a quick-log type but
NOT a chart series; the KPI derivations all reading the FILTERED set) ·
the pin coverage (activities-calendar-parity s125 + charts-internals
:90/:251/:262 — the LIVE by-type interiors unpinned) · the named risks
L-141a1..a10 (TOP = the activities carrier stack itself). **141-b 11/11
PASS** (the ~99th standing battery, zero findings — the drawer battery 11
e2e live, the Tailwind v4 census clean [zero oklab classes, zero config
files, 32 rounded-full sites exact], the SEO census 9/11/13, the space-y
census 107 exact, the db-path contract 20/20 + census MATCH, the rate
limits 10/10/5/20/+20, the auth stack standing, the envelope + exactly 8
raw-fetch sites, the gate chain verbatim, the focused ladder 40/40, the
strays clean).

## The walk (141-c) — walk32

**walk32** (the phased idiom: one app×viewport per invocation; the
censuses persisted to /tmp JSON; the reference's storageState persisted +
reused, ONE reference login; PORT 3141; the walk dbs at the repo db/
folder — walk32-zero.db [the seeded copy zeroed via the absolute-override
zero-data] for PASS 1 / walk32-seed.db [the pristine seeded copy] for
PASS 2; the standalone server booted with the absolute DATABASE_URL
override per the db-path seam's intentional-override contract; both apps
at 1440×900 + 390×844; every ours phase logging in fresh with the
L-138c3 hydration settle; the L-127c5/L-140c2 doctrine — the server + its
phases ride ONE bash invocation, `pkill -f server.js` + a port-dead
confirmation between passes).

The census (the walk15 A–H family, re-rode + the maiden lenses):

- A. the shell (the h1 + the quick-log quartet + the wrap geometry)
- B. the KPI row (the 6 BarStatCards: labels/values/fonts/subValues/
  trends/bars/colors/chrome/grid)
- C. the Priority card (the h2 + the ghost More + the SEGMENTED TAB STRIP
  — the s129 TABS_PILL state, the four tabs + the active pill + the
  Overdue count badge + the four empty states + the tab-switch semantics)
- D. the Timeline card (the h2 + the ••• + the empty state)
- E. the rail at 1440 (the Filters card: the group label + the 4
  checkboxes + the Owner/Status selects + the More Filters (1) expander +
  the Filter button; the by-type card: the title + ••• + the STATIC "Last
  2 days" subtitle + **THE CHART-INTERIORS DEEP CENSUS** + the 5 count
  chips + the footer family)
- F. **THE BY-TYPE CHART-INTERIORS DEEP CENSUS (the maiden lens — the
  s138-140 chart census generation never ran on activities)**: the bars
  (the per-rect fills + the rounded-top radius path form), the ticks (the
  x labels + the y ticks at fontSize 10), **the NO-GRID verification**
  (grid={false} — zero .recharts-cartesian-grid lines, the L-138c1-immune
  face), the axis lines + tick lines (the stock #666 chrome), the chart
  rect, the y-domain at zero (the "0,1,2,3,4" quirk comparable face)
- G. **THE MAIDEN TOOLTIP LENS** on the by-type chart (the L-139c2
  card-scoped + the L-140c1 locator-hover mechanism; PASS 1 zero: the
  untriggerable face; PASS 2 seeded: **the raw-dataKey + raw-number face**
  — "Call" + "count : 7", never decoded on this chart)
- H. the interactions (the type checkbox round-trip + the Save All reset
  + the More Filters (1) expander + the Filter click + the tab switches)
- I. the quick-log dialog (the ActivityDialog s127 interior: the rect +
  the label census + the type select + the datetime + the textarea + the
  submit + Cancel + Escape)
- J. the @390 face (the rail display:none + the KPI single-track + the
  tab strip + the quick-log wrap + the containment + **the M-109c1
  seeded-row containment** on the PASS 2 phone phase)
- K. **PASS 2 (populated, ours-only)**: the KPI values (activitiesToday
  1 · overdue 6 · emailsSent 6 · callsLogged 7 · meetingsScheduled 4 ·
  whatsapp 2 — the API cross-check) · the priority rows (the Overdue
  badge 6 + the 6 rows + the Xh/Xd badges + the initials avatars) · the
  timeline (the LONG-WEEKDAY h3 headers + the tinted icon squares + the
  Related-to links + the type badges) · the by-type bars (Call 7 / Email
  6 / Meeting 4 / Task 3 / Note 1) + the chips + the tooltip face · the
  filter round-trip (the type checkbox → the filtered timeline + the KPI
  re-derivation) · the seeded @390 containment.

## The remediation (the plan-shaped ToDo)

- **D-141a0** the walk verdict-driven fixes (if any real parity defects:
  the fix at the exact site, RED-first pins; if zero: the pin-only
  session per the s134/s136/s140 pattern)
- **D-141a1** the freeze pins (+N its in activities-calendar-parity /
  charts-internals as the walk's discoveries dictate — the by-type call
  site's tooltip construction + the carrier-stack constructions the walk
  verifies; GREEN-at-birth per the freeze-pin pattern; the
  mutation-proof)
- **D-141a2** the docs realignment (the lockstep RED → GREEN; the count
  ladder; SKILL v1.138.0 + the session-141 layer + the AGENTS
  Session-141 section + the PAD session-141 row + the CLAUDE carriers +
  **the "s38"→"s138" prose-typo cleanup** [the 141-a footnote — the ~30
  doc sites])
- **D-141a3** the captures (292+) + the VLM battery
- **D-141a4** the final gate (lint · tsc · the count ladder · build ·
  e2e 138 · the closing drift sweep ×4 · census MATCH)

## The ship

The two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim, the dry-run then the real push; remote-verified; the
keys shredded).

## The execution record (appended post-execution)

The rotation ran exactly as planned — **a clean walk, the pin-only
session, the consumer #4 sweep-close**.

**THE WALK (walk32, the phased idiom)**: the walk dbs prepared at the
repo db/ folder (walk32-zero.db zeroed via the absolute-override
zero-data; walk32-seed.db the pristine copy); the standalone booted per
pass with the absolute DATABASE_URL override; the reference's
storageState persisted + reused (ONE reference login).

**Two harness incidents mid-run, both repaired + both now lessons**:
- The seeded tab-switch timed out on `getByRole("tab", { name:
  "Overdue", exact: true })` — the count badge folds into the
  accessible name at seeded state ("Overdue 3"). → **L-141c2 the
  badge-carrying tab accessible name** (exact: false at seeded).
- The Call-checkbox interaction silently no-op'd — the ui Checkbox's
  label is a SIBLING of the button, so the `[role="checkbox"]` hasText
  filter matches nothing (the walk15-era locator genus — it had
  silently no-op'd at s125 too). → **L-141c1 the sibling-label
  checkbox locator** (the label's preceding-sibling button XPath,
  verified on BOTH apps).

**THE VERDICT**: PASS 1 two-app zero-data — **327 axes, 1 diff = the
DOCUMENTED More-Filters superset** (the s125 fix-over-defect genus) —
**ZERO REAL PARITY DEFECTS** (the by-type chart-interiors maiden census
byte-equal — the bars 0-count genus, the ticks, the NO-GRID
verification, the chart rect, the chips; the maiden zero-face tooltip
"Emailcount : 0" byte-equal two-app). PASS 2 populated ours-only —
every seeded contract holds (the 7days-windowed KPIs + the API
cross-check; the priority rows with the Xh/Xd badges; the Overdue
count badge; the tab switches; the timeline; **the maiden seeded
tooltip face "Callcount : 5"** — the raw-dataKey + raw-number face;
the 0-value-bar elision genus; the filter round-trip restored
byte-identically; the dialog; the @390 containment + the M-109c1 rows
holding).

**THE PINS (D-141a0)**: +2 in charts-internals (32 total — the
by-type call-site construction pin + the L-138c1 tick-spread guard
pin at the family level) + +1 in activities-calendar-parity (60 total
— the chips palette pin). **The mutation-proof**: the name-prop drift
→ exactly 2 RED (the pin + the pre-existing same-site family pin),
the guard removal → exactly 1 RED alone, the hex drift → exactly 1
RED alone; reverted → 92/92 GREEN.

**THE DOCS REALIGNMENT (D-141a1)**: the atomic script (the typo
cleanup + the lockstep + the count sites + the layers). **UNIT 2057 →
2060 (+3) · SUITES 113 · E2E 138 · badge 2195 → 2198**; SKILL v1.138.0
+ the session-141 layer (the layer-axis s141/s140 pair re-anchored) +
the AGENTS Session-141 section + the PAD session-141 row + the CLAUDE
carriers + **the s38→s138 prose-typo cleanup** (~30 sites, the real
session-38 history preserved). The lockstep GREEN 40/40; the full
suite **113/2060**.

**THE CAPTURES (D-141a2)** 292-295 (four unique md5s) + **THE VLM
BATTERY 4/4 CLEAN** (the KPIs verbatim; the maiden tooltip face
"Call / count : 5" visually confirmed; the three overdue rows read
verbatim; the phone face contained — two adjudicated footnotes: the
small-subtitle misread + the gridlines over-read, the DOM census
authoritative).

**THE FINAL GATE (D-141a3)**: lint 0/0 · tsc 0 · **113/2060** ·
build · **e2e 138/138 (3.3m)** · the closing drift sweep CLEAN ×4 ·
census MATCH.

**The ship**: the two-commit pattern (the feat + the session log)
pushed to git@github.com:nordeim/neo-crm.git main via the SSH wrapper.
