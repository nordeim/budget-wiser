import { describe, expect, it } from "vitest";
import { isNavActive } from "@/components/layout/nav-config";

// Session-147 (D-147a1): the shared nav-active predicate — extracted
// from the SidebarNav component so the desktop sidebar AND the new
// mobile Sheet drawer (the s147 parity re-derivation) resolve the same
// active state. The rules are the s24 live decode: CASE-INSENSITIVE
// matching (the reference highlights Reports at lowercase /reports),
// the Dashboard root special case (both "/" and "/Dashboard" are the
// dashboard — the post-login redirect lands on the root), and the
// prefix rule for nested segments.
describe("session-147: isNavActive — the shared nav-active predicate (the s24 rules, extracted)", () => {
  it("exact matching is case-insensitive (the reference highlights at both casings)", () => {
    expect(isNavActive("/Reports", "/Reports")).toBe(true);
    expect(isNavActive("/reports", "/Reports")).toBe(true);
    expect(isNavActive("/REPORTS", "/Reports")).toBe(true);
    expect(isNavActive("/accounts", "/Accounts")).toBe(true);
  });

  it("the Dashboard root special case — both / and /Dashboard are the dashboard", () => {
    expect(isNavActive("/", "/Dashboard")).toBe(true);
    expect(isNavActive("/Dashboard", "/Dashboard")).toBe(true);
    // a deeper page never activates Dashboard
    expect(isNavActive("/accounts", "/Dashboard")).toBe(false);
    expect(isNavActive("/", "/Accounts")).toBe(false);
  });

  it("prefix matching covers nested segments (the trailing-slash guard)", () => {
    expect(isNavActive("/Accounts/123", "/Accounts")).toBe(true);
    expect(isNavActive("/accounts/123", "/accounts")).toBe(true);
    // a same-prefix DIFFERENT page never matches (the /reports-x hazard)
    expect(isNavActive("/reports-extra", "/Reports")).toBe(false);
    expect(isNavActive("/activities", "/Activity")).toBe(false);
  });

  it("the settings footer item activates only at /Settings (both casings)", () => {
    expect(isNavActive("/Settings", "/Settings")).toBe(true);
    expect(isNavActive("/settings", "/Settings")).toBe(true);
    expect(isNavActive("/", "/Settings")).toBe(false);
    expect(isNavActive("/settings/general", "/Settings")).toBe(true);
  });
});
