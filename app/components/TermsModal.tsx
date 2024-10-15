// app/components/TermsModal.tsx
import { useState } from "react";
import Link from "next/link";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">Terms of Agreement</h2>
        <p className="mb-4">
          Please read and accept the terms of agreement to proceed.
        </p>
        <p className="mb-4">
          You agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          I Agree
        </button>
      </div>
    </div>
  );
};
