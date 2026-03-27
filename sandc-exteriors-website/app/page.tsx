import Link from "next/link";

const services = [
  {
    title: "Roofing",
    href: "/services/roofing",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    description:
      "From asphalt shingles to metal and rubber roofs, we handle new construction, replacements, and reroofing for residential and commercial properties.",
  },
  {
    title: "Siding",
    href: "/services/siding",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    description:
      "Enhance your property's curb appeal and protection with professional siding installation. We work with vinyl, fiber cement, and more.",
  },
  {
    title: "Gutters",
    href: "/services/gutters",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    description:
      "Keep water flowing away from your foundation with our gutter removal, repair, and replacement services for efficient drainage.",
  },
  {
    title: "Concrete",
    href: "/services/concrete",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    description:
      "Comprehensive concrete removal and replacement services. Whether upgrading deteriorating structures or full renovations, we deliver lasting results.",
  },
];

const stats = [
  { value: "Central Iowa", label: "Service Area" },
  { value: "24/7", label: "Availability" },
  { value: "Residential & Commercial", label: "Properties Served" },
  { value: "Free", label: "Estimates" },
];

const testimonials = [
  {
    name: "Mike R.",
    location: "Johnston, IA",
    text: "S&C Exteriors did an outstanding job on our roof replacement. Professional from start to finish, and they left our property spotless. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah T.",
    location: "Urbandale, IA",
    text: "We had our siding and gutters replaced by S&C. The quality of work was excellent and the price was very fair. They were responsive and completed the job on time.",
    rating: 5,
  },
  {
    name: "David L.",
    location: "West Des Moines, IA",
    text: "Great experience with S&C on our concrete driveway replacement. They handled everything and the finished product looks amazing. Will use them again.",
    rating: 5,
  },
];

const whyUs = [
  {
    title: "Experienced Professionals",
    description: "Our seasoned team brings years of hands-on expertise to every project, ensuring precision and quality craftsmanship.",
  },
  {
    title: "Free Estimates",
    description: "Get a detailed, no-obligation estimate before any work begins. We believe in transparent pricing with no surprises.",
  },
  {
    title: "Local & Trusted",
    description: "Based right here in Johnston, Iowa, we're your neighbors. We take pride in serving our Central Iowa community.",
  },
  {
    title: "Residential & Commercial",
    description: "From single-family homes to commercial buildings, we have the skills and equipment to handle projects of any size.",
  },
  {
    title: "Quality Materials",
    description: "We use only top-tier materials from trusted manufacturers, backed by warranties for your peace of mind.",
  },
  {
    title: "Available 24/7",
    description: "Storms don't wait, and neither do we. Reach us anytime for emergency roof repairs and urgent exterior needs.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-dark to-brand-charcoal" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>
        <div className="relative container-max section-padding !py-32 lg:!py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-silver/20 border border-brand-silver/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-brand-silver rounded-full animate-pulse" />
              <span className="text-brand-silver text-sm font-medium">Serving All of Central Iowa</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-tight mb-6">
              Your Central Iowa{" "}
              <span className="text-brand-silver">Roofing & Exterior</span>{" "}
              Experts
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Professional roofing, siding, gutter, and concrete services for
              homeowners and businesses. Quality craftsmanship you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:5157831896" className="btn-primary text-center">
                Call (515) 783-1896
              </a>
              <Link href="/contact" className="btn-secondary text-center">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
        {/* Diagonal bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L1440 0V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="bg-white rounded-2xl shadow-xl border p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl lg:text-2xl font-heading font-bold text-brand-black">{stat.value}</div>
                <div className="text-sm text-brand-slate mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-black mt-3 mb-4">
              Our Exterior Services
            </h2>
            <p className="text-brand-slate text-lg max-w-2xl mx-auto">
              From roof to foundation, we handle every aspect of your property&apos;s exterior
              with expert craftsmanship and premium materials.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-silver/50 bg-white hover:bg-brand-light transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-brand-charcoal mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-3 group-hover:text-brand-charcoal transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-slate leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-brand-charcoal font-semibold">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-brand-light section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">Why S&C Exteriors</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-black mt-3 mb-4">
              Why Homeowners Trust Us
            </h2>
            <p className="text-brand-slate text-lg max-w-2xl mx-auto">
              We&apos;re not just contractors — we&apos;re your neighbors committed to protecting
              Central Iowa homes and businesses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-black/5 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-black mb-2">{item.title}</h3>
                <p className="text-brand-slate leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-brand-slate font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-black mt-3 mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-brand-light p-8 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-brand-slate leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-brand-black">{t.name}</div>
                  <div className="text-sm text-brand-slate">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-brand-black text-white section-padding">
        <div className="container-max text-center">
          <span className="text-brand-silver font-semibold text-sm uppercase tracking-wider">Service Area</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
            Proudly Serving Central Iowa
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-10">
            Based in Johnston, we serve homeowners and businesses across the greater
            Des Moines metro area and all of Central Iowa, including:
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Johnston", "Des Moines", "West Des Moines", "Urbandale", "Ankeny",
              "Waukee", "Clive", "Grimes", "Polk City", "Altoona",
              "Pleasant Hill", "Bondurant", "Norwalk", "Carlisle", "Windsor Heights",
            ].map((city) => (
              <span
                key={city}
                className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
