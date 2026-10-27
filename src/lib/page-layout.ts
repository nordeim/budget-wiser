/**
 * Budget Wise layout-system contracts.
 *
 * The shell family (SITE_NAV / MOBILE_NAV_* / APP_FOOTER / PAGE_ROOT) is
 * extracted from the LIVE reference app's DOM (budget-wiser.base44.app,
 * agent-browser class-dump at 1512×945 + 390×844 on 2026-10-27 — the
 * byte-exact nav markup is preserved in docs/IMPLEMENTATION-PLAN.md §2).
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
  size: "text-base md:text-sm",
  bg: "bg-transparent",
  ink: "text-ink",
  placeholder: "placeholder:text-muted-ink",
  transition: "transition-colors",
  focusRing: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  file: "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
} as const;

export const SELECT_TRIGGER = {
  base: "flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
  placeholderState: "data-[placeholder]:text-muted-ink",
  focusRing: "focus:outline-none focus:ring-1 focus:ring-ring",
} as const;

export const CARD = {
  title: "font-semibold leading-none tracking-tight",
} as const;

export const DIALOG_TEXTAREA =
  "flex min-h-[60px] w-full rounded-md border border-line bg-transparent px-3 py-2 text-base md:text-sm text-ink shadow-sm transition-colors placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

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
  track: "h-9 items-center justify-center rounded-lg bg-line-soft p-1 text-muted-ink grid w-full",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow data-[state=active]:bg-white data-[state=active]:text-foreground",
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
  /** OUR superset trigger — the reference ships NO mobile navigation
   *  (its links are display:none below md). The hamburger fills that
   *  gap without touching any desktop pixel. */
  hamburger:
    "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
} as const;

/** The mobile Sheet drawer (our superset). Left-anchored Radix Dialog on
 *  the repo's vendored tw-animate.css data-[state] machinery — the same
 *  pattern the entity dialogs ride. Slate-900 brand surface. */
export const MOBILE_NAV_SHEET = {
  content:
    "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white shadow-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  close:
    "absolute right-4 top-4 rounded-sm text-white/70 opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:pointer-events-none",
  header: "px-6 pt-6 pb-2",
  title: "text-lg font-semibold text-white",
  titleText: "BudgetWise",
  description: "text-sm text-white/60",
  descriptionText: "Personal finance, simplified",
  nav: "px-3 py-2 space-y-1",
  navFooter: "px-3 py-2 mt-4 border-t border-white/10 space-y-1",
  link: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
  linkActive:
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-white/20 text-white",
  icon: "h-4 w-4",
} as const;

/** The auto-close media query — MUST match the hamburger's md:hidden
 *  range (768px) so a viewport growing past md always dismisses the
 *  drawer (and its scroll locks). */
export const MOBILE_NAV_LAYOUT = {
  autoCloseQuery: "(min-width: 768px)",
} as const;

/** The window-scrolls model: the reference scrolls at the body level
 *  with a sticky navbar (no shell overflow gymnastics). */
export const SHELL_LAYOUT = {
  root: "min-h-screen bg-slate-50",
  main: "",
} as const;

/** Page content container — the reference's pages ride the same
 *  max-w-7xl rhythm as the navbar container. */
export const PAGE_ROOT = {
  standard: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
} as const;

export const APP_FOOTER = {
  footer: "border-t border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500",
  inner: "max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2",
  copyright: "© 2026 BudgetWise",
  link: "hover:text-slate-800 transition-colors",
  about: { href: "/About", label: "About" },
  contact: { href: "/Contact", label: "Contact" },
} as const;

/** Page-header family — the reference's H1 + subtitle + action buttons. */
export const PAGE_HEADER = {
  root: "flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4",
  title: "text-3xl font-bold text-slate-900",
  subtitle: "text-slate-500 text-base",
  actions: "flex items-center gap-3",
} as const;

/** KPI stat card — the reference's four dashboard cards. */
export const KPI_CARD = {
  root: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md",
  rootIncome: "bg-emerald-50/40 p-6 rounded-2xl shadow-sm border border-emerald-100/50 transition-shadow hover:shadow-md",
  rootExpenses: "bg-red-50/40 p-6 rounded-2xl shadow-sm border border-red-100/50 transition-shadow hover:shadow-md",
  topRow: "flex items-start justify-between mb-3",
  label: "text-xs font-semibold uppercase tracking-wide text-slate-500",
  chip: "w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500",
  chipIncome: "w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm",
  value: "text-3xl font-bold text-slate-900",
  badge: "inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold text-emerald-700",
  hint: "text-sm text-slate-500 mt-1",
} as const;

/** The white panel family (donut / budget progress / spend summary /
 *  recent transactions cards). */
export const PANEL = {
  root: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100",
  title: "text-lg font-bold text-slate-900 mb-6",
  colSpan4: "lg:col-span-4",
  colSpan7: "lg:col-span-7",
  colSpan5: "lg:col-span-5",
  empty: "text-slate-500 text-center",
} as const;

/** The reference's iconless row buttons in headers. */
export const HEADER_BUTTONS = {
  outline:
    "px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  dark:
    "px-5 py-2.5 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md shadow-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
} as const;

export type PageRootKind = keyof typeof PAGE_ROOT;

/** React anchor props helper (kept for typing the footer links). */
export type FooterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
