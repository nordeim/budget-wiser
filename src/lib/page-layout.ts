/**
 * Budget Wise layout-system contracts.
 *
 * The shell family (SITE_NAV / BOTTOM_NAV / PAGE_ROOT) is extracted from
 * the LIVE reference app's DOM (budget-wiser.base44.app, agent-browser
 * class-dump at 1512×945 + 390×844 on 2026-10-27 — the byte-exact nav
 * markup is preserved in docs/IMPLEMENTATION-PLAN.md §2; the bottom bar
 * re-extracted the same day when the reference redesigned its phone nav).
 * The stock primitive family (BUTTON_BASE / INPUT_BASE / SELECT_TRIGGER /
 * CARD / DIALOG_* / MENU_* / TABS_* / CHECKBOX) is carried over VERBATIM
 * from the NEO CRM scaffold — those mirror shadcn/Radix stock anatomy and
 * are consumed by src/components/ui/*.
 *
 * Token mapping: slate-50 → page bg, white → surface, slate-200 → line,
 * slate-500 → muted, slate-900 → foreground/brand.
 */

import type * as React from "react";

// ---------------------------------------------------------------------------
// Stock primitives (carried over verbatim — consumed by components/ui/*)
// ---------------------------------------------------------------------------

export const CHECKBOX = {
  control:
    "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50",
  indicator: "flex items-center justify-center text-current",
  row: "flex items-center space-x-2",
  label: "text-sm cursor-pointer",
} as const;

export const BUTTON_BASE = {
  focusRing: "focus-visible:ring-1 focus-visible:ring-ring",
  svgSize: "[&_svg]:size-4",
  rounded: "rounded-md",
} as const;

export const INPUT_BASE = {
  // Session-194: the reference's restyled stock Input — byte-assembled
  // from its live DOM (the search field + the dialog fields): border-
  // input, NO explicit text color (typed text inherits --foreground),
  // placeholder:text-muted-foreground, and the md:text-sm arm at the
  // END (the platform's own assembly order). The scaffold's renamed
  // tokens (border-line / text-ink / text-muted-ink) carried the same
  // hexes — this is the class-string rename the restyle wave demands.
  base: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
} as const;

export const SELECT_TRIGGER = {
  // Session-194: the reference's restyled stock trigger — border-input
  // + data-[placeholder]:text-muted-foreground (byte-extracted from its
  // dialog + filter-bar selects; the widths append per-surface — the
  // dialog carries w-full, the filter bar w-full sm:w-40/sm:w-48).
  base: "flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
  placeholderState: "data-[placeholder]:text-muted-foreground",
  focusRing: "focus:outline-none focus:ring-1 focus:ring-ring",
} as const;

export const CARD = {
  title: "font-semibold leading-none tracking-tight",
} as const;

export const DIALOG_TEXTAREA =
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export const MENU_CONTENT =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border border-line bg-surface p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

export const MENU_ITEM =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-line-soft focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0";

// ---------------------------------------------------------------------------
// Dialog chrome (carried over verbatim — consumed by components/ui/dialog)
// ---------------------------------------------------------------------------

export const DIALOG_TITLE = "text-lg font-semibold leading-none tracking-tight";

/** The entity-dialog chrome — the stock shadcn geometry: 8px radius at
 *  >=sm, 0 below, FULL-BLEED w-full at phone widths, the slide-in/out
 *  animations via the vendored tw-animate. */
export const DIALOG_CONTENT = {
  base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-line bg-surface p-6 shadow-lg outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  /** The wide family caps at 672px and carries the scroll-cap pair. */
  wide: "max-w-2xl max-h-[90vh] overflow-y-auto",
} as const;

/** The stock `bg-black/80` fade — NO backdrop blur. */
export const DIALOG_OVERLAY =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/** DialogHeader centers below sm. */
export const DIALOG_HEADER = "flex flex-col space-y-1.5 text-center sm:text-left";

/** The max-w-lg dialogs' stock footer. */
export const DIALOG_FOOTER = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

/** The max-w-2xl family's footer — row at ALL widths, 12px gap. */
export const DIALOG_FOOTER_WIDE = "flex justify-end gap-3 pt-4";

/** The close X — the stock opacity pattern. */
export const DIALOG_CLOSE =
  "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground";

// ---------------------------------------------------------------------------
// Not-found surface (carried over verbatim — consumed by not-found-body)
// ---------------------------------------------------------------------------

export const NOT_FOUND_LAYOUT = {
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-300",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800",
  p: "text-slate-600 leading-relaxed",
  pathSpan: "font-medium text-slate-700",
  buttonGroup: "pt-6",
  homeButton:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
  homeIcon: "h-4 w-4 mr-2",
  homeHref: "/",
} as const;

