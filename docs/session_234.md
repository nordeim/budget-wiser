# Session 234 — Session 112 summary

## What shipped

**The dialog-family LIVE re-walk** — the second un-walked surface
family re-walked live (after the s111 login family), and the
headline result is the strongest kind: **complete parity, verified**.
Both apps were driven through the full CREATE-dialog ladder (New
Lead · New Account · New Contact · Import Contacts · New Event ·
Log Call · Save Custom Report View) at 1440×900 + 390×844, with
computed-style extraction, the child census, and — for the first
time anywhere — the **mount-focus behavior** measured on every
dialog. Every geometry axis matched on all seven dialogs at both
widths, and the focus landing is identical on all seven. The s92
fixes, the s15 pins, and twenty sessions of changes since: all
live-confirmed.

## The four finds

1. **D-112a1 — the close-X byte-parity re-pin.** The reference's
   current stock close string carries `ring-offset-background` + two
   inert `data-[state=open]` arms, and does NOT carry
   `disabled:opacity-70`; our s15-era extraction predated the
   reference's shadcn bump. The two inert arms were gained, the
   inert arm retired — and `ring-offset-background` was deliberately
   NOT copied: the reference's focused-close ring offset computes
   `hsl(0 0% 100%)` = `#fff`, which is exactly what our v4 default
   computes; adding the class would set it to `#f9fafb` and
   introduce the divergence it would pin away (the s11
   computed-gap rule, applied).
2. **D-112a2 — the camera aria-label superset, pinned.** The
   reference's icon-only camera button is unnamed (its own a11y
   defect); ours says `aria-label="Upload photo"`. The superset was
   already correct — now it is frozen.
3. **D-112a3 — six mount-focus e2e freezes.** The focus landing on
   every walked dialog (the first input on lead/account/event/
   savereport, the camera on contact, the type trigger on activity,
   the Cancel on import) is now pinned — added expects inside
   existing test blocks, so the e2e census stays 137.
4. **D-112a4 — the role=dialog shadowing rule.** Our
   permanently-mounted mobile-nav drawer carries `role="dialog"`
   with no data-state; a CSS `[role=dialog]` selector matches the
   hidden drawer first and never resolves (the walk's own third
   iteration tripped on it live). The rule is documented at the
   source: key on `[data-state="open"]` or use `getByRole`.

## The evidence

- **RED-first:** 16 failed | 230 passed (246) at the unfixed state,
  all by name; stash-proven (native 244/244 → pop → 16 RED).
- **RED-2:** both induced-drift faces failed their pins by name
  (the bg-accent arm; the aria-label).
- **Gate:** lint 0/0 · tsc 0 · **1944/1944** unit (109 suites) ·
  build · **137/137** e2e (the six focus expects green on their
  first run) · the four drift sweeps CLEAN (no re-baselining — the
  re-pin is render-inert) · the census MATCH.
- **Captures 176–179** with the VLM battery 4/4 × 4 (one
  adjudication: the 179 focus ring confirmed at 3× zoom). The VLM
  independently read the focused Name input's dark ring off 176 and
  the camera button's blue focus ring off 178.

## The count ladder

UNIT 1942 → 1944 · SUITES 109 · E2E 137 · badge 2079 → 2081 ·
page-layout 1530 → 1548 lines + 182 → 183 checks · mobile-nav
206 → 215.

Shipped as `f16f2c3` on `main`, pushed and remote-verified through
the SSH wrapper.
