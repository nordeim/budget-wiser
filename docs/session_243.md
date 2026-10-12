# Session 243 — Session 114 narration

Four pixels is not much of a find. It is, however, the whole reason
the walks exist.

The fourth family re-walk began the way the third one did — with a
scout killing candidates before lunch. The chrome re-walk never stood
a chance on principle: the sidebar and topbar ride every pixel sweep
at all four viewports every single session, so whatever a walk would
measure, the drift gates measure it constantly. That left the profile
photo family and the settings Data-tab family, which turned out to be
one walk wearing two names — both are the personal-workspace surfaces,
and neither had ever been driven live.

The walk took four extraction iterations, and each iteration taught
something. The card selector had to learn that these cards are
rounded-xl, not rounded-lg. The shadow extractor was truncating at a
hundred characters — exactly long enough to hide the two visible
shadow layers behind the four transparent prepends that are the
documented v4 serialization noise, making ours look shadowless next to
a reference that renders the identical visible shadow. An unresolved
native file chooser froze the page for everything that came after it.
And one pass forgot to log in at all, which is how we learned the
reference serves its settings shell to strangers while ours redirects
at the layout. By the fourth pass the data was clean, and the surface
it described was, for the most part, already right: geometry
byte-identical at both widths, computed styles equal, and the whole
interaction battery — camera to file chooser, upload to preview, save
to reload — behaving the same on both apps.

Which is what made the four pixels stand out. The Danger Zone warning
line — one line of red text under one card title — renders at
text-sm on the reference and at the bare class on ours. Fourteen
pixels against sixteen. Twenty-pixel line against twenty-four. A
240-pixel card against a 244-pixel one, with every child below the
line shifted down by the difference. The s26 probe had under-read it
five sessions before the reference's current construction; the drift
sweeps never see the Data tab because they sweep the default one; and
so four pixels survived one hundred and fourteen sessions of gates.
One class joined the token, and the card byte-matched the reference at
both widths.

The second find was the form-labeling family again, one session after
the Filters labels taught it: the reference wires its profile labels
and inputs with bare email and role ids, and ours carried
profile-email and profile-role — a defensive uniqueness from an early
session, defending against a collision that has never existed. The
third find was a freeze rather than a fix: the interaction battery,
measured identical, pinned so it stays that way.

The e2e phase taught the session's hardest lesson, and it was about
test hygiene rather than parity. The new test uploads a photo and
saves it — and the save persists that photo on the user record that
every other test in the run shares. Two later tests, whose
clean-state assumptions predate any test that both uploads and saves,
failed in the full run while passing in isolation. State pollution,
invisible until the first test did both things at once. The fix is a
cleanup seam — the test restores what it changed, through the same
endpoint it just verified — and the second lesson rode beside it:
page.request bypasses the page's network layer entirely, so its
responses are invisible to waitForResponse, and the first draft of
the cleanup timed out learning that.

The captures closed it the way they always do: not with the tester's
assertions but with a reader who had never seen the code, looking at
the pixels and saying unprompted that the Danger Zone description sits
at "a small font size, visually consistent with the description text
found in the other cards." That sentence is the fix, seen from
outside. Four pixels, found, fixed, frozen, and read back off the
screen.

Session 114 complete — shipped at `e516027`, pushed and
remote-verified, key shredded, main only. The login, dialog, menu,
and now profile and Data-tab families are all freshly re-walked. What
remains is thinning: the settings Defaults tab's editors, the accounts
detail surfaces, the reports tables. Session 115's choice.
