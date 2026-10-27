// The /Profile capital alias (the reference's nav href form).
// A .jsx file ON PURPOSE — TypeScript's TS1149 fires whenever one program
// includes two real files whose paths differ only in casing; the .jsx
// extension keeps the alias out of that collision.
import ProfileRoute from "../profile/page";

export default function ProfileCapitalRoute() {
  return <ProfileRoute />;
}
