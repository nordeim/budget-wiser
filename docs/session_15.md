# Session 12 — The Verification Round (Task ID 198)

The round opened per the owner's instruction: `git pull` to `6ab4484` (the
owner's `docs/session_14.md` transcript commit atop `c027c06`, the session-197
ship — the dev-boot guard round). The environment stood bootstrapped from the
prior session (deps installed, `.env` on the mandated six-knob contract with
`DATABASE_URL="file:../db/custom.db"`, the seeded `db/` at the repo root,
chromium-1248 present) — the only delta was docs-only, verified by diff. The
five root documents + `docs/session_13.md` +
`docs/REMEDIATION-PLAN-SESSION-8.md` + `worklog.md` + `docs/session_14.md`
were re-read and validated against the tree before touching anything, and the
full baseline gate ran FIRST: lint 0/0 · typecheck 0 · 410/410 unit · build ·
14/14 smoke · 66/66 e2e (CI=1) — the exact documented session-197 ship state.

The local audit followed `skills/web-application/SKILL.md`'s §16/§20
dimensions: the security sweep clean (no `dangerouslySetInnerHTML`, no
secrets, no live keys, no `console.log`, no TODO/FIXME in `src/`), the
docs-count lockstep (410/66/14) verified at every claim site, `skills/`
confirmed excluded from all four check/test/compile scopes, and the s197
seams re-verified in the tree (`scripts/dev-preflight.ts` + the wired `dev`
script). The mandated focus areas each swept clean: the **mobile
navigation** (the 11-test e2e battery green in the baseline gate; the
byte-census re-run live on BOTH apps during the dual-app diff — identical
bar classes, the `flex items-center justify-around py-2` row wrapper, item
classes, ink split, rect y=767 h=77, plus our documented `aria-current`
superset) and **TailwindCSS v4** (the `@custom-variant hover` unwrap, the
`--shadow-sm`/`--blur-sm` re-pins, the v3 palette re-pin block, the
`safe-area-pb` @utility, no config JS — no v4-family bugs found).

## The live re-audit: the SIXTH consecutive zero-drift census

The reference re-audit (agent-browser, fresh login with the owner's
credentials, 1512×945 + 390×844) found **zero structural drift since
session 197** — the sixth consecutive shell census with no new restyle
wave: the outer surface wrapper intact, all four app pages byte-verified
(containers 7xl/5xl/5xl/4xl, the sm-stacking headers, tracking-tight H1s,
action buttons), every page title cross-checked on both apps
(`/`→"Budget Wise", `/login`→"Budget Wise", `/Dashboard`→"Budget Wise",
`/Transactions|/Budgets|/Profile`→"<Page> | Budget Wise"), the 404 surface
(the interpolated humanized title `Curl Probe 198 | Budget Wise` — our s196
implementation answering identically, plus our kept real-404 status), the
mobile bottom bar byte-identical on every dimension (bar classes, the row
wrapper, item classes, ink split, rect y=767 h=77), the scroll-end
clearance (764 ≤ 767 on both apps), both dialogs (the stock `border-input`
h-9 forms, the native selects, `space-y-6 pt-4`), the sitemap format +
robots.txt, the login card (the 4-button OAuth row), the donut geometry
(200×200 pie, 331px legend), the transaction-row anatomy, and the data
state unchanged (the single −$1,000 food txn — data-borne, the excluded
genus).

The dual-app diff ran the same census on the local dev server: the shell
matching, the mobile bar byte-identical, all page titles curl-verified
matching (the 404 interpolated title + the alias titles + the
dashboard/login defaults), both dialogs matching, the SEO surfaces
matching (sitemap format, robots, manifest 200), the donut geometry
identical, the row anatomy identical, and the clearance identical (764 ≤
767 both apps).

