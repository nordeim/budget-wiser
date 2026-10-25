# The session-187 plan — THE PROFILE PHOTO-UPLOAD FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS DATA-TAB SIBLING (walk60)

Date: 2026-10-26 · Rotation: 187 ·
Task: audit + validate the shipped session-186 state (commit `d8af255` +
the owner's transcript commit `f8e98a8` — the session_394/395 transcripts
are this round's rotation trigger), then execute the next-rotation
candidates the s394 close names (the profile page's own interactive arms
under ADR-022 — the photo-upload family's focus/open faces, the s30-era
construction never re-walked live · the settings Data-tab arms — the
template/export button family's focus faces, the s26/s83 margins walked,
the focus faces never), plus the round-specific operator asks (env/db
placement re-verification · the vitest/playwright config standing check ·
the sitemap/SEO re-verification · the mobile-nav two-app comparison ·
the `.env.example` inclusion · the dev-server captures), TDD-first,
align every doc, push to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication) — DONE

The baseline gate at the shipped s186 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2769** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.8m) · probe:ref
STABLE (`46bc2d9c` — the bundle md5 unchanged) · db census MATCH
(15/24/10/23/12 + 4 users at `<repo>/db/custom.db`, the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching
command — the F-123a1 doctrine) · sitemap 11 routes + robots +
manifest 200 (smoke check 12).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s394 close's named candidates**, adjudicated by the discovery probe
(`scripts/discover-187.ts`, the discovery record):

- **The profile photo-upload family's focus/open faces (the s394
  close's FIRST-named candidate) — LIVE, BOTH APPS, rich arms**: the
  /Profile route's Personal Information card census byte-equal on the
  construction (h1 `Profile & Settings` byte-equal; the four labels
  `Profile Picture | Full Name | Email | Role` byte-equal; the
  right-column four-card vocabulary byte-equal; the Upload Photo outline
  button byte-equal at `537,312 159x36` — bg white, ink
  `rgb(10,10,10)`; the Full Name input byte-equal at `425,446 539x36`
  with border `1px solid rgb(229,229,229)`; the dark Save Changes
  byte-equal at `425,730 132x36` — bg `rgb(23,23,23)`, fg
  `rgb(250,250,250)`; the hidden file input `accept="image/*"`
  byte-equal; the Camera glyph byte-equal — 1 path, the same body). The
  focus faces (the Upload/name-input/Save rings) + the REAL keyboard
  chains are walkable arms — never walked under ADR-022 (the s30-era
  construction decoded from the bundle, its live faces never censused).
- **The settings Data-tab arms (the s394 close's SECOND-named
  candidate) — LIVE, BOTH APPS, byte-equal resting faces**: the three
  cards byte-equal (Import Templates + Export Data — white, border
  `1px solid rgb(229,229,229)`, radius 12px; the Danger Zone tint —
  bg `rgb(254,242,242)`, border `1px solid rgb(254,202,202)`); the
  ten-button vocabulary byte-equal (3 template + 4 export + the RESET
  gate); the destructive button byte-equal in BOTH gate states
  (bg `rgb(239,68,68)` empty-gate + armed). **One geometry question
  for the walk**: the first template button rides OURS `313,340` vs
  REF `313,348` — an 8px y-offset (same 270x36 box) the walk's
  geometry decode must adjudicate (a genuine rhythm delta or a
  documented genus). The focus faces never walked.
- **The standing Edit-family re-check — STILL KILLED**: the reference
  carries ZERO rows on /contacts, /leads, /accounts (rows=1 — the
  empty-state row alone, rowMenus=0) + ZERO calendar chips — the
  W7/wce/Mke edit dialogs have no trigger there; the candidate stays
  suspended (the discover-184/185/186/187 census is the standing
  re-check; it returns the day the reference carries rows).
