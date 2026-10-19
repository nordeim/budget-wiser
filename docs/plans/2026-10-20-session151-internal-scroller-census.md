# The session-151 plan — the internal-scroller census (the 151-c rotation) + the dashboard card-header mirror

Date: 2026-10-20 · Rotation: 151-c · probe:ref #125 STABLE at the
s147/s148/s149/s150 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` ·
1,699,576) — no new bundle event; the round's direction (my judgment on
the session_319 rotation candidates): **(c) the internal-scroller axis
extended to the app pages' phone interiors** as the primary walk (the
L-150c1 lesson's natural extension — the surfaces the DOM walks covered
at the family level but never in one uniform sweep) + **(a) the login
logo genus re-decoded live** as the secondary probe (its
constant-absolute-px claim re-derived against the current build).

## The intake

The workspace RESET (the sandbox re-provisioned — the neo-crm clone
absent); re-cloned at `0f81b55` (the s150 feat `4fdeac2` + the
session_319 log `27163e5` + the owner's `0f81b55` = the session_320
transcript + the skill-creator bundle). The environment re-stood:
`bun install` (533 pkgs) · `.env` from `.env.example`
(`DATABASE_URL="file:../db/custom.db"` — the root contract;
`AUTH_SECRET` generated) · `db:push` + `db:seed` · census MATCH
(15/24/10/23/12 + 4 users) · the Playwright chromium · the dev server
:3000.

## The audits (151-a / 151-b)

- **151-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **117/2173**
  · build · **e2e 153/153** (first run, no flake) — the EXACT s150-ship
  match.
- **151-b**: probe:ref **#125 STABLE** · the drawer battery GREEN (the
  mobile-nav working contract: focus→Close, the nav-close unlock, ESC,
  reopen-before-grow, resize-past-md — the user's standing
  particular-attention item) · **the five drift gates CLEAN ×5** (the
  four viewport classes + the fullpage gate at the exact s150-ship
  values 0.093%/0.316% at equal heights 4990/7259, run on the
  fresh-dev-server house order) · sitemap 11 routes + robots + the SEO
  meta · the test configs (vitest + playwright) in place · the tree
  clean · `.env` untracked with the root-contract `db/` · zero dep
  changes (bun.lock untouched since s62).

## The walk (walk41 — the internal-scroller full-geometry census, 9 pages + the login re-decode)

- **PASS 1 THE CENSUS** (both apps logged in at 390x844, our side at
  the matched ZERO-DATA state; every element inside `main` censused —
  content-relative top/left, w, h, tag, class, leaf-text; a greedy
  resync-alignment decoder classifying OURS-EXTRA / REF-EXTRA / SHIFT /
  cls-only / text-only): the frame contract holds on all 9 pages
  (doc 390x844 both apps) · **mainH byte-equal on 7/9** — dashboard
  ours +16 (decoded: PASS 2), settings ours +86 (the standing
  picklist-DATA genus, re-confirmed: both sides render the identical
  view-state row template — the 62px spacing, the 36px pencil/trash
  row buttons, the add-row construction) · the count deltas all
  attributed: ours' chart-no-outline wrappers (2+3+4 across
  dashboard/leads/reports — the pinned focus-suppression construction),
  the p-6 px-0 table wrappers (our s95 min-w-0 fix; the reference's
  bare flex-1 poke-out w=472 inside the 358 container — its own
  standing defect genus, now decoded at PHONE too), the lucide
  DOM-composition genus (below), the settings DATA rows.
- **PASS 1b THE GENERA DECODED** (documented, not defects): **the
  lucide DOM-composition genus** — our lucide-react 0.525 renders
  path-normalized icon children in one order (`[path,path,path]`),
  the reference's version renders mixed element sets in another
  (`[path,polyline,line]` + circle members) — bounding-box-equal on
  every carrier, absorbed by the pixel floor, present on every page ·
  **the recharts-internal genus** — our stock-default chart internals
  compute a 3px y-axis top/height shift (1832/267 vs 1829/270) and
  different zero-data gridline tick positions — recharts version
  drift below the fold, invisible to every standing gate · the
  token-vocabulary mirrors + the v3-compat class-order + the
  space-y-hazard equivalences: all geometry-equal (the truncation
  false-alarm on `md:text-sm` resolved — the reference carries it
  later in the string).
- **PASS 2 F-151c1 — THE DASHBOARD'S TWO STALE "+ Add" GHOST
  BUTTONS** (the real defect): our Lead Sources + Upcoming Activities
  card headers carry the s7-era ghost Add buttons (`h-8 px-3 text-xs
  text-primary` + the `mr-1` Plus — the S7-18 extraction, 143
  sessions old) that the CURRENT reference bundle (stable since s147,
  verified #125) does NOT render — its headers are title-only
  (**rowH 24 @390 · 28 @1440** vs ours' rowH 32 with the 75x32
  buttons at BOTH widths; live-decoded on both apps at both widths —
  the L-148c1 discipline). The count math: ours' dashboard +10
  elements = exactly 2 Add subtrees (Button+svg+2 paths each) + 2
  chart wrappers. **The 143-session dead zone**: the buttons sit at
  y≈905+ at desktop (below the 900px sweep fold) and y≈2356+ at phone
  (inside the internal scroller, below the 844 fold) — structurally
  invisible to all five standing gates; only the full-geometry census
  sees them. The +16px mainH delta = exactly the two 8px row
  differences.
- **PASS 3 THE LOGIN-LOGO GENUS RE-DECODE** (the rotation candidate
  closed): the reference's /login carries an **80x80 (@390) / 96x96
  (@1440) hotlinked logo IMG** (`aspect-square h-full w-full
  object-cover`, now a **supabase storage-render URL** — the asset
  moved from the earlier screenshot note) at top=105/233 above the
  card, + the two bottom badge images (the platform pill, guest-only);
  ours draws the **20x20 svg brand-mark in-card** (top=310/482). The
  genus is STABLE and the constant-absolute claim holds; the decode
  refreshed (the responsive 80/96 size, the asset URL). NOT mirrored —
  the owner's own logo asset.

**ONE REAL PARITY DEFECT** (F-151c1) + the two genera documented.

## The remediation (TDD — the pin ledger)

- **D-151a1** `tests/dashboard-interior-parity.test.ts` (NEW, +4 its):
  the card-header button census (the dashboard's CardHeader Button
  vocabulary = the ellipsis pair ONLY — Top Performing Sales Reps +
  Recent Deals) · the quickCreate zero-wiring (no `setQuickCreate`, no
  LeadDialog/ActivityDialog in the dashboard page) · the DASHBOARD_CARD
  object-shape freeze (no `addBtn`/`addIcon` members; `headerRow` +
  `ellipsisBtn` remain) · the retired-constants negatives (the
  `h-8 px-3 text-xs text-primary` + `h-4 w-4 mr-1` strings absent from
  page-layout.ts). **RED at birth** against the current source → the
  implementation → GREEN; the mutation-proof ×1 (replant the Add
  button → RED; revert → GREEN).
- **D-151a2 the source remediation**: remove the two Add Buttons (the
  Lead Sources + Upcoming Activities CardHeaders) · remove the
  QuickCreate type + state + the two dialog mounts + the `Plus` +
  entity-dialog imports (dashboard/page.tsx) · retire
  `DASHBOARD_CARD.addBtn`/`addIcon` + re-anchor the block comment
  (page-layout.ts).
- **D-151a3 the legacy pin flips** (the s148 pattern): page-layout.test
  (the DASHBOARD_CARD it → the ellipsis-only assert) ·
  dashboard-kpi-parity (the quick-create it → the ZERO vocabulary: no
  setQuickCreate sites, no dialog mounts; the retired-icon negatives
  stay) · e2e crm.spec 3035 (→ "the dashboard card headers are
  title-only where the reference is title-only": the live rowH 24
  decode at 390 + zero Add buttons + the ellipsis pair intact — F-151c1
  replacing the S73-P7d/S7-18 attributions).
- **D-151a4 the docs-counts ladder**: the page-layout.ts module census
  (1687 → the live count) + the page-layout.test checks + UNIT/E2E
  ladder + badge + the layer-axis flip to the s151 head + SKILL
  v1.147.0 → v1.148.0 (the s151 layer + Appendix B) + the README/
  CLAUDE/PAD carriers (the lockstep sites enumerated by the
  docs-counts run itself).
- **D-151a5 the captures 345-348** (the dashboard phone + desktop
  ours-vs-ref pairs at the fix zone) + the VLM battery on the pairs.
- **D-151a6 the verification chain**: lint 0/0 · tsc 0 · unit (the new
  ladder) · build · e2e 153/153 · the five drift gates CLEAN ×5 (the
  fresh-dev-server house order; the dashboard floor expected unchanged
  — the buttons lived below every fold) · census MATCH + the two-commit
  ship via the SSH wrapper.

## The lessons (recorded at ship)

- **L-151c1 the bundle-stale pin**: a source pin extracted against an
  old reference bundle (the s7 S7-18 extraction) can outlive the
  bundle that justified it through TWO parity events (s142's header
  retirements were re-derived; the card-header zone was not) — the
  cure is the internal-scroller census: after any bundle event, the
  below-fold interiors' construction pins must be re-derived live, and
  the full-geometry census is the standing probe that flags them.
- **L-151c2 the dead zone is structural**: below-every-fold (below the
  phone 844, below the desktop 900, inside the internal scroller) is
  invisible to ALL five standing gates by construction — the sweeps
  clip at the viewport; the fullpage gate sees only public long-scroll
  documents. The dashboard's card headers lived there for 143
  sessions; the geometry census is the only instrument that sees the
  zone, and it must stay a standing rotation axis.

## The execution record (filled at ship)

- [x] PASS 1/1b/2/3 probes run + decoded (the census: the frame
      contract on all 9, mainH byte-equal 7/9, the deltas attributed;
      F-151c1 live-decoded on both apps at 390 + 1440 — title-only
      headers on the reference; the login genus re-decode: the
      supabase storage-render IMG at 80/96 responsive + the two badge
      images)
- [x] D-151a1 the dashboard-interior-parity file (+4 its — 3 RED at
      birth → GREEN with the implementation; the born-green census
      guards the ellipsis family) + the mutation-proof ×2 (the
      replanted button → exactly 1 RED; the replanted constants →
      exactly 2 RED — the pins independent; both reverted → GREEN)
- [x] D-151a2 the source remediation (the 2 buttons + the quickCreate
      state/type/mounts + the Plus + entity-dialog imports + the
      DASHBOARD_CARD.addBtn/addIcon members; the block comment
      re-anchored)
- [x] D-151a3 the legacy pin flips (page-layout's DASHBOARD_CARD it →
      the ellipsis-only; kpi-parity's quick-create it → the ZERO
      vocabulary; e2e crm 3035 → the title-only decode + the live rowH
      24/24/32 — with the nav-trigger haspopup false-positive decoded
      mid-flight: the s47 Radix Sheet idiom re-narrowed to the s142
      haspopup+Add form; the Recent Deals strict-mode resolved with
      .first() — the seeded rows carry their own ghosts)
- [x] D-151a4 the docs-counts ladder (UNIT 2177 · SUITES 118 · badge
      2330; the 12 RED lockstep sites flipped atomically; the
      page-layout.ts census HELD at 1687; the CLAUDE-carrier pins
      dialog-geometry ×4) + the SKILL v1.148.0 + the s151 head (the
      s150 layer demoted beneath)
- [x] D-151a5 the captures 345-348 (the dashboard phone + desktop
      pairs at the fix zone) + the VLM battery 2/2 (the phone pair —
      the fix zone title-only both apps; the desktop pair — a FULL
      structural match)
- [x] D-151a6 the verification chain (lint 0/0 · tsc 0 · 118/2177 ·
      build · e2e 153/153 · the five drift gates CLEAN ×5 — the
      fullpage at the exact standing values · census MATCH) + the
      two-commit ship via the SSH wrapper
