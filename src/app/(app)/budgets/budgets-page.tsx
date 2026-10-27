"use client";

// The Budgets page — the reference's restyled layout mirrored
// (session-194, live-censused 2026-10-27):
//   header (the sm-stacking DIV + the DIRECT Set Budget button) →
//   the gradient dark overall-usage card (rounded-xl
//   bg-gradient-to-br from-slate-900 to-slate-800, the 4xl value,
//   NO percent label, the emerald gradient track, the flex-gap-6 trio) →
//   the per-budget cards (the h-2 gradient top strip + the p-5 body +
//   the status badge + the h-3 primary/20 track) or the p-12 empty
//   state (the BARE w-12 h-12 slate-300 icon).

import * as React from "react";
import { Plus, Target, TriangleAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetBudgetDialog, DeleteBudgetDialog } from "@/components/shared/budget-dialog";
import { categoryMeta } from "@/lib/categories";
import { money, monthLabel } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import {
  BUDGET_CARD,
  DARK_CARD,
  EMPTY_STATE,
  HEADER_BUTTONS,
  PAGE_HEADER,
  PAGE_ROOT,
} from "@/lib/page-layout";

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
    <div className={PAGE_ROOT.content}>
      {/* Session-194: the sm-stacking header with the button DIRECTLY in
          the row (full-width below sm — the reference's own form). */}
      <div className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Budgets</h1>
          <p className={PAGE_HEADER.subtitle}>{subtitle}</p>
        </div>
        <button type="button" className={HEADER_BUTTONS.dark} onClick={() => setSetOpen(true)}>
          <Plus className={HEADER_BUTTONS.icon} />
          Set Budget
        </button>
      </div>

      {/* The gradient dark card — the reference's restyled form (NO
          percent label; the emerald gradient track). The section keeps
          our aria-label + progressbar supersets. */}
      <section className={DARK_CARD.root} aria-label="Overall Budget Usage">
        <div className={DARK_CARD.inner}>
          <div className={DARK_CARD.left}>
            <p className={DARK_CARD.label}>Overall Budget Usage</p>
            <div className="flex items-baseline gap-2">
              <span className={DARK_CARD.value}>{money(overallSpent)}</span>
              <span className={DARK_CARD.total}>/ {money(overallLimit)}</span>
            </div>
            <div
              className={DARK_CARD.track}
              role="progressbar"
              aria-valuenow={overallPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall budget usage"
            >
              <div
                className={DARK_CARD.fill}
                style={{ width: `${Math.min(100, overallPct)}%` }}
              />
            </div>
          </div>
          <div className={DARK_CARD.trio}>
            <div className={DARK_CARD.trioCell} aria-label="Active Budgets">
              <div className={DARK_CARD.trioValue}>{budgets.length}</div>
              <p className={DARK_CARD.trioLabel}>Active Budgets</p>
            </div>
            <div className={DARK_CARD.trioCell} aria-label="On Track">
              <div className={`${DARK_CARD.trioValue} text-emerald-400`}>{onTrack}</div>
              <p className={DARK_CARD.trioLabel}>On Track</p>
            </div>
            <div className={DARK_CARD.trioCell} aria-label="Over Budget">
              <div className={`${DARK_CARD.trioValue} text-rose-400`}>{overBudget}</div>
              <p className={DARK_CARD.trioLabel}>Over Budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget cards / empty state */}
      {budgets.length === 0 ? (
        <section className={EMPTY_STATE.root}>
          {/* The reference's BARE icon — w-12 h-12 slate-300, no tinted
              container (byte-extracted 2026-10-27). */}
          <Target className={EMPTY_STATE.icon} />
          <h3 className={EMPTY_STATE.title}>No budgets set</h3>
          <p className={EMPTY_STATE.sub}>
            Start by setting spending limits for different categories
          </p>
          <Button onClick={() => setSetOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
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
              <section key={b.id} className={BUDGET_CARD.root} aria-label={`${meta.label} budget`}>
                {/* The reference's gradient top strip (emerald → amber →
                    rose by state; byte-extracted from its populated DOM). */}
                <div
                  className={
                    over ? BUDGET_CARD.stripRose : nearlyFull ? BUDGET_CARD.stripAmber : BUDGET_CARD.strip
                  }
                />
                <div className={BUDGET_CARD.body}>
                  <div className={BUDGET_CARD.topRow}>
                    <div>
                      <h3 className={BUDGET_CARD.title}>{meta.label}</h3>
                      <p className={BUDGET_CARD.spent}>
                        {money(b.spent)} of {money(b.monthlyLimit)}
                      </p>
                    </div>
                    <div className={BUDGET_CARD.actions}>
                      <span
                        className={`${BUDGET_CARD.badge} ${
                          over
                            ? BUDGET_CARD.badgeOver
                            : nearlyFull
                              ? BUDGET_CARD.badgeWarn
                              : BUDGET_CARD.badgeOk
                        }`}
                      >
                        {over ? (
                          <TriangleAlert className={BUDGET_CARD.badgeIcon} />
                        ) : null}
                        {over ? "Over" : nearlyFull ? "Warning" : "On Track"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(b.id)}
                        aria-label={`Delete ${meta.label} budget`}
                        className={BUDGET_CARD.delete}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      over ? BUDGET_CARD.track : nearlyFull ? BUDGET_CARD.trackWarn : BUDGET_CARD.trackOk
                    }
                    role="progressbar"
                    aria-valuenow={Math.round(pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${meta.label} budget usage`}
                  >
                    <div
                      className={BUDGET_CARD.fill}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                  <p className={over ? BUDGET_CARD.remainingOver : BUDGET_CARD.remaining}>
                    {over
                      ? `${money(b.spent - b.monthlyLimit)} over budget`
                      : `${money(Math.max(0, b.monthlyLimit - b.spent))} remaining`}
                  </p>
                </div>
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
