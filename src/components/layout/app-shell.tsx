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

  // Session-194: the reference's EXACT shell hierarchy (live-probed):
  //   body (white) > DIV('') > [NAV(sticky), DIV(bottom bar), MAIN.pb-20
  //   md:pb-0 > DIV.min-h-screen.bg-slate-50 > page]
  // — a bare wrapper, the navbar + bar as its first two children, main
  // LAST, and the slate-50 surface INSIDE main (so the navbar/bar sit
  // on the white body, and main's pb-20 clearance strip is white too —
  // ours had the min-h-screen root OUTSIDE main, painting slate-50
  // behind the translucent navbar and inside the clearance strip).
  return (
    <div>
      <BrandNav pathname={pathname} />
      {/* The bar precedes main in the reference's own DOM order (its
          wrapper: NAV, bar, MAIN) — byte-mirrored. */}
      <BottomTabBar pathname={pathname} />
      {/* The main carries the reference's bar-clearing padding (pb-20
          md:pb-0 — session-194): below md, the last content clears the
          fixed bottom bar at scroll-end; at md+ the bar is hidden and
          the padding drops to zero. */}
      <main className={SHELL_LAYOUT.main}>
        <div className={SHELL_LAYOUT.root}>{children}</div>
      </main>
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
              {/* The ACTIVE icon carries the ink class too — the
                  reference's active-svg form (session-194); inactive
                  icons ride the base sizing alone. */}
              <item.icon
                className={cn(BOTTOM_NAV.icon, active && BOTTOM_NAV.iconActive)}
                strokeWidth={2}
              />
              <span className={BOTTOM_NAV.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
