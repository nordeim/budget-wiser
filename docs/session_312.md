# Session 312 — the session-147 record (the mobile-nav parity event)

## The intake

The workspace re-cloned at `195fea9` (the s146 ship `f188691` + the
session_310 record `a4de619` + the session_311 transcript `195fea9` —
the s146 ship session's own log; the sandbox was reset, so the
environment re-stood: bun install · .env from .env.example with a fresh
AUTH_SECRET · db:push + db:seed · census MATCH 15/24/10/23/12 + 4
users · the Playwright chromium re-installed). The four intake docs
read (session_310 + the s146 plan + the repo worklog + session_311).
The baseline gate GREEN — the exact s146-ship match: lint 0/0 · tsc 0 ·
**114/2115 unit** · build · **e2e 150/150**.

## The audits

- **147-a (the s146 ship verification)**: 11/11 spot-verified, zero
  findings — the three sweep baseline re-anchors (6.0/0.15/0.1) · the
  sweep-tool session-146 describe · the captures 313-314 · the
  docs-counts ladder (2115/2265) · SKILL v1.143.0 · `.env.example`
  tracked and matching (it bootstrapped this session's own .env).
- **147-b (the standing battery)**: 11/11 PASS — the secrets posture ·
  zero dep changes (package.json/bun.lock unchanged db6ed2a..HEAD) ·
  the postcss plugin + the 7-day TTL + the rate limits · the
  vitest/playwright configs (they ran the baseline) · the sitemap (11
  routes) + robots · the drawer battery GREEN against the pre-change
  drawer.
- **probe:ref #119**: **CHANGED — THE PARITY EVENT** (the first since
  s142, after 5 stable sessions): the bundle moved to
  `index-n8TZHw0K.js` · `46bc2d9c…` · 1,699,576 (+2,675) — AND the
  TRUE-390 verdict flipped DEFECT-STANDS → **NAV-FIXED**.

## The walk (walk37 — the parity-event decode, 11 census passes)

- **The reference's DESKTOP shell is byte-stable** (the sidebar root,
  the brand, the nav containers, the link classes, the topbar header —
  every string byte-matches our NAV_LAYOUT/TOPBAR_LAYOUT pins). The
  +2,675 bytes are the two posture changes + the page-interior family
  below, not a chrome re-layout.
