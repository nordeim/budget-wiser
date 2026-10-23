# The session-170 plan — THE ERROR-BOUNDARY FAMILY + THE BOOT GATE + THE SMOKE LEG + THE ARTIFACT HYGIENE + THE DOCTRINE-STRAGGLER CLOSURE

Date: 2026-10-23 · Rotation: 170 ·
Task: audit + validate the session-169 ship (the CLAUDE-doctrine closure +
the stack-facts live-census + the production secret gate), remediate the
findings TDD-first, align every doc, capture the screenshots, and push to
`git@github.com:nordeim/neo-crm.git` (main only, via
`docs/ssh_git_wrapper_v3.py`).

## 0. The audit that motivated this round (the finding register)

Baseline state at `567e906` (the s169 ship `bba9a7d` + its session-log
commit; fresh clone intake: `bun install` → `.env` with a fresh 64-char
AUTH_SECRET + `file:../db/custom.db` → `db:push`/`db:seed` → census MATCH
15/24/10/23/12 + 4 users → playwright chromium installed; the ambient
`DATABASE_URL` shadow — `file:/home/z/my-project/db/custom.db` — scrubbed
with `env -u` on every DB-touching command, the documented sandbox class):

| Gate | Verdict |
|---|---|
| lint | GREEN 0/0 |
| typecheck | GREEN |
| unit | GREEN **130/2559** (the s169 ship state) |
| build | GREEN (29 routes) |
| e2e | GREEN **161/161** (3.6 m clean run) |
| probe:ref | **STABLE** (bundle md5 `46bc2d9c…` — the s168/s169 fingerprint; demo zero; every standing layer verified) |
| drift gates | the desktop + phone sweeps **CLEAN** live this round (0.5pct margin) |
| mobile drawer | **7/7 PASS** live at 390×844 (`scripts/drawer-battery-168.ts`) — the operator's particular emphasis, live-verified, no Tailwind v4 regression |
| Tailwind v4 state | clean (the postcss plugin `@tailwindcss/postcss` · CSS-first, no JS config · the vendored `tw-animate.css` · literal-hex `@theme` tokens) |
| sitemap + robots + manifest | 11 routes / standing / standing (source-verified) |
| db census | MATCH (15/24/10/23/12 + 4 users) |
| operator checklist | `.env` `file:../db/custom.db` with `db/` at the repo root · vitest + playwright standing · `.env.example` current (the six-knob contract) |

The scandihaven reference round (the s169-deferred ports now evaluated for
adoption, each verified against the live tree first): the
`instrumentation.ts` boot gate + the `error.tsx`/`global-error.tsx`
boundary family + the stale-chunk self-heal → **ADOPTED this round** (the
named next-rotation candidates); the smoke-test leg → **ADOPTED** (the
web-app-foundation §13.4/§14 gate-order leg the repo never had); the
axe-core a11y gates + fast-check property tests → still deferred (new
devDeps — the no-mid-rotation-bump posture holds).

### The code findings (each reproduced live this round)

