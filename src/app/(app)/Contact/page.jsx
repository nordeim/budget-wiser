// Session-142 (D-142a2): the /Contact capital-casing render alias — the
// reference's landing header + footer Contact links point at /Contact
// (capitalized; its platform serves both casings — the s24 dual-casing
// parity). The .jsx-extension pattern is the s24 TS1149 dodge (two real
// files whose paths differ only in casing trip TypeScript's casing
// check; the .jsx extension keeps the alias out of that collision). The
// lowercase route stays canonical.
import { pageMetadata } from "@/lib/site";
import ContactPageRoute from "../contact/page";

export const metadata = pageMetadata({ page: "Contact", route: "/Contact" });

export default function ContactCapitalRoute() {
  return <ContactPageRoute />;
}
