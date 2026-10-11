// Session-102 pins (S102-P1): the secondary-sites lockstep — the
// F-99a1/F-102a2 recurring stale-count genus retired. Twice now the
// audits have caught the SAME defect: the headline count sites
// (README badge · AGENTS commands · CLAUDE ×4 · PAD Total) ride the
// per-session lockstep re-anchor, but the SECONDARY live-tense sites
// — the README file tree + commands comment, the PAD file tree, the
// PAD "HEAD:" line, the PAD checklist + commands table — do not, so
// they silently re-stale every session the count grows (F-99a1 was
// exactly PAD:358 at s99; F-102a2 caught 6 such sites at s102, with
// README:178's suite list also missing the s101 drift-probe-tool).
// These pins put every live-tense count site under the unit gate: a
// stale count anywhere now fails `bun run test`.
//
// Scope discipline (the F-100a2 history-record doctrine): the pins
// assert the LIVE-TENSE sites only. The AGENTS §Session-N history
// blocks and the PAD per-session inventory rows keep their historical
// numbers by design — records of what was true then, not living count
// sites — so the stale-form negatives below use the scoped grep-verified
// forms ("103 Vitest suites" · "1880 checks" · "1880/1880" ·
// "1880 unit checks"), never a bare whole-file number ban.
//
// The count ladder (the lockstep carry-forward, re-anchored each
// session the suite count grows): s101 1892 → s102 1903 (+11 — that
// suite's own 11 its) → s103 1915 (+12 — the seeded-charts suite's 11
// freeze pins + the s103-maiden sweep-tool floor pin; 1914 was a
// never-shipped in-flight intermediate — the 320 maiden tripped the
// login genus mid-session, adding its pin after the first realign;
// N-103a1's it-name line citations re-anchored in the same touch: the
// s102 PAD inventory-row insertion had shifted the Total :782→:783,
// HEAD :795→:796, checklist :1217→:1218, commands :1287→:1288) →
// s104 1921 (+6 — the e2e-count lockstep extension: the AGENTS/CLAUDE/
// README/PAD e2e-site pins + the e2e stale-form negatives + the
// mobile-nav suite-count pin; the FIRST e2e-count change since s102
// built the lockstep exposed the ten unpinned live-tense e2e sites —
// the F-99a1 genus on the e2e axis). The e2e census itself grows
// 132 → 133 (the S104-P2 drawer-OPEN seeded-state guard in the mobile
// spec).

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

const UNIT = 1921;
const E2E = 133;
const SUITES = 106;
// S104-P1: the mobile-nav spec's own census (the README Tested-row
// phrase + the PAD suite line ride it) — 9 → 10 with the drawer-OPEN
// seeded-state guard.
const MOBILE_NAV_E2E = 10;

