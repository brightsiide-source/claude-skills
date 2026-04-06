"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Red accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-6">
              Get Your <span className="text-brand-red">Free Cash Offer</span>{" "}
              Today
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Fill out the form and we&apos;ll get back to you within 24 hours
              with a fair, no-obligation cash offer for your Wisconsin property.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call Us Anytime</div>
                  <a
                    href="tel:+15551234567"
                    className="text-white font-bold text-lg hover:text-brand-red transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email Us</div>
                  <a
                    href="mailto:offers@wicashhomebuyers.com"
                    className="text-white font-bold hover:text-brand-red transition-colors"
                  >
                    offers@wicashhomebuyers.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-brand-gray-dark border border-brand-gray-mid rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-brand-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  We Got Your Info!
                </h3>
                <p className="text-gray-400">
                  We&apos;ll be in touch within 24 hours with your cash offer.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold mb-2">
                  Property Information
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Tell us a little about your property and we&apos;ll prepare
                  your cash offer.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-brand-black border border-brand-gray-mid rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-colors text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-brand-black border border-brand-gray-mid rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-colors text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-brand-black border border-brand-gray-mid rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-colors text-sm"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-brand-black border border-brand-gray-mid rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-brand-black border border-brand-gray-mid rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-colors text-sm"
                    placeholder="123 Main St, Milwaukee, WI 53201"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tell Us About Your Situation
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-brand-black border border-brand-gray-mid rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-colors text-sm resize-none"
                    placeholder="Condition of the house, why you're selling, timeline, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-4 rounded-lg font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-brand-red/25"
                >
                  Get My Free Cash Offer
                </button>

                <p className="text-gray-600 text-xs text-center">
                  100% free. Zero obligation. Your info stays private.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
