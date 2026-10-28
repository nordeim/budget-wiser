# Budget Wise — Session 18 Remediation Plan

**Date:** 2026-10-29 · **Task ID:** 207 · **Branch:** `main` only · **Method:** one code finding remediated with TDD + the evidence refresh (the fifteenth census found the first code drift in five rounds: a 404-title genus invisible to every prior census because no prior round probed a percent-encoded path)

## 1. Audit scope executed (this session)

- Intake: the workspace PERSISTED again — `git pull` sufficed
  (b43baf0 → c86578b, the owner's `docs/session_32.md` transcript commit
  + the owner's two homepage captures, `docs/homepage_top.png` +
  `docs/homepage_middle.png`); the repo delta since the s206 ship verified
  docs-only (three files, zero code). The owner's two homepage PNGs were
  inspected with the VLM and classified: captures of OUR OWN shipped
  landing page (every element answers `src/components/landing/landing-page.tsx`
  — "Every dollar in view.", "Start tracking free", the Features/Preview/
  Pricing/FAQ nav, the "budgetwise.app/Dashboard" preview mockup) —
  transcript artifacts, not a new design signal.
- The five root documents + `docs/session_31.md` +
  `docs/REMEDIATION-PLAN-SESSION-17.md` + `worklog.md` +
  `docs/session_32.md` were re-read and validated against the tree before
  touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-206
  ship state, green on the first pass of the standing environment.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`, no
  `any` leaks, no eval/new Function), `src/middleware.ts` absent +
  `src/proxy.ts` in place (the s201 seam), `skills/` confirmed excluded
  from all four check/test/compile scopes (tsc exclude · eslint ignores ·
  vitest include patterns · playwright testDir), the docs-count lockstep
  verified, and the mandated focus areas each swept clean: the **mobile
  navigation** (the 12-test e2e battery green standalone + the live
  byte-census on BOTH apps during the dual-app diff) and **TailwindCSS v4**
  (the `@custom-variant hover` unwrap, the `--shadow-sm`/`--blur-sm` re-pins,
  the v3 palette re-pin block, the `safe-area-pb` @utility, literal-class
  discipline, no config JS — no v4-family bugs found). The `.env`/`db`
  contract verified (six knobs, `db/` at the repo root, `.env.example`
  tracked at HEAD with identical knob names), the Vitest + Playwright
  suites verified in place with clean config scopes, the SEO surfaces
  verified (sitemap + robots + manifest explicit route handlers), and the
  neo-crm tech-stack pattern reference re-confirmed from the carried
  `neo-crm_SKILL.md`.

## 2. The live re-audit: the FIFTEENTH census — ONE code finding

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **one title-surface genus
  since session 206** (below); every other parity surface answered
  byte-identical: the body census (`[#root, #base44-edit-badge,
  #recharts_measurement_span]`), the shell (nav classes + `main.pb-20
  md:pb-0` + the outer surface wrapper), all four pages (containers
  7xl/5xl/5xl/4xl, titles via FULL navigations), the mobile bottom bar
  byte-identical on every dimension (the bar classes, the `flex
  items-center justify-around py-2` row wrapper, item classes, the ink
  split on the anchor AND its svg, rect y=767 h=77, the four lucide
  w-6/h-6 icons, NO aria-current), the scroll-end clearance (764 ≤ 767
  measured per the e2e contract's lowest-box form on BOTH apps), both
  dialogs (the VALUE-attribute probe answering the s203 genera verbatim —
  `value="health"` for Healthcare, the income-`other` reuse; the
  reference's Income tab keyboard-activated cleanly with the documented
  family swap), the Set Budget dialog (Category/Monthly Limit labels +
  the 0.00 placeholder), the sitemap format + robots.txt, the login card
  (the 4-button OAuth row), the donut geometry (341×280 container /
  200×200 `g.recharts-pie` / 331px legend), and the transaction-row
  anatomy (`flex items-center gap-4 p-4 hover:bg-slate-50
  transition-colors`).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  SEVENTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight
  guard (the gate's build tree removed, Ready in 300ms, health 200 +
  db up, zero reload loops) before the daemonized census boot (the s204
  process-reaper posture; the daemonizer patched this round to take its
  log path from argv per the s206 N-1 standing convention). The local
  census matched on every surface: the shell (with our documented
  body-chrome platform-face genus), the mobile bar byte-identical (+ the
  `aria-current="page"`/nav-landmark superset), the clearance identical
  (764 ≤ 767 both apps), all page titles matching, both dialogs matching
  (our `healthcare`/`other_income` ids + the placeholder option — the
  documented internal-wire genus; our Income tab swaps on click per the
  Radix contract), the SEO surfaces matching (the documented
  lowercase-loc divergence, format byte-matched; manifest 200 — our
  functional superset), and the donut geometry byte-identical
  (341×280 / 200×200 / 331).

### F-1 — the 404 title's percent-encoding genus (HIGH, user-visible)

This round's 404 probe used a `%20` path for the first time
(`/Curl%20Probe%20207%20Test` — every prior census used hyphenated probe
paths), and the two apps answered DIFFERENTLY:

- The reference: `<title>Curl Probe 207 Test | Budget Wise</title>` —
  its platform DECODES the pathname before interpolating/humanizing
  (served-HTML curl-verified; the og:title meta interpolates identically).
- Ours: `<title>Curl%20Probe%20207%20Test | Budget Wise</title>` —
  `src/proxy.ts` stamps `request.nextUrl.pathname` (which preserves the
  percent-escapes) and `notFoundTitle()` humanizes the raw segment
  without decoding.
- The evidence battery (all live-probed on the reference 2026-10-29):
  - `/Curl%20Probe%20207%20Test` → reference "Curl Probe 207 Test |
    Budget Wise" / ours "Curl%20Probe%20207%20Test | Budget Wise"
  - `/About%20Us` → reference "About Us | Budget Wise" (decode → spaces)
  - `/foo%2Dbar` → reference "Foo Bar | Budget Wise" — the decode
    PRECEDES the hyphen split (encoded `%2D` answers the same title as
    a literal hyphen)
  - The 404 BODY quotes the raw encoded path on BOTH apps
    (`The page "Curl%20Probe%20207%20Test" could not be found…`) — the
    decode genus is title-path-only; the quoted-path helper stays
    untouched.
  - Malformed escapes (`/bad%zz%20path`): the reference's platform
    bounces a bare `400 Bad Request` (its CDN's face); ours answers the
    designed 404 — the production-grade posture kept; the fix's decode
    must never throw (raw-segment fallback).
- The nine s196-pinned live-probe cases were all unencoded (plain,
  hyphen-split, last-segment, camelCase, UPPER, trailing-slash) — the
  genus was INVISIBLE to the pins, to every prior census's probe form,
  and to every gate (green tests masking drift: the s196 genus).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface except the 404 title genus: the shell, all four
  pages, the mobile bar, the clearance, both dialogs, all page titles,
  the sitemap + robots + manifest, the login card, the donut geometry,
  the row anatomy.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  db-path seam pinned; `.env.example` tracked at HEAD with identical
  knob names.
- The Vitest + Playwright suites: in place (410/66), config scopes clean.
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence
  (live-verified on the un-daemonized boot, Ready in 300ms).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.

### F — one code finding (remediated this round)

- **(F-1, HIGH) The 404 title's percent-encoding genus** — described
  in §2. Remediated with the decode-before-humanize fix + the never-
  throw guard (§4). The regression ladder: 4 unit pins + 1 e2e case.

### N — informational notes (documentation, not code)

- **(N-1) The og:title platform-templating genus:** the reference's 404
  head also interpolates og:title from its platform's title templating
  (`<meta content="Curl Probe 207 Test | Budget Wise" property="og:title"/>`);
  ours serves the root layout's static `og:title` ("Budget Wise"). A 404
  carries the real 404 status on ours (de-indexed; unfurlers on dead
  links are the only consumer) — the static brand default is the kept
  posture; documented, not remediated.
- **(N-2) The malformed-escape posture genus:** the reference's CDN
  bounces `/bad%zz%20path` with a bare `400 Bad Request`; ours answers
  the designed 404 surface. Ours is the more graceful production
  posture; the fix's raw-segment fallback guard absorbs the same input
  class without throwing. Documented, not remediated.
- **(N-3) The owner's homepage captures:** `docs/homepage_top.png` +
  `docs/homepage_middle.png` verified against the tree — captures of
  our own shipped landing (every element answers
  `src/components/landing/landing-page.tsx`). No action.
- **(N-4) The daemonizer argv convention:** the inherited
  `scripts/daemon-dev.py` (workspace tooling, not repo code) carried
  the s206 hardcoded log path — patched to take the log path from argv
  per the s206 N-1 standing convention (the third consecutive
  captures-consumer true-up; the convention now covers the daemonizer
  too).

## 4. Remediation ToDo (TDD + evidence refresh + ship)

**Phase A — the F-1 fix (TDD: RED → GREEN → verify)**

1. [x] RED: add the percent-encoding pins to
       `tests/not-found-title.test.ts` (a new describe block):
       `%20` → decoded spaces (`/Curl%20Probe%20207%20Test` →
       "Curl Probe 207 Test | Budget Wise", `/About%20Us` →
       "About Us | Budget Wise"); the decode-precedes-hyphen-split
       order (`/foo%2Dbar` → "Foo Bar | Budget Wise"); the
       last-segment rule on encoded paths; the malformed-escape
       raw fallback (`/bad%zz%20path` → "Bad%zz%20path | Budget
       Wise" — never throw). Run → exactly the three decode pins RED
       (the malformed-escape pin guards the fallback through the fix).
2. [x] GREEN: implement `decodeSegment()` in
       `src/lib/not-found-title.ts` (decodeURIComponent with the
       try/catch raw fallback) consumed by `notFoundTitle()` at the
       last-segment level — `notFoundQuotedPath()` UNTOUCHED (the
       body keeps the raw encoded form on both apps). The comment
       cites the live-probe evidence + the session. Run → 13/13 green
       (9 original + the 4 new pins).
3. [x] e2e regression: ONE case added to the 404-surface describe in
       `tests/e2e/app-flows.spec.ts` — `page.goto("/Curl%20Probe%20207%20Test")`
       asserts the decoded title via the poll form + the raw-encoded
       body sibling. Count: 66 → 67.
4. [x] Live verify on the dev server: the `%20` path answers
       `<title>Curl Probe 207 Test | Budget Wise</title>` + the real
       404 status; the `%2D` path → "Foo Bar | Budget Wise"; the
       malformed path → the designed 404 (no throw); the body still
       quotes the raw encoded path; the unencoded census paths
       (`/nonexistent-route-xyz` etc.) unchanged.
5. [x] The unit suite re-run (414/414) + the e2e/mobile-nav batteries
       scheduled on the gate's rebuilt standalone tree (Phase D).

**Phase B — the evidence refresh**

6. [x] The screenshot battery: the 12-frame set recaptured from the live
       dev server (the documented 1512×945 + 390×844 convention) +
       the pixel-diff against the HEAD captures: **9/12
       byte-identical**, the three delta frames each at its documented
       genus (profile-MOBILE at the avatar-jitter genus in its exact
       s202/s203/s205 form, 104 px, bbox (84,255)–(235,377),
       profile-DESKTOP byte-identical this round; both dialog frames at
       the backdrop-blur genus — card crops 37/242,368 + 66/140,224 px
       with the VISIBLE sliver at exactly the s203 counts, 16 px each,
       proven by the luminance depth-check; the remainder sub-visible
       blur noise).
7. [x] The VLM battery: 4 pairs (the census-201 JSON format), **0×
       "Structural Differences: None" — the FOURTH consecutive 0×
       battery**, every flag cross-checked against the round's direct
       byte-census before classification (the savings-badge
       conditional, the donut-segment data state, the platform-badge
       occlusion, the avatar-content genus).

**Phase C — the documentation set**

8. [x] `budget-wiser_SKILL.md` → v1.16.0: the frontmatter version bump +
       the provenance gains the session-207 line + Appendix C gains the
       session-207 row + the Source sessions list gains the 207 entry +
       §1's 404-title contract gains the decode clause + the
       census-probe lesson (probe a %20 path at least once per census).
       Historical rows keep their era's numbers.
9. [x] The PAD → v2.17.0: the revision block records the fifteenth
       census + the F-1 remediation + the count movement 410→414
       unit / 66→67 e2e.
10. [x] The docs-count lockstep: README (414 unit / 67 e2e) +
        AGENTS.md (the proxy-seam decode clause) + CLAUDE.md (test
        pyramid 414/67 + success metrics) — every live-tense count
        site moved together (the dated historical rows keep their
        era's numbers).
11. [x] `docs/session_33.md` (this round's log — Session 21 /
        Task ID 207) + the `worklog.md` entry (Task ID 207, appended,
        never overwritten) + this plan ticked + the execution
        addendum.

**Phase D — ship**

12. [ ] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
        typecheck 0 · 414/414 unit · build · 14/14 smoke · 67/67 e2e
        (CI=1) — the two moved counts must answer exactly.
13. [ ] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
        `test-results/` staged) → commit (atomic, Conventional Commit,
        the message explains why) → push `HEAD:refs/heads/main` via
        `docs/ssh_git_wrapper_v3.py` (the runbook:
        `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — pass
        `--remote` explicitly, the default remote is the OLD repo);
        verify the remote ref; shred the key.

