"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do you determine your cash offer?",
    answer:
      "We evaluate your property based on its location, condition, current market value, and comparable sales in your area. Our goal is to make a fair offer that works for both of us. We're transparent about our numbers — just ask and we'll walk you through it.",
  },
  {
    question: "Do I really pay zero closing costs?",
    answer:
      "Yes, 100%. We cover all closing costs including title fees, transfer taxes, and any other settlement charges. The cash offer we make is the exact amount you receive at closing. No surprises, no deductions.",
  },
  {
    question: "What condition does my house need to be in?",
    answer:
      "Any condition at all. Fire damage, mold, foundation issues, outdated everything, hoarder situations — we've bought them all. You don't need to clean, repair, or even remove your belongings if you don't want to.",
  },
  {
    question: "How fast can you actually close?",
    answer:
      "We can close in as little as 7 days if you need us to. Most transactions close within 14-30 days. You pick the closing date that works best for your situation — we work on YOUR timeline.",
  },
  {
    question: "Are you going to lowball me?",
    answer:
      "We make fair, market-based offers. Yes, our offers may be below full retail value — but consider what you save: no agent commissions (5-6%), no repairs, no closing costs, no months of waiting, and no risk of deals falling through. When you add it all up, many sellers net more with us.",
  },
  {
    question: "Is there any obligation if I get an offer?",
    answer:
      "Absolutely not. Getting a cash offer from us is 100% free with zero obligation. If our offer doesn't work for you, no hard feelings. We'll even share our analysis so you can make an informed decision.",
  },
  {
    question: "What situations do you help with?",
    answer:
      "Foreclosure, pre-foreclosure, divorce, inherited/probate properties, tax liens, code violations, bad tenants, vacant properties, fire/water damage, relocations, downsizing — if you need to sell, we can help.",
  },
  {
    question: "Do you buy houses in rural Wisconsin too?",
    answer:
      "We primarily serve the major metro areas listed on this site, but we buy properties throughout Wisconsin. If you have a property anywhere in the state, reach out — we'll let you know if we can help.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-brand-gray-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4">
            Got Questions? <span className="text-brand-red">We&apos;ve Got Answers.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-brand-black border border-brand-gray-mid rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-brand-gray-dark/50 transition-colors"
              >
                <span className="font-semibold text-sm pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-brand-red flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
