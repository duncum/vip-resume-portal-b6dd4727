
import { useEffect } from "react";
import ExecutiveHero from "@/components/landing/ExecutiveHero";
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
      {/* Executive Hero Section */}
      <ExecutiveHero />
      
      {/* Value Proposition */}
      <ValueProposition />
      
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
