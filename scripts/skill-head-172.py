#!/usr/bin/env python3
"""skill-head-172.py — the SKILL frontmatter head surgery (the s172 layer).

The L-169c3 form: the verified-single guard (the live head exists exactly
once). The demoted s171 layer keeps its SHIP-TIME counts (2668/186) in
its own comment block (the s171-fix precedent — never inside another
wrapper). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.168.0 -> 1.169.0) + the H1 lockstep.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S172_MARKER = "project_state: 2697 unit checks + 192 e2e checks green; the session-172 layer ("

if S172_MARKER in text:
    print("  no-op  [SKILL head] the s172 layer already live")
else:
    LIVE_MARKER = "project_state: 2668 unit checks + 186 e2e checks green; the session-171 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s171 head marker found {live_count} times"

    # 1) extract the live s171 line
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted block — the s171 layer keeps its ship counts (2668/186)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-171 layer (comment-demoted at session-172 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170 layers sit\n"
        "     demoted above it):\n\n"
        + live_line
        + "\n-->\n\n"
    )

    # 3) the new s172 live layer
    S172_LAYER = (
        "project_state: 2697 unit checks + 192 e2e checks green; the session-172 layer "
        "(THE DIALOG-SURFACE NAMED-CONTROL CLOSURE + THE FAST-CHECK PROPERTY FAMILY — the "
        "post-171 audit round [the baseline gate GREEN at the exact s171 ship state: lint "
        "0/0 · tsc 0 · 135/2668 · build · smoke 14/14 · e2e 186/186 · probe:ref STABLE · the "
        "desktop + phone sweeps CLEAN live · the mobile drawer 7/7 at 390×844 · the Tailwind "
        "v4 state clean · sitemap 11 routes + robots + manifest standing · census MATCH — the "
        "live OPEN-DIALOG probes (axe-core 4.13 on each open state, ours + the REFERENCE's "
        "own open dialogs for the parity citation)]: THE DIALOG-SURFACE NAMED-CONTROL "
        "CLOSURE [F-172a/b/c — the closed-by-default genus the s171 probes never reached "
        "(a Radix Dialog's content is ABSENT from the DOM while closed — invisible to every "
        "open-surface probe AND to the a11y two-gate): 9 nameless create-dialog "
        "SelectTriggers (Lead 2 · Account 1 · Contact 1 · Event 3 · Activity 2) + the "
        "entity-edit-dialog family: 5 nameless config-driven SelectTriggers + 17 unlabeled "
        "Inputs (the bare <Label>{f.label}</Label> renders no htmlFor, the Inputs no id); "
        "THE PARITY CONTEXT verified live on the reference's own open DOM: it ships the "
        "IDENTICAL nameless-combobox family on every dialog PLUS its own label violations "
        "(its event dialog: 4 unlabeled inputs) — the fixes are invisible supersets, the "
        "s171 doctrine; THE CURE: aria-label = the sibling Label's exact text on the 9 "
        "create triggers + the edit-dialog htmlFor/id wiring (`edit-${f.key}`) + "
        "`aria-label={f.label}` on the config-driven trigger; the two-gate EXTENDED: "
        "tests/e2e/a11y.spec.ts +6 EXPLICIT registrations (the five create dialogs + the "
        "contact edit dialog — open → scanTwoGate → Escape; the sanctioned register rides "
        "UNCHANGED, the open-dialog landscape verified live: nothing new behind the "
        "dialogs)] + THE FAST-CHECK PROPERTY FAMILY [F-172d — the other s170-named "
        "candidate, the round's ONE devDep bump (fast-check ^4.10.2; the "
        "no-mid-rotation-bump posture holds: s171 bumped axe-core, s172 bumps fast-check); "
        "tests/property.test.ts — the 137th suite, +13: the csv escape/parse round-trip "
        "(P-a) + the guard idempotence (P-b) + the lead-views round-trip (P-c) + the "
        "saved-reports total/idempotent seam (P-d) + the formatter robustness freeze (P-e) "
        "+ the initials invariants (P-f) + the csvFilename convention (P-g)] + THE "
        "PARSER FIX [F-172e — parseCsv's GLOBAL line-ending normalization mutated quoted "
        "cells (a quoted CRLF became LF on import, RFC 4180 §2.6 violated; live-caught by "
        "the P-a property at RED birth): the normalization moved INSIDE the state machine, "
        "OUTSIDE quotes only — unquoted CRLF/lone CR keep the pinned s26 row-break "
        "behavior]; the source-pin battery [tests/dialog-controls.test.ts — the 136th "
        "suite, +14: the trigger census + the exact label forms + the htmlFor/id wiring "
        "pins + the dialog-scan spec contract + the declared fast-check pin]; the count "
        "ladder 2668 → 2697 (+29: dialog-controls +14 + property +13 + the "
        "inventory-census +2 [the two new §11 rows — the L-166c3 lesson live again]) · "
        "SUITES 135 → 137 · E2E 186 → 192 (+6) · badge 2854 → 2889 — every live-tense site "
        "re-anchored atomically (count-ladder-172.py, assert-first, idempotent, "
        "unique-anchor) + the SKILL v1.169.0 frontmatter + H1 lockstep + this s172 head "
        "layer [the s171 layer comment-demoted at its ship counts] + the collateral "
        "re-anchors (dialog-geometry [the bare-cell pin rides the aria-label form] · "
        "dead-code-hygiene [the 13th devDep] · inventory-census [the 37-row surface] · "
        "docs-counts [the constants + the Appendix B a11y row 25 → 31] · README [the "
        "commands list + the Tested row]); THREE live-caught property-calibration catches "
        "at RED birth (the unqualified vocabulary intrusion — the EDIT dialog's word is "
        "NOT the filter word · the undefined minValue — the seam contract is raw strings · "
        "the ragged-row normalization — the toCsv model renders fixed-width column sets)] "
        "+ beneath it 2668 unit checks + 186 e2e checks green; the session-171 layer (THE "
        "AXE-CORE A11Y TWO-GATE + THE NAMED-CONTROL FAMILY — the post-170 audit round)"
    )

    # 4) replace: the demoted block + the new live layer where the live line sat
    text2 = text[:start] + demoted_block + S172_LAYER + text[end:]

    # 5) the version bump + H1 lockstep
    text2 = text2.replace("version: 1.168.0", "version: 1.169.0", 1)
    text2 = text2.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.168.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.169.0)",
        1,
    )

    SKILL.write_text(text2, encoding="utf8")
    print("  flipped [SKILL head] the s172 layer live · the s171 layer demoted (ship counts)")
    print("  flipped [SKILL version] 1.168.0 -> 1.169.0 + the H1 lockstep")
