"use client";

// The Budget Wise public LANDING PAGE — the marketing surface at `/`
// (outside the (app) group: no session guard; auth state changes
// nothing). The CTA routes to /login, where the authed user continues
// to /Dashboard.
//
// Tailwind v4 discipline: standard palette classes only; no `hidden`
// attribute fighting display utilities — the mobile panel
// MOUNTS/UNMOUNTS.

import * as React from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_SECTION_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Budget Wise home">
            <span className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 p-2">
              <Wallet className="h-5 w-5 text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight">BudgetWise</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Site sections">
            {NAV_SECTION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              className="ml-3 flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
            {NAV_SECTION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
            <Sparkles className="h-4 w-4" />
            Personal finance, simplified
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Every dollar in view.
            <span className="block text-slate-500">Nothing slips through.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
            Budget Wise turns daily spending into a clear picture of your financial
            health — track income and expenses the moment they happen, set
            category budgets that keep you honest, and watch your savings rate
            climb month over month.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800"
            >
              Start tracking free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#preview"
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-base font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            >
              See it in action
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Free forever for personal use · No credit card required
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your money needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            The tools that make budgeting stick — simple enough for every day,
            sharp enough for every dollar.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Wallet,
              tint: "bg-emerald-50 text-emerald-600",
              title: "Instant transaction logging",
              text: "Income or expense in three fields — amount, category, date. Log it the moment it happens and your balance is already up to date.",
            },
            {
              icon: Target,
              tint: "bg-rose-50 text-rose-600",
              title: "Category budgets that bite",
              text: "Set monthly limits per category and watch the progress bars fill. Amber as you close in, red the moment you cross the line.",
            },
            {
              icon: TrendingUp,
              tint: "bg-indigo-50 text-indigo-600",
              title: "Live savings rate",
              text: "Your balance, income, expenses, and savings rate recalculate with every entry — the dashboard is always the current truth.",
            },
            {
              icon: Sparkles,
              tint: "bg-amber-50 text-amber-600",
              title: "AI-sparked insights",
              text: "One tap surfaces your biggest spending category, budget warnings, and concrete next steps — derived from your own data.",
            },
            {
              icon: ChevronDown,
              tint: "bg-cyan-50 text-cyan-600",
              title: "Week-by-week rhythm",
              text: "The spend summary charts every Monday-to-Sunday alongside year-to-date totals — spot the expensive weeks before they compound.",
            },
            {
              icon: Check,
              tint: "bg-slate-100 text-slate-600",
              title: "Your preferences, kept",
              text: "Currency, savings goal, and about-me ride your profile — every surface formats money exactly the way you read it.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", f.tint)}>
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section id="preview" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A dashboard that thinks in months
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              October opens with your balance, your budgets, and your habits
              already on one screen.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-4 text-sm text-slate-500">budgetwise.app/Dashboard</span>
              </div>
              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Balance</p>
                  <p className="mt-2 text-2xl font-bold">$4,424.55</p>
                  <span className="mt-2 inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    ↑ 88.5% saved
                  </span>
                </div>
                <div className="rounded-xl bg-emerald-50/40 p-4 ring-1 ring-emerald-100/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Income</p>
                  <p className="mt-2 text-2xl font-bold">$5,000.00</p>
                </div>
                <div className="rounded-xl bg-red-50/40 p-4 ring-1 ring-red-100/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Expenses</p>
                  <p className="mt-2 text-2xl font-bold">$575.45</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:col-span-2">
                  <p className="text-sm font-semibold text-slate-900">Recent Transactions</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>🧾 Bills & Utilities</span>
                      <span className="font-semibold text-rose-600">-$75.45</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>🚗 Transport</span>
                      <span className="font-semibold text-rose-600">-$100.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>💼 Salary</span>
                      <span className="font-semibold text-emerald-600">+$5,000.00</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-indigo-50/30 p-4 ring-1 ring-indigo-100/50">
                  <p className="text-sm font-semibold text-slate-900">AI Insights</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    Your biggest category is Other at $400. All budgets on track.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One simple price</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Personal budgeting should not be a subscription.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-lg">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-lg font-semibold">Budget Wise</h3>
            <p className="mt-4 text-5xl font-bold">
              $0
              <span className="text-base font-normal text-slate-500"> / forever</span>
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Unlimited transactions",
                "Category budgets with progress tracking",
                "Weekly and yearly spend summaries",
                "AI insights from your own data",
                "Profile preferences and savings goals",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/login"
              className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions</h2>
          </div>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "Is Budget Wise really free?",
                a: "Yes — every feature on the dashboard is free for personal use. No tiers, no locked exports, no ads.",
              },
              {
                q: "Where does my data live?",
                a: "Your transactions and budgets live in your own deployment's database. This is a self-hosted app — you own the data end to end.",
              },
              {
                q: "Can I use a currency other than dollars?",
                a: "Yes — the profile supports USD, EUR, GBP, CAD, and AUD, and every money surface follows your preference.",
              },
              {
                q: "How do budgets work across months?",
                a: "Budgets are per category, per month. Set a limit once and each new month starts fresh with the same limits — adjust any time.",
              },
            ].map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className="rounded-xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span className="font-medium text-slate-900">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-slate-400 transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  {open ? (
                    <p
                      id={`faq-panel-${i}`}
                      className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-500"
                    >
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          <span>© 2026 BudgetWise</span>
          <span className="flex gap-4">
            <a className="transition-colors hover:text-slate-800" href="/About">
              About
            </a>
            <a className="transition-colors hover:text-slate-800" href="/Contact">
              Contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
