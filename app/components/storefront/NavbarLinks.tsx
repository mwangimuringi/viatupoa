"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavbarLinksProps {
  onClick: () => void; // Function to handle link clicks
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

  return (
    <ul className="h-screen md:h-auto items-center justify-center md:flex md:space-y-0 space-y-6">
      {navbarLinks.map((item) => (
        <li
          key={item.id}
          className="pb-6 md:pb-0 py-2 px-6 text-center text-slate-400 cursor-pointer text-xl border-b-2 md:border-b-0 hover:bg-gray-300 border-yellow-200 md:hover:text-slate-600 md:hover:bg-transparent"
        >
          <Link
            href={item.href}
            onClick={onClick} // Call onClick when link is clicked
            className={cn(
              location === item.href ? "bg-muted" : "hover:bg-muted",
              "group p-2 font-medium rounded-md"
            )}
          >
            <span className="flex-1">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
