#!/usr/bin/env python3
"""skill-head-171.py — the SKILL frontmatter head surgery (the s171 layer).

The L-169c3 form: the verified-single guard (the live head exists exactly
once), never a boundary split. The demoted s170 layer is restored to its
SHIP-TIME counts (2644/161 — the count ladder had re-anchored the live
prefix to 2668/186; history keeps its own numbers). Idempotent: a re-run
is a verified no-op.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

LIVE_MARKER = "project_state: 2668 unit checks + 186 e2e checks green; the session-170 layer ("
S171_MARKER = "project_state: 2668 unit checks + 186 e2e checks green; the session-171 layer ("

if S171_MARKER in text:
    print("  no-op  [SKILL head] the s171 layer already live")
else:
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s170 head marker found {live_count} times"

    # 1) extract the live s170 line
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted copy restored to the ship-time counts
    demoted = live_line.replace(
        "project_state: 2668 unit checks + 186 e2e checks green;",
        "project_state: 2644 unit checks + 161 e2e checks green;",
        1,
    )

    # 3) remove the live line
    text2 = text[:start] + text[end + 1:]

    # 4) insert the demoted copy inside the comment block (before `-->`)
    closer = text2.index("-->")
    text2 = text2[:closer] + demoted + "\n" + text2[closer:]

    # 5) the new s171 live layer lands after the comment block + blank line
    S171_LAYER = (
        "project_state: 2668 unit checks + 186 e2e checks green; the session-171 layer "
        "(THE AXE-CORE A11Y TWO-GATE + THE NAMED-CONTROL FAMILY — the post-170 audit round "
        "[the baseline gate GREEN at the exact s170 ship state: lint 0/0 · tsc 0 · 134/2644 · "
        "build · smoke 14/14 · e2e 161/161 · probe:ref STABLE · the desktop + phone sweeps CLEAN "
        "live · the mobile drawer 7/7 at 390×844 · the Tailwind v4 state clean · sitemap 11 "
        "routes + robots + manifest standing · census MATCH — the live axe probes across "
        "twelve surfaces × two widths + the drawer-open state, PLUS the same scan against the "
        "REFERENCE's own DOM for the parity context]: THE NAMED-CONTROL FAMILY [F-171a/b/c — "
        "19 unnamed SelectTrigger comboboxes on the open surfaces (dashboard ×2 · accounts ×3 · "
        "contacts ×15 row selects · activities ×2 · reports ×4) + 11 bare inert Checkboxes (the "
        "dashboard's two Follow-up families) + 4 hidden-sm:inline icon-only Buttons unnamed at "
        "phone width (Filter · Scan Card · Import · Export CSV); ROOT CAUSE: role=\"combobox\" "
        "names come from author attributes ONLY — axe's subtreeText ignores inner text for "
        "non-name-from-content roles (verified in the axe 4.13 source), so the visible span "
        "text (\"Decision Maker\", \"All Stages\") is INVISIBLE to the name computation; THE "
        "CURE: aria-label on every open-surface control (the leads-page precedent form \"Filter "
        "by X\" extended; the contacts rows carry the row context `Role — ${c.name}`; the "
        "Checkboxes carry their sibling-span text; the icon-only Buttons carry their desktop "
        "labels) — the reference ships the identical families (verified live on its DOM: "
        "button-name on EVERY page, 2-69 nodes) so the fixes are invisible supersets, the "
        "drawer precedent] + THE AXE-CORE A11Y TWO-GATE [tests/e2e/a11y.spec.ts — the "
        "web-app-foundation §8.3 \"best-in-class add-on\": 25 checks = the nine CRM pages × "
        "desktop + phone + the three anon surfaces × both widths + the drawer-open state; GATE "
        "1: structural violations ZERO (button-name/link-name/label/…); GATE 2: color-contrast "
        "+ svg-img-alt nodes must cite the SANCTIONED register — the parity palette (the "
        "active-nav chip · the drawer white-wash · the landing preview grays + the "
        "byte-identical .self-start \"Most popular\" pill · the quick-log emerald · the "
        "calendar off-month grays · the inactive-tab muted-ink #737373) + the recharts genus "
        "(the funnel trapezoid Layers carry library-hardcoded role=\"img\", no aria seam — "
        "verified in the recharts 2.15 source); axe-core DECLARED as a devDep ^4.13.0 (F-171e "
        "— the undeclared-transitive standby cured: the gate must not stand on a dep an "
        "eslint-config bump could drop)] + the source-pin battery [tests/a11y-controls.test.ts "
        "— the 135th suite, +22: the named-control census over the five open-surface pages + "
        "the icon-button/checkbox forms + the declared-devDep pin + the two-gate spec "
        "contract]; the count ladder 2644 → 2668 (+24: a11y-controls +22 + the "
        "inventory-census +2 [the two new §11 rows' parameterized pins]) · SUITES 134 → 135 · "
        "E2E 161 → 186 (+25) · badge 2805 → 2854 — every live-tense site re-anchored "
        "atomically (count-ladder-171.py, assert-first, idempotent, unique-anchor) + the SKILL "
        "v1.168.0 frontmatter + H1 lockstep + this s171 head layer [the s170 layer "
        "comment-demoted]) + beneath it 2644 unit checks + 161 e2e checks green; the "
        "session-170 layer (THE ERROR-BOUNDARY FAMILY + THE BOOT GATE + THE SMOKE LEG + THE "
        "ARTIFACT HYGIENE + THE DOCTRINE-STRAGGLER CLOSURE — the resilience + hygiene round)"
    )

    live_pos = text2.index("-->") + len("-->\n")
    text2 = text2[:live_pos] + "\n" + S171_LAYER + text2[live_pos:]
    SKILL.write_text(text2, encoding="utf8")
    print("  flipped [SKILL head] the s171 layer live · the s170 layer demoted (ship counts)")

print("skill-head-171: done")
