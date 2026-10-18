import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-142 (D-142a1/D-142a5): the LANDING PAGE parity pins — the
// reference's new public marketing surface (its index-Dc6wvGtA.js bundle,
// probe:ref #114's parity event), censused live at 1440x900 + 390x844
// (every class string, every copy string, the DOM constructions, the
// interactions: the single-open FAQ, the mobile disclosure menu, the
// menu-close-on-link-click). These pins freeze that construction so a
// future drift REDs here exactly (the freeze-pin pattern; the
// mutation-proof ran at birth: each construction drift → exactly its pin
// RED alone).
//
// The three documented deviations from the reference's DOM (each pinned
// in its own block below):
//   1. `truncate` (not the reference's broken `rounded-truncate`)
//   2. the FAQ toggle's aria-expanded + aria-controls (the a11y superset)
//   3. the landing is server-rendered under OUR router while the
//      reference's is a client SPA — irrelevant to the DOM census.

const LANDING_PAGE = "src/components/landing/landing-page.tsx";
const ROOT_PAGE = "src/app/page.tsx";

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// Source pins read RULES, not documentation: strip comments first (the
// s21/s22 own-doc-comment hazard).
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const landing = () => stripComments(read(LANDING_PAGE) ?? "");
const rootPage = () => stripComments(read(ROOT_PAGE) ?? "");

/** collapse ALL whitespace to single spaces — the long JSX copy strings
 * ride multi-line children in the source; the pin reads them flat. */
const flat = (s: string) => s.replace(/\s+/g, " ");