- **The topbar-search dropdown arm (the standing conditional gate) —
  STILL KILLED**: `populated=0` on BOTH apps at the seeded-term leg
  (the placeholder `Search Anything...` byte-equal; no listbox/popover/
  dropdown renders on either app) — the s392/394 gate ("if the
  reference's own suggestions ever populate") FAILS; the candidate
  stays suspended with the s32 dead-stub doctrine standing.
- **THE PRE-PLAN LIVE FIND (D-187a1, the micro-probe's answer)**: the
  reference's hidden file input carries `id="photo-upload"` — OURS
  carries NO id (inert behaviorally: no label wires htmlFor to it on
  either app, the "Profile Picture" label carries no htmlFor on both;
  the id is a CONSTRUCTION delta) — the D-114a2 same-page precedent
  (the s114 email/role id cure: "the reference's BARE ids —
  construction parity") names the cure: the id restored. The s30 pin
  (the `accept="image/*"` arm) never pinned the id — the cure is
  additive.

## WP-1 — The walk tool

`scripts/walk60-profile-datatab-focus-open.ts` (the walk53-59 ledger
form over the profile family's focus/open states + the Data-tab
sibling at BOTH axes):

- **Phase A — the profile OPEN census at the desktop axis 1440×900**:
  the Personal Information card's interior DFS ledger (the title +
  the avatar row + the four form groups + the Save row), the avatar's
  face (the blue-100 circle + the User glyph's geometry), the Upload
  Photo button's resting + FOCUS faces (the outline ghost's ring) +
  its Camera glyph, the hidden file input's construction census (the
  D-187a1 id decode), the Full Name input's resting + focus rings
  (the FULL untruncated slot chains), the disabled email/role faces
  (the gray-50 wash + the muted ink), the Save Changes button's
  resting + focus faces (the dark primary + its focused shadow pair),
  the four right-column cards' census (the labels + the tinted chip
  family), the DELETE-free discipline: the save/upload writes ride
  OURS only; the reference's arms are NEVER fired beyond focus.
- **Phase B — the REAL keyboard Tab drive through the profile form**
  (the walk54/58 focus form, now two-app): the chain from the sidebar
  through the Upload button → the name input → the Save button, each
  stop's REAL :focus-visible face (the mounted ring census).
- **Phase C — the settings Data-tab sibling**: the three cards'
  geometry ledger (the 8px template-button y-offset decode — the
  title/desc/content rhythm chain on both apps), the first template
  button's + first export button's resting + REAL-focus faces, the
  Danger Zone's tinted card census, the RESET input's focus ring, the
  destructive button's empty-gate + armed faces (the arm state via the
  input fill, the write NEVER fired), the Tab chain through the
  Data tab's buttons.
- **Phase D — the phone axis 390×844**: the same profile + Data-tab
  censuses at the phone width (both families reachable at phone — the
  profile form stacks, the Data tab rides the s106 segmented form).

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db). The DATA-STATE discipline: the user
identity values (the name/email/role values) are data; the walk
compares the CONSTRUCTION faces on both apps. The destructive arms
(the Save/upload/reset writes) are NEVER fired on the reference — the
focus/resting faces are censused, the safe round-trips (the input
focus/blur, the RESET fill/clear) walk two-app; the writes ride OURS
only.

## WP-2 — The decode

Every delta root-caused against the standing genus register (the
box-shadow SLOT-COUNT genus — the v4 five-slot variable chain vs the
reference's two/three-slot form, every VISIBLE layer byte-equal · the
outline VERSION FORM + both sub-forms (s178) · the token-selection
genus (the M-81c2 pair — `border-line`/`text-ink` vs
`border-input`/`text-foreground`, computed-equal) · the ring-offset
genus (the s129 retirement — ours stays retired, the reference's
zero-extent white slot rides its own stock class) · the class-order
genus (`md:text-sm` position · the lucide `h-4 w-4`/`w-4 h-4` order —
the s186 lucide version genus) · the aria-label superset genus (s88-c9,
kept) · the React useId format genus · the Radix mount-state offsets) +
the DATA-STATE genus (the user values) + the D-187a1 id (the cure).
Target: ZERO live defects, every delta a documented genus or a kept
superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178-s186 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine) — the pin survey FIRST (the standing
pins: the s30 profile-photo family · the s13 PROFILE_LAYOUT family ·
the s114 email/role id pins · the s26 settings-data-tab family · the
s83 SETTINGS_DATA margins · the s10 INPUT_BASE/BUTTON_BASE pins · the
walk53-59 decode freezes):

