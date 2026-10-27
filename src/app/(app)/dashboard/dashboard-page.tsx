"use client";

// The Dashboard page — the reference's own layout mirrored:
//   header (H1 + "{Month Year} Overview" + Set Budget + Add Transaction)
//   4 KPI cards (Balance + savings badge, Income, Expenses, Transactions)
//   charts row (Spending donut · Budget Progress · Spend Summary tabs)
//   bottom row (Recent Transactions · AI Insights)

import * as React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsPanel } from "@/components/ui/tabs";
import { SpendingDonut, WeeklyBars } from "@/components/charts/budget-charts";
import { TransactionDialog } from "@/components/shared/transaction-dialog";
import { SetBudgetDialog } from "@/components/shared/budget-dialog";
import { categoryMeta } from "@/lib/categories";
import { money } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import { HEADER_BUTTONS, KPI_CARD, PAGE_HEADER, PAGE_ROOT, PANEL } from "@/lib/page-layout";
import type { DashboardData } from "@/types";

export function DashboardPage() {
  const dashboard = useBudgetStore((s) => s.dashboard);
  const hydrated = useBudgetStore((s) => s.hydrated);
  const [txOpen, setTxOpen] = React.useState(false);
  const [budgetOpen, setBudgetOpen] = React.useState(false);

  return (
    <div className={PAGE_ROOT.standard}>
      <header className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Dashboard</h1>
          <p className={PAGE_HEADER.subtitle}>
            {dashboard ? `${dashboard.monthLabel} Overview` : "Loading…"}
          </p>
        </div>
        <div className={PAGE_HEADER.actions}>
          <button type="button" className={HEADER_BUTTONS.outline} onClick={() => setBudgetOpen(true)}>
            <Target className="h-4 w-4" />
            Set Budget
          </button>
          <button type="button" className={HEADER_BUTTONS.dark} onClick={() => setTxOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Transaction
          </button>
        </div>
      </header>

      {dashboard ? <DashboardBody data={dashboard} /> : hydrated ? <EmptyState /> : <LoadingState />}

      <TransactionDialog open={txOpen} onOpenChange={setTxOpen} />
      <SetBudgetDialog open={budgetOpen} onOpenChange={setBudgetOpen} />
    </div>
  );
}

function DashboardBody({ data }: { data: DashboardData }) {
  const [summaryTab, setSummaryTab] = React.useState("week");

  return (
    <>
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <section className={KPI_CARD.root} aria-label="Balance">
          <div className={KPI_CARD.topRow}>
            <span className={KPI_CARD.label}>Balance</span>
            <span className={KPI_CARD.chip}>
              <Wallet className="h-4 w-4" />
            </span>
          </div>
          <div className={KPI_CARD.value}>{money(data.balance)}</div>
          {data.savingsPercent !== null ? (
            <div className="mt-2">
              <span className={KPI_CARD.badge}>
                <ArrowUpRight className="h-3 w-3" />
                {data.savingsPercent}% saved
              </span>
            </div>
          ) : null}
        </section>

        <section className={KPI_CARD.rootIncome} aria-label="Income">
          <div className={KPI_CARD.topRow}>
            <span className={KPI_CARD.label}>Income</span>
            <span className={KPI_CARD.chipIncome}>
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className={KPI_CARD.value}>{money(data.income)}</div>
        </section>

        <section className={KPI_CARD.rootExpenses} aria-label="Expenses">
          <div className={KPI_CARD.topRow}>
            <span className={KPI_CARD.label}>Expenses</span>
            <span className={KPI_CARD.chipIncome}>
              <TrendingDown className="h-4 w-4" />
            </span>
          </div>
          <div className={KPI_CARD.value}>{money(data.expenses)}</div>
        </section>

        <section className={KPI_CARD.root} aria-label="Transactions">
          <div className={KPI_CARD.topRow}>
            <span className={KPI_CARD.label}>Transactions</span>
            <span className={KPI_CARD.chip}>
              <ArrowDownLeft className="h-4 w-4" />
            </span>
          </div>
          <div className={KPI_CARD.value}>{data.transactionCount}</div>
          <p className={KPI_CARD.hint}>This month</p>
        </section>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <section className={`${PANEL.root} ${PANEL.colSpan4}`} aria-label="Spending by Category">
          <h3 className={PANEL.title}>Spending by Category</h3>
          <SpendingDonut data={data.spendingByCategory} />
        </section>

        <section className={`${PANEL.root} ${PANEL.colSpan4}`} aria-label="Budget Progress">
          <h3 className={PANEL.title}>Budget Progress</h3>
          {data.budgets.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center">
              <p className={PANEL.empty}>No budgets set for this month</p>
            </div>
          ) : (
            <div className="space-y-5">
              {data.budgets.map((b) => {
                const meta = categoryMeta(b.category);
                const pct = Math.min(100, b.percentUsed);
                return (
                  <div key={b.category}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-900">{meta.label}</span>
                      <span className="text-slate-500">
                        {money(b.spent)} / {money(b.monthlyLimit)}
                      </span>
                    </div>
                    <div
                      className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-valuenow={Math.round(b.percentUsed)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${meta.label} budget usage`}
                    >
                      <div
                        className={
                          b.percentUsed > 100
                            ? "h-full rounded-full bg-rose-500"
                            : b.percentUsed >= 80
                              ? "h-full rounded-full bg-amber-500"
                              : "h-full rounded-full bg-slate-900"
                        }
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{money(b.remaining)} remaining</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className={`${PANEL.root} ${PANEL.colSpan4}`} aria-label="Spend Summary">
          <h3 className={PANEL.title}>Spend Summary</h3>
          <Tabs
            tabs={[
              { id: "week", label: "This Week" },
              { id: "year", label: "This Year" },
            ]}
            value={summaryTab}
            onValueChange={setSummaryTab}
            variant="segmented"
            cols={2}
            className="mb-6"
          >
            <TabsPanel tab="week">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-xs text-slate-500">Week Spent</p>
                  <p className="text-xl font-bold text-rose-600">{money(data.week.weekSpent)}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-slate-500">Week Earned</p>
                  <p className="text-xl font-bold text-emerald-600">{money(data.week.weekEarned)}</p>
                </div>
              </div>
              <WeeklyBars buckets={data.week.buckets} />
            </TabsPanel>
            <TabsPanel tab="year">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-xs text-slate-500">Year Spent</p>
                  <p className="text-xl font-bold text-rose-600">{money(data.yearSummary.expenses)}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-slate-500">Year Earned</p>
                  <p className="text-xl font-bold text-emerald-600">{money(data.yearSummary.income)}</p>
                </div>
              </div>
              <div className="flex h-[192px] items-center justify-center rounded-xl bg-slate-50">
                <p className="text-sm text-slate-500">Year-to-date totals shown above</p>
              </div>
            </TabsPanel>
          </Tabs>
        </section>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className={`${PANEL.root} ${PANEL.colSpan7}`} aria-label="Recent Transactions">
          <h3 className={PANEL.title}>Recent Transactions</h3>
          {data.recentTransactions.length === 0 ? (
            <div className="flex min-h-[160px] items-center justify-center">
              <p className={PANEL.empty}>No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {data.recentTransactions.map((t) => {
                const meta = categoryMeta(t.category);
                const income = t.type === "income";
                return (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${meta.tile}`}>
                        <meta.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{meta.label}</h4>
                        <p className="text-xs text-slate-500">{formatDate(t.date)}</p>
                      </div>
                    </div>
                    <div
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <AiInsightsPanel data={data} />
      </div>
    </>
  );
}

/** AI Insights — deterministic, offline insights (the superset decision:
 *  no external LLM dependency; the same Generate affordance with instant,
 *  data-derived call-outs). */
function AiInsightsPanel({ data }: { data: DashboardData }) {
  const [generated, setGenerated] = React.useState(false);

  const insights: Array<{ icon: React.ElementType; tone: string; text: string }> = [];
  if (data.spendingByCategory.length > 0) {
    const top = data.spendingByCategory[0];
    insights.push({
      icon: Target,
      tone: "text-amber-500",
      text: `Your biggest spending category this month is ${categoryMeta(top.category).label} at ${money(top.amount)}.`,
    });
  }
  if (data.savingsPercent !== null) {
    insights.push({
      icon: TrendingUp,
      tone: "text-emerald-500",
      text:
        data.savingsPercent >= 20
          ? `You saved ${data.savingsPercent}% of your income this month — right on a healthy pace.`
          : `You saved ${data.savingsPercent}% of your income. Trimming expenses by ${money(data.expenses * 0.1)} would lift that by 10%.`,
    });
  }
  const overBudget = data.budgets.filter((b) => b.percentUsed > 100);
  if (overBudget.length > 0) {
    insights.push({
      icon: TrendingDown,
      tone: "text-rose-500",
      text: `${overBudget.length === 1 ? "One budget is over" : `${overBudget.length} budgets are over`} their limit — ${categoryMeta(overBudget[0].category).label} leads at ${overBudget[0].percentUsed}% used.`,
    });
  } else if (data.budgets.length > 0) {
    insights.push({
      icon: Sparkles,
      tone: "text-indigo-500",
      text: "All your budgets are on track this month. Keep it up!",
    });
  }

  return (
    <section
      className="lg:col-span-5 rounded-2xl border border-indigo-100/50 bg-indigo-50/30 p-6"
      aria-label="AI Insights"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <Sparkles className="h-4 w-4" />
          </span>
          <h3 className="text-lg font-bold text-slate-900">AI Insights</h3>
        </div>
        <Button
          variant="secondary"
          className="h-8 px-3 text-xs font-semibold"
          onClick={() => setGenerated(true)}
        >
          <Sparkles className="mr-1 h-3 w-3" />
          Generate
        </Button>
      </div>

      {generated && insights.length > 0 ? (
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl bg-white/70 p-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${insight.tone}`}>
                <insight.icon className="h-4 w-4" />
              </span>
              <p className="pt-1 text-sm leading-relaxed text-slate-600">{insight.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center gap-6 pl-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-yellow-500 shadow-sm">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-500 shadow-sm">
            <TrendingUp className="h-4 w-4" />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-500 shadow-sm">
            <Target className="h-4 w-4" />
          </span>
          <p className="text-sm text-slate-600">
            Personalized spending analysis — press Generate.
          </p>
        </div>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-busy="true">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-[140px] animate-pulse rounded-2xl bg-white shadow-sm" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
      <p className="text-slate-500">No data yet — add your first transaction.</p>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
