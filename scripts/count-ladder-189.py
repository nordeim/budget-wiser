#!/usr/bin/env python3
"""count-ladder-189.py — the session-189 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2778 -> 2781 (+3 — the walk62 battery in
tests/page-layout.test.ts [the walk62 decode freeze — the two-arm OPEN
ledger at both axes + the REAL Tab/ArrowDown drives + the native-prompt
save flow + the month-flip round-trips · the Saved-Views select
call-site construction freeze (the genuine battery gap: the s29 pins
hold the toolbar row + the savedViewsSelect width class, never the
SelectTrigger call-site's own chain) · the calendar month-nav
call-site construction freeze (the genuine gap: the s16 pins hold the
navRow container + the s27 pins the day cells, never the three Button
call-sites)]). SUITES 138 HELD · E2E 192 — re-verified this session
(the round: ZERO product-code touches — the s134/s188-precedent
zero-fix freeze-pin round; the MODULE line count 1718 HELD) · badge
2970 -> 2973.

The +3 arithmetic verified directly at the full-suite count on the
first pass this round (2781 — no intermediate form existed; the s187/
s188 first-pass undercount lesson held by construction: the battery
was +3 from the plan onward).

The HEAD surgery (skill-head-189.py) ran FIRST — the SKILL head's live
layer already carries 2781, so this ladder has NO head flip (the s188
lesson: a ladder old-form must NEVER match a retired block's ship
line — the demoted s188 block keeps `project_state: 2778 … the
session-188 layer` in its comment block, and that form is absent from
the accepted old-forms below by design).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

flips = 0


def flip(path: str, olds: list[str], new: str, count: int = 1, label: str = "") -> None:
    """Flip a site carrying one of the accepted old forms to the new form."""
    global flips
    p = ROOT / path
    text = p.read_text(encoding="utf8")
    if text.count(new) >= count and sum(text.count(o) for o in olds) == 0:
        print(f"  no-op  [{label or path}] already {new!r}")
        return
    for old in olds:
        found = text.count(old)
        if found == count:
            p.write_text(text.replace(old, new), encoding="utf8")
            flips += 1
            print(f"  flip   [{label or path}] {old!r} -> {new!r} ({count} site(s))")
            return
    raise SystemExit(f"ANCHOR ERROR [{label or path}]: no accepted old form found for {new!r}")


# --- README.md ---------------------------------------------------------------
flip("README.md", ["tests-2970%20checks"], "tests-2973%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2778 Vitest unit checks"], "| 🧪 Tested | 2781 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2778 checks)"], "# 138 Vitest suites (2781 checks)", 1, "README tree tests line")
flip("README.md", ["# 2778 Vitest unit checks"], "# 2781 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md ---------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2778 checks)"], "Unit tests (2781 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2778) →"], "`bun run test` (2781) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md ---------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2778) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2781) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2778 checks)"], "Vitest unit suites (2781 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2778 checks)**"], "**Unit (Vitest, 2781 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2778)"], "the seam (currently 2781)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ----------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2778 checks"], "# 138 Vitest suites — 2781 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2778 unit + 192 e2e** | | |"], "| **Total** | **138** | **2781 unit + 192 e2e** | | |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2778 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2781 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2778/2778"], "`bun run test` — 2781/2781", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2778 unit checks |"], "| `bun run test` | root | 2781 unit checks |", 1, "PAD §9 commands unit")

# --- neo-crm_SKILL.md — the count sites (the head project_state is NOT
# here: the head surgery already wrote the 2781 live layer, and the
# demoted s188 block's ship line must never match an old form) --------------
flip("neo-crm_SKILL.md", ["bun run test         # 2778/2778"], "bun run test         # 2781/2781", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2778** |"], "| **unit total** | 138 files | **2781** |", 1, "SKILL Appendix B unit total")

# --- neo-crm_SKILL.md — the §5.6 census collateral ---------------------------
flip(
    "neo-crm_SKILL.md",
    ["`tests/page-layout.test.ts`, 252 checks —"],
    "`tests/page-layout.test.ts`, 255 checks —",
    1,
    "SKILL §5.6 census checks",
)
flip(
    "neo-crm_SKILL.md",
    ["the s188 census: the module untouched by the walk61 round [the zero-fix round — page-layout.ts test-only, the line count 1718 HELD];"],
    "the s189 census: the module untouched by the walk62 round [the zero-fix round — page-layout.ts test-only, the line count 1718 HELD];",
    1,
    "SKILL §5.6 census era",
)
flip(
    "neo-crm_SKILL.md",
    ["the s187 census re-anchored by the 4 walk61 pins)."],
    "the s188 census re-anchored by the 3 walk62 pins).",
    1,
    "SKILL §5.6 census re-anchor",
)
flip(
    "neo-crm_SKILL.md",
    ["**RED-first:** 16 failed | 252 passed (268) at the still-unfixed src"],
    "**RED-first:** 16 failed | 255 passed (271) at the still-unfixed src",
    1,
    "SKILL the s188-era live-tense RED-first arithmetic site",
)

print(f"\ncount-ladder-189: {flips} flip(s) — the docs land on 2781/2973")