1. the walk60 decode freeze (the tool's own contract — the two-app
   profile OPEN ledger at both axes + the REAL Tab drive + the
   Data-tab sibling decode);
2. the profile file-input construction freeze (the genuine battery
   gap: the s30 pins hold the accept arm, never the input's
   id/hidden/tabIndex construction — the D-187a1 carrier);
3. the Data-tab button-rhythm freeze (the genuine gap: the s26/s83
   pins hold the margins/labels, never the buttons' full construction
   chain + the Danger Zone's armed-state wiring) —
   + THE D-187a1 CURE PIN (RED-first: the id restored in
   profile-page.tsx; exactly 1 RED at birth → the cure → GREEN).

## WP-4 — Proofs

MUTATION-PROOF (a planted construction regression on a walked
contract → exactly 1 RED → restored → GREEN) · STASH-PROOF (the
round's test block stashed alone → exactly 138/2769 → restored →
138/2769+N) · the walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2769 → 2769+N (the walk60 pins) · badge 2961 → 2961+N
(count-ladder-187.py: the house assert-first idempotent form) · the
collateral re-anchors (the SKILL §5.6 census checks 245 → 245+N · the
F-106a1 layer-axis pin — the s187 layer live, the s186 demoted beneath
it at 2769/192 · the s186-era live-tense RED-first arithmetic site
re-anchored 261 → 261+N) · the docs lockstep (the AGENTS
Session-187 section · the PAD session-187 inventory row · the CLAUDE
page-layout bullet's walk60 tail · the README Tested row's walk60
clause + the badge · the SKILL head surgery [skill-head-187.py,
idempotent] · session_396.md + this plan's execution record + the
worklog entry [Task ID 187]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref faces (the
  profile form ours+ref at the desktop axis — the pair decode — + the
  phone-axis pair + the Data-tab pair) + the standard dev-server page
  set for the operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: the 200s ·
  the 11 routes + the robots Sitemap line + the per-route OG/Twitter
  factory).
- The mobile-nav comparison: probe:ref TRUE-390 STANDING (the
  reference's own menu button live — this session's probe re-verified
  it) + the drawer battery GREEN carry the verdict — documented in
  the session record.
- The Tailwind v4 state clean (every walk delta decoded against the
  standing genus register).

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2769 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING (this session's run) |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-26, session-187)

- **The audit GREEN** — the baseline gate at the shipped s186 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2769 · build · smoke 14/14 ·
  e2e 192/192 (clean first run, 5.8m) · probe:ref STABLE (46bc2d9c) ·
  census MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes + robots
  + manifest 200 · the Tailwind v4 state clean · the operator's
  standing asks verified (env/db placement · the vitest/playwright
  configs · sitemap/SEO · mobile-nav · `.env.example`).
- **The rotation adjudication** — probe:ref STABLE kills the
  fresh-bundle candidate; recharts latest 3.10.1 kills the 4.0 gate;
  the s394 close's named candidates adjudicated by the discovery
  (`scripts/discover-187.ts`): the FIRST-named (the profile
  photo-upload family) LIVE on BOTH apps with the construction
  byte-equal on the resting faces; the SECOND-named (the Data-tab
  arms) LIVE with the cards/vocabulary/gates byte-equal; the
  topbar-search gate KILLED again (populated=0); the Edit-family
  re-check still zero-row (suspended).
- **WP-1 GREEN** — the pre-plan micro-probe
  (`scripts/probe-photo-id.ts`: the file-input id answered decisively)
  then `scripts/walk60-profile-datatab-focus-open.ts` (the walk53-59
  ledger form over the profile family's focus/open states + the
  Data-tab sibling at BOTH axes: Phase A the profile OPEN census — the
  DFS ledger + the avatar face + the Upload/Save focus faces + the
  Camera glyph + the file-input construction + the name input's full
  slot chains + the disabled faces + the right-column census; Phase B
  the REAL keyboard Tab drives through BOTH families (the
  programmatic .focus() never triggers :focus-visible there — the
  REAL keyboard paints the byte-equal 1px near-black ring on both;
  both chains STRUCTURALLY IDENTICAL); Phase C the Data-tab sibling —
  the three cards' geometry ledger (the 8px decode:
  `scripts/probe-8px-and-avatar.ts` + `scripts/probe-import-dfs.ts` —
  the v4 space-y INLINE-FLOW variant) + the buttons' faces + the
  Danger census + the gate states; Phase D the phone-axis census); the
  walk re-run STABLE post-cure (all three cures byte-equal on both
  axes).
- **WP-2 GREEN** — the decode COMPLETE: **THREE LIVE FINDS CURED
  (D-187a1 the file input's id + tabIndex retirement · D-187a2 the
  avatar's stock DIV fallback + the on-svg color at BOTH sites ·
  D-187a3 the Data-tab 8px button-row offset — the v4 space-y
  semantics flip's INLINE-FLOW variant, the operator's v4 bug-watch
  catch of the round)**, every remaining delta a documented genus
  (the box-shadow slot-count with every VISIBLE layer byte-equal ·
  the ring-offset white zero-extent slot · the outline VERSION FORM +
  both sub-forms · the token-selection M-81c2 pairs · the
  class-order family · our aria-hidden supersets).
- **WP-3 GREEN** — the pin survey first (the s13/s30/s80/s14/s26/s83/
  s114 pins; the avatar's fallback tag/color carrier, the file
  input's id/tabIndex, and the list body's rhythm arm never pinned),
  then 3 born-green pins in the page-layout battery (the walk60 decode
  freeze · the profile avatar family construction freeze · the
  Data-tab list-body rhythm freeze) + THE D-187a1/a2/a3 CURE PINS
  (RED-first: exactly 3 RED at birth → the cures → GREEN; the D-187a1
  construction pin rides the profile-photo suite as a NEW test) + the
  collateral re-anchors (the s26 slice-windows · the s80
  avatar-ladders · the space-y census 123 → 122 · the PAD §11 row
  1701 → 1718).
- **WP-4 GREEN** — MUTATION-PROOF (the planted D-187a1 replant →
  exactly 1 RED → restored → GREEN, no residual) · STASH-PROOF (the
  round's test block stashed → exactly 138/2769 → restored →
  138/2773).
- **WP-5 GREEN** — count-ladder-187.py (2769 → 2773 [+4] · badge 2961
  → 2965, idempotent — the re-run a verified 0-flip no-op; the first
  pass carried +3 before the +4 truth was caught at the full-suite
  count — the corrected script accepts both intermediate forms) ·
  skill-head-187.py (the SKILL v1.184.0, the s186 layer demoted at its
  ship counts 2769/192, the s187 layer live, the last_updated flip
  2026-10-26, idempotent; the first-pass head-surgery interaction
  caught + repaired: the ladder's project_state flip had corrupted
  the demoted block's ship count — the surgical repair restored 2769
  in the retired copy while flipping the live line to 2773) · the
  docs lockstep (the AGENTS Session-187 section · the PAD s187
  inventory row · the CLAUDE page-layout bullet's walk60 tail · the
  README Tested row's walk60 clause + the badge + the space-y census
  flip · session_396.md · this execution record · the worklog entry
  [Task ID 187]).
- **WP-6 GREEN** — the captures 485-490 (the Personal Information
  card ours+ref at the desktop axis — the D-187a1/a2 cured
  construction, the pair byte-identical at 25,615 bytes — + the
  phone-axis pair + the Data-tab Import Templates pair, the D-187a3
  cured rhythm; the VLM battery 3/3 PASS "Structural Differences:
  None") + the operator asks all verified standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2773 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk60 profile + Data-tab arms byte-equal on both axes
  (post-cure) · the REAL Tab chains structurally identical · the
  captures VLM-clean 3/3.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
