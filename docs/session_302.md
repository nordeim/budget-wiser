# Session 302 — the session-142 record (the marketing-layer parity build)

## The intake

The workspace re-cloned at `0956d28` (the s141 ship `3b5e2de` + `7987abe` + the
session_300 transcript commit); the environment re-stood (bun install 533
pkgs, `.env` with DATABASE_URL="file:../db/custom.db" + AUTH_SECRET +
NEXT_PUBLIC_SITE_URL, db:push + db:seed, census MATCH 15/24/10/23/12 + 4
users, the Playwright chromium-headless-shell 1243 reinstalled after the
reset). The four intake docs read (session_300 + the s141 plan + the repo
worklog + session_301 — the restart-continuation record). The baseline gate
GREEN — the exact s141-ship match: lint 0/0 · tsc 0 · **113/2060 unit** ·
build · **e2e 138/138 (3.3m)**.

## THE PARITY EVENT (probe:ref #114)

**The reference app CHANGED — its first bundle change in 82 sessions**:
`index-DZ-xbrIm.js` · a70a637f… · 1,631,071 bytes →
**`index-Dc6wvGtA.js` · 2731a47fced41044fd524fa0e0a9f71c · 1,696,901** (+65KB
— the marketing layer). The eight-probe decode:

- **`/` is now a PUBLIC MARKETING LANDING PAGE** (renders logged-out AND
  logged-in; post-login redirects to `/`): the sticky header (bg-white/90
  backdrop-blur, the max-w-6xl h-16 nav, the bg-brand circle-dot logo,
  Features/Preview/Pricing/FAQ anchors, /Contact, the "Open dashboard" →
  /Dashboard CTA, the `md:hidden` "Toggle navigation" hamburger with a
  WORKING in-flow disclosure panel — the menu↔x icon swap + the border-t
  space-y-3 panel that mounts/unmounts and CLOSES on in-panel link click);
  the hero (the gradient section, the "Customer relationship management,
  simplified" badge, the "Every account, contact and deal in one calm
  workspace" h1, the CTA pair "Open the dashboard" [bg-brand + arrow] /
  "See pricing" [outline h-10 px-8], the 3 lucide-check text-brand
  checklist items, the CSS-BUILT mock dashboard — the mac chrome bar + the
  bg-brand mini sidebar + the 4 KPI cells [128/342/46/12] + the 5-bar
  pipeline); #features (6 icon cards — users/target/calendar-check/
  chart-column/sliders-horizontal/database); #preview (3 mock+text rows);
  #pricing (Standard $9 / Pro $19 [border-brand + shadow-lg + ring-brand/20
  + the "Most popular" badge] / Advanced $39 + the footnote); #faq (6
  SINGLE-OPEN accordion items, Q1 open by default, NO aria-expanded on the
  reference); the footer.
- **NEW APP PAGES**: /About (3 intro paragraphs + the 4 h2 icon cards + the
  "Get in touch with us →" link) + /Contact (the Email card + the "Follow
  us" socials) — both inside the reference's app shell (rendered to GUESTS
  with a "Hi, GuestG" identity — its platform's client-side-auth artifact).
- **THE CRM SHELL UNCHANGED** (the sidebar census STANDING 256px/8 links;
  demo data ZERO) and **THE CRM SHELL'S MOBILE DEFECT STILL STANDS**
  (/Dashboard + /accounts at TRUE 390: nav w=0 · 0 visible links · NO menu
  buttons — the probe's #114 "NAV-FIXED" verdict was the LANDING page's own
  hamburger; the old 390 census measured `/`, which is now the landing).
- **THE LANDING BRAND-TOKEN GENUS**: the reference's stylesheet ships
  `--brand: 221 83% 53%` but ZERO `.bg-brand`/`.text-brand`/`.border-brand`
  utility rules (fetched its CSS + grepped — the classes never generate).
  Every brand-colored element on its landing renders
  transparent/inherited IN ANY BROWSER: its primary CTAs are INVISIBLE
  (text-white on transparent = white-on-white; only the `shadow` silhouette
  shows), its logo/mock-sidebar/chart-bars colorless. Pixel-sampled on its
  capture: the CTA region renders white. Ours renders the intended blue
  (`--color-brand: #2563eb` in @theme) — the drawer-precedent
  fix-over-defect, the standing sweep genus.
- **THE DASHBOARD RE-DERIVATION (D-142b0)** — decoded from the sweep's
  6.42% drift: the revenue chart's FIXED Nov..May label quirk RETIRED (the
  new reference derives the ROLLING last-7-months window — censused
  Apr..Oct); the synthetic 55k±random Target series + the Legend RETIRED
  (ONE "Won" area series; the zero-data face renders the flat area + the
  "0,1,2,3,4" y-quirk domain + the "Won : $0" dollar-formatter tooltip);
  the s33 header TRIO RETIRED (the reference's header row carries exactly
  ONE button — the blue Export; no Add anywhere on the page); the Export
  is DISABLED at zero leads (live-censused disabled=true + opacity 0.5 —
  the stock disabled:opacity-50 half-blue face).

## The remediation

- **D-142a0 THE ROUTE MOVE**: the dashboard `(app)/page.tsx` →
  `(app)/dashboard/page.tsx` (git mv); the `(app)/Dashboard/page.jsx` alias
  re-imports `../dashboard/page`; the 14 unit-test source-path carriers
  re-anchored; the e2e dashboard navigations re-anchored (`goto("/")` →
  `goto("/dashboard")`; auth.setup's `waitForURL("/")` stays — the
  post-login landing IS `/`); the auth.spec logged-out `/` test re-purposed
  (the PUBLIC landing renders; the app pages login-wall). The login card's
  `router.push("/")` now lands on the landing — matching the reference's
  post-login redirect exactly.
