# The session-176 plan — THE RECHARTS 3.x MIGRATION (N-3 retired)

Date: 2026-10-24 · Rotation: 176 ·
Task: audit + validate the session-175 ship (the response-side wire-contract
family), retire the report's N-3 finding (recharts 2.15 → 3.x) TDD-first,
re-derive only what the live drift gates name, align every doc, capture the
screenshots, and push to `git@github.com:nordeim/neo-crm.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `35f04d5` (the s175 ship `cccb27b` + the owner's
session-374 transcript commit; the workspace warm — the s175 round was
test-only, the toolchain unchanged):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN (full strictness standing) |
| unit | GREEN **138/2726** (the s175 ship state) |
| build | GREEN (the type-gate build) |
| smoke | GREEN **14/14** (incl. sitemap + robots + manifest 200) |
| e2e | GREEN **192/192** (5.4m, foreground) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c` — unchanged since the s168 fingerprint; logged in clean) |
| drift gates | the desktop + phone sweeps **CLEAN** (margin 0.5pct over the standing baselines) |
| mobile drawer | the battery **GREEN** at 390×844 (locks engage/release + the resize-past-md auto-close) |
| Tailwind v4 state | clean (`@tailwindcss/postcss` ^4.3.3 · CSS-first `@theme`, no JS config) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current |

**Zero live defects** — the audit verdict matches the s175 round's (the
READ-side census found nothing; the repo ships clean). The round is
therefore the REGISTER-RETIREMENT round the last three closes named.

### 0.1 The rotation trigger

The owner's newest commit `35f04d5` — the session-374 transcript, whose
close names the candidate verbatim: "the recharts 2.15 → 3.x migration
(N-3, needs its own baseline re-derivation round) is the largest remaining
named candidate." The session-373 close agrees ("its own rotation: the
standing pixel baselines need re-derivation"). The report's N-3 row:
"recharts 2.15 (v3 is current; sibling zb runs 3.10) … Older chart major;
migration debt · Low · Verified."

### 0.2 The migration census (the official 3.0 guide, read against OUR usage)

The recharts 3.0 migration guide's breaking changes, walked against the
nine recharts call surfaces (`charts.tsx`'s seven families + the Sparkline
area/line arms in `page-parts.tsx`):

| 3.0 change | Our exposure | Verdict |
|---|---|---|
| min React 16.8 / TS 5 / Node 18 / TS target es6 | React 19.3.1 · TS 5.x · bun · target ES2017 | **no blocker** |
| state-management rewrite (`CategoricalChartState` gone) | we never touch internal state | no change |
| `defaultProps` machinery retired (the class/function defaultProps genus the L-138c1 hazard lived in) | the L-138c1 conditional tickProp spread | the guard becomes a harmless no-op — RETAINED (source pins stay green), re-verified live by the e2e grid sentinel |
| **`accessibilityLayer` default false → TRUE** | every chart-type JSX site (9) gains role="region"/tabIndex/aria-label the reference's 2.x DOM does not carry | **F-176b — the DOM-parity fix: explicit `accessibilityLayer={false}` at all 9 sites** |
| axis lines show even with no ticks | our categorical charts carry category ticks at the zero-data faces (the reference renders the REAL chart at all-zero data); the sparks carry NO axis components at all | moot on our faces — the sweeps verify live |
| Legend order no longer promised | the stock `<Legend />` on the wonlost family (2 items) | watch the e2e + the sweeps live |
| TS types reworked | `Tooltip formatter` (`(v: number) => string` against the new `Formatter` signature), the `tick` object, the Pie `label` callback | the tsc run is the census — fix at the type seam only, zero rendering change |
| `Cell` deprecated (removal in 4.0) | `LabelPieChart`'s per-slice Cells | works in 3.x — RETAINED, the 4.0 `shape` path documented |
| `recharts-scale`/`react-smooth` removed (animations inlined) | the L-138c2 pie-label ~2s mount-animation gate | watch the e2e sentinel live |
| removed props (`activeIndex`, `blendStroke`, `animateNewValues`, …) | none used | no change |

### 0.3 The deferral register (open decisions, resolved with rationale)

