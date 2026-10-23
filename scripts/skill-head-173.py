#!/usr/bin/env python3
"""skill-head-173.py — the SKILL frontmatter head surgery (the s173 layer).

The L-169c3 form: the verified-single guard (the live head exists exactly
once). The demoted s172 layer keeps its SHIP-TIME counts (2697/192) in
its own comment block (the s171-fix precedent — never inside another
wrapper). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.169.0 -> 1.170.0) + the H1 lockstep.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S173_MARKER = "project_state: 2712 unit checks + 192 e2e checks green; the session-173 layer ("

if S173_MARKER in text:
    print("  no-op  [SKILL head] the s173 layer already live")
else:
    LIVE_MARKER = "project_state: 2697 unit checks + 192 e2e checks green; the session-172 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s172 head marker found {live_count} times"

    # 1) extract the live s172 line
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted block — the s172 layer keeps its ship counts (2697/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-172 layer (comment-demoted at session-173 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171 layers\n"
        "     sit demoted above it):\n\n"
        + live_line
        + "\n-->\n\n"
    )

    # 3) the new s173 live layer
    S173_LAYER = (
        "project_state: 2712 unit checks + 192 e2e checks green; the session-173 layer "
        "(THE INJECTABLE CLOCK SEAM + THE RATE-LIMIT WINDOW PROPERTY FAMILY + THE ZOD "
        "ROUND-TRIP PROPERTY FAMILY — the post-172 audit round [the baseline gate GREEN "
        "at the exact s172 ship state: lint 0/0 · tsc 0 · 137/2697 · build · smoke 14/14 "
        "· e2e 192/192 · probe:ref STABLE · the desktop + phone sweeps CLEAN live · the "
        "mobile drawer 7/7 at 390×844 · the Tailwind v4 state clean · sitemap 11 routes "
        "+ robots + manifest standing · census MATCH — the standing legs re-verified "
        "live, the drawer battery 7/7 + the fresh reference probe STABLE (the bundle md5 "
        "46bc2d9c, the register citations hold)]: THE INJECTABLE CLOCK SEAM [F-173a — "
        "rateLimit takes `now = Date.now()`: the session-164 sweepRateLimits form "
        "extended to the rateLimit path, the module's own injectable precedent; PURELY "
        "ADDITIVE — the default is the wall clock, all 7 call sites (login/signup/"
        "resend/verify/forgot/reset-password/upload) ride unchanged, zero behavior "
        "change on the wire; the wall-clock battery could never STATE the crossing (a "
        "60s window cannot be waited out inside a test), the injected clock makes the "
        "fixed-window arithmetic property-testable] + THE DEEPER PROPERTY FAMILY "
        "[F-173b/c — the s172 close's named candidate, NO new devDep (fast-check rides "
        "the s172 declaration): the Zod round-trip half (P-h…P-m — the create-defaults "
        "quadrant round-trip for every CREATE schema · the enum membership invariant "
        "(members parse to their trimmed selves, outsiders reject) · the emailField "
        "trim/lowercase contract (login + signup, the one-seam parity) · the PUT "
        "three-state round-trip (absent stays ABSENT, null clears, a value trims) · the "
        "required-name quadrant (null/empty/whitespace reject with the route's exact "
        "message) · the contacts legacy priority mapping (hot/warm/cold → "
        "Key/Standard/At Risk)) + the rate-limit window half (P-n…P-q over the "
        "injectable clock — the fixed-window reset crossing (blocked at t₀ → still "
        "blocked one ms before → allowed with a FRESH count AT t₀+window) · the "
        "retryAfterSec formula (the exact ceiling ceil((resetAt − now)/1000), floor 1) "
        "· the remaining monotonicity (allowed calls decrement exactly once; blocked "
        "calls never transition back) · the first-call + default-clock equivalence); "
        "RED at birth: P-n + P-o + the three rate-limit clock-seam examples (the 4th "
        "argument ignored at runtime — the injected clock had no effect, the crossing "
        "never observed); the Zod family + P-p/P-q born-green freeze pins] + the "
        "clock-seam example battery [tests/rate-limit.test.ts +3: the crossing example "
        "· the retryAfter ceiling · the default-form equivalence + the additive "
        "signature source pin]; FOUR live-caught calibration catches at RED birth (the "
        "L-172c3 doctrine live again): the P-k trimmed-output contract (the generator's "
        "raw value may carry its own whitespace — assert against the TRIMMED form) · "
        "the fc.date NaN edge (an INVALID Date hands toISOString() a throw before the "
        "schema ever sees the input — the integer-timestamp generator is deterministic "
        "and always in-range) · the stateful-seam key collision (fc's short-string "
        "generator COLLIDES within 150 runs — the module-level bucket map persists "
        "across runs; the per-run monotonic run id is the cure: uniqueness is a "
        "property of the RUN, not of the generated input) · the P-p/P-q born-green "
        "ledger (the collision was their only RED face); the count ladder 2697 → 2712 "
        "(+15: property +12 + rate-limit +3) · SUITES 137 HELD (the family grows in "
        "place — the ADR-017 one-suite doctrine) · E2E 192 HELD (the round is "
        "seam-only, no visual surface touched) · badge 2889 → 2904 — every live-tense "
        "site re-anchored atomically (count-ladder-173.py, assert-first, idempotent, "
        "unique-anchor — the re-run a verified 0-flip no-op) + the SKILL v1.170.0 "
        "frontmatter + H1 lockstep + this s173 head layer [the s172 layer "
        "comment-demoted at its ship counts] + the collateral re-anchors (the N-67b "
        "signature pin [the additive now = Date.now() form] · the dialog-geometry "
        "CLAUDE lockstep carriers [2697 → 2712, the retired forms joining the "
        "negatives ladder] · the inventory-census [property.test.ts 316 → 723 · "
        "rate-limit.ts 126 → 133 — the §11 rows live-censused] · the docs-counts "
        "constants + the lineage comment); the docs leg (the AGENTS Session-173 "
        "section · the PAD ADR-018 [the injectable-clock doctrine] + the session-173 "
        "inventory row + the two §11 re-anchors · the CLAUDE property-pyramid "
        "extension + the rate-limit seam mention · the README Tested row's s173 "
        "mentions) + beneath it 2697 unit checks + 192 e2e checks green; the "
        "session-172 layer (THE DIALOG-SURFACE NAMED-CONTROL CLOSURE + THE "
        "FAST-CHECK PROPERTY FAMILY — the post-171 audit round)"
    )

    # 4) replace: the demoted block + the new live layer where the live line sat
    text2 = text[:start] + demoted_block + S173_LAYER + text[end:]

    # 5) the version bump + H1 lockstep
    text2 = text2.replace("version: 1.169.0", "version: 1.170.0", 1)
    text2 = text2.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.169.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.170.0)",
        1,
    )

    SKILL.write_text(text2, encoding="utf8")
    print("  flipped [SKILL head] the s173 layer live · the s172 layer demoted (ship counts)")
    print("  flipped [SKILL version] 1.169.0 -> 1.170.0 + the H1 lockstep")
