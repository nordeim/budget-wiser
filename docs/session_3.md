# Session 3 — The Re-Audit Round (Task ID 192)

The round opened per the owner's instruction: refresh the workspace (`git pull` →
`17c9cce`, the owner's `docs/session_2.md` log commit), then meticulously re-read
`AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD, `budget-wiser_SKILL.md`, the
session-2 remediation plan, and the worklog — validating the documented state
against the tree before touching anything.

The environment was verified standing (deps, `.env` with the mandated
`DATABASE_URL="file:../db/custom.db"`, the seeded `db/` at the repo root), and the
full gate ran FIRST: lint 0/0 · typecheck 0 · 382/382 unit · build clean (all
routes, both casings) · 14/14 smoke · 61/61 e2e (1.2m, first run).

The live reference re-audit (agent-browser, the saved auth state still valid,
1512×945 + 390×844) found **zero drift** since session 191: the four-button OAuth
row, the "Budget Wise" 404 title, the reset/empty demo data, and the no-mobile-nav
gap at 390px (0 hamburgers — our drawer superset stands) all re-confirmed on every
page.

The local audit then logged in with the demo account and walked every surface:
all four pages (the seeded demo month rendering exactly as documented — $4,424.55
balance, 88.5% saved), both dialogs, the guest-redirect wall
(`/Dashboard` → `/login?from_url=…`), and the mobile-nav battery live (drawer
opens with full nav, Escape closes, no stranded scroll lock — the 11-test e2e
battery already green). The SEO surface verified live: sitemap.xml (all routes),
robots.txt, manifest.json, per-route metadata. `.env.example` verified matching
the six-knob contract. Tailwind v4 discipline verified: CSS-first `@theme`, no
config JS, the hover unwrap, the shadow/blur re-pins, 149 literal palette values.

**The incident worth recording:** the first dev-server boot entered a sustained
HMR full-reload loop (~4 reloads/sec, 2,260 requests — the browser ping-ponging
`/Dashboard ↔ /login?from_url=`). Systematic isolation: the `tee dev.log`
hypothesis was A/B-disproven (12 requests over 35s idle with tee active); the
loop traced to the concurrently-launched-then-killed `next build` leaving a
half-written `.next/` that turbopack kept re-watching. Session 191's log had hit
the same class ("Session dropped after the HMR rebuild") without root-causing
it. The cure is documented this round: never run `bun run build` while
`bun run dev` is live; if looped, stop both + `rm -rf .next` + restart (now in
README Troubleshooting + AGENTS.md).

The VLM side-by-side battery: login page → **"Structural Differences: None"**
(the inline-SVG-vs-hosted-JPEG logo note is the documented s191 boundary);
dashboard → **"Structural Differences: None"** (empty-vs-seeded data states
excluded per the documented genus). The screenshot battery recaptured under
`docs/screenshots/` — 8 of 13 byte-identical to the s191 set (render-stability
evidence); the 5 refreshed frames are recharts/dialog animation capture states
(the donut verified present in the live DOM: 3 sectors + legend).

**The finding (F-1, Medium):** five package.json script entries still pointed at
CRM-scaffold scripts deleted by the s190 transformation — `db:census` →
`scripts/census.ts`, `sweep` → `scripts/sweep.ts`, `probe:ref` →
`scripts/drift-probe.ts`, `sweep:fullpage` → `scripts/fullpage-sweep.ts`,
`census:interior` → `scripts/interior-census.ts` — and `gate:full` chained six of
the dead legs, so the composite failed on its first drift gate. Worse: the
session-97 pins (and a twin assert in type-gate.test.ts) kept this GREEN because
they read the script STRINGS and never checked the targets existed — green tests
masking dead infrastructure, the exact class session 191 cured for dead modules.

The remediation ran TDD per the plan (docs/REMEDIATION-PLAN-SESSION-3.md,
validated against the seams first):

- **Phase A (red):** the dead-script guard in `tests/gate-script.test.ts` — every
  script's repo-local file target must exist on disk (build outputs `.next/` and
  runtime logs excluded), and every `bun run <name>` reference must resolve to a
  defined script. RED with exactly the five intended offenders. (Two sub-bugs
  caught in-test on the way: an unescaped `/` terminating the regex literal, and
  `String.match(/g)` returning full matches with the delimiter glued on — fixed
  to `matchAll` + the capture group.)
- **Phase B (green):** the six dead entries retired via `npm pkg delete`
  (package-manager-only; the diff verified surgical); the session-97 block
  retired to its one surviving pin (the plain-gate smoke-leg order) plus a
  drift-gate tombstone; the type-gate twin assert retired with the citation.
- **Mutation-proof:** planting `probe:mutation → scripts/does-not-exist.ts`
  fired exactly 1 RED; removing it restored 14/14 GREEN. The guard has teeth.
- **Count:** 382 HELD (−3 retired pins + 3 born-green guards) — no doc count
  lockstep needed; verified at the full-suite run.

The full gate re-ran green post-remediation: lint 0/0 · tsc 0 · 382/382 unit ·
build · 14/14 smoke · 61/61 e2e.

The documentation set: the PAD revision block v2.2.0 (the round's `[AUTH]`/
`[RES]`/`[DOC]`/`[SYN]` entries), `budget-wiser_SKILL.md` v1.1.0 (the audit
history row, the pre-ship checklist's dead-script census item, the provenance,
the file-tree stale line), README Troubleshooting + AGENTS.md (the dev-vs-build
race row/note), and this log.

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