| Candidate | Verdict | Rationale |
|---|---|---|
| Target version | **3.10.1 (`^3.10.1`)** | The latest stable (the registry's `latest` tag); the sibling zb's proven 3.10 line (the report's own citation); the canary 3.11 stream excluded by the never-canary rule. |
| `accessibilityLayer` ON (the 3.x default) | **REJECTED — `false` pinned at all 9 sites** | The parity doctrine: the reference's 2.x DOM carries no chart-wrapper roles/aria/tabIndex, and the a11y two-gate's sanctioned register was calibrated on the 2.x genus (the funnel's hardcoded role="img"). Turning the layer ON would be OUR addition, not a reference mirror — a DOM divergence the interior census and the parity posture would have to absorb. The enable path stays an owner-level decision (documented in the ADR). |
| The `Cell` → `shape` refactor | **DEFERRED to the 4.0 gate** | Works unmodified in 3.10.1; the deprecation is a 4.0 removal notice, not a 3.x break. Refactoring the pie family now would churn a bundle-pinned surface with zero behavioral gain. |
| The pixel-baseline re-derivation | **RESOLVED BY LIVE EVIDENCE** | The s373 close predicted re-derivation; the actual protocol: run the six drift gates on the migrated tree — if CLEAN, the migration is render-identical and the standing baselines HOLD (no re-derivation); if drift, root-cause per genus and only then re-derive with the documented genus. The prediction was conservative; the evidence decides. |
| The hosted-CI port · the doc restructure (N-1) · RBAC | **STANDING DEFERRALS** | Unchanged from the s175 register (the owner's own local-gate doctrine; the owner-level archive decision; the documented single-workspace design). |

### 0.4 The chosen round

**THE RECHARTS 3.x MIGRATION.** The last named register item that touches
product code. The version floor (package.json + bun.lock), the DOM-parity
prop at every chart-type site, the type-seam fixes the 3.x types surface,
and the live re-verification of every chart-bearing gate — the e2e grid
sentinel (the L-138c2 guard built for exactly this upgrade), the six drift
gates, the a11y two-gate, the seeded-charts freeze. The migration is a
DEPENDENCY-BUMP round under the toolchain-bump rule: the standing legs
carry the parity verdict, re-run in full.

## 1. The work packages

### WP-1 — the TDD RED battery (`tests/charts-internals.test.ts` grows — the chart-family suite's own doctrine, the ADR-017 one-suite rule)

A session-176 describe block, born RED on the 2.15.4 tree:

- the **version-floor pin**: `package.json` declares recharts `^3.` (RED
  on `^2.15.4`);
- the **lockfile pin**: `bun.lock` resolves recharts 3.10.x (RED before
  the install);
- the **accessibilityLayer parity pin**: every chart-type JSX site in
  `src/` (`BarChart` ×3 · `LineChart` ×2 · `PieChart` · `ComposedChart` ·
  `FunnelChart` · `AreaChart`) carries `accessibilityLayer={false}` — a
  CENSUS pin (counts the sites, asserts every one carries the prop);
- the **L-138c1 guard retention pin under 3.x**: the conditional tickProp
  spread stays in the two Cartesian bar families (the existing pin
  re-asserted with the 3.x rationale — the guard is now a harmless
  no-op, retained as the belt-and-suspenders form).

### WP-2 — the migration itself (the GREEN phase)

- `bun add recharts@^3.10.1` (the package manager owns package.json +
  bun.lock — never hand-edited);
- `accessibilityLayer={false}` at the nine chart-type sites;
- the type-seam fixes the 3.x types surface (expected: the Tooltip
  `formatter` signature contravariance — fix at the prop boundary, zero
  rendering change);
- the L-138c1 comments re-anchored to the 3.x posture (the defaultProps
  machinery the hazard lived in is gone; the spread stays).

### WP-3 — the proofs

- **MUTATION-A** (the version regression): package.json planted back to
  `^2.15.4` → the version-floor pin RED → restored → GREEN.
- **MUTATION-B** (the parity regression): the prop removed from one
  family → the census pin RED → restored → GREEN.
- **THE STASH-PROOF**: the round's source changes stashed alone → the
  suite returns to exactly 138/2726 → restored → the new count.
- **THE UPGRADE-PROOF** (this round's gate-proof): the e2e L-138c2 grid
  sentinel — "a future recharts upgrade that re-breaks the tick delivery
  REDs here" — passes on 3.10.1 live (the 9-line classic grid + the
  pie-label animation face).
- The six drift gates re-run in full (sweep desktop/phone/tablet/
  landscape + fullpage + the interior census) + the drawer battery +
  probe:ref — the render-identical claim rides the live evidence.

### WP-4 — the docs lockstep

The count ladder 2726 → 2726+N · SUITES 138 **HELD** · E2E 192 **HELD**
(the round adds no e2e — the standing 192 carries the sentinel) · badge
2918 → 2918+N (`count-ladder-176.py` + `skill-head-176.py`, assert-first,
idempotent, unique-anchor). The docs: the AGENTS Session-176 section ·
the PAD **ADR-021** (the chart-major migration doctrine: the parity prop
discipline + the render-identical evidence) + the stack-table recharts
row (2.15.4 → 3.10.1) + the session-176 inventory row · the CLAUDE chart
bullet · the README Tested row's migration mention + the badge · the
SKILL **v1.173.0** + H1 lockstep + the s176 head layer · `session_375.md`
+ this plan's execution record + the worklog entry (Task ID 176).

### WP-5 — the captures 441-444 (`docs/screenshots/`)

The chart-bearing faces — the migration's own evidence: the dashboard
(the revenue areas + the pipeline bars + the KPI sparks) at desktop ·
the reports Pipeline & Forecast tab (the aging grid the sentinel pins +
the forecast pie) at desktop · the drawer-open standing contract at
phone · the leads surface (the funnel + the pipeline bars) at phone.

## 2. The TDD ledger (to be filled at execution)

- RED birth: the WP-1 battery on the 2.15.4 tree (the version + lockfile
  + parity pins — the honest RED faces).
- GREEN: the migration lands; the full unit suite at the new count; the
  gate chain re-run (lint · tsc · build · smoke · e2e) — the build leg
  doubles as the 3.x TYPE gate (the s174 doctrine: a type seam that
  compiles GREEN into the artifact).
- The live parity ledger: the six drift gates + the drawer + probe:ref —
  the render-identical verdict, or the genus-named re-derivation.

---

## 3. The execution record (filled at ship)

- **WP-1 GREEN** — the s176 battery born RED on the 2.15.4 tree exactly
  as designed: 3 RED faces (the version floor · the lockfile resolution
  · the accessibilityLayer 9-site census) + 1 born-green (the e2e
  grid-sentinel existence freeze — the contract-freeze form, the s173
  P-p/P-q precedent).
- **WP-2 GREEN** — `bun add recharts@^3.10.1` (the manifest + lockfile
  via the package manager); the parity prop at all nine sites; the type
  seam closed at the boundary: the `tooltipFormatter` adapter (the
  `Formatter<ValueType, NameType>` contravariance — `Number()` the
  identity on the numeric aggregates) + the Pie label double-cast (the
  closed `PieLabelRenderProps` view vs the open-record runtime truth —
  recharts' own "we spread the data object" note licenses it); the
  L-138c1 comments re-anchored to the 3.x posture. The tsc census: 6
  errors at birth (5 Tooltip formatter sites + 1 Pie label) → 0.
- **WP-3 GREEN** — MUTATION-A (the planted version regression):
  exactly 1 RED. MUTATION-B (the parity prop removed from the TrendLine
  family): exactly 1 RED. THE STASH-PROOF: the round's five source
  files stashed alone → exactly 6 RED; restored → 138/2733 GREEN.
  THE UPGRADE-PROOF: the e2e L-138c2 grid sentinel passed live on
  3.10.1 (the 9-line classic grid).
- **THE LIVE COLLATERAL** (each root-caused, never guessed): the two
  e2e re-anchors (the funnel's tick-labels layer + the reset's
  zero-value elision face — the aliveness contract re-pinned); the two
  census-tool extensions (the signature-matched `recharts3-restructure`
  genus + the r3Boxes cascade, negatives pinned; the collector
  chart-interior exclusion — the walk42 glyph doctrine extended, the
  tablet phantom-+581 decode); the three doc-pin re-anchors (the PAD
  stack row · the facts-census installed row · the s140 funnel +
  reports-filter spark opening-tag forms).
- **WP-4 GREEN** — the count ladder 23 flips (2726 → 2733 · badge 2918
  → 2925, count-ladder-176.py, the re-run a verified 0-flip no-op) ·
  the F-106a1 layer-axis pin re-anchored · the SKILL v1.173.0 + the
  s176 head layer (skill-head-176.py, idempotent) · the AGENTS
  Session-176 section · the PAD ADR-021 + the inventory row + the
  stack-table row · the CLAUDE recharts bullet · the README Tested row
  + the badge · session_375.md · the worklog entry.
- **WP-5 GREEN** — the captures 441-444 landed; 441 + 442 VLM-verified
  (the dashboard's migrated surfaces; the aging-grid sentinel face with
  the y-ticks 0/2/4/6/8).
- **THE DRIFT-GATE LEDGER** — the six gates CLEAN at the migrated tree
  (the four sweeps within the standing floors · the fullpage docH
  byte-equal · the interior census at all four axes, zero unexplained):
  **the migration is render-identical — the predicted baseline
  re-derivation NOT needed, the standing baselines hold.**
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2733 · build
  (the type-gate artifact) · smoke 14/14 · e2e 192/192 · census MATCH ·
  probe:ref STABLE · the drawer battery GREEN.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
