"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cart } from "@/types/interfaces";
import { redis } from "@/app/lib/redis";
import { useState, useEffect } from "react";
import CloseIcon from "@/public/icons/close-icon";
import HamburgerIcon from "@/public/icons/hamburger";
import NavbarLinks from "./NavbarLinks";

interface NavbarProps {
  user: {
    id: string;
    email: string | null;
    given_name: string | null;
    family_name: string | null;
    picture: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [navbar, setNavbar] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const cart: Cart | null = await redis.get(`cart-${user.id}`);
        setTotal(cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0);
      }
    };
    fetchCart();
  }, [user]);

  const handleCloseNavbar = () => {
    setNavbar(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-100 shadow-md h-20">
      <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8">
        <div className="md:hidden">
          <button
            aria-label={navbar ? "Close menu" : "Open menu"}
            onClick={() => setNavbar(!navbar)}
            className="p-2 rounded-md text-gray-700 outline-none focus:border-gray-400"
          >
            {navbar ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        <div className="flex-1 flex justify-center py-3 md:py-5 md:justify-start">
          <Link href="/" className="flex items-center text-2xl font-extrabold">
            <h1 className="text-black font-bold text-xl lg:text-3xl">
              Viatu<span className="text-primary">Poa</span>
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <NavbarLinks onClick={handleCloseNavbar} />
        </div>

        <div className="flex items-center md:ml-auto space-x-2">
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
                  user.picture ??
                  `https://github.com/mwangimuringi/${user.given_name}`
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
      </div>
      <div className={`md:hidden ${navbar ? "block bg-white" : "hidden"} p-4`}>
        <NavbarLinks onClick={handleCloseNavbar} />
      </div>
    </nav>
  );
}
