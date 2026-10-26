#!/usr/bin/env python3
"""skill-head-188.py — the SKILL frontmatter head surgery (the s188 layer).

The L-169c3 form: the verified-single guard. The demoted s187 layer keeps
its SHIP-TIME counts (2773/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.184.0 -> 1.185.0) + the H1 lockstep.

The s188 sequence NOTE (the s187 lesson applied): the HEAD surgery runs
FIRST this round — the live s187 line still carries its ship count
(2773), so the demotion is a verbatim move (no ship-count restore
needed), and the count-ladder-188.py run that follows flips only the
OTHER doc sites (the head's live line is already 2777 when it reads
them). The last_updated stays 2026-10-26 (the s188 round ships the same
calendar day as s187 — no date flip).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S188_MARKER = "project_state: 2777 unit checks + 192 e2e checks green; the session-188 layer ("

if S188_MARKER in text:
    print("  no-op  [SKILL head] the s188 layer already live")
else:
    # 0) THE D-188a1 CURE (first): the retired session-186 block's ship
    #    line — the s187 first-pass ladder/head interaction wrote the
    #    LIVE s187 counts + layer name into the demoted s186 copy and
    #    the corrupted form shipped (c36c5f4/f1a0a8a). The s171-fix
    #    doctrine: demoted layers keep their OWN ship counts. The
    #    corrupted line is keyed by its TITLE (THE SETTINGS
    #    PICKLIST-EDITOR — the s186 round's own; the live s187 line
    #    carries THE PROFILE PHOTO-UPLOAD title), so the repair is
    #    uniquely anchored BEFORE the demotion runs.
    CORRUPTED = (
        "project_state: 2773 unit checks + 192 e2e checks green; "
        "the session-187 layer (THE SETTINGS PICKLIST-EDITOR OPEN-STATE INTERIOR WALK"
    )
    RESTORED = (
        "project_state: 2769 unit checks + 192 e2e checks green; "
        "the session-186 layer (THE SETTINGS PICKLIST-EDITOR OPEN-STATE INTERIOR WALK"
    )
    if RESTORED in text:
        print("  no-op  [D-188a1] the retired s186 ship line already restored")
    else:
        corrupted_count = text.count(CORRUPTED)
        assert corrupted_count == 1, f"the D-188a1 corrupted line must be unique; found {corrupted_count}"
        text = text.replace(CORRUPTED, RESTORED, 1)
        print("  flip   [D-188a1] the retired s186 block's ship line restored (2773/session-187 -> 2769/session-186)")

    LIVE_MARKER = "project_state: 2773 unit checks + 192 e2e checks green; the session-187 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s187 head marker found {live_count} times"

    # 1) extract the live s187 line — its ship count IS the live count
    #    (the ladder has not run yet), so the demotion is verbatim
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted block — the s187 layer keeps its ship counts (2773/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-187 layer (comment-demoted at session-188 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181/s182/s183/s184/s185/\n"
        "     s186 layers sit demoted above it):\n\n"
        + live_line
        + "\n-->\n\n"
    )

    # 3) the new s188 live layer — the zero-fix freeze-pin round (the
    #    s134 precedent): every walked family byte-equal on both apps,
    #    ZERO live finds, every delta a documented genus
    S188_LAYER = (
        "project_state: 2777 unit checks + 192 e2e checks green; the session-188 layer "
        "(THE SETTINGS SEGMENTED TAB-BAR FOCUS/OPEN INTERIOR WALK + "
        "ACCOUNTS-RAIL/LEADS-SEARCH PAGE-ARMS SIBLING [walk61] — the s396 "
        "close's named candidates [the settings Data-tab's OWN deeper "
        "focus faces — the tab-bar segmented focus faces never walked · "
        "the account/leads/reports page-level interactive arms under "
        "ADR-022 — the s18/s25-era constructions never re-walked live] "
        "BOTH LIVE on BOTH apps [the discovery scripts/discover-188.ts + "
        "the micro-probe scripts/probe-leads-search-and-tab-outline.ts "
        "proved the settings strip byte-equal on every resting face — "
        "the strip 288,189 1120x36 bg rgb(245,245,245) radius 8 + the "
        "three triggers byte-equal at 292/663/1033 371x28 + the active "
        "bg-white face byte-equal · the accounts rail's three filter "
        "selects byte-equal at 1113,376/456/536 270x36 with the OPEN "
        "listbox construction byte-equal modulo the DATA-STATE item "
        "counts [REF 1 at its zero-data state vs OURS 5 at the seeded "
        "db] · the leads search byte-equal at 304,391 1088x36 desktop + "
        "32,1037 326x36 phone [the reference's input carries NO "
        "aria-label — the s88-c9 superset confirmed] · the reports "
        "pills/selects re-walked byte-equal modulo the walk52-documented "
        "DATA-STATE y-offset; the density-selects arm KILLED [F-147c3 "
        "retired upstream]; the topbar-search gate KILLED again "
        "[populated=0 on both — the s32 dead-stub doctrine stands]; the "
        "Edit-family re-check still zero-row — the candidate STAYS "
        "suspended; the probe STABLE at 46bc2d9c kills the fresh-bundle "
        "candidate, the registry's latest staying 3.10.1 kills the "
        "recharts 4.0 gate; the baseline GREEN at the exact s187 ship "
        "state on a FRESH CLONE: lint 0/0 · tsc 0 · 138/2773 · build · "
        "smoke 14/14 · e2e 192/192 clean first run 5.7m · probe:ref "
        "STABLE · census MATCH · sitemap 11 routes + robots + manifest "
        "200]: THE WALK [scripts/walk61-settings-tabs-rail-focus-open.ts, "
        "the walk53-60 ledger form over the settings tab-bar's "
        "focus/open states + the accounts-rail/leads-search/reports "
        "siblings at BOTH axes: Phase A the settings tab-bar OPEN "
        "census — the strip's geometry ledger + the DFS wiring + the "
        "three triggers' resting faces + the active/inactive pair + the "
        "click-through round-trip [local state, NO writes] + the 24px "
        "strip-to-content gap live-measured byte-equal; Phase B the "
        "REAL keyboard Tab drive into the strip — 13 stops BOTH apps "
        "STRUCTURALLY IDENTICAL [the 8 sidebar links, the topbar "
        "search, the 3 topbar buttons, the strip] + the ArrowRight "
        "automatic-activation landing byte-equal; Phase B2 the REAL "
        "mouse-click face [the walk57 mouse-borne precedent] — the "
        "outline decode: 3px none on BOTH, nothing paints; Phase C the "
        "accounts rail sibling — the three selects' faces + the OPEN "
        "listbox census; Phase D the leads search sibling — the "
        "resting + REAL-focus rings + the toolbar geometry; Phase E the "
        "reports pills/selects re-walk leg [the walk52/55 re-check on "
        "the live tree]; Phase F the phone axis — the strip byte-equal "
        "at 16,197 358x36 + 117x28 triggers, the leads search "
        "byte-equal, the rail display:none below lg the documented "
        "phone-axis kill]: ZERO LIVE FINDS, every remaining delta a "
        "documented genus [the box-shadow SLOT-COUNT with every VISIBLE "
        "layer byte-equal — the shadow-sm resting arm, the REAL-keyboard "
        "focus ring's white 2px offset slot + 4px near-black ring + the "
        "active shadow pair · the ring-offset white zero-extent slot "
        "[the s129 retirement] · the outline VERSION FORM + both "
        "sub-forms + the NEW COLOR-CARRIER sub-form the decode adds to "
        "the register (at rest and at mouse-click BOTH apps compute "
        "outline-style NONE — zero visible pixels — but the carrier "
        "color resolves currentColor on OURS against the reference's "
        "platform constant rgba(10,10,10,0.5) on every element) · the "
        "token-selection M-81c2 pairs (border-line/text-ink vs "
        "border-input/inherited — the S10-2 deliberate carrier) · the "
        "class-order family (the strip's grid/w-full position, the "
        "rail select's w-full append position, the leads input's "
        "md:text-sm position) · our aria-label supersets (s88-c9, kept "
        "— the comboboxes, the topbar buttons, the leads search) · the "
        "React useId format] + the DATA-STATE genus (the rail owner "
        "lists, the reports KPI-row y-offset); THE TDD LEDGER [the pin "
        "survey first — the s12/s125/s129 TABS_SEGMENTED family · the "
        "s23 tabs-aria wiring · the s28 account-surfaces rail · the "
        "s29 LEADS_TOOLBAR pl-10 · the s10 INPUT_BASE — the settings "
        "page's OWN call-site, the three rail SelectTrigger sites, and "
        "the leads search call-site never pinned; 4 born-green pins in "
        "the page-layout battery — the walk61 decode freeze (the "
        "tool's own contract: the two-app settings OPEN ledger at both "
        "axes + the REAL Tab/ArrowRight drives + the mouse-click face + "
        "the rail/leads/reports siblings) · the settings tab-bar "
        "call-site construction freeze · the accounts rail-selects "
        "construction freeze · the leads-search call-site construction "
        "freeze — all BORN GREEN, no cure pins, the zero-fix round; the "
        "walk re-run STABLE byte-identical]; the count ladder 2773 -> "
        "2777 (+4) · SUITES 138 HELD · E2E 192 re-verified (the round: "
        "ZERO product-code touches — the s134-precedent zero-fix "
        "freeze-pin round; the MODULE line count 1718 HELD) · badge "
        "2965 -> 2969 (count-ladder-188.py: assert-first, idempotent) — "
        "session-188, the settings segmented family finally WALKED "
        "two-app, the outline color-carrier sub-form the register's "
        "newest arm ) "
        "+ beneath it 2773 unit checks + 192 e2e checks green; the session-187 layer "
        "(THE PROFILE PHOTO-UPLOAD FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS DATA-TAB SIBLING — the walk60 round)"
    )
    new_text = text.replace(live_line, demoted_block + S188_LAYER, 1)

    # 4) the frontmatter version bump + the H1 lockstep (assert-unique)
    assert new_text.count("version: 1.184.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.184.0", "version: 1.185.0", 1)

    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.184.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.184.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.185.0)",
        1,
    )

    SKILL.write_text(new_text, encoding="utf8")
    print("  flip   [SKILL head] the s188 layer live (v1.185.0); the s187 layer demoted at its ship counts (2773/192)")

# the idempotence guard: re-running must be a verified no-op
final = SKILL.read_text(encoding="utf8")
assert S188_MARKER in final, "the s188 head layer must be live after the surgery"
print("skill-head-188: done (idempotent form)")
