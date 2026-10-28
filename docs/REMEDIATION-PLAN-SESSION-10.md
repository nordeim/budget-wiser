# Budget Wise — Session 10 Remediation Plan

**Date:** 2026-10-28 · **Branch:** `main` only · **Method:** TDD where code changes; documentation true-up where the finding is informational

## 1. Audit scope executed (this session)

- Intake: fresh `git clone` (the workspace had been reset) at `57b91bf`
  (the owner's `docs/session_16.md` transcript commit atop `aeb17e7`, the
  session-198 ship — the sixth-census verification round). The environment
  was rebuilt from scratch: `bun install` (513 packages) · `.env` recreated
  on the mandated six-knob contract (`DATABASE_URL="file:../db/custom.db"`
  + a fresh 64-char `AUTH_SECRET`) · `db:push` + `db:seed` (the demo month
  intact: 2 users / 4 transactions / 0 budgets) · the Playwright
  chromium-1248 install (the cache held only 1200).
- The five root documents + `docs/session_15.md` +
  `docs/REMEDIATION-PLAN-SESSION-9.md` + `worklog.md` +
  `docs/session_16.md` were re-read and validated against the tree before
  touching anything, and the full baseline gate ran FIRST: lint 0/0 ·
  typecheck 0 · 410/410 unit · build · 14/14 smoke · 66/66 e2e (CI=1) —
  the exact documented session-198 ship state.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`), the
  docs-count lockstep (410/66/14) verified at every claim site, `skills/`
  confirmed excluded from all four check/test/compile scopes (tsc ·
  eslint · vitest include patterns · playwright testDir), and the s197
  seams re-verified in the tree (`scripts/dev-preflight.ts` + the wired
  `dev` script). The mandated focus areas each swept clean: the **mobile
  navigation** (the 11-test e2e battery green in the baseline gate + the
  live byte-census on BOTH apps during the dual-app diff — identical bar
  classes, the `flex items-center justify-around py-2` row wrapper, item
  classes, ink split, rect y=767 h=77, plus our documented `aria-current`
  superset) and **TailwindCSS v4** (the `@custom-variant hover` unwrap,
  the `--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
  `safe-area-pb` @utility, literal-class discipline, no config JS — no
  v4-family bugs found).
- The s198 repo delta verified docs-only (one file: the owner's
  `docs/session_16.md` transcript — no code changes since the s198 ship).
- The live reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844): **ZERO structural drift since session
  198** — the SEVENTH consecutive shell census with no new restyle wave:
  the shell (outer surface wrapper form, `#root > DIV.min-h-screen` +
  the platform chrome on the body), all four app pages (containers
  7xl/5xl/5xl/4xl, the sm-stacking headers, tracking-tight H1s), every
  page title cross-checked on both apps with FULL navigations
  (`/`→"Budget Wise", `/login`→"Budget Wise", `/Dashboard`→"Budget Wise",
  `/Transactions|/Budgets|/Profile`→"<Page> | Budget Wise" — the
  pushstate title reads on the reference SPA lag behind the router's
  title update; full navigations answer the documented forms), the 404
  surface (the interpolated humanized title `Curl Probe 199 | Budget Wise`
  served in the HTML head — our s196 implementation answering
  identically, plus our kept real-404 status), the mobile bottom bar
  byte-identical on every dimension (bar classes, the row wrapper, item
  classes, ink split, rect y=767 h=77), the scroll-end clearance (764 ≤
  767 on both apps), both dialogs (the stock `border-input` h-9 forms,
  `space-y-6 pt-4`), the sitemap format + robots.txt, the login card (the
  4-button OAuth row), the donut geometry (200×200 pie, 331px legend),
  and the data state unchanged (the single −$1,000 food txn — data-borne,
  the excluded genus).
- The dual-app diff ran the same census on the local dev server: the shell
  matching, the mobile bar byte-identical (+ the aria-current superset),
  all page titles curl-verified matching (the 404 interpolated title with
  the real 404 status + the alias titles), both dialogs matching, the SEO
  surfaces matching (sitemap format, robots, manifest 200), the donut
  geometry identical, the row anatomy identical, and the clearance
  identical (764 ≤ 767 both apps).
- The VLM battery: "Structural Differences: None" on budgets mobile and
  profile mobile; the dashboard-desktop and dashboard-mobile pairs' flags
  all the documented data-borne genus (the savings-badge conditional —
  the reference's null savings rate with zero income txns; the donut
  segments + row counts — seeded vs reference data; the platform's "Edit
  with Base44" badge occluding tabs 3–4 in the capture) — every flag
  DOM-disproven by this session's direct byte-census (4 identical items
  on both bars). The discipline held: no flag was acted on without the
  DOM counter-proof.
