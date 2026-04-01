"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-light font-semibold text-sm uppercase tracking-wider mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s Grow Your Business
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to dominate your local search results? Get in touch for a free
            consultation and SEO audit. No pressure, no commitment.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-charcoal mb-6">
                Request Your Free SEO Audit
              </h2>
              {submitted ? (
                <div className="bg-teal/10 border border-teal/20 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">Thank You!</h3>
                  <p className="text-gray-mid">
                    We&apos;ve received your request. A member of our team will reach out
                    within 24 hours with your free SEO audit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-charcoal mb-2">
                      Current Website URL
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
                      placeholder="https://www.yoursite.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors bg-white"
                    >
                      <option value="">Select a service...</option>
                      <option value="starter">Starter Package ($5,000)</option>
                      <option value="growth">Growth Package ($7,500)</option>
                      <option value="premium">Premium Package ($10,000+)</option>
                      <option value="seo-only">SEO Only</option>
                      <option value="web-design">Web Design Only</option>
                      <option value="google-ads">Google Ads</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                      Tell Us About Your Business & Goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-vertical"
                      placeholder="What industry are you in? What are your main goals? Any specific challenges?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-dark transition-colors"
                  >
                    Get My Free SEO Audit
                  </button>
                  <p className="text-xs text-gray-mid text-center">
                    By submitting this form, you agree to receive communications from Outranked.
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Info */}
              <div className="bg-gray-light rounded-xl p-8">
                <h3 className="text-lg font-bold text-charcoal mb-6">Contact Information</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <a href="tel:+15551234567" className="text-gray-mid hover:text-teal transition-colors">
                        (555) 123-4567
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <a href="mailto:hello@outranked.com" className="text-gray-mid hover:text-teal transition-colors">
                        hello@outranked.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Office</p>
                      <p className="text-gray-mid">
                        123 Main Street<br />
                        Austin, TX 78701
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div className="bg-gray-light rounded-xl p-8">
                <h3 className="text-lg font-bold text-charcoal mb-4">Business Hours</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-mid">Monday - Friday</span>
                    <span className="font-medium text-charcoal">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-mid">Saturday</span>
                    <span className="font-medium text-charcoal">10:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-mid">Sunday</span>
                    <span className="font-medium text-charcoal">Closed</span>
                  </li>
                </ul>
              </div>

              {/* Quick Response */}
              <div className="bg-teal/10 border border-teal/20 rounded-xl p-8 text-center">
                <div className="text-3xl mb-2">&#9889;</div>
                <p className="font-semibold text-charcoal mb-1">Fast Response</p>
                <p className="text-sm text-gray-mid">
                  We respond to all inquiries within 24 hours. For urgent matters, call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="h-96 bg-gray-200 relative">
        <iframe
          title="Outranked Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.3858891293284!2d-97.74365!3d30.2672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE2JzAyLjAiTiA5N8KwNDQnMzcuMiJX!5e0!3m2!1sen!2sus!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
