// Fixed-window rate limiter (per-process, single-node deploy — same contract
// as the scaffold family). Used by the auth routes with PER-ROUTE limits
// (all per 15 min / IP — Session-63 (N-63e) corrected this header, which
// used to claim a flat "10 attempts"): login 10, signup 10, resend 5,
// verify 20. Session-67 (N-67e) added the sessioned upload route at 20
// (post-guard); session-68 (F-68a3) recorded it here.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
  }
  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, remaining: limit - existing.count, retryAfterSec: 0 };
}

export function clientKey(req: Request): string {
  // Session-163 (the digma S62-D/S69-A port): the limiter keys on the
  // LAST x-forwarded-for hop — the proxy-APPENDED real IP. The pre-163
  // FIRST-hop keying trusted a client-suppliable value: a spoofing client
  // PREPENDS a fake IP and the proxy appends the real one after it, so
  // the first hop was attacker-chosen and the brute-force defense
  // (10/IP/15min) was evadable by rotating the header. A single-value
  // header (the e2e suites' dedicated-bucket form) is both first and
  // last — unaffected.
  //
  // The trust depth is DEPLOY-DECLARED through NEO_PROXY_HOPS: unset
  // (the default) = 1 — exactly one appending proxy. 0 = direct exposure
  // (the client-suppliable header family is ignored entirely — one
  // honest shared bucket instead of a per-request rotation that fully
  // bypasses the limiter). N >= 2 = N trusted appending proxies (keys on
  // the hop the Nth trusted proxy preserved). Unparsable or negative
  // values fail CLOSED onto the default — a bad env var never widens
  // trust. A list shorter than the declared depth fails closed onto
  // "unknown" (an attacker sending single-value headers under a declared
  // depth of 2 cannot rotate buckets). The x-real-ip fallback applies
  // only at depth >= 1 with XFF absent — ignored entirely at depth 0.
  const depth = proxyHopDepth();
  if (depth === 0) return "unknown";
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const hops = fwd.split(",").map((hop) => hop.trim()).filter(Boolean);
    if (hops.length < depth) return "unknown";
    return hops[hops.length - depth] ?? "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Session-163 (the digma S69-A port): the declared proxy-topology trust
 *  depth. NEO_PROXY_HOPS: unset/empty = 1; unparsable or negative fails
 *  CLOSED onto 1; 0 = direct exposure; N >= 2 = N appending proxies. */
export function proxyHopDepth(): number {
  const raw = process.env.NEO_PROXY_HOPS;
  if (raw === undefined || raw === "") return 1;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 1;
  return parsed;
}

// Opportunistic cleanup so the map never grows unbounded.
export function sweepRateLimits(now = Date.now()): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
