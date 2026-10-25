#!/usr/bin/env python3
"""skill-head-185.py — the SKILL frontmatter head surgery (the s185 layer).

The L-169c3 form: the verified-single guard. The demoted s184 layer keeps
its SHIP-TIME counts (2763/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.181.0 -> 1.182.0) + the H1 lockstep. The
last_updated date stays 2026-10-25 (both the s184 and s185 rounds are
that date). NOTE: the count-ladder ran FIRST this round, so the live
s184 line already carries 2766 — the demotion restores the s184 ship
count (2763) in the retired copy, and the new s185 layer carries 2766
live.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S185_MARKER = "project_state: 2766 unit checks + 192 e2e checks green; the session-185 layer ("

if S185_MARKER in text:
    print("  no-op  [SKILL head] the s185 layer already live")
else:
    LIVE_MARKER = "project_state: 2766 unit checks + 192 e2e checks green; the session-184 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s184 head marker found {live_count} times"

    # 1) extract the live s184 line (post-ladder: 2766; the ship count is 2763)
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]
    ship_line = live_line.replace(
        "project_state: 2766 unit checks", "project_state: 2763 unit checks", 1
    )

    # 2) the demoted block — the s184 layer keeps its ship counts (2763/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-184 layer (comment-demoted at session-185 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181/s182/s183 layers sit\n"
        "     demoted above it):\n\n"
        + ship_line
        + "\n-->\n\n"
    )

    # 3) the new s185 live layer
    S185_LAYER = (
        "project_state: 2766 unit checks + 192 e2e checks green; the session-185 layer "
        "(THE QUICK-LOG DIALOG OPEN-STATE INTERIOR WALK + BY-TYPE FOOTER RE-WALK "
        "[walk58] — the s390 close's FIRST-named candidate [the quick-log "
        "quartet's OPEN-dialog faces — the Log Activity dialog's create-focus "
        "arm, the walk54 CREATE-family sibling at this call site] LIVE, BOTH "
        "ARMS, at byte-equal geometry [the discovery scripts/discover-185.ts "
        "proved the reference's quartet FUNCTIONAL — the L-125c2 dead-stub "
        "doctrine does NOT reach this family: the dialog OPENS on the "
        "reference at 384,237 672x426 desktop / 0,201 390x442 phone, the "
        "labels + footer + placeholder byte-equal, the type quintet "
        "Call/Email/Meeting/Task/Note with WhatsApp NEVER listed, the related "
        "quartet Contact/Account/Opportunity/Lead] + the second-named [the "
        "by-type card's checkbox-footer/••• face, the s13 construction never "
        "re-walked under ADR-022] byte-equal on every computed face [the card "
        "1088,821 320x375 · the checkbox 16x16 checked=true with the dark "
        "rgb(23,23,23) fill · the ••• face identical modulo our kept "
        "aria-label superset]; the standing Edit-family re-check: the "
        "reference still carries ZERO rows + ZERO calendar chips — the "
        "candidate STAYS suspended; the post-184 audit round, its rotation "
        "trigger THE OWNER'S NEWEST COMMIT [8e48c3d: the session_390/391 "
        "transcripts — the s184 round's own execution record]; the probe "
        "STABLE at 46bc2d9c kills the fresh-bundle candidate, the registry's "
        "latest staying 3.10.1 kills the recharts 4.0 gate; the baseline "
        "gate GREEN at the exact s184 ship state on a FRESH CLONE: lint 0/0 "
        "· tsc 0 · 138/2763 · build · smoke 14/14 · e2e 192/192 clean first "
        "run 5.5m · census MATCH · sitemap 11 routes + robots + manifest "
        "200): THE WALK [scripts/walk58-quicklog-dialog-open.ts, the "
        "walk53-57 ledger form over the dialog family's OPEN states at BOTH "
        "axes (the dialog family reachable at phone, unlike the rail): Phase "
        "A the dialog OPEN census — the chrome faces + the interior DFS "
        "ledger + the mount-focus + the combobox faces + the vocabularies + "
        "the footer pair + the CANCEL round-trip; Phase B the REAL keyboard "
        "Tab drive through the OPEN dialog (the walk54 focus form, now "
        "TWO-APP: 17 stops, structurally IDENTICAL chains, only the naming "
        "delta — our aria-label supersets); Phase C the phone-axis census; "
        "Phase D the by-type footer decode]: THE VERDICT — ONE LIVE FIND "
        "CURED, every remaining delta a documented genus [the box-shadow "
        "SLOT-COUNT (every VISIBLE layer byte-equal) · the outline VERSION "
        "FORM + both sub-forms (the alpha-color carrier + the reference's "
        "2px-solid-transparent focused member — style none paints ZERO "
        "pixels on both; the visible focus face rides the byte-equal ring) · "
        "the oklab/rgba overlay serialization (the walk54 class carrier) · "
        "the token-selection M-81c2 pairs incl. the footer submit's "
        "bg-neutral-900 ≡ the reference's bg-primary computed rgb(23,23,23) "
        "— THE D-183a1 SAME-FAMILY CHECK CLEAN, no blue flip on the dialog "
        "submit · the class-order md:text-sm position · our aria-label "
        "supersets (the combobox triggers + the ••• dots) · the React useId "
        "format · lucide's aria-hidden X · the Radix SelectContent "
        "mount-state offset in the interior ledger]; THE LIVE FIND D-185a1 "
        "THE EMPTY-SELECT PLACEHOLDER INK — the s133 retirement's own "
        "counter-case: the reference's CURRENT trigger construction carries "
        "the stock data-[placeholder]:text-muted-foreground arm (the walk58 "
        "class-string census, both comboboxes) and its placeholder-state "
        "Related To (Type) select computes the MUTED rgb(115,115,115) where "
        "the retirement left ours at the foreground rgb(10,10,10) — TWO "
        "facts reversed the s133 doctrine: its own protected face (the "
        "accounts density select) retired upstream at s148, and the s81-era "
        "bundle decode predates the s147 bundle event; THE CURE [the arm "
        "restored in our token expression — data-[placeholder]:text-muted-ink, "
        "the s10 pair — the composition interpolation restored in "
        "select.tsx; the s133 pin block re-anchored RED-first]; the re-walk "
        "PROVES the face byte-equal (rgb(115,115,115) on both apps, the "
        "value-carrying selects untouched at rgb(10,10,10)); THE TDD LEDGER "
        "[3 born-green pins — the s173 P-p/P-q contract-freeze family: the "
        "walk58 decode freeze (the tool's own contract) · the quick-log "
        "trigger→dialog construction freeze (the genuine battery gap: the "
        "s125 pins hold the FORM side, never the PAGE side — the QUICK_LOG "
        "quartet + the onClick wiring + the ActivityDialog call-site props) "
        "· the by-type footer pair freeze (the defaultChecked checkbox + the "
        "htmlFor label + the ••• aria-label superset — the s76/s13 pins hold "
        "the CLASS tokens, never the PAIR)] + THE D-185a1 CURE PIN "
        "[RED-first — exactly 1 RED at birth -> the cure -> GREEN]; "
        "MUTATION-PROOF [the planted setDefaultType regression -> exactly 1 "
        "RED (the full-string wiring pin's unique teeth) -> restored -> "
        "GREEN] · STASH-PROOF [the round's test block stashed -> exactly "
        "138/2763 (the s184 ship state) -> restored -> 138/2766]; the count "
        "ladder 2763 -> 2766 (+3) · SUITES 138 HELD · E2E 192 re-verified "
        "(the round's ONE product-code touch: the D-185a1 restoration in "
        "page-layout.ts + select.tsx) · badge 2955 -> 2958 "
        "(count-ladder-185.py: assert-first, idempotent — the re-run a "
        "verified 0-flip no-op) + the collateral re-anchors (the SKILL §5.6 "
        "census 239 -> 242 checks · the MODULE lines 1695 -> 1701 [the "
        "D-185a1 comment growth +6] · the PAD §11 module row + the "
        "negatives ladder · the F-106a1 layer-axis pin — the s185 layer "
        "live, the s184 layer demoted beneath it at 2763/192 · the "
        "s184-era live-tense RED-first arithmetic site re-anchored 255 -> "
        "258) — session-185, the Log Activity dialog's OPEN interiors "
        "finally WALKED two-app, the s133 genus REVERSED by its own live "
        "counter-case) "
        "+ beneath it 2763 unit checks + 192 e2e checks green; the session-184 layer "
        "(THE ACTIVITIES MORE-FILTERS TOGGLE + RAIL-ACTIONS OPEN-STATE INTERIOR WALK — the walk57 round)"
    )
    new_text = text.replace(live_line, demoted_block + S185_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.181.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.181.0", "version: 1.182.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.181.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.181.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.182.0)",
        1,
    )

    SKILL.write_text(new_text, encoding="utf8")
    print("  flip   [SKILL head] the s185 layer live (v1.182.0); the s184 layer demoted at its ship counts (2763/192)")

# the idempotence guard: re-running must be a verified no-op
final = SKILL.read_text(encoding="utf8")
assert S185_MARKER in final, "the s185 head layer must be live after the surgery"
print("skill-head-185: done (idempotent form)")
