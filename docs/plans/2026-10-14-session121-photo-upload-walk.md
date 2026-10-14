# Session-121 Parity Remediation Plan (2026-10-14)

The rotation target: the **s30-era photo-upload surfaces** (the session_258
close's named next candidate — the AAe contact-dialog photo section, the
aCe profile-photo flow, the upload API seam, and the negative contracts;
last live-walked at the s51 decode ~70 sessions ago).

## Baseline gate (stepwise)

- lint 0/0 · tsc 0 ✓ (fresh clone at `2c3ceca`; bun install 533 pkgs;
  `db:push` + `db:seed` + census MATCH 15/24/10/23/12 + 4 users;
  Playwright chromium 153 reinstalled after the workspace reset)
- 109/1957 unit ✓ · build ✓ · e2e 137/137 (3.4m, zero flakes) — **the
  baseline gate GREEN**

## The audits

- **121-a (the s120→2c3ceca ship-delta + the photo-family pre-walk
  inventory)**: 9/9 shipped claims Verified, zero real findings — the
  delta is EXACTLY `docs/session_259.md` (+158, the operator's
  conversation log; docs-only, zero src/tests); the counts
  109/1957/137/badge 2094 coherent; the captures 208-211 md5s exact; the
  D-120a0/D-120a1 pins standing. The pre-walk inventory: the photo family
  ALREADY deeply pinned (contact-photo 23 its + profile-photo 13 + the
  upload-api 14 + the e2e batteries S15-P11/S30-P2/S30-P3/S35-P2/
  S73-P7c/D-114a3) with the UNPINNED residue: (1) the mobile-card photo
  branch (unit+e2e gap — the headline), (2) the table-row img conditional
  (e2e-only), (3) the live computed-style faces, (4) the 5MB hint
  literal, (5) the in-flight faces (the profile "Uploading..." ternary),
  (6) the uploads.ts repoRoot anchor chain; the seed ships ZERO photoUrl
  (the populated walk must create photos live); the 20-uploads/15min
  rate limit bounds the walk budget.
- **121-b (the standing layers, ~79th consecutive)**: 9/9 PASS — SEO
  live 6/6 · drawer battery exit 0 · design-tokens 16/16 · vocabulary
  6/6 · config zero drift · census MATCH · the Tailwind v4 layer
  (137/133/0-var/×4) · the defect ledger · metadata 37/37. Record-only:
  N-121b1 `scripts/drawer-battery-390.ts:16` hardcodes
  `REPO = "/home/z/my-project/neo-crm"` — STALE after the workspace
  relocation (the battery ran via its designed reuse path); N-121b2 the
  census path re-anchor; N-121b3 the `^-` vs `^--` counting nuance.

## The live verification (pre-plan, orchestrator-run)

probe:ref the **93rd** consecutive STABLE (bundle md5 exact; demo data
ZERO; the TRUE-390 mobile-nav defect STANDS) · the four drift gates CLEAN
(1440/390/768/1024) · scandihaven `d4789c3` on-pattern.

## The rotation (121-c) — THE PHOTO-UPLOAD FAMILY WALK

Both apps driven at 1440×900 + 390×844 through the two photo surfaces
(the New Contact dialog photo section + the /profile avatar section) with
computed-style + census extraction, login first on both, the walk scripts
OUTSIDE the repo (PORT 3141, the s115-s120 precedent; the zero-data tool
on the scratch walk db).

### PASS 1 (zero-data, two-app) — ZERO PARITY DEFECTS (after the
adjudicated noise genera)

