# The session-184 plan — THE ACTIVITIES MORE-FILTERS TOGGLE + RAIL-ACTIONS OPEN-STATE INTERIOR WALK (walk57)

Date: 2026-10-25 · Rotation: 184 ·
Task: audit + validate the shipped session-183 state (commit `02ac27e` +
the owner's transcript commit `f5792f7` — the session_388/389 transcripts
are this round's rotation trigger), then execute the next-rotation
candidates the s388 close names (the remaining unwalked OPEN/focus
interiors), plus the round-specific operator asks (env/db placement
re-verification · the vitest/playwright config standing check · the
sitemap/SEO re-verification · the mobile-nav two-app comparison · the
`.env.example` inclusion · the dev-server captures), TDD-first, align
every doc, push to main via the SSH wrapper.

## 0. The audit (the baseline + the rotation adjudication) — DONE

The baseline gate at the shipped s183 state on a FRESH CLONE:
lint 0/0 · tsc 0 · **138/2760** unit · build (the type-gate artifact) ·
smoke **14/14** · e2e **192/192** (clean first run, 5.7m) · probe:ref
STABLE (`46bc2d9c` — the bundle md5 unchanged) · db census MATCH
(15/24/10/23/12 + 4 users at `<repo>/db/custom.db`, the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching
command — the F-123a1 doctrine) · sitemap 11 routes + robots +
manifest 200 (smoke check 12).

The rotation adjudication: probe:ref STABLE kills the fresh-bundle
candidate; the registry's `latest` 3.10.1 (verified live against
registry.npmjs.org) kills the recharts 4.0 gate. **The round material =
the s388 close's named OPEN/focus interiors**, adjudicated by the
discovery probe (`scripts/discover-184.ts`, the discovery record):

- **The Edit-family dialogs' focus faces (the s388 close's first-named)
  — KILLED BY THE DISCOVERY**: the reference's live data state carries
  ZERO rows on /contacts, /leads, /accounts (the "No contacts found" /
  "No leads found" / "No accounts found" empty-state rows alone, zero
  row-menu triggers) and ZERO calendar chips — the W7/wce/Mke edit
  dialogs have NO trigger on the reference and the two-app ledger has
  no REF arm. The ours-only legs already standing: the a11y two-gate's
  dialog-open family (the five create dialogs + the contact edit
  dialog), walk54's chrome FULL-string freezes (the same Dialog/
  Input/Select/Button primitives), and the s28/s91 source pins. The
  two-app walk is UNREACHABLE at the reference's zero-data state —
  documented here with the discovery's census; the candidate returns
  the day the reference carries rows.