| # | Finding | Location | Severity | Confidence |
|---|---------|----------|----------|------------|
| F-170a | **The standalone production artifact ships the repo's private content**: `.env` (the real AUTH_SECRET + DATABASE_URL — 115 bytes of live secret), `.git/` (171 MB — the full history), `db/` (the dev SQLite file with user rows + scrypt hashes), `uploads/` (dev-uploaded photos), `skills/` (194 MB — the whole 248-skill bank), `docs/` (49 MB incl. every session log), `dev.log`, `worklog.md`, `test-results/`, `AGENTS/CLAUDE/README/PAD/SKILL`, `scripts/`, `tests/`, the tsconfigs — ~550 MB total where ~151 MB suffices. ROOT CAUSE (verified via the upload route's nft.json): the upload family's runtime-computed fs paths (`uploads.ts`'s validated-anchor `existsSync`/`resolve` chains) make `@vercel/nft`'s static analysis fall back to tracing the whole `outputFileTracingRoot` — every repo-root entry lands in `app/api/upload/route.js.nft.json` (2715 skills files alone). AND `.env` rides twice: the trace AND Next's own `writeStandaloneDirectory` `loadedEnvFiles` copy (`node_modules/next/dist/build/index.js:323` — the explicit `.env`/`.env.production` loop, immune to tracing excludes). Deploying the artifact as documented (copy `.next/standalone` to a server) ships the signing secret, the source history, the dev database, and the internal engineering docs to every production host. | `.next/standalone/` after `bun run build` | **Critical** | Verified |
| F-170b | **No error boundaries anywhere**: zero `error.tsx` / `global-error.tsx` in `src/` — an uncaught client render error or a root failure renders Next's stock unbranded crash page (no house styling, no recovery affordance, no digest ref, no stale-chunk self-heal). The scandihaven port deferred at s169 as "its own rotation: a new visual surface" — this is that rotation. A redeploy invalidates hashed chunks; a stale tab's next soft navigation throws `ChunkLoadError` with no self-heal (the scandihaven `chunk-recovery` seam — reload-once-with-cooldown — is the ported cure). | `src/app/` (absent) | High | Verified |
| F-170c | **No boot gate**: the s169 production secret gate is a runtime seam (`secret()` throws at the first session op) — a misconfigured production boot (missing/short AUTH_SECRET, a localhost NEXT_PUBLIC_SITE_URL, an unknown `NEO_*` toggle typo, an unparsable NEO_PROXY_HOPS) boots silently and fails late, or never signals at all. The web-app-foundation §6.2 posture + the scandihaven `instrumentation.ts` pattern prescribe fail-fast AT BOOT with the actionable message. | `src/instrumentation.ts` (absent) | High | Verified |
| F-170d | **No smoke leg**: the web-app-foundation §13.4/§14 gate order is lint → typecheck → test → build → **smoke** → e2e → audit — the repo's `gate` script has no smoke step; there is no `scripts/smoke-test.sh`; nothing boots the standalone artifact and asserts the 401/400/429/health/page-render contracts against it between build and e2e. | `scripts/` (absent) + `package.json` `gate` | Medium | Verified |

### The doc findings (each reproduced live — the digest agents' claims re-verified)

