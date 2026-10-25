#!/usr/bin/env python3
"""skill-head-184.py — the SKILL frontmatter head surgery (the s184 layer).

The L-169c3 form: the verified-single guard. The demoted s183 layer keeps
its SHIP-TIME counts (2760/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.180.0 -> 1.181.0) + the H1 lockstep + the
last_updated date (2026-10-24 -> 2026-10-25). NOTE: the count-ladder ran
FIRST this round, so the live s183 line already carries 2763 — the
demotion restores the s183 ship count (2760) in the retired copy, and
the new s184 layer carries 2763 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S184_MARKER = "project_state: 2763 unit checks + 192 e2e checks green; the session-184 layer ("

if S184_MARKER in text:
    print("  no-op  [SKILL head] the s184 layer already live")
else:
    LIVE_MARKER = "project_state: 2763 unit checks + 192 e2e checks green; the session-183 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s183 head marker found {live_count} times"

    # 1) extract the live s183 line (post-ladder: 2763; the ship count is 2760)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2763 unit checks", "project_state: 2760 unit checks", 1
    )

    # 2) the demoted block — the s183 layer keeps its ship counts (2760/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-183 layer (comment-demoted at session-184 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181/s182 layers sit demoted\n"
        "     above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s184 live layer
    S184_LAYER = (
        "project_state: 2763 unit checks + 192 e2e checks green; the session-184 layer "
        "(THE ACTIVITIES MORE-FILTERS TOGGLE + RAIL-ACTIONS OPEN-STATE INTERIOR "
        "WALK [walk57] — the s388 close's variant-flip-family candidate ['the "
        "activities More-Filters toggle's OPEN face — the same variant-flip "
        "family the D-183a1 find rode, the one other variant-flipping trigger "
        "in the app'] — the s388 close's FIRST-named candidate [the "
        "Edit-family dialogs' focus faces] KILLED BY THE DISCOVERY: the "
        "reference carries ZERO rows on /contacts, /leads, /accounts and "
        "ZERO calendar chips — the W7/wce/Mke edit dialogs have no trigger "
        "there, the two-app ledger has no REF arm, documented in the plan "
        "§0 with the census; the post-183 audit round, its rotation "
        "trigger THE OWNER'S NEWEST COMMIT [f5792f7: the session_388/389 "
        "transcripts — the s183 round's own execution record]; the probe "
        "STABLE at 46bc2d9c kills the fresh-bundle candidate, the "
        "registry's latest staying 3.10.1 kills the recharts 4.0 gate; "
        "the baseline gate GREEN at the exact s183 ship state on a FRESH "
        "CLONE: lint 0/0 · tsc 0 · 138/2760 · build · smoke 14/14 · e2e "
        "192/192 clean first run 5.7m · census MATCH · sitemap 11 routes "
        "+ robots + manifest 200): THE WALK [scripts/discover-184.ts the "
        "discovery probe — the Edit-family reachability census (the "
        "reference's five entity pages at zero rows) + the expander "
        "RESTING/click census + the rail action pair (the Filter primary "
        "BYTE-EQUAL BLUE rgb(37,99,235) on both apps — the reference's "
        "explicit CTA classes, no D-183a1 second member) + the quick-log "
        "quartet byte-equal. Then scripts/walk57-activities-rail-open.ts, "
        "the walk53/56 ledger form over the rail family's states at the "
        "desktop axis (the rail display:none below lg — the s109 pin; "
        "the phone leg the ABSENCE census): Phase A the expander "
        "RESTING + HOVER + OPEN faces + the reveal census + the "
        "dead-stub re-verification; Phase B the REAL keyboard Tab "
        "chains (the closed rail byte-equal 9 stops on both apps; "
        "OURS-OPEN 11 stops — the revealed Task/Note checkboxes ENTER "
        "the order); Phase C the rail action pair + the select "
        "triggers; Phase D the phone absence]: THE VERDICT — ZERO LIVE "
        "DEFECTS, every delta a documented genus [the box-shadow "
        "SLOT-COUNT genus (5-vs-3/6-vs-5, every VISIBLE layer "
        "byte-equal) · the outline VERSION FORM + both sub-forms (the "
        "alpha-color carrier + the currentColor cascade member — style "
        "none paints ZERO pixels on both) · the aria-expanded superset "
        "genus (s88-c9) · the L-125c2 dead-stub doctrine (ours the "
        "functional superset: the reveal 8->11 + the toggle-back "
        "round-trip; the reference's button re-verified dead — labels "
        "8->8) · the DATA-STATE genus (the owner options: ours the "
        "seeded members, the reference's live platform list + its See "
        "all member)]; the walk's own decode knowledge [THE HOVER FACE "
        "— the first mouse-borne face ever walked in the battery: OURS "
        "hover:bg-line-soft hover:text-neutral-900 ≡ the reference's "
        "hover:bg-accent hover:text-accent-foreground, computed-EQUAL "
        "rgb(245,245,245) + rgb(23,23,23) — the M-81c2 pair's "
        "outline-Button hover member; THE CLICK-THROUGH "
        "HOVER-PERSISTENCE form — the functional reveal moves the "
        "trigger off the mouse (ours shows its byte-equal RESTING "
        "face post-click), the dead stub keeps the wash (the "
        "reference's post-click face IS its hover face); the "
        "sequential-focus STARTING-POINT rule — Chromium's Tab drive "
        "starts from the last-focused element's position even after "
        "blur(), the blank-spot click resets it (the debug-proved "
        "tool contract)]; THE TDD LEDGER [3 born-green pins — the "
        "s173 P-p/P-q contract-freeze family: the walk57 decode "
        "freeze (the tool's own contract) · the more-filters expander "
        "construction FULL-string freeze (the genuine battery gap: no "
        "pin held the expander's construction — the s125 walk-pins "
        "hold the completed/scheduled toggle, never this one) · the "
        "reveal construction freeze (the More Types group + the "
        "Task/Note vocabulary + the revealed checkboxes entering the "
        "REAL tab order)]; MUTATION-PROOF [the planted "
        "variant=secondary regression -> exactly 1 RED (the "
        "full-string pin's unique teeth) -> restored -> GREEN] · "
        "STASH-PROOF [the round's test block stashed -> exactly "
        "138/2760 (the s183 ship state) -> restored -> 138/2763]; "
        "the count ladder 2760 -> 2763 (+3) · SUITES 138 HELD · E2E "
        "192 HELD (the round touches ZERO product code — test-only + "
        "scripts + docs) · badge 2952 -> 2955 (count-ladder-184.py: "
        "31 flips, assert-first, idempotent) + the collateral "
        "re-anchors (the SKILL §5.6 census checks 236 -> 239 · the "
        "F-106a1 layer-axis pin — the s184 layer live, the s183 "
        "layer demoted beneath it at 2760/192) — session-184, the "
        "activities rail's OPEN/HOVER interiors finally WALKED) "
        "+ beneath it 2760 unit checks + 192 e2e checks green; the session-183 layer "
        "(THE LEADS-FILTER POPOVER + CONTACTS-FILTER-PANEL OPEN-STATE INTERIOR WALK — the walk56 round)"
    )
    new_text = text.replace(live_line, demoted_block + S184_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.180.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.180.0", "version: 1.181.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.180.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.180.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.181.0)",
        1,
    )

    # the last_updated bump (the s183 round was 2026-10-24; this round 10-25)
    assert new_text.count("last_updated: 2026-10-24") == 1, "the last_updated anchor must be unique"
    new_text = new_text.replace("last_updated: 2026-10-24", "last_updated: 2026-10-25", 1)

    SKILL.write_text(new_text, encoding="utf8")
    print("  flip   [SKILL head] the s184 layer live (v1.181.0); the s183 layer demoted at its ship counts (2760/192)")

# the idempotence guard: re-running must be a verified no-op
final = SKILL.read_text(encoding="utf8")
assert S184_MARKER in final, "the s184 head layer must be live after the surgery"
print("skill-head-184: done (idempotent form)")
