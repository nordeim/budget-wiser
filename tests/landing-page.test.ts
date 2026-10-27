import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The Budget Wise LANDING PAGE pins — the public marketing surface at `/`
// (outside the (app) group: no session guard). These pins freeze the
// construction so a future drift REDs here exactly.

const LANDING_PAGE = "src/components/landing/landing-page.tsx";
const ROOT_PAGE = "src/app/page.tsx";

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// Source pins read RULES, not documentation: strip comments first.
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const landing = () => stripComments(read(LANDING_PAGE) ?? "");
const rootPage = () => stripComments(read(ROOT_PAGE) ?? "");

/** collapse ALL whitespace to single spaces — long JSX copy rides
 *  multi-line children in the source; the pin reads them flat. */
const flat = (s: string) => s.replace(/\s+/g, " ");

describe("the landing page exists + is PUBLIC", () => {
  it("the root page renders the landing component with NO auth guard + NO own metadata", () => {
    const src = rootPage();
    expect(src, "src/app/page.tsx must exist (the landing route)").not.toBeNull();
    expect(src).toMatch(/import \{ LandingPage \} from "@\/components\/landing\/landing-page"/);
    expect(src).toMatch(/return <LandingPage \/>/);
    // PUBLIC: no session resolution, no (app)-group import, no redirect.
    expect(src).not.toMatch(/getSessionUser/);
    expect(src).not.toMatch(/redirect\(/);
    // The metadata rides the ROOT layout's object; a page export would
    // only re-declare the same values.
    expect(src).not.toMatch(/export const metadata/);
    expect(src).not.toMatch(/pageMetadata/);
  });

  it("the landing component file exists and is a client component", () => {
    const src = landing();
    expect(src, "the landing component must exist").not.toBeNull();
    expect(src.slice(0, 200)).toMatch(/^"use client"/);
  });
});

describe("the landing header construction", () => {
  it("the sticky header + the max-w-7xl h-16 nav + the brand mark", () => {
    const src = landing();
    expect(src).toMatch(/sticky top-0 z-40 border-b border-slate-100 bg-white\/80 backdrop-blur-sm/);
    expect(src).toMatch(/mx-auto flex h-16 max-w-7xl items-center justify-between/);
    // The brand: gradient slate logo tile + the BudgetWise wordmark.
    expect(src).toMatch(/bg-gradient-to-br from-slate-900 to-slate-700/);
    expect(flat(src)).toMatch(/BudgetWise<\/span>/);
    expect(src).toMatch(/<Wallet className="h-5 w-5 text-white" \/>/);
  });

  it("the desktop nav links (the 4 section anchors) + the Sign in CTA", () => {
    const src = landing();
    for (const label of ["Features", "Preview", "Pricing", "FAQ"]) {
      expect(src).toMatch(new RegExp(`label: "${label}"`));
    }
    expect(src).toMatch(/href="\/login"/);
    expect(flat(src)).toMatch(/Sign in/);
  });

  it("the mobile disclosure menu: the hamburger + the mount/unmount panel", () => {
    const src = landing();
    // The trigger carries the a11y contract (aria-expanded).
    expect(src).toMatch(/aria-label=\{menuOpen \? "Close menu" : "Open menu"\}/);
    expect(src).toMatch(/aria-expanded=\{menuOpen\}/);
    // The panel MOUNTS/UNMOUNTS (no hidden-attribute fighting display
    // utilities — the Tailwind v4 discipline).
    expect(src).toMatch(/\{menuOpen \? \(/);
  });
});

describe("the landing hero", () => {
  it("the headline + subhead + the dual CTA", () => {
    const src = flat(landing());
    expect(src).toMatch(/Every dollar in view\./);
    expect(src).toMatch(/Nothing slips through\./);
    expect(src).toMatch(/Start tracking free/);
    expect(src).toMatch(/See it in action/);
  });
});

describe("the landing sections", () => {
  it("the features grid renders six feature cards", () => {
    const src = landing();
    expect(src).toMatch(/Instant transaction logging/);
    expect(src).toMatch(/Category budgets that bite/);
    expect(src).toMatch(/Live savings rate/);
    expect(src).toMatch(/AI-sparked insights/);
  });

  it("the pricing section ships the free tier", () => {
    const src = flat(landing());
    expect(src).toMatch(/One simple price/);
    expect(src).toMatch(/\$0/);
    expect(src).toMatch(/Unlimited transactions/);
  });

  it("the FAQ: single-open accordion with aria wiring", () => {
    const src = landing();
    expect(src).toMatch(/aria-expanded=\{open\}/);
    expect(src).toMatch(/aria-controls=\{`faq-panel-\$\{i\}`\}/);
    expect(src).toMatch(/rotate-180/);
  });

  it("the footer: the copyright + About/Contact links", () => {
    const src = flat(landing());
    expect(src).toMatch(/© 2026 BudgetWise/);
    expect(src).toMatch(/href="\/About"/);
    expect(src).toMatch(/href="\/Contact"/);
  });
});

describe("the landing Tailwind v4 discipline", () => {
  it("no `hidden` attribute fighting display utilities", () => {
    const src = landing();
    // The only sanctioned hidden-class usage is responsive utilities.
    expect(src).not.toMatch(/ hidden(?=[\s>])/);
  });
});
