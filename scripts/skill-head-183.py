#!/usr/bin/env python3
"""skill-head-183.py — the SKILL frontmatter head surgery (the s183 layer).

The L-169c3 form: the verified-single guard. The demoted s182 layer keeps
its SHIP-TIME counts (2757/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.179.0 -> 1.180.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s182 line already carries
2760 — the demotion restores the s182 ship count (2757) in the retired
copy, and the new s183 layer carries 2760 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S183_MARKER = "project_state: 2760 unit checks + 192 e2e checks green; the session-183 layer ("

if S183_MARKER in text:
    print("  no-op  [SKILL head] the s183 layer already live")
else:
    LIVE_MARKER = "project_state: 2760 unit checks + 192 e2e checks green; the session-182 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s182 head marker found {live_count} times"

    # 1) extract the live s182 line (post-ladder: 2760; the ship count is 2757)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2760 unit checks", "project_state: 2757 unit checks", 1
    )

    # 2) the demoted block — the s182 layer keeps its ship counts (2757/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-182 layer (comment-demoted at session-183 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181 layers sit demoted\n"
        "     above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s183 live layer
    S183_LAYER = (
        "project_state: 2760 unit checks + 192 e2e checks green; the session-183 layer "
        "(THE LEADS-FILTER POPOVER + CONTACTS-FILTER-PANEL OPEN-STATE INTERIOR WALK "
        "[walk56] — the s386 close's first-named candidate ['the popover family's "
        "OPEN faces under ADR-022 — the leads filter popover + the contacts filter "
        "panel'] — walk53 froze the DropdownMenu + Select chrome carriers, the "
        "Popover family's own carriers never; the post-182 audit round, its "
        "rotation trigger THE OWNER'S NEWEST COMMIT [bf3acec: the session_386 "
        "transcript — the s182 round's own execution record]; the probe STABLE at "
        "46bc2d9c kills the fresh-bundle candidate, the registry's latest staying "
        "3.10.1 kills the recharts 4.0 gate; the baseline gate GREEN at the exact "
        "s182 ship state on a FRESH CLONE: lint 0/0 · tsc 0 · 138/2757 · build · "
        "smoke 14/14 · e2e 192/192 clean first run · census MATCH · the drawer "
        "battery GREEN at 390x844 · the desktop + phone sweeps CLEAN): THE WALK "
        "[scripts/discover-183.ts the discovery probe — the leads Filters "
        "trigger + the OPEN popover div[role=dialog] at byte-equal geometry on "
        "both apps (304,443 108x36 + 304,483 320x398 at 1440x900; the 390 "
        "collision FLIP-UP to data-side=top at 32,36 on BOTH apps — the "
        "s113-decoded flip re-confirmed); the mount-focus BUTTON/combobox (the "
        "first select trigger) on both; the field labels byte-equal; OURS "
        "carrying the aria-label supersets the reference's controls lack; the "
        "1st-Tab landing byte-equal (the Source select both); the contacts "
        "Filters trigger + the OPEN panel + the Clear All geometry byte-equal "
        "at BOTH axes; the 20 checkbox ids identical. Then "
        "scripts/walk56-leads-popover-open.ts, the walk53/55 ledger form over "
        "the family's TWO OPEN arms at BOTH axes (1440x900 + 390x844): the "
        "trigger RESTING + OPEN faces, the content DFS ledger, the field "
        "faces, the REAL keyboard Tab drive, the panel census]: THE VERDICT — "
        "the D-183a1 LIVE FIND + CURE [the contacts Filters trigger's OPEN "
        "variant-flip: OURS rendered OUR blue default (bg-primary "
        "rgb(37,99,235)) where the reference's own default variant renders "
        "its DARK stock primary (#171717, rgb(23,23,23) — its global --primary "
        "token; its blue CTAs carry explicit classes); the CLOSED outline "
        "face byte-equal, the OPEN face never walked before; the cure rides "
        "the profile save-button precedent (S13-P2/M-80c1): the variant "
        "ternary STAYS + the neutral literal pair (bg-neutral-900 "
        "text-neutral-50 hover:bg-neutral-900/90 — the s80-computed hover "
        "alpha) overrides the blue default via tailwind-merge; the re-walk "
        "PROVES the OPEN face byte-equal on both axes] + every remaining "
        "delta a documented genus [the outline VERSION FORM + both sub-forms "
        "(the alpha-color carrier on the triggers/labels/inputs · the "
        "transparent-solid carrier on the content + the select triggers) · "
        "the box-shadow SLOT-COUNT genus (5-vs-3 everywhere, every VISIBLE "
        "layer byte-equal) · the token-selection genus (the popover's "
        "border-line/bg-surface/text-foreground + the call-site rounded-md "
        "shadow-md w-80 p-4 vs the reference's z-50 rounded-md border "
        "bg-popover p-4 text-popover-foreground shadow-md — the M-81c2 "
        "pair's Popover member) · the s133 placeholderState retirement · "
        "the React useId format genus · lucide's aria-hidden version genus "
        "(the X/Save svgs) · the class-order genus (h-4 w-4 vs w-4 h-4) · "
        "the aria-label superset genus (our trigger + field labels)]; THE "
        "TDD LEDGER [3 pins — the walk56 decode freeze (born-green) · the "
        "POPOVER content chrome FULL-string freeze (born-green — the genuine "
        "walk53-battery gap) · the D-183a1 OPEN-face cure pin (RED-first "
        "over the live find, exactly 1 RED at birth)]; MUTATION-PROOF [the "
        "planted rounded-lg -> rounded-xl content-chrome regression -> "
        "exactly 1 RED (the new full-string pin's unique teeth — no "
        "fragment pin holds the Popover content chrome construction) -> "
        "restored -> GREEN] · STASH-PROOF [the round's test block stashed "
        "-> exactly 138/2757 (the s182 ship state) -> restored -> "
        "138/2760]; the count ladder 2757 -> 2760 (+3) · SUITES 138 HELD "
        "· E2E 192 HELD · badge 2949 -> 2952 (count-ladder-183.py: 31 "
        "flips, assert-first, idempotent) + the collateral re-anchors (the "
        "SKILL §5.6 census checks 233 -> 236 · the F-106a1 layer-axis pin "
        "— the s183 layer live, the s182 layer demoted beneath it at "
        "2757/192) — session-183, the popover family's OPEN interiors "
        "finally WALKED) "
        "+ beneath it 2757 unit checks + 192 e2e checks green; the session-182 layer "
        "(THE REPORTS-FILTER SELECTS OPEN-STATE INTERIOR WALK — the walk55 round)"
    )
    new_text = text.replace(live_line, demoted_block + S183_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.179.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.179.0", "version: 1.180.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.179.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.179.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.180.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s182 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s183 layer promoted (v1.180.0, the s182 layer demoted at 2757/192)")
