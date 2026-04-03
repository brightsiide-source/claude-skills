import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { RoofingIllustration } from "@/components/ServiceIllustrations";

export const metadata: Metadata = {
  title: "Roofing Services | Black Ridge Contracting | Central Iowa",
  description:
    "Professional roofing services in Central Iowa. Asphalt shingles, metal roofs, rubber roofing, new construction, replacements & reroofing. Free estimates from Black Ridge Contracting.",
};

const roofingTypes = [
  {
    title: "Asphalt Shingles",
    description:
      "The most popular choice for Iowa homes. Durable, cost-effective, and available in a wide range of colors and styles to complement any architecture.",
    features: ["25-50 year lifespan", "Wind & hail resistant options", "Wide color selection", "Cost-effective"],
  },
  {
    title: "Metal Roofing",
    description:
      "Built to last with superior durability against Iowa's harsh weather. Metal roofs offer excellent energy efficiency and minimal maintenance.",
    features: ["40-70 year lifespan", "Energy efficient", "Fire & wind resistant", "Low maintenance"],
  },
  {
    title: "Rubber Roofing (EPDM)",
    description:
      "Ideal for flat and low-slope commercial roofs. EPDM rubber roofing provides excellent waterproofing and UV resistance.",
    features: ["20-30 year lifespan", "Superior waterproofing", "UV resistant", "Ideal for flat roofs"],
  },
];

const services = [
  { title: "New Roof Construction", description: "Building a new home or addition? We work with builders and homeowners to install the perfect roof from the ground up.", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
  { title: "Roof Replacement", description: "When repairs are no longer enough, we provide complete tear-off and replacement with modern, high-performance roofing materials.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { title: "Reroofing", description: "In some cases, a new layer of shingles can be installed over existing ones, saving time and money while refreshing your roof's protection.", icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" },
  { title: "Roof Repairs", description: "From storm damage to minor leaks, our team provides fast, reliable repairs to keep your roof in top condition year-round.", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { title: "Roof Inspections", description: "Regular inspections catch small problems before they become big expenses. We provide thorough assessments with honest recommendations.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { title: "Storm Damage", description: "Iowa weather can be brutal. After a storm, we respond quickly to assess damage, secure your property, and restore your roof.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
];

export default function RoofingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black text-white section-padding !pb-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute inset-0 diagonal-lines" />
        <div className="relative container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-brand-silver">Roofing</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Professional <span className="gradient-text">Roofing</span> Services
              </h1>
              <p className="text-white/70 text-xl max-w-xl leading-relaxed">
                With a wealth of experience and a team of seasoned professionals, Black Ridge Contracting
                is equipped to handle all your roofing needs with precision and care.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="glass rounded-3xl p-8">
                <RoofingIllustration className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 mb-20">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">What We Offer</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5 mb-10">
                Complete Roofing Solutions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((s, i) => (
                  <ScrollReveal key={i} delay={i * 80}>
                    <div className="border-2 border-gray-100 rounded-xl p-6 card-hover group">
                      <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                        </svg>
                      </div>
                      <h3 className="text-lg font-heading font-bold text-brand-black mb-2">{s.title}</h3>
                      <p className="text-brand-slate text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Roofing Materials */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Materials</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5">
                Roofing Materials We Install
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {roofingTypes.map((type, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-brand-light rounded-2xl p-8 card-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-silver/5 rounded-full -translate-y-8 translate-x-8" />
                  <h3 className="text-xl font-heading font-bold text-brand-black mb-3 relative">{type.title}</h3>
                  <p className="text-brand-slate leading-relaxed mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-brand-slate">
                        <svg className="w-4 h-4 text-brand-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute inset-0 line-pattern opacity-20" />
        <div className="relative container-max text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Need a New Roof or Repair?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Get a free, no-obligation roofing estimate from Central Iowa&apos;s trusted experts.
              We&apos;ll assess your needs and recommend the best solution for your property and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:3098839319" className="btn-primary text-center">Call (309) 883-9319</a>
              <Link href="/contact" className="btn-secondary text-center">Request Free Estimate</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
