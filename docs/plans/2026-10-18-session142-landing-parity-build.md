# The session-142 plan — the reference's MARKETING-LAYER parity build (the landing page + /About + /Contact + the route move)

## The intake

The workspace re-cloned at `0956d28` (the s141 ship `3b5e2de` + `7987abe` + the
session_300 transcript commit `0956d28`); the environment re-stood (bun install
533 pkgs, `.env` with DATABASE_URL="file:../db/custom.db" + AUTH_SECRET +
NEXT_PUBLIC_SITE_URL, db:push + db:seed, census MATCH 15/24/10/23/12 + 4 users,
the Playwright chromium-headless-shell 1243 reinstalled after the reset wiped
the platform cache). The four intake docs read (session_300 + the s141 plan +
the repo worklog + session_301). The baseline gate GREEN — the exact s141-ship
match: lint 0/0 · tsc 0 · **113/2060 unit** · build · **e2e 138/138 (3.3m)**.

## THE PARITY EVENT (probe:ref #114)

**The reference app CHANGED** — the first bundle change in 82 sessions:

- **Bundle**: `index-DZ-xbrIm.js` · a70a637f… · 1,631,071 bytes →
  **`index-Dc6wvGtA.js` · 2731a47fced41044fd524fa0e0a9f71c · 1,696,901 bytes**
  (+65,830 — the marketing layer's code).
- **`/` is now a PUBLIC MARKETING LANDING PAGE** (renders logged-out AND
  logged-in; post-login redirects to `/`). Anatomy (the full census):
  the sticky header (bg-white/90 backdrop-blur border-b, the max-w-6xl h-16
  nav, the bg-brand circle-dot logo + "NEO CRM", the Features/Preview/Pricing/
  FAQ anchors, the /Contact link, the "Open dashboard" → /Dashboard CTA, the
  `md:hidden` "Toggle navigation" hamburger with a WORKING in-flow disclosure
  panel — menu↔x icon swap + a border-t bg-white space-y-3 panel with the 5
  block links + the w-full CTA); the hero (the gradient
  from-blue-50/70 via-white to-white section, the
  "Customer relationship management, simplified" badge, the
  "Every account, contact and deal in one calm workspace" h1, the sub
  paragraph, the "Open the dashboard" bg-brand h-10 px-8 CTA with the
  arrow-right icon + the "See pricing" outline CTA, the 3 lucide-check
  text-brand checklist items, the CSS-BUILT mock dashboard card — the
  mac-style chrome bar + the bg-brand mini sidebar + the 4 KPI cells
  [Accounts 128 · Contacts 342 · Open deals 46 · Won this month 12] + the
  5-bar bg-brand/80 pipeline); the #features section (6 icon cards — users/
  target/calendar-check/chart-column/sliders-horizontal/database, each
  w-11 h-11 rounded-lg bg-brand/10 icon wrap); the #preview section (3
  mock+text rows — the same mock construction ×3 with the title + active
  sidebar item varying [Dashboard/Accounts/Reports] + the lg:col-span-2 text
  blocks); the #pricing section (3 rounded-2xl cards — Standard $9 / Pro $19
  [border-brand shadow-lg ring-1 ring-brand/20 + the "Most popular"
  bg-brand/10 badge] / Advanced $39, the mt-5 price rows, the mt-6 space-y-3
  check lists, the mt-8 w-full CTAs [outline/outline/brand], the mt-8
  footnote "Prices are shown for reference while billing is being set
  up…"); the #faq section (the mt-10 divide-y rounded-xl container, 6
  SINGLE-OPEN accordion items — chevron rotate-180 + the answer `<p>`
  mount/unmount, Q1 open by default, NO aria-expanded on the reference); the
  footer (the max-w-6xl py-10 flex, the brand block + description, the
  6-link nav, the "© 2026 NEO CRM" border-t line).
- **`--brand: 221 83% 53%`** = **#2563eb** (the reference's marketing token —
  the same blue as our `--color-primary`).
- **The landing head**: title "NEO CRM" · the 405-char meta description
  (BYTE-IDENTICAL to our SITE_DESCRIPTION) · canonical = the bare origin ·
  the full OG family (+ og:image) · the Twitter family (summary_large_image)
  · the PWA metas · the manifest — our root layout's standing metadata
  already matches every axis.
