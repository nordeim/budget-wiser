import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Session-196: the pathname stamp for the root not-found's
// generateMetadata. The reference (a Base44 SPA) serves its 404 head
// with the interpolated title — `<Humanized last non-empty path
// segment> | Budget Wise` — directly in the HTML (curl-verified
// 2026-10-28). Next's metadata API has no path access inside the root
// not-found (no params; the render's headers carry only host +
// x-forwarded-* — probed), so this proxy stamps the request's
// pathname onto a request header the not-found's generateMetadata
// reads. It runs BEFORE routing, so unmatched paths (the only
// ones that 404) receive it too.
//
// Session-201: renamed middleware.ts → proxy.ts (the EXPORT renamed
// with it) — Next.js 16.4 deprecates the `middleware` file convention
// (the dev log warned on every boot); the installed 16.4.2 resolves
// `src/proxy.ts` with an exported `proxy` function instead. Same
// mechanism, same matcher, same single-header behavior — the deprecation
// notice is gone and a future Next that drops the legacy convention
// cannot break the 404 title seam.
//
// Deliberately minimal: it sets ONE request header and nothing else —
// no redirects, no rewrites, no response mutation, no cookie access.
// Static assets and file-convention metadata routes are excluded by
// the matcher (they never render the not-found).
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Everything except Next's static/image pipelines and the public
  // file assets + file-convention metadata routes (favicon, icons,
  // og-image, manifest, robots, sitemap) — none can render the 404.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|apple-icon\\.png|og-image\\.png|manifest\\.json|robots\\.txt|sitemap\\.xml).*)",
  ],
};
