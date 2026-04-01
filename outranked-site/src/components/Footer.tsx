import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              OUT<span className="text-teal-light">R</span>ANK
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              We help local businesses dominate search results with data-driven SEO strategies that deliver measurable ROI.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services" className="hover:text-teal-light transition-colors">Local SEO</Link></li>
              <li><Link href="/services" className="hover:text-teal-light transition-colors">Web Design</Link></li>
              <li><Link href="/services" className="hover:text-teal-light transition-colors">Google Ads</Link></li>
              <li><Link href="/services" className="hover:text-teal-light transition-colors">Content Marketing</Link></li>
              <li><Link href="/services" className="hover:text-teal-light transition-colors">Schema Markup</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-teal-light transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-teal-light transition-colors">Pricing</Link></li>
              <li><Link href="/reviews" className="hover:text-teal-light transition-colors">Reviews</Link></li>
              <li><Link href="/contact" className="hover:text-teal-light transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+15551234567" className="hover:text-teal-light transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@outranked.com" className="hover:text-teal-light transition-colors">hello@outranked.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal-light flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Main Street<br />Austin, TX 78701</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Outranked SEO Agency. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/contact" className="hover:text-teal-light transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-teal-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
