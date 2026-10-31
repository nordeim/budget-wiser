"use client";

// The Dashboard page — the reference's restyled layout mirrored
// (session-194, live-censused 2026-10-27):
//   header (a plain sm-stacking DIV + tracking-tight H1 + the gap-3
//   dual actions) → 4 KPI cards (rounded-xl border-0 shadow-sm, the
//   gradient income/expenses variants, p-3 icon chips) → the
//   lg:grid-cols-3 body (donut + budget-progress in the col-span-2's
//   md:grid-cols-2, recent transactions below; spend-summary + AI
//   insights in the right rail).

import * as React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Lightbulb,
  Plus,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Tabs, TabsPanel } from "@/components/ui/tabs";
import { SpendingDonut, WeeklyBars } from "@/components/charts/budget-charts";
import { TransactionDialog } from "@/components/shared/transaction-dialog";
import { SetBudgetDialog } from "@/components/shared/budget-dialog";
import { categoryMeta } from "@/lib/categories";
import { money } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import { HEADER_BUTTONS, KPI_CARD, PAGE_HEADER, PAGE_ROOT, PANEL, RECENT_ROW } from "@/lib/page-layout";
import type { DashboardData } from "@/types";

/** The reference's restyled Generate button (byte-extracted) — the
 * indigo-tinted outline form, h-8, text-xs. */
const AI_GENERATE_BUTTON =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-8 rounded-md px-3 text-xs bg-white hover:bg-indigo-50 border-indigo-200";