The VLM battery: "Structural Differences: None" on dashboard desktop,
budgets mobile, and profile mobile; the dashboard-mobile pair's two flags
both the documented s195/s196 genus, DOM-disproven by this session's
direct byte-census (the platform's "Edit with Base44" badge occluding tabs
3–4 in the capture; the data-borne savings-badge conditional — the
reference's null savings rate with zero income txns). The discipline held:
no flag was acted on without the DOM counter-proof.

## F-1: the body-chrome genus — investigated live, classified, documented

The finding surfaced during the dual-app shell census itself. The local
body-children probe failed with an undefined-property error
(`b.children[0]` was an empty hidden DIV) where the reference's probe had
returned the shell — a structural divergence that warranted a full
classification before any action. The investigation: (1) the dev SSR HTML
shows `<body …><div hidden=""><!--$--><!--/$--></div><main …>` — React's
streaming-SSR boundary marker as `body.children[0]`; (2) the standalone
PRODUCTION server's HTML carries it IDENTICALLY (booted on :3299 with a
scratch secret); (3) the reference's logged-in body census answers
`[#root → DIV.min-h-screen, #base44-edit-badge, recharts span]` — no
hidden div, and structurally impossible on a client-rendered Vite SPA;
(4) `rg 'div hidden'` over `src/` — zero hits (framework-emitted, not app
code); (5) the 404 page carries the pending form (`<!--$?-->` +
`<template>`) — the streaming genus confirmed on every server-rendered
page.

The classification: **platform-face genus, NOT parity drift** — the div is
invisible (`hidden` = display:none), a11y-excluded, present identically in
dev and the standalone build, and pinned by no test (the census records
describe the hierarchy from the app-shell perspective, which remains
accurate). The remediation is documentation-only: the genus note added to
AGENTS.md's architecture facts, the SKILL's §1 reference-state notes, and
the PAD's ADR-006 hierarchy description — so a future session running a
body-children census doesn't re-pay the investigation or mis-classify the
div as drift. No test pins it: pinning framework output is the brittle
genus (the s192 dead-script guard lesson — pins target repo-owned
surface).

## The guard's compounding live proofs

The round's two build→dev sequences — the baseline gate's build and the
prod-HTML probe's build — each ended with a dev boot onto a
production-written tree, and the s197 preflight guard fired BOTH times:
the clean log line, the fresh dev tree, the server ready in ~281–290ms,
**0 reload loops each** (vs the 646-refix unguarded genus), health 200
each time, the window-marker probe surviving. The guard's value compounds
with every gate-then-dev workflow an agent runs — this round proved it
twice more without a single intervention.

## The verification

- **The screenshot battery recaptured from the dev server** (12 images):
  **10/12 byte-identical to the s197 set** + the two dialog frames within
  6 bytes at 0.001% pixel diff — the s197 battery's dialog frames were
  captured from their canonical origin pages (the add-transaction dialog
  from /Transactions, the set-budget dialog from /Budgets — the backdrop
  IS the page behind the overlay; capturing from /Dashboard produces a
  36.6%-pixel backdrop diff), and this session's frames match from the
  same origins. Render-stability evidence held across another generation.
- **Full gate GREEN (docs-only round — counts must not move):** lint 0/0 ·
  tsc 0 · **410/410 unit HELD** · build · 14/14 smoke · **66/66 e2e**
  (CI=1) — identical before and after the documentation true-up.

## The documentation set

AGENTS.md (the body-chrome genus architecture fact), the PAD **v2.8.0**
(the revision block + the ADR-006 census caveat), `budget-wiser_SKILL.md`
**v1.7.0** (the §1 body-children census caveat, the provenance + Appendix
C session-198 rows), `docs/REMEDIATION-PLAN-SESSION-9.md` (the round's
plan, ticked + the execution addendum), this log, and the worklog entry
(Task ID 198). The README and CLAUDE.md needed no changes — the counts
held (410/66/14) and the genus note is agent-facing census guidance, not
user-facing behavior.

Shipped: one atomic docs-only commit to main, pushed via
`docs/ssh_git_wrapper_v3.py` (remote ref verified; key shredded).
