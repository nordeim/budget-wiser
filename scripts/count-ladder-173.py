#!/usr/bin/env python3
"""count-ladder-173.py — the session-173 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY the expected old form before the flip; a site
already carrying the new form is a verified no-op; a site carrying
NEITHER is a hard error (the anchor drifted — re-derive, never guess).

The counts this round: UNIT 2697 -> 2712 (+15: the property battery
+12 [P-h…P-q — the Zod round-trip family + the rate-limit window
arithmetic] + the rate-limit clock-seam examples +3) · SUITES 137 HELD
(the family grows in place — the ADR-017 one-suite doctrine) · E2E 192
HELD (the round is seam-only; no visual surface touched) · badge
2889 -> 2904.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2697", "2712"
BADGE_OLD, BADGE_NEW = "2889", "2904"

flips = 0


def flip(path: str, old: str, new: str, count: int = 1, label: str = "") -> None:
    global flips
    p = ROOT / path
    text = p.read_text(encoding="utf8")
    if text.count(new) == count and text.count(old) == 0:
        print(f"  no-op  [{label or path}] already {new!r}")
        return
    found = text.count(old)
    assert found == count, (
        f"[{label or path}] expected {count} occurrence(s) of {old!r}, found {found}"
    )
    if old == new:
        return
    p.write_text(text.replace(old, new), encoding="utf8")
    flips += 1
    print(f"  flip   [{label or path}] {old!r} -> {new!r} ({count} site(s))")


# --- tests/docs-counts.test.ts — the constants -----------------------------
flip(
    "tests/docs-counts.test.ts",
    "const UNIT = 2697;",
    "const UNIT = 2712;",
    1,
    "docs-counts UNIT constant",
)


def insert_session_comment() -> None:
    """Insert the s173 lineage comment above the UNIT constant (idempotent)."""
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")
    marker = "// Session-173: 2697 -> 2712 (+15"
    if marker in text:
        print("  no-op  [docs-counts UNIT lineage comment] already present")
        return
    anchor = "const UNIT = 2712;"
    assert text.count(anchor) == 1, "the UNIT constant anchor must be unique"
    comment = (
        "// Session-173: 2697 -> 2712 (+15 — the deeper property family: the\n"
        "// property battery +12 [P-h…P-q — the Zod round-trip family + the\n"
        "// rate-limit window arithmetic over the injectable clock] + the\n"
        "// rate-limit clock-seam examples +3).\n"
    )
    text = text.replace(anchor, comment + anchor)
    p.write_text(text, encoding="utf8")
    print("  insert [docs-counts UNIT lineage comment] the s173 line")


insert_session_comment()

# --- README.md --------------------------------------------------------------
flip(
    "README.md",
    "tests-2889%20checks",
    "tests-2904%20checks",
    1,
    "README badge",
)
flip(
    "README.md",
    "| 🧪 Tested | 2697 Vitest unit checks",
    "| 🧪 Tested | 2712 Vitest unit checks",
    1,
    "README Tested row",
)
flip(
    "README.md",
    "# 137 Vitest suites (2697 checks)",
    "# 137 Vitest suites (2712 checks)",
    1,
    "README tree tests line",
)
flip(
    "README.md",
    "# 2697 Vitest unit checks",
    "# 2712 Vitest unit checks",
    1,
    "README commands unit line",
)

# --- AGENTS.md --------------------------------------------------------------
flip(
    "AGENTS.md",
    "Unit tests (2697 checks)",
    "Unit tests (2712 checks)",
    1,
    "AGENTS commands unit row",
)
flip(
    "AGENTS.md",
    "`bun run test` (2697) →",
    "`bun run test` (2712) →",
    1,
    "AGENTS gate-order unit",
)

# --- CLAUDE.md --------------------------------------------------------------
flip(
    "CLAUDE.md",
    "`bun run test` (2697) → `bun run build` → `bun run test:e2e` (192)",
    "`bun run test` (2712) → `bun run build` → `bun run test:e2e` (192)",
    1,
    "CLAUDE gate-order line",
)
flip(
    "CLAUDE.md",
    "Vitest unit suites (2697 checks)",
    "Vitest unit suites (2712 checks)",
    1,
    "CLAUDE commands unit row",
)
flip(
    "CLAUDE.md",
    "**Unit (Vitest, 2697 checks)**",
    "**Unit (Vitest, 2712 checks)**",
    1,
    "CLAUDE test pyramid unit",
)
flip(
    "CLAUDE.md",
    "the seam (currently 2697)",
    "the seam (currently 2712)",
    1,
    "CLAUDE coverage targets",
)

# --- Project_Architecture_Document.md ---------------------------------------
flip(
    "Project_Architecture_Document.md",
    "# 137 Vitest suites — 2697 checks",
    "# 137 Vitest suites — 2712 checks",
    1,
    "PAD tree unit line",
)
flip(
    "Project_Architecture_Document.md",
    "| **Total** | **137** | **2697 unit + 192 e2e** |",
    "| **Total** | **137** | **2712 unit + 192 e2e** |",
    1,
    "PAD §7.1 total row",
)
flip(
    "Project_Architecture_Document.md",
    "HEAD: 137 Vitest suites with 2697 checks + 192 e2e",
    "HEAD: 137 Vitest suites with 2712 checks + 192 e2e",
    1,
    "PAD §7.1 HEAD line",
)
flip(
    "Project_Architecture_Document.md",
    "`bun run test` — 2697/2697",
    "`bun run test` — 2712/2712",
    1,
    "PAD checklist unit",
)
flip(
    "Project_Architecture_Document.md",
    "| `bun run test` | root | 2697 unit checks |",
    "| `bun run test` | root | 2712 unit checks |",
    1,
    "PAD §9 commands unit",
)

# --- neo-crm_SKILL.md --------------------------------------------------------
flip(
    "neo-crm_SKILL.md",
    "bun run test         # 2697/2697",
    "bun run test         # 2712/2712",
    1,
    "SKILL commands unit",
)
flip(
    "neo-crm_SKILL.md",
    "| **unit total** | 137 files | **2697** |",
    "| **unit total** | 137 files | **2712** |",
    1,
    "SKILL Appendix B unit total",
)

print(f"\ncount-ladder-173: {flips} flip(s) applied; all sites verified unique-anchor.")
