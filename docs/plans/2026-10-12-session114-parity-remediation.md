# Session-114 Parity Remediation Plan (2026-10-12)

Session 114 on `main` @ `0470815` (the s113 ship `f10cee6` + the follow-ups
`7111709` [session_238+239] and `0470815` [session_240, upstream]). The
workspace STOOD (no reset): environment verified in place (`.env` with
`DATABASE_URL="file:../db/custom.db"`, `db/custom.db` + `db/e2e.db`
standing, `node_modules` standing, the Playwright browsers standing); the
scandihaven pattern repo standing (d4789c3 — re-verified on-pattern). Every
op under `env -u DATABASE_URL` (the shell's stray hazard, re-confirmed at
intake). The repo `skills/` folder excluded from checking/testing/
compilation throughout.

## Baseline gate (stepwise)

- lint 0/0 ✓ · tsc 0 ✓ · 109 files / 1946 tests ALL PASSING (14.84s) ✓ ·
  build ✓ · 137/137 e2e fresh CI=1 (3.2m, zero flakes) ✓ — exactly the
  s113 ship state.

## The audits

- **114-a (subagent)**: the s113 ship delta (`ef06550..f10cee6` +
  `7111709` + the upstream `0470815` existence) **GENUINE 10/10** — the
  TWO src files + the four test files + the five docs + the s113 plan +
  the four captures + session_237 + the worklog verified hunk-by-hunk;
  the non-vacuousness reasoned (both new its RED against the pre-fix
  src); the full suite 109/1944+2=1946 reproduced live. **ZERO real
  findings** (7 record-only notes: the 2-sites-vs-3-expects phrasing, a
  SKILL "POPOUR" typo, the "amburger" drafting genus, the doc-borne 185
  census, the MENU it's broader closing expect, the unnamed 243/243
  arithmetic, the same-day `last_updated`).
- **114-b (subagent)**: the standing-layers audit **9/9 PASS — ZERO real
  findings** (~71st consecutive). The SEO/sitemap live check 6/6 on the
  standing standalone build (scratch db, PORT 3127, killed + cleaned):
  the sitemap's 9 lowercase URLs + `application/xml` · robots' Sitemap
  line · the manifest JSON · the 405-char meta description · /login's
  OG/Twitter set · /accounts' canonical. The drawer battery **10/10 exit
  0 at TRUE 390×844**. design-tokens 15/15 · the vocabulary pair 6/6 ·
  config zero drift (the postcss plugin + no tailwind.config + the pinned
  e2e db) · census MATCH (15/24/10/23/12 + 4 users) · the Tailwind v4
  layer byte-standing (137 token lines, zero var() chains, the
  shadow-sm/blur-sm re-pins) · the reference-defect ledger unchanged ·
  the skills/ exclusion verified in all four configs.

## The live verification (pre-plan, orchestrator-run)

- **probe:ref**: bundle `index-DZ-xbrIm.js` md5 `a70a637fcf1d4291da8e
  0d965676dc11` (1,631,071 bytes) **STABLE — the 85th consecutive**;
  census: demo zero · desktop 256px/8 STANDING · the mobile-nav defect
  STANDS at TRUE 390 (the 35th consecutive — the reference's own bug,
  our drawer the superset).
- **The four standing drift gates CLEAN** (desktop 1440 · phone 390 ·
  tablet 768 · landscape 1024, each --fail-on-drift; the seed restored
  after each) + the closing census MATCH.

## The rotation (114-c) — THE PROFILE + SETTINGS DATA-TAB FAMILY LIVE WALK

The s113 close (session_240) offered three candidates: the settings
Data-tab export/import family, the profile photo interaction family, or a
sidebar/topbar chrome re-walk. The scout (two throwaway two-app probes,
`scripts/s114-scout.ts` + `s114-scout2.ts` — deleted before ship) settled
it: the **chrome re-walk ELIMINATED** (the sidebar/topbar ride every
pixel sweep at all four viewports every session — the drift gates are its
standing live walk), and the other two candidates are ONE INTERLOCKED
WALK (the Data tab IS the settings surface; the Profile photo family is
the personal-data face — both personal-workspace surfaces never
live-walked). The scout also settled the Data-tab download axis in one
pass: the three CSV templates download **md5-IDENTICAL** on both apps
(contacts 2e3e2317… · accounts cf586ec4… · leads 6f067903… — byte-exact
filenames + contents), and the reference's exports at its zero-data state
are **EMPTY files** (`contact_2026-10-12.csv` 0 bytes — the s26 live
verification re-confirmed; ours dump the seeded rows per the s26-P4
bundle-decoded contract).

