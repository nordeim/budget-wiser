import { pageMetadata } from "@/lib/site";

// The CONTACT page — Budget Wise's second marketing page. A pure server
// component.
export const metadata = pageMetadata({ page: "Contact", route: "/contact" });

export default function ContactPageRoute() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <p className="text-slate-700 leading-relaxed mb-8">
          Have a question about Budget Wise, need a hand getting set up, or want to share
          feedback? We would love to hear from you.
        </p>
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 mb-1">Email us</h2>
              <p className="text-sm text-slate-500 mb-2">
                We usually reply within one business day.
              </p>
              <a
                className="text-sm font-medium text-indigo-600 underline underline-offset-2"
                href="mailto:support@budgetwise.local"
              >
                support@budgetwise.local
              </a>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Thanks for using Budget Wise — your money deserves a clear picture.
        </p>
      </div>
    </div>
  );
}
