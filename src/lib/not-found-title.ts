// Session-196: the 404 surface's TITLE + QUOTED-PATH helpers —
// live-probed on the reference (2026-10-28, 9 paths). The reference's
// SPA answers a 404 with the tab title
//   "<Humanized last non-empty path segment> | Budget Wise"
// and its body message quotes the unmatched pathname WITHOUT the
// leading slash (internal + trailing slashes kept).
//
// The humanize transformation (every case pinned by a live probe):
//   "About"                → "About"          (plain single segment)
//   "nonexistent-route-xyz"→ "Nonexistent Route Xyz" (hyphen split)
//   "bar"  (from /foo/bar) → "Bar"            (the LAST segment)
//   "iPhoneCaseTEST"       → "I Phone Case TEST" (camelCase split)
//   "UPPER"                → "UPPER"          (rest-case preserved)
//   "foo"  (from /foo/)    → "Foo"            (last NON-EMPTY segment)
//
// The title update happens CLIENT-SIDE (the reference is an SPA; its
// served head carries the root title, its client updates the tab) —
// the NotFoundBody effect consumes notFoundTitle(); the SSR metadata
// keeps the s191 absolute "Budget Wise" (the served-head parity pin).

const SITE_TITLE = "Budget Wise";

/**
 * Session-207 (F-1): the reference's platform DECODES the pathname
 * before interpolating the 404 title — live-probed 2026-10-29 on the
 * reference's served HTML head: /Curl%20Probe%20207%20Test answers
 * "Curl Probe 207 Test | Budget Wise", /About%20Us answers
 * "About Us | Budget Wise", and /foo%2Dbar answers "Foo Bar | Budget
 * Wise" (the decode PRECEDES the hyphen split). The proxy's
 * x-pathname stamp preserves the escapes (Next's NextURL.pathname),
 * so the decode lives HERE in the title path only — the 404 BODY
 * quotes the raw encoded path on BOTH apps (probed), which is why
 * notFoundQuotedPath() stays untouched. Malformed escapes
 * (decodeURIComponent would throw URIError on e.g. "%zz") fall back
 * to the raw segment: the reference's CDN bounces that input class
 * with a bare 400 Bad Request; ours answers the designed 404, and the
 * helper must never turn a bad URL into a 500.
 */
function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/**
 * The humanized last non-empty path segment — "route" → "Route",
 * "nonexistent-route-xyz" → "Nonexistent Route Xyz",
 * "iPhoneCaseTEST" → "I Phone Case TEST", "UPPER" → "UPPER".
 */
function humanizeSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** The 404 tab title: "<Humanized last segment> | Budget Wise"
 *  (falls back to the plain site title when the humanized form is
 *  empty — "/" itself never 404s, but the helper must never produce
 *  " | Budget Wise"). */
export function notFoundTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments.length > 0 ? segments[segments.length - 1] : "";
  // Session-207 (F-1): decode precedes the hyphen/camelCase split —
  // the reference answers "/foo%2Dbar" identically to "/foo-bar".
  const humanized = humanizeSegment(decodeSegment(last));
  return humanized ? `${humanized} | ${SITE_TITLE}` : SITE_TITLE;
}

/** The 404 message's quoted path: the reference strips ONLY the
 *  leading slash — "/fake/deep/route" → "fake/deep/route",
 *  "/foo/" → "foo/", "/About" → "About". */
export function notFoundQuotedPath(pathname: string): string {
  return pathname.replace(/^\//, "");
}
