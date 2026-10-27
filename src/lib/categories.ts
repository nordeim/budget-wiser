// Budget Wise canonical vocabularies + presentation metadata.
//
// The two category families are DISTINCT (the reference's Add-Transaction
// dialog swaps the list when the Expense/Income tab flips — live-verified
// against budget-wiser.base44.app on 2026-10-27). Raw values are stored in
// the DB; labels/tints/icons are presentation only.

import {
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Receipt,
  Heart,
  GraduationCap,
  Ellipsis,
  Briefcase,
  Wallet,
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
// Session-194: the reference REDESIGNED its category palette in the
// shadcn restyle wave — every tile, icon, and donut fill re-extracted
// via a live round-trip (one $1 txn per category added to the reference,
// chips + icons + donut sectors censused, then every probe row deleted
// and the owner's original food transaction restored verbatim).
export const EXPENSE_CATEGORY_META: Record<ExpenseCategory, CategoryMeta> = {
  food: {
    label: "Food & Dining",
    tile: "bg-emerald-50 text-emerald-600",
    color: "#10b981",
    icon: Utensils,
  },
  transport: {
    label: "Transport",
    tile: "bg-blue-50 text-blue-600",
    color: "#3b82f6",
    icon: Car,
  },
  entertainment: {
    label: "Entertainment",
    tile: "bg-violet-50 text-violet-600",
    color: "#8b5cf6",
    icon: Film,
  },
  shopping: {
    label: "Shopping",
    tile: "bg-amber-50 text-amber-600",
    color: "#f59e0b",
    icon: ShoppingBag,
  },
  bills: {
    label: "Bills & Utilities",
    tile: "bg-red-50 text-red-600",
    color: "#ef4444",
    icon: Receipt,
  },
  healthcare: {
    label: "Healthcare",
    tile: "bg-cyan-50 text-cyan-600",
    color: "#06b6d4",
    icon: Heart,
  },
  education: {
    label: "Education",
    tile: "bg-lime-50 text-lime-600",
    color: "#84cc16",
    icon: GraduationCap,
  },
  other: {
    label: "Other",
    tile: "bg-slate-50 text-slate-600",
    color: "#6b7280",
    icon: Ellipsis,
  },
};

/**
 * Income presentation map — labels byte-matched to the reference's Income
 * tab listbox ("Salary", "Freelance", "Investment", "Gift", "Other").
 */
export const INCOME_CATEGORY_META: Record<IncomeCategory, CategoryMeta> = {
  // Session-194: the income family re-extracted in the same round-trip.
  salary: {
    label: "Salary",
    tile: "bg-indigo-50 text-indigo-600",
    color: "#6366f1",
    icon: Briefcase,
  },
  freelance: {
    label: "Freelance",
    tile: "bg-purple-50 text-purple-600",
    color: "#a855f7",
    icon: Wallet,
  },
  investment: {
    label: "Investment",
    tile: "bg-teal-50 text-teal-600",
    color: "#14b8a6",
    icon: TrendingUp,
  },
  gift: {
    label: "Gift",
    tile: "bg-pink-50 text-pink-600",
    color: "#ec4899",
    icon: Gift,
  },
  other_income: {
    label: "Other",
    tile: "bg-slate-50 text-slate-600",
    color: "#6b7280",
    icon: Ellipsis,
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
    tile: "bg-slate-50 text-slate-600",
    color: "#6b7280",
    icon: Ellipsis,
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
