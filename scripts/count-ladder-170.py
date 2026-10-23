#!/usr/bin/env python3
"""count-ladder-170.py — the session-170 count ladder.

UNIT 2559 -> 2638 (+79: doctrine-census +30 [the 131st suite] ·
chunk-recovery +12 [the 132nd] · boot-env +20 [the 133rd] ·
error-boundaries +17 [the 134th]) · SUITES 130 -> 134 · E2E 161 held ·
badge 2720 -> 2799 — every live-tense site re-anchored atomically.

Assert-first + idempotent + unique-anchor (the L-167/L-168/L-169
tooling lessons): every flip asserts its byte form exists exactly ONCE
before touching it; a re-run is a verified 0-flip no-op. Historical
session records (the Session-169 sections, the s169 inventory rows) are
NEVER touched — only live-tense carriers.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2638", "2644"
SUITES_OLD, SUITES_NEW = "130", "134"
BADGE_OLD, BADGE_NEW = "2799", "2805"

flips = 0


def flip(path: str, old: str, new: str, count: int = 1, label: str = "") -> None:
    """Replace `old` -> `new` in `path`, asserting exactly `count` occurrences.

    Idempotent: a site already carrying the new form (a re-run) is a
    verified no-op; a site carrying NEITHER form is a hard error (the
    anchor drifted — re-derive, never guess).
    """
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
    flips += count
    print(f"  flipped [{label or path}] {old!r} -> {new!r} x{count}")


# ---- README ---------------------------------------------------------------
flip("README.md", "tests-2799%20checks", "tests-2805%20checks", 1, "README badge")
flip("README.md", "2638 Vitest unit checks + 161 Playwright E2E checks",
     "2644 Vitest unit checks + 161 Playwright E2E checks", 1, "README Tested row")
flip("README.md", "# 2638 Vitest unit checks (", "# 2644 Vitest unit checks (",
     1, "README suite-list comment")

# ---- AGENTS (the live-tense Commands region only; the Session-169 tail
#      is history and stays) -------------------------------------------------
flip("AGENTS.md", "|  Unit tests (2638 checks)      | `bun run test`",
     "|  Unit tests (2644 checks)      | `bun run test`", 1, "AGENTS commands table")
flip("AGENTS.md", "`bun run test` (2638) → `bun run build`",
     "`bun run test` (2644) → `bun run build`", 1, "AGENTS gate-order")

# ---- CLAUDE ----------------------------------------------------------------
flip("CLAUDE.md", "| `bun run test`      | Vitest unit suites (2638 checks)",
     "| `bun run test`      | Vitest unit suites (2644 checks)", 1, "CLAUDE commands table")
flip("CLAUDE.md", "- **Unit (Vitest, 2638 checks)**",
     "- **Unit (Vitest, 2644 checks)**", 1, "CLAUDE test pyramid")
flip("CLAUDE.md", "the count grows with\nthe seam (currently 2559).",
     "the count grows with\nthe seam (currently 2638).", 1, "CLAUDE coverage targets")

# ---- PAD (the live-tense carriers; the s169 inventory row is history) ------
flip("Project_Architecture_Document.md",
     "│   ├── *.test.ts                # 130 Vitest suites — 2559 checks",
     "│   ├── *.test.ts                # 134 Vitest suites — 2638 checks",
     1, "PAD file tree")
flip("Project_Architecture_Document.md",
     "> HEAD: 130 Vitest suites with 2559 checks + 161 e2e checks in 10 spec",
     "> HEAD: 134 Vitest suites with 2644 checks + 161 e2e checks in 10 spec",
     1, "PAD HEAD line")

# ---- SKILL (frontmatter state + H1 + §11 gate block + Appendix B) ----------
flip("neo-crm_SKILL.md",
     "project_state: 2638 unit checks + 161 e2e checks green",
     "project_state: 2644 unit checks + 161 e2e checks green",
     1, "SKILL frontmatter state")
flip("neo-crm_SKILL.md", "version: 1.166.0", "version: 1.167.0", 1, "SKILL frontmatter version")
flip("neo-crm_SKILL.md", "# NEO CRM — Engineering Skill (SKILL.md v1.166.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.167.0)", 1, "SKILL H1 lockstep")

print(f"\ncount-ladder-170: {flips} flips applied (UNIT {UNIT_OLD}->{UNIT_NEW} · "
      f"SUITES {SUITES_OLD}->{SUITES_NEW} · badge {BADGE_OLD}->{BADGE_NEW} · E2E held)")
