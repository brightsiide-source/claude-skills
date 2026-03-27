"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-adobe/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-terra rounded-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">SA Cash Home Buyers</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sand hover:text-white transition-colors text-sm font-medium">How It Works</a>
            <a href="#why-us" className="text-sand hover:text-white transition-colors text-sm font-medium">Why Us</a>
            <a href="#areas" className="text-sand hover:text-white transition-colors text-sm font-medium">Areas We Buy</a>
            <a href="#testimonials" className="text-sand hover:text-white transition-colors text-sm font-medium">Testimonials</a>
            <a href="#faq" className="text-sand hover:text-white transition-colors text-sm font-medium">FAQ</a>
            <a
              href="#get-offer"
              className="bg-terra hover:bg-terra-dark text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              Get My Cash Offer
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-adobe border-t border-white/10 px-4 pb-4 space-y-3">
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-sand hover:text-white py-2 text-sm">How It Works</a>
          <a href="#why-us" onClick={() => setMobileOpen(false)} className="block text-sand hover:text-white py-2 text-sm">Why Us</a>
          <a href="#areas" onClick={() => setMobileOpen(false)} className="block text-sand hover:text-white py-2 text-sm">Areas We Buy</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block text-sand hover:text-white py-2 text-sm">Testimonials</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-sand hover:text-white py-2 text-sm">FAQ</a>
          <a
            href="#get-offer"
            onClick={() => setMobileOpen(false)}
            className="block bg-terra hover:bg-terra-dark text-white px-5 py-2 rounded-md text-sm font-semibold text-center transition-colors"
          >
            Get My Cash Offer
          </a>
        </div>
      )}
    </nav>
  );
}
