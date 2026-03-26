"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-main mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Get Started
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            Get Your Free Cash Offer
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fill out the form below and a member of our Baltimore team will
            contact you within 24 hours with a fair, no-obligation cash offer
            for your property.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-heading text-2xl font-bold text-green-800 mb-2">
              Thank You! We Received Your Info.
            </h3>
            <p className="text-green-700">
              A member of our Baltimore team will contact you within 24 hours
              with your free cash offer. If you need immediate assistance, call
              us at{" "}
              <a
                href="tel:+14105552274"
                className="font-bold underline"
              >
                (410) 555-CASH
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="(410) 555-1234"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Property Address *
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  placeholder="123 Main St, Baltimore, MD"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Property Condition
                </label>
                <select
                  id="condition"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-600"
                >
                  <option value="">Select condition...</option>
                  <option value="excellent">Excellent — Move-in ready</option>
                  <option value="good">Good — Minor cosmetic updates</option>
                  <option value="fair">Fair — Needs some work</option>
                  <option value="poor">Poor — Major repairs needed</option>
                  <option value="vacant">Vacant / Abandoned</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  How Soon Do You Need to Sell?
                </label>
                <select
                  id="timeline"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-600"
                >
                  <option value="">Select timeline...</option>
                  <option value="asap">ASAP — As fast as possible</option>
                  <option value="30">Within 30 days</option>
                  <option value="60">Within 60 days</option>
                  <option value="90">Within 90 days</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="situation"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Tell Us About Your Situation (Optional)
              </label>
              <textarea
                id="situation"
                rows={4}
                placeholder="Anything you'd like us to know about your property or situation..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors resize-none text-gray-900"
              />
            </div>

            <button type="submit" className="btn-primary w-full !text-xl !py-5">
              Submit — Get My Free Cash Offer
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              By submitting, you agree to be contacted about your property. Your
              information is 100% confidential and will never be shared.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