| # | Finding | Location | Severity |
|---|---------|----------|----------|
| F-170e | AGENTS' live-tense reports-pipeline doctrine bullet cites the RETIRED `REPORTS_PIPELINE_SLUGS` + a `reportsBucketCounts` that exists NOWHERE in src/ + the retired s10 "merged-list double-report" quirk as current practice — an agent following it implements the wrong counting behavior and hunts for phantom functions. The live seam: `pipelineStageCounts` (s31 split, s54 retirement comments in constants.ts:172-174). | AGENTS.md:291-295 | High |
| F-170f | PAD §5.2's "DEFINITIVE" Color Tokens table carries FOUR stale hexes (`--color-primary #3b82f6` vs live `#2563eb` · `--color-foreground #111827` vs `#0a0a0a` · `--color-line #e5e7eb` vs `#e5e5e5` · `--color-line-soft #f3f4f6` vs `#f5f5f5`), omits `--color-line-strong #e5e7eb`, mis-attributes placeholders to `--color-subtle` (live: `--color-muted-ink #737373`), and keys the contrast sentence off `#111827` — the s169 fix wave re-pinned SKILL §4.1/§19 but never PAD §5.2 (the same drift genus, the last un-flipped color carrier). | PAD:611-630 | High |
| F-170g | The session-gating doctrine counts are wrong in three places: PAD §3.1 "all guarded by requireSession() (except auth/login, auth/signup, health, search's public shell)" — search has NO public shell (its GET is `requireSession()`-gated first statement); PAD §6.1 "19 sessioned; the 10 sessionless: the public auth family's 8 verbs"; SKILL §5.2 "all session-gated via requireSession()". LIVE: **20 sessioned / 9 sessionless (the 7 public auth verbs + health + uploads/[name])**. | PAD:333-336, 657 · SKILL:383-384 | Medium |
| F-170h | AGENTS:288-290 cites the RETIRED `FUNNEL_STAGES` with wrong labels (New/Qualified/Won/Lost) — the live vocabulary is `LEADS_FUNNEL` = New Leads/Contacted/Qualified/Won (constants.ts:188-193, consumed by `ConversionFunnel`). | AGENTS.md:288-290 | Medium |
| F-170i | AGENTS:510-519 names three RETIRED chart components in the present tense (`PipelineBarChart`, `WonLostLineChart`, `FunnelBarChart`) — the live family: SingleBarChart/GroupedBarsChart/TrendLineChart/LabelPieChart/HorizontalBarChart/RevenueLineChart/ConversionFunnel. | AGENTS.md:510-519 | Medium |
| F-170j | AGENTS:209-211 documents the WRONG localStorage key for the leads Saved Views: `neo-crm.leads.view` — the live key is `neo-crm.leads.views` (`LEAD_VIEWS_STORAGE_KEY`, lead-filters.ts:45). An agent reading/writing the documented key misses the persisted views. | AGENTS.md:209-211 | Medium |
| F-170k | The AGENTS Commands table omits SEVEN of package.json's scripts: `db:generate`, `test:watch`, `sweep`, `sweep:fullpage`, `census:interior`, `probe:ref`, `gate:full` — the agent's entry-point table misses the entire drift-gate family it elsewhere calls doctrine. | AGENTS.md:12-26 | Medium |
| F-170l | README's Key-Features row narrates the STALE pricing "$9/$19/$39 tiers" — the live landing ships $8/$14/$20 (landing-page.tsx:120/134/148; the s149 repricing that README never caught). | README.md:40 | Medium |
| F-170m | PAD §4.2's wire-type enumeration lists the RETIRED `SavedReport` (retired from the barrel at s59) and omits the live `Opportunity` (types/index.ts:89). | PAD:569-571 | Medium |
| F-170n | SKILL §19's chart-palette note claims `CHART_COLORS` carries "red/gray/violet/emerald + the -400 family" — live: violet/emerald ONLY (constants.ts:514-530; gray+-400 retired s90, red retired s142). | SKILL:6412-6414 | Medium |
| F-170o | SKILL §20 "The COMPLETE TypeScript Interface Reference" omits the live `Opportunity` interface. | SKILL:6424-6538 | Medium |
| F-170p | SKILL Appendix A's ADR-007 row ("Vitest pure seams + Playwright golden path") contradicts PAD §1.3's ADR-007 ("React-19-lint-clean dialog patterns (remount-via-key)") — the s166 dedup kept the wrong survivor. | SKILL:6560 | Medium |
| F-170q | PAD §5.1's table-header row claims "System 500, 12px, uppercase, wide tracking" — live `TableHead`: `font-medium text-muted-ink`, Title Case, the 16px base (the s3 parity fix). | PAD:601 | Medium |
| F-170r | SKILL §2's radix row says `^1` for all 6 — live: dropdown-menu ^2.2.1, label ^2.1.17, select ^2.4.1 (3 of 6 are ^2). | SKILL:151 | Low |
| F-170s | README:130's file-tree annotation "charts/ # recharts wrappers with empty states" — the empty-state boxes were retired at s10 (the doc's own doctrine). | README.md:130 | Low |
| F-170t | SKILL §8's contrast claim keys off `#111827` (live foreground `#0a0a0a`); SKILL:1242 + 10960 + 11753 carry stale `16.3.6` literals (live next 16.4.2). | SKILL:698, 1242, 10960, 11753 | Low |
| F-170u | README claims an MIT license (badge + License section) but NO LICENSE file exists at the repo root. | README.md:9, 1062-1065 | Low |

Out of scope this round (documented, not silently dropped): axe-core a11y
gates + fast-check property tests (new devDeps — the no-mid-rotation-bump
posture); the 9 dev-toolchain advisories (the same posture); RBAC; the
bundle-event watch (probe:ref STABLE); e2e specs that force the error
boundaries (no honest trigger exists without a committed debug affordance —
the boundary contracts ride unit source-pins + live captures instead, the
documented posture).

