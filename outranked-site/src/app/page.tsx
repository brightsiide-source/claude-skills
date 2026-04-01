"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParticleGrid from "@/components/ParticleGrid";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";
import GradientText from "@/components/GradientText";
import MagneticButton from "@/components/MagneticButton";

const stats = [
  { value: "150+", label: "Clients Ranked" },
  { value: "3x", label: "Avg. Traffic Growth" },
  { value: "95%", label: "Client Retention" },
  { value: "#1", label: "Local SEO Results" },
];

const services = [
  {
    title: "Local SEO",
    description: "Dominate Google Maps and local search results. We optimize your Google Business Profile, build local citations, and earn reviews that drive foot traffic.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Web Design & Development",
    description: "Fast, mobile-optimized websites built to convert visitors into customers. SEO-friendly architecture from the ground up.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Google Ads Management",
    description: "Targeted PPC campaigns that maximize your ad spend. We create high-converting landing pages and optimize for the keywords that matter.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Content Marketing",
    description: "Strategic blog content and landing pages that target high-intent keywords and establish your authority in your market.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Schema Markup & Technical SEO",
    description: "Structured data implementation, site speed optimization, Core Web Vitals fixes, and crawlability improvements.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Conversion Rate Optimization",
    description: "A/B testing, heatmap analysis, and UX improvements that turn more of your website visitors into paying customers.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const reviews = [
  {
    name: "Sarah Mitchell",
    company: "Mitchell's Plumbing",
    text: "Outranked tripled our website leads in just 4 months. We went from page 3 to the top 3 results for every major keyword in our area.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    company: "Rodriguez Law Group",
    text: "The ROI has been incredible. We're getting 40+ qualified leads per month from organic search alone. Best investment we've made.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    company: "Bright Smile Dental",
    text: "Professional, transparent, and results-driven. They explained everything clearly and delivered exactly what they promised.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white overflow-hidden -mt-20 pt-20">
        <ParticleGrid />
        <FloatingOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-teal-light font-semibold text-sm uppercase tracking-widest mb-4"
            >
              Data-Driven SEO That Delivers Results
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              Dominate Your Local{" "}
              <GradientText className="text-5xl md:text-6xl lg:text-7xl font-bold">
                Search Results
              </GradientText>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            >
              We help local businesses get found on Google, drive qualified traffic,
              and convert visitors into customers. No fluff, no vanity metrics —
              just measurable growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                href="/contact"
                className="bg-teal text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-teal/25 transition-all text-center inline-block"
              >
                Get Your Free SEO Audit
              </MagneticButton>
              <MagneticButton
                href="tel:+15551234567"
                className="border-2 border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:border-teal-light/50 hover:bg-white/5 transition-all text-center inline-block"
              >
                Call (555) 123-4567
              </MagneticButton>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5"
            >
              <div className="flex -space-x-2">
                {["AR", "JK", "TN"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-xs font-bold text-white border-2 border-charcoal"
                    style={{ zIndex: 3 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-300">
                <span className="text-white font-semibold">150+ businesses</span> ranked to page 1
              </span>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-8 z-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-r from-teal to-teal-dark rounded-2xl shadow-xl shadow-teal/20 p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm mt-1 text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">
                Everything You Need to <GradientText>Rank Higher</GradientText>
              </h2>
              <p className="text-gray-mid text-lg">
                From technical SEO to content strategy, we offer comprehensive services
                designed to grow your online visibility and revenue.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <TiltCard className="h-full">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-teal/20 transition-all duration-500 group h-full relative overflow-hidden">
                    {/* Gradient corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal/5 to-transparent rounded-bl-full" />
                    <div className="relative">
                      <div className="w-14 h-14 bg-teal/10 rounded-xl flex items-center justify-center text-teal mb-5 group-hover:bg-teal group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-charcoal mb-3">{service.title}</h3>
                      <p className="text-gray-mid leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors group"
              >
                View All Services
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Proof / Reviews */}
      <section className="bg-gray-light py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(8,145,178,0.04),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-3">Client Results</p>
              <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">
                Trusted by Local Businesses
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <StarRating count={5} />
                <span className="text-gray-mid font-medium">4.9/5 from 80+ Google Reviews</span>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 0.15}>
                <TiltCard className="h-full">
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-light" />
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-charcoal leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-sm font-bold text-white">
                        {review.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">{review.name}</p>
                        <p className="text-sm text-gray-mid">{review.company}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors group"
              >
                Read All Reviews
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Signals */}
      <ScrollReveal>
        <section className="py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-mid uppercase tracking-widest mb-10 font-medium">
              Trusted Partners & Certifications
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
              {[
                { name: "Google", sub: "Partner" },
                { name: "SEMrush", sub: "Certified" },
                { name: "Moz", sub: "Recommended" },
                { name: "HubSpot", sub: "Solutions Partner" },
                { name: "Ahrefs", sub: "Certified" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  className="text-center group cursor-default"
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="text-2xl font-bold text-charcoal/30 group-hover:text-charcoal transition-colors duration-300">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-mid/50 group-hover:text-teal mt-1 transition-colors duration-300">
                    {item.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840]" />
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <GradientText className="text-4xl md:text-5xl font-bold">Outrank</GradientText> Your Competition?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Get a free, no-obligation SEO audit of your website. We&apos;ll show you
              exactly where you stand and how to improve your rankings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="/contact"
                className="bg-white text-teal-dark px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-white/20 transition-all inline-block"
              >
                Get Your Free Audit
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
