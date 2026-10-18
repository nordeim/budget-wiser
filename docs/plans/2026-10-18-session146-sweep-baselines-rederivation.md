# Session 146 — The Drift-Sweep Baselines Re-Derivation (the 146-c rotation)

**Date**: 2026-10-18 · **Repo**: nordeim/neo-crm · **Branch**: main

## The intake

The workspace pulled to `df480b6` (the s145 ship `356a135` + the session_308
record `9fa8536` + the session_309 transcript `df480b6` — the s145 ship
session's own log). The environment standing (the s145 sandbox's node_modules
+ db + .env verified: census MATCH 15/24/10/23/12 + 4 users). The four intake
docs read (session_308 + the s145 plan + the repo worklog + session_309).
The baseline gate GREEN — the exact s145-ship match: lint 0/0 · tsc 0 ·
**114/2112 unit** · build · **e2e 150/150** (one settings-Defaults
boundingBox flake on the first full-suite run — reproduced GREEN in
isolation + on the full re-run; the load-class flake, no source change).

## The audits

- **146-a (the s145 ship verification)**: 11/11 spot-verified, zero findings
  — the four unit pins (landing-page session-static + page-layout logout +
  login-views redirect/pure-render) + the guest 390 drawer e2e + the
  captures 310-312 + the (marketing) group layout (`getSessionUser() ??
  APP_GUEST_USER`, NO redirect) + the (app) guard untouched + SKILL v1.142.0
  + the PAD session-145 row + the AGENTS Session-145 section + `.env.example`
  tracked.
- **146-b (the standing battery)**: 11/11 PASS, zero findings — the secrets
  scan clean (src/ zero) · the rate limits standing (10/10/5/20/20) · the
  postcss plugin + the 7-day TTL + the db-path seam · zero dep changes
  (package.json/bun.lock unchanged db6ed2a..HEAD) · the vitest/playwright
  configs intact · the sitemap (11 routes, +about/+contact at 0.8) + robots
  standing · the drawer-battery-390 GREEN (the N-144b1 re-anchored battery).
- **probe:ref #118**: the reference **STABLE** at the s142-re-anchored
  fingerprint (`index-Dc6wvGtA.js` · 2731a47f… · 1,696,901) — the 5th
  consecutive stable session. No parity event; the rotation track.

## The rotation choice

The session_309 "next" hint offered two candidates: a second-cycle re-walk
of the marketing family's phone state, or the drift-sweep baselines'
re-derivation. **Chosen: the re-derivation.** The decode: the last FOUR
sessions (s142 build + s143 landing-family + s144 guest-family + s145
auth-transition) all censused the marketing family — its phone state freshly
walked at s142 (the landing disclosure menu + the FAQ at 390), s144 (the
about/contact 390 baselines), and s145 (the guest /About 390 + the drawer
pin); re-walking it is the lowest-yield track available. The baselines'
core 10-page tables date from s91–s99 — **47+ sessions old** — and the
re-measurement (below) found three stale entries. The re-derivation is the
maiden uniform re-measurement of all 4 viewport classes × 13 pages with the
genus decodes on every moved value.

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

- **The exact reproductions (the strongest confirmations)**: tablet landing
  15.34 EXACT · landscape landing 10.77 EXACT · tablet accounts 0.72 EXACT ·
  landscape accounts 2.43 EXACT (the maiden s97/s99 measurements, unchanged
  47+ sessions later) · desktop landing 9.59 (the maiden s142 value) ·
  desktop settings 4.73 / phone 7.34 / tablet 5.19 (the picklist genus) ·
  the login logo genus 0.28/0.78/0.46/0.46 · the phone floor family
  0.51-0.56 + about/contact 0.51 (the maiden s144 values).
