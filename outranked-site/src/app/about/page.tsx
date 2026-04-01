"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingOrbs from "@/components/FloatingOrbs";
import GradientText from "@/components/GradientText";
import MagneticButton from "@/components/MagneticButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";
import ParticleGrid from "@/components/ParticleGrid";

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & SEO Director",
    bio: "10+ years in SEO and digital marketing. Previously led organic growth at a Fortune 500 company before founding Outranked to help local businesses compete online.",
    initials: "AR",
    gradient: "from-teal to-cyan-400",
  },
  {
    name: "Jordan Kim",
    role: "Head of Web Development",
    bio: "Full-stack developer specializing in high-performance, SEO-optimized websites. Google-certified in Core Web Vitals and page experience.",
    initials: "JK",
    gradient: "from-teal-dark to-teal",
  },
  {
    name: "Taylor Nguyen",
    role: "Content Strategy Lead",
    bio: "Former journalist turned content strategist. Creates data-driven content that ranks and converts, with expertise in local and industry-specific SEO.",
    initials: "TN",
    gradient: "from-cyan-400 to-teal-light",
  },
  {
    name: "Morgan Davis",
    role: "PPC & Analytics Specialist",
    bio: "Google Ads certified with $5M+ in managed ad spend. Specializes in local service ads, conversion tracking, and ROI-focused campaign management.",
    initials: "MD",
    gradient: "from-teal to-teal-dark",
  },
];

const values = [
  {
    title: "Results Over Vanity",
    description: "We measure success by leads and revenue, not impressions and likes. Every strategy we build is tied to your bottom line.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Radical Transparency",
    description: "No black boxes. You'll always know what we're doing, why we're doing it, and how it's performing. Monthly reports with real data.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    title: "Local-First Expertise",
    description: "We specialize in local SEO because that's where we deliver the most impact. We know the strategies that move the needle for local businesses.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
  {
    title: "Long-Term Partnerships",
    description: "We don't do one-and-done projects. We build relationships and grow alongside our clients. 95% client retention speaks for itself.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export default function AboutPage() {
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
            About Outranked
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            We Help Local Businesses{" "}
            <GradientText className="text-5xl md:text-6xl font-bold">Win Online</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Founded on a simple belief: every local business deserves to be found
            by the customers searching for them.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                Born From Frustration With the SEO Industry
              </h2>
              <div className="space-y-4 text-gray-mid leading-relaxed text-lg">
                <p>
                  After years of watching local businesses get burned by SEO agencies
                  that promised the moon and delivered nothing but confusing reports
                  and empty rankings, our founder Alex Rivera started Outranked with
                  a different approach.
                </p>
                <p>
                  We focus on what actually matters: getting your phone to ring and
                  your inbox to fill with qualified leads. No vanity metrics, no
                  jargon-filled reports designed to confuse.
                </p>
                <p>
                  Today, Outranked has helped 150+ local businesses — from plumbers and
                  dentists to law firms and restaurants — achieve first-page rankings
                  and sustainable organic growth.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: "150+", label: "Businesses Ranked" },
                    { value: "6+", label: "Years Experience" },
                    { value: "95%", label: "Client Retention" },
                    { value: "3x", label: "Avg. Traffic Growth" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-4xl font-bold text-teal">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-sm text-gray-mid mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-light py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(8,145,178,0.04),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">What We Stand For</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <TiltCard className="h-full">
                  <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6 text-teal group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-3">{value.title}</h3>
                    <p className="text-gray-mid leading-relaxed">{value.description}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-3">Our Team</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Meet the Experts Behind Your Results
              </h2>
              <p className="text-gray-mid text-lg">
                A small, senior team where every member has 5+ years of hands-on
                experience in their specialty.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person, i) => (
              <ScrollReveal key={person.name} delay={i * 0.1}>
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mx-auto w-28 h-28 mb-6">
                    <div className={`w-full h-full bg-gradient-to-br ${person.gradient} rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center`}>
                      <span className="text-3xl font-bold text-white -rotate-3 group-hover:-rotate-6 transition-transform">
                        {person.initials}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                      <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">{person.name}</h3>
                  <p className="text-sm text-teal font-medium mb-3">{person.role}</p>
                  <p className="text-sm text-gray-mid leading-relaxed">{person.bio}</p>
                </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to Work With Us?</h2>
            <p className="text-lg text-gray-300 mb-10">
              Let&apos;s talk about your goals and see how we can help you outrank
              the competition.
            </p>
            <MagneticButton
              href="/contact"
              className="inline-block bg-white text-teal-dark px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-white/20 transition-all"
            >
              Get In Touch
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
