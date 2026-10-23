#!/usr/bin/env python3
"""skill-head-175.py — the SKILL frontmatter head surgery (the s175 layer).

The L-169c3 form: the verified-single guard (the live head exists exactly
once). The demoted s174 layer keeps its SHIP-TIME counts (2717/192) in
its own comment block (the s171-fix precedent — never inside another
wrapper). Idempotent: a re-run is a verified no-op. Also bumps the
frontmatter version (1.171.0 -> 1.172.0) + the H1 lockstep.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

S175_MARKER = "project_state: 2726 unit checks + 192 e2e checks green; the session-175 layer ("

if S175_MARKER in text:
    print("  no-op  [SKILL head] the s175 layer already live")
else:
    LIVE_MARKER = "project_state: 2717 unit checks + 192 e2e checks green; the session-174 layer ("
    live_count = text.count(LIVE_MARKER)
    assert live_count == 1, f"the live s174 head marker found {live_count} times"

    # 1) extract the live s174 line
    start = text.index(LIVE_MARKER)
    end = text.index("\n", start)
    live_line = text[start:end]

    # 2) the demoted block — the s174 layer keeps its ship counts (2717/192)
    #    in its OWN comment wrapper (the s171-fix precedent)
    demoted_block = (
        "<!-- retired session-174 layer (comment-demoted at session-175 — the house\n"
        "     single-key form; the s141/s143/s165/s166/s167/s168/s169/s170/s171/\n"
        "     s172/s173 layers sit demoted above it):\n\n"
        + live_line
        + "\n-->\n\n"
    )

    # 3) the new s175 live layer
    S175_LAYER = (
        "project_state: 2726 unit checks + 192 e2e checks green; the session-175 layer "
        "(THE RESPONSE-SIDE WIRE-CONTRACT FAMILY — the READ half; the post-174 audit "
        "round, its rotation trigger THE OWNER'S NEWEST COMMITS [f5f96d6: the "
        "re-validated comparative evaluation report — neo-crm stays #1 at 8.70, the "
        "quality score 8.0 -> 8.5, 'the three flagged costs were all retired by "
        "session-174 within hours, exactly the §9.2 graft list' — + the "
        "skills/web-application SKILL v1.1.0 + the NEW web-application-engineering "
        "sibling v1.1.0 carrying the re-validation lessons; the baseline gate GREEN "
        "at the exact s174 ship state on a fresh clone: lint 0/0 · tsc 0 · 138/2717 · "
        "build · smoke 14/14 · e2e 192/192 · probe:ref STABLE (bundle md5 46bc2d9c) · "
        "the desktop + phone sweeps CLEAN live · the mobile drawer GREEN at 390x844 · "
        "the Tailwind v4 state clean · sitemap 11 routes + robots + manifest standing · "
        "census MATCH; the audit's READ-side census verified the types<->wire "
        "agreement across all six list entities + the me/login carriers — ZERO live "
        "defects]: THE RESPONSE-SIDE WIRE-CONTRACT FAMILY [the s371 close's named "
        "candidate — the request side got its Zod seam (s163/166) + property family "
        "(s173 P-h...P-m); the READ side — what ok(rows) actually ships to the client "
        "store — had NO battery: the wire shapes rode entirely on the e2e's RENDERED "
        "output, so a wire-shape regression that keeps the UI rendering would land "
        "silently; the round states the READ-side invariants as named properties + "
        "source pins: P-r the entity wire round-trip (for every one of the six "
        "entities, a ROUTE-EXACT row — the include shapes the GET list routes "
        "declare, Dates as Date objects, nulls where the schema allows — survives "
        "the wire serialization verbatim: scalars unchanged, every Date as its exact "
        "toISOString() form, nulls PRESENT (the ?? fallback chains), the key set "
        "exact (no field dropped), the joined shapes intact) + P-s the envelope pair "
        "contract (ok()'s wire form is exactly {ok: true, data} with the payload "
        "passed through UNTOUCHED beyond JSON's own canonicalization; fail()'s wire "
        "form carries {ok: false, error: {code, message}} verbatim — the toast's "
        "message survives the wire; the s35/s42 envelope doctrine as a property, "
        "driven through the REAL helpers — tests/parse-body.test.ts proves the "
        "@/lib/api import chain works in vitest)] + THE READ-HALF SOURCE PINS "
        "[tests/crud-zod-seam.test.ts grows +5 — the ROUTE-side suite's other half: "
        "the five include-carrying routes' exact include select sets (the joined "
        "wire shapes the client templates render against) · the six list routes' "
        "orderBy contracts · every GET answers through the envelope (the s42 "
        "doctrine — findMany feeds return ok) · opportunities ships RAW rows, no "
        "include (the s31 second-deal-model: owner is a NAME string) · auth/me "
        "ships the full SessionUser shape (photoUrl included — the canonical user "
        "carrier; the login response's slim 5-field form has ZERO consumers — the "
        "login card reads only body.ok, documented divergence, not a defect)]; the "
        "TDD ledger: 1 RED face at birth (the fc.jsonObject -> fc.jsonValue "
        "fast-check 4.x API calibration catch — the s172/s173 live-caught lineage) "
        "+ 8 born-green (the contract-freeze pins over working code — the s173 "
        "P-p/P-q precedent); the count ladder 2717 -> 2726 (+9: property +4 + "
        "crud-zod-seam +5) · SUITES 138 HELD (the ADR-017 one-suite doctrine) · "
        "E2E 192 HELD (the round is test-only — NO product code touched) · badge "
        "2909 -> 2918 (count-ladder-175.py, assert-first, idempotent, unique-anchor "
        "— the re-run a verified 0-flip no-op, 21 flips) + the collateral re-anchors "
        "(the PAD §11 property.test.ts row re-censused 723 -> 998 lines — the "
        "inventory-census live-read catch again · the dialog-geometry CLAUDE "
        "lockstep carriers [2717 -> 2726, the retired forms joining the negatives "
        "ladder] · the docs-counts constants + the lineage comment); the docs leg "
        "(the AGENTS Session-175 section · the PAD ADR-020 [the wire-contract "
        "doctrine] + the session-175 inventory row + the §11 re-anchor · the CLAUDE "
        "property-pyramid extension [the READ-half join] · the README Tested row + "
        "the badge · this s175 head layer [the s174 layer comment-demoted at its "
        "ship counts] · the plan doc docs/plans/2026-10-24-session175-response-"
        "side-wire-contract-family.md); THE MUTATION-PROOFS (the planted include "
        "regression — the contacts owner select lost avatarColor -> exactly 1 RED, "
        "the include-pin · the planted envelope regression — ok()'s wire form grew "
        "a third key -> exactly 1 RED, the P-s key-set pin; both reverted -> GREEN) "
        "+ THE STASH-PROOF (the round's test files stashed alone -> the suite "
        "returns to exactly 138/2717; restored -> 2726) + THE TEST-ONLY PROOF (the "
        "round touched no component, no page, no className, no route — the standing "
        "legs re-verified at the audit leg: the drawer · probe:ref STABLE · the "
        "sweeps CLEAN — the parity verdict holds, the reference unchanged since "
        "the s168 fingerprint); the deferral register (the hosted-CI port [§9.3 #2] "
        "DEFERRED with rationale — the owner's own newest doctrine, "
        "web-application-engineering v1.1.0 §1: 'The Local Gate is the Only Gate: "
        "No hosted CI is trusted', + runner-side execution unobservable from this "
        "sandbox; the doc-size restructure [N-1] owner-level; the OTP-at-rest item "
        "[§9.3 #6] ALREADY SATISFIED — verificationCodeHash scrypt [s21] + "
        "resetToken SHA-256 [s164], the report's parenthetical understated it; "
        "recharts 3.x [N-3] its own rotation); THE VERIFICATION: lint 0/0 · tsc 0 · "
        "138/2726 unit · build (the type-gate artifact) · smoke 14/14 · e2e 192/192 "
        "· db census MATCH) + beneath it 2717 unit checks + 192 e2e checks green; "
        "the session-174 layer (THE TYPE-GATE HARDENING + THE FULL-STRICT FLIP + "
        "THE SINGLE LOCKFILE — the post-173 audit round)"
    )

    new_text = text.replace(live_line, demoted_block + S175_LAYER, 1)

    # 4) the frontmatter version bump (1.171.0 -> 1.172.0)
    assert new_text.count("version: 1.171.0") == 1, "the frontmatter version anchor must be unique"
    new_text = new_text.replace("version: 1.171.0", "version: 1.172.0", 1)

    # 5) the H1 lockstep
    assert new_text.count("# NEO CRM — Engineering Skill (SKILL.md v1.171.0)") == 1, "the H1 anchor must be unique"
    new_text = new_text.replace(
        "# NEO CRM — Engineering Skill (SKILL.md v1.171.0)",
        "# NEO CRM — Engineering Skill (SKILL.md v1.172.0)",
        1,
    )

    SKILL.write_text(new_text, encoding="utf8")
    print("  surgery [SKILL head] the s175 layer live + v1.172.0 + H1 lockstep")

print("skill-head-175: done.")
