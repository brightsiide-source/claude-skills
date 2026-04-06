export default function Benefits() {
  const benefits = [
    {
      title: "No Repairs Needed",
      description:
        "Sell your house as-is. We buy properties in any condition — damaged, outdated, or pristine. You don't lift a finger.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: "Zero Closing Costs",
      description:
        "We pay ALL closing costs. The price we offer is the price you get. No hidden fees, no surprises, no deductions.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "No Real Estate Agents",
      description:
        "Skip the 6% commission. We buy directly from you — no agents, no listings, no open houses, no strangers in your home.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    },
    {
      title: "Close in 30 Days or Less",
      description:
        "Traditional sales take 3-6 months. We close on YOUR schedule — as fast as 7 days or up to 30. You pick the date.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Any Situation",
      description:
        "Foreclosure, divorce, inherited property, tax liens, bad tenants, code violations — we've seen it all and we can help.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Cash in Your Hands",
      description:
        "No financing contingencies. No deals falling through. We have the cash ready and you get paid at closing. Guaranteed.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4">
            The Smarter Way to Sell Your{" "}
            <span className="text-brand-red">Wisconsin</span> Home
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Forget the traditional headaches. We make selling your house fast,
            fair, and completely stress-free.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-16 overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto">
            <thead>
              <tr className="border-b border-brand-gray-mid">
                <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm" />
                <th className="py-4 px-4 text-brand-red font-bold text-sm">
                  Selling to Us
                </th>
                <th className="py-4 px-4 text-gray-500 font-bold text-sm">
                  Traditional Sale
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                ["Closing Time", "7–30 days", "3–6 months"],
                ["Repairs", "None", "$5,000–$30,000+"],
                ["Agent Commissions", "$0", "5–6% of sale price"],
                ["Closing Costs", "$0 (we pay)", "$3,000–$10,000+"],
                ["Showings & Open Houses", "None", "Dozens"],
                ["Certainty of Close", "Guaranteed", "Deals often fall through"],
              ].map(([label, us, traditional]) => (
                <tr key={label} className="border-b border-brand-gray-mid/50">
                  <td className="py-3 px-4 text-gray-300 font-medium">
                    {label}
                  </td>
                  <td className="py-3 px-4 text-center text-white font-semibold">
                    {us}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500">
                    {traditional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-brand-gray-dark border border-brand-gray-mid rounded-xl p-6 hover:border-brand-red/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red mb-4 group-hover:bg-brand-red/20 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
