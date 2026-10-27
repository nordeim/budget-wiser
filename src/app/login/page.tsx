import { LoginCard } from "@/components/layout/login-card";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

// The login page title is plain "Budget Wise" (document.title probe) —
// not "Sign in | Budget Wise". The title must be ABSOLUTE — a relative
// string rides the root layout's "%s | Budget Wise" template and SSRs the
// DOUBLED "Budget Wise | Budget Wise". The UNPREFIXED metadata family
// ships on /login too — og:title "Budget Wise", the plain description,
// og:url/twitter:url + canonical at origin/login — built through the
// pageMetadata() factory (page: null = the unprefixed family; the factory
// keeps the ABSOLUTE title).
export const metadata = pageMetadata({ page: null, route: "/login" });

export const dynamic = "force-dynamic";

// Session-23 (S23-P2): NO authenticated redirect here — the login card
// renders to AUTHENTICATED visitors too. The page stays force-dynamic.
export default function LoginPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      <LoginCard />
    </main>
  );
}
