
import { useEffect } from "react";
import HeroSection from "@/components/landing/HeroSection";
import ValueProposition from "@/components/landing/ValueProposition"; 
import TrustSignals from "@/components/landing/TrustSignals";
import ExclusiveAccess from "@/components/landing/ExclusiveAccess";
import Footer from "@/components/layout/Footer";

const Landing = () => {
  // Smooth scroll effect when the page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Add class to body for landing page specific styling
    document.body.classList.add('landing-page');
    
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      {/* Hero Section with confidentiality focus */}
      <HeroSection />
      
      {/* Value Proposition */}
      <div className="relative z-10 -mt-20">
        <ValueProposition />
      </div>
      
      {/* Trust Signals */}
      <TrustSignals />
      
      {/* Exclusive Access */}
      <ExclusiveAccess />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
