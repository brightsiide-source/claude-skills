import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import Situations from "./components/Situations";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTAForm from "./components/CTAForm";
import Areas from "./components/Areas";
import Footer from "./components/Footer";
import MobileStickyBar from "./components/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <WhyUs />
      <Situations />
      <FAQ />
      <CTAForm />
      <Areas />
      <Footer />
      <MobileStickyBar />
    </>
  );
}
