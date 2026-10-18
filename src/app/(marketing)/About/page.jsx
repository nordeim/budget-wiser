// Session-142 (D-142a2): the /About capital-casing render alias — the
// reference's landing footer links point at /About (capitalized; its
// platform serves both casings — the s24 dual-casing parity). The
// .jsx-extension pattern is the s24 TS1149 dodge: two real files whose
// paths differ ONLY in casing ((marketing)/About/page.tsx vs
// (marketing)/about/page.tsx) trip TypeScript's casing check (not
// flag-controllable); the .jsx extension keeps the alias out of that
// collision (paths differ by extension) while compiling identically
// through SWC. The lowercase route stays canonical. Session-144
// (D-144a1): the alias moved (app) → (marketing) with its canonical.
import { pageMetadata } from "@/lib/site";
import AboutPageRoute from "../about/page";

export const metadata = pageMetadata({ page: "About", route: "/About" });

export default function AboutCapitalRoute() {
  return <AboutPageRoute />;
}