describe("session-102 (S102-P1): the secondary-sites lockstep — every live-tense count site pinned", () => {
  it("README badge carries the unit + e2e arithmetic (1921 + 133 = 2054)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`tests-${UNIT + E2E}%20checks`);
  });

  it("README file tree carries the live suite + check counts (the :125 site — F-99a1's README face)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`# ${SUITES} Vitest suites (${UNIT} checks)`);
  });

  it("README commands comment carries the live unit count AND the three newest suites in the list (the :178 site — F-102a2: 1880 stale + drift-probe-tool missing)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`# ${UNIT} Vitest unit checks (`);
    // the suite list must carry the s101 + s102 + s103 additions (F-102a2's second face)
    expect(readme).toContain("drift-probe-tool");
    expect(readme).toContain("docs-counts");
    expect(readme).toContain("seeded-charts");
  });

  it("README Tested row carries the live counts (the headline live-tense row)", () => {
    const readme = read("README.md");
    expect(readme).toContain(
      `${UNIT} Vitest unit checks + ${E2E} Playwright E2E checks`,
    );
  });

  it("AGENTS commands table carries the live unit count (the :20 site)", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain(`Unit tests (${UNIT} checks)`);
  });

  it("AGENTS gate-order line carries the live count (the :29 site)", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain("`bun run test` (" + `${UNIT})`);
  });

  it("PAD file tree carries the live suite + check counts (the :358 site — exactly F-99a1)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`# ${SUITES} Vitest suites — ${UNIT} checks`);
  });

  it("PAD Total row carries the live totals (the site-form anchor — the PAD line citations retired: the inventory table grows every session by design, the N-103a1 treadmill)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(
      `| **Total** | **${SUITES}** | **${UNIT} unit + ${E2E} e2e** |`,
    );
  });

  it("PAD HEAD line carries the live counts (the site-form anchor)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(
      `HEAD: ${SUITES} Vitest suites with ${UNIT} checks + ${E2E} e2e checks in 3 spec`,
    );
  });

  it("PAD checklist + commands table carry the live count (the site-form anchors)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain("`bun run test` — " + `${UNIT}/${UNIT}`);
    expect(pad).toContain(`| \`bun run test\` | root | ${UNIT} unit checks |`);
  });

  it("the retired stale forms never return to the live-tense sites (the F-99a1/F-102a2 genus guard — SITE-FORM anchors: an inventory row QUOTING a banned form documents the ban, it does not reinstate it)", () => {
    const readme = read("README.md");
    // the forms as they appear AT the live-tense sites — the "# "
    // comment prefix (the file trees + the commands comment) and the
    // retired badge. A bare quoted mention in a session-history clause
    // does not match them (the WIDENED-guard doctrine, the F-98a1
    // string-concatenation lesson applied to docs).
    expect(readme).not.toMatch(/# 103 Vitest suites/);
    expect(readme).not.toMatch(/# 1880 Vitest unit checks/);
    expect(readme).not.toMatch(/tests-2024%20checks/);
    const pad = read("Project_Architecture_Document.md");
    // PAD keeps per-session history rows that may QUOTE the banned
    // forms while documenting this ban — the anchors below match only
    // the site constructions themselves, never a quoted mention.
    expect(pad).not.toMatch(/# 103 Vitest suites/);
    expect(pad).not.toMatch(/HEAD: 103 Vitest/);
    expect(pad).not.toMatch(/— 1880\/1880/);
    expect(pad).not.toMatch(/\| 1880 unit checks \|/);
    expect(pad).not.toMatch(/# 1880 Vitest unit checks/);
  });

  // ------------------------------------------------------------------
  // Session-104 (S104-P1): the E2E-COUNT LOCKSTEP EXTENSION — the
  // F-99a1/F-102a2 stale-count genus on the e2e axis. The s102 lockstep
  // pinned the UNIT sites; the e2e census had been frozen at 132 for so
  // long that its ten live-tense sites never went stale — until S104-P2
  // grew the mobile spec (132 -> 133) and every unpinned e2e site was
  // one edit away from the recurring genus. These pins put them under
  // the same unit gate.
  // ------------------------------------------------------------------

  it("AGENTS carries the live e2e count (the commands table + the gate-order e2e half)", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain(`Browser E2E (${E2E} checks)`);
    expect(agents).toContain("`bun run test:e2e` (" + `${E2E})`);
  });

  it("CLAUDE carries the live e2e count (the commands table + the gate-order e2e half + the pyramid line)", () => {
    const claude = read("CLAUDE.md");
    expect(claude).toContain(
      `Playwright E2E (${E2E} checks, needs build first)`,
    );
    expect(claude).toContain("`bun run test:e2e` (" + `${E2E})`);
    expect(claude).toContain(`**E2E (Playwright, ${E2E} checks)**`);
  });

  it("README carries the live e2e count (the file tree + the commands comment)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`# Playwright (${E2E} checks)`);
    expect(readme).toContain(`# ${E2E} Playwright checks on :3100`);
  });

  it("PAD carries the live e2e count (the file tree + the checklist + the commands table)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`+ setup project — ${E2E} checks`);
    expect(pad).toContain("`bun run test:e2e` — " + `${E2E}/${E2E}`);
    expect(pad).toContain(
      `| \`bun run test:e2e\` | root | ${E2E} browser checks (build first) |`,
    );
  });

  it("the retired e2e stale forms never return to the live-tense sites (the F-99a1 genus guard on the e2e axis — SITE-FORM anchors)", () => {
    const readme = read("README.md");
    // the badge arithmetic site — the retired 2047 construction
    expect(readme).not.toMatch(/tests-2047%20checks/);
    // the commands-comment site form
    expect(readme).not.toMatch(/# 132 Playwright checks on/);
    // the file-tree site form
    expect(readme).not.toMatch(/# Playwright \(132 checks\)/);
    const agents = read("AGENTS.md");
    // the commands-table site form
    expect(agents).not.toMatch(/Browser E2E \(132 checks\)/);
    const claude = read("CLAUDE.md");
    expect(claude).not.toMatch(/Playwright E2E \(132 checks/);
    expect(claude).not.toMatch(/\*\*E2E \(Playwright, 132 checks\)\*\*/);
    const pad = read("Project_Architecture_Document.md");
    // the checklist + commands site forms (the WIDENED-guard doctrine,
    // the F-98a1 lesson applied at s102 and re-learned in-flight here:
    // an inventory row QUOTING a banned form documents the ban, it does
    // not reinstate it — the s104 inventory row quotes "— 132/132"
    // free-standing, so the negative anchors to the full site
    // construction with the backtick command prefix, which a quoted
    // mention cannot match; the pipe-wrapped form is quoted nowhere)
    expect(pad).not.toMatch(/`bun run test:e2e` — 132\/132/);
    expect(pad).not.toMatch(/\| 132 browser checks \|/);
  });

  it("the mobile-nav spec count stays live (the README Tested-row phrase + the testing-section phrase + the PAD suite line)", () => {
    // S104-P2 grows the mobile-nav spec 9 -> 10 (the drawer-OPEN
    // seeded-state guard); the three descriptive phrases ride it.
    const readme = read("README.md");
    expect(readme).toContain(
      `a ${MOBILE_NAV_E2E}-check mobile-nav regression suite`,
    );
    expect(readme).toContain(`the ${MOBILE_NAV_E2E}-check`);
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(
      `(${MOBILE_NAV_E2E} checks, 390/700px viewports)`,
    );
  });
});
