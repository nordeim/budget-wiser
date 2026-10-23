// Session-170 (WP-1): THE DOCTRINE-STRAGGLER LIVE-CENSUS — the L-165c1
// doctrine extended to the straggler register the s169 round's own sweep
// pattern missed: the live-tense doctrine bullets that cite RETIRED
// symbols, the PAD color table the s169 fix wave never reached, the
// session-gating counts asserted against a LIVE grep, the Commands-table
// completeness against a LIVE package.json read, and the new-surface
// family (the error boundaries, the boot gate, the smoke leg, the
// artifact hygiene) pinned at birth.
//
// The audit's finding register (F-170e…u):
//   F-170e  AGENTS' reports-pipeline doctrine cites the RETIRED
//           REPORTS_PIPELINE_SLUGS + the nonexistent reportsBucketCounts
//           + the retired s10 merged-list quirk as CURRENT practice.
//   F-170f  PAD §5.2's "DEFINITIVE" color table: four stale hexes
//           (primary/foreground/line/line-soft), line-strong missing,
//           placeholders mis-attributed to --color-subtle, the contrast
//           sentence keyed off #111827.
//   F-170g  The session-gating counts wrong in three places (PAD §3.1
//           "search's public shell" phantom; PAD §6.1 "19 sessioned; the
//           10 sessionless"; SKILL §5.2 "all session-gated") — live:
//           20 sessioned / 9 sessionless (7 public auth verbs + health +
//           uploads/[name]).
//   F-170h  AGENTS' funnel doctrine cites the RETIRED FUNNEL_STAGES with
//           wrong labels (live LEADS_FUNNEL: New Leads/Contacted/
//           Qualified/Won).
//   F-170i  AGENTS names three RETIRED chart components in the present
//           tense (PipelineBarChart/WonLostLineChart/FunnelBarChart).
//   F-170j  AGENTS documents the WRONG localStorage key for the leads
//           Saved Views (neo-crm.leads.view — live .views).
//   F-170k  The AGENTS Commands table omits 7 package.json scripts
//           (+smoke lands this round — the completeness pin reads the
//           scripts LIVE).
//   F-170l  README's pricing row: $9/$19/$39 (live $8/$14/$20).
//   F-170m  PAD §4.2 lists the RETIRED SavedReport wire type + omits the
//           live Opportunity.
//   F-170n  SKILL §19's CHART_COLORS note: red/gray/violet/emerald + the
//           -400 family (live: violet/emerald only).
//   F-170o  SKILL §20 omits the Opportunity interface.
//   F-170p  SKILL Appendix A's ADR-007 row contradicts PAD §1.3's.
//   F-170q  PAD §5.1's table-header row: "12px, uppercase, wide tracking"
//           (live: font-medium text-muted-ink, Title Case, 16px base).
//   F-170r  SKILL §2's radix row says ^1 for all 6 (3 of 6 are ^2).
//   F-170s  README's file-tree charts annotation "with empty states".
//   F-170t  SKILL §8's contrast #111827 + three 16.3.6 literals.
//   F-170u  README claims MIT; no LICENSE file exists.
//   F-170a..d (the code legs): the artifact hygiene, the error
//           boundaries, the boot gate, the smoke leg — their pins ride
//           this battery's section (g) + tests/error-boundaries.test.ts +
//           tests/boot-env.test.ts + tests/chunk-recovery.test.ts.
//
// The battery's design (the house live-census doctrine): every value is
// read LIVE from the source (the constants, the types barrel, the
// globals.css tokens, the package.json scripts, the requireSession grep,
// the landing price fields, the node_modules versions) and the DOC is
// asserted to carry it. RED at birth on every stale site; GREEN when
// WP-6 flips them. Mutation-proven at birth per the house doctrine.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The whitespace-normalized views (the L-169c1 wrap-normalization form —
// the doctrine clauses wrap across lines).
const norm = (s: string) => s.replace(/\s+/g, " ");

// The installed-version census (the F-169f idiom).
const installed = (p: string) =>
  JSON.parse(readFileSync(join(root, "node_modules", p, "package.json"), "utf8")).version as string;

