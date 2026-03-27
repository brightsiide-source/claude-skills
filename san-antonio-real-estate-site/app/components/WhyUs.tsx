export default function WhyUs() {
  const benefits = [
    {
      title: "No Closing Costs",
      description: "We cover 100% of closing costs. The price we offer is the price you get.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Close in 30 Days or Less",
      description: "Need to sell fast? We can close in as little as 7 days. You pick the date.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Any Condition",
      description: "Fire damage, foundation issues, mold, hoarding — we buy houses in ANY condition.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "No Repairs Needed",
      description: "Don't spend a dime fixing up your house. We buy as-is — no inspections required.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "No Commissions or Fees",
      description: "Skip the 6% realtor commission. Sell directly to us and keep more money.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Local San Antonio Experts",
      description: "We live and work right here in SA. We know the neighborhoods, the market, and the people.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-adobe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Why Homeowners Choose <span className="text-terra">Us</span>
          </h2>
          <p className="text-lg text-sand max-w-2xl mx-auto">
            We&apos;ve helped hundreds of San Antonio homeowners sell fast for fair cash — and we can help you too.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-terra/50 transition-colors group"
            >
              <div className="text-river mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sand-dark text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Selling to Us vs. Listing with an Agent
          </h3>
          <div className="max-w-3xl mx-auto bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 text-center">
              <div className="p-4 bg-white/5 border-b border-white/10 font-bold text-sand-dark text-sm" />
              <div className="p-4 bg-terra/20 border-b border-terra/30 font-bold text-terra text-sm">Sell to Us</div>
              <div className="p-4 bg-white/5 border-b border-white/10 font-bold text-sand-dark text-sm">Traditional Agent</div>
            </div>
            {[
              ["Commissions / Fees", "None", "Up to 6%"],
              ["Closing Costs", "We pay them", "2-5% of sale"],
              ["Closing Timeline", "7-30 days", "60-90+ days"],
              ["Repairs Needed", "None", "$5K-$30K+"],
              ["Showings / Open Houses", "None", "Dozens"],
              ["Certainty of Close", "Guaranteed", "Sale may fall through"],
            ].map(([label, us, agent]) => (
              <div key={label} className="grid grid-cols-3 text-center border-b border-white/5 last:border-0">
                <div className="p-4 text-white text-sm font-medium text-left">{label}</div>
                <div className="p-4 bg-terra/5 text-terra text-sm font-semibold">{us}</div>
                <div className="p-4 text-sand-dark text-sm">{agent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
