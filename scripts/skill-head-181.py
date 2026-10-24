#!/usr/bin/env python3
"""skill-head-181.py — the SKILL frontmatter head surgery (the s181 layer).

The L-169c3 form: the verified-single guard. The demoted s180 layer keeps
its SHIP-TIME counts (2750/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.177.0 -> 1.178.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s180 line already carries
2754 — the demotion restores the s180 ship count (2750) in the retired
copy, and the new s181 layer carries 2754 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S181_MARKER = "project_state: 2754 unit checks + 192 e2e checks green; the session-181 layer ("

if S181_MARKER in text:
    print("  no-op  [SKILL head] the s181 layer already live")
else:
    LIVE_MARKER = "project_state: 2754 unit checks + 192 e2e checks green; the session-180 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s180 head marker found {live_count} times"

    # 1) extract the live s180 line (post-ladder: 2754; the ship count is 2750)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2754 unit checks", "project_state: 2750 unit checks", 1
    )

    # 2) the demoted block — the s180 layer keeps its ship counts (2750/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-180 layer (comment-demoted at session-181 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s181 live layer
    S181_LAYER = (
        "project_state: 2754 unit checks + 192 e2e checks green; the session-181 layer "
        "(THE DIALOG-SURFACE FOCUS-STATE INTERIOR WALK [walk54] — the s380 close's "
        "remaining named candidate ['the dialog-surface focus faces', the s379 "
        "close's own third arm] — walk53 consumed the dropdown/select OPEN arm, "
        "walk54 takes the dialog family's focus interior; the post-180 audit "
        "round, its rotation trigger THE OWNER'S NEWEST COMMITS [b8e740d/c4a5c4e: "
        "the session_383 transcript — the s180 round's own execution record — + "
        "the merge 144f2dd]; the probe STABLE at 46bc2d9c kills the fresh-bundle "
        "candidate, the registry's latest staying 3.10.1 kills the recharts 4.0 "
        "gate; the baseline gate GREEN at the exact s180 ship state on a FRESH "
        "CLONE: lint 0/0 · tsc 0 · 138/2750 · build · smoke 14/14 · e2e 192/192 "
        "clean first run · census MATCH · the drawer battery GREEN at 390x844 · "
        "the desktop + phone sweeps CLEAN): THE WALK "
        "[scripts/walk54-dialog-focus-interior.ts — the walk50 ledger form over "
        "the New Lead dialog's OPEN + FOCUS states at BOTH axes (1440x900 + "
        "390x844): Phase A the OPEN spine (the 51-row DFS ledger of "
        "[role=dialog][data-state=open] — the D-112a4 rule — + the computed "
        "faces of the overlay/content/title/close-X/inputs/footer RESTING), "
        "Phase B the REAL keyboard Tab drive — 10 stops from the mount-focused "
        "first input through the whole focusable chain (5 inputs · Status · "
        "Source · Cancel · Create Lead · the close X) with each stop's FOCUSED "
        "face censused, then the wrap past the last focusable (the Radix "
        "focus-trap cycle)]: THE VERDICT — ZERO LIVE DEFECTS [the 51-row spine "
        "byte-equal on both axes: identical tag census (12 div · 8 option · "
        "7 label · 5 input · 5 button · 4 path · 3 span · 3 svg · 2 select · "
        "1 h2 · 1 form), ZERO box deltas; the Tab chain position-identical on "
        "every stop + the WRAP to the first input on both apps; the mount-focus "
        "on the first input with :focus-visible TRUE on both (Radix's "
        "programmatic mount focus paints the ring); every VISIBLE focus face "
        "byte-equal — the inputs'/triggers'/Cancel's ring rgb(10,10,10) "
        "0px 0px 0px 1px + the shadow-sm layer, the submit's ring + its shadow "
        "pair, and the close X's DOUBLE ring rgb(255,255,255) 0px 0px 0px 2px "
        "+ rgb(10,10,10) 0px 0px 0px 4px (the ring-2 + ring-offset-2 form) — "
        "on BOTH axes]; the genera [the outline VERSION FORM re-met on every "
        "dialog face + the alpha-color carrier sub-form · the box-shadow "
        "SLOT-COUNT genus (3-vs-1 on the input ring, 4-vs-2 on the content, "
        "2-vs-0 on the close-X double ring — every VISIBLE layer byte-equal) "
        "· the v4 color-serialization genus (the overlay's bg-black/80 "
        "computing oklab(0 0 0 / 0.8) vs rgba(0,0,0,0.8) — the SAME visual "
        "color, the s28 canvas-readback precedent) · the token-selection "
        "genus (computed-equal on every face) · the class-order genus · the "
        "space-y margin-BOTTOM family (our mt-2 mb-0 vs the v3-era implicit — "
        "computed geometry byte-equal) · the s133 placeholderState retirement "
        "· the F-129c1 ring-offset-background retirement · the id-name "
        "superset (our ld- prefixes) · our aria-label supersets · the React "
        "useId format genus · lucide's aria-hidden version genus]; THE WALK'S "
        "OWN DISCOVERY [the NEW DANGLING aria-describedby genus: the "
        "reference's OPEN dialog declares aria-describedby pointing at a "
        "NON-EXISTENT node (its own platform's dead pointer, live-probed "
        "'NO SUCH ELEMENT'); OURS carries no attribute at all — the clean "
        "form, the s15-P4 no-description doctrine; a dangling ARIA reference "
        "is the reference's own defect, NOT mirrored per the s23 "
        "platform-defect precedent]; THE TDD LEDGER [4 born-green pins — "
        "the contract-freeze family, the s173 P-p/P-q precedent: the walk54 "
        "decode freeze (the tool's own contract, incl. the D-112a4 root rule "
        "and the overlay-selector finding) · the DIALOG_CONTENT.base "
        "FULL-string freeze · the DIALOG_CLOSE FULL-string freeze (the "
        "focused DOUBLE-ring carrier) · the DIALOG_OVERLAY FULL-string "
        "freeze (the oklab/rgba serialization genus's class carrier)]; "
        "MUTATION-PROOF [the planted focus:ring-offset-2 -> "
        "focus:ring-offset-4 regression -> exactly 1 RED (the full-string "
        "pin's unique teeth over the s15/s112 fragment pins — the offset "
        "arm no fragment pin holds) -> restored -> GREEN] · STASH-PROOF "
        "[the round's test file stashed -> exactly 138/2750 (the s180 ship "
        "state) -> restored -> 138/2754]; the count ladder 2750 -> 2754 "
        "(+4) · SUITES 138 HELD · E2E 192 HELD · badge 2942 -> 2946 "
        "(count-ladder-181.py: 23 flips, assert-first, idempotent) + the "
        "collateral re-anchors (the SKILL census checks 226 -> 230 · the "
        "F-106a1 layer-axis pin — the s181 layer live, the s180 layer "
        "demoted beneath it at 2750/192) — session-181, the dialog focus "
        "interiors finally WALKED) "
        "+ beneath it 2750 unit checks + 192 e2e checks green; the session-180 layer "
        "(THE DROPDOWN/SELECT OPEN-STATE INTERIOR WALK — the walk53 round)"
    )
    new_text = text.replace(live_line, demoted_block + S181_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.177.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.177.0", "version: 1.178.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.177.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.177.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.178.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s180 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s181 layer promoted (v1.178.0, the s180 layer demoted at 2750/192)")
