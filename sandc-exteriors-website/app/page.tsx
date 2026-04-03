import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    title: "Roofing",
    href: "/services/roofing",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80&fit=crop&auto=format",
    description:
      "From asphalt shingles to metal and rubber roofs, we handle new construction, replacements, and reroofing for residential and commercial properties.",
  },
  {
    title: "Siding",
    href: "/services/siding",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop&auto=format",
    description:
      "Enhance your property's curb appeal and protection with professional siding installation. We work with vinyl, fiber cement, and more.",
  },
  {
    title: "Gutters",
    href: "/services/gutters",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&fit=crop&auto=format",
    description:
      "Keep water flowing away from your foundation with our gutter removal, repair, and replacement services for efficient drainage.",
  },
  {
    title: "Concrete",
    href: "/services/concrete",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80&fit=crop&auto=format",
    description:
      "Comprehensive concrete removal and replacement services. Whether upgrading deteriorating structures or full renovations, we deliver lasting results.",
  },
];

const stats = [
  { value: "Central Iowa", label: "Service Area", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
  { value: "24/7", label: "Availability", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "Res. & Commercial", label: "Properties Served", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { value: "Free", label: "Estimates", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const testimonials = [
  {
    name: "Mike R.",
    location: "Central Iowa",
    text: "Black Ridge Contracting did an outstanding job on our roof replacement. Professional from start to finish, and they left our property spotless. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah T.",
    location: "Urbandale, IA",
    text: "We had our siding and gutters replaced by Black Ridge. The quality of work was excellent and the price was very fair. They were responsive and completed the job on time.",
    rating: 5,
  },
  {
    name: "David L.",
    location: "West Des Moines, IA",
    text: "Great experience with Black Ridge on our concrete driveway replacement. They handled everything and the finished product looks amazing. Will use them again.",
    rating: 5,
  },
];

const whyUs = [
  {
    title: "Experienced Professionals",
    description: "Our seasoned team brings years of hands-on expertise to every project, ensuring precision and quality craftsmanship.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    title: "Free Estimates",
    description: "Get a detailed, no-obligation estimate before any work begins. We believe in transparent pricing with no surprises.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "Local & Trusted",
    description: "Based right here in Central Iowa, we're your neighbors. We take pride in serving our Central Iowa community.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Residential & Commercial",
    description: "From single-family homes to commercial buildings, we have the skills and equipment to handle projects of any size.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Quality Materials",
    description: "We use only top-tier materials from trusted manufacturers, backed by warranties for your peace of mind.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Available 24/7",
    description: "Storms don't wait, and neither do we. Reach us anytime for emergency roof repairs and urgent exterior needs.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-brand-black text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7788264/pexels-photo-7788264.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Roofer working on residential roof"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-black/75" />
        </div>
        <div className="absolute inset-0 gradient-mesh-dark opacity-60" />

        {/* Animated decorative orbs */}
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-brand-silver/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-brand-silver/3 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative container-max section-padding !py-20 lg:!py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-silver opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-silver" />
                </span>
                <span className="text-brand-silver text-sm font-medium tracking-wide">Serving All of Central Iowa</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-[1.1] mb-6">
                Your Central Iowa{" "}
                <span className="gradient-text">Roofing & Exterior</span>{" "}
                Experts
              </h1>
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
                Professional roofing, siding, gutter, and concrete services for
                homeowners and businesses. Quality craftsmanship you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:3098839319" className="btn-primary text-center group">
                  <span>Call (309) 883-9319</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <Link href="/contact" className="btn-secondary text-center">
                  Get Free Estimate
                </Link>
              </div>
            </div>

            {/* Hero photo collage */}
            <div className="hidden lg:block animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-silver/10 rounded-3xl blur-2xl scale-90" />
                <div className="relative glass rounded-3xl p-3 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/8288954/pexels-photo-8288954.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Beautiful suburban home with quality exterior"
                    className="w-full h-80 object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <img
                      src="https://images.pexels.com/photos/1453799/pexels-photo-1453799.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Roof shingles close-up showing quality craftsmanship"
                      className="w-full h-36 object-cover rounded-xl"
                      loading="lazy"
                    />
                    <img
                      src="https://images.pexels.com/photos/8504300/pexels-photo-8504300.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="American suburban neighborhood homes"
                      className="w-full h-36 object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L0 60C240 20 480 0 720 20C960 40 1200 80 1440 60L1440 100Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white relative z-10">
        <div className="container-max px-4 sm:px-6 lg:px-8 -mt-6">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="w-12 h-12 bg-brand-black/5 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-black group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-brand-black group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-lg lg:text-xl font-heading font-bold text-brand-black">{stat.value}</div>
                  <div className="text-sm text-brand-slate mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="bg-white section-padding">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">What We Do</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-black mt-5 mb-4">
                Our Exterior Services
              </h2>
              <p className="text-brand-slate text-lg max-w-2xl mx-auto">
                From roof to foundation, we handle every aspect of your property&apos;s exterior
                with expert craftsmanship and premium materials.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <Link
                  href={service.href}
                  className="group block rounded-2xl border-2 border-gray-100 bg-white card-hover card-glow overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} services by Black Ridge Contracting`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <h3 className="absolute bottom-4 left-6 text-2xl font-heading font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <div className="p-8 pt-5">
                    <p className="text-brand-slate leading-relaxed mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-brand-black font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-brand-light section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative container-max">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Why Black Ridge Contracting</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-black mt-5 mb-4">
                Why Homeowners Trust Us
              </h2>
              <p className="text-brand-slate text-lg max-w-2xl mx-auto">
                We&apos;re not just contractors — we&apos;re your neighbors committed to protecting
                Central Iowa homes and businesses.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white p-8 rounded-2xl shadow-sm card-hover group">
                  <div className="w-14 h-14 bg-brand-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <svg className="w-7 h-7 text-brand-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brand-black mb-2">{item.title}</h3>
                  <p className="text-brand-slate leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block bg-brand-black/5 text-brand-black font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Testimonials</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-black mt-5 mb-4">
                What Our Customers Say
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="relative bg-brand-light p-8 rounded-2xl card-hover group">
                  {/* Quote mark */}
                  <div className="absolute top-6 right-6 text-brand-silver/20 group-hover:text-brand-silver/30 transition-colors">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                    </svg>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-brand-slate leading-relaxed mb-6 italic relative z-10">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-bold text-brand-black">{t.name}</div>
                      <div className="text-sm text-brand-slate">{t.location}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREA ===== */}
      <section className="bg-brand-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80&fit=crop&auto=format"
            alt="Aerial view of construction site"
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-brand-black/60" />
        <div className="absolute inset-0 gradient-mesh-dark opacity-50" />

        <div className="relative container-max text-center">
          <ScrollReveal>
            <span className="inline-block glass text-brand-silver font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full">Service Area</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-5 mb-6">
              Proudly Serving <span className="gradient-text">Central Iowa</span>
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto mb-12">
              Based in Central Iowa, we serve homeowners and businesses across the greater
              Des Moines metro area and all of Central Iowa, including:
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "Johnston", "Des Moines", "West Des Moines", "Urbandale", "Ankeny",
                "Waukee", "Clive", "Grimes", "Polk City", "Altoona",
                "Pleasant Hill", "Bondurant", "Norwalk", "Carlisle", "Windsor Heights",
              ].map((city) => (
                <span
                  key={city}
                  className="glass rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white/15 transition-all duration-300 cursor-default"
                >
                  {city}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
