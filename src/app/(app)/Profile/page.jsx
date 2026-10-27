// The /Profile capital alias (the reference's nav href form).
// A .jsx file ON PURPOSE — TypeScript's TS1149 fires whenever one program
// includes two real files whose paths differ only in casing; the .jsx
// extension keeps the alias out of that collision.
//
// Session-196: the metadata RE-EXPORT — without it the alias route
// silently dropped the page's title/OG/canonical and served the layout
// default ("Budget Wise" in the tab instead of "Profile | Budget Wise").
// The reference serves the full title on its own capitalized routes
// (curl-verified 2026-10-28); our nav hrefs ARE those forms, so every
// navbar click landed on a wrongly-titled tab. Invisible to every gate:
// the unit pins read the lowercase files; no e2e asserted titles.
export { metadata } from "../profile/page";
import ProfileRoute from "../profile/page";

export default function ProfileCapitalRoute() {
  return <ProfileRoute />;
}
