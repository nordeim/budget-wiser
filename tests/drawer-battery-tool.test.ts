import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-96 (S96-P1): the drawer battery tool — the F-96a1 fix + the
// encoded s94/s95 protocol, pinned. The battery (scripts/
// drawer-battery-390.ts) is the standing mobile-nav verification tool
// (the operator's particular ask); the 96-a audit found its step-5
// resize-past-md probe ran against a CLOSED drawer — the auto-close
// listener at mobile-nav.tsx:54-62 only registers while OPEN, so the
// probe could never go red for an s8-class regression. These pins anchor
// the corrected construction (the reopen) + the exact-selector protocol
// the s94/s95 sessions debugged into it.

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

describe("session-96 (S96-P1): the drawer battery tool — the F-96a1 reopen fix + the encoded protocol", () => {
  it("step 5 REOPENS the drawer before the resize-past-md probe (F-96a1: the auto-close listener only registers while open)", () => {
    const src = read("scripts/drawer-battery-390.ts");
    // the resize step must run against an OPEN drawer: a second open
    // (after the Escape-close step) precedes the setViewportSize grow
    const resizeIdx = src.indexOf("setViewportSize");
    expect(resizeIdx).toBeGreaterThan(0);
    const before = src.slice(0, resizeIdx);
    // the reopen: a second trigger click after the Escape-close block
    const escapeIdx = before.lastIndexOf("Escape");
    expect(escapeIdx).toBeGreaterThan(0);
    const between = before.slice(escapeIdx);
    expect(between).toMatch(/trigger\.click\(\)/);
    // and the drawer must be verified OPEN again before resizing (the
    // panel probe re-resolves — the s147 data-state form)
    expect(between).toMatch(/data-state="open"|panelOpen/);
  });

  it("the exact-selector protocol (s147 re-anchor): the panel IS the open dialog content — [role=\"dialog\"][data-state=\"open\"] (the Radix sheet has no inner wrapper)", () => {
    const src = read("scripts/drawer-battery-390.ts");
    // the s94 probe-trap lesson survives in the s147 form: probe the
    // CONTENT element (data-state open), never a stale wrapper — and
    // the closed state is UNMOUNTED (Radix), so closed-probes count
    // dialogs instead of reading visibility
    expect(src).toContain('[role="dialog"][data-state="open"]');
    expect(src).not.toContain("h-dvh");
    expect(src).toContain('button[aria-label="Open navigation"]');
    expect(src).not.toContain('Open navigation menu');
  });

  it("the navigate-close wait is URL-based on the CAPITAL /Leads route (the s24 route-case construction — the dev server compiles it on first visit)", () => {
    const src = read("scripts/drawer-battery-390.ts");
    expect(src).toMatch(/waitForURL[\s\S]*?Leads/);
  });

  it("the battery keeps the dual body+main scroll-lock probe and the REAL-user-click doctrine (locator clicks, never synthetic el.click())", () => {
    const src = read("scripts/drawer-battery-390.ts");
    expect(src).toMatch(/overflow[\s\S]*hidden/);
    // no synthetic clicks
    expect(src).not.toMatch(/\.click\(\)\s*;?\s*\/\/\s*synthetic/);
  });

  it("navigates to the CRM shell after login — the post-login page is the PUBLIC landing since the s142 route move (N-144b1)", () => {
    const src = read("scripts/drawer-battery-390.ts");
    // Session-144 (D-144a0/N-144b1): the s142 route move left this
    // standalone tool stale — post-login redirects to the PUBLIC
    // landing `/` (no CRM drawer trigger there), so the battery timed
    // out deterministically at the trigger probe. The re-anchor: an
    // explicit goto("/Dashboard") between the login wait and the
    // trigger locator — the same re-anchor the e2e crm specs got at
    // s142 (the route-move blast radius: grep every post-login
    // expectation when a route moves, not just the failing carriers).
    const loginIdx = src.indexOf("waitForURL((u) => !u.pathname.endsWith");
    expect(loginIdx).toBeGreaterThan(0);
    const triggerIdx = src.indexOf('button[aria-label="Open navigation"]');
    expect(triggerIdx).toBeGreaterThan(loginIdx);
    const between = src.slice(loginIdx, triggerIdx);
    expect(between).toMatch(/goto\([^)]*Dashboard/);
  });
});
