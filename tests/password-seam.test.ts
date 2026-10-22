import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-163 (WP-1 — the digma S70-D port): the PURE password/code crypto
// seam. hashPassword/verifyPassword previously lived in src/lib/auth.ts —
// whose transitive next/headers + Prisma imports made it un-importable from
// the bare-`PrismaClient` seed script, so prisma/seed.ts DUPLICATED the
// scrypt parameter set (16-byte salt, 64-byte key, `scrypt:salt:hash`): a
// change in one place silently broke demo login in the other. The seam is
// node:crypto ONLY — both consumers import it, and auth.ts re-exports for
// the routes' existing import surface. timingEqualizerHash (the digma
// S72-C login miss-branch equalizer) and generateVerificationCode (moved
// from verification-server.ts) join the seam.

import {
  generateVerifyCode,
  hashPassword,
  timingEqualizerHash,
  verifyPassword,
} from "@/lib/password";

describe("the pure password seam (session-163, digma S70-D)", () => {
  it("round-trips a password in the pinned scrypt:salt:hash format", () => {
    const stored = hashPassword("Sup3rSecret!");
    expect(stored.startsWith("scrypt:")).toBe(true);
    expect(stored.split(":")).toHaveLength(3);
    expect(verifyPassword("Sup3rSecret!", stored)).toBe(true);
  });

  it("rejects a wrong password", () => {
    const stored = hashPassword("Sup3rSecret!");
    expect(verifyPassword("wrong", stored)).toBe(false);
  });

  it("produces unique salts for identical passwords", () => {
    expect(hashPassword("same")).not.toBe(hashPassword("same"));
  });

  it("rejects malformed stored hashes", () => {
    expect(verifyPassword("x", "not-a-hash")).toBe(false);
    expect(verifyPassword("x", "bcrypt:abc:def")).toBe(false);
    expect(verifyPassword("x", "scrypt:only-two")).toBe(false);
  });
});

describe("timingEqualizerHash (session-163, digma S72-C)", () => {
  it("returns a stable per-process value in the scrypt format", () => {
    const first = timingEqualizerHash();
    expect(first.startsWith("scrypt:")).toBe(true);
    // LAZY memoization: the second call answers the SAME value (never a
    // second cold scrypt burn).
    expect(timingEqualizerHash()).toBe(first);
  });

  it("verifies harmlessly (the burn target never matches a real password)", () => {
    const equalizer = timingEqualizerHash();
    // The burn contract: verifyPassword against the equalizer hash must be
    // callable and false for ordinary passwords (it is a REAL scrypt hash
    // of a throwaway constant — the miss branch burns the same work).
    expect(verifyPassword("anything", equalizer)).toBe(false);
  });
});

describe("generateVerifyCode at the pure seam (session-163)", () => {
  it("mints a 6-digit string (leading zeros allowed — digit strings, not numbers)", () => {
    for (let i = 0; i < 50; i += 1) {
      const code = generateVerifyCode();
      expect(code).toMatch(/^\d{6}$/);
    }
  });
});

describe("the seam's purity contract (session-163)", () => {
  it("imports node:crypto ONLY — no next/*, no prisma, no db (the seed script's import surface)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/password.ts"),
      "utf8",
    );
    const stripped = src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    const imports = [...stripped.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
    expect(imports.length).toBeGreaterThan(0);
    for (const specifier of imports) {
      expect(specifier).toMatch(/^node:crypto$/);
    }
  });

  it("is re-exported from auth.ts (the routes' existing import surface survives)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/auth.ts"),
      "utf8",
    );
    expect(src).toContain('from "@/lib/password"');
  });
});
