import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";


interface NavbarLinksProps {
  onClick: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ onClick })  => {
  return (
    <ul className="h-screen md:h-auto items-center justify-center md:flex md:space-y-0 space-y-6">
      {[
        {
          label: "Buy",
          links: [
            { href: "/home/for-sale", text: "Home for sale" },
            { href: "/home/foreclosures", text: "Foreclosures" },
            { href: "/home/for-sale-by-owner", text: "For sale by owner" },
            { href: "/home/open-houses", text: "Open houses" },
            { href: "/home/new-construction", text: "New construction" },
            { href: "/home/all-home-sales", text: "All home sales" },
          ],
        },
        {
          label: "Sell",
          links: [
            { href: "/home/sell", text: "Sell" },
            { href: "/sell/apartments-estimate", text: "Apartments estimate" },
            { href: "/sell/house-value", text: "House value" },
            { href: "/sell/sellers-guide", text: "Sellers guide" },
            { href: "/sell/post-for-sale-by-owner", text: "Post for sale by owner" },
          ],
        },
        {
          label: "Rent",
          links: [
            { href: "/home/rent/rental-buildings", text: "Rental buildings" },
            { href: "/home/rent/rent-apartments", text: "Apartments for rent" },
            { href: "/home/rent/rent-houses", text: "Houses for rent" },
            { href: "/home/rent/all-rental-buildings", text: "All rental buildings" },
            { href: "/home/rent/your-rental", text: "Your rental" },
            { href: "/home/rent/messages", text: "Messages" },
          ],
        },
        {
          label: "Manage Rentals",
          links: [
            { href: "/home/manage-rentals/list-rental", text: "List a rental" },
            { href: "/home/manage-rentals/leases", text: "Leases" },
            { href: "/home/my-rentals/listings", text: "My Listings" },
            { href: "/home/my-rentals/payments", text: "Payments" },
          ],
        },
        {
          label: "Find an Agent",
          links: [
            { href: "/home/agent/realtor-agent", text: "Real estate agents" },
            { href: "/home/agent/property-managers", text: "Property managers" },
          ],
        },
        { label: "Advertise", links: [] },
        { label: "Help", links: [] },
      ].map((item, index) => (
        <li key={index} className="pb-6 md:pb-0 py-2 px-6 text-center text-slate-400 cursor-pointer text-xl border-b-2 md:border-b-0 hover:bg-gray-300 border-yellow-200 md:hover:text-slate-600 md:hover:bg-transparent">
          {item.links.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href={`/home/${item.label.toLowerCase()}`} onClick={onClick}>
                <div className="flex items-center justify-between w-full md:space-x-0 space-x-1">
                  <span className="flex-1 md:flex-none">{item.label}</span>
                  <ChevronDown className="w-4 h-4 ml-2 hidden md:block md:items-end md:justify-end" />
                  <ChevronRight className="w-4 h-4 ml-2 block md:hidden" />
                </div>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 md:h-1/2 max-h-[50vh] overflow-y-auto min-w-[200px] bg-white shadow-lg rounded-lg">
              <div className="flex flex-col items-center">
                {item.links.map((link, linkIndex) => (
                  <DropdownMenuItem key={linkIndex} onClick={onClick} className="text-center">
                    <Link href={link.href}>{link.text}</Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <Link href={`/home/${item.label.toLowerCase()}`} onClick={onClick} className="flex items-center justify-center w-full hover:text-blue-500 hover:underline">
              <span className="flex-1">{item.label}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;