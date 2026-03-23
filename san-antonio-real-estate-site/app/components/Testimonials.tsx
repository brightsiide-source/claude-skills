export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria G.",
      location: "South Side, San Antonio",
      quote:
        "I was facing foreclosure and didn't know what to do. These guys gave me a fair cash offer and closed in 12 days. They literally saved my credit. I can't thank them enough.",
      stars: 5,
    },
    {
      name: "James T.",
      location: "Converse, TX",
      quote:
        "Inherited my mother's house and it needed a LOT of work. They bought it as-is and I didn't have to spend a dime. The whole process was smooth and professional.",
      stars: 5,
    },
    {
      name: "Sandra & Mike R.",
      location: "Stone Oak, San Antonio",
      quote:
        "We needed to relocate for work in 3 weeks. They made us a fair offer the same day we called and we closed in 10 days. No showings, no hassle. Just done.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            What Our <span className="text-teal">Sellers Say</span>
          </h2>
          <p className="text-lg text-silver-dark max-w-2xl mx-auto">
            Real stories from real San Antonio homeowners who sold their houses to us for cash.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-teal/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-silver mb-6 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-teal text-sm">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
