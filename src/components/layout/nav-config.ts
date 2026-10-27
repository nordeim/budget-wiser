import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** The reference app's nav — capitalized paths byte-extracted from its
 *  live DOM (href="/Dashboard", "/Transactions", "/Budgets", "/Profile").
 *  Icons live-extracted 2026-10-27 (session-193): the reference carries
 *  lucide-user for Profile on BOTH the top pills and the bottom bar —
 *  CircleUser (the s190 extraction) was retired with its redesign. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/Transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/Budgets", label: "Budgets", icon: Target },
  { href: "/Profile", label: "Profile", icon: User },
];

export const NAV_FOOTER_ITEMS: NavItem[] = [];

/** Case-insensitive active matching — the reference's router serves both
 *  casings; the Dashboard root special case covers "/" (the post-login
 *  landing). */
export function isNavActive(pathname: string, href: string): boolean {
  const p = pathname.toLowerCase();
  const h = href.toLowerCase();
  if (h === "/dashboard") return p === "/" || p === "/dashboard";
  return p === h || p.startsWith(`${h}/`);
}
