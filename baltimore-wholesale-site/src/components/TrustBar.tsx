export default function TrustBar() {
  const stats = [
    { number: "500+", label: "Houses Bought in Baltimore" },
    { number: "24 hrs", label: "Average Offer Time" },
    { number: "$0", label: "Closing Costs to You" },
    { number: "30", label: "Days or Less to Close" },
    { number: "4.9★", label: "Google Rating (127 Reviews)" },
  ];

  return (
    <section className="bg-royal-700 py-6">
      <div className="container-main mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-2xl md:text-3xl font-bold text-gold-400">
                {stat.number}
              </div>
              <div className="text-royal-200 text-sm font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
