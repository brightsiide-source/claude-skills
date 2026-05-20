import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-adobe border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="inline-block bg-white rounded-md px-3 py-2 mb-4">
              <Image
                src="/sacash-logo.png"
                alt="SA Cash Home Buyers"
                width={1952}
                height={903}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sand-dark text-sm max-w-md mb-6 leading-relaxed">
              We buy houses for cash in San Antonio, TX and surrounding areas. Fast closings, no repairs, no fees, no hassle. Get your fair cash offer today.
            </p>
            <div className="flex items-center gap-3">
              <a href="tel:+12105550100" className="flex items-center gap-2 text-terra hover:text-terra-light text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (210) 555-0100
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-sand-dark hover:text-white text-sm transition-colors">How It Works</a></li>
              <li><a href="#why-us" className="text-sand-dark hover:text-white text-sm transition-colors">Why Choose Us</a></li>
              <li><a href="#areas" className="text-sand-dark hover:text-white text-sm transition-colors">Areas We Buy</a></li>
              <li><a href="#testimonials" className="text-sand-dark hover:text-white text-sm transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-sand-dark hover:text-white text-sm transition-colors">FAQ</a></li>
              <li><a href="#get-offer" className="text-sand-dark hover:text-white text-sm transition-colors">Get Cash Offer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sand-dark text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-terra shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                San Antonio, TX 78201
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-terra shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (210) 555-0100
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-terra shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                washburn.david01@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sand-dark text-sm">
          <p>&copy; {new Date().getFullYear()} SA Cash Home Buyers. All rights reserved. | San Antonio, TX</p>
        </div>
      </div>
    </footer>
  );
}
