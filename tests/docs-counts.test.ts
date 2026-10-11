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
// HEAD :795→:796, checklist :1217→:1218, commands :1287→:1288).

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

const UNIT = 1915;
const E2E = 132;
const SUITES = 106;

describe("session-102 (S102-P1): the secondary-sites lockstep — every live-tense count site pinned", () => {
  it("README badge carries the unit + e2e arithmetic (1915 + 132 = 2047)", () => {
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
});