// The LIVE session-gating census: the ACTUAL CALL form
// (`await requireSession(`) over the 29 route files — 19 gated, 10
// ungated (the 7 public auth verbs + me [the by-design data:null face,
// session-41] + health + uploads/[name]). The bare-name grep OVERCOUNTS:
// me/route.ts mentions requireSession in its "NOT gated by design"
// comment — the L-168c2 lesson (a census definition must match the
// claim's semantics, not its string shape) caught live at birth.
const sessionedRouteFiles = execFileSync(
  "rg",
  ["-l", "await requireSession\\(", join(root, "src/app/api"), "--glob", "**/route.ts"],
  { encoding: "utf8" },
)
  .trim()
  .split("\n")
  .map((f) => f.split("src/app/api/")[1])
  .sort();
const SESSIONED_COUNT = sessionedRouteFiles.length;

// ---------------------------------------------------------------------------
// (a) The AGENTS doctrine pins (F-170e/h/i/j) — the live-tense
// Architecture-facts section scoped, wrap-normalized.
// ---------------------------------------------------------------------------
describe("session-170 (a): the AGENTS doctrine stragglers (F-170e/h/i/j)", () => {
  const agents = read("AGENTS.md");
  // The live-tense Architecture-facts section (## at line 50 → the next
  // ## heading — the s165 section-scoping idiom: the historical session
  // logs legitimately name the retired symbols; only the live-tense
  // section must not).
  const sectionStart = agents.indexOf("## Architecture facts you would otherwise guess wrong");
  const sectionEnd = agents.indexOf("## Conventions that differ from defaults");
  const archSection = norm(agents.slice(sectionStart, sectionEnd));

  it("the reports-pipeline doctrine cites the LIVE seam (pipelineStageCounts), not the retired s10 family (F-170e)", () => {
    expect(archSection).toContain("pipelineStageCounts");
    // the WRONG forms: the s10 present-tense claims (the retirement
    // MARKERS naming the retired symbols are the honest form and stay)
    expect(archSection).not.toContain("via `REPORTS_PIPELINE_SLUGS`");
    expect(archSection).not.toContain("`reportsBucketCounts` (new/contacted");
    // the retired merged-list quirk (the live seam's own header comment:
    // "a new lead is NOT also counted under 'prospecting'")
    expect(archSection).not.toContain("new≡prospecting and qualified≡qualification double-report");
  });

  it("the funnel doctrine cites the LIVE LEADS_FUNNEL vocabulary read from constants.ts (F-170h)", () => {
    const constants = read("src/lib/constants.ts");
    // the live vocabulary, live-read (the labels the ConversionFunnel rides)
    expect(constants).toContain('label: "New Leads"');
    expect(constants).toContain('label: "Contacted"');
    expect(constants).toContain('label: "Qualified"');
    expect(constants).toContain('label: "Won"');
    // the doc carries the live form + the retired FUNNEL_STAGES labels absent
    expect(archSection).toContain("LEADS_FUNNEL");
    expect(archSection).not.toContain("FUNNEL_STAGES New/Qualified/Won/Lost");
  });

  it("the chart doctrine names the LIVE family; the s13-era present-tense claims about retired components absent (F-170i)", () => {
    // the WRONG forms: the s13-era bullets narrating retired components as
    // current (the s27 family bullet's retirement MARKERS are the honest
    // form and stay)
    expect(archSection).not.toContain("explicitly on `PipelineBarChart`");
    expect(archSection).not.toContain("`FunnelBarChart` renders");
    // the live family present (the charts.tsx export census)
    const charts = read("src/components/charts/charts.tsx");
    for (const name of [
      "SingleBarChart",
      "GroupedBarsChart",
      "TrendLineChart",
      "LabelPieChart",
      "HorizontalBarChart",
      "RevenueLineChart",
      "ConversionFunnel",
    ]) {
      expect(charts).toContain(`function ${name}`); // the live export set
    }
  });

  it("the leads Saved Views key is the LIVE .views form read from lead-filters.ts (F-170j)", () => {
    const leadFilters = read("src/lib/lead-filters.ts");
    expect(leadFilters).toContain('LEAD_VIEWS_STORAGE_KEY = "neo-crm.leads.views"');
    // the doc: the live key present, the singular quoted form absent
    expect(agents).toContain("`neo-crm.leads.views`");
    expect(agents).not.toContain("`neo-crm.leads.view`");
  });
});

