"use client";

// The Transactions page — the reference's own layout mirrored:
//   header (H1 + "Manage your income and expenses" + Add Transaction)
//   summary cards (Total Income / Total Expenses)
//   toolbar (search + All Types + All Categories filters)
//   transaction rows (tinted category icon, label, full weekday date,
//   amount, delete button with confirmation)

import * as React from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, Search, Trash2 } from "lucide-react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionDialog } from "@/components/shared/transaction-dialog";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  categoryMeta,
} from "@/lib/categories";
import { money } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import { HEADER_BUTTONS, PAGE_HEADER, PAGE_ROOT } from "@/lib/page-layout";
import type { Transaction } from "@/types";

export function TransactionsPage() {
  const transactions = useBudgetStore((s) => s.transactions);
  const hydrated = useBudgetStore((s) => s.hydrated);
  const [txOpen, setTxOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [pendingDelete, setPendingDelete] = React.useState<Transaction | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
      if (q) {
        const label = categoryMeta(t.category).label.toLowerCase();
        const desc = (t.description ?? "").toLowerCase();
        if (!label.includes(q) && !desc.includes(q)) return false;
      }
      return true;
    });
  }, [transactions, query, typeFilter, categoryFilter]);

  const totalIncome = sumWhere(transactions, "income");
  const totalExpenses = sumWhere(transactions, "expense");

  return (
    <div className={PAGE_ROOT.standard}>
      <header className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Transactions</h1>
          <p className={PAGE_HEADER.subtitle}>Manage your income and expenses</p>
        </div>
        <div className={PAGE_HEADER.actions}>
          <button type="button" className={HEADER_BUTTONS.dark} onClick={() => setTxOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Transaction
          </button>
        </div>
      </header>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <section className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-100/50" aria-label="Total Income">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Income
            </span>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900">{money(totalIncome)}</div>
        </section>
        <section className="bg-red-50/40 p-6 rounded-2xl border border-red-100/50" aria-label="Total Expenses">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-rose-600 shadow-sm">
              <ArrowDownLeft className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Expenses
            </span>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900">{money(totalExpenses)}</div>
        </section>
      </div>

      {/* List card */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search transactions"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40" aria-label="Filter by type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-44" aria-label="Filter by category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {[...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map((raw) => (
                <SelectItem key={raw} value={raw}>
                  {categoryMeta(raw).label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2">
            {transactions.length === 0 && hydrated ? (
              <>
                <p className="text-slate-500">No transactions yet</p>
                <Button variant="secondary" onClick={() => setTxOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add your first transaction
                </Button>
              </>
            ) : (
              <p className="text-slate-500">No transactions match your filters</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((t) => {
              const meta = categoryMeta(t.category);
              const income = t.type === "income";
              return (
                <div key={t.id} className="flex items-center justify-between py-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.tile}`}>
                      <meta.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-slate-900">
                        {meta.label}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {formatFullDate(t.date)}
                        {t.description ? ` · ${t.description}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1 text-sm font-bold ${
                        income ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {income ? (
                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                      ) : (
                        <ArrowDownLeft className="h-3 w-3 opacity-60" />
                      )}
                      {income ? "+" : "-"}
                      {money(t.amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(t)}
                      aria-label={`Delete ${meta.label} transaction`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <TransactionDialog open={txOpen} onOpenChange={setTxOpen} />
      <DeleteTransactionDialog
        transaction={pendingDelete}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}

function DeleteTransactionDialog({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose: () => void;
}) {
  const deleteTransaction = useBudgetStore((s) => s.deleteTransaction);
  const [submitting, setSubmitting] = React.useState(false);

  async function onConfirm() {
    if (!transaction || submitting) return;
    setSubmitting(true);
    await deleteTransaction(transaction.id);
    setSubmitting(false);
    onClose();
  }

  return (
    <AlertDialogPrimitive.Root open={transaction !== null} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <AlertDialogPrimitive.Title className="text-lg font-semibold">
            Delete Transaction
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-2 text-sm text-muted">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </AlertDialogPrimitive.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="secondary" disabled={submitting}>
                Cancel
              </Button>
            </AlertDialogPrimitive.Cancel>
            <Button onClick={onConfirm} disabled={submitting} className="bg-red-600 text-white hover:bg-red-700">
              <Trash2 className="mr-1 h-4 w-4" />
              {submitting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

function sumWhere(list: Transaction[], type: string): number {
  return Math.round(list.filter((t) => t.type === type).reduce((acc, t) => acc + t.amount, 0) * 100) / 100;
}

function formatFullDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
