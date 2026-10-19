# Session 321 — the session-151 record (the internal-scroller census + the dashboard card-header mirror)

## The intake

The workspace RESET (the sandbox re-provisioned — the clone absent) —
re-cloned at `0f81b55` (the s150 feat `4fdeac2` + the session_319 log
`27163e5` + the owner's `0f81b55` = the session_320 transcript + the
skill-creator bundle). The environment re-stood: `bun install` (533
pkgs) · `.env` from `.env.example` (`DATABASE_URL="file:../db/custom.db"`
— the root contract; `AUTH_SECRET` generated) · `db:push` + `db:seed` ·
census MATCH (15/24/10/23/12 + 4 users) · the Playwright chromium ·
the dev server :3000. **The s150-ship verified complete on arrival**
— the resumption summary's "remaining" items (session_319, the plan
record, the worklog record, the ship) all present in the repo at the
clone base; this round proceeded as the NEXT cycle (session-151) on
the user's standing pipeline request.

## The audits

- **151-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **117/2173**
  · build · **e2e 153/153** (first run, no flake) — the EXACT s150-ship
  match.
- **151-b**: **probe:ref #125 STABLE** at the s147/s148/s149/s150
  fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576) · the
  drawer battery GREEN (the mobile-nav working contract — the user's
  standing particular-attention item: the focus-entry, the
  nav-close unlock, ESC, reopen-before-grow, resize-past-md) · **the
  five drift gates CLEAN ×5** (the four viewport classes + the
  fullpage gate at the exact s150-ship values 0.093%/0.316% at equal
  heights 4990/7259) · sitemap 11 routes + robots + the SEO meta ·
  the test configs (vitest + playwright) in place · the tree clean ·
  zero dep changes.

## The walk (walk41 — the internal-scroller full-geometry census, 9 pages + the login re-decode)

The session_319 rotation candidates, my judgment: **(c) the
internal-scroller axis extended to the app pages' phone interiors**
(the primary — the L-150c1 lesson's natural extension) + **(a) the
login-logo genus re-decoded live** (the secondary). A throwaway probe
(`walk41-probe.ts` at the workspace root — the s150 scratch idiom):
both apps logged in at 390x844, ours at the matched ZERO-DATA state
(`scripts/zero-data.ts` — users + the settings singleton kept), every
element inside `main` censused (content-relative top/left, w, h, tag,
class, leaf-text), decoded with a greedy resync-alignment classifier
(OURS-EXTRA / REF-EXTRA / SHIFT / cls-only / text-only — no
index-cascade noise).

- **PASS 1 THE CENSUS**: the frame contract holds on all 9 app pages
  (doc 390x844 both apps) · **mainH byte-equal on 7/9** — dashboard
  ours +16 (decoded: PASS 2), settings ours +86 (the standing
  picklist-DATA genus, re-confirmed: both sides render the identical
  view-state row template — the 62px spacing, the 36px pencil/trash
  buttons, the add-row construction). The count deltas ALL
  attributed: ours' `chart-no-outline` wrappers (2+3+4 across
  dashboard/leads/reports — the pinned focus-suppression
  construction), the `p-6 px-0` table wrappers (our s95 min-w-0 fix —
  the reference's bare flex-1 cards poke to w=472 inside the 358
  container at phone too: its own standing defect, now decoded on
  this axis), the settings DATA rows.
- **PASS 1b THE GENERA**: **the lucide DOM-composition genus** — our
  lucide-react 0.525 renders path-normalized icon children
  (`[path,path,path]`) where the reference's version renders mixed
  element sets in another order (`[path,polyline,line]` + circle
  members) — bounding-box-equal on every carrier, every page,
  absorbed by the pixel floor · **the recharts-internal genus** — the
  3px y-axis top/height shift (1832/267 vs 1829/270) + the zero-data
  gridline tick drift — recharts version drift below the fold · the
  token-vocabulary mirrors + the v3-compat class-order + the
  space-y-hazard equivalences — all geometry-equal (the walk's own
  `md:text-sm` truncation false-alarm resolved live: the reference
  carries it later in the string).
- **PASS 2 F-151c1 — THE DASHBOARD'S TWO STALE "+ Add" GHOST BUTTONS**
  (the ONE real defect): our Lead Sources + Upcoming Activities
  CardHeaders carried the **s7-era S7-18 extraction** (75x32 ghost
  `h-8 px-3 text-xs text-primary` + the `mr-1` Plus) that the CURRENT
  reference bundle does NOT render — its headers are **title-only
  (rowH 24 @390 · 28 @1440)**, live-decoded on both apps at both
  widths (the L-148c1 discipline; a second focused probe on the card
  headers). The count math: ours' dashboard +10 elements = exactly
  2 Add subtrees (Button+svg+2 paths each) + 2 chart wrappers. **The
  143-session dead zone**: the buttons sat at y≈905+ at desktop
  (below the 900px sweep fold) and y≈2356+ at phone (inside the
  internal scroller, below the 844 fold) — structurally invisible to
  all five standing gates; only the full-geometry census sees them
  (the +16px mainH = exactly the two 8px row differences). The
  ellipsis pair (Top Reps + Recent Deals headers) + the Recent Deals
  per-row ghost SURVIVE — the reference renders all three.
