export default function Benefits() {
  const comparisons = [
    {
      traditional: "6-12 months to sell",
      us: "Close in 30 days or less",
    },
    {
      traditional: "6% agent commissions",
      us: "Zero commissions or fees",
    },
    {
      traditional: "Costly repairs required",
      us: "We buy as-is, any condition",
    },
    {
      traditional: "Buyer financing may fall through",
      us: "Guaranteed cash — no financing contingencies",
    },
    {
      traditional: "Open houses & showings",
      us: "No showings, no strangers in your home",
    },
    {
      traditional: "Closing costs 2-5%",
      us: "We pay ALL closing costs",
    },
    {
      traditional: "Uncertain timeline",
      us: "You choose the closing date",
    },
    {
      traditional: "Appraisal & inspection contingencies",
      us: "No appraisals, no inspections needed",
    },
  ];

  return (
    <section id="why-us" className="section-padding bg-white">
      <div className="container-main mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            Traditional Sale vs. Selling to Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Skip the headaches of a traditional listing. See why Baltimore
            homeowners choose our hassle-free cash offer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 rounded-t-lg px-6 py-3 text-center">
              <span className="font-heading font-bold text-red-700">
                Traditional Agent Sale
              </span>
            </div>
            <div className="bg-green-50 rounded-t-lg px-6 py-3 text-center">
              <span className="font-heading font-bold text-green-700">
                Selling to Us for Cash
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 gap-4 ${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="px-6 py-4 flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 text-sm md:text-base">
                  {row.traditional}
                </span>
              </div>
              <div className="px-6 py-4 flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-900 font-medium text-sm md:text-base">
                  {row.us}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
