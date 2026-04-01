import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SEO services including local SEO, web design, Google Ads, content marketing, schema markup, and conversion rate optimization.",
};

const services = [
  {
    id: "local-seo",
    title: "Local SEO",
    subtitle: "Dominate Google Maps & Local Pack",
    description:
      "Get found by customers in your area when they search for your services. We optimize every aspect of your local presence to ensure you appear in the Google Map Pack and local search results.",
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
      <section className="bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-light font-semibold text-sm uppercase tracking-wider mb-4">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            SEO Services That Drive Real Results
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From local SEO to web design, every service we offer is designed with
            one goal: getting your business found by the right customers at the right time.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col lg:flex-row gap-12 items-start ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <p className="text-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  {service.subtitle}
                </p>
                <h2 className="text-3xl font-bold text-charcoal mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-mid leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-dark transition-colors"
                >
                  Get Started
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-gray-light rounded-xl p-8">
                  <h3 className="font-semibold text-charcoal mb-4">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-charcoal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Process</h2>
            <p className="text-gray-mid">
              A proven 4-step process that delivers consistent results for every client.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit & Discovery", desc: "We analyze your current online presence, competitors, and market opportunities." },
              { step: "02", title: "Strategy & Plan", desc: "We build a custom SEO strategy with clear goals, timelines, and KPIs." },
              { step: "03", title: "Execute & Optimize", desc: "We implement the strategy, monitor results, and continuously optimize." },
              { step: "04", title: "Report & Scale", desc: "Monthly transparent reporting with recommendations to scale your growth." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold text-teal/20 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal to-teal-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/80 mb-8">
            Book a free consultation and get a custom SEO strategy for your business.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-teal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
