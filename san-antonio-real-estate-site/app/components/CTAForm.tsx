"use client";

import { useState, FormEvent } from "react";

export default function CTAForm() {
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
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="get-offer" className="py-24 bg-adobe relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-terra/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Get Your <span className="text-terra">Cash Offer</span>?
          </h2>
          <p className="text-lg text-sand max-w-xl mx-auto">
            Fill out the form below and we&apos;ll get back to you within 24 hours with a no-obligation cash offer for your San Antonio property.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <svg className="w-20 h-20 text-terra mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-adobe mb-2">Your Offer Is On the Way!</h3>
              <p className="text-sand-dark mb-4">Here&apos;s what happens next:</p>
              <ol className="text-left text-sand-dark text-sm space-y-2 max-w-sm mx-auto mb-6">
                <li className="flex gap-2"><span className="font-bold text-terra">1.</span> We review your property details</li>
                <li className="flex gap-2"><span className="font-bold text-terra">2.</span> We call you within 24 hours with a cash offer</li>
                <li className="flex gap-2"><span className="font-bold text-terra">3.</span> If you accept, we close on your schedule</li>
              </ol>
              <p className="text-sm text-sand-dark">Need to talk sooner? Call us at <a href="tel:+18305901105" className="text-terra font-semibold">(830) 590-1105</a></p>
            </div>
          ) : (
            <>
            <form name="cash-offer" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="cash-offer" />
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-adobe mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Maria Garcia"
                    className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-adobe mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="(210) 555-0000"
                    className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="maria@email.com"
                  className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Property Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  autoComplete="street-address"
                  placeholder="123 Main St, San Antonio, TX 78201"
                  className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-adobe mb-1.5">Property Condition</label>
                  <select name="condition" className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent">
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent — Move-in ready</option>
                    <option value="good">Good — Minor repairs needed</option>
                    <option value="fair">Fair — Needs some work</option>
                    <option value="poor">Poor — Major repairs needed</option>
                    <option value="teardown">Very Poor / Teardown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-adobe mb-1.5">Timeline to Sell</label>
                  <select name="timeline" className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent">
                    <option value="">How soon?</option>
                    <option value="asap">ASAP — As fast as possible</option>
                    <option value="30">Within 30 days</option>
                    <option value="60">Within 60 days</option>
                    <option value="90">Within 90 days</option>
                    <option value="flexible">No rush — Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Anything else we should know?</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Tell us about your situation (optional)"
                  className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                  {error} Call us at <a href="tel:+18305901105" className="font-semibold underline">(830) 590-1105</a>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-terra hover:bg-terra-dark disabled:opacity-50 text-white py-4 rounded-md text-lg font-bold transition-colors"
              >
                {submitting ? "Getting Your Offer Ready..." : "Get My Free Cash Offer \u2192"}
              </button>

              <p className="text-xs text-sand-dark text-center">
                By submitting, you agree to be contacted about your property. No spam, ever. Your information is 100% confidential.
              </p>
              <p className="text-sm text-sand-dark text-center">
                Prefer to talk? Call <a href="tel:+18305901105" className="text-terra font-semibold">(830) 590-1105</a>
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-sand/20 text-center">
              <p className="text-sm text-sand-dark italic">&ldquo;They gave me a fair offer and closed in 12 days. They saved my credit.&rdquo;</p>
              <p className="text-xs text-terra mt-1">&mdash; Maria G., South Side San Antonio</p>
            </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