- **F-147c1 THE MOBILE-NAV FIX (the standing defect #1 RETIRED)**: the
  reference now ships a stock ghost-button trigger (`aria-label="Open
  navigation"`, the lucide-menu glyph, `md:hidden text-gray-600`, the
  Radix DialogTrigger wiring) + a Radix Sheet (`w-72` 288px
  `bg-[#2563eb]`, the "CRM" h2 wordmark + an sr-only description, the
  stock DialogClose at `right-4 top-4`, the drawer's own link styles —
  `text-white/80` inactive + `bg-white/20` active, `text-sm
  font-medium` — the mt-4 `border-t` Settings group, the `bg-black/80`
  stock overlay, the 500ms-in/300ms-out slide). The behavior battery
  ≡ ours at every axis (focus→Close on open, focus→trigger on close,
  Escape, scrim, link-click navigate+close+unlock,
  `data-scroll-locked`, the trigger on all CRM pages below md, hidden
  at ≥768). Radix 1.1.23 renders NO aria-modal (the reference's null —
  the stock behavior, ours to match).
- **F-147c2 THE GUEST RE-GATING (the s144 posture REVERSED)**: guest
  /About + /Contact → 200 HTML then the client guard →
  `/login?from_url=<absolute-url>` → post-login → the target
  (walk-verified end-to-end). The landing `/` stays public; the plain
  /login post-submit still lands `/` (the s145 pin stands); the logged-
  in /About face is unchanged; the login card face is unchanged.
- **F-147c3 THE DESKTOP-INTERIOR FAMILY (decoded, baselined — the s148
  mirror target)**: the reference REMOVED its KPI delta chips
  (accounts' four, contacts' "+0", activities' "+23%" + "2h overdue"),
  its accounts toolbar trio (the Table view-switcher + the empty
  density select + More) + the in-search magnifier + the rail's Save
  All link + Filter button, re-morphed its landing mock (5 narrower
  bars, the +Reports sidebar item, the taller window, no CTA arrow),
  FIXED its invisible-CTA landing genus (the "Open dashboard" CTA now
  computes rgb(36,99,235) — visible), and re-populated its settings
  picklist data (Won/Lost/converted + LinkedIn — the s91-era
  "picklists wiped" genus at a new shape). The s93 phone floor genus
  (the reference's account button at the LEFT) COLLAPSED — its topbar
  is [hamburger LEFT] + [account RIGHT], our construction, now.

## The remediation (TDD)

- **D-147a0 THE SHEET RE-DERIVATION**: the MOBILE_NAV_SHEET +
  MOBILE_NAV_TRIGGER contracts in page-layout.ts (the byte-decoded
  strings; bg-sidebar is their `bg-[#2563eb]` literal; the close
  reuses DIALOG_CLOSE — their `bg-secondary` literal computes the same
  family) + mobile-nav.tsx REBUILT on the repo's own Radix primitives
  (Portal/Overlay/Content/Close/Title/Description) + the DrawerNav
  (NAV_ITEMS + NAV_FOOTER_ITEMS with the drawer styles). The kept
  supersets: the S8-P1 resize auto-close, the main-scroller lock, the
  route-change close. The old hand-rolled drawer + the s112
  permanently-mounted trap retired structurally (Radix unmounts).
- **D-147a1 THE isNavActive EXTRACTION** (nav-config.ts, the s24 rules
  — both navs + the new tests/nav-config.test.ts).
- **D-147a2 THE GUEST RE-GATING + from_url**: the GuestLoginRedirect
  shim (the reference's own mechanism: JS replace +
  `encodeURIComponent(window.location.href)`) on BOTH route groups —
  the session decision stays server-side (the guest never receives the
  page's HTML; the 307 retired because a server layout cannot know the
  current path — headers() carries none, probed live) + the login
  card's `resolveFromUrl` (the same-origin open-redirect guard — a
  foreign origin falls back to "/").
- **D-147a3 THE PROBE RE-ANCHOR**: STANDING.bundle → the new
  fingerprint; the mobile standing triple {0,0,1} with the verdict
  comparing AGAINST it (drift in EITHER direction trips); the tool
  pins re-anchored.
- **D-147a4 THE E2E + BATTERY RE-ANCHORS**: mobile-navigation.spec (the
  trigger label + the dialog name "CRM" + the unmount semantics + the
  open-sheet selectors + the exit-animation release polls) ·
  landing.spec (the guest family flipped to the wall + the from_url
  round-trip + the open-redirect guard) · auth.spec + crm.spec (the
  from_url globs) · the s145 guest-at-390 test re-derived · the
  drawer-battery + its tool pins.
- **D-147a5 THE SWEEP RE-DERIVATION**: all four classes re-measured
  (the table above); the baselines re-anchored (the F-147c3 family +
  the collapsed/retired genera) + the standingExplained lines + the
  pins; the mutation-proof ×3 (desktop.accounts 2.5→0.1 → 1 RED ·
  phone.landing 0.1→6.0 → 2 RED [two readers] · desktop.activities
  5.2→0.1 → 1 RED — each reverted → GREEN). The four drift gates CLEAN
  ×4 under the re-anchored tables.
- **D-147a6 THE CAPTURES 313-325 + THE VLM BATTERY 3/3 CLEAN** (316 the
  reference's open sheet; 323/324 ours [the open sheet + the phone
  face] — the visual parity: the "CRM" header, the close position, the
  active highlight, the blue, the divider, zero overflow on both; 325
  the guest wall).
- **D-147a7 THE DOCS REALIGNMENT**: the count ladder (UNIT 2115 → 2132
  · E2E 150 → 151 · badge 2265 → 2283 · SUITES 114 → 115) · the
  line-census sites (page-layout 1698/205 · the mobile-nav spec 284)
  · SKILL v1.144.0 + the session-147 layer + the §5.4/§5.5
  re-derivation (the defect-register row struck) · the AGENTS
  Session-147 section · the PAD session-147 row · the mobile-defect
  claim retirement across README/CLAUDE/PAD.

## The walk-harness lessons (L-147c1..c2)

- **L-147c1 the defect ledger is a snapshot too**: the standing
  "reference mobile defect" drove five sessions of framing (the
  README's headline, the drawer's fix-over-defect posture, the §5.5
  register row) — the reference's own fix arrived without notice, and
  every carrier of the claim needed the same re-derivation discipline
  as a pixel baseline.
- **L-147c2 the parity event lands as a CLUSTER**: one bundle change
  carried two independent posture flips (the nav fix + the guest
  re-gating) AND a page-interior family — decode the WHOLE delta (the
  sweep + the boundary walks + the cluster crops) before choosing the
  remediation scope, or the second change rides the first one's ticket
  unnoticed.

## The ship

The final gate: lint 0/0 · tsc 0 · **115/2132** · build · **e2e
151/151** · the drift sweep CLEAN ×4 under the re-anchored tables ·
probe:ref STABLE at the new fingerprint · census MATCH. The two-commit
pattern (the feat + the session log) pushed to
git@github.com:nordeim/neo-crm.git main via the SSH wrapper (the
paramiko shim; the dry-run then the real push; remote-verified; the
key shredded).

**Next**: the F-147c3 desktop-interior mirror — the reference removed
its KPI delta chips, its accounts toolbar trio + search icon + rail
buttons, and re-morphed its landing mock; the sweep baselines carry
the family as standing-explained (the s143-s146 settings-genus
precedent) until the mirror retires them. Otherwise: the standing
defects ledger's remaining entries re-verified live.
