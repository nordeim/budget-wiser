import { createHmac } from "crypto";
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword, signSession, verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

describe("password hashing", () => {
  it("round-trips a password", () => {
    const stored = hashPassword("Sup3rSecret!");
    expect(stored.startsWith("scrypt:")).toBe(true);
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

describe("session tokens", () => {
  it("signs and verifies a session", () => {
    const token = signSession("user_123");
    const payload = verifySessionToken(token);
    expect(payload?.uid).toBe("user_123");
    expect(typeof payload?.exp).toBe("number");
  });

  it("rejects tampered signatures", () => {
    const token = signSession("user_123");
    const tampered = `${token.slice(0, -4)}dead`;
    expect(verifySessionToken(tampered)).toBeNull();
  });

  it("rejects expired tokens", () => {
    const now = Date.now();
    // Session-163: the signature gained the tokenVersion parameter —
    // (uid, version, now).
    const token = signSession("user_123", 0, now - 8 * 24 * 60 * 60 * 1000); // 8 days ago
    expect(verifySessionToken(token, now)).toBeNull();
  });

  it("rejects garbage tokens", () => {
    expect(verifySessionToken(null)).toBeNull();
    expect(verifySessionToken("")).toBeNull();
    expect(verifySessionToken("no-dot")).toBeNull();
    expect(verifySessionToken("....")).toBeNull();
  });

  it("exports the expected cookie name", () => {
    expect(SESSION_COOKIE).toBe("neo_session");
  });
});

// ---- session-163: the tokenVersion revocation dimension (digma S67-A) ----
// The payload gains a version field that rides the signed body; a password
// reset (or any future revocation event) increments the live row's version
// and every previously minted cookie dies at the getSessionUser comparison.

describe("session token versioning (session-163)", () => {
  it("signs a versioned token and round-trips it", () => {
    const token = signSession("user_123", 3);
    const payload = verifySessionToken(token);
    expect(payload?.uid).toBe("user_123");
    expect(payload?.v).toBe(3);
  });

  it("defaults the version to 0 (the pre-retrofit row's value)", () => {
    const token = signSession("user_123");
    const payload = verifySessionToken(token);
    expect(payload?.v).toBe(0);
  });

  it("accepts a PRE-RETROFIT token (no v field) as version 0 — no forced fleet re-login", () => {
    // The pre-163 payload shape: {uid, iat, exp} with a valid HMAC under
    // the dev secret (unset AUTH_SECRET in the test environment).
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    const parsed = verifySessionToken(`${body}.${sig}`);
    expect(parsed?.uid).toBe("user_123");
    expect(parsed?.v).toBe(0);
  });

  it("rejects a non-integer version even under a valid signature", () => {
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: "x" };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });

  it("rejects a fractional version even under a valid signature", () => {
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: 1.5 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });

  it("rejects a negative version even under a valid signature", () => {
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: -1 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });
});
