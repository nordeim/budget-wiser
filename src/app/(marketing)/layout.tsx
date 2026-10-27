import { getSessionUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { GuestLoginRedirect } from "@/components/layout/guest-login-redirect";

export const dynamic = "force-dynamic";

// Session-144 → Session-147 (F-144c1 → F-147c2 — the posture REVERSED
// upstream): the (marketing) route group went public at s144 because the
// reference then served /About + /Contact to GUESTS (walk34,
// rendered-level: the full marketing content + the app chrome + the
// "Hi, Guest" topbar). The reference's parity-event bundle (probe:ref
// #119, walk37) REVERSED that: its marketing pages now LOGIN-WALL
// guests — a client-side guard redirects to
// /login?from_url=<absolute-url> and returns them post-login.
//
// The layout is GUARDED again: the session decision stays SERVER-side
// (a guest never receives the marketing page's HTML — the shim renders
// INSTEAD of the shell), and the navigation rides the reference's own
// client-side mechanism (GuestLoginRedirect). The landing page at `/`
// stays public (the reference's marketing root — outside this group).
// The s144 guest-chrome feed retired with the posture.
export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) return <GuestLoginRedirect />;
  return <AppShell>{children}</AppShell>;
}
