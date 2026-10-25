#!/usr/bin/env python3
"""skill-head-186.py — the SKILL frontmatter head surgery (the s186 layer).

The L-169c3 form: the verified-single guard. The demoted s185 layer keeps
its SHIP-TIME counts (2766/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.182.0 -> 1.183.0) + the H1 lockstep. The
last_updated date stays 2026-10-25 (the s185 and s186 rounds are both
that date). NOTE: the count-ladder ran FIRST this round, so the live
s185 line already carries 2769 — the demotion restores the s185 ship
count (2766) in the retired copy, and the new s186 layer carries 2769
live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S186_MARKER = "project_state: 2769 unit checks + 192 e2e checks green; the session-186 layer ("

if S186_MARKER in text:
    print("  no-op  [SKILL head] the s186 layer already live")
else:
    LIVE_MARKER = "project_state: 2769 unit checks + 192 e2e checks green; the session-185 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s185 head marker found {live_count} times"

    # 1) extract the live s185 line (post-ladder: 2769; the ship count is 2766)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2769 unit checks", "project_state: 2766 unit checks", 1
    )

    # 2) the demoted block — the s185 layer keeps its ship counts (2766/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-185 layer (comment-demoted at session-186 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181/s182/s183/s184 layers\n"
        "     sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s186 live layer
    S186_LAYER = (
        "project_state: 2769 unit checks + 192 e2e checks green; the session-186 layer "
        "(THE SETTINGS PICKLIST-EDITOR OPEN-STATE INTERIOR WALK + DEFAULTS-TAB "
        "SELECTS SIBLING [walk59] — the s392 close's FIRST-named candidate [the "
        "settings pages' own interactive arms under ADR-022 — the picklist "
        "editor's focus/open faces, the s83-era construction never re-walked "
        "live] LIVE, rows on BOTH apps [the discovery scripts/discover-186.ts "
        "proved the picklists are the settings singleton's own configuration, "
        "NOT the demo data the zero-data state wiped — ours the seeded "
        "8/7/6/3/8, the reference its own 5/6/6/4/10 defaults: the "
        "DATA-STATE genus]: THE WALK [scripts/walk59-settings-picklist-open.ts, "
        "the walk53-58 ledger form over the settings family's OPEN/focus "
        "states at BOTH axes (the settings family reachable at phone): Phase "
        "A the picklist OPEN census — the first-card first-row RESTING face "
        "(the row chrome byte-equal: 313,326 502x54, border 1px solid "
        "rgb(229,229,229), radius 8px, the flex items-center gap-2 p-2 border "
        "rounded-lg hover:bg-gray-50 construction IDENTICAL) + the "
        "Pencil-click swap (the row swaps to Input + Save + X at the same "
        "geometry, the mount-focus landing on the SAVE button on BOTH apps — "
        "the DOM-reuse retention) + the rename Input's resting + focus rings "
        "+ the Pencil/Trash2 resting faces (the red rgb(220,38,38) pair "
        "byte-equal) + the X close round-trip (the reference's destructive "
        "arms NEVER fired — the delete/save writes ride OURS only) + the "
        "ADD row census (the placeholder + the dark Add rgb(23,23,23) 48x36 "
        "byte-equal) + the row/Trash2/Add HOVER faces (the walk57 "
        "mouse-borne precedent: the rowHoverBg rgb(249,250,251) + the "
        "trashHoverColor rgb(185,28,28) byte-equal on both apps); Phase B "
        "the REAL keyboard Tab drive through the swapped row (the fixed "
        "3-stop chain: the mount-focus Save -> Shift-Tab the Input -> Tab "
        "Save -> Tab X, each stop's ring carrier) + THE ESCAPE PROBE "
        "ANSWERED byte-equal (the reference's own rename swap does NOT "
        "close on Escape either — the X is the cancel on BOTH apps, ours "
        "never wired Escape and neither did the reference); Phase C the "
        "phone-axis census (the rename swap + the add row at 390 — the "
        "s106 settings-family-at-phone form); Phase D the Defaults tab "
        "decode (the two comboboxes' OPEN faces — the Month/Week "
        "vocabulary, the s72 M-72c3 decode with Agenda NEVER listed, + "
        "Monday/Sunday, the highlighted faces + the trigger faces + the "
        "Escape round-trip, byte-equal on both apps + the four inputs' "
        "AED/new/B/3 fallback family byte-equal, the M-72c4 decode "
        "standing)]: THE VERDICT — ONE LIVE FIND CURED, every remaining "
        "delta a documented genus [the box-shadow SLOT-COUNT (every "
        "VISIBLE layer byte-equal: the Input's shadow-sm resting layer "
        "rgba(0,0,0,0.05) 0 1px 2px, the Add's bare shadow pair, the "
        "select content's shadow-lg pair, the focused 1px near-black "
        "rgb(10,10,10) ring) · the ring-offset white zero-extent slot "
        "(the s129 retirement — ours stays retired, the reference's stock "
        "class rides it) · the outline VERSION FORM + both sub-forms (the "
        "alpha-color carrier 3px-none-rgb vs 3px-none-rgba(10,10,10,0.5), "
        "style none paints ZERO pixels on both; the reference's "
        "2px-solid-transparent focused member) · the token-selection "
        "M-81c2 pairs (border-line/text-ink/placeholder:text-muted-ink ≡ "
        "border-input/foreground/muted-foreground, computed-equal) · the "
        "class-order md:text-sm position (ours mid-string, the "
        "reference's tail) · our aria-label supersets (the Rename/Save/"
        "Cancel/Delete/Add naming over the reference's unlabeled icons — "
        "the s88-c9 doctrine, kept) · the lucide version genus (the class "
        "names h-4 w-4 order + the trash-2 alias + the aria-hidden "
        "carrier) · the DATA-STATE genus (the picklist values: ours the "
        "seed, the reference its own defaults — the construction is the "
        "comparison, never the values)]; THE LIVE FIND D-186a1 THE "
        "RENAME-TRIGGER GLYPH — the s72 H-72c1 bundle decode named the "
        "reference's row icon 'a Pencil ghost icon button' and ours "
        "shipped lucide Pencil accordingly; the walk59 two-app census + "
        "the live path probe REVERSED the glyph claim: the reference's "
        "rename trigger renders lucide lucide-pen w-4 h-4 carrying "
        "EXACTLY ONE path — the body M21.174 6.812…z — while ours "
        "rendered Pencil's TWO paths (the same body + the extra tip line "
        "m15 5 4 4), the M-82c2 ACTIVITY-icon class (a different lucide "
        "member of the same family, not a version genus); the reference's "
        "calendar chip-edit family already decodes as Pen (the s48 "
        "bundle-verified site); THE CURE [Pencil -> Pen in "
        "settings-page.tsx — the import + the JSX; the s72 pin block "
        "re-anchored RED-first in settings-profile-parity.test.ts]; the "
        "re-walk PROVES the glyph byte-equal (1 path, the pen class, "
        "both apps; the interior ledger aligns — the Trash2's 3 paths + "
        "2 lines byte-identical on both); THE TDD LEDGER [3 born-green "
        "pins — the s173 P-p/P-q contract-freeze family: the walk59 "
        "decode freeze (the tool's own contract) · the ListEditor "
        "rename-arm construction freeze (the genuine battery gap: the "
        "s72 pins hold the ROW + the ADD classes, never the RENAME "
        "SWAP's construction — the ternary + the Input aria-label + the "
        "Save/X pair + the Enter wiring + the add-row pair) · the "
        "Defaults-tab select wiring freeze (the genuine gap: the s14 "
        "pins hold the LAYOUT, never the two comboboxes' value wiring — "
        "Month/Week + Monday/Sunday + the debounced set() persist)] + "
        "THE D-186a1 CURE PIN [RED-first — exactly 1 RED at birth -> the "
        "cure -> GREEN]; MUTATION-PROOF [the planted Pencil replant -> "
        "exactly 1 RED (the full-string pin's unique teeth) -> restored "
        "-> GREEN, no residual] · STASH-PROOF [the round's test block "
        "stashed -> exactly 138/2766 (the s185 ship state) -> restored "
        "-> 138/2769]; the count ladder 2766 -> 2769 (+3) · SUITES 138 "
        "HELD · E2E 192 re-verified (the round's ONE product-code "
        "touch: the D-186a1 Pen cure — settings-page.tsx alone; "
        "page-layout.ts UNTOUCHED, the MODULE line count 1701 HELD) · "
        "badge 2958 -> 2961 (count-ladder-186.py: assert-first, "
        "idempotent — the re-run a verified 0-flip no-op) + the "
        "collateral re-anchors (the SKILL §5.6 census 242 -> 245 checks "
        "· the census era flip — the s186 census HELD 1701 · the "
        "F-106a1 layer-axis pin — the s186 layer live, the s185 demoted "
        "beneath it at 2766/192 · the s185-era live-tense RED-first "
        "arithmetic site re-anchored 258 -> 261) — session-186, the "
        "settings picklist arms finally WALKED two-app, the "
        "pen-vs-pencil glyph the tenth icon-identity find, the "
        "topbar-search dropdown arm adjudicated DEAD on both apps (the "
        "s392 conditional gate: populated=0) — the Edit-family re-check "
        "STILL suspended (the reference zero-row) ) "
        "+ beneath it 2766 unit checks + 192 e2e checks green; the session-185 layer "
        "(THE QUICK-LOG DIALOG OPEN-STATE INTERIOR WALK + BY-TYPE FOOTER RE-WALK — the walk58 round)"
    )
    new_text = text.replace(live_line, demoted_block + S186_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.182.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.182.0", "version: 1.183.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.182.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.182.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.183.0)",
        1,
    )

    SKILL.write_text(new_text, encoding="utf8")
    print("  flip   [SKILL head] the s186 layer live (v1.183.0); the s185 layer demoted at its ship counts (2766/192)")

# the idempotence guard: re-running must be a verified no-op
final = SKILL.read_text(encoding="utf8")
assert S186_MARKER in final, "the s186 head layer must be live after the surgery"
print("skill-head-186: done (idempotent form)")
