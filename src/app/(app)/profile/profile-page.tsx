"use client";

// The Profile page — the reference's restyled layout mirrored
// (session-194, live-censused 2026-10-27):
//   the max-w-4xl container + the mb-8 title block (NO header actions) →
//   grid-cols-1 lg:grid-cols-3 (the identity+preferences column + the
//   lg:col-span-2 overview column) → the identity card (h-20 gradient
//   header, the w-20 h-20 border-4 avatar at -mt-10 with the
//   group-hover photo overlay, the role badge, the member-since row) →
//   the Preferences card (the NATIVE currency select, the 2-row About
//   Me textarea with the 0/120 counter, the $ savings input, the
//   w-full submit) → the pastel 2×3 overview grid + the 2026 Summary.

import * as React from "react";
import {
  Calendar,
  Camera,
  CircleCheck,
  Mail,
  Save,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENCIES, ABOUT_ME_MAX } from "@/lib/currency";
import { money } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import { PAGE_HEADER, PAGE_ROOT } from "@/lib/page-layout";
import type { DashboardData } from "@/types";

/** Session-194: the reference's NATIVE currency select — a plain
 * <select> (not a Radix one), byte-extracted from its live DOM. */
const NATIVE_SELECT =
  "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300";

export function ProfilePage() {
  const profile = useBudgetStore((s) => s.profile);
  const dashboard = useBudgetStore((s) => s.dashboard);
  const fetchProfile = useBudgetStore((s) => s.fetchProfile);
  const saveProfile = useBudgetStore((s) => s.saveProfile);
  const user = useBudgetStore((s) => s.user);

  const [name, setName] = React.useState("");
  const [currency, setCurrency] = React.useState<string>("USD");
  const [aboutMe, setAboutMe] = React.useState("");
  const [savingsGoal, setSavingsGoal] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  // Hydrate the form once when the profile arrives — the sanctioned
  // adjust-during-render pattern (compare against the last-seen profile
  // id; the re-render triggered by the arriving profile lands the state
  // before the form paints stale).
  const [hydratedProfileId, setHydratedProfileId] = React.useState<string | null>(null);
  if (profile && profile.id !== hydratedProfileId) {
    setHydratedProfileId(profile.id);
    setName(profile.name ?? "");
    setCurrency(profile.currency ?? "USD");
    setAboutMe(profile.aboutMe ?? "");
    setSavingsGoal(profile.savingsGoal != null ? String(profile.savingsGoal) : "");
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    const res = await saveProfile({
      name: name.trim(),
      currency,
      aboutMe: aboutMe.trim() || undefined,
      savingsGoal: savingsGoal.trim() === "" ? null : Number(savingsGoal),
    });
    if (res.ok) {
      setMessage("Preferences saved");
    } else {
      setError(res.error);
    }
    setSaving(false);
  }

  const now = new Date();
  const memberSince = profile
    ? profile.createdAt
      ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : `${now.toLocaleDateString("en-US", { month: "long" })} ${now.getFullYear()}`
    : "…";

  return (
    <div className={PAGE_ROOT.narrow}>
      {/* Session-194: the reference's profile header carries NO actions —
          a bare mb-8 title block. */}
      <div className="mb-8">
        <h1 className={PAGE_HEADER.title}>Profile</h1>
        <p className={PAGE_HEADER.subtitle}>Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity + Preferences */}
        <div className="space-y-6">
          <section
            className="rounded-xl bg-card text-card-foreground border-0 shadow-sm overflow-hidden"
            aria-label="Account"
          >
            {/* The reference's h-20 gradient header */}
            <div className="h-20 bg-gradient-to-br from-slate-900 to-slate-700" />
            <div className="p-6 pt-0 pb-6">
              {/* The w-20 h-20 border-4 avatar at -mt-10 with the
                  group-hover photo overlay (byte-extracted). */}
              <div className="-mt-10 mb-4 flex justify-center">
                <div className="relative group">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-20 h-20 border-4 border-white shadow-md">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold">
                      {(profile?.name || user?.name || "U").slice(0, 1).toUpperCase() || "U"}
                    </span>
                  </span>
                  <label
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    title="Upload photo"
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input type="file" accept="image/*" className="hidden" aria-label="Upload profile photo" />
                  </label>
                </div>
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-slate-900">{profile?.name || user?.name || "…"}</h2>
                <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {profile?.email || user?.email || "…"}
                </p>
                {/* The reference's role badge — the shadcn Badge form
                    (indigo-100 tint, mt-2). */}
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow bg-indigo-100 text-indigo-700 hover:bg-indigo-100 mt-2">
                  {(profile?.role || user?.role || "user").toLowerCase()}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">Member since {memberSince}</p>
              </div>
            </div>
          </section>

          <section
            className="rounded-xl bg-card text-card-foreground border-0 shadow-sm"
            aria-label="Preferences"
          >
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="tracking-tight text-base font-semibold text-slate-900">Preferences</div>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <form onSubmit={onSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    className={NATIVE_SELECT}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <Label htmlFor="about-me">About Me</Label>
                  </div>
                  <Textarea
                    id="about-me"
                    maxLength={ABOUT_ME_MAX}
                    rows={2}
                    placeholder="Describe yourself in a sentence..."
                    className="resize-none text-sm"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 text-right" aria-live="polite">
                    {aboutMe.length}/{ABOUT_ME_MAX}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savings-goal">Monthly Savings Goal ($)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      $
                    </span>
                    <Input
                      id="savings-goal"
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="pl-8"
                      value={savingsGoal}
                      onChange={(e) => setSavingsGoal(e.target.value)}
                    />
                  </div>
                </div>

                {error ? (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                ) : null}
                {message ? (
                  <p role="status" className="text-sm text-emerald-700">
                    {message}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={saving || name.trim() === ""}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving…" : "Save Preferences"}
                </Button>
              </form>
            </div>
          </section>
        </div>

        {/* Financial Overview — the lg:col-span-2 right column */}
        <div className="lg:col-span-2 space-y-6">
          <section
            className="rounded-xl bg-card text-card-foreground border-0 shadow-sm"
            aria-label="Financial Overview"
          >
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="tracking-tight text-base font-semibold text-slate-900">Financial Overview</div>
            </div>
            <div className="p-6 pt-0">
              {/* The reference's pastel 2×3 grid — tinted rounded-xl p-4
                  cells with the icon row + the text-xl bold tinted value. */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <StatTile
                  icon={TrendingUp}
                  tint="bg-emerald-50"
                  iconTint="text-emerald-600"
                  valueTint="text-emerald-600"
                  label="This Month Income"
                  value={dashboard ? money(dashboard.income) : "…"}
                />
                <StatTile
                  icon={TrendingDown}
                  tint="bg-rose-50"
                  iconTint="text-rose-600"
                  valueTint="text-rose-600"
                  label="This Month Expenses"
                  value={dashboard ? money(dashboard.expenses) : "…"}
                />
                <StatTile
                  icon={Calendar}
                  tint="bg-blue-50"
                  iconTint="text-blue-600"
                  valueTint="text-blue-600"
                  label="Year Income"
                  value={dashboard ? money(dashboard.yearSummary.income) : "…"}
                />
                <StatTile
                  icon={Wallet}
                  tint="bg-violet-50"
                  iconTint="text-violet-600"
                  valueTint="text-violet-600"
                  label="Year Expenses"
                  value={dashboard ? money(dashboard.yearSummary.expenses) : "…"}
                />
                <StatTile
                  icon={Target}
                  tint="bg-amber-50"
                  iconTint="text-amber-600"
                  valueTint="text-amber-600"
                  label="Budget Used"
                  value={dashboard?.overallBudget ? `${Math.round(dashboard.overallBudget.percentUsed)}%` : "0%"}
                />
                <StatTile
                  icon={CircleCheck}
                  tint="bg-slate-50"
                  iconTint="text-slate-600"
                  valueTint="text-slate-600"
                  label="Total Transactions"
                  value={dashboard ? String(dashboard.totalTransactions) : "…"}
                />
              </div>
            </div>
          </section>

          <YearSummary dashboard={dashboard} />
        </div>
      </div>
    </div>
  );
}

function YearSummary({ dashboard }: { dashboard: DashboardData | null }) {
  const year = new Date().getFullYear();
  const earned = dashboard?.yearSummary.income ?? 0;
  const spent = dashboard?.yearSummary.expenses ?? 0;
  const net = Math.round((earned - spent) * 100) / 100;
  // The reference's card: the text-base title + the space-y-4 body +
  // the grid-cols-3 text-center trio (2xl bold tinted values, xs
  // labels) — the Net value carries the sign's tint (Net Loss rose).
  return (
    <section
      className="rounded-xl bg-card text-card-foreground border-0 shadow-sm"
      aria-label={`${year} Summary`}
    >
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="tracking-tight text-base font-semibold text-slate-900">{year} Summary</div>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-emerald-600">{compact(earned)}</p>
            <p className="text-xs text-slate-500">Total Earned</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-rose-600">{compact(spent)}</p>
            <p className="text-xs text-slate-500">Total Spent</p>
          </div>
          <div className="space-y-1">
            <p className={`text-2xl font-bold ${net < 0 ? "text-rose-600" : "text-emerald-600"}`}>
              {compact(Math.abs(net))}
            </p>
            <p className="text-xs text-slate-500">{net < 0 ? "Net Loss" : "Net Saved"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The reference's pastel stat tile — the tinted rounded-xl p-4 cell
 *  with the icon row (w-4 h-4 tinted icon + the xs slate-600 label)
 *  and the text-xl bold tinted value. */
function StatTile({
  icon: Icon,
  tint,
  iconTint,
  valueTint,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  iconTint: string;
  valueTint: string;
  label: string;
  value: string;
}) {
  return (
    <div className={`rounded-xl p-4 space-y-2 ${tint}`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${iconTint}`} />
        <p className="text-xs font-medium text-slate-600">{label}</p>
      </div>
      <p className={`text-xl font-bold ${valueTint}`}>{value}</p>
    </div>
  );
}

function compact(n: number): string {
  // The reference's year-summary trio renders compact "$5000"-style
  // values (no cents on the big numbers).
  const rounded = Math.round(n);
  return `$${rounded.toLocaleString("en-US")}`;
}
