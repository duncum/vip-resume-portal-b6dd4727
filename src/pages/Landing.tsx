
import { useEffect } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ExclusiveAccess from "@/components/landing/ExclusiveAccess";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/layout/Footer";

const Landing = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.classList.add('landing-page');
    
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Key Benefits Section */}
      <FeaturesSection />
      
      {/* Testimonial Section */}
      <TestimonialsSection />
      
      {/* Exclusive Access Section */}
      <ExclusiveAccess />
      
      {/* Final CTA */}
      <FinalCTA />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
