# The session-149 plan — the below-the-fold landing mirror (the 149-c rotation) + the full-page capture axis

Date: 2026-10-19 · Rotation: 149-c · probe:ref #123 STABLE at the
s147/s148 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…`) — no new
bundle event; the round's direction comes from the OWNER'S NEW
SIGNAL: the `skills/full-page-screenshot` bundle (the quality-gated
G1–G6 methodology, the 9-phase capture) + `neo-crm-homepage.png` at
the repo root (the 1920×4986 full-page capture of our deployed landing
— the skill's reference-run artifact, committed by `8a6b0e5`).

## The intake

The workspace INTACT this round (no reset) — `git pull` brought the
two new origin commits: `d532c56` (session_316 + the skills bundle)
and `8a6b0e5` (the homepage PNG). Inputs read: `session_315.md` (the
s148 transcript) · `session_316.md` (the long transcript) · the
session_314 tail (the rotation candidates: the settings picklist
phone state / the standing-defects ledger) · the s148 plan · the
worklog. Environment verified standing: dev server :3000 · census
MATCH · chromium ready.

## The audits (149-a / 149-b)

- **149-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **115/2153**
  · build · **e2e 152/152** (first run, no flake).
- **149-b**: probe:ref #123 STABLE · the drawer battery GREEN ·
  census MATCH · the four viewport drift gates CLEAN ×4 · sitemap 11
  routes + robots + the SEO meta · the tree clean · `.env` untracked
  · zero dep changes.

## The walk (walk39 — the full-page capture axis, the below-the-fold blind spot)

The four viewport sweeps structurally CANNOT see below y≈900 — the
landing's preview/pricing/FAQ/footer sections have NEVER been
pixel-compared end-to-end. walk39 follows the owner's new skill
methodology (viewport-before-navigation · lazy-content scroll pass ·
return-to-top settle · fullPage capture) on BOTH apps at 1920 + 390:

- **THE HEIGHT DELTA IS ALL PRICING**: ref 4990 vs ours 4986
  (desktop) · 7259 vs 7207 (phone); every other section byte-equal
  (#hero/#features/#preview/#faq/footer tops + heights IDENTICAL) —
  ref #pricing h=862 vs ours 858 (desktop) · 1758 vs 1706 (phone).
- **F-149c1 THE PRICES CHANGED** (stale since the s142 marketing
  build): ref **$8 / $14 / $20** vs our **$9 / $19 / $39** — the
  phone glyph bands at x=68–101 ("$8"/"$9"), x=92–114 ("$14"/"$19"),
  x=68–114 ("$20"/"$39") + the desktop price-row bands y=3560–3622.
- **F-149c2 THE ADVANCED CARD'S 6th LI**: ref's Advanced features
  carry a sixth row — `"Data tools, templates and guarded reset"`
  (h=40 wrapped, the LAST li; ours has 5). The card reflow moves the
  Advanced CTA (ours 5973 vs ref 6025 at phone) — the desktop grid
  +4px (ref's tallest card = the 6-li Advanced at 458 vs ours' 5-li
  Standard/Pro at 454).
- **F-149c3 THE PREVIEW-ROWS' LEADING GENUS**: identical text, but
  our preview p's (`mt-3 text-sm sm:text-base … leading-relaxed`)
  COMPUTE leading-relaxed at ≥sm (26px lines) while the reference's
  leading utilities are inert at ≥sm in its build (24px = the
  text-base pairing) — the SAME genus the s148 hero fix pinned
  (`sm:leading-none` + `sm:leading-[28px]`); the phone stays
  byte-equal (leading-relaxed ACTIVE at <sm on both apps). The
  mirror: `sm:leading-6` on the preview p. The desktop bands
  y=2207–2292 / 2562–2646 / 2902–3009 = the three rows' text
  columns (the h3 center-offsets +2/+3px are the taller-text-col
  centering side effect, not an independent decode).
- **THE PLATFORM PILL (standing genus, NOT for mirroring)**: the
  "Edit with Base 44" pill — bottom-right fixed chrome, renders for
  GUEST sessions only (the logged-in sweeps measured landing 0.00
  through s146–s148; walk39's fresh-context captures show the
  46px/mag-2940 band at desktop y=1025–1070 + phone y=789–834,
  x=177–373/1707–1903). Same genus class as the login-logo entry.
- **THE CORRECTED-DIFF VALIDATION** (shift ours +4px/+52px below the
  pricing anchors): EVERYTHING below pricing collapses to zero — the
  FAQ + footer diffs were pure shift artifacts; the decode is
  complete and closed.

Pre-fix full-page diff (the TDD RED values): **desktop 0.901%**
(pill 0.092% + content 0.809%) · **phone 2.455%** (pill 0.310% +
content 2.146%).

## The remediation (TDD — RED first)

- **D-149a1 THE PRICING LITERAL**: `PRICING` prices → $8/$14/$20 +
  the Advanced features append `"Data tools, templates and guarded
  reset"` (after "Default values and preferences", the live order).
