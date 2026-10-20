# The session-157 plan — the LOGIN-WALL census leg (the 157-c rotation)

Date: 2026-10-21 · Rotation: 157-c · probe:ref **#131 STABLE** at the
s147–s155 fingerprint (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576)
— no new bundle event; the round's direction (my judgment on the
session_331 next-round reading, the strongest standing candidate):
**the login wall at /login — the only never-censused rendered surface
left — joins INTERIOR_PAGES (the 12-page interior list; the census
covers 13 surfaces at all four axes = 52 page-axis runs)**.

## The rationale (the last blind rendered surface)

The s156 round closed the shell-page gap (about/contact joined;
"no blind surface, no blind shell page remains" — except the login
wall, named then as the census's remaining surface). Its standing
gates:

- the four viewport sweeps hold /login LOGGED-IN, ABOVE-FOLD only
  (the S96 capture; the login card fits the fold — the card is
  ~650px tall at phone — but the sweep is a PIXEL-margin gate: real
  drift inside the standing baseline is absorbed by construction);
- the e2e auth battery walks the login funnel's BEHAVIOR (the views,
  the error ladder, the reset flow) — never its GEOMETRY;
- **no census has ever walked the login card's DOM** — the 157-c
  pre-plan probe is the first geometry decode of the surface at all.

The s149/s155 doctrine (pixel margin absorbs real drift between
bundle events) applies to the login wall exactly as it did to the
landing and the marketing pair.

## The audits (157-a / 157-b)

- **157-a**: the baseline gate GREEN — lint 0/0 · tsc 0 ·
  **119/2229** · build · **e2e 153/153** (clean first run — the
  drawer battery inside, the mobile-nav contract). **ONE FINDING**:
  the unit suite's EXIT CODE reds on a fresh box (no dev server) —
  `tests/fullpage-sweep-tool.test.ts` imports
  `scripts/fullpage-sweep.ts` whose top-level `run()` fires
  UNCONDITIONALLY (the sweep.ts / interior-census.ts
  direct-execution guard idiom was missed at s149); with no :3000
  listener the run throws → `process.exit(1)` → the vitest-patched
  exit throws an unhandled rejection → exit 1. All 2229 checks pass;
  the green depended on the standing dev server. **A real defect** —
  the first-run `bun run test` documented in AGENTS.md fails on a
  fresh clone. Remediated this round (D-157a0).
- **157-b**: probe:ref **#131 STABLE** at the s147–s155 fingerprint ·
  the drawer battery GREEN (inside e2e 153/153) · **the SIX drift
  gates CLEAN ×6** (the four viewport sweeps + the fullpage at the
  exact standing values 0.093%/0.316% at equal heights 4990/7259 +
  the census gate at 48 page-axis runs, all zero unexplained) ·
  sitemap 11 routes + robots 200 + the SEO meta · db census MATCH
  15/24/10/23/12 + 4 users · the tree clean · zero dep changes.

## The pre-plan probe (the plan validated BEFORE execution)

The reference's /login decoded at the #131 bundle, GUEST and
LOGGED-IN, phone + desktop — **the rotation confirmed**:

- **both apps render /login inside `main`** — byte-equal classes
  (`min-h-screen flex items-center justify-center bg-gradient-to-br
  from-slate-50 to-slate-100 p-4`) — the `censusPage` collector
  (main-anchored) works AS-IS;
- **mainH byte-equal both apps both contexts** — 844 (phone) · 900
  (desktop); the card fits (mainH = clientHeight; a taller card
  grows mainH and REDs);
- **element counts byte-equal 51/51** in all four context-axis
  combos;
- **GUEST and LOGGED-IN render the IDENTICAL card** (els, mainH and
  the digest byte-equal on both apps) — the S23-P2 evidence
  re-validated at the current bundle; the LOGGED-IN protocol is
  therefore FREE (the census login phase already runs — no new
  context machinery, no guest guard);
- **the geometry byte-equal everywhere the digest read** (the card
  358×650 phone · 448×710 desktop, both apps) — with ONE real
  construction face: the logo mark — the reference's ring carries
  its workspace-logo `img` (80×80 object-cover, fills the ring;
  96×96 desktop) where ours carries the CSS brand mark (the 40×40
  centered span; 48×48 desktop) — the reference's own branding
  asset, the Base44-pill genus class, never mirrored. The maiden
  walk will surface it (ref-extra img + ours-extra span, or a
  size-delta pair) — decode-driven pins expected (D-157a3), the
  first census leg since s153 needing them.

