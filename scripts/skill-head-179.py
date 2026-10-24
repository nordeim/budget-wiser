#!/usr/bin/env python3
"""skill-head-179.py — the SKILL frontmatter head surgery (the s179 layer).

The L-169c3 form: the verified-single guard. The demoted s177 layer keeps
its SHIP-TIME counts (2740/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.174.0 -> 1.176.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s177 line already carries
2744 — the demotion restores the s177 ship count (2740) in the retired
copy, and the new s178 layer carries 2744 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S179_MARKER = "project_state: 2744 unit checks + 192 e2e checks green; the session-179 layer ("

if S179_MARKER in text:
    print("  no-op  [SKILL head] the s179 layer already live")
else:
    LIVE_MARKER = "project_state: 2744 unit checks + 192 e2e checks green; the session-178 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s177 head marker found {live_count} times"

    # 1) extract the live s177 line (post-ladder: 2744; the ship count is 2740)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2744 unit checks", "project_state: 2740 unit checks", 1
    )

    # 2) the demoted block — the s178 layer keeps its ship counts (2740/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-178 layer (comment-demoted at session-179 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s178 live layer
    S179_LAYER = (
        "project_state: 2744 unit checks + 192 e2e checks green; the session-179 layer "
        "(THE REPORTS PILL-TAB FOCUS-STATE INTERIOR RE-WALK [walk52] — the s129 close's "
        "own never-censused list ['the pill-tab surfaces' focus states never "
        "live-censused'], named first by the session-379 close's next-rotation "
        "candidates; the post-178 audit round, its rotation trigger THE OWNER'S "
        "NEWEST COMMITS [eebf8dc: the merge of the external session-178 walk51 ship — "
        "the topbar search focus + settings segmented-active walk — into main; the "
        "probe STABLE at 46bc2d9c kills the fresh-bundle candidate, the registry's "
        "latest staying 3.10.1 kills the recharts 4.0 gate]; the baseline gate GREEN "
        "at the exact s178 ship state: lint 0/0 · tsc 0 · 138/2740 · census MATCH — "
        "zero live defects; the round raced a local twin that yielded to the shipped "
        "remote, the house single-layer doctrine): THE WALK [scripts/walk52-pill-focus-"
        "active.ts — the two-app computed ledger of the PILL family's focus + active "
        "faces at BOTH axes (1440x900 + 390x844): the REAL keyboard Tab drive (Tab "
        "from a known origin until a tab trigger holds focus — focus-visible fires "
        "only under real keyboard focus) + the effective-layer box-shadow alignment "
        "(the zero-width v4 variable-chain layers never enter it) + the REAL tab "
        "switch]: THE VERDICT — ZERO LIVE DEFECTS [the FOCUSED pill trigger's ring "
        "byte-equal on BOTH axes: rgb(255,255,255) 0 0 0 2px [the ring-offset-2 halo] "
        "+ rgb(10,10,10) 0 0 0 4px [the ring-2] + the active bare-shadow pair — the "
        "ring-2+offset-2 focus-visible form computes IDENTICALLY on both apps · the "
        "pill interior geometry byte-equal at zero-data (x=293/515/737/959/1181 · "
        "w=222 · h=28) · the switched active face byte-equal + the post-interaction "
        "roving tabindex=0 on BOTH apps (the walk51 decode re-confirmed on the pill "
        "family)]; the genera [F-129c1's ring-offset retirement · the token-selection "
        "genus · the class-order genus · the outline VERSION FORM (the s178-"
        "documented genus re-met) · the DATA-STATE genus (the seeded-vs-zero 32px "
        "page offset above the reports tab bar — the pill interior byte-equal at "
        "zero-data, the sweep's own pairing doctrine)]; THE TDD LEDGER [4 born-green "
        "pins — the contract-freeze family, the s173 P-p/P-q precedent: the walk52 "
        "decode freeze · the TABS_PILL.trigger FULL-string freeze (the ring-2 + "
        "offset-2 form's class carrier) · the TABS_PILL.track FULL-string freeze (the "
        "responsive grid-cols-2/lg:grid-cols-5 form) · the data-state genus pin (the "
        "zero-data pairing discipline)]; MUTATION-PROOF [the planted ring-2->ring-1 "
        "regression -> exactly 1 RED -> restored -> GREEN] · STASH-PROOF [the round's "
        "test file stashed -> exactly 138/2740 (the s178 ship state) -> restored -> "
        "138/2744]; the count ladder 2740 -> 2744 (+4) · SUITES 138 HELD · E2E 192 "
        "HELD · badge 2932 -> 2936 (count-ladder-179.py: 23 flips, assert-first, "
        "idempotent) + the collateral re-anchors (the SKILL census checks 217 -> 221 "
        "· the F-106a1 layer-axis pin — the s179 layer live, the s178 layer demoted "
        "beneath it at 2740/192) — session-179, the pill family's focus face finally "
        "WALKED) "
        "+ beneath it 2740 unit checks + 192 e2e checks green; the session-178 layer "
        "(THE TOPBAR SEARCH FOCUS + SETTINGS SEGMENTED-ACTIVE WALK — the walk51 round)"
    )
    new_text = text.replace(live_line, demoted_block + S179_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.175.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.175.0", "version: 1.176.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.175.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.175.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.176.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s177 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s179 layer promoted (v1.176.0, the s178 layer demoted at 2740/192)")
