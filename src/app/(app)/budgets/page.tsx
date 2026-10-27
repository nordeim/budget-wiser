import { BudgetsPage } from "./budgets-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Budgets", route: "/budgets" });

export default function BudgetsRoute() {
  return <BudgetsPage />;
}