- **NEW APP PAGES**: `/About` ("About NEO CRM" + 3 paragraphs + the 4 h2
  feature sections + the "Get in touch with us →" → /Contact link) and
  `/Contact` ("Contact Us" + the Email section [lucide-mail w-5 h-5
  text-blue-600 + mailto:hello@example.com] + the "Follow us" section
  [LinkedIn/X/GitHub lucide icons]). Both render INSIDE the reference's app
  shell (sidebar + topbar) — and the reference serves them to GUESTS with a
  "Hi, GuestG" identity and zero data.
- **Post-login redirect → `/`** (the landing) — the login card's
  `router.push("/")` already lands there after the move.

## The audit verdicts (the four standing layers re-measured on the new bundle)

- **The CRM app shell UNCHANGED**: the desktop sidebar census STANDING (nav
  256px · 8 visible links); the demo data ZERO (contacts/leads/accounts 0
  rows); all 9 app routes still serving both casings.
- **THE CRM SHELL'S MOBILE DEFECT STILL STANDS** (the live re-verification on
  the new bundle): /Dashboard at TRUE 390 → nav w=0 · 0 visible links · NO
  menu buttons; /accounts at 390 → the same. **Our focus-trapped drawer
  remains the documented fix-over-defect superset** — the probe:ref #114
  "NAV-FIXED" verdict was the LANDING page's own hamburger (the probe's 390
  census measured `/`, which is now the landing, not the CRM shell).
- The landing's OWN mobile menu WORKS (the disclosure panel census above) —
  it must be mirrored functionally.
- The reference renders app pages to guests (client-side auth) — our
  server-side `(app)` guard redirect stays our documented security posture
  (the data protection is identical; the guest-visible shell is a platform
  artifact we deliberately do not mirror).

## The remediation (the plan-shaped ToDo)

- **D-142a0 THE ROUTE MOVE**: the dashboard moves from `(app)/page.tsx` to
  `(app)/dashboard/page.tsx` (git mv, the metadata + component intact); the
  `(app)/Dashboard/page.jsx` alias re-imports `../dashboard/page`; the 14
  unit-test source-path carriers re-anchored; the e2e dashboard navigations
  re-anchored (`goto("/")` → `goto("/dashboard")` in crm.spec +
  mobile-navigation.spec; auth.setup's `waitForURL("/")` stays — the post-
  login landing IS `/`); the auth.spec logged-out `/` test re-purposed (the
  PUBLIC landing renders, NO redirect to /login).
- **D-142a1 THE LANDING PAGE** at `src/app/page.tsx` (PUBLIC — outside the
  (app) group, no auth guard, static): the full verbatim construction from
  the census (header + hero + features + preview + pricing + faq + footer +
  the mock constructions); `--color-brand: #2563eb` added to the @theme (the
  reference's marketing token; `bg-brand`/`text-brand`/`border-brand` +
  alpha modifiers); the FAQ single-open accordion (default Q1 open; the
  chevron rotate-180 + the answer mount/unmount) with **`aria-expanded` +
  `aria-controls` added as the documented a11y superset** (the reference
  ships none — the drawer precedent); the mobile disclosure menu (the
  menu↔x icon swap + the in-flow panel); the landing metadata inherited from
  the root layout (every axis already matches — the title, the 405-char
  description, the canonical, the OG/Twitter + og-image.png, the PWA metas).
- **D-142a2 THE /About + /Contact APP PAGES**: `(app)/about/page.tsx` +
  `(app)/About/page.jsx` alias + `(app)/contact/page.tsx` +
  `(app)/Contact/page.jsx` alias (the route-case pattern, the .jsx TS1149
  dodge); the verbatim content construction; both auth-gated (our posture);
  the titles "About | NEO CRM" / "Contact | NEO CRM" (the reference's
  document.title census) via pageMetadata().
