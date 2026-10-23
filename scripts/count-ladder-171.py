#!/usr/bin/env python3
"""count-ladder-171.py — the session-171 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY the expected old form before the flip; a site
already carrying the new form is a verified no-op; a site carrying
NEITHER is a hard error (the anchor drifted — re-derive, never guess).

The counts this round: UNIT 2644 -> 2668 (+24: a11y-controls +22 +
inventory-census +2) · SUITES 134 -> 135 · E2E 161 -> 186 (+25: the
a11y two-gate spec) · badge 2805 -> 2854.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2644", "2668"
SUITES_OLD, SUITES_NEW = "134", "135"
E2E_OLD, E2E_NEW = "161", "186"
BADGE_OLD, BADGE_NEW = "2805", "2854"
SPEC_OLD, SPEC_NEW = "10 spec", "11 spec"

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
    flips += count
    print(f"  flipped [{label or path}] {old!r} -> {new!r} x{count}")


# ---- README ---------------------------------------------------------------
flip("README.md", "tests-2805%20checks", "tests-2854%20checks", 1, "README badge")
flip("README.md", "2644 Vitest unit checks + 161 Playwright E2E checks",
     "2668 Vitest unit checks + 186 Playwright E2E checks", 1, "README Tested row")
flip("README.md", "# 134 Vitest suites (2644 checks)",
     "# 135 Vitest suites (2668 checks)", 1, "README suite tree")
flip("README.md", "# Playwright (161 checks)",
     "# Playwright (186 checks)", 1, "README e2e tree")
flip("README.md", "# 2644 Vitest unit checks (",
     "# 2668 Vitest unit checks (", 1, "README suite-list comment")
flip("README.md", "# 161 Playwright checks on :3100",
     "# 186 Playwright checks on :3100", 1, "README e2e commands comment")

# ---- AGENTS (the live-tense Commands region only; the Session-NNN tails
#      are history and stay) -------------------------------------------------
flip("AGENTS.md", "|  Unit tests (2644 checks)      | `bun run test`",
     "|  Unit tests (2668 checks)      | `bun run test`", 1, "AGENTS commands unit")
flip("AGENTS.md", "|  Browser E2E (161 checks)        | `bun run test:e2e`",
     "|  Browser E2E (186 checks)        | `bun run test:e2e`", 1, "AGENTS commands e2e")
flip("AGENTS.md", "`bun run test` (2644) → `bun run build`",
     "`bun run test` (2668) → `bun run build`", 1, "AGENTS gate-order unit")
flip("AGENTS.md", "`bun run test:e2e` (161) — or the one-command",
     "`bun run test:e2e` (186) — or the one-command", 1, "AGENTS gate-order e2e")

# ---- CLAUDE ----------------------------------------------------------------
flip("CLAUDE.md", "`bun run test` (2559) → `bun run build` → `bun run test:e2e` (161)",
     "`bun run test` (2668) → `bun run build` → `bun run test:e2e` (186)", 1,
     "CLAUDE gate-order (the s170-missed 2559 straggler cured)")
flip("CLAUDE.md", "Vitest unit suites (2644 checks)",
     "Vitest unit suites (2668 checks)", 1, "CLAUDE build table unit")
flip("CLAUDE.md", "Playwright E2E (161 checks, needs build first)",
     "Playwright E2E (186 checks, needs build first)", 1, "CLAUDE build table e2e")
flip("CLAUDE.md", "**Unit (Vitest, 2644 checks)**",
     "**Unit (Vitest, 2668 checks)**", 1, "CLAUDE pyramid unit")
flip("CLAUDE.md", "**E2E (Playwright, 161 checks)**",
     "**E2E (Playwright, 186 checks)**", 1, "CLAUDE pyramid e2e")
flip("CLAUDE.md", "the seam (currently 2644).",
     "the seam (currently 2668).", 1, "CLAUDE coverage target")

# ---- PAD -------------------------------------------------------------------
flip("Project_Architecture_Document.md",
     "# 134 Vitest suites — 2644 checks",
     "# 135 Vitest suites — 2668 checks", 1, "PAD tree suites")
flip("Project_Architecture_Document.md",
     "10 spec files + setup project — 161 checks",
     "11 spec files + setup project — 186 checks", 1, "PAD tree e2e")
flip("Project_Architecture_Document.md",
     "HEAD: 134 Vitest suites with 2644 checks + 161 e2e checks in 10 spec",
     "HEAD: 135 Vitest suites with 2668 checks + 186 e2e checks in 11 spec", 1,
     "PAD HEAD line")
flip("Project_Architecture_Document.md",
     "reset-password) + the auth.setup project",
     "reset-password, a11y) + the auth.setup project", 1, "PAD HEAD enumeration")
flip("Project_Architecture_Document.md",
     "`bun run test` — 2644/2644",
     "`bun run test` — 2668/2668", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md",
     "`bun run test:e2e` — 161/161",
     "`bun run test:e2e` — 186/186", 1, "PAD checklist e2e")

# ---- SKILL (the frontmatter project_state + the commands block) ------------
flip("neo-crm_SKILL.md",
     "project_state: 2644 unit checks + 161 e2e checks green",
     "project_state: 2668 unit checks + 186 e2e checks green", 1,
     "SKILL frontmatter project_state")
flip("neo-crm_SKILL.md", "bun run test         # 2644/2644",
     "bun run test         # 2668/2668", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", "# NEO CRM — Engineering Skill (SKILL.md v1.167.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.168.0)", 1, "SKILL H1 lockstep")

print(f"\ncount-ladder-171: {flips} flip(s) applied")
