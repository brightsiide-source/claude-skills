export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Contact Us",
      description:
        "Call us at (410) 555-CASH or fill out our simple form. Tell us about your Baltimore property — any condition, any situation.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Get Your Cash Offer",
      description:
        "We'll evaluate your property and present a fair, no-obligation cash offer within 24 hours. No pressure, no games.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Close & Get Paid",
      description:
        "Accept our offer and choose your closing date. We handle all paperwork and pay ALL closing costs. Walk away with cash in hand.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container-main mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Simple 3-Step Process
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            How We Buy Your Baltimore House
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selling your house shouldn&apos;t be stressful. Our streamlined
            process gets you a fair cash offer fast — with zero hassle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-gold-400"
            >
              <div className="absolute -top-5 left-8 w-10 h-10 bg-royal-700 text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">
                {step.number}
              </div>
              <div className="text-royal-700 mb-4 mt-2">{step.icon}</div>
              <h3 className="font-heading text-xl font-bold text-royal-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Arrow connectors on desktop */}
        <div className="hidden md:flex justify-center mt-12">
          <a href="#contact" className="btn-primary">
            Start Step 1 — Get Your Offer
          </a>
        </div>
      </div>
    </section>
  );
}
