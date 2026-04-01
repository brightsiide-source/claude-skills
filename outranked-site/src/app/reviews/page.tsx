"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";
import GradientText from "@/components/GradientText";
import MagneticButton from "@/components/MagneticButton";
import ParticleGrid from "@/components/ParticleGrid";

const reviews = [
  {
    name: "Sarah Mitchell",
    company: "Mitchell's Plumbing",
    location: "Austin, TX",
    text: "Outranked tripled our website leads in just 4 months. We went from page 3 to the top 3 results for every major keyword in our area. The team is incredibly responsive and the monthly reports make it easy to see the ROI.",
    rating: 5,
    result: "3x more leads in 4 months",
  },
  {
    name: "James Rodriguez",
    company: "Rodriguez Law Group",
    location: "Dallas, TX",
    text: "The ROI has been incredible. We're getting 40+ qualified leads per month from organic search alone. They took the time to understand our practice areas and built a content strategy that actually works. Best marketing investment we've made.",
    rating: 5,
    result: "40+ leads/month from organic",
  },
  {
    name: "Emily Chen",
    company: "Bright Smile Dental",
    location: "Houston, TX",
    text: "Professional, transparent, and results-driven. They explained everything clearly and delivered exactly what they promised. Our Google Business Profile now generates 25+ calls per week. We've had to hire additional staff to handle the volume.",
    rating: 5,
    result: "25+ calls/week from GBP",
  },
  {
    name: "Marcus Thompson",
    company: "Thompson Roofing Co.",
    location: "San Antonio, TX",
    text: "Before Outranked, we were invisible online. Now we rank #1 for 'roofing contractor' in our entire metro area. They rebuilt our website, optimized our Google listing, and set up a review strategy that's been a game-changer.",
    rating: 5,
    result: "#1 ranking for primary keyword",
  },
  {
    name: "Lisa Patel",
    company: "Namaste Yoga Studio",
    location: "Austin, TX",
    text: "As a small business owner, I was skeptical about SEO agencies. Outranked proved me wrong. They stayed within my budget, communicated clearly, and delivered results within the first 2 months. Our class bookings have doubled.",
    rating: 5,
    result: "2x class bookings",
  },
  {
    name: "David Kowalski",
    company: "Kowalski & Sons HVAC",
    location: "Round Rock, TX",
    text: "We switched to Outranked after a bad experience with another agency. Night and day difference. They actually deliver what they promise. Our website traffic has grown 250% and we're getting consistent leads every single day.",
    rating: 5,
    result: "250% traffic growth",
  },
  {
    name: "Angela Foster",
    company: "Foster Family Chiropractic",
    location: "Georgetown, TX",
    text: "The team at Outranked redesigned our website and handled our entire SEO strategy. Within 3 months, we were ranking for 50+ keywords we weren't even targeting before. The new patient inquiries have been incredible.",
    rating: 5,
    result: "50+ new keyword rankings",
  },
  {
    name: "Robert Chang",
    company: "Chang's Auto Repair",
    location: "Pflugerville, TX",
    text: "Honest, hardworking, and they know their stuff. I've been working with Outranked for over a year now and the results keep getting better. My Google reviews went from 15 to 120+ and we're booked out two weeks in advance.",
    rating: 5,
    result: "15 to 120+ Google reviews",
  },
  {
    name: "Jennifer Morales",
    company: "Morales Immigration Law",
    location: "Austin, TX",
    text: "Outranked created individual service pages for each practice area, which was brilliant for our SEO. We now rank on page 1 for 8 different immigration-related keywords. The leads are highly qualified and convert well.",
    rating: 4,
    result: "Page 1 for 8 target keywords",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white overflow-hidden -mt-20 pt-20">
        <ParticleGrid />
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Don&apos;t Take Our{" "}
            <GradientText className="text-5xl md:text-6xl font-bold">Word For It</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Real reviews from real clients with real results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-5"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-8 h-8 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold">4.9/5</span>
              <p className="text-sm text-gray-400">from 80+ Google Reviews</p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Reviews Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masonry-style grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 0.08}>
                <TiltCard className="break-inside-avoid">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-light opacity-0 group-hover:opacity-100 transition-opacity" />

                    <StarRating count={review.rating} />
                    <p className="mt-4 text-charcoal leading-relaxed">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <motion.div
                      className="mt-4 inline-flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {review.result}
                    </motion.div>
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {review.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm">{review.name}</p>
                        <p className="text-xs text-gray-mid">{review.company} &middot; {review.location}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Be Our Next <GradientText className="text-4xl md:text-5xl font-bold">Success Story</GradientText>?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Join 150+ local businesses that trust Outranked to grow their online presence.
            </p>
            <MagneticButton
              href="/contact"
              className="inline-block bg-white text-teal-dark px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-white/20 transition-all"
            >
              Get Your Free SEO Audit
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
