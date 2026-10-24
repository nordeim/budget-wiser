#!/usr/bin/env python3
"""skill-head-182.py — the SKILL frontmatter head surgery (the s182 layer).

The L-169c3 form: the verified-single guard. The demoted s181 layer keeps
its SHIP-TIME counts (2754/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.178.0 -> 1.179.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s181 line already carries
2757 — the demotion restores the s181 ship count (2754) in the retired
copy, and the new s182 layer carries 2757 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S182_MARKER = "project_state: 2757 unit checks + 192 e2e checks green; the session-182 layer ("

if S182_MARKER in text:
    print("  no-op  [SKILL head] the s182 layer already live")
else:
    LIVE_MARKER = "project_state: 2757 unit checks + 192 e2e checks green; the session-181 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s181 head marker found {live_count} times"

    # 1) extract the live s181 line (post-ladder: 2757; the ship count is 2754)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2757 unit checks", "project_state: 2754 unit checks", 1
    )

    # 2) the demoted block — the s181 layer keeps its ship counts (2754/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-181 layer (comment-demoted at session-182 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s182 live layer
    S182_LAYER = (
        "project_state: 2757 unit checks + 192 e2e checks green; the session-182 layer "
        "(THE REPORTS-FILTER SELECTS OPEN-STATE INTERIOR WALK [walk55] — the s384 "
        "close's first-named candidate ['the reports filter selects' OPEN states "
        "beyond the walk53 settings arm', the s385 close's own first arm] — walk53's "
        "Phase B consumed the settings Defaults select, the reports page's own "
        "four filter instances never walked; the post-181 audit round, its "
        "rotation trigger THE OWNER'S NEWEST COMMIT [e59fc03: the session_385 "
        "transcript — the s181 round's own execution record]; the probe STABLE at "
        "46bc2d9c kills the fresh-bundle candidate, the registry's latest staying "
        "3.10.1 kills the recharts 4.0 gate; the baseline gate GREEN at the exact "
        "s181 ship state on a FRESH CLONE: lint 0/0 · tsc 0 · 138/2754 · build · "
        "smoke 14/14 · e2e 192/192 clean first run · census MATCH · the drawer "
        "battery GREEN at 390x844 · the desktop + phone sweeps CLEAN): THE WALK "
        "[scripts/discover-182.ts the discovery probe — the four comboboxes at "
        "byte-equal geometry on both apps, OURS carrying the four aria-label "
        "supersets the reference's triggers lack, the mount-focus DIV/option on "
        "every open; then scripts/walk55-reports-selects-open.ts, the walk53 "
        "ledger form over the reports filter bar's FOUR selects' OPEN states at "
        "BOTH axes (1440x900 + 390x844): the trigger RESTING + OPEN faces, the "
        "listbox DFS ledger, the option faces RESTING + the checked option's "
        "HIGHLIGHTED face, then the REAL keyboard ArrowDown drive]: THE VERDICT "
        "— ZERO LIVE DEFECTS [the period spine 24 rows byte-equal on both axes "
        "(6 options, checked This Quarter both, ArrowDown -> YTD both); the stage "
        "spine 27 rows byte-equal (7 options, ArrowDown -> Prospecting both); "
        "the status spine 18 rows byte-equal (4 options, ArrowDown -> Open "
        "both); the owner arm the DATA-STATE genus — OURS 18 rows (4 options: "
        "All Owners + the 3 DISTINCT seeded opp owners) vs the reference's 9 "
        "(1 option: All Owners only, its live zero-data state), the listbox "
        "height 138-vs-42 the data-borne consequence, the ArrowDown landing "
        "Omar Haddad-vs-All Owners the same; the chrome + the static All "
        "Owners option byte-equal behind the standing genera]; the genera [the "
        "outline VERSION FORM re-met on every face + BOTH its sub-forms — the "
        "alpha-color carrier on the triggers (OURS 3px none rgb(10,10,10) vs "
        "the reference's 3px none rgba(10,10,10,0.5) — style none paints "
        "ZERO pixels on both) · the transparent-solid carrier on the options "
        "(OURS 1px none rgb(16,16,16) vs the reference's 2px solid "
        "rgba(0,0,0,0) — the s178 fingerprint) · the box-shadow SLOT-COUNT "
        "genus (5-vs-3 on the trigger, 6-vs-4 on the content — every VISIBLE "
        "layer byte-equal) · the token-selection genus (the listbox's "
        "border-line/bg-surface/text-foreground vs the reference's border/"
        "bg-popover/text-popover-foreground + the options' focus:bg-line-soft "
        "focus:text-neutral-900 vs its focus:bg-accent/"
        "focus:text-accent-foreground — the M-81c2 pair, computed-equal on "
        "every face) · the React useId format genus (radix-_r_* vs "
        "radix-:r*:) · lucide's aria-hidden version genus (the Check svg) · "
        "the aria-label superset genus (our four trigger labels) · the "
        "DATA-STATE genus (the owner arm)]; the walk's own decode knowledge "
        "[the mount-focus lands ON the checked option (the DIV/option "
        "census, activeElement = the highlighted option); the checked "
        "option carries data-highlighted at open (Radix's at-open "
        "highlight); the trigger's OPEN face byte-equal to its own RESTING "
        "face on both apps (no visible focus ring paints on the open "
        "trigger)]; THE TDD LEDGER [3 born-green pins — the contract-freeze "
        "family, the s173 P-p/P-q precedent, the pin survey first: the "
        "walk55 decode freeze (the four-select OPEN ledger + the REAL "
        "keyboard highlight drive + the owner DATA-STATE arm) · the "
        "DISTINCT-opportunity-owners derivation freeze (the s31 contract, "
        "the DATA-STATE arm's source carrier — the genuine gap the survey "
        "found) · the SELECT_ITEM indicator span + Check pair full-string "
        "freeze (the genuine s180-battery gap — the content/item strings "
        "frozen, the indicator construction never)]; MUTATION-PROOF [the "
        "planted h-3.5 w-3.5 -> h-4 w-4 indicator regression -> exactly 1 "
        "RED (the new pin's unique teeth — no s180 fragment pin holds the "
        "indicator construction) -> restored -> GREEN] · STASH-PROOF [the "
        "round's test block stashed -> exactly 138/2754 (the s181 ship "
        "state) -> restored -> 138/2757]; the count ladder 2754 -> 2757 "
        "(+3) · SUITES 138 HELD · E2E 192 HELD · badge 2946 -> 2949 "
        "(count-ladder-182.py: 30 flips, assert-first, idempotent) + the "
        "collateral re-anchors (the SKILL §5.6 census checks 230 -> 233 · "
        "the F-106a1 layer-axis pin — the s182 layer live, the s181 layer "
        "demoted beneath it at 2754/192) — session-182, the reports filter "
        "selects' OPEN interiors finally WALKED) "
        "+ beneath it 2754 unit checks + 192 e2e checks green; the session-181 layer "
        "(THE DIALOG-SURFACE FOCUS-STATE INTERIOR WALK — the walk54 round)"
    )
    new_text = text.replace(live_line, demoted_block + S182_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.178.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.178.0", "version: 1.179.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.178.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.178.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.179.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s181 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s182 layer promoted (v1.179.0, the s181 layer demoted at 2754/192)")
