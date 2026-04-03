import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { GutterIllustration } from "@/components/ServiceIllustrations";

export const metadata: Metadata = {
  title: "Gutter Services | Black Ridge Contracting | Central Iowa",
  description: "Professional gutter installation, repair, and replacement in Central Iowa. Protect your foundation with efficient water drainage from Black Ridge Contracting.",
};

const services = [
  { title: "Gutter Installation", description: "New gutter systems designed and installed to perfectly match your roofline and efficiently channel water away from your foundation." },
  { title: "Gutter Replacement", description: "Upgrade old, damaged, or undersized gutters with modern systems built to handle Central Iowa's heavy rains and snowmelt." },
  { title: "Gutter Repair", description: "Fix leaks, sagging sections, loose fasteners, and other gutter issues before they cause costly water damage to your property." },
  { title: "Gutter Removal", description: "Safe and clean removal of old gutters as part of a replacement project or exterior renovation." },
  { title: "Downspout Services", description: "Proper downspout placement and extensions to direct water well away from your foundation, basement, and landscaping." },
  { title: "Gutter Guards", description: "Keep leaves and debris out of your gutters with professionally installed gutter protection systems that reduce maintenance." },
];

const signs = [
  "Water pooling around your foundation", "Gutters pulling away from the fascia",
  "Visible cracks, holes, or rust spots", "Paint peeling on or near gutters",
  "Sagging or uneven gutter sections", "Water marks or mildew beneath gutters",
  "Basement flooding or dampness", "Erosion in landscaping near the foundation",
];

export default function GuttersPage() {
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
                <span>/</span><span className="text-brand-silver">Gutters</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="gradient-text">Gutter</span> Services
              </h1>
              <p className="text-white/70 text-xl max-w-xl leading-relaxed">
                Protect your property from water damage with professional gutter removal, repair, and replacement services.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="glass rounded-3xl p-8"><GutterIllustration className="w-full h-auto" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 mb-20">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Our Gutter Services</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5 mb-10">Complete Gutter Solutions</h2>
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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Warning Signs</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mt-5 mb-6">Signs You Need New Gutters</h2>
                <p className="text-brand-slate leading-relaxed mb-8">
                  Don&apos;t wait until water damage becomes expensive. If you notice any of these signs, it&apos;s time to call Black Ridge Contracting.
                </p>
                <ul className="space-y-3">
                  {signs.map((sign, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-slate">
                      <div className="w-6 h-6 bg-brand-black/5 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-brand-black rounded-2xl p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 gradient-mesh-dark" />
                <div className="relative">
                  <h3 className="text-2xl font-heading font-bold mb-4">Why Gutters Matter</h3>
                  <div className="space-y-4 text-white/70 leading-relaxed">
                    <p>Gutters are your property&apos;s first line of defense against water damage. They channel rainwater and snowmelt safely away from your roof, walls, and foundation.</p>
                    <p>Without properly functioning gutters, water can erode your landscaping, damage your siding, cause foundation cracks, and lead to costly basement flooding.</p>
                    <p>Central Iowa gets an average of 35+ inches of rain per year, plus significant snowfall. Your gutters work hard — make sure they&apos;re up to the task.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-brand-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="relative container-max text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Protect Your Property from Water Damage</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">Get a free gutter inspection and estimate from Black Ridge Contracting.</p>
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
