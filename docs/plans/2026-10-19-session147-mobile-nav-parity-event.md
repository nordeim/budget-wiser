# Session 147 — The Mobile-Nav Parity Event (probe:ref #119's event, the 147-c rotation)

**Date**: 2026-10-19 · **Repo**: nordeim/neo-crm · **Branch**: main

## The intake

The workspace re-cloned at `195fea9` (the s146 ship `f188691` + the
session_310 record `a4de619` + the session_311 transcript `195fea9` —
the s146 ship session's own log; the sandbox was reset, so the
environment re-stood: bun install · .env from .env.example with a fresh
AUTH_SECRET · db:push + db:seed · the census MATCH 15/24/10/23/12 + 4
users · the Playwright chromium re-installed). The four intake docs read
(session_310 + the s146 plan + the repo worklog + session_311). The
baseline gate GREEN — the exact s146-ship match: lint 0/0 · tsc 0 ·
**114/2115 unit** · build · **e2e 150/150**.

## The audits

- **147-a (the s146 ship verification)**: 11/11 spot-verified, zero
  findings — the three sweep.ts baseline re-anchors (phone.landing 6.0 ·
  desktop.dashboard 0.15 · desktop.contacts 0.1, each with the
  mechanism-named comment) · the sweep-tool session-146 describe + the
  re-anchored pins · the captures 313-314 · the docs-counts ladder
  (UNIT 2115 · badge 2265) · SKILL v1.143.0 + the session-146 layer ·
  `.env.example` tracked and matching (it bootstrapped this session's
  own .env).
- **147-b (the standing battery)**: 11/11 PASS, zero findings — the
  secrets posture (.env untracked, src/ clean) · zero dep changes
  (package.json/bun.lock unchanged db6ed2a..HEAD) · the postcss plugin
  + the 7-day TTL + the rate-limit module standing · the vitest +
  playwright configs intact (they ran the baseline) · the sitemap (11
  routes incl. +about/+contact) + robots standing · the drawer
  battery GREEN against the pre-change drawer.
- **probe:ref #119**: **CHANGED — THE PARITY EVENT** (the first since
  s142, after 5 stable sessions): the bundle moved to
  `index-n8TZHw0K.js` · md5 `46bc2d9c6bfa2c0ec13e2e5cef61d5b6` ·
  1,699,576 bytes (+2,675) — AND the TRUE-390 census verdict flipped
  DEFECT-STANDS → **NAV-FIXED** (a menu button now exists at phone
  width on /Dashboard). Per the probe's own doctrine: re-run the maiden
  walks, re-census the interactive families, and re-evaluate the
  standing layers before trusting any drift-gate result.

## The walk (walk37 — the parity-event decode, 8 census passes)

- **The reference's DESKTOP shell is byte-stable**: the sidebar root
  (`hidden md:flex w-64 bg-[#2563eb] text-white flex-col`), the brand
  (`p-6 flex items-center gap-3` + CRM), the nav container, the link
  classes, the topbar header — every string byte-matches our
  NAV_LAYOUT/TOPBAR_LAYOUT pins. The bundle's +2,675 bytes are the two
  changes below, not a desktop re-layout.
