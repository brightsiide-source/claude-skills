import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ConcreteIllustration } from "@/components/ServiceIllustrations";

export const metadata: Metadata = {
  title: "Concrete Services | Black Ridge Contracting | Central Iowa",
  description: "Professional concrete removal and replacement in Central Iowa. Driveways, sidewalks, patios, and more. Free estimates from Black Ridge Contracting in Central Iowa.",
};

const services = [
  { title: "Driveway Replacement", description: "Replace cracked, sunken, or stained driveways with fresh, properly graded concrete that enhances your home's curb appeal." },
  { title: "Sidewalk & Walkways", description: "Safe, level sidewalks and walkways that meet local codes and provide years of trouble-free use for your family and visitors." },
  { title: "Patio Installation", description: "Create beautiful outdoor living spaces with custom concrete patios designed for entertaining and relaxation." },
  { title: "Garage Floors", description: "Durable, properly finished garage floors built to handle vehicles, equipment, and Iowa's freeze-thaw cycles." },
  { title: "Concrete Removal", description: "Safe, efficient removal of old, damaged concrete with proper disposal. We handle the heavy lifting so you don't have to." },
  { title: "Steps & Stoops", description: "Sturdy, properly constructed concrete steps and stoops that provide safe entry to your home for years to come." },
];

const process = [
  { step: "1", title: "Free Consultation", description: "We assess your existing concrete, discuss your goals, and provide a detailed, no-obligation estimate.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { step: "2", title: "Removal & Prep", description: "Old concrete is carefully removed and the sub-base is properly prepared to ensure a long-lasting result.", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
  { step: "3", title: "Pour & Finish", description: "Fresh concrete is poured, leveled, and finished to your specifications with proper joints and drainage.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { step: "4", title: "Cure & Clean Up", description: "We ensure proper curing for maximum strength and leave your property clean and ready to enjoy.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export default function ConcretePage() {
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
                <span>/</span><span className="text-brand-silver">Concrete</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="gradient-text">Concrete</span> Services
              </h1>
              <p className="text-white/70 text-xl max-w-xl leading-relaxed">
                Comprehensive concrete removal and replacement services for Central Iowa. Tailored solutions that last.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="glass rounded-3xl p-8"><ConcreteIllustration className="w-full h-auto" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 mb-20">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5 mb-10">Concrete Services We Offer</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((s, i) => (
                  <ScrollReveal key={i} delay={i * 80}>
                    <div className="border-2 border-gray-100 rounded-xl p-6 card-hover group">
                      <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
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

          {/* Process */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Our Process</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5">How It Works</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {process.map((p, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="text-center group">
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-brand-black rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                      <svg className="w-8 h-8 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-silver rounded-full flex items-center justify-center">
                      <span className="text-brand-black text-sm font-bold">{p.step}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-black mb-2">{p.title}</h3>
                  <p className="text-brand-slate text-sm leading-relaxed">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Iowa concrete */}
          <ScrollReveal>
            <div className="bg-brand-light rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-50" />
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-black mb-6">Why Iowa Concrete Needs Expert Care</h2>
                <div className="space-y-4 text-brand-slate leading-relaxed">
                  <p>Central Iowa&apos;s freeze-thaw cycles are one of the toughest environments for concrete. Water seeps into tiny cracks, freezes, expands, and breaks the concrete apart over time.</p>
                  <p>That&apos;s why proper sub-base preparation, correct concrete mix, strategic joint placement, and quality finishing are critical. At Black Ridge Contracting, we understand Iowa&apos;s climate and build concrete that&apos;s made to endure it.</p>
                  <p>Don&apos;t let crumbling concrete become a safety hazard or drag down your property value. Our team delivers durable, professionally finished concrete work you can rely on for years.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-brand-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="relative container-max text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Replace Your Concrete?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">Get a free concrete estimate from Black Ridge Contracting. We&apos;ll assess your needs and deliver a solution built to last.</p>
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
