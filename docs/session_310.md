# Session 310 — the session-146 record (the drift-sweep baselines re-derivation)

## The intake

The workspace pulled to `df480b6` (the s145 ship `356a135` + the
session_308 record `9fa8536` + the session_309 transcript `df480b6` —
the s145 ship session's own log). The environment standing (node_modules
+ db + .env verified: census MATCH 15/24/10/23/12 + 4 users). The four
intake docs read (session_308 + the s145 plan + the repo worklog +
session_309). The baseline gate GREEN — the exact s145-ship match: lint
0/0 · tsc 0 · **114/2112 unit** · build · **e2e 150/150** (one
settings-Defaults boundingBox flake on the first full-suite run —
reproduced GREEN in isolation + on the full re-run; the load-class
flake, no source change).

## The audits

- **146-a (the s145 ship verification)**: **11/11 spot-verified, zero
  findings** — the four unit pins (landing-page session-static +
  page-layout logout + login-views redirect/pure-render) + the guest 390
  drawer e2e + the captures 310-312 + the (marketing) group layout
  (`getSessionUser() ?? APP_GUEST_USER`, NO redirect) + the (app) guard
  untouched + SKILL v1.142.0 + the PAD session-145 row + the AGENTS
  Session-145 section + `.env.example` tracked and matching.
- **146-b (the standing battery)**: **11/11 PASS, zero findings** — the
  secrets scan clean (src/ zero; `.env` untracked; `.env.example`
  tracked) · the rate limits standing (10/10/5/20/20) · the (app) guard
  standing · the postcss plugin + the 7-day TTL + the db-path seam ·
  zero dep changes (package.json/bun.lock unchanged db6ed2a..HEAD) ·
  the vitest + playwright configs intact · the sitemap (11 routes,
  +about/+contact at 0.8) + robots standing · the drawer-battery-390
  GREEN (the N-144b1 re-anchored battery).
- **probe:ref #118**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901) — the 5th
  consecutive stable session; its CRM-shell mobile defect STILL STANDS
  (TRUE-390 /Dashboard: nav 0/0/no menu buttons). No parity event; the
  rotation track.

## The rotation choice

The session_309 "next" hint offered two candidates: a second-cycle
re-walk of the marketing family's phone state, or the drift-sweep
baselines' re-derivation. **Chosen: the re-derivation** — the last FOUR
sessions (s142 build + s143 landing-family + s144 guest-family + s145
auth-transition) all censused the marketing family (its phone state
freshly walked at s142/s144/s145), while the baselines' core 10-page
tables date from s91–s99 — **47+ sessions old** — and the
re-measurement found three stale entries.

## The walk (walk36 — the maiden uniform baselines re-measurement)

All four classes swept at the standing viewports (1440x900 · 390x844 ·
768x1024 · 1024x768), the moved values reproduced across multiple runs:

| page | desktop | phone | tablet | landscape |
|------|---------|-------|--------|-----------|
| dashboard | 0.03 | 0.61 | 0.09 | 0.10 |
| landing | 9.59 | **5.32** | 15.34 | 10.77 |
| about | 0.00 | 0.51 | 0.00 | 0.00 |
| contact | 0.00 | 0.51 | 0.00 | 0.00 |
| accounts | 0.00 | 0.56 | 0.72 | 2.43 |
| contacts | **0.00** | 0.51 | 0.00 | 0.00 |
| leads | 0.00 | 0.51 | 0.07 | 0.00 |
| calendar | 0.01 | 0.55 | 0.02 | 0.02 |
| activities | 0.01 | 0.53 | 0.01 | 0.01 |
| reports | 0.00 | 0.71 | 0.00 | 0.00 |
| settings | 4.73 | 7.34 | 5.19 | 4.74 |
| profile | 0.00 | 0.51 | 0.00 | 0.00 |
| login | 0.28 | 0.78 | 0.46 | 0.46 |

**The verdict: ZERO upward drift — every genus byte-stable or retired:**

- **The exact reproductions (the strongest confirmations)**: tablet
  landing 15.34 EXACT · landscape landing 10.77 EXACT · tablet accounts
  0.72 EXACT · landscape accounts 2.43 EXACT (the maiden s97/s99
  measurements, unchanged 47+ sessions later) · desktop landing 9.59
  (the maiden s142 value) · the settings picklist 4.73/7.34/5.19/4.74 ·
  the login logo genus 0.28/0.78/0.46/0.46 · the phone floor family
  0.51-0.56 + about/contact 0.51/0.51 (the maiden s144 values).
