import { headers } from "next/headers";
import type { Metadata } from "next";
import { NotFoundBody } from "./not-found-body";
import { notFoundTitle } from "@/lib/not-found-title";

// Session-12 (S12-P2): the reference's custom 404 — a designed slate-family
// surface (NOT the stock Next.js built-in): centered on bg-slate-50 with a
// font-light "404" display heading, "Page Not Found", the quoted-pathname
// message and a white bordered Go Home pill (lucide Home icon) that
// navigates to `/`. No app shell (the reference renders it bare). The
// pathname interpolation lives in the client body (usePathname).
//
// Session-191: the 404 title was pinned to the plain site title "Budget
// Wise" (then live-verified on /nonexistent-route-xyz — the retired
// NEO CRM absolute was purged with it; the brand purge pin survives in
// tests/metadata.test.ts).
//
// Session-196 (2026-10-28, live-probed incl. the served HTML): the
// reference's 404 title is the INTERPOLATED form — `<Humanized last
// non-empty path segment> | Budget Wise` — served directly in its HTML
// head (curl-verified: <title>Curl Probe Route | Budget Wise</title>).
// Next's metadata API cannot read the unmatched path here (no params,
// no path header — probed: only host/x-forwarded-* reach the render),
// so src/proxy.ts stamps `x-pathname` onto the request headers
// and generateMetadata interpolates it server-side. The ABSOLUTE
// spelling keeps the root layout's "%s | Budget Wise" template from
// doubling the suffix; a missing header falls back to the s191 plain
// form. The page still answers a REAL 404 status (the reference's
// 200-everything is its SPA platform's face — our real status is the
// kept production-grade posture, the same genus as the session guard).
export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";
  return { title: { absolute: notFoundTitle(pathname) } };
}

export default function NotFound() {
  return <NotFoundBody />;
}
