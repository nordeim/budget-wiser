#!/usr/bin/env python3
"""count-ladder-188.py — the session-188 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2773 -> 2778 (+5 — the walk61 battery in
tests/page-layout.test.ts [the walk61 decode freeze — the two-app
settings tab-bar OPEN ledger at both axes + the REAL Tab/ArrowRight
drives + the mouse-click face + the rail/leads/reports siblings' decode
· the settings tab-bar call-site construction freeze · the accounts
rail-selects construction freeze · the leads-search call-site
construction freeze] + the NEW D-188a1 retired-block ship-line pin in
tests/docs-counts.test.ts [the s171-fix doctrine never pinned — the
s187 first-pass corruption shipped undetected; the walk61 decode found
it, RED-first]). SUITES 138 HELD · E2E 192 — re-verified this session
(the round: ZERO product-code touches — the ONE live find is a DOCS
head defect, the D-188a1 SKILL-head cure; the MODULE line count 1718
HELD) · badge 2965 -> 2970.

Plus the collateral: the F-106a1 layer-axis pin (the s188 layer live,
the s187 layer demoted beneath it at 2773/192) + the SKILL §5.6 census
sites (248 -> 252 checks; the MODULE 1718 HELD — the zero-fix round)
+ the s187-era live-tense RED-first arithmetic site (264 -> 268).

NOTE (the s187 lesson repeating, caught the same way): the first pass
carried the +4 arithmetic (2777 / badge 2969 — the walk61 pins alone)
before the +5 truth (the D-188a1 pin is a NEW test in docs-counts, not
a re-anchor); this corrected form accepts BOTH the s187-ship forms
(2773/2965) and the intermediate forms (2777/2969) as old forms — the
docs land on 2778/2970 either way. The §5.6 sites (252 checks) and the
F-106a1 axis (the session-188 layer) are already correct at their
first-pass values — the +1 lives in the docs-counts suite, not
page-layout.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

flips = 0


def flip(path: str, olds: list[str], new: str, count: int = 1, label: str = "") -> None:
    """Flip a site carrying one of the accepted old forms to the new form."""
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
    ["const UNIT = 2773;", "const UNIT = 2777;"],
    "const UNIT = 2778;",
    1,
    "docs-counts UNIT constant",
)


def fix_unit_lineage() -> None:
    """The first pass carried the +4 lineage (2773 -> 2777); the
    corrected pass rewrites it to the +5 truth (2773 -> 2778) and
    appends the NEW-test note (idempotent)."""
    global flips
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")
    good_head = "// Session-188: 2773 -> 2778 (+5 — THE SETTINGS SEGMENTED"
    if good_head in text:
        print("  no-op  [docs-counts UNIT lineage comment] already the +5 truth")
        return
    bad_head = "// Session-188: 2773 -> 2777 (+4 — THE SETTINGS SEGMENTED"
    assert text.count(bad_head) == 1, "the intermediate +4 lineage comment must be unique"
    text = text.replace(bad_head, good_head, 1)
    text = text.replace(
        "// SEARCH PAGE-ARMS SIBLING [walk61 — the s188 battery in\n"
        "// tests/page-layout.test.ts: the walk61 decode freeze (the\n",
        "// SEARCH PAGE-ARMS SIBLING [walk61 — the s188 battery (+ the NEW\n"
        "// D-188a1 retired-block pin in docs-counts) in\n"
        "// tests/page-layout.test.ts: the walk61 decode freeze (the\n",
        1,
    )
    p.write_text(text, encoding="utf8")
    flips += 1
    print("  flip   [docs-counts UNIT lineage comment] +4 -> the +5 truth")


fix_unit_lineage()

# --- tests/docs-counts.test.ts — the F-106a1 layer-axis pin -----------------
# The session-188 axis flip (first pass, already correct — the idempotent
# no-op re-verifies it on the re-run).
flip(
    "tests/docs-counts.test.ts",
    ["project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-187 layer`,"],
    "project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-188 layer`,",
    1,
    "F-106a1 first-layer axis",
)
flip(
    "tests/docs-counts.test.ts",
    ['"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s186 layer now beneath the s187 head)",'],
    '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s187 layer now beneath the s188 head)",',
    1,
    "F-106a1 second-layer comment",
)
flip(
    "tests/docs-counts.test.ts",
    ['"+ beneath it 2769 unit checks + 192 e2e checks green; the session-186 layer (THE SETTINGS PICKLIST-EDITOR OPEN-STATE INTERIOR WALK + DEFAULTS-TAB SELECTS SIBLING",'],
    '"+ beneath it 2773 unit checks + 192 e2e checks green; the session-187 layer (THE PROFILE PHOTO-UPLOAD FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS DATA-TAB SIBLING",',
    1,
    "F-106a1 second-layer axis",
)

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# The first pass landed the 2777 carriers; this corrected pass demotes
# 2777 to the negatives ladder and carries 2778 live.
flip_pair(
    "tests/dialog-geometry-parity.test.ts",
    [
        (
            'expect(claude).toContain("Unit (Vitest, 2777 checks)");',
            'expect(claude).not.toContain("Unit (Vitest, 2777 checks)");\n'
            '    expect(claude).toContain("Unit (Vitest, 2778 checks)");',
        ),
        (
            'expect(claude).toContain("(currently 2777)");',
            'expect(claude).not.toContain("(currently 2777)");\n'
            '    expect(claude).toContain("(currently 2778)");',
        ),
        (
            'expect(claude).toContain("Vitest unit suites (2777 checks)");',
            'expect(claude).not.toContain("Vitest unit suites (2777 checks)");\n'
            '    expect(claude).toContain("Vitest unit suites (2778 checks)");',
        ),
        (
            'expect(claude).toContain("`bun run test` (2777)");',
            'expect(claude).not.toContain("`bun run test` (2777)");\n'
            '    expect(claude).toContain("`bun run test` (2778)");',
        ),
    ],
    "dialog-geometry CLAUDE carriers",
)

# --- README.md --------------------------------------------------------------
flip("README.md", ["tests-2965%20checks", "tests-2969%20checks"], "tests-2970%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2773 Vitest unit checks", "| 🧪 Tested | 2777 Vitest unit checks"], "| 🧪 Tested | 2778 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2773 checks)", "# 138 Vitest suites (2777 checks)"], "# 138 Vitest suites (2778 checks)", 1, "README tree tests line")
flip("README.md", ["# 2773 Vitest unit checks", "# 2777 Vitest unit checks"], "# 2778 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md --------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2773 checks)", "Unit tests (2777 checks)"], "Unit tests (2778 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2773) →", "`bun run test` (2777) →"], "`bun run test` (2778) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md --------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2773) → `bun run build` → `bun run test:e2e` (192)", "`bun run test` (2777) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2778) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2773 checks)", "Vitest unit suites (2777 checks)"], "Vitest unit suites (2778 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2773 checks)**", "**Unit (Vitest, 2777 checks)**"], "**Unit (Vitest, 2778 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2773)", "the seam (currently 2777)"], "the seam (currently 2778)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ---------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2773 checks", "# 138 Vitest suites — 2777 checks"], "# 138 Vitest suites — 2778 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2773 unit + 192 e2e** | | |", "| **Total** | **138** | **2777 unit + 192 e2e** | | |"], "| **Total** | **138** | **2778 unit + 192 e2e** | | |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2773 checks + 192 e2e", "HEAD: 138 Vitest suites with 2777 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2778 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2773/2773", "`bun run test` — 2777/2777"], "`bun run test` — 2778/2778", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2773 unit checks |", "| `bun run test` | root | 2777 unit checks |"], "| `bun run test` | root | 2778 unit checks |", 1, "PAD §9 commands unit")

# --- neo-crm_SKILL.md --------------------------------------------------------
flip("neo-crm_SKILL.md", ["bun run test         # 2773/2773", "bun run test         # 2777/2777"], "bun run test         # 2778/2778", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2773** |", "| **unit total** | 138 files | **2777** |"], "| **unit total** | 138 files | **2778** |", 1, "SKILL Appendix B unit total")
# NOTE: anchored on the LIVE layer's full form ONLY — the retired/demoted
# layers keep their OWN ship counts in their comment blocks (the s171-fix
# precedent, now PINNED by the D-188a1 test — the first corrective pass
# listed the 2773/session-187 carrier as an accepted old form, and the
# IDEMPOTENCE RE-RUN matched the retired s187 block's ship line and
# corrupted it (the s187 disease repeating); the re-run's corruption was
# caught by the extended D-188a1 pin, repaired, and this form REMOVED from
# the accepted old-forms — a ladder old-form must NEVER match a retired
# block's ship line).
flip("neo-crm_SKILL.md",
     ["project_state: 2777 unit checks + 192 e2e checks green; the session-188 layer ("],
     "project_state: 2778 unit checks + 192 e2e checks green; the session-188 layer (",
     1, "SKILL head project_state (the LIVE layer form)")

# --- neo-crm_SKILL.md — the §5.6 census collateral (the first-pass values
# are the +5 truth already — the page-layout suite alone is +4=252; the
# idempotent re-run re-verifies) ----------------------------------------------
flip(
    "neo-crm_SKILL.md",
    ["`tests/page-layout.test.ts`, 248 checks —"],
    "`tests/page-layout.test.ts`, 252 checks —",
    1,
    "SKILL §5.6 census checks",
)
flip(
    "neo-crm_SKILL.md",
    ["the s187 census: the module GREW 1701->1718 [the D-187a2/a3 cure comments' growth +17 — the round's product-code touch in page-layout.ts];"],
    "the s188 census: the module untouched by the walk61 round [the zero-fix round — page-layout.ts test-only, the line count 1718 HELD];",
    1,
    "SKILL §5.6 census era",
)
flip(
    "neo-crm_SKILL.md",
    ["the s186 census re-anchored by the 3 walk60 pins)."],
    "the s187 census re-anchored by the 4 walk61 pins).",
    1,
    "SKILL §5.6 census re-anchor",
)
flip(
    "neo-crm_SKILL.md",
    ["**RED-first:** 16 failed | 248 passed (264) at the still-unfixed src"],
    "**RED-first:** 16 failed | 252 passed (268) at the still-unfixed src",
    1,
    "SKILL the s187-era live-tense RED-first arithmetic site",
)

# --- the s188 head layer's interior narrative — the +5 truth ----------------
def fix_head_narrative() -> None:
    """The head surgery's s188 narrative carried the +4 arithmetic (the
    ladder 2773 -> 2777 (+4) · badge 2965 -> 2969); the corrected pass
    rewrites it to the +5 truth (idempotent)."""
    global flips
    p = ROOT / "neo-crm_SKILL.md"
    text = p.read_text(encoding="utf8")
    good = "the count ladder 2773 -> 2778 (+5 — the 4 walk61 pins + the NEW D-188a1 pin) · SUITES 138 HELD"
    if good in text:
        print("  no-op  [SKILL s188 head narrative] already the +5 truth")
        return
    bad = "the count ladder 2773 -> 2777 (+4) · SUITES 138 HELD"
    assert text.count(bad) == 1, "the s188 head narrative +4 form must be unique"
    text = text.replace(bad, good, 1)
    bad2 = "badge 2965 -> 2969 (count-ladder-188.py: assert-first, idempotent)"
    good2 = "badge 2965 -> 2970 (count-ladder-188.py: assert-first, idempotent — the first pass carried +4 before the +5 truth was caught at the full-suite count; the corrected script accepts both intermediate forms)"
    assert text.count(bad2) == 1, "the s188 head narrative badge form must be unique"
    text = text.replace(bad2, good2, 1)
    p.write_text(text, encoding="utf8")
    flips += 1
    print("  flip   [SKILL s188 head narrative] +4 -> the +5 truth")


fix_head_narrative()

# --- tests/docs-counts.test.ts — the §5.6 + PAD-row negatives-ladder -----
# The walk61 collateral: the retired 248 form joins the negatives
# ladder + the live expectation flips to the s188 form (252).
def extend_negatives_ladder() -> None:
    global flips
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")
    if "`tests/page-layout.test.ts`, 252 checks\"," in text and "Session-188: the retired 248 form" in text:
        print("  no-op  [docs-counts §5.6 negatives ladder] already the s188 form")
        return
    anchor = (
        "    expect(skill).not.toContain(\"`tests/page-layout.test.ts`, 245 checks\");\n"
        "    expect(skill, \"the §5.6 line must carry the live line + check counts\").toContain(\n"
        "      \"test-pinned module (1718 lines; `tests/page-layout.test.ts`, 248 checks\",\n"
        "    );"
    )
    assert text.count(anchor) == 1, "the §5.6 negatives-ladder anchor must be unique"
    replacement = (
        "    expect(skill).not.toContain(\"`tests/page-layout.test.ts`, 245 checks\");\n"
        "    // Session-188: the retired 248 form joins the negatives ladder (the\n"
        "    // walk61 settings-tabs + rail/leads round: the session-188 battery\n"
        "    // +4 born-green pins in page-layout [the walk61 decode freeze + the\n"
        "    // three construction freezes] + the NEW D-188a1 retired-block pin\n"
        "    // in docs-counts, the checks 248->252; the MODULE line count 1718\n"
        "    // HELD — the zero-fix round, page-layout.ts untouched).\n"
        "    expect(skill).not.toContain(\"`tests/page-layout.test.ts`, 248 checks\");\n"
        "    expect(skill, \"the §5.6 line must carry the live line + check counts\").toContain(\n"
        "      \"test-pinned module (1718 lines; `tests/page-layout.test.ts`, 252 checks\",\n"
        "    );"
    )
    text = text.replace(anchor, replacement, 1)
    p.write_text(text, encoding="utf8")
    flips += 1
    print("  flip   [docs-counts §5.6 negatives ladder] the 248 retired form added + the live expectation 252")


extend_negatives_ladder()

print(f"\ncount-ladder-188: {flips} flip(s) applied; all sites verified unique-anchor.")
