#!/usr/bin/env python3
"""skill-head-177.py — the SKILL frontmatter head surgery (the s177 layer).

The L-169c3 form: the verified-single guard. The demoted s176 layer keeps
its SHIP-TIME counts (2733/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.173.0 -> 1.174.0) + the H1 lockstep. NOTE: the
count-ladder ran FIRST this round, so the live s176 line already carries
2735 — the demotion restores the s176 ship count (2733) in the retired
copy, and the new s177 layer carries 2735 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S177_MARKER = "project_state: 2735 unit checks + 192 e2e checks green; the session-177 layer ("

if S177_MARKER in text:
    print("  no-op  [SKILL head] the s177 layer already live")
else:
    LIVE_MARKER = "project_state: 2735 unit checks + 192 e2e checks green; the session-176 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s176 head marker found {live_count} times"

    # 1) extract the live s176 line (post-ladder: 2735; the ship count is 2733)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2735 unit checks", "project_state: 2733 unit checks", 1
    )

    # 2) the demoted block — the s176 layer keeps its ship counts (2733/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-176 layer (comment-demoted at session-177 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s175 layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s177 live layer
    S177_LAYER = (
        "project_state: 2735 unit checks + 192 e2e checks green; the session-177 layer "
        "(THE DRAWER INTERIOR RE-WALK [walk50] — the six-consecutive-closes candidate "
        "no round ever ran as its own rotation; the post-176 audit round, its rotation "
        "trigger THE OWNER'S NEWEST COMMIT [59c8f13: the session-376 transcript, whose "
        "close names it first — 'the strongest next moves are the drawer interior "
        "re-walk, the fresh-bundle re-derivation when the reference next ships a new "
        "bundle (the probe will trip it), or the recharts 4.0 Cell -> shape gate'; the "
        "probe STABLE at 46bc2d9c kills candidate two, 4.0 unreleased kills candidate "
        "three]; the baseline gate GREEN at the exact s176 ship state on a FRESH CLONE: "
        "lint 0/0 · tsc 0 · 138/2733 · build · smoke 14/14 · e2e 192/192 (5.7m) · "
        "probe:ref STABLE · the desktop + phone sweeps CLEAN · the mobile drawer "
        "battery GREEN at 390x844 · census MATCH — ZERO live defects, the register "
        "clean of named code-level candidates): THE WALK [the two-app element-ledger "
        "of the drawer-OPEN DOM — scripts/walk50-drawer-interior.ts, the coverage gap "
        "no standing leg carries: the interior census runs zero drawer-open pages, "
        "the battery pins behavior, the a11y gate violations, the captures visuals; "
        "OURS 61 rows vs REF 53, every delta root-caused] — ONE LIVE DEFECT FOUND "
        "[the drawer header's space-y-2 riding the v4 margin-BOTTOM semantics: the "
        "h2's :where() mb-2 PARTICIPATES in the flex-column layout (header 88px) "
        "where the reference's v3-era mt-on-the-sr-only-p never did (absolute = out "
        "of flow, header 80px) — an 8px spine shift cascading to every nav link and "
        "the footer group (nav y 88 vs 80 · footer 436 vs 428), present since the "
        "s147 re-derivation, never caught because no leg ever walked the open "
        "drawer's interior] + THE CURE [the M-92c1 phantom-mb precedent: the "
        "explicit mb-0 on MOBILE_NAV_SHEET.title — (0,1,0) beats :where()'s "
        "(0,0,0); the header's space-y-2 class string stays byte-parity with the "
        "reference's while the COMPUTED rhythm goes byte-equal: 24+32+24 = 80px] + "
        "THE ADJUDICATED GENERA [bg-sidebar token vs bg-[#2563eb] literal — "
        "computed-equal rgb(37,99,235), the house token idiom · the Close button's "
        "shadcn stock-version class drift — bg-accent vs bg-secondary BOTH dead "
        "variants (Radix Close carries no data-state; computed transparent on both "
        "apps, live-probed) · lucide's aria-hidden — version genus, zero visual · "
        "the React 19 useId format — structural genus, the pointing relations "
        "identical · OUR kept supersets re-verified: the focus-visible ring, "
        "aria-current, the nav aria-labels, the span.truncate label wrapper, the "
        "icon shrink-0 — each invisible to pixels]; THE POST-CURE SPINE [header "
        "80/80 · h2 32/32 · all 9 links byte-equal · footer 428/428 · the two-app "
        "drawer-open captures 0.02% apart (the font-rendering floor)]; the TDD "
        "ledger [1 RED face at birth (the title mb-0 pin) + 1 born-green (the "
        "walk50 decode freeze — the s173 P-p/P-q precedent) · MUTATION-PROOF: the "
        "planted mb-0 regression -> exactly 1 RED -> restored -> GREEN · "
        "STASH-PROOF: the round's five lockstep files stashed -> exactly 138/2733 "
        "-> restored -> 138/2735]; the count ladder 2733 -> 2735 (+2) · SUITES 138 "
        "HELD · E2E 192 HELD · badge 2925 -> 2927 (count-ladder-177.py: 23 flips, "
        "assert-first, idempotent — the re-run a verified 0-flip no-op) + the "
        "collateral re-anchors (the PAD §11 page-layout row 1687 -> 1695 · the "
        "SKILL §5.6 census 1687/210 -> 1695/212 · the docs-counts lockstep — the "
        "census policing the census); the captures 443-reanchor + 445-448 (the "
        "post-cure drawer-open standing contract, VLM-verified · the reference's "
        "own drawer-open parity face · the header wordmark detail · the "
        "leads-active drawer) — session-177, the drawer interior finally WALKED) "
        "+ beneath it 2733 unit checks + 192 e2e checks green; the session-176 layer "
        "(THE RECHARTS 3.x MIGRATION — the N-3 retirement; the post-175 audit round)"
    )

    new_text = text.replace(live_line, demoted_block + S177_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.173.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.173.0", "version: 1.174.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.173.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.173.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.174.0)",
        1,
    )

    # last_updated already 2026-10-24 (the s176 round's date — same day)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"

    SKILL.write_text(new_text, encoding="utf8")
    print("  live   [SKILL head] the s177 layer promoted (v1.174.0, the s176 layer demoted at 2733/192)")
