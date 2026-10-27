import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  BOTTOM_NAV,
  HEADER_BUTTONS,
  KPI_CARD,
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
});

// ---------------------------------------------------------------------------
// Session-193 (the session-4 round): the reference REDESIGNED its mobile
// navigation — it now ships a fixed bottom tab bar (live-extracted
// 2026-10-27 at 390×844: `md:hidden fixed bottom-0 left-0 right-0 z-50
// bg-white border-t border-slate-200 safe-area-pb`, items `flex flex-col
// items-center gap-1 px-4 py-2 rounded-xl transition-all` + active
// text-slate-900 / inactive text-slate-400, lucide icons w-6 h-6, labels
// text-xs font-medium). The drawer + hamburger we shipped as the superset
// while the reference had NO phone nav became visible-pixel divergences
// the moment the reference shipped its own bar — both retired, replaced
// by this byte-mirrored parity surface.
// ---------------------------------------------------------------------------
describe("the mobile bottom tab bar (byte-extracted from the reference's redesigned live DOM)", () => {
  it("the bar: md:hidden, fixed to the bottom, white, slate-200 top border, safe-area padded", () => {
    expect(BOTTOM_NAV.bar).toContain("md:hidden");
    expect(BOTTOM_NAV.bar).toContain("fixed bottom-0 left-0 right-0");
    expect(BOTTOM_NAV.bar).toContain("z-50");
    expect(BOTTOM_NAV.bar).toContain("bg-white");
    expect(BOTTOM_NAV.bar).toContain("border-t border-slate-200");
    expect(BOTTOM_NAV.bar).toContain("safe-area-pb");
  });

  it("the row: flex items-center justify-around py-2", () => {
    expect(BOTTOM_NAV.row).toContain("flex items-center justify-around");
    expect(BOTTOM_NAV.row).toContain("py-2");
  });

  it("the item: flex-col, gap-1, px-4 py-2, rounded-xl, transition-all", () => {
    expect(BOTTOM_NAV.item).toContain("flex flex-col items-center gap-1");
    expect(BOTTOM_NAV.item).toContain("px-4 py-2");
    expect(BOTTOM_NAV.item).toContain("rounded-xl");
    expect(BOTTOM_NAV.item).toContain("transition-all");
  });

  it("the ink: active slate-900, inactive slate-400 (the reference's exact split)", () => {
    expect(BOTTOM_NAV.itemActive).toContain("text-slate-900");
    expect(BOTTOM_NAV.itemInactive).toContain("text-slate-400");
  });

  it("the icon is w-6 h-6; the label is text-xs font-medium", () => {
    expect(BOTTOM_NAV.icon).toContain("w-6 h-6");
    expect(BOTTOM_NAV.label).toContain("text-xs");
    expect(BOTTOM_NAV.label).toContain("font-medium");
  });

  it("the safe-area-pb utility exists in globals.css (the reference's own class name, made real)", () => {
    const css = read("src/app/globals.css");
    expect(css).toContain("@utility safe-area-pb");
    expect(css).toContain("padding-bottom: env(safe-area-inset-bottom)");
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

  // The APP_FOOTER was retired with the reference's redesign — it ships
  // NO footer on the app surface (live-verified 2026-10-27 on every app
  // page, both axes: no footer element in the DOM). The landing keeps its
  // OWN footer (our public-site IA — the landing is the documented
  // superset surface).
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

  it("the icons: the reference's exact lucide set (User, not CircleUser)", () => {
    // Live-extracted 2026-10-27: the reference's top pills AND its bottom
    // bar both carry lucide-user for Profile (CircleUser was the s190
    // extraction — the reference has since unified on the plain User).
    const iconNames = NAV_ITEMS.map((i) => i.icon.displayName);
    expect(iconNames).toEqual([
      "LayoutDashboard",
      "ArrowLeftRight",
      "Target",
      "User",
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

  // The drawer family (hamburger, Radix sheet, matchMedia auto-close,
  // scroll lock) was RETIRED with the reference's mobile redesign — the
  // pins above describe the retired surfaces. The bottom bar replaced
  // them (the wiring pins below).
  it("the bottom tab bar rides the BOTTOM_NAV contracts", () => {
    for (const ref of ["BOTTOM_NAV.bar", "BOTTOM_NAV.row"]) {
      expect(shell).toContain(`className={${ref}}`);
    }
    // The item composes the base with the active/inactive ink (cn).
    expect(shell).toContain("BOTTOM_NAV.item,");
    expect(shell).toContain("active ? BOTTOM_NAV.itemActive : BOTTOM_NAV.itemInactive");
    expect(shell).toContain("className={BOTTOM_NAV.icon}");
    expect(shell).toContain("className={BOTTOM_NAV.label}");
  });

  it("the bottom bar is an a11y-labelled nav landmark (OUR kept superset)", () => {
    expect(shell).toContain('aria-label="Main navigation"');
    // The reference ships NO aria-current on its bottom bar; ours adds it
    // (invisible to pixels, the established a11y superset pattern).
    expect(shell).toContain('aria-current={active ? "page" : undefined}');
  });

  it("no hamburger, no drawer, no footer (the reference's redesigned chrome)", () => {
    expect(shell).not.toContain("Open navigation menu");
    expect(shell).not.toContain("DialogPrimitive");
    expect(shell).not.toContain("<footer");
    expect(shell).not.toContain("matchMedia");
    expect(shell).not.toContain("document.body.style.overflow");
  });
});

// ---------------------------------------------------------------------------
// Session-191 (the session-2 remediation round): the dashboard's AI
// Insights empty-state copy. The reference's live text is "Get
// personalized insights based on your spending patterns" (a11y census
// 2026-10-27); ours had drifted to a different sentence. The pin keeps
// the reference's exact user-facing words.
// ---------------------------------------------------------------------------
describe("the dashboard copy contracts (the reference's user-facing words)", () => {
  const dashboardSrc = () => read("src/app/(app)/dashboard/dashboard-page.tsx");

  it("the AI Insights empty state carries the reference's sentence", () => {
    expect(dashboardSrc()).toContain(
      "Get personalized insights based on your spending patterns",
    );
    // the drifted spelling is gone
    expect(dashboardSrc()).not.toContain("Personalized spending analysis");
  });
});
