# Session 235 — Session 112 narration

The rotation choice first. The s111 close-out offered three
candidates: the probe `--expect` mode (tooling — but the probe
already gates through its internal STANDING constants, pinned by
its own unit suite), the §16 chronicle count-axis adjudication
(docs hygiene), or the dialog family as the next un-walked LIVE
family. The walk was the obvious pick for a parity-driven repo: the
s92 walk of the dialogs was 390-ONLY and twenty sessions of changes
ago, and nobody had ever measured what the dialogs DO on mount —
only what their class strings SAY. The s111 walk had just proven
that distinction finds real drift (D1 was behavioral, invisible to
every class-string pin).

The walk itself needed three iterations before its evidence was
trustworthy — the s111 precedent repeating almost beat for beat,
but with entirely different bugs. First: `page.evaluate` given a
STRING of an arrow function evaluates the string to a function
OBJECT, which is not serializable, so every extraction came back
`undefined` — the reference side reported "NO DATA" while its
dialogs sat open and measurable. Second: the pre-hydration click
swallow on our side — a click that lands before React attaches its
handlers is simply lost, and the naive retry then blind-clicked
behind the dialog that had (late) opened from the queued event,
hanging on Playwright's actionability checks for thirty seconds a
dialog. Third — and this one was a genuine discovery about our own
app: our PERMANENTLY-MOUNTED mobile-nav drawer carries
`role="dialog"`. A CSS `[role=dialog]` selector matches that hidden
drawer FIRST, and never resolves, while the real Radix dialog sits
open on top of it. The reference has no drawer at all (that is its
headline defect), which is why only our side tripped. The e2e suite
never hit this because `getByRole("dialog")` filters hidden
elements; raw CSS selectors do not. That asymmetry is now a
documented rule at the source: key on `[data-state="open"]`.

And then the result nobody quite expected: **complete parity**.
Every geometry axis, all seven dialogs, both widths — the widths
(512/672/448 at desktop, full-bleed at phone), the scroll caps, the
pads and radii and gaps, the header ladders, the close X geometry,
the label-to-control gaps, the footers, even the child census
structure — identical. And the mount focus: identical on all seven
dialogs. The reference focuses the first input on four dialogs, the
camera button on the contact dialog, the type select trigger on the
activity dialog, and — the amusing one — the CANCEL button on the
import dialog (its dropzone is a `<label>`, not focusable, so the
footer's first button wins). Our app does exactly the same, on
every one, at both widths. Twenty sessions of changes and a
framework-version gap, and the family never drifted.

Which left the finds that a parity walk surfaces even in
agreement. The close X: the reference's string is the CURRENT stock
shadcn close — `ring-offset-background`, the two
`data-[state=open]` arms, no `disabled:opacity-70` — while ours was
the s15-era snapshot, extracted before the reference's shadcn bump.
The inert arms were re-pinned for byte parity. But
`ring-offset-background` deserved the hardest look of the session:
copying it would be byte parity, yet it would CHANGE our rendered
result — our `--color-background` is `#f9fafb`, the reference's
focused-close offset computes pure white, and our v4 default
already computes pure white. Copying the class would introduce a
one-shade divergence in the focused state in the name of matching.
The s11 lesson — re-derive from the computed value, never copy the
class string — decided it: the class stays out, and its absence is
itself pinned, with the reasoning in the token's comment.

The camera aria-label went the other way: our superset (the named
button over the reference's unnamed icon-only one) is the
mobile-nav genus — our defect fix over their defect — and it was
correct but unpinned. Now frozen. And the mount-focus parity, the
walk's whole reason for existing, is frozen too: six `toBeFocused()`
expects inside existing e2e blocks, the census unchanged, the s111
D1 pattern applied six times over.

The TDD ladder closed clean: RED-1 at 16 failed | 230 passed (246)
— the docs-counts axis dominating, as it has since s109, with the
close-X it the only src-dependent failure; the camera it a freeze
pin passing at staging, exactly as the plan predicted. Stash-proven
at the native 244/244. GREEN at 109 files / 1944 with one honest
in-flight correction: the census literals drafted as 1543/212
landed at 1548/215, because comments always run longer than
drafts. RED-2 both faces by name. The gate stepwise and green,
including the six new focus expects passing on their very first
e2e run — the walk's measurements translating directly into stable
pins.

The captures closed it: 176–179, the VLM battery reading the
focused Name input's dark ring off the 1440 lead dialog, the
full-bleed centered phone face, the camera button's blue focus
ring, and — after one adjudication at 3× zoom, because a 1px
`#0a0a0a` ring is at the edge of what a VLM resolves at 1× — the
event dialog's focused Title input. The evidence chain ran from
computed styles to pixels to pins.

Session 112 complete — shipped at `f16f2c3`, pushed and
remote-verified. The dialog family joins the login family in the
freshly re-walked set: byte-verified, behavior-verified, and
pinned against drift. The next un-walked LIVE surfaces to consider
(session 113): the topbar search dropdown family, the account-menu
/ row-menu popover family, or the reports tabs' interactive chart
family.
