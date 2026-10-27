"use client";

// The Set Budget dialog (the reference's own form mirrored: Category
// select + Monthly Limit $ input + disabled-until-valid submit) and the
// Delete-Budget alertdialog confirmation ("Are you sure you want to
// delete this budget? This action cannot be undone." — Cancel/Delete).

import * as React from "react";
import { Target, Trash2 } from "lucide-react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES, categoryMeta } from "@/lib/categories";
import { monthLabel } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";

export function SetBudgetDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const setBudget = useBudgetStore((s) => s.setBudget);
  const [category, setCategory] = React.useState("");
  const [limit, setLimit] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const now = new Date();
  const subtitle = `Set a monthly spending limit for ${monthLabel(now.getFullYear(), now.getMonth() + 1)}`;

  const reset = () => {
    setCategory("");
    setLimit("");
    setError(null);
    setSubmitting(false);
  };

  const close = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const limitValue = Number(limit);
  const valid =
    category !== "" && limit.trim() !== "" && Number.isFinite(limitValue) && limitValue > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    const res = await setBudget({ category, monthlyLimit: limitValue });
    if (res.ok) {
      close(false);
    } else {
      setError(res.error);
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Set Budget</DialogTitle>
          <DialogDescription className="text-sm text-muted">{subtitle}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="budget-category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="budget-category" className="w-full" aria-label="Category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((raw) => (
                  <SelectItem key={raw} value={raw}>
                    {categoryMeta(raw).label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="budget-limit">Monthly Limit</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                $
              </span>
              <Input
                id="budget-limit"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0.00"
                className="pl-7"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={!valid || submitting} className="w-full">
            <Target className="mr-1 h-4 w-4" />
            {submitting ? "Saving…" : "Set Budget"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** The delete confirmation — the reference's own alertdialog pair
 *  (Cancel / Delete), mirroring its exact wording. */
export function DeleteBudgetDialog({
  budgetId,
  onOpenChange,
}: {
  budgetId: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  const deleteBudget = useBudgetStore((s) => s.deleteBudget);
  const [submitting, setSubmitting] = React.useState(false);

  const close = (next: boolean) => {
    if (!next) onOpenChange(false);
  };

  async function onConfirm() {
    if (!budgetId || submitting) return;
    setSubmitting(true);
    await deleteBudget(budgetId);
    setSubmitting(false);
    onOpenChange(false);
  }

  return (
    <AlertDialogPrimitive.Root open={budgetId !== null} onOpenChange={close}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <AlertDialogPrimitive.Title className="text-lg font-semibold">
            Delete Budget
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-2 text-sm text-muted">
            Are you sure you want to delete this budget? This action cannot be undone.
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
