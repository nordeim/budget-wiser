#!/usr/bin/env python3
"""count-ladder-181.py — the session-181 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2750 -> 2754 (+4 — the walk54 contract-freeze
pins in tests/page-layout.test.ts [the walk54 decode freeze — the
two-app dialog focus ledger + the REAL keyboard Tab drive + the D-112a4
root rule · the DIALOG_CONTENT.base FULL-string freeze · the
DIALOG_CLOSE FULL-string freeze (the focused DOUBLE-ring carrier) ·
the DIALOG_OVERLAY FULL-string freeze (the oklab/rgba serialization
genus's class carrier)]) · SUITES 138 HELD · E2E 192 HELD (the round
is test-only — no product code touched) · badge 2942 -> 2946.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_FORMS = ["2750"]
UNIT_NEW = "2754"
BADGE_FORMS = ["2942"]
BADGE_NEW = "2946"

flips = 0


def flip(path: str, olds: list[str], new: str, count: int = 1, label: str = "") -> None:
    """Flip a site carrying one of the accepted old forms to the new form.

    The site must carry EXACTLY `count` occurrences of exactly ONE old
    form (the negatives-ladder pattern keeps the retired forms on their
    own lines, so each flip's old form stays unique per line region).
    """
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
    # none matched — a site carrying the mid-round form needs the flip
    raise AssertionError(
        f"[{label or path}] expected one of {olds!r} at count {count}; "
        f"got {[ (o, text.count(o)) for o in olds ]}"
    )


def flip_pair(path: str, old_new_pairs: list[tuple[str, str]], label: str) -> None:
    """The dialog-geometry negatives-ladder form: the live carrier flips
    and the retired form joins the negatives ladder (the two-line form)."""
    global flips
    p = ROOT / path
    text = p.read_text(encoding="utf8")
    changed = False
    for old, new in old_new_pairs:
        if new in text:
            continue  # already flipped (idempotent)
        assert text.count(old) == 1, f"[{label}] anchor not unique/found: {old!r}"
        text = text.replace(old, new, 1)
        changed = True
        flips += 1
        print(f"  flip   [{label}] carrier -> {new.splitlines()[-1].strip()!r}")
    if changed:
        p.write_text(text, encoding="utf8")
    else:
        print(f"  no-op  [{label}] carriers already live")


# --- tests/docs-counts.test.ts — the constants -----------------------------
flip(
    "tests/docs-counts.test.ts",
    ["const UNIT = 2750;"],
    "const UNIT = 2754;",
    1,
    "docs-counts UNIT constant",
)


def insert_session_comment(marker: str, anchor: str, comment: str, label: str) -> None:
    """Insert a lineage comment above the UNIT constant (idempotent)."""
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")
    if marker not in text:
        assert text.count(anchor) == 1, f"[{label}] the UNIT anchor must be unique"
        text = text.replace(anchor, comment + anchor, 1)
        p.write_text(text, encoding="utf8")
        print(f"  insert [docs-counts UNIT lineage comment — {label}]")
    else:
        print(f"  no-op  [docs-counts UNIT lineage comment — {label}] already present")


insert_session_comment(
    "// Session-181: 2750 -> 2754 (+4 — THE DIALOG-SURFACE FOCUS",
    "const UNIT = 2754;",
    (
        "// Session-181: 2750 -> 2754 (+4 — THE DIALOG-SURFACE FOCUS-STATE\n"
        "// INTERIOR WALK [walk54 — the s181 battery in\n"
        "// tests/page-layout.test.ts, all four the born-green contract-\n"
        "// freeze form over the zero-defect decode, the s173 P-p/P-q\n"
        "// precedent: the walk54 decode freeze · the DIALOG_CONTENT.base\n"
        "// FULL-string freeze · the DIALOG_CLOSE FULL-string freeze ·\n"
        "// the DIALOG_OVERLAY FULL-string freeze]. SUITES 138 HELD (the\n"
        "// one-suite doctrine) · E2E 192 HELD (the round is test-only —\n"
        "// no product code touched).\n"
    ),
    "s181",
)

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# the live carriers flip; the retired forms join the negatives ladder
flip_pair(
    "tests/dialog-geometry-parity.test.ts",
    [
        (
            'expect(claude).toContain("Unit (Vitest, 2750 checks)");',
            'expect(claude).not.toContain("Unit (Vitest, 2750 checks)");\n'
            '    expect(claude).toContain("Unit (Vitest, 2754 checks)");',
        ),
        (
            'expect(claude).toContain("(currently 2750)");',
            'expect(claude).not.toContain("(currently 2750)");\n'
            '    expect(claude).toContain("(currently 2754)");',
        ),
        (
            'expect(claude).toContain("Vitest unit suites (2750 checks)");',
            'expect(claude).not.toContain("Vitest unit suites (2750 checks)");\n'
            '    expect(claude).toContain("Vitest unit suites (2754 checks)");',
        ),
        (
            'expect(claude).toContain("`bun run test` (2750)");',
            'expect(claude).not.toContain("`bun run test` (2750)");\n'
            '    expect(claude).toContain("`bun run test` (2754)");',
        ),
    ],
    "dialog-geometry CLAUDE carriers",
)

# --- README.md --------------------------------------------------------------
flip("README.md", ["tests-2942%20checks"], "tests-2946%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2750 Vitest unit checks"], "| 🧪 Tested | 2754 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2750 checks)"], "# 138 Vitest suites (2754 checks)", 1, "README tree tests line")
flip("README.md", ["# 2750 Vitest unit checks"], "# 2754 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md --------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2750 checks)"], "Unit tests (2754 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2750) →"], "`bun run test` (2754) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md --------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2750) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2754) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2750 checks)"], "Vitest unit suites (2754 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2750 checks)**"], "**Unit (Vitest, 2754 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2750)"], "the seam (currently 2754)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ---------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2750 checks"], "# 138 Vitest suites — 2754 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2750 unit + 192 e2e** |"], "| **Total** | **138** | **2754 unit + 192 e2e** |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2750 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2754 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2750/2750"], "`bun run test` — 2754/2754", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2750 unit checks |"], "| `bun run test` | root | 2754 unit checks |", 1, "PAD §9 commands unit")

# --- neo-crm_SKILL.md --------------------------------------------------------
flip("neo-crm_SKILL.md", ["bun run test         # 2750/2750"], "bun run test         # 2754/2754", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2750** |"], "| **unit total** | 138 files | **2754** |", 1, "SKILL Appendix B unit total")
flip("neo-crm_SKILL.md", ["project_state: 2750 unit checks + 192 e2e checks green;"], "project_state: 2754 unit checks + 192 e2e checks green;", 1, "SKILL head project_state")

print(f"\ncount-ladder-181: {flips} flip(s) applied; all sites verified unique-anchor.")
