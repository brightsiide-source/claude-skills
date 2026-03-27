import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { SidingIllustration } from "@/components/ServiceIllustrations";

export const metadata: Metadata = {
  title: "Siding Services | S&C Exteriors | Johnston, Iowa",
  description:
    "Professional siding installation and repair in Central Iowa. Vinyl, fiber cement, and more. Enhance your home's curb appeal with S&C Exteriors.",
};

const sidingTypes = [
  { title: "Vinyl Siding", description: "America's most popular siding choice. Low maintenance, durable, and available in countless colors and styles.", features: ["Low maintenance", "Fade resistant", "Affordable", "Wide color selection"] },
  { title: "Fiber Cement Siding", description: "Premium durability that mimics the look of wood without the upkeep. Resistant to rot, fire, and pests.", features: ["Fire resistant", "Rot & pest proof", "Wood-like appearance", "Long-lasting"] },
  { title: "Engineered Wood Siding", description: "The natural beauty of real wood with enhanced durability. Treated to resist moisture, rot, and termites.", features: ["Natural wood look", "Enhanced durability", "Treated for moisture", "Paintable"] },
];

const benefits = [
  { title: "Boost Curb Appeal", description: "Transform the look of your home with fresh, modern siding that makes a lasting impression.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { title: "Improve Energy Efficiency", description: "New siding with proper insulation can significantly reduce your heating and cooling costs.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Reduce Maintenance", description: "Modern siding materials require minimal upkeep — no more scraping, painting, or staining.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Increase Home Value", description: "Siding replacement consistently ranks among the top home improvements for return on investment.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Better Protection", description: "Shield your home from Iowa's rain, wind, hail, and temperature swings with quality siding.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Customizable Style", description: "Choose from a wide range of colors, textures, and profiles to match your home's architecture.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
];

export default function SidingPage() {
  return (
    <>
      <section className="bg-brand-black text-white section-padding !pb-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute inset-0 diagonal-lines" />
        <div className="relative container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-brand-silver">Siding</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Professional <span className="gradient-text">Siding</span> Installation
              </h1>
              <p className="text-white/70 text-xl max-w-xl leading-relaxed">
                Enhance your property&apos;s charm and protection with expert siding installation
                from S&C Exteriors.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="glass rounded-3xl p-8"><SidingIllustration className="w-full h-auto" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 mb-20">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5 mb-10">Why Replace Your Siding?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <ScrollReveal key={i} delay={i * 80}>
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-brand-black mb-1">{b.title}</h3>
                        <p className="text-brand-slate text-sm leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Options</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5">Siding Materials We Offer</h2>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-8">
            {sidingTypes.map((type, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-brand-light rounded-2xl p-8 card-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-silver/5 rounded-full -translate-y-8 translate-x-8" />
                  <h3 className="text-xl font-heading font-bold text-brand-black mb-3">{type.title}</h3>
                  <p className="text-brand-slate leading-relaxed mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-brand-slate">
                        <svg className="w-4 h-4 text-brand-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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

      <section className="bg-brand-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="relative container-max text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready for New Siding?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">Get a free estimate on siding installation for your Central Iowa home or business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:5157831896" className="btn-primary text-center">Call (515) 783-1896</a>
              <Link href="/contact" className="btn-secondary text-center">Request Free Estimate</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
