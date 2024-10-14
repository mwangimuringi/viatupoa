import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/brands", label: "Brands" },
  { href: "/sizes", label: "Shoe Sizes" },
  { href: "/collections", label: "Collections" },
  { href: "/sale", label: "Sale" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="w-full 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <img
          src="/favicon.webp"
          alt="Viatupoa Logo"
          className="mx-auto h-12 w-auto left-3"
        />
        <p className="mt-2 text-left leading-5 text-gray-700">
          Viatupoa is a fashion brand that offers trendy and affordable
          clothing for women.
        </p>
      </div>
      <div className="mb-4">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="mx-2 text-sm leading-5 hover:underline transition duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-900/10 py-8 sm:mt-20 lg:mt-24 text-center">
      <p className="text-sm leading-5 text-gray-700">
        &copy; 2024 Developed by{" "}
        <Link
          href="https://github.com/mwangimuringi"
          target="_blank"
          className="font-semibold hover:underline"
        >
          mwangi muringi
        </Link>{" "}
        | All rights reserved.
      </p>
      </div>
    </footer>
  );
}
