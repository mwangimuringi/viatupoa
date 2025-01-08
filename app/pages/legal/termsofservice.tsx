// pages/legal/terms-of-service.tsx

import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>
      
      <section>
        <h2 className="text-2xl font-medium mb-4">Introduction</h2>
        <p className="text-gray-700">
          Welcome to Viatupoa! By using our website, you agree to the following terms and conditions.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-medium mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By accessing or using our services, you agree to be bound by these terms of service.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-medium mb-4">2. Changes to Terms</h2>
        <p className="text-gray-700">
          We may update these terms from time to time. Any changes will be posted on this page.
        </p>
      </section>

      {/* Add more sections as required for the full Terms of Service */}
    </div>
  );
};

export default TermsOfService;
