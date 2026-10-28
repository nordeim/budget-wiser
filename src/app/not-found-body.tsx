"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { NOT_FOUND_LAYOUT } from "@/lib/page-layout";
import { notFoundQuotedPath } from "@/lib/not-found-title";

/**
 * Client body of the custom 404 (session-12 S12-P2) — the reference's
 * message interpolates the unmatched pathname (`The page "x" could not
 * be found in this application.` — the quoted path inside a
 * font-medium slate-700 span), which only a client component can read.
 * The server wrapper (not-found.tsx) owns the page title through
 * generateMetadata (session-196: the proxy's x-pathname stamp →
 * the interpolated `<Humanized> | Budget Wise` form, served in the
 * HTML head exactly like the reference's own SPA server does).
 * Structure (VLM round-1 + DOM-verified): space-y-6 center with THREE
 * children — the space-y-2 heading group (404 + the 2px×64px
 * slate-200 divider bar), the space-y-3 text group (Page Not Found +
 * message), and the pt-6 button group (Go Home).
 *
 * Session-196 (2026-10-28, live-probed): the quoted path carries NO
 * leading slash ("/fake/deep/route" → "fake/deep/route" — only the
 * leading one is stripped; trailing/internal slashes kept; probed on
 * /foo/ which quotes "foo/").
 */
export function NotFoundBody() {
  const pathname = usePathname();
  const safePath = pathname ?? "/";
  return (
    <div className={NOT_FOUND_LAYOUT.page}>
      <div className={NOT_FOUND_LAYOUT.card}>
        <div className={NOT_FOUND_LAYOUT.center}>
          <div className={NOT_FOUND_LAYOUT.headingGroup}>
            <h1 className={NOT_FOUND_LAYOUT.h1}>404</h1>
            <div className={NOT_FOUND_LAYOUT.divider} aria-hidden="true" />
          </div>
          <div className={NOT_FOUND_LAYOUT.textGroup}>
            <h2 className={NOT_FOUND_LAYOUT.h2}>Page Not Found</h2>
            <p className={NOT_FOUND_LAYOUT.p}>
              The page{" "}
              <span className={NOT_FOUND_LAYOUT.pathSpan}>
                &quot;{notFoundQuotedPath(safePath)}&quot;
              </span>{" "}
              could not be found in this application.
            </p>
          </div>
          <div className={NOT_FOUND_LAYOUT.buttonGroup}>
            <Link href={NOT_FOUND_LAYOUT.homeHref} className={NOT_FOUND_LAYOUT.homeButton}>
              <Home className={NOT_FOUND_LAYOUT.homeIcon} aria-hidden="true" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
