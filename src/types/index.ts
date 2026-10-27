// Shared client-side domain types (API wire shapes) — Budget Wise.

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export interface User {
  id: string;
  email: string;
  name: string;
  avatarColor: string;
  // Profile photo URL — null = the slate initial fallback.
  photoUrl: string | null;
  role: string;
}

/** The Profile page's fuller projection of the session user. */
export interface ProfileUser extends User {
  currency: string;
  aboutMe: string | null;
  savingsGoal: number | null;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string; // ISO yyyy-mm-dd (day precision)
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  category: string;
  monthlyLimit: number;
  month: number; // 1..12
  year: number;
  createdAt: string;
  updatedAt: string;
}

/** A budget card's row on the Budgets page — server pre-joins the month's
 *  spending so the client never re-derives it. */
export interface BudgetWithSpent extends Budget {
  spent: number;
}

export interface DashboardData {
  month: number;
  year: number;
  monthLabel: string;
  balance: number;
  income: number;
  expenses: number;
  transactionCount: number;
  savingsPercent: number | null;
  spendingByCategory: Array<{ category: string; amount: number }>;
  budgets: Array<{
    category: string;
    monthlyLimit: number;
    spent: number;
    remaining: number;
    percentUsed: number;
  }>;
  overallBudget: { spent: number; limit: number; percentUsed: number } | null;
  week: {
    weekSpent: number;
    weekEarned: number;
    buckets: Array<{ day: string; spent: number; earned: number }>;
  };
  yearSummary: { income: number; expenses: number };
  recentTransactions: Transaction[];
  totalTransactions: number;
}