export function DashboardPage() {
  const dashboard = useBudgetStore((s) => s.dashboard);
  const hydrated = useBudgetStore((s) => s.hydrated);
  const [txOpen, setTxOpen] = React.useState(false);
  const [budgetOpen, setBudgetOpen] = React.useState(false);

  return (
    <div className={PAGE_ROOT.wide}>
      {/* Session-194: a plain DIV header (the reference's own form) that
          stacks below sm; the dual actions nest in the gap-3 row. */}
      <div className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Dashboard</h1>
          <p className={PAGE_HEADER.subtitle}>
            {dashboard ? `${dashboard.monthLabel} Overview` : "Loading…"}
          </p>
        </div>
        <div className={PAGE_HEADER.actions}>
          <button type="button" className={HEADER_BUTTONS.outline} onClick={() => setBudgetOpen(true)}>
            <Target className={HEADER_BUTTONS.icon} />
            Set Budget
          </button>
          <button type="button" className={HEADER_BUTTONS.dark} onClick={() => setTxOpen(true)}>
            <Plus className={HEADER_BUTTONS.icon} />
            Add Transaction
          </button>
        </div>
      </div>

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
      {/* KPI cards — the restyled family (gradients, p-3 chips with
          w-6 h-6 icons, tracking-tight values). The sections keep our
          aria-label superset (the reference ships plain DIVs). */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <section className={KPI_CARD.root} aria-label="Balance">
          <div className={KPI_CARD.topRow}>
            <div className={KPI_CARD.inner}>
              <p className={KPI_CARD.label}>Balance</p>
              <p className={KPI_CARD.value}>{money(data.balance)}</p>
              {data.savingsPercent !== null ? (
                <span className={KPI_CARD.badge}>
                  <ArrowUpRight className="h-3 w-3" />
                  {data.savingsPercent}% saved
                </span>
              ) : null}
            </div>
            <div className={KPI_CARD.chip}>
              <Wallet className={KPI_CARD.chipIcon} />
            </div>
          </div>
        </section>

        <section className={KPI_CARD.rootIncome} aria-label="Income">
          <div className={KPI_CARD.topRow}>
            <div className={KPI_CARD.inner}>
              <p className={KPI_CARD.label}>Income</p>
              <p className={KPI_CARD.value}>{money(data.income)}</p>
            </div>
            <div className={KPI_CARD.chip}>
              <TrendingUp className={KPI_CARD.chipIcon} />
            </div>
          </div>
        </section>

        <section className={KPI_CARD.rootExpenses} aria-label="Expenses">
          <div className={KPI_CARD.topRow}>
            <div className={KPI_CARD.inner}>
              <p className={KPI_CARD.label}>Expenses</p>
              <p className={KPI_CARD.value}>{money(data.expenses)}</p>
            </div>
            <div className={KPI_CARD.chip}>
              <TrendingDown className={KPI_CARD.chipIcon} />
            </div>
          </div>
        </section>

        <section className={KPI_CARD.root} aria-label="Transactions">
          <div className={KPI_CARD.topRow}>
            <div className={KPI_CARD.inner}>
              <p className={KPI_CARD.label}>Transactions</p>
              <p className={KPI_CARD.value}>{data.transactionCount}</p>
              <p className={KPI_CARD.hint}>This month</p>
            </div>
            <div className={KPI_CARD.chip}>
              <Target className={KPI_CARD.chipIcon} />
            </div>
          </div>
        </section>
      </div>

      {/* The restyled body: the 3-col grid with the col-span-2 left
          (donut + budget progress side-by-side, recent transactions
          below) and the right rail (spend summary + AI insights). */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className={PANEL.root} aria-label="Spending by Category">
              <div className={PANEL.header}>
                <div className={PANEL.title}>Spending by Category</div>
              </div>
              <div className={PANEL.content}>
                <SpendingDonut data={data.spendingByCategory} />
              </div>
            </section>

            <section className={PANEL.root} aria-label="Budget Progress">
              <div className={PANEL.header}>
                <div className={PANEL.title}>Budget Progress</div>
              </div>
              {data.budgets.length === 0 ? (
                /* The reference's empty form: the h-48 centered panel. */
                <div className="p-6 pt-0 flex items-center justify-center h-48">
                  <p className={PANEL.empty}>No budgets set for this month</p>
                </div>
              ) : (
                <div className={PANEL.content}>
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
                </div>
              )}
            </section>
          </div>

          <section className={PANEL.root} aria-label="Recent Transactions">
            <div className={PANEL.header}>
              <div className={PANEL.title}>Recent Transactions</div>
            </div>
            <div className={`${PANEL.content} space-y-1`}>
              {data.recentTransactions.length === 0 ? (
                <div className="flex min-h-[160px] items-center justify-center">
                  <p className={PANEL.empty}>No transactions yet</p>
                </div>
              ) : (
                data.recentTransactions.map((t) => {
                  const meta = categoryMeta(t.category);
                  const income = t.type === "income";
                  return (
                    <div key={t.id} className={RECENT_ROW.row}>
                      <div className={`${RECENT_ROW.chip} ${meta.tile}`}>
                        <meta.icon className="w-5 h-5" />
                      </div>
                      <div className={RECENT_ROW.body}>
                        {/* Session-194: description-first title (the
                            reference's recent rows read the description
                            when present). */}
                        <p className={RECENT_ROW.title}>{t.description || meta.label}</p>
                        <p className={RECENT_ROW.sub}>{formatDate(t.date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Session-218 (F-1): the reference's amount-direction
                            arrow before every recent-row amount — the same
                            genus as the /Transactions rows (live-probed on
                            the reference's Recent Transactions list). */}
                        {income ? (
                          <ArrowUpRight className={RECENT_ROW.arrowIncome} />
                        ) : (
                          <ArrowDownLeft className={RECENT_ROW.arrowExpense} />
                        )}
                        <span
                          className={`${RECENT_ROW.amount} ${
                            income ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {income ? "+" : "-"}
                          {money(t.amount)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className={PANEL.root} aria-label="Spend Summary">
            <div className={PANEL.header}>
              <div className={PANEL.title}>Spend Summary</div>
            </div>
            <div className={PANEL.content}>
              <Tabs
                tabs={[
                  { id: "week", label: "This Week" },
                  { id: "year", label: "This Year" },
                ]}
                value={summaryTab}
                onValueChange={setSummaryTab}
                variant="segmented"
                className="mb-4"
              >
                <TabsPanel tab="week">
                  <div className="flex gap-6 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Week Spent</p>
                      <p className="text-xl font-bold text-rose-600">{money(data.week.weekSpent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Week Earned</p>
                      <p className="text-xl font-bold text-emerald-600">{money(data.week.weekEarned)}</p>
                    </div>
                  </div>
                  <WeeklyBars buckets={data.week.buckets} />
                </TabsPanel>
                <TabsPanel tab="year">
                  <div className="flex gap-6 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Year Spent</p>
                      <p className="text-xl font-bold text-rose-600">{money(data.yearSummary.expenses)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Year Earned</p>
                      <p className="text-xl font-bold text-emerald-600">{money(data.yearSummary.income)}</p>
                    </div>
                  </div>
                  <div className="flex h-[192px] items-center justify-center rounded-xl bg-slate-50">
                    <p className="text-sm text-slate-500">Year-to-date totals shown above</p>
                  </div>
                </TabsPanel>
              </Tabs>
            </div>
          </section>

          <AiInsightsPanel data={data} />
        </div>
      </div>
    </>
  );
}

/** AI Insights — deterministic, offline insights (the superset decision:
 *  no external LLM dependency; the same Generate affordance with instant,
 *  data-derived call-outs). The panel chrome mirrors the reference's
 *  restyled indigo gradient form (session-194). */
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
      className="rounded-xl text-card-foreground border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50"
      aria-label="AI Insights"
    >
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-100">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="tracking-tight text-lg font-semibold text-slate-900">AI Insights</div>
          </div>
          <button type="button" className={AI_GENERATE_BUTTON} onClick={() => setGenerated(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate
          </button>
        </div>
      </div>
      <div className="p-6 pt-0">
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
          /* The reference's empty form: the centered py-8 stack with the
             three p-3 rounded-full chips + the slate-600 sentence. */
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center gap-4">
              <div className="p-3 rounded-full bg-white shadow-sm">
                <Lightbulb className="w-6 h-6 text-amber-500" />
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">
                <TrendingDown className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">
                <Target className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
            <p className="text-slate-600">
              Get personalized insights based on your spending patterns
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" aria-busy="true">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-[140px] animate-pulse rounded-xl bg-white shadow-sm" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl bg-card text-card-foreground p-12 text-center border-0 shadow-sm">
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