Byte-equal on every compared axis at BOTH widths: the dialog width · the
circle (class string byte-equal, 96×96 box, overflow hidden, the
shadow-lg REAL layers byte-equal after normalization) · the initials
span (30px/700/white + the live "WT" mechanics under a typed name) · the
User glyph (40×40) · the camera button (32×32, bg-white, 2px
border-blue-500, absolute bottom-0 right-0, the 16×16 #2563eb Camera
icon) · the hidden input (the MIME trio accept, display:none) · the
wrapper carries EXACTLY one button at zero-photo · the Name field
(placeholder "John Doe", centered, 500) · the profile avatar (96×96 @1440
/ 80×80 @390, the blue-100 fallback rgb(219,234,254), the stroke-2 User
glyph) · the "Profile Picture" label · the Upload Photo button (the
mr-2 svg, not disabled) · the hint ("JPG, PNG or GIF. Max 5MB.", 12px,
#6b7280 — our `text-muted` token == the reference's `text-gray-500`) ·
the accept="image/*" · the Full Name field · the topbar pair (32×32 +
the gray-200 inner, the "S" initial) · the in-viewport rounded-full
census (the sidebar brand mark + the topbar pair + the form avatar + the
Account card avatar + the w-12 icon-badge trio, geometry+bg byte-equal) ·
docScrollW contained.

**The adjudicated noise genera (record-only, zero defect impact):**
- **L-121c1 (the prior session's finding CONFIRMED)**: the v4
  `rounded-full` computes `3.35544e+07px` (calc(infinity), Chrome's
  used-value clamp) on ours vs `9999px` on the reference — IDENTICAL
  96×96 boxes, the same effective circle@48px/circle@16px verdicts, the
  radius axes excluded from the DIFF as the v4 serialization genus (the
  L-119c oklab lineage's sibling).
- The v4 gradient serialization: `to right bottom in oklab` + the
  explicit 0%/100% stops vs the v3 bare form — byte-equal after
  normalization (the L-119c genus).
- The v4 alpha-utility serialization: `text-white/80` →
  `oklab(0.999994 0.0000455677 0.0000200868 / 0.8)` vs the v3
  `rgba(255, 255, 255, 0.8)` — visually identical white-at-0.8.
- The v4 box-shadow composition: the leading
  `rgba(0, 0, 0, 0) 0px 0px 0px 0px` CSS-var layers (ours 4, the
  reference 2) — the REAL layers byte-equal (the v3 shadow-md/shadow-lg
  values exact).
- The w-12 icon-badge trio mechanism: ours `span` + inline-style bg vs
  the reference's `div` + literal bg-*-100 classes — computed-equal on
  every axis (48×48, the same three bg colors, rounded-full); the pixel
  sweeps CLEAN at both widths (the s90 mechanism-divergence lineage).
- The aria-label superset: ours carries "Upload photo"/"Remove photo"/
  "Account menu" aria-labels the reference lacks (the S112-P2 a11y
  superset — the cross-app locators ride structure, not labels).
- The reference's LIVE upload did not render within 30s (the CDN latency
  genus — record-only; the s51 LIVE-verified contract stands in §16v).
- The reference's topbar user name = "sepnetflix2023" + the "S" initial
  — byte-equal with our seed.

### PASS 2 (populated, ours-only — the reference's zero-data genus): 62/65
checks, every value seed-verified off the walk db + every mutation
verified back onto it

Healthy on every contract: the upload round-trip (the img renders, the
alt rides the name, the 32-hex.png stored, the remove X geometry
28×28/#ef4448/-4px/-4px, the file persists on remove — the CDN
semantics) · the in-flight faces LIVE (the route-delayed upload: the
"Uploading photo..." hint at 12px/rgb(107,114,128) + the camera disabled;
the profile button's "Uploading..." TEXT-ONLY label + disabled) · the
non-image alert EXACT + the state unchanged + no upload · the create
round-trip (the photo rides the payload, the row img + the db photoUrl ==
the file_url, the reload persistence, 15→16) · the table faces (EXACTLY
one row img; the 15 seeded rows are initials) · the W7 edit dialog
no-photo negative · the Pke slide-over initial-only hero ("P") · the
profile round-trip (the toasts not alerts, the form-avatar img, the
Account card stale pre-save → picked up pre-reload, the 500ms reload →
the topbar img, the db photoUrl == the file_url, the name unchanged) ·
the GET route (200 + image/png + `public, max-age=31536000, immutable` +
the exact PNG bytes + the traversal/non-hex 404s) · the mobile card
branch at 390 (16 cards, the Photo Walk card img, the seeded initial
"K", docScrollW 390).

### F-121c1 — THE REAL DEFECT (the walk's finding; the 3 RED checks)

**The standalone server writes uploads to `<repo>/.next/standalone/uploads`
— NOT the documented `<repo>/uploads`** (A9/A10 RED; the evidence lines
record `repo=0, standalone=N` at every step; A13/A14/A17/D7/final track
the totals across both).

The root cause (instrumented live on the built chunk): the standalone
bundle rewrites `import.meta.url` into the VIRTUAL path
`<repo>/.next/standalone/src/lib/uploads.ts`; uploads.ts's
module-URL-first anchor computes `dirname/../.. = .next/standalone` and
VALIDATES it as a repo root (the output-file trace put
`prisma/schema.prisma` INSIDE `.next/standalone`) — so the anchor
returns the build-output folder and the uploads land inside the
EPHEMERAL `.next` tree. `src/lib/db-path.ts` already guards exactly this
trap (session-34: the standalone-cwd anchor FIRST — "the standalone
bundle rewrites import.meta.url into a virtual path that must be
ignored"); uploads.ts consults the module anchor FIRST. The impact:
production uploads are wiped by every `bun run build` (every stored
photo_url 404s after a rebuild) and dev vs standalone DIVERGE — the
exact opposite of the documented contract ("the repo-root resolution
mirrors db-path's validated-anchor pattern so dev, build and the
standalone server all land on the same folder").

## The remediation

### D-121a0 — THE UPLOADS STANDALONE-ANCHOR FIX (F-121c1)

[src/lib/uploads.ts] Reorder `repoRoot()`'s anchors to mirror db-path's
session-34 order: the standalone-cwd anchor FIRST (`cwd.includes(".next")`
→ `resolve(cwd, "..", "..")` → validatedRoot → the REAL repo root — the
chdir'd cwd of the standalone server), the module-URL anchor SECOND
(dev/seed/vitest keep it: `src/lib` → repo). Extract the pure seam
`repoRootFor(moduleUrl, cwd)` (the db-path `resolveDatabaseUrl` pattern)
so the trap is unit-pinnable.

[tests/uploads-path.test.ts — NEW] The fixture-based pins (the
db-path.test.ts `buildStandaloneRepo` idiom):
1. THE TRAP: a tmp fixture repo with the traced
   `.next/standalone/prisma/schema.prisma` + the virtual module URL
   `<repo>/.next/standalone/src/lib/uploads.ts` + cwd =
   `<repo>/.next/standalone` → `repoRootFor` returns THE REPO (not
   `.next/standalone`) — RED on the current order, GREEN after.
2. The dev case: module URL `<repo>/src/lib/uploads.ts` + cwd = repo →
   repo.
3. The fallthrough: no valid anchors → cwd.
4. `uploadsDir()` from the repo cwd → `<repo>/uploads` (the standing
   sanity).

TDD: the seam + the current order first (RED on the trap pin) → the
reorder → GREEN → the stash-proof (the order reverted alone → the trap
pin REDs alone). The live verification: the PASS 2 walk re-run → 65/65
(the uploads land at `<repo>/uploads`, the standalone location EMPTY).

### D-121a1 — THE DRAWER-BATTERY REPO PATH (N-121b1)

[scripts/drawer-battery-390.ts] `const REPO = "/home/z/my-project/neo-crm"`
→ derived from the script's own location
(`resolve(dirname(fileURLToPath(import.meta.url)), "..")`) — the
workspace-relocation-proof form. Verified by running the battery live
(exit 0, "[battery] done").

### D-121a2 — THE MOBILE-CARD + TABLE-ROW PHOTO PINS (the 121-a gaps 1+2)

[tests/account-contacts-parity.test.ts +1 it] Both photo conditionals in
contacts-page.tsx: the TABLE-ROW avatar cell (`w-11 h-11` gradient
circle + `c.photoUrl ? <img object-cover> : <span initial>` — the
e2e-only face, unit-pinned now) and the MOBILE-CARD avatar
(`w-12 h-12` gradient circle + the same conditional — pinned NOWHERE
before, the headline gap).

### D-121a3 — THE 5MB HINT + PROFILE IN-FLIGHT PINS (the 121-a gaps 4+5)

[tests/profile-photo.test.ts +2 its] (a) the hint literal
`JPG, PNG or GIF. Max 5MB.` (the mt-2 text-xs text-muted p — pinned
nowhere; the profile hint that advertises the server-enforced 5MB
ceiling); (b) the "Uploading..." TEXT-ONLY label ternary (the N-72c7
decode — the Camera icon drops while uploading) + the disabled gate.

### D-121a4 — THE WALK RECORD + THE DOCS REALIGNMENT

session_260.md + this plan's execution record + the worklog + SKILL
v1.118.0 + the README badge + AGENTS/CLAUDE/PAD counts + the captures
212-215 + the VLM battery.

## The TDD protocol

RED-first per fix (the stash-proof for D-121a0: the anchor order
reverted alone → the trap pin REDs alone) · GREEN on the existing
contract (the full suite) · the e2e phase unchanged (the census stays
137 — the fixes are src-resolution + unit pins only, no e2e additions
this session) · the closing drift sweep on all four gates · census
MATCH.

## The count ladder

UNIT 1957 → 1957 + (D-121a0 the uploads-path pins) + (D-121a2 +1) +
(D-121a3 +2) — the exact number fixed by the shipped files; SUITES 109 →
110 (+1 NEW file); E2E 137 UNCHANGED; badge 2094 → 2094 + the delta.

## The execution record (as shipped)

(to be appended)

## The execution record (as shipped)

- **D-121a0** shipped exactly as planned: the pure `repoRootFor(moduleUrl, cwd)` seam + the cwd-first anchor order (the db-path session-34 mirror), pinned by the NEW tests/uploads-path.test.ts (4 its — the trap fixture, the dev case, the fallthrough, the live uploadsDir sanity). TDD: the seam-first RED (the trap pin on the module-first order) → the reorder GREEN → the stash-proof (the order reverted alone → the trap pin REDs ALONE, 1|3) → the live proof (the rebuild + the PASS 2 re-run 65/65 — the uploads at `<repo>/uploads`, the standalone location EMPTY). The plan's synthetic sub-assertion (a cwd at `<repo>/.next` falling through to the module anchor) was dropped as a non-runtime edge — the real runtimes are exactly two (dev/vitest/seed at `<repo>`, the standalone at `<repo>/.next/standalone`), both pinned.
- **D-121a1** shipped: the REPO derived from the script's own location (the validated package.json anchor, the cwd fallback). Verified live: `env -u DATABASE_URL bun scripts/drawer-battery-390.ts` → EXIT=0, "[battery] done" — via the battery's OWN spawn path (the dev server booted by the fixed script).
- **D-121a2** shipped: the both-avatar-carriers pin (+1 it, account-contacts-parity 22/22) — the table-row `w-11 h-11` conditional AND the mobile-card `w-12 h-12` conditional, the exactly-two `c.photoUrl ?` census.
- **D-121a3** shipped: the 5MB hint literal + the "Uploading..." text-only ternary pins (+2 its, profile-photo 15/15).
- **D-121a4** shipped: session_260.md + this record + the worklog + SKILL v1.118.0 (the §16di layer + the §16v F-121c1 note + the project_state s121 layer + the Appendix B 110/1964) + the README badge 2101 + the Tested row's s121 clause + the AGENTS §Session-121 + the CLAUDE 4 sites + the PAD 5 sites + the s121 inventory row + the captures 212-215 + the VLM battery 4/4 × 4 CLEAN.
- **The count ladder as shipped**: UNIT 1957→1964 (+7: 4 in the NEW file + 1 + 2 in EXISTING files) · SUITES 109→110 (uploads-path.test.ts) · E2E 137 UNCHANGED · badge 2094→2101. The docs-counts wall-clock lockstep templated onto the SUITES constant (the per-session treadmill retired). The README suite list gained "uploads-path".
- **The gate**: lint 0/0 · tsc 0 · 110/1964 · build · 137/137 · the closing drift sweep CLEAN on all four gates · census MATCH · src/ 2 files changed (uploads.ts + drawer-battery-390.ts).
