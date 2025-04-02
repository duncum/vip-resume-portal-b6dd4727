
import React from 'react';
import { ChevronDown } from "lucide-react";

interface HeroScrollIndicatorProps {
  scrollOpacity: number;
  hasLoaded: boolean;
}

const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({ scrollOpacity, hasLoaded }) => {
  return (
    <div 
      className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
      style={{ 
        animationDelay: "2.8s", 
        animationFillMode: "forwards",
        opacity: scrollOpacity,
        transition: "opacity 0.3s ease-out"
      }}
    >
      <div className="animate-bounce flex flex-col items-center">
        <p className="text-gold/70 text-xs tracking-widest uppercase font-light mb-2">Discover The Network</p>
        <ChevronDown className="text-gold/70" size={24} />
      </div>
      {/* Luxury pulse circle behind scroll indicator */}
      <div className="absolute -inset-8 bg-gold/10 rounded-full blur-xl animate-pulse-slow opacity-70"></div>
    </div>
  );
};

export default HeroScrollIndicator;
