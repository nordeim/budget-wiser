#!/usr/bin/env python3
"""skill-head-174.py — the SKILL frontmatter head surgery (the s174 layer).

The L-169c3 form: the verified-single guard (the live head exists exactly
once). The demoted s173 layer keeps its SHIP-TIME counts (2712/192) in
its own comment block (the s171-fix precedent — never inside another
wrapper). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.170.0 -> 1.171.0) + the H1 lockstep.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S174_MARKER = "project_state: 2717 unit checks + 192 e2e checks green; the session-174 layer ("

if S174_MARKER in text:
    print("  no-op  [SKILL head] the s174 layer already live")
else:
    LIVE_MARKER = "project_state: 2712 unit checks + 192 e2e checks green; the session-173 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s173 head marker found {live_count} times"

    # 1) extract the live s173 line
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted block — the s173 layer keeps its ship counts (2712/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-173 layer (comment-demoted at session-174 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/s172\n"
        "     layers sit demoted above it):\n\n"
        + live_line
        + "\n-->\n\n"
    )

    # 3) the new s174 live layer
    S174_LAYER = (
        "project_state: 2717 unit checks + 192 e2e checks green; the session-174 layer "
        "(THE TYPE-GATE HARDENING + THE FULL-STRICT FLIP + THE SINGLE LOCKFILE — the "
        "post-173 audit round, its rotation trigger THE REPO'S OWN NEWEST ARTIFACTS "
        "[commit 25f1847: skills/web-application/SKILL.md v1.0.0 — the four-sibling "
        "family distillation — + skills/web-application/codebase-evaluation-report.md, "
        "the comparative audit that ranks neo-crm #1 at 8.55 while naming its defect "
        "register; the report's §9.2 graft list prescribes exactly the three moves "
        "this round lands; the code-wins rule runs in reverse: the CODE disagreed "
        "with the repo's own distilled doctrine — the code is what got fixed; the "
        "baseline gate GREEN at the exact s173 ship state: lint 0/0 · tsc 0 · "
        "137/2712 · build · smoke 14/14 · e2e 192/192 · probe:ref STABLE · the "
        "desktop + phone sweeps CLEAN live · the mobile drawer 7/7 at 390×844 · the "
        "Tailwind v4 state clean · sitemap 11 routes + robots + manifest standing · "
        "census MATCH]: THE TYPE-GATE HARDENING [F-174a — next.config.ts's "
        "typescript.ignoreBuildErrors: true RETIRED: the build IS the type gate now "
        "(the zero-balance graft); under the old posture a planted type error "
        "compiled GREEN into the deployable artifact — THE GATE-PROOF ran the SAME "
        "plant both ways live (swallowed under ignoreBuildErrors: true, build FAILED "
        "under the hardened form) — the type gate had ridden only on the manual "
        "`bun run typecheck` step, a skipped-command hazard] + THE FULL-STRICT FLIP "
        "[F-174b — tsconfig.json's noImplicitAny: false escape hatch RETIRED (the "
        "digma graft): full TS strictness; the flip probe surfaced exactly THREE "
        "implicit-any stragglers repo-wide — scripts/sweep.ts's inline union-find "
        "twin (find = (k) · union = (x, y) against a bare new Map()) — now typed "
        "verbatim like its FULLY-TYPED pure seam twin at line 607; the entire src/ "
        "tree was ALREADY clean under full strictness] + THE SINGLE LOCKFILE "
        "[F-174c — package-lock.json RETIRED from the repo root: one package "
        "manager (bun), one lockfile (bun.lock) — the s61/s62 §16ba npm-world-"
        "parity rule superseded by the repo's own new skill's Appendix A lesson 14 "
        "('Two lockfiles in one repo is a reproducibility bug'); the npm-world path "
        "(install_packages.sh) installs by package NAME from the registry — it "
        "never consumed the lockfile; the outputFileTracingExcludes entry STAYS as "
        "the defensive tripwire]; the source-pin battery [tests/type-gate.test.ts — "
        "the 138th suite, +5: the build-is-the-type-gate pin (no ignoreBuildErrors "
        "in any form, comment-stripped) + the full-strict pin (strict true, no "
        "noImplicitAny override) + the typed union-find pin (the s93 F-A family: "
        "the sweep tool's type posture is itself a fresh-clone gate surface) + the "
        "single-lockfile pin + the gate-chain freeze pin (typecheck stays BEFORE "
        "build — the §15 fast-gates-first order holds even now that the build also "
        "type-gates: the manual step remains the FASTER signal)]; RED at birth: 4 "
        "failing (the three config pins + the typed-arms pin — each pointing at "
        "its live defect) + 1 born-green (the gate-chain freeze); the count ladder "
        "2712 → 2717 (+5) · SUITES 137 → 138 (the type-gate file) · E2E 192 HELD "
        "(the round is config-only, no visual surface touched) · badge 2904 → 2909 "
        "— every live-tense site re-anchored atomically (count-ladder-174.py, "
        "assert-first, idempotent, unique-anchor — the re-run a verified 0-flip "
        "no-op) + the collateral re-anchors (the PAD §11 next.config.ts row "
        "re-censused 93 → 99 lines — the s174 comment grew it — the "
        "inventory-census live-read catch again · the dialog-geometry CLAUDE "
        "lockstep carriers [2712 → 2717, the retired forms joining the negatives "
        "ladder] · the docs-counts constants + the two lineage comments); the docs "
        "leg (the AGENTS Session-174 section + the gate-order paragraph's "
        "s174 re-anchor · the PAD ADR-019 [the build-is-the-type-gate doctrine] + "
        "the session-174 inventory row + the stack-table strict row + the pre-ship "
        "checklist line + the §11 re-anchor · the SKILL v1.171.0 frontmatter + H1 "
        "lockstep + this s174 head layer [the s173 layer comment-demoted at its "
        "ship counts] + the three config-table rows [§2 stack + §3.2 next.config "
        "+ §3.2 tsconfig] · the CLAUDE gate-order mention + the TypeScript bullet "
        "· the README Tested row + the badge + the suite list's type-gate join "
        "· the plan doc docs/plans/2026-10-23-session174-type-gate-hardening-"
        "build-fails-on-type-errors-single-lockfile.md); the mutation-proof (the "
        "planted badge regression 2909 → 2904 → exactly 1 RED → reverted → GREEN) "
        "+ THE STASH-PROOF (the three config moves reverted alone → exactly the "
        "type-gate pins RED → restored → GREEN) + THE GATE-PROOF (the planted "
        "type error: build FAILED under the new posture, the SAME plant swallowed "
        "under the restored ignoreBuildErrors — the defect demonstrated live, not "
        "asserted); THE CONFIG-ONLY PROOF (the round touched no component, no "
        "page, no className — the standing legs re-verified at the audit leg: the "
        "drawer 7/7 · probe:ref STABLE · the sweeps CLEAN — the parity verdict "
        "holds, the reference unchanged since the s168 fingerprint); THE "
        "VERIFICATION: lint 0/0 · tsc 0 (under FULL strictness) · 138/2717 unit · "
        "build (the hygienic artifact — now the type gate TOO) · smoke 14/14 · "
        "e2e 192/192 · db census MATCH) + beneath it 2712 unit checks + 192 e2e "
        "checks green; the session-173 layer (THE INJECTABLE CLOCK SEAM + THE "
        "RATE-LIMIT WINDOW PROPERTY FAMILY + THE ZOD ROUND-TRIP PROPERTY FAMILY — "
        "the post-172 audit round)"
    )

    new_text = text.replace(live_line, demoted_block + S174_LAYER, 1)

    # 4) the frontmatter version bump (1.170.0 -> 1.171.0)
    assert new_text.count("version: 1.170.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.170.0", "version: 1.171.0", 1)

    # 5) the H1 lockstep
    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.170.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.170.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.171.0)",
        1,
    )

    SKILL.write_text(new_text, encoding="utf8")
    print("  surgery [SKILL head] the s174 layer live + v1.171.0 + H1 lockstep")

print("skill-head-174: done.")
