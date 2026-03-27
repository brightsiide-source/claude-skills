import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Siding Services | S&C Exteriors | Johnston, Iowa",
  description:
    "Professional siding installation and repair in Central Iowa. Vinyl, fiber cement, and more. Enhance your home's curb appeal with S&C Exteriors.",
};

const sidingTypes = [
  {
    title: "Vinyl Siding",
    description: "America's most popular siding choice. Low maintenance, durable, and available in countless colors and styles.",
    features: ["Low maintenance", "Fade resistant", "Affordable", "Wide color selection"],
  },
  {
    title: "Fiber Cement Siding",
    description: "Premium durability that mimics the look of wood without the upkeep. Resistant to rot, fire, and pests.",
    features: ["Fire resistant", "Rot & pest proof", "Wood-like appearance", "Long-lasting"],
  },
  {
    title: "Engineered Wood Siding",
    description: "The natural beauty of real wood with enhanced durability. Treated to resist moisture, rot, and termites.",
    features: ["Natural wood look", "Enhanced durability", "Treated for moisture", "Paintable"],
  },
];

const benefits = [
  { title: "Boost Curb Appeal", description: "Transform the look of your home with fresh, modern siding that makes a lasting impression." },
  { title: "Improve Energy Efficiency", description: "New siding with proper insulation can significantly reduce your heating and cooling costs." },
  { title: "Reduce Maintenance", description: "Modern siding materials require minimal upkeep — no more scraping, painting, or staining." },
  { title: "Increase Home Value", description: "Siding replacement consistently ranks among the top home improvements for return on investment." },
  { title: "Better Protection", description: "Shield your home from Iowa's rain, wind, hail, and temperature swings with quality siding." },
  { title: "Customizable Style", description: "Choose from a wide range of colors, textures, and profiles to match your home's architecture." },
];

export default function SidingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-black text-white section-padding !pb-32">
        <div className="container-max">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-silver">Siding</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Professional <span className="text-brand-silver">Siding</span> Installation
          </h1>
          <p className="text-white/80 text-xl max-w-3xl leading-relaxed">
            Enhance your property&apos;s charm and protection with expert siding installation
            from S&C Exteriors. We work with premium materials to transform and protect
            your Central Iowa home or business.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
            <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-3 mb-10">
              Why Replace Your Siding?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-brand-black mb-1">{b.title}</h3>
                    <p className="text-brand-slate text-sm leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Siding Types */}
          <div className="text-center mb-12">
            <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">Options</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-3">
              Siding Materials We Offer
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {sidingTypes.map((type, i) => (
              <div key={i} className="bg-brand-light rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-brand-black mb-3">{type.title}</h3>
                <p className="text-brand-slate leading-relaxed mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-brand-slate">
                      <svg className="w-4 h-4 text-brand-charcoal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <section className="bg-brand-black text-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready for New Siding?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Get a free estimate on siding installation for your Central Iowa home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5157831896" className="btn-primary text-center">Call (515) 783-1896</a>
            <Link href="/contact" className="btn-secondary text-center">Request Free Estimate</Link>
          </div>
        </div>
      </section>
    </>
  );
}
