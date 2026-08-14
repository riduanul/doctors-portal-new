import React, { useState } from "react";
import appointmentbg from "../../../assets/images/appointment.png";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error("Please fill in required fields!");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="my-20 py-16 rounded-3xl shadow-2xl overflow-hidden relative scroll-mt-24"
      style={{
        background: `linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.92)), url(${appointmentbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h4 className="text-primary font-bold text-lg uppercase tracking-wider mb-2">
            Contact Us
          </h4>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
            Stay Connected With Our Medical Team
          </h2>
          <p className="text-gray-300 mt-2 max-w-lg mx-auto text-sm">
            Have questions about specialized treatments or appointment bookings? Send us a message and our support team will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-white">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xl">
              📍
            </div>
            <div>
              <h5 className="font-bold text-sm">Location</h5>
              <p className="text-xs text-gray-300">123 Medical Plaza, NY</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary text-xl">
              📞
            </div>
            <div>
              <h5 className="font-bold text-sm">Call Us</h5>
              <p className="text-xs text-gray-300">+1 (800) 555-0199</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xl">
              ✉️
            </div>
            <div>
              <h5 className="font-bold text-sm">Email Support</h5>
              <p className="text-xs text-gray-300">support@doctorsportal.com</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div>
            <label className="block text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
              Your Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="How can we help you?"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
              Message *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your query or feedback here..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-primary transition-all text-sm resize-none"
            ></textarea>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold uppercase tracking-wider shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Submit Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
