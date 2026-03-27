import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | S&C Exteriors | Johnston, Iowa",
  description:
    "Learn about S&C Exteriors — Central Iowa's trusted exterior contractor. Professional roofing, siding, gutter, and concrete services in Johnston, IA.",
};

const values = [
  {
    title: "Quality Craftsmanship",
    description:
      "Every project receives our full attention to detail. We never cut corners and use only premium materials that stand the test of time.",
  },
  {
    title: "Honest Communication",
    description:
      "We believe in straightforward pricing and clear timelines. You'll always know what to expect — no hidden fees, no surprises.",
  },
  {
    title: "Community First",
    description:
      "As a local Johnston business, we treat every customer like a neighbor. Your satisfaction is our reputation, and we take that seriously.",
  },
  {
    title: "Safety & Reliability",
    description:
      "Our team follows strict safety protocols on every job site. We show up on time, work efficiently, and leave your property clean.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black text-white section-padding !pb-32">
        <div className="container-max">
          <span className="text-brand-silver font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 mb-6">
            Central Iowa&apos;s Trusted{" "}
            <span className="text-brand-silver">Exterior Experts</span>
          </h1>
          <p className="text-white/80 text-xl max-w-3xl leading-relaxed">
            S&C Exteriors is your dedicated partner for all things roofing, siding,
            gutters, and concrete. With a commitment to excellence and years of
            experience, we handle all residential and commercial exterior needs
            across Central Iowa.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-3 mb-6">
                  Built on Hard Work & Trust
                </h2>
                <div className="space-y-4 text-brand-slate leading-relaxed">
                  <p>
                    S&C Exteriors was founded right here in Johnston, Iowa with a simple
                    mission: provide Central Iowa homeowners and businesses with
                    exceptional exterior services at fair prices.
                  </p>
                  <p>
                    What started as a passion for quality roofing has grown into a
                    full-service exterior company offering roofing, siding, gutters, and
                    concrete services. Our team of seasoned professionals brings years
                    of hands-on experience to every project.
                  </p>
                  <p>
                    We believe that every property deserves expert care, which is why we
                    treat each job — big or small — with the same level of
                    professionalism and attention to detail. From a simple gutter repair
                    to a complete roof replacement, we&apos;re committed to exceeding
                    expectations.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-black to-brand-charcoal rounded-2xl p-10 text-white">
                <h3 className="text-2xl font-heading font-bold mb-8">At a Glance</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-silver/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Based in Johnston, IA</div>
                      <div className="text-white/60 text-sm">Serving all of Central Iowa</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-silver/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Residential & Commercial</div>
                      <div className="text-white/60 text-sm">Projects of every size</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-silver/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Available 24/7</div>
                      <div className="text-white/60 text-sm">Emergency services when you need us</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-silver/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Fully Insured</div>
                      <div className="text-white/60 text-sm">Your property is protected</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-3">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-heading font-bold text-brand-black mb-3">{v.title}</h3>
                <p className="text-brand-slate leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black text-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Whether you need a new roof, fresh siding, gutter work, or concrete services,
            we&apos;re here to help. Contact us today for a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5157831896" className="btn-primary text-center">
              Call (515) 783-1896
            </a>
            <Link href="/contact" className="btn-secondary text-center">
              Request Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
