"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingOrbs from "@/components/FloatingOrbs";
import GradientText from "@/components/GradientText";
import MagneticButton from "@/components/MagneticButton";
import ParticleGrid from "@/components/ParticleGrid";

const services = [
  {
    id: "local-seo",
    title: "Local SEO",
    subtitle: "Dominate Google Maps & Local Pack",
    description:
      "Get found by customers in your area when they search for your services. We optimize every aspect of your local presence to ensure you appear in the Google Map Pack and local search results.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    features: [
      "Google Business Profile optimization & management",
      "Local keyword research & targeting",
      "Citation building across 50+ directories",
      "NAP (Name, Address, Phone) consistency audit",
      "Local link building from community sources",
      "Google Reviews strategy & response management",
      "Local content creation & geo-targeted pages",
      "Competitor local SEO analysis",
    ],
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    subtitle: "Fast, Beautiful, SEO-Optimized Websites",
    description:
      "Your website is your 24/7 salesperson. We build modern, mobile-first websites that load fast, look professional, and are built on an SEO-friendly foundation from the ground up.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    features: [
      "Custom responsive design (mobile, tablet, desktop)",
      "SEO-friendly site architecture & URL structure",
      "Core Web Vitals optimization (LCP, FID, CLS)",
      "Contact forms with automated lead notifications",
      "Google Analytics & Search Console integration",
      "SSL certificate & security setup",
      "ADA accessibility compliance basics",
      "Content management system (WordPress/Next.js)",
    ],
  },
  {
    id: "google-ads",
    title: "Google Ads Management",
    subtitle: "Targeted PPC That Maximizes ROI",
    description:
      "Stop wasting money on poorly managed ad campaigns. We create and manage Google Ads campaigns that target high-intent keywords and convert clicks into customers.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    features: [
      "Campaign strategy & keyword research",
      "Ad copywriting & A/B testing",
      "High-converting landing page design",
      "Bid management & budget optimization",
      "Negative keyword management",
      "Conversion tracking & attribution",
      "Monthly performance reports",
      "Competitor ad analysis & positioning",
    ],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    subtitle: "Strategic Content That Drives Organic Traffic",
    description:
      "Content is the backbone of SEO. We create strategic, keyword-targeted content that positions you as an authority in your market and drives qualified organic traffic.",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    features: [
      "Content strategy & editorial calendar",
      "Keyword research & topic clustering",
      "SEO-optimized blog post writing",
      "Service page & landing page copywriting",
      "Content gap analysis vs. competitors",
      "Internal linking strategy",
      "Content performance tracking",
      "Quarterly content audits & optimization",
    ],
  },
  {
    id: "technical-seo",
    title: "Technical SEO & Schema Markup",
    subtitle: "Fix What's Holding Your Rankings Back",
    description:
      "Technical issues can silently kill your rankings. We audit and fix the behind-the-scenes problems that prevent search engines from properly crawling and indexing your site.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    features: [
      "Comprehensive technical SEO audit",
      "Schema markup (LocalBusiness, FAQ, Reviews, Product)",
      "Site speed & Core Web Vitals optimization",
      "Crawlability & indexation fixes",
      "XML sitemap & robots.txt optimization",
      "Canonical tag & duplicate content resolution",
      "Mobile-friendliness improvements",
      "Structured data testing & validation",
    ],
  },
  {
    id: "cro",
    title: "Conversion Rate Optimization",
    subtitle: "Turn More Visitors Into Customers",
    description:
      "Getting traffic is only half the battle. CRO focuses on turning your existing visitors into leads and customers through data-driven UX improvements and testing.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    features: [
      "Heatmap & user behavior analysis",
      "A/B testing of key pages & CTAs",
      "Form optimization & reduction of friction",
      "Landing page design & optimization",
      "Call-to-action strategy & placement",
      "Page load speed improvements",
      "Mobile UX optimization",
      "Conversion funnel analysis & reporting",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white overflow-hidden -mt-20 pt-20">
        <ParticleGrid />
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal-light font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            SEO Services That Drive{" "}
            <GradientText className="text-5xl md:text-6xl font-bold">Real Results</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            From local SEO to web design, every service we offer is designed with
            one goal: getting your business found by the right customers at the right time.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-start ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <ScrollReveal direction={i % 2 === 0 ? "left" : "right"} className="flex-1">
                <div className="sticky top-28">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal/10 to-teal/5 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                    </svg>
                  </div>
                  <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-2">
                    {service.subtitle}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-mid leading-relaxed mb-8 text-lg">
                    {service.description}
                  </p>
                  <MagneticButton
                    href="/contact"
                    className="inline-block bg-teal text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal/25 transition-all"
                  >
                    Get Started
                  </MagneticButton>
                </div>
              </ScrollReveal>
              <ScrollReveal direction={i % 2 === 0 ? "right" : "left"} delay={0.2} className="flex-1 w-full">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-charcoal mb-6 text-lg">What&apos;s Included</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature, j) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-charcoal/80">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-light py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(8,145,178,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Our Process</h2>
              <p className="text-gray-mid text-lg">
                A proven 4-step process that delivers consistent results for every client.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal/20 via-teal/40 to-teal/20" />
            {[
              { step: "01", title: "Audit & Discovery", desc: "We analyze your current online presence, competitors, and market opportunities." },
              { step: "02", title: "Strategy & Plan", desc: "We build a custom SEO strategy with clear goals, timelines, and KPIs." },
              { step: "03", title: "Execute & Optimize", desc: "We implement the strategy, monitor results, and continuously optimize." },
              { step: "04", title: "Report & Scale", desc: "Monthly transparent reporting with recommendations to scale your growth." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-5 border border-gray-100 relative z-10">
                    <span className="text-2xl font-bold text-teal">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-mid">{item.desc}</p>
                </div>
              </ScrollReveal>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300 mb-10">
              Book a free consultation and get a custom SEO strategy for your business.
            </p>
            <MagneticButton
              href="/contact"
              className="inline-block bg-white text-teal-dark px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-white/20 transition-all"
            >
              Book Free Consultation
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
