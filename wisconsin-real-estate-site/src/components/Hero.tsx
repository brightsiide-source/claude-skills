"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-black pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Red Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-brand-gray-dark border border-brand-gray-mid rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
          <span className="text-gray-300 text-sm font-medium">
            Wisconsin&apos;s #1 Cash Home Buying Company
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
          We Buy Houses in{" "}
          <span className="text-brand-red">Wisconsin</span>
          <br />
          <span className="text-gray-400">Fast Cash. No Hassle.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Get a <strong className="text-white">fair cash offer in 24 hours</strong>.
          Close in <strong className="text-white">30 days or less</strong>.
          No repairs. No agents. No fees.{" "}
          <strong className="text-brand-red">No closing costs</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-brand-red/25"
          >
            Get My Free Cash Offer
          </a>
          <a
            href="tel:+15551234567"
            className="w-full sm:w-auto border-2 border-brand-gray-mid hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
          >
            Call (555) 123-4567
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "500+", label: "Houses Bought" },
            { value: "30", label: "Days or Less to Close" },
            { value: "$0", label: "Closing Costs" },
            { value: "24hr", label: "Cash Offer" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-brand-gray-dark/50 border border-brand-gray-mid rounded-xl p-4"
            >
              <div className="text-2xl sm:text-3xl font-black text-brand-red">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
