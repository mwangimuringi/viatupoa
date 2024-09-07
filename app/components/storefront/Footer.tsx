import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-900/10 py-8 sm:mt-20 lg:mt-24 text-center">
        <p className="text-sm leading-5 text-gray-700">
          &copy; 2024 Developed by{" "}
          <Link
            href="https://github.com/mwangimuringi"
            target="_blank"
            className="font-semibold"
          >
            mwangi muringi
          </Link>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}