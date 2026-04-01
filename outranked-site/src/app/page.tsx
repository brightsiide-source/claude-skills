import Link from "next/link";

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
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-teal-light font-semibold text-sm uppercase tracking-wider mb-4">
              Data-Driven SEO That Delivers Results
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Dominate Your Local
              <span className="text-teal-light"> Search Results</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              We help local businesses get found on Google, drive qualified traffic,
              and convert visitors into customers. No fluff, no vanity metrics —
              just measurable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-teal text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-dark transition-colors text-center"
              >
                Get Your Free SEO Audit
              </Link>
              <a
                href="tel:+15551234567"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:border-teal-light hover:text-teal-light transition-colors text-center"
              >
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm mt-1 text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal font-semibold text-sm uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Everything You Need to Rank Higher
            </h2>
            <p className="text-gray-mid text-lg">
              From technical SEO to content strategy, we offer comprehensive services
              designed to grow your online visibility and revenue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg hover:border-teal/20 transition-all group"
              >
                <div className="text-teal mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{service.title}</h3>
                <p className="text-gray-mid leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
            >
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews */}
      <section className="bg-gray-light py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-teal font-semibold text-sm uppercase tracking-wider mb-3">Client Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Trusted by Local Businesses
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <StarRating count={5} />
              <span className="text-gray-mid font-medium">4.9/5 from 80+ Google Reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <StarRating count={review.rating} />
                <p className="mt-4 text-charcoal leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-charcoal">{review.name}</p>
                  <p className="text-sm text-gray-mid">{review.company}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
            >
              Read All Reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-mid uppercase tracking-wider mb-8 font-medium">
            Trusted Partners & Certifications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 text-gray-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">Google</div>
              <div className="text-xs text-gray-mid mt-1">Partner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">SEMrush</div>
              <div className="text-xs text-gray-mid mt-1">Certified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">Moz</div>
              <div className="text-xs text-gray-mid mt-1">Recommended</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">HubSpot</div>
              <div className="text-xs text-gray-mid mt-1">Solutions Partner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">Ahrefs</div>
              <div className="text-xs text-gray-mid mt-1">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal to-teal-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Outrank Your Competition?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation SEO audit of your website. We&apos;ll show you
            exactly where you stand and how to improve your rankings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-teal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Your Free Audit
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
