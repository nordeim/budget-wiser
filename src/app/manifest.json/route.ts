import { SITE_DESCRIPTION, siteUrl } from "@/lib/site";

// Session-19 (S19-P1): /manifest.json — the installable web app manifest.
//   {name, short_name} "Budget Wise", the site description, TWO icon
//   entries (192x192 + 512x512 — the SAME src on both; the self-hosted
//   expression is our /icon.png BrandMark tile), start_url + scope at
//   the origin, display "standalone", theme_color/background_color.
// (Session-191: the reference's own manifest says "Budget Wise" — the
// CRM-era "NEO CRM" note below was the prior reference's spelling.)
// Served through an explicit route handler (NEVER app/manifest.ts) —
// Next's MetadataRoute.Manifest serializer re-orders the keys, and the
// object below is built in the reference's exact key order (JSON.stringify
// preserves insertion order). The reference serves it as application/json.
// Static content: prerendered at build time (NEXT_PUBLIC_SITE_URL is
// inlined — set it before `bun run build` in production).
export const dynamic = "force-static";

export function GET(): Response {
  const origin = siteUrl();
  const manifest = {
    name: "Budget Wise",
    short_name: "Budget Wise",
    description: SITE_DESCRIPTION,
    icons: [
      {
        src: `${origin}/icon.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${origin}/icon.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    start_url: origin,
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    scope: origin,
  };
  return new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/json" },
  });
}
