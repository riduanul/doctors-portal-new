import React from "react";

const TermsOfUse = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto space-y-8 text-base-content">
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2">Terms of Use</h1>
        <p className="text-sm text-base-content/60">Last updated: August 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">1. Agreement to Terms</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          By accessing or using Doctors Portal, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to all of these terms, please do not use our services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. Medical Services Disclaimer</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          Doctors Portal acts as an online appointment scheduling platform linking patients with registered physicians. While we verify doctor credentials, urgent life-threatening medical emergencies should always be directed to your local emergency services (e.g. 911).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. User Accounts & Security</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          You are responsible for maintaining the confidentiality of your account login credentials and for all activities conducted under your account. Notify us immediately if you suspect unauthorized account access.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">4. Cancellations & Payments</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          Appointment fees paid online via Stripe are processed securely. Cancellations requested at least 24 hours prior to the scheduled appointment slot qualify for full refund processing.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
