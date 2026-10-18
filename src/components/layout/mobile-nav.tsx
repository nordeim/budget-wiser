"use client";

// Session-147 (probe:ref #119's parity event): the drawer RE-DERIVED onto
// the repo's Radix dialog primitives — the reference's own mobile-nav fix,
// decoded live (walk37): the shadcn Sheet pattern (a left-anchored Radix
// Dialog, 288px `w-72`, the brand-blue sheet, the "CRM" wordmark header +
// an sr-only description, the stock DialogClose, `bg-black/80` overlay,
// the 500ms-in/300ms-out slide). The s91-era hand-rolled drawer — built
// when the reference shipped NO phone navigation — retired with the
// standing defect it fixed (the ledger's #1, retired upstream 2026-10-19).
//
// Tailwind v4 pitfalls deliberately avoided (the vendored tw-animate.css
// powers the data-[state] animate family — the same machinery the entity
// dialogs ride):
//  - No `hidden` attribute fighting display utilities (v4: `hidden` WINS).
//  - The sheet is portal'd to body level — long lists are never clipped
//    by an ancestor (the old failure class C, solved structurally now).
//  - z-index stays on the flat scale (the sheet z-50, below toasts 100).
//
// React 19 / Radix semantics (the reference's own):
//  - Radix's FocusScope traps + wraps Tab, focuses the Close button on
//    open (the S12-P1 contract is now Radix's own), and restores focus
//    to the trigger on close (N-65h).
//  - Escape + scrim-click close (DismissableLayer + the overlay click).
//  - Body scroll lock rides react-remove-scroll (the body lock the
//    reference's own sheet ships; the `data-scroll-locked` marker).
//
// OUR kept behavioral supersets (invisible to pixels, e2e-pinned):
//  - S8-P1: auto-close when the viewport grows past md — the pinned
//    regression (resize from 700 to 800 with the drawer open left both
//    scroll locks engaged under the md:hidden drawer).
//  - The MAIN-scroller lock: `main` owns scrolling in the shell model,
//    so the lock clamps it too (body alone never covered it).
//  - The route-change close (AppShell's adjust-during-render, s35).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  NAV_ITEMS,
  NAV_FOOTER_ITEMS,
  isNavActive,
  type NavItem,
} from "./nav-config";
import { DialogOverlay } from "@/components/ui/dialog";
import { MOBILE_NAV_LAYOUT, MOBILE_NAV_SHEET } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  // S8-P1 (kept superset): close automatically when the viewport grows
  // past the mobile breakpoint. The query MUST match the trigger's
  // `md:hidden` range (768px) — session-7 changed the range but left
  // this listener at 1024px, which left body + main scroll-locked after
  // resizing from 700 to 800px with the drawer open (the drawer hid,
  // the locks stayed).
  React.useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia(MOBILE_NAV_LAYOUT.autoCloseQuery);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onOpenChange(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, onOpenChange]);

  // The MAIN-scroller lock (kept superset): Radix locks body via
  // react-remove-scroll, but `main` is the shell's ONLY scroller
  // (session-7 model) — body alone never covered it.
  React.useEffect(() => {
    if (!open) return;
    const scroller = document.querySelector<HTMLElement>("main");
    const prevScrollerOverflow = scroller?.style.overflow ?? "";
    if (scroller) scroller.style.overflow = "hidden";
    return () => {
      if (scroller) scroller.style.overflow = prevScrollerOverflow;
    };
  }, [open]);

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
        <DrawerNav onNavigate={() => onOpenChange(false)} />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/** The drawer's nav — NAV_ITEMS + NAV_FOOTER_ITEMS with the drawer's own
 *  link contracts (MOBILE_NAV_SHEET: the white/20 active, the white/80
 *  inactive, the mt-4 border-t settings group — NOT the desktop
 *  sidebar's styles: the two surfaces diverged upstream in the
 *  reference's own build). */
function DrawerNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const renderLink = (item: NavItem, active: boolean) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        active ? MOBILE_NAV_SHEET.linkActive : MOBILE_NAV_SHEET.link,
        // our focus-visible superset (the reference ships no ring)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
      )}
    >
      <item.icon className={cn(MOBILE_NAV_SHEET.icon, "shrink-0")} strokeWidth={2} />
      <span className="truncate">{item.label}</span>
    </Link>
  );

  return (
    <>
      <nav aria-label="Main navigation" className={MOBILE_NAV_SHEET.nav}>
        {NAV_ITEMS.map((item) => renderLink(item, isNavActive(pathname, item.href)))}
      </nav>
      <nav aria-label="Settings" className={MOBILE_NAV_SHEET.navFooter}>
        {NAV_FOOTER_ITEMS.map((item) => renderLink(item, isNavActive(pathname, item.href)))}
      </nav>
    </>
  );
}
