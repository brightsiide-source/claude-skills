"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-gray-100/50"
          : "bg-white/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span
              className="text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className={scrolled ? "text-charcoal" : "text-white"}>OUT</span>
              <span className="text-teal">R</span>
              <span className={scrolled ? "text-charcoal" : "text-white"}>ANK</span>
              <span className="text-teal group-hover:rotate-12 inline-block transition-transform ml-0.5">
                <svg className="w-5 h-5 inline -mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
                  scrolled
                    ? "text-charcoal hover:text-teal"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal rounded-full group-hover:w-6 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15551234567"
              className={`text-sm font-semibold transition-colors ${
                scrolled ? "text-charcoal hover:text-teal" : "text-white/80 hover:text-white"
              }`}
            >
              (555) 123-4567
            </a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="relative bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-dark transition-colors overflow-hidden group"
              >
                <span className="relative z-10">Free Consultation</span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-dark to-teal opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${scrolled ? "text-charcoal" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                className="w-full h-0.5 bg-current block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-6 pt-2">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 text-sm font-medium rounded-lg block transition-colors ${
                          scrolled
                            ? "text-charcoal hover:text-teal hover:bg-teal/5"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="mx-4 mt-3 bg-teal text-white px-5 py-3 rounded-lg text-sm font-semibold text-center block hover:bg-teal-dark transition-colors"
                    >
                      Free Consultation
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
