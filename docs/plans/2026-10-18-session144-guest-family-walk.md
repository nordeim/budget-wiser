# Session 144 — The Guest-Family Walk (the 144-c rotation)

**Date**: 2026-10-18 · **Repo**: nordeim/neo-crm · **Branch**: main

## The intake

The workspace pulled to `db6ed2a` (the s143 ship `da7a153` + `d8455d6` + the
session_305 transcript commit — the s143 ship session's own log). The
environment standing (node_modules, `.env` DATABASE_URL="file:../db/custom.db",
census MATCH 15/24/10/23/12 + 4 users). The baseline gate GREEN — the exact
s143-ship match: lint 0/0 · tsc 0 · **114/2104 unit** · build · **e2e 146/146
(3.5m)**.

## The audits

- **144-a (the s143 ship verification)**: **13/13 Verified, zero findings** —
  the APP_FOOTER contract (page-layout.ts:219, the byte-censused construction)
  + the AppShell mount after `{children}` inside main (all 11 app pages) + the
  FAQ `max-w-3xl` container with the direct h2 (no inner wrapper) + the AGENTS
  Session-142/143 sections + the PAD session-142/143 rows + SKILL v1.140.0 +
  the project_state session-143 layer + the captures 304-306 + the S16-P1
  scrollDelta-58 re-anchor + the lockstep (the unit suite green with the
  docs-counts family).
- **144-b (the standing battery)**: **10/11 PASS, ONE finding** — the secrets
  scan clean (the tracked Abcd1234 matches are the documented demo login, 1
  site each; no AUTH_SECRET value; `.env` untracked; `.env.example` tracked) ·
  the rate limits standing (10/10/5/20/20) · the (app) layout guard standing ·
  the postcss plugin + the db-path seam + the 7-day TTL · zero dep changes at
  s143 · the drawer e2e battery green inside the 146. **N-144b1 (Medium,
  tooling)**: the STANDALONE `scripts/drawer-battery-390.ts` is stale vs the
  s142 route move — its post-login expectation assumes the CRM shell at `/`,
  but post-login now redirects to the PUBLIC landing (no
  `button[aria-label="Open navigation menu"]` there) — the battery times out
  deterministically at the trigger probe (verified live, reproduced). The
  e2e drawer coverage is intact (the 146 includes it); the standalone tool
  broke — the s142 route-move re-anchor blast radius missed it (the e2e specs
  got `goto("/dashboard")` re-anchors; the script didn't — the same class as
  the s142 docs gap: re-anchors ride the visible carriers, not the tools).
- **probe:ref #116**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901), its CRM-shell
  mobile defect STILL STANDS, landing census STANDING, demo data ZERO. No
  parity event — the rotation track.

## The walk (walk34 — the maiden guest-state census of the marketing family)

The s142/s143 walks censused the marketing family LOGGED-IN; the GUEST state
was never walked (the s142 build's auth posture rode an UNVERIFIED
assumption — its own source comment says "the reference's guest-visible app
shell is a base44 platform artifact we deliberately do not mirror"). This
walk drives both apps' logged-OUT faces: the guest funnel
(landing → footer → About → Contact), the boundary model, the guest chrome.

**The verdict: 3 axes EQUAL (the guest landing face · the landing footer
links · the sitemap listing) · 1 REAL FINDING · 1 decoded platform face:**

- **F-144c1 (High) — THE MARKETING PAGES GATE**: the reference serves
  /About + /Contact to GUESTS — rendered-level verified (the full page
  content: "About NEO CRM" h1, the paragraphs, the cards, "Contact Us" +
  the mailto — with the full app chrome: the 8-link sidebar, the "Hi,
  Guest" topbar with the gray-200 "G" avatar, the app footer). OURS: 307 →
  /login. **The guest funnel breaks**: the public landing's footer links
  About/Contact (pinned by e2e) → login wall on ours, real pages on the
  reference. The s142 "auth-gated per our standing posture" decision was
  built on the wrong decode (the reference's guest shell is NOT an empty
  platform artifact — it renders the marketing content deliberately; the
  platform artifact face is the CRM DATA pages, a different thing).
- **THE DECODED PLATFORM FACE (documented genus, no action)**: the
  reference renders its /Dashboard (and every CRM page) to guests too —
  "Hi, Guest" topbar, the empty shell. Our (app)-group server guard stands
  as the documented fix-over-defect (the data pages stay protected); the
  guest "Open dashboard" CTA → our login wall keeps its s142 e2e pin.

## The remediation (TDD — the pins RED first, then the fixes)

- **D-144a0 — THE DRAWER-BATTERY RE-ANCHOR (N-144b1)**: the script gains
  the post-login `goto("/Dashboard")` before the trigger probe (the s142
  route-move blast-radius completion). Pin: the drawer-battery-tool test
  gains the post-login-navigation pin. Live re-verified GREEN.
- **D-144a1 — THE MARKETING PAGES GO PUBLIC (F-144c1)**: the new
  `(marketing)` route group — `git mv` the four files
  ((app)/about + (app)/contact + the (app)/About + (app)/Contact capital
  aliases → (marketing)/) + the **session-optional group layout**
  (`getSessionUser() ?? APP_GUEST_USER` → the same AppShell chrome; NO
  redirect). The `APP_GUEST_USER` contract in page-layout.ts (name
  "Guest", photoUrl null — the Topbar's own fallback chain renders "Hi,
  Guest" + the "G" gray-200 initial, ZERO Topbar changes). The store
  stays user:null for guests (hydrate's else branch — no slice fetches,
  the CRM links still login-wall). The (app) group's redirect is UNTOUCHED
  (the CRM posture). Pins: the APP_GUEST_USER contract pin + the
  marketing-layout no-gate pin + the (app)-layout redirect contrast pin
  (the freeze) + the 6 landing-page.test.ts read-path re-anchors. e2e:
  the guest About/Contact faces (200, content, "Hi, Guest", the funnel
  from the landing footer, the lowercase canonicals) + the authenticated
  test's comment re-anchored.
- **D-144a2 — THE SWEEP + THE VERIFICATION CHAIN**: the sweep PAGES +about
  +contact (the marketing family's pixel coverage — the s142 landing
  precedent; the maiden baselines ×4 bands) + the walk re-run (the guest
  faces EQUAL both apps) · the full unit suite · lint/tsc · build · e2e ·
  the drawer battery live · the four drift gates CLEAN ×4.
- **D-144a3 — THE DOCS REALIGNMENT**: the count ladder (+ the new pins) ·
  the AGENTS Session-144 section · the PAD session-144 row + totals ·
  SKILL v1.141.0 + the project_state session-144 layer · the CLAUDE
  carriers · the s142 posture-comment corrections (the about/contact
  source comments + the landing.spec header comment — the "empty shell"
  decode fixed) · the session_306 record · the worklog.
- **D-144a4 — THE CAPTURES 307-309 + THE VLM BATTERY**: 307 the guest
  About face (1440, the chrome + Hi, Guest + the content) · 308 the guest
  Contact face · 309 the guest funnel at 390 (the landing footer → the
  About page on the phone).
- **D-144a5 — THE FINAL GATE + THE SHIP**: lint 0/0 · tsc 0 · the unit
  count · build · e2e · the drift gates CLEAN ×4 · census MATCH → the
  two-commit pattern (the feat + the session log) pushed via the SSH
  wrapper to main.

## The walk-harness lessons (L-144c1..c2)

- **L-144c1 the never-walked state**: every parity surface has TWO states
  (logged-in + guest) — the s142 marketing build verified only the
  logged-in face and its guest posture rode an unverified assumption
  about the reference (documented in its own comment). Walk BOTH states
  of every new surface; the auth boundary itself is a parity axis.
- **L-144c2 the re-anchor blast radius of a route move**: the s142 route
  move re-anchored the e2e specs and the test-path carriers but missed
  the standalone tool that assumed the old post-login URL — grep every
  post-login expectation (scripts/ + tests/) when a route moves, not
  just the failing carriers.

## The execution record (filled at ship)

- D-144a0 ✓ the battery post-login goto("/Dashboard") + the
  drawer-battery-tool pin; live re-verified GREEN (the full battery
  chain)
- D-144a1 ✓ the (marketing) route group (the 4 files git-mv'd) + the
  session-optional layout + APP_GUEST_USER; the 9 pins RED at birth →
  the fixes → the mutation-proof (3 drifts → exactly their pins RED);
  the walk re-run: the guest faces EQUAL + the funnel working both
  apps; guest /About + /Contact 200, guest /Dashboard still 307
- D-144a2 ✓ the sweep PAGES +about +contact (the 13-page set; the
  maiden baselines 0.00/0.00 ×3 bands + 0.51/0.51 phone) · 114/2108 ·
  build · e2e 149/149 (+3) · the drawer battery live GREEN · the
  drift gates CLEAN ×4
- D-144a3 ✓ the docs realignment (2108/149/2257 · the lockstep GREEN
  with the login-family e2e-carrier re-anchor + the Appendix B
  landing-row fill [the s142 docs gap #2] + the wall-clock prose ·
  SKILL v1.141.0 + the project_state session-144 layer · the AGENTS
  Session-144 section + the PAD row · the s142 posture-comment
  corrections)
- D-144a4 ✓ the captures 307-309 + the VLM battery 3/3 clean
- D-144a5 ✓ the final gate GREEN + the two-commit ship via the SSH
  wrapper
