import React from "react";

const CookiePolicy = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto space-y-8 text-base-content">
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2">Cookie Policy</h1>
        <p className="text-sm text-base-content/60">Last updated: August 14, 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">1. What Are Cookies?</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          Cookies are small text files stored in your web browser that allow us to remember your session token, user preferences (such as Dark/Light mode theme setting), and authentication state.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. Essential Cookies We Use</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          We use strictly essential session tokens (`accessToken` and `theme`) stored in LocalStorage/SessionStorage to maintain secure user authorization across page reloads.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. Managing Cookie Preferences</h2>
        <p className="text-base-content/80 leading-relaxed text-sm">
          You can disable browser storage at any time via your browser settings, though doing so will log you out of your Doctors Portal session.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
