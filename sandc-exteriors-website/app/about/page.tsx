import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us | Black Ridge Contracting | Central Iowa",
  description: "Learn about Black Ridge Contracting — Central Iowa's trusted exterior contractor. Professional roofing, siding, gutter, and concrete services in Central Iowa.",
};

const values = [
  { title: "Quality Craftsmanship", description: "Every project receives our full attention to detail. We never cut corners and use only premium materials that stand the test of time.", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
  { title: "Honest Communication", description: "We believe in straightforward pricing and clear timelines. You'll always know what to expect — no hidden fees, no surprises.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { title: "Community First", description: "As a local Central Iowa business, we treat every customer like a neighbor. Your satisfaction is our reputation, and we take that seriously.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { title: "Safety & Reliability", description: "Our team follows strict safety protocols on every job site. We show up on time, work efficiently, and leave your property clean.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

const glanceItems = [
  { label: "Based in Central Iowa", sub: "Serving all of Central Iowa", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
  { label: "Residential & Commercial", sub: "Projects of every size", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { label: "Available 24/7", sub: "Emergency services when you need us", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Fully Insured", sub: "Your property is protected", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black text-white section-padding !pb-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute inset-0 diagonal-lines" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-brand-silver/5 rounded-full blur-3xl" />
        <div className="relative container-max">
          <span className="inline-block glass text-brand-silver font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">About Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-5 mb-6">
            Central Iowa&apos;s Trusted <span className="gradient-text">Exterior Experts</span>
          </h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            Black Ridge Contracting is your dedicated partner for all things roofing, siding, gutters, and concrete. With a commitment to excellence and years of experience, we handle all residential and commercial exterior needs across Central Iowa.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Our Story</span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5 mb-6">Built on Hard Work & Trust</h2>
                  <div className="space-y-4 text-brand-slate leading-relaxed">
                    <p>Black Ridge Contracting was founded right here in Central Iowa with a simple mission: provide Central Iowa homeowners and businesses with exceptional exterior services at fair prices.</p>
                    <p>What started as a passion for quality roofing has grown into a full-service exterior company offering roofing, siding, gutters, and concrete services. Our team of seasoned professionals brings years of hands-on experience to every project.</p>
                    <p>We believe that every property deserves expert care, which is why we treat each job — big or small — with the same level of professionalism and attention to detail.</p>
                  </div>
                </div>
                <ScrollReveal direction="right">
                  <div className="bg-brand-black rounded-2xl p-10 text-white relative overflow-hidden">
                    <div className="absolute inset-0 gradient-mesh-dark" />
                    <div className="relative">
                      <h3 className="text-2xl font-heading font-bold mb-8">At a Glance</h3>
                      <ul className="space-y-6">
                        {glanceItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-brand-silver/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-silver/30 transition-colors">
                              <svg className="w-5 h-5 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold">{item.label}</div>
                              <div className="text-white/50 text-sm">{item.sub}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-light relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative container-max">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5">What We Stand For</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white p-8 rounded-2xl shadow-sm card-hover group">
                  <div className="w-14 h-14 bg-brand-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brand-black mb-3">{v.title}</h3>
                  <p className="text-brand-slate leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute inset-0 line-pattern opacity-20" />
        <div className="relative container-max text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">Whether you need a new roof, fresh siding, gutter work, or concrete services, we&apos;re here to help. Contact us today for a free estimate.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:3098839319" className="btn-primary text-center">Call (309) 883-9319</a>
              <Link href="/contact" className="btn-secondary text-center">Request Free Estimate</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
