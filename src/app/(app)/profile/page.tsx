import { ProfilePage } from "./profile-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Profile", route: "/profile" });

export default function ProfileRoute() {
  return <ProfilePage />;
}
