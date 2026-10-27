"use client";

// The Profile page — the reference's own layout mirrored:
//   header (H1 + "Manage your account and preferences")
//   identity card (avatar + camera upload, username, email, role badge,
//   "Member since {Month Year}")
//   Preferences (Currency select, About Me textarea with 0/120 counter,
//   Monthly Savings Goal, Save Preferences)
//   Financial Overview (month/year income-expenses, budget used %,
//   total transactions)
//   {Year} Summary (Total Earned / Total Spent / Net Saved)

import * as React from "react";
import {
  ArrowDownLeft,
  BadgeCheck,
  Camera,
  Mail,
  Save,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { CURRENCIES, ABOUT_ME_MAX } from "@/lib/currency";
import { money } from "@/lib/budget-math";
import { useBudgetStore } from "@/stores/budget-store";
import { PAGE_HEADER, PAGE_ROOT } from "@/lib/page-layout";
import type { DashboardData } from "@/types";

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
    <div className={PAGE_ROOT.standard}>
      <header className={PAGE_HEADER.root}>
        <div>
          <h1 className={PAGE_HEADER.title}>Profile</h1>
          <p className={PAGE_HEADER.subtitle}>Manage your account and preferences</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Identity + Preferences */}
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" aria-label="Account">
            {/* The reference's dark header with the avatar straddling
                the dark/white boundary */}
            <div className="bg-slate-900 h-24" />
            <div className="px-6 pb-6 flex justify-center">
              <div className="relative -mt-12">
                <Avatar
                  name={(profile?.name || user?.name || "U").slice(0, 1) || "U"}
                  color="#818cf8"
                  className="h-24 w-24 text-3xl ring-4 ring-white"
                />
                <label
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-slate-500 shadow-md border border-slate-100 hover:text-slate-700"
                  title="Upload photo"
                >
                  <Camera className="h-4 w-4" />
                  <input type="file" accept="image/*" className="sr-only" aria-label="Upload profile photo" />
                </label>
              </div>
            </div>
            <div className="px-6 pb-6 text-center">
              <h2 className="text-xl font-bold text-slate-900">{profile?.name || user?.name || "…"}</h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500">
                <Mail className="h-3.5 w-3.5" />
                {profile?.email || user?.email || "…"}
              </p>
              <div className="mt-3 flex justify-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  <BadgeCheck className="h-3 w-3" />
                  {(profile?.role || user?.role || "user").toLowerCase()}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500">Member since {memberSince}</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" aria-label="Preferences">
            <h3 className="mb-6 text-lg font-bold text-slate-900">Preferences</h3>
            <form onSubmit={onSave} className="space-y-5">
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-full" aria-label="Currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="about-me">About Me</Label>
                  <span className="text-xs text-slate-500" aria-live="polite">
                    {aboutMe.length}/{ABOUT_ME_MAX}
                  </span>
                </div>
                <Textarea
                  id="about-me"
                  maxLength={ABOUT_ME_MAX}
                  rows={3}
                  placeholder="A little about yourself and your financial goals…"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="savings-goal">Monthly Savings Goal ($)</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    $
                  </span>
                  <Input
                    id="savings-goal"
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    placeholder="0.00"
                    className="pl-7"
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

              <Button type="submit" disabled={saving || name.trim() === ""}>
                <Save className="mr-1 h-4 w-4" />
                {saving ? "Saving…" : "Save Preferences"}
              </Button>
            </form>
          </section>
        </div>

        {/* Financial Overview — the reference's 3x2 pastel grid */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" aria-label="Financial Overview">
            <h3 className="mb-6 text-lg font-bold text-slate-900">Financial Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatTile
                icon={TrendingUp}
                tint="bg-emerald-50 text-emerald-600"
                label="This Month Income"
                value={dashboard ? money(dashboard.income) : "…"}
              />
              <StatTile
                icon={TrendingDown}
                tint="bg-red-50 text-rose-600"
                label="This Month Expenses"
                value={dashboard ? money(dashboard.expenses) : "…"}
              />
              <StatTile
                icon={TrendingUp}
                tint="bg-blue-50 text-blue-600"
                label="Year Income"
                value={dashboard ? money(dashboard.yearSummary.income) : "…"}
              />
              <StatTile
                icon={TrendingDown}
                tint="bg-purple-50 text-purple-600"
                label="Year Expenses"
                value={dashboard ? money(dashboard.yearSummary.expenses) : "…"}
              />
              <StatTile
                icon={Target}
                tint="bg-amber-50 text-amber-600"
                label="Budget Used"
                value={dashboard?.overallBudget ? `${Math.round(dashboard.overallBudget.percentUsed)}%` : "0%"}
              />
              <StatTile
                icon={ArrowDownLeft}
                tint="bg-slate-100 text-slate-600"
                label="Total Transactions"
                value={dashboard ? String(dashboard.totalTransactions) : "…"}
              />
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
  // The reference's WHITE wide card with a horizontal row of three
  // large bold stats and small labels beneath.
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" aria-label={`${year} Summary`}>
      <h3 className="mb-6 text-lg font-bold text-slate-900">{year} Summary</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-emerald-600">{compact(earned)}</p>
          <p className="mt-1 text-xs text-slate-500">Total Earned</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-rose-600">{compact(spent)}</p>
          <p className="mt-1 text-xs text-slate-500">Total Spent</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{compact(net)}</p>
          <p className="mt-1 text-xs text-slate-500">Net Saved</p>
        </div>
      </div>
    </section>
  );
}

/** The reference's pastel stat tile — icon chip, small label, bold value. */
function StatTile({
  icon: Icon,
  tint,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl p-4">
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}>
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function compact(n: number): string {
  // The reference's year-summary trio renders compact "$5000"-style
  // values (no cents on the big numbers).
  const rounded = Math.round(n);
  return `$${rounded.toLocaleString("en-US")}`;
}