export const TABS_PILL = {
  track: "items-center justify-center rounded-lg p-1 text-muted-ink grid w-full grid-cols-2 lg:grid-cols-5 h-auto bg-white border border-line",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow text-xs sm:text-sm data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700",
} as const;

export const TABS_SEGMENTED = {
  // Session-194: the reference's restyled segmented family — bg-muted /
  // text-muted-foreground (the stock token names) + the trigger's
  // ring-offset-background arm and data-[state=active]:bg-background
  // active fill (byte-extracted from its dialog + spend-summary tabs).
  // The base carries no display arm: the dialog form appends grid +
  // w-full + grid-cols-N; the dashboard's inline form appends
  // inline-flex (both byte-extracted from the live reference).
  track: "h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
} as const;

// ---------------------------------------------------------------------------
// Login surface (carried over verbatim — consumed by login-card.tsx)
// ---------------------------------------------------------------------------

export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4",
  card: "relative overflow-hidden rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm",
  accent: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6 sm:space-y-8",
  logoWrap: "relative group",
  logoGlow:
    "absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40",
  logo: "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight",
  subtitle: "text-slate-500 text-sm sm:text-base font-medium",
  google:
    "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-medium text-slate-700 text-[16px] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm",
  googleIcon: "-ml-4 transition-transform duration-200",
  divider: "relative my-6",
  dividerLine: "shrink-0 h-[1px] w-full bg-slate-200",
  dividerLabel: "relative flex justify-center text-xs uppercase",
  dividerLabelSpan: "bg-white px-3 font-medium tracking-wider text-slate-500",
  form: "w-full space-y-4 sm:space-y-5",
  fields: "space-y-3 sm:space-y-4",
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500",
  input:
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 placeholder:text-slate-600 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-base md:text-sm sm:h-12",
  submit:
    "flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 text-sm sm:h-12",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink: "text-sm text-slate-500 transition-colors hover:text-slate-700",
  footerLinkStrong: "font-medium text-slate-700",
} as const;

// ---------------------------------------------------------------------------
// Budget Wise app chrome (byte-extracted from the reference's live DOM)
// ---------------------------------------------------------------------------

/** The reference's sticky top navbar. Backdrop-blur rides BOTH the
 *  bare bg-white AND the /80 wash (its own double-class quirk, mirrored
 *  verbatim). */
export const SITE_NAV = {
  nav: "sticky top-0 z-50 bg-white border-b border-slate-200 backdrop-blur-sm bg-white/80",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  row: "flex items-center justify-between h-16",
  logoLink: "flex items-center gap-3",
  logoTile: "p-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700",
  logoIcon: "w-5 h-5 text-white",
  wordmark: "text-xl font-bold text-slate-900 tracking-tight",
  desktopLinks: "hidden md:flex items-center gap-1",
  link: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-slate-100",
  linkActive:
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-900 text-white",
  linkIcon: "w-4 h-4",
} as const;

// ---------------------------------------------------------------------------
// Session-193: the reference REDESIGNED its phone navigation — a fixed
// bottom tab bar replaced the nothing-at-all we had superseded with a
// drawer. Byte-extracted from the reference's live DOM 2026-10-27 at
// 390×844. The MOBILE_NAV_SHEET / MOBILE_NAV_LAYOUT / SITE_NAV.hamburger
// records (the drawer family) were retired with the redesign: a
// hamburger trigger is a visible pixel the reference's navbar no longer
// carries, and a drawer is an overlay where the reference ships a bar.
// The bar is NOT an overlay — no scroll lock, no focus trap, no
// matchMedia auto-close; it is plain fixed chrome below md.
// ---------------------------------------------------------------------------
export const BOTTOM_NAV = {
  bar: "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-pb",
  row: "flex items-center justify-around py-2",
  item: "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
  itemActive: "text-slate-900",
  itemInactive: "text-slate-400",
  icon: "w-6 h-6",
  // Session-194: the reference's ACTIVE item carries the ink on its SVG
  // too (`lucide lucide-layout-dashboard w-6 h-6 text-slate-900` — the
  // inactive svgs carry no ink class). The color resolves identically
  // through currentColor either way; mirroring the class keeps the
  // string byte-equal to the reference's live DOM.
  iconActive: "text-slate-900",
  label: "text-xs font-medium",
} as const;

