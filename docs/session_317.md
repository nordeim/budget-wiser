# Session 317 — the session-149 record (the below-the-fold landing mirror)

## The intake

The workspace INTACT this round (the first no-reset round in a while)
— `git pull` brought the two new origin commits: `d532c56` (the
session_316 transcript + the skills bundle: the full-page-screenshot
skill with its G1–G6 quality gates + the replicate-web-app
v3/v4/v5/v5.1 references + the agent-browser rework) and `8a6b0e5`
(`neo-crm-homepage.png` — the 1920×4986 full-page capture of our
deployed landing, the skill's reference-run artifact). The intake
docs read: session_315 (the s148 transcript) · session_316 (the long
transcript) · the session_314 tail (the rotation candidates) · the
s148 plan · the worklog. The environment verified standing: the dev
server :3000 up · census MATCH 15/24/10/23/12 + 4 users · the
chromium ready.

## The audits

- **149-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **115/2153**
  · build · **e2e 152/152** (the first run, no flake).
- **149-b**: **probe:ref #123 STABLE** at the s147/s148 fingerprint
  (`index-n8TZHw0K.js` · `46bc2d9c…`) — no new parity event; the
  rotation executed on the owner's new signal. The drawer battery
  GREEN · census MATCH · the four viewport drift gates CLEAN ×4 ·
  sitemap 11 routes + robots + the SEO meta · the tree clean ·
  `.env` untracked (the `.env.example` verified matching) · zero
  dep changes.

## The walk (walk39 — the full-page capture axis, 11 probe passes)

The owner's new skill closed the axis the four viewport sweeps
structurally cannot see: the landing full-page at 1920×1080 +
390×844 on BOTH apps, following the skill's phases
(viewport-before-navigation · the load gate · the lazy-content
scroll pass · the return-to-top settle · the fullPage capture).

- **THE HEIGHT DELTA IS ALL #pricing**: ref 4990 vs ours 4986
  (desktop) · 7259 vs 7207 (phone); #hero/#features/#preview/#faq/
  footer tops + heights IDENTICAL on both classes.
- **F-149c1 THE REPRICED TIERS**: the reference's prices are
  **$8 / $14 / $20** — ours carried the stale s142 marketing-build
  census **$9 / $19 / $39**. The phone glyph bands (x=68–101
  "$8"/"$9" · x=92–114 "$14"/"$19" · x=68–114 "$20"/"$39") + the
  desktop price-row bands y=3560–3622 decoded it exactly.
- **F-149c2 THE ADVANCED CARD'S SIXTH LI**: "Data tools, templates
  and guarded reset" (h=40, the wrapped LAST row; ours had 5). The
  reflow moved the Advanced CTA (phone ours 5973 vs ref 6025); the
  desktop grid +4px (ref's tallest = the 6-li Advanced at 458 vs
  ours' Standard/Pro 454).
- **F-149c3 THE PREVIEW ROWS' ≥sm LEADING GENUS**: identical text,
  but our p's (`mt-3 text-sm sm:text-base … leading-relaxed`)
  COMPUTE leading-relaxed at ≥sm (26px) while the reference's
  leading utilities are inert at ≥sm in its build (24px = the
  text-base pairing) — the SAME genus the s148 hero fix pinned; the
  phone stays byte-equal (leading-relaxed ACTIVE at <sm on both).
  The mirror: `sm:leading-6`.
- **THE PLATFORM PILL (standing genus, NOT mirrored)**: the "Edit
  with Base 44" pill — bottom-right fixed chrome that renders for
  GUEST sessions only (the logged-in sweeps measured landing 0.00
  through s146–s148; the walk39 fresh-context captures exposed it at
  desktop y=1023–1079 + phone y=787–843, ~0.09%/0.31% of the
  frames). The L-149c2 lesson.
- **THE CORRECTED-DIFF VALIDATION**: shifting ours +4px/+52px below
  the pricing anchors collapsed EVERYTHING below pricing to zero —
  the FAQ/footer bands were pure shift artifacts; the decode closed.
  Pre-fix full-page diff: **0.901% desktop · 2.455% phone** (the
  pill 0.092/0.310 + the content 0.809/2.146).

## The remediation (TDD — RED first)

- **D-149a1/a2 THE LANDING MIRROR**: the `PRICING` prices →
  $8/$14/$20 + the Advanced sixth feature (the live order) + the
  preview p's `sm:leading-6` (the computed-equal pin; phone keeps
  the working leading-relaxed).
- **D-149a3 THE FULLPAGE-SWEEP TOOL**: `scripts/fullpage-sweep.ts`
  — the FIFTH gate, wired into `gate:full` (`bun run sweep:fullpage
  -- --fail-on-drift`); guest contexts (the landing is public — no
  login, no storageState); the landing pair at 1920×1080 + 390×844;
  the pad-then-diff for unequal heights (the PURE `padTo` seam +
  the browser canvas twin, the no-bundling doctrine; the browser
  twin and the PIL cross-check agreed at 0.144/0.487);
  `STANDING_FULLPAGE_BASELINES` {desktop 0.14 · phone 0.49} absorb
  the pill genus + the raster floor; `--fail-on-drift` at the
  standing 0.5pct margin.
- **D-149a4 THE PIN LEDGER**: 16 RED at birth (the 5 landing flips/
  describes + the 11 tool pins) → GREEN; the e2e pricing test
  flipped ($8/$14/$20 + the 6th li visible); the s97 gate-script
  composite re-anchored to the FIVE-gate chain (the expected blast
  radius); the docs-counts layer-axis flipped to the s149 head;
  the SKILL v1.146.0 + the H1 lockstep.
- **D-149a5 THE VERIFICATION**: lint 0/0 · tsc 0 · **116/2167**
  (+14) · build · **e2e 152/152** (the definitive re-run after the
  known settings-Defaults flake passed in isolation — the s146
  pattern) · the four viewport gates CLEAN ×4 (see the dev-indicator
  decode below) · **the fullpage gate CLEAN** at EQUAL heights
  (4990/7259 — the +4/+52 fully recovered): 0.144%/0.487% maiden,
  0.093%/0.316% final (the pill's own run-to-run size variance —
  h=46 one run, 57 the next — validates the baseline+margin
  absorption design over a position mask) · the VLM battery 2/2
  (the pricing pair PASS — the prices + the Data-tools row + the
  CTAs; the preview pair PASS — the three rows, the s148 flip
  preserved, the line-heights equal).
- **THE DEV-INDICATOR DECODE** (the sweep-order lesson): the
  verification-phase phone gate tripped landing **1.49%** — OUR
  side's Next.js dev-server **"1 Issue" pill** (bottom-left dev
  chrome), a per-process CUMULATIVE issue counter fed by the e2e
  error-path tests (the lockout/400 probes) that ran between the
  audit-phase gates and the verification gates; the fresh dev server
  reproduces 0.00. The gates run before e2e (the house order) or
  after a dev-server restart.

## The ship

The captures 335–340 (the pricing pair · the preview-leading pair ·
the full-page landing pair). The count ladder re-anchored
(2153→2167 · SUITES 115→116 · e2e 152 · badge 2305→2319) · the
SKILL v1.146.0 + the session-149 layer · the AGENTS Session-149
section · the PAD row · this record + the plan execution record +
the worklog. The two-commit pattern (the feat + the session log)
pushed to git@github.com:nordeim/neo-crm.git main via the SSH
wrapper (the paramiko shim; the dry-run then the real push;
remote-verified; the key shredded).

**Next**: the standing genera left are the settings picklist-DATA
genus (volatile workspace data — not for mirroring), the login logo
genus, the s95 landscape accounts overflow genus — now joined by
the fullpage pill genus (documented in the tool's
STANDING_EXPLAINED). The rotation candidates: the settings picklist
family's phone state, or the standing-defects ledger's remaining
entries re-verified live — plus the full-page axis extended to the
OTHER long-scroll surfaces if any grow (the landing is the only
public long-scroll page today).
