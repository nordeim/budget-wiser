"use client";

// Session-142 (D-142a1): the LANDING PAGE — the reference's new public
// marketing surface (its index-Dc6wvGtA.js bundle, probe:ref #114's parity
// EVENT). Every construction below is the live-censused reference DOM
// (classes, copy, geometry), with exactly three deliberate deviations:
//
//  1. `truncate` replaces the reference's broken `rounded-truncate` class
//     on the mock sidebar items (a typo class that compiles to NOTHING in
//     the reference's build — computed-equal, the s11 re-derivation
//     doctrine: never copy a class string that renders differently than
//     it reads).
//  2. The FAQ toggle carries `aria-expanded` + `aria-controls` — the
//     reference ships neither (its accordions are stateless buttons to
//     assistive tech). The drawer precedent: invisible a11y supersets are
//     documented, never at the cost of the visible construction.
//  3. The mobile disclosure menu CLOSES on section-link click (verified
//     live on the reference — its panel unmounts after an in-panel anchor
//     click — so this is NOT a deviation, just noted: the close rides the
//     same toggle state, no route/hash listener needed).
//
// The page is PUBLIC (outside the (app) group — no session guard, no
// getSessionUser import; auth state does not change a single class).
// The metadata rides the ROOT layout's object (title "NEO CRM", the
// 405-char description — byte-identical to the reference's landing head
// — the bare-origin canonical, the OG/Twitter family with og-image.png,
// the PWA metas).
//
// Tailwind v4 discipline: standard palette classes only (text-gray-*,
// bg-gray-*, border-gray-*) + the new literal-hex `--color-brand` token
// (v4 color-mix powers every /alpha modifier). No `hidden` attribute
// fighting display utilities — the mobile panel MOUNTS/UNMOUNTS exactly
// like the reference's (its div count delta, live-measured).

import * as React from "react";
import {
  ArrowRight,
  CalendarCheck,
  ChartColumn,
  Check,
  ChevronDown,
  Database,
  Menu,
  SlidersHorizontal,
  Target,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// The landing content (verbatim from the reference's live DOM)
// ---------------------------------------------------------------------------

const NAV_SECTION_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

const FEATURES = [
  {
    icon: Users,
    title: "Accounts and contacts",
    body: "One record per company and every person inside it, with roles, priorities, company size and engagement levels.",
  },
  {
    icon: Target,
    title: "Leads and pipeline",
    body: "Capture leads, move them through your own stages, and keep the next follow-up date, value and owner in view.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar and activities",
    body: "Log calls, emails, meetings, notes and WhatsApp against a record. Overdue follow-ups float to the top of the list.",
  },
  {
    icon: ChartColumn,
    title: "Reports built from real records",
    body: "Sales overview, pipeline forecast, activity productivity, lead sources and account health — no figures invented in the background.",
  },
  {
    icon: SlidersHorizontal,
    title: "Your own lists",
    body: "Define contact sources, lead stages, activity types, account tiers and industries in Settings, and pick your default values.",
  },
  {
    icon: Database,
    title: "Data you can get out",
    body: "CSV templates, guided import, one-click exports and a guarded reset — your records are never locked inside the app.",
  },
] as const;

const PREVIEW_ROWS = [
  {
    title: "NEO CRM · Dashboard",
    active: "Dashboard",
    heading: "Dashboard",
    body: "Pipeline value, deals closed, revenue this month and the activity that needs attention today.",
  },
  {
    title: "NEO CRM · Accounts",
    active: "Accounts",
    heading: "Accounts",
    body: "Filter by owner, industry, revenue range and tier, then export exactly what you are looking at.",
  },
  {
    title: "NEO CRM · Reports",
    active: "Reports",
    heading: "Reports",
    body: "Five report tabs computed from your own records, with date, owner and source filters across all of them.",
  },
] as const;

const PRICING = [
  {
    name: "Standard",
    sub: "The core CRM",
    price: "$8",
    popular: false,
    features: [
      "Dashboard and accounts",
      "Contacts with roles and priorities",
      "Leads, calendar and activities",
      "Sales overview report",
      "CSV import and export",
    ],
    cta: "Start with Standard",
  },
  {
    name: "Pro",
    sub: "Adds pipeline intelligence",
    price: "$14",
    popular: true,
    features: [
      "Everything in Standard",
      "Pipeline and forecast report",
      "Activity and productivity report",
      "Lead sources report",
      "Saved reports and richer exports",
    ],
    cta: "Start with Pro",
  },
  {
    name: "Advanced",
    sub: "Adds account health and control",
    price: "$20",
    popular: false,
    features: [
      "Everything in Pro",
      "Account health report",
      "Configurable sources, stages, types and tiers",
      "Default values and preferences",
      // s149 (F-149c2, walk39): the reference's Advanced card grew a
      // SIXTH feature row — the literal verbatim from the live DOM.
      "Data tools, templates and guarded reset",
    ],
    cta: "Start with Advanced",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Do I need to install anything?",
    a: "No. NEO CRM is a web app — sign in from any modern browser on a laptop, tablet or phone and your workspace is there.",
  },
  {
    q: "Is my data separate from other customers?",
    a: "Yes. Your accounts, contacts, leads, activities and calendar events are private to your own account, and so are your configuration lists and default values.",
  },
  {
    q: "Can I bring my existing contacts across?",
    a: "Yes. Download a CSV template from Settings, fill it in, and import your contacts, accounts or leads in one go.",
  },
  {
    q: "Can I change the stages, sources and industries?",
    a: "Yes. Settings → CRM Configuration lets you define your own contact sources, lead stages, activity types, account tiers and industries, plus default values for new records.",
  },
  {
    q: "What happens to my data if I stop paying?",
    a: "Pricing is informational for now and nothing is charged, so nothing is at risk today. You can export your data to CSV at any time from Settings.",
  },
  {
    q: "Which tier do I need?",
    a: "Standard covers the day-to-day CRM. Pro adds the pipeline forecast, activity productivity and lead source reports. Advanced adds account health, configurable lists and the data tools.",
  },
] as const;

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "/About" },
  { label: "Contact", href: "/Contact" },
  { label: "Open dashboard", href: "/Dashboard" },
] as const;

