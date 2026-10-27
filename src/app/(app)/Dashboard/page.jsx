// The /Dashboard capital alias — the reference's nav hrefs are the
// capitalized paths (byte-extracted from its live DOM) while the canonical
// lowercase route carries the implementation.
//
// A route FOLDER (not a next.config redirect) because Next.js matches
// config redirects CASE-INSENSITIVELY — a `/Dashboard -> /dashboard` rule
// would loop against every path. Route folders are case-exact on the
// filesystem, so the alias can never fight the canonical route.
// NOTE: this alias is a .jsx file ON PURPOSE — TypeScript's TS1149 fires
// whenever ONE program includes two real files whose paths differ ONLY in
// casing ((app)/Dashboard/page.tsx vs (app)/dashboard/page.tsx — the check
// is not flag-controllable). The .jsx extension keeps the alias out of
// that collision (paths differ by extension).
import DashboardRoute from "../dashboard/page";

export default function DashboardCapitalRoute() {
  return <DashboardRoute />;
}
