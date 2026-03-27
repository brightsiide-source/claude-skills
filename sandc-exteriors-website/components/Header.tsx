"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services/roofing",
    children: [
      { name: "Roofing", href: "/services/roofing" },
      { name: "Siding", href: "/services/siding" },
      { name: "Gutters", href: "/services/gutters" },
      { name: "Concrete", href: "/services/concrete" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      {/* Top bar */}
      <div className="bg-brand-navy text-white text-sm">
        <div className="container-max flex justify-between items-center py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a href="tel:5157831896" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (515) 783-1896
            </a>
            <a href="mailto:Shawncarm@yahoo.com" className="hidden sm:flex items-center gap-2 hover:text-brand-orange transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Shawncarm@yahoo.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">Johnston, Iowa</span>
            <span className="sm:hidden">Johnston, IA</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-max flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S&C</span>
          </div>
          <div>
            <div className="text-xl font-bold text-brand-navy leading-tight">S&C Exteriors</div>
            <div className="text-xs text-brand-slate">Central Iowa&apos;s Exterior Experts</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-brand-slate font-medium hover:text-brand-navy transition-colors">
                  {item.name}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-brand-slate hover:bg-brand-light hover:text-brand-navy transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-slate font-medium hover:text-brand-navy transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
          <a href="tel:5157831896" className="btn-primary !py-3 !px-6 !text-base">
            Get Free Estimate
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <div className="px-4 py-2 font-medium text-brand-navy">{item.name}</div>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-8 py-2 text-brand-slate hover:text-brand-navy"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-brand-slate font-medium hover:text-brand-navy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <a href="tel:5157831896" className="btn-primary w-full !mt-4 text-center">
              Get Free Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
