import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-adobe border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
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

          {/* Site */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Site</h4>
            <ul className="space-y-2">
              <li><a href="/how-it-works" className="text-sand-dark hover:text-white text-sm transition-colors">Process</a></li>
              <li><a href="/about" className="text-sand-dark hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="/service-areas" className="text-sand-dark hover:text-white text-sm transition-colors">Service Areas</a></li>
              <li><a href="/faq" className="text-sand-dark hover:text-white text-sm transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-sand-dark hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Cities</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sand-dark hover:text-white text-sm transition-colors">San Antonio</a></li>
              <li><a href="/new-braunfels" className="text-sand-dark hover:text-white text-sm transition-colors">New Braunfels</a></li>
              <li><a href="/boerne" className="text-sand-dark hover:text-white text-sm transition-colors">Boerne</a></li>
              <li><a href="/schertz" className="text-sand-dark hover:text-white text-sm transition-colors">Schertz</a></li>
              <li><a href="/converse" className="text-sand-dark hover:text-white text-sm transition-colors">Converse</a></li>
              <li><a href="/seguin" className="text-sand-dark hover:text-white text-sm transition-colors">Seguin</a></li>
              <li><a href="/helotes" className="text-sand-dark hover:text-white text-sm transition-colors">Helotes</a></li>
            </ul>
          </div>

          {/* Situations */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Situations</h4>
            <ul className="space-y-2">
              <li><a href="/foreclosure" className="text-sand-dark hover:text-white text-sm transition-colors">Stop foreclosure</a></li>
              <li><a href="/inherited" className="text-sand-dark hover:text-white text-sm transition-colors">Inherited house</a></li>
              <li><a href="/divorce" className="text-sand-dark hover:text-white text-sm transition-colors">Divorce sale</a></li>
              <li><a href="/as-is" className="text-sand-dark hover:text-white text-sm transition-colors">Sell as-is</a></li>
            </ul>
            <h4 className="text-white font-bold mt-6 mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sand-dark text-sm">
              <li>San Antonio, TX 78201</li>
              <li>(210) 555-0100</li>
              <li>info@sacashhomebuyers.co</li>
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
