# Session 308 — the session-145 record (the auth-transition family walk)

## The intake

The workspace re-cloned at `205dac4` (the s144 ship `3ffb005` +
`4174e3b` + the session_307 transcript — the s144 ship session's own
log). The environment re-stood (bun install 533 pkgs, `.env` with
DATABASE_URL="file:../db/custom.db", db push + seed, census MATCH
15/24/10/23/12 + 4 users; the fresh sandbox's Playwright chromium
re-installed). The four intake docs read (session_306 + the s144 plan +
the repo worklog + session_307). The baseline gate GREEN — the exact
s144-ship match: lint 0/0 · tsc 0 · **114/2108 unit** · build · **e2e
149/149 (3.4m)**.

## The audits

- **145-a (the s144 ship verification)**: **14/14 Verified, zero
  findings** — the (marketing) route group (the four route files + the
  session-optional layout `getSessionUser() ?? APP_GUEST_USER`, NO
  redirect) + the APP_GUEST_USER contract (name "Guest", photoUrl null)
  + the (app) guard untouched (`redirect("/login")`) + the
  drawer-battery post-login goto("/Dashboard") re-anchor (line 95) ·
  the sweep PAGES +about +contact (the 13-page set) + the captures
  307-309 + the e2e guest tests (+3) + the LIVE guest boundary
  (standalone-server curls: guest /about 200 · guest /contact 200 ·
  guest /dashboard 307 → /login · the "Hi, Guest" + the "G" avatar in
  the SSR HTML) + SKILL v1.141.0 + the project_state session-144 layer
  + the PAD session-144 row + the AGENTS Session-144 section + the
  CLAUDE carriers (2108/149) + `.env.example` tracked and matching.
- **145-b (the standing battery)**: **11/11 PASS, zero findings** — the
  secrets scan clean (the tracked Abcd1234 matches are the documented
  demo login, docs/tests only; src/ zero; `.env` untracked; `.env
  .example` tracked) · the rate limits standing (10/10/5/20/20) · the
  (app) guard standing · the postcss plugin + the 7-day TTL + the
  db-path seam · zero dep changes at s144 (package.json/bun.lock
  unchanged db6ed2a..HEAD) · the vitest + playwright configs intact ·
  the sitemap (+about +contact at 0.8, `/` at 1.0) + robots standing.
- **probe:ref #117**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901), its
  CRM-shell mobile defect STILL STANDS (TRUE-390 /Dashboard: nav 0/0/no
  menu buttons), landing census STANDING, demo data ZERO. No parity
  event — the rotation track.

## The walk (walk35 — the maiden census of the auth-boundary transition family)

The session_307 "next" hint: "a fresh-eyes walk of the login/signup
guest→auth transition flows (the last barely-walked surface family)".
The walk drove both apps through the full guest→auth→guest round-trip
in the current s142+ route landscape. **The verdict: 7 axes EQUAL · 3
axes documented-genus · ZERO real findings:**

- **The landing's LOGGED-IN face (the maiden census)**: both apps
  session-STATIC — the reference post-login lands on `/` with the
  IDENTICAL guest face (the same nav: Features/Preview/Pricing/FAQ/
  Contact/"Open dashboard", no user indicator, no Login→swap, no
  account affordance); ours the same (live-verified both).
- **The post-login redirect transition**: EQUAL — both apps' `/login`
  submit → `/` (the reference live-observed; ours the s142 re-anchor +
  the e2e auth.setup `waitForURL("/")`).
- **The login card's guest face + the error state**: EQUAL
  (live-verified both: "Welcome to NEO CRM" + "Continue with Google" +
  "OR" + the field pair + "Sign in" + "Forgot password?" + "Need an
  account? Sign up"; the "Invalid email or password" alert in the same
  position).
- **The /login authed-visitor face**: EQUAL — both apps pure-render the
  login card to authenticated visitors (the s23-P2 retirement).
