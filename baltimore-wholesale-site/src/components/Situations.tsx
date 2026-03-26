export default function Situations() {
  const situations = [
    {
      title: "Foreclosure",
      description:
        "Facing foreclosure in Baltimore? We can close fast and help you avoid the damage to your credit. Time is critical — call us today.",
      icon: "🏚️",
    },
    {
      title: "Inherited Property",
      description:
        "Inherited a house you don't need? We handle the entire process so you don't have to deal with probate headaches or costly repairs.",
      icon: "📜",
    },
    {
      title: "Divorce",
      description:
        "Going through a divorce and need to sell the house quickly? We provide a fair offer so both parties can move forward.",
      icon: "⚖️",
    },
    {
      title: "Costly Repairs",
      description:
        "Major repairs you can't afford? Foundation issues, roof damage, mold — we buy houses as-is. No repairs needed whatsoever.",
      icon: "🔧",
    },
    {
      title: "Behind on Taxes",
      description:
        "Owe back taxes on your Baltimore property? We can work with the city and help resolve tax liens at closing.",
      icon: "📋",
    },
    {
      title: "Vacant Property",
      description:
        "Vacant house costing you money every month? Stop the bleeding. We'll buy it fast so you stop paying insurance, taxes, and upkeep.",
      icon: "🏗️",
    },
    {
      title: "Relocating",
      description:
        "Moving out of Baltimore for a new job or life change? Sell your house fast without waiting months for the right buyer.",
      icon: "✈️",
    },
    {
      title: "Tired Landlord",
      description:
        "Done dealing with bad tenants, evictions, and property damage? We buy rental properties even with tenants in place.",
      icon: "🔑",
    },
  ];

  return (
    <section className="section-padding bg-royal-900">
      <div className="container-main mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-400 font-semibold uppercase tracking-wide text-sm">
            We Can Help
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Situations We Solve in Baltimore
          </h2>
          <p className="text-royal-200 text-lg max-w-2xl mx-auto">
            No matter your situation, we&apos;ve helped Baltimore homeowners
            just like you. We specialize in solving difficult real estate
            problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {situations.map((situation) => (
            <div
              key={situation.title}
              className="bg-royal-800/50 backdrop-blur border border-royal-700 rounded-xl p-6 hover:border-gold-400/50 transition-colors group"
            >
              <span className="text-3xl mb-4 block">{situation.icon}</span>
              <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                {situation.title}
              </h3>
              <p className="text-royal-200 text-sm leading-relaxed">
                {situation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary">
            Describe Your Situation — Get an Offer
          </a>
        </div>
      </div>
    </section>
  );
}
