export default function Testimonials() {
  const testimonials = [
    {
      name: "Marcus J.",
      location: "Dundalk, MD",
      text: "I inherited my mother's house and had no idea what to do with it. These guys made me a fair cash offer and closed in just 3 weeks. They handled everything — I didn't have to lift a finger. Highly recommend!",
      rating: 5,
    },
    {
      name: "Tanya W.",
      location: "Park Heights, Baltimore",
      text: "I was behind on my mortgage and facing foreclosure. They gave me a cash offer within a day and we closed in 12 days. They literally saved my credit and my sanity. Thank you so much.",
      rating: 5,
    },
    {
      name: "Robert & Linda K.",
      location: "Towson, MD",
      text: "We tried listing with an agent for 6 months with no luck. Called these guys on a Thursday, had an offer Friday, and closed in 28 days. No repairs, no showings, no stress. Wish we'd called sooner.",
      rating: 5,
    },
    {
      name: "Deshawn P.",
      location: "Essex, MD",
      text: "Had a rental property with terrible tenants. Was losing money every month. They bought it with the tenants still in place. Fast, professional, and fair. Great experience all around.",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-main mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Real Stories
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            What Baltimore Homeowners Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what real
            Baltimore homeowners say about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-gold-400"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-royal-700 rounded-full flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-royal-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