## 1. The verified experiments (the plan's core assumptions, proven live BEFORE this plan landed)

1. **The boot gate is real on this stack**: a minimal `src/instrumentation.ts`
   whose `register()` throws on production + missing AUTH_SECRET was built
   and booted — Next 16.4.2 picks the file up, traces it into the standalone
   output, and the throw produces `Failed to prepare server Error: An error
   occurred while loading instrumentation hook: [boot] …` + `Failed to
   preload entries` — the server NEVER serves (health probe dead). The
   `NEXT_PHASE === "phase-production-build"` guard keeps `next build` itself
   safe (verified: the build compiled clean with the gate present, no
   AUTH_SECRET needed at build time). All experimental edits were then
   reverted — the round re-lands them TDD-first.
2. **The artifact-hygiene fix works**: `outputFileTracingExcludes` with the
   repo-root-relative globs (`.git/**`, `db/**`, `uploads/**`, `skills/**`,
   `docs/**`, `test-results/**`, the md doc set, `scripts/**`, `tests/**`,
   the dev configs) drops the artifact from ~550 MB to 151 MB carrying only
   `server.js` + `.next/` + `node_modules/` + `package.json` + `prisma/` +
   `public/` + `src/` + `next.config.ts` — and the photo-upload e2e pair
   (the upload family the tracer over-traced) ran GREEN against the clean
   artifact (3 passed — the excludes break nothing the server actually
   needs; `prisma/schema.prisma` stays traced, the db-path anchors still
   validate, `uploads/`/`db/` are mkdir'd on demand at runtime).
3. **The `.env` double-ship has a two-part cure**: the tracing exclude
   removes it from the nft files list, but Next's own
   `writeStandaloneDirectory` copies `.env`/`.env.production` explicitly
   (build/index.js:323) — the `build` script's trailing
   `rm -f .next/standalone/.env` removes that copy (verified: `.env REMOVED
   from artifact` after the rebuild). `bun run start` is unaffected (bun
   loads the REPO-root `.env` at launch — the artifact copy was never the
   launch mechanism); the e2e webServer sets env explicitly; a deployed
   artifact gets its env per `docs/DEPLOYMENT.md` §4.

## 2. The work packages (TDD — every WP lands RED tests first)

### WP-1 — the doctrine-census battery (the 131st suite)

`tests/doctrine-census.test.ts` (+~40) — the L-165c1 doctrine extended to
the straggler register: every doc finding pinned live-read where the value
has a source of truth —

- (a) The AGENTS doctrine pins (F-170e/h/i/j): the live-tense
  architecture-facts section carries the `pipelineStageCounts` form + the
  retired `REPORTS_PIPELINE_SLUGS`/`reportsBucketCounts` forms ABSENT
  (section-scoped, wrap-normalized — the L-169c1 form); the
  `LEADS_FUNNEL` New Leads/Contacted/Qualified/Won form (read LIVE from
  constants.ts) + the retired FUNNEL_STAGES-labels clause absent; the live
  chart family present + the three retired component names absent; the
  `neo-crm.leads.views` key read LIVE from `LEAD_VIEWS_STORAGE_KEY` + the
  singular `` `neo-crm.leads.view` `` quoted form absent.
- (b) The Commands-table completeness pin (F-170k): every package.json
  script key (read LIVE) appears in AGENTS' Commands table (the `smoke`
  row lands with WP-4).
- (c) The PAD color-table live-census (F-170f): the four re-pinned hexes
  read LIVE from globals.css's `@theme` (the F-168h idiom) + the
  `--color-line-strong` row present + the stale hexes absent from §5.2 +
  the placeholders row carrying `--color-muted-ink` + the contrast
  sentence keyed on `#0a0a0a`.
- (d) The session-gating census (F-170g): "20 sessioned" + "9 sessionless"
  forms present (the counts read LIVE from the requireSession grep) + the
  phantom "search's public shell" clause absent — in PAD §3.1, §6.1 AND
  SKILL §5.2 (the three sites, one census).
