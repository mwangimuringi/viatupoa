import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

// Define the NavbarProps interface to accept `user` prop
interface NavbarProps {
  user: {
    id: string;
    email: string | null;
    given_name: string | null;
    family_name: string | null;
    picture: string | null;
  } | null;
}

export async function Navbar({ user }: NavbarProps) {
  // Hardcoded total for cart items (replace this with actual logic if needed)
  const total = 0;

  return (
    <nav className="w-full 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Shoe<span className="text-primary">Shop</span>
          </h1>
        </Link>
      </div>

      <NavbarLinks onClick={function (): void {
        throw new Error("Function not implemented.");
      }} />

      <div className="flex items-center">
        {user ? (
          <>
            <Link
              href="/cart"
              className="group p-2 flex items-center mt-1 mr-4 relative"
            >
              <ShoppingBagIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-800" />
              <span className="text-xs font-medium text-white absolute top-0 right-0 bg-primary rounded-full px-1.5 py-0.5">
                {total}
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
