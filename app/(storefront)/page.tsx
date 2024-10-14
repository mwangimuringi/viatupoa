"use client";

import { useState } from "react";

import { Hero } from "../components/storefront/Hero";
import { CategorySelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { TermsModal } from "../components/TermsModal";

export default function IndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUpSuccess = () => {
    // Logic for successful signup
    setIsModalOpen(true); // Show the terms modal
  };

  return (
    <div>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