- (e) The type/palette pins (F-170m/n/o): PAD §4.2 carries `Opportunity` +
  `SavedReport` absent (read LIVE from src/types/index.ts); SKILL §19's
  CHART_COLORS note matches the LIVE keys (violet/emerald); SKILL §20
  carries the Opportunity interface row.
- (f) The small carriers (F-170l/q/r/s/t/u): README's pricing row read
  LIVE from landing-page.tsx's price fields ($8/$14/$20) + the $9/$19/$39
  form absent; PAD §5.1's Title-Case/muted-ink form + the 12px-uppercase
  form absent; SKILL §2's radix split (^1/^2) read LIVE from package.json;
  README's charts-tree annotation carrying the recharts-defaults form +
  "with empty states" absent; the LICENSE file EXISTS at the repo root +
  README's MIT row consistent; SKILL §8's `#0a0a0a` form + the
  `16.3.6` literals absent (the version read LIVE from node_modules — the
  F-169f idiom).
- (g) The NEW-surface pins (born with the GREEN phase): the README file
  tree carries `error.tsx` + `global-error.tsx` + `instrumentation.ts` +
  `smoke-test.sh`; the AGENTS gate-order line + CLAUDE's gate row carry the
  smoke step; package.json's `gate` chain carries `smoke` (read LIVE).
- Mutation-proof at birth: plant a doc regression → exactly the carrying
  pins go RED → revert → GREEN.

### WP-2 — the chunk-recovery seam + battery (the 132nd suite)

`src/lib/chunk-recovery.ts` (the scandihaven port, the pure-seam house
form): `CHUNK_RELOAD_FLAG`/`CHUNK_RELOAD_COOLDOWN_MS` (10 s) +
`isStaleChunkError(message)` (the ChunkLoadError/Failed-to-load-chunk/
Loading-chunk/dynamically-imported-module family) +
`shouldHardReload(message, now, lastReloadAt)` (the injectable-clock
cooldown) + `reloadOnStaleChunk(error, deps?)` (the fully-injectable
storage/now/reload form — storage access guarded, unavailable storage
DISABLES the reload, never throws from the recovery path; the flag written
BEFORE the reload so a crash mid-reload cannot loop).
`tests/chunk-recovery.test.ts` (+~12): the regex family, the cooldown
arithmetic (null/within/at/past), the non-chunk pass-through, the guarded
storage branches, the flag-write-before-reload ordering. RED first.

### WP-3 — the boot gate + battery (the 133rd suite)

`src/lib/boot-env.ts` (the pure seam) + `src/instrumentation.ts` (the
Next hook). The seam returns `{ fatal, warnings }` from an env-shaped
record — the SIX-KNOB contract validated:

- production + AUTH_SECRET missing or <16 chars → **FATAL** (mirrors the
  s169 `secret()` message family: the [boot] prefix, the openssl command,
  the .env pointer — the boot gate front-runs the first-session-op throw);
- production + NEXT_PUBLIC_SITE_URL unset/localhost/127.0.0.1 → WARNING
  (metadata/robots/sitemap/OG would advertise localhost — the honest
  misconfig signal; dev is exempt: localhost IS the dev origin);
- unknown `NEO_*`-prefixed env vars (outside the closed
  NEO_PROXY_HOPS/NEO_DISABLE_IN_APP_OTP/NEO_DISABLE_IN_APP_RESET set) →
  WARNING (the scandihaven flag-typo guard, warn form — a mistyped kill
  switch silently no-ops today);
- NEO_DISABLE_IN_APP_OTP/RESET values outside `""`/`"1"` → WARNING (every
  other value silently behaves as unset);
- NEO_PROXY_HOPS unparsable/negative → WARNING (the seam already fails
  CLOSED onto 1 — the boot warning adds the visibility);
- `bootEnvCheck` is PURE (no process access); `applyBootEnvReport` prints
  the warnings + throws the fatal (injectable logger — the auth-battery
  idiom).

