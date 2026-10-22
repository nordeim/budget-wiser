import { describe, expect, it } from "vitest";
import { rateLimit, sweepRateLimits, clientKey } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows up to the limit then blocks", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 10; i += 1) {
      expect(rateLimit(key, 10, 60_000).allowed).toBe(true);
    }
    const blocked = rateLimit(key, 10, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("tracks remaining quota", () => {
    const key = `test-${Math.random()}`;
    rateLimit(key, 3, 60_000);
    rateLimit(key, 3, 60_000);
    expect(rateLimit(key, 3, 60_000).remaining).toBe(0);
  });

  it("isolates keys", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, 1, 60_000);
    expect(rateLimit(a, 1, 60_000).allowed).toBe(false);
    expect(rateLimit(b, 1, 60_000).allowed).toBe(true);
  });

  it("sweeps expired buckets", () => {
    const key = `sweep-${Math.random()}`;
    rateLimit(key, 1, -1); // already expired window
    sweepRateLimits();
    expect(rateLimit(key, 1, 60_000).allowed).toBe(true);
  });
});

// ---- session-163: the deploy-declared proxy topology (digma S62-D/S69-A) --
// clientKey re-keys onto the LAST x-forwarded-for hop — the proxy-APPENDED
// real IP. The pre-163 FIRST-hop keying trusted a client-suppliable value:
// a spoofing client PREPENDS a fake IP and the proxy appends the real one
// after it, so the first hop was attacker-chosen and the brute-force
// defense (10/IP/15min) was evadable by rotating the header. The trust
// depth is DEPLOY-DECLARED through NEO_PROXY_HOPS: unset = 1 (exactly one
// appending proxy), 0 = direct exposure (header family ignored entirely),
// N >= 2 = N trusted appending proxies. Unparsable or negative values
// fail CLOSED onto the default — a bad env var never widens trust.

describe("clientKey (session-163: last-hop trust + declared depth)", () => {
  const ORIGINAL = process.env.NEO_PROXY_HOPS;

  it("keys on the LAST x-forwarded-for hop at the default depth (the proxy-appended real IP)", () => {
    delete process.env.NEO_PROXY_HOPS;
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1" },
    });
    expect(clientKey(req)).toBe("10.0.0.1");
  });

  it("a single-value XFF is both first and last — the e2e form is unaffected", () => {
    delete process.env.NEO_PROXY_HOPS;
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "198.51.100.46" },
    });
    expect(clientKey(req)).toBe("198.51.100.46");
  });

  it("depth 0 (direct exposure): the client-suppliable header family is ignored entirely", () => {
    process.env.NEO_PROXY_HOPS = "0";
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1", "x-real-ip": "192.0.2.9" },
    });
    expect(clientKey(req)).toBe("unknown");
  });

  it("depth 2: keys on the hop the second trusted proxy preserved", () => {
    process.env.NEO_PROXY_HOPS = "2";
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1, 192.0.2.9" },
    });
    expect(clientKey(req)).toBe("10.0.0.1");
  });

  it("a list shorter than the declared depth fails closed onto unknown", () => {
    process.env.NEO_PROXY_HOPS = "2";
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7" },
    });
    expect(clientKey(req)).toBe("unknown");
  });

  it("unparsable or negative depths fail CLOSED onto the default (last hop)", () => {
    for (const bad of ["abc", "-1", ""]) {
      process.env.NEO_PROXY_HOPS = bad;
      const req = new Request("http://x", {
        headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1" },
      });
      expect(clientKey(req)).toBe("10.0.0.1");
    }
  });

  it("x-real-ip applies only at depth >= 1 with XFF absent", () => {
    delete process.env.NEO_PROXY_HOPS;
    const req = new Request("http://x", { headers: { "x-real-ip": "192.0.2.9" } });
    expect(clientKey(req)).toBe("192.0.2.9");
  });

  it("falls back to unknown with no headers at all", () => {
    delete process.env.NEO_PROXY_HOPS;
    expect(clientKey(new Request("http://x"))).toBe("unknown");
  });

  it("restores the environment after the battery", () => {
    if (ORIGINAL === undefined) delete process.env.NEO_PROXY_HOPS;
    else process.env.NEO_PROXY_HOPS = ORIGINAL;
  });
});
