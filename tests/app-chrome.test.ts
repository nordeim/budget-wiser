import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  BOTTOM_NAV,
  BUDGET_CARD,
  DARK_CARD,
  EMPTY_STATE,
  HEADER_BUTTONS,
  KPI_CARD,
  PAGE_HEADER,
  PAGE_ROOT,
  PANEL,
  RECENT_ROW,
  SHELL_LAYOUT,
  SITE_NAV,
  SUMMARY_CARD,
  TXN_LIST,
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

  it("the shell's outer surface wrapper (session-195): slate-50 behind the translucent navbar", () => {
    // Live-extracted 2026-10-27 (the reference's third shell restyle): a
    // `min-h-screen bg-slate-50` DIV now encloses the whole [NAV, bar,
    // MAIN] trio inside the bare wrapper — the translucent navbar
    // (`bg-white/80 backdrop-blur-sm`) renders white/80 over slate-50
    // (rgb(254,254,255)) instead of over the white body (rgb(255,255,255));
    // the phone scroll-end clearance strip below the inner root's box
    // shows slate-50 too. Ours rendered the trio directly in the bare DIV.
    expect(SHELL_LAYOUT.outer).toContain("min-h-screen bg-slate-50");
  });

  it("the shell main clears the bottom bar below md (pb-20 md:pb-0)", () => {
    // Live-extracted session-194 (2026-10-27): the reference's shell <main>
    // carries `pb-20 md:pb-0` on every app page — 80px of bottom padding
    // below md so scrolled-to-end content clears the 77px fixed bottom
    // bar (verified all four pages). Without it, content boxes sit
    // BEHIND the bar at scroll-end (ours measured +20px behind on
    // dashboard/profile) — the s193 round mirrored the bar itself but
    // not its clearance padding.
    expect(SHELL_LAYOUT.main).toContain("pb-20");
    expect(SHELL_LAYOUT.main).toContain("md:pb-0");
  });

  it("the page containers: the per-page widths (7xl/5xl/4xl — session-194)", () => {
    expect(PAGE_ROOT.wide).toContain("max-w-7xl mx-auto");
    expect(PAGE_ROOT.wide).toContain("lg:px-8");
    expect(PAGE_ROOT.content).toContain("max-w-5xl mx-auto");
    expect(PAGE_ROOT.content).not.toContain("lg:px-8");
    expect(PAGE_ROOT.narrow).toContain("max-w-4xl mx-auto");
    expect(PAGE_ROOT.narrow).toContain("py-8");
  });

  it("the header family: the sm-stacking div, tracking-tight title, mt-1 subtitle", () => {
    // Session-194: the reference's restyled header — stacks below sm (not
    // md), a plain DIV, tracking-tight H1, mt-1 subtitle, the gap-3 row.
    expect(PAGE_HEADER.root).toContain("flex flex-col sm:flex-row");
    expect(PAGE_HEADER.root).toContain("sm:justify-between");
    expect(PAGE_HEADER.title).toContain("text-3xl font-bold text-slate-900 tracking-tight");
    expect(PAGE_HEADER.subtitle).toContain("text-slate-500 mt-1");
    expect(PAGE_HEADER.actions).toContain("flex gap-3");
  });

  it("the KPI cards: rounded-xl border-0 shadow-sm + the gradient variants", () => {
    // Session-194: the restyled family — hover:shadow-md, tracking-tight
    // values, p-3 rounded-2xl chips, the emerald/rose gradient cards.
    expect(KPI_CARD.root).toContain("rounded-xl");
    expect(KPI_CARD.root).toContain("bg-white border-0 shadow-sm");
    expect(KPI_CARD.root).toContain("hover:shadow-md");
    expect(KPI_CARD.rootIncome).toContain("bg-gradient-to-br from-emerald-50 to-white");
    expect(KPI_CARD.rootExpenses).toContain("bg-gradient-to-br from-rose-50 to-white");
    expect(KPI_CARD.value).toContain("text-3xl font-bold text-slate-900 tracking-tight");
    expect(KPI_CARD.chip).toContain("p-3 rounded-2xl bg-slate-50");
    expect(KPI_CARD.label).toContain("tracking-wide uppercase");
  });

  it("the panel family: the stock shadcn Card anatomy", () => {
    // Session-194: rounded-xl bg-card border-0 shadow-sm + the p-6 pb-2
    // header + the p-6 pt-0 content + the tracking-tight text-lg DIV title.
    expect(PANEL.root).toContain("rounded-xl bg-card text-card-foreground border-0 shadow-sm");
    expect(PANEL.header).toContain("flex flex-col space-y-1.5 p-6 pb-2");
    expect(PANEL.title).toContain("tracking-tight text-lg font-semibold text-slate-900");
    expect(PANEL.content).toContain("p-6 pt-0");
  });

  it("the header buttons: the stock shadcn forms (h-9, full arms)", () => {
    expect(HEADER_BUTTONS.outline).toContain("border bg-background shadow-sm hover:bg-accent");
    expect(HEADER_BUTTONS.outline).toContain("h-9 px-4 py-2 border-slate-200");
    expect(HEADER_BUTTONS.dark).toContain("bg-slate-900 hover:bg-slate-800");
    expect(HEADER_BUTTONS.dark).toContain("text-primary-foreground shadow h-9 px-4 py-2");
  });

  it("the transactions summary pair: the p-4 gradient cards", () => {
    expect(SUMMARY_CARD.grid).toContain("grid grid-cols-2 gap-4 mb-6");
    expect(SUMMARY_CARD.rootIncome).toContain("p-4 border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-white");
    expect(SUMMARY_CARD.rootExpenses).toContain("bg-gradient-to-br from-rose-50 to-white");
    expect(SUMMARY_CARD.labelIncome).toContain("text-sm text-emerald-600 font-medium");
    expect(SUMMARY_CARD.valueIncome).toContain("text-2xl font-bold text-emerald-700");
  });

  it("the transactions list: divide-y rows + the badge + ghost delete", () => {
    expect(TXN_LIST.card).toContain("rounded-xl bg-card text-card-foreground border-0 shadow-sm overflow-hidden");
    expect(TXN_LIST.rows).toContain("divide-y divide-slate-100");
    expect(TXN_LIST.row).toContain("flex items-center gap-4 p-4 hover:bg-slate-50");
    expect(TXN_LIST.chip).toContain("p-2.5 rounded-xl");
    expect(TXN_LIST.badge).toContain("rounded-md border px-2.5 py-0.5");
    expect(TXN_LIST.amount).toContain("font-semibold text-lg");
    expect(TXN_LIST.delete).toContain("h-9 w-9 text-slate-400 hover:text-rose-600");
  });

  it("the budgets dark card: the gradient + 4xl value + NO percent", () => {
    expect(DARK_CARD.root).toContain("bg-gradient-to-br from-slate-900 to-slate-800 text-white");
    expect(DARK_CARD.value).toContain("text-4xl font-bold");
    expect(DARK_CARD.track).toContain("[&>div]:bg-gradient-to-r [&>div]:from-emerald-400");
    expect(DARK_CARD.trio).toContain("flex gap-6");
    expect(DARK_CARD.trioValue).toContain("text-3xl font-bold");
  });

  it("the budgets empty state: the bare w-12 icon (no tinted container)", () => {
    expect(EMPTY_STATE.root).toContain("bg-card text-card-foreground p-12 border-0 shadow-sm text-center");
    expect(EMPTY_STATE.icon).toContain("w-12 h-12 text-slate-300 mx-auto mb-4");
    expect(EMPTY_STATE.title).toContain("text-lg font-semibold text-slate-900 mb-2");
  });

  it("the budget cards: the gradient top strip + the primary/20 track", () => {
    expect(BUDGET_CARD.root).toContain("rounded-xl bg-card text-card-foreground border-0 shadow-sm overflow-hidden");
    expect(BUDGET_CARD.strip).toContain("h-2 bg-gradient-to-r from-emerald-500 to-emerald-600");
    expect(BUDGET_CARD.body).toContain("p-5");
    expect(BUDGET_CARD.track).toContain("rounded-full bg-primary/20 h-3 mb-3");
    expect(BUDGET_CARD.badgeOver).toContain("bg-rose-100 text-rose-700");
    expect(BUDGET_CARD.delete).toContain("h-9 w-9 text-slate-400 hover:text-rose-600");
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
    // The icon composes the active ink (the reference's active-svg form,
    // session-194); the label rides the label record alone.
    expect(shell).toContain("cn(BOTTOM_NAV.icon, active && BOTTOM_NAV.iconActive)");
    expect(shell).toContain("className={BOTTOM_NAV.label}");
    // The shell main carries the bar-clearing padding (session-194: the
    // reference's pb-20 md:pb-0 — scrolled-to-end content clears the
    // fixed bar below md; zero at md+ where the bar is hidden).
    expect(shell).toContain("<main className={SHELL_LAYOUT.main}>");
    // Session-195: the whole trio rides inside the outer surface wrapper —
    // `body (white) > DIV('') > DIV.min-h-screen.bg-slate-50 > [NAV, bar,
    // MAIN.pb-20 > DIV.min-h-screen.bg-slate-50 > page]` (the reference's
    // byte-extracted chrome; the navbar's white/80 backdrop sits on
    // slate-50, not the white body).
    expect(shell).toContain("<div className={SHELL_LAYOUT.outer}>");
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

// ---------------------------------------------------------------------------
// Session-218 (the session-29 round, F-1): the amount-direction arrows. The
// reference renders a small lucide arrow immediately before each
// transaction amount — ArrowDownLeft at w-4 h-4 text-rose-500 on expense
// rows, ArrowUpRight at w-4 h-4 text-emerald-500 on income rows — on BOTH
// row surfaces (the dashboard recent list + the /Transactions list). The
// genus is LONG-STANDING (visible in the repo's own day-one benchmark
// capture, docs/budget-wiser-dashboard.png) but was invisible to the
// row-anatomy census form, which probes the row + its three children — the
// arrow is a great-grandchild inside the actions div, the same census-depth
// blind-spot class as the s207 percent-encoding genus. Found by the
// session-218 VLM battery (the transactions-desktop pair — the battery's
// first flag to survive the direct DOM cross-check), verified by the live
// probe on both reference surfaces + the reference's JS bundle render
// sites (both extracted with these exact classes) + the benchmark image.
// ---------------------------------------------------------------------------
describe("the amount-direction arrows (the reference's genus, session-218 F-1)", () => {
  const txSrc = () => read("src/app/(app)/transactions/transactions-page.tsx");
  const dashSrc = () => read("src/app/(app)/dashboard/dashboard-page.tsx");

  it("the row records carry the reference's arrow classes", () => {
    // Expense: the rose down-left arrow; income: the emerald up-right
    // arrow (the reference's bundle-verified pairing — its demo data
    // carries no income row, so the income form is pinned from the JS
    // bundle render sites, extracted verbatim this round).
    expect(TXN_LIST.arrowExpense).toContain("w-4 h-4 text-rose-500");
    expect(TXN_LIST.arrowIncome).toContain("w-4 h-4 text-emerald-500");
    expect(RECENT_ROW.arrowExpense).toContain("w-4 h-4 text-rose-500");
    expect(RECENT_ROW.arrowIncome).toContain("w-4 h-4 text-emerald-500");
  });

  it("both row surfaces render the arrows before the amount span", () => {
    const tx = stripComments(txSrc());
    expect(tx).toContain("<ArrowDownLeft className={TXN_LIST.arrowExpense} />");
    expect(tx).toContain("<ArrowUpRight className={TXN_LIST.arrowIncome} />");

    const dash = stripComments(dashSrc());
    expect(dash).toContain("<ArrowDownLeft className={RECENT_ROW.arrowExpense} />");
    expect(dash).toContain("<ArrowUpRight className={RECENT_ROW.arrowIncome} />");
  });
});
