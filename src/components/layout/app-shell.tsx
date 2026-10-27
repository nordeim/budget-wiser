"use client";

// Budget Wise app chrome — the reference's top-navbar model:
// a `min-h-screen bg-slate-50` document that scrolls at the WINDOW level,
// the sticky `h-16` navbar above it, the page content in a max-w-7xl
// container, and the footer at the document's end.
//
// The mobile drawer (OUR superset): the reference ships NO navigation
// below md — its link row is display:none on phones with no hamburger.
// The drawer rides the repo's Radix-Dialog Sheet pattern (the vendored
// tw-animate.css data-[state] machinery), with the kept behavioral
// supersets: resize-past-md auto-close, body+document scroll lock, and
// route-change close.
//
// Tailwind v4 pitfalls deliberately avoided (the family the repo's
// docs/Tailwind-V4-Validation-Report.md pins):
//  - No `hidden` attribute fighting display utilities (v4: `hidden` WINS).
//  - The sheet is portal'd to body level — never clipped by an ancestor.
//  - z-index stays on the flat scale (sheet z-50, below toasts).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, Wallet, X } from "lucide-react";
import { NAV_ITEMS, isNavActive } from "./nav-config";
import { APP_FOOTER, MOBILE_NAV_LAYOUT, MOBILE_NAV_SHEET, SHELL_LAYOUT, SITE_NAV } from "@/lib/page-layout";
import { DialogOverlay } from "@/components/ui/dialog";
import { useBudgetStore } from "@/stores/budget-store";
import { cn } from "@/lib/utils";
import type { User as AppUser } from "@/types";

export function AppShell({ children }: { user: AppUser; children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const pathname = usePathname();

  // One-time bootstrap of the client store from the session cookie.
  const hydrate = useBudgetStore((s) => s.hydrate);
  React.useEffect(() => {
    void hydrate();
  }, [hydrate]);

  // Close the sheet on navigation — adjust-during-render (the sanctioned
  // React pattern for this component's OWN state).
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileNavOpen) setMobileNavOpen(false);
  }

  // Lock window scroll while the sheet is open.
  React.useEffect(() => {
    if (!mobileNavOpen) return;
    const prevOverflow = document.body.style.overflow ?? "";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileNavOpen]);

  return (
    <DialogPrimitive.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <div className={SHELL_LAYOUT.root}>
        <BrandNav pathname={pathname} />
        <main>{children}</main>
        <footer className={APP_FOOTER.footer}>
          <div className={APP_FOOTER.inner}>
            <span>{APP_FOOTER.copyright}</span>
            <span className="flex items-center gap-4">
              <a className={APP_FOOTER.link} href={APP_FOOTER.about.href}>
                {APP_FOOTER.about.label}
              </a>
              <a className={APP_FOOTER.link} href={APP_FOOTER.contact.href}>
                {APP_FOOTER.contact.label}
              </a>
            </span>
          </div>
        </footer>
      </div>

      {/* Mobile sheet (< md) — OUR superset over the reference (which
          ships no phone navigation at all). */}
      <MobileSheet open={mobileNavOpen} onOpenChange={setMobileNavOpen} pathname={pathname} />
    </DialogPrimitive.Root>
  );
}

/** The sticky top navbar — the reference's own markup, byte-mirrored:
 *  logo link + `hidden md:flex` pill row + (ours) the md:hidden hamburger. */
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

          {/* Our superset: the hamburger the reference never shipped —
              a real Radix Trigger so focus restores to it on close. */}
          <DialogPrimitive.Trigger asChild>
            <button
              type="button"
              className={SITE_NAV.hamburger}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </DialogPrimitive.Trigger>
        </div>
      </div>
    </nav>
  );
}

/** The drawer — Radix Dialog sheet, left-anchored, slate-900 brand. */
function MobileSheet({
  open,
  onOpenChange,
  pathname,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}) {
  // Superset: auto-close when the viewport grows past md — the query MUST
  // match the hamburger's md:hidden range (768px).
  React.useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia(MOBILE_NAV_LAYOUT.autoCloseQuery);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onOpenChange(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, onOpenChange]);

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content className={MOBILE_NAV_SHEET.content}>
        <DialogPrimitive.Close className={MOBILE_NAV_SHEET.close}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <div className={MOBILE_NAV_SHEET.header}>
          <DialogPrimitive.Title className={MOBILE_NAV_SHEET.title}>
            {MOBILE_NAV_SHEET.titleText}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className={MOBILE_NAV_SHEET.description}>
            {MOBILE_NAV_SHEET.descriptionText}
          </DialogPrimitive.Description>
        </div>
        <nav aria-label="Main navigation" className={MOBILE_NAV_SHEET.nav}>
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  active ? MOBILE_NAV_SHEET.linkActive : MOBILE_NAV_SHEET.link,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                )}
              >
                <item.icon className={cn(MOBILE_NAV_SHEET.icon, "shrink-0")} strokeWidth={2} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
