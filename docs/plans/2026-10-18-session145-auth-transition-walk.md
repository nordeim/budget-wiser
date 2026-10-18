# Session 145 — The Auth-Transition Family Walk (the 145-c rotation)

**Date**: 2026-10-18 · **Repo**: nordeim/neo-crm · **Branch**: main

## The intake

The workspace re-cloned at `205dac4` (the s144 ship `3ffb005` + the
session_306 record `4174e3b` + the session_307 transcript `205dac4` — the
s144 ship session's own log). The environment re-stood (bun install, `.env`
DATABASE_URL="file:../db/custom.db", db push + seed, census MATCH
15/24/10/23/12 + 4 users; Playwright chromium re-installed for the fresh
sandbox). The four intake docs read (session_306 + the s144 plan + the repo
worklog + session_307). The baseline gate GREEN — the exact s144-ship match:
lint 0/0 · tsc 0 · **114/2108 unit** · build · **e2e 149/149 (3.4m)**.

## The audits

- **145-a (the s144 ship verification)**: **14/14 Verified, zero findings** —
  the (marketing) route group (the four route files + the session-optional
  layout `getSessionUser() ?? APP_GUEST_USER`, NO redirect) + the
  APP_GUEST_USER contract (name "Guest", photoUrl null) + the (app) guard
  untouched (`redirect("/login")`) + the drawer-battery post-login
  goto("/Dashboard") re-anchor + the sweep PAGES +about +contact + the
  captures 307-309 + the e2e guest tests (+3) + the live guest boundary
  (guest /about 200 · guest /contact 200 · guest /dashboard 307 → /login ·
  the "Hi, Guest" + G avatar in the SSR HTML) + SKILL v1.141.0 + the
  project_state session-144 layer + the PAD session-144 row + the AGENTS
  Session-144 section + the CLAUDE carriers (2108/149).
- **145-b (the standing battery)**: **11/11 PASS, zero findings** — the
  secrets scan clean (the tracked Abcd1234 matches are the documented demo
  login, docs/tests only; src/ zero; `.env` untracked; `.env.example`
  tracked) · the rate limits standing (10/10/5/20/20) · the (app) guard
  standing · the postcss plugin + the 7-day TTL + the db-path seam · zero
  dep changes at s144 (package.json/bun.lock unchanged db6ed2a..HEAD) · the
  vitest + playwright configs intact · the sitemap (+about +contact at 0.8)
  + robots standing.
- **probe:ref #117**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901), its CRM-shell
  mobile defect STILL STANDS (TRUE-390 /Dashboard: nav 0/0/no menu buttons),
  landing census STANDING, demo data ZERO. No parity event — the rotation
  track.

## The walk (walk35 — the maiden census of the auth-boundary transition family)

The session_307 "next" hint: "a fresh-eyes walk of the login/signup
guest→auth transition flows (the last barely-walked surface family)". The
walk drove both apps through the full guest→auth→guest round-trip in the
current s142+ route landscape (the marketing layer changed the transition
targets at s142; the s126 login-family re-walk predates it). **The verdict:
7 axes EQUAL · 3 axes documented-genus · ZERO real findings:**

