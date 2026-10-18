# Session 306 — the session-144 record (the guest-family walk)

## The intake

The workspace pulled to `db6ed2a` (the s143 ship `da7a153` + `d8455d6` +
the session_305 transcript commit — the s143 ship session's own
continuation log). The environment standing (node_modules, `.env` with
DATABASE_URL="file:../db/custom.db", census MATCH 15/24/10/23/12 + 4
users). The four intake docs read (session_304 + the s143 plan + the
repo worklog + session_305). The baseline gate GREEN — the exact
s143-ship match: lint 0/0 · tsc 0 · **114/2104 unit** · build · **e2e
146/146 (3.5m)**.

## The audits

- **144-a (the s143 ship verification)**: **13/13 Verified, zero
  findings** — the APP_FOOTER contract (page-layout.ts:219) + the
  AppShell mount after `{children}` inside main + the FAQ `max-w-3xl`
  container with the direct h2 + the AGENTS Session-142/143 sections +
  the PAD session-142/143 rows + SKILL v1.140.0 + the project_state
  session-143 layer + the captures 304-306 + the S16-P1 scrollDelta-58
  re-anchor + the lockstep (the suite green with the docs-counts
  family).
- **144-b (the standing battery)**: **10/11 PASS, ONE finding** — the
  secrets scan clean (the tracked Abcd1234 matches are the documented
  demo login, one site each; no AUTH_SECRET value; `.env` untracked;
  `.env.example` tracked) · the rate limits standing (10/10/5/20/20) ·
  the (app) layout guard standing · the postcss plugin + the db-path
  seam + the 7-day TTL · zero dep changes · the e2e drawer coverage
  green. **N-144b1 (Medium, tooling)**: the STANDALONE
  `scripts/drawer-battery-390.ts` stale vs the s142 route move — the
  post-login page became the PUBLIC landing (no CRM drawer trigger
  there), so the battery timed out deterministically at the trigger
  probe (verified live, reproduced). The s142 route-move re-anchor
  blast radius missed the standalone tool (the e2e crm specs got
  `goto("/dashboard")`; the script didn't).
- **probe:ref #116**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901), its
  CRM-shell mobile defect STILL STANDS, landing census STANDING, demo
  data ZERO. No parity event — the rotation track.

## The walk (walk34 — the maiden guest-state census of the marketing family)

The s142/s143 walks censused the marketing family LOGGED-IN; the GUEST
state was never walked — the s142 build's auth posture rode an
UNVERIFIED assumption (its own source comment: "the reference's
guest-visible app shell is a base44 platform artifact we deliberately
do not mirror"). The walk drove both apps' logged-OUT faces: the guest
funnel (landing → footer → About → Contact), the boundary model, the
guest chrome. **The verdict: 3 axes EQUAL (the guest landing face ·
the landing footer links · the sitemap listing) · 1 REAL FINDING · 1
decoded platform face:**

- **F-144c1 THE MARKETING PAGES GATE (High)**: the reference serves
  /About + /Contact to GUESTS — rendered-level verified (the full
  content: "About NEO CRM" + the paragraphs + the cards + "Contact Us"
  + the mailto — with the full app chrome: the 8-link sidebar, the
  "Hi, Guest" topbar with the gray-200 "G" avatar
  (text-gray-600 font-semibold), the app footer; the guest funnel
  landing → footer → About → Contact all-200). OURS: 307 → /login —
  the funnel broke at the landing footer's links (the s142 e2e pinned
  those links — the click login-walled). The s142 "auth-gated per our
  standing posture" rode the wrong decode.
- **THE DECODED PLATFORM FACE (documented genus, no action)**: the
  reference renders its /Dashboard (and every CRM page) to guests too
  — the "Hi, Guest" platform face. Our (app)-group server guard stands
  as the documented fix-over-defect; the guest "Open dashboard" CTA →
  our login wall keeps its s142 e2e pin.

## The remediation (TDD — the 9 pins RED first, then the fixes)

- **D-144a0 THE DRAWER-BATTERY RE-ANCHOR (N-144b1)**: the script gains
  the post-login `goto("/Dashboard")` before the trigger probe. Pin:
  the drawer-battery-tool post-login-navigation pin. Live re-verified
  GREEN (the full battery: trigger → open → nav-close → escape-close →
  reopen-before-grow → resize-past-md).
- **D-144a1 THE MARKETING PAGES GO PUBLIC (F-144c1)**: the NEW
  `(marketing)` route group — the four route files git-mv'd
  ((app)/about + (app)/contact + the two capital .jsx aliases) + the
  **session-optional group layout** (`getSessionUser() ?? APP_GUEST_USER`
  → the same AppShell chrome; NO redirect) + the `APP_GUEST_USER`
  contract in page-layout.ts (the Topbar's own fallback chain renders
  "Hi, Guest" + the "G" initial — ZERO Topbar changes; the store stays
  user:null for guests, hydrate's else branch — no slice fetches, the
  CRM links still login-wall). The (app) group's redirect UNTOUCHED
  (the posture freeze — pinned by the contrast pin). Pins: the
  APP_GUEST_USER contract pin + the marketing-layout session-optional
  pin + the (app)-guard contrast freeze + the 6 landing-page.test.ts
  read-path re-anchors. e2e: the guest /About + /Contact + the funnel
  tests (+3) + the authenticated test's comment re-anchored + the
  s142 header-comment decode corrected.
- **D-144a2 THE SWEEP + THE VERIFICATION CHAIN**: the sweep PAGES
  +about +contact (13-page set; the maiden baselines 0.00/0.00 at
  desktop + 0.00/0.00 tablet + 0.00/0.00 landscape + 0.51/0.51 at the
  phone floor) · the walk re-run — **the guest faces EQUAL on every
  visible axis** (h1/content/"Hi, Guest"/the G avatar/the footer — the
  one count axis 16-vs-8 sidebar links is the standing MobileNav DOM
  superset, the documented drawer genus) + the funnel working BOTH
  apps · the full suite **114/2108** · lint 0/0 · tsc 0 · build ·
  **e2e 149/149** · the drawer battery live GREEN · **the four drift
  gates CLEAN ×4**.
- **THE MUTATION-PROOF**: the guest-name drift ("Guest" → "Visitor")
  → exactly 1 RED (the APP_GUEST_USER pin) · the marketing-redirect
  drift → exactly 1 RED (the session-optional pin) · the battery-goto
  removal → exactly 1 RED (the N-144b1 pin) · reverted → GREEN.
- **D-144a3 THE DOCS REALIGNMENT**: the count ladder (UNIT 2104 → 2108
  · E2E 146 → 149 · badge 2250 → 2257 · SUITES unchanged) · the
  lockstep GREEN (the docs-counts constants + the layer-axis pins +
  the CLAUDE carriers + the login-family e2e-carrier re-anchor) ·
  **the s142 docs-gap fill #2**: the Appendix B landing row (the
  per-spec table never listed the landing spec — the totals
  lockstep checks the totals, not the rows) + the wall-clock prose
  138 → 149 · SKILL v1.141.0 + the H1 + the project_state session-144
  layer (the s143 layer beneath) · the AGENTS Session-144 section ·
  the PAD session-144 row + the totals · the s142 posture-comment
  corrections (the about/contact source comments + the landing.spec
  header — the "empty shell" decode fixed).
