// Budget Wise canonical vocabularies + presentation metadata.
//
// The two category families are DISTINCT (the reference's Add-Transaction
// dialog swaps the list when the Expense/Income tab flips — live-verified
// against budget-wiser.base44.app on 2026-10-27). Raw values are stored in
// the DB; labels/tints/icons are presentation only.

import {
  UtensilsCrossed,
  Car,
  Clapperboard,
  ShoppingBag,
  FileText,
  HeartPulse,
  GraduationCap,
  MoreHorizontal,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  type LucideIcon,
} from "lucide-react";

export const TRANSACTION_TYPES = ["expense", "income"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const EXPENSE_CATEGORIES = [
  "food",
  "transport",
  "entertainment",
  "shopping",
  "bills",
  "healthcare",
  "education",
  "other",
] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const INCOME_CATEGORIES = [
  "salary",
  "freelance",
  "investment",
  "gift",
  "other_income",
] as const;
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];

export type CategoryRaw = ExpenseCategory | IncomeCategory;

export interface CategoryMeta {
  label: string;
  /** Icon-tile tint (bg-) and icon color (text-) for list rows. */
  tile: string;
  /** Chart slice fill — the reference's donut palette. */
  color: string;
  icon: LucideIcon;
}

/**
 * Expense presentation map — labels byte-matched to the reference's category
 * listbox ("Food & Dining", "Transport", …), tints mirrored from its
 * transaction rows and donut legend (Other gray, Transport blue,
 * Bills & Utilities red — live-snapshotted 2026-10-27).
 */
export const EXPENSE_CATEGORY_META: Record<ExpenseCategory, CategoryMeta> = {
  food: {
    label: "Food & Dining",
    tile: "bg-orange-50 text-orange-500",
    color: "#f97316",
    icon: UtensilsCrossed,
  },
  transport: {
    label: "Transport",
    tile: "bg-blue-50 text-blue-500",
    color: "#3b82f6",
    icon: Car,
  },
  entertainment: {
    label: "Entertainment",
    tile: "bg-purple-50 text-purple-500",
    color: "#a855f7",
    icon: Clapperboard,
  },
  shopping: {
    label: "Shopping",
    tile: "bg-pink-50 text-pink-500",
    color: "#ec4899",
    icon: ShoppingBag,
  },
  bills: {
    label: "Bills & Utilities",
    tile: "bg-rose-50 text-rose-500",
    color: "#ef4444",
    icon: FileText,
  },
  healthcare: {
    label: "Healthcare",
    tile: "bg-emerald-50 text-emerald-500",
    color: "#10b981",
    icon: HeartPulse,
  },
  education: {
    label: "Education",
    tile: "bg-cyan-50 text-cyan-500",
    color: "#06b6d4",
    icon: GraduationCap,
  },
  other: {
    label: "Other",
    tile: "bg-slate-100 text-slate-500",
    color: "#94a3b8",
    icon: MoreHorizontal,
  },
};

/**
 * Income presentation map — labels byte-matched to the reference's Income
 * tab listbox ("Salary", "Freelance", "Investment", "Gift", "Other").
 */
export const INCOME_CATEGORY_META: Record<IncomeCategory, CategoryMeta> = {
  salary: {
    label: "Salary",
    tile: "bg-emerald-50 text-emerald-600",
    color: "#10b981",
    icon: Briefcase,
  },
  freelance: {
    label: "Freelance",
    tile: "bg-indigo-50 text-indigo-500",
    color: "#6366f1",
    icon: Laptop,
  },
  investment: {
    label: "Investment",
    tile: "bg-teal-50 text-teal-500",
    color: "#14b8a6",
    icon: TrendingUp,
  },
  gift: {
    label: "Gift",
    tile: "bg-pink-50 text-pink-500",
    color: "#ec4899",
    icon: Gift,
  },
  other_income: {
    label: "Other",
    tile: "bg-slate-100 text-slate-500",
    color: "#94a3b8",
    icon: MoreHorizontal,
  },
};

export function categoryMeta(raw: string): CategoryMeta {
  const expense = EXPENSE_CATEGORY_META[raw as ExpenseCategory];
  if (expense) return expense;
  const income = INCOME_CATEGORY_META[raw as IncomeCategory];
  if (income) return income;
  // Unknown raw value (foreign data) — the neutral fallback, never a crash.
  return {
    label: raw,
    tile: "bg-slate-100 text-slate-500",
    color: "#94a3b8",
    icon: MoreHorizontal,
  };
}

export function categoriesForType(type: TransactionType): readonly string[] {
  return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

export function isKnownCategory(type: TransactionType, raw: string): boolean {
  return categoriesForType(type).includes(raw);
}

/** The donut's slice order — largest-spending category first (caller sorts);
 *  ties broken by this canonical index so the legend is stable week to week. */
export function categoryOrderIndex(raw: string): number {
  const e = (EXPENSE_CATEGORIES as readonly string[]).indexOf(raw);
  return e === -1 ? (INCOME_CATEGORIES as readonly string[]).indexOf(raw) : e;
}
