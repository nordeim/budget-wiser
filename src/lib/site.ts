// Canonical site origin seam (contract pinned by tests/metadata.test.ts
// and tests/pwa-metadata.test.ts).
//
// NEXT_PUBLIC_SITE_URL is documented in .env.example / README / CLAUDE as
// "used for metadata, sitemap.xml, and robots.txt" — every metadata
// surface (the root layout's metadataBase + OG/Twitter cards,
// app/sitemap.ts, app/robots.ts) derives from siteUrl().
//
// NEXT_PUBLIC_* values are INLINED AT BUILD TIME by Next — set the
// variable before `bun run build` in production (docs/DEPLOYMENT.md).

import type { Metadata } from "next";

export const DEFAULT_SITE_URL = "http://localhost:3000";

export const SITE_NAME = "Budget Wise";

/** The site's meta description. */
export const SITE_DESCRIPTION =
  "Budget Wise is a clean, intuitive personal finance platform that keeps every dollar in view — track income and expenses, set category budgets, and watch your savings rate climb on a live dashboard. With effortless transaction logging, smart category insights, and month-over-month budget tracking, Budget Wise turns daily spending into a clear picture of your financial health — so you can spend confidently and save deliberately.";

/**
 * Canonical public origin: NEXT_PUBLIC_SITE_URL when set (trailing slashes
 * stripped — URL composition below always appends paths), otherwise the
 * localhost dev default.
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/**
 * The per-route OG description prefix — every inner page's og/twitter
 * description is `"<Page> on Budget Wise. " + <the root paragraph>`.
 */
export function pageOgDescription(page: string): string {
  return `${page} on ${SITE_NAME}. ${SITE_DESCRIPTION}`;
}

/**
 * The three PWA metas the app ships in its <head> (mobile-web-app-capable
 * + the apple pair). Next's Metadata object has no first-class fields for
 * them, so they ride `metadata.other` — and because page-level metadata
 * REPLACES the layout's `other` map (shallow merge), the per-page factory
 * re-declares them on every page.
 */
export const PWA_META: Record<string, string> = {
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black",
  "apple-mobile-web-app-title": SITE_NAME,
};

/**
 * The per-route metadata factory: canonical + OG/Twitter per page
 * (og:title "<Page> | Budget Wise", og:url origin+route, the prefixed
 * description). Next shallow-merges page metadata over the layout's, so
 * every page re-declares the FULL openGraph/twitter/other sets.
 *
 * - `page: null` → the unprefixed root/login family; pass `title` for
 *   absolute spellings (signup: "Sign up | Budget Wise").
 * - The dashboard needs NO factory call — it inherits the root layout's
 *   metadata wholesale.
 */
export function pageMetadata(opts: {
  page: string | null;
  route: string;
  title?: string;
}): Metadata {
  const page = opts.page;
  const fullTitle = page !== null ? `${page} | ${SITE_NAME}` : SITE_NAME;
  const description = page !== null ? pageOgDescription(page) : SITE_DESCRIPTION;
  return {
    title:
      opts.title !== undefined
        ? { absolute: opts.title }
        : page !== null
          ? page
          : { absolute: SITE_NAME },
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description,
      url: opts.route,
      type: "website",
      siteName: SITE_NAME,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
