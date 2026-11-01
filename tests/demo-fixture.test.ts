import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMO_MEMBER_SINCE } from "@/lib/demo-fixture";

/**
 * The demo-account member-since pin — born in session 239 (the forty-seventh
 * census, the first round after the workspace reset).
 *
 * The finding (F-239a): the seed's user `create` blocks left `createdAt` to
 * Prisma's now() default, so the demo account's age drifted with the SEED
 * date. The standing db dated from October 2026 (rendering "Member since
 * October 2026", byte-matching the reference's owner account — live-read
 * again this round), but a FRESH clone seeded in any other month renders a
 * different "Member since" line on the profile surface — a data-borne
 * visual divergence invisible to every gate (the e2e asserts only
 * visibility; no unit pin existed) and a screenshot-battery destabilizer
 * (this round's post-reset re-seed re-dated the line to November 2026 and
 * RED'd the profile frames against HEAD with the delta pixel-localized to
 * exactly the member-since P).
 *
 * The fix: the demo fixture's account-creation date is PINNED to the
 * reference owner account's creation month (October 2026) — a data-layer
 * pin, not a render-time pin (real signups keep their real createdAt; only
 * the seeded demo fixture answers the fixed date). Mid-month by design:
 * 2026-10-15T00:00:00Z renders "October" in every timezone from UTC-12 to
 * UTC+14 (an Oct-01 UTC-midnight fixture renders September for a
 * US-Pacific viewer).
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f: string): string => readFileSync(join(root, f), "utf8");

// The profile page's exact locale form (profile-page.tsx:95).
const memberSinceRender = (d: Date): string =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

describe("the demo member-since fixture (F-239a)", () => {
  it("renders the reference owner account's month — October 2026", () => {
    // The reference live-read (2026-11-01, the forty-seventh census):
    // "Member since October 2026" on budget-wiser.base44.app/profile.
    expect(memberSinceRender(DEMO_MEMBER_SINCE)).toBe("October 2026");
  });

  it("is timezone-safe: mid-month, so no UTC offset shifts the rendered month", () => {
    // Oct 15 00:00Z ± 14h stays inside October everywhere on Earth.
    const utc = DEMO_MEMBER_SINCE.toISOString();
    expect(utc).toBe("2026-10-15T00:00:00.000Z");
  });
});

describe("the seed pins the demo users' createdAt with the fixture (F-239a wiring)", () => {
  it("both user upserts carry the fixture in create AND update blocks", () => {
    const seed = read("prisma/seed.ts");
    // import wired
    expect(seed).toContain("from \"../src/lib/demo-fixture\"");
    expect(seed).toContain("DEMO_MEMBER_SINCE");
    // both upserts pin it — create blocks (2 users) + update blocks (2 users,
    // so an in-place re-seed re-dates a drifted standing db back to the pin)
    const pins = seed.match(/createdAt: DEMO_MEMBER_SINCE/g) ?? [];
    expect(pins.length).toBe(4);
  });
});
