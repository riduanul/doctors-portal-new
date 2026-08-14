import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto space-y-8 text-base-content">
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-base-content/60">Last updated: August 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">1. Information We Collect</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          We collect personal details provided by you during registration and booking, including your full name, email address, phone number, age, blood group, and optional medical history notes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. How We Protection Your Medical Data</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          Your health data is encrypted during transmission and storage. We adhere to strict HIPAA and GDPR compliance standards. We never sell or distribute your private medical data to third parties.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. Payment Information</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          All financial transactions are handled directly through Stripe's PCI-DSS Level 1 certified payment gateway. Doctors Portal does not store raw credit card numbers on its servers.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
