# Session 131 — the toast family walk + the two-fix session

The 131-c rotation — the session_278/279 close's named direction: **the toast close X is
the F-128c1 genus's named residual arm — a walk that live-censuses the reference's toast X
settles it**. The 131-a pre-walk inventory mapped the family (toast.tsx FROZEN since the
s7 scaffold — 123 sessions; the close X's `hover:text-foreground` at :123 the named TOP
risk L-131a1; the inert animation family at :107 a REAL finding L-131a5).

## The walk design (walk22, the phased idiom)

The L-127c5 doctrine: one app×viewport per invocation, the censuses persisted to /tmp JSON,
the reference's storageState persisted + reused (ONE reference login total), PORT 3141, the
walk db db/walk.db (SEEDED — the toast family is domain-data agnostic). Both apps at
1440×900 + 390×844. The trigger (the 131-a recommendation, the s114-verified two-app
battery): the profile photo upload round-trip — /profile → the hidden input[type=file] →
a 1×1 PNG → `toast.success("Photo uploaded successfully")`; NO Save click ⇒ no
user-record mutation.

PASS 1 (two-app): **the viewport census** (tv.* — the computed position family + rect +
maxWidth + padding + flexDirection + zIndex + the edge anchors) · **the card census**
(tc.* — the chrome family: bg / border / borderWidth / radius / shadow / padding / display /
gap + THE ANIMATION AXES: animationName / transitionProperty — the L-131a5 discovery) ·
**the content census** (ti.* the icon + tt.* the title + td.* the description) · **THE
CLOSE-X CENSUS** (tx.* — the discovery + the resting family + THE HOVER CENSUS: hover
color + hover bg — the F-128c1 genus axis) · **the timing census** (tm.* — the measured
auto-dismiss after the unpause).

PASS 2 (ours-only @1440): **the error variant** (a text/plain upload → the server's
`!startsWith("image/")` gate → `toast.error("Failed to upload photo")` — the rose border
+ the danger icon + the X-dismiss round-trip) · **the hover-pause proof** (hover holds
6.5s → the card survives → the unpause dismissal) · **the max-4 cap + the stacking gap**
(5 rapid uploads → 4 cards + the gap-2 measure) · **the info variant + the description**
(the login page's Google button → "Google sign-in not configured" + its description —
the only description-bearing toast).

## The walk as executed: THE HEADLINE — F-131c1 THE REFERENCE'S TOAST SYSTEM IS DOM-DEAD

The reference-side census recorded **`tc.count = 0` on every phase, every trigger path**.
The systematic hunt (all live, authed, the JWT-verified storageState):

1. **The upload path**: the reference's `rt.integrations.Core.UploadFile` now returns
   **402 (Payment Required)** — the platform's metered integration quota is exhausted.
   The decoded handler (`catch { Ix.error("Failed to upload photo") }`) should toast —
   and the toast still never renders.
2. **The save path**: the Save Changes round-trip PATCHes successfully (the reload fires
   at ~1s — the success path confirmed) — the `Ix.success("Profile updated successfully")`
   call runs, and still ZERO toast elements render.
3. **The DOM hunt (decisive)**: a document-wide `querySelectorAll("*")` filter for
   sonner/toast/live/status/notification markers — **ZERO hits**; a MutationObserver on
   body (subtree) across the save window — **ZERO added nodes**; the document tree is
   exactly HEAD + BODY with the app root.
4. **The bundle decode**: the reference's bundle (md5 `a70a637f…` — STABLE, the 103rd
   probe) carries **exactly FOUR toast calls, all on the profile page**:
   `Ix.success("Photo uploaded successfully")` · `Ix.error("Failed to upload photo")` ·
   `Ix.success("Profile updated successfully")` · `Ix.error("Failed to update profile")`.
   No other toast sites exist in their code. The `Ix.*` toast function fires — but no
   `<Toaster>` surface renders its output. The toast system is dead in their live DOM.