The ANALYZE (this session, pre-plan): four throwaway walk scripts
(repo-internal, deleted before ship) drove BOTH apps through the family
ladder — the /Profile surface (the header, the grid, the Personal
Information card, the avatar, the camera button, the four labels +
inputs, the Save button, the four side cards) at 1440×900 + 390×844, the
interaction battery (the camera → filechooser · the name-edit + Save
round-trip · the photo upload round-trip), and the settings Data tab
(the three cards + the seven buttons + the Danger Zone ladder + the
tablist→panel gap) at 1440 — four extraction iterations (the card
selector `rounded-lg` vs `rounded-xl`; the truncated shadow/class slices;
the unresolved-filechooser page freeze; the pass-3 missing login), every
candidate adjudicated against the source contracts + the live computed
styles.

### THE RESULT — the family is in near-complete live parity, with one visual find + one construction find

- **The /Profile surface** — geometry byte-identical at BOTH widths (the
  grid 896×594 @1440 · 358×1236 @390; the personal card 589×594 ·
  358×654; the four side cards 283×224/98/98/98 · 358 same; the avatar
  96/80 with the blue-100 inner + the 48/40 stroke-2 user glyph; the
  camera button 159×36 @537,312; the nameGap 12 label-bottom →
  input-top; the helper texts 'JPG, PNG or GIF. Max 5MB.' + 'Email
  cannot be changed'; docScrollW 1440/390 contained); the computed
  styles equal on every axis (the cards white / 1px #e5e5e5 / 12px /
  the two visible shadow layers; the camera white/#e5e5e5/6px; the Save
  rgb(23,23,23)/rgb(250,250,250)/6px); the label census identical
  (Profile Picture bare · Full Name for=display_name · Email · Role —
  all `<label>` with the stock classes); the input census identical
  (text/email/text · the same values · readOnly false · the same
  placeholders); the side chips computed-identical (48×48 ·
  219,234,254/37,99,235 · 220,252,231/22,163,74 · 243,232,255/147,51,234
  — ours span+inline-style, the reference div+classes, the s73
  computed-equal mechanism); the shadows' transparent prepends the
  documented v4 serialization noise.
- **The interaction battery** — the camera click opens the FILE CHOOSER
  on both apps (the hidden `input[type=file]` accept="image/*" census
  identical); the upload round-trip works on both (ours: POST
  /api/upload 200 → the avatar preview swaps to `/api/uploads/<uuid>.png`
  + the "Photo uploaded successfully" toast; the reference: its base44
  files API → the preview swaps — its toast auto-dismissed inside the
  scan window, the s30 bundle decode the vocabulary contract); the save
  round-trip **unconditional on both** (disabledBefore false — the s62
  decode live-confirmed; ours PATCH /api/users → the 500ms reload →
  /Profile + the h1; the reference PUT …/entities/User/me → same
  reload — the platform-endpoint difference the documented s72
  equivalent).
- **The settings Data tab** — the three cards byte-computed-equal (the
  Import 1120×160 + the Export 1120×160: white/#e5e5e5/12px, the seven
  buttons' texts identical); the tablist→panel gap **24 on both** (the
  panel's mt-2 collapsing against the wrapper's space-y-6 — the
  documented tabs.tsx semantics, live-verified); the Data-tab downloads
  md5-identical (the scout); the tabpanel class strings equal-modulo
  order (ours PANEL_BASE+className, the reference className-first — the
  s86 ordering noise).

### The finds (adjudicated)

- **D-114a1 (REAL, visual — the Danger Zone description font)**: the
  reference renders its Danger Zone warning line as `text-sm
  text-red-600` (live-measured 14px/20px, line h=20, card 1120×**240**);
  OURS renders `text-red-600` alone (16px/24px, line h=24, card
  1120×**244**) — the `SETTINGS_DANGER.desc` token at
  `src/lib/page-layout.ts:502` is missing `text-sm`. The +4px propagates
  the whole inner ladder (+4 on the body, the label, the input, the
  button). The s26 live DOM probe recorded the line as a bare
  `text-red-600` DIV — the probe missed the `text-sm` (the s112
  D-112a1 genus: our pin predates / under-read the reference's current
  construction). NOT caught by the drift sweeps (they sweep the DEFAULT
  settings tab, never the Data tab). THE FIX: `desc: "text-red-600"` →
  `desc: "text-sm text-red-600"` (byte-matching the reference's current
  string) + the s114 walk comment at the token.
- **D-114a2 (REAL, construction — the profile email/role input IDs)**:
  the reference's profile form wires `label for="email"` + `input
  id="email"` and `label for="role"` + `input id="role"` (the Full Name
  pair `display_name` already matches); OURS ships
  `profile-email`/`profile-role` at `src/app/(app)/profile/
  profile-page.tsx:248/253/263/267`. The association is correct on both
  sides (no a11y delta) but the IDs are not byte-parity — the
  strict-mirror fix (the s113 D-113a1 labels genus: the form-labeling
  family's construction parity). No collision: the only other `id="email"`
  in src/ is the login card (a different route). THE FIX: the four
  attribute swaps, zero line-count change, + the s114 comment.
- **D-114a3 (behavioral parity, UNPINNED — the interaction battery)**:
  the camera→filechooser wiring, the upload round-trip (the POST + the
  avatar preview swap + the toast), and the save round-trip (the
  unconditional click + the PATCH + the reload) — measured identical,
  invisible to every standing gate (the s111 D1 lesson). Freeze: +2
  unit its (the profile-ids construction it + the camera/file-input
  wiring it, both in profile-family-parity.test.ts) + e2e expects
  INSIDE the existing /Profile test (crm.spec.ts:414 — the upload +
  preview + toast, the save PATCH + reload; the e2e census stays 137).
- **D-114a4 (record-only, adjudicated away)**: the shadow transparent
  prepends (s112) · the side-chip span-vs-div + inline-style-vs-classes
  (s73 computed-equal) · the grid/camera/save/input class orderings
  (s86) · the token-maps (bg-card→bg-surface, border-input→border-line,
  text-muted-foreground→text-muted-ink — s73/s86) · the avatar
  border-radius 9999px vs 33554432px (the v3/v4 rounded-full
  computed-value genus — both fully-round, visually identical) · the
  Danger confirm-label ASSOCIATION (ours `htmlFor="reset-confirm"` +
  `id="reset-confirm"` vs the reference's bare unassociated label —
  OURS the a11y superset, the s112 D-112a2 genus: KEEP + document) ·
  the tabgap 24 (the mt-2 collapse, already documented in tabs.tsx) ·
  the nameGap 12 (the s91 controlMt compensator validated live) · the
  reference's toast auto-dismiss timing (the s30/s62 decodes the
  contract) · the export downloads at zero data (the s26 empty-file
  verification re-confirmed).

## S114-P1 (the src fixes — TWO files)

`src/lib/page-layout.ts` (D-114a1):

1. `SETTINGS_DANGER.desc`: `"text-red-600"` → `"text-sm text-red-600"`
   (byte parity with the reference's current live construction). The
   token's comment gains the s114 walk note: the live-measured reference
   string (text-sm text-red-600, 14px/20px, the card 240); the s26
   probe's omission (the s112 D-112a1 genus); the +4px ladder
   propagation the fix retires.

`src/app/(app)/profile/profile-page.tsx` (D-114a2):

2. The four attribute swaps: `htmlFor="profile-email"` →
   `htmlFor="email"`, `id="profile-email"` → `id="email"`,
   `htmlFor="profile-role"` → `htmlFor="role"`, `id="profile-role"` →
   `id="role"` (+ the s114 walk comment — the reference's bare
   email/role ids, the display_name pair already matching). Zero
   line-count change.

## S114-P2 (the unit pins — TWO new its, both in profile-family-parity.test.ts)

3. **+1 it (D-114a2)**: the profile source wires the reference's bare
   `id="email"`/`id="role"` + the matching `htmlFor` pairs (and
   `display_name` unchanged) — with the NEGATIVE: zero
   `profile-email`/`profile-role` forms.
4. **+1 it (D-114a3a)**: the camera wiring census — the hidden
   `input[type="file"]` with `accept="image/*"` + the camera button's
   "Upload Photo" text + the `lucide-camera` icon (the walk's
   live-measured construction, both apps).

## S114-P3 (the re-anchors + the e2e freezes)

5. `tests/settings-data-tab.test.ts:41-44` (D-114a1): the danger-desc
   pin re-anchored to `/desc:\s*"text-sm text-red-red600"/` — precisely
   `desc:\s*"text-sm text-red-600"` + the NEGATIVE (the bare
   `desc:\s*"text-red-600"` form must be gone); the file-header comment
   (:13-14) updated.
6. `tests/profile-family-parity.test.ts:154` (D-114a2): the email-input
   regex `id="profile-email"` → `id="email"`.
7. `tests/e2e/crm.spec.ts` — added expects INSIDE the existing /Profile
   test (:414), the census stays 137: the upload (setInputFiles on the
   hidden input → the "Photo uploaded successfully" toast + the avatar
   preview img) + the save round-trip (the PATCH /api/users response 200
   via waitForResponse + the reload + the h1 re-visible). The e2e db
   re-seeds every run (global-setup) — the upload test deterministic.

## S114-P4 (the count ladder + the docs realignment)

- **UNIT 1946 → 1948** (+2: both its in profile-family-parity.test.ts) ·
  **SUITES 109 UNCHANGED** · **E2E 137 UNCHANGED** (added expects, zero
  new its) · **badge 2083 → 2085**.
- The line-census re-anchor: `page-layout.ts` 1559 → the live post-fix
  count (the comment growth; computed at GREEN — the s112/s113
  in-flight-correction doctrine) — the SKILL §5.6 phrase + the PAD
  module-table row + the docs-counts four-site literals + the negatives
  ladder gains the retired 1559 form.
- The docs: SKILL v1.111.0 (frontmatter + project_state — the s114
  layer prepended + the H1 lockstep + §16db + the §5.6 phrase + the
  Appendix B unit total 1948) · README badge 2085 + the Tested row's
  s114 clause · AGENTS the commands/gate counts 1946→1948 (two sites) +
  the §Session-114 history block · CLAUDE the unit-count sites
  1946→1948 (four sites + the dialog-geometry lockstep carrier) · PAD
  the module-table row (the new count) + the s114 inventory row +
  Total/HEAD 109|1948+137.
- The session docs: `docs/session_241.md` (the feat log, in the feat
  commit) + session_242/243 (the summary + narration, the follow-up
  commit).

## S114-P5 (the captures)

Four captures on the standing build + a scratch walk db (the s112/s113
precedent): **184** the settings Data tab @1440×900 (the FIXED Danger
card — the desc at 14px + the 240px envelope + the Import/Export cards)
· **185** the settings Data tab @390×844 (the phone face of the Data
family) · **186** the Profile page @1440×900 (the personal card + the
camera button + the four side cards) · **187** the Profile page
post-upload @1440×900 (the avatar preview swapped to the uploaded image +
the toast — the interaction face). The VLM battery (4 checks each): the
geometry, the census, the fonts, the containment.

## S114-P6 (the ship)

The house-style commit (the TWO src files + profile-family-parity +
settings-data-tab + the docs-counts re-anchors + the crm.spec expects +
the docs family + the captures + session_241 + the worklog; the
scout/walk scripts deleted before ship) → the SSH push per the runbook
(the operator key OUTSIDE the repo, the fingerprint VERIFIED, the
dry-run, the real push — `--remote git@github.com:nordeim/neo-crm.git`
explicitly, the s112 wrapper-default lesson) → the session-log
follow-ups (session_242/243) → the close-out.

## The TDD ladder (the predictions)

- **RED-1** (the pins + the re-anchors staged against the still-unfixed
  src + the still-old docs): the profile-ids it FAILS (the
  profile-email ids still there) + the danger-desc re-anchor FAILS (the
  bare text-red-600 still in the token) + the email-type re-anchor FAILS
  (the id="profile-email" regex) + the docs-counts axis (the UNIT const
  re-anchor cascading through the badge/commands/Tested/AGENTS/PAD/H1/
  Appendix-B sites + the four-site 1559/new literals). The camera
  it is a staging-passing freeze pin (the s112 precedent — the wiring
  already stands). **Estimate: 15-19 failed** (3 src-dependent + ~12-16
  docs-counts; the s113 precedent's 16). Stash-proof: the staged files
  stashed → the native run ALL GREEN → pop → the RED re-confirmed.
- **GREEN**: the S114-P1 src edits (the text-sm + the four id swaps) +
  the S114-P4 doc realignment → **109 files / 1948 ALL PASSING** + lint
  0/0 + tsc 0. The line-census literal computed live at GREEN.
- **RED-2 (both faces)**: (A) the token edit — `text-sm` dropped from
  SETTINGS_DANGER.desc → the danger-desc it FAILS by name → restored;
  (B) the id edit — one id reverted to profile-email → the profile-ids
  it FAILS by name → restored. Both restored → full GREEN.

## The validation checklist (pre-execution)

- [ ] The desc edit site: `src/lib/page-layout.ts:502` — `desc:
      "text-red-600"` appears ONCE in SETTINGS_DANGER; the only consumer
      is settings-page.tsx:338 (verified by grep); NO test pins the bare
      form outside settings-data-tab.test.ts:43 (verified — the
      topbar-rowmenu text-red-600 pins are the DELETE menu items, a
      different family; the statcard pins are the stat deltas).
- [ ] The id edit sites: profile-page.tsx:248/253/263/267 — the ONLY
      profile-email/profile-role occurrences in src/ (verified); no
      `id="email"`/`id="role"` on the /Profile render outside the form
      (the login-card ids are the /login route — no collision); the
      e2e/unit consumers of the old ids: profile-family-parity.test.ts:154
      ONLY (re-anchored at S114-P3).
- [ ] The camera-wiring it: no existing pin covers the profile file
      input (verified — contact-photo.test.ts pins the CONTACT dialog
      camera, a different surface).
- [ ] The e2e sites: crm.spec.ts:414 — the existing assertions
      UNTOUCHED (the new expects additive, AFTER the current ones); the
      upload uses setInputFiles on the hidden input (no filechooser
      dance); the save uses waitForResponse (the toast/reload race
      avoided — the s114 walk lesson).
- [ ] The count arithmetic: 1946 + 2 = 1948; 1948 + 137 = 2085; the
      badge formula UNIT+E2E.
- [ ] The line-census: `wc -l` on page-layout.ts AFTER the edit → the
      four-site literals re-anchored to the exact live value.
- [ ] The captures' geometry envelopes match the walk's live
      measurements (the Danger card 240 post-fix · the Data cards
      1120×160 ×2 · the Profile grid 896×594).

## The execution record (2026-10-12, session-114)

Executed RED-first, with one in-flight re-anchor + two e2e-phase lessons:

- **RED-1:** 17 failed | 50 passed (67) — the 14 docs-counts-family
  count-axis its (the UNIT const re-anchor cascading through the
  badge/tree/commands/Tested/AGENTS/PAD/H1/Appendix-B/four-site sites)
  + the email-type re-anchor it (the id="profile-email" regex against
  the still-unfixed src) + the labels it (D-114a2) + the danger-desc
  re-anchor it (D-114a1, the bare text-red-600 still in the token), all
  enumerated by name. The plan predicted 15-19 — 17 landed inside it.
  Stash-proven: the four staged files stashed → the native **65/65** →
  pop → 17 RED re-confirmed (65 + the 2 new its = 67 exact). The camera
  it a staging-passing freeze pin (the s112 precedent) — with two
  staging lessons en route: the stripComments regex eats
  accept="image/*" (the literal contains the comment-opener /* — the
  it pins the RAW source; the S30 comment's prose form never matches
  the attribute literal) + the case-sensitive fileInputRef regex
  (capital I — /inputRef/ missed the identifier).
- **GREEN:** the S114-P1 src fixes (the SETTINGS_DANGER.desc text-sm +
  the walk comment in page-layout.ts + the four id swaps + the comment
  in profile-page.tsx) + the full doc realignment (README badge 2085 +
  the Tested row's s114 clause + the file-tree site; AGENTS the two
  count sites + the §Session-114 block; CLAUDE the four sites; PAD the
  five count sites + the s114 inventory row + the module-table row
  1566; SKILL v1.111.0 [frontmatter + the H1 + project_state — the s114
  layer prepended + §16db + the §5.6 phrase + the Appendix B unit
  total]) → **109 files / 1948 ALL PASSING**.
- **One in-flight re-anchor discovered the honest way:** the first
  GREEN run surfaced the README :125 file-tree site (#
  109 Vitest suites (N checks)) — one more live-tense count site the
  staging had not enumerated; re-anchored → the four suites 67/67.
- **The census literal:** drafted 1566 → the live count **1566 exact**
  (no in-flight correction — the first session the comment-growth
  estimate landed verbatim; the s112/s113 genus finally drafted right).
- **RED-2 (both faces):** (A) the token edit — text-sm dropped from
  SETTINGS_DANGER.desc → the danger-desc it FAILED by name → restored
  → 10/10; (B) the id edit — the email id reverted to profile-email →
  BOTH the email-type it AND the labels it FAILED by name → restored
  → 27/27 (the two suites).
- **The e2e phase (two lessons + one flake):** the first full run 133
  passed with FOUR failures — the two profile upload tests
  (:2316 the NO-img negative + :2333 the round-trip) failing
  CONSISTENTLY in the full run while passing in isolation, plus the
  two documented load-sensitive flakes (:949 transient, :2566 S72-P2).
  **The s114 state-pollution genus:** the new :414 test's SAVE persists
  photoUrl on the SHARED e2e user — :2316's "renders NO img" negative
  starts from the clean-state assumption that predates any
  upload-AND-save test. Fixed with the cleanup seam: the test restores
  the user (photoUrl: null, the same name) through the same PATCH
  endpoint via page.request — with the second lesson riding beside it:
  **page.request bypasses the page's network layer** (waitForResponse
  can never see it; assert on the response object directly — the first
  cleanup draft timed out exactly there). After the fix: 136/137 (the
  S72-P2 flake alone — the documented genus, passing in isolation) →
  the re-run **137/137 (3.2m)** with the two upload tests green in the
  full-run context.
- **GATE (stepwise):** lint 0/0 (the throwaway scout/walk scripts
  deleted BEFORE the gate — tsc caught their filter({hasText: /regex/})
  form first) · tsc 0 · **1948/1948** [109 suites] · build ·
  **137/137** e2e · the four drift sweeps CLEAN (NO re-baselining — the
  text-sm change is on the un-swept Data tab, the id swaps
  attribute-only) · the closing census MATCH (15/24/10/23/12 + 4
  users). The tree: src/ = the TWO files; the five test files; the
  five docs; the s114 plan; the four captures; session_241 + the
  worklog.
- **S114-P5 (the captures):** the throwaway capture script (the
  standing FRESH build on PORT 3141 + the scratch walk db, deleted
  after — the OLD pre-fix server killed first). The live geometry
  envelopes byte-matching the walk: **184** the Data tab @1440 (the
  Import 1120×160 · the Export 1120×160 · the Danger **1120×240**
  post-fix [was 244] · the desc **14px/20px h=20** [was 16px/24px
  h=24] · docScrollW 1440) · **185** the Data tab @390 (358-wide
  cards at 240/284/260, the desc wrapped 2 lines at 14px/20px,
  docScrollW 390) · **186** the Profile @1440 (the grid 896×594, the
  avatar 96 fallback) · **187** the post-upload @1440 (the avatar img
  swapped, the grid unchanged). **The VLM battery 4/4 × 4, zero
  adjudications** — the Danger desc read "at a small font size,
  visually consistent with the description text found in the other
  cards" (the D-114a1 fix visible off the pixels), the phone face
  contained with the two-line wrap, the profile chips read with their
  exact tints (light-blue person · light-green mail · light-purple
  shield), and the 187 face reading the toast verbatim + the avatar
  swapped + the Account card still on its fallback (the no-Save
  form-state contract visible).
