"use client";

// The Budgets page — the reference's own layout mirrored:
//   header (H1 + "{Month Year} spending limits" + Set Budget)
//   Overall Budget Usage progress bar + percent
//   KPI trio (Active Budgets / On Track / Over Budget)
//   budget cards (category, "$X of $Y", status badge, progress bar,
//   remaining, delete) or the empty state ("Set Your First Budget")

import * as React from "react";
import { Plus, Target, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetBudgetDialog, DeleteBudgetDialog } from "@/components/shared/budget-dialog";
import { categoryMeta } from "@/lib/categories";
import { money, monthLabel } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import { HEADER_BUTTONS, PAGE_HEADER, PAGE_ROOT } from "@/lib/page-layout";

export function BudgetsPage() {
  const budgets = useBudgetStore((s) => s.budgets);
  const [setOpen, setSetOpen] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<string | null>(null);

  const now = new Date();
  const subtitle = `${monthLabel(now.getFullYear(), now.getMonth() + 1)} spending limits`;

  const overallLimit = budgets.reduce((acc, b) => acc + b.monthlyLimit, 0);
  const overallSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const overallPct = overallLimit > 0 ? Math.round((overallSpent / overallLimit) * 100) : 0;
  const overBudget = budgets.filter((b) => b.spent > b.monthlyLimit).length;
  const onTrack = budgets.length - overBudget;

  return (
    <div className={PAGE_ROOT.standard}>
      <header className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Budgets</h1>
          <p className={PAGE_HEADER.subtitle}>{subtitle}</p>
        </div>
        <div className={PAGE_HEADER.actions}>
          <button type="button" className={HEADER_BUTTONS.dark} onClick={() => setSetOpen(true)}>
            <Target className="h-4 w-4" />
            Set Budget
          </button>
        </div>
      </header>

      {/* Overall usage + the KPI trio — the reference's ONE dark card */}
      <section className="bg-slate-900 rounded-2xl shadow-sm p-6 sm:p-8 mb-6" aria-label="Overall Budget Usage">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-400">Overall Budget Usage</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{money(overallSpent)}</span>
              <span className="text-slate-400">/ {money(overallLimit)}</span>
              <span className="ml-auto text-sm font-semibold text-slate-300">{overallPct}%</span>
            </div>
            <div
              className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-700"
              role="progressbar"
              aria-valuenow={overallPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall budget usage"
            >
              <div
                className={
                  overallPct > 100
                    ? "h-full rounded-full bg-rose-500"
                    : overallPct >= 80
                      ? "h-full rounded-full bg-amber-500"
                      : "h-full rounded-full bg-emerald-500"
                }
                style={{ width: `${Math.min(100, overallPct)}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-10 lg:border-l lg:border-slate-700 lg:pl-12">
            <div className="text-center lg:text-left" aria-label="Active Budgets">
              <p className="text-3xl font-bold text-white">{budgets.length}</p>
              <p className="mt-1 text-sm text-slate-400">Active Budgets</p>
            </div>
            <div className="text-center lg:text-left" aria-label="On Track">
              <p className="text-3xl font-bold text-emerald-400">{onTrack}</p>
              <p className="mt-1 text-sm text-slate-400">On Track</p>
            </div>
            <div className="text-center lg:text-left" aria-label="Over Budget">
              <p className="text-3xl font-bold text-rose-400">{overBudget}</p>
              <p className="mt-1 text-sm text-slate-400">Over Budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget cards / empty state */}
      {budgets.length === 0 ? (
        <section className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Target className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-bold text-slate-900">No budgets set</h3>
          <p className="mt-1 mb-6 text-sm text-slate-500">
            Start by setting spending limits for different categories
          </p>
          <Button onClick={() => setSetOpen(true)} className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="mr-1 h-4 w-4" />
            Set Your First Budget
          </Button>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((b) => {
            const meta = categoryMeta(b.category);
            const pct = b.monthlyLimit > 0 ? (b.spent / b.monthlyLimit) * 100 : 0;
            const over = b.spent > b.monthlyLimit;
            const nearlyFull = !over && pct >= 80;
            return (
              <section key={b.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" aria-label={`${meta.label} budget`}>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${meta.tile}`}>
                      <meta.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{meta.label}</h3>
                      <p className="text-sm text-slate-500">
                        {money(b.spent)} of {money(b.monthlyLimit)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        over
                          ? "rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700"
                          : nearlyFull
                            ? "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"
                            : "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                      }
                    >
                      {over ? "Over Budget" : nearlyFull ? "Nearly Full" : "On Track"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(b.id)}
                      aria-label={`Delete ${meta.label} budget`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={Math.round(pct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${meta.label} budget usage`}
                >
                  <div
                    className={
                      over
                        ? "h-full rounded-full bg-rose-500"
                        : nearlyFull
                          ? "h-full rounded-full bg-amber-500"
                          : "h-full rounded-full bg-slate-900"
                    }
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  {money(Math.max(0, b.monthlyLimit - b.spent))} remaining
                </p>
              </section>
            );
          })}
        </div>
      )}

      <SetBudgetDialog open={setOpen} onOpenChange={setSetOpen} />
      <DeleteBudgetDialog budgetId={pendingDelete} onOpenChange={() => setPendingDelete(null)} />
    </div>
  );
}
