import { LandingPage } from "@/components/landing/landing-page";

// Session-142 (D-142a1): the PUBLIC MARKETING LANDING PAGE at `/` — the
// reference's index-Dc6wvGtA.js parity event (probe:ref #114). Its root
// used to render the dashboard (auth-gated through the (app) group); the
// dashboard moved to (app)/dashboard/page.tsx and the capital /Dashboard
// alias re-imports it.
//
// PUBLIC: this page sits OUTSIDE the (app) route group — no session
// resolution, no redirect (the reference serves its landing to guests
// and authenticated visitors alike; live-verified logged-out AND
// post-login — the login card redirects to `/`).
//
// NO page-level metadata export: the ROOT layout's object already IS the
// reference's landing head, axis for axis — title "Budget Wise" (absolute,
// no template), the 405-char description (byte-identical), the
// bare-origin canonical, the OG family (+ og-image.png), the Twitter
// family (summary_large_image + twitter:url via `other`), the PWA metas.
// A page export would only re-declare the same values.
export default function RootLandingRoute() {
  return <LandingPage />;
}