- **F-146c1 THE PHONE-LANDING BASELINE EROSION (Medium, gate-integrity)**:
  the phone landing genus share measured **8.5** (the s142 maiden, the prior
  sandbox) → **5.32** (byte-stable ×3 runs; the cluster decode: the CTA
  band 4.30% + the hero badge 0.76% + the logo 0.22% — the SAME brand-token
  genus, the reference's invisible CTAs, unchanged). The 8.5 entry now
  carries **3.2 points of dead slack** — a real +3% blue-shift regression
  at the phone landing passes the `--fail-on-drift` gate asleep. The
  above-the-fold composition at 390 (the mock's sliver) rides the sandbox's
  font rasterization — the cross-sandbox variance is the share, not the
  genus. RE-ANCHOR 8.5 → 6.0 (trips at 6.5; +1.2 regression sensitivity,
  0.68 intra-sandbox headroom).
- **N-146a1 THE STALE DESKTOP GENERA ×2 (Low, docs/tooling)**: the desktop
  "standing explained" line (the header comment + the runtime
  standingExplained print + the baseline entry comments) still documents
  (a) contacts ~0.5% "the lucide aria-hidden superset + noise" — the value
  retired (0.00 for 4+ sessions; the aria-hidden superset is the DOM-level
  N-89c6 documented library superset, never the pixel diff — the s91
  comment misattributed it) and (b) dashboard ~0.3% "the 2px zero-area
  chart-baseline artifact" — retired since the s142 gates (0.03 both then
  and now; the artifact left with the s139/s142 chart re-derivations).
  The entries themselves carry the stale slack: contacts 0.6 → re-anchor
  0.1 (the family floor; trip 0.6 vs the old 1.1) · dashboard 0.4 →
  re-anchor 0.15 (trip 0.65 vs the old 0.9).

## The remediation (TDD — the pin re-anchors)

- **D-146a0 THE BASELINE RE-ANCHORS ×3** (scripts/sweep.ts):
  phone.landing 8.5 → 6.0 · desktop.contacts 0.6 → 0.1 ·
  desktop.dashboard 0.4 → 0.15 — each with the re-derivation comment (the
  s146 re-measurement + the retired/moved genus decode). Plus the header
  standing-explained block + the runtime standingExplained desktop line
  re-derived (the contacts + dashboard genera retired from the text; the
  settings/landing/login genera kept).
- **D-146a1 THE PIN RE-ANCHORS + THE MUTATION-PROOF ×3**:
  tests/sweep-tool.test.ts — the standingExplained pin re-anchored (the
  /lucide/ desktop requirement retired; the re-derived line pinned) + a
  NEW pin: the re-anchored baseline values themselves (the 6.0/0.1/0.15
  triple frozen; the s142-maiden 8.5 noted as the prior-sandbox value).
  The mutation-proof: each re-anchored value drifted (6.0→8.6 · 0.1→0.6 ·
  0.15→0.4) → exactly 1 RED each → reverted → GREEN.
- **D-146a2 THE RE-DERIVATION GATE RE-RUN**: the four drift gates
  (`--fail-on-drift` ×4 classes) GREEN under the re-anchored tables — the
  tightened tripwires verified live (the 5.32/0.00/0.03 measured values
  sit under the new 6.0/0.1/0.15 entries with the margin intact).
- **D-146a3 THE CAPTURES + THE VLM**: 313 our phone landing at 390 (the
  working blue CTA band above the fold — the genus's ours-face) · 314 the
  reference's phone landing at 390 (the invisible CTA — the genus's
  ref-face, the re-derivation's decode evidence). VLM battery 2/2.
- **D-146a4 THE DOCS REALIGNMENT**: the AGENTS Session-146 section · the
  session_309 record · the plan execution record · the worklog · the
  SKILL sweep-baselines carrier sites (if any carry the 8.5/0.6/0.4
  values) · the count ladder (unit count + the re-anchor pins).
- **D-146a5 THE FINAL GATE + THE SHIP**: lint 0/0 · tsc 0 · the unit count
  · build · e2e 150/150 · the four drift gates CLEAN ×4 under the
  re-anchored tables · census MATCH → the two-commit pattern pushed via
  the SSH wrapper to main.

## The walk-harness lessons (L-146c1..c2)

- **L-146c1 the baseline is a snapshot of its sandbox**: a standing table
  entry measured in one environment carries that environment's
  rasterization (the phone landing's 8.5→5.32 move with the genus
  unchanged) — the quarterly re-derivation is not optional bookkeeping;
  the dead slack compounds silently (3.2 points in 4 sessions here).
- **L-146c2 the genus comment must name the MECHANISM, not the value**: the
  s91 "lucide aria-hidden superset" comment attributed a DOM-level
  superset to a pixel diff — when the pixel noise retired, the comment
  kept documenting a genus that never was. The re-derived comments name
  the mechanism (the invisible-CTA share / the picklist data / the logo's
  constant-absolute pixels) so a future retirement decodes against the
  mechanism, not the number.

## The execution record (filled at ship)

- D-146a0 ✓ the three baseline re-anchors (phone.landing 8.5→6.0 ·
  desktop.dashboard 0.4→0.15 · desktop.contacts 0.6→0.1) + the header
  standing-explained block + the runtime standingExplained lines
  re-derived (the mechanism-named comments)
- D-146a1 ✓ the pin re-anchors (the standingExplained pin's /lucide/
  requirement retired + the desktop-table pin's stale floors lowered +
  the NEW session-146 describe ×3 its); the mutation-proof ×3 (each
  re-anchored value drifted → exactly 1 RED → reverted → GREEN; the
  suite 52/52)
- D-146a2 ✓ the four drift gates GREEN under the re-anchored tables
  (exit 0 ×4 — the tightened tripwires verified live)
- D-146a3 ✓ the captures 313-314 + the VLM battery 2/2 clean
- D-146a4 ✓ the docs realignment (2115/150/2265 · the 20 live-tense
  sites via the atomic script · the docs-counts lockstep + the
  negatives ladder · SKILL v1.143.0 + the session-146 layer · the
  AGENTS Session-146 section · the PAD session-146 row + the totals ·
  the session_310 record + the plan record + the worklog)
- D-146a5 ✓ the final gate GREEN (lint 0/0 · tsc 0 · 114/2115 · build
  · e2e 150/150 · the four drift gates CLEAN ×4 · census MATCH) + the
  two-commit ship via the SSH wrapper
