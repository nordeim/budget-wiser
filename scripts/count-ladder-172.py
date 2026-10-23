#!/usr/bin/env python3
"""count-ladder-172.py — the session-172 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY the expected old form before the flip; a site
already carrying the new form is a verified no-op; a site carrying
NEITHER is a hard error (the anchor drifted — re-derive, never guess).

The counts this round: UNIT 2668 -> 2697 (+29: dialog-controls +14 +
property +13 + inventory-census +2 [the two new §11 rows — the L-166c3
lesson live again]) · SUITES 135 -> 137 · E2E 186 -> 192 (+6: the
dialog-open two-gate scans) · badge 2854 -> 2889.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2668", "2697"
SUITES_OLD, SUITES_NEW = "135", "137"
E2E_OLD, E2E_NEW = "186", "192"
BADGE_OLD, BADGE_NEW = "2854", "2889"

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
    "const E2E = 186;",
    "const E2E = 192;",
    1,
    "docs-counts E2E constant",
)
flip(
    "tests/docs-counts.test.ts",
    "const SUITES = 135;",
    "const SUITES = 137;",
    1,
    "docs-counts SUITES constant",
)
flip(
    "tests/docs-counts.test.ts",
    "const UNIT = 2668;",
    "const UNIT = 2697;",
    1,
    "docs-counts UNIT constant",
)

# --- README.md --------------------------------------------------------------
flip(
    "README.md",
    "tests-2854%20checks",
    "tests-2889%20checks",
    1,
    "README badge",
)
flip(
    "README.md",
    "135 Vitest suites (2668 checks)",
    "137 Vitest suites (2697 checks)",
    1,
    "README tree tests line",
)
flip(
    "README.md",
    "Playwright (186 checks)",
    "Playwright (192 checks)",
    1,
    "README tree e2e line",
)
flip(
    "README.md",
    "# 186 Playwright checks",
    "# 192 Playwright checks",
    1,
    "README commands e2e line",
)

# --- AGENTS.md --------------------------------------------------------------
flip(
    "AGENTS.md",
    "Unit tests (2668 checks)",
    "Unit tests (2697 checks)",
    1,
    "AGENTS commands unit row",
)
flip(
    "AGENTS.md",
    "Browser E2E (186 checks)",
    "Browser E2E (192 checks)",
    1,
    "AGENTS commands e2e row",
)
flip(
    "AGENTS.md",
    "`bun run test` (2668) →",
    "`bun run test` (2697) →",
    1,
    "AGENTS gate-order unit",
)
flip(
    "AGENTS.md",
    "`bun run test:e2e` (186) —",
    "`bun run test:e2e` (192) —",
    1,
    "AGENTS gate-order e2e",
)

# --- CLAUDE.md --------------------------------------------------------------
flip(
    "CLAUDE.md",
    "`bun run test` (2668) → `bun run build` → `bun run test:e2e` (186)",
    "`bun run test` (2697) → `bun run build` → `bun run test:e2e` (192)",
    1,
    "CLAUDE gate-order line",
)
flip(
    "CLAUDE.md",
    "Vitest unit suites (2668 checks)",
    "Vitest unit suites (2697 checks)",
    1,
    "CLAUDE commands unit row",
)
flip(
    "CLAUDE.md",
    "Playwright E2E (186 checks, needs build first)",
    "Playwright E2E (192 checks, needs build first)",
    1,
    "CLAUDE commands e2e row",
)
flip(
    "CLAUDE.md",
    "**Unit (Vitest, 2668 checks)**",
    "**Unit (Vitest, 2697 checks)**",
    1,
    "CLAUDE test pyramid unit",
)
flip(
    "CLAUDE.md",
    "**E2E (Playwright, 186 checks)**",
    "**E2E (Playwright, 192 checks)**",
    1,
    "CLAUDE test pyramid e2e",
)
flip(
    "CLAUDE.md",
    "the seam (currently 2668)",
    "the seam (currently 2697)",
    1,
    "CLAUDE coverage targets",
)

# --- Project_Architecture_Document.md ---------------------------------------
flip(
    "Project_Architecture_Document.md",
    "# 135 Vitest suites — 2668 checks",
    "# 137 Vitest suites — 2697 checks",
    1,
    "PAD tree unit line",
)
flip(
    "Project_Architecture_Document.md",
    "setup project — 186 checks",
    "setup project — 192 checks",
    1,
    "PAD tree e2e line",
)
flip(
    "Project_Architecture_Document.md",
    "| **Total** | **135** | **2668 unit + 186 e2e** |",
    "| **Total** | **137** | **2697 unit + 192 e2e** |",
    1,
    "PAD §10 total row",
)
flip(
    "Project_Architecture_Document.md",
    "HEAD: 135 Vitest suites with 2668 checks + 186 e2e",
    "HEAD: 137 Vitest suites with 2697 checks + 192 e2e",
    1,
    "PAD §10 HEAD line",
)
flip(
    "Project_Architecture_Document.md",
    "`bun run test` — 2668/2668",
    "`bun run test` — 2697/2697",
    1,
    "PAD checklist unit",
)
flip(
    "Project_Architecture_Document.md",
    "`bun run test:e2e` — 186/186",
    "`bun run test:e2e` — 192/192",
    1,
    "PAD checklist e2e",
)
flip(
    "Project_Architecture_Document.md",
    "| `bun run test` | root | 2668 unit checks |",
    "| `bun run test` | root | 2697 unit checks |",
    1,
    "PAD §9 commands unit",
)
flip(
    "Project_Architecture_Document.md",
    "| `bun run test:e2e` | root | 186 browser checks",
    "| `bun run test:e2e` | root | 192 browser checks",
    1,
    "PAD §9 commands e2e",
)

# --- neo-crm_SKILL.md --------------------------------------------------------
flip(
    "neo-crm_SKILL.md",
    "bun run test         # 2668/2668",
    "bun run test         # 2697/2697",
    1,
    "SKILL commands unit",
)
flip(
    "neo-crm_SKILL.md",
    "bun run test:e2e     # 186/186",
    "bun run test:e2e     # 192/192",
    1,
    "SKILL commands e2e",
)
flip(
    "neo-crm_SKILL.md",
    "| **unit total** | 135 files | **2668** |",
    "| **unit total** | 137 files | **2697** |",
    1,
    "SKILL Appendix B unit total",
)
flip(
    "neo-crm_SKILL.md",
    "| **e2e total** | 11 spec files + the setup project | **186** |",
    "| **e2e total** | 11 spec files + the setup project | **192** |",
    1,
    "SKILL Appendix B e2e total",
)
flip(
    "neo-crm_SKILL.md",
    "~21 s (135 suites, one worker per file), build ~40 s, e2e ~6 m (186\nchecks",
    "~21 s (137 suites, one worker per file), build ~40 s, e2e ~6 m (192\nchecks",
    1,
    "SKILL wall-clock phrase",
)

print(f"\ncount-ladder-172: {flips} flip(s) applied; all sites verified unique-anchor.")
