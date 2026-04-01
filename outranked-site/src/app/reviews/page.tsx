import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description:
    "See what our clients say about Outranked SEO Agency. 4.9/5 stars from 80+ Google Reviews. Real results from real local businesses.",
};

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
      <section className="bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal-light font-semibold text-sm uppercase tracking-wider mb-4">
            Client Testimonials
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Don&apos;t Take Our Word For It
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            See what local business owners say about working with Outranked.
            Real reviews from real clients with real results.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xl font-semibold">4.9/5</span>
            <span className="text-gray-400">from 80+ Google Reviews</span>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <StarRating count={review.rating} />
                <p className="mt-4 text-charcoal leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">
                  {review.result}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-charcoal">{review.name}</p>
                  <p className="text-sm text-gray-mid">{review.company}</p>
                  <p className="text-xs text-gray-mid">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="bg-gray-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            See More Reviews on Google
          </h2>
          <p className="text-gray-mid mb-6">
            We&apos;re proud of our 4.9-star rating. Check out our full Google Reviews profile
            for even more client success stories.
          </p>
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm text-charcoal font-semibold">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            View on Google Reviews
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal to-teal-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
          <p className="text-lg text-white/80 mb-8">
            Join 150+ local businesses that trust Outranked to grow their online presence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-teal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Your Free SEO Audit
          </Link>
        </div>
      </section>
    </>
  );
}