## The leg design (additive — the logged-in protocol byte-identical)

- **THE PROTOCOL**: login is an INTERIOR page — `INTERIOR_PAGES`
  grows 11→12 (login appended after contact; the sweep lockstep
  holds — login is a standing sweep PAGES path since S96).
  `CENSUS_ALL_PAGES` grows 12→13; the census gate grows to 52
  page-axis runs. The login phase, the zero-data phase, the
  per-axis contexts, the content floor — all standing, all reused
  (the floor is inert on the login card: nothing can poke — the
  card is max-w-md 448, far under every axis floor).
- **THE SCOPE FLIP (the 157-c hazard face)**: the login wall is a
  STATIC AUTH surface — no workspace data — so a text-only pair
  there (a changed "Sign in" headline) is REAL content drift and
  must stay RED. The s156 keying is NEGATIVE
  (`!isStaticMarketingPage`) — correct for its surfaces, but the
  login leg is exactly the next first-static-surface hazard: a
  forgotten list entry would have reopened the walk45 hazard at
  90° AGAIN. The L-156c2 doctrine taken to its invariant form: the
  scope keys on the POSITIVE DATA class — `CENSUS_DATA_PAGES` (the
  9 app pages) + `isCensusDataPage` — live-data absorbs text-only
  pairs ONLY on members; every other surface (landing, about,
  contact, **login**, and any future surface) stays RED BY DEFAULT.
  `STATIC_MARKETING_PAGES` / `isStaticMarketingPage` RETIRED (the
  s156 pins re-anchored to the new form, the hazard narrative
  preserved); the header's "the landing … and login have no main
  interior" claim RETIRED (login HAS a main interior — the probe's
  first finding).
- **gate:full UNCHANGED**: the census command covers the new leg
  internally — the six-gate chain stays six commands.

## The walk (walk47 — the maiden census + the mutation-proof)

- **PASS 1 THE MAIDEN CENSUS**: login at all four axes (phone
  390×844 · tablet 768×1024 · landscape 1024×768 · desktop
  1440×900), both apps logged-in, the standing decoder seams. The
  expected decode faces: the logo-mark pair (the img-vs-span
  construction above) + the cls-only token-mirror family (the card
  container, the google button, the accent order — byte-equal
  boxes, auto-absorbing). Every delta attributes to a named genus
  or it is a REAL defect → remediated, not absorbed.
- **PASS 2 THE MUTATION-PROOF**: plant a ghost element in the login
  card body (string surgery on login-card.tsx — the s152–s156
  idiom) → `census:interior --pages login --fail-on-drift` → expect
  RED (the ghost subtree decoded ours-extra, the failure
  axis-prefixed) → the string-surgery revert → GREEN. The F-151c1
  class then fails the gate on every censused surface — 13 of them.

## The remediation (TDD — the pin ledger)

- **D-157a0 the fullpage-sweep entry guard**: the RED pin
  (the siblings' idiom pinned: the `process.argv[1].endsWith`
  direct-execution guard, "never on the vitest import") → the
  implementation (the guard appended, the siblings' exact form) →
  GREEN + the fresh-box unit exit code verified.
- **D-157a1 the RED pins** (`tests/interior-census-tool.test.ts`):
  the legs contract (INTERIOR_PAGES 12 + the sweep lockstep + the
  header re-anchor) + the SCOPE FLIP (CENSUS_DATA_PAGES 9 +
  `isCensusDataPage`; the login/landing/about/contact text-only
  RED fixtures; the DATA positives hold the standing live-data
  behavior; the s156 pin re-anchored) + the login verdict (mainH ≠
  0 REDs — no DATA genus on the static-auth leg; the settings skip
  untouched) + the mutation-proof/--pages doctrine. **RED at birth
  → the implementation → GREEN.**
- **D-157a2 the implementation**: `INTERIOR_PAGES` + login +
  `CENSUS_ALL_PAGES` 13 + `CENSUS_DATA_PAGES` + `isCensusDataPage`
  + the scope swap + the header re-anchor
  (`scripts/interior-census.ts`, additive).
- **D-157a3 the decode-driven pins + fixes** (whatever the maiden
  walk surfaces): the logo-mark genus expected; each real face
  pinned RED → remediated/absorbed → GREEN.
- **D-157a4 the count ladder**: the docs-counts UNIT constant + the
  lockstep sites flipped atomically (assert-first) · the
  CLAUDE-carrier pins · the SKILL version + the s157 head (the
  s156 layer demoted beneath) + the Appendix B totals + the
  layer-axis pin.
- **D-157a5 the captures** (the login card logged-in pair at phone
  + the logo-mark zone at desktop, scrolled + verified in-frame) +
  the VLM battery 2/2.
- **D-157a6 the verification chain**: lint 0/0 · tsc 0 · unit (the
  new ladder) · build · e2e 153/153 · **the SIX drift gates CLEAN
  ×6** (the census gate now 52 page-axis runs) · census MATCH +
  the two-commit ship via the SSH wrapper.
- **D-157a7 the docs realignment**: the AGENTS Session-157 section ·
  the PAD session-157 row · the session_333 record + this plan
  execution record + the worklog Task ID 157.

## The lessons (recorded at ship)

- **L-157c1 the entry guard is part of the tool's contract** (a
  script that runs on import is a test-time bomb — the guard is
  what makes the seams-and-pins doctrine safe; the s149 tool missed
  the idiom its two siblings shipped with, and the defect sat
  masked behind the standing dev server for 8 sessions).
