import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roofing Services | S&C Exteriors | Johnston, Iowa",
  description:
    "Professional roofing services in Central Iowa. Asphalt shingles, metal roofs, rubber roofing, new construction, replacements & reroofing. Free estimates from S&C Exteriors.",
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
  {
    title: "New Roof Construction",
    description: "Building a new home or addition? We work with builders and homeowners to install the perfect roof from the ground up.",
  },
  {
    title: "Roof Replacement",
    description: "When repairs are no longer enough, we provide complete tear-off and replacement with modern, high-performance roofing materials.",
  },
  {
    title: "Reroofing",
    description: "In some cases, a new layer of shingles can be installed over existing ones, saving time and money while refreshing your roof's protection.",
  },
  {
    title: "Roof Repairs",
    description: "From storm damage to minor leaks, our team provides fast, reliable repairs to keep your roof in top condition year-round.",
  },
  {
    title: "Roof Inspections",
    description: "Regular inspections catch small problems before they become big expenses. We provide thorough assessments with honest recommendations.",
  },
  {
    title: "Storm Damage",
    description: "Iowa weather can be brutal. After a storm, we respond quickly to assess damage, secure your property, and restore your roof.",
  },
];

export default function RoofingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white section-padding !pb-32">
        <div className="container-max">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-orange">Roofing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Professional <span className="text-brand-orange">Roofing</span> Services
          </h1>
          <p className="text-white/80 text-xl max-w-3xl leading-relaxed">
            With a wealth of experience and a team of seasoned professionals, S&C Exteriors
            is equipped to handle all your roofing needs with precision and care — from
            residential homes to commercial buildings across Central Iowa.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mt-3 mb-10">
              Complete Roofing Solutions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div key={i} className="border-2 border-gray-100 rounded-xl p-6 hover:border-brand-orange/30 transition-colors">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">{s.title}</h3>
                  <p className="text-brand-slate text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Roofing Materials */}
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Materials</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mt-3">
              Roofing Materials We Install
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {roofingTypes.map((type, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-brand-navy mb-3">{type.title}</h3>
                <p className="text-brand-slate leading-relaxed mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-brand-slate">
                      <svg className="w-4 h-4 text-brand-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Need a New Roof or Repair?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Get a free, no-obligation roofing estimate from Central Iowa&apos;s trusted experts.
            We&apos;ll assess your needs and recommend the best solution for your property and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5157831896" className="btn-primary text-center">
              Call (515) 783-1896
            </a>
            <Link href="/contact" className="btn-secondary text-center">
              Request Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
