export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Contact Us",
      description:
        "Fill out our simple form or give us a call. Tell us about your property — any condition, any situation. No obligation.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Get Your Cash Offer",
      description:
        "We'll evaluate your property and present a fair, no-obligation cash offer within 24 hours. No lowball games.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Pick Your Closing Date",
      description:
        "You choose the timeline that works for you. Close in as little as 7 days or take up to 30. You're in control.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Get Paid",
      description:
        "We handle all paperwork and closing costs. You walk away with cash in hand. It's that simple.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Selling your house shouldn&apos;t be complicated. Our 4-step process
            gets you cash fast with zero stress.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-brand-red/50 to-transparent z-0" />
              )}

              <div className="relative bg-brand-black border border-brand-gray-mid rounded-xl p-6 hover:border-brand-red/50 transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="text-5xl font-black text-brand-gray-mid group-hover:text-brand-red/20 transition-colors absolute top-4 right-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red mb-5">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
          >
            Start Step 1 — It&apos;s Free
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
