/**
 * The demo account's fixed creation date — the F-239a pin (session 239,
 * the forty-seventh census).
 *
 * The reference owner account renders "Member since October 2026"
 * (live-read on budget-wiser.base44.app/profile, 2026-11-01) — a FIXED
 * value that does not move with the calendar. The seed's demo account must
 * answer the same month on every fresh clone, so its createdAt is pinned
 * here and consumed by prisma/seed.ts (both user upserts, create AND
 * update blocks — an in-place re-seed re-dates a drifted standing db back
 * to the pin). Real signups keep their real createdAt; only the seeded
 * demo fixture answers this date.
 *
 * Mid-month by design: 2026-10-15T00:00:00Z renders "October" in every
 * timezone on Earth (an Oct-01 UTC-midnight fixture renders September for
 * a US-Pacific viewer). Pinned by tests/demo-fixture.test.ts.
 */
export const DEMO_MEMBER_SINCE = new Date("2026-10-15T00:00:00.000Z");
