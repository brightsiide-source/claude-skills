"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How fast can you buy my Baltimore house?",
    a: "We can close in as little as 30 days or less. If you need to sell even faster, we've closed in as few as 7-14 days. You pick the closing date that works best for your timeline.",
  },
  {
    q: "Do I need to make any repairs before selling?",
    a: "Absolutely not. We buy houses in ANY condition — fire damage, mold, foundation issues, roof problems, hoarder houses, code violations, you name it. We handle all repairs after purchase. That's our specialty.",
  },
  {
    q: "Are there any fees, commissions, or closing costs?",
    a: "Zero. We charge no fees, no commissions, and we pay ALL closing costs. The amount you agree to is the exact amount you receive at closing. There are no hidden charges of any kind.",
  },
  {
    q: "How do you determine your cash offer?",
    a: "We evaluate your property based on its location, condition, comparable recent sales in the neighborhood, and current market conditions in the Baltimore metro. Our offers are always fair, transparent, and come with absolutely no obligation.",
  },
  {
    q: "What areas of Baltimore do you buy in?",
    a: "We buy houses throughout the entire Baltimore metro area — Baltimore City, Baltimore County, Anne Arundel County, Howard County, Harford County, Carroll County, and all surrounding communities including Towson, Dundalk, Essex, Glen Burnie, Columbia, Ellicott City, Bel Air, and more.",
  },
  {
    q: "Will you buy my house if it has tenants?",
    a: "Yes! We regularly buy properties with tenants still in place. You don't need to worry about evictions or waiting for leases to end. We handle the tenant situation after closing.",
  },
  {
    q: "What if I owe more than the house is worth?",
    a: "We can still help. We have experience working with lenders to negotiate short sales and find solutions. Contact us and we'll discuss your specific situation confidentially.",
  },
  {
    q: "Is there any obligation if I get an offer?",
    a: "None whatsoever. Our cash offers are 100% free with zero obligation. If our offer doesn't work for you, no hard feelings — we part ways as friends. There's absolutely no pressure.",
  },
  {
    q: "How is this different from listing with a real estate agent?",
    a: "When you list with an agent, you typically wait 3-12 months, pay 5-6% in commissions, make costly repairs, deal with showings and open houses, and face uncertainty with buyer financing. With us, you get a guaranteed cash offer in 24 hours, close in 30 days or less, pay zero commissions and zero closing costs, and never make a single repair.",
  },
  {
    q: "Are you a legitimate company?",
    a: "Absolutely. We are a BBB-accredited, fully licensed real estate investment company based in Baltimore. We have over 127 five-star Google reviews from real Baltimore homeowners we've helped. We're happy to provide references upon request.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-main mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about selling your Baltimore home for
            cash.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-royal-900 pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-royal-700 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