`src/instrumentation.ts`: `register()` — edge-runtime skip, the
`phase-production-build` skip (the verified guard), dynamic import of the
seam, apply. Dev/test boot soft (the DX posture unchanged — the DEV
fallback stays documented). `tests/boot-env.test.ts` (+~15): the env-matrix
over the pure seam + the instrumentation source pins + the
NEXT_PHASE/NEXT_RUNTIME guard forms. RED first.

### WP-4 — the error-boundary family + battery (the 134th suite)

`src/app/error.tsx` (the route-segment boundary — renders inside the root
layout) + `src/app/global-error.tsx` (the root boundary — own
`<html lang="en"><body>`, imports `./globals.css` itself because a crashed
root layout never loaded it). Both: `"use client"`, the
`reloadOnStaleChunk(error)` wiring in `useEffect([error])`, the house-styled
slate-family card (the not-found.tsx idiom: the centered card, the divider,
the muted message), the digest-ref conditional (`(ref: ${error.digest})`),
the `reset()` Try-again button, ZERO component-tree imports beyond the
recovery seam (a resilience surface must not depend on the tree that
might be broken). The copy vocabulary: "Something went wrong" / "An
unexpected error occurred" / "We have logged the issue" / "Try again".
`tests/error-boundaries.test.ts` (+~10): the source contracts (the
directives, the wiring, the copy, the html/body in global-error, the
globals.css import, the no-component-tree-import posture) + the smoke
script contract pins (below). RED first.

### WP-5 — the smoke leg + the artifact hygiene (the config leg)

`scripts/smoke-test.sh` (the §13.4 skeleton, the neo-crm form): own
`DATABASE_URL=file:../db/smoke.db` (db:push + db:seed on it — the ambient
override the db-path seam documents), boot the STANDALONE artifact on
:3210 with NODE_ENV=production + a dedicated 33-char AUTH_SECRET, the
health-wait loop, then the assertion ladder — (01) /api/health 200 +
`"status":"healthy"` · (02-03) unauthenticated /api/contacts +
/api/dashboard → 401 · (04) /login renders the title · (05) / renders the
landing hero · (06) the demo login → the neo_session cookie · (07) the
sessioned /api/contacts 200 · (08) the invalid-payload POST → 400 · (09)
the valid create → 200 · (10) logout → /api/auth/me 401 · (11) the login
rate-limit probe LAST (10 total attempts spent → the 11th → 429) · (12)
sitemap.xml + robots.txt + manifest.json all 200 · (13) **the boot-gate
probe**: a second boot WITHOUT AUTH_SECRET never serves + the log carries
the actionable message · (14) **the artifact-hygiene assertions**: the
built artifact contains NO `.env`/`.git`/`db`/`skills`/`docs`/`uploads`/
`worklog.md`/`test-results` entries. `package.json`: the `smoke` script +
the `gate`/`gate:full` chains gain `./scripts/smoke-test.sh` between build
and e2e (the §14 order). `next.config.ts`: `outputFileTracingExcludes`
(the verified 27-entry set) + the build script's trailing
`rm -f .next/standalone/.env` (the verified double-cure). Pins ride
WP-4's battery (the script's contract: the smoke db, the port, the
assertion vocabulary, the hygiene block).

### WP-6 — the GREEN phase (the ~20 doc flips + the new-surface docs)

Every flip riding its WP-1 pin: the AGENTS doctrine bullets + the Commands
table (+8 rows: the 7 missing + smoke) + the gate-order line + the
Session-170 section; the README pricing row + the tree (error.tsx/
global-error.tsx/instrumentation.ts/smoke-test.sh + the charts annotation)
+ the LICENSE file (the MIT text, copyright nordeim — the documented
intent); the PAD §5.2 table (the four hexes + line-strong + the
placeholders row + the contrast sentence) + §5.1 + §3.1/§6.1 (the 20/9/7
forms) + §4.2 (Opportunity in, SavedReport out) + ADR-015 (the boot gate +
the boundary family + the smoke leg + the artifact hygiene — context/
decision/rationale/rejected-alternatives) + the §1.3 index + the §11 rows
(the five new files' line counts) + the session-170 inventory row; the
SKILL v1.**167.0** frontmatter + H1 + the s170 head layer + §5.2's gating
form + §8/§19/§20/§2/AppA/AppB fixes + the §11 gate block + the smoke/
boundary facts; CLAUDE's Build Commands table (the smoke row + the gate
chain) + the Error Handling section's boundary family + the env-table's
boot posture line; `.env.example`'s AUTH_SECRET comment gains the
boot-gate sentence (the throw now fires at boot, front-running the first
session op).

