import { DashboardPage } from "./dashboard-page";

// The canonical (lowercase) route. The capitalized /Dashboard alias lives
// at (app)/Dashboard/page.jsx — the reference's nav hrefs are capitalized
// while the router serves both casings. NO own metadata: the dashboard
// inherits the root layout's family wholesale (og:url = the origin root).

export default function DashboardRoute() {
  return <DashboardPage />;
}
