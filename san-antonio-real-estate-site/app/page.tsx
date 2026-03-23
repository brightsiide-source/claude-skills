import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import Situations from "./components/Situations";
import Areas from "./components/Areas";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTAForm from "./components/CTAForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyUs />
      <Situations />
      <Areas />
      <Testimonials />
      <FAQ />
      <CTAForm />
      <Footer />
    </>
  );
}
