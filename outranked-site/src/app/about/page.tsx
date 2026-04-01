import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Outranked team — experienced SEO specialists, web designers, and digital marketers dedicated to helping local businesses grow online.",
};

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & SEO Director",
    bio: "10+ years in SEO and digital marketing. Previously led organic growth at a Fortune 500 company before founding Outranked to help local businesses compete online.",
    initials: "AR",
  },
  {
    name: "Jordan Kim",
    role: "Head of Web Development",
    bio: "Full-stack developer specializing in high-performance, SEO-optimized websites. Google-certified in Core Web Vitals and page experience.",
    initials: "JK",
  },
  {
    name: "Taylor Nguyen",
    role: "Content Strategy Lead",
    bio: "Former journalist turned content strategist. Creates data-driven content that ranks and converts, with expertise in local and industry-specific SEO.",
    initials: "TN",
  },
  {
    name: "Morgan Davis",
    role: "PPC & Analytics Specialist",
    bio: "Google Ads certified with $5M+ in managed ad spend. Specializes in local service ads, conversion tracking, and ROI-focused campaign management.",
    initials: "MD",
  },
];

const values = [
  {
    title: "Results Over Vanity",
    description: "We measure success by leads and revenue, not impressions and likes. Every strategy we build is tied to your bottom line.",
  },
  {
    title: "Radical Transparency",
    description: "No black boxes. You'll always know what we're doing, why we're doing it, and how it's performing. Monthly reports with real data.",
  },
  {
    title: "Local-First Expertise",
    description: "We specialize in local SEO because that's where we deliver the most impact. We know the strategies that move the needle for local businesses.",
  },
  {
    title: "Long-Term Partnerships",
    description: "We don't do one-and-done projects. We build relationships and grow alongside our clients. 95% client retention speaks for itself.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-light font-semibold text-sm uppercase tracking-wider mb-4">
            About Outranked
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            We Help Local Businesses Win Online
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Founded on a simple belief: every local business deserves to be found
            by the customers searching for them. We combine technical expertise
            with a genuine passion for helping businesses grow.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-teal font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-charcoal mb-6">
                Born From Frustration With the SEO Industry
              </h2>
              <div className="space-y-4 text-gray-mid leading-relaxed">
                <p>
                  After years of watching local businesses get burned by SEO agencies
                  that promised the moon and delivered nothing but confusing reports
                  and empty rankings, our founder Alex Rivera started Outranked with
                  a different approach.
                </p>
                <p>
                  We focus on what actually matters: getting your phone to ring and
                  your inbox to fill with qualified leads. No vanity metrics, no
                  jargon-filled reports designed to confuse. Just clear, measurable
                  results you can tie directly to revenue.
                </p>
                <p>
                  Today, Outranked has helped 150+ local businesses — from plumbers and
                  dentists to law firms and restaurants — achieve first-page rankings
                  and sustainable organic growth.
                </p>
              </div>
            </div>
            <div className="bg-gray-light rounded-2xl p-10">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "150+", label: "Businesses Ranked" },
                  { value: "6+", label: "Years Experience" },
                  { value: "95%", label: "Client Retention" },
                  { value: "3x", label: "Avg. Traffic Growth" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-teal">{stat.value}</div>
                    <div className="text-sm text-gray-mid mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">{value.title}</h3>
                <p className="text-gray-mid leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal font-semibold text-sm uppercase tracking-wider mb-3">Our Team</p>
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Meet the Experts Behind Your Results
            </h2>
            <p className="text-gray-mid">
              A small, senior team where every member has 5+ years of hands-on
              experience in their specialty.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal to-teal-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{person.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-charcoal">{person.name}</h3>
                <p className="text-sm text-teal font-medium mb-3">{person.role}</p>
                <p className="text-sm text-gray-mid leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-8">Certifications & Partnerships</h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {["Google Partner", "SEMrush Certified", "HubSpot Solutions Partner", "Moz Recommended", "Ahrefs Certified"].map(
              (cert) => (
                <div key={cert} className="text-gray-mid font-semibold">{cert}</div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal to-teal-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Want to Work With Us?</h2>
          <p className="text-lg text-white/80 mb-8">
            Let&apos;s talk about your goals and see how we can help you outrank
            the competition.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-teal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
