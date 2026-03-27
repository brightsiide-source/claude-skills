import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us | S&C Exteriors | Johnston, Iowa",
  description: "Contact S&C Exteriors for a free estimate on roofing, siding, gutters, and concrete services in Central Iowa. Call (515) 783-1896.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black text-white section-padding !pb-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute inset-0 diagonal-lines" />
        <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-brand-silver/5 rounded-full blur-3xl" />
        <div className="relative container-max">
          <span className="inline-block glass text-brand-silver font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Contact Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-5 mb-6">
            Get Your <span className="gradient-text">Free Estimate</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
            Ready to start your exterior project? Reach out today and we&apos;ll provide a detailed, no-obligation estimate.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <ScrollReveal className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12">
                <h2 className="text-2xl font-heading font-bold text-brand-black mb-2">Request an Estimate</h2>
                <p className="text-brand-slate mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-brand-black mb-2">First Name *</label>
                      <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-brand-black mb-2">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">Email *</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">Phone *</label>
                      <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors" placeholder="(515) 000-0000" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-brand-black mb-2">Property Address</label>
                    <input type="text" id="address" name="address" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors" placeholder="123 Main St, Johnston, IA 50131" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-brand-black mb-2">Service Needed *</label>
                    <select id="service" name="service" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors bg-white">
                      <option value="">Select a service...</option>
                      <option value="roofing">Roofing</option>
                      <option value="siding">Siding</option>
                      <option value="gutters">Gutters</option>
                      <option value="concrete">Concrete</option>
                      <option value="multiple">Multiple Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">Project Details</label>
                    <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-black focus:ring-0 focus:outline-none transition-colors resize-vertical" placeholder="Tell us about your project — what needs to be done, any specific concerns, preferred timeline, etc." />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto group">
                    Submit Request
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                  <h3 className="text-lg font-heading font-bold text-brand-black mb-4">Call Us Directly</h3>
                  <a href="tel:5157831896" className="flex items-center gap-3 text-2xl font-bold text-brand-black hover:text-brand-charcoal transition-colors group">
                    <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    (515) 783-1896
                  </a>
                  <p className="text-brand-slate text-sm mt-3">Available 24/7 for emergencies</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                  <h3 className="text-lg font-heading font-bold text-brand-black mb-4">Email Us</h3>
                  <a href="mailto:Shawncarm@yahoo.com" className="flex items-center gap-3 text-brand-charcoal hover:text-brand-black transition-colors font-medium">
                    <div className="w-10 h-10 bg-brand-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Shawncarm@yahoo.com
                  </a>
                  <p className="text-brand-slate text-sm mt-3">We respond within 24 hours</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                  <h3 className="text-lg font-heading font-bold text-brand-black mb-4">Our Location</h3>
                  <div className="flex items-start gap-3 text-brand-slate">
                    <div className="w-10 h-10 bg-brand-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">9624 Wickham Dr</p>
                      <p>Johnston, IA 50131</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                  <h3 className="text-lg font-heading font-bold text-brand-black mb-4">Follow Us</h3>
                  <a href="https://www.facebook.com/people/SC-Exteriors/61550792332080/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-slate hover:text-brand-black transition-colors group">
                    <div className="w-10 h-10 bg-brand-black/5 rounded-lg flex items-center justify-center group-hover:bg-brand-black transition-colors">
                      <svg className="w-5 h-5 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    S&C Exteriors on Facebook
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="bg-brand-black rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 gradient-mesh-dark" />
                  <div className="relative">
                    <h3 className="text-lg font-bold mb-4">Service Area</h3>
                    <p className="text-white/60 text-sm leading-relaxed">We proudly serve Johnston, Des Moines, West Des Moines, Urbandale, Ankeny, Waukee, Clive, Grimes, and all of Central Iowa.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
