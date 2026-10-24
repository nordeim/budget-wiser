# Session 377 — THE DRAWER INTERIOR RE-WALK (walk50) (the session-177 round record)

Date: 2026-10-24 · Rotation: 177 · Agent: main (Z.ai CLI) ·
Plan: `docs/plans/2026-10-24-session177-drawer-interior-rewalk.md`

## The round

The post-176 audit rotation, its rotation trigger THE OWNER'S NEWEST
COMMIT `59c8f13` — the session-376 transcript, whose close names it
first ("the register's code-level candidates are now exhausted, so the
strongest next moves are the drawer interior re-walk, the
fresh-bundle re-derivation when the reference next ships a new bundle
(the probe will trip it), or the recharts 4.0 `Cell` → `shape` gate
already named in ADR-021"). The adjudication of the three: probe:ref
STABLE (`46bc2d9c`, unchanged since s168) kills the fresh-bundle
candidate; 4.0 unreleased (3.10.1 the registry's latest stable) kills
the gate candidate — **the walk is the round**, the candidate six
consecutive closes named (s171–s176) and no round ever ran.

## The audit (every leg verified live, on a fresh clone)

The intake: `bun install` · a fresh `.env` (64-char AUTH_SECRET +
`file:../db/custom.db`) · the ambient `DATABASE_URL` shadow scrubbed
with `env -u` on every DB-touching command · `db:push` + `db:seed` ·
census MATCH · playwright chromium. The baseline gate GREEN at the
exact s176 ship state: lint 0/0 · tsc 0 · **138/2733** unit · build ·
smoke **14/14** · e2e **192/192** (5.7m, foreground) · probe:ref
**STABLE** · the desktop + phone sweeps **CLEAN** (dashboard 0.01% ·
reports 0.21% — within the standing floors; the settings picklist-data
genus + the login logo genus the standing explained pair) · the mobile
drawer battery **GREEN** at 390×844 · the Tailwind v4 state clean ·
sitemap 11 routes + robots + manifest standing · census MATCH. The
Base44 reference re-verified live (the login → the landing → the
dashboard → the TRUE-390 drawer with its 8 links + Close + wordmark).
**Zero live defects; the register clean of named code-level candidates.**

## The round proper — THE DRAWER INTERIOR RE-WALK

**The coverage gap was real**: `scripts/interior-census.ts` carries
zero drawer references (52 page-axis runs, all drawer-CLOSED); the
a11y two-gate's drawer-open state scans axe violations only; the
drawer battery pins BEHAVIOR (locks, focus, ESC, resize); the captures
pin VISUAL; the source pins pin the CONTRACT STRINGS. The drawer-OPEN
interior — the element ledger both apps actually render — had never
been compared element-against-element. `mobile-nav.tsx` last moved at
s147 (30 sessions frozen at source), yet the interior it renders rides
`MOBILE_NAV_SHEET` · `nav-config` · the `ui/dialog` primitives · the
`@theme` tokens — none re-verified against the live reference drawer
since walk37 decoded it.

**THE WALK** (`scripts/walk50-drawer-interior.ts` — the two-app
element-ledger tool: both apps at 390×844, each drawer opened through
its own trigger, the DFS-spine ledger of tag · class · role/aria ·
text · geometry, element-against-element diff): OURS 61 rows vs REF
53 — every delta root-caused against both DOMs, never guessed.

**ONE LIVE DEFECT** — the drawer header's space-y-2 riding the v4
margin-BOTTOM semantics: the h2's `:where()` mb-2 PARTICIPATES in the
flex-column layout (header 88px), where the reference's v3-era
mt-on-the-sr-only-`<p>` never did (the absolute positioning takes the
p out of flow — header 80px). An **8px spine shift cascading to every
nav link and the footer group** (nav y 88 vs 80 · footer 436 vs 428 ·
every icon/rect +8), present since the s147 re-derivation and never
caught because no leg ever walked the open drawer's interior — the
pixels never showed it (the page sweeps never open the drawer).

**THE CURE**: the M-92c1 phantom-mb precedent — the explicit `mb-0`
on `MOBILE_NAV_SHEET.title` ((0,1,0) beats `:where()`'s (0,0,0)); the
header's space-y-2 class string stays byte-parity with the
reference's (walk50 ROW 7 byte-equal) while the COMPUTED rhythm goes
byte-equal (24 + 32 + 24 = 80px).

**THE ADJUDICATED GENERA** (each live-decoded, zero visual): the
`bg-sidebar` token vs the reference's `bg-[#2563eb]` literal —
computed-equal rgb(37,99,235), the house token idiom · the Close
button's shadcn stock-version class drift (`bg-accent` +
`text-muted-foreground` vs `bg-secondary`; `ring-offset-background`
absent) — BOTH dead variants (Radix Close carries no data-state; the
computed bg transparent on both apps, live-probed) · lucide's
`aria-hidden` — version genus · the React 19 `useId` format —
structural genus, the pointing relations identical · OUR kept
supersets re-verified invisible: the focus-visible ring,
`aria-current`, the nav `aria-label`s, the `span.truncate` label
wrapper (the 61−53 = 8 row-count difference's root cause), the icon
`shrink-0`.

**THE POST-CURE SPINE** (the walk re-run): header 80/80 · h2 32/32 ·
all 9 links byte-equal · footer 428/428 — and the two-app drawer-open
captures **0.02% apart** (the font-rendering floor; the reference's
Base44 badge closed).

**The TDD ledger**: 1 RED face at birth (the title mb-0 pin — the
honest RED on the unfixed source) + 1 born-green (the walk50 decode
freeze — the contract-freeze form, the s173 P-p/P-q precedent).
**MUTATION-PROOF**: the planted mb-0 regression → exactly 1 RED →
restored → GREEN. **STASH-PROOF**: the round's five lockstep files
stashed alone → exactly **138/2733** (the s176 ship state) → restored
→ **138/2735** GREEN. The drawer battery re-run GREEN at the walked
tree (the cure has zero behavioral face).

**THE COUNT LADDER**: 2733 → **2735** (+2, both pins in the existing
page-layout suite — the ADR-017 one-suite doctrine) · SUITES 138 HELD ·
E2E 192 HELD · badge 2925 → **2927** (count-ladder-177.py: 23 flips,
assert-first, idempotent — the re-run a verified 0-flip no-op) + the
collateral re-anchors (the PAD §11 page-layout row 1687 → 1695 · the
SKILL §5.6 census 1687/210 → 1695/212 · the docs-counts lockstep —
the census policing the census, the line-count pins live-catching the
round's own comment growth).

**THE DOCS LEG**: the AGENTS Session-177 section · the PAD **ADR-022**
(the interior re-walk doctrine: a surface's parity is only proven by
walking its OPEN/ACTIVE DOM + the v4 space-y margin-BOTTOM semantics
as a standing per-surface hazard, cured per-surface with the explicit
zero-margin override — never by rewriting the reference's literals) +
the session-177 inventory row + the §11 re-anchor · the CLAUDE
mobile-navigation bullet's walk50 extension · the README Tested row +
the badge · the SKILL **v1.174.0** + H1 + the s177 head layer (the
s176 layer comment-demoted at its ship counts 2733/192;
skill-head-177.py, idempotent) · this record + the plan's execution
record + the worklog entry (Task ID 177).

**THE CAPTURES** 443-REANCHOR + 445-448 (`docs/screenshots/`): the
post-cure drawer-open standing contract at phone, VLM-verified (the
CRM wordmark + the X close + the 8 links + the bordered Settings
group + the highlighted active link) · the reference's own
drawer-open parity face (the walk's counterpart evidence) · the
header wordmark detail (the mb-0 cure's own face) · the leads-active
drawer at phone.

## The verification ledger

lint 0/0 · tsc 0 · **138/2735** unit · build (the type-gate artifact)
· smoke **14/14** · e2e **192/192** · db census MATCH (15/24/10/23/12
+ 4 users) · probe:ref STABLE (`46bc2d9c`) · the desktop + phone
sweeps CLEAN · the drawer battery GREEN · the walk50 spine byte-equal.

## Suggested next steps

Verify the commit on GitHub. The next-rotation candidates: the
remaining unwalked OPEN interiors (the account menu + the leads
Filters popover were s113-walked, the dialogs s112/s172 — the oldest
unwalked OPEN interior is now the topbar search focus state + the
settings segmented tabs' active state, each adjudicated per ADR-022)
· the fresh-bundle re-derivation the day probe:ref trips (walk50
pairs with it as the interior face) · the recharts 4.0 `Cell` →
`shape` gate when 4.0 ships.