- **The /signup route**: GENUS — the reference 404s `/signup` (its
  signup is the login card's in-place view); ours the documented
  working superset (s10, e2e-pinned).
- **The logout transition**: GENUS-consistent — the reference's Logout
  keeps the user on `/dashboard` which re-renders its guest platform
  face ("Hi, Guest" + the zero-data dashboard — the documented no-guard
  genus); OURS `router.push("/login")` — the (app)-guard posture's
  client expression (a logged-out user hitting any CRM page gets the
  guard's 307 anyway).
- **The guest marketing pages at 390 (the maiden phone census)**: the
  reference's guest /About at 390 renders NO navigation affordance at
  all (the sidebar hidden w=0, NO hamburger — only the "G" account
  button + the content + the footer: the standing CRM-shell mobile
  defect extends to its guest-served app pages); OURS the working
  drawer (the hamburger + the 8-link MobileNav — the headline fix
  extends to the guest marketing pages). The account button at 390
  pixel-EQUAL (the "Hi, Guest" span w=0 hidden on BOTH apps — the G
  avatar 32px + the chevron 16px; ours adds the aria-label superset).

## The remediation (the pin-only session — the s136/s140 pattern)

Zero findings to fix; FIVE never-pinned axes frozen (TDD — the pins
GREEN at birth, the mutation-proof the verification):

- **D-145a0 THE UNIT PINS ×4** (all in EXISTING files): the landing
  COMPONENT's session-static contract (landing-page.test.ts — no
  session reads, no store, no signed-in affordances; freeze the walk35
  maiden decode) · the logout transition contract (page-layout.test.ts
  — the topbar's logout onSelect → `router.push("/login")` + the
  negatives: never `/`, never a CRM page) · the post-login redirect
  target (login-views.test.ts — `router.push("/")` on BOTH submit
  sites; the negatives: never the dashboard, never a deep page; the
  s142 re-anchor source-frozen where it was e2e-only) · the /login +
  /signup pure-render (login-views.test.ts — no getSessionUser, no
  redirect, no navigation import, comments stripped per the s21/s22
  own-doc-comment hazard).
- **D-145a1 THE E2E PIN**: the guest 390 drawer on the marketing pages
  (landing.spec.ts — the hamburger + the drawer open + all 8 links on
  the guest /About + the drawer's Dashboard link login-walling at the
  (app) guard; the greeting-text-hidden-below-sm + the G-avatar
  phone-face contract). RED at birth on the first draft's wrong
  expectation (the "Hi, Guest" text visible at 390 — the walk's own
  pixel census had decoded it hidden on BOTH apps) → the expectation
  re-derived from the census → GREEN.
- **D-145a2 THE MUTATION-PROOF ×4**: the landing session-read drift →
  exactly 1 RED · the logout target drift (/login → /) → exactly 1 RED
  · the post-login redirect drift (/ → /dashboard) → exactly 1 RED ·
  the login-page redirect re-introduction → exactly 1 RED — each
  reverted → GREEN (272/272 in the three pin suites).
- **N-145a1 THE S144 DOCS-GAP #3 (Medium, docs)**: the page-layout
  census site (SKILL §5.6 + the PAD module table) stale — 1631 lines /
  193 checks vs the LIVE 1653/196 at the s144 ship (the s144
  APP_GUEST_USER contract added +22 lines +3 its; the s144 realignment
  updated the count ladder but missed this module-census site — the
  same class as the s143 F-143a3 docs-gap and the s142 Appendix-B row).
  Filled at D-145a3 (1653/197 — the s145 logout pin grew the checks).
- **D-145a3 THE DOCS REALIGNMENT**: the count ladder (UNIT 2108 → 2112
  · E2E 149 → 150 · badge 2257 → 2262 · SUITES unchanged 114) · the
  docs-counts lockstep GREEN 21/21 (the constants + the layer-axis pins
  [the s145 head + the s144 second layer] + the page-layout census
  1653/197 + the negatives ladder's 1631/193 forms) · the AGENTS
  Session-145 section · the PAD session-145 row + the totals · SKILL
  v1.142.0 + the H1 + the project_state session-145 layer (the s144
  layer beneath) · the CLAUDE carriers · the README badge + Tested row
  + the file-tree + commands sites · the PAD HEAD/file-tree/checklist/
  commands sites · the session_308 record + the plan execution record
  + the worklog.
- **D-145a4 THE CAPTURES 310-312 + THE VLM BATTERY 3/3 CLEAN**: 310
  the reference's guest /About at 390 (the decoded NO-nav defect face —
  VLM: no hamburger, no sidebar, only the G avatar; the Base44 edit
  badge the platform artifact) · 311 ours at 390 (the hamburger + the G
  avatar + the content + zero overflow) · 312 our drawer OPEN on the
  guest /About (the overlay + the scrim + all 8 links + the close
  button + zero 390 overflow).

## The walk-harness lessons (L-145c1..c2)

- **L-145c1 the transition targets ride the route landscape**: the s126
  login-family re-walk predates the s142 route move — its transition
  targets were re-anchored at s142, but the never-walked states (the
  landing's logged-in face, the logout target, the authed /login) had
  no census at all. A route landscape change re-opens the transition
  family even when no bundle changes.
- **L-145c2 the pin-only session still ships pins**: a zero-finding
  walk is not a no-op — the maiden census axes (the session-static
  landing, the logout target, the pure-render) ride only comments and
  the e2e's incidental coverage; the freeze pins are the walk's durable
  artifact.

## The ship

The final gate: lint 0/0 · tsc 0 · **114/2112** · build · **e2e
150/150** · the drift sweep CLEAN ×4 (the 13-page set) · census MATCH.
The two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim; the dry-run then the real push; remote-verified; the
keys shredded).
