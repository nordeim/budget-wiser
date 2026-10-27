import { pageMetadata } from "@/lib/site";

// The ABOUT page — Budget Wise's marketing page inside the (marketing)
// group (auth-gated shell). A pure server component — no state, no
// client JS.
export const metadata = pageMetadata({ page: "About", route: "/about" });

const ABOUT_PARAGRAPHS = [
  "Budget Wise is a clean, intuitive personal finance platform built to keep every dollar in view. Instead of juggling spreadsheets, receipts, and mental math, you get a single workspace where every transaction, budget, and insight lives side by side — logged the moment money moves and reflected on your dashboard instantly.",
  "With Budget Wise you can track income and expenses across the categories you actually spend in, set monthly budgets with live progress bars, and review your spending week by week and month over month. The AI Insights panel surfaces your biggest categories and budget warnings from your own data, and your profile keeps your currency, savings goal, and preferences exactly the way you want them.",
  "Budget Wise is designed for individuals, families, and freelancers who want the clarity of a professional finance tool without the clutter of an enterprise suite. It is fast, friendly, and works beautifully on both desktop and mobile.",
] as const;

export default function AboutPageRoute() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">About Budget Wise</h1>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
          {ABOUT_PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 24)} className="text-slate-700 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Want to say hello?{" "}
          <a className="font-medium text-slate-900 underline underline-offset-2" href="/Contact">
            Get in touch with us →
          </a>
        </p>
      </div>
    </div>
  );
}
