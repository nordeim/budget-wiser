#!/usr/bin/env python3
"""count-ladder-179.py — the session-179 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY the expected old form before the flip; a site
already carrying the new form is a verified no-op; a site carrying
NEITHER is a hard error (the anchor drifted — re-derive, never guess).

The counts this round: UNIT 2740 -> 2744 (+4 — THE REPORTS PILL-TAB FOCUS-STATE FOCUS +
SETTINGS SEGMENTED-ACTIVE WALK [walk52 — the s179 battery in tests/page-layout.test.ts — the born-green the session-179 battery in
tests/page-layout.test.ts, all five the born-green contract-freeze form
over the zero-defect decode, the s173 P-p/P-q precedent [the search
focus contract — the 1px keyboard-only ring + no ring-offset · the
search aria-label superset · the segmented active contract — the s125
bg-white literal + the s129 retired offset re-verified · the roving
tabindex superset · the walk51 standing-script existence freeze]) ·
SUITES 138 HELD (all five pins land in the existing page-layout suite —
the ADR-017 one-suite doctrine) · E2E 192 HELD (the round is test-only —
no product code touched; the standing 192 + the e2e topbar-search
battery carry the surfaces' behavioral faces) · badge 2932 -> 2936.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2740", "2744"
BADGE_OLD, BADGE_NEW = "2932", "2936"

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
    "const UNIT = 2740;",
    "const UNIT = 2744;",
    1,
    "docs-counts UNIT constant",
)


def insert_session_comment() -> None:
    """Insert the s178 lineage comment above the UNIT constant (idempotent)."""
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")

    unit_marker = "// Session-178: 2740 -> 2744 (+5 — THE TOPBAR SEARCH FOCUS"
    if unit_marker not in text:
        anchor = "const UNIT = 2744;"
        assert text.count(anchor) == 1, "the UNIT constant anchor must be unique"
        comment = (
            "// Session-178: 2740 -> 2744 (+5 — THE TOPBAR SEARCH FOCUS +\n"
            "// SETTINGS SEGMENTED-ACTIVE WALK [walk52 — the s179 battery in tests/page-layout.test.ts — the born-green the session-179 battery\n"
            "// in tests/page-layout.test.ts, all five the born-green contract-\n"
            "// freeze form over the zero-defect decode, the s173 P-p/P-q\n"
            "// precedent [the search focus contract — the 1px keyboard-only ring\n"
            "// + no ring-offset · the search aria-label superset · the segmented\n"
            "// active contract — the s125 bg-white literal + the s129 retired\n"
            "// offset re-verified · the roving tabindex superset · the walk51\n"
            "// standing-script existence freeze]). SUITES 138 HELD (the one-suite\n"
            "// doctrine) · E2E 192 HELD (the round is test-only — no product code\n"
            "// touched).\n"
        )
        text = text.replace(anchor, comment + anchor)
        p.write_text(text, encoding="utf8")
        print("  insert [docs-counts UNIT lineage comment]")
    else:
        print("  no-op  [docs-counts UNIT lineage comment] already present")


insert_session_comment()

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# the live carriers flip; the retired 2740 forms join the negatives ladder
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("Unit (Vitest, 2740 checks)");',
    'expect(claude).not.toContain("Unit (Vitest, 2740 checks)");\n'
    '    expect(claude).toContain("Unit (Vitest, 2744 checks)");',
    1,
    "dialog-geometry CLAUDE pyramid carrier",
)
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("(currently 2740)");',
    'expect(claude).not.toContain("(currently 2740)");\n'
    '    expect(claude).toContain("(currently 2744)");',
    1,
    "dialog-geometry CLAUDE coverage carrier",
)
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("Vitest unit suites (2740 checks)");',
    'expect(claude).not.toContain("Vitest unit suites (2740 checks)");\n'
    '    expect(claude).toContain("Vitest unit suites (2744 checks)");',
    1,
    "dialog-geometry CLAUDE commands carrier",
)
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("`bun run test` (2740)");',
    'expect(claude).not.toContain("`bun run test` (2740)");\n'
    '    expect(claude).toContain("`bun run test` (2744)");',
    1,
    "dialog-geometry CLAUDE gate-order carrier",
)

# --- README.md --------------------------------------------------------------
flip(
    "README.md",
    "tests-2932%20checks",
    "tests-2936%20checks",
    1,
    "README badge",
)
flip(
    "README.md",
    "| 🧪 Tested | 2740 Vitest unit checks",
    "| 🧪 Tested | 2744 Vitest unit checks",
    1,
    "README Tested row",
)
flip(
    "README.md",
    "# 138 Vitest suites (2740 checks)",
    "# 138 Vitest suites (2744 checks)",
    1,
    "README tree tests line",
)
flip(
    "README.md",
    "# 2740 Vitest unit checks",
    "# 2744 Vitest unit checks",
    1,
    "README commands unit line",
)

# --- AGENTS.md --------------------------------------------------------------
flip(
    "AGENTS.md",
    "Unit tests (2740 checks)",
    "Unit tests (2744 checks)",
    1,
    "AGENTS commands unit row",
)
flip(
    "AGENTS.md",
    "`bun run test` (2740) →",
    "`bun run test` (2744) →",
    1,
    "AGENTS gate-order unit",
)

# --- CLAUDE.md --------------------------------------------------------------
flip(
    "CLAUDE.md",
    "`bun run test` (2740) → `bun run build` → `bun run test:e2e` (192)",
    "`bun run test` (2744) → `bun run build` → `bun run test:e2e` (192)",
    1,
    "CLAUDE gate-order line",
)
flip(
    "CLAUDE.md",
    "Vitest unit suites (2740 checks)",
    "Vitest unit suites (2744 checks)",
    1,
    "CLAUDE commands unit row",
)
flip(
    "CLAUDE.md",
    "**Unit (Vitest, 2740 checks)**",
    "**Unit (Vitest, 2744 checks)**",
    1,
    "CLAUDE test pyramid unit",
)
flip(
    "CLAUDE.md",
    "the seam (currently 2740)",
    "the seam (currently 2744)",
    1,
    "CLAUDE coverage targets",
)

# --- Project_Architecture_Document.md ---------------------------------------
flip(
    "Project_Architecture_Document.md",
    "# 138 Vitest suites — 2740 checks",
    "# 138 Vitest suites — 2744 checks",
    1,
    "PAD tree unit line",
)
flip(
    "Project_Architecture_Document.md",
    "| **Total** | **138** | **2740 unit + 192 e2e** |",
    "| **Total** | **138** | **2744 unit + 192 e2e** |",
    1,
    "PAD §7.1 total row",
)
flip(
    "Project_Architecture_Document.md",
    "HEAD: 138 Vitest suites with 2740 checks + 192 e2e",
    "HEAD: 138 Vitest suites with 2744 checks + 192 e2e",
    1,
    "PAD §7.1 HEAD line",
)
flip(
    "Project_Architecture_Document.md",
    "`bun run test` — 2740/2740",
    "`bun run test` — 2744/2744",
    1,
    "PAD checklist unit",
)
flip(
    "Project_Architecture_Document.md",
    "| `bun run test` | root | 2740 unit checks |",
    "| `bun run test` | root | 2744 unit checks |",
    1,
    "PAD §9 commands unit",
)

# --- neo-crm_SKILL.md --------------------------------------------------------
flip(
    "neo-crm_SKILL.md",
    "bun run test         # 2740/2740",
    "bun run test         # 2744/2744",
    1,
    "SKILL commands unit",
)
flip(
    "neo-crm_SKILL.md",
    "| **unit total** | 138 files | **2740** |",
    "| **unit total** | 138 files | **2744** |",
    1,
    "SKILL Appendix B unit total",
)
flip(
    "neo-crm_SKILL.md",
    "project_state: 2740 unit checks + 192 e2e checks green;",
    "project_state: 2744 unit checks + 192 e2e checks green;",
    1,
    "SKILL head project_state",
)

print(f"\ncount-ladder-179: {flips} flip(s) applied; all sites verified unique-anchor.")
