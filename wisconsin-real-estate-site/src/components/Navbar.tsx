"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-brand-gray-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-red rounded-sm flex items-center justify-center">
              <span className="text-white font-black text-sm">WI</span>
            </div>
            <span className="text-white font-bold text-lg">
              WI Cash <span className="text-brand-red">Home Buyers</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Why Us
            </a>
            <a
              href="#areas"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Service Areas
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors"
            >
              Get My Cash Offer
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Why Us
            </a>
            <a
              href="#areas"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Service Areas
            </a>
            <a
              href="#testimonials"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors text-center"
            >
              Get My Cash Offer
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
