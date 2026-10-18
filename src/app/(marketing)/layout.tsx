import { getSessionUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { APP_GUEST_USER } from "@/lib/page-layout";

export const dynamic = "force-dynamic";

// Session-144 (D-144a1/F-144c1): THE MARKETING ROUTE GROUP — the
// reference's /About + /Contact are PUBLIC pages (walk34, rendered-level:
// the full marketing content + the app chrome served to sessionless
// visitors — the "Hi, Guest" topbar + the gray-200 "G" avatar + the app
// footer; the s142 build's (app)-group placement login-walled the guest
// funnel: landing footer → 307, while the reference renders the pages).
//
// The group layout is SESSION-OPTIONAL: a real session renders the
// normal shell (the user's own topbar); a guest renders the same chrome
// with APP_GUEST_USER. The four route files moved here unchanged
// (about/contact + the capital .jsx aliases — the s24 dual-casing). The
// CRM DATA pages stay auth-gated — the (app) group's redirect is
// untouched (our documented fix-over-defect; the reference renders its
// data pages to guests too, its platform face, not a behavior we
// mirror).
//
// The store stays user:null for guests: AppShell's hydrate() resolves
// /api/auth/me → data:null → the else branch (no slice fetches, no
// crash) — the CRM links in the sidebar still lead to the (app) login
// wall.
export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  return <AppShell user={user ?? APP_GUEST_USER}>{children}</AppShell>;
}
