// Budget Wise — money/budget arithmetic (pure, unit-tested).
//
// All amounts are display-currency units (the reference stores dollars, not
// cents). Percentages are 0..100 rounded to one decimal, matching the
// reference's "88.5% saved" badge and budget-progress percent readouts.

export interface BudgetSpendingInput {
  monthlyLimit: number;
  spent: number;
}

export interface BudgetSpending {
  spent: number;
  limit: number;
  remaining: number;
  /** 0..100+ — may exceed 100 when over budget. */
  percentUsed: number;
  onTrack: boolean;
  /** Tailwind classes for the progress bar + status badge. */
  barClass: string;
  badgeClass: string;
  badgeLabel: string;
}

/** A budget is On Track while spent < limit (the reference's own empty-
 *  spending budget showed "On Track" at $0 of $500 — live-verified). */
export function budgetSpending({ monthlyLimit, spent }: BudgetSpendingInput): BudgetSpending {
  const limit = Math.max(0, monthlyLimit);
  const used = Math.max(0, spent);
  const remaining = limit - used;
  const percentUsed = limit > 0 ? round1((used / limit) * 100) : 0;
  const onTrack = used <= limit;
  // Color bands mirrored from the reference: neutral track while under,
  // emerald while healthily under, amber in the final fifth, rose over.
  let barClass = "bg-slate-900";
  let badgeClass = "bg-emerald-50 text-emerald-700";
  let badgeLabel = "On Track";
  if (!onTrack) {
    barClass = "bg-rose-500";
    badgeClass = "bg-rose-50 text-rose-700";
    badgeLabel = "Over Budget";
  } else if (limit > 0 && percentUsed >= 80) {
    barClass = "bg-amber-500";
    badgeClass = "bg-amber-50 text-amber-700";
    badgeLabel = "Nearly Full";
  }
  return {
    spent: used,
    limit,
    remaining,
    percentUsed,
    onTrack,
    barClass,
    badgeClass,
    badgeLabel,
  };
}

/** Aggregate a month's spending per expense category. */
export function spendingByCategory(
  transactions: Array<{ type: string; amount: number; category: string }>,
): Map<string, number> {
  const out = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    out.set(t.category, (out.get(t.category) ?? 0) + t.amount);
  }
  return out;
}

/** The savings-rate badge: income > 0 ? saved% of income : null. */
export function savingsRate(income: number, expenses: number): number | null {
  if (income <= 0) return null;
  return round1(((income - expenses) / income) * 100);
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Money values carry TWO decimals — the $575.45/$4,424.55 forms. */
export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function money(n: number, symbol = "$"): string {
  const sign = n < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** The Mon–Sun weekly buckets for the Spend Summary chart. `weekStart` is
 *  any Date inside the target week (its day-of-week decides the buckets). */
export function weeklyBuckets(
  transactions: Array<{ type: string; amount: number; date: Date }>,
  weekStart: Date,
): Array<{ day: string; spent: number; earned: number }> {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const out = days.map((day) => ({ day, spent: 0, earned: 0 }));
  const start = startOfDay(weekStart);
  // Align to the Monday of that week (getDay: Sun=0..Sat=6).
  const monday = new Date(start);
  monday.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  for (const t of transactions) {
    const d = startOfDay(t.date);
    const diff = Math.round((d.getTime() - monday.getTime()) / 86_400_000);
    if (diff < 0 || diff > 6) continue;
    if (t.type === "expense") out[diff].spent += t.amount;
    else if (t.type === "income") out[diff].earned += t.amount;
  }
  return out;
}

export function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

/** Month boundaries in LOCAL time (the reference's "October 2026" buckets). */
export function monthRange(year: number, month1to12: number): { start: Date; end: Date } {
  const start = new Date(year, month1to12 - 1, 1, 0, 0, 0, 0);
  const end = new Date(year, month1to12, 1, 0, 0, 0, 0);
  return { start, end };
}

export function yearRange(year: number): { start: Date; end: Date } {
  return { start: new Date(year, 0, 1), end: new Date(year + 1, 0, 1) };
}

/** "October 2026" — the reference's header/subtitle form (en-US long month). */
export function monthLabel(year: number, month1to12: number): string {
  return new Date(year, month1to12 - 1, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}
