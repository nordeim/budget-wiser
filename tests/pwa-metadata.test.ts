import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-19: the PWA/INSTALLABLE + PER-ROUTE metadata layer — the head
// surface never swept before (manifest.json, the apple/mobile-web-app
// meta family, the theme-color VALUE, the apple-touch-icon, per-route
// canonical/OG/Twitter) plus the form-input attribute micro-contracts of
// the create dialogs. Every pin below is DOM/HTTP-verified against the
// live reference (2026-10-01 audit):
//   - the reference serves /manifest.json + <link rel=manifest>: name +
//     short_name "Budget Wise", the same description, TWO icon
//     entries (192x192 + 512x512, the SAME src — their platform
//     screenshot; self-hosted expression: our /icon.png), start_url +
//     scope at the origin, display "standalone", theme_color "#000000",
//     background_color "#ffffff". Key order mirrored (a MetadataRoute
//     serializer would re-order — hence the explicit route handler, the
//     s18 robots/sitemap pattern);
//   - the reference's meta[name=theme-color] is #000000 (black) — ours
//     shipped #2563eb (an s18 mis-read of "harmless superset");
//   - the reference ships mobile-web-app-capable=yes +
//     apple-mobile-web-app-status-bar-style=black +
//     apple-mobile-web-app-title="Budget Wise" (metas) and an
//     apple-touch-icon link (sizes 180x180);
//   - PER-ROUTE OG/Twitter on every reference inner page: og:title =
//     "<Page> | Budget Wise", og:url = origin+route, og:description =
//     "<Page> on Budget Wise. " + the description paragraph; twitter:title/url/
//     description likewise (verified on all 8 inner routes + root +
//     login); the canonical link is per-route too;
//   - the reference's New Contact Phone input is type=tel (its Lead
//     dialog Phone is type=text — its own inconsistency, mirrored);
//   - the reference ships ZERO datalists in any create dialog (ours
//     invented two) and its avatar file input accepts
//     "image/jpeg,image/png,image/jpg".
//
// The seam imports are DYNAMIC (and the source reads existence-guarded)
// so the red state fails check-by-check instead of erroring the file.

const REFERENCE_DESCRIPTION =
  "Budget Wise is a clean, intuitive personal finance platform that keeps every dollar in view — track income and expenses, set category budgets, and watch your savings rate climb on a live dashboard. With effortless transaction logging, smart category insights, and month-over-month budget tracking, Budget Wise turns daily spending into a clear picture of your financial health — so you can spend confidently and save deliberately.";

const repoFile = (rel: string) =>
  path.resolve(import.meta.dirname, "..", rel);

