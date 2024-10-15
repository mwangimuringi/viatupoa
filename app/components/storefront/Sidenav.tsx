"use client";

import Link from "next/link";
import { useState } from "react";
import { NavbarLinks } from "./NavbarLinks";

export function Sidenav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 focus:outline-none">
            Close
          </button>
        </div>
        <NavbarLinks onClick={onClose} />
      </div>
    </div>
  );
}
