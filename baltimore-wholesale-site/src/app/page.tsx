import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Situations from "@/components/Situations";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import MapSection from "@/components/MapSection";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Benefits />
        <Situations />
        <Testimonials />
        <ServiceAreas />
        <MapSection />
        <FAQ />
        <CTABanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
