import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  APP_FOOTER,
  HEADER_BUTTONS,
  KPI_CARD,
  MOBILE_NAV_LAYOUT,
  MOBILE_NAV_SHEET,
  PAGE_HEADER,
  PAGE_ROOT,
  PANEL,
  SHELL_LAYOUT,
  SITE_NAV,
} from "@/lib/page-layout";
import { NAV_ITEMS, isNavActive } from "@/components/layout/nav-config";

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  expect(existsSync(p), `${rel} must exist`).toBe(true);
  return readFileSync(p, "utf8");
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

describe("the site-nav contracts (byte-extracted from the reference's live DOM)", () => {
  it("the sticky navbar: white/80 backdrop-blur, border-b, h-16 row", () => {
    expect(SITE_NAV.nav).toContain("sticky top-0 z-50");
    expect(SITE_NAV.nav).toContain("border-b border-slate-200");
    expect(SITE_NAV.nav).toContain("bg-white/80");
    expect(SITE_NAV.row).toContain("h-16");
  });

  it("the brand: the gradient slate tile + the BudgetWise wordmark", () => {
    expect(SITE_NAV.logoTile).toContain("bg-gradient-to-br from-slate-900 to-slate-700");
    expect(SITE_NAV.wordmark).toContain("text-xl font-bold text-slate-900");
  });

  it("the desktop pill row is hidden md:flex (the reference's exact split)", () => {
    expect(SITE_NAV.desktopLinks).toContain("hidden md:flex");
  });

  it("the active pill is the slate-900 fill; inactive is slate-600 + hover wash", () => {
    expect(SITE_NAV.linkActive).toContain("bg-slate-900 text-white");
    expect(SITE_NAV.link).toContain("text-slate-600 hover:bg-slate-100");
  });

  it("OUR superset hamburger is md:hidden with focus-visible support", () => {
    expect(SITE_NAV.hamburger).toContain("md:hidden");
    expect(SITE_NAV.hamburger).toContain("focus-visible:ring");
  });
});

describe("the mobile Sheet (OUR superset over the reference's missing nav)", () => {
  it("left-anchored, w-72, slate-900 brand surface, z-50", () => {
    expect(MOBILE_NAV_SHEET.content).toContain("inset-y-0 left-0 z-50 w-72");
    expect(MOBILE_NAV_SHEET.content).toContain("bg-slate-900");
  });

  it("the slide animations ride the data-[state] machinery (tw-animate)", () => {
    expect(MOBILE_NAV_SHEET.content).toContain("data-[state=open]:animate-in");
    expect(MOBILE_NAV_SHEET.content).toContain("data-[state=closed]:animate-out");
    expect(MOBILE_NAV_SHEET.content).toContain("data-[state=open]:slide-in-from-left");
  });

  it("the active link is white/20; inactive is white/80 (the drawer's own styles)", () => {
    expect(MOBILE_NAV_SHEET.linkActive).toContain("bg-white/20");
    expect(MOBILE_NAV_SHEET.link).toContain("text-white/80");
  });

  it("the auto-close query matches the hamburger's md range (768px)", () => {
    expect(MOBILE_NAV_LAYOUT.autoCloseQuery).toBe("(min-width: 768px)");
  });
});

