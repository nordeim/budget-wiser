import { TransactionsPage } from "./transactions-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Transactions", route: "/transactions" });

export default function TransactionsRoute() {
  return <TransactionsPage />;
}