// ---------------------------------------------------------------------------
// (b) The Commands-table completeness pin (F-170k) — every package.json
// script key read LIVE, each asserted to appear in AGENTS' Commands table.
// ---------------------------------------------------------------------------
describe("session-170 (b): the AGENTS Commands table vs the LIVE package.json scripts (F-170k)", () => {
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
  const agents = read("AGENTS.md");
  // the table region (## Commands → the gate-order paragraph after it)
  const tableStart = agents.indexOf("## Commands");
  const tableEnd = agents.indexOf("**Gate order before every push:**");
  const table = agents.slice(tableStart, tableEnd);

  it("every package.json script appears in the Commands table (read LIVE — the table can never drift again)", () => {
    const scriptKeys = Object.keys(pkg.scripts);
    expect(scriptKeys.length).toBeGreaterThanOrEqual(19); // 18 at s169 + smoke this round
    for (const key of scriptKeys) {
      // the table documents commands as `bun run <key>` (or the bare
      // `<key>` form for the CLI-wrapped family, e.g. `db:generate`)
      expect(table.includes(`bun run ${key}`) || table.includes(`\`${key}\``)).toBe(true);
    }
  });

  it("the gate chain carries the smoke step between build and e2e (the §14 order)", () => {
    expect(pkg.scripts.gate).toContain("smoke-test.sh");
    expect(pkg.scripts.gate).toMatch(/build && \.\/scripts\/smoke-test\.sh && CI=1 bun run test:e2e/);
    expect(pkg.scripts["gate:full"]).toContain("smoke-test.sh");
    expect(pkg.scripts.smoke).toContain("scripts/smoke-test.sh");
  });
});

// ---------------------------------------------------------------------------
// (c) The PAD §5.2 color-table live-census (F-170f) — the four re-pinned
// hexes read LIVE from globals.css's @theme (the F-168h idiom).
// ---------------------------------------------------------------------------
describe("session-170 (c): the PAD §5.2 color tokens vs the LIVE globals.css @theme (F-170f)", () => {
  const pad = norm(read("Project_Architecture_Document.md"));
  const css = read("src/app/globals.css");

  // the live tokens, live-read from the @theme block
  const token = (name: string) => {
    const m = new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
    return m?.[1] as string;
  };

  it("the live token census (the four the s169 wave re-pinned everywhere EXCEPT PAD §5.2)", () => {
    expect(token("primary")).toBe("#2563eb"); // the session-7 re-pin
    expect(token("primary-hover")).toBe("#1d4ed8");
    expect(token("foreground")).toBe("#0a0a0a"); // session-13
    expect(token("line")).toBe("#e5e5e5"); // session-12 split
    expect(token("line-strong")).toBe("#e5e7eb");
    expect(token("line-soft")).toBe("#f5f5f5"); // session-14
    expect(token("muted-ink")).toBe("#737373"); // the placeholders token since s10
  });

  it("the PAD table carries the LIVE hexes + the line-strong row (F-170f)", () => {
    expect(pad).toContain("| `--color-primary` | `#2563eb` |");
    expect(pad).toContain("| `--color-foreground` | `#0a0a0a` |");
    expect(pad).toContain("| `--color-line` | `#e5e5e5` |");
    expect(pad).toContain("| `--color-line-strong` | `#e5e7eb` |");
    expect(pad).toContain("| `--color-line-soft` | `#f5f5f5` |");
    // the four stale cells retired
    expect(pad).not.toContain("| `--color-primary` | `#3b82f6` |");
    expect(pad).not.toContain("| `--color-foreground` | `#111827` |");
    expect(pad).not.toContain("| `--color-line` | `#e5e7eb` |");
    expect(pad).not.toContain("| `--color-line-soft` | `#f3f4f6` |");
  });

  it("the placeholders row names --color-muted-ink; the contrast sentence keys on #0a0a0a (F-170f)", () => {
    expect(pad).toContain("Placeholders ride `--color-muted-ink`");
    expect(pad).not.toContain("`--color-subtle` | `#9ca3af` | Placeholders");
    expect(pad).toContain("`#0a0a0a`, `#6b7280` on `#ffffff`");
  });
});