- **D-142a3 THE SEO SURFACES**: sitemap.xml + /about + /contact (0.8 — the
  route surface mirrors the reference's; `/` stays 1.0 as the landing);
  robots.txt unchanged; the metadata/pwa-metadata/route-case unit pins
  extended.
- **D-142a4 THE PROBE RE-ANCHOR**: STANDING.bundle → 2731a47fced41044fd524fa
  0e0a9f71c · 1,696,901; the TRUE-390 census retargeted `/` → `/Dashboard`
  (restores the app-shell defect tracker — DEFECT-STANDS expected); + the
  landing census check (the 1440 `/` nav: 7 links; the 5 sections + the
  footer); the drift-probe-tool pins extended to the new constants.
- **D-142a5 THE UNIT PINS**: tests/landing-page.test.ts (the construction
  census pins — the header links, the hero copy verbatim, the checklist,
  the mock constructions, the 6 feature cards, the 3 pricing tiers + the
  Pro highlight, the 6 FAQ items + the single-open mechanism, the footer
  links, the mobile-menu construction, the PUBLIC-page source rule [no
  (app) guard import, no getSessionUser]); the route-case/page-titles/
  metadata/sitemap pins extended; GREEN-at-birth + THE MUTATION-PROOF per
  the freeze-pin pattern.
- **D-142a6 THE E2E + SWEEP**: tests/e2e/landing.spec.ts (the logged-OUT
  public access, the header links + anchors, the FAQ round-trip, the mobile
  menu at 390, the CTA → /dashboard [the login wall for guests], the footer
  links); the crm/mobile-navigation/auth spec re-anchors; the sweep PAGES
  dashboard entry → `/dashboard` + the NEW landing entry at `/` + the maiden
  landing baselines (the 4-way class tables).
- **D-142a7 THE CAPTURES** (296+): the remediated app's landing @1440 + the
  390 closed/open menu faces + the dashboard + the mobile drawer — under
  docs/screenshots/ + THE VLM BATTERY.
- **D-142a8 THE DOCS REALIGNMENT**: README (the mobile-nav narrative: the
  reference's CRM defect STANDS; the NEW marketing layer mirrored), AGENTS
  (the session-142 section + the route map), CLAUDE (the carriers), PAD
  (the session-142 row), SKILL (the project_state layer + the version
  bump), the count ladder (badge), session_302.md, the plan's execution
  record, the worklog.
- **D-142a9 THE FINAL GATE + THE SHIP**: lint · tsc · the full unit · build
  · e2e · the sweep drift check · census MATCH · the two-commit pattern →
  the SSH wrapper push.

## The ship

The two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the paramiko
shim, the dry-run then the real push; remote-verified; the keys shredded).

## The execution record (appended post-execution)

The plan ran with one mid-execution discovery that grew the scope — the
D-142b0 dashboard re-derivation (the sweep's maiden run diffed the dashboard
6.42%, decoding into THREE reference changes: the rolling revenue window, the
Target-series + Legend retirement, the s33 header-trio retirement +
the disabled-at-zero Export).

**The route move (D-142a0)**: git mv + the alias re-import + the 14 path
carriers + the e2e re-anchors — the login card's `router.push("/")` needed NO
change (the post-login redirect lands on the landing exactly like the
reference's).

**The landing (D-142a1)**: built to the census; the mutation-proof
strengthened the CTA pin with an occurrence count (4 sites) after the
single-site mutation initially passed on the second occurrence. The
brand-token genus decoded mid-verification (the sweep's landing diff +
the VLM's "invisible CTA" reading + the stylesheet grep — L-142c1).

**D-142a2/a3/a4**: the About/Contact pages + aliases; the sitemap +2; the
probe re-anchored (STABLE on the new fingerprint; the TRUE-390 census back
on the CRM shell — DEFECT-STANDS; + the landing census).

**The D-142b0 re-derivation** (the unplanned-but-doctrine-mandated leg):
the revenue chart re-derived (rolling months + the one Won series + the
no-legend RevenueLineChart), the header trio retired (the quick-create
vocabulary narrowed to the two card-level ghost Adds; the three entity CSV
builders retired; CHART_COLORS.red retired), the disabled-at-zero Export
pinned. The blast radius: 6 unit suites re-anchored + 2 e2e tests
re-scoped.

**The counts**: UNIT 2060 → 2101 (+41) · SUITES 113 → 114 · E2E 138 → 146
(+8) · badge 2198 → 2247; the docs lockstep GREEN (the count sites + the
line-census re-anchors).

**The final gate**: lint 0/0 · tsc 0 · 114/2101 · build · e2e 146/146
(3.5m) · the drift sweep CLEAN ×4 (the dashboard 0.03% at 1440) · census
MATCH. The captures 296-303 + the VLM battery clean. The `.env.example`
verified against the codebase (DATABASE_URL/AUTH_SECRET/
NEXT_PUBLIC_SITE_URL — tracked, unchanged).
