"use client";

import { NavbarLinks } from "./NavbarLinks";
import CloseIcon from "@/public/icons/close-icon";

export function Sidenav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-100 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 focus:outline-none">
            <CloseIcon />
          </button>
        </div>
        <NavbarLinks onClick={onClose} />
      </div>

      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
    </div>
  );
}