- **The activities More-Filters toggle's OPEN face (the s388 close's
  variant-flip-family candidate) — LIVE AND UNWALKED**: the discovery
  probe's calibration at 1440×900 (all byte-equal geometry):
  - the trigger RESTING: `1113,692 270x36`, bg white, border
    `1px solid rgb(229,229,229)` — byte-equal on both apps;
  - THE CLICK: OURS reveals the More Types group (the label census
    8 → 11: `More Types | Task | Note` — the functional superset, the
    s125 fix-over-defect doctrine); the reference's button is the DEAD
    STUB re-verified live (labels 8 → 8, no reveal, no variant flip —
    the L-125c2 doctrine);
  - the trigger's OPEN face: OURS stays OUTLINE (no flip — the fixed
    `variant="outline"`, matching the reference's permanently-outline
    dead face — the D-183a1 same-family check PASSES: no second live
    member on this trigger);
  - THE HOVER FACE — never decoded in ANY prior walk (the mouse-borne
    state; every standing walk drives the REAL keyboard only): the
    reference's post-click census caught its hover wash
    `rgb(245,245,245)` + ink `rgb(23,23,23)`
    (`hover:bg-accent hover:text-accent-foreground`); OURS rides
    `hover:bg-line-soft hover:text-neutral-900` — the theme pre-decode
    (`--color-line-soft: #f5f5f5` · `--color-neutral-900: #171717`)
    says computed-EQUAL (the M-81c2 token-selection genus's
    outline-Button hover member) — the walk proves it live;
  - the rail's action pair (the D-183a1-family adjudication): the
    Filter primary is BYTE-EQUAL BLUE on both apps (`rgb(37,99,235)`
    bg + `rgb(250,250,250)` ink — the reference's Filter button rides
    its EXPLICIT blue CTA classes; OUR default `--color-primary` is
    deliberately that blue per the s10-family re-pin — NO defect, the
    discovery's live proof) + the Save All ghost byte-equal
    (transparent bg, `1311,328 72x32`) + the quick-log quartet
    byte-equal (the Log WhatsApp emerald DEFAULT-variant member
    `rgb(5,150,105)` — the s83 construction standing);
  - the phone axis: the rail is `display:none` below lg (the s109
    e2e pin) — the walk's phone leg is the ABSENCE census (one probe).

## WP-1 — The walk tool

`scripts/walk57-activities-rail-open.ts` (the walk53/56 ledger form
over the rail family's states at the desktop axis 1440×900 — the
surface's own axis; the phone leg the absence census):

- **Phase A — the More-Filters expander** (the OPEN-state arm): the
  trigger's RESTING + HOVER + OPEN faces (the HOVER the genuine
  first-walk face: `page.hover()` with settle on both apps, then the
  mouse-away face), the CLICK reveal census (the pre/post label
  ledger + the revealed group's interior: the group-label face + the
  Task/Note checkbox constructions + geometry), the dead-stub
  re-verification on the reference (no reveal, no flip), the
  aria-expanded superset census, the toggle-back round-trip on ours.
- **Phase B — the REAL keyboard Tab drive** (the walk54 focus form):
  the CLOSED-rail chain on both apps (Save All → the four type
  checkboxes → Owner select → Status select → More Filters → Filter),
  then OURS-OPEN chain (the Task/Note checkboxes enter the order), each
  stop's focused face censused (the ring carrier).
- **Phase C — the rail's action pair + select triggers**: the Save All
  ghost + Filter primary faces (the discovery's byte-equal proof
  frozen), the Owner/Status select triggers' RESTING faces (the
  walk53/55 select chrome already full-frozen — this call-site's
  faces the census).

The pairing idiom: the reference rides the sweep-state storageState
pair (ONE reference login — the s162 doctrine); OURS rides the dev
server on :3000 (the seeded db — the DATA-STATE discipline: the
Owner-select options are the data-borne arm, the walk55 owner-arm
genus; the type checkboxes are FIXED vocabularies on both).

## WP-2 — The decode

