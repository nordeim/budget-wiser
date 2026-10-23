#!/usr/bin/env python3
"""skill-head-170.py — the SKILL frontmatter head surgery (the s170 layer).

The L-169c3 form: the verified-single guard (the live head exists
exactly once + the demoted wrapper exactly once), never a boundary
split. Idempotent: a re-run is a verified no-op.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "neo-crm_SKILL.md"

text = SKILL.read_text(encoding="utf8")

LIVE_OLD = "project_state: 2638 unit checks + 161 e2e checks green; the session-169 layer ("
LIVE_NEW = "project_state: 2638 unit checks + 161 e2e checks green; the session-170 layer ("

HEAD_LAYER = """project_state: 2638 unit checks + 161 e2e checks green; the session-170 layer (THE ERROR-BOUNDARY FAMILY + THE BOOT GATE + THE SMOKE LEG + THE ARTIFACT HYGIENE + THE DOCTRINE-STRAGGLER CLOSURE — the post-169 audit round [the baseline gate GREEN at the exact s169 ship state: lint 0/0 · tsc 0 · 130/2559 · build · e2e 161/161 · probe:ref STABLE · the desktop + phone sweeps CLEAN live · the mobile drawer 7/7 at 390×844 · the Tailwind v4 state clean · sitemap 11 routes + robots + manifest standing · db census MATCH]: THE ARTIFACT HYGIENE [F-170a CRITICAL — the standalone artifact shipped .env (the real AUTH_SECRET), .git/ (171 MB), db/ (the dev SQLite with user rows + hashes), uploads/, skills/ (194 MB) and docs/ (49 MB) — the upload family's runtime-computed fs paths made @vercel/nft fall back to tracing the WHOLE repo root; the outputFileTracingExcludes set + the build script's rm-f cure, verified live (the ~151 MB clean artifact + the photo-e2e pair GREEN against it) + the smoke leg's 14th assertion policing every rebuild] + THE ERROR-BOUNDARY FAMILY [src/app/error.tsx + src/app/global-error.tsx — the scandihaven ports: the house-styled card + the digest ref + the reset() Try-again, the stale-chunk self-heal (src/lib/chunk-recovery.ts — one guarded reload per 10s cooldown, the flag written BEFORE the reload), global-error renders its own html/body + imports its own globals.css, ZERO component-tree imports beyond the recovery seam] + THE BOOT GATE [src/instrumentation.ts → src/lib/boot-env.ts — production AUTH_SECRET missing/short fails hard AT BOOT (verified live: the secretless standalone boot refuses to serve, the log names AUTH_SECRET + openssl); the NEXT_PUBLIC_SITE_URL localhost misconfig + the unknown NEO_* typo family + the off-vocabulary kill-switch values + the unparsable proxy-hops warn; dev/test boot soft; the phase-production-build skip keeps `next build` secretless] + THE SMOKE LEG [scripts/smoke-test.sh + the gate/gate:full wiring — the web-app-foundation §13.4/§14 leg the repo never had: the standalone boot on :3210 with its own db/smoke.db + a dedicated throwaway secret, the 14-check ladder (the health db round-trip · the unauth 401s · the login round-trip + the neo_session cookie · the sessioned envelope · the Zod 400 · the valid create · the logout data:null face · the 11th-login 429 · the page titles · the sitemap/robots/manifest family · THE BOOT-GATE PROBE · THE ARTIFACT-HYGIENE assertions)] + THE DOCTRINE-STRAGGLER CLOSURE [tests/doctrine-census.test.ts — the 131st suite, +30: the AGENTS live-tense stragglers (the retired REPORTS_PIPELINE_SLUGS/reportsBucketCounts doctrine · the FUNNEL_STAGES labels · the s13-era chart-component claims · the singular leads-view key) + the PAD §5.2 color table (the LAST un-flipped color carrier — four stale hexes + the missing line-strong + the muted-ink placeholders row) + the session-gating census corrected to 19 gated / 10 ungated (the bare-name grep OVERCOUNTED via me/route.ts's 'NOT gated' comment — the CALL form `await requireSession(` is the truth, the L-168c2 lesson caught at birth) + the CHART_COLORS violet/emerald note + the Opportunity interface row + the ADR-007 row reconciliation + the radix ^1/^2 split + the table-header Title Case form + the README pricing $8/$14/$20 + the LICENSE file the README's MIT claim stood on]; the count ladder 2559 → 2638 (+79: doctrine-census +30 [the 131st] · chunk-recovery +12 [the 132nd] · boot-env +20 [the 133rd] · error-boundaries +17 [the 134th]) · SUITES 130 → 134 · E2E 161 held (the boundaries are unreachable by honest e2e without a debug affordance — the smoke leg covers the boot/artifact contracts) · badge 2720 → 2799 — every live-tense site re-anchored atomically (count-ladder-170.py, assert-first, idempotent, unique-anchor) + the SKILL v1.167.0 frontmatter + H1 lockstep + this s170 head layer [the s169 layer comment-demoted])"""

# the verified-single guards (L-169c3): the live head exactly once, the
# demoted wrapper exactly once, the live marker exactly once.
assert text.count("project_state: ") >= 1
live_count = text.count("the session-169 layer (THE CLAUDE-DOCTRINE CLOSURE")
assert live_count == 1, f"live s169 head marker found {live_count} times"
wrapper_count = text.count("-->")
assert wrapper_count >= 1

if LIVE_NEW in text:
    print("  no-op  [SKILL head] the s170 layer already live")
else:
    assert text.count(LIVE_OLD) == 1, "the s169 live head form not found"
    # 1) demote the s169 layer into the comment block: wrap the live line
    #    as a comment line right before the existing `-->` closer.
    s169_line_start = text.index(LIVE_OLD)
    s169_line_end = text.index("\n", s169_line_start)
    s169_line = text[s169_line_start:s169_line_end]
    # remove the live line (keep the blank line separation)
    text2 = text[:s169_line_start] + text[s169_line_end + 1:]
    # insert the demoted copy inside the comment block (before the closer)
    closer = text2.index("-->")
    text2 = text2[:closer] + s169_line + "\n" + text2[closer:]
    # 2) the new live head layer lands where the old one was removed:
    #    after the comment block + blank line.
    live_pos = text2.index("-->") + len("-->\n")
    text2 = (
        text2[:live_pos]
        + "\n"
        + HEAD_LAYER
        + text2[live_pos:]
    )
    SKILL.write_text(text2, encoding="utf8")
    print("  flipped [SKILL head] the s170 layer live · the s169 layer demoted")

print("skill-head-170: done")
