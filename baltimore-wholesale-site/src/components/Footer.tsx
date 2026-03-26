export default function Footer() {
  return (
    <footer className="bg-royal-950 text-royal-200">
      <div className="container-main mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-royal-700 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <div>
                <span className="font-heading font-bold text-white text-lg block">
                  Baltimore Cash Home Buyers
                </span>
              </div>
            </div>
            <p className="text-royal-300 max-w-md mb-6">
              We are Baltimore&apos;s trusted cash home buyer. For over a decade,
              we&apos;ve helped hundreds of homeowners sell their properties
              quickly and hassle-free for a fair cash price. BBB Accredited. Locally
              owned and operated.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-royal-800 rounded-lg flex items-center justify-center hover:bg-royal-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-royal-800 rounded-lg flex items-center justify-center hover:bg-royal-700 transition-colors"
                aria-label="Google Business Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-royal-800 rounded-lg flex items-center justify-center hover:bg-royal-700 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="hover:text-gold-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">
                  Why Sell to Us
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-gold-400 transition-colors">
                  Service Areas
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-400 transition-colors">
                  Get Cash Offer
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Baltimore City</li>
              <li>Baltimore County</li>
              <li>Anne Arundel County</li>
              <li>Howard County</li>
              <li>Harford County</li>
              <li>Carroll County</li>
              <li>
                <a href="#areas" className="text-gold-400 hover:underline">
                  View all areas →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-royal-800">
        <div className="container-main mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-royal-400 text-sm">
            &copy; {new Date().getFullYear()} Baltimore Cash Home Buyers. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-royal-400 hover:text-royal-200">
              Privacy Policy
            </a>
            <a href="#" className="text-royal-400 hover:text-royal-200">
              Terms of Service
            </a>
            <a href="#" className="text-royal-400 hover:text-royal-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
