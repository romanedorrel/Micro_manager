import NavBar from "./LandingPageComponents/NavBar";
import Hero from "./LandingPageComponents/Hero";
import Footer from "./LandingPageComponents/Footer";
import HowItWorks from "./LandingPageComponents/HowItWorks";
import CTA from "./LandingPageComponents/CTA";
import Audience from "./LandingPageComponents/Audience";
import TodayPreview from "./LandingPageComponents/TodayPreview";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      <TodayPreview />
      <Audience />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
