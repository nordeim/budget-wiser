#!/usr/bin/env python3
"""count-ladder-187.py — the session-187 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor): every site is
asserted to carry EXACTLY ONE of the accepted old forms before the
flip; a site already carrying the new form is a verified no-op; a site
carrying NONE is a hard error (the anchor drifted — re-derive, never
guess).

The full ladder: UNIT 2769 -> 2773 (+4 — the walk60 battery in
tests/page-layout.test.ts [the walk60 decode freeze — the two-app
profile + Data-tab OPEN ledgers at both axes + the REAL Tab drives ·
the profile avatar family construction freeze (the genuine battery
gap: the s13 pins held the ROOT + the icon class, never the fallback's
tag or the color carrier — the stock DIV fallback + the ON-SVG color
at BOTH sites) · the Data-tab list-body rhythm freeze (the genuine gap:
the s14/s26/s83 pins held the labels/margins/icon, never the v4-vs-v3
rhythm arm — the D-187a3 carrier)] + the NEW D-187a1 file-input
construction pin in tests/profile-photo.test.ts [the id + the
retired explicit tabIndex]). SUITES 138 HELD · E2E 192 — re-verified
this session (the round's product-code touches: the D-187a1
file-input id + tabIndex retirement [profile-page.tsx] · the D-187a2
stock DIV fallback + on-svg color at BOTH avatar sites
[profile-page.tsx + page-layout.ts's avatarIcon] · the D-187a3
list-body v3-semantics retirement [page-layout.ts's SETTINGS_DATA
listBody — space-y-2 -> [&>*+*]:mt-2, the v4 flip's INLINE-FLOW
variant]; the MODULE line count 1701 -> 1718 [the D-187a2/a3 comment
growth +17]) · badge 2961 -> 2965.

Plus the collateral: the F-106a1 layer-axis pin (the s187 layer live,
the s186 layer demoted beneath it at 2769/192) + the SKILL §5.6 census
sites (245 -> 248 checks; the MODULE lines 1701 -> 1718 — the s187
census: the D-187a2/a3 cure comments grew the module +17) + the
s186-era live-tense RED-first arithmetic site (261 -> 264).

NOTE: the first pass of this script carried the +3 arithmetic (2772 /
badge 2964) before the +4 truth (the D-187a1 pin is a NEW test, not a
re-anchor); this corrected form accepts BOTH the s186-era forms
(2769) and the intermediate forms (2772/2964) as old forms — the docs
land on 2773/2965 either way.
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
    ["const UNIT = 2769;", "const UNIT = 2772;"],
    "const UNIT = 2773;",
    1,
    "docs-counts UNIT constant",
)


def fix_unit_lineage() -> None:
    """The first-pass lineage comment carried the +3 arithmetic; the
    corrected pass rewrites it to the +4 truth (idempotent)."""
    global flips
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")
    bad_head = "// Session-187: 2769 -> 2772 (+3 — THE PROFILE PHOTO-UPLOAD"
    good_head = "// Session-187: 2769 -> 2773 (+4 — THE PROFILE PHOTO-UPLOAD"
    if good_head in text:
        print("  no-op  [docs-counts UNIT lineage comment] already the +4 truth")
        return
    assert text.count(bad_head) == 1, "the intermediate +3 lineage comment must be unique"
    text = text.replace(bad_head, good_head, 1)
    text = text.replace(
        "// Session-187: 2769 -> 2772 (+3 — THE PROFILE PHOTO-UPLOAD\n"
        "// FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS DATA-TAB\n"
        "// SIBLING [walk60 — the s187 battery in\n",
        "// Session-187: 2769 -> 2773 (+4 — THE PROFILE PHOTO-UPLOAD\n"
        "// FAMILY FOCUS/OPEN INTERIOR WALK + SETTINGS DATA-TAB\n"
        "// SIBLING [walk60 — the s187 battery (+ the NEW D-187a1\n"
        "// file-input construction pin in profile-photo.test.ts) in\n",
        1,
    )
    p.write_text(text, encoding="utf8")
    flips += 1
    print("  flip   [docs-counts UNIT lineage comment] +3 -> the +4 truth")


fix_unit_lineage()

# --- tests/docs-counts.test.ts — the F-106a1 layer-axis pin -----------------
flip(
    "tests/docs-counts.test.ts",
    ["project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-186 layer`,"],
    "project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-187 layer`,",
    1,
    "F-106a1 first-layer axis",
)
flip(
    "tests/docs-counts.test.ts",
    ['"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s185 layer now beneath the s186 head)",'],
    '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s186 layer now beneath the s187 head)",',
    1,
    "F-106a1 second-layer comment",
)
flip(
    "tests/docs-counts.test.ts",
    ['"+ beneath it 2766 unit checks + 192 e2e checks green; the session-185 layer (THE QUICK-LOG DIALOG OPEN-STATE INTERIOR WALK + BY-TYPE FOOTER RE-WALK",'],
    '"+ beneath it 2769 unit checks + 192 e2e checks green; the session-186 layer (THE SETTINGS PICKLIST-EDITOR OPEN-STATE INTERIOR WALK + DEFAULTS-TAB SELECTS SIBLING",',
    1,
    "F-106a1 second-layer axis",
)

# --- tests/dialog-geometry-parity.test.ts — the CLAUDE lockstep carriers ---
# The first pass left the carriers at 2772; the corrected pass demotes
# 2772 to the negatives ladder and carries 2773 live.
flip_pair(
    "tests/dialog-geometry-parity.test.ts",
    [
        (
            'expect(claude).toContain("Unit (Vitest, 2772 checks)");',
            'expect(claude).not.toContain("Unit (Vitest, 2772 checks)");\n'
            '    expect(claude).toContain("Unit (Vitest, 2773 checks)");',
        ),
        (
            'expect(claude).toContain("(currently 2772)");',
            'expect(claude).not.toContain("(currently 2772)");\n'
            '    expect(claude).toContain("(currently 2773)");',
        ),
        (
            'expect(claude).toContain("Vitest unit suites (2772 checks)");',
            'expect(claude).not.toContain("Vitest unit suites (2772 checks)");\n'
            '    expect(claude).toContain("Vitest unit suites (2773 checks)");',
        ),
        (
            'expect(claude).toContain("`bun run test` (2772)");',
            'expect(claude).not.toContain("`bun run test` (2772)");\n'
            '    expect(claude).toContain("`bun run test` (2773)");',
        ),
    ],
    "dialog-geometry CLAUDE carriers",
)

# --- README.md --------------------------------------------------------------
flip("README.md", ["tests-2961%20checks", "tests-2964%20checks"], "tests-2965%20checks", 1, "README badge")
flip("README.md", ["| 🧪 Tested | 2769 Vitest unit checks", "| 🧪 Tested | 2772 Vitest unit checks"], "| 🧪 Tested | 2773 Vitest unit checks", 1, "README Tested row")
flip("README.md", ["# 138 Vitest suites (2769 checks)", "# 138 Vitest suites (2772 checks)"], "# 138 Vitest suites (2773 checks)", 1, "README tree tests line")
flip("README.md", ["# 2769 Vitest unit checks", "# 2772 Vitest unit checks"], "# 2773 Vitest unit checks", 1, "README commands unit line")

# --- AGENTS.md --------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (2769 checks)", "Unit tests (2772 checks)"], "Unit tests (2773 checks)", 1, "AGENTS commands unit row")
flip("AGENTS.md", ["`bun run test` (2769) →", "`bun run test` (2772) →"], "`bun run test` (2773) →", 1, "AGENTS gate-order unit")

# --- CLAUDE.md --------------------------------------------------------------
flip("CLAUDE.md", ["`bun run test` (2769) → `bun run build` → `bun run test:e2e` (192)", "`bun run test` (2772) → `bun run build` → `bun run test:e2e` (192)"], "`bun run test` (2773) → `bun run build` → `bun run test:e2e` (192)", 1, "CLAUDE gate-order line")
flip("CLAUDE.md", ["Vitest unit suites (2769 checks)", "Vitest unit suites (2772 checks)"], "Vitest unit suites (2773 checks)", 1, "CLAUDE commands unit row")
flip("CLAUDE.md", ["**Unit (Vitest, 2769 checks)**", "**Unit (Vitest, 2772 checks)**"], "**Unit (Vitest, 2773 checks)**", 1, "CLAUDE test pyramid unit")
flip("CLAUDE.md", ["the seam (currently 2769)", "the seam (currently 2772)"], "the seam (currently 2773)", 1, "CLAUDE coverage targets")

# --- Project_Architecture_Document.md ---------------------------------------
flip("Project_Architecture_Document.md", ["# 138 Vitest suites — 2769 checks", "# 138 Vitest suites — 2772 checks"], "# 138 Vitest suites — 2773 checks", 1, "PAD tree unit line")
flip("Project_Architecture_Document.md", ["| **Total** | **138** | **2769 unit + 192 e2e** |", "| **Total** | **138** | **2772 unit + 192 e2e** |"], "| **Total** | **138** | **2773 unit + 192 e2e** |", 1, "PAD §7.1 total row")
flip("Project_Architecture_Document.md", ["HEAD: 138 Vitest suites with 2769 checks + 192 e2e", "HEAD: 138 Vitest suites with 2772 checks + 192 e2e"], "HEAD: 138 Vitest suites with 2773 checks + 192 e2e", 1, "PAD §7.1 HEAD line")
flip("Project_Architecture_Document.md", ["`bun run test` — 2769/2769", "`bun run test` — 2772/2772"], "`bun run test` — 2773/2773", 1, "PAD checklist unit")
flip("Project_Architecture_Document.md", ["| `bun run test` | root | 2769 unit checks |", "| `bun run test` | root | 2772 unit checks |"], "| `bun run test` | root | 2773 unit checks |", 1, "PAD §9 commands unit")

# --- neo-crm_SKILL.md --------------------------------------------------------
flip("neo-crm_SKILL.md", ["bun run test         # 2769/2769", "bun run test         # 2772/2772"], "bun run test         # 2773/2773", 1, "SKILL commands unit")
flip("neo-crm_SKILL.md", ["| **unit total** | 138 files | **2769** |", "| **unit total** | 138 files | **2772** |"], "| **unit total** | 138 files | **2773** |", 1, "SKILL Appendix B unit total")
# NOTE: anchored on the LIVE layer's full form — the retired/demoted
# layers keep their OWN ship counts in their comment blocks (the
# s171-fix precedent), so a bare count form would corrupt them (the
# first pass did exactly that; this surgical form is the correction).
flip("neo-crm_SKILL.md",
     ["project_state: 2769 unit checks + 192 e2e checks green; the session-186 layer (",
      "project_state: 2772 unit checks + 192 e2e checks green; the session-187 layer ("],
     "project_state: 2773 unit checks + 192 e2e checks green; the session-187 layer (",
     1, "SKILL head project_state (the LIVE layer form)")

# --- neo-crm_SKILL.md — the §5.6 census collateral ---------------------------
flip(
    "neo-crm_SKILL.md",
    ["`tests/page-layout.test.ts`, 245 checks —"],
    "`tests/page-layout.test.ts`, 248 checks —",
    1,
    "SKILL §5.6 census checks",
)
flip(
    "neo-crm_SKILL.md",
    ["test-pinned module (1701 lines; `tests/page-layout.test.ts`, 248 checks"],
    "test-pinned module (1718 lines; `tests/page-layout.test.ts`, 248 checks",
    1,
    "SKILL §5.6 census MODULE lines",
)
flip(
    "neo-crm_SKILL.md",
    ["the s186 census: the module untouched by the walk59 round [the D-186a1 Pen glyph cure rode settings-page.tsx alone — page-layout.ts test-only, the line count 1701 HELD];"],
    "the s187 census: the module GREW 1701->1718 [the D-187a2/a3 cure comments' growth +17 — the round's product-code touch in page-layout.ts];",
    1,
    "SKILL §5.6 census era",
)
flip(
    "neo-crm_SKILL.md",
    ["the s185 census re-anchored by the 3 walk59 pins)."],
    "the s186 census re-anchored by the 3 walk60 pins).",
    1,
    "SKILL §5.6 census re-anchor",
)
flip(
    "neo-crm_SKILL.md",
    ["**RED-first:** 16 failed | 245 passed (261) at the still-unfixed src"],
    "**RED-first:** 16 failed | 248 passed (264) at the still-unfixed src",
    1,
    "SKILL the s186-era live-tense RED-first arithmetic site",
)

# --- tests/docs-counts.test.ts — the §5.6 + PAD-row negatives-ladder -----
# The first pass landed the s187 forms with the +3 wording; the
# corrected pass rewrites the wording to the +4 truth (idempotent).
def fix_negatives_wording() -> None:
    global flips
    p = ROOT / "tests/docs-counts.test.ts"
    text = p.read_text(encoding="utf8")
    bad = "// walk60 profile-photo-upload + Data-tab round: the session-187 battery\n"
    good = "// walk60 profile-photo-upload + Data-tab round: the session-187 battery\n"
    bad2 = "// +3 born-green pins, the checks 245->248; the MODULE line count\n"
    good2 = "// +3 born-green pins in page-layout + the NEW D-187a1 construction pin\n// in profile-photo, the checks 245->248; the MODULE line count\n"
    if good2 in text:
        print("  no-op  [docs-counts §5.6 negatives wording] already the +4 truth")
        return
    assert text.count(bad2) == 1, "the +3 negatives wording must be unique"
    text = text.replace(bad2, good2, 1)
    p.write_text(text, encoding="utf8")
    flips += 1
    print("  flip   [docs-counts §5.6 negatives wording] +3 -> the +4 truth")


fix_negatives_wording()

print(f"\ncount-ladder-187: {flips} flip(s) applied; all sites verified unique-anchor.")