- **D-142a1 THE LANDING PAGE**: `src/app/page.tsx` (PUBLIC — outside the
  (app) group, no auth guard, inherits the root layout's metadata —
  byte-equal to the reference's landing head on every axis) +
  `src/components/landing/landing-page.tsx` (the full censused
  construction); `--color-brand: #2563eb` in the @theme. Three documented
  deviations: `truncate` (not the reference's broken `rounded-truncate`),
  the FAQ's aria-expanded + aria-controls (the a11y superset), and the
  working blue (the brand-token genus).
- **D-142a2 /About + /Contact**: the two censused app pages (pure server
  components, auth-gated per our standing security posture) + the capital
  .jsx aliases (the s24 TS1149 dodge).
- **D-142a3 SEO**: the sitemap +/about +/contact (0.8); robots unchanged;
  the landing inherits the root's full OG/Twitter family (og-image.png).
- **D-142a4 THE PROBE RE-ANCHOR**: STANDING.bundle → 2731a47f… · 1,696,901;
  the TRUE-390 census retargeted `/` → `/Dashboard` (the app-shell defect
  tracker restored — DEFECT-STANDS expected); + the landing census
  (7 nav links · 5 sections); the probe now exits 0 STABLE on the new
  fingerprint.
- **D-142a5 THE UNIT PINS**: tests/landing-page.test.ts (36 its — the
  construction census: the header/hero/mock/features/preview/pricing/FAQ/
  footer constructions + the mobile menu + the PUBLIC-page source rule +
  the /About + /Contact pins; **the mutation-proof**: the Pro price drift →
  exactly 1 RED, the aria removal → exactly 1 RED, the single-site brand
  drift → exactly 1 RED [after the occurrence-count pin strengthened it],
  reverted → 36/36 GREEN); the probe re-anchor pins (+2); the sitemap pin
  (+1); the space-y census re-anchor (107 → 114 / 18 → 20 files — the
  reference's own landing constructions); the D-142b0 re-derivations (the
  target retirement, the rolling window, the trio retirement + the
  quick-create narrowing, the disabled-at-zero Export, CHART_COLORS.red
  retirement).
- **D-142a6 E2E + SWEEP**: tests/e2e/landing.spec.ts (+8: the public
  anatomy, the pricing tiers, the FAQ single-open, the 390 disclosure menu,
  the guest CTA login-wall, the post-login redirect, the footer anchors,
  the authenticated About/Contact faces); the crm.spec re-anchors (the
  export-singleton test, the quick-create re-scope, the URL regexes); the
  sweep PAGES dashboard → `/dashboard` + the NEW landing entry + the
  brand-token baselines (desktop 9.9 / phone 8.5 / tablet 15.8 / landscape
  11.3 — measured on the maiden runs; the tablet run measured 15.34, the
  landscape 10.77).
- **D-142a7 THE CAPTURES 296-303** (eight unique md5s) + **THE VLM BATTERY
  CLEAN**: 296 the landing hero (the blue visible CTAs + the badge + the
  headline verbatim); 297 the pricing tiers; 298 the landing 390
  menu-open (the 5 links + the blue CTA); 299 the remediated dashboard
  (the sidebar + the singleton Export + the 6 KPIs + both charts); 300
  **THE CRM MOBILE DRAWER @390 OPEN** (all 8 links, Dashboard active, the
  X close, zero overflow — the headline fix standing); 301 the FAQ
  single-open; 302/303 the About/Contact pages.
- **D-142a8 THE DOCS REALIGNMENT**: the count ladder (UNIT 2060 → 2101
  [+41] · SUITES 113 → 114 · E2E 138 → 146 [+8] · badge 2198 → 2247);
  SKILL v1.139.0 + the H1 + the project_state session-142 layer + the
  Appendix B totals; the AGENTS Session-142 section + the commands table;
  the README (the overview narrative + the landing feature row + the
  post-login note); the CLAUDE carriers; the PAD session-142 row + the
  totals; the line-census sites (globals.css 420→430, types 276→280); the
  lockstep GREEN.
- **D-142a9 THE FINAL GATE**: lint 0/0 · tsc 0 · **114/2101** · build ·
  **e2e 146/146 (3.5m)** · **the drift sweep CLEAN ×4** (1440: the
  dashboard 0.03% — pixel-perfect after the re-derivation; 390: 0.61%;
  768: 0.09%; 1024: 0.10%; the landing at its brand-token baselines) ·
  census MATCH.

## The walk-harness lessons (L-142c1..c3)

- **L-142c1 the landing's brand utilities never generate**: the reference's
  `--brand` custom property is shadcn-style HSL COMPONENTS ("221 83% 53%")
  while its JSX uses Tailwind's token-utility classes (`bg-brand`) — the
  two conventions never met in its build, so the utilities compile to
  NOTHING and its landing's primary CTAs render invisible in every
  browser. Decode method: fetch the stylesheet + grep for the utility
  rules (a computed-style probe alone reads `rgba(0,0,0,0)` and looks like
  a headless artifact — the CSS source is the authoritative evidence).
- **L-142c2 the sweep's zero-data capture rides the disabled state**: the
  reference's Export renders disabled (opacity-50) at zero data — the
  half-blue face pixel-diffs like a color change. Decode: read the
  button's `disabled` + computed opacity before concluding a palette
  drift.
- **L-142c3 the trio retirement narrows the quick-create graph**: retiring
  a header affordance can orphan dialog mounts + handlers + palette
  members (CHART_COLORS.red) + test pins five files deep — run the full
  unit suite after every visual retirement, not just the surface's own
  suites.

## The ship

The two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the paramiko
shim, the dry-run then the real push; remote-verified; the keys shredded).
