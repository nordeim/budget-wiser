#!/usr/bin/env python3
"""skill-head-176.py — the SKILL frontmatter head surgery (the s176 layer).

The L-169c3 form: the verified-single guard. The demoted s175 layer keeps
its SHIP-TIME counts (2726/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.172.0 -> 1.173.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s175 line already carries
2733 — the demotion restores the s175 ship count (2726) in the retired
copy, and the new s176 layer carries 2733 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S176_MARKER = "project_state: 2733 unit checks + 192 e2e checks green; the session-176 layer ("

if S176_MARKER in text:
    print("  no-op  [SKILL head] the s176 layer already live")
else:
    LIVE_MARKER = "project_state: 2733 unit checks + 192 e2e checks green; the session-175 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s175 head marker found {live_count} times"

    # 1) extract the live s175 line (post-ladder: 2733; the ship count is 2726)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2733 unit checks", "project_state: 2726 unit checks", 1
    )

    # 2) the demoted block — the s175 layer keeps its ship counts (2726/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-175 layer (comment-demoted at session-176 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s176 live layer
    S176_LAYER = (
        "project_state: 2733 unit checks + 192 e2e checks green; the session-176 layer "
        "(THE RECHARTS 3.x MIGRATION — the N-3 retirement; the post-175 audit round, "
        "its rotation trigger THE OWNER'S NEWEST COMMIT [35f04d5: the session-374 "
        "transcript, whose close names this round verbatim — 'the recharts 2.15 -> "
        "3.x migration (N-3, needs its own baseline re-derivation round) is the "
        "largest remaining named candidate']; the baseline gate GREEN at the exact "
        "s175 ship state: lint 0/0 · tsc 0 · 138/2726 · build · smoke 14/14 · e2e "
        "192/192 · probe:ref STABLE (46bc2d9c) · the desktop + phone sweeps CLEAN · "
        "the mobile drawer battery GREEN at 390x844 · census MATCH — ZERO live "
        "defects, the audit verdict matching the s175 round's): THE MIGRATION "
        "[recharts ^2.15.4 -> ^3.10.1 via bun add — the sibling zb's proven 3.10 "
        "line, the registry's latest stable; the official 3.0 guide's breaking "
        "census against our NINE chart-type JSX sites surfaced exactly ONE "
        "DOM-visible default flip — accessibilityLayer ships false in 2.x, TRUE in "
        "3.0+ — the explicit {false} pinned at every site (charts.tsx's seven "
        "families + the Sparkline's area/line arms) to preserve the reference's "
        "2.x wrapper DOM (the parity doctrine; the a11y two-gate's sanctioned "
        "register was calibrated on the 2.x genus); the type seam closed at the "
        "boundary (the Tooltip Formatter contravariance via the tooltipFormatter "
        "adapter — Number() the identity on the numeric aggregates — + the Pie "
        "label double-cast against the closed PieLabelRenderProps view, recharts' "
        "own PieSectorDataItem note: 'we spread the data object into the sector "
        "data item, so we can't really know what is going to be inside' — our "
        "open-record param models the runtime truth); the L-138c1 tickProp guard "
        "RETAINED as the harmless belt-and-suspenders form (the defaultProps "
        "machinery the hazard lived in is GONE in the 3.x state rewrite)]: THE "
        "LIVE 3.x FACES DECODED [the tick-label TEXTS moved out of the axis "
        "wrappers into per-axis z-index layers (recharts-yAxis-tick-labels) — the "
        "e2e funnel re-anchor; recharts 3.x ELIDES the zero-value bar rectangles "
        "— 2.15 rendered five degenerate zero-height wrappers, visually identical "
        "(zero-height was never a visible pixel — the drift sweeps carry the "
        "pixel-parity proof), the e2e reset re-anchor pins the aliveness face "
        "(the wrapper + the y-domain ticks + the stage labels, never a blank "
        "panel — the s10 contract holds); the e2e grid SENTINEL — the L-138c2 "
        "'future recharts upgrade' guard — PASSED live on 3.10.1 (the 9-line "
        "classic grid): THE UPGRADE-PROOF]; THE CENSUS DECODER EXTENSION [the "
        "recharts3-restructure genus — signature-matched (both sides g-elements "
        "carrying recharts classes with one side carrying a 3.x structural token, "
        "or the collapsed same-class tick), never a /recharts/ catch-all, with "
        "the r3Boxes containment cascade (the s95 poke-cascade precedent) + its "
        "negatives pinned (a DIV pair never rides it; a same-class "
        "non-degenerate tick with a real 50px drift stays RED)] + THE COLLECTOR "
        "CHART-INTERIOR EXCLUSION [the walk42 glyph doctrine extended to the "
        "chart svg — the tablet-dashboard decode: the version-borne interiors "
        "sustain FALSE resync offsets (the ref pointer stalled inside the "
        "Pipeline chart's 2.x interiors while ours advanced — the card-level "
        "tail re-paired across cards at a phantom +581; the direct probe proved "
        "both apps BYTE-EQUAL at every card position); the recharts svg BOX "
        "stays censused (the chart's layout face, with the wrapper divs), the "
        "interior never enters the alignment — the chart visual + DOM parity "
        "rides the pixel sweeps + the e2e chart pins]: THE COUNT LADDER 2726 -> "
        "2733 (+7: the charts-internals s176 battery [+4: the version floor · "
        "the lockfile resolution · the accessibilityLayer 9-site parity census · "
        "the e2e grid-sentinel existence freeze] + the census-tool s176 genus "
        "pins [+3: the attribution with negatives · the collector exclusion · "
        "the decoder exact-token source pin]) · SUITES 138 HELD · E2E 192 HELD "
        "· badge 2918 -> 2925 (count-ladder-176.py: 23 flips, assert-first, "
        "idempotent — the re-run a verified 0-flip no-op) + the collateral "
        "re-anchors (the PAD stack-table recharts row 2.15.4 -> 3.10.1 · the "
        "facts-census installed-stack row · the session-140 funnel pin + the "
        "reports-filter spark pin — the opening-tag forms gaining the parity "
        "prop); THE MUTATION-PROOFS (the planted version regression ^3.10.1 -> "
        "^2.15.4 -> exactly 1 RED, the version floor · the planted parity "
        "regression — the accessibilityLayer prop removed from the TrendLine "
        "family -> exactly 1 RED, the 9-site census; both reverted -> GREEN) + "
        "THE STASH-PROOF (the round's five source files stashed alone -> "
        "exactly 6 RED — the round's pins; restored -> 2733 GREEN) + THE "
        "DRIFT-GATE LEDGER (the six gates re-run in full at the migrated tree — "
        "the desktop + phone + tablet + landscape sweeps CLEAN · the fullpage "
        "CLEAN (docH byte-equal 4990/7259) · the interior census CLEAN at all "
        "four axes — the migration is RENDER-IDENTICAL, the predicted baseline "
        "re-derivation NOT NEEDED, the standing baselines hold); the "
        "accessibilityLayer-ON rejection + the Cell->shape deferral (the 4.0 "
        "gate) + the recharts version choice resolved in the plan's deferral "
        "register; THE VERIFICATION: lint 0/0 · tsc 0 (full strictness, the 3.x "
        "types) · 138/2733 unit · build (the type-gate artifact) · smoke 14/14 "
        "· e2e 192/192 · db census MATCH) + beneath it 2726 unit checks + 192 "
        "e2e checks green; the session-175 layer (THE RESPONSE-SIDE "
        "WIRE-CONTRACT FAMILY — the READ half — the post-174 audit round)"
    )

    new_text = text.replace(live_line, demoted_block + S176_LAYER, 1)

    # 4) the frontmatter version bump (1.172.0 -> 1.173.0)
    assert new_text.count("version: 1.172.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.172.0", "version: 1.173.0", 1)

    # 5) the H1 lockstep
    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.172.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.172.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.173.0)",
        1,
    )

    # 6) the last_updated lockstep
    assert new_text.count("last_updated: 2026-10-23") == 1, "the last_updated anchor must be unique"
    new_text = new_text.replace("last_updated: 2026-10-23", "last_updated: 2026-10-24", 1)

    SKILL.write_text(new_text, encoding="utf8")
    print("  surgery [SKILL head] the s176 layer live + v1.173.0 + H1 + last_updated lockstep")

print("skill-head-176: done.")