- **D-144a4 THE CAPTURES 307-309 + THE VLM BATTERY 3/3 CLEAN**: 307
  the guest /About at 1440 (the chrome + "Hi, Guest" + the G avatar +
  the content — VLM 3/3; the below-fold cards/footer verified by the
  DOM census + the e2e, the L-143c1 blind band applies to fullPage
  captures too — the AppShell's internal main is the only scroller) ·
  308 the guest /Contact (VLM 3/3) · 309 the guest /About at 390 (VLM
  4/4 — the hamburger + the single column + zero overflow).

## The walk-harness lessons (L-144c1..c2)

- **L-144c1 the never-walked state**: every parity surface has TWO
  states (logged-in + guest) — the s142 marketing build verified only
  the logged-in face and its guest posture rode an unverified
  assumption documented in its own comment. Walk BOTH states of every
  new surface; the auth boundary itself is a parity axis.
- **L-144c2 the re-anchor blast radius of a route move**: the s142
  route move re-anchored the e2e specs and the test-path carriers but
  missed the standalone tool that assumed the old post-login URL —
  grep every post-login expectation (scripts/ + tests/) when a route
  moves, not just the failing carriers.

## The ship

The final gate: lint 0/0 · tsc 0 · **114/2108** · build · **e2e
149/149** · the drift sweep CLEAN ×4 (the 13-page set) · census MATCH.
The two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim; the dry-run then the real push; remote-verified; the
keys shredded).
