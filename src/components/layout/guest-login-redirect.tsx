"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// Session-147 (F-147c2 — the guest re-gating): the reference's new bundle
// LOGIN-WALLS its marketing pages (walk37: guest /About → 200 HTML, then
// a CLIENT-side guard redirect to /login?from_url=<absolute-url>; its
// post-login returns to the from_url target). This shim is that guard,
// mirrored: the LAYOUT makes the session decision SERVER-side (a guest
// never receives the page's HTML — the shim renders instead of the
// shell + children), and the navigation itself rides the client, the
// reference's own mechanism. The (app) group's old server 307 retired
// with it: the from_url round-trip needs the current URL, which a
// server layout cannot know (headers() carries no path — probed live
// this session), and the reference's own guard is client-side anyway.
export function GuestLoginRedirect() {
  const router = useRouter();

  React.useEffect(() => {
    // location.href (the ABSOLUTE URL, query included) — the reference's
    // own from_url form, urlencoded exactly like its guard
    router.replace(`/login?from_url=${encodeURIComponent(window.location.href)}`);
  }, [router]);

  // Nothing paints — the wall is the login page the guard lands on
  return null;
}