- The dev-boot guard live-verified again this session: the baseline
  gate's `next build` wrote `.next/`, and the subsequent `bun run dev`
  boot fired the preflight clean — the server ready in 271ms, health 200,
  and the window-marker probe surviving a 5s idle (0 reload loops vs the
  646-refix unguarded genus).

## 2. Findings

### Verified clean (no drift — no action)

- Every parity surface (the seventh census): the shell, all four pages,
  the mobile bar, the clearance, both dialogs, all titles (404 +
  aliases + page defaults), the sitemap + robots + manifest, the login
  card, the donut geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both apps
  (the byte-census + the 11-test e2e battery green in the baseline gate).
- Tailwind v4: no bugs (all pins verified in place).
- The dev-boot guard: fired correctly on this session's build→dev
  sequence (0 reload loops, health 200, marker survived).
- `.env`/`.env.example`: matching the six-knob contract; `db/` at the
  repo root; the db-path seam pinned.
- The Vitest + Playwright suites: in place (410/66), config scopes clean.
- The security sweep, the docs-count lockstep, the skills/ exclusion.

**No code findings this round — a verification round.** The only
informational note (the pushstate title-read timing artifact on the
reference's SPA) is a census-methodology footnote recorded here, not a
defect: the reference's client-side title updates lag a `pushstate`
navigation, so title censuses must use full navigations (they do in the
curl-verified paths; this session caught the artifact in the in-browser
probe path and re-verified with full navigations — all titles match).

## 3. Remediation ToDo

**Phase A — the evidence refresh**

1. [x] The screenshot battery recaptured from the dev server (12 images,
       at the documented viewport convention 1512×945 + 390×844):
       **10/12 pixel-identical to the s198 set + the two dialog frames at
       0.0011% / 0.0064% pixel diff** (the dialog-edge antialiasing
       jitter genus — the same sub-pixel family the s198 round measured
       at 0.001%). Render-stability evidence held across another
       generation. Copied into `docs/screenshots/`.

**Phase B — the session records**

2. [x] `docs/session_17.md` (this round's log) + the worklog entry
       (Task ID 199).
3. [x] This plan ticked + the execution addendum.

**Phase C — the documentation true-up**

4. [x] `budget-wiser_SKILL.md` — v1.8.0: the provenance + Appendix C
       gain the session-199 rows; the §1 reference-state note gains the
       seventh-census line + the pushstate title-read methodology
       footnote.
5. [x] The PAD — v2.9.0: the revision block records the seventh census
       + the verification round.
6. [x] The README and AGENTS.md needed no changes — the counts held
       (410/66/14) and the round carries no new user-facing or
       agent-facing behavior contracts.

**Phase D — ship**

7. [ ] Full gate re-run: lint 0/0 · typecheck 0 · 410/410 unit · build ·
       14/14 smoke · 66/66 e2e (CI=1) — counts unchanged (a
       docs-and-evidence-only round must move zero counts).
8. [ ] Commit (atomic) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py`; verify the remote ref; shred the key.

## 4. Risks and guards

- **No gate weakening, no count movement**: an evidence-and-documentation
  round — the 410 unit / 66 e2e / 14 smoke counts must be IDENTICAL
  before and after (any drift means an unintended code change slipped
  in).
- **The dev server is stopped before the gate's build leg** (the
  documented rule; the preflight guard is the backstop, not an
  invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1` (fresh
  buckets) — unchanged.

## 5. Execution addendum (what the plan grew mid-round)

- **The viewport-convention recapture:** the first capture pass used a
  944px desktop height (an off-by-one vs the battery's 945 convention) —
  the pixel diff caught it as a uniform SIZE MISMATCH on every desktop
  frame, and the re-capture at 1512×945 restored the 10/12
  pixel-identical outcome. The mobile frames (390×844) were
  pixel-identical on BOTH passes — the strongest stability signal of the
  battery.
- **The pushstate title-read artifact:** the reference's in-browser title
  census via `pushstate` returned the stale document.title (the SPA
  router updates titles on full navigations, and the update lags the
  synthetic navigation). Every title was re-verified with full
  navigations — all matching the documented forms. Recorded as a census
  methodology footnote (§3.5 of the SKILL's §1 note) so a future session
  doesn't mis-read the lag as drift.
- **The dev-boot guard's fourth live proof:** the round's single
  build→dev sequence (the baseline gate's build → the dual-app dev boot)
  fired the preflight clean — 0 reload loops, ready in 271ms, health
  200, the marker surviving. The guard's value compounds with every
  gate-then-dev workflow.
