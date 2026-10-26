#!/usr/bin/env python3
"""skill-head-189.py — the SKILL frontmatter head surgery (the s189 layer).

The L-169c3 form: the verified-single guard. The demoted s188 layer keeps
its SHIP-TIME counts (2778/192) in its own comment block (the s171-fix
precedent). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.185.0 -> 1.186.0) + the H1 lockstep + the
last_updated date (2026-10-26 -> 2026-10-27).

The s188 lesson applied (the s187 lesson before it): the HEAD surgery
runs FIRST — the live s188 line still carries its ship count (2778),
so the demotion is a verbatim move (no ship-count restore needed), and
the count-ladder-189.py run that follows flips only the OTHER doc sites
(the head's live line is already 2781 when it reads them). The retired
s186/s187 blocks stay UNTOUCHED — the D-188a1 pin (now generalized to
every retired block) holds their ship lines under the unit gate.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S189_MARKER = "project_state: 2781 unit checks + 192 e2e checks green; the session-189 layer ("

if S189_MARKER in text:
    print("  no-op  [SKILL head] the s189 layer already live")
else:
    LIVE_MARKER = "project_state: 2778 unit checks + 192 e2e checks green; the session-188 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s188 head marker found {live_count} times"

    # 1) extract the live s188 line — its ship count IS the live count
    #    (the ladder has not run yet), so the demotion is verbatim
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted block — the s188 layer keeps its ship counts (2778/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-188 layer (comment-demoted at session-189 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173/s174/s176/s177/s178/s179/s180/s181/s182/s183/s184/s185/\n"
        "     s186/s187 layers sit demoted above it):\n\n"
        + live_line
        + "\n-->\n\n"
    )

    # 3) the new s189 live layer — the second consecutive zero-fix
    #    freeze-pin round (the s134/s188 precedent): every walked arm
    #    byte-equal on both apps, ZERO live finds, every delta a
    #    documented genus
    S189_LAYER = (
        "project_state: 2781 unit checks + 192 e2e checks green; the session-189 layer "
        "(THE LEADS SAVED-VIEWS SELECT OPEN FACES + THE CALENDAR MONTH-NAV ARMS "
        "[walk62] — the s398 close's named candidates [the account INSIGHTS "
        "dialog + the leads SAVED-VIEWS select's open faces — the s28/s29-era "
        "constructions never re-walked live under ADR-022 · the calendar "
        "month-nav arms — the s27-era construction, its interactive faces "
        "never walked] adjudicated by the discovery scripts/discover-189.ts: "
        "the INSIGHTS arm KILLED [the reference's zero-row state persists — "
        "rows=1/rowMenus=0/insightsTriggers=0 on all three entity pages, "
        "zero calendar chips; the Ece dialog rides an account row's menu that "
        "does not exist there; the candidate STAYS suspended], the "
        "SAVED-VIEWS select + the MONTH-NAV LIVE on BOTH apps, the "
        "topbar-search gate KILLED again [populated=0 on both — the s32 "
        "dead-stub doctrine stands]; the probe STABLE at 46bc2d9c kills the "
        "fresh-bundle candidate, the registry's latest staying 3.10.1 kills "
        "the recharts 4.0 gate; the baseline GREEN at the exact s188 ship "
        "state on a FRESH CLONE: lint 0/0 · tsc 0 · 138/2778 · build · smoke "
        "14/14 · e2e 192/192 clean first run 5.6m · probe:ref STABLE · "
        "census MATCH · sitemap 11 routes + robots + manifest 200]: THE WALK "
        "[scripts/walk62-savedviews-calnav-focus-open.ts, the walk53-61 "
        "ledger form over the two LIVE arms at BOTH axes: Phase A the "
        "Saved-Views select OPEN census — the pre-save absence census [REF 0 "
        "comboboxes at its zero-data state vs OURS 24 inline row selects at "
        "the seeded db — the DATA-STATE genus] + the save-flow ride [the "
        "Filters popover -> Save View -> the NATIVE prompt answered — the "
        "s29 live-verified contract, the localStorage `neo-crm.leads.views` "
        "seam, the browser context discarding it] + the mounted select's "
        "geometry ledger [428,443 192x36 desktop byte-equal both apps] + "
        "the OPEN listbox census [428,483 194x42 radius 6, the one-item "
        "vocabulary identical] + the apply round-trip [trigger "
        '"Walk62 View" both apps, listbox closed both]; Phase B the REAL '
        "keyboard drive into the mounted select — the SAME-SESSION form [NO "
        "reload: the reference keeps its view list IN MEMORY ONLY — ours "
        "persists to localStorage, the kept superset; a reload would kill "
        "the REF's select] — the chain STRUCTURALLY IDENTICAL (5 stops: "
        "Export -> New Lead -> search -> Filters -> the select, reached at "
        "stop 5 on BOTH) + the ArrowDown open [radius 6, items 1, "
        'highlight "Walk62 View" both] + the Enter apply; Phase C the '
        "calendar month-nav census — the header-row geometry [the heading "
        "313,374 183x32 + prev 877,372 36x36 + Today 921,372 75x36 + next "
        "1003,372 36x36 byte-equal both apps] + the DFS ledger + the click "
        "round-trip [prev -> September 2026; today -> October 2026 — local "
        "state, NO writes, identical both] + the month-flip grid re-census "
        "[the heading flip byte-equal; the buttons-only cell census rides "
        "OURS' day-cell superset — the DATA-STATE genus]; Phase C2 the REAL "
        "keyboard Tab drive through the three nav buttons [landing at stop "
        "15 on BOTH, the tag+geometry sequences STRUCTURALLY IDENTICAL, the "
        "REAL :focus-visible faces byte-equal on the VISIBLE layers — the "
        "1px near-black ring + shadow-sm]; Phase D the phone axis 390x844 "
        "[the select w-full stack byte-equal at 32,482 326x36; the Today "
        "button hidden below sm on BOTH — the s27 live pin, 2 nav buttons "
        "on each]]: ZERO LIVE FINDS, every delta a documented genus [the "
        "box-shadow SLOT-COUNT with every VISIBLE layer byte-equal · the "
        "ring-offset white zero-extent slot [s129] · the outline VERSION "
        "FORM + both sub-forms + the COLOR-CARRIER sub-form [zero visible "
        "pixels on both] · the token-selection M-81c2 pairs "
        "(border-line/bg-surface vs border-input/bg-popover, "
        "computed-equal) · the class-order family [the outline-button "
        "ring-position pair] · our aria-label supersets [s88-c9, kept — the "
        "select trigger + both nav icons] · our aria-hidden svg superset · "
        "the React useId format · the DATA-STATE genera]; THE TDD LEDGER "
        "[the pin survey first — the s29 LEADS_TOOLBAR family + the "
        "savedViewsSelect width pin · the s16 CALENDAR_CARD family · the "
        "s27 calendar-cells family · the s10 INPUT_BASE/SELECT_TRIGGER/"
        "BUTTON_BASE pins; 3 born-green pins in the page-layout battery — "
        "the walk62 decode freeze (the tool's own contract) · the "
        "Saved-Views select call-site construction freeze (the genuine "
        "battery gap: the s29 pins hold the toolbar row + the width class, "
        "never the SelectTrigger call-site's own chain) · the calendar "
        "month-nav call-site construction freeze (the genuine gap: the "
        "s16 pins hold the navRow container + the s27 pins the day cells, "
        "never the three Button call-sites) — all BORN GREEN, no cure "
        "pins, the zero-fix round; the walk re-run STABLE byte-identical]; "
        "the count ladder 2778 -> 2781 (+3) · SUITES 138 HELD · E2E 192 "
        "re-verified (the round: ZERO product-code touches — the "
        "s134/s188-precedent zero-fix freeze-pin round; the MODULE line "
        "count 1718 HELD) · badge 2970 -> 2973 (count-ladder-189.py: "
        "assert-first, idempotent) — session-189, the Saved-Views select "
        "+ the calendar month-nav finally WALKED two-app, the "
        "memory-only-vs-persistence superset decoded live ) + beneath it "
        "2778 unit checks + 192 e2e checks green; the session-188 layer "
        "(THE SETTINGS SEGMENTED TAB-BAR FOCUS/OPEN INTERIOR WALK + "
        "ACCOUNTS-RAIL/LEADS-SEARCH PAGE-ARMS SIBLING — the walk61 round)"
    )

    # 4) the splice: the demoted block + the new live layer replace the
    #    live s188 line
    text = text[:start] + demoted_block + S189_LAYER + text[end:]

    # 5) the frontmatter version + last_updated + H1 lockstep
    text = text.replace("version: 1.185.0", "version: 1.186.0", 1)
    text = text.replace("last_updated: 2026-10-26", "last_updated: 2026-10-27", 1)
    text = text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.185.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.186.0)",
        1,
    )

    SKILL.write_text(text, encoding="utf8")
    print("  flip   [SKILL head] the s188 layer demoted at its ship counts (2778/192); the s189 layer live (2781/192)")
    print("  flip   [SKILL head] the frontmatter 1.185.0 -> 1.186.0 + the H1 lockstep + the last_updated 2026-10-27")