// ---------------------------------------------------------------------------
// The mock dashboard card (the hero + preview sections' CSS-built mock —
// the reference renders the SAME construction ×4, only the chrome title
// and the active sidebar item vary)
// ---------------------------------------------------------------------------

const MOCK_SIDEBAR_ITEMS = [
  "Dashboard",
  "Accounts",
  "Contacts",
  "Leads",
  "Calendar",
  "Activities",
  "Reports",
] as const;

const MOCK_KPIS = [
  { label: "Accounts", value: "128" },
  { label: "Contacts", value: "342" },
  { label: "Open deals", value: "46" },
  { label: "Won this month", value: "12" },
] as const;

const MOCK_BARS = [72, 54, 40, 26, 15] as const;

// Session-148 (F-147c3, walk38d/f byte-decoded): the reference
// content-varied its three preview mocks — the Accounts window renders a
// 4-row micro table, the Reports window renders "Revenue by month" with
// SEVEN bars. The literals verbatim from the live DOM.
const MOCK_ACCOUNT_ROWS = [
  { name: "Northwind Trading", industry: "Wholesale", revenue: "$1.2M" },
  { name: "Vertex Group", industry: "Software", revenue: "$3.4M" },
  { name: "Bluepeak Health", industry: "Healthcare", revenue: "$780k" },
  { name: "Harbour & Co", industry: "Logistics", revenue: "$450k" },
] as const;

const MOCK_REPORT_BARS = [42, 64, 50, 82, 60, 94, 71] as const;

