import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concrete Services | S&C Exteriors | Johnston, Iowa",
  description:
    "Professional concrete removal and replacement in Central Iowa. Driveways, sidewalks, patios, and more. Free estimates from S&C Exteriors in Johnston, IA.",
};

const services = [
  {
    title: "Driveway Replacement",
    description: "Replace cracked, sunken, or stained driveways with fresh, properly graded concrete that enhances your home's curb appeal.",
  },
  {
    title: "Sidewalk & Walkways",
    description: "Safe, level sidewalks and walkways that meet local codes and provide years of trouble-free use for your family and visitors.",
  },
  {
    title: "Patio Installation",
    description: "Create beautiful outdoor living spaces with custom concrete patios designed for entertaining and relaxation.",
  },
  {
    title: "Garage Floors",
    description: "Durable, properly finished garage floors built to handle vehicles, equipment, and Iowa's freeze-thaw cycles.",
  },
  {
    title: "Concrete Removal",
    description: "Safe, efficient removal of old, damaged concrete with proper disposal. We handle the heavy lifting so you don't have to.",
  },
  {
    title: "Steps & Stoops",
    description: "Sturdy, properly constructed concrete steps and stoops that provide safe entry to your home for years to come.",
  },
];

const process = [
  {
    step: "1",
    title: "Free Consultation",
    description: "We assess your existing concrete, discuss your goals, and provide a detailed, no-obligation estimate.",
  },
  {
    step: "2",
    title: "Removal & Prep",
    description: "Old concrete is carefully removed and the sub-base is properly prepared to ensure a long-lasting result.",
  },
  {
    step: "3",
    title: "Pour & Finish",
    description: "Fresh concrete is poured, leveled, and finished to your specifications with proper joints and drainage.",
  },
  {
    step: "4",
    title: "Cure & Clean Up",
    description: "We ensure proper curing for maximum strength and leave your property clean and ready to enjoy.",
  },
];

export default function ConcretePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white section-padding !pb-32">
        <div className="container-max">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-orange">Concrete</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-brand-orange">Concrete</span> Services
          </h1>
          <p className="text-white/80 text-xl max-w-3xl leading-relaxed">
            Comprehensive concrete removal and replacement services for Central Iowa.
            Whether you need to upgrade a deteriorating structure or completely renovate
            an area, S&C Exteriors delivers tailored solutions that last.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-max">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mt-3 mb-10">
              Concrete Services We Offer
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

          {/* Process */}
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mt-3">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {process.map((p, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{p.step}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">{p.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Why Iowa concrete needs attention */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy mb-6">
                Why Iowa Concrete Needs Expert Care
              </h2>
              <div className="space-y-4 text-brand-slate leading-relaxed text-left md:text-center">
                <p>
                  Central Iowa&apos;s freeze-thaw cycles are one of the toughest
                  environments for concrete. Water seeps into tiny cracks, freezes,
                  expands, and breaks the concrete apart over time.
                </p>
                <p>
                  That&apos;s why proper sub-base preparation, correct concrete mix,
                  strategic joint placement, and quality finishing are critical. At
                  S&C Exteriors, we understand Iowa&apos;s climate and build concrete
                  that&apos;s made to endure it.
                </p>
                <p>
                  Don&apos;t let crumbling concrete become a safety hazard or drag down
                  your property value. Our team delivers durable, professionally
                  finished concrete work you can rely on for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Replace Your Concrete?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Get a free concrete estimate from S&C Exteriors. We&apos;ll assess your
            needs and deliver a solution built to last through Iowa&apos;s toughest seasons.
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