## 5. Risks and guards

- **The fix is title-path-only:** `notFoundQuotedPath()` (the body)
  keeps the raw form — pinned by the existing body pins + the new
  e2e case's body sibling assertions; touching it would drift the
  body genus the reference keeps encoded.
- **The never-throw guard is load-bearing:** the reference's platform
  answers malformed escapes with a bare 400; ours must answer the
  designed 404 — `decodeSegment()`'s try/catch fallback is the guard,
  pinned by the malformed-escape unit test.
- **The count movement is a two-site lockstep:** 410→414 unit (the new
  describe block's pins) / 66→67 e2e (the one regression case); every
  live-tense docs site moves in the SAME commit (the s192/s197
  discipline); the dated historical rows keep their era's numbers.
- The dev server is stopped before the gate's build leg (the
  documented rule; the preflight guard is the backstop, not an
  invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1`
  (fresh buckets) — unchanged.
- The screenshot battery's delta frames are the documented
  capture-environment genera (the avatar-jitter + backdrop-blur
  families) — classified against the direct byte-census, never the
  VLM alone.

## 6. Execution addendum

- The RED run answered exactly as predicted: the three decode pins
  RED (`%20`, `%2D`, the last-segment rule) while the malformed-escape
  pin passed on the unfixed code (it guards the raw-fallback behavior
  THROUGH the fix — the same input class the current implementation
  already answers raw).
- The live verification ran against the daemonized dev server with
  the fix hot-loaded: the `%20` path byte-matches the reference's
  served title (`Curl Probe 207 Test | Budget Wise`) with the real
  404 status; the body still quotes the raw encoded path —
  `The page "Curl%20Probe%20207%20Test" could not be found in this
  application.` — identical to the reference's body genus.
- The screenshot battery's dialog depth-check (a NEW tool this
  round, `dialog_blur_depthcheck.py`): the changed pixels above the
  visible threshold (64/255 luminance) number exactly 16 in BOTH
  dialog card crops — the exact s203 sliver counts — with the
  remainder (21/50 px) sub-visible blur noise this capture
  environment adds. The genus classification stands on the
  luminance profile, not the raw count alone.
- The daemonizer (`scripts/daemon-dev.py`, workspace tooling) and the
  VLM battery tool (`vlm-battery-206.py`) were both parameterized
  this round per the s206 N-1 standing convention — argv[1]/argv[2]
  log/captures dirs — closing the third consecutive round of the
  captures-consumer true-up class.
- The owner's two homepage captures (`docs/homepage_top.png` +
  `docs/homepage_middle.png`) were VLM-inspected and classified as
  captures of our own shipped landing before the census began — no
  remediation indicated; the landing is pinned by
  `tests/landing-page.test.ts` and captured in the battery's
  `landing-desktop.png` frame (byte-identical this round).
- The gate re-run + ship (Phase D) execute after this addendum: the
  dev server stopped, the full chain re-run (lint 0/0 · tsc 0 ·
  414/414 · build · 14/14 smoke · 67/67 e2e CI=1), then the atomic
  commit + the SSH-wrapper push (remote ref verified, key shredded).