/** The window-scrolls model: the reference scrolls at the body level
 *  with a sticky navbar (no shell overflow gymnastics).
 *
 *  Session-194: `main` carries the reference's bar-clearing padding —
 *  its own shell <main> is `pb-20 md:pb-0` on every app page
 *  (live-extracted 2026-10-27): 80px of bottom padding below md so
 *  scrolled-to-end content clears the 77px fixed bottom bar, zero at
 *  md+ where the bar is hidden. Without it, content boxes sit BEHIND
 *  the bar at phone-axis scroll-end (measured +20px behind on
 *  dashboard/profile) — the s193 round mirrored the bar itself but
 *  not its clearance padding. */
export const SHELL_LAYOUT = {
  root: "min-h-screen bg-slate-50",
  main: "pb-20 md:pb-0",
} as const;

/** Page content containers — Session-194: the reference's restyled
 *  pages carry PER-PAGE widths (live-censused 2026-10-27): the
 *  dashboard keeps the wide 7xl + lg:px-8; transactions + budgets ride
 *  5xl; profile 4xl. The narrow forms drop the lg:px-8 arm. */
export const PAGE_ROOT = {
  wide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
  content: "max-w-5xl mx-auto px-4 sm:px-6 py-8",
  narrow: "max-w-4xl mx-auto px-4 sm:px-6 py-8",
} as const;

// APP_FOOTER was retired at session-193: the reference's app surface
// ships NO footer (live-verified 2026-10-27 on every app page, both
// axes — its body ends with the page content). The LANDING keeps its
// own footer (src/app/page.tsx — our public-site IA, the documented
// landing superset).

/** Page-header family — Session-194: the reference's restyled header —
 *  a plain DIV (not a semantic <header>) that stacks below **sm**
 *  (title above, actions below), tracking-tight H1, mt-1 subtitle.
 *  Single action buttons sit DIRECTLY in the row (full-width below
 *  sm); the dashboard's dual actions nest in the gap-3 row. */
export const PAGE_HEADER = {
  root: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8",
  title: "text-3xl font-bold text-slate-900 tracking-tight",
  subtitle: "text-slate-500 mt-1",
  actions: "flex gap-3",
} as const;

/** KPI stat card — Session-194: the reference's restyled family —
 *  rounded-xl border-0 shadow-sm cards with hover:shadow-md + the
 *  gradient income/expenses variants, tracking-wide uppercase labels,
 *  tracking-tight 3xl values, and p-3 rounded-2xl bg-slate-50 icon
 *  chips with w-6 h-6 text-slate-600 icons (the round w-9 chips
 *  retired). */
export const KPI_CARD = {
  root: "rounded-xl text-card-foreground p-6 bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300",
  rootIncome:
    "rounded-xl text-card-foreground p-6 border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-emerald-50 to-white",
  rootExpenses:
    "rounded-xl text-card-foreground p-6 border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-rose-50 to-white",
  topRow: "flex items-start justify-between",
  inner: "space-y-2",
  label: "text-sm font-medium text-slate-500 tracking-wide uppercase",
  chip: "p-3 rounded-2xl bg-slate-50",
  chipIcon: "w-6 h-6 text-slate-600",
  value: "text-3xl font-bold text-slate-900 tracking-tight",
  badge: "inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold text-emerald-700",
  hint: "text-sm text-slate-500",
} as const;

/** The panel family — Session-194: the stock shadcn Card anatomy
 *  (rounded-xl bg-card border-0 shadow-sm + the p-6 pb-2 header + the
 *  p-6 pt-0 content + the tracking-tight text-lg semibold DIV title —
 *  no H3, no per-panel colSpan arms; the dashboard grid carries the
 *  spans). */
export const PANEL = {
  root: "rounded-xl bg-card text-card-foreground border-0 shadow-sm",
  header: "flex flex-col space-y-1.5 p-6 pb-2",
  title: "tracking-tight text-lg font-semibold text-slate-900",
  content: "p-6 pt-0",
  empty: "text-slate-400",
} as const;

/** The reference's restyled header buttons — the stock shadcn forms
 *  (byte-extracted 2026-10-27): the dark `bg-slate-900 hover:bg-slate-800`
 *  primary and the `border-slate-200` outline, both h-9 px-4 py-2 with
 *  the full focus-ring/svg arms; icons w-4 h-4 mr-2. */
export const HEADER_BUTTONS = {
  outline:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-slate-200",
  dark:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow h-9 px-4 py-2 bg-slate-900 hover:bg-slate-800",
  icon: "w-4 h-4 mr-2",
} as const;

/** Session-194: the transactions summary pair — the p-4 gradient
 *  cards (emerald income / rose expenses) with their tinted labels
 *  and 2xl values. */
