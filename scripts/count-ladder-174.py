#!/usr/bin/env python3
"""count-ladder-174.py — the session-174 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY the expected old form before the flip; a site
already carrying the new form is a verified no-op; a site carrying
NEITHER is a hard error (the anchor drifted — re-derive, never guess).

The counts this round: UNIT 2712 -> 2717 (+5 — the type-gate battery
[the 138th suite]: the build-is-the-type-gate pin + the full-strict pin
+ the typed union-find pin + the single-lockfile pin + the gate-chain
freeze pin) · SUITES 137 -> 138 (the type-gate file) · E2E 192 HELD (the
round is config-only; no visual surface touched) · badge 2904 -> 2909.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2712", "2717"
SUITES_OLD, SUITES_NEW = "137", "138"
BADGE_OLD, BADGE_NEW = "2904", "2909"

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
    "const UNIT = 2712;",
    "const UNIT = 2717;",
    1,
    "docs-counts UNIT constant",
)
flip(
    "tests/docs-counts.test.ts",
    "const SUITES = 137;",
    "const SUITES = 138;",
    1,
    "docs-counts SUITES constant",
)


def insert_session_comment() -> None:
    """Insert the s174 lineage comments above the constants (idempotent)."""
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")

    unit_marker = "// Session-174: 2712 -> 2717 (+5 — the type-gate"
    if unit_marker not in text:
        anchor = "const UNIT = 2717;"
        assert text.count(anchor) == 1, "the UNIT constant anchor must be unique"
        comment = (
            "// Session-174: 2712 -> 2717 (+5 — the type-gate hardening battery\n"
            "// [the 138th suite]: the build-is-the-type-gate pin (no\n"
            "// ignoreBuildErrors) + the full-strict pin (no noImplicitAny\n"
            "// override) + the typed union-find pin + the single-lockfile pin\n"
            "// + the gate-chain freeze pin).\n"
        )
        text = text.replace(anchor, comment + anchor)
        print("  insert [docs-counts UNIT lineage comment] the s174 line")
    else:
        print("  no-op  [docs-counts UNIT lineage comment] already present")

    suites_marker = "// Session-174: SUITES 137 -> 138 (the type-gate file"
    if suites_marker not in text:
        anchor = "const SUITES = 138;"
        assert text.count(anchor) == 1, "the SUITES constant anchor must be unique"
        comment = (
            "// Session-174: SUITES 137 -> 138 (the type-gate file — the\n"
            "// config source-pin battery: the toolchain layer joins the\n"
            "// doctrine-census family).\n"
        )
        text = text.replace(anchor, comment + anchor)
        p.write_text(text, encoding="utf8")
        print("  insert [docs-counts SUITES lineage comment] the s174 line")
    else:
        print("  no-op  [docs-counts SUITES lineage comment] already present")


insert_session_comment()

# --- README.md --------------------------------------------------------------
flip(
    "README.md",
    "tests-2904%20checks",
    "tests-2909%20checks",
    1,
    "README badge",
)
flip(
    "README.md",
    "| 🧪 Tested | 2712 Vitest unit checks",
    "| 🧪 Tested | 2717 Vitest unit checks",
    1,
    "README Tested row",
)
flip(
    "README.md",
    "# 137 Vitest suites (2712 checks)",
    "# 138 Vitest suites (2717 checks)",
    1,
    "README tree tests line",
)
flip(
    "README.md",
    "# 2712 Vitest unit checks",
    "# 2717 Vitest unit checks",
    1,
    "README commands unit line",
)
flip(
    "README.md",
    "a11y-controls, dialog-controls, property)",
    "a11y-controls, dialog-controls, property, type-gate)",
    1,
    "README commands suite list (type-gate joins)",
)

# --- AGENTS.md --------------------------------------------------------------
flip(
    "AGENTS.md",
    "Unit tests (2712 checks)",
    "Unit tests (2717 checks)",
    1,
    "AGENTS commands unit row",
)
flip(
    "AGENTS.md",
    "`bun run test` (2712) →",
    "`bun run test` (2717) →",
    1,
    "AGENTS gate-order unit",
)

# --- CLAUDE.md --------------------------------------------------------------
flip(
    "CLAUDE.md",
    "`bun run test` (2712) → `bun run build` → `bun run test:e2e` (192)",
    "`bun run test` (2717) → `bun run build` → `bun run test:e2e` (192)",
    1,
    "CLAUDE gate-order line",
)
flip(
    "CLAUDE.md",
    "Vitest unit suites (2712 checks)",
    "Vitest unit suites (2717 checks)",
    1,
    "CLAUDE commands unit row",
)
flip(
    "CLAUDE.md",
    "**Unit (Vitest, 2712 checks)**",
    "**Unit (Vitest, 2717 checks)**",
    1,
    "CLAUDE test pyramid unit",
)
flip(
    "CLAUDE.md",
    "the seam (currently 2712)",
    "the seam (currently 2717)",
    1,
    "CLAUDE coverage targets",
)

# --- Project_Architecture_Document.md ---------------------------------------
flip(
    "Project_Architecture_Document.md",
    "# 137 Vitest suites — 2712 checks",
    "# 138 Vitest suites — 2717 checks",
    1,
    "PAD tree unit line",
)
flip(
    "Project_Architecture_Document.md",
    "| **Total** | **137** | **2712 unit + 192 e2e** |",
    "| **Total** | **138** | **2717 unit + 192 e2e** |",
    1,
    "PAD §7.1 total row",
)
flip(
    "Project_Architecture_Document.md",
    "HEAD: 137 Vitest suites with 2712 checks + 192 e2e",
    "HEAD: 138 Vitest suites with 2717 checks + 192 e2e",
    1,
    "PAD §7.1 HEAD line",
)
flip(
    "Project_Architecture_Document.md",
    "`bun run test` — 2712/2712",
    "`bun run test` — 2717/2717",
    1,
    "PAD checklist unit",
)
flip(
    "Project_Architecture_Document.md",
    "| `bun run test` | root | 2712 unit checks |",
    "| `bun run test` | root | 2717 unit checks |",
    1,
    "PAD §9 commands unit",
)

# --- neo-crm_SKILL.md --------------------------------------------------------
flip(
    "neo-crm_SKILL.md",
    "bun run test         # 2712/2712",
    "bun run test         # 2717/2717",
    1,
    "SKILL commands unit",
)
flip(
    "neo-crm_SKILL.md",
    "| **unit total** | 137 files | **2712** |",
    "| **unit total** | 138 files | **2717** |",
    1,
    "SKILL Appendix B unit total",
)
flip(
    "neo-crm_SKILL.md",
    "~21 s (137 suites, one worker per file)",
    "~21 s (138 suites, one worker per file)",
    1,
    "SKILL Appendix B suites prose",
)

print(f"\ncount-ladder-174: {flips} flip(s) applied; all sites verified unique-anchor.")