- **F-146c1 THE PHONE-LANDING BASELINE EROSION (Medium,
  gate-integrity)**: the phone landing genus share measured **8.5** (the
  s142 maiden, the prior sandbox) → **5.32** (byte-stable ×3 runs; the
  cluster decode: the CTA band 4.30% + the hero badge 0.76% + the logo
  0.22% — the SAME brand-token genus, the reference's invisible CTAs,
  unchanged). The 8.5 entry now carried **3.2 points of dead slack** —
  a real +3% blue-shift regression at the phone landing passes the
  `--fail-on-drift` gate asleep. The above-the-fold composition at 390
  (the mock's sliver) rides the sandbox's font rasterization — the
  cross-sandbox variance is the share, not the genus. RE-ANCHORED
  8.5 → 6.0 (trips at 6.5; +1.2 regression sensitivity, 0.68
  intra-sandbox headroom).
- **N-146a1 THE STALE DESKTOP GENERA ×2 (Low, docs/tooling)**: the
  desktop "standing explained" line (the header comment + the runtime
  standingExplained print + the baseline entry comments) still
  documented (a) contacts ~0.5% "the lucide aria-hidden superset +
  noise" — the value retired (0.00 for 4+ sessions; the superset is the
  DOM-level N-89c6 library injection, an attribute never the pixel
  diff — the s91 comment misattributed it) and (b) dashboard ~0.3%
  "the 2px zero-area chart-baseline artifact" — retired since the s142
  gates (0.03 both then and now). The entries carried the stale slack:
  contacts 0.6 → re-anchored 0.1 (the family floor; trip 0.6 vs the old
  1.1) · dashboard 0.4 → re-anchored 0.15 (trip 0.65 vs the old 0.9).

## The remediation (TDD — the pin re-anchors)

- **D-146a0 THE BASELINE RE-ANCHORS ×3** (scripts/sweep.ts):
  phone.landing 8.5 → 6.0 · desktop.contacts 0.6 → 0.1 ·
  desktop.dashboard 0.4 → 0.15 — each with the re-derivation comment
  (the s146 re-measurement + the retired/moved genus decode). Plus the
  header standing-explained block + the runtime standingExplained
  desktop/phone lines re-derived.
- **D-146a1 THE PIN RE-ANCHORS + THE MUTATION-PROOF ×3**:
  tests/sweep-tool.test.ts — the standingExplained pin re-anchored (the
  /lucide/ desktop requirement retired; the re-derived line pinned: the
  brand-token genus + the 5.3 landing share + the not-~-8% negative) +
  the desktop-table pin's stale >= 0.3/0.4 floors lowered + the NEW
  session-146 describe (the three re-anchored values frozen + the
  byte-stable confirmations + the mechanism-comment source pins). The
  mutation-proof: each re-anchored value drifted (6.0→8.6 · 0.15→0.4 ·
  0.1→0.6) → exactly 1 RED each → reverted → GREEN (52/52).
- **D-146a2 THE RE-DERIVATION GATE RE-RUN**: the four drift gates
  (`--fail-on-drift` ×4 classes) GREEN under the re-anchored tables —
  the tightened tripwires verified live (the 5.32/0.00/0.03 measured
  values sit under the new 6.0/0.1/0.15 entries with the margin
  intact; exit 0 ×4).
- **D-146a3 THE CAPTURES 313-314 + THE VLM BATTERY 2/2**: 313 our
  phone landing at 390 (the working blue CTA band above the fold — the
  genus's ours-face; VLM: the blue "Open dashboard" CTA visible, the
  hero dark-on-white, zero overflow) · 314 the reference's phone
  landing at 390 (the invisible CTA — the genus's ref-face, the
  re-derivation's decode evidence; VLM: the CTA an empty white box
  with only the shadow silhouette, no blue anywhere, the rest normal).
- **D-146a4 THE DOCS REALIGNMENT**: the count ladder (UNIT 2112 → 2115
  · E2E 150 unchanged · badge 2262 → 2265 · SUITES unchanged 114 — the
  20 live-tense count sites re-anchored via the atomic script) · the
  docs-counts lockstep (the UNIT constant + the s146 ladder comment +
  the negatives ladder's retired 2112/2262 forms) · SKILL v1.143.0 +
  the H1 + the project_state session-146 layer (the s145 layer beneath)
  · the AGENTS Session-146 section · the PAD session-146 row + the
  totals + the HEAD/checklist/commands/file-tree sites · the CLAUDE
  four carriers · the README badge + Tested row + file tree + commands
  comment · this session_310 record + the plan execution record + the
  worklog.

## The walk-harness lessons (L-146c1..c2)

- **L-146c1 the baseline is a snapshot of its sandbox**: a standing
  table entry measured in one environment carries that environment's
  rasterization (the phone landing's 8.5→5.32 move with the genus
  unchanged) — the quarterly re-derivation is not optional
  bookkeeping; the dead slack compounds silently (3.2 points in 4
  sessions here).
- **L-146c2 the genus comment must name the MECHANISM, not the value**:
  the s91 "lucide aria-hidden superset" comment attributed a DOM-level
  superset to a pixel diff — when the pixel noise retired, the comment
  kept documenting a genus that never was. The re-derived comments name
  the mechanism (the invisible-CTA share / the picklist data / the
  logo's constant-absolute pixels) so a future retirement decodes
  against the mechanism, not the number.

## The ship

The final gate: lint 0/0 · tsc 0 · **114/2115** · build · **e2e
150/150** · the drift sweep CLEAN ×4 under the re-anchored tables ·
census MATCH. The two-commit pattern (the feat + the session log)
pushed to git@github.com:nordeim/neo-crm.git main via the SSH wrapper
(the paramiko shim; the dry-run then the real push; remote-verified;
the key shredded).

**Next**: run `probe:ref` at session open — the reference has been
stable for 5 sessions; a bundle change opens the next parity event.
Candidate walks: the second-cycle re-walk of the settings family's
phone state (the picklist genus surface — the only phone floor family
never re-walked second-cycle), or the standing-defects ledger's
quarterly re-census (the reference's two documented defects — the
CRM-shell mobile no-nav + the landing brand-token genus — re-verified
live).