export const SUMMARY_CARD = {
  grid: "grid grid-cols-2 gap-4 mb-6",
  rootIncome:
    "rounded-xl text-card-foreground p-4 border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-white",
  rootExpenses:
    "rounded-xl text-card-foreground p-4 border-0 shadow-sm bg-gradient-to-br from-rose-50 to-white",
  labelIncome: "text-sm text-emerald-600 font-medium",
  labelExpenses: "text-sm text-rose-600 font-medium",
  valueIncome: "text-2xl font-bold text-emerald-700",
  valueExpenses: "text-2xl font-bold text-rose-700",
} as const;

/** Session-194: the transactions list — the one card + divide-y rows
 *  (p-4 hover wash, the p-2.5 rounded-xl category chips, the shadcn
 *  Badge category pill, the text-lg amounts, the ghost icon delete). */
export const TXN_LIST = {
  card: "rounded-xl bg-card text-card-foreground border-0 shadow-sm overflow-hidden",
  rows: "divide-y divide-slate-100",
  row: "flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors",
  chip: "p-2.5 rounded-xl",
  body: "flex-1 min-w-0",
  titleRow: "flex items-center gap-2",
  title: "font-medium text-slate-900 truncate",
  badge:
    "inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground text-xs",
  sub: "text-sm text-slate-500",
  amount: "font-semibold text-lg",
  delete:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 w-9 text-slate-400 hover:text-rose-600",
} as const;

/** Session-194: the budgets dark overall-usage card — the gradient
 *  slate-900→800 rounded-xl with the 4xl value, NO percent label, the
 *  emerald gradient progress fill, and the flex-gap-6 KPI trio. */
export const DARK_CARD = {
  root: "rounded-xl p-6 border-0 shadow-sm mb-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white",
  inner: "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
  left: "space-y-2",
  label: "text-slate-300 text-sm font-medium",
  value: "text-4xl font-bold",
  total: "text-slate-400",
  track:
    "relative w-full overflow-hidden rounded-full h-2 bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-emerald-500",
  fill: "h-full transition-all",
  trio: "flex gap-6",
  trioCell: "text-center",
  trioValue: "text-3xl font-bold",
  trioLabel: "text-slate-400 text-sm",
} as const;

/** Session-194: the budgets empty state — the bg-card p-12 centered
 *  panel with the BARE w-12 h-12 slate-300 icon (no tinted container). */
export const EMPTY_STATE = {
  root: "rounded-xl bg-card text-card-foreground p-12 border-0 shadow-sm text-center",
  icon: "w-12 h-12 text-slate-300 mx-auto mb-4",
  title: "text-lg font-semibold text-slate-900 mb-2",
  sub: "text-slate-500 mb-6",
} as const;

/** Session-194: the reference's restyled recent-transaction rows (the
 *  dashboard's list) — p-3 rounded-xl hover rows + p-2.5 chips. */
export const RECENT_ROW = {
  row: "flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors",
  chip: "p-2.5 rounded-xl",
  body: "flex-1 min-w-0",
  title: "font-medium text-slate-900 truncate",
  sub: "text-sm text-slate-500",
  amount: "font-semibold",
} as const;

/** Session-194: the per-budget cards — the overflow-hidden card with
 *  the h-2 gradient top strip + the p-5 body (byte-extracted from the
 *  reference's populated state). */
export const BUDGET_CARD = {
  root: "rounded-xl bg-card text-card-foreground border-0 shadow-sm overflow-hidden",
  strip: "h-2 bg-gradient-to-r from-emerald-500 to-emerald-600",
  stripAmber: "h-2 bg-gradient-to-r from-amber-400 to-amber-500",
  stripRose: "h-2 bg-gradient-to-r from-rose-500 to-rose-600",
  body: "p-5",
  topRow: "flex items-start justify-between mb-4",
  title: "font-semibold text-slate-900",
  spent: "text-sm text-slate-500 mt-1",
  actions: "flex items-center gap-2",
  badge:
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow",
  badgeOver: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  badgeWarn: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  badgeOk: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  badgeIcon: "w-3 h-3 mr-1",
  delete:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 w-9 text-slate-400 hover:text-rose-600",
  track:
    "relative w-full overflow-hidden rounded-full bg-primary/20 h-3 mb-3 [&>div]:bg-rose-500",
  trackWarn:
    "relative w-full overflow-hidden rounded-full bg-primary/20 h-3 mb-3 [&>div]:bg-amber-500",
  trackOk:
    "relative w-full overflow-hidden rounded-full bg-primary/20 h-3 mb-3 [&>div]:bg-emerald-500",
  fill: "h-full transition-all",
  remainingOver: "text-sm font-medium text-rose-600",
  remaining: "text-sm text-slate-500",
} as const;

export type PageRootKind = keyof typeof PAGE_ROOT;

/** React anchor props helper (kept for typing the footer links). */
export type FooterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
