import { siteUrl } from "@/lib/site";

// Session-18 (S18-P4): /sitemap.xml — the reference's exact format
// (byte-verified 2026-10-01: LF-only, no trailing newline, 4-space URL
// indent, changefreq weekly on every entry, priority "1.0" for the
// dashboard and "0.8" for the rest). Served through an explicit route
// handler because Next's sitemap.ts serializer DROPS the number
// formatting ("1.0" serializes as "1") — and its MetadataRoute type
// spells the field changeFrequency, easy to mis-pin. One deliberate fix:
// the reference's locs are CAPITALIZED (/Budgets…) — its platform routes
// case-insensitively; our router is case-sensitive (the documented s14
// decision), so this sitemap lists the real lowercase routes the router
// actually serves.
// Session-142 (D-142a3) added /about + /contact when the reference's URL
// surface included them. Session-193 (2026-10-27 re-audit): the reference
// REMOVED its own /About /Contact (both now 404, and its sitemap dropped
// them — it now lists only /, /Budgets, /Profile, /Transactions). OUR
// entries STAY: the routes are real pages in this app — OUR public
// marketing layer, linked from the landing's footer (the landing itself
// is the documented superset surface). `/` stays 1.0 — it is the PUBLIC
// landing page, the highest-priority crawlable route.
export const dynamic = "force-static";

const ROUTES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/dashboard", priority: "0.8" },
  { path: "/transactions", priority: "0.8" },
  { path: "/budgets", priority: "0.8" },
  { path: "/profile", priority: "0.8" },
  { path: "/about", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  { path: "/login", priority: "0.5" },
  { path: "/signup", priority: "0.5" },
];

export function GET(): Response {
  const origin = siteUrl();
  const urls = ROUTES.map(
    ({ path, priority }) => `    <url>
        <loc>${origin}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    // Session-20 (S20-P4): bare `application/xml` — the reference's exact
    // content-type (GET-verified 2026-10-01; ours had shipped a charset
    // suffix, the s18 "viewport 1 vs 1.0" cosmetic-serialization class).
    headers: { "content-type": "application/xml" },
  });
}
