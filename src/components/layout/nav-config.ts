import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  CircleUser,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** The reference app's nav — capitalized paths byte-extracted from its
 *  live DOM (href="/Dashboard", "/Transactions", "/Budgets", "/Profile"). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/Transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/Budgets", label: "Budgets", icon: Target },
  { href: "/Profile", label: "Profile", icon: CircleUser },
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
