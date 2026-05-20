"use client";

import { useState, FormEvent } from "react";

export default function Hero() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at (210) 555-0100.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-adobe pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form first on mobile, second on desktop */}
          <div className="order-first lg:order-last bg-white rounded-xl shadow-2xl p-8 lg:ml-8">
            {submitted ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-terra mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-adobe mb-2">You&apos;re All Set!</h3>
                <p className="text-sand-dark mb-4">We&apos;re reviewing your property now. Expect a call from our team within 24 hours with your no-obligation cash offer.</p>
                <p className="text-sm text-sand-dark">Need to talk sooner? Call <a href="tel:+12105550100" className="text-terra font-semibold">(210) 555-0100</a></p>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-adobe mb-2">Get Your Cash Offer Today</h2>
                  <p className="text-sand-dark text-sm">Fill out this quick form and we&apos;ll contact you within 24 hours</p>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs text-sand-dark mb-4 pb-4 border-b border-sand/20">
                  <span>Local, family operated</span>
                  <span className="text-sand">|</span>
                  <span>Closes in as few as 7 days</span>
                </div>
                <form name="quick-offer" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="form-name" value="quick-offer" />
                  <div>
                    <label className="block text-sm font-medium text-adobe mb-1.5">Property Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      autoComplete="street-address"
                      aria-label="Property Address"
                      placeholder="123 Main St, San Antonio, TX"
                      className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-adobe mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      aria-label="Your Name"
                      placeholder="Maria Garcia"
                      className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-adobe mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      aria-label="Phone Number"
                      placeholder="(210) 555-0000"
                      className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                      {error} <a href="tel:+12105550100" className="font-semibold underline">(210) 555-0100</a>
                    </div>
                  )}
                  <p className="text-xs text-sand-dark text-center">Takes less than 30 seconds</p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-terra hover:bg-terra-dark disabled:opacity-50 text-white py-4 rounded-md text-lg font-bold transition-colors"
                  >
                    {submitting ? "Getting Your Offer Ready..." : "Get My Free Cash Offer \u2192"}
                  </button>
                  <p className="text-xs text-sand-dark text-center">
                    No obligation. No spam. Your info stays private.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Hero content */}
          <div className="order-last lg:order-first">
            <div className="inline-flex items-center gap-2 bg-terra/10 border border-terra/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-terra rounded-full animate-pulse" />
              <span className="text-terra-light text-sm font-medium">Now buying in San Antonio &amp; Bexar County</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Need to Sell Your{" "}
              <span className="text-terra">San Antonio</span>{" "}
              Home Fast?
            </h1>

            <p className="text-xl text-sand mb-4 max-w-xl">
              Get a fair, no-obligation cash offer in as little as <strong className="text-white">24 hours</strong>. Close in <strong className="text-white">30 days or less</strong>.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "No repairs or cleaning needed",
                "Zero closing costs — we pay them all",
                "No agents, no commissions, no fees",
                "Any condition, any situation",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sand">
                  <svg className="w-5 h-5 text-river shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12105550100"
                className="bg-white/10 border border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-md text-lg font-medium transition-colors text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now: (210) 555-0100
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sand-dark text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-terra" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Locally owned, family operated</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-terra" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Cash offer in 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
