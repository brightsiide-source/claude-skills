export default function MapSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-main mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-semibold uppercase tracking-wide text-sm">
            Find Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-royal-900 mt-2 mb-4">
            Serving the Entire Baltimore Metro Area
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based in the heart of Baltimore, we buy houses throughout the
            city and all surrounding counties within a 45-mile radius.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map Embed */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.12937236384!2d-76.71198640243854!3d39.28394379075738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c803aed6f483b7%3A0x44896a84223e758!2sBaltimore%2C%20MD!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baltimore Metro Area - We Buy Houses Service Area"
            />
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-heading text-lg font-bold text-royal-900 mb-4">
                Our Office
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-royal-700 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">
                      100 E Pratt Street
                    </p>
                    <p className="text-gray-600">Baltimore, MD 21202</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-royal-700 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <a
                      href="tel:+14105552274"
                      className="font-medium text-royal-700 hover:text-royal-900"
                    >
                      (410) 555-CASH
                    </a>
                    <p className="text-gray-600 text-sm">Call or Text</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-royal-700 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <a
                      href="mailto:offers@baltimorewebuyhomes.com"
                      className="font-medium text-royal-700 hover:text-royal-900 break-all"
                    >
                      offers@baltimorewebuyhomes.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-royal-700 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600 text-sm">
                      Mon-Fri: 8am - 8pm
                    </p>
                    <p className="text-gray-600 text-sm">Sat: 9am - 5pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold-50 border border-gold-200 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-royal-900 mb-2">
                Free Property Assessment
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We&apos;ll visit your property (or evaluate remotely), assess
                its value, and give you a fair cash offer — all at no cost
                to you.
              </p>
              <a href="#contact" className="btn-primary w-full text-center !py-3">
                Request Free Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
