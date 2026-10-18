import {
  LayoutDashboard,
  // Session-17 (S17-P2a): the reference's sidebar glyphs — `users`
  // (two-person), `circle-user` (head r=3 + shoulders path) and
  // `calendar` (blank body, no day dots). lucide-react 0.525 exports
  // all three under the renamed canonical names (path-verified equal);
  // our old User/CircleUserRound/CalendarDays were DIFFERENT glyphs.
  Users,
  CircleUser,
  Target,
  Calendar,
  Activity,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Main nav (mirrors the reference app's sidebar order + icon shapes).
 * Session-24 (S24-P2): the hrefs are the reference's CAPITALIZED paths —
 * byte-extracted from its live DOM (its sidebar links point at
 * /Dashboard, /Accounts, … /Settings, and every capital URL renders the
 * page in place per S24-P1). The lowercase routes stay canonical; the
 * active-state matching in sidebar.tsx is case-insensitive exactly like
 * the reference's (it highlights Reports at lowercase /reports). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/Accounts", label: "Accounts", icon: Users },
  { href: "/Contacts", label: "Contacts", icon: CircleUser },
  { href: "/Leads", label: "Leads", icon: Target },
  { href: "/Calendar", label: "Calendar", icon: Calendar },
  { href: "/Activities", label: "Activities", icon: Activity },
  { href: "/Reports", label: "Reports", icon: BarChart3 },
];

/** Rendered below a thin divider and pinned to the sidebar's bottom via the
 * flex column's `mt-auto` footer group (NAV_LAYOUT.footerGroup — session-7). */
export const NAV_FOOTER_ITEMS: NavItem[] = [{ href: "/Settings", label: "Settings", icon: Settings }];

/** Session-147 (D-147a1): the shared nav-active predicate — extracted
 *  from SidebarNav so the desktop sidebar AND the mobile Sheet drawer
 *  (the s147 parity re-derivation) resolve the same active state. The
 *  rules are the s24 live decode: CASE-INSENSITIVE matching (the
 *  reference's sidebar links carry the capitalized hrefs while its
 *  router serves both casings — it highlights Reports at lowercase
 *  /reports), the Dashboard root special case (its post-login redirect
 *  lands on / while its Dashboard link points at /Dashboard — both are
 *  the dashboard), and the prefix rule for nested segments. */
export function isNavActive(pathname: string, href: string): boolean {
  const p = pathname.toLowerCase();
  const h = href.toLowerCase();
  if (h === "/dashboard") return p === "/" || p === "/dashboard";
  return p === h || p.startsWith(`${h}/`);
}
