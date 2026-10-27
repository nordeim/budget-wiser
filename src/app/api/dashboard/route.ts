import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";
import {
  monthRange,
  monthLabel,
  round1,
  round2,
  savingsRate,
  spendingByCategory,
  weeklyBuckets,
  yearRange,
} from "@/lib/budget-math";

export const dynamic = "force-dynamic";

// GET /api/dashboard — every number the Dashboard page renders, computed
// server-side in ONE round trip (the KPI cards, the donut series, the
// budget progress rows, the week buckets, the recent-transactions list,
// the year rollups). The client never re-derives money math.
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const uid = guard.user.id;

  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const { start, end } = monthRange(year, month);
    const yr = yearRange(year);

    const [all, monthTx, budgets, recent] = await Promise.all([
      db.transaction.findMany({
        where: { userId: uid },
        select: { type: true, amount: true, category: true, date: true },
      }),
      db.transaction.findMany({
        where: { userId: uid, date: { gte: start, lt: end } },
        select: { type: true, amount: true, category: true },
      }),
      db.budget.findMany({
        where: { userId: uid, month, year },
        select: { category: true, monthlyLimit: true },
      }),
      db.transaction.findMany({
        where: { userId: uid },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        take: 5,
      }),
    ]);

    const income = sum(monthTx.filter((t) => t.type === "income"));
    const expenses = sum(monthTx.filter((t) => t.type === "expense"));
    const balance = income - expenses;

    // Donut series: expense categories this month, largest first.
    const catMap = spendingByCategory(monthTx);
    const spending = [...catMap.entries()]
      .map(([category, amount]) => ({ category, amount: round2(amount) }))
      .sort((a, b) => b.amount - a.amount);

    // Budget rows + overall usage.
    const spentByCat = spendingByCategory(monthTx);
    const budgetRows = budgets.map((b) => {
      const spent = round2(spentByCat.get(b.category) ?? 0);
      return {
        category: b.category,
        monthlyLimit: b.monthlyLimit,
        spent,
        remaining: round2(b.monthlyLimit - spent),
        percentUsed: b.monthlyLimit > 0 ? round1((spent / b.monthlyLimit) * 100) : 0,
      };
    });
    const overallLimit = budgets.reduce((acc, b) => acc + b.monthlyLimit, 0);
    const overallSpent = budgetRows.reduce((acc, b) => acc + b.spent, 0);

    // This week (Mon..Sun containing today).
    const buckets = weeklyBuckets(
      all.map((t) => ({ type: t.type, amount: t.amount, date: t.date })),
      now,
    );
    const weekSpent = round2(buckets.reduce((acc, b) => acc + b.spent, 0));
    const weekEarned = round2(buckets.reduce((acc, b) => acc + b.earned, 0));

    // Year rollups (the Profile page mirrors these; compute here once).
    const yearTx = all.filter((t) => t.date >= yr.start && t.date < yr.end);
    const yearIncome = sum(yearTx.filter((t) => t.type === "income"));
    const yearExpenses = sum(yearTx.filter((t) => t.type === "expense"));

    return ok({
      month,
      year,
      monthLabel: monthLabel(year, month),
      balance: round2(balance),
      income: round2(income),
      expenses: round2(expenses),
      transactionCount: monthTx.length,
      savingsPercent: savingsRate(income, expenses),
      spendingByCategory: spending,
      budgets: budgetRows,
      overallBudget:
        overallLimit > 0
          ? {
              spent: round2(overallSpent),
              limit: round2(overallLimit),
              percentUsed: round1((overallSpent / overallLimit) * 100),
            }
          : null,
      week: { weekSpent, weekEarned, buckets },
      yearSummary: { income: round2(yearIncome), expenses: round2(yearExpenses) },
      recentTransactions: recent,
      totalTransactions: all.length,
    });
  } catch {
    return ERR.INTERNAL();
  }
}

function sum(list: Array<{ amount: number }>): number {
  return Math.round(list.reduce((acc, t) => acc + t.amount, 0) * 100) / 100;
}
