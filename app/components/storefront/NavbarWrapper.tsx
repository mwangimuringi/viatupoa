import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Navbar } from "./Navbar";

export default async function NavbarWrapper() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <Navbar user={user} />;
}
