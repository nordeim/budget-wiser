#!/usr/bin/env python3
"""skill-head-fix-171.py — the corrective re-seat: the demoted s170 layer
gets its OWN comment wrapper (the house per-layer form), not a rider
inside the s141 block. Idempotent."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

WRONG = "project_state: 2644 unit checks + 161 e2e checks green; the session-170 layer (THE ERROR-BOUNDARY FAMILY"
LIVE = "project_state: 2668 unit checks + 186 e2e checks green; the session-171 layer ("
WRAPPER = (
    "<!-- retired session-170 layer (comment-demoted at session-171 — the house\n"
    "     single-key form; the s141/s143/s165/s166/s167/s168/s169 layers sit demoted above it):\n"
    "\n"
)

if WRAPPER + WRONG in text:
    print("  no-op  [SKILL head fix] the s170 wrapper already seated")
else:
    assert text.count(WRONG) == 1, f"the demoted s170 line found {text.count(WRONG)} times"
    assert text.count(LIVE) == 1, "the live s171 line not found"

    # 1) remove the mis-seated demoted line from the s141 block (it sits
    #    directly before the first `-->` closer)
    line_start = text.index(WRONG)
    line_end = text.index("\n", line_start)
    demoted_line = text[line_start:line_end]
    text2 = text[:line_start] + text[line_end + 1:]

    # 2) wrap + re-seat it immediately BEFORE the live s171 line
    live_start = text2.index(LIVE)
    insertion = WRAPPER + demoted_line + "\n-->\n\n"
    text2 = text2[:live_start] + insertion + text2[live_start:]
    SKILL.write_text(text2, encoding="utf8")
    print("  flipped [SKILL head fix] the s170 layer re-seated in its own wrapper")

print("skill-head-fix-171: done")
