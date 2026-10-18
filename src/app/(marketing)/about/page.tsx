import { pageMetadata } from "@/lib/site";

// Session-142 (D-142a2): the ABOUT page — one of the reference's two new
// app pages (its index-Dc6wvGtA.js marketing layer). The construction and
// every string are the live-censused reference DOM: the min-h-screen
// bg-gray-50 wrapper, the max-w-3xl px-4 sm:px-8 py-12 container, the
// three intro paragraphs, the 4 icon cards and the "Get in touch with us
// →" link. A pure server component — no state, no client JS.
//
// Session-144 (D-144a1/F-144c1): the page moved (app) → (marketing) —
// the reference serves it to GUESTS (walk34, rendered-level: the full
// content + the app chrome + the "Hi, Guest" topbar). The s142 placement
// auth-gated it on an UNVERIFIED assumption (its own comment claimed
// "the reference's guest-visible app shell is a base44 platform
// artifact" — wrong decode: the marketing family is deliberately
// public; the platform-artifact face is the CRM DATA pages, a different
// thing our (app) guard still fixes). The (marketing) layout is
// session-optional — the same chrome for guests (APP_GUEST_USER) and
// logged-in users.
export const metadata = pageMetadata({ page: "About", route: "/about" });

const ABOUT_PARAGRAPHS = [
  "NEO CRM is a clean, intuitive customer relationship management platform built to help you manage your accounts, contacts, and leads from one centralized, customizable dashboard. Instead of juggling spreadsheets, sticky notes, and scattered email threads, you get a single workspace where every relationship, conversation, and opportunity lives side by side.",
  "With NEO CRM you can track companies and the people who work there, follow leads through a customizable pipeline, schedule meetings and calls on a shared calendar, and record every activity against the right record. Built-in reports turn that everyday activity into clear insight, so you can see what is working, where deals stall, and which relationships need attention. The settings area lets you tailor sources, stages, and defaults so the app reflects the way you actually work.",
  "NEO CRM is designed for individuals, freelancers, and small sales teams who want the power of a professional CRM without the clutter and complexity of an enterprise suite. It is built and maintained by the NEO CRM team, with a focus on speed, clarity, and a friendly experience on both desktop and mobile.",
] as const;

// The icon glyphs are inline SVGs (the lucide paths, byte-shaped like the
// reference's DOM) — a server component renders static SVG with zero
// client JS; lucide-react would hydrate the identical markup.
const ABOUT_CARDS: Array<{ title: string; body: string; glyph: React.ReactNode; name: string }> = [
  {
    name: "users",
    title: "Accounts & Contacts",
    body: "Keep every company and person you work with in one organized place.",
    glyph: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    name: "target",
    title: "Leads & Pipeline",
    body: "Track prospects from first contact all the way to a closed deal.",
    glyph: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
  {
    name: "calendar-check",
    title: "Activities & Calendar",
    body: "Log calls, emails and meetings, and never miss a follow-up.",
    glyph: (
      <>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </>
    ),
  },
  {
    name: "chart-column",
    title: "Reports",
    body: "Understand your performance with clear, visual analytics.",
    glyph: (
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </>
    ),
  },
];

export default function AboutPageRoute() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About NEO CRM</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          {ABOUT_CARDS.map((card) => (
            <div key={card.title} className="bg-white border rounded-xl p-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-${card.name} w-6 h-6 text-blue-600 mb-3`}
                aria-hidden="true"
              >
                {card.glyph}
              </svg>
              <h2 className="font-semibold text-gray-900 mb-1">{card.title}</h2>
              <p className="text-sm text-gray-600">{card.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a className="text-blue-600 font-medium hover:underline" href="/Contact">
            Get in touch with us →
          </a>
        </div>
      </div>
    </div>
  );
}
