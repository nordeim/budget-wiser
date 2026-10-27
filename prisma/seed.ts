// Seed: Budget Wise demo workspace.
// Idempotent: clears domain tables, then inserts the canonical demo data.
// Run: bun prisma/seed.ts  (or: bun run db:seed)
//
// Demo login (mirrors the reference app): sepnetflix2023@outlook.com / $Abcd1234
//
// The demo month mirrors the reference's live data (audited 2026-10-27):
// one $5,000 Salary income + three expenses (Other $400, Transport $100,
// Bills & Utilities $75.45) — balance $4,244.55, 4 transactions, and NO
// budgets (the reference's empty Budget Progress state). The frame is the
// CURRENT month so a re-seed any time keeps the dashboard non-empty.

import { PrismaClient } from "@prisma/client";
import { runtimeDatabaseUrl } from "../src/lib/db-path";
// The PURE crypto seam — one scrypt implementation shared by auth + seed.
import { hashPassword } from "../src/lib/password";

// Explicit datasource URL: never let the Prisma engine (or bun's .env
// absolutization) pick the database location — the shared resolver pins
// every consumer to <repo>/db/<name> (see src/lib/db-path.ts).
const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

function dayOfMonth(month: number, year: number, day: number): Date {
  // Day clamped into the month (a Nov 31 would silently roll otherwise).
  const last = new Date(year, month + 1, 0).getDate();
  const safe = Math.min(day, last);
  return new Date(year, month, safe, 0, 0, 0, 0);
}

async function main() {
  // Idempotency: wipe domain data. Users land through UPSERT-BY-EMAIL so a
  // re-seed preserves ids (cookie sessions survive re-seeds).
  await db.budget.deleteMany();
  await db.transaction.deleteMany();

  const now = new Date();
  const month = now.getMonth(); // 0-based
  const year = now.getFullYear();

  // ---- users ---------------------------------------------------------------
  // The upsert UPDATE blocks CLEAR the reset + verification funnels so a
  // stale pending token never survives a re-seed (the hashed-at-rest
  // posture — resetToken stores the SHA-256 hex of the raw token, see
  // src/lib/auth.ts's hashResetToken).
  const demoHash = hashPassword("$Abcd1234");
  const demo = await db.user.upsert({
    where: { email: "sepnetflix2023@outlook.com" },
    update: {
      resetToken: null,
      resetTokenExpiresAt: null,
      verificationCodeHash: null,
      verificationExpiresAt: null,
      verificationAttempts: 0,
    },
    create: {
      email: "sepnetflix2023@outlook.com",
      name: "sepnetflix2023",
      passwordHash: demoHash,
      role: "user",
      currency: "USD",
    },
  });
  await db.user.upsert({
    where: { email: "demo@budgetwise.local" },
    update: {
      resetToken: null,
      resetTokenExpiresAt: null,
      verificationCodeHash: null,
      verificationExpiresAt: null,
      verificationAttempts: 0,
    },
    create: {
      email: "demo@budgetwise.local",
      name: "Demo User",
      passwordHash: demoHash,
      role: "user",
      currency: "USD",
    },
  });

  // ---- the reference's demo month -------------------------------------------
  // 4 transactions: Salary +5000 (day 1), Other -400 (day 10),
  // Transport -100 (day 25), Bills & Utilities -75.45 (day 26).
  const rows: Array<{
    type: string;
    amount: number;
    category: string;
    date: Date;
    description: string | null;
  }> = [
    { type: "income", amount: 5000, category: "salary", date: dayOfMonth(month, year, 1), description: "Monthly salary" },
    { type: "expense", amount: 400, category: "other", date: dayOfMonth(month, year, 10), description: null },
    { type: "expense", amount: 100, category: "transport", date: dayOfMonth(month, year, 25), description: null },
    { type: "expense", amount: 75.45, category: "bills", date: dayOfMonth(month, year, 26), description: "Electricity bill" },
  ];
  await db.transaction.createMany({
    data: rows.map((r) => ({ ...r, userId: demo.id })),
  });

  // NO budgets — the reference's default empty state.

  const users = await db.user.count();
  const transactions = await db.transaction.count();
  console.log("Seeded Budget Wise demo workspace:", {
    users,
    transactions,
    budgets: 0,
  });
  console.log("Demo login: sepnetflix2023@outlook.com / $Abcd1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
