# The session-177 plan — THE DRAWER INTERIOR RE-WALK (walk50)

Date: 2026-10-24 · Rotation: 177 ·
Task: audit + validate the session-176 ship (the recharts 3.x migration),
then execute the drawer interior re-walk — the coverage gap the last six
closes named and no round ever ran as its own rotation — TDD-first where it
surfaces code, align every doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

The workspace re-cloned fresh at `59c8f13` (the s176 ship `f484701` + the
owner's session-376 transcript commit). The intake: `bun install` · a
fresh `.env` (64-char AUTH_SECRET + `file:../db/custom.db`) · the ambient
`DATABASE_URL` shadow scrubbed with `env -u` on every DB-touching command ·
`db:push` + `db:seed` · census MATCH (15/24/10/23/12 + 4 users) ·
playwright chromium.

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN (full strictness, tsc 0) |
| unit | GREEN **138/2733** (the s176 ship state, exact) |
| build | GREEN (the type-gate build) |
| smoke | GREEN **14/14** (incl. sitemap + robots + manifest 200) |
| e2e | GREEN **192/192** (5.7m, foreground) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c` — unchanged since the s168 fingerprint) |
| drift gates | the desktop + phone sweeps **CLEAN live** (dashboard 0.01% · reports 0.21% — within the standing floors; settings picklist-data genus + login logo genus the standing explained pair) |
| mobile drawer | the battery **GREEN** at 390×844 (locks engage/release, focus trap, ESC, resize-past-md auto-close) |
| Tailwind v4 state | clean (`@tailwindcss/postcss` ^4.3.3 · CSS-first `@theme`, no JS config, the shadow/blur re-pins standing) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current |

**Zero live defects** — the audit verdict matches the s176 round's. The
register is clean of named code-level candidates: N-3 retired (s176) ·
N-4 retired (s174) · N-2 verified intentional (the capital-route parity
aliases) · N-1 the owner-level doc-restructure deferral · N-5 the
satisfied-by-s173/s175 watch item.

### 0.1 The rotation trigger

The owner's newest commit `59c8f13` — the session-376 transcript, whose
close names the round: "the register's code-level candidates are now
exhausted, so the strongest next moves are **the drawer interior
re-walk**, the fresh-bundle re-derivation when the reference next ships a
new bundle (the probe will trip it), or the recharts 4.0 `Cell` → `shape`
gate already named in ADR-021." The adjudication of the three:

| Candidate | Verdict | Evidence |
|---|---|---|
| **the drawer interior re-walk** | **THIS ROUND** | The coverage gap is real: `scripts/interior-census.ts` carries zero drawer references (52 page-axis runs, all drawer-CLOSED); the a11y two-gate's drawer-open state scans axe violations only; the drawer battery pins BEHAVIOR (locks, focus, ESC, resize); the captures pin VISUAL; the source pins pin the CONTRACT STRINGS — but no leg has ever walked the two apps' drawer-open DOMs element-against-element. `mobile-nav.tsx` last moved at s147 (30 sessions frozen at source), yet the interior it renders rides `page-layout.ts` MOBILE_NAV_SHEET · `nav-config` · the `ui/dialog` primitives · the `@theme` tokens — none of them re-verified against the live reference drawer since walk37 decoded it. |
| the fresh-bundle re-derivation | NOT TRIPPED | probe:ref STABLE (`46bc2d9c`, unchanged since s168) — the reference has shipped no new bundle. |
| the recharts 4.0 gate | NOT RIPE | 3.10.1 is the registry's latest stable; 4.0 is unreleased (the `Cell` → `shape` refactor stays the documented future gate, ADR-021). |

The same candidate was named (and deferred in favor of other rounds) at
the s171, s172, s173, s174, s175 and s176 closes — six consecutive
nominations. The register being otherwise clean, this round runs it.

### 0.2 The walk's object — what "interior" means here

The walk37 decode (s147) derived the drawer's contracts from the
reference's live DOM and rebuilt our drawer onto the repo's Radix
primitives to match. What has NEVER been re-verified since: the
element-level agreement of the two rendered drawer-open DOMs — the tree
shape (overlay → content → close → header → nav → footer), every
element's class string, the ARIA/AOM face (roles, aria-*, the
no-aria-modal parity), the geometry (sheet 288px `w-72`, the header
rhythm, the link paddings, the footer's mt-4 border-t group), and the
animation-duration classes (500ms in / 300ms out). The walk's job: dump
both DOMs at 390×844 with the drawer open, diff them
element-against-element, and classify every delta as parity match ·
documented genus (the kept supersets: the focus-visible ring, the
main-scroller lock's inline style, our sr-only description placement) ·
or a live defect to fix TDD-first.

### 0.3 The deferral register (open decisions, resolved with rationale)

| Candidate | Verdict | Rationale |
|---|---|---|
| The walk's data posture | SEEDED (ours) | The drawer's interior carries zero data-bound faces (nav links + wordmark + description) — the seeded dev DB avoids the zero-data reseed cycle the sweeps pay; the reference's own drawer is data-free by construction. |
| The standing-gate productization | DECIDED BY THE WALK'S YIELD | If the maiden pass surfaces zero unexplained deltas, the drawer-open interior joins the drift-gate family as a DOCUMENTED one-time decode + the standing legs that already carry it (battery + a11y drawer-open + the capture) are adjudicated sufficient — the census extension is NOT built speculatively (the s9 lesson: no speculative scaffolding). If it surfaces drift, the drift's cure decides the leg's form. |
| The reference login posture | STORAGESTATE REUSE | The sweep-state pair (the s162 login consolidation) — ONE reference login, state reused; the login rate-limit wall (L-158c3) never tripped. |
| New e2e | ONLY IF THE WALK FINDS A FIXABLE DEFECT | The standing 192 carries the drawer's behavioral battery; an interior fix without a behavioral face adds unit/source pins, not e2e. |

## 1. The work packages

### WP-1 — the walk50 tool (`scripts/walk50-drawer-interior.ts`)

A phased-idiom walk (the walk32/walk41 form): boot the dev server (ours,
seeded) + the reference with the sweep-state storageState; both at
390×844; open each drawer (the reference's `aria-label="Open navigation"`
trigger; ours the same); wait out the 500ms slide; dump each app's
drawer-open DOM as an element ledger (tag · class · role/aria · text ·
bbox); diff the ledgers element-against-element; print the
classification table. ONE reference login, ours fresh (the standing
posture).

### WP-2 — the decode + classification

Every delta root-caused against both DOMs, never guessed: parity match ·
documented genus (the kept supersets — each re-verified as invisible to
pixels, per the s147 doctrine) · live defect → the TDD queue. The
expected-but-unverified faces the walk adjudicates: the tree shape · the
sheet/overlay class strings · the close button's placement classes · the
header wordmark rhythm · the 8-link nav + the footer group · the
animation duration classes · the ARIA face (the no-aria-modal parity ·
aria-current on the active link · the sr-only description).

### WP-3 — the TDD battery (RED first, wherever the walk names a pin)

The decode's contract freeze: the drawer-interior pins land in the
existing suites (the ADR-017 one-suite doctrine — the battery extends
`tests/page-layout.test.ts`/`tests/dialog-geometry-parity.test.ts`
families or a focused describe block in the drawer's own tool-test
family, decided by the pin's object). The RED faces are born honestly —
a pin that freezes a live-defect cure fails before the cure lands; a
contract-freeze pin over working code is born-green (the s173 P-p/P-q
precedent). The mutation form: a planted class-string regression trips
exactly the new pin.

### WP-4 — the proofs + the standing re-verification

THE STASH-PROOF (the round's source moves stashed alone → exactly the
round's pins RED → restored → GREEN). The standing legs re-run at the
walked tree (the drawer battery · probe:ref · the desktop + phone
sweeps) — the parity verdict unchanged unless the walk's fixes name a
surface. The drift-gate adjudication per §0.3.

### WP-5 — the docs lockstep

The count ladder 2733 → 2733+N · SUITES 138 **HELD** (the one-suite
doctrine; a new suite ONLY if the pins need their own file — then 139)
· E2E 192 **HELD** · badge 2925 → 2925+N (`count-ladder-177.py`,
assert-first, idempotent, unique-anchor). The docs: the AGENTS
Session-177 section · the PAD session-177 inventory row (+ the §11
re-anchors the live line-count census trips) + the ADR-022 if the walk
deposits a doctrine (the standing-gate adjudication's rationale) · the
CLAUDE drawer bullet extension if the contract set grows · the README
Tested row + the badge · the SKILL **v1.174.0** + H1 + the s177 head
layer (skill-head-177.py, idempotent) · `session_377.md` + this plan's
execution record + the worklog entry (Task ID 177).

### WP-6 — the captures 445-448 (`docs/screenshots/`)

The walk's own evidence faces: the two apps' drawer-open side-by-side
(the parity anchor) · the drawer-open standing contract at phone (the
443 lineage) · a drawer-interior detail face the walk names (the footer
group or the header rhythm — whichever the decode adjudicates) · one
more surface at the round's discretion. VLM-verify the evidence faces
per the house convention.

## 2. The TDD ledger (to be filled at execution)

- RED birth: the WP-3 pins on the pre-fix tree (the honest faces).
- GREEN: the walk's cures land; the full unit suite at the new count.
- The live parity ledger: the standing legs re-verified at the walked
  tree.

---

## 3. The execution record (filled at ship)

- **WP-1 GREEN** — the walk50 tool landed
  (`scripts/walk50-drawer-interior.ts`): both apps at 390×844 through
  their own "Open navigation" triggers, the DFS-spine element ledger
  (tag · class · role/aria · text · geometry), the reference riding
  the sweep-state pair (the s162 guarded form, ZERO fresh logins on
  the re-runs). OURS 61 rows vs REF 53.
- **WP-2 GREEN** — every delta root-caused: **ONE LIVE DEFECT** (the
  drawer header's v4 space-y margin-BOTTOM face — the h2's `:where()`
  mb-2 in flow, header 88px vs the reference's 80px, an 8px spine
  shift cascading to every link + the footer, present since s147) +
  the adjudicated genera (the token/literal computed-equal · the dead
  shadcn variants, live-probed transparent on both apps · lucide's
  aria-hidden · the useId format · the kept supersets each
  re-verified invisible).
- **WP-3 GREEN** — the TDD battery: 1 RED face at birth (the title
  mb-0 pin) + 1 born-green (the walk50 decode freeze, the s173 P-p/P-q
  precedent); the cure landed (`MOBILE_NAV_SHEET.title` + `mb-0`, the
  M-92c1 phantom-mb precedent); the s147 title pin re-anchored in
  place (the contract's documented growth).
- **WP-4 GREEN** — MUTATION-PROOF (the planted mb-0 regression →
  exactly 1 RED → restored → GREEN) · STASH-PROOF (the round's five
  lockstep files stashed → exactly 138/2733 → restored → 138/2735) ·
  the drawer battery re-run GREEN · the walk re-run: **the spine
  byte-equal at every element** (header 80/80 · h2 32/32 · all 9 links
  equal · footer 428/428), the two-app drawer-open captures 0.02%
  apart (the font floor). The standing-gate adjudication (§0.3): the
  maiden pass DID surface drift — the drift's cure (the mb-0 + the
  pinned contract) is the leg's form; no census extension built (the
  walk tool itself is the standing script, re-runnable the day
  probe:ref trips — it pairs with the probe as the interior face of
  the fresh-bundle re-derivation, documented in ADR-022).
- **WP-5 GREEN** — the count ladder 23 flips (2733 → 2735 · badge
  2925 → 2927, count-ladder-177.py, the re-run a verified 0-flip
  no-op) · the collateral re-anchors LIVE-CAUGHT by the suite itself
  (the PAD §11 page-layout row 1687 → 1695 · the SKILL §5.6 census
  1687/210 → 1695/212 · the docs-counts four-site lockstep) · the
  SKILL v1.174.0 + the s177 head layer (skill-head-177.py, idempotent)
  · the AGENTS Session-177 section · the PAD ADR-022 + the inventory
  row + the §11 re-anchor · the CLAUDE mobile-navigation bullet's
  walk50 extension · the README Tested row + the badge · session_377.md
  + this execution record + the worklog entry (Task ID 177).
- **WP-6 GREEN** — the captures 443-REANCHOR + 445-448 landed; 443 +
  447 VLM-verified (the wordmark + the X close + the 8 links + the
  bordered Settings group + the highlighted active link; the header
  detail's own face).
- **THE VERIFICATION LEDGER** — lint 0/0 · tsc 0 · 138/2735 · build
  (the type-gate artifact) · smoke 14/14 · e2e 192/192 · census MATCH
  · probe:ref STABLE · the desktop + phone sweeps CLEAN · the drawer
  battery GREEN · the walk50 spine byte-equal.
- **SHIPPED** — committed on main + pushed via
  `docs/ssh_git_wrapper_v3.py` (the remote verified; no new branches).
