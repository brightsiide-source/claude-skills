"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingOrbs from "@/components/FloatingOrbs";
import GradientText from "@/components/GradientText";
import MagneticButton from "@/components/MagneticButton";
import ParticleGrid from "@/components/ParticleGrid";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-charcoal via-[#1e2d42] to-[#0c2840] text-white overflow-hidden -mt-20 pt-20">
        <ParticleGrid />
        <FloatingOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal-light font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Contact Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Let&apos;s <GradientText className="text-5xl md:text-6xl font-bold">Grow</GradientText> Your Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Ready to dominate your local search results? Get in touch for a free
            consultation and SEO audit. No pressure, no commitment.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <ScrollReveal direction="left" className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-charcoal mb-8">
                Request Your Free SEO Audit
              </h2>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20 rounded-2xl p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-gradient-to-br from-teal to-teal-dark rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <motion.svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-charcoal mb-3">Thank You!</h3>
                    <p className="text-gray-mid text-lg">
                      We&apos;ve received your request. A member of our team will reach out
                      within 24 hours with your free SEO audit.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { id: "firstName", label: "First Name", type: "text", placeholder: "John", required: true },
                        { id: "lastName", label: "Last Name", type: "text", placeholder: "Doe", required: true },
                      ].map((field) => (
                        <div key={field.id} className="relative">
                          <label htmlFor={field.id} className="block text-sm font-medium text-charcoal mb-2">
                            {field.label} {field.required && "*"}
                          </label>
                          <motion.input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors bg-gray-50/50 focus:bg-white"
                            placeholder={field.placeholder}
                            animate={focusedField === field.id ? { scale: 1.01 } : { scale: 1 }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                          Email *
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          required
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors bg-gray-50/50 focus:bg-white"
                          placeholder="john@company.com"
                          animate={focusedField === "email" ? { scale: 1.01 } : { scale: 1 }}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                          Phone
                        </label>
                        <motion.input
                          type="tel"
                          id="phone"
                          name="phone"
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors bg-gray-50/50 focus:bg-white"
                          placeholder="(555) 123-4567"
                          animate={focusedField === "phone" ? { scale: 1.01 } : { scale: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-charcoal mb-2">
                        Current Website URL
                      </label>
                      <motion.input
                        type="url"
                        id="website"
                        name="website"
                        onFocus={() => setFocusedField("website")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors bg-gray-50/50 focus:bg-white"
                        placeholder="https://www.yoursite.com"
                        animate={focusedField === "website" ? { scale: 1.01 } : { scale: 1 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors bg-gray-50/50 focus:bg-white appearance-none"
                      >
                        <option value="">Select a service...</option>
                        <option value="starter">Starter Package ($5,000)</option>
                        <option value="growth">Growth Package ($7,500)</option>
                        <option value="premium">Premium Package ($10,000+)</option>
                        <option value="seo-only">SEO Only</option>
                        <option value="web-design">Web Design Only</option>
                        <option value="google-ads">Google Ads</option>
                        <option value="not-sure">Not Sure Yet</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                        Tell Us About Your Business & Goals
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        rows={5}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors bg-gray-50/50 focus:bg-white resize-vertical"
                        placeholder="What industry are you in? What are your main goals? Any specific challenges?"
                        animate={focusedField === "message" ? { scale: 1.005 } : { scale: 1 }}
                      />
                    </div>
                    <MagneticButton
                      as="button"
                      className="w-full bg-gradient-to-r from-teal to-teal-dark text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-teal/25 transition-all"
                    >
                      Get My Free SEO Audit
                    </MagneticButton>
                    <p className="text-xs text-gray-mid text-center">
                      By submitting this form, you agree to receive communications from Outranked.
                      We respect your privacy and will never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </ScrollReveal>

            {/* Sidebar */}
            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-charcoal mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  {[
                    {
                      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                      label: "Phone",
                      value: "(555) 123-4567",
                      href: "tel:+15551234567",
                    },
                    {
                      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                      label: "Email",
                      value: "hello@outranked.com",
                      href: "mailto:hello@outranked.com",
                    },
                    {
                      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                      label: "Office",
                      value: "123 Main Street, Austin, TX 78701",
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.label}
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-11 h-11 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                        <svg className="w-5 h-5 text-teal group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-gray-mid hover:text-teal transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-mid">{item.value}</p>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Hours */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-charcoal mb-4">Business Hours</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((item) => (
                    <li key={item.day} className="flex justify-between">
                      <span className="text-gray-mid">{item.day}</span>
                      <span className="font-medium text-charcoal">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Response */}
              <motion.div
                className="bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20 rounded-2xl p-8 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl mb-3"
                >
                  &#9889;
                </motion.div>
                <p className="font-bold text-charcoal mb-1">Fast Response</p>
                <p className="text-sm text-gray-mid">
                  We respond to all inquiries within 24 hours. For urgent matters, call us directly.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="h-96 bg-gray-200 relative">
        <iframe
          title="Outranked Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.3858891293284!2d-97.74365!3d30.2672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE2JzAyLjAiTiA5N8KwNDQnMzcuMiJX!5e0!3m2!1sen!2sus!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