- **PASS 3 THE LOGIN-LOGO GENUS RE-DECODE** (the candidate closed):
  the reference's /login carries an **80x80 (@390) / 96x96 (@1440)
  hotlinked logo IMG** (`aspect-square h-full w-full object-cover`,
  now a **supabase storage-render URL** — the asset moved from the
  earlier screenshot note) at the page top (top=105/233) + the two
  bottom badge images (the platform pill, guest-only); ours draws the
  **20x20 svg brand-mark in-card**. The genus STABLE; the
  constant-absolute claim holds (the responsive 80/96 size decoded);
  NOT mirrored (the owner's own logo asset).

**ONE REAL PARITY DEFECT** (F-151c1) + two genera documented + the
login genus refreshed.

## The remediation (TDD — the pin ledger)

- **D-151a1 `tests/dashboard-interior-parity.test.ts` (NEW, +4 its)**:
  the zero-wiring census (no `quickCreate`, no `<Plus`, no
  dialog mounts, no addBtn consumers) · the ellipsis-family census
  (exactly 3 "More actions" source sites; 2 on the frozen constant, 1
  literal row ghost) · the `DASHBOARD_CARD` object-shape freeze
  (`[ellipsisBtn, headerRow]` only) · the dead-constants negatives.
  **3 RED at birth → the implementation → GREEN**; the born-green
  census guards the surviving family. The mutation-proof ×2: the
  replanted button → exactly 1 RED; the replanted constants → exactly
  2 RED — the pins independent; both reverted → GREEN.
- **D-151a2 the source remediation**: the two Add buttons retired (the
  F-151c1 comments carried in place) · the `quickCreate` type/state +
  the two dialog mounts + the `Plus` + entity-dialog imports retired
  (the dialogs stay reachable on the Leads/Activities pages) ·
  `DASHBOARD_CARD.addBtn`/`addIcon` retired + the block comment
  re-anchored (page-layout.ts).
- **D-151a3 the legacy pin flips** (the s148 pattern): page-layout's
  DASHBOARD_CARD it (the addBtn/addIcon asserts retire; the
  ellipsis-only assert re-anchored) · dashboard-kpi-parity's
  quick-create it (the ZERO vocabulary; the s142 icon negatives stay)
  · e2e crm.spec 3035 flipped in place (the title-only decode + the
  live rowH 24/24/32 + zero Add buttons). Two mid-flight decodes: the
  nav-trigger haspopup false-positive (the s47 Radix Sheet idiom
  carries `aria-haspopup="dialog"` — the assertion re-narrowed to
  the s142 haspopup+Add form) + the Recent Deals strict-mode (the
  seeded rows carry their own per-row ghosts — `.first()` resolves
  to the CardHeader ghost).
- **D-151a4 the count ladder**: UNIT 2173 → **2177** (+4) · SUITES
  117 → **118** · badge 2326 → **2330** · the 12 RED lockstep sites
  flipped atomically (README ×4 · AGENTS ×2 · PAD ×5 · SKILL ×2) ·
  the page-layout.ts module census HELD at 1687 (the retired members
  offset by the re-anchored comment — the pins untouched) · the
  CLAUDE-carrier pins flipped (dialog-geometry ×4, the 2173 forms
  joining the negatives) · the SKILL **v1.148.0** + the s151 head
  (the s150 layer demoted beneath) + the Appendix B totals + the
  wall-clock phrase.

## The verification

lint 0/0 · tsc 0 · **118/2177** · build · **e2e 153/153** (the
definitive run) · **the five drift gates CLEAN ×5** (the
fresh-dev-server house order; the dashboard floor UNCHANGED — the
buttons lived below every fold; the fullpage at the exact standing
values) · census MATCH · **the VLM battery 2/2** (the phone pair —
the fix zone title-only on both apps, the framing artifacts decoded:
our Top Reps card sits above the phone frame [its ellipsis
live-asserted by the passing e2e], the zero-data column-width
artifact on the reference's empty table; the desktop pair — a FULL
structural match: both card headers title-only, both ellipsis
buttons on the same cards, zero structural differences). The
captures 345-348 (the dashboard phone + desktop pairs at the fix
zone, scrolled to the card headers).

## The ship

The docs realignment (the AGENTS Session-151 section · the PAD
session-151 row · this record + the plan execution record + the
worklog Task ID 151). The two-commit pattern (the feat + the session
log) pushed to git@github.com:nordeim/neo-crm.git main via the SSH
wrapper (the paramiko shim; the dry-run then the real push;
remote-verified; the key shredded).

**Next**: the standing genera left are the settings picklist-DATA
genus (the LIVE-intraday documentation + the ref-vs-ref adjudication
idiom), the login logo genus (re-decoded this round — stable), the
s95 landscape/phone accounts overflow genus (its phone face now
decoded), the fullpage pill genus, + the two library-drift genera
decoded this round (the lucide DOM-composition genus + the
recharts-internal genus — both below-fold, both documented, not
mirrorable without vendoring). The rotation candidates: the
internal-scroller census as a STANDING TOOL (the walk41 throwaway
promoted into a repo script — the geometry census wired as a sixth
gate or a periodic probe, the L-151c2 lesson's structural cure), or
the second-cycle re-walk of the earliest marketing-family members
(the s142 landing census is 9 sessions old), or the settings
picklist-DATA genus's intraday rhythm mapped (a morning/afternoon
double capture).
