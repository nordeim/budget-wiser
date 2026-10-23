#!/usr/bin/env python3
"""skill-head-fix-170.py — the corrective head surgery.

The first pass (skill-head-170.py) landed the live line in the wrong
position (between the s141 and s143 demoted blocks) and demoted the
s169 layer into the s141 block. The house form: the demoted layers
accumulate in order (s141…s169), the LIVE line sits last — right
before the frontmatter's closing `---`.

This script restores that form:
  1. pull the s169 line OUT of the s141 block,
  2. pull the s170 live line OUT of its wrong position,
  3. re-seat the s169 layer as its OWN demoted block (era count 2559 —
     the historical layer carries its ship-state number) after the
     s168 block,
  4. land the s170 live line (count 2638) right before `---`.
Idempotent: a re-run is a verified no-op.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S169_IN_S141 = "\nproject_state: 2638 unit checks + 161 e2e checks green; the session-169 layer (THE CLAUDE-DOCTRINE CLOSURE"
S170_LIVE = "project_state: 2638 unit checks + 161 e2e checks green; the session-170 layer (THE ERROR-BOUNDARY FAMILY"
S168_CLOSER = "single-key form; the s141/s143/s165/s166/s167 layers sit demoted above it):"

if text.count(S170_LIVE) == 1 and S169_IN_S141 not in text:
    print("  no-op  [SKILL head] already in the corrective form")
    raise SystemExit(0)

# 1) the s169 line out of the s141 block
assert text.count(S169_IN_S141) == 1, "the misplaced s169 line not found"
s169_start = text.index(S169_IN_S141)
s169_end = text.index("\n", s169_start + 1)
s169_line = text[s169_start:s169_end]  # includes the leading \n
text = text[:s169_start] + text[s169_end:]

# 2) the s170 live line out of its wrong position (it directly follows
#    the s141 block's closer + blank line)
assert text.count(S170_LIVE) == 1, "the s170 live line not found"
s170_start = text.index(S170_LIVE)
s170_end = text.index("\n", s170_start)
s170_line = text[s170_start:s170_end]
text = text[:s170_start] + text[s170_end + 1:]  # drop the line + its newline

# 3) re-seat: the s169 demoted block AFTER the s168 block's closer
assert text.count(S168_CLOSER) == 1, "the s168 demoted block not found"
s168_close_end = text.index("\n-->", text.index(S168_CLOSER)) + len("\n-->")
demoted_block = (
    "\n\n<!-- retired session-169 layer (comment-demoted at session-170 — the house\n"
    "     single-key form; the s141/s143/s165/s166/s167/s168 layers sit demoted above it):\n"
    + s169_line.replace(
        "project_state: 2638 unit checks",
        "project_state: 2559 unit checks",  # the era count — the historical layer's ship state
    )
    + "\n-->"
)
text = text[:s168_close_end] + demoted_block + text[s168_close_end:]

# 4) the s170 live line right before the frontmatter's closing `---`
fm_close = text.index("\n---\n", text.index("last_updated:"))
text = text[:fm_close] + "\n\n" + s170_line + text[fm_close:]

SKILL.write_text(text, encoding="utf8")
print("  flipped [SKILL head] the corrective form: s141 block restored · the s169 block seated after s168 · the s170 live line before ---")
print("skill-head-fix-170: done")