### WP-7 — the count ladder

Derived AFTER the batteries land (L-166c3): UNIT 2559 → 2559+N · SUITES
130 → **134** · E2E 161 held (the boundaries are unreachable by honest
e2e without a debug affordance — documented; the smoke leg covers the
boot/artifact contracts) · badge 2720 → 2805 — every live-tense site
re-anchored atomically (`count-ladder-170.py`, assert-first, idempotent —
the insertion guards FIRST, the verified-single head-surgery guard — the
L-167/L-168/L-169 tooling lessons) + the SKILL v1.167.0 frontmatter + H1
lockstep + the s170 head layer.

### WP-8 — the docs + the captures + the verification

`docs/session_361.md` (the odd-number canonical record) +
`docs/session_362.md` (the transcript-style execution log) + the plan's
execution record + the worklog entry (Task ID 170). The captures 417-420:
the error-boundary pair at phone + desktop — captured LIVE via a
TEMPORARY UNCOMMITTED throw patch (a working-tree-only `throw` in a client
page for error.tsx; in the root layout for global-error.tsx — reverted
immediately after the captures; the committed tree carries no debug
affordance) + the VLM battery. The verification chain: lint · typecheck ·
unit (the new totals) · build (29 routes, the hygienic 151 MB artifact) ·
**smoke (the new leg, 14/14)** · e2e 161/161 · db census MATCH ·
mutation-proof.

### WP-9 — the commit + the push

`git commit` on main (the session mega-message, the house convention) —
the change set INCLUDES `.env.example` (the operator contract) and the
LICENSE file. The push via `docs/ssh_git_wrapper_v3.py` (the runbook:
`docs/how-to-git-push-using-ssh-wrapper_SKILL.md`) — operator key
materialized to a 0600 file outside the repo, shredded after;
remote-ref verification; NO new branches.

## 3. The validation of this plan against the codebase

- Every finding's line citation re-verified live at `567e906` (the byte
  forms quoted in the register; the session-gating census re-derived:
  `rg -l requireSession` over the 29 route files = 20, the comm-diff = 9
  sessionless = 7 public auth verbs + health + uploads/[name]; the
  LEADS_FUNNEL/CHART_COLORS/Opportunity/pricing/lead-filters-key/siteUrl
  claims each read from their sources; the PAD §5.2 hexes vs globals.css
  L37/38/66/85/86/92).
- The three core experiments EXECUTED before this plan landed (§1) — the
  boot-gate crash verified against the real standalone boot; the artifact
  excludes verified against a real rebuild (the 151 MB clean artifact +
  the photo-e2e GREEN against it); the .env double-cure verified. The plan
  does not depend on an untested mechanism.
- The smoke script's every assertion target verified live this round: the
  health envelope (`{"ok":true,"data":{"status":"healthy","db":"up"}}`),
  the login rate limit (10/15 min, first-statement `rateLimit` — the 11th
  attempt 429s), the envelope 401/400 shapes, the demo credentials, the
  sitemap/robots/manifest route handlers, the e2e webServer boot form
  (PORT/DATABASE_URL/AUTH_SECRET env — the smoke script mirrors it on
  :3210/smoke.db).
- The round touches `src/lib/` (two new pure seams) + `src/app/` (two new
  boundary surfaces + instrumentation) + `next.config.ts` +
  `package.json` (build/gate/smoke scripts) + `scripts/` (one new) +
  tests + docs — the visual surfaces of the parity verdict are UNTOUCHED
  (the boundaries render only on failure paths; the sweeps + probe:ref
  verdict carries; the drawer battery re-verified 7/7 at the audit leg).
