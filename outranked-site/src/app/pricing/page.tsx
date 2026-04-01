import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent SEO and web design pricing packages. Starter at $5,000, Growth at $7,500, and Premium at $10,000+. No hidden fees.",
};

const plans = [
  {
    name: "Starter",
    price: "$5,000",
    description: "Perfect for new businesses that need a professional online presence with local SEO fundamentals.",
    popular: false,
    features: [
      "5-page custom website",
      "Mobile-optimized & responsive design",
      "Local SEO setup & optimization",
      "Google Business Profile optimization",
      "Contact forms with lead notifications",
      "Basic on-page SEO (meta tags, headers)",
      "XML sitemap & robots.txt setup",
      "Google Analytics & Search Console",
      "1 month of post-launch support",
      "SSL certificate setup",
    ],
  },
  {
    name: "Growth",
    price: "$7,500",
    description: "For businesses ready to invest in long-term organic growth with content and technical SEO.",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Blog setup with SEO-optimized templates",
      "Schema markup (LocalBusiness, FAQ, Reviews)",
      "3 months of SEO support & monitoring",
      "Monthly SEO performance reports",
      "Competitor keyword analysis",
      "Citation building (50+ directories)",
      "Google Reviews strategy & setup",
      "Page speed optimization",
      "2 blog posts per month (3 months)",
    ],
  },
  {
    name: "Premium",
    price: "$10,000+",
    description: "Comprehensive digital growth for businesses that want to dominate their market long-term.",
    popular: false,
    features: [
      "Everything in Growth, plus:",
      "Conversion rate optimization (CRO)",
      "Google Ads landing page design",
      "A/B testing & heatmap analysis",
      "Ongoing monthly SEO retainer",
      "Advanced link building strategy",
      "Content marketing strategy",
      "Custom dashboard & reporting",
      "Dedicated account manager",
      "Priority support & quarterly reviews",
    ],
  },
];

const faqs = [
  {
    q: "How long does it take to see SEO results?",
    a: "Most clients see measurable improvements within 3-6 months. Local SEO results typically appear faster (1-3 months), while competitive national keywords may take 6-12 months. We provide monthly reports so you can track progress from day one.",
  },
  {
    q: "Do you require long-term contracts?",
    a: "Our Starter and Growth packages are one-time projects. For the Premium package with ongoing retainer, we work on month-to-month agreements after the initial 3-month period. No long-term lock-ins.",
  },
  {
    q: "What's included in the free SEO audit?",
    a: "Our audit covers your current search rankings, website health (speed, mobile, technical issues), competitor analysis, keyword opportunities, and Google Business Profile review. You'll receive a detailed report with actionable recommendations.",
  },
  {
    q: "Can I upgrade my package later?",
    a: "Absolutely. Many clients start with our Starter package and upgrade to Growth or Premium as they see results. We'll credit your initial investment toward the upgrade.",
  },
  {
    q: "Do you work with businesses outside of our area?",
    a: "Yes! While we specialize in local SEO, we work with businesses nationwide. Our strategies are tailored to your specific market and location.",
  },
  {
    q: "What makes Outranked different from other SEO agencies?",
    a: "We focus exclusively on measurable results — rankings, traffic, and leads. No vanity metrics, no fluff. We provide transparent reporting and only recommend strategies backed by data.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-light font-semibold text-sm uppercase tracking-wider mb-4">
            Transparent Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Honest Pricing
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            No hidden fees, no surprise charges. Choose the package that fits your
            business goals and budget. Every package includes a custom strategy
            tailored to your market.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-28 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 flex flex-col ${
                  plan.popular
                    ? "border-teal scale-[1.02] md:scale-105 shadow-xl"
                    : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-charcoal">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="text-4xl font-bold text-charcoal">{plan.price}</span>
                    {plan.name !== "Premium" && (
                      <span className="text-gray-mid ml-1">one-time</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-mid leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg
                        className="w-5 h-5 text-teal flex-shrink-0 mt-0.5"
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
                      <span className="text-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3.5 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-teal text-white hover:bg-teal-dark"
                      : "bg-charcoal text-white hover:bg-charcoal/90"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gray-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Every Package Includes
            </h2>
            <p className="text-gray-mid">
              Regardless of which plan you choose, you&apos;ll always get these essentials.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Custom Strategy", desc: "Tailored to your market, competitors, and business goals" },
              { title: "Transparent Reporting", desc: "Monthly reports with real metrics — rankings, traffic, leads" },
              { title: "Dedicated Support", desc: "Direct access to your SEO specialist via email and phone" },
              { title: "No Hidden Fees", desc: "The price you see is the price you pay. Period." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">{faq.q}</h3>
                <p className="text-gray-mid leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal to-teal-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Package Is Right?</h2>
          <p className="text-lg text-white/80 mb-8">
            Book a free 30-minute consultation. We&apos;ll review your current online presence
            and recommend the best path forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-teal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+15551234567"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
