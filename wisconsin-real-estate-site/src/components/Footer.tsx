export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-gray-dark border-t border-brand-gray-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-red rounded-sm flex items-center justify-center">
                <span className="text-white font-black text-sm">WI</span>
              </div>
              <span className="text-white font-bold text-lg">
                WI Cash <span className="text-brand-red">Home Buyers</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              Wisconsin&apos;s trusted cash home buying company. We help
              homeowners sell their properties fast for fair cash — no repairs,
              no fees, no closing costs. Serving all major Wisconsin metros
              since 2018.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-brand-gray-mid rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red transition-all"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-brand-gray-mid rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Why Choose Us", href: "#benefits" },
                { label: "Service Areas", href: "#areas" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Get Cash Offer", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-bold mb-4">Top Service Areas</h4>
            <ul className="space-y-2.5">
              {[
                "Milwaukee Metro",
                "Madison Metro",
                "Green Bay Area",
                "Kenosha / Racine",
                "Fox Valley / Appleton",
                "Janesville / Beloit",
                "Eau Claire",
                "Waukesha County",
              ].map((area) => (
                <li key={area}>
                  <a
                    href="#areas"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-gray-mid mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} WI Cash Home Buyers. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