describe("the shell + page contracts", () => {
  it("the document scrolls at the window level (the reference's model)", () => {
    expect(SHELL_LAYOUT.root).toContain("min-h-screen bg-slate-50");
  });

  it("the page container rides the navbar's max-w-7xl rhythm", () => {
    expect(PAGE_ROOT.standard).toContain("max-w-7xl mx-auto");
    expect(PAGE_ROOT.standard).toContain("py-8");
  });

  it("the header family: 3xl bold title, slate-500 subtitle, dual actions", () => {
    expect(PAGE_HEADER.title).toContain("text-3xl font-bold text-slate-900");
    expect(PAGE_HEADER.subtitle).toContain("text-slate-500");
    expect(PAGE_HEADER.actions).toContain("flex items-center gap-3");
  });

  it("the KPI cards: rounded-2xl white + the tinted income/expense variants", () => {
    expect(KPI_CARD.root).toContain("bg-white p-6 rounded-2xl");
    expect(KPI_CARD.rootIncome).toContain("bg-emerald-50/40");
    expect(KPI_CARD.rootExpenses).toContain("bg-red-50/40");
    expect(KPI_CARD.value).toContain("text-3xl font-bold");
  });

  it("the panel family and the 4/7/5 grid spans", () => {
    expect(PANEL.root).toContain("bg-white p-6 rounded-2xl");
    expect(PANEL.colSpan4).toBe("lg:col-span-4");
    expect(PANEL.colSpan7).toBe("lg:col-span-7");
    expect(PANEL.colSpan5).toBe("lg:col-span-5");
  });

  it("the header buttons: outline + dark forms", () => {
    expect(HEADER_BUTTONS.outline).toContain("border border-slate-200 bg-white");
    expect(HEADER_BUTTONS.dark).toContain("bg-slate-900");
  });

  it("the footer: the BudgetWise copyright + About/Contact links", () => {
    expect(APP_FOOTER.copyright).toBe("© 2026 BudgetWise");
    expect(APP_FOOTER.about.href).toBe("/About");
    expect(APP_FOOTER.contact.href).toBe("/Contact");
  });
});

describe("the nav config (the reference's four items)", () => {
  it("the items, order, and capitalized hrefs", () => {
    expect(NAV_ITEMS.map((i) => i.href)).toEqual([
      "/Dashboard",
      "/Transactions",
      "/Budgets",
      "/Profile",
    ]);
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      "Dashboard",
      "Transactions",
      "Budgets",
      "Profile",
    ]);
  });

  it("isNavActive: case-insensitive, the / dashboard special case, prefixes", () => {
    expect(isNavActive("/Dashboard", "/Dashboard")).toBe(true);
    expect(isNavActive("/dashboard", "/Dashboard")).toBe(true);
    expect(isNavActive("/", "/Dashboard")).toBe(true);
    expect(isNavActive("/transactions", "/Transactions")).toBe(true);
    expect(isNavActive("/Transactions", "/Profile")).toBe(false);
  });
});

describe("the app-shell construction (the chrome consumes the contracts)", () => {
  const shell = stripComments(read("src/components/layout/app-shell.tsx"));

  it("the navbar markup rides the SITE_NAV contracts", () => {
    for (const ref of ["SITE_NAV.nav", "SITE_NAV.row", "SITE_NAV.logoLink", "SITE_NAV.wordmark", "SITE_NAV.logoTile"]) {
      expect(shell).toContain(`className={${ref}}`);
    }
  });

  it("the desktop links + active state resolve through isNavActive", () => {
    expect(shell).toContain("isNavActive(pathname, item.href)");
    expect(shell).toContain("active ? SITE_NAV.linkActive : SITE_NAV.link");
  });

  it("the hamburger opens the drawer (the superset wiring)", () => {
    expect(shell).toContain('aria-label="Open navigation menu"');
    // A REAL Radix Trigger (focus restores to it on close).
    expect(shell).toContain("DialogPrimitive.Trigger asChild");
  });

  it("the resize-past-md auto-close effect survives (the kept superset)", () => {
    expect(shell).toContain("matchMedia(MOBILE_NAV_LAYOUT.autoCloseQuery)");
  });

  it("the scroll lock engages while the sheet is open", () => {
    expect(shell).toContain('document.body.style.overflow = "hidden"');
  });

  it("the route-change close: adjust-during-render on pathname", () => {
    expect(shell).toContain("prevPathname !== pathname");
  });

  it("the footer renders inside the document after main", () => {
    expect(shell).toContain("className={APP_FOOTER.footer}");
    expect(shell).toContain("{APP_FOOTER.copyright}");
  });
});