// ---------------------------------------------------------------------------
// (d) The session-gating census (F-170g) — the LIVE requireSession grep
// asserted into PAD §3.1, PAD §6.1, and SKILL §5.2.
// ---------------------------------------------------------------------------
describe("session-170 (d): the session-gating doctrine counts vs the LIVE route grep (F-170g)", () => {
  const pad = norm(read("Project_Architecture_Document.md"));
  const skill = norm(read("neo-crm_SKILL.md"));

  it(`the live census: ${SESSIONED_COUNT} requireSession-gated route files (of 29) — the CALL form is the truth`, () => {
    expect(SESSIONED_COUNT).toBe(19); // 19 gated / 10 ungated (me is the data:null face)
  });

  it("PAD §6.1 carries the 19/10 form; the 19-with-8-verbs form retired (F-170g)", () => {
    expect(pad).toContain("19 gated; the 10 ungated: the public auth family's 7 verbs");
    expect(pad).not.toContain("19 sessioned; the 10 sessionless: the public auth family's 8 verbs");
  });

  it("PAD §3.1's exception list carries the live 10-file form; the phantom search shell retired (F-170g)", () => {
    expect(pad).not.toContain("search's public shell");
    expect(pad).toContain(
      "19 gated via `requireSession()` (the 10 ungated: the public auth family's 7 verbs [rate-limited instead] + `me` [the by-design logged-out data:null face, session-41] + `health` + the regex-pinned `uploads/[name]` serving — search IS gated)",
    );
  });

  it("SKILL §5.2 carries the 10-ungated form; the blanket claim retired (F-170g)", () => {
    expect(skill).not.toContain("All `force-dynamic`, all session-gated via `requireSession()`.");
    expect(skill).toContain(
      "19 gated via `requireSession()` (the 10 ungated: the public auth family's 7 verbs",
    );
  });
});

