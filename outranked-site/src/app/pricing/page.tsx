"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";
import GradientText from "@/components/GradientText";
import MagneticButton from "@/components/MagneticButton";
import ParticleGrid from "@/components/ParticleGrid";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "$5,000",
    description: "Perfect for new businesses that need a professional online presence with local SEO fundamentals.",
    popular: false,
    color: "from-charcoal to-[#2a3a4e]",
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
    color: "from-teal to-teal-dark",
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
    color: "from-[#0c2840] to-charcoal",
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

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <motion.div
        className="border border-gray-200/80 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
        layout
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <h3 className="text-lg font-semibold text-charcoal pr-4">{faq.q}</h3>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0"
          >
            <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
            </svg>
          </motion.div>
        </button>
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-gray-mid leading-relaxed">{faq.a}</p>
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white overflow-hidden -mt-20 pt-20">
        <ParticleGrid />
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-teal-light animate-pulse" />
            Transparent Pricing — No Hidden Fees
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Invest in <GradientText className="text-5xl md:text-6xl font-bold">Growth</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Choose the package that fits your business goals. Every package includes
            a custom strategy tailored to your market.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Pricing Cards */}
      <section className="py-8 md:py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.15}>
                <TiltCard
                  className="h-full"
                  glowColor={plan.popular ? "rgba(8, 145, 178, 0.25)" : "rgba(8, 145, 178, 0.1)"}
                >
                  <div
                    className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 flex flex-col h-full transition-all duration-500 ${
                      plan.popular
                        ? "border-teal shadow-xl shadow-teal/10"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                      >
                        <span className="bg-gradient-to-r from-teal to-teal-light text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full shadow-lg shadow-teal/30">
                          Most Popular
                        </span>
                      </motion.div>
                    )}

                    {/* Plan header with gradient bg */}
                    <div className={`-mx-8 -mt-8 mb-6 p-8 pb-6 rounded-t-2xl bg-gradient-to-br ${plan.color} text-white`}>
                      <h3 className="text-lg font-semibold text-white/80">{plan.name}</h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-5xl font-bold">{plan.price}</span>
                        {plan.name !== "Premium" && (
                          <span className="text-white/60 ml-1">one-time</span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.03 }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? "bg-teal/10" : "bg-gray-100"
                          }`}>
                            <svg
                              className={`w-3 h-3 ${plan.popular ? "text-teal" : "text-charcoal"}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-charcoal/80">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <MagneticButton
                      href="/contact"
                      className={`block text-center py-4 rounded-xl font-semibold transition-all ${
                        plan.popular
                          ? "bg-teal text-white hover:shadow-lg hover:shadow-teal/25"
                          : "bg-charcoal text-white hover:bg-charcoal/90"
                      }`}
                    >
                      Get Started
                    </MagneticButton>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gray-light py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(8,145,178,0.04),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Every Package Includes
              </h2>
              <p className="text-gray-mid">
                Regardless of which plan you choose, you&apos;ll always get these essentials.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Custom Strategy", desc: "Tailored to your market, competitors, and business goals", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
              { title: "Transparent Reporting", desc: "Monthly reports with real metrics — rankings, traffic, leads", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { title: "Dedicated Support", desc: "Direct access to your SEO specialist via email and phone", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
              { title: "No Hidden Fees", desc: "The price you see is the price you pay. Period.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100/50 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal/10 to-teal/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-mid">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-mid">
                Everything you need to know before getting started.
              </p>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840]" />
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Not Sure Which Package Is Right?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Book a free 30-minute consultation. We&apos;ll review your current online presence
              and recommend the best path forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="/contact"
                className="bg-white text-teal-dark px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-white/20 transition-all inline-block"
              >
                Book Free Consultation
              </MagneticButton>
              <MagneticButton
                href="tel:+15551234567"
                className="border-2 border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all inline-block"
              >
                (555) 123-4567
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
