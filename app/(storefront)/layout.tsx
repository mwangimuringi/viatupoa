import { ReactNode } from "react";
import { Footer } from "../components/storefront/Footer";
import NavbarWrapper from "../components/storefront/NavbarWrapper";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      <main className="w-full 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
