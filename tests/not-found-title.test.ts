import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { notFoundQuotedPath, notFoundTitle } from "@/lib/not-found-title";

// Session-196: the 404 surface's TITLE + QUOTED-PATH form — live-probed
// on the reference (2026-10-28, 9 paths, post-hydration reads). The
// reference's SPA answers a 404 with the tab title
//   "<Humanized last non-empty segment> | Budget Wise"
// where the humanize splits hyphens AND camelCase boundaries and
// capitalizes each token's first letter while preserving the rest — and
// its body message quotes the unmatched pathname WITHOUT the leading
// slash (trailing/internal slashes kept). The s191 pin captured the
// reference's SERVED head (the plain "Budget Wise" — still our SSR
// metadata); the client-side update that follows is the visible form
// the user sees in the tab, mirrored here by the NotFoundBody effect.
//
// The probed matrix (all Verified against the live reference):
//   /About                → "About | Budget Wise"
//   /signup               → "Signup | Budget Wise"  (still the 404 — the reference 404s it)
//   /nonexistent-route-xyz → "Nonexistent Route Xyz | Budget Wise"
//   /foo/bar              → "Bar | Budget Wise"     (the LAST segment humanizes)
//   /some-fake-route      → "Some Fake Route | Budget Wise"
//   /iPhoneCaseTEST       → "I Phone Case TEST | Budget Wise" (camelCase split)
//   /UPPER                → "UPPER | Budget Wise"   (rest-case preserved)
//   /a-b-c                → "A B C | Budget Wise"
//   /foo/                 → "Foo | Budget Wise"     (trailing slash: last NON-EMPTY segment)

const bodySrc = () =>
  readFileSync(
    path.resolve(import.meta.dirname, "..", "src/app/not-found-body.tsx"),
    "utf8",
  );

describe("the 404 title humanize (live-probed on the reference, 2026-10-28)", () => {
  it("humanizes the plain single segment", () => {
    expect(notFoundTitle("/About")).toBe("About | Budget Wise");
    expect(notFoundTitle("/signup")).toBe("Signup | Budget Wise");
  });

  it("splits hyphens into words and capitalizes each", () => {
    expect(notFoundTitle("/nonexistent-route-xyz")).toBe(
      "Nonexistent Route Xyz | Budget Wise",
    );
    expect(notFoundTitle("/some-fake-route")).toBe(
      "Some Fake Route | Budget Wise",
    );
    expect(notFoundTitle("/a-b-c")).toBe("A B C | Budget Wise");
  });

  it("humanizes the LAST segment of a multi-segment path", () => {
    expect(notFoundTitle("/foo/bar")).toBe("Bar | Budget Wise");
    expect(notFoundTitle("/fake/deep/route")).toBe("Route | Budget Wise");
  });

  it("splits camelCase boundaries, preserving each token's rest-case", () => {
    // "iPhoneCaseTEST" → ["i","Phone","Case","TEST"] → "I Phone Case TEST"
    expect(notFoundTitle("/iPhoneCaseTEST")).toBe(
      "I Phone Case TEST | Budget Wise",
    );
    expect(notFoundTitle("/UPPER")).toBe("UPPER | Budget Wise");
  });

  it("a trailing slash falls back to the last NON-EMPTY segment", () => {
    expect(notFoundTitle("/foo/")).toBe("Foo | Budget Wise");
  });

  it("an empty humanized form falls back to the plain site title", () => {
    // The guard: "/" itself never 404s (the landing serves it), but the
    // helper must never produce " | Budget Wise".
    expect(notFoundTitle("/")).toBe("Budget Wise");
    expect(notFoundTitle("///")).toBe("Budget Wise");
  });
});

describe("the 404 quoted path (the reference strips ONLY the leading slash)", () => {
  it("strips the leading slash, keeping internal + trailing slashes", () => {
    expect(notFoundQuotedPath("/fake/deep/route")).toBe("fake/deep/route");
    expect(notFoundQuotedPath("/foo/")).toBe("foo/");
    expect(notFoundQuotedPath("/About")).toBe("About");
    expect(notFoundQuotedPath("/nonexistent-route-xyz")).toBe(
      "nonexistent-route-xyz",
    );
  });
});

describe("the NotFoundBody wiring (the surface consumes the helpers)", () => {
  it("quotes the path through notFoundQuotedPath (no leading slash)", () => {
    expect(bodySrc()).toContain("notFoundQuotedPath(safePath)");
    // The bare interpolation (the old "/pathname" form) is retired.
    expect(bodySrc()).not.toContain("&quot;{pathname}&quot;");
  });

  it("owns the title server-side (generateMetadata + the x-pathname stamp)", () => {
    // The reference serves the interpolated title in its HTML head
    // (curl-verified); our not-found generates it server-side. A client
    // document.title effect was probed and DISCARDED — the metadata
    // reconciliation re-applies the static title over it during
    // hydration.
    const wrapper = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/app/not-found.tsx"),
      "utf8",
    );
    expect(wrapper).toMatch(/generateMetadata/);
    expect(wrapper).toContain("notFoundTitle(pathname)");
    expect(wrapper).toContain('headerList.get("x-pathname")');
    expect(bodySrc()).not.toContain("document.title");

    // The middleware stamps x-pathname for every routed request (the
    // only way the unmatched path reaches the render — probed: no path
    // header exists otherwise).
    const middleware = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/middleware.ts"),
      "utf8",
    );
    expect(middleware).toContain('requestHeaders.set("x-pathname"');
    expect(middleware).toContain("NextResponse.next({ request: { headers: requestHeaders } })");
  });
});