- **F-147c1 THE REFERENCE'S MOBILE-NAV FIX (the standing defect #1
  RETIRED)**: the CRM-shell mobile defect (documented since the repo's
  first sessions — "below lg the sidebar disappears, leaving phone
  users without navigation") is FIXED upstream. The decoded anatomy:
  - **The trigger**: the STOCK ghost Button (`h-9 w-9`, the full
    stock base incl. `[&_svg]:size-4` + `hover:bg-accent
    hover:text-accent-foreground focus-visible:ring-1`) + `md:hidden
    text-gray-600`, `aria-label="Open navigation"` (no "menu"),
    `aria-haspopup="dialog"` + `aria-expanded` + `aria-controls` +
    `data-state` (Radix DialogTrigger wiring), the lucide-menu glyph
    (three EQUAL lines, w-5 h-5) — the topbar row's first child.
  - **The drawer**: a Radix Dialog (the shadcn Sheet pattern): the
    stock overlay (`fixed inset-0 z-50 bg-black/80` fade — byte-equal
    to our DIALOG_OVERLAY) + the content `fixed z-50 gap-4 shadow-lg
    transition ease-in-out data-[state=closed]:duration-300
    data-[state=open]:duration-500 ... inset-y-0 left-0 h-full ...
    slide-in-from-left sm:max-w-sm w-72 border-0 bg-[#2563eb] p-0
    text-white` — 288×844 at x=0; the header `flex flex-col space-y-2
    text-center sm:text-left p-6` carrying the h2 title `text-left
    text-2xl font-bold text-white` "CRM" (the WORDMARK replaces the
    BrandMark circle in the drawer) + an sr-only description
    "Navigate between your CRM pages"; the stock DialogClose
    (`absolute right-4 top-4 ... opacity-70`, lucide-x h-4 w-4,
    `data-[state=open]:bg-secondary` variant) — 16×16 at (256, 16);
    **nav1** `flex flex-col gap-1 px-3` (7 links) + **nav2** `mt-4
    flex flex-col gap-1 border-t border-white/10 px-3 pt-4`
    (Settings — the divider pattern, mt-4 not mt-auto); the DRAWER's
    own link styles (NOT the desktop sidebar's): `flex items-center
    gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors`
    + active `bg-white/20 text-white` / inactive `text-white/80
    hover:bg-white/10 hover:text-white`; the icons w-5 h-5 (the same
    lucide set as the sidebar).
  - **The behavior battery (all ≡ ours)**: focus lands on the Close
    button on open · focus returns to the trigger on close · Escape
    closes · scrim click closes · link click navigates + closes +
    unlocks (body `data-scroll-locked` + overflow hidden —
    react-remove-scroll, the same Radix machinery our entity dialogs
    ride) · the trigger hides at ≥768 with the sidebar taking over ·
    the trigger renders on ALL CRM pages at 390 · Radix 1.1.23 renders
    NO aria-modal (the reference's dialog carries aria-labelledby →
    the h2 — the stock behavior, ours to match).
- **F-147c2 THE GUEST RE-GATING (the s144 posture REVERSED)**: the
  reference's /About + /Contact now LOGIN-WALL guests — the client-side
  guard (200 HTML, then JS) replaces the s144-era guest-serving: a
  guest /About lands at `/login?from_url=<absolute-url-encoded>`; the
  logged-in /About face is UNCHANGED (the same content + chrome);
  post-login from the wall RETURNS TO THE TARGET (walk-verified: /About
  wall → login → /About with the full shell). The landing `/` stays
  public; the plain /login post-submit still lands `/` (the s145 pin
  stands); the login card face (h1 "Welcome to NEO CRM" + "Sign in to
  continue" + the Google button + the email/password form) is
  UNCHANGED. The s93 standing genus (the reference's account button at
  the LEFT at 390 — an accident of its topbar construction) COLLAPSES:
  with the hamburger as the row's first child, the reference's topbar
  is now [hamburger LEFT] + [account RIGHT] — OUR construction.

## The remediation (TDD)

- **D-147a0 THE SHEET CONTRACTS + THE DRAWER RE-DERIVATION**: the new
  MOBILE_NAV family in page-layout.ts (SHEET_CONTENT · SHEET_HEADER ·
  SHEET_TITLE · SHEET_DESCRIPTION · the drawer link/nav containers) +
  mobile-nav.tsx REBUILT on the repo's own Radix dialog primitives
  (Dialog.Root/Trigger/Portal/Overlay/Content + the stock close) — the
  reference's byte-decoded classes; the DrawerNav renders NAV_ITEMS +
  NAV_FOOTER_ITEMS with the drawer styles and the shared
  case-insensitive isActive. OUR BEHAVIORAL SUPERSETS KEPT (invisible
  to pixels, pinned by e2e): the S8-P1 resize-past-md auto-close + the
  dual body+main lock (main via our effect; body via Radix's
  react-remove-scroll) + the route-change close (AppShell's
  adjust-during-render).
- **D-147a1 THE NAV-CONFIG EXTRACTION**: isActive moves to nav-config
  as a pure exported helper (both navs + the unit pins share it).
- **D-147a2 THE GUEST RE-GATING + THE from_url ROUND-TRIP**: the
  GuestLoginRedirect client shim (the reference's own mechanism: JS
  replace to `/login?from_url=<location.href>`) rendered by BOTH
  guards — the (marketing) group flips session-optional → guarded, the
  (app) group's server 307 becomes the shim (the session decision
  stays SERVER-side in both layouts: the guest never receives the page
  HTML, only the shim); the login card's sign-in submit navigates to
  the SAME-ORIGIN-VALIDATED from_url target, else `/` (the open-
  redirect guard — never trust the param).
- **D-147a3 THE PROBE RE-ANCHOR**: STANDING.bundle → the new
  fingerprint; the mobile-nav standing anchor re-derived (the triple-
  zero defect anchor retired; the new anchor: nav w=0 · 0 links · 1
  menu button — any drift in EITHER direction trips the event); the
  drift-probe-tool pins re-anchored.
- **D-147a4 THE E2E + BATTERY RE-ANCHORS**: mobile-navigation.spec
  (the trigger label + the dialog name "CRM" + the closed-state
  unmount semantics + the open-overflow selectors), landing.spec (the
  guest family flips: the wall + the from_url round-trip replace the
  guest-chrome + guest-drawer tests), auth.spec (the from_url post-
  login case), the drawer-battery selectors.
- **D-147a5 THE SWEEP RE-DERIVATION**: the phone floor family
  (0.51-0.56, the s93 mobile-nav superset topbar genus) re-measured
  post-mirror — the genus collapsed (both apps [hamburger LEFT] +
  [account RIGHT]); the phone table re-anchored; the topbar-genus
  comments retired; the four drift gates GREEN under the re-derived
  tables.
- **D-147a6 THE CAPTURES + THE VLM BATTERY**: the reference's new
  drawer (closed + open + post-nav) + ours (open) + the guest wall —
  the parity-event's evidence set.
- **D-147a7 THE DOCS REALIGNMENT**: the mobile-defect claim RETIRED
  across README/CLAUDE/AGENTS/PAD/SKILL (the drawer's framing: the
  deliberate fix-over-defect → the parity-matched nav + the kept
  behavioral supersets); the standing-defects ledger update; the count
  ladder; the session records (session_312 + this plan + the worklog).
- **D-147a8 THE FINAL GATE + THE SHIP**: lint 0/0 · tsc 0 · the unit
  count · build · e2e · the four drift gates CLEAN ×4 · census MATCH →
  the two-commit pattern pushed via the SSH wrapper to main.

## The walk-harness lessons (L-147c1..c2)

- **L-147c1 the defect ledger is a snapshot too**: the standing
  "reference mobile defect" drove five sessions of framing (the
  README's headline, the drawer's fix-over-defect posture) — the
  reference's own fix arrived without notice, and every carrier of the
  claim needed the same re-derivation discipline as a pixel baseline.
- **L-147c2 the parity event lands as a CLUSTER**: one bundle change
  carried two independent posture flips (the nav fix + the guest
  re-gating) — decode the WHOLE delta (the sweep + the boundary walks)
  before choosing the remediation scope, or the second change rides
  the first one's ticket unnoticed.

## The execution record (filled at ship)

- D-147a0 ✓ the MOBILE_NAV_SHEET + MOBILE_NAV_TRIGGER contracts + the
  mobile-nav.tsx rebuild on the Radix primitives + the DrawerNav (the
  kept supersets wired: autoCloseQuery + the main lock + onNavigate)
- D-147a1 ✓ isNavActive extracted to nav-config (the s24 rules, pinned
  by the NEW tests/nav-config.test.ts — SUITES 114 → 115)
- D-147a2 ✓ the GuestLoginRedirect shim on both groups + the
  resolveFromUrl round-trip (the same-origin guard) + APP_GUEST_USER
  retired + the s144 pins flipped
- D-147a3 ✓ the probe STANDING (the new fingerprint + the mobile triple
  {0,0,1} + the verdict semantics) + the drift-probe-tool pins
- D-147a4 ✓ the e2e re-anchors (mobile-navigation [10→11 checks,
  including the exit-animation release polls], landing [the guest wall
  family + the open-redirect guard], auth + crm [the from_url globs],
  the s145 guest-at-390 re-derivation) + the drawer-battery + its pins
- D-147a5 ✓ the four-class re-measurement + the baseline re-anchors
  (incl. F-147c3 baselined as the s148 mirror target) + the
  standingExplained lines + the pins + the mutation-proof ×3 + the
  four drift gates GREEN
- D-147a6 ✓ the captures 313-325 + the VLM battery 3/3 clean
- D-147a7 ✓ the count ladder (2132/151/2283/115) + the line-census
  sites + SKILL v1.144.0 + the §5.4/§5.5 re-derivation + the AGENTS
  Session-147 section + the PAD row + the claim retirement
- D-147a8 ✓ the final gate (lint 0/0 · tsc 0 · 115/2132 · build · e2e
  151/151 · the four drift gates CLEAN ×4 · probe:ref STABLE · census
  MATCH) + the two-commit ship via the SSH wrapper
