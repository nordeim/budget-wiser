#!/usr/bin/env python3
"""skill-head-180.py — the SKILL frontmatter head surgery (the s180 layer).

The L-169c3 form: the verified-single guard. The demoted s179 layer keeps
its SHIP-TIME counts (2744/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.176.0 -> 1.177.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s179 line already carries
2749 — the demotion restores the s179 ship count (2744) in the retired
copy, and the new s180 layer carries 2749 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S180_MARKER = "project_state: 2749 unit checks + 192 e2e checks green; the session-180 layer ("

if S180_MARKER in text:
    print("  no-op  [SKILL head] the s180 layer already live")
else:
    LIVE_MARKER = "project_state: 2749 unit checks + 192 e2e checks green; the session-179 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s179 head marker found {live_count} times"

    # 1) extract the live s179 line (post-ladder: 2749; the ship count is 2744)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2749 unit checks", "project_state: 2744 unit checks", 1
    )

    # 2) the demoted block — the s179 layer keeps its ship counts (2744/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-179 layer (comment-demoted at session-180 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s180 live layer
    S180_LAYER = (
        "project_state: 2749 unit checks + 192 e2e checks green; the session-180 layer "
        "(THE DROPDOWN/SELECT OPEN-STATE INTERIOR WALK [walk53] — the s379 close's "
        "own second arm ['the dropdown/select OPEN states beyond the s133/s136 "
        "lenses'] + the s380 close's first-named candidate ['the remaining "
        "unwalked focus/OPEN faces — the account-menu OPEN re-walk under ADR-022']; "
        "the post-179 audit round, its rotation trigger THE OWNER'S NEWEST COMMITS "
        "[6ff2ba7/3b21544: the session_381 transcript + the prompt-to-review-3 doc; "
        "the probe STABLE at 46bc2d9c kills the fresh-bundle candidate, the "
        "registry's latest staying 3.10.1 kills the recharts 4.0 gate]; the "
        "baseline gate GREEN at the exact s179 ship state: lint 0/0 · tsc 0 · "
        "138/2744 · build · smoke 14/14 · e2e 192/192 · census MATCH — zero live "
        "defects; the drawer battery GREEN · the desktop + phone sweeps CLEAN · "
        "the mobile-nav standing legs all re-verified): THE WALK "
        "[scripts/walk53-dropdown-open-interior.ts — the two-app element ledger of "
        "the OPEN states at BOTH axes (1440x900 + 390x844): Phase A the "
        "account-menu (the topbar button[aria-haspopup=menu] -> the [role=menu] "
        "content -> the Profile/Logout menuitems), Phase B the settings Defaults "
        "'Default Calendar View' select (the first combobox -> the [role=listbox] "
        "-> the Month/Week options, the M-72c3 vocabulary); the REAL keyboard "
        "ArrowDown drive (data-highlighted fires only under real keyboard focus) "
        "+ the mount-focus census + the computed faces RESTING and HIGHLIGHTED]: "
        "THE VERDICT — ZERO LIVE DEFECTS [the menu spine byte-equal on both axes: "
        "3 rows, the same DFS structure, ZERO box deltas, mount-focus DIV/menu on "
        "both apps, ArrowDown -> Profile on both; the listbox spine byte-equal: "
        "the Month/Week vocabulary, data-state checked/unchecked identical, "
        "mount-focus DIV/option on both, ArrowDown -> Week on both; the VISIBLE "
        "faces byte-equal — the trigger's shadow-sm + the content's shadow-md "
        "layers + bg/color/border/radius on every OPEN face]; the genera [the "
        "outline VERSION FORM re-met on the OPEN faces + the NEW alpha-color "
        "carrier sub-form (OURS 3px none rgb(10,10,10) vs the reference's 3px "
        "none rgba(10,10,10,0.5) on the triggers — style none paints ZERO pixels "
        "on both) · the box-shadow SLOT-COUNT genus (v4's 5 transparent "
        "zero-extent slots vs the v3-era's 3) · the token-selection genus "
        "(MENU_CONTENT's border-line/bg-surface/text-foreground vs the "
        "reference's bare border/bg-popover/text-popover-foreground + the "
        "items' focus:bg-line-soft/focus:text-neutral-900 vs "
        "focus:bg-accent/focus:text-accent-foreground — computed-equal in BOTH "
        "the resting and the REAL-keyboard-highlighted states, the M-81c2-decoded "
        "#f5f5f5 wash + the #171717 ink shift) · the React useId format genus · "
        "lucide's aria-hidden version genus]; THE WALK'S OWN DISCOVERY [the "
        "attribute-selector law: Playwright's getByRole('combobox') engine "
        "STOPS matching the trigger once aria-expanded flips true at open "
        "(count 0 while the raw [role=combobox] attribute stays live) — the "
        "attribute selector is the only form matching BOTH states, pinned in "
        "the decode freeze]; THE TDD LEDGER [5 born-green pins — the "
        "contract-freeze family, the s173 P-p/P-q precedent: the walk53 decode "
        "freeze (the tool's own contract) · the MENU_CONTENT FULL-string "
        "freeze · the MENU_ITEM FULL-string freeze · the SELECT_CONTENT "
        "full-string freeze (the M-81c1 carrier) · the SELECT_ITEM "
        "full-string freeze (the M-81c2 carrier)]; MUTATION-PROOF [the "
        "planted MENU_ITEM disabled-arm order regression -> exactly 1 RED -> "
        "restored -> GREEN — the full-string pin's unique teeth over the "
        "fragment pins] · STASH-PROOF [the round's test file stashed -> "
        "exactly 138/2744 (the s179 ship state) -> restored -> 138/2749]; the "
        "count ladder 2744 -> 2749 (+5) · SUITES 138 HELD · E2E 192 HELD · "
        "badge 2936 -> 2941 (count-ladder-180.py: 23 flips, assert-first, "
        "idempotent) + the collateral re-anchors (the SKILL census checks "
        "221 -> 226 · the F-106a1 layer-axis pin — the s180 layer live, the "
        "s179 layer demoted beneath it at 2744/192) — session-180, the "
        "dropdown/select OPEN interiors finally WALKED) "
        "+ beneath it 2744 unit checks + 192 e2e checks green; the session-179 layer "
        "(THE REPORTS PILL-TAB FOCUS-STATE INTERIOR RE-WALK — the walk52 round)"
    )
    new_text = text.replace(live_line, demoted_block + S180_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.176.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.176.0", "version: 1.177.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.176.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.176.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.177.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s179 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s180 layer promoted (v1.177.0, the s179 layer demoted at 2744/192)")
