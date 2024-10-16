"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface NavbarLinksProps {
  onClick: () => void; 
}

const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Men", href: "/products/men" },
  { id: 3, name: "Women", href: "/products/women" },
  { id: 4, name: "Kids", href: "/products/kids" },
  { id: 5, name: "Admin", href: "/dashboard" },
];

export function NavbarLinks({ onClick }: NavbarLinksProps) {
  const location = usePathname();

  // Automatically close the sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClick(); // Close the sidebar when the screen is larger than md (768px)
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onClick]);

  return (
    <div className="h-screen md:h-auto items-center justify-center md:flex space-y-6 md:space-y-0 overflow-y-auto md:overflow-visible">
      {navbarLinks.map((item) => (
        <div
          key={item.id}
          className="pb-2 md:pb-0 px-6 text-center text-slate-500 cursor-pointer text-lg border-b-2 md:border-b-0"
        >
          <Link
            href={item.href}
            onClick={onClick} 
            className={cn(
              location === item.href ? "bg-slate-50" : "hover:bg-slate-50",
              "group p-2 font-medium rounded-md md:hover:underline md:hover:text-blue-600 hover:underline hover:text-blue-600"
            )}
          >
            <span className="flex-1">{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