function MockDashboard({ title, active }: { title: string; active: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
      {/* the browser-chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-500 truncate">{title}</span>
      </div>
      <div className="flex">
        {/* the mini app sidebar */}
        <div className="hidden sm:block w-28 lg:w-36 bg-brand text-white p-2 lg:p-3 space-y-1 shrink-0">
          {MOCK_SIDEBAR_ITEMS.map((item) => (
            <div
              key={item}
              className={cn(
                "text-[9px] lg:text-[11px] px-2 py-1 truncate transition-colors",
                item === active ? "bg-white/20 font-semibold" : "text-white/75",
              )}
            >
              {item}
            </div>
          ))}
        </div>
        {/* the mock main: the 4 KPI cells + the per-mock body (the
            F-147c3 content-varied family — walk38d/f) */}
        <div className="flex-1 p-3 lg:p-4 bg-gray-50 space-y-3 min-w-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {MOCK_KPIS.map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-lg border border-gray-200 p-2 min-w-0">
                <div className="text-[8px] lg:text-[9px] uppercase tracking-wide text-gray-400 truncate">
                  {kpi.label}
                </div>
                <div className="text-sm lg:text-base font-bold text-gray-900">{kpi.value}</div>
              </div>
            ))}
          </div>
          {active === "Accounts" ? (
            /* the Accounts window's 4-row micro table (byte-decoded:
               overflow-hidden card, the gray-50 header row, the
               font-medium/truncate/tabular-nums cells) */
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-3 gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-[9px] font-semibold text-gray-500">
                <span>Account</span>
                <span>Industry</span>
                <span className="text-right">Revenue</span>
              </div>
              {MOCK_ACCOUNT_ROWS.map((row) => (
                <div key={row.name} className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-gray-100 last:border-0 text-[9px] lg:text-[11px] text-gray-700">
                  <span className="font-medium truncate">{row.name}</span>
                  <span className="truncate text-gray-500">{row.industry}</span>
                  <span className="text-right tabular-nums">{row.revenue}</span>
                </div>
              ))}
            </div>
          ) : active === "Reports" ? (
            /* the Reports window's "Revenue by month" 7-bar card */
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="text-[9px] lg:text-[11px] font-medium text-gray-500 mb-2">
                Revenue by month
              </div>
              <div className="flex items-end gap-1.5 lg:gap-2 h-16 lg:h-24">
                {MOCK_REPORT_BARS.map((height) => (
                  <div key={height} className="flex-1 bg-brand/80 rounded-t" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          ) : (
            /* the Dashboard window's 5-bar pipeline (byte-equal, the
               unchanged member of the family) */
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="text-[9px] lg:text-[11px] font-medium text-gray-500 mb-2">
                Sales pipeline by stage
              </div>
              <div className="flex items-end gap-1.5 lg:gap-2 h-16 lg:h-24">
                {MOCK_BARS.map((height) => (
                  <div key={height} className="flex-1 bg-brand/80 rounded-t" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The header (sticky, the desktop nav + the mobile disclosure menu)
// ---------------------------------------------------------------------------

function LandingHeader() {
  // The mobile disclosure menu — the reference's construction (the
  // menu↔x icon swap + the in-flow border-t panel that MOUNTS/UNMOUNTS;
  // verified live: an in-panel section-link click closes it).
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-white" />
          </span>
          <span className="text-lg font-bold text-gray-900 tracking-tight">NEO CRM</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/Contact"
            className="text-sm font-medium text-gray-600 hover:text-brand transition-colors"
          >
            Contact
          </a>
          {/* the reference's stock button base on a raw anchor: bg-brand,
              text-white, the /90-alpha hover (the M-80c1 genus) */}
          <a
            href="/Dashboard"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 bg-brand hover:bg-brand/90 text-white"
          >
            Open dashboard
          </a>
        </div>
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="md:hidden text-gray-700 p-1"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          {NAV_SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-gray-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Contact"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-gray-700"
          >
            Contact
          </a>
          <a
            href="/Dashboard"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 w-full bg-brand hover:bg-brand/90 text-white"
          >
            Open dashboard
          </a>
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// The sections
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            Customer relationship management, simplified
          </span>
          {/* Session-148 (F-147c3): the ≥sm line-heights pin the
              reference's COMPUTED values — its leading utilities are
              inert at ≥sm in its build (the h1 renders the text-6xl
              pairing 60/60, the p the text-lg pairing 18/28; walk38h
              measured both apps at 390/700/768/1440). Phone stays the
              working 1.08/relaxed (identical on both apps). */}
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.08] sm:leading-none">
            Every account, contact and deal in one calm workspace
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed sm:leading-[28px] max-w-2xl">
            NEO CRM keeps your pipeline, your follow-ups and your reporting in a single fast
            workspace — built for people who sell on their own or in a small team, without the
            enterprise bloat.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/Dashboard"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-10 rounded-md px-8 bg-brand hover:bg-brand/90 text-white"
            >
              Open the dashboard
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-line bg-surface text-foreground shadow-sm hover:bg-line-soft hover:text-neutral-900 h-10 px-8"
            >
              See pricing
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {["Runs in the browser", "Private to your account", "CSV import & export"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 sm:mt-16">
          <MockDashboard title="NEO CRM · Dashboard" active="Dashboard" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            The essentials, done properly
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            No modules to license, no setup project. Everything below is already in the app.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="w-11 h-11 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                <feature.icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Preview() {
  return (
    <section id="preview" className="py-16 sm:py-24 bg-gray-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            See the app itself
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            These are the real screens you work in every day — not a slide from a sales deck.
          </p>
        </div>
        <div className="mt-12 space-y-12 sm:space-y-16">
          {PREVIEW_ROWS.map((row, i) => (
            /* Session-148 (F-147c3): the MIDDLE row flips at lg — the
               reference's own `lg:[&>*:first-child]:order-2` (walk38e:
               mock RIGHT + text LEFT on the Accounts row only). */
            <div
              key={row.title}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center",
                i === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="lg:col-span-3">
                <MockDashboard title={row.title} active={row.active} />
              </div>
              <div className="lg:col-span-2">
                {/* s149 (F-149c3, walk39): the sm:leading-6 pins the */}
                {/* reference's >=sm COMPUTED 24px (its leading utilities */}
                {/* are inert at >=sm — the s148 hero-genus family); phone */}
                {/* keeps the working leading-relaxed on both apps. */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{row.heading}</h3>
                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-6">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Simple monthly pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            One price per workspace, every feature of your tier included. Change tier whenever you
            need to.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-2xl border p-6 sm:p-8 flex flex-col h-full",
                tier.popular ? "border-brand shadow-lg ring-1 ring-brand/20" : "border-gray-200",
              )}
            >
              {tier.popular && (
                <span className="self-start mb-3 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs font-semibold">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{tier.sub}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-sm text-gray-500">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/Dashboard"
                className={cn(
                  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 mt-8 w-full",
                  tier.popular
                    ? "shadow h-9 px-4 py-2 bg-brand hover:bg-brand/90 text-white"
                    : "border border-line bg-surface text-foreground shadow-sm hover:bg-line-soft hover:text-neutral-900 h-9 px-4 py-2",
                )}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Prices are shown for reference while billing is being set up — plans are not charged
          yet, and the app is free to use in the meantime.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  // The reference's accordion is SINGLE-OPEN (live-verified: opening an
  // item closes the previously open one; Q1 ships open by default). The
  // answer <p> mounts/unmounts with the open item; the chevron gains
  // rotate-180.
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    // Session-143 (D-143a1/F-143c2): the FAQ is the ONLY narrow landing
    // section — the reference's container is max-w-3xl (768px) with the h2
    // a DIRECT child (720px, no inner wrapper; walk33-censused). Every
    // other section keeps the max-w-6xl container + the max-w-2xl h2
    // wrapper; the s142 build wrongly rode that wide pattern here too —
    // the 1102px column vs the reference's 718px (the open-answer wrap
    // 43px vs 66px; below the sweep's fold, caught by the DOM walk).
    <section id="faq" className="py-16 sm:py-24 bg-gray-50 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Questions, answered
        </h2>
        <div className="mt-10 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {FAQ_ITEMS.map((item, index) => {
            const open = index === openIndex;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span className="text-sm sm:text-base font-medium text-gray-900">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 shrink-0 text-gray-400 transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </button>
                {open && (
                  <p
                    id={`faq-answer-${index}`}
                    className="px-5 pb-5 -mt-1 text-sm text-gray-600 leading-relaxed"
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-white" />
              </span>
              <span className="text-lg font-bold text-gray-900 tracking-tight">NEO CRM</span>
            </div>
            <p className="mt-3 text-sm text-gray-500 max-w-sm">
              A personal customer relationship workspace: accounts, contacts, leads, calendar and
              reporting in one place.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">© 2026 NEO CRM</p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <Hero />
        <Features />
        <Preview />
        <Pricing />
        <Faq />
      </main>
      <LandingFooter />
    </div>
  );
}
