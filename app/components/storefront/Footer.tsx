import { footerLinks } from "@/constants";  // Assuming this is where footerLinks is defined
import Link from "next/link";

// Define the type for individual link items
type LinkProps = {
  name: string;  // Link name, e.g. "Terms of Service"
  path: string;  // Path for the link, e.g. "/terms-of-service"
};

// Define the type for the column props
type ColumnProps = {
  title: string;  // Title of the column, e.g. "Legal"
  links: LinkProps[];  // Array of LinkProps (name and path)
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold text-lg mb-4">{title}</h4>
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <Link href={link.path} key={link.name} className="text-gray-700 hover:text-black">
          {link.name}  {/* Display the link's name */}
        </Link>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="w-full bg-gray-100 border-t border-black mt-12 py-10">
    <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main content */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {footerLinks.map((category, index) => (
            <FooterColumn
              key={index}
              title={category.title}
              links={category.links}  // Pass the links with both name and path
            />
          ))}
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-black pt-6 flex justify-between items-center text-gray-500 text-sm">
        <p>
          &copy; 2024 Viatupoa. All rights reserved. Developed by{" "}
          <Link
            href="https://github.com/mwangimuringi"
            target="_blank"
            className="font-semibold hover:underline"
          >
            mwangi muringi
          </Link>
        </p>
        <p>
          <span className="font-semibold text-gray-900">15,230</span> shoes sold
          worldwide
        </p>
      </div>
    </div>
  </footer>
);
