import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * The docs-count lockstep — born in session 222 (the thirtieth census).
 *
 * The finding: the PAD's §7 testing-strategy table answered 410/66 while
 * README/CLAUDE/SKILL held 416/68 — the counts had moved at session 218
 * (the s218 arrow remediation, +6 unit/+2 e2e) and the PAD's static table
 * was never in the lockstep check's scope. Six consecutive rounds of
 * manual "README/CLAUDE/SKILL live-tense" verification missed it because
 * the PAD was not on the list.
 *
 * The guard: the four root documents must agree with each other AND with
 * the canonical constants below. When a suite count moves, update this
 * constant and every doc surface in the SAME change set — this test REDs
 * otherwise, by design (the same contract as the pinned error strings).
 *
 * Historical surfaces are deliberately NOT parsed: the PAD's revision
 * block, the SKILL's Appendix C audit-history rows, and every
 * docs/session_*.md log keep the era's numbers — only the live-tense
 * claims are pinned here.
 */

// The canonical counts — the live gate's answers.
const UNIT = 420;
const E2E = 68;
const SMOKE = 14;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f: string): string => readFileSync(join(root, f), "utf8");

describe("the docs-count lockstep (the four root documents agree)", () => {
  it("README.md carries the canonical counts (the architecture table + the testing section)", () => {
    const t = read("README.md");
    expect(t).toContain(`| Unit tests | Vitest | 5.0 | ${UNIT} checks |`);
    expect(t).toContain(`| E2E tests | Playwright | 1.64 | ${E2E} checks against the standalone build |`);
    expect(t).toContain(`Vitest unit layer (${UNIT} checks)`);
    expect(t).toContain(`Playwright e2e (${E2E} checks)`);
  });

  it("CLAUDE.md carries the canonical counts (the test pyramid + the success metrics)", () => {
    const t = read("CLAUDE.md");
    expect(t).toContain(`**Unit (Vitest, ${UNIT} checks)**`);
    expect(t).toContain(`**E2E (Playwright, ${E2E} checks)**`);
    expect(t).toContain(`**Smoke (${SMOKE} checks)**`);
    expect(t).toContain(`(${UNIT} unit + ${E2E} e2e + ${SMOKE} smoke)`);
  });

  it("the PAD's §7 testing-strategy table carries the canonical counts (the revision block keeps era numbers)", () => {
    const t = read("Project_Architecture_Document.md");
    const section = t.split("## 7. Testing Strategy")[1]?.split("## 8.")[0] ?? "";
    expect(section, "the §7 section must exist").toBeTruthy();
    expect(section).toContain(`| Unit | Vitest | ${UNIT} |`);
    expect(section).toContain(`| E2E | Playwright | ${E2E} |`);
    expect(section).toContain(`| Smoke | bash ladder | ${SMOKE} |`);
  });

  it("budget-wiser_SKILL.md carries the canonical counts (the tier headings + the command comments; Appendix C keeps era numbers)", () => {
    const t = read("budget-wiser_SKILL.md");
    expect(t).toContain(`### Tier 1 — Unit (Vitest, ${UNIT} checks)`);
    expect(t).toContain(`### Tier 2 — E2E (Playwright, ${E2E} checks)`);
    expect(t).toContain(`full unit suite (${UNIT})`);
    expect(t).toContain(`${E2E} checks against the artifact`);
    expect(t).toContain(`test (${UNIT}) → build → smoke (${SMOKE}) → e2e (${E2E})`);
  });
});
