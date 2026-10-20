# Session 333 — the session-157 record (the login-wall census leg)

## The intake

The workspace had been reset — a fresh clone (the pull path became
`git clone https://github.com/nordeim/neo-crm.git`), the standing
environment rebuilt from the repo's own contracts: `.env` from
`.env.example` (the `file:../db/custom.db` root contract + a fresh
`AUTH_SECRET`) · `db:push` + `db:seed` (census MATCH 15/24/10/23/12 +
4 users) · the Playwright chromium installed · the dev server booted.
The pull state: `471f89e` — the s156 feat `d756cef` + the
session_331 log `f425a71` + the owner's session_332 transcript commit.

## The audits

- **157-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **119/2229**
  · build · **e2e 153/153** (clean first run — the drawer battery
  inside, the mobile-nav contract) — **with ONE FINDING**: the unit
  suite's EXIT CODE reds on a fresh box (`scripts/fullpage-sweep.ts`'s
  unguarded top-level `run()` fires on the vitest import and
  `process.exit(1)`s with no dev server — all 2229 checks passing;
  the defect masked behind the standing dev server for 8 sessions;
  the first-run `bun run test` documented in AGENTS.md failing on a
  fresh clone). Remediated as **D-157a0** this round.
- **157-b**: probe:ref **#131 STABLE** at the s147–s155 fingerprint
  (`index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576) — a rotation round ·
  **the SIX drift gates CLEAN ×6** (the four viewport sweeps + the
  fullpage at the exact standing values 0.093%/0.316% at equal
  heights 4990/7259 + the census gate at 48 page-axis runs, all zero
  unexplained) · sitemap 11 routes + robots 200 + the SEO meta · db
  census MATCH · zero dep changes.

## The rotation decision

The session_331 next-round reading's strongest candidate executed:
**the login-wall census leg — the only never-censused rendered
surface left** (the surface census arc's completion: standing-gate
s152 → desktop s153 → tablet/landscape s154 → landing s155 →
about/contact s156 → the login wall s157 — every rendered surface
now walked + gated at all four axes inside the one standing
`gate:full`). The alternatives weighed and deferred: the settings
intraday-rhythm map (observation-only — the DATA genus already
SKIP-gated by doctrine), the census runtime optimization ("if it
ever matters" — the 52-run gate's wall-clock), the next bundle
event's below-fold re-derivation (no event — probe #131 STABLE).

## The pre-plan probe (the plan validated BEFORE execution)

The reference's /login decoded at the #131 bundle, GUEST and
LOGGED-IN, phone + desktop: **both apps render /login inside `main`
with byte-equal classes** (`min-h-screen flex items-center
justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4`),
**mainH byte-equal both apps both contexts** (844 phone · 900
desktop — never measured before), **els 51/51** in all four
context-axis combos, **GUEST and LOGGED-IN render the IDENTICAL
card** (the S23-P2 card-to-authed-visitors evidence re-validated) —
the `censusPage` collector works AS-IS and the LOGGED-IN protocol is
FREE (the census login phase already runs; no guest contexts, no
new machinery). One real construction face visible in the digest:
the logo mark (ours: the 40×40 CSS brand mark span; the reference:
an `img` filling the 80×80 ring — decoded below).

## The walk (walk47 — the maiden census + the mutation-proof)

- **PASS 1 THE MAIDEN CENSUS**: ALL FOUR axes born CLEAN — **mainH Δ0
  at every axis**, **43/43 elements: 23 matches + 19 token-mirror +
  1 wrapper-twin + 1 login-logo-mark, zero unexplained**. The maiden's
  one decode face: **the LOGIN-LOGO-MARK GENUS** — our CSS brand mark
  is ours-extra at every axis; the raw-byte probe decoded the
  reference's construction: its ring loads the **WORKSPACE OWNER'S
  UPLOADED LOGO** (a Base44-prod Supabase storage img — the owner's
  own "Screenshot2026-02-05…png" upload, keyed to the workspace id —
  LIVE BRANDING DATA, the Base44-pill genus class, **never mirrored**);
  the ring boxes pair byte-equal as cls-only token-mirrors and the
  ref img absorbs as the ring's wrapper-twin. The genus absorbs ONLY
  the exact standing signature (`loginLogoMarkSignature`, the
  settingsRowSignature exact-token idiom + the SPAN tag) — a
  different tag, a restyled token set, or the same shape on another
  page stays RED (negatives pinned all).
- **PASS 2 THE LOGIN MUTATION-PROOF**: the ghost div planted under
  the login card's subtitle via targeted string surgery →
  `census:interior --pages login --axis phone --fail-on-drift` →
  **RED** (phone: 44/43 els, **42 unexplained** — the ghost + the
  displaced card tail; **mainH Δ0** — the taller card still fits the
  844 viewport, the catch rides the GEOMETRY alone, the s153
  desktop form; desktop: 40 unexplained; exit 1, the failure
  axis-prefixed) → the string-surgery revert (zero src diff) →
  **GREEN** (exit 0, the exact standing values). The F-151c1 class
  now fails the gate on **all THIRTEEN censused surfaces**.
- **THE RATE-LIMIT DECODE (the transient, decoded)**: the mid-round
  census login timeouts were NOT the M-72c1 CPU-contention lineage —
  the dev log showed `POST /api/auth/login 429`: the census burns 4
  our-logins per invocation and the login limiter is 10 per IP/15 min
  (fixed-window; 429s also increment) — the maiden + the back-to-back
  retries exhausted the bucket. Resolution: the dev-server restart
  clears the per-process bucket; the maiden, the mutation-proofs,
  and the sweeps then fit the budget. The limiter itself is the
  production security contract — untouched (L-157c3).

## The remediation (TDD — the pin ledger)

- **D-157a0 the fullpage entry guard**: the RED pin (the siblings'
  direct-execution idiom + the unguarded top-level call RETIRED +
  the [fullpage]-prefixed catch) → the implementation (the exact
  `sweep.ts`/`interior-census.ts` guard form) → GREEN (12/12) + the
  direct run re-verified (the fullpage gate CLEAN at the standing
  values) + the unit exit code deterministic.
- **D-157a1 the RED pins** (`tests/interior-census-tool.test.ts`
  +3; the re-anchors): the login leg contract (INTERIOR_PAGES 12 +
  the sweep lockstep + the not-public dispatch) + the login
  mutation-proof doctrine (--pages login, the header docs) + the
  LOGIN-LOGO-MARK genus (the fixture positives + the negatives ×3 +
  the src pins). The re-anchors: the s152 11-page pin → the 12-page
  contract; the s155 PUBLIC/composition pins 12→13 (+ the login
  selection case); the s156 legs/scope/verdict/doctrine pins → the
  positive DATA keying forms. **7 RED at birth + 1 born-green** (the
  verdict login rows — `censusVerdict` surface-agnostic, the
  s155/s156 pattern) → the implementation → GREEN.
- **D-157a2 the implementation**: `INTERIOR_PAGES` + login +
  `CENSUS_ALL_PAGES` 13 + **THE SCOPE FLIP** — `CENSUS_DATA_PAGES`
  (the 9 app pages) + `isCensusDataPage`; live-data absorbs
  text-only pairs ONLY on members; `STATIC_MARKETING_PAGES` /
  `isStaticMarketingPage` RETIRED; the header doctrine re-anchored
  (login IS a main interior) + the --pages docs gain the login leg
  (`scripts/interior-census.ts`, additive — the logged-in protocol
  byte-identical).
- **D-157a3 the decode-driven pins + fixes**: the
  `loginLogoMarkSignature` export (the exact-token idiom) + the
  direct rule (page-keyed, ours-extra, the tag guard) + the
  documented-genera header entry — RED at birth → GREEN; the maiden
  walk then CLEAN at all four axes.
- **D-157a4 the count ladder**: UNIT **2229→2233** · SUITES 119
  held · badge 2382→2386 · the live lockstep sites flipped atomically
  (count-ladder-157.py, assert-first, idempotent; the historical
  clauses preserved — the AGENTS/PAD s156 records, the
  session_331/332 records, the plans, the worklog) · the
  CLAUDE-carrier negatives ladders grew the 2229 forms (all four
  carrier families) · the SKILL **v1.154.0** + the s157 head (the
  s156 layer demoted beneath) + the Appendix B totals + the
  layer-axis pin flipped. (One ladder-script lesson: the
  append-style comment edit re-applied on the idempotent re-run —
  old ⊂ new defeats the n_old==0 skip; collapsed by hand, noted.)
- **D-157a5 the captures 369-372** (the phone login-card pair at
  the mutation-proof zone + the desktop logo-mark pair at the genus
  zone — both logged-in pairs, scrolled + verified in-frame) + **the
  VLM battery 2/2** (the phone card pair MATCH — every element
  identical; the desktop logo-mark pair MATCH — the logo content +
  the reference's Base44 pill the only differences on both
  adjudications — the documented genera, never mirrored).
- **D-157a6 the verification chain**: lint 0/0 · tsc 0 ·
  **119/2233** · build · e2e **153/153** (clean first run) · **the
  SIX drift gates CLEAN ×6** (the four viewport + the fullpage at
  the exact standing values + **the census gate at ALL FOUR axes ×
  13 surfaces — 52 page-axis runs, all zero unexplained**, the 48
  standing runs at their exact standing values, the login leg at its
  maiden values) · census MATCH · the mutation-proof (planted → RED
  at phone + desktop → reverted → GREEN).

## The ship

The docs realignment (the AGENTS Session-157 section · the PAD
session-157 row + the Total row preserved · the SKILL s157 head +
v1.154.0 · this record + the plan execution record + the worklog
Task ID 157). The two-commit pattern (the feat + the session log)
pushed to git@github.com:nordeim/neo-crm.git main via the SSH
wrapper (the paramiko shim; the dry-run then the real push;
remote-verified; the key shredded).

**Next**: the standing rotation candidates — the settings
intraday-rhythm map (the morning/afternoon double capture at four
axes, observation-only), the census runtime optimization (the
parallel-axes option — the 52-run gate's wall-clock), the
M-72c1/rate-limit operational doctrine's formalization (the gate
cadence's login budgeting), or watch for the next bundle event's
below-fold pin re-derivation (the L-151c1 doctrine — the census now
automates its discovery on every censused surface, all THIRTEEN of
them).
