"use client";

// Budget Wise app chrome — the reference's top-navbar model:
// a `min-h-screen bg-slate-50` document that scrolls at the WINDOW level,
// the sticky `h-16` navbar above it, and the page content in a max-w-7xl
// container. The reference's app surface ships NO footer (verified live
// 2026-10-27 on every page, both axes) — the landing keeps its own.
//
// The mobile bottom tab bar (session-193): the reference REDESIGNED its
// phone navigation — a `md:hidden fixed bottom-0` white bar with the four
// destinations (icons w-6 h-6, labels text-xs, active slate-900 /
// inactive slate-400). Our sessions-190–192 drawer + hamburger were the
// documented superset while the reference shipped NO phone nav; the
// redesign made them visible-pixel divergences, so both were retired in
// favor of this byte-mirrored parity surface. The bar is plain fixed
// chrome — NOT an overlay: no portal, no scroll lock, no focus trap, no
// matchMedia auto-close.
//
// Tailwind v4 pitfalls deliberately avoided (the family the repo's
// docs/Tailwind-V4-Validation-Report.md pins):
//  - No `hidden` attribute fighting display utilities (v4: `hidden` WINS).
//  - z-index stays on the flat scale (the bar z-50, below toasts).
//  - Literal class strings only (the BOTTOM_NAV records).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";
import { NAV_ITEMS, isNavActive } from "./nav-config";
import { BOTTOM_NAV, SHELL_LAYOUT, SITE_NAV } from "@/lib/page-layout";
import { useBudgetStore } from "@/stores/budget-store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // One-time bootstrap of the client store from the session cookie.
  const hydrate = useBudgetStore((s) => s.hydrate);
  React.useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <div className={SHELL_LAYOUT.root}>
      <BrandNav pathname={pathname} />
      <main>{children}</main>

      {/* Mobile bottom tab bar (< md) — the reference's redesigned phone
          navigation, byte-mirrored. OUR kept a11y superset: the nav
          landmark label + aria-current (the reference ships neither). */}
      <BottomTabBar pathname={pathname} />
    </div>
  );
}

/** The sticky top navbar — the reference's own markup, byte-mirrored:
 *  logo link + `hidden md:flex` pill row (no phone trigger — the bottom
 *  bar is the phone navigation). */
function BrandNav({ pathname }: { pathname: string }) {
  return (
    <nav className={SITE_NAV.nav}>
      <div className={SITE_NAV.container}>
        <div className={SITE_NAV.row}>
          <Link href="/Dashboard" className={SITE_NAV.logoLink} aria-label="BudgetWise home">
            <span className={SITE_NAV.logoTile}>
              <Wallet className={SITE_NAV.logoIcon} strokeWidth={2} />
            </span>
            <span className={SITE_NAV.wordmark}>BudgetWise</span>
          </Link>

          <div className={SITE_NAV.desktopLinks}>
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? SITE_NAV.linkActive : SITE_NAV.link}
                >
                  <item.icon className={SITE_NAV.linkIcon} strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

/** The phone navigation — the reference's fixed bottom tab bar. */
function BottomTabBar({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main navigation" className={BOTTOM_NAV.bar}>
      <div className={BOTTOM_NAV.row}>
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                BOTTOM_NAV.item,
                active ? BOTTOM_NAV.itemActive : BOTTOM_NAV.itemInactive,
              )}
            >
              <item.icon className={BOTTOM_NAV.icon} strokeWidth={2} />
              <span className={BOTTOM_NAV.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