- **D-149a2 THE PREVIEW-P LEADING PIN**: the preview row p gains
  `sm:leading-6` (the computed-equal mirror of the reference's
  24px; phone keeps the working leading-relaxed).
- **D-149a3 THE FULLPAGE-SWEEP TOOL**: `scripts/fullpage-sweep.ts` —
  imports the sweep's PURE `diffPixels`/`clusterDiff` seams; guest
  contexts (no login — the landing is public); both widths
  (1920×1080 + 390×844); the pad-then-diff for unequal heights (the
  PURE `padTo` seam + the browser canvas twin, the no-bundling
  doctrine); `STANDING_FULLPAGE_BASELINES` (desktop/phone) anchored
  from the post-fix maiden run (pill + floor); `--fail-on-drift` at
  baseline + 0.5pct; `bun run sweep:fullpage`; wired into
  `gate:full` as the FIFTH gate.
- **D-149a4 THE PIN LEDGER**: the s142 price pins FLIPPED ($8/$14/$20)
  + the 6th li added to the feature-list pin + the new session-149
  describe (the prices + the li + the sm:leading-6 class pin) + the
  e2e pricing test flipped (+ the 6th li visible assertion) + the
  fullpage tool pins (the wiring + the pure padTo seam + the guest
  doctrine + the baselines).
- **D-149a5 THE VERIFICATION**: full unit + build + e2e + the four
  viewport gates re-run (the fixes are below-fold — the sweeps stay
  CLEAN ×4) + the fullpage gate maiden run (RED 0.901/2.455 → the
  post-fix floor) + the live two-app full-page re-capture (the
  residual = the pill only) + the VLM battery (the pricing pair +
  the preview text pair).
- **D-149a6 THE DOCS + THE SHIP**: the count ladder (unit +N · e2e
  152 unchanged) · SKILL v1.146.0 + the session-149 layer · the
  AGENTS Session-149 section · the PAD row · `session_317.md` ·
  this plan's execution record · the worklog · the two-commit ship
  via the SSH wrapper.

## The lessons

- **L-149c1 the below-the-fold blind spot**: three real decodes (the
  prices, the 6th li, the preview leading) accumulated across
  s142–s148 INVISIBLE to every standing gate — the viewport sweeps
  clip at their height; the targeted section captures verify only
  what a round already suspects. The owner's full-page skill closes
  the axis; the fullpage gate makes it standing.
- **L-149c2 the guest-vs-logged-in chrome**: the platform pill
  renders ONLY for guest sessions — the sweeps' logged-in captures
  never saw it; the fullpage gate runs guest-context and documents
  the pill as a standing genus (the same treatment as the login
  logo).

## The execution record (filled at ship)

- [x] walk39 full-page captures + band decode (11 probe passes: the
      capture pair, the band census, the section geometry, the
      pricing interior ×2, the x-histograms ×2, the text columns,
      the price rows, the anchors, the corrected-diff validation)
- [x] the pricing/preview/pill decodes validated by the
      corrected-diff (everything below pricing = pure shift)
- [x] D-149a1/a2 source fixes · D-149a4 pin flips + new pins (16 RED
      at birth → GREEN; the s97 gate-script composite + the
      docs-counts layer-axis + the 4 CLAUDE carriers re-anchored)
- [x] D-149a3 the fullpage-sweep tool + the gate:full wiring (the
      FIFTH gate; STANDING_FULLPAGE_BASELINES {0.14/0.49} anchored
      from the maiden; the browser twin == the PIL cross-check)
- [x] D-149a5 the verification chain: lint 0/0 · tsc 0 · 116/2167
      (+14) · build · e2e 152/152 (the definitive re-run after the
      known settings-Defaults flake passed in isolation) · the four
      viewport gates CLEAN ×4 · the fullpage gate CLEAN at EQUAL
      heights (4990/7259): maiden 0.144%/0.487% · final
      0.093%/0.316% (the pill's run-to-run size variance validates
      the baseline+margin design) · the VLM battery 2/2
- [x] the DEV-INDICATOR DECODE: the verification-phase phone gate's
      landing 1.49% was OUR dev-server "1 Issue" pill (a per-process
      cumulative counter fed by the e2e error-path tests) — the
      fresh dev server reproduces 0.00; the gates run before e2e
      or after a restart
- [x] D-149a6 docs (the count ladder 2167/116/152/2319 · SKILL
      v1.146.0 + the session-149 layer · the AGENTS section · the
      PAD row · session_317) + the captures 335-340 + the ship
