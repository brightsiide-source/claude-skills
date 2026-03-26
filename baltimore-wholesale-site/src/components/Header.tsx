"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container-main mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
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
            <span className="font-heading font-bold text-royal-700 text-lg leading-tight block">
              Baltimore
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1 block">
              Cash Home Buyers
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-royal-700 font-medium transition-colors"
          >
            How It Works
          </a>
          <a
            href="#why-us"
            className="text-gray-700 hover:text-royal-700 font-medium transition-colors"
          >
            Why Us
          </a>
          <a
            href="#areas"
            className="text-gray-700 hover:text-royal-700 font-medium transition-colors"
          >
            Service Areas
          </a>
          <a
            href="#faq"
            className="text-gray-700 hover:text-royal-700 font-medium transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-royal-700 font-medium transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* CTA + Phone */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+14105552274"
            className="flex items-center gap-2 text-royal-700 font-bold"
          >
            <svg
              className="w-5 h-5"
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
            (410) 555-CASH
          </a>
          <a href="#contact" className="btn-primary !py-2.5 !px-6 !text-base">
            Get My Cash Offer
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-royal-700 font-medium"
          >
            How It Works
          </a>
          <a
            href="#why-us"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-royal-700 font-medium"
          >
            Why Us
          </a>
          <a
            href="#areas"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-royal-700 font-medium"
          >
            Service Areas
          </a>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-royal-700 font-medium"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-royal-700 font-medium"
          >
            Contact
          </a>
          <div className="pt-2 border-t">
            <a
              href="tel:+14105552274"
              className="block text-royal-700 font-bold mb-3"
            >
              (410) 555-CASH
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full text-center !text-base"
            >
              Get My Cash Offer
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
