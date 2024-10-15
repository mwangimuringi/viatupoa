import { ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
