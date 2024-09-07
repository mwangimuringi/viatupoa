import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redis } from "@/app/lib/redis";
// import { Cart } from "@/app/lib/interfaces";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

//   const cart: Cart | null = await redis.get(`cart-${user?.id}`);
//   const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Viatu<span className="text-primary">Poa</span>
          </h1>
        </Link>
      </div>

      <NavbarLinks />

      <div className="flex items-center">
        {user ? (
          <>
            <Link
              href="/cart"
              className="group p-2 flex items-center mt-1 mr-4 relative"
            >
              <ShoppingBagIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-800" />
              <span className="text-xs font-medium text-white absolute top-0 right-0 bg-primary rounded-full px-1.5 py-0.5">
                {/* {total} */}
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={`${user.given_name} ${user.family_name}` as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button asChild variant="ghost">
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button asChild variant="ghost">
              <RegisterLink>Create account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}