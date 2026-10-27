import type { Metadata } from "next";
import { NotFoundBody } from "./not-found-body";

// Session-12 (S12-P2): the reference's custom 404 — a designed slate-family
// surface (NOT the stock Next.js built-in): centered on bg-slate-50 with a
// font-light "404" display heading, "Page Not Found", the quoted-pathname
// message and a white bordered Go Home pill (lucide Home icon) that
// navigates to `/`. No app shell (the reference renders it bare). The
// pathname interpolation lives in the client body (usePathname).
//
// Session-191: the title. The reference's 404 answers with the plain site
// title "Budget Wise" (live-verified on /nonexistent-route-xyz — its SPA
// serves the root head under the fallback). The ABSOLUTE spelling keeps
// the root layout's "%s | Budget Wise" template from doubling the suffix.
// (The CRM-era "This Page Does Not Exist | NEO CRM" absolute retired with
// the domain transformation — pinned by tests/metadata.test.ts.)
export const metadata: Metadata = {
  title: { absolute: "Budget Wise" },
};

export default function NotFound() {
  return <NotFoundBody />;
}
