#!/usr/bin/env python3
"""skill-head-187.py — the SKILL frontmatter head surgery (the s187 layer).

The L-169c3 form: the verified-single guard. The demoted s186 layer keeps
its SHIP-TIME counts (2769/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.183.0 -> 1.184.0) + the H1 lockstep + the
last_updated date (2026-10-25 -> 2026-10-26 — the s187 round's date).
NOTE: the count-ladder ran FIRST this round, so the live s186 line
already carries 2772 — the demotion restores the s186 ship count
(2769) in the retired copy, and the new s187 layer carries 2772 live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S187_MARKER = "project_state: 2772 unit checks + 192 e2e checks green; the session-187 layer ("

if S187_MARKER in text:
    print("  no-op  [SKILL head] the s187 layer already live")
else:
    LIVE_MARKER = "project_state: 2772 unit checks + 192 e2e checks green; the session-186 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s186 head marker found {live_count} times"

    # 1) extract the live s186 line (post-ladder: 2772; the ship count is 2769)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2772 unit checks", "project_state: 2769 unit checks", 1
    )

    # 2) the demoted block — the s186 layer keeps its ship counts (2769/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-186 layer (comment-demoted at session-187 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181/s182/s183/s184/s185\n"
        "     layers sit demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s187 live layer
    S187_LAYER = (
        "project_state: 2772 unit checks + 192 e2e checks green; the session-187 layer "
        "(THE PROFILE PHOTO-UPLOAD FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS "
        "DATA-TAB SIBLING [walk60] — the s394 close's named candidates [the "
        "profile page's own interactive arms under ADR-022 — the photo-upload "
        "family's focus/open faces, the s30-era construction never re-walked "
        "live · the Data-tab template/export buttons' focus faces, the s26/s83 "
        "margins walked but never the focus faces] BOTH LIVE on BOTH apps "
        "[the discovery scripts/discover-187.ts proved the profile family's "
        "construction byte-equal on the resting faces — h1 + the four labels "
        "+ the small-card vocabulary + the Upload/name/Save geometry "
        "byte-equal at 537,312/425,446/425,730 · the Data-tab three cards "
        "byte-equal · the ten-button vocabulary byte-equal · the Danger gate "
        "states byte-equal; the topbar-search gate KILLED again (populated=0 "
        "on both — the s32 dead-stub doctrine stands); the Edit-family "
        "re-check still zero-row — the candidate STAYS suspended; the probe "
        "STABLE at 46bc2d9c kills the fresh-bundle candidate, the registry's "
        "latest staying 3.10.1 kills the recharts 4.0 gate; the baseline "
        "GREEN at the exact s186 ship state on a FRESH CLONE: lint 0/0 · "
        "tsc 0 · 138/2769 · build · smoke 14/14 · e2e 192/192 clean first "
        "run 5.8m · probe:ref STABLE · census MATCH · sitemap 11 routes + "
        "robots + manifest 200]: THE WALK [scripts/walk60-profile-datatab-"
        "focus-open.ts, the walk53-59 ledger form over the profile family's "
        "focus/open states + the Data-tab sibling at BOTH axes: Phase A the "
        "profile OPEN census — the PI card's interior DFS ledger + the "
        "avatar's face + the Upload Photo button's resting + FOCUS faces + "
        "its Camera glyph + the hidden file input's construction census + "
        "the name input's resting + focus rings + the disabled email/role "
        "faces + the Save button's shadow pair + the right-column census; "
        "Phase B the REAL keyboard Tab drives through the profile form and "
        "the Data-tab row (the programmatic .focus() never triggers "
        ":focus-visible on either app there — the REAL keyboard is the only "
        "true face, and it paints the byte-equal 1px near-black ring on "
        "both); Phase C the Data-tab sibling — the three cards' geometry "
        "ledger + the template/export buttons' faces + the Danger Zone's "
        "tinted census + the RESET input's ring + the gate states (the "
        "write NEVER fired); Phase D the phone-axis census (both families "
        "byte-equal at 390)]: THREE LIVE FINDS CURED, every remaining delta "
        "a documented genus [the box-shadow SLOT-COUNT (every VISIBLE "
        "layer byte-equal: the shadow-sm resting arm, the 1px near-black "
        "ring, the Save's 0.1-alpha shadow pair) · the ring-offset white "
        "zero-extent slot (the s129 retirement) · the outline VERSION FORM "
        "+ both sub-forms · the token-selection M-81c2 pairs · the "
        "class-order family (the avatar's h/w positions, the flex "
        "orderings, the lucide w/h order) · our aria-hidden supersets]; "
        "THE LIVE FINDS — D-187a1 THE FILE INPUT'S CONSTRUCTION (the "
        "reference's hidden input carries id=photo-upload + NO tabIndex "
        "attribute; ours shipped id-less with an explicit tabIndex={-1} — "
        "both inert behaviorally [display:none, no htmlFor on either app] "
        "but the D-114a2 same-page precedent names the ids construction-"
        "parity material; THE CURE [the id restored + the explicit "
        "tabIndex retired in profile-page.tsx]); D-187a2 THE AVATAR'S "
        "STOCK DIV FALLBACK (the reference's fallback renders a DIV with "
        "the text-blue-600 ON THE SVG — the stock AvatarFallback form the "
        "topbar already carries; ours shipped a hand-rolled span with the "
        "color on the wrapper; THE CURE [the div fallback + the on-svg "
        "color at BOTH sites — the form avatar + the Account card "
        "avatar]); D-187a3 THE DATA-TAB 8PX BUTTON-ROW OFFSET (the v4 "
        "space-y semantics flip's INLINE-FLOW variant: the reference's "
        "v3-era margin-TOP-on-following extends the line box 8px ABOVE, "
        "dropping the baseline-aligned inline-flex row 8px below our row "
        "at byte-equal title/desc/content boxes — first button 313,348 "
        "REF vs 313,340 OURS, the same 8px on the Export card; THE CURE "
        "[SETTINGS_DATA.listBody space-y-2 -> the house's s11-era "
        "explicit [&>*+*]:mt-2 form — the CardHeader precedent]; the "
        "re-walk PROVES all three cures byte-equal on both axes); THE "
        "TDD LEDGER [3 born-green pins — the s173 P-p/P-q contract-freeze "
        "family: the walk60 decode freeze (the tool's own contract) · "
        "the profile avatar family construction freeze (the genuine "
        "battery gap: the s13 pins held the ROOT + the icon class, never "
        "the fallback's tag or the color carrier) · the Data-tab "
        "list-body rhythm freeze (the genuine gap: the s14/s26/s83 pins "
        "held the labels/margins/icon, never the v4-vs-v3 rhythm arm)] + "
        "THE D-187a1/a2/a3 CURE PINS [RED-first — exactly 3 RED at "
        "birth -> the cures -> GREEN]; the count ladder 2769 -> 2772 "
        "(+3) · SUITES 138 HELD · E2E 192 re-verified (the round's "
        "product-code touches: profile-page.tsx + page-layout.ts; the "
        "MODULE line count 1701 -> 1718 [+17 the cure comments]) · badge "
        "2961 -> 2964 (count-ladder-187.py: assert-first, idempotent — "
        "the re-run a verified 0-flip no-op) + the collateral "
        "re-anchors (the SKILL §5.6 census 245 -> 248 checks · the "
        "MODULE lines 1701 -> 1718 · the F-106a1 layer-axis pin — the "
        "s187 layer live, the s186 demoted beneath it at 2769/192 · the "
        "s186-era live-tense RED-first arithmetic site re-anchored 261 "
        "-> 264) — session-187, the profile photo-upload family finally "
        "WALKED two-app, the v4 space-y INLINE-FLOW variant the "
        "operator's Tailwind-v4 bug-watch find of the round ) "
        "+ beneath it 2769 unit checks + 192 e2e checks green; the session-186 layer "
        "(THE SETTINGS PICKLIST-EDITOR OPEN-STATE INTERIOR WALK + DEFAULTS-TAB SELECTS SIBLING — the walk59 round)"
    )
    new_text = text.replace(live_line, demoted_block + S187_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.183.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.183.0", "version: 1.184.0", 1)

    assert new_text.count("last_updated: 2026-10-25") == 1, "the last_updated anchor must be unique"
    new_text = new_text.replace("last_updated: 2026-10-25", "last_updated: 2026-10-26", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.183.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.183.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.184.0)",
        1,
    )

    SKILL.write_text(new_text, encoding="utf8")
    print("  flip   [SKILL head] the s187 layer live (v1.184.0); the s186 layer demoted at its ship counts (2769/192)")

# the idempotence guard: re-running must be a verified no-op
final = SKILL.read_text(encoding="utf8")
assert S187_MARKER in final, "the s187 head layer must be live after the surgery"
print("skill-head-187: done (idempotent form)")
