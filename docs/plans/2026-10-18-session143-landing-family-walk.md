# Session 143 — The Landing Family Walk (the 143-c rotation)

**Date**: 2026-10-18 · **Repo**: nordeim/neo-crm · **Branch**: main

## The intake

The workspace pulled to `35e958a` (the s142 ship `780fe05` + `fe3a59d` + the
session_303 transcript commit). The environment standing (node_modules,
`.env` DATABASE_URL="file:../db/custom.db", census MATCH 15/24/10/23/12 + 4
users). The baseline gate GREEN — the exact s142-ship match: lint 0/0 ·
tsc 0 · **114/2101 unit** · build · **e2e 146/146 (3.5m)**.

## The audits

- **143-a (the s142 ship verification)**: 12/13 Verified — the route move
  (`(app)/dashboard/page.tsx` + the capital alias re-import), the PUBLIC
  landing (`src/app/page.tsx` outside the (app) group, no guard), the brand
  token (`--color-brand: #2563eb` at globals.css:48), the /About + /Contact
  + capital aliases, the sitemap +/about +/contact at 0.8, the rolling
  last-7-months window + the single Won series, the singleton disabled
  Export, the 36 landing pins, the 8 landing e2e checks, the captures
  296-303, the dead code retired clean (no CHART_COLORS.red / CSV-builder
  remnants), `.env.example` tracked + `.env` untracked.
  **THE 1 FINDING (docs gap, Medium)**: the s142 record's D-142a8 claims
  "the AGENTS Session-142 section + the PAD session-142 row" — NEITHER
  exists in the tree (the AGENTS session list ends at Session-141; the PAD
  table's last row is s141; only the COUNT sites were realigned). The
  docs-counts lockstep checks counts, not sections — the gap rode through
  green. Remediated at D-143a3.
- **143-b (the standing battery)**: 11/11 PASS, zero findings — secrets
  scan clean (no AUTH_SECRET value, no key material), auth guards standing
  (only the documented public /api/health), rate limits standing (10/10/5/
  20/20), the `@tailwindcss/postcss` plugin intact, the db-path seam
  intact, the 7-day session TTL, zero dep changes at s142, the (app)
  layout auth-gated, the mobile drawer battery 11/11.
- **probe:ref #115**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901), its CRM-shell
  mobile defect STILL STANDS, landing census STANDING, demo data ZERO.

## The walk (walk33 — the maiden landing-family fresh-eyes census)

The drift gates CLEAN ×4 (1440/390/768/1024, the s142 baselines). The
walk: both apps, 1440×900 + 390×844, the anatomy census + the interaction
lenses. **The verdict: 19 axes EQUAL · 1 GENUS (the brand-token ctaBg —
documented) · 2 REAL FINDINGS** (the 2 aria-lens DIFFs were instrumentation
artifacts, re-decoded via answer-region heights):

- **F-143c1 — THE APP-SHELL FOOTER**: the reference renders a main-level
  footer on **ALL 11 app pages** (dashboard, accounts, contacts, leads,
  calendar, activities, reports, settings, profile, about, contact) —
  byte-censused:
  `<footer class="border-t border-gray-200 bg-white px-4 sm:px-8 py-4
  text-sm text-gray-500 flex flex-wrap items-center gap-x-5 gap-y-2">`
  carrying `<span>© 2026 NEO CRM</span>` + `/About` + `/Contact` links
  (53px, direct child of `main` after the page wrapper). Ours renders NONE.
  **Why the sweep never caught it**: the footer sits below the 900px fold
  on 10 of 11 pages (the pages are tall); on profile it IS above-fold
  (viewport 823) — and its white background vs our gray-50 is a 6-channel
  delta, UNDER the sweep's 12 tolerance — only the text/border pixels
  diff, riding inside profile's "0.17%" baseline since the s142 re-anchor.
  (Decode chain: the footer-scope census × both apps → the as-captured
  measurement — main's 69px topbar offset — → the bottom-band pixel scan.)
- **F-143c2 — THE FAQ CONTAINER WIDTH**: the reference's FAQ section
  container is `max-w-3xl mx-auto px-4 sm:px-6` (768px; the h2 a DIRECT
  child — no inner wrapper; the card `mt-10` direct, 720px). Ours:
  `max-w-6xl` + a `max-w-2xl` h2 wrapper → the FAQ column 1102px vs the
  reference's 718px → the open-answer wrap 43px vs 66px (the answer TEXT
  + all computed styles byte-equal — only the width differs). Below the
  fold → never pixel-captured; the DOM census caught it. The other three
  section headings (features/preview/pricing) verified EQUAL.

## The remediation (TDD — the pins RED first, then the fixes)

- **D-143a0 — THE APP-SHELL FOOTER (F-143c1)**: `APP_FOOTER` added to
  `src/lib/page-layout.ts` (the byte-exact construction — the pinned
  source-of-truth pattern); consumed in `AppShell` after `{children}`
  inside `main` (all 11 app pages get it through the (app) layout). Pins:
  the `APP_FOOTER` contract pin in `tests/page-layout.test.ts` + the
  AppShell consumption pin. Mutation-proof: the class drift → exactly its
  pin RED; the copy drift → exactly its pin RED.
- **D-143a1 — THE FAQ CONTAINER (F-143c2)**: the Faq container
  `max-w-6xl` → `max-w-3xl`; the `max-w-2xl` h2 wrapper REMOVED (the h2 a
  direct child, matching the reference's census). Pin: the
  landing-page.test.ts FAQ-container construction pin (max-w-3xl + NO
  max-w-2xl in the Faq). Mutation-proof: the container drift → exactly
  its pin RED.
- **D-143a2 — THE VERIFICATION CHAIN**: the walk33 lenses re-run (the FAQ
  geometry byte-equal + the footer census 11/11) · the full unit suite ·
  build · e2e 146 (the drawer battery guards the 390 footer containment) ·
  the four sweep drift gates (profile's footer band now MATCHES both
  sides — its share should drop from 0.17%; every other page's footer
  stays below-fold).
- **D-143a3 — THE DOCS REALIGNMENT**: the count ladder (+ the new pins) ·
  the AGENTS **Session-142 section (the docs-gap fill)** + the
  Session-143 section · the PAD **session-142 row (the fill)** + the
  session-143 row + the totals · SKILL v1.140.0 + the project_state
  session-143 layer · the CLAUDE carriers · the worklog + the
  session_304 record.
- **D-143a4 — THE CAPTURES 304-306**: the remediated FAQ (max-w-3xl + the
  open Q1), the app-shell footer on profile (the above-fold page), the
  footer at 390 (the flex-wrap face).
- **D-143a5 — THE FINAL GATE + THE SHIP**: lint 0/0 · tsc 0 · the unit
  count · build · e2e 146/146 · the drift gates CLEAN ×4 · census MATCH →
  the two-commit pattern (the feat + the session log) pushed via the SSH
  wrapper to main.

## The walk-harness lessons (L-143c1..c3)

- **L-143c1 the viewport-only sweep's blind band**: the sweep's capture is
  the 900px viewport — everything below the fold on tall pages is NEVER
  pixel-compared (the FAQ width + 10 of 11 footers rode through green).
  The DOM census lenses (the walk) are the only coverage for below-fold
  construction; run them on every new surface.
- **L-143c2 the sub-tolerance footer**: white (255) vs gray-50 (249,250,251)
  is a 6-channel delta — UNDER the sweep's 12 tolerance. A 53px footer bar
  diffs as "text + border only" (~0.17%) and reads as baseline noise. When
  a below-fold element enters the fold, decode its share with a pixel-band
  scan BEFORE trusting the baseline.
- **L-143c3 the content-offset vs viewport-offset trap**: a footer at
  content-offset 836 inside `main` is NOT at viewport 836 — main itself
  sits 69px below the topbar. Always add main's bounding-rect top before
  declaring above/below-fold (the walk33f "contacts ABOVE-FOLD" verdict
  was wrong; the as-captured probe corrected it to 905 = below-fold).

## The execution record (filled at ship)

- D-143a0 ✓ the APP_FOOTER contract + the AppShell mount (all 11 app
  pages); the contract pin + the mount pin; the mutation-proof ×2
- D-143a1 ✓ the FAQ container max-w-3xl + the direct h2; the container
  pin; the mutation-proof ×1; the walk re-verify byte-EQUAL (768/720/66)
- D-143a2 ✓ the verification chain: 114/2104 · build · e2e 146/146 (the
  S16-P1 re-anchor 5 → 58, reference-verified at 390×844) · the drift
  gates CLEAN ×4 (profile 0.17% → 0.00%)
- D-143a3 ✓ the docs realignment (2104/2250 · the page-layout census
  1631/193 · the s142 docs-gap fill [the AGENTS Session-142 section + the
  PAD session-142 row] + the s143 sections · SKILL v1.140.0 · the
  F-108a1 layer axis re-anchored · the lockstep GREEN 21/21)
- D-143a4 ✓ the captures 304-306 + the VLM battery 3/3 clean
- D-143a5 ✓ the final gate GREEN + the two-commit ship via the SSH wrapper
