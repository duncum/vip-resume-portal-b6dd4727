
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroCTAProps {
  hasLoaded: boolean;
}

const HeroCTA: React.FC<HeroCTAProps> = ({ hasLoaded }) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={`flex flex-col md:flex-row gap-6 md:gap-8 justify-center px-4 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
      style={{ 
        animationDelay: "2.4s", 
        animationFillMode: "forwards"
      }}
    >
      <Button 
        className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-8 md:px-10 py-7 h-auto shadow-lg shadow-gold/5 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden" 
        asChild
      >
        <Link to="/agreement">
          <span className="relative z-10">View Stealth Candidates</span>
          <ArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-2" size={isMobile ? 16 : 18} />
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </Link>
      </Button>
      
      <Button 
        variant="outline" 
        className="border-gold/50 text-gold hover:bg-gold/5 text-base md:text-lg px-8 md:px-10 py-7 h-auto shadow-lg shadow-gold/5 hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden" 
        asChild
      >
        <Link to="/agreement">
          <span className="relative z-10">Partner With Us</span>
          <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </Link>
      </Button>
    </div>
  );
};

export default HeroCTA;