const readOr = (rel: string): string => {
  const p = repoFile(rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const layoutSrc = () => readOr("src/app/layout.tsx");
const manifestSrc = () => readOr("src/app/manifest.json/route.ts");
const wrapperSrc = (page: string) => readOr(`src/app/(app)/${page}/page.tsx`);

describe("session-19: the web app manifest (S19-P1)", () => {
  it("serves /manifest.json through a force-static route handler", () => {
    const src = manifestSrc();
    expect(src).toContain('export const dynamic = "force-static"');
    expect(src).toContain("from \"@/lib/site\"");
    // NEVER app/manifest.ts — the MetadataRoute serializer re-orders keys
    // (the s18 robots/sitemap lesson).
    expect(existsSync(repoFile("src/app/manifest.ts"))).toBe(false);
  });

  it("mirrors the reference's manifest bytes (key order + values)", () => {
    const src = manifestSrc();
    // Key order: name, short_name, description, icons, start_url,
    // display, theme_color, background_color, scope.
    expect(src).toMatch(/name:\s*"Budget Wise",\s*short_name:\s*"Budget Wise",/);
    expect(src).toContain("description: SITE_DESCRIPTION");
    expect(src).toContain('sizes: "192x192"');
    expect(src).toContain('sizes: "512x512"');
    // The reference's quirk: BOTH icon entries share ONE src — the
    // self-hosted expression is our app icon (exactly two src bindings).
    expect(src.match(/src: `\$\{origin\}\/icon\.png`/g)?.length).toBe(2);
    expect(src).toContain('display: "standalone"');
    expect(src).toContain('theme_color: "#000000"');
    expect(src).toContain('background_color: "#ffffff"');
    expect(src).toContain("start_url: origin");
    expect(src).toContain("scope: origin");
    expect(src).toContain('application/json');
  });
});

describe("session-19: theme-color + the apple/PWA meta family (S19-P2, S19-P3)", () => {
  it("pins the viewport theme-color to the reference's #000000", () => {
    expect(layoutSrc()).toContain('themeColor: "#000000"');
    expect(layoutSrc()).not.toContain('themeColor: "#2563eb"');
  });

  it("declares the manifest link; the icons ship as file conventions", () => {
    const src = layoutSrc();
    expect(src).toMatch(/manifest:\s*`\$\{siteUrl\(\)\}\/manifest\.json`/);
    // The apple-touch-icon + the favicon BOTH ride file conventions
    // (src/app/apple-icon.png + src/app/icon.png) — declaring
    // metadata.icons here would REPLACE the file-convention icon link
    // (gate-caught in e2e), so the layout declares NO icons field.
    expect(src).not.toMatch(/\bicons:\s*\{/);
  });

  it("carries the three PWA metas through metadata.other", async () => {
    // The literals live in the seam (PWA_META) — the layout spreads them
    // into `other` (page metadata REPLACES the map, so pageMetadata()
    // re-declares them per page).
    const { PWA_META } = await import("@/lib/site");
    expect(PWA_META["mobile-web-app-capable"]).toBe("yes");
    expect(PWA_META["apple-mobile-web-app-status-bar-style"]).toBe("black");
    expect(PWA_META["apple-mobile-web-app-title"]).toBe("Budget Wise");
    const src = layoutSrc();
    expect(src).toContain('PWA_META, SITE_DESCRIPTION, siteUrl');
    expect(src).toContain("...PWA_META");
  });

  it("ships the 180x180 apple icon as a file-convention asset", () => {
    const icon = repoFile("src/app/apple-icon.png");
    expect(existsSync(icon)).toBe(true);
    const buf = readFileSync(icon);
    expect([...buf.slice(0, 8)]).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    expect(buf.readUInt32BE(16)).toBe(180);
    expect(buf.readUInt32BE(20)).toBe(180);
  });
});

describe("session-19: the per-route metadata seam (S19-P4, S19-P5)", () => {
  it("builds the reference's prefixed og description", async () => {
    const { pageOgDescription, SITE_DESCRIPTION } = await import("@/lib/site");
    expect(pageOgDescription("Transactions")).toBe(
      `Transactions on Budget Wise. ${SITE_DESCRIPTION}`,
    );
    expect(SITE_DESCRIPTION).toBe(REFERENCE_DESCRIPTION);
  });

  it("builds the full inner-page metadata set", async () => {
    const { pageMetadata } = await import("@/lib/site");
    const m = pageMetadata({ page: "Transactions", route: "/transactions" });
    expect(m.title).toBe("Transactions"); // rides the root "%s | Budget Wise" template
    expect(m.alternates?.canonical).toBe("/transactions");
    const og = m.openGraph as Record<string, unknown>;
    expect(og.title).toBe("Transactions | Budget Wise");
    expect(og.description).toBe(`Transactions on Budget Wise. ${REFERENCE_DESCRIPTION}`);
    expect(og.url).toBe("/transactions");
    const tw = m.twitter as Record<string, unknown>;
    expect(tw.title).toBe("Transactions | Budget Wise");
    expect(tw.card).toBe("summary_large_image");
    const other = m.other as Record<string, string>;
    expect(other["twitter:url"]).toMatch(/\/transactions$/);
    expect(other["mobile-web-app-capable"]).toBe("yes");
    expect(other["apple-mobile-web-app-title"]).toBe("Budget Wise");
  });

  it("builds the unprefixed root/login family with an ABSOLUTE title", async () => {
    const { pageMetadata } = await import("@/lib/site");
    const m = pageMetadata({ page: null, route: "/login" });
    const title = m.title as { absolute?: string };
    expect(title.absolute).toBe("Budget Wise"); // the anti-doubling pin
    const og = m.openGraph as Record<string, unknown>;
    expect(og.title).toBe("Budget Wise");
    expect(og.description).toBe(REFERENCE_DESCRIPTION);
    expect(og.url).toBe("/login");
    expect(m.alternates?.canonical).toBe("/login");
  });

  it("wires every inner page wrapper through the factory", () => {
    const pages: Array<[string, string]> = [
      ["transactions", "Transactions"],
      ["budgets", "Budgets"],
      ["profile", "Profile"],
    ];
    for (const [dir, page] of pages) {
      expect(wrapperSrc(dir)).toContain(
        `pageMetadata({ page: "${page}", route: "/${dir}" })`,
      );
    }
    // The auth pages ride the same factory (login keeps the ABSOLUTE
    // "Budget Wise"; signup keeps its absolute suffixed title — the
    // documented functional superset).
    expect(readOr("src/app/login/page.tsx")).toContain(
      'pageMetadata({ page: null, route: "/login" })',
    );
    expect(readOr("src/app/signup/page.tsx")).toContain(
      'pageMetadata({ page: null, route: "/signup", title: "Sign up | Budget Wise" })',
    );
    // The dashboard inherits the root layout's metadata (og:url = the
    // origin root — the reference's unprefixed family): NO wrapper
    // metadata export of its own.
    expect(readOr("src/app/(app)/dashboard/page.tsx")).not.toMatch(
      /export const metadata/,
    );
  });

  it("keeps the root canonical on the root layout", () => {
    expect(layoutSrc()).toMatch(/canonical:\s*"\//);
  });
});