- The `gate` chain change (build → smoke → e2e) co-flips every
  carrier: AGENTS' gate-order paragraph + Commands table + CLAUDE's
  Build Commands row + README's gate line + the SKILL §11 gate block +
  the facts-census/doctrine-census pins.
- The `.env`/`.gitignore` posture: `.env` stays untracked (the artifact
  copy is REMOVED, never committed); `db/*.db` + `uploads/` +
  `test-results/` stay gitignored (now also excluded from the artifact).

---

## 4. The execution record (the TDD ledger)

Executed 2026-10-23, from the fresh-clone tree at `567e906` (the s169
ship `bba9a7d` + its session-log commit). The gate chain at the audit
leg: lint 0/0 · tsc 0 · **130/2559** unit · build (29 routes) · e2e
**161/161** · probe:ref STABLE · the desktop + phone sweeps CLEAN live ·
the mobile drawer 7/7 at 390×844 · census MATCH.

| WP | RED | GREEN | Notes |
|---|---|---|---|
| WP-1 the doctrine census | 26 failing + 4 born-green census anchors (every failure a finding) | the 131st suite, +30 | THREE live-caught calibration catches at birth: the pin-form/flip mismatches (the L-169c1 lesson applied to the round's own pins) · the commands-table `bun run <key>` documentation form · THE CENSUS-OVERCOUNT TRAP (the bare-name requireSession grep counted me/route.ts's "NOT gated" COMMENT — the CALL form is the truth: 19 gated / 10 ungated, the L-168c2 lesson recurring at birth). |
| WP-2 the chunk-recovery seam | the suite failing at the missing module | the 132nd suite, +12 | One live-caught test-value defect (the "1_000" underscore string — Number("1_000") is NaN, the corrupt-timestamp branch). |
| WP-3 the boot gate | the suite failing at the missing module | the 133rd suite, +20 | One live-caught assertion fix (toBeString → toBeTypeOf — the vitest vocabulary). |
| WP-4 the boundary family | the suite failing at the missing files | the 134th suite, +17 | The hygiene pin re-anchored to the script's loop idiom. |
| WP-5 the smoke leg | (rides WP-4's pins) | SMOKE 14/14 live | TWO live-caught defects at the live run: check 09's contact status vocabulary ("new" is a LEAD status — contacts ride active/inactive) · check 10's /api/auth/me expectation (the by-design data:null face, session-41 — not a 401). |
| WP-6 the doc flips | (rides WP-1's pins) | the ~21 sites flipped | The LICENSE file added; ADR-015 written; the CLAUDE Error Handling section; the AGENTS Commands table +8 rows. |
| WP-7 the count ladder | (the ladder) | 134/2644 lockstep GREEN | ONE head-surgery tooling defect (the first-pass script landed the live line in the wrong position — the corrective script re-seated it; both idempotent, the re-runs verified as 0-flip no-ops) + the collateral re-anchors (the gate-script chain pins · the docs-counts constants · the space-y census 21/117 → 23/123 · the inventory-census next.config.ts row 47 → 93 · the Appendix B totals + the ~21 s wall-clock). |

The mutation-proof: the planted badge regression (2799 → 2720) →
exactly 1 RED → reverted → GREEN. The captures 417-420 (the boundary
pair at phone + desktop against the PRODUCTION build via temporary
uncommitted throw patches — reverted immediately after; the VLM battery
4/4, the global pair's digest ref verified on the rendered surface) +
`session_361.md` + `session_362.md` + the worklog entry (Task ID 170) +
the AGENTS Session-170 section + the PAD session-170 inventory row +
ADR-015 closed the round. The verification chain at ship: lint 0/0 ·
tsc 0 · **134/2644** · build (29 routes, the ~151 MB hygienic artifact) ·
**SMOKE 14/14** · e2e **161/161** · db census MATCH.

The live-caught lessons at the capture leg: the renamed `next-server`
process survives `pkill -f server.js` (kill by the comm — the L-128b1
lesson, live again); a root-layout throw ABORTS the build at the static
prerender (the NEXT_PHASE guard is both the capture form AND the reason
the boot gate skips the build workers).
