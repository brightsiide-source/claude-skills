export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Contact Us",
      description:
        "Fill out our quick form or give us a call. Tell us about your property — any condition, any situation. No judgment, just solutions.",
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
        "We'll evaluate your home and present a fair, no-obligation cash offer within 24 hours. No hidden fees, no surprises.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Close on Your Timeline",
      description:
        "Accept our offer and choose your closing date — as fast as 7 days or up to 30. We pay ALL closing costs. You walk away with cash.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            How It Works — <span className="text-teal">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-silver-dark max-w-2xl mx-auto">
            Selling your house doesn&apos;t have to be stressful. We&apos;ve simplified the process to get you cash fast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-silver/50 group"
            >
              <div className="absolute -top-4 left-8 bg-teal text-white text-sm font-bold px-3 py-1 rounded-full">
                Step {step.number}
              </div>
              <div className="text-teal mb-4 mt-2">{step.icon}</div>
              <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
              <p className="text-silver-dark leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#get-offer"
            className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white px-8 py-4 rounded-md text-lg font-bold transition-colors"
          >
            Start the Process
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
