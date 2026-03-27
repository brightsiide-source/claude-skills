"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do you determine your cash offer?",
    a: "We evaluate your property based on its location, condition, the current San Antonio market, and comparable sales in your neighborhood. Our goal is always to give you a fair, competitive offer.",
  },
  {
    q: "Do I really pay zero closing costs?",
    a: "Yes — we pay ALL closing costs. The offer we make is the amount you walk away with. No hidden fees, no last-minute deductions.",
  },
  {
    q: "How fast can you actually close?",
    a: "We can close in as few as 7 days if needed, though most sellers choose 2-4 weeks. You pick the closing date that works for your schedule.",
  },
  {
    q: "What if my house needs major repairs?",
    a: "No problem. We buy houses in any condition — foundation issues, roof damage, mold, fire damage, you name it. You don't need to fix a thing.",
  },
  {
    q: "Is there any obligation if I get an offer?",
    a: "Absolutely not. Our cash offers are 100% no-obligation. If you don't like our offer, you're free to walk away with no pressure.",
  },
  {
    q: "Are you going to lowball me?",
    a: "We provide fair market offers based on real data. While we can't always match full retail value (since you're saving on repairs, commissions, and closing costs), many sellers find our net offer is very competitive when you factor in the savings.",
  },
  {
    q: "Do you buy houses with tenants?",
    a: "Yes. We buy occupied properties, even those with difficult tenants. You don't need to deal with evictions — we handle everything after closing.",
  },
  {
    q: "What areas do you serve?",
    a: "We buy houses throughout San Antonio, Bexar County, and the surrounding areas including New Braunfels, Boerne, Seguin, Schertz, Converse, and more.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-adobe mb-4">
            Frequently Asked <span className="text-terra">Questions</span>
          </h2>
          <p className="text-lg text-sand-dark">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-limestone-dark rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-limestone transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-adobe pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-terra shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sand-dark leading-relaxed">
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
