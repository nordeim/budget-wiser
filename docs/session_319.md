# Session 319 — the session-150 record (the marketing phone-state walk + the leading-genus closure)

## The intake

The workspace RESET (the sandbox re-provisioned — the clone absent) —
re-cloned at `9127928` (the s149 feat `59f1462` + the session_317 log
`115ec80` + the owner's `9127928` = the session_318 transcript). The
environment re-stood: `bun install` (533 pkgs) · `.env` from
`.env.example` (`DATABASE_URL="file:../db/custom.db"` — the root
contract; `AUTH_SECRET` generated) · `db:push` + `db:seed` · census
MATCH (15/24/10/23/12 + 4 users) · the Playwright chromium · the dev
server :3000. **The s149 worklog gap filled first** — the prior
session was interrupted at its final step (session_318 line 94: "the
final step: the worklog record" — then the transcript ends; the repo
worklog ended at the s148 record); the Task ID 149 record appended
verbatim from the s149 commit + session_317. **A SECOND sandbox reset
hit mid-session** (at the docs phase) — the verified change-set
re-applied from durable patch scripts (the s148 pattern), the
environment re-stood, the verification chain re-run in full.

## The audits

- **150-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **116/2167**
  · build · **e2e 152/152** (first run, no flake) — the EXACT s149-ship
  match.
- **150-b**: **probe:ref #124 STABLE** at the s147/s148/s149
  fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576) · the
  demo data ZERO rows · the TRUE-390 mobile triple STANDING {0, 0, 1}
  (the mobile-nav parity holds; the drawer battery GREEN) · the four
  viewport drift gates CLEAN ×4 · **the fullpage gate CLEAN** (desktop
  4990/4990 @ 0.093% · phone 7259/7259 @ 0.316% — the exact s149-ship
  values) · sitemap 11 routes + robots + the SEO meta · the tree clean
  (`.env` untracked, the `.env.example` AUTH_SECRET empty) · zero dep
  changes.

## The walk (walk40 — 6 probe passes; the session_317 rotation candidates)

