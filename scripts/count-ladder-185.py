#!/usr/bin/env python3
"""count-ladder-185.py — the session-185 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2763 -> 2766 (+3 — the walk58 battery in
tests/page-layout.test.ts [the walk58 decode freeze — the two-app
dialog OPEN ledger at both axes + the mount-focus census + the REAL
Tab drive through the dialog + the select vocabularies + the by-type
footer decode · the quick-log trigger→dialog construction freeze (the
genuine battery gap: the s125 pins hold the FORM side, never the PAGE
side) · the by-type footer pair freeze (the defaultChecked checkbox +
the htmlFor label + the ••• aria-label superset)]). SUITES 138 HELD ·
E2E 192 — re-verified this session (the round's ONE product-code touch:
the D-185a1 placeholderState restoration [page-layout.ts + select.tsx —
the s133 retirement REVERSED: the walk58 two-app census proved the
reference's CURRENT trigger carries the stock data-[placeholder] arm
and its placeholder-state Related To (Type) select computes the muted
rgb(115,115,115); the re-walk proves the face byte-equal]; the s133
round's own protected face — the density select — retired upstream at
s148) · badge 2955 -> 2958.

Plus the collateral: the F-106a1 layer-axis pin (the s185 layer live,
the s184 layer demoted beneath it at 2763/192) + the SKILL §5.6 census
sites (239 -> 242 checks; the MODULE lines 1695 -> 1701 — the D-185a1
comment growth +6) + the s184-era live-tense RED-first arithmetic site
(255 -> 258).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

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
    """The negatives-ladder form: the live carrier flips and the retired
    form joins the negatives ladder (the two-line form)."""
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
    ["const UNIT = 2763;"],
    "const UNIT = 2766;",
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
    "// Session-185: 2763 -> 2766 (+3 — THE QUICK-LOG DIALOG",
    "const UNIT = 2766;",
    (
        "// Session-185: 2763 -> 2766 (+3 — THE QUICK-LOG DIALOG\n"
        "// OPEN-STATE INTERIOR WALK + BY-TYPE FOOTER RE-WALK [walk58\n"
        "// — the s185 battery in tests/page-layout.test.ts: the walk58\n"
        "// decode freeze (the two-app dialog OPEN ledger at both axes\n"
        "// + the mount-focus census + the REAL Tab drive through the\n"
        "// dialog + the select vocabularies + the by-type footer decode)\n"
        "// · the quick-log trigger→dialog construction freeze (the\n"
        "// genuine battery gap: the s125 pins hold the FORM side,\n"
        "// never the PAGE side) · the by-type footer pair freeze (the\n"
        "// defaultChecked checkbox + the htmlFor label + the •••\n"
        "// aria-label superset)]. SUITES 138 HELD (the one-suite\n"
        "// doctrine) · E2E 192 re-verified (the round's ONE product-\n"
        "// code touch: the D-185a1 placeholderState restoration — the\n"
        "// s133 retirement REVERSED by the walk58 two-app live find).\n"
    ),
    "s185",
)

# --- tests/docs-counts.test.ts — the F-106a1 layer-axis pin -----------------
flip(
    "tests/docs-counts.test.ts",
    ["project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-184 layer`,"],
    "project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-185 layer`,",
    1,
    "F-106a1 first-layer axis",
)
flip(
    "tests/docs-counts.test.ts",
    ['"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s183 layer now beneath the s184 head)",'],
    '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s184 layer now beneath the s185 head)",',
    1,
    "F-106a1 second-layer comment",
)
flip(
    "tests/docs-counts.test.ts",
    ['"+ beneath it 2760 unit checks + 192 e2e checks green; the session-183 layer (THE LEADS-FILTER POPOVER + CONTACTS-FILTER-PANEL OPEN-STATE",'],
    '"+ beneath it 2763 unit checks + 192 e2e checks green; the session-184 layer (THE ACTIVITIES MORE-FILTERS TOGGLE + RAIL-ACTIONS OPEN-STATE",',
    1,
    "F-106a1 second-layer axis",
)

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
flip_pair(
    "tests/dialog-geometry-parity.test.ts",
    [
        (
            'expect(claude).toContain("Unit (Vitest, 2763 checks)");',
            'expect(claude).not.toContain("Unit (Vitest, 2763 checks)");\n'
            '    expect(claude).toContain("Unit (Vitest, 2766 checks)");',
        ),
        (
            'expect(claude).toContain("(currently 2763)");',
            'expect(claude).not.toContain("(currently 2763)");\n'
            '    expect(claude).toContain("(currently 2766)");',
        ),
        (
            'expect(claude).toContain("Vitest unit suites (2763 checks)");',
            'expect(claude).not.toContain("Vitest unit suites (2763 checks)");\n'
            '    expect(claude).toContain("Vitest unit suites (2766 checks)");',
        ),
        (
            'expect(claude).toContain("`bun run test` (2763)");',
            'expect(claude).not.toContain("`bun run test` (2763)");\n'
            '    expect(claude).toContain("`bun run test` (2766)");',
        ),
    ],
    "dialog-geometry CLAUDE carriers",
)

# --- README.md --------------------------------------------------------------
flip("README.md", ["tests-2955%20checks"], "tests-2958%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2763 Vitest unit checks"], "| 🧪 Tested | 2766 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2763 checks)"], "# 138 Vitest suites (2766 checks)", 1, "README tree tests line")
flip("README.md", ["# 2763 Vitest unit checks"], "# 2766 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md --------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2763 checks)"], "Unit tests (2766 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2763) →"], "`bun run test` (2766) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md --------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2763) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2766) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2763 checks)"], "Vitest unit suites (2766 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2763 checks)**"], "**Unit (Vitest, 2766 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2763)"], "the seam (currently 2766)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ---------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2763 checks"], "# 138 Vitest suites — 2766 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2763 unit + 192 e2e** |"], "| **Total** | **138** | **2766 unit + 192 e2e** |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2763 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2766 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2763/2763"], "`bun run test` — 2766/2766", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2763 unit checks |"], "| `bun run test` | root | 2766 unit checks |", 1, "PAD §9 commands unit")
flip("Project_Architecture_Document.md", ["| `src/lib/page-layout.ts` | 1695 |"], "| `src/lib/page-layout.ts` | 1701 |", 1, "PAD §11 module-table page-layout row")

# --- neo-crm_SKILL.md --------------------------------------------------------
flip("neo-crm_SKILL.md", ["bun run test         # 2763/2763"], "bun run test         # 2766/2766", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2763** |"], "| **unit total** | 138 files | **2766** |", 1, "SKILL Appendix B unit total")
flip("neo-crm_SKILL.md", ["project_state: 2763 unit checks + 192 e2e checks green;"], "project_state: 2766 unit checks + 192 e2e checks green;", 1, "SKILL head project_state")

# --- neo-crm_SKILL.md — the §5.6 census collateral ---------------------------
flip(
    "neo-crm_SKILL.md",
    ["`tests/page-layout.test.ts`, 239 checks —"],
    "`tests/page-layout.test.ts`, 242 checks —",
    1,
    "SKILL §5.6 census checks",
)
flip(
    "neo-crm_SKILL.md",
    ["1695 lines; `tests/page-layout.test.ts`"],
    "1701 lines; `tests/page-layout.test.ts`",
    1,
    "SKILL §5.6 census module lines",
)
flip(
    "neo-crm_SKILL.md",
    ["the s184 census: the module untouched by the walk57 round [the round touched ZERO product code — test-only + scripts];"],
    "the s185 census: the module GREW 1695->1701 [the D-185a1 placeholderState restoration's comment growth +6 — the round's ONE product-code touch];",
    1,
    "SKILL §5.6 census era",
)
flip(
    "neo-crm_SKILL.md",
    ["the s183 census re-anchored by the 3 walk57 pins)."],
    "the s184 census re-anchored by the 3 walk58 pins).",
    1,
    "SKILL §5.6 census re-anchor",
)
flip(
    "neo-crm_SKILL.md",
    ["**RED-first:** 16 failed | 239 passed (255) at the still-unfixed src"],
    "**RED-first:** 16 failed | 242 passed (258) at the still-unfixed src",
    1,
    "SKILL the s184-era live-tense RED-first arithmetic site",
)

# --- tests/docs-counts.test.ts — the §5.6 negatives-ladder extension --------
flip_pair(
    "tests/docs-counts.test.ts",
    [
        (
            'expect(skill).not.toContain("`tests/page-layout.test.ts`, 236 checks");\n'
            '    expect(skill, "the §5.6 line must carry the live line + check counts").toContain(\n'
            '      "test-pinned module (1695 lines; `tests/page-layout.test.ts`, 239 checks",',
            'expect(skill).not.toContain("`tests/page-layout.test.ts`, 236 checks");\n'
            '    // Session-185: the retired 239 form joins the negatives ladder (the\n'
            '    // walk58 quick-log-dialog round: the session-185 battery +3 born-green\n'
            '    // pins, the checks 239->242; the MODULE line count 1695->1701 — the\n'
            '    // D-185a1 placeholderState restoration grew the module +6).\n'
            '    expect(skill).not.toContain("`tests/page-layout.test.ts`, 239 checks");\n'
            '    expect(skill, "the §5.6 line must carry the live line + check counts").toContain(\n'
            '      "test-pinned module (1701 lines; `tests/page-layout.test.ts`, 242 checks",',
        ),
        (
            'expect(pad).not.toContain("| `src/lib/page-layout.ts` | 1653 |");\n'
            '    expect(\n'
            '      pad,\n'
            '      "the module-table page-layout row must carry the live line count (F-108a2\'s PAD face)",\n'
            '    ).toContain("| `src/lib/page-layout.ts` | 1695 |");',
            'expect(pad).not.toContain("| `src/lib/page-layout.ts` | 1653 |");\n'
            '    // Session-185: the retired 1695 form joins the negatives ladder (the\n'
            '    // D-185a1 cure\'s comment growth 1695->1701).\n'
            '    expect(pad).not.toContain("| `src/lib/page-layout.ts` | 1695 |");\n'
            '    expect(\n'
            '      pad,\n'
            '      "the module-table page-layout row must carry the live line count (F-108a2\'s PAD face)",\n'
            '    ).toContain("| `src/lib/page-layout.ts` | 1701 |");',
        ),
    ],
    "docs-counts §5.6 + module-row census pins",
)

print(f"\ncount-ladder-185: {flips} flip(s) applied; all sites verified unique-anchor.")
