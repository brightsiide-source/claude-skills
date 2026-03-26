export default function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-royal-800 to-royal-900 py-16">
      <div className="container-main mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Sell Your Baltimore House for Cash?
        </h2>
        <p className="text-royal-200 text-lg mb-8 max-w-2xl mx-auto">
          Get your free, no-obligation cash offer in just 24 hours. No
          repairs, no agents, no closing costs. Just a fair price and a fast
          close.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary !text-xl">
            Get My Free Cash Offer
          </a>
          <a
            href="tel:+14105552274"
            className="btn-outline !border-gold-400 !text-gold-400 hover:!bg-gold-400 hover:!text-royal-900 !text-xl"
          >
            Call (410) 555-CASH
          </a>
        </div>
        <p className="text-royal-300 text-sm mt-6">
          Over 500 Baltimore homes purchased. 4.9-star rating. BBB Accredited.
        </p>
      </div>
    </section>
  );
}
