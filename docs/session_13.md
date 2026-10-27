# Session 11 — The Dev-Boot Guard Round (Task ID 197)

The round opened per the owner's instruction: `git pull` to `912ce9b` (the
owner's `docs/session_12.md` transcript commit atop `72f8e3a`, the
session-196 docs tick — code HEAD `d6be743`, the s196 ship). The
environment stood bootstrapped from the prior session (deps installed,
`.env` on the mandated six-knob contract with
`DATABASE_URL="file:../db/custom.db"`, the seeded `db/` at the repo root,
chromium-1248 present) — the only delta was docs-only, verified by diff.
The five root documents + `docs/session_11.md` +
`docs/REMEDIATION-PLAN-SESSION-7.md` + `worklog.md` + `docs/session_12.md`
were re-read and validated against the tree before touching anything, and
the full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 401/401 unit ·
build · 14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-196
ship state.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`), the
docs-count lockstep (401/66/14) verified at every claim site, `skills/`
confirmed excluded from all four check/test/compile scopes, and the s196
seams re-verified in the tree (the `x-pathname` middleware, the alias
metadata re-exports, the pure not-found-title helper). The mandated focus
areas each swept clean: the **mobile navigation** (the 11-test e2e battery
green in the baseline gate; the byte-census re-run live on BOTH apps during
the dual-app diff — identical bar classes, the `flex items-center
justify-around py-2` row wrapper, item classes, ink split, rect y=767
h=77) and **TailwindCSS v4** (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
literal-class discipline, the `safe-area-pb` @utility, no config JS — no
v4-family bugs found).

## The live re-audit: the FIFTH consecutive zero-drift census

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 196** — the fifth consecutive shell census with no new restyle
wave: the outer surface wrapper intact, all four app pages byte-verified
(containers 7xl/5xl/5xl/4xl, the sm-stacking headers, tracking-tight H1s,
action buttons), the bottom bar byte-identical on every dimension, the
scroll-end clearance (732 ≤ 767 on both apps), both dialogs (the stock
`border-input` h-9 forms, the native selects, `space-y-6 pt-4`), the 404
surface (the interpolated humanized title `Fake Probe Route 197 | Budget
Wise` + the slash-less quoted path — our s196 implementation answering
identically), the sitemap format + robots.txt, the login card (the
4-button OAuth row), and the data state unchanged (the single −$1,000
food txn — data-borne, the excluded genus).

The dual-app diff ran the same census on the local dev server: the shell
byte-identical, the mobile bar byte-identical, every page title
curl-verified matching (the 404 interpolated title + the alias titles +
the dashboard/login defaults), the 404's real status preserved, both
dialogs matching, the SEO surfaces matching (sitemap format, robots,
manifest 200), the donut geometry identical (200×200 pie, 331px legend),
and the transaction-row anatomy identical (`flex items-center gap-4 p-4
hover:bg-slate-50 transition-colors`, description-first titles).

The VLM battery: "Structural Differences: None" on dashboard desktop,
budgets mobile, and profile mobile; the dashboard-mobile pair's two flags
both the documented s195/s196 genus, DOM-disproven by this session's
direct byte-census (the platform's "Edit with Base44" badge occluding tabs
3–4 in the capture; the data-borne savings-badge conditional — the
reference's null savings rate with zero income txns). The discipline held:
no flag was acted on without the DOM counter-proof.

## F-1: the dev-vs-build race — hit LIVE, then guarded at the boot seam

The finding surfaced during the dual-app diff itself. Booting `bun run
dev` after the baseline gate entered the documented infinite reload loop:
**646 `GET /login` re-fetches**, the window-marker probe gone within two
seconds, the login form's fills wiped by the reloads (the fill attempts
kept failing with CDP "node does not belong to the document" errors — the
page was being torn down under the automation). The documented cure (stop
dev, `rm -rf .next`, restart) restored a stable server immediately (0
loops) — the genus was confirmed, but through a trigger the docs
under-describe: the README/AGENTS wording said "a `next build` ran
concurrently with (or was killed half-into) `next dev`", and this hit was
neither — the build had completed CLEANLY (exit 0, smoke + e2e green on
its artifact), and the dev boot came after, in sequence. Turbopack dev
watching a tree last written by the production compiler loops regardless
of how cleanly that tree was produced — and "run the gate, then boot dev"
is exactly the workflow the repo's own docs invite.

The marker facts, probed live: the production build writes top-level
`.next/BUILD_ID`; dev turbopack writes `.next/dev/` with a `lock` JSON
(`{"pid":…,"port":…}`) and no top-level BUILD_ID. The two tree states are
programmatically distinguishable at dev-boot time — which is all a guard
needs.

## The remediation (TDD per docs/REMEDIATION-PLAN-SESSION-8.md)

- **Phase A (red):** `tests/dev-preflight.test.ts` born RED at the import
  (the module did not exist) — 9 pins: the decision matrix (fresh tree →
  none; dev-only tree → none; production tree + no lock → clean; +
  dead lock pid → clean; + LIVE lock pid → pass-through), the lock parser
  (valid/malformed/no-pid), the pid-liveness helper (own pid live;
  beyond-ceiling dead), and the package.json wiring pin.
- **Phase B (green):** `scripts/dev-preflight.ts` (new) — the guard,
  mirroring `scripts/prisma-env.ts`'s script pattern (a `main()` gated by
  invoked-as-script so the suite imports the pure parts). The pure
  `resolveDevPreflight()` decides; `main()` reads the real fs state and
  removes the stale production tree with a one-line explanation. The
  guard's own guard: it never cleans under a live dev server (the lock-pid
  signal-0 probe — EPERM counts as alive), it asks no prompts, and it
  exits 0 on every pass-through so `next dev` boots. Wired into the `dev`
  script via `npm pkg set`:
  `bun scripts/dev-preflight.ts && next dev -p 3000 2>&1 | tee dev.log`
  (shell precedence — `&&` binds looser than `|` — sequences the guard
  before the pipe).
- **The mutation proof:** reverting the dev script to its unguarded form
  → exactly 1 RED (the wiring pin, failing for exactly the intended
  reason); restored → 9/9 green.

## The verification

- **All three decision branches live-verified, not just unit-pinned:**
  the clean branch (build → `bun run dev` → the guard's log line fired,
  the server booted ready in 290ms, **0 reload loops vs the 646
  unguarded**, the page marker survived); the none branch (a dev-written
  tree → no clean, no log line, health 200); the pass-through branch (a
  planted `BUILD_ID` under a live dev server → the stderr warning fired,
  the tree stayed INTACT, the server stayed healthy).
- **Full gate GREEN:** lint 0/0 · tsc 0 · **410/410 unit** (+9) · build ·
  14/14 smoke · **66/66 e2e** (CI=1).
- **The screenshot battery recaptured from the remediated dev server**
  (12 images under `docs/screenshots/`): **10/12 byte-identical across
  THREE generations** — the s196 set, this session's first capture, and
  the remediated capture — with the two profile frames differing by
  26/27 bytes (sub-pixel avatar rasterization jitter, the documented
  genus). Render-stability evidence strengthened, not merely reproduced.
- **VLM:** the four parity pairs — three "Structural Differences: None" +
  the one known-genus pair with both flags DOM-disproven.

## The documentation set

README (the Troubleshooting entry broadened to the full genus — any
build→dev mode switch on the same tree — + the guard mention; counts
410), AGENTS.md (the race bullet broadened + the dev-preflight
architecture fact + the testing map's file list), CLAUDE.md (counts 410),
the PAD **v2.7.0** (the revision block + the testing table),
`budget-wiser_SKILL.md` **v1.6.0** (frontmatter/provenance, the §1
reference-state note with the fifth census + the demo-data true-up, §16's
new debugging row, the counts, Appendix C's session-197 row),
`docs/REMEDIATION-PLAN-SESSION-8.md` (ticked + the execution addendum),
this log, and the worklog entry (Task ID 197).

Shipped: one atomic commit to main, pushed via `docs/ssh_git_wrapper_v3.py`
(remote ref verified; key shredded).
