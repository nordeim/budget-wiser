# Session 242 — Session 114 summary

## What shipped

Commit `e516027` on `main` (pushed + remote-verified, the SSH wrapper
per the runbook, the operator key shredded after use):

- **The rotation (114-c):** the profile + settings Data-tab family
  LIVE re-walk — the fourth un-walked family (after the login s111,
  dialog s112, and menu s113 walks). The scout eliminated the chrome
  re-walk candidate on principle (the sidebar/topbar ride every pixel
  sweep at all four viewports every session — the drift gates already
  are its standing live walk) and settled the Data-tab download axis
  in one pass (the three CSV templates download md5-identical on both
  apps; the reference's zero-data exports are empty files — the s26
  verification re-confirmed).
- **The walk's verdict:** the family is in near-complete live parity —
  every /Profile geometry axis byte-identical at both widths, every
  computed style equal, and the interaction battery (the camera click
  opening the file chooser, the upload round-trip with its toast, the
  unconditional save with its PATCH and 500ms reload) behaving
  identically on both apps. The Data tab's cards compute byte-equal
  with the tablist-to-panel gap at 24 on both.
- **D-114a1:** the Danger Zone description re-pinned — the reference's
  current line carries `text-sm` (14px/20px, a 240px card); ours
  rendered the bare class at 16px/24px in a 244px card. One class
  joined `SETTINGS_DANGER.desc`; the post-fix card byte-matches the
  reference at both widths.
- **D-114a2:** the profile email/role input ids re-pinned — the
  reference's bare `email`/`role` pairs restored over our defensive
  `profile-email`/`profile-role` (no collision existed).
- **D-114a3:** the interaction battery frozen — two new unit pins
  (the id construction + the camera/file-input wiring, both in
  profile-family-parity) + the upload and save round-trip expects
  inside the existing /Profile e2e test (the census stays 137).

## The count ladder

109 files / **1948** unit checks (+2) / 137 e2e checks (unchanged) /
badge **2085** / SKILL **v1.111.0** / the page-layout census row
1559 → 1566.

## The TDD ladder

RED-1: 17 failed | 50 passed (67) — the three src-dependent failures
plus the fourteen docs-counts family, stash-proven at 65 native + 2
new its. GREEN: 109/1948 with one in-flight re-anchor (the README
file-tree site) and — a first — the census literal drafted at 1566
landing at 1566 exact. RED-2: both faces proven by name.

## The e2e lessons (both new genus, both documented)

1. **The state-pollution genus:** the new test's save persisted
   `photoUrl` on the shared e2e user, breaking the later upload tests'
   clean-state assumptions in the full run (they passed in isolation).
   Fixed with a cleanup seam — the test restores the user through the
   same PATCH endpoint it just verified.
2. **page.request bypasses the page's network layer:** its responses
   are invisible to `waitForResponse`; assert on the response object
   directly. The first cleanup draft timed out exactly there.

Plus the documented S72-P2 load-sensitive flake (passing in
isolation; the re-run 137/137).

## The gate

lint 0/0 · tsc 0 · 1948/1948 unit · build · 137/137 e2e · the four
drift sweeps CLEAN (no re-baselining) · the closing census MATCH.
The captures 184–187 VLM-verified 4/4 × 4 with zero adjudications —
the Danger description read off the pixels at "a small font size,
visually consistent with the description text found in the other
cards."

## Standing requirements verified along the way

The `.env` DB contract (`DATABASE_URL="file:../db/custom.db"` at the
repo root), the Vitest + Playwright suites, the sitemap/SEO layer
(live 6/6), the mobile-nav drawer battery (10/10 exit 0), the
`.env.example` matching the codebase, the skills/ exclusion, and the
main-only push discipline.
