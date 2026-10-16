import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// ---------------------------------------------------------------------------
// Session-137 (the 137-c rotation — THE SETTINGS PICKLIST-EDITOR FAMILY
// FRESH-EYES WALK): the freeze pins. The walk28 verdict — ZERO REAL PARITY
// DEFECTS (PASS 1 both-zeroes byte-equal modulo the documented genera; PASS 2
// every seeded contract holding incl. the maiden hover arms; the reference's
// add flow a documented no-op) — means the remediation is PIN-ONLY: the five
// never-ordered sets (the L-137a6 gap — the freeze-pin genus's LAST family:
// accounts s133, dashboard s134, contacts s135, leads s136, settings s137)
// get their ordered-unit pins so any future drift REDs exactly one assertion.
// ---------------------------------------------------------------------------

const here = path.dirname(new URL(import.meta.url).pathname);
const repo = path.resolve(here, "..");

function settingsPage(): string {
  const p = path.join(repo, "src/app/(app)/settings/settings-page.tsx");
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function pageLayout(): string {
  const p = path.join(repo, "src/lib/page-layout.ts");
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

/** Word-boundary containment — the L-135c3 discipline (a mutated longer
 *  word must RED rather than pass as a substring). */
function hasWord(haystack: string, word: string): boolean {
  const re = new RegExp(`(^|[^a-zA-Z])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-zA-Z]|$)`);
  return re.test(haystack);
}

describe("session-137: the freeze pins (L-137a6 — the never-ordered sets)", () => {
  it("the 5 picklist panel titles as an ORDERED SET (the walk's card census)", () => {
    // The walk's two-app census: the Config tab renders exactly 5 picklist
    // cards — Contact Sources / Lead Stages / Activity Types / Account
    // Tiers / Industries — byte-equal both apps (titles, chrome, empty
    // states, add-inputs, add buttons, the 552×2 grid). The titles ride the
    // ListEditor `title` props in document order; zero ordered-set
    // assertions existed before this pin.
    const src = settingsPage();
    const i = src.indexOf("function ConfigEditor");
    const j = src.indexOf("type ListKey");
    expect(i).toBeGreaterThan(-1);
    expect(j).toBeGreaterThan(i);
    const editor = src.slice(i, j);
    const titles = ["Contact Sources", "Lead Stages", "Activity Types", "Account Tiers", "Industries"];
    let cursor = -1;
    for (const t of titles) {
      const at = editor.indexOf(`title="${t}"`, cursor + 1);
      expect(at, `the title "${t}" in document order after #${titles.indexOf(t)}`).toBeGreaterThan(cursor);
      cursor = at;
    }
    expect(editor.split("<ListEditor").length - 1, "exactly 5 ListEditor call sites").toBe(5);
  });

  it("the 3 settings tab labels as an ORDERED SET (the walk's tablist census)", () => {
    // The walk's census: the segmented tablist renders exactly 3 triggers —
    // CRM Configuration / Defaults / Data — byte-equal both apps (texts,
    // rects, fonts, the active-pill family, the track). The labels ride the
    // Tabs `tabs` prop in order; only the e2e behavioral wiring pinned them.
    const src = settingsPage();
    const i = src.indexOf("tabs={[");
    const j = src.indexOf("]}", i);
    expect(i).toBeGreaterThan(-1);
    const tabs = src.slice(i, j);
    const labels = ["CRM Configuration", "Defaults", "Data"];
    let cursor = -1;
    for (const l of labels) {
      const at = tabs.indexOf(`label: "${l}"`, cursor + 1);
      expect(at, `the tab "${l}" in order`).toBeGreaterThan(cursor);
      cursor = at;
    }
    expect(tabs.split('label: "').length - 1, "exactly 3 tabs").toBe(3);
  });

  it("the 5 add-input placeholders as an ORDERED SET (incl. the reference's Industries typo)", () => {
    // The walk's add-input census: every card's add-input renders the
    // reference's own placeholder vocabulary — the 4 regular + the
    // "Add new industrie" TYPO (the reference's own, pinned at s72, the SET
    // never). The 4 regular ride ListEditor placeholder props; the typo
    // rides SETTINGS_PICKLIST.industriesPlaceholder.
    const src = settingsPage();
    const placeholders = [
      "Add new contact source",
      "Add new lead stage",
      "Add new activity type",
      "Add new account tier",
    ];
    let cursor = -1;
    for (const ph of placeholders) {
      const at = src.indexOf(`placeholder="${ph}"`, cursor + 1);
      expect(at, `the placeholder "${ph}" in document order`).toBeGreaterThan(cursor);
      cursor = at;
    }
    const layout = pageLayout();
    const seg = layout.slice(
      layout.indexOf("SETTINGS_PICKLIST = {"),
      layout.indexOf("} as const;", layout.indexOf("SETTINGS_PICKLIST = {")),
    );
    expect(hasWord(seg, "Add new industrie")).toBe(true);
    expect(seg, "the typo placeholder is NOT the corrected 'industry'").not.toContain("Add new industry");
  });

  it("the Defaults 6 field labels as an ORDERED SET (the W-7 genus's settings face)", () => {
    // The walk's Defaults census: the single-column card renders the 6
    // groups — Default Currency / Default Lead Stage / Default Account
    // Tier / Follow-up Days After Activity / Default Calendar View /
    // First Day of Week — byte-equal both apps (labels, fonts, inks, the
    // controlMt geometry, the select triggers' resting ink). e2e held the
    // set (settings-mobile.spec.ts); the unit never did.
    const src = settingsPage();
    const i = src.indexOf("function DefaultsEditor");
    const j = src.indexOf("return (", i);
    expect(i).toBeGreaterThan(-1);
    const body = src.slice(i, src.length);
    const labels = [
      "Default Currency",
      "Default Lead Stage",
      "Default Account Tier",
      "Follow-up Days After Activity",
      "Default Calendar View",
      "First Day of Week",
    ];
    let cursor = -1;
    for (const l of labels) {
      const at = body.indexOf(`>${l}</Label>`, cursor + 1);
      expect(at, `the label "${l}" in document order`).toBeGreaterThan(cursor);
      cursor = at;
    }
    expect(body.split("<Label").length - 1, "exactly 6 labels in the Defaults editor").toBe(6);
  });

  it("the picklist interactive chrome (the walk's maiden hover/add contracts)", () => {
    // The walk's PASS 2 + the reference drive: the add button's DARK family
    // (bg-neutral-900 + hover:bg-neutral-900/90 — the reference's own
    // rgba(23,23,23,0.9) hover, byte-equal) · the delete button's red pair
    // (text-red-600 + hover:text-red-700 — the live hover rgb(185,28,28)) ·
    // the row's hover:bg-gray-50 (the live rgb(249,250,251)) · the "No
    // items yet" empty literal — all live-verified, none unit-pinned.
    const layout = pageLayout();
    const seg = layout.slice(
      layout.indexOf("SETTINGS_PICKLIST = {"),
      layout.indexOf("} as const;", layout.indexOf("SETTINGS_PICKLIST = {")),
    );
    expect(seg).toContain('itemRow: "flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50"');
    expect(seg).toContain('deleteBtn: "text-red-600 hover:text-red-700"');
    expect(seg).toContain('addButton: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 shadow h-9 px-4 py-2"');
    // the empty-state literal (the reference's own copy — the 137-a
    // unpinned-literal gap)
    const src = settingsPage();
    expect(src, 'the empty state renders the reference\'s literal').toContain(
      'items.length === 0 && <p className={SETTINGS_PICKLIST.empty}>No items yet</p>',
    );
    // the rename row's ghost pair (the s130 fix's stock ghost variant —
    // the live hover rgb(245,245,245)/rgb(23,23,23)); 4 rides: Save/X/
    // Pencil/Trash2 — multi-line attrs tolerated
    expect(src.match(/size="icon"\s+variant="ghost"/g)?.length).toBe(4);
  });
});