describe("session-142: the landing page exists + is PUBLIC (D-142a0/a1)", () => {
  it("the root page renders the landing component with NO auth guard + NO own metadata", () => {
    const src = rootPage();
    expect(src, "src/app/page.tsx must exist (the landing route)").not.toBeNull();
    expect(src).toMatch(/import \{ LandingPage \} from "@\/components\/landing\/landing-page"/);
    expect(src).toMatch(/return <LandingPage \/>/);
    // PUBLIC: no session resolution, no (app)-group import, no redirect.
    expect(src).not.toMatch(/getSessionUser/);
    expect(src).not.toMatch(/redirect\(/);
    // The metadata rides the ROOT layout's object (title "NEO CRM", the
    // 405-char description, the bare-origin canonical, OG/Twitter family
    // — byte-equal to the reference's landing head; a page export would
    // only re-declare the same values).
    expect(src).not.toMatch(/export const metadata/);
    expect(src).not.toMatch(/pageMetadata/);
  });

  it("the dashboard moved: (app)/dashboard/page.tsx exists, (app)/page.tsx is GONE", () => {
    expect(read("src/app/(app)/dashboard/page.tsx"), "the dashboard's new home").not.toBeNull();
    expect(read("src/app/(app)/page.tsx"), "the old root dashboard").toBeNull();
  });

  it("the landing component is a client component (the FAQ + menu state) under components/landing/", () => {
    const src = read(LANDING_PAGE);
    expect(src, "the landing component").not.toBeNull();
    expect(src).toMatch(/^"use client"/m);
  });
});

describe("session-142: the landing header construction (the censused classes)", () => {
  it("the sticky header + the max-w-6xl h-16 nav + the brand mark", () => {
    const src = landing();
    expect(src).toContain('className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200"');
    expect(src).toContain('className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"');
    // the brand: the bg-brand circle with the white inner dot
    expect(src).toContain('className="w-8 h-8 rounded-full bg-brand flex items-center justify-center"');
    expect(src).toContain('className="w-3.5 h-3.5 rounded-full bg-white"');
    expect(src).toContain('className="text-lg font-bold text-gray-900 tracking-tight"');
  });

  it("the desktop nav links (the 4 section anchors + Contact) + the Open dashboard CTA", () => {
    const src = landing();
    // the section links ride the NAV_SECTION_LINKS data (href values)
    for (const href of ["#features", "#preview", "#pricing", "#faq"]) {
      expect(src).toContain(`href: "${href}"`);
    }
    expect(src).toContain('href="/Contact"');
    // the CTA: the reference's exact construction — the stock button base
    // on a raw anchor, bg-brand + the /90-alpha hover + text-white.
    // The 4 occurrence sites: the header CTA + the mobile-panel CTA +
    // the hero CTA + the pricing Pro CTA (a count pin so a single-site
    // drift still REDs — the mutation-proof).
    expect(src).toMatch(/href="\/Dashboard"[\s\S]{0,400}bg-brand hover:bg-brand\/90 text-white/);
    expect((src.match(/bg-brand hover:bg-brand\/90 text-white/g) ?? []).length).toBe(4);
    expect(src).toContain("Open dashboard");
    // the section-link classes
    expect(src).toContain('className="text-sm font-medium text-gray-600 hover:text-brand transition-colors"');
  });

  it("the mobile disclosure menu: the Toggle-navigation hamburger + the mount/unmount panel", () => {
    const src = landing();
    // the reference's exact trigger (its aria-label + classes)
    expect(src).toContain('aria-label="Toggle navigation"');
    expect(src).toContain('className="md:hidden text-gray-700 p-1"');
    // the menu↔x icon swap
    expect(src).toMatch(/\{menuOpen \? <X className="w-6 h-6" \/> : <Menu className="w-6 h-6" \/>\}/);
    // the panel: the reference's construction (in-flow, border-t,
    // bg-white, space-y-3) — MOUNTS/UNMOUNTS, never display-toggled
    expect(src).toMatch(/\{menuOpen && \(\s*<div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">/);
    // the panel's block links + the w-full CTA
    expect(src).toContain('className="block text-sm font-medium text-gray-700"');
    expect(src).toMatch(/className="[^"]*h-9 px-4 py-2 w-full bg-brand hover:bg-brand\/90 text-white/);
    // the close-on-link-click (live-verified on the reference: the panel
    // unmounts after an in-panel anchor click) — 3 SOURCE sites cover the
    // 6 RENDERED links (the section-links map + the Contact link + the
    // CTA)
    const panelLinkCount = src.match(/onClick=\{\(\) => setMenuOpen\(false\)\}/g)?.length ?? 0;
    expect(panelLinkCount).toBe(3);
  });
});

describe("session-142: the hero construction (the censused copy + classes)", () => {
  it("the gradient section + the badge + the h1 + the paragraph (verbatim)", () => {
    const src = flat(landing());
    expect(src).toContain('className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white"');
    expect(src).toContain('className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16"');
    expect(src).toContain("Customer relationship management, simplified");
    expect(src).toContain(
      'className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand"',
    );
    expect(src).toContain("Every account, contact and deal in one calm workspace");
    expect(src).toContain(
      'className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.08]"',
    );
    expect(src).toContain(
      "NEO CRM keeps your pipeline, your follow-ups and your reporting in a single fast workspace — built for people who sell on their own or in a small team, without the enterprise bloat.",
    );
    expect(src).toContain('className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl"');
  });

  it("the CTA pair: Open the dashboard (brand + arrow) + See pricing (outline, h-10 px-8)", () => {
    const src = flat(landing());
    expect(src).toMatch(/Open the dashboard[\s\S]{0,120}<ArrowRight className="w-4 h-4" \/>/);
    expect(src).toMatch(/className="[^"]*shadow h-10 rounded-md px-8 bg-brand hover:bg-brand\/90 text-white"/);
    expect(src).toMatch(/href="#pricing"[\s\S]{0,300}className="[^"]*border border-line bg-surface[^"]*h-10 px-8"/);
    expect(src).toContain("See pricing");
    expect(src).toContain('className="mt-8 flex flex-col sm:flex-row gap-3"');
  });

  it("the checklist items (the censused copy)", () => {
    const src = flat(landing());
    expect(src).toContain("Runs in the browser");
    expect(src).toContain("Private to your account");
    expect(src).toContain("CSV import & export");
  });

  it("the checklist construction", () => {
    const src = landing();
    expect(src).toContain('className="mt-6 flex flex-wrap gap-x-6 gap-y-2"');
    expect(src).toContain('className="flex items-center gap-2 text-sm text-gray-600"');
    expect(src).toContain('className="w-4 h-4 text-brand"');
  });
});

describe("session-142: the mock dashboard construction (the CSS-built preview)", () => {
  it("the chrome bar (the 3 traffic dots + the title) + the bg-brand mini sidebar", () => {
    const src = landing();
    expect(src).toContain('className="rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"');
    expect(src).toContain('className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200"');
    expect(src).toContain('className="w-2.5 h-2.5 rounded-full bg-red-400"');
    expect(src).toContain('className="w-2.5 h-2.5 rounded-full bg-amber-400"');
    expect(src).toContain('className="w-2.5 h-2.5 rounded-full bg-green-400"');
    expect(src).toContain('className="ml-2 text-[10px] text-gray-500 truncate"');
    expect(src).toContain('className="hidden sm:block w-28 lg:w-36 bg-brand text-white p-2 lg:p-3 space-y-1 shrink-0"');
    // the active/inactive items (bg-white/20 font-semibold vs text-white/75)
    expect(src).toMatch(/item === active \? "bg-white\/20 font-semibold" : "text-white\/75"/);
    // the 7 sidebar items
    for (const item of ["Dashboard", "Accounts", "Contacts", "Leads", "Calendar", "Activities", "Reports"]) {
      expect(src).toContain(`"${item}"`);
    }
  });

  it("the mock KPI grid + the 5-bar pipeline", () => {
    const src = landing();
    expect(src).toContain('className="flex items-end gap-1.5 lg:gap-2 h-16 lg:h-24"');
    expect(src).toMatch(/MOCK_BARS = \[72, 54, 40, 26, 15\]/);
    expect(src).toContain('className="flex-1 bg-brand/80 rounded-t"');
    // the DEVIATION pin: truncate (not the reference's broken rounded-truncate)
    expect(src).not.toContain("rounded-truncate");
  });

  it("the mock KPI grid (the 4 cells + the censused values)", () => {
    const src = landing();
    expect(src).toContain('className="grid grid-cols-2 lg:grid-cols-4 gap-2"');
    expect(src).toContain('className="text-[8px] lg:text-[9px] uppercase tracking-wide text-gray-400 truncate"');
    expect(src).toContain('className="text-sm lg:text-base font-bold text-gray-900"');
    // the KPI values (the reference's literal demo figures)
    expect(src).toContain('value: "128"');
    expect(src).toContain('value: "342"');
    expect(src).toContain('value: "46"');
    expect(src).toContain('value: "12"');
    expect(src).toContain("Sales pipeline by stage");
  });
});

describe("session-142: the features + preview sections", () => {
  it("the 6 feature cards: the icon wrap + the censused titles", () => {
    const src = landing();
    expect(src).toContain('className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"');
    expect(src).toContain('className="w-11 h-11 rounded-lg bg-brand/10 text-brand flex items-center justify-center"');
    for (const title of [
      "Accounts and contacts",
      "Leads and pipeline",
      "Calendar and activities",
      "Reports built from real records",
      "Your own lists",
      "Data you can get out",
    ]) {
      expect(src).toContain(`title: "${title}"`);
    }
    expect(src).toContain("The essentials, done properly");
    expect(src).toContain("No modules to license, no setup project. Everything below is already in the app.");
  });

  it("the preview sub + the section copy (flat-matched)", () => {
    const src = flat(landing());
    expect(src).toContain("These are the real screens you work in every day — not a slide from a sales deck.");
    expect(src).toContain("Pipeline value, deals closed, revenue this month and the activity that needs attention today.");
    expect(src).toContain("Filter by owner, industry, revenue range and tier, then export exactly what you are looking at.");
    expect(src).toContain("Five report tabs computed from your own records, with date, owner and source filters across all of them.");
  });

  it("the 3 preview rows (the mock titles + the lg:col-span-3/2 grid)", () => {
    const src = landing();
    expect(src).toContain('title: "NEO CRM · Dashboard"');
    expect(src).toContain('title: "NEO CRM · Accounts"');
    expect(src).toContain('title: "NEO CRM · Reports"');
    expect(src).toContain('className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center"');
    expect(src).toContain('className="lg:col-span-3"');
    expect(src).toContain('className="lg:col-span-2"');
    expect(src).toContain("See the app itself");
    expect(src).toContain("These are the real screens you work in every day — not a slide from a sales deck.");
    expect(src).toContain('className="mt-12 space-y-12 sm:space-y-16"');
  });
});

describe("session-142: the pricing section (3 tiers + the Pro highlight)", () => {
  it("the grid + the card construction + the Pro highlight trio", () => {
    const src = landing();
    expect(src).toContain('className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"');
    expect(src).toMatch(/tier\.popular \? "border-brand shadow-lg ring-1 ring-brand\/20" : "border-gray-200"/);
    expect(src).toContain('className="self-start mb-3 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs font-semibold"');
    expect(src).toContain("Most popular");
  });

  it("the prices ($9/$19/$39 + / month) + the tier subs + the CTAs", () => {
    const src = flat(landing());
    expect(src).toContain('price: "$9"');
    expect(src).toContain('price: "$19"');
    expect(src).toContain('price: "$39"');
    expect(src).toContain('className="mt-5 flex items-baseline gap-1.5"');
    expect(src).toContain('className="text-4xl font-bold text-gray-900"');
    expect(src).toContain('className="text-sm text-gray-500">/ month');
    expect(src).toContain('sub: "The core CRM"');
    expect(src).toContain('sub: "Adds pipeline intelligence"');
    expect(src).toContain('sub: "Adds account health and control"');
    // the CTA construction: Pro = brand, Standard/Advanced = outline
    expect(src).toMatch(/"shadow h-9 px-4 py-2 bg-brand hover:bg-brand\/90 text-white"/);
    expect(src).toMatch(/"border border-line bg-surface text-foreground shadow-sm hover:bg-line-soft hover:text-neutral-900 h-9 px-4 py-2"/);
    expect(src).toContain("Start with Standard");
    expect(src).toContain("Start with Pro");
    expect(src).toContain("Start with Advanced");
    // the footnote
    expect(src).toContain(
      "Prices are shown for reference while billing is being set up — plans are not charged yet, and the app is free to use in the meantime.",
    );
  });

  it("the pricing sub + the footnote (flat-matched)", () => {
    const src = flat(landing());
    expect(src).toContain("One price per workspace, every feature of your tier included. Change tier whenever you need to.");
  });

  it("the tier feature lists (the censused vocabulary)", () => {
    const src = landing();
    for (const feature of [
      "Dashboard and accounts",
      "Contacts with roles and priorities",
      "Leads, calendar and activities",
      "Sales overview report",
      "CSV import and export",
      "Everything in Standard",
      "Pipeline and forecast report",
      "Activity and productivity report",
      "Lead sources report",
      "Saved reports and richer exports",
      "Everything in Pro",
      "Account health report",
      "Configurable sources, stages, types and tiers",
      "Default values and preferences",
    ]) {
      expect(src).toContain(`"${feature}"`);
    }
  });
});

describe("session-142: the FAQ accordion (single-open, Q1 default open)", () => {
  it("the container + the item construction (the censused classes)", () => {
    const src = landing();
    expect(src).toContain('className="mt-10 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white"');
    expect(src).toContain('className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"');
    expect(src).toContain('className="text-sm sm:text-base font-medium text-gray-900"');
    expect(src).toMatch(/className=\{cn\(\s*"w-5 h-5 shrink-0 text-gray-400 transition-transform",\s*open && "rotate-180",\s*\)\}/);
    expect(src).toContain('className="px-5 pb-5 -mt-1 text-sm text-gray-600 leading-relaxed"');
  });

  it("SINGLE-OPEN + Q1 open by default (the live-verified behavior)", () => {
    const src = landing();
    // one openIndex state (not a set) + the default 0
    expect(src).toMatch(/useState\(0\)/);
    expect(src).toMatch(/onClick=\{\(\) => setOpenIndex\(open \? -1 : index\)\}/);
    // the answer mounts ONLY for the open item
    expect(src).toMatch(/\{open && \(\s*<p/);
  });

  it("the six questions (the data constants)", () => {
    const src = landing();
    for (const q of [
      "Do I need to install anything?",
      "Is my data separate from other customers?",
      "Can I bring my existing contacts across?",
      "Can I change the stages, sources and industries?",
      "What happens to my data if I stop paying?",
      "Which tier do I need?",
    ]) {
      expect(src).toContain(`q: "${q}"`);
    }
    expect(src).toContain("Questions, answered");
  });

  it("the FAQ answers (the long-copy flat-matched set)", () => {
    const src = flat(landing());
    expect(src).toContain(
      "No. NEO CRM is a web app — sign in from any modern browser on a laptop, tablet or phone and your workspace is there.",
    );
    expect(src).toContain(
      "Standard covers the day-to-day CRM. Pro adds the pipeline forecast, activity productivity and lead source reports. Advanced adds account health, configurable lists and the data tools.",
    );
    expect(src).toContain(
      "Yes. Your accounts, contacts, leads, activities and calendar events are private to your own account, and so are your configuration lists and default values.",
    );
    expect(src).toContain(
      "Yes. Download a CSV template from Settings, fill it in, and import your contacts, accounts or leads in one go.",
    );
    expect(src).toContain(
      "Yes. Settings → CRM Configuration lets you define your own contact sources, lead stages, activity types, account tiers and industries, plus default values for new records.",
    );
    expect(src).toContain(
      "Pricing is informational for now and nothing is charged, so nothing is at risk today. You can export your data to CSV at any time from Settings.",
    );
  });

  it("the DEVIATION pin: the a11y superset (aria-expanded + aria-controls on the FAQ toggles)", () => {
    const src = landing();
    // The reference ships NO aria-expanded — our superset is documented
    // (the drawer precedent); these two attributes are the ONLY additions.
    expect(src).toContain("aria-expanded={open}");
    expect(src).toContain("aria-controls={`faq-answer-${index}`}");
  });
});

describe("session-142: the footer + the page wrapper", () => {
  it("the footer construction (the brand block + the 6 links + the copyright line)", () => {
    const src = flat(landing());
    expect(src).toContain('className="bg-white border-t border-gray-200"');
    expect(src).toContain('className="max-w-6xl mx-auto px-4 sm:px-6 py-10"');
    expect(src).toContain('className="mt-3 text-sm text-gray-500 max-w-sm"');
    expect(src).toContain(
      "A personal customer relationship workspace: accounts, contacts, leads, calendar and reporting in one place.",
    );
    for (const label of ["Features", "Pricing", "FAQ", "About", "Contact", "Open dashboard"]) {
      expect(src).toContain(`label: "${label}"`);
    }
    expect(src).toContain('href: "/About"');
    expect(src).toContain('className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500"');
    expect(src).toContain("© 2026 NEO CRM");
  });

  it("session-143 (F-143c2): the FAQ SECTION container is max-w-3xl + the h2 rides DIRECT (no wrapper)", () => {
    const src = landing();
    // walk33: the reference's FAQ is the ONLY narrow landing section — its
    // container max-w-3xl (768px) with the h2 a DIRECT child (720px); every
    // other section keeps the max-w-6xl container + the max-w-2xl h2
    // wrapper. Ours wrongly rode the wide pattern → the 1102px column (the
    // answer wrap 43px vs the reference's 66px — below the sweep's fold).
    expect(src).toMatch(
      /<section id="faq"[^>]*>\s*<div className="max-w-3xl mx-auto px-4 sm:px-6">\s*<h2/,
    );
    // the retired wide construction must NOT return (the wrapper div
    // between the container and the h2)
    expect(src).not.toMatch(
      /className="max-w-3xl mx-auto px-4 sm:px-6">\s*<div className="max-w-2xl">/,
    );
  });

  it("the FAQ data constants ride single-line strings (the pin-friendly construction)", () => {
    // the FAQ answers + the data-array copy are single-line source
    // strings — the mixed pin shapes are intentional: construction
    // classes pin EXACT, multi-line JSX copy pins FLAT, data pins EXACT.
    const src = read(LANDING_PAGE) ?? "";
    expect(src).toContain("a: \"No. NEO CRM is a web app");
  });

  it("the features sub copy (flat-matched)", () => {
    const src = flat(landing());
    expect(src).toContain("No modules to license, no setup project. Everything below is already in the app.");
  });

  it("the feature card bodies (the censused copy)", () => {
    const src = flat(landing());
    for (const body of [
      "One record per company and every person inside it, with roles, priorities, company size and engagement levels.",
      "Capture leads, move them through your own stages, and keep the next follow-up date, value and owner in view.",
      "Log calls, emails, meetings, notes and WhatsApp against a record. Overdue follow-ups float to the top of the list.",
      "Sales overview, pipeline forecast, activity productivity, lead sources and account health — no figures invented in the background.",
      "Define contact sources, lead stages, activity types, account tiers and industries in Settings, and pick your default values.",
      "CSV templates, guided import, one-click exports and a guarded reset — your records are never locked inside the app.",
    ]) {
      expect(src).toContain(body);
    }
  });

  it("the page wrapper: id=top + min-h-screen bg-white (the reference's own anchor target)", () => {
    const src = landing();
    expect(src).toContain('id="top" className="min-h-screen bg-white"');
    expect(src).toContain('href="#top"');
    // the section id set (the reference's anchors)
    expect(src).toContain('id="features"');
    expect(src).toContain('id="preview"');
    expect(src).toContain('id="pricing"');
    expect(src).toContain('id="faq"');
    // the scroll-mt-16 (the sticky-header anchor offset)
    expect(src).toContain("scroll-mt-16");
  });
});

describe("session-142: the brand token (the reference's marketing blue)", () => {
  it("globals.css carries --color-brand: #2563eb (the reference's 221 83% 53%)", () => {
    const css = read("src/app/globals.css") ?? "";
    expect(css).toContain("--color-brand: #2563eb;");
  });
});

describe("session-142: the /About + /Contact marketing pages (D-142a2; session-144: moved to the PUBLIC (marketing) group — F-144c1)", () => {
  it("/about: the censused construction (server component, no client JS)", () => {
    // Session-144 (D-144a1/F-144c1): the path re-anchored — the four
    // route files moved (app) → (marketing) (the reference serves them
    // to GUESTS; the group layout is session-optional). The CONSTRUCTION
    // pins below are unchanged — the page sources are byte-identical.
    const src = read("src/app/(marketing)/about/page.tsx") ?? "";
    expect(src).not.toBeNull();
    const code = stripComments(src);
    expect(code).toContain('pageMetadata({ page: "About", route: "/about" })');
    expect(code).toContain('className="min-h-screen bg-gray-50"');
    expect(code).toContain('className="max-w-3xl mx-auto px-4 sm:px-8 py-12"');
    expect(code).toContain('className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"');
    expect(code).toContain("About NEO CRM");
    expect(code).toContain('className="space-y-4 text-gray-700 leading-relaxed"');
    expect(code).toContain('className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"');
    expect(code).toContain('className="bg-white border rounded-xl p-5"');
    // the four cards + the get-in-touch link
    for (const title of ["Accounts & Contacts", "Leads & Pipeline", "Activities & Calendar", "Reports"]) {
      expect(code).toContain(`title: "${title}"`);
    }
    expect(code).toContain("Get in touch with us →");
    expect(code).toContain('href="/Contact"');
    // no "use client" — a pure server component
    expect(src).not.toMatch(/^"use client"/m);
  });

  it("/about: the three intro paragraphs (the censused copy, flat-matched)", () => {
    const code = flat(stripComments(read("src/app/(marketing)/about/page.tsx") ?? ""));
    expect(code).toContain(
      "NEO CRM is a clean, intuitive customer relationship management platform built to help you manage your accounts, contacts, and leads from one centralized, customizable dashboard. Instead of juggling spreadsheets, sticky notes, and scattered email threads, you get a single workspace where every relationship, conversation, and opportunity lives side by side.",
    );
    expect(code).toContain(
      "With NEO CRM you can track companies and the people who work there, follow leads through a customizable pipeline, schedule meetings and calls on a shared calendar, and record every activity against the right record. Built-in reports turn that everyday activity into clear insight, so you can see what is working, where deals stall, and which relationships need attention. The settings area lets you tailor sources, stages, and defaults so the app reflects the way you actually work.",
    );
    expect(code).toContain(
      "NEO CRM is designed for individuals, freelancers, and small sales teams who want the power of a professional CRM without the clutter and complexity of an enterprise suite. It is built and maintained by the NEO CRM team, with a focus on speed, clarity, and a friendly experience on both desktop and mobile.",
    );
    // the card bodies
    expect(code).toContain("Keep every company and person you work with in one organized place.");
    expect(code).toContain("Track prospects from first contact all the way to a closed deal.");
    expect(code).toContain("Log calls, emails and meetings, and never miss a follow-up.");
    expect(code).toContain("Understand your performance with clear, visual analytics.");
  });

  it("the three socials with their lucide icons + the safe rel (RAW source — stripComments eats https://)", () => {
    const raw = read("src/app/(marketing)/contact/page.tsx") ?? "";
    expect(raw).toContain('href="https://www.linkedin.com"');
    expect(raw).toContain('href="https://x.com"');
    expect(raw).toContain('href="https://github.com"');
    expect(raw).toContain('rel="noopener noreferrer"');
    expect(raw).toContain('target="_blank"');
  });

  it("/contact: the censused construction (Email + Follow us)", () => {
    const src = read("src/app/(marketing)/contact/page.tsx") ?? "";
    expect(src).not.toBeNull();
    const code = flat(stripComments(src));
    expect(code).toContain('pageMetadata({ page: "Contact", route: "/contact" })');
    expect(code).toContain("Contact Us");
    expect(code).toContain(
      "Have a question about NEO CRM, need a hand getting set up, or want to share feedback? We would love to hear from you.",
    );
    expect(code).toContain('className="bg-white border rounded-xl p-6 mb-8"');
    expect(code).toContain('className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0"');
    expect(code).toContain('className="lucide lucide-mail w-5 h-5 text-blue-600"');
    expect(code).toContain("Drop us a line and we will get back to you.");
    expect(code).toContain('href="mailto:hello@example.com"');
    expect(code).toContain("hello@example.com");
    expect(code).toContain("Follow us");
    expect(code).toContain('className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"');
    // the social hrefs + the safe rel: pinned in the RAW-source test
    // above (stripComments eats https:// — the // reads as a comment)
    expect(src).not.toMatch(/^"use client"/m);
  });

  it("the capital aliases exist (the /About + /Contact .jsx render aliases)", () => {
    const about = read("src/app/(marketing)/About/page.jsx") ?? "";
    const contact = read("src/app/(marketing)/Contact/page.jsx") ?? "";
    expect(stripComments(about)).toMatch(/import AboutPageRoute from "\.\.\/about\/page"/);
    expect(stripComments(about)).toMatch(/pageMetadata\(\{ page: "About", route: "\/About" \}\)/);
    expect(stripComments(contact)).toMatch(/import ContactPageRoute from "\.\.\/contact\/page"/);
    expect(stripComments(contact)).toMatch(/pageMetadata\(\{ page: "Contact", route: "\/Contact" \}\)/);
  });
});

// ---------------------------------------------------------------------------
// Session 145 (walk35 — the auth-transition family): the landing's
// SESSION-STATIC contract. The maiden logged-in-face census: the reference
// post-login lands on `/` and renders the IDENTICAL guest face (the same
// nav, the same "Open dashboard" CTA — no user indicator, no Login→swap,
// no account affordance anywhere on the marketing surface). Ours is the
// same (live-verified both apps at 1440 + the post-login redirect). The
// pin freezes the component's session-blindness so a future "personalize
// the landing for signed-in users" drift REDs here exactly.
// ---------------------------------------------------------------------------

describe("session-145: the landing is SESSION-STATIC (walk35, the maiden logged-in-face census)", () => {
  it("the landing COMPONENT is session-blind — no session reads, no store, no signed-in affordances", () => {
    const src = landing();
    expect(src, LANDING_PAGE).not.toBeNull();
    // no session plumbing of any kind reaches the marketing surface
    expect(src).not.toMatch(/getSessionUser/);
    expect(src).not.toMatch(/useCrmStore/);
    expect(src).not.toMatch(/useSession|signedIn|isAuthenticated/);
    // the CTA vocabulary is constant for both session states: the
    // reference's own landing shows "Open dashboard" to logged-in users
    // too (its post-login redirect target IS this page)
    expect(src).toMatch(/Open dashboard/);
    expect(src).not.toMatch(/Sign out|Log out|My account|View profile/);
  });
});
