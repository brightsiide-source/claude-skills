export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-royal-900 via-royal-800 to-royal-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

      <div className="container-main mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-gold-400/20 border border-gold-400/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <span className="text-gold-300 text-sm font-semibold uppercase tracking-wide">
                Baltimore&apos;s #1 Cash Home Buyer
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              We Buy Houses
              <br />
              <span className="text-gold-400">For Cash</span> in
              <br />
              Baltimore, MD
            </h1>

            <p className="text-xl md:text-2xl text-royal-200 mb-4 font-medium">
              Close in 30 Days or Less. Zero Closing Costs.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Cash offer within 24 hours — no obligation",
                "We buy houses in ANY condition — no repairs needed",
                "No agent commissions, no fees, no hassle",
                "You choose the closing date that works for you",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-royal-100">
                  <svg
                    className="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary text-center">
                Get My Free Cash Offer
              </a>
              <a
                href="tel:+14105552274"
                className="btn-outline !border-white !text-white hover:!bg-white hover:!text-royal-900 text-center"
              >
                Call (410) 555-CASH
              </a>
            </div>
          </div>

          {/* Right - Quick Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-royal-900 mb-2">
                Get Your Cash Offer Today
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll contact you within 24
                hours with a fair, no-obligation cash offer.
              </p>
            </div>
            <form className="space-y-4" action="#contact" method="get">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Property Address in Baltimore *"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-900"
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-royal-700 focus:outline-none transition-colors text-gray-500">
                  <option value="">Property Condition</option>
                  <option value="good">Good — Minor cosmetic updates</option>
                  <option value="fair">Fair — Needs some work</option>
                  <option value="poor">Poor — Major repairs needed</option>
                  <option value="vacant">Vacant / Abandoned</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full !text-xl">
                Get My Free Cash Offer →
              </button>
              <p className="text-center text-xs text-gray-400">
                100% Free. No Obligation. Your info is safe and confidential.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
