# Budget Wise — Session 16 Remediation Plan

**Date:** 2026-10-28 · **Task ID:** 205 · **Branch:** `main` only · **Method:** documentation true-up + evidence refresh (a zero-drift, zero-code-finding round — the thirteenth consecutive census with no new restyle wave; the round's only deltas are the already-documented capture-environment genera, remediated as evidence refresh, not code)

## 1. Audit scope executed (this session)

- Intake: the workspace had been RESET again — a fresh `git clone
  https://github.com/nordeim/budget-wiser.git` landing at `cf2bd9a` (the
  owner's `docs/session_28.md` transcript commit atop `0d1c485`, the
  session-204 ship — the twelfth-census zero-code-finding round). The
  repo delta since the s204 ship verified docs-only (one file: the
  owner's transcript). The full fresh-clone bootstrap was exercised live
  again: `bun install` (513 packages) · `cp .env.example .env` + a
  fresh 64-char `AUTH_SECRET` · `bun run db:push && bun run db:seed`
  (2 users / 4 transactions / 0 budgets — the documented demo month) ·
  `bunx playwright install chromium` (the README's documented e2e
  requirement).
- The five root documents + `docs/session_27.md` +
  `docs/REMEDIATION-PLAN-SESSION-15.md` + `worklog.md` +
  `docs/session_28.md` were re-read and validated against the tree
  before touching anything.
- The full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit ·
  build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-204
  ship state, green on the first pass of the fresh clone.
- The local audit followed `skills/web-application/SKILL.md`'s §16/§20
  dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
  secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`, no
  `any` leaks, no eval/new Function), the docs-count lockstep verified
  (the tree's only old-era numbers are the dated historical revision
  rows — correct per the lockstep discipline), `skills/` confirmed
  excluded from all four check/test/compile scopes (tsc exclude ·
  eslint ignores · vitest include patterns · playwright testDir), and
  the mandated focus areas each swept clean: the **mobile navigation**
  (the 12-test e2e battery re-run green standalone + the live
  byte-census on BOTH apps during the dual-app diff) and **TailwindCSS
  v4** (the `@custom-variant hover` unwrap, the `--shadow-sm`/`--blur-sm`
  re-pins, the v3 palette re-pin block, the `safe-area-pb` @utility,
  literal-class discipline, no config JS — no v4-family bugs found). The
  `.env`/`db` contract verified live (the six knobs, `db/` at the repo
  root, the seam pinned by `tests/db-path.test.ts`, `.env.example`
  tracked at HEAD with identical knob names), the Vitest + Playwright
  suites verified in place with clean config scopes, the SEO surfaces
  verified (sitemap + robots + manifest explicit route handlers, the
  format matching the reference), and the neo-crm tech-stack pattern
  reference re-confirmed from the carried `neo-crm_SKILL.md`.

## 2. The live re-audit: the THIRTEENTH consecutive zero-drift census

- The reference re-audit (agent-browser, fresh login with the owner's
  credentials, 1512×945 + 390×844) found **zero structural drift since
  session 204**: the body census answering exactly the documented form,
  the shell byte-identical, all four pages byte-verified (containers
  7xl/5xl/5xl/4xl, titles via FULL navigations), the 404 surface (the
  interpolated humanized title `Curl Probe 205 Test | Budget Wise` on
  this round's fresh probe path + the quoted slash-less body + the "Go
  Home" button — answering identically to our s196/s201 implementation,
  ours with the real 404 status), the mobile bottom bar byte-identical
  on every dimension (the bar DIV classes, the row wrapper, item
  classes, the ink split on the anchor AND its svg, rect y=767 h=77, the
  four lucide icons, NO aria-current — the reference ships without),
  the scroll-end clearance (764 ≤ 767 measured per the e2e contract's
  lowest-box form at scroll-end on BOTH apps), both dialogs (the
  VALUE-attribute probe answering the documented s203 genera verbatim:
  the reference's `value="health"` for Healthcare and income-`other`
  reuse vs our `healthcare`/`other_income`; the reference's Income tab
  keyboard-activated cleanly with the documented family swap — the F-2
  methodology note re-verified), the Set Budget dialog
  (Category/Monthly Limit labels + the 0.00 placeholder), the sitemap
  format + robots.txt, the login card (the 4-button OAuth row), the
  donut geometry (341×280 responsive container / 200×200 g.recharts-pie
  / 331px legend on the precise probe), and the transaction-row anatomy
  (`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors`
  rows on /Transactions).
- **The data state: UNCHANGED from the s200 baseline** — Balance
  −$2,481.00 / Income $0.00 / Expenses $2,481.00 / 3 transactions. The
  FIFTH consecutive round with no owner-data movement.
- The dual-app diff ran the same census on the local dev server: the
  un-daemonized `bun run dev` boot live-verified the s197 preflight
  guard (the gate's build tree removed — `[dev-preflight] removed the
  stale production .next tree`, Ready in 259ms, health 200 + db up, 0
  reload loops, zero notices) before the daemonized census boot (the
  s204 process-reaper posture — this sandbox class reaps backgrounded
  trees between invocations). The local census matched on every
  surface: the shell (with our documented body-chrome platform-face
  genus), the mobile bar byte-identical (+ the `aria-current="page"`
  and nav-landmark superset), the clearance identical (764 ≤ 767), all
  titles matching, the 404's interpolated title WITH the real 404
  status, both dialogs matching (our `healthcare`/`other_income` ids +
  the placeholder option — the documented internal-wire genus; our
  Income tab swaps on click per the Radix contract), the SEO surfaces
  matching (the documented lowercase-loc divergence, format
  byte-matched; manifest 200), and the donut geometry byte-identical
  (341×280 / 200×200 / 331 on the precise probe).
- The VLM battery (4 pairs, the census-201 JSON format): 0× "Structural
  Differences: None" for the second consecutive battery — every one of
  the four pairs' flags answering the documented DOM-disproven genera,
  cross-checked against the round's direct byte-census before
  classification (the savings-badge conditional — data-borne; the
  platform-badge occlusion over the bar's right tabs — the byte-census
  shows all four items on both apps; the platform badge itself; the
  avatar-content genus). The s204 flag-variance methodology note
  re-confirmed: the battery is a coarse parity signal, never a gate.
- The screenshot battery: 12 images captured from the live dev server
  at the documented 1512×945 + 390×844 convention — **9/12
  byte-identical to the s204 set**, with the three delta frames each at
  its EXACT documented genus: the profile-mobile frame at the
  avatar-jitter genus in its EXACT s202/s203/s204 form (104 px, bbox
  (84,255)–(235,377), 0.0316% — the deterministic genus confirmed a
  FOURTH time), and both dialog frames at the backdrop-blur/
  antialiasing-sliver genus with the card interiors proven unchanged by
  the exact-rect crop diff at the EXACT s203 counts (16/242,368 px and
  16/140,224 px — this round's capture environment carrying the genus
  where the s204 fresh sandbox did not; the capture-environment
  classification confirmed once more by the reproducibility of the
  exact counts).

## 3. Findings

### Verified clean (no drift — no action)

- Every parity surface (the thirteenth census): the shell, all four
  pages, the mobile bar, the clearance, both dialogs, all titles (404 +
  aliases + page defaults), the sitemap + robots + manifest, the login
  card, the donut geometry, the row anatomy.
- The mobile navigation: working exactly as the reference's on both
  apps (the byte-census + the 12/12 e2e battery green standalone).
- Tailwind v4: no bugs (all pins verified in place, no config JS).
- The `.env`/`db` contract: the six knobs; `db/` at the repo root; the
  db-path seam pinned; `.env.example` tracked at HEAD with identical
  knob names.
- The Vitest + Playwright suites: in place (410/66), config scopes
  clean.
- The SEO surfaces: sitemap + robots + manifest implemented and
  matching the reference formats.
- The dev-boot guard: fired clean on the round's build→dev sequence
  (live-verified on the un-daemonized boot).
- The security sweep, the docs-count lockstep, the skills/ exclusion,
  the neo-crm stack-pattern lineage.
- The fresh-clone bootstrap: exercised end-to-end again (the workspace
  had been reset) and answered per the docs — `bun install` → `.env`
  from `.env.example` + a fresh AUTH_SECRET → `db:push` + `db:seed` →
  the full gate green on the first pass.

### F — none (a zero-drift, zero-code-finding round)

No code findings. No new observations, no new genera — the round's
deltas are the documented capture-environment genera at their exact
documented forms (the avatar-jitter genus frame in its exact
s202/s203/s204 form, 104 px / bbox (84,255)–(235,377) / 0.0316%; the
dialog sliver genus at the exact s203 crop-diff counts, 16/242,368 px
and 16/140,224 px) and the data-borne genera excluded by convention
(the reference's owner data vs our seeded demo month). The dev log
carried zero errors/warnings/deprecations.

## 4. Remediation ToDo (documentation true-up + ship — the s203/s204 pattern)

**Phase A — the documentation set**

1. [x] `budget-wiser_SKILL.md` → v1.14.0: the frontmatter version bump +
       the provenance gains the session-205 line (the thirteenth census,
       the 9/12 battery with the three genus frames at their exact
       documented forms, the data state holding, the un-daemonized
       guard verification) + Appendix C gains the session-205 row +
       the Source sessions list gains the 205 entry. Historical rows
       keep their era's numbers.
2. [x] The PAD → v2.15.0: the revision block records the thirteenth
       census + the zero-code-finding round + the genus-frame evidence
       reading (9/12 + the exact s203 counts).
3. [x] `docs/session_29.md` (this round's log — Session 19 / Task ID
       205) + the `worklog.md` entry (Task ID 205, appended, never
       overwritten).
4. [x] This plan ticked + the execution addendum.
5. [x] README + AGENTS + CLAUDE: **no changes needed** — the counts held
       (410/66/14), no new user-facing contracts, no new architecture
       facts (a zero-drift round; the evidence records live in the
       SKILL and the PAD). Verified by the lockstep sweep.
6. [x] The screenshot battery's three genus frames refreshed in
       `docs/screenshots/` (the round's only binary delta — profile
       mobile + both dialog frames; the nine byte-identical frames
       produced no git delta).

**Phase B — ship**

7. [ ] The dev server STOPPED, then the full gate re-run: lint 0/0 ·
       typecheck 0 · 410/410 unit HELD · build · 14/14 smoke · 66/66
       e2e (CI=1) — all three counts must hold (a docs-only round moves
       zero counts).
8. [ ] `git status` swept (no `.env`, `*.key`, `db/*.db`, `dev.log`,
       `test-results/` staged) → commit (atomic, Conventional Commit,
       the message explains why) → push `HEAD:refs/heads/main` via
       `docs/ssh_git_wrapper_v3.py` (the runbook:
       `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` — the wrapper's
       default remote is the OLD task-management repo, so pass
       `--remote` explicitly); verify the remote ref; shred the key.

## 5. Risks and guards

- **No code changes this round** — the gate's three counts must answer
  exactly 410/66/14 (the docs-only invariant).
- The dev server is stopped before the gate's build leg (the documented
  rule; the preflight guard is the backstop, not an invitation).
- `skills/` stays excluded from every check/test/compile scope
  (re-verified this session).
- The e2e rate-limiter discipline: the gate's e2e leg runs `CI=1`
  (fresh buckets) — unchanged.
- The docs lockstep moves in the same commit as the session records
  (the s192/s197 discipline); the SKILL's historical rows + the PAD's
  dated revision blocks keep their era's numbers.
- The screenshot battery's three genus frames are the round's only
  binary delta — the atomic change set is docs + those three frames.

## 6. Execution addendum

- The fresh-clone bootstrap (the second consecutive reset workspace)
  exercised the full README quickstart path live again: install → env →
  db → gate, all green on the first pass.
- The census probes rode the documented upgraded forms: the VALUE-
  attribute dialog probes (the s203 upgrade) with keyboard activation
  for the reference's tabs (the s203 F-2 note), the bar probe matching
  `div, nav` (the reference ships a DIV; ours the documented NAV
  landmark), and the donut probe targeting `.recharts-responsive-
  container` + `g.recharts-pie`.
- The dev-boot guard was live-verified on the un-daemonized `bun run
  dev` boot BEFORE the daemonized census boot (the s204 process-reaper
  posture: this sandbox class reaps backgrounded trees between
  invocations; the daemonizer holds the server outside the reaper's
  reach) — the guard's removal of the gate's stale production tree
  observed in the boot log, Ready in 259ms, health 200, zero loops.
- The pixel-diff tooling was corrected this round: the inherited
  shot-diff script had compared HEAD against the unchanged working-tree
  copy (a trivial self-diff); after pointing it at the fresh captures
  it answered the true reading — 9/12 + the three genus frames — and
  the direct `cmp` spot-check confirmed the corrected tool.
- The VLM pairs were re-verified against the direct byte-census before
  classification; every flag answered a documented genus.
