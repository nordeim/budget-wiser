#!/usr/bin/env python3
"""count-ladder-183.py — the session-183 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2757 -> 2760 (+3 — the walk56 battery in
tests/page-layout.test.ts [the walk56 decode freeze — the two-arm OPEN
ledger + the mount-focus census + the REAL Tab drive + BOTH axes ·
the POPOVER content chrome FULL-string freeze (the genuine
walk53-battery gap: the DropdownMenu + Select carriers full-frozen at
walk53, the Popover family's own carrier never) · the D-183a1
RED-first cure pin (the contacts Filters trigger's OPEN face — the
reference's DARK stock primary carried by the neutral literals)]) ·
SUITES 138 HELD · E2E 192 HELD (the round's one product-code touch is
the D-183a1 call-site pair in contacts-page.tsx — no e2e-visible
behavioral change; the final gate re-verifies 192/192) · badge
2949 -> 2952.

Plus the collateral: the F-106a1 layer-axis pin (the s183 layer live,
the s182 layer demoted beneath it at 2757/192) + the SKILL §5.6
census sites (233 -> 236) + the s182-introduced live-tense RED-first
arithmetic site (249 -> 252).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UNIT_FORMS = ["2757"]
UNIT_NEW = "2760"
BADGE_FORMS = ["2949"]
BADGE_NEW = "2952"

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
    ["const UNIT = 2757;"],
    "const UNIT = 2760;",
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
    "// Session-183: 2757 -> 2760 (+3 — THE LEADS-FILTER POPOVER",
    "const UNIT = 2760;",
    (
        "// Session-183: 2757 -> 2760 (+3 — THE LEADS-FILTER POPOVER\n"
        "// + CONTACTS-FILTER-PANEL OPEN-STATE INTERIOR WALK [walk56\n"
        "// — the s183 battery in tests/page-layout.test.ts: the walk56\n"
        "// decode freeze (the two-arm OPEN ledger + the mount-focus\n"
        "// census + the REAL Tab drive + BOTH axes) · the POPOVER\n"
        "// content chrome FULL-string freeze (the genuine walk53-\n"
        "// battery gap: the DropdownMenu + Select carriers full-\n"
        "// frozen at walk53, the Popover family's own carrier\n"
        "// never) · the D-183a1 RED-first cure pin (the contacts\n"
        "// Filters trigger's OPEN face — the reference's DARK stock\n"
        "// primary #171717 carried by the neutral literals, the\n"
        "// profile S13-P2/M-80c1 precedent)]. SUITES 138 HELD (the\n"
        "// one-suite doctrine) · E2E 192 HELD (the round's one\n"
        "// product-code touch: the D-183a1 call-site pair in\n"
        "// contacts-page.tsx).\n"
    ),
    "s183",
)

# --- tests/docs-counts.test.ts — the F-106a1 layer-axis pin -----------------
flip(
    "tests/docs-counts.test.ts",
    ["project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-182 layer`,"],
    "project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-183 layer`,",
    1,
    "F-106a1 first-layer axis",
)
flip(
    "tests/docs-counts.test.ts",
    ['"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s181 layer now beneath the s182 head)",'],
    '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s182 layer now beneath the s183 head)",',
    1,
    "F-106a1 second-layer comment",
)
flip(
    "tests/docs-counts.test.ts",
    ['"+ beneath it 2754 unit checks + 192 e2e checks green; the session-181 layer (THE DIALOG-SURFACE FOCUS-STATE",'],
    '"+ beneath it 2757 unit checks + 192 e2e checks green; the session-182 layer (THE REPORTS-FILTER SELECTS OPEN-STATE",',
    1,
    "F-106a1 second-layer axis",
)

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# the live carriers flip; the retired forms join the negatives ladder
flip_pair(
    "tests/dialog-geometry-parity.test.ts",
    [
        (
            'expect(claude).toContain("Unit (Vitest, 2757 checks)");',
            'expect(claude).not.toContain("Unit (Vitest, 2757 checks)");\n'
            '    expect(claude).toContain("Unit (Vitest, 2760 checks)");',
        ),
        (
            'expect(claude).toContain("(currently 2757)");',
            'expect(claude).not.toContain("(currently 2757)");\n'
            '    expect(claude).toContain("(currently 2760)");',
        ),
        (
            'expect(claude).toContain("Vitest unit suites (2757 checks)");',
            'expect(claude).not.toContain("Vitest unit suites (2757 checks)");\n'
            '    expect(claude).toContain("Vitest unit suites (2760 checks)");',
        ),
        (
            'expect(claude).toContain("`bun run test` (2757)");',
            'expect(claude).not.toContain("`bun run test` (2757)");\n'
            '    expect(claude).toContain("`bun run test` (2760)");',
        ),
    ],
    "dialog-geometry CLAUDE carriers",
)

# --- README.md --------------------------------------------------------------
flip("README.md", ["tests-2949%20checks"], "tests-2952%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2757 Vitest unit checks"], "| 🧪 Tested | 2760 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2757 checks)"], "# 138 Vitest suites (2760 checks)", 1, "README tree tests line")
flip("README.md", ["# 2757 Vitest unit checks"], "# 2760 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md --------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2757 checks)"], "Unit tests (2760 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2757) →"], "`bun run test` (2760) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md --------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2757) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2760) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2757 checks)"], "Vitest unit suites (2760 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2757 checks)**"], "**Unit (Vitest, 2760 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2757)"], "the seam (currently 2760)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ---------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2757 checks"], "# 138 Vitest suites — 2760 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2757 unit + 192 e2e** |"], "| **Total** | **138** | **2760 unit + 192 e2e** |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2757 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2760 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2757/2757"], "`bun run test` — 2760/2760", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2757 unit checks |"], "| `bun run test` | root | 2760 unit checks |", 1, "PAD §9 commands unit")

# --- neo-crm_SKILL.md --------------------------------------------------------
flip("neo-crm_SKILL.md", ["bun run test         # 2757/2757"], "bun run test         # 2760/2760", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2757** |"], "| **unit total** | 138 files | **2760** |", 1, "SKILL Appendix B unit total")
flip("neo-crm_SKILL.md", ["project_state: 2757 unit checks + 192 e2e checks green;"], "project_state: 2760 unit checks + 192 e2e checks green;", 1, "SKILL head project_state")

# --- neo-crm_SKILL.md — the §5.6 census collateral ---------------------------
flip(
    "neo-crm_SKILL.md",
    ["`tests/page-layout.test.ts`, 233 checks —"],
    "`tests/page-layout.test.ts`, 236 checks —",
    1,
    "SKILL §5.6 census line",
)
flip(
    "neo-crm_SKILL.md",
    ["the s182 census: the module untouched by the walk55 round [test-only];"],
    "the s183 census: the module untouched by the walk56 round [the D-183a1 cure touched contacts-page.tsx, not the module];",
    1,
    "SKILL §5.6 census era",
)
flip(
    "neo-crm_SKILL.md",
    ["the s181 census re-anchored by the 3 walk55 decode-freeze pins)."],
    "the s182 census re-anchored by the 3 walk56 pins).",
    1,
    "SKILL §5.6 census re-anchor",
)
flip(
    "neo-crm_SKILL.md",
    ["**RED-first:** 16 failed | 233 passed (249) at the still-unfixed src"],
    "**RED-first:** 16 failed | 236 passed (252) at the still-unfixed src",
    1,
    "SKILL the s182-era live-tense RED-first arithmetic site",
)

# --- tests/docs-counts.test.ts — the §5.6 negatives-ladder extension --------
flip_pair(
    "tests/docs-counts.test.ts",
    [
        (
            'expect(skill).not.toContain("`tests/page-layout.test.ts`, 230 checks");\n'
            '    expect(skill, "the §5.6 line must carry the live line + check counts").toContain(\n'
            '      "test-pinned module (1695 lines; `tests/page-layout.test.ts`, 233 checks",',
            'expect(skill).not.toContain("`tests/page-layout.test.ts`, 230 checks");\n'
            '    // Session-183: the retired 233 form joins the negatives ladder (the\n'
            '    // walk56 leads-popover/contacts-panel round: the session-183 battery\n'
            '    // +3 pins [2 born-green + 1 RED-first cure], the checks 233->236;\n'
            '    // the MODULE line count 1695 HELD — page-layout.ts untouched\n'
            '    // this round; the round\'s product touch was contacts-page.tsx).\n'
            '    expect(skill).not.toContain("`tests/page-layout.test.ts`, 233 checks");\n'
            '    expect(skill, "the §5.6 line must carry the live line + check counts").toContain(\n'
            '      "test-pinned module (1695 lines; `tests/page-layout.test.ts`, 236 checks",',
        ),
    ],
    "docs-counts §5.6 census pin",
)

print(f"\ncount-ladder-183: {flips} flip(s) applied; all sites verified unique-anchor.")
