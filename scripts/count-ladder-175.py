#!/usr/bin/env python3
"""count-ladder-175.py — the session-175 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY the expected old form before the flip; a site
already carrying the new form is a verified no-op; a site carrying
NEITHER is a hard error (the anchor drifted — re-derive, never guess).

The counts this round: UNIT 2717 -> 2726 (+9 — the response-side
wire-contract family: the property family grows in place [P-r the entity
wire round-trip ×2 + P-s the envelope pair contract ×2 — the ADR-017
one-suite doctrine] + the crud-zod-seam READ-half source pins [+5: the
include-select sets · the orderBy contracts · the envelope-read pairs ·
the opportunities raw-row contract · the me-route SessionUser carrier]) ·
SUITES 138 HELD (no new file) · E2E 192 HELD (the round is test-only; no
product code, no visual surface touched) · badge 2909 -> 2918.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2717", "2726"
BADGE_OLD, BADGE_NEW = "2909", "2918"

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
    "const UNIT = 2717;",
    "const UNIT = 2726;",
    1,
    "docs-counts UNIT constant",
)


def insert_session_comment() -> None:
    """Insert the s175 lineage comment above the UNIT constant (idempotent)."""
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")

    unit_marker = "// Session-175: 2717 -> 2726 (+9 — the response-side"
    if unit_marker not in text:
        anchor = "const UNIT = 2726;"
        assert text.count(anchor) == 1, "the UNIT constant anchor must be unique"
        comment = (
            "// Session-175: 2717 -> 2726 (+9 — the response-side wire-contract\n"
            "// family: the property battery grows in place [P-r the entity wire\n"
            "// round-trip + P-s the envelope pair contract — the ADR-017\n"
            "// one-suite doctrine] + the crud-zod-seam READ-half source pins\n"
            "// [the include select sets · the orderBy contracts · the envelope\n"
            "// read pairs · the opportunities raw-row contract · the me-route\n"
            "// SessionUser carrier]). SUITES 138 HELD · E2E 192 HELD.\n"
        )
        text = text.replace(anchor, comment + anchor)
        p.write_text(text, encoding="utf8")
        print("  insert [docs-counts UNIT lineage comment] the s175 line")
    else:
        print("  no-op  [docs-counts UNIT lineage comment] already present")


insert_session_comment()

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# the live carriers flip; the retired 2717 forms join the negatives ladder
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("Unit (Vitest, 2717 checks)");',
    'expect(claude).not.toContain("Unit (Vitest, 2717 checks)");\n'
    '    expect(claude).toContain("Unit (Vitest, 2726 checks)");',
    1,
    "dialog-geometry CLAUDE pyramid carrier",
)
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("(currently 2717)");',
    'expect(claude).not.toContain("(currently 2717)");\n'
    '    expect(claude).toContain("(currently 2726)");',
    1,
    "dialog-geometry CLAUDE coverage carrier",
)
flip(
    "tests/dialog-geometry-parity.test.ts",
    'expect(claude).toContain("Vitest unit suites (2717 checks)");',
    'expect(claude).not.toContain("Vitest unit suites (2717 checks)");\n'
    '    expect(claude).toContain("Vitest unit suites (2726 checks)");',
    1,
    "dialog-geometry CLAUDE commands carrier",
)

# --- README.md --------------------------------------------------------------
flip(
    "README.md",
    "tests-2909%20checks",
    "tests-2918%20checks",
    1,
    "README badge",
)
flip(
    "README.md",
    "| 🧪 Tested | 2717 Vitest unit checks",
    "| 🧪 Tested | 2726 Vitest unit checks",
    1,
    "README Tested row",
)
flip(
    "README.md",
    "# 138 Vitest suites (2717 checks)",
    "# 138 Vitest suites (2726 checks)",
    1,
    "README tree tests line",
)
flip(
    "README.md",
    "# 2717 Vitest unit checks",
    "# 2726 Vitest unit checks",
    1,
    "README commands unit line",
)

# --- AGENTS.md --------------------------------------------------------------
flip(
    "AGENTS.md",
    "Unit tests (2717 checks)",
    "Unit tests (2726 checks)",
    1,
    "AGENTS commands unit row",
)
flip(
    "AGENTS.md",
    "`bun run test` (2717) →",
    "`bun run test` (2726) →",
    1,
    "AGENTS gate-order unit",
)

# --- CLAUDE.md --------------------------------------------------------------
flip(
    "CLAUDE.md",
    "`bun run test` (2717) → `bun run build` → `bun run test:e2e` (192)",
    "`bun run test` (2726) → `bun run build` → `bun run test:e2e` (192)",
    1,
    "CLAUDE gate-order line",
)
flip(
    "CLAUDE.md",
    "Vitest unit suites (2717 checks)",
    "Vitest unit suites (2726 checks)",
    1,
    "CLAUDE commands unit row",
)
flip(
    "CLAUDE.md",
    "**Unit (Vitest, 2717 checks)**",
    "**Unit (Vitest, 2726 checks)**",
    1,
    "CLAUDE test pyramid unit",
)
flip(
    "CLAUDE.md",
    "the seam (currently 2717)",
    "the seam (currently 2726)",
    1,
    "CLAUDE coverage targets",
)

# --- Project_Architecture_Document.md ---------------------------------------
flip(
    "Project_Architecture_Document.md",
    "# 138 Vitest suites — 2717 checks",
    "# 138 Vitest suites — 2726 checks",
    1,
    "PAD tree unit line",
)
flip(
    "Project_Architecture_Document.md",
    "| **Total** | **138** | **2717 unit + 192 e2e** |",
    "| **Total** | **138** | **2726 unit + 192 e2e** |",
    1,
    "PAD §7.1 total row",
)
flip(
    "Project_Architecture_Document.md",
    "HEAD: 138 Vitest suites with 2717 checks + 192 e2e",
    "HEAD: 138 Vitest suites with 2726 checks + 192 e2e",
    1,
    "PAD §7.1 HEAD line",
)
flip(
    "Project_Architecture_Document.md",
    "`bun run test` — 2717/2717",
    "`bun run test` — 2726/2726",
    1,
    "PAD checklist unit",
)
flip(
    "Project_Architecture_Document.md",
    "| `bun run test` | root | 2717 unit checks |",
    "| `bun run test` | root | 2726 unit checks |",
    1,
    "PAD §9 commands unit",
)

# --- neo-crm_SKILL.md --------------------------------------------------------
flip(
    "neo-crm_SKILL.md",
    "bun run test         # 2717/2717",
    "bun run test         # 2726/2726",
    1,
    "SKILL commands unit",
)
flip(
    "neo-crm_SKILL.md",
    "| **unit total** | 138 files | **2717** |",
    "| **unit total** | 138 files | **2726** |",
    1,
    "SKILL Appendix B unit total",
)

print(f"\ncount-ladder-175: {flips} flip(s) applied; all sites verified unique-anchor.")
