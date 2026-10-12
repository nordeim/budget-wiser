# Session 239 — Session 113 narration

The rotation chose itself this time. The s112 close-out had offered
three candidates, and the scout — a two-app probe thrown together in
twenty minutes — killed two of them before lunch. The topbar search
dropdown: there is no dropdown. Not on the reference (the s32
dead-decode, now confirmed live with fingers on the keys — click it,
fill it, zero popper surfaces either way), and not on ours, because our
superset filters through the results list without one. The chart
tooltips: recharts defaults on both sides, invisible until hovered,
exactly what the s10 doctrine said they'd be. What remained was the
family nobody had ever walked live: the menus and popovers.

It was overdue in the way these things usually are. The MENU_CONTENT
and MENU_ITEM pins were extracted on September 30 — thirteen sessions
ago — and the reference has re-shipped its shadcn bump since. The
s112 walk had found exactly this genus in the dialog close-X: our
string a snapshot of a stock component the reference no longer ships.
And the family's behavior — what gets focus when a menu opens, what
ArrowDown does — had never been measured anywhere. Class-string pins
read what renders, not what focuses. The s111 login walk taught that
lesson once; this was the third family to relearn it.

The walk itself went smoothly — two scripts, both apps, both widths,
the standing build on a scratch database. And the result was the kind
parity work hopes for: the account menu in complete agreement on every
axis that matters. The geometry byte-identical — the menu opens at
exactly 1280,56, exactly 128×74, on both apps, the popper transform
matrices equal. The computed styles equal to the last decimal. The
items — an anchor and a div, Profile and Logout — identical in
construction, size, padding, font. The mount-focus identical: Radix
focuses the content container on click-open, and both apps do it.
ArrowDown lands the first item with the same #f5f5f5 wash on both.
Even the Filters popover's collision behavior matched — at 390 both
apps flip the panel to data-side=top rather than overflow the frame,
landing at the same x, the same y, the same 320×398.

Which left the finds that agreement surfaces. The biggest was also the
smallest: four tags. The reference's Filters popover labels its fields
with `<label>` elements; ours used `<span>`s. Same classes, same
rendering, same layout — but not the same semantics, and semantics are
what a screen reader reads. The strict-mirror doctrine made the fix
easy: match the reference, tag for tag. The second find was the s112
close-X genus again, one family over: our menu content carried an
`outline-none` the reference's current stock dropped in its shadcn
bump. Inert on both open paths — the click-open's programmatic focus
never triggers :focus-visible, and the keyboard path focuses the first
item before the content could show an outline — so it retired for byte
parity with nothing rendered changing. The third find wasn't a fix but
a freeze: the mount-focus and keyboard model, measured identical, now
pinned as e2e expects inside the existing menu tests. What a walk
verifies, a pin keeps.

The TDD ladder closed clean. RED-1 at sixteen failures — the plan
predicted fifteen to eighteen, and sixteen is the same number the s112
ladder landed on, which is either a coincidence or a sign that the
docs-counts axis fails at a predictable rate. The stash proof came out
exact: 204 native, 206 staged, sixteen red. GREEN needed one honest
correction — the census literal drafted at 1556 landed at 1559,
because comments always run longer than drafts, which is the same
sentence the s112 record wrote about its own 1543-to-1548 — and two
lockstep re-anchors the plan's checklist missed, found the honest way:
the first GREEN run failed on them by name.

The captures closed it. Four panels, four VLM reads, zero
adjudications — the battery read the Profile and Logout items off both
viewports, the four field labels off the Filters popover (describing,
unprompted, "labels positioned above each input field" — the fix,
visible), and the Edit / Convert to Opportunity / Delete trio with the
red Delete off the row menu. The evidence chain ran from computed
styles to class strings to pins to pixels.

Session 113 complete — shipped at `f10cee6`, pushed and
remote-verified, key shredded, main only. The menu family joins the
login and dialog families in the freshly re-walked set. The un-walked
list is thinning: the settings Data-tab family, the profile photo
family, or a hundred-session re-walk of the chrome itself are what
remain. Session 114's choice.