**Adjudication**: the historical "sonner toasts" records (s30/s35) were bundle-decode
conclusions; no prior walk ever sighted the reference's toast DOM (the s121 photo walk
grepped zero toast censuses). Today's live truth: **the reference has NO toast surface**.
Our toast system is therefore a **superset construction** (the mobile-nav doctrine: the
reference's own defect/absence fixed by our deliberate construction) — there is no
reference face to parity against, and the F-128c1 genus axis (the close-X hover ink)
**cannot be settled two-app**. The genus stands three-for-three on real surfaces
(s128 menu-item · s129 outline · s130 ghost).

**The ours-side census (the family contract, recorded for the record)**: the viewport
`fixed top-0 z-[100] … sm:bottom-0 sm:right-0 md:max-w-[420px] p-4 gap-2` — live-censused
bottom-right @1440 (the card anchored 16px from both edges, 388×52) and top-full-width
@390 · the card `rounded-xl border p-3.5 shadow-lg` (radius 12px, padding 14px, the
shadow-lg pair rgb(0,0,0,0.1) 10px/15px + 4px/6px) with the success border
rgb(167,243,208) (emerald-200) · the icon 18×18 rgb(16,185,129) · the title 14px/500
rgb(10,10,10) · **the X 22×22 resting rgb(156,163,175) → HOVER rgb(10,10,10) +
rgb(245,245,245)** (the genus arm live-read on ours) · the timing 4126/4118ms (the 4000ms
contract + process noise) · the hover-pause holds at 6.5s + dismisses 4118ms after the
unpause · the max-4 cap holds (4 cards after 5 pushes, the stack gap 8px) · the error
variant border rgb(254,205,211) (rose-200) + the icon rgb(239,68,68) + the X-dismiss
round-trip works · the info variant border rgb(229,229,229) (line) + the description
12px rgb(107,114,128) mt 2px.

## The remediation (the two-fix session)

1. **D-131a0 THE TOAST-X HOVER-TEXT FIX** — `toast.tsx:123`:
   `hover:text-foreground` → `hover:text-neutral-900`. The genus's fourth arm, shipped on
   OUR superset construction: the reference surface is DOM-dead (F-131c1), so the fix is
   justified by (a) the s128/s129/s130 trio precedent — the reference's stock
   interactive-hover ink is #171717, expressed in our literal family as neutral-900 since
   the s80 badge; (b) internal consistency — every OTHER interactive hover arm in the
   codebase now ships the neutral-900 literal; the toast X is the last live
   `hover:text-foreground` ride. The tabs.tsx:162 underline arm is dead code (no surface
   mounts it) and the mobile-nav.tsx:205 arm is the deliberate fix-over-defect drawer —
   both stay record-only.
2. **D-131a1 THE DEAD-ANIMATION RETIREMENT** — `toast.tsx:107`: retire the inert
   `data-[state=open]:animate-in data-[state=closed]:animate-out …` string. The
   ToastCard never sets `data-state`, so the arms never apply — the toast pops with ZERO
   animation since the scaffold (live-censused: `tc.animName=none`), the shadcn template
   leftover. With no reference surface to contract an animation against (F-131c1), the
   D-124a7 dead-code doctrine applies: retire. (A future direction-correct enter/exit
   animation on our superset is recorded below as the residual.)
3. **D-131a2 THE PINS (RED-first)** — a new `tests/toast-anatomy.test.ts` (the
   mutation-feedback source-reading pattern): the two RED pins (the X hover-text
   positive + the `hover:text-foreground` negative; the card-animation retirement
   negative) + the GREEN freeze pins for the walk-censused family contract (the viewport
   geometry family, the card chrome + the three variant borders, the 4000ms duration,
   the slice(-4) cap, the aria family, the title/description classes, the icon family).
   The stash-proof: each fix reverted alone → its pin REDs alone.
4. **D-131a3 THE POST-FIX WALK RE-RUN** — the ours phases re-censused: the X hover
   expected rgb(23,23,23) (the neutral-900 literal), the animation axes still none, every
   other axis unchanged.
5. **D-131a4 THE CAPTURES 252-255** — the toast family: the success toast @1440 · the
   toast phone face @390 · the error variant (the rose border) · the max-4 stack. The
   VLM battery 4/4.
6. **D-131a5 THE DOCS REALIGNMENT** — SKILL v1.128.0 + the README badge + AGENTS/CLAUDE/
   PAD + session_280.md + this plan's execution record + the repo worklog + the
   docs-counts lockstep (the new file: SUITES 110→111).

## The walk-harness lessons (record-only)

- **L-131c1 the storageState token race**: the reference's auth lands as a JWT in
  localStorage ~1s after submit (slower cold); a FIXED 2500ms wait captured a GUEST
  storageState — POLL for the token (15s) and verify before trusting the state.
- **L-131c2 the needsLogin SPA-boot race**: a DOM probe 1200ms after goto(/settings)
  reads a half-booted page (the platform's redirect dance takes longer) — probe races
  persist guest states; use a DETERMINISTIC gate instead (no state file ⇒ login; state
  file ⇒ the /profile upload-input canary, re-login on fail).
- **L-131c3 the border-signal currentColor trap**: an ancestor-climb card detector keyed
  on `borderTopColor !== transparent` stops one level early — border-color defaults to
  currentColor (non-transparent on every text-bearing element); the signal MUST be
  borderWidth > 0 (or an explicit role/data attr).
- **L-131c4 the toast-window census discipline**: a toast lives ~4s — a delayed probe
  (12s) misses it entirely; hunt from t=0 with an eager poll or a MutationObserver.

## The residuals (record-only)

- **The reference's 402 upload quota** — the metered integration is exhausted; the
  photo-upload round-trip on the reference now fails (their catch path). No effect on
  our mirror (our upload is self-hosted); recorded as the reference's own platform state.
- **The F-128c1 genus's close**: three-for-three on real surfaces; every remaining
  `hover:text-foreground`/`focus:text-foreground` ride is either dead code (tabs
  underline) or our own constructions (mobile-nav X — the deliberate drawer). With
  D-131a0 the toast X joins the literal family; the genus sweep is CLOSED.
- **A direction-correct toast enter/exit animation** (our superset): the retired arms
  assumed bottom-mount (slide-in-from-bottom-4) — a phone-top toast would slide the
  wrong way; a future feature pass could wire viewport-aware animations. No reference
  contract exists (F-131c1); not parity work.

## The execution record (appended post-execution)

The TDD ladder ran exactly as planned: RED (the 2 fix pins failed alone at the
standing source — 2 failed | 7 passed (9); the 2009 neighbors green) → the two
fixes (toast.tsx: the hover-text literal + the animation-string retirement,
each with its source comment record) → GREEN (9/9) → **the stash-proof** (the
file reverted alone → BOTH fix pins RED alone — the two fixes share the one
file, the file-level proof; restored clean) → **111/2018** (+9 its, the ONE new
suite file; the docs-counts lockstep realigned: SUITES 110→111 + UNIT
2009→2018 + the ladder comment + the toast-anatomy newest-suite pin + the
README badge/tree/commands/Tested sites + the AGENTS commands/gate sites + the
PAD tree/Total/HEAD/checklist/commands sites + the PAD suite-table
Session-131 row + the CLAUDE four sites + the SKILL v1.128.0 frontmatter +
the project_state session-131 layer head with the beneath-it s130 layer + the
F-106a1 layer-axis pin advanced to the s131/s130 pair + the F-107a1 Appendix B
totals + the wall-clock phrase + the dialog-geometry CLAUDE carry-forward with
the retired 2009 forms joining the negatives).

The POST-FIX walk re-run (the ours phases re-censused on the fresh build, the
server + phases in ONE invocation — the L-127c5 single-invocation discipline,
re-learned once when a backgrounded server was reaped between calls): **the X
hover byte-exact rgb(23,23,23) at BOTH viewports** (the D-131a0 fix
live-verified); the hover bg rgb(245,245,245) unchanged; the animation axes
unchanged (none — the retirement zero-computational-delta confirmed); every
other axis byte-identical (the border, the timing 4120/4115ms, the rects
1036,832,388×52 / 16,16,358×52).

The captures 252-255 (four unique md5s 0fc39d2a/dd4d5ee2/9fc63c9c/3bf25761,
the standing POST-FIX build on PORT 3141 + the walk db): 252 the success toast
@1440 · 253 the HOVERED close X (the fix visibly confirmed) · 254 the error
variant (the rose border) · 255 the toast phone face @390 (the top-full-width
contract). **The VLM battery 4/4 CLEAN** (254 reading the red error icon +
the pink border verbatim; 255 reading the TOP position — the phone viewport
contract confirmed visually).

One captures-harness detour folded into the record: the first run died on the
390 phase (a closed-page variable shadowing bug — `page.waitForTimeout` after
`ctx.close()`; fixed to `page2` and re-run clean).

The final gate: lint 0/0 · tsc 0 · **111/2018** · build · **137/137** · the
closing drift sweep CLEAN on all four gates · census MATCH. src/ 1 file +
tests/ 2 files new/changed (toast.tsx; the NEW toast-anatomy.test.ts +
docs-counts.test.ts + dialog-geometry-parity.test.ts lockstep carriers).