- **L-157c2 the scope's DEFAULT is the hazard's next face** (the
  negative keying — "absorb unless listed" — re-opens the walk45
  hazard on every new static surface; the positive keying —
  "absorb only on the DATA class" — makes the default RED and the
  hazard impossible; L-156c2 taken to the invariant).
- **L-157c3 the census's own login is a scarce resource** (the
  mid-round "CPU-contention" timeouts decoded as the login rate
  limiter: 4 logins/invocation vs the 10-per-IP/15-min fixed window —
  the limiter is the production contract, untouched; the gate cadence
  budgets its logins and the dev-server restart clears the
  per-process bucket).

## The execution record (filled at ship)

- [x] 157-a / 157-b the audits (the baseline gate GREEN + the
      fullpage entry-guard FINDING · probe #131 STABLE · six gates
      CLEAN ×6)
- [x] D-157a0 the fullpage-sweep entry guard (RED pin → the
      siblings' guard → GREEN 12/12; the direct run re-verified;
      the fresh-box exit code deterministic)
- [x] D-157a1 the RED pins (the legs contract + the scope flip +
      the login verdict + the mutation-proof doctrine — 7 RED + 1
      born-green at birth; the s152/s155/s156 pins re-anchored)
- [x] D-157a2 the implementation (the login leg — additive; the
      positive DATA keying; the header re-anchors)
- [x] PASS 1 the maiden census (ALL FOUR axes born CLEAN — mainH Δ0
      everywhere, 43/43 els: 23 matches + 19 token-mirror + 1
      wrapper-twin + 1 login-logo-mark, zero unexplained)
- [x] D-157a3 the decode-driven pins + fixes (the LOGIN-LOGO-MARK
      genus — the workspace-logo img decoded as live branding data,
      never mirrored; the exact-token signature + the negatives)
- [x] PASS 2 the mutation-proof (planted → RED [phone: 42
      unexplained + mainH Δ0 — the geometry catch alone, the s153
      desktop form · desktop: 40 · exit 1, axis-prefixed] → reverted
      [zero src diff] → GREEN [exit 0, the standing values])
- [x] D-157a4 the count ladder (UNIT 2229→2233 · badge 2382→2386 ·
      the live sites atomically [count-ladder-157.py, assert-first,
      idempotent] · the historicals preserved · the CLAUDE carriers
      grew the 2229 forms · the SKILL v1.154.0 + the s157 head +
      the Appendix B + the layer-axis pin)
- [x] D-157a5 the captures 369-372 + the VLM battery 2/2 (both
      pairs MATCH — the logo content + the Base44 pill the
      documented genera on both adjudications)
- [x] D-157a6 the verification chain + the ship (lint 0/0 · tsc 0 ·
      119/2233 · build · e2e 153/153 clean first run · the SIX drift
      gates CLEAN ×6 — the census gate at 52 page-axis runs, all
      zero unexplained · census MATCH) · THE RATE-LIMIT DECODE
      (the 429 root cause + the dev-server restart — the limiter
      untouched)
- [x] D-157a7 the docs realignment (the AGENTS Session-157 section ·
      the PAD session-157 row + the Total row preserved · the
      session_333 record + this execution record + the worklog Task
      ID 157)
- The lessons recorded: **L-157c1** the entry guard is part of the
  tool's contract · **L-157c2** the scope's DEFAULT is the hazard's
  next face (the positive DATA keying — the invariant form of
  L-156c2) · **L-157c3** the census's own login is a scarce resource
  (the rate limiter is the production contract; the gate cadence
  budgets its logins).