Every delta root-caused against the standing genus register (the
outline VERSION FORM (s178) + both sub-forms · the box-shadow
slot-count genus (5-vs-3 outline · 6-vs-5 primary — every VISIBLE
layer byte-equal) · the token-selection genus (the outline Button's
hover member: `border-line/bg-surface/text-foreground +
line-soft/neutral-900` vs the reference's
`border-input/bg-background + accent/accent-foreground` — the M-81c2
pair, computed-equal on every face) · the class-order genus (`text-sm`
base-first vs tail-last) · the v4 `[&_svg]` base arms · the
aria-expanded superset genus · the s133 placeholderState retirement ·
the React useId format genus · lucide's aria-hidden version genus) +
the kept-superset register (our aria-expanded on the expander + the
functional reveal over the reference's dead stub — the L-125c2/s125
fix-over-defect doctrine). Target: ZERO live defects, every delta a
documented genus or a kept superset.

## WP-3 — TDD

Born-green contract-freeze pins (the s173 P-p/P-q precedent, the
s178–s183 continuation), all in the existing page-layout suite (the
ADR-017 one-suite doctrine) — the pin survey FIRST (the standing
pins: FILTER_RAIL's fragment pins at s217-234 · ACTIVITY_QUICKLOG at
s645 · the accounts-rail FILTER_RAIL green anchors · the s125
activities-calendar-parity walk pins [the completed/scheduled toggle,
NOT the expander]):

1. the walk57 decode freeze (the tool's own contract — the
   three-phase rail ledger, the hover-face probe form, the REAL Tab
   drive, the dead-stub re-verification, the absence census at phone);
2. the ACTIVITIES more-filters expander construction freeze (the
   genuine gap: the fixed `variant="outline"` + the aria-expanded
   superset + the MORE_TYPE_FILTERS Task/Note reveal — NO pin holds
   the construction; the walk53/55 chrome freezes hold the shared
   primitives, never this call-site's own arms);
3. any NEW decode knowledge the maiden pass surfaces (born-green over
   the zero-defect decode, or honest-RED-first over a live find).

## WP-4 — Proofs

MUTATION-PROOF (a planted class-string regression on a walked
contract → exactly 1 RED → restored → GREEN) · STASH-PROOF (the
round's test block stashed alone → exactly 138/2760 → restored →
138/2760+N) · the walk re-run stable on the walked tree.

## WP-5 — Count ladder + docs

2760 → 2760+N (the walk57 pins) · badge 2952 → 2952+N
(count-ladder-184.py: the house assert-first idempotent form) · the
collateral re-anchors (the SKILL §5.6 census checks 236 → 236+N · the
F-106a1 layer-axis pin — the s184 layer live, the s183 layer demoted
beneath it at 2760/192 · the s183-introduced live-tense RED-first
arithmetic site re-anchored 252 → 252+N) · the docs lockstep (the
AGENTS Session-184 section · the PAD session-184 inventory row · the
CLAUDE page-layout bullet's walk57 tail · the README Tested row's
walk57 clause + the badge · the SKILL **v1.181.0** + the s184 head
layer [skill-head-184.py, idempotent] · session_390.md + this plan's
execution record + the worklog entry [Task ID 184]).

## WP-6 — Captures + the operator asks

- The captures (docs/screenshots/): the round's ours+ref faces (the
  hovered expander ours+ref + the OPEN rail ours [the revealed Task/
  Note group] + the OPEN rail ref [the dead face] — the pair decode)
  + the standard dev-server page set for the operator's record.
- The `.env.example` verified against the codebase contract (already
  standing — the six-knob family; committed as-is, included in this
  round's commit per the operator's instruction).
- The sitemap/SEO standing re-verified (smoke check 12: the 200s · the
  11 routes + the robots Sitemap line + the per-route OG/Twitter
  factory).
- The mobile-nav comparison: probe:ref TRUE-390 STANDING (the
  reference's own menu button live) + the drawer battery GREEN carry
  the verdict — documented in the session record.
- The Tailwind v4 state clean (every walk delta decoded against the
  standing genus register).

## The execution checklist (the operator's round-shaped asks)

| Ask | State | The round's evidence |
| --- | --- | --- |
| `.env` DATABASE_URL = `file:../db/custom.db`, db/ at repo root | DONE (fresh intake) | census MATCH at `<repo>/db/custom.db` |
| vitest + playwright suites via the config files | STANDING (verified) | 138/2760 unit + 192/192 e2e this session |
| Sitemap + SEO | STANDING (re-verified) | smoke check 12; the 11-route sitemap + robots + manifest |
| Mobile nav menu parity | STANDING (re-verified) | probe:ref TRUE-390 STANDING + the s109 rail-absence pin |
| Tailwind v4 bug watch | STANDING | the genus register walked against every WP-2 delta |
| `.env.example` matches + in the commit | VERIFIED | the six-knob contract audit |
| Screenshots under docs/screenshots/ | WP-6 | the round's captures |
| Docs alignment | WP-5 | the lockstep ledger |
| Commit + push via the SSH wrapper, main only | FINAL | the dry-run + the push + the remote verify |

---

## The execution record (2026-10-25, session-184)

- **The audit GREEN** — the baseline gate at the shipped s183 state on
  a FRESH CLONE: lint 0/0 · tsc 0 · 138/2760 · build · smoke 14/14 ·
  e2e 192/192 (clean first run, 5.7m) · probe:ref STABLE (46bc2d9c) ·
  census MATCH (15/24/10/23/12 + 4 users) · sitemap 11 routes + robots
  + manifest 200 · the Tailwind v4 state clean · the operator's
  standing asks verified (env/db placement · the vitest/playwright
  configs · sitemap/SEO · mobile-nav · `.env.example`).

- **WP-1 GREEN** — `scripts/discover-184.ts` (the discovery probe: the
  Edit-family reachability census — the reference's zero-row state
  kills the s388 close's first-named candidate with evidence; the
  expander RESTING byte-equal + the CLICK census — ours the 8→11
  reveal, the reference the 8→8 dead stub; the rail action pair — the
  Filter primary byte-equal BLUE rgb(37,99,235), no D-183a1 second
  member; the quick-log quartet byte-equal) then
  `scripts/walk57-activities-rail-open.ts` (the walk53/56 ledger form,
  four phases at the desktop axis + the phone absence; ONE tool
  calibration mid-maiden — the sequential-focus starting-point rule:
  Chromium's Tab drive starts from the last-focused element's position
  even after blur(), the blank-spot click the fix; the walk re-run
  STABLE — the delta census identical modulo the two repaired legs).
- **WP-2 GREEN** — the decode COMPLETE: **ZERO LIVE DEFECTS**; the
  hover face computed-EQUAL live (ours line-soft/neutral-900 ≡ the
  reference's accent/accent-foreground, rgb(245,245,245) +
  rgb(23,23,23) — the M-81c2 pair's outline-Button hover member, the
  first mouse-borne face ever walked); the closed-rail REAL Tab chain
  byte-equal 9 stops on both apps, ours-open 11 stops (the Task/Note
  checkboxes enter the order); every remaining delta a documented
  genus (the box-shadow slot-count · the outline VERSION FORM + both
  sub-forms + the currentColor cascade member · the aria-expanded
  superset · the L-125c2 dead-stub doctrine · the DATA-STATE owner
  options); the walk's own decode knowledge (the click-through
  hover-persistence form · the sequential-focus starting-point rule)
  documented in the pins + the session record.
- **WP-3 GREEN** — the pin survey first (FILTER_RAIL fragments +
  ACTIVITY_QUICKLOG standing; the s125 walk-pins hold the
  completed/scheduled toggle, never the expander — the genuine gap),
  then 3 born-green pins: the walk57 decode freeze · the more-filters
  expander construction FULL-string freeze · the reveal construction
  freeze (the Task/Note vocabulary + the REAL tab order).
- **WP-4 GREEN** — MUTATION-PROOF (the planted variant="outline" →
  variant="secondary" expander regression → exactly 1 RED — the
  full-string pin's unique teeth, the activities page's Badge outline
  and the quick-log ternary untouched → restored → GREEN, no residual
  diff) · STASH-PROOF (the round's test block stashed → exactly
  138/2760 → restored → 138/2763).
- **WP-5 GREEN** — count-ladder-184.py: 31 flips (2760 → 2763 [+3] ·
  badge 2952 → 2955, idempotent — the re-run a verified 0-flip
  no-op) · skill-head-184.py (the SKILL v1.181.0, the s183 layer
  demoted at its ship counts 2760/192, idempotent) · the F-106a1
  layer-axis + census pins re-anchored (the SKILL §5.6 checks 236 →
  239 with the negatives-ladder extended; the live-tense RED-first
  arithmetic site re-anchored 252 → 255) · the docs lockstep (the
  AGENTS Session-184 section · the PAD s184 inventory row · the
  CLAUDE page-layout bullet's walk57 tail · the README Tested row's
  walk57 clause + the badge · session_390.md · this execution record ·
  the worklog entry [Task ID 184]).
- **WP-6 GREEN** — the captures 471-474 (the expander HOVER ours+ref —
  the pair 0.00% pixel-diff BYTE-IDENTICAL, the first-walked hover
  face; the rail OPEN ours+ref — ours the revealed superset at
  336x605 with the white resting trigger, ref the dead face at
  336x510 with the persisted wash, the L-125c2 genus's own visible
  form; VLM battery 2/2 PASSED — the hover pair verified identical,
  the open pair verified: ours' More Types + Task/Note revealed, ref's
  absence) + the operator asks all verified standing.
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2763 · build ·
  smoke 14/14 · e2e 192/192 · db census MATCH · probe:ref STABLE ·
  the walk57 expander hover + open interiors byte-equal · the
  captures: the hover pair 0.00% (byte-identical).
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
