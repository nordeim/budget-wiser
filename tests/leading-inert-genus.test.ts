import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-150 (walk40, D-150a1): the leading-inert GENUS family
// closure — the Tailwind v4 genus the s148 hero fix + the s149
// preview-row fix pinned, made a STANDING INVARIANT. The decoded
// mechanism: on the reference's build, a base `leading-*` utility
// loses to a RESPONSIVE text-size utility (`sm:text-*` carries its
// own paired line-height) — the element renders the text-PAIRING, not
// the leading value, at ≥sm. Our v4 CSS-first build computes the
// base `leading-*` — a 2px/line divergence invisible to any
// class-string census and structural to every viewport sweep (the
// walk38/walk39 decodes).
//
// THE FAMILY CENSUS (walk40 PASS 1): exactly THREE combos exist in
// src/ — the landing hero h1 (`sm:leading-none`), the hero p
// (`sm:leading-[28px]`), the preview-row p (`sm:leading-6`) — all
// carrying their computed-equal pins. Every OTHER `leading-*` carrier
// (the landing feature-body + FAQ p, the about/contact paragraphs)
// carries NO responsive text-size token — out of the family BY
// MECHANISM (the leading value computes at every width on both apps;
// walk40 verified the about/contact p's byte-equal live at 1920+390).
//
// This scanner freezes the closure: a NEW responsive-text + base-
// leading combo planted without its computed-equal `sm:leading-*` pin
// REDs here exactly (the genus cannot recur silently). Source pins
// read RULES, not documentation — comments stripped first (the s21/s22
// own-doc-comment hazard). The scan covers every .tsx file under src.

const SRC_ROOT = path.resolve(import.meta.dirname, "..", "src");

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      walkTsFiles(p, acc);
    } else if (/\.tsx$/.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

interface Combo {
  file: string;
  classes: string;
  pin: string | null;
}

const RESPONSIVE_TEXT = /^(sm|md|lg|xl|2xl):text-/;
const BASE_LEADING = /^leading-/;
const RESPONSIVE_LEADING = /^(sm|md|lg|xl|2xl):leading-/;

/** Enumerate every class-string in every src .tsx file that carries
 *  BOTH a responsive text-size token and a base leading token — the
 *  genus family — with its responsive leading pin (or null = the
 *  VIOLATION the invariant forbids). */
function enumerateFamily(): Combo[] {
  const combos: Combo[] = [];
  for (const file of walkTsFiles(SRC_ROOT)) {
    const code = stripComments(readFileSync(file, "utf8"));
    // every double-quoted string (the className literals' home — the
    // codebase idiom: static class strings, one attribute per line)
    for (const m of code.matchAll(/"([^"\n]+)"/g)) {
      const classes = m[1];
      const tokens = classes.split(/\s+/);
      const hasResponsiveText = tokens.some((t) => RESPONSIVE_TEXT.test(t));
      const hasBaseLeading = tokens.some((t) => BASE_LEADING.test(t));
      if (hasResponsiveText && hasBaseLeading) {
        const pin = tokens.find((t) => RESPONSIVE_LEADING.test(t)) ?? null;
        combos.push({ file: path.relative(SRC_ROOT, file), classes, pin });
      }
    }
  }
  return combos;
}

describe("session-150 (walk40): the leading-inert genus family closure", () => {
  it("THE INVARIANT: every responsive-text-size + base-leading combo carries a responsive leading pin (the s148/s149 v4 genus cannot recur silently)", () => {
    const family = enumerateFamily();
    const violations = family.filter((c) => c.pin === null);
    expect(
      violations,
      `the genus family violations (each needs its computed-equal responsive leading pin):\n${violations.map((v) => `  ${v.file}: "${v.classes}"`).join("\n")}`,
    ).toEqual([]);
  });

  it("the family is the ENUMERATED THREE (the landing hero h1 + hero p + preview-row p — walk40 PASS 1; a new legit combo flips this count via the house protocol)", () => {
    const family = enumerateFamily();
    expect(family).toHaveLength(3);
    expect(family.every((c) => c.file === path.join("components", "landing", "landing-page.tsx"))).toBe(true);
  });

  it("the three combos carry their s148/s149 computed-equal pins (sm:leading-none · sm:leading-[28px] · sm:leading-6)", () => {
    const family = enumerateFamily();
    const pins = family.map((c) => c.pin);
    expect(pins).toContain("sm:leading-none");
    expect(pins).toContain("sm:leading-[28px]");
    expect(pins).toContain("sm:leading-6");
    // the pinned combos in full — the s148 hero pair + the s149 preview p
    expect(family.some((c) => c.classes.includes("text-4xl sm:text-5xl lg:text-6xl"))).toBe(true);
    expect(family.some((c) => c.classes.includes("text-base sm:text-lg") && c.pin === "sm:leading-[28px]")).toBe(true);
    expect(family.some((c) => c.classes.includes("text-sm sm:text-base") && c.pin === "sm:leading-6")).toBe(true);
  });

  it("the about + contact paragraphs are OUT of the family by mechanism (leading-relaxed with NO responsive text-size token — the value computes at every width on both apps; walk40 PASS 1 verified the p's byte-equal live at 1920+390)", () => {
    for (const rel of ["src/app/(marketing)/about/page.tsx", "src/app/(marketing)/contact/page.tsx"]) {
      const p = path.resolve(import.meta.dirname, "..", rel);
      expect(existsSync(p), `${rel} exists`).toBe(true);
      const code = stripComments(readFileSync(p, "utf8"));
      let leadingCarriers = 0;
      for (const m of code.matchAll(/"([^"\n]*leading-[^"\n]*)"/g)) {
        const tokens = m[1].split(/\s+/);
        if (tokens.some((t) => BASE_LEADING.test(t))) {
          leadingCarriers++;
          // the exemption mechanism: NO responsive text-size token rides
          // the same className — the genus cannot bite here
          expect(
            tokens.some((t) => RESPONSIVE_TEXT.test(t)),
            `${rel}: the leading carrier "${m[1]}" must carry NO responsive text-size token (or gain its computed-equal responsive leading pin)`,
          ).toBe(false);
        }
      }
      // both pages carry leading-relaxed (the s142 construction)
      expect(leadingCarriers).toBeGreaterThan(0);
    }
  });
});