// ---------------------------------------------------------------------------
// (e) The type/palette pins (F-170m/n/o/p/q/r) — read LIVE from the types
// barrel, the CHART_COLORS keys, PAD §1.3's ADR-007, and table.tsx.
// ---------------------------------------------------------------------------
describe("session-170 (e): the wire-type + palette + ADR-007 + table-header pins (F-170m/n/o/p/q/r)", () => {
  const pad = norm(read("Project_Architecture_Document.md"));
  const skill = norm(read("neo-crm_SKILL.md"));
  const types = read("src/types/index.ts");
  const constants = read("src/lib/constants.ts");

  it("the live wire-type census: Opportunity EXISTS, SavedReport retired (F-170m)", () => {
    expect(types).toContain("export interface Opportunity {");
    expect(types).not.toMatch(/export interface SavedReport \{/);
  });

  it("PAD §4.2 carries Opportunity; the retired SavedReport absent (F-170m)", () => {
    expect(pad).toContain("(User, Account, Contact, Lead, CrmEvent, Activity, Settings, Opportunity, plus");
    expect(pad).not.toContain("Settings, SavedReport, plus");
  });

  it("SKILL §19's CHART_COLORS note matches the LIVE key set (F-170n)", () => {
    // the live keys, live-read from the constants block
    expect(constants).toContain("violet: \"#8b5cf6\"");
    expect(constants).toContain("emerald: \"#10b981\"");
    expect(constants).not.toMatch(/CHART_COLORS = \{[\s\S]*?\bred:/);
    expect(skill).toContain("violet/emerald only");
    expect(skill).not.toContain("red/gray/violet/emerald + the `-400` family");
  });

  it("SKILL §20 carries the Opportunity interface row (F-170o)", () => {
    expect(skill).toContain("`Opportunity`");
  });

  it("SKILL Appendix A's ADR-007 row matches PAD §1.3's (F-170p)", () => {
    // PAD carries the detail-heading form; SKILL Appendix A carries the
    // index-table form — both must name the SAME decision
    expect(pad).toContain("**ADR-007: React-19-lint-clean dialog patterns (remount-via-key)**");
    expect(skill).toContain(
      "| ADR-007 | React-19-lint-clean dialog patterns (remount-via-key) |",
    );
    expect(skill).not.toContain("| ADR-007 | Vitest pure seams + Playwright golden path |");
  });

  it("PAD §5.1's table-header row carries the LIVE form (F-170q)", () => {
    const table = read("src/components/ui/table.tsx");
    expect(table).toContain("font-medium text-muted-ink"); // the live TableHead
    expect(pad).not.toContain("Table headers | System 500, 12px, uppercase, wide tracking");
    expect(pad).toContain("Table headers | System 500, muted ink, Title Case");
  });
});

// ---------------------------------------------------------------------------
// (f) The small carriers (F-170l/s/t/u + the radix split) — read LIVE from
// the landing price fields, the node_modules versions, and package.json.
// ---------------------------------------------------------------------------
describe("session-170 (f): the README/SKILL small carriers (F-170l/s/t/u + radix)", () => {
  const readme = read("README.md");
  const skill = norm(read("neo-crm_SKILL.md"));
  const landing = read("src/components/landing/landing-page.tsx");
  const pkg = JSON.parse(read("package.json")) as {
    dependencies: Record<string, string>;
  };

  it("README's pricing row matches the LIVE landing tiers (F-170l)", () => {
    // the live tiers, live-read from the price fields
    expect(landing).toContain('price: "$8"');
    expect(landing).toContain('price: "$14"');
    expect(landing).toContain('price: "$20"');
    expect(readme).toContain("$8/$14/$20 pricing tiers");
    expect(readme).not.toContain("$9/$19/$39");
  });

  it("README's charts tree annotation carries the s10 reality (F-170s)", () => {
    expect(readme).not.toContain("recharts wrappers with empty states");
    expect(readme).toContain("recharts wrappers (recharts defaults");
  });

  it("the LICENSE file exists and README's MIT row stands on it (F-170u)", () => {
    expect(existsSync(join(root, "LICENSE"))).toBe(true);
    const license = read("LICENSE");
    expect(license).toContain("MIT License");
    expect(license).toContain("Copyright (c) 2026 nordeim");
    expect(readme).toContain("MIT — same as the vendored `tw-animate-css`");
  });

  it("SKILL §2's radix row carries the LIVE ^1/^2 split read from package.json (F-170r)", () => {
    expect(pkg.dependencies["@radix-ui/react-dropdown-menu"]).toMatch(/\^2\./);
    expect(pkg.dependencies["@radix-ui/react-label"]).toMatch(/\^2\./);
    expect(pkg.dependencies["@radix-ui/react-select"]).toMatch(/\^2\./);
    expect(skill).toContain("`^1`/`^2` split (dialog/popover/slot `^1`; dropdown/label/select `^2` — live-read from package.json)");
    expect(skill).not.toContain("(6 pkgs) | `^1` |");
  });

  it("SKILL §8's contrast + the 16.3.6 literals retired (F-170t)", () => {
    const next = installed("next");
    expect(next).toMatch(/^16\.4\./); // live since the s163 bump
    expect(skill).toContain("foreground `#0a0a0a` on `#ffffff`");
    expect(skill).not.toContain("foreground `#111827` on `#ffffff`");
    // the stale version literals (the live form read from node_modules)
    expect(skill).not.toContain("next 16.3.6");
    expect(skill).not.toContain("(v16.3.6)");
  });
});

// ---------------------------------------------------------------------------
// (g) The NEW-surface pins (F-170a..d's doc face) — the error-boundary
// family, the boot gate, the smoke leg, and the artifact hygiene carry
// their documentation + config carriers.
// ---------------------------------------------------------------------------
describe("session-170 (g): the new-surface family — the boundaries, the boot gate, the smoke leg, the artifact hygiene", () => {
  const readme = read("README.md");
  const agents = read("AGENTS.md");
  const claude = read("CLAUDE.md");
  const config = read("next.config.ts");
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };

  it("the README file tree documents the four new surfaces", () => {
    expect(readme).toContain("error.tsx");
    expect(readme).toContain("global-error.tsx");
    expect(readme).toContain("instrumentation.ts");
    expect(readme).toContain("smoke-test.sh");
  });

  it("the AGENTS gate-order line + CLAUDE's gate row carry the smoke step (the §14 order)", () => {
    expect(agents).toContain("`bun run smoke`");
    expect(claude).toContain("`bun run smoke`");
    expect(claude).toContain("lint → typecheck → test → build → smoke → e2e");
  });

  it("next.config.ts carries the artifact-hygiene excludes (the verified cure)", () => {
    expect(config).toContain("outputFileTracingExcludes");
    for (const excluded of [".git/**", "db/**", "uploads/**", "skills/**", "docs/**", ".env"]) {
      expect(config).toContain(`"${excluded}"`);
    }
  });

  it("the build script removes Next's explicit .env copy from the artifact (the double-cure)", () => {
    expect(pkg.scripts.build).toContain("rm -f .next/standalone/.env");
  });

  it("the smoke script exists as a repo file", () => {
    expect(existsSync(join(root, "scripts/smoke-test.sh"))).toBe(true);
  });

  it("CLAUDE documents the boundary family + the boot posture", () => {
    expect(claude).toContain("error.tsx");
    expect(claude).toContain("global-error.tsx");
    expect(claude).toContain("instrumentation.ts");
    expect(claude).toContain("fails hard at boot");
  });
});
