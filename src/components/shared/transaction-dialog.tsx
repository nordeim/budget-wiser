"use client";

// The Add Transaction dialog — the reference's own form mirrored:
// Expense/Income tabs (the category list swaps with the tab), a $
// Amount number input, the Category select, a native Date input, an
// optional Description, and the submit button that stays DISABLED until
// the form is valid (its label flips "Add Expense" / "Add Income").

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
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
import { categoriesForType, categoryMeta } from "@/lib/categories";
import { useBudgetStore } from "@/stores/budget-store";
import type { TransactionType } from "@/lib/categories";

export function TransactionDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addTransaction = useBudgetStore((s) => s.addTransaction);
  const [type, setType] = React.useState<TransactionType>("expense");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState(() => todayISO());
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const reset = React.useCallback(() => {
    setType("expense");
    setAmount("");
    setCategory("");
    setDate(todayISO());
    setDescription("");
    setError(null);
    setSubmitting(false);
  }, []);

  const close = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const amountValue = Number(amount);
  const valid =
    amount.trim() !== "" &&
    Number.isFinite(amountValue) &&
    amountValue > 0 &&
    category !== "" &&
    date !== "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    const res = await addTransaction({
      type,
      amount: amountValue,
      category,
      date,
      description: description.trim() || undefined,
    });
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
          {/* Session-194: the reference's restyled dialog title —
              tracking-tight text-xl font-semibold, NO description
              paragraph (byte-extracted; ours had shipped a subtitle). */}
          <DialogTitle className="tracking-tight text-xl font-semibold">
            Add Transaction
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6 pt-4">
          <Tabs
            tabs={[
              { id: "expense", label: "Expense" },
              { id: "income", label: "Income" },
            ]}
            value={type}
            onValueChange={(v) => {
              setType(v as TransactionType);
              setCategory(""); // the category list swaps with the tab
            }}
            variant="segmented"
            cols={2}
          />

          <div className="space-y-2">
            <Label htmlFor="tx-amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                $
              </span>
              <Input
                id="tx-amount"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0.00"
                className="pl-8 text-lg font-medium"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tx-category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="tx-category" className="w-full" aria-label="Category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesForType(type).map((raw) => (
                  <SelectItem key={raw} value={raw}>
                    {categoryMeta(raw).label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tx-date">Date</Label>
            <Input
              id="tx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tx-description">Description (optional)</Label>
            <Input
              id="tx-description"
              type="text"
              maxLength={200}
              placeholder="Add a note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={!valid || submitting}
            className="w-full"
            variant="default"
          >
            {/* Session-194: the reference's submit is TEXT-ONLY (no
                icons — byte-extracted); the label flips with the tab. */}
            {submitting ? "Adding…" : type === "expense" ? "Add Expense" : "Add Income"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
