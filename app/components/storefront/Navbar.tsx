"use client";

import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cart } from "@/types/interfaces";
import { redis } from "@/app/lib/redis";
import { useState } from "react";
import CloseIcon from "@/public/icons/close-icon";
import HamburgerIcon from "@/public/icons/hamburger";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import NavbarLinks from "./NavbarLinks";

export async function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
  const handleCloseNavbar = () => {
    setNavbar(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-100 shadow-md h-20">
      <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8 ">
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

        <div className="flex items-center md:ml-auto space-x-2 ">
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 min-w-[80px] bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                  <DropdownMenuItem>
                    <Link
                      href="/sign-in"
                      className="flex items-center space-x-2 text-center"
                    >
                      <span>Sign in</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 text-center"
                    >
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/logout"
                      className="flex items-center space-x-2 text-center"
                    >
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${navbar ? "block bg-white" : "hidden"} p-4`}>
        <NavbarLinks onClick={handleCloseNavbar} />
      </div>
    </nav>
  );
}