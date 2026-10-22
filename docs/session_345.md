# Session 345 — the session-162 record (the sweep login consolidation)

## The intake

The workspace had been reset — a fresh clone (the pull path became
`git clone https://github.com/nordeim/neo-crm.git`), the standing
environment rebuilt from the repo's own contracts: `.env` from
`.env.example` (the `file:../db/custom.db` root contract + a fresh
`AUTH_SECRET`) · `db:push` + `db:seed` (census MATCH 15/24/10/23/12 +
4 users) · the Playwright chromium installed · the dev server booted.
The pull state: `04e367c` — the s161 feat `b0a0fc3` + the session-log
commits (`2eb1f60`, `04e367c`).

## The audits

- **162-a**: the baseline gate GREEN — lint 0/0 · tsc 0 · **120/2262**
  (clean exit) · build · **e2e 153/153** (clean first run — the drawer
  battery inside, the mobile-nav contract).
- **162-b**: probe:ref **#136 STABLE** at the s147–s155 fingerprint —
  a rotation round · **the SIX drift gates CLEAN ×6** (the four
  viewport sweeps + the fullpage at the exact standing values
  0.093%/0.316% at equal heights 4990/7259 + the census gate at
  `--parallel 4`: 52 page-axis runs, all zero unexplained, exit 0 —
  the census leg at the 160-c consolidated form, EXACTLY ONE
  our-login per invocation, the dev-log POST-200 delta 4→5 verified
  live; a diagnostic full-output re-run +1) · sitemap 11 routes +
  robots 200 · db census MATCH · the tree clean · zero dep changes.
  TWO supplemental live checks: the mobile drawer verified in-browser
  at 390×844 (**10/10 PASS** — trigger unique · the rail hidden ·
  `data-state=open` · 8/8 links · the MAIN-scroller lock ·
  close-on-navigate + the URL change · Escape + the lock release),
  and the Tailwind v4 state clean (the postcss `@tailwindcss/postcss`
  plugin · the `@theme` `--shadow-sm`/`--blur-sm` re-pins ·
  design-tokens 16/16).

## The rotation

The skills catalog reviewed (tdd · agent-browser · clone-app-pat-pro ·
tailwind-patterns — all embodied in the standing discipline); probe
STABLE kills the bundle-event option; the worklog Task ID 161's
last-listed candidate is the strongest: **the sweeps' four
separate-process logins — the walking family's last per-invocation
seam**. The gate:full chain burns 4 our-logins on its sweep legs (the
162-b audit's own four the live evidence), the census + rhythm legs 2
more, and any diagnostic re-run rides the remainder of the
10-per-IP/15-min window.

## The round (the 162-c rotation)

**The cross-process storageState file** (`scripts/sweep-state.ts` +
`scripts/.sweep-auth-state.json`): the login-consolidation doctrine's
third application. A per-invocation pre-flight cannot cure a
per-PROCESS seam — the cure crosses the boundary: the first sweep
invocation pays the login pair and writes the combined state file
(two origins one jar — the s160 combined form), the next three reuse
it while fresh. The guard trio: the 15-min TTL (the login-window
semantics) + the authenticated probe (validation-by-use — both apps'
`/dashboard` must not redirect to `/login`; any miss self-heals
through the fresh login pair + the rewrite) + the mid-run backstop
(the drift gate fails LOUDLY on a login-wall screenshot, never
silently). The security posture: git-ignored (pinned by test) · 0600
· atomic tmp+rename · TTL-bounded. **The chain's our-login count
drops 4 → 1; the app's own limiter byte-identical.**

**The live decode (the round's own find)**: the first proof run
self-healed on every invocation — the consolidation saved nothing.
Root cause, decoded from the dev.log's `GET /dashboard 200` +
`GET /login?from_url=…` pair: `prisma/seed.ts`'s users block was
`db.user.deleteMany()` + recreate — **every `db:seed` rotated ALL
user cuids**, and each sweep's end-of-run seed restore orphaned the
state file's cookie uid. **The cure: the users block rebuilt as
UPSERT-BY-EMAIL** (the ids stable across re-seeds — the "idempotent
in place" claim now true in the strong sense; the domain tables keep
their wipe+recreate). The measurement lesson: never pipe a
long-running tool through `head` — the early-close orphans the
process (bun survives SIGPIPE), the shell returns early, the gate
verdict lost to the broken pipe.

## The live proofs

- **PASS 1 the budget**: the four-sweep chain (run serially after a
  dev-server restart, the outputs captured to files) burns **EXACTLY
  ONE our-login** — the dev-log POST-200 count 0→1, was 4; zero 429s.
- **PASS 2 the byte-parity**: all four drift gates CLEAN at the
  standing margins — the read side provably unchanged.
- **PASS 3 the self-heal**: the state file TAMPERED (a bogus
  cookie), one sweep re-run — the probe detects (`ours=false
  ref=true`), the fresh pair fires (POST +1), the file rewritten, the
  sweep CLEAN.
- **PASS 4 the cross-process reuse**: sweeps 2-4 each logged
  "reusing the fresh sweep auth state — ZERO logins this invocation";
  the state file mtime UNCHANGED across the chain.
- **The FIFTH process**: the captures driver itself reused the state
  file — POST delta 0.

## The pins and the ladder

`tests/sweep-tool.test.ts` (the session-162 describe) **+9**: the
state module (the file path · the 15-min TTL · the three functions) ·
the one-login-per-chain contract (the capture path login-free, the
pre-flight call, the context carries the state) · the self-heal
guard · the 429-diagnostic (STDERR + rethrow) · the security pin
(the `.gitignore` line) · the atomic-0600 write · the freshness pure
seam (fresh loaded · stale rejected · corrupt rejected · miss null —
node-testable) · the SEED's ID-STABILITY contract · the header
doctrine — **8 RED at birth → the implementation → GREEN** (the seed
pin born RED with the live decode; the freshness seam with it). The
count ladder **UNIT 2262→2271 (+9) · SUITES 120 held · badge
2415→2424** (count-ladder-162.py, assert-first, idempotent,
unique-anchor; the historicals preserved; the SKILL seed line-count
site 466 → 516 — the docs-counts LIVE-CENSUS catch) · the
CLAUDE-carrier negatives grew the 2262 forms (all four families) ·
the SKILL **v1.159.0** + the s162 head (the s161 layer demoted
beneath) + the Appendix B totals.

## The captures and the VLM battery

The captures **389-392** (the zero-data dashboard pair at phone +
desktop — the sweep family's own apples-to-apples subject surface;
mainH byte-equal both apps [phone 2851/2851 · desktop 1274/1274],
in-frame verified, the state file reused by the driver itself). The
**VLM battery 2/2 MATCH** — both pairs decode to **zero differences**
(the cleanest battery yet: the zero-data subject state removes the
live-data genus entirely, and the driver closes the Base44 pill).

## The verification

lint 0/0 · tsc 0 · **120/2271** · build · e2e **153/153** · **the SIX
drift gates CLEAN ×6** — the sweep legs at the 162-c form: ONE
our-login for the whole four-sweep chain. The two-commit ship via
the SSH wrapper protocol, remote-verified.

## Suggested next round

Watch the bundle event (probe #136 STABLE), the rhythm map's next
T-series observation (one command, diffed against the session_342 T4
values), or — the natural follow-on — extend the cross-process state
file to the census + rhythm tools (the walking family's remaining
per-invocation pre-flights; the state file is the shared seam now,
its cross-tool reuse the same L-161c1 family-enumeration lens —
decode the TTL/security interplay first).
