"use client";

// The Transactions page — the reference's restyled layout mirrored
// (session-194, live-censused 2026-10-27):
//   header (the sm-stacking DIV + the DIRECT Add Transaction button —
//   full-width below sm) → the p-4 gradient summary pair → the ONE
//   filter card (search + the two shadcn selects) → the divide-y row
//   list (p-2.5 category chips, the category badge pill, the text-lg
//   amounts, the ghost icon delete).

import * as React from "react";
import { Plus, Search, Trash2 } from "lucide-react";
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
import { HEADER_BUTTONS, PAGE_HEADER, PAGE_ROOT, SUMMARY_CARD, TXN_LIST } from "@/lib/page-layout";
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
    <div className={PAGE_ROOT.content}>
      {/* Session-194: the sm-stacking header with the button DIRECTLY in
          the row (full-width below sm — the reference's own form). */}
      <div className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Transactions</h1>
          <p className={PAGE_HEADER.subtitle}>Manage your income and expenses</p>
        </div>
        <button type="button" className={HEADER_BUTTONS.dark} onClick={() => setTxOpen(true)}>
          <Plus className={HEADER_BUTTONS.icon} />
          Add Transaction
        </button>
      </div>

      {/* Summary pair — the p-4 gradient cards (the sections keep our
          aria-label superset; the reference ships plain DIVs). */}
      <div className={SUMMARY_CARD.grid}>
        <section className={SUMMARY_CARD.rootIncome} aria-label="Total Income">
          <p className={SUMMARY_CARD.labelIncome}>Total Income</p>
          <p className={SUMMARY_CARD.valueIncome}>{money(totalIncome)}</p>
        </section>
        <section className={SUMMARY_CARD.rootExpenses} aria-label="Total Expenses">
          <p className={SUMMARY_CARD.labelExpenses}>Total Expenses</p>
          <p className={SUMMARY_CARD.valueExpenses}>{money(totalExpenses)}</p>
        </section>
      </div>

      {/* The ONE filter card — search + the two selects (sm:w-40 /
          sm:w-48 — the reference's own widths). */}
      <div className="rounded-xl bg-card text-card-foreground p-4 border-0 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search transactions"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="sm:w-40" aria-label="Filter by type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-48" aria-label="Filter by category">
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
      </div>

      {/* The list card — divide-y rows (the reference's restyled form:
          the category title + the category badge pill + the weekday
          date + the text-lg amount + the ghost icon delete). */}
      <div className={TXN_LIST.card}>
        {filtered.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-6">
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
          <div className={TXN_LIST.rows}>
            {filtered.map((t) => {
              const meta = categoryMeta(t.category);
              const income = t.type === "income";
              return (
                <div key={t.id} className={TXN_LIST.row}>
                  <div className={`${TXN_LIST.chip} ${meta.tile}`}>
                    <meta.icon className="w-5 h-5" />
                  </div>
                  <div className={TXN_LIST.body}>
                    <div className={TXN_LIST.titleRow}>
                      {/* Session-194: the reference's row title is the
                          DESCRIPTION when present (its food row reads
                          "food"), the category label otherwise; the
                          badge always carries the category. */}
                      <p className={TXN_LIST.title}>{t.description || meta.label}</p>
                      <div className={TXN_LIST.badge}>{meta.label}</div>
                    </div>
                    <p className={TXN_LIST.sub}>{formatFullDate(t.date)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`${TXN_LIST.amount} ${
                          income ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {income ? "+" : "-"}
                        {money(t.amount)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(t)}
                      aria-label={`Delete ${meta.label} transaction`}
                      className={TXN_LIST.delete}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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
          <AlertDialogPrimitive.Description className="mt-2 text-sm text-muted-foreground">
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
