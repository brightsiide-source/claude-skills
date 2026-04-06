export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Milwaukee, WI",
      text: "I was facing foreclosure and needed to sell fast. They gave me a fair cash offer and closed in just 12 days. Saved my credit and my sanity. Can't thank them enough.",
      stars: 5,
    },
    {
      name: "James & Linda K.",
      location: "Madison, WI",
      text: "We inherited a house that needed $40K in repairs. They bought it as-is, no inspection contingencies, no nonsense. The whole process was smooth from start to finish.",
      stars: 5,
    },
    {
      name: "Marcus T.",
      location: "Green Bay, WI",
      text: "After trying to sell with an agent for 6 months with zero offers, I called these guys. Cash offer in one day, closed in three weeks. I should have called them first.",
      stars: 5,
    },
    {
      name: "Patricia W.",
      location: "Kenosha, WI",
      text: "Going through a divorce and needed to sell the house quickly. They were professional, compassionate, and made a tough situation so much easier. Fair price, fast close.",
      stars: 5,
    },
    {
      name: "Robert D.",
      location: "Racine, WI",
      text: "Had bad tenants who destroyed the property. Didn't want to sink more money into it. They bought it as-is and I walked away with cash. Best decision I made.",
      stars: 5,
    },
    {
      name: "Angela S.",
      location: "Appleton, WI",
      text: "Zero closing costs — they meant it. The number they offered was the number I got. No hidden fees, no last-minute deductions. Finally, people who keep their word.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4">
            Real People. <span className="text-brand-red">Real Results.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hundreds of Wisconsin homeowners have trusted us to buy their homes
            fast and fair. Here&apos;s what they say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-brand-gray-dark border border-brand-gray-mid rounded-xl p-6 hover:border-brand-red/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-brand-red"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-red/20 rounded-full flex items-center justify-center">
                  <span className="text-brand-red font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