- **PASS 1 THE LEADING-GENUS FAMILY CENSUS**: the s148/s149 v4 genus
  (a base `leading-*` loses to a responsive `sm:text-*` on the
  reference's build — the text-PAIRING renders at ≥sm) is **CLOSED**:
  exactly **3** responsive-text + base-leading combos exist in src/
  (the landing hero h1/p + the preview-row p), all carrying the
  computed-equal pins (`sm:leading-none` · `sm:leading-[28px]` ·
  `sm:leading-6`). The about/contact `leading-relaxed` carriers are
  OUT of the family BY MECHANISM (no responsive text-size token) —
  verified live: their paragraphs compute lh 26px/20px identically on
  both apps at 1920 AND 390 (tops/heights byte-equal).
- **PASS 2 THE INTERNAL-SCROLLER BLIND SPOT (L-150c1)**: /about +
  /contact do NOT scroll at desktop (scrollH=1080 = the viewport — no
  blind spot), but at phone they scroll **INSIDE the shell's
  `main.overflow-auto`** (the h-screen contract — doc scrollH=844 on
  both; content to y≈1614): the surface a fullPage capture
  structurally cannot see — the second face of the L-149c1 lesson.
  The full-geometry census: **/about main.scrollHeight 1731 = BOTH
  apps** (24 vs 24 elements — every h/p/a/svg/card top+height EQUAL,
  0 diffs) · **/contact 897 = BOTH** (18 vs 18, 0 diffs) —
  geometry-equal + classes-equal ⇒ pixel-equal (the walk39 pattern).
  **The marketing phone-state axis is CLEAN.**
- **PASS 3/3b/3c THE SETTINGS PHONE-SHARE BAND DECOMPOSITION** (the
  named candidate; the s146 dead-slack audit): the live pair diffs
  6.077% at the probe hour — **all 7 bands = picklist row-TEXT/
  row-count DATA differences** (the reference's live values:
  Call/Email/Website/Partner/Referral/New/Contacted/Qualified/
  Technology/Financial Services/Healthcare/Energy/A/B/C/D…), **ZERO
  layout bands** (the census indices 0-19 aligned + EQUAL — the
  shell/tabs/defaults zone clean; the card template identical: the
  62px row spacing, the add-row construction, the 53px footer). The
  sweep's own saved gate pair: **3.633%** — within the 3.8 baseline,
  the gate correctly CLEAN.
- **THE NEW FINDING — THE REFERENCE'S PICKLIST DATA IS LIVE-EDITED
  INTRADAY (L-150c2)**: the ref-vs-ref re-capture (the 07:45 gate
  capture vs a fresh one ~40 min later) drifted **2.653%** (one band
  y=789-834 — a card-boundary shift) — the owner edits their
  workspace during the day; the ours-vs-ref share wobbled 3.63 → 6.08
  across the same window. The volatile-data genus is REAL-TIME, not
  session-to-session. The standing treatment CONFIRMED (absorb into
  baselines, never mirror); the tripwire stays TIGHT (the s146
  doctrine — the wobble is absorbed by the decode protocol, never the
  margin); a settings-class trip is FIRST adjudicated by the
  ref-vs-ref idiom before any defect claim.

**ZERO REAL PARITY DEFECTS** — the pin-only session (the s134/s137/
s145 pattern).

## The remediation (TDD — the pin ledger)

- **D-150a1 `tests/leading-inert-genus.test.ts` (NEW, +4 its)**: the
  family-closure invariant — a source scanner over every src .tsx
  class string: any element carrying BOTH a responsive text-size
  token and a base `leading-*` MUST carry a responsive `leading-*`
  pin (the genus cannot recur silently) · the enumerated-three · the
  s148/s149 pin re-asserts · the about/contact exemption. Born
  GREEN; the mutation-proof ×2 the RED proof (the planted about-h1
  combo → exactly 3 RED; the stripped preview pin → exactly 2 RED;
  both reverted → GREEN).
- **D-150a2 `tests/e2e/marketing-mobile.spec.ts` (NEW, +1 e2e)**: the
  walk40 scroll model made standing — the doc NEVER scrolls (844)
  while main carries the content internally (scrollH > viewport) ·
  docScrollW=390 exact · the /about census (3 intro p's + 4 cards +
  the get-in-touch link) · the /contact census (2 cards + the email
  link + the 3 socials + their hrefs). The intro-paragraph selector
  re-derived live after the text-filter false-RED (the class-derived
  `.space-y-4 > p` census idiom — the s106 lesson: pin counts +
  class-derived values, never text-rasterized sums).
- **D-150a3 the sweep documentation**: the `standingExplained` phone
  line + the `STANDING_BASELINES.phone.settings` comment carry the
  LIVE-EDITED-INTRADAY note + the ref-vs-ref adjudication idiom. The
  sweep-tool pins: the 2 s150 its RED at birth → GREEN with the edit.
- **D-150a4 the count ladder**: UNIT 2167 → **2173** (+6: the 4
  genus-file + the 2 sweep-tool its) · SUITES 116 → **117** · E2E
  152 → **153** · badge 2319 → **2326** · the 8→9 spec-file pins ·
  the CLAUDE-carrier pins flipped (dialog-geometry ×4 +
  login-family +1) · the layer-axis pin flipped to the s150 head
  (2173/153, the s149 layer beneath at 2167/152) · the SKILL
  v1.146.0 → **v1.147.0** + the s150 layer + the Appendix B rows +
  the wall-clock phrase (the unpinned 151 site — the s150 fill).

## The verification

lint 0/0 · tsc 0 · **117/2173** · build · **e2e 153/153** (the
definitive run) · the four viewport gates CLEAN ×4 · the fullpage
gate CLEAN (the fresh-dev-server house order — the s149
dev-indicator lesson) · census MATCH · **the VLM battery 2/2** (the
about pair + the contact pair — both identical except the "Edit with
Base 44" pill, the standing genus; a nuance decoded: the pill rides
FRESH page loads regardless of session state — the SPA-navigating
sweeps structurally never see it, the same structural invisibility
as the s149 guest-chrome decode). The captures 341-344 (the
about/contact phone pairs).

## The ship

The docs realignment (the AGENTS Session-150 section · the PAD
session-150 row · this record + the plan execution record + the
worklog Task ID 150 — the s149 gap-fill record preceding it). The
two-commit pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim; the dry-run then the real push; remote-verified; the
key shredded).

**Next**: the standing genera left are the settings picklist-DATA
genus (now with the LIVE-intraday documentation + the ref-vs-ref
adjudication idiom), the login logo genus, the s95 landscape
accounts overflow genus, and the fullpage pill genus. The rotation
candidates: the login logo genus re-decoded live (its
constant-absolute-px claim re-derived against the current reference
build), or the second-cycle re-walk of the earliest marketing-family
members (the s142 landing census is 8 sessions old), or the
internal-scroller axis extended to the app pages' phone interiors
(a geometry census like PASS 2 across the 10 CRM pages — the surfaces
the DOM walks covered at the family level but never in one uniform
sweep).