- **The landing's LOGGED-IN face (the maiden census)**: both apps
  session-STATIC — the reference post-login lands on `/` with the IDENTICAL
  guest face (the same nav, the same "Open dashboard" CTA, no user
  indicator, no Login→swap); ours the same (the component documents "auth
  state does not change a single class").
- **The post-login redirect transition**: EQUAL — both apps `/login` submit
  → `/` (the reference live-observed; ours the s142 re-anchor + the e2e
  auth.setup `waitForURL("/")`).
- **The login card's guest face + the invalid-credentials error state**:
  EQUAL (live-verified both apps: "Welcome to NEO CRM" + "Continue with
  Google" + "OR" + the field pair + the "Invalid email or password" alert
  in the same position).
- **The /login authed-visitor face**: EQUAL — both apps pure-render the
  login card to authenticated visitors (the s23-P2 retirement; the
  reference's own platform behavior).
- **The logout transition**: GENUS-consistent — the reference's Logout
  stays on `/dashboard` rendering its guest platform face ("Hi, Guest" +
  the zero-data dashboard, the documented no-guard genus); OURS
  `router.push("/login")` — the (app)-guard posture's client-side
  expression (a logged-out user hitting any CRM page gets the guard's 307
  anyway; the push is the same posture, one hop earlier).
- **The /signup route**: GENUS — the reference 404s `/signup` (its signup
  is the login card's in-place view); ours the documented working superset
  (s10, pinned by e2e).
- **The guest marketing pages at 390 (the maiden phone census)**: the
  reference's guest /About at 390 renders NO navigation affordance at all
  (the sidebar hidden, NO hamburger — only the "G" account button + the
  content + the footer: the standing CRM-shell mobile defect extends to
  its guest-served app pages); OURS the working drawer (the hamburger +
  the 8-link MobileNav — the headline fix extends to the guest marketing
  pages, the s144 AppShell decision carrying the fix). The account button
  at 390 pixel-EQUAL (the "Hi, Guest" span w=0 hidden on both; the 32px G
  avatar; the 16px chevron — ours adds the aria-label superset).

## The remediation (the pin-only session — the s136/s140 pattern)

Zero findings to fix; FIVE never-pinned axes to freeze (the walk35 decode
is the pins' justification):

- **D-145a0 THE UNIT PINS ×4**:
  1. the landing COMPONENT's session-static contract (landing-page.tsx: no
     session reads — freeze the walk35 maiden decode: both apps' landings
     render the identical face for guests AND logged-in users)
  2. the logout transition contract (topbar.tsx: the logout onSelect →
     `router.push("/login")` — the posture-fix transition target)
  3. the post-login redirect target (login-card.tsx: `router.push("/")` on
     both submit sites — the s142 re-anchor frozen at the source level)
  4. the /login + /signup pure-render (both page sources: no getSessionUser
     import, no redirect call — the s23/s67 retirements frozen)
- **D-145a1 THE E2E PIN**: the guest 390 drawer on the marketing pages —
  a 390-viewport guest test (the hamburger visible + the drawer opens with
  the 8 links on the guest /About; the reference ships NO nav affordance
  there — the fix-over-defect extended to the guest family).
- **D-145a2 THE MUTATION-PROOF**: each pin's drift → exactly 1 RED →
  reverted → GREEN (the house freeze-pin pattern).
- **D-145a3 THE DOCS REALIGNMENT**: the count ladder (UNIT 2108 → 2112 ·
  E2E 149 → 150 · badge 2257 → 2261 · SUITES unchanged) · the AGENTS
  Session-145 section · the PAD session-145 row + totals · SKILL v1.142.0 +
  the project_state session-145 layer · the CLAUDE carriers · the
  session_308 record · the plan execution record · the worklog.
- **D-145a4 THE CAPTURES + THE VLM BATTERY**: 310 the reference's guest
  /About at 390 (the decoded NO-nav defect face — the documentary pair)
  · 311 our guest /About at 390 (the working drawer) · 312 our drawer
  OPEN on the guest /About at 390 (the 8 links).
- **D-145a5 THE FINAL GATE + THE SHIP**: lint 0/0 · tsc 0 · the unit count
  · build · e2e · the four drift gates CLEAN ×4 · census MATCH → the
  two-commit pattern pushed via the SSH wrapper to main.

## The walk-harness lessons (L-145c1..c2)

- **L-145c1 the transition targets ride the route landscape**: the s126
  login-family re-walk predates the s142 route move — its transition
  targets (the post-login redirect) were re-anchored at s142, but the
  never-walked states (the landing's logged-in face, the logout target,
  the authed /login) had no census at all. A route landscape change
  re-opens the transition family even when no bundle changes.
- **L-145c2 the pin-only session still ships pins**: a zero-finding walk
  is not a no-op — the maiden census axes (the session-static landing, the
  logout target, the pure-render) ride only comments and the e2e's
  incidental coverage; the freeze pins are the walk's durable artifact.

## The execution record (filled at ship)

- D-145a0 ✓ the four unit pins (landing-page + page-layout +
  login-views, all EXISTING files); GREEN at birth (the pin-only
  pattern); the mutation-proof ×4 — each drift → exactly 1 RED →
  reverted → GREEN (272/272 in the three suites)
- D-145a1 ✓ the guest 390 drawer e2e (landing.spec.ts; RED at birth on
  the first draft's wrong greeting-text expectation → re-derived from
  the walk's pixel census [the "Hi, Guest" span w=0 hidden on BOTH
  apps at 390] → GREEN; the full suite e2e 150/150)
- D-145a2 ✓ the mutation-proof ×4 (the session-read drift · the logout
  target drift · the post-login redirect drift · the login-redirect
  re-introduction — each exactly its pin RED alone)
- D-145a3 ✓ the docs realignment (2112/150/2262 · the lockstep GREEN
  21/21 · the AGENTS Session-145 section · the PAD session-145 row +
  totals · SKILL v1.142.0 + the project_state session-145 layer · the
  CLAUDE/README/PAD carriers · N-145a1 the page-layout census fill
  1631/193 → 1653/197 [the s144 docs-gap #3] · the session_308 record
  + the plan record + the worklog)
- D-145a4 ✓ the captures 310-312 + the VLM battery 3/3 clean
- D-145a5 ✓ the final gate GREEN (lint 0/0 · tsc 0 · 114/2112 · build
  · e2e 150/150 · the drift gates CLEAN ×4 · census MATCH) + the
  two-commit ship via the SSH wrapper
