# Session 304 — the session-143 record (the landing family walk)

## The intake

The workspace pulled to `35e958a` (the s142 ship `780fe05` + `fe3a59d` + the
session_303 transcript commit — the continuation session's own log). The
environment standing (node_modules, `.env` with
DATABASE_URL="file:../db/custom.db", census MATCH 15/24/10/23/12 + 4
users). The four intake docs read (session_302 + the s142 plan + the repo
worklog + session_303 — the ship-completion transcript). The baseline gate
GREEN — the exact s142-ship match: lint 0/0 · tsc 0 · **114/2101 unit** ·
build · **e2e 146/146 (3.5m)**.

## The audits

- **143-a (the s142 ship verification)**: **12/13 Verified** — the route
  move (`(app)/dashboard/page.tsx` + the capital alias), the PUBLIC landing
  (no guard, outside the (app) group), the brand token
  (`--color-brand: #2563eb`), the /About + /Contact + aliases, the sitemap
  +/about +/contact, the rolling window + the single Won series, the
  singleton disabled-at-zero Export, the 36 landing pins, the 8 landing
  e2e checks, the captures 296-303, the dead code retired clean,
  `.env.example` tracked + `.env` untracked. **THE 1 FINDING (the docs
  gap, Medium)**: the s142 record's D-142a8 claims "the AGENTS
  Session-142 section + the PAD session-142 row" — NEITHER exists in the
  tree (the AGENTS session list ended at Session-141; the PAD table's last
  row was s141; only the COUNT sites were realigned — the docs-counts
  lockstep checks counts, not sections, so the gap rode through green).
  Filled at D-143a3.
- **143-b (the standing battery)**: **11/11 PASS, zero findings** — the
  secrets scan clean, auth guards standing (only the documented public
  /api/health), the rate limits standing, the `@tailwindcss/postcss`
  plugin intact, the db-path seam intact, the 7-day session TTL, zero dep
  changes at s142, the (app) layout auth-gated, the mobile drawer battery
  11/11.
- **probe:ref #115**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901), its CRM-shell
  mobile defect STILL STANDS, landing census STANDING, demo data ZERO.

## The walk (walk33 — the maiden landing-family fresh-eyes census)

The drift gates CLEAN ×4 (1440/390/768/1024, the s142 baselines). The
walk: both apps at 1440×900 + 390×844, the anatomy census + the
interaction lenses. **The verdict: 19 axes EQUAL · 1 GENUS (the
brand-token ctaBg — documented) · 2 REAL FINDINGS** (the 2 aria-lens DIFFs
were instrumentation artifacts, re-decoded via answer-region heights):

- **F-143c1 THE APP-SHELL FOOTER**: the reference renders a 53px
  main-level footer — `<footer class="border-t border-gray-200 bg-white
  px-4 sm:px-8 py-4 text-sm text-gray-500 flex flex-wrap items-center
  gap-x-5 gap-y-2"><span>© 2026 NEO CRM</span>` + the /About + /Contact
  links — on **ALL 11 app pages** (byte-censused on both marketing pages +
  the scope census). Ours rendered NONE. **The decode chain** (why every
  pixel gate missed it): the footer sits below the 900px fold on 10 of 11
  pages (the sweep's capture is the viewport only) — and on profile it IS
  above-fold (viewport 823) but its white bg vs our gray-50 is a
  6-channel delta, UNDER the sweep's 12 tolerance — only its text/border
  pixels diffed, riding inside profile's "0.17%" baseline since the s142
  re-anchor. The contradiction resolve: the as-captured probe (main's 69px
  topbar offset — a content-offset 836 is viewport 905) + the bottom-band
  pixel scan of the standing captures.
- **F-143c2 THE FAQ CONTAINER**: the reference's FAQ section container is
  `max-w-3xl mx-auto px-4 sm:px-6` (768px; the h2 a DIRECT child — no
  inner wrapper; the card `mt-10` direct, 720px). Ours: `max-w-6xl` + a
  `max-w-2xl` h2 wrapper → the 1102px column vs 718px → the open-answer
  wrap 43px vs 66px (the answer texts + every computed style byte-EQUAL —
  only the width). Below the fold → never pixel-captured; the DOM census
  caught it. The other three section headings (features/preview/pricing)
  verified EQUAL (the h2-wrapper census).

## The remediation (TDD)

- **D-143a0 THE APP-SHELL FOOTER (F-143c1)**: the `APP_FOOTER` contract in
  `src/lib/page-layout.ts` (the byte-censused construction — the pinned
  source-of-truth pattern) + the AppShell mount after `{children}` inside
  `main` (all 11 app pages get it through the (app) layout). Pins: the
  APP_FOOTER contract pin + the AppShell mount pin (the session-16
  single-line main pin re-anchored whitespace-flexible).
- **D-143a1 THE FAQ CONTAINER (F-143c2)**: the container `max-w-6xl` →
  `max-w-3xl`; the `max-w-2xl` h2 wrapper RETIRED (the h2 a direct child).
  Pin: the FAQ-container construction pin.
- **THE TDD LEDGER**: the 3 pins RED at birth → the fixes → 230/230 GREEN
  (the two suites) → **the mutation-proof**: the footer class drift →
  exactly 1 RED (the contract pin) · the copyright drift → exactly 1 RED ·
  the FAQ container drift → exactly 1 RED · reverted → GREEN. The full
  unit suite: **114/2104** (+3).
- **D-143a2 THE VERIFICATION CHAIN**: the walk re-run — the FAQ geometry
  **byte-EQUAL** (containerW 768 · h2W 720 · cardW 720 · answerH 66) + the
  footer census **11/11 OK** + the About tail (the footer as main's last
  child after the page wrapper, matching the reference's placement) ·
  lint 0/0 · tsc 0 · build ✓ · **e2e 146/146** (one expected re-anchor:
  the S16-P1 contacts scrollDelta 5 → **58** — live-verified on the
  reference at 390×844: the 5px mirrored topbar quirk + the 53px footer;
  the drawer battery 12/12 — the footer adds no 390 overflow) · **the four
  drift gates CLEAN ×4** (the profile footer band **0.17% → 0.00%** — both
  apps now render it; every other page's footer below-fold).
- **D-143a3 THE DOCS REALIGNMENT**: the count ladder (UNIT 2101 → 2104 ·
  SUITES/E2E unchanged · badge 2247 → 2250) · **the s142 docs-gap fill**
  (the AGENTS Session-142 section + the PAD session-142 row — claimed but
  missing) + the AGENTS Session-143 section + the PAD session-143 row ·
  SKILL v1.140.0 + the H1 + the project_state session-143 layer (the
  F-108a1 layer axis re-anchored: the s143 head + the s142 beneath) · the
  page-layout census rows (1600/191 → **1631/193** — the APP_FOOTER block
  +20 lines + the +2 its) · the Appendix B unit total · the CLAUDE
  carriers · the lockstep GREEN 21/21.
- **D-143a4 THE CAPTURES 304-306 + THE VLM BATTERY 3/3 CLEAN**: 304 the
  remediated FAQ (the narrow centered max-w-3xl + Q1 open + the 5 closed —
  VLM-verified) · 305 the app-shell footer on profile (the copyright +
  About/Contact + the white bg + the profile form above — VLM-verified) ·
  306 the footer at 390 (all three elements on one line, zero overflow —
  VLM-verified; the flex-wrap available but not needed at phone width).

## The walk-harness lessons (L-143c1..c3)

- **L-143c1 the viewport-only sweep's blind band**: the sweep's capture is
  the 900px viewport — everything below the fold on tall pages is NEVER
  pixel-compared (the FAQ width + 10 of 11 footers rode through green).
  The DOM census lenses (the walk) are the only coverage for below-fold
  construction; run them on every new surface.
- **L-143c2 the sub-tolerance footer**: white (255) vs gray-50
  (249,250,251) is a 6-channel delta — UNDER the sweep's 12 tolerance. A
  53px footer bar diffs as "text + border only" (~0.17%) and reads as
  baseline noise. When a below-fold element enters the fold, decode its
  share with a pixel-band scan BEFORE trusting the baseline.
- **L-143c3 the content-offset vs viewport-offset trap**: a footer at
  content-offset 836 inside `main` is NOT at viewport 836 — main itself
  sits 69px below the topbar. Always add main's bounding-rect top before
  declaring above/below-fold (the first scope census wrongly read
  "contacts ABOVE-FOLD"; the as-captured probe corrected it to 905).

## The ship

The final gate: lint 0/0 · tsc 0 · **114/2104** · build · **e2e 146/146** ·
the drift sweep CLEAN ×4 · census MATCH. The two-commit pattern (the feat
+ the session log) pushed to git@github.com:nordeim/neo-crm.git main via
the SSH wrapper (the paramiko shim; the dry-run then the real push;
remote-verified; the keys shredded).
