#!/usr/bin/env python3
"""count-ladder-182.py — the session-182 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2754 -> 2757 (+3 — the walk55 contract-freeze
pins in tests/page-layout.test.ts [the walk55 decode freeze — the
four-select OPEN ledger + the REAL keyboard highlight drive + the
owner DATA-STATE arm · the DISTINCT-opportunity-owners derivation
freeze (the s31 contract, the DATA-STATE arm's source carrier) · the
SELECT_ITEM indicator span + Check pair full-string freeze (the
genuine s180-battery gap)]) · SUITES 138 HELD · E2E 192 HELD (the
round is test-only — no product code touched) · badge 2946 -> 2949.

Plus the collateral: the F-106a1 layer-axis pin (the s182 layer live,
the s181 layer demoted beneath it at 2754/192) + the SKILL §5.6
census sites (230 -> 233).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_FORMS = ["2754"]
UNIT_NEW = "2757"
BADGE_FORMS = ["2946"]
BADGE_NEW = "2949"

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
    ["const UNIT = 2754;"],
    "const UNIT = 2757;",
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
    "// Session-182: 2754 -> 2757 (+3 — THE REPORTS-FILTER SELECTS",
    "const UNIT = 2757;",
    (
        "// Session-182: 2754 -> 2757 (+3 — THE REPORTS-FILTER SELECTS\n"
        "// OPEN-STATE INTERIOR WALK [walk55 — the s182 battery in\n"
        "// tests/page-layout.test.ts, all three the born-green contract-\n"
        "// freeze form over the zero-defect decode, the s173 P-p/P-q\n"
        "// precedent: the walk55 decode freeze (the four-select OPEN\n"
        "// ledger + the REAL keyboard highlight drive + the owner\n"
        "// DATA-STATE arm) · the DISTINCT-opportunity-owners derivation\n"
        "// freeze (the s31 contract, the DATA-STATE arm's source\n"
        "// carrier) · the SELECT_ITEM indicator span + Check pair\n"
        "// full-string freeze (the genuine s180-battery gap)]. SUITES\n"
        "// 138 HELD (the one-suite doctrine) · E2E 192 HELD (the round\n"
        "// is test-only — no product code touched).\n"
    ),
    "s182",
)

# --- tests/docs-counts.test.ts — the F-106a1 layer-axis pin -----------------
flip(
    "tests/docs-counts.test.ts",
    ["project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-181 layer`,"],
    "project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-182 layer`,",
    1,
    "F-106a1 first-layer axis",
)
flip(
    "tests/docs-counts.test.ts",
    ['"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s180 layer now beneath the s181 head)",'],
    '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s181 layer now beneath the s182 head)",',
    1,
    "F-106a1 second-layer comment",
)
flip(
    "tests/docs-counts.test.ts",
    ['"+ beneath it 2750 unit checks + 192 e2e checks green; the session-180 layer (THE DROPDOWN/SELECT OPEN-STATE",'],
    '"+ beneath it 2754 unit checks + 192 e2e checks green; the session-181 layer (THE DIALOG-SURFACE FOCUS-STATE",',
    1,
    "F-106a1 second-layer axis",
)

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# the live carriers flip; the retired forms join the negatives ladder
flip_pair(
    "tests/dialog-geometry-parity.test.ts",
    [
        (
            'expect(claude).toContain("Unit (Vitest, 2754 checks)");',
            'expect(claude).not.toContain("Unit (Vitest, 2754 checks)");\n'
            '    expect(claude).toContain("Unit (Vitest, 2757 checks)");',
        ),
        (
            'expect(claude).toContain("(currently 2754)");',
            'expect(claude).not.toContain("(currently 2754)");\n'
            '    expect(claude).toContain("(currently 2757)");',
        ),
        (
            'expect(claude).toContain("Vitest unit suites (2754 checks)");',
            'expect(claude).not.toContain("Vitest unit suites (2754 checks)");\n'
            '    expect(claude).toContain("Vitest unit suites (2757 checks)");',
        ),
        (
            'expect(claude).toContain("`bun run test` (2754)");',
            'expect(claude).not.toContain("`bun run test` (2754)");\n'
            '    expect(claude).toContain("`bun run test` (2757)");',
        ),
    ],
    "dialog-geometry CLAUDE carriers",
)

# --- README.md --------------------------------------------------------------
flip("README.md", ["tests-2946%20checks"], "tests-2949%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2754 Vitest unit checks"], "| 🧪 Tested | 2757 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2754 checks)"], "# 138 Vitest suites (2757 checks)", 1, "README tree tests line")
flip("README.md", ["# 2754 Vitest unit checks"], "# 2757 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md --------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2754 checks)"], "Unit tests (2757 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2754) →"], "`bun run test` (2757) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md --------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2754) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2757) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2754 checks)"], "Vitest unit suites (2757 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2754 checks)**"], "**Unit (Vitest, 2757 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2754)"], "the seam (currently 2757)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ---------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2754 checks"], "# 138 Vitest suites — 2757 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2754 unit + 192 e2e** |"], "| **Total** | **138** | **2757 unit + 192 e2e** |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2754 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2757 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2754/2754"], "`bun run test` — 2757/2757", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2754 unit checks |"], "| `bun run test` | root | 2757 unit checks |", 1, "PAD §9 commands unit")

# --- neo-crm_SKILL.md --------------------------------------------------------
flip("neo-crm_SKILL.md", ["bun run test         # 2754/2754"], "bun run test         # 2757/2757", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2754** |"], "| **unit total** | 138 files | **2757** |", 1, "SKILL Appendix B unit total")
flip("neo-crm_SKILL.md", ["project_state: 2754 unit checks + 192 e2e checks green;"], "project_state: 2757 unit checks + 192 e2e checks green;", 1, "SKILL head project_state")

# --- neo-crm_SKILL.md — the §5.6 census collateral ---------------------------
flip(
    "neo-crm_SKILL.md",
    ["`tests/page-layout.test.ts`, 230 checks —"],
    "`tests/page-layout.test.ts`, 233 checks —",
    1,
    "SKILL §5.6 census line",
)
flip(
    "neo-crm_SKILL.md",
    ["the s181 census: the module untouched by the walk54 round [test-only];"],
    "the s182 census: the module untouched by the walk55 round [test-only];",
    1,
    "SKILL §5.6 census era",
)
flip(
    "neo-crm_SKILL.md",
    ["the s180 census re-anchored by the 4 walk54 decode-freeze pins)."],
    "the s181 census re-anchored by the 3 walk55 decode-freeze pins).",
    1,
    "SKILL §5.6 census re-anchor",
)
flip(
    "neo-crm_SKILL.md",
    ["**RED-first:** 16 failed | 230 passed (246) at the still-unfixed src"],
    "**RED-first:** 16 failed | 233 passed (249) at the still-unfixed src",
    1,
    "SKILL §5.6 RED-first arithmetic",
)

print(f"\ncount-ladder-182: {flips} flip(s) applied; all sites verified unique-anchor.")
