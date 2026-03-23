export default function Situations() {
  const situations = [
    { title: "Foreclosure", description: "Facing foreclosure? We can close before the bank takes your home." },
    { title: "Divorce", description: "Need to split assets quickly? We make it simple and fast." },
    { title: "Inherited Property", description: "Inherited a house you don't want? We'll take it off your hands." },
    { title: "Behind on Taxes", description: "Owe back taxes? We can help resolve the situation." },
    { title: "Bad Tenants", description: "Tired of dealing with problem tenants? Sell and walk away." },
    { title: "Code Violations", description: "Facing city code violations? We buy houses with violations." },
    { title: "Fire / Storm Damage", description: "Damaged property? No repairs needed — we buy as-is." },
    { title: "Relocation", description: "Need to move fast for a job? We'll get you out in days." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            We Buy Houses in <span className="text-teal">Any Situation</span>
          </h2>
          <p className="text-lg text-silver-dark max-w-2xl mx-auto">
            No matter what you&apos;re going through, we&apos;ve seen it before and we can help. No judgment — just fair cash offers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {situations.map((situation) => (
            <div
              key={situation.title}
              className="border border-silver/50 rounded-lg p-5 hover:border-teal/50 hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-black mb-1 group-hover:text-teal transition-colors">
                {situation.title}
              </h3>
              <p className="text-silver-dark text-sm">{situation.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
