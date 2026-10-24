#!/usr/bin/env python3
"""skill-head-178.py — the SKILL frontmatter head surgery (the s178 layer).

The L-169c3 form: the verified-single guard. The demoted s177 layer keeps
its SHIP-TIME counts (2735/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.174.0 -> 1.175.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s177 line already carries
2740 — the demotion restores the s177 ship count (2735) in the retired
copy, and the new s178 layer carries 2740 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S178_MARKER = "project_state: 2740 unit checks + 192 e2e checks green; the session-178 layer ("

if S178_MARKER in text:
    print("  no-op  [SKILL head] the s178 layer already live")
else:
    LIVE_MARKER = "project_state: 2740 unit checks + 192 e2e checks green; the session-177 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s177 head marker found {live_count} times"

    # 1) extract the live s177 line (post-ladder: 2740; the ship count is 2735)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2740 unit checks", "project_state: 2735 unit checks", 1
    )

    # 2) the demoted block — the s177 layer keeps its ship counts (2735/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-177 layer (comment-demoted at session-178 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s175/s176 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s178 live layer
    S178_LAYER = (
        "project_state: 2740 unit checks + 192 e2e checks green; the session-178 layer "
        "(THE TOPBAR SEARCH FOCUS + SETTINGS SEGMENTED-ACTIVE WALK [walk51] — the two "
        "oldest unwalked OPEN/ACTIVE interiors the s177 close names, adjudicated per "
        "ADR-022; the post-177 audit round, its baseline gate GREEN at the exact s177 "
        "ship state on a FRESH CLONE: lint 0/0 · tsc 0 · 138/2735 · build · smoke "
        "14/14 · e2e 192/192 (5.4m) · probe:ref STABLE [46bc2d9c — the fresh-bundle "
        "candidate killed] · the desktop + phone sweeps CLEAN · the mobile drawer "
        "battery GREEN at 390x844 · census MATCH — ZERO live defects): THE WALK "
        "[scripts/walk51-search-focus-segmented-active.ts — one tool, two phases: "
        "the topbar search FOCUS state (both apps at 1440x900, REAL keyboard Tab "
        "focus — 9 tabs on both apps, the same placeholder locator — the resting + "
        "focused computed census: box-shadow · border · bg · caret · outline triplet "
        "· placeholder · the icon) + the settings segmented tabs' ACTIVE state "
        "(both apps at 1440x900 AND 390x844, the default-active AND the "
        "click-activated second tab: the track + all three triggers' tag/class/aria/"
        "geometry + the active pill's computed bg/shadow/ink/weight)] — ZERO LIVE "
        "DEFECTS, every delta a documented genus or kept superset [the VISIBLE "
        "faces byte-equal everywhere: the resting shadow-sm · the focused 1px "
        "near-black ring rgb(10,10,10) 0px 0px 0px 1px · the active white pill "
        "rgb(255,255,255) + the bare-shadow pair + ink rgb(10,10,10) + weight 500 "
        "at BOTH viewports (371px desktop / 117px phone columns) · the tablist's "
        "computed bg/color — the house token idiom bg-line-soft/text-muted-ink "
        "computing byte-equal the reference's bg-muted/text-muted-foreground] + "
        "THE NEW DOCUMENTED GENUS [v4's outline-none is outline-style:none where "
        "the reference's v3-era outline-none is 2px solid transparent — OURS "
        "paints nothing (style none), the REF paints nothing visible "
        "(transparent): zero pixels on both, the shadow/blur/space-y rename "
        "family's FOURTH member] + the box-shadow SLOT-COUNT genus [v4 composes 5 "
        "slots where the v3-era composes 3 — the extra OURS slots fully "
        "transparent, the reference's zero-extent white slot clipped inside the "
        "border box] + OUR kept supersets re-verified live [the search input's "
        "aria-label — the reference's field carries NONE · the roving tabindex — "
        "OURS [0,-1,-1] default where the reference's is [-1,-1,-1], the s23 "
        "accessible fix over its keyboard-unreachable platform defect]; the TDD "
        "ledger [all 5 pins born-green over the zero-defect decode — the s173 "
        "P-p/P-q contract-freeze precedent: the search focus contract · the "
        "search aria-label superset · the segmented active contract (the s125 "
        "bg-white literal + the s129 retired offset re-verified) · the roving "
        "tabindex · the walk51 standing-script freeze · MUTATION-PROOFS: three "
        "planted regressions (the focus-ring ring-2 · the ring-offset-background "
        "replant · the tabindex flip) -> exactly 1 RED each -> restored -> GREEN "
        "· STASH-PROOF: the round's test file stashed alone -> exactly 138/2735 "
        "(the s177 ship state) -> restored -> 138/2740]; the count ladder 2735 "
        "-> 2740 (+5) · SUITES 138 HELD (the one-suite doctrine) · E2E 192 HELD "
        "(the round is test-only — no product code touched) · badge 2927 -> 2932 "
        "(count-ladder-178.py: 23 flips, assert-first, idempotent — the re-run a "
        "verified 0-flip no-op); the captures 449-452 (the two apps' FOCUSED "
        "search inputs side-by-side at desktop · the segmented ACTIVE state at "
        "desktop + phone · the click-activated transition face) — session-178, "
        "the two oldest unwalked interiors WALKED, the re-walk register reset to "
        "the pill-tab focus faces) "
        "+ beneath it 2735 unit checks + 192 e2e checks green; the session-177 layer "
        "(THE DRAWER INTERIOR RE-WALK [walk50] — the six-consecutive-closes candidate"
    )

    new_text = text.replace(live_line, demoted_block + S178_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.174.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.174.0", "version: 1.175.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.174.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.174.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.175.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s177 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s178 layer promoted (v1.175.0, the s177 layer demoted at 2735/192)")
