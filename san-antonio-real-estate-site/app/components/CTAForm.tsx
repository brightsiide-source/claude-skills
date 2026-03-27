export default function CTAForm() {
  return (
    <section id="get-offer" className="py-24 bg-adobe relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-terra/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Get Your <span className="text-terra">Cash Offer</span>?
          </h2>
          <p className="text-lg text-sand max-w-xl mx-auto">
            Fill out the form below and we&apos;ll get back to you within 24 hours with a no-obligation cash offer for your San Antonio property.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="(210) 555-0000"
                  className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-adobe mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                placeholder="john@email.com"
                className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-adobe mb-1.5">Property Address *</label>
              <input
                type="text"
                required
                placeholder="123 Main St, San Antonio, TX 78201"
                className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Property Condition</label>
                <select className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent">
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent — Move-in ready</option>
                  <option value="good">Good — Minor repairs needed</option>
                  <option value="fair">Fair — Needs some work</option>
                  <option value="poor">Poor — Major repairs needed</option>
                  <option value="teardown">Very Poor / Teardown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-adobe mb-1.5">Timeline to Sell</label>
                <select className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent">
                  <option value="">How soon?</option>
                  <option value="asap">ASAP — As fast as possible</option>
                  <option value="30">Within 30 days</option>
                  <option value="60">Within 60 days</option>
                  <option value="90">Within 90 days</option>
                  <option value="flexible">No rush — Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-adobe mb-1.5">Anything else we should know?</label>
              <textarea
                rows={3}
                placeholder="Tell us about your situation (optional)"
                className="w-full px-4 py-3 rounded-md border border-sand bg-limestone text-adobe placeholder:text-sand-dark focus:outline-none focus:ring-2 focus:ring-terra focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-terra hover:bg-terra-dark text-white py-4 rounded-md text-lg font-bold transition-colors"
            >
              Get My Free Cash Offer &rarr;
            </button>

            <p className="text-xs text-sand-dark text-center">
              By submitting, you agree to be contacted about your property. No spam, ever. Your information is 100% confidential.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
