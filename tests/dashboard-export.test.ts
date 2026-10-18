import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-47 pins (S47-P1): the dashboard export rewire — the F-47a audit.
// The five affordances (the outline Export's four menu items + the primary
// Export) rode downloadFile("/api/export?type=…&download=1") — dead since
// the s29 re-scope (export/route.ts answers type=report only; every entity
// click NAVIGATED the browser to the raw 400 JSON body). The reference's
// own header trio is dead (no onClick — bundle-verified); ours is the
// DOCUMENTED functional superset (dashboard-contracts.test.ts, the
// session-33 filter-bar/trio comment block — s64 refresh), now wired to
// the CLIENT-SIDE entity-export family — the pages' own s26/s29
// conventions verbatim: the builders, the filenames, the zero-guards.
//
// Session-142 (D-142b0) RE-SCOPE: the reference's index-Dc6wvGtA.js bundle
// retired the s33 header trio — its header row carries exactly ONE button
// (the blue primary Export; live-censused at 1440 + 390, no Add anywhere
// on the page). Our export-menu dropdown + the three entity builders
// (contacts/accounts/activities) retired with the reference's own
// buttons; the ONE-CLICK LEADS EXPORT stays (the primary button's job
// since s47). Those entity builders' conventions live on their OWN pages
// (contacts/accounts/settings) — pinned there; the dashboard's remaining
// export surface is the leads builder alone.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

function stripComments(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const page = () => stripComments(read("src/app/(app)/dashboard/page.tsx") ?? "");

/** Slice a bounded region at an anchor (a failed anchor fails the pin). */
function regionAt(src: string, anchor: string, span: number): string {
  const at = src.indexOf(anchor);
  expect(at).toBeGreaterThanOrEqual(0);
  return src.slice(at, at + span);
}

describe("session-47+142: the dashboard export — the single-affordance re-scope (S47-P1 / D-142b0)", () => {
  it("the page carries ZERO /api/export references and ZERO downloadFile calls", () => {
    const src = page();
    expect(src).not.toMatch(/\/api\/export/);
    expect(src).not.toMatch(/downloadFile/);
    // The client-side family is the download seam now.
    expect(src).toMatch(/downloadBlob/);
  });

  it("the retired entity builders NEVER return (contacts/accounts/activities gone with the s33 trio)", () => {
    const src = page();
    expect(src).not.toMatch(/function exportContactsCsv/);
    expect(src).not.toMatch(/function exportAccountsCsv/);
    expect(src).not.toMatch(/function exportActivitiesCsv/);
    // the export-menu dropdown itself is gone
    expect(src).not.toMatch(/<DropdownItem onClick=\{exportContactsCsv\}/);
  });

  it("the primary Export is the one-click leads export (the s47 job, the s142 survivor)", () => {
    const src = page();
    const at = src.indexOf("DASHBOARD_HEADER.primaryExportLabel");
    expect(at).toBeGreaterThanOrEqual(0);
    // The button's opening tag (onClick precedes the label node).
    const region = src.slice(Math.max(0, src.lastIndexOf("<Button", at)), at + 200);
    expect(region).toMatch(/onClick=\{exportLeadsCsv\}/);
  });

  it("the leads builder = the leads-page convention verbatim (unquotedHeaderCsv, 8 columns, entityExportFilename)", () => {
    const src = page();
    const region = regionAt(src, "function exportLeadsCsv", 800);
    expect(region).toMatch(/unquotedHeaderCsv\(/);
    expect(region).toMatch(/entityExportFilename\("Leads"\)/);
    expect(region).toMatch(/downloadBlob\(/);
    // The reference's 8-column set, in its order (the S29-P5 U-bundle extract).
    for (const col of ["Name", "Email", "Phone", "Company", "Value", "Status", "Source", "Next Follow-up"]) {
      expect(region).toContain(`"${col}"`);
    }
    // The rows come from the store's leads slice.
    expect(region).toMatch(/leads\.map\(/);
  });
});

describe("session-142: the Export disabled state (D-142b0)", () => {
  it("the Export is DISABLED at zero leads — the reference's own data-driven guard (the stock opacity-50 face)", () => {
    const src = page();
    // Live-censused on the reference's new bundle: its Export renders
    // disabled=true + opacity 0.5 at its standing zero-data state (the
    // half-blue (142,173,242) face the sweep's phone cluster decoded);
    // the stock disabled:opacity-50 arm does the rendering.
    const at = src.indexOf("DASHBOARD_HEADER.primaryExportLabel");
    expect(at).toBeGreaterThanOrEqual(0);
    const region = src.slice(Math.max(0, src.lastIndexOf("<Button", at)), at + 300);
    expect(region).toMatch(/disabled=\{leads\.length === 0\}/);
  });
});
