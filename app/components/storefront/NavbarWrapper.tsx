import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Navbar } from "./Navbar";

export default async function NavbarWrapper() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();  // Ensure getUser is awaited correctly

  return <Navbar user={user} />;
}
